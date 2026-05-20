# 종가베팅 자동화 시스템 — 규칙기반 앱 설계 + 개선안

> **버전**: v1.0 계획안
> **목표**: 종가베팅 시장 분석 루틴 v3.6을 100% 규칙기반 코드로 구현 + 운영 가능한 자동화 시스템 구축
> **원칙**: AI 에이전트 의존 제거 · 결정론적 · 재현 가능 · 백테스트 가능

---

## 1. 프로젝트 개요

### 1.1 핵심 목표

매일 15:40 (한국장 마감 10분 후) 자동 실행되어, **데이터 수집 → 분석 → 판정 → Notion 업로드**까지 인간 개입 0으로 완료하는 시스템.

### 1.2 설계 원칙

| 원칙 | 의미 |
|---|---|
| **결정론적** | 같은 입력 → 항상 같은 출력 (AI 비결정성 제거) |
| **재현 가능** | 과거 임의 날짜의 분석을 재실행 가능 (백테스트 전제) |
| **모듈러** | 크롤러·규칙엔진·렌더러·업로더 완전 분리 |
| **장애 격리** | 한 모듈 실패가 전체 파이프라인 중단으로 이어지지 않음 |
| **관측 가능** | 모든 판정 근거가 로그·DB에 영속화 |

### 1.3 기존 방식 대비 이점

| 항목 | 현재 (Claude 수동) | 신규 (규칙기반 앱) |
|---|---|---|
| 실행 시간 | 30~60분 | 1~2분 |
| 일일 비용 | API 비용 + 수동 시간 | ~0원 (Notion 무료티어) |
| 재현성 | 낮음 (LLM 비결정성) | 100% |
| 백테스트 | 불가능 | 가능 |
| 데이터 접근 | 네트워크 제한으로 실패 | 로컬 실행으로 무제한 |

---

## 2. 시스템 아키텍처

### 2.1 전체 구조

```
┌──────────────────────────────────────────────────────────┐
│                    스케줄러 (cron / APScheduler)            │
│                  매일 평일 15:40 KST 실행                    │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│  ① 크롤러 (collectors/)                                   │
│  ├─ krx_collector.py        : pykrx → TOP30, OHLCV       │
│  ├─ global_collector.py     : FDR → VIX, NQ, SOX, FX    │
│  ├─ vkospi_collector.py     : KRX → 변동성지수            │
│  ├─ disclosure_collector.py : DART → 공시, 감리, 관리     │
│  └─ event_collector.py      : KRX → 실적/합병 캘린더      │
└─────────────────────────┬────────────────────────────────┘
                          ↓ data.json
┌──────────────────────────────────────────────────────────┐
│  ② 지표 계산 (indicators/)                                │
│  ├─ moving_average.py  : 5/20/60MA + 방향 판정           │
│  ├─ rsi.py             : RSI(14) 일봉 + 주봉             │
│  ├─ macd.py            : MACD 히스토그램 부호 / 0선 회복  │
│  ├─ relative_strength.py : RS 백분위                    │
│  └─ execution_strength.py : 체결강도 (KRX 체결 데이터)   │
└─────────────────────────┬────────────────────────────────┘
                          ↓ enriched_data.json
┌──────────────────────────────────────────────────────────┐
│  ③ 규칙엔진 (engine/)                                     │
│  ├─ regime_classifier.py  : 4-레짐 판정 (§3)             │
│  ├─ gap_scorer.py         : 갭 스코어 (§4)               │
│  ├─ filter_pipeline.py    : 공통 사전필터 (§5)            │
│  ├─ gate_checker.py       : G1~G5 Gate 조건 (§6,§7)      │
│  ├─ scorer.py             : 항목별 점수 + VKOSPI 보정     │
│  ├─ ranker.py             : TOP3 선정                    │
│  └─ position_manager.py   : 보유종목 연속성 + 스톱로스    │
└─────────────────────────┬────────────────────────────────┘
                          ↓ analysis_result.json
┌──────────────────────────────────────────────────────────┐
│  ④ 렌더러 (renderer/)                                     │
│  ├─ md_renderer.py     : Jinja2 → Notion-flavored MD   │
│  └─ templates/         : §15 출력 포맷 템플릿            │
└─────────────────────────┬────────────────────────────────┘
                          ↓ report.md
┌──────────────────────────────────────────────────────────┐
│  ⑤ 업로더 (uploader/)                                     │
│  ├─ notion_uploader.py : notion-client → 페이지 교체     │
│  └─ archive.py         : 일일 리포트 백업 (S3/로컬)        │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│  ⑥ 알림 (notifier/)                                      │
│  ├─ kakao_notifier.py  : 카카오톡 나에게 보내기           │
│  ├─ slack_notifier.py  : Slack 웹훅                     │
│  └─ email_notifier.py  : SMTP                          │
└──────────────────────────────────────────────────────────┘
```

