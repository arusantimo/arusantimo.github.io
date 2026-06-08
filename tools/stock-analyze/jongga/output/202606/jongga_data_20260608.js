window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-08"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-08T06:02:45+00:00",
  "variant": "stable",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 18,
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
        "ok": 18
      },
      "naver_chart": {
        "ok": 18
      },
      "naver_integration_schedule": {
        "ok": 1
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 18
      },
      "toss_http_strength": {
        "ok": 18
      },
      "toss_ticks_strength_proxy": {
        "ok": 18
      },
      "toss_quotes_orderbook": {
        "ok": 17
      },
      "kind_playwright_disclosure": {
        "ok": 1
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
        "durationMs": 1209.9,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 218.9,
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
        "durationMs": 2190.3,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 20.9,
        "detail": "순환매장 🔄 (거시·지수 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 56577.2,
        "count": 18
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 6339.8,
        "detail": "성공 18 / 실패 0",
        "count": 18
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 9934.6,
        "detail": "direct-http · 체결강도 18 / 호가 17 / 틱프록시 18",
        "count": 18
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 34.8,
        "detail": "pullback 2, breakout 2, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 24817.6,
        "detail": "playwright-chromium · KIND 1",
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
            "value": "순환매장 🔄 (거시·지수 완충)"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "7503.13 (-8.06%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 75.72"
          },
          {
            "item": "진입 전략",
            "value": "메인=주도주돌파형 / 서브=눌림목 / 보조=수급매집형"
          },
          {
            "item": "추천 슬롯",
            "value": "매집 3 · 돌파 2 · 눌림 2"
          },
          {
            "item": "스윙 전환 활성도",
            "value": "제한"
          },
          {
            "item": "시가베팅",
            "value": "활성"
          },
          {
            "item": "역추세 트랙",
            "value": "제한 활성"
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
            "value": "6618.47",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7938.63",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 75.72",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 12 / 하락 8",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 89 · 버블 critical off · KOSPI 60MA 상향 · 펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향",
            "verdict": "순환매장 🔄 (거시·지수 완충)"
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
          "marketAnalyzeDate": "20260608",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "순환매장 🔄 (거시·지수 완충)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60MA 상향 · 펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향",
          "riseJustified": true,
          "kospiBullTier": "maintain",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.18,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "Bull Trap 10/20으로 하락 1단계(안도·자만)로 오버라이드했습니다.",
          "kospiClose": 7503.13,
          "kospiMa5": 8378.6,
          "vkospiValue": 75.72,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": true
        },
        "technicalRegimeLabel": "박스권 ⚠️",
        "effectiveRegimeLabel": "순환매장 🔄 (거시·지수 완충)",
        "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60MA 상향 · 펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-5.33%",
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
            "actualValue": "+30.01원",
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
                "note": "당일 거래대금 순위 5위 (TOP 30 이내 시 충족)"
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
                "note": "저가 238,500 · 이평선 터치: 5MA, 10MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 284,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 239,500 ≤ 종가 284,000)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 127% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -5.68% / KOSPI -8.06% outperform"
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
                "note": "최근 20일 최대 거래량 급증 542% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 271,800 > 20MA 221,870 > 60MA 214,932 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 284,000 / 60MA 214,932",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 63.9 (필요 ≥ 50)",
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
                "note": "KOSPI 7,503 / 5MA 8,379 (-10.4%) · VKOSPI 75.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +11.15% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 63.9 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +28.0% (필요 ≤ +25%) · 60MA +32.1% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
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
                "note": "당일 거래대금 순위 5위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -147,900주 / 기관 135,906주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 238,500 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 284,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 239,500 ≤ 종가 284,000)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.68% / KOSPI -8.06% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 127% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 284000,
            "previousClose": 255500,
            "dailyChange": 28500,
            "dailyChangePct": 11.15,
            "dailyDirection": "up",
            "entryPriceText": "284,000원 (당일 종가 기준)",
            "entryPrice": 284000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 44.5522,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -147,900주 / 기관 135,906주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 212,192원 (25.28% 아래) · 강도 85점 · family 4개 · 급증봉 저점·수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 212192,
                    "distancePct": 25.28,
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
                    "count": 33,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 196097,
                    "distancePct": 30.95,
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
                    "count": 17,
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 271421,
                    "distancePct": 4.43,
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
                    "price": 207528,
                    "distancePct": 26.93,
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
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 202068,
                    "distancePct": 28.85,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 23,
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 212192,
                  "distancePct": 25.28,
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
                  "count": 33,
                  "lastSeenDaysAgo": 5,
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
                    "price": 196890,
                    "distancePct": 30.67,
                    "count": 13,
                    "lastSeenDaysAgo": 6,
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
                    "distancePct": 29.03,
                    "count": 13,
                    "lastSeenDaysAgo": 8,
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
                    "price": 207806,
                    "distancePct": 26.83,
                    "count": 13,
                    "lastSeenDaysAgo": 6,
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
                    "price": 213552,
                    "distancePct": 24.81,
                    "count": 21,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
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
                    "price": 220219,
                    "distancePct": 22.46,
                    "count": 11,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
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
                    "distancePct": 20.72,
                    "count": 2,
                    "lastSeenDaysAgo": 54,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 224000,
                    "bandHigh": 226500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 244500,
                    "distancePct": 13.91,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 244000,
                    "bandHigh": 245000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 255250,
                    "distancePct": 10.12,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 255000,
                    "bandHigh": 255500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 269500,
                    "distancePct": 5.11,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 267500,
                    "bandHigh": 271500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 282250,
                    "distancePct": 0.62,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 280500,
                    "bandHigh": 284000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 195600,
                    "distancePct": 31.13,
                    "count": 3,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 194200,
                    "bandHigh": 196800
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 207250,
                    "distancePct": 27.02,
                    "count": 2,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 206000,
                    "bandHigh": 208500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 216000,
                    "distancePct": 23.94,
                    "count": 2,
                    "lastSeenDaysAgo": 56,
                    "valid": true,
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
                    "price": 273342,
                    "distancePct": 3.75,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 25,
                    "volume": 33369915,
                    "binIndex": 17,
                    "binLow": 270983,
                    "binHigh": 275700
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 202592,
                    "distancePct": 28.66,
                    "count": 10,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "volume": 9677398,
                    "binIndex": 2,
                    "binLow": 200233,
                    "binHigh": 204950
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 212025,
                    "distancePct": 25.34,
                    "count": 11,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 25,
                    "volume": 8718090,
                    "binIndex": 4,
                    "binLow": 209667,
                    "binHigh": 214383
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 195800,
                    "distancePct": 31.06,
                    "count": 1,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 210.8,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 211000,
                    "distancePct": 25.7,
                    "count": 1,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 746.0,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 238500,
                    "distancePct": 16.02,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 357.9,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 244250,
                    "distancePct": 14.0,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 1070.4,
                    "anchorCount": 2
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 542% (4일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 541.5,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 75.72, ATR10 11.61%, 일간 표준편차 5.93%, 당일 레인지 21.72%.",
              "metrics": {
                "atrPct10": 11.61,
                "returnStd20": 5.93,
                "todayRangePct": 21.72,
                "vkospi": 75.72
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
                "condition": "+1.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "288,260원",
                "historicalHitRate": 0.6265,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "condition": "+2.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "291,100원",
                "historicalHitRate": 0.494,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "293,940원",
                "historicalHitRate": 0.3494,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.0% 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "278,320원"
              }
            ],
            "rr": "1 : 1.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 280308,
              "high": 283148,
              "anchor": 284000,
              "label": "280,308~283,148원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 83건)",
              "hitRate": 0.6265,
              "ev": 4.178,
              "sampleCount": 83
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G8 미충족: 이격 20MA +28.0% (필요 ≤ +25%) · 60MA +32.1% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
            "statusReason": "G8 미충족: 이격 20MA +28.0% (필요 ≤ +25%) · 60MA +32.1% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          },
          {
            "rank": 2,
            "name": "삼성전기",
            "code": "009150",
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
                "note": "당일 거래대금 순위 7위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -57,044주 / 기관 99,296주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 1,552,000 · 이평선 터치: 5MA, 10MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,673,000 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 1,556,000 ≤ 종가 1,673,000)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 59% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -8.16% / KOSPI -8.06% underperform"
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
                "note": "최근 20일 최대 거래량 급증 199% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,792,800 > 20MA 1,380,000 > 60MA 848,342 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,673,000 / 60MA 848,342",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 75.6 (필요 ≥ 50)",
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
                "note": "KOSPI 7,503 / 5MA 8,379 (-10.4%) · VKOSPI 75.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -4.78% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 75.6 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +21.2% (필요 ≤ +25%) · 60MA +97.2% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
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
                "note": "당일 거래대금 순위 7위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -57,044주 / 기관 99,296주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,552,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,673,000 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,556,000 ≤ 종가 1,673,000)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 59% (필요 ≤ 80%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C3",
                "note": "동종업종 평균 -8.16% / KOSPI -8.06% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1673000,
            "previousClose": 1757000,
            "dailyChange": -84000,
            "dailyChangePct": -4.78,
            "dailyDirection": "down",
            "entryPriceText": "1,673,000원 (당일 종가 기준)",
            "entryPrice": 1673000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 124.9626,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -57,044주 / 기관 99,296주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,026,166원 (38.66% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1026166,
                    "distancePct": 38.66,
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
                    "lastSeenDaysAgo": 11,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 421284,
                    "distancePct": 74.82,
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
                    "lastSeenDaysAgo": 42,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1559250,
                    "distancePct": 6.8,
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
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 921428,
                    "distancePct": 44.92,
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
                    "lastSeenDaysAgo": 11,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 896550,
                    "distancePct": 46.41,
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
                    "lastSeenDaysAgo": 17,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1026166,
                  "distancePct": 38.66,
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
                  "lastSeenDaysAgo": 11,
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
                    "price": 399571,
                    "distancePct": 76.12,
                    "count": 6,
                    "lastSeenDaysAgo": 45,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 396500,
                    "bandHigh": 402000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 409125,
                    "distancePct": 75.55,
                    "count": 4,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 406000,
                    "bandHigh": 413000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 420900,
                    "distancePct": 74.84,
                    "count": 5,
                    "lastSeenDaysAgo": 43,
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
                    "distancePct": 74.2,
                    "count": 6,
                    "lastSeenDaysAgo": 42,
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
                    "distancePct": 73.1,
                    "count": 10,
                    "lastSeenDaysAgo": 40,
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
                    "distancePct": 72.45,
                    "count": 5,
                    "lastSeenDaysAgo": 40,
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
                    "distancePct": 69.22,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
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
                    "distancePct": 66.14,
                    "count": 2,
                    "lastSeenDaysAgo": 36,
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
                    "distancePct": 63.34,
                    "count": 2,
                    "lastSeenDaysAgo": 33,
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
                    "distancePct": 61.72,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
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
                    "distancePct": 59.44,
                    "count": 3,
                    "lastSeenDaysAgo": 30,
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
                    "distancePct": 53.86,
                    "count": 5,
                    "lastSeenDaysAgo": 26,
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
                    "distancePct": 52.5,
                    "count": 3,
                    "lastSeenDaysAgo": 25,
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
                    "distancePct": 51.42,
                    "count": 3,
                    "lastSeenDaysAgo": 23,
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
                    "distancePct": 50.23,
                    "count": 3,
                    "lastSeenDaysAgo": 23,
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
                    "distancePct": 48.8,
                    "count": 2,
                    "lastSeenDaysAgo": 18,
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
                    "distancePct": 46.56,
                    "count": 5,
                    "lastSeenDaysAgo": 17,
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
                    "distancePct": 45.08,
                    "count": 7,
                    "lastSeenDaysAgo": 11,
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
                    "distancePct": 42.77,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
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
                    "distancePct": 41.21,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
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
                    "distancePct": 39.93,
                    "count": 2,
                    "lastSeenDaysAgo": 14,
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
                    "distancePct": 38.55,
                    "count": 3,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": 28.03,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
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
                    "price": 1564500,
                    "distancePct": 6.49,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1552000,
                    "bandHigh": 1580000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1622500,
                    "distancePct": 3.02,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1615000,
                    "bandHigh": 1630000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1666000,
                    "distancePct": 0.42,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1659000,
                    "bandHigh": 1673000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 421667,
                    "distancePct": 74.8,
                    "count": 15,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 25,
                    "volume": 9431797,
                    "binIndex": 0,
                    "binLow": 384000,
                    "binHigh": 459333
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1024333,
                    "distancePct": 38.77,
                    "count": 6,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 25,
                    "volume": 7069000,
                    "binIndex": 8,
                    "binLow": 986667,
                    "binHigh": 1062000
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1777667,
                    "distancePct": -6.26,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 25,
                    "volume": 5887893,
                    "binIndex": 18,
                    "binLow": 1740000,
                    "binHigh": 1815333
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 899000,
                    "distancePct": 46.26,
                    "count": 1,
                    "lastSeenDaysAgo": 17,
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
                    "distancePct": 44.77,
                    "count": 1,
                    "lastSeenDaysAgo": 11,
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
                    "distancePct": 7.11,
                    "count": 1,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 222.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 199% (5일 전)",
                "burstCount": 0,
                "maxRatioPct": 198.5,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 75.72, ATR10 13.20%, 일간 표준편차 7.64%, 당일 레인지 10.81%.",
              "metrics": {
                "atrPct10": 13.2,
                "returnStd20": 7.64,
                "todayRangePct": 10.81,
                "vkospi": 75.72
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
                "condition": "+1.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "1,698,095원",
                "historicalHitRate": 0.6265,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "condition": "+2.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,714,825원",
                "historicalHitRate": 0.494,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "1,731,555원",
                "historicalHitRate": 0.3494,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.0% 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,639,540원"
              }
            ],
            "rr": "1 : 1.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1651251,
              "high": 1667981,
              "anchor": 1673000,
              "label": "1,651,251~1,667,981원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 83건)",
              "hitRate": 0.6265,
              "ev": 4.178,
              "sampleCount": 83
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G0",
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G0, G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 199% (필요 ≥ 200%) · 외 1건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 199% (필요 ≥ 200%) / G8 미충족: 이격 20MA +21.2% (필요 ≤ +25%) · 60MA +97.2% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "NAVER",
            "code": "035420",
            "strictScore": 3.7,
            "signalScore": 4.2,
            "score": 4.2,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 3.2,
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -147,900주 / 기관 135,906주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 127.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.75,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 93.4% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 358% · 폭발적 급증 (≥300%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 96.6% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 80% / 윗꼬리·몸통 0.22 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.65 (필요 ≥ 1.2) · 매수 잔량 우위"
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
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +32.8% / 20일 초과 +36.7%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 92.5% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 5",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 358% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 80% / 윗꼬리·몸통 0.22 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +11.15% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 284,000 / 5MA 271,800 (전일 5MA 261,800) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 127.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 358% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.6% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.65 (필요 ≥ 1.2) · 매수 잔량 우위",
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
                "code": "S1",
                "note": "외인 -147,900주 / 기관 135,906주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 93.4% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 80% / 윗꼬리·몸통 0.22 · 강마감 기준 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 284000,
            "previousClose": 255500,
            "dailyChange": 28500,
            "dailyChangePct": 11.15,
            "dailyDirection": "up",
            "entryPriceText": "284,000원 (당일 종가 기준)",
            "entryPrice": 284000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 44.5522,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -147,900주 / 기관 135,906주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 127.0,
              "note": "토스 공개 체결강도 127.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-08T06:02:11Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 278.9,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 278.9,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 5.0979,
              "last30BuyVolume": 989.0,
              "last30SellVolume": 194.0
            },
            "orderbook": {
              "bidAskRatio": 1.6537,
              "bidTotal": 59379,
              "askTotal": 35907,
              "note": "Naver 호가잔량합계 매수 59,379 / 매도 35,907",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=035420"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 75.72, ATR10 11.61%, 일간 표준편차 5.93%, 당일 레인지 21.72%.",
              "metrics": {
                "atrPct10": 11.61,
                "returnStd20": 5.93,
                "todayRangePct": 21.72,
                "vkospi": 75.72
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
                "condition": "+2.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "289,680원",
                "historicalHitRate": 0.6667,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "295,360원",
                "historicalHitRate": 0.4921,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+6.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "301,040원",
                "historicalHitRate": 0.3492,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "306,720원",
                "historicalHitRate": 0.3175,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "274,060원"
              }
            ],
            "rr": "1 : 1.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 280308,
              "high": 283148,
              "anchor": 284000,
              "label": "280,308~283,148원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 63건)",
              "hitRate": 0.3175,
              "ev": 3.858,
              "sampleCount": 63
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.33%, 원달러 +30.01원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.33%, 원달러 +30.01원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "SK네트웍스",
            "code": "001740",
            "strictScore": 3.6,
            "signalScore": 3.6,
            "score": 3.6,
            "scoreMax": 11.5,
            "effectiveScoreMax": 8.5,
            "gradeScore": 4.2,
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
                "note": "외인 182,817주 / 기관 -224,706주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 체결강도 82.7% · 100% 유지 비율 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 100.0% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 258% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 100.0% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 100% / 윗꼬리·몸통 0.00 · 완벽한 강마감"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "manual_required",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)"
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
                "note": "5일 초과 +37.1% / 20일 초과 +109.4%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 100.0% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 23",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 258% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 100% / 윗꼬리·몸통 0.00 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "⛔",
                "note": "당일 등락 +30.00% (필요 ≤ +12%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 14,170 / 5MA 12,560 (전일 5MA 11,982) · 5MA 위·우상향",
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
                "note": "20일 고점 대비 100.0% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 100.0% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 100% / 윗꼬리·몸통 0.00 · 완벽한 강마감",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 182,817주 / 기관 -224,706주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 체결강도 82.7% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 258% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              }
            ],
            "currentPrice": 14170,
            "previousClose": 10900,
            "dailyChange": 3270,
            "dailyChangePct": 30.0,
            "dailyDirection": "up",
            "entryPriceText": "14,170원 (당일 종가 기준)",
            "entryPrice": 14170,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.8424,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 182,817주 / 기관 -224,706주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [
              "호가잔량 미반영"
            ],
            "toss": {
              "avgStrength": 82.7,
              "note": "토스 공개 체결강도 82.7% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001740/order",
              "asOf": "2026-06-08T06:02:10Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 0.0,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 0.0,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 0.0,
              "last30BuyVolume": 0.0,
              "last30SellVolume": 9859.0
            },
            "orderbook": {},
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 75.72, ATR10 17.39%, 일간 표준편차 12.18%, 당일 레인지 42.84%.",
              "metrics": {
                "atrPct10": 17.39,
                "returnStd20": 12.18,
                "todayRangePct": 42.84,
                "vkospi": 75.72
              },
              "strategyLabel": "주도주돌파형"
            },
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001740/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK네트웍스 (001740) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.25"
                  ]
                }
              ],
              "missingFieldCodes": [
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "14,453원",
                "historicalHitRate": 0.6667,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "14,737원",
                "historicalHitRate": 0.4921,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+6.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "15,020원",
                "historicalHitRate": 0.3492,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "15,304원",
                "historicalHitRate": 0.3175,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "13,674원"
              }
            ],
            "rr": "1 : 1.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 13986,
              "high": 14127,
              "anchor": 14170,
              "label": "13,986~14,127원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 63건)",
              "hitRate": 0.3175,
              "ev": 3.858,
              "sampleCount": 63
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G6",
              "매매금지(핵심 Gate 미충족: G6)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G6 미충족: 당일 등락 +30.00% (필요 ≤ +12%)",
            "statusReason": "G6 미충족: 당일 등락 +30.00% (필요 ≤ +12%)"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 6.0,
            "signalScore": 6.0,
            "score": 6.0,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 5.0,
            "grade": "C",
            "scoreBreakdown": [
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
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -40,670 / 전일 +252,062 · 기관 당일 +49,115 / 전일 +11,672 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 170.7% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 85.6% / 마지막 1시간 170.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 98.4% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 205,800 / 20MA 189,110 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 45% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -11.38% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -7.19% / KOSPI -8.06% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.71:1 · 평균 체결강도 170.7% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 +252,062/당일 -40,670 · 기관 전일 +11,672/당일 +49,115 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 186,100 / 60MA 118,427",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 73.0% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 36",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 52% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,503 / 5MA 8,379 (-10.4%) · VKOSPI 75.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 170.7% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 85.6% / 마지막 1시간 170.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 98.4% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 205,800 / 20MA 189,110 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 45% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -7.19% / KOSPI -8.06% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.71:1 · 평균 체결강도 170.7% (필요 ≥ 1.1:1) · 장마감 매수 우위",
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
                "note": "외인 당일 -40,670 / 전일 +252,062 · 기관 당일 +49,115 / 전일 +11,672 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -11.38% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 186100,
            "previousClose": 210000,
            "dailyChange": -23900,
            "dailyChangePct": -11.38,
            "dailyDirection": "down",
            "entryPriceText": "186,100원 (당일 종가 기준)",
            "entryPrice": 186100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.6501,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -40,670주 / 기관 49,115주 / 마지막 1시간 170.7% · 장후반 매수세 강화 · 마지막 30분 틱 1.71:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 85.6,
              "note": "토스 공개 체결강도 85.6% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-06-08T05:36:50Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 170.7,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 170.7,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 1.7074,
              "last30BuyVolume": 1021.0,
              "last30SellVolume": 598.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 75.72, ATR10 16.51%, 일간 표준편차 12.81%, 당일 레인지 10.90%.",
              "metrics": {
                "atrPct10": 16.51,
                "returnStd20": 12.81,
                "todayRangePct": 10.9,
                "vkospi": 75.72
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
                "condition": "+1.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "188,891원",
                "historicalHitRate": 0.5385,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "191,683원",
                "historicalHitRate": 0.3462,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "194,474원",
                "historicalHitRate": 0.1923,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "197,266원",
                "historicalHitRate": 0.1154,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "181,448원"
              }
            ],
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 183681,
              "high": 185542,
              "anchor": 186100,
              "label": "183,681~185,542원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 52건)",
              "hitRate": 0.1154,
              "ev": -0.434,
              "sampleCount": 52
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.33%, 원달러 +30.01원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.33%, 원달러 +30.01원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "두산로보틱스",
            "code": "454910",
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
                "note": "외인 1,619,826주 / 기관 -1,526,675주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 +1,619,826 / 전일 -90,931 · 기관 당일 -1,526,675 / 전일 -18,623 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 232.5% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 85.0% / 마지막 1시간 232.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 110.5% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 146,300 / 20MA 115,970 · 5MA > 20MA"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -8.62% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -7.38% / KOSPI -8.06% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.33:1 · 평균 체결강도 232.5% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -90,931/당일 +1,619,826 · 기관 전일 -18,623/당일 -1,526,675 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 128,200 / 60MA 99,347",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 72.8% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 29",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 116% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,503 / 5MA 8,379 (-10.4%) · VKOSPI 75.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 232.5% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 85.0% / 마지막 1시간 232.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 146,300 / 20MA 115,970 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -7.38% / KOSPI -8.06% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.33:1 · 평균 체결강도 232.5% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 1,619,826주 / 기관 -1,526,675주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +1,619,826 / 전일 -90,931 · 기관 당일 -1,526,675 / 전일 -18,623 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 110.5% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -8.62% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 128200,
            "previousClose": 140300,
            "dailyChange": -12100,
            "dailyChangePct": -8.62,
            "dailyDirection": "down",
            "entryPriceText": "128,200원 (당일 종가 기준)",
            "entryPrice": 128200,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.3099,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 1,619,826주 / 기관 -1,526,675주 / 마지막 1시간 232.5% · 장후반 매수세 강화 · 마지막 30분 틱 2.33:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 85.0,
              "note": "토스 공개 체결강도 85.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A454910/order",
              "asOf": "2026-06-08T06:02:14Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 232.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 232.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.3345,
              "last30BuyVolume": 1347.0,
              "last30SellVolume": 577.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 75.72, ATR10 13.30%, 일간 표준편차 10.98%, 당일 레인지 19.24%.",
              "metrics": {
                "atrPct10": 13.3,
                "returnStd20": 10.98,
                "todayRangePct": 19.24,
                "vkospi": 75.72
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
                "condition": "+1.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "130,123원",
                "historicalHitRate": 0.5385,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "132,046원",
                "historicalHitRate": 0.3462,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "133,969원",
                "historicalHitRate": 0.1923,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "135,892원",
                "historicalHitRate": 0.1154,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "124,995원"
              }
            ],
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 126533,
              "high": 127815,
              "anchor": 128200,
              "label": "126,533~127,815원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 52건)",
              "hitRate": 0.1154,
              "ev": -0.434,
              "sampleCount": 52
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.33%, 원달러 +30.01원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.33%, 원달러 +30.01원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 3,
            "name": "SK텔레콤",
            "code": "017670",
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
                "note": "외인 -157,611주 / 기관 37,521주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -157,611 / 전일 -776,807 · 기관 당일 +37,521 / 전일 +57,188 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 111.3% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 92.0% / 마지막 1시간 111.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 104.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 112,060 / 20MA 103,355 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 112% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +1.13% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -0.73% / KOSPI -8.06% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.13:1 · 평균 체결강도 111.3% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -776,807/당일 -157,611 · 기관 전일 +57,188/당일 +37,521 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 107,600 / 60MA 92,643",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 76.7% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 30",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 227% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,503 / 5MA 8,379 (-10.4%) · VKOSPI 75.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 111.3% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 92.0% / 마지막 1시간 111.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 112,060 / 20MA 103,355 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +1.13% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -0.73% / KOSPI -8.06% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.13:1 · 평균 체결강도 111.3% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -157,611주 / 기관 37,521주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -157,611 / 전일 -776,807 · 기관 당일 +37,521 / 전일 +57,188 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 104.1% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 112% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 107600,
            "previousClose": 106400,
            "dailyChange": 1200,
            "dailyChangePct": 1.13,
            "dailyDirection": "up",
            "entryPriceText": "107,600원 (당일 종가 기준)",
            "entryPrice": 107600,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 23.1114,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -157,611주 / 기관 37,521주 / 마지막 1시간 111.3% · 장후반 매수세 강화 · 마지막 30분 틱 1.13:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 92.0,
              "note": "토스 공개 체결강도 92.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A017670/order",
              "asOf": "2026-06-08T06:02:14Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 111.3,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 111.3,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.1297,
              "last30BuyVolume": 993.0,
              "last30SellVolume": 879.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 75.72, ATR10 10.33%, 일간 표준편차 5.29%, 당일 레인지 11.94%.",
              "metrics": {
                "atrPct10": 10.33,
                "returnStd20": 5.29,
                "todayRangePct": 11.94,
                "vkospi": 75.72
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
                "condition": "+1.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "109,214원",
                "historicalHitRate": 0.5385,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "110,828원",
                "historicalHitRate": 0.3462,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "112,442원",
                "historicalHitRate": 0.1923,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "114,056원",
                "historicalHitRate": 0.1154,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "104,910원"
              }
            ],
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 106201,
              "high": 107277,
              "anchor": 107600,
              "label": "106,201~107,277원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 52건)",
              "hitRate": 0.1154,
              "ev": -0.434,
              "sampleCount": 52
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 227% (필요 < 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 227% (필요 < 150%)"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "NAVER",
            "code": "035420",
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -480,144→-147,900 / 기관 119,070→135,906 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 127.0% / 마지막 1시간 278.9% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 284,000 / 20MA 221,870 (128.0% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 82% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 127% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.65 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 282500, 전봉 종가 285500 미달"
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
                "note": "시총 44.6조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-06-01 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "⛔",
                "note": "최근 손절 이력 1건 (최근: 2026-06-02) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +36.5% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -6.6% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 284,000 / 60MA 214,932",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.6% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "당일 평균 127.0% / 마지막 1시간 278.9% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 284,000 / 20MA 221,870 (128.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 82% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.65 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -480,144→-147,900 / 기관 119,070→135,906 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 127% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 282500, 전봉 종가 285500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 284000,
            "previousClose": 255500,
            "dailyChange": 28500,
            "dailyChangePct": 11.15,
            "dailyDirection": "up",
            "entryPriceText": "284,000원 (당일 종가 기준)",
            "entryPrice": 284000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 44.5522,
            "keyPoint": "20일 고점 대비 -6.6% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-06-01 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 282500, 전봉 종가 285500",
              "latestOpen": 286000.0,
              "latestClose": 282500.0,
              "previousClose": 285500.0
            },
            "toss": {
              "avgStrength": 127.0,
              "note": "토스 공개 체결강도 127.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-08T06:02:11Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 278.9,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 278.9,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 5.0979,
              "last30BuyVolume": 989.0,
              "last30SellVolume": 194.0
            },
            "orderbook": {
              "bidAskRatio": 1.6537,
              "bidTotal": 59379,
              "askTotal": 35907,
              "note": "Naver 호가잔량합계 매수 59,379 / 매도 35,907",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=035420"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 75.72, ATR10 11.61%, 일간 표준편차 5.93%, 당일 레인지 21.72%.",
              "metrics": {
                "atrPct10": 11.61,
                "returnStd20": 5.93,
                "todayRangePct": 21.72,
                "vkospi": 75.72
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.5% 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "288,260원",
                "historicalHitRate": 0.6905,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "condition": "+2.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "291,100원",
                "historicalHitRate": 0.631,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "15% 익절 (잔량 전량)",
                "targetYield": "+3.0%",
                "targetPrice": "292,520원",
                "historicalHitRate": 0.4286,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.5% 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "279,740원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 280308,
              "high": 283148,
              "anchor": 284000,
              "label": "280,308~283,148원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 84건)",
              "hitRate": 0.6905,
              "ev": 1.591,
              "sampleCount": 84
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-06-02) · 재진입 차단",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-06-02) · 재진입 차단"
          },
          {
            "rank": 2,
            "name": "SK네트웍스",
            "code": "001740",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 7.0,
            "gradeScore": 8.7,
            "grade": "S",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -181,374→182,817 / 기관 -410,890→-224,706 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 82.7% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 14,170 / 20MA 9,564 (148.2% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 545% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "manual_required",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 14170, 전봉 종가 14170 미달"
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
                "note": "당일 거래대금 순위 23위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 2.8조 (필요 ≥ 5조)",
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
                "note": "최근 5거래일(2026-05-29~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +112.1% (필요 ≥ +15%)",
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
                "note": "종가 14,170 / 60MA 6,853",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -16.2% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "외인 -181,374→182,817 / 기관 -410,890→-224,706 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 14,170 / 20MA 9,564 (148.2% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 100% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 545% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 82.7% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C2",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 14170, 전봉 종가 14170 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 14170,
            "previousClose": 10900,
            "dailyChange": 3270,
            "dailyChangePct": 30.0,
            "dailyDirection": "up",
            "entryPriceText": "14,170원 (당일 종가 기준)",
            "entryPrice": 14170,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.8424,
            "keyPoint": "20일 고점 대비 0.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "호가잔량 미반영",
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001740/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK네트웍스 (001740) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08"
                  ]
                },
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 SK네트웍스 (001740) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "orderbook.bidAskRatio",
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
              "note": "직전 30분봉 종가 14170, 전봉 종가 14170",
              "latestOpen": 14170.0,
              "latestClose": 14170.0,
              "previousClose": 14170.0
            },
            "toss": {
              "avgStrength": 82.7,
              "note": "토스 공개 체결강도 82.7% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001740/order",
              "asOf": "2026-06-08T06:02:10Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 0.0,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 0.0,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 0.0,
              "last30BuyVolume": 0.0,
              "last30SellVolume": 9859.0
            },
            "orderbook": {},
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 75.72, ATR10 17.39%, 일간 표준편차 12.18%, 당일 레인지 42.84%.",
              "metrics": {
                "atrPct10": 17.39,
                "returnStd20": 12.18,
                "todayRangePct": 42.84,
                "vkospi": 75.72
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.5% 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "14,383원",
                "historicalHitRate": 0.6905,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "condition": "+2.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "14,524원",
                "historicalHitRate": 0.631,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "15% 익절 (잔량 전량)",
                "targetYield": "+3.0%",
                "targetPrice": "14,595원",
                "historicalHitRate": 0.4286,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.5% 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "13,957원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 13986,
              "high": 14127,
              "anchor": 14170,
              "label": "13,986~14,127원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 84건)",
              "hitRate": 0.6905,
              "ev": 1.591,
              "sampleCount": 84
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F2",
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 2.8조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 2.8조 (필요 ≥ 5조) / G2 미충족: 20일 고점 대비 +0.0% (필요 -5%~-25%)"
          },
          {
            "rank": 3,
            "name": "LG이노텍",
            "code": "011070",
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
                "note": "외인 27,792→-60,220 / 기관 12,069→35,180 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 94.0% / 마지막 1시간 168.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,105,000 / 20MA 959,600 (115.2% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 61% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 43% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.60 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1102000, 전봉 종가 1119000 미달"
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
                "note": "당일 거래대금 순위 27위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 26.2조 (필요 ≥ 5조)",
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
                "note": "최근 진입 이력 4건 · 손절 없음 (최근: 2026-06-04) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +74.8% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -38.2% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,105,000 / 60MA 576,158",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -18.2% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "당일 평균 94.0% / 마지막 1시간 168.2% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,105,000 / 20MA 959,600 (115.2% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 61% (필요 ≥ 50%)",
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
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 43% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.60 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1102000, 전봉 종가 1119000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1105000,
            "previousClose": 1160000,
            "dailyChange": -55000,
            "dailyChangePct": -4.74,
            "dailyDirection": "down",
            "entryPriceText": "1,105,000원 (당일 종가 기준)",
            "entryPrice": 1105000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 26.1522,
            "keyPoint": "20일 고점 대비 -38.2% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "직전 30분봉 종가 1102000, 전봉 종가 1119000",
              "latestOpen": 1119000.0,
              "latestClose": 1102000.0,
              "previousClose": 1119000.0
            },
            "toss": {
              "avgStrength": 94.0,
              "note": "토스 공개 체결강도 94.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-08T06:02:14Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 168.2,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 168.2,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5087,
              "last30BuyVolume": 433.0,
              "last30SellVolume": 287.0
            },
            "orderbook": {
              "bidAskRatio": 0.5972,
              "bidTotal": 381,
              "askTotal": 638,
              "note": "Naver 호가잔량합계 매수 381 / 매도 638",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 75.72, ATR10 18.75%, 일간 표준편차 10.04%, 당일 레인지 18.28%.",
              "metrics": {
                "atrPct10": 18.75,
                "returnStd20": 10.04,
                "todayRangePct": 18.28,
                "vkospi": 75.72
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.5% 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "1,121,575원",
                "historicalHitRate": 0.6905,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "condition": "+2.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,132,625원",
                "historicalHitRate": 0.631,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "15% 익절 (잔량 전량)",
                "targetYield": "+3.0%",
                "targetPrice": "1,138,150원",
                "historicalHitRate": 0.4286,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.5% 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "1,088,425원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1090635,
              "high": 1101685,
              "anchor": 1105000,
              "label": "1,090,635~1,101,685원 (종가 ±, 분할매수)"
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 84건)",
              "hitRate": 0.6905,
              "ev": 1.591,
              "sampleCount": 84
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "매매금지",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -38.2% (필요 -5%~-25%)",
            "statusReason": "G2 미충족: 20일 고점 대비 -38.2% (필요 -5%~-25%)"
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
  "analysisDate": "2026-06-08"
};
