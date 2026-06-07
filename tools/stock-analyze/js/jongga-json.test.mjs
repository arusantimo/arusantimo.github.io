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
    escapeHtml(value) {
      return String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
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
          marketCapTrillion: 400.1,
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
  assert.equal(breakout.marketCapTrillion, 400.1);
  assert.deepEqual(snapshot.momentumEntries, snapshot.breakoutEntries);
});

test('pullbackContext 확장 필드를 정규화한다', () => {
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
          score: 7.4,
          grade: 'A',
          statusLabel: '매수추천',
          gates: validGateMap(['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G9']),
          pullbackContext: {
            support: {
              summary: '주지지 99,000원 · 강도 80점',
              primaryLine: {
                label: '복합 지지',
                price: 99000,
                distancePct: 1.2,
                families: ['horizontal', 'eventAnchors'],
                familyLabels: ['수평 지지', '급증봉 저점'],
                familyCount: 2,
                count: 4,
                lastSeenDaysAgo: 3,
                strengthPoints: 80,
                role: 'primary'
              },
              lines: [{
                label: '복합 지지',
                price: 99000,
                distancePct: 1.2,
                families: ['horizontal', 'eventAnchors'],
                familyLabels: ['수평 지지', '급증봉 저점'],
                familyCount: 2,
                count: 4,
                lastSeenDaysAgo: 3,
                strengthPoints: 80,
                role: 'primary'
              }],
              strengthScore: 80,
              strengthLabel: 'strong',
              warningLevel: 'clear',
              warningReason: '복합 지지 strong',
              activeFamilyCount: 2
            },
            families: {
              horizontal: [{ family: 'horizontal', familyLabel: '수평 지지', label: '수평 지지', price: 99000, count: 3, lastSeenDaysAgo: 5, valid: true }],
              swingCluster: [],
              volumeShelf: [],
              eventAnchors: [{ family: 'eventAnchors', familyLabel: '급증봉 저점', label: '급증봉 저점', price: 99200, count: 1, lastSeenDaysAgo: 3, valid: true }]
            },
            volumeBurst: {
              summary: '200%+ 급증 1회',
              burstCount: 1,
              maxRatioPct: 240,
              latestBurstDaysAgo: 3
            }
          }
        }]
      }
    }]
  };

  context.applyJonggaResultToState(payload);
  const entry = context.getSlotSnapshot('slotA').pullbackEntries[0];
  assert.equal(entry.pullbackContext.support.primaryLine.price, 99000);
  assert.equal(entry.pullbackContext.support.strengthScore, 80);
  assert.equal(entry.pullbackContext.support.warningLevel, 'clear');
  assert.equal(entry.pullbackContext.families.horizontal[0].price, 99000);
  assert.equal(entry.pullbackContext.volumeBurst.burstCount, 1);
});

test('volatilityContext 확장 필드를 정규화하고 구버전 payload는 null로 폴백한다', () => {
  const context = loadJonggaContext();
  const payload = {
    schemaVersion: 'jongga_result.v1',
    slots: [{
      slotId: 'slotA',
      entries: {
        breakout: [{
          rank: 1,
          name: '테스트',
          code: '005930',
          score: 7.8,
          strictScore: 7.6,
          signalScore: 7.8,
          grade: 'A',
          statusLabel: '매수추천',
          gates: validGateMap(['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7']),
          volatilityContext: {
            marketState: 'volatile',
            stockState: 'neutral',
            blendedState: 'volatile',
            strategyFit: 'unfavorable',
            scoreDelta: -1.0,
            summary: '불리 (고변동성 장세라 실패 돌파 위험 확대)',
            reason: '시장 고변동성 / 종목 중립 변동성',
            metrics: {
              atrPct10: 3.8,
              returnStd20: 2.4,
              todayRangePct: 4.6,
              vkospi: 26.4
            }
          }
        }, {
          rank: 2,
          name: '구버전',
          code: '000660',
          score: 6.4,
          grade: 'B',
          statusLabel: '관심후보',
          gates: validGateMap(['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'])
        }]
      }
    }]
  };

  context.applyJonggaResultToState(payload);
  const [first, second] = context.getSlotSnapshot('slotA').breakoutEntries;
  assert.equal(first.volatilityContext.marketState, 'volatile');
  assert.equal(first.volatilityContext.scoreDelta, -1);
  assert.equal(first.volatilityContext.metrics.vkospi, 26.4);
  assert.equal(second.volatilityContext, null);
});

test('statusReason 필드를 갭다운 경고와 Gate 차단 근거로 정규화한다', () => {
  const context = loadJonggaContext();
  const payload = {
    schemaVersion: 'jongga_result.v1',
    slots: [{
      slotId: 'slotA',
      gapScore: {
        code: 'G-E',
        totalScore: '-11.5점',
        rows: [
          { indicator: 'NQ 선물 변화율', actualValue: '-5.04%', weightedScore: '-5.0점' },
          { indicator: '원달러 환율 변화', actualValue: '+52.00원', weightedScore: '-3.0점' },
          { indicator: 'SOX 전일 변화율', actualValue: '-4.74%', weightedScore: '-2.0점' }
        ]
      },
      entries: {
        pullback: [
          {
            rank: 1,
            name: '갭다운종목',
            code: '005930',
            score: 6.8,
            grade: 'B',
            statusLabel: '매매금지(갭다운 경고)',
            gates: validGateMap(['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G9'])
          },
          {
            rank: 2,
            name: '게이트차단종목',
            code: '000660',
            score: 6.8,
            grade: 'B',
            statusLabel: '매매금지(핵심 Gate 미충족)',
            gates: {
              G0: { status: 'blocked', note: '최근 20일 최대 거래량 급증 166% (필요 ≥ 200%)' },
              G1: { status: 'passed' },
              G2: { status: 'passed' },
              G3: { status: 'passed' },
              G4: { status: 'passed' },
              G5: { status: 'warning' },
              G9: { status: 'passed' }
            }
          }
        ]
      }
    }]
  };

  context.applyJonggaResultToState(payload);
  const [gapEntry, gateEntry] = context.getSlotSnapshot('slotA').pullbackEntries;
  assert.match(gapEntry.statusReason, /갭 스코어 G-E/);
  assert.match(gapEntry.statusReasonShort, /원달러 \+52\.00원/);
  assert.match(gateEntry.statusReason, /G0 미충족/);
  assert.match(gateEntry.statusReasonShort, /최근 20일 최대 거래량 급증 166%/);
});

test('score breakdown table renders volatility synthetic row V1 그대로 노출한다', () => {
  const context = loadJonggaContext();
  const html = context.renderBuyScoreBreakdownTable({
    scoreBreakdown: [
      { code: 'S1', signalPoints: 2, strictPoints: 2, maxPoints: 2, note: '수급' },
      { code: 'V1', signalPoints: -1, strictPoints: -1, maxPoints: 1, note: '불리 (고변동성 장세라 실패 돌파 위험 확대)' }
    ]
  });

  assert.match(html, /V1/);
  assert.match(html, /-1/);
  assert.match(html, /실패 돌파 위험 확대/);
});
