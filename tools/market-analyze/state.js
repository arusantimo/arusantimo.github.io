// 전역 상태 변수 설정
const BUBBLE_FLAG_KEYS = ["marginDebt", "ipo", "trash", "fed"];
const BUBBLE_FLAG_LABELS = {
    marginDebt: "신용매수 과열",
    ipo: "공모주 광풍",
    trash: "적자 혁신주 투기",
    fed: "연준 브레이크"
};

function createStatusEntry(state = "missing", source = "artifact", message = "데이터 대기 중") {
    return { state, source, message };
}

function createDefaultBubbleSignal(flagKey, reason = "버블 플래그 대기 중") {
    return {
        score: 0,
        state: "neutral",
        critical: false,
        label: BUBBLE_FLAG_LABELS[flagKey] || flagKey || "버블 플래그",
        reason,
        metrics: {},
        updatedAt: ""
    };
}

function createDefaultBubbleSignals() {
    return {
        marginDebt: createDefaultBubbleSignal("marginDebt"),
        ipo: createDefaultBubbleSignal("ipo"),
        trash: createDefaultBubbleSignal("trash"),
        fed: createDefaultBubbleSignal("fed")
    };
}

function createDefaultMarketStatus() {
    return {
        fx: createStatusEntry("missing", "artifact", "환율 결과 대기 중"),
        vix: createStatusEntry("missing", "artifact", "VIX 결과 대기 중"),
        gold: createStatusEntry("missing", "artifact", "금 시세 결과 대기 중"),
        disparity: createStatusEntry("missing", "artifact", "이격도 결과 대기 중"),
        flow: createStatusEntry("missing", "artifact", "시장 수급 결과 대기 중"),
        leaders: createStatusEntry("missing", "artifact", "대표주 유니버스 결과 대기 중"),
        margin: createStatusEntry("missing", "artifact", "신용/예탁금 결과 대기 중"),
        soros: createStatusEntry("missing", "artifact", "소로스 입력 근거 대기 중"),
        minsky: createStatusEntry("missing", "artifact", "민스키 입력 근거 대기 중"),
        kostolany: createStatusEntry("missing", "artifact", "코스톨라니 입력 근거 대기 중"),
        wyckoff: createStatusEntry("missing", "artifact", "와이코프 입력 근거 대기 중"),
        anchor: {
            export: createStatusEntry("missing", "artifact", "수출 모멘텀 결과 대기 중"),
            earnings: createStatusEntry("missing", "artifact", "실적 breadth 결과 대기 중"),
            broadening: createStatusEntry("missing", "artifact", "확산 결과 대기 중"),
            sectorBreadth: createStatusEntry("missing", "artifact", "비반도체 업종 확산 결과 대기 중"),
            valuation: createStatusEntry("missing", "artifact", "밸류에이션 안정도 결과 대기 중"),
            support: createStatusEntry("missing", "artifact", "펀더멘털 지지력 결과 대기 중")
        },
        bubble: {
            marginDebt: createStatusEntry("missing", "artifact", "버블-신용매수 결과 대기 중"),
            ipo: createStatusEntry("missing", "artifact", "버블-IPO 결과 대기 중"),
            trash: createStatusEntry("missing", "artifact", "버블-적자 혁신주 결과 대기 중"),
            fed: createStatusEntry("missing", "artifact", "버블-Fed 결과 대기 중"),
            critical: createStatusEntry("missing", "artifact", "버블 Critical Trigger 결과 대기 중")
        }
    };
}

function createDefaultMarketResultMeta() {
    return {
        resultDate: "",
        latestDate: "",
        generatedAt: "",
        schemaVersion: "",
        loadedFile: "",
        loadState: "idle",
        loadMessage: "생성 결과 아티팩트를 기다리는 중입니다.",
        sourceLabel: "아티팩트 대기",
        fallbackUsed: false,
        availableDates: [],
        requestedResultDate: "latest",
        resolvedResultDate: "",
        loadTargetLabel: "최신 생성본"
    };
}

