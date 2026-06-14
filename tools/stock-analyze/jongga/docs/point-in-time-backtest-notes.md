# Point-in-time 백테스트 & 신용/대차잔고 로직 메모 (2026-06-14)

## 0. 2026-06-14 구현 결과 요약

- 대차/신용잔고 수집은 [`balance_sources.py`](../balance_sources.py)로 분리했다.
- 대차잔고는 다음 우선순위로 조회한다.
  1. `pykrx` (`KRX_ID`/`KRX_PW`가 있을 때만 시도)
  2. KRX 공개 short loader `MDCSTAT30001_OUT` (`순보유 잔고수량`)
  3. 기존 short portal best-effort
- 종목코드 → ISIN 매핑은 KRX lookup POST에 의존하지 않고 `KR7 + code + 00 + check digit`
  방식으로 직접 계산한다. 이 덕분에 현재 환경에서도 대차잔고 변화율이 실제로 수집된다.
- 신용잔고는 다음 우선순위로 조회한다.
  1. 인포스탁 공개 신용비율 랭킹 (`MENU_CREDIT_RATIO`)
  2. KRX page HTTP scrape
  3. Playwright page scrape
  4. 기존 direct POST
- 인포스탁 fallback은 공개 랭킹 HTML에 **노출되는 종목만** 직접 커버한다. raw balance는 없고
  `ratioPct` 와 날짜별 비율 변화만 줄 수 있으므로 `changePct` 는 시작/종료 기준일 둘 다
  존재할 때만 계산한다.
- `pointInTimeStatus` (`confirmed` / `historical_regen` / `legacy_unknown`)를
  payload/history/replay/rescore 메타에 전파했다.
- replay는 `historical_regen`을 제외하고 `legacy_unknown`은 포함하되 warning을 남긴다.
- `2026-05-22` ~ `2026-06-12` stable 구간을 `jongga/output_rescored` 로 재채점/재리플레이했다.
  총 16일 payload에서 167개 entry가 변경되었고, replay 전체 누적수익률은 동일(-63.4337%)이며
  `a7plus` 케이스는 `+58.471% -> +57.9784%` 로 소폭 조정됐다.
- 같은 구간에서 실제 점수 변화는 **대차잔고(D4/L1)** 쪽만 발생했다. 이후 신용잔고 기반
  규칙(`D5`/`L2`/`G14`)은 추천·백테스트 경로에서 제거했다.
- 현재 운영 history/replay 보존 구간은 `2026-06-08` 이후로 잘라서 유지한다. 그 이전 파일은
  point-in-time 확인 실패분으로 정리 대상이며, 새 history 인덱스에도 다시 올라오지 않는다.

## 1. Point-in-time 보존 가드

과거 일자(`--date`)로 `generate_latest.py`를 재실행하면 매크로·유니버스·가격
데이터가 **실행 시점의 "현재" 데이터**로 수집되어 그 과거 날짜 라벨에
stamp된다 (vintage 오염, look-ahead). 같은 과거 일자를 다른 날 재생성하면
매번 다른 vintage가 생겨 백테스트 결과가 바뀐다.

### 적용한 가드

- [`output_contract.is_point_in_time_run(analysis_date, today=None)`](../output_contract.py):
  `--date` 없이 실행했을 때의 자연 분석일(`resolve_analysis_date(None)`)과
  `analysis_date`가 같은지 판별한다.
- [`output_contract.payload_with_analysis_date()`](../output_contract.py)가
  결과를 payload 최상위 `pointInTime: true/false` 필드로 stamp한다.
- [`generate_latest.py`](../generate_latest.py) `main()`은 `analysis_date`가
  자연 분석일과 다르면(=과거 일자 재생성) 기본적으로 에러로 차단하고
  `jongga.rescore_credit_balance` 사용을 안내한다. 강행하려면
  `--allow-historical-regen` 플래그가 필요하다.

### 효과

- 외부 스케줄러가 `--date` 없이 평일 15:00/17:30에 호출하는 정상 일일 배치는
  항상 `pointInTime: true`로 기록되어 백테스트 근거로 신뢰할 수 있다.
- 과거 일자를 일괄 재생성하려는 시도는 즉시 차단되어, 2026-06-12 vintage
  오염 사고(5/22~6/11을 6/14에 재생성 → 모든 과거 파일에 6/12 vintage가
  박혀 7&A 16일 누적이 +58% → -13%로 악화)가 재발하지 않는다.

## 2. 재채점(rescore) 스크립트 — 신규 로직만 안전하게 백테스트

[`rescore_credit_balance.py`](../rescore_credit_balance.py)는 기존
point-in-time `latest_<date>.json`(6/8 이후, 현재 스키마)을 그대로 두고,
대차잔고만 `as_of=<analysisDate>`로 재조회해 D4(눌림목)·L1(매집/돌파)만
재평가한다. 매크로·유니버스·가격은 재수집하지 않으므로 vintage 오염이 없다.

```bash
cd tools/stock-analyze
python3 -m jongga.rescore_credit_balance \
  --from 2026-06-08 --to 2026-06-11 \
  --src-dir jongga/output --out-dir jongga/output_rescored

python3 -m jongga.replay_backtest \
  --from 2026-06-08 --to 2026-06-11 \
  --variant stable --out-dir jongga/output_rescored
```

단위 테스트: [`jongga/tests/test_rescore_credit_balance.py`](../tests/test_rescore_credit_balance.py).

## 3. 신용잔고 제거 결정

KRX 신용잔고 page/direct POST는 후보군 전체를 안정적으로 커버하지 못했고, 공개 fallback도
실사용 구간에서 실질 커버리지가 0이었다. 따라서 신용잔고 기반 규칙은 "조용한 no-op" 상태로
남기지 않고 추천·백테스트·UI 경로에서 제거했다.

### 현재 영향

- 추천 점수 계산에는 대차잔고 D4/L1만 남아 있다.
- 과거 JSON을 열어도 프론트 어댑터가 `D5`/`L2`/`G14` 및 관련 provider row를 숨긴다.
- `output_rescored` 재생성 후에는 산출물 자체에서도 신용잔고 규칙이 사라진다.

관련 메모리: `jongga-historical-regen-vintage-contamination`
(`~/.claude/projects/.../memory/`).
