function normalizeStrategyKeyForIndicators(strategy) {
  const text = String(strategy || '').trim().toLowerCase();
  if (text === 'momentum') return 'breakout';
  return text;
}

function parseNaverTotalInfos(totalInfos) {
  const map = new Map();
  if (!Array.isArray(totalInfos)) return map;
  totalInfos.forEach(item => {
    const code = String(item?.code || '').trim();
    if (!code) return;
    map.set(code, item?.value ?? '');
  });
  return map;
}

function parseNaverMetricNumber(raw) {
  if (raw === null || raw === undefined || raw === '') return null;
  const text = String(raw).replace(/,/g, '').trim();
  if (!text || text === '—' || text === '-' || text === 'N/A') return null;
  const match = text.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function parsePercentMetric(raw) {
  const value = parseNaverMetricNumber(raw);
  return Number.isFinite(value) ? value : null;
}

function buildNaverFundamentalMap(integrationJson = {}) {
  const infoMap = parseNaverTotalInfos(integrationJson.totalInfos);
  const high52 = parseNaverMetricNumber(infoMap.get('highPriceOf52Weeks'));
  const low52 = parseNaverMetricNumber(infoMap.get('lowPriceOf52Weeks'));
  return {
    per: parseNaverMetricNumber(infoMap.get('per')),
    pbr: parseNaverMetricNumber(infoMap.get('pbr')),
    eps: parseNaverMetricNumber(infoMap.get('eps')),
    cnsPer: parseNaverMetricNumber(infoMap.get('cnsPer')),
    cnsEps: parseNaverMetricNumber(infoMap.get('cnsEps')),
    foreignRate: parsePercentMetric(infoMap.get('foreignRate')),
    dividendYield: parsePercentMetric(infoMap.get('dividendYieldRatio')),
    high52,
    low52
  };
}

function normalizePriceHistoryRows(priceHistory) {
  if (!Array.isArray(priceHistory)) return [];
  return priceHistory
    .map(row => ({
      close: Number(row.closePrice ?? row.close ?? 0),
      volume: Number(row.accumulatedTradingVolume ?? row.volume ?? 0)
    }))
    .filter(row => Number.isFinite(row.close) && row.close > 0);
}

function computeSimpleMovingAverage(values, period) {
  if (!Array.isArray(values) || values.length < period || period <= 0) return null;
  const slice = values.slice(0, period);
  const sum = slice.reduce((acc, value) => acc + value, 0);
  return sum / period;
}

function computeRsi14(closes) {
  if (!Array.isArray(closes) || closes.length < 15) return null;
  const ordered = [...closes].reverse();
  let gainSum = 0;
  let lossSum = 0;
  for (let index = 1; index <= 14; index += 1) {
    const delta = ordered[index] - ordered[index - 1];
    if (delta >= 0) gainSum += delta;
    else lossSum += Math.abs(delta);
  }
  if (lossSum === 0) return 100;
  const rs = gainSum / lossSum;
  return 100 - (100 / (1 + rs));
}

function deriveTechnicalIndicators(priceHistory, currentPrice) {
  const rows = normalizePriceHistoryRows(priceHistory);
  if (!rows.length) return {};
  const closes = rows.map(row => row.close);
  const volumes = rows.map(row => row.volume);
  const price = Number.isFinite(currentPrice) && currentPrice > 0 ? currentPrice : closes[0];
  const ma20 = computeSimpleMovingAverage(closes, 20);
  const ma20GapPct = ma20 && ma20 > 0 ? ((price - ma20) / ma20) * 100 : null;
  const avgVolume20 = computeSimpleMovingAverage(volumes, 20);
  const latestVolume = volumes[0] || null;
  const volumeRatio20d = avgVolume20 && avgVolume20 > 0 && latestVolume !== null
    ? (latestVolume / avgVolume20) * 100
    : null;
  const rs20Pct = closes.length >= 21
    ? ((closes[0] - closes[20]) / closes[20]) * 100
    : null;
  return {
    rsi14: computeRsi14(closes),
    ma20GapPct,
    volumeRatio20d,
    rs20Pct
  };
}

function parseSignedQuantity(raw) {
  const text = String(raw ?? '').replace(/,/g, '').trim();
  if (!text) return null;
  const sign = text.startsWith('-') ? -1 : text.startsWith('+') ? 1 : 1;
  const value = parseNaverMetricNumber(text);
  return Number.isFinite(value) ? sign * Math.abs(value) : null;
}

function deriveSupplyDemandIndicators(dealTrendInfos) {
  if (!Array.isArray(dealTrendInfos) || !dealTrendInfos.length) {
    return { supplyTrendScore: null };
  }
  const recent = dealTrendInfos.slice(0, 3);
  let score = 0;
  recent.forEach(row => {
    const foreign = parseSignedQuantity(row.foreignerPureBuyQuant);
    const organ = parseSignedQuantity(row.organPureBuyQuant);
    if (Number.isFinite(foreign) && foreign > 0) score += 1;
    if (Number.isFinite(foreign) && foreign < 0) score -= 1;
    if (Number.isFinite(organ) && organ > 0) score += 1;
    if (Number.isFinite(organ) && organ < 0) score -= 1;
  });
  return { supplyTrendScore: score };
}

function derivePricePositionMetrics(currentPrice, high52, low52) {
  if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
    return {
      vs52wHighPct: null,
      vs52wLowPct: null,
      dropFrom52wHighPct: null
    };
  }
  const vs52wHighPct = Number.isFinite(high52) && high52 > 0 ? (currentPrice / high52) * 100 : null;
  const vs52wLowPct = Number.isFinite(low52) && low52 > 0 ? ((currentPrice - low52) / low52) * 100 : null;
  const dropFrom52wHighPct = Number.isFinite(high52) && high52 > 0
    ? ((high52 - currentPrice) / high52) * 100
    : null;
  return { vs52wHighPct, vs52wLowPct, dropFrom52wHighPct };
}

