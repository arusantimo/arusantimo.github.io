const STOCK_ANALYZE_WYCKOFF_HISTORY_DAYS = 120;
const STOCK_ANALYZE_WYCKOFF_MIN_HISTORY_DAYS = 30;
const BUY_WYCKOFF_CONFIDENCE_THRESHOLD = 0.55;
const BUY_WYCKOFF_GRADE_CAP_CONFIDENCE = 0.65;
const BUY_WYCKOFF_PHASE_ADJUSTMENTS = {
  A: 0.2,
  B: 0.4,
  C: 0.3,
  D: 0.4,
  E: -0.8,
  NEUTRAL: 0
};
const SELL_WYCKOFF_PHASE_POINTS = {
  B: -10,
  D: -10,
  E: 15,
  NEUTRAL: 0
};

function roundWyckoffValue(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num * 10) / 10;
}

function getFallbackWyckoffLabel(phase) {
  switch (phase) {
    case 'A': return '하락 정지 (Phase A)';
    case 'B': return '매집 (Phase B)';
    case 'C': return 'Spring (Phase C)';
    case 'D': return 'Markup (Phase D)';
    case 'E': return '분배 (Phase E)';
    default: return '관망 (Neutral)';
  }
}

function createNeutralWyckoffSignal(reason = '데이터 부족/수집 실패') {
  return {
    phase: 'NEUTRAL',
    confidence: 0,
    reason,
    candidatePhase: 'NEUTRAL',
    candidateReason: '',
    metrics: {}
  };
}

function normalizeWyckoffSignal(wyckoff, fallbackReason = '데이터 부족/수집 실패') {
  const base = (wyckoff && typeof wyckoff === 'object') ? wyckoff : createNeutralWyckoffSignal(fallbackReason);
  const phase = String(base.phase || 'NEUTRAL').trim().toUpperCase() || 'NEUTRAL';
  const confidence = Math.min(Math.max(Number(base.confidence) || 0, 0), 1);
  return {
    ...createNeutralWyckoffSignal(fallbackReason),
    ...base,
    phase,
    confidence,
    reason: String(base.reason || fallbackReason).trim() || fallbackReason,
    candidatePhase: String(base.candidatePhase || phase || 'NEUTRAL').trim().toUpperCase() || 'NEUTRAL',
    candidateReason: String(base.candidateReason || '').trim(),
    metrics: base.metrics && typeof base.metrics === 'object' ? base.metrics : {},
    label: typeof getWyckoffPhaseLabel === 'function' ? getWyckoffPhaseLabel(phase) : getFallbackWyckoffLabel(phase),
    confidencePct: Math.round(confidence * 100)
  };
}

function parseWyckoffNumber(value) {
  return parseInt(String(value ?? '').replace(/,/g, ''), 10) || 0;
}

function buildWyckoffSignalFromNaverData({
  priceHistory = [],
  dealTrendInfos = [],
  historyDays = STOCK_ANALYZE_WYCKOFF_HISTORY_DAYS,
  fallbackReason = '데이터 부족/수집 실패'
} = {}) {
  if (typeof classifyWyckoffPhase !== 'function') {
    return normalizeWyckoffSignal(null, '와이코프 분류기 미연동');
  }

  const ohlcv = (Array.isArray(priceHistory) ? priceHistory : [])
    .slice()
    .reverse()
    .map(row => ({
      date: row.localTradedAt || row.date || '',
      open: parseWyckoffNumber(row.openPrice),
      high: parseWyckoffNumber(row.highPrice),
      low: parseWyckoffNumber(row.lowPrice),
      close: parseWyckoffNumber(row.closePrice),
      volume: parseWyckoffNumber(row.accumulatedTradingVolume)
    }))
    .filter(row => row.close > 0)
    .slice(-historyDays);
  const orderedDeals = (Array.isArray(dealTrendInfos) ? dealTrendInfos : []).slice().reverse().slice(-historyDays);

  if (ohlcv.length < STOCK_ANALYZE_WYCKOFF_MIN_HISTORY_DAYS) {
    return normalizeWyckoffSignal(null, fallbackReason);
  }

  try {
    return normalizeWyckoffSignal(classifyWyckoffPhase({
      ohlcv,
      foreignNet: orderedDeals.map(row => parseWyckoffNumber(row.foreignerPureBuyQuant)),
      instNet: orderedDeals.map(row => parseWyckoffNumber(row.organPureBuyQuant))
    }), fallbackReason);
  } catch (error) {
    console.error(error);
    return normalizeWyckoffSignal(null, fallbackReason);
  }
}

function applyBuyWyckoffGradeCap(grade, gradeCap = '') {
  const normalizedGrade = String(grade || '').trim().charAt(0).toUpperCase();
  const normalizedCap = String(gradeCap || '').trim().charAt(0).toUpperCase();
  const ranking = ['S', 'A', 'B', 'C'];
  if (!ranking.includes(normalizedGrade) || !ranking.includes(normalizedCap)) return normalizedGrade || 'C';
  return ranking.indexOf(normalizedGrade) < ranking.indexOf(normalizedCap) ? normalizedCap : normalizedGrade;
}

function getBuyWyckoffAdjustmentInfo(entry, wyckoff) {
  const signal = normalizeWyckoffSignal(wyckoff);
  let adjustment = 0;

  if (signal.phase === 'E') {
    adjustment = BUY_WYCKOFF_PHASE_ADJUSTMENTS.E;
  } else if (signal.phase === 'A' && entry?.strategy === 'reversal') {
    adjustment = BUY_WYCKOFF_PHASE_ADJUSTMENTS.A;
  } else if (['B', 'C', 'D'].includes(signal.phase) && signal.confidence >= BUY_WYCKOFF_CONFIDENCE_THRESHOLD) {
    adjustment = BUY_WYCKOFF_PHASE_ADJUSTMENTS[signal.phase] || 0;
  }

  const gradeCap = signal.phase === 'E' && signal.confidence >= BUY_WYCKOFF_GRADE_CAP_CONFIDENCE ? 'B' : '';
  return {
    ...signal,
    adjustment: roundWyckoffValue(adjustment),
    gradeCap,
    applied: Math.abs(adjustment) >= 0.05,
    confidenceQualified: signal.confidence >= BUY_WYCKOFF_CONFIDENCE_THRESHOLD
  };
}

function getSellWyckoffScoreInfo(wyckoff) {
  const signal = normalizeWyckoffSignal(wyckoff);
  const points = SELL_WYCKOFF_PHASE_POINTS[signal.phase] || 0;
  const details = {
    B: `${signal.label}로 조기 매도 압력을 완화합니다.`,
    D: `${signal.label}로 추세 훼손 전 성급한 축소를 완화합니다.`,
    E: `${signal.label}로 분배 리스크를 매도 점수에 가산합니다.`,
    NEUTRAL: signal.reason || '와이코프 중립'
  };
  return {
    ...signal,
    points,
    applied: points !== 0,
    detail: details[signal.phase] || (signal.reason || '와이코프 중립')
  };
}
