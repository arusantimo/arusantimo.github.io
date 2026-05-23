const MARKET_STATUS_PRIORITY = {
    ok: 0,
    partial: 1,
    missing: 2,
    error: 3
};

const MARKET_STATUS_LABEL = {
    ok: "정상",
    partial: "부분 근거",
    missing: "미수집",
    error: "오류"
};

function hasFiniteValue(...values) {
    return values.some(value => value !== null && value !== undefined && Number.isFinite(Number(value)));
}

function normalizeStatusEntry(entry, fallbackEntry) {
    const fallback = fallbackEntry || createStatusEntry();
    if (!entry || typeof entry !== "object") return { ...fallback };
    return {
        state: entry.state || fallback.state,
        source: entry.source || fallback.source,
        message: entry.message || fallback.message
    };
}

function normalizeMarketStatus(status = {}) {
    const defaults = createDefaultMarketStatus();
    return {
        fx: normalizeStatusEntry(status.fx, defaults.fx),
        vix: normalizeStatusEntry(status.vix, defaults.vix),
        gold: normalizeStatusEntry(status.gold, defaults.gold),
        disparity: normalizeStatusEntry(status.disparity, defaults.disparity),
        flow: normalizeStatusEntry(status.flow, defaults.flow),
        leaders: normalizeStatusEntry(status.leaders, defaults.leaders),
        margin: normalizeStatusEntry(status.margin, defaults.margin),
        soros: normalizeStatusEntry(status.soros, defaults.soros),
        minsky: normalizeStatusEntry(status.minsky, defaults.minsky),
        kostolany: normalizeStatusEntry(status.kostolany, defaults.kostolany),
        wyckoff: normalizeStatusEntry(status.wyckoff, defaults.wyckoff),
        anchor: {
            export: normalizeStatusEntry(status.anchor?.export, defaults.anchor.export),
            earnings: normalizeStatusEntry(status.anchor?.earnings, defaults.anchor.earnings),
            broadening: normalizeStatusEntry(status.anchor?.broadening, defaults.anchor.broadening)
        }
    };
}

function getStatusPriority(state) {
    return MARKET_STATUS_PRIORITY[state] ?? MARKET_STATUS_PRIORITY.missing;
}

function getStatusStateLabel(state) {
    return MARKET_STATUS_LABEL[state] || MARKET_STATUS_LABEL.missing;
}

function summarizeStatusEntries(entries = []) {
    const validEntries = entries.filter(Boolean);
    if (!validEntries.length) {
        return createStatusEntry("missing", "artifact", "상태 정보가 없습니다.");
    }

    const worst = validEntries.reduce((currentWorst, entry) => {
        if (!currentWorst) return entry;
        return getStatusPriority(entry.state) > getStatusPriority(currentWorst.state) ? entry : currentWorst;
    }, null);

    const sources = [...new Set(validEntries.map(entry => entry.source).filter(Boolean))];
    const messages = [...new Set(validEntries.map(entry => entry.message).filter(Boolean))];

    return {
        state: worst?.state || "missing",
        source: sources.join(" · ") || worst?.source || "artifact",
        message: messages.join(" · ") || worst?.message || "상태 정보가 없습니다."
    };
}

function flattenMarketStatus(status = marketStatus, options = {}) {
    const includeOk = !!options.includeOk;
    const entries = [];
    const normalized = normalizeMarketStatus(status);

    const addEntry = (key, entry, label) => {
        if (!entry) return;
        if (!includeOk && entry.state === "ok") return;
        entries.push({
            key,
            label,
            state: entry.state,
            source: entry.source,
            message: entry.message
        });
    };

    addEntry("fx", normalized.fx, "환율");
    addEntry("vix", normalized.vix, "VIX");
    addEntry("gold", normalized.gold, "금 시세");
    addEntry("disparity", normalized.disparity, "이격도");
    addEntry("flow", normalized.flow, "시장 수급");
    addEntry("leaders", normalized.leaders, "대표주");
    addEntry("margin", normalized.margin, "신용/예탁금");
    addEntry("soros", normalized.soros, "소로스");
    addEntry("minsky", normalized.minsky, "민스키");
    addEntry("kostolany", normalized.kostolany, "코스톨라니");
    addEntry("wyckoff", normalized.wyckoff, "와이코프");
    addEntry("anchor.export", normalized.anchor.export, "앵커-수출");
    addEntry("anchor.earnings", normalized.anchor.earnings, "앵커-실적");
    addEntry("anchor.broadening", normalized.anchor.broadening, "앵커-확산");

    return entries.sort((left, right) => getStatusPriority(right.state) - getStatusPriority(left.state));
}