function derivePullbackSupportDistance(entry, currentPrice) {
  const primary = entry?.pullbackContext?.support?.primaryLine;
  const distancePct = Number(primary?.distancePct);
  if (Number.isFinite(distancePct)) return Math.abs(distancePct);
  const supportPrice = Number(primary?.price);
  if (Number.isFinite(supportPrice) && supportPrice > 0 && Number.isFinite(currentPrice) && currentPrice > 0) {
    return Math.abs(((currentPrice - supportPrice) / supportPrice) * 100);
  }
  return null;
}

function deriveTradingValueRank(entry) {
  if (typeof extractTradingValueRank !== 'function') return null;
  const allRules = [
    ...(entry?.matchedRules || []),
    ...(entry?.unmatchedRules || []),
    ...(entry?.gates || []),
    ...(entry?.filters || [])
  ];
  return extractTradingValueRank(allRules);
}

function collectEntryRuleNotes(entry) {
  const notes = [];
  const lists = [
    entry?.matchedRules,
    entry?.unmatchedRules,
    entry?.gates,
    entry?.filters
  ];
  lists.forEach(list => {
    if (!Array.isArray(list)) return;
    list.forEach(item => {
      const note = String(item?.note || '').trim();
      if (note) notes.push(note);
    });
  });
  ['statusReason', 'statusReasonShort', 'keyPoint'].forEach(key => {
    const text = String(entry?.[key] || '').trim();
    if (text) notes.push(text);
  });
  return notes;
}

function parseFirstMetricFromNotes(notes, patterns) {
  if (!Array.isArray(notes) || !patterns.length) return null;
  for (const note of notes) {
    for (const pattern of patterns) {
      const match = String(note).match(pattern);
      if (!match) continue;
      const value = Number(match[1]);
      if (Number.isFinite(value)) return value;
    }
  }
  return null;
}

function deriveMa20GapFromEntry(entry, currentPrice) {
  const notes = collectEntryRuleNotes(entry);
  const fromNote = parseFirstMetricFromNotes(notes, [
    /이격\s*20MA\s*([+-]?[\d.]+)%/i,
    /20MA\s*([+-]?[\d.]+)%/i
  ]);
  if (Number.isFinite(fromNote)) return fromNote;

  const ma20Price = Number(
    entry?.pullbackStopPolicy?.ma20Price
    ?? entry?.accumulationStopPolicy?.ma20Price
    ?? entry?.breakoutStopPolicy?.ma20Price
    ?? entry?.reversalStopPolicy?.ma20Price
  );
  if (Number.isFinite(ma20Price) && ma20Price > 0 && Number.isFinite(currentPrice) && currentPrice > 0) {
    return ((currentPrice - ma20Price) / ma20Price) * 100;
  }
  return null;
}

