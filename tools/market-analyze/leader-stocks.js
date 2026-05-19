const LEADER_PICK_COUNT = 4;
const LEADER_SCREEN_LIMIT = 60;
const LEADER_PRIMARY_HISTORY_LIMIT = 12;
const LEADER_FALLBACK_HISTORY_LIMIT = 8;
const LEADER_RECENT_HISTORY_DAYS = 15;
const LEADER_WYCKOFF_HISTORY_DAYS = 120;
const LEADER_HISTORY_FETCH_COUNT = 160;
const LEADER_FETCH_CONCURRENCY = 4;
const LEADER_EXCLUDE_REGEX = /(ETF|ETN|KODEX|TIGER|KOSEF|ARIRANG|KBSTAR|HANARO|ACE|SOL|RISE|PLUS|TIMEFOLIO|인버스|레버리지)/i;

function stripLeaderHtml(raw) {
    return String(raw || "").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "").trim();
}

function parseLeaderNumber(raw) {
    const normalized = stripLeaderHtml(raw).replace(/,/g, "");
    const match = normalized.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : NaN;
}

function normalizeLeaderDate(raw) {
    return String(raw || "").replace(/\D/g, "");
}

function dedupeLeaderCandidates(candidates) {
    const deduped = new Map();
    candidates.forEach(candidate => {
        const previous = deduped.get(candidate.code);
        if (!previous || candidate.todayTradingValue > previous.todayTradingValue) {
            deduped.set(candidate.code, candidate);
        }
    });
    return [...deduped.values()];
}

function dedupeLeaderMetrics(items) {
    return [...new Map(items.map(item => [item.code, item])).values()];
}

function isLeaderExcluded(candidate) {
    return LEADER_EXCLUDE_REGEX.test(candidate.name) || !/^\d{6}$/.test(candidate.code);
}

async function runWithConcurrency(items, limit, worker) {
    const results = new Array(items.length);
    let cursor = 0;

    async function consume() {
        while (cursor < items.length) {
            const current = cursor++;
            try {
                results[current] = await worker(items[current], current);
            } catch (error) {
                results[current] = { error, item: items[current] };
            }
        }
    }

    const consumers = Array.from({ length: Math.min(limit, items.length || 1) }, consume);
    await Promise.all(consumers);
    return results;
}

function createLeaderChartUrl(code) {
    return [
        "https://fchart.stock.naver.com/sise.nhn",
        `?symbol=${code}`,
        "&timeframe=day",
        `&count=${Math.max(LEADER_HISTORY_FETCH_COUNT, LEADER_WYCKOFF_HISTORY_DAYS + 10)}`,
        "&requestType=0"
    ].join("");
}

function parseLeaderChartRows(xmlText) {
    const rows = [];
    const itemRegex = /<item[^>]*data="([^"]+)"/gi;
    let match;

    while ((match = itemRegex.exec(String(xmlText || ""))) !== null) {
        const [dateKey, open, high, low, close, volume] = match[1].split("|");
        const parsedRow = {
            dateKey: normalizeLeaderDate(dateKey),
            open: Number(open),
            high: Number(high),
            low: Number(low),
            close: Number(close),
            volume: Number(volume)
        };

        if (
            !parsedRow.dateKey
            || [parsedRow.open, parsedRow.high, parsedRow.low, parsedRow.close, parsedRow.volume].some(value => !Number.isFinite(value))
        ) {
            continue;
        }

        rows.push({
            ...parsedRow,
            tradingValue: ((parsedRow.open + parsedRow.high + parsedRow.low + parsedRow.close) / 4) * parsedRow.volume / 1_000_000
        });
    }

    return [...new Map(rows.map(row => [row.dateKey, row])).values()]
        .sort((left, right) => left.dateKey.localeCompare(right.dateKey))
        .slice(-Math.max(LEADER_HISTORY_FETCH_COUNT, LEADER_WYCKOFF_HISTORY_DAYS));
}

async function fetchLeaderHistory(candidate) {
    const xml = await fetchWithProxyFallback(
        createLeaderChartUrl(candidate.code),
        "<item data=",
        { proxyOrder: ["codetabs", "allorigins"], timeoutMs: 12000 }
    );
    const history = parseLeaderChartRows(xml);

    if (history.length < LEADER_RECENT_HISTORY_DAYS) {
        throw new Error(`${candidate.name} 차트 ${LEADER_RECENT_HISTORY_DAYS}영업일 확보 실패`);
    }

    return history;
}

