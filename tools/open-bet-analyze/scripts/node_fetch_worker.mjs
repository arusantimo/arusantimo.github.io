#!/usr/bin/env node

import http from "node:http";
import https from "node:https";
import readline from "node:readline";
import zlib from "node:zlib";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";
const MAX_REDIRECTS = 5;
const DEFAULT_TIMEOUT_MS = 10_000;
const DNS_ERROR_REGEX =
  /ENOTFOUND|EAI_AGAIN|DNS|nodename nor servname provided|name or service not known|temporary failure in name resolution/i;
const DOH_PROVIDERS = [
  {
    name: "cloudflare",
    ip: "1.1.1.1",
    servername: "cloudflare-dns.com",
    hostHeader: "cloudflare-dns.com",
    buildPath: host => `/dns-query?name=${encodeURIComponent(host)}&type=A`,
  },
  {
    name: "google",
    ip: "8.8.8.8",
    servername: "dns.google",
    hostHeader: "dns.google",
    buildPath: host => `/resolve?name=${encodeURIComponent(host)}&type=A`,
  },
];

function emit(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

function normalizeError(error) {
  if (!error) {
    return "요청 실패";
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return String(error);
}

function isDnsLikeError(error) {
  return DNS_ERROR_REGEX.test(normalizeError(error));
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function uniqueResolutionCandidates(values) {
  const seen = new Set();
  const results = [];
  for (const value of values || []) {
    if (!value || !isIpLiteral(value.ip) || seen.has(value.ip)) {
      continue;
    }
    seen.add(value.ip);
    results.push(value);
  }
  return results;
}

function isIpLiteral(value) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(String(value || "").trim());
}

function decodeBuffer(buffer, encoding) {
  const normalized = String(encoding || "").toLowerCase();
  if (normalized.includes("br")) {
    return zlib.brotliDecompressSync(buffer);
  }
  if (normalized.includes("gzip")) {
    return zlib.gunzipSync(buffer);
  }
  if (normalized.includes("deflate")) {
    return zlib.inflateSync(buffer);
  }
  return buffer;
}

function collectResponseBody(response) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    response.on("data", chunk => chunks.push(Buffer.from(chunk)));
    response.on("end", () => {
      const rawBuffer = Buffer.concat(chunks);
      try {
        resolve(decodeBuffer(rawBuffer, response.headers["content-encoding"] || ""));
      } catch (error) {
        reject(error);
      }
    });
    response.on("error", reject);
  });
}

function requestOnce(targetUrl, timeoutMs, resolvedIp = "") {
  const parsed = new URL(targetUrl);
  const isHttps = parsed.protocol === "https:";
  const transport = isHttps ? https : http;
  const requestHost = resolvedIp || parsed.hostname;
  const requestHeaders = {
    accept: "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    pragma: "no-cache",
    "user-agent": USER_AGENT,
  };
  if (resolvedIp) {
    requestHeaders.host = parsed.host;
  }

  return new Promise((resolve, reject) => {
    const request = transport.request(
      {
        host: requestHost,
        port: parsed.port ? Number(parsed.port) : isHttps ? 443 : 80,
        path: `${parsed.pathname}${parsed.search}`,
        method: "GET",
        headers: requestHeaders,
        servername: resolvedIp && isHttps ? parsed.hostname : undefined,
        timeout: timeoutMs,
      },
      async response => {
        try {
          const bodyBuffer = await collectResponseBody(response);
          const location = response.headers.location || "";
          resolve({
            bodyBuffer,
            headers: response.headers,
            location: location ? new URL(location, parsed).toString() : "",
            resolvedIp,
            statusCode: response.statusCode || 0,
          });
        } catch (error) {
          reject(error);
        }
      }
    );
    request.on("timeout", () => request.destroy(new Error("timeout")));
    request.on("error", reject);
    request.end();
  });
}

function parseDohPayload(provider, bodyText) {
  const payload = JSON.parse(bodyText || "{}");
  const answers = Array.isArray(payload.Answer) ? payload.Answer : [];
  const ipCandidates = answers
    .filter(entry => Number(entry.type) === 1 && isIpLiteral(entry.data))
    .map(entry => entry.data);
  return unique(ipCandidates).map(ip => ({ ip, source: provider.name }));
}

