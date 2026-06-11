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
          marketCapRank: 1,
          marketCapUniverseCount: 2000,
          recommendedTakeProfitProfile: {
            profileKey: 'balanced',
            label: '중립형',
            selectionBasis: 'historical_profile_ev',
            reasonSummary: '리플레이 평균 수익률 기준 최적 프로필입니다.',
            sampleCount: 12,
            ev: 1.37
          },
          mixedExitPolicy: {
            version: 'mixed-exit-v1-balanced',
            policyKey: 'reversal-a7plus-balanced',
            label: '반등 × 7&A',
            active: true,
            priority: 2,
            stopPct: -2,
            stopExecution: 'close',
            stopCondition: '종가 -2% 이탈 시 전량 정리, 장중 -5% 이상 훼손 후 회복 실패 시 50% 축소',
            stopTiming: '장중 조건은 10:00/14:00 확인 후 부분 축소, 최종 손절은 종가 확인 후',
            takeProfitStages: [
              { targetPct: 2, quantityPct: 50 },
              { targetPct: 10, quantityPct: 50 }
            ],
            positionWeightHint: 'normal',
            positionWeightMultiplier: 0.5,
            intradayRiskRule: {
              active: true,
              triggerPct: -5,
              action: '50% 축소',
              timing: '10:00 또는 14:00 확인',
              recoveryRule: '진입가 대비 -3% 안쪽으로 회복하지 못하면 부분 축소',
              finalStopRule: '종가 기준 -2% 이탈 시 남은 물량 전량 정리'
            },
            volatilityOverlay: {
              active: true,
              mode: 'high-volatility',
              label: '고변동성 방어',
              reason: '시장 또는 종목 변동성이 커서 비중을 줄이고 1차 익절을 앞당깁니다.',
              positionWeightMultiplier: 0.5,
              triggerMetrics: { todayRangePct: 12.5, atrPct10: 11.2 },
              originalTakeProfitStages: [{ targetPct: 2, quantityPct: 50 }],
              adjustedTakeProfitStages: [{ targetPct: 2, quantityPct: 60 }]
            },
            reason: '반등 주력 후보'
          },
          pullbackTakeProfitProfiles: [{
            profileKey: 'conservative',
            label: '보수형',
            recommended: false,
            selectionBasis: 'market_stock_heuristic',
            reasonSummary: '가장 가까운 5일선 저항을 1차 목표로 반영합니다.',
            nearestResistanceType: 'ma5',
            nearestResistancePrice: 70500,
            secondaryResistanceType: 'ma10',
            secondaryResistancePrice: 71200,
            tradePlanRows: [{ stage: '🌅 프리마켓', stageKey: 'premarket', quantity: '35% 익절', targetYield: '+1.0%', targetPrice: '70,500원' }],
            recommendedStage: { stageKey: 'premarket', evBasis: 'heuristic', reason: '기본 추천(데이터 축적 중)', hitRate: null, ev: null, sampleCount: 0 }
          }],
          pullbackStopPolicy: {
            version: 'pullback-stop-v1',
            anchorSource: 'volume_surge_bullish_candle',
            anchorLookbackDays: 20,
            anchorDate: '20260605',
            anchorOpen: 68000,
            anchorClose: 70000,
            anchorHigh: 70500,
            anchorLow: 67800,
            anchorBodyMid: 69000,
            anchorVolumeRatio: 2.4,
            anchorStopMode: 'open',
            anchorStopPrice: 68000,
            ma10Price: 69000,
            ma10PrevPrice: 69100,
            ma20Price: 67000,
            ma20PrevPrice: 66900,
            ma10WarningPrice: null,
            hardStopPrice: 68000,
            fallbackStopPrice: 67200,
            effectiveStopPrice: 68000,
            warningRuleSummary: '10일선 경고 없음',
            hardStopRuleSummary: 'MAX(...)',
            reasonSummary: '앵커 봉 시가 기준'
          },
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
        }],
        accumulation: [{
          rank: 1,
          name: '현대차',
          code: '005380',
          strategy: 'accumulation',
          score: 7.2,
          grade: 'A',
          statusLabel: '매수추천',
          entryPrice: '201,000원',
          tradePlanRows: [
            { stage: '1차 익절', stageKey: 'premarket', quantity: '15% 익절', targetYield: '+2.5%', targetPrice: '206,000원' },
            { stage: '2차 익절', stageKey: 'openPhase', quantity: '20% 익절', targetYield: '+4.0%', targetPrice: '209,000원' },
            { stage: '손절', stageKey: 'stop', quantity: '전량', targetYield: '-3.0%', targetPrice: '195,000원' }
          ],
          recommendedTakeProfitProfile: {
            profileKey: 'balanced',
            label: '중립형',
            selectionBasis: 'market_stock_heuristic',
            reasonSummary: '극단 신호가 아니어서 중립형을 추천합니다.',
            sampleCount: 0,
            ev: null
          },
          accumulationTakeProfitProfiles: [{
            profileKey: 'balanced',
            label: '중립형',
            recommended: true,
            selectionBasis: 'market_stock_heuristic',
            reasonSummary: '상단 매물대 1 / 상단 매물대 2 저항을 앞단 익절 목표에 반영합니다.',
            nearestResistancePrice: 206000,
            secondaryResistancePrice: 209000,
            tradePlanRows: [
              { stage: '1차 익절', stageKey: 'premarket', quantity: '15% 익절', targetYield: '+2.5%', targetPrice: '206,000원' },
              { stage: '2차 익절', stageKey: 'openPhase', quantity: '20% 익절', targetYield: '+4.0%', targetPrice: '209,000원' },
              { stage: '손절', stageKey: 'stop', quantity: '전량', targetYield: '-3.0%', targetPrice: '195,000원' }
            ],
            recommendedStage: { stageKey: 'openPhase', evBasis: 'heuristic', reason: '기본 추천(데이터 축적 중)', hitRate: null, ev: null, sampleCount: 0 }
          }],
          accumulationStopPolicy: {
            version: 'accumulation-stop-v1-live',
            anchorSource: 'prior_sponsor_candle',
            sponsorMode: 'both',
            anchorDate: '20260605',
            anchorOpen: 195000,
            anchorClose: 200000,
            anchorVolumeRatio20d: 2.1,
            anchorStopPrice: 195000,
            fallbackStopPrice: 193000,
            effectiveHardStopPrice: 195000,
            openExitCheckCutoff: '10:00',
            openExitMode: 'flow_and_price_confirm',
            openExitRuleSummary: '장초반 수급+가격 동시 약세면 즉시 손절',
            hardStopRuleSummary: '매집 시작 봉 시가와 % 손절 중 높은 값 사용',
            marketShockHoldRuleSummary: '지수 급락인데 수급 유지면 보류',
            reasonSummary: '매집 시작 봉 시가를 하드 스톱으로 사용합니다.'
          },
          gates: validGateMap(['G0', 'G1', 'G2']),
          matchedRules: [{ code: 'S1' }]
        }]
      }
    }]
  };

  const count = context.applyJonggaResultToState(payload);
  const snapshot = context.getSlotSnapshot('slotA');
  assert.equal(count, 2);
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
  assert.equal(breakout.marketCapRank, 1);
  assert.equal(breakout.marketCapUniverseCount, 2000);
  assert.equal(breakout.recommendedTakeProfitProfile.profileKey, 'balanced');
  assert.equal(breakout.recommendedTakeProfitProfile.sampleCount, 12);
  assert.equal(breakout.mixedExitPolicy.policyKey, 'reversal-a7plus-balanced');
  assert.equal(breakout.mixedExitPolicy.stopPct, -2);
  assert.equal(breakout.mixedExitPolicy.stopCondition, '종가 -2% 이탈 시 전량 정리, 장중 -5% 이상 훼손 후 회복 실패 시 50% 축소');
  assert.equal(breakout.mixedExitPolicy.stopTiming, '장중 조건은 10:00/14:00 확인 후 부분 축소, 최종 손절은 종가 확인 후');
  assert.equal(breakout.mixedExitPolicy.intradayRiskRule.action, '50% 축소');
  assert.equal(breakout.mixedExitPolicy.volatilityOverlay.label, '고변동성 방어');
  assert.equal(breakout.mixedExitPolicy.takeProfitStages[1].targetPct, 10);
  assert.equal(breakout.pullbackTakeProfitProfiles.length, 1);
  assert.equal(breakout.pullbackTakeProfitProfiles[0].nearestResistanceType, 'ma5');
  assert.equal(breakout.pullbackTakeProfitProfiles[0].tradePlanRows[0].targetPrice, '70,500원');
  assert.equal(breakout.pullbackTakeProfitProfiles[0].tradePlanRows[0].stageKey, 'premarket');
  assert.equal(breakout.pullbackStopPolicy.version, 'pullback-stop-v1');
  assert.equal(breakout.pullbackStopPolicy.effectiveStopPrice, 68000);
  const accumulation = snapshot.accumulationEntries[0];
  assert.equal(accumulation.accumulationTakeProfitProfiles.length, 1);
  assert.equal(accumulation.accumulationTakeProfitProfiles[0].tradePlanRows[0].stageKey, 'premarket');
  assert.equal(accumulation.accumulationTakeProfitProfiles[0].nearestResistancePrice, 206000);
  assert.equal(accumulation.accumulationStopPolicy.sponsorMode, 'both');
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

