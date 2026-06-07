const JONGGA_MANUAL_OVERRIDE_SCHEMA_VERSION = 'jongga_manual_overrides.v1';
const JONGGA_MANUAL_OVERRIDE_STORAGE_KEY = 'stockAnalyzeJonggaManualOverridesV1';

function cloneManualOverrideJson(value, fallback = null) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    return fallback;
  }
}

function parseManualOverrideNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(String(value).replace(/,/g, '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(number) ? number : null;
}

function parseManualOverrideBoolean(value) {
  if (typeof value === 'boolean') return value;
  const text = String(value ?? '').trim().toLowerCase();
  if (['true', '1', 'yes', 'y', 'blocked', 'on'].includes(text)) return true;
  if (['false', '0', 'no', 'n', 'off', 'clear'].includes(text)) return false;
  return false;
}

function normalizeManualOverrideCode(code) {
  const digits = String(code ?? '').replace(/\D/g, '');
  return digits.length === 6 ? digits : '';
}

function normalizeManualOverrideText(value) {
  return String(value ?? '').trim();
}

function normalizeManualOverrideEntry(code, entry = {}) {
  const normalizedCode = normalizeManualOverrideCode(code || entry.code);
  if (!normalizedCode) return null;

  const tossSource = entry.toss || entry.tossExecutionStrength || {};
  const orderbookSource = entry.orderbook || {};
  const eventSource = entry.eventFilter || entry.events || {};

  return {
    code: normalizedCode,
    name: normalizeManualOverrideText(entry.name),
    toss: {
      avgStrength: parseManualOverrideNumber(tossSource.avgStrength ?? tossSource.dailyAvgStrength ?? tossSource.value),
      intradayAbove100Ratio: parseManualOverrideNumber(tossSource.intradayAbove100Ratio ?? tossSource.above100Ratio ?? tossSource.coverageRatio),
      lastHourAvgStrength: parseManualOverrideNumber(tossSource.lastHourAvgStrength ?? tossSource.lastHourStrength),
      note: normalizeManualOverrideText(tossSource.note || tossSource.reason)
    },
    orderbook: {
      bidAskRatio: parseManualOverrideNumber(orderbookSource.bidAskRatio ?? orderbookSource.ratio ?? orderbookSource.value),
      note: normalizeManualOverrideText(orderbookSource.note || orderbookSource.reason)
    },
    eventFilter: {
      blocked: parseManualOverrideBoolean(eventSource.blocked),
      earningsDays: parseManualOverrideNumber(eventSource.earningsDays ?? eventSource.earningsDday),
      corporateActionDays: parseManualOverrideNumber(eventSource.corporateActionDays ?? eventSource.corpActionDays ?? eventSource.actionDays),
      note: normalizeManualOverrideText(eventSource.note || eventSource.reason)
    }
  };
}

function normalizeJonggaManualOverridePayload(payload = {}) {
  const root = payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : {};
  const sourceEntries = root.entries && typeof root.entries === 'object' ? root.entries : {};
  const entries = {};

  Object.entries(sourceEntries).forEach(([code, entry]) => {
    const normalized = normalizeManualOverrideEntry(code, entry);
    if (normalized) entries[normalized.code] = normalized;
  });

  return {
    schemaVersion: JONGGA_MANUAL_OVERRIDE_SCHEMA_VERSION,
    updatedAt: normalizeManualOverrideText(root.updatedAt) || new Date().toISOString(),
    entries
  };
}

function getStoredJonggaManualOverridePayload() {
  if (globalThis.__jonggaManualOverridePayload) return globalThis.__jonggaManualOverridePayload;
  if (typeof localStorage === 'undefined') {
    globalThis.__jonggaManualOverridePayload = normalizeJonggaManualOverridePayload({});
    return globalThis.__jonggaManualOverridePayload;
  }

  try {
    const raw = localStorage.getItem(JONGGA_MANUAL_OVERRIDE_STORAGE_KEY);
    globalThis.__jonggaManualOverridePayload = normalizeJonggaManualOverridePayload(raw ? JSON.parse(raw) : {});
  } catch (error) {
    globalThis.__jonggaManualOverridePayload = normalizeJonggaManualOverridePayload({});
  }
  return globalThis.__jonggaManualOverridePayload;
}

function getJonggaManualOverridePayload() {
  return cloneManualOverrideJson(getStoredJonggaManualOverridePayload(), normalizeJonggaManualOverridePayload({}));
}

function saveJonggaManualOverridePayload(payload = {}) {
  const normalized = normalizeJonggaManualOverridePayload(payload);
  globalThis.__jonggaManualOverridePayload = normalized;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(JONGGA_MANUAL_OVERRIDE_STORAGE_KEY, JSON.stringify(normalized, null, 2));
  }
  return cloneManualOverrideJson(normalized, normalized);
}