async function resolveHostViaDoh(hostname, timeoutMs) {
  if (!hostname || isIpLiteral(hostname)) {
    return [];
  }
  const errors = [];
  for (const provider of DOH_PROVIDERS) {
    try {
      const response = await requestOnce(
        `https://${provider.servername}${provider.buildPath(hostname)}`,
        timeoutMs,
        provider.ip
      );
      const resolved = parseDohPayload(provider, response.bodyBuffer.toString("utf-8"));
      if (resolved.length) {
        return resolved;
      }
      errors.push(`${provider.name}: no A record`);
    } catch (error) {
      errors.push(`${provider.name}: ${normalizeError(error)}`);
    }
  }
  throw new Error(`DoH 해석 실패 (${errors.join(" / ")})`);
}

async function fetchWithFallbacks(targetUrl, timeoutMs, ipCandidates = [], skipSystemDns = false) {
  let currentUrl = String(targetUrl || "");
  const redirectTrail = [];

  redirectLoop:
  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    const parsed = new URL(currentUrl);
    const host = parsed.hostname;
    let lastSystemError = null;

    if (!skipSystemDns) {
      try {
        const response = await requestOnce(currentUrl, timeoutMs);
        if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.location) {
          redirectTrail.push({
            statusCode: response.statusCode,
            to: response.location,
            transport: "system",
          });
          currentUrl = response.location;
          continue;
        }
        return {
          bodyBuffer: response.bodyBuffer,
          meta: {
            contentType: response.headers["content-type"] || "",
            redirects: redirectTrail,
            resolutionSource: "system-dns",
            resolvedIp: "",
            status: response.statusCode,
            transport: "node-system",
          },
        };
      } catch (error) {
        lastSystemError = error;
        if (!isDnsLikeError(error)) {
          throw error;
        }
      }
    }

    const seededIpCandidates = unique(ipCandidates.filter(isIpLiteral)).map(ip => ({
      ip,
      source: "seed",
    }));
    let resolvedCandidates = seededIpCandidates;
    let dohError = "";
    try {
      const dohCandidates = await resolveHostViaDoh(host, timeoutMs);
      resolvedCandidates = uniqueResolutionCandidates([...seededIpCandidates, ...dohCandidates]);
    } catch (error) {
      dohError = normalizeError(error);
      if (!resolvedCandidates.length) {
        throw error;
      }
    }
    const directErrors = [];

    for (const candidate of resolvedCandidates) {
      try {
        const response = await requestOnce(currentUrl, timeoutMs, candidate.ip);
        if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.location) {
          redirectTrail.push({
            statusCode: response.statusCode,
            to: response.location,
            transport: "direct-ip",
            resolvedIp: candidate.ip,
          });
          currentUrl = response.location;
          ipCandidates = [];
          continue redirectLoop;
        }
        return {
          bodyBuffer: response.bodyBuffer,
          meta: {
            contentType: response.headers["content-type"] || "",
            redirects: redirectTrail,
            resolutionSource: candidate.source,
            resolvedIp: candidate.ip,
            status: response.statusCode,
            transport: "node-direct-ip",
          },
        };
      } catch (error) {
        directErrors.push(`${candidate.ip}: ${normalizeError(error)}`);
      }
    }

    const reasonParts = [];
    if (lastSystemError) {
      reasonParts.push(`system=${normalizeError(lastSystemError)}`);
    }
    if (directErrors.length) {
      reasonParts.push(`direct=${directErrors.join(" / ")}`);
    }
    if (dohError) {
      reasonParts.push(`doh=${dohError}`);
    }
    throw new Error(reasonParts.join(" ; ") || "Node fetch 실패");
  }

  throw new Error("redirect 한도 초과");
}

emit({
  ready: true,
  strategies: ["system-dns", "seeded-ip", "doh-direct-ip"],
});

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

for await (const line of rl) {
  if (!line.trim()) {
    continue;
  }

  let request;
  try {
    request = JSON.parse(line);
  } catch (error) {
    emit({ ok: false, error: `JSON 파싱 실패 (${normalizeError(error)})` });
    continue;
  }

  try {
    const result = await fetchWithFallbacks(
      String(request.url || ""),
      Math.max(1_000, Number(request.timeoutMs) || DEFAULT_TIMEOUT_MS),
      Array.isArray(request.ipCandidates) ? request.ipCandidates : [],
      !!request.skipSystemDns
    );
    emit({
      id: request.id ?? null,
      ok: true,
      bodyBase64: result.bodyBuffer.toString("base64"),
      meta: result.meta,
    });
  } catch (error) {
    emit({
      id: request.id ?? null,
      ok: false,
      error: normalizeError(error),
    });
  }
}
