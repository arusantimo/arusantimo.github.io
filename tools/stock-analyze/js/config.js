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
