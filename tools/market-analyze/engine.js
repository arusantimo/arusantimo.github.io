const CYCLE_RING_POINTER_RADIUS = 84;
const CYCLE_RING_NODE_RADIUS = 38;
const CYCLE_RING_VIEWBOX_CENTER = 120;

function resolveCycleTooltipSide(point) {
    if (point.y <= 28) return "bottom";
    if (point.y >= 72) return "top";
    if (point.x <= 32) return "right";
    if (point.x >= 68) return "left";
    return "top";
}

function renderCycleRingScaffold() {
    const layer = document.getElementById("cycle-ring-node-layer");
    if (!layer || layer.childElementCount) return;

    CYCLE_STAGES.forEach(stage => {
        const point = getCycleRingPoint(stage.order / CYCLE_STAGES.length, CYCLE_RING_NODE_RADIUS);
        const offsetX = point.x - 50;
        const offsetY = point.y - 50;
        const magnitude = Math.hypot(offsetX, offsetY) || 1;
        const node = document.createElement("div");
        node.className = "cycle-ring-node";
        node.dataset.stageKey = stage.key;
        node.dataset.tooltipSide = resolveCycleTooltipSide(point);
        node.setAttribute("tabindex", "0");
        node.setAttribute("aria-label", `${stage.fullLabel}. ${stage.desc}`);
        node.style.left = `${point.x}%`;
        node.style.top = `${point.y}%`;
        node.style.setProperty("--label-shift-x", `${((offsetX / magnitude) * 8).toFixed(2)}px`);
        node.style.setProperty("--label-shift-y", `${((offsetY / magnitude) * 8).toFixed(2)}px`);
        node.innerHTML = `
            <div class="cycle-ring-node-dot"></div>
            <div class="cycle-ring-node-label">
                <span class="cycle-ring-node-prefix">${stage.ringLabel}</span>
                <span class="cycle-ring-node-name">${stage.shortLabel}</span>
            </div>
            <div class="cycle-ring-tooltip" aria-hidden="true">
                <div class="cycle-ring-tooltip-title">${stage.fullLabel}</div>
                <div class="cycle-ring-tooltip-body">${stage.desc}</div>
            </div>
        `;
        layer.appendChild(node);
    });
}

function getCycleRingPoint(progressRatio, radius = CYCLE_RING_POINTER_RADIUS) {
    const angle = (CYCLE_RING_START_ANGLE + (progressRatio * 360)) * (Math.PI / 180);
    return {
        x: 50 + (radius * Math.cos(angle)),
        y: 50 + (radius * Math.sin(angle))
    };
}

function getCycleRingSvgPoint(progressRatio, radius = CYCLE_RING_POINTER_RADIUS) {
    const angle = (progressRatio * 360) * (Math.PI / 180);
    return {
        x: CYCLE_RING_VIEWBOX_CENTER + (radius * Math.cos(angle)),
        y: CYCLE_RING_VIEWBOX_CENTER + (radius * Math.sin(angle))
    };
}

