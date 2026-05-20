const JONGGA_SCHEMA_VERSION = 'jongga_result.v1';
const JONGGA_BUY_STRATEGIES = ['pullback', 'momentum', 'reversal'];
const JONGGA_REQUIRED_RULES = {
  pullback: ['G1', 'G2', 'G3', 'G4', 'G5'],
  momentum: ['G1', 'G2', 'G3', 'G4'],
  reversal: ['F1', 'F2', 'F3', 'F4', 'G1', 'G2', 'G3', 'G4', 'G5']
};

function asJonggaArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeJonggaStrategy(value) {
  const text = String(value || '').trim().toLowerCase();
  if (['pullback', 'trend_pullback', 'strategy1', 'strategy_1'].includes(text)) return 'pullback';
  if (['momentum', 'supply_momentum', 'strategy2', 'strategy_2'].includes(text)) return 'momentum';
  if (['reversal', 'leader_reversal', 'strategy3', 'strategy_3'].includes(text)) return 'reversal';
  if (['swing', 'holding'].includes(text)) return 'swing';
  return text;
}

function getJonggaEntryCollections(slot = {}) {
  const entries = slot.entries || slot.candidates || slot.recommendations || slot;
  return {
    pullback: asJonggaArray(entries.pullback || entries.pullbackEntries),
    momentum: asJonggaArray(entries.momentum || entries.momentumEntries),
    reversal: asJonggaArray(entries.reversal || entries.reversalEntries),
    swing: asJonggaArray(entries.swing || entries.swingEntries)
  };
}

function getJonggaSlots(payload = {}) {
  if (Array.isArray(payload.slots)) return payload.slots;
  if (payload.slotA || payload.slotB) {
    return ['slotA', 'slotB']
      .filter(slotId => payload[slotId])
      .map(slotId => ({ ...payload[slotId], slotId }));
  }
  if (payload.entries || payload.candidates || payload.recommendations) {
    return [{ ...payload, slotId: payload.slotId || 'slotA' }];
  }
  return [];
}

function getJonggaCode(entry = {}) {
  return String(entry.code || entry.ticker || entry.symbol || '').trim();
}

function getJonggaName(entry = {}) {
  return String(entry.name || entry.stockName || entry.companyName || '').trim();
}

function normalizeJonggaRuleArray(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).map(([code, detail]) => {
    if (detail && typeof detail === 'object') return { code, ...detail };
    return { code, status: detail };
  });
}

function getJonggaRuleStatus(rule = {}) {
  const raw = String(rule.status ?? rule.result ?? rule.passed ?? '').trim().toLowerCase();
  if (rule.passed === true || ['✅', 'pass', 'passed', 'ok', 'true', 'clear'].includes(raw)) return 'passed';
  if (rule.passed === false || ['⛔', 'fail', 'failed', 'false', 'blocked', 'reject'].includes(raw)) return 'blocked';
  if (['⚠️', 'warning', 'warn', 'partial'].includes(raw)) return 'warning';
  return 'unknown';
}

function getJonggaRuleMap(entry = {}) {
  const rules = [
    ...normalizeJonggaRuleArray(entry.filters),
    ...normalizeJonggaRuleArray(entry.gates),
    ...normalizeJonggaRuleArray(entry.rules)
  ];
  return new Map(rules.map(rule => [String(rule.code || '').trim().toUpperCase(), rule]));
}

function getJonggaGapCode(gapScore = {}) {
  const text = String(gapScore.grade || gapScore.code || '').toUpperCase();
  const match = text.match(/G-[A-E]/);
  return match ? match[0] : '';
}

function isJonggaAutoBuyCandidate(entry = {}) {
  const grade = String(entry.grade || entry.finalGrade || '').trim().toUpperCase();
  const status = String(entry.statusLabel || entry.decision || entry.verdict || '').trim();
  return /^[SA]/.test(grade) || /강력매수|매수추천|진입\s*가능|자동\s*매수/.test(status);
}

