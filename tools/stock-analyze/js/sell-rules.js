function createSellRule({
  code,
  title,
  criterion,
  triggered,
  result,
  value = '',
  severity = 'soft',
  bucket = 'warning'
}) {
  return { code, title, criterion, triggered, result, value, severity, bucket };
}

function getSellRuleIndicatorStatus(rule) {
  if (!rule.triggered) return 'clear';
  return rule.severity === 'hard' ? 'triggered' : 'warning';
}

function buildSellIndicatorFromRule(rule) {
  return {
    title: `[${rule.code}] ${rule.title}`,
    criterion: rule.criterion,
    status: getSellRuleIndicatorStatus(rule),
    result: rule.result,
    value: rule.value || ''
  };
}

function getLatestConfirmedClosePrice(data) {
  const series = Array.isArray(data?.ohlcvSeries) ? data.ohlcvSeries : [];
  for (let index = series.length - 1; index >= 0; index -= 1) {
    const closePrice = Number(series[index]?.close);
    if (Number.isFinite(closePrice) && closePrice > 0) return closePrice;
  }
  return 0;
}

function resolvePullbackSupportContextForSell(stock, data) {
  if (stock?.type !== 'pullback') return null;
  const entry = getEntryByCode(stock.entryKey || stock.code, stock.slotId);
  const existing = entry?.pullbackContext;
  const hasExistingSupport = existing?.support?.primaryLine || existing?.support?.strengthScore || existing?.families;
  if (hasExistingSupport) return existing;
  if (typeof analyzePullbackSupportLevels !== 'function' || !Array.isArray(data?.ohlcvSeries) || !data.ohlcvSeries.length) {
    return existing || null;
  }
  const recalculated = analyzePullbackSupportLevels(data.ohlcvSeries, { currentPrice: data.currentPrice });
  return {
    support: recalculated?.support || null,
    families: recalculated?.families || {},
    volumeBurst: existing?.volumeBurst || { summary: '', burstCount: 0, maxRatioPct: null, latestBurstDaysAgo: null }
  };
}

function buildPullbackSupportIndicator(supportContext) {
  if (!supportContext?.support) return null;
  const support = supportContext.support;
  const primaryLine = support.primaryLine || null;
  const strengthScore = Number(support.strengthScore || 0);
  const tone = support.warningLevel === 'clear'
    ? 'clear'
    : support.warningLevel === 'danger'
      ? 'warning'
      : 'warning';
  const familyLabels = Array.isArray(primaryLine?.familyLabels) && primaryLine.familyLabels.length
    ? primaryLine.familyLabels.join(' · ')
    : '근거 부족';
  const distanceText = typeof primaryLine?.distancePct === 'number'
    ? `${primaryLine.distancePct.toFixed(2)}% 아래`
    : '거리 미산출';
  return {
    title: '복합 지지선 구조',
    criterion: '최근 60일 기준 수평 지지, 스윙로우 군집, volume shelf, 급증봉 저점 앵커를 함께 계산해 하단 방어력을 보조 경고로 점검합니다.',
    status: tone,
    result: primaryLine
      ? `강도 ${strengthScore}점 / ${support.strengthLabel || 'weak'} · 주지지 ${Number(primaryLine.price || 0).toLocaleString()}원 (${distanceText})`
      : `강도 ${strengthScore}점 · 현재가 아래 유효 주지지 부족`,
    value: support.warningReason || familyLabels
  };
}

function getAccumulationStopPolicy(entry) {
  return entry?.accumulationStopPolicy && typeof entry.accumulationStopPolicy === 'object'
    ? entry.accumulationStopPolicy
    : null;
}

function getAccumulationSponsorModeLabel(mode) {
  if (mode === 'foreign') return '외인';
  if (mode === 'institution') return '기관';
  if (mode === 'both') return '외인·기관';
  return '수급 주체 미확정';
}

function getAccumulationAnchorSourceLabel(source) {
  if (source === 'prior_sponsor_candle') return '전일 매집 시작 봉';
  if (source === 'entry_sponsor_candle') return '당일 매집 시작 봉';
  return '기존 % 손절';
}

function isAccumulationSponsorMaintained(mode, data) {
  if (mode === 'foreign') return Number(data.foreignNet || 0) > 0;
  if (mode === 'institution') return Number(data.institutionNet || 0) > 0;
  if (mode === 'both') return Number(data.foreignNet || 0) > 0 && Number(data.institutionNet || 0) > 0;
  return false;
}

function buildAccumulationOpenExitRuleSet(stock, data, entry, targets, gapProfile, isBefore0908) {
  const policy = getAccumulationStopPolicy(entry);
  const entryPrice = targets?.entryPrice || stock.entryPrice || data.prevClose || 0;
  const effectiveHardStopPrice = Number(policy?.effectiveHardStopPrice || targets?.stopLoss?.price || 0);
  const rules = [];
  const indicators = [];

  if (stock.type !== 'accumulation' || !policy) {
    return {
      rules,
      indicators,
      hardSignals: [],
      partialSignals: [],
      warningSignals: [],
      entryPrice,
      effectiveStopPrice: effectiveHardStopPrice,
      fallbackStopPrice: Number(policy?.fallbackStopPrice || 0),
      adjustedStopLossRate: 0
    };
  }

  const sponsorMode = String(policy.sponsorMode || 'none');
  const sponsorLabel = getAccumulationSponsorModeLabel(sponsorMode);
  const anchorLabel = getAccumulationAnchorSourceLabel(policy.anchorSource);
  indicators.push({
    title: '매집봉 시가 손절',
    criterion: String(policy.hardStopRuleSummary || '매집 시작 봉 시가와 기존 % 손절 중 더 높은 가격을 하드 스톱으로 유지합니다.'),
    status: 'unknown',
    result: effectiveHardStopPrice > 0
      ? `${anchorLabel} 기준 하드 스톱 ${effectiveHardStopPrice.toLocaleString()}원 유지`
      : '하드 스톱 미산출',
    value: policy.anchorDate
      ? `${policy.anchorDate} / ${sponsorLabel} / 기준 시가 ${Number(policy.anchorOpen || 0).toLocaleString()}원`
      : `${sponsorLabel} / 기존 % 손절 사용`
  });

  if (!isBefore0908 || sponsorMode === 'none') {
    return {
      rules,
      indicators,
      hardSignals: [],
      partialSignals: [],
      warningSignals: [],
      entryPrice,
      effectiveStopPrice: effectiveHardStopPrice,
      fallbackStopPrice: Number(policy.fallbackStopPrice || 0),
      adjustedStopLossRate: 0
    };
  }

  const priceGuard = Math.max(entryPrice || 0, effectiveHardStopPrice || 0);
  const priceWeak = data.currentPrice > 0 && priceGuard > 0 && data.currentPrice <= priceGuard;
  const foreignExited = Number(data.foreignNet || 0) <= 0;
  const institutionExited = Number(data.institutionNet || 0) <= 0;
  const riskyGap = ['G-D', 'G-E'].includes(String(gapProfile?.code || '').trim());
  const volatileMarket = String(entry?.volatilityContext?.blendedState || '') === 'volatile';
  const sponsorMaintained = isAccumulationSponsorMaintained(sponsorMode, data);

  let hardTriggered = false;
  if (sponsorMode === 'foreign') hardTriggered = foreignExited && priceWeak;
  if (sponsorMode === 'institution') hardTriggered = institutionExited && priceWeak;
  if (sponsorMode === 'both') hardTriggered = foreignExited && institutionExited && priceWeak;

  if (hardTriggered) {
    rules.push(createSellRule({
      code: 'A1',
      title: '장초반 수급 이탈',
      criterion: String(policy.openExitRuleSummary || '장초반에 수급 주체 순매수가 꺾이고 가격도 약하면 즉시 손절합니다.'),
      triggered: true,
      result: `${sponsorLabel} 순매수 이탈과 가격 약세가 동시에 확인돼 즉시 손절합니다.`,
      value: `외국인 ${Number(data.foreignNet || 0).toLocaleString()}주 / 기관 ${Number(data.institutionNet || 0).toLocaleString()}주 / 현재가 ${Number(data.currentPrice || 0).toLocaleString()}원 / 기준 ${priceGuard.toLocaleString()}원`,
      severity: 'hard',
      bucket: 'sell'
    }));
  } else if (sponsorMode === 'both' && (foreignExited || institutionExited)) {
    rules.push(createSellRule({
      code: 'A1-W',
      title: '장초반 수급 경고',
      criterion: '외인·기관 동시 매집 종목은 한쪽 주체만 먼저 이탈해도 경고로 취급하고, 둘 다 이탈할 때만 즉시 손절합니다.',
      triggered: true,
      result: `${foreignExited ? '외인' : '기관'} 한쪽만 순매수 이탈 — 즉시 손절은 아니지만 수급 경고`,
      value: `외국인 ${Number(data.foreignNet || 0).toLocaleString()}주 / 기관 ${Number(data.institutionNet || 0).toLocaleString()}주`,
      severity: 'soft',
      bucket: 'warning'
    }));
  }

  if (!hardTriggered && sponsorMode !== 'none' && sponsorMaintained && (riskyGap || volatileMarket)) {
    indicators.push({
      title: '지수 급락 보류',
      criterion: String(policy.marketShockHoldRuleSummary || '지수 급락 또는 고변동성 장세에서도 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류합니다.'),
      status: 'unknown',
      result: `${sponsorLabel} 순매수가 유지돼 장초반 흔들림 손절은 보류하고 하드 스톱만 유지합니다.`,
      value: `갭 ${gapProfile?.code || '-'} / 변동성 ${entry?.volatilityContext?.blendedState || '-'}`
    });
  }

  return {
    rules,
    indicators,
    hardSignals: rules.filter(rule => rule.triggered && rule.severity === 'hard'),
    partialSignals: rules.filter(rule => rule.triggered && rule.bucket === 'partial'),
    warningSignals: rules.filter(rule => rule.triggered && rule.bucket === 'warning'),
    entryPrice,
    effectiveStopPrice: effectiveHardStopPrice,
    fallbackStopPrice: Number(policy.fallbackStopPrice || 0),
    adjustedStopLossRate: 0
  };
}

