function createDefaultSellTrackingState() {
  return {
    universeMode: 'actual',
    trackedCodes: []
  };
}

function normalizeSellTrackingState(state) {
  const next = createDefaultSellTrackingState();
  if (!state || typeof state !== 'object') return next;
  next.universeMode = state.universeMode === 'all' ? 'all' : 'actual';
  next.trackedCodes = Array.isArray(state.trackedCodes)
    ? [...new Set(state.trackedCodes.map(code => String(code || '').trim()).filter(Boolean))]
    : [];
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

function getSellTrackingScopeKey() {
  return currentNotionPageId || '__manual__';
}

function getCurrentSellTrackingState() {
  const store = readSellTrackingStore();
  return normalizeSellTrackingState(store[getSellTrackingScopeKey()]);
}

function updateCurrentSellTrackingState(updater) {
  const store = readSellTrackingStore();
  const scopeKey = getSellTrackingScopeKey();
  const currentState = normalizeSellTrackingState(store[scopeKey]);
  const nextState = normalizeSellTrackingState(
    typeof updater === 'function' ? updater(currentState) : { ...currentState, ...updater }
  );
  store[scopeKey] = nextState;
  writeSellTrackingStore(store);
  return nextState;
}

function getSellUniverseMode() {
  return getCurrentSellTrackingState().universeMode;
}

function setSellUniverseMode(mode) {
  return updateCurrentSellTrackingState(state => ({
    ...state,
    universeMode: mode === 'all' ? 'all' : 'actual'
  }));
}

function getTrackedSellCodes() {
  return new Set(getCurrentSellTrackingState().trackedCodes);
}

function isBuyEntryTrackedForSell(code) {
  return getTrackedSellCodes().has(String(code || '').trim());
}

function setBuyEntryTrackedForSell(code, tracked) {
  const normalizedCode = String(code || '').trim();
  if (!normalizedCode) return getCurrentSellTrackingState();
  return updateCurrentSellTrackingState(state => {
    const nextCodes = new Set(state.trackedCodes);
    if (tracked) nextCodes.add(normalizedCode);
    else nextCodes.delete(normalizedCode);
    return {
      ...state,
      trackedCodes: [...nextCodes]
    };
  });
}

function toggleBuyEntryTrackedForSell(code) {
  const tracked = !isBuyEntryTrackedForSell(code);
  setBuyEntryTrackedForSell(code, tracked);
  return tracked;
}

function isAlwaysVisibleSellStock(stock) {
  return Boolean(stock?.type === 'swing' || stock?.manual || stock?.source === 'manual');
}

function isSellStockVisible(stock, universeMode = getSellUniverseMode()) {
  if (!stock) return false;
  if (isAlwaysVisibleSellStock(stock)) return true;
  if (universeMode === 'all') return true;
  return isBuyEntryTrackedForSell(stock.code);
}

function getSellStocksByType(type, universeMode = getSellUniverseMode()) {
  return (stocks[type] || []).filter(stock => isSellStockVisible(stock, universeMode));
}

function getVisibleSellStockCollections(universeMode = getSellUniverseMode()) {
  return {
    swing: getSellStocksByType('swing', universeMode),
    pullback: getSellStocksByType('pullback', universeMode),
    momentum: getSellStocksByType('momentum', universeMode),
    reversal: getSellStocksByType('reversal', universeMode)
  };
}

function getVisibleSellStocksList(universeMode = getSellUniverseMode()) {
  const collections = getVisibleSellStockCollections(universeMode);
  return [...collections.swing, ...collections.pullback, ...collections.momentum, ...collections.reversal];
}

function getSellStocksForAnalysis(isBefore0908, universeMode = getSellUniverseMode()) {
  const collections = getVisibleSellStockCollections(universeMode);
  return isBefore0908
    ? [...collections.swing, ...collections.momentum, ...collections.reversal]
    : [...collections.swing, ...collections.pullback, ...collections.momentum, ...collections.reversal];
}

function getVisibleSellCodeSet(isBefore0908 = null, universeMode = getSellUniverseMode()) {
  const visibleStocks = isBefore0908 === null
    ? getVisibleSellStocksList(universeMode)
    : getSellStocksForAnalysis(isBefore0908, universeMode);
  return new Set(visibleStocks.map(stock => stock.code));
}

function getSellStockByCode(code) {
  const normalizedCode = String(code || '').trim();
  return ['swing', 'pullback', 'momentum', 'reversal']
    .flatMap(type => stocks[type] || [])
    .find(stock => stock.code === normalizedCode) || null;
}

function getSellUniverseSummary() {
  const actualCollections = getVisibleSellStockCollections('actual');
  const allCollections = getVisibleSellStockCollections('all');
  const countStocks = collections => Object.values(collections).reduce((sum, arr) => sum + arr.length, 0);
  return {
    mode: getSellUniverseMode(),
    trackedEntryCount: getTrackedSellCodes().size,
    actualCount: countStocks(actualCollections),
    allCount: countStocks(allCollections)
  };
}

function rebuildSellStocksFromSnapshot() {
  const manualPullback = stocks.pullback.filter(stock => stock.manual);
  const manualMomentum = stocks.momentum.filter(stock => stock.manual);
  const manualReversal = (stocks.reversal || []).filter(stock => stock.manual);

  clearSellDetailMap();

  stocks.pullback = [
    ...notionSnapshot.pullbackEntries.map(entry => ({ name: entry.name, code: entry.code, type: 'pullback', strategy: 'pullback', source: 'notion' })),
    ...manualPullback.filter(stock => !notionSnapshot.pullbackEntries.some(entry => entry.code === stock.code))
  ];

  stocks.momentum = [
    ...notionSnapshot.momentumEntries.map(entry => ({ name: entry.name, code: entry.code, type: 'momentum', strategy: 'momentum', source: 'notion' })),
    ...manualMomentum.filter(stock => !notionSnapshot.momentumEntries.some(entry => entry.code === stock.code))
  ];

  stocks.reversal = [
    ...notionSnapshot.reversalEntries.map(entry => ({ name: entry.name, code: entry.code, type: 'reversal', strategy: 'reversal', source: 'notion' })),
    ...manualReversal.filter(stock => !notionSnapshot.reversalEntries.some(entry => entry.code === stock.code))
  ];

  stocks.swing = notionSnapshot.swingEntries.map(entry => ({
    name: entry.name,
    code: entry.code,
    type: 'swing',
    strategy: 'swing',
    source: 'notion',
    entryPrice: entry.entryPrice,
    buyDate: entry.buyDate,
    status: entry.status
  }));
}

function buildSellAnalysisArchive(isBefore0908, timeLabel = '') {
  const stage = isBefore0908 ? 'stage1' : 'stage2';
  const visibleCodes = getVisibleSellCodeSet(isBefore0908);
  const details = Object.values(stockDetailMap)
    .filter(detail => detail?.mode === 'sell' && detail.isBefore0908 === isBefore0908 && visibleCodes.has(detail.stock?.code))
    .map(detail => ({
      code: detail.stock?.code || '',
      stock: detail.stock,
      data: detail.data,
      indicators: detail.indicators,
      decision: detail.decision,
      actionStage: detail.actionStage,
      triggeredRule: detail.triggeredRule,
      targets: detail.targets,
      gainRate: detail.gainRate,
      lossManagement: detail.lossManagement,
      isBefore0908: detail.isBefore0908,
      gapProfile: detail.gapProfile,
      entryGrade: detail.entryGrade || '',
      entryStatusLabel: detail.entryStatusLabel || '',
      signalSeverity: detail.signalSeverity || 'info',
      signalBucket: detail.signalBucket || 'warning',
      sellScore: Number.isFinite(detail.sellScore) ? detail.sellScore : 0,
      scoreDirection: detail.scoreDirection || SELL_SCORE_DIRECTION,
      scoreBreakdown: Array.isArray(detail.scoreBreakdown) ? detail.scoreBreakdown : [],
      actionPlan: detail.actionPlan || null
    }));

  if (!details.length) return null;

  return {
    type: 'sell',
    stage,
    label: `매도 ${isBefore0908 ? '1차' : '2차'} 분석`,
    savedAt: new Date().toISOString(),
    analysisTime: timeLabel,
    count: details.length,
    liveGapState,
    notionPageId: currentNotionPageId || '',
    universeMode: getSellUniverseMode(),
    trackingScope: getSellTrackingScopeKey(),
    details
  };
}

function isSellArchiveScopeCompatible(archiveItem) {
  if (!archiveItem || typeof archiveItem !== 'object') return false;

  const currentScope = getSellTrackingScopeKey();
  const archiveScope = String(archiveItem.trackingScope || '').trim();
  if (archiveScope) return archiveScope === currentScope;

  if ('notionPageId' in archiveItem) {
    return (archiveItem.notionPageId || '__manual__') === currentScope;
  }

  return !currentNotionPageId;
}

function restoreSellAnalysisArchive(archiveItem) {
  if (!archiveItem?.details?.length || !isSellArchiveScopeCompatible(archiveItem)) return false;

  clearSellDetailMap();
  archiveItem.details.forEach(savedDetail => {
    ensureArchivedSellStock(savedDetail.stock);
  });
  renderSellStockCards();

  archiveItem.details.forEach(savedDetail => {
    const stock = ensureArchivedSellStock(savedDetail.stock);
    if (!stock || !isSellStockVisible(stock)) return;
    const restoredDetail = {
      ...savedDetail,
      mode: 'sell',
      stock
    };
    stockDetailMap[stock.code] = restoredDetail;
    renderSellDetailToCard(restoredDetail);
  });

  return true;
}