function clearJonggaManualOverridePayload() {
  globalThis.__jonggaManualOverridePayload = normalizeJonggaManualOverridePayload({});
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(JONGGA_MANUAL_OVERRIDE_STORAGE_KEY);
  }
  return getJonggaManualOverridePayload();
}

function getJonggaManualOverrideCount() {
  return Object.keys(getStoredJonggaManualOverridePayload().entries).length;
}

function getJonggaManualOverrideForCode(code) {
  const normalizedCode = normalizeManualOverrideCode(code);
  if (!normalizedCode) return null;
  return cloneManualOverrideJson(getStoredJonggaManualOverridePayload().entries[normalizedCode], null);
}

function getRawOverrideRuleList(value) {
  if (Array.isArray(value)) return value.map(item => ({ ...item }));
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).map(([code, detail]) => {
    if (detail && typeof detail === 'object') return { code, ...detail };
    return { code, status: detail };
  });
}

function upsertRawOverrideRule(value, code, status, note) {
  const next = getRawOverrideRuleList(value).filter(rule => String(rule.code || '').trim().toUpperCase() !== code);
  next.push({ code, status, note });
  return next;
}

function normalizeRawOverrideRuleCodes(value) {
  if (!Array.isArray(value)) return [];
  return value.map(item => ({ ...item }));
}

function upsertRawOverrideRuleCode(value, code, note) {
  const next = normalizeRawOverrideRuleCodes(value).filter(rule => String(rule.code || '').trim().toUpperCase() !== code);
  next.push({ code, note });
  return next;
}

function removeRawOverrideRuleCode(value, code) {
  return normalizeRawOverrideRuleCodes(value).filter(rule => String(rule.code || '').trim().toUpperCase() !== code);
}

function parseManualVkospiValueFromContext(context = {}) {
  const candidates = [
    ...(Array.isArray(context?.slot?.regime?.table) ? context.slot.regime.table : []),
    ...(Array.isArray(context?.regime?.table) ? context.regime.table : []),
    ...(Array.isArray(context?.root?.regime?.table) ? context.root.regime.table : [])
  ];
  const row = candidates.find(item => String(item?.item || item?.label || '').includes('VKOSPI'));
  if (!row) return null;
  return parseManualOverrideNumber(row.value);
}

function getTrendManualMultiplier(vkospiValue) {
  if (!Number.isFinite(vkospiValue)) return 1.0;
  if (vkospiValue < 20) return 1.0;
  if (vkospiValue <= 30) return 0.9;
  return 0.8;
}

function getReversalManualMultiplier(vkospiValue) {
  if (!Number.isFinite(vkospiValue)) return 1.0;
  if (vkospiValue < 20) return 0.8;
  if (vkospiValue <= 30) return 1.0;
  return 0.9;
}

function getManualGradeFromScore(score, strategy) {
  if (!Number.isFinite(score)) return '미산출';
  if (strategy === 'reversal') {
    if (score >= 8.5) return 'S';
    if (score >= 7.0) return 'A';
    if (score >= 5.5) return 'B';
    return 'C';
  }
  if (score >= 9.0) return 'S';
  if (score >= 7.5) return 'A';
  if (score >= 6.0) return 'B';
  return 'C';
}

function isManualOverrideFinite(value) {
  return Number.isFinite(parseManualOverrideNumber(value));
}

