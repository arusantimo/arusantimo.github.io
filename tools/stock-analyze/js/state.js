const NOTION_SLOT_IDS = ['slotA', 'slotB'];
const NOTION_SLOT_LABELS = {
  slotA: 'Page A',
  slotB: 'Page B'
};

function isSingleSlotUiMode() {
  return typeof document !== 'undefined' && Boolean(document.getElementById('jongga-quality-panel'));
}

function getUiSlotIds() {
  return isSingleSlotUiMode() ? ['slotA'] : NOTION_SLOT_IDS;
}

function shouldShowSlotLabel() {
  return !isSingleSlotUiMode();
}

function normalizeSlotId(slotId) {
  return NOTION_SLOT_IDS.includes(slotId) ? slotId : 'slotA';
}

function normalizeCodeKey(value) {
  return String(value ?? '').trim();
}

const ENTRY_STRATEGY_KEYS = new Set(['pullback', 'breakout', 'accumulation', 'momentum', 'reversal', 'swing']);
const JONGGA_REPLAY_VIEW_STORAGE_KEY = 'stockAnalyzeJonggaReplayViewModeV1';
const JONGGA_REPLAY_PERIOD_STORAGE_KEY = 'stockAnalyzeJonggaReplayPeriodV1';
const JONGGA_REPLAY_VIEW_MODES = {
  recommendation: {
    label: '매수추천',
    description: '과거 daily 추천 목록 기준으로 표시합니다.'
  },
  replay: {
    label: '6.0 & B',
    description: 'gradeScore 6.0 이상, B 이상 항목의 거래를 표시합니다.'
  },
  a7plus: {
    label: '7 & A',
    description: 'gradeScore 7.0 이상, A 등급 항목의 거래를 표시합니다.'
  },
  all: {
    label: '전체',
    description: '매수추천, 6.0 & B, 7 & A 거래를 모두 포함해 표시합니다.'
  }
};

function normalizeEntryStrategyKey(strategy) {
  const text = String(strategy || '').trim().toLowerCase();
  if (['pullback', 'trend_pullback', 'strategy1', 'strategy_1'].includes(text)) return 'pullback';
  if (['breakout', 'leader_breakout', 'momentum', 'supply_momentum', 'strategy2', 'strategy_2'].includes(text)) {
    return 'breakout';
  }
  if (['accumulation', 'supply_accumulation'].includes(text)) return 'accumulation';
  if (['reversal', 'leader_reversal', 'strategy3', 'strategy_3'].includes(text)) return 'reversal';
  if (['swing', 'holding'].includes(text)) return 'swing';
  return '';
}

function buildEntryKey(slotId, code, strategy = '') {
  const normalizedCode = normalizeCodeKey(code);
  const normalizedSlot = normalizeSlotId(slotId);
  const normalizedStrategy = normalizeEntryStrategyKey(strategy);
  if (!normalizedCode) return '';
  if (normalizedStrategy) {
    return `${normalizedSlot}:${normalizedStrategy}:${normalizedCode}`;
  }
  return `${normalizedSlot}:${normalizedCode}`;
}

function getEntryKey(target, fallbackSlotId = null) {
  if (target && typeof target === 'object') {
    if (target.entryKey) return String(target.entryKey);
    return buildEntryKey(
      target.slotId || fallbackSlotId,
      target.code,
      target.strategy || target.type
    );
  }

  if (typeof target === 'string' && target.includes(':')) {
    return target;
  }

  return buildEntryKey(fallbackSlotId || activeBuySlot, target);
}

