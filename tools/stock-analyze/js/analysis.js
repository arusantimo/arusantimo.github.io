function rebuildSellStocksFromSnapshot() {
  const manualPullback = stocks.pullback.filter(stock => stock.manual);
  const manualMomentum = stocks.momentum.filter(stock => stock.manual);

  stocks.pullback = [
    ...notionSnapshot.pullbackEntries.map(entry => ({ name: entry.name, code: entry.code, type: 'pullback', strategy: 'pullback', source: 'notion' })),
    ...manualPullback.filter(stock => !notionSnapshot.pullbackEntries.some(entry => entry.code === stock.code))
  ];

  stocks.momentum = [
    ...notionSnapshot.momentumEntries.map(entry => ({ name: entry.name, code: entry.code, type: 'momentum', strategy: 'momentum', source: 'notion' })),
    ...manualMomentum.filter(stock => !notionSnapshot.momentumEntries.some(entry => entry.code === stock.code))
  ];

  stocks.swing = notionSnapshot.swingEntries.map(entry => ({
    name: entry.name, code: entry.code, type: 'swing', strategy: 'swing', source: 'notion',
    entryPrice: entry.entryPrice, buyDate: entry.buyDate, status: entry.status
  }));
}

function getEntryByCode(code) {
  return [...notionSnapshot.pullbackEntries, ...notionSnapshot.momentumEntries, ...notionSnapshot.reversalEntries].find(entry => entry.code === code);
}

function getAllBuyEntries() {
  return [...notionSnapshot.pullbackEntries, ...notionSnapshot.momentumEntries, ...notionSnapshot.reversalEntries];
}

function summarizeGateStatus(entry) {
  const gates = Array.isArray(entry?.gates) ? entry.gates : [];
  const passed = gates.filter(gate => gate.status === '✅').length;
  const warned = gates.filter(gate => gate.status === '⚠️').length;
  const blocked = gates.filter(gate => gate.status === '⛔').length;
  return { passed, warned, blocked, total: gates.length };
}

function getBuyGradeFromScore(score, strategy = 'pullback') {
  if (strategy === 'reversal') {
    if (score >= 8.5) return 'S';
    if (score >= 7.0) return 'A';
    if (score >= 5.5) return 'B';
    return 'C';
  }

  if (score >= 9) return 'S';
  if (score >= 7.5) return 'A';
  if (score >= 6) return 'B';
  return 'C';
}

function getBuyVerdictClassFromGrade(grade) {
  if (String(grade ?? '').startsWith('S')) return 'strong';
  if (String(grade ?? '').startsWith('A')) return 'good';
  if (String(grade ?? '').startsWith('B')) return 'watch';
  return 'exclude';
}

