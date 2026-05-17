function parseYahooChartResult(rawText) {
    const payload = JSON.parse(rawText);
    const result = payload?.chart?.result?.[0];
    if (!result) throw new Error("Yahoo 차트 응답 구조 이상");
    return result;
}

function extractLastFiniteNumber(values = []) {
    for (let idx = values.length - 1; idx >= 0; idx--) {
        const value = Number(values[idx]);
        if (Number.isFinite(value)) return value;
    }
    return null;
}

async function fetchYahooChartSeries(symbol, range = "5d", interval = "1d") {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}`;
    const rawText = await fetchWithProxyFallback(url, "chart");
    const result = parseYahooChartResult(rawText);
    const closes = Array.isArray(result?.indicators?.quote?.[0]?.close)
        ? result.indicators.quote[0].close.filter(value => Number.isFinite(value))
        : [];
    const regularMarketPrice = Number(result?.meta?.regularMarketPrice);

    return {
        closes,
        regularMarketPrice: Number.isFinite(regularMarketPrice) ? regularMarketPrice : null
    };
}

async function fetchYahooLatestQuote(symbol) {
    const { closes, regularMarketPrice } = await fetchYahooChartSeries(symbol, "5d", "1d");
    const fallbackClose = extractLastFiniteNumber(closes);
    const value = Number.isFinite(regularMarketPrice) && regularMarketPrice > 0
        ? regularMarketPrice
        : fallbackClose;

    if (!Number.isFinite(value) || value <= 0) {
        throw new Error(`${symbol} 현재가 파싱 실패`);
    }

    return value;
}

function parseLatestVixCloseFromCsv(csvText) {
    const lines = String(csvText || "").trim().split(/\r?\n/).filter(Boolean);
    for (let idx = lines.length - 1; idx >= 1; idx--) {
        const cols = lines[idx].split(",");
        const close = Number(cols[4]);
        if (Number.isFinite(close) && close > 0) return close;
    }
    throw new Error("VIX CSV 종가 파싱 실패");
}

async function fetchVixValue() {
    try {
        return await fetchYahooLatestQuote("^VIX");
    } catch (yahooError) {
        log("[VIX] Yahoo 차트 실패, CBOE CSV 폴백 시도...");
        try {
            const csvText = await fetchWithProxyFallback(
                "https://cdn.cboe.com/api/global/us_indices/daily_prices/VIX_History.csv",
                "DATE,OPEN,HIGH,LOW,CLOSE"
            );
            return parseLatestVixCloseFromCsv(csvText);
        } catch (cboeError) {
            throw new Error(`Yahoo/CBOE 모두 실패 (${yahooError.message}; ${cboeError.message})`);
        }
    }
}

async function fetchGoldValue() {
    try {
        return await fetchYahooLatestQuote("GC=F");
    } catch (shortRangeError) {
        log("[GOLD] Yahoo 단기 차트 실패, 1개월 차트 재시도...");
        try {
            const { closes, regularMarketPrice } = await fetchYahooChartSeries("GC=F", "1mo", "1d");
            const fallbackClose = extractLastFiniteNumber(closes);
            const value = Number.isFinite(regularMarketPrice) && regularMarketPrice > 0
                ? regularMarketPrice
                : fallbackClose;

            if (!Number.isFinite(value) || value <= 0) {
                throw new Error("GC=F 1개월 현재가 파싱 실패");
            }

            return value;
        } catch (longRangeError) {
            throw new Error(`Yahoo 금 시세 재시도 실패 (${shortRangeError.message}; ${longRangeError.message})`);
        }
    }
}

function calculateDisparityFromCloses(closes, order = "ascending", currentPrice = null) {
    const values = closes.filter(value => Number.isFinite(value));
    if (values.length < 200) throw new Error("200일치 데이터 부족");

    const latest = Number.isFinite(currentPrice)
        ? currentPrice
        : order === "descending"
            ? values[0]
            : values[values.length - 1];
    const window = order === "descending" ? values.slice(0, 200) : values.slice(-200);
    const sma200 = window.reduce((sum, value) => sum + value, 0) / 200;

    if (!Number.isFinite(latest) || !Number.isFinite(sma200) || sma200 <= 0) {
        throw new Error("이격도 계산용 종가 데이터 이상");
    }

    return {
        currentPrice: latest,
        sma200,
        disparity: (latest / sma200) * 100
    };
}

function parseNaverIndexCloses(html) {
    return [...String(html || "").matchAll(/<td class=\"date\">([\d.]+)<\/td>[\s\S]*?<td class=\"number_1\">([\d,.]+)<\/td>/g)]
        .map(match => Number(match[2].replace(/,/g, "")))
        .filter(value => Number.isFinite(value));
}

async function fetchKospiDisparityFromNaver() {
    const closes = [];
    const maxPages = 40;
    const batchSize = 5;

    for (let startPage = 1; startPage <= maxPages && closes.length < 200; startPage += batchSize) {
        const pages = Array.from(
            { length: Math.min(batchSize, maxPages - startPage + 1) },
            (_, offset) => startPage + offset
        );
        const results = await Promise.allSettled(
            pages.map(page => fetchWithProxyFallback(
                `https://finance.naver.com/sise/sise_index_day.naver?code=KOSPI&page=${page}`,
                "class=\"date\""
            ))
        );

        results.forEach(result => {
            if (result.status === "fulfilled") {
                closes.push(...parseNaverIndexCloses(result.value));
            }
        });
    }

    return calculateDisparityFromCloses(closes, "descending");
}

async function fetchKospiDisparityData() {
    try {
        const { closes, regularMarketPrice } = await fetchYahooChartSeries("^KS11", "1y", "1d");
        const fallbackClose = extractLastFiniteNumber(closes);
        return calculateDisparityFromCloses(
            closes,
            "ascending",
            Number.isFinite(regularMarketPrice) && regularMarketPrice > 0 ? regularMarketPrice : fallbackClose
        );
    } catch (yahooError) {
        log("[KOSPI] Yahoo 차트 실패, 네이버 일별 지수 폴백 시도...");
        try {
            return await fetchKospiDisparityFromNaver();
        } catch (naverError) {
            throw new Error(`Yahoo/네이버 모두 실패 (${yahooError.message}; ${naverError.message})`);
        }
    }
}
