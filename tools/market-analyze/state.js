// 전역 상태 변수 설정
function createStatusEntry(state = "missing", source = "artifact", message = "데이터 대기 중") {
    return { state, source, message };
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

let marketData = {
    fx: 1350,
    vix: 15.0,
    sentiment: 50,
    gold: 2300,
    disparity: 100,
    bullRatio: 50,
    marginSlope: 0,
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
    marketValuationStability: null,
    marketValuationScore: null,
    marketValuationCoverageCount: 0,
    marketValuationForwardPerAvg: null,
    marketValuationThreshold: 13,
    marketRegimeKey: "standard",
    marketRegimeLabel: "표준 레짐",
    marketRegimeReason: "특수 레짐 조건 대기 중",
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
    const savedMarket = localStorage.getItem("marketAnalyzeData");
    const savedStatus = localStorage.getItem("marketAnalyzeStatus");
    const savedResultMeta = localStorage.getItem("marketAnalyzeResultMeta");
    const savedViewSettings = localStorage.getItem("marketAnalyzeViewSettings");
    const savedPortfolio = localStorage.getItem("portfolioAnalyzeData");
    const savedSettings = localStorage.getItem("marketAnalyzeSettings");

    if (savedMarket) {
        try {
            const parsed = JSON.parse(savedMarket);
            marketData = { ...marketData, ...parsed };
        } catch (error) {
            console.error("시장 데이터 파싱 오류", error);
        }
    }

    if (savedStatus) {
        try {
            const parsed = JSON.parse(savedStatus);
            marketStatus = { ...createDefaultMarketStatus(), ...parsed };
            marketStatus.anchor = { ...createDefaultMarketStatus().anchor, ...(parsed.anchor || {}) };
        } catch (error) {
            console.error("시장 상태 파싱 오류", error);
        }
    }

    if (savedResultMeta) {
        try {
            const parsed = JSON.parse(savedResultMeta);
            marketResultMeta = { ...marketResultMeta, ...parsed };
        } catch (error) {
            console.error("결과 메타 파싱 오류", error);
        }
    }

    if (savedViewSettings) {
        try {
            const parsed = JSON.parse(savedViewSettings);
            artifactViewSettings = { ...artifactViewSettings, ...parsed };
        } catch (error) {
            console.error("결과 로딩 설정 파싱 오류", error);
        }
    }

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

    return !!(savedMarket || savedStatus || savedResultMeta || savedViewSettings || savedPortfolio || savedSettings);
}