function createDefaultArtifactViewSettings() {
    return {
        selectedResultDate: "latest"
    };
}

function createDefaultMarketData() {
    return {
        fx: 1350,
        vix: 15.0,
        sentiment: 50,
        sentimentSource: "snapshot-fallback",
        gold: 2300,
        disparity: 100,
        bullRatio: 50,
        marginSlope: 0,
        marginSlope5dChangePct: null,
        marginSlopeStartDate: "",
        marginSlopeEndDate: "",
        rawRiskIndex: null,
        macroStressScore: null,
        greedScore: null,
        equityOverboughtScore: null,
        riskIndex: null,
        previousRiskIndex: null,
        cycleLeg: "rising",
        cycleStageKey: "skepticism",
        cycleStageLabel: "상승 3: 회의",
        stageOverrideReason: "",
        retailNetToday: null,
        foreignNetToday: null,
        institutionNetToday: null,
        retailNet10dCum: null,
        foreignNet10dCum: null,
        institutionNet10dCum: null,
        retailNet10dAbsAvg: null,
        retailNet10dAbsSum: null,
        flowBizDate: "",
        flowBonus: 0,
        flowReason: "수급 데이터 대기 중 (중립 처리)",
        trapScore: 0,
        trapState: "neutral",
        trapReason: "트랩 데이터 대기 중 (중립 처리)",
        trapFlowScore: 0,
        trapMarginScore: 0,
        trapFirstShockScore: 0,
        trapThreeDayScore: 0,
        trapRecoveryScore: 0,
        leaderSnapshotDate: "",
        leaderStocks: [],
        shockAnchorDate: "",
        marginBalanceToday: null,
        marginBalanceBeforeShock: null,
        marginShockChangePct: null,
        customerDeposit: null,
        customerDepositSlope: null,
        depositMarginRatio: null,
        reflexivitySynergyPoints: 0,
        reflexivityState: "normal",
        debasementAlert: false,
        supportOffsetPoints: 0,
        fundamentalAnchorScore: null,
        fundamentalAnchorState: "neutral",
        fundamentalAnchorReason: "펀더멘털 앵커 대기 중",
        fundamentalSupportScore: null,
        fundamentalSupportState: "neutral",
        fundamentalSupportReason: "펀더멘털 지지력 대기 중",
        exportLatestMonth: "",
        exportValueUsd: null,
        exportYoY: null,
        exportYoYDelta: null,
        export3mAvgYoY: null,
        earningsCoverageCount: 0,
        earningsSnapshotQuarter: "",
        opIncomeBreadth: null,
        netIncomeBreadth: null,
        turnaroundBreadth: null,
        positiveRoeBreadth: null,
        broadeningScore: null,
        broadeningState: "neutral",
        supportBreadth20d: null,
        supportBreadth60d: null,
        supportPositiveReturnBreadth: null,
        nonSemiconductorMomentum: null,
        nonSemiconductorMomentumCoverageCount: 0,
        nonSemiconductorMomentumPassCount: 0,
        nonSemiconductorMomentumProxy: false,
        nonSemiconductorMomentumProxyReason: "",
        marketValuationStability: null,
        marketValuationScore: null,
        marketValuationCoverageCount: 0,
        marketValuationForwardPerAvg: null,
        marketValuationThreshold: 13,
        marketValuationMethod: "forward",
        marketValuationProxyCount: 0,
        marketRegimeKey: "standard",
        marketRegimeLabel: "표준 레짐",
        marketRegimeReason: "특수 레짐 조건 대기 중",
        bubbleIndex: 0,
        bubbleState: "standard",
        bubbleRegimeLabel: "표준 버블 경계",
        bubbleRegimeReason: "버블 엔진 대기 중",
        bubbleCriticalTrigger: false,
        bubbleCriticalReason: "Critical Trigger 대기 중",
        bubbleActiveFlagCount: 0,
        bubbleSignals: createDefaultBubbleSignals(),
        bubblePanelSelectedKey: "marginDebt",
        wyckoffDistributionBreadth: null,
        marketEvaluationState: "neutral",
        marketEvaluationLabel: "판단 보류",
        marketFlowTitle: "데이터 대기 중",
        marketFlowNarrative: "생성된 결과 아티팩트를 읽어 현재 시장 흐름을 한 문장으로 정리합니다.",
        marketAdviceBias: 2,
        marketAdviceStance: "균형 유지",
        marketAdviceReason: "시장 판단 전 기본값",
        marketAdviceActions: {
            now: "최신 생성본을 불러오면 현재 행동 가이드가 표시됩니다.",
            watch: "누락 지표가 있으면 부분 근거 상태와 함께 표시됩니다.",
            break: "리스크 모델이 겹치면 방어 강도가 자동으로 높아집니다."
        },
        kostolanyStage: "B2",
        kostolanyDivergenceNote: "",
        lastSyncTime: ""
    };
}

