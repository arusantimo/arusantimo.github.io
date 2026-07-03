import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function createEmptySnapshot() {
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
    pullbackEntries: [],
    accumulationEntries: [],
    momentumEntries: [],
    reversalEntries: [],
    swingEntries: [],
    sourceText: ''
  };
}

function loadContext() {
  const context = {
    console,
    createEmptySnapshot,
    createEmptyLiveGapState() {
      return { status: 'idle', score: createEmptySnapshot().gapScore, fetchedAt: '', source: '', error: '' };
    },
    getBuyGradeFromScore(score, strategy = 'pullback') {
      const thresholds = strategy === 'reversal' ? { S: 8.0, A: 6.5, B: 5.0 } : { S: 8.5, A: 7.0, B: 5.5 };
      if (score >= thresholds.S) return 'S';
      if (score >= thresholds.A) return 'A';
      if (score >= thresholds.B) return 'B';
      return 'C';
    },
    getBuyFinalStatusLabel(grade) {
      return ({ S: '강력매수', A: '매수추천', B: '관심후보', C: '제외' })[String(grade).charAt(0)] || '제외';
    },
    rebuildSellStocksFromSnapshots() {}
  };
  vm.createContext(context);
  for (const file of ['state.js', 'jongga-schema.js', 'jongga-blacklist.js', 'jongga-manual-overrides.js']) {
    vm.runInContext(fs.readFileSync(new URL(`./${file}`, import.meta.url), 'utf8'), context);
  }
  vm.runInContext(`
    function getAllBuyEntries() {
      return NOTION_SLOT_IDS.flatMap(slotId => {
        const snapshot = getSlotSnapshot(slotId);
        return [...snapshot.pullbackEntries, ...(snapshot.accumulationEntries || []), ...snapshot.momentumEntries, ...snapshot.reversalEntries];
      });
    }
  `, context);
  vm.runInContext(fs.readFileSync(new URL('./jongga-adapter.js', import.meta.url), 'utf8'), context);
  return context;
}

function validGateMap(codes) {
  return Object.fromEntries(codes.map(code => [code, { status: 'passed' }]));
}

function pullbackPayload() {
  const gates = validGateMap(['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G9', 'G10', 'G11', 'G12', 'G13']);
  return {
    schemaVersion: 'jongga_result.v1',
    slots: [{
      slotId: 'slotA',
      entries: {
        pullback: [
          { rank: 1, name: '네이버', code: '035420', score: 7.2, grade: 'A', statusLabel: '매수추천', gates },
          { rank: 2, name: '리노공업', code: '058470', score: 7.0, grade: 'A', statusLabel: '매수추천', gates },
          { rank: 3, name: '한미반도체', code: '042700', score: 6.6, grade: 'B', statusLabel: '관심후보', gates }
        ]
      }
    }]
  };
}

test('블랙리스트 종목은 매수추천 목록에서 빠지고 다음 순위가 올라온다', () => {
  const context = loadContext();
  assert.equal(context.isJonggaBlacklisted('058470'), true, '058470은 블랙리스트여야 한다');

  context.applyJonggaResultToState(pullbackPayload());
  const entries = context.getSlotSnapshot('slotA').pullbackEntries;

  assert.equal(entries.length, 2, '블랙리스트 1종목이 제외되어 2종목만 남는다');
  assert.deepEqual(Array.from(entries, entry => entry.code), ['035420', '042700']);
  assert.deepEqual(Array.from(entries, entry => entry.rank), [1, 2], '제외 후 순위는 1,2로 다시 매겨진다');
});

test('블랙리스트 사유는 정의된 목록 안의 값만 반환한다', () => {
  const context = loadContext();
  assert.deepEqual(Array.from(context.getJonggaBlacklistReasons('058470')), ['공매도 과열']);
  assert.deepEqual(Array.from(context.getJonggaBlacklistReasons('035420')), []);
});

