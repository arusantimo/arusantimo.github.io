function createEmptyGapScore() {
  return {
    rows: [],
    totalScore: '',
    grade: '',
    entryAdjustment: '',
    sellAdjustment: '',
    swingAdjustment: '',
    note: ''
  };
}

function createEmptyLiveGapState() {
  return {
    status: 'idle',
    score: createEmptyGapScore(),
    fetchedAt: '',
    source: '',
    error: ''
  };
}

function formatSignedNumber(value, digits = 1) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '-';
  return `${num >= 0 ? '+' : ''}${num.toFixed(digits)}`;
}

function parseGapNumeric(value) {
  const match = String(value ?? '').replace(/,/g, '').match(/[+-]?\d+(?:\.\d+)?/);
  return match ? Number.parseFloat(match[0]) : NaN;
}

function getGapTotalNumber(gapScore) {
  const fromTotal = parseGapNumeric(gapScore?.totalScore);
  if (Number.isFinite(fromTotal)) return fromTotal;
  const sum = (gapScore?.rows || []).reduce((acc, row) => {
    const weighted = parseGapNumeric(row.weightedScore);
    return Number.isFinite(weighted) ? acc + weighted : acc;
  }, 0);
  return sum;
}

function isLiveGapReady() {
  return liveGapState.status === 'ready' && liveGapState.score.rows.length > 0;
}

function getActiveGapScore() {
  return isLiveGapReady() ? liveGapState.score : notionSnapshot.gapScore;
}

function getGapGradeByTotal(totalScore) {
  if (totalScore >= 7) return 'G-A';
  if (totalScore >= 2) return 'G-B';
  if (totalScore >= -2.9) return 'G-C';
  if (totalScore >= -7.9) return 'G-D';
  return 'G-E';
}

function getGapGradeDisplay(grade) {
  const meta = RULE_GUIDE.gapGrades.find(row => row.grade === grade);
  return meta ? `${meta.grade} ${meta.color}` : grade;
}

function getGapGradeRank(grade) {
  const code = getGapGradeCode(grade);
  return ['G-A', 'G-B', 'G-C', 'G-D', 'G-E'].indexOf(code);
}

function getGapComparisonSignal() {
  if (!isLiveGapReady()) {
    return {
      available: false,
      bias: 0,
      scoreDelta: 0,
      gradeShift: 0,
      tone: 'neutral',
      summary: '실시간 비교 없음'
    };
  }

  const notionGap = notionSnapshot.gapScore;
  const notionTotal = getGapTotalNumber(notionGap);
  const liveTotal = getGapTotalNumber(liveGapState.score);
  const notionRank = getGapGradeRank(notionGap.grade);
  const liveRank = getGapGradeRank(liveGapState.score.grade);
  const gradeShift = notionRank >= 0 && liveRank >= 0 ? notionRank - liveRank : 0;
  const scoreDelta = Number.isFinite(liveTotal) && Number.isFinite(notionTotal) ? liveTotal - notionTotal : 0;

  let bias = 0;
  if (scoreDelta >= 3 || gradeShift >= 1) bias = 1;
  else if (scoreDelta <= -3 || gradeShift <= -1) bias = -1;

  const tone = bias > 0 ? 'improved' : bias < 0 ? 'worsened' : 'neutral';
  const summary = bias > 0
    ? `실시간 갭 환경이 노션 대비 개선됨 (${formatSignedNumber(scoreDelta, 1)}점)`
    : bias < 0
      ? `실시간 갭 환경이 노션 대비 악화됨 (${formatSignedNumber(scoreDelta, 1)}점)`
      : `실시간 갭 환경이 노션과 유사함 (${formatSignedNumber(scoreDelta, 1)}점)`;

  return {
    available: Number.isFinite(liveTotal) || gradeShift !== 0,
    bias,
    scoreDelta,
    gradeShift,
    tone,
    summary
  };
}

function getGapComparisonText() {
  if (!isLiveGapReady()) return '';
  const notionGap = notionSnapshot.gapScore;
  const notionTotal = getGapTotalNumber(notionGap);
  if (!Number.isFinite(notionTotal) && !notionGap.grade) return '';
  const liveTotal = getGapTotalNumber(liveGapState.score);
  const delta = Number.isFinite(liveTotal) && Number.isFinite(notionTotal) ? liveTotal - notionTotal : NaN;
  const notionLabel = notionGap.grade || '미확인';
  const liveLabel = liveGapState.score.grade || '미확인';
  const deltaText = Number.isFinite(delta) ? ` / ${formatSignedNumber(delta, 1)}점 변화` : '';
  return `노션 ${notionLabel}${Number.isFinite(notionTotal) ? ` (${formatSignedNumber(notionTotal, 1)}점)` : ''} → 실시간 ${liveLabel}${Number.isFinite(liveTotal) ? ` (${formatSignedNumber(liveTotal, 1)}점)` : ''}${deltaText}`;
}

