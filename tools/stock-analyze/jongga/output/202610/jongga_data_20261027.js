window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-10-27"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-10-27T08:33:52+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 19,
      "failed": 0,
      "stale": 0,
      "manual": 4,
      "fallback": 1,
      "slots": 1
    },
    "failedKeys": [
      "toss 036930: HTTP Error 400: Bad Request",
      "toss 028050: HTTP Error 400: Bad Request",
      "toss 005930: HTTP Error 400: Bad Request",
      "toss 009150: HTTP Error 400: Bad Request",
      "toss 000660: HTTP Error 400: Bad Request",
      "toss 402340: HTTP Error 400: Bad Request",
      "toss 005380: HTTP Error 400: Bad Request",
      "toss 006400: HTTP Error 400: Bad Request",
      "toss 042700: HTTP Error 400: Bad Request",
      "toss 327260: HTTP Error 400: Bad Request",
      "toss 353200: HTTP Error 400: Bad Request",
      "toss 222800: HTTP Error 400: Bad Request",
      "toss 373220: HTTP Error 400: Bad Request",
      "toss 105560: HTTP Error 400: Bad Request",
      "toss 207940: HTTP Error 400: Bad Request",
      "toss 148020: HTTP Error 400: Bad Request",
      "toss 055550: HTTP Error 400: Bad Request",
      "toss 329180: HTTP Error 400: Bad Request",
      "toss 035420: HTTP Error 400: Bad Request"
    ],
    "staleKeys": [],
    "manualKeys": [
      "toss_metrics"
    ],
    "fallbackKeys": [
      "overtime_price"
    ],
    "providerHealth": {
      "naver_mobile": {
        "ok": 19
      },
      "naver_chart": {
        "ok": 19
      },
      "naver_integration_schedule": {
        "ok": 3
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 19
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
      "naver_overtime_board": {
        "fallback": 1
      },
      "krx_pykrx_short_balance": {
        "ok": 16
      }
    },
    "fallbackUsage": [
      {
        "key": "overtime_price",
        "provider": "naver_overtime_board",
        "layer": "session_close",
        "fallbackLevel": 1,
        "confidence": 0.4,
        "stale": false
      }
    ],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 1576.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 553.4,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "G-B 🔵"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1626.9,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 428.6,
        "detail": "약세장 ⛔"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 48363.4,
        "count": 19
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 805.4,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 14709.6,
        "detail": "후보 16종목 중 16건 수집",
        "count": 16
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 8275.2,
        "detail": "성공 19 / 실패 0",
        "count": 19
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "partial",
        "durationMs": 7792.5,
        "detail": "direct-http · 체결강도 0 / 호가 0 / 틱프록시 0",
        "count": 19
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 75.2,
        "detail": "pullback 0, breakout 0, accumulation 0, reversal 3",
        "count": 3
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 19572.6,
        "detail": "playwright-chromium · KIND 3",
        "count": 3
      },
      {
        "step": "blacklist_check",
        "label": "공매도 과열·투자 주의 검증",
        "status": "ok",
        "durationMs": 27550.8,
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
            "value": "5638.34 (+3.09%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 51.33"
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
            "value": "G-B 🔵 (+3.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 80% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6511.89",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6192.19",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 51.33",
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
          "marketAnalyzeDate": "20261027",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "약세장 ⛔",
          "regimeAdjustmentReason": "기술 레짐 유지",
          "riseJustified": false,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 76.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 43.48,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 57.324197022851074,
          "stageOverrideReason": "지지력 보정: raw P 58 -> adjusted P 57 · F_support 4점",
          "kospiClose": 5638.34,
          "kospiMa5": 5585.508,
          "vkospiValue": 51.33,
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
            "actualValue": "+0.87%",
            "baseScore": "+1점",
            "weight": "×2.5",
            "formula": "+1 × 2.5 = +2.5점",
            "weightedScore": "+2.5점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+18.37",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-13.1bp",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+2.59원",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-2.06%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "+3.5점",
        "grade": "G-B 🔵",
        "code": "G-B",
        "entryAdjustment": "✅ 100% 진입 / ✅ 80% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 유지",
        "swingAdjustment": "허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-10-28T03:59:00+00:00",
          "vix": "2026-10-27T20:15:00+00:00",
          "tnx": "2026-10-27T19:00:00+00:00",
          "krw": "2026-10-27T23:59:00+00:00",
          "sox": "2026-10-28T00:00:00+00:00"
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
            "name": "NAVER",
            "code": "035420",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 7.0,
            "gradeScore": 7.4,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 35,464→56,068 / 기관 -79,384→19,701 · 순매수 전환"
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
                "note": "종가 182,000 / 20MA 183,175 (99.4% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 86% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 155% (필요 ≥ 200%)"
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
                "note": "직전 30분봉 종가 174300, 전봉 종가 174900 미달"
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
                "note": "당일 거래대금 순위 37위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 27.7조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-10-20 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-10-17~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -9.5% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -9.2% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 182,000 / 60MA 202,543",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -2.1% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
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
                "note": "20MA 이격 -0.6% (≤+22%) · RSI14 45 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 35,464→56,068 / 기관 -79,384→19,701 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 182,000 / 20MA 183,175 (99.4% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 86% (필요 ≥ 50%)",
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
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 155% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 174300, 전봉 종가 174900 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 182000,
            "previousClose": 174400,
            "dailyChange": 7600,
            "dailyChangePct": 4.36,
            "dailyDirection": "up",
            "entryPriceText": "182,000원 (당일 종가 기준)",
            "entryPrice": 182000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 27.6838,
            "marketCapRank": 21,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -9.2% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 NAVER (035420) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A035420/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 NAVER (035420) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 NAVER (035420) 호가창을 엽니다.",
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
              "note": "KIND 최근공시 2026-10-20 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 174300, 전봉 종가 174900",
              "latestOpen": 174300.0,
              "latestClose": 174300.0,
              "previousClose": 174900.0
            },
            "toss": {},
            "orderbook": {},
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "neutral",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 51.33, ATR10 4.01%, 일간 표준편차 2.35%, 당일 레인지 5.50%.",
              "metrics": {
                "atrPct10": 4.01,
                "returnStd20": 2.35,
                "todayRangePct": 5.5,
                "vkospi": 51.33
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
                "targetPrice": "187,460원",
                "historicalHitRate": 0.5,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.5%",
                "targetPrice": "188,400원",
                "historicalHitRate": 0.3333,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 179,270원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "179,270원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 173700,
              "fallbackStopPrice": 179270,
              "effectiveHardStopPrice": 179270,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 173,700원와 기존 % 손절 179,270원 중 더 높은 179,270원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 173,700원이며, 기존 % 손절 179,270원보다 느슨해지지 않게 179,270원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 179634,
              "high": 181454,
              "anchor": 182000,
              "label": "179,634~181,454원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 200500,
                "retrace33Price": 188105,
                "retrace50Price": 191250,
                "nearestResistancePrice": 183000,
                "secondaryResistancePrice": 188400,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.4%",
                    "targetPrice": "188,105원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "188,400원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+10.2%",
                    "targetPrice": "200,500원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 179,270원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "179,270원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 200500,
                "retrace33Price": 188105,
                "retrace50Price": 191250,
                "nearestResistancePrice": 183000,
                "secondaryResistancePrice": 188400,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.4%",
                    "targetPrice": "188,105원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "188,400원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 179,270원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "179,270원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 200500,
                "retrace33Price": 188105,
                "retrace50Price": 191250,
                "nearestResistancePrice": 183000,
                "secondaryResistancePrice": 188400,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "187,460원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "188,400원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 179,270원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "179,270원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
              "sampleCount": 23,
              "ev": 0.1529
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 24건)",
              "hitRate": 0.5,
              "ev": 1.001,
              "sampleCount": 24
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
              "핵심 Gate 미충족: G3",
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -9.5% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 -9.5% (필요 ≥ +15%) / G3 미충족: 종가 182,000 / 60MA 202,543 / G4 미충족: 최근 5거래일 최저 -2.1% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 182000.0,
                "vs52wHighPct": 58.995137763371154,
                "vs52wLowPct": 6.495026331187829,
                "dropFrom52wHighPct": 41.004862236628846,
                "ma20GapPct": -0.6414630817524225,
                "rsi14": 45.219525151395395,
                "volumeRatio20d": 109.85590858957445,
                "rs20Pct": -7.142857142857142,
                "tradingValueRank": 37.0,
                "marketCapRank": 21.0,
                "marketCapTrillion": 27.6838,
                "per": 14.12,
                "pbr": 0.92,
                "cnsPer": 14.82,
                "foreignRate": 35.49,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -9.639914994377543
              },
              "evaluatedAt": "2026-10-27T17:33:05+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "삼성SDI",
            "code": "006400",
            "strictScore": 4.0,
            "signalScore": 4.0,
            "score": 4.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 7.0,
            "gradeScore": 5.7,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -68,888→-12,796 / 기관 -40,511→1,512 · 순매수 전환"
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
                "note": "종가 509,000 / 20MA 538,875 (94.5% · 필요 ≥ 98%)"
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
                "note": "당일 거래량 / 5일 평균 79% (필요 ≥ 200%)"
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
                "note": "직전 30분봉 종가 508000, 전봉 종가 508000 미달"
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
                "note": "당일 거래대금 순위 23위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 41.0조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-10-19까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-10-20) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -4.1% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -15.2% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 509,000 / 60MA 515,300",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -7.5% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 -5.5% (≤+22%) · RSI14 46 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -68,888→-12,796 / 기관 -40,511→1,512 · 순매수 전환",
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
                "code": "S2",
                "note": "토스 체결강도 데이터 없음 (수동 입력 필요)",
                "evalStatus": "manual_required"
              },
              {
                "code": "P1",
                "note": "종가 509,000 / 20MA 538,875 (94.5% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 79% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 508000, 전봉 종가 508000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 509000,
            "previousClose": 484000,
            "dailyChange": 25000,
            "dailyChangePct": 5.17,
            "dailyDirection": "up",
            "entryPriceText": "509,000원 (당일 종가 기준)",
            "entryPrice": 509000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 41.018,
            "marketCapRank": 13,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -15.2% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A006400/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성SDI (006400) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A006400/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성SDI (006400) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A006400/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성SDI (006400) 호가창을 엽니다.",
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
              "note": "KIND 최근공시 2026-10-19까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 508000, 전봉 종가 508000",
              "latestOpen": 508000.0,
              "latestClose": 508000.0,
              "previousClose": 508000.0
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 51.33, ATR10 8.50%, 일간 표준편차 5.35%, 당일 레인지 7.33%.",
              "metrics": {
                "atrPct10": 8.5,
                "returnStd20": 5.35,
                "todayRangePct": 7.33,
                "vkospi": 51.33
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.8%",
                "targetPrice": "518,000원",
                "historicalHitRate": 0.5,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "534,450원",
                "historicalHitRate": 0.3333,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 501,365원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "501,365원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 484500,
              "fallbackStopPrice": 501365,
              "effectiveHardStopPrice": 501365,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 484,500원와 기존 % 손절 501,365원 중 더 높은 501,365원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 484,500원이며, 기존 % 손절 501,365원보다 느슨해지지 않게 501,365원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 502383,
              "high": 507473,
              "anchor": 509000,
              "label": "502,383~507,473원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 600000,
                "retrace33Price": 539030,
                "retrace50Price": 554500,
                "nearestResistancePrice": 518000,
                "secondaryResistancePrice": 540000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "518,000원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.1%",
                    "targetPrice": "540,000원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+17.9%",
                    "targetPrice": "600,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 501,365원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "501,365원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 600000,
                "retrace33Price": 539030,
                "retrace50Price": 554500,
                "nearestResistancePrice": 518000,
                "secondaryResistancePrice": 540000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "518,000원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+6.1%",
                    "targetPrice": "540,000원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 501,365원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "501,365원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 600000,
                "retrace33Price": 539030,
                "retrace50Price": 554500,
                "nearestResistancePrice": 518000,
                "secondaryResistancePrice": 540000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "518,000원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "534,450원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 501,365원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "501,365원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
              "sampleCount": 23,
              "ev": 0.1529
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 24건)",
              "hitRate": 0.5,
              "ev": 1.001,
              "sampleCount": 24
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
              "핵심 Gate 미충족: G3",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -4.1% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 -4.1% (필요 ≥ +15%) / G3 미충족: 종가 509,000 / 60MA 515,300",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 509000.0,
                "vs52wHighPct": 62.073170731707314,
                "vs52wLowPct": 96.52509652509652,
                "dropFrom52wHighPct": 37.926829268292686,
                "ma20GapPct": -5.54395731848759,
                "rsi14": 45.58059890628719,
                "volumeRatio20d": 85.39224953901603,
                "rs20Pct": -2.3032629558541267,
                "tradingValueRank": 23.0,
                "marketCapRank": 13.0,
                "marketCapTrillion": 41.018,
                "per": 1111.35,
                "pbr": 1.65,
                "cnsPer": 42.49,
                "foreignRate": 24.8,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": 327.77853168679604
              },
              "evaluatedAt": "2026-10-27T17:33:05+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "삼성바이오로직스",
            "code": "207940",
            "strictScore": 4.0,
            "signalScore": 4.0,
            "score": 4.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 7.0,
            "gradeScore": 5.7,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -2,977→5,298 / 기관 38,852→-1,218 · 순매수 전환"
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
                "note": "종가 1,368,000 / 20MA 1,333,346 (102.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 18% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 103% (필요 ≥ 200%)"
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
                "note": "직전 30분봉 종가 1374000, 전봉 종가 1370000 미달"
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
                "note": "당일 거래대금 순위 33위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 63.3조 (필요 ≥ 5조)",
                "evalStatus": "met"
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
                "note": "최근 5거래일(2026-10-17~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -1.0% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -8.1% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 1,368,000 / 60MA 1,431,342",
                "evalStatus": "not_met"
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
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +2.6% (≤+22%) · RSI14 50 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -2,977→5,298 / 기관 38,852→-1,218 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,368,000 / 20MA 1,333,346 (102.6% · 필요 ≥ 98%) · 20MA 근접 회복",
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
                "code": "P2",
                "note": "당일 레인지 상단 18% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 103% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1374000, 전봉 종가 1370000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1368000,
            "previousClose": 1449000,
            "dailyChange": -81000,
            "dailyChangePct": -5.59,
            "dailyDirection": "down",
            "entryPriceText": "1,368,000원 (당일 종가 기준)",
            "entryPrice": 1368000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 63.326,
            "marketCapRank": 6,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -8.1% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A207940/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성바이오로직스 (207940) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A207940/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성바이오로직스 (207940) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A207940/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성바이오로직스 (207940) 호가창을 엽니다.",
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
              "note": "직전 30분봉 종가 1374000, 전봉 종가 1370000",
              "latestOpen": 1374000.0,
              "latestClose": 1374000.0,
              "previousClose": 1370000.0
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 51.33, ATR10 6.54%, 일간 표준편차 3.68%, 당일 레인지 5.87%.",
              "metrics": {
                "atrPct10": 6.54,
                "returnStd20": 3.68,
                "todayRangePct": 5.87,
                "vkospi": 51.33
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "60% 익절",
                "targetYield": "+2.9%",
                "targetPrice": "1,407,930원",
                "historicalHitRate": 0.5,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+4.4%",
                "targetPrice": "1,428,500원",
                "historicalHitRate": 0.3333,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,353,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.1%",
                "targetPrice": "1,353,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1353000,
              "fallbackStopPrice": 1347480,
              "effectiveHardStopPrice": 1353000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,353,000원와 기존 % 손절 1,347,480원 중 더 높은 1,353,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,353,000원이며, 기존 % 손절 1,347,480원보다 느슨해지지 않게 1,353,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 3.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1350216,
              "high": 1363896,
              "anchor": 1368000,
              "label": "1,350,216~1,363,896원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1489000,
                "retrace33Price": 1407930,
                "retrace50Price": 1428500,
                "nearestResistancePrice": 1379299,
                "secondaryResistancePrice": 1394184,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "1,407,930원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.4%",
                    "targetPrice": "1,428,500원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+8.8%",
                    "targetPrice": "1,489,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,353,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "1,353,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1489000,
                "retrace33Price": 1407930,
                "retrace50Price": 1428500,
                "nearestResistancePrice": 1379299,
                "secondaryResistancePrice": 1394184,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "1,407,930원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+4.4%",
                    "targetPrice": "1,428,500원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,353,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "1,353,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 1489000,
                "retrace33Price": 1407930,
                "retrace50Price": 1428500,
                "nearestResistancePrice": 1379299,
                "secondaryResistancePrice": 1394184,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "1,407,930원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+4.4%",
                    "targetPrice": "1,428,500원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,353,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "1,353,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
              "sampleCount": 23,
              "ev": 0.1529
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 24건)",
              "hitRate": 0.5,
              "ev": 1.001,
              "sampleCount": 24
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
              "핵심 Gate 미충족: G3",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -1.0% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 -1.0% (필요 ≥ +15%) / G3 미충족: 종가 1,368,000 / 60MA 1,431,342 / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1368000.0,
                "vs52wHighPct": 68.84750880724711,
                "vs52wLowPct": 19.68503937007874,
                "dropFrom52wHighPct": 31.152491192752898,
                "ma20GapPct": 2.5990291566866084,
                "rsi14": 50.24451196315953,
                "volumeRatio20d": 113.87173547424871,
                "rs20Pct": 0.4088283434745272,
                "tradingValueRank": 33.0,
                "marketCapRank": 6.0,
                "marketCapTrillion": 63.326,
                "per": 38.11,
                "pbr": 7.63,
                "cnsPer": 34.5,
                "foreignRate": 12.7,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 32.85568349197801
              },
              "evaluatedAt": "2026-10-27T17:33:05+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "삼성E&A",
            "code": "028050",
            "strictScore": 3.5,
            "signalScore": 3.5,
            "score": 3.5,
            "scoreMax": 10.0,
            "effectiveScoreMax": 7.0,
            "gradeScore": 5.0,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 2,938,970→101,992 / 기관 -67,716→-5,466 · 순매수 전환 없음"
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
                "note": "종가 62,200 / 20MA 49,038 (126.8% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 55% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 60% (필요 ≥ 200%)"
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
                "note": "직전 30분봉 종가 61900, 전봉 종가 62000 미달"
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
                "note": "당일 거래대금 순위 20위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 12.2조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-10-22 연결재무제표기준영업(잠정)실적(공정공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 3건 · 손절 없음 (최근: 2026-10-26) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +21.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -2.7% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 62,200 / 60MA 48,388",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +1.7% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5-a",
                "status": "✅",
                "note": "양봉 안정화 캔들",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "20MA 이격 +26.8% (≤+22%) · RSI14 73 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "P1",
                "note": "종가 62,200 / 20MA 49,038 (126.8% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 55% (필요 ≥ 50%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 2,938,970→101,992 / 기관 -67,716→-5,466 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "토스 체결강도 데이터 없음 (수동 입력 필요)",
                "evalStatus": "manual_required"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 60% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "호가잔량 비율 미입력 (토스 호가창 수동 입력)",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 61900, 전봉 종가 62000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 62200,
            "previousClose": 60100,
            "dailyChange": 2100,
            "dailyChangePct": 3.49,
            "dailyDirection": "up",
            "entryPriceText": "62,200원 (당일 종가 기준)",
            "entryPrice": 62200,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 12.1912,
            "marketCapRank": 51,
            "marketCapUniverseCount": 2545,
            "keyPoint": "20일 고점 대비 -2.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A028050/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성E&A (028050) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A028050/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성E&A (028050) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A028050/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성E&A (028050) 호가창을 엽니다.",
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
              "note": "KIND 최근공시 2026-10-22 연결재무제표기준영업(잠정)실적(공정공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 61900, 전봉 종가 62000",
              "latestOpen": 62000.0,
              "latestClose": 61900.0,
              "previousClose": 62000.0
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 51.52, ATR10 8.02%, 일간 표준편차 5.44%, 당일 레인지 6.32%.",
              "metrics": {
                "atrPct10": 8.02,
                "returnStd20": 5.44,
                "todayRangePct": 6.32,
                "vkospi": 51.52
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+2.7%",
                "targetPrice": "63,900원",
                "historicalHitRate": 0.5,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 1 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+2.7%",
                "targetPrice": "63,900원",
                "historicalHitRate": 0.3333,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 61,267원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "61,267원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 60100,
              "fallbackStopPrice": 61267,
              "effectiveHardStopPrice": 61267,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 60,100원와 기존 % 손절 61,267원 중 더 높은 61,267원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 60,100원이며, 기존 % 손절 61,267원보다 느슨해지지 않게 61,267원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 61391,
              "high": 62013,
              "anchor": 62200,
              "label": "61,391~62,013원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 63900,
                "retrace33Price": 62761,
                "retrace50Price": 63050,
                "nearestResistancePrice": 63900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "63,900원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "63,900원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "64,066원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 61,267원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "61,267원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 63900,
                "retrace33Price": 62761,
                "retrace50Price": 63050,
                "nearestResistancePrice": 63900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "63,900원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.7%",
                    "targetPrice": "63,900원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 61,267원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "61,267원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 63900,
                "retrace33Price": 62761,
                "retrace50Price": 63050,
                "nearestResistancePrice": 63900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "63,900원",
                    "historicalHitRate": 0.5,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.7%",
                    "targetPrice": "63,900원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 61,267원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "61,267원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 24건)",
                  "hitRate": 0.5,
                  "ev": 1.001,
                  "sampleCount": 24
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
              "sampleCount": 23,
              "ev": 0.1529
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 24건)",
              "hitRate": 0.5,
              "ev": 1.001,
              "sampleCount": 24
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
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -2.7% (필요 -5%~-25%) · 외 2건",
            "statusReason": "G2 미충족: 20일 고점 대비 -2.7% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 +1.7% (필요 -3% 이하 급락 1회 이상) / Q1 미충족: 20MA 이격 +26.8% (≤+22%) · RSI14 73 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 62200.0,
                "vs52wHighPct": 92.42199108469539,
                "vs52wLowPct": 168.68250539956804,
                "dropFrom52wHighPct": 7.578008915304606,
                "ma20GapPct": 26.841702778485853,
                "rsi14": 73.15033353607546,
                "volumeRatio20d": 144.61822105347585,
                "rs20Pct": 25.403225806451612,
                "tradingValueRank": 20.0,
                "marketCapRank": 51.0,
                "marketCapTrillion": 12.1912,
                "per": 18.39,
                "pbr": 2.43,
                "cnsPer": 14.09,
                "foreignRate": 40.44,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 27.68467337605614
              },
              "evaluatedAt": "2026-10-27T15:03:16+09:00",
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
  "analysisDate": "2026-10-27",
  "pointInTime": true,
  "pointInTimeStatus": "confirmed",
  "analysisSession": "1730",
  "analysisSessionLabel": "5시반 분석",
  "sessionSources": [
    "1500",
    "1730"
  ]
};
