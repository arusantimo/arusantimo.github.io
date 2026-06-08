import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadUiContext() {
  const context = {
    console,
    window: null,
    localStorage: {
      store: new Map(),
      getItem(key) {
        return this.store.has(key) ? this.store.get(key) : null;
      },
      setItem(key, value) {
        this.store.set(key, String(value));
      }
    },
    document: {
      getElementById() {
        return null;
      }
    },
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
  vm.runInContext(fs.readFileSync(new URL('./gap.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./utils.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./state.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./ui.js', import.meta.url), 'utf8'), context);
  return context;
}

function createContainerStub() {
  return {
    innerHTML: '',
    querySelectorAll() {
      return [];
    }
  };
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

test('market cap helper keeps full formatter and compact line output', () => {
  const context = loadUiContext();
  assert.equal(context.formatMarketCapTrillion(40), '시총 400,000.0억 (40.0조)');
  assert.equal(context.renderMarketCapLineHtml({ marketCapTrillion: 40 }), '<div class="stock-code-cap market-cap-amount">40.0조</div>');
});

test('market cap inline helper can insert a rank badge before the amount', () => {
  const context = loadUiContext();
  const rankMap = context.buildMarketCapRankMap([
    { entryKey: 'A', marketCapTrillion: 40 },
    { entryKey: 'B', marketCapTrillion: 20 },
    { entryKey: 'C', marketCapTrillion: 5 }
  ]);

  const html = context.renderMarketCapInlineHtml({ entryKey: 'A', marketCapTrillion: 40, marketCapRank: 1, marketCapUniverseCount: 3 }, rankMap);
  assert.match(html, /^<span class="market-cap-rank-badge market-cap-rank-top10">시총 1위<\/span><span class="stock-code-cap stock-code-cap-inline market-cap-amount" style="color: rgb\(59, 130, 246\);">40\.0조<\/span>$/);
});

test('trade plan stage tags render full staged exits including swing quantity and stop', () => {
  const context = loadUiContext();
  const html = context.buildTradePlanStageTagHtml({
    tradePlanRows: [
      { stage: '🌅 프리마켓', stageKey: 'premarket', quantity: '30% 익절', targetPrice: '261,887원' },
      { stage: '🔔 장초반', stageKey: 'openPhase', quantity: '30% 익절', targetPrice: '265,720원' },
      { stage: '📈 장중 1차', stageKey: 'intraday1', quantity: '25% 익절', targetPrice: '270,830원' },
      { stage: '📈 장중 2차', stageKey: 'intraday2', quantity: '10% 익절', targetPrice: '275,940원' },
      { stage: '📊 스윙 전환', stageKey: 'swing', quantity: '5% 익절', targetPrice: '281,050원' },
      { stage: '🛑 손절', stageKey: 'stop', quantity: '전량', targetPrice: '247,835원' }
    ]
  }, {
    recommendedProfile: { label: '저항 우선형', profileKey: 'conservative' }
  }).join('');

  assert.match(html, /추천 저항 우선형/);
  assert.match(html, /🌅 30% 익절 261,887원/);
  assert.match(html, /🔔 30% 익절 265,720원/);
  assert.match(html, /📈1 25% 익절 270,830원/);
  assert.match(html, /📈2 10% 익절 275,940원/);
  assert.match(html, /plan-tag swing">📊 5% 익절 281,050원/);
  assert.match(html, /plan-tag stop">🛑 전량 247,835원/);
});

test('trade plan table keeps profile comparison and also shows recommended profile stage rows', () => {
  const context = loadUiContext();
  const html = context.renderTradePlanTable({
    strategy: 'pullback',
    recommendedTakeProfitProfile: {
      profileKey: 'conservative',
      label: '저항 우선형'
    },
    pullbackTakeProfitProfiles: [
      {
        profileKey: 'conservative',
        label: '저항 우선형',
        recommended: true,
        reasonSummary: '1차 저항 반영형',
        tradePlanRows: [
          { stage: '🌅 프리마켓', stageKey: 'premarket', condition: '+2.0% 도달', quantity: '35% 익절', targetYield: '+2.0%', targetPrice: '112,914원' },
          { stage: '🔔 장초반', stageKey: 'openPhase', condition: '+3.0% 도달', quantity: '30% 익절', targetYield: '+3.0%', targetPrice: '114,021원' },
          { stage: '📈 장중 1차', stageKey: 'intraday1', condition: '+4.5% 도달', quantity: '25% 익절', targetYield: '+4.5%', targetPrice: '115,681원', recommended: true },
          { stage: '📈 장중 2차', stageKey: 'intraday2', condition: '+6.0% 도달', quantity: '10% 익절', targetYield: '+6.0%', targetPrice: '117,342원' },
          { stage: '📊 스윙 전환', stageKey: 'swing', condition: 'D+2 고점 돌파', quantity: '잔량 전량', targetYield: '+8.0%', targetPrice: '119,556원' },
          { stage: '🛑 손절', stageKey: 'stop', condition: '유효 손절가 107,932원 하향 이탈', quantity: '전량', targetYield: '-2.5%', targetPrice: '107,932원' }
        ]
      }
    ]
  });

  assert.match(html, /1차 익절가/);
  assert.match(html, /추천 프로필 단계 · 저항 우선형/);
  assert.match(html, /<th>단계<\/th><th>조건<\/th><th>수량<\/th><th>목표 수익률<\/th><th>목표가<\/th>/);
  assert.match(html, /🌅 프리마켓/);
  assert.match(html, /📈 장중 1차/);
  assert.match(html, /📊 스윙 전환/);
  assert.match(html, /🛑 손절/);
});

test('buy cards render staged exit tags including swing stage', () => {
  const context = loadUiContext();
  vm.runInContext(fs.readFileSync(new URL('./sell-ui.js', import.meta.url), 'utf8'), context);
  const containers = new Map([
    ['buy-list-pullback', createContainerStub()],
    ['buy-list-accumulation', createContainerStub()],
    ['buy-list-breakout', createContainerStub()],
    ['buy-list-reversal', createContainerStub()]
  ]);

  context.document = {
    getElementById(id) {
      return containers.get(id) || null;
    },
    querySelectorAll() {
      return [];
    }
  };
  context.getJonggaReplayViewMode = () => 'recommendation';
  context.filterJonggaReplayViewEntries = entries => entries.filter(entry => entry.entryEligible);
  context.buildMarketCapRankMap = () => new Map();
  context.summarizeGateStatus = () => ({ passed: 6, total: 7 });
  context.getBuyPresentation = () => ({
    verdictClass: 'candidate',
    liveRefresh: false,
    changed: {
      score: false,
      grade: false,
      adjustment: false,
      statusLabel: false
    },
    primaryGrade: 'A',
    primarySummary: '신호 8.2 / 진입 8.2 · A',
    primaryStatusLabel: '매매가능',
    primaryStatusReasonShort: '',
    strategyStatusLabel: '매매가능'
  });
  context.getBuyDisplayScore = () => '8.2';
  context.buildBuyScoreDisplayHtml = () => ({ signalText: '8.2', strictLine: '', badgeHtml: '' });
  context.renderVolatilityTopBadges = () => '';
  context.renderPullbackCardInsights = () => '';
  context.renderVolatilityCardInsights = () => '';
  context.buildStockNameLinksHtml = name => name;
  context.buildBuyTrackingButtonHtml = () => '';
  context.bindBuyTrackingButtons = () => {};
  context.getEntryByCode = entryKeyOrCode => context.__testPullbackEntries.find(entry =>
    entry.entryKey === entryKeyOrCode || entry.code === entryKeyOrCode
  ) || null;
  context.getTradingValueRankBadgeHtml = () => '';
  context.renderMarketCapInlineHtml = () => '';
  context.renderBuyPriceWithDailyChange = () => '<span>110,700원</span>';
  context.openModal = () => {};
  context.__testPullbackEntries = [{
    entryKey: 'slotA:pullback:035420',
    strategy: 'pullback',
    rank: 1,
    name: 'NAVER',
    code: '035420',
    rr: '1 : 1.3',
    entryEligible: true,
    matchedRules: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'],
    unmatchedRules: [],
    notes: [],
    rationale: '목표가와 스윙 단계를 카드에서도 바로 확인합니다.',
    tradePlanRows: [
      { stage: '🌅 프리마켓', stageKey: 'premarket', quantity: '30% 익절', targetPrice: '261,887원' },
      { stage: '🔔 장초반', stageKey: 'openPhase', quantity: '30% 익절', targetPrice: '265,720원' },
      { stage: '📈 장중 1차', stageKey: 'intraday1', quantity: '25% 익절', targetPrice: '270,830원' },
      { stage: '📈 장중 2차', stageKey: 'intraday2', quantity: '10% 익절', targetPrice: '275,940원' },
      { stage: '📊 스윙 전환', stageKey: 'swing', quantity: '5% 익절', targetPrice: '281,050원' },
      { stage: '🛑 손절', stageKey: 'stop', quantity: '전량', targetPrice: '247,835원' }
    ]
  }];
  context.setNotionPageState('slotA', {
    snapshot: {
      pullbackEntries: context.__testPullbackEntries,
      accumulationEntries: [],
      breakoutEntries: [],
      momentumEntries: [],
      reversalEntries: [],
      regimeTable: [],
      regimeEvidence: [],
      gapScore: { grade: '', rows: [] }
    }
  });
  context.setActiveBuySlot('slotA');

  context.renderBuyStockCards();

  const html = containers.get('buy-list-pullback').innerHTML;
  assert.match(html, /plan-prices/);
  assert.match(html, /🌅 30% 익절 261,887원/);
  assert.match(html, /📈1 25% 익절 270,830원/);
  assert.match(html, /📊 5% 익절 281,050원/);
  assert.match(html, /🛑 전량 247,835원/);
});
