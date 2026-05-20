function createDefaultSellTrackingState() {
  return {
    universeMode: 'actual',
    trackedEntryKeys: []
  };
}

function normalizeTrackedEntryKeys(state = {}, slotId = activeSellSlot) {
  const source = state && typeof state === 'object' ? state : {};
  const next = createDefaultSellTrackingState();
  next.universeMode = source.universeMode === 'all' ? 'all' : 'actual';

  const legacyTrackedCodes = Array.isArray(source.trackedCodes)
    ? source.trackedCodes.map(code => buildEntryKey(slotId, code))
    : [];
  const trackedEntryKeys = Array.isArray(source.trackedEntryKeys) ? source.trackedEntryKeys : [];

  next.trackedEntryKeys = [...new Set(
    [...trackedEntryKeys, ...legacyTrackedCodes]
      .map(key => getEntryKey(key, slotId))
      .filter(Boolean)
  )];
  return next;
}

function readSellTrackingStore() {
  try {
    const raw = localStorage.getItem(SELL_TRACKING_STATE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

function writeSellTrackingStore(store) {
  try {
    localStorage.setItem(SELL_TRACKING_STATE_KEY, JSON.stringify(store));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getSellTrackingScopeKey(slotId = activeSellSlot) {
  const normalizedSlotId = normalizeSlotId(slotId);
  const pageId = getNotionPageState(normalizedSlotId).notionPageId || '__manual__';
  return `${normalizedSlotId}:${pageId}`;
}

function getLegacySellTrackingScopeKey(slotId = activeSellSlot) {
  const normalizedSlotId = normalizeSlotId(slotId);
  if (normalizedSlotId !== 'slotA') return '';
  return getNotionPageState(normalizedSlotId).notionPageId || '__manual__';
}

function getCurrentSellTrackingState(slotId = activeSellSlot) {
  const normalizedSlotId = normalizeSlotId(slotId);
  const store = readSellTrackingStore();
  const currentScope = getSellTrackingScopeKey(normalizedSlotId);
  if (store[currentScope]) {
    return normalizeTrackedEntryKeys(store[currentScope], normalizedSlotId);
  }

  const legacyScope = getLegacySellTrackingScopeKey(normalizedSlotId);
  if (legacyScope && store[legacyScope]) {
    const migrated = normalizeTrackedEntryKeys(store[legacyScope], normalizedSlotId);
    store[currentScope] = migrated;
    delete store[legacyScope];
    writeSellTrackingStore(store);
    return migrated;
  }

  return normalizeTrackedEntryKeys(null, normalizedSlotId);
}

function updateCurrentSellTrackingState(updater, slotId = activeSellSlot) {
  const normalizedSlotId = normalizeSlotId(slotId);
  const store = readSellTrackingStore();
  const scopeKey = getSellTrackingScopeKey(normalizedSlotId);
  const currentState = normalizeTrackedEntryKeys(store[scopeKey], normalizedSlotId);
  const nextState = normalizeTrackedEntryKeys(
    typeof updater === 'function' ? updater(currentState) : { ...currentState, ...updater },
    normalizedSlotId
  );
  store[scopeKey] = nextState;
  writeSellTrackingStore(store);
  return nextState;
}

function getSellUniverseMode(slotId = activeSellSlot) {
  return getCurrentSellTrackingState(slotId).universeMode;
}

function setSellUniverseMode(mode, slotId = activeSellSlot) {
  return updateCurrentSellTrackingState(state => ({
    ...state,
    universeMode: mode === 'all' ? 'all' : 'actual'
  }), slotId);
}

function getTrackedSellEntryKeys(slotId = activeSellSlot) {
  return new Set(getCurrentSellTrackingState(slotId).trackedEntryKeys);
}

function isBuyEntryTrackedForSell(entryOrKey, slotId = null) {
  const normalizedSlotId = normalizeSlotId(slotId || (typeof entryOrKey === 'object' ? entryOrKey.slotId : activeSellSlot));
  return getTrackedSellEntryKeys(normalizedSlotId).has(getEntryKey(entryOrKey, normalizedSlotId));
}

function setBuyEntryTrackedForSell(entryOrKey, tracked, slotId = null) {
  const normalizedSlotId = normalizeSlotId(slotId || (typeof entryOrKey === 'object' ? entryOrKey.slotId : activeSellSlot));
  const entryKey = getEntryKey(entryOrKey, normalizedSlotId);
  if (!entryKey) return getCurrentSellTrackingState(normalizedSlotId);

  return updateCurrentSellTrackingState(state => {
    const nextKeys = new Set(state.trackedEntryKeys);
    if (tracked) nextKeys.add(entryKey);
    else nextKeys.delete(entryKey);
    return {
      ...state,
      trackedEntryKeys: [...nextKeys]
    };
  }, normalizedSlotId);
}

function toggleBuyEntryTrackedForSell(entryOrKey, slotId = null) {
  const normalizedSlotId = normalizeSlotId(slotId || (typeof entryOrKey === 'object' ? entryOrKey.slotId : activeSellSlot));
  const tracked = !isBuyEntryTrackedForSell(entryOrKey, normalizedSlotId);
  setBuyEntryTrackedForSell(entryOrKey, tracked, normalizedSlotId);
  return tracked;
}

function isAlwaysVisibleSellStock(stock) {
  return Boolean(stock?.type === 'swing' || stock?.manual || stock?.source === 'manual');
}

function isSellStockVisible(stock, universeMode = getSellUniverseMode(stock?.slotId || activeSellSlot)) {
  if (!stock) return false;
  if (isAlwaysVisibleSellStock(stock)) return true;
  if (universeMode === 'all') return true;

  const entry = stock.type === 'swing' ? null : getEntryByCode(stock.entryKey || stock.code, stock.slotId);
  if (entry) {
    const presentation = typeof getBuyPresentation === 'function' ? getBuyPresentation(entry) : null;
    const primaryGrade = presentation?.primaryGrade || entry.grade || '';
    if (primaryGrade.startsWith('S') || primaryGrade.startsWith('A')) {
      return true;
    }
  }

  return isBuyEntryTrackedForSell(stock.entryKey || stock.code, stock.slotId);
}

function getSellStocksByType(type, slotId = activeSellSlot, universeMode = getSellUniverseMode(slotId)) {
  const normalizedSlotId = normalizeSlotId(slotId);
  return (stocks[type] || [])
    .filter(stock => stock.slotId === normalizedSlotId)
    .map(stock => ensureStockIdentity(stock, normalizedSlotId))
    .filter(stock => isSellStockVisible(stock, universeMode));
}

function getVisibleSellStockCollections(slotId = activeSellSlot, universeMode = getSellUniverseMode(slotId)) {
  return {
    swing: getSellStocksByType('swing', slotId, universeMode),
    pullback: getSellStocksByType('pullback', slotId, universeMode),
    momentum: getSellStocksByType('momentum', slotId, universeMode),
    reversal: getSellStocksByType('reversal', slotId, universeMode)
  };
}

function getVisibleSellStocksList(slotId = activeSellSlot, universeMode = getSellUniverseMode(slotId)) {
  const collections = getVisibleSellStockCollections(slotId, universeMode);
  return [...collections.swing, ...collections.pullback, ...collections.momentum, ...collections.reversal];
}

function getAllSellStocks() {
  return ['swing', 'pullback', 'momentum', 'reversal']
    .flatMap(type => stocks[type] || [])
    .map(stock => ensureStockIdentity(stock, stock.slotId));
}

function getSellStocksForAnalysis(isBefore0908, slotId = activeSellSlot, universeMode = getSellUniverseMode(slotId)) {
  const collections = getVisibleSellStockCollections(slotId, universeMode);
  return isBefore0908
    ? [...collections.swing, ...collections.momentum, ...collections.reversal]
    : [...collections.swing, ...collections.pullback, ...collections.momentum, ...collections.reversal];
}

function getAllSellStocksForAnalysis(isBefore0908) {
  return NOTION_SLOT_IDS.flatMap(slotId => getSellStocksForAnalysis(isBefore0908, slotId, getSellUniverseMode(slotId)));
}

function getVisibleSellCodeSet(slotId = activeSellSlot, isBefore0908 = null, universeMode = getSellUniverseMode(slotId)) {
  const visibleStocks = isBefore0908 === null
    ? getVisibleSellStocksList(slotId, universeMode)
    : getSellStocksForAnalysis(isBefore0908, slotId, universeMode);
  return new Set(visibleStocks.map(stock => stock.entryKey));
}

function getSellStockByCode(codeOrEntryKey, slotId = null) {
  const parsed = parseEntryKey(codeOrEntryKey, slotId || activeSellSlot);
  return getAllSellStocks().find(stock => stock.entryKey === parsed.entryKey || (stock.slotId === parsed.slotId && stock.code === parsed.code)) || null;
}

function getSellUniverseSummary(slotId = activeSellSlot) {
  const actualCollections = getVisibleSellStockCollections(slotId, 'actual');
  const allCollections = getVisibleSellStockCollections(slotId, 'all');
  const countStocks = collections => Object.values(collections).reduce((sum, arr) => sum + arr.length, 0);
  return {
    mode: getSellUniverseMode(slotId),
    trackedEntryCount: getTrackedSellEntryKeys(slotId).size,
    actualCount: countStocks(actualCollections),
    allCount: countStocks(allCollections)
  };
}

function rebuildSellStocksFromSnapshots() {
  clearSellDetailMap();

  NOTION_SLOT_IDS.forEach(slotId => {
    const snapshot = getSlotSnapshot(slotId);
    const manualPullback = (stocks.pullback || []).filter(stock => stock.manual && stock.slotId === slotId);
    const manualMomentum = (stocks.momentum || []).filter(stock => stock.manual && stock.slotId === slotId);
    const manualReversal = (stocks.reversal || []).filter(stock => stock.manual && stock.slotId === slotId);
    const manualSwing = (stocks.swing || []).filter(stock => stock.manual && stock.slotId === slotId);

    replaceStocksForSlot(slotId, {
      pullback: [
        ...snapshot.pullbackEntries.map(entry => ensureStockIdentity({
          name: entry.name,
          code: entry.code,
          type: 'pullback',
          strategy: 'pullback',
          source: entry.source || 'strategy-data'
        }, slotId)),
        ...manualPullback.filter(stock => !snapshot.pullbackEntries.some(entry => entry.code === stock.code))
      ],
      momentum: [
        ...snapshot.momentumEntries.map(entry => ensureStockIdentity({
          name: entry.name,
          code: entry.code,
          type: 'momentum',
          strategy: 'momentum',
          source: entry.source || 'strategy-data'
        }, slotId)),
        ...manualMomentum.filter(stock => !snapshot.momentumEntries.some(entry => entry.code === stock.code))
      ],
      reversal: [
        ...snapshot.reversalEntries.map(entry => ensureStockIdentity({
          name: entry.name,
          code: entry.code,
          type: 'reversal',
          strategy: 'reversal',
          source: entry.source || 'strategy-data'
        }, slotId)),
        ...manualReversal.filter(stock => !snapshot.reversalEntries.some(entry => entry.code === stock.code))
      ],
      swing: [
        ...snapshot.swingEntries.map(entry => ensureStockIdentity({
          name: entry.name,
          code: entry.code,
          type: 'swing',
          strategy: 'swing',
          source: entry.source || 'strategy-data',
          entryPrice: entry.entryPrice,
          buyDate: entry.buyDate,
          status: entry.status
        }, slotId)),
        ...manualSwing.filter(stock => !snapshot.swingEntries.some(entry => entry.code === stock.code))
      ]
    });
  });
}
