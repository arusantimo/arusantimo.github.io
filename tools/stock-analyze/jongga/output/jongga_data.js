window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-10-08T06:06:09+00:00",
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
    }
  ],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 19,
      "failed": 0,
      "stale": 0,
      "manual": 0,
      "fallback": 1,
      "slots": 1
    },
    "failedKeys": [],
    "staleKeys": [],
    "manualKeys": [],
    "fallbackKeys": [
      "short_balance_trend"
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
        "ok": 19
      },
      "toss_ticks_strength_proxy": {
        "ok": 19
      },
      "toss_quotes_orderbook": {
        "ok": 19
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
        "data_missing": 17
      },
      "krx_short_balance_direct_post": {
        "ok": 17
      }
    },
    "fallbackUsage": [
      {
        "key": "short_balance_trend",
        "provider": "krx_short_balance_direct_post",
        "layer": "api",
        "fallbackLevel": 2,
        "confidence": 0.75,
        "stale": false,
        "count": 17
      }
    ],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 1083.0,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 266.5,
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
        "durationMs": 1362.1,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 554.2,
        "detail": "약세장 ⛔"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 39525.6,
        "count": 19
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "partial",
        "durationMs": 156925.4,
        "detail": "후보 17종목 중 17건 수집 · fallback 17건 (krx_short_balance_direct_post)",
        "count": 17
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 6953.1,
        "detail": "성공 19 / 실패 0",
        "count": 19
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 7954.7,
        "detail": "direct-http · 체결강도 19 / 호가 19 / 틱프록시 19",
        "count": 19
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 94.7,
        "detail": "pullback 0, breakout 0, accumulation 0, reversal 3",
        "count": 3
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 17535.0,
        "detail": "playwright-chromium · KIND 3",
        "count": 3
      },
      {
        "step": "blacklist_check",
        "label": "공매도 과열·투자 주의 검증",
        "status": "ok",
        "durationMs": 29838.3,
        "detail": "확정 2 · 미확인 0",
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
            "value": "6668.78 (-1.99%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 36.89"
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
            "value": "6728.85",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6884.18",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 36.89",
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
          "kospiClose": 6668.78,
          "kospiMa5": 6877.832,
          "vkospiValue": 36.89,
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
            "actualValue": "+0.11%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+15.08",
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
            "actualValue": "-21.91원",
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
                "note": "당일 평균 140.0% / 마지막 1시간 250.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 407,000 / 20MA 364,825 (111.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 48% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 244% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.37 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 407500, 전봉 종가 407000 미달"
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
                "note": "당일 거래대금 순위 22위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 95.2조 (필요 ≥ 5조)",
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
                "note": "1개월 수익률 +13.5% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -2.6% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 407,000 / 60MA 351,050",
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
                "note": "20MA 이격 +11.6% (≤+22%) · RSI14 68 (≤72) · 과이격·과매수 반등 아님",
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
                "note": "당일 평균 140.0% / 마지막 1시간 250.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 407,000 / 20MA 364,825 (111.6% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 244% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 48% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.37 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 407500, 전봉 종가 407000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 407000,
            "previousClose": 387000,
            "dailyChange": 20000,
            "dailyChangePct": 5.17,
            "dailyDirection": "up",
            "entryPriceText": "407,000원 (당일 종가 기준)",
            "entryPrice": 407000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 95.238,
            "marketCapRank": 5,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -2.6% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "직전 30분봉 종가 407500, 전봉 종가 407000",
              "latestOpen": 407500.0,
              "latestClose": 407500.0,
              "previousClose": 407000.0
            },
            "toss": {
              "avgStrength": 140.0,
              "note": "토스 공개 체결강도 140.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A373220/order",
              "asOf": "2026-10-08T06:05:13Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 250.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 250.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.3981,
              "last30BuyVolume": 1012.0,
              "last30SellVolume": 422.0
            },
            "orderbook": {
              "bidAskRatio": 0.3746,
              "bidTotal": 4911,
              "askTotal": 13111,
              "note": "토스 호가잔량합계 매수 4,911 / 매도 13,111",
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
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 36.89, ATR10 4.07%, 일간 표준편차 2.76%, 당일 레인지 5.43%.",
              "metrics": {
                "atrPct10": 4.07,
                "returnStd20": 2.76,
                "todayRangePct": 5.43,
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
                "targetYield": "+2.7%",
                "targetPrice": "418,000원",
                "historicalHitRate": 0.5217,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 1 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+2.7%",
                "targetPrice": "418,000원",
                "historicalHitRate": 0.3478,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 400,895원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "400,895원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 397000,
              "fallbackStopPrice": 400895,
              "effectiveHardStopPrice": 400895,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 397,000원와 기존 % 손절 400,895원 중 더 높은 400,895원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 397,000원이며, 기존 % 손절 400,895원보다 느슨해지지 않게 400,895원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 401709,
              "high": 405779,
              "anchor": 407000,
              "label": "401,709~405,779원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 418000,
                "retrace33Price": 410630,
                "retrace50Price": 412500,
                "nearestResistancePrice": 418000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "419,210원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 400,895원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "400,895원"
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
                "retrace33Price": 410630,
                "retrace50Price": 412500,
                "nearestResistancePrice": 418000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.7%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 400,895원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "400,895원"
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
                "retrace33Price": 410630,
                "retrace50Price": 412500,
                "nearestResistancePrice": 418000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.7%",
                    "targetPrice": "418,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 400,895원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "400,895원"
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 +13.5% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 +13.5% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -2.6% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -0.4% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 407000.0,
                "vs52wHighPct": 77.22960151802657,
                "vs52wLowPct": 40.103270223752155,
                "dropFrom52wHighPct": 22.770398481973434,
                "ma20GapPct": 11.560337147947646,
                "rsi14": 68.22670193492459,
                "volumeRatio20d": 235.19155643793647,
                "rs20Pct": 12.275862068965518,
                "tradingValueRank": 22.0,
                "marketCapRank": 5.0,
                "marketCapTrillion": 95.238,
                "per": 0.0,
                "pbr": 4.26,
                "cnsPer": -323.27,
                "foreignRate": 5.64,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 2.081314374494876
              },
              "evaluatedAt": "2026-10-08T15:05:21+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
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
          },
          {
            "rank": 3,
            "name": "한미반도체",
            "code": "042700",
            "strictScore": 6.4,
            "signalScore": 6.4,
            "score": 6.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.4,
            "grade": "B",
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 105.0% / 마지막 1시간 82.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 266,500 / 20MA 246,725 (108.0% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 42% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 132% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.30 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 268000, 전봉 종가 267500 충족"
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
                "status": "✅",
                "note": "시총 25.4조 (필요 ≥ 5조)",
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
                "note": "1개월 수익률 +15.9% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -5.3% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 266,500 / 60MA 224,950",
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
                "note": "긴 아래꼬리 (비율 5.50)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +8.0% (≤+22%) · RSI14 62 (≤72) · 과이격·과매수 반등 아님",
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
                "code": "P1",
                "note": "종가 266,500 / 20MA 246,725 (108.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.30 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 268000, 전봉 종가 267500 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 105.0% / 마지막 1시간 82.1% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 42% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 132% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 266500,
            "previousClose": 264000,
            "dailyChange": 2500,
            "dailyChangePct": 0.95,
            "dailyDirection": "up",
            "entryPriceText": "266,500원 (당일 종가 기준)",
            "entryPrice": 266500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 25.4007,
            "marketCapRank": 26,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -5.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 268000, 전봉 종가 267500",
              "latestOpen": 267500.0,
              "latestClose": 268000.0,
              "previousClose": 267500.0
            },
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042700/order",
              "asOf": "2026-10-08T06:05:16Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 82.1,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 82.1,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 0.7877,
              "last30BuyVolume": 1354.0,
              "last30SellVolume": 1719.0
            },
            "orderbook": {
              "bidAskRatio": 1.296,
              "bidTotal": 9191,
              "askTotal": 7092,
              "note": "토스 호가잔량합계 매수 9,191 / 매도 7,092",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 36.89, ATR10 5.05%, 일간 표준편차 3.47%, 당일 레인지 4.92%.",
              "metrics": {
                "atrPct10": 5.05,
                "returnStd20": 3.47,
                "todayRangePct": 4.92,
                "vkospi": 36.89
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.9%",
                "targetPrice": "271,450원",
                "historicalHitRate": 0.5217,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+2.8%",
                "targetPrice": "274,000원",
                "historicalHitRate": 0.3478,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 262,502원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "262,502원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 261000,
              "fallbackStopPrice": 262502,
              "effectiveHardStopPrice": 262502,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 261,000원와 기존 % 손절 262,502원 중 더 높은 262,502원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 261,000원이며, 기존 % 손절 262,502원보다 느슨해지지 않게 262,502원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 263036,
              "high": 265700,
              "anchor": 266500,
              "label": "263,036~265,700원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 281500,
                "retrace33Price": 271450,
                "retrace50Price": 274000,
                "nearestResistancePrice": 269500,
                "secondaryResistancePrice": 274000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "271,450원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "274,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+5.6%",
                    "targetPrice": "281,500원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 262,502원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "262,502원"
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
                "retrace33Price": 271450,
                "retrace50Price": 274000,
                "nearestResistancePrice": 269500,
                "secondaryResistancePrice": 274000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "271,450원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.8%",
                    "targetPrice": "274,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 262,502원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "262,502원"
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
                "retrace33Price": 271450,
                "retrace50Price": 274000,
                "nearestResistancePrice": 269500,
                "secondaryResistancePrice": 274000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "271,450원",
                    "historicalHitRate": 0.5217,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.8%",
                    "targetPrice": "274,000원",
                    "historicalHitRate": 0.3478,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 262,502원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "262,502원"
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
                "currentPrice": 266500.0,
                "vs52wHighPct": 62.558685446009385,
                "vs52wLowPct": 163.6003956478734,
                "dropFrom52wHighPct": 37.441314553990615,
                "ma20GapPct": 8.014996453541393,
                "rsi14": 61.65191332658998,
                "volumeRatio20d": 114.97076079281612,
                "rs20Pct": 10.81081081081081,
                "tradingValueRank": 27.0,
                "marketCapRank": 26.0,
                "marketCapTrillion": 25.4007,
                "per": 114.38,
                "pbr": 33.85,
                "cnsPer": 0.0,
                "foreignRate": 7.92,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -9.775230684297695
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
  "analysisSession": "1500",
  "analysisSessionLabel": "3시 분석",
  "sessionSources": [
    "1500"
  ]
};
