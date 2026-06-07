import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadSellRulesContext() {
  const code = fs.readFileSync(new URL('./sell-rules.js', import.meta.url), 'utf8');
  const context = { console };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

test('하드 손절은 장중 현재가가 아니라 최근 확정 종가로만 판정한다', () => {
  const { buildNonSwingSellRuleSet } = loadSellRulesContext();
  const ruleSet = buildNonSwingSellRuleSet(
    { type: 'pullback' },
    {
      currentPrice: 9400,
      prevClose: 10000,
      ohlcvSeries: [
        { date: '20260604', close: 10000 },
        { date: '20260605', close: 9800 }
      ]
    },
    false,
    { entryPrice: 10000, stopLoss: { price: 9500 } },
    {}
  );

  const stopRule = ruleSet.rules.find(rule => rule.code === 'H1');
  assert.ok(stopRule);
  assert.equal(stopRule.triggered, false);
  assert.match(stopRule.result, /확정 종가 9,800 > 유효 손절가 9,600/);
});

test('하드 손절은 최근 확정 종가가 손절가 아래로 마감했을 때만 발생한다', () => {
  const { buildNonSwingSellRuleSet } = loadSellRulesContext();
  const ruleSet = buildNonSwingSellRuleSet(
    { type: 'pullback' },
    {
      currentPrice: 9800,
      prevClose: 10000,
      ohlcvSeries: [
        { date: '20260604', close: 10000 },
        { date: '20260605', close: 9400 }
      ]
    },
    false,
    { entryPrice: 10000, stopLoss: { price: 9500 } },
    {}
  );

  const stopRule = ruleSet.rules.find(rule => rule.code === 'H1');
  assert.ok(stopRule);
  assert.equal(stopRule.triggered, true);
  assert.match(stopRule.result, /종가 기준 전량 매도/);
});

test('기본 손절선도 최근 확정 종가 기준으로만 계산한다', () => {
  const { buildNonSwingSellRuleSet } = loadSellRulesContext();
  const ruleSet = buildNonSwingSellRuleSet(
    { type: 'pullback' },
    {
      currentPrice: 9400,
      prevClose: 10000,
      ohlcvSeries: [
        { date: '20260604', close: 10000 },
        { date: '20260605', close: 9700 }
      ]
    },
    false,
    { entryPrice: 10000 },
    {}
  );

  const stopRule = ruleSet.rules.find(rule => rule.code === 'H2');
  assert.ok(stopRule);
  assert.equal(stopRule.triggered, false);
  assert.match(stopRule.result, /확정 종가 기준 -3\.00% — 손절선 이내/);
});