function updateCycleRing(stage, stageProgress) {
    renderCycleRingScaffold();

    const card = document.getElementById("cycle-card");
    const pointerAuraEl = document.getElementById("cycle-ring-pointer-aura");
    const pointerRingEl = document.getElementById("cycle-ring-pointer-ring");
    const pointerEl = document.getElementById("cycle-ring-pointer");
    const centerLabelEl = document.getElementById("cycle-ring-center-label");
    const centerScoreEl = document.getElementById("cycle-ring-center-score");
    const centerMiniEl = document.getElementById("cycle-ring-center-mini");
    const progressRatio = Math.min(clamp((stage.order + stageProgress) / CYCLE_STAGES.length, 0, 1), 0.999);
    const point = getCycleRingSvgPoint(progressRatio, CYCLE_RING_POINTER_RADIUS);
    const highlightStartOrder = stage.leg === "falling" ? 6 : 0;
    const highlightEndOrder = stage.leg === "falling" ? 8 : 5;

    card.style.setProperty("--cycle-accent", stage.accent);
    card.style.setProperty("--cycle-soft", stage.soft);
    card.style.borderColor = `${stage.accent}55`;
    card.style.boxShadow = `0 0 0 1px ${stage.accent}22, 0 24px 40px rgba(2, 6, 23, 0.32)`;

    [pointerAuraEl, pointerRingEl, pointerEl].forEach(pointerNode => {
        if (!pointerNode) return;
        pointerNode.setAttribute("cx", point.x.toFixed(2));
        pointerNode.setAttribute("cy", point.y.toFixed(2));
    });

    if (pointerAuraEl) {
        pointerAuraEl.style.stroke = stage.accent;
        pointerAuraEl.style.fill = stage.soft;
    }

    if (pointerRingEl) {
        pointerRingEl.style.stroke = stage.accent;
    }

    if (pointerEl) {
        pointerEl.style.fill = "#f8fafc";
        pointerEl.style.stroke = stage.accent;
    }

    if (centerLabelEl) centerLabelEl.innerText = stage.ringLabel;
    if (centerScoreEl) centerScoreEl.innerText = `P ${Math.round(marketData.riskIndex || 0)}`;
    if (centerMiniEl) centerMiniEl.innerText = `Bull Trap ${marketData.trapScore || 0}/20`;

    document.querySelectorAll(".cycle-ring-node").forEach(node => {
        const nodeStage = getCycleStage(node.dataset.stageKey);
        const isActive = nodeStage.key === stage.key;
        const isWithinHighlightLeg = nodeStage.order >= highlightStartOrder && nodeStage.order <= highlightEndOrder;
        const isComplete = isWithinHighlightLeg && (nodeStage.order < stage.order || (nodeStage.order === stage.order && stageProgress > 0.15));
        node.classList.toggle("is-active", isActive);
        node.classList.toggle("is-complete", isComplete);
    });
}

function calculateEuphoriaFlowBonus(data) {
    const requiredValues = [
        data.retailNetToday,
        data.foreignNetToday,
        data.institutionNetToday,
        data.retailNet10dCum,
        data.foreignNet10dCum,
        data.institutionNet10dCum,
        data.retailNet10dAbsAvg,
        data.retailNet10dAbsSum
    ];

    const hasInvalidInput = requiredValues.some(value => value === null || value === undefined || Number.isNaN(value));
    if (hasInvalidInput) {
        return {
            flowBonus: 0,
            flowReason: data.flowReason || "수급 데이터 미연동 (중립 처리)",
            retailPressureScore: 0,
            distributionScore: 0
        };
    }

    if (data.disparity > 103) {
        return {
            flowBonus: 0,
            flowReason: "가격 과열 구간(disparity>103)에서는 수급 보정을 비활성화했습니다 (중립 처리).",
            retailPressureScore: 0,
            distributionScore: 0
        };
    }

    if (data.retailNetToday <= 0 || data.retailNet10dCum <= 0 || data.retailNet10dAbsAvg <= 0 || data.retailNet10dAbsSum <= 0) {
        return {
            flowBonus: 0,
            flowReason: "개인 순매수 과열 조건이 충족되지 않아 수급 보정을 적용하지 않았습니다.",
            retailPressureScore: 0,
            distributionScore: 0
        };
    }

    const dailyIntensity = clamp(data.retailNetToday / data.retailNet10dAbsAvg, 0, 3) / 3;
    const trendConviction = clamp(data.retailNet10dCum / data.retailNet10dAbsSum, 0, 1);
    const retailPressureScore = Math.round(clamp((dailyIntensity * 0.6 + trendConviction * 0.4) * 9, 0, 9));

    if (retailPressureScore <= 0) {
        return {
            flowBonus: 0,
            flowReason: "개인 순매수는 있으나 강도가 약해 수급 보정을 적용하지 않았습니다.",
            retailPressureScore,
            distributionScore: 0
        };
    }

    const foreignDistribution = data.foreignNetToday < 0 && data.foreignNet10dCum < 0;
    const institutionDistribution = data.institutionNetToday < 0 && data.institutionNet10dCum < 0;

    if (!foreignDistribution && !institutionDistribution) {
        return {
            flowBonus: 0,
            flowReason: "개인 매수는 강하지만 외국인/기관 분배 신호가 없어 수급 보정을 적용하지 않았습니다.",
            retailPressureScore,
            distributionScore: 0
        };
    }

    const distributionScore = foreignDistribution && institutionDistribution ? 6 : 3;
    const distributionLabel = foreignDistribution && institutionDistribution
        ? "외국인·기관 동시 분배 6점"
        : foreignDistribution
            ? "외국인 분배 3점"
            : "기관 분배 3점";

    return {
        flowBonus: Math.min(15, retailPressureScore + distributionScore),
        flowReason: `개인 순매수 과열 ${retailPressureScore}점 + ${distributionLabel}`,
        retailPressureScore,
        distributionScore
    };
}

