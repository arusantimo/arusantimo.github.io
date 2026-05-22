let jonggaLastPayload = null;
let jonggaLastValidation = null;
let jonggaLastLoadMeta = null;

function getJonggaQuality(payload = {}) {
  const source = payload && typeof payload === 'object' ? payload : {};
  return source.dataQuality || source.quality || {};
}

function getJonggaProviderHealth(payload = {}) {
  const source = payload && typeof payload === 'object' ? payload : {};
  return source.providerHealth || source.dataQuality?.providerHealth || {};
}

function getJonggaFallbackUsage(payload = {}) {
  const source = payload && typeof payload === 'object' ? payload : {};
  return source.fallbackUsage || source.dataQuality?.fallbackUsage || [];
}

function getJonggaCollectionLog(payload = {}) {
  const source = payload && typeof payload === 'object' ? payload : {};
  const rows = source.collectionLog || source.dataQuality?.collectionLog || [];
  return Array.isArray(rows) ? rows : [];
}

function getJonggaQualityBadgeMeta(payload = jonggaLastPayload) {
  const status = String(getJonggaQuality(payload).status || 'unknown').toLowerCase();
  if (status === 'complete') return { label: 'complete', tone: 'complete' };
  if (status === 'partial') return { label: 'partial', tone: 'partial' };
  if (status === 'failed') return { label: 'failed', tone: 'failed' };
  return { label: '미확인', tone: 'unknown' };
}

function updateJonggaQualityHeader() {
  const toggleButton = document.getElementById('btn-jongga-quality-toggle');
  const panel = document.getElementById('jongga-quality-panel');
  const badge = document.getElementById('jongga-quality-current-badge');
  const meta = getJonggaQualityBadgeMeta();

  if (toggleButton) {
    toggleButton.textContent = isJonggaQualityCollapsed ? '+' : '-';
    toggleButton.setAttribute('aria-expanded', String(!isJonggaQualityCollapsed));
    toggleButton.setAttribute('title', isJonggaQualityCollapsed ? 'JSON 데이터 품질 펼치기' : 'JSON 데이터 품질 접기');
  }

  if (panel) {
    panel.classList.toggle('is-collapsed', isJonggaQualityCollapsed);
  }

  if (badge) {
    badge.textContent = meta.label;
    badge.className = `quality-status ${meta.tone}`;
  }
}

function toggleJonggaQualityPanel() {
  isJonggaQualityCollapsed = !isJonggaQualityCollapsed;
  updateJonggaQualityHeader();
}

function updateJonggaCollectionLogToggle() {
  const button = document.getElementById('btn-jongga-collection-log-toggle');
  const panel = document.getElementById('jongga-collection-log-panel');
  if (button) {
    button.textContent = isJonggaCollectionLogCollapsed ? '+' : '-';
    button.setAttribute('aria-expanded', String(!isJonggaCollectionLogCollapsed));
    button.setAttribute('title', isJonggaCollectionLogCollapsed ? '데이터 수집 로그 펼치기' : '데이터 수집 로그 접기');
  }
  if (panel) {
    panel.classList.toggle('is-collapsed', isJonggaCollectionLogCollapsed);
  }
}

function toggleJonggaCollectionLog() {
  isJonggaCollectionLogCollapsed = !isJonggaCollectionLogCollapsed;
  updateJonggaCollectionLogToggle();
}

function getJonggaGeneratedAtText(payload = jonggaLastPayload) {
  const generatedAt = String(payload?.generatedAt || '').trim();
  if (!generatedAt) return '미확인';

  const date = new Date(generatedAt);
  if (Number.isNaN(date.getTime())) return generatedAt;
  return date.toLocaleString('ko-KR', { hour12: false });
}

