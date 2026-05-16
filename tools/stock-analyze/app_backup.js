// CORS Proxy to bypass Naver's block (여러 개의 프록시 서버를 두어 안정성을 높임)
const PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://corsproxy.io/?'
];

const ANALYSIS_ARCHIVE_KEY = 'stockAnalyzePreviousAnalysisSnapshotsV1';

const RULE_GUIDE = {
  regimes: [
    {
      state: '강세장 ✅',
      condition: '60MA 우상향 AND 20MA 우상향 AND VKOSPI < 20',
      pullback: '서브 (3종목)',
      momentum: '메인 (3종목)'
    },
    {
      state: '순환매장 🔄',
      condition: '60MA 횡보 AND 신고가 ≥ 30 AND 업종 리더십 변경 AND 거래대금 유지',
      pullback: '서브 (2종목)',
      momentum: '메인 (2종목)'
    },
    {
      state: '박스권 ⚠️',
      condition: '그 외 (지수 정체 + 내부 침체)',
      pullback: '메인 (3종목)',
      momentum: '서브 (1종목)'
    },
    {
      state: '약세장 ⛔',
      condition: 'KOSPI 60MA 하락 OR VKOSPI > 30',
      pullback: '관망',
      momentum: '관망'
    }
  ],
  trendGrades: [
    { grade: 'S', score: '9.0 ~ 10점', meaning: '레짐 무관 진입 가능' },
    { grade: 'A', score: '7.5 ~ 8.9점', meaning: '강세장·순환매장·박스권 진입 가능' },
    { grade: 'B', score: '6.0 ~ 7.4점', meaning: '매매 단계 노출, 진입 보류, 익일 재평가' },
    { grade: 'C', score: '6.0점 미만', meaning: '출력 목록에서 제외' }
  ],
  reversalGrades: [
    { grade: 'S', score: '8.5 ~ 10점', meaning: '최우선 진입' },
    { grade: 'A', score: '7.0 ~ 8.4점', meaning: '진입 가능' },
    { grade: 'B', score: '5.5 ~ 6.9점', meaning: '익일 재평가 (당일 진입 금지)' },
    { grade: 'C', score: '5.5점 미만', meaning: '출력 제외' }
  ],
  permissions: [
    { regime: '강세장', s: '✅ 100% 진입', a: '✅ 100% 진입', b: '👀 모니터링' },
    { regime: '순환매장', s: '✅ 80% 진입', a: '✅ 70% 진입', b: '👀 모니터링' },
    { regime: '박스권', s: '✅ 70% 진입', a: '✅ 70% 진입', b: '👀 모니터링' },
    { regime: '약세장', s: '✅ 50% 진입', a: '❌ 매매금지', b: '👀 모니터링' }
  ],
  trendVkospiAdjustments: [
    { range: '< 20', rule: '보정 없음' },
    { range: '20 ~ 30', rule: '원점수 × 0.9' },
    { range: '> 30', rule: '원점수 × 0.8' }
  ],
  reversalVkospiAdjustments: [
    { range: '< 20', rule: '원점수 × 0.8' },
    { range: '20 ~ 30', rule: '원점수 × 1.0' },
    { range: '> 30', rule: '원점수 × 0.9' }
  ],
  gapGrades: [
    { grade: 'G-A', label: '갭업 우호', score: '+7.0 이상', outlook: '익일 갭업 +1.5% 이상 기대', color: '🟢' },
    { grade: 'G-B', label: '갭업 중립', score: '+2.0 ~ +6.9', outlook: '갭업 +0.5~+1.5% 또는 보합', color: '🔵' },
    { grade: 'G-C', label: '갭 불안정', score: '-2.9 ~ +1.9', outlook: '보합 또는 소폭 갭다운 가능', color: '🟡' },
    { grade: 'G-D', label: '갭다운 주의', score: '-7.9 ~ -3.0', outlook: '갭다운 -0.5~-2.0% 경계', color: '🟠' },
    { grade: 'G-E', label: '갭다운 경고', score: '-8.0 미만', outlook: '갭다운 -2.0% 이상 위험', color: '🔴' }
  ],
  gapEntryAdjustments: [
    { grade: 'G-A', trend: '✅ 100% 진입', reversal: '✅ 100% 진입', note: '익일 프리마켓 갭업 익절 최적 환경' },
    { grade: 'G-B', trend: '✅ 100% 진입', reversal: '✅ 80% 진입', note: '기본 운용' },
    { grade: 'G-C', trend: '✅ 70% 진입', reversal: '⚠️ 50% 진입', note: '포지션 축소. 손절폭 동일 유지' },
    { grade: 'G-D', trend: '⚠️ S등급 50% 진입만 허용', reversal: '❌ 진입 보류', note: 'A·B등급 당일 진입 금지' },
    { grade: 'G-E', trend: '❌ 전 등급 진입 금지', reversal: '❌ 진입 금지', note: '당일 종가베팅 전면 보류' }
  ],
  gapSellAdjustments: [
    { grade: 'G-A', premarket: '기본 조건 유지', stopLoss: '기본 손절폭 유지', swing: '적극 허용' },
    { grade: 'G-B', premarket: '기본 조건 유지', stopLoss: '기본 유지', swing: '허용' },
    { grade: 'G-C', premarket: '프리마켓 갭업 기준 -0.5%p 하향', stopLoss: '손절폭 -0.5%p 축소', swing: '조건부 허용' },
    { grade: 'G-D', premarket: '프리마켓 첫 가격 즉시 50% 정리', stopLoss: '손절폭 -1%p 축소', swing: '금지' },
    { grade: 'G-E', premarket: '진입 없음 — 해당 없음', stopLoss: '해당 없음', swing: '금지' }
  ],
  strategies: {
    pullback: {
      gates: [
        { code: 'G1', condition: '동적 정배열: 5MA > 20MA > 60MA이면서 세 MA 모두 5일 변화율 > 0', source: '네이버 증권 일봉 차트' },
        { code: 'G2', condition: '종가 > 60일선', source: '네이버 증권 일봉 차트' },
        { code: 'G3', condition: '주봉 RSI(14) ≥ 50', source: '네이버 증권 주봉 차트' },
        { code: 'G4', condition: '일봉 MACD 히스토그램이 음전환 후 3일 이내 OR 0선 위 회복 시도 중', source: '네이버 증권 일봉 차트' },
        { code: 'G5', condition: 'KOSPI 5일선 위 + VKOSPI 수준 확인 → 점수 보정 적용', source: '네이버 증권 시장지표' }
      ],
      scores: [
        { code: 'S1', condition: '최근 2주 내 거래대금 30위권 진입 이력 3회 이상', source: '네이버 증권' },
        { code: 'S2', condition: '당일 외국인 OR 기관 순매수 전환 확인', source: '네이버 증권' },
        { code: 'P1', condition: '단기 고점 대비 -7% ~ -15% 조정', source: '네이버 증권' },
        { code: 'P2', condition: '당일 종가가 5일/10일/20일선 중 최소 1개 위', source: '네이버 증권' },
        { code: 'C1', condition: '양봉 OR 아래꼬리:몸통 비율 ≥ 1:1', source: '네이버 증권' },
        { code: 'C2', condition: '당일 거래량이 5일 평균의 100 ~ 180%', source: '네이버 증권' },
        { code: 'C3', condition: '해당 섹터 지수가 코스피 대비 당일 outperform', source: '네이버 증권' }
      ]
    },
    momentum: {
      gates: [
        { code: 'G1', condition: 'RS 상위 10% 이내', source: '네이버 증권' },
        { code: 'G2', condition: '5일 초과수익률 > 0 AND 20일 초과수익률 > 0', source: '네이버 증권' },
        { code: 'G3', condition: '52주 고점의 92% 이상 위치 OR 52주 신고가 갱신', source: '네이버 증권' },
        { code: 'G4', condition: '당일 거래대금 30위 이내', source: '네이버 증권' }
      ],
      scores: [
        { code: 'S1', condition: '외국인 + 기관 동시 순매수', source: '네이버 증권' },
        { code: 'S2', condition: '분당 체결강도 평균 ≥ 100%가 장중 70% 이상 유지 + 당일 체결강도 평균 ≥ 110%', source: '토스 증권' },
        { code: 'P1', condition: '박스권 상단 OR 전고점 돌파 후 +5% 이내 자리', source: '네이버 증권' },
        { code: 'P2', condition: '돌파 당일 거래량이 20일 평균의 150% 이상', source: '네이버 증권' },
        { code: 'C1', condition: '종가 ≥ 당일 고가의 95%', source: '네이버 증권' },
        { code: 'C2', condition: '몸통이 전체 캔들의 70% 이상 + 윗꼬리 ≤ 몸통의 30%', source: '네이버 증권' },
        { code: 'C3', condition: '매수호가 잔량 : 매도호가 잔량 ≥ 1.2 : 1', source: '토스 증권' }
      ]
    },
    reversal: {
      filters: [
        { code: 'F1', condition: '거래대금 당일 30위 이내' },
        { code: 'F2', condition: '시가총액 30조원 이상 (대형주 한정)' },
        { code: 'F3', condition: '실적발표 D-2, 분할/합병/배당락 D-5 이내 제외' },
        { code: 'F4', condition: '동일 종목 본 전략 진입 후 5거래일 이내 재진입 금지' }
      ],
      gates: [
        { code: 'G1', condition: '직전 1개월 누적 상승률 ≥ +30% (주도주 자격)', source: '네이버 일봉' },
        { code: 'G2', condition: '직전 단기 고점(20거래일 최고종가) 대비 -7% ~ -20% 하락 구간', source: '네이버 일봉' },
        { code: 'G3', condition: '종가 > 60MA (장기 추세 베이스 유지)', source: '네이버 일봉' },
        { code: 'G4', condition: '직전 5거래일 내 일봉 -5% 이상 급락 1회 이상 발생', source: '네이버 일봉' },
        { code: 'G5', condition: '안정화 캔들 패턴 (G5-a 양봉 / G5-b 긴아래꼬리 / G5-c 도지)', source: '네이버 일봉' }
      ],
      scores: [
        { code: 'S1', condition: '외국인 OR 기관 당일 순매수 전환 (전일 대비 부호 반전)', source: '네이버 증권' },
        { code: 'S2', condition: '토스 분당 체결강도 장중 마지막 1시간 평균 ≥ 100% + 당일 평균 ≥ 90%', source: '토스 증권' },
        { code: 'P1', condition: '종가 > 20MA (중기 지지선 사수)', source: '네이버 증권' },
        { code: 'P2', condition: '종가 위치가 당일 고가-저가 레인지 상단 50% 이상', source: '네이버 증권' },
        { code: 'C1', condition: '당일 거래량 5일 평균의 200% 이상 (셀링 클라이맥스 확인)', source: '네이버 증권' },
        { code: 'C2', condition: '토스 호가창 매수잔량 : 매도잔량 ≥ 1:1 (매수세 균형 회복)', source: '토스 증권' },
        { code: 'C3', condition: '장 마감 직전 30분봉이 양봉 또는 종가 ≥ 30분봉 시가', source: '네이버·토스' }
      ]
    }
  }
};

const STRATEGY_META = {
  pullback: {
    label: '📊 눌림목 종가베팅',
    shortLabel: '눌림목',
    noun: '눌림목 베팅'
  },
  momentum: {
    label: '🔥 수급 매집형 종가베팅 TOP',
    shortLabel: '수급 매집형',
    noun: '수급 매집형'
  },
  reversal: {
    label: '🔻 주도주 급락 반등',
    shortLabel: '급락 반등',
    noun: '급락 반등 매매'
  },
  swing: {
    label: '🔄 스윙 보유',
    shortLabel: '스윙',
    noun: '스윙 보유'
  }
};

const REGIME_LABEL_GUIDE = {
  '레짐': '현재 시장 환경 4분류입니다. 강세장·순환매장·박스권·약세장 여부에 따라 매수 가능 등급과 전략 우선순위가 달라집니다.',
  'KOSPI': '코스피 지수의 현재 수준과 등락률입니다. 시장 전체 방향성과 강도를 확인할 때 사용합니다.',
  'VKOSPI': '코스피 변동성 지수입니다. 수치가 높을수록 시장 불안이 크며 매수 점수 보정이 더 보수적으로 적용됩니다.',
  '진입 전략': '현재 레짐에서 어떤 전략이 메인인지, 어떤 전략이 서브인지, 어떤 전략을 보류해야 하는지 요약한 항목입니다.',
  '60일선': '코스피 60일 이동평균선의 방향입니다. 중기 추세가 우상향인지 횡보인지 하락인지 판단합니다.',
  '20일선': '코스피 20일 이동평균선의 방향입니다. 단기 추세 방향과 강세장 조건 판정에 사용됩니다.',
  '최종 보정': 'VKOSPI 수준에 따라 원점수에 곱해지는 최종 보정값입니다. 시장이 불안할수록 점수가 낮아집니다.',
  '스윙 전환': '현 레짐에서 종베→스윙 전환 허용 정도입니다. 적극/조건부/제한/금지 4단계로 구분됩니다.',
  '스윙 전환 활성도': '현 레짐에서 종베→스윙 전환을 얼마나 허용하는지 보여주는 항목입니다. 적극/조건부/제한/금지로 해석합니다.',
  '시가베팅': '현 레짐에서 시가베팅 활성 여부입니다. 강세장·순환매장에서만 활성화됩니다.',
  '역추세 트랙': '전략 ③ 주도주 급락 반등 매매의 활성 여부입니다. 약세장에서는 비활성, 강세장·박스권 중심으로 제한적으로 사용합니다.',
  '갭 스코어': '미국 시장과 환율을 반영해 익일 갭 방향을 점수화한 항목입니다. 낮을수록 다음 날 갭다운 위험이 크다고 봅니다.',
  '갭 조정': '갭 스코어에 따라 당일 진입 비중과 익일 매도 전략을 어떻게 조정하는지 요약한 항목입니다.',
  '등락주': '당일 상승 종목 수, 하락 종목 수, 상한가 수를 요약한 내부 체력 지표입니다. 지수와 별개로 시장 폭을 판단할 때 사용합니다.',
  '시장 맥락': '당일 레짐 판정에 영향을 준 핵심 뉴스, 수급 변화, 급락·급등 이벤트를 한 줄로 요약한 항목입니다.',
  '특이 사항': '당일 시장에서 매매 판단에 영향을 줄 수 있는 이벤트, 수급 변화, 옵션만기 같은 참고 메모입니다.'
};

