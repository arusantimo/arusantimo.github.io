function pickJonggaValue(source, keys, fallback = '') {
  for (const key of keys) {
    if (source?.[key] !== undefined && source[key] !== null && source[key] !== '') return source[key];
  }
  return fallback;
}

function toJonggaNumber(value, fallback = null) {
  if (value === null || value === undefined || value === '') return fallback;
  const number = Number(String(value).replace(/,/g, '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(number) ? number : fallback;
}

function normalizeJonggaRule(rule = {}) {
  const code = String(rule.code || '').trim().toUpperCase();
  const status = getJonggaRuleStatus(rule);
  const passed = status === 'passed';
  const evalStatus = normalizeRuleEvalStatus(rule.evalStatus || rule.eval_status)
    || inferRuleEvalStatus(rule, passed);
  return {
    code,
    status: status === 'passed' ? '✅' : status === 'warning' ? '⚠️' : status === 'blocked' ? '⛔' : '미상',
    note: String(rule.note || rule.reason || rule.message || rule.detail || '').trim(),
    evalStatus
  };
}

function normalizeJonggaRuleList(value, codes = null) {
  const list = normalizeJonggaRuleArray(value).map(normalizeJonggaRule).filter(rule => rule.code);
  if (!codes) return list;
  const map = new Map(list.map(rule => [rule.code, rule]));
  return codes.map(code => map.get(code) || { code, status: '미상', note: '근거 누락' });
}

function normalizeJonggaRuleCodes(value, matched = false) {
  return normalizeJonggaRuleArray(value)
    .map(rule => {
      const code = String(rule.code || '').trim().toUpperCase();
      const note = String(rule.note || rule.reason || rule.message || '').trim();
      const evalStatus = normalizeRuleEvalStatus(rule.evalStatus || rule.eval_status)
        || inferRuleEvalStatus({ ...rule, note }, matched);
      return { code, note, evalStatus };
    })
    .filter(rule => rule.code);
}

function normalizeJonggaTradePlanRows(value) {
  const rows = Array.isArray(value) ? value : [];
  return rows.map(row => {
    const hitRate = row.historicalHitRate;
    return {
      stage: String(pickJonggaValue(row, ['stage', 'step', 'label'])),
      stageKey: String(pickJonggaValue(row, ['stageKey', 'stage_key', 'stageCode'])),
      condition: String(pickJonggaValue(row, ['condition', 'trigger', 'rule'])),
      quantity: String(pickJonggaValue(row, ['quantity', 'qty', 'size'])),
      targetYield: String(pickJonggaValue(row, ['targetYield', 'yield', 'rate'])),
      targetPrice: String(pickJonggaValue(row, ['targetPrice', 'price', 'target'])),
      recommended: Boolean(row.recommended),
      historicalHitRate: (hitRate === null || hitRate === undefined) ? null : Number(hitRate)
    };
  });
}

function normalizeJonggaRecommendedBand(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    low: toJonggaNumber(value.low),
    high: toJonggaNumber(value.high),
    anchor: toJonggaNumber(value.anchor),
    label: String(value.label || '')
  };
}

function normalizeJonggaRecommendedStage(value) {
  if (!value || typeof value !== 'object') return null;
  const hitRate = value.hitRate;
  return {
    stageKey: String(value.stageKey || ''),
    evBasis: String(value.evBasis || ''),
    reason: String(value.reason || ''),
    hitRate: (hitRate === null || hitRate === undefined) ? null : Number(hitRate),
    ev: (value.ev === null || value.ev === undefined) ? null : Number(value.ev),
    sampleCount: Number(value.sampleCount || 0)
  };
}

function normalizeJonggaRecommendedTakeProfitProfile(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    profileKey: String(value.profileKey || ''),
    label: String(value.label || ''),
    selectionBasis: String(value.selectionBasis || ''),
    reasonSummary: String(value.reasonSummary || ''),
    sampleCount: Number(value.sampleCount || 0),
    ev: (value.ev === null || value.ev === undefined) ? null : Number(value.ev)
  };
}

function normalizeJonggaTakeProfitProfile(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    profileKey: String(value.profileKey || ''),
    label: String(value.label || ''),
    recommended: Boolean(value.recommended),
    selectionBasis: String(value.selectionBasis || ''),
    reasonSummary: String(value.reasonSummary || ''),
    nearestResistanceType: String(value.nearestResistanceType || ''),
    nearestResistancePrice: toJonggaNumber(value.nearestResistancePrice),
    secondaryResistanceType: String(value.secondaryResistanceType || ''),
    secondaryResistancePrice: toJonggaNumber(value.secondaryResistancePrice),
    recentHighPrice: toJonggaNumber(value.recentHighPrice),
    retrace33Price: toJonggaNumber(value.retrace33Price),
    retrace50Price: toJonggaNumber(value.retrace50Price),
    trailingActivationPct: toJonggaNumber(value.trailingActivationPct, null),
    trailingBufferPct: toJonggaNumber(value.trailingBufferPct, null),
    tradePlanRows: normalizeJonggaTradePlanRows(value.tradePlanRows),
    recommendedStage: normalizeJonggaRecommendedStage(value.recommendedStage)
  };
}

