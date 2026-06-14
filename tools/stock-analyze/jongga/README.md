# Jongga Collector Router

`stock-analyze` JSON generator에서 쓰는 데이터 수집 안정화 계층입니다.

수집 우선순위는 `official API -> public API -> HTTP scraper -> headless browser -> cache/manual override`입니다. 모든 collector는 값뿐 아니라 `source`, `confidence`, `fallbackLevel`, `stale`, `errors`를 포함한 envelope를 반환해야 합니다.

`collectors/api/JsonApiCollector`는 KIS, Polygon, Alpha Vantage 같은 인증형 JSON API adapter의 공통 기반입니다. API 키가 없으면 `MissingCredentials`로 명확히 실패시키고 router가 다음 fallback으로 넘어갑니다.

## 실행 (종가베팅 추천 데이터 전체 파이프라인)

장 마감 후 **한 번에** 환경 점검 → 라이브 수집·채점(stable+canary) → 산출물 검증까지 수행합니다.

| 파일 | 용도 |
|------|------|
| **`generate-jongga-data.bat`** | Windows 일상 실행 (더블클릭·터미널) |
| **`generate-jongga-data.command`** | macOS Finder 더블클릭 |
| `generate-jongga-data.sh` | macOS / Linux 터미널 |
| **`replay-jongga-data.bat`** | Windows replay-only 재검증 |
| **`replay-jongga-data.command`** | macOS Finder replay-only |
| `replay-jongga-data.sh` | macOS / Linux replay-only |
| `run_jongga_pipeline.py` | 공통 Python 오케스트레이터 |

```bat
cd tools\stock-analyze
generate-jongga-data.bat --session 1500
generate-jongga-data.bat --session 1730 --with-tests
generate-jongga-data.bat --session 1730 --no-pause --date 2026-05-26

replay-jongga-data.bat
replay-jongga-data.bat --no-pause
```

```bash
cd tools/stock-analyze
chmod +x generate-jongga-data.sh
./generate-jongga-data.sh --session 1500 --with-tests
./generate-jongga-data.sh --session 1730 --date 2026-05-26

chmod +x replay-jongga-data.sh
./replay-jongga-data.sh
```

파이프라인이 생성하는 산출물:

- `jongga/output/latest_YYYYMMDD.json` · `jongga_data_YYYYMMDD.js` (stable)
- `latest_YYYYMMDD_canary.json` · `jongga_data_YYYYMMDD_canary.js` (canary)
- `jongga/output/latest.json` · `jongga_data.js` (레거시 브리지)
- `jongga/output/jongga_history.js`
- `jongga/output/archive/YYYYMM/session_YYYYMMDD_1500*.json` · `session_YYYYMMDD_1730*.json` (세션 원본)

## GitHub Actions (평일 자동 스케줄)

워크플로: [`.github/workflows/jongga-schedule.yml`](../../../.github/workflows/jongga-schedule.yml)

| KST | UTC cron | 용도 |
|-----|----------|------|
| 15:00 | `0 6 * * 1-5` | `--session 1500` 3시 분석 raw 생성 |
| 17:30 | `30 8 * * 1-5` | `--session 1730` 5시반 분석 raw 생성 후 같은 날짜 `1500` 세션과 머지 |