function getBuyVerdictClass(entry) {
  return getBuyVerdictClassFromGrade(entry.grade);
}
async function analyzeStock(stock, isBefore0908) {
  log(`- [${stock.name}] 네이버 증권 데이터 파싱 중...`);
  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt += 1) {
    try {
      const proxy = PROXIES[(attempt - 1) % PROXIES.length];
      const basicUrl = `https://m.stock.naver.com/api/stock/${stock.code}/basic`;
      const basicRes = await fetch(proxy + encodeURIComponent(basicUrl));
      if (!basicRes.ok) throw new Error(`basic API error (${basicRes.status})`);
      const basicJson = await basicRes.json();

      const parseNum = value => parseInt(String(value).replace(/,/g, ''), 10) || 0;
      const parseFloat2 = value => parseFloat(String(value).replace(/,/g, '').replace('%', '')) || 0;

      const currentPrice = parseNum(basicJson.closePrice ?? basicJson.stockPrice ?? 0);
      const chgRateRaw = parseFloat2(basicJson.fluctuationsRatio ?? basicJson.changeRate ?? 0);

      const [intRes, priceRes] = await Promise.all([
        fetch(proxy + encodeURIComponent(`https://m.stock.naver.com/api/stock/${stock.code}/integration`)),
        fetch(proxy + encodeURIComponent(`https://m.stock.naver.com/api/stock/${stock.code}/price?pageSize=60&page=1`))
      ]);
      if (!intRes.ok) throw new Error(`integration API error (${intRes.status})`);
      if (!priceRes.ok) throw new Error(`price API error (${priceRes.status})`);
      const intJson = await intRes.json();
      const priceJson = await priceRes.json();

      const findInfo = code => (intJson.totalInfos ?? []).find(info => info.code === code);
      const prevClose = parseNum(findInfo('lastClosePrice')?.value ?? 0) || currentPrice;
      const openPrice = parseNum(findInfo('openPrice')?.value ?? 0);
      const chgRate = chgRateRaw !== 0 ? chgRateRaw : (prevClose > 0 ? ((currentPrice - prevClose) / prevClose) * 100 : 0);
      const strength = null;
      const todayVolume = parseNum(findInfo('accumulatedTradingVolume')?.value ?? 0);

      const priceHistory = Array.isArray(priceJson) ? priceJson : [];
      const pastPrices = priceHistory.map(d => parseNum(d.closePrice)).filter(p => p > 0);
      const pastVolumes = priceHistory.map(d => parseNum(d.accumulatedTradingVolume)).filter(v => v > 0);
      const pastLows = priceHistory.map(d => parseNum(d.lowPrice)).filter(p => p > 0);
      const pastHighs = priceHistory.map(d => parseNum(d.highPrice)).filter(p => p > 0);

      const ma5 = pastPrices.length >= 5
        ? Math.round(pastPrices.slice(0, 5).reduce((acc, price) => acc + price, 0) / 5)
        : 0;
      const ma20 = pastPrices.length >= 20
        ? Math.round(pastPrices.slice(0, 20).reduce((acc, price) => acc + price, 0) / 20)
        : 0;
      const ma60 = pastPrices.length >= 60
        ? Math.round(pastPrices.slice(0, 60).reduce((acc, price) => acc + price, 0) / 60)
        : 0;
      const volMa5 = pastVolumes.length >= 5
        ? Math.round(pastVolumes.slice(0, 5).reduce((acc, v) => acc + v, 0) / 5)
        : 0;
      const low5d = pastLows.length >= 5 ? Math.min(...pastLows.slice(0, 5)) : 0;
      const high20d = pastHighs.length >= 20 ? Math.max(...pastHighs.slice(0, 20)) : 0;
      const ma5Prev = pastPrices.length >= 6
        ? Math.round(pastPrices.slice(1, 6).reduce((acc, price) => acc + price, 0) / 5)
        : 0;
      const ma5Direction = ma5 > 0 && ma5Prev > 0 ? (ma5 > ma5Prev ? 'up' : ma5 < ma5Prev ? 'down' : 'flat') : 'unknown';

      const deals = intJson.dealTrendInfos ?? [];
      const todayDeal = deals.length > 0 ? deals[0] : {};
      const foreignNet = parseNum(todayDeal.foreignerPureBuyQuant ?? 0);
      const institutionNet = parseNum(todayDeal.organPureBuyQuant ?? 0);

      const data = { currentPrice, prevClose, openPrice, chgRate, strength, ma5, ma20, ma60, todayVolume, volMa5, foreignNet, institutionNet, low5d, high20d, ma5Direction };
      log(`- [${stock.name}] 완료. (현재가: ${data.currentPrice.toLocaleString()}, 등락률: ${data.chgRate.toFixed(2)}%, 시가: ${data.openPrice.toLocaleString()}, 전일종가: ${data.prevClose.toLocaleString()}, 5일MA: ${ma5.toLocaleString()}원, 20MA: ${ma20.toLocaleString()}원, 외인: ${foreignNet.toLocaleString()}주)`);
      applyRules(stock, data, isBefore0908);
      return;
    } catch (error) {
      if (attempt <= maxRetries) {
        log(`<span style="color:var(--text-warning)">- [${stock.name}] 통신 지연 (${attempt}회 실패). 다른 우회 서버로 재시도합니다...</span>`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        log(`<span style="color:var(--text-danger)">- [${stock.name}] 데이터 수집 최종 실패</span>`);
        console.error(error);
        updateCardError(stock.code);
      }
    }
  }
}

function parseTradePlanTargets(entry) {
  if (!entry || !entry.tradePlanRows || !entry.tradePlanRows.length) return null;

  const findRow = prefix => entry.tradePlanRows.find(r => r.stage && r.stage.includes(prefix));
  const extractPrice = row => {
    if (!row) return null;
    const priceStr = row.targetPrice || row.condition || '';
    const num = extractFirstNumber(priceStr);
    return num;
  };
  const extractRate = row => {
    if (!row) return null;
    const text = row.targetYield || row.condition || '';
    const match = text.match(/[+-]?\d+(?:\.\d+)?%/);
    return match ? parseFloat(match[0]) : null;
  };

  const premarket = findRow('프리마켓') || findRow('🌅');
  const openPhase = findRow('장초반') || findRow('🔔');
  const intraday1 = findRow('장중 1차') || findRow('📈');
  const intraday2 = findRow('장중 2차');
  const swing = findRow('스윙') || findRow('📊');
  const stopLoss = findRow('손절') || findRow('🛑');

  return {
    entryPrice: entry.entryPriceValue,
    premarket: { row: premarket, price: extractPrice(premarket), rate: extractRate(premarket) },
    openPhase: { row: openPhase, price: extractPrice(openPhase), rate: extractRate(openPhase) },
    intraday1: { row: intraday1, price: extractPrice(intraday1), rate: extractRate(intraday1) },
    intraday2: { row: intraday2, price: extractPrice(intraday2), rate: extractRate(intraday2) },
    swing: { row: swing, price: extractPrice(swing), rate: extractRate(swing) },
    stopLoss: { row: stopLoss, price: extractPrice(stopLoss), rate: extractRate(stopLoss) }
  };
}

