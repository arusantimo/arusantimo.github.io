const JONGGA_REPLAY_STRATEGIES = [
  { key: 'pullback', label: '눌림목' },
  { key: 'accumulation', label: '수급 매집' },
  { key: 'breakout', label: '주도주 돌파' },
  { key: 'reversal', label: '급락 반등' }
];
const JONGGA_REPLAY_STRATEGY_ORDER = ['pullback', 'accumulation', 'breakout', 'reversal'];
const REPLAY_DAY_PAGE_SIZE = 5;

let currentReplayStrategy = null;
let replayStockSectionCollapsed = false;
let replayDayPageIndex = 0;

function getJonggaReplayBridge() {
  const payload = window.JONGGA_REPLAY_RUNS;
  return payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : null;
}

function getJonggaReplayAttempt(bridge = getJonggaReplayBridge()) {
  const attempt = bridge?.latestAttempt;
  return attempt && typeof attempt === 'object' && !Array.isArray(attempt)
    ? attempt
    : { status: bridge?.latestRun ? 'complete' : 'missing', message: '', generatedAt: '' };
}

function getJonggaReplayStatusMeta(bridge = getJonggaReplayBridge()) {
  const status = String(getJonggaReplayAttempt(bridge).status || 'missing').toLowerCase();
  if (status === 'complete') return { label: 'complete', tone: 'complete' };
  if (status === 'failed') return { label: 'failed', tone: 'failed' };
  if (status === 'missing') return { label: '없음', tone: 'unknown' };
  if (status === 'skipped') return { label: '생략', tone: 'unknown' };
  return { label: status || '미확인', tone: 'unknown' };
}

function getJonggaReplayVariantLabel(value) {
  if (typeof getJonggaVariantLabel === 'function') {
    return getJonggaVariantLabel(value);
  }
  return String(value || '');
}

function formatReplayDate(value) {
  const raw = String(value || '').trim();
  const dateOnly = raw.includes('T') ? raw.slice(0, 10) : raw;
  if (typeof formatCompactDate === 'function') {
    return formatCompactDate(dateOnly.replace(/-/g, ''));
  }
  return dateOnly;
}

function formatReplayPercent(value, digits = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  return `${num > 0 ? '+' : ''}${num.toFixed(digits)}%`;
}

function renderColoredPercent(value, digits = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  const formatted = `${num > 0 ? '+' : ''}${num.toFixed(digits)}%`;
  if (num > 0) return `<span class="pct-plus">${formatted}</span>`;
  if (num < 0) return `<span class="pct-minus">${formatted}</span>`;
  return formatted;
}

function formatReplayRate(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  return `${(num * 100).toFixed(1)}%`;
}

function formatReplayNumber(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0';
  return `${Math.round(num)}`;
}

function formatReplayPrice(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return '—';
  return `${Math.round(num).toLocaleString('ko-KR')}원`;
}

function formatReplayDateTime(value) {
  const raw = String(value || '').trim();
  if (!raw) return '—';
  const dateOnly = formatReplayDate(raw);
  const match = raw.match(/T(\d{2}:\d{2})/);
  return match ? `${dateOnly} ${match[1]}` : dateOnly;
}

function formatReplayQuantityPct(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  return `${num.toFixed(num % 1 === 0 ? 0 : 1)}%`;
}

function formatReplayMixedExitPercent(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '';
  return `${num > 0 ? '+' : ''}${num.toFixed(num % 1 === 0 ? 0 : 1)}%`;
}

function buildReplayMixedExitPolicySummary(policy = null) {
  if (!policy || typeof policy !== 'object') return '';
  const label = String(policy.label || (policy.active ? '혼합 전략' : '관찰 전용')).trim();
  if (!policy.active) {
    return `${label || '관찰 전용'} · ${String(policy.reason || '자동 진입 제외')}`;
  }
  const stages = Array.isArray(policy.takeProfitStages)
    ? policy.takeProfitStages
      .map(stage => {
        const target = formatReplayMixedExitPercent(stage?.targetPct);
        const quantity = Number(stage?.quantityPct);
        return target ? `${target} ${Number.isFinite(quantity) ? `${quantity.toFixed(0)}%` : ''}`.trim() : '';
      })
      .filter(Boolean)
      .join(' / ')
    : '';
  const stopCondition = String(policy.stopCondition || (
    Number.isFinite(Number(policy.stopPct)) ? `종가 기준 ${formatReplayMixedExitPercent(policy.stopPct)} 이탈` : ''
  ));
  const stopTiming = String(policy.stopTiming || (
    Number.isFinite(Number(policy.stopPct)) ? '종가 확인 후 전량 정리' : ''
  ));
  const weight = Number(policy.positionWeightMultiplier);
  const weightText = policy?.volatilityOverlay?.active && Number.isFinite(weight)
    ? ` · 비중 ${Math.round(weight * 100)}%`
    : '';
  const intradayRisk = policy?.intradayRiskRule?.active
    ? ` · 장중 방어: ${String(policy.intradayRiskRule.action || '부분 축소')} ${String(policy.intradayRiskRule.timing || '장중 확인')}`
    : '';
  return `${label || '혼합 전략'}${stages ? ` · ${stages}` : ''}${weightText} · 손절 조건: ${stopCondition} · 손절 시점: ${stopTiming}${intradayRisk}`;
}

function getReplayFillSourceEntryKey(fill = {}) {
  const explicit = String(fill?.sourceEntryKey || '').trim();
  if (explicit) return explicit;
  const orderId = String(fill?.orderId || '').trim();
  const lastDash = orderId.lastIndexOf('-');
  return lastDash > 0 ? orderId.slice(0, lastDash) : '';
}

function getReplayTradeKey(item = {}) {
  return [
    String(item?.date || '').trim(),
    String(item?.sourceEntryKey || '').trim(),
    String(item?.code || '').trim(),
  ].filter(Boolean).join('|');
}

function toReplayDomToken(value) {
  return String(value || '').replace(/[^a-zA-Z0-9_-]+/g, '_');
}

function buildReplayTradeRowId(item = {}) {
  return `replay-trade-row-${toReplayDomToken(getReplayTradeKey(item))}`;
}

function buildReplayTradeDetailRowId(item = {}) {
  return `replay-trade-detail-${toReplayDomToken(getReplayTradeKey(item))}`;
}

function getReplayStockGradeScore(item = {}) {
  const gradeScore = Number(item?.gradeScore ?? item?.score);
  return Number.isFinite(gradeScore) ? gradeScore : null;
}

function getReplayStockGradeLabel(item = {}) {
  const grade = String(item?.replayGrade || item?.grade || '').trim().toUpperCase();
  return grade || '';
}

function formatReplayStockGradeMeta(item = {}) {
  const gradeLabel = getReplayStockGradeLabel(item);
  const gradeScore = getReplayStockGradeScore(item);
  if (gradeLabel && Number.isFinite(gradeScore)) return `${gradeLabel} · ${gradeScore.toFixed(1)}점`;
  if (gradeLabel) return gradeLabel;
  if (Number.isFinite(gradeScore)) return `${gradeScore.toFixed(1)}점`;
  return '';
}

