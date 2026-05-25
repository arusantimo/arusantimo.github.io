(function (root) {
    const BUBBLE_POLICY_SIGNAL_KEYS = ["marginDebt", "ipo", "trash", "fed"];
    const BUBBLE_POLICY_SIGNAL_LABELS = {
        marginDebt: "신용매수 과열",
        ipo: "공모주 광풍",
        trash: "적자 혁신주 투기",
        fed: "연준 브레이크"
    };
    const DEFAULT_BUBBLE_REASON = "버블 플래그 대기 중";
    const ANCHOR_BUFFERED_OVERHEAT_KEY = "anchor-buffered-overheat";
    const ANCHOR_BUFFERED_OVERHEAT_LABEL = "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)";

    function clampRegimePolicyValue(value, minimum = 0, maximum = 100) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return minimum;
        return Math.min(maximum, Math.max(minimum, numeric));
    }

    function normalizePolicyBubbleSignal(flagKey, signal) {
        const fallback = {
            score: 0,
            state: "neutral",
            critical: false,
            label: BUBBLE_POLICY_SIGNAL_LABELS[flagKey] || flagKey || "버블 플래그",
            reason: DEFAULT_BUBBLE_REASON,
            metrics: {},
            updatedAt: ""
        };
        if (!signal || typeof signal !== "object") {
            return { ...fallback };
        }
        const numericScore = Number(signal.score);
        return {
            score: Number.isFinite(numericScore) ? clampRegimePolicyValue(numericScore) : fallback.score,
            state: signal.state || fallback.state,
            critical: Boolean(signal.critical),
            label: signal.label || fallback.label,
            reason: signal.reason || fallback.reason,
            metrics: signal.metrics && typeof signal.metrics === "object" ? { ...signal.metrics } : {},
            updatedAt: signal.updatedAt || ""
        };
    }

    function summarizeBubbleOverlay(data = {}) {
        const rawSignals = data && typeof data.bubbleSignals === "object" ? data.bubbleSignals : {};
        const normalizedSignals = {};
        const scores = [];
        let coverageCount = 0;

        BUBBLE_POLICY_SIGNAL_KEYS.forEach(flagKey => {
            const signal = normalizePolicyBubbleSignal(flagKey, rawSignals[flagKey]);
            normalizedSignals[flagKey] = signal;
            scores.push(Number.isFinite(Number(signal.score)) ? Number(signal.score) : 0);
            const hasCoverage = Boolean(signal.updatedAt)
                || (Number.isFinite(Number(signal.score)) && Number(signal.score) !== 0)
                || (signal.reason && signal.reason !== DEFAULT_BUBBLE_REASON);
            if (hasCoverage) coverageCount += 1;
        });

        const bubbleIndex = scores.length
            ? Number((scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2))
            : 0;
        const bubbleActiveFlagCount = BUBBLE_POLICY_SIGNAL_KEYS.reduce((count, flagKey) => {
            const signal = normalizedSignals[flagKey];
            return count + ((signal.critical || Number(signal.score) >= 50) ? 1 : 0);
        }, 0);
        const allCritical = BUBBLE_POLICY_SIGNAL_KEYS.every(flagKey => Boolean(normalizedSignals[flagKey].critical));
        const bubbleCriticalTrigger = bubbleIndex >= 85 && allCritical;
        const bubbleCriticalReason = bubbleCriticalTrigger
            ? `Critical Trigger 발동 · BI ${Math.round(bubbleIndex)} / 4대 플래그 모두 critical`
            : `Critical Trigger 미발동 · BI ${Math.round(bubbleIndex)} / active ${bubbleActiveFlagCount}개`;

        return {
            bubbleSignals: normalizedSignals,
            bubbleIndex,
            bubbleActiveFlagCount,
            bubbleCriticalTrigger,
            bubbleCriticalReason,
            bubbleSignalCoverageCount: coverageCount
        };
    }

    function hasStrongAnchorBuffer(data = {}) {
        const anchorState = String(data.fundamentalAnchorState || "neutral");
        const anchorScore = Number(data.fundamentalAnchorScore);
        return anchorState === "validated" || (Number.isFinite(anchorScore) && anchorScore >= 75);
    }

    function formatAnchorBufferText(data = {}) {
        const anchorState = String(data.fundamentalAnchorState || "neutral");
        const anchorScore = Number(data.fundamentalAnchorScore);
        if (Number.isFinite(anchorScore)) {
            return `펀더멘털 앵커 ${Math.round(anchorScore)}점`;
        }
        return anchorState === "validated" ? "검증된 펀더멘털 앵커" : "강한 펀더멘털 앵커";
    }

    function resolveHotZoneMarketRegime(data = {}) {
        const fx = Number(data.fx);
        const equityOverbought = Number(data.equityOverboughtScore);
        const fundamentalSupportScore = Number.isFinite(Number(data.fundamentalSupportScore))
            ? Number(data.fundamentalSupportScore)
            : 50;
        const baseRiskIndex = Number.isFinite(Number(data.riskIndex))
            ? Number(data.riskIndex)
            : 50;
        const summary = summarizeBubbleOverlay(data);
        const bubbleIndex = Number.isFinite(Number(data.bubbleIndex)) ? Number(data.bubbleIndex) : summary.bubbleIndex;
        const bubbleActiveFlagCount = Number.isFinite(Number(data.bubbleActiveFlagCount))
            ? Number(data.bubbleActiveFlagCount)
            : summary.bubbleActiveFlagCount;
        const bubbleCriticalTrigger = typeof data.bubbleCriticalTrigger === "boolean"
            ? data.bubbleCriticalTrigger
            : summary.bubbleCriticalTrigger;
        const bubbleCoverageCount = Number.isFinite(Number(data.bubbleSignalCoverageCount))
            ? Number(data.bubbleSignalCoverageCount)
            : summary.bubbleSignalCoverageCount;

        let marketRegimeKey = "standard";
        let marketRegimeLabel = "표준 레짐";
        let marketRegimeReason = "특수 레짐 조건 없음";
        let riskIndex = clampRegimePolicyValue(baseRiskIndex);
        let debasementAlert = false;

        if (fx >= 1450 && equityOverbought >= 75) {
            if (fundamentalSupportScore >= 70) {
                marketRegimeKey = "secular-expansion";
                marketRegimeLabel = "Stage 3.5: 실적 정당화형 구조적 확장기 (Secular Expansion)";
                marketRegimeReason = `원/달러 ${Math.round(fx)}원과 과열 이격이 겹쳐도 F_support ${Math.round(fundamentalSupportScore)}점이 높아 구조적 확장기로 완화했습니다.`;
                riskIndex = Math.min(riskIndex, 55);
            } else if (
                hasStrongAnchorBuffer(data)
                && bubbleCoverageCount >= BUBBLE_POLICY_SIGNAL_KEYS.length
                && !bubbleCriticalTrigger
                && bubbleIndex < 60
                && bubbleActiveFlagCount <= 1
            ) {
                marketRegimeKey = ANCHOR_BUFFERED_OVERHEAT_KEY;
                marketRegimeLabel = ANCHOR_BUFFERED_OVERHEAT_LABEL;
                marketRegimeReason = `원/달러 ${Math.round(fx)}원과 과열 이격이 겹쳤지만 ${formatAnchorBufferText(data)}과 non-critical bubble(BI ${Math.round(bubbleIndex)} / active ${bubbleActiveFlagCount}개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.`;
                riskIndex = clampRegimePolicyValue(riskIndex, 66, 80);
            } else {
                marketRegimeKey = "debasement-bubble";
                marketRegimeLabel = "Stage 6: 화폐 몰락형 특수 버블 (Debasement Bubble)";
                marketRegimeReason = `원/달러 ${Math.round(fx)}원과 과열 이격이 겹쳤지만 F_support ${Math.round(fundamentalSupportScore)}점이 부족해 특수 버블 경계로 강화했습니다.`;
                riskIndex = Math.max(riskIndex, 85);
                debasementAlert = true;
            }
        }

        return {
            marketRegimeKey,
            marketRegimeLabel,
            marketRegimeReason,
            riskIndex,
            debasementAlert
        };
    }

    function decorateBubbleOverlay(data = {}) {
        const summary = summarizeBubbleOverlay(data);
        const marketRegimeKey = String(data.marketRegimeKey || "standard");
        let bubbleState = "standard";
        let bubbleRegimeLabel = "표준 버블 경계";
        let bubbleRegimeReason = `BI ${Math.round(summary.bubbleIndex)} / active ${summary.bubbleActiveFlagCount}개로 아직 파국 임계기는 아닙니다.`;

        if (summary.bubbleCriticalTrigger) {
            bubbleState = "critical";
            bubbleRegimeLabel = "Stage 4.0-CRITICAL: 버블 최정점 및 파국 임계기";
            bubbleRegimeReason = "Bubble Index와 4대 플래그 critical이 동시에 충족돼 기계적 방어 모드가 우선입니다.";
        } else if (marketRegimeKey === "debasement-bubble") {
            bubbleState = "debasement";
            bubbleRegimeLabel = "화폐 몰락형 특수 버블 경계";
            bubbleRegimeReason = `${data.marketRegimeReason || "기존 레짐이 debasement-bubble입니다."} 버블 active ${summary.bubbleActiveFlagCount}개를 병렬 추적합니다.`;
        } else if (marketRegimeKey === "secular-expansion") {
            bubbleState = "gear-second";
            bubbleRegimeLabel = "실적 정당화형 과열 (Gear Second)";
            bubbleRegimeReason = `${data.marketRegimeReason || "기존 레짐이 secular-expansion입니다."} 버블 active ${summary.bubbleActiveFlagCount}개를 병렬 추적합니다.`;
        } else if (marketRegimeKey === ANCHOR_BUFFERED_OVERHEAT_KEY) {
            bubbleState = "gear-second";
            bubbleRegimeLabel = "펀더멘털 완충형 과열 경계";
            bubbleRegimeReason = `${data.marketRegimeReason || "강한 펀더멘털 앵커와 비critical bubble이 과열을 완충합니다."} 버블 active ${summary.bubbleActiveFlagCount}개를 병렬 추적합니다.`;
        }

        return {
            bubbleSignals: summary.bubbleSignals,
            bubbleIndex: summary.bubbleIndex,
            bubbleActiveFlagCount: summary.bubbleActiveFlagCount,
            bubbleCriticalTrigger: summary.bubbleCriticalTrigger,
            bubbleCriticalReason: summary.bubbleCriticalReason,
            bubbleState,
            bubbleRegimeLabel,
            bubbleRegimeReason
        };
    }

    const api = {
        ANCHOR_BUFFERED_OVERHEAT_KEY,
        ANCHOR_BUFFERED_OVERHEAT_LABEL,
        summarizeBubbleOverlay,
        resolveHotZoneMarketRegime,
        decorateBubbleOverlay
    };

    Object.assign(root, api);
    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }
})(typeof globalThis !== "undefined" ? globalThis : this);
