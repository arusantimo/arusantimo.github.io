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

function buildEntryKey(slotId, code) {
  const normalizedCode = normalizeCodeKey(code);
  return normalizedCode ? `${normalizeSlotId(slotId)}:${normalizedCode}` : '';
}

function getEntryKey(target, fallbackSlotId = null) {
  if (target && typeof target === 'object') {
    if (target.entryKey) return String(target.entryKey);
    return buildEntryKey(target.slotId || fallbackSlotId, target.code);
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
      code: '',
      entryKey: ''
    };
  }

  if (raw.includes(':')) {
    const [slotPart, codePart] = raw.split(':');
    return {
      slotId: normalizeSlotId(slotPart),
      code: normalizeCodeKey(codePart),
      entryKey: buildEntryKey(slotPart, codePart)
    };
  }

  const slotId = normalizeSlotId(fallbackSlotId);
  return {
    slotId,
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
  next.entryKey = buildEntryKey(normalizedSlotId, next.code);
  next.slotLabel = getSlotLabel(normalizedSlotId);
  return next;
}

function ensureStockIdentity(stock, slotId = null) {
  if (!stock || typeof stock !== 'object') return stock;
  const normalizedSlotId = normalizeSlotId(slotId || stock.slotId || activeSellSlot);
  const next = stock;
  next.slotId = normalizedSlotId;
  next.entryKey = buildEntryKey(normalizedSlotId, next.code);
  next.slotLabel = getSlotLabel(normalizedSlotId);
  return next;
}

function decorateSnapshotEntries(slotId, snapshot = createEmptySnapshot()) {
  const normalizedSlotId = normalizeSlotId(slotId);
  const nextSnapshot = snapshot;
  nextSnapshot.slotId = normalizedSlotId;

  ['pullbackEntries', 'momentumEntries', 'reversalEntries', 'swingEntries'].forEach(key => {
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
    momentum: [],
    reversal: [],
    swing: []
  };
}

let activeTab = 'buy';
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
  return stockDetailMap[getEntryKey(entryKey, slotId)] || null;
}