function renderReplayStockNameCell(item = {}) {
  const code = String(item?.code || '').trim();
  const scoreText = formatReplayStockGradeMeta(item);
  const nameLink = code
    ? `<a class="replay-stock-name-link" href="https://stock.naver.com/domestic/stock/${encodeURIComponent(code)}/price" target="_blank" rel="noopener noreferrer" title="네이버 종목 페이지 새 창" onclick="event.stopPropagation()">${escapeHtml(item?.name || '-')}</a>`
    : `<strong>${escapeHtml(item?.name || '-')}</strong>`;
  return `
    <div class="replay-stock-name">
      ${nameLink}
      ${scoreText ? `<span class="replay-stock-score">${escapeHtml(scoreText)}</span>` : ''}
    </div>
  `.trim();
}

function getReplayStrategyLabel(strategy) {
  const item = JONGGA_REPLAY_STRATEGIES.find(entry => entry.key === String(strategy || '').trim());
  return item?.label || String(strategy || '-');
}

function getReplayValidationPolicy(bridge = getJonggaReplayBridge()) {
  const policy = bridge?.latestRun?.replayPolicy;
  return policy && typeof policy === 'object' && !Array.isArray(policy) ? policy : null;
}

function getReplayClosedReasonLabel(value) {
  const labels = {
    close_slippage: '종가 매수 체결',
    next_open_slippage: '익일 시가 매수 체결',
    premarket_touch: '프리마켓 목표가 도달',
    premarket_target_touch: '프리마켓 목표가 도달',
    primary_target_touch: '익일 10시 이전 목표가 도달',
    secondary_target_touch: '익일 15시 이전 목표가 도달',
    tertiary_target_touch: '익일 15시 이전 목표가 도달',
    openPhase_touch: '시가/장초반 목표가 도달',
    intraday1_touch: '장중 1차 목표가 도달',
    intraday2_touch: '장중 2차/스윙 목표가 도달',
    swing_touch: '스윙 목표가 도달',
    breakeven_fail: '본절가 이탈 청산',
    breakeven_fail_market: '본절가 실패 청산',
    time_stop_0915_market: '09:15 시간 청산',
    reversal_intraday_stop: '장중 데드라인 이탈 손절',
    third_day_cutoff_market: '3일차 종가 컷오프 청산',
    stop_close: '종가 손절',
    stop_touch: '손절',
    ambiguous_stop_first: '동일봉 손절 우선'
  };
  return labels[String(value || '').trim()] || String(value || '-');
}

function getReplaySellStageLabel(value) {
  const labels = {
    premarket_touch: '💚 프리마켓 익절',
    premarket_target_touch: '💚 프리마켓 익절',
    primary_target_touch: '💚 장초반 익절',
    secondary_target_touch: '💚 장중 1차 익절',
    tertiary_target_touch: '💚 장중 2차 익절',
    openPhase_touch: '💚 시가/장초반 익절',
    intraday1_touch: '💚 장중 1차 익절',
    intraday2_touch: '💚 장중 2차 익절',
    swing_touch: '💚 스윙 익절',
    breakeven_fail: '🛡️ 본절 청산',
    breakeven_fail_market: '🛡️ 본절 실패 청산',
    time_stop_0915_market: '🕘 시간 청산',
    third_day_cutoff_market: '📊 스윙 전환',
    reversal_intraday_stop: '🛑 장중 손절',
    stop_close: '🛑 손절',
    stop_touch: '🛑 손절',
    ambiguous_stop_first: '🛑 손절'
  };
  return labels[String(value || '').trim()] || '—';
}

function normalizeReplayDate(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const dateOnly = raw.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(dateOnly) ? dateOnly : '';
}

function sortReplayDaysNewestFirst(days = []) {
  return [...(Array.isArray(days) ? days : [])].sort((a, b) => {
    const aDate = normalizeReplayDate(a?.date) || String(a?.date || '');
    const bDate = normalizeReplayDate(b?.date) || String(b?.date || '');
    if (aDate !== bDate) return bDate.localeCompare(aDate);
    const aSummary = String(a?.summaryFile || '');
    const bSummary = String(b?.summaryFile || '');
    return bSummary.localeCompare(aSummary);
  });
}

function clampReplayDayPageIndex(totalCount = 0, pageSize = REPLAY_DAY_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(Math.max(0, Number(totalCount) || 0) / pageSize));
  replayDayPageIndex = Math.min(Math.max(0, replayDayPageIndex), totalPages - 1);
  return replayDayPageIndex;
}

function setReplayDayPageIndex(value, { rerender = true } = {}) {
  replayDayPageIndex = Math.max(0, Number.parseInt(value, 10) || 0);
  if (rerender) renderJonggaReplayModal(currentReplayStrategy);
  return replayDayPageIndex;
}

function moveReplayDayPage(direction) {
  const delta = direction === 'older' ? 1 : direction === 'newer' ? -1 : 0;
  if (!delta) return replayDayPageIndex;
  return setReplayDayPageIndex(replayDayPageIndex + delta);
}

function toggleReplayStockSection() {
  replayStockSectionCollapsed = !replayStockSectionCollapsed;
  renderJonggaReplayModal(currentReplayStrategy);
  return replayStockSectionCollapsed;
}

function resetReplayModalViewState() {
  replayStockSectionCollapsed = false;
  replayDayPageIndex = 0;
}

function buildReplayDayPageState(days = [], pageSize = REPLAY_DAY_PAGE_SIZE) {
  const sortedDays = sortReplayDaysNewestFirst(days);
  const totalCount = sortedDays.length;
  const totalPages = Math.max(1, Math.ceil(Math.max(0, totalCount) / pageSize));
  const pageIndex = Math.min(Math.max(0, replayDayPageIndex), totalPages - 1);
  replayDayPageIndex = pageIndex;
  const start = pageIndex * pageSize;
  const visibleDays = sortedDays.slice(start, start + pageSize);
  return {
    totalCount,
    totalPages,
    pageIndex,
    pageSize,
    visibleDays,
    start: totalCount ? start + 1 : 0,
    end: totalCount ? start + visibleDays.length : 0,
  };
}

function renderReplaySectionHead(title, actions = '', { marginTop = 16 } = {}) {
  return `
    <div class="replay-section-head" style="margin-top:${marginTop}px;">
      <div class="section-title" style="margin-top:0;">${escapeHtml(title)}</div>
      ${actions ? `<div class="replay-section-actions">${actions}</div>` : ''}
    </div>
  `;
}

function renderReplayDayPager(pageState) {
  if (!pageState || pageState.totalCount <= 0) return '';
  const pageNumber = pageState.pageIndex + 1;
  const olderDisabled = pageState.pageIndex >= pageState.totalPages - 1;
  const newerDisabled = pageState.pageIndex <= 0;
  return `
    <div class="replay-day-pager">
      <span class="replay-day-pager-meta">총 ${escapeHtml(formatReplayNumber(pageState.totalCount))}일 중 ${escapeHtml(formatReplayNumber(pageState.start))}-${escapeHtml(formatReplayNumber(pageState.end))}일 표시</span>
      <div class="replay-day-pager-buttons">
        <button id="btn-jongga-replay-days-prev" type="button" class="btn btn-secondary small" ${olderDisabled ? 'disabled' : ''}>이전주</button>
        <span class="replay-day-pager-page">${escapeHtml(formatReplayNumber(pageNumber))} / ${escapeHtml(formatReplayNumber(pageState.totalPages))}</span>
        <button id="btn-jongga-replay-days-next" type="button" class="btn btn-secondary small" ${newerDisabled ? 'disabled' : ''}>다음주</button>
      </div>
    </div>
  `;
}

