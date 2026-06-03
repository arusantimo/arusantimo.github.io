# 매매일지 (Daily Trade Log) 페이지 보류 문서

## 개요
- **목적**: 종가베팅 분석 데이터와 토스증권 Open API(주문 내역)를 결합하여, "왜 샀고, 언제 팔았는지"를 일별로 시각화하는 페이지 구축.
- **상태**: **[보류 중 (On Hold)]**
- **보류 사유**: 현재 토스 Open API(`getOrders`)가 진행 중인 주문(`OPEN`)만 조회 가능하며, 체결이 완료된 과거 주문 내역(`CLOSED`) 조회를 지원하지 않아(`400 closed-not-supported` 에러 반환) 자동화된 매매 내역 수집이 불가능함.

## 추후 작업 재개 조건
- **토스 OpenAPI 업데이트**: `getOrders` API에서 `status=CLOSED` (종료된 주문/체결 완료) 조회가 정식으로 지원되는 시점에 작업을 재개합니다.

## 구현 계획 (재개 시 참고용)

### 1. 파이썬 백엔드 스크립트 (`tools/stock-analyze/jongga/fetch_orders.py`)
- 환경변수 `TOSS_API`, `TOSS_SECRET`을 사용하여 OAuth2 토큰 발급 (`/api/v1/oauth2/token`).
- `/api/v1/accounts` API를 호출하여 종합매매 계좌번호(`accountSeq`) 획득.
- `/api/v1/orders` (또는 추후 지원될 체결내역 API)를 호출하여 체결된 과거 매매 내역 리스트 확보 후, `jongga/output/orders.json` 형태로 로컬 저장.

### 2. 프론트엔드 HTML (`tools/stock-analyze/daily-trade.html`)
- 매매일지 대시보드 화면 구성 (요약 대시보드, 타임라인 뷰).
- Chart.js 연동을 통한 일별 수익률 및 누적 매매 횟수 시각화.

### 3. 자바스크립트 로직 (`tools/stock-analyze/js/daily-trade.js`)
- **데이터 로딩**: `jongga/output/orders.json` (파이썬에서 생성한 체결 내역) 및 `jongga_history.js` 로드.
- **매칭 엔진 (종가베팅 추천 이유와 결합)**:
  - 매수 건의 종목코드와 매수 날짜를 바탕으로 `jongga_history.js`를 검색.
  - "왜 이 종목을 샀는가?"에 해당하는 추천 전략 (수급 매집형, 주도주 반등 등), 당시 점수, 등급 등을 결합.
- **수익률 페어링**: 매수/매도 건을 FIFO 방식으로 매칭하여 개별 트레이드의 손익 계산 및 시각화용 데이터로 변환.

---
*문서 작성일: 2026-06-03*
