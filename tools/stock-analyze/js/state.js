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
const JONGGA_REPLAY_VIEW_STORAGE_KEY = 'stockAnalyzeJonggaReplayViewModeV2';
const JONGGA_REPLAY_PERIOD_STORAGE_KEY = 'stockAnalyzeJonggaReplayPeriodV1';
const JONGGA_BUY_STATUS_MARKERS = ['강력매수', '매수추천', '최우선 진입', '진입 가능'];
const JONGGA_REPLAY_STRICT_PULLBACK_GATE_CODES = new Set(['G10', 'G11', 'G12', 'G13']);
const JONGGA_REPLAY_VIEW_MODES = {
  recommendation: {
    label: '매수추천',
    description: '매수추천 라벨 또는 entryEligible 기준으로 표시합니다.'
  },
  a7plus: {
    label: '7 & A',
    description: 'gradeScore 7.0 이상이면서 A 또는 S 등급인 거래를 표시합니다.'
  },
  all: {
    label: '전체',
    description: '매수추천, 7 & A 거래를 모두 포함해 표시합니다.'
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

const ANALYZER_ACTIVE_TAB_STORAGE_KEY = 'stockAnalyzeActiveTabV1';

function readStoredActiveTab() {
  try {
    return localStorage.getItem(ANALYZER_ACTIVE_TAB_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function persistActiveTab(tab) {
  try {
    if (tab === 'buy' || tab === 'sell') {
      localStorage.setItem(ANALYZER_ACTIVE_TAB_STORAGE_KEY, tab);
    }
  } catch {}
}

let activeTab = readStoredActiveTab() || (typeof getDefaultAnalyzerTab === 'function' ? getDefaultAnalyzerTab() : 'buy');
let lastScheduledAnalyzerPeriod = typeof getDefaultAnalyzerTab === 'function' ? getDefaultAnalyzerTab() : null;
let activeBuySlot = 'slotA';
let activeSellSlot = 'slotA';
let activeJonggaReplayViewMode = readStoredJonggaReplayViewMode();
let activeJonggaReplayPeriod = readStoredJonggaReplayPeriod();
let activeBuyBreakoutVisible = false;
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

function isJonggaBuyBreakoutVisible() {
  return Boolean(activeBuyBreakoutVisible);
}

function setJonggaBuyBreakoutVisible(visible) {
  activeBuyBreakoutVisible = Boolean(visible);
  return activeBuyBreakoutVisible;
}

function getJonggaReplayAggregateStrategyKeys(snapshot = getActiveBuySnapshot()) {
  const strategies = ['pullback', 'accumulation', 'reversal'];
  if (isJonggaBuyBreakoutVisible()) {
    strategies.splice(2, 0, 'breakout');
  }
  return strategies;
}

function normalizeJonggaReplayViewMode(value) {
  const normalized = String(value || '').trim();
  if (normalized === 'recommendation') return 'recommendation';
  if (normalized === 'a8plus' || normalized === 'gradea8plus') return 'a7plus';
  if (normalized === 'a7plus' || normalized === 'a7' || normalized === 'gradea7plus') return 'a7plus';
  if (normalized === 'all') return 'all';
  return 'all';
}

function getJonggaReplayViewMeta(mode = getJonggaReplayViewMode()) {
  const normalizedMode = normalizeJonggaReplayViewMode(mode);
  return JONGGA_REPLAY_VIEW_MODES[normalizedMode] || JONGGA_REPLAY_VIEW_MODES.all;
}

function isJonggaRecommendationStatusLabel(entry = {}) {
  const label = String(entry?.statusLabel || '').trim();
  if (!label || label === '제외' || label.includes('매매금지')) return false;
  return JONGGA_BUY_STATUS_MARKERS.some(marker => label.includes(marker));
}

function getJonggaReplayEntryGradeCode(entry = {}) {
  return String(entry?.replayGrade || entry?.grade || '').trim().charAt(0).toUpperCase();
}

function getJonggaReplayBlockedGateCodes(entry = {}) {
  return new Set(
    [...(entry?.filters || []), ...(entry?.gates || [])]
      .filter(row => row?.status === '⛔')
      .map(row => String(row?.code || '').trim())
      .filter(Boolean)
  );
}

function isJonggaReplayPullbackGateOk(entry = {}, eligibility = null) {
  const strategy = normalizeEntryStrategyKey(entry?.strategy || entry?.type);
  if (strategy !== 'pullback') return true;
  if (entry?.pullbackReplayGateOk === true || entry?.pullbackReplayGateOk === false) {
    return Boolean(entry.pullbackReplayGateOk);
  }
  const blockedCodes = getJonggaReplayBlockedGateCodes(entry);
  for (const code of JONGGA_REPLAY_STRICT_PULLBACK_GATE_CODES) {
    if (blockedCodes.has(code)) return false;
  }
  const resolvedEligibility = eligibility || (
    typeof inferEntryEligibilityFromEntry === 'function'
      ? inferEntryEligibilityFromEntry(entry)
      : { entryEligible: Boolean(entry?.entryEligible), entryWatch: Boolean(entry?.entryWatch) }
  );
  const setupQuality = String(entry?.setupQuality || '').trim();
  const statusLabel = String(entry?.statusLabel || '').trim();
  if (setupQuality === 'setup_weak' && statusLabel.startsWith('매매금지(')) {
    return false;
  }
  if (!resolvedEligibility?.entryEligible && statusLabel.startsWith('매매금지(')) {
    return false;
  }
  return true;
}

function readStoredJonggaReplayViewMode() {
  try {
    return normalizeJonggaReplayViewMode(localStorage.getItem(JONGGA_REPLAY_VIEW_STORAGE_KEY) || 'all');
  } catch {
    return 'all';
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

function getJonggaReplayPeriodDayCount(bridge = getJonggaReplayBridgePayload(), period = getJonggaReplayPeriod()) {
  const latestRun = bridge?.latestRun;
  if (!latestRun || typeof latestRun !== 'object') return 0;
  const dates = Array.isArray(latestRun.analysisDates) && latestRun.analysisDates.length
    ? latestRun.analysisDates
    : Array.isArray(latestRun.days)
      ? latestRun.days.map(day => day?.date)
      : [];
  const filtered = dates
    .map(normalizeJonggaReplayDate)
    .filter(dateValue => dateValue && isJonggaReplayDateInPeriod(dateValue, period));
  return new Set(filtered).size;
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
  const eligibility = typeof inferEntryEligibilityFromEntry === 'function'
    ? inferEntryEligibilityFromEntry(entry)
    : { entryEligible: Boolean(entry?.entryEligible), entryWatch: Boolean(entry?.entryWatch) };
  const pullbackGateOk = isJonggaReplayPullbackGateOk(entry, eligibility);
  if (normalizedMode === 'a7plus') {
    const gradeScore = getJonggaReplayEntryGradeScore(entry);
    const gradeCode = getJonggaReplayEntryGradeCode(entry);
    return pullbackGateOk && Number.isFinite(gradeScore) && gradeScore >= 7.0 && ['A', 'S'].includes(gradeCode);
  }
  return pullbackGateOk && (Boolean(entry?.historyRecommendation) || Boolean(eligibility.entryEligible) || isJonggaRecommendationStatusLabel(entry));
}

function filterJonggaReplayViewEntries(entries = [], mode = getJonggaReplayViewMode()) {
  const list = Array.isArray(entries) ? entries : [];
  return list.filter(entry => matchesJonggaReplayViewMode(entry, mode));
}

function getJonggaReplayVisibleEntryKeys(snapshot = getActiveBuySnapshot(), mode = getJonggaReplayViewMode()) {
  const groups = getJonggaReplayViewGroups(snapshot);
  const allEntries = [
    ...groups.pullback,
    ...groups.accumulation,
    ...groups.breakout,
    ...groups.reversal
  ];
  return new Set(
    filterJonggaReplayViewEntries(allEntries, mode)
      .map(entry => {
        const strategy = normalizeEntryStrategyKey(entry?.strategy || entry?.type);
        const code = normalizeCodeKey(entry?.code);
        return strategy && code ? `${strategy}|${code}` : '';
      })
      .filter(Boolean)
  );
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
  const a7plusCount = filterJonggaReplayViewEntries(allEntries, 'a7plus').length;
  const allCount = allEntries.length;
  const activeMode = getJonggaReplayViewMode();
  const activeCount = filterJonggaReplayViewEntries(allEntries, activeMode).length;
  const activeMeta = getJonggaReplayViewMeta(activeMode);
  return {
    recommendationCount,
    a7plusCount,
    allCount,
    activeCount,
    activeMode,
    activeLabel: activeMeta.label
  };
}

function formatJonggaReplaySummaryPercent(value) {
  if (value === null || value === undefined || value === '') return '—';
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
}

function getJonggaReplayBridgePayload() {
  if (typeof window === 'undefined') return null;
  const payload = window.JONGGA_REPLAY_RUNS;
  return payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : null;
}

function getJonggaReplayCumulativeReturnPct(mode = getJonggaReplayViewMode(), snapshot = getActiveBuySnapshot()) {
  const bridge = getJonggaReplayBridgePayload();
  const latestRun = bridge?.latestRun;
  if (!latestRun || typeof latestRun !== 'object') return null;

  const normalizedMode = normalizeJonggaReplayViewMode(mode);
  const aggregateStrategies = getJonggaReplayAggregateStrategyKeys(snapshot);
  if (normalizedMode === 'all' && aggregateStrategies.length === 4) {
    const overallCaseReturn = Number(latestRun.summary?.comparisonByCase?.all?.cumNetReturnPct);
    if (Number.isFinite(overallCaseReturn)) return overallCaseReturn;
    const overall = latestRun.summary?.overall || latestRun.summary || {};
    const overallReturn = Number(overall?.cumNetReturnPct);
    return Number.isFinite(overallReturn) ? overallReturn : null;
  }

  if (typeof getReplayStrategyView === 'function') {
    const returns = [];
    aggregateStrategies.forEach(strategy => {
      const strategyView = getReplayStrategyView(strategy, bridge, normalizedMode);
      (Array.isArray(strategyView?.days) ? strategyView.days : []).forEach(day => {
        (Array.isArray(day?.trades) ? day.trades : []).forEach(item => {
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

  const caseSummaryReturn = Number(latestRun.summary?.comparisonByCase?.[normalizedMode]?.cumNetReturnPct);
  if (Number.isFinite(caseSummaryReturn)) return caseSummaryReturn;

  const strategyViews = latestRun.strategyViews;
  if (!strategyViews || typeof strategyViews !== 'object') return null;

  const returns = [];
  aggregateStrategies.forEach(strategy => {
    const view = strategyViews?.[strategy];
    if (!view || typeof view !== 'object') return;
    const days = normalizedMode === 'all'
      ? (Array.isArray(view?.days) ? view.days : [])
      : (Array.isArray(view?.caseViews?.[normalizedMode]?.days)
        ? view.caseViews[normalizedMode].days
        : []);
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
  document.querySelectorAll('[data-jongga-replay-view]').forEach(button => {
    const viewMode = normalizeJonggaReplayViewMode(button.dataset.jonggaReplayView);
    button.classList.toggle('active', viewMode === activeMode);
    button.setAttribute('aria-pressed', String(viewMode === activeMode));
    button.title = getJonggaReplayViewMeta(viewMode).description;
  });

  const summary = document.getElementById('jongga-replay-view-summary');
  if (summary) {
    const cumulativeReturnPct = getJonggaReplayCumulativeReturnPct(activeMode, snapshot);
    const replayDayCount = getJonggaReplayPeriodDayCount();
    summary.innerHTML = `
      <span>리플레이 총 ${replayDayCount}일</span>
      <span>누적 수익률 ${formatJonggaReplaySummaryPercent(cumulativeReturnPct)}</span>
    `;
  }

  // 메인 화면의 기간 설정 인풋 엘리먼트 동기화
  const fromInput = document.getElementById('jongga-replay-period-from');
  const toInput = document.getElementById('jongga-replay-period-to');
  if (fromInput || toInput) {
    const activePeriod = getJonggaReplayPeriod();
    const bridge = getJonggaReplayBridgePayload();
    const availablePeriod = getJonggaReplayAvailablePeriod(bridge);

    if (fromInput) {
      fromInput.value = activePeriod.from || '';
      fromInput.min = availablePeriod.from || '';
      fromInput.max = availablePeriod.to || '';
    }
    if (toInput) {
      toInput.value = activePeriod.to || '';
      toInput.min = availablePeriod.from || '';
      toInput.max = availablePeriod.to || '';
    }
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