function normalizeBubbleSignal(flagKey, signal) {
    const fallback = createDefaultBubbleSignal(flagKey);
    if (!signal || typeof signal !== "object") {
        return { ...fallback };
    }
    return {
        score: Number.isFinite(Number(signal.score)) ? Number(signal.score) : fallback.score,
        state: signal.state || fallback.state,
        critical: Boolean(signal.critical),
        label: signal.label || fallback.label,
        reason: signal.reason || fallback.reason,
        metrics: signal.metrics && typeof signal.metrics === "object" ? { ...signal.metrics } : {},
        updatedAt: signal.updatedAt || ""
    };
}

function normalizeBubbleSignals(signals = {}) {
    return {
        marginDebt: normalizeBubbleSignal("marginDebt", signals.marginDebt),
        ipo: normalizeBubbleSignal("ipo", signals.ipo),
        trash: normalizeBubbleSignal("trash", signals.trash),
        fed: normalizeBubbleSignal("fed", signals.fed)
    };
}

function normalizeBubbleFlagKey(flagKey) {
    return BUBBLE_FLAG_KEYS.includes(flagKey) ? flagKey : "marginDebt";
}

function normalizeMarketData(data = {}) {
    const defaults = createDefaultMarketData();
    return {
        ...defaults,
        ...data,
        sentimentSource: typeof normalizeSentimentSource === "function"
            ? normalizeSentimentSource(data.sentimentSource, Number.isFinite(Number(data.sentiment)))
            : (data.sentimentSource || defaults.sentimentSource),
        marketAdviceActions: {
            ...defaults.marketAdviceActions,
            ...(data.marketAdviceActions && typeof data.marketAdviceActions === "object" ? data.marketAdviceActions : {})
        },
        bubbleSignals: normalizeBubbleSignals(data.bubbleSignals),
        bubblePanelSelectedKey: normalizeBubbleFlagKey(data.bubblePanelSelectedKey)
    };
}

function hydrateLegacyBubbleBundle(data = {}, status = {}, source = "legacy") {
    const normalizedData = normalizeMarketData(data);
    const normalizedStatus = normalizeMarketStatus(status);
    const hasBubbleSignalPayload = data?.bubbleSignals && typeof data.bubbleSignals === "object" && Object.keys(data.bubbleSignals).length > 0;
    const hasBubbleStatusPayload = status?.bubble && typeof status.bubble === "object" && Object.keys(status.bubble).length > 0;
    if (hasBubbleSignalPayload || hasBubbleStatusPayload) {
        return { data: normalizedData, status: normalizedStatus };
    }

    const fallbackSource = source || "legacy";
    const fallbackMessage = `${fallbackSource}에 bubble 필드가 없어 중립 기본값으로 채웠습니다.`;
    normalizedStatus.bubble = {
        marginDebt: createStatusEntry("partial", fallbackSource, fallbackMessage),
        ipo: createStatusEntry("partial", fallbackSource, fallbackMessage),
        trash: createStatusEntry("partial", fallbackSource, fallbackMessage),
        fed: createStatusEntry("partial", fallbackSource, fallbackMessage),
        critical: createStatusEntry("partial", fallbackSource, fallbackMessage)
    };
    return { data: normalizedData, status: normalizedStatus };
}

