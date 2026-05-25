const assert = require("node:assert/strict");

const { ANCHOR_BUFFERED_OVERHEAT_KEY } = require("../regime-policy.js");
const { resolveCycleLeg, resolveCycleStage } = require("../cycle-config.js");

const naturalLeg = resolveCycleLeg(85, 66, "rising");
assert.equal(naturalLeg, "falling");

const bufferedLeg = resolveCycleLeg(85, 66, "rising", {
    marketRegimeKey: ANCHOR_BUFFERED_OVERHEAT_KEY,
    bubbleCriticalTrigger: false,
    trapScore: 0
});
assert.equal(bufferedLeg, "rising");
assert.equal(resolveCycleStage(66, 16.7, bufferedLeg, 0).key, "greed");

const trappedLeg = resolveCycleLeg(85, 66, "rising", {
    marketRegimeKey: ANCHOR_BUFFERED_OVERHEAT_KEY,
    bubbleCriticalTrigger: false,
    trapScore: 12
});
assert.equal(trappedLeg, "falling");
assert.equal(resolveCycleStage(66, 16.7, trappedLeg, 12).key, "complacency");

console.log("runtime cycle config ok");