function inferMarketStatusFromData(data = {}, source = "legacy_json") {
    const status = createDefaultMarketStatus();
    const sourceLabel = source || "legacy_json";

    const useSnapshot = (hasValue, okMessage, missingMessage) => (
        hasValue
            ? createStatusEntry("partial", sourceLabel, `${okMessage} · 기존 스냅샷 기준`)
            : createStatusEntry("missing", sourceLabel, missingMessage)
    );

    status.fx = useSnapshot(hasFiniteValue(data.fx), "환율 값 확보", "환율 값 없음");
    status.vix = useSnapshot(hasFiniteValue(data.vix), "VIX 값 확보", "VIX 값 없음");
    status.gold = useSnapshot(hasFiniteValue(data.gold), "금 시세 값 확보", "금 시세 값 없음");
    status.disparity = useSnapshot(hasFiniteValue(data.disparity), "이격도 값 확보", "이격도 값 없음");

    const flowAvailable = hasFiniteValue(
        data.retailNetToday,
        data.foreignNetToday,
        data.institutionNetToday,
        data.retailNet10dCum,
        data.foreignNet10dCum,
        data.institutionNet10dCum
    ) || !!data.flowBizDate;
    status.flow = useSnapshot(flowAvailable, "시장 수급 값 확보", "시장 수급 값 없음");

    const leadersAvailable = Array.isArray(data.leaderStocks) && data.leaderStocks.length > 0;
    status.leaders = useSnapshot(leadersAvailable, "대표주/와이코프 입력 확보", "대표주 유니버스 없음");

    const marginAvailable = hasFiniteValue(
        data.marginSlope,
        data.customerDeposit,
        data.depositMarginRatio,
        data.marginShockChangePct,
        data.marginBalanceToday
    );
    status.margin = useSnapshot(marginAvailable, "신용/예탁금 값 확보", "신용/예탁금 값 없음");

    const exportAvailable = !!data.exportLatestMonth || hasFiniteValue(data.exportValueUsd, data.exportYoY, data.exportYoYDelta, data.export3mAvgYoY);
    const earningsAvailable = Number(data.earningsCoverageCount) > 0 || hasFiniteValue(data.opIncomeBreadth, data.netIncomeBreadth, data.turnaroundBreadth, data.positiveRoeBreadth);
    const broadeningAvailable = hasFiniteValue(data.broadeningScore, data.supportBreadth20d, data.supportBreadth60d, data.supportPositiveReturnBreadth);
    status.anchor.export = useSnapshot(exportAvailable, "수출 근거 확보", "수출 근거 없음");
    status.anchor.earnings = useSnapshot(earningsAvailable, "실적 breadth 확보", "실적 breadth 없음");
    status.anchor.broadening = useSnapshot(broadeningAvailable, "확산 근거 확보", "확산 근거 없음");

    status.soros = useSnapshot(hasFiniteValue(data.disparity, data.sentiment), "이격도/심리 입력 확보", "소로스 입력 부족");
    status.minsky = useSnapshot(marginAvailable, "신용/예탁금 입력 확보", "민스키 입력 부족");
    status.kostolany = useSnapshot(hasFiniteValue(data.riskIndex, data.bullRatio, data.customerDeposit), "P-Index/거래대금 입력 확보", "코스톨라니 입력 부족");
    status.wyckoff = useSnapshot(leadersAvailable, "대표주 구조 입력 확보", "와이코프 입력 부족");

    return status;
}

function formatResultDateLabel(raw) {
    const normalized = String(raw || "").replace(/\D/g, "");
    if (normalized.length !== 8) return "-";
    return `${normalized.slice(0, 4)}.${normalized.slice(4, 6)}.${normalized.slice(6, 8)}`;
}

