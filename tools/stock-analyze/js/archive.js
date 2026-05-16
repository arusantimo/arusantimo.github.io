function readAnalysisArchive() {
  try {
    const raw = localStorage.getItem(ANALYSIS_ARCHIVE_KEY);
    if (!raw) return { buy: null, sell: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { buy: null, sell: {} };
    return {
      buy: parsed.buy || null,
      sell: parsed.sell && typeof parsed.sell === 'object' ? parsed.sell : {}
    };
  } catch (error) {
    console.error(error);
    return { buy: null, sell: {} };
  }
}

function writeAnalysisArchive(archive) {
  try {
    localStorage.setItem(ANALYSIS_ARCHIVE_KEY, JSON.stringify(archive));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getStageTimeLabel(date = new Date()) {
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

function getSellStageKeyByTime(date = new Date()) {
  const totalMins = date.getHours() * 60 + date.getMinutes();
  return totalMins < (9 * 60 + 8) ? 'stage1' : 'stage2';
}

function formatArchiveButtonTime(archiveItem) {
  if (!archiveItem) return '';
  if (archiveItem.analysisTime) return archiveItem.analysisTime;
  const savedAt = archiveItem.savedAt ? new Date(archiveItem.savedAt) : null;
  if (!(savedAt instanceof Date) || Number.isNaN(savedAt.getTime())) return '';
  return getStageTimeLabel(savedAt);
}

function getActiveArchiveForTab(tab = activeTab, now = new Date()) {
  const archive = readAnalysisArchive();
  if (tab === 'buy') return archive.buy || null;
  const stageKey = getSellStageKeyByTime(now);
  return archive.sell?.[stageKey] || null;
}

function saveAnalysisArchive(mode, options = {}) {
  const archive = readAnalysisArchive();
  const payload = mode === 'buy'
    ? buildBuyAnalysisArchive(options.timeLabel || getStageTimeLabel())
    : buildSellAnalysisArchive(Boolean(options.isBefore0908), options.timeLabel || getStageTimeLabel());

  if (!payload) return false;

  if (mode === 'buy') {
    archive.buy = payload;
  } else {
    archive.sell = {
      ...(archive.sell || {}),
      [payload.stage]: payload
    };
  }

  if (!writeAnalysisArchive(archive)) return false;

  if (options.logMessage) {
    log(options.logMessage(payload));
  }
  return true;
}

function buildBuyAnalysisArchive(timeLabel = '') {
  const entries = getAllBuyEntries()
    .filter(entry => entry.liveRefresh)
    .map(entry => ({
      code: entry.code,
      name: entry.name,
      strategy: entry.strategy,
      liveRefresh: entry.liveRefresh
    }));

  if (!entries.length) return null;

  return {
    type: 'buy',
    label: '매수 분석',
    savedAt: new Date().toISOString(),
    analysisTime: timeLabel || getStageTimeLabel(),
    count: entries.length,
    liveGapState,
    entries
  };
}

function buildSellAnalysisArchive(isBefore0908, timeLabel = '') {
  const stage = isBefore0908 ? 'stage1' : 'stage2';
  const details = Object.values(stockDetailMap)
    .filter(detail => detail?.mode === 'sell' && detail.isBefore0908 === isBefore0908)
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
      gapProfile: detail.gapProfile
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
    details
  };
}

function saveAnalysisArchiveBeforeRecheck(mode, options = {}) {
  return saveAnalysisArchive(mode, {
    ...options,
    logMessage: payload => `💾 ${payload.label} 재검사 전 결과 ${payload.count}건을 로컬스토리지에 저장했습니다.`
  });
}

function saveAnalysisArchiveAfterAnalysis(mode, options = {}) {
  return saveAnalysisArchive(mode, {
    ...options,
    logMessage: payload => `💾 ${payload.label} 완료 결과 ${payload.count}건을 로컬스토리지에 저장했습니다.`
  });
}

function clearSellDetailMap() {
  Object.keys(stockDetailMap).forEach(code => delete stockDetailMap[code]);
}

function ensureArchivedSellStock(restoredStock) {
  if (!restoredStock?.code || !restoredStock?.type || !stocks[restoredStock.type]) return restoredStock;
  const existing = stocks[restoredStock.type].find(stock => stock.code === restoredStock.code);
  if (existing) return existing;
  const normalized = { ...restoredStock };
  stocks[restoredStock.type].push(normalized);
  return normalized;
}

function getLatestArchivedGapState(archive) {
  const candidates = [archive?.buy, archive?.sell?.stage1, archive?.sell?.stage2]
    .filter(item => item?.liveGapState && item?.savedAt)
    .sort((left, right) => new Date(right.savedAt).getTime() - new Date(left.savedAt).getTime());
  return candidates[0]?.liveGapState || null;
}

function restoreBuyAnalysisArchive(archiveItem) {
  if (!archiveItem?.entries?.length) return false;
  const entryMap = new Map(archiveItem.entries.map(entry => [entry.code, entry.liveRefresh]));
  let restored = 0;

  getAllBuyEntries().forEach(entry => {
    const liveRefresh = entryMap.get(entry.code);
    if (!liveRefresh) return;
    entry.liveRefresh = liveRefresh;
    restored += 1;
  });

  if (!restored) return false;
  renderBuyStockCards();
  return true;
}
function restoreSellAnalysisArchive(archiveItem) {
  if (!archiveItem?.details?.length) return false;

  clearSellDetailMap();
  archiveItem.details.forEach(savedDetail => {
    ensureArchivedSellStock(savedDetail.stock);
  });
  renderSellStockCards();

  archiveItem.details.forEach(savedDetail => {
    const stock = ensureArchivedSellStock(savedDetail.stock);
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

function restoreAnalysisArchiveState() {
  const archive = readAnalysisArchive();
  const latestGapState = getLatestArchivedGapState(archive);
  if (latestGapState) {
    liveGapState = latestGapState;
  }

  const buyRestored = restoreBuyAnalysisArchive(archive.buy);
  const sellRestored = restoreSellAnalysisArchive(getActiveArchiveForTab('sell'));

  updateAnalyzeButtonState();
  updateCurrentTime();
  return { buyRestored, sellRestored };
}
