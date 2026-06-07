window.JONGGA_CANARY_DAILY_DATA = window.JONGGA_CANARY_DAILY_DATA || {};
window.JONGGA_CANARY_DAILY_DATA["2026-06-04"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-07T04:49:58+00:00",
  "variant": "canary",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 16,
      "failed": 0,
      "stale": 0,
      "manual": 3,
      "fallback": 0,
      "slots": 1
    },
    "failedKeys": [],
    "staleKeys": [],
    "manualKeys": [
      "toss_metrics",
      "event_filters"
    ],
    "fallbackKeys": [],
    "providerHealth": {
      "naver_mobile": {
        "ok": 16
      },
      "naver_chart": {
        "ok": 16
      },
      "naver_integration_schedule": {
        "ok": 0
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 16
      },
      "toss_http_strength": {
        "ok": 16
      },
      "toss_ticks_strength_proxy": {
        "ok": 16
      },
      "toss_quotes_orderbook": {
        "ok": 16
      },
      "kind_playwright_disclosure": {
        "ok": 0
      },
      "cnbc_quote": {
        "ok": 1
      }
    },
    "fallbackUsage": [],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 390.7,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1303.9,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "G-E 🔴"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 88.4,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 5.4,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 4555.8,
        "count": 16
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 1221.2,
        "detail": "성공 16 / 실패 0",
        "count": 16
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 829.1,
        "detail": "direct-http · 체결강도 16 / 호가 16 / 틱프록시 16",
        "count": 16
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 12.9,
        "detail": "pullback 3, breakout 3, accumulation 3, reversal 3",
        "count": 12
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "warning",
        "durationMs": 0.1,
        "detail": "unavailable · KIND 0",
        "count": 3
      }
    ],
    "note": "카나리 채널입니다. CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 카나리는 토스 공개 API로 체결강도·틱 프록시·호가를 병렬 수집하고, KIND 공시는 Chrome 실행 파일을 우선 시도해 표시 종목만 브라우저 보강합니다.",
    "channel": "canary",
    "channelLabel": "카나리",
    "browserSource": "unavailable",
    "browserLaunchNotes": [
      "playwright unavailable: No module named 'playwright'"
    ]
  },
  "slots": [
    {
      "slotId": "slotA",
      "sourceId": "live-public-run-canary",
      "regime": {
        "table": [
          {
            "item": "적용 레짐",
            "value": "강세장 ✅ (펀더·지수 정당)"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "8160.59 (-5.54%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.44"
          },
          {
            "item": "진입 전략",
            "value": "메인=주도주돌파형 / 서브=눌림목 / 보조=수급매집형"
          },
          {
            "item": "추천 슬롯",
            "value": "매집 3 · 돌파 3 · 눌림 3"
          },
          {
            "item": "스윙 전환 활성도",
            "value": "적극"
          },
          {
            "item": "시가베팅",
            "value": "활성"
          },
          {
            "item": "역추세 트랙",
            "value": "활성"
          },
          {
            "item": "갭 스코어",
            "value": "G-E 🔴 (-11.5점)"
          },
          {
            "item": "갭 조정",
            "value": "❌ 전 등급 신규 진입 금지 / ❌ 신규 진입 금지"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6585.63",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7937.98",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.44",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 13 / 하락 7",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
            "verdict": "강세장 ✅ (펀더·지수 정당)"
          },
          {
            "item": "거시 맥락",
            "value": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat) / RI 66",
            "verdict": "✅"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다. 적용 레짐은 market-analyze·KOSPI 보조 신호로 조정되었습니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20260605",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 45.38,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "Bull Trap 10/20으로 하락 1단계(안도·자만)로 오버라이드했습니다.",
          "kospiClose": 8160.59,
          "kospiMa5": 8573.204,
          "vkospiValue": 73.44,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": true
        },
        "technicalRegimeLabel": "박스권 ⚠️",
        "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
        "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-5.49%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+21.51",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+6.1bp",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+52.00원",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-4.74%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "-11.5점",
        "grade": "G-E 🔴",
        "code": "G-E",
        "entryAdjustment": "❌ 전 등급 신규 진입 금지 / ❌ 신규 진입 금지",
        "sellAdjustment": "진입 없음 | 해당 없음",
        "swingAdjustment": "금지",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다."
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.2,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 12위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 40,876주 / 기관 -25,435주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 1,293,000 · 이평선 터치: 5MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,361,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 1,347,000 ≤ 종가 1,361,000)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -4.86% / KOSPI -5.54% outperform"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G8)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 155% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,286,600 > 20MA 1,172,700 > 60MA 804,333 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,361,000 / 60MA 804,333",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 77.8 (필요 ≥ 50)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램 0선 위 또는 음전환 후 3일 이내",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.11% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 77.8 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +16.1% (필요 ≤ +25%) · 60MA +69.2% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "G9",
                "status": "⚠️",
                "note": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 12위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 40,876주 / 기관 -25,435주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,293,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,361,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,347,000 ≤ 종가 1,361,000)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -4.86% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [],
            "currentPrice": 1361000,
            "previousClose": 1346000,
            "dailyChange": 15000,
            "dailyChangePct": 1.11,
            "dailyDirection": "up",
            "entryPriceText": "1,361,000원 (당일 종가 기준)",
            "entryPrice": 1361000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 166.0036,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 40,876주 / 기관 -25,435주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,179,637원 (13.33% 아래) · 강도 65점 · family 2개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1179637,
                    "distancePct": 13.33,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 11,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1133792,
                    "distancePct": 16.69,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 6,
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 555292,
                    "distancePct": 59.2,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 20,
                    "lastSeenDaysAgo": 34,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1353500,
                    "distancePct": 0.55,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1265333,
                    "distancePct": 7.03,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1179637,
                  "distancePct": 13.33,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 11,
                  "lastSeenDaysAgo": 4,
                  "strengthPoints": 65,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 65,
                "strengthLabel": "watch",
                "warningLevel": "warning",
                "warningReason": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "activeFamilyCount": 2,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 465550,
                    "distancePct": 65.79,
                    "count": 3,
                    "lastSeenDaysAgo": 40,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 460000,
                    "bandHigh": 469500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 485000,
                    "distancePct": 64.36,
                    "count": 5,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 480000,
                    "bandHigh": 488500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 500000,
                    "distancePct": 63.26,
                    "count": 3,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 499000,
                    "bandHigh": 501000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 512000,
                    "distancePct": 62.38,
                    "count": 3,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 509000,
                    "bandHigh": 517000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 534250,
                    "distancePct": 60.75,
                    "count": 4,
                    "lastSeenDaysAgo": 49,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 532000,
                    "bandHigh": 536000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 553500,
                    "distancePct": 59.33,
                    "count": 9,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 544000,
                    "bandHigh": 560000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 564800,
                    "distancePct": 58.5,
                    "count": 4,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 562000,
                    "bandHigh": 568000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 581250,
                    "distancePct": 57.29,
                    "count": 3,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 578000,
                    "bandHigh": 587000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 601250,
                    "distancePct": 55.82,
                    "count": 6,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 595000,
                    "bandHigh": 608000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 663333,
                    "distancePct": 51.26,
                    "count": 2,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 661000,
                    "bandHigh": 665000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 695800,
                    "distancePct": 48.88,
                    "count": 4,
                    "lastSeenDaysAgo": 27,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 690000,
                    "bandHigh": 704000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 720167,
                    "distancePct": 47.09,
                    "count": 4,
                    "lastSeenDaysAgo": 25,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 712000,
                    "bandHigh": 728000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 793000,
                    "distancePct": 41.73,
                    "count": 3,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 789000,
                    "bandHigh": 797000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 837000,
                    "distancePct": 38.5,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 830000,
                    "bandHigh": 841000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 988333,
                    "distancePct": 27.38,
                    "count": 3,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 983000,
                    "bandHigh": 991000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1019000,
                    "distancePct": 25.13,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1008000,
                    "bandHigh": 1029000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1045000,
                    "distancePct": 23.22,
                    "count": 3,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1040000,
                    "bandHigh": 1048000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1072000,
                    "distancePct": 21.23,
                    "count": 3,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1071000,
                    "bandHigh": 1073000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1096000,
                    "distancePct": 19.47,
                    "count": 6,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1089000,
                    "bandHigh": 1099000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1128000,
                    "distancePct": 17.12,
                    "count": 2,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1126000,
                    "bandHigh": 1130000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1152000,
                    "distancePct": 15.36,
                    "count": 3,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1147000,
                    "bandHigh": 1161000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1180857,
                    "distancePct": 13.24,
                    "count": 7,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1171000,
                    "bandHigh": 1190000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1213000,
                    "distancePct": 10.87,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1210000,
                    "bandHigh": 1217000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1235000,
                    "distancePct": 9.26,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1233000,
                    "bandHigh": 1237000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1265333,
                    "distancePct": 7.03,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1256000,
                    "bandHigh": 1276000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1353500,
                    "distancePct": 0.55,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1346000,
                    "bandHigh": 1361000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 557083,
                    "distancePct": 59.07,
                    "count": 11,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 25,
                    "volume": 5731322,
                    "binIndex": 2,
                    "binLow": 537667,
                    "binHigh": 576500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1139583,
                    "distancePct": 16.27,
                    "count": 4,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 25,
                    "volume": 4283021,
                    "binIndex": 17,
                    "binLow": 1120167,
                    "binHigh": 1159000
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1178417,
                    "distancePct": 13.42,
                    "count": 4,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "volume": 3931275,
                    "binIndex": 18,
                    "binLow": 1159000,
                    "binHigh": 1197833
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 155% (19일 전)",
                "burstCount": 0,
                "maxRatioPct": 155.3,
                "latestBurstDaysAgo": null
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 8.20%, 일간 표준편차 5.44%, 당일 레인지 7.36%.",
              "metrics": {
                "atrPct10": 8.2,
                "returnStd20": 5.44,
                "todayRangePct": 7.36,
                "vkospi": 73.44
              },
              "strategyLabel": "눌림목"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,395,025원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "1,415,440원",
                "historicalHitRate": 0.3778,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,442,660원",
                "historicalHitRate": 0.2444,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,469,880원",
                "historicalHitRate": 0.1778,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,497,100원",
                "historicalHitRate": 0.1111,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,320,170원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1351473,
              "high": 1365083,
              "anchor": 1361000,
              "label": "1,351,473~1,365,083원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.3778,
              "ev": 1.5112,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G0",
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G0, G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 155% (필요 ≥ 200%) · 외 1건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 155% (필요 ≥ 200%) / G8 미충족: 이격 20MA +16.1% (필요 ≤ +25%) · 60MA +69.2% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          },
          {
            "rank": 2,
            "name": "현대모비스",
            "code": "012330",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.2,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 24위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -145,935주 / 기관 1,577주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 713,000 · 이평선 터치: 5MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 748,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 721,000 ≤ 종가 748,000)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -3.15% / KOSPI -5.54% outperform"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G0)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 170% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 744,400 > 20MA 621,650 > 60MA 482,133 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 748,000 / 60MA 482,133",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 72.0 (필요 ≥ 50)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램 0선 위 또는 음전환 후 3일 이내",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -1.45% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 72.0 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +20.3% (필요 ≤ +25%) · 60MA +55.1% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "⚠️",
                "note": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 24위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -145,935주 / 기관 1,577주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 713,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 748,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 721,000 ≤ 종가 748,000)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.15% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [],
            "currentPrice": 748000,
            "previousClose": 759000,
            "dailyChange": -11000,
            "dailyChangePct": -1.45,
            "dailyDirection": "down",
            "entryPriceText": "748,000원 (당일 종가 기준)",
            "entryPrice": 748000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 63.2406,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -145,935주 / 기관 1,577주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 645,509원 (13.70% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 645509,
                    "distancePct": 13.7,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 9,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 435906,
                    "distancePct": 41.72,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 16,
                    "lastSeenDaysAgo": 18,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 421986,
                    "distancePct": 43.58,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 15,
                    "lastSeenDaysAgo": 19,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 400496,
                    "distancePct": 46.46,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 26,
                    "lastSeenDaysAgo": 33,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 383271,
                    "distancePct": 48.76,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 12,
                    "lastSeenDaysAgo": 34,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 645509,
                  "distancePct": 13.7,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 9,
                  "lastSeenDaysAgo": 4,
                  "strengthPoints": 65,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 65,
                "strengthLabel": "watch",
                "warningLevel": "warning",
                "warningReason": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 381542,
                    "distancePct": 48.99,
                    "count": 10,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 372000,
                    "bandHigh": 386500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 391792,
                    "distancePct": 47.62,
                    "count": 12,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 388500,
                    "bandHigh": 397000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 400867,
                    "distancePct": 46.41,
                    "count": 10,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 398000,
                    "bandHigh": 405000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 411250,
                    "distancePct": 45.02,
                    "count": 9,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 407000,
                    "bandHigh": 415500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 423139,
                    "distancePct": 43.43,
                    "count": 12,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 418500,
                    "bandHigh": 428000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 434188,
                    "distancePct": 41.95,
                    "count": 7,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 430000,
                    "bandHigh": 439000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 444143,
                    "distancePct": 40.62,
                    "count": 6,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 441000,
                    "bandHigh": 447000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 511000,
                    "distancePct": 31.68,
                    "count": 3,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 509000,
                    "bandHigh": 515000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 523333,
                    "distancePct": 30.04,
                    "count": 3,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 520000,
                    "bandHigh": 525000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 552000,
                    "distancePct": 26.2,
                    "count": 3,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 548000,
                    "bandHigh": 555000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 566000,
                    "distancePct": 24.33,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 562000,
                    "bandHigh": 571000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 614500,
                    "distancePct": 17.85,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 610000,
                    "bandHigh": 619000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 647143,
                    "distancePct": 13.48,
                    "count": 6,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 640000,
                    "bandHigh": 653000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 667000,
                    "distancePct": 10.83,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 664000,
                    "bandHigh": 670000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 687000,
                    "distancePct": 8.16,
                    "count": 2,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 686000,
                    "bandHigh": 688000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 702000,
                    "distancePct": 6.15,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 698000,
                    "bandHigh": 706000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 745000,
                    "distancePct": 0.4,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 742000,
                    "bandHigh": 748000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 762667,
                    "distancePct": -1.96,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 759000,
                    "bandHigh": 768000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 374250,
                    "distancePct": 49.97,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 372000,
                    "bandHigh": 376500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 385000,
                    "distancePct": 48.53,
                    "count": 2,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 383500,
                    "bandHigh": 386500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 420833,
                    "distancePct": 43.74,
                    "count": 3,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 418500,
                    "bandHigh": 425000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 400125,
                    "distancePct": 46.51,
                    "count": 16,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 25,
                    "volume": 4072397,
                    "binIndex": 1,
                    "binLow": 390750,
                    "binHigh": 409500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 643875,
                    "distancePct": 13.92,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 25,
                    "volume": 3336968,
                    "binIndex": 14,
                    "binLow": 634500,
                    "binHigh": 653250
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 437625,
                    "distancePct": 41.49,
                    "count": 9,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 25,
                    "volume": 2812946,
                    "binIndex": 3,
                    "binLow": 428250,
                    "binHigh": 447000
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 447000,
                    "distancePct": 40.24,
                    "count": 1,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 544.3,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 522500,
                    "distancePct": 30.15,
                    "count": 2,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 331.0,
                    "anchorCount": 2
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 706000,
                    "distancePct": 5.61,
                    "count": 1,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 207.6,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 170% (3일 전)",
                "burstCount": 0,
                "maxRatioPct": 170.4,
                "latestBurstDaysAgo": null
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 11.22%, 일간 표준편차 8.48%, 당일 레인지 8.56%.",
              "metrics": {
                "atrPct10": 11.22,
                "returnStd20": 8.48,
                "todayRangePct": 8.56,
                "vkospi": 73.44
              },
              "strategyLabel": "눌림목"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "766,700원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "777,920원",
                "historicalHitRate": 0.3778,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "792,880원",
                "historicalHitRate": 0.2444,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "807,840원",
                "historicalHitRate": 0.1778,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "822,800원",
                "historicalHitRate": 0.1111,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "725,560원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 742764,
              "high": 750244,
              "anchor": 748000,
              "label": "742,764~750,244원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.3778,
              "ev": 1.5112,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G0",
              "매매금지(핵심 Gate 미충족: G0)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 170% (필요 ≥ 200%)",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 170% (필요 ≥ 200%)"
          },
          {
            "rank": 3,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.5,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 14위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -60,220주 / 기관 35,180주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 1,141,000 · 이평선 터치: 5MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,173,000 · 5MA·10MA·20MA 중 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 1.68 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 44% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -5.60% / KOSPI -5.54% underperform"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G7, G8)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 275% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,309,400 > 20MA 909,800 > 60MA 546,883 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,173,000 / 60MA 546,883",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 92.8 (필요 ≥ 50)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램 0선 위 또는 음전환 후 3일 이내",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -6.31% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 92.8 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +28.9% (필요 ≤ +25%) · 60MA +114.5% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "G9",
                "status": "⚠️",
                "note": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 14위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -60,220주 / 기관 35,180주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,141,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,173,000 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 1.68 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 44% (필요 ≤ 80%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C3",
                "note": "동종업종 평균 -5.60% / KOSPI -5.54% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1173000,
            "previousClose": 1252000,
            "dailyChange": -79000,
            "dailyChangePct": -6.31,
            "dailyDirection": "down",
            "entryPriceText": "1,173,000원 (당일 종가 기준)",
            "entryPrice": 1173000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 27.4538,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -60,220주 / 기관 35,180주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 337,975원 (71.19% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 337975,
                    "distancePct": 71.19,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 17,
                    "lastSeenDaysAgo": 33,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1145000,
                    "distancePct": 2.39,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 6,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 764000,
                    "distancePct": 34.87,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 5,
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 748500,
                    "distancePct": 36.19,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 711000,
                    "distancePct": 39.39,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 337975,
                  "distancePct": 71.19,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 17,
                  "lastSeenDaysAgo": 33,
                  "strengthPoints": 65,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 65,
                "strengthLabel": "watch",
                "warningLevel": "warning",
                "warningReason": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 241250,
                    "distancePct": 79.43,
                    "count": 2,
                    "lastSeenDaysAgo": 55,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 240000,
                    "bandHigh": 242500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 252444,
                    "distancePct": 78.48,
                    "count": 6,
                    "lastSeenDaysAgo": 53,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 249500,
                    "bandHigh": 255500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 259100,
                    "distancePct": 77.91,
                    "count": 4,
                    "lastSeenDaysAgo": 51,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 257000,
                    "bandHigh": 261000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 277750,
                    "distancePct": 76.32,
                    "count": 2,
                    "lastSeenDaysAgo": 48,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 277500,
                    "bandHigh": 278000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 289833,
                    "distancePct": 75.29,
                    "count": 5,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 286000,
                    "bandHigh": 293500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 298400,
                    "distancePct": 74.56,
                    "count": 5,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 296000,
                    "bandHigh": 301500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 313250,
                    "distancePct": 73.29,
                    "count": 2,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 313000,
                    "bandHigh": 313500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 321643,
                    "distancePct": 72.58,
                    "count": 5,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 318500,
                    "bandHigh": 325500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 339200,
                    "distancePct": 71.08,
                    "count": 4,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 335500,
                    "bandHigh": 343000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 348000,
                    "distancePct": 70.33,
                    "count": 2,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 347000,
                    "bandHigh": 349000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 359833,
                    "distancePct": 69.32,
                    "count": 2,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 358000,
                    "bandHigh": 361500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 373000,
                    "distancePct": 68.2,
                    "count": 4,
                    "lastSeenDaysAgo": 30,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 370500,
                    "bandHigh": 376500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 380667,
                    "distancePct": 67.55,
                    "count": 3,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 379000,
                    "bandHigh": 383000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 394250,
                    "distancePct": 66.39,
                    "count": 2,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 394000,
                    "bandHigh": 394500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 409250,
                    "distancePct": 65.11,
                    "count": 2,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 409000,
                    "bandHigh": 409500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 500000,
                    "distancePct": 57.37,
                    "count": 2,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 500000,
                    "bandHigh": 500000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 519500,
                    "distancePct": 55.71,
                    "count": 2,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 517000,
                    "bandHigh": 522000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 539000,
                    "distancePct": 54.05,
                    "count": 2,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 536000,
                    "bandHigh": 542000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 572200,
                    "distancePct": 51.22,
                    "count": 4,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 568000,
                    "bandHigh": 577000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 593500,
                    "distancePct": 49.4,
                    "count": 4,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 592000,
                    "bandHigh": 595000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 608000,
                    "distancePct": 48.17,
                    "count": 2,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 606000,
                    "bandHigh": 610000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 633000,
                    "distancePct": 46.04,
                    "count": 4,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 624000,
                    "bandHigh": 639000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 675000,
                    "distancePct": 42.46,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 673000,
                    "bandHigh": 677000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 692000,
                    "distancePct": 41.01,
                    "count": 2,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 688000,
                    "bandHigh": 696000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 711000,
                    "distancePct": 39.39,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 710000,
                    "bandHigh": 712000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 748500,
                    "distancePct": 36.19,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 744000,
                    "bandHigh": 753000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 764000,
                    "distancePct": 34.87,
                    "count": 5,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 760000,
                    "bandHigh": 771000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1142500,
                    "distancePct": 2.6,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1134000,
                    "bandHigh": 1150000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 336750,
                    "distancePct": 71.29,
                    "count": 13,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 25,
                    "volume": 3693610,
                    "binIndex": 1,
                    "binLow": 304500,
                    "binHigh": 369000
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 272250,
                    "distancePct": 76.79,
                    "count": 13,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 25,
                    "volume": 2358757,
                    "binIndex": 0,
                    "binLow": 240000,
                    "binHigh": 304500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1110750,
                    "distancePct": 5.31,
                    "count": 2,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 1887846,
                    "binIndex": 13,
                    "binLow": 1078500,
                    "binHigh": 1143000
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 1011000,
                    "distancePct": 13.81,
                    "count": 1,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 235.1,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 1034000,
                    "distancePct": 11.85,
                    "count": 1,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 282.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 1147500,
                    "distancePct": 2.17,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 348.9,
                    "anchorCount": 2
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 275% (2일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 274.7,
                "latestBurstDaysAgo": 2
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 17.52%, 일간 표준편차 9.85%, 당일 레인지 5.35%.",
              "metrics": {
                "atrPct10": 17.52,
                "returnStd20": 9.85,
                "todayRangePct": 5.35,
                "vkospi": 73.44
              },
              "strategyLabel": "눌림목"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,202,325원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "1,219,920원",
                "historicalHitRate": 0.3778,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,243,380원",
                "historicalHitRate": 0.2444,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,266,840원",
                "historicalHitRate": 0.1778,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,290,300원",
                "historicalHitRate": 0.1111,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,137,810원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1164789,
              "high": 1176519,
              "anchor": 1173000,
              "label": "1,164,789~1,176,519원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.3778,
              "ev": 1.5112,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G7",
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G7, G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G7 미충족: 주봉 RSI 92.8 (필요 ≤ 80) · 과매수 과열 · 외 1건",
            "statusReason": "G7 미충족: 주봉 RSI 92.8 (필요 ≤ 80) · 과매수 과열 / G8 미충족: 이격 20MA +28.9% (필요 ≤ +25%) · 60MA +114.5% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 4.2,
            "signalScore": 4.9,
            "score": 4.9,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 3.7,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "RS",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "3개월 상대강도 상위 25%"
              },
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -40,670주 / 기관 49,115주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 80.2% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 98.2% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 243% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 98.2% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 83% / 윗꼬리·몸통 0.08 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.95 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "V1",
                "strictPoints": -1.0,
                "signalPoints": -1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)"
              }
            ],
            "scoreScope": "breakout",
            "statusLabel": "매매금지(핵심 Gate 미충족: G6)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +9.7% / 20일 초과 +87.4%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 98.2% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 26",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 243% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 83% / 윗꼬리·몸통 0.08 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "⛔",
                "note": "당일 등락 +27.22% (필요 ≤ +12%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 250,500 / 5MA 208,180 (전일 5MA 203,880) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "RS",
                "note": "3개월 상대강도 상위 25%",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 98.2% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.2% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 2.95 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -40,670주 / 기관 49,115주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 80.2% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 243% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 83% / 윗꼬리·몸통 0.08 · 강마감 기준 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 250500,
            "previousClose": 196900,
            "dailyChange": 53600,
            "dailyChangePct": 27.22,
            "dailyDirection": "up",
            "entryPriceText": "250,500원 (당일 종가 기준)",
            "entryPrice": 250500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.761,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -40,670주 / 기관 49,115주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 80.2,
              "note": "토스 공개 체결강도 80.2% / 최근 체결 131분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-06-05T09:00:03Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 131,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 131분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 2.9485,
              "bidTotal": 41335,
              "askTotal": 14019,
              "note": "Naver 호가잔량합계 매수 41,335 / 매도 14,019",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=036930"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 16.51%, 일간 표준편차 11.62%, 당일 레인지 32.86%.",
              "metrics": {
                "atrPct10": 16.51,
                "returnStd20": 11.62,
                "todayRangePct": 32.86,
                "vkospi": 73.44
              },
              "strategyLabel": "주도주돌파형"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+4.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "260,520원",
                "historicalHitRate": 0.6222,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "268,035원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "278,055원",
                "historicalHitRate": 0.2222,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "288,075원",
                "historicalHitRate": 0.2222,
                "recommended": true
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "300,600원",
                "historicalHitRate": 0.1333,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-5.0% 이탈",
                "quantity": "전량",
                "targetYield": "-5.0%",
                "targetPrice": "237,975원"
              }
            ],
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 248746,
              "high": 251251,
              "anchor": 250500,
              "label": "248,746~251,251원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.2222,
              "ev": 3.333,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G6",
              "매매금지(핵심 Gate 미충족: G6)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G6 미충족: 당일 등락 +27.22% (필요 ≤ +12%)",
            "statusReason": "G6 미충족: 당일 등락 +27.22% (필요 ≤ +12%)"
          },
          {
            "rank": 2,
            "name": "로보스타",
            "code": "090360",
            "strictScore": 2.2,
            "signalScore": 2.2,
            "score": 2.2,
            "scoreMax": 11.5,
            "effectiveScoreMax": 9.5,
            "gradeScore": 2.3,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "RS",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "3개월 상대강도 상위 25%"
              },
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -46,495주 / 기관 1,115주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 체결강도 91.0% · 100% 유지 비율 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 87.7% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 196% · 기준 충족 (≥150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 95.0% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 10% / 윗꼬리·몸통 5.21 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 12.05 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "V1",
                "strictPoints": -1.0,
                "signalPoints": -1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)"
              }
            ],
            "scoreScope": "breakout",
            "statusLabel": "매매금지(핵심 Gate 미충족: G2)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +72.2% / 20일 초과 +83.9%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 77.9% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 25",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 196% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 10% / 윗꼬리·몸통 5.21 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -12.34% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 139,200 / 5MA 118,380 (전일 5MA 106,740) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "RS",
                "note": "3개월 상대강도 상위 25%",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 95.0% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 12.05 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -46,495주 / 기관 1,115주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 체결강도 91.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 87.7% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 196% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 10% / 윗꼬리·몸통 5.21 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 139200,
            "previousClose": 158800,
            "dailyChange": -19600,
            "dailyChangePct": -12.34,
            "dailyDirection": "down",
            "entryPriceText": "139,200원 (당일 종가 기준)",
            "entryPrice": 139200,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.444,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -46,495주 / 기관 1,115주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 91.0,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 33분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A090360/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 33,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 33분 프록시",
              "lastHourAvgStrength": 5.5,
              "lastHourObservedMinutes": 33,
              "last30AvgStrength": 0.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0,
              "last30BuyVolume": 0.0,
              "last30SellVolume": 114.0
            },
            "orderbook": {
              "bidAskRatio": 12.0488,
              "bidTotal": 10362,
              "askTotal": 860,
              "note": "Naver 호가잔량합계 매수 10,362 / 매도 860",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=090360"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 15.18%, 일간 표준편차 12.82%, 당일 레인지 8.82%.",
              "metrics": {
                "atrPct10": 15.18,
                "returnStd20": 12.82,
                "todayRangePct": 8.82,
                "vkospi": 73.44
              },
              "strategyLabel": "주도주돌파형"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+4.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "144,768원",
                "historicalHitRate": 0.6222,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "148,944원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "154,512원",
                "historicalHitRate": 0.2222,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "160,080원",
                "historicalHitRate": 0.2222,
                "recommended": true
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "167,040원",
                "historicalHitRate": 0.1333,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-5.0% 이탈",
                "quantity": "전량",
                "targetYield": "-5.0%",
                "targetPrice": "132,240원"
              }
            ],
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 138226,
              "high": 139618,
              "anchor": 139200,
              "label": "138,226~139,618원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.2222,
              "ev": 3.333,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "매매금지(핵심 Gate 미충족: G2)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 52주 고가 대비 77.9% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 77.9% (필요 ≥ 90%)"
          },
          {
            "rank": 3,
            "name": "HPSP",
            "code": "403870",
            "strictScore": 1.8,
            "signalScore": 2.6,
            "score": 2.6,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 1.6,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "RS",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "3개월 상대강도 상위 25% 밖"
              },
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 612,495주 / 기관 276,047주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 104.7% / 100% 유지 92.9% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 70.1% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 156% · 기준 충족 (≥150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 96.2% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 57% / 윗꼬리·몸통 0.59 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.2)"
              },
              {
                "code": "V1",
                "strictPoints": -1.0,
                "signalPoints": -1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)"
              }
            ],
            "scoreScope": "breakout",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "5일 초과 -13.6% / 20일 초과 -23.2%",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 70.1% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 30",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 156% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 57% / 윗꼬리·몸통 0.59 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +7.59% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 47,500 / 5MA 47,560 (전일 5MA 49,100) · 5MA 조건 미충족",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 612,495주 / 기관 276,047주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.2% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "RS",
                "note": "3개월 상대강도 상위 25% 밖",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 104.7% / 100% 유지 92.9% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 70.1% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 156% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 57% / 윗꼬리·몸통 0.59 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 47500,
            "previousClose": 44150,
            "dailyChange": 3350,
            "dailyChangePct": 7.59,
            "dailyDirection": "up",
            "entryPriceText": "47,500원 (당일 종가 기준)",
            "entryPrice": 47500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 4.1397,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 612,495주 / 기관 276,047주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 104.7,
              "note": "토스 공개 체결강도 104.7% / 최근 체결 135분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A403870/order",
              "asOf": "2026-06-05T09:00:25Z",
              "intradayAbove100Ratio": 92.9,
              "observedMinutes": 135,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 135분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 0.6213,
              "bidTotal": 45926,
              "askTotal": 73919,
              "note": "Naver 호가잔량합계 매수 45,926 / 매도 73,919",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=403870"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 10.46%, 일간 표준편차 6.20%, 당일 레인지 12.80%.",
              "metrics": {
                "atrPct10": 10.46,
                "returnStd20": 6.2,
                "todayRangePct": 12.8,
                "vkospi": 73.44
              },
              "strategyLabel": "주도주돌파형"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+4.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "49,400원",
                "historicalHitRate": 0.6222,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "50,825원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "52,725원",
                "historicalHitRate": 0.2222,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "54,625원",
                "historicalHitRate": 0.2222,
                "recommended": true
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "57,000원",
                "historicalHitRate": 0.1333,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-5.0% 이탈",
                "quantity": "전량",
                "targetYield": "-5.0%",
                "targetPrice": "45,125원"
              }
            ],
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 47168,
              "high": 47642,
              "anchor": 47500,
              "label": "47,168~47,642원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.2222,
              "ev": 3.333,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "매매금지(핵심 Gate 미충족: G1, G2)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5일 초과 -13.6% / 20일 초과 -23.2% · 외 1건",
            "statusReason": "G1 미충족: 5일 초과 -13.6% / 20일 초과 -23.2% / G2 미충족: 52주 고가 대비 70.1% (필요 ≥ 90%)"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "SK하이닉스",
            "code": "000660",
            "strictScore": 5.6,
            "signalScore": 5.6,
            "score": 5.6,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 4.7,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -606,860주 / 기관 -411,774주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -606,860 / 전일 -316,443 · 기관 당일 -411,774 / 전일 +114,049 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 300.0% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 85.0% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 116.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 2,328,600 / 20MA 1,978,500 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 58% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -2.63% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -5.36% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 230.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "⚠️",
                "note": "외인 전일 -316,443/당일 -606,860 · 기관 전일 +114,049/당일 -411,774 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 2,298,000 / 60MA 1,355,117",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⚠️",
                "note": "52주 고가 대비 93.0% (필요 < 92%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 1",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 64% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 300.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 85.0% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 2,328,600 / 20MA 1,978,500 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 58% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -2.63% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.36% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 230.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -606,860주 / 기관 -411,774주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -606,860 / 전일 -316,443 · 기관 당일 -411,774 / 전일 +114,049 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 116.1% (필요 98~102%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2298000,
            "previousClose": 2360000,
            "dailyChange": -62000,
            "dailyChangePct": -2.63,
            "dailyDirection": "down",
            "entryPriceText": "2,298,000원 (당일 종가 기준)",
            "entryPrice": 2298000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1475.2939,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -606,860주 / 기관 -411,774주 / 마지막 1시간 300.0% · 장후반 매수세 강화 · 마지막 30분 틱 230.00:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 85.0,
              "note": "토스 공개 체결강도 85.0% / 최근 체결 16분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 16,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 16분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 16,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 16,
              "last30BuySellRatio": 230.0,
              "last30BuyVolume": 230.0,
              "last30SellVolume": 0.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 6.41%, 일간 표준편차 5.25%, 당일 레인지 2.75%.",
              "metrics": {
                "atrPct10": 6.41,
                "returnStd20": 5.25,
                "todayRangePct": 2.75,
                "vkospi": 73.44
              },
              "strategyLabel": "수급매집형"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.5% 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "2,355,450원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "2,389,920원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "2,458,860원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "2,527,800원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "2,619,720원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "2,217,570원"
              }
            ],
            "rr": "1 : 2.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 2281914,
              "high": 2304894,
              "anchor": 2298000,
              "label": "2,281,914~2,304,894원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday1",
              "evBasis": "heuristic",
              "reason": "기본 추천(데이터 축적 중)",
              "hitRate": null,
              "ev": null,
              "sampleCount": 0
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 5.6,
            "signalScore": 5.6,
            "score": 5.6,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 4.7,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 40,876주 / 기관 -25,435주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 +40,876 / 전일 +34,734 · 기관 당일 -25,435 / 전일 +4,593 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 300.0% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 91.0% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 116.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,286,600 / 20MA 1,172,700 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +1.11% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -4.86% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 62.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +34,734/당일 +40,876 · 기관 전일 +4,593/당일 -25,435 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,361,000 / 60MA 804,333",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⚠️",
                "note": "52주 고가 대비 97.8% (필요 < 92%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 12",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 80% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 300.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 91.0% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,286,600 / 20MA 1,172,700 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +1.11% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -4.86% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 62.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 40,876주 / 기관 -25,435주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +40,876 / 전일 +34,734 · 기관 당일 -25,435 / 전일 +4,593 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 116.1% (필요 98~102%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1361000,
            "previousClose": 1346000,
            "dailyChange": 15000,
            "dailyChangePct": 1.11,
            "dailyDirection": "up",
            "entryPriceText": "1,361,000원 (당일 종가 기준)",
            "entryPrice": 1361000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 166.0036,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 40,876주 / 기관 -25,435주 / 마지막 1시간 300.0% · 장후반 매수세 강화 · 마지막 30분 틱 62.00:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 91.0,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 32분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-05T10:59:57Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 32,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 32분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 32,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 62.0,
              "last30BuyVolume": 62.0,
              "last30SellVolume": 0.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 8.20%, 일간 표준편차 5.44%, 당일 레인지 7.36%.",
              "metrics": {
                "atrPct10": 8.2,
                "returnStd20": 5.44,
                "todayRangePct": 7.36,
                "vkospi": 73.44
              },
              "strategyLabel": "수급매집형"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.5% 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,395,025원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "1,415,440원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "1,456,270원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,497,100원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "1,551,540원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "1,313,365원"
              }
            ],
            "rr": "1 : 2.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1351473,
              "high": 1365083,
              "anchor": 1361000,
              "label": "1,351,473~1,365,083원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday1",
              "evBasis": "heuristic",
              "reason": "기본 추천(데이터 축적 중)",
              "hitRate": null,
              "ev": null,
              "sampleCount": 0
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 3,
            "name": "현대모비스",
            "code": "012330",
            "strictScore": 5.6,
            "signalScore": 5.6,
            "score": 5.6,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 4.7,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -145,935주 / 기관 1,577주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -145,935 / 전일 -96,947 · 기관 당일 +1,577 / 전일 +39,170 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 244.7% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 88.0% / 마지막 1시간 244.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 120.3% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 744,400 / 20MA 621,650 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -1.45% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -3.15% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.65:1 · 평균 체결강도 263.2% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -96,947/당일 -145,935 · 기관 전일 +39,170/당일 +1,577 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 748,000 / 60MA 482,133",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 91.0% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 24",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 68% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 244.7% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 88.0% / 마지막 1시간 244.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 744,400 / 20MA 621,650 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.45% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.15% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.65:1 · 평균 체결강도 263.2% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -145,935주 / 기관 1,577주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -145,935 / 전일 -96,947 · 기관 당일 +1,577 / 전일 +39,170 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 120.3% (필요 98~102%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 748000,
            "previousClose": 759000,
            "dailyChange": -11000,
            "dailyChangePct": -1.45,
            "dailyDirection": "down",
            "entryPriceText": "748,000원 (당일 종가 기준)",
            "entryPrice": 748000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 63.2406,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -145,935주 / 기관 1,577주 / 마지막 1시간 244.7% · 장후반 매수세 강화 · 마지막 30분 틱 1.65:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 88.0,
              "note": "토스 공개 체결강도 88.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A012330/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 77.8,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 244.7,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 263.2,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.6471,
              "last30BuyVolume": 28.0,
              "last30SellVolume": 17.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 11.22%, 일간 표준편차 8.48%, 당일 레인지 8.56%.",
              "metrics": {
                "atrPct10": 11.22,
                "returnStd20": 8.48,
                "todayRangePct": 8.56,
                "vkospi": 73.44
              },
              "strategyLabel": "수급매집형"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.5% 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "766,700원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "777,920원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "800,360원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "822,800원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "852,720원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "721,820원"
              }
            ],
            "rr": "1 : 2.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 742764,
              "high": 750244,
              "anchor": 748000,
              "label": "742,764~750,244원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday1",
              "evBasis": "heuristic",
              "reason": "기본 추천(데이터 축적 중)",
              "hitRate": null,
              "ev": null,
              "sampleCount": 0
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "두산로보틱스",
            "code": "454910",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.1,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -90,931→1,619,826 / 기관 -18,623→-1,526,675 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 85.0% / 마지막 1시간 221.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 157,900 / 20MA 112,735 (140.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 63% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 124% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.50 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 140300, 전봉 종가 141000 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)"
              }
            ],
            "scoreScope": "reversal",
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 27위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 9.1조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⚠️",
                "note": "실적/배당/분할 일정 수동 확인 필요",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-05-25~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +43.3% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -7.1% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 157,900 / 60MA 97,797",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.3% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-a",
                "status": "✅",
                "note": "양봉 안정화 캔들",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -90,931→1,619,826 / 기관 -18,623→-1,526,675 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 157,900 / 20MA 112,735 (140.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 63% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.50 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 85.0% / 마지막 1시간 221.2% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 124% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 140300, 전봉 종가 141000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 157900,
            "previousClose": 166700,
            "dailyChange": -8800,
            "dailyChangePct": -5.28,
            "dailyDirection": "down",
            "entryPriceText": "157,900원 (당일 종가 기준)",
            "entryPrice": 157900,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.0942,
            "keyPoint": "20일 고점 대비 -7.1% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 두산로보틱스 (454910) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "eventFilter"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "eventFilter": null,
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 140300, 전봉 종가 141000",
              "latestOpen": 140300.0,
              "latestClose": 140300.0,
              "previousClose": 141000.0
            },
            "toss": {
              "avgStrength": 85.0,
              "note": "토스 공개 체결강도 85.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A454910/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 73.3,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 221.2,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 231.4,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.3711,
              "last30BuyVolume": 133.0,
              "last30SellVolume": 97.0
            },
            "orderbook": {
              "bidAskRatio": 1.5024,
              "bidTotal": 15308,
              "askTotal": 10189,
              "note": "Naver 호가잔량합계 매수 15,308 / 매도 10,189",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=454910"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 11.33%, 일간 표준편차 10.49%, 당일 레인지 12.24%.",
              "metrics": {
                "atrPct10": 11.33,
                "returnStd20": 10.49,
                "todayRangePct": 12.24,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "161,058원",
                "historicalHitRate": 0.7333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "163,426원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "20% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "165,795원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.0% 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "154,742원"
              }
            ],
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 156795,
              "high": 158374,
              "anchor": 157900,
              "label": "156,795~158,374원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.6667,
              "ev": 2.3335,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.2,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 34,734→40,876 / 기관 4,593→-25,435 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 91.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,361,000 / 20MA 1,172,700 (116.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 69% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.06 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1258000, 전봉 종가 1234000 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)"
              }
            ],
            "scoreScope": "reversal",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 12위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 166.0조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⚠️",
                "note": "실적/배당/분할 일정 수동 확인 필요",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "⛔",
                "note": "최근 손절 이력 1건 (최근: 2026-05-27) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +61.8% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -2.2% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,361,000 / 60MA 804,333",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -3.1% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-a",
                "status": "✅",
                "note": "양봉 안정화 캔들",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 91.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,361,000 / 20MA 1,172,700 (116.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 69% (필요 ≥ 50%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 34,734→40,876 / 기관 4,593→-25,435 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.06 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1258000, 전봉 종가 1234000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1361000,
            "previousClose": 1346000,
            "dailyChange": 15000,
            "dailyChangePct": 1.11,
            "dailyDirection": "up",
            "entryPriceText": "1,361,000원 (당일 종가 기준)",
            "entryPrice": 1361000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 166.0036,
            "keyPoint": "20일 고점 대비 -2.2% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 SK스퀘어 (402340) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "eventFilter"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "eventFilter": null,
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1258000, 전봉 종가 1234000",
              "latestOpen": 1258000.0,
              "latestClose": 1258000.0,
              "previousClose": 1234000.0
            },
            "toss": {
              "avgStrength": 91.0,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 32분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-05T10:59:57Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 32,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 32분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 32,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 62.0,
              "last30BuyVolume": 62.0,
              "last30SellVolume": 0.0
            },
            "orderbook": {
              "bidAskRatio": 0.0608,
              "bidTotal": 1744,
              "askTotal": 28690,
              "note": "Naver 호가잔량합계 매수 1,744 / 매도 28,690",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=402340"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 8.20%, 일간 표준편차 5.44%, 당일 레인지 7.36%.",
              "metrics": {
                "atrPct10": 8.2,
                "returnStd20": 5.44,
                "todayRangePct": 7.36,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,388,220원",
                "historicalHitRate": 0.7333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "1,408,635원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "20% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,429,050원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.0% 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,333,780원"
              }
            ],
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1351473,
              "high": 1365083,
              "anchor": 1361000,
              "label": "1,351,473~1,365,083원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.6667,
              "ev": 2.3335,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G2",
              "매매금지",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-05-27) · 재진입 차단 · 외 1건",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-05-27) · 재진입 차단 / G2 미충족: 20일 고점 대비 -2.2% (필요 -5%~-25%)"
          },
          {
            "rank": 3,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 8.0,
            "gradeScore": 6.5,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 252,062→-40,670 / 기관 11,672→49,115 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 80.2% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 250,500 / 20MA 182,440 (137.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 93% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 261% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.95 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 210000, 전봉 종가 214000 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)"
              }
            ],
            "scoreScope": "reversal",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 26위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 9.8조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⚠️",
                "note": "실적/배당/분할 일정 수동 확인 필요",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-05-25~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +98.8% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -1.8% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 250,500 / 60MA 113,990",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -9.2% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-a",
                "status": "✅",
                "note": "양봉 안정화 캔들",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "P1",
                "note": "종가 250,500 / 20MA 182,440 (137.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 93% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 261% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.95 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 252,062→-40,670 / 기관 11,672→49,115 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 80.2% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 210000, 전봉 종가 214000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 250500,
            "previousClose": 196900,
            "dailyChange": 53600,
            "dailyChangePct": 27.22,
            "dailyDirection": "up",
            "entryPriceText": "250,500원 (당일 종가 기준)",
            "entryPrice": 250500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.761,
            "keyPoint": "20일 고점 대비 -1.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영",
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A036930/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 주성엔지니어링 (036930) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 주성엔지니어링 (036930) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength",
                "eventFilter"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "eventFilter": null,
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 210000, 전봉 종가 214000",
              "latestOpen": 210000.0,
              "latestClose": 210000.0,
              "previousClose": 214000.0
            },
            "toss": {
              "avgStrength": 80.2,
              "note": "토스 공개 체결강도 80.2% / 최근 체결 131분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-06-05T09:00:03Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 131,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 131분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 2.9485,
              "bidTotal": 41335,
              "askTotal": 14019,
              "note": "Naver 호가잔량합계 매수 41,335 / 매도 14,019",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=036930"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 16.51%, 일간 표준편차 11.62%, 당일 레인지 32.86%.",
              "metrics": {
                "atrPct10": 16.51,
                "returnStd20": 11.62,
                "todayRangePct": 32.86,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "255,510원",
                "historicalHitRate": 0.7333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "259,267원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "20% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "263,025원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.0% 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "245,490원"
              }
            ],
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 248746,
              "high": 251251,
              "anchor": 250500,
              "label": "248,746~251,251원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.6667,
              "ev": 2.3335,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -1.8% (필요 -5%~-25%)",
            "statusReason": "G2 미충족: 20일 고점 대비 -1.8% (필요 -5%~-25%)"
          }
        ],
        "swing": []
      },
      "dataQuality": {
        "status": "partial",
        "source": "live-public-run"
      }
    }
  ],
  "analysisDate": "2026-06-04"
};
