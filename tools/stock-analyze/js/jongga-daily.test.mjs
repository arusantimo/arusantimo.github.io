import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function createElementStub(dataset = {}) {
  return {
    textContent: '',
    className: '',
    title: '',
    innerHTML: '',
    value: '',
    disabled: false,
    dataset,
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
    addEventListener() {},
    focus() {}
  };
}

function loadDailyContext() {
  const elements = new Map();
  const selectors = new Map();
  const storage = new Map();
  const context = {
    console,
    Intl,
    Date,
    JSON,
    window: null,
    localStorage: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null; },
      setItem(key, value) { storage.set(key, String(value)); }
    },
    document: {
      getElementById(id) { return elements.get(id) || null; },
      createElement() { return createElementStub(); },
      querySelectorAll(selector) { return selectors.get(selector) || []; },
      head: { appendChild() {} }
    },
    validateJonggaResult(payload) {
      return payload?.schemaVersion === 'jongga_result.v1'
        ? { ok: true, errors: [] }
        : { ok: false, errors: ['schemaVersion invalid'] };
    },
    loadJonggaPayload(payload, meta) {
      context.applied = { payload, meta };
      return { ok: true };
    },
    clearJonggaLoadedState(meta) {
      context.cleared = meta;
    },
    escapeHtml(value) {
      return String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    log(message) {
      context.logs.push(message);
    },
    syncBodyScrollLock() {},
    logs: [],
    elements,
    selectors
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('./jongga-daily.js', import.meta.url), 'utf8'), context);
  return context;
}

function samplePayload(date = '2026-05-22', variant = 'stable') {
  return {
    schemaVersion: 'jongga_result.v1',
    analysisDate: date,
    variant,
    slots: [{ slotId: 'slotA', entries: { momentum: [] } }]
  };
}

test('daily script paths use variant suffixes', () => {
  const context = loadDailyContext();
  const date = new Date('2026-05-21T15:01:00.000Z');
  assert.equal(context.getJonggaKstTodayKey(date), '2026-05-22');
  assert.equal(context.getJonggaDailyScriptPath('2026-05-22', 'stable'), 'jongga/output/jongga_data_20260522.js');
  assert.equal(context.getJonggaDailyScriptPath('2026-05-22', 'canary'), 'jongga/output/jongga_data_20260522_canary.js');
});

test('manual JSON is saved and read by date and variant', () => {
  const context = loadDailyContext();
  context.saveJonggaManualJsonForDate('2026-05-22', samplePayload('2026-05-22', 'stable'), 'stable');
  context.saveJonggaManualJsonForDate('2026-05-22', samplePayload('2026-05-22', 'canary'), 'canary');
  assert.equal(context.readJonggaManualJsonForDate('2026-05-22', 'stable').variant, 'stable');
  assert.equal(context.readJonggaManualJsonForDate('2026-05-22', 'canary').variant, 'canary');
  assert.equal(context.readJonggaManualJsonForDate('2026-05-21', 'stable'), null);
});

test('active variant is persisted and controls reflect availability', () => {
  const context = loadDailyContext();
  const stableButton = createElementStub({ jonggaVariant: 'stable' });
  const canaryButton = createElementStub({ jonggaVariant: 'canary' });
  context.selectors.set('[data-jongga-variant]', [stableButton, canaryButton]);

  context.setActiveJonggaVariant('canary', { reload: false });
  assert.equal(context.getJonggaActiveVariant(), 'canary');
  assert.equal(context.localStorage.getItem('stockAnalyzeJonggaActiveVariantV1'), 'canary');
  assert.equal(canaryButton.classList.contains('active'), true);

  context.markJonggaVariantAvailability('canary', false);
  assert.equal(stableButton.disabled, false);
  assert.equal(canaryButton.disabled, false);

  context.setActiveJonggaVariant('stable', { reload: false });
  assert.equal(canaryButton.disabled, true);
});

test('manual JSON validation rejects other dates and variant mismatch', () => {
  const context = loadDailyContext();
  assert.throws(() => context.validateManualJonggaPayloadForDate(samplePayload('2026-05-21', 'stable'), '2026-05-22', 'stable'), /analysisDate/);
  assert.throws(() => context.validateManualJonggaPayloadForDate(samplePayload('2026-05-22', 'stable'), '2026-05-22', 'canary'), /variant/);
  assert.throws(() => context.validateManualJonggaPayloadForDate({ schemaVersion: 'bad' }, '2026-05-22', 'stable'), /schemaVersion invalid/);
});

test('today status exposes channel label and direct input only when data is missing', () => {
  const context = loadDailyContext();
  const status = createElementStub();
  const button = createElementStub();
  context.elements.set('jongga-today-status', status);
  context.elements.set('btn-open-jongga-json-modal', button);

  context.setJonggaTodayStatus('loaded', '2026-05-22', '', '2026-05-22T04:46:24Z', 'stable');
  assert.equal(status.textContent, '현재 버전 데이터: 2026-05-22 13:46 로드 완료');
  assert.equal(button.classList.contains('is-hidden'), true);

  context.setJonggaTodayStatus('missing', '2026-05-22', '', '', 'canary');
  assert.equal(status.textContent, '카나리 데이터 없음: 2026-05-22');
  assert.equal(button.classList.contains('is-hidden'), false);
});

test('history modal filters by active variant and renders variant badge', () => {
  const context = loadDailyContext();
  const body = createElementStub();
  context.elements.set('jongga-history-body', body);
  context.setActiveJonggaVariant('canary', { reload: false });
  context.window.JONGGA_HISTORY_INDEX = [{
    date: '2026-05-22',
    variant: 'stable',
    variantLabel: '현재 버전',
    generatedAt: '2026-05-22T01:00:00Z',
    status: 'partial',
    buyCount: 1,
    topRecommendations: [{ strategy: 'momentum', name: '삼성전자', code: '005930', score: 8.4, grade: 'A', statusLabel: '매수추천' }]
  }, {
    date: '2026-05-22',
    variant: 'canary',
    variantLabel: '카나리',
    generatedAt: '2026-05-22T01:10:00Z',
    status: 'complete',
    buyCount: 2,
    topRecommendations: [{ strategy: 'reversal', name: 'SK하이닉스', code: '000660', score: 7.9, grade: 'A', statusLabel: '진입 가능' }]
  }];

  context.renderJonggaHistoryModal();
  assert.match(body.innerHTML, /SK하이닉스/);
  assert.doesNotMatch(body.innerHTML, /삼성전자/);
  assert.match(body.innerHTML, /history-variant-badge canary/);
  assert.equal(context.applied, undefined);
});