function normalizeReplayPeriod(period = {}) {
  if (!period || typeof period !== 'object' || Array.isArray(period)) {
    return { from: '', to: '' };
  }
  const from = normalizeReplayDate(period.from ?? period.start ?? period.startDate);
  const to = normalizeReplayDate(period.to ?? period.end ?? period.endDate);
  if (from && to && from > to) {
    return { from: to, to: from };
  }
  return { from, to };
}

function hasReplayPeriodFilter(period = typeof getJonggaReplayPeriod === 'function' ? getJonggaReplayPeriod() : { from: '', to: '' }) {
  const normalized = normalizeReplayPeriod(period);
  return Boolean(normalized.from || normalized.to);
}

function isReplayDateInPeriod(dateValue, period = typeof getJonggaReplayPeriod === 'function' ? getJonggaReplayPeriod() : { from: '', to: '' }) {
  const normalizedDate = normalizeReplayDate(dateValue);
  if (!normalizedDate) return false;
  const normalizedPeriod = normalizeReplayPeriod(period);
  if (!normalizedPeriod.from && !normalizedPeriod.to) return true;
  if (normalizedPeriod.from && normalizedDate < normalizedPeriod.from) return false;
  if (normalizedPeriod.to && normalizedDate > normalizedPeriod.to) return false;
  return true;
}

function filterReplayDaysByPeriod(days = [], period = typeof getJonggaReplayPeriod === 'function' ? getJonggaReplayPeriod() : { from: '', to: '' }) {
  return (Array.isArray(days) ? days : []).filter(day => isReplayDateInPeriod(day?.date, period));
}

function isReplayCasePullbackGateOk(item = {}) {
  if (typeof isJonggaReplayPullbackGateOk === 'function') {
    return isJonggaReplayPullbackGateOk(item, {
      entryEligible: Boolean(item?.entryEligibleOriginal ?? item?.entryEligible),
      entryWatch: false
    });
  }
  return item?.pullbackReplayGateOk !== false;
}

function isReplayCaseQualityGateOk(item = {}) {
  if (item?.qualityGateOk === true || item?.qualityGateOk === false) {
    return Boolean(item.qualityGateOk);
  }
  if (typeof isJonggaReplayQualityGateOk === 'function') {
    return isJonggaReplayQualityGateOk(item);
  }
  return true;
}

function matchesReplayCaseItem(item = {}, caseKey = 'all') {
  const normalizedCase = String(caseKey || '').trim();
  const pullbackGateOk = isReplayCasePullbackGateOk(item);
  const qualityGateOk = isReplayCaseQualityGateOk(item);
  if (normalizedCase === 'all') return true;
  if (normalizedCase === 'recommendation') {
    return pullbackGateOk && qualityGateOk && (Boolean(item.historyRecommendation) || Boolean(item.entryEligibleOriginal));
  }
  if (normalizedCase === 'a7plus') {
    if (Boolean(item.replayA7Plus)) return true;
    const gradeScore = Number(item.gradeScore);
    const gradeCode = String(item.replayGrade || item.grade || '').trim().charAt(0).toUpperCase();
    return pullbackGateOk && qualityGateOk && Number.isFinite(gradeScore) && gradeScore >= 7.0 && ['A', 'S'].includes(gradeCode);
  }
  return false;
}

function filterReplayCaseItems(items = [], caseKey = 'all') {
  const list = Array.isArray(items) ? items : [];
  return list.filter(item => matchesReplayCaseItem(item, caseKey));
}

function sortReplayResultsForReturns(items = []) {
  return [...(Array.isArray(items) ? items : [])].sort((a, b) => {
    const aDate = String(a?.date || '');
    const bDate = String(b?.date || '');
    if (aDate !== bDate) return aDate.localeCompare(bDate);
    const aStrategy = String(a?.strategy || '');
    const bStrategy = String(b?.strategy || '');
    if (aStrategy !== bStrategy) return aStrategy.localeCompare(bStrategy);
    const aCode = String(a?.code || '');
    const bCode = String(b?.code || '');
    if (aCode !== bCode) return aCode.localeCompare(bCode);
    const aKey = String(a?.sourceEntryKey || '');
    const bKey = String(b?.sourceEntryKey || '');
    return aKey.localeCompare(bKey);
  });
}

function cumulativeReturnPct(returnsPct = []) {
  if (!returnsPct.length) return null;
  let equity = 1;
  returnsPct.forEach(value => {
    equity *= 1 + (Number(value) / 100);
  });
  return Number.isFinite(equity) ? Number(((equity - 1) * 100).toFixed(4)) : null;
}

function maxDrawdownPct(returnsPct = []) {
  let equity = 1;
  let peak = 1;
  let drawdown = 0;
  returnsPct.forEach(value => {
    equity *= 1 + (Number(value) / 100);
    peak = Math.max(peak, equity);
    if (peak > 0) {
      drawdown = Math.min(drawdown, ((equity / peak) - 1) * 100);
    }
  });
  return Number.isFinite(drawdown) ? Number(Math.abs(drawdown).toFixed(4)) : null;
}

function buildReplaySummaryMetrics(candidates = [], results = [], orders = []) {
  const included = (Array.isArray(candidates) ? candidates : []).filter(item => item?.replayIncluded);
  const eligible = (Array.isArray(candidates) ? candidates : []).filter(item => item?.entryEligible);
  const sellOrders = (Array.isArray(orders) ? orders : []).filter(item => item?.side === 'SELL');
  const pendingOrders = sellOrders.filter(item => item?.finalStatus === 'open');
  const orderedResults = sortReplayResultsForReturns((Array.isArray(results) ? results : []).filter(item => item?.netReturnPct != null));
  const returns = orderedResults.map(item => Number(item.netReturnPct)).filter(Number.isFinite);
  const wins = returns.filter(value => value > 0);
  return {
    candidateCount: candidates.length,
    eligibleCount: eligible.length,
    includedCount: included.length,
    tradeCount: results.length,
    winRate: returns.length ? Number((wins.length / returns.length).toFixed(4)) : null,
    avgNetReturnPct: returns.length ? Number((returns.reduce((sum, value) => sum + value, 0) / returns.length).toFixed(4)) : null,
    cumNetReturnPct: cumulativeReturnPct(returns),
    maxDrawdownPct: maxDrawdownPct(returns),
    degradedCount: (Array.isArray(results) ? results : []).filter(item => String(item?.dataQualityStatus || '') === 'degraded').length,
    ambiguousCount: (Array.isArray(results) ? results : []).reduce((sum, item) => sum + Number(item?.ambiguousCount || 0), 0),
    unfilledRate: sellOrders.length ? Number((pendingOrders.length / sellOrders.length).toFixed(4)) : null
  };
}

function filterReplayCaseOrders(orders = [], results = [], caseKey = 'all') {
  const list = Array.isArray(orders) ? orders : [];
  if (caseKey === 'all') return list;
  const entryKeys = new Set(
    (Array.isArray(results) ? results : [])
      .map(item => String(item?.sourceEntryKey || ''))
      .filter(Boolean)
  );
  return list.filter(item => entryKeys.has(String(item?.sourceEntryKey || '')));
}

