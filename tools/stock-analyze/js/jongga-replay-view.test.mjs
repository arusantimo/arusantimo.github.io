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
    setAttribute() {},
    addEventListener() {}
  };
}

function loadStateContext() {
  const elements = new Map();
  const buttons = [
    createElementStub(),
    createElementStub(),
    createElementStub()
  ];
  buttons[0].dataset.jonggaReplayView = 'recommendation';
  buttons[1].dataset.jonggaReplayView = 'a7plus';
  buttons[2].dataset.jonggaReplayView = 'all';

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
      getElementById(id) {
        return elements.get(id) || null;
      },
      querySelectorAll(selector) {
        if (selector === '[data-jongga-replay-view]') return buttons;
        return [];
      }
    },
    escapeHtml(value) {
      return String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    getDefaultAnalyzerTab() {
      return 'buy';
    }
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('./gap.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./utils.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./entry-policy.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./state.js', import.meta.url), 'utf8'), context);
  return { context, elements, buttons };
}

function sampleSnapshot() {
  return {
    pullbackEntries: [
      { name: 'Reco A', strategy: 'pullback', code: '000001', gradeScore: 7.2, grade: 'A', entryEligible: true, statusLabel: '매수추천' },
      { name: 'Replay B', strategy: 'pullback', code: '000002', gradeScore: 6.1, grade: 'B', entryEligible: false, statusLabel: '매수추천' },
      { name: 'A8 Candidate', strategy: 'pullback', code: '000006', gradeScore: 8.1, grade: 'A', entryEligible: false, statusLabel: '관심후보' },
      { name: 'Too Low', strategy: 'pullback', code: '000003', gradeScore: 5.9, grade: 'B', entryEligible: false, statusLabel: '관심후보' }
    ],
    accumulationEntries: [
      { name: 'Reco C', strategy: 'accumulation', code: '000004', gradeScore: 8.0, grade: 'S', entryEligible: true, statusLabel: '강력매수' }
    ],
    breakoutEntries: [],
    reversalEntries: [
      { name: 'Replay D', strategy: 'reversal', code: '000005', gradeScore: 6.0, grade: 'B', entryEligible: false, statusLabel: '관심후보' }
    ]
  };
}

function sampleReplayBridge() {
  return {
    latestRun: {
      analysisDates: ['2026-06-02', '2026-06-03'],
      days: [
        {
          date: '2026-06-02',
          results: [
            { strategy: 'pullback', code: '000006', gradeScore: 8.1, replayGrade: 'A', netReturnPct: 9.87 }
          ]
        },
        {
          date: '2026-06-03',
          results: [
            { strategy: 'pullback', code: '000001', gradeScore: 7.2, replayGrade: 'A', netReturnPct: 1.2 }
          ]
        }
      ],
      summary: {
        overall: {
          cumNetReturnPct: 0.59
        },
        comparisonByCase: {
          all: { cumNetReturnPct: 0.59 },
          a7plus: { cumNetReturnPct: 11.19 },
          recommendation: { cumNetReturnPct: 1.2 }
        }
      },
      strategyViews: {
        pullback: {
          caseViews: {
            recommendation: {
              days: [
                {
                  trades: [
                    { netReturnPct: 1.2 }
                  ]
                }
              ]
            },
            a7plus: {
              days: [
                {
                  trades: [
                    { netReturnPct: 1.2 }
                  ]
                }
              ]
            }
          }
        }
      }
    }
  };
}

test('replay view mode filters buy entries by recommendation or 7&A', () => {
  const { context } = loadStateContext();
  const snapshot = sampleSnapshot();

  const recommendation = context.filterJonggaReplayViewEntries([
    ...snapshot.pullbackEntries,
    ...snapshot.accumulationEntries,
    ...snapshot.reversalEntries
  ], 'recommendation');
  const a7plus = context.filterJonggaReplayViewEntries([
    ...snapshot.pullbackEntries,
    ...snapshot.accumulationEntries,
    ...snapshot.reversalEntries
  ], 'a7plus');
  const all = context.filterJonggaReplayViewEntries([
    ...snapshot.pullbackEntries,
    ...snapshot.accumulationEntries,
    ...snapshot.reversalEntries
  ], 'all');

  assert.deepEqual(recommendation.map(item => item.name), ['Reco A', 'Replay B', 'Reco C']);
  assert.deepEqual(a7plus.map(item => item.name), ['Reco A', 'A8 Candidate', 'Reco C']);
  assert.deepEqual(all.map(item => item.name), ['Reco A', 'Replay B', 'A8 Candidate', 'Too Low', 'Reco C', 'Replay D']);
});

