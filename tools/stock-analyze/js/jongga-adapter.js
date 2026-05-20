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
  return {
    code,
    status: status === 'passed' ? '✅' : status === 'warning' ? '⚠️' : status === 'blocked' ? '⛔' : '미상',
    note: String(rule.note || rule.reason || rule.message || rule.detail || '').trim()
  };
}

function normalizeJonggaRuleList(value, codes = null) {
  const list = normalizeJonggaRuleArray(value).map(normalizeJonggaRule).filter(rule => rule.code);
  if (!codes) return list;
  const map = new Map(list.map(rule => [rule.code, rule]));
  return codes.map(code => map.get(code) || { code, status: '미상', note: '근거 누락' });
}

function normalizeJonggaRuleCodes(value) {
  return normalizeJonggaRuleArray(value)
    .map(rule => ({
      code: String(rule.code || '').trim().toUpperCase(),
      note: String(rule.note || rule.reason || rule.message || '').trim()
    }))
    .filter(rule => rule.code);
}

function normalizeJonggaTradePlanRows(value) {
  const rows = Array.isArray(value) ? value : [];
  return rows.map(row => ({
    stage: String(pickJonggaValue(row, ['stage', 'step', 'label'])),
    condition: String(pickJonggaValue(row, ['condition', 'trigger', 'rule'])),
    quantity: String(pickJonggaValue(row, ['quantity', 'qty', 'size'])),
    targetYield: String(pickJonggaValue(row, ['targetYield', 'yield', 'rate'])),
    targetPrice: String(pickJonggaValue(row, ['targetPrice', 'price', 'target']))
  }));
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
    regimeAlert: String(source.alert || source.note || slot.regimeAlert || '')
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
  if (!isJonggaAutoBuyCandidate(entry)) return next;
  return {
    ...next,
    sourceScore: entry.score,
    sourceGrade: entry.grade,
    score: null,
    grade: 'BLOCKED',
    scoreUnavailable: true,
    scoreLabel: '매수금지',
    statusLabel: '자동매수 금지'
  };
}

function normalizeJonggaEntry(rawEntry, strategy, rank, context) {
  const effectiveRawEntry = typeof applyJonggaManualOverridesToRawEntry === 'function'
    ? applyJonggaManualOverridesToRawEntry(rawEntry, strategy, context)
    : rawEntry;
  const code = getJonggaCode(effectiveRawEntry);
  const score = toJonggaNumber(pickJonggaValue(effectiveRawEntry, ['score', 'finalScore']), null);
  const required = JONGGA_REQUIRED_RULES[strategy] || [];
  const gates = normalizeJonggaRuleList(effectiveRawEntry.gates || effectiveRawEntry.rules, required.filter(code => code.startsWith('G')));
  const filters = normalizeJonggaRuleList(effectiveRawEntry.filters || effectiveRawEntry.rules, required.filter(code => code.startsWith('F')));
  const matchedRules = normalizeJonggaRuleCodes(effectiveRawEntry.matchedRules || effectiveRawEntry.passedRules || effectiveRawEntry.matched);
  const unmatchedRules = normalizeJonggaRuleCodes(effectiveRawEntry.unmatchedRules || effectiveRawEntry.failedRules || effectiveRawEntry.unmatched);
  const entryPrice = pickJonggaValue(effectiveRawEntry, ['entryPriceText', 'entryPrice', 'entry']);
  const normalized = {
    rank: Number(effectiveRawEntry.rank) || rank,
    name: getJonggaName(effectiveRawEntry),
    code,
    score,
    grade: String(pickJonggaValue(effectiveRawEntry, ['grade', 'finalGrade'], score === null ? '미산출' : getBuyGradeFromScore(score, strategy))),
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
    rationale: String(effectiveRawEntry.rationale || effectiveRawEntry.reason || effectiveRawEntry.summary || ''),
    keyPoint: String(effectiveRawEntry.keyPoint || effectiveRawEntry.key || ''),
    rr: String(effectiveRawEntry.rr || effectiveRawEntry.riskReward || ''),
    notes: asJonggaArray(effectiveRawEntry.notes).map(note => String(note)),
    tradePlanRows: normalizeJonggaTradePlanRows(effectiveRawEntry.tradePlanRows || effectiveRawEntry.tradePlan),
    liveRefresh: buildJonggaLiveRefresh(effectiveRawEntry),
    source: 'jongga-json',
    dataQuality: effectiveRawEntry.dataQuality || null
  };
  if (!normalized.statusLabel) normalized.statusLabel = getBuyFinalStatusLabel(normalized.grade);
  return applyJonggaSafety(normalized, context);
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
  const context = {
    gapScore,
    dataQuality: slot.dataQuality || root.dataQuality || {}
  };

  snapshot.regimeTable = regime.regimeTable;
  snapshot.regimeEvidence = regime.regimeEvidence;
  snapshot.regimeAlert = regime.regimeAlert;
  snapshot.gapScore = gapScore;
  snapshot.pullbackEntries = collections.pullback.map((entry, index) => normalizeJonggaEntry(entry, 'pullback', index + 1, context));
  snapshot.momentumEntries = collections.momentum.map((entry, index) => normalizeJonggaEntry(entry, 'momentum', index + 1, context));
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