function calculateCycle() {
    const { fx, vix, sentiment, gold, disparity, bullRatio, marginSlope } = marketData;
    let f_fx = 0;
    if (fx >= 1450) f_fx = 1.5;
    else if (fx >= 1420) f_fx = 1.0;
    else if (fx >= 1350) f_fx = 0.5;
    
    let g_vix = 0;
    if (vix >= 30) g_vix = 1.5;
    else if (vix >= 22) g_vix = 1.0;
    else if (vix >= 15) g_vix = 0.5;

    let m_stress = (40 * f_fx) + (30 * g_vix);
    m_stress = Math.min(70, m_stress);

    let i_disparity = Math.max(0, (disparity - 95)) * 2; // 이격도가 높을수록 탐욕
    i_disparity = Math.min(100, i_disparity + (bullRatio * 0.5));

    let l_credit = Math.max(0, marginSlope / 200);
    l_credit = Math.min(100, l_credit);
    let s_text = sentiment;

    const linear_greed = (i_disparity * 0.4) + (l_credit * 0.3) + (s_text * 0.3);
    // 소로스 재귀성 시너지: 이격(+5%마다 1)과 심리(50 위 20pt마다 1)의 곱이 폭주를 비선형으로 잡는다.
    const disparitySurplus = Math.max(0, (disparity - 100) / 5);
    const sentimentSurplus = Math.max(0, (sentiment - 50) / 20);
    const reflexivityRaw = disparitySurplus * sentimentSurplus * 12;
    const reflexivitySynergyPoints = Math.min(25, Math.max(0, reflexivityRaw));
    let e_greed = clamp(linear_greed + reflexivitySynergyPoints, 0, 100) || 50;
    let p_index = 50 + (e_greed - m_stress);
    p_index = Math.max(0, Math.min(100, p_index)) || 50; // NaN 방지
    let isDebasement = false;
    if (fx >= 1450 && (i_disparity >= 75 || marginSlope >= 15000 || gold >= 3000)) {
        isDebasement = true;
        p_index = Math.max(p_index, 85);
    }
    marketData.reflexivitySynergyPoints = reflexivitySynergyPoints;
    marketData.reflexivityState = reflexivitySynergyPoints >= 15
        ? "runaway"
        : reflexivitySynergyPoints >= 6
            ? "caution"
            : "normal";
    marketData.debasementAlert = isDebasement;

    const flowResult = calculateEuphoriaFlowBonus(marketData);
    marketData.flowBonus = flowResult.flowBonus;
    marketData.flowReason = flowResult.flowReason;
    p_index = clamp(p_index + flowResult.flowBonus, 0, 100);

    const riskIndex = p_index;
    const cycleLeg = resolveCycleLeg(marketData.previousRiskIndex, riskIndex, marketData.cycleLeg);
    const trapResult = calculateBullTrapScore({ ...marketData, riskIndex, cycleLeg });
    const stage = resolveCycleStage(riskIndex, vix, cycleLeg, trapResult.trapScore);
    const stageProgress = getStageProgress(stage, riskIndex, trapResult.trapScore);

    marketData.riskIndex = riskIndex;
    marketData.cycleLeg = cycleLeg;
    marketData.cycleStageKey = stage.key;
    marketData.cycleStageLabel = stage.fullLabel;
    marketData.trapScore = trapResult.trapScore;
    marketData.trapState = trapResult.trapState;
    marketData.trapReason = trapResult.trapReason;
    marketData.trapFlowScore = trapResult.trapFlowScore;
    marketData.trapMarginScore = trapResult.trapMarginScore;
    marketData.trapFirstShockScore = trapResult.trapFirstShockScore;
    marketData.trapThreeDayScore = trapResult.trapThreeDayScore;
    marketData.trapRecoveryScore = trapResult.trapRecoveryScore;

    let stageOverrideReason = "";
    if (riskIndex <= 20 || vix >= 30) {
        stageOverrideReason = "VIX 급등 또는 저점 P-Index 조건으로 투매 단계를 우선 적용했습니다.";
    } else if (trapResult.trapScore >= 14) {
        stageOverrideReason = `Bull Trap ${trapResult.trapScore}/20으로 하락 2단계(불안·부인)로 오버라이드했습니다.`;
    } else if (trapResult.trapScore >= 10) {
        stageOverrideReason = `Bull Trap ${trapResult.trapScore}/20으로 하락 1단계(안도·자만)로 오버라이드했습니다.`;
    } else if (isDebasement) {
        stageOverrideReason = "환율·유동성 왜곡 신호로 P-Index 하단을 환희 구간으로 보정했습니다.";
    }
    marketData.stageOverrideReason = stageOverrideReason;

    document.getElementById("pendulum-score").innerText = `(종합 리스크 심리 P-Index: ${Math.round(riskIndex)}/100)`;
    document.getElementById("cycle-status").innerText = stage.fullLabel;
    document.getElementById("cycle-status").style.color = stage.accent;
    document.getElementById("cycle-desc").innerHTML = `<b>진단:</b> ${stage.desc}`;

    const cycleRangeNote = document.getElementById("cycle-range-note");
    cycleRangeNote.innerText = `${getCycleLegLabel(cycleLeg)} · ${getRiskDeltaLabel(marketData.previousRiskIndex, riskIndex)} · 현재 ${getStageTone(stageProgress)} (${stage.min}~${stage.max})`;
    cycleRangeNote.style.color = stage.accent;

    const cycleFlowNote = document.getElementById("cycle-flow-note");
    cycleFlowNote.innerText = `수급 괴리 보너스 +${marketData.flowBonus} · ${marketData.flowReason}`;
    cycleFlowNote.style.color = marketData.flowBonus > 0 ? "#fda4af" : "#cbd5e1";

    const cycleTrapNote = document.getElementById("cycle-trap-note");
    cycleTrapNote.innerText = `Bull Trap ${marketData.trapScore}/20 · ${marketData.trapReason}`;
    cycleTrapNote.style.color = marketData.trapScore >= 14 ? "#f87171" : marketData.trapScore >= 10 ? "#fb923c" : "#94a3b8";

    const cycleScoreNote = document.getElementById("cycle-score-note");
    cycleScoreNote.innerText = stageOverrideReason || "원형 링의 점 포인터는 현재 단계 내 위치를 표시합니다.";

    // 코스톨라니 6단계 매핑 — cycleLeg + riskIndex 기반
    const kostolanyMapping = resolveKostolanyStage(cycleLeg, riskIndex, marketData.bullRatio);
    marketData.kostolanyStage = kostolanyMapping.stage;
    marketData.kostolanyDivergenceNote = kostolanyMapping.note;

    updateCycleRing(stage, stageProgress);
    updateActionableGuide(stage, isDebasement);
    if (typeof updateMarketFlowUI === "function") updateMarketFlowUI();
    if (typeof updateLeaderTrapUI === "function") updateLeaderTrapUI();
    if (typeof renderTheorySubtabs === "function") renderTheorySubtabs();
    updatePortfolioRebalancing(stage.key, isDebasement);
}

