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
    entryAdjustment: String(pickJonggaValue(source, ['entryAdjustment', 'entry'])),
    sellAdjustment: String(pickJonggaValue(source, ['sellAdjustment', 'sell'])),
    swingAdjustment: String(pickJonggaValue(source, ['swingAdjustment', 'swing'])),
    note: String(pickJonggaValue(source, ['note', 'summary']))
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
    currentPrice: toJonggaNumber(effectiveRawEntry.currentPrice || effectiveRawEntry.price, null),
    previousClose: toJonggaNumber(effectiveRawEntry.previousClose || effectiveRawEntry.prevClose, null),
    dailyChange: toJonggaNumber(effectiveRawEntry.dailyChange || effectiveRawEntry.change, null),
    dailyChangePct: toJonggaNumber(effectiveRawEntry.dailyChangePct || effectiveRawEntry.changePct, null),
    dailyDirection: String(effectiveRawEntry.dailyDirection || ''),
    rationale: String(effectiveRawEntry.rationale || effectiveRawEntry.reason || effectiveRawEntry.summary || ''),
    keyPoint: String(effectiveRawEntry.keyPoint || effectiveRawEntry.key || ''),
    rr: String(effectiveRawEntry.rr || effectiveRawEntry.riskReward || ''),
    notes: asJonggaArray(effectiveRawEntry.notes).map(note => String(note)),
    tradePlanRows: normalizeJonggaTradePlanRows(effectiveRawEntry.tradePlanRows || effectiveRawEntry.tradePlan),
    recommendedEntryBand: normalizeJonggaRecommendedBand(effectiveRawEntry.recommendedEntryBand),
    recommendedStage: normalizeJonggaRecommendedStage(effectiveRawEntry.recommendedStage),
    liveRefresh: buildJonggaLiveRefresh(effectiveRawEntry),
    source: 'jongga-json',
    dataQuality: effectiveRawEntry.dataQuality || null
  };
  if (!normalized.statusLabel) normalized.statusLabel = getBuyFinalStatusLabel(normalized.grade);
  const withMacro = typeof applyMacroOverlayToEntry === 'function'
    ? applyMacroOverlayToEntry(normalized, strategy, context)
    : normalized;
  return applyJonggaSafety(typeof attachEntryEligibility === 'function' ? attachEntryEligibility(withMacro) : withMacro, context);
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
    dataQuality: slot.dataQuality || root.dataQuality || {},
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