function checkRejectionConditions(stock, data, isBefore0908, targets, gapProfile) {
  const rejections = [];
  const entryPrice = targets?.entryPrice || data.prevClose;

  if (gapProfile?.immediatePartialExit && isBefore0908 && data.currentPrice > 0) {
    rejections.push({
      code: 'G1',
      title: `${gapProfile.code} 프리마켓 보수 운용`,
      criterion: `갭 등급 ${gapProfile.label}에서는 프리마켓 첫 가격 확인 시 50% 비중 축소를 우선 적용합니다.`,
      triggered: true,
      result: `현재가 ${data.currentPrice.toLocaleString()}원 기준으로 50% 선정리 권고`,
      value: `매도 조정: ${gapProfile.premarketText}`
    });
  }

  if (data.openPrice > 0 && entryPrice > 0) {
    const gapRate = ((data.openPrice - entryPrice) / entryPrice) * 100;
    const isGapDown = gapRate <= -3;
    rejections.push({
      code: 'R1',
      title: '개파락 (-3% 이상 갭다운)',
      criterion: '익일 시가가 진입가 대비 -3% 이상 낮게 시작하면 즉각 손절합니다.\n기준: (시가 - 진입가) / 진입가 ≤ -3%',
      triggered: isGapDown,
      result: isGapDown
        ? `갭다운 ${gapRate.toFixed(2)}% 발생 → 즉시 전량 매도`
        : `갭 ${gapRate.toFixed(2)}% — 정상 범위`,
      value: `(${data.openPrice.toLocaleString()} - ${entryPrice.toLocaleString()}) / ${entryPrice.toLocaleString()} = ${gapRate.toFixed(2)}%`
    });
  }

  const tightenedDefaultStopPrice = entryPrice > 0
    ? Math.round(entryPrice * (1 - ((4 - (gapProfile?.tightenStopLossRate || 0)) / 100)))
    : 0;

  if (targets?.stopLoss?.price && data.currentPrice > 0) {
    const effectiveStopPrice = Math.max(targets.stopLoss.price, tightenedDefaultStopPrice || 0);
    const belowStopLoss = data.currentPrice <= effectiveStopPrice;
    rejections.push({
      code: 'R2',
      title: '손절가 이탈',
      criterion: gapProfile?.tightenStopLossRate
        ? `노션 손절가와 갭 보수 손절가 중 더 보수적인 기준을 사용합니다.\n기준: MAX(노션 손절가 ${targets.stopLoss.price.toLocaleString()}원, 갭 조정 손절가 ${effectiveStopPrice.toLocaleString()}원)`
        : `노션 매매전략의 손절가(${targets.stopLoss.price.toLocaleString()}원)를 하향 이탈하면 전량 매도합니다.`,
      triggered: belowStopLoss,
      result: belowStopLoss
        ? `현재가 ${data.currentPrice.toLocaleString()} ≤ 유효 손절가 ${effectiveStopPrice.toLocaleString()} → 즉시 전량 매도`
        : `현재가 ${data.currentPrice.toLocaleString()} > 유효 손절가 ${effectiveStopPrice.toLocaleString()} — 안전`,
      value: `현재가 ${data.currentPrice.toLocaleString()} / 유효 손절가 ${effectiveStopPrice.toLocaleString()}${gapProfile?.tightenStopLossRate ? ` (갭 ${gapProfile.code}로 ${gapProfile.tightenStopLossRate}%p 축소)` : ''}`
    });
  } else if (entryPrice > 0 && data.currentPrice > 0) {
    const lossRate = ((data.currentPrice - entryPrice) / entryPrice) * 100;
    const defaultStopLossRate = -4 + (gapProfile?.tightenStopLossRate || 0);
    const belowDefault = lossRate <= defaultStopLossRate;
    rejections.push({
      code: 'R2',
      title: `기본 손절선 (${defaultStopLossRate.toFixed(1)}%) 이탈`,
      criterion: gapProfile?.tightenStopLossRate
        ? `노션 손절가 미설정 시 갭 등급에 맞춰 손절폭을 축소합니다.\n기준: (현재가 - 진입가) / 진입가 ≤ ${defaultStopLossRate.toFixed(1)}%`
        : '노션 손절가 미설정 시, 진입가 대비 -4% 이탈하면 전량 매도합니다.\n기준: (현재가 - 진입가) / 진입가 ≤ -4%',
      triggered: belowDefault,
      result: belowDefault
        ? `진입가 대비 ${lossRate.toFixed(2)}% → 즉시 전량 매도`
        : `진입가 대비 ${lossRate.toFixed(2)}% — 손절선 이내`,
      value: `(${data.currentPrice.toLocaleString()} - ${entryPrice.toLocaleString()}) / ${entryPrice.toLocaleString()} = ${lossRate.toFixed(2)}%${gapProfile?.tightenStopLossRate ? ` / 갭 ${gapProfile.code} 기준 ${defaultStopLossRate.toFixed(1)}%` : ''}`
    });
  }

  if (stock.type === 'momentum' && isBefore0908 && data.currentPrice > 0 && data.openPrice > 0) {
    const openRecovery = data.currentPrice >= data.openPrice;
    rejections.push({
      code: 'R3',
      title: '수급매집형 시초가 미회복 (9:08 이전)',
      criterion: '수급 매집형은 9:08 이전 시초가 하락 전환 시 50% 정리를 권장합니다.\n기준: 현재가 < 시가',
      triggered: !openRecovery,
      result: !openRecovery
        ? `시초가 미회복 (현재가 ${data.currentPrice.toLocaleString()} < 시가 ${data.openPrice.toLocaleString()}) → 50% 추가 정리`
        : `시초가 위 유지 (현재가 ${data.currentPrice.toLocaleString()} ≥ 시가 ${data.openPrice.toLocaleString()})`,
      value: `현재가 ${data.currentPrice.toLocaleString()} / 시가 ${data.openPrice.toLocaleString()}`
    });
  }

  if (data.ma5 > 0 && data.currentPrice > 0) {
    const dropFromMA5 = ((data.currentPrice - data.ma5) / data.ma5) * 100;
    const isBelowMA5 = dropFromMA5 <= -2;
    rejections.push({
      code: 'R4',
      title: '5일선 -2% 하탈',
      criterion: '5일 이동평균선 대비 -2% 이상 하탈 시 손절을 권장합니다.\n기준: (현재가 - 5일MA) / 5일MA ≤ -2%',
      triggered: isBelowMA5,
      result: isBelowMA5
        ? `5일선(${data.ma5.toLocaleString()}) 대비 ${dropFromMA5.toFixed(2)}% 하탈 → 손절`
        : `5일선(${data.ma5.toLocaleString()}) 대비 ${dropFromMA5.toFixed(2)}% — 유지`,
      value: `(${data.currentPrice.toLocaleString()} - ${data.ma5.toLocaleString()}) / ${data.ma5.toLocaleString()} = ${dropFromMA5.toFixed(2)}%`
    });
  }

  return rejections;
}