function resolveKostolanyStage(cycleLeg, riskIndex, bullRatio) {
    let stage = "B2";
    if (cycleLeg === "rising") {
        if (riskIndex <= 33) stage = "B1";       // 상승 준비 (회복 초입)
        else if (riskIndex <= 66) stage = "B2";  // 상승 조정 (정석 추세)
        else stage = "B3";                       // 상승 과열 (탐욕/환희)
    } else if (cycleLeg === "falling") {
        if (riskIndex >= 66) stage = "A1";       // 하락 준비 (안도·자만)
        else if (riskIndex >= 33) stage = "A2";  // 하락 조정 (불안·부인)
        else stage = "A3";                       // 하락 과열 (공포·항복)
    }

    // 거래량-가격 다이버전스: bullRatio가 80 이상으로 폭증인데 P가 정체(상승 레그) → 부화수 인수 신호
    let note = "거래량과 가격이 동행 (정상)";
    if (cycleLeg === "rising" && Number.isFinite(bullRatio) && bullRatio >= 80 && riskIndex >= 60) {
        note = "양봉 비율 폭증 · 부화수가 물량을 인수하는 정점 신호";
    } else if (cycleLeg === "falling" && Number.isFinite(bullRatio) && bullRatio <= 25 && riskIndex <= 35) {
        note = "거래량 고갈 · 소신파만 남는 바닥 신호";
    }

    return { stage, note };
}