async function fetchLeaderInvestorSeries(candidate) {
    try {
        const url = `https://m.stock.naver.com/api/stock/${candidate.code}/integration`;
        const rawText = await fetchWithProxyFallback(url, "dealTrendInfos", { timeoutMs: 12000 });
        const json = JSON.parse(rawText);
        const deals = Array.isArray(json?.dealTrendInfos) ? json.dealTrendInfos : [];
        if (!deals.length) {
            return {
                foreignNet: [],
                instNet: [],
                retailNet: [],
                available: false,
                reason: "투자자 수급 시계열 없음"
            };
        }
        const ordered = deals
            .slice()
            .reverse()
            .slice(-LEADER_WYCKOFF_HISTORY_DAYS);
        const parseInvestorValue = (value) => {
            if (typeof value === "number") return Number.isFinite(value) ? value : null;
            if (typeof value === "string") {
                const cleaned = value.replace(/,/g, "").trim();
                if (!cleaned) return null;
                const parsed = Number(cleaned);
                return Number.isFinite(parsed) ? parsed : null;
            }
            return null;
        };
        const normalizeKey = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const flattenEntries = (input, prefix = "") => {
            if (!input || typeof input !== "object") return [];
            return Object.entries(input).flatMap(([key, value]) => {
                const nextKey = prefix ? `${prefix}.${key}` : key;
                if (value && typeof value === "object" && !Array.isArray(value)) {
                    return flattenEntries(value, nextKey);
                }
                return [[nextKey, value]];
            });
        };
        const pickNumber = (row, keys, fallbackTokenGroups = []) => {
            for (const key of keys) {
                const value = parseInvestorValue(row?.[key]);
                if (Number.isFinite(value)) return value;
            }
            const flattened = flattenEntries(row);
            if (!flattened.length || !fallbackTokenGroups.length) return null;
            for (const [rawKey, rawValue] of flattened) {
                const key = normalizeKey(rawKey);
                const matched = fallbackTokenGroups.some(tokens => tokens.every(token => key.includes(token)));
                if (!matched) continue;
                const value = parseInvestorValue(rawValue);
                if (Number.isFinite(value)) return value;
            }
            return null;
        };
        const foreignNet = ordered
            .map(row => pickNumber(
                row,
                ["foreignerPureBuyQuant", "foreignPureBuyQuant", "foreignerNetBuyQuant"],
                [["foreigner", "buy"], ["foreign", "buy"], ["foreigner", "net"], ["foreign", "net"]]
            ))
            .filter(value => Number.isFinite(value));
        const instNet = ordered
            .map(row => pickNumber(
                row,
                ["organPureBuyQuant", "institutionPureBuyQuant", "organNetBuyQuant"],
                [["organ", "buy"], ["institution", "buy"], ["organ", "net"], ["institution", "net"]]
            ))
            .filter(value => Number.isFinite(value));
        const retailNet = ordered
            .map(row => pickNumber(
                row,
                ["individualPureBuyQuant", "retailPureBuyQuant", "individualNetBuyQuant"],
                [["individual", "buy"], ["retail", "buy"], ["individual", "net"], ["retail", "net"]]
            ))
            .filter(value => Number.isFinite(value));
        const available = foreignNet.length > 0 || instNet.length > 0 || retailNet.length > 0;
        return {
            foreignNet,
            instNet,
            retailNet,
            available,
            reason: available ? "" : "투자자 수급 필드/형식 미확인"
        };
    } catch (error) {
        return {
            foreignNet: [],
            instNet: [],
            retailNet: [],
            available: false,
            reason: "투자자 수급 조회 실패"
        };
    }
}

function computeShockMetrics(history) {
    let rollingHigh = 0;
    const shockStart = Math.max(0, history.length - 5);

    for (let idx = 0; idx < history.length; idx += 1) {
        rollingHigh = Math.max(rollingHigh, history[idx].high);
        history[idx].drawdownFromPeakPct = rollingHigh > 0 ? ((history[idx].close / rollingHigh) - 1) * 100 : 0;
    }

    for (let idx = shockStart; idx < history.length; idx += 1) {
        const current = history[idx];
        const previous = history[idx - 1];
        const dayReturnPct = previous ? ((current.close / previous.close) - 1) * 100 : 0;

        if (dayReturnPct <= -6 || current.drawdownFromPeakPct <= -5) {
            const priorWindow = history.slice(Math.max(0, idx - 5), idx);
            const baseline = priorWindow.length
                ? priorWindow.reduce((sum, row) => sum + row.tradingValue, 0) / priorWindow.length
                : null;
            const recoveryRate = current.high > current.low
                ? clamp((current.close - current.low) / (current.high - current.low), 0, 1)
                : 1;

            return {
                shockDate: current.dateKey,
                shockValueRatio: baseline && baseline > 0 ? current.tradingValue / baseline : null,
                closeRecoveryRate: recoveryRate
            };
        }
    }

    return {
        shockDate: null,
        shockValueRatio: null,
        closeRecoveryRate: null
    };
}

