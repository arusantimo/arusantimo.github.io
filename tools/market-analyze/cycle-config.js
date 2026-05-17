const CYCLE_RING_START_ANGLE = 150;

const CYCLE_STAGES = [
    {
        key: "panic",
        order: 0,
        ringLabel: "상승 1",
        shortLabel: "투매",
        fullLabel: "상승 1: 투매",
        leg: "rising",
        min: 0,
        max: 20,
        accent: "#22d3ee",
        soft: "rgba(34, 211, 238, 0.18)",
        desc: "강제 청산과 공포가 극대화된 구간입니다. 현금 버퍼를 가진 투자자에게는 가장 매력적인 역발상 진입 구간입니다.",
        cashTarget: 5,
        aggressiveTarget: 90
    },
    {
        key: "pessimism",
        order: 1,
        ringLabel: "상승 2",
        shortLabel: "비관",
        fullLabel: "상승 2: 비관",
        leg: "rising",
        min: 21,
        max: 35,
        accent: "#38bdf8",
        soft: "rgba(56, 189, 248, 0.18)",
        desc: "뉴스와 심리는 여전히 어둡지만, 바닥 통과 기대가 서서히 반영되기 시작하는 회복 초입입니다.",
        cashTarget: 10,
        aggressiveTarget: 82
    },
    {
        key: "skepticism",
        order: 2,
        ringLabel: "상승 3",
        shortLabel: "회의",
        fullLabel: "상승 3: 회의",
        leg: "rising",
        min: 36,
        max: 50,
        accent: "#4ade80",
        soft: "rgba(74, 222, 128, 0.18)",
        desc: "가격은 회복하는데 다수는 아직 믿지 못하는 구간입니다. 펀더멘털과 가격이 다시 수렴하기 시작합니다.",
        cashTarget: 15,
        aggressiveTarget: 72
    },
    {
        key: "optimism",
        order: 3,
        ringLabel: "상승 4",
        shortLabel: "낙관",
        fullLabel: "상승 4: 낙관",
        leg: "rising",
        min: 51,
        max: 65,
        accent: "#fbbf24",
        soft: "rgba(251, 191, 36, 0.18)",
        desc: "상승 추세가 대중적으로 인정되는 구간입니다. 추세 추종이 유효하지만 과속 여부를 병행 점검해야 합니다.",
        cashTarget: 20,
        aggressiveTarget: 60
    },
    {
        key: "greed",
        order: 4,
        ringLabel: "상승 5",
        shortLabel: "탐욕",
        fullLabel: "상승 5: 탐욕",
        leg: "rising",
        min: 66,
        max: 80,
        accent: "#fb923c",
        soft: "rgba(251, 146, 60, 0.18)",
        desc: "추세는 강하지만 리스크 프라이싱이 둔화되는 과열 구간입니다. 방어 자산과 현금 비중을 점진적으로 올릴 시기입니다.",
        cashTarget: 30,
        aggressiveTarget: 40
    },
    {
        key: "euphoria",
        order: 5,
        ringLabel: "정점",
        shortLabel: "환희",
        fullLabel: "정점: 환희",
        leg: "peak",
        min: 81,
        max: 100,
        accent: "#f43f5e",
        soft: "rgba(244, 63, 94, 0.18)",
        desc: "기대 심리가 실물보다 앞서가는 정점 구간입니다. 신규 공격 매수보다 차익 실현과 현금 잠금이 우선입니다.",
        cashTarget: 70,
        aggressiveTarget: 15
    },
    {
        key: "complacency",
        order: 6,
        ringLabel: "하락 1",
        shortLabel: "안도·자만",
        fullLabel: "하락 1: 안도·자만",
        leg: "falling",
        min: 61,
        max: 80,
        accent: "#f97316",
        soft: "rgba(249, 115, 22, 0.18)",
        desc: "첫 급락을 건전한 눌림목으로 오해하기 쉬운 구간입니다. 개인이 물량을 받아내고 스마트 머니가 이탈하면 함정일 가능성이 큽니다.",
        cashTarget: 85,
        aggressiveTarget: 10
    },
    {
        key: "denial",
        order: 7,
        ringLabel: "하락 2",
        shortLabel: "불안·부인",
        fullLabel: "하락 2: 불안·부인",
        leg: "falling",
        min: 41,
        max: 60,
        accent: "#ef4444",
        soft: "rgba(239, 68, 68, 0.18)",
        desc: "반등 기대가 반복적으로 깨지는 구간입니다. 손실 회피 심리가 강해지므로 방어 기조를 흔들리지 않게 유지해야 합니다.",
        cashTarget: 70,
        aggressiveTarget: 25
    },
    {
        key: "capitulation",
        order: 8,
        ringLabel: "하락 3",
        shortLabel: "공포·항복",
        fullLabel: "하락 3: 공포·항복",
        leg: "falling",
        min: 21,
        max: 40,
        accent: "#a855f7",
        soft: "rgba(168, 85, 247, 0.18)",
        desc: "포지션 청산과 손절이 급격히 늘어나는 구간입니다. 바닥 형성 전후 분할 재진입 준비를 병행할 수 있습니다.",
        cashTarget: 40,
        aggressiveTarget: 50
    }
];