function updateActionableGuide(stage, isDebasement) {
    const card = document.getElementById("actionable-guide-card");
    const title = document.getElementById("actionable-title");
    const text = document.getElementById("actionable-guide-text");
    const accent = isDebasement ? "#f87171" : stage.accent;
    const soft = isDebasement ? "rgba(248, 113, 113, 0.18)" : stage.soft;

    card.style.borderColor = `${accent}66`;
    card.style.background = `linear-gradient(180deg, ${soft}, rgba(15, 23, 42, 0.5))`;
    title.style.color = accent;
    text.style.color = "#e2e8f0";

    if (isDebasement) {
        text.innerHTML = "🚨 <b>화폐 가치 하락 경고:</b> 가격보다 유동성 왜곡이 강합니다. 실물/현금 버퍼를 우선하고 공격 매수는 잠시 멈추는 편이 안전합니다.";
        return;
    }

    const messages = {
        panic: "🎯 <b>역발상 진입:</b> 투매성 청산이 진행 중입니다. 현금이 남아 있다면 분할 매수 계획을 기계적으로 실행할 수 있는 구간입니다.",
        pessimism: "🧭 <b>회복 준비:</b> 바닥 신뢰는 약하지만 가격은 안정되는 구간입니다. 섹터 리더를 추적하며 리스크를 제한한 분할 진입이 유효합니다.",
        skepticism: "✅ <b>정석 투자:</b> 회복 추세가 유지됩니다. 추세 추종과 적립을 병행하되 밸류에이션 과속 여부를 계속 점검해야 합니다.",
        optimism: "📈 <b>추세 유지:</b> 시장이 강세를 인정하는 구간입니다. 추세는 따르되, 현금 비중을 너무 낮추지 않는 균형이 중요합니다.",
        greed: "⚠️ <b>방어 전환:</b> 상승은 이어지지만 탐욕이 빠르게 쌓이는 구간입니다. 신규 진입보다 익절 기준과 현금 회수 계획을 먼저 고정하세요.",
        euphoria: "🚨 <b>정점 경계:</b> 실물보다 기대가 앞서는 환희 구간입니다. 신규 공격 매수를 멈추고 현금 버퍼를 크게 확보해야 합니다.",
        complacency: "🧨 <b>Bull Trap 경계:</b> 첫 급락을 눌림목으로 오해하기 쉬운 구간입니다. 개인이 물량을 받아내는지, 신용이 안 줄어드는지 먼저 확인하세요.",
        denial: "🛡️ <b>반등 집착 금지:</b> 반등 기대가 반복적으로 깨지는 구간입니다. 현금 버퍼를 지키고 리스크 축소를 기계적으로 이어가야 합니다.",
        capitulation: "🔁 <b>항복 후 재진입 준비:</b> 손절과 강제 청산이 집중되는 구간입니다. 바닥 신호를 기다리며 분할 재진입 리스트를 정리할 타이밍입니다."
    };

    text.innerHTML = messages[stage.key] || messages.skepticism;
}