function scoreNqChange(changePct) {
  if (changePct >= 1.5) return 2;
  if (changePct >= 0.5) return 1;
  if (changePct > -0.5) return 0;
  if (changePct >= -1.5) return -1;
  return -2;
}

function scoreVixLevel(level) {
  if (level < 12) return 2;
  if (level < 17) return 1;
  if (level < 22) return 0;
  if (level < 28) return -1;
  return -2;
}

function scoreBondBpChange(bpChange) {
  if (bpChange <= -8) return 2;
  if (bpChange < -3) return 1;
  if (bpChange <= 3) return 0;
  if (bpChange < 8) return -1;
  return -2;
}

function scoreUsdKrwChange(changeWon) {
  if (changeWon <= -15) return 2;
  if (changeWon < -5) return 1;
  if (changeWon <= 5) return 0;
  if (changeWon < 15) return -1;
  return -2;
}

function scoreSoxChange(changePct) {
  if (changePct >= 1.5) return 2;
  if (changePct >= 0) return 1;
  if (changePct >= -1.5) return -1;
  return -2;
}

function applyGapAdjustments(gapScore, gradeCode) {
  const entryRow = RULE_GUIDE.gapEntryAdjustments.find(row => row.grade === gradeCode);
  const sellRow = RULE_GUIDE.gapSellAdjustments.find(row => row.grade === gradeCode);
  gapScore.grade = getGapGradeDisplay(gradeCode);
  gapScore.entryAdjustment = entryRow ? `${entryRow.trend} / ${entryRow.reversal}` : '';
  gapScore.sellAdjustment = sellRow ? `${sellRow.premarket} | ${sellRow.stopLoss}` : '';
  gapScore.swingAdjustment = sellRow ? sellRow.swing : '';
}

function buildLiveGapScore(liveMetrics) {
  const gapScore = createEmptyGapScore();
  const rows = [
    {
      indicator: 'NQ 선물 변화율',
      actualValue: `${formatSignedNumber(liveMetrics.nq.changePct, 2)}%`,
      baseScore: scoreNqChange(liveMetrics.nq.changePct),
      weight: 2.5
    },
    {
      indicator: 'VIX 수준',
      actualValue: liveMetrics.vix.current.toFixed(2),
      baseScore: scoreVixLevel(liveMetrics.vix.current),
      weight: 2.0
    },
    {
      indicator: '미국 10년물 금리 전일비',
      actualValue: `${formatSignedNumber(liveMetrics.tnx.bpChange, 1)}bp`,
      baseScore: scoreBondBpChange(liveMetrics.tnx.bpChange),
      weight: 1.5
    },
    {
      indicator: '원달러 환율 변화',
      actualValue: `${formatSignedNumber(liveMetrics.krw.changeWon, 2)}원`,
      baseScore: scoreUsdKrwChange(liveMetrics.krw.changeWon),
      weight: 1.5
    },
    {
      indicator: 'SOX 전일 변화율',
      actualValue: `${formatSignedNumber(liveMetrics.sox.changePct, 2)}%`,
      baseScore: scoreSoxChange(liveMetrics.sox.changePct),
      weight: 1.0
    }
  ];

  gapScore.rows = rows.map(row => {
    const weighted = row.baseScore * row.weight;
    return {
      indicator: row.indicator,
      actualValue: row.actualValue,
      baseScore: `${row.baseScore >= 0 ? '+' : ''}${row.baseScore}점`,
      weight: `×${row.weight.toFixed(1)}`,
      formula: `${row.baseScore >= 0 ? '+' : ''}${row.baseScore} × ${row.weight.toFixed(1)} = ${formatSignedNumber(weighted, 1)}점`,
      weightedScore: `${formatSignedNumber(weighted, 1)}점`
    };
  });

  const totalScore = gapScore.rows.reduce((acc, row) => acc + (parseGapNumeric(row.weightedScore) || 0), 0);
  const gradeCode = getGapGradeByTotal(totalScore);
  gapScore.totalScore = `${formatSignedNumber(totalScore, 1)}점`;
  applyGapAdjustments(gapScore, gradeCode);
  gapScore.note = '실시간 수집값 기준. 분석 시점의 야간 변동이 반영됩니다.';
  return gapScore;
}
function parseGapScoreRows(rows, gapScore) {
  rows.slice(1).forEach(row => {
    const cells = row.map(stripMarkdownText);
    const label = normalizeHeading(cells[0] || '');
    if (!label) return;

    if (label.includes('합산')) {
      gapScore.totalScore = cells[cells.length - 1] || '';
      return;
    }

    gapScore.rows.push({
      indicator: cells[0] || '',
      actualValue: cells[1] || '',
      baseScore: cells[2] || '',
      weight: cells[3] || '',
      formula: cells.length >= 6 ? (cells[4] || '') : '',
      weightedScore: cells.length >= 6 ? (cells[5] || '') : (cells[4] || '')
    });
  });
}
function getGapGradeCode(value) {
  const match = sanitizeText(value).match(/G-[A-E]/);
  return match ? match[0] : '';
}

