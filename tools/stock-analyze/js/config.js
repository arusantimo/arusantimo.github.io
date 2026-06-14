// CORS Proxy to bypass Naver's block (여러 개의 프록시 서버를 두어 안정성을 높임)
const PROXIES = [
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?'
];

const ANALYSIS_ARCHIVE_KEY = 'stockAnalyzePreviousAnalysisSnapshotsV1';
const SELL_TRACKING_STATE_KEY = 'stockAnalyzeSellTrackingStateV1';
const SAVED_NOTION_URLS_KEY = 'stockAnalyzeSavedNotionUrlsV2';
const LEGACY_SAVED_NOTION_URL_KEY = 'savedNotionUrl';

// Keep in sync with jongga/grade_policy.py
const BUY_GRADE_MIN_SCORES = {
  pullback: { S: 8.5, A: 7.0, B: 5.5 },
  breakout: { S: 8.5, A: 7.0, B: 5.5 },
  momentum: { S: 8.5, A: 7.0, B: 5.5 },
  accumulation: { S: 8.5, A: 7.0, B: 5.5 },
  reversal: { S: 8.0, A: 6.5, B: 5.0 }
};

const RULE_GUIDE = {
  scoreAxes: {
    signal: '당일 신호 강도(부분 점수 포함, 전략 내부 정렬용)',
    strict: '진입 판단용 엄격 점수(이진 충족만 반영, 등급 산출)',
    entry: 'entryEligible — Gate·등급·statusLabel 종합 진입 가능 여부'
  },
  regimes: [
    {
      state: '강세장 ✅',
      condition: '60MA 우상향 AND 20MA 우상향 AND VKOSPI < 20',
      pullback: '서브 (3종목)',
      breakout: '메인 (3종목)',
      accumulation: '보조 (3종목)'
    },
    {
      state: '순환매장 🔄',
      condition: '60MA 횡보 AND 신고가 ≥ 30 AND 업종 리더십 변경 AND 거래대금 유지',
      pullback: '서브 (2종목)',
      breakout: '메인 (2종목)',
      accumulation: '보조 (3종목)'
    },
    {
      state: '박스권 ⚠️',
      condition: '그 외 (지수 정체 + 내부 침체)',
      pullback: '서브 (3종목)',
      breakout: '서브 (1종목)',
      accumulation: '메인 (3종목)'
    },
    {
      state: '약세장 ⛔',
      condition: 'KOSPI 60MA 하락 OR VKOSPI > 30',
      pullback: '관망',
      breakout: '관망',
      accumulation: '관망'
    }
  ],
  trendGrades: [
    { grade: 'S', score: '8.5 ~ 10점', meaning: '레짐 무관 진입 가능' },
    { grade: 'A', score: '7.0 ~ 8.4점', meaning: '강세장·순환매장·박스권 진입 가능' },
    { grade: 'B', score: '5.5 ~ 6.9점', meaning: '기본은 진입 보류, 눌림목은 조건부 진입 가능' },
    { grade: 'C', score: '5.5점 미만', meaning: '출력 목록에서 제외' }
  ],
  reversalGrades: [
    { grade: 'S', score: '8.0 ~ 10점', meaning: '최우선 진입' },
    { grade: 'A', score: '6.5 ~ 7.9점', meaning: '진입 가능' },
    { grade: 'B', score: '5.0 ~ 6.4점', meaning: '익일 재평가 (당일 진입 금지)' },
    { grade: 'C', score: '5.0점 미만', meaning: '출력 제외' }
  ],
  permissions: [
    { regime: '강세장', s: '✅ 100% 진입', a: '✅ 100% 진입', b: '눌림목 조건부 / 그 외 모니터링' },
    { regime: '순환매장', s: '✅ 80% 진입', a: '✅ 70% 진입', b: '눌림목 조건부 / 그 외 모니터링' },
    { regime: '박스권', s: '✅ 70% 진입', a: '✅ 70% 진입', b: '눌림목 조건부 / 그 외 모니터링' },
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
    { grade: 'G-D', label: '갭다운 주의', score: '-7.9 ~ -3.0', outlook: '익일 갭다운 -0.5~-2.0% 경계', color: '🟠' },
    { grade: 'G-E', label: '갭다운 경고', score: '-8.0 미만', outlook: '익일 갭다운 고위험 · 돌파 금지, 눌림/매집/급락반등은 강세장·순환매장 한정 축소 운용', color: '🔴' }
  ],
  gapEntryAdjustments: [
    { grade: 'G-A', trend: '✅ 100% 진입', reversal: '✅ 100% 진입', note: '익일 프리마켓 갭업 익절 최적 환경' },
    { grade: 'G-B', trend: '✅ 100% 진입', reversal: '✅ 80% 진입', note: '기본 운용' },
    { grade: 'G-C', trend: '✅ 70% 진입', reversal: '⚠️ 50% 진입', note: '포지션 축소. 손절폭 동일 유지' },
    { grade: 'G-D', trend: '⚠️ S등급만 50% 허용', reversal: '❌ 신규 진입 보류', note: 'A·B등급 당일 신규 진입 금지' },
    { grade: 'G-E', trend: '⚠️ 눌림목·매집 A/S만 50% 허용 · 돌파 금지', reversal: '⚠️ A/S만 50% 허용', note: '강세장·순환매장 한정, 개별 Gate/Filter 충족 전제' }
  ],
  gapSellAdjustments: [
    { grade: 'G-A', premarket: '기본 조건 유지', stopLoss: '기본 손절폭 유지', swing: '적극 허용' },
    { grade: 'G-B', premarket: '기본 조건 유지', stopLoss: '기본 유지', swing: '허용' },
    { grade: 'G-C', premarket: '프리마켓 갭업 기준 -0.5%p 하향', stopLoss: '손절폭 -0.5%p 축소', swing: '조건부 허용' },
    { grade: 'G-D', premarket: '프리마켓 첫 가격 즉시 50% 정리', stopLoss: '손절폭 -1%p 축소', swing: '금지' },
    { grade: 'G-E', premarket: '프리마켓 첫 가격 즉시 50% 정리', stopLoss: '손절폭 -1%p 축소', swing: '금지' }
  ],
  strategies: {
    pullback: {
      gates: [
        { code: 'G0', condition: '최근 20일 중 하루 이상 거래량 급증 (직전 20일 평균 대비 200% 이상)', source: '네이버 증권' },
        { code: 'G1', condition: '동적 정배열: 5MA > 20MA > 60MA이면서 5MA/20MA/60MA 중 최소 1개가 최근 5일 상승', source: '네이버 증권 일봉 차트' },
        { code: 'G2', condition: '종가 > 60일선', source: '네이버 증권 일봉 차트' },
        { code: 'G3', condition: '주봉 RSI(14) ≥ 50', source: '네이버 증권 주봉 차트' },
        { code: 'G4', condition: '일봉 MACD 히스토그램이 음전환 후 3일 이내 OR 0선 위 회복 시도 중', source: '네이버 증권 일봉 차트' },
        { code: 'G5', condition: 'KOSPI 5일선 이탈은 경고로만 반영, VKOSPI (≤30 ✅ / 30~75 ⚠️ / 거시·강세·순환 시 75~85 ⚠️ / 85 초과 ⛔)', source: '네이버 증권 시장지표' },
        { code: 'G6', condition: '당일 등락률 ≤ +12% (과열 추격 차단)', source: '네이버 증권 일봉 차트' },
        { code: 'G7', condition: '주봉 RSI(14) ≤ 80 (과매수 상한)', source: '네이버 증권 주봉 차트' },
        { code: 'G8', condition: '종가와 20MA/60MA 이격률 상한 유지 (20MA ≤ +25%, 60MA ≤ +60%)', source: '네이버 증권 일봉 차트' },
        { code: 'G9', condition: '복합 지지선 강도 70점 이상 + 현재가 아래 유효 지지 family 2개 이상이면 ✅, 45~69점 또는 family 1개면 ⚠️, 핵심 지지 부재 시만 ⛔', source: '최근 60일 일봉 기반 복합 지지선 엔진' },
        { code: 'G10', condition: '직전 고거래량 양봉 앵커 대비 거래량 80% 이상 + 음봉/약한 종가면 가짜 눌림 차단', source: '네이버 증권 일봉 차트' },
        { code: 'G11', condition: '종가가 앵커 몸통 중심값과 복합 지지선을 함께 지키는지 확인, 한 축만 이탈이면 ⚠️', source: '앵커 캔들 + 복합 지지선 엔진' },
        { code: 'G12', condition: '마지막 30분 틱 프록시에서 체결강도 < 90% 또는 매수/매도 < 0.9:1이면 장 막판 투매로 차단', source: '토스 체결 틱 프록시' },
        { code: 'G13', condition: 'KIND 임박 이벤트 차단 + 최근 3거래일 네이버 뉴스 악재 헤드라인 차단', source: 'KIND 공시 + 네이버 종목뉴스' },
        { code: 'Q1', condition: '품질 필터: 52주 고가 대비 ≥12% 눌림 + 당일 거래량 ≥ 20일 평균 80% + 수급추세 비음수 (얕은 추격·반등 거래량 부족·수급 이탈 차단)', source: '백테스트 검증 (낙폭·거래량·수급)' }
      ],
      scores: [
        { code: 'S1', condition: '당일 거래대금 순위 30위 이내', source: '네이버 증권' },
        { code: 'S2', condition: '당일 외국인 OR 기관 순매수 전환 확인', source: '네이버 증권' },
        { code: 'S3', condition: '마지막 1시간 체결강도 ≥ 100% + 마지막 30분 프록시 개선 시 장후반 흡수 가점', source: '토스 체결강도 틱 프록시' },
        { code: 'P1', condition: '당일 저가가 5일/10일/20일선 중 하나에 근접 및 지지 (1% 이내 터치)', source: '네이버 증권' },
        { code: 'P2', condition: '당일 종가가 5일/10일/20일선 중 최소 1개 위', source: '네이버 증권' },
        { code: 'P3', condition: '종가가 직전 고거래량 양봉 앵커의 몸통 중심값을 회복 및 유지', source: '네이버 증권 일봉 차트' },
        { code: 'C1', condition: '양봉 OR 아래꼬리:몸통 비율 ≥ 1:1', source: '네이버 증권' },
        { code: 'C2', condition: '당일 거래량이 5일 평균의 80% 이하 (거래량 감소)', source: '네이버 증권' },
        { code: 'C3', condition: '해당 섹터 지수가 코스피 대비 당일 outperform', source: '네이버 증권' },
        { code: 'C4', condition: '당일 거래량이 앵커 봉 거래량의 35% 이하이면 강한 수축, 60% 이하는 약한 수축', source: '네이버 증권' },
        { code: 'C5', condition: '최근 3~5거래일 네이버 뉴스에서 재료/테마 신선도 확인', source: '네이버 종목뉴스' },
        { code: 'D1', condition: '[재채점] 눌림 깊이 — 52주 고가 대비 낙폭 ≥12% 만점·8~12% 부분 (얕은 조정 감점)', source: '백테스트 재채점 (등급 corr +0.51)' },
        { code: 'D2', condition: '[재채점] 수급 추세 — 외인·기관 2일 순매수 강도 ≥+2 만점·+1 부분', source: '백테스트 재채점' },
        { code: 'D3', condition: '[재채점] 반등 거래량 — 당일/20일 평균 ≥100% 만점·80~100% 부분 (반등 관심 확인)', source: '백테스트 재채점' },
        { code: 'V1', condition: '시장·종목 혼합 변동성 기준으로 눌림목 적합도를 보조 가감점', source: '시장 레짐 + 최근 20일 일봉 변동성' }
      ],
      scoreNote: '2026-06 재채점: 등급은 D1·D2·D3 + S2·P2·C1·C5만 반영. S1·S3·P1·P3·C2·C3·C4는 수익과 무/역상관이라 등급 제외(진단 표시만 유지).'
    },
    breakout: {
      gates: [
        { code: 'G1', condition: '5일 또는 20일 KOSPI 대비 초과수익률 > 0', source: '네이버 증권' },
        { code: 'G2', condition: '52주 고점의 92% 이상', source: '네이버 증권' },
        { code: 'G3', condition: '당일 거래대금 TOP100', source: '네이버 증권' },
        { code: 'G4', condition: '당일 거래량 ≥ 20일 평균 150%', source: '네이버 증권' },
        { code: 'G5', condition: '몸통 ≥ 70% + 윗꼬리 ≤ 몸통 30%', source: '네이버 증권' },
        { code: 'G6', condition: '당일 등락률 ≤ +12%', source: '네이버 증권' },
        { code: 'G7', condition: '종가 > 5MA AND 5MA 우상향', source: '네이버 증권' }
      ],
      scores: [
        { code: 'S1', condition: '외국인 AND 기관 당일 양매수', source: '네이버 증권' },
        { code: 'S2', condition: '체결강도 평균 ≥110% · 100% 유지 ≥70%', source: '토스 증권' },
        { code: 'P1', condition: '20일 고점 돌파 후 +5% 이내 OR 미돌파 시 95% 이상', source: '네이버 증권' },
        { code: 'P2', condition: '돌파 당일 거래량 ≥ 20일 평균 150%', source: '네이버 증권' },
        { code: 'C1', condition: '종가 ≥ 당일 고가 95%', source: '네이버 증권' },
        { code: 'C2', condition: '양봉 몸통·윗꼬리 품질 (G5와 동일)', source: '네이버 증권' },
        { code: 'C3', condition: '호가 매수 잔량 ≥ 1.2', source: '토스 증권' },
        { code: 'RS', condition: '3개월 RS 상위 25% 가점', source: '네이버 증권' },
        { code: 'V1', condition: '시장·종목 혼합 변동성 기준으로 저변동성 유리, 고변동성 불리 보조 가감점', source: '시장 레짐 + 최근 20일 일봉 변동성' }
      ]
    },
    accumulation: {
      gates: [
        { code: 'G0', condition: '최근 20일 거래량 급증 이력 ≥200%', source: '네이버 증권' },
        { code: 'G1', condition: '종가 > 60MA', source: '네이버 증권' },
        { code: 'G2', condition: '52주 고가 대비 < 92% (돌파 구간 제외)', source: '네이버 증권' },
        { code: 'G3', condition: '거래대금 TOP100', source: '네이버 증권' },
        { code: 'G4', condition: '당일 거래량 < 20일 평균 120%', source: '네이버 증권' },
        { code: 'G5', condition: 'KOSPI 5일선 + VKOSPI (눌림목 G5와 동일)', source: '네이버 증권' },
        { code: 'Q1', condition: '품질 필터: 외인 보유율 ≥25% + 20일 수익률 ≥0% (매집 주체 부재·낙하 칼날 차단)', source: '백테스트 검증 (외인지분·상대강도)' }
      ],
      scores: [
        { code: 'S1', condition: '외국인 AND 기관 당일 양매수', source: '네이버 증권' },
        { code: 'S2', condition: '2일 수급 개선 (연속 순매수 또는 당일 양매수+전일 유지)', source: '네이버 증권' },
        { code: 'S3', condition: '마지막 1시간 평균 체결강도 ≥ 100%', source: '토스 체결강도 틱 프록시' },
        { code: 'S4', condition: '마지막 1시간 평균 체결강도 > 당일 평균 체결강도', source: '토스 체결강도 틱 프록시' },
        { code: 'S5', condition: '최근 5거래일 매집 추세 (외국인/기관 중 누적·양수 일수·증가 흐름 우위 주체)', source: '네이버 증권' },
        { code: 'P1', condition: '종가가 20MA 98~102% (횡보·눌림)', source: '네이버 증권' },
        { code: 'P2', condition: '5MA > 20MA', source: '네이버 증권' },
        { code: 'C1', condition: '당일 거래량 ≤ 5일 평균 90%', source: '네이버 증권' },
        { code: 'C2', condition: '당일 등락 -3% ~ +5%', source: '네이버 증권' },
        { code: 'C3', condition: '섹터 outperform', source: '네이버 증권' },
        { code: 'C4', condition: '마지막 30분 틱 프록시 매수/매도 비율 ≥ 1.1:1', source: '토스 체결 틱 프록시' },
        { code: 'V1', condition: '시장·종목 혼합 변동성 기준으로 고변동성 유리, 저변동성 불리 보조 가감점', source: '시장 레짐 + 최근 20일 일봉 변동성' }
      ]
    },
    momentum: {
      gates: [
        { code: 'G1', condition: '(레거시) breakout G1-G7로 이전', source: '네이버 증권' }
      ],
      scores: []
    },
    reversal: {
      filters: [
        { code: 'F1', condition: '거래대금 당일 100위 이내' },
        { code: 'F2', condition: '시가총액 8조원 이상 (대형·준대형 리더 우선)' },
        { code: 'F3', condition: '실적발표 D-2, 분할/합병/배당락 D-5 이내 제외' },
        { code: 'F4', condition: '동일 종목 본 전략 진입 후 5거래일 이내 재진입 금지' }
      ],
      gates: [
        { code: 'G1', condition: '직전 1개월 누적 상승률 ≥ +20% (주도주·강한 순환매 자격)', source: '네이버 일봉' },
        { code: 'G2', condition: '직전 단기 고점(20거래일 최고종가) 대비 -7% ~ -20% 하락 구간', source: '네이버 일봉' },
        { code: 'G3', condition: '종가 > 60MA (장기 추세 베이스 유지)', source: '네이버 일봉' },
        { code: 'G4', condition: '직전 5거래일 내 일봉 -4% 이상 급락 1회 이상 발생', source: '네이버 일봉' },
        { code: 'G5', condition: '안정화 캔들 패턴 (G5-a 양봉 / G5-b 긴아래꼬리 / G5-c 도지)', source: '네이버 일봉' },
        { code: 'Q1', condition: '품질 필터: 20MA 이격 ≤ +22% + 일봉 RSI(14) ≤ 72 (과이격·과매수로 소진된 반등 차단)', source: '백테스트 검증 (이격·RSI)' }
      ],
      scores: [
        { code: 'S1', condition: '외국인 OR 기관 당일 순매수 전환 (전일 대비 부호 반전)', source: '네이버 증권' },
        { code: 'S2', condition: '토스 분당 체결강도 장중 마지막 1시간 평균 ≥ 100% + 당일 평균 ≥ 90%', source: '토스 증권' },
        { code: 'P1', condition: '종가가 20MA의 98% 이상이면 충족 (완전 상향돌파 전 근접 회복 포함)', source: '네이버 증권' },
        { code: 'P2', condition: '종가 위치가 당일 고가-저가 레인지 상단 50% 이상', source: '네이버 증권' },
        { code: 'C1', condition: '당일 거래량 5일 평균의 200% 이상 (투매 클라이맥스 확인)', source: '네이버 증권' },
        { code: 'C2', condition: '토스 호가창 매수/매도 잔량 비율 ≥ 1.0 (하방 흡수 확인)', source: '토스 증권' },
        { code: 'C3', condition: '장 마감 직전 30분봉이 양봉 또는 종가 ≥ 30분봉 시가', source: '네이버·토스' },
        { code: 'V1', condition: '시장·종목 혼합 변동성 기준으로 고변동성 유리, 저변동성 불리 보조 가감점', source: '시장 레짐 + 최근 20일 일봉 변동성' }
      ]
    }
  }
};