function normalizeJonggaTakeProfitProfiles(value) {
  return asJonggaArray(value)
    .map(normalizeJonggaTakeProfitProfile)
    .filter(Boolean);
}

function normalizeJonggaPullbackContext(value) {
  if (!value || typeof value !== 'object') return null;
  const support = value.support && typeof value.support === 'object' ? value.support : {};
  const families = value.families && typeof value.families === 'object' ? value.families : {};
  const volumeBurst = value.volumeBurst && typeof value.volumeBurst === 'object' ? value.volumeBurst : {};
  const normalizeSupportFamilyLine = line => ({
    family: String(line.family || ''),
    familyLabel: String(line.familyLabel || ''),
    label: String(line.label || ''),
    price: toJonggaNumber(line.price),
    distancePct: toJonggaNumber(line.distancePct, null),
    count: Number(line.count || 0),
    lastSeenDaysAgo: toJonggaNumber(line.lastSeenDaysAgo, null),
    valid: Boolean(line.valid),
    weight: Number(line.weight || 0),
    bandLow: toJonggaNumber(line.bandLow, null),
    bandHigh: toJonggaNumber(line.bandHigh, null),
    pivotCount: Number(line.pivotCount || 0),
    volume: toJonggaNumber(line.volume, null),
    binLow: toJonggaNumber(line.binLow, null),
    binHigh: toJonggaNumber(line.binHigh, null),
    burstRatioPct: toJonggaNumber(line.burstRatioPct, null),
    anchorCount: Number(line.anchorCount || 0),
    role: String(line.role || ''),
    sources: Array.isArray(line.sources) ? line.sources.map(item => String(item || '')) : [],
    families: Array.isArray(line.families) ? line.families.map(item => String(item || '')) : [],
    familyLabels: Array.isArray(line.familyLabels) ? line.familyLabels.map(item => String(item || '')) : [],
    familyCount: Number(line.familyCount || 0),
    strengthPoints: Number(line.strengthPoints || 0),
    consensusBonus: Number(line.consensusBonus || 0)
  });
  const normalizedLines = asJonggaArray(support.lines).map(normalizeSupportFamilyLine).filter(line => line.price !== null);
  const normalizedPrimaryLine = support.primaryLine && typeof support.primaryLine === 'object'
    ? normalizeSupportFamilyLine(support.primaryLine)
    : normalizedLines[0] || null;
  const normalizedStrengthScore = Number(support.strengthScore || normalizedPrimaryLine?.strengthPoints || 0);
  const normalizedStrengthLabel = String(support.strengthLabel || (typeof getPullbackSupportStrengthLabel === 'function'
    ? getPullbackSupportStrengthLabel(normalizedStrengthScore)
    : normalizedStrengthScore >= 70 ? 'strong' : normalizedStrengthScore >= 45 ? 'watch' : 'weak'));
  const normalizeFamilyList = items => asJonggaArray(items).map(normalizeSupportFamilyLine).filter(line => line.price !== null);
  return {
    support: {
      summary: String(support.summary || ''),
      lines: normalizedLines,
      primaryLine: normalizedPrimaryLine,
      strengthScore: normalizedStrengthScore,
      strengthLabel: normalizedStrengthLabel,
      warningLevel: String(support.warningLevel || ''),
      warningReason: String(support.warningReason || ''),
      activeFamilyCount: Number(support.activeFamilyCount || normalizedPrimaryLine?.familyCount || 0),
      barCount: Number(support.barCount || 0)
    },
    families: {
      horizontal: normalizeFamilyList(families.horizontal),
      swingCluster: normalizeFamilyList(families.swingCluster),
      volumeShelf: normalizeFamilyList(families.volumeShelf),
      eventAnchors: normalizeFamilyList(families.eventAnchors)
    },
    volumeBurst: {
      summary: String(volumeBurst.summary || ''),
      burstCount: Number(volumeBurst.burstCount || 0),
      maxRatioPct: toJonggaNumber(volumeBurst.maxRatioPct, null),
      latestBurstDaysAgo: toJonggaNumber(volumeBurst.latestBurstDaysAgo, null)
    }
  };
}

