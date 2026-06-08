window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-05-28"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-07T16:32:28+00:00",
  "variant": "stable",
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
        "durationMs": 1292,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1240.5,
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
        "durationMs": 78.6,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 326.7,
        "detail": "박스권 ⚠️"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 5281.2,
        "count": 59
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 3990.5,
        "detail": "성공 59 / 실패 0",
        "count": 59
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 2667.7,
        "detail": "direct-http · 체결강도 59 / 호가 59 / 틱프록시 59",
        "count": 59
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 136.6,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 14336.3,
        "detail": "playwright-chromium · KIND 0",
        "count": 3
      }
    ],
    "note": "현재 버전 채널입니다. CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 현재 버전은 토스 공개 API로 체결강도·틱 프록시·호가를 병렬 수집하고, KIND 공시는 표시 종목만 Playwright로 보강합니다.",
    "channel": "stable",
    "channelLabel": "현재 버전",
    "browserSource": "playwright-chromium",
    "browserLaunchNotes": []
  },
  "slots": [
    {
      "slotId": "slotA",
      "sourceId": "live-public-run-stable",
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
                "note": "저가 1,173,000 · 이평선 터치: 5MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,237,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 2.37 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 95% (필요 ≤ 80%)"
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
                "note": "최근 20일 최대 거래량 급증 170% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,211,600 > 20MA 1,086,550 > 60MA 754,517 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,237,000 / 60MA 754,517",
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
                "note": "당일 등락 -3.06% (필요 ≤ +12%)",
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
                "note": "이격 20MA +13.8% (필요 ≤ +25%) · 60MA +63.9% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
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
                "note": "저가 1,173,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,237,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 2.37 (필요 ≥ 1.0)",
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
                "note": "당일 거래량 / 5일 평균 95% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1237000,
            "previousClose": 1276000,
            "dailyChange": -39000,
            "dailyChangePct": -3.06,
            "dailyDirection": "down",
            "entryPriceText": "1,237,000원 (당일 종가 기준)",
            "entryPrice": 1237000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 166.0036,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 40,876주 / 기관 -25,435주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,132,010원 (8.49% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1132010,
                    "distancePct": 8.49,
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
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 552427,
                    "distancePct": 55.34,
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
                    "lastSeenDaysAgo": 30,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 517156,
                    "distancePct": 58.19,
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
                    "lastSeenDaysAgo": 34,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1180857,
                    "distancePct": 4.54,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1152000,
                    "distancePct": 6.87,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1132010,
                  "distancePct": 8.49,
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
                    "distancePct": 62.36,
                    "count": 3,
                    "lastSeenDaysAgo": 36,
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
                    "price": 485571,
                    "distancePct": 60.75,
                    "count": 6,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 480000,
                    "bandHigh": 489000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 504333,
                    "distancePct": 59.23,
                    "count": 5,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 499000,
                    "bandHigh": 510000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 519500,
                    "distancePct": 58,
                    "count": 3,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 517000,
                    "bandHigh": 521000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 534250,
                    "distancePct": 56.81,
                    "count": 4,
                    "lastSeenDaysAgo": 45,
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
                    "distancePct": 55.25,
                    "count": 11,
                    "lastSeenDaysAgo": 30,
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
                    "distancePct": 54.32,
                    "count": 5,
                    "lastSeenDaysAgo": 31,
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
                    "price": 580667,
                    "distancePct": 53.06,
                    "count": 4,
                    "lastSeenDaysAgo": 30,
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
                    "distancePct": 51.39,
                    "count": 6,
                    "lastSeenDaysAgo": 29,
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
                    "distancePct": 46.38,
                    "count": 2,
                    "lastSeenDaysAgo": 27,
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
                    "distancePct": 43.75,
                    "count": 4,
                    "lastSeenDaysAgo": 23,
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
                    "distancePct": 41.78,
                    "count": 4,
                    "lastSeenDaysAgo": 21,
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
                    "distancePct": 35.89,
                    "count": 3,
                    "lastSeenDaysAgo": 18,
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
                    "distancePct": 32.34,
                    "count": 2,
                    "lastSeenDaysAgo": 17,
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
                    "distancePct": 20.1,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
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
                    "distancePct": 17.62,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
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
                    "distancePct": 15.52,
                    "count": 3,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": 13.34,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
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
                    "distancePct": 11.4,
                    "count": 6,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 8.81,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
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
                    "distancePct": 6.87,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
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
                    "distancePct": 4.54,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1171000,
                    "bandHigh": 1190000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 551354,
                    "distancePct": 55.43,
                    "count": 9,
                    "lastSeenDaysAgo": 30,
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
                    "distancePct": 8.16,
                    "count": 4,
                    "lastSeenDaysAgo": 4,
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
                    "price": 514812,
                    "distancePct": 58.38,
                    "count": 6,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 25,
                    "volume": 4173750,
                    "binIndex": 1,
                    "binLow": 496542,
                    "binHigh": 533083
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 901000,
                    "distancePct": 27.16,
                    "count": 1,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 284.3,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 170% (15일 전)",
                "burstCount": 0,
                "maxRatioPct": 169.9,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 8.64%, 일간 표준편차 6.36%, 당일 레인지 7.52%.",
              "metrics": {
                "atrPct10": 8.64,
                "returnStd20": 6.36,
                "todayRangePct": 7.52,
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
              "ma10Price": 1146900,
              "ma10PrevPrice": 1142200,
              "ma20Price": 1086550,
              "ma20PrevPrice": 1064150,
              "ma10WarningPrice": null,
              "hardStopPrice": 1086550,
              "fallbackStopPrice": 1206075,
              "effectiveStopPrice": 1206075,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 950,000원, 20일선 1,086,550원) = 1,086,550원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,206,075원) = 1,206,075원",
              "reasonSummary": "앵커 봉 - 기준 몸통 중심 950,000원와 20일선 1,086,550원 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,206,075원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,261,740원",
                "historicalHitRate": 0.8857,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,274,110원",
                "historicalHitRate": 0.7143,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,292,665원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,311,220원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,206,075원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,206,075원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1224630,
              "high": 1237000,
              "anchor": 1237000,
              "label": "1,224,630~1,237,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "1,261,740원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,274,110원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,292,665원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,311,220원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,206,075원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,206,075원"
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
                    "targetPrice": "1,261,740원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,274,110원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,292,665원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,311,220원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,206,075원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,206,075원"
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
                    "targetPrice": "1,261,740원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,274,110원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,292,665원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,311,220원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,206,075원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,206,075원"
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
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 170% (필요 ≥ 200%) · 외 1건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 170% (필요 ≥ 200%) / G8 미충족: 이격 20MA +13.8% (필요 ≤ +25%) · 60MA +63.9% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          },
          {
            "rank": 2,
            "name": "NAVER",
            "code": "035420",
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
                "note": "당일 거래대금 순위 20위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 -147,900주 / 기관 135,906주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 195,800 · 이평선 터치: 5MA, 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 205,000 · 5MA·10MA·20MA 중 5MA, 10MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "양봉 (시가 202,000 ≤ 종가 205,000)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 241% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 -3.02% / KOSPI -5.54% outperform"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G1, G2, G3, G4)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 171% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 201,260 > 20MA 205,970 > 60MA 210,473 · 상승선 5MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 205,000 / 60MA 210,473",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "주봉 RSI 42.2 (필요 ≥ 50)",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "MACD 히스토그램 조건 미충족",
                "evalStatus": "not_met"
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
                "note": "당일 등락 +3.12% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 42.2 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -0.5% (필요 ≤ +25%) · 60MA -2.6% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 85점 · 현재가 아래 유효 family 4개",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 20위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -147,900주 / 기관 135,906주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 195,800 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 205,000 · 5MA·10MA·20MA 중 5MA, 10MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 202,000 ≤ 종가 205,000)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.02% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 241% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 205000,
            "previousClose": 198800,
            "dailyChange": 6200,
            "dailyChangePct": 3.12,
            "dailyDirection": "up",
            "entryPriceText": "205,000원 (당일 종가 기준)",
            "entryPrice": 205000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 40.0812,
            "marketCapRank": 20,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -147,900주 / 기관 135,906주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 196,063원 (4.36% 아래) · 강도 85점 · family 4개 · 급증봉 저점·수평 지지·스윙로우 군집",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 196063,
                    "distancePct": 4.36,
                    "families": [
                      "eventAnchors",
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 3,
                    "count": 16,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 207464,
                    "distancePct": -1.2,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 18,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 201910,
                    "distancePct": 1.51,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 21,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 196063,
                  "distancePct": 4.36,
                  "families": [
                    "eventAnchors",
                    "horizontal",
                    "swingCluster"
                  ],
                  "familyLabels": [
                    "급증봉 저점",
                    "수평 지지",
                    "스윙로우 군집"
                  ],
                  "familyCount": 3,
                  "count": 16,
                  "lastSeenDaysAgo": 0,
                  "strengthPoints": 85,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 85,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "급증봉 저점·수평 지지·스윙로우 군집 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 196890,
                    "distancePct": 3.96,
                    "count": 13,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 194200,
                    "bandHigh": 199500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 201545,
                    "distancePct": 1.69,
                    "count": 13,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 199900,
                    "bandHigh": 204000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 207762,
                    "distancePct": -1.35,
                    "count": 15,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 205000,
                    "bandHigh": 210500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 213724,
                    "distancePct": -4.26,
                    "count": 21,
                    "lastSeenDaysAgo": 9,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 211000,
                    "bandHigh": 216500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 220045,
                    "distancePct": -7.34,
                    "count": 15,
                    "lastSeenDaysAgo": 18,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 217500,
                    "bandHigh": 223000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 225167,
                    "distancePct": -9.84,
                    "count": 2,
                    "lastSeenDaysAgo": 48,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 224000,
                    "bandHigh": 226500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 195500,
                    "distancePct": 4.63,
                    "count": 2,
                    "lastSeenDaysAgo": 30,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 194200,
                    "bandHigh": 196800
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 207167,
                    "distancePct": -1.06,
                    "count": 3,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 206000,
                    "bandHigh": 208500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 216000,
                    "distancePct": -5.37,
                    "count": 2,
                    "lastSeenDaysAgo": 50,
                    "valid": false,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 216000,
                    "bandHigh": 216000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 215025,
                    "distancePct": -4.89,
                    "count": 9,
                    "lastSeenDaysAgo": 13,
                    "valid": false,
                    "weight": 25,
                    "volume": 8145391,
                    "binIndex": 9,
                    "binLow": 213750,
                    "binHigh": 216300
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 209925,
                    "distancePct": -2.4,
                    "count": 8,
                    "lastSeenDaysAgo": 9,
                    "valid": false,
                    "weight": 25,
                    "volume": 7031349,
                    "binIndex": 7,
                    "binLow": 208650,
                    "binHigh": 211200
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 202275,
                    "distancePct": 1.33,
                    "count": 8,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 25,
                    "volume": 6234064,
                    "binIndex": 4,
                    "binLow": 201000,
                    "binHigh": 203550
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 195800,
                    "distancePct": 4.49,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 210.8,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 171% (9일 전)",
                "burstCount": 0,
                "maxRatioPct": 170.6,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 5.16%, 일간 표준편차 2.75%, 당일 레인지 8.65%.",
              "metrics": {
                "atrPct10": 5.16,
                "returnStd20": 2.75,
                "todayRangePct": 8.65,
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
              "anchorSource": "fallback_percent_stop",
              "anchorLookbackDays": 20,
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorHigh": null,
              "anchorLow": null,
              "anchorBodyMid": null,
              "anchorVolumeRatio": null,
              "anchorStopMode": "",
              "anchorStopPrice": null,
              "ma10Price": 201240,
              "ma10PrevPrice": 200890,
              "ma20Price": 205970,
              "ma20PrevPrice": 206470,
              "ma10WarningPrice": null,
              "hardStopPrice": 199875,
              "fallbackStopPrice": 199875,
              "effectiveStopPrice": 199875,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 199,875원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 199,875원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "209,100원",
                "historicalHitRate": 0.8857,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "211,150원",
                "historicalHitRate": 0.7143,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "214,225원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "217,300원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 199,875원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "199,875원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 202950,
              "high": 205000,
              "anchor": 205000,
              "label": "202,950~205,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "209,100원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "211,150원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "214,225원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "217,300원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 199,875원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "199,875원"
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
                    "targetPrice": "209,100원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "211,150원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "214,225원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "217,300원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 199,875원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "199,875원"
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
                    "targetPrice": "209,100원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "211,150원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "214,225원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "217,300원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 199,875원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "199,875원"
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
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G3",
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G0, G1, G2, G3, G4)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 171% (필요 ≥ 200%) · 외 4건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 171% (필요 ≥ 200%) / G1 미충족: 5MA 201,260 > 20MA 205,970 > 60MA 210,473 · 상승선 5MA · 정배열 미충족 / G2 미충족: 종가 205,000 / 60MA 210,473 / 외 2건"
          },
          {
            "rank": 3,
            "name": "로보스타",
            "code": "090360",
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
                "note": "당일 거래대금 순위 25위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 -46,495주 / 기관 1,115주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 73,800 · 이평선 터치: 5MA, 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 77,700 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.97 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 56% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 -5.40% / KOSPI -5.54% outperform"
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
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 534% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 83,740 > 20MA 76,550 > 60MA 67,577 · 상승선 5MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 77,700 / 60MA 67,577",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 58.5 (필요 ≥ 50)",
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
                "note": "당일 등락 -4.07% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 58.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +1.5% (필요 ≤ +25%) · 60MA +15.0% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 85점 · 현재가 아래 유효 family 4개",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 25위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -46,495주 / 기관 1,115주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 73,800 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 77,700 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 56% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.40% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.97 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 77700,
            "previousClose": 81000,
            "dailyChange": -3300,
            "dailyChangePct": -4.07,
            "dailyDirection": "down",
            "entryPriceText": "77,700원 (당일 종가 기준)",
            "entryPrice": 77700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.444,
            "marketCapRank": 274,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -46,495주 / 기관 1,115주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 72,278원 (6.98% 아래) · 강도 85점 · family 4개 · 급증봉 저점·수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 72278,
                    "distancePct": 6.98,
                    "families": [
                      "eventAnchors",
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 3,
                    "count": 11,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 67994,
                    "distancePct": 12.49,
                    "families": [
                      "eventAnchors",
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 3,
                    "count": 15,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 62238,
                    "distancePct": 19.9,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 9,
                    "lastSeenDaysAgo": 22,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 55430,
                    "distancePct": 28.66,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 9,
                    "lastSeenDaysAgo": 34,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 77750,
                    "distancePct": -0.06,
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
                  "price": 72278,
                  "distancePct": 6.98,
                  "families": [
                    "eventAnchors",
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "급증봉 저점",
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 3,
                  "count": 11,
                  "lastSeenDaysAgo": 4,
                  "strengthPoints": 85,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 85,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "급증봉 저점·수평 지지·매물대 지지 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 55710,
                    "distancePct": 28.3,
                    "count": 7,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 54800,
                    "bandHigh": 56300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 57400,
                    "distancePct": 26.13,
                    "count": 8,
                    "lastSeenDaysAgo": 30,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 56800,
                    "bandHigh": 58000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 59542,
                    "distancePct": 23.37,
                    "count": 9,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 58800,
                    "bandHigh": 59900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 61843,
                    "distancePct": 20.41,
                    "count": 6,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 61100,
                    "bandHigh": 62400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 63811,
                    "distancePct": 17.88,
                    "count": 13,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 62900,
                    "bandHigh": 64700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 65400,
                    "distancePct": 15.83,
                    "count": 8,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 64900,
                    "bandHigh": 66100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 67933,
                    "distancePct": 12.57,
                    "count": 10,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 66800,
                    "bandHigh": 68400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 70093,
                    "distancePct": 9.79,
                    "count": 12,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 69100,
                    "bandHigh": 71000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 72175,
                    "distancePct": 7.11,
                    "count": 6,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 71600,
                    "bandHigh": 72900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 74000,
                    "distancePct": 4.76,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 73700,
                    "bandHigh": 74500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 77750,
                    "distancePct": -0.06,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 77700,
                    "bandHigh": 77800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 80900,
                    "distancePct": -4.12,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 80800,
                    "bandHigh": 81000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 84767,
                    "distancePct": -9.09,
                    "count": 4,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 83600,
                    "bandHigh": 85600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 89200,
                    "distancePct": -14.8,
                    "count": 2,
                    "lastSeenDaysAgo": 4,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 88800,
                    "bandHigh": 89600
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 55150,
                    "distancePct": 29.02,
                    "count": 2,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 54800,
                    "bandHigh": 55500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 62633,
                    "distancePct": 19.39,
                    "count": 3,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 62000,
                    "bandHigh": 63000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 68050,
                    "distancePct": 12.42,
                    "count": 4,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 4,
                    "bandLow": 68000,
                    "bandHigh": 68200
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 89819,
                    "distancePct": -15.6,
                    "count": 1,
                    "lastSeenDaysAgo": 8,
                    "valid": false,
                    "weight": 25,
                    "volume": 2043468,
                    "binIndex": 19,
                    "binLow": 88921,
                    "binHigh": 90717
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 80840,
                    "distancePct": -4.04,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 25,
                    "volume": 895304,
                    "binIndex": 14,
                    "binLow": 79942,
                    "binHigh": 81738
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 71860,
                    "distancePct": 7.52,
                    "count": 4,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "volume": 828898,
                    "binIndex": 9,
                    "binLow": 70962,
                    "binHigh": 72758
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 68000,
                    "distancePct": 12.48,
                    "count": 1,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 550.9,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 72800,
                    "distancePct": 6.31,
                    "count": 1,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 247,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 534% (8일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 534.2,
                "latestBurstDaysAgo": 4
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 12.96%, 일간 표준편차 7.89%, 당일 레인지 12.22%.",
              "metrics": {
                "atrPct10": 12.96,
                "returnStd20": 7.89,
                "todayRangePct": 12.22,
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
              "anchorDate": "20260521",
              "anchorOpen": 74100,
              "anchorClose": 89600,
              "anchorHigh": 91300,
              "anchorLow": 72800,
              "anchorBodyMid": 81850,
              "anchorVolumeRatio": 2.47,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 81850,
              "ma10Price": 82010,
              "ma10PrevPrice": 81690,
              "ma20Price": 76550,
              "ma20PrevPrice": 76215,
              "ma10WarningPrice": null,
              "hardStopPrice": 76550,
              "fallbackStopPrice": 75758,
              "effectiveStopPrice": 76550,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 76,550원) = 76,550원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 75,758원) = 76,550원 / 제외: 앵커 몸통 중심 81,850원가 현재가 77,700원 이상이라 제외",
              "reasonSummary": "현재가 아래 유효 손절 후보(20일선 76,550원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 75,758원를 하한으로 유지합니다. 앵커 몸통 중심 81,850원가 현재가 77,700원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "79,254원",
                "historicalHitRate": 0.8857,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "80,031원",
                "historicalHitRate": 0.7143,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "81,196원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "82,362원",
                "historicalHitRate": 0.5429,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 76,550원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "76,550원"
              }
            ],
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 76923,
              "high": 77700,
              "anchor": 77700,
              "label": "76,923~77,700원 (종가 ±, 분할매수)"
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
                    "targetPrice": "79,254원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "80,031원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "81,196원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "82,362원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 76,550원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "76,550원"
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
                    "targetPrice": "79,254원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "80,031원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "81,196원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "82,362원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 76,550원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "76,550원"
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
                    "targetPrice": "79,254원",
                    "historicalHitRate": 0.8857,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "80,031원",
                    "historicalHitRate": 0.7143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "81,196원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "82,362원",
                    "historicalHitRate": 0.5429,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 76,550원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "76,550원"
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
              "매매금지(갭다운 경고 · 신규 진입 금지)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "삼화콘덴서",
            "code": "001820",
            "strictScore": 6.1,
            "signalScore": 6.9,
            "score": 6.9,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 5.3,
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
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 29,959주 / 기관 52,172주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0,
                "signalPoints": 1,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "당일 평균 90.4% / 100% 유지 71.4% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 95.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 678% · 폭발적 급증 (≥300%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 98.1% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "몸통 87% / 윗꼬리·몸통 0.08 · 완벽한 강마감"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 6.21 (필요 ≥ 1.2) · 매수 잔량 우위"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G6)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +99.0% / 20일 초과 +137.8%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 90.4% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 75",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 678% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 87% / 윗꼬리·몸통 0.08 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "⛔",
                "note": "당일 등락 +24.07% (필요 ≤ +12%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 156,200 / 5MA 119,040 (전일 5MA 103,520) · 5MA 위·우상향",
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
                "code": "S1",
                "note": "외인 29,959주 / 기관 52,172주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 95.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 678% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.1% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 87% / 윗꼬리·몸통 0.08 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 6.21 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 90.4% / 100% 유지 71.4% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 156200,
            "previousClose": 125900,
            "dailyChange": 30300,
            "dailyChangePct": 24.07,
            "dailyDirection": "up",
            "entryPriceText": "156,200원 (당일 종가 기준)",
            "entryPrice": 156200,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.1622,
            "marketCapRank": 308,
            "marketCapUniverseCount": 2584,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 29,959주 / 기관 52,172주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 90.4,
              "note": "토스 공개 체결강도 90.4% / 최근 체결 162분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001820/order",
              "asOf": "2026-06-05T09:00:17Z",
              "intradayAbove100Ratio": 71.4,
              "observedMinutes": 162,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 162분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 6.206,
              "bidTotal": 5995,
              "askTotal": 966,
              "note": "Naver 호가잔량합계 매수 5,995 / 매도 966",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=001820"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 19.59%, 일간 표준편차 11.39%, 당일 레인지 32.41%.",
              "metrics": {
                "atrPct10": 19.59,
                "returnStd20": 11.39,
                "todayRangePct": 32.41,
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
              "referencePrice": 132600,
              "referenceBandLow": 132600,
              "referenceBandHigh": 132600,
              "entryDayOpenPrice": 120800,
              "fallbackStopPrice": 149952,
              "effectiveHardStopPrice": 149952,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 132,600원와 기존 % 손절 149,952원 중 더 높은 149,952원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 132,600원이며, 기존 % 손절 149,952원보다 느슨해지지 않게 149,952원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.9%",
                "targetPrice": "159,200원",
                "historicalHitRate": 0.5833,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.6%",
                "targetPrice": "163,400원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "168,696원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "173,382원",
                "historicalHitRate": 0.2917,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "178,068원",
                "historicalHitRate": 0.2917,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 149,952원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "149,952원"
              }
            ],
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 154638,
              "high": 156200,
              "anchor": 156200,
              "label": "154,638~156,200원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 159200,
                "secondaryResistancePrice": 163400,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "160,886원",
                    "historicalHitRate": 0.5833,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "164,010원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "168,696원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "173,382원",
                    "historicalHitRate": 0.2917,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "178,068원",
                    "historicalHitRate": 0.2917,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 149,952원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "149,952원"
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
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 159200,
                "secondaryResistancePrice": 163400,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "159,200원",
                    "historicalHitRate": 0.5833,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.6%",
                    "targetPrice": "163,400원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "168,696원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "173,382원",
                    "historicalHitRate": 0.2917,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "178,068원",
                    "historicalHitRate": 0.2917,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 149,952원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "149,952원"
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
                "nearestResistancePrice": 159200,
                "secondaryResistancePrice": 163400,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "159,200원",
                    "historicalHitRate": 0.5833,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.6%",
                    "targetPrice": "163,400원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "168,696원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "173,382원",
                    "historicalHitRate": 0.2917,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "178,068원",
                    "historicalHitRate": 0.2917,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 149,952원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "149,952원"
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
              "핵심 Gate 미충족: G6",
              "매매금지(핵심 Gate 미충족: G6)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G6 미충족: 당일 등락 +24.07% (필요 ≤ +12%)",
            "statusReason": "G6 미충족: 당일 등락 +24.07% (필요 ≤ +12%)"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "피에스케이",
            "code": "319660",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 6.8,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 33,467주 / 기관 78,535주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 당일 +33,467 / 전일 -24,531 · 기관 당일 +78,535 / 전일 +213,830 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 274.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 101.0% / 마지막 1시간 274.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 99.0% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 110,480 / 20MA 105,025 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 116% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 -2.71% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -7.73% / KOSPI -5.54% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 77.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -24,531/당일 +33,467 · 기관 전일 +213,830/당일 +78,535 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 104,000 / 60MA 87,013",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 78.5% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 87",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 119% (필요 < 150%)",
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
                "note": "외인 33,467주 / 기관 78,535주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +33,467 / 전일 -24,531 · 기관 당일 +78,535 / 전일 +213,830 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 274.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 101.0% / 마지막 1시간 274.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 99.0% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 110,480 / 20MA 105,025 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -2.71% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 77.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 116% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -7.73% / KOSPI -5.54% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 104000,
            "previousClose": 106900,
            "dailyChange": -2900,
            "dailyChangePct": -2.71,
            "dailyDirection": "down",
            "entryPriceText": "104,000원 (당일 종가 기준)",
            "entryPrice": 104000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.6643,
            "marketCapRank": 146,
            "marketCapUniverseCount": 2584,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 33,467주 / 기관 78,535주 / 마지막 1시간 274.1% · 장후반 매수세 강화 · 마지막 30분 틱 77.00:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 101,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 42분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A319660/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 87.5,
              "observedMinutes": 42,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 42분 프록시",
              "lastHourAvgStrength": 274.1,
              "lastHourObservedMinutes": 42,
              "last30AvgStrength": 300,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 77,
              "last30BuyVolume": 77,
              "last30SellVolume": 0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 9.30%, 일간 표준편차 5.66%, 당일 레인지 8.70%.",
              "metrics": {
                "atrPct10": 9.3,
                "returnStd20": 5.66,
                "todayRangePct": 8.7,
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
                "targetYield": "+2.5%",
                "targetPrice": "106,600원",
                "historicalHitRate": 0.7381,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.8%",
                "targetPrice": "109,000원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "109,720원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "112,320원",
                "historicalHitRate": 0.0952,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "115,440원",
                "historicalHitRate": 0.0238,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 100,880원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "100,880원"
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
              "fallbackStopPrice": 100880,
              "effectiveHardStopPrice": 100880,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 100,880원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 100,880원만 유지합니다."
            },
            "rr": "1 : 2.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 102960,
              "high": 104000,
              "anchor": 104000,
              "label": "102,960~104,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 106600,
                "secondaryResistancePrice": 109000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "106,080원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "107,640원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "109,720원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "112,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "115,440원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,880원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "100,880원"
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
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 106600,
                "secondaryResistancePrice": 109000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "106,080원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "107,640원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "109,720원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "112,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "115,440원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,880원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "100,880원"
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
                "nearestResistancePrice": 106600,
                "secondaryResistancePrice": 109000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "106,600원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.8%",
                    "targetPrice": "109,000원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "109,720원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "112,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "115,440원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,880원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "100,880원"
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
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "HD현대중공업",
            "code": "329180",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 6.2,
            "grade": "B",
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
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 103.9% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 709,000 / 20MA 677,550 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 90% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 등락 -5.38% (필요 -3% ~ +5%)"
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
                "note": "종가 704,000 / 60MA 583,108",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 91.7% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 87% (필요 < 150%)",
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
                "code": "P2",
                "note": "5MA 709,000 / 20MA 677,550 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 90% (필요 ≤ 90%)",
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
                "code": "P1",
                "note": "종가 / 20MA 103.9% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -5.38% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.46:1 · 평균 체결강도 115.4% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 704000,
            "previousClose": 744000,
            "dailyChange": -40000,
            "dailyChangePct": -5.38,
            "dailyDirection": "down",
            "entryPriceText": "704,000원 (당일 종가 기준)",
            "entryPrice": 704000,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 8.27%, 일간 표준편차 4.78%, 당일 레인지 10.08%.",
              "metrics": {
                "atrPct10": 8.27,
                "returnStd20": 4.78,
                "todayRangePct": 10.08,
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
                "targetPrice": "705,000원",
                "historicalHitRate": 0.7381,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.8%",
                "targetPrice": "724,000원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "742,720원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "760,320원",
                "historicalHitRate": 0.0952,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "781,440원",
                "historicalHitRate": 0.0238,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 682,880원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "682,880원"
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
              "fallbackStopPrice": 682880,
              "effectiveHardStopPrice": 682880,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 682,880원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 682,880원만 유지합니다."
            },
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 696960,
              "high": 704000,
              "anchor": 704000,
              "label": "696,960~704,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 705000,
                "secondaryResistancePrice": 724000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "718,080원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "728,640원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "742,720원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "760,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "781,440원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 682,880원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "682,880원"
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
                "nearestResistancePrice": 705000,
                "secondaryResistancePrice": 724000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "705,000원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "724,000원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "742,720원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "760,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "781,440원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 682,880원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "682,880원"
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
                "nearestResistancePrice": 705000,
                "secondaryResistancePrice": 724000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "705,000원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "724,000원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "742,720원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "760,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "781,440원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 682,880원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "682,880원"
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
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 3,
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
                "note": "종가 / 20MA 94.2% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 119,040 / 20MA 122,360 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 92% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 -2.62% (필요 -3% ~ +5%)"
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
                "note": "종가 115,300 / 60MA 116,863",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 86.2% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 84% (필요 < 150%)",
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
                "note": "당일 등락 -2.62% (필요 -3% ~ +5%)",
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
                "note": "종가 / 20MA 94.2% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "5MA 119,040 / 20MA 122,360 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 92% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 115300,
            "previousClose": 118400,
            "dailyChange": -3100,
            "dailyChangePct": -2.62,
            "dailyDirection": "down",
            "entryPriceText": "115,300원 (당일 종가 기준)",
            "entryPrice": 115300,
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
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 4.59%, 일간 표준편차 2.41%, 당일 레인지 4.73%.",
              "metrics": {
                "atrPct10": 4.59,
                "returnStd20": 2.41,
                "todayRangePct": 4.73,
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
                "targetPrice": "115,400원",
                "historicalHitRate": 0.7381,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+13.6%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+13.6%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+13.6%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.0952,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+13.6%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.0238,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 111,841원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "111,841원"
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
              "fallbackStopPrice": 111841,
              "effectiveHardStopPrice": 111841,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 111,841원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 111,841원만 유지합니다."
            },
            "rr": "1 : 3.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 114147,
              "high": 115300,
              "anchor": 115300,
              "label": "114,147~115,300원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 115400,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "117,606원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "119,335원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "121,642원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "124,524원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "127,983원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 111,841원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "111,841원"
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
                "nearestResistancePrice": 115400,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "115,400원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "119,335원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "121,642원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "124,524원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "127,983원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 111,841원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "111,841원"
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
                "nearestResistancePrice": 115400,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "115,400원",
                    "historicalHitRate": 0.7381,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+13.6%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+13.6%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+13.6%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.6%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.0238,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 111,841원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "111,841원"
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
            "statusReasonShort": "G1 미충족: 종가 115,300 / 60MA 116,863",
            "statusReason": "G1 미충족: 종가 115,300 / 60MA 116,863"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "LG에너지솔루션",
            "code": "373220",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 8.6,
            "grade": "S",
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
                "note": "종가 442,000 / 20MA 436,800 (101.2% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 85% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 431% (필요 ≥ 200%) · 투매 클라이맥스"
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
                "note": "최근 5거래일(2026-05-18~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -8.1% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -9.7% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 442,000 / 60MA 413,225",
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
                "note": "종가 442,000 / 20MA 436,800 (101.2% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 85% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 431% (필요 ≥ 200%) · 투매 클라이맥스",
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
                "code": "C3",
                "note": "직전 30분봉 종가 414000, 전봉 종가 410500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 442000,
            "previousClose": 383500,
            "dailyChange": 58500,
            "dailyChangePct": 15.25,
            "dailyDirection": "up",
            "entryPriceText": "442,000원 (당일 종가 기준)",
            "entryPrice": 442000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 96.876,
            "marketCapRank": 6,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -9.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 7.01%, 일간 표준편차 4.43%, 당일 레인지 8.87%.",
              "metrics": {
                "atrPct10": 7.01,
                "returnStd20": 4.43,
                "todayRangePct": 8.87,
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
                "targetYield": "+0.7%",
                "targetPrice": "445,000원",
                "historicalHitRate": 0.7308,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "464,100원",
                "historicalHitRate": 0.6346,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 434,044원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "434,044원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 413000,
              "fallbackStopPrice": 434044,
              "effectiveHardStopPrice": 434044,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 413,000원와 기존 % 손절 434,044원 중 더 높은 434,044원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 413,000원이며, 기존 % 손절 434,044원보다 느슨해지지 않게 434,044원으로 고정합니다."
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
              "low": 437580,
              "high": 442000,
              "anchor": 442000,
              "label": "437,580~442,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 489500,
                "retrace33Price": 457675,
                "retrace50Price": 465750,
                "nearestResistancePrice": 445000,
                "secondaryResistancePrice": 470000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "445,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.4%",
                    "targetPrice": "465,750원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+10.7%",
                    "targetPrice": "489,500원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 434,044원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "434,044원"
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
                "retrace33Price": 457675,
                "retrace50Price": 465750,
                "nearestResistancePrice": 445000,
                "secondaryResistancePrice": 470000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "445,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.4%",
                    "targetPrice": "465,750원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 434,044원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "434,044원"
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
                "retrace33Price": 457675,
                "retrace50Price": 465750,
                "nearestResistancePrice": 445000,
                "secondaryResistancePrice": 470000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "445,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "464,100원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 434,044원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "434,044원"
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
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -8.1% (필요 ≥ +15%)",
            "statusReason": "G1 미충족: 1개월 수익률 -8.1% (필요 ≥ +15%)"
          },
          {
            "rank": 2,
            "name": "삼성SDI",
            "code": "006400",
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
                "note": "외인 -27,959→71,651 / 기관 13,783→-41,664 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "당일 평균 65.0% / 마지막 1시간 259.4% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 676,000 / 20MA 652,000 (103.7% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 252% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.20 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 568000, 전봉 종가 565000 미달"
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
                "note": "당일 거래대금 순위 44위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 45.8조 (필요 ≥ 5조)",
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
                "note": "최근 5거래일(2026-05-18~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +5.5% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -6.5% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 676,000 / 60MA 519,625",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.9% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
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
                "note": "외인 -27,959→71,651 / 기관 13,783→-41,664 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 676,000 / 20MA 652,000 (103.7% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 69% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 252% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.20 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 65.0% / 마지막 1시간 259.4% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 568000, 전봉 종가 565000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 676000,
            "previousClose": 630000,
            "dailyChange": 46000,
            "dailyChangePct": 7.3,
            "dailyDirection": "up",
            "entryPriceText": "676,000원 (당일 종가 기준)",
            "entryPrice": 676000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 45.7726,
            "marketCapRank": 18,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -6.5% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 삼성SDI (006400) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 568000, 전봉 종가 565000",
              "latestOpen": 568000,
              "latestClose": 568000,
              "previousClose": 565000
            },
            "toss": {
              "avgStrength": 65,
              "note": "토스 공개 체결강도 65.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A006400/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 85.7,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 259.4,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 252.7,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.3361,
              "last30BuyVolume": 40,
              "last30SellVolume": 119
            },
            "orderbook": {
              "bidAskRatio": 1.2021,
              "bidTotal": 22724,
              "askTotal": 18903,
              "note": "Naver 호가잔량합계 매수 22,724 / 매도 18,903",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=006400"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 7.66%, 일간 표준편차 4.10%, 당일 레인지 7.62%.",
              "metrics": {
                "atrPct10": 7.66,
                "returnStd20": 4.1,
                "todayRangePct": 7.62,
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
                "targetYield": "+0.6%",
                "targetPrice": "680,000원",
                "historicalHitRate": 0.7308,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+2.1%",
                "targetPrice": "690,000원",
                "historicalHitRate": 0.6346,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 663,832원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "663,832원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 643000,
              "fallbackStopPrice": 663832,
              "effectiveHardStopPrice": 663832,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 643,000원와 기존 % 손절 663,832원 중 더 높은 663,832원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 643,000원이며, 기존 % 손절 663,832원보다 느슨해지지 않게 663,832원으로 고정합니다."
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
            "rr": "1 : 0.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 669240,
              "high": 676000,
              "anchor": 676000,
              "label": "669,240~676,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 723000,
                "retrace33Price": 691510,
                "retrace50Price": 699500,
                "nearestResistancePrice": 680000,
                "secondaryResistancePrice": 690000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.6%",
                    "targetPrice": "680,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "690,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+7.0%",
                    "targetPrice": "723,000원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 663,832원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "663,832원"
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
                "recentHighPrice": 723000,
                "retrace33Price": 691510,
                "retrace50Price": 699500,
                "nearestResistancePrice": 680000,
                "secondaryResistancePrice": 690000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.6%",
                    "targetPrice": "680,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+2.1%",
                    "targetPrice": "690,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 663,832원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "663,832원"
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
                "recentHighPrice": 723000,
                "retrace33Price": 691510,
                "retrace50Price": 699500,
                "nearestResistancePrice": 680000,
                "secondaryResistancePrice": 690000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+0.6%",
                    "targetPrice": "680,000원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+2.1%",
                    "targetPrice": "690,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 663,832원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "663,832원"
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
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +5.5% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 +5.5% (필요 ≥ +15%) / G4 미충족: 최근 5거래일 최저 -1.9% (필요 -3% 이하 급락 1회 이상)"
          },
          {
            "rank": 3,
            "name": "피에스케이",
            "code": "319660",
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
                "note": "외인 -24,531→33,467 / 기관 213,830→78,535 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 평균 101.0% / 마지막 1시간 274.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 104,000 / 20MA 105,025 (99.0% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 67% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 116% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.07 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 126500, 전봉 종가 125900 미달"
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
                "note": "당일 거래대금 순위 87위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 3.7조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
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
                "status": "⛔",
                "note": "1개월 수익률 +11.8% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -14.3% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 104,000 / 60MA 87,013",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -6.9% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 2.58)",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -24,531→33,467 / 기관 213,830→78,535 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 101.0% / 마지막 1시간 274.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 104,000 / 20MA 105,025 (99.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 67% (필요 ≥ 50%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 116% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.07 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 126500, 전봉 종가 125900 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 104000,
            "previousClose": 106900,
            "dailyChange": -2900,
            "dailyChangePct": -2.71,
            "dailyDirection": "down",
            "entryPriceText": "104,000원 (당일 종가 기준)",
            "entryPrice": 104000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.6643,
            "marketCapRank": 146,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -14.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 피에스케이 (319660) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 126500, 전봉 종가 125900",
              "latestOpen": 126500,
              "latestClose": 126500,
              "previousClose": 125900
            },
            "toss": {
              "avgStrength": 101,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 42분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A319660/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 87.5,
              "observedMinutes": 42,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 42분 프록시",
              "lastHourAvgStrength": 274.1,
              "lastHourObservedMinutes": 42,
              "last30AvgStrength": 300,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 77,
              "last30BuyVolume": 77,
              "last30SellVolume": 0
            },
            "orderbook": {
              "bidAskRatio": 0.0651,
              "bidTotal": 725,
              "askTotal": 11140,
              "note": "Naver 호가잔량합계 매수 725 / 매도 11,140",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=319660"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 9.30%, 일간 표준편차 5.66%, 당일 레인지 8.70%.",
              "metrics": {
                "atrPct10": 9.3,
                "returnStd20": 5.66,
                "todayRangePct": 8.7,
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
                "targetYield": "+2.5%",
                "targetPrice": "106,600원",
                "historicalHitRate": 0.7308,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+4.8%",
                "targetPrice": "109,000원",
                "historicalHitRate": 0.6346,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 102,128원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "102,128원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 97800,
              "fallbackStopPrice": 102128,
              "effectiveHardStopPrice": 102128,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 97,800원와 기존 % 손절 102,128원 중 더 높은 102,128원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 97,800원이며, 기존 % 손절 102,128원보다 느슨해지지 않게 102,128원으로 고정합니다."
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
            "rr": "1 : 2.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 102960,
              "high": 104000,
              "anchor": 104000,
              "label": "102,960~104,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 121300,
                "retrace33Price": 109709,
                "retrace50Price": 112650,
                "nearestResistancePrice": 106600,
                "secondaryResistancePrice": 109000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "106,600원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.8%",
                    "targetPrice": "109,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+16.6%",
                    "targetPrice": "121,300원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 102,128원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "102,128원"
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
                "recentHighPrice": 121300,
                "retrace33Price": 109709,
                "retrace50Price": 112650,
                "nearestResistancePrice": 106600,
                "secondaryResistancePrice": 109000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "106,600원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.8%",
                    "targetPrice": "109,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 102,128원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "102,128원"
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
                "recentHighPrice": 121300,
                "retrace33Price": 109709,
                "retrace50Price": 112650,
                "nearestResistancePrice": 106600,
                "secondaryResistancePrice": 109000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "106,600원",
                    "historicalHitRate": 0.7308,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.8%",
                    "targetPrice": "109,000원",
                    "historicalHitRate": 0.6346,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 102,128원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "102,128원"
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
              "핵심 Gate 미충족: F2",
              "핵심 Gate 미충족: G1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) / G1 미충족: 1개월 수익률 +11.8% (필요 ≥ +15%)"
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
  "analysisDate": "2026-05-28"
};
