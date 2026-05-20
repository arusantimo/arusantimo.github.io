const SELL_SCORE_DIRECTION = 'sell';

const SELL_ACTION_BUCKET_META = [
  { minScore: 85, bucket: 'full_exit', sellNowPct: 100, holdPct: 0 },
  { minScore: 70, bucket: 'trim70', sellNowPct: 70, holdPct: 30 },
  { minScore: 55, bucket: 'trim50', sellNowPct: 50, holdPct: 50 },
  { minScore: 40, bucket: 'trim30', sellNowPct: 30, holdPct: 70 },
  { minScore: 0, bucket: 'hold', sellNowPct: 0, holdPct: 100 }
];

const SELL_STAGE_SCORE_RATIOS = {
  underwater: 1,
  partial_exit: 0.6,
  premarket: 0.6,
  openPhase: 0.45,
  intraday1: 0.25,
  intraday2: 0.1,
  hold: 0.35,
  warning: 0.35,
  swing: 0,
  wait: 0,
  unknown: 0
};

const NON_SWING_SELL_SCORE_WEIGHTS = {
  pullback: { stop: 35, stage: 25, ma5: 20, gap: 10, strength: 10 },
  momentum: { stop: 25, stage: 30, ma5: 15, gap: 15, strength: 15 },
  reversal: { stop: 30, stage: 30, ma5: 15, gap: 10, strength: 15 }
};

function roundSellScorePoints(value) {
  return Math.round(clamp(value || 0, 0, 100));
}

function roundSellScoreDelta(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num);
}

function buildSellScoreItem({ code, label, points, maxPoints, triggered, detail }) {
  return {
    code,
    label,
    points: roundSellScoreDelta(points),
    maxPoints,
    triggered: Boolean(triggered),
    detail
  };
}

function getSellActionBucketMeta(score) {
  return SELL_ACTION_BUCKET_META.find(candidate => score >= candidate.minScore) || SELL_ACTION_BUCKET_META.at(-1);
}

function getSellStageScoreRatio(stage) {
  return SELL_STAGE_SCORE_RATIOS[stage] ?? 0;
}

function hasTriggeredSellRule(ruleSet, code) {
  return Boolean(ruleSet?.rules?.some(rule => rule.code === code && rule.triggered));
}

function getStopProximityRatio(currentPrice, stopPrice) {
  if (!currentPrice || !stopPrice) return 0;
  const distancePct = ((currentPrice - stopPrice) / currentPrice) * 100;
  if (distancePct <= 1) return 1;
  if (distancePct <= 2) return 0.6;
  return 0;
}

function getNonSwingSellScoreWeights(stockType) {
  return NON_SWING_SELL_SCORE_WEIGHTS[stockType] || NON_SWING_SELL_SCORE_WEIGHTS.pullback;
}

function resolveSellScoreStage(payload, stageResult = null) {
  return stageResult?.stage || payload.actionStage || 'unknown';
}

function buildStopProximityDetail(currentPrice, stopPrice, ratio) {
  if (!stopPrice) return '유효 손절가 미설정';
  const distancePct = ((currentPrice - stopPrice) / currentPrice) * 100;
  return `유효 손절가 ${formatWon(stopPrice)}와 거리 ${distancePct.toFixed(2)}% (${ratio === 1 ? '1% 이내' : ratio === 0.6 ? '2% 이내' : '완충'})`;
}

function buildSellActionSummary(bucketMeta, stopPrice, stage, recheckLabel) {
  if (bucketMeta.bucket === 'full_exit') return '지금 100% 매도';

  if (bucketMeta.bucket === 'hold') {
    if (stopPrice > 0) return `지금 홀딩 유지, ${formatWon(stopPrice)} 이탈 시 정리`;
    if (['premarket', 'openPhase', 'intraday1', 'intraday2'].includes(stage)) return `지금 홀딩 유지, ${recheckLabel}`;
    return '지금 홀딩 유지';
  }

  if (stopPrice > 0) {
    return `지금 ${bucketMeta.sellNowPct}% 매도, 잔여 ${bucketMeta.holdPct}%는 ${formatWon(stopPrice)} 이탈 시 정리`;
  }
  return `지금 ${bucketMeta.sellNowPct}% 매도 후 ${bucketMeta.holdPct}% 유지`;
}

