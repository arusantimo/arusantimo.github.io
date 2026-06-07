window.JONGGA_CANARY_DAILY_DATA = window.JONGGA_CANARY_DAILY_DATA || {};
window.JONGGA_CANARY_DAILY_DATA["2026-05-27"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-07T04:48:01+00:00",
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
        "durationMs": 1448.3,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1310.0,
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
        "durationMs": 80.0,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 1.8,
        "detail": "박스권 ⚠️"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 6472.6,
        "count": 16
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 1324.7,
        "detail": "성공 16 / 실패 0",
        "count": 16
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 884.7,
        "detail": "direct-http · 체결강도 16 / 호가 16 / 틱프록시 16",
        "count": 16
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 23.8,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "warning",
        "durationMs": 0.2,
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
            "name": "NAVER",
            "code": "035420",
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
                "note": "당일 거래대금 순위 20위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -147,900주 / 기관 135,906주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 197,300 · 이평선 터치: 5MA, 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 198,800 · 5MA·10MA·20MA 중 5MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 1.50 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 110% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -3.02% / KOSPI -5.54% outperform"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G1, G2, G3, G4)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 175% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 198,560 > 20MA 206,470 > 60MA 211,298 · 상승선 5MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 198,800 / 60MA 211,298",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "주봉 RSI 36.2 (필요 ≥ 50)",
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
                "note": "당일 등락 -0.60% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 36.2 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -3.7% (필요 ≤ +25%) · 60MA -5.9% (필요 ≤ +60%)",
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
                "note": "저가 197,300 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 198,800 · 5MA·10MA·20MA 중 5MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 1.50 (필요 ≥ 1.0)",
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
                "note": "당일 거래량 / 5일 평균 110% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 198800,
            "previousClose": 200000,
            "dailyChange": -1200,
            "dailyChangePct": -0.6,
            "dailyDirection": "down",
            "entryPriceText": "198,800원 (당일 종가 기준)",
            "entryPrice": 198800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 40.0812,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -147,900주 / 기관 135,906주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 196,582원 (1.12% 아래) · 강도 65점 · family 3개 · 수평 지지·스윙로우 군집",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 196582,
                    "distancePct": 1.12,
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
                    "role": "primary"
                  },
                  {
                    "label": "매물대 지지",
                    "price": 201110,
                    "distancePct": -1.16,
                    "families": [
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "매물대 지지"
                    ],
                    "familyCount": 1,
                    "count": 8,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 25,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 196582,
                  "distancePct": 1.12,
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
                    "price": 197665,
                    "distancePct": 0.57,
                    "count": 16,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 194200,
                    "bandHigh": 200500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 202367,
                    "distancePct": -1.79,
                    "count": 12,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 201000,
                    "bandHigh": 205000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 208820,
                    "distancePct": -5.04,
                    "count": 16,
                    "lastSeenDaysAgo": 11,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 205500,
                    "bandHigh": 211500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 214500,
                    "distancePct": -7.9,
                    "count": 17,
                    "lastSeenDaysAgo": 8,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 212500,
                    "bandHigh": 217500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 220167,
                    "distancePct": -10.75,
                    "count": 14,
                    "lastSeenDaysAgo": 17,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 218000,
                    "bandHigh": 223000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 225167,
                    "distancePct": -13.26,
                    "count": 2,
                    "lastSeenDaysAgo": 47,
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
                    "distancePct": 1.66,
                    "count": 2,
                    "lastSeenDaysAgo": 29,
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
                    "price": 207250,
                    "distancePct": -4.25,
                    "count": 4,
                    "lastSeenDaysAgo": 13,
                    "valid": false,
                    "weight": 25,
                    "pivotCount": 4,
                    "bandLow": 206000,
                    "bandHigh": 208500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 216000,
                    "distancePct": -8.65,
                    "count": 2,
                    "lastSeenDaysAgo": 49,
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
                    "price": 215840,
                    "distancePct": -8.57,
                    "count": 9,
                    "lastSeenDaysAgo": 16,
                    "valid": false,
                    "weight": 25,
                    "volume": 8160192,
                    "binIndex": 8,
                    "binLow": 214367,
                    "binHigh": 217312
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 201110,
                    "distancePct": -1.16,
                    "count": 8,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 7639932,
                    "binIndex": 3,
                    "binLow": 199638,
                    "binHigh": 202583
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 209948,
                    "distancePct": -5.61,
                    "count": 8,
                    "lastSeenDaysAgo": 8,
                    "valid": false,
                    "weight": 25,
                    "volume": 7031349,
                    "binIndex": 6,
                    "binLow": 208475,
                    "binHigh": 211421
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 175% (8일 전)",
                "burstCount": 0,
                "maxRatioPct": 174.7,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 4.71%, 일간 표준편차 2.65%, 당일 레인지 2.35%.",
              "metrics": {
                "atrPct10": 4.71,
                "returnStd20": 2.65,
                "todayRangePct": 2.35,
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
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "202,776원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "204,764원",
                "historicalHitRate": 0.3778,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "207,746원",
                "historicalHitRate": 0.2444,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "210,728원",
                "historicalHitRate": 0.1778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "193,830원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 196812,
              "high": 198800,
              "anchor": 198800,
              "label": "196,812~198,800원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.3778,
              "ev": 1.1334,
              "sampleCount": 45
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
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 175% (필요 ≥ 200%) · 외 4건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 175% (필요 ≥ 200%) / G1 미충족: 5MA 198,560 > 20MA 206,470 > 60MA 211,298 · 상승선 5MA · 정배열 미충족 / G2 미충족: 종가 198,800 / 60MA 211,298 / 외 2건"
          },
          {
            "rank": 2,
            "name": "로보스타",
            "code": "090360",
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
                "note": "당일 거래대금 순위 25위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -46,495주 / 기관 1,115주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 79,000 · 이평선 터치: 5MA, 10MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 81,000 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.62 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 51% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -5.40% / KOSPI -5.54% outperform"
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
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 542% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 82,260 > 20MA 76,215 > 60MA 67,618 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 81,000 / 60MA 67,618",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 53.5 (필요 ≥ 50)",
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
                "note": "당일 등락 -4.71% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 53.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +6.3% (필요 ≤ +25%) · 60MA +19.8% (필요 ≤ +60%)",
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
                "note": "저가 79,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 81,000 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 51% (필요 ≤ 80%)",
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
                "note": "음봉 · 아래꼬리:몸통 0.62 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 81000,
            "previousClose": 85000,
            "dailyChange": -4000,
            "dailyChangePct": -4.71,
            "dailyDirection": "down",
            "entryPriceText": "81,000원 (당일 종가 기준)",
            "entryPrice": 81000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.444,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -46,495주 / 기관 1,115주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 72,278원 (10.77% 아래) · 강도 85점 · family 4개 · 급증봉 저점·수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 72278,
                    "distancePct": 10.77,
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
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 67994,
                    "distancePct": 16.06,
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
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 80870,
                    "distancePct": 0.16,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 62238,
                    "distancePct": 23.16,
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
                    "lastSeenDaysAgo": 21,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 55430,
                    "distancePct": 31.57,
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
                    "lastSeenDaysAgo": 33,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 72278,
                  "distancePct": 10.77,
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
                  "lastSeenDaysAgo": 3,
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
                    "distancePct": 31.22,
                    "count": 7,
                    "lastSeenDaysAgo": 33,
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
                    "distancePct": 29.14,
                    "count": 8,
                    "lastSeenDaysAgo": 29,
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
                    "distancePct": 26.49,
                    "count": 9,
                    "lastSeenDaysAgo": 28,
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
                    "distancePct": 23.65,
                    "count": 6,
                    "lastSeenDaysAgo": 27,
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
                    "distancePct": 21.22,
                    "count": 13,
                    "lastSeenDaysAgo": 20,
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
                    "distancePct": 19.26,
                    "count": 8,
                    "lastSeenDaysAgo": 20,
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
                    "distancePct": 16.13,
                    "count": 10,
                    "lastSeenDaysAgo": 4,
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
                    "distancePct": 13.47,
                    "count": 12,
                    "lastSeenDaysAgo": 4,
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
                    "distancePct": 10.9,
                    "count": 6,
                    "lastSeenDaysAgo": 3,
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
                    "price": 74100,
                    "distancePct": 8.52,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
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
                    "price": 79433,
                    "distancePct": 1.93,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 79000,
                    "bandHigh": 80200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 80900,
                    "distancePct": 0.12,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
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
                    "distancePct": -4.65,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
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
                    "distancePct": -10.12,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
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
                    "distancePct": 31.91,
                    "count": 2,
                    "lastSeenDaysAgo": 33,
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
                    "distancePct": 22.67,
                    "count": 3,
                    "lastSeenDaysAgo": 21,
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
                    "distancePct": 15.99,
                    "count": 4,
                    "lastSeenDaysAgo": 4,
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
                    "distancePct": -10.89,
                    "count": 1,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 0.2,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 25,
                    "volume": 1025849,
                    "binIndex": 14,
                    "binLow": 79942,
                    "binHigh": 81738
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 71860,
                    "distancePct": 11.28,
                    "count": 4,
                    "lastSeenDaysAgo": 4,
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
                    "price": 66800,
                    "distancePct": 17.53,
                    "count": 1,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 442.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 68000,
                    "distancePct": 16.05,
                    "count": 1,
                    "lastSeenDaysAgo": 10,
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
                    "distancePct": 10.12,
                    "count": 1,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 247.0,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 542% (7일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 542.4,
                "latestBurstDaysAgo": 3
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 12.87%, 일간 표준편차 7.97%, 당일 레인지 6.71%.",
              "metrics": {
                "atrPct10": 12.87,
                "returnStd20": 7.97,
                "todayRangePct": 6.71,
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
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "82,620원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "83,430원",
                "historicalHitRate": 0.3778,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "84,645원",
                "historicalHitRate": 0.2444,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "85,860원",
                "historicalHitRate": 0.1778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "78,975원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 80190,
              "high": 81000,
              "anchor": 81000,
              "label": "80,190~81,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.3778,
              "ev": 1.1334,
              "sampleCount": 45
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
            "rank": 3,
            "name": "현대모비스",
            "code": "012330",
            "strictScore": 6.4,
            "signalScore": 6.4,
            "score": 6.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.4,
            "grade": "B",
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "저가 648,000 · 이평선 터치: 없음"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 688,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 661,000 ≤ 종가 688,000)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 148% (필요 ≤ 80%)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G8)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 212% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 640,600 > 20MA 544,300 > 60MA 457,775 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 688,000 / 60MA 457,775",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 64.1 (필요 ≥ 50)",
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
                "note": "당일 등락 +3.61% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 64.1 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +26.4% (필요 ≤ +25%) · 60MA +50.3% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
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
                "note": "당일 거래대금 순위 24위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -145,935주 / 기관 1,577주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 688,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 661,000 ≤ 종가 688,000)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.15% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "저가 648,000 · 이평선 터치: 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 148% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 688000,
            "previousClose": 664000,
            "dailyChange": 24000,
            "dailyChangePct": 3.61,
            "dailyDirection": "up",
            "entryPriceText": "688,000원 (당일 종가 기준)",
            "entryPrice": 688000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 63.2406,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -145,935주 / 기관 1,577주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 434,847원 (36.80% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 434847,
                    "distancePct": 36.8,
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
                    "lastSeenDaysAgo": 13,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 421954,
                    "distancePct": 38.67,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 17,
                    "lastSeenDaysAgo": 14,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 409334,
                    "distancePct": 40.5,
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
                    "lastSeenDaysAgo": 27,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 391875,
                    "distancePct": 43.04,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 14,
                    "lastSeenDaysAgo": 29,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 383688,
                    "distancePct": 44.23,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 13,
                    "lastSeenDaysAgo": 29,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 434847,
                  "distancePct": 36.8,
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
                  "lastSeenDaysAgo": 13,
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
                    "distancePct": 44.54,
                    "count": 10,
                    "lastSeenDaysAgo": 29,
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
                    "price": 391000,
                    "distancePct": 43.17,
                    "count": 12,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 387500,
                    "bandHigh": 395500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 400529,
                    "distancePct": 41.78,
                    "count": 12,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 397000,
                    "bandHigh": 405000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 411250,
                    "distancePct": 40.23,
                    "count": 9,
                    "lastSeenDaysAgo": 27,
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
                    "price": 423075,
                    "distancePct": 38.51,
                    "count": 14,
                    "lastSeenDaysAgo": 14,
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
                    "price": 433944,
                    "distancePct": 36.93,
                    "count": 8,
                    "lastSeenDaysAgo": 13,
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
                    "price": 444125,
                    "distancePct": 35.45,
                    "count": 7,
                    "lastSeenDaysAgo": 12,
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
                    "price": 514000,
                    "distancePct": 25.29,
                    "count": 5,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 509000,
                    "bandHigh": 520000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 525000,
                    "distancePct": 23.69,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 525000,
                    "bandHigh": 525000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 552000,
                    "distancePct": 19.77,
                    "count": 3,
                    "lastSeenDaysAgo": 9,
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
                    "distancePct": 17.73,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
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
                    "distancePct": 10.68,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
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
                    "price": 646167,
                    "distancePct": 6.08,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 640000,
                    "bandHigh": 650000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 667000,
                    "distancePct": 3.05,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 664000,
                    "bandHigh": 670000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 374250,
                    "distancePct": 45.6,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
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
                    "price": 385833,
                    "distancePct": 43.92,
                    "count": 3,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 383500,
                    "bandHigh": 387500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 392750,
                    "distancePct": 42.91,
                    "count": 2,
                    "lastSeenDaysAgo": 49,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 392000,
                    "bandHigh": 393500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 420833,
                    "distancePct": 38.83,
                    "count": 3,
                    "lastSeenDaysAgo": 16,
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
                    "price": 407417,
                    "distancePct": 40.78,
                    "count": 12,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 25,
                    "volume": 3827160,
                    "binIndex": 2,
                    "binLow": 400333,
                    "binHigh": 414500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 634083,
                    "distancePct": 7.84,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "volume": 3084628,
                    "binIndex": 18,
                    "binLow": 627000,
                    "binHigh": 641167
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 435750,
                    "distancePct": 36.66,
                    "count": 9,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 25,
                    "volume": 3044471,
                    "binIndex": 4,
                    "binLow": 428667,
                    "binHigh": 442833
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 447000,
                    "distancePct": 35.03,
                    "count": 1,
                    "lastSeenDaysAgo": 12,
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
                    "distancePct": 24.06,
                    "count": 2,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 331.0,
                    "anchorCount": 2
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 212% (9일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 212.0,
                "latestBurstDaysAgo": 9
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 11.74%, 일간 표준편차 8.26%, 당일 레인지 9.64%.",
              "metrics": {
                "atrPct10": 11.74,
                "returnStd20": 8.26,
                "todayRangePct": 9.64,
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
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "701,760원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "708,640원",
                "historicalHitRate": 0.3778,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "718,960원",
                "historicalHitRate": 0.2444,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "729,280원",
                "historicalHitRate": 0.1778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "670,800원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 681120,
              "high": 688000,
              "anchor": 688000,
              "label": "681,120~688,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.3778,
              "ev": 1.1334,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G8 미충족: 이격 20MA +26.4% (필요 ≤ +25%) · 60MA +50.3% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
            "statusReason": "G8 미충족: 이격 20MA +26.4% (필요 ≤ +25%) · 60MA +50.3% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 2.5,
            "signalScore": 3.2,
            "score": 3.2,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.2,
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
                "note": "외인 -60,220주 / 기관 35,180주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 96.0% / 100% 유지 80.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 80.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 283% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 80.6% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 85% / 윗꼬리·몸통 0.13 · 완벽한 강마감"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 3.40 (필요 ≥ 1.2) · 매수 잔량 우위"
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
                "note": "5일 초과 +32.0% / 20일 초과 +82.1%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 57.6% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 14",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 283% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 85% / 윗꼬리·몸통 0.13 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -2.25% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 1,044,000 / 5MA 914,800 (전일 5MA 864,600) · 5MA 위·우상향",
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
                "code": "C2",
                "note": "몸통 85% / 윗꼬리·몸통 0.13 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 3.40 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -60,220주 / 기관 35,180주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 96.0% / 100% 유지 80.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 80.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 283% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 80.6% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1044000,
            "previousClose": 1068000,
            "dailyChange": -24000,
            "dailyChangePct": -2.25,
            "dailyDirection": "down",
            "entryPriceText": "1,044,000원 (당일 종가 기준)",
            "entryPrice": 1044000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 27.4538,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -60,220주 / 기관 35,180주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 96.0,
              "note": "토스 공개 체결강도 96.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 80.0,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 250.7,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 9.0,
              "last30BuyVolume": 9.0,
              "last30SellVolume": 0.0
            },
            "orderbook": {
              "bidAskRatio": 3.3966,
              "bidTotal": 7109,
              "askTotal": 2093,
              "note": "Naver 호가잔량합계 매수 7,109 / 매도 2,093",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=011070"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 12.78%, 일간 표준편차 6.34%, 당일 레인지 24.44%.",
              "metrics": {
                "atrPct10": 12.78,
                "returnStd20": 6.34,
                "todayRangePct": 24.44,
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
                "condition": "+3.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,075,320원",
                "historicalHitRate": 0.6222,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+5.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "1,096,200원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,127,520원",
                "historicalHitRate": 0.2222,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,158,840원",
                "historicalHitRate": 0.2222,
                "recommended": true
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "1,190,160원",
                "historicalHitRate": 0.1333,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "1,002,240원"
              }
            ],
            "rr": "1 : 2.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1033560,
              "high": 1044000,
              "anchor": 1044000,
              "label": "1,033,560~1,044,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.2222,
              "ev": 2.4442,
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 57.6% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 57.6% (필요 ≥ 90%)"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "LG전자",
            "code": "066570",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 4.3,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -1,042,446주 / 기관 -18,198주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -1,042,446 / 전일 -1,037,762 · 기관 당일 -18,198 / 전일 -271,969 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 267.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 95.0% / 마지막 1시간 267.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 127.9% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 225,500 / 20MA 183,715 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 67% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -1.88% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -2.04% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.22:1 · 평균 체결강도 282.4% (필요 ≥ 1.1:1)"
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
                "note": "외인 전일 -1,037,762/당일 -1,042,446 · 기관 전일 -271,969/당일 -18,198 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 235,000 / 60MA 139,532",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 50.3% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 8",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 78% (필요 < 150%)",
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
                "note": "마지막 1시간 평균 체결강도 267.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 95.0% / 마지막 1시간 267.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 225,500 / 20MA 183,715 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 67% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.88% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -2.04% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -1,042,446주 / 기관 -18,198주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -1,042,446 / 전일 -1,037,762 · 기관 당일 -18,198 / 전일 -271,969 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 127.9% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.22:1 · 평균 체결강도 282.4% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 235000,
            "previousClose": 239500,
            "dailyChange": -4500,
            "dailyChangePct": -1.88,
            "dailyDirection": "down",
            "entryPriceText": "235,000원 (당일 종가 기준)",
            "entryPrice": 235000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 49.354,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -1,042,446주 / 기관 -18,198주 / 마지막 1시간 267.1% · 장후반 매수세 강화 · 마지막 30분 틱 0.22:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 95.0,
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
              "last30BuyVolume": 224.0,
              "last30SellVolume": 1038.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 13.00%, 일간 표준편차 9.31%, 당일 레인지 6.47%.",
              "metrics": {
                "atrPct10": 13.0,
                "returnStd20": 9.31,
                "todayRangePct": 6.47,
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
                "condition": "+2.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "239,700원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.5% 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "243,225원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "247,925원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "253,800원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "260,850원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "227,950원"
              }
            ],
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 232650,
              "high": 235000,
              "anchor": 235000,
              "label": "232,650~235,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
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
            "name": "현대차",
            "code": "005380",
            "strictScore": 4.9,
            "signalScore": 4.9,
            "score": 4.9,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 4.1,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -175,156주 / 기관 -56,193주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -175,156 / 전일 -155,017 · 기관 당일 -56,193 / 전일 -36,816 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 263.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 85.0% / 마지막 1시간 263.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 109.8% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 656,600 / 20MA 620,200 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 105% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -1.16% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -1.87% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 6.24:1 · 평균 체결강도 276.9% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -155,017/당일 -175,156 · 기관 전일 -36,816/당일 -56,193 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 681,000 / 60MA 548,792",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 86.5% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 15",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 82% (필요 < 150%)",
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
                "note": "마지막 1시간 평균 체결강도 263.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 85.0% / 마지막 1시간 263.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 656,600 / 20MA 620,200 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.16% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.87% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 6.24:1 · 평균 체결강도 276.9% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -175,156주 / 기관 -56,193주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -175,156 / 전일 -155,017 · 기관 당일 -56,193 / 전일 -36,816 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 109.8% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 105% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 681000,
            "previousClose": 689000,
            "dailyChange": -8000,
            "dailyChangePct": -1.16,
            "dailyDirection": "down",
            "entryPriceText": "681,000원 (당일 종가 기준)",
            "entryPrice": 681000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 143.3304,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -175,156주 / 기관 -56,193주 / 마지막 1시간 263.1% · 장후반 매수세 강화 · 마지막 30분 틱 6.24:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 85.0,
              "note": "토스 공개 체결강도 85.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005380/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 85.7,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 263.1,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 276.9,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 6.2353,
              "last30BuyVolume": 106.0,
              "last30SellVolume": 17.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 8.05%, 일간 표준편차 5.07%, 당일 레인지 3.92%.",
              "metrics": {
                "atrPct10": 8.05,
                "returnStd20": 5.07,
                "todayRangePct": 3.92,
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
                "condition": "+2.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "694,620원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.5% 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "704,835원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "718,455원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "735,480원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "755,910원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "660,570원"
              }
            ],
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 674190,
              "high": 681000,
              "anchor": 681000,
              "label": "674,190~681,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
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
            "strictScore": 4.9,
            "signalScore": 4.9,
            "score": 4.9,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 4.1,
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
                "note": "종가 / 20MA 126.4% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 640,600 / 20MA 544,300 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 148% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +3.61% (필요 -3% ~ +5%)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G4)",
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
                "note": "종가 688,000 / 60MA 457,775",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 83.7% (필요 < 92%)",
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
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 182% (필요 < 150%)",
                "evalStatus": "not_met"
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
                "note": "5MA 640,600 / 20MA 544,300 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +3.61% (필요 -3% ~ +5%)",
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
                "note": "종가 / 20MA 126.4% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 148% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 688000,
            "previousClose": 664000,
            "dailyChange": 24000,
            "dailyChangePct": 3.61,
            "dailyDirection": "up",
            "entryPriceText": "688,000원 (당일 종가 기준)",
            "entryPrice": 688000,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 11.74%, 일간 표준편차 8.26%, 당일 레인지 9.64%.",
              "metrics": {
                "atrPct10": 11.74,
                "returnStd20": 8.26,
                "todayRangePct": 9.64,
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
                "condition": "+2.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "701,760원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.5% 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "712,080원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "725,840원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "743,040원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "763,680원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "667,360원"
              }
            ],
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 681120,
              "high": 688000,
              "anchor": 688000,
              "label": "681,120~688,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "heuristic",
              "reason": "기본 추천(데이터 축적 중)",
              "hitRate": null,
              "ev": null,
              "sampleCount": 0
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 182% (필요 < 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 182% (필요 < 150%)"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 5.7,
            "signalScore": 5.7,
            "score": 5.7,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.7,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 27,792→-60,220 / 기관 12,069→35,180 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 96.0% / 마지막 1시간 250.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,044,000 / 20MA 726,100 (143.8% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 4% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 235% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 3.40 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1160000, 전봉 종가 1172000 미달"
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
                "note": "당일 거래대금 순위 14위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 27.5조 (필요 ≥ 5조)",
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
                "note": "최근 5거래일(2026-05-17~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +108.8% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -19.4% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,044,000 / 60MA 460,825",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.2% (필요 -3% 이하 급락 1회 이상)",
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
                "code": "S2",
                "note": "당일 평균 96.0% / 마지막 1시간 250.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,044,000 / 20MA 726,100 (143.8% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 235% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 3.40 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 27,792→-60,220 / 기관 12,069→35,180 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 4% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1160000, 전봉 종가 1172000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1044000,
            "previousClose": 1068000,
            "dailyChange": -24000,
            "dailyChangePct": -2.25,
            "dailyDirection": "down",
            "entryPriceText": "1,044,000원 (당일 종가 기준)",
            "entryPrice": 1044000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 27.4538,
            "keyPoint": "20일 고점 대비 -19.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 LG이노텍 (011070) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 1160000, 전봉 종가 1172000",
              "latestOpen": 1160000.0,
              "latestClose": 1160000.0,
              "previousClose": 1172000.0
            },
            "toss": {
              "avgStrength": 96.0,
              "note": "토스 공개 체결강도 96.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 80.0,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 250.7,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 9.0,
              "last30BuyVolume": 9.0,
              "last30SellVolume": 0.0
            },
            "orderbook": {
              "bidAskRatio": 3.3966,
              "bidTotal": 7109,
              "askTotal": 2093,
              "note": "Naver 호가잔량합계 매수 7,109 / 매도 2,093",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=011070"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 12.78%, 일간 표준편차 6.34%, 당일 레인지 24.44%.",
              "metrics": {
                "atrPct10": 12.78,
                "returnStd20": 6.34,
                "todayRangePct": 24.44,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.8% 도달",
                "quantity": "55% 익절",
                "targetYield": "+1.8%",
                "targetPrice": "1,062,792원",
                "historicalHitRate": 0.7333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,075,320원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.0% 도달",
                "quantity": "15% 익절 (잔량 전량)",
                "targetYield": "+4.0%",
                "targetPrice": "1,085,760원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.8% 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "1,025,208원"
              }
            ],
            "rr": "1 : 1.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1033560,
              "high": 1044000,
              "anchor": 1044000,
              "label": "1,033,560~1,044,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.6667,
              "ev": 2.0001,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음",
            "statusReason": "G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음"
          },
          {
            "rank": 2,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 4.8,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -224,051→-57,044 / 기관 34,539→99,296 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 104.0% / 마지막 1시간 230.8% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,630,000 / 20MA 1,034,950 (157.5% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 32% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 128% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.63 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1757000, 전봉 종가 1774000 미달"
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
                "note": "당일 거래대금 순위 5위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 131.2조 (필요 ≥ 5조)",
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
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-05-22) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +110.6% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -6.0% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,630,000 / 60MA 679,508",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +3.7% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
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
                "code": "S2",
                "note": "당일 평균 104.0% / 마지막 1시간 230.8% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,630,000 / 20MA 1,034,950 (157.5% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.63 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -224,051→-57,044 / 기관 34,539→99,296 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 32% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 128% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1757000, 전봉 종가 1774000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1630000,
            "previousClose": 1572000,
            "dailyChange": 58000,
            "dailyChangePct": 3.69,
            "dailyDirection": "up",
            "entryPriceText": "1,630,000원 (당일 종가 기준)",
            "entryPrice": 1630000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 131.2368,
            "keyPoint": "20일 고점 대비 -6.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 삼성전기 (009150) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 1757000, 전봉 종가 1774000",
              "latestOpen": 1757000.0,
              "latestClose": 1757000.0,
              "previousClose": 1774000.0
            },
            "toss": {
              "avgStrength": 104.0,
              "note": "토스 공개 체결강도 104.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 76.9,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 230.8,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 225.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 4.1333,
              "last30BuyVolume": 62.0,
              "last30SellVolume": 15.0
            },
            "orderbook": {
              "bidAskRatio": 1.6289,
              "bidTotal": 7366,
              "askTotal": 4522,
              "note": "Naver 호가잔량합계 매수 7,366 / 매도 4,522",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=009150"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 12.75%, 일간 표준편차 5.69%, 당일 레인지 9.80%.",
              "metrics": {
                "atrPct10": 12.75,
                "returnStd20": 5.69,
                "todayRangePct": 9.8,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.8% 도달",
                "quantity": "55% 익절",
                "targetYield": "+1.8%",
                "targetPrice": "1,659,340원",
                "historicalHitRate": 0.7333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,678,900원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.0% 도달",
                "quantity": "15% 익절 (잔량 전량)",
                "targetYield": "+4.0%",
                "targetPrice": "1,695,200원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.8% 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "1,600,660원"
              }
            ],
            "rr": "1 : 1.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1613700,
              "high": 1630000,
              "anchor": 1630000,
              "label": "1,613,700~1,630,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.6667,
              "ev": 2.0001,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G4",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 최근 5거래일 최저 +3.7% (필요 -3% 이하 급락 1회 이상) · 외 1건",
            "statusReason": "G4 미충족: 최근 5거래일 최저 +3.7% (필요 -3% 이하 급락 1회 이상) / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음"
          },
          {
            "rank": 3,
            "name": "LG전자",
            "code": "066570",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 4.8,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -1,037,762→-1,042,446 / 기관 -271,969→-18,198 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 95.0% / 마지막 1시간 267.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 235,000 / 20MA 183,715 (127.9% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 32% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 67% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 9.25 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 303000, 전봉 종가 307500 미달"
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
                "status": "✅",
                "note": "최근 5거래일(2026-05-17~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +80.9% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.8% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 235,000 / 60MA 139,532",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.6% (필요 -3% 이하 급락 1회 이상)",
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
                "code": "S2",
                "note": "당일 평균 95.0% / 마지막 1시간 267.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 235,000 / 20MA 183,715 (127.9% · 필요 ≥ 98%) · 20MA 근접 회복",
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
                "code": "P2",
                "note": "당일 레인지 상단 32% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 67% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 303000, 전봉 종가 307500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 235000,
            "previousClose": 239500,
            "dailyChange": -4500,
            "dailyChangePct": -1.88,
            "dailyDirection": "down",
            "entryPriceText": "235,000원 (당일 종가 기준)",
            "entryPrice": 235000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 49.354,
            "keyPoint": "20일 고점 대비 -11.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "latestOpen": 303000.0,
              "latestClose": 303000.0,
              "previousClose": 307500.0
            },
            "toss": {
              "avgStrength": 95.0,
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
              "last30BuyVolume": 224.0,
              "last30SellVolume": 1038.0
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
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 13.00%, 일간 표준편차 9.31%, 당일 레인지 6.47%.",
              "metrics": {
                "atrPct10": 13.0,
                "returnStd20": 9.31,
                "todayRangePct": 6.47,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.8% 도달",
                "quantity": "55% 익절",
                "targetYield": "+1.8%",
                "targetPrice": "239,230원",
                "historicalHitRate": 0.7333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "242,050원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.0% 도달",
                "quantity": "15% 익절 (잔량 전량)",
                "targetYield": "+4.0%",
                "targetPrice": "244,400원",
                "historicalHitRate": 0.3778,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.8% 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "230,770원"
              }
            ],
            "rr": "1 : 1.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 232650,
              "high": 235000,
              "anchor": 235000,
              "label": "232,650~235,000원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:hitRateXTarget",
              "reason": "EV=적중률×목표 argmax (과거 45건)",
              "hitRate": 0.6667,
              "ev": 2.0001,
              "sampleCount": 45
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음",
            "statusReason": "G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음"
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
  "analysisDate": "2026-05-27"
};
