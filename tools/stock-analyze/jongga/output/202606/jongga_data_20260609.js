window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-09"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-09T06:02:45+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 23,
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
        "ok": 23
      },
      "naver_chart": {
        "ok": 23
      },
      "naver_integration_schedule": {
        "ok": 0
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 23
      },
      "toss_http_strength": {
        "ok": 23
      },
      "toss_ticks_strength_proxy": {
        "ok": 23
      },
      "toss_quotes_orderbook": {
        "ok": 23
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
        "durationMs": 1782.6,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 616.1,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.1,
        "detail": "G-D 🟠"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 2297.6,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 142.2,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 50060.9,
        "count": 23
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 7829.6,
        "detail": "성공 23 / 실패 0",
        "count": 23
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 8697.9,
        "detail": "direct-http · 체결강도 23 / 호가 23 / 틱프록시 23",
        "count": 23
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 101.2,
        "detail": "pullback 3, breakout 3, accumulation 3, reversal 3",
        "count": 12
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 21374.3,
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
            "value": "강세장 ✅ (펀더·지수 정당)"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "8068.61 (+7.81%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 89.67"
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
            "value": "G-D 🟠 (-7.5점)"
          },
          {
            "item": "갭 조정",
            "value": "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6659.14",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7966.22",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 89.67",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 12 / 하락 8",
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
          "marketAnalyzeDate": "20260609",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.47,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1529원과 과열 이격이 겹쳤지만 펀더멘털 앵커 89점과 non-critical bubble(BI 44 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 8068.61,
          "kospiMa5": 8230.902,
          "vkospiValue": 89.67,
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
            "actualValue": "-2.78%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+18.92",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+9.7bp",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-6.97원",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-0.45%",
            "baseScore": "-1점",
            "weight": "×1.0",
            "formula": "-1 × 1.0 = -1.0점",
            "weightedScore": "-1.0점"
          }
        ],
        "totalScore": "-7.5점",
        "grade": "G-D 🟠",
        "code": "G-D",
        "entryAdjustment": "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류",
        "sellAdjustment": "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소",
        "swingAdjustment": "금지",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-06-10T03:59:00+00:00",
          "vix": "2026-06-09T20:15:00+00:00",
          "tnx": "2026-06-09T19:00:00+00:00",
          "krw": "2026-06-09T22:59:00+00:00",
          "sox": "2026-06-10T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "주성엔지니어링",
            "code": "036930",
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
                "note": "당일 거래대금 순위 26위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 5,844주 / 기관 -61,709주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 184,200 · 이평선 터치: 5MA, 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 192,100 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 1.84 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 56% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +11.54% / KOSPI +7.81% outperform"
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
            "statusLabel": "매수추천",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 211% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 206,460 > 20MA 191,605 > 60MA 120,457 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 192,100 / 60MA 120,457",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 77.5 (필요 ≥ 50)",
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
                "note": "KOSPI 8,069 / 5MA 8,231 (-2.0%) · VKOSPI 89.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +5.09% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 77.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +0.3% (필요 ≤ +25%) · 60MA +59.5% (필요 ≤ +60%)",
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
                "note": "당일 거래대금 순위 26위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 5,844주 / 기관 -61,709주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 184,200 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 192,100 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 1.84 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 56% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +11.54% / KOSPI +7.81% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [],
            "currentPrice": 192100,
            "previousClose": 182800,
            "dailyChange": 9300,
            "dailyChangePct": 5.09,
            "dailyDirection": "up",
            "entryPriceText": "192,100원 (당일 종가 기준)",
            "entryPrice": 192100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.929,
            "marketCapRank": 78,
            "marketCapUniverseCount": 2560,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 5,844주 / 기관 -61,709주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 185,433원 (3.47% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 185433,
                    "distancePct": 3.47,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 7,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 70946,
                    "distancePct": 63.07,
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
                    "lastSeenDaysAgo": 32,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 63186,
                    "distancePct": 67.11,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 28,
                    "lastSeenDaysAgo": 36,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 60916,
                    "distancePct": 68.29,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 11,
                    "lastSeenDaysAgo": 37,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 59362,
                    "distancePct": 69.1,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 5,
                    "lastSeenDaysAgo": 41,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 185433,
                  "distancePct": 3.47,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 7,
                  "lastSeenDaysAgo": 1,
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
                    "price": 59450,
                    "distancePct": 69.05,
                    "count": 3,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 58950,
                    "bandHigh": 59800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 60983,
                    "distancePct": 68.25,
                    "count": 9,
                    "lastSeenDaysAgo": 37,
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
                    "price": 63338,
                    "distancePct": 67.03,
                    "count": 11,
                    "lastSeenDaysAgo": 36,
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
                    "price": 65650,
                    "distancePct": 65.83,
                    "count": 3,
                    "lastSeenDaysAgo": 45,
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
                    "price": 67960,
                    "distancePct": 64.62,
                    "count": 5,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 67200,
                    "bandHigh": 68500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 70689,
                    "distancePct": 63.2,
                    "count": 7,
                    "lastSeenDaysAgo": 32,
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
                    "distancePct": 62.05,
                    "count": 3,
                    "lastSeenDaysAgo": 34,
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
                    "distancePct": 42.11,
                    "count": 2,
                    "lastSeenDaysAgo": 28,
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
                    "distancePct": 39.59,
                    "count": 2,
                    "lastSeenDaysAgo": 26,
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
                    "distancePct": 37.46,
                    "count": 3,
                    "lastSeenDaysAgo": 27,
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
                    "distancePct": 35.86,
                    "count": 5,
                    "lastSeenDaysAgo": 21,
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
                    "distancePct": 34.14,
                    "count": 6,
                    "lastSeenDaysAgo": 20,
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
                    "distancePct": 29.72,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
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
                    "distancePct": 27.36,
                    "count": 2,
                    "lastSeenDaysAgo": 15,
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
                    "distancePct": 25.2,
                    "count": 2,
                    "lastSeenDaysAgo": 17,
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
                    "distancePct": 15.3,
                    "count": 2,
                    "lastSeenDaysAgo": 16,
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
                    "distancePct": 12.35,
                    "count": 4,
                    "lastSeenDaysAgo": 12,
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
                    "price": 176800,
                    "distancePct": 7.96,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 175000,
                    "bandHigh": 178500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 182100,
                    "distancePct": 5.21,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 180100,
                    "bandHigh": 184200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 185300,
                    "distancePct": 3.54,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
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
                    "price": 191200,
                    "distancePct": 0.47,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 190300,
                    "bandHigh": 192100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 200333,
                    "distancePct": -4.29,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
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
                    "price": 209167,
                    "distancePct": -8.88,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 208000,
                    "bandHigh": 210000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 223750,
                    "distancePct": -16.48,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
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
                    "distancePct": 69.14,
                    "count": 2,
                    "lastSeenDaysAgo": 41,
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
                    "distancePct": 68.32,
                    "count": 2,
                    "lastSeenDaysAgo": 37,
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
                    "price": 71203,
                    "distancePct": 62.93,
                    "count": 9,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 25,
                    "volume": 20538615,
                    "binIndex": 1,
                    "binLow": 67119,
                    "binHigh": 75288
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 185566,
                    "distancePct": 3.4,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 16521135,
                    "binIndex": 15,
                    "binLow": 181481,
                    "binHigh": 189650
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 63034,
                    "distancePct": 67.19,
                    "count": 17,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 25,
                    "volume": 15785739,
                    "binIndex": 0,
                    "binLow": 58950,
                    "binHigh": 67119
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 169000,
                    "distancePct": 12.02,
                    "count": 1,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 215.4,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 211% (3일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 210.9,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.67, ATR10 15.66%, 일간 표준편차 12.91%, 당일 레인지 11.65%.",
              "metrics": {
                "atrPct10": 15.66,
                "returnStd20": 12.91,
                "todayRangePct": 11.65,
                "vkospi": 89.67
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
              "anchorStopMode": "open",
              "anchorStopPrice": 185300,
              "ma10Price": 208930,
              "ma10PrevPrice": 212120,
              "ma20Price": 191605,
              "ma20PrevPrice": 188945,
              "ma10WarningPrice": 208930,
              "hardStopPrice": 191605,
              "fallbackStopPrice": 184416,
              "effectiveStopPrice": 191605,
              "warningRuleSummary": "종가 192,100원 < 10일선 208,930원 and 10일선 208,930원 <= 전일 10일선 212,120원",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 시가 185,300원, 20일선 191,605원) = 191,605원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 184,416원) = 191,605원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 시가 185,300원, 20일선 191,605원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 184,416원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "10일선 저항 도달",
                "quantity": "30% 익절",
                "targetYield": "+8.8%",
                "targetPrice": "208,930원",
                "historicalHitRate": 0.6796,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+8.8%",
                "targetPrice": "208,930원",
                "historicalHitRate": 0.5437,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.8%",
                "targetPrice": "208,930원",
                "historicalHitRate": 0.4078,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.8%",
                "targetPrice": "208,930원",
                "historicalHitRate": 0.3366,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "211,310원",
                "historicalHitRate": 0.0943,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 191,605원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-0.3%",
                "targetPrice": "191,605원"
              }
            ],
            "rr": "1 : 29.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 189795,
              "high": 191716,
              "anchor": 192100,
              "label": "189,795~191,716원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 208930,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "194,981원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "197,863원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "203,626원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "207,468원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "211,310원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 191,605원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "191,605원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "10일선이 기존 1차 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 208930,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "194,981원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "197,863원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "203,626원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "207,468원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "211,310원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 191,605원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "191,605원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 208930,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "10일선 저항 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+8.8%",
                    "targetPrice": "208,930원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+8.8%",
                    "targetPrice": "208,930원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.8%",
                    "targetPrice": "208,930원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.8%",
                    "targetPrice": "208,930원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "211,310원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 191,605원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "191,605원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": -0.131
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.6796,
              "ev": 4.396,
              "sampleCount": 103
            },
            "entryEligible": true,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "eligible",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 192100.0,
                "vs52wHighPct": 75.33333333333333,
                "vs52wLowPct": 637.4280230326295,
                "dropFrom52wHighPct": 24.666666666666668,
                "ma20GapPct": 0.2583439889355706,
                "rsi14": 53.76317316301095,
                "volumeRatio20d": 61.70504061909381,
                "rs20Pct": 38.30093592512599,
                "supportDistancePct": 3.47,
                "tradingValueRank": 26.0,
                "marketCapRank": 78.0,
                "marketCapTrillion": 8.929,
                "per": 1334.03,
                "pbr": 14.96,
                "cnsPer": 0.0,
                "foreignRate": 9.09,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "NAVER",
            "code": "035420",
            "strictScore": 6.0,
            "signalScore": 6.0,
            "score": 6.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.0,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 6위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 325,140주 / 기관 1,427,219주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 243,000 · 이평선 터치: 5MA, 10MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 254,000 · 5MA·10MA·20MA 중 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.34 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 81% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +3.38% / KOSPI +7.81% underperform"
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
            "statusLabel": "진입 가능(B·조건부)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 463% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 267,300 > 20MA 223,570 > 60MA 215,382 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 254,000 / 60MA 215,382",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 56.2 (필요 ≥ 50)",
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
                "note": "KOSPI 8,069 / 5MA 8,231 (-2.0%) · VKOSPI 89.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -8.96% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 56.2 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +13.6% (필요 ≤ +25%) · 60MA +17.9% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 85점 · 현재가 아래 유효 family 3개",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 6위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 325,140주 / 기관 1,427,219주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 243,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 254,000 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.34 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 81% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +3.38% / KOSPI +7.81% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 254000,
            "previousClose": 279000,
            "dailyChange": -25000,
            "dailyChangePct": -8.96,
            "dailyDirection": "down",
            "entryPriceText": "254,000원 (당일 종가 기준)",
            "entryPrice": 254000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 39.8459,
            "marketCapRank": 19,
            "marketCapUniverseCount": 2560,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 325,140주 / 기관 1,427,219주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 196,097원 (22.80% 아래) · 강도 85점 · family 3개 · 급증봉 저점·수평 지지·스윙로우 군집",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 196097,
                    "distancePct": 22.8,
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
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 207528,
                    "distancePct": 18.3,
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
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 243979,
                    "distancePct": 3.95,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 212276,
                    "distancePct": 16.43,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 22,
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 254833,
                    "distancePct": -0.33,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 196097,
                  "distancePct": 22.8,
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
                  "lastSeenDaysAgo": 7,
                  "strengthPoints": 85,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 85,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "급증봉 저점·수평 지지·스윙로우 군집 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 196890,
                    "distancePct": 22.48,
                    "count": 13,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 20.65,
                    "count": 13,
                    "lastSeenDaysAgo": 9,
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
                    "distancePct": 18.19,
                    "count": 13,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 15.92,
                    "count": 21,
                    "lastSeenDaysAgo": 6,
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
                    "price": 220036,
                    "distancePct": 13.37,
                    "count": 10,
                    "lastSeenDaysAgo": 25,
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
                    "distancePct": 11.35,
                    "count": 2,
                    "lastSeenDaysAgo": 55,
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
                    "price": 244125,
                    "distancePct": 3.89,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 243000,
                    "bandHigh": 245000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 254833,
                    "distancePct": -0.33,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 254000,
                    "bandHigh": 255500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 269500,
                    "distancePct": -6.1,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": false,
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
                    "price": 279750,
                    "distancePct": -10.14,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 279000,
                    "bandHigh": 280500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 195600,
                    "distancePct": 22.99,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 18.41,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 206000,
                    "bandHigh": 208500
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 273342,
                    "distancePct": -7.61,
                    "count": 2,
                    "lastSeenDaysAgo": 4,
                    "valid": false,
                    "weight": 25,
                    "volume": 23781802,
                    "binIndex": 17,
                    "binLow": 270983,
                    "binHigh": 275700
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 268625,
                    "distancePct": -5.76,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 25,
                    "volume": 10148390,
                    "binIndex": 16,
                    "binLow": 266267,
                    "binHigh": 270983
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 263908,
                    "distancePct": -3.9,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": false,
                    "weight": 25,
                    "volume": 9895307,
                    "binIndex": 15,
                    "binLow": 261550,
                    "binHigh": 266267
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 195800,
                    "distancePct": 22.91,
                    "count": 1,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 16.93,
                    "count": 1,
                    "lastSeenDaysAgo": 6,
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
                    "distancePct": 6.1,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 378.8,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 243833,
                    "distancePct": 4.0,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 1070.4,
                    "anchorCount": 3
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 463% (5일 전) · 200%+ 급증 4회",
                "burstCount": 4,
                "maxRatioPct": 462.6,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.67, ATR10 13.06%, 일간 표준편차 6.21%, 당일 레인지 16.31%.",
              "metrics": {
                "atrPct10": 13.06,
                "returnStd20": 6.21,
                "todayRangePct": 16.31,
                "vkospi": 89.67
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
              "anchorOpen": 211500,
              "anchorClose": 234000,
              "anchorHigh": 247500,
              "anchorLow": 211000,
              "anchorBodyMid": 222750,
              "anchorVolumeRatio": 7.46,
              "anchorStopMode": "open",
              "anchorStopPrice": 211500,
              "ma10Price": 244580,
              "ma10PrevPrice": 239480,
              "ma20Price": 223570,
              "ma20PrevPrice": 221620,
              "ma10WarningPrice": null,
              "hardStopPrice": 223570,
              "fallbackStopPrice": 243840,
              "effectiveStopPrice": 243840,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 시가 211,500원, 20일선 223,570원) = 223,570원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 243,840원) = 243,840원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 시가 211,500원, 20일선 223,570원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 243,840원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "5일선 저항 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.2%",
                "targetPrice": "267,300원",
                "historicalHitRate": 0.6796,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.2%",
                "targetPrice": "267,300원",
                "historicalHitRate": 0.5437,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "269,240원",
                "historicalHitRate": 0.4078,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "274,320원",
                "historicalHitRate": 0.3366,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "279,400원",
                "historicalHitRate": 0.0943,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 243,840원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "243,840원"
              }
            ],
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 250952,
              "high": 253492,
              "anchor": 254000,
              "label": "250,952~253,492원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 267300,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "257,810원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "261,620원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "269,240원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "274,320원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 243,840원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "243,840원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "5일선이 기존 1차 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 267300,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "257,810원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "261,620원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "269,240원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "274,320원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 243,840원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "243,840원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 267300,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.2%",
                    "targetPrice": "267,300원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.2%",
                    "targetPrice": "267,300원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "269,240원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "274,320원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 243,840원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "243,840원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": -0.131
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.6796,
              "ev": 4.396,
              "sampleCount": 103
            },
            "entryEligible": true,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "eligible",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 254000.0,
                "vs52wHighPct": 82.33387358184766,
                "vs52wLowPct": 33.123689727463315,
                "dropFrom52wHighPct": 17.666126418152352,
                "ma20GapPct": 13.61094959073221,
                "rsi14": 58.52641480044623,
                "volumeRatio20d": 209.56440368537264,
                "rs20Pct": 18.13953488372093,
                "supportDistancePct": 22.8,
                "tradingValueRank": 6.0,
                "marketCapRank": 19.0,
                "marketCapTrillion": 39.8459,
                "per": 22.05,
                "pbr": 1.29,
                "cnsPer": 20.31,
                "foreignRate": 34.91,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "SK텔레콤",
            "code": "017670",
            "strictScore": 6.0,
            "signalScore": 6.0,
            "score": 6.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.0,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 27위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -851,638주 / 기관 124,201주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 103,300 · 이평선 터치: 5MA, 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 108,300 · 5MA·10MA·20MA 중 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.88 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 81% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -0.88% / KOSPI +7.81% underperform"
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
            "statusLabel": "진입 가능(B·조건부)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 404% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 111,100 > 20MA 104,050 > 60MA 93,135 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 108,300 / 60MA 93,135",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 75.2 (필요 ≥ 50)",
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
                "note": "KOSPI 8,069 / 5MA 8,231 (-2.0%) · VKOSPI 89.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.50% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 75.2 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +4.1% (필요 ≤ +25%) · 60MA +16.3% (필요 ≤ +60%)",
                "evalStatus": "met"
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
                "note": "당일 거래대금 순위 27위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -851,638주 / 기관 124,201주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 103,300 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 108,300 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.88 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 81% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -0.88% / KOSPI +7.81% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 108300,
            "previousClose": 106700,
            "dailyChange": 1600,
            "dailyChangePct": 1.5,
            "dailyDirection": "up",
            "entryPriceText": "108,300원 (당일 종가 기준)",
            "entryPrice": 108300,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 23.2188,
            "marketCapRank": 35,
            "marketCapUniverseCount": 2560,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -851,638주 / 기관 124,201주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 96,126원 (11.24% 아래) · 강도 90점 · family 4개 · 수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 96126,
                    "distancePct": 11.24,
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
                    "count": 32,
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 90,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 99686,
                    "distancePct": 7.95,
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
                    "count": 32,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 108128,
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
                    "price": 102734,
                    "distancePct": 5.14,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 9,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 105975,
                    "distancePct": 2.15,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 96126,
                  "distancePct": 11.24,
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
                  "count": 32,
                  "lastSeenDaysAgo": 6,
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
                    "price": 74320,
                    "distancePct": 31.38,
                    "count": 3,
                    "lastSeenDaysAgo": 51,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 73600,
                    "bandHigh": 75000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 76562,
                    "distancePct": 29.31,
                    "count": 10,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 75800,
                    "bandHigh": 77500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 78262,
                    "distancePct": 27.74,
                    "count": 7,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 77800,
                    "bandHigh": 78800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 79960,
                    "distancePct": 26.17,
                    "count": 8,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 79500,
                    "bandHigh": 80900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 81400,
                    "distancePct": 24.84,
                    "count": 2,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 81200,
                    "bandHigh": 81600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 89500,
                    "distancePct": 17.36,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 89000,
                    "bandHigh": 90000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 92633,
                    "distancePct": 14.47,
                    "count": 5,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 91300,
                    "bandHigh": 93800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 96038,
                    "distancePct": 11.32,
                    "count": 17,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 94400,
                    "bandHigh": 97400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 99272,
                    "distancePct": 8.34,
                    "count": 20,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 97600,
                    "bandHigh": 100600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 102467,
                    "distancePct": 5.39,
                    "count": 8,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 100800,
                    "bandHigh": 103400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 105975,
                    "distancePct": 2.15,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 105000,
                    "bandHigh": 106700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 108333,
                    "distancePct": -0.03,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 107800,
                    "bandHigh": 108900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 112150,
                    "distancePct": -3.55,
                    "count": 2,
                    "lastSeenDaysAgo": 4,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 112100,
                    "bandHigh": 112200
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 95400,
                    "distancePct": 11.91,
                    "count": 4,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 4,
                    "bandLow": 94700,
                    "bandHigh": 95900
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 99685,
                    "distancePct": 7.95,
                    "count": 11,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "volume": 12446770,
                    "binIndex": 9,
                    "binLow": 98312,
                    "binHigh": 101058
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 107923,
                    "distancePct": 0.35,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 25,
                    "volume": 9986175,
                    "binIndex": 12,
                    "binLow": 106550,
                    "binHigh": 109296
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 96940,
                    "distancePct": 10.49,
                    "count": 11,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 25,
                    "volume": 9443147,
                    "binIndex": 8,
                    "binLow": 95567,
                    "binHigh": 98312
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 100100,
                    "distancePct": 7.57,
                    "count": 1,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 310.5,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 103000,
                    "distancePct": 4.89,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 242.0,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 404% (4일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 403.6,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.67, ATR10 10.34%, 일간 표준편차 5.29%, 당일 레인지 11.43%.",
              "metrics": {
                "atrPct10": 10.34,
                "returnStd20": 5.29,
                "todayRangePct": 11.43,
                "vkospi": 89.67
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
              "ma10Price": 106770,
              "ma10PrevPrice": 106220,
              "ma20Price": 104050,
              "ma20PrevPrice": 103310,
              "ma10WarningPrice": null,
              "hardStopPrice": 103968,
              "fallbackStopPrice": 103968,
              "effectiveStopPrice": 103968,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 103,968원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 103,968원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "5일선 저항 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.6%",
                "targetPrice": "111,100원",
                "historicalHitRate": 0.6796,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "111,549원",
                "historicalHitRate": 0.5437,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "114,798원",
                "historicalHitRate": 0.4078,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "116,964원",
                "historicalHitRate": 0.3366,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "119,130원",
                "historicalHitRate": 0.0943,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 103,968원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "103,968원"
              }
            ],
            "rr": "1 : 1.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 107000,
              "high": 108083,
              "anchor": 108300,
              "label": "107,000~108,083원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 111100,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "109,924원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "111,549원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "114,798원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "116,964원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "119,130원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 103,968원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "103,968원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "5일선이 기존 1차 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 111100,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "109,924원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "111,549원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "114,798원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "116,964원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "119,130원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 103,968원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "103,968원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 111100,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "111,100원",
                    "historicalHitRate": 0.6796,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "111,549원",
                    "historicalHitRate": 0.5437,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "114,798원",
                    "historicalHitRate": 0.4078,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "116,964원",
                    "historicalHitRate": 0.3366,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "119,130원",
                    "historicalHitRate": 0.0943,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 103,968원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "103,968원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.6796,
                  "ev": 4.396,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": -0.131
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.6796,
              "ev": 4.396,
              "sampleCount": 103
            },
            "entryEligible": true,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "eligible",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 108300.0,
                "vs52wHighPct": 77.19173200285103,
                "vs52wLowPct": 110.70038910505838,
                "dropFrom52wHighPct": 22.808267997148967,
                "ma20GapPct": 4.084574723690534,
                "rsi14": 55.798731961331704,
                "volumeRatio20d": 171.56300095498204,
                "rs20Pct": 15.828877005347595,
                "supportDistancePct": 11.24,
                "tradingValueRank": 27.0,
                "marketCapRank": 35.0,
                "marketCapTrillion": 23.2188,
                "per": 63.36,
                "pbr": 1.73,
                "cnsPer": 19.07,
                "foreignRate": 75.5,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "NAVER",
            "code": "035420",
            "strictScore": 2.7,
            "signalScore": 3.4,
            "score": 3.4,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.3,
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
                "note": "외인 325,140주 / 기관 1,427,219주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 74.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 83.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 210% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 88.0% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 70% / 윗꼬리·몸통 0.08 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.93 (필요 ≥ 1.2) · 매수 잔량 우위"
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
                "note": "5일 초과 +1.7% / 20일 초과 +10.5%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 82.3% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 6",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 210% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 70% / 윗꼬리·몸통 0.08 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -8.96% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 254,000 / 5MA 267,300 (전일 5MA 270,800) · 5MA 조건 미충족",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 325,140주 / 기관 1,427,219주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.93 (필요 ≥ 1.2) · 매수 잔량 우위",
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
                "note": "당일 평균 74.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 83.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 210% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 88.0% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 70% / 윗꼬리·몸통 0.08 · 강마감 기준 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 254000,
            "previousClose": 279000,
            "dailyChange": -25000,
            "dailyChangePct": -8.96,
            "dailyDirection": "down",
            "entryPriceText": "254,000원 (당일 종가 기준)",
            "entryPrice": 254000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 39.8459,
            "marketCapRank": 19,
            "marketCapUniverseCount": 2560,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 325,140주 / 기관 1,427,219주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 74.0,
              "note": "토스 공개 체결강도 74.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 155.4,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 155.4,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5603,
              "last30BuyVolume": 660.0,
              "last30SellVolume": 423.0
            },
            "orderbook": {
              "bidAskRatio": 1.9294,
              "bidTotal": 85112,
              "askTotal": 44113,
              "note": "Naver 호가잔량합계 매수 85,112 / 매도 44,113",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 89.67, ATR10 13.06%, 일간 표준편차 6.21%, 당일 레인지 16.31%.",
              "metrics": {
                "atrPct10": 13.06,
                "returnStd20": 6.21,
                "todayRangePct": 16.31,
                "vkospi": 89.67
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
              "referenceClusterPct": 1.0,
              "referencePrice": 247500,
              "referenceBandLow": 247500,
              "referenceBandHigh": 247500,
              "entryDayOpenPrice": 286000,
              "fallbackStopPrice": 238760,
              "effectiveHardStopPrice": 247500,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 247,500원와 기존 % 손절 238,760원 중 더 높은 247,500원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 247,500원이며, 기존 % 손절 238,760원보다 느슨해지지 않게 247,500원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+0.2%",
                "targetPrice": "254,500원",
                "historicalHitRate": 0.6105,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+8.1%",
                "targetPrice": "274,500원",
                "historicalHitRate": 0.4211,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+10.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "279,400원",
                "historicalHitRate": 0.3474,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "289,560원",
                "historicalHitRate": 0.2947,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+19.0%",
                "targetPrice": "302,260원",
                "historicalHitRate": 0.2151,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 247,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.6%",
                "targetPrice": "247,500원"
              }
            ],
            "rr": "1 : 4.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 250952,
              "high": 253492,
              "anchor": 254000,
              "label": "250,952~253,492원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 254500,
                "secondaryResistancePrice": 274500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "261,620원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+6.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "269,240원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "302,260원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 247,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "247,500원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 254500,
                "secondaryResistancePrice": 274500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "254,500원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+6.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "269,240원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "302,260원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 247,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "247,500원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
                "nearestResistancePrice": 254500,
                "secondaryResistancePrice": 274500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "254,500원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+8.1%",
                    "targetPrice": "274,500원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "302,260원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 247,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "247,500원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
              "sampleCount": 9,
              "ev": 0.8205
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 93건)",
              "hitRate": 0.2151,
              "ev": 2.303,
              "sampleCount": 93
            },
            "breakoutLiveExitPolicy": {
              "version": "breakout-live-exit-v1",
              "wickClimaxLookbackBars": 20,
              "wickClimaxVolumeRatioMin": 2.5,
              "wickUpperShadowRatioMin": 0.45,
              "orderbookLookbackMinutes": 5,
              "orderbookBidAskSpikeMin": 2.0,
              "orderbookAskDropRatioMax": 0.6,
              "trailingActivationPct": 4.5,
              "trailingBufferPct": 2.0,
              "activeSessionCutoff": "10:30",
              "wickClimaxRuleSummary": "09:00~10:30에 대량 거래량 위꼬리와 고점 대비 -1% 밀림이 함께 나오면 전량 익절합니다.",
              "orderbookRuleSummary": "09:00~10:30에 호가 분산 신호가 나오면 기본 50% 익절하고, 약한 체결강도/트레일링 동시 충족 시 전량 익절로 승격합니다.",
              "trailingRuleSummary": "+4.5% 도달 후 세션 고점 대비 2.0% 이탈 시 잔량 전량 매도합니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "매매금지(핵심 Gate 미충족: G2)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 52주 고가 대비 82.3% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 82.3% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 254000.0,
                "vs52wHighPct": 82.33387358184766,
                "vs52wLowPct": 33.123689727463315,
                "dropFrom52wHighPct": 17.666126418152352,
                "ma20GapPct": 13.61094959073221,
                "rsi14": 58.52641480044623,
                "volumeRatio20d": 209.56440368537264,
                "rs20Pct": 18.13953488372093,
                "tradingValueRank": 6.0,
                "marketCapRank": 19.0,
                "marketCapTrillion": 39.8459,
                "per": 22.05,
                "pbr": 1.29,
                "cnsPer": 20.31,
                "foreignRate": 34.91,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 2.4,
            "signalScore": 3.1,
            "score": 3.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.1,
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
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 46,230주 / 기관 20,825주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 90.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 63.5% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 116% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 97.1% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 7% / 윗꼬리·몸통 1.83 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G2, G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 -17.6% / 20일 초과 +74.3%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 62.6% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 16",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 116% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 7% / 윗꼬리·몸통 1.83 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +3.65% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 1,135,000 / 5MA 1,163,000 (전일 5MA 1,242,000) · 5MA 조건 미충족",
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
                "note": "외인 46,230주 / 기관 20,825주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 97.1% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 90.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 63.5% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 116% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 7% / 윗꼬리·몸통 1.83 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1135000,
            "previousClose": 1095000,
            "dailyChange": 40000,
            "dailyChangePct": 3.65,
            "dailyDirection": "up",
            "entryPriceText": "1,135,000원 (당일 종가 기준)",
            "entryPrice": 1135000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 26.9095,
            "marketCapRank": 30,
            "marketCapUniverseCount": 2560,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 46,230주 / 기관 20,825주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 90.0,
              "note": "토스 공개 체결강도 90.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 152.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 152.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5492,
              "last30BuyVolume": 457.0,
              "last30SellVolume": 295.0
            },
            "orderbook": {
              "bidAskRatio": 0.624,
              "bidTotal": 1092,
              "askTotal": 1750,
              "note": "Naver 호가잔량합계 매수 1,092 / 매도 1,750",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 89.67, ATR10 19.72%, 일간 표준편차 10.00%, 당일 레인지 16.71%.",
              "metrics": {
                "atrPct10": 19.72,
                "returnStd20": 10.0,
                "todayRangePct": 16.71,
                "vkospi": 89.67
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
              "referenceClusterPct": 1.0,
              "referencePrice": 1115000,
              "referenceBandLow": 1115000,
              "referenceBandHigh": 1115000,
              "entryDayOpenPrice": 1147000,
              "fallbackStopPrice": 1066900,
              "effectiveHardStopPrice": 1115000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 1,115,000원와 기존 % 손절 1,066,900원 중 더 높은 1,115,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 1,115,000원이며, 기존 % 손절 1,066,900원보다 느슨해지지 않게 1,115,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,169,000원",
                "historicalHitRate": 0.6105,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+4.7%",
                "targetPrice": "1,188,000원",
                "historicalHitRate": 0.4211,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+10.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,248,500원",
                "historicalHitRate": 0.3474,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "1,293,900원",
                "historicalHitRate": 0.2947,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+19.0%",
                "targetPrice": "1,350,650원",
                "historicalHitRate": 0.2151,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,115,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "1,115,000원"
              }
            ],
            "rr": "1 : 6.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1121380,
              "high": 1132730,
              "anchor": 1135000,
              "label": "1,121,380~1,132,730원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,050원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+6.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,203,100원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "1,350,650원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,115,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,115,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "1,350,650원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,115,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,115,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "1,350,650원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,115,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,115,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
              "sampleCount": 9,
              "ev": 0.8205
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 93건)",
              "hitRate": 0.2151,
              "ev": 2.303,
              "sampleCount": 93
            },
            "breakoutLiveExitPolicy": {
              "version": "breakout-live-exit-v1",
              "wickClimaxLookbackBars": 20,
              "wickClimaxVolumeRatioMin": 2.5,
              "wickUpperShadowRatioMin": 0.45,
              "orderbookLookbackMinutes": 5,
              "orderbookBidAskSpikeMin": 2.0,
              "orderbookAskDropRatioMax": 0.6,
              "trailingActivationPct": 4.5,
              "trailingBufferPct": 2.0,
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 62.6% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 62.6% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 116% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1135000.0,
                "vs52wHighPct": 62.56890848952591,
                "vs52wLowPct": 710.1356174161313,
                "dropFrom52wHighPct": 37.43109151047409,
                "ma20GapPct": 15.26938506068146,
                "rsi14": 60.98139771310473,
                "volumeRatio20d": 115.51670064037137,
                "rs20Pct": 81.89102564102564,
                "tradingValueRank": 16.0,
                "marketCapRank": 30.0,
                "marketCapTrillion": 26.9095,
                "per": 55.51,
                "pbr": 4.42,
                "cnsPer": 34.41,
                "foreignRate": 23.28,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "삼성에스디에스",
            "code": "018260",
            "strictScore": 2.4,
            "signalScore": 3.1,
            "score": 3.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.1,
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
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 34,684주 / 기관 978주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 75.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 63.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 88% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 94.3% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 35% / 윗꼬리·몸통 0.20 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 3.33 (필요 ≥ 1.2) · 매수 잔량 우위"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G2, G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 -23.6% / 20일 초과 +33.2%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 63.5% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 38",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 88% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 35% / 윗꼬리·몸통 0.20 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +4.66% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 247,000 / 5MA 260,800 (전일 5MA 283,800) · 5MA 조건 미충족",
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
                "note": "외인 34,684주 / 기관 978주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 3.33 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 75.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 63.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 88% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 94.3% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 35% / 윗꼬리·몸통 0.20 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 247000,
            "previousClose": 236000,
            "dailyChange": 11000,
            "dailyChangePct": 4.66,
            "dailyDirection": "up",
            "entryPriceText": "247,000원 (당일 종가 기준)",
            "entryPrice": 247000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 19.2671,
            "marketCapRank": 42,
            "marketCapUniverseCount": 2560,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 34,684주 / 기관 978주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 75.0,
              "note": "토스 공개 체결강도 75.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A018260/order",
              "asOf": "2026-06-09T06:02:21Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 154.6,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 154.6,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 1.5458,
              "last30BuyVolume": 1821.0,
              "last30SellVolume": 1178.0
            },
            "orderbook": {
              "bidAskRatio": 3.3319,
              "bidTotal": 8783,
              "askTotal": 2636,
              "note": "Naver 호가잔량합계 매수 8,783 / 매도 2,636",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=018260"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 89.67, ATR10 16.77%, 일간 표준편차 11.06%, 당일 레인지 15.25%.",
              "metrics": {
                "atrPct10": 16.77,
                "returnStd20": 11.06,
                "todayRangePct": 15.25,
                "vkospi": 89.67
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
              "referenceClusterPct": 1.0,
              "referencePrice": 244000,
              "referenceBandLow": 244000,
              "referenceBandHigh": 244000,
              "entryDayOpenPrice": 259500,
              "fallbackStopPrice": 232180,
              "effectiveHardStopPrice": 244000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 244,000원와 기존 % 손절 232,180원 중 더 높은 244,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 244,000원이며, 기존 % 손절 232,180원보다 느슨해지지 않게 244,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.8%",
                "targetPrice": "254,000원",
                "historicalHitRate": 0.6105,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+5.9%",
                "targetPrice": "261,500원",
                "historicalHitRate": 0.4211,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+10.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "271,700원",
                "historicalHitRate": 0.3474,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "281,580원",
                "historicalHitRate": 0.2947,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+19.0%",
                "targetPrice": "293,930원",
                "historicalHitRate": 0.2151,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 244,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.2%",
                "targetPrice": "244,000원"
              }
            ],
            "rr": "1 : 9.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 244036,
              "high": 246506,
              "anchor": 247000,
              "label": "244,036~246,506원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "254,410원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+6.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "261,820원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "293,930원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 244,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.2%",
                    "targetPrice": "244,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "254,000원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "261,500원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "293,930원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 244,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.2%",
                    "targetPrice": "244,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "254,000원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "261,500원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "293,930원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 244,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.2%",
                    "targetPrice": "244,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
              "sampleCount": 9,
              "ev": 0.8205
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 93건)",
              "hitRate": 0.2151,
              "ev": 2.303,
              "sampleCount": 93
            },
            "breakoutLiveExitPolicy": {
              "version": "breakout-live-exit-v1",
              "wickClimaxLookbackBars": 20,
              "wickClimaxVolumeRatioMin": 2.5,
              "wickUpperShadowRatioMin": 0.45,
              "orderbookLookbackMinutes": 5,
              "orderbookBidAskSpikeMin": 2.0,
              "orderbookAskDropRatioMax": 0.6,
              "trailingActivationPct": 4.5,
              "trailingBufferPct": 2.0,
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 63.5% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 63.5% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 88% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 247000.0,
                "vs52wHighPct": 63.49614395886889,
                "vs52wLowPct": 91.77018633540372,
                "dropFrom52wHighPct": 36.50385604113111,
                "ma20GapPct": 10.339282124589579,
                "rsi14": 54.69463193350666,
                "volumeRatio20d": 87.71978275509655,
                "rs20Pct": 40.820980615735465,
                "tradingValueRank": 38.0,
                "marketCapRank": 42.0,
                "marketCapTrillion": 19.2671,
                "per": 30.08,
                "pbr": 1.94,
                "cnsPer": 27.17,
                "foreignRate": 18.27,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 7.2,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 46,230주 / 기관 20,825주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +46,230 / 전일 -60,220 · 기관 당일 +20,825 / 전일 +35,180 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 152.7% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 90.0% / 마지막 1시간 152.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 115.3% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,163,000 / 20MA 984,650 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +3.65% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +11.42% / KOSPI +7.81% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.55:1 · 평균 체결강도 152.7% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
            "statusLabel": "매수추천",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -60,220/당일 +46,230 · 기관 전일 +35,180/당일 +20,825 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,135,000 / 60MA 590,558",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 62.6% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 16",
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
                "note": "KOSPI 8,069 / 5MA 8,231 (-2.0%) · VKOSPI 89.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 46,230주 / 기관 20,825주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +46,230 / 전일 -60,220 · 기관 당일 +20,825 / 전일 +35,180 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 152.7% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 90.0% / 마지막 1시간 152.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,163,000 / 20MA 984,650 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +3.65% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +11.42% / KOSPI +7.81% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.55:1 · 평균 체결강도 152.7% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 115.3% (필요 98~102%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1135000,
            "previousClose": 1095000,
            "dailyChange": 40000,
            "dailyChangePct": 3.65,
            "dailyDirection": "up",
            "entryPriceText": "1,135,000원 (당일 종가 기준)",
            "entryPrice": 1135000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 26.9095,
            "marketCapRank": 30,
            "marketCapUniverseCount": 2560,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 46,230주 / 기관 20,825주 / 마지막 1시간 152.7% · 장후반 매수세 강화 · 마지막 30분 틱 1.55:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 90.0,
              "note": "토스 공개 체결강도 90.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 152.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 152.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5492,
              "last30BuyVolume": 457.0,
              "last30SellVolume": 295.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.67, ATR10 19.72%, 일간 표준편차 10.00%, 당일 레인지 16.71%.",
              "metrics": {
                "atrPct10": 19.72,
                "returnStd20": 10.0,
                "todayRangePct": 16.71,
                "vkospi": 89.67
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
                "targetYield": "+3.0%",
                "targetPrice": "1,169,000원",
                "historicalHitRate": 0.6788,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.7%",
                "targetPrice": "1,188,000원",
                "historicalHitRate": 0.3796,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "1,214,450원",
                "historicalHitRate": 0.2263,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,248,500원",
                "historicalHitRate": 0.1314,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "1,293,900원",
                "historicalHitRate": 0.0821,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,083,925원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.5%",
                "targetPrice": "1,083,925원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260608",
              "anchorOpen": 985000,
              "anchorClose": 1095000,
              "anchorVolumeRatio20d": 0.84,
              "anchorStopPrice": 985000,
              "fallbackStopPrice": 1083925,
              "effectiveHardStopPrice": 1083925,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 985,000원와 기존 % 손절 1,083,925원 중 더 높은 1,083,925원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 985,000원를 기준으로 잡고, 기존 % 손절 1,083,925원보다 느슨해지지 않게 1,083,925원로 고정합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1121380,
              "high": 1132730,
              "anchor": 1135000,
              "label": "1,121,380~1,132,730원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,152,025원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,050원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,214,450원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,083,925원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "1,083,925원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,152,025원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,050원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,214,450원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,083,925원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "1,083,925원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,214,450원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,083,925원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "1,083,925원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 1.1084
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 137건)",
              "hitRate": 0.6788,
              "ev": 0.277,
              "sampleCount": 137
            },
            "entryEligible": true,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "eligible",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1135000.0,
                "vs52wHighPct": 62.56890848952591,
                "vs52wLowPct": 710.1356174161313,
                "dropFrom52wHighPct": 37.43109151047409,
                "ma20GapPct": 15.26938506068146,
                "rsi14": 60.98139771310473,
                "volumeRatio20d": 115.51670064037137,
                "rs20Pct": 81.89102564102564,
                "tradingValueRank": 16.0,
                "marketCapRank": 30.0,
                "marketCapTrillion": 26.9095,
                "per": 55.51,
                "pbr": 4.42,
                "cnsPer": 34.41,
                "foreignRate": 23.28,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "삼성에스디에스",
            "code": "018260",
            "strictScore": 7.9,
            "signalScore": 7.9,
            "score": 7.9,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 6.6,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 34,684주 / 기관 978주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +34,684 / 전일 +86,863 · 기관 당일 +978 / 전일 -17,293 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 154.6% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 75.0% / 마지막 1시간 154.6% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 110.3% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 260,800 / 20MA 223,855 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 72% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +4.66% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +0.03% / KOSPI +7.81% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.55:1 · 평균 체결강도 154.6% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
            "statusLabel": "관심후보",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +86,863/당일 +34,684 · 기관 전일 -17,293/당일 +978 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 247,000 / 60MA 183,658",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 63.5% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 38",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 88% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,069 / 5MA 8,231 (-2.0%) · VKOSPI 89.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 34,684주 / 기관 978주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +34,684 / 전일 +86,863 · 기관 당일 +978 / 전일 -17,293 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 154.6% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 75.0% / 마지막 1시간 154.6% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 260,800 / 20MA 223,855 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 72% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +4.66% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.55:1 · 평균 체결강도 154.6% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 110.3% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +0.03% / KOSPI +7.81% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 247000,
            "previousClose": 236000,
            "dailyChange": 11000,
            "dailyChangePct": 4.66,
            "dailyDirection": "up",
            "entryPriceText": "247,000원 (당일 종가 기준)",
            "entryPrice": 247000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 19.2671,
            "marketCapRank": 42,
            "marketCapUniverseCount": 2560,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 34,684주 / 기관 978주 / 마지막 1시간 154.6% · 장후반 매수세 강화 · 마지막 30분 틱 1.55:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 75.0,
              "note": "토스 공개 체결강도 75.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A018260/order",
              "asOf": "2026-06-09T06:02:21Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 154.6,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 154.6,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 1.5458,
              "last30BuyVolume": 1821.0,
              "last30SellVolume": 1178.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.67, ATR10 16.77%, 일간 표준편차 11.06%, 당일 레인지 15.25%.",
              "metrics": {
                "atrPct10": 16.77,
                "returnStd20": 11.06,
                "todayRangePct": 15.25,
                "vkospi": 89.67
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
                "targetYield": "+2.8%",
                "targetPrice": "254,000원",
                "historicalHitRate": 0.6788,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.9%",
                "targetPrice": "261,500원",
                "historicalHitRate": 0.3796,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "264,290원",
                "historicalHitRate": 0.2263,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "271,700원",
                "historicalHitRate": 0.1314,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "281,580원",
                "historicalHitRate": 0.0821,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 235,885원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.5%",
                "targetPrice": "235,885원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260608",
              "anchorOpen": 217500,
              "anchorClose": 236000,
              "anchorVolumeRatio20d": 0.59,
              "anchorStopPrice": 217500,
              "fallbackStopPrice": 235885,
              "effectiveHardStopPrice": 235885,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 217,500원와 기존 % 손절 235,885원 중 더 높은 235,885원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 217,500원를 기준으로 잡고, 기존 % 손절 235,885원보다 느슨해지지 않게 235,885원로 고정합니다."
            },
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 244036,
              "high": 246506,
              "anchor": 247000,
              "label": "244,036~246,506원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "250,705원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "254,410원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "264,290원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 235,885원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "235,885원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "250,705원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "254,410원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "264,290원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 235,885원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "235,885원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "254,000원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "261,500원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "264,290원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 235,885원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "235,885원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 1.1084
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 137건)",
              "hitRate": 0.6788,
              "ev": 0.277,
              "sampleCount": 137
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 247000.0,
                "vs52wHighPct": 63.49614395886889,
                "vs52wLowPct": 91.77018633540372,
                "dropFrom52wHighPct": 36.50385604113111,
                "ma20GapPct": 10.339282124589579,
                "rsi14": 54.69463193350666,
                "volumeRatio20d": 87.71978275509655,
                "rs20Pct": 40.820980615735465,
                "tradingValueRank": 38.0,
                "marketCapRank": 42.0,
                "marketCapTrillion": 19.2671,
                "per": 30.08,
                "pbr": 1.94,
                "cnsPer": 27.17,
                "foreignRate": 18.27,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "NAVER",
            "code": "035420",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 5.9,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 325,140주 / 기관 1,427,219주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +325,140 / 전일 -147,900 · 기관 당일 +1,427,219 / 전일 +135,906 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 155.4% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 74.0% / 마지막 1시간 155.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 113.6% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 267,300 / 20MA 223,570 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 81% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -8.96% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +3.38% / KOSPI +7.81% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.56:1 · 평균 체결강도 155.4% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -147,900/당일 +325,140 · 기관 전일 +135,906/당일 +1,427,219 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 254,000 / 60MA 215,382",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 82.3% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 6",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 210% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,069 / 5MA 8,231 (-2.0%) · VKOSPI 89.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 325,140주 / 기관 1,427,219주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +325,140 / 전일 -147,900 · 기관 당일 +1,427,219 / 전일 +135,906 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 155.4% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 74.0% / 마지막 1시간 155.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 267,300 / 20MA 223,570 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 81% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.56:1 · 평균 체결강도 155.4% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 113.6% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -8.96% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +3.38% / KOSPI +7.81% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 254000,
            "previousClose": 279000,
            "dailyChange": -25000,
            "dailyChangePct": -8.96,
            "dailyDirection": "down",
            "entryPriceText": "254,000원 (당일 종가 기준)",
            "entryPrice": 254000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 39.8459,
            "marketCapRank": 19,
            "marketCapUniverseCount": 2560,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 325,140주 / 기관 1,427,219주 / 마지막 1시간 155.4% · 장후반 매수세 강화 · 마지막 30분 틱 1.56:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 74.0,
              "note": "토스 공개 체결강도 74.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 155.4,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 155.4,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5603,
              "last30BuyVolume": 660.0,
              "last30SellVolume": 423.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.67, ATR10 13.06%, 일간 표준편차 6.21%, 당일 레인지 16.31%.",
              "metrics": {
                "atrPct10": 13.06,
                "returnStd20": 6.21,
                "todayRangePct": 16.31,
                "vkospi": 89.67
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
                "targetYield": "+4.9%",
                "targetPrice": "266,500원",
                "historicalHitRate": 0.6788,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+8.3%",
                "targetPrice": "275,000원",
                "historicalHitRate": 0.3796,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+8.3%",
                "targetPrice": "275,000원",
                "historicalHitRate": 0.2263,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "279,400원",
                "historicalHitRate": 0.1314,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "289,560원",
                "historicalHitRate": 0.0821,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 242,570원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.5%",
                "targetPrice": "242,570원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260608",
              "anchorOpen": 239500,
              "anchorClose": 279000,
              "anchorVolumeRatio20d": 3.79,
              "anchorStopPrice": 239500,
              "fallbackStopPrice": 242570,
              "effectiveHardStopPrice": 242570,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 239,500원와 기존 % 손절 242,570원 중 더 높은 242,570원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 239,500원를 기준으로 잡고, 기존 % 손절 242,570원보다 느슨해지지 않게 242,570원로 고정합니다."
            },
            "rr": "1 : 2.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 250952,
              "high": 253492,
              "anchor": 254000,
              "label": "250,952~253,492원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 266500,
                "secondaryResistancePrice": 275000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "257,810원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "261,620원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "271,780원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 242,570원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "242,570원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 266500,
                "secondaryResistancePrice": 275000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "257,810원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "261,620원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "271,780원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 242,570원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "242,570원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistancePrice": 266500,
                "secondaryResistancePrice": 275000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.9%",
                    "targetPrice": "266,500원",
                    "historicalHitRate": 0.6788,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+8.3%",
                    "targetPrice": "275,000원",
                    "historicalHitRate": 0.3796,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+8.3%",
                    "targetPrice": "275,000원",
                    "historicalHitRate": 0.2263,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.1314,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.0821,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 242,570원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.5%",
                    "targetPrice": "242,570원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 137건)",
                  "hitRate": 0.6788,
                  "ev": 0.277,
                  "sampleCount": 137
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 1.1084
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 137건)",
              "hitRate": 0.6788,
              "ev": 0.277,
              "sampleCount": 137
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 210% (필요 < 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 210% (필요 < 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 254000.0,
                "vs52wHighPct": 82.33387358184766,
                "vs52wLowPct": 33.123689727463315,
                "dropFrom52wHighPct": 17.666126418152352,
                "ma20GapPct": 13.61094959073221,
                "rsi14": 58.52641480044623,
                "volumeRatio20d": 209.56440368537264,
                "rs20Pct": 18.13953488372093,
                "tradingValueRank": 6.0,
                "marketCapRank": 19.0,
                "marketCapTrillion": 39.8459,
                "per": 22.05,
                "pbr": 1.29,
                "cnsPer": 20.31,
                "foreignRate": 34.91,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 7.8,
            "signalScore": 7.8,
            "score": 7.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.8,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -60,220→46,230 / 기관 35,180→20,825 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 90.0% / 마지막 1시간 152.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,135,000 / 20MA 984,650 (115.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 81% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 1150000, 전봉 종가 1123000 충족"
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
                "note": "당일 거래대금 순위 16위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 26.9조 (필요 ≥ 5조)",
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
                "note": "최근 진입 이력 2건 · 손절 없음 (최근: 2026-06-04) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +78.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -36.5% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,135,000 / 60MA 590,558",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -18.2% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 12.42)",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -60,220→46,230 / 기관 35,180→20,825 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 90.0% / 마지막 1시간 152.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,135,000 / 20MA 984,650 (115.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 81% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1150000, 전봉 종가 1123000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1135000,
            "previousClose": 1095000,
            "dailyChange": 40000,
            "dailyChangePct": 3.65,
            "dailyDirection": "up",
            "entryPriceText": "1,135,000원 (당일 종가 기준)",
            "entryPrice": 1135000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 26.9095,
            "marketCapRank": 30,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -36.5% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1150000, 전봉 종가 1123000",
              "latestOpen": 1123000.0,
              "latestClose": 1150000.0,
              "previousClose": 1123000.0
            },
            "toss": {
              "avgStrength": 90.0,
              "note": "토스 공개 체결강도 90.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 152.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 152.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5492,
              "last30BuyVolume": 457.0,
              "last30SellVolume": 295.0
            },
            "orderbook": {
              "bidAskRatio": 0.624,
              "bidTotal": 1092,
              "askTotal": 1750,
              "note": "Naver 호가잔량합계 매수 1,092 / 매도 1,750",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 89.67, ATR10 19.72%, 일간 표준편차 10.00%, 당일 레인지 16.71%.",
              "metrics": {
                "atrPct10": 19.72,
                "returnStd20": 10.0,
                "todayRangePct": 16.71,
                "vkospi": 89.67
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,169,000원",
                "historicalHitRate": 0.7,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+4.7%",
                "targetPrice": "1,188,000원",
                "historicalHitRate": 0.6308,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,100,950원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,100,950원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 986000,
              "fallbackStopPrice": 1100950,
              "effectiveHardStopPrice": 1100950,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 986,000원와 기존 % 손절 1,100,950원 중 더 높은 1,100,950원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 986,000원이며, 기존 % 손절 1,100,950원보다 느슨해지지 않게 1,100,950원으로 고정하고 종가 기준으로 확인합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1.0,
              "breakevenActivationPct": 3.0,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1121380,
              "high": 1132730,
              "anchor": 1135000,
              "label": "1,121,380~1,132,730원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1788000,
                "retrace33Price": 1350490,
                "retrace50Price": 1461500,
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+57.5%",
                    "targetPrice": "1,788,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,100,950원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,100,950원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1788000,
                "retrace33Price": 1350490,
                "retrace50Price": 1461500,
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,100,950원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,100,950원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "recentHighPrice": 1788000,
                "retrace33Price": 1350490,
                "retrace50Price": 1461500,
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,100,950원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,100,950원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.0096
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 130건)",
              "hitRate": 0.7,
              "ev": 1.66,
              "sampleCount": 130
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -36.5% (필요 -5%~-25%)",
            "statusReason": "G2 미충족: 20일 고점 대비 -36.5% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1135000.0,
                "vs52wHighPct": 62.56890848952591,
                "vs52wLowPct": 710.1356174161313,
                "dropFrom52wHighPct": 37.43109151047409,
                "ma20GapPct": 15.26938506068146,
                "rsi14": 60.98139771310473,
                "volumeRatio20d": 115.51670064037137,
                "rs20Pct": 81.89102564102564,
                "tradingValueRank": 16.0,
                "marketCapRank": 30.0,
                "marketCapTrillion": 26.9095,
                "per": 55.51,
                "pbr": 4.42,
                "cnsPer": 34.41,
                "foreignRate": 23.28,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 6.5,
            "signalScore": 6.5,
            "score": 6.5,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.5,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -40,670→5,844 / 기관 49,115→-61,709 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 92.8% / 마지막 1시간 113.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 192,100 / 20MA 191,605 (100.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 37% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 56% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.01 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 194700, 전봉 종가 195200 미달"
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
                "note": "시총 8.9조 (필요 ≥ 5조)",
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
                "note": "최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +42.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -24.7% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 192,100 / 60MA 120,457",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -16.2% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 1.84)",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -40,670→5,844 / 기관 49,115→-61,709 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 92.8% / 마지막 1시간 113.2% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 192,100 / 20MA 191,605 (100.3% · 필요 ≥ 98%) · 20MA 근접 회복",
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
                "note": "당일 레인지 상단 37% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 56% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 194700, 전봉 종가 195200 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 192100,
            "previousClose": 182800,
            "dailyChange": 9300,
            "dailyChangePct": 5.09,
            "dailyDirection": "up",
            "entryPriceText": "192,100원 (당일 종가 기준)",
            "entryPrice": 192100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.929,
            "marketCapRank": 78,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -24.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 주성엔지니어링 (036930) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 194700, 전봉 종가 195200",
              "latestOpen": 195300.0,
              "latestClose": 194700.0,
              "previousClose": 195200.0
            },
            "toss": {
              "avgStrength": 92.8,
              "note": "토스 공개 체결강도 92.8% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-06-09T06:02:19Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 113.2,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 113.2,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.7861,
              "last30BuyVolume": 926.0,
              "last30SellVolume": 1178.0
            },
            "orderbook": {
              "bidAskRatio": 1.0104,
              "bidTotal": 2244,
              "askTotal": 2221,
              "note": "Naver 호가잔량합계 매수 2,244 / 매도 2,221",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 89.67, ATR10 15.66%, 일간 표준편차 12.91%, 당일 레인지 11.65%.",
              "metrics": {
                "atrPct10": 15.66,
                "returnStd20": 12.91,
                "todayRangePct": 11.65,
                "vkospi": 89.67
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "197,863원",
                "historicalHitRate": 0.7,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "201,705원",
                "historicalHitRate": 0.6308,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 186,337원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "186,337원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 184200,
              "fallbackStopPrice": 186337,
              "effectiveHardStopPrice": 186337,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 184,200원와 기존 % 손절 186,337원 중 더 높은 186,337원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 184,200원이며, 기존 % 손절 186,337원보다 느슨해지지 않게 186,337원으로 고정하고 종가 기준으로 확인합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1.0,
              "breakevenActivationPct": 3.0,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 189795,
              "high": 191716,
              "anchor": 192100,
              "label": "189,795~191,716원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 255000,
                "retrace33Price": 212857,
                "retrace50Price": 223550,
                "nearestResistancePrice": 199300,
                "secondaryResistancePrice": 203000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.7%",
                    "targetPrice": "199,300원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.7%",
                    "targetPrice": "203,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+32.7%",
                    "targetPrice": "255,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,337원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "186,337원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 255000,
                "retrace33Price": 212857,
                "retrace50Price": 223550,
                "nearestResistancePrice": 199300,
                "secondaryResistancePrice": 203000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.7%",
                    "targetPrice": "199,300원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.7%",
                    "targetPrice": "203,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,337원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "186,337원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "recentHighPrice": 255000,
                "retrace33Price": 212857,
                "retrace50Price": 223550,
                "nearestResistancePrice": 199300,
                "secondaryResistancePrice": 203000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "197,863원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "201,705원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,337원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "186,337원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.0096
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 130건)",
              "hitRate": 0.7,
              "ev": 1.66,
              "sampleCount": 130
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단",
            "statusReason": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 192100.0,
                "vs52wHighPct": 75.33333333333333,
                "vs52wLowPct": 637.4280230326295,
                "dropFrom52wHighPct": 24.666666666666668,
                "ma20GapPct": 0.2583439889355706,
                "rsi14": 53.76317316301095,
                "volumeRatio20d": 61.70504061909381,
                "rs20Pct": 38.30093592512599,
                "tradingValueRank": 26.0,
                "marketCapRank": 78.0,
                "marketCapTrillion": 8.929,
                "per": 1334.03,
                "pbr": 14.96,
                "cnsPer": 0.0,
                "foreignRate": 9.09,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "SK스퀘어",
            "code": "402340",
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
                "note": "외인 40,876→7,021 / 기관 -25,435→-24,451 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 105.0% / 마지막 1시간 169.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,256,000 / 20MA 1,190,000 (105.5% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 88% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 73% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.81 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 1260000, 전봉 종가 1247000 충족"
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
                "note": "당일 거래대금 순위 11위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 165.7조 (필요 ≥ 5조)",
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
                "note": "최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +14.3% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -9.8% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,256,000 / 60MA 837,733",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -11.1% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "당일 평균 105.0% / 마지막 1시간 169.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,256,000 / 20MA 1,190,000 (105.5% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 88% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1260000, 전봉 종가 1247000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 40,876→7,021 / 기관 -25,435→-24,451 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 73% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.81 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1256000,
            "previousClose": 1118000,
            "dailyChange": 138000,
            "dailyChangePct": 12.34,
            "dailyDirection": "up",
            "entryPriceText": "1,256,000원 (당일 종가 기준)",
            "entryPrice": 1256000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 165.7397,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -9.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1260000, 전봉 종가 1247000",
              "latestOpen": 1248000.0,
              "latestClose": 1260000.0,
              "previousClose": 1247000.0
            },
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 169.1,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 169.1,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.1509,
              "last30BuyVolume": 1254.0,
              "last30SellVolume": 583.0
            },
            "orderbook": {
              "bidAskRatio": 0.8133,
              "bidTotal": 1185,
              "askTotal": 1457,
              "note": "Naver 호가잔량합계 매수 1,185 / 매도 1,457",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 89.67, ATR10 9.47%, 일간 표준편차 6.60%, 당일 레인지 11.18%.",
              "metrics": {
                "atrPct10": 9.47,
                "returnStd20": 6.6,
                "todayRangePct": 11.18,
                "vkospi": 89.67
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "1,269,000원",
                "historicalHitRate": 0.7,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+2.6%",
                "targetPrice": "1,289,000원",
                "historicalHitRate": 0.6308,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,218,320원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,218,320원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1146000,
              "fallbackStopPrice": 1218320,
              "effectiveHardStopPrice": 1218320,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,146,000원와 기존 % 손절 1,218,320원 중 더 높은 1,218,320원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,146,000원이며, 기존 % 손절 1,218,320원보다 느슨해지지 않게 1,218,320원으로 고정하고 종가 기준으로 확인합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1.0,
              "breakevenActivationPct": 3.0,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 0.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1240928,
              "high": 1253488,
              "anchor": 1256000,
              "label": "1,240,928~1,253,488원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1300880,
                "retrace50Price": 1324000,
                "nearestResistancePrice": 1269000,
                "secondaryResistancePrice": 1289000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,269,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,289,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+10.8%",
                    "targetPrice": "1,392,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,218,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,218,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1300880,
                "retrace50Price": 1324000,
                "nearestResistancePrice": 1269000,
                "secondaryResistancePrice": 1289000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,269,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,289,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,218,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,218,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "recentHighPrice": 1392000,
                "retrace33Price": 1300880,
                "retrace50Price": 1324000,
                "nearestResistancePrice": 1269000,
                "secondaryResistancePrice": 1289000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,269,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,289,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,218,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,218,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.0096
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 130건)",
              "hitRate": 0.7,
              "ev": 1.66,
              "sampleCount": 130
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G1",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단 · 외 1건",
            "statusReason": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단 / G1 미충족: 1개월 수익률 +14.3% (필요 ≥ +15%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1256000.0,
                "vs52wHighPct": 90.22988505747126,
                "vs52wLowPct": 899.2044550517104,
                "dropFrom52wHighPct": 9.770114942528735,
                "ma20GapPct": 5.546218487394958,
                "rsi14": 59.425081221025835,
                "volumeRatio20d": 70.91048307665298,
                "rs20Pct": 14.389799635701275,
                "tradingValueRank": 11.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 165.7397,
                "per": 10.67,
                "pbr": 4.59,
                "cnsPer": 4.56,
                "foreignRate": 49.22,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "swing": []
      },
      "dataQuality": {
        "status": "partial",
        "source": "live-public-run",
        "counts": {
          "stale": 0
        },
        "staleKeys": []
      }
    }
  ],
  "analysisDate": "2026-06-09"
};