function buildSellRecheckLabel({ stock, payload, data, isBefore0908, stage }) {
  if (payload.actionStage === 'reject' || payload.actionStage === 'loss_cut' || payload.triggeredRule?.severity === 'hard') {
    return '즉시 실행';
  }
  if (stock.type === 'momentum' && isBefore0908 && data.openPrice > 0 && data.currentPrice < data.openPrice) {
    return '09:08 재분석';
  }
  if (['premarket', 'openPhase', 'intraday1', 'intraday2'].includes(stage)) {
    return '다음 매매 단계 도달 시 재평가';
  }
  return '다음 분석 시점 재평가';
}

function resolveNonSwingFollowUpStopPrice(ruleSet, payload) {
  return ruleSet?.effectiveStopPrice
    || ruleSet?.fallbackStopPrice
    || payload.targets?.stopLoss?.price
    || 0;
}

function resolveSwingFollowUpStopPrice(payload, bucket) {
  if (!payload.lossManagement) return 0;
  if (bucket === 'full_exit') {
    return payload.lossManagement.maxStopPrice || payload.lossManagement.recommendedStopPrice || 0;
  }
  return payload.lossManagement.recommendedStopPrice || payload.lossManagement.maxStopPrice || 0;
}

function buildSellActionPlan({ stock, payload, data, isBefore0908, ruleSet, stageResult, sellScore }) {
  const bucketMeta = getSellActionBucketMeta(sellScore);
  const stage = resolveSellScoreStage(payload, stageResult);
  const followUpStopPrice = stock.type === 'swing'
    ? resolveSwingFollowUpStopPrice(payload, bucketMeta.bucket)
    : resolveNonSwingFollowUpStopPrice(ruleSet, payload);
  const recheckLabel = buildSellRecheckLabel({ stock, payload, data, isBefore0908, stage });
  const followUpTriggerLabel = bucketMeta.holdPct > 0 && followUpStopPrice > 0
    ? `${formatWon(followUpStopPrice)} 이탈 시 잔여 ${bucketMeta.holdPct}% 전량 정리`
    : bucketMeta.holdPct > 0
      ? recheckLabel
      : '즉시 실행';

  return {
    bucket: bucketMeta.bucket,
    sellNowPct: bucketMeta.sellNowPct,
    holdPct: bucketMeta.holdPct,
    summary: buildSellActionSummary(bucketMeta, followUpStopPrice, stage, recheckLabel),
    followUpStopPrice: followUpStopPrice || null,
    followUpTriggerLabel,
    recheckLabel
  };
}