### 2.2 데이터 흐름

```
[외부 API] → [Raw Data] → [Indicators] → [Rules Engine] → [Report] → [Notion]
                ↓              ↓              ↓             ↓
              SQLite        SQLite        SQLite       파일/S3
                              ↓
                        [백테스트 / 대시보드]
```

---

## 3. 모듈 상세 설계

### 3.1 크롤러 모듈 (collectors/)

**핵심 라이브러리**: `pykrx`, `FinanceDataReader`, `OpenDartReader`

```python
# krx_collector.py
from pykrx import stock
from datetime import datetime

def get_top30_by_value(date: str) -> list[dict]:
    """거래대금 TOP30 (KOSPI+KOSDAQ 통합)"""
    df = stock.get_market_trading_value_by_ticker(date, market="ALL")
    return df.nlargest(30, "거래대금").to_dict("records")

def get_ohlcv(ticker: str, start: str, end: str) -> pd.DataFrame:
    """개별 종목 OHLCV (MA·RSI·MACD 계산 입력)"""
    return stock.get_market_ohlcv_by_date(start, end, ticker)
```

**수집 대상**:

| 데이터 | 소스 | 라이브러리 | 빈도 |
|---|---|---|---|
| 거래대금 TOP30 | KRX | pykrx | 일 1회 |
| 개별 OHLCV (90일) | KRX | pykrx | 일 1회 |
| VKOSPI | KRX | pykrx (지수 코드 1005) | 일 1회 |
| VIX | CBOE | FinanceDataReader | 일 1회 |
| NQ 선물 | CME | FinanceDataReader | 실시간 |
| SOX | NASDAQ | FinanceDataReader | 일 1회 |
| 미국 10Y | FRED | FinanceDataReader | 일 1회 |
| USD/KRW | 한은 | FinanceDataReader | 실시간 |
| 공시 / 감리 / 관리 | DART | OpenDartReader | 일 1회 |
| 실적 캘린더 | KRX | pykrx + 스크래핑 | 일 1회 |

**폴백 전략**: 1차 소스 실패 시 2차 소스 (네이버 증권 → 다음 금융 → 야후 파이낸스) 순차 시도

### 3.2 지표 계산 모듈 (indicators/)

**핵심 라이브러리**: `pandas-ta` 또는 `ta-lib`

```python
# moving_average.py
def calc_ma(ohlcv: pd.DataFrame, periods=(5, 20, 60)) -> dict:
    result = {}
    for p in periods:
        ma = ohlcv["종가"].rolling(p).mean()
        result[f"ma{p}"] = ma.iloc[-1]
        result[f"ma{p}_direction"] = "up" if ma.iloc[-1] > ma.iloc[-2] else "down"
    return result

# macd.py
def calc_macd_status(ohlcv: pd.DataFrame) -> dict:
    """MACD 히스토그램 음전환 후 3일 이내 or 0선 위 회복 판정"""
    macd_line = ohlcv["종가"].ewm(span=12).mean() - ohlcv["종가"].ewm(span=26).mean()
    signal = macd_line.ewm(span=9).mean()
    hist = macd_line - signal

    # 최근 3일 내 음전환 여부
    recent_neg_cross = (hist.iloc[-3:] < 0).any() and (hist.shift(1).iloc[-3:] > 0).any()
    above_zero_recovery = hist.iloc[-1] > 0 and (hist.iloc[-5:-1] < 0).any()

    return {
        "histogram": hist.iloc[-1],
        "g4_condition": recent_neg_cross or above_zero_recovery
    }
```