function normalizeJonggaVolatilityContext(value) {
  if (!value || typeof value !== 'object') return null;
  const metrics = value.metrics && typeof value.metrics === 'object' ? value.metrics : {};
  return {
    marketState: String(value.marketState || ''),
    stockState: String(value.stockState || ''),
    blendedState: String(value.blendedState || ''),
    strategyFit: String(value.strategyFit || ''),
    scoreDelta: toJonggaNumber(value.scoreDelta, 0),
    summary: String(value.summary || ''),
    reason: String(value.reason || ''),
    strategyLabel: String(value.strategyLabel || ''),
    metrics: {
      atrPct10: toJonggaNumber(metrics.atrPct10, null),
      returnStd20: toJonggaNumber(metrics.returnStd20, null),
      todayRangePct: toJonggaNumber(metrics.todayRangePct, null),
      vkospi: toJonggaNumber(metrics.vkospi, null)
    }
  };
}

function normalizeJonggaPullbackStopPolicy(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    version: String(value.version || ''),
    anchorSource: String(value.anchorSource || ''),
    anchorLookbackDays: Number(value.anchorLookbackDays || 0),
    anchorDate: String(value.anchorDate || ''),
    anchorOpen: toJonggaNumber(value.anchorOpen),
    anchorClose: toJonggaNumber(value.anchorClose),
    anchorHigh: toJonggaNumber(value.anchorHigh),
    anchorLow: toJonggaNumber(value.anchorLow),
    anchorBodyMid: toJonggaNumber(value.anchorBodyMid),
    anchorVolumeRatio: toJonggaNumber(value.anchorVolumeRatio),
    anchorStopMode: String(value.anchorStopMode || ''),
    anchorStopPrice: toJonggaNumber(value.anchorStopPrice),
    ma10Price: toJonggaNumber(value.ma10Price),
    ma10PrevPrice: toJonggaNumber(value.ma10PrevPrice),
    ma20Price: toJonggaNumber(value.ma20Price),
    ma20PrevPrice: toJonggaNumber(value.ma20PrevPrice),
    ma10WarningPrice: toJonggaNumber(value.ma10WarningPrice),
    hardStopPrice: toJonggaNumber(value.hardStopPrice),
    fallbackStopPrice: toJonggaNumber(value.fallbackStopPrice),
    effectiveStopPrice: toJonggaNumber(value.effectiveStopPrice),
    warningRuleSummary: String(value.warningRuleSummary || ''),
    hardStopRuleSummary: String(value.hardStopRuleSummary || ''),
    reasonSummary: String(value.reasonSummary || '')
  };
}

function normalizeJonggaAccumulationStopPolicy(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    version: String(value.version || ''),
    anchorSource: String(value.anchorSource || ''),
    sponsorMode: String(value.sponsorMode || ''),
    anchorDate: String(value.anchorDate || ''),
    anchorOpen: toJonggaNumber(value.anchorOpen),
    anchorClose: toJonggaNumber(value.anchorClose),
    anchorVolumeRatio20d: toJonggaNumber(value.anchorVolumeRatio20d),
    anchorStopPrice: toJonggaNumber(value.anchorStopPrice),
    fallbackStopPrice: toJonggaNumber(value.fallbackStopPrice),
    effectiveHardStopPrice: toJonggaNumber(value.effectiveHardStopPrice),
    openExitCheckCutoff: String(value.openExitCheckCutoff || ''),
    openExitMode: String(value.openExitMode || ''),
    openExitRuleSummary: String(value.openExitRuleSummary || ''),
    hardStopRuleSummary: String(value.hardStopRuleSummary || ''),
    marketShockHoldRuleSummary: String(value.marketShockHoldRuleSummary || ''),
    reasonSummary: String(value.reasonSummary || '')
  };
}

function normalizeJonggaBreakoutStopPolicy(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    version: String(value.version || ''),
    referenceSource: String(value.referenceSource || ''),
    referenceLookbackDays: Number(value.referenceLookbackDays || 0),
    referenceClusterPct: toJonggaNumber(value.referenceClusterPct, null),
    referencePrice: toJonggaNumber(value.referencePrice),
    referenceBandLow: toJonggaNumber(value.referenceBandLow),
    referenceBandHigh: toJonggaNumber(value.referenceBandHigh),
    entryDayOpenPrice: toJonggaNumber(value.entryDayOpenPrice),
    fallbackStopPrice: toJonggaNumber(value.fallbackStopPrice),
    effectiveHardStopPrice: toJonggaNumber(value.effectiveHardStopPrice),
    openExitCheckCutoff: String(value.openExitCheckCutoff || ''),
    microTrendBarUnit: String(value.microTrendBarUnit || ''),
    microTrendShortMa: Number(value.microTrendShortMa || 0),
    microTrendLongMa: Number(value.microTrendLongMa || 0),
    hardStopRuleSummary: String(value.hardStopRuleSummary || ''),
    openExitRuleSummary: String(value.openExitRuleSummary || ''),
    microTrendRuleSummary: String(value.microTrendRuleSummary || ''),
    reasonSummary: String(value.reasonSummary || '')
  };
}