function renderJonggaQualityPanel() {
  const panel = document.getElementById('jongga-quality-panel');
  if (!panel) return;
  if (!jonggaLastPayload) {
    panel.innerHTML = '<div class="quality-empty">JSON을 불러오면 데이터 품질, provider health, fallback 사용 내역이 표시됩니다.</div>';
    updateJonggaQualityHeader();
    return;
  }

  const quality = getJonggaQuality(jonggaLastPayload);
  const health = getJonggaProviderHealth(jonggaLastPayload);
  const fallbackUsage = getJonggaFallbackUsage(jonggaLastPayload);
  const collectionLog = getJonggaCollectionLog(jonggaLastPayload);
  const validation = jonggaLastValidation || { errors: [], warnings: [], safetyBlocks: [], summary: {} };
  const counts = quality.counts || {};
  const manualOverrideCount = typeof getJonggaManualOverrideCount === 'function' ? getJonggaManualOverrideCount() : 0;
  const generatedAtText = getJonggaGeneratedAtText(jonggaLastPayload);

  panel.innerHTML = `
    <div class="quality-line muted">수집 시각: ${escapeHtml(generatedAtText)}</div>
    <div class="quality-grid">
      <div class="quality-card"><strong>${validation.summary?.buyCount || 0}</strong><span>매수 후보</span></div>
      <div class="quality-card"><strong>${counts.fallback || 0}</strong><span>fallback</span></div>
      <div class="quality-card"><strong>${counts.stale || 0}</strong><span>stale cache</span></div>
      <div class="quality-card"><strong>${manualOverrideCount}</strong><span>수동 입력</span></div>
      <div class="quality-card"><strong>${validation.safetyBlocks.length}</strong><span>안전 차단</span></div>
    </div>
    ${manualOverrideCount ? `<div class="quality-line info">브라우저 수동 입력 ${manualOverrideCount}건이 현재 JSON에 겹쳐 적용됩니다.</div>` : ''}
    ${renderJonggaValidationList(validation)}
    ${renderJonggaHealthList(health)}
    ${renderJonggaFallbackList(fallbackUsage)}
    ${renderJonggaCollectionLogSection(collectionLog)}
  `;
  document.getElementById('btn-jongga-collection-log-toggle')?.addEventListener('click', toggleJonggaCollectionLog);
  updateJonggaCollectionLogToggle();
  updateJonggaQualityHeader();
}

function renderJonggaValidationList(validation) {
  const rows = [
    ...validation.errors.map(message => ({ tone: 'error', message })),
    ...validation.safetyBlocks.map(message => ({ tone: 'block', message })),
    ...validation.warnings.map(message => ({ tone: 'warn', message }))
  ];
  if (!rows.length) return '<div class="quality-line ok">검증 결과: 구조 오류 없음</div>';
  return `
    <div class="quality-list">
      ${rows.slice(0, 8).map(row => `<div class="quality-line ${row.tone}">${escapeHtml(row.message)}</div>`).join('')}
      ${rows.length > 8 ? `<div class="quality-line warn">외 ${rows.length - 8}건 생략</div>` : ''}
    </div>
  `;
}

function renderJonggaHealthList(health) {
  const entries = Object.entries(health || {});
  if (!entries.length) return '<div class="quality-line muted">providerHealth 없음</div>';
  return `
    <div class="quality-section-label">Provider Health</div>
    <div class="quality-pills">
      ${entries.map(([provider, info]) => `
        <span class="quality-pill">
          ${escapeHtml(provider)}
          <b>ok ${Number(info.ok || 0)}</b>
          <b>fail ${Number(info.failed || info.fail || 0)}</b>
        </span>
      `).join('')}
    </div>
  `;
}