test('accumulationStopPolicy를 정규화해 accumulation entry에 연결한다', () => {
  const context = loadJonggaContext();
  const payload = {
    schemaVersion: 'jongga_result.v1',
    slots: [{
      slotId: 'slotA',
      entries: {
        accumulation: [{
          rank: 1,
          name: '테스트',
          code: '035420',
          score: 7.8,
          grade: 'A',
          statusLabel: '매수추천',
          gates: validGateMap(['G0', 'G1', 'G2', 'G3', 'G4']),
          tradePlanRows: [{ stage: '🛑 손절', quantity: '전량', targetYield: '-3.0%', targetPrice: '9,700원' }],
          accumulationStopPolicy: {
            version: 'accumulation-stop-v1-live',
            anchorSource: 'prior_sponsor_candle',
            sponsorMode: 'both',
            anchorDate: '20260605',
            anchorOpen: 9700,
            anchorClose: 9850,
            anchorVolumeRatio20d: 2.18,
            anchorStopPrice: 9700,
            fallbackStopPrice: 9650,
            effectiveHardStopPrice: 9700,
            openExitCheckCutoff: '10:00',
            openExitMode: 'flow_and_price_confirm',
            openExitRuleSummary: '장초반 수급+가격 동시 확인',
            hardStopRuleSummary: '매집 시작 봉 시가 손절',
            marketShockHoldRuleSummary: '지수 급락 시 보류',
            reasonSummary: '전일 매집봉 시가를 하드 스톱으로 사용합니다.'
          }
        }]
      }
    }]
  };

  context.applyJonggaResultToState(payload);
  const entry = context.getSlotSnapshot('slotA').accumulationEntries[0];
  assert.equal(entry.accumulationStopPolicy.version, 'accumulation-stop-v1-live');
  assert.equal(entry.accumulationStopPolicy.sponsorMode, 'both');
  assert.equal(entry.accumulationStopPolicy.effectiveHardStopPrice, 9700);
  assert.equal(entry.accumulationStopPolicy.reasonSummary, '전일 매집봉 시가를 하드 스톱으로 사용합니다.');
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

test('fresh G-E 완화 상태 라벨은 safety block 없이 유지된다', () => {
  const context = loadJonggaContext();
  const payload = {
    schemaVersion: 'jongga_result.v1',
    dataQuality: { status: 'complete', staleKeys: [] },
    slots: [{
      slotId: 'slotA',
      gapScore: { code: 'G-E', isFresh: true },
      entries: {
        pullback: [{
          rank: 1,
          name: '완화종목',
          code: '005930',
          score: 8.4,
          grade: 'A',
          statusLabel: '진입 가능(거시경고·축소)',
          gates: validGateMap(['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G9'])
        }]
      }
    }]
  };

  const validation = context.validateJonggaResult(payload);
  assert.equal(validation.ok, true);
  assert.equal(validation.safetyBlocks.length, 0);

  const entry = context.attachEntryEligibility({
    strategy: 'pullback',
    grade: 'A',
    statusLabel: '진입 가능(거시경고·축소)',
    gates: [{ code: 'G1', status: '✅' }]
  });
  assert.equal(entry.entryEligible, true);
});

test('G-E breakout과 stale macro는 계속 safety block으로 남는다', () => {
  const context = loadJonggaContext();
  const breakoutPayload = {
    schemaVersion: 'jongga_result.v1',
    dataQuality: { status: 'complete', staleKeys: [] },
    slots: [{
      slotId: 'slotA',
      gapScore: { code: 'G-E', isFresh: true },
      entries: {
        breakout: [{
          rank: 1,
          name: '돌파종목',
          code: '000660',
          score: 8.5,
          grade: 'A',
          statusLabel: '매수추천',
          gates: validGateMap(['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'])
        }]
      }
    }]
  };
  const stalePayload = {
    schemaVersion: 'jongga_result.v1',
    dataQuality: { status: 'partial', staleKeys: ['macro_nq'] },
    slots: [{
      slotId: 'slotA',
      gapScore: { code: 'G-E', isFresh: false },
      entries: {
        reversal: [{
          rank: 1,
          name: '급락반등',
          code: '035420',
          score: 8.8,
          grade: 'S',
          statusLabel: '최우선 진입(거시경고·축소)',
          filters: {
            F1: { status: 'passed' },
            F2: { status: 'passed' },
            F3: { status: 'passed' },
            F4: { status: 'passed' }
          },
          gates: validGateMap(['G1', 'G2', 'G3', 'G4', 'G5'])
        }]
      }
    }]
  };

  const breakoutValidation = context.validateJonggaResult(breakoutPayload);
  const staleValidation = context.validateJonggaResult(stalePayload);

  assert.equal(breakoutValidation.ok, true);
  assert.ok(breakoutValidation.safetyBlocks.some(item => item.includes('갭다운 경고')));
  assert.equal(staleValidation.ok, true);
  assert.ok(staleValidation.safetyBlocks.some(item => item.includes('freshness 미확인')));
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

test('breakout profile/live exit payload is normalized', () => {
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
          score: 8.1,
          grade: 'A',
          statusLabel: '매수추천',
          entryPrice: '70,000원',
          tradePlanRows: [
            { stage: '1차 익절', stageKey: 'premarket', quantity: '35% 익절', targetYield: '+1.0%', targetPrice: '70,500원' },
            { stage: '2차 익절', stageKey: 'openPhase', quantity: '35% 익절', targetYield: '+2.0%', targetPrice: '71,200원' },
            { stage: '손절', stageKey: 'stop', quantity: '전량', targetYield: '-2.9%', targetPrice: '68,000원' }
          ],
          recommendedTakeProfitProfile: {
            profileKey: 'balanced',
            label: '중립형',
            selectionBasis: 'historical_profile_ev',
            reasonSummary: '리플레이 기준 추천',
            sampleCount: 12,
            ev: 1.42
          },
          breakoutTakeProfitProfiles: [{
            profileKey: 'balanced',
            label: '중립형',
            recommended: true,
            selectionBasis: 'historical_profile_ev',
            reasonSummary: '리플레이 기준 추천',
            nearestResistancePrice: 70500,
            secondaryResistancePrice: 71200,
            trailingActivationPct: 6.0,
            trailingBufferPct: 2.5,
            tradePlanRows: [
              { stage: '1차 익절', stageKey: 'premarket', quantity: '35% 익절', targetYield: '+1.0%', targetPrice: '70,500원' },
              { stage: '2차 익절', stageKey: 'openPhase', quantity: '35% 익절', targetYield: '+2.0%', targetPrice: '71,200원' },
              { stage: '손절', stageKey: 'stop', quantity: '전량', targetYield: '-2.9%', targetPrice: '68,000원' }
            ],
            recommendedStage: { stageKey: 'openPhase', evBasis: 'heuristic', reason: '기본 추천', hitRate: null, ev: null, sampleCount: 0 }
          }],
          breakoutStopPolicy: {
            version: 'breakout-stop-v1-live',
            referenceSource: 'prior_resistance_band',
            referenceLookbackDays: 60,
            referenceClusterPct: 1.0,
            referencePrice: 68000,
            referenceBandLow: 67600,
            referenceBandHigh: 68000,
            entryDayOpenPrice: 70200,
            fallbackStopPrice: 67200,
            effectiveHardStopPrice: 68000,
            openExitCheckCutoff: '10:00',
            microTrendBarUnit: '3m',
            microTrendShortMa: 8,
            microTrendLongMa: 10,
            hardStopRuleSummary: 'MAX(...)',
            openExitRuleSummary: '장초반 기준선 이탈',
            microTrendRuleSummary: '3분 EMA 이탈',
            reasonSummary: '직전 저항 밴드 사용'
          },
          breakoutLiveExitPolicy: {
            version: 'breakout-live-exit-v1',
            wickClimaxLookbackBars: 20,
            wickClimaxVolumeRatioMin: 2.5,
            wickUpperShadowRatioMin: 0.45,
            orderbookLookbackMinutes: 5,
            orderbookBidAskSpikeMin: 2.0,
            orderbookAskDropRatioMax: 0.6,
            trailingActivationPct: 6.0,
            trailingBufferPct: 2.5,
            activeSessionCutoff: '10:30',
            wickClimaxRuleSummary: '위꼬리 익절',
            orderbookRuleSummary: '호가 분산 익절',
            trailingRuleSummary: '트레일링'
          },
          toss: { avgStrength: 114.0, last30AvgStrength: 155.0 },
          orderbook: { bidAskRatio: 1.5, bidTotal: 120000, askTotal: 80000 },
          gates: validGateMap(['G1', 'G2', 'G3'])
        }]
      }
    }]
  };

  context.applyJonggaResultToState(payload);
  const breakout = context.getSlotSnapshot('slotA').breakoutEntries[0];
  assert.equal(breakout.breakoutTakeProfitProfiles.length, 1);
  assert.equal(breakout.breakoutTakeProfitProfiles[0].trailingActivationPct, 6);
  assert.equal(breakout.breakoutStopPolicy.effectiveHardStopPrice, 68000);
  assert.equal(breakout.breakoutLiveExitPolicy.trailingBufferPct, 2.5);
  assert.equal(breakout.toss.last30AvgStrength, 155);
  assert.equal(breakout.orderbook.bidAskRatio, 1.5);
});