### 3.3 규칙엔진 모듈 (engine/)

#### 3.3.1 레짐 판정 (§3)

```python
# regime_classifier.py
def classify_regime(vkospi: float, kospi_60ma_dir: str,
                    kospi_20ma_dir: str, new_high_count: int) -> str:
    """4-레짐 분류"""
    if vkospi > 30 or kospi_60ma_dir == "down":
        return "약세장"
    if (kospi_60ma_dir == "up" and kospi_20ma_dir == "up" and vkospi < 20):
        return "강세장"
    if kospi_60ma_dir == "sideways" and new_high_count >= 30:
        return "순환매장"
    return "박스권"
```

#### 3.3.2 갭 스코어 (§4)

```python
# gap_scorer.py
WEIGHTS = {"nq": 2.5, "vix": 2.0, "us10y": 1.5, "usdkrw": 1.5, "sox": 1.0}

def calc_indicator_score(name: str, value: float, change_pct: float) -> float:
    """지표별 점수 산출 (루틴 §4 규칙 그대로)"""
    if name == "nq":
        if change_pct >= 1.5: return 1.0
        if change_pct >= 0.5: return 0.5
        if change_pct >= -0.5: return 0.0
        if change_pct >= -1.5: return -0.5
        return -1.0
    # ... (vix, us10y, usdkrw, sox 동일 패턴)

def grade(total: float) -> str:
    if total >= 7: return "G-A"
    if total >= 3: return "G-B"
    if total >= -3: return "G-C"
    if total >= -7: return "G-D"
    return "G-E"
```

#### 3.3.3 Gate 체크 (§6, §7)

```python
# gate_checker.py
def check_pullback_gates(stock_data: dict) -> dict[str, bool]:
    """전략 ① 눌림목 G1~G4 체크"""
    g1 = (stock_data["ma5"] > stock_data["ma20"] and
          stock_data["ma5_direction"] == "up" and
          stock_data["ma20_direction"] == "up")
    g2 = stock_data["close"] > stock_data["ma60"]
    g3 = stock_data["weekly_rsi14"] >= 50
    g4 = stock_data["g4_condition"]  # MACD 조건
    return {"G1": g1, "G2": g2, "G3": g3, "G4": g4, "passed": all([g1, g2, g3, g4])}
```

#### 3.3.4 점수 계산 + VKOSPI 보정

```python
# scorer.py
def apply_vkospi_correction(score: float, strategy: int, vkospi: float) -> float:
    if strategy in (1, 2):
        if vkospi > 30: return score * 0.8
        if vkospi > 20: return score * 0.9
    elif strategy == 3:
        if 20 < vkospi <= 30: return score * 1.0  # 최적
        if vkospi > 30: return score * 0.85
    return score
```

### 3.4 렌더러 모듈

**Jinja2 템플릿** 사용. 루틴 §15 출력 포맷을 정확히 재현.

```python
# md_renderer.py
from jinja2 import Environment, FileSystemLoader

def render_report(analysis: dict, date: str) -> str:
    env = Environment(loader=FileSystemLoader("templates/"))
    template = env.get_template("daily_report.md.j2")
    return template.render(analysis=analysis, date=date)
```

### 3.5 Notion 업로더

```python
# notion_uploader.py
from notion_client import Client

def replace_page_content(page_id: str, markdown: str):
    notion = Client(auth=os.environ["NOTION_TOKEN"])
    blocks = markdown_to_notion_blocks(markdown)
    # 기존 블록 전체 삭제
    existing = notion.blocks.children.list(page_id)
    for block in existing["results"]:
        notion.blocks.delete(block["id"])
    # 새 블록 추가
    notion.blocks.children.append(page_id, children=blocks)
```

