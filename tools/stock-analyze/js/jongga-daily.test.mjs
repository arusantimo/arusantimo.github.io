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
  assert.equal(context.getJonggaDailyScriptPath('2026-05-22', 'stable'), 'jongga/output/202605/jongga_data_20260522.js');
  assert.equal(context.getJonggaDailyScriptPath('2026-05-22', 'canary'), 'jongga/output/202605/jongga_data_20260522_canary.js');
});

test('getJonggaEffectiveDateKey returns yesterday before 14:00 KST and today at/after 14:00 KST', () => {
  const context = loadDailyContext();
  // 2026-05-29(금) 13:59 KST = UTC 04:59 → 14시 이전이므로 전날 평일(2026-05-28 목) 반환
  const before14 = new Date('2026-05-29T04:59:00.000Z');
  assert.equal(context.getJonggaEffectiveDateKey(before14), '2026-05-28');
  // 2026-05-29(금) 14:00 KST = UTC 05:00 → 14시 이후이므로 오늘(2026-05-29) 반환
  const at14 = new Date('2026-05-29T05:00:00.000Z');
  assert.equal(context.getJonggaEffectiveDateKey(at14), '2026-05-29');
  // 2026-05-29(금) 23:59 KST = UTC 14:59 → 14시 이후이므로 오늘(2026-05-29) 반환
  const after14 = new Date('2026-05-29T14:59:00.000Z');
  assert.equal(context.getJonggaEffectiveDateKey(after14), '2026-05-29');
});

test('getJonggaEffectiveDateKey skips weekend: Monday before 14:00 returns Friday', () => {
  const context = loadDailyContext();
  // 2026-06-01(월) 13:59 KST = UTC 04:59 → 14시 이전, 어제는 일요일(2026-05-31)
  // → 주말 건너뜀 → 금요일(2026-05-29) 반환
  const mondayBefore14 = new Date('2026-06-01T04:59:00.000Z');
  assert.equal(context.getJonggaEffectiveDateKey(mondayBefore14), '2026-05-29');

  // 2026-06-01(월) 14:00 KST = UTC 05:00 → 14시 이후이므로 오늘(2026-06-01) 반환
  const mondayAt14 = new Date('2026-06-01T05:00:00.000Z');
  assert.equal(context.getJonggaEffectiveDateKey(mondayAt14), '2026-06-01');
});

test('getJonggaPrevTradingDateKey handles all weekend cases', () => {
  const context = loadDailyContext();
  // 토요일(2026-05-30) → 금요일(2026-05-29)
  assert.equal(context.getJonggaPrevTradingDateKey('2026-05-30'), '2026-05-29');
  // 일요일(2026-05-31) → 금요일(2026-05-29)
  assert.equal(context.getJonggaPrevTradingDateKey('2026-05-31'), '2026-05-29');
  // 평일(2026-05-29, 금요일) → 그대로
  assert.equal(context.getJonggaPrevTradingDateKey('2026-05-29'), '2026-05-29');
  // 월요일(2026-06-01) → 그대로 (전일이 아닌 해당 날짜 자체를 정규화)
  assert.equal(context.getJonggaPrevTradingDateKey('2026-06-01'), '2026-06-01');
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

  // 현재 effective date key를 동적으로 결정해서 테스트 (오늘/어제 상관없이 정확히 검증)
  const effectiveDateKey = context.getJonggaEffectiveDateKey();
  context.setJonggaTodayStatus('loaded', effectiveDateKey, '', '2026-05-22T04:46:24Z', 'stable');
  // effectiveDateKey가 getJonggaKstTodayKey()와 같으면 '현재 버전', 다르면 '어제 버전 (현재 버전)'
  const todayKey = context.getJonggaKstTodayKey();
  const isToday = effectiveDateKey === todayKey;
  const expectedLabel = isToday ? '현재 버전 데이터' : `어제 버전 (현재 버전) 데이터`;
  assert.match(status.textContent, new RegExp(expectedLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.equal(button.classList.contains('is-hidden'), true);

  context.setJonggaTodayStatus('missing', effectiveDateKey, '', '', 'canary');
  const expectedMissingLabel = isToday ? '카나리 데이터 없음' : `어제 버전 (카나리) 데이터 없음`;
  assert.match(status.textContent, new RegExp(expectedMissingLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.equal(button.classList.contains('is-hidden'), false);
});

test('history modal filters by active variant and renders variant badge', () => {
  const context = loadDailyContext();
  const body = createElementStub();
  context.elements.set('jongga-history-body', body);
  context.setActiveJonggaVariant('canary', { reload: false });
  // 히스토리 항목에 오늘 날짜를 동적으로 설정해서 canary 뱃지가 표시되도록 함
  const todayKey = context.getJonggaKstTodayKey();
  context.window.JONGGA_HISTORY_INDEX = [{
    date: todayKey,
    variant: 'stable',
    variantLabel: '현재 버전',
    generatedAt: '2026-05-22T01:00:00Z',
    status: 'partial',
    buyCount: 1,
    topRecommendations: [{ strategy: 'momentum', name: '삼성전자', code: '005930', score: 8.4, grade: 'A', statusLabel: '매수추천' }]
  }, {
    date: todayKey,
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
