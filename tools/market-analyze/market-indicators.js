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

function parseNaverMarketindexCurrentValue(html) {
    const patterns = [
        /class=["']value["'][^>]*>\s*([\d,]+(?:\.\d+)?)\s*</i,
        /class=["']no_today["'][^>]*>[\s\S]*?<em[^>]*>\s*([\d,]+(?:\.\d+)?)\s*<\/em>/i,
        /class=["']no_(?:up|down|same)[^"']*["'][^>]*>\s*([\d,]+(?:\.\d+)?)\s*</i
    ];

    for (const pattern of patterns) {
        const match = String(html || "").match(pattern);
        const value = Number(match?.[1]?.replace(/,/g, ""));
        if (Number.isFinite(value) && value > 0) return value;
    }

    throw new Error("네이버 마켓지수 현재가 파싱 실패");
}

function parseNaverWorldDailyQuoteRows(html, limit = 7) {
    const rows = [];
    const trMatches = String(html || "").matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);

    for (const trMatch of trMatches) {
        const tdMatches = [...trMatch[1].matchAll(/<td[^>]*class=["']([^"']+)["'][^>]*>([\s\S]*?)<\/td>/gi)];
        if (tdMatches.length < 4) continue;
        if (!String(tdMatches[0][1] || "").toLowerCase().includes("date")) continue;

        const dateKey = String(tdMatches[0][2] || "").replace(/\D/g, "");
        const close = Number(String(tdMatches[1][2] || "").replace(/<[^>]+>/g, "").replace(/,/g, "").trim());
        const changePct = Number(String(tdMatches[3][2] || "").replace(/<[^>]+>/g, "").replace(/[^\d.+-]/g, ""));
        if (dateKey.length !== 8 || !Number.isFinite(close) || close <= 0) continue;

        rows.push({
            dateKey,
            close,
            changePct: Number.isFinite(changePct) ? changePct : null
        });
        if (rows.length >= limit) break;
    }

    return rows;
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

async function fetchNaverWorldGoldValue() {
    const detailUrls = [
        "https://finance.naver.com/marketindex/worldGoldDetail.naver?marketindexCd=CMDT_GC&fdtc=2",
        "https://finance.naver.com/marketindex/worldGoldDetail.nhn?marketindexCd=CMDT_GC&fdtc=2"
    ];
    const dailyUrls = [
        "https://finance.naver.com/marketindex/worldDailyQuote.nhn?marketindexCd=CMDT_GC&fdtc=2&page=1",
        "https://finance.naver.com/marketindex/worldDailyQuote.naver?marketindexCd=CMDT_GC&fdtc=2&page=1"
    ];
    const errors = [];

    for (const url of detailUrls) {
        try {
            const html = await fetchWithProxyFallback(url, "class=\"value\"");
            return {
                value: parseNaverMarketindexCurrentValue(html),
                mode: "detail-current",
                source: url
            };
        } catch (error) {
            errors.push(`${url}: ${error.message}`);
        }
    }

    for (const url of dailyUrls) {
        try {
            const html = await fetchWithProxyFallback(url, "class=\"date\"");
            const rows = parseNaverWorldDailyQuoteRows(html, 1);
            if (!rows.length) throw new Error("네이버 국제금 일별시세 행이 없습니다.");
            return {
                value: rows[0].close,
                dateKey: rows[0].dateKey,
                mode: "daily-close",
                source: url
            };
        } catch (error) {
            errors.push(`${url}: ${error.message}`);
        }
    }

    throw new Error(`네이버 국제금 시세 파싱 실패 (${errors.slice(0, 4).join("; ")})`);
}

async function fetchNaverDomesticGoldUsdValue(fxRate) {
    if (!Number.isFinite(fxRate) || fxRate <= 0) {
        throw new Error("국내 금 환산용 원/달러 환율이 없습니다.");
    }

    const detailUrls = [
        "https://finance.naver.com/marketindex/goldDetail.naver",
        "https://finance.naver.com/marketindex/goldDetail.nhn"
    ];
    const errors = [];

    for (const url of detailUrls) {
        try {
            const html = await fetchWithProxyFallback(url, "class=\"value\"");
            const krwPerGram = parseNaverMarketindexCurrentValue(html);
            const usdPerOunce = (krwPerGram * 31.1034768) / fxRate;
            if (!Number.isFinite(usdPerOunce) || usdPerOunce <= 0) {
                throw new Error("국내 금 환산값이 유효하지 않습니다.");
            }
            return {
                value: usdPerOunce,
                source: url,
                domesticKrwPerGram: krwPerGram
            };
        } catch (error) {
            errors.push(`${url}: ${error.message}`);
        }
    }

    throw new Error(`네이버 국내 금 시세 파싱 실패 (${errors.slice(0, 4).join("; ")})`);
}

async function fetchGoldValue() {
    try {
        const quote = await fetchNaverWorldGoldValue();
        if (quote.mode === "daily-close") {
            const dateKey = String(quote.dateKey || "");
            const dateLabel = dateKey.length === 8
                ? `${dateKey.slice(0, 4)}.${dateKey.slice(4, 6)}.${dateKey.slice(6, 8)} 종가`
                : "최근 종가";
            log(`[GOLD] 네이버 국제금 일별시세 사용 (${dateLabel})`);
        } else {
            log("[GOLD] 네이버 국제금 현재가 사용");
        }
        return quote.value;
    } catch (naverError) {
        log("[GOLD] 네이버 국제금 실패, 국내 금 시세 환산 폴백 시도...");
        try {
            const quote = await fetchNaverDomesticGoldUsdValue(Number(marketData?.fx));
            log(`[GOLD] 국내 금 시세 ${quote.domesticKrwPerGram.toLocaleString()}원/g 환산 폴백 성공`);
            return quote.value;
        } catch (domesticError) {
            log("[GOLD] 네이버 금 시세 실패, Yahoo 금 선물 폴백 시도...");
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
                    throw new Error(`네이버/Yahoo 금 시세 모두 실패 (${naverError.message}; ${domesticError.message}; ${shortRangeError.message}; ${longRangeError.message})`);
                }
            }
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

function parseMarginHistoryRows(html, limit = 20) {
    const rows = [];
    const trRegex = /<tr[\s\S]*?<\/tr>/gi;
    let match;

    while ((match = trRegex.exec(html)) !== null) {
        const trContent = match[0];
        if (!trContent.includes('class="date"')) continue;

        const tdMatches = [...trContent.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
        if (tdMatches.length < 5) continue;

        const dateKey = normalizeFlowBizDate(stripHtmlTags(tdMatches[0][1]));
        const balance = Number(stripHtmlTags(tdMatches[4][1]).replace(/,/g, ""));
        const deposit = Number(stripHtmlTags(tdMatches[1][1]).replace(/,/g, ""));
        if (!dateKey || !Number.isFinite(balance)) continue;

        rows.push({
            dateKey,
            balance,
            deposit: Number.isFinite(deposit) ? deposit : null
        });
        if (rows.length >= limit) break;
    }

    return rows;
}

function calculateLinearSlope(values) {
    const X = values.map((_, idx) => idx + 1);
    const Y = values;
    const sumX = X.reduce((sum, value) => sum + value, 0);
    const sumY = Y.reduce((sum, value) => sum + value, 0);
    const sumXY = X.reduce((sum, value, idx) => sum + (value * Y[idx]), 0);
    const sumX2 = X.reduce((sum, value) => sum + (value * value), 0);
    return (Y.length * sumXY - sumX * sumY) / (Y.length * sumX2 - sumX * sumX);
}

async function fetchMarginIndicatorData() {
    const html = await fetchWithProxyFallback("https://finance.naver.com/sise/sise_deposit.naver");
    const marginHistory = parseMarginHistoryRows(html, 20);
    if (marginHistory.length < 5) {
        throw new Error("신용융자잔고 5영업일 데이터 확보 실패");
    }

    const recentMarginRows = marginHistory
        .slice(0, 5)
        .slice()
        .reverse()
        .filter(row => Number.isFinite(row.balance));
    if (recentMarginRows.length < 2) {
        throw new Error("신용융자잔고 유효값 부족");
    }

    const recentBalances = recentMarginRows.map(row => row.balance);
    const slope = calculateLinearSlope(recentBalances);
    const marginSlope5dChangePct = recentBalances[0] > 0
        ? ((recentBalances[recentBalances.length - 1] - recentBalances[0]) / recentBalances[0]) * 100
        : null;

    const depositSeries = marginHistory
        .slice(0, 5)
        .map(row => row.deposit)
        .filter(value => Number.isFinite(value));
    const depositSlope = depositSeries.length >= 3
        ? calculateLinearSlope(depositSeries.slice().reverse())
        : null;
    const customerDepositToday = marginHistory[0]?.deposit ?? null;

    return {
        marginSlope: slope,
        marginSlope5dChangePct,
        marginSlopeStartDate: recentMarginRows[0]?.dateKey ?? "",
        marginSlopeEndDate: recentMarginRows[recentMarginRows.length - 1]?.dateKey ?? "",
        marginHistory,
        customerDepositToday,
        customerDepositSlope: depositSlope
    };
}
