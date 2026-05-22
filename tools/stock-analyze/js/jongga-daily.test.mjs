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
    value: '',
    classList: {
      values: new Set(),
      add(value) { this.values.add(value); },
      remove(value) { this.values.delete(value); },
      toggle(value, force) {
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
    escapeHtml(value) {
      return String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    log(message) {
      context.logs.push(message);
    },
    syncBodyScrollLock() {},
    logs: [],
    elements
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('./jongga-daily.js', import.meta.url), 'utf8'), context);
  return context;
}

function samplePayload(date = '2026-05-22') {
  return {
    schemaVersion: 'jongga_result.v1',
    analysisDate: date,
    slots: [{ slotId: 'slotA', entries: { momentum: [] } }]
  };
}

test('KST today key and daily script path use YYYYMMDD', () => {
  const context = loadDailyContext();
  const date = new Date('2026-05-21T15:01:00.000Z');
  assert.equal(context.getJonggaKstTodayKey(date), '2026-05-22');
  assert.equal(context.getJonggaDailyScriptPath('2026-05-22'), 'jongga/output/jongga_data_20260522.js');
});

test('manual JSON is saved and read by analysis date', () => {
  const context = loadDailyContext();
  context.saveJonggaManualJsonForDate('2026-05-22', samplePayload());
  assert.equal(context.readJonggaManualJsonForDate('2026-05-22').analysisDate, '2026-05-22');
  assert.equal(context.readJonggaManualJsonForDate('2026-05-21'), null);
});

test('manual JSON validation rejects other dates and invalid schema', () => {
  const context = loadDailyContext();
  assert.throws(() => context.validateManualJonggaPayloadForDate(samplePayload('2026-05-21'), '2026-05-22'), /analysisDate/);
  assert.throws(() => context.validateManualJonggaPayloadForDate({ schemaVersion: 'bad' }, '2026-05-22'), /schemaVersion invalid/);
});

test('today status exposes direct input only when data is missing', () => {
  const context = loadDailyContext();
  const status = createElementStub();
  const button = createElementStub();
  context.elements.set('jongga-today-status', status);
  context.elements.set('btn-open-jongga-json-modal', button);

  context.setJonggaTodayStatus('loaded', '2026-05-22', '', '2026-05-22T04:46:24Z');
  assert.equal(status.textContent, '금일 데이터: 2026-05-22 13:46 로드 완료');
  assert.equal(button.classList.contains('is-hidden'), true);

  context.setJonggaTodayStatus('missing', '2026-05-22');
  assert.equal(status.textContent, '금일 데이터 없음: 2026-05-22');
  assert.equal(button.classList.contains('is-hidden'), false);
});

test('history modal renders dates and recommendations without applying data', () => {
  const context = loadDailyContext();
  const body = createElementStub();
  context.elements.set('jongga-history-body', body);
  context.window.JONGGA_HISTORY_INDEX = [{
    date: '2026-05-22',
    generatedAt: '2026-05-22T01:00:00Z',
    status: 'partial',
    buyCount: 1,
    topRecommendations: [{ strategy: 'momentum', name: '삼성전자', code: '005930', score: 8.4, grade: 'A', statusLabel: '매수추천' }]
  }];

  context.renderJonggaHistoryModal();
  assert.match(body.innerHTML, /2026-05-22/);
  assert.match(body.innerHTML, /삼성전자/);
  assert.equal(context.applied, undefined);
});
