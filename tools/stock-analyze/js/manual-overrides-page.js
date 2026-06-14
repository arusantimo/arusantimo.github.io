const STRATEGY_LABELS = {
  pullback: '눌림목',
  breakout: '주도주 돌파형',
  accumulation: '수급 매집형',
  momentum: '주도주 돌파형',
  reversal: '낙주 매매',
  manual: '직접 입력'
};

const FIELD_LABELS = {
  'toss.avgStrength': '당일 평균 체결강도',
  'toss.intradayAbove100Ratio': '100% 이상 유지 비율',
  'toss.lastHourAvgStrength': '마지막 1시간 평균 체결강도',
  'orderbook.bidAskRatio': '매수/매도 호가잔량 비율',
  eventFilter: '실적/기업행사 필터'
};

const FIELD_KEY_TO_FORM_FIELDS = {
  'toss.avgStrength': ['avgStrength'],
  'toss.intradayAbove100Ratio': ['intradayRatio'],
  'toss.lastHourAvgStrength': ['lastHourStrength'],
  'orderbook.bidAskRatio': ['bidAskRatio'],
  eventFilter: ['eventBlocked', 'earningsDays', 'corporateActionDays']
};

const ALL_EDITABLE_FORM_FIELDS = ['avgStrength', 'intradayRatio', 'lastHourStrength', 'bidAskRatio', 'eventBlocked', 'earningsDays', 'corporateActionDays', 'note'];

let overrideRecommendedEntries = [];
let overrideSelectedCode = '';

function getManualOverridePageFormValues() {
  return {
    code: document.getElementById('override-code')?.value || '',
    name: document.getElementById('override-name')?.value || '',
    avgStrength: document.getElementById('override-avg-strength')?.value || '',
    intradayRatio: document.getElementById('override-intraday-ratio')?.value || '',
    lastHourStrength: document.getElementById('override-last-hour-strength')?.value || '',
    bidAskRatio: document.getElementById('override-bid-ask-ratio')?.value || '',
    eventBlocked: document.getElementById('override-event-blocked')?.checked || false,
    earningsDays: document.getElementById('override-earnings-days')?.value || '',
    corporateActionDays: document.getElementById('override-corporate-days')?.value || '',
    note: document.getElementById('override-note')?.value || ''
  };
}

function setManualOverridePageFormValues(entry = null) {
  document.getElementById('override-code').value = entry?.code || '';
  document.getElementById('override-name').value = entry?.name || '';
  document.getElementById('override-avg-strength').value = entry?.toss?.avgStrength ?? '';
  document.getElementById('override-intraday-ratio').value = entry?.toss?.intradayAbove100Ratio ?? '';
  document.getElementById('override-last-hour-strength').value = entry?.toss?.lastHourAvgStrength ?? '';
  document.getElementById('override-bid-ask-ratio').value = entry?.orderbook?.bidAskRatio ?? '';
  document.getElementById('override-event-blocked').checked = Boolean(entry?.eventFilter?.blocked);
  document.getElementById('override-earnings-days').value = entry?.eventFilter?.earningsDays ?? '';
  document.getElementById('override-corporate-days').value = entry?.eventFilter?.corporateActionDays ?? '';
  document.getElementById('override-note').value = entry?.eventFilter?.note || entry?.orderbook?.note || entry?.toss?.note || '';
}

function buildManualOverrideEntryFromForm() {
  const values = getManualOverridePageFormValues();
  return normalizeManualOverrideEntry(values.code, {
    code: values.code,
    name: values.name,
    toss: {
      avgStrength: values.avgStrength,
      intradayAbove100Ratio: values.intradayRatio,
      lastHourAvgStrength: values.lastHourStrength,
      note: values.note
    },
    orderbook: {
      bidAskRatio: values.bidAskRatio,
      note: values.note
    },
    eventFilter: {
      blocked: values.eventBlocked,
      earningsDays: values.earningsDays,
      corporateActionDays: values.corporateActionDays,
      note: values.note
    }
  });
}

function renderManualOverridePreview() {
  const preview = document.getElementById('override-json-preview');
  if (!preview) return;
  preview.value = JSON.stringify(getJonggaManualOverridePayload(), null, 2);
}

