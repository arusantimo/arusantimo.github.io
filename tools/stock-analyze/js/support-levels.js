const PULLBACK_SUPPORT_LOOKBACK_DAYS = 60;
const PULLBACK_SUPPORT_EVENT_LOOKBACK_DAYS = 20;
const PULLBACK_SUPPORT_CLUSTER_TOLERANCE = 0.015;
const PULLBACK_SUPPORT_VOLUME_BINS = 24;
const PULLBACK_SUPPORT_FAMILY_WEIGHTS = {
  horizontal: 30,
  swingCluster: 25,
  volumeShelf: 25,
  eventAnchors: 20
};
const PULLBACK_SUPPORT_CONSENSUS_BONUS = 10;
const PULLBACK_SUPPORT_STRONG_THRESHOLD = 70;
const PULLBACK_SUPPORT_WATCH_THRESHOLD = 45;
const PULLBACK_SUPPORT_FAMILY_LABELS = {
  horizontal: '수평 지지',
  swingCluster: '스윙로우 군집',
  volumeShelf: '매물대 지지',
  eventAnchors: '급증봉 저점'
};

function toSupportNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function roundSupportPrice(value) {
  return Math.round(toSupportNumber(value));
}

function getSupportDistancePct(currentPrice, price) {
  if (!(currentPrice > 0) || !(price > 0)) return null;
  return Math.round((((currentPrice - price) / currentPrice) * 100) * 100) / 100;
}

function getSupportDaysAgo(total, index) {
  return Math.max(total - index - 1, 0);
}

function supportPricesMatch(basePrice, candidatePrice, tolerance = PULLBACK_SUPPORT_CLUSTER_TOLERANCE) {
  const anchor = Math.max(Math.abs(basePrice), Math.abs(candidatePrice), 1);
  return Math.abs(basePrice - candidatePrice) / anchor <= tolerance;
}

function sortSupportBarsAscending(series = []) {
  const rows = Array.isArray(series) ? series.filter(Boolean) : [];
  if (rows.length <= 1) return rows;
  const withIndex = rows.map((row, index) => ({ row, index }));
  const parsed = withIndex.map(item => {
    const text = String(item.row?.date || item.row?.localTradedAt || '').trim();
    const normalized = text.replace(/[^\d]/g, '');
    return {
      ...item,
      key: normalized.length >= 8 ? normalized.slice(0, 8) : '',
      sortable: normalized.length >= 8 ? Number(normalized.slice(0, 8)) : NaN
    };
  });
  const sortableCount = parsed.filter(item => Number.isFinite(item.sortable)).length;
  if (sortableCount >= Math.max(2, Math.floor(rows.length / 2))) {
    parsed.sort((a, b) => a.sortable - b.sortable || a.index - b.index);
    return parsed.map(item => item.row);
  }
  return rows;
}

function normalizeSupportBars(series = [], options = {}) {
  const currentPrice = toSupportNumber(options.currentPrice || 0);
  const rows = sortSupportBarsAscending(series).slice(-PULLBACK_SUPPORT_LOOKBACK_DAYS).map((row, index) => ({
    index,
    open: toSupportNumber(row?.open),
    high: toSupportNumber(row?.high),
    low: toSupportNumber(row?.low),
    close: toSupportNumber(row?.close),
    volume: toSupportNumber(row?.volume),
    date: row?.date || row?.localTradedAt || ''
  })).filter(row => row.close > 0);
  const resolvedCurrentPrice = currentPrice > 0 ? currentPrice : (rows.at(-1)?.close || 0);
  return { bars: rows, currentPrice: resolvedCurrentPrice };
}

