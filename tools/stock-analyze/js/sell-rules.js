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

function buildNonSwingSellRuleSet(stock, data, isBefore0908, targets, gapProfile) {
  const entryPrice = targets?.entryPrice || data.prevClose;
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
      title: '유효 손절가 종가 이탈',
      criterion: gapProfile?.tightenStopLossRate
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
      title: `기본 손절선 (${adjustedStopLossRate.toFixed(1)}%) 종가 이탈`,
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
    : '매도 단계 판정 + 하드 손절/보조 경고 검증';
  indicators.push({
    title: '분석 단계',
    criterion: stageDesc,
    status: 'unknown',
    result: `${stageLabel} 진행 중`
  });

  const ruleSet = buildNonSwingSellRuleSet(stock, data, isBefore0908, targets, gapProfile);
  ruleSet.rules.forEach(rule => {
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