function evaluateTradeStage(data, targets, prevClose, gapProfile) {
  const basePrice = targets?.entryPrice || prevClose;
  if (!basePrice || !data.currentPrice) return { stage: 'unknown', label: '판단 불가', detail: '가격 데이터 부족' };

  const gainRate = ((data.currentPrice - basePrice) / basePrice) * 100;
  const hasTargets = targets && (targets.swing?.price || targets.intraday1?.price || targets.premarket?.price || targets.openPhase?.price);
  const adjustedPremarketPrice = adjustPriceByRatePoint(basePrice, targets?.premarket?.price, gapProfile?.premarketRateOffset || 0);

  if (hasTargets) {
    if (targets.swing?.price && data.currentPrice >= targets.swing.price) {
      return { stage: 'swing', label: '📊 스윙 전환 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 스윙 기준 ${targets.swing.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }

    if (targets.intraday2?.price && data.currentPrice >= targets.intraday2.price) {
      return { stage: 'intraday2', label: '📈 장중 2차 익절 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 2차 목표 ${targets.intraday2.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }

    if (targets.intraday1?.price && data.currentPrice >= targets.intraday1.price) {
      return { stage: 'intraday1', label: '📈 장중 1차 익절 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 1차 목표 ${targets.intraday1.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }

    if (targets.openPhase?.price && data.currentPrice >= targets.openPhase.price) {
      return { stage: 'openPhase', label: '🔔 장초반 익절 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 장초반 목표 ${targets.openPhase.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }

    if (adjustedPremarketPrice && data.currentPrice >= adjustedPremarketPrice) {
      return {
        stage: 'premarket',
        label: '🌅 프리마켓 익절 구간',
        detail: gapProfile?.premarketRateOffset
          ? `현재가 ${data.currentPrice.toLocaleString()} ≥ 조정 프리마켓 목표 ${adjustedPremarketPrice.toLocaleString()} (기본 ${targets.premarket.price.toLocaleString()}원, 갭 ${gapProfile.code}로 -${gapProfile.premarketRateOffset}%p)`
          : `현재가 ${data.currentPrice.toLocaleString()} ≥ 프리마켓 목표 ${targets.premarket.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`,
        gainRate
      };
    }
  }

  if (gainRate >= 4) {
    return { stage: 'hold', label: '✅ 강한 수익 구간', detail: `진입가 대비 +${gainRate.toFixed(1)}% — 홀딩 유지 (익절 목표 미설정)`, gainRate };
  }

  if (gainRate >= 0) {
    return { stage: 'hold', label: '✅ 홀딩 유지', detail: `진입가 대비 +${gainRate.toFixed(1)}% — 보유 유지`, gainRate };
  }

  return { stage: 'underwater', label: '⚠️ 평가손 구간', detail: `진입가 대비 ${gainRate.toFixed(1)}% — 손절선 확인 필요`, gainRate };
}

function buildSwingLossManagement(data, entryPrice, gainRate, volRatio, gapProfile) {
  const scores = [];

  // S1: 종가 vs 20MA
  const s1Pass = data.ma20 > 0 && data.currentPrice >= data.ma20;
  scores.push({
    code: 'S1', title: '종가 vs 20MA',
    criterion: '현재가가 20MA 위에 있으면 중기 추세 유지',
    pass: s1Pass,
    result: data.ma20 > 0
      ? (s1Pass ? `현재가 ${data.currentPrice.toLocaleString()} ≥ 20MA ${data.ma20.toLocaleString()} — 추세 유지` : `현재가 ${data.currentPrice.toLocaleString()} < 20MA ${data.ma20.toLocaleString()} — 추세 이탈`)
      : '20MA 미산출'
  });

  // S2: 5MA 방향
  const s2Pass = data.ma5Direction === 'up' || data.ma5Direction === 'flat';
  scores.push({
    code: 'S2', title: '5MA 방향',
    criterion: '5MA 우상향 또는 횡보 시 단기 모멘텀 유지',
    pass: s2Pass,
    result: data.ma5Direction === 'up' ? '5MA 우상향 — 모멘텀 유지'
      : data.ma5Direction === 'flat' ? '5MA 횡보 — 중립'
      : data.ma5Direction === 'down' ? '5MA 하락 — 모멘텀 약화'
      : '5MA 방향 미산출'
  });

  // S3: 거래량 vs 5일 평균
  const s3Pass = volRatio !== null && volRatio >= 70;
  scores.push({
    code: 'S3', title: '거래량 유지',
    criterion: '당일 거래량 ≥ 5일 평균의 70% — 시장 관심 유지',
    pass: s3Pass,
    result: volRatio !== null
      ? (s3Pass ? `거래량 ${volRatio.toFixed(0)}% (≥70%) — 관심 유지` : `거래량 ${volRatio.toFixed(0)}% (<70%) — 관심 이탈 위험`)
      : '거래량 데이터 미산출'
  });

  // S4: 외인+기관 수급
  const bothSelling = data.foreignNet < 0 && data.institutionNet < 0;
  const s4Pass = !bothSelling;
  scores.push({
    code: 'S4', title: '수급 (외인+기관)',
    criterion: '외인+기관 동시 순매도가 아니면 수급 지지',
    pass: s4Pass,
    result: s4Pass
      ? `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 — 수급 유지`
      : `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 — 동시 순매도`
  });

  // S5: 체결강도 (네이버에서 가져올 수 없으면 중립 처리)
  const s5Pass = data.strength === null ? true : data.strength >= 90;
  scores.push({
    code: 'S5', title: '체결강도',
    criterion: '체결강도 ≥ 90% — 매수세 건재',
    pass: s5Pass,
    result: data.strength !== null
      ? (s5Pass ? `체결강도 ${data.strength.toFixed(1)}% (≥90%) — 매수세 건재` : `체결강도 ${data.strength.toFixed(1)}% (<90%) — 매수세 약화`)
      : '체결강도 미수집 (토스 확인 필요) — 중립 처리'
  });

  // S6: 지지선 잔존 (5일 저점 대비 버퍼)
  const hasLowSupport = data.low5d > 0 && data.currentPrice >= data.low5d;
  const s6Pass = hasLowSupport;
  scores.push({
    code: 'S6', title: '지지선 잔존',
    criterion: '현재가 ≥ 최근 5일 저점 — 하방 지지 확인',
    pass: s6Pass,
    result: data.low5d > 0
      ? (s6Pass ? `현재가 ${data.currentPrice.toLocaleString()} ≥ 5일 저점 ${data.low5d.toLocaleString()} — 지지 건재` : `현재가 ${data.currentPrice.toLocaleString()} < 5일 저점 ${data.low5d.toLocaleString()} — 신저점 이탈`)
      : '일별 저가 데이터 미산출'
  });

  const swingGapPass = gapProfile?.swingMode === 'allow';
  scores.push({
    code: 'S7', title: '갭 환경',
    criterion: '익일 갭 등급이 스윙 보유를 허용하는 환경인지 확인',
    pass: swingGapPass,
    result: gapProfile?.code
      ? (gapProfile.swingMode === 'allow'
        ? `갭 ${gapProfile.code} — 스윙 유지 허용`
        : gapProfile.swingMode === 'conditional'
          ? `갭 ${gapProfile.code} — 스윙 조건부 허용, 점수 1점 보수 반영`
          : `갭 ${gapProfile.code} — 스윙 전환 금지`)
      : '갭 등급 미확인 — 기본 기준 적용'
  });

  if (gapProfile?.comparison?.available && gapProfile.comparison.bias !== 0) {
    const improved = gapProfile.comparison.bias > 0;
    scores.push({
      code: 'S8',
      title: '갭 변화 비교',
      criterion: '노션 기준 대비 실시간 갭 환경이 개선되면 보유 점수 가산, 악화되면 감점',
      pass: improved,
      result: improved
        ? `실시간 개선 신호 — ${gapProfile.comparison.summary}`
        : `실시간 악화 신호 — ${gapProfile.comparison.summary}`
    });
  }

  const totalScore = scores.filter(s => s.pass).length;
  const maxScore = scores.length;
  const holdThreshold = Math.max(maxScore - 1, 1);
  const cautionThreshold = Math.max(maxScore - 3, 1);

  // 손실 구간 분류
  let lossLevel, verdict;
  if (gainRate <= -5) {
    lossLevel = 'danger';
    verdict = '⛔ 즉시 청산 (위험 손실 -5% 초과)';
  } else if (gainRate <= -3) {
    lossLevel = 'warning';
    if (totalScore >= holdThreshold) verdict = '🟡 관찰 보유 (익일 종가 미회복 시 청산)';
    else verdict = '🔴 전량 손절 권고';
  } else if (gainRate < 0) {
    lossLevel = 'mild';
    if (totalScore >= holdThreshold) verdict = '🟢 홀드 — 지지 건재';
    else if (totalScore >= cautionThreshold) verdict = '🟡 비중 축소 50% 권고';
    else verdict = '🔴 전량 손절 권고';
  } else {
    lossLevel = 'profit';
    verdict = '🟢 수익 구간 — 트레일링 운용';
  }

  // 동적 가격 산출
  const stopFromMa20 = data.ma20 > 0 ? data.ma20 : 0;
  const stopBaseRate = 5 - (gapProfile?.tightenStopLossRate || 0);
  const stopFrom5pct = Math.round(entryPrice * (1 - (stopBaseRate / 100)));
  const stopFromLow5d = data.low5d > 0 ? data.low5d : 0;
  const maxStopPrice = Math.max(stopFromMa20, stopFrom5pct, stopFromLow5d);
  const maxStopRate = entryPrice > 0 ? ((maxStopPrice - entryPrice) / entryPrice) * 100 : 0;

  const stopFrom2pct = Math.round(data.currentPrice * 0.98);
  const stopFromMa5 = data.ma5 > 0 ? data.ma5 : 0;
  const recommendedStopPrice = Math.max(stopFrom2pct, stopFromMa5);

  const recoveryTarget = Math.round(entryPrice * 1.01);
  const reboundTarget = data.high20d > 0 ? Math.round(data.high20d * 0.8) : Math.round(entryPrice * 1.03);

  return {
    scores,
    totalScore,
    maxScore,
    holdThreshold,
    cautionThreshold,
    lossLevel,
    verdict,
    maxStopPrice,
    maxStopRate,
    recommendedStopPrice,
    recoveryTarget,
    reboundTarget,
    stopBaseRate
  };
}

function buildIndicators(stock, data, isBefore0908) {
  const indicators = [];
  let decision = 'hold';
  let actionStage = null;
  let triggeredRule = null;

  const entry = getEntryByCode(stock.code);
  const targets = parseTradePlanTargets(entry);
  const entryPrice = stock.entryPrice || targets?.entryPrice || data.prevClose;
  const gainRate = entryPrice > 0 ? ((data.currentPrice - entryPrice) / entryPrice) * 100 : 0;
  const gapProfile = getGapSellAdjustmentProfile();

  if (gapProfile.code) {
    indicators.push({
      title: '갭 등급 조정',
      criterion: `현재 보고서의 갭 등급 ${gapProfile.label}에 따라 익일 프리마켓 익절, 손절폭, 스윙 전환 기준을 조정합니다.`,
      status: gapProfile.severity,
      result: `프리마켓: ${gapProfile.premarketText} | 손절: ${gapProfile.stopLossText} | 스윙: ${gapProfile.swingText}`,
      value: gapProfile.summary
    });

    if (gapProfile.comparison.available) {
      indicators.push({
        title: '갭 변화 보정',
        criterion: '실시간 갭 스코어가 노션 스냅샷보다 개선되면 매도 보수성을 일부 완화하고, 악화되면 추가 강화합니다.',
        status: gapProfile.comparison.bias > 0 ? 'clear' : gapProfile.comparison.bias < 0 ? 'triggered' : 'unknown',
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
        : '20MA 미산출 (데이터 부족)'
    });

    const volRatio = data.volMa5 > 0 && data.todayVolume > 0 ? (data.todayVolume / data.volMa5) * 100 : null;
    const r2Triggered = volRatio !== null && volRatio < 50;
    rejections.push({
      code: 'R2', title: '거래량 급감 (관심 이탈)',
      criterion: '당일 거래량 < 5일 평균의 50% → 즉시 손절',
      triggered: r2Triggered,
      result: volRatio !== null
        ? (r2Triggered ? `거래량 ${volRatio.toFixed(0)}% (5일 평균 대비) → 관심 이탈` : `거래량 ${volRatio.toFixed(0)}% (5일 평균 대비) — 정상`)
        : '거래량 데이터 미산출'
    });

    const r3Triggered = data.foreignNet < 0 && data.institutionNet < 0;
    const r3Checkable = data.foreignNet !== 0 || data.institutionNet !== 0;
    rejections.push({
      code: 'R3', title: '외국인+기관 동시 순매도',
      criterion: '외국인과 기관이 동시 순매도 시 → 즉시 손절',
      triggered: r3Triggered,
      result: r3Checkable
        ? (r3Triggered ? `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 → 동시 순매도` : `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 — 정상`)
        : '수급 데이터 미확인'
    });

    const stopRate = -5;
    const r4Triggered = gainRate < stopRate;
    rejections.push({
      code: 'R4', title: `진입가 대비 ${stopRate}% 이탈`,
      criterion: `종가 < 진입가 ${stopRate}% → 즉시 손절 (위험 손실 구간)`,
      triggered: r4Triggered,
      result: r4Triggered
        ? `진입가 대비 ${gainRate.toFixed(2)}% → 위험 손실, 즉시 청산`
        : `진입가 대비 ${gainRate >= 0 ? '+' : ''}${gainRate.toFixed(2)}% — 유지`
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
      return { indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, gapProfile };
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
      triggeredRule = { code: '60MA', title: '60MA 이탈 강제 청산', triggered: true };
      const lossManagement = buildSwingLossManagement(data, entryPrice, gainRate, volRatio, gapProfile);
      return { indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, gapProfile };
    }
    if (data.ma60 > 0) {
      indicators.push({
        title: '60MA 추세',
        criterion: '60MA 이탈 시 무조건 청산',
        status: 'clear',
        result: `현재가 ${data.currentPrice.toLocaleString()} > 60MA ${data.ma60.toLocaleString()} — 장기 추세 유지`
      });
    }

    // 손실 관리 판정 (손실 구간일 때 적용)
    const lossManagement = buildSwingLossManagement(data, entryPrice, gainRate, volRatio, gapProfile);

    if (gainRate < 0) {
      lossManagement.scores.forEach(s => {
        indicators.push({
          title: `[${s.code}] ${s.title}`,
          criterion: s.criterion,
          status: s.pass ? 'clear' : 'triggered',
          result: s.result
        });
      });

      indicators.push({
        title: '손실 관리 종합 판정',
        criterion: `${lossManagement.maxScore}점 만점 기준: ${lossManagement.holdThreshold}~${lossManagement.maxScore} 홀드 / ${lossManagement.cautionThreshold}~${lossManagement.holdThreshold - 1} 비중 축소 / 0~${lossManagement.cautionThreshold - 1} 전량 손절`,
        status: lossManagement.totalScore >= lossManagement.holdThreshold ? 'clear' : lossManagement.totalScore >= lossManagement.cautionThreshold ? 'unknown' : 'triggered',
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
      // 수익 구간: 기존 트레일링 로직
      const below5ma = data.ma5 > 0 && data.currentPrice < data.ma5;
      if (below5ma) {
        indicators.push({
          title: '5MA 이탈 (2차 트레일링)',
          criterion: '5MA 이탈 시 40% 추가 정리 구간',
          status: 'triggered',
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

    // 추세 요약
    const below5maFinal = data.ma5 > 0 && data.currentPrice < data.ma5;
    if (data.ma5 > 0 && data.ma20 > 0 && !below5maFinal) {
      const trendOk = data.currentPrice > data.ma5 && data.currentPrice > data.ma20;
      indicators.push({
        title: '이평선 배치',
        criterion: '현재가 > 5MA > 20MA 정배열 유지 시 스윙 지속 근거',
        status: trendOk ? 'clear' : 'unknown',
        result: trendOk
          ? `정배열 유지 (현재가 ${data.currentPrice.toLocaleString()} > 5MA ${data.ma5.toLocaleString()} > 20MA ${data.ma20.toLocaleString()})`
          : `현재가 ${data.currentPrice.toLocaleString()} | 5MA ${data.ma5.toLocaleString()} | 20MA ${data.ma20.toLocaleString()}`
      });
    }

    // 동적 가격 라인 (손절가/목표가)
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
        status: 'triggered',
        result: '스윙 유지 대신 비중 축소 또는 당일 정리 우선',
        value: `스윙 전환: ${gapProfile.swingText}`
      });
      decision = 'caution';
      actionStage = 'partial_exit';
    } else if (gapProfile.swingMode === 'conditional' && decision === 'hold') {
      indicators.push({
        title: '갭 환경상 조건부 스윙',
        criterion: `갭 등급 ${gapProfile.label}에서는 스윙 보유를 조건부로만 허용합니다.`,
        status: 'unknown',
        result: '일부 익절 후 잔여 물량만 재검토',
        value: `스윙 전환: ${gapProfile.swingText}`
      });
      decision = 'caution';
      actionStage = 'partial_exit';
    }

    return { indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, gapProfile };
  }

  if (stock.type === 'pullback' && isBefore0908) {
    indicators.push({
      title: '분석 단계',
      criterion: '눌림목 베팅은 9시 8분 이후에 매도/손절 분석이 시작됩니다.\n현재는 대기 상태입니다.',
      status: 'unknown',
      result: '1차: 눌림목 베팅 분석 대기 중 (9:08 이후 시작)'
    });
    return { indicators, decision: 'hold', actionStage: 'wait', triggeredRule: null, targets, gainRate, gapProfile };
  }

  const stageLabel = isBefore0908 ? '1차 분석 (9:08 이전)' : '2차 분석 (9:08 이후)';
  const stageDesc = stock.type === 'momentum' && isBefore0908
    ? '수급 매집형: 시초가 하락 전환 시 50% 추가 정리 + 손절 점검'
    : '매도 단계 판정 + 손절 조건(R1~R4) 검증';
  indicators.push({
    title: '분석 단계',
    criterion: stageDesc,
    status: 'unknown',
    result: `${stageLabel} 진행 중`
  });

  const rejections = checkRejectionConditions(stock, data, isBefore0908, targets, gapProfile);
  const triggeredRejections = rejections.filter(r => r.triggered);

  rejections.forEach(r => {
    indicators.push({
      title: `[${r.code}] ${r.title}`,
      criterion: r.criterion,
      status: r.triggered ? 'triggered' : 'clear',
      result: r.result,
      value: r.value
    });
  });

  if (triggeredRejections.length > 0) {
    decision = 'sell';
    actionStage = 'reject';
    triggeredRule = triggeredRejections[0];

    if (triggeredRejections[0].code === 'R3') {
      decision = 'caution';
      actionStage = 'partial_exit';
    }

    if (triggeredRejections[0].code === 'G1') {
      decision = 'caution';
      actionStage = 'partial_exit';
    }

    return { indicators, decision, actionStage, triggeredRule: triggeredRejections[0], targets, gainRate, gapProfile };
  }

  const stageResult = evaluateTradeStage(data, targets, data.prevClose, gapProfile);
  indicators.push({
    title: '매도 단계 판정',
    criterion: `진입가(${entryPrice ? entryPrice.toLocaleString() + '원' : '미설정'}) 대비 현재 위치를 매매전략 구간에 매칭합니다.`,
    status: stageResult.stage === 'underwater' ? 'triggered' : (stageResult.stage === 'hold' ? 'unknown' : 'clear'),
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

  if (stageResult.stage === 'swing' && gapProfile.swingMode === 'ban') {
    indicators.push({
      title: '스윙 전환 제한',
      criterion: `갭 등급 ${gapProfile.label}에서는 스윙 전환을 허용하지 않고 익절 우선으로 전환합니다.`,
      status: 'triggered',
      result: '스윙 전환 대신 비중 축소 또는 당일 정리 우선',
      value: `스윙 전환: ${gapProfile.swingText}`
    });
    decision = 'caution';
    actionStage = 'partial_exit';
  } else if (stageResult.stage === 'swing' && gapProfile.swingMode === 'conditional') {
    indicators.push({
      title: '스윙 전환 조건부 허용',
      criterion: `갭 등급 ${gapProfile.label}에서는 스윙 전환 전 일부 익절과 장중 재확인을 우선합니다.`,
      status: 'unknown',
      result: '잔여 물량만 조건부 스윙 검토',
      value: `스윙 전환: ${gapProfile.swingText}`
    });
    decision = 'caution';
    actionStage = 'partial_exit';
  }

  if (data.strength !== null && data.strength !== undefined) {
    const threshold = stock.type === 'momentum' ? 100 : 80;
    const weakStr = data.strength < threshold;
    indicators.push({
      title: '체결강도 점검',
      criterion: `체결강도가 ${threshold}% 미만이면 매도세 우위로 전환 의심.\n기준: 체결강도 < ${threshold}%`,
      status: weakStr ? 'triggered' : 'clear',
      result: weakStr
        ? `체결강도 ${data.strength.toFixed(1)}% — 매도세 전환 의심`
        : `체결강도 ${data.strength.toFixed(1)}% — 매수세 유지`,
      value: `체결강도 ${data.strength.toFixed(1)}% (기준: ${threshold}%)`
    });
    if (weakStr && decision !== 'sell') decision = 'caution';
  } else if (stock.type !== 'swing') {
    indicators.push({
      title: '체결강도 상태',
      criterion: '현재 네이버 경로에서는 체결강도 값이 제공되지 않아 매도 판단에서 제외합니다.',
      status: 'unknown',
      result: '체결강도 미연동 — 다른 가격/이평/수급 기준만으로 판정',
      value: '실시간 체결강도 연동 전까지 중립 처리'
    });
  }

  return { indicators, decision, actionStage, triggeredRule, targets, gainRate, gapProfile };
}
function applyRules(stock, data, isBefore0908) {
  const card = document.getElementById(`card-${stock.code}`);
  if (!card) return;
  const priceRow = document.getElementById(`price-row-${stock.code}`);
  const meta = document.getElementById(`meta-${stock.code}`);
  const planBox = document.getElementById(`plan-${stock.code}`);
  const indBox = document.getElementById(`ind-${stock.code}`);
  const badge = document.getElementById(`badge-${stock.code}`);

  const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
  const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
  const absChg = Math.abs(data.chgRate).toFixed(2);

  const entry = getEntryByCode(stock.code);
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

  const { indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, gapProfile } = buildIndicators(stock, data, isBefore0908);

  stockDetailMap[stock.code] = { mode: 'sell', stock, data, indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, isBefore0908, gapProfile };
  renderSellDetailToCard(stockDetailMap[stock.code]);
}
