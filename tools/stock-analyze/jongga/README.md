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
python -m jongga.generate_latest --out "jongga\output\latest.json" --bridge-js "jongga\output\jongga_data.js"
```

- 공개 소스: 네이버 모바일 API, 네이버 차트, Yahoo chart API, CNBC quote page
- VKOSPI는 CNBC `.KSVKOSPI` 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 폴백합니다.
- 토스 전용 지표와 이벤트 필터는 아직 수동 확인이 필요합니다.

## HTML 연결

`tools/stock-analyze/index.html`은 더 이상 Notion MD를 직접 읽지 않고 `jongga_result.v1` JSON을 읽습니다.

- HTTP 환경: `jongga/output/latest.json` 같은 경로를 입력하고 `JSON 직접 불러오기`를 누릅니다.
- `file://` 직접 실행: 브라우저 보안상 local JSON fetch가 막힐 수 있으므로 파일 선택/붙여넣기를 사용하거나 `jongga/output/jongga_data.js`에 `window.JONGGA_DATA = {...}` 형태로 생성합니다.
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
