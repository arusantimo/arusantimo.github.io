const assert = require("node:assert/strict");

global.localStorage = {
    getItem() { return null; },
    setItem() {},
    removeItem() {}
};
global.fetch = async () => {
    throw new Error("network not expected in runtime regime test");
};

const {
    ANCHOR_BUFFERED_OVERHEAT_KEY,
    resolveHotZoneMarketRegime,
    decorateBubbleOverlay
} = require("../regime-policy.js");

require("../fundamental-anchor.js");

function buildSignal(score, critical = false) {
    return {
        score,
        state: critical ? "critical" : "warning",
        critical,
        label: "test",
        reason: "test",
        metrics: {},
        updatedAt: "2026-05-24T00:00:00+09:00"
    };
}

function buildFixture(overrides = {}) {
    return {
        fx: 1516,
        equityOverboughtScore: 85,
        fundamentalAnchorState: "validated",
        fundamentalAnchorScore: 81,
        fundamentalSupportState: "fragile",
        fundamentalSupportScore: 25,
        broadeningState: "validated",
        cycleStageKey: "greed",
        cycleStageLabel: "상승 5: 탐욕",
        reflexivityState: "runaway",
        kostolanyStage: "B2",
        wyckoffDistributionBreadth: 0.6,
        depositMarginRatio: 0.25,
        trapScore: 0,
        riskIndex: 85,
        bubbleSignals: {
            marginDebt: buildSignal(55),
            ipo: buildSignal(27),
            trash: buildSignal(27),
            fed: buildSignal(27)
        },
        ...overrides
    };
}

const fixture = buildFixture();
const regime = resolveHotZoneMarketRegime(fixture);
const bubble = decorateBubbleOverlay({ ...fixture, ...regime });
const evaluation = globalThis.deriveMarketEvaluation({
    ...fixture,
    ...regime,
    ...bubble
});

assert.equal(regime.marketRegimeKey, ANCHOR_BUFFERED_OVERHEAT_KEY);
assert.equal(evaluation.marketEvaluationState, "validated-overheat");
assert.equal(evaluation.marketEvaluationLabel, "과열이지만 정당화됨");
assert.equal(evaluation.marketAdviceStance, "선별 유지");

const peakEvaluation = globalThis.deriveMarketEvaluation({
    ...fixture,
    ...regime,
    ...bubble,
    cycleStageKey: "euphoria",
    cycleStageLabel: "정점: 환희"
});

assert.equal(peakEvaluation.marketAdviceStance, "균형 유지");

const trappedEvaluation = globalThis.deriveMarketEvaluation({
    ...fixture,
    ...regime,
    ...bubble,
    trapScore: 12
});

assert.equal(trappedEvaluation.marketEvaluationState, "distribution-risk");

console.log("runtime regime policy ok");
