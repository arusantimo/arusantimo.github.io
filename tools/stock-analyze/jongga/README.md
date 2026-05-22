# Jongga Collector Router

`stock-analyze` JSON generator에서 쓰는 데이터 수집 안정화 계층입니다.

수집 우선순위는 `official API -> public API -> HTTP scraper -> headless browser -> cache/manual override`입니다. 모든 collector는 값뿐 아니라 `source`, `confidence`, `fallbackLevel`, `stale`, `errors`를 포함한 envelope를 반환해야 합니다.

`collectors/api/JsonApiCollector`는 KIS, Polygon, Alpha Vantage 같은 인증형 JSON API adapter의 공통 기반입니다. API 키가 없으면 `MissingCredentials`로 명확히 실패시키고 router가 다음 fallback으로 넘어갑니다.

## 실행 예시

```powershell
python -m unittest discover -s tools/stock-analyze/jongga/tests -p "test_*.py"
```

공개 데이터로 앱이 읽는 JSON 생성:

```powershell
Set-Location "tools/stock-analyze"
python -m jongga.generate_latest --out-dir "jongga\output" --history-js "jongga\output\jongga_history.js"
```

- 공개 소스: 네이버 모바일 API, 네이버 차트, Yahoo chart API, CNBC quote page
- 추천 universe는 네이버 모바일 전체 종목의 금일 누적 거래대금 기준 TOP40으로 제한합니다. ETF/ETN은 제외하되 41위 이하 종목을 백필하지 않습니다.
- VKOSPI는 CNBC `.KSVKOSPI` 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 폴백합니다.
- 토스 전용 지표와 이벤트 필터는 아직 수동 확인이 필요합니다.

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
        "momentum": [
          {
            "rank": 1,
            "name": "삼성전자",
            "code": "005930",
            "score": 8.1,
            "grade": "A",
            "gates": {
              "G1": { "status": "passed" },
              "G2": { "status": "passed" },
              "G3": { "status": "passed" },
              "G4": { "status": "passed" }
            }
          }
        ]
      }
    }
  ]
}
```

## 안전 원칙

- 핵심 Gate 데이터가 없으면 추천을 만들지 않고 `blocked` 또는 `manual_required`로 남깁니다.
- 로그인, 캡차, 약관 우회가 필요한 페이지는 자동 수집하지 않습니다.
- 캐시 fallback은 `stale=true`와 낮은 confidence로 표시해 추천 엔진이 보수적으로 처리하게 합니다.