function normalizeRegimeGuideKey(value) {
  const normalized = sanitizeText(value)
    .replace(/\*/g, '')
    .replace(/[📡📊🔥📰🚨⚠️✅⛔🧊🔄💱↕️]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (normalized === '시장 레짐' || normalized === '레짐') return '레짐';
  if (normalized.includes('진입 전략')) return '진입 전략';
  if (normalized.includes('스윙 전환 활성도')) return '스윙 전환 활성도';
  if (normalized === '스윙 전환') return '스윙 전환';
  if (normalized.includes('시가베팅')) return '시가베팅';
  if (normalized.includes('역추세 트랙')) return '역추세 트랙';
  if (normalized.includes('갭 스코어')) return '갭 스코어';
  if (normalized.includes('갭 조정')) return '갭 조정';
  if (normalized.includes('KOSPI 60MA') || normalized.includes('60일선')) return '60일선';
  if (normalized.includes('KOSPI 20MA') || normalized.includes('20일선')) return '20일선';
  if (normalized.includes('등락주')) return '등락주';
  if (normalized.includes('시장 맥락')) return '시장 맥락';
  return normalized;
}

function getRegimeGuideText(item) {
  return REGIME_LABEL_GUIDE[normalizeRegimeGuideKey(item)] || '';
}

function getRegimeInlineHelp(row) {
  const key = normalizeRegimeGuideKey(row.item);
  if (key === '갭 스코어') {
    return '기본 점수에 중요도를 곱한 뒤 모두 더한 최종 점수입니다. 낮을수록 다음 날 갭다운 위험을 더 크게 봅니다.';
  }
  if (key === '갭 조정') {
    return '갭 스코어 결과를 바탕으로 진입 비중과 익일 매도 기준을 어떻게 바꿀지 정리한 항목입니다.';
  }
  return '';
}

function stripMarkdownText(value) {
  return sanitizeText(value).replace(/\*\*/g, '').trim();
}

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

async function fetchYahooChartMetric(symbol) {
  const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=5d&interval=1d`;
  let lastError = null;

  for (const proxy of PROXIES) {
    try {
      const res = await fetch(proxy + encodeURIComponent(targetUrl), { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const meta = json?.chart?.result?.[0]?.meta;
      if (!meta) throw new Error(json?.chart?.error?.description || 'meta missing');
      return meta;
    } catch (error) {
      lastError = error;
    }
  }

  try {
    const res = await fetch(`https://r.jina.ai/http://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=5d&interval=1d`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Jina HTTP ${res.status}`);
    const text = await res.text();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error('Jina JSON payload missing');
    const json = JSON.parse(text.slice(start, end + 1));
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta) throw new Error(json?.chart?.error?.description || 'Jina meta missing');
    return meta;
  } catch (error) {
    lastError = error;
  }

  throw lastError || new Error(`failed to fetch ${symbol}`);
}

