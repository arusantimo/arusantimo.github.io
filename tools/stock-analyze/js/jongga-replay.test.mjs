import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function createElementStub() {
  return {
    textContent: '',
    className: '',
    title: '',
    innerHTML: '',
    disabled: false,
    dataset: {},
    classList: {
      values: new Set(),
      add(value) { this.values.add(value); },
      remove(value) { this.values.delete(value); },
      toggle(value, force) {
        if (force === undefined) {
          if (this.values.has(value)) this.values.delete(value);
          else this.values.add(value);
          return;
        }
        if (force) this.values.add(value);
        else this.values.delete(value);
      },
      contains(value) { return this.values.has(value); }
    },
    addEventListener() {}
  };
}

function loadReplayContext() {
  const elements = new Map();
  let activeMode = 'recommendation';
  const context = {
    console,
    JSON,
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
      body: createElementStub(),
      getElementById(id) { return elements.get(id) || null; },
      querySelector() { return null; },
      querySelectorAll() { return []; }
    },
    escapeHtml(value) {
      return String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    getJonggaVariantLabel(value) {
      return value === 'canary' ? '카나리' : '현재 버전';
    },
    getJonggaReplayViewMode() {
      return activeMode;
    },
    getJonggaReplayViewMeta(mode = activeMode) {
      if (mode === 'a8plus') {
        return { label: '8 & A+', description: 'gradeScore 8.0 이상, A 또는 S 등급 항목의 거래를 표시합니다.' };
      }
      if (mode === 'replay') {
        return { label: '6.0 & B', description: 'entryEligible가 아닌 gradeScore 6.0 이상, B 이상만 표시합니다.' };
      }
      if (mode === 'a7plus') {
        return { label: '7 & A', description: 'gradeScore 7.0 이상, A 등급만 표시합니다.' };
      }
      return { label: '매수추천', description: 'entryEligible 기준으로 표시합니다.' };
    },
    normalizeJonggaReplayViewMode(value) {
      const normalized = String(value || '').trim();
      if (normalized === 'a8plus') return 'a8plus';
      if (normalized === 'replay') return 'replay';
      if (normalized === 'a7plus') return 'a7plus';
      return 'recommendation';
    },
    setReplayMode(mode) {
      activeMode = mode;
    },
    formatCompactDate(value) {
      const text = String(value ?? '');
      return `${text.slice(0, 4)}.${text.slice(4, 6)}.${text.slice(6, 8)}`;
    },
    syncBodyScrollLock() {},
    elements
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('./gap.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./utils.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./entry-policy.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./state.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./jongga-replay.js', import.meta.url), 'utf8'), context);
  return context;
}

