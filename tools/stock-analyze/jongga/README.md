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
generate-jongga-data.bat
generate-jongga-data.bat --with-tests
generate-jongga-data.bat --no-pause --date 2026-05-26

replay-jongga-data.bat
replay-jongga-data.bat --no-pause
```

```bash
cd tools/stock-analyze
chmod +x generate-jongga-data.sh
./generate-jongga-data.sh --with-tests

chmod +x replay-jongga-data.sh
./replay-jongga-data.sh
```

파이프라인이 생성하는 산출물:

- `jongga/output/latest_YYYYMMDD.json` · `jongga_data_YYYYMMDD.js` (stable)
- `latest_YYYYMMDD_canary.json` · `jongga_data_YYYYMMDD_canary.js` (canary)
- `jongga/output/latest.json` · `jongga_data.js` (레거시 브리지)
- `jongga/output/jongga_history.js`

## GitHub Actions (평일 자동 스케줄)

워크플로: [`.github/workflows/jongga-schedule.yml`](../../../.github/workflows/jongga-schedule.yml)

| KST | UTC cron | 용도 |
|-----|----------|------|
| 14:50 | `50 5 * * 1-5` | 장마감 10분 전 1차 스냅샷 |
| 15:00 | `0 6 * * 1-5` | 동시호가 직전 2차 |
| 15:10 | `10 6 * * 1-5` | 마감·동시호가 반영 3차 |

- 성공 시 `jongga/output/` 변경분을 커밋·푸시 → GitHub Pages에 반영됩니다.
- **스케줄은 수 분 지연될 수 있습니다.** 15:00 정각 판단은 Actions만 믿지 말고, Pages에서 **「일괄 분석」** 또는 로컬 BAT를 병행하세요.
- 공휴일(휴장)에도 월~금 cron은 동작합니다. 휴장일 스킵은 추후 거래일 캘린더로 확장 가능합니다.
- 수동 실행: 저장소 **Actions** → **jongga-schedule** → **Run workflow** (`pre_close` / `at_close` / `post_close`).

## 실행 예시 (개별 명령)

```powershell
python -m unittest discover -s tools/stock-analyze/jongga/tests -p "test_*.py"
```

공개 데이터만 직접 생성할 때:

```powershell
Set-Location "tools/stock-analyze"
python -m jongga.generate_latest --out-dir "jongga\output" --history-js "jongga\output\jongga_history.js" --out "jongga\output\latest.json" --bridge-js "jongga\output\jongga_data.js"
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