function buildNonSwingSellScoreContext({ stock, payload, data, isBefore0908, ruleSet, stageResult }) {
  const weights = getNonSwingSellScoreWeights(stock.type);
  const stage = resolveSellScoreStage(payload, stageResult);
  const stopPrice = resolveNonSwingFollowUpStopPrice(ruleSet, payload);
  const stopRatio = getStopProximityRatio(data.currentPrice, stopPrice);
  const stageRatio = getSellStageScoreRatio(stage);
  const weakStrength = Number.isFinite(data.strength) ? data.strength < (stock.type === 'momentum' ? 100 : 80) : false;
  const gapTriggered = hasTriggeredSellRule(ruleSet, 'P1') || hasTriggeredSellRule(ruleSet, 'W1');
  const ma5Triggered = hasTriggeredSellRule(ruleSet, 'W2');
  const wyckoffInfo = typeof getSellWyckoffScoreInfo === 'function'
    ? getSellWyckoffScoreInfo(data.wyckoff)
    : { points: 0, applied: false, detail: '와이코프 중립' };
  const breakdown = [
    buildSellScoreItem({
      code: 'S-S1',
      label: '손절선 근접',
      points: weights.stop * stopRatio,
      maxPoints: weights.stop,
      triggered: stopRatio > 0,
      detail: buildStopProximityDetail(data.currentPrice, stopPrice, stopRatio)
    }),
    buildSellScoreItem({
      code: 'S-S2',
      label: '단계/평가손',
      points: weights.stage * stageRatio,
      maxPoints: weights.stage,
      triggered: stageRatio > 0,
      detail: stageResult?.detail || `현재 단계 ${stage}`
    }),
    buildSellScoreItem({
      code: 'S-S3',
      label: '5일선 이탈',
      points: ma5Triggered ? weights.ma5 : 0,
      maxPoints: weights.ma5,
      triggered: ma5Triggered,
      detail: ma5Triggered ? '5일선 -2% 하탈 경고가 활성화됨' : '5일선 경고 없음'
    }),
    buildSellScoreItem({
      code: 'S-S4',
      label: stock.type === 'momentum' ? '갭/프리마켓 보수운용' : '갭 경고',
      points: gapTriggered ? weights.gap : 0,
      maxPoints: weights.gap,
      triggered: gapTriggered,
      detail: gapTriggered ? '갭 경고 또는 프리마켓 보수 운용이 활성화됨' : '갭 경고 없음'
    }),
    buildSellScoreItem({
      code: 'S-S5',
      label: '체결강도 약화',
      points: weakStrength ? weights.strength : 0,
      maxPoints: weights.strength,
      triggered: weakStrength,
      detail: Number.isFinite(data.strength)
        ? `체결강도 ${data.strength.toFixed(1)}%`
        : '체결강도 미연동'
    }),
    buildSellScoreItem({
      code: 'S-S6',
      label: '와이코프 Phase',
      points: wyckoffInfo.points,
      maxPoints: 15,
      triggered: wyckoffInfo.applied,
      detail: wyckoffInfo.detail
    })
  ];

  let sellScore = breakdown.reduce((sum, item) => sum + item.points, 0);
  if (stock.type === 'momentum' && isBefore0908 && data.openPrice > 0 && data.currentPrice < data.openPrice) {
    sellScore = Math.max(sellScore, 70);
  }
  if (hasTriggeredSellRule(ruleSet, 'P1')) {
    sellScore = Math.max(sellScore, 70);
  }

  const warningOnly = payload.actionStage === 'warning'
    && !ruleSet?.partialSignals?.length
    && !ruleSet?.hardSignals?.length
    && !['premarket', 'openPhase', 'intraday1', 'intraday2', 'underwater'].includes(stage)
    && stopRatio === 0;
  if (warningOnly) {
    sellScore = Math.min(sellScore, 54);
  }

  sellScore = roundSellScorePoints(sellScore);
  return {
    sellScore,
    scoreDirection: SELL_SCORE_DIRECTION,
    scoreBreakdown: breakdown,
    actionPlan: buildSellActionPlan({ stock, payload, data, isBefore0908, ruleSet, stageResult, sellScore })
  };
}