function getBreakoutStopPolicy(entry) {
  return entry?.breakoutStopPolicy && typeof entry.breakoutStopPolicy === 'object'
    ? entry.breakoutStopPolicy
    : null;
}

function getBreakoutLiveExitPolicy(entry) {
  return entry?.breakoutLiveExitPolicy && typeof entry.breakoutLiveExitPolicy === 'object'
    ? entry.breakoutLiveExitPolicy
    : null;
}

function getReversalStopPolicy(entry) {
  return entry?.reversalStopPolicy && typeof entry.reversalStopPolicy === 'object'
    ? entry.reversalStopPolicy
    : null;
}

function getReversalLiveExitPolicy(entry) {
  return entry?.reversalLiveExitPolicy && typeof entry.reversalLiveExitPolicy === 'object'
    ? entry.reversalLiveExitPolicy
    : null;
}

const breakoutLiveStateCache = new Map();
const reversalLiveStateCache = new Map();

function getBreakoutLiveStateKey(stock) {
  return stock?.entryKey || buildEntryKey(stock?.slotId, stock?.code || '');
}

function getReversalLiveStateKey(stock) {
  return stock?.entryKey || buildEntryKey(stock?.slotId, stock?.code || '');
}

function numberOrZero(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function numberOrNull(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function extractTimeHHMM(timestamp) {
  if (typeof timestamp === 'string' && timestamp.includes('T')) return timestamp.slice(11, 16);
  if (typeof timestamp === 'number' && Number.isFinite(timestamp)) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return '';
}

function isTimeBetween(timestamp, start, end) {
  const hhmm = extractTimeHHMM(timestamp);
  return Boolean(hhmm && hhmm >= start && hhmm <= end);
}

function median(values) {
  const numbers = values.filter(value => Number.isFinite(value)).sort((a, b) => a - b);
  if (!numbers.length) return null;
  const middle = Math.floor(numbers.length / 2);
  return numbers.length % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2;
}

function buildBreakoutSyntheticBars(snapshots) {
  const ordered = (Array.isArray(snapshots) ? snapshots : []).slice(-30);
  const bars = [];
  for (let index = 0; index < ordered.length; index += 3) {
    const chunk = ordered.slice(index, index + 3);
    if (chunk.length < 3) continue;
    const prices = chunk.map(item => numberOrZero(item.currentPrice)).filter(price => price > 0);
    if (!prices.length) continue;
    bars.push({
      close: prices[prices.length - 1],
      high: Math.max(...prices),
      low: Math.min(...prices)
    });
  }
  return bars;
}

function calculateEmaSeries(values, period) {
  const numeric = values.filter(value => Number.isFinite(value) && value > 0);
  if (!numeric.length) return [];
  const multiplier = 2 / (period + 1);
  let prev = numeric[0];
  return numeric.map(value => {
    prev = ((value - prev) * multiplier) + prev;
    return prev;
  });
}

function updateBreakoutLiveState(stock, data) {
  const key = getBreakoutLiveStateKey(stock);
  const existing = breakoutLiveStateCache.get(key) || { snapshots: [], sessionHigh: 0 };
  const timestamp = numberOrZero(data?.timestamp) || Date.now();
  const nextSnapshot = {
    timestamp,
    currentPrice: numberOrZero(data?.currentPrice),
    todayVolume: numberOrZero(data?.todayVolume),
    strength: numberOrNull(data?.strength),
    bidAskRatio: numberOrNull(data?.bidAskRatio),
    bidTotal: numberOrNull(data?.bidTotal),
    askTotal: numberOrNull(data?.askTotal)
  };
  const snapshots = existing.snapshots.slice();
  if (snapshots.length && snapshots[snapshots.length - 1].timestamp === timestamp) snapshots[snapshots.length - 1] = nextSnapshot;
  else snapshots.push(nextSnapshot);
  const compactSnapshots = snapshots.slice(-60);
  const nextState = {
    snapshots: compactSnapshots,
    sessionHigh: Math.max(numberOrZero(existing.sessionHigh), nextSnapshot.currentPrice)
  };
  breakoutLiveStateCache.set(key, nextState);
  return nextState;
}

function updateReversalLiveState(stock, data) {
  const key = getReversalLiveStateKey(stock);
  const existing = reversalLiveStateCache.get(key) || { snapshots: [], sessionHigh: 0 };
  const timestamp = data?.timestamp ?? Date.now();
  const nextSnapshot = {
    timestamp,
    currentPrice: numberOrZero(data?.currentPrice),
    lowPrice: numberOrZero(data?.lowPrice ?? data?.barLow ?? data?.currentPrice),
    openPrice: numberOrZero(data?.openPrice)
  };
  const snapshots = existing.snapshots.slice();
  const last = snapshots[snapshots.length - 1];
  if (last && last.timestamp === timestamp) snapshots[snapshots.length - 1] = nextSnapshot;
  else snapshots.push(nextSnapshot);
  const nextState = {
    snapshots: snapshots.slice(-60),
    sessionHigh: Math.max(numberOrZero(existing.sessionHigh), nextSnapshot.currentPrice),
  };
  reversalLiveStateCache.set(key, nextState);
  return nextState;
}

function buildBreakoutLiveExitRuleSet(stock, data, entry, targets, gapProfile, isBefore0908) {
  const stopPolicy = getBreakoutStopPolicy(entry);
  const livePolicy = getBreakoutLiveExitPolicy(entry);
  const entryPrice = targets?.entryPrice || stock.entryPrice || data.prevClose || 0;
  const effectiveStopPrice = Number(stopPolicy?.effectiveHardStopPrice || targets?.stopLoss?.price || 0);
  const fallbackStopPrice = Number(stopPolicy?.fallbackStopPrice || 0);
  const rules = [];
  const indicators = [];

  if (!(stock.type === 'breakout' || stock.type === 'momentum') || !stopPolicy || !livePolicy) {
    return {
      rules,
      indicators,
      hardSignals: [],
      partialSignals: [],
      warningSignals: [],
      entryPrice,
      effectiveStopPrice,
      fallbackStopPrice,
      adjustedStopLossRate: 0
    };
  }

  indicators.push({
    title: '돌파 기준선 하드 스톱',
    criterion: String(stopPolicy.hardStopRuleSummary || ''),
    status: 'unknown',
    result: effectiveStopPrice > 0
      ? `기준선 ${Number(effectiveStopPrice).toLocaleString()}원`
      : '하드 스톱 미산출',
    value: stopPolicy.reasonSummary || ''
  });
  indicators.push({
    title: '라이브 익절 규칙',
    criterion: [
      String(livePolicy.wickClimaxRuleSummary || ''),
      String(livePolicy.orderbookRuleSummary || ''),
      String(livePolicy.trailingRuleSummary || '')
    ].filter(Boolean).join(' / '),
    status: 'unknown',
    result: `트레일링 활성 +${Number(livePolicy.trailingActivationPct || 0).toFixed(1)}% / 버퍼 ${Number(livePolicy.trailingBufferPct || 0).toFixed(1)}%`,
    value: `세션 컷오프 ${livePolicy.activeSessionCutoff || '-'}`
  });

  const state = updateBreakoutLiveState(stock, data);
  const snapshots = state.snapshots || [];
  const latest = snapshots[snapshots.length - 1] || {};
  const previous = snapshots[snapshots.length - 2] || {};
  const gainRate = entryPrice > 0 ? ((Number(data.currentPrice || 0) - entryPrice) / entryPrice) * 100 : 0;
  const currentStrength = numberOrNull(data?.strength);
  const referencePrice = Number(stopPolicy.referencePrice || 0);
  const priceGuard = Math.max(entryPrice || 0, effectiveStopPrice || 0);
  const riskGap = ['G-D', 'G-E'].includes(String(gapProfile?.code || '').trim());
  const activationPct = Number(livePolicy.trailingActivationPct || 0);
  const trailingBufferPct = Number(livePolicy.trailingBufferPct || 0);
  const trailingTriggered = Boolean(
    activationPct > 0
    && gainRate >= activationPct
    && state.sessionHigh > 0
    && Number(data.currentPrice || 0) <= state.sessionHigh * (1 - trailingBufferPct / 100)
  );

  if (isBefore0908 && referencePrice > 0 && Number(data.currentPrice || 0) < referencePrice) {
    rules.push(createSellRule({
      code: 'B1',
      title: '돌파 기준선 재이탈',
      criterion: String(stopPolicy.openExitRuleSummary || '장초반에 직전 돌파 기준선을 다시 깨면 즉시 손절합니다.'),
      triggered: true,
      result: `현재가 ${Number(data.currentPrice || 0).toLocaleString()}원이 기준선 ${referencePrice.toLocaleString()}원 아래입니다.`,
      value: `기준선 ${referencePrice.toLocaleString()}원 / 하드 스톱 ${effectiveStopPrice.toLocaleString()}원`,
      severity: 'hard',
      bucket: 'sell'
    }));
  }

  if (
    isBefore0908
    && Number(data.openPrice || 0) > entryPrice
    && Number(data.currentPrice || 0) <= Number(data.openPrice || 0)
    && Number(data.currentPrice || 0) <= priceGuard
    && currentStrength !== null
    && currentStrength < 100
  ) {
    rules.push(createSellRule({
      code: 'B2',
      title: '갭 시가 실패',
      criterion: '갭 상승 후 시가를 못 지키고 체결강도까지 100 미만이면 즉시 손절합니다.',
      triggered: true,
      result: `시가 ${Number(data.openPrice || 0).toLocaleString()}원 재이탈 + 체결강도 ${currentStrength.toFixed(1)}%`,
      value: `현재가 ${Number(data.currentPrice || 0).toLocaleString()}원 / 기준 ${priceGuard.toLocaleString()}원`,
      severity: 'hard',
      bucket: 'sell'
    }));
  }

  const syntheticBars = buildBreakoutSyntheticBars(snapshots);
  const closes = syntheticBars.map(bar => bar.close);
  const ema8 = calculateEmaSeries(closes, Number(stopPolicy.microTrendShortMa || 8));
  const ema10 = calculateEmaSeries(closes, Number(stopPolicy.microTrendLongMa || 10));
  const microFail = syntheticBars.length >= 2
    && [syntheticBars.length - 2, syntheticBars.length - 1].every(index => closes[index] < ema8[index] && closes[index] < ema10[index]);
  if (isBefore0908 && microFail) {
    rules.push(createSellRule({
      code: 'B3',
      title: '3분 미세추세 실패',
      criterion: String(stopPolicy.microTrendRuleSummary || ''),
      triggered: true,
      result: '최근 3분 프록시 2개가 모두 8EMA/10EMA 아래에서 마감했습니다.',
      value: `EMA8 ${ema8[ema8.length - 1]?.toFixed(0) || '-'} / EMA10 ${ema10[ema10.length - 1]?.toFixed(0) || '-'}`,
      severity: 'hard',
      bucket: 'sell'
    }));
  }

  const volumeDeltas = snapshots.map((item, index) => {
    if (index === 0) return numberOrZero(item.todayVolume);
    return Math.max(0, numberOrZero(item.todayVolume) - numberOrZero(snapshots[index - 1]?.todayVolume));
  });
  const currentVolumeDelta = volumeDeltas[volumeDeltas.length - 1] || 0;
  const averageRecentDelta = median(volumeDeltas.slice(-1 - Number(livePolicy.wickClimaxLookbackBars || 20), -1)) || 0;
  const sessionHigh = Number(state.sessionHigh || 0);
  const intradayRange = Math.max(sessionHigh - entryPrice, 1);
  const wickRatioProxy = sessionHigh > 0 ? (sessionHigh - Number(data.currentPrice || 0)) / intradayRange : 0;
  if (
    currentVolumeDelta > 0
    && averageRecentDelta > 0
    && currentVolumeDelta >= averageRecentDelta * Number(livePolicy.wickClimaxVolumeRatioMin || 2.5)
    && wickRatioProxy >= Number(livePolicy.wickUpperShadowRatioMin || 0.45)
    && Number(data.currentPrice || 0) <= sessionHigh * 0.99
  ) {
    rules.push(createSellRule({
      code: 'T1',
      title: '대량 위꼬리 클라이맥스',
      criterion: String(livePolicy.wickClimaxRuleSummary || ''),
      triggered: true,
      result: `대량 체결 후 세션 고점 ${sessionHigh.toLocaleString()}원 대비 1% 이상 밀렸습니다.`,
      value: `직전 1분 거래량 ${currentVolumeDelta.toLocaleString()} / 최근 중앙값 ${Math.round(averageRecentDelta).toLocaleString()}`,
      severity: 'hard',
      bucket: 'sell'
    }));
  }

  const recentAskMedian = median(snapshots.slice(-6, -1).map(item => numberOrNull(item.askTotal)).filter(value => value !== null)) || 0;
  const currentAskTotal = numberOrZero(data.askTotal);
  const askDropRatio = recentAskMedian > 0 ? currentAskTotal / recentAskMedian : 0;
  const noNewHigh = sessionHigh > 0 && Number(data.currentPrice || 0) < sessionHigh && Number(previous.currentPrice || 0) <= sessionHigh;
  if (
    gainRate >= 5
    && numberOrZero(data.bidAskRatio) >= Number(livePolicy.orderbookBidAskSpikeMin || 2.0)
    && recentAskMedian > 0
    && askDropRatio <= Number(livePolicy.orderbookAskDropRatioMax || 0.6)
    && (noNewHigh || Number(data.currentPrice || 0) <= sessionHigh * 0.99)
  ) {
    const escalateToFull = trailingTriggered || (currentStrength !== null && currentStrength < 100);
    rules.push(createSellRule({
      code: 'T2',
      title: '호가 분산 익절',
      criterion: String(livePolicy.orderbookRuleSummary || ''),
      triggered: true,
      result: escalateToFull
        ? '호가 분산 + 약한 체결/트레일링 동시 충족으로 전량 익절합니다.'
        : '호가 분산 신호가 나와 50% 부분 익절합니다.',
      value: `bid/ask ${Number(data.bidAskRatio || 0).toFixed(2)} / ask drop ${askDropRatio.toFixed(2)}`,
      severity: escalateToFull ? 'hard' : 'soft',
      bucket: escalateToFull ? 'sell' : 'partial'
    }));
  }

  if (trailingTriggered) {
    rules.push(createSellRule({
      code: 'T3',
      title: '트레일링 스톱',
      criterion: String(livePolicy.trailingRuleSummary || ''),
      triggered: true,
      result: `세션 고점 ${sessionHigh.toLocaleString()}원 대비 ${Number(livePolicy.trailingBufferPct || 0).toFixed(1)}% 이탈로 잔량 전량 매도합니다.`,
      value: `현재가 ${Number(data.currentPrice || 0).toLocaleString()}원 / 활성 수익률 +${Number(livePolicy.trailingActivationPct || 0).toFixed(1)}%`,
      severity: 'hard',
      bucket: 'sell'
    }));
  } else if (riskGap && sessionHigh > 0) {
    indicators.push({
      title: '고변동 돌파 주의',
      criterion: '위험 갭 구간에서는 돌파형도 라이브 익절 신호를 더 보수적으로 해석합니다.',
      status: 'warning',
      result: `갭 ${gapProfile?.code || '-'} / 세션 고점 ${sessionHigh.toLocaleString()}원 추적 중`,
      value: '트레일링과 기준선 이탈을 우선 감시합니다.'
    });
  }

  return {
    rules,
    indicators,
    hardSignals: rules.filter(rule => rule.triggered && rule.severity === 'hard'),
    partialSignals: rules.filter(rule => rule.triggered && rule.bucket === 'partial'),
    warningSignals: rules.filter(rule => rule.triggered && rule.bucket === 'warning'),
    entryPrice,
    effectiveStopPrice,
    fallbackStopPrice,
    adjustedStopLossRate: 0
  };
}

function buildReversalLiveExitRuleSet(stock, data, entry, targets) {
  const stopPolicy = getReversalStopPolicy(entry);
  const livePolicy = getReversalLiveExitPolicy(entry);
  const entryPrice = targets?.entryPrice || stock.entryPrice || data.prevClose || 0;
  const effectiveStopPrice = Number(stopPolicy?.effectiveHardStopPrice || targets?.stopLoss?.price || 0);
  const fallbackStopPrice = Number(stopPolicy?.fallbackStopPrice || 0);
  const rules = [];
  const indicators = [];

  if (stock.type !== 'reversal' || !stopPolicy || !livePolicy) {
    return {
      rules,
      indicators,
      hardSignals: [],
      partialSignals: [],
      warningSignals: [],
      entryPrice,
      effectiveStopPrice,
      fallbackStopPrice,
      adjustedStopLossRate: 0
    };
  }

  indicators.push({
    title: '당일 저가 하드 스톱',
    criterion: String(stopPolicy.hardStopRuleSummary || ''),
    status: 'unknown',
    result: effectiveStopPrice > 0
      ? `하드 스톱 ${Number(effectiveStopPrice).toLocaleString()}원`
      : '하드 스톱 미산출',
    value: stopPolicy.reasonSummary || ''
  });
  indicators.push({
    title: '09:15 조건형 손절',
    criterion: String(livePolicy.timeStopRuleSummary || ''),
    status: 'unknown',
    result: `09:15 이전 반등 ${Number(livePolicy.timeStopMinBouncePct || 0).toFixed(1)}% 미만이면 시가/진입가 회복 여부를 재확인합니다.`,
    value: `본전보호 활성 +${Number(livePolicy.breakevenActivationPct || 0).toFixed(1)}%`
  });

  const state = updateReversalLiveState(stock, data);
  const sessionHigh = Number(state.sessionHigh || 0);
  const sessionHighPct = entryPrice > 0 ? ((sessionHigh - entryPrice) / entryPrice) * 100 : 0;
  const currentPrice = Number(data.currentPrice || 0);
  const time = data?.timestamp;

  if (
    extractTimeHHMM(time) >= String(livePolicy.timeStopCutoff || '09:15')
    && sessionHighPct < Number(livePolicy.timeStopMinBouncePct || 1.0)
    && currentPrice <= Math.max(Number(data.openPrice || 0), entryPrice)
  ) {
    rules.push(createSellRule({
      code: 'R2',
      title: '09:15 조건형 시간손절',
      criterion: String(livePolicy.timeStopRuleSummary || ''),
      triggered: true,
      result: `09:15까지 세션 고점이 +${sessionHighPct.toFixed(2)}%에 그쳤고 시가/진입가도 회복하지 못했습니다.`,
      value: `현재가 ${currentPrice.toLocaleString()}원 / 시가 ${Number(data.openPrice || 0).toLocaleString()}원 / 진입가 ${Number(entryPrice).toLocaleString()}원`,
      severity: 'hard',
      bucket: 'sell'
    }));
  }

  if (
    sessionHighPct >= Number(livePolicy.breakevenActivationPct || 3.0)
    && currentPrice > 0
    && currentPrice <= entryPrice
  ) {
    rules.push(createSellRule({
      code: 'R3',
      title: '본전보호 실패',
      criterion: String(livePolicy.breakevenRuleSummary || ''),
      triggered: true,
      result: `세션 고점 +${sessionHighPct.toFixed(2)}% 반등 후 현재가가 진입가 ${Number(entryPrice).toLocaleString()}원까지 밀렸습니다.`,
      value: `현재가 ${currentPrice.toLocaleString()}원 / 세션고가 ${Number(sessionHigh).toLocaleString()}원`,
      severity: 'hard',
      bucket: 'sell'
    }));
  }

  if (isTimeBetween(time, '09:00', String(livePolicy.earlySpikeWindowEnd || '09:10')) && sessionHighPct >= 3.0) {
    indicators.push({
      title: '초반 급반등 정보',
      criterion: '09:00~09:10 구간 +3%/+5% 급등은 조기 익절/본전보호 판단의 참고 신호로만 표시합니다.',
      status: 'clear',
      result: `초반 급반등 +${sessionHighPct.toFixed(2)}% 확인`,
      value: `세션고가 ${Number(sessionHigh).toLocaleString()}원`
    });
  }

  return {
    rules,
    indicators,
    hardSignals: rules.filter(rule => rule.triggered && rule.severity === 'hard'),
    partialSignals: [],
    warningSignals: [],
    entryPrice,
    effectiveStopPrice,
    fallbackStopPrice,
    adjustedStopLossRate: 0
  };
}

function buildNonSwingSellRuleSet(stock, data, isBefore0908, targets, gapProfile) {
  const entryPrice = targets?.entryPrice || data.prevClose;
  const entry = getEntryByCode(stock.entryKey || stock.code, stock.slotId);
  const accumulationStopPolicy = getAccumulationStopPolicy(entry);
  const rules = [];
  const baseLossRate = stock.type === 'reversal' ? -3 : -4;
  const adjustedStopLossRate = baseLossRate + (gapProfile?.tightenStopLossRate || 0);
  const tightenedDefaultStopPrice = entryPrice > 0
    ? Math.round(entryPrice * (1 - ((Math.abs(baseLossRate) - (gapProfile?.tightenStopLossRate || 0)) / 100)))
    : 0;
  const fallbackStopPrice = entryPrice > 0
    ? Math.round(entryPrice * (1 + (adjustedStopLossRate / 100)))
    : 0;
  const latestClosePrice = getLatestConfirmedClosePrice(data);
  const hasLatestClose = latestClosePrice > 0;
  let effectiveStopPrice = 0;

  if (gapProfile?.immediatePartialExit && data.currentPrice > 0) {
    rules.push(createSellRule({
      code: 'P1',
      title: `${gapProfile.code} 보수 운용`,
      criterion: `갭 등급 ${gapProfile.label}에서는 보수 운용으로 50% 비중 축소를 우선 적용합니다.`,
      triggered: true,
      result: `현재가 ${data.currentPrice.toLocaleString()}원 기준 50% 선정리 우선`,
      value: `매도 조정: ${gapProfile.premarketText}`,
      severity: 'soft',
      bucket: 'partial'
    }));
  }

  if (data.openPrice > 0 && entryPrice > 0) {
    const gapRate = ((data.openPrice - entryPrice) / entryPrice) * 100;
    const isGapDown = gapRate <= -3;
    rules.push(createSellRule({
      code: 'W1',
      title: '개파락 경고 (-3% 이상 갭다운)',
      criterion: '개파락 자체는 보조 경고로만 반영합니다. 유효 손절가 미이탈 시 장초반 재판단합니다.\n기준: (시가 - 진입가) / 진입가 ≤ -3%',
      triggered: isGapDown,
      result: isGapDown
        ? `갭다운 ${gapRate.toFixed(2)}% 발생 — 장초반 재판단 경고`
        : `갭 ${gapRate.toFixed(2)}% — 정상 범위`,
      value: `(${data.openPrice.toLocaleString()} - ${entryPrice.toLocaleString()}) / ${entryPrice.toLocaleString()} = ${gapRate.toFixed(2)}%`,
      severity: 'soft',
      bucket: 'warning'
    }));
  }

  if (targets?.stopLoss?.price && hasLatestClose) {
    effectiveStopPrice = Math.max(targets.stopLoss.price, tightenedDefaultStopPrice || 0);
    const belowStopLoss = latestClosePrice <= effectiveStopPrice;
    rules.push(createSellRule({
      code: 'H1',
      title: stock.type === 'accumulation' ? '매집봉 시가 손절' : '유효 손절가 종가 이탈',
      criterion: stock.type === 'accumulation' && accumulationStopPolicy?.hardStopRuleSummary
        ? `${accumulationStopPolicy.hardStopRuleSummary}\n확정 종가가 유효 하드 스톱 아래면 전량 매도합니다.`
        : gapProfile?.tightenStopLossRate
        ? `장중 저가 이탈은 손절로 보지 않고 확정 종가 기준으로만 판단합니다.\n기준: 최근 확정 종가 ≤ MAX(전략 손절가 ${targets.stopLoss.price.toLocaleString()}원, 갭 조정 손절가 ${effectiveStopPrice.toLocaleString()}원)`
        : `장중 변동은 무시하고 최근 확정 종가가 전략 손절가(${targets.stopLoss.price.toLocaleString()}원) 아래로 마감했을 때만 전량 매도합니다.`,
      triggered: belowStopLoss,
      result: belowStopLoss
        ? `확정 종가 ${latestClosePrice.toLocaleString()} ≤ 유효 손절가 ${effectiveStopPrice.toLocaleString()} → 종가 기준 전량 매도`
        : `확정 종가 ${latestClosePrice.toLocaleString()} > 유효 손절가 ${effectiveStopPrice.toLocaleString()} — 종가 손절 미발생`,
      value: `확정 종가 ${latestClosePrice.toLocaleString()} / 유효 손절가 ${effectiveStopPrice.toLocaleString()}${gapProfile?.tightenStopLossRate ? ` (갭 ${gapProfile.code}로 ${gapProfile.tightenStopLossRate}%p 축소)` : ''}`,
      severity: 'hard',
      bucket: 'sell'
    }));
  } else if (entryPrice > 0 && hasLatestClose) {
    const lossRate = ((latestClosePrice - entryPrice) / entryPrice) * 100;
    const belowDefault = lossRate <= adjustedStopLossRate;
    rules.push(createSellRule({
      code: 'H2',
      title: stock.type === 'accumulation' ? '기본 하드 스톱 종가 이탈' : `기본 손절선 (${adjustedStopLossRate.toFixed(1)}%) 종가 이탈`,
      criterion: gapProfile?.tightenStopLossRate
        ? `전략 손절가 미설정 시에도 장중 손절은 하지 않고 확정 종가 기준으로만 판단합니다.\n기준: (최근 확정 종가 - 진입가) / 진입가 ≤ ${adjustedStopLossRate.toFixed(1)}%`
        : `전략 손절가 미설정 시에도 장중 손절은 하지 않고 확정 종가가 진입가 대비 ${baseLossRate}% 이하로 마감했을 때만 전량 매도합니다.\n기준: (최근 확정 종가 - 진입가) / 진입가 ≤ ${baseLossRate}%`,
      triggered: belowDefault,
      result: belowDefault
        ? `확정 종가 기준 ${lossRate.toFixed(2)}% → 종가 기준 전량 매도`
        : `확정 종가 기준 ${lossRate.toFixed(2)}% — 손절선 이내`,
      value: `(${latestClosePrice.toLocaleString()} - ${entryPrice.toLocaleString()}) / ${entryPrice.toLocaleString()} = ${lossRate.toFixed(2)}%${gapProfile?.tightenStopLossRate ? ` / 갭 ${gapProfile.code} 기준 ${adjustedStopLossRate.toFixed(1)}%` : ''}`,
      severity: 'hard',
      bucket: 'sell'
    }));
  }

  if ((stock.type === 'breakout' || stock.type === 'momentum') && data.currentPrice > 0 && data.openPrice > 0) {
    const openRecovery = data.currentPrice >= data.openPrice;
    rules.push(createSellRule({
      code: 'P2',
      title: '수급매집형 시가 미회복',
      criterion: '수급 매집형은 시가 하락 전환 시 50% 추가 정리를 우선합니다.\n기준: 현재가 < 시가',
      triggered: !openRecovery,
      result: !openRecovery
        ? `시초가 미회복 (현재가 ${data.currentPrice.toLocaleString()} < 시가 ${data.openPrice.toLocaleString()}) → 50% 추가 정리`
        : `시초가 위 유지 (현재가 ${data.currentPrice.toLocaleString()} ≥ 시가 ${data.openPrice.toLocaleString()})`,
      value: `현재가 ${data.currentPrice.toLocaleString()} / 시가 ${data.openPrice.toLocaleString()}`,
      severity: 'soft',
      bucket: 'partial'
    }));
  }

  if (data.ma5 > 0 && data.currentPrice > 0) {
    const dropFromMA5 = ((data.currentPrice - data.ma5) / data.ma5) * 100;
    const isBelowMA5 = dropFromMA5 <= -2;
    rules.push(createSellRule({
      code: 'W2',
      title: '5일선 -2% 하탈 경고',
      criterion: '5일 이동평균선 대비 -2% 이상 하탈은 단기 모멘텀 약화 경고로만 반영합니다.\n기준: (현재가 - 5일MA) / 5일MA ≤ -2%',
      triggered: isBelowMA5,
      result: isBelowMA5
        ? `5일선(${data.ma5.toLocaleString()}) 대비 ${dropFromMA5.toFixed(2)}% 하탈 — 보조 경고`
        : `5일선(${data.ma5.toLocaleString()}) 대비 ${dropFromMA5.toFixed(2)}% — 유지`,
      value: `(${data.currentPrice.toLocaleString()} - ${data.ma5.toLocaleString()}) / ${data.ma5.toLocaleString()} = ${dropFromMA5.toFixed(2)}%`,
      severity: 'soft',
      bucket: 'warning'
    }));
  }

  return {
    rules,
    hardSignals: rules.filter(rule => rule.triggered && rule.severity === 'hard'),
    partialSignals: rules.filter(rule => rule.triggered && rule.bucket === 'partial'),
    warningSignals: rules.filter(rule => rule.triggered && rule.bucket === 'warning'),
    entryPrice,
    effectiveStopPrice,
    fallbackStopPrice,
    adjustedStopLossRate
  };
}

function resolveSellSignalMeta(decision, actionStage, triggeredRule = null) {
  if (triggeredRule?.severity === 'hard' || actionStage === 'reject' || actionStage === 'loss_cut') {
    return { severity: 'hard', bucket: 'sell' };
  }
  if (triggeredRule?.bucket === 'partial' || actionStage === 'partial_exit') {
    return { severity: triggeredRule ? 'soft' : 'info', bucket: 'partial' };
  }
  if (triggeredRule?.bucket === 'warning' || actionStage === 'warning') {
    return { severity: triggeredRule ? 'soft' : 'info', bucket: 'warning' };
  }
  if (['premarket', 'openPhase', 'intraday1', 'intraday2'].includes(actionStage)) {
    return { severity: 'info', bucket: 'partial' };
  }
  if (decision === 'sell') {
    return { severity: 'hard', bucket: 'sell' };
  }
  return { severity: 'info', bucket: 'warning' };
}

function attachEntryContext(payload, stock, meta = {}) {
  const entry = stock.type === 'swing' ? null : getEntryByCode(stock.entryKey || stock.code, stock.slotId);
  const pullbackSupport = payload.pullbackSupport || resolvePullbackSupportContextForSell(stock, meta.data || {});
  const executionPayload = pullbackSupport ? { ...payload, pullbackSupport } : payload;
  const signalMeta = resolveSellSignalMeta(payload.decision, payload.actionStage, payload.triggeredRule);
  const executionMeta = buildSellExecutionContext({
    stock,
    payload: executionPayload,
    data: meta.data || {},
    isBefore0908: Boolean(meta.isBefore0908),
    ruleSet: meta.ruleSet || null,
    stageResult: meta.stageResult || null
  });
  return {
    ...payload,
    pullbackSupport,
    entryGrade: entry?.grade || '',
    entryStatusLabel: entry?.statusLabel || '',
    signalSeverity: signalMeta.severity,
    signalBucket: signalMeta.bucket,
    sellScore: executionMeta.sellScore,
    scoreDirection: executionMeta.scoreDirection,
    scoreBreakdown: executionMeta.scoreBreakdown,
    actionPlan: executionMeta.actionPlan
  };
}

function buildIndicators(stock, data, isBefore0908) {
  ensureStockIdentity(stock, stock.slotId);
  const indicators = [];
  let decision = 'hold';
  let actionStage = null;
  let triggeredRule = null;

  const entry = getEntryByCode(stock.entryKey || stock.code, stock.slotId);
  const targets = parseTradePlanTargets(entry);
  const entryPrice = stock.entryPrice || targets?.entryPrice || data.prevClose;
  const gainRate = entryPrice > 0 ? ((data.currentPrice - entryPrice) / entryPrice) * 100 : 0;
  const gapProfile = getGapSellAdjustmentProfile();
  const pullbackSupport = resolvePullbackSupportContextForSell(stock, data);

  if (gapProfile.code) {
    indicators.push({
      title: '갭 등급 조정',
      criterion: `현재 보고서의 갭 등급 ${gapProfile.label}에 따라 익일 프리마켓 익절, 손절폭, 스윙 전환 기준을 조정합니다.`,
      status: gapProfile.severity === 'clear' ? 'clear' : 'warning',
      result: `프리마켓: ${gapProfile.premarketText} | 손절: ${gapProfile.stopLossText} | 스윙: ${gapProfile.swingText}`,
      value: gapProfile.summary
    });

    if (gapProfile.comparison.available) {
      indicators.push({
        title: '갭 변화 보정',
        criterion: '실시간 갭 스코어가 기준 스냅샷보다 개선되면 매도 보수성을 일부 완화하고, 악화되면 추가 강화합니다.',
        status: gapProfile.comparison.bias > 0 ? 'clear' : gapProfile.comparison.bias < 0 ? 'warning' : 'unknown',
        result: gapProfile.comparison.summary,
        value: getGapComparisonText() || gapProfile.comparison.summary
      });
    }
  }

  if (stock.type === 'swing') {
    indicators.push({
      title: '분석 유형',
      criterion: 'v3.4 스윙 운용 규칙: 거부조건(R1~R4) → 강제 청산 트리거 → 손실 관리 판정 → 일반 매도 단계',
      status: 'unknown',
      result: `스윙 보유 (매수일 ${stock.buyDate || '—'}, 매수가 ${entryPrice.toLocaleString()}원, 수익률 ${gainRate >= 0 ? '+' : ''}${gainRate.toFixed(2)}%)`
    });

    const rejections = [];

    const r1Triggered = data.ma20 > 0 && data.currentPrice < data.ma20;
    rejections.push({
      code: 'R1', title: '20MA 이탈 종가',
      criterion: '종가가 20일 이동평균선 아래 → 즉시 손절',
      triggered: r1Triggered,
      result: data.ma20 > 0
        ? (r1Triggered ? `현재가 ${data.currentPrice.toLocaleString()} < 20MA ${data.ma20.toLocaleString()} → 이탈` : `현재가 ${data.currentPrice.toLocaleString()} > 20MA ${data.ma20.toLocaleString()} — 유지`)
        : '20MA 미산출 (데이터 부족)',
      severity: 'hard',
      bucket: 'sell'
    });

    const volRatio = data.volMa5 > 0 && data.todayVolume > 0 ? (data.todayVolume / data.volMa5) * 100 : null;
    const r2Triggered = volRatio !== null && volRatio < 50;
    rejections.push({
      code: 'R2', title: '거래량 급감 (관심 이탈)',
      criterion: '당일 거래량 < 5일 평균의 50% → 즉시 손절',
      triggered: r2Triggered,
      result: volRatio !== null
        ? (r2Triggered ? `거래량 ${volRatio.toFixed(0)}% (5일 평균 대비) → 관심 이탈` : `거래량 ${volRatio.toFixed(0)}% (5일 평균 대비) — 정상`)
        : '거래량 데이터 미산출',
      severity: 'hard',
      bucket: 'sell'
    });

    const r3Triggered = data.foreignNet < 0 && data.institutionNet < 0;
    const r3Checkable = data.foreignNet !== 0 || data.institutionNet !== 0;
    rejections.push({
      code: 'R3', title: '외국인+기관 동시 순매도',
      criterion: '외국인과 기관이 동시 순매도 시 → 즉시 손절',
      triggered: r3Triggered,
      result: r3Checkable
        ? (r3Triggered ? `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 → 동시 순매도` : `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 — 정상`)
        : '수급 데이터 미확인',
      severity: 'hard',
      bucket: 'sell'
    });

    const stopRate = -5;
    const r4Triggered = gainRate < stopRate;
    rejections.push({
      code: 'R4', title: `진입가 대비 ${stopRate}% 이탈`,
      criterion: `종가 < 진입가 ${stopRate}% → 즉시 손절 (위험 손실 구간)`,
      triggered: r4Triggered,
      result: r4Triggered
        ? `진입가 대비 ${gainRate.toFixed(2)}% → 위험 손실, 즉시 청산`
        : `진입가 대비 ${gainRate >= 0 ? '+' : ''}${gainRate.toFixed(2)}% — 유지`,
      severity: 'hard',
      bucket: 'sell'
    });

    const triggeredRejections = rejections.filter(r => r.triggered);
    rejections.forEach(r => {
      indicators.push({
        title: `[${r.code}] ${r.title}`,
        criterion: r.criterion,
        status: r.triggered ? 'triggered' : 'clear',
        result: r.result
      });
    });

    if (triggeredRejections.length > 0) {
      decision = 'sell';
      actionStage = 'reject';
      triggeredRule = triggeredRejections[0];
      const lossManagement = buildSwingLossManagement(data, entryPrice, gainRate, volRatio, gapProfile);
      return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, gapProfile, pullbackSupport }, stock, { data, isBefore0908 });
    }

    const below60ma = data.ma60 > 0 && data.currentPrice < data.ma60;
    if (below60ma) {
      indicators.push({
        title: '[강제청산] 60MA 이탈',
        criterion: '60MA 아래로 이탈 시 무조건 청산 (예외 없음)',
        status: 'triggered',
        result: `현재가 ${data.currentPrice.toLocaleString()} < 60MA ${data.ma60.toLocaleString()} → 즉시 청산`
      });
      decision = 'sell';
      actionStage = 'reject';
      triggeredRule = { code: '60MA', title: '60MA 이탈 강제 청산', triggered: true, severity: 'hard', bucket: 'sell' };
      const lossManagement = buildSwingLossManagement(data, entryPrice, gainRate, volRatio, gapProfile);
      return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, gapProfile, pullbackSupport }, stock, { data, isBefore0908 });
    }
    if (data.ma60 > 0) {
      indicators.push({
        title: '60MA 추세',
        criterion: '60MA 이탈 시 무조건 청산',
        status: 'clear',
        result: `현재가 ${data.currentPrice.toLocaleString()} > 60MA ${data.ma60.toLocaleString()} — 장기 추세 유지`
      });
    }

    const lossManagement = buildSwingLossManagement(data, entryPrice, gainRate, volRatio, gapProfile);

    if (gainRate < 0) {
      lossManagement.scores.forEach(s => {
        indicators.push({
          title: `[${s.code}] ${s.title}`,
          criterion: s.criterion,
          status: s.pass ? 'clear' : 'warning',
          result: s.result
        });
      });

      indicators.push({
        title: '손실 관리 종합 판정',
        criterion: `${lossManagement.maxScore}점 만점 기준: ${lossManagement.holdThreshold}~${lossManagement.maxScore} 홀드 / ${lossManagement.cautionThreshold}~${lossManagement.holdThreshold - 1} 비중 축소 / 0~${lossManagement.cautionThreshold - 1} 전량 손절`,
        status: lossManagement.totalScore >= lossManagement.holdThreshold ? 'clear' : lossManagement.totalScore >= lossManagement.cautionThreshold ? 'warning' : 'triggered',
        result: `${lossManagement.totalScore}/${lossManagement.maxScore}점 → ${lossManagement.verdict}`
      });

      if (lossManagement.totalScore < lossManagement.cautionThreshold) {
        decision = 'sell';
        actionStage = 'loss_cut';
      } else if (lossManagement.totalScore < lossManagement.holdThreshold) {
        decision = 'caution';
        actionStage = 'partial_exit';
      } else {
        decision = 'hold';
        actionStage = 'swing';
      }
    } else {
      const below5ma = data.ma5 > 0 && data.currentPrice < data.ma5;
      if (below5ma) {
        indicators.push({
          title: '5MA 이탈 (2차 트레일링)',
          criterion: '5MA 이탈 시 40% 추가 정리 구간',
          status: 'warning',
          result: `현재가 ${data.currentPrice.toLocaleString()} < 5MA ${data.ma5.toLocaleString()} → 40% 추가 정리 권고`
        });
        decision = 'caution';
        actionStage = 'partial_exit';
      } else if (gainRate >= 3) {
        indicators.push({
          title: '스윙 수익 구간',
          criterion: '진입가 대비 +3% 이상 도달 시 1차 트레일링 익절 검토 (30% 정리)',
          status: 'clear',
          result: `진입가 대비 +${gainRate.toFixed(2)}% — 1차 트레일링 익절 구간 (첫 음봉 OR +3% 추가 시 30% 정리)`
        });
        decision = 'hold';
        actionStage = 'swing';
      } else {
        indicators.push({
          title: '스윙 보유 상태',
          criterion: '거부조건·강제청산 미해당, 추세 유지 중',
          status: 'clear',
          result: `진입가 대비 +${gainRate.toFixed(2)}% — 홀딩 유지`
        });
        decision = 'hold';
        actionStage = 'swing';
      }
    }

    const below5maFinal = data.ma5 > 0 && data.currentPrice < data.ma5;
    if (data.ma5 > 0 && data.ma20 > 0 && !below5maFinal) {
      const trendOk = data.currentPrice > data.ma5 && data.currentPrice > data.ma20;
      indicators.push({
        title: '이평선 배치',
        criterion: '현재가 > 5MA > 20MA 정배열 유지 시 스윙 지속 근거',
        status: trendOk ? 'clear' : 'warning',
        result: trendOk
          ? `정배열 유지 (현재가 ${data.currentPrice.toLocaleString()} > 5MA ${data.ma5.toLocaleString()} > 20MA ${data.ma20.toLocaleString()})`
          : `현재가 ${data.currentPrice.toLocaleString()} | 5MA ${data.ma5.toLocaleString()} | 20MA ${data.ma20.toLocaleString()}`
      });
    }

    indicators.push({
      title: '동적 가격 라인',
      criterion: `최대 손절가: MAX(20MA 이탈가, 진입가×${(1 - (lossManagement.stopBaseRate / 100)).toFixed(3)}, 5일 저점) | 권장 손절가: 현재가 -2% 또는 5MA 이탈가`,
      status: 'unknown',
      result: `최대손절 ${lossManagement.maxStopPrice.toLocaleString()}원 (${lossManagement.maxStopRate >= 0 ? '+' : ''}${lossManagement.maxStopRate.toFixed(1)}%) | 권장손절 ${lossManagement.recommendedStopPrice.toLocaleString()}원 | 반등목표 ${lossManagement.recoveryTarget.toLocaleString()}원`
    });

    if (gapProfile.swingMode === 'ban' && decision === 'hold') {
      indicators.push({
        title: '갭 환경상 스윙 금지',
        criterion: `갭 등급 ${gapProfile.label}에서는 스윙 보유 연장을 허용하지 않습니다.`,
        status: 'warning',
        result: '스윙 유지 대신 비중 축소 또는 당일 정리 우선',
        value: `스윙 전환: ${gapProfile.swingText}`
      });
      decision = 'caution';
      actionStage = 'partial_exit';
    } else if (gapProfile.swingMode === 'conditional' && decision === 'hold') {
      indicators.push({
        title: '갭 환경상 조건부 스윙',
        criterion: `갭 등급 ${gapProfile.label}에서는 스윙 보유를 조건부로만 허용합니다.`,
        status: 'warning',
        result: '일부 익절 후 잔여 물량만 재검토',
        value: `스윙 전환: ${gapProfile.swingText}`
      });
      decision = 'caution';
      actionStage = 'partial_exit';
    }

    return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, gapProfile, pullbackSupport }, stock, { data, isBefore0908 });
  }

  const stageLabel = '통합 매도 분석';
  const stageDesc = (stock.type === 'breakout' || stock.type === 'momentum')
    ? '매도 단계 판정 + 하드 손절/보조 경고 검증 + 시가 회복 여부 점검'
    : stock.type === 'reversal'
      ? '매도 단계 판정 + 전일 저가 하드 스톱 + 09:15 조건형 시간손절 점검'
    : '매도 단계 판정 + 하드 손절/보조 경고 검증';
  indicators.push({
    title: '분석 단계',
    criterion: stageDesc,
    status: 'unknown',
    result: `${stageLabel} 진행 중`
  });

  const reversalRuleSet = buildReversalLiveExitRuleSet(stock, data, entry, targets);
  reversalRuleSet.indicators.forEach(indicator => {
    indicators.push(indicator);
  });
  reversalRuleSet.rules.forEach(rule => {
    indicators.push(buildSellIndicatorFromRule(rule));
  });
  if (reversalRuleSet.hardSignals.length > 0) {
    decision = 'sell';
    actionStage = 'reject';
    triggeredRule = reversalRuleSet.hardSignals[0];
    return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, gapProfile, pullbackSupport }, stock, { data, isBefore0908, ruleSet: reversalRuleSet });
  }

  const breakoutRuleSet = buildBreakoutLiveExitRuleSet(stock, data, entry, targets, gapProfile, isBefore0908);
  breakoutRuleSet.indicators.forEach(indicator => {
    indicators.push(indicator);
  });
  breakoutRuleSet.rules.forEach(rule => {
    indicators.push(buildSellIndicatorFromRule(rule));
  });
  if (breakoutRuleSet.hardSignals.length > 0) {
    decision = 'sell';
    actionStage = 'reject';
    triggeredRule = breakoutRuleSet.hardSignals[0];
    return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, gapProfile, pullbackSupport }, stock, { data, isBefore0908, ruleSet: breakoutRuleSet });
  }

  const accumulationRuleSet = buildAccumulationOpenExitRuleSet(stock, data, entry, targets, gapProfile, isBefore0908);
  accumulationRuleSet.indicators.forEach(indicator => {
    indicators.push(indicator);
  });
  accumulationRuleSet.rules.forEach(rule => {
    indicators.push(buildSellIndicatorFromRule(rule));
  });
  if (accumulationRuleSet.hardSignals.length > 0) {
    decision = 'sell';
    actionStage = 'reject';
    triggeredRule = accumulationRuleSet.hardSignals[0];
    return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, gapProfile, pullbackSupport }, stock, { data, isBefore0908, ruleSet: accumulationRuleSet });
  }

  const baseRuleSet = buildNonSwingSellRuleSet(stock, data, isBefore0908, targets, gapProfile);
  const ruleSet = {
    ...baseRuleSet,
    rules: [...reversalRuleSet.rules, ...breakoutRuleSet.rules, ...accumulationRuleSet.rules, ...baseRuleSet.rules],
    hardSignals: [...reversalRuleSet.hardSignals, ...breakoutRuleSet.hardSignals, ...accumulationRuleSet.hardSignals, ...baseRuleSet.hardSignals],
    partialSignals: [...reversalRuleSet.partialSignals, ...breakoutRuleSet.partialSignals, ...accumulationRuleSet.partialSignals, ...baseRuleSet.partialSignals],
    warningSignals: [...reversalRuleSet.warningSignals, ...breakoutRuleSet.warningSignals, ...accumulationRuleSet.warningSignals, ...baseRuleSet.warningSignals],
    effectiveStopPrice: reversalRuleSet.effectiveStopPrice || breakoutRuleSet.effectiveStopPrice || accumulationRuleSet.effectiveStopPrice || baseRuleSet.effectiveStopPrice,
    fallbackStopPrice: reversalRuleSet.fallbackStopPrice || breakoutRuleSet.fallbackStopPrice || accumulationRuleSet.fallbackStopPrice || baseRuleSet.fallbackStopPrice
  };
  baseRuleSet.rules.forEach(rule => {
    indicators.push(buildSellIndicatorFromRule(rule));
  });

  if (ruleSet.hardSignals.length > 0) {
    decision = 'sell';
    actionStage = 'reject';
    triggeredRule = ruleSet.hardSignals[0];
    return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, gapProfile, pullbackSupport }, stock, { data, isBefore0908, ruleSet });
  }

  if (ruleSet.partialSignals.length > 0) {
    decision = 'caution';
    actionStage = 'partial_exit';
    triggeredRule = ruleSet.partialSignals[0];
    return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, gapProfile, pullbackSupport }, stock, { data, isBefore0908, ruleSet });
  }

  const stageResult = evaluateTradeStage(data, targets, data.prevClose, gapProfile);
  indicators.push({
    title: '매도 단계 판정',
    criterion: `진입가(${entryPrice ? entryPrice.toLocaleString() + '원' : '미설정'}) 대비 현재 위치를 매매전략 구간에 매칭합니다.`,
    status: stageResult.stage === 'underwater' ? 'warning' : (stageResult.stage === 'hold' ? 'unknown' : 'clear'),
    result: `${stageResult.label} — ${stageResult.detail}`,
    value: `진입가 대비 수익률: ${gainRate.toFixed(2)}%`
  });

  actionStage = stageResult.stage;

  if (['premarket', 'openPhase', 'intraday1', 'intraday2'].includes(stageResult.stage)) {
    decision = 'caution';
  } else if (stageResult.stage === 'swing') {
    decision = 'hold';
  } else if (stageResult.stage === 'underwater') {
    decision = 'caution';
  }

  const supportIndicator = buildPullbackSupportIndicator(pullbackSupport);
  if (supportIndicator) {
    indicators.push(supportIndicator);
    if (supportIndicator.status === 'warning' && decision === 'hold') {
      decision = 'caution';
      if (actionStage === 'swing') actionStage = 'warning';
    }
  }

  if (stageResult.stage === 'swing' && gapProfile.swingMode === 'ban') {
    indicators.push({
      title: '스윙 전환 제한',
      criterion: `갭 등급 ${gapProfile.label}에서는 스윙 전환을 허용하지 않고 익절 우선으로 전환합니다.`,
      status: 'warning',
      result: '스윙 전환 대신 비중 축소 또는 당일 정리 우선',
      value: `스윙 전환: ${gapProfile.swingText}`
    });
    decision = 'caution';
    actionStage = 'partial_exit';
  } else if (stageResult.stage === 'swing' && gapProfile.swingMode === 'conditional') {
    indicators.push({
      title: '스윙 전환 조건부 허용',
      criterion: `갭 등급 ${gapProfile.label}에서는 스윙 전환 전 일부 익절과 장중 재확인을 우선합니다.`,
      status: 'warning',
      result: '잔여 물량만 조건부 스윙 검토',
      value: `스윙 전환: ${gapProfile.swingText}`
    });
    decision = 'caution';
    actionStage = 'partial_exit';
  }

  if (data.strength !== null && data.strength !== undefined) {
    const threshold = (stock.type === 'breakout' || stock.type === 'momentum') ? 100 : 80;
    const weakStr = data.strength < threshold;
    indicators.push({
      title: '체결강도 점검',
      criterion: `체결강도가 ${threshold}% 미만이면 매도세 우위로 전환 의심.\n기준: 체결강도 < ${threshold}%`,
      status: weakStr ? 'warning' : 'clear',
      result: weakStr
        ? `체결강도 ${data.strength.toFixed(1)}% — 매도세 전환 의심`
        : `체결강도 ${data.strength.toFixed(1)}% — 매수세 유지`,
      value: `체결강도 ${data.strength.toFixed(1)}% (기준: ${threshold}%)`
    });
    if (weakStr && decision === 'hold') {
      decision = 'caution';
      actionStage = 'warning';
    }
  } else if (stock.type !== 'swing') {
    indicators.push({
      title: '체결강도 상태',
      criterion: '현재 네이버 경로에서는 체결강도 값이 제공되지 않아 매도 판단에서 제외합니다.',
      status: 'unknown',
      result: '체결강도 미연동 — 다른 가격/이평/수급 기준만으로 판정',
      value: '실시간 체결강도 연동 전까지 중립 처리'
    });
  }

  if (!triggeredRule && ruleSet.warningSignals.length > 0) {
    triggeredRule = ruleSet.warningSignals[0];
  }

  if (ruleSet.warningSignals.length > 0 && decision === 'hold') {
    decision = 'caution';
    actionStage = 'warning';
  }

  return attachEntryContext({ indicators, decision, actionStage, triggeredRule, targets, gainRate, gapProfile, pullbackSupport }, stock, { data, isBefore0908, ruleSet, stageResult });
}

