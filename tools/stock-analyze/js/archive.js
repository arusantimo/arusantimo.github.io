function createEmptySlotSellArchive() {
  return {
    stage1: null,
    stage2: null
  };
}

function createEmptyAnalysisArchive() {
  return {
    buy: {
      bySlot: {
        slotA: null,
        slotB: null
      },
      activeSlot: 'slotA'
    },
    sell: {
      bySlot: {
        slotA: createEmptySlotSellArchive(),
        slotB: createEmptySlotSellArchive()
      },
      activeSlot: 'slotA'
    }
  };
}

function normalizeArchiveEntryKey(entry, slotId) {
  if (!entry || typeof entry !== 'object') return entry;
  const next = { ...entry };
  next.slotId = normalizeSlotId(next.slotId || slotId);
  next.entryKey = next.entryKey || buildEntryKey(next.slotId, next.code);
  return next;
}

function normalizeSellArchiveDetail(detail, slotId) {
  if (!detail || typeof detail !== 'object') return detail;
  const normalizedSlotId = normalizeSlotId(detail.slotId || detail.stock?.slotId || slotId);
  const nextStock = ensureStockIdentity({ ...(detail.stock || {}) }, normalizedSlotId);
  return {
    ...detail,
    slotId: normalizedSlotId,
    entryKey: detail.entryKey || nextStock.entryKey || buildEntryKey(normalizedSlotId, detail.code || nextStock.code),
    stock: nextStock
  };
}

function normalizeAnalysisArchiveShape(parsed) {
  const empty = createEmptyAnalysisArchive();
  if (!parsed || typeof parsed !== 'object') return empty;

  const isLegacyBuy = parsed.buy && !parsed.buy.bySlot;
  const isLegacySell = parsed.sell && !parsed.sell.bySlot;

  const next = {
    buy: {
      bySlot: {
        slotA: null,
        slotB: null
      },
      activeSlot: normalizeSlotId(parsed.buy?.activeSlot || 'slotA')
    },
    sell: {
      bySlot: {
        slotA: createEmptySlotSellArchive(),
        slotB: createEmptySlotSellArchive()
      },
      activeSlot: normalizeSlotId(parsed.sell?.activeSlot || 'slotA')
    }
  };

  if (isLegacyBuy && parsed.buy) {
    next.buy.bySlot.slotA = parsed.buy;
  } else {
    NOTION_SLOT_IDS.forEach(slotId => {
      next.buy.bySlot[slotId] = parsed.buy?.bySlot?.[slotId] || null;
    });
  }

  if (isLegacySell && parsed.sell) {
    next.sell.bySlot.slotA = {
      stage1: parsed.sell.stage1 || null,
      stage2: parsed.sell.stage2 || null
    };
  } else {
    NOTION_SLOT_IDS.forEach(slotId => {
      next.sell.bySlot[slotId] = {
        stage1: parsed.sell?.bySlot?.[slotId]?.stage1 || null,
        stage2: parsed.sell?.bySlot?.[slotId]?.stage2 || null
      };
    });
  }

  NOTION_SLOT_IDS.forEach(slotId => {
    const buyArchive = next.buy.bySlot[slotId];
    if (buyArchive?.entries?.length) {
      next.buy.bySlot[slotId] = {
        ...buyArchive,
        slotId,
        entries: buyArchive.entries.map(entry => normalizeArchiveEntryKey(entry, slotId))
      };
    }

    ['stage1', 'stage2'].forEach(stageKey => {
      const sellArchive = next.sell.bySlot[slotId]?.[stageKey];
      if (!sellArchive?.details?.length) return;
      next.sell.bySlot[slotId][stageKey] = {
        ...sellArchive,
        slotId,
        notionPageId: sellArchive.notionPageId || getNotionPageState(slotId).notionPageId || '',
        trackingScope: sellArchive.trackingScope || `${slotId}:${sellArchive.notionPageId || '__manual__'}`,
        details: sellArchive.details.map(detail => normalizeSellArchiveDetail(detail, slotId))
      };
    });
  });

  return next;
}