function clusterSupportPoints(points = [], minCount = 1) {
  if (!points.length) return [];
  const sorted = points.slice().sort((a, b) => a.price - b.price);
  const clusters = [];
  sorted.forEach(point => {
    if (!clusters.length) {
      clusters.push([point]);
      return;
    }
    const cluster = clusters.at(-1);
    const clusterPrice = cluster.reduce((sum, item) => sum + item.price, 0) / cluster.length;
    if (supportPricesMatch(clusterPrice, point.price)) cluster.push(point);
    else clusters.push([point]);
  });
  return clusters.map(cluster => {
    const barIndexes = [...new Set(cluster.map(item => Number(item.barIndex)).filter(Number.isFinite))];
    const effectiveCount = barIndexes.length || cluster.length;
    if (effectiveCount < minCount) return null;
    const avgPrice = cluster.reduce((sum, item) => sum + item.price, 0) / cluster.length;
    return {
      price: avgPrice,
      count: effectiveCount,
      lastSeenDaysAgo: Math.min(...cluster.map(item => Number.isFinite(item.daysAgo) ? item.daysAgo : 999)),
      barIndexes,
      members: cluster
    };
  }).filter(Boolean);
}

function buildSupportLine(family, cluster, currentPrice, extra = {}, valid = null) {
  const price = toSupportNumber(cluster?.price);
  const resolvedValid = valid === null ? (price > 0 && currentPrice > 0 && price <= currentPrice * (1 + PULLBACK_SUPPORT_CLUSTER_TOLERANCE)) : Boolean(valid);
  return {
    family,
    familyLabel: PULLBACK_SUPPORT_FAMILY_LABELS[family],
    label: PULLBACK_SUPPORT_FAMILY_LABELS[family],
    price: roundSupportPrice(price),
    distancePct: getSupportDistancePct(currentPrice, price),
    count: Math.round(toSupportNumber(cluster?.count)),
    lastSeenDaysAgo: Math.round(toSupportNumber(cluster?.lastSeenDaysAgo)),
    valid: resolvedValid,
    weight: PULLBACK_SUPPORT_FAMILY_WEIGHTS[family],
    ...extra
  };
}

function buildHorizontalSupportFamily(bars, currentPrice) {
  const total = bars.length;
  const points = [];
  bars.forEach((bar, index) => {
    ['low', 'close'].forEach(kind => {
      const price = toSupportNumber(bar?.[kind]);
      if (price <= 0) return;
      points.push({
        price,
        barIndex: index,
        daysAgo: getSupportDaysAgo(total, index),
        kind
      });
    });
  });
  return clusterSupportPoints(points, 2).map(cluster => buildSupportLine('horizontal', cluster, currentPrice, {
    sources: [...new Set(cluster.members.map(item => item.kind).filter(Boolean))].sort(),
    bandLow: roundSupportPrice(Math.min(...cluster.members.map(item => item.price))),
    bandHigh: roundSupportPrice(Math.max(...cluster.members.map(item => item.price)))
  }));
}

function buildSwingSupportFamily(bars, currentPrice) {
  const total = bars.length;
  const pivots = [];
  for (let index = 2; index < total - 2; index += 1) {
    const pivotLow = toSupportNumber(bars[index]?.low);
    if (pivotLow <= 0) continue;
    const around = [
      toSupportNumber(bars[index - 1]?.low),
      toSupportNumber(bars[index - 2]?.low),
      toSupportNumber(bars[index + 1]?.low),
      toSupportNumber(bars[index + 2]?.low)
    ];
    if (around.every(value => pivotLow <= value)) {
      pivots.push({
        price: pivotLow,
        barIndex: index,
        daysAgo: getSupportDaysAgo(total, index)
      });
    }
  }
  return clusterSupportPoints(pivots, 2).map(cluster => buildSupportLine('swingCluster', cluster, currentPrice, {
    pivotCount: cluster.count,
    bandLow: roundSupportPrice(Math.min(...cluster.members.map(item => item.price))),
    bandHigh: roundSupportPrice(Math.max(...cluster.members.map(item => item.price)))
  }));
}

