const LEADER_STATIC_FALLBACK_CODES = [
    ["005930", "삼성전자"], ["000660", "SK하이닉스"], ["012450", "한화에어로스페이스"], ["034020", "두산에너빌리티"],
    ["005380", "현대차"], ["000270", "기아"], ["105560", "KB금융"], ["086790", "하나금융지주"],
    ["055550", "신한지주"], ["035420", "NAVER"], ["068270", "셀트리온"], ["066570", "LG전자"],
    ["267260", "HD현대일렉트릭"], ["042660", "한화오션"], ["042700", "한미반도체"], ["064350", "현대로템"],
    ["247540", "에코프로비엠"], ["086520", "에코프로"], ["196170", "알테오젠"], ["214450", "파마리서치"]
];

function createMarketSumFieldUrl(page = 1) {
    const returnUrl = encodeURIComponent(`http://finance.naver.com/sise/sise_market_sum.naver?page=${page}`);
    return [
        "https://finance.naver.com/sise/field_submit.naver",
        `?menu=market_sum&returnUrl=${returnUrl}`,
        "&fieldIds=quant",
        "&fieldIds=amount",
        "&fieldIds=market_sum",
        "&fieldIds=frgn_rate",
        "&fieldIds=per",
        "&fieldIds=roe"
    ].join("");
}

function createStaticFallbackCandidates() {
    return LEADER_STATIC_FALLBACK_CODES.map(([code, name], index) => ({
        code,
        name,
        todayTradingValue: LEADER_STATIC_FALLBACK_CODES.length - index
    }));
}

function parseMarketSumPageCount(html) {
    const pages = [...String(html || "").matchAll(/sise_market_sum\.naver\?[^"]*?page=(\d+)/g)]
        .map(match => Number(match[1]))
        .filter(value => Number.isFinite(value));
    return pages.length ? Math.max(...pages) : 1;
}

function parseMarketSumRows(html) {
    return parseLeaderCandidateRows(html, 7, 12);
}

function parseQuantRows(html) {
    return parseLeaderCandidateRows(html, 6, 7);
}

function parseLeaderCandidateRows(html, tradingValueIndex, minimumTdCount) {
    const rows = [];
    const trRegex = /<tr[\s\S]*?<\/tr>/gi;
    let match;

    while ((match = trRegex.exec(html)) !== null) {
        const trContent = match[0];
        if (!trContent.includes('href="/item/main.naver?code=')) continue;

        const codeMatch = trContent.match(/\/item\/main\.naver\?code=([A-Z0-9]+)/);
        const nameMatch = trContent.match(/class="tltle">([^<]+)</);
        const tdMatches = [...trContent.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
        if (!codeMatch || !nameMatch || tdMatches.length < minimumTdCount) continue;

        const todayTradingValue = parseLeaderNumber(tdMatches[tradingValueIndex][1]);
        if (!Number.isFinite(todayTradingValue)) continue;

        rows.push({
            code: codeMatch[1],
            name: stripLeaderHtml(nameMatch[1]),
            todayTradingValue
        });
    }

    return rows;
}

async function fetchMarketSumCandidates() {
    const firstHtml = await fetchWithProxyFallback(createMarketSumFieldUrl(1), "거래대금");
    const pageCount = parseMarketSumPageCount(firstHtml);
    const pages = Array.from({ length: Math.max(0, pageCount - 1) }, (_, idx) => idx + 2);
    const fetchedPages = await runWithConcurrency(pages, LEADER_FETCH_CONCURRENCY, page =>
        fetchWithProxyFallback(createMarketSumFieldUrl(page), "거래대금")
    );

    return [firstHtml, ...fetchedPages.filter(page => typeof page === "string")].flatMap(parseMarketSumRows);
}

async function fetchQuantCandidates(prefetchedHtml = "") {
    const html = prefetchedHtml || await fetchWithProxyFallback("https://finance.naver.com/sise/sise_quant.naver", "거래대금");
    const candidates = parseQuantRows(html);
    if (!candidates.length) {
        throw new Error("거래상위 후보 파싱 실패");
    }
    return candidates;
}

async function fetchLeaderSeedCandidates(prefetchedQuantHtml = "") {
    const gathered = [];

    try {
        const quantCandidates = await fetchQuantCandidates(prefetchedQuantHtml);
        gathered.push(...quantCandidates);
        log(`[LEADER] 거래상위 기반 후보 ${quantCandidates.length}건 확보`);
    } catch (error) {
        log(`<span class='text-amber-400'>[LEADER]</span> 거래상위 후보 수집 실패(${error.message})`);
    }

    if (gathered.length < LEADER_SCREEN_LIMIT) {
        try {
            const marketSumCandidates = await fetchMarketSumCandidates();
            gathered.push(...marketSumCandidates);
            log(`[LEADER] 시가총액/거래대금 후보 ${marketSumCandidates.length}건 추가 확보`);
        } catch (error) {
            log(`<span class='text-amber-400'>[LEADER]</span> 시가총액 후보 수집 실패(${error.message})`);
        }
    }

    if (gathered.length < LEADER_PICK_COUNT) {
        const fallbackCandidates = createStaticFallbackCandidates();
        gathered.push(...fallbackCandidates);
        log(`[LEADER] 정적 백업 유니버스 ${fallbackCandidates.length}건 사용`);
    }

    const candidates = dedupeLeaderCandidates(gathered);
    if (!candidates.length) {
        throw new Error("대표주 후보 소스 확보 실패");
    }
    return candidates;
}