---

## 4. 데이터 모델

### 4.1 SQLite 스키마

```sql
-- 일일 시장 데이터
CREATE TABLE market_daily (
    date TEXT PRIMARY KEY,
    vkospi REAL, kospi_close REAL, kospi_60ma REAL, kospi_20ma REAL,
    foreign_net REAL, institution_net REAL,
    regime TEXT, gap_score REAL, gap_grade TEXT
);

-- 종목별 일일 OHLCV + 지표
CREATE TABLE stock_daily (
    date TEXT, ticker TEXT, name TEXT,
    open REAL, high REAL, low REAL, close REAL, volume INTEGER, value REAL,
    ma5 REAL, ma20 REAL, ma60 REAL,
    rsi14_daily REAL, rsi14_weekly REAL,
    macd_hist REAL, g4_condition INTEGER,
    PRIMARY KEY (date, ticker)
);

-- 분석 결과 (TOP3 선정 이력)
CREATE TABLE selections (
    date TEXT, strategy INTEGER, rank INTEGER,
    ticker TEXT, name TEXT, score REAL, grade TEXT,
    g1 INTEGER, g2 INTEGER, g3 INTEGER, g4 INTEGER, g5 INTEGER,
    PRIMARY KEY (date, strategy, rank)
);

-- 가상 포지션 추적 (백테스트용)
CREATE TABLE positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entry_date TEXT, exit_date TEXT,
    ticker TEXT, strategy INTEGER,
    entry_price REAL, exit_price REAL,
    pnl_pct REAL, exit_reason TEXT
);
```

### 4.2 중간 산출물 (JSON)

```json
{
  "date": "2026-05-20",
  "market": {
    "vkospi": 72.5,
    "kospi_close": 7271.66,
    "regime": "약세장",
    "gap_score": -3.5,
    "gap_grade": "G-D"
  },
  "top30": [
    {"ticker": "000660", "name": "SK하이닉스", "value": 4250000000000}
  ],
  "selections": {
    "strategy_1": [],
    "strategy_2": [],
    "strategy_3": [{"ticker": "000660", "score": 7.2, "grade": "A"}]
  }
}
```

---

## 5. 루틴 v3.6 → 코드 매핑표

| 루틴 섹션 | 모듈 | 함수 | 비고 |
|---|---|---|---|
| §3 레짐 판정 | engine/regime_classifier.py | classify_regime() | if/else |
| §4 갭 스코어 | engine/gap_scorer.py | calc_gap_score() | 가중합산 |
| §5 공통 사전필터 | engine/filter_pipeline.py | apply_common_filters() | 필터 체인 |
| §6 전략 ① Gate | engine/gate_checker.py | check_pullback_gates() | 4-조건 AND |
| §7 전략 ② Gate | engine/gate_checker.py | check_accumulation_gates() | 5-조건 AND |
| §8 전략 ③ 조건 | engine/gate_checker.py | check_crash_rebound() | 시총·낙폭 |
| §9 점수 계산 | engine/scorer.py | calc_score() | 항목별 합산 |
| §10 VKOSPI 보정 | engine/scorer.py | apply_vkospi_correction() | 배율 적용 |
| §11 등급 판정 | engine/scorer.py | grade_score() | 임계값 |
| §12 보유 연속성 | engine/position_manager.py | check_continuity() | DB 조회 |
| §13 스톱로스 | engine/position_manager.py | check_stop_loss() | 가격 비교 |
| §14 익일 체크리스트 | renderer/templates/ | checklist.j2 | 템플릿 |
| §15 출력 포맷 | renderer/md_renderer.py | render_report() | Jinja2 |
| §16 특이사항 | engine/anomaly_detector.py | detect_events() | 캘린더 조회 |