function deriveIndicatorsFromEntryContext(entry) {
  if (!entry || typeof entry !== 'object') return {};
  const currentPrice = Number.isFinite(entry.currentPrice) && entry.currentPrice > 0
    ? entry.currentPrice
    : (Number.isFinite(entry.entryPrice) && entry.entryPrice > 0 ? entry.entryPrice : null);
  const notes = collectEntryRuleNotes(entry);
  const priceHistory = Array.isArray(entry?.liveRefresh?.priceHistory) ? entry.liveRefresh.priceHistory : [];
  const technical = deriveTechnicalIndicators(priceHistory, currentPrice);

  const vs52wHighPct = parseFirstMetricFromNotes(notes, [/52주\s*고가\s*대비\s*([\d.]+)%/i]);
  const volumeRatio20d = parseFirstMetricFromNotes(notes, [
    /거래량\s*\/\s*20일\s*평균\s*([\d.]+)%/i,
    /거래량\s*\/\s*5일\s*평균\s*([\d.]+)%/i
  ]);
  const rsiFromNotes = parseFirstMetricFromNotes(notes, [/주봉\s*RSI\s*([\d.]+)/i, /\bRSI\s*([\d.]+)/i]);
  const foreignRate = parseFirstMetricFromNotes(notes, [/외국인\s*보유(?:비율)?\s*([\d.]+)%/i]);

  const snapshot = {
    currentPrice,
    vs52wHighPct,
    ma20GapPct: deriveMa20GapFromEntry(entry, currentPrice),
    rsi14: Number.isFinite(rsiFromNotes) ? rsiFromNotes : technical.rsi14 ?? null,
    volumeRatio20d: Number.isFinite(volumeRatio20d) ? volumeRatio20d : technical.volumeRatio20d ?? null,
    rs20Pct: technical.rs20Pct ?? null,
    supportDistancePct: derivePullbackSupportDistance(entry, currentPrice),
    tradingValueRank: deriveTradingValueRank(entry),
    marketCapRank: Number.isFinite(entry.marketCapRank) ? entry.marketCapRank : null,
    marketCapTrillion: Number.isFinite(entry.marketCapTrillion) ? entry.marketCapTrillion : null,
    foreignRate,
    dropFrom52wHighPct: parseFirstMetricFromNotes(notes, [/52주\s*고점\s*대비\s*하락\s*([\d.]+)%/i]),
    vs52wLowPct: parseFirstMetricFromNotes(notes, [/52주\s*저가\s*대비\s*([\d.]+)%/i])
  };

  if (Number.isFinite(vs52wHighPct) && Number.isFinite(currentPrice) && currentPrice > 0) {
    const impliedHigh = currentPrice / (vs52wHighPct / 100);
    if (Number.isFinite(impliedHigh) && impliedHigh > 0) {
      snapshot.dropFrom52wHighPct = ((impliedHigh - currentPrice) / impliedHigh) * 100;
    }
  }

  return Object.fromEntries(
    Object.entries(snapshot).filter(([, value]) => Number.isFinite(value))
  );
}

function mergeIndicatorSnapshots(base = {}, overlay = {}) {
  const merged = { ...base };
  Object.entries(overlay).forEach(([key, value]) => {
    if (Number.isFinite(value)) merged[key] = value;
  });
  return merged;
}