async function refreshLiveGapScore(reasonLabel = '분석 시점') {
  liveGapState = { ...createEmptyLiveGapState(), status: 'loading' };
  renderAll();
  log(`📡 ${reasonLabel} 실시간 갭 지표 5종 수집 중...`);

  try {
    const [nqMeta, vixMeta, tnxMeta, krwMeta, soxMeta] = await Promise.all([
      fetchYahooChartMetric('NQ=F'),
      fetchYahooChartMetric('^VIX'),
      fetchYahooChartMetric('^TNX'),
      fetchYahooChartMetric('KRW=X'),
      fetchYahooChartMetric('^SOX')
    ]);

    const liveMetrics = {
      nq: {
        current: Number(nqMeta.regularMarketPrice),
        previousClose: Number(nqMeta.chartPreviousClose),
        changePct: ((Number(nqMeta.regularMarketPrice) - Number(nqMeta.chartPreviousClose)) / Number(nqMeta.chartPreviousClose)) * 100
      },
      vix: {
        current: Number(vixMeta.regularMarketPrice),
        previousClose: Number(vixMeta.chartPreviousClose)
      },
      tnx: {
        current: Number(tnxMeta.regularMarketPrice),
        previousClose: Number(tnxMeta.chartPreviousClose),
        bpChange: (Number(tnxMeta.regularMarketPrice) - Number(tnxMeta.chartPreviousClose)) * 100
      },
      krw: {
        current: Number(krwMeta.regularMarketPrice),
        previousClose: Number(krwMeta.chartPreviousClose),
        changeWon: Number(krwMeta.regularMarketPrice) - Number(krwMeta.chartPreviousClose)
      },
      sox: {
        current: Number(soxMeta.regularMarketPrice),
        previousClose: Number(soxMeta.chartPreviousClose),
        changePct: ((Number(soxMeta.regularMarketPrice) - Number(soxMeta.chartPreviousClose)) / Number(soxMeta.chartPreviousClose)) * 100
      }
    };

    liveGapState = {
      status: 'ready',
      score: buildLiveGapScore(liveMetrics),
      fetchedAt: new Date().toLocaleString('ko-KR', { hour12: false }),
      source: 'Yahoo Finance chart API',
      error: ''
    };

    const compareText = getGapComparisonText();
    log(`✅ 실시간 갭 스코어 갱신 완료. (${liveGapState.score.grade}${compareText ? ` / ${compareText}` : ''})`);
  } catch (error) {
    liveGapState = { ...createEmptyLiveGapState(), status: 'error', error: error?.message || 'unknown error' };
    log('<span style="color:var(--text-warning)">⚠️ 실시간 갭 지표 수집에 실패해 노션 기준 갭 스코어로 계속 분석합니다.</span>');
    console.error(error);
  } finally {
    renderAll();
  }
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

function renderGapScoreSummary() {
  const notionGapScore = notionSnapshot.gapScore;
  const gapScore = getActiveGapScore();
  const isLive = isLiveGapReady();
  if (!gapScore.rows.length && !gapScore.totalScore && !gapScore.grade) return '';

  const comparisonText = getGapComparisonText();
  const dataStatusText = isLive
    ? `실시간 분석 기준은 ${liveGapState.source}에서 ${liveGapState.fetchedAt}에 수집했습니다. 노션 값은 전일 장마감 전 스냅샷으로 비교 기준으로 유지합니다.`
    : liveGapState.status === 'error'
      ? `실시간 수집에 실패해 노션 보고서 기준 갭 스코어를 사용 중입니다. (${escapeHtml(liveGapState.error)})`
      : '현재 화면의 갭 스코어는 노션 보고서에 적힌 값을 파싱한 결과입니다. 분석 버튼 실행 시 실시간 수집을 시도합니다.';
  const caption = isLive
    ? '실시간으로 수집한 5개 지표를 우선 적용하고, 노션 스냅샷과의 차이로 overnight drift를 확인합니다.'
    : '기본 점수에 중요도를 곱해 반영 점수를 만들고, 그 합계로 다음 날 갭 위험을 판단합니다.';

  return `
    <div class="gap-score-panel">
      <div class="gap-score-head">
        <div>
          <div class="gap-score-title">📡 익일 갭 예측 스코어</div>
          <div class="gap-score-caption">${escapeHtml(caption)}</div>
        </div>
        ${gapScore.grade ? `<button type="button" class="gap-score-grade gap-score-grade-trigger" aria-label="갭 등급 기준 보기">갭 등급: ${escapeHtml(gapScore.grade)}${isLive ? ' · 실시간' : ''}</button>` : ''}
      </div>
      <table class="guide-table compact-table gap-score-table">
        <thead>
          <tr>
            <th>지표</th>
            <th>실측값</th>
            <th>기본 점수</th>
            <th>중요도</th>
            <th>계산식</th>
            <th>반영 점수</th>
          </tr>
        </thead>
        <tbody>
          ${gapScore.rows.map(row => `
            <tr>
              <td>${escapeHtml(row.indicator)}</td>
              <td>${escapeHtml(row.actualValue)}</td>
              <td>${escapeHtml(row.baseScore)}</td>
              <td>${escapeHtml(row.weight)}</td>
              <td>${escapeHtml(row.formula || `${row.baseScore} ${row.weight}`.trim())}</td>
              <td><strong>${escapeHtml(row.weightedScore)}</strong></td>
            </tr>
          `).join('')}
          ${gapScore.totalScore ? `
            <tr class="gap-score-total-row">
              <td colspan="5">반영 점수 합계</td>
              <td><strong>${escapeHtml(gapScore.totalScore)}</strong></td>
            </tr>
          ` : ''}
        </tbody>
      </table>
      <div class="gap-score-meta">
        ${gapScore.entryAdjustment ? `<div class="gap-score-meta-item"><strong>진입 조정</strong><span>${escapeHtml(gapScore.entryAdjustment)}</span></div>` : ''}
        ${gapScore.sellAdjustment ? `<div class="gap-score-meta-item"><strong>매도 조정</strong><span>${escapeHtml(gapScore.sellAdjustment)}</span></div>` : ''}
        ${gapScore.swingAdjustment ? `<div class="gap-score-meta-item"><strong>스윙 전환</strong><span>${escapeHtml(gapScore.swingAdjustment)}</span></div>` : ''}
        ${gapScore.note ? `<div class="gap-score-meta-item"><strong>특이사항</strong><span>${escapeHtml(gapScore.note)}</span></div>` : ''}
        ${comparisonText ? `<div class="gap-score-meta-item"><strong>노션 비교</strong><span>${escapeHtml(comparisonText)}</span></div>` : ''}
        ${isLive && notionGapScore.note ? `<div class="gap-score-meta-item"><strong>노션 기준</strong><span>${escapeHtml(notionGapScore.grade || '미확인')} / ${escapeHtml(notionGapScore.note)}</span></div>` : ''}
        <div class="gap-score-meta-item"><strong>데이터 상태</strong><span>${escapeHtml(dataStatusText)}</span></div>
      </div>
    </div>
  `;
}

function getGapGradeCode(value) {
  const match = sanitizeText(value).match(/G-[A-E]/);
  return match ? match[0] : '';
}

function adjustPriceByRatePoint(basePrice, targetPrice, ratePointDelta) {
  if (!basePrice || !targetPrice || !ratePointDelta) return targetPrice;
  return Math.max(0, Math.round(targetPrice - (basePrice * ratePointDelta / 100)));
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
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

let activeTab = 'buy';
let stocks = {
  pullback: [],
  momentum: [],
  swing: []
};
let notionSnapshot = createEmptySnapshot();
let liveGapState = createEmptyLiveGapState();
const stockDetailMap = {};
let currentModalState = { code: null, mode: null };
let isRegimeSummaryCollapsed = false;

function readAnalysisArchive() {
  try {
    const raw = localStorage.getItem(ANALYSIS_ARCHIVE_KEY);
    if (!raw) return { buy: null, sell: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { buy: null, sell: {} };
    return {
      buy: parsed.buy || null,
      sell: parsed.sell && typeof parsed.sell === 'object' ? parsed.sell : {}
    };
  } catch (error) {
    console.error(error);
    return { buy: null, sell: {} };
  }
}

function writeAnalysisArchive(archive) {
  try {
    localStorage.setItem(ANALYSIS_ARCHIVE_KEY, JSON.stringify(archive));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getStageTimeLabel(date = new Date()) {
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

function getSellStageKeyByTime(date = new Date()) {
  const totalMins = date.getHours() * 60 + date.getMinutes();
  return totalMins < (9 * 60 + 8) ? 'stage1' : 'stage2';
}

function formatArchiveButtonTime(archiveItem) {
  if (!archiveItem) return '';
  if (archiveItem.analysisTime) return archiveItem.analysisTime;
  const savedAt = archiveItem.savedAt ? new Date(archiveItem.savedAt) : null;
  if (!(savedAt instanceof Date) || Number.isNaN(savedAt.getTime())) return '';
  return getStageTimeLabel(savedAt);
}

function getActiveArchiveForTab(tab = activeTab, now = new Date()) {
  const archive = readAnalysisArchive();
  if (tab === 'buy') return archive.buy || null;
  const stageKey = getSellStageKeyByTime(now);
  return archive.sell?.[stageKey] || null;
}

function saveAnalysisArchive(mode, options = {}) {
  const archive = readAnalysisArchive();
  const payload = mode === 'buy'
    ? buildBuyAnalysisArchive(options.timeLabel || getStageTimeLabel())
    : buildSellAnalysisArchive(Boolean(options.isBefore0908), options.timeLabel || getStageTimeLabel());

  if (!payload) return false;

  if (mode === 'buy') {
    archive.buy = payload;
  } else {
    archive.sell = {
      ...(archive.sell || {}),
      [payload.stage]: payload
    };
  }

  if (!writeAnalysisArchive(archive)) return false;

  if (options.logMessage) {
    log(options.logMessage(payload));
  }
  return true;
}

function buildBuyAnalysisArchive(timeLabel = '') {
  const entries = getAllBuyEntries()
    .filter(entry => entry.liveRefresh)
    .map(entry => ({
      code: entry.code,
      name: entry.name,
      strategy: entry.strategy,
      liveRefresh: entry.liveRefresh
    }));

  if (!entries.length) return null;

  return {
    type: 'buy',
    label: '매수 분석',
    savedAt: new Date().toISOString(),
    analysisTime: timeLabel || getStageTimeLabel(),
    count: entries.length,
    liveGapState,
    entries
  };
}

function buildSellAnalysisArchive(isBefore0908, timeLabel = '') {
  const stage = isBefore0908 ? 'stage1' : 'stage2';
  const details = Object.values(stockDetailMap)
    .filter(detail => detail?.mode === 'sell' && detail.isBefore0908 === isBefore0908)
    .map(detail => ({
      code: detail.stock?.code || '',
      stock: detail.stock,
      data: detail.data,
      indicators: detail.indicators,
      decision: detail.decision,
      actionStage: detail.actionStage,
      triggeredRule: detail.triggeredRule,
      targets: detail.targets,
      gainRate: detail.gainRate,
      lossManagement: detail.lossManagement,
      isBefore0908: detail.isBefore0908,
      gapProfile: detail.gapProfile
    }));

  if (!details.length) return null;

  return {
    type: 'sell',
    stage,
    label: `매도 ${isBefore0908 ? '1차' : '2차'} 분석`,
    savedAt: new Date().toISOString(),
    analysisTime: timeLabel,
    count: details.length,
    liveGapState,
    details
  };
}

function saveAnalysisArchiveBeforeRecheck(mode, options = {}) {
  return saveAnalysisArchive(mode, {
    ...options,
    logMessage: payload => `💾 ${payload.label} 재검사 전 결과 ${payload.count}건을 로컬스토리지에 저장했습니다.`
  });
}

function saveAnalysisArchiveAfterAnalysis(mode, options = {}) {
  return saveAnalysisArchive(mode, {
    ...options,
    logMessage: payload => `💾 ${payload.label} 완료 결과 ${payload.count}건을 로컬스토리지에 저장했습니다.`
  });
}

function clearSellDetailMap() {
  Object.keys(stockDetailMap).forEach(code => delete stockDetailMap[code]);
}

function ensureArchivedSellStock(restoredStock) {
  if (!restoredStock?.code || !restoredStock?.type || !stocks[restoredStock.type]) return restoredStock;
  const existing = stocks[restoredStock.type].find(stock => stock.code === restoredStock.code);
  if (existing) return existing;
  const normalized = { ...restoredStock };
  stocks[restoredStock.type].push(normalized);
  return normalized;
}

function getLatestArchivedGapState(archive) {
  const candidates = [archive?.buy, archive?.sell?.stage1, archive?.sell?.stage2]
    .filter(item => item?.liveGapState && item?.savedAt)
    .sort((left, right) => new Date(right.savedAt).getTime() - new Date(left.savedAt).getTime());
  return candidates[0]?.liveGapState || null;
}

function restoreBuyAnalysisArchive(archiveItem) {
  if (!archiveItem?.entries?.length) return false;
  const entryMap = new Map(archiveItem.entries.map(entry => [entry.code, entry.liveRefresh]));
  let restored = 0;

  getAllBuyEntries().forEach(entry => {
    const liveRefresh = entryMap.get(entry.code);
    if (!liveRefresh) return;
    entry.liveRefresh = liveRefresh;
    restored += 1;
  });

  if (!restored) return false;
  renderBuyStockCards();
  return true;
}

function renderSellDetailToCard(detail) {
  const { stock, data, indicators, decision, actionStage, gainRate, lossManagement, gapProfile, targets } = detail;
  const card = document.getElementById(`card-${stock.code}`);
  if (!card) return;
  const priceRow = document.getElementById(`price-row-${stock.code}`);
  const meta = document.getElementById(`meta-${stock.code}`);
  const planBox = document.getElementById(`plan-${stock.code}`);
  const indBox = document.getElementById(`ind-${stock.code}`);
  const badge = document.getElementById(`badge-${stock.code}`);
  const entry = getEntryByCode(stock.code);
  const entryPrice = stock.entryPrice || targets?.entryPrice || entry?.entryPriceValue || data.prevClose;
  const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
  const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
  const absChg = Math.abs(data.chgRate).toFixed(2);
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

  const visibleIndicators = indicators.filter(ind => ind.status !== 'unknown' || ind.title === '갭 등급 조정');
  const displayIndicators = visibleIndicators.length > 0 ? visibleIndicators : indicators;
  let cardIndicatorHtml = displayIndicators
    .map(indicator => `<div class="ind-item ${indicator.status}">${indicator.title}: ${indicator.result}</div>`)
    .join('');

  if (stock.type === 'swing' && lossManagement && gainRate < 0) {
    cardIndicatorHtml += `<div class="ind-item ${lossManagement.totalScore >= lossManagement.holdThreshold ? 'clear' : lossManagement.totalScore >= lossManagement.cautionThreshold ? 'unknown' : 'triggered'}" style="margin-top:4px;font-weight:700">
      손실 관리: ${lossManagement.verdict} | 최대손절 ${lossManagement.maxStopPrice.toLocaleString()}원 | 권장손절 ${lossManagement.recommendedStopPrice.toLocaleString()}원
    </div>`;
  }

  indBox.innerHTML = cardIndicatorHtml;
  if (planBox) {
    planBox.innerHTML = buildSellCardPlanSummary(stock.code);
  }

  card.className = `scard ${decision}`;
  const badgeInfo = getActionBadge(decision, actionStage);
  badge.className = `badge ${badgeInfo.cls}`;
  badge.innerText = badgeInfo.text;

  const shiftBadge = document.getElementById(`gap-shift-${stock.code}`);
  const shiftBadgeInfo = getGapComparisonBadge(gapProfile?.comparison);
  if (shiftBadge) {
    if (shiftBadgeInfo) {
      shiftBadge.className = `badge badge-shift ${shiftBadgeInfo.cls}`;
      shiftBadge.innerText = shiftBadgeInfo.text;
      shiftBadge.title = shiftBadgeInfo.detail;
      shiftBadge.style.display = 'inline-flex';
    } else {
      shiftBadge.className = 'badge badge-shift';
      shiftBadge.innerText = '';
      shiftBadge.title = '';
      shiftBadge.style.display = 'none';
    }
  }

  const newCard = card.cloneNode(true);
  card.parentNode.replaceChild(newCard, card);
  newCard.addEventListener('click', () => openModal(stock.code, 'sell'));
}

function restoreSellAnalysisArchive(archiveItem) {
  if (!archiveItem?.details?.length) return false;

  clearSellDetailMap();
  archiveItem.details.forEach(savedDetail => {
    ensureArchivedSellStock(savedDetail.stock);
  });
  renderSellStockCards();

  archiveItem.details.forEach(savedDetail => {
    const stock = ensureArchivedSellStock(savedDetail.stock);
    const restoredDetail = {
      ...savedDetail,
      mode: 'sell',
      stock
    };
    stockDetailMap[stock.code] = restoredDetail;
    renderSellDetailToCard(restoredDetail);
  });

  return true;
}

function restoreAnalysisArchiveState() {
  const archive = readAnalysisArchive();
  const latestGapState = getLatestArchivedGapState(archive);
  if (latestGapState) {
    liveGapState = latestGapState;
  }

  const buyRestored = restoreBuyAnalysisArchive(archive.buy);
  const sellRestored = restoreSellAnalysisArchive(getActiveArchiveForTab('sell'));

  updateAnalyzeButtonState();
  updateCurrentTime();
  return { buyRestored, sellRestored };
}

function syncBodyScrollLock() {
  const hasOpenModal = document.querySelector('.modal-overlay.open');
  document.body.classList.toggle('modal-scroll-locked', Boolean(hasOpenModal));
}

function createEmptySnapshot() {
  return {
    regimeTable: [],
    regimeEvidence: [],
    regimeAlert: '',
    gapScore: createEmptyGapScore(),
    pullbackEntries: [],
    momentumEntries: [],
    reversalEntries: [],
    swingEntries: [],
    sourceText: ''
  };
}

function log(msg) {
  const out = document.getElementById('log-output');
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
  out.innerHTML += `<div><span class="time">[${timeStr}]</span> ${msg}</div>`;
  out.scrollTop = out.scrollHeight;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeText(text) {
  return String(text ?? '')
    .replace(/\u200b|\u00a0/g, ' ')
    .replace(/data:image\/gif;base64,[^\s)]+/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeHeading(text) {
  return sanitizeText(text)
    .replace(/[📊🔥📰🚨⚠️✅⛔]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatWon(value) {
  if (!value) return '—';
  return `${Number(value).toLocaleString()}원`;
}

function extractFirstNumber(text) {
  const match = String(text ?? '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatSignedPercent(value) {
  if (!Number.isFinite(value)) return '—';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}

function formatCompactDate(value) {
  const text = String(value ?? '').trim();
  if (!/^\d{8}$/.test(text)) return text;
  return `${text.slice(0, 4)}.${text.slice(4, 6)}.${text.slice(6, 8)}`;
}

function parseStockHeader(line, strategy) {
  const match = line.match(/^(\d+)위\.\s*([^()]+?)\s*\((\d{6})\)\s*[—\-–]\s*([\d.]+)\/10\s*\[([^\]]+)\]\s*[—\-–←]\s*(.+)$/);
  if (!match) return null;
  return {
    rank: Number(match[1]),
    name: match[2].trim(),
    code: match[3],
    score: Number(match[4]),
    grade: match[5].trim(),
    statusLabel: match[6].trim(),
    strategy,
    type: strategy,
    gates: [],
    matchedRules: [],
    unmatchedRules: [],
    entryPriceText: '',
    entryPriceValue: null,
    entryMeta: '',
    rationale: '',
    keyPoint: '',
    rr: '',
    notes: [],
    tradePlanRows: [],
    liveRefresh: null
  };
}

function parseGateTokens(text) {
  const matches = [...text.matchAll(/(G\d)\s*(✅|⚠️|⛔)?(?:\(([^)]*)\))?/g)];
  return matches.map(match => ({
    code: match[1],
    status: match[2] || '미상',
    note: match[3]?.trim() || ''
  }));
}

function parseRuleCodes(segment) {
  return String(segment ?? '')
    .split(/[·,]/)
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => {
      const codeMatch = item.match(/([SPCG]\d)/);
      return {
        code: codeMatch ? codeMatch[1] : item,
        note: item.replace(/^([SPCG]\d)/, '').replace(/^[:(\s]+|[)\s]+$/g, '').trim()
      };
    });
}

function parseEntryMetaLine(entry, line) {
  if (line.startsWith('Gate:')) {
    entry.gates = parseGateTokens(line);
    return;
  }

  if (/^충족\s*:/.test(line)) {
    const normalized = line.replace(/미\s*충족/g, '미충족');
    const [matchedPart, unmatchedPart = ''] = normalized.split('/ 미충족:');
    entry.matchedRules = parseRuleCodes(matchedPart.replace(/^충족\s*:/, '').trim());
    entry.unmatchedRules = parseRuleCodes(unmatchedPart.trim());
    return;
  }

  const stripped = line.replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}⚖💰🔔⚠️]+\s*/u, '');

  if (/^진입\s*가\s*:/.test(stripped)) {
    entry.entryPriceText = stripped.replace(/^진입\s*가\s*:/, '').trim();
    entry.entryPriceValue = extractFirstNumber(entry.entryPriceText);
    const metaMatch = entry.entryPriceText.match(/\(([^)]*)\)/);
    entry.entryMeta = metaMatch ? metaMatch[1].trim() : '';
    return;
  }

  if (/^근거\s*:/.test(stripped)) {
    entry.rationale = stripped.replace(/^근거\s*:/, '').trim();
    return;
  }

  if (/^핵심(?:\s*포인트)?\s*:/.test(stripped)) {
    entry.keyPoint = stripped.replace(/^핵심(?:\s*포인트)?\s*:/, '').trim();
    return;
  }

  if (/^리스크\s*:/.test(stripped)) {
    entry.notes.push(line);
    return;
  }

  if (/^R\/R\s*:/.test(stripped)) {
    entry.rr = stripped.replace(/^R\/R\s*:/, '').trim();
    return;
  }

  entry.notes.push(line);
}

function parseMarkdownTable(lines, startIndex) {
  const tableLines = [];
  let index = startIndex;

  while (index < lines.length && /^\|/.test(lines[index])) {
    tableLines.push(lines[index]);
    index += 1;
  }

  if (tableLines.length < 2) {
    return { rows: [], nextIndex: startIndex };
  }

  const hasSeparatorRow = /^\|(?:\s*:?-{3,}:?\s*\|)+$/.test(tableLines[1]);
  const rows = tableLines
    .filter((line, idx) => !(hasSeparatorRow && idx === 1))
    .map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));

  return { rows, nextIndex: index };
}

function flattenNotionBlocks(data) {
  const blockMap = new Map(
    Object.entries(data)
      .map(([id, wrapper]) => [id, wrapper?.value?.value])
      .filter(([, block]) => Boolean(block))
  );
  const pageEntry = [...blockMap.entries()].find(([, block]) => block.type === 'page');
  const ordered = [];
  const visited = new Set();

  function visitBlock(id) {
    if (!id || visited.has(id) || !blockMap.has(id)) return;
    visited.add(id);
    const block = blockMap.get(id);
    ordered.push(block);
    (block.content ?? []).forEach(visitBlock);
  }

  if (pageEntry) {
    const [pageId, pageBlock] = pageEntry;
    visited.add(pageId);
    ordered.push(pageBlock);
    (pageBlock.content ?? []).forEach(visitBlock);
  }

  blockMap.forEach((block, id) => {
    if (!visited.has(id)) ordered.push(block);
  });

  return ordered;
}

function buildSourceTextFromNotion(data) {
  const blocks = flattenNotionBlocks(data)
    .map(block => ({
      block,
      text: sanitizeText((block.properties?.title ?? []).map(t => t[0]).join('')),
      cells: Object.values(block.properties ?? {}).map(value => sanitizeText((value ?? []).map(item => item[0]).join(''))).filter(Boolean)
    }))
    .filter(item => item.text || item.block.type === 'table_row');

  const lines = [];
  let currentTableColumns = null;

  blocks.forEach(({ block, text, cells }) => {
    if (block.type === 'table') {
      currentTableColumns = block.format?.table_block_column_order ?? null;
      return;
    }
    if (block.type === 'table_row') {
      const orderedCells = (currentTableColumns ?? Object.keys(block.properties ?? {}))
        .map(key => sanitizeText((block.properties?.[key] ?? []).map(item => item[0]).join('')))
        .filter(Boolean);
      lines.push(`| ${orderedCells.join(' | ')} |`);
      return;
    }
    if (block.type === 'divider') {
      currentTableColumns = null;
      return;
    }
    if (block.type === 'quote') {
      lines.push(`> ${text}`);
      return;
    }
    if (block.type === 'bulleted_list') {
      lines.push(`- ${text}`);
      return;
    }

    const heading = normalizeHeading(text);
    if (heading.includes('시장 레짐') || heading.includes('레짐 판정')) {
      lines.push('## 시장 레짐 요약');
      return;
    }
    if (heading.includes('갭 예측 스코어') || heading.includes('갭 스코어')) {
      lines.push('## 익일 갭 예측 스코어');
      return;
    }
    if (heading.includes('눌림목') && heading.includes('종가베팅')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.includes('수급') && heading.includes('종가베팅')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.includes('급락 반등') || heading.includes('전략 ③')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.includes('스윙') && heading.includes('전환') && heading.includes('평가')) {
      lines.push('## 스윙 전환 평가');
      return;
    }
    if (heading.startsWith('내일(') || heading.includes('체크리스트')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.includes('뉴스 인사이트')) {
      lines.push('## 뉴스 인사이트');
      return;
    }
    if (/^\d+위\./.test(text)) {
      lines.push(`### ${text}`);
      return;
    }
    lines.push(text);
  });

  return lines.join('\n');
}

function parseNotionSnapshotFromText(sourceText) {
  const snapshot = createEmptySnapshot();
  snapshot.sourceText = sourceText;
  const lines = sanitizeText(sourceText).split('\n').map(line => line.trim()).filter(Boolean);

  let currentSection = '';
  let currentEntry = null;
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    const headingMatch = line.match(/^#{2,3}\s*(.+)$/);
    if (headingMatch) {
      currentEntry = null;
      const heading = normalizeHeading(headingMatch[1]);
      if (!/^\d+위\./.test(heading)) {
        if (heading.includes('시장 레짐') || heading.includes('레짐 판정') || heading.includes('레짐 요약')) {
          currentSection = 'regime';
        } else if (heading.includes('익일 갭 예측 스코어') || heading.includes('갭 예측 스코어') || heading.includes('갭 스코어')) {
          currentSection = 'gap';
        } else if (heading.includes('스윙') && heading.includes('전환') && heading.includes('평가')) {
          currentSection = 'swing';
        } else if (heading.includes('눌림목') && heading.includes('종가베팅')) {
          currentSection = 'pullback';
        } else if (heading.includes('수급') && heading.includes('종가베팅')) {
          currentSection = 'momentum';
        } else if (heading.includes('급락 반등') || heading.includes('전략 ③')) {
          currentSection = 'reversal';
        } else {
          currentSection = 'other';
        }
        index += 1;
        continue;
      }
    }

    if (currentSection === 'regime' && /^\|/.test(line)) {
      const { rows, nextIndex } = parseMarkdownTable(lines, index);
      if (rows.length > 1) {
        const colCount = rows[0].length;
        let parsed = [];
        if (colCount === 2) {
          parsed = rows.slice(1).map(row => ({ item: row[0] || '', value: row[1] || '' }));
        } else if (colCount >= 3) {
          snapshot.regimeEvidence.push(...rows.slice(1).map(row => ({
            item: stripMarkdownText(row[0] || ''),
            value: stripMarkdownText(row[1] || ''),
            verdict: stripMarkdownText(row[2] || '')
          })).filter(row => row.item || row.value || row.verdict));
        }
        parsed.forEach(entry => {
          const existing = snapshot.regimeTable.find(r => r.item === entry.item);
          if (!existing) snapshot.regimeTable.push(entry);
        });
      }
      index = nextIndex;
      continue;
    }

    if (currentSection === 'regime' && line.startsWith('>')) {
      snapshot.regimeAlert = line.replace(/^>\s*/, '').trim();
      index += 1;
      continue;
    }

    if (currentSection === 'gap' && /^\|/.test(line)) {
      const { rows, nextIndex } = parseMarkdownTable(lines, index);
      if (rows.length > 1) parseGapScoreRows(rows, snapshot.gapScore);
      index = nextIndex;
      continue;
    }

    if (currentSection === 'gap') {
      const plainLine = stripMarkdownText(line);
      if (plainLine.startsWith('갭 등급:')) {
        snapshot.gapScore.grade = plainLine.replace(/^갭 등급:\s*/, '').trim();
      } else if (plainLine.startsWith('진입 조정:')) {
        snapshot.gapScore.entryAdjustment = plainLine.replace(/^진입 조정:\s*/, '').trim();
      } else if (plainLine.startsWith('매도 조정:')) {
        snapshot.gapScore.sellAdjustment = plainLine.replace(/^매도 조정:\s*/, '').trim();
      } else if (plainLine.startsWith('스윙 전환:')) {
        snapshot.gapScore.swingAdjustment = plainLine.replace(/^스윙 전환:\s*/, '').trim();
      } else if (plainLine.startsWith('특이사항:')) {
        snapshot.gapScore.note = plainLine.replace(/^특이사항:\s*/, '').trim();
      }
      index += 1;
      continue;
    }

    if (currentSection === '' && line.startsWith('>') && line.includes('레짐')) {
      const regimeQuote = line.replace(/^>\s*/, '').trim();
      const segments = regimeQuote.split(/\s*\|\s*/);
      segments.forEach(segment => {
        const subParts = segment.split(/\s+(?=(?:진입 전략|스윙 전환 활성도|스윙 전환|시가베팅)[：:])/);
        subParts.forEach(part => {
          const colonMatch = part.match(/^([^:：]+)[：:]\s*(.+)$/);
          if (colonMatch) {
            const key = colonMatch[1].replace(/시장\s*/, '').trim();
            const val = colonMatch[2].trim();
            if (key && val) snapshot.regimeTable.push({ item: key, value: val });
          }
        });
      });
      index += 1;
      continue;
    }

    if (currentSection === 'swing' && /^[>\s]*[-*]/.test(line)) {
      const swingLine = line.replace(/^[>\s]*[-*]\s*/, '').replace(/\*\*/g, '').trim();
      const codeMatch = swingLine.match(/^(.+?)\((\d{6})\)\s+(.+)$/);
      if (codeMatch) {
        const name = codeMatch[1].trim();
        const code = codeMatch[2];
        const rest = codeMatch[3];
        const dateMatch = rest.match(/(\d+\.\d+)/);
        const priceMatch = rest.match(/([\d,]+)\s*원/);
        const buyDate = dateMatch ? dateMatch[1] : '';
        const entryPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;
        const statusMatch = rest.match(/원\s*(.+)$/);
        const status = statusMatch ? statusMatch[1].trim() : '';
        snapshot.swingEntries.push({ name, code, buyDate, entryPrice, status });
      }
      index += 1;
      continue;
    }

    if ((currentSection === 'pullback' || currentSection === 'momentum' || currentSection === 'reversal') && line.startsWith('### ')) {
      currentEntry = parseStockHeader(line.replace(/^###\s*/, '').trim(), currentSection);
      if (currentEntry) snapshot[`${currentSection}Entries`].push(currentEntry);
      index += 1;
      continue;
    }

    if (currentEntry && line.startsWith('|')) {
      const { rows, nextIndex } = parseMarkdownTable(lines, index);
      if (rows.length > 1) {
        const headerIndex = Object.fromEntries(rows[0].map((header, headerPosition) => [header.replace(/\s+/g, ''), headerPosition]));
        currentEntry.tradePlanRows = rows.slice(1).map(row => ({
          stage: row[headerIndex['단계']] || '',
          condition: row[headerIndex['조건']] || '',
          quantity: row[headerIndex['수량']] || '',
          targetYield: row[headerIndex['목표수익률']] || '',
          targetPrice: row[headerIndex['목표가']] || ''
        }));
      }
      index = nextIndex;
      continue;
    }

    if (currentEntry && (/^[-*>]/.test(line) || line.startsWith('R/R:'))) {
      parseEntryMetaLine(currentEntry, line.replace(/^[-*>]\s*/, '').trim());
    }

    index += 1;
  }

  return snapshot;
}

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

function buildLiveBuyStatusLabel(liveRefresh) {
  if (Number.isFinite(liveRefresh.upsideRate)) {
    return `목표가 ${formatSignedPercent(liveRefresh.upsideRate)}`;
  }
  return `컨센서스 ${liveRefresh.recommMean.toFixed(2)} / 5.00`;
}

function getBuyPresentation(entry) {
  const liveRefresh = entry.liveRefresh;
  const score = liveRefresh?.score ?? entry.score;
  const grade = liveRefresh?.grade ?? entry.grade;
  const statusLabel = liveRefresh?.statusLabel ?? entry.statusLabel;

  return {
    score,
    grade,
    statusLabel,
    verdictClass: getBuyVerdictClassFromGrade(grade),
    liveRefresh,
    changed: {
      score: Boolean(liveRefresh && Math.abs(score - entry.score) >= 0.05),
      grade: Boolean(liveRefresh && grade !== entry.grade),
      statusLabel: Boolean(liveRefresh && statusLabel !== entry.statusLabel)
    }
  };
}

async function refreshBuyEntry(code, options = {}) {
  const entry = getEntryByCode(code);
  if (!entry) return;

  const {
    triggerButton = null,
    suppressAlert = false,
    logLabel = '개별 분석'
  } = options;

  if (triggerButton) {
    triggerButton.disabled = true;
    triggerButton.textContent = '분석 중...';
  }

  log(`- [${entry.name}] 네이버 컨센서스 기반 ${logLabel}을 시작합니다...`);
  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt += 1) {
    try {
      const proxy = PROXIES[(attempt - 1) % PROXIES.length];
      const basicUrl = `https://m.stock.naver.com/api/stock/${entry.code}/basic`;
      const integrationUrl = `https://m.stock.naver.com/api/stock/${entry.code}/integration`;

      const [basicRes, integrationRes] = await Promise.all([
        fetch(proxy + encodeURIComponent(basicUrl)),
        fetch(proxy + encodeURIComponent(integrationUrl))
      ]);

      if (!basicRes.ok) throw new Error(`basic API error (${basicRes.status})`);
      if (!integrationRes.ok) throw new Error(`integration API error (${integrationRes.status})`);

      const basicJson = await basicRes.json();
      const integrationJson = await integrationRes.json();
      const consensusInfo = integrationJson.consensusInfo || {};
      const recommMean = Number.parseFloat(String(consensusInfo.recommMean ?? '').replace(/,/g, ''));

      if (!Number.isFinite(recommMean) || recommMean <= 0) {
        throw new Error('consensus grade unavailable');
      }

      const currentPrice = extractFirstNumber(basicJson.closePrice ?? basicJson.stockPrice ?? 0) ?? 0;
      const targetPrice = extractFirstNumber(consensusInfo.priceTargetMean);
      const upsideRate = currentPrice > 0 && Number.isFinite(targetPrice)
        ? ((targetPrice - currentPrice) / currentPrice) * 100
        : null;
      const score = clamp(recommMean * 2, 0, 10);
      const grade = getBuyGradeFromScore(score, entry.strategy);

      entry.liveRefresh = {
        recommMean,
        score,
        grade,
        currentPrice,
        targetPrice,
        upsideRate,
        statusLabel: buildLiveBuyStatusLabel({ recommMean, upsideRate }),
        asOf: consensusInfo.createDate || basicJson.localTradedAt || '',
        refreshedAt: new Date().toISOString()
      };

      renderBuyStockCards();
      if (currentModalState.mode === 'buy' && currentModalState.code === code && document.getElementById('modal-overlay').classList.contains('open')) {
        openModal(code, 'buy');
      }

      log(`- [${entry.name}] 최신화 완료: 네이버 컨센서스 ${recommMean.toFixed(2)}/5.00 → ${score.toFixed(1)}점 (${grade}등급)`);
      return true;
    } catch (error) {
      if (attempt <= maxRetries) {
        log(`<span style="color:var(--text-warning)">- [${entry.name}] ${logLabel} 재시도 중입니다... (${attempt}회 실패)</span>`);
      } else {
        log(`<span style="color:var(--text-danger)">- [${entry.name}] 네이버 컨센서스 최신화에 실패했습니다.</span>`);
        console.error(error);
        if (!suppressAlert) {
          alert(`${entry.name} (${entry.code})의 네이버 컨센서스 정보를 가져오지 못했습니다.`);
        }
      }
    }
  }

  if (triggerButton) {
    triggerButton.disabled = false;
    triggerButton.textContent = entry.liveRefresh ? '다시 분석' : '개별 분석';
  }

  return false;
}

function renderRegimeSummary() {
  const container = document.getElementById('buy-regime-summary');
  if (!container) return;

  const hasDetailedGapScore = notionSnapshot.gapScore.rows.length > 0;
  const summaryRows = notionSnapshot.regimeTable.filter(row => {
    if (!hasDetailedGapScore) return true;
    const key = normalizeRegimeGuideKey(row.item);
    return key !== '갭 스코어' && key !== '갭 조정';
  });

  if (!summaryRows.length && !hasDetailedGapScore) {
    container.innerHTML = '<div class="empty-state">노션에서 시장 레짐 요약을 불러오면 여기에 표시됩니다.</div>';
    return;
  }

  container.innerHTML = `
    ${summaryRows.length ? `
    <div class="regime-summary-grid">
      ${summaryRows.map(row => `
        ${(() => {
          const guideText = getRegimeGuideText(row.item);
          const inlineHelp = getRegimeInlineHelp(row);
          return `
        <div class="regime-stat-card">
          <div class="regime-stat-label">
            <span>${escapeHtml(row.item)}</span>
            ${guideText ? `
              <span class="regime-help">
                <button type="button" class="regime-help-trigger" aria-label="${escapeHtml(`${row.item} 설명 보기`)}">?</button>
                <span class="regime-help-tooltip" role="tooltip">${escapeHtml(guideText)}</span>
              </span>
            ` : ''}
          </div>
          <div class="regime-stat-value">${escapeHtml(row.value)}</div>
          ${inlineHelp ? `<div class="regime-stat-note">${escapeHtml(inlineHelp)}</div>` : ''}
        </div>
      `;
        })()}
      `).join('')}
    </div>
    ` : ''}
    ${renderGapScoreSummary()}
    ${notionSnapshot.regimeAlert ? `<div class="regime-alert">${escapeHtml(notionSnapshot.regimeAlert)}</div>` : ''}
  `;

  const gapGradeTrigger = container.querySelector('.gap-score-grade-trigger');
  if (gapGradeTrigger) {
    gapGradeTrigger.addEventListener('click', openGapGuideModal);
  }

  container.querySelectorAll('.regime-help').forEach(help => {
    const tooltip = help.querySelector('.regime-help-tooltip');
    const openTooltip = () => {
      help.classList.add('is-open');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateY(0)';
      }
    };
    const closeTooltip = () => {
      help.classList.remove('is-open');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translateY(4px)';
      }
    };

    help.addEventListener('mouseenter', openTooltip);
    help.addEventListener('mouseleave', closeTooltip);

    const trigger = help.querySelector('.regime-help-trigger');
    if (trigger) {
      trigger.addEventListener('focus', openTooltip);
      trigger.addEventListener('blur', closeTooltip);
    }
  });
}

function renderGuideTables() {
  document.getElementById('guide-regime-table').innerHTML = `
    <table class="guide-table">
      <thead><tr><th>상태</th><th>조건</th><th>눌림목</th><th>수급매집형</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.regimes.map(row => `<tr><td>${escapeHtml(row.state)}</td><td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.pullback)}</td><td>${escapeHtml(row.momentum)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-grade-table').innerHTML = `
    <div class="guide-subtitle">추세 추종 전략 (눌림목·수급매집형)</div>
    <table class="guide-table">
      <thead><tr><th>등급</th><th>점수</th><th>의미</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.trendGrades.map(row => `<tr><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.score)}</td><td>${escapeHtml(row.meaning)}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="guide-subtitle">역추세 전략 (전략 ③)</div>
    <table class="guide-table">
      <thead><tr><th>등급</th><th>점수</th><th>의미</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.reversalGrades.map(row => `<tr><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.score)}</td><td>${escapeHtml(row.meaning)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-permission-table').innerHTML = `
    <table class="guide-table">
      <thead><tr><th>레짐</th><th>S (9.0+)</th><th>A (7.5~8.9)</th><th>B (6.0~7.4)</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.permissions.map(row => `<tr><td>${escapeHtml(row.regime)}</td><td>${escapeHtml(row.s)}</td><td>${escapeHtml(row.a)}</td><td>${escapeHtml(row.b)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-adjust-table').innerHTML = `
    <div class="guide-subtitle">추세 추종 전략</div>
    <table class="guide-table">
      <thead><tr><th>VKOSPI</th><th>최종 점수 보정</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.trendVkospiAdjustments.map(row => `<tr><td>${escapeHtml(row.range)}</td><td>${escapeHtml(row.rule)}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="guide-subtitle">역추세 전략 (전략 ③)</div>
    <table class="guide-table">
      <thead><tr><th>VKOSPI</th><th>최종 점수 보정</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.reversalVkospiAdjustments.map(row => `<tr><td>${escapeHtml(row.range)}</td><td>${escapeHtml(row.rule)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function buildSellCardPlanSummary(code) {
  const detail = stockDetailMap[code];
  const entry = getEntryByCode(code);
  if (!entry || !entry.tradePlanRows || !entry.tradePlanRows.length) {
    if (detail?.mode === 'sell') {
      return renderSellStrategyPlan(detail, true);
    }
    return '<div class="scard-plan-empty">매매 단계 정보 없음</div>';
  }

  const findRow = prefix => entry.tradePlanRows.find(r => r.stage && r.stage.includes(prefix));
  const premarket = findRow('프리마켓') || findRow('🌅');
  const openPhase = findRow('장초반') || findRow('🔔');
  const intraday = findRow('장중') || findRow('📈');
  const swing = findRow('스윙') || findRow('📊');
  const stopLoss = findRow('손절') || findRow('🛑');

  const tags = [];
  if (premarket) tags.push(`<span class="plan-tag target">🌅 ${escapeHtml(premarket.targetYield || premarket.targetPrice || '')}</span>`);
  if (openPhase) tags.push(`<span class="plan-tag target">🔔 ${escapeHtml(openPhase.targetYield || openPhase.targetPrice || '')}</span>`);
  if (intraday) tags.push(`<span class="plan-tag target">📈 ${escapeHtml(intraday.targetYield || intraday.targetPrice || '')}</span>`);
  if (swing) tags.push(`<span class="plan-tag swing">📊 스윙전환</span>`);
  if (stopLoss) tags.push(`<span class="plan-tag stop">🛑 ${escapeHtml(stopLoss.targetYield || stopLoss.targetPrice || '')}</span>`);

  const entryPrice = entry.entryPriceValue ? `진입가: ${entry.entryPriceValue.toLocaleString()}원` : '';

  if (detail?.mode === 'sell') {
    return `
      ${renderSellStrategyPlan(detail, true)}
      <div class="scard-plan scard-plan-tags">
        <div class="plan-prices">${tags.join('')}</div>
        ${entryPrice ? `<div class="plan-entry">${entryPrice}</div>` : ''}
      </div>
    `;
  }

  return `
    <div class="scard-plan">
      <div class="plan-prices">${tags.join('')}</div>
      ${entryPrice ? `<div class="plan-entry">${entryPrice}</div>` : ''}
    </div>
  `;
}

function getSellStrategyStageMeta(stage) {
  const stageMap = {
    premarket: { icon: '🌅', title: '프리마켓 익절', shortTitle: '프리마켓' },
    openPhase: { icon: '🔔', title: '장초반 익절', shortTitle: '장초반' },
    intraday1: { icon: '📈', title: '장중 1차 익절', shortTitle: '1차 익절' },
    intraday2: { icon: '📈', title: '장중 2차 익절', shortTitle: '2차 익절' },
    swing: { icon: '📊', title: '스윙 전환', shortTitle: '스윙' },
    stopLoss: { icon: '🛑', title: '손절 라인', shortTitle: '손절' }
  };
  return stageMap[stage] || { icon: '•', title: stage || '전략', shortTitle: stage || '전략' };
}

function summarizeTradePlanRow(row) {
  if (!row) return '';
  const summaryParts = [];
  if (row.quantity) summaryParts.push(`수량 ${row.quantity}`);
  if (row.targetYield) summaryParts.push(`목표 ${row.targetYield}`);
  if (row.targetPrice) summaryParts.push(`목표가 ${row.targetPrice}`);
  return summaryParts.join(' · ');
}

function describeSellStrategyStage(stage, row, detail) {
  const rowSummary = summarizeTradePlanRow(row);
  const rowCondition = row?.condition ? stripMarkdownText(row.condition) : '';

  if (stage === 'premarket') {
    return `프리마켓에서 ${row?.quantity || '일부'} 익절 우선${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'openPhase') {
    return `장초반에 ${row?.quantity || '일부'} 정리${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'intraday1') {
    return `1차 목표 도달 시 ${row?.quantity || '일부'} 차익실현${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'intraday2') {
    return `2차 목표 도달 시 ${row?.quantity || '잔여 물량'} 추가 정리${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'swing') {
    if (detail?.gapProfile?.swingMode === 'ban') {
      return '현재 갭 조건에서는 스윙 전환 금지, 당일 정리 우선';
    }
    if (detail?.gapProfile?.swingMode === 'conditional') {
      return `잔여 물량만 조건부 스윙 검토${rowSummary ? ` · ${rowSummary}` : ''}`;
    }
    return `잔여 물량만 스윙 전환 검토${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'stopLoss') {
    return `손절선 이탈 시 전량 매도${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  return rowSummary || rowCondition || '세부 전략 확인';
}

function buildSyntheticSellStrategyItem(detail) {
  if (!detail) return null;

  if (detail.actionStage === 'reject' || detail.actionStage === 'loss_cut') {
    return {
      status: 'blocked',
      icon: '🛑',
      title: '즉시 손절 또는 전량 매도',
      description: detail.triggeredRule?.result || '핵심 손절 조건이 충족되어 전량 매도 우선입니다.',
      note: detail.triggeredRule?.value || ''
    };
  }

  if (detail.actionStage === 'partial_exit') {
    const reason = detail.triggeredRule?.result
      || detail.lossManagement?.verdict
      || (detail.gapProfile?.swingMode === 'ban'
        ? '스윙 전환 금지 구간이므로 일부 익절 후 현금화 우선입니다.'
        : '현재 구간에서는 보유 물량 30~50%를 먼저 줄이고 나머지 물량만 장중 확인합니다.');
    return {
      status: 'active',
      icon: '🟡',
      title: '지금은 비중 축소 우선',
      description: reason,
      note: detail.gapProfile?.summary || ''
    };
  }

  if (detail.actionStage === 'hold') {
    return {
      status: 'active',
      icon: '✅',
      title: '지금은 홀딩 유지',
      description: '아직 익절 목표 또는 손절 조건이 확정적으로 충족되지 않아 보유 유지가 우선입니다.',
      note: detail.gapProfile?.summary || ''
    };
  }

  if (detail.actionStage === 'wait') {
    return {
      status: 'available',
      icon: '⏳',
      title: '장 시작 전 대기',
      description: '프리마켓 또는 시초가 확인 전까지는 대기하고 첫 실행 가격부터 다시 판단합니다.',
      note: ''
    };
  }

  if (detail.actionStage === 'underwater') {
    return {
      status: 'active',
      icon: '⚠️',
      title: '평가손 관리 우선',
      description: detail.lossManagement?.verdict || '평가손 구간이므로 손절선과 손실 관리 점수를 우선 확인합니다.',
      note: detail.lossManagement ? `권장 손절가 ${detail.lossManagement.recommendedStopPrice.toLocaleString()}원` : ''
    };
  }

  return null;
}

function buildSellStrategyPlan(detail) {
  const entry = getEntryByCode(detail?.stock?.code || '');
  const targets = detail?.targets || parseTradePlanTargets(entry);
  const items = [];
  const currentItem = buildSyntheticSellStrategyItem(detail);
  const stageOrder = ['premarket', 'openPhase', 'intraday1', 'intraday2', 'swing'];

  if (currentItem) items.push(currentItem);

  stageOrder.forEach(stage => {
    const target = targets?.[stage];
    if (!target?.row) return;
    const meta = getSellStrategyStageMeta(stage);
    let status = detail?.actionStage === stage ? 'active' : 'available';

    if (stage === 'swing' && detail?.gapProfile?.swingMode === 'ban') {
      status = 'blocked';
    } else if (stage === 'swing' && detail?.gapProfile?.swingMode === 'conditional' && detail?.actionStage !== stage) {
      status = 'guard';
    }

    items.push({
      status,
      icon: meta.icon,
      title: meta.title,
      description: describeSellStrategyStage(stage, target.row, detail),
      note: target.row.condition ? stripMarkdownText(target.row.condition) : ''
    });
  });

  const stopLossRow = targets?.stopLoss?.row;
  if (stopLossRow || detail?.targets?.entryPrice || detail?.data?.prevClose) {
    items.push({
      status: detail?.decision === 'sell' ? 'blocked' : 'guard',
      icon: '🛑',
      title: '손절 라인 점검',
      description: describeSellStrategyStage('stopLoss', stopLossRow, detail),
      note: stopLossRow?.condition ? stripMarkdownText(stopLossRow.condition) : ''
    });
  }

  if (!items.length) {
    items.push({
      status: 'available',
      icon: '•',
      title: '기본 전략 확인',
      description: '노션 매매 단계 또는 분석 결과를 기반으로 다시 판단합니다.',
      note: ''
    });
  }

  const headlineItem = items[0];
  return {
    headline: headlineItem.title,
    headlineDetail: headlineItem.description,
    items
  };
}

function renderSellStrategyPlan(detail, compact = false) {
  const plan = buildSellStrategyPlan(detail);
  const limit = compact ? 3 : plan.items.length;
  const visibleItems = plan.items.slice(0, limit);

  return `
    <div class="${compact ? 'scard-plan scard-plan-current' : 'sell-strategy-panel'}">
      <div class="${compact ? 'plan-current-title' : 'modal-section-label'}">${compact ? '현재 유효 전략' : '🎯 현재 유효한 매매 전략'}</div>
      <div class="${compact ? 'plan-current-summary' : 'sell-strategy-summary'}">${escapeHtml(plan.headline)}: ${escapeHtml(plan.headlineDetail)}</div>
      <div class="${compact ? 'plan-checklist' : 'sell-strategy-list'}">
        ${visibleItems.map(item => `
          <div class="${compact ? `plan-check ${item.status}` : `modal-ind-card ${item.status === 'blocked' ? 'triggered' : item.status === 'active' ? 'clear' : 'unknown'} sell-strategy-item`}">
            ${compact ? `
              <span class="plan-check-icon">${escapeHtml(item.icon)}</span>
              <div class="plan-check-content">
                <div class="plan-check-title">${escapeHtml(item.title)}</div>
                <div class="plan-check-text">${escapeHtml(item.description)}</div>
              </div>
            ` : `
              <div class="modal-ind-icon">${escapeHtml(item.icon)}</div>
              <div class="modal-ind-content">
                <div class="modal-ind-title">${escapeHtml(item.title)}</div>
                <div class="modal-ind-result">→ ${escapeHtml(item.description)}</div>
                ${item.note ? `<div class="modal-ind-value">📐 ${escapeHtml(item.note)}</div>` : ''}
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSellStockCards() {
  const renderGroup = (arr, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!arr.length) {
      container.innerHTML = '<div class="empty-state">추출된 종목이 없습니다.</div>';
      return;
    }

    arr.forEach(stock => {
      const planHtml = buildSellCardPlanSummary(stock.code);
      container.innerHTML += `
        <div class="scard" id="card-${stock.code}">
          <div class="scard-head">
            <div>
              <div class="scard-name">${escapeHtml(stock.name)}</div>
              <div class="scard-code">${escapeHtml(stock.code)}</div>
            </div>
            <div class="scard-badges">
              <span class="badge badge-shift" id="gap-shift-${stock.code}" style="display:none"></span>
              <span class="badge badge-pending" id="badge-${stock.code}">대기 중</span>
            </div>
          </div>
          <div class="price-row" id="price-row-${stock.code}">
            <span class="price placeholder-price">대기 중</span>
          </div>
          <div class="meta" id="meta-${stock.code}">매수가(전일종가): 대기 중</div>
          <div id="plan-${stock.code}">${planHtml}</div>
          <div class="indicators" id="ind-${stock.code}">
            <div class="ind-item unknown">상단에서 분석 시작 버튼을 눌러주세요.</div>
          </div>
        </div>
      `;
    });
  };

  renderGroup(stocks.pullback, 'list-pullback');
  renderGroup(stocks.momentum, 'list-momentum');
  renderSwingCards();
}

function renderSwingCards() {
  const container = document.getElementById('list-swing');
  if (!container) return;
  container.innerHTML = '';
  if (!stocks.swing.length) {
    container.innerHTML = '<div class="empty-state">스윙 보유 종목이 없습니다.</div>';
    return;
  }

  stocks.swing.forEach(stock => {
    const planHtml = buildSellCardPlanSummary(stock.code);
    container.innerHTML += `
      <div class="scard swing-card" id="card-${stock.code}">
        <div class="scard-head">
          <div>
            <div class="scard-name">${escapeHtml(stock.name)}</div>
            <div class="scard-code">${escapeHtml(stock.code)}</div>
          </div>
          <div class="scard-badges">
            <span class="badge badge-shift" id="gap-shift-${stock.code}" style="display:none"></span>
            <span class="badge badge-swing" id="badge-${stock.code}">스윙 보유</span>
          </div>
        </div>
        <div class="swing-meta">
          <span class="swing-meta-item">매수일 ${escapeHtml(stock.buyDate)}</span>
          <span class="swing-meta-item">매수가 ${stock.entryPrice.toLocaleString()}원</span>
          <span class="swing-meta-item">${escapeHtml(stock.status)}</span>
        </div>
        <div class="price-row" id="price-row-${stock.code}">
          <span class="price placeholder-price">대기 중</span>
        </div>
        <div class="meta" id="meta-${stock.code}">수익률: 분석 시작 후 표시</div>
        <div id="plan-${stock.code}">${planHtml}</div>
        <div class="indicators" id="ind-${stock.code}">
          <div class="ind-item unknown">상단에서 분석 시작 버튼을 눌러주세요.</div>
        </div>
      </div>
    `;
  });
}

function renderBuyStockCards() {
  const renderGroup = (entries, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!entries.length) {
      container.innerHTML = '<div class="empty-state">노션에서 불러온 매수 후보가 없습니다.</div>';
      return;
    }

    entries.forEach(entry => {
      const gateSummary = summarizeGateStatus(entry);
      const presentation = getBuyPresentation(entry);
      const verdictClass = presentation.verdictClass;
      const rationale = entry.keyPoint || entry.rationale || entry.notes[0] || '세부 판단은 상세 보기에서 확인하세요.';
      container.innerHTML += `
        <div class="buy-card ${verdictClass}" data-code="${entry.code}">
          <div class="buy-card-head">
            <div>
              <div class="buy-card-rank">${entry.rank}위 · ${escapeHtml(STRATEGY_META[entry.strategy].shortLabel)}</div>
              <div class="buy-card-name">${escapeHtml(entry.name)}</div>
              <div class="buy-card-code">${escapeHtml(entry.code)}</div>
            </div>
            <div class="buy-card-scorebox">
              <div class="buy-score ${presentation.changed.score ? 'buy-changed' : ''}">${presentation.score.toFixed(1)}</div>
              <div class="buy-grade ${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.grade)}</div>
            </div>
          </div>
          <div class="buy-card-status ${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.statusLabel)}</div>
          <div class="buy-card-tags">
            <span class="buy-tag">Gate ${gateSummary.passed}/${gateSummary.total}</span>
            <span class="buy-tag">충족 ${entry.matchedRules.length}</span>
            <span class="buy-tag muted">미충족 ${entry.unmatchedRules.length}</span>
          </div>
          <div class="buy-card-summary">${escapeHtml(rationale)}</div>
          ${presentation.liveRefresh ? `
            <div class="buy-live-meta">
              <span class="buy-live-pill ${presentation.changed.score || presentation.changed.grade ? 'buy-changed' : ''}">네이버 ${presentation.liveRefresh.recommMean.toFixed(2)} / 5.00</span>
              ${presentation.liveRefresh.targetPrice ? `<span class="buy-live-pill ${presentation.changed.statusLabel ? 'buy-changed' : ''}">목표가 ${formatWon(presentation.liveRefresh.targetPrice)} (${formatSignedPercent(presentation.liveRefresh.upsideRate)})</span>` : ''}
              ${presentation.liveRefresh.asOf ? `<span class="buy-live-pill">기준 ${escapeHtml(formatCompactDate(presentation.liveRefresh.asOf))}</span>` : ''}
            </div>
          ` : ''}
          <div class="buy-card-footer">
            <span>${formatWon(entry.entryPriceValue)}</span>
            <span>R/R ${escapeHtml(entry.rr || '미기재')}</span>
          </div>
        </div>
      `;
    });

    container.querySelectorAll('.buy-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.code, 'buy'));
    });
  };

  renderGroup(notionSnapshot.pullbackEntries, 'buy-list-pullback');
  renderGroup(notionSnapshot.momentumEntries, 'buy-list-momentum');
  renderGroup(notionSnapshot.reversalEntries, 'buy-list-reversal');
}

function renderAll() {
  renderRegimeSummary();
  updateRegimeHeader();
  renderGuideTables();
  renderBuyStockCards();
  renderSellStockCards();
  updateAnalyzeButtonState();
  updateTabUI();
}

function updateAnalyzeButtonState() {
  const analyzeBtn = document.getElementById('btn-analyze');
  const hasBuyEntries = notionSnapshot.pullbackEntries.length > 0 || notionSnapshot.momentumEntries.length > 0;
  const hasSellStocks = stocks.pullback.length > 0 || stocks.momentum.length > 0 || stocks.swing.length > 0;
  analyzeBtn.disabled = activeTab === 'buy' ? !hasBuyEntries : !hasSellStocks;
}

function updateCurrentTime() {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ss = now.getSeconds().toString().padStart(2, '0');
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore = totalMins < (9 * 60 + 8);
  const label = isBefore ? '[1차 분석] 9:08 이전 (수급 매집형 손절 점검)' : '[2차 분석] 9:08 이후 (전체 매도/손절 분석)';
  const el = document.getElementById('current-time-display');
  if (el) {
    el.innerHTML = activeTab === 'sell'
      ? `🕒 현재 시각: <strong>${hh}:${mm}:${ss}</strong> &nbsp;|&nbsp; 적용 로직: <strong style="color:${isBefore ? 'var(--text-warning)' : 'var(--text-success)'}">${label}</strong>`
      : '🧭 매수 탭에서는 상단 분석 시작 버튼으로 네이버 컨센서스를 일괄 최신화할 수 있습니다.';
  }

  const analyzeBtn = document.getElementById('btn-analyze');
  if (!analyzeBtn) return;

  const activeArchive = getActiveArchiveForTab(activeTab, now);
  const archiveTimeLabel = formatArchiveButtonTime(activeArchive);
  const archiveSuffix = archiveTimeLabel ? ` · ${archiveTimeLabel} 분석` : '';

  if (activeTab === 'buy') {
    const hasBuyRefresh = getAllBuyEntries().some(entry => entry.liveRefresh);
    analyzeBtn.innerHTML = `<span>⚡</span> ${hasBuyRefresh ? '일괄 다시 분석' : '일괄 분석'}${archiveSuffix}`;
    return;
  }

  const hasSellResult = [...stocks.pullback, ...stocks.momentum, ...stocks.swing].some(stock => stockDetailMap[stock.code]?.mode === 'sell');
  analyzeBtn.innerHTML = `<span>⚡</span> ${isBefore ? '1차' : '2차'} ${hasSellResult ? '다시 분석' : '분석 시작'}${archiveSuffix}`;
}

async function runBuyBatchRefresh() {
  const allEntries = getAllBuyEntries();
  if (!allEntries.length) return;

  log(`▶ 네이버 컨센서스 기반 매수 후보 일괄 분석을 시작합니다. (총 ${allEntries.length}개)`);
  let successCount = 0;

  for (const entry of allEntries) {
    const success = await refreshBuyEntry(entry.code, {
      suppressAlert: true,
      logLabel: '일괄 분석'
    });
    if (success) successCount += 1;
    await new Promise(resolve => setTimeout(resolve, 1200));
  }

  const failedCount = allEntries.length - successCount;
  if (failedCount > 0) {
    log(`<span style="color:var(--text-warning)">✅ 매수 후보 ${successCount}개 최신화 완료, ${failedCount}개는 실패했습니다.</span>`);
  } else {
    log(`✅ 매수 후보 ${successCount}개 네이버 컨센서스 최신화가 완료되었습니다.`);
  }
}

function setActiveTab(tab) {
  activeTab = tab;
  updateTabUI();
  updateAnalyzeButtonState();
  updateCurrentTime();
}

function updateTabUI() {
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.toggle('active', button.dataset.tab === activeTab);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.tabPanel === activeTab);
  });

  const buyGuideButton = document.getElementById('btn-buy-guide');
  if (buyGuideButton) {
    buyGuideButton.classList.toggle('is-hidden', activeTab !== 'buy');
  }
}

function openGuideModal() {
  document.getElementById('guide-modal-overlay').classList.add('open');
  syncBodyScrollLock();
}

function closeGuideModal() {
  document.getElementById('guide-modal-overlay').classList.remove('open');
  syncBodyScrollLock();
}

function openGapGuideModal() {
  const body = document.getElementById('gap-guide-body');
  const activeGapScore = getActiveGapScore();
  const currentGrade = getGapGradeCode(activeGapScore.grade);
  body.innerHTML = `
    <div class="guide-grid guide-grid-modal">
      <div class="guide-panel">
        <div class="guide-title">갭 등급 기준</div>
        <table class="guide-table">
          <thead><tr><th>등급</th><th>합산 점수</th><th>갭 방향 예측</th></tr></thead>
          <tbody>
            ${RULE_GUIDE.gapGrades.map(row => `<tr class="${row.grade === currentGrade ? 'guide-active-row' : ''}"><td>${escapeHtml(`${row.color} ${row.grade} (${row.label})`)}</td><td>${escapeHtml(row.score)}</td><td>${escapeHtml(row.outlook)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="guide-panel">
        <div class="guide-title">진입 조정</div>
        <table class="guide-table">
          <thead><tr><th>등급</th><th>추세 추종</th><th>역추세</th><th>비고</th></tr></thead>
          <tbody>
            ${RULE_GUIDE.gapEntryAdjustments.map(row => `<tr class="${row.grade === currentGrade ? 'guide-active-row' : ''}"><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.trend)}</td><td>${escapeHtml(row.reversal)}</td><td>${escapeHtml(row.note)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="guide-panel">
        <div class="guide-title">익일 매도 조정</div>
        <table class="guide-table">
          <thead><tr><th>등급</th><th>프리마켓 익절</th><th>손절 조정</th><th>스윙 전환</th></tr></thead>
          <tbody>
            ${RULE_GUIDE.gapSellAdjustments.map(row => `<tr class="${row.grade === currentGrade ? 'guide-active-row' : ''}"><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.premarket)}</td><td>${escapeHtml(row.stopLoss)}</td><td>${escapeHtml(row.swing)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="gap-guide-note">현재 분석 기준의 갭 등급은 <strong>${escapeHtml(activeGapScore.grade || '미확인')}</strong> 입니다. 갭 등급은 종목 선정 기준을 완화하지 않고, 포지션 크기와 익일 매도 기준만 조정합니다.</div>
  `;

  document.getElementById('gap-guide-modal-overlay').classList.add('open');
  syncBodyScrollLock();
}

function closeGapGuideModal() {
  document.getElementById('gap-guide-modal-overlay').classList.remove('open');
  syncBodyScrollLock();
}

function detectCurrentRegime() {
  const table = notionSnapshot.regimeTable;
  if (!table.length) return null;
  const getValue = key => (table.find(r => r.item === key) || {}).value || '';
  return {
    regime: getValue('레짐'),
    kospi: getValue('KOSPI'),
    vkospi: getValue('VKOSPI'),
    ma60: getValue('60일선'),
    ma20: getValue('20일선'),
    swing: getValue('스윙 전환'),
    openBet: getValue('시가베팅'),
    note: getValue('특이 사항'),
    correction: getValue('최종 보정')
  };
}

function getRegimeReportSummaryRows() {
  return notionSnapshot.regimeTable.filter(row => row.item && row.value && !('verdict' in row));
}

function getVerdictTone(value) {
  const text = sanitizeText(value);
  if (!text) return 'unknown';
  if (/[✅🟢]|확정|우호|허용|활성/.test(text)) return 'clear';
  if (/[❌🔴⛔]|약세|금지|비활성|경고/.test(text)) return 'triggered';
  return 'unknown';
}

function getRegimeBadgeMeta(regimeValue) {
  const regime = sanitizeText(regimeValue);
  if (!regime) return { label: '미확인', tone: 'unknown' };
  if (regime.includes('강세장')) return { label: '강세장', tone: 'bull' };
  if (regime.includes('순환매장')) return { label: '순환매장', tone: 'rotation' };
  if (regime.includes('박스권')) return { label: '박스권', tone: 'range' };
  if (regime.includes('약세장')) return { label: '약세장', tone: 'bear' };
  return { label: regime, tone: 'unknown' };
}

function updateRegimeHeader() {
  const toggleButton = document.getElementById('btn-regime-toggle');
  const summary = document.getElementById('buy-regime-summary');
  const badge = document.getElementById('regime-current-badge');
  const info = detectCurrentRegime();
  const meta = getRegimeBadgeMeta(info?.regime || '');

  if (toggleButton) {
    toggleButton.textContent = isRegimeSummaryCollapsed ? '+' : '-';
    toggleButton.setAttribute('aria-expanded', String(!isRegimeSummaryCollapsed));
    toggleButton.setAttribute('title', isRegimeSummaryCollapsed ? '시장 레짐 펼치기' : '시장 레짐 접기');
  }

  if (summary) {
    summary.classList.toggle('is-collapsed', isRegimeSummaryCollapsed);
  }

  if (badge) {
    badge.textContent = meta.label;
    badge.className = `regime-current-badge ${meta.tone}`;
  }
}

function toggleRegimeSummary() {
  isRegimeSummaryCollapsed = !isRegimeSummaryCollapsed;
  updateRegimeHeader();
}

  syncBodyScrollLock();
function openRegimeReport() {
  const info = detectCurrentRegime();
  const body = document.getElementById('regime-report-body');
  const summaryRows = getRegimeReportSummaryRows();
  const evidenceRows = notionSnapshot.regimeEvidence;
  const gapScore = getActiveGapScore();
  const comparisonText = getGapComparisonText();

  syncBodyScrollLock();
  if (!info) {
    body.innerHTML = '<div class="empty-state">노션에서 시장 레짐 데이터를 불러온 뒤 다시 시도하세요.</div>';
    document.getElementById('regime-report-overlay').classList.add('open');
    return;
  }

  const regimeChecks = RULE_GUIDE.regimes.map(r => {
    const isMatch = info.regime && info.regime.includes(r.state.replace(/\s*[✅🔄⚠️⛔]/g, '').trim());
    return { ...r, isMatch };
  });

  body.innerHTML = `
    <div class="regime-report-section">
      <div class="modal-section-label">현재 레짐 판정</div>
      <div class="modal-verdict hold" style="font-size:16px;margin-bottom:16px">${escapeHtml(info.regime || '미확인')}</div>

      ${summaryRows.length ? `
        <div class="modal-section-label">레짐 요약 항목</div>
        <table class="guide-table" style="margin-bottom:16px">
          <tbody>
            ${summaryRows.map(row => `<tr><td style="width:140px;color:var(--text-tertiary)">${escapeHtml(row.item)}</td><td><strong>${escapeHtml(row.value)}</strong></td></tr>`).join('')}
          </tbody>
        </table>
      ` : ''}

      ${evidenceRows.length ? `
        <div class="modal-section-label">실제 판정 근거</div>
        <table class="guide-table" style="margin-bottom:16px">
          <thead><tr><th>지표</th><th>확인값</th><th>판정</th></tr></thead>
          <tbody>
            ${evidenceRows.map(row => `<tr><td>${escapeHtml(row.item)}</td><td>${escapeHtml(row.value)}</td><td><span class="report-verdict ${getVerdictTone(row.verdict)}">${escapeHtml(row.verdict || '—')}</span></td></tr>`).join('')}
          </tbody>
        </table>
      ` : ''}

      ${gapScore.rows.length ? `
        <div class="modal-section-label">갭 예측 스코어 근거</div>
        <table class="guide-table compact-table" style="margin-bottom:12px">
          <thead><tr><th>지표</th><th>실측값</th><th>기본 점수</th><th>중요도</th><th>계산식</th><th>반영 점수</th></tr></thead>
          <tbody>
            ${gapScore.rows.map(row => `<tr><td>${escapeHtml(row.indicator)}</td><td>${escapeHtml(row.actualValue)}</td><td>${escapeHtml(row.baseScore)}</td><td>${escapeHtml(row.weight)}</td><td>${escapeHtml(row.formula || `${row.baseScore} ${row.weight}`.trim())}</td><td><strong>${escapeHtml(row.weightedScore)}</strong></td></tr>`).join('')}
            ${gapScore.totalScore ? `<tr><td colspan="5">반영 점수 합계</td><td><strong>${escapeHtml(gapScore.totalScore)}</strong></td></tr>` : ''}
          </tbody>
        </table>
        <table class="guide-table" style="margin-bottom:16px">
          <tbody>
            ${gapScore.grade ? `<tr><td style="width:140px;color:var(--text-tertiary)">갭 등급</td><td><strong>${escapeHtml(gapScore.grade)}</strong></td></tr>` : ''}
            ${gapScore.entryAdjustment ? `<tr><td style="color:var(--text-tertiary)">진입 조정</td><td><strong>${escapeHtml(gapScore.entryAdjustment)}</strong></td></tr>` : ''}
            ${gapScore.sellAdjustment ? `<tr><td style="color:var(--text-tertiary)">매도 조정</td><td><strong>${escapeHtml(gapScore.sellAdjustment)}</strong></td></tr>` : ''}
            ${gapScore.swingAdjustment ? `<tr><td style="color:var(--text-tertiary)">스윙 전환</td><td><strong>${escapeHtml(gapScore.swingAdjustment)}</strong></td></tr>` : ''}
            ${gapScore.note ? `<tr><td style="color:var(--text-tertiary)">특이사항</td><td><strong>${escapeHtml(gapScore.note)}</strong></td></tr>` : ''}
            ${isLiveGapReady() ? `<tr><td style="color:var(--text-tertiary)">실시간 소스</td><td><strong>${escapeHtml(liveGapState.source)} / ${escapeHtml(liveGapState.fetchedAt)}</strong></td></tr>` : ''}
            ${comparisonText ? `<tr><td style="color:var(--text-tertiary)">노션 비교</td><td><strong>${escapeHtml(comparisonText)}</strong></td></tr>` : ''}
          </tbody>
        </table>
      ` : ''}

      <div class="modal-section-label">레짐 판정 순서 (위→아래 순차, 첫 일치 확정)</div>
      <div class="modal-ind-list">
        ${regimeChecks.map(r => `
          <div class="modal-ind-card ${r.isMatch ? 'clear' : 'unknown'}">
            <div class="modal-ind-icon">${r.isMatch ? '✅' : '➖'}</div>
            <div class="modal-ind-content">
              <div class="modal-ind-title">${escapeHtml(r.state)}</div>
              <div class="modal-ind-criterion">${escapeHtml(r.condition)}</div>
              <div class="modal-ind-result">→ ${r.isMatch ? '현재 레짐 확정' : '조건 미충족'}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="modal-section-label" style="margin-top:18px">전략 우선순위</div>
      <table class="guide-table">
        <thead><tr><th>레짐</th><th>눌림목</th><th>수급매집형</th></tr></thead>
        <tbody>
          ${regimeChecks.map(r => `<tr style="${r.isMatch ? 'background:rgba(16,185,129,0.08)' : ''}"><td>${escapeHtml(r.state)}</td><td>${escapeHtml(r.pullback)}</td><td>${escapeHtml(r.momentum)}</td></tr>`).join('')}
        </tbody>
      </table>

      ${info.swing || info.openBet ? `
        <div class="modal-section-label" style="margin-top:18px">운용 상태</div>
        <table class="guide-table">
          <tbody>
            ${info.swing ? `<tr><td style="width:100px;color:var(--text-tertiary)">스윙 전환</td><td><strong>${escapeHtml(info.swing)}</strong></td></tr>` : ''}
            ${info.openBet ? `<tr><td style="color:var(--text-tertiary)">시가베팅</td><td><strong>${escapeHtml(info.openBet)}</strong></td></tr>` : ''}
          </tbody>
        </table>
      ` : ''}

      ${info.note ? `<div class="regime-alert" style="margin-top:16px">${escapeHtml(info.note)}</div>` : ''}
    </div>
  `;

  document.getElementById('regime-report-overlay').classList.add('open');
}

function closeRegimeReport() {
  document.getElementById('regime-report-overlay').classList.remove('open');
}

async function fetchNotionData() {
  const urlInput = document.getElementById('notion-url').value;
  const matchId = urlInput.replace(/-/g, '').match(/[a-f0-9]{32}/i);
  if (!matchId) {
    alert('유효한 노션 주소 또는 페이지 ID를 입력해주세요.');
    return;
  }

  const notionId = matchId[0];
  const notionApiBase = `https://notion-api.splitbee.io/v1/page/${notionId}`;
  localStorage.setItem('savedNotionUrl', urlInput);

  log(`노션(Notion) 공용 페이지(${notionId.substring(0, 6)}...) 파싱 중입니다...`);
  const btn = document.getElementById('btn-fetch-notion');
  btn.disabled = true;
  btn.innerHTML = '<span>⏳</span> 파싱 중...';

  try {
    let data = null;
    const cacheBuster = `_t=${Date.now()}`;
    const notionUrlFresh = notionApiBase + (notionApiBase.includes('?') ? '&' : '?') + cacheBuster;
    for (let i = 0; i < PROXIES.length + 1; i++) {
      try {
        const url = i === 0 ? notionUrlFresh : PROXIES[i - 1] + encodeURIComponent(notionUrlFresh);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
        break;
      } catch (e) {
        if (i < PROXIES.length) continue;
        throw new Error('Notion API fetch failed (all proxies exhausted)');
      }
    }
    const sourceText = buildSourceTextFromNotion(data);
    notionSnapshot = parseNotionSnapshotFromText(sourceText);
    liveGapState = createEmptyLiveGapState();
    rebuildSellStocksFromSnapshot();
    renderAll();
    restoreAnalysisArchiveState();

    const totalBuy = notionSnapshot.pullbackEntries.length + notionSnapshot.momentumEntries.length;
    log(`성공적으로 불러왔습니다. (시장 레짐 ${notionSnapshot.regimeTable.length}개 항목, 매수 후보 ${totalBuy}개)`);
    if (!totalBuy) {
      log('<span style="color:var(--text-warning)">경고: 전략별 종목 상세를 찾지 못했습니다. 노션 섹션 제목 형식이 바뀌었는지 확인해주세요.</span>');
    }
  } catch (error) {
    log('<span style="color:var(--text-danger)">오류: 노션 데이터를 파싱하는 데 실패했습니다. 올바른 공개 페이지인지 확인해주세요.</span>');
    console.error(error);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '불러오기';
    updateCurrentTime();
  }
}

document.getElementById('btn-fetch-notion').addEventListener('click', fetchNotionData);

function handleManualAdd(type, nameInputId, codeInputId) {
  const name = document.getElementById(nameInputId).value.trim();
  const code = document.getElementById(codeInputId).value.trim();

  if (!name || !code) {
    alert('종목명과 종목코드(6자리)를 모두 입력해주세요.');
    return;
  }
  if (!/^\d{6}$/.test(code)) {
    alert('종목코드는 6자리 숫자여야 합니다.');
    return;
  }

  if (!stocks[type].find(stock => stock.code === code)) {
    stocks[type].push({ name, code, type, strategy: type, manual: true, source: 'manual' });
    renderSellStockCards();
    updateAnalyzeButtonState();
    log(`▶ 수동 추가: ${name} (${code}) -> ${STRATEGY_META[type].noun}`);

    document.getElementById(nameInputId).value = '';
    document.getElementById(codeInputId).value = '';
    document.getElementById(nameInputId).focus();
  } else {
    alert('이미 추가된 종목입니다.');
  }
}

document.getElementById('btn-add-pullback').addEventListener('click', () => handleManualAdd('pullback', 'pullback-name', 'pullback-code'));
document.getElementById('btn-add-momentum').addEventListener('click', () => handleManualAdd('momentum', 'momentum-name', 'momentum-code'));
document.getElementById('btn-add-swing').addEventListener('click', () => {
  const name = document.getElementById('swing-name').value.trim();
  const code = document.getElementById('swing-code').value.trim();
  const entryPriceRaw = document.getElementById('swing-entry-price').value.trim();
  if (!name || !code) { alert('종목명과 종목코드(6자리)를 모두 입력해주세요.'); return; }
  if (!/^\d{6}$/.test(code)) { alert('종목코드는 6자리 숫자여야 합니다.'); return; }
  const entryPrice = parseInt(entryPriceRaw.replace(/,/g, ''), 10) || 0;
  if (!stocks.swing.find(s => s.code === code)) {
    stocks.swing.push({ name, code, type: 'swing', strategy: 'swing', buyDate: '', entryPrice, status: '보유중', manual: true, source: 'manual' });
    renderSellStockCards();
    updateAnalyzeButtonState();
    log(`▶ 수동 추가: ${name} (${code}) -> 스윙 보유 (매수가 ${entryPrice.toLocaleString()}원)`);
    document.getElementById('swing-name').value = '';
    document.getElementById('swing-code').value = '';
    document.getElementById('swing-entry-price').value = '';
  } else { alert('이미 추가된 종목입니다.'); }
});
document.getElementById('btn-buy-guide').addEventListener('click', openGuideModal);

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => setActiveTab(button.dataset.tab));
});

document.getElementById('btn-analyze').addEventListener('click', async () => {
  const btn = document.getElementById('btn-analyze');

  if (activeTab === 'buy') {
    saveAnalysisArchiveBeforeRecheck('buy');
    btn.disabled = true;
    btn.innerHTML = '<span>⚡</span> 일괄 분석 중...';

    try {
      await refreshLiveGapScore('매수 분석');
      await runBuyBatchRefresh();
      saveAnalysisArchiveAfterAnalysis('buy');
    } finally {
      btn.disabled = false;
      updateAnalyzeButtonState();
      updateCurrentTime();
    }
    return;
  }

  const now = new Date();
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore0908 = totalMins < (9 * 60 + 8);
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  saveAnalysisArchiveBeforeRecheck('sell', {
    isBefore0908,
    timeLabel: timeStr
  });

  btn.disabled = true;
  btn.innerHTML = '<span>⚡</span> 분석 진행 중...';

  log(`▶ [현재 시각: ${timeStr}] 분석을 시작합니다. (9시 8분 <b>${isBefore0908 ? '이전' : '이후'}</b> 로직 적용)`);
  await refreshLiveGapScore('매도 분석');

  const allStocks = isBefore0908
    ? [...stocks.swing, ...stocks.momentum]
    : [...stocks.swing, ...stocks.pullback, ...stocks.momentum];

  if (isBefore0908 && stocks.pullback.length > 0) {
    log(`ℹ️ 1차 분석: 눌림목 ${stocks.pullback.length}개 종목은 9:08 이후에 분석됩니다.`);
  }
  if (stocks.swing.length > 0) {
    log(`🔄 스윙 보유 ${stocks.swing.length}개 종목 포함하여 분석합니다.`);
  }

  for (const stock of allStocks) {
    await analyzeStock(stock, isBefore0908);
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  saveAnalysisArchiveAfterAnalysis('sell', {
    isBefore0908,
    timeLabel: timeStr
  });
  log('✅ 모든 종목의 시그널 분석이 완료되었습니다.');
  btn.disabled = false;
  btn.innerHTML = '<span>⚡</span> 다시 분석';
  updateAnalyzeButtonState();
  updateCurrentTime();
});

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

function getActionBadge(decision, actionStage) {
  const badges = {
    reject: { cls: 'badge-sell', text: '🛑 즉시 손절' },
    loss_cut: { cls: 'badge-sell', text: '🔴 손절 권고' },
    partial_exit: { cls: 'badge-caution', text: '🟡 비중 축소' },
    premarket: { cls: 'badge-caution', text: '🌅 프리마켓 익절' },
    openPhase: { cls: 'badge-caution', text: '🔔 장초반 익절' },
    intraday1: { cls: 'badge-caution', text: '📈 1차 익절' },
    intraday2: { cls: 'badge-caution', text: '📈 2차 익절' },
    swing: { cls: 'badge-hold', text: '🔄 스윙 유지' },
    hold: { cls: 'badge-hold', text: '✅ 홀딩 유지' },
    underwater: { cls: 'badge-caution', text: '⚠️ 평가손' },
    wait: { cls: 'badge-pending', text: '⏳ 대기 중' },
    unknown: { cls: 'badge-pending', text: '❓ 판단 불가' }
  };

  if (decision === 'sell' && !badges[actionStage]) return { cls: 'badge-sell', text: '🛑 매도/손절' };
  return badges[actionStage] || badges.unknown;
}

function getGapComparisonBadge(comparison) {
  if (!comparison?.available || comparison.bias === 0) return null;
  if (comparison.bias > 0) {
    return {
      cls: 'badge-shift-good',
      text: '개선',
      detail: comparison.summary
    };
  }

  return {
    cls: 'badge-shift-bad',
    text: '악화',
    detail: comparison.summary
  };
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

function updateCardError(code) {
  const card = document.getElementById(`card-${code}`);
  const indBox = document.getElementById(`ind-${code}`);
  const badge = document.getElementById(`badge-${code}`);
  const shiftBadge = document.getElementById(`gap-shift-${code}`);
  if (!card || !indBox || !badge) return;

  card.className = 'scard';
  badge.className = 'badge badge-pending';
  badge.innerText = '통신 오류';
  if (shiftBadge) {
    shiftBadge.className = 'badge badge-shift';
    shiftBadge.innerText = '';
    shiftBadge.title = '';
    shiftBadge.style.display = 'none';
  }
  indBox.innerHTML = '<div class="ind-item unknown">네이버 증권 데이터를 가져오는 데 실패했습니다.<br>잠시 후 다시 시도해주세요.</div>';
}

function renderRuleMatchList(entry) {
  const scoreMap = Object.fromEntries(RULE_GUIDE.strategies[entry.strategy].scores.map(rule => [rule.code, rule]));
  const renderRule = (ruleInfo, matched) => {
    const guide = scoreMap[ruleInfo.code] || { condition: '', source: '' };
    const note = ruleInfo.note ? ` - ${ruleInfo.note}` : '';
    return `
      <div class="modal-ind-card ${matched ? 'clear' : 'triggered'}">
        <div class="modal-ind-icon">${matched ? '✅' : '⚠️'}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(ruleInfo.code)} ${matched ? '일치' : '불일치'}</div>
          <div class="modal-ind-criterion">${escapeHtml(guide.condition)}</div>
          <div class="modal-ind-result">→ ${escapeHtml(`${matched ? '노션 충족' : '노션 미충족'}${note}`)}</div>
          ${guide.source ? `<div class="modal-ind-value">출처: ${escapeHtml(guide.source)}</div>` : ''}
        </div>
      </div>
    `;
  };

  return [
    ...entry.matchedRules.map(rule => renderRule(rule, true)),
    ...entry.unmatchedRules.map(rule => renderRule(rule, false))
  ].join('');
}

function renderGateList(entry) {
  const guideMap = Object.fromEntries(RULE_GUIDE.strategies[entry.strategy].gates.map(gate => [gate.code, gate]));
  return entry.gates.map(gate => {
    const guide = guideMap[gate.code] || { condition: '', source: '' };
    const statusClass = gate.status === '✅' ? 'clear' : 'triggered';
    const statusLabel = gate.status === '✅' ? '통과' : gate.status === '⚠️' ? '경계' : '제외';
    return `
      <div class="modal-ind-card ${statusClass}">
        <div class="modal-ind-icon">${escapeHtml(gate.status || '➖')}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(gate.code)} ${statusLabel}</div>
          <div class="modal-ind-criterion">${escapeHtml(guide.condition)}</div>
          <div class="modal-ind-result">→ ${escapeHtml(gate.note || '노션 기준 판정')}</div>
          ${guide.source ? `<div class="modal-ind-value">출처: ${escapeHtml(guide.source)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderTradePlanTable(entry) {
  if (!entry.tradePlanRows.length) {
    return '<div class="empty-state compact">매매 단계 정보가 없습니다.</div>';
  }

  return `
    <table class="guide-table compact-table">
      <thead><tr><th>단계</th><th>조건</th><th>수량</th><th>목표 수익률</th><th>목표가</th></tr></thead>
      <tbody>
        ${entry.tradePlanRows.map(row => `<tr><td>${escapeHtml(row.stage)}</td><td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.quantity)}</td><td>${escapeHtml(row.targetYield)}</td><td>${escapeHtml(row.targetPrice)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function openModal(code, mode = 'sell') {
  const detail = mode === 'buy' ? getEntryByCode(code) : stockDetailMap[code];
  if (!detail) return;
  currentModalState = { code, mode };
  const detailModal = document.getElementById('detail-modal');

  if (mode === 'buy') {
    detailModal.classList.add('buy-detail-mode');
    const entry = detail;
    const presentation = getBuyPresentation(entry);
    document.getElementById('modal-name').textContent = entry.name;
    document.getElementById('modal-code').textContent = entry.code;
    document.getElementById('modal-type').textContent = `${STRATEGY_META[entry.strategy].label} · ${entry.rank}위`;

    const verdictClass = presentation.verdictClass;
    const verdictMap = {
      strong: 'S 등급 · 강력매수',
      good: 'A 등급 · 매수추천',
      watch: 'B 등급 · 관심후보',
      exclude: 'C 등급 · 제외'
    };

    document.getElementById('modal-body').innerHTML = `
      <div class="buy-modal-layout">
        <div class="buy-modal-fixed">
          <div class="modal-price-bar buy-price-bar">
            <div>
              <div class="price-big ${presentation.changed.score ? 'buy-changed' : ''}">${presentation.score.toFixed(1)} / 10</div>
              <div class="buy-modal-scoreline"><span class="${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.grade)}</span> · <span class="${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.statusLabel)}</span></div>
            </div>
            <div class="modal-stats">
              <div class="modal-stat">
                <span class="modal-stat-label">진입가</span>
                <span class="modal-stat-value">${escapeHtml(entry.entryPriceText || '—')}</span>
              </div>
              <div class="modal-stat">
                <span class="modal-stat-label">R/R</span>
                <span class="modal-stat-value">${escapeHtml(entry.rr || '—')}</span>
              </div>
              <div class="modal-stat">
                <span class="modal-stat-label">전략</span>
                <span class="modal-stat-value">${escapeHtml(STRATEGY_META[entry.strategy].shortLabel)}</span>
              </div>
            </div>
          </div>

          ${presentation.liveRefresh ? `
            <div class="buy-live-meta buy-live-meta-modal">
              <span class="buy-live-pill ${presentation.changed.score || presentation.changed.grade ? 'buy-changed' : ''}">네이버 컨센서스 ${presentation.liveRefresh.recommMean.toFixed(2)} / 5.00</span>
              ${presentation.liveRefresh.currentPrice ? `<span class="buy-live-pill">현재가 ${formatWon(presentation.liveRefresh.currentPrice)}</span>` : ''}
              ${presentation.liveRefresh.targetPrice ? `<span class="buy-live-pill ${presentation.changed.statusLabel ? 'buy-changed' : ''}">목표가 ${formatWon(presentation.liveRefresh.targetPrice)} (${formatSignedPercent(presentation.liveRefresh.upsideRate)})</span>` : ''}
              ${presentation.liveRefresh.asOf ? `<span class="buy-live-pill">기준 ${escapeHtml(formatCompactDate(presentation.liveRefresh.asOf))}</span>` : ''}
            </div>
          ` : ''}

          <div class="modal-verdict ${verdictClass === 'strong' ? 'hold' : verdictClass === 'good' ? 'caution' : verdictClass === 'watch' ? 'caution' : 'sell'}">${escapeHtml(verdictMap[verdictClass])}</div>

          <div class="buy-modal-fixed-grid">
            <div class="buy-detail-block buy-detail-block-fixed">
              <div class="modal-section-label">요약</div>
              ${entry.rationale ? `<div class="buy-detail-note"><strong>근거</strong><span>${escapeHtml(entry.rationale)}</span></div>` : ''}
              ${entry.keyPoint ? `<div class="buy-detail-note"><strong>핵심</strong><span>${escapeHtml(entry.keyPoint)}</span></div>` : ''}
              ${entry.notes.map(note => `<div class="buy-detail-note"><strong>메모</strong><span>${escapeHtml(note)}</span></div>`).join('')}
            </div>

            <div class="buy-trade-plan-block">
              <div class="modal-section-label">매매 단계</div>
              ${renderTradePlanTable(entry)}
            </div>
          </div>
        </div>

        <div class="buy-modal-scroll" id="buy-modal-scroll-area">
          <div>
            <div class="modal-stage-badge stage2">🧭 노션 기준 매수 판단</div>
            <div class="modal-section-label">Gate 일치 여부</div>
            <div class="modal-ind-list">${renderGateList(entry)}</div>
          </div>

          <div>
            <div class="modal-section-label">채점 조건 일치 / 불일치</div>
            <div class="modal-ind-list">${renderRuleMatchList(entry)}</div>
          </div>
        </div>
      </div>
    `;
  } else {
    detailModal.classList.remove('buy-detail-mode');
    const { stock, data, indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, isBefore0908, gapProfile } = detail;
    document.getElementById('modal-name').textContent = stock.name;
    document.getElementById('modal-code').textContent = stock.code;
    document.getElementById('modal-type').textContent = stock.type === 'swing' ? '🔄 스윙 보유' : stock.type === 'pullback' ? '📊 눌림목 종가베팅' : '🔥 수급 매집형 종가베팅';

    const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
    const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
    const absChg = Math.abs(data.chgRate).toFixed(2);
    const entryPrice = stock.entryPrice || targets?.entryPrice || data.prevClose;

    const badgeInfo = getActionBadge(decision, actionStage);
    const shiftBadgeInfo = getGapComparisonBadge(gapProfile?.comparison);
    const verdictCls = decision === 'sell' ? 'sell' : decision === 'caution' ? 'caution' : 'hold';
    const stageCls = isBefore0908 ? 'stage1' : 'stage2';
    const stageText = isBefore0908 ? '1차 분석 (9:08 이전)' : '2차 분석 (9:08 이후)';

    const notionEntry = getEntryByCode(stock.code);
    const tradePlanHtml = notionEntry ? renderTradePlanTable(notionEntry) : '<div class="empty-state compact">매매 전략 정보가 노션에 없습니다.</div>';
    const strategyPlanHtml = renderSellStrategyPlan(detail, false);

    const triggeredRuleHtml = triggeredRule ? `
      <div class="modal-triggered-rule">
        <div class="modal-section-label">🚨 트리거된 규칙</div>
        <div class="modal-ind-card triggered">
          <div class="modal-ind-icon">🛑</div>
          <div class="modal-ind-content">
            <div class="modal-ind-title">[${escapeHtml(triggeredRule.code)}] ${escapeHtml(triggeredRule.title)}</div>
            <div class="modal-ind-criterion">${triggeredRule.criterion ? triggeredRule.criterion.split('\n').map(l => `<span>${escapeHtml(l)}</span>`).join('<br>') : ''}</div>
            <div class="modal-ind-result">→ ${escapeHtml(triggeredRule.result || '')}</div>
            ${triggeredRule.value ? `<div class="modal-ind-value">📐 ${escapeHtml(triggeredRule.value)}</div>` : ''}
          </div>
        </div>
      </div>
    ` : '';

    const gapAdjustmentHtml = gapProfile?.code ? `
      <div class="modal-triggered-rule">
        <div class="modal-section-label">🌙 갭 조정 적용</div>
        <div class="modal-ind-card ${gapProfile.severity}">
          <div class="modal-ind-icon">${gapProfile.severity === 'triggered' ? '🟠' : gapProfile.severity === 'clear' ? '🟢' : '🟡'}</div>
          <div class="modal-ind-content">
            <div class="modal-ind-title">갭 등급 ${escapeHtml(gapProfile.label)}</div>
            <div class="modal-ind-criterion"><span>익일 매도 판단에 프리마켓 익절, 손절폭, 스윙 전환 규칙을 함께 적용합니다.</span></div>
            <div class="modal-ind-result">→ 프리마켓: ${escapeHtml(gapProfile.premarketText)} / 손절: ${escapeHtml(gapProfile.stopLossText)} / 스윙: ${escapeHtml(gapProfile.swingText)}</div>
            <div class="modal-ind-value">📐 ${escapeHtml(gapProfile.summary)}</div>
          </div>
        </div>
      </div>
    ` : '';

    const lossManagementHtml = (stock.type === 'swing' && lossManagement) ? `
      <div class="loss-management-panel">
        <div class="modal-section-label">📉 손실 관리 판정</div>
        <div class="loss-verdict ${lossManagement.lossLevel}">
          <div class="loss-verdict-score">${lossManagement.totalScore} / ${lossManagement.maxScore}</div>
          <div class="loss-verdict-text">${lossManagement.verdict}</div>
        </div>
        <div class="loss-prices">
          <div class="loss-price-item danger">
            <span class="loss-price-label">최대 손절가</span>
            <span class="loss-price-value">${lossManagement.maxStopPrice.toLocaleString()}원</span>
            <span class="loss-price-rate">(${lossManagement.maxStopRate >= 0 ? '+' : ''}${lossManagement.maxStopRate.toFixed(1)}%)</span>
          </div>
          <div class="loss-price-item warning">
            <span class="loss-price-label">권장 손절가</span>
            <span class="loss-price-value">${lossManagement.recommendedStopPrice.toLocaleString()}원</span>
            <span class="loss-price-rate">(현재가 -2% 또는 5MA)</span>
          </div>
          <div class="loss-price-item recovery">
            <span class="loss-price-label">회복 목표가</span>
            <span class="loss-price-value">${lossManagement.recoveryTarget.toLocaleString()}원</span>
            <span class="loss-price-rate">(진입가 +1%)</span>
          </div>
          <div class="loss-price-item target">
            <span class="loss-price-label">반등 익절가</span>
            <span class="loss-price-value">${lossManagement.reboundTarget.toLocaleString()}원</span>
            <span class="loss-price-rate">(20일 고점 80%)</span>
          </div>
        </div>
        <div class="loss-score-grid">
          ${lossManagement.scores.map(s => `
            <div class="loss-score-item ${s.pass ? 'pass' : 'fail'}">
              <span class="loss-score-icon">${s.pass ? '✅' : '❌'}</span>
              <span class="loss-score-code">${s.code}</span>
              <span class="loss-score-title">${escapeHtml(s.title)}</span>
              <span class="loss-score-result">${escapeHtml(s.result)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const comparisonShiftHtml = shiftBadgeInfo ? `
      <div class="modal-verdict modal-verdict-shift ${shiftBadgeInfo.cls}">${escapeHtml(shiftBadgeInfo.text)} · ${escapeHtml(shiftBadgeInfo.detail)}</div>
    ` : '';

    document.getElementById('modal-body').innerHTML = `
      <div class="modal-price-bar">
        <span class="price-big">${data.currentPrice.toLocaleString()}원</span>
        <span class="chg-big ${chgClass}">${chgPrefix}${absChg}%</span>
        <div class="modal-stats">
          <div class="modal-stat">
            <span class="modal-stat-label">진입가</span>
            <span class="modal-stat-value">${entryPrice.toLocaleString()}원</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">수익률</span>
            <span class="modal-stat-value" style="color:${gainRate >= 0 ? 'var(--text-success)' : 'var(--text-danger)'}">${gainRate >= 0 ? '+' : ''}${gainRate.toFixed(2)}%</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">시가</span>
            <span class="modal-stat-value">${data.openPrice.toLocaleString()}원</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">체결강도</span>
            <span class="modal-stat-value">${data.strength !== null && data.strength !== undefined ? `${data.strength.toFixed(2)}%` : '미연동'}</span>
          </div>
        </div>
      </div>

      <div class="modal-verdict ${verdictCls}">${badgeInfo.text}</div>
      ${comparisonShiftHtml}

      ${strategyPlanHtml}
      ${gapAdjustmentHtml}
      ${triggeredRuleHtml}
      ${lossManagementHtml}

      <div>
        <div class="modal-section-label">매매 전략 (노션)</div>
        ${tradePlanHtml}
      </div>

      <div>
        <div class="modal-stage-badge ${stageCls}">⚡ ${stageText}</div>
        <div class="modal-section-label">지표별 분석 결과</div>
        <div class="modal-ind-list">
          ${indicators.map(indicator => {
            const icon = indicator.status === 'triggered' ? '🚨' : indicator.status === 'clear' ? '✅' : '➖';
            const criterionLines = indicator.criterion.split('\n').map(line => `<span>${escapeHtml(line)}</span>`).join('<br>');
            return `
              <div class="modal-ind-card ${indicator.status}">
                <div class="modal-ind-icon">${icon}</div>
                <div class="modal-ind-content">
                  <div class="modal-ind-title">${escapeHtml(indicator.title)}</div>
                  <div class="modal-ind-criterion">${criterionLines}</div>
                  <div class="modal-ind-result">→ ${escapeHtml(indicator.result)}</div>
                  ${indicator.value ? `<div class="modal-ind-value">📐 ${escapeHtml(indicator.value)}</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  document.getElementById('modal-overlay').classList.add('open');
  syncBodyScrollLock();
}

function closeModal() {
  currentModalState = { code: null, mode: null };
  document.getElementById('modal-overlay').classList.remove('open');
  syncBodyScrollLock();
}

window.addEventListener('DOMContentLoaded', () => {
  const savedUrl = localStorage.getItem('savedNotionUrl');
  if (savedUrl) {
    document.getElementById('notion-url').value = savedUrl;
    fetchNotionData();
  } else {
    renderAll();
    restoreAnalysisArchiveState();
  }

  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.getElementById('guide-modal-close-btn').addEventListener('click', closeGuideModal);
  document.getElementById('guide-modal-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('guide-modal-overlay')) closeGuideModal();
  });
  document.getElementById('gap-guide-modal-close-btn').addEventListener('click', closeGapGuideModal);
  document.getElementById('gap-guide-modal-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('gap-guide-modal-overlay')) closeGapGuideModal();
  });
  document.getElementById('btn-regime-toggle').addEventListener('click', toggleRegimeSummary);
  document.getElementById('btn-regime-report').addEventListener('click', openRegimeReport);
  document.getElementById('regime-report-close-btn').addEventListener('click', closeRegimeReport);
  document.getElementById('regime-report-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('regime-report-overlay')) closeRegimeReport();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
      closeGuideModal();
      closeGapGuideModal();
      closeRegimeReport();
    }
  });
});
