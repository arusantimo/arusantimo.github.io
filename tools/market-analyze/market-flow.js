const FLOW_WINDOW_DAYS = 10;
const FLOW_NEUTRAL_REASON = "수급 데이터 미연동 (중립 처리)";

function buildProxyConfigs(targetUrl) {
    return {
        allorigins: {
            url: `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`,
            type: "json",
            label: "api.allorigins.win"
        },
        alloriginsRaw: {
            url: `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
            type: "text",
            label: "api.allorigins.win(raw)"
        },
        codetabs: {
            url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
            type: "text",
            label: "api.codetabs.com"
        }
    };
}

function inferResponseEncoding(targetUrl, explicitEncoding = "") {
    if (explicitEncoding) return explicitEncoding;
    return /naver\.com/i.test(String(targetUrl || "")) ? "euc-kr" : "utf-8";
}

async function readProxyText(response, encoding) {
    try {
        const buffer = await response.arrayBuffer();
        return new TextDecoder(encoding).decode(buffer);
    } catch (error) {
        return response.text();
    }
}

async function fetchWithProxyFallback(targetUrl, validationKeyword = "", options = {}) {
    const proxyConfigs = buildProxyConfigs(targetUrl);
    const proxyOrder = Array.isArray(options.proxyOrder) && options.proxyOrder.length
        ? options.proxyOrder
        : ["allorigins", "codetabs"];
    const proxies = proxyOrder
        .map(key => proxyConfigs[key])
        .filter(Boolean);
    const timeoutMs = Number.isFinite(options.timeoutMs) ? options.timeoutMs : 10000;
    const responseEncoding = inferResponseEncoding(targetUrl, options.responseEncoding || "");

    let lastError;
    for (const proxy of proxies) {
        let timeoutId;
        try {
            const hostName = proxy.label || proxy.url.split('/')[2];
            log(`- ${hostName} 접속 시도 중...`);
            const controller = new AbortController();
            timeoutId = setTimeout(() => controller.abort(), timeoutMs);

            const response = await fetch(proxy.url, { signal: controller.signal });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            let text = "";
            if (proxy.type === 'json') {
                const data = await response.json();
                if (!data.contents) throw new Error("빈 데이터 응답");
                text = data.contents;
            } else {
                text = await readProxyText(response, responseEncoding);
            }

            if (text.length < 100) throw new Error("비정상적인 짧은 응답(차단 의심)");
            if (validationKeyword && !text.includes(validationKeyword)) {
                throw new Error("웹 방화벽 차단 페이지 응답 의심");
            }
            return text;
        } catch (err) {
            let errMsg = err.message;
            if (err?.name === "AbortError" || errMsg.includes("signal is aborted")) {
                errMsg = `타임아웃(${Math.round(timeoutMs / 1000)}초 초과)`;
            }
            log(`<span class="text-amber-500/80 text-[10px]">- 프록시 실패: ${errMsg}</span>`);
            lastError = err;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    throw new Error(`모든 프록시 서버 응답 실패 (${lastError?.message})`);
}

function normalizeFlowBizDate(raw) {
    return String(raw || "").replace(/\D/g, "");
}

function formatFlowBizDateLabel(raw) {
    const normalized = normalizeFlowBizDate(raw);
    if (normalized.length !== 8) return "-";

    return `${normalized.slice(0, 4)}.${normalized.slice(4, 6)}.${normalized.slice(6, 8)}`;
}

function formatSignedFlowValue(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return "-";

    const rounded = Math.round(value);
    const sign = rounded > 0 ? "+" : rounded < 0 ? "-" : "";
    return `${sign}${Math.abs(rounded).toLocaleString()}억`;
}

function stripHtmlTags(raw) {
    return String(raw || "")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, "")
        .trim();
}

function parseSignedFlowNumber(raw) {
    const normalized = stripHtmlTags(raw).replace(/,/g, "");
    if (!normalized) return 0;

    const match = normalized.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
}

function parseInvestorFlowBizDate(html) {
    const match = html.match(/investorDealTrendDay\.naver\?bizdate=(\d{8})&(?:amp;)?sosok=/);
    return match ? match[1] : null;
}

function parseInvestorTrendRows(html) {
    const rows = [];
    const trRegex = /<tr[\s\S]*?<\/tr>/gi;
    let match;

    while ((match = trRegex.exec(html)) !== null) {
        const trContent = match[0];
        if (!trContent.includes('class="date2"')) continue;

        const tdMatches = [...trContent.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
        if (tdMatches.length < 4) continue;

        rows.push({
            date: stripHtmlTags(tdMatches[0][1]),
            retail: parseSignedFlowNumber(tdMatches[1][1]),
            foreign: parseSignedFlowNumber(tdMatches[2][1]),
            institution: parseSignedFlowNumber(tdMatches[3][1])
        });

        if (rows.length === FLOW_WINDOW_DAYS) break;
    }

    return rows;
}

function mergeInvestorTrendRows(kospiRows, kosdaqRows) {
    if (kospiRows.length < FLOW_WINDOW_DAYS || kosdaqRows.length < FLOW_WINDOW_DAYS) {
        throw new Error("최근 10영업일 수급 데이터 확보 실패");
    }

    return kospiRows.slice(0, FLOW_WINDOW_DAYS).map((kospiRow, idx) => {
        const kosdaqRow = kosdaqRows[idx];
        if (!kosdaqRow || kospiRow.date !== kosdaqRow.date) {
            throw new Error(`KOSPI/KOSDAQ 기준일 불일치 (${kospiRow.date} / ${kosdaqRow?.date || '-'})`);
        }

        return {
            date: kospiRow.date,
            retail: kospiRow.retail + kosdaqRow.retail,
            foreign: kospiRow.foreign + kosdaqRow.foreign,
            institution: kospiRow.institution + kosdaqRow.institution
        };
    });
}

function summarizeInvestorTrendRows(rows) {
    const windowRows = rows.slice(0, FLOW_WINDOW_DAYS);
    const retailAbsSum = windowRows.reduce((sum, row) => sum + Math.abs(row.retail), 0);

    return {
        retailNetToday: windowRows[0]?.retail ?? null,
        foreignNetToday: windowRows[0]?.foreign ?? null,
        institutionNetToday: windowRows[0]?.institution ?? null,
        retailNet10dCum: windowRows.reduce((sum, row) => sum + row.retail, 0),
        foreignNet10dCum: windowRows.reduce((sum, row) => sum + row.foreign, 0),
        institutionNet10dCum: windowRows.reduce((sum, row) => sum + row.institution, 0),
        retailNet10dAbsAvg: retailAbsSum > 0 ? retailAbsSum / FLOW_WINDOW_DAYS : null,
        retailNet10dAbsSum: retailAbsSum > 0 ? retailAbsSum : null
    };
}

function setMarketFlowNeutralState(reason = FLOW_NEUTRAL_REASON) {
    marketData.retailNetToday = null;
    marketData.foreignNetToday = null;
    marketData.institutionNetToday = null;
    marketData.retailNet10dCum = null;
    marketData.foreignNet10dCum = null;
    marketData.institutionNet10dCum = null;
    marketData.retailNet10dAbsAvg = null;
    marketData.retailNet10dAbsSum = null;
    marketData.flowBizDate = "";
    marketData.flowBonus = 0;
    marketData.flowReason = reason;
}

async function fetchMarketInvestorFlowData() {
    log("[FLOW] 시장 전체 수급 페이지 파싱 시작...");
    const trendIndexHtml = await fetchWithProxyFallback(
        "https://finance.naver.com/sise/sise_trans_style.naver",
        "investorDealTrendDay"
    );

    const bizDate = parseInvestorFlowBizDate(trendIndexHtml);
    if (!bizDate) throw new Error("시장 수급 기준일 파싱 실패");

    const baseUrl = `https://finance.naver.com/sise/investorDealTrendDay.naver?bizdate=${bizDate}&sosok=`;
    const [kospiHtml, kosdaqHtml] = await Promise.all([
        fetchWithProxyFallback(baseUrl, 'date2'),
        fetchWithProxyFallback(`${baseUrl}02`, 'date2')
    ]);

    const kospiRows = parseInvestorTrendRows(kospiHtml);
    const kosdaqRows = parseInvestorTrendRows(kosdaqHtml);
    log(`[FLOW] 최근 10영업일 확보 여부 - KOSPI:${kospiRows.length}건 / KOSDAQ:${kosdaqRows.length}건`);

    const mergedRows = mergeInvestorTrendRows(kospiRows, kosdaqRows);
    const summary = summarizeInvestorTrendRows(mergedRows);

    log(
        `[FLOW] 합산 수급(${formatFlowBizDateLabel(bizDate)}) - 당일 개인 ${formatSignedFlowValue(summary.retailNetToday)} / 외국인 ${formatSignedFlowValue(summary.foreignNetToday)} / 기관 ${formatSignedFlowValue(summary.institutionNetToday)}`
    );

    return {
        ...summary,
        flowBizDate: bizDate
    };
}
