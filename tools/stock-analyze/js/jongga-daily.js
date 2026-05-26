const JONGGA_MANUAL_JSON_STORAGE_KEY = 'stockAnalyzeJonggaManualJsonByDateVariantV1';
const JONGGA_LEGACY_MANUAL_JSON_STORAGE_KEY = 'stockAnalyzeJonggaManualJsonByDateV1';
const JONGGA_ACTIVE_VARIANT_STORAGE_KEY = 'stockAnalyzeJonggaActiveVariantV1';
const JONGGA_VARIANTS = ['stable', 'canary'];
const JONGGA_VARIANT_LABELS = {
  stable: '현재 버전',
  canary: '카나리'
};
const JONGGA_DAILY_NAMESPACES = {
  stable: 'JONGGA_DAILY_DATA',
  canary: 'JONGGA_CANARY_DAILY_DATA'
};

let jonggaDailyControlsBound = false;
let activeJonggaVariant = readStoredJonggaVariant();
const jonggaDailyScriptPromises = {};
const jonggaDailyLoadPromises = {};
const jonggaDailyNoticeState = {};
const jonggaVariantAvailability = {
  stable: { available: null },
  canary: { available: null }
};

function normalizeJonggaVariant(value) {
  return String(value || '').trim().toLowerCase() === 'canary' ? 'canary' : 'stable';
}

function getJonggaVariantLabel(value) {
  return JONGGA_VARIANT_LABELS[normalizeJonggaVariant(value)];
}

function getJonggaDailyNamespace(value) {
  return JONGGA_DAILY_NAMESPACES[normalizeJonggaVariant(value)];
}

function buildJonggaManualJsonSlotKey(dateKey, variant = getJonggaActiveVariant()) {
  return `${dateKey}::${normalizeJonggaVariant(variant)}`;
}

function buildJonggaVariantDateKey(dateKey, variant = getJonggaActiveVariant()) {
  return `${dateKey}::${normalizeJonggaVariant(variant)}`;
}

function readStoredJonggaVariant() {
  try {
    return normalizeJonggaVariant(localStorage.getItem(JONGGA_ACTIVE_VARIANT_STORAGE_KEY) || 'stable');
  } catch {
    return 'stable';
  }
}

function getJonggaActiveVariant() {
  activeJonggaVariant = normalizeJonggaVariant(activeJonggaVariant);
  return activeJonggaVariant;
}

function getJonggaActiveVariantInfo() {
  const variant = getJonggaActiveVariant();
  return { variant, label: getJonggaVariantLabel(variant) };
}

function persistJonggaActiveVariant(variant) {
  activeJonggaVariant = normalizeJonggaVariant(variant);
  try {
    localStorage.setItem(JONGGA_ACTIVE_VARIANT_STORAGE_KEY, activeJonggaVariant);
  } catch {}
  return activeJonggaVariant;
}

function markJonggaVariantAvailability(variant, available) {
  jonggaVariantAvailability[normalizeJonggaVariant(variant)] = { available };
  updateJonggaVariantControls();
}

function updateJonggaVariantControls() {
  const activeVariant = getJonggaActiveVariant();
  document.querySelectorAll('[data-jongga-variant]').forEach(button => {
    const variant = normalizeJonggaVariant(button.dataset.jonggaVariant);
    const availability = jonggaVariantAvailability[variant]?.available;
    button.classList.toggle('active', variant === activeVariant);
    button.disabled = availability === false && variant !== activeVariant;
    button.classList.toggle('is-disabled', availability === false && variant !== activeVariant);
    button.title = availability === false
      ? `${getJonggaVariantLabel(variant)} 데이터 파일이 아직 없습니다.`
      : `${getJonggaVariantLabel(variant)} 결과를 불러옵니다.`;
  });
}

function setActiveJonggaVariant(nextVariant, { persist = true, reload = true, dateKey = getJonggaKstTodayKey() } = {}) {
  const currentVariant = getJonggaActiveVariant();
  const variant = persist ? persistJonggaActiveVariant(nextVariant) : normalizeJonggaVariant(nextVariant);
  if (!persist) activeJonggaVariant = variant;
  if (variant === currentVariant) {
    updateJonggaVariantControls();
    return variant;
  }
  updateJonggaVariantControls();
  if (reload) {
    loadJonggaDailyData(dateKey, variant);
  }
  return variant;
}

function getJonggaKstTodayKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now).reduce((acc, part) => {
    if (part.type !== 'literal') acc[part.type] = part.value;
    return acc;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function getJonggaCompactDate(dateKey) {
  return String(dateKey || '').replace(/-/g, '');
}

function getJonggaDailyScriptPath(dateKey = getJonggaKstTodayKey(), variant = getJonggaActiveVariant()) {
  const suffix = normalizeJonggaVariant(variant) === 'canary' ? '_canary' : '';
  return `jongga/output/jongga_data_${getJonggaCompactDate(dateKey)}${suffix}.js`;
}

function loadJonggaScriptOnce(src) {
  if (jonggaDailyScriptPromises[src]) return jonggaDailyScriptPromises[src];
  jonggaDailyScriptPromises[src] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve(src);
    script.onerror = () => reject(new Error(`script load failed: ${src}`));
    document.head.appendChild(script);
  });
  return jonggaDailyScriptPromises[src];
}

function readJonggaDailyPayload(dateKey, variant = getJonggaActiveVariant()) {
  const namespace = getJonggaDailyNamespace(variant);
  const daily = window[namespace];
  return daily && typeof daily === 'object' ? daily[dateKey] : null;
}

async function loadJonggaDailyScript(dateKey = getJonggaKstTodayKey(), variant = getJonggaActiveVariant()) {
  await loadJonggaScriptOnce(getJonggaDailyScriptPath(dateKey, variant));
  return readJonggaDailyPayload(dateKey, variant);
}