- 성공 시 `jongga/output/` 변경분을 커밋·푸시 → GitHub Pages에 반영됩니다.
- **스케줄은 수 분 지연될 수 있습니다.** 15:00 / 17:30 정각 판단은 Actions만 믿지 말고, Pages에서 **「일괄 분석」** 또는 로컬 BAT를 병행하세요.
- 공휴일(휴장)에도 월~금 cron은 동작합니다. 휴장일 스킵은 추후 거래일 캘린더로 확장 가능합니다.
- 수동 실행: 저장소 **Actions** → **jongga-schedule** → **Run workflow** (`1500` / `1730`).
- GitHub Actions에서 KRX 로그인 기반 대차잔고 수집을 쓰려면 저장소 **Settings → Secrets and variables → Actions** 에 `KRX_ID`, `KRX_PW` secret을 등록하세요. workflow는 이 값을 환경변수로 주입해 사용합니다.
- workflow는 Playwright 브라우저 캐시(`~/.cache/ms-playwright`)를 사용합니다. cache miss일 때만 `python -m playwright install chromium --with-deps` 로 Chromium을 설치하고, cache hit일 때는 `python -m playwright install-deps chromium` 만 실행한 뒤 실제 Chromium launch 검증과 `MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH` 주입을 수행합니다. 이 검증이 실패하면 산출물 커밋 전에 workflow가 중단됩니다.
- `1500`은 해당 시점 raw 추천을 바로 공개 최신 파일로 반영합니다.
- `1730`은 해당 시점 raw 추천을 만든 뒤, 같은 날짜 `1500` 세션 원본이 있으면 `5시반 결과 + 3시 고유 종목`으로 머지한 최신 파일을 공개합니다.
- `1730` 세션은 종목별 `currentPrice`(스냅샷 종가)를 정규장 종가 대신 `finance.naver.com/sise/sise_quant_overtime.naver`(시간외 단일가/NXT 대체거래소 체결가) 게시판 가격으로 대체합니다 (`fetch_overtime_price_map`). 게시판에 종목이 없으면 정규장 종가를 그대로 사용합니다. 게이트·점수·등급(D1/D2/D3, Q1 등)도 이 가격을 기준으로 재계산됩니다.
- 눌림목(pullback) `D4`는 시가총액 상위 100위 이내 대형주만 대상으로 최근 10거래일 대차잔고(공매도 잔고) 변화율을 수집해 가점합니다 (`fetch_short_balance_trend_map`). 수집 우선순위는 `pykrx`(KRX 로그인 자격증명 있을 때) → KRX 공개 short loader → 공매도 종합포털이며, 셋 다 실패하거나 대형주가 아닌 종목은 데이터 부족으로 D4가 등급에 영향을 주지 않고 진단으로만 표시됩니다.
- 수급 매집(accumulation)·돌파/주도주(breakout·momentum) 전략은 같은 대차잔고 추이 `L1`만 반영합니다. `L1` 역시 D4와 동일한 `fetch_short_balance_trend_map`을 사용하며 시가총액 100위 이내 대형주만 수집됩니다. 반등(reversal) 전략과 신용잔고 기반 점수/게이트(`D5`/`L2`/`G14`)는 현재 추천·백테스트 경로에서 제거됐습니다.

## 실행 예시 (개별 명령)

```powershell
python -m unittest discover -s tools/stock-analyze/jongga/tests -p "test_*.py"
```

공개 데이터만 직접 생성할 때:

```powershell
Set-Location "tools/stock-analyze"
python -m jongga.generate_latest --session 1500 --out-dir "jongga\output" --history-js "jongga\output\jongga_history.js" --out "jongga\output\latest.json" --bridge-js "jongga\output\jongga_data.js"
python -m jongga.generate_latest --session 1730 --out-dir "jongga\output" --history-js "jongga\output\jongga_history.js" --out "jongga\output\latest.json" --bridge-js "jongga\output\jongga_data.js"
```

- 공개 소스: 네이버 모바일 API, 네이버 차트, Yahoo chart API, CNBC quote page
- 추천 universe는 네이버 모바일 전체 종목의 금일 누적 거래대금 기준 TOP100으로 제한합니다. ETF/ETN은 제외하되 41위 이하 종목을 백필하지 않습니다.
- VKOSPI는 CNBC `.KSVKOSPI` 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 폴백합니다.
- 토스 전용 지표와 이벤트 필터는 아직 수동 확인이 필요합니다.

## market-analyze 보조 레짐 (3축)

종가 JSON의 **기술 레짐**(KOSPI MA·VKOSPI)과 별도로 [`tools/market-analyze/store/results/latest.js`](../../market-analyze/store/results/latest.js)를 읽어 **적용 레짐**을 계산합니다.