function parseEntryKey(entryKey, fallbackSlotId = null) {
  const raw = String(entryKey ?? '').trim();
  if (!raw) {
    return {
      slotId: normalizeSlotId(fallbackSlotId),
      strategy: '',
      code: '',
      entryKey: ''
    };
  }

  if (raw.includes(':')) {
    const parts = raw.split(':');
    if (parts.length >= 3 && ENTRY_STRATEGY_KEYS.has(parts[1])) {
      const [slotPart, strategyPart, ...codeParts] = parts;
      const code = normalizeCodeKey(codeParts.join(':'));
      return {
        slotId: normalizeSlotId(slotPart),
        strategy: normalizeEntryStrategyKey(strategyPart),
        code,
        entryKey: buildEntryKey(slotPart, code, strategyPart)
      };
    }

    const [slotPart, codePart] = parts;
    return {
      slotId: normalizeSlotId(slotPart),
      strategy: '',
      code: normalizeCodeKey(codePart),
      entryKey: buildEntryKey(slotPart, codePart)
    };
  }

  const slotId = normalizeSlotId(fallbackSlotId);
  return {
    slotId,
    strategy: '',
    code: normalizeCodeKey(raw),
    entryKey: buildEntryKey(slotId, raw)
  };
}

function getEntryCode(target, fallbackSlotId = null) {
  return parseEntryKey(getEntryKey(target, fallbackSlotId), fallbackSlotId).code;
}

function getDomKey(target, fallbackSlotId = null) {
  return getEntryKey(target, fallbackSlotId).replace(/[^a-zA-Z0-9_-]/g, '-');
}

function getCardDomId(target, fallbackSlotId = null) {
  return `card-${getDomKey(target, fallbackSlotId)}`;
}

function getPriceRowDomId(target, fallbackSlotId = null) {
  return `price-row-${getDomKey(target, fallbackSlotId)}`;
}

function getMetaDomId(target, fallbackSlotId = null) {
  return `meta-${getDomKey(target, fallbackSlotId)}`;
}

function getPlanDomId(target, fallbackSlotId = null) {
  return `plan-${getDomKey(target, fallbackSlotId)}`;
}

function getIndicatorDomId(target, fallbackSlotId = null) {
  return `ind-${getDomKey(target, fallbackSlotId)}`;
}

function getBadgeDomId(target, fallbackSlotId = null) {
  return `badge-${getDomKey(target, fallbackSlotId)}`;
}

function getGapShiftDomId(target, fallbackSlotId = null) {
  return `gap-shift-${getDomKey(target, fallbackSlotId)}`;
}

function getSellContextDomId(target, fallbackSlotId = null) {
  return `sell-context-${getDomKey(target, fallbackSlotId)}`;
}

function getSlotLabel(slotId) {
  if (isSingleSlotUiMode()) return '현재 페이지';
  return NOTION_SLOT_LABELS[normalizeSlotId(slotId)];
}

function ensureEntryIdentity(entry, slotId) {
  if (!entry || typeof entry !== 'object') return entry;
  const normalizedSlotId = normalizeSlotId(slotId || entry.slotId);
  const next = entry;
  next.slotId = normalizedSlotId;
  next.strategy = normalizeEntryStrategyKey(next.strategy || next.type) || next.strategy || next.type;
  next.entryKey = buildEntryKey(normalizedSlotId, next.code, next.strategy || next.type);
  next.slotLabel = getSlotLabel(normalizedSlotId);
  return next;
}

function ensureStockIdentity(stock, slotId = null) {
  if (!stock || typeof stock !== 'object') return stock;
  const normalizedSlotId = normalizeSlotId(slotId || stock.slotId || activeSellSlot);
  const next = stock;
  next.slotId = normalizedSlotId;
  next.strategy = normalizeEntryStrategyKey(next.strategy || next.type) || next.strategy || next.type;
  next.entryKey = buildEntryKey(normalizedSlotId, next.code, next.strategy || next.type);
  next.slotLabel = getSlotLabel(normalizedSlotId);
  return next;
}

