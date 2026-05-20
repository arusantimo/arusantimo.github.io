# Manual Overrides

자동 수집이 불가능하거나 안전하지 않은 값은 이 폴더에 JSON으로 둡니다.

예시:

```json
{
  "value": 112.5,
  "confidence": 0.9,
  "reason": "토스 체결강도 수동 확인"
}
```

파일명은 `metric__key.json` 또는 `overrides.json`를 지원합니다.