function applyRules(stock, data, isBefore0908) {
  ensureStockIdentity(stock, stock.slotId);
  const key = stock.entryKey || buildEntryKey(stock.slotId, stock.code);
  const card = document.getElementById(getCardDomId(key));
  const priceRow = document.getElementById(getPriceRowDomId(key));
  const meta = document.getElementById(getMetaDomId(key));
  const planBox = document.getElementById(getPlanDomId(key));
  const indBox = document.getElementById(getIndicatorDomId(key));
  const badge = document.getElementById(getBadgeDomId(key));
  const detail = buildIndicators(stock, data, isBefore0908);

  stockDetailMap[key] = {
    mode: 'sell',
    stock,
    data,
    indicators: detail.indicators,
    decision: detail.decision,
    actionStage: detail.actionStage,
    triggeredRule: detail.triggeredRule,
    targets: detail.targets,
    gainRate: detail.gainRate,
    lossManagement: detail.lossManagement,
    isBefore0908,
    gapProfile: detail.gapProfile,
    entryGrade: detail.entryGrade,
    entryStatusLabel: detail.entryStatusLabel,
    signalSeverity: detail.signalSeverity,
    signalBucket: detail.signalBucket,
    sellScore: detail.sellScore,
    scoreDirection: detail.scoreDirection,
    scoreBreakdown: detail.scoreBreakdown,
    actionPlan: detail.actionPlan,
    pullbackSupport: detail.pullbackSupport
  };

  if (!card || !priceRow || !meta || !indBox || !badge) {
    return;
  }

  const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
  const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
  const absChg = Math.abs(data.chgRate).toFixed(2);

  const entry = getEntryByCode(key, stock.slotId);
  const entryPrice = stock.entryPrice || entry?.entryPriceValue || data.prevClose;
  const gainFromEntry = entryPrice > 0 ? ((data.currentPrice - entryPrice) / entryPrice) * 100 : 0;

  priceRow.innerHTML = `
    <span class="price">${data.currentPrice.toLocaleString()}원</span>
    <span class="chg ${chgClass}" style="font-size:14px;font-weight:700">${chgPrefix}${absChg}%</span>
    ${stock.type === 'swing' ? `<span class="chg ${gainFromEntry >= 0 ? 'up' : 'dn'}" style="font-size:12px;margin-left:8px">매수 대비 ${gainFromEntry >= 0 ? '+' : ''}${gainFromEntry.toFixed(2)}%</span>` : ''}
  `;
  meta.innerHTML = `
    <span style="opacity:0.7">진입가:</span> <strong>${entryPrice.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">시가:</span> <strong>${data.openPrice.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">체결강도:</span> <strong>${data.strength !== null && data.strength !== undefined ? `${data.strength.toFixed(2)}%` : '미연동'}</strong>
  `;

  if (planBox && !detail.targets) {
    planBox.innerHTML = '<div class="scard-plan-empty">매매 단계 정보 없음</div>';
  }
  renderSellDetailToCard(stockDetailMap[key]);
}