function updateManualOverrideNotes(notes, strategy, override, appliedLabels) {
  const nextNotes = Array.isArray(notes) ? notes.map(note => String(note)) : [];
  const filteredNotes = nextNotes.filter(note => !/토스 .*미반영|당일 평균 체결강도 미반영|마지막 1시간 체결강도 미반영|마지막 30분 틱 프록시 미반영|기업 이벤트 필터는 미반영/.test(note));

  if (!appliedLabels.length) return filteredNotes;

  const missing = [];
  if (strategy === 'breakout' || strategy === 'momentum') {
    if (!isManualOverrideFinite(override?.toss?.avgStrength) || !isManualOverrideFinite(override?.toss?.intradayAbove100Ratio)) missing.push('토스 체결강도');
    if (!isManualOverrideFinite(override?.orderbook?.bidAskRatio)) missing.push('호가잔량');
  }
  if (strategy === 'accumulation') {
    if (!isManualOverrideFinite(override?.toss?.avgStrength) || !isManualOverrideFinite(override?.toss?.lastHourAvgStrength)) missing.push('장후반 체결강도');
    missing.push('마지막 30분 틱 프록시');
  }
  if (strategy === 'reversal') {
    if (!isManualOverrideFinite(override?.toss?.avgStrength) || !isManualOverrideFinite(override?.toss?.lastHourAvgStrength)) missing.push('토스 체결강도');
    if (!isManualOverrideFinite(override?.orderbook?.bidAskRatio)) missing.push('호가잔량');
    if (!override?.eventFilter || (!override.eventFilter.blocked && !isManualOverrideFinite(override.eventFilter.earningsDays) && !isManualOverrideFinite(override.eventFilter.corporateActionDays) && !normalizeManualOverrideText(override.eventFilter.note))) missing.push('기업 이벤트 필터');
    missing.push('30분봉');
  }

  filteredNotes.unshift(`수동 입력 반영: ${appliedLabels.join(', ')}`);
  if (missing.length) filteredNotes.push(`미반영: ${missing.join(', ')}`);
  return filteredNotes;
}

function applyScoreDeltaWithOverride(entry, delta, strategy) {
  const baseScore = parseManualOverrideNumber(entry.score ?? entry.finalScore);
  if (!Number.isFinite(baseScore) || !delta) return;
  const nextScore = Number((baseScore + delta).toFixed(1));
  entry.score = nextScore;
  entry.finalScore = nextScore;
  const nextGrade = getManualGradeFromScore(nextScore, strategy);
  entry.grade = nextGrade;
  entry.finalGrade = nextGrade;
  if (!/금지|blocked/i.test(String(entry.statusLabel || entry.decision || ''))) {
    entry.statusLabel = typeof getBuyFinalStatusLabel === 'function' ? getBuyFinalStatusLabel(nextGrade) : String(entry.statusLabel || '');
  }
}