function decorateSnapshotEntries(slotId, snapshot = createEmptySnapshot()) {
  const normalizedSlotId = normalizeSlotId(slotId);
  const nextSnapshot = snapshot;
  nextSnapshot.slotId = normalizedSlotId;

  ['pullbackEntries', 'accumulationEntries', 'breakoutEntries', 'momentumEntries', 'reversalEntries', 'swingEntries'].forEach(key => {
    if (!Array.isArray(nextSnapshot[key])) nextSnapshot[key] = [];
    nextSnapshot[key] = nextSnapshot[key].map(entry => {
      const normalized = { ...entry };
      return key === 'swingEntries'
        ? ensureStockIdentity(normalized, normalizedSlotId)
        : ensureEntryIdentity(normalized, normalizedSlotId);
    });
  });

  return nextSnapshot;
}

function createEmptyNotionPageState(slotId) {
  const normalizedSlotId = normalizeSlotId(slotId);
  return {
    slotId: normalizedSlotId,
    label: getSlotLabel(normalizedSlotId),
    notionPageId: '',
    notionUrl: '',
    snapshot: decorateSnapshotEntries(normalizedSlotId, createEmptySnapshot()),
    loadedAt: '',
    status: 'idle',
    error: ''
  };
}

function createDefaultNotionPages() {
  return {
    slotA: createEmptyNotionPageState('slotA'),
    slotB: createEmptyNotionPageState('slotB')
  };
}

function createStockCollections() {
  return {
    pullback: [],
    breakout: [],
    accumulation: [],
    momentum: [],
    reversal: [],
    swing: []
  };
}

let activeTab = typeof getDefaultAnalyzerTab === 'function' ? getDefaultAnalyzerTab() : 'buy';
let lastScheduledAnalyzerPeriod = typeof getDefaultAnalyzerTab === 'function' ? getDefaultAnalyzerTab() : null;
let activeBuySlot = 'slotA';
let activeSellSlot = 'slotA';
let activeJonggaReplayViewMode = readStoredJonggaReplayViewMode();
let activeJonggaReplayPeriod = readStoredJonggaReplayPeriod();
let stocks = createStockCollections();
let notionPages = createDefaultNotionPages();
let notionSnapshot = getNotionPageState(activeBuySlot).snapshot;
let currentNotionPageId = getNotionPageState(activeSellSlot).notionPageId || '';
let liveGapState = createEmptyLiveGapState();
const stockDetailMap = {};
let currentModalState = { key: null, code: null, slotId: null, mode: null };
let isRegimeSummaryCollapsed = true;
let isJonggaQualityCollapsed = true;
let isJonggaCollectionLogCollapsed = true;
let isAnalysisRunning = false;

function syncAnalysisUIState() {
  const logOutput = document.getElementById('log-output');
  if (logOutput) {
    logOutput.classList.toggle('is-active', isAnalysisRunning);
  }
  if (typeof updateAnalyzeButtonState === 'function') updateAnalyzeButtonState();
  if (typeof updateCurrentTime === 'function') updateCurrentTime();
}

function setAnalysisRunning(nextValue) {
  isAnalysisRunning = Boolean(nextValue);
  syncAnalysisUIState();
  return isAnalysisRunning;
}

function syncLegacyStateAliases() {
  notionSnapshot = getNotionPageState(activeBuySlot).snapshot;
  currentNotionPageId = getNotionPageState(activeSellSlot).notionPageId || '';
}

function getNotionPageState(slotId) {
  return notionPages[normalizeSlotId(slotId)] || notionPages.slotA;
}

function setNotionPageState(slotId, patch = {}) {
  const normalizedSlotId = normalizeSlotId(slotId);
  const current = getNotionPageState(normalizedSlotId);
  notionPages[normalizedSlotId] = {
    ...current,
    ...patch,
    slotId: normalizedSlotId,
    label: getSlotLabel(normalizedSlotId),
    snapshot: patch.snapshot
      ? decorateSnapshotEntries(normalizedSlotId, patch.snapshot)
      : decorateSnapshotEntries(normalizedSlotId, current.snapshot || createEmptySnapshot())
  };
  syncLegacyStateAliases();
  return notionPages[normalizedSlotId];
}