function readAnalysisArchive() {
  try {
    const raw = localStorage.getItem(ANALYSIS_ARCHIVE_KEY);
    if (!raw) return createEmptyAnalysisArchive();
    return normalizeAnalysisArchiveShape(JSON.parse(raw));
  } catch (error) {
    console.error(error);
    return createEmptyAnalysisArchive();
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
  return 'stage2';
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
  if (tab === 'buy') {
    return archive.buy?.bySlot?.[activeBuySlot] || null;
  }

  const stageKey = getSellStageKeyByTime(now);
  return archive.sell?.bySlot?.[activeSellSlot]?.[stageKey] || null;
}

function buildBuyAnalysisArchiveForSlot(slotId, timeLabel = '') {
  const entries = getVisibleBuyEntries(slotId)
    .filter(entry => entry.liveRefresh)
    .map(entry => ({
      entryKey: entry.entryKey,
      code: entry.code,
      name: entry.name,
      strategy: entry.strategy,
      slotId: entry.slotId,
      liveRefresh: normalizeBuyLiveRefresh(entry, entry.liveRefresh) || entry.liveRefresh
    }));

  if (!entries.length) return null;

  return {
    type: 'buy',
    label: '매수 분석',
    savedAt: new Date().toISOString(),
    analysisTime: timeLabel || getStageTimeLabel(),
    count: entries.length,
    liveGapState,
    notionPageId: getNotionPageState(slotId).notionPageId || '',
    slotId,
    entries
  };
}

function buildSellAnalysisArchiveForSlot(slotId, isBefore0908, timeLabel = '') {
  const stage = 'stage2';
  const visibleKeys = getVisibleSellCodeSet(slotId, null, getSellUniverseMode(slotId));
  const details = Object.values(stockDetailMap)
    .filter(detail => detail?.mode === 'sell' && detail.stock?.slotId === slotId && visibleKeys.has(detail.stock?.entryKey))
    .map(detail => ({
      entryKey: detail.stock?.entryKey || '',
      code: detail.stock?.code || '',
      slotId,
      stock: ensureStockIdentity({ ...detail.stock }, slotId),
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
    label: '매도 통합 분석',
    savedAt: new Date().toISOString(),
    analysisTime: timeLabel,
    count: details.length,
    liveGapState,
    notionPageId: getNotionPageState(slotId).notionPageId || '',
    slotId,
    universeMode: getSellUniverseMode(slotId),
    trackingScope: getSellTrackingScopeKey(slotId),
    details
  };
}

function saveAnalysisArchive(mode, options = {}) {
  const archive = readAnalysisArchive();

  if (mode === 'buy') {
    NOTION_SLOT_IDS.forEach(slotId => {
      const payload = buildBuyAnalysisArchiveForSlot(slotId, options.timeLabel || getStageTimeLabel());
      archive.buy.bySlot[slotId] = payload || null;
    });
    archive.buy.activeSlot = activeBuySlot;
  } else {
    const stageKey = getSellStageKeyByTime();
    NOTION_SLOT_IDS.forEach(slotId => {
      const payload = buildSellAnalysisArchiveForSlot(slotId, Boolean(options.isBefore0908), options.timeLabel || getStageTimeLabel());
      archive.sell.bySlot[slotId][stageKey] = payload || null;
    });
    archive.sell.activeSlot = activeSellSlot;
  }

  if (!writeAnalysisArchive(archive)) return false;

  if (options.logMessage) {
    const totalCount = mode === 'buy'
      ? NOTION_SLOT_IDS.reduce((sum, slotId) => sum + (archive.buy.bySlot[slotId]?.count || 0), 0)
      : NOTION_SLOT_IDS.reduce((sum, slotId) => sum + (archive.sell.bySlot[slotId]?.[getSellStageKeyByTime()]?.count || 0), 0);
    log(options.logMessage({ label: mode === 'buy' ? '매수 분석' : '매도 통합 분석', count: totalCount }));
  }
  return true;
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
  Object.keys(stockDetailMap).forEach(key => delete stockDetailMap[key]);
}

function ensureArchivedSellStock(restoredStock) {
  if (!restoredStock?.code || !restoredStock?.type || !stocks[restoredStock.type]) return null;
  const normalized = ensureStockIdentity({ ...restoredStock }, restoredStock.slotId);
  const existing = stocks[restoredStock.type].find(stock => stock.entryKey === normalized.entryKey);
  if (existing) return existing;

  if (normalized.source === 'notion' || !normalized.manual) {
    return null;
  }

  stocks[normalized.type].push(normalized);
  return normalized;
}

function getLatestArchivedGapState(archive) {
  const candidates = [
    ...NOTION_SLOT_IDS.map(slotId => archive?.buy?.bySlot?.[slotId]),
    ...NOTION_SLOT_IDS.flatMap(slotId => [archive?.sell?.bySlot?.[slotId]?.stage1, archive?.sell?.bySlot?.[slotId]?.stage2])
  ]
    .filter(item => item?.liveGapState && item?.savedAt)
    .sort((left, right) => new Date(right.savedAt).getTime() - new Date(left.savedAt).getTime());
  return candidates[0]?.liveGapState || null;
}

function restoreBuyAnalysisArchive(archive) {
  let restored = 0;
  NOTION_SLOT_IDS.forEach(slotId => {
    const archiveItem = archive?.buy?.bySlot?.[slotId];
    if (!archiveItem?.entries?.length) return;

    const entryMap = new Map(
      archiveItem.entries.map(entry => [entry.entryKey || buildEntryKey(slotId, entry.code), entry.liveRefresh])
    );

    getVisibleBuyEntries(slotId).forEach(entry => {
      const liveRefresh = entryMap.get(entry.entryKey) || entryMap.get(buildEntryKey(slotId, entry.code)) || entryMap.get(entry.code);
      if (!liveRefresh) return;
      entry.liveRefresh = normalizeBuyLiveRefresh(entry, liveRefresh) || liveRefresh;
      restored += 1;
    });
  });

  if (!restored) return false;
  renderBuyStockCards();
  return true;
}

function isSellArchiveScopeCompatible(archiveItem, slotId) {
  if (!archiveItem || typeof archiveItem !== 'object') return false;

  const currentScope = getSellTrackingScopeKey(slotId);
  const archiveScope = String(archiveItem.trackingScope || '').trim();
  if (archiveScope) return archiveScope === currentScope;

  if ('notionPageId' in archiveItem) {
    return (archiveItem.notionPageId || '__manual__') === (getNotionPageState(slotId).notionPageId || '__manual__');
  }

  return !getNotionPageState(slotId).notionPageId;
}

function restoreSellAnalysisArchives(archive, stageKey = getSellStageKeyByTime()) {
  const restoredDetails = [];
  clearSellDetailMap();

  NOTION_SLOT_IDS.forEach(slotId => {
    const archiveItem = archive?.sell?.bySlot?.[slotId]?.[stageKey];
    if (!archiveItem?.details?.length || !isSellArchiveScopeCompatible(archiveItem, slotId)) return;

    archiveItem.details.forEach(savedDetail => {
      const normalizedDetail = normalizeSellArchiveDetail(savedDetail, slotId);
      ensureArchivedSellStock(normalizedDetail.stock);
      const stock = getSellStockByCode(normalizedDetail.entryKey, slotId);
      if (!stock) return;
      restoredDetails.push({
        ...normalizedDetail,
        mode: 'sell',
        stock
      });
    });
  });

  restoredDetails.forEach(detail => {
    stockDetailMap[detail.stock.entryKey] = detail;
  });

  if (!restoredDetails.length) return false;
  renderSellStockCards();
  return true;
}

function restoreAnalysisArchiveState() {
  const archive = readAnalysisArchive();
  const latestGapState = getLatestArchivedGapState(archive);
  if (latestGapState) {
    liveGapState = latestGapState;
  }

  const buyRestored = restoreBuyAnalysisArchive(archive);
  const sellRestored = restoreSellAnalysisArchives(archive, getSellStageKeyByTime());

  updateAnalyzeButtonState();
  updateCurrentTime();
  return { buyRestored, sellRestored };
}