function computeThreeDayMetrics(history) {
    if (history.length < 6) {
        return { threeDayDropPct: null, threeDayValueRatio: null };
    }

    const lastThree = history.slice(-3);
    if (!lastThree.every(row => row.close < row.open)) {
        return { threeDayDropPct: null, threeDayValueRatio: null };
    }

    const previousThree = history.slice(-6, -3);
    const startPrice = previousThree.at(-1)?.close || lastThree[0].open;
    const valueBase = previousThree.reduce((sum, row) => sum + row.tradingValue, 0);
    const valueCurrent = lastThree.reduce((sum, row) => sum + row.tradingValue, 0);

    return {
        threeDayDropPct: startPrice > 0 ? ((lastThree.at(-1).close / startPrice) - 1) * 100 : null,
        threeDayValueRatio: valueBase > 0 ? valueCurrent / valueBase : null
    };
}

function computeLeaderMetrics(candidate, fullHistory, investorSeries = null) {
    const recentHistory = fullHistory.slice(-LEADER_RECENT_HISTORY_DAYS);
    const wyckoffHistory = fullHistory.slice(-LEADER_WYCKOFF_HISTORY_DAYS);
    const latest = recentHistory.at(-1);
    const previous = recentHistory.at(-2);
    const highestHigh = Math.max(...recentHistory.map(row => row.high));
    const shockMetrics = computeShockMetrics(recentHistory);
    const threeDayMetrics = computeThreeDayMetrics(recentHistory);

    const foreignNet = investorSeries?.foreignNet || [];
    const instNet = investorSeries?.instNet || [];
    const hasInvestorSeries = investorSeries?.available !== false && (foreignNet.length > 0 || instNet.length > 0);
    const investorSeriesCount = Math.max(foreignNet.length, instNet.length);
    const foreignCumWyckoff = hasInvestorSeries && foreignNet.length
        ? foreignNet.slice(-LEADER_WYCKOFF_HISTORY_DAYS).reduce((acc, v) => acc + (Number(v) || 0), 0)
        : null;
    const instCumWyckoff = hasInvestorSeries && instNet.length
        ? instNet.slice(-LEADER_WYCKOFF_HISTORY_DAYS).reduce((acc, v) => acc + (Number(v) || 0), 0)
        : null;

    let wyckoff = { phase: 'NEUTRAL', confidence: 0, reason: '데이터 부족', metrics: {} };
    if (typeof classifyWyckoffPhase === 'function' && wyckoffHistory.length >= 10) {
        wyckoff = classifyWyckoffPhase({
            ohlcv: wyckoffHistory,
            foreignNet,
            instNet
        });
    }

    return {
        code: candidate.code,
        name: candidate.name,
        weight: 0,
        todayTradingValue: candidate.todayTradingValue,
        history15dCount: recentHistory.length,
        historyWyckoffCount: wyckoffHistory.length,
        cum15dTradingValue: recentHistory.reduce((sum, row) => sum + row.tradingValue, 0),
        dayReturnPct: previous ? ((latest.close / previous.close) - 1) * 100 : null,
        drawdown15dPct: highestHigh > 0 ? ((latest.close / highestHigh) - 1) * 100 : null,
        shockValueRatio: shockMetrics.shockValueRatio,
        threeDayDropPct: threeDayMetrics.threeDayDropPct,
        threeDayValueRatio: threeDayMetrics.threeDayValueRatio,
        closeRecoveryRate: shockMetrics.closeRecoveryRate,
        shockDate: shockMetrics.shockDate,
        latestDate: latest.dateKey,
        investorSeriesCount,
        foreignNetCumWyckoff: foreignCumWyckoff,
        instNetCumWyckoff: instCumWyckoff,
        smartCumWyckoff: Number.isFinite(foreignCumWyckoff) && Number.isFinite(instCumWyckoff) ? foreignCumWyckoff + instCumWyckoff : null,
        investorSeriesAvailable: hasInvestorSeries,
        investorSeriesReason: investorSeries?.reason || "",
        history60dCount: wyckoffHistory.length,
        foreignNetCum60d: foreignCumWyckoff,
        instNetCum60d: instCumWyckoff,
        smartCum60d: Number.isFinite(foreignCumWyckoff) && Number.isFinite(instCumWyckoff) ? foreignCumWyckoff + instCumWyckoff : null,
        wyckoffPhase: wyckoff.phase,
        wyckoffConfidence: wyckoff.confidence,
        wyckoffReason: wyckoff.reason,
        wyckoffCandidatePhase: wyckoff.candidatePhase || 'NEUTRAL',
        wyckoffCandidateReason: wyckoff.candidateReason || ''
    };
}