function buildVolumeShelfFamily(bars, currentPrice) {
  if (!bars.length) return [];
  const lowPrice = Math.min(...bars.map(bar => toSupportNumber(bar?.low)).filter(value => value > 0));
  let highPrice = Math.max(...bars.map(bar => toSupportNumber(bar?.high)).filter(value => value > 0));
  if (!(lowPrice > 0) || !(highPrice > 0)) return [];
  if (highPrice === lowPrice) highPrice = lowPrice + Math.max(lowPrice * PULLBACK_SUPPORT_CLUSTER_TOLERANCE, 1);
  const binSize = (highPrice - lowPrice) / PULLBACK_SUPPORT_VOLUME_BINS;
  if (!(binSize > 0)) return [];
  const total = bars.length;
  const bins = Array.from({ length: PULLBACK_SUPPORT_VOLUME_BINS }, (_, index) => ({
    binIndex: index,
    volume: 0,
    count: 0,
    lastSeenDaysAgo: PULLBACK_SUPPORT_LOOKBACK_DAYS
  }));

  bars.forEach((bar, index) => {
    const hlc3 = (toSupportNumber(bar?.high) + toSupportNumber(bar?.low) + toSupportNumber(bar?.close)) / 3;
    if (!(hlc3 > 0)) return;
    const binIndex = Math.min(PULLBACK_SUPPORT_VOLUME_BINS - 1, Math.max(0, Math.floor((hlc3 - lowPrice) / binSize)));
    bins[binIndex].volume += toSupportNumber(bar?.volume);
    bins[binIndex].count += 1;
    bins[binIndex].lastSeenDaysAgo = Math.min(bins[binIndex].lastSeenDaysAgo, getSupportDaysAgo(total, index));
  });

  return bins
    .filter(item => item.volume > 0 && item.count > 0)
    .map(item => {
      const price = lowPrice + (item.binIndex + 0.5) * binSize;
      return buildSupportLine('volumeShelf', {
        price,
        count: item.count,
        lastSeenDaysAgo: item.lastSeenDaysAgo
      }, currentPrice, {
        volume: Math.round(item.volume),
        binIndex: item.binIndex,
        binLow: roundSupportPrice(lowPrice + item.binIndex * binSize),
        binHigh: roundSupportPrice(lowPrice + (item.binIndex + 1) * binSize)
      }, price <= currentPrice * (1 + PULLBACK_SUPPORT_CLUSTER_TOLERANCE));
    })
    .sort((a, b) => (b.volume - a.volume) || Math.abs((a.distancePct ?? 999)) - Math.abs((b.distancePct ?? 999)) || a.lastSeenDaysAgo - b.lastSeenDaysAgo)
    .slice(0, 3);
}

function getSupportEventVolumeRatio(bars, index) {
  if (index <= 0) return 0;
  const lookback = bars.slice(Math.max(0, index - 20), index)
    .map(bar => toSupportNumber(bar?.volume))
    .filter(value => value > 0);
  if (!lookback.length) return 0;
  const average = lookback.reduce((sum, value) => sum + value, 0) / lookback.length;
  if (!(average > 0)) return 0;
  return toSupportNumber(bars[index]?.volume) / average;
}

function buildEventAnchorFamily(bars, currentPrice) {
  const total = bars.length;
  const startIndex = Math.max(0, total - PULLBACK_SUPPORT_EVENT_LOOKBACK_DAYS);
  const anchors = [];
  for (let index = startIndex; index < total; index += 1) {
    const ratio = getSupportEventVolumeRatio(bars, index);
    const lowPrice = toSupportNumber(bars[index]?.low);
    if (ratio < 2 || !(lowPrice > 0)) continue;
    const broken = bars.slice(index + 1).some(bar => toSupportNumber(bar?.close) < lowPrice);
    if (broken) continue;
    anchors.push({
      price: lowPrice,
      barIndex: index,
      daysAgo: getSupportDaysAgo(total, index),
      ratioPct: Math.round(ratio * 1000) / 10
    });
  }
  return clusterSupportPoints(anchors, 1).map(cluster => buildSupportLine('eventAnchors', cluster, currentPrice, {
    burstRatioPct: Math.max(...cluster.members.map(item => toSupportNumber(item.ratioPct))),
    anchorCount: cluster.count
  }));
}