**→ 100% 코드 매핑 가능. AI 호출 0회.**

---

## 6. 개선안 (v3.6 → v4.0)

### 6.1 백테스트 엔진 추가 🔴 핵심

루틴이 정말 수익 나는지 **검증 가능한 시스템** 구축:

```python
# backtest/engine.py
def backtest(start_date: str, end_date: str, initial_capital: int = 10_000_000):
    """과거 임의 구간 시뮬레이션"""
    portfolio = Portfolio(initial_capital)
    for date in trading_days(start_date, end_date):
        # 1. 그날 데이터로 분석 재실행
        analysis = run_analysis(date)
        # 2. 진입 시그널 → 가상 매수
        for pick in analysis["selections"]["strategy_1"]:
            portfolio.enter(pick, date)
        # 3. 보유 종목 스톱로스 / 익절 체크
        portfolio.check_exits(date)
    return portfolio.report()
```

**산출물**:
- 누적 수익률 / MDD / Sharpe / Sortino / 승률
- 전략별 (①②③) 성과 분리
- 레짐별 (강세장/약세장/박스권/순환매장) 성과 분리
- 월별 수익 곡선 차트

### 6.2 파라미터 튜닝 자동화

루틴의 임계값(VKOSPI 30, RSI 50, 점수 7.5 등)을 **그리드서치**로 최적화:

```python
# tuning/grid_search.py
param_grid = {
    "vkospi_threshold": [25, 30, 35],
    "rsi_min": [45, 50, 55],
    "score_a_grade": [7.0, 7.5, 8.0]
}
best = max(param_grid combinations, key=lambda p: backtest(params=p).sharpe)
```

### 6.3 멀티소스 데이터 검증

같은 지표를 **2개 이상 소스에서 수집**해 불일치 감지:

```python
# 예: VKOSPI를 KRX(pykrx) + Investing.com 두 곳에서 받아 차이 1%↑이면 alert
def cross_validate(metric: str) -> tuple[float, bool]:
    primary = fetch_from_krx(metric)
    secondary = fetch_from_investing(metric)
    is_valid = abs(primary - secondary) / primary < 0.01
    return primary, is_valid
```

### 6.4 이벤트 자동 감지

공시·뉴스 수집해 이벤트(실적 D-1, 합병 D-3) **자동 플래깅**:

```python
# event_detector/
class EventDetector:
    def detect_earnings_dminus(self, ticker: str, date: str, days: int = 1) -> bool:
        """KRX 실적 캘린더 조회 → days 이내 실적이면 True"""

    def detect_merger_dminus(self, ticker: str, date: str, days: int = 3) -> bool:
        """DART 공시 → 'M&A·합병' 키워드 조회"""

    def detect_warning_status(self, ticker: str) -> bool:
        """투자경고·관리·감리 종목 자동 제외"""
```

→ §5 사전필터의 "공시 위반 1개월 이내 제외"를 코드로 완전 자동화

### 6.5 텔레메트리 & 대시보드

**Streamlit / FastAPI + Grafana** 기반 모니터링:

- 일일 분석 결과 히스토리
- 가상 포지션 손익 추적
- 데이터 수집 성공률 / 지연
- 규칙엔진 판정 분포 (레짐별·갭등급별 빈도)

```python
# dashboard/app.py
import streamlit as st

st.title("종가베팅 시스템 대시보드")
st.metric("YTD 수익률", f"{portfolio.ytd_return:.2%}")
st.line_chart(daily_returns)
```

### 6.6 알림 시스템

| 채널 | 트리거 | 메시지 |
|---|---|---|
| 카카오톡 | TOP3 선정 완료 | 종목명 + 점수 + Notion 링크 |
| 카카오톡 | 스톱로스 발동 | 보유종목 + 손절가 도달 |
| Slack | 데이터 수집 실패 | 어떤 소스 / 어떤 종목 |
| Email | 주간 리포트 | 한주 손익 + 다음주 관전포인트 |