function buildLeaderHistoryUniverse(candidates) {
    const filtered = candidates.filter(candidate => !isLeaderExcluded(candidate));
    const primary = filtered
        .sort((left, right) => right.todayTradingValue - left.todayTradingValue)
        .slice(0, Math.min(LEADER_PRIMARY_HISTORY_LIMIT, filtered.length));
    const fallbackSeed = typeof createStaticFallbackCandidates === "function"
        ? createStaticFallbackCandidates()
        : [];
    const primaryCodes = new Set(primary.map(candidate => candidate.code));
    const fallback = fallbackSeed
        .filter(candidate => !isLeaderExcluded(candidate) && !primaryCodes.has(candidate.code))
        .slice(0, LEADER_FALLBACK_HISTORY_LIMIT);

    return { filtered, primary, fallback };
}

async function collectLeaderMetrics(universe, label) {
    if (!universe.length) return [];

    const results = await runWithConcurrency(
        universe,
        LEADER_FETCH_CONCURRENCY,
        async candidate => {
            const [history, investorSeries] = await Promise.all([
                fetchLeaderHistory(candidate),
                fetchLeaderInvestorSeries(candidate)
            ]);
            return computeLeaderMetrics(candidate, history, investorSeries);
        }
    );
    const successes = results.filter(result => result && !result.error && Number.isFinite(result.cum15dTradingValue));
    const failures = results.filter(result => result?.error);

    log(`[LEADER] ${label} 히스토리 성공 ${successes.length}건 / 실패 ${failures.length}건`);
    return successes;
}

async function fetchLeaderStocksData(options = {}) {
    log("[LEADER] 대표주 후보 수집 시작...");
    const candidates = await fetchLeaderSeedCandidates(options.quantHtml || "");
    const { filtered, primary, fallback } = buildLeaderHistoryUniverse(candidates);

    log(
        `[LEADER] 후보 ${candidates.length}건 / ETF·ETN 제외 ${candidates.length - filtered.length}건 / `
        + `1차 히스토리 ${primary.length}건 / 백업 ${fallback.length}건`
    );

    let histories = await collectLeaderMetrics(primary, "1차");

    if (histories.length < LEADER_PICK_COUNT && fallback.length) {
        log(`[LEADER] 1차 확보 ${histories.length}건으로 부족하여 정적 백업 ${fallback.length}건을 재시도합니다.`);
        histories = dedupeLeaderMetrics([
            ...histories,
            ...(await collectLeaderMetrics(fallback, "백업"))
        ]);
    }

    const leaderStocks = histories
        .sort((left, right) => right.cum15dTradingValue - left.cum15dTradingValue)
        .slice(0, LEADER_PICK_COUNT);

    if (!leaderStocks.length) {
        throw new Error("대표주 차트 히스토리 기반 산출 실패");
    }

    if (leaderStocks.length < LEADER_PICK_COUNT) {
        log(`<span class='text-amber-400'>[LEADER]</span> 대표주 ${leaderStocks.length}종목만 확보되어 부분 데이터로 진행합니다.`);
    }

    const totalWeight = leaderStocks.reduce((sum, stock) => sum + stock.cum15dTradingValue, 0) || 1;
    leaderStocks.forEach(stock => {
        stock.weight = stock.cum15dTradingValue / totalWeight;
    });

    const leaderSnapshotDate = leaderStocks.map(stock => stock.latestDate).sort().at(-1) || "";
    log(`[LEADER] 최종 대표주 - ${leaderStocks.map(stock => `${stock.name} ${(stock.weight * 100).toFixed(0)}%`).join(", ")}`);

    return {
        leaderSnapshotDate,
        leaderStocks
    };
}
