# 한국 주식 커뮤니티 공포탐욕지수 — Python 스크립트 가이드

## 개요

이 스크립트는 국내 주식 커뮤니티 데이터를 수집·분석하여  
브라우저 대시보드(`../index.html`)에 로드할 수 있는 JSON 파일을 생성합니다.

```
scripts/
├── crawl.py        ← 1단계: 네이버/디시/토스 크롤링
├── analyze.py      ← 2단계: 감성 분석 + 지수 계산
├── keywords.json   ← 공포/탐욕 키워드 사전
└── requirements.txt
```

### 크롤링 대상

| 커뮤니티 | 방식 | 비고 |
|----------|------|------|
| 네이버 증권 종목토론방 | requests + BeautifulSoup | 삼성전자·SK하이닉스 등 6개 종목 |
| 디시인사이드 주식갤러리 | requests + BeautifulSoup | 미국주식갤·주식갤 |
| 토스증권 국내주식 라운지 | **Playwright headless** | SPA 구조로 브라우저 필요 |

---

## 빠른 시작

### 1. 의존성 설치

```bash
pip install -r requirements.txt
```

### 2. Playwright 브라우저 설치 (토스증권 크롤링용, 최초 1회)

```bash
python -m playwright install chromium
```

> 약 180MB의 Chromium 바이너리가 로컬에 다운로드됩니다.

### 3. 크롤링 실행

```bash
python crawl.py
```

- `../data/raw_posts.json` 파일이 생성됩니다.
- 수집 순서: [1/3] 네이버 → [2/3] 디시 → [3/3] 토스
- 토스 라운지는 headless 브라우저를 통해 안전하게 수집합니다.

### 4. 감성 분석 및 지수 계산

```bash
python analyze.py
```

- `../data/fear_greed_data.json` 파일이 생성됩니다.
- `../data/history.json`에 날짜별 지수가 누적됩니다.

### 5. 대시보드에 로드

브라우저에서 `../index.html`을 열고,  
생성된 `fear_greed_data.json`을 드래그&드롭하거나 파일 선택으로 로드합니다.

---

## 지수 계산 방식

```
최종 점수 = (키워드 감성 점수 × 50%) + (반응 점수 × 30%)

  키워드 감성 점수: 탐욕 키워드 / (공포+탐욕 키워드) × 100
  반응 점수:        추천 / (추천+비추천) × 100

  0점  = 극단적 공포 (Extreme Fear)
  50점 = 중립 (Neutral)
  100점 = 극단적 탐욕 / FOMO (Extreme Greed)
```

---

## 설정 변경

`crawl.py` 상단에서 수정:

```python
MAX_PAGES_NAVER   = 5     # 페이지 수 (많을수록 정확하지만 느림)
MAX_PAGES_DC      = 3
REQUEST_DELAY_MIN = 1.2   # 요청 간 최소 딜레이 (초)
REQUEST_DELAY_MAX = 2.5   # 요청 간 최대 딜레이 (초)
```

---

## 키워드 사전 확장

`keywords.json`에 단어를 추가합니다:

```json
{
  "fear":  ["한강", "손절", "새 공포 단어 추가", ...],
  "greed": ["가즈아", "탑승", "새 탐욕 단어 추가", ...]
}
```

---

## 자동화 (Windows 작업 스케줄러)

매일 오전 9시에 자동 실행:

```
작업 이름: KoreaFearGreed
트리거: 매일 09:00
동작: cmd /c "python C:\path\to\crawl.py && python C:\path\to\analyze.py"
```

---

## ⚠️ 주의사항

- 이 스크립트는 **개인 로컬 사용**을 전제합니다.
- 네이버, 디시인사이드의 이용 약관 및 `robots.txt`를 준수하세요.
- 수집한 데이터를 무단으로 재배포하지 마세요.
- 과도한 요청은 IP 차단으로 이어질 수 있습니다.
- 사이트 구조 변경 시 파서 수정이 필요할 수 있습니다.