### 6.7 페이퍼 트레이딩 → 실전 연동 (선택)

**한국투자증권 KIS API** 연동으로 가상 매매 → 자동 매매까지 확장:

```python
# trading/kis_executor.py (선택 모듈)
def execute_signal(signal: dict, paper: bool = True):
    if paper:
        portfolio.simulate(signal)
    else:
        kis_api.place_order(signal["ticker"], signal["quantity"])
```

⚠️ 자동 매매는 충분한 백테스트 + 페이퍼 트레이딩 검증 후에만 활성화

### 6.8 캐시 레이어

같은 날 재실행 시 외부 API 재호출 방지:

```python
# 90일치 OHLCV는 한번 받으면 그날 안에는 캐시 사용
@cache(ttl_seconds=3600)
def get_ohlcv_cached(ticker: str, date: str): ...
```

### 6.9 장애 복구 (Resilience)

- 크롤러 실패 → 재시도 (지수 백오프 3회)
- 모든 재시도 실패 → 전일 데이터로 폴백 + 알림
- Notion 업로드 실패 → 로컬 MD 파일 저장 + 알림
- 부분 실패 허용 (예: SOX 못받아도 나머지 지표로 갭 점수 계산)

### 6.10 머신러닝 보조 (장기·선택)

규칙엔진은 **결정론적 코어**로 두고, ML은 **보조 신호**로만:

- 시장 레짐 분류기 (HMM/LSTM)
- 종목별 단기 변동성 예측
- 점수 보정 인자 (전통 점수 × ML 신뢰도)

→ ML은 v4.5+ 마일스톤. v4.0까지는 순수 규칙기반.

---

## 7. 개발 로드맵

### Phase 1 — MVP (2주)

목표: **일일 자동 분석 + Notion 업로드 작동**

- [ ] 프로젝트 골격 (pyproject.toml, 디렉토리 구조)
- [ ] 크롤러: pykrx + FinanceDataReader 통합
- [ ] 지표 계산: MA / RSI / MACD
- [ ] 규칙엔진: 레짐 + 갭스코어 + Gate + 점수
- [ ] MD 렌더러 (Jinja2)
- [ ] Notion 업로더
- [ ] cron 스케줄러
- [ ] SQLite 영속화

**완료 기준**: 매일 자동으로 v3.6 분석 결과가 Notion에 게시됨

### Phase 2 — 검증 (1주)

목표: **백테스트로 루틴 자체의 유효성 검증**

- [ ] 백테스트 엔진 (과거 6개월~1년)
- [ ] 가상 포지션 추적
- [ ] 성과 지표 (수익률, MDD, Sharpe)
- [ ] 전략별·레짐별 성과 분리

**완료 기준**: "루틴 v3.6은 약세장에서 수익률 -X%, 강세장에서 +Y%" 같은 정량 평가 가능

### Phase 3 — 운영 (1주)

목표: **장기 운영 안정성 확보**

- [ ] 멀티소스 데이터 검증
- [ ] 이벤트 자동 감지 (실적/합병/공시)
- [ ] 알림 시스템 (카카오톡 / Slack)
- [ ] 장애 복구 로직
- [ ] 캐시 레이어

**완료 기준**: 30일 무중단 운영, 사용자 개입 0

### Phase 4 — 최적화 (2주, 선택)

목표: **루틴 자체 개선**

- [ ] 파라미터 튜닝 (그리드서치)
- [ ] 대시보드 (Streamlit)
- [ ] 페이퍼 트레이딩 모드
- [ ] 주간 자동 리포트

### Phase 5 — 확장 (TBD)

- [ ] KIS API 연동 (선택, 신중히)
- [ ] ML 보조 신호 (선택)
- [ ] 모바일 알림 앱

---

## 8. 기술 스택

