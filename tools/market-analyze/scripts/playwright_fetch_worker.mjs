#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import readline from "node:readline";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";

const EXECUTABLE_CANDIDATES = [
  process.env.MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/snap/bin/chromium",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
].filter(Boolean);

function emit(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function resolveExecutablePath(playwrightExecutablePath = "") {
  const candidatePool = [
    process.env.MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH,
    playwrightExecutablePath,
    ...EXECUTABLE_CANDIDATES,
  ].filter(Boolean);

  for (const candidate of candidatePool) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }
  return "";
}

async function bootstrap() {
  let chromiumModule;
  try {
    chromiumModule = await import("playwright-core");
  } catch (error) {
    emit({
      ready: false,
      error: `playwright-core 모듈을 찾지 못했습니다. tools/market-analyze 에서 npm install 을 먼저 실행해 주세요. (${error.message})`
    });
    process.exit(1);
  }

  const playwrightExecutablePath =
    typeof chromiumModule.chromium?.executablePath === "function"
      ? chromiumModule.chromium.executablePath()
      : "";
  const executablePath = await resolveExecutablePath(playwrightExecutablePath);
  if (!executablePath) {
    emit({
      ready: false,
      error: "Chrome/Chromium 실행 파일을 찾지 못했습니다. MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH 로 경로를 지정하거나 Playwright 브라우저를 설치해 주세요."
    });
    process.exit(1);
  }

  const downloadsPath = await fs.mkdtemp(path.join(os.tmpdir(), "market-analyze-downloads-"));
  const { chromium } = chromiumModule;
  const browser = await chromium.launch({
    headless: true,
    executablePath,
    chromiumSandbox: false,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--lang=ko-KR"
    ]
  });
  const context = await browser.newContext({
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
    locale: "ko-KR",
    userAgent: USER_AGENT,
    extraHTTPHeaders: {
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
    }
  });

  async function cleanup() {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
    await fs.rm(downloadsPath, { recursive: true, force: true }).catch(() => {});
  }

  process.once("SIGINT", async () => {
    await cleanup();
    process.exit(0);
  });
  process.once("SIGTERM", async () => {
    await cleanup();
    process.exit(0);
  });
  process.once("beforeExit", async () => {
    await cleanup();
  });

  emit({
    ready: true,
    executablePath,
    browser: "chrome"
  });

  const rl = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line.trim()) {
      continue;
    }

    let request;
    try {
      request = JSON.parse(line);
    } catch (error) {
      emit({ ok: false, error: `JSON 파싱 실패 (${error.message})` });
      continue;
    }

    const requestId = request.id ?? null;
    const url = String(request.url || "");
    const timeoutMs = Math.max(1_000, Number(request.timeoutMs) || 10_000);
    const expectDownload = !!request.expectDownload;

    let page;
    try {
      page = await context.newPage();
      page.setDefaultNavigationTimeout(timeoutMs);
      page.setDefaultTimeout(timeoutMs);

      let response = null;
      let bodyBuffer = null;
      let meta = {};

      if (expectDownload) {
        const downloadPromise = page.waitForEvent("download", { timeout: timeoutMs }).catch(() => null);
        response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: timeoutMs }).catch(() => null);
        const download = await downloadPromise;

        if (download) {
          const failure = await download.failure();
          if (failure && failure !== "canceled") {
            throw new Error(`다운로드 실패 (${failure})`);
          }
          const filePath = await download.path();
          if (!filePath) {
            throw new Error("다운로드 파일 경로를 확인하지 못했습니다.");
          }
          bodyBuffer = await fs.readFile(filePath);
          meta = {
            transport: "download",
            suggestedFilename: download.suggestedFilename()
          };
        }
      } else {
        response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: timeoutMs });
      }

      if (!bodyBuffer) {
        if (!response) {
          throw new Error("응답 객체를 확인하지 못했습니다.");
        }
        await response.finished().catch(() => null);
        bodyBuffer = await response.body();
        meta = {
          transport: "response",
          status: response.status(),
          contentType: response.headers()["content-type"] || ""
        };
      }

      emit({
        id: requestId,
        ok: true,
        bodyBase64: Buffer.from(bodyBuffer).toString("base64"),
        meta
      });
    } catch (error) {
      emit({
        id: requestId,
        ok: false,
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      await page?.close().catch(() => {});
    }
  }
}

bootstrap().catch(error => {
  emit({
    ready: false,
    error: error instanceof Error ? error.message : String(error)
  });
  process.exit(1);
});