function buildStrategyIndicatorSnapshot(entry, integrationJson = {}, basicJson = {}, priceHistory = []) {
  const currentPrice = Number.isFinite(entry?.currentPrice) && entry.currentPrice > 0
    ? entry.currentPrice
    : (typeof extractFirstNumber === 'function'
      ? extractFirstNumber(basicJson.closePrice ?? basicJson.stockPrice)
      : null);
  const resolvedPriceHistory = priceHistory.length
    ? priceHistory
    : (Array.isArray(entry?.liveRefresh?.priceHistory) ? entry.liveRefresh.priceHistory : []);
  const fundamentals = buildNaverFundamentalMap(integrationJson);
  const technical = deriveTechnicalIndicators(resolvedPriceHistory, currentPrice);
  const supply = deriveSupplyDemandIndicators(
    integrationJson.dealTrendInfos || entry?.liveRefresh?.dealTrendInfos || []
  );
  const position = derivePricePositionMetrics(currentPrice, fundamentals.high52, fundamentals.low52);
  const fromEntry = deriveIndicatorsFromEntryContext(entry);
  const fromApi = {
    ...fundamentals,
    ...technical,
    ...supply,
    ...position,
    currentPrice,
    supportDistancePct: derivePullbackSupportDistance(entry, currentPrice),
    tradingValueRank: deriveTradingValueRank(entry),
    marketCapRank: Number.isFinite(entry?.marketCapRank) ? entry.marketCapRank : null,
    marketCapTrillion: Number.isFinite(entry?.marketCapTrillion) ? entry.marketCapTrillion : null
  };

  return mergeIndicatorSnapshots(fromEntry, fromApi);
}

function isRangeConfigured(range) {
  return Array.isArray(range) && range.length >= 2 && !(range[0] === null && range[1] === null);
}

function valueInInclusiveRange(value, range) {
  if (!isRangeConfigured(range) || !Number.isFinite(value)) return false;
  const [min, max] = range;
  const lo = min === null ? -Infinity : min;
  const hi = max === null ? Infinity : max;
  return value >= lo && value <= hi;
}

function hasConfiguredRanges(ranges = {}) {
  return ['stable', 'warn', 'abnormal'].some(key => isRangeConfigured(ranges[key]));
}

function evaluateIndicatorStability(value, indicatorDef = {}) {
  const ranges = indicatorDef.ranges || {};
  if (!Number.isFinite(value)) {
    return { tone: 'warn', verdict: '데이터 없음', hint: '수집값 없음' };
  }
  if (!hasConfiguredRanges(ranges)) {
    return { tone: 'warn', verdict: '기준 미입력', hint: indicatorDef.hint || '기준 설정 대기' };
  }

  if (valueInInclusiveRange(value, ranges.stable)) {
    return { tone: 'stable', verdict: '안정', hint: indicatorDef.stableHint || '안정 구간' };
  }
  if (valueInInclusiveRange(value, ranges.warn)) {
    return { tone: 'warn', verdict: '주의', hint: indicatorDef.warnHint || '경계 구간' };
  }
  if (valueInInclusiveRange(value, ranges.abnormal)) {
    return { tone: 'abnormal', verdict: '비이상', hint: indicatorDef.abnormalHint || '비이상 구간' };
  }

  const mode = indicatorDef.mode || 'band';
  if (mode === 'lowBetter') {
    const stableMax = ranges.stable?.[1];
    if (Number.isFinite(stableMax) && value <= stableMax) {
      return { tone: 'stable', verdict: '안정', hint: indicatorDef.stableHint || '안정 구간' };
    }
    const warnMax = ranges.warn?.[1];
    if (Number.isFinite(warnMax) && value <= warnMax) {
      return { tone: 'warn', verdict: '주의', hint: indicatorDef.warnHint || '경계 구간' };
    }
    return { tone: 'abnormal', verdict: '비이상', hint: indicatorDef.abnormalHint || '비이상 구간' };
  }
  if (mode === 'highBetter') {
    const stableMin = ranges.stable?.[0];
    if (Number.isFinite(stableMin) && value >= stableMin) {
      return { tone: 'stable', verdict: '안정', hint: indicatorDef.stableHint || '안정 구간' };
    }
    const warnMin = ranges.warn?.[0];
    if (Number.isFinite(warnMin) && value >= warnMin) {
      return { tone: 'warn', verdict: '주의', hint: indicatorDef.warnHint || '경계 구간' };
    }
    return { tone: 'abnormal', verdict: '비이상', hint: indicatorDef.abnormalHint || '비이상 구간' };
  }

  return { tone: 'warn', verdict: '주의', hint: '판정 범위 밖' };
}