test('payload.blacklist 확정 종목은 매수추천에서 제외되고 미확인은 유지된다', () => {
  const context = loadContext();
  const gates = validGateMap(['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G9', 'G10', 'G11', 'G12', 'G13']);
  const payload = {
    schemaVersion: 'jongga_result.v1',
    blacklist: [
      { code: '042700', name: '한미반도체', reasons: ['투자 주의'], status: 'confirmed' },
      { code: '035420', name: '네이버', reasons: [], status: 'unconfirmed' }
    ],
    slots: [{
      slotId: 'slotA',
      entries: {
        pullback: [
          { rank: 1, name: '네이버', code: '035420', score: 7.2, grade: 'A', statusLabel: '매수추천', gates },
          { rank: 2, name: '한미반도체', code: '042700', score: 7.0, grade: 'A', statusLabel: '매수추천', gates },
          { rank: 3, name: '카카오', code: '035720', score: 6.6, grade: 'B', statusLabel: '관심후보', gates }
        ]
      }
    }]
  };

  context.applyJonggaResultToState(payload);
  const entries = context.getSlotSnapshot('slotA').pullbackEntries;

  assert.deepEqual(Array.from(entries, entry => entry.code), ['035420', '035720'], '확정 042700만 제외, 미확인 035420은 유지');
  assert.deepEqual(Array.from(entries, entry => entry.rank), [1, 2]);
  assert.equal(context.isJonggaBlacklisted('042700'), true);
  assert.equal(context.isJonggaBlacklisted('035420'), false, '미확인은 제외하지 않는다');
});

test('getJonggaExcludedEntries 함수는 블랙리스트 제외 종목만 올바르게 추려낸다', () => {
  const context = loadContext();
  const gates = validGateMap(['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G9', 'G10', 'G11', 'G12', 'G13']);
  
  const payload = {
    schemaVersion: 'jongga_result.v1',
    blacklist: [
      { code: '042700', name: '한미반도체', reasons: ['공매도 과열'], status: 'confirmed' }
    ],
    slots: [{
      slotId: 'slotA',
      entries: {
        pullback: [
          { rank: 1, name: '네이버', code: '035420', score: 7.2, grade: 'A', statusLabel: '매수추천', gates },
          { rank: 2, name: '한미반도체', code: '042700', score: 7.0, grade: 'A', statusLabel: '매수추천', gates }
        ]
      }
    }]
  };

  context.applyJonggaResultToState(payload);
  
  vm.runInContext(`
    globalThis.jonggaLastPayload = ${JSON.stringify(payload)};
    globalThis.activeBuySlot = 'slotA';
    
    function getJonggaExcludedEntries() {
      if (!globalThis.jonggaLastPayload) return [];
      const slots = typeof getJonggaSlots === 'function' ? getJonggaSlots(globalThis.jonggaLastPayload) : [];
      const activeSlotId = globalThis.activeBuySlot || 'slotA';
      const slot = slots.find(s => s.slotId === activeSlotId) || slots[0];
      if (!slot) return [];
      const collections = typeof getJonggaEntryCollections === 'function' ? getJonggaEntryCollections(slot) : null;
      if (!collections) return [];
      const allCandidates = [
        ...(collections.pullback || []),
        ...(collections.breakout || []),
        ...(collections.accumulation || []),
        ...(collections.reversal || [])
      ];
      const excludedMap = new Map();
      allCandidates.forEach(entry => {
        const code = typeof getJonggaCode === 'function' ? getJonggaCode(entry) : (entry.code || '');
        if (!code) return;
        if (typeof isJonggaBlacklisted === 'function' && isJonggaBlacklisted(code)) {
          if (!excludedMap.has(code)) {
            const name = typeof getJonggaName === 'function' ? getJonggaName(entry) : (entry.name || '');
            const reasons = typeof getJonggaBlacklistReasons === 'function' ? getJonggaBlacklistReasons(code) : [];
            excludedMap.set(code, { code, name, reasons });
          }
        }
      });
      return Array.from(excludedMap.values());
    }
  `, context);

  const excluded = vm.runInContext('getJonggaExcludedEntries()', context);
  assert.equal(excluded.length, 1, '제외된 종목은 한 개여야 한다');
  assert.equal(excluded[0].code, '042700', '제외된 종목의 코드는 042700이어야 한다');
  assert.equal(excluded[0].name, '한미반도체', '제외된 종목의 이름은 한미반도체여야 한다');
  assert.equal(excluded[0].reasons.length, 1, '제외 사유 개수는 1개여야 한다');
  assert.equal(excluded[0].reasons[0], '공매도 과열', '제외 사유는 공매도 과열이어야 한다');
});

