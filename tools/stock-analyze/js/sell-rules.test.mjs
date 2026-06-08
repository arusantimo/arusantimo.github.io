import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadSellRulesContext() {
  const code = fs.readFileSync(new URL('./sell-rules.js', import.meta.url), 'utf8');
  const context = {
    console,
    buildEntryKey(slotId, code) {
      return `${slotId || 'slotA'}:${code}`;
    },
    getEntryByCode() {
      return null;
    }
  };
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

test('breakout trailing stop emits hard signal once activated', () => {
  const context = loadSellRulesContext();
  const entry = {
    breakoutStopPolicy: {
      effectiveHardStopPrice: 9800,
      fallbackStopPrice: 9600,
      referencePrice: 9900,
      hardStopRuleSummary: '기준선',
      openExitRuleSummary: '장초반 기준선 이탈',
      microTrendRuleSummary: '3분 EMA 이탈'
    },
    breakoutLiveExitPolicy: {
      trailingActivationPct: 6.0,
      trailingBufferPct: 2.5,
      wickClimaxLookbackBars: 20,
      wickClimaxVolumeRatioMin: 2.5,
      wickUpperShadowRatioMin: 0.45,
      orderbookLookbackMinutes: 5,
      orderbookBidAskSpikeMin: 2.0,
      orderbookAskDropRatioMax: 0.6,
      wickClimaxRuleSummary: '위꼬리',
      orderbookRuleSummary: '호가',
      trailingRuleSummary: '트레일링'
    }
  };
  context.getEntryByCode = () => entry;
  const { buildBreakoutLiveExitRuleSet } = context;
  const stock = { type: 'breakout', code: '005930', entryKey: 'slotA:breakout:005930', slotId: 'slotA' };
  const targets = { entryPrice: 10000, stopLoss: { price: 9800 } };

  buildBreakoutLiveExitRuleSet(stock, {
    currentPrice: 10900,
    prevClose: 10000,
    openPrice: 10200,
    todayVolume: 1000,
    strength: 120,
    bidAskRatio: 1.0,
    bidTotal: 100,
    askTotal: 100,
    timestamp: 1
  }, entry, targets, { code: 'G-A' }, false);

  const ruleSet = buildBreakoutLiveExitRuleSet(stock, {
    currentPrice: 10600,
    prevClose: 10000,
    openPrice: 10200,
    todayVolume: 1200,
    strength: 95,
    bidAskRatio: 2.2,
    bidTotal: 140,
    askTotal: 60,
    timestamp: 2
  }, entry, targets, { code: 'G-A' }, false);

  const trailingRule = ruleSet.rules.find(rule => rule.code === 'T3');
  assert.ok(trailingRule);
  assert.equal(trailingRule.triggered, true);
  assert.ok(ruleSet.hardSignals.some(rule => rule.code === 'T3'));
});

test('reversal은 장중 저가가 하드 스톱을 깨도 R1 즉시 손절을 내지 않는다', () => {
  const context = loadSellRulesContext();
  const entry = {
    reversalStopPolicy: {
      effectiveHardStopPrice: 9900,
      fallbackStopPrice: 9800,
      hardStopRuleSummary: '당일 저가와 % 손절 중 높은 값을 종가 손절가로 사용',
      reasonSummary: '당일 저가 손절'
    },
    reversalLiveExitPolicy: {
      timeStopCutoff: '09:15',
      timeStopMinBouncePct: 1.0,
      breakevenActivationPct: 3.0,
      earlySpikeWindowEnd: '09:10',
      timeStopRuleSummary: '09:15 규칙',
      breakevenRuleSummary: '본전보호'
    }
  };
  context.getEntryByCode = () => entry;
  const ruleSet = context.buildReversalLiveExitRuleSet(
    { type: 'reversal', code: '005930', entryKey: 'slotA:reversal:005930:r1', slotId: 'slotA' },
    { currentPrice: 9940, lowPrice: 9890, openPrice: 10020, timestamp: '2026-06-04T09:05:00+09:00' },
    entry,
    { entryPrice: 10000, stopLoss: { price: 9900 } }
  );

  assert.equal(ruleSet.rules.find(rule => rule.code === 'R1'), undefined);
  assert.equal(ruleSet.hardSignals.some(rule => rule.code === 'R1'), false);
});

test('reversal R2는 09:15까지 반등이 약하면 시간손절한다', () => {
  const context = loadSellRulesContext();
  const entry = {
    reversalStopPolicy: {
      effectiveHardStopPrice: 9900,
      fallbackStopPrice: 9800,
      hardStopRuleSummary: '당일 저가와 % 손절 중 높은 값 사용',
      reasonSummary: '당일 저가 손절'
    },
    reversalLiveExitPolicy: {
      timeStopCutoff: '09:15',
      timeStopMinBouncePct: 1.0,
      breakevenActivationPct: 3.0,
      earlySpikeWindowEnd: '09:10',
      timeStopRuleSummary: '09:15 규칙',
      breakevenRuleSummary: '본전보호'
    }
  };
  context.getEntryByCode = () => entry;
  const stock = { type: 'reversal', code: '005930', entryKey: 'slotA:reversal:005930:r2', slotId: 'slotA' };
  context.buildReversalLiveExitRuleSet(stock, { currentPrice: 10010, lowPrice: 9990, openPrice: 10020, timestamp: '2026-06-04T09:05:00+09:00' }, entry, { entryPrice: 10000, stopLoss: { price: 9900 } });
  const ruleSet = context.buildReversalLiveExitRuleSet(stock, { currentPrice: 10000, lowPrice: 9980, openPrice: 10020, timestamp: '2026-06-04T09:15:00+09:00' }, entry, { entryPrice: 10000, stopLoss: { price: 9900 } });

  const timeStopRule = ruleSet.rules.find(rule => rule.code === 'R2');
  assert.ok(timeStopRule);
  assert.equal(timeStopRule.triggered, true);
});

test('reversal R3는 +3% 반등 후 본전 복귀 시 본전보호 매도를 낸다', () => {
  const context = loadSellRulesContext();
  const entry = {
    reversalStopPolicy: {
      effectiveHardStopPrice: 9900,
      fallbackStopPrice: 9800,
      hardStopRuleSummary: '당일 저가와 % 손절 중 높은 값 사용',
      reasonSummary: '당일 저가 손절'
    },
    reversalLiveExitPolicy: {
      timeStopCutoff: '09:15',
      timeStopMinBouncePct: 1.0,
      breakevenActivationPct: 3.0,
      earlySpikeWindowEnd: '09:10',
      timeStopRuleSummary: '09:15 규칙',
      breakevenRuleSummary: '본전보호'
    }
  };
  context.getEntryByCode = () => entry;
  const stock = { type: 'reversal', code: '005930', entryKey: 'slotA:reversal:005930:r3', slotId: 'slotA' };
  context.buildReversalLiveExitRuleSet(stock, { currentPrice: 10320, lowPrice: 10010, openPrice: 10020, timestamp: '2026-06-04T09:07:00+09:00' }, entry, { entryPrice: 10000, stopLoss: { price: 9900 } });
  const ruleSet = context.buildReversalLiveExitRuleSet(stock, { currentPrice: 10000, lowPrice: 9990, openPrice: 10020, timestamp: '2026-06-04T09:20:00+09:00' }, entry, { entryPrice: 10000, stopLoss: { price: 9900 } });

  const breakevenRule = ruleSet.rules.find(rule => rule.code === 'R3');
  assert.ok(breakevenRule);
  assert.equal(breakevenRule.triggered, true);
});

test('reversal 종가 손절은 공통 H1 규칙이 처리한다', () => {
  const { buildNonSwingSellRuleSet } = loadSellRulesContext();
  const ruleSet = buildNonSwingSellRuleSet(
    { type: 'reversal' },
    {
      currentPrice: 9950,
      prevClose: 10000,
      ohlcvSeries: [
        { date: '20260604', close: 10000 },
        { date: '20260605', close: 9890 }
      ]
    },
    false,
    { entryPrice: 10000, stopLoss: { price: 9900 } },
    {}
  );

  const stopRule = ruleSet.rules.find(rule => rule.code === 'H1');
  assert.ok(stopRule);
  assert.equal(stopRule.triggered, true);
  assert.match(stopRule.result, /종가 기준 전량 매도/);
  assert.ok(ruleSet.hardSignals.some(rule => rule.code === 'H1'));
});