function getJonggaSafetyIssues(entry = {}, context = {}) {
  const strategy = normalizeJonggaStrategy(entry.strategy || entry.type);
  const required = JONGGA_REQUIRED_RULES[strategy] || [];
  const ruleMap = getJonggaRuleMap(entry);
  const issues = [];

  required.forEach(code => {
    const rule = ruleMap.get(code);
    const status = getJonggaRuleStatus(rule);
    if (!rule) {
      issues.push({ code, severity: 'block', message: `${code} 근거 누락` });
    } else if (status === 'unknown') {
      issues.push({ code, severity: 'block', message: `${code} 판정 미확인` });
    } else if (status === 'blocked') {
      issues.push({ code, severity: 'block', message: `${code} 미충족` });
    }
  });

  if (getJonggaGapCode(context.gapScore) === 'G-E') {
    issues.push({ code: 'G-E', severity: 'block', message: '갭다운 경고 등급에서는 신규 진입 금지' });
  }
  if (context.dataQuality?.status === 'failed') {
    issues.push({ code: 'DQ', severity: 'block', message: '데이터 품질 실패 상태' });
  }
  return issues;
}

function validateJonggaResult(payload) {
  const errors = [];
  const warnings = [];
  const safetyBlocks = [];

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, errors: ['JSON 루트는 객체여야 합니다.'], warnings, safetyBlocks, summary: {} };
  }
  if (payload.schemaVersion !== JONGGA_SCHEMA_VERSION) {
    errors.push(`schemaVersion은 ${JONGGA_SCHEMA_VERSION}이어야 합니다.`);
  }

  const slots = getJonggaSlots(payload);
  if (!slots.length) errors.push('slots 또는 entries/candidates가 필요합니다.');

  let buyCount = 0;
  slots.forEach((slot, index) => {
    const slotId = slot.slotId || `slot${index + 1}`;
    const collections = getJonggaEntryCollections(slot);
    const seenCodes = new Set();
    const gapScore = slot.gapScore || payload.gapScore || {};
    const dataQuality = slot.dataQuality || payload.dataQuality || {};

    JONGGA_BUY_STRATEGIES.forEach(strategy => {
      collections[strategy].forEach((entry, entryIndex) => {
        const effectiveEntry = typeof applyJonggaManualOverridesToRawEntry === 'function'
          ? applyJonggaManualOverridesToRawEntry(entry, strategy, { slot, payload, gapScore, dataQuality })
          : entry;
        buyCount += 1;
        const code = getJonggaCode(effectiveEntry);
        const label = `${slotId}.${strategy}[${entryIndex}]`;
        if (!/^\d{6}$/.test(code)) errors.push(`${label}: 종목코드는 6자리 숫자여야 합니다.`);
        if (!getJonggaName(effectiveEntry)) errors.push(`${label}: 종목명이 필요합니다.`);
        if (seenCodes.has(`${strategy}:${code}`)) warnings.push(`${label}: 같은 전략 내 중복 종목입니다.`);
        seenCodes.add(`${strategy}:${code}`);

        const score = Number(effectiveEntry.score ?? effectiveEntry.finalScore);
        if (!effectiveEntry.scoreUnavailable && effectiveEntry.score !== null && effectiveEntry.score !== undefined && !Number.isFinite(score)) {
          warnings.push(`${label}: score가 숫자가 아닙니다.`);
        }

        const issues = getJonggaSafetyIssues({ ...effectiveEntry, strategy }, { gapScore, dataQuality });
        if (issues.length && isJonggaAutoBuyCandidate(effectiveEntry)) {
          safetyBlocks.push(`${label}: ${issues.map(issue => issue.message).join(', ')}`);
        }
      });
    });
  });

  if (!buyCount) warnings.push('매수 후보가 없습니다.');
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    safetyBlocks,
    summary: { slots: slots.length, buyCount }
  };
}