let marketData = createDefaultMarketData();

let marketStatus = createDefaultMarketStatus();
let marketResultMeta = createDefaultMarketResultMeta();
let artifactViewSettings = createDefaultArtifactViewSettings();

let analysisSettings = {
    kosisApiKey: "",
    dartApiKey: ""
};

let portfolioData = {
    isa: { aggressiveRatio: 0 },
    pension: { aggressiveRatio: 0 },
    genLong: { cashRatio: 0, aggressiveRatio: 0 },
    quant: { cashRatio: 0 }
};

const logContainer = document.getElementById("sys-log");

function log(message) {
    if (!logContainer) return;
    const time = new Date().toLocaleTimeString("ko-KR", { hour12: false });
    const logRow = document.createElement("div");
    logRow.innerHTML = `<span class="text-slate-600">[${time}]</span> ${message}`;
    logContainer.appendChild(logRow);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function saveMarketData() {
    localStorage.setItem("marketAnalyzeData", JSON.stringify(marketData));
    localStorage.setItem("marketAnalyzeStatus", JSON.stringify(marketStatus));
    localStorage.setItem("marketAnalyzeResultMeta", JSON.stringify(marketResultMeta));
    localStorage.setItem("marketAnalyzeViewSettings", JSON.stringify(artifactViewSettings));
    localStorage.setItem("portfolioAnalyzeData", JSON.stringify(portfolioData));
    localStorage.setItem("marketAnalyzeSettings", JSON.stringify(analysisSettings));
}

function loadMarketData() {
    const savedPortfolio = localStorage.getItem("portfolioAnalyzeData");
    const savedSettings = localStorage.getItem("marketAnalyzeSettings");

    if (savedPortfolio) {
        try {
            const parsed = JSON.parse(savedPortfolio);
            portfolioData = { ...portfolioData, ...parsed };
        } catch (error) {
            console.error("포트폴리오 데이터 파싱 오류", error);
        }
    }

    if (savedSettings) {
        try {
            const parsed = JSON.parse(savedSettings);
            analysisSettings = { ...analysisSettings, ...parsed };
        } catch (error) {
            console.error("분석 설정 파싱 오류", error);
        }
    }

    return !!(savedPortfolio || savedSettings);
}

function restoreRuntimeStateFromLocalStorage() {
    const savedMarket = localStorage.getItem("marketAnalyzeData");
    const savedStatus = localStorage.getItem("marketAnalyzeStatus");
    const savedResultMeta = localStorage.getItem("marketAnalyzeResultMeta");

    if (savedMarket || savedStatus) {
        try {
            const parsedMarket = savedMarket ? JSON.parse(savedMarket) : {};
            const parsedStatus = savedStatus ? JSON.parse(savedStatus) : {};
            const hydrated = hydrateLegacyBubbleBundle(parsedMarket, parsedStatus, "local_state");
            marketData = hydrated.data;
            marketStatus = hydrated.status;
        } catch (error) {
            console.error("시장 데이터/상태 파싱 오류", error);
        }
    }

    if (savedResultMeta) {
        try {
            const parsed = JSON.parse(savedResultMeta);
            marketResultMeta = { ...createDefaultMarketResultMeta(), ...parsed };
        } catch (error) {
            console.error("결과 메타 파싱 오류", error);
        }
    }

    return !!(savedMarket || savedStatus || savedResultMeta);
}