function getSlotSnapshot(slotId) {
  return getNotionPageState(slotId).snapshot;
}

function getActiveBuySnapshot() {
  return getSlotSnapshot(activeBuySlot);
}

function getActiveSellSnapshot() {
  return getSlotSnapshot(activeSellSlot);
}

function normalizeJonggaReplayViewMode(value) {
  const normalized = String(value || '').trim();
  if (normalized === 'replay') return 'replay';
  if (normalized === 'a7plus' || normalized === 'a7' || normalized === 'gradea7plus') return 'a7plus';
  if (normalized === 'all') return 'all';
  return 'recommendation';
}

function getJonggaReplayViewMeta(mode = getJonggaReplayViewMode()) {
  const normalizedMode = normalizeJonggaReplayViewMode(mode);
  return JONGGA_REPLAY_VIEW_MODES[normalizedMode] || JONGGA_REPLAY_VIEW_MODES.recommendation;
}

function readStoredJonggaReplayViewMode() {
  try {
    return normalizeJonggaReplayViewMode(localStorage.getItem(JONGGA_REPLAY_VIEW_STORAGE_KEY) || 'recommendation');
  } catch {
    return 'recommendation';
  }
}

function getJonggaReplayViewMode() {
  activeJonggaReplayViewMode = normalizeJonggaReplayViewMode(activeJonggaReplayViewMode);
  return activeJonggaReplayViewMode;
}

function persistJonggaReplayViewMode(mode) {
  activeJonggaReplayViewMode = normalizeJonggaReplayViewMode(mode);
  try {
    localStorage.setItem(JONGGA_REPLAY_VIEW_STORAGE_KEY, activeJonggaReplayViewMode);
  } catch {}
  return activeJonggaReplayViewMode;
}

function normalizeJonggaReplayDate(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const dateOnly = raw.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(dateOnly) ? dateOnly : '';
}

function normalizeJonggaReplayPeriod(value = {}) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { from: '', to: '' };
  }
  let from = normalizeJonggaReplayDate(value.from ?? value.start ?? value.startDate);
  let to = normalizeJonggaReplayDate(value.to ?? value.end ?? value.endDate);
  if (from && to && from > to) {
    const swap = from;
    from = to;
    to = swap;
  }
  return { from, to };
}

function readStoredJonggaReplayPeriod() {
  try {
    const raw = localStorage.getItem(JONGGA_REPLAY_PERIOD_STORAGE_KEY);
    if (!raw) return { from: '', to: '' };
    return normalizeJonggaReplayPeriod(JSON.parse(raw));
  } catch {
    return { from: '', to: '' };
  }
}

function persistJonggaReplayPeriod(period) {
  activeJonggaReplayPeriod = normalizeJonggaReplayPeriod(period);
  try {
    localStorage.setItem(JONGGA_REPLAY_PERIOD_STORAGE_KEY, JSON.stringify(activeJonggaReplayPeriod));
  } catch {}
  return activeJonggaReplayPeriod;
}

function getJonggaReplayPeriod() {
  activeJonggaReplayPeriod = normalizeJonggaReplayPeriod(activeJonggaReplayPeriod);
  return activeJonggaReplayPeriod;
}

function hasJonggaReplayPeriodFilter(period = getJonggaReplayPeriod()) {
  return Boolean(normalizeJonggaReplayPeriod(period).from || normalizeJonggaReplayPeriod(period).to);
}

function getJonggaReplayAvailablePeriod(bridge = getJonggaReplayBridgePayload()) {
  const latestRun = bridge?.latestRun;
  if (!latestRun || typeof latestRun !== 'object') {
    return { from: '', to: '' };
  }
  const dates = Array.isArray(latestRun.analysisDates) && latestRun.analysisDates.length
    ? latestRun.analysisDates
    : Array.isArray(latestRun.days)
      ? latestRun.days.map(day => day?.date).filter(Boolean)
      : [];
  const normalized = dates
    .map(normalizeJonggaReplayDate)
    .filter(Boolean)
    .sort();
  if (!normalized.length) return { from: '', to: '' };
  return { from: normalized[0], to: normalized[normalized.length - 1] };
}