const CYCLE_STAGE_MAP = Object.fromEntries(CYCLE_STAGES.map(stage => [stage.key, stage]));

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function getCycleStage(stageKey) {
    return CYCLE_STAGE_MAP[stageKey] || CYCLE_STAGES[2];
}

function getCycleLegLabel(leg) {
    return leg === "falling" ? "하락 레그" : "상승 레그";
}

function resolveCycleLeg(previousRiskIndex, riskIndex, previousLeg = "rising") {
    if (!Number.isFinite(previousRiskIndex)) {
        return previousLeg || "rising";
    }

    const delta = riskIndex - previousRiskIndex;
    if (delta >= 2) return "rising";
    if (delta <= -2) return "falling";
    return previousLeg || "rising";
}

function getRiskDeltaLabel(previousRiskIndex, riskIndex) {
    if (!Number.isFinite(previousRiskIndex)) {
        return "직전 비교값 없음";
    }

    const delta = riskIndex - previousRiskIndex;
    const sign = delta > 0 ? "+" : "";
    return `직전 대비 ${sign}${delta.toFixed(1)}점`;
}

function getStageProgress(stage, riskIndex, trapScore = 0) {
    if (!stage) return 0;

    if (stage.key === "complacency" && trapScore >= 10 && trapScore <= 13) {
        return clamp((trapScore - 10) / 3, 0, 1);
    }

    if (stage.key === "denial" && trapScore >= 14) {
        return clamp((trapScore - 14) / 6, 0, 1);
    }

    const span = Math.max(1, stage.max - stage.min);
    return clamp((riskIndex - stage.min) / span, 0, 1);
}

function getStageTone(stageProgress) {
    if (stageProgress <= 0.34) return "초입";
    if (stageProgress >= 0.67) return "후반";
    return "중반";
}

function resolveCycleStage(riskIndex, vix, cycleLeg, trapScore) {
    if (riskIndex <= 20 || vix >= 30) return getCycleStage("panic");
    if (trapScore >= 14) return getCycleStage("denial");
    if (trapScore >= 10) return getCycleStage("complacency");
    if (riskIndex >= 81) return getCycleStage("euphoria");

    if (cycleLeg === "falling") {
        if (riskIndex >= 61) return getCycleStage("complacency");
        if (riskIndex >= 41) return getCycleStage("denial");
        if (riskIndex >= 21) return getCycleStage("capitulation");
    }

    if (riskIndex <= 35) return getCycleStage("pessimism");
    if (riskIndex <= 50) return getCycleStage("skepticism");
    if (riskIndex <= 65) return getCycleStage("optimism");
    if (riskIndex <= 80) return getCycleStage("greed");
    return getCycleStage("euphoria");
}

function getPortfolioTargets(stageKey, isDebasement = false) {
    const stage = getCycleStage(stageKey);
    if (isDebasement) {
        return {
            cashTarget: Math.max(stage.cashTarget, 85),
            aggressiveTarget: Math.min(stage.aggressiveTarget, 10)
        };
    }

    return {
        cashTarget: stage.cashTarget,
        aggressiveTarget: stage.aggressiveTarget
    };
}