function buildReplayCaseComparisons(candidates = [], results = [], orders = []) {
  const caseSpecs = [
    ['all', '전체 후보'],
    ['a7plus', '7&A'],
    ['recommendation', '추천 전용']
  ];
  return Object.fromEntries(caseSpecs.map(([caseKey, label]) => {
    const caseCandidates = caseKey === 'all' ? candidates : filterReplayCaseItems(candidates, caseKey);
    const caseResults = caseKey === 'all' ? results : filterReplayCaseItems(results, caseKey);
    const caseOrders = filterReplayCaseOrders(orders, caseResults, caseKey);
    return [caseKey, {
      caseKey,
      label,
      ...buildReplaySummaryMetrics(caseCandidates, caseResults, caseOrders)
    }];
  }));
}

function summarizeReplayTradeRows(results = [], fills = []) {
  const fillsByEntryKey = new Map();
  (Array.isArray(fills) ? fills : []).forEach(fill => {
    const entryKey = getReplayFillSourceEntryKey(fill);
    if (!entryKey) return;
    if (!fillsByEntryKey.has(entryKey)) fillsByEntryKey.set(entryKey, []);
    fillsByEntryKey.get(entryKey).push(fill);
  });
  return sortReplayResultsForReturns(Array.isArray(results) ? results : []).map(item => ({
    date: item?.date,
    strategy: item?.strategy,
    code: item?.code,
    name: item?.name,
    grade: item?.replayGrade ?? item?.grade,
    replayGrade: item?.replayGrade ?? item?.grade,
    gradeScore: item?.gradeScore,
    entryFilledAt: item?.entryFilledAt,
    entryFillPrice: item?.entryFillPrice,
    exitFilledAt: item?.exitFilledAt,
    exitAvgFillPrice: item?.exitAvgFillPrice,
    exitLastFillPrice: item?.exitLastFillPrice,
    sourceEntryKey: item?.sourceEntryKey,
    tradeStatus: item?.tradeStatus,
    closedReason: item?.closedReason,
    netReturnPct: item?.netReturnPct,
    mixedExitPolicy: item?.mixedExitPolicy || null,
    fills: fillsByEntryKey.get(String(item?.sourceEntryKey || '')) || []
  }));
}