function isJonggaReplayDateInPeriod(dateValue, period = getJonggaReplayPeriod()) {
  const normalizedDate = normalizeJonggaReplayDate(dateValue);
  if (!normalizedDate) return false;
  const normalizedPeriod = normalizeJonggaReplayPeriod(period);
  if (!normalizedPeriod.from && !normalizedPeriod.to) return true;
  if (normalizedPeriod.from && normalizedDate < normalizedPeriod.from) return false;
  if (normalizedPeriod.to && normalizedDate > normalizedPeriod.to) return false;
  return true;
}

function filterJonggaReplayDaysByPeriod(days = [], period = getJonggaReplayPeriod()) {
  return (Array.isArray(days) ? days : []).filter(day => isJonggaReplayDateInPeriod(day?.date, period));
}

function getJonggaReplayPeriodLabel(period = getJonggaReplayPeriod(), bridge = getJonggaReplayBridgePayload()) {
  const normalizedPeriod = normalizeJonggaReplayPeriod(period);
  if (!normalizedPeriod.from && !normalizedPeriod.to) return '전체';
  const available = getJonggaReplayAvailablePeriod(bridge);
  const from = normalizedPeriod.from || available.from || '시작일';
  const to = normalizedPeriod.to || available.to || '종료일';
  return `${from} ~ ${to}`;
}

function setJonggaReplayPeriod(period, { persist = true, rerender = true } = {}) {
  const nextPeriod = normalizeJonggaReplayPeriod(period);
  if (persist) persistJonggaReplayPeriod(nextPeriod);
  else activeJonggaReplayPeriod = nextPeriod;
  updateJonggaReplayViewControls();
  if (typeof renderReplayStrategySections === 'function') {
    renderReplayStrategySections();
  }
  if (rerender && typeof renderJonggaReplayModal === 'function') {
    renderJonggaReplayModal();
  }
  return nextPeriod;
}

function getJonggaReplayViewGroups(snapshot = getActiveBuySnapshot()) {
  return {
    pullback: Array.isArray(snapshot?.pullbackEntries) ? snapshot.pullbackEntries : [],
    accumulation: Array.isArray(snapshot?.accumulationEntries) ? snapshot.accumulationEntries : [],
    breakout: Array.isArray(snapshot?.breakoutEntries) ? snapshot.breakoutEntries : (Array.isArray(snapshot?.momentumEntries) ? snapshot.momentumEntries : []),
    reversal: Array.isArray(snapshot?.reversalEntries) ? snapshot.reversalEntries : []
  };
}

function getJonggaReplayEntryGradeScore(entry = {}) {
  const gradeScore = Number(entry.gradeScore);
  if (Number.isFinite(gradeScore)) return gradeScore;
  const fallbackScore = Number(entry.score);
  return Number.isFinite(fallbackScore) ? fallbackScore : null;
}

function matchesJonggaReplayViewMode(entry = {}, mode = getJonggaReplayViewMode()) {
  const normalizedMode = normalizeJonggaReplayViewMode(mode);
  if (normalizedMode === 'all') return true;
  if (normalizedMode === 'replay') {
    const gradeScore = getJonggaReplayEntryGradeScore(entry);
    const gradeCode = String(entry.grade || '').trim().charAt(0).toUpperCase();
    return !Boolean(entry?.entryEligible) && Number.isFinite(gradeScore) && gradeScore >= 6.0 && ['S', 'A', 'B'].includes(gradeCode);
  }
  if (normalizedMode === 'a7plus') {
    const gradeScore = getJonggaReplayEntryGradeScore(entry);
    const gradeCode = String(entry.grade || '').trim().charAt(0).toUpperCase();
    return Number.isFinite(gradeScore) && gradeScore >= 7.0 && gradeCode === 'A';
  }

  if (typeof inferEntryEligibilityFromEntry === 'function') {
    return Boolean(inferEntryEligibilityFromEntry(entry).entryEligible);
  }

  return Boolean(entry?.entryEligible);
}