function buildSwingSellScoreContext({ stock, payload, data, isBefore0908 }) {
  const volRatio = data.volMa5 > 0 && data.todayVolume > 0 ? (data.todayVolume / data.volMa5) * 100 : null;
  const weakStrength = Number.isFinite(data.strength) ? data.strength < 90 : false;
  const adverseGap = payload.gapProfile?.code && payload.gapProfile.swingMode !== 'allow';
  const driftWorse = payload.gapProfile?.comparison?.available && payload.gapProfile.comparison.bias < 0;
  const wyckoffInfo = typeof getSellWyckoffScoreInfo === 'function'
    ? getSellWyckoffScoreInfo(data.wyckoff)
    : { points: 0, applied: false, detail: '와이코프 중립' };
  const breakdown = [
    buildSellScoreItem({ code: 'SW1', label: '20MA 이탈 위험', points: data.ma20 > 0 && data.currentPrice < data.ma20 ? 20 : 0, maxPoints: 20, triggered: data.ma20 > 0 && data.currentPrice < data.ma20, detail: data.ma20 > 0 ? `${formatWon(data.currentPrice)} vs 20MA ${formatWon(data.ma20)}` : '20MA 미산출' }),
    buildSellScoreItem({ code: 'SW2', label: '5MA 방향 악화', points: data.ma5Direction === 'down' ? 10 : 0, maxPoints: 10, triggered: data.ma5Direction === 'down', detail: data.ma5Direction === 'down' ? '5MA 하락 전환' : `5MA ${data.ma5Direction || '미확인'}` }),
    buildSellScoreItem({ code: 'SW3', label: '거래량 약화', points: volRatio !== null && volRatio < 70 ? 10 : 0, maxPoints: 10, triggered: volRatio !== null && volRatio < 70, detail: volRatio !== null ? `거래량 ${volRatio.toFixed(0)}% / 5일 평균` : '거래량 미산출' }),
    buildSellScoreItem({ code: 'SW4', label: '외인+기관 동시 순매도', points: data.foreignNet < 0 && data.institutionNet < 0 ? 15 : 0, maxPoints: 15, triggered: data.foreignNet < 0 && data.institutionNet < 0, detail: `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주` }),
    buildSellScoreItem({ code: 'SW5', label: '체결강도 약화', points: weakStrength ? 10 : 0, maxPoints: 10, triggered: weakStrength, detail: Number.isFinite(data.strength) ? `체결강도 ${data.strength.toFixed(1)}%` : '체결강도 미연동' }),
    buildSellScoreItem({ code: 'SW6', label: '5일 저점 이탈', points: data.low5d > 0 && data.currentPrice < data.low5d ? 15 : 0, maxPoints: 15, triggered: data.low5d > 0 && data.currentPrice < data.low5d, detail: data.low5d > 0 ? `${formatWon(data.currentPrice)} vs 5일 저점 ${formatWon(data.low5d)}` : '5일 저점 미산출' }),
    buildSellScoreItem({ code: 'SW7', label: '갭 환경 악화', points: adverseGap ? 10 : 0, maxPoints: 10, triggered: adverseGap, detail: payload.gapProfile?.code ? `${payload.gapProfile.code} / 스윙 ${payload.gapProfile.swingText}` : '갭 등급 미확인' }),
    buildSellScoreItem({ code: 'SW8', label: '기준 스냅샷 대비 갭 드리프트 악화', points: driftWorse ? 10 : 0, maxPoints: 10, triggered: driftWorse, detail: payload.gapProfile?.comparison?.summary || '기준 스냅샷 대비 변화 없음' }),
    buildSellScoreItem({ code: 'SW9', label: '와이코프 Phase', points: wyckoffInfo.points, maxPoints: 15, triggered: wyckoffInfo.applied, detail: wyckoffInfo.detail })
  ];

  let sellScore = breakdown.reduce((sum, item) => sum + item.points, 0);
  if (payload.actionStage === 'reject' || payload.gainRate <= -5) {
    sellScore = 100;
  } else if (payload.gainRate < 0 && payload.lossManagement && payload.lossManagement.totalScore < payload.lossManagement.holdThreshold) {
    sellScore = Math.max(sellScore, 55);
  } else if (payload.actionStage === 'partial_exit' && payload.gainRate >= 0) {
    sellScore = Math.max(sellScore, 40);
  }

  sellScore = roundSellScorePoints(sellScore);
  return {
    sellScore,
    scoreDirection: SELL_SCORE_DIRECTION,
    scoreBreakdown: breakdown,
    actionPlan: buildSellActionPlan({ stock, payload, data, isBefore0908, ruleSet: null, stageResult: null, sellScore })
  };
}

function buildHardExitSellScoreContext({ stock, payload, data, isBefore0908, ruleSet }) {
  const title = payload.triggeredRule?.title || '하드 손절';
  return {
    sellScore: 100,
    scoreDirection: SELL_SCORE_DIRECTION,
    scoreBreakdown: [buildSellScoreItem({ code: payload.triggeredRule?.code || 'HARD', label: title, points: 100, maxPoints: 100, triggered: true, detail: payload.triggeredRule?.result || '하드 손절 조건 충족' })],
    actionPlan: buildSellActionPlan({ stock, payload, data, isBefore0908, ruleSet, stageResult: null, sellScore: 100 })
  };
}

function buildSellExecutionContext({ stock, payload, data, isBefore0908, ruleSet = null, stageResult = null }) {
  if (payload.actionStage === 'reject' || payload.actionStage === 'loss_cut' || payload.triggeredRule?.severity === 'hard') {
    return buildHardExitSellScoreContext({ stock, payload, data, isBefore0908, ruleSet });
  }
  if (stock.type === 'swing') {
    return buildSwingSellScoreContext({ stock, payload, data, isBefore0908 });
  }
  return buildNonSwingSellScoreContext({ stock, payload, data, isBefore0908, ruleSet, stageResult });
}