function normalizeJonggaBreakoutLiveExitPolicy(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    version: String(value.version || ''),
    wickClimaxLookbackBars: Number(value.wickClimaxLookbackBars || 0),
    wickClimaxVolumeRatioMin: toJonggaNumber(value.wickClimaxVolumeRatioMin, null),
    wickUpperShadowRatioMin: toJonggaNumber(value.wickUpperShadowRatioMin, null),
    orderbookLookbackMinutes: Number(value.orderbookLookbackMinutes || 0),
    orderbookBidAskSpikeMin: toJonggaNumber(value.orderbookBidAskSpikeMin, null),
    orderbookAskDropRatioMax: toJonggaNumber(value.orderbookAskDropRatioMax, null),
    trailingActivationPct: toJonggaNumber(value.trailingActivationPct, null),
    trailingBufferPct: toJonggaNumber(value.trailingBufferPct, null),
    activeSessionCutoff: String(value.activeSessionCutoff || ''),
    wickClimaxRuleSummary: String(value.wickClimaxRuleSummary || ''),
    orderbookRuleSummary: String(value.orderbookRuleSummary || ''),
    trailingRuleSummary: String(value.trailingRuleSummary || '')
  };
}

function normalizeJonggaReversalStopPolicy(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    version: String(value.version || ''),
    anchorSource: String(value.anchorSource || ''),
    anchorLowPrice: toJonggaNumber(value.anchorLowPrice),
    fallbackStopPrice: toJonggaNumber(value.fallbackStopPrice),
    effectiveHardStopPrice: toJonggaNumber(value.effectiveHardStopPrice),
    stopExecutionMode: String(value.stopExecutionMode || ''),
    hardStopRuleSummary: String(value.hardStopRuleSummary || ''),
    reasonSummary: String(value.reasonSummary || '')
  };
}

function normalizeJonggaReversalLiveExitPolicy(value) {
  if (!value || typeof value !== 'object') return null;
  return {
    version: String(value.version || ''),
    timeStopCutoff: String(value.timeStopCutoff || ''),
    timeStopMinBouncePct: toJonggaNumber(value.timeStopMinBouncePct, null),
    breakevenActivationPct: toJonggaNumber(value.breakevenActivationPct, null),
    earlySpikeWindowEnd: String(value.earlySpikeWindowEnd || ''),
    timeStopRuleSummary: String(value.timeStopRuleSummary || ''),
    breakevenRuleSummary: String(value.breakevenRuleSummary || '')
  };
}

function normalizeJonggaToss(value) {
  if (!value || typeof value !== 'object') return {};
  return {
    avgStrength: toJonggaNumber(value.avgStrength, null),
    lastHourAvgStrength: toJonggaNumber(value.lastHourAvgStrength, null),
    last30AvgStrength: toJonggaNumber(value.last30AvgStrength, null),
    intradayAbove100Ratio: toJonggaNumber(value.intradayAbove100Ratio, null),
    last30BuySellRatio: toJonggaNumber(value.last30BuySellRatio, null),
    last30BuyVolume: toJonggaNumber(value.last30BuyVolume, null),
    last30SellVolume: toJonggaNumber(value.last30SellVolume, null),
    observedMinutes: Number(value.observedMinutes || 0),
    observedTickCount: Number(value.observedTickCount || 0),
    source: String(value.source || ''),
    sourceUrl: String(value.sourceUrl || ''),
    note: String(value.note || ''),
    asOf: String(value.asOf || '')
  };
}

function normalizeJonggaOrderbook(value) {
  if (!value || typeof value !== 'object') return {};
  return {
    bidAskRatio: toJonggaNumber(value.bidAskRatio, null),
    bidTotal: toJonggaNumber(value.bidTotal, null),
    askTotal: toJonggaNumber(value.askTotal, null),
    source: String(value.source || ''),
    sourceUrl: String(value.sourceUrl || ''),
    note: String(value.note || '')
  };
}

