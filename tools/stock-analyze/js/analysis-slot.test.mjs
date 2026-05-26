import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function createDocument(ids = []) {
  const elements = new Map(ids.map(id => [id, { id, innerHTML: '', className: '', innerText: '' }]));
  return {
    getElementById(id) {
      return elements.get(id) || null;
    }
  };
}

function loadAnalysisContext(entryKey = 'slotB:pullback:005930') {
  const stateCode = fs.readFileSync(new URL('./state.js', import.meta.url), 'utf8');
  const analysisCode = fs.readFileSync(new URL('./analysis.js', import.meta.url), 'utf8');
  const document = createDocument([
    'card-slotB-pullback-005930',
    'price-row-slotB-pullback-005930',
    'meta-slotB-pullback-005930',
    'plan-slotB-pullback-005930',
    'ind-slotB-pullback-005930',
    'badge-slotB-pullback-005930'
  ]);
  const detailCalls = [];
  const context = {
    console,
    document,
    window: {},
    activeBuySlot: 'slotA',
    activeSellSlot: 'slotB',
    NOTION_SLOT_IDS: ['slotA', 'slotB'],
    createEmptySnapshot() {
      return {
        regimeTable: [],
        regimeEvidence: [],
        regimeAlert: '',
        gapScore: {},
        pullbackEntries: [],
        momentumEntries: [],
        reversalEntries: [],
        swingEntries: [],
        sourceText: ''
      };
    },
    createEmptyLiveGapState() {
      return { status: 'idle', score: {}, fetchedAt: '', source: '', error: '' };
    },
    getSellStageKeyByTime() {
      return 'stage2';
    },
    getVisibleSellStocksList() {
      return [];
    },
    getSellUniverseMode() {
      return 'actual';
    },
    getSellStockByCode() {
      return null;
    },
    getBuyVerdictClassFromGrade() {
      return 'watch';
    },
    getSellActionPlanBadge() {
      return { cls: 'badge-pending', text: '대기 중', tone: 'hold' };
    },
    renderSellDetailToCard(detail) {
      detailCalls.push(detail);
    },
    escapeHtml(value) {
      return String(value ?? '');
    },
    clamp(value, min, max) {
      return Math.min(Math.max(Number(value) || 0, min), max);
    },
    STOCK_ANALYZE_WYCKOFF_HISTORY_DAYS: 60,
    liveGapState: { score: {} },
    log() {}
  };

  vm.createContext(context);
  vm.runInContext(stateCode, context);
  vm.runInContext(analysisCode, context);
  vm.runInContext(`
    buildIndicators = function buildIndicatorsStub() {
      return {
        indicators: [{ title: '분석 단계', status: 'unknown', result: '테스트', criterion: '테스트' }],
        decision: 'hold',
        actionStage: 'hold',
        triggeredRule: null,
        targets: null,
        gainRate: 0,
        lossManagement: null,
        gapProfile: null
      };
    };
  `, context);
  context.setNotionPageState('slotB', {
    notionPageId: 'page-b',
    snapshot: {
      regimeTable: [],
      regimeEvidence: [],
      regimeAlert: '',
      gapScore: {},
      pullbackEntries: [{
        rank: 1,
        name: '삼성전자 B',
        code: '005930',
        score: 6.8,
        grade: 'B',
        statusLabel: '관심후보',
        strategy: 'pullback',
        type: 'pullback',
        gates: [],
        matchedRules: [],
        unmatchedRules: [],
        notes: [],
        tradePlanRows: [],
        liveRefresh: null
      }],
      momentumEntries: [],
      reversalEntries: [],
      swingEntries: [],
      sourceText: ''
    }
  });

  return { context, detailCalls, entryKey };
}

test('slot-aware 매도 분석은 entryKey 기준으로 detail을 저장하고 렌더링한다', () => {
  const { context, detailCalls, entryKey } = loadAnalysisContext();
  const stock = context.ensureStockIdentity({
    name: '삼성전자 B',
    code: '005930',
    type: 'pullback',
    strategy: 'pullback',
    source: 'notion'
  }, 'slotB');

  context.applyRules(stock, {
    currentPrice: 10000,
    openPrice: 9900,
    prevClose: 9800,
    chgRate: 1.02,
    strength: null
  }, false);

  const detail = context.getStockDetailByKey(entryKey, 'slotB');
  assert.ok(detail);
  assert.equal(detail.stock.entryKey, entryKey);
  assert.equal(detailCalls.length, 1);
  assert.equal(detailCalls[0].stock.entryKey, entryKey);
});