| 영역 | 선택 | 사유 |
|---|---|---|
| 언어 | Python 3.11+ | 금융 데이터 생태계 (pykrx, FDR, pandas) |
| 패키지 관리 | uv / Poetry | 빠르고 lockfile 지원 |
| 데이터 | pandas, numpy | 표준 |
| 지표 계산 | pandas-ta | TA-Lib 없이 순수 Python |
| 데이터 소스 | pykrx, FinanceDataReader, OpenDartReader | KRX 공식·무료 |
| DB | SQLite | 단일 사용자 / 파일 기반 |
| 템플릿 | Jinja2 | MD 렌더링 |
| 스케줄 | cron (Linux) / APScheduler | 의존성 최소 |
| Notion | notion-client | 공식 |
| 알림 | requests (카카오 API), slack_sdk | |
| 테스트 | pytest + pytest-asyncio | |
| 로깅 | structlog | 구조화된 JSON 로그 |
| 대시보드 | Streamlit | Phase 4 |

---

## 9. 디렉토리 구조

```
jongga-betting/
├── pyproject.toml
├── README.md
├── config/
│   ├── settings.yaml          # VKOSPI 임계값, 점수 가중치 등
│   └── secrets.env            # Notion 토큰, 카카오 API 키
├── src/
│   ├── collectors/
│   ├── indicators/
│   ├── engine/
│   ├── renderer/
│   │   └── templates/
│   ├── uploader/
│   ├── notifier/
│   ├── backtest/
│   ├── dashboard/
│   └── main.py
├── data/
│   ├── jongga.db              # SQLite
│   └── reports/               # 일일 MD 백업
├── tests/
│   ├── test_engine.py
│   ├── test_indicators.py
│   └── fixtures/              # 과거 데이터 샘플
└── scripts/
    ├── run_daily.sh           # cron 진입점
    └── run_backtest.py
```

---

## 10. 리스크 및 한계

### 10.1 기술적 한계

| 한계 | 영향 | 대응 |
|---|---|---|
| 토스 체결강도 = 앱 전용 | C2 점수 산출 어려움 | KRX 체결 데이터로 대체 |
| 실적 캘린더 공식 API 없음 | D-1/D-2 자동 감지 한계 | DART + 수동 캘린더 보조 |
| 한국 휴장일 자동 인식 | cron 단순 실행 시 빈 데이터 | KRX 영업일 캘린더 사전 체크 |
| pykrx 장중 데이터 지연 | 15:30 직후 데이터 미반영 | 15:40 실행 (10분 마진) |

### 10.2 전략적 한계

- 루틴 v3.6 자체가 **수익을 보장하지 않음** — 검증은 백테스트로
- 과적합 위험: 파라미터 튜닝은 walk-forward로 신중히
- 자동매매 도입 시 슬리피지·체결 실패 등 실전 변수 고려 필요
- VKOSPI·갭 스코어 등 모든 지표는 **사후적**이므로 급변 이벤트엔 무력

### 10.3 운영 한계

- API rate limit 모니터링 필요 (Notion 3 req/s, DART 1000 req/min)
- pykrx 의존도 높음 → 라이브러리 중단 시 직접 KRX HTML 파싱 폴백 준비

---

## 11. 다음 액션

이 계획안 승인 시 **Phase 1 MVP 시작**.

순서:
1. 프로젝트 초기화 (`uv init`, 디렉토리 생성)
2. `crawler.py` 작성 + pykrx 동작 검증
3. 5/20 같은 과거 임의 날짜로 분석 전 과정 재현 테스트
4. Notion 업로드 통합 + cron 등록
5. 1주일 dry-run으로 안정성 확인

**확인 요청 사항**:

- [ ] 이 설계대로 진행 OK?
- [ ] Python 환경 OK? (또는 Node로 변경 원함?)
- [ ] 백테스트 우선순위 — Phase 2로 충분 or 더 앞당겨야?
- [ ] 자동매매(Phase 5) 포함 여부?
- [ ] 알림 채널 우선순위 (카카오톡 / Slack / Email 중)?

---

*문서 버전: v1.0*
*작성일: 2026-05-20*
*기반: 종가베팅 시장 분석 루틴 v3.6*