function normalizeJonggaGapScore(slot = {}, root = {}) {
  const source = slot.gapScore || root.gapScore || {};
  return {
    rows: asJonggaArray(source.rows || source.metrics).map(row => ({
      indicator: String(pickJonggaValue(row, ['indicator', 'name'])),
      actualValue: String(pickJonggaValue(row, ['actualValue', 'value'])),
      baseScore: String(pickJonggaValue(row, ['baseScore', 'score'])),
      weight: String(pickJonggaValue(row, ['weight'])),
      formula: String(pickJonggaValue(row, ['formula'])),
      weightedScore: String(pickJonggaValue(row, ['weightedScore', 'weighted']))
    })),
    totalScore: String(pickJonggaValue(source, ['totalScore', 'score', 'total'])),
    grade: String(pickJonggaValue(source, ['grade', 'code'])),
    code: String(pickJonggaValue(source, ['code', 'grade'])),
    entryAdjustment: String(pickJonggaValue(source, ['entryAdjustment', 'entry'])),
    sellAdjustment: String(pickJonggaValue(source, ['sellAdjustment', 'sell'])),
    swingAdjustment: String(pickJonggaValue(source, ['swingAdjustment', 'swing'])),
    note: String(pickJonggaValue(source, ['note', 'summary'])),
    isFresh: source.isFresh === true,
    freshnessStatus: String(pickJonggaValue(source, ['freshnessStatus'])),
    staleKeys: Array.isArray(source.staleKeys) ? source.staleKeys.map(key => String(key || '')) : []
  };
}

function normalizeJonggaRegime(slot = {}, root = {}) {
  const source = slot.regime || root.regime || {};
  const table = asJonggaArray(source.table || source.rows || source.summary || slot.regimeTable);
  const evidence = asJonggaArray(source.evidence || slot.regimeEvidence);
  const macroOverlay = source.macroOverlay && typeof source.macroOverlay === 'object' ? { ...source.macroOverlay } : {};
  return {
    regimeTable: table.map(row => ({
      item: String(pickJonggaValue(row, ['item', 'label', 'name'])),
      value: String(pickJonggaValue(row, ['value', 'status', 'result']))
    })).filter(row => row.item || row.value),
    regimeEvidence: evidence.map(row => ({
      item: String(pickJonggaValue(row, ['item', 'label', 'name'])),
      value: String(pickJonggaValue(row, ['value', 'status', 'result'])),
      verdict: String(pickJonggaValue(row, ['verdict', 'decision']))
    })).filter(row => row.item || row.value || row.verdict),
    regimeAlert: String(source.alert || source.note || slot.regimeAlert || ''),
    technicalRegimeLabel: String(source.technicalRegimeLabel || macroOverlay.technicalRegimeLabel || ''),
    effectiveRegimeLabel: String(source.effectiveRegimeLabel || macroOverlay.effectiveRegimeLabel || ''),
    regimeAdjustmentReason: String(source.regimeAdjustmentReason || macroOverlay.regimeAdjustmentReason || ''),
    macroOverlay
  };
}

function buildJonggaLiveRefresh(entry) {
  const live = entry.liveRefresh || entry.live || entry.marketData || null;
  if (!live || typeof live !== 'object') return null;
  return {
    ...live,
    currentPrice: toJonggaNumber(live.currentPrice),
    targetPrice: toJonggaNumber(live.targetPrice),
    upsideRate: toJonggaNumber(live.upsideRate),
    finalScore: toJonggaNumber(live.finalScore),
    finalGrade: live.finalGrade || live.grade || '',
    finalStatusLabel: live.finalStatusLabel || live.statusLabel || ''
  };
}

function applyJonggaSafety(entry, context) {
  const issues = getJonggaSafetyIssues(entry, context);
  if (!issues.length) return entry;
  const next = {
    ...entry,
    safety: { blocked: true, reasons: issues.map(issue => issue.message) },
    notes: [`안전차단: ${issues.map(issue => issue.message).join(', ')}`, ...entry.notes]
  };
  const safetyLabel = '자동매수 금지';

  return {
    ...next,
    sourceScore: entry.score,
    sourceGrade: entry.grade,
    sourceStatusLabel: entry.statusLabel,
    scoreUnavailable: true,
    scoreLabel: safetyLabel,
    statusLabel: safetyLabel
  };
}