function mergeSupportLines(families, currentPrice) {
  const candidates = Object.entries(families || {}).flatMap(([family, lines]) => (
    Array.isArray(lines) ? lines.filter(line => line?.valid).map(line => ({ ...line, family })) : []
  ));
  if (!candidates.length) return { lines: [], activeFamilyCount: 0 };
  candidates.sort((a, b) => a.price - b.price);
  const groups = [];
  candidates.forEach(candidate => {
    if (!groups.length) {
      groups.push([candidate]);
      return;
    }
    const group = groups.at(-1);
    const groupPrice = group.reduce((sum, item) => sum + item.price, 0) / group.length;
    if (supportPricesMatch(groupPrice, candidate.price)) group.push(candidate);
    else groups.push([candidate]);
  });

  const activeFamilies = new Set();
  const merged = groups.map(group => {
    const familiesInGroup = [...new Set(group.map(item => item.family))].sort();
    familiesInGroup.forEach(family => activeFamilies.add(family));
    const price = roundSupportPrice(group.reduce((sum, item) => sum + item.price, 0) / group.length);
    const familyPoints = familiesInGroup.reduce((sum, family) => sum + PULLBACK_SUPPORT_FAMILY_WEIGHTS[family], 0);
    const bonus = familiesInGroup.length >= 2 ? PULLBACK_SUPPORT_CONSENSUS_BONUS : 0;
    const strengthPoints = Math.min(100, familyPoints + bonus);
    return {
      label: familiesInGroup.length >= 2 ? '복합 지지' : PULLBACK_SUPPORT_FAMILY_LABELS[familiesInGroup[0]],
      price,
      distancePct: getSupportDistancePct(currentPrice, price),
      families: familiesInGroup,
      familyLabels: familiesInGroup.map(family => PULLBACK_SUPPORT_FAMILY_LABELS[family]),
      familyCount: familiesInGroup.length,
      count: group.reduce((sum, item) => sum + Math.round(toSupportNumber(item.count)), 0),
      lastSeenDaysAgo: Math.min(...group.map(item => Math.round(toSupportNumber(item.lastSeenDaysAgo)))),
      strengthPoints,
      consensusBonus: bonus,
      valid: price <= currentPrice * (1 + PULLBACK_SUPPORT_CLUSTER_TOLERANCE)
    };
  });
  merged.sort((a, b) => (b.familyCount - a.familyCount) || (b.strengthPoints - a.strengthPoints) || Math.abs((a.distancePct ?? 999)) - Math.abs((b.distancePct ?? 999)) || a.lastSeenDaysAgo - b.lastSeenDaysAgo);
  if (merged.length) {
    merged[0].role = 'primary';
    merged.slice(1).forEach(line => { line.role = 'secondary'; });
  }
  return {
    lines: merged,
    activeFamilyCount: activeFamilies.size
  };
}

function getPullbackSupportStrengthLabel(score) {
  const value = Math.round(toSupportNumber(score));
  if (value >= PULLBACK_SUPPORT_STRONG_THRESHOLD) return 'strong';
  if (value >= PULLBACK_SUPPORT_WATCH_THRESHOLD) return 'watch';
  return 'weak';
}

function getPullbackSupportWarningMeta(primaryLine, strengthScore, activeFamilyCount, barCount) {
  if (barCount < PULLBACK_SUPPORT_EVENT_LOOKBACK_DAYS) {
    return { level: 'warning', reason: `일봉 ${barCount}개만 있어 복합 지지 판정 신뢰도가 낮습니다.` };
  }
  if (!primaryLine || activeFamilyCount <= 0) {
    return { level: 'danger', reason: '현재가 아래 유효 지지 family가 거의 없습니다.' };
  }
  if (strengthScore >= PULLBACK_SUPPORT_STRONG_THRESHOLD && activeFamilyCount >= 2) {
    return { level: 'clear', reason: `${(primaryLine.familyLabels || []).join('·')} 합의가 겹친 주지지선이 확인됩니다.` };
  }
  if (strengthScore >= PULLBACK_SUPPORT_WATCH_THRESHOLD) {
    if (activeFamilyCount <= 1) return { level: 'warning', reason: '지지선은 보이지만 단일 family 중심이라 이탈 시 방어력이 약합니다.' };
    return { level: 'warning', reason: '복합 지지선은 있으나 합의 강도가 중간 수준입니다.' };
  }
  return { level: 'danger', reason: '지지선 반복 횟수나 family 합의가 약해 하단 방어 신뢰도가 낮습니다.' };
}

