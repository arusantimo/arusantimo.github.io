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