test('replay view mode defaults to all when no stored selection exists', () => {
  const { context, buttons, elements } = loadStateContext();
  const summary = createElementStub();
  elements.set('jongga-replay-view-summary', summary);
  context.window.JONGGA_REPLAY_RUNS = sampleReplayBridge();

  assert.equal(context.getJonggaReplayViewMode(), 'all');
  context.updateJonggaReplayViewControls(sampleSnapshot());

  assert.equal(buttons[2].classList.contains('active'), true);
  assert.match(summary.innerHTML, /리플레이 총 2일/);
});

test('replay view controls show counts and active mode', () => {
  const { context, elements, buttons } = loadStateContext();
  const summary = createElementStub();
  elements.set('jongga-replay-view-summary', summary);
  const snapshot = sampleSnapshot();
  context.window.JONGGA_REPLAY_RUNS = sampleReplayBridge();

  context.setJonggaReplayViewMode('a7plus', { persist: false, rerender: false });
  context.updateJonggaReplayViewControls(snapshot);

  assert.equal(buttons[0].classList.contains('active'), false);
  assert.equal(buttons[1].classList.contains('active'), true);
  assert.equal(buttons[2].classList.contains('active'), false);
  assert.match(summary.innerHTML, /리플레이 총 2일/);
  assert.match(summary.innerHTML, /누적 수익률 \+11\.19%/);
  assert.doesNotMatch(summary.innerHTML, /매수추천 .*건/);
  assert.doesNotMatch(summary.innerHTML, /7 & A .*건/);
  assert.doesNotMatch(summary.innerHTML, /전체 .*건/);
});

test('replay view summary shows dash when visible mode entries have no replay history', () => {
  const { context, elements } = loadStateContext();
  const summary = createElementStub();
  elements.set('jongga-replay-view-summary', summary);
  const snapshot = {
    pullbackEntries: [
      { name: 'Fresh A7', strategy: 'pullback', code: '099999', gradeScore: 7.3, grade: 'A', entryEligible: false, statusLabel: '관심후보' }
    ],
    accumulationEntries: [],
    breakoutEntries: [],
    reversalEntries: []
  };
  context.window.JONGGA_REPLAY_RUNS = sampleReplayBridge();
  context.window.JONGGA_REPLAY_RUNS.latestRun.summary.comparisonByCase.a7plus.cumNetReturnPct = undefined;
  context.window.JONGGA_REPLAY_RUNS.latestRun.strategyViews.pullback.caseViews.a7plus.days = [];

  context.setJonggaReplayViewMode('a7plus', { persist: false, rerender: false });
  context.updateJonggaReplayViewControls(snapshot);

  assert.match(summary.innerHTML, /누적 수익률 —/);
});

test('setJonggaReplayViewMode rerenders strategy replay sections on tab switch', () => {
  const { context } = loadStateContext();
  let replaySectionRenderCount = 0;
  let modalRenderCount = 0;
  context.renderReplayStrategySections = () => {
    replaySectionRenderCount += 1;
  };
  context.renderJonggaReplayModal = () => {
    modalRenderCount += 1;
  };

  context.setJonggaReplayViewMode('a7plus', { persist: false, rerender: false });

  assert.equal(replaySectionRenderCount, 1);
  assert.equal(modalRenderCount, 1);
});

test('replay total excludes breakout returns while breakout panel is hidden', () => {
  const { context } = loadStateContext();
  context.setJonggaBuyBreakoutVisible(false);
  context.getReplayStrategyView = strategy => ({
    days: strategy === 'pullback'
      ? [{ trades: [{ netReturnPct: 5 }] }]
      : strategy === 'breakout'
        ? [{ trades: [{ netReturnPct: -10 }] }]
        : []
  });
  context.window.JONGGA_REPLAY_RUNS = {
    latestRun: {
      summary: {
        comparisonByCase: {
          all: { cumNetReturnPct: -5.5 }
        }
      }
    }
  };

  assert.ok(Math.abs(context.getJonggaReplayCumulativeReturnPct('all', sampleSnapshot()) - 5) < 1e-9);

  context.setJonggaBuyBreakoutVisible(true);
  assert.equal(context.getJonggaReplayCumulativeReturnPct('all', sampleSnapshot()), -5.5);
});