function sampleReplayBridge() {
  return {
    generatedAt: '2026-06-05T19:30:00',
    latestAttempt: {
      status: 'complete',
      message: '',
      generatedAt: '2026-06-05T19:30:00'
    },
    latestRun: {
      runId: 'run-1',
      generatedAt: '2026-06-05T19:30:00',
      from: '2026-05-08',
      to: '2026-06-04',
      variant: 'stable',
      thresholdProfile: 'current',
      replayPolicy: {
        mode: 'relaxed',
        label: '완화 모드',
        summary: 'D+1만 있어도 replay 포함',
        detail: 'D+2가 있으면 3일차까지 연장',
        minFollowupDays: 1,
        maxFollowupDays: 2
      },
      days: [
        {
          date: '2026-06-03',
          summaryFile: 'replay_summary_20260603.json',
          ordersFile: 'sim_orders_20260603.json',
          fillsFile: 'sim_fills_20260603.json',
          candidateCount: 3,
          eligibleCount: 1,
          includedCount: 2,
          tradeCount: 1,
          degradedCount: 1,
          ambiguousCount: 0,
          byStrategy: {
            pullback: {
              candidateCount: 3,
              eligibleCount: 1,
              includedCount: 2,
              tradeCount: 1,
              winRate: 1,
              avgNetReturnPct: 1.2,
              cumNetReturnPct: 1.2,
              maxDrawdownPct: 0.4,
              degradedCount: 1,
              ambiguousCount: 0,
              unfilledRate: 0
            }
          },
          trades: [
            {
              strategy: 'pullback',
              code: '000001',
              name: 'Alpha',
              date: '2026-06-03',
              sourceEntryKey: 'entry-1',
              entryFilledAt: '2026-06-03T15:30:00+09:00',
              entryFillPrice: 10050.2,
              exitFilledAt: '2026-06-04T09:00:00+09:00',
              exitAvgFillPrice: 10200.6,
              exitLastFillPrice: 10200.6,
              tradeStatus: 'closed',
              closedReason: 'primary_target_touch',
              netReturnPct: 1.2
            }
          ],
          candidates: [
            {
              strategy: 'pullback',
              name: 'Alpha',
              code: '000001',
              replayIncluded: true,
              entryEligible: true,
              historyRecommendation: true,
              replayGrade: 'A',
              gradeScore: 8.2
            }
          ],
          results: [
            {
              strategy: 'pullback',
              code: '000001',
              name: 'Alpha',
              replayGrade: 'A',
              gradeScore: 8.2,
              date: '2026-06-03',
              sourceEntryKey: 'entry-1',
              entryEligibleOriginal: true,
              replayIncluded: true,
              historyRecommendation: true,
              entryFilledAt: '2026-06-03T15:30:00+09:00',
              entryFillPrice: 10050.2,
              exitFilledAt: '2026-06-04T09:00:00+09:00',
              exitAvgFillPrice: 10200.6,
              exitLastFillPrice: 10200.6,
              tradeStatus: 'closed',
              closedReason: 'primary_target_touch',
              netReturnPct: 1.2,
              dataQualityStatus: 'degraded',
              ambiguousCount: 0
            }
          ],
          orders: [
            {
              strategy: 'pullback',
              side: 'SELL',
              sourceEntryKey: 'entry-1',
              finalStatus: 'filled'
            }
          ],
          fills: [
            {
              orderId: 'entry-1-entry',
              sourceEntryKey: 'entry-1',
              strategy: 'pullback',
              code: '000001',
              name: 'Alpha',
              side: 'BUY',
              stageKey: 'entry',
              fillRule: 'close_slippage',
              filledAt: '2026-06-03T15:30:00+09:00',
              fillPrice: 10050.2,
              filledQuantityPct: 100
            },
            {
              orderId: 'entry-1-openPhase',
              sourceEntryKey: 'entry-1',
              strategy: 'pullback',
              code: '000001',
              name: 'Alpha',
              side: 'SELL',
              stageKey: 'openPhase',
              fillRule: 'openPhase_touch',
              filledAt: '2026-06-04T09:00:00+09:00',
              fillPrice: 10200.6,
              filledQuantityPct: 100
            }
          ]
        }
      ],
      summary: {
        candidateCount: 12,
        eligibleCount: 3,
        includedCount: 7,
        tradeCount: 3,
        winRate: 0.6667,
        avgNetReturnPct: 1.25,
        cumNetReturnPct: 3.52,
        maxDrawdownPct: 2.1,
        degradedCount: 3,
        ambiguousCount: 0,
        overall: {
          candidateCount: 12,
          eligibleCount: 3,
          includedCount: 7,
          tradeCount: 3,
          winRate: 0.6667,
          avgNetReturnPct: 1.25,
          cumNetReturnPct: 3.52,
          maxDrawdownPct: 2.1,
          degradedCount: 3,
          ambiguousCount: 0
        },
        byStrategy: {
          pullback: {
            candidateCount: 5,
            eligibleCount: 2,
            includedCount: 3,
            tradeCount: 2,
            winRate: 0.5,
            avgNetReturnPct: 0.85,
            cumNetReturnPct: 1.71,
            maxDrawdownPct: 1.2,
            degradedCount: 2,
            ambiguousCount: 0,
            unfilledRate: 0
          }
        },
        byStock: [
          {
            strategy: 'pullback',
            code: '000001',
            name: 'Alpha',
            tradeCount: 2,
            winRate: 0.5,
            avgNetReturnPct: 0.85,
            cumNetReturnPct: 1.71,
            lastReplayDate: '2026-06-03',
            lastEntryFilledAt: '2026-06-03T15:30:00+09:00',
            lastEntryFillPrice: 10050.2,
            lastExitFilledAt: '2026-06-04T09:00:00+09:00',
            lastExitAvgFillPrice: 10200.6,
            lastExitFillPrice: 10200.6
          }
        ]
      },
      strategyViews: {
        pullback: {
          summary: {
            candidateCount: 5,
            eligibleCount: 2,
            includedCount: 3,
            tradeCount: 2,
            winRate: 0.5,
            avgNetReturnPct: 0.85,
            cumNetReturnPct: 1.71,
            maxDrawdownPct: 1.2,
            degradedCount: 2,
            ambiguousCount: 0,
            unfilledRate: 0
          },
          stocks: [
            {
              strategy: 'pullback',
              code: '000001',
              name: 'Alpha',
              replayGrade: 'A',
              gradeScore: 8.2,
              tradeCount: 2,
              winRate: 0.5,
              avgNetReturnPct: 0.85,
              cumNetReturnPct: 1.71,
              lastReplayDate: '2026-06-03',
              lastEntryFilledAt: '2026-06-03T15:30:00+09:00',
              lastEntryFillPrice: 10050.2,
              lastExitFilledAt: '2026-06-04T09:00:00+09:00',
              lastExitAvgFillPrice: 10200.6,
              lastExitFillPrice: 10200.6
            }
          ],
          days: [
            {
              date: '2026-06-03',
              summaryFile: 'replay_summary_20260603.json',
              ordersFile: 'sim_orders_20260603.json',
              fillsFile: 'sim_fills_20260603.json',
              includedCount: 2,
              tradeCount: 1,
              winRate: 1,
              avgNetReturnPct: 1.2,
              cumNetReturnPct: 1.2,
              maxDrawdownPct: 0.4,
              degradedCount: 1,
              ambiguousCount: 0,
              trades: [
                {
                  strategy: 'pullback',
                  code: '000001',
                  name: 'Alpha',
                  entryFilledAt: '2026-06-03T15:30:00+09:00',
                  entryFillPrice: 10050.2,
                  exitFilledAt: '2026-06-04T09:00:00+09:00',
                  exitAvgFillPrice: 10200.6,
                  exitLastFillPrice: 10200.6,
                  tradeStatus: 'closed',
                  netReturnPct: 1.2
                }
              ]
            }
          ],
          caseViews: {
            recommendation: {
              summary: {
                candidateCount: 2,
                eligibleCount: 2,
                includedCount: 2,
                tradeCount: 1,
                winRate: 1,
                avgNetReturnPct: 1.2,
                cumNetReturnPct: 1.2,
                maxDrawdownPct: 0.4,
                degradedCount: 1,
                ambiguousCount: 0,
                unfilledRate: 0
              },
              stocks: [
                {
              strategy: 'pullback',
              code: '000001',
              name: 'Alpha',
              replayGrade: 'A',
              gradeScore: 8.2,
              tradeCount: 1,
              winRate: 1,
              avgNetReturnPct: 1.2,
              cumNetReturnPct: 1.2,
                  lastReplayDate: '2026-06-03',
                  lastEntryFilledAt: '2026-06-03T15:30:00+09:00',
                  lastEntryFillPrice: 10050.2,
                  lastExitFilledAt: '2026-06-04T09:00:00+09:00',
                  lastExitAvgFillPrice: 10200.6,
                  lastExitFillPrice: 10200.6
                }
              ],
              days: [
                {
                  date: '2026-06-03',
                  summaryFile: 'replay_summary_20260603.json',
                  ordersFile: 'sim_orders_20260603.json',
                  fillsFile: 'sim_fills_20260603.json',
                  includedCount: 2,
                  tradeCount: 1,
                  winRate: 1,
                  avgNetReturnPct: 1.2,
                  cumNetReturnPct: 1.2,
                  maxDrawdownPct: 0.4,
                  degradedCount: 1,
                  ambiguousCount: 0,
                  trades: [
                    {
              strategy: 'pullback',
              code: '000001',
              name: 'Alpha',
              replayGrade: 'A',
              gradeScore: 8.2,
              entryFilledAt: '2026-06-03T15:30:00+09:00',
              entryFillPrice: 10050.2,
              exitFilledAt: '2026-06-04T09:00:00+09:00',
              exitAvgFillPrice: 10200.6,
                      exitLastFillPrice: 10200.6,
                      tradeStatus: 'closed',
                      closedReason: 'primary_target_touch',
                      netReturnPct: 1.2
                    }
                  ]
                }
              ]
            },
            a8plus: {
              summary: {
                candidateCount: 1,
                eligibleCount: 1,
                includedCount: 1,
                tradeCount: 1,
                winRate: 1,
                avgNetReturnPct: 1.2,
                cumNetReturnPct: 1.2,
                maxDrawdownPct: 0.4,
                degradedCount: 1,
                ambiguousCount: 0,
                unfilledRate: 0
              },
              stocks: [
                {
                  strategy: 'pullback',
                  code: '000001',
                  name: 'Alpha',
                  tradeCount: 1,
                  winRate: 1,
                  avgNetReturnPct: 1.2,
                  cumNetReturnPct: 1.2,
                  lastReplayDate: '2026-06-03',
                  lastEntryFilledAt: '2026-06-03T15:30:00+09:00',
                  lastEntryFillPrice: 10050.2,
                  lastExitFilledAt: '2026-06-04T09:00:00+09:00',
                  lastExitAvgFillPrice: 10200.6,
                  lastExitFillPrice: 10200.6
                }
              ],
              days: [
                {
                  date: '2026-06-03',
                  summaryFile: 'replay_summary_20260603.json',
                  ordersFile: 'sim_orders_20260603.json',
                  fillsFile: 'sim_fills_20260603.json',
                  includedCount: 1,
                  tradeCount: 1,
                  winRate: 1,
                  avgNetReturnPct: 1.2,
                  cumNetReturnPct: 1.2,
                  maxDrawdownPct: 0.4,
                  degradedCount: 1,
                  ambiguousCount: 0,
                  trades: [
                    {
              strategy: 'pullback',
              code: '000001',
              name: 'Alpha',
              replayGrade: 'A',
              entryFilledAt: '2026-06-03T15:30:00+09:00',
                      entryFillPrice: 10050.2,
                      exitFilledAt: '2026-06-04T09:00:00+09:00',
                      exitAvgFillPrice: 10200.6,
                      exitLastFillPrice: 10200.6,
                      tradeStatus: 'closed',
                      closedReason: 'primary_target_touch',
                      netReturnPct: 1.2
                    }
                  ]
                }
              ]
            },
            a7plus: {
              summary: {
                candidateCount: 1,
                eligibleCount: 1,
                includedCount: 1,
                tradeCount: 1,
                winRate: 1,
                avgNetReturnPct: 1.2,
                cumNetReturnPct: 1.2,
                maxDrawdownPct: 0.4,
                degradedCount: 1,
                ambiguousCount: 0,
                unfilledRate: 0
              },
              stocks: [
                {
                  strategy: 'pullback',
                  code: '000001',
                  name: 'Alpha',
                  tradeCount: 1,
                  winRate: 1,
                  avgNetReturnPct: 1.2,
                  cumNetReturnPct: 1.2,
                  lastReplayDate: '2026-06-03',
                  lastEntryFilledAt: '2026-06-03T15:30:00+09:00',
                  lastEntryFillPrice: 10050.2,
                  lastExitFilledAt: '2026-06-04T09:00:00+09:00',
                  lastExitAvgFillPrice: 10200.6,
                  lastExitFillPrice: 10200.6
                }
              ],
              days: [
                {
                  date: '2026-06-03',
                  summaryFile: 'replay_summary_20260603.json',
                  ordersFile: 'sim_orders_20260603.json',
                  fillsFile: 'sim_fills_20260603.json',
                  includedCount: 1,
                  tradeCount: 1,
                  winRate: 1,
                  avgNetReturnPct: 1.2,
                  cumNetReturnPct: 1.2,
                  maxDrawdownPct: 0.4,
                  degradedCount: 1,
                  ambiguousCount: 0,
                  trades: [
                    {
                      strategy: 'pullback',
                      code: '000001',
                      name: 'Alpha',
                      entryFilledAt: '2026-06-03T15:30:00+09:00',
                      entryFillPrice: 10050.2,
                      exitFilledAt: '2026-06-04T09:00:00+09:00',
                      exitAvgFillPrice: 10200.6,
                      exitLastFillPrice: 10200.6,
                      tradeStatus: 'closed',
                      closedReason: 'primary_target_touch',
                      netReturnPct: 1.2
                    }
                  ]
                }
              ]
            },
            replay: {
              summary: {
                candidateCount: 3,
                eligibleCount: 0,
                includedCount: 1,
                tradeCount: 1,
                winRate: 0,
                avgNetReturnPct: -0.6,
                cumNetReturnPct: -0.6,
                maxDrawdownPct: 0.8,
                degradedCount: 0,
                ambiguousCount: 0,
                unfilledRate: 0
              },
              stocks: [
                {
                  strategy: 'pullback',
                  code: '000002',
                  name: 'Beta',
                  tradeCount: 1,
                  winRate: 0,
                  avgNetReturnPct: -0.6,
                  cumNetReturnPct: -0.6,
                  lastReplayDate: '2026-06-03',
                  lastEntryFilledAt: '2026-06-03T15:30:00+09:00',
                  lastEntryFillPrice: 20000.0,
                  lastExitFilledAt: '2026-06-04T09:00:00+09:00',
                  lastExitAvgFillPrice: 19880.0,
                  lastExitFillPrice: 19880.0
                }
              ],
              days: [
                {
                  date: '2026-06-03',
                  summaryFile: 'replay_summary_20260603.json',
                  ordersFile: 'sim_orders_20260603.json',
                  fillsFile: 'sim_fills_20260603.json',
                  includedCount: 1,
                  tradeCount: 1,
                  winRate: 0,
                  avgNetReturnPct: -0.6,
                  cumNetReturnPct: -0.6,
                  maxDrawdownPct: 0.8,
                  degradedCount: 0,
                  ambiguousCount: 0,
                  trades: [
                    {
                      strategy: 'pullback',
                      code: '000002',
                      name: 'Beta',
                      entryFilledAt: '2026-06-03T15:30:00+09:00',
                      entryFillPrice: 20000.0,
                      exitFilledAt: '2026-06-04T09:00:00+09:00',
                      exitAvgFillPrice: 19880.0,
                      exitLastFillPrice: 19880.0,
                      tradeStatus: 'closed',
                      closedReason: 'stop_touch',
                      netReturnPct: -0.6
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    },
    latestSummary: {
      date: '2026-06-03',
      tradeCount: 1
    },
    runs: []
  };
}

function sampleReplayBridgeWithSecondDay() {
  const bridge = sampleReplayBridge();
  bridge.latestRun.days.push({
    date: '2026-06-04',
    summaryFile: 'replay_summary_20260604.json',
    ordersFile: 'sim_orders_20260604.json',
    fillsFile: 'sim_fills_20260604.json',
    candidateCount: 2,
    eligibleCount: 1,
    includedCount: 1,
    tradeCount: 1,
    degradedCount: 0,
    ambiguousCount: 0,
    byStrategy: {
      pullback: {
        candidateCount: 2,
        eligibleCount: 1,
        includedCount: 1,
        tradeCount: 1,
        winRate: 0,
        avgNetReturnPct: -0.4,
        cumNetReturnPct: -0.4,
        maxDrawdownPct: 0.4,
        degradedCount: 0,
        ambiguousCount: 0,
        unfilledRate: 0
      }
    },
    trades: [
      {
        strategy: 'pullback',
        code: '000006',
        name: 'Gamma',
        date: '2026-06-04',
        sourceEntryKey: 'entry-2',
        entryFilledAt: '2026-06-04T15:30:00+09:00',
        entryFillPrice: 30000.0,
        exitFilledAt: '2026-06-05T10:00:00+09:00',
        exitAvgFillPrice: 29880.0,
        exitLastFillPrice: 29880.0,
        tradeStatus: 'closed',
        closedReason: 'stop_close',
        netReturnPct: -0.4
      }
    ],
    candidates: [
      {
        strategy: 'pullback',
        name: 'Gamma',
        code: '000006',
        replayIncluded: true,
        entryEligible: false
      }
    ],
    results: [
      {
        strategy: 'pullback',
        code: '000006',
        name: 'Gamma',
        date: '2026-06-04',
        sourceEntryKey: 'entry-2',
        entryEligibleOriginal: false,
        replayIncluded: true,
        entryFilledAt: '2026-06-04T15:30:00+09:00',
        entryFillPrice: 30000.0,
        exitFilledAt: '2026-06-05T10:00:00+09:00',
        exitAvgFillPrice: 29880.0,
        exitLastFillPrice: 29880.0,
        tradeStatus: 'closed',
        closedReason: 'stop_close',
        netReturnPct: -0.4,
        dataQualityStatus: 'degraded',
        ambiguousCount: 0
      }
    ],
    orders: [
      {
        strategy: 'pullback',
        side: 'SELL',
        sourceEntryKey: 'entry-2',
        finalStatus: 'filled'
      }
    ],
    fills: [
      {
        orderId: 'entry-2-entry',
        sourceEntryKey: 'entry-2',
        strategy: 'pullback',
        code: '000006',
        name: 'Gamma',
        side: 'BUY',
        stageKey: 'entry',
        fillRule: 'close_slippage',
        filledAt: '2026-06-04T15:30:00+09:00',
        fillPrice: 30000.0,
        filledQuantityPct: 100
      },
      {
        orderId: 'entry-2-stop',
        sourceEntryKey: 'entry-2',
        strategy: 'pullback',
        code: '000006',
        name: 'Gamma',
        side: 'SELL',
        stageKey: 'stop',
        fillRule: 'stop_close',
        filledAt: '2026-06-05T10:00:00+09:00',
        fillPrice: 29880.0,
        filledQuantityPct: 100
      }
    ]
  });
  bridge.latestRun.summary.candidateCount += 2;
  bridge.latestRun.summary.eligibleCount += 1;
  bridge.latestRun.summary.includedCount += 1;
  bridge.latestRun.summary.tradeCount += 1;
  bridge.latestRun.summary.degradedCount += 0;
  bridge.latestRun.summary.overall.candidateCount += 2;
  bridge.latestRun.summary.overall.eligibleCount += 1;
  bridge.latestRun.summary.overall.includedCount += 1;
  bridge.latestRun.summary.overall.tradeCount += 1;
  bridge.latestRun.summary.overall.degradedCount += 0;
  bridge.latestRun.strategyViews.pullback.summary.candidateCount += 2;
  bridge.latestRun.strategyViews.pullback.summary.eligibleCount += 1;
  bridge.latestRun.strategyViews.pullback.summary.includedCount += 1;
  bridge.latestRun.strategyViews.pullback.summary.tradeCount += 1;
  bridge.latestRun.strategyViews.pullback.summary.degradedCount += 0;
  bridge.latestRun.strategyViews.pullback.caseViews.replay.summary.candidateCount += 1;
  bridge.latestRun.strategyViews.pullback.caseViews.replay.summary.eligibleCount += 1;
  bridge.latestRun.strategyViews.pullback.caseViews.replay.summary.includedCount += 1;
  bridge.latestRun.strategyViews.pullback.caseViews.replay.summary.tradeCount += 1;
  bridge.latestRun.strategyViews.pullback.caseViews.replay.summary.degradedCount += 0;
  bridge.latestRun.strategyViews.pullback.caseViews.replay.days.push({
    date: '2026-06-04',
    summaryFile: 'replay_summary_20260604.json',
    ordersFile: 'sim_orders_20260604.json',
    fillsFile: 'sim_fills_20260604.json',
    includedCount: 1,
    tradeCount: 1,
    winRate: 0,
    avgNetReturnPct: -0.4,
    cumNetReturnPct: -0.4,
    maxDrawdownPct: 0.4,
    degradedCount: 0,
    ambiguousCount: 0,
    trades: [
      {
        strategy: 'pullback',
        code: '000006',
        name: 'Gamma',
        entryFilledAt: '2026-06-04T15:30:00+09:00',
        entryFillPrice: 30000.0,
        exitFilledAt: '2026-06-05T10:00:00+09:00',
        exitAvgFillPrice: 29880.0,
        exitLastFillPrice: 29880.0,
        tradeStatus: 'closed',
        closedReason: 'stop_close',
        netReturnPct: -0.4
      }
    ]
  });
  return bridge;
}

function buildReplayDayFixture(date, index) {
  return {
    date,
    summaryFile: `replay_summary_${date.replace(/-/g, '')}.json`,
    ordersFile: `sim_orders_${date.replace(/-/g, '')}.json`,
    fillsFile: `sim_fills_${date.replace(/-/g, '')}.json`,
    includedCount: 1,
    tradeCount: 1,
    winRate: index % 2 === 0 ? 1 : 0,
    avgNetReturnPct: index % 2 === 0 ? 1.2 : -0.4,
    cumNetReturnPct: index % 2 === 0 ? 1.2 : -0.4,
    maxDrawdownPct: index % 2 === 0 ? 0.0 : 0.4,
    degradedCount: 0,
    ambiguousCount: 0,
    trades: [
      {
        strategy: 'pullback',
        code: `0000${index + 1}`.slice(-6),
        name: `Stock-${index + 1}`,
        date,
        sourceEntryKey: `entry-${index + 1}`,
        entryFilledAt: `${date}T15:30:00+09:00`,
        entryFillPrice: 10000 + index,
        exitFilledAt: `${date}T15:00:00+09:00`,
        exitAvgFillPrice: 10010 + index,
        exitLastFillPrice: 10010 + index,
        tradeStatus: 'closed',
        closedReason: index % 2 === 0 ? 'openPhase_touch' : 'stop_close',
        netReturnPct: index % 2 === 0 ? 1.2 : -0.4
      }
    ]
  };
}

test('strategy section renders selected case summary and button state', () => {
  const context = loadReplayContext();
  context.setJonggaReplayViewMode('replay', { persist: false, rerender: false });
  const badge = createElementStub();
  const summary = createElementStub();
  const button = createElementStub();
  context.elements.set('jongga-replay-badge-pullback', badge);
  context.elements.set('jongga-replay-summary-pullback', summary);
  context.elements.set('btn-open-jongga-replay-pullback', button);
  context.window.JONGGA_REPLAY_RUNS = sampleReplayBridge();

  context.renderReplayStrategySections();

  assert.equal(badge.textContent, 'complete');
  assert.match(summary.innerHTML, /\+1\.20%/);
  assert.match(summary.innerHTML, /체결/);
  assert.equal(button.disabled, false);
  assert.match(button.title, /6\.0 & B/);
});

test('strategy modal renders selected case summary, stock table, and day files', () => {
  const context = loadReplayContext();
  context.setJonggaReplayViewMode('recommendation', { persist: false, rerender: false });
  const body = createElementStub();
  const title = createElementStub();
  const subtitle = createElementStub();
  context.elements.set('jongga-replay-body', body);
  context.elements.set('jongga-replay-modal-title', title);
  context.elements.set('jongga-replay-modal-subtitle', subtitle);
  context.window.JONGGA_REPLAY_RUNS = sampleReplayBridge();
  context.window.JONGGA_REPLAY_RUNS.latestRun.days[0].results[0].mixedExitPolicy = {
    policyKey: 'pullback-a8plus-balanced',
    label: '눌림목 × 8&A+',
    active: true,
    stopPct: -2,
    takeProfitStages: [
      { targetPct: 5, quantityPct: 50 },
      { targetPct: 12, quantityPct: 50 }
    ]
  };

  context.renderJonggaReplayModal('pullback');

  assert.match(title.textContent, /눌림목/);
  assert.match(title.textContent, /매수추천/);
  assert.match(body.innerHTML, /타입 수익/);
  assert.match(body.innerHTML, /종목별 수익/);
  assert.match(body.innerHTML, /Alpha/);
  assert.match(body.innerHTML, /href="https:\/\/stock\.naver\.com\/domestic\/stock\/000001\/price"/);
  assert.match(body.innerHTML, /A\s*·\s*8\.2점/);
  assert.match(body.innerHTML, /매수가/);
  assert.match(body.innerHTML, /매도가/);
  assert.match(body.innerHTML, /완화 모드/);
  assert.match(body.innerHTML, /D\+2가 있으면 3일차까지 연장/);
  assert.match(body.innerHTML, /10,050원/);
  assert.match(body.innerHTML, /10,201원/);
  assert.match(body.innerHTML, /매수\/매도 종목/);
  assert.match(body.innerHTML, /💚 장초반 익절/);
  assert.match(body.innerHTML, /익일 10시 이전 목표가 도달/);
  assert.match(body.innerHTML, /눌림목 × 8&amp;A\+/);
  assert.match(body.innerHTML, /\+5% 50% \/ \+12% 50%/);
  assert.match(body.innerHTML, /종가 -2% 손절/);
  assert.match(body.innerHTML, /클릭해 체결 이력 보기/);
  assert.match(body.innerHTML, /순차 체결 이력/);
  assert.match(body.innerHTML, /replay-fill-badge buy/);
  assert.match(body.innerHTML, /replay-fill-badge profit/);
  assert.match(body.innerHTML, /sim_orders_20260603\.json/);
});

test('strategy modal stock section can collapse and expand', () => {
  const context = loadReplayContext();
  const body = createElementStub();
  const title = createElementStub();
  const subtitle = createElementStub();
  const overlay = createElementStub();
  context.elements.set('jongga-replay-body', body);
  context.elements.set('jongga-replay-modal-title', title);
  context.elements.set('jongga-replay-modal-subtitle', subtitle);
  context.elements.set('jongga-replay-overlay', overlay);
  context.window.JONGGA_REPLAY_RUNS = sampleReplayBridge();

  context.openJonggaReplayModal('pullback');
  assert.match(body.innerHTML, /btn-jongga-replay-stock-toggle[^>]*aria-expanded="true"[^>]*>접기</);
  assert.match(body.innerHTML, /Alpha/);

  context.toggleReplayStockSection();
  assert.match(body.innerHTML, /btn-jongga-replay-stock-toggle[^>]*aria-expanded="false"[^>]*>펼치기</);
  assert.match(body.innerHTML, /종목별 수익 표를 접어둔 상태입니다/);
});

test('day list sorts newest first and paginates by five days', () => {
  const context = loadReplayContext();
  const days = [
    buildReplayDayFixture('2026-05-29', 0),
    buildReplayDayFixture('2026-06-03', 1),
    buildReplayDayFixture('2026-06-05', 2),
    buildReplayDayFixture('2026-06-01', 3),
    buildReplayDayFixture('2026-06-04', 4),
    buildReplayDayFixture('2026-05-30', 5),
    buildReplayDayFixture('2026-06-02', 6)
  ];

  context.setReplayDayPageIndex(0, { rerender: false });
  const firstPage = context.renderReplayDayList(days, 'stable');
  assert.ok(firstPage.indexOf('2026.06.05') < firstPage.indexOf('2026.06.04'));
  assert.ok(firstPage.indexOf('2026.06.04') < firstPage.indexOf('2026.06.03'));
  assert.match(firstPage, /2026\.06\.05/);
  assert.match(firstPage, /2026\.06\.01/);
  assert.doesNotMatch(firstPage, /2026\.05\.30/);
  assert.doesNotMatch(firstPage, /2026\.05\.29/);

  context.setReplayDayPageIndex(1, { rerender: false });
  const secondPage = context.renderReplayDayList(days, 'stable');
  assert.match(secondPage, /2026\.05\.30/);
  assert.match(secondPage, /2026\.05\.29/);
  assert.doesNotMatch(secondPage, /2026\.06\.05/);
});

test('replay period filter narrows modal content to the selected dates', () => {
  const context = loadReplayContext();
  context.setJonggaReplayViewMode('replay', { persist: false, rerender: false });
  const body = createElementStub();
  const title = createElementStub();
  const subtitle = createElementStub();
  context.elements.set('jongga-replay-body', body);
  context.elements.set('jongga-replay-modal-title', title);
  context.elements.set('jongga-replay-modal-subtitle', subtitle);
  context.window.JONGGA_REPLAY_RUNS = sampleReplayBridgeWithSecondDay();

  context.setJonggaReplayPeriod({ from: '2026-06-04', to: '2026-06-04' }, { persist: false, rerender: false });
  context.renderJonggaReplayModal('pullback');

  assert.match(body.innerHTML, /Gamma/);
  assert.match(body.innerHTML, /2026\.06\.04/);
  assert.doesNotMatch(body.innerHTML, /2026\.06\.03/);
});

test('missing replay data disables strategy button and renders empty state', () => {
  const context = loadReplayContext();
  const badge = createElementStub();
  const summary = createElementStub();
  const button = createElementStub();
  context.elements.set('jongga-replay-badge-pullback', badge);
  context.elements.set('jongga-replay-summary-pullback', summary);
  context.elements.set('btn-open-jongga-replay-pullback', button);

  context.renderReplayStrategySections();

  assert.equal(badge.textContent, '없음');
  assert.equal(button.disabled, true);
  assert.match(summary.innerHTML, /검증 데이터 없음|자동 검증 실패/);
});
