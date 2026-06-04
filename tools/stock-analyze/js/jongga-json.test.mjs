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
    breakoutEntries: [],
    accumulationEntries: [],
    momentumEntries: [],
    reversalEntries: [],
    swingEntries: [],
    sourceText: ''
  };
}

function loadJonggaContext() {
  const context = {
    console,
    createEmptySnapshot,
    createEmptyLiveGapState() {
      return { status: 'idle', score: createEmptySnapshot().gapScore, fetchedAt: '', source: '', error: '' };
    },
    getBuyGradeFromScore(score, strategy = 'pullback') {
      const maps = {
        pullback: { S: 8.5, A: 7.0, B: 5.5 },
        breakout: { S: 8.5, A: 7.0, B: 5.5 },
        momentum: { S: 8.5, A: 7.0, B: 5.5 },
        accumulation: { S: 8.5, A: 7.0, B: 5.5 },
        reversal: { S: 8.0, A: 6.5, B: 5.0 }
      };
      const thresholds = maps[strategy] || maps.pullback;
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
  for (const file of ['state.js', 'jongga-schema.js', 'entry-policy.js']) {
    vm.runInContext(fs.readFileSync(new URL(`./${file}`, import.meta.url), 'utf8'), context);
  }
  vm.runInContext(`
    function getAllBuyEntries() {
      return NOTION_SLOT_IDS.flatMap(slotId => {
        const snapshot = getSlotSnapshot(slotId);
        return [
          ...snapshot.pullbackEntries,
          ...(snapshot.breakoutEntries || snapshot.momentumEntries),
          ...(snapshot.accumulationEntries || []),
          ...snapshot.reversalEntries
        ];
      });
    }
  `, context);
  vm.runInContext(fs.readFileSync(new URL('./jongga-adapter.js', import.meta.url), 'utf8'), context);
  return context;
}

function validGateMap(codes) {
  return Object.fromEntries(codes.map(code => [code, { status: 'passed' }]));
}

test('jongga_result.v1은 핵심 Gate 누락 S등급 후보를 안전 차단한다', () => {
  const context = loadJonggaContext();
  const payload = {
    schemaVersion: 'jongga_result.v1',
    slots: [{
      slotId: 'slotA',
      entries: {
        pullback: [{
          rank: 1,
          name: '테스트',
          code: '005930',
          score: 9.2,
          grade: 'S',
          statusLabel: '강력매수',
          gates: { G1: { status: 'passed' } }
        }]
      }
    }]
  };

  const validation = context.validateJonggaResult(payload);
  assert.equal(validation.ok, true);
  assert.equal(validation.safetyBlocks.length, 1);

  context.applyJonggaResultToState(payload);
  const entry = context.getSlotSnapshot('slotA').pullbackEntries[0];
  assert.equal(entry.scoreUnavailable, true);
  assert.equal(entry.statusLabel, '자동매수 금지');
  assert.ok(entry.safety.blocked);
});

test('jongga_result.v1 JSON은 slot snapshot으로 주입된다', () => {
  const context = loadJonggaContext();
  const payload = {
    schemaVersion: 'jongga_result.v1',
    dataQuality: { status: 'complete', counts: { fallback: 0 } },
    slots: [{
      slotId: 'slotA',
      regime: { table: [{ item: '레짐', value: '강세장' }] },
      gapScore: { grade: 'G-B', totalScore: '3.5' },
      entries: {
        momentum: [{
          rank: 1,
          name: '삼성전자',
          code: '005930',
          score: 8.1,
          signalScore: 8.4,
          strictScore: 8.1,
          scoreMax: 12.5,
          gradeScore: 6.5,
          grade: 'A',
          entryEligible: true,
          entryBlockers: [],
          scoreBreakdown: [{ code: 'C3', strictPoints: 0, signalPoints: 0.5, maxPoints: 1, note: '호가' }],
          currentPrice: 71200,
          previousClose: 70000,
          dailyChange: 1200,
          dailyChangePct: 1.71,
          gates: validGateMap(['G1', 'G2', 'G3']),
          matchedRules: [{ code: 'S1' }]
        }]
      }
    }]
  };

  const count = context.applyJonggaResultToState(payload);
  const snapshot = context.getSlotSnapshot('slotA');
  assert.equal(count, 1);
  assert.equal(snapshot.regimeTable[0].value, '강세장');
  assert.equal(snapshot.gapScore.grade, 'G-B');
  const breakout = snapshot.breakoutEntries[0];
  assert.equal(breakout.entryKey, 'slotA:breakout:005930');
  assert.equal(breakout.source, 'jongga-json');
  assert.equal(breakout.dailyChangePct, 1.71);
  assert.equal(breakout.dailyChange, 1200);
  assert.equal(breakout.signalScore, 8.4);
  assert.equal(breakout.strictScore, 8.1);
  assert.equal(breakout.scoreMax, 12.5);
  assert.equal(breakout.score, 8.4);
  assert.equal(breakout.entryEligible, true);
  assert.equal(breakout.scoreBreakdown.length, 1);
  assert.deepEqual(snapshot.momentumEntries, snapshot.breakoutEntries);
});
