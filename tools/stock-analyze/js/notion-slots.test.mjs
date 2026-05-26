import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function createLocalStorage(seed = {}) {
  const store = new Map(Object.entries(seed));
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    dump() {
      return Object.fromEntries(store.entries());
    }
  };
}

function loadSlotContext(seedStorage = {}) {
  const stateCode = fs.readFileSync(new URL('./state.js', import.meta.url), 'utf8');
  const analysisCode = fs.readFileSync(new URL('./analysis.js', import.meta.url), 'utf8');
  const trackingCode = fs.readFileSync(new URL('./sell-tracking.js', import.meta.url), 'utf8');
  const archiveCode = fs.readFileSync(new URL('./archive.js', import.meta.url), 'utf8');
  const apiCode = fs.readFileSync(new URL('./api.js', import.meta.url), 'utf8');
  const localStorage = createLocalStorage(seedStorage);
  const createEmptyGapScore = () => ({
    rows: [],
    totalScore: '',
    grade: '',
    entryAdjustment: '',
    sellAdjustment: '',
    swingAdjustment: '',
    note: ''
  });
  const createEmptySnapshot = () => ({
    regimeTable: [],
    regimeEvidence: [],
    regimeAlert: '',
    gapScore: createEmptyGapScore(),
    pullbackEntries: [],
    momentumEntries: [],
    reversalEntries: [],
    swingEntries: [],
    sourceText: ''
  });

  const context = {
    console,
    localStorage,
    ANALYSIS_ARCHIVE_KEY: 'stockAnalyzePreviousAnalysisSnapshotsV1',
    SELL_TRACKING_STATE_KEY: 'stockAnalyzeSellTrackingStateV1',
    SAVED_NOTION_URLS_KEY: 'stockAnalyzeSavedNotionUrlsV2',
    LEGACY_SAVED_NOTION_URL_KEY: 'savedNotionUrl',
    SELL_SCORE_DIRECTION: 'higher_is_more_sell',
    PROXIES: [],
    window: {},
    document: {
      body: { classList: { toggle() {} } },
      getElementById() { return null; },
      querySelectorAll() { return []; },
      querySelector() { return null; }
    },
    createEmptyGapScore,
    createEmptyLiveGapState() {
      return {
        status: 'idle',
        score: createEmptyGapScore(),
        fetchedAt: '',
        source: '',
        error: ''
      };
    },
    createEmptySnapshot,
    normalizeBuyLiveRefresh(entry, liveRefresh) {
      return liveRefresh ? { ...liveRefresh, entryKey: liveRefresh.entryKey || entry.entryKey } : null;
    },
    getBuyPresentation(entry) {
      return {
        primaryGrade: entry.liveRefresh?.finalGrade || entry.grade || 'C'
      };
    },
    renderBuyStockCards() {},
    renderSellStockCards() {},
    updateAnalyzeButtonState() {},
    updateCurrentTime() {},
    log() {}
  };

  vm.createContext(context);
  vm.runInContext(stateCode, context);
  vm.runInContext(analysisCode, context);
  vm.runInContext(trackingCode, context);
  vm.runInContext(archiveCode, context);
  vm.runInContext(apiCode, context);
  context.window = context;
  return context;
}