function filterJonggaReplayViewEntries(entries = [], mode = getJonggaReplayViewMode()) {
  const list = Array.isArray(entries) ? entries : [];
  return list.filter(entry => matchesJonggaReplayViewMode(entry, mode));
}

function getJonggaReplayViewCounts(snapshot = getActiveBuySnapshot()) {
  const groups = getJonggaReplayViewGroups(snapshot);
  const allEntries = [
    ...groups.pullback,
    ...groups.accumulation,
    ...groups.breakout,
    ...groups.reversal
  ];
  const recommendationCount = filterJonggaReplayViewEntries(allEntries, 'recommendation').length;
  const replayCount = filterJonggaReplayViewEntries(allEntries, 'replay').length;
  const a7plusCount = filterJonggaReplayViewEntries(allEntries, 'a7plus').length;
  const allCount = allEntries.length;
  const activeMode = getJonggaReplayViewMode();
  const activeCount = filterJonggaReplayViewEntries(allEntries, activeMode).length;
  const activeMeta = getJonggaReplayViewMeta(activeMode);
  return {
    recommendationCount,
    replayCount,
    a7plusCount,
    allCount,
    activeCount,
    activeMode,
    activeLabel: activeMeta.label
  };
}

function formatJonggaReplaySummaryPercent(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
}

function getJonggaReplayBridgePayload() {
  if (typeof window === 'undefined') return null;
  const payload = window.JONGGA_REPLAY_RUNS;
  return payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : null;
}

function getJonggaReplayCumulativeReturnPct(mode = getJonggaReplayViewMode()) {
  const bridge = getJonggaReplayBridgePayload();
  const latestRun = bridge?.latestRun;
  if (!latestRun || typeof latestRun !== 'object') return null;

  const normalizedMode = normalizeJonggaReplayViewMode(mode);
  const period = getJonggaReplayPeriod();
  if (typeof buildJonggaReplayPeriodSummary === 'function' && hasJonggaReplayPeriodFilter(period)) {
    try {
      const summaryView = buildJonggaReplayPeriodSummary(bridge, null, normalizedMode, period);
      const cumulativeReturn = Number(summaryView?.summary?.cumNetReturnPct);
      if (Number.isFinite(cumulativeReturn)) return cumulativeReturn;
    } catch {}
  }
  if (normalizedMode === 'all') {
    const overall = latestRun.summary?.overall || latestRun.summary || {};
    const overallReturn = Number(overall?.cumNetReturnPct);
    return Number.isFinite(overallReturn) ? overallReturn : null;
  }

  const strategyViews = latestRun.strategyViews;
  if (!strategyViews || typeof strategyViews !== 'object') return null;

  const returns = [];
  Object.values(strategyViews).forEach(view => {
    const days = Array.isArray(view?.caseViews?.[normalizedMode]?.days)
      ? view.caseViews[normalizedMode].days
      : [];
    days.forEach(day => {
      const trades = Array.isArray(day?.trades) ? day.trades : [];
      trades.forEach(item => {
        const value = Number(item?.netReturnPct);
        if (Number.isFinite(value)) returns.push(value);
      });
    });
  });

  if (!returns.length) return null;
  let equity = 1;
  returns.forEach(value => {
    equity *= 1 + (value / 100);
  });
  return (equity - 1) * 100;
}