function updatePortfolioRebalancing(stageKey, isDebasement) {
    const targets = getPortfolioTargets(stageKey, isDebasement);
    const keys = ["isa", "pension", "genLong", "quant"];

    if (typeof updatePortfolioTargetBands === "function") {
        updatePortfolioTargetBands(targets);
    }

    keys.forEach(key => {
        const targetEl = document.getElementById(`eval-${key === "genLong" ? "gen-long" : key}`);
        if (!targetEl) return;

        const data = portfolioData[key];
        const currentCash = parseFloat(data.cashRatio) || 0;
        const currentAgg = parseFloat(data.aggressiveRatio) || 0;

        if (key === "isa" || key === "pension") {
            const diff = currentAgg - targets.aggressiveTarget;
            if (Math.abs(diff) <= 10) {
                targetEl.innerHTML = `<span class='text-emerald-400 font-bold'>성향 유지</span><br/><span class='text-[10px] text-slate-500'>목표 공격성 ${targets.aggressiveTarget}% 부근</span>`;
            } else if (diff < 0) {
                targetEl.innerHTML = `<span class='text-cyan-400 font-bold'>공격성 상향</span><br/><span class='text-[10px] text-slate-500'>주식/성장 비중 확대 필요</span>`;
            } else {
                targetEl.innerHTML = `<span class='text-rose-400 font-bold'>방어력 강화</span><br/><span class='text-[10px] text-slate-500'>채권/배당·현금성 자산 확대</span>`;
            }
            return;
        }

        if (key === "genLong") {
            const cashOk = Math.abs(currentCash - targets.cashTarget) <= 10;
            const aggOk = Math.abs(currentAgg - targets.aggressiveTarget) <= 10;
            const color = cashOk && aggOk ? "text-emerald-400" : "text-amber-400";
            const cashLabel = currentCash > targets.cashTarget ? "현금 과다" : currentCash < targets.cashTarget ? "현금 부족" : "현금 적정";
            const aggLabel = currentAgg > targets.aggressiveTarget ? "공격 과다" : currentAgg < targets.aggressiveTarget ? "공격 부족" : "성향 적정";
            targetEl.innerHTML = `<span class='${color} font-bold'>복합 조정 필요</span><br/><span class='text-[10px] text-slate-500'>목표 현금 ${targets.cashTarget}% / 공격성 ${targets.aggressiveTarget}% · ${cashLabel} / ${aggLabel}</span>`;
            return;
        }

        const investTarget = 100 - targets.cashTarget;
        const color = Math.abs(currentCash - targets.cashTarget) <= 5 ? "text-emerald-400" : currentCash > targets.cashTarget ? "text-cyan-400" : "text-rose-400";
        targetEl.innerHTML = `<span class='${color} font-bold'>현금 ${targets.cashTarget}% / 투자 ${investTarget}%</span><br/><span class='text-[10px] text-slate-500'>현재 현금 ${currentCash}%</span>`;
    });
}