function getGapSellAdjustmentProfile() {
  const activeGapScore = getActiveGapScore();
  const grade = getGapGradeCode(activeGapScore.grade);
  const guideRow = RULE_GUIDE.gapSellAdjustments.find(row => row.grade === grade) || null;
  const comparison = getGapComparisonSignal();

  const profiles = {
    'G-A': { severity: 'clear', premarketRateOffset: 0, tightenStopLossRate: 0, immediatePartialExit: false, swingMode: 'allow' },
    'G-B': { severity: 'clear', premarketRateOffset: 0, tightenStopLossRate: 0, immediatePartialExit: false, swingMode: 'allow' },
    'G-C': { severity: 'unknown', premarketRateOffset: 0.5, tightenStopLossRate: 0.5, immediatePartialExit: false, swingMode: 'conditional' },
    'G-D': { severity: 'triggered', premarketRateOffset: 0, tightenStopLossRate: 1.0, immediatePartialExit: true, swingMode: 'ban' },
    'G-E': { severity: 'triggered', premarketRateOffset: 0, tightenStopLossRate: 1.0, immediatePartialExit: true, swingMode: 'ban' }
  };

  const profile = profiles[grade] || { severity: 'unknown', premarketRateOffset: 0, tightenStopLossRate: 0, immediatePartialExit: false, swingMode: 'allow' };

  const adjustedPremarketRateOffset = clampNumber(profile.premarketRateOffset + (comparison.bias < 0 ? 0.5 : comparison.bias > 0 ? -0.5 : 0), 0, 1.5);
  const adjustedTightenStopLossRate = clampNumber(profile.tightenStopLossRate + (comparison.bias < 0 ? 0.5 : comparison.bias > 0 ? -0.5 : 0), 0, 1.5);

  let adjustedSwingMode = profile.swingMode;
  if (comparison.bias > 0 && profile.swingMode === 'conditional') adjustedSwingMode = 'allow';
  if (comparison.bias < 0 && profile.swingMode === 'allow') adjustedSwingMode = 'conditional';
  if (comparison.bias < 0 && profile.swingMode === 'conditional') adjustedSwingMode = 'ban';

  const severity = adjustedSwingMode === 'ban' || profile.immediatePartialExit
    ? 'triggered'
    : adjustedTightenStopLossRate > 0 || adjustedSwingMode === 'conditional'
      ? 'unknown'
      : 'clear';

  const swingText = adjustedSwingMode === 'allow' ? '허용' : adjustedSwingMode === 'conditional' ? '조건부 허용' : '금지';
  const stopLossText = adjustedTightenStopLossRate > 0
    ? `손절폭 -${adjustedTightenStopLossRate.toFixed(1)}%p 축소`
    : '기본 손절폭 유지';
  const premarketText = profile.immediatePartialExit
    ? guideRow?.premarket || '프리마켓 첫 가격 즉시 50% 정리'
    : adjustedPremarketRateOffset > 0
      ? `프리마켓 갭업 기준 -${adjustedPremarketRateOffset.toFixed(1)}%p 하향`
      : '기본 조건 유지';

  return {
    code: grade,
    label: activeGapScore.grade || '미확인',
    severity,
    premarketRateOffset: adjustedPremarketRateOffset,
    tightenStopLossRate: adjustedTightenStopLossRate,
    immediatePartialExit: profile.immediatePartialExit,
    swingMode: adjustedSwingMode,
    premarketText,
    stopLossText,
    swingText,
    comparison,
    summary: grade
      ? `갭 ${grade} 적용: 프리마켓 ${premarketText} / 손절 ${stopLossText} / 스윙 ${swingText}${comparison.available ? ` / 비교 보정: ${comparison.summary}` : ''}`
      : '갭 등급 미확인: 기본 매도 기준 유지'
  };
}
