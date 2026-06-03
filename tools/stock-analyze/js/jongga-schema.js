const JONGGA_SCHEMA_VERSION = 'jongga_result.v1';
const JONGGA_BUY_STRATEGIES = ['pullback', 'momentum', 'reversal'];
const JONGGA_REQUIRED_RULES = {
  pullback: ['G0', 'G1', 'G2', 'G3', 'G4', 'G5'],
  momentum: ['G1', 'G2', 'G3'],  // G1=초과수익률(구G2), G2=52주고가(구G3), G3=거래대금(구G4) / RS는 채점 항목
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

const RULE_EVAL_STATUS_LABELS = {
  met: '조건 충족',
  not_met: '조건 미충족',
  data_missing: '데이터 부족',
  manual_required: '수동 입력 필요'
};

function normalizeRuleEvalStatus(value) {
  const raw = String(value || '').trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(RULE_EVAL_STATUS_LABELS, raw) ? raw : '';
}

function inferRuleEvalStatus(rule = {}, matched = false) {
  const explicit = normalizeRuleEvalStatus(rule.evalStatus || rule.eval_status);
  if (explicit) return explicit;
  const note = String(rule.note || rule.reason || rule.message || '').trim();
  if (/수동\s*(입력|확인)|토스|KIND|미입력|수동/.test(note)) return matched ? 'met' : 'manual_required';
  if (/데이터\s*부족|조회\s*불가|산출\s*불가|일봉\s*\d+거래일\s*미만|시장지표\s*부족/.test(note)) return 'data_missing';
  if (matched) return 'met';
  return 'not_met';
}

function getStrategyRuleGuide(strategy, kind, code) {
  const strategyGuide = RULE_GUIDE?.strategies?.[strategy] || {};
  const list = kind === 'filter'
    ? strategyGuide.filters
    : kind === 'gate'
      ? strategyGuide.gates
      : strategyGuide.scores;
  const guideList = Array.isArray(list) ? list : [];
  return guideList.find(item => item.code === code) || { condition: '', source: '' };
}

function getRuleEvalPresentation(rule = {}, options = {}) {
  const matched = Boolean(options.matched);
  const kind = options.kind || 'score';
  const evalStatus = inferRuleEvalStatus(rule, matched);
  const typeLabel = RULE_EVAL_STATUS_LABELS[evalStatus] || '판정 불명';
  const headlines = {
    score: {
      met: '채점 조건 충족',
      not_met: '채점 조건 미충족',
      data_missing: '채점 불가 (데이터 부족)',
      manual_required: '채점 불가 (수동 입력 필요)'
    },
    gate: {
      met: 'Gate 통과',
      not_met: 'Gate 미충족',
      data_missing: 'Gate 판정 불가 (데이터 부족)',
      manual_required: 'Gate 확인 필요 (수동 입력)'
    },
    filter: {
      met: '필터 통과',
      not_met: '필터 미충족',
      data_missing: '필터 판정 불가 (데이터 부족)',
      manual_required: '필터 확인 필요 (수동 입력)'
    }
  };
  const headline = headlines[kind]?.[evalStatus] || typeLabel;
  const note = String(rule.note || rule.reason || rule.message || '').trim();
  return {
    evalStatus,
    typeLabel,
    headline,
    note,
    resultText: note ? `${headline} — ${note}` : headline
  };
}

function ruleEvalStatusClass(evalStatus) {
  if (evalStatus === 'data_missing' || evalStatus === 'manual_required') return 'eval-unavailable';
  if (evalStatus === 'not_met') return 'eval-not-met';
  return 'eval-met';
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
      issues.push({ code, severity: 'block', message: `${code} 근거 누락` });
    } else if (status === 'warning') {
      // 수기 입력 지표 등은 보조 지표로 판단하기 위해 차단(block) 목록에 넣지 않음
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