function buildSnapshot(entryName) {
  return {
    regimeTable: [],
    regimeEvidence: [],
    regimeAlert: '',
    gapScore: {
      rows: [],
      totalScore: '',
      grade: '',
      entryAdjustment: '',
      sellAdjustment: '',
      swingAdjustment: '',
      note: ''
    },
    pullbackEntries: [{
      rank: 1,
      name: entryName,
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
  };
}

test('legacy savedNotionUrl는 slotA로 마이그레이션된다', () => {
  const context = loadSlotContext({
    savedNotionUrl: 'https://notion.so/page-a'
  });

  const urls = context.readSavedNotionUrls();
  assert.equal(urls.slotA, 'https://notion.so/page-a');
  assert.equal(urls.slotB, '');
});

test('sell tracking legacy scope는 slotA page scope로 승격되고 slot별로 분리된다', () => {
  const context = loadSlotContext({
    stockAnalyzeSellTrackingStateV1: JSON.stringify({
      'page-a': {
        universeMode: 'actual',
        trackedCodes: ['005930']
      }
    })
  });

  context.setNotionPageState('slotA', {
    notionPageId: 'page-a',
    snapshot: buildSnapshot('삼성전자 A')
  });
  context.setNotionPageState('slotB', {
    notionPageId: 'page-b',
    snapshot: buildSnapshot('삼성전자 B')
  });
  context.rebuildSellStocksFromSnapshots();

  assert.equal(context.isBuyEntryTrackedForSell('slotA:005930', 'slotA'), true);
  assert.equal(context.isBuyEntryTrackedForSell('slotA:pullback:005930', 'slotA'), true);
  assert.equal(context.isBuyEntryTrackedForSell('slotB:005930', 'slotB'), false);
  assert.equal(context.getVisibleSellStocksList('slotA', 'actual').length, 1);
  assert.equal(context.getVisibleSellStocksList('slotB', 'actual').length, 0);

  const migratedStore = JSON.parse(context.localStorage.getItem(context.SELL_TRACKING_STATE_KEY));
  assert.ok(migratedStore['slotA:page-a']);
  assert.equal(migratedStore['page-a'], undefined);
});

test('실매수 모드는 매도 추적을 켠 종목만 표시한다', () => {
  const context = loadSlotContext();
  const snapshot = buildSnapshot('삼성전자');
  snapshot.pullbackEntries[0].grade = 'S';
  snapshot.swingEntries = [{
    rank: 1,
    name: '스윙종목',
    code: '000660',
    strategy: 'swing',
    type: 'swing'
  }];

  context.setNotionPageState('slotA', {
    notionPageId: 'page-a',
    snapshot
  });
  context.rebuildSellStocksFromSnapshots();

  assert.equal(context.getVisibleSellStocksList('slotA', 'actual').length, 0);
  assert.equal(context.getVisibleSellStocksList('slotA', 'all').length, 2);

  context.setBuyEntryTrackedForSell('slotA:pullback:005930', true, 'slotA');
  const actual = context.getVisibleSellStocksList('slotA', 'actual');
  assert.equal(actual.length, 1);
  assert.equal(actual[0].code, '005930');
  assert.equal(actual[0].strategy, 'pullback');
});

test('레거시 추적 키(slot:code) 해제 시 전략 카드에서도 추적이 꺼진다', () => {
  const context = loadSlotContext({
    stockAnalyzeSellTrackingStateV1: JSON.stringify({
      'slotA:page-a': {
        universeMode: 'actual',
        trackedEntryKeys: ['slotA:005930']
      }
    })
  });

  context.setNotionPageState('slotA', {
    notionPageId: 'page-a',
    snapshot: buildSnapshot('삼성전자')
  });
  context.rebuildSellStocksFromSnapshots();
  context.activeSellSlot = 'slotA';

  assert.equal(context.isBuyEntryTrackedForSell('slotA:pullback:005930', 'slotA'), true);
  context.setBuyEntryTrackedForSell('slotA:pullback:005930', false, 'slotA');
  assert.equal(context.isBuyEntryTrackedForSell('slotA:pullback:005930', 'slotA'), false);
  assert.equal(context.getVisibleSellStocksList('slotA', 'actual').length, 0);
});

test('같은 종목코드도 전략별로 매도 추적을 따로 등록한다', () => {
  const context = loadSlotContext();
  const snapshot = buildSnapshot('삼성전자');
  snapshot.momentumEntries = [{
    rank: 2,
    name: '삼성전자',
    code: '005930',
    strategy: 'momentum',
    type: 'momentum',
    gates: [],
    matchedRules: [],
    unmatchedRules: [],
    notes: [],
    tradePlanRows: []
  }];

  context.setNotionPageState('slotA', { notionPageId: 'page-a', snapshot });
  context.rebuildSellStocksFromSnapshots();
  context.activeSellSlot = 'slotA';
  context.setSellUniverseMode('actual', 'slotA');

  context.setBuyEntryTrackedForSell('slotA:pullback:005930', true, 'slotA');
  assert.equal(context.isBuyEntryTrackedForSell('slotA:pullback:005930', 'slotA'), true);
  assert.equal(context.isBuyEntryTrackedForSell('slotA:momentum:005930', 'slotA'), false);
  assert.equal(context.getVisibleSellStocksList('slotA', 'actual').length, 1);

  context.setBuyEntryTrackedForSell('slotA:momentum:005930', true, 'slotA');
  assert.equal(context.getVisibleSellStocksList('slotA', 'actual').length, 2);
});

test('통합 분석 대상은 현재 매도 화면(슬롯·universe)과 동일하다', () => {
  const context = loadSlotContext();
  const snapshot = buildSnapshot('삼성전자');
  snapshot.momentumEntries = [{
    rank: 2,
    name: 'SK하이닉스',
    code: '000660',
    strategy: 'momentum',
    type: 'momentum',
    gates: [],
    matchedRules: [],
    unmatchedRules: [],
    notes: [],
    tradePlanRows: []
  }];

  context.setNotionPageState('slotA', { notionPageId: 'page-a', snapshot });
  context.rebuildSellStocksFromSnapshots();
  context.activeSellSlot = 'slotA';
  context.setSellUniverseMode('actual', 'slotA');

  assert.equal(context.getSellStocksForCurrentSellView(false, 'slotA').length, 0);
  assert.equal(context.getAllSellStocksForAnalysis(false).length, 0);

  context.setBuyEntryTrackedForSell('slotA:pullback:005930', true, 'slotA');
  assert.equal(context.getSellStocksForCurrentSellView(false, 'slotA').length, 1);

  context.setSellUniverseMode('all', 'slotA');
  assert.equal(context.getSellStocksForCurrentSellView(false, 'slotA').length, 2);
  assert.equal(context.getAllSellStocksForAnalysis(false).length, 2);
});

test('legacy archive shape는 buy/sell slotA 구조로 복원된다', () => {
  const context = loadSlotContext({
    stockAnalyzePreviousAnalysisSnapshotsV1: JSON.stringify({
      buy: {
        analysisTime: '09:00',
        entries: [{
          code: '005930',
          liveRefresh: { finalScore: 7.2, finalGrade: 'A' }
        }]
      },
      sell: {
        stage1: {
          analysisTime: '08:50',
          details: [{
            code: '005930',
            stock: { code: '005930', type: 'pullback', strategy: 'pullback', slotId: 'slotA', source: 'notion' }
          }]
        }
      }
    })
  });

  const archive = context.readAnalysisArchive();
  assert.equal(archive.buy.bySlot.slotA.analysisTime, '09:00');
  assert.equal(archive.buy.bySlot.slotB, null);
  assert.equal(archive.sell.bySlot.slotA.stage1.analysisTime, '08:50');
  assert.equal(archive.sell.bySlot.slotB.stage1, null);
});

test('restoreBuyAnalysisArchive와 restoreSellAnalysisArchives는 같은 코드도 slot별로 분리 유지한다', () => {
  const context = loadSlotContext();

  context.setNotionPageState('slotA', {
    notionPageId: 'page-a',
    snapshot: buildSnapshot('삼성전자 A')
  });
  context.setNotionPageState('slotB', {
    notionPageId: 'page-b',
    snapshot: buildSnapshot('삼성전자 B')
  });
  context.rebuildSellStocksFromSnapshots();

  const archive = {
    buy: {
      bySlot: {
        slotA: {
          entries: [{
            entryKey: 'slotA:005930',
            code: '005930',
            liveRefresh: { finalScore: 7.1, finalGrade: 'A' }
          }]
        },
        slotB: {
          entries: [{
            entryKey: 'slotB:005930',
            code: '005930',
            liveRefresh: { finalScore: 6.2, finalGrade: 'B' }
          }]
        }
      }
    },
    sell: {
      bySlot: {
        slotA: {
          stage1: {
            trackingScope: 'slotA:page-a',
            details: [{
              entryKey: 'slotA:005930',
              code: '005930',
              stock: { name: '삼성전자 A', code: '005930', type: 'pullback', strategy: 'pullback', source: 'notion', slotId: 'slotA' },
              isBefore0908: true
            }]
          },
          stage2: null
        },
        slotB: {
          stage1: {
            trackingScope: 'slotB:page-b',
            details: [{
              entryKey: 'slotB:005930',
              code: '005930',
              stock: { name: '삼성전자 B', code: '005930', type: 'pullback', strategy: 'pullback', source: 'notion', slotId: 'slotB' },
              isBefore0908: true
            }]
          },
          stage2: null
        }
      }
    }
  };

  assert.equal(context.restoreBuyAnalysisArchive(archive), true);
  assert.equal(context.getEntryByCode('slotA:005930', 'slotA').liveRefresh.finalGrade, 'A');
  assert.equal(context.getEntryByCode('slotB:005930', 'slotB').liveRefresh.finalGrade, 'B');

  assert.equal(context.restoreSellAnalysisArchives(archive, 'stage1'), true);
  assert.ok(context.getStockDetailByKey('slotA:005930'));
  assert.ok(context.getStockDetailByKey('slotB:005930'));
  assert.notEqual(context.getStockDetailByKey('slotA:005930').stock.slotId, context.getStockDetailByKey('slotB:005930').stock.slotId);
});
