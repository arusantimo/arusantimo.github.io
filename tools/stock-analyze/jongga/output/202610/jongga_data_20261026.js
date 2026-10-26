window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-10-26"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-10-26T06:04:02+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 18,
      "failed": 0,
      "stale": 0,
      "manual": 4,
      "fallback": 0,
      "slots": 1
    },
    "failedKeys": [
      "toss 148020: HTTP Error 400: Bad Request",
      "toss 000660: HTTP Error 400: Bad Request",
      "toss 402340: HTTP Error 400: Bad Request",
      "toss 009150: HTTP Error 400: Bad Request",
      "toss 005930: HTTP Error 400: Bad Request",
      "toss 036930: HTTP Error 400: Bad Request",
      "toss 006400: HTTP Error 400: Bad Request",
      "toss 028050: HTTP Error 400: Bad Request",
      "toss 079550: HTTP Error 400: Bad Request",
      "toss 373220: HTTP Error 400: Bad Request",
      "toss 012450: HTTP Error 400: Bad Request",
      "toss 108490: HTTP Error 400: Bad Request",
      "toss 005380: HTTP Error 400: Bad Request",
      "toss 329180: HTTP Error 400: Bad Request",
      "toss 105560: HTTP Error 400: Bad Request",
      "toss 018260: HTTP Error 400: Bad Request",
      "toss 064400: HTTP Error 400: Bad Request",
      "toss 034020: HTTP Error 400: Bad Request"
    ],
    "staleKeys": [],
    "manualKeys": [
      "toss_metrics"
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
        "ok": 3
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 18
      },
      "toss_http_strength": {
        "ok": 0
      },
      "toss_ticks_strength_proxy": {
        "ok": 0
      },
      "toss_quotes_orderbook": {
        "ok": 0
      },
      "kind_playwright_disclosure": {
        "ok": 3
      },
      "naver_item_news": {
        "ok": 0
      },
      "cnbc_quote": {
        "ok": 1
      },
      "krx_pykrx_short_balance": {
        "ok": 16
      }
    },
    "fallbackUsage": [],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 1221.9,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 613.2,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "G-C 🟡"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1251.9,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 423.8,
        "detail": "약세장 ⛔"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 40489.9,
        "count": 18
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 14691.1,
        "detail": "후보 16종목 중 16건 수집",
        "count": 16
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 5270.8,
        "detail": "성공 18 / 실패 0",
        "count": 18
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "partial",
        "durationMs": 8360.8,
        "detail": "direct-http · 체결강도 0 / 호가 0 / 틱프록시 0",
        "count": 18
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 71.4,
        "detail": "pullback 0, breakout 0, accumulation 0, reversal 3",
        "count": 3
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 19100.7,
        "detail": "playwright-chromium · KIND 3",
        "count": 3
      },
      {
        "step": "blacklist_check",
        "label": "공매도 과열·투자 주의 검증",
        "status": "ok",
        "durationMs": 27776.5,
        "detail": "확정 0 · 미확인 0",
        "count": 3
      }
    ],
    "note": "현재 버전 채널입니다. CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 현재 버전은 토스 공개 API로 체결강도·틱 프록시·호가를 병렬 수집하고, KIND 공시는 표시 종목만 Playwright로 보강합니다. 눌림목 shortlist는 네이버 종목뉴스를 추가 확인합니다.",
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
            "value": "약세장 ⛔"
          },
          {
            "item": "기술 레짐",
            "value": "약세장 ⛔"
          },
          {
            "item": "KOSPI",
            "value": "5499.20 (-0.92%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 52.68"
          },
          {
            "item": "진입 전략",
            "value": "메인=없음 / 서브=없음 / 보조=없음"
          },
          {
            "item": "추천 슬롯",
            "value": "매집 0 · 돌파 0 · 눌림 0"
          },
          {
            "item": "스윙 전환 활성도",
            "value": "금지"
          },
          {
            "item": "시가베팅",
            "value": "비활성"
          },
          {
            "item": "역추세 트랙",
            "value": "비활성"
          },
          {
            "item": "갭 스코어",
            "value": "G-C 🟡 (-2.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 70% 진입 / ⚠️ 50% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6518.81",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6265.81",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 52.68",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 7 / 하락 13",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "기술 레짐 유지",
            "verdict": "약세장 ⛔"
          },
          {
            "item": "거시 맥락",
            "value": "표준 레짐 / RI 57.324197022851074",
            "verdict": "⚠️"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20261026",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "약세장 ⛔",
          "regimeAdjustmentReason": "기술 레짐 유지",
          "riseJustified": false,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 76.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 43.68,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 57.324197022851074,
          "stageOverrideReason": "지지력 보정: raw P 58 -> adjusted P 57 · F_support 4점",
          "kospiClose": 5499.2,
          "kospiMa5": 5574.334,
          "vkospiValue": 52.68,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": false
        },
        "technicalRegimeLabel": "약세장 ⛔",
        "effectiveRegimeLabel": "약세장 ⛔",
        "regimeAdjustmentReason": "기술 레짐 유지"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-2.76%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+19.45",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-14.8bp",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-7.92원",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-3.21%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "-2.5점",
        "grade": "G-C 🟡",
        "code": "G-C",
        "entryAdjustment": "✅ 70% 진입 / ⚠️ 50% 진입",
        "sellAdjustment": "프리마켓 갭업 기준 -0.5%p 하향 | 손절폭 -0.5%p 축소",
        "swingAdjustment": "조건부 허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-10-27T03:59:00+00:00",
          "vix": "2026-10-26T20:15:00+00:00",
          "tnx": "2026-10-26T19:00:00+00:00",
          "krw": "2026-10-26T23:59:00+00:00",
          "sox": "2026-10-27T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [],
        "breakout": [],
        "accumulation": [],
        "reversal": [
          {
            "rank": 1,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 7.0,
            "gradeScore": 6.9,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 15,375→-134,276 / 기관 -4,903→94,915 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "토스 체결강도 데이터 없음 (수동 입력 필요)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 779,000 / 20MA 951,050 (81.9% · 필요 ≥ 98%)"
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
                "note": "당일 거래량 / 5일 평균 58% (필요 ≥ 200%)"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 782000, 전봉 종가 782000 충족"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)"
              }
            ],
            "scoreScope": "reversal",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 18위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 102.8조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-10-15까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-10-23) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -31.2% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -35.1% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 779,000 / 60MA 1,012,083",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -9.7% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "✅",
                "note": "20MA 이격 -18.1% (≤+22%) · RSI14 36 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 15,375→-134,276 / 기관 -4,903→94,915 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 81% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 782000, 전봉 종가 782000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스 체결강도 데이터 없음 (수동 입력 필요)",
                "evalStatus": "manual_required"
              },
              {
                "code": "P1",
                "note": "종가 779,000 / 20MA 951,050 (81.9% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 58% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              }
            ],
            "currentPrice": 779000,
            "previousClose": 764000,
            "dailyChange": 15000,
            "dailyChangePct": 1.96,
            "dailyDirection": "up",
            "entryPriceText": "779,000원 (당일 종가 기준)",
            "entryPrice": 779000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 102.7688,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -35.1% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "토스 체결강도 미반영",
              "마지막 1시간 체결강도 미반영",
              "호가잔량 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK스퀘어 (402340) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A402340/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK스퀘어 (402340) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK스퀘어 (402340) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08"
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.lastHourAvgStrength",
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-10-15까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 782000, 전봉 종가 782000",
              "latestOpen": 781500.0,
              "latestClose": 782000.0,
              "previousClose": 782000.0
            },
            "toss": {},
            "orderbook": {},
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 52.68, ATR10 9.28%, 일간 표준편차 5.49%, 당일 레인지 5.50%.",
              "metrics": {
                "atrPct10": 9.28,
                "returnStd20": 5.49,
                "todayRangePct": 5.5,
                "vkospi": 52.68
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "787,000원",
                "historicalHitRate": 0.6604,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "817,950원",
                "historicalHitRate": 0.5472,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 763,420원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "763,420원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 745000,
              "fallbackStopPrice": 763420,
              "effectiveHardStopPrice": 763420,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 745,000원와 기존 % 손절 763,420원 중 더 높은 763,420원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 745,000원이며, 기존 % 손절 763,420원보다 느슨해지지 않게 763,420원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 766926,
              "high": 774716,
              "anchor": 779000,
              "label": "766,926~774,716원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1201000,
                "retrace33Price": 918260,
                "retrace50Price": 990000,
                "nearestResistancePrice": 787000,
                "secondaryResistancePrice": 892000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "787,000원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+14.5%",
                    "targetPrice": "892,000원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+54.2%",
                    "targetPrice": "1,201,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 763,420원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "763,420원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1201000,
                "retrace33Price": 918260,
                "retrace50Price": 990000,
                "nearestResistancePrice": 787000,
                "secondaryResistancePrice": 892000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "787,000원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+14.5%",
                    "targetPrice": "892,000원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 763,420원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "763,420원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 50건)",
                "recentHighPrice": 1201000,
                "retrace33Price": 918260,
                "retrace50Price": 990000,
                "nearestResistancePrice": 787000,
                "secondaryResistancePrice": 892000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "787,000원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "817,950원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 763,420원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "763,420원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 50건)",
              "sampleCount": 50,
              "ev": 0.7489
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 53건)",
              "hitRate": 0.6604,
              "ev": 2.091,
              "sampleCount": 53
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-reversal",
              "label": "관찰 전용",
              "active": false,
              "priority": null,
              "strategyCase": "",
              "recommendationCase": "",
              "stopPct": null,
              "stopExecution": "close",
              "stopCondition": "",
              "stopTiming": "자동 진입 제외",
              "takeProfitStages": [],
              "positionWeightHint": "observe",
              "positionWeightMultiplier": 0.0,
              "intradayRiskRule": {
                "active": false
              },
              "volatilityOverlay": {
                "active": false
              },
              "reason": "매매금지 또는 시장 차단 상태라 혼합 전략도 관찰 전용으로 둡니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G3",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -31.2% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 -31.2% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -35.1% (필요 -5%~-25%) / G3 미충족: 종가 779,000 / 60MA 1,012,083",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 779000.0,
                "vs52wHighPct": 33.31907613344739,
                "vs52wLowPct": 223.23651452282158,
                "dropFrom52wHighPct": 66.6809238665526,
                "ma20GapPct": -18.090531517796123,
                "rsi14": 35.80678230149033,
                "volumeRatio20d": 48.386988098878305,
                "rs20Pct": -31.30511463844797,
                "tradingValueRank": 18.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 102.7688,
                "per": 3.14,
                "pbr": 1.87,
                "cnsPer": 2.11,
                "foreignRate": 46.2,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 3.8014091430444044
              },
              "evaluatedAt": "2026-10-26T15:03:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "로보티즈",
            "code": "108490",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 7.0,
            "gradeScore": 6.9,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -19,653→-11,725 / 기관 -176→2,384 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "토스 체결강도 데이터 없음 (수동 입력 필요)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 251,500 / 20MA 266,200 (94.5% · 필요 ≥ 98%)"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 290% (필요 ≥ 200%) · 투매 클라이맥스"
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
                "note": "직전 30분봉 종가 252500, 전봉 종가 252500 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)"
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
                "status": "⛔",
                "note": "시총 3.7조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-10-26까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-10-16~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -18.3% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -22.4% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 251,500 / 60MA 263,437",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.9% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "✅",
                "note": "20MA 이격 -5.5% (≤+22%) · RSI14 47 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -19,653→-11,725 / 기관 -176→2,384 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 81% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 290% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스 체결강도 데이터 없음 (수동 입력 필요)",
                "evalStatus": "manual_required"
              },
              {
                "code": "P1",
                "note": "종가 251,500 / 20MA 266,200 (94.5% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 252500, 전봉 종가 252500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 251500,
            "previousClose": 226500,
            "dailyChange": 25000,
            "dailyChangePct": 11.04,
            "dailyDirection": "up",
            "entryPriceText": "251,500원 (당일 종가 기준)",
            "entryPrice": 251500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.6898,
            "marketCapRank": 117,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -22.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "토스 체결강도 미반영",
              "마지막 1시간 체결강도 미반영",
              "호가잔량 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A108490/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 로보티즈 (108490) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A108490/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 로보티즈 (108490) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A108490/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 로보티즈 (108490) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08"
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.lastHourAvgStrength",
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-10-26까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 252500, 전봉 종가 252500",
              "latestOpen": 252500.0,
              "latestClose": 252500.0,
              "previousClose": 252500.0
            },
            "toss": {},
            "orderbook": {},
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 52.68, ATR10 9.66%, 일간 표준편차 6.52%, 당일 레인지 10.38%.",
              "metrics": {
                "atrPct10": 9.66,
                "returnStd20": 6.52,
                "todayRangePct": 10.38,
                "vkospi": 52.68
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "60% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "259,045원",
                "historicalHitRate": 0.6604,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "264,075원",
                "historicalHitRate": 0.5472,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 246,470원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "246,470원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 232500,
              "fallbackStopPrice": 246470,
              "effectiveHardStopPrice": 246470,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 232,500원와 기존 % 손절 246,470원 중 더 높은 246,470원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 232,500원이며, 기존 % 손절 246,470원보다 느슨해지지 않게 246,470원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 247602,
              "high": 250117,
              "anchor": 251500,
              "label": "247,602~250,117원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 324000,
                "retrace33Price": 275425,
                "retrace50Price": 287750,
                "nearestResistancePrice": 252500,
                "secondaryResistancePrice": 256000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+9.5%",
                    "targetPrice": "275,425원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+14.4%",
                    "targetPrice": "287,750원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+28.8%",
                    "targetPrice": "324,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 246,470원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "246,470원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 324000,
                "retrace33Price": 275425,
                "retrace50Price": 287750,
                "nearestResistancePrice": 252500,
                "secondaryResistancePrice": 256000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+9.5%",
                    "targetPrice": "275,425원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+14.4%",
                    "targetPrice": "287,750원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 246,470원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "246,470원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 50건)",
                "recentHighPrice": 324000,
                "retrace33Price": 275425,
                "retrace50Price": 287750,
                "nearestResistancePrice": 252500,
                "secondaryResistancePrice": 256000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "259,045원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "264,075원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 246,470원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "246,470원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 50건)",
              "sampleCount": 50,
              "ev": 0.7489
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 53건)",
              "hitRate": 0.6604,
              "ev": 2.091,
              "sampleCount": 53
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-reversal",
              "label": "관찰 전용",
              "active": false,
              "priority": null,
              "strategyCase": "",
              "recommendationCase": "",
              "stopPct": null,
              "stopExecution": "close",
              "stopCondition": "",
              "stopTiming": "자동 진입 제외",
              "takeProfitStages": [],
              "positionWeightHint": "observe",
              "positionWeightMultiplier": 0.0,
              "intradayRiskRule": {
                "active": false
              },
              "volatilityOverlay": {
                "active": false
              },
              "reason": "매매금지 또는 시장 차단 상태라 혼합 전략도 관찰 전용으로 둡니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F2",
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G3",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) · 외 2건",
            "statusReason": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) / G1 미충족: 1개월 수익률 -18.3% (필요 ≥ +15%) / G3 미충족: 종가 251,500 / 60MA 263,437",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 251500.0,
                "vs52wHighPct": 51.117886178861795,
                "vs52wLowPct": 65.56945358788677,
                "dropFrom52wHighPct": 48.88211382113821,
                "ma20GapPct": -5.522163786626597,
                "rsi14": 46.8040247716382,
                "volumeRatio20d": 217.55495168394944,
                "rs20Pct": -16.859504132231404,
                "tradingValueRank": 27.0,
                "marketCapRank": 117.0,
                "marketCapTrillion": 3.6898,
                "per": 0.0,
                "pbr": 10.24,
                "cnsPer": -2890.8,
                "foreignRate": 6.62,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-10-26T15:03:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "LG씨엔에스",
            "code": "064400",
            "strictScore": 4.4,
            "signalScore": 4.4,
            "score": 4.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 7.0,
            "gradeScore": 6.3,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -30,936→-100,890 / 기관 302,195→217,429 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "토스 체결강도 데이터 없음 (수동 입력 필요)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 74,100 / 20MA 69,165 (107.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 76% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 129% (필요 ≥ 200%)"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 74900, 전봉 종가 74800 충족"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)"
              }
            ],
            "scoreScope": "reversal",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 39위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 7.2조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-10-15 결산실적공시 예고(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-10-16~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +6.2% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -1.2% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 74,100 / 60MA 70,853",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -3.0% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "✅",
                "note": "20MA 이격 +7.1% (≤+22%) · RSI14 58 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "P1",
                "note": "종가 74,100 / 20MA 69,165 (107.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 76% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 74900, 전봉 종가 74800 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -30,936→-100,890 / 기관 302,195→217,429 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "토스 체결강도 데이터 없음 (수동 입력 필요)",
                "evalStatus": "manual_required"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 129% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              }
            ],
            "currentPrice": 74100,
            "previousClose": 72200,
            "dailyChange": 1900,
            "dailyChangePct": 2.63,
            "dailyDirection": "up",
            "entryPriceText": "74,100원 (당일 종가 기준)",
            "entryPrice": 74100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 7.1792,
            "marketCapRank": 79,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -1.2% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "토스 체결강도 미반영",
              "마지막 1시간 체결강도 미반영",
              "호가잔량 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A064400/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 LG씨엔에스 (064400) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A064400/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 LG씨엔에스 (064400) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A064400/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 LG씨엔에스 (064400) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08"
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.lastHourAvgStrength",
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-10-15 결산실적공시 예고(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 74900, 전봉 종가 74800",
              "latestOpen": 74800.0,
              "latestClose": 74900.0,
              "previousClose": 74800.0
            },
            "toss": {},
            "orderbook": {},
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 52.68, ATR10 6.24%, 일간 표준편차 3.75%, 당일 레인지 5.12%.",
              "metrics": {
                "atrPct10": 6.24,
                "returnStd20": 3.75,
                "todayRangePct": 5.12,
                "vkospi": 52.68
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "60% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "76,323원",
                "historicalHitRate": 0.6604,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "77,805원",
                "historicalHitRate": 0.5472,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 72,618원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "72,618원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 71300,
              "fallbackStopPrice": 72618,
              "effectiveHardStopPrice": 72618,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 71,300원와 기존 % 손절 72,618원 중 더 높은 72,618원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 71,300원이며, 기존 % 손절 72,618원보다 느슨해지지 않게 72,618원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 72951,
              "high": 73692,
              "anchor": 74100,
              "label": "72,951~73,692원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 75000,
                "retrace33Price": 74397,
                "retrace50Price": 74550,
                "nearestResistancePrice": 74800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "74,841원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "75,582원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+2.5%",
                    "targetPrice": "75,952원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 72,618원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "72,618원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 75000,
                "retrace33Price": 74397,
                "retrace50Price": 74550,
                "nearestResistancePrice": 74800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "74,841원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.0%",
                    "targetPrice": "75,582원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 72,618원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "72,618원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 50건)",
                "recentHighPrice": 75000,
                "retrace33Price": 74397,
                "retrace50Price": 74550,
                "nearestResistancePrice": 74800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "76,323원",
                    "historicalHitRate": 0.6604,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "77,805원",
                    "historicalHitRate": 0.5472,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 72,618원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "72,618원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 53건)",
                  "hitRate": 0.6604,
                  "ev": 2.091,
                  "sampleCount": 53
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 50건)",
              "sampleCount": 50,
              "ev": 0.7489
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 53건)",
              "hitRate": 0.6604,
              "ev": 2.091,
              "sampleCount": 53
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-reversal",
              "label": "관찰 전용",
              "active": false,
              "priority": null,
              "strategyCase": "",
              "recommendationCase": "",
              "stopPct": null,
              "stopExecution": "close",
              "stopCondition": "",
              "stopTiming": "자동 진입 제외",
              "takeProfitStages": [],
              "positionWeightHint": "observe",
              "positionWeightMultiplier": 0.0,
              "intradayRiskRule": {
                "active": false
              },
              "volatilityOverlay": {
                "active": false
              },
              "reason": "매매금지 또는 시장 차단 상태라 혼합 전략도 관찰 전용으로 둡니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +6.2% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 +6.2% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -1.2% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 74100.0,
                "vs52wHighPct": 48.336594911937375,
                "vs52wLowPct": 36.96857670979667,
                "dropFrom52wHighPct": 51.66340508806262,
                "ma20GapPct": 7.135111689438299,
                "rsi14": 57.7424214585763,
                "volumeRatio20d": 170.60899642947436,
                "rs20Pct": 3.7815126050420167,
                "tradingValueRank": 39.0,
                "marketCapRank": 79.0,
                "marketCapTrillion": 7.1792,
                "per": 14.91,
                "pbr": 2.36,
                "cnsPer": 14.78,
                "foreignRate": 5.8,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -30.83885004824203
              },
              "evaluatedAt": "2026-10-26T15:03:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
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
  "analysisDate": "2026-10-26",
  "pointInTime": true,
  "pointInTimeStatus": "confirmed",
  "analysisSession": "1500",
  "analysisSessionLabel": "3시 분석",
  "sessionSources": [
    "1500"
  ]
};