function renderJonggaFallbackList(fallbackUsage) {
  const rows = asJonggaArray(fallbackUsage);
  if (!rows.length) return '<div class="quality-line muted">fallback 사용 없음</div>';
  return `
    <div class="quality-section-label">Fallback Usage</div>
    <div class="quality-list compact">
      ${rows.slice(0, 8).map(row => `
        <div class="quality-line fallback">
          ${escapeHtml(row.key || row.metric || 'unknown')} · ${escapeHtml(row.provider || '')}
          · L${escapeHtml(row.fallbackLevel || row.level || '')}
          · confidence ${escapeHtml(row.confidence ?? '-')}
          ${row.stale ? ' · stale' : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function renderJonggaCollectionLogSection(collectionLog) {
  const rows = asJonggaArray(collectionLog);
  const count = rows.length;
  return `
    <div class="quality-log-section">
      <div class="quality-log-toggle-row">
        <button id="btn-jongga-collection-log-toggle" type="button" class="section-toggle" aria-expanded="false" aria-controls="jongga-collection-log-panel" title="데이터 수집 로그 펼치기">+</button>
        <div class="quality-log-toggle-copy">
          <span class="quality-section-label inline">데이터 수집 로그</span>
          <span class="quality-log-count">${count}단계</span>
        </div>
      </div>
      <div id="jongga-collection-log-panel" class="quality-log-panel is-collapsed">
        ${count ? renderJonggaCollectionLogRows(rows) : '<div class="quality-line muted">수집 로그 없음</div>'}
      </div>
    </div>
  `;
}

function renderJonggaCollectionLogRows(rows) {
  return `
    <div class="quality-log-list">
      ${rows.map(row => {
        const tone = String(row.status || 'ok').toLowerCase();
        const durationMs = Number(row.durationMs);
        const detail = String(row.detail || '').trim();
        const countText = row.count !== undefined && row.count !== null ? ` · ${escapeHtml(String(row.count))}건` : '';
        return `
          <div class="quality-log-item">
            <span class="quality-log-status ${escapeHtml(tone)}">${escapeHtml(tone)}</span>
            <strong class="quality-log-label">${escapeHtml(String(row.label || row.step || 'unknown'))}</strong>
            ${detail || countText ? `<span class="quality-log-detail">${escapeHtml(detail)}${countText}</span>` : ''}
            <span class="quality-log-duration">${Number.isFinite(durationMs) ? `${durationMs.toFixed(1)}ms` : '-'}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function loadJonggaPayload(payload, meta = {}) {
  const effectivePayload = typeof applyJonggaManualOverridesToPayload === 'function'
    ? applyJonggaManualOverridesToPayload(payload)
    : payload;
  const validation = validateJonggaResult(effectivePayload);
  jonggaLastPayload = effectivePayload;
  jonggaLastValidation = validation;
  jonggaLastLoadMeta = { ...meta, loadedAt: new Date().toISOString() };
  renderJonggaQualityPanel();
  if (!validation.ok) {
    throw new Error(validation.errors.join('\n'));
  }

  const totalBuy = applyJonggaResultToState(effectivePayload);
  renderAll();
  restoreAnalysisArchiveState();
  renderJonggaQualityPanel();
  log(`✅ Jongga JSON 적용 완료. (매수 후보 ${totalBuy}개, 안전 차단 ${validation.safetyBlocks.length}건)`);
  if (typeof getJonggaManualOverrideCount === 'function' && getJonggaManualOverrideCount() > 0) {
    log(`ℹ️ 브라우저 수동 입력 ${getJonggaManualOverrideCount()}건을 현재 JSON 위에 반영했습니다.`);
  }
  if (validation.safetyBlocks.length) {
    log(`<span style="color:var(--text-warning)">⚠️ 핵심 Gate/갭/품질 근거 부족 후보는 자동매수 금지로 낮춰 표시했습니다.</span>`);
  }
  return validation;
}

function bindJonggaLoaderControls() {
  document.getElementById('btn-jongga-quality-toggle')?.addEventListener('click', toggleJonggaQualityPanel);
  if (typeof bindJonggaDailyControls === 'function') bindJonggaDailyControls();
  renderJonggaQualityPanel();
  updateJonggaQualityHeader();
}

function loadInitialJonggaData() {
  if (typeof loadJonggaDailyData === 'function') {
    loadJonggaDailyData();
    return;
  }
  log('<span style="color:var(--text-danger)">날짜별 Jongga 로더를 찾지 못했습니다. js/jongga-daily.js 로드 순서를 확인하세요.</span>');
}