function readJonggaManualJsonMap() {
  try {
    const parsed = JSON.parse(localStorage.getItem(JONGGA_MANUAL_JSON_STORAGE_KEY) || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function readLegacyJonggaManualJsonMap() {
  try {
    const parsed = JSON.parse(localStorage.getItem(JONGGA_LEGACY_MANUAL_JSON_STORAGE_KEY) || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function readJonggaManualJsonForDate(dateKey = getJonggaKstTodayKey(), variant = getJonggaActiveVariant()) {
  const resolvedVariant = normalizeJonggaVariant(variant);
  const slotPayload = readJonggaManualJsonMap()[buildJonggaManualJsonSlotKey(dateKey, resolvedVariant)];
  if (slotPayload && typeof slotPayload === 'object') return slotPayload;
  if (resolvedVariant === 'stable') {
    const legacyPayload = readLegacyJonggaManualJsonMap()[dateKey];
    return legacyPayload && typeof legacyPayload === 'object' ? legacyPayload : null;
  }
  return null;
}

function saveJonggaManualJsonForDate(dateKey, payload, variant = getJonggaActiveVariant()) {
  const resolvedVariant = normalizeJonggaVariant(variant);
  const map = readJonggaManualJsonMap();
  const slotKey = buildJonggaManualJsonSlotKey(dateKey, resolvedVariant);
  map[slotKey] = {
    ...payload,
    analysisDate: dateKey,
    variant: resolvedVariant,
    manualSavedAt: new Date().toISOString()
  };
  localStorage.setItem(JONGGA_MANUAL_JSON_STORAGE_KEY, JSON.stringify(map));
  markJonggaVariantAvailability(resolvedVariant, true);
  return map[slotKey];
}

function validateManualJonggaPayloadForDate(payload, dateKey, variant = getJonggaActiveVariant()) {
  const resolvedVariant = normalizeJonggaVariant(variant);
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('JSON 객체가 필요합니다.');
  }
  const next = JSON.parse(JSON.stringify(payload));
  if (!next.analysisDate) next.analysisDate = dateKey;
  if (next.analysisDate !== dateKey) {
    throw new Error(`analysisDate가 오늘(${dateKey})과 다릅니다: ${next.analysisDate}`);
  }
  if (!next.variant) next.variant = resolvedVariant;
  if (normalizeJonggaVariant(next.variant) !== resolvedVariant) {
    throw new Error(`variant가 현재 채널(${resolvedVariant})과 다릅니다: ${next.variant}`);
  }
  const validation = validateJonggaResult(next);
  if (!validation.ok) {
    throw new Error(validation.errors.join('\n') || 'jongga_result.v1 검증 실패');
  }
  return next;
}

function formatJonggaStatusTime(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
}

function logJonggaDailyNotice(kind, dateKey, variant, message, detail = '') {
  if (typeof log !== 'function') return;
  const slotKey = buildJonggaVariantDateKey(dateKey, variant);
  const nextState = `${kind}:${detail}`;
  if (jonggaDailyNoticeState[slotKey] === nextState) return;
  jonggaDailyNoticeState[slotKey] = nextState;
  log(message);
}

function clearJonggaDailyNotice(dateKey, variant) {
  delete jonggaDailyNoticeState[buildJonggaVariantDateKey(dateKey, variant)];
}

function setJonggaTodayStatus(state, dateKey = getJonggaKstTodayKey(), detail = '', timeValue = '', variant = getJonggaActiveVariant()) {
  const target = document.getElementById('jongga-today-status');
  const button = document.getElementById('btn-open-jongga-json-modal');
  const statusTime = ['loaded', 'manual'].includes(state) ? formatJonggaStatusTime(timeValue) : '';
  const timeSuffix = statusTime ? ` ${statusTime}` : '';
  const variantLabel = getJonggaVariantLabel(variant);
  const labels = {
    loading: `${variantLabel} 데이터 확인 중: ${dateKey}`,
    loaded: `${variantLabel} 데이터: ${dateKey}${timeSuffix} 로드 완료`,
    manual: `${variantLabel} 직접 입력 데이터 사용 중: ${dateKey}${timeSuffix}`,
    missing: `${variantLabel} 데이터 없음: ${dateKey}`,
    error: `${variantLabel} 데이터 오류: ${dateKey}`
  };
  if (target) {
    target.textContent = labels[state] || labels.missing;
    target.className = `today-data-status ${state || 'unknown'}`;
    target.title = detail || '';
  }
  if (button) {
    button.classList.toggle('is-hidden', state === 'loaded' || state === 'loading');
  }
}

async function checkJonggaVariantAvailability(dateKey, variant) {
  const resolvedVariant = normalizeJonggaVariant(variant);
  if (readJonggaManualJsonForDate(dateKey, resolvedVariant)) {
    markJonggaVariantAvailability(resolvedVariant, true);
    return true;
  }
  try {
    const payload = await loadJonggaDailyScript(dateKey, resolvedVariant);
    const available = Boolean(payload && payload.analysisDate === dateKey);
    markJonggaVariantAvailability(resolvedVariant, available);
    return available;
  } catch {
    markJonggaVariantAvailability(resolvedVariant, false);
    return false;
  }
}

async function refreshJonggaVariantAvailability(dateKey = getJonggaKstTodayKey(), currentVariant = getJonggaActiveVariant()) {
  const others = JONGGA_VARIANTS.filter(variant => normalizeJonggaVariant(variant) !== normalizeJonggaVariant(currentVariant));
  for (const variant of others) {
    await checkJonggaVariantAvailability(dateKey, variant);
  }
}

async function loadJonggaDailyData(dateKey = getJonggaKstTodayKey(), variant = getJonggaActiveVariant()) {
  const resolvedVariant = normalizeJonggaVariant(variant);
  const loadKey = buildJonggaVariantDateKey(dateKey, resolvedVariant);
  if (jonggaDailyLoadPromises[loadKey]) return jonggaDailyLoadPromises[loadKey];
  jonggaDailyLoadPromises[loadKey] = (async () => {
  persistJonggaActiveVariant(resolvedVariant);
  updateJonggaVariantControls();
  const scriptPath = getJonggaDailyScriptPath(dateKey, resolvedVariant);
  setJonggaTodayStatus('loading', dateKey, '', '', resolvedVariant);
  try {
    if (typeof loadMarketAnalyzeScriptOnce === 'function') {
      await loadMarketAnalyzeScriptOnce().catch(error => console.warn('market-analyze latest.js load skipped:', error));
    }
    const payload = await loadJonggaDailyScript(dateKey, resolvedVariant);
    if (!payload) throw new Error(`${scriptPath}에 ${dateKey} payload가 없습니다.`);
    if (payload.analysisDate !== dateKey) {
      throw new Error(`analysisDate mismatch: ${payload.analysisDate || 'missing'}`);
    }
    const validation = validateJonggaResult(payload);
    if (!validation.ok) throw new Error(validation.errors.join('\n') || 'jongga_result.v1 검증 실패');
    loadJonggaPayload(payload, { source: scriptPath, analysisDate: dateKey, mode: 'daily-js', variant: resolvedVariant });
    markJonggaVariantAvailability(resolvedVariant, true);
    clearJonggaDailyNotice(dateKey, resolvedVariant);
    setJonggaTodayStatus('loaded', dateKey, scriptPath, payload.generatedAt, resolvedVariant);
    refreshJonggaVariantAvailability(dateKey, resolvedVariant);
    return { source: 'daily-js', payload };
  } catch (error) {
    console.warn(error);
    logJonggaDailyNotice(
      'autoload-failed',
      dateKey,
      resolvedVariant,
      `<span style="color:var(--text-warning)">${getJonggaVariantLabel(resolvedVariant)} 데이터 파일을 자동 적용하지 못했습니다: ${escapeHtml(error.message)}</span>`,
      error.message,
    );
  }

  const manualPayload = readJonggaManualJsonForDate(dateKey, resolvedVariant);
  if (manualPayload) {
    try {
      const validated = validateManualJonggaPayloadForDate(manualPayload, dateKey, resolvedVariant);
      loadJonggaPayload(validated, { source: 'localStorage manual JSON', analysisDate: dateKey, mode: 'manual-json', variant: resolvedVariant });
      markJonggaVariantAvailability(resolvedVariant, true);
      clearJonggaDailyNotice(dateKey, resolvedVariant);
      setJonggaTodayStatus('manual', dateKey, '', validated.manualSavedAt, resolvedVariant);
      refreshJonggaVariantAvailability(dateKey, resolvedVariant);
      return { source: 'manual-json', payload: validated };
    } catch (error) {
      console.error(error);
      markJonggaVariantAvailability(resolvedVariant, false);
      setJonggaTodayStatus('error', dateKey, error.message, '', resolvedVariant);
      if (typeof clearJonggaLoadedState === 'function') {
        clearJonggaLoadedState({
          variant: resolvedVariant,
          analysisDate: dateKey,
          reason: error.message
        });
      }
      return null;
    }
  }

  markJonggaVariantAvailability(resolvedVariant, false);
  setJonggaTodayStatus('missing', dateKey, scriptPath, '', resolvedVariant);
  if (typeof clearJonggaLoadedState === 'function') {
    clearJonggaLoadedState({
      variant: resolvedVariant,
      analysisDate: dateKey,
      reason: scriptPath
    });
  }
  logJonggaDailyNotice(
    'missing',
    dateKey,
    resolvedVariant,
    `<span style="color:var(--text-warning)">오늘(${dateKey}) ${getJonggaVariantLabel(resolvedVariant)} Jongga 데이터가 없습니다. 직접 JSON 입력을 사용할 수 있습니다.</span>`,
    scriptPath,
  );
  refreshJonggaVariantAvailability(dateKey, resolvedVariant);
  return null;
  })();
  try {
    return await jonggaDailyLoadPromises[loadKey];
  } finally {
    delete jonggaDailyLoadPromises[loadKey];
  }
}

function openJonggaJsonInputModal() {
  const dateKey = getJonggaKstTodayKey();
  const variantInfo = getJonggaActiveVariantInfo();
  const overlay = document.getElementById('jongga-json-input-overlay');
  const textarea = document.getElementById('jongga-json-input-text');
  const dateLabel = document.getElementById('jongga-json-input-date-label');
  if (dateLabel) {
    dateLabel.textContent = `${variantInfo.label} / ${dateKey} 기준 jongga_result.v1 JSON을 붙여넣습니다.`;
  }
  if (textarea) {
    textarea.value = JSON.stringify(readJonggaManualJsonForDate(dateKey, variantInfo.variant) || {}, null, 2);
  }
  showJonggaJsonInputError('');
  overlay?.classList.add('open');
  syncBodyScrollLock();
  textarea?.focus();
}

function closeJonggaJsonInputModal() {
  document.getElementById('jongga-json-input-overlay')?.classList.remove('open');
  syncBodyScrollLock();
}

function showJonggaJsonInputError(message) {
  const target = document.getElementById('jongga-json-input-error');
  if (!target) return;
  target.textContent = message || '';
  target.classList.toggle('is-hidden', !message);
}

function applyJonggaJsonInput() {
  const dateKey = getJonggaKstTodayKey();
  const variant = getJonggaActiveVariant();
  const text = document.getElementById('jongga-json-input-text')?.value || '';
  try {
    const payload = validateManualJonggaPayloadForDate(JSON.parse(text), dateKey, variant);
    const saved = saveJonggaManualJsonForDate(dateKey, payload, variant);
    loadJonggaPayload(saved, { source: 'localStorage manual JSON', analysisDate: dateKey, mode: 'manual-json', variant });
    setJonggaTodayStatus('manual', dateKey, '', saved.manualSavedAt, variant);
    closeJonggaJsonInputModal();
  } catch (error) {
    showJonggaJsonInputError(error.message);
  }
}

function openJonggaHistoryModal() {
  renderJonggaHistoryModal();
  document.getElementById('jongga-history-overlay')?.classList.add('open');
  syncBodyScrollLock();
}

function closeJonggaHistoryModal() {
  document.getElementById('jongga-history-overlay')?.classList.remove('open');
  syncBodyScrollLock();
}

function getJonggaHistoryEntries(variant = getJonggaActiveVariant()) {
  const resolvedVariant = normalizeJonggaVariant(variant);
  const entries = Array.isArray(window.JONGGA_HISTORY_INDEX) ? window.JONGGA_HISTORY_INDEX : [];
  return [...entries]
    .filter(entry => normalizeJonggaVariant(entry.variant || 'stable') === resolvedVariant)
    .sort((left, right) => String(right.date || '').localeCompare(String(left.date || '')));
}

function renderJonggaHistoryModal() {
  const body = document.getElementById('jongga-history-body');
  if (!body) return;
  const variantInfo = getJonggaActiveVariantInfo();
  const entries = getJonggaHistoryEntries(variantInfo.variant);
  if (!entries.length) {
    body.innerHTML = `<div class="history-empty">${variantInfo.label} 기준 jongga_history.js에 이전 분석 기록이 없습니다.</div>`;
    return;
  }
  body.innerHTML = `<div class="history-list">${entries.map(renderJonggaHistoryItem).join('')}</div>`;
}

function renderJonggaHistoryItem(entry) {
  const recommendations = Array.isArray(entry.topRecommendations) ? entry.topRecommendations : [];
  const variant = normalizeJonggaVariant(entry.variant || 'stable');
  return `
    <section class="history-item">
      <div class="history-head">
        <div>
          <div class="history-date">
            ${escapeHtml(entry.date || '날짜 없음')}
            <span class="history-variant-badge ${escapeHtml(variant)}">${escapeHtml(entry.variantLabel || getJonggaVariantLabel(variant))}</span>
          </div>
          <div class="history-meta">생성 ${escapeHtml(formatJonggaHistoryDate(entry.generatedAt))} · 추천 ${Number(entry.buyCount || 0)}개</div>
        </div>
        <span class="quality-status ${escapeHtml(String(entry.status || 'unknown').toLowerCase())}">${escapeHtml(entry.status || 'unknown')}</span>
      </div>
      ${recommendations.length ? `<div class="history-recommendations">${recommendations.slice(0, 10).map(renderJonggaHistoryRecommendation).join('')}</div>` : '<div class="history-empty">상위 추천 요약 없음</div>'}
    </section>
  `;
}

function renderJonggaHistoryRecommendation(item) {
  const score = Number.isFinite(Number(item.score)) ? Number(item.score).toFixed(1) : '-';
  const strategy = ({ pullback: '눌림목', momentum: '수급', reversal: '반등', swing: '스윙' })[item.strategy] || item.strategy || '-';
  return `
    <div class="history-rec">
      <strong>${escapeHtml(item.name || '종목명 없음')} (${escapeHtml(item.code || '-')})</strong>
      <span>${escapeHtml(strategy)} · ${score}점 · ${escapeHtml(item.grade || '-')} · ${escapeHtml(item.statusLabel || '-')}</span>
    </div>
  `;
}

function formatJonggaHistoryDate(value) {
  if (!value) return '미확인';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString('ko-KR', { hour12: false });
}

function bindJonggaDailyControls() {
  if (jonggaDailyControlsBound) return;
  jonggaDailyControlsBound = true;
  document.getElementById('btn-open-jongga-json-modal')?.addEventListener('click', openJonggaJsonInputModal);
  document.getElementById('btn-open-jongga-history-modal')?.addEventListener('click', openJonggaHistoryModal);
  document.getElementById('jongga-json-input-close-btn')?.addEventListener('click', closeJonggaJsonInputModal);
  document.getElementById('btn-cancel-jongga-json-input')?.addEventListener('click', closeJonggaJsonInputModal);
  document.getElementById('btn-apply-jongga-json-input')?.addEventListener('click', applyJonggaJsonInput);
  document.getElementById('jongga-history-close-btn')?.addEventListener('click', closeJonggaHistoryModal);
  document.getElementById('jongga-json-input-overlay')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeJonggaJsonInputModal();
  });
  document.getElementById('jongga-history-overlay')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeJonggaHistoryModal();
  });
  document.querySelectorAll('[data-jongga-variant]').forEach(button => {
    button.addEventListener('click', () => setActiveJonggaVariant(button.dataset.jonggaVariant));
  });
  updateJonggaVariantControls();
  setJonggaTodayStatus('loading', getJonggaKstTodayKey(), '', '', getJonggaActiveVariant());
}