| 축 | 내용 |
|----|------|
| 펀더멘털·버블 | `fundamentalAnchorScore`·`bubbleCriticalTrigger`·`marketRegimeKey`로 상승 정당성 |
| KOSPI | 종가·60/20MA 구조로 강세 확정·유지·약함 |
| 적용 | 정당 + 지수 강세 시 `강세장 ✅ (펀더·지수 정당)`까지 상향 가능 |

- 파이프라인·UI 모두 [`jongga/macro_overlay.py`](macro_overlay.py)와 [`js/market-analyze-bridge.js`](../js/market-analyze-bridge.js) 규칙을 공유합니다.
- **당일 `latest.js`가 저장소에 있어야** GHA 생성 JSON에도 macro 완화가 반영됩니다. market-analyze를 먼저 갱신·커밋하세요.
- UI는 기술 레짐 vs 적용 레짐·거시 패널을 표시하고, 배포된 JSON의 `statusLabel`을 브라우저에서 재계산합니다.
- **눌림목 G5**: 거시 정당·강세/순환 레짐이면 VKOSPI 30~70은 `⚠️`(매수 금지 아님), 30 이하는 `✅`, 70 초과만 `⛔`. 그 외는 VKOSPI 30 초과 시 `⛔`.
- **듀얼 점수** (`jongga/scoring.py`): `signalScore`(부분 점수·모니터링), `strictScore`(이진·등급), `entryEligible`(진입 가능). `grade`는 strict를 10점 척도로 환산해 산출합니다. 전략 간 점수는 비교하지 않습니다.
- **매수 등급 하한** ([`grade_policy.py`](grade_policy.py), [`js/config.js`](../js/config.js) `BUY_GRADE_MIN_SCORES`): 추세·눌림목·돌파·매집 S≥8.5 / A≥7.0 / B≥5.5, 역추세 S≥8.0 / A≥6.5 / B≥5.0 (이전 대비 0.5~1.0점 완화).

## 종가 추천 4트랙 (2026-06)

| JSON 키 | 표시명 | 요약 |
|---------|--------|------|
| `pullback` | 눌림목 | 장기 추세 눌림 + 반등 |
| `breakout` | 주도주 돌파형 | 52주 고가 90%권+, 거래량 150%+, 강마감·5MA는 경고 허용 (구 `momentum` → 읽기 alias) |
| `accumulation` | 수급 매집형 | 52주 고가 &lt;92%가 이상적이지만 근접 고점·수급 첫 유입은 경고 허용, 거래량 150% 미만 |
| `reversal` | 급락 반등 | 역추세 단기 |

**전략 구분 원칙**: 돌파는 52주 고가 90%권 이상, 매집은 52주 고가 &lt;92%를 이상형으로 봅니다. 다만 매집 G2는 초입 종목을 놓치지 않도록 `⚠️` 경고 허용이라 일부 종목은 양쪽 후보로 함께 관찰될 수 있습니다.

**레짐별 일일 슬롯 (TOP3 확정)**: 강세 3/3/3, 순환 2/3/2, 박스 1/3/3 (돌파/매집/눌림). `decide_regime`·[`strategy_regime.py`](strategy_regime.py) 참고.

**돌파형 Gate**: G1 RS·G2 52주 90%권·G3 TOP100·G4 거래량 150%·G5 캔들·G6 당일 +12% 상한·G7 5MA 상승. 단, G5·G7은 추세가 살아 있으면 `⚠️` 경고로만 남길 수 있습니다.

**매집형 Gate**: G0 2일 수급 유입·G1 60MA·G2 52주 &lt;92%·G3 TOP100·G4 당일 거래량 &lt;150%·G5 VKOSPI(눌림목 G5 재사용). G0·G2는 초입 종목을 놓치지 않도록 `⚠️` 경고 허용입니다.

**품질 게이트 Q1** ([`strategy_quality.py`](strategy_quality.py)): 백테스트(2026-05-22~06-12 후보 135건, holdout 양분 검증)로 검증한 차단 필터입니다. 전략 본래 의도와 어긋나는 후보(과열 추격·낙하 칼날·소진된 반등)를 `⛔`로 거릅니다. 라이브 엔진(게이트)과 리플레이(`stockIndicators.snapshot` 재평가)가 동일 로직을 공유합니다.

