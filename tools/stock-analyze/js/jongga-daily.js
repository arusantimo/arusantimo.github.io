const JONGGA_MANUAL_JSON_STORAGE_KEY = 'stockAnalyzeJonggaManualJsonByDateV1';

let jonggaDailyControlsBound = false;
const jonggaDailyScriptPromises = {};

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

function getJonggaDailyScriptPath(dateKey = getJonggaKstTodayKey()) {
  return `jongga/output/jongga_data_${getJonggaCompactDate(dateKey)}.js`;
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

function readJonggaDailyPayload(dateKey) {
  const daily = window.JONGGA_DAILY_DATA;
  return daily && typeof daily === 'object' ? daily[dateKey] : null;
}

async function loadJonggaDailyScript(dateKey = getJonggaKstTodayKey()) {
  await loadJonggaScriptOnce(getJonggaDailyScriptPath(dateKey));
  return readJonggaDailyPayload(dateKey);
}

function readJonggaManualJsonMap() {
  try {
    const parsed = JSON.parse(localStorage.getItem(JONGGA_MANUAL_JSON_STORAGE_KEY) || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function readJonggaManualJsonForDate(dateKey = getJonggaKstTodayKey()) {
  const payload = readJonggaManualJsonMap()[dateKey];
  return payload && typeof payload === 'object' ? payload : null;
}

function saveJonggaManualJsonForDate(dateKey, payload) {
  const map = readJonggaManualJsonMap();
  map[dateKey] = {
    ...payload,
    analysisDate: dateKey,
    manualSavedAt: new Date().toISOString()
  };
  localStorage.setItem(JONGGA_MANUAL_JSON_STORAGE_KEY, JSON.stringify(map));
  return map[dateKey];
}

function validateManualJonggaPayloadForDate(payload, dateKey) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('JSON 객체가 필요합니다.');
  }
  const next = JSON.parse(JSON.stringify(payload));
  if (!next.analysisDate) next.analysisDate = dateKey;
  if (next.analysisDate !== dateKey) {
    throw new Error(`analysisDate가 오늘(${dateKey})과 다릅니다: ${next.analysisDate}`);
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

function setJonggaTodayStatus(state, dateKey = getJonggaKstTodayKey(), detail = '', timeValue = '') {
  const target = document.getElementById('jongga-today-status');
  const button = document.getElementById('btn-open-jongga-json-modal');
  const statusTime = ['loaded', 'manual'].includes(state) ? formatJonggaStatusTime(timeValue) : '';
  const timeSuffix = statusTime ? ` ${statusTime}` : '';
  const labels = {
    loading: `금일 데이터 확인 중: ${dateKey}`,
    loaded: `금일 데이터: ${dateKey}${timeSuffix} 로드 완료`,
    manual: `직접 입력 데이터 사용 중: ${dateKey}${timeSuffix}`,
    missing: `금일 데이터 없음: ${dateKey}`,
    error: `금일 데이터 오류: ${dateKey}`
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

async function loadJonggaDailyData(dateKey = getJonggaKstTodayKey()) {
  const scriptPath = getJonggaDailyScriptPath(dateKey);
  setJonggaTodayStatus('loading', dateKey);
  try {
    const payload = await loadJonggaDailyScript(dateKey);
    if (!payload) throw new Error(`${scriptPath}에 ${dateKey} payload가 없습니다.`);
    if (payload.analysisDate !== dateKey) {
      throw new Error(`analysisDate mismatch: ${payload.analysisDate || 'missing'}`);
    }
    const validation = validateJonggaResult(payload);
    if (!validation.ok) throw new Error(validation.errors.join('\n') || 'jongga_result.v1 검증 실패');
    loadJonggaPayload(payload, { source: scriptPath, analysisDate: dateKey, mode: 'daily-js' });
    setJonggaTodayStatus('loaded', dateKey, scriptPath, payload.generatedAt);
    return { source: 'daily-js', payload };
  } catch (error) {
    console.warn(error);
    log(`<span style="color:var(--text-warning)">금일 데이터 파일을 자동 적용하지 못했습니다: ${escapeHtml(error.message)}</span>`);
  }

  const manualPayload = readJonggaManualJsonForDate(dateKey);
  if (manualPayload) {
    try {
      const validated = validateManualJonggaPayloadForDate(manualPayload, dateKey);
      loadJonggaPayload(validated, { source: 'localStorage manual JSON', analysisDate: dateKey, mode: 'manual-json' });
      setJonggaTodayStatus('manual', dateKey, '', validated.manualSavedAt);
      return { source: 'manual-json', payload: validated };
    } catch (error) {
      console.error(error);
      setJonggaTodayStatus('error', dateKey, error.message);
      return null;
    }
  }

  setJonggaTodayStatus('missing', dateKey, scriptPath);
  log(`<span style="color:var(--text-warning)">오늘(${dateKey}) Jongga 데이터가 없습니다. 직접 JSON 입력을 사용할 수 있습니다.</span>`);
  return null;
}

function openJonggaJsonInputModal() {
  const dateKey = getJonggaKstTodayKey();
  const overlay = document.getElementById('jongga-json-input-overlay');
  const textarea = document.getElementById('jongga-json-input-text');
  const dateLabel = document.getElementById('jongga-json-input-date-label');
  if (dateLabel) dateLabel.textContent = `${dateKey} 기준 jongga_result.v1 JSON을 붙여넣습니다.`;
  if (textarea) textarea.value = JSON.stringify(readJonggaManualJsonForDate(dateKey) || {}, null, 2);
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
  const text = document.getElementById('jongga-json-input-text')?.value || '';
  try {
    const payload = validateManualJonggaPayloadForDate(JSON.parse(text), dateKey);
    const saved = saveJonggaManualJsonForDate(dateKey, payload);
    loadJonggaPayload(saved, { source: 'localStorage manual JSON', analysisDate: dateKey, mode: 'manual-json' });
    setJonggaTodayStatus('manual', dateKey, '', saved.manualSavedAt);
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

function getJonggaHistoryEntries() {
  const entries = Array.isArray(window.JONGGA_HISTORY_INDEX) ? window.JONGGA_HISTORY_INDEX : [];
  return [...entries].sort((left, right) => String(right.date || '').localeCompare(String(left.date || '')));
}

function renderJonggaHistoryModal() {
  const body = document.getElementById('jongga-history-body');
  if (!body) return;
  const entries = getJonggaHistoryEntries();
  if (!entries.length) {
    body.innerHTML = '<div class="history-empty">jongga_history.js에 이전 분석 기록이 없습니다.</div>';
    return;
  }
  body.innerHTML = `<div class="history-list">${entries.map(renderJonggaHistoryItem).join('')}</div>`;
}

function renderJonggaHistoryItem(entry) {
  const recommendations = Array.isArray(entry.topRecommendations) ? entry.topRecommendations : [];
  return `
    <section class="history-item">
      <div class="history-head">
        <div>
          <div class="history-date">${escapeHtml(entry.date || '날짜 없음')}</div>
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
  setJonggaTodayStatus('loading');
}