// 전략별 종목 지표 건전도 — stable(초록) / warn(주황) / abnormal(빨강)
// 사용자 맞춤 조정 가능. rank 계열은 숫자가 낮을수록 좋음(lowBetter).
const STRATEGY_STOCK_INDICATOR_PROFILES = {
  pullback: {
    label: '눌림목',
    indicators: [
      { key: 'vs52wHighPct', label: '52주 고가 대비', unit: '%', mode: 'band', ranges: { stable: [72, 94], warn: [60, 72], abnormal: [0, 60] }, stableHint: '눌림 구간', warnHint: '경계 구간', abnormalHint: '고점 이탈 과다' },
      { key: 'ma20GapPct', label: '20일선 이격', unit: '%', mode: 'band', ranges: { stable: [-4, 4], warn: [-8, -4], abnormal: [-100, -8] }, stableHint: '이격 안정', warnHint: '이격 확대', abnormalHint: '추세 이탈' },
      { key: 'rsi14', label: 'RSI(14)', unit: '', mode: 'band', ranges: { stable: [42, 62], warn: [35, 42], abnormal: [0, 35] }, stableHint: '눌림 적정', warnHint: '약세 경계', abnormalHint: '과매도·추세 약화' },
      { key: 'volumeRatio20d', label: '거래량/20일 평균', unit: '%', mode: 'band', ranges: { stable: [70, 160], warn: [160, 260], abnormal: [260, 9999] }, stableHint: '수축·완화', warnHint: '거래량 증가', abnormalHint: '거래량 과열' },
      { key: 'supportDistancePct', label: '지지선 이격', unit: '%', mode: 'band', ranges: { stable: [0, 3], warn: [3, 6], abnormal: [6, 100] }, stableHint: '지지 근접', warnHint: '지지 이탈 경계', abnormalHint: '지지 이탈' },
      { key: 'per', label: 'PER', unit: '배', mode: 'band', ranges: { stable: [6, 28], warn: [28, 45], abnormal: [45, 9999] }, stableHint: '밸류 안정', warnHint: '밸류 부담', abnormalHint: '고평가' },
      { key: 'pbr', label: 'PBR', unit: '배', mode: 'band', ranges: { stable: [0.6, 3.2], warn: [3.2, 5], abnormal: [5, 9999] }, stableHint: '자산가치 안정', warnHint: '자산가치 부담', abnormalHint: '고PBR' }
    ]
  },
  accumulation: {
    label: '수급 매집형',
    indicators: [
      { key: 'supplyTrendScore', label: '외인·기관 순매수', unit: '점', mode: 'highBetter', ranges: { stable: [1, 10], warn: [0, 1], abnormal: [-10, 0] }, stableHint: '수급 유입', warnHint: '수급 중립', abnormalHint: '수급 이탈' },
      { key: 'foreignRate', label: '외국인 보유비율', unit: '%', mode: 'band', ranges: { stable: [8, 45], warn: [45, 60], abnormal: [0, 8] }, stableHint: '보유 안정', warnHint: '보유 과열', abnormalHint: '보유 낮음' },
      { key: 'volumeRatio20d', label: '거래량/20일 평균', unit: '%', mode: 'band', ranges: { stable: [45, 115], warn: [115, 140], abnormal: [140, 9999] }, stableHint: '매집형 수축', warnHint: '거래량 증가', abnormalHint: '돌파 전 과열' },
      { key: 'vs52wHighPct', label: '52주 고가 대비', unit: '%', mode: 'band', ranges: { stable: [68, 91], warn: [91, 95], abnormal: [95, 100] }, stableHint: '돌파 전 구간', warnHint: '고점 근접', abnormalHint: '이미 돌파권' },
      { key: 'ma20GapPct', label: '20MA 대비', unit: '%', mode: 'band', ranges: { stable: [-2, 2], warn: [2, 5], abnormal: [5, 100] }, stableHint: '횡보 안정', warnHint: '상단 이탈', abnormalHint: '추격 구간' },
      { key: 'marketCapRank', label: '시가총액 순위', unit: '위', mode: 'lowBetter', ranges: { stable: [1, 80], warn: [80, 150], abnormal: [150, 9999] }, stableHint: '유동성 양호', warnHint: '중소형', abnormalHint: '소형·비유동' }
    ]
  },
  breakout: {
    label: '주도주 돌파형',
    indicators: [
      { key: 'vs52wHighPct', label: '52주 고가 대비', unit: '%', mode: 'band', ranges: { stable: [90, 100], warn: [82, 90], abnormal: [0, 82] }, stableHint: '돌파권', warnHint: '돌파 직전', abnormalHint: '고점 이탈' },
      { key: 'tradingValueRank', label: '거래대금 순위', unit: '위', mode: 'lowBetter', ranges: { stable: [1, 100], warn: [100, 150], abnormal: [150, 9999] }, stableHint: '주도 수급', warnHint: '수급 약화', abnormalHint: '비주도' },
      { key: 'volumeRatio20d', label: '거래량/20일 평균', unit: '%', mode: 'highBetter', ranges: { stable: [140, 9999], warn: [110, 140], abnormal: [0, 110] }, stableHint: '거래량 동반', warnHint: '거래량 부족', abnormalHint: '돌파 신뢰 낮음' },
      { key: 'rs20Pct', label: '20일 상대강도', unit: '%', mode: 'highBetter', ranges: { stable: [3, 9999], warn: [0, 3], abnormal: [-9999, 0] }, stableHint: '상대강도 우위', warnHint: '상대강도 보합', abnormalHint: '상대강도 열위' },
      { key: 'marketCapRank', label: '시가총액 순위', unit: '위', mode: 'lowBetter', ranges: { stable: [1, 60], warn: [60, 120], abnormal: [120, 9999] }, stableHint: '대형·주도', warnHint: '중형', abnormalHint: '소형' },
      { key: 'cnsPer', label: '추정 PER', unit: '배', mode: 'band', ranges: { stable: [8, 45], warn: [45, 70], abnormal: [70, 9999] }, stableHint: '성장 프리미엄 허용', warnHint: '프리미엄 부담', abnormalHint: '과열 밸류' }
    ]
  },
  reversal: {
    label: '급락 반등',
    indicators: [
      { key: 'dropFrom52wHighPct', label: '52주 고점 대비 하락', unit: '%', mode: 'band', ranges: { stable: [12, 38], warn: [38, 52], abnormal: [52, 100] }, stableHint: '반등 구간', warnHint: '깊은 조정', abnormalHint: '추가 하락 위험' },
      { key: 'vs52wLowPct', label: '52주 저가 대비', unit: '%', mode: 'band', ranges: { stable: [8, 45], warn: [45, 70], abnormal: [70, 200] }, stableHint: '저점 이탈 회복', warnHint: '반등 진행', abnormalHint: '고점 회복 과다' },
      { key: 'pbr', label: 'PBR', unit: '배', mode: 'band', ranges: { stable: [0.4, 2.5], warn: [2.5, 4], abnormal: [4, 9999] }, stableHint: '자산가치 안정', warnHint: '자산가치 부담', abnormalHint: '고PBR' },
      { key: 'foreignRate', label: '외국인 보유비율', unit: '%', mode: 'band', ranges: { stable: [10, 55], warn: [55, 70], abnormal: [0, 10] }, stableHint: '보유 안정', warnHint: '보유 과열', abnormalHint: '보유 낮음' },
      { key: 'volumeRatio20d', label: '거래량/20일 평균', unit: '%', mode: 'band', ranges: { stable: [130, 420], warn: [80, 130], abnormal: [0, 80] }, stableHint: '투매 후 수급', warnHint: '거래량 부족', abnormalHint: '관심 소멸' },
      { key: 'per', label: 'PER', unit: '배', mode: 'band', ranges: { stable: [4, 35], warn: [35, 60], abnormal: [60, 9999] }, stableHint: '밸류 부담 낮음', warnHint: '밸류 부담', abnormalHint: '고평가·적자' }
    ]
  }
};

const STRATEGY_META = {
  pullback: {
    label: '📊 눌림목 종가베팅',
    shortLabel: '눌림목',
    noun: '눌림목 베팅'
  },
  accumulation: {
    label: '🔥 수급 매집형 종가베팅',
    shortLabel: '수급 매집형',
    noun: '수급 매집형'
  },
  breakout: {
    label: '🚀 주도주 돌파형 종가베팅',
    shortLabel: '주도주 돌파형',
    noun: '주도주 돌파형'
  },
  momentum: {
    label: '🚀 주도주 돌파형 종가베팅',
    shortLabel: '주도주 돌파형',
    noun: '주도주 돌파형'
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
