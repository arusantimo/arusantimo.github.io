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
    momentumEntries: [],
    reversalEntries: [],
    swingEntries: [],
    sourceText: ''
  };
}

function createStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    }
  };
}

function loadContext() {
  const context = {
    console,
    localStorage: createStorage(),
    createEmptySnapshot,
    createEmptyLiveGapState() {
      return { status: 'idle', score: createEmptySnapshot().gapScore, fetchedAt: '', source: '', error: '' };
    },
    getBuyGradeFromScore(score) {
      if (score >= 9) return 'S';
      if (score >= 7.5) return 'A';
      if (score >= 6) return 'B';
      return 'C';
    },
    getBuyFinalStatusLabel(grade) {
      return ({ S: '강력매수', A: '매수추천', B: '관심후보', C: '제외' })[String(grade).charAt(0)] || '제외';
    },
    rebuildSellStocksFromSnapshots() {}
  };
  vm.createContext(context);
  for (const file of ['state.js', 'jongga-schema.js']) {
    vm.runInContext(fs.readFileSync(new URL(`./${file}`, import.meta.url), 'utf8'), context);
  }
  vm.runInContext(`
    function getAllBuyEntries() {
      return NOTION_SLOT_IDS.flatMap(slotId => {
        const snapshot = getSlotSnapshot(slotId);
        return [...snapshot.pullbackEntries, ...snapshot.momentumEntries, ...snapshot.reversalEntries];
      });
    }
  `, context);
  for (const file of ['jongga-manual-overrides.js', 'jongga-adapter.js']) {
    vm.runInContext(fs.readFileSync(new URL(`./${file}`, import.meta.url), 'utf8'), context);
  }
  return context;
}

function validGateMap(codes) {
  return Object.fromEntries(codes.map(code => [code, { status: 'passed' }]));
}

test('momentum manual overrides promote score and matched rules', () => {
  const context = loadContext();
  context.saveJonggaManualOverridePayload({
    entries: {
      '005930': {
        code: '005930',
        name: '삼성전자',
        toss: { avgStrength: 112.5, intradayAbove100Ratio: 75.0 },
        orderbook: { bidAskRatio: 1.33 }
      }
    }
  });

  const payload = {
    schemaVersion: 'jongga_result.v1',
    slots: [{
      slotId: 'slotA',
      regime: { table: [{ item: 'VKOSPI', value: 'VKOSPI 18.00' }] },
      entries: {
        momentum: [{
          rank: 1,
          name: '삼성전자',
          code: '005930',
          score: 6.0,
          grade: 'B',
          statusLabel: '관심후보',
          toss: { avgStrength: 107, note: '자동 수집값' },
          orderbook: { bidAskRatio: 1.01, note: '자동 수집값' },
          gates: validGateMap(['G1', 'G2', 'G3', 'G4']),
          notes: ['토스 체결강도·호가잔량 미반영']
        }]
      }
    }]
  };

  const effective = context.applyJonggaManualOverridesToPayload(payload);
  const rawEntry = effective.slots[0].entries.momentum[0];
  context.applyJonggaResultToState(effective);
  const entry = context.getSlotSnapshot('slotA').momentumEntries[0];
  assert.equal(entry.score, 9);
  assert.equal(entry.grade, 'S');
  assert.equal(rawEntry.toss.avgStrength, 112.5);
  assert.equal(rawEntry.orderbook.bidAskRatio, 1.33);
  assert.deepEqual(Array.from(entry.matchedRules, rule => rule.code).sort(), ['C3', 'S2']);
  assert.ok(entry.notes.some(note => note.includes('수동 입력 반영')));
});

test('reversal event filter manual block enforces safety block', () => {
  const context = loadContext();
  context.saveJonggaManualOverridePayload({
    entries: {
      '000660': {
        code: '000660',
        eventFilter: { blocked: true, note: '실적 D-1' }
      }
    }
  });

  const payload = {
    schemaVersion: 'jongga_result.v1',
    slots: [{
      slotId: 'slotA',
      regime: { table: [{ item: 'VKOSPI', value: 'VKOSPI 24.00' }] },
      entries: {
        reversal: [{
          rank: 1,
          name: 'SK하이닉스',
          code: '000660',
          score: 8.6,
          grade: 'S',
          statusLabel: '최우선 진입',
          eventFilter: { blocked: false, note: '자동 수집값' },
          filters: validGateMap(['F1', 'F2', 'F3', 'F4']),
          gates: validGateMap(['G1', 'G2', 'G3', 'G4', 'G5'])
        }]
      }
    }]
  };

  const effective = context.applyJonggaManualOverridesToPayload(payload);
  const validation = context.validateJonggaResult(effective);
  assert.equal(validation.safetyBlocks.length, 1);
  const rawEntry = effective.slots[0].entries.reversal[0];

  context.applyJonggaResultToState(effective);
  const entry = context.getSlotSnapshot('slotA').reversalEntries[0];
  assert.equal(entry.statusLabel, '자동매수 금지');
  assert.ok(entry.safety.blocked);
  assert.equal(rawEntry.eventFilter.blocked, true);
  assert.equal(rawEntry.eventFilter.note, '실적 D-1');
  assert.ok(entry.filters.find(rule => rule.code === 'F3')?.note.includes('이벤트 필터 차단'));
});