function buildReplayStockStats(results = []) {
  const grouped = new Map();
  (Array.isArray(results) ? results : []).forEach(item => {
    const key = `${String(item?.strategy || '')}|${String(item?.code || '')}|${String(item?.name || '')}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  });
  const rows = [];
  grouped.forEach((items, key) => {
    const [strategy, code, name] = key.split('|');
    const ordered = sortReplayResultsForReturns(items);
    const returns = ordered.map(item => Number(item?.netReturnPct)).filter(Number.isFinite);
    const wins = returns.filter(value => value > 0);
    const latest = ordered[ordered.length - 1] || {};
    rows.push({
      strategy,
      code,
      name,
      grade: latest?.replayGrade ?? latest?.grade,
      replayGrade: latest?.replayGrade ?? latest?.grade,
      gradeScore: latest?.gradeScore ?? latest?.score,
      tradeCount: items.length,
      winRate: returns.length ? Number((wins.length / returns.length).toFixed(4)) : null,
      avgNetReturnPct: returns.length ? Number((returns.reduce((sum, value) => sum + value, 0) / returns.length).toFixed(4)) : null,
      cumNetReturnPct: cumulativeReturnPct(returns),
      lastReplayDate: String(latest?.date || ''),
      lastEntryFilledAt: latest?.entryFilledAt,
      lastEntryFillPrice: latest?.entryFillPrice,
      lastExitFilledAt: latest?.exitFilledAt,
      lastExitAvgFillPrice: latest?.exitAvgFillPrice,
      lastExitFillPrice: latest?.exitLastFillPrice,
      lastTradeStatus: latest?.tradeStatus
    });
  });
  return rows.sort((a, b) => {
    const aIndex = JONGGA_REPLAY_STRATEGY_ORDER.indexOf(String(a.strategy || ''));
    const bIndex = JONGGA_REPLAY_STRATEGY_ORDER.indexOf(String(b.strategy || ''));
    if (aIndex !== bIndex) {
      return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
    }
    const strategyDiff = getReplayStrategyLabel(a.strategy).localeCompare(getReplayStrategyLabel(b.strategy));
    if (strategyDiff !== 0) return strategyDiff;
    const aValue = Number.isFinite(Number(a.cumNetReturnPct)) ? Number(a.cumNetReturnPct) : Number.NEGATIVE_INFINITY;
    const bValue = Number.isFinite(Number(b.cumNetReturnPct)) ? Number(b.cumNetReturnPct) : Number.NEGATIVE_INFINITY;
    if (aValue !== bValue) return bValue - aValue;
    return String(a.code || '').localeCompare(String(b.code || ''));
  });
}

function buildReplayDayView(day = {}, { strategy = null, caseKey = 'all' } = {}) {
  const dayCandidates = filterReplayCaseItems((day?.candidates || []).filter(item => !strategy || item?.strategy === strategy), caseKey);
  const dayResults = filterReplayCaseItems((day?.results || []).filter(item => !strategy || item?.strategy === strategy), caseKey);
  const dayResultEntryKeys = new Set(
    dayResults
      .map(item => String(item?.sourceEntryKey || ''))
      .filter(Boolean)
  );
  const dayOrders = (day?.orders || []).filter(item => {
    if (item?.side !== 'SELL') return false;
    if (strategy && item?.strategy !== strategy) return false;
    if (caseKey === 'all') return true;
    return dayResultEntryKeys.has(String(item?.sourceEntryKey || ''));
  });
  const dayFills = (day?.fills || []).filter(item => {
    const entryKey = getReplayFillSourceEntryKey(item);
    if (!entryKey || !dayResultEntryKeys.has(entryKey)) return false;
    if (strategy && item?.strategy && item?.strategy !== strategy) return false;
    return true;
  });
  return {
    date: day?.date,
    summaryFile: day?.summaryFile,
    ordersFile: day?.ordersFile,
    fillsFile: day?.fillsFile,
    candidates: dayCandidates,
    results: dayResults,
    orders: dayOrders,
    fills: dayFills,
    trades: summarizeReplayTradeRows(dayResults, dayFills),
    ...buildReplaySummaryMetrics(dayCandidates, dayResults, dayOrders)
  };
}

function buildJonggaReplayPeriodSummary(bridge = getJonggaReplayBridge(), strategy = null, mode = getJonggaReplayViewMode(), period = typeof getJonggaReplayPeriod === 'function' ? getJonggaReplayPeriod() : { from: '', to: '' }) {
  const latestRun = bridge?.latestRun;
  if (!latestRun || typeof latestRun !== 'object') return null;
  const normalizedMode = normalizeJonggaReplayViewMode(mode);
  const caseKey = normalizedMode === 'all' ? 'all' : normalizedMode;
  const filteredDays = filterReplayDaysByPeriod(latestRun.days || [], period);
  const selectedDays = [];
  const selectedCandidates = [];
  const selectedResults = [];
  const selectedOrders = [];
  const comparisonCandidates = [];
  const comparisonResults = [];
  const comparisonOrders = [];

  filteredDays.forEach(day => {
    const scopedCandidates = (day?.candidates || []).filter(item => !strategy || item?.strategy === strategy);
    const scopedResults = (day?.results || []).filter(item => !strategy || item?.strategy === strategy);
    const scopedOrders = (day?.orders || []).filter(item => !strategy || item?.strategy === strategy);
    comparisonCandidates.push(...scopedCandidates);
    comparisonResults.push(...scopedResults);
    comparisonOrders.push(...scopedOrders);
    const dayView = buildReplayDayView(day, { strategy, caseKey });
    if (!dayView.results.length && !dayView.candidates.length && !dayView.orders.length) {
      return;
    }
    selectedDays.push(dayView);
    selectedCandidates.push(...dayView.candidates);
    selectedResults.push(...dayView.results);
    selectedOrders.push(...dayView.orders);
  });

  return {
    summary: buildReplaySummaryMetrics(selectedCandidates, selectedResults, selectedOrders),
    comparisonByCase: buildReplayCaseComparisons(comparisonCandidates, comparisonResults, comparisonOrders),
    stocks: buildReplayStockStats(selectedResults),
    days: selectedDays,
    period: normalizeReplayPeriod(period),
    selectedCase: normalizedMode,
    isFiltered: hasReplayPeriodFilter(period)
  };
}

function getReplaySummary(summaryLike) {
  if (!summaryLike || typeof summaryLike !== 'object' || Array.isArray(summaryLike)) return {};
  return summaryLike.overall && typeof summaryLike.overall === 'object' ? summaryLike.overall : summaryLike;
}

function getReplayMetricMeta(key) {
  const metaMap = {
    includedCount: {
      label: '포함',
      help: '리플레이 포함 대상 수',
    },
    tradeCount: {
      label: '체결',
      help: '실제로 시뮬레이션 체결된 거래 수',
    },
    winRate: {
      label: '승률',
      help: '수익이 0%를 넘은 거래 비율',
    },
    avgNetReturnPct: {
      label: '평균',
      help: '거래 1건당 평균 순수익률',
    },
    cumNetReturnPct: {
      label: '누적',
      help: '거래 순서를 반영해 복리로 합산한 누적 순수익률',
    },
    maxDrawdownPct: {
      label: 'MDD',
      help: '최대 낙폭. 누적 손익이 고점 대비 얼마나 크게 꺾였는지 보여줍니다.',
    },
    degradedCount: {
      label: 'degraded',
      help: '분봉/틱 데이터가 부족해 일봉 프록시나 보강 데이터로 검증한 건수입니다.',
    },
    ambiguousCount: {
      label: 'ambiguous',
      help: '레거시 규칙에서 같은 봉 충돌로 손절 우선 처리된 예외 건수입니다. 현재 종가 손절 규칙에서는 보통 0건입니다.',
    },
  };
  return metaMap[key] || { label: String(key || '-'), help: '' };
}

function renderReplayPolicyBanner(policy, variantLabel = '') {
  if (!policy) return '';
  const label = String(policy.label || '완화 모드');
  const summary = String(policy.summary || '');
  const detail = String(policy.detail || '');
  return `
    <div class="replay-policy-banner" role="status" aria-live="polite">
      <div class="replay-policy-badge">${escapeHtml(label)}</div>
      <div class="replay-policy-copy">
        <strong>${escapeHtml(summary)}</strong>
        <span>${escapeHtml(detail)}${variantLabel ? ` · ${escapeHtml(variantLabel)}` : ''}</span>
      </div>
    </div>
  `;
}

function getReplayOverallSummary(bridge = getJonggaReplayBridge()) {
  return getReplaySummary(bridge?.latestRun?.summary || bridge?.latestSummary || {});
}

function getReplayStrategyView(strategy, bridge = getJonggaReplayBridge(), mode = getJonggaReplayViewMode()) {
  const latestRun = bridge?.latestRun;
  if (!latestRun) return null;
  const period = typeof getJonggaReplayPeriod === 'function' ? getJonggaReplayPeriod() : { from: '', to: '' };
  if (Array.isArray(latestRun.days) && latestRun.days.length) {
    return buildJonggaReplayPeriodSummary(bridge, strategy, mode, period);
  }
  const explicit = latestRun.strategyViews?.[strategy];
  if (explicit && typeof explicit === 'object' && !Array.isArray(explicit)) {
    const normalizedMode = normalizeJonggaReplayViewMode(mode);
    if (normalizedMode === 'all') {
      return { ...explicit, selectedCase: normalizedMode, comparisonByCase: explicit?.summary?.comparisonByCase || explicit?.comparisonByCase || null };
    }
    const caseView = explicit.caseViews?.[normalizedMode];
    if (caseView && typeof caseView === 'object' && !Array.isArray(caseView)) {
      return { ...caseView, selectedCase: normalizedMode, comparisonByCase: explicit?.summary?.comparisonByCase || explicit?.comparisonByCase || null };
    }
    return { ...explicit, selectedCase: normalizedMode, comparisonByCase: explicit?.summary?.comparisonByCase || explicit?.comparisonByCase || null };
  }

  const byStrategy = latestRun.summary?.byStrategy || latestRun.summary?.strategyStats || {};
  const summary = byStrategy?.[strategy];
  if (!summary) return null;

  const stocks = Array.isArray(latestRun.summary?.byStock)
    ? latestRun.summary.byStock.filter(item => item?.strategy === strategy)
    : [];
  const days = Array.isArray(latestRun.days)
    ? latestRun.days
      .map(day => {
        const stats = day?.byStrategy?.[strategy];
        return stats ? { ...day, ...stats } : null;
      })
      .filter(Boolean)
    : [];
  return { summary, stocks, days, selectedCase: normalizeJonggaReplayViewMode(mode), comparisonByCase: summary?.comparisonByCase || null };
}

function isReplayStopLikeRule(value) {
  const normalized = String(value || '').trim();
  return normalized.includes('stop')
    || normalized.includes('breakeven')
    || normalized.includes('time_stop')
    || normalized.includes('ambiguous');
}

function getReplayFillTone(fill = {}) {
  const side = String(fill?.side || '').trim().toUpperCase();
  if (side === 'BUY') return 'buy';
  return isReplayStopLikeRule(fill?.fillRule) ? 'stop' : 'profit';
}

function getReplayFillHeadline(fill = {}) {
  const side = String(fill?.side || '').trim().toUpperCase();
  if (side === 'BUY') {
    return fill?.fillRule === 'next_open_slippage' ? '🟡 익일 시가 매수' : '🟡 종가 매수';
  }
  return getReplaySellStageLabel(fill?.fillRule);
}

function renderReplayFillHistory(item = {}) {
  const fills = Array.isArray(item?.fills) ? item.fills : [];
  if (!fills.length) {
    return '<div class="replay-fill-empty">체결 이력이 없습니다.</div>';
  }
  return `
    <div class="replay-fill-history">
      <div class="replay-fill-history-title">순차 체결 이력</div>
      <table class="replay-fill-table">
        <thead>
          <tr>
            <th>구분</th>
            <th>체결가</th>
            <th>비중</th>
            <th>체결 시각</th>
          </tr>
        </thead>
        <tbody>
          ${fills.map(fill => {
            const tone = getReplayFillTone(fill);
            const headline = getReplayFillHeadline(fill);
            const reason = getReplayClosedReasonLabel(fill?.fillRule || fill?.reason || '');
            return `
              <tr class="replay-fill-row ${tone}">
                <td>
                  <span class="replay-fill-badge ${tone}">${escapeHtml(headline)}</span>
                  <div class="replay-cell-sub">${escapeHtml(reason)}</div>
                </td>
                <td><span class="replay-fill-price ${tone}">${escapeHtml(formatReplayPrice(fill?.fillPrice))}</span></td>
                <td>${escapeHtml(formatReplayQuantityPct(fill?.filledQuantityPct))}</td>
                <td>${escapeHtml(formatReplayDateTime(fill?.filledAt || fill?.barTimestamp))}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function toggleReplayTradeHistory(itemKey) {
  const token = toReplayDomToken(itemKey);
  const row = document.getElementById(`replay-trade-row-${token}`);
  const detailRow = document.getElementById(`replay-trade-detail-${token}`);
  if (!row || !detailRow) return;
  const willOpen = detailRow.hidden;
  detailRow.hidden = !willOpen;
  row.classList.toggle('open', willOpen);
  if (typeof row.setAttribute === 'function') {
    row.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  } else {
    row.ariaExpanded = willOpen ? 'true' : 'false';
  }
}

function renderReplayMetricPills(summary = {}, labels = {}) {
  const items = [
    ['includedCount', labels.includedCount || '포함'],
    ['tradeCount', labels.tradeCount || '체결'],
    ['winRate', labels.winRate || '승률', value => escapeHtml(formatReplayRate(value))],
    ['avgNetReturnPct', labels.avgNetReturnPct || '평균', value => renderColoredPercent(value)],
    ['cumNetReturnPct', labels.cumNetReturnPct || '누적', value => renderColoredPercent(value)],
    ['maxDrawdownPct', labels.maxDrawdownPct || 'MDD', value => renderColoredPercent(value)],
    ['degradedCount', labels.degradedCount || 'degraded'],
    ['ambiguousCount', labels.ambiguousCount || 'ambiguous']
  ];
  return `
    <div class="quality-grid replay-summary-grid">
      ${items.map(([key, label, formatter]) => `
        <div class="quality-card" title="${escapeHtml(getReplayMetricMeta(key).help)}">
          <strong>${formatter ? formatter(summary?.[key]) : escapeHtml(formatReplayNumber(summary?.[key]))}</strong>
          <span>${escapeHtml(label)}</span>
          ${getReplayMetricMeta(key).help ? `<small class="replay-metric-help">${escapeHtml(getReplayMetricMeta(key).help)}</small>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function renderReplayCaseComparisonCards(comparisonByCase = {}, selectedCase = 'all') {
  const caseSpecs = [
    ['all', '전체 후보'],
    ['a7plus', '7&A'],
    ['recommendation', '추천 전용']
  ];
  const hasAny = caseSpecs.some(([caseKey]) => comparisonByCase?.[caseKey]);
  if (!hasAny) return '';
  return `
    <div class="quality-grid replay-summary-grid replay-case-comparison-grid">
      ${caseSpecs.map(([caseKey, fallbackLabel]) => {
        const summary = comparisonByCase?.[caseKey] || {};
        const label = String(summary?.label || fallbackLabel);
        return `
          <div class="quality-card replay-case-comparison-card${selectedCase === caseKey ? ' active' : ''}">
            <strong>${escapeHtml(label)}</strong>
            <span>후보 ${escapeHtml(formatReplayNumber(summary?.candidateCount))} · 진입가능 ${escapeHtml(formatReplayNumber(summary?.eligibleCount))} · 포함 ${escapeHtml(formatReplayNumber(summary?.includedCount))}</span>
            <small>체결 ${escapeHtml(formatReplayNumber(summary?.tradeCount))} · 승률 ${escapeHtml(formatReplayRate(summary?.winRate))} · 누적 ${renderColoredPercent(summary?.cumNetReturnPct)}</small>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderReplayAttemptLine(attempt = {}) {
  const status = String(attempt.status || 'missing').toLowerCase();
  if (status === 'failed') {
    return `<div class="quality-line error replay-status-line"><strong>자동 검증 실패:</strong> ${escapeHtml(attempt.message || 'unknown error')}</div>`;
  }
  if (status === 'missing' || status === 'skipped') {
    return `<div class="quality-line warn replay-status-line">${escapeHtml(attempt.message || '자동 검증 데이터가 없습니다.')}</div>`;
  }
  return '';
}

function renderReplayStrategyInline(summary = {}) {
  return `
    <span class="strategy-replay-pill"><strong>${renderColoredPercent(summary.cumNetReturnPct)}</strong><span>누적</span></span>
    <span class="strategy-replay-pill"><strong>${renderColoredPercent(summary.avgNetReturnPct)}</strong><span>평균</span></span>
    <span class="strategy-replay-pill"><strong>${escapeHtml(formatReplayNumber(summary.tradeCount))}</strong><span>체결</span></span>
  `;
}

function renderReplayStrategySections() {
  const bridge = getJonggaReplayBridge();
  const attempt = getJonggaReplayAttempt(bridge);
  const meta = getJonggaReplayStatusMeta(bridge);
  const latestRun = bridge?.latestRun;
  const attemptStatus = String(attempt.status || 'missing').toLowerCase();
  const actionable = latestRun && attemptStatus === 'complete';
  const activeCaseLabel = getJonggaReplayViewMeta(getJonggaReplayViewMode()).label;

  JONGGA_REPLAY_STRATEGIES.forEach(({ key }) => {
    const badge = document.getElementById(`jongga-replay-badge-${key}`);
    const summaryNode = document.getElementById(`jongga-replay-summary-${key}`);
    const button = document.getElementById(`btn-open-jongga-replay-${key}`);
    const strategyView = getReplayStrategyView(key, bridge, getJonggaReplayViewMode());
    const strategySummary = strategyView?.summary || null;
    const hasStrategyData = Boolean(
      strategyView &&
      strategySummary &&
      (
        Number(strategySummary.candidateCount || 0) > 0 ||
        Number(strategySummary.tradeCount || 0) > 0 ||
        (Array.isArray(strategyView.days) && strategyView.days.length > 0)
      )
    );

    if (badge) {
      badge.textContent = meta.label;
      badge.className = `quality-status ${meta.tone}`;
    }

    if (summaryNode) {
      if (!latestRun) {
        summaryNode.innerHTML = `<span class="strategy-replay-empty">${escapeHtml(attempt.message || '검증 데이터 없음')}</span>`;
      } else if (!actionable) {
        summaryNode.innerHTML = `<span class="strategy-replay-empty">${escapeHtml(attempt.message || '자동 검증 실패')}</span>`;
      } else if (!hasStrategyData) {
        summaryNode.innerHTML = '<span class="strategy-replay-empty">해당 타입 결과 없음</span>';
      } else {
        summaryNode.innerHTML = renderReplayStrategyInline(strategySummary);
      }
    }

    if (button) {
      button.disabled = !actionable || !hasStrategyData;
      if (!latestRun) {
        button.title = '표시할 replay 결과가 없습니다.';
      } else if (!actionable) {
        button.title = attempt.message || '자동 검증 실패 상태입니다.';
      } else if (!hasStrategyData) {
        button.title = '최근 자동 replay에 이 전략 결과가 없습니다.';
      } else {
        button.title = `${getReplayStrategyLabel(key)} · ${activeCaseLabel} replay 상세 보기`;
      }
    }
  });
}

function renderReplayStockTable(rows = []) {
  if (!Array.isArray(rows) || !rows.length) {
    return '<div class="replay-empty">종목별 수익 데이터가 없습니다.</div>';
  }
  return `
    <div class="replay-table-wrap">
      <table class="replay-table">
        <thead>
          <tr>
            <th>종목</th>
            <th>매수가</th>
            <th>매도가</th>
            <th>거래</th>
            <th>승률</th>
            <th>평균</th>
            <th>누적</th>
            <th>최근일</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(item => `
            <tr>
              <td>
                ${renderReplayStockNameCell(item)}
                <div class="replay-cell-sub">${escapeHtml(item.code || '-')}</div>
              </td>
              <td>
                ${escapeHtml(formatReplayPrice(item.lastEntryFillPrice))}
                <div class="replay-cell-sub">${escapeHtml(formatReplayDate(item.lastEntryFilledAt || item.lastReplayDate))}</div>
              </td>
              <td>
                ${escapeHtml(formatReplayPrice(item.lastExitAvgFillPrice || item.lastExitFillPrice))}
                <div class="replay-cell-sub">${escapeHtml(formatReplayDate(item.lastExitFilledAt || item.lastReplayDate))}</div>
              </td>
              <td>${escapeHtml(formatReplayNumber(item.tradeCount))}</td>
              <td>${escapeHtml(formatReplayRate(item.winRate))}</td>
              <td>${renderColoredPercent(item.avgNetReturnPct)}</td>
              <td>${renderColoredPercent(item.cumNetReturnPct)}</td>
              <td>${escapeHtml(formatReplayDate(item.lastReplayDate))}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderReplayTradeTable(rows = []) {
  if (!Array.isArray(rows) || !rows.length) {
    return '<div class="replay-empty">해당 일자 거래 목록이 없습니다.</div>';
  }
  return `
    <div class="replay-table-wrap">
      <table class="replay-table replay-trade-table">
        <thead>
          <tr>
            <th>종목</th>
            <th>매수가</th>
            <th>매도가</th>
            <th>매도 단계</th>
            <th>수익률</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(item => {
            const tradeKey = getReplayTradeKey(item);
            const rowId = buildReplayTradeRowId(item);
            const detailId = buildReplayTradeDetailRowId(item);
            const hasDetail = Array.isArray(item?.fills) && item.fills.length > 0;
            const mixedPolicySummary = buildReplayMixedExitPolicySummary(item?.mixedExitPolicy);
            return `
            <tr
              id="${escapeHtml(rowId)}"
              class="replay-trade-row${hasDetail ? ' is-expandable' : ''}"
              ${hasDetail ? `data-trade-key="${escapeHtml(tradeKey)}" aria-expanded="false" tabindex="0" onclick="toggleReplayTradeHistory('${escapeHtml(tradeKey)}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleReplayTradeHistory('${escapeHtml(tradeKey)}');}"` : ''}
            >
              <td>
                ${renderReplayStockNameCell(item)}
                <div class="replay-cell-sub">${escapeHtml(item.code || '-')}</div>
                ${hasDetail ? '<div class="replay-cell-sub replay-trade-hint">클릭해 체결 이력 보기</div>' : ''}
              </td>
              <td>
                ${escapeHtml(formatReplayPrice(item.entryFillPrice))}
                <div class="replay-cell-sub">${escapeHtml(formatReplayDate(item.entryFilledAt))}</div>
              </td>
              <td>
                ${escapeHtml(formatReplayPrice(item.exitAvgFillPrice || item.exitLastFillPrice))}
                <div class="replay-cell-sub">${escapeHtml(formatReplayDate(item.exitFilledAt))}</div>
              </td>
              <td>${escapeHtml(getReplaySellStageLabel(item.closedReason))}</td>
              <td>${renderColoredPercent(item.netReturnPct)}</td>
              <td>
                ${escapeHtml(item.tradeStatus || '-')}
                <div class="replay-cell-sub">${escapeHtml(getReplayClosedReasonLabel(item.closedReason))}</div>
                ${mixedPolicySummary ? `<div class="replay-cell-sub">${escapeHtml(mixedPolicySummary)}</div>` : ''}
              </td>
            </tr>
            ${hasDetail ? `
              <tr id="${escapeHtml(detailId)}" class="replay-trade-detail-row" hidden>
                <td colspan="6" class="replay-trade-detail-cell">${renderReplayFillHistory(item)}</td>
              </tr>
            ` : ''}
          `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderReplayDayList(days = [], variant = 'stable') {
  const pageState = buildReplayDayPageState(days);
  if (!pageState.totalCount) {
    return '<div class="replay-empty">일자별 replay 요약이 없습니다.</div>';
  }
  return `
    <div class="replay-day-list">
      ${pageState.visibleDays.map(day => `
        <div class="replay-day-item">
          <div class="replay-day-head">
            <strong>${escapeHtml(formatReplayDate(day.date))}</strong>
            <span class="history-variant-badge ${escapeHtml(variant)}">${escapeHtml(formatReplayNumber(day.tradeCount))}건</span>
          </div>
          <div class="replay-day-meta">포함 ${escapeHtml(formatReplayNumber(day.includedCount))} · 체결 ${escapeHtml(formatReplayNumber(day.tradeCount))} · 승률 ${escapeHtml(formatReplayRate(day.winRate))}</div>
          <div class="replay-day-meta">평균 ${renderColoredPercent(day.avgNetReturnPct)} · 누적 ${renderColoredPercent(day.cumNetReturnPct)} · MDD ${renderColoredPercent(day.maxDrawdownPct)}</div>
          <div class="replay-day-meta">degraded ${escapeHtml(formatReplayNumber(day.degradedCount))} · ambiguous ${escapeHtml(formatReplayNumber(day.ambiguousCount))}</div>
          <div class="replay-day-trades">
            <div class="replay-day-trades-title">매수/매도 종목</div>
            ${renderReplayTradeTable(day.trades || [])}
          </div>
          <div class="replay-file-list">
            <div><code>${escapeHtml(day.summaryFile || '-')}</code></div>
            <div><code>${escapeHtml(day.ordersFile || '-')}</code></div>
            <div><code>${escapeHtml(day.fillsFile || '-')}</code></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function updateReplayModalHeader(strategy) {
  const title = document.getElementById('jongga-replay-modal-title');
  const subtitle = document.getElementById('jongga-replay-modal-subtitle');
  const activeCaseLabel = getJonggaReplayViewMeta(getJonggaReplayViewMode()).label;
  if (title) {
    title.textContent = strategy ? `리플레이 검증 상세 · ${getReplayStrategyLabel(strategy)} · ${activeCaseLabel}` : `리플레이 검증 상세 · ${activeCaseLabel}`;
  }
  if (subtitle) {
    subtitle.innerHTML = `<span>${strategy ? `${escapeHtml(getReplayStrategyLabel(strategy))} 타입의 ${escapeHtml(activeCaseLabel)} 자동 replay 성과와 종목별 수익을 확인합니다.` : `${escapeHtml(activeCaseLabel)} 자동 replay 성과와 일자별 산출물을 확인합니다.`}</span>`;
  }
}

function renderJonggaReplayModal(strategy = currentReplayStrategy) {
  const body = document.getElementById('jongga-replay-body');
  if (!body) return;

  const bridge = getJonggaReplayBridge();
  const attempt = getJonggaReplayAttempt(bridge);
  const latestRun = bridge?.latestRun;
  const activeCaseMode = getJonggaReplayViewMode();
  const activePeriod = typeof getJonggaReplayPeriod === 'function' ? getJonggaReplayPeriod() : { from: '', to: '' };
  const availablePeriod = typeof getJonggaReplayAvailablePeriod === 'function' ? getJonggaReplayAvailablePeriod(bridge) : { from: '', to: '' };
  const strategyView = strategy ? getReplayStrategyView(strategy, bridge, activeCaseMode) : null;
  const strategySummary = strategyView?.summary || null;
  const periodLabel = latestRun ? `${formatReplayDate(latestRun.from)} ~ ${formatReplayDate(latestRun.to)}` : '';
  const policy = getReplayValidationPolicy(bridge);
  const currentPeriodLabel = typeof getJonggaReplayPeriodLabel === 'function'
    ? getJonggaReplayPeriodLabel(activePeriod, bridge)
    : periodLabel;
  const comparisonByCase = strategyView?.comparisonByCase || strategySummary?.comparisonByCase || null;
  const hasStrategyData = Boolean(
    strategyView &&
    strategySummary &&
    (
      Number(strategySummary.candidateCount || 0) > 0 ||
      Number(strategySummary.tradeCount || 0) > 0 ||
      (Array.isArray(strategyView.days) && strategyView.days.length > 0)
    )
  );
  const dayPageState = hasStrategyData ? buildReplayDayPageState(strategyView?.days || []) : null;

  updateReplayModalHeader(strategy);

  if (!bridge || !latestRun) {
    body.innerHTML = '<div class="replay-empty">표시할 replay 결과가 없습니다.</div>';
    return;
  }

  body.innerHTML = `
    <div class="replay-meta">자동 실행 상태: ${escapeHtml(String(attempt.status || 'missing'))} ${attempt.message ? `· ${escapeHtml(attempt.message)}` : ''}</div>
    <div class="replay-meta">기간: ${escapeHtml(periodLabel)} · 채널 ${escapeHtml(getJonggaReplayVariantLabel(latestRun.variant))} · 프로필 ${escapeHtml(latestRun.thresholdProfile || '-')} · 케이스 ${escapeHtml(getJonggaReplayViewMeta(activeCaseMode).label)}</div>
    ${renderReplayPolicyBanner(policy, getJonggaReplayVariantLabel(latestRun.variant))}
    <div class="section-title" style="margin-top:16px;">${escapeHtml(strategy ? `${getReplayStrategyLabel(strategy)} 타입 수익` : '전략별 성과')}</div>
    ${hasStrategyData
      ? renderReplayMetricPills(strategySummary, { includedCount: '타입 포함', tradeCount: '타입 체결', cumNetReturnPct: '타입 누적' })
      : '<div class="replay-empty">해당 전략 요약이 없습니다.</div>'}
    ${hasStrategyData && comparisonByCase
      ? `
        <div class="section-title" style="margin-top:16px;">집계 비교</div>
        ${renderReplayCaseComparisonCards(comparisonByCase, strategyView?.selectedCase || activeCaseMode)}
        <div class="replay-metric-note">상단 타입 수익은 현재 케이스 기준이며, 이 비교는 같은 기간의 전체 후보 / 7&A / 추천 전용을 나란히 보여줍니다.</div>
      `
      : ''}
    <div class="replay-metric-note">MDD는 최대 낙폭, degraded는 분봉/틱 데이터가 부족해 보강 데이터로 검증한 건수, ambiguous는 같은 봉에서 익절과 손절이 동시에 닿아 보수적으로 손절 처리한 건수입니다.</div>
    ${renderReplaySectionHead(
      '종목별 수익',
      `<button id="btn-jongga-replay-stock-toggle" type="button" class="btn btn-secondary small" aria-expanded="${replayStockSectionCollapsed ? 'false' : 'true'}">${replayStockSectionCollapsed ? '펼치기' : '접기'}</button>`
    )}
    ${hasStrategyData
      ? (replayStockSectionCollapsed
        ? '<div class="replay-section-collapsed-note">종목별 수익 표를 접어둔 상태입니다.</div>'
        : renderReplayStockTable(strategyView?.stocks || []))
      : '<div class="replay-empty">종목별 수익 데이터가 없습니다.</div>'}
    ${renderReplaySectionHead('일자별 요약', hasStrategyData ? renderReplayDayPager(dayPageState) : '')}
    ${hasStrategyData ? renderReplayDayList(strategyView?.days || [], latestRun.variant) : '<div class="replay-empty">일자별 replay 요약이 없습니다.</div>'}
  `;
}

function openJonggaReplayModal(strategy) {
  resetReplayModalViewState();
  currentReplayStrategy = strategy || null;
  renderJonggaReplayModal(currentReplayStrategy);
  document.getElementById('jongga-replay-overlay')?.classList.add('open');
  if (typeof syncBodyScrollLock === 'function') syncBodyScrollLock();
}

function closeJonggaReplayModal() {
  document.getElementById('jongga-replay-overlay')?.classList.remove('open');
  if (typeof syncBodyScrollLock === 'function') syncBodyScrollLock();
}

function bindJonggaReplayControls() {
  JONGGA_REPLAY_STRATEGIES.forEach(({ key }) => {
    document.getElementById(`btn-open-jongga-replay-${key}`)?.addEventListener('click', () => openJonggaReplayModal(key));
  });
  document.getElementById('jongga-replay-close-btn')?.addEventListener('click', closeJonggaReplayModal);
  document.getElementById('jongga-replay-overlay')?.addEventListener('click', event => {
    if (event.target === document.getElementById('jongga-replay-overlay')) closeJonggaReplayModal();
  });
  
  // 메인 화면에 있는 기간 설정 인풋의 input 및 change 이벤트 처리
  const handlePeriodInput = event => {
    const target = event.target;
    if (!target || typeof target !== 'object') return;
    if (target.id !== 'jongga-replay-period-from' && target.id !== 'jongga-replay-period-to') return;
    if (typeof setJonggaReplayPeriod === 'function') {
      if (typeof setReplayDayPageIndex === 'function') {
        setReplayDayPageIndex(0, { rerender: false });
      }
      const current = typeof getJonggaReplayPeriod === 'function' ? getJonggaReplayPeriod() : { from: '', to: '' };
      setJonggaReplayPeriod({
        from: target.id === 'jongga-replay-period-from' ? target.value : current.from,
        to: target.id === 'jongga-replay-period-to' ? target.value : current.to
      });
    }
  };

  document.addEventListener('input', handlePeriodInput);
  document.addEventListener('change', handlePeriodInput);

  // 메인 화면에 있는 기간 리셋 버튼 클릭 이벤트 처리
  document.addEventListener('click', event => {
    const target = event.target;
    if (!target || typeof target !== 'object') return;
    if (target.id === 'btn-jongga-replay-period-reset') {
      if (typeof setJonggaReplayPeriod === 'function') {
        if (typeof setReplayDayPageIndex === 'function') {
          setReplayDayPageIndex(0, { rerender: false });
        }
        setJonggaReplayPeriod({ from: '', to: '' });
      }
    }
  });

  document.getElementById('jongga-replay-body')?.addEventListener('click', event => {
    const target = event.target;
    if (!target || typeof target !== 'object') return;
    if (target.id === 'btn-jongga-replay-stock-toggle') {
      toggleReplayStockSection();
      return;
    }
    if (target.id === 'btn-jongga-replay-days-prev') {
      moveReplayDayPage('older');
      return;
    }
    if (target.id === 'btn-jongga-replay-days-next') {
      moveReplayDayPage('newer');
      return;
    }
  });
  renderReplayStrategySections();
}