function formatIndicatorValue(value, unit) {
  if (!Number.isFinite(value)) return '—';
  const suffix = String(unit || '').trim();
  if (suffix === '%') return `${value.toFixed(1)}%`;
  if (suffix === '배') return `${value.toFixed(2)}배`;
  if (suffix === '위') return `${Math.round(value)}위`;
  if (suffix === '점') return `${value >= 0 ? '+' : ''}${Math.round(value)}점`;
  return value.toFixed(1);
}

function getStrategyIndicatorRows(strategy, snapshot = {}, profiles = STRATEGY_STOCK_INDICATOR_PROFILES) {
  const key = normalizeStrategyKeyForIndicators(strategy);
  const profile = profiles?.[key];
  if (!profile || !Array.isArray(profile.indicators)) return [];

  return profile.indicators.map(def => {
    const rawValue = snapshot[def.key];
    const evaluation = evaluateIndicatorStability(rawValue, def);
    return {
      key: def.key,
      label: def.label,
      valueText: formatIndicatorValue(rawValue, def.unit),
      rawValue,
      tone: evaluation.tone,
      verdict: evaluation.verdict,
      hint: evaluation.hint
    };
  });
}

function attachStockIndicatorsToEntry(entry, integrationJson = {}, basicJson = {}, priceHistory = []) {
  if (!entry || typeof entry !== 'object') return null;
  const snapshot = buildStrategyIndicatorSnapshot(entry, integrationJson, basicJson, priceHistory);
  const strategy = normalizeStrategyKeyForIndicators(entry.strategy || entry.type);
  const hasApiData = Boolean(
    integrationJson?.totalInfos?.length
    || resolvedPriceHistoryLength(priceHistory, entry)
    || basicJson?.closePrice
    || basicJson?.stockPrice
  );
  entry.stockIndicators = {
    snapshot,
    rows: getStrategyIndicatorRows(strategy, snapshot),
    evaluatedAt: new Date().toISOString(),
    source: hasApiData ? 'naver_integration' : 'jongga_entry'
  };
  return entry.stockIndicators;
}

function resolvedPriceHistoryLength(priceHistory, entry) {
  if (Array.isArray(priceHistory) && priceHistory.length) return priceHistory.length;
  return Array.isArray(entry?.liveRefresh?.priceHistory) ? entry.liveRefresh.priceHistory.length : 0;
}

function renderStrategyStockIndicatorsSection(entry) {
  if (!entry || typeof entry !== 'object') return '';
  const strategy = normalizeStrategyKeyForIndicators(entry.strategy || entry.type);
  const profile = STRATEGY_STOCK_INDICATOR_PROFILES?.[strategy];
  if (!profile) return '';

  const rows = Array.isArray(entry.stockIndicators?.rows) && entry.stockIndicators.rows.length
    ? entry.stockIndicators.rows
    : getStrategyIndicatorRows(strategy, entry.stockIndicators?.snapshot || buildStrategyIndicatorSnapshot(entry));

  if (!rows.length) return '';

  const strategyLabel = STRATEGY_META?.[strategy]?.shortLabel || profile.label || strategy;
  const body = rows.map(row => `
    <div class="strategy-indicator-row">
      <span class="strategy-indicator-label">${escapeHtml(row.label)}</span>
      <span class="strategy-indicator-value indicator-tone-${escapeHtml(row.tone)}">${escapeHtml(row.valueText)}</span>
      <span class="strategy-indicator-verdict" title="${escapeHtml(row.hint || '')}">${escapeHtml(row.verdict)}</span>
    </div>
  `).join('');

  const source = entry.stockIndicators?.source || '';
  const updatedAt = entry.stockIndicators?.evaluatedAt
    ? `<div class="strategy-indicators-meta">기준: ${escapeHtml(strategyLabel)} · ${source === 'jongga_analysis' ? '분석' : '갱신'} ${escapeHtml(entry.stockIndicators.evaluatedAt.slice(0, 16).replace('T', ' '))}</div>`
    : '<div class="strategy-indicators-meta">분석 데이터에 지표가 포함되지 않았습니다. 파이프라인을 다시 실행하세요.</div>';

  return `
    <div class="strategy-indicators-block">
      <div class="modal-section-label">종목 지표 건전도 (${escapeHtml(strategyLabel)} 기준)</div>
      <div class="strategy-indicators-panel">
        ${body}
      </div>
      ${updatedAt}
    </div>
  `;
}