function buildPullbackSupportSummary(primaryLine, strengthScore, warningReason, activeFamilyCount) {
  if (!primaryLine) return `주지지선 부족 · ${warningReason}`;
  const distanceText = typeof primaryLine.distancePct === 'number' ? `${primaryLine.distancePct.toFixed(2)}% 아래` : '거리 미산출';
  const families = Array.isArray(primaryLine.familyLabels) ? primaryLine.familyLabels.join('·') : '';
  return `주지지 ${Number(primaryLine.price || 0).toLocaleString()}원 (${distanceText}) · 강도 ${strengthScore}점 · family ${activeFamilyCount}개 · ${families}`;
}

function analyzePullbackSupportLevels(series = [], options = {}) {
  const { bars, currentPrice } = normalizeSupportBars(series, options);
  const families = {
    horizontal: buildHorizontalSupportFamily(bars, currentPrice),
    swingCluster: buildSwingSupportFamily(bars, currentPrice),
    volumeShelf: buildVolumeShelfFamily(bars, currentPrice),
    eventAnchors: buildEventAnchorFamily(bars, currentPrice)
  };
  const merged = mergeSupportLines(families, currentPrice);
  const primaryLine = merged.lines[0] || null;
  const strengthScore = primaryLine ? Math.round(toSupportNumber(primaryLine.strengthPoints)) : 0;
  const strengthLabel = getPullbackSupportStrengthLabel(strengthScore);
  const warningMeta = getPullbackSupportWarningMeta(primaryLine, strengthScore, merged.activeFamilyCount, bars.length);

  return {
    support: {
      summary: buildPullbackSupportSummary(primaryLine, strengthScore, warningMeta.reason, merged.activeFamilyCount),
      lines: merged.lines.slice(0, 5),
      primaryLine,
      strengthScore,
      strengthLabel,
      warningLevel: warningMeta.level,
      warningReason: warningMeta.reason,
      activeFamilyCount: merged.activeFamilyCount,
      barCount: bars.length
    },
    families
  };
}

function buildPullbackSupportGate(payload = {}) {
  const support = payload?.support && typeof payload.support === 'object' ? payload.support : {};
  const primaryLine = support.primaryLine || null;
  const strengthScore = Math.round(toSupportNumber(support.strengthScore));
  const activeFamilyCount = Math.round(toSupportNumber(support.activeFamilyCount));
  const noSupport = !primaryLine || activeFamilyCount <= 0;
  if (strengthScore >= PULLBACK_SUPPORT_STRONG_THRESHOLD && activeFamilyCount >= 2) {
    return { code: 'G9', status: '✅', note: `복합 지지 강도 ${strengthScore}점 · 현재가 아래 유효 family ${activeFamilyCount}개`, evalStatus: 'met' };
  }
  if (strengthScore < PULLBACK_SUPPORT_WATCH_THRESHOLD && noSupport) {
    return { code: 'G9', status: '⛔', note: support.warningReason || '현재가 아래 유효 지지선이 거의 없습니다.', evalStatus: 'not_met' };
  }
  return { code: 'G9', status: '⚠️', note: support.warningReason || `복합 지지 강도 ${strengthScore}점 · family ${activeFamilyCount}개`, evalStatus: 'not_met' };
}

window.PULLBACK_SUPPORT_CONSTANTS = {
  SUPPORT_LOOKBACK_DAYS: PULLBACK_SUPPORT_LOOKBACK_DAYS,
  SUPPORT_EVENT_LOOKBACK_DAYS: PULLBACK_SUPPORT_EVENT_LOOKBACK_DAYS,
  SUPPORT_CLUSTER_TOLERANCE: PULLBACK_SUPPORT_CLUSTER_TOLERANCE,
  SUPPORT_VOLUME_BINS: PULLBACK_SUPPORT_VOLUME_BINS,
  SUPPORT_FAMILY_WEIGHTS: { ...PULLBACK_SUPPORT_FAMILY_WEIGHTS },
  SUPPORT_CONSENSUS_BONUS: PULLBACK_SUPPORT_CONSENSUS_BONUS
};
window.analyzePullbackSupportLevels = analyzePullbackSupportLevels;
window.buildPullbackSupportGate = buildPullbackSupportGate;
window.getPullbackSupportStrengthLabel = getPullbackSupportStrengthLabel;