| 전략 | Q1 통과 조건 | 효과 (전체 후보 → Q1 통과) |
|------|-------------|----------------------------|
| 눌림목 | 52주 고가 대비 ≥12% 눌림 + 당일 거래량 ≥20일 평균 80% + 수급추세 ≥0 | 평균 -0.83% → **+0.91%** (승 54%→71%) |
| 매집 | 외인 보유율 ≥25% + 20일 수익률 ≥0% | 평균 -1.69% → **+0.62%** (승 33%→50%) |
| 급락반등 | 20MA 이격 ≤+22% + 일봉 RSI(14) ≤72 | 평균 +0.36% → **+1.88%** (승 69%→83%) |

3개 전략 합산은 평균 -0.72%→**+1.23%**, 누적 -84%→**+54%**(후보 117→44건)로 개선됩니다. 피처가 없으면(data_missing) 보수적으로 통과시킵니다.

**눌림목 재채점 (2026-06, [scoring.py](scoring.py) `PULLBACK_SCORE_WEIGHTS`)**: 기존 채점은 등급-수익 상관이 **-0.42**(등급↑일수록 수익↓)였습니다. 원인은 `P1`(MA 터치=낙하 잡기)·`C2`/`C4`(거래량 수축 가점)·`C3`(섹터 추격) 등 역상관 항목이 등급을 끌어올린 것. 이를 등급 산출에서 제외하고 **`D1` 눌림 깊이·`D2` 수급 추세·`D3` 반등 거래량**을 가점하도록 재배치해 상관을 **+0.51**로 전환했습니다. 결과로 `7&A`(gradeScore≥7 & 등급 A/S) 눌림목이 평균 **-3.41% → +0.91%**(승 31%→71%). 제외 항목은 `score_map`에 남아 UI 진단(`matchedRules`/`unmatchedRules`)으로만 표시됩니다. `7&A` 티어 전체(재채점+Q1 결합)는 평균 **-0.30% → +1.70%**, 누적 -16% → **+46%**.

산출 JSON은 `entries.breakout`·`entries.accumulation`을 씁니다. 과거 파일의 `entries.momentum`은 프론트 [`jongga-schema.js`](../js/jongga-schema.js)에서 `breakout`으로 정규화합니다.

## HTML 연결

`tools/stock-analyze/index.html`은 더 이상 Notion MD를 직접 읽지 않고 날짜별 `jongga_result.v1` JSON bridge를 읽습니다.

- 기본 출력: `jongga/output/jongga_data_YYYYMMDD.js`, `jongga/output/latest_YYYYMMDD.json`, `jongga/output/jongga_history.js`
- 웹앱은 KST 오늘 날짜의 `jongga_data_YYYYMMDD.js`만 자동 적용합니다.
- 오늘 파일이 없으면 메인 화면의 `직접 JSON 입력` 모달에서 `jongga_result.v1` JSON을 localStorage에 날짜별로 저장해 적용합니다.
- `file://` 직접 실행도 날짜별 JS bridge를 script로 로드하므로 local JSON fetch가 필요 없습니다.
- 레거시 Notion 흐름은 `tools/stock-analyze/legacy.html`에 보존했습니다.

최소 구조:

```json
{
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-05-20T15:20:00+09:00",
  "dataQuality": { "status": "complete", "providerHealth": {}, "fallbackUsage": [] },
  "slots": [
    {
      "slotId": "slotA",
      "regime": { "table": [{ "item": "레짐", "value": "강세장" }] },
      "gapScore": { "grade": "G-B", "totalScore": "3.5" },
      "entries": {
        "breakout": [],
        "accumulation": [],
        "pullback": [],
        "reversal": []
      }
    }
  ]
}
```

## 안전 원칙

- 핵심 Gate 데이터가 없으면 추천을 만들지 않고 `blocked` 또는 `manual_required`로 남깁니다.
- 로그인, 캡차, 약관 우회가 필요한 페이지는 자동 수집하지 않습니다.
- 캐시 fallback은 `stale=true`와 낮은 confidence로 표시해 추천 엔진이 보수적으로 처리하게 합니다.
