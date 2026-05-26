# 시가베팅 추천 엔진 (open-bet-analyze)

**대체거래소(ATS) 08:00~08:30** 프리마켓 단타 + **09:00 정규장 잔량 지정가 매도**를 전제로, 장 시작 전에 종목을 추천하는 규칙 기반 엔진입니다. (3트랙: 전일 시그널 · 뉴스 테마 · 시간외 수급)

## 트랙

| 트랙 | 설명 |
|------|------|
| A | 전일 종가 분석(`jongga`) 시가베팅 시그널 + G4/G5 |
| B | 장마감 이후 뉴스·키워드 신규 테마 |
| C | 시간외 단일가 +4~7% + 강한 시가(시간외 종가 대비 상향) |

운용 규칙: [`invest-daily/morning-open-bet-routine.md`](../../invest-daily/morning-open-bet-routine.md)

## 수집 스택

- **Python**: `run_open_bet.py` 오케스트레이션
- **Node.js**: `scripts/node_fetch_worker.mjs` (DNS 우회 fetch)
- **Playwright**: `scripts/playwright_fetch_worker.mjs` (동적 페이지)

[`tools/market-analyze`](../market-analyze) `collectors.py`를 `scripts/fetch_bridge.py`에서 경로만 바꿔 재사용합니다.

## 설치

```powershell
cd tools/open-bet-analyze
npm install
python -m unittest discover -s tests -p "test_*.py"
```

## 실행 스케줄 (KST) — ATS 프로필

| 시각 | 행동 | 명령 |
|------|------|------|
| 15:45 | 종가 분석·jongga JSON | `stock-analyze/jongga` |
| 07:30 | 매크로·뉴스 1차 수집 | `python run_open_bet.py --phase pre_ah` |
| 07:40 | **배치 완료** — 추천·지정가 확정 | `python run_open_bet.py --phase pre_ats` |
| 07:40~08:00 | **직접 종목 검토·판단** (20분) | 대시보드·체크리스트 |
| 08:00~08:30 | **대체거래소 매수·매도** (HTS/MTS) | `entryPlan` 참고 |
| 08:30 | ATS 구간 내 전량 청산 목표 | 1차 익절·전량 매도 |
| 09:00 | **잔량 시스템 지정가 매도** 예약 | `krxLiquidationOrders` 가격 |

설정: [`config/execution_schedule.yaml`](config/execution_schedule.yaml)

Windows 작업 스케줄러에 **07:40 `pre_ats`** 를 등록하세요. 08:00 전 20분은 검토·주문 준비 시간입니다.

## 실행 (컬러 로그)

### Windows (BAT)

| 파일 | 용도 |
|------|------|
| **`run_pre_ats.bat`** | 07:40 ATS 직전 분석 (일상 운용) |
| `run_open_bet.bat` | 공통 런처 |
| `run_pre_ats_fixture.bat` | 샘플 데이터 검증 |
| `run_diagnostics.bat` | fetch 진단 |

```bat
cd tools\open-bet-analyze
run_pre_ats.bat
```

### macOS / Linux (Shell)

최초 1회 실행 권한 부여:

```bash
cd tools/open-bet-analyze
chmod +x run_*.sh
npm install
# Playwright (시스템 Chrome 없을 때)
npx playwright-core install chromium
```

| 파일 | 용도 |
|------|------|
| **`run_pre_ats.sh`** | 07:40 ATS 직전 분석 (터미널) |
| **`run_pre_ats.command`** | 위와 동일 (Finder 더블클릭) |
| `run_open_bet.sh` | 공통 런처 |
| `run_pre_ats_fixture.sh` | 샘플 데이터 검증 |
| `run_diagnostics.sh` | fetch 진단 |

```bash
./run_pre_ats.sh
./run_pre_ats.sh --no-pause          # 종료 시 Enter 대기 없음
./run_pre_ats_fixture.sh
```

macOS에서 Chrome 경로가 다르면:

```bash
export MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
./run_pre_ats.sh
```

터미널에 **단계별 수집 로그**(OK/FAIL/WARN)와 마지막 **SUCCESS/FAILED** 요약이 출력됩니다.

## CLI

```powershell
python run_open_bet.py --phase pre_ats
python run_open_bet.py --phase final --dry-run
python run_open_bet.py --diagnostics
python run_open_bet.py --date 20260527 --phase post_ah
python run_open_bet.py --phase pre_ats --fixture
python run_open_bet.py --quiet
```

장외 시간에는 네이버 시간외 페이지가 에러 HTML을 반환할 수 있습니다. 이때 `--fixture`로 샘플 데이터 UI·파이프라인을 검증할 수 있습니다.

결과: `store/results/latest.js`, `latest.json`

## UI

`index.html` — GitHub Pages에서 `tools/open-bet-analyze/index.html` 로 열기

## 데이터 완성도

필수 메트릭(`config/policies.yaml`)이 100% 채워지지 않으면 `dataQuality.status = incomplete` 이고 **TOP3 추천을 출력하지 않습니다**.

## 환경 변수

- `OPEN_BET_DISABLE_NODE_FETCH_FALLBACK`
- `OPEN_BET_DISABLE_PLAYWRIGHT_FALLBACK`
- `MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH` (Chrome/Chromium 경로, Windows·macOS 공통)

`MARKET_ANALYZE_*` 변수명도 호환됩니다.
