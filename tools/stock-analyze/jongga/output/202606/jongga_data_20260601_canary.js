window.JONGGA_CANARY_DAILY_DATA = window.JONGGA_CANARY_DAILY_DATA || {};
window.JONGGA_CANARY_DAILY_DATA["2026-06-01"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-07T16:36:38+00:00",
  "variant": "canary",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 59,
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
        "ok": 59
      },
      "naver_chart": {
        "ok": 59
      },
      "naver_integration_schedule": {
        "ok": 0
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 59
      },
      "toss_http_strength": {
        "ok": 59
      },
      "toss_ticks_strength_proxy": {
        "ok": 59
      },
      "toss_quotes_orderbook": {
        "ok": 59
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
        "durationMs": 300.9,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1232.3,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0,
        "detail": "G-E 🔴"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 81.9,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 337.9,
        "detail": "박스권 ⚠️"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 3571.4,
        "count": 59
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 4019.1,
        "detail": "성공 59 / 실패 0",
        "count": 59
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 2498.5,
        "detail": "direct-http · 체결강도 59 / 호가 59 / 틱프록시 59",
        "count": 59
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 129.6,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 14330.2,
        "detail": "chrome:chrome.exe · KIND 0",
        "count": 3
      }
    ],
    "note": "카나리 채널입니다. CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 카나리는 토스 공개 API로 체결강도·틱 프록시·호가를 병렬 수집하고, KIND 공시는 Chrome 실행 파일을 우선 시도해 표시 종목만 브라우저 보강합니다.",
    "channel": "canary",
    "channelLabel": "카나리",
    "browserSource": "chrome:chrome.exe",
    "browserLaunchNotes": []
  },
  "slots": [
    {
      "slotId": "slotA",
      "sourceId": "live-public-run-canary",
      "regime": {
        "table": [
          {
            "item": "적용 레짐",
            "value": "박스권 ⚠️"
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
            "value": "메인=수급매집형 / 서브=눌림목 / 보조=주도주돌파형"
          },
          {
            "item": "추천 슬롯",
            "value": "매집 3 · 돌파 1 · 눌림 3"
          },
          {
            "item": "스윙 전환 활성도",
            "value": "조건부"
          },
          {
            "item": "시가베팅",
            "value": "비활성"
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
            "value": "KOSPI 60/20MA 상향",
            "verdict": "박스권 ⚠️"
          },
          {
            "item": "거시 맥락",
            "value": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat) / RI 66",
            "verdict": "⚠️"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": false,
          "marketAnalyzeDate": "20260605",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "박스권 ⚠️",
          "regimeAdjustmentReason": "KOSPI 60/20MA 상향",
          "riseJustified": false,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89,
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
          "riseJustifiedByMacro": false
        },
        "technicalRegimeLabel": "박스권 ⚠️",
        "effectiveRegimeLabel": "박스권 ⚠️",
        "regimeAdjustmentReason": "KOSPI 60/20MA 상향"
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
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 7.5,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 12위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 40,876주 / 기관 -25,435주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 1,210,000 · 이평선 터치: 5MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,256,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "양봉 (시가 1,249,000 ≤ 종가 1,256,000)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 111% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 -4.86% / KOSPI -5.54% outperform"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
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
                "note": "최근 20일 최대 거래량 급증 161% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,236,600 > 20MA 1,128,950 > 60MA 777,867 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,256,000 / 60MA 777,867",
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
                "note": "당일 등락 +1.87% (필요 ≤ +12%)",
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
                "note": "이격 20MA +11.3% (필요 ≤ +25%) · 60MA +61.5% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
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
                "note": "저가 1,210,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,256,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,249,000 ≤ 종가 1,256,000)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -4.86% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 111% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1256000,
            "previousClose": 1233000,
            "dailyChange": 23000,
            "dailyChangePct": 1.87,
            "dailyDirection": "up",
            "entryPriceText": "1,256,000원 (당일 종가 기준)",
            "entryPrice": 1256000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 166.0036,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 40,876주 / 기관 -25,435주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,132,010원 (9.87% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1132010,
                    "distancePct": 9.87,
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
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1097740,
                    "distancePct": 12.6,
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
                    "lastSeenDaysAgo": 9,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 552427,
                    "distancePct": 56.02,
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
                    "lastSeenDaysAgo": 32,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1265333,
                    "distancePct": -0.74,
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
                    "price": 1235000,
                    "distancePct": 1.67,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1132010,
                  "distancePct": 9.87,
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
                  "lastSeenDaysAgo": 6,
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
                    "price": 465550,
                    "distancePct": 62.93,
                    "count": 3,
                    "lastSeenDaysAgo": 38,
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
                    "distancePct": 61.39,
                    "count": 5,
                    "lastSeenDaysAgo": 36,
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
                    "distancePct": 60.19,
                    "count": 3,
                    "lastSeenDaysAgo": 36,
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
                    "distancePct": 59.24,
                    "count": 3,
                    "lastSeenDaysAgo": 42,
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
                    "price": 520750,
                    "distancePct": 58.54,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 520500,
                    "bandHigh": 521000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 534250,
                    "distancePct": 57.46,
                    "count": 4,
                    "lastSeenDaysAgo": 47,
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
                    "distancePct": 55.93,
                    "count": 11,
                    "lastSeenDaysAgo": 32,
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
                    "price": 565000,
                    "distancePct": 55.02,
                    "count": 5,
                    "lastSeenDaysAgo": 33,
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
                    "distancePct": 53.72,
                    "count": 3,
                    "lastSeenDaysAgo": 32,
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
                    "distancePct": 52.13,
                    "count": 6,
                    "lastSeenDaysAgo": 31,
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
                    "distancePct": 47.19,
                    "count": 2,
                    "lastSeenDaysAgo": 29,
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
                    "distancePct": 44.6,
                    "count": 4,
                    "lastSeenDaysAgo": 25,
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
                    "distancePct": 42.66,
                    "count": 4,
                    "lastSeenDaysAgo": 23,
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
                    "distancePct": 36.86,
                    "count": 3,
                    "lastSeenDaysAgo": 20,
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
                    "distancePct": 33.36,
                    "count": 2,
                    "lastSeenDaysAgo": 19,
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
                    "distancePct": 21.31,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 18.87,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 16.8,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
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
                    "distancePct": 14.65,
                    "count": 3,
                    "lastSeenDaysAgo": 6,
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
                    "distancePct": 12.74,
                    "count": 6,
                    "lastSeenDaysAgo": 9,
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
                    "distancePct": 10.19,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": 8.28,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
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
                    "distancePct": 5.98,
                    "count": 7,
                    "lastSeenDaysAgo": 2,
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
                    "price": 1213500,
                    "distancePct": 3.38,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
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
                    "distancePct": 1.67,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
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
                    "distancePct": -0.74,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1256000,
                    "bandHigh": 1276000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 551354,
                    "distancePct": 56.1,
                    "count": 9,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 25,
                    "volume": 4841946,
                    "binIndex": 2,
                    "binLow": 533083,
                    "binHigh": 569625
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1136021,
                    "distancePct": 9.55,
                    "count": 4,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "volume": 4283021,
                    "binIndex": 18,
                    "binLow": 1117750,
                    "binHigh": 1154292
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1099479,
                    "distancePct": 12.46,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 25,
                    "volume": 3529137,
                    "binIndex": 17,
                    "binLow": 1081208,
                    "binHigh": 1117750
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 901000,
                    "distancePct": 28.26,
                    "count": 1,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 284.3,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 161% (17일 전)",
                "burstCount": 0,
                "maxRatioPct": 160.8,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 8.16%, 일간 표준편차 6.39%, 당일 레인지 6.41%.",
              "metrics": {
                "atrPct10": 8.16,
                "returnStd20": 6.39,
                "todayRangePct": 6.41,
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260504",
              "anchorOpen": 909000,
              "anchorClose": 991000,
              "anchorHigh": 998000,
              "anchorLow": 901000,
              "anchorBodyMid": 950000,
              "anchorVolumeRatio": 2.84,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 950000,
              "ma10Price": 1168900,
              "ma10PrevPrice": 1153100,
              "ma20Price": 1128950,
              "ma20PrevPrice": 1107650,
              "ma10WarningPrice": null,
              "hardStopPrice": 1128950,
              "fallbackStopPrice": 1224600,
              "effectiveStopPrice": 1224600,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 950,000원, 20일선 1,128,950원) = 1,128,950원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,224,600원) = 1,224,600원",
              "reasonSummary": "앵커 봉 - 기준 몸통 중심 950,000원와 20일선 1,128,950원 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,224,600원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,281,120원",
                "historicalHitRate": 0.8857,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,293,680원",
                "historicalHitRate": 0.7143,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,312,520원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,331,360원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,224,600원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,224,600원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1243440,
              "high": 1256000,
              "anchor": 1256000,
              "label": "1,243,440~1,256,000원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,281,120원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,293,680원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,312,520원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,331,360원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,224,600원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,224,600원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 5일선/10일선 저항이 없어 기본 목표형과 동일합니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,281,120원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,293,680원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,312,520원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,331,360원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,224,600원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,224,600원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,281,120원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,293,680원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,312,520원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,331,360원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,224,600원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,224,600원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": 0.4264
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 35건)",
              "hitRate": 0.8857,
              "ev": 5.893,
              "sampleCount": 35
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G0",
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G0, G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 161% (필요 ≥ 200%) · 외 1건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 161% (필요 ≥ 200%) / G8 미충족: 이격 20MA +11.3% (필요 ≤ +25%) · 60MA +61.5% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          },
          {
            "rank": 2,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 7.5,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 26위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 -40,670주 / 기관 49,115주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 181,200 · 이평선 터치: 5MA, 10MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 185,500 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.31 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 72% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 -4.32% / KOSPI -5.54% outperform"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
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
                "note": "최근 20일 최대 거래량 급증 252% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 211,400 > 20MA 172,700 > 60MA 108,765 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 185,500 / 60MA 108,765",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 94.8 (필요 ≥ 50)",
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
                "note": "당일 등락 -7.25% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 94.8 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +7.4% (필요 ≤ +25%) · 60MA +70.6% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 90점 · 현재가 아래 유효 family 4개",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 26위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -40,670주 / 기관 49,115주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 181,200 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 185,500 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 72% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -4.32% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.31 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 185500,
            "previousClose": 200000,
            "dailyChange": -14500,
            "dailyChangePct": -7.25,
            "dailyDirection": "down",
            "entryPriceText": "185,500원 (당일 종가 기준)",
            "entryPrice": 185500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.761,
            "marketCapRank": 74,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -40,670주 / 기관 49,115주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 60,886원 (67.18% 아래) · 강도 90점 · family 4개 · 수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 60886,
                    "distancePct": 67.18,
                    "families": [
                      "horizontal",
                      "swingCluster",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집",
                      "매물대 지지"
                    ],
                    "familyCount": 3,
                    "count": 26,
                    "lastSeenDaysAgo": 31,
                    "strengthPoints": 90,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 59332,
                    "distancePct": 68.02,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 6,
                    "lastSeenDaysAgo": 36,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 185250,
                    "distancePct": 0.13,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 168688,
                    "distancePct": 9.06,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 5,
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 181700,
                    "distancePct": 2.05,
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
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 60886,
                  "distancePct": 67.18,
                  "families": [
                    "horizontal",
                    "swingCluster",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "스윙로우 군집",
                    "매물대 지지"
                  ],
                  "familyCount": 3,
                  "count": 26,
                  "lastSeenDaysAgo": 31,
                  "strengthPoints": 90,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 90,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "수평 지지·스윙로우 군집·매물대 지지 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 59390,
                    "distancePct": 67.98,
                    "count": 4,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 58700,
                    "bandHigh": 59900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 60983,
                    "distancePct": 67.12,
                    "count": 9,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 60500,
                    "bandHigh": 61700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 63328,
                    "distancePct": 65.86,
                    "count": 13,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 62200,
                    "bandHigh": 64200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 65580,
                    "distancePct": 64.65,
                    "count": 4,
                    "lastSeenDaysAgo": 40,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 65100,
                    "bandHigh": 66100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 67457,
                    "distancePct": 63.63,
                    "count": 7,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 66800,
                    "bandHigh": 68200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 70620,
                    "distancePct": 61.93,
                    "count": 8,
                    "lastSeenDaysAgo": 27,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 70000,
                    "bandHigh": 71500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 72900,
                    "distancePct": 60.7,
                    "count": 3,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 72300,
                    "bandHigh": 73600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 111200,
                    "distancePct": 40.05,
                    "count": 2,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 110400,
                    "bandHigh": 112000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 116050,
                    "distancePct": 37.44,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 115900,
                    "bandHigh": 116200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 120133,
                    "distancePct": 35.24,
                    "count": 3,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 118900,
                    "bandHigh": 121100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 123220,
                    "distancePct": 33.57,
                    "count": 5,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 122000,
                    "bandHigh": 124200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 126517,
                    "distancePct": 31.8,
                    "count": 6,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 125900,
                    "bandHigh": 127600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 135000,
                    "distancePct": 27.22,
                    "count": 3,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 133800,
                    "bandHigh": 136100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 139550,
                    "distancePct": 24.77,
                    "count": 2,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 138900,
                    "bandHigh": 140200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 143700,
                    "distancePct": 22.53,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 143200,
                    "bandHigh": 144200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 162700,
                    "distancePct": 12.29,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 161600,
                    "bandHigh": 163800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 168375,
                    "distancePct": 9.23,
                    "count": 4,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 168000,
                    "bandHigh": 169000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 177700,
                    "distancePct": 4.2,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 176900,
                    "bandHigh": 178500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 181700,
                    "distancePct": 2.05,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 181200,
                    "bandHigh": 182200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 185300,
                    "distancePct": 0.11,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 185200,
                    "bandHigh": 185500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 200333,
                    "distancePct": -8,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 200000,
                    "bandHigh": 201000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 223750,
                    "distancePct": -20.62,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 223500,
                    "bandHigh": 224000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 59275,
                    "distancePct": 68.05,
                    "count": 2,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 58950,
                    "bandHigh": 59600
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 60850,
                    "distancePct": 67.2,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 60700,
                    "bandHigh": 61000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 68875,
                    "distancePct": 62.87,
                    "count": 14,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 25,
                    "volume": 29594068,
                    "binIndex": 1,
                    "binLow": 64850,
                    "binHigh": 72900
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 60825,
                    "distancePct": 67.21,
                    "count": 15,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 25,
                    "volume": 17371013,
                    "binIndex": 0,
                    "binLow": 56800,
                    "binHigh": 64850
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 76925,
                    "distancePct": 58.53,
                    "count": 3,
                    "lastSeenDaysAgo": 45,
                    "valid": true,
                    "weight": 25,
                    "volume": 11021225,
                    "binIndex": 2,
                    "binLow": 72900,
                    "binHigh": 80950
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 169000,
                    "distancePct": 8.89,
                    "count": 1,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 215.4,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 185200,
                    "distancePct": 0.16,
                    "count": 1,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 259.4,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 252% (5일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 252.1,
                "latestBurstDaysAgo": 5
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 16.27%, 일간 표준편차 10.34%, 당일 레인지 11.65%.",
              "metrics": {
                "atrPct10": 16.27,
                "returnStd20": 10.34,
                "todayRangePct": 11.65,
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260522",
              "anchorOpen": 185300,
              "anchorClose": 224000,
              "anchorHigh": 231500,
              "anchorLow": 185200,
              "anchorBodyMid": 204650,
              "anchorVolumeRatio": 2.59,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 204650,
              "ma10Price": 200380,
              "ma10PrevPrice": 195850,
              "ma20Price": 172700,
              "ma20PrevPrice": 169720,
              "ma10WarningPrice": null,
              "hardStopPrice": 172700,
              "fallbackStopPrice": 180862,
              "effectiveStopPrice": 180862,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 172,700원) = 172,700원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 180,862원) = 180,862원 / 제외: 앵커 몸통 중심 204,650원가 현재가 185,500원 이상이라 제외",
              "reasonSummary": "현재가 아래 유효 손절 후보(20일선 172,700원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 180,862원를 하한으로 유지합니다. 앵커 몸통 중심 204,650원가 현재가 185,500원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "5일선 저항 도달",
                "quantity": "35% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "211,400원",
                "historicalHitRate": 0.8857,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "211,400원",
                "historicalHitRate": 0.7143,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "211,400원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "211,400원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 180,862원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "180,862원"
              }
            ],
            "rr": "1 : 5.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 183645,
              "high": 185500,
              "anchor": 185500,
              "label": "183,645~185,500원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 211400,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "189,210원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "191,065원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "193,848원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "196,630원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 180,862원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "180,862원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "5일선이 기존 1차 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 211400,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "189,210원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "191,065원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "193,848원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "196,630원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 180,862원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "180,862원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 211400,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "211,400원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "211,400원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "211,400원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "211,400원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 180,862원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "180,862원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": 0.4264
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 35건)",
              "hitRate": 0.8857,
              "ev": 5.893,
              "sampleCount": 35
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G7",
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G7, G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G7 미충족: 주봉 RSI 94.8 (필요 ≤ 80) · 과매수 과열 · 외 1건",
            "statusReason": "G7 미충족: 주봉 RSI 94.8 (필요 ≤ 80) · 과매수 과열 / G8 미충족: 이격 20MA +7.4% (필요 ≤ +25%) · 60MA +70.6% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          },
          {
            "rank": 3,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 6.4,
            "signalScore": 6.4,
            "score": 6.4,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 6.4,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 5위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 -57,044주 / 기관 99,296주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "저가 1,989,000 · 이평선 터치: 없음"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 2,005,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 1.00 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 79% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -6.18% / KOSPI -5.54% underperform"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
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
                "note": "최근 20일 최대 거래량 급증 222% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,836,600 > 20MA 1,211,000 > 60MA 758,858 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 2,005,000 / 60MA 758,858",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 96.9 (필요 ≥ 50)",
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
                "note": "당일 등락 -5.74% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 96.9 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +65.6% (필요 ≤ +25%) · 60MA +164.2% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
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
                "note": "당일 거래대금 순위 5위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -57,044주 / 기관 99,296주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 2,005,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 1.00 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 79% (필요 ≤ 80%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "저가 1,989,000 · 이평선 터치: 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -6.18% / KOSPI -5.54% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2005000,
            "previousClose": 2127000,
            "dailyChange": -122000,
            "dailyChangePct": -5.74,
            "dailyDirection": "down",
            "entryPriceText": "2,005,000원 (당일 종가 기준)",
            "entryPrice": 2005000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 131.2368,
            "marketCapRank": 5,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -57,044주 / 기관 99,296주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,006,916원 (49.78% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1006916,
                    "distancePct": 49.78,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 8,
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 399396,
                    "distancePct": 80.08,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 22,
                    "lastSeenDaysAgo": 39,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1561334,
                    "distancePct": 22.13,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 4,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 921428,
                    "distancePct": 54.04,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 8,
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 896550,
                    "distancePct": 55.28,
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
                    "lastSeenDaysAgo": 13,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1006916,
                  "distancePct": 49.78,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 8,
                  "lastSeenDaysAgo": 7,
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
                    "price": 383000,
                    "distancePct": 80.9,
                    "count": 2,
                    "lastSeenDaysAgo": 53,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 382000,
                    "bandHigh": 384000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 389500,
                    "distancePct": 80.57,
                    "count": 2,
                    "lastSeenDaysAgo": 56,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 389000,
                    "bandHigh": 390000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 400625,
                    "distancePct": 80.02,
                    "count": 9,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 396500,
                    "bandHigh": 406000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 410167,
                    "distancePct": 79.54,
                    "count": 3,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 407500,
                    "bandHigh": 413000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 420900,
                    "distancePct": 79.01,
                    "count": 5,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 417000,
                    "bandHigh": 425500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 431667,
                    "distancePct": 78.47,
                    "count": 6,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 427500,
                    "bandHigh": 437000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 450091,
                    "distancePct": 77.55,
                    "count": 10,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 444500,
                    "bandHigh": 456000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 460900,
                    "distancePct": 77.01,
                    "count": 5,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 457000,
                    "bandHigh": 464500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 515000,
                    "distancePct": 74.31,
                    "count": 2,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 514000,
                    "bandHigh": 516000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 566500,
                    "distancePct": 71.75,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 565000,
                    "bandHigh": 568000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 613333,
                    "distancePct": 69.41,
                    "count": 2,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 607000,
                    "bandHigh": 619000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 640500,
                    "distancePct": 68.05,
                    "count": 2,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 639000,
                    "bandHigh": 642000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 678500,
                    "distancePct": 66.16,
                    "count": 3,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 669000,
                    "bandHigh": 686000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 772000,
                    "distancePct": 61.5,
                    "count": 5,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 767000,
                    "bandHigh": 776000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 794667,
                    "distancePct": 60.37,
                    "count": 3,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 788000,
                    "bandHigh": 802000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 812667,
                    "distancePct": 59.47,
                    "count": 3,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 808000,
                    "bandHigh": 818000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 832667,
                    "distancePct": 58.47,
                    "count": 3,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 827000,
                    "bandHigh": 839000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 856500,
                    "distancePct": 57.28,
                    "count": 2,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 855000,
                    "bandHigh": 858000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 894100,
                    "distancePct": 55.41,
                    "count": 5,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 880000,
                    "bandHigh": 900000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 918857,
                    "distancePct": 54.17,
                    "count": 7,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 912000,
                    "bandHigh": 926000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 957500,
                    "distancePct": 52.24,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 957000,
                    "bandHigh": 958000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 983500,
                    "distancePct": 50.95,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 980000,
                    "bandHigh": 987000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1005000,
                    "distancePct": 49.88,
                    "count": 2,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1000000,
                    "bandHigh": 1010000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1028000,
                    "distancePct": 48.73,
                    "count": 3,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1024000,
                    "bandHigh": 1031000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1204000,
                    "distancePct": 39.95,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1204000,
                    "bandHigh": 1204000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1568667,
                    "distancePct": 21.76,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1554000,
                    "bandHigh": 1580000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 398167,
                    "distancePct": 80.14,
                    "count": 13,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 25,
                    "volume": 8988859,
                    "binIndex": 0,
                    "binLow": 360000,
                    "binHigh": 436333
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 474500,
                    "distancePct": 76.33,
                    "count": 12,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 25,
                    "volume": 8196760,
                    "binIndex": 1,
                    "binLow": 436333,
                    "binHigh": 512667
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1008833,
                    "distancePct": 49.68,
                    "count": 6,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 25,
                    "volume": 7069000,
                    "binIndex": 8,
                    "binLow": 970667,
                    "binHigh": 1047000
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 899000,
                    "distancePct": 55.16,
                    "count": 1,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 281.5,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 924000,
                    "distancePct": 53.92,
                    "count": 1,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 205.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 1554000,
                    "distancePct": 22.49,
                    "count": 1,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 222.5,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 1912000,
                    "distancePct": 4.64,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 242.4,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 222% (전일) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 221.7,
                "latestBurstDaysAgo": 1
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 13.36%, 일간 표준편차 6.71%, 당일 레인지 4.56%.",
              "metrics": {
                "atrPct10": 13.36,
                "returnStd20": 6.71,
                "todayRangePct": 4.56,
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260529",
              "anchorOpen": 1945000,
              "anchorClose": 2127000,
              "anchorHigh": 2192000,
              "anchorLow": 1912000,
              "anchorBodyMid": 2036000,
              "anchorVolumeRatio": 2.42,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 2036000,
              "ma10Price": 1480600,
              "ma10PrevPrice": 1381100,
              "ma20Price": 1211000,
              "ma20PrevPrice": 1152100,
              "ma10WarningPrice": null,
              "hardStopPrice": 1211000,
              "fallbackStopPrice": 1954875,
              "effectiveStopPrice": 1954875,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 1,211,000원) = 1,211,000원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,954,875원) = 1,954,875원 / 제외: 앵커 몸통 중심 2,036,000원가 현재가 2,005,000원 이상이라 제외",
              "reasonSummary": "현재가 아래 유효 손절 후보(20일선 1,211,000원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,954,875원를 하한으로 유지합니다. 앵커 몸통 중심 2,036,000원가 현재가 2,005,000원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "2,045,100원",
                "historicalHitRate": 0.8857,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "2,065,150원",
                "historicalHitRate": 0.7143,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "2,095,225원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "2,125,300원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,954,875원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,954,875원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1984950,
              "high": 2005000,
              "anchor": 2005000,
              "label": "1,984,950~2,005,000원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "2,045,100원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "2,065,150원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,095,225원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,125,300원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,954,875원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,954,875원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 5일선/10일선 저항이 없어 기본 목표형과 동일합니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "2,045,100원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "2,065,150원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,095,225원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,125,300원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,954,875원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,954,875원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "2,045,100원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "2,065,150원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,095,225원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,125,300원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,954,875원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,954,875원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 35건)",
                  "hitRate": 0.8857,
                  "ev": 5.893,
                  "sampleCount": 35
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": 0.4264
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 35건)",
              "hitRate": 0.8857,
              "ev": 5.893,
              "sampleCount": 35
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G7",
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G7, G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G7 미충족: 주봉 RSI 96.9 (필요 ≤ 80) · 과매수 과열 · 외 1건",
            "statusReason": "G7 미충족: 주봉 RSI 96.9 (필요 ≤ 80) · 과매수 과열 / G8 미충족: 이격 20MA +65.6% (필요 ≤ +25%) · 60MA +164.2% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "RISE 네트워크인프라",
            "code": "367760",
            "strictScore": 4.2,
            "signalScore": 4.2,
            "score": 4.2,
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
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "외인 -2,732주 / 기관 19,179주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 평균 136.3% / 100% 유지 75.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 98.7% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 92% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 98.7% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "몸통 37% / 윗꼬리·몸통 0.93 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 35.34 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "V1",
                "strictPoints": -1,
                "signalPoints": -1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)"
              }
            ],
            "scoreScope": "breakout",
            "statusLabel": "매매금지(핵심 Gate 미충족: G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +32.5% / 20일 초과 +74.0%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 98.7% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 61",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 92% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 37% / 윗꼬리·몸통 0.93 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.46% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 89,300 / 5MA 81,911 (전일 5MA 77,563) · 5MA 위·우상향",
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
                "code": "S2",
                "note": "당일 평균 136.3% / 100% 유지 75.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 98.7% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.7% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 35.34 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -2,732주 / 기관 19,179주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 92% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 37% / 윗꼬리·몸통 0.93 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 89300,
            "previousClose": 88015,
            "dailyChange": 1285,
            "dailyChangePct": 1.46,
            "dailyDirection": "up",
            "entryPriceText": "89,300원 (당일 종가 기준)",
            "entryPrice": 89300,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0,
            "marketCapRank": null,
            "marketCapUniverseCount": 2584,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -2,732주 / 기관 19,179주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 136.3,
              "note": "토스 공개 체결강도 136.3% / 최근 체결 164분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A367760/order",
              "asOf": "2026-06-05T09:00:30Z",
              "intradayAbove100Ratio": 75,
              "observedMinutes": 164,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 164분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 35.3381,
              "bidTotal": 14948,
              "askTotal": 423,
              "note": "Naver 호가잔량합계 매수 14,948 / 매도 423",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=367760"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 7.66%, 일간 표준편차 3.97%, 당일 레인지 3.90%.",
              "metrics": {
                "atrPct10": 7.66,
                "returnStd20": 3.97,
                "todayRangePct": 3.9,
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
            "breakoutStopPolicy": {
              "version": "breakout-stop-v1-live",
              "referenceSource": "prior_resistance_band",
              "referenceLookbackDays": 60,
              "referenceClusterPct": 1,
              "referencePrice": 88015,
              "referenceBandLow": 88015,
              "referenceBandHigh": 88015,
              "entryDayOpenPrice": 88015,
              "fallbackStopPrice": 85728,
              "effectiveHardStopPrice": 88015,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 88,015원와 기존 % 손절 85,728원 중 더 높은 88,015원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 88,015원이며, 기존 % 손절 85,728원보다 느슨해지지 않게 88,015원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.3%",
                "targetPrice": "90,500원",
                "historicalHitRate": 0.5833,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "93,765원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "96,444원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "99,123원",
                "historicalHitRate": 0.2917,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "101,802원",
                "historicalHitRate": 0.2917,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 88,015원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.4%",
                "targetPrice": "88,015원"
              }
            ],
            "rr": "1 : 5.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 88407,
              "high": 89300,
              "anchor": 89300,
              "label": "88,407~89,300원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 90500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "91,979원",
                    "historicalHitRate": 0.5833,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "93,765원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "96,444원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "99,123원",
                    "historicalHitRate": 0.2917,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "101,802원",
                    "historicalHitRate": 0.2917,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 88,015원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "88,015원"
                  }
                ],
                "trailingActivationPct": 8,
                "trailingBufferPct": 3,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.2917,
                  "ev": 2.938,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 90500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "90,500원",
                    "historicalHitRate": 0.5833,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "93,765원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "96,444원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "99,123원",
                    "historicalHitRate": 0.2917,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "101,802원",
                    "historicalHitRate": 0.2917,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 88,015원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "88,015원"
                  }
                ],
                "trailingActivationPct": 6,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.2917,
                  "ev": 2.938,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistancePrice": 90500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "90,500원",
                    "historicalHitRate": 0.5833,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "93,765원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "96,444원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "99,123원",
                    "historicalHitRate": 0.2917,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "101,802원",
                    "historicalHitRate": 0.2917,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 88,015원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "88,015원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.2917,
                  "ev": 2.938,
                  "sampleCount": 24
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
              "sampleCount": 10,
              "ev": -2.8899
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 24건)",
              "hitRate": 0.2917,
              "ev": 2.938,
              "sampleCount": 24
            },
            "breakoutLiveExitPolicy": {
              "version": "breakout-live-exit-v1",
              "wickClimaxLookbackBars": 20,
              "wickClimaxVolumeRatioMin": 2.5,
              "wickUpperShadowRatioMin": 0.45,
              "orderbookLookbackMinutes": 5,
              "orderbookBidAskSpikeMin": 2,
              "orderbookAskDropRatioMax": 0.6,
              "trailingActivationPct": 4.5,
              "trailingBufferPct": 2,
              "activeSessionCutoff": "10:30",
              "wickClimaxRuleSummary": "09:00~10:30에 대량 거래량 위꼬리와 고점 대비 -1% 밀림이 함께 나오면 전량 익절합니다.",
              "orderbookRuleSummary": "09:00~10:30에 호가 분산 신호가 나오면 기본 50% 익절하고, 약한 체결강도/트레일링 동시 충족 시 전량 익절로 승격합니다.",
              "trailingRuleSummary": "+4.5% 도달 후 세션 고점 대비 2.0% 이탈 시 잔량 전량 매도합니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 92% (필요 ≥ 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 92% (필요 ≥ 150%)"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "HD현대중공업",
            "code": "329180",
            "strictScore": 9.4,
            "signalScore": 9.4,
            "score": 9.4,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 7.8,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 43,918주 / 기관 11,472주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 당일 +43,918 / 전일 -67,213 · 기관 당일 +11,472 / 전일 +2,882 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 115.4% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 87.0% / 마지막 1시간 115.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 100.8% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 714,600 / 20MA 678,700 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 -1.72% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 -1.47% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.46:1 · 평균 체결강도 115.4% (필요 ≥ 1.1:1)"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
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
                "note": "외인 전일 -67,213/당일 +43,918 · 기관 전일 +2,882/당일 +11,472 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 684,000 / 60MA 587,758",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 89.1% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 53",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 76% (필요 < 150%)",
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
                "code": "S1",
                "note": "외인 43,918주 / 기관 11,472주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +43,918 / 전일 -67,213 · 기관 당일 +11,472 / 전일 +2,882 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 115.4% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 87.0% / 마지막 1시간 115.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 100.8% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 714,600 / 20MA 678,700 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.72% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.47% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.46:1 · 평균 체결강도 115.4% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 684000,
            "previousClose": 696000,
            "dailyChange": -12000,
            "dailyChangePct": -1.72,
            "dailyDirection": "down",
            "entryPriceText": "684,000원 (당일 종가 기준)",
            "entryPrice": 684000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 69.6943,
            "marketCapRank": 9,
            "marketCapUniverseCount": 2584,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 43,918주 / 기관 11,472주 / 마지막 1시간 115.4% · 장후반 매수세 강화 · 마지막 30분 틱 0.46:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 87,
              "note": "토스 공개 체결강도 87.0% / 최근 체결 24분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A329180/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 24,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 24분 프록시",
              "lastHourAvgStrength": 115.4,
              "lastHourObservedMinutes": 24,
              "last30AvgStrength": 115.4,
              "last30ObservedMinutes": 24,
              "last30BuySellRatio": 0.4599,
              "last30BuyVolume": 1135,
              "last30SellVolume": 2468
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 7.38%, 일간 표준편차 4.75%, 당일 레인지 5.03%.",
              "metrics": {
                "atrPct10": 7.38,
                "returnStd20": 4.75,
                "todayRangePct": 5.03,
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
                "stage": "1차 익절",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.7%",
                "targetPrice": "689,000원",
                "historicalHitRate": 0.7381,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.1%",
                "targetPrice": "705,000원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "721,620원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "738,720원",
                "historicalHitRate": 0.0952,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "759,240원",
                "historicalHitRate": 0.0238,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 663,480원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "663,480원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "fallback_percent_stop",
              "sponsorMode": "both",
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorVolumeRatio20d": null,
              "anchorStopPrice": null,
              "fallbackStopPrice": 663480,
              "effectiveHardStopPrice": 663480,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 663,480원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 663,480원만 유지합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 677160,
              "high": 684000,
              "anchor": 684000,
              "label": "677,160~684,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 689000,
                "secondaryResistancePrice": 705000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "697,680원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "707,940원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "721,620원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "738,720원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "759,240원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 663,480원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "663,480원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 689000,
                "secondaryResistancePrice": 705000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "689,000원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "705,000원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "721,620원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "738,720원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "759,240원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 663,480원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "663,480원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "nearestResistancePrice": 689000,
                "secondaryResistancePrice": 705000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "689,000원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "705,000원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "721,620원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "738,720원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "759,240원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 663,480원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "663,480원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": -1.4246
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 84건)",
              "hitRate": 0.0238,
              "ev": -0.117,
              "sampleCount": 84
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "하나금융지주",
            "code": "086790",
            "strictScore": 6.8,
            "signalScore": 6.8,
            "score": 6.8,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 5.7,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 71,180주 / 기관 40,365주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 당일 +71,180 / 전일 +47,151 · 기관 당일 +40,365 / 전일 +83,304 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 225.0% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 100.0% / 마지막 1시간 225.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 94.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 116,540 / 20MA 121,105 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 133% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 -1.04% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 +2.88% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 7.60:1 · 평균 체결강도 200.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +47,151/당일 +71,180 · 기관 전일 +83,304/당일 +40,365 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 113,900 / 60MA 116,920",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 85.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 97",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 120% (필요 < 150%)",
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
                "code": "S1",
                "note": "외인 71,180주 / 기관 40,365주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +71,180 / 전일 +47,151 · 기관 당일 +40,365 / 전일 +83,304 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 225.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 100.0% / 마지막 1시간 225.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.04% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +2.88% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 7.60:1 · 평균 체결강도 200.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 94.1% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "5MA 116,540 / 20MA 121,105 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 133% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 113900,
            "previousClose": 115100,
            "dailyChange": -1200,
            "dailyChangePct": -1.04,
            "dailyDirection": "down",
            "entryPriceText": "113,900원 (당일 종가 기준)",
            "entryPrice": 113900,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 33.9119,
            "marketCapRank": 25,
            "marketCapUniverseCount": 2584,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 71,180주 / 기관 40,365주 / 마지막 1시간 225.0% · 장후반 매수세 강화 · 마지막 30분 틱 7.60:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 100,
              "note": "토스 공개 체결강도 100.0% / 최근 체결 32분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A086790/order",
              "asOf": "2026-06-05T10:59:58Z",
              "intradayAbove100Ratio": 75,
              "observedMinutes": 32,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 32분 프록시",
              "lastHourAvgStrength": 225,
              "lastHourObservedMinutes": 32,
              "last30AvgStrength": 200,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 7.6,
              "last30BuyVolume": 38,
              "last30SellVolume": 5
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "neutral",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 4.14%, 일간 표준편차 2.32%, 당일 레인지 3.91%.",
              "metrics": {
                "atrPct10": 4.14,
                "returnStd20": 2.32,
                "todayRangePct": 3.91,
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
                "stage": "1차 익절",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.1%",
                "targetPrice": "114,000원",
                "historicalHitRate": 0.7381,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.0952,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.0238,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 110,483원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "110,483원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "fallback_percent_stop",
              "sponsorMode": "both",
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorVolumeRatio20d": null,
              "anchorStopPrice": null,
              "fallbackStopPrice": 110483,
              "effectiveHardStopPrice": 110483,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 110,483원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 110,483원만 유지합니다."
            },
            "rr": "1 : 4.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 112761,
              "high": 113900,
              "anchor": 113900,
              "label": "112,761~113,900원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 114000,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "116,178원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "117,886원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "120,164원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "123,012원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "126,429원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,483원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "110,483원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 114000,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "114,000원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "117,886원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "120,164원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "123,012원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "126,429원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,483원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "110,483원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "nearestResistancePrice": 114000,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "114,000원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,483원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "110,483원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": -1.4246
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 84건)",
              "hitRate": 0.0238,
              "ev": -0.117,
              "sampleCount": 84
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "매매금지(핵심 Gate 미충족: G1)",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 113,900 / 60MA 116,920",
            "statusReason": "G1 미충족: 종가 113,900 / 60MA 116,920"
          },
          {
            "rank": 3,
            "name": "신한지주",
            "code": "055550",
            "strictScore": 6.4,
            "signalScore": 6.4,
            "score": 6.4,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 5.3,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 319,164주 / 기관 137,742주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 당일 +319,164 / 전일 +80,950 · 기관 당일 +137,742 / 전일 +330,794 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 194.9% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 106.0% / 마지막 1시간 194.9% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 96.6% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 94,000 / 20MA 95,855 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 119% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 -1.07% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 +2.07% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.52:1 · 평균 체결강도 228.5% (필요 ≥ 1.1:1)"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +80,950/당일 +319,164 · 기관 전일 +330,794/당일 +137,742 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 92,600 / 60MA 95,132",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 84.3% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 45",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 114% (필요 < 150%)",
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
                "code": "S1",
                "note": "외인 319,164주 / 기관 137,742주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +319,164 / 전일 +80,950 · 기관 당일 +137,742 / 전일 +330,794 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 194.9% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 106.0% / 마지막 1시간 194.9% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.07% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +2.07% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 96.6% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "5MA 94,000 / 20MA 95,855 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 119% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.52:1 · 평균 체결강도 228.5% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 92600,
            "previousClose": 93600,
            "dailyChange": -1000,
            "dailyChangePct": -1.07,
            "dailyDirection": "down",
            "entryPriceText": "92,600원 (당일 종가 기준)",
            "entryPrice": 92600,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 51.0253,
            "marketCapRank": 16,
            "marketCapUniverseCount": 2584,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 319,164주 / 기관 137,742주 / 마지막 1시간 194.9% · 장후반 매수세 강화 · 마지막 30분 틱 0.52:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 106,
              "note": "토스 공개 체결강도 106.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A055550/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 60,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 194.9,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 228.5,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.5211,
              "last30BuyVolume": 74,
              "last30SellVolume": 142
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "neutral",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 3.85%, 일간 표준편차 1.52%, 당일 레인지 3.85%.",
              "metrics": {
                "atrPct10": 3.85,
                "returnStd20": 1.52,
                "todayRangePct": 3.85,
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
                "stage": "1차 익절",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.1%",
                "targetPrice": "92,700원",
                "historicalHitRate": 0.7381,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "98,400원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "98,400원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "100,008원",
                "historicalHitRate": 0.0952,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "102,786원",
                "historicalHitRate": 0.0238,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 89,822원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "89,822원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "fallback_percent_stop",
              "sponsorMode": "both",
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorVolumeRatio20d": null,
              "anchorStopPrice": null,
              "fallbackStopPrice": 89822,
              "effectiveHardStopPrice": 89822,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 89,822원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 89,822원만 유지합니다."
            },
            "rr": "1 : 2.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 91674,
              "high": 92600,
              "anchor": 92600,
              "label": "91,674~92,600원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 92700,
                "secondaryResistancePrice": 98400,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "94,452원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "95,841원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "97,693원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "100,008원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "102,786원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 89,822원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "89,822원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 92700,
                "secondaryResistancePrice": 98400,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "92,700원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "95,841원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "97,693원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "100,008원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "102,786원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 89,822원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "89,822원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "nearestResistancePrice": 92700,
                "secondaryResistancePrice": 98400,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "92,700원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "98,400원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "98,400원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "100,008원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "102,786원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 89,822원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "89,822원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 84건)",
                  "hitRate": 0.0238,
                  "ev": -0.117,
                  "sampleCount": 84
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": -1.4246
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 84건)",
              "hitRate": 0.0238,
              "ev": -0.117,
              "sampleCount": 84
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "매매금지(핵심 Gate 미충족: G1)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 92,600 / 60MA 95,132",
            "statusReason": "G1 미충족: 종가 92,600 / 60MA 95,132"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "두산로보틱스",
            "code": "454910",
            "strictScore": 7,
            "signalScore": 7,
            "score": 7,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 7,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 -90,931→1,619,826 / 기관 -18,623→-1,526,675 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "당일 평균 85.0% / 마지막 1시간 221.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 138,400 / 20MA 107,405 (128.9% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 100% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 337% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.50 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 140300, 전봉 종가 141000 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
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
                "note": "최근 진입 이력 2건 · 손절 없음 (최근: 2026-05-22) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +38.3% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -0.3% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 138,400 / 60MA 95,415",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -3.6% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "종가 138,400 / 20MA 107,405 (128.9% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 100% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 337% (필요 ≥ 200%) · 투매 클라이맥스",
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
                "code": "C3",
                "note": "직전 30분봉 종가 140300, 전봉 종가 141000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 138400,
            "previousClose": 106500,
            "dailyChange": 31900,
            "dailyChangePct": 29.95,
            "dailyDirection": "up",
            "entryPriceText": "138,400원 (당일 종가 기준)",
            "entryPrice": 138400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.0942,
            "marketCapRank": 79,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -0.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "latestOpen": 140300,
              "latestClose": 140300,
              "previousClose": 141000
            },
            "toss": {
              "avgStrength": 85,
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
              "last30BuyVolume": 133,
              "last30SellVolume": 97
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
              "scoreDelta": 1,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 11.63%, 일간 표준편차 9.65%, 당일 레인지 14.27%.",
              "metrics": {
                "atrPct10": 11.63,
                "returnStd20": 9.65,
                "todayRangePct": 14.27,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "55% 익절",
                "targetYield": "+0.1%",
                "targetPrice": "138,532원",
                "historicalHitRate": 0.7308,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+0.1%",
                "targetPrice": "138,600원",
                "historicalHitRate": 0.6346,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 135,909원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "135,909원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 123200,
              "fallbackStopPrice": 135909,
              "effectiveHardStopPrice": 135909,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 123,200원와 기존 % 손절 135,909원 중 더 높은 135,909원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 123,200원이며, 기존 % 손절 135,909원보다 느슨해지지 않게 135,909원으로 고정합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1,
              "breakevenActivationPct": 3,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 0.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 137016,
              "high": 138400,
              "anchor": 138400,
              "label": "137,016~138,400원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 138800,
                "retrace33Price": 138532,
                "retrace50Price": 138600,
                "nearestResistancePrice": 138800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "138,532원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "138,600원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "143,936원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 135,909원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "135,909원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 138800,
                "retrace33Price": 138532,
                "retrace50Price": 138600,
                "nearestResistancePrice": 138800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "138,532원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+0.1%",
                    "targetPrice": "138,600원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 135,909원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "135,909원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "recentHighPrice": 138800,
                "retrace33Price": 138532,
                "retrace50Price": 138600,
                "nearestResistancePrice": 138800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "138,532원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+0.1%",
                    "targetPrice": "138,600원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 135,909원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "135,909원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": 0.1387
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 52건)",
              "hitRate": 0.7308,
              "ev": 1.875,
              "sampleCount": 52
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -0.3% (필요 -5%~-25%)",
            "statusReason": "G2 미충족: 20일 고점 대비 -0.3% (필요 -5%~-25%)"
          },
          {
            "rank": 2,
            "name": "LG에너지솔루션",
            "code": "373220",
            "strictScore": 6.5,
            "signalScore": 6.5,
            "score": 6.5,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 6.5,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 -69,474→22,875 / 기관 18,854→22,639 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 평균 116.0% / 마지막 1시간 282.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 455,000 / 20MA 435,200 (104.5% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 30% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 93% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.01 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 414000, 전봉 종가 410500 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
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
                "note": "당일 거래대금 순위 69위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 96.9조 (필요 ≥ 5조)",
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
                "note": "최근 진입 이력 4건 · 손절 없음 (최근: 2026-05-29) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -3.6% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -7.0% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 455,000 / 60MA 416,100",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.0% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "양봉·긴아래꼬리·도지 패턴 없음",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -69,474→22,875 / 기관 18,854→22,639 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 116.0% / 마지막 1시간 282.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 455,000 / 20MA 435,200 (104.5% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.01 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 30% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 93% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 414000, 전봉 종가 410500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 455000,
            "previousClose": 458000,
            "dailyChange": -3000,
            "dailyChangePct": -0.66,
            "dailyDirection": "down",
            "entryPriceText": "455,000원 (당일 종가 기준)",
            "entryPrice": 455000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 96.876,
            "marketCapRank": 6,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -7.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 LG에너지솔루션 (373220) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 414000, 전봉 종가 410500",
              "latestOpen": 414000,
              "latestClose": 414000,
              "previousClose": 410500
            },
            "toss": {
              "avgStrength": 116,
              "note": "토스 공개 체결강도 116.0% / 최근 체결 42분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A373220/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 100,
              "observedMinutes": 42,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 42분 프록시",
              "lastHourAvgStrength": 282.1,
              "lastHourObservedMinutes": 42,
              "last30AvgStrength": 300,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 29,
              "last30BuyVolume": 29,
              "last30SellVolume": 0
            },
            "orderbook": {
              "bidAskRatio": 1.0053,
              "bidTotal": 7010,
              "askTotal": 6973,
              "note": "Naver 호가잔량합계 매수 7,010 / 매도 6,973",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=373220"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 6.58%, 일간 표준편차 4.50%, 당일 레인지 6.55%.",
              "metrics": {
                "atrPct10": 6.58,
                "returnStd20": 4.5,
                "todayRangePct": 6.55,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.2%",
                "targetPrice": "465,000원",
                "historicalHitRate": 0.7308,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+3.3%",
                "targetPrice": "470,000원",
                "historicalHitRate": 0.6346,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 446,810원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "446,810원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 446000,
              "fallbackStopPrice": 446810,
              "effectiveHardStopPrice": 446810,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 446,000원와 기존 % 손절 446,810원 중 더 높은 446,810원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 446,000원이며, 기존 % 손절 446,810원보다 느슨해지지 않게 446,810원으로 고정합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1,
              "breakevenActivationPct": 3,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 450450,
              "high": 455000,
              "anchor": 455000,
              "label": "450,450~455,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 489500,
                "retrace33Price": 466385,
                "retrace50Price": 472250,
                "nearestResistancePrice": 465000,
                "secondaryResistancePrice": 470000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "465,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.3%",
                    "targetPrice": "470,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+7.6%",
                    "targetPrice": "489,500원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 446,810원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "446,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 489500,
                "retrace33Price": 466385,
                "retrace50Price": 472250,
                "nearestResistancePrice": 465000,
                "secondaryResistancePrice": 470000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "465,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.3%",
                    "targetPrice": "470,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 446,810원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "446,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "recentHighPrice": 489500,
                "retrace33Price": 466385,
                "retrace50Price": 472250,
                "nearestResistancePrice": 465000,
                "secondaryResistancePrice": 470000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "465,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.3%",
                    "targetPrice": "470,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 446,810원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "446,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": 0.1387
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 52건)",
              "hitRate": 0.7308,
              "ev": 1.875,
              "sampleCount": 52
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -3.6% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 -3.6% (필요 ≥ +15%) / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음"
          },
          {
            "rank": 3,
            "name": "LG전자",
            "code": "066570",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 6.1,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "외인 -1,037,762→-1,042,446 / 기관 -271,969→-18,198 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 평균 95.0% / 마지막 1시간 267.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 380,500 / 20MA 208,375 (182.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 100% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 119% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 9.25 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 303000, 전봉 종가 307500 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
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
                "note": "당일 거래대금 순위 8위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 49.4조 (필요 ≥ 5조)",
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
                "note": "최근 손절 이력 2건 (최근: 2026-05-26) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +171.8% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 +0.0% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 380,500 / 60MA 148,143",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.0% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "당일 평균 95.0% / 마지막 1시간 267.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 380,500 / 20MA 208,375 (182.6% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 100% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 9.25 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -1,037,762→-1,042,446 / 기관 -271,969→-18,198 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 119% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 303000, 전봉 종가 307500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 380500,
            "previousClose": 293000,
            "dailyChange": 87500,
            "dailyChangePct": 29.86,
            "dailyDirection": "up",
            "entryPriceText": "380,500원 (당일 종가 기준)",
            "entryPrice": 380500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 49.354,
            "marketCapRank": 17,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 0.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 LG전자 (066570) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 303000, 전봉 종가 307500",
              "latestOpen": 303000,
              "latestClose": 303000,
              "previousClose": 307500
            },
            "toss": {
              "avgStrength": 95,
              "note": "토스 공개 체결강도 95.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A066570/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 88.9,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 267.1,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 282.4,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.2158,
              "last30BuyVolume": 224,
              "last30SellVolume": 1038
            },
            "orderbook": {
              "bidAskRatio": 9.2474,
              "bidTotal": 226838,
              "askTotal": 24530,
              "note": "Naver 호가잔량합계 매수 226,838 / 매도 24,530",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=066570"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 14.68%, 일간 표준편차 12.25%, 당일 레인지 7.51%.",
              "metrics": {
                "atrPct10": 14.68,
                "returnStd20": 12.25,
                "todayRangePct": 7.51,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "55% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "391,915원",
                "historicalHitRate": 0.7308,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "399,525원",
                "historicalHitRate": 0.6346,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 373,651원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "373,651원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 358500,
              "fallbackStopPrice": 373651,
              "effectiveHardStopPrice": 373651,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 358,500원와 기존 % 손절 373,651원 중 더 높은 373,651원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 358,500원이며, 기존 % 손절 373,651원보다 느슨해지지 않게 373,651원으로 고정합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1,
              "breakevenActivationPct": 3,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 376695,
              "high": 380500,
              "anchor": 380500,
              "label": "376,695~380,500원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 380500,
                "retrace33Price": 380500,
                "retrace50Price": 380500,
                "nearestResistancePrice": null,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "387,349원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "391,915원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "395,720원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 373,651원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "373,651원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 380500,
                "retrace33Price": 380500,
                "retrace50Price": 380500,
                "nearestResistancePrice": null,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "387,349원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "391,915원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 373,651원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "373,651원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
                "recentHighPrice": 380500,
                "retrace33Price": 380500,
                "retrace50Price": 380500,
                "nearestResistancePrice": null,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "391,915원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "399,525원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 373,651원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "373,651원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 52건)",
                  "hitRate": 0.7308,
                  "ev": 1.875,
                  "sampleCount": 52
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 21건)",
              "sampleCount": 21,
              "ev": 0.1387
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 52건)",
              "hitRate": 0.7308,
              "ev": 1.875,
              "sampleCount": 52
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G2",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-05-26) · 재진입 차단 · 외 1건",
            "statusReason": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-05-26) · 재진입 차단 / G2 미충족: 20일 고점 대비 +0.0% (필요 -5%~-25%)"
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
  "analysisDate": "2026-06-01"
};