function summarizeManualOverrideEntry(entry) {
  const badges = [];
  if (Number.isFinite(entry?.toss?.avgStrength)) {
    badges.push(`<span class="override-badge ${entry.toss.avgStrength >= 90 ? 'ok' : 'warn'}">체결강도 ${entry.toss.avgStrength.toFixed(1)}%</span>`);
  }
  if (Number.isFinite(entry?.orderbook?.bidAskRatio)) {
    badges.push(`<span class="override-badge ${entry.orderbook.bidAskRatio >= 1 ? 'ok' : 'warn'}">호가 ${entry.orderbook.bidAskRatio.toFixed(2)}:1</span>`);
  }
  const eventBlocked = Boolean(entry?.eventFilter?.blocked)
    || (Number.isFinite(entry?.eventFilter?.earningsDays) && entry.eventFilter.earningsDays <= 2)
    || (Number.isFinite(entry?.eventFilter?.corporateActionDays) && entry.eventFilter.corporateActionDays <= 5);
  if (eventBlocked) {
    badges.push('<span class="override-badge block">이벤트 차단</span>');
  } else if (entry?.eventFilter?.note || Number.isFinite(entry?.eventFilter?.earningsDays) || Number.isFinite(entry?.eventFilter?.corporateActionDays)) {
    badges.push('<span class="override-badge ok">이벤트 통과</span>');
  }
  return badges.length ? badges.join('') : '<span class="override-empty">입력 값 없음</span>';
}

function getGeneratedPayload() {
  const dateKey = typeof getJonggaKstTodayKey === 'function' ? getJonggaKstTodayKey() : '';
  const variant = typeof getJonggaActiveVariant === 'function' ? getJonggaActiveVariant() : 'stable';
  const namespace = variant === 'canary' ? 'JONGGA_CANARY_DAILY_DATA' : 'JONGGA_DAILY_DATA';
  const dailyPayload = dateKey && globalThis[namespace] && typeof globalThis[namespace] === 'object'
    ? globalThis[namespace][dateKey]
    : null;
  if (dailyPayload && typeof dailyPayload === 'object') return dailyPayload;
  return globalThis.JONGGA_DATA && typeof globalThis.JONGGA_DATA === 'object' ? globalThis.JONGGA_DATA : null;
}

function setOverrideStatus(message) {
  const status = document.getElementById('override-status');
  if (status) status.textContent = message;
}

