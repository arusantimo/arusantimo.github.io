window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-10-08T08:36:29+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "373220",
      "name": "LG에너지솔루션",
      "reasons": [
        "공매도 과열"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "042700",
      "name": "한미반도체",
      "reasons": [
        "공매도 과열"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "036930",
      "name": "주성엔지니어링",
      "reasons": [
        "공매도 과열"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    }
  ],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 20,
      "failed": 0,
      "stale": 0,
      "manual": 0,
      "fallback": 2,
      "slots": 1
    },
    "failedKeys": [],
    "staleKeys": [],
    "manualKeys": [],
    "fallbackKeys": [
      "overtime_price",
      "short_balance_trend"
    ],
    "providerHealth": {
      "naver_mobile": {
        "ok": 20
      },
      "naver_chart": {
        "ok": 20
      },
      "naver_integration_schedule": {
        "ok": 3
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 20
      },
      "toss_http_strength": {
        "ok": 20
      },
      "toss_ticks_strength_proxy": {
        "ok": 20
      },
      "toss_quotes_orderbook": {
        "ok": 20
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
        "data_missing": 19
      },
      "krx_short_balance_direct_post": {
        "ok": 19
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
      },
      {
        "key": "short_balance_trend",
        "provider": "krx_short_balance_direct_post",
        "layer": "api",
        "fallbackLevel": 2,
        "confidence": 0.75,
        "stale": false,
        "count": 19
      }
    ],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 2278.6,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 233.5,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.1,
        "detail": "G-B 🔵"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1383.4,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 570.7,
        "detail": "약세장 ⛔"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 40834.1,
        "count": 20
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 808.7,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "partial",
        "durationMs": 158935.1,
        "detail": "후보 19종목 중 19건 수집 · fallback 19건 (krx_short_balance_direct_post)",
        "count": 19
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 7086.8,
        "detail": "성공 20 / 실패 0",
        "count": 20
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 8154.5,
        "detail": "direct-http · 체결강도 20 / 호가 20 / 틱프록시 20",
        "count": 20
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 102.2,
        "detail": "pullback 0, breakout 0, accumulation 0, reversal 3",
        "count": 3
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 21043.7,
        "detail": "playwright-chromium · KIND 3",
        "count": 3
      },
      {
        "step": "blacklist_check",
        "label": "공매도 과열·투자 주의 검증",
        "status": "ok",
        "durationMs": 35299.4,
        "detail": "확정 3 · 미확인 0",
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
            "value": "6625.93 (-2.62%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 36.81"
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
            "value": "G-B 🔵 (+5.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 80% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6728.14",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6882.03",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 36.81",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 8 / 하락 12",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "기술 레짐 유지",
            "verdict": "약세장 ⛔"
          },
          {
            "item": "거시 맥락",
            "value": "표준 레짐 / RI 56.464197022851074",
            "verdict": "⚠️"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20261008",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "약세장 ⛔",
          "regimeAdjustmentReason": "기술 레짐 유지",
          "riseJustified": false,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 76.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 41.89,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 56.464197022851074,
          "stageOverrideReason": "지지력 보정: raw P 58 -> adjusted P 56 · F_support 6점",
          "kospiClose": 6625.93,
          "kospiMa5": 6869.262,
          "vkospiValue": 36.81,
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
            "actualValue": "-0.13%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+15.60",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+4.0bp",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-20.85원",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+3.46%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+5.5점",
        "grade": "G-B 🔵",
        "code": "G-B",
        "entryAdjustment": "✅ 100% 진입 / ✅ 80% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 유지",
        "swingAdjustment": "허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-10-09T03:59:00+00:00",
          "vix": "2026-10-08T20:15:00+00:00",
          "tnx": "2026-10-08T19:00:00+00:00",
          "krw": "2026-10-08T22:59:00+00:00",
          "sox": "2026-10-09T00:00:00+00:00"
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
            "name": "LG에너지솔루션",
            "code": "373220",
            "strictScore": 7.4,
            "signalScore": 7.4,
            "score": 7.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
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
                "note": "외인 -1,550→24,592 / 기관 159,325→62,307 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 140.0% / 마지막 1시간 175.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 402,500 / 20MA 364,600 (110.4% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 26% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 332% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.72 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 401000, 전봉 종가 407000 미달"
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
                "note": "시총 94.2조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-10-08 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-10-06) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +12.3% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -3.7% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 402,500 / 60MA 350,975",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -0.4% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +10.4% (≤+22%) · RSI14 67 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -1,550→24,592 / 기관 159,325→62,307 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 140.0% / 마지막 1시간 175.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 402,500 / 20MA 364,600 (110.4% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 332% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 26% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.72 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 401000, 전봉 종가 407000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 402500,
            "previousClose": 387000,
            "dailyChange": 15500,
            "dailyChangePct": 4.01,
            "dailyDirection": "up",
            "entryPriceText": "402,500원 (당일 종가 기준)",
            "entryPrice": 402500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 94.185,
            "marketCapRank": 5,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -3.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-10-08 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 401000, 전봉 종가 407000",
              "latestOpen": 401000.0,
              "latestClose": 401000.0,
              "previousClose": 407000.0
            },
            "toss": {
              "avgStrength": 140.0,
              "note": "토스 공개 체결강도 140.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A373220/order",
              "asOf": "2026-10-08T08:35:23Z",
              "intradayAbove100Ratio": 62.5,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 175.0,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 146.3,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 2.6752,
              "last30BuyVolume": 1771.0,
              "last30SellVolume": 662.0
            },
            "orderbook": {
              "bidAskRatio": 0.7246,
              "bidTotal": 2449,
              "askTotal": 3380,
              "note": "토스 호가잔량합계 매수 2,449 / 매도 3,380",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A373220/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "neutral",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 36.81, ATR10 4.08%, 일간 표준편차 2.67%, 당일 레인지 5.43%.",
              "metrics": {
                "atrPct10": 4.08,
                "returnStd20": 2.67,
                "todayRangePct": 5.43,
                "vkospi": 36.81
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
                "targetPrice": "414,575원",
                "historicalHitRate": 0.5217,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 1 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.9%",
                "targetPrice": "418,000원",
                "historicalHitRate": 0.3478,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 397,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.4%",
                "targetPrice": "397,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 397000,
              "fallbackStopPrice": 396462,
              "effectiveHardStopPrice": 397000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 397,000원와 기존 % 손절 396,462원 중 더 높은 397,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 397,000원이며, 기존 % 손절 396,462원보다 느슨해지지 않게 397,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 397268,
              "high": 401292,
              "anchor": 402500,
              "label": "397,268~401,292원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 418000,
                "retrace33Price": 407615,
                "retrace50Price": 410250,
                "nearestResistancePrice": 418000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 397,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "397,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 418000,
                "retrace33Price": 407615,
                "retrace50Price": 410250,
                "nearestResistancePrice": 418000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 397,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "397,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 418000,
                "retrace33Price": 407615,
                "retrace50Price": 410250,
                "nearestResistancePrice": 418000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "414,575원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 397,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "397,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
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
              "reason": "EV=순수익 argmax (과거 23건)",
              "hitRate": 0.5217,
              "ev": 1.11,
              "sampleCount": 23
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
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +12.3% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 +12.3% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -3.7% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -0.4% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 402500.0,
                "vs52wHighPct": 76.37571157495256,
                "vs52wLowPct": 38.55421686746988,
                "dropFrom52wHighPct": 23.62428842504744,
                "ma20GapPct": 10.394953373560066,
                "rsi14": 67.00932205258431,
                "volumeRatio20d": 319.30639656384983,
                "rs20Pct": 11.03448275862069,
                "tradingValueRank": 20.0,
                "marketCapRank": 5.0,
                "marketCapTrillion": 94.185,
                "per": 0.0,
                "pbr": 4.22,
                "cnsPer": -319.7,
                "foreignRate": 5.64,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 2.081314374494876
              },
              "evaluatedAt": "2026-10-08T17:35:32+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "한미반도체",
            "code": "042700",
            "strictScore": 7.4,
            "signalScore": 7.4,
            "score": 7.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
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
                "note": "외인 -76,465→41,192 / 기관 32,401→-82,319 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 103.0% / 마지막 1시간 133.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 265,000 / 20MA 246,650 (107.4% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 31% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 176% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.16 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 267000, 전봉 종가 266000 미달"
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
                "note": "당일 거래대금 순위 25위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 25.3조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-09-11 공매도 과열종목 지정(공매도 거래 금지 적용)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-28~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +15.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -5.9% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 265,000 / 60MA 224,925",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.4% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 1.60)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +7.4% (≤+22%) · RSI14 61 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -76,465→41,192 / 기관 32,401→-82,319 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 103.0% / 마지막 1시간 133.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 265,000 / 20MA 246,650 (107.4% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.16 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 31% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 176% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 267000, 전봉 종가 266000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 265000,
            "previousClose": 264000,
            "dailyChange": 1000,
            "dailyChangePct": 0.38,
            "dailyDirection": "up",
            "entryPriceText": "265,000원 (당일 종가 기준)",
            "entryPrice": 265000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 25.2577,
            "marketCapRank": 26,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -5.9% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-09-11 공매도 과열종목 지정(공매도 거래 금지 적용)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 267000, 전봉 종가 266000",
              "latestOpen": 267000.0,
              "latestClose": 267000.0,
              "previousClose": 266000.0
            },
            "toss": {
              "avgStrength": 103.0,
              "note": "토스 공개 체결강도 103.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042700/order",
              "asOf": "2026-10-08T08:35:16Z",
              "intradayAbove100Ratio": 44.1,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 133.7,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 133.8,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.213,
              "last30BuyVolume": 489.0,
              "last30SellVolume": 2296.0
            },
            "orderbook": {
              "bidAskRatio": 1.157,
              "bidTotal": 4768,
              "askTotal": 4121,
              "note": "토스 호가잔량합계 매수 4,768 / 매도 4,121",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A042700/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 36.81, ATR10 5.05%, 일간 표준편차 3.47%, 당일 레인지 4.92%.",
              "metrics": {
                "atrPct10": 5.05,
                "returnStd20": 3.47,
                "todayRangePct": 4.92,
                "vkospi": 36.81
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "60% 익절",
                "targetYield": "+2.1%",
                "targetPrice": "270,445원",
                "historicalHitRate": 0.5217,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.1%",
                "targetPrice": "273,250원",
                "historicalHitRate": 0.3478,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 261,025원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "261,025원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 261000,
              "fallbackStopPrice": 261025,
              "effectiveHardStopPrice": 261025,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 261,000원와 기존 % 손절 261,025원 중 더 높은 261,025원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 261,000원이며, 기존 % 손절 261,025원보다 느슨해지지 않게 261,025원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 261555,
              "high": 264205,
              "anchor": 265000,
              "label": "261,555~264,205원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 281500,
                "retrace33Price": 270445,
                "retrace50Price": 273250,
                "nearestResistancePrice": 266000,
                "secondaryResistancePrice": 269500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "270,445원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "273,250원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+6.2%",
                    "targetPrice": "281,500원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 261,025원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "261,025원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 281500,
                "retrace33Price": 270445,
                "retrace50Price": 273250,
                "nearestResistancePrice": 266000,
                "secondaryResistancePrice": 269500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "270,445원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.1%",
                    "targetPrice": "273,250원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 261,025원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "261,025원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 281500,
                "retrace33Price": 270445,
                "retrace50Price": 273250,
                "nearestResistancePrice": 266000,
                "secondaryResistancePrice": 269500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "270,445원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.1%",
                    "targetPrice": "273,250원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 261,025원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "261,025원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
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
              "reason": "EV=순수익 argmax (과거 23건)",
              "hitRate": 0.5217,
              "ev": 1.11,
              "sampleCount": 23
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "reversal-a7plus-balanced",
              "active": true,
              "stopExecution": "close",
              "stopCondition": "종가 -2% 이탈 시 전량 정리, 장중 -5% 이상 훼손 후 회복 실패 시 50% 축소",
              "stopTiming": "장중 조건은 10:00/14:00 확인 후 부분 축소, 최종 손절은 종가 확인 후",
              "positionWeightMultiplier": 0.5,
              "intradayRiskRule": {
                "active": true,
                "triggerPct": -5.0,
                "action": "50% 축소",
                "timing": "10:00 또는 14:00 확인",
                "recoveryRule": "진입가 대비 -3% 안쪽으로 회복하지 못하면 부분 축소",
                "finalStopRule": "종가 기준 -2% 이탈 시 남은 물량 전량 정리"
              },
              "volatilityOverlay": {
                "active": true,
                "mode": "high-volatility",
                "label": "고변동성 방어",
                "reason": "시장 또는 종목 변동성이 커서 비중을 줄이고 1차 익절을 앞당깁니다.",
                "triggerMetrics": {
                  "blendedState": "volatile",
                  "marketState": "volatile",
                  "stockState": "volatile",
                  "atrPct10": 5.05,
                  "todayRangePct": 4.92,
                  "returnStd20": 3.47,
                  "vkospi": 36.81
                },
                "originalTakeProfitStages": [
                  {
                    "targetPct": 2.0,
                    "quantityPct": 50.0
                  },
                  {
                    "targetPct": 10.0,
                    "quantityPct": 50.0
                  }
                ],
                "adjustedTakeProfitStages": [
                  {
                    "targetPct": 2.0,
                    "quantityPct": 60.0
                  },
                  {
                    "targetPct": 8.0,
                    "quantityPct": 40.0
                  }
                ],
                "positionWeightMultiplier": 0.5
              },
              "label": "반등 × 7&A",
              "priority": 1,
              "strategyCase": "reversal",
              "recommendationCase": "a7plus",
              "stopPct": -2.0,
              "takeProfitStages": [
                {
                  "targetPct": 2.0,
                  "quantityPct": 60.0
                },
                {
                  "targetPct": 8.0,
                  "quantityPct": 40.0
                }
              ],
              "positionWeightHint": "half",
              "reason": "반등 주력 후보는 빠른 수익 확보와 2차 반등 목표를 같이 사용합니다. 고변동성 방어로 비중을 50%로 낮추고 1차 익절을 앞당깁니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "setup_weak",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 265000.0,
                "vs52wHighPct": 62.20657276995305,
                "vs52wLowPct": 162.11671612265084,
                "dropFrom52wHighPct": 37.79342723004695,
                "ma20GapPct": 7.43969187107237,
                "rsi14": 61.07328202755302,
                "volumeRatio20d": 153.5299391929771,
                "rs20Pct": 10.187110187110187,
                "tradingValueRank": 25.0,
                "marketCapRank": 26.0,
                "marketCapTrillion": 25.2577,
                "per": 113.73,
                "pbr": 33.66,
                "cnsPer": 0.0,
                "foreignRate": 7.92,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -9.775230684297695
              },
              "evaluatedAt": "2026-10-08T17:35:32+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 6.9,
            "signalScore": 6.9,
            "score": 6.9,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.9,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 544,386→-118,311 / 기관 99,058→-215,216 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 108.4% / 마지막 1시간 115.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 265,000 / 20MA 220,310 (120.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 60% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 181% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.38 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 267500, 전봉 종가 266500 미달"
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
                "note": "당일 거래대금 순위 10위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 12.3조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-09-10 공매도 과열종목 지정(공매도 거래 금지 적용)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-28~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +48.6% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -6.7% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 265,000 / 60MA 182,108",
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
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +20.3% (≤+22%) · RSI14 67 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 108.4% / 마지막 1시간 115.2% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 265,000 / 20MA 220,310 (120.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 60% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.38 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 544,386→-118,311 / 기관 99,058→-215,216 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 181% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 267500, 전봉 종가 266500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 265000,
            "previousClose": 251500,
            "dailyChange": 13500,
            "dailyChangePct": 5.37,
            "dailyDirection": "up",
            "entryPriceText": "265,000원 (당일 종가 기준)",
            "entryPrice": 265000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 12.2943,
            "marketCapRank": 59,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -6.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-09-10 공매도 과열종목 지정(공매도 거래 금지 적용)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 267500, 전봉 종가 266500",
              "latestOpen": 267500.0,
              "latestClose": 267500.0,
              "previousClose": 266500.0
            },
            "toss": {
              "avgStrength": 108.4,
              "note": "토스 공개 체결강도 108.4% / 최근 체결 6분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-10-08T08:35:23Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 6,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 6분 프록시",
              "lastHourAvgStrength": 115.2,
              "lastHourObservedMinutes": 6,
              "last30AvgStrength": 115.2,
              "last30ObservedMinutes": 6,
              "last30BuySellRatio": 0.7347,
              "last30BuyVolume": 468.0,
              "last30SellVolume": 637.0
            },
            "orderbook": {
              "bidAskRatio": 1.3813,
              "bidTotal": 14853,
              "askTotal": 10753,
              "note": "토스 호가잔량합계 매수 14,853 / 매도 10,753",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A036930/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 36.81, ATR10 9.08%, 일간 표준편차 5.79%, 당일 레인지 13.32%.",
              "metrics": {
                "atrPct10": 9.08,
                "returnStd20": 5.79,
                "todayRangePct": 13.32,
                "vkospi": 36.81
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "60% 익절",
                "targetYield": "+2.4%",
                "targetPrice": "271,270원",
                "historicalHitRate": 0.5217,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.6%",
                "targetPrice": "274,500원",
                "historicalHitRate": 0.3478,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 261,025원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "261,025원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 245000,
              "fallbackStopPrice": 261025,
              "effectiveHardStopPrice": 261025,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 245,000원와 기존 % 손절 261,025원 중 더 높은 261,025원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 245,000원이며, 기존 % 손절 261,025원보다 느슨해지지 않게 261,025원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 261555,
              "high": 264205,
              "anchor": 265000,
              "label": "261,555~264,205원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 284000,
                "retrace33Price": 271270,
                "retrace50Price": 274500,
                "nearestResistancePrice": 278500,
                "secondaryResistancePrice": 283000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "271,270원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.6%",
                    "targetPrice": "274,500원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+7.2%",
                    "targetPrice": "284,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 261,025원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "261,025원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 284000,
                "retrace33Price": 271270,
                "retrace50Price": 274500,
                "nearestResistancePrice": 278500,
                "secondaryResistancePrice": 283000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "271,270원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.6%",
                    "targetPrice": "274,500원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 261,025원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "261,025원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 284000,
                "retrace33Price": 271270,
                "retrace50Price": 274500,
                "nearestResistancePrice": 278500,
                "secondaryResistancePrice": 283000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "271,270원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.6%",
                    "targetPrice": "274,500원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 261,025원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "261,025원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
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
              "reason": "EV=순수익 argmax (과거 23건)",
              "hitRate": 0.5217,
              "ev": 1.11,
              "sampleCount": 23
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
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 265000.0,
                "vs52wHighPct": 93.30985915492957,
                "vs52wLowPct": 905.6925996204933,
                "dropFrom52wHighPct": 6.690140845070422,
                "ma20GapPct": 20.28505288003268,
                "rsi14": 67.00383319502433,
                "volumeRatio20d": 234.37686477983064,
                "rs20Pct": 41.55982905982906,
                "tradingValueRank": 10.0,
                "marketCapRank": 59.0,
                "marketCapTrillion": 12.2943,
                "per": 1717.53,
                "pbr": 20.42,
                "cnsPer": 0.0,
                "foreignRate": 9.94,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -13.389812085409195
              },
              "evaluatedAt": "2026-10-08T17:35:32+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "이수페타시스",
            "code": "007660",
            "strictScore": 6.9,
            "signalScore": 6.9,
            "score": 6.9,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.9,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 306,506→-87,264 / 기관 65,455→-260,723 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 129.0% / 마지막 1시간 160.8% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 126,900 / 20MA 114,415 (110.9% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 75% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 134% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.00 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 128200, 전봉 종가 128400 미달"
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
                "note": "당일 거래대금 순위 35위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 9.3조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-10-07까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-28~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +14.2% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -5.9% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 126,900 / 60MA 101,212",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -8.2% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +10.9% (≤+22%) · RSI14 60 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 129.0% / 마지막 1시간 160.8% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 126,900 / 20MA 114,415 (110.9% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 75% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.00 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 306,506→-87,264 / 기관 65,455→-260,723 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 134% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 128200, 전봉 종가 128400 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 126900,
            "previousClose": 121300,
            "dailyChange": 5600,
            "dailyChangePct": 4.62,
            "dailyDirection": "up",
            "entryPriceText": "126,900원 (당일 종가 기준)",
            "entryPrice": 126900,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.3156,
            "marketCapRank": 72,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -5.9% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-10-07까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 128200, 전봉 종가 128400",
              "latestOpen": 128400.0,
              "latestClose": 128200.0,
              "previousClose": 128400.0
            },
            "toss": {
              "avgStrength": 129.0,
              "note": "토스 공개 체결강도 129.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A007660/order",
              "asOf": "2026-10-08T06:05:16Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 160.8,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 160.8,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.8567,
              "last30BuyVolume": 1554.0,
              "last30SellVolume": 1814.0
            },
            "orderbook": {
              "bidAskRatio": 1.0029,
              "bidTotal": 2765,
              "askTotal": 2757,
              "note": "토스 호가잔량합계 매수 2,765 / 매도 2,757",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A007660/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 36.89, ATR10 6.93%, 일간 표준편차 4.58%, 당일 레인지 7.83%.",
              "metrics": {
                "atrPct10": 6.93,
                "returnStd20": 4.58,
                "todayRangePct": 7.83,
                "vkospi": 36.89
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.9%",
                "targetPrice": "129,300원",
                "historicalHitRate": 0.5217,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.1%",
                "targetPrice": "130,850원",
                "historicalHitRate": 0.3478,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 124,996원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "124,996원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 119800,
              "fallbackStopPrice": 124996,
              "effectiveHardStopPrice": 124996,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 119,800원와 기존 % 손절 124,996원 중 더 높은 124,996원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 119,800원이며, 기존 % 손절 124,996원보다 느슨해지지 않게 124,996원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 125250,
              "high": 126519,
              "anchor": 126900,
              "label": "125,250~126,519원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 134800,
                "retrace33Price": 129507,
                "retrace50Price": 130850,
                "nearestResistancePrice": 129300,
                "secondaryResistancePrice": 131200,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "129,300원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "130,850원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+6.2%",
                    "targetPrice": "134,800원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 124,996원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "124,996원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 134800,
                "retrace33Price": 129507,
                "retrace50Price": 130850,
                "nearestResistancePrice": 129300,
                "secondaryResistancePrice": 131200,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "129,300원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.1%",
                    "targetPrice": "130,850원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 124,996원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "124,996원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 134800,
                "retrace33Price": 129507,
                "retrace50Price": 130850,
                "nearestResistancePrice": 129300,
                "secondaryResistancePrice": 131200,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "129,300원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.1%",
                    "targetPrice": "130,850원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 124,996원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "124,996원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.5217,
                  "ev": 1.11,
                  "sampleCount": 23
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
              "reason": "EV=순수익 argmax (과거 23건)",
              "hitRate": 0.5217,
              "ev": 1.11,
              "sampleCount": 23
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
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +14.2% (필요 ≥ +15%)",
            "statusReason": "G1 미충족: 1개월 수익률 +14.2% (필요 ≥ +15%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 126900.0,
                "vs52wHighPct": 76.9090909090909,
                "vs52wLowPct": 119.93067590987869,
                "dropFrom52wHighPct": 23.09090909090909,
                "ma20GapPct": 10.91203076519687,
                "rsi14": 60.24041168612915,
                "volumeRatio20d": 166.02475305393875,
                "rs20Pct": 13.404825737265416,
                "tradingValueRank": 35.0,
                "marketCapRank": 72.0,
                "marketCapTrillion": 9.3156,
                "per": 46.35,
                "pbr": 10.84,
                "cnsPer": 33.95,
                "foreignRate": 16.26,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 14.855011636119443
              },
              "evaluatedAt": "2026-10-08T15:05:21+09:00",
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
  "analysisDate": "2026-10-08",
  "pointInTime": true,
  "pointInTimeStatus": "confirmed",
  "analysisSession": "1730",
  "analysisSessionLabel": "5시반 분석",
  "sessionSources": [
    "1500",
    "1730"
  ]
};