function normalizeJonggaEntry(rawEntry, strategy, rank, context) {
  const effectiveRawEntry = typeof applyJonggaManualOverridesToRawEntry === 'function'
    ? applyJonggaManualOverridesToRawEntry(rawEntry, strategy, context)
    : rawEntry;
  const code = getJonggaCode(effectiveRawEntry);
  const strictScore = toJonggaNumber(pickJonggaValue(effectiveRawEntry, ['strictScore']), null);
  const signalScore = toJonggaNumber(pickJonggaValue(effectiveRawEntry, ['signalScore', 'score', 'finalScore']), null);
  const scoreMax = toJonggaNumber(pickJonggaValue(effectiveRawEntry, ['scoreMax']), null);
  const gradeScore = toJonggaNumber(pickJonggaValue(effectiveRawEntry, ['gradeScore']), null);
  const score = signalScore ?? strictScore;
  const gradeFromJson = String(pickJonggaValue(effectiveRawEntry, ['grade', 'finalGrade'], '')).trim();
  let grade = gradeFromJson;
  if (!grade) {
    if (gradeScore !== null) grade = getBuyGradeFromScore(gradeScore, strategy);
    else if (strictScore !== null && scoreMax) grade = getBuyGradeFromScore(strictScore * 10 / scoreMax, strategy);
    else if (score !== null) grade = getBuyGradeFromScore(score, strategy);
    else grade = '미산출';
  }
  const required = JONGGA_REQUIRED_RULES[strategy] || [];
  const gates = normalizeJonggaRuleList(effectiveRawEntry.gates || effectiveRawEntry.rules, required.filter(code => code.startsWith('G')));
  const filters = normalizeJonggaRuleList(effectiveRawEntry.filters || effectiveRawEntry.rules, required.filter(code => code.startsWith('F')));
  const matchedRules = normalizeJonggaRuleCodes(
    effectiveRawEntry.matchedRules || effectiveRawEntry.passedRules || effectiveRawEntry.matched,
    true
  );
  const unmatchedRules = normalizeJonggaRuleCodes(
    effectiveRawEntry.unmatchedRules || effectiveRawEntry.failedRules || effectiveRawEntry.unmatched,
    false
  );
  const entryPrice = pickJonggaValue(effectiveRawEntry, ['entryPriceText', 'entryPrice', 'entry']);
  const breakoutProfilesRaw = effectiveRawEntry.breakoutTakeProfitProfiles
    || ((strategy === 'breakout' || strategy === 'momentum') ? effectiveRawEntry.pullbackTakeProfitProfiles : null);
  const breakoutStopPolicyRaw = effectiveRawEntry.breakoutStopPolicy
    || ((strategy === 'breakout' || strategy === 'momentum') ? effectiveRawEntry.pullbackStopPolicy : null);
  const normalized = {
    rank: Number(effectiveRawEntry.rank) || rank,
    name: getJonggaName(effectiveRawEntry),
    code,
    score,
    strictScore,
    signalScore,
    scoreMax,
    gradeScore,
    scoreBreakdown: Array.isArray(effectiveRawEntry.scoreBreakdown) ? effectiveRawEntry.scoreBreakdown : [],
    scoreScope: String(effectiveRawEntry.scoreScope || strategy),
    ...(typeof effectiveRawEntry.entryEligible === 'boolean'
      ? {
          entryEligible: effectiveRawEntry.entryEligible,
          entryWatch: Boolean(effectiveRawEntry.entryWatch),
          entryBlockers: Array.isArray(effectiveRawEntry.entryBlockers) ? effectiveRawEntry.entryBlockers : [],
          setupQuality: String(effectiveRawEntry.setupQuality || 'setup_weak')
        }
      : {}),
    grade,
    scoreUnavailable: Boolean(effectiveRawEntry.scoreUnavailable) || score === null,
    scoreLabel: effectiveRawEntry.scoreLabel || (score === null ? '미산출' : ''),
    statusLabel: String(pickJonggaValue(effectiveRawEntry, ['statusLabel', 'decision', 'verdict'])),
    strategy,
    type: strategy,
    gates,
    filters,
    matchedRules,
    unmatchedRules,
    entryPriceText: String(entryPrice || ''),
    entryPriceValue: toJonggaNumber(entryPrice),
    entryMeta: String(effectiveRawEntry.entryMeta || ''),
    marketCapTrillion: toJonggaNumber(
      effectiveRawEntry.marketCapTrillion
      ?? effectiveRawEntry.market_cap_trillion
      ?? effectiveRawEntry.marketCap
      ?? effectiveRawEntry.market_cap,
      null
    ),
    marketCapRank: toJonggaNumber(
      effectiveRawEntry.marketCapRank
      ?? effectiveRawEntry.market_cap_rank,
      null
    ),
    marketCapUniverseCount: toJonggaNumber(
      effectiveRawEntry.marketCapUniverseCount
      ?? effectiveRawEntry.market_cap_universe_count,
      null
    ),
    currentPrice: toJonggaNumber(effectiveRawEntry.currentPrice || effectiveRawEntry.price, null),
    previousClose: toJonggaNumber(effectiveRawEntry.previousClose || effectiveRawEntry.prevClose, null),
    dailyChange: toJonggaNumber(effectiveRawEntry.dailyChange || effectiveRawEntry.change, null),
    dailyChangePct: toJonggaNumber(effectiveRawEntry.dailyChangePct || effectiveRawEntry.changePct, null),
    dailyDirection: String(effectiveRawEntry.dailyDirection || ''),
    rationale: String(effectiveRawEntry.rationale || effectiveRawEntry.reason || effectiveRawEntry.summary || ''),
    keyPoint: String(effectiveRawEntry.keyPoint || effectiveRawEntry.key || ''),
    rr: String(effectiveRawEntry.rr || effectiveRawEntry.riskReward || ''),
    statusReason: String(effectiveRawEntry.statusReason || ''),
    statusReasonShort: String(effectiveRawEntry.statusReasonShort || ''),
    notes: asJonggaArray(effectiveRawEntry.notes).map(note => String(note)),
    tradePlanRows: normalizeJonggaTradePlanRows(effectiveRawEntry.tradePlanRows || effectiveRawEntry.tradePlan),
    recommendedEntryBand: normalizeJonggaRecommendedBand(effectiveRawEntry.recommendedEntryBand),
    recommendedStage: normalizeJonggaRecommendedStage(effectiveRawEntry.recommendedStage),
    pullbackTakeProfitProfiles: normalizeJonggaTakeProfitProfiles(effectiveRawEntry.pullbackTakeProfitProfiles),
    breakoutTakeProfitProfiles: normalizeJonggaTakeProfitProfiles(breakoutProfilesRaw),
    accumulationTakeProfitProfiles: normalizeJonggaTakeProfitProfiles(effectiveRawEntry.accumulationTakeProfitProfiles),
    reversalTakeProfitProfiles: normalizeJonggaTakeProfitProfiles(effectiveRawEntry.reversalTakeProfitProfiles),
    recommendedTakeProfitProfile: normalizeJonggaRecommendedTakeProfitProfile(effectiveRawEntry.recommendedTakeProfitProfile),
    pullbackContext: normalizeJonggaPullbackContext(effectiveRawEntry.pullbackContext),
    pullbackStopPolicy: normalizeJonggaPullbackStopPolicy(effectiveRawEntry.pullbackStopPolicy),
    accumulationStopPolicy: normalizeJonggaAccumulationStopPolicy(effectiveRawEntry.accumulationStopPolicy),
    breakoutStopPolicy: normalizeJonggaBreakoutStopPolicy(breakoutStopPolicyRaw),
    breakoutLiveExitPolicy: normalizeJonggaBreakoutLiveExitPolicy(effectiveRawEntry.breakoutLiveExitPolicy),
    reversalStopPolicy: normalizeJonggaReversalStopPolicy(effectiveRawEntry.reversalStopPolicy),
    reversalLiveExitPolicy: normalizeJonggaReversalLiveExitPolicy(effectiveRawEntry.reversalLiveExitPolicy),
    toss: normalizeJonggaToss(effectiveRawEntry.toss),
    orderbook: normalizeJonggaOrderbook(effectiveRawEntry.orderbook),
    volatilityContext: normalizeJonggaVolatilityContext(effectiveRawEntry.volatilityContext),
    liveRefresh: buildJonggaLiveRefresh(effectiveRawEntry),
    source: 'jongga-json',
    dataQuality: effectiveRawEntry.dataQuality || null
  };
  if (!normalized.statusLabel) normalized.statusLabel = getBuyFinalStatusLabel(normalized.grade);
  const withMacro = typeof applyMacroOverlayToEntry === 'function'
    ? applyMacroOverlayToEntry(normalized, strategy, context)
    : normalized;
  const withEligibility = typeof attachEntryEligibility === 'function'
    ? attachEntryEligibility(withMacro, context)
    : withMacro;
  const safeEntry = applyJonggaSafety(withEligibility, context);
  if (typeof attachStockIndicatorsToEntry === 'function') {
    const strategyKey = typeof normalizeStrategyKeyForIndicators === 'function'
      ? normalizeStrategyKeyForIndicators(strategy)
      : strategy;
    const precomputed = effectiveRawEntry.stockIndicators;
    if (precomputed?.snapshot && typeof getStrategyIndicatorRows === 'function') {
      safeEntry.stockIndicators = {
        snapshot: precomputed.snapshot,
        rows: Array.isArray(precomputed.rows) && precomputed.rows.length
          ? precomputed.rows
          : getStrategyIndicatorRows(strategyKey, precomputed.snapshot),
        evaluatedAt: precomputed.evaluatedAt || '',
        source: precomputed.source || 'jongga_analysis'
      };
    } else {
      attachStockIndicatorsToEntry(safeEntry, {}, {}, []);
    }
  }
  return safeEntry;
}