function formatGeneratedAt(value) {
  if (!value) return '생성 시각 없음';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function isRecommendationFieldSatisfied(fieldKey, entry) {
  if (!entry) return false;
  if (fieldKey === 'toss.avgStrength') return Number.isFinite(entry?.toss?.avgStrength);
  if (fieldKey === 'toss.intradayAbove100Ratio') return Number.isFinite(entry?.toss?.intradayAbove100Ratio);
  if (fieldKey === 'toss.lastHourAvgStrength') return Number.isFinite(entry?.toss?.lastHourAvgStrength);
  if (fieldKey === 'orderbook.bidAskRatio') return Number.isFinite(entry?.orderbook?.bidAskRatio);
  if (fieldKey === 'eventFilter') {
    return Boolean(entry?.eventFilter?.blocked)
      || Number.isFinite(entry?.eventFilter?.earningsDays)
      || Number.isFinite(entry?.eventFilter?.corporateActionDays)
      || Boolean(String(entry?.eventFilter?.note || '').trim());
  }
  return false;
}

function createFallbackRecommendation(entry) {
  if (!entry?.code) return null;
  return {
    code: entry.code,
    name: entry.name || '',
    strategies: ['manual'],
    grade: '',
    score: null,
    statusLabel: '저장된 수동 입력',
    keyPoint: '현재 추천 목록에는 없지만 저장된 수동 입력입니다.',
    fields: [],
    pendingFields: [],
    visibleFieldNames: ALL_EDITABLE_FORM_FIELDS,
    sourceLabel: '저장된 항목'
  };
}

function getVisibleFieldNames(recommendation) {
  if (!recommendation) return [];
  if (Array.isArray(recommendation.visibleFieldNames) && recommendation.visibleFieldNames.length) {
    return recommendation.visibleFieldNames;
  }
  const names = new Set(['note']);
  (Array.isArray(recommendation.pendingFields) ? recommendation.pendingFields : []).forEach(field => {
    (FIELD_KEY_TO_FORM_FIELDS[field.fieldKey] || []).forEach(name => names.add(name));
  });
  return Array.from(names);
}

function updateFieldVisibility(recommendation) {
  const visibleFields = new Set(getVisibleFieldNames(recommendation));
  document.querySelectorAll('[data-override-field]').forEach(element => {
    const fieldName = element.dataset.overrideField;
    const alwaysVisible = fieldName === 'code' || fieldName === 'name';
    element.hidden = !alwaysVisible && !visibleFields.has(fieldName);
  });
}

function renderInputGuides(recommendation) {
  const container = document.getElementById('override-input-guides');
  if (!container) return;
  const fields = Array.isArray(recommendation?.pendingFields) ? recommendation.pendingFields : [];
  if (!fields.length) {
    container.innerHTML = '<div class="override-empty">현재 선택한 종목에서 추가로 입력할 필드가 없습니다.</div>';
    return;
  }
  container.innerHTML = fields.map(field => `
    <section class="override-guide-card">
      <div class="override-guide-head">
        <strong>${escapeHtml(field.label || FIELD_LABELS[field.fieldKey] || field.fieldKey)}</strong>
        <a href="${escapeHtml(field.sourceUrl || '#')}" target="_blank" rel="noreferrer">${escapeHtml(field.sourceName || '원본 열기')}</a>
      </div>
      <div class="override-guide-copy">${escapeHtml(field.copyHint || '')}</div>
      <ul class="override-guide-steps">
        ${(Array.isArray(field.instructions) ? field.instructions : []).map(step => `<li>${escapeHtml(step)}</li>`).join('')}
      </ul>
    </section>
  `).join('');
}

function renderSelectedSummary(recommendation) {
  const target = document.getElementById('override-selected-summary');
  if (!target) return;
  if (!recommendation) {
    target.textContent = '추천 종목을 선택해주세요.';
    return;
  }
  const tags = [
    ...recommendation.strategies.map(strategy => `<span class="override-badge ok">${escapeHtml(STRATEGY_LABELS[strategy] || strategy)}</span>`),
    ...(recommendation.pendingFields || []).map(field => `<span class="override-badge warn">${escapeHtml(field.label || FIELD_LABELS[field.fieldKey] || field.fieldKey)}</span>`)
  ];
  const scoreText = Number.isFinite(Number(recommendation.score)) ? `${Number(recommendation.score).toFixed(1)}점` : '점수 정보 없음';
  target.innerHTML = `
    <div class="override-selected-head">
      <div>
        <strong>${escapeHtml(recommendation.name || '종목명 없음')} (${escapeHtml(recommendation.code)})</strong>
        <div class="override-selected-copy">${escapeHtml(recommendation.statusLabel || scoreText)}</div>
      </div>
      <div class="override-selected-meta">${escapeHtml(scoreText)}</div>
    </div>
    <div class="override-badges">${tags.join('')}</div>
    <div class="override-panel-copy">${escapeHtml(recommendation.keyPoint || recommendation.sourceLabel || '')}</div>
  `;
}

function applyRecommendationSelection(code, { focus = false } = {}) {
  overrideSelectedCode = code || '';
  const savedEntry = code ? getJonggaManualOverrideForCode(code) : null;
  const recommendation = overrideRecommendedEntries.find(entry => entry.code === code) || createFallbackRecommendation(savedEntry);
  if (!recommendation) {
    setManualOverridePageFormValues(null);
    updateFieldVisibility(null);
    renderSelectedSummary(null);
    renderInputGuides(null);
    return;
  }

  setManualOverridePageFormValues({
    code: recommendation.code,
    name: recommendation.name,
    ...(savedEntry || {})
  });
  updateFieldVisibility(recommendation);
  renderSelectedSummary(recommendation);
  renderInputGuides(recommendation);
  setOverrideStatus(`${recommendation.name} (${recommendation.code}) 입력 항목을 준비했습니다.`);
  if (focus) {
    const firstField = getVisibleFieldNames(recommendation).find(field => field !== 'note');
    const focusMap = {
      avgStrength: 'override-avg-strength',
      intradayRatio: 'override-intraday-ratio',
      lastHourStrength: 'override-last-hour-strength',
      bidAskRatio: 'override-bid-ask-ratio',
      eventBlocked: 'override-event-blocked',
      earningsDays: 'override-earnings-days',
      corporateActionDays: 'override-corporate-days',
      note: 'override-note'
    };
    document.getElementById(focusMap[firstField] || 'override-note')?.focus();
  }
}

function mergeRecommendedEntry(target, rawEntry, strategy) {
  const code = String(rawEntry?.code || '').trim();
  if (!code) return target;
  const next = target || {
    code,
    name: String(rawEntry?.name || '').trim(),
    strategies: [],
    grade: rawEntry?.grade || '',
    score: rawEntry?.score,
    statusLabel: rawEntry?.statusLabel || '',
    keyPoint: rawEntry?.keyPoint || '',
    fieldMap: {}
  };
  if (!next.strategies.includes(strategy)) next.strategies.push(strategy);
  if (!next.name && rawEntry?.name) next.name = String(rawEntry.name).trim();
  if (!next.statusLabel && rawEntry?.statusLabel) next.statusLabel = rawEntry.statusLabel;
  if (!next.keyPoint && rawEntry?.keyPoint) next.keyPoint = rawEntry.keyPoint;
  if (!Number.isFinite(Number(next.score)) && Number.isFinite(Number(rawEntry?.score))) next.score = rawEntry.score;
  if (!next.grade && rawEntry?.grade) next.grade = rawEntry.grade;
  const manualFields = Array.isArray(rawEntry?.manualInput?.fields) ? rawEntry.manualInput.fields : [];
  manualFields.forEach(field => {
    if (!field?.fieldKey || next.fieldMap[field.fieldKey]) return;
    next.fieldMap[field.fieldKey] = field;
  });
  return next;
}

function collectRecommendedManualEntries() {
  const payload = getGeneratedPayload();
  if (!payload || !Array.isArray(payload.slots)) return [];
  const merged = {};
  payload.slots.forEach(slot => {
    const entries = slot?.entries || {};
    ['pullback', 'accumulation', 'breakout', 'momentum', 'reversal'].forEach(strategy => {
      (Array.isArray(entries[strategy]) ? entries[strategy] : []).forEach(rawEntry => {
        if (!rawEntry?.manualInput?.required) return;
        merged[rawEntry.code] = mergeRecommendedEntry(merged[rawEntry.code], rawEntry, strategy);
      });
    });
  });

  return Object.values(merged).map(entry => {
    const fields = Object.values(entry.fieldMap || {});
    const savedEntry = getJonggaManualOverrideForCode(entry.code);
    const pendingFields = fields.filter(field => !isRecommendationFieldSatisfied(field.fieldKey, savedEntry));
    return {
      code: entry.code,
      name: entry.name,
      strategies: entry.strategies,
      grade: entry.grade,
      score: entry.score,
      statusLabel: entry.statusLabel,
      keyPoint: entry.keyPoint,
      fields,
      pendingFields,
      visibleFieldNames: Array.from(new Set([
        ...pendingFields.flatMap(field => FIELD_KEY_TO_FORM_FIELDS[field.fieldKey] || []),
        'note'
      ])),
      sourceLabel: '현재 추천 종목'
    };
  }).filter(entry => entry.pendingFields.length > 0).sort((left, right) => left.code.localeCompare(right.code));
}

function renderGeneratedMeta() {
  const target = document.getElementById('override-generated-meta');
  const variantTarget = document.getElementById('override-active-variant');
  if (!target) return;
  const variant = typeof getJonggaActiveVariant === 'function' ? getJonggaActiveVariant() : 'stable';
  const variantLabel = typeof getJonggaVariantLabel === 'function' ? getJonggaVariantLabel(variant) : variant;
  if (variantTarget) variantTarget.textContent = variantLabel;
  const payload = getGeneratedPayload();
  if (!payload) {
    const dateKey = typeof getJonggaKstTodayKey === 'function' ? getJonggaKstTodayKey() : '오늘';
    target.textContent = `${variantLabel} / ${dateKey} 기준 Jongga 데이터 파일을 찾지 못했습니다. 최신 데이터를 먼저 생성해주세요.`;
    return;
  }
  const status = payload?.dataQuality?.status || 'unknown';
  target.textContent = `기준 데이터: ${variantLabel} / ${payload.analysisDate || '날짜 미확인'} / ${formatGeneratedAt(payload.generatedAt)} | 데이터 품질: ${status}`;
}

function renderRecommendedList() {
  const list = document.getElementById('override-recommended-list');
  const empty = document.getElementById('override-recommended-empty');
  const count = document.getElementById('override-recommended-count');
  if (!list || !empty || !count) return;

  overrideRecommendedEntries = collectRecommendedManualEntries();
  count.textContent = String(overrideRecommendedEntries.length);

  if (!overrideRecommendedEntries.length) {
    const variant = typeof getJonggaActiveVariant === 'function' ? getJonggaActiveVariant() : 'stable';
    const variantLabel = typeof getJonggaVariantLabel === 'function' ? getJonggaVariantLabel(variant) : variant;
    list.innerHTML = '';
    empty.textContent = `${variantLabel} 데이터 기준으로 추가 입력이 필요한 추천 종목이 없습니다.`;
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  list.innerHTML = overrideRecommendedEntries.map(entry => `
    <button type="button" class="override-recommended-card${overrideSelectedCode === entry.code ? ' is-active' : ''}" data-override-select="${entry.code}">
      <div class="override-recommended-head">
        <strong>${escapeHtml(entry.name)} (${escapeHtml(entry.code)})</strong>
        <span>${escapeHtml(Number.isFinite(Number(entry.score)) ? Number(entry.score).toFixed(1) : '-')}</span>
      </div>
      <div class="override-badges">
        ${entry.strategies.map(strategy => `<span class="override-badge ok">${escapeHtml(STRATEGY_LABELS[strategy] || strategy)}</span>`).join('')}
        ${entry.pendingFields.map(field => `<span class="override-badge warn">${escapeHtml(field.label || FIELD_LABELS[field.fieldKey] || field.fieldKey)}</span>`).join('')}
      </div>
      <div class="override-panel-copy">${escapeHtml(entry.keyPoint || entry.statusLabel || '')}</div>
    </button>
  `).join('');

  list.querySelectorAll('[data-override-select]').forEach(button => {
    button.addEventListener('click', () => {
      applyRecommendationSelection(button.dataset.overrideSelect, { focus: true });
      renderRecommendedList();
    });
  });
}

function renderManualOverrideTable() {
  const body = document.getElementById('override-list-body');
  const count = document.getElementById('override-entry-count');
  if (!body || !count) return;

  const payload = getJonggaManualOverridePayload();
  const entries = Object.values(payload.entries).sort((left, right) => left.code.localeCompare(right.code));
  count.textContent = String(entries.length);

  if (!entries.length) {
    body.innerHTML = '<tr><td colspan="4" class="override-empty">저장된 수동 입력이 없습니다.</td></tr>';
    renderManualOverridePreview();
    return;
  }

  body.innerHTML = entries.map(entry => `
    <tr>
      <td><strong>${entry.code}</strong><br>${entry.name ? escapeHtml(entry.name) : '<span class="override-empty">종목명 미입력</span>'}</td>
      <td><div class="override-badges">${summarizeManualOverrideEntry(entry)}</div></td>
      <td>${escapeHtml(entry.eventFilter.note || entry.orderbook.note || entry.toss.note || '—')}</td>
      <td>
        <div class="override-actions">
          <button type="button" class="btn btn-secondary small" data-override-edit="${entry.code}">수정</button>
          <button type="button" class="btn btn-secondary small" data-override-delete="${entry.code}">삭제</button>
        </div>
      </td>
    </tr>
  `).join('');

  body.querySelectorAll('[data-override-edit]').forEach(button => {
    button.addEventListener('click', () => {
      applyRecommendationSelection(button.dataset.overrideEdit, { focus: true });
      renderRecommendedList();
    });
  });
  body.querySelectorAll('[data-override-delete]').forEach(button => {
    button.addEventListener('click', () => {
      const payload = getJonggaManualOverridePayload();
      delete payload.entries[button.dataset.overrideDelete];
      payload.updatedAt = new Date().toISOString();
      saveJonggaManualOverridePayload(payload);
      if (overrideSelectedCode === button.dataset.overrideDelete) {
        applyRecommendationSelection('', {});
      }
      renderManualOverrideTable();
      renderRecommendedList();
    });
  });
  renderManualOverridePreview();
}

function upsertManualOverrideFromForm() {
  const entry = buildManualOverrideEntryFromForm();
  if (!entry) {
    alert('추천 종목을 먼저 선택해주세요.');
    return;
  }
  const payload = getJonggaManualOverridePayload();
  payload.entries[entry.code] = entry;
  payload.updatedAt = new Date().toISOString();
  saveJonggaManualOverridePayload(payload);
  renderManualOverrideTable();
  renderRecommendedList();
  applyRecommendationSelection(entry.code);
  setOverrideStatus(`${entry.name || entry.code} 수동 입력을 저장했습니다.`);
}

function downloadManualOverrideJson() {
  const blob = new Blob([JSON.stringify(getJonggaManualOverridePayload(), null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = 'jongga_manual_overrides.json';
  anchor.click();
  URL.revokeObjectURL(href);
}

function copyManualOverrideJson() {
  const text = JSON.stringify(getJonggaManualOverridePayload(), null, 2);
  navigator.clipboard.writeText(text).then(() => {
    setOverrideStatus('JSON을 클립보드에 복사했습니다.');
  }).catch(() => {
    alert('클립보드 복사에 실패했습니다. 미리보기 영역에서 직접 복사해주세요.');
  });
}

function importManualOverrideFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = normalizeJonggaManualOverridePayload(JSON.parse(String(reader.result || '{}')));
      saveJonggaManualOverridePayload(payload);
      renderManualOverrideTable();
      renderRecommendedList();
      setOverrideStatus('수동 입력 JSON을 불러왔습니다.');
    } catch (error) {
      alert(`수동 입력 JSON을 불러오지 못했습니다: ${error.message}`);
    }
  };
  reader.readAsText(file, 'utf-8');
}

async function loadGeneratedPayloadForManualOverridePage() {
  if (typeof loadJonggaDailyScript !== 'function' || typeof getJonggaKstTodayKey !== 'function') return;
  const dateKey = getJonggaKstTodayKey();
  const variant = typeof getJonggaActiveVariant === 'function' ? getJonggaActiveVariant() : 'stable';
  try {
    await loadJonggaDailyScript(dateKey, variant);
  } catch (error) {
    console.warn(error);
    const variantLabel = typeof getJonggaVariantLabel === 'function' ? getJonggaVariantLabel(variant) : variant;
    setOverrideStatus(`${variantLabel} / ${dateKey} 기준 Jongga 데이터 파일을 찾지 못했습니다.`);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadGeneratedPayloadForManualOverridePage();
  renderGeneratedMeta();
  renderRecommendedList();
  renderManualOverrideTable();
  applyRecommendationSelection(overrideRecommendedEntries[0]?.code || '');
  document.getElementById('btn-override-save')?.addEventListener('click', upsertManualOverrideFromForm);
  document.getElementById('btn-override-reset')?.addEventListener('click', () => applyRecommendationSelection(overrideSelectedCode));
  document.getElementById('btn-override-copy')?.addEventListener('click', copyManualOverrideJson);
  document.getElementById('btn-override-download')?.addEventListener('click', downloadManualOverrideJson);
  document.getElementById('btn-override-clear-all')?.addEventListener('click', () => {
    if (!confirm('저장된 수동 입력을 모두 삭제할까요?')) return;
    clearJonggaManualOverridePayload();
    applyRecommendationSelection(overrideRecommendedEntries[0]?.code || '');
    renderManualOverrideTable();
    renderRecommendedList();
    setOverrideStatus('저장된 수동 입력을 모두 삭제했습니다.');
  });
  document.getElementById('override-import-file')?.addEventListener('change', event => {
    importManualOverrideFile(event.target.files?.[0]);
    event.target.value = '';
  });
});
