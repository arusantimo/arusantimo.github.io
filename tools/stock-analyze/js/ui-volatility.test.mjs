import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadUiContext() {
  const context = {
    console,
    window: null,
    escapeHtml(value) {
      return String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    normalizeStrategyKey(value) {
      return String(value || '').trim().toLowerCase();
    },
    syncBodyScrollLock() {}
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('./config.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./utils.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./ui.js', import.meta.url), 'utf8'), context);
  return context;
}

test('volatility card insight renders summary and blended state', () => {
  const context = loadUiContext();
  const badgeHtml = context.renderVolatilityTopBadges({
    volatilityContext: {
      marketState: 'volatile',
      stockState: 'neutral',
      blendedState: 'volatile',
      strategyFit: 'favorable',
      scoreDelta: 0.75,
      summary: '유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)',
      metrics: { vkospi: 26.4, atrPct10: 4.9 }
    }
  });
  const html = context.renderVolatilityCardInsights({
    volatilityContext: {
      marketState: 'volatile',
      stockState: 'neutral',
      blendedState: 'volatile',
      strategyFit: 'favorable',
      scoreDelta: 0.75,
      summary: '유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)',
      metrics: { vkospi: 26.4, atrPct10: 4.9 }
    }
  });

  assert.match(badgeHtml, /buy-card-top-badges/);
  assert.match(badgeHtml, /✅ 변동성 유리/);
  assert.match(badgeHtml, /📈 가점 \+0.75점/);
  assert.match(html, /변동성 적합/);
  assert.match(html, /유리/);
  assert.match(html, /고변동성/);
  assert.match(html, /시장 고변동성 \/ 종목 중립 변동성 \/ 혼합 고변동성/);
});

test('volatility modal section renders states and score delta', () => {
  const context = loadUiContext();
  const html = context.renderVolatilityModalSection({
    marketState: 'calm',
    stockState: 'neutral',
    blendedState: 'neutral',
    strategyFit: 'slight_favorable',
    strategyLabel: '눌림목',
    scoreDelta: 0.25,
    summary: '다소 유리 (중립 변동성이라 눌림목 진입은 다소 유리합니다)',
    reason: '시장 저변동성 / 종목 중립 변동성 → 혼합 중립 변동성. 중립 변동성이라 눌림목 진입은 다소 유리합니다. VKOSPI 18.20, ATR10 2.80%, 일간 표준편차 1.90%, 당일 레인지 3.40%.',
    metrics: {
      vkospi: 18.2,
      atrPct10: 2.8,
      returnStd20: 1.9,
      todayRangePct: 3.4
    }
  });

  assert.match(html, /변동성 적합도/);
  assert.match(html, /✅ 변동성 유리/);
  assert.match(html, /눌림목 유불리/);
  assert.match(html, /시장 저변동성 \/ 종목 중립 변동성 \/ 혼합 중립 변동성/);
  assert.match(html, /📈 가점 \+0.25점/);
  assert.match(html, /판정 해석/);
  assert.match(html, /사용 지표/);
  assert.match(html, /20일 표준편차 1.90%/);
});

test('volatility badges emphasize unfavorable state with penalty badge', () => {
  const context = loadUiContext();
  const html = context.renderVolatilityTopBadges({
    volatilityContext: {
      marketState: 'volatile',
      stockState: 'neutral',
      blendedState: 'volatile',
      strategyFit: 'unfavorable',
      scoreDelta: -1.0,
      summary: '불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)',
      metrics: { vkospi: 26.4, atrPct10: 4.9 }
    }
  });

  assert.match(html, /⛔ 변동성 불리/);
  assert.match(html, /📉 감점 -1.00점/);
});

test('market regime header volatility badge follows regime and VKOSPI thresholds', () => {
  const context = loadUiContext();
  const calm = context.getMarketVolatilityBadgeMeta({ regime: '강세장 ✅', vkospi: '17.8' });
  const volatile = context.getMarketVolatilityBadgeMeta({ regime: '박스권 ⚠️', vkospi: '20.1' });
  const neutral = context.getMarketVolatilityBadgeMeta({ regime: '순환매장 🔄', vkospi: '21.4' });

  assert.equal(calm.label, '저변동성 장세');
  assert.equal(calm.tone, 'calm');
  assert.equal(volatile.label, '고변동성 장세');
  assert.equal(volatile.tone, 'volatile');
  assert.equal(neutral.label, '중립 변동성');
  assert.equal(neutral.tone, 'neutral');
});

test('market cap helper renders one-line market cap text', () => {
  const context = loadUiContext();
  assert.equal(context.formatMarketCapTrillion(40), '시총 400,000.0억 (40.0조)');
  assert.match(context.renderMarketCapLineHtml({ marketCapTrillion: 40 }), /시총 400,000\.0억 \(40\.0조\)/);
});
