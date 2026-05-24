import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function createElementStub() {
  return {
    textContent: '',
    innerHTML: '',
    value: '',
    hidden: false,
    dataset: {},
    addEventListener() {},
    querySelectorAll() { return []; },
    focus() {}
  };
}

function loadContext() {
  const elements = new Map();
  const context = {
    console,
    JSON,
    Date,
    Blob,
    URL: { createObjectURL() { return 'blob://x'; }, revokeObjectURL() {} },
    navigator: { clipboard: { writeText: async () => {} } },
    FileReader: class {
      readAsText() {}
    },
    alert() {},
    confirm() { return true; },
    window: null,
    document: {
      getElementById(id) { return elements.get(id) || null; },
      createElement() { return createElementStub(); }
    },
    elements,
    normalizeJonggaManualOverrideEntry(code, entry) { return { ...entry, code }; },
    getJonggaManualOverridePayload() { return { entries: {}, updatedAt: '' }; },
    getJonggaManualOverrideForCode() { return null; },
    saveJonggaManualOverridePayload() {},
    clearJonggaManualOverridePayload() {},
    normalizeJonggaManualOverridePayload(value) { return value; },
    escapeHtml(value) { return String(value ?? ''); },
    getJonggaKstTodayKey() { return '2026-05-22'; },
    getJonggaActiveVariant() { return 'canary'; },
    getJonggaVariantLabel(value) { return value === 'canary' ? '카나리' : '현재 버전'; },
    loadJonggaDailyScript(dateKey, variant) {
      context.loadArgs = { dateKey, variant };
      return Promise.resolve(null);
    },
    setOverrideStatus(message) {
      context.status = message;
    }
  };
  context.window = context;
  context.window.addEventListener = () => {};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('./manual-overrides-page.js', import.meta.url), 'utf8'), context);
  return context;
}

test('generated payload reads active variant namespace', () => {
  const context = loadContext();
  context.JONGGA_DAILY_DATA = { '2026-05-22': { variant: 'stable', analysisDate: '2026-05-22' } };
  context.JONGGA_CANARY_DAILY_DATA = { '2026-05-22': { variant: 'canary', analysisDate: '2026-05-22' } };
  const payload = context.getGeneratedPayload();
  assert.equal(payload.variant, 'canary');
});

test('manual override page loads active variant script and renders label', async () => {
  const context = loadContext();
  const meta = createElementStub();
  const variant = createElementStub();
  context.elements.set('override-generated-meta', meta);
  context.elements.set('override-active-variant', variant);
  context.JONGGA_CANARY_DAILY_DATA = { '2026-05-22': { variant: 'canary', analysisDate: '2026-05-22', generatedAt: '2026-05-22T01:00:00Z', dataQuality: { status: 'partial' } } };

  await context.loadGeneratedPayloadForManualOverridePage();
  context.renderGeneratedMeta();

  assert.deepEqual(context.loadArgs, { dateKey: '2026-05-22', variant: 'canary' });
  assert.equal(variant.textContent, '카나리');
  assert.match(meta.textContent, /카나리/);
});