function formatGeneratedAtLabel(raw) {
    if (!raw) return "-";
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return String(raw);
    return date.toLocaleString("ko-KR");
}

async function fetchJsonOrThrow(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`${path} (${response.status})`);
    }
    return response.json();
}

function loadScriptOrThrow(path) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${path}${path.includes("?") ? "&" : "?"}ts=${Date.now()}`;
        script.async = true;
        script.onload = () => {
            script.remove();
            resolve();
        };
        script.onerror = () => {
            script.remove();
            reject(new Error(`스크립트 로드 실패: ${path}`));
        };
        document.head.appendChild(script);
    });
}

function createResultMetaPatch(patch = {}) {
    return {
        ...createDefaultMarketResultMeta(),
        ...patch
    };
}

async function loadLatestMarketArtifact() {
    delete window.__MARKET_ANALYZE_RESULT__;

    try {
        const manifest = await fetchJsonOrThrow("store/results/manifest.json");
        if (!manifest?.latestFile) {
            throw new Error("manifest 최신 파일 정보 없음");
        }

        await loadScriptOrThrow(manifest.latestFile);

        const payload = window.__MARKET_ANALYZE_RESULT__;
        if (!payload || typeof payload !== "object") {
            throw new Error("결과 아티팩트 전역 객체 없음");
        }

        return {
            data: payload.data || {},
            status: normalizeMarketStatus(payload.status || {}),
            meta: createResultMetaPatch({
                resultDate: payload.meta?.resultDate || manifest.latestDate || "",
                generatedAt: payload.meta?.generatedAt || manifest.generatedAt || "",
                schemaVersion: payload.meta?.schemaVersion || manifest.schemaVersion || "",
                loadedFile: manifest.latestFile,
                loadState: "artifact",
                loadMessage: "최신 생성 결과를 불러왔습니다.",
                sourceLabel: "생성 아티팩트",
                fallbackUsed: false
            })
        };
    } catch (artifactError) {
        try {
            await loadScriptOrThrow("store/results/latest.js");
            const payload = window.__MARKET_ANALYZE_RESULT__;
            if (!payload || typeof payload !== "object") {
                throw new Error("latest.js 전역 객체 없음");
            }
            return {
                data: payload.data || {},
                status: normalizeMarketStatus(payload.status || {}),
                meta: createResultMetaPatch({
                    resultDate: payload.meta?.resultDate || "",
                    generatedAt: payload.meta?.generatedAt || "",
                    schemaVersion: payload.meta?.schemaVersion || "",
                    loadedFile: "store/results/latest.js",
                    loadState: "artifact",
                    loadMessage: `manifest 로드 실패로 latest.js 별칭을 사용했습니다 (${artifactError.message})`,
                    sourceLabel: "생성 아티팩트",
                    fallbackUsed: false
                })
            };
        } catch (latestError) {
        try {
            const fallbackData = await fetchJsonOrThrow("store/market_analyze_data.json");
            return {
                data: fallbackData,
                status: inferMarketStatusFromData(fallbackData, "legacy_json"),
                meta: createResultMetaPatch({
                    loadedFile: "store/market_analyze_data.json",
                    loadState: "fallback",
                    loadMessage: `아티팩트 로드 실패로 기존 JSON을 사용합니다 (${artifactError.message}; ${latestError.message})`,
                    schemaVersion: "legacy-fallback",
                    sourceLabel: "기존 JSON 폴백",
                    fallbackUsed: true
                })
            };
        } catch (fallbackError) {
            return {
                data: { ...marketData },
                status: inferMarketStatusFromData(marketData, "local_state"),
                meta: createResultMetaPatch({
                    loadedFile: "localStorage",
                    loadState: "local",
                    loadMessage: `아티팩트/기존 JSON 모두 실패 (${artifactError.message}; ${latestError.message}; ${fallbackError.message})`,
                    schemaVersion: "local-state",
                    sourceLabel: "브라우저 로컬 상태",
                    fallbackUsed: true
                })
            };
        }
        }
    }
}