function normalizeJonggaSwingEntry(rawEntry, rank) {
  return {
    rank: Number(rawEntry.rank) || rank,
    name: getJonggaName(rawEntry),
    code: getJonggaCode(rawEntry),
    buyDate: String(rawEntry.buyDate || rawEntry.date || ''),
    entryPrice: toJonggaNumber(rawEntry.entryPrice || rawEntry.price, 0),
    status: String(rawEntry.status || '보유중'),
    source: 'jongga-json'
  };
}

function buildSnapshotFromJonggaSlot(slot, root = {}) {
  const snapshot = createEmptySnapshot();
  const collections = getJonggaEntryCollections(slot);
  const gapScore = normalizeJonggaGapScore(slot, root);
  const regime = normalizeJonggaRegime(slot, root);
  const macroContext = typeof resolveMacroOverlayContext === 'function'
    ? resolveMacroOverlayContext(slot, root, root.analysisDate || '')
    : {};
  const marketMetrics = typeof readRegimeMarketMetrics === 'function'
    ? readRegimeMarketMetrics(slot, root)
    : {};
  const context = {
    gapScore,
    dataQuality: { ...(root.dataQuality || {}), ...(slot.dataQuality || {}) },
    macroOverlay: {
      ...regime.macroOverlay,
      ...macroContext.macroOverlay,
      technicalRegimeLabel: macroContext.technicalRegimeLabel || regime.technicalRegimeLabel,
      effectiveRegimeLabel: macroContext.effectiveRegimeLabel || regime.effectiveRegimeLabel,
      riseJustifiedByMacro: macroContext.riseJustifiedByMacro,
      kospiBullTier: macroContext.kospiBullTier,
      kospiClose: marketMetrics.kospiClose,
      kospiMa5: marketMetrics.kospiMa5,
      vkospiValue: marketMetrics.vkospiValue,
      vkospiLabel: marketMetrics.vkospiLabel
    },
    effectiveRegimeLabel: macroContext.effectiveRegimeLabel || regime.effectiveRegimeLabel,
    technicalRegimeLabel: macroContext.technicalRegimeLabel || regime.technicalRegimeLabel,
    riseJustifiedByMacro: macroContext.riseJustifiedByMacro,
    kospiClose: marketMetrics.kospiClose,
    kospiMa5: marketMetrics.kospiMa5,
    vkospiValue: marketMetrics.vkospiValue,
    vkospiLabel: marketMetrics.vkospiLabel
  };

  snapshot.regimeTable = regime.regimeTable;
  snapshot.regimeEvidence = regime.regimeEvidence;
  snapshot.regimeAlert = regime.regimeAlert;
  snapshot.macroOverlay = context.macroOverlay;
  snapshot.technicalRegimeLabel = context.technicalRegimeLabel;
  snapshot.effectiveRegimeLabel = context.effectiveRegimeLabel;
  snapshot.regimeAdjustmentReason = regime.regimeAdjustmentReason || macroContext.regimeAdjustmentReason || '';
  snapshot.gapScore = gapScore;
  snapshot.pullbackEntries = collections.pullback.map((entry, index) => normalizeJonggaEntry(entry, 'pullback', index + 1, context));
  snapshot.breakoutEntries = collections.breakout.map((entry, index) => normalizeJonggaEntry(entry, 'breakout', index + 1, context));
  snapshot.accumulationEntries = collections.accumulation.map((entry, index) => normalizeJonggaEntry(entry, 'accumulation', index + 1, context));
  snapshot.momentumEntries = snapshot.breakoutEntries;
  snapshot.reversalEntries = collections.reversal.map((entry, index) => normalizeJonggaEntry(entry, 'reversal', index + 1, context));
  snapshot.swingEntries = collections.swing.map((entry, index) => normalizeJonggaSwingEntry(entry, index + 1));
  snapshot.sourceText = JSON.stringify({ schemaVersion: root.schemaVersion, slotId: slot.slotId || 'slotA' });
  return snapshot;
}

function applyJonggaResultToState(payload) {
  const slots = getJonggaSlots(payload);
  const hasExplicitSlots = slots.some(item => item.slotId);
  NOTION_SLOT_IDS.forEach((slotId, index) => {
    const exactSlot = slots.find(item => item.slotId && normalizeSlotId(item.slotId) === slotId);
    const slot = exactSlot || (!hasExplicitSlots ? slots[index] : null);
    const snapshot = slot ? buildSnapshotFromJonggaSlot({ ...slot, slotId }, payload) : createEmptySnapshot();
    setNotionPageState(slotId, {
      notionPageId: slot ? String(slot.sourceId || slot.id || `jongga-json-${slotId}`) : '',
      notionUrl: '',
      snapshot,
      loadedAt: payload.generatedAt || new Date().toISOString(),
      status: slot ? 'ready' : 'idle',
      error: ''
    });
  });

  if (typeof rebuildSellStocksFromSnapshots === 'function') rebuildSellStocksFromSnapshots();
  else rebuildSellStocksFromSnapshot();
  liveGapState = createEmptyLiveGapState();
  return getAllBuyEntries().length;
}