function applyJonggaManualOverridesToRawEntry(rawEntry, strategy, context = {}) {
  if (rawEntry?.__manualOverrideApplied) return rawEntry;
  const code = typeof getJonggaCode === 'function' ? getJonggaCode(rawEntry) : normalizeManualOverrideCode(rawEntry?.code);
  const override = getJonggaManualOverrideForCode(code);
  if (!override) return rawEntry;

  const next = cloneManualOverrideJson(rawEntry, rawEntry);
  next.toss = { ...(next.toss || {}) };
  next.orderbook = { ...(next.orderbook || {}) };
  next.eventFilter = { ...(next.eventFilter || {}) };
  const appliedLabels = [];
  const vkospiValue = parseManualVkospiValueFromContext(context);
  const scoreMultiplier = strategy === 'reversal'
    ? getReversalManualMultiplier(vkospiValue)
    : getTrendManualMultiplier(vkospiValue);
  let scoreDelta = 0;

  if (Number.isFinite(override.toss.avgStrength)) next.toss.avgStrength = override.toss.avgStrength;
  if (Number.isFinite(override.toss.intradayAbove100Ratio)) next.toss.intradayAbove100Ratio = override.toss.intradayAbove100Ratio;
  if (Number.isFinite(override.toss.lastHourAvgStrength)) next.toss.lastHourAvgStrength = override.toss.lastHourAvgStrength;
  if (normalizeManualOverrideText(override.toss.note)) next.toss.note = override.toss.note;
  if (Number.isFinite(override.orderbook.bidAskRatio)) next.orderbook.bidAskRatio = override.orderbook.bidAskRatio;
  if (normalizeManualOverrideText(override.orderbook.note)) next.orderbook.note = override.orderbook.note;

  if (strategy === 'breakout' || strategy === 'momentum') {
    const tossPass = Number.isFinite(override.toss.avgStrength) && Number.isFinite(override.toss.intradayAbove100Ratio)
      ? override.toss.avgStrength >= 110 && override.toss.intradayAbove100Ratio >= 70
      : null;
    if (tossPass !== null) {
      const tossNote = `수동 입력 · 토스 체결강도 평균 ${override.toss.avgStrength.toFixed(1)}%, 100% 이상 유지 ${override.toss.intradayAbove100Ratio.toFixed(1)}%`;
      next.matchedRules = tossPass ? upsertRawOverrideRuleCode(next.matchedRules, 'S2', tossNote) : removeRawOverrideRuleCode(next.matchedRules, 'S2');
      next.unmatchedRules = tossPass ? removeRawOverrideRuleCode(next.unmatchedRules, 'S2') : upsertRawOverrideRuleCode(next.unmatchedRules, 'S2', tossNote);
      if (tossPass) scoreDelta += 2 * scoreMultiplier;
      appliedLabels.push('토스 체결강도');
    }

    const orderbookPass = Number.isFinite(override.orderbook.bidAskRatio)
      ? override.orderbook.bidAskRatio >= 1.2
      : null;
    if (orderbookPass !== null) {
      const orderbookNote = `수동 입력 · 매수/매도 호가잔량 ${override.orderbook.bidAskRatio.toFixed(2)}:1`;
      next.matchedRules = orderbookPass ? upsertRawOverrideRuleCode(next.matchedRules, 'C3', orderbookNote) : removeRawOverrideRuleCode(next.matchedRules, 'C3');
      next.unmatchedRules = orderbookPass ? removeRawOverrideRuleCode(next.unmatchedRules, 'C3') : upsertRawOverrideRuleCode(next.unmatchedRules, 'C3', orderbookNote);
      if (orderbookPass) scoreDelta += 1 * scoreMultiplier;
      appliedLabels.push('호가잔량');
    }
  }

  if (strategy === 'accumulation') {
    const lastHourPass = Number.isFinite(override.toss.lastHourAvgStrength)
      ? override.toss.lastHourAvgStrength >= 100
      : null;
    if (lastHourPass !== null) {
      const lastHourNote = `수동 입력 · 마지막 1시간 평균 체결강도 ${override.toss.lastHourAvgStrength.toFixed(1)}%`;
      next.matchedRules = lastHourPass ? upsertRawOverrideRuleCode(next.matchedRules, 'S3', lastHourNote) : removeRawOverrideRuleCode(next.matchedRules, 'S3');
      next.unmatchedRules = lastHourPass ? removeRawOverrideRuleCode(next.unmatchedRules, 'S3') : upsertRawOverrideRuleCode(next.unmatchedRules, 'S3', lastHourNote);
      if (lastHourPass) scoreDelta += 1 * scoreMultiplier;
      appliedLabels.push('장후반 체결강도');
    }

    const strengtheningPass = Number.isFinite(override.toss.avgStrength) && Number.isFinite(override.toss.lastHourAvgStrength)
      ? override.toss.lastHourAvgStrength > override.toss.avgStrength
      : null;
    if (strengtheningPass !== null) {
      const strengtheningNote = `수동 입력 · 당일 평균 ${override.toss.avgStrength.toFixed(1)}%, 마지막 1시간 ${override.toss.lastHourAvgStrength.toFixed(1)}%`;
      next.matchedRules = strengtheningPass ? upsertRawOverrideRuleCode(next.matchedRules, 'S4', strengtheningNote) : removeRawOverrideRuleCode(next.matchedRules, 'S4');
      next.unmatchedRules = strengtheningPass ? removeRawOverrideRuleCode(next.unmatchedRules, 'S4') : upsertRawOverrideRuleCode(next.unmatchedRules, 'S4', strengtheningNote);
      if (strengtheningPass) scoreDelta += 0.5 * scoreMultiplier;
      appliedLabels.push('장후반 수급 강화');
    }
  }

  if (strategy === 'reversal') {
    const eventBlocked = Boolean(override.eventFilter.blocked)
      || (Number.isFinite(override.eventFilter.earningsDays) && override.eventFilter.earningsDays <= 2)
      || (Number.isFinite(override.eventFilter.corporateActionDays) && override.eventFilter.corporateActionDays <= 5);
    const eventConfigured = override.eventFilter.blocked
      || Number.isFinite(override.eventFilter.earningsDays)
      || Number.isFinite(override.eventFilter.corporateActionDays)
      || normalizeManualOverrideText(override.eventFilter.note);
    if (eventConfigured) {
      next.eventFilter.blocked = eventBlocked;
      next.eventFilter.earningsDays = Number.isFinite(override.eventFilter.earningsDays) ? override.eventFilter.earningsDays : null;
      next.eventFilter.corporateActionDays = Number.isFinite(override.eventFilter.corporateActionDays) ? override.eventFilter.corporateActionDays : null;
      next.eventFilter.note = normalizeManualOverrideText(override.eventFilter.note);
      const eventNoteParts = [];
      if (Number.isFinite(override.eventFilter.earningsDays)) eventNoteParts.push(`실적 ${override.eventFilter.earningsDays}일`);
      if (Number.isFinite(override.eventFilter.corporateActionDays)) eventNoteParts.push(`기업행사 ${override.eventFilter.corporateActionDays}일`);
      if (normalizeManualOverrideText(override.eventFilter.note)) eventNoteParts.push(override.eventFilter.note);
      const eventNote = eventBlocked
        ? `수동 입력 · 이벤트 필터 차단 (${eventNoteParts.join(', ') || '차단'})`
        : `수동 입력 · 이벤트 필터 통과 (${eventNoteParts.join(', ') || '통과'})`;
      next.filters = upsertRawOverrideRule(next.filters, 'F3', eventBlocked ? 'blocked' : 'passed', eventNote);
      appliedLabels.push('이벤트 필터');
    }

    const tossPass = Number.isFinite(override.toss.avgStrength) && Number.isFinite(override.toss.lastHourAvgStrength)
      ? override.toss.avgStrength >= 90 && override.toss.lastHourAvgStrength >= 100
      : null;
    if (tossPass !== null) {
      const tossNote = `수동 입력 · 당일 평균 ${override.toss.avgStrength.toFixed(1)}%, 마지막 1시간 평균 ${override.toss.lastHourAvgStrength.toFixed(1)}%`;
      next.matchedRules = tossPass ? upsertRawOverrideRuleCode(next.matchedRules, 'S2', tossNote) : removeRawOverrideRuleCode(next.matchedRules, 'S2');
      next.unmatchedRules = tossPass ? removeRawOverrideRuleCode(next.unmatchedRules, 'S2') : upsertRawOverrideRuleCode(next.unmatchedRules, 'S2', tossNote);
      if (tossPass) scoreDelta += 2 * scoreMultiplier;
      appliedLabels.push('토스 체결강도');
    }

    const orderbookPass = Number.isFinite(override.orderbook.bidAskRatio)
      ? override.orderbook.bidAskRatio >= 1.0
      : null;
    if (orderbookPass !== null) {
      const orderbookNote = `수동 입력 · 매수/매도 호가잔량 ${override.orderbook.bidAskRatio.toFixed(2)}:1`;
      next.matchedRules = orderbookPass ? upsertRawOverrideRuleCode(next.matchedRules, 'C2', orderbookNote) : removeRawOverrideRuleCode(next.matchedRules, 'C2');
      next.unmatchedRules = orderbookPass ? removeRawOverrideRuleCode(next.unmatchedRules, 'C2') : upsertRawOverrideRuleCode(next.unmatchedRules, 'C2', orderbookNote);
      if (orderbookPass) scoreDelta += 1 * scoreMultiplier;
      appliedLabels.push('호가잔량');
    }
  }

  if (appliedLabels.length) {
    applyScoreDeltaWithOverride(next, Number(scoreDelta.toFixed(1)), strategy);
    next.notes = updateManualOverrideNotes(next.notes, strategy, override, appliedLabels);
  }

  if (appliedLabels.length) {
    next.__manualOverrideApplied = true;
    next.manualOverrideSummary = appliedLabels;
  }

  return next;
}

function applyJonggaManualOverridesToPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload) || !getJonggaManualOverrideCount()) {
    return payload;
  }

  const next = cloneManualOverrideJson(payload, payload);
  const processSlot = slot => {
    const entries = slot?.entries;
    if (!entries || typeof entries !== 'object') return;
    ['pullback', 'accumulation', 'breakout', 'momentum', 'reversal'].forEach(strategy => {
      if (!Array.isArray(entries[strategy])) return;
      entries[strategy] = entries[strategy].map(entry => applyJonggaManualOverridesToRawEntry(entry, strategy, { slot, root: next, regime: slot.regime || next.regime }));
    });
  };

  if (Array.isArray(next.slots)) {
    next.slots.forEach(processSlot);
  } else if (next.entries) {
    processSlot(next);
  }

  next.manualOverrideMeta = {
    count: getJonggaManualOverrideCount(),
    updatedAt: getStoredJonggaManualOverridePayload().updatedAt,
    source: 'browser_local_storage'
  };
  return next;
}

function applyJonggaManualOverridesToMarketData(stock, data) {
  const override = getJonggaManualOverrideForCode(stock?.code);
  if (!override) return data;
  const next = { ...data };
  if (Number.isFinite(override.toss.avgStrength)) {
    next.strength = override.toss.avgStrength;
    next.manualOverrideStrength = true;
  }
  return next;
}
