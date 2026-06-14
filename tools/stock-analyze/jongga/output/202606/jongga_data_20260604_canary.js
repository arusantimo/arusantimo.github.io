window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-04"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-07T16:39:28+00:00",
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
        "durationMs": 2039.9,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1220.8,
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
        "durationMs": 87.2,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 340.1,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 5354.2,
        "count": 59
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 3862.5,
        "detail": "성공 59 / 실패 0",
        "count": 59
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 2634.8,
        "detail": "direct-http · 체결강도 59 / 호가 59 / 틱프록시 59",
        "count": 59
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 156.7,
        "detail": "pullback 3, breakout 3, accumulation 3, reversal 3",
        "count": 12
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 14111.1,
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
            "strictScore": 4.1,
            "signalScore": 4.1,
            "score": 4.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 4.5,
            "gradeScore": 9.1,
            "grade": "S",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 40,876주 / 기관 -25,435주 · 당일 순매수"
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
                "code": "D1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.5,
                "evalStatus": "data_missing",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족"
              },
              {
                "code": "D2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족"
              },
              {
                "code": "D3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족"
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
                "code": "Q1",
                "status": "⚠️",
                "note": "눌림목 품질 피처 부족 (낙폭·거래량·수급)",
                "evalStatus": "data_missing"
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
            "unmatchedRules": [
              {
                "code": "D1",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D2",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D3",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
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
            "marketCapRank": 3,
            "marketCapUniverseCount": 2584,
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
              "ma10Price": 1228300,
              "ma10PrevPrice": 1194200,
              "ma20Price": 1172700,
              "ma20PrevPrice": 1154200,
              "ma10WarningPrice": null,
              "hardStopPrice": 1172700,
              "fallbackStopPrice": 1320170,
              "effectiveStopPrice": 1320170,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 1,172,700원) = 1,172,700원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,320,170원) = 1,320,170원",
              "reasonSummary": "현재가 아래 유효 손절 후보(20일선 1,172,700원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,320,170원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,395,025원",
                "historicalHitRate": 0.6628,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "1,415,440원",
                "historicalHitRate": 0.5116,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,442,660원",
                "historicalHitRate": 0.3488,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,469,880원",
                "historicalHitRate": 0.314,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,497,100원",
                "historicalHitRate": 0.098,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,320,170원 하향 이탈",
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,395,025원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,415,440원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,442,660원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,469,880원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,497,100원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,320,170원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,320,170원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,395,025원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,415,440원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,442,660원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,469,880원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,497,100원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,320,170원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,320,170원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,395,025원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,415,440원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,442,660원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,469,880원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,497,100원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,320,170원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,320,170원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.2006
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 86건)",
              "hitRate": 0.6628,
              "ev": 4.737,
              "sampleCount": 86
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
            "strictScore": 4.1,
            "signalScore": 4.1,
            "score": 4.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 4.5,
            "gradeScore": 9.1,
            "grade": "S",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -145,935주 / 기관 1,577주 · 당일 순매수"
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
                "code": "D1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.5,
                "evalStatus": "data_missing",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족"
              },
              {
                "code": "D2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족"
              },
              {
                "code": "D3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족"
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
                "code": "Q1",
                "status": "⚠️",
                "note": "눌림목 품질 피처 부족 (낙폭·거래량·수급)",
                "evalStatus": "data_missing"
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
            "unmatchedRules": [
              {
                "code": "D1",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D2",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D3",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
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
            "marketCapRank": 11,
            "marketCapUniverseCount": 2584,
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
                    "burstRatioPct": 331,
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260513",
              "anchorOpen": 564000,
              "anchorClose": 649000,
              "anchorHigh": 677000,
              "anchorLow": 555000,
              "anchorBodyMid": 606500,
              "anchorVolumeRatio": 3.93,
              "anchorStopMode": "open",
              "anchorStopPrice": 564000,
              "ma10Price": 692500,
              "ma10PrevPrice": 670200,
              "ma20Price": 621650,
              "ma20PrevPrice": 605825,
              "ma10WarningPrice": null,
              "hardStopPrice": 621650,
              "fallbackStopPrice": 725560,
              "effectiveStopPrice": 725560,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 시가 564,000원, 20일선 621,650원) = 621,650원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 725,560원) = 725,560원",
              "reasonSummary": "앵커 봉 - 기준 시가 564,000원와 20일선 621,650원 중 더 보수적인 가격을 쓰고, 기존 % 손절 725,560원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "766,700원",
                "historicalHitRate": 0.6628,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "777,920원",
                "historicalHitRate": 0.5116,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "792,880원",
                "historicalHitRate": 0.3488,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "807,840원",
                "historicalHitRate": 0.314,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "822,800원",
                "historicalHitRate": 0.098,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 725,560원 하향 이탈",
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "766,700원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "777,920원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "792,880원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "807,840원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "822,800원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 725,560원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "725,560원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "766,700원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "777,920원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "792,880원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "807,840원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "822,800원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 725,560원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "725,560원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "766,700원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "777,920원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "792,880원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "807,840원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "822,800원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 725,560원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "725,560원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.2006
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 86건)",
              "hitRate": 0.6628,
              "ev": 4.737,
              "sampleCount": 86
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
            "strictScore": 4.1,
            "signalScore": 4.1,
            "score": 4.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 4.5,
            "gradeScore": 9.1,
            "grade": "S",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -60,220주 / 기관 35,180주 · 당일 순매수"
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
                "code": "D1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.5,
                "evalStatus": "data_missing",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족"
              },
              {
                "code": "D2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족"
              },
              {
                "code": "D3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족"
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
                "code": "Q1",
                "status": "⚠️",
                "note": "눌림목 품질 피처 부족 (낙폭·거래량·수급)",
                "evalStatus": "data_missing"
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
              },
              {
                "code": "D1",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D2",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D3",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
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
            "marketCapRank": 31,
            "marketCapUniverseCount": 2584,
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260529",
              "anchorOpen": 1193000,
              "anchorClose": 1458000,
              "anchorHigh": 1474000,
              "anchorLow": 1145000,
              "anchorBodyMid": 1325500,
              "anchorVolumeRatio": 3.49,
              "anchorStopMode": "open",
              "anchorStopPrice": 1193000,
              "ma10Price": 1112100,
              "ma10PrevPrice": 1074100,
              "ma20Price": 909800,
              "ma20PrevPrice": 880900,
              "ma10WarningPrice": null,
              "hardStopPrice": 909800,
              "fallbackStopPrice": 1137810,
              "effectiveStopPrice": 1137810,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 909,800원) = 909,800원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,137,810원) = 1,137,810원 / 제외: 앵커 시가 1,193,000원가 현재가 1,173,000원 이상이라 제외",
              "reasonSummary": "현재가 아래 유효 손절 후보(20일선 909,800원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,137,810원를 하한으로 유지합니다. 앵커 시가 1,193,000원가 현재가 1,173,000원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,202,325원",
                "historicalHitRate": 0.6628,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "1,219,920원",
                "historicalHitRate": 0.5116,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,243,380원",
                "historicalHitRate": 0.3488,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,266,840원",
                "historicalHitRate": 0.314,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,290,300원",
                "historicalHitRate": 0.098,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,137,810원 하향 이탈",
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,202,325원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,219,920원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,243,380원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,266,840원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,290,300원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,137,810원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,137,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,202,325원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,219,920원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,243,380원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,266,840원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,290,300원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,137,810원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,137,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,202,325원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,219,920원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,243,380원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,266,840원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,290,300원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,137,810원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,137,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.2006
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 86건)",
              "hitRate": 0.6628,
              "ev": 4.737,
              "sampleCount": 86
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
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "외인 -40,670주 / 기관 49,115주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0,
                "signalPoints": 1,
                "maxPoints": 2,
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
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 98.2% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "몸통 83% / 윗꼬리·몸통 0.08 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.95 (필요 ≥ 1.2) · 매수 잔량 우위"
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
            "marketCapRank": 74,
            "marketCapUniverseCount": 2584,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -40,670주 / 기관 49,115주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 80.2,
              "note": "토스 공개 체결강도 80.2% / 최근 체결 131분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-06-05T09:00:03Z",
              "intradayAbove100Ratio": 100,
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
              "scoreDelta": -1,
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
            "breakoutStopPolicy": {
              "version": "breakout-stop-v1-live",
              "referenceSource": "prior_resistance_band",
              "referenceLookbackDays": 60,
              "referenceClusterPct": 1,
              "referencePrice": 250000,
              "referenceBandLow": 250000,
              "referenceBandHigh": 250000,
              "entryDayOpenPrice": 197100,
              "fallbackStopPrice": 237975,
              "effectiveHardStopPrice": 250000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 250,000원와 기존 % 손절 237,975원 중 더 높은 250,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 250,000원이며, 기존 % 손절 237,975원보다 느슨해지지 않게 250,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+1.8%",
                "targetPrice": "255,000원",
                "historicalHitRate": 0.75,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "268,035원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "278,055원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "288,075원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "300,600원",
                "historicalHitRate": 0.25,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 250,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.2%",
                "targetPrice": "250,000원"
              }
            ],
            "rr": "1 : 61.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 248746,
              "high": 251251,
              "anchor": 250500,
              "label": "248,746~251,251원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 255000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "260,520원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "268,035원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "278,055원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "288,075원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "300,600원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 250,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "250,000원"
                  }
                ],
                "trailingActivationPct": 8,
                "trailingBufferPct": 3,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 255000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "255,000원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "268,035원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "278,055원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "288,075원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "300,600원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 250,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "250,000원"
                  }
                ],
                "trailingActivationPct": 6,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistancePrice": 255000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "255,000원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "268,035원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "278,055원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "288,075원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "300,600원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 250,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "250,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
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
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.25,
              "ev": 5.404,
              "sampleCount": 8
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
            "statusReasonShort": "G6 미충족: 당일 등락 +27.22% (필요 ≤ +12%)",
            "statusReason": "G6 미충족: 당일 등락 +27.22% (필요 ≤ +12%)"
          },
          {
            "rank": 2,
            "name": "삼화콘덴서",
            "code": "001820",
            "strictScore": 3.1,
            "signalScore": 3.9,
            "score": 3.9,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.7,
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
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 63.9% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 62% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 97.0% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "몸통 3% / 윗꼬리·몸통 8.50 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G2, G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 -12.0% / 20일 초과 +50.9%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 63.9% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 75",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 62% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 3% / 윗꼬리·몸통 8.50 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +2.51% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 110,400 / 5MA 127,480 (전일 5MA 130,580) · 5MA 조건 미충족",
                "evalStatus": "not_met"
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
                "code": "C1",
                "note": "종가 / 당일 고가 97.0% (필요 ≥ 95%)",
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
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 63.9% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 62% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 3% / 윗꼬리·몸통 8.50 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 110400,
            "previousClose": 107700,
            "dailyChange": 2700,
            "dailyChangePct": 2.51,
            "dailyDirection": "up",
            "entryPriceText": "110,400원 (당일 종가 기준)",
            "entryPrice": 110400,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 21.99%, 일간 표준편차 13.06%, 당일 레인지 12.07%.",
              "metrics": {
                "atrPct10": 21.99,
                "returnStd20": 13.06,
                "todayRangePct": 12.07,
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
              "referencePrice": 110100,
              "referenceBandLow": 110100,
              "referenceBandHigh": 110100,
              "entryDayOpenPrice": 110000,
              "fallbackStopPrice": 104880,
              "effectiveHardStopPrice": 110100,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 110,100원와 기존 % 손절 104,880원 중 더 높은 110,100원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 110,100원이며, 기존 % 손절 104,880원보다 느슨해지지 않게 110,100원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+3.1%",
                "targetPrice": "113,800원",
                "historicalHitRate": 0.75,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+20.1%",
                "targetPrice": "132,600원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+20.1%",
                "targetPrice": "132,600원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+20.1%",
                "targetPrice": "132,600원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.1%",
                "targetPrice": "132,600원",
                "historicalHitRate": 0.25,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 110,100원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.3%",
                "targetPrice": "110,100원"
              }
            ],
            "rr": "1 : 58.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 109627,
              "high": 110731,
              "anchor": 110400,
              "label": "109,627~110,731원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 113800,
                "secondaryResistancePrice": 132600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "114,816원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "118,128원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "122,544원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "126,960원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "132,480원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,100원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "110,100원"
                  }
                ],
                "trailingActivationPct": 8,
                "trailingBufferPct": 3,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 113800,
                "secondaryResistancePrice": 132600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "113,800원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "118,128원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "122,544원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "126,960원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "132,480원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,100원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "110,100원"
                  }
                ],
                "trailingActivationPct": 6,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistancePrice": 113800,
                "secondaryResistancePrice": 132600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "113,800원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+20.1%",
                    "targetPrice": "132,600원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+20.1%",
                    "targetPrice": "132,600원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.1%",
                    "targetPrice": "132,600원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.1%",
                    "targetPrice": "132,600원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,100원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "110,100원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
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
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.25,
              "ev": 5.404,
              "sampleCount": 8
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
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G2, G4)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 52주 고가 대비 63.9% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 63.9% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 62% (필요 ≥ 150%)"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "하나금융지주",
            "code": "086790",
            "strictScore": 7.9,
            "signalScore": 7.9,
            "score": 7.9,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 6.6,
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
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 100.3% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 116,380 / 20MA 120,260 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 95% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 +3.08% (필요 -3% ~ +5%)"
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
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
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
                "status": "✅",
                "note": "종가 120,600 / 60MA 117,188",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 90.2% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 100% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "매집 품질 피처 부족 (외인지분·상대강도)",
                "evalStatus": "data_missing"
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
                "code": "P1",
                "note": "종가 / 20MA 100.3% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +3.08% (필요 -3% ~ +5%)",
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
                "code": "P2",
                "note": "5MA 116,380 / 20MA 120,260 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 95% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 120600,
            "previousClose": 117000,
            "dailyChange": 3600,
            "dailyChangePct": 3.08,
            "dailyDirection": "up",
            "entryPriceText": "120,600원 (당일 종가 기준)",
            "entryPrice": 120600,
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
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 4.18%, 일간 표준편차 2.53%, 당일 레인지 5.98%.",
              "metrics": {
                "atrPct10": 4.18,
                "returnStd20": 2.53,
                "todayRangePct": 5.98,
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
                "quantity": "15% 익절",
                "targetYield": "+0.1%",
                "targetPrice": "120,700원",
                "historicalHitRate": 0.6,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+8.6%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0.2,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+8.6%",
                "targetPrice": "131,000원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "132,660원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "137,484원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 116,379원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "116,379원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260602",
              "anchorOpen": 114800,
              "anchorClose": 117000,
              "anchorVolumeRatio20d": 0.96,
              "anchorStopPrice": 114800,
              "fallbackStopPrice": 116379,
              "effectiveHardStopPrice": 116379,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 114,800원와 기존 % 손절 116,379원 중 더 높은 116,379원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 114,800원를 기준으로 잡고, 기존 % 손절 116,379원보다 느슨해지지 않게 116,379원로 고정합니다."
            },
            "rr": "1 : 2.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 119756,
              "high": 120962,
              "anchor": 120600,
              "label": "119,756~120,962원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 120700,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "123,615원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "125,424원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "129,042원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "132,660원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "137,484원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 116,379원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "116,379원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 120700,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "120,700원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "125,424원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "129,042원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "132,660원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "137,484원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 116,379원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "116,379원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 120700,
                "secondaryResistancePrice": 131000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "120,700원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+8.6%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+8.6%",
                    "targetPrice": "131,000원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "132,660원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "137,484원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 116,379원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "116,379원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -1.1794
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 10건)",
              "hitRate": 0.2,
              "ev": -0.891,
              "sampleCount": 10
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
                "note": "종가 / 20MA 96.2% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 681,600 / 20MA 676,650 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 60% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 등락 -3.27% (필요 -3% ~ +5%)"
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
                "note": "종가 651,000 / 60MA 591,275",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 84.8% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 61% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "매집 품질 피처 부족 (외인지분·상대강도)",
                "evalStatus": "data_missing"
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
                "note": "5MA 681,600 / 20MA 676,650 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 60% (필요 ≤ 90%)",
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
                "note": "종가 / 20MA 96.2% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -3.27% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.46:1 · 평균 체결강도 115.4% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 651000,
            "previousClose": 673000,
            "dailyChange": -22000,
            "dailyChangePct": -3.27,
            "dailyDirection": "down",
            "entryPriceText": "651,000원 (당일 종가 기준)",
            "entryPrice": 651000,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 7.26%, 일간 표준편차 4.82%, 당일 레인지 6.39%.",
              "metrics": {
                "atrPct10": 7.26,
                "returnStd20": 4.82,
                "todayRangePct": 6.39,
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
                "quantity": "15% 익절",
                "targetYield": "+0.8%",
                "targetPrice": "656,000원",
                "historicalHitRate": 0.6,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.9%",
                "targetPrice": "670,000원",
                "historicalHitRate": 0.2,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "696,570원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "716,100원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "742,140원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 628,215원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "628,215원"
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
              "fallbackStopPrice": 628215,
              "effectiveHardStopPrice": 628215,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 628,215원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 628,215원만 유지합니다."
            },
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 646443,
              "high": 652953,
              "anchor": 651000,
              "label": "646,443~652,953원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 656000,
                "secondaryResistancePrice": 670000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "667,275원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "677,040원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "696,570원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "716,100원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "742,140원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 628,215원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "628,215원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 656000,
                "secondaryResistancePrice": 670000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "656,000원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "670,000원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "696,570원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "716,100원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "742,140원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 628,215원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "628,215원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 656000,
                "secondaryResistancePrice": 670000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "656,000원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "670,000원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "696,570원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "716,100원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "742,140원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 628,215원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "628,215원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -1.1794
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 10건)",
              "hitRate": 0.2,
              "ev": -0.891,
              "sampleCount": 10
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
            "name": "LG에너지솔루션",
            "code": "373220",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 5.9,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 22,875주 / 기관 22,639주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 당일 +22,875 / 전일 -69,474 · 기관 당일 +22,639 / 전일 +18,854 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 282.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 116.0% / 마지막 1시간 282.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 97.7% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 443,900 / 20MA 431,800 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 62% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 등락 -4.63% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -5.78% / KOSPI -5.54% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 29.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -69,474/당일 +22,875 · 기관 전일 +18,854/당일 +22,639 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 422,000 / 60MA 418,025",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 80.1% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 69",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 114% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "매집 품질 피처 부족 (외인지분·상대강도)",
                "evalStatus": "data_missing"
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
                "note": "외인 22,875주 / 기관 22,639주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +22,875 / 전일 -69,474 · 기관 당일 +22,639 / 전일 +18,854 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 282.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 116.0% / 마지막 1시간 282.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 443,900 / 20MA 431,800 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 62% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 29.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 97.7% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -4.63% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.78% / KOSPI -5.54% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 422000,
            "previousClose": 442500,
            "dailyChange": -20500,
            "dailyChangePct": -4.63,
            "dailyDirection": "down",
            "entryPriceText": "422,000원 (당일 종가 기준)",
            "entryPrice": 422000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 96.876,
            "marketCapRank": 6,
            "marketCapUniverseCount": 2584,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 22,875주 / 기관 22,639주 / 마지막 1시간 282.1% · 장후반 매수세 강화 · 마지막 30분 틱 29.00:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
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
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 7.81%, 일간 표준편차 4.56%, 당일 레인지 11.19%.",
              "metrics": {
                "atrPct10": 7.81,
                "returnStd20": 4.56,
                "todayRangePct": 11.19,
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
                "quantity": "15% 익절",
                "targetYield": "+0.2%",
                "targetPrice": "423,000원",
                "historicalHitRate": 0.6,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.2%",
                "targetPrice": "435,500원",
                "historicalHitRate": 0.2,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "451,540원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "464,200원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "481,080원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 407,230원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "407,230원"
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
              "fallbackStopPrice": 407230,
              "effectiveHardStopPrice": 407230,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 407,230원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 407,230원만 유지합니다."
            },
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 419046,
              "high": 423266,
              "anchor": 422000,
              "label": "419,046~423,266원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 423000,
                "secondaryResistancePrice": 435500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "432,550원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "438,880원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "451,540원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "464,200원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "481,080원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 407,230원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "407,230원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 423000,
                "secondaryResistancePrice": 435500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "423,000원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.2%",
                    "targetPrice": "435,500원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "451,540원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "464,200원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "481,080원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 407,230원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "407,230원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 423000,
                "secondaryResistancePrice": 435500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "423,000원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.2%",
                    "targetPrice": "435,500원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "451,540원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "464,200원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "481,080원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 407,230원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "407,230원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -1.1794
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 10건)",
              "hitRate": 0.2,
              "ev": -0.891,
              "sampleCount": 10
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
        "reversal": [
          {
            "rank": 1,
            "name": "피에스케이",
            "code": "319660",
            "strictScore": 7.8,
            "signalScore": 7.8,
            "score": 7.8,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 7.8,
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
                "note": "종가 114,400 / 20MA 106,110 (107.8% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "note": "당일 거래량 / 5일 평균 204% (필요 ≥ 200%) · 투매 클라이맥스"
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
                "status": "⛔",
                "note": "최근 손절 이력 2건 (최근: 2026-05-28) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +29.0% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -5.7% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 114,400 / 60MA 89,428",
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
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "반등 품질 피처 부족 (20MA 이격·RSI)",
                "evalStatus": "data_missing"
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
                "note": "종가 114,400 / 20MA 106,110 (107.8% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 85% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 204% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
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
            "currentPrice": 114400,
            "previousClose": 90600,
            "dailyChange": 23800,
            "dailyChangePct": 26.27,
            "dailyDirection": "up",
            "entryPriceText": "114,400원 (당일 종가 기준)",
            "entryPrice": 114400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.6643,
            "marketCapRank": 146,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -5.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 10.88%, 일간 표준편차 7.73%, 당일 레인지 24.83%.",
              "metrics": {
                "atrPct10": 10.88,
                "returnStd20": 7.73,
                "todayRangePct": 24.83,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절",
                "targetYield": "+0.8%",
                "targetPrice": "115,300원",
                "historicalHitRate": 0.7087,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+1.8%",
                "targetPrice": "116,500원",
                "historicalHitRate": 0.6311,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 112,112원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "112,112원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 95200,
              "fallbackStopPrice": 112112,
              "effectiveHardStopPrice": 112112,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 95,200원와 기존 % 손절 112,112원 중 더 높은 112,112원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 95,200원이며, 기존 % 손절 112,112원보다 느슨해지지 않게 112,112원으로 고정합니다."
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
              "low": 113599,
              "high": 114743,
              "anchor": 114400,
              "label": "113,599~114,743원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 121300,
                "retrace33Price": 116677,
                "retrace50Price": 117850,
                "nearestResistancePrice": 115300,
                "secondaryResistancePrice": 116500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "115,300원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "116,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+6.0%",
                    "targetPrice": "121,300원",
                    "historicalHitRate": 0.377,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 112,112원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "112,112원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 121300,
                "retrace33Price": 116677,
                "retrace50Price": 117850,
                "nearestResistancePrice": 115300,
                "secondaryResistancePrice": 116500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "115,300원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+1.8%",
                    "targetPrice": "116,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 112,112원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "112,112원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 121300,
                "retrace33Price": 116677,
                "retrace50Price": 117850,
                "nearestResistancePrice": 115300,
                "secondaryResistancePrice": 116500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "115,300원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+1.8%",
                    "targetPrice": "116,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 112,112원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "112,112원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.1666
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.7087,
              "ev": 1.739,
              "sampleCount": 103
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F2",
              "핵심 Gate 미충족: F4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) / F4 미충족: 최근 손절 이력 2건 (최근: 2026-05-28) · 재진입 차단"
          },
          {
            "rank": 2,
            "name": "두산로보틱스",
            "code": "454910",
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
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 124% (필요 ≥ 200%)"
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
                "status": "⛔",
                "note": "최근 손절 이력 2건 (최근: 2026-06-02) · 재진입 차단",
                "evalStatus": "not_met"
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
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "반등 품질 피처 부족 (20MA 이격·RSI)",
                "evalStatus": "data_missing"
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
            "marketCapRank": 79,
            "marketCapUniverseCount": 2584,
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
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "50% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "161,893원",
                "historicalHitRate": 0.7087,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+3.8%",
                "targetPrice": "163,950원",
                "historicalHitRate": 0.6311,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 154,742원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "154,742원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 145100,
              "fallbackStopPrice": 154742,
              "effectiveHardStopPrice": 154742,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 145,100원와 기존 % 손절 154,742원 중 더 높은 154,742원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 145,100원이며, 기존 % 손절 154,742원보다 느슨해지지 않게 154,742원으로 고정합니다."
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
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 156795,
              "high": 158374,
              "anchor": 157900,
              "label": "156,795~158,374원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 170000,
                "retrace33Price": 161893,
                "retrace50Price": 163950,
                "nearestResistancePrice": 165500,
                "secondaryResistancePrice": 170000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "161,893원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.8%",
                    "targetPrice": "163,950원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+7.7%",
                    "targetPrice": "170,000원",
                    "historicalHitRate": 0.377,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 154,742원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "154,742원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 170000,
                "retrace33Price": 161893,
                "retrace50Price": 163950,
                "nearestResistancePrice": 165500,
                "secondaryResistancePrice": 170000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "161,893원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+3.8%",
                    "targetPrice": "163,950원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 154,742원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "154,742원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 170000,
                "retrace33Price": 161893,
                "retrace50Price": 163950,
                "nearestResistancePrice": 165500,
                "secondaryResistancePrice": 170000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "161,893원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+3.8%",
                    "targetPrice": "163,950원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 154,742원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "154,742원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.1666
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.7087,
              "ev": 1.739,
              "sampleCount": 103
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-02) · 재진입 차단",
            "statusReason": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-02) · 재진입 차단"
          },
          {
            "rank": 3,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 5.2,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "외인 34,734→40,876 / 기관 4,593→-25,435 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
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
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.06 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1258000, 전봉 종가 1234000 미달"
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
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "반등 품질 피처 부족 (20MA 이격·RSI)",
                "evalStatus": "data_missing"
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
            "marketCapRank": 3,
            "marketCapUniverseCount": 2584,
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
              "latestOpen": 1258000,
              "latestClose": 1258000,
              "previousClose": 1234000
            },
            "toss": {
              "avgStrength": 91,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 32분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-05T10:59:57Z",
              "intradayAbove100Ratio": 100,
              "observedMinutes": 32,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 32분 프록시",
              "lastHourAvgStrength": 300,
              "lastHourObservedMinutes": 32,
              "last30AvgStrength": 300,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 62,
              "last30BuyVolume": 62,
              "last30SellVolume": 0
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
              "scoreDelta": 1,
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
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "50% 익절",
                "targetYield": "+0.8%",
                "targetPrice": "1,371,230원",
                "historicalHitRate": 0.7087,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+1.1%",
                "targetPrice": "1,376,500원",
                "historicalHitRate": 0.6311,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,333,780원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,333,780원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1293000,
              "fallbackStopPrice": 1333780,
              "effectiveHardStopPrice": 1333780,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 1,293,000원와 기존 % 손절 1,333,780원 중 더 높은 1,333,780원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,293,000원이며, 기존 % 손절 1,333,780원보다 느슨해지지 않게 1,333,780원으로 고정합니다."
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
            "rr": "1 : 0.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1351473,
              "high": 1365083,
              "anchor": 1361000,
              "label": "1,351,473~1,365,083원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1371230,
                "retrace50Price": 1376500,
                "nearestResistancePrice": 1375000,
                "secondaryResistancePrice": 1392000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "1,371,230원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.1%",
                    "targetPrice": "1,376,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,429,050원",
                    "historicalHitRate": 0.377,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,333,780원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,333,780원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1371230,
                "retrace50Price": 1376500,
                "nearestResistancePrice": 1375000,
                "secondaryResistancePrice": 1392000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "1,371,230원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+1.1%",
                    "targetPrice": "1,376,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,333,780원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,333,780원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 1392000,
                "retrace33Price": 1371230,
                "retrace50Price": 1376500,
                "nearestResistancePrice": 1375000,
                "secondaryResistancePrice": 1392000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "1,371,230원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+1.1%",
                    "targetPrice": "1,376,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,333,780원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,333,780원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.1666
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.7087,
              "ev": 1.739,
              "sampleCount": 103
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G2",
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-05-27) · 재진입 차단 · 외 1건",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-05-27) · 재진입 차단 / G2 미충족: 20일 고점 대비 -2.2% (필요 -5%~-25%)"
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