test('reversal profile/stop/live exit payload is normalized', () => {
  const context = loadJonggaContext();
  const payload = {
    schemaVersion: 'jongga_result.v1',
    slots: [{
      slotId: 'slotA',
      entries: {
        reversal: [{
          rank: 1,
          name: '테스트',
          code: '091990',
          score: 7.6,
          grade: 'A',
          statusLabel: '매수추천',
          entryPrice: '10,000원',
          tradePlanRows: [
            { stage: '1차 익절', stageKey: 'premarket', quantity: '50% 익절', targetYield: '+3.0%', targetPrice: '10,300원' },
            { stage: '2차 익절', stageKey: 'openPhase', quantity: '50% 익절 (잔량 전량)', targetYield: '+5.5%', targetPrice: '10,550원' },
            { stage: '손절', stageKey: 'stop', quantity: '전량', targetYield: '-1.0%', targetPrice: '9,900원' }
          ],
          recommendedTakeProfitProfile: {
            profileKey: 'balanced',
            label: '중립형',
            selectionBasis: 'market_stock_heuristic',
            reasonSummary: '33%·50% 되돌림 중심',
            sampleCount: 0,
            ev: null
          },
          reversalTakeProfitProfiles: [{
            profileKey: 'balanced',
            label: '중립형',
            recommended: true,
            selectionBasis: 'market_stock_heuristic',
            reasonSummary: '33%·50% 되돌림 중심',
            recentHighPrice: 11100,
            retrace33Price: 10300,
            retrace50Price: 10550,
            nearestResistancePrice: 10300,
            secondaryResistancePrice: 10800,
            tradePlanRows: [
              { stage: '1차 익절', stageKey: 'premarket', quantity: '50% 익절', targetYield: '+3.0%', targetPrice: '10,300원' },
              { stage: '2차 익절', stageKey: 'openPhase', quantity: '50% 익절 (잔량 전량)', targetYield: '+5.5%', targetPrice: '10,550원' },
              { stage: '손절', stageKey: 'stop', quantity: '전량', targetYield: '-1.0%', targetPrice: '9,900원' }
            ],
            recommendedStage: { stageKey: 'openPhase', evBasis: 'heuristic', reason: '2차 목표', hitRate: null, ev: null, sampleCount: 0 }
          }],
          reversalStopPolicy: {
            version: 'reversal-stop-v1',
            anchorSource: 'entry_day_low',
            anchorLowPrice: 9900,
            fallbackStopPrice: 9800,
            effectiveHardStopPrice: 9900,
            stopExecutionMode: 'intraday_touch',
            hardStopRuleSummary: '당일 저가 기준',
            reasonSummary: '당일 저가 손절'
          },
          reversalLiveExitPolicy: {
            version: 'reversal-live-exit-v1',
            timeStopCutoff: '09:15',
            timeStopMinBouncePct: 1.0,
            breakevenActivationPct: 3.0,
            earlySpikeWindowEnd: '09:10',
            timeStopRuleSummary: '09:15 규칙',
            breakevenRuleSummary: '본전보호'
          },
          gates: validGateMap(['G1', 'G2', 'G3'])
        }]
      }
    }]
  };

  context.applyJonggaResultToState(payload);
  const reversal = context.getSlotSnapshot('slotA').reversalEntries[0];
  assert.equal(reversal.reversalTakeProfitProfiles.length, 1);
  assert.equal(reversal.reversalTakeProfitProfiles[0].recentHighPrice, 11100);
  assert.equal(reversal.reversalTakeProfitProfiles[0].retrace50Price, 10550);
  assert.equal(reversal.reversalStopPolicy.stopExecutionMode, 'intraday_touch');
  assert.equal(reversal.reversalLiveExitPolicy.timeStopCutoff, '09:15');
});
