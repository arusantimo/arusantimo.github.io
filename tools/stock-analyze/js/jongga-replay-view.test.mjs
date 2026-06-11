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
    createElementStub(),
    createElementStub(),
    createElementStub()
  ];
  buttons[0].dataset.jonggaReplayView = 'recommendation';
  buttons[1].dataset.jonggaReplayView = 'a8plus';
  buttons[2].dataset.jonggaReplayView = 'a7plus';
  buttons[3].dataset.jonggaReplayView = 'replay';
  buttons[4].dataset.jonggaReplayView = 'all';

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
      { name: 'Reco A', code: '000001', gradeScore: 7.2, grade: 'A', entryEligible: true, statusLabel: '매수추천' },
      { name: 'Replay B', code: '000002', gradeScore: 6.1, grade: 'B', entryEligible: false, statusLabel: '매수추천' },
      { name: 'A8 Candidate', code: '000006', gradeScore: 8.1, grade: 'A', entryEligible: false, statusLabel: '관심후보' },
      { name: 'Too Low', code: '000003', gradeScore: 5.9, grade: 'B', entryEligible: false, statusLabel: '관심후보' }
    ],
    accumulationEntries: [
      { name: 'Reco C', code: '000004', gradeScore: 8.0, grade: 'S', entryEligible: true, statusLabel: '강력매수' }
    ],
    breakoutEntries: [],
    reversalEntries: [
      { name: 'Replay D', code: '000005', gradeScore: 6.0, grade: 'B', entryEligible: false, statusLabel: '관심후보' }
    ]
  };
}

function sampleReplayBridge() {
  return {
    latestRun: {
      analysisDates: ['2026-06-02', '2026-06-03'],
      days: [{ date: '2026-06-02' }, { date: '2026-06-03' }],
      summary: {
        overall: {
          cumNetReturnPct: 0.59
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
            replay: {
              days: [
                {
                  trades: [
                    { netReturnPct: -0.6 }
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

test('replay view mode filters buy entries by recommendation, 8&A+, 6.0&B, or 7&A', () => {
  const { context } = loadStateContext();
  const snapshot = sampleSnapshot();

  const recommendation = context.filterJonggaReplayViewEntries([
    ...snapshot.pullbackEntries,
    ...snapshot.accumulationEntries,
    ...snapshot.reversalEntries
  ], 'recommendation');
  const replay = context.filterJonggaReplayViewEntries([
    ...snapshot.pullbackEntries,
    ...snapshot.accumulationEntries,
    ...snapshot.reversalEntries
  ], 'replay');
  const a7plus = context.filterJonggaReplayViewEntries([
    ...snapshot.pullbackEntries,
    ...snapshot.accumulationEntries,
    ...snapshot.reversalEntries
  ], 'a7plus');
  const a8plus = context.filterJonggaReplayViewEntries([
    ...snapshot.pullbackEntries,
    ...snapshot.accumulationEntries,
    ...snapshot.reversalEntries
  ], 'a8plus');
  const all = context.filterJonggaReplayViewEntries([
    ...snapshot.pullbackEntries,
    ...snapshot.accumulationEntries,
    ...snapshot.reversalEntries
  ], 'all');

  assert.deepEqual(recommendation.map(item => item.name), ['Reco A', 'Replay B', 'A8 Candidate', 'Too Low', 'Reco C', 'Replay D']);
  assert.deepEqual(replay.map(item => item.name), ['Replay B', 'A8 Candidate', 'Replay D']);
  assert.deepEqual(a8plus.map(item => item.name), ['A8 Candidate', 'Reco C']);
  assert.deepEqual(a7plus.map(item => item.name), ['Reco A', 'A8 Candidate']);
  assert.deepEqual(all.map(item => item.name), ['Reco A', 'Replay B', 'A8 Candidate', 'Too Low', 'Reco C', 'Replay D']);
});

test('replay view controls show counts and active mode', () => {
  const { context, elements, buttons } = loadStateContext();
  const summary = createElementStub();
  elements.set('jongga-replay-view-summary', summary);
  const snapshot = sampleSnapshot();
  context.window.JONGGA_REPLAY_RUNS = sampleReplayBridge();

  context.setJonggaReplayViewMode('replay', { persist: false, rerender: false });
  context.updateJonggaReplayViewControls(snapshot);

  assert.equal(buttons[0].classList.contains('active'), false);
  assert.equal(buttons[1].classList.contains('active'), false);
  assert.equal(buttons[2].classList.contains('active'), false);
  assert.equal(buttons[3].classList.contains('active'), true);
  assert.match(summary.innerHTML, /리플레이 총 2일/);
  assert.match(summary.innerHTML, /누적 수익률 -0\.60%/);
  assert.doesNotMatch(summary.innerHTML, /매수추천 .*건/);
  assert.doesNotMatch(summary.innerHTML, /8 & A\+ .*건/);
  assert.doesNotMatch(summary.innerHTML, /7 & A .*건/);
  assert.doesNotMatch(summary.innerHTML, /6\.0 & B .*건/);
  assert.doesNotMatch(summary.innerHTML, /전체 .*건/);
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

  context.setJonggaReplayViewMode('replay', { persist: false, rerender: false });

  assert.equal(replaySectionRenderCount, 1);
  assert.equal(modalRenderCount, 1);
});