function updateJonggaReplayViewControls(snapshot = getActiveBuySnapshot()) {
  const activeMode = getJonggaReplayViewMode();
  const activeMeta = getJonggaReplayViewMeta(activeMode);
  document.querySelectorAll('[data-jongga-replay-view]').forEach(button => {
    const viewMode = normalizeJonggaReplayViewMode(button.dataset.jonggaReplayView);
    button.classList.toggle('active', viewMode === activeMode);
    button.setAttribute('aria-pressed', String(viewMode === activeMode));
    button.title = getJonggaReplayViewMeta(viewMode).description;
  });

  const summary = document.getElementById('jongga-replay-view-summary');
  if (summary) {
    const counts = getJonggaReplayViewCounts(snapshot);
    const cumulativeReturnPct = getJonggaReplayCumulativeReturnPct(activeMode);
    const periodLabel = getJonggaReplayPeriodLabel();
    summary.innerHTML = `
      <span>기간 ${periodLabel}</span>
      <span>매수추천 ${counts.recommendationCount}건</span>
      <span>7 & A ${counts.a7plusCount}건</span>
      <span>6.0 & B ${counts.replayCount}건</span>
      <span>전체 ${counts.allCount}건</span>
      <span>누적 수익률 ${formatJonggaReplaySummaryPercent(cumulativeReturnPct)}</span>
      <span class="jongga-replay-view-current">${activeMeta.label} ${counts.activeCount}건</span>
    `;
  }
}

function setJonggaReplayViewMode(mode, { persist = true, rerender = true } = {}) {
  const nextMode = normalizeJonggaReplayViewMode(mode);
  if (persist) persistJonggaReplayViewMode(nextMode);
  else activeJonggaReplayViewMode = nextMode;
  updateJonggaReplayViewControls();
  if (typeof renderReplayStrategySections === 'function') {
    renderReplayStrategySections();
  }
  if (rerender && typeof renderBuyStockCards === 'function') {
    renderBuyStockCards();
  }
  if (typeof renderJonggaReplayModal === 'function') {
    renderJonggaReplayModal();
  }
  return nextMode;
}

function setActiveBuySlot(slotId) {
  activeBuySlot = normalizeSlotId(slotId);
  syncLegacyStateAliases();
  return activeBuySlot;
}

function setActiveSellSlot(slotId) {
  activeSellSlot = normalizeSlotId(slotId);
  syncLegacyStateAliases();
  return activeSellSlot;
}

function getStocksBySlot(slotId, type = null) {
  const normalizedSlotId = normalizeSlotId(slotId);
  if (type) {
    return (stocks[type] || [])
      .filter(stock => stock.slotId === normalizedSlotId)
      .map(stock => ensureStockIdentity(stock, normalizedSlotId));
  }

  return Object.fromEntries(
    Object.keys(stocks).map(stockType => [stockType, getStocksBySlot(normalizedSlotId, stockType)])
  );
}

function replaceStocksForSlot(slotId, nextCollections) {
  const normalizedSlotId = normalizeSlotId(slotId);
  Object.keys(stocks).forEach(type => {
    const preserved = (stocks[type] || []).filter(stock => stock.slotId !== normalizedSlotId);
    const replacements = (nextCollections?.[type] || []).map(stock => ensureStockIdentity(stock, normalizedSlotId));
    stocks[type] = [...preserved, ...replacements];
  });
}

function getStockDetailByKey(entryKey, slotId = null) {
  const resolvedKey = getEntryKey(entryKey, slotId);
  if (stockDetailMap[resolvedKey]) return stockDetailMap[resolvedKey];

  const parsed = parseEntryKey(entryKey, slotId);
  if (parsed.code && !parsed.strategy) {
    return Object.values(stockDetailMap).find(detail => (
      detail?.stock?.slotId === parsed.slotId && detail.stock?.code === parsed.code
    )) || null;
  }
  if (parsed.strategy && parsed.code) {
    return Object.values(stockDetailMap).find(detail => (
      detail?.stock?.entryKey === resolvedKey
    )) || null;
  }
  return null;
}
