const assert = require("node:assert/strict");

const {
    LEADER_PICK_COUNT,
    LEADER_SECTOR_MAX_COUNT,
    LEADER_WEIGHT_CAP,
    normalizeLeaderIssuerName,
    isPreferredLeaderCandidate,
    selectLeaderStocksWithIssuerCap,
    selectLeaderStocksWithSectorCap,
    applyLeaderWeightCap
} = require("../leader-stocks.js");

assert.equal(LEADER_PICK_COUNT, 6);
assert.equal(normalizeLeaderIssuerName("삼성전자우"), "삼성전자");
assert.equal(normalizeLeaderIssuerName("미래에셋증권2우B"), "미래에셋증권");
assert.equal(normalizeLeaderIssuerName("현대차"), "현대차");

assert.equal(isPreferredLeaderCandidate({ name: "삼성전자우" }), true);
assert.equal(isPreferredLeaderCandidate({ name: "삼성전자" }), false);

const selected = selectLeaderStocksWithIssuerCap(
    [
        { code: "005935", name: "삼성전자우", cum15dTradingValue: 120 },
        { code: "005930", name: "삼성전자", cum15dTradingValue: 100 },
        { code: "000660", name: "SK하이닉스", cum15dTradingValue: 95 },
        { code: "066570", name: "LG전자", cum15dTradingValue: 80 },
        { code: "005380", name: "현대차", cum15dTradingValue: 70 },
        { code: "000270", name: "기아", cum15dTradingValue: 60 },
        { code: "035420", name: "NAVER", cum15dTradingValue: 50 },
        { code: "105560", name: "KB금융", cum15dTradingValue: 40 }
    ],
    LEADER_PICK_COUNT
);

assert.equal(selected.length, LEADER_PICK_COUNT);
assert.deepEqual(
    selected.map(item => item.code),
    ["005930", "000660", "066570", "005380", "000270", "035420"]
);

const sectorSelection = selectLeaderStocksWithSectorCap(
    [
        { code: "A1", name: "섹터A-1", industryCode: "A", cum15dTradingValue: 1200 },
        { code: "A2", name: "섹터A-2", industryCode: "A", cum15dTradingValue: 1100 },
        { code: "A3", name: "섹터A-3", industryCode: "A", cum15dTradingValue: 1000 },
        { code: "B1", name: "섹터B-1", industryCode: "B", cum15dTradingValue: 900 },
        { code: "B2", name: "섹터B-2", industryCode: "B", cum15dTradingValue: 800 },
        { code: "C1", name: "섹터C-1", industryCode: "C", cum15dTradingValue: 700 },
        { code: "D1", name: "섹터D-1", industryCode: "D", cum15dTradingValue: 600 }
    ],
    LEADER_PICK_COUNT,
    LEADER_SECTOR_MAX_COUNT
);

assert.equal(sectorSelection.selected.length, LEADER_PICK_COUNT);
assert.equal(sectorSelection.skippedBySector.length, 1);
assert.deepEqual(
    sectorSelection.selected.map(item => item.code),
    ["A1", "A2", "B1", "B2", "C1", "D1"]
);
assert.deepEqual(
    sectorSelection.selected.reduce((acc, item) => {
        acc[item.industryCode] = (acc[item.industryCode] || 0) + 1;
        return acc;
    }, {}),
    { A: 2, B: 2, C: 1, D: 1 }
);

const weighted = applyLeaderWeightCap(
    [
        { code: "A1", name: "A1", cum15dTradingValue: 1200 },
        { code: "A2", name: "A2", cum15dTradingValue: 1100 },
        { code: "B1", name: "B1", cum15dTradingValue: 300 },
        { code: "B2", name: "B2", cum15dTradingValue: 200 },
        { code: "C1", name: "C1", cum15dTradingValue: 120 },
        { code: "D1", name: "D1", cum15dTradingValue: 80 }
    ],
    LEADER_WEIGHT_CAP
);

assert.equal(weighted.length, LEADER_PICK_COUNT);
assert.equal(weighted.filter(item => item.weightCapApplied).length, 2);
assert.ok(weighted.every(item => item.weight <= LEADER_WEIGHT_CAP + 1e-9));
assert.ok(Math.abs(weighted.reduce((sum, item) => sum + item.weight, 0) - 1) <= 1e-9);

console.log("runtime leader selection ok");
