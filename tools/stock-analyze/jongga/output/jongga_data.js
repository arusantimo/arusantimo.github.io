window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-07-08T08:33:36+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "009150",
      "name": "삼성전기",
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
        "ok": 4
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
      "naver_overtime_board": {
        "fallback": 1
      },
      "krx_pykrx_short_balance": {
        "ok": 17
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
        "durationMs": 969.9,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 282.4,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.1,
        "detail": "G-C 🟡"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1589.0,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 212.5,
        "detail": "약세장 ⛔"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 40960.4,
        "count": 19
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 830.4,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 14196.9,
        "detail": "후보 17종목 중 17건 수집",
        "count": 17
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 5940.0,
        "detail": "성공 19 / 실패 0",
        "count": 19
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 6882.9,
        "detail": "direct-http · 체결강도 19 / 호가 19 / 틱프록시 19",
        "count": 19
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 96.6,
        "detail": "pullback 0, breakout 0, accumulation 0, reversal 3",
        "count": 3
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 16587.6,
        "detail": "playwright-chromium · KIND 3",
        "count": 3
      },
      {
        "step": "blacklist_check",
        "label": "공매도 과열·투자 주의 검증",
        "status": "ok",
        "durationMs": 22120.1,
        "detail": "확정 1 · 미확인 0",
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
            "value": "7246.79 (-5.35%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 87.90"
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
            "value": "7636.63",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "8356.85",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 87.90",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 11 / 하락 9",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "기술 레짐 유지",
            "verdict": "약세장 ⛔"
          },
          {
            "item": "거시 맥락",
            "value": "Stage 6: 화폐 몰락형 특수 버블 (Debasement Bubble) / RI 85",
            "verdict": "⚠️"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20260708",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "약세장 ⛔",
          "regimeAdjustmentReason": "기술 레짐 유지",
          "riseJustified": false,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "Stage 6: 화폐 몰락형 특수 버블 (Debasement Bubble)",
          "marketRegimeKey": "debasement-bubble",
          "fundamentalAnchorScore": 65.0,
          "fundamentalAnchorState": "supportive",
          "bubbleIndex": 44.24,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "화폐 몰락형 특수 버블 경계",
          "riskIndex": 85,
          "stageOverrideReason": "원/달러 1517원과 과열 이격이 겹쳤지만 F_support 60점이 부족해 특수 버블 경계로 강화했습니다.",
          "kospiClose": 7246.79,
          "kospiMa5": 7738.1720000000005,
          "vkospiValue": 87.9,
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
            "actualValue": "-1.07%",
            "baseScore": "-1점",
            "weight": "×2.5",
            "formula": "-1 × 2.5 = -2.5점",
            "weightedScore": "-2.5점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.53",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+11.1bp",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-43.53원",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-10.28%",
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
          "nq": "2026-07-09T03:59:00+00:00",
          "vix": "2026-07-08T20:15:00+00:00",
          "tnx": "2026-07-08T19:00:00+00:00",
          "krw": "2026-07-08T22:59:00+00:00",
          "sox": "2026-07-09T00:00:00+00:00"
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
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.2,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -99,004→67,892 / 기관 -103,614→-140,754 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 102.0% / 마지막 1시간 266.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 1,479,000 / 20MA 1,976,850 (74.8% · 필요 ≥ 98%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 8% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 120% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 3.27 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1479000, 전봉 종가 1484000 미달"
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
                "note": "당일 거래대금 순위 6위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 110.5조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-06-23 공매도 과열종목 지정(공매도 거래 금지 적용)(삼성전기우)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-28~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -24.9% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -38.8% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,479,000 / 60MA 1,406,950",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -12.7% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 -25.2% (≤+22%) · RSI14 38 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -99,004→67,892 / 기관 -103,614→-140,754 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 102.0% / 마지막 1시간 266.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 3.27 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 1,479,000 / 20MA 1,976,850 (74.8% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 8% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 120% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1479000, 전봉 종가 1484000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1479000,
            "previousClose": 1648000,
            "dailyChange": -169000,
            "dailyChangePct": -10.25,
            "dailyDirection": "down",
            "entryPriceText": "1,479,000원 (당일 종가 기준)",
            "entryPrice": 1479000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 110.472,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2553,
            "keyPoint": "20일 고점 대비 -38.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-06-23 공매도 과열종목 지정(공매도 거래 금지 적용)(삼성전기우)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1479000, 전봉 종가 1484000",
              "latestOpen": 1479000.0,
              "latestClose": 1479000.0,
              "previousClose": 1484000.0
            },
            "toss": {
              "avgStrength": 102.0,
              "note": "토스 공개 체결강도 102.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-07-08T08:32:51Z",
              "intradayAbove100Ratio": 88.9,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 266.7,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 262.5,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 7.25,
              "last30BuyVolume": 29.0,
              "last30SellVolume": 4.0
            },
            "orderbook": {
              "bidAskRatio": 3.2694,
              "bidTotal": 16504,
              "askTotal": 5048,
              "note": "Naver 호가잔량합계 매수 16,504 / 매도 5,048",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=009150"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.90, ATR10 11.19%, 일간 표준편차 7.05%, 당일 레인지 12.80%.",
              "metrics": {
                "atrPct10": 11.19,
                "returnStd20": 7.05,
                "todayRangePct": 12.8,
                "vkospi": 87.9
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
                "targetPrice": "1,523,370원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,552,950원",
                "historicalHitRate": 0.5677,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,462,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.1%",
                "targetPrice": "1,462,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1462000,
              "fallbackStopPrice": 1449420,
              "effectiveHardStopPrice": 1462000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,462,000원와 기존 % 손절 1,449,420원 중 더 높은 1,462,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,462,000원이며, 기존 % 손절 1,449,420원보다 느슨해지지 않게 1,462,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 3.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1456076,
              "high": 1470866,
              "anchor": 1479000,
              "label": "1,456,076~1,470,866원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 2417000,
                "retrace33Price": 1788540,
                "retrace50Price": 1948000,
                "nearestResistancePrice": 1673000,
                "secondaryResistancePrice": 1844000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+13.1%",
                    "targetPrice": "1,673,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+24.7%",
                    "targetPrice": "1,844,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+63.4%",
                    "targetPrice": "2,417,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,462,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "1,462,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 2417000,
                "retrace33Price": 1788540,
                "retrace50Price": 1948000,
                "nearestResistancePrice": 1673000,
                "secondaryResistancePrice": 1844000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+13.1%",
                    "targetPrice": "1,673,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+24.7%",
                    "targetPrice": "1,844,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,462,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "1,462,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 65건)",
                "recentHighPrice": 2417000,
                "retrace33Price": 1788540,
                "retrace50Price": 1948000,
                "nearestResistancePrice": 1673000,
                "secondaryResistancePrice": 1844000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,523,370원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,552,950원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,462,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "1,462,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 65건)",
              "sampleCount": 65,
              "ev": 0.0823
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 192건)",
              "hitRate": 0.6667,
              "ev": 1.165,
              "sampleCount": 192
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
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -24.9% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 -24.9% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -38.8% (필요 -5%~-25%) / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1479000.0,
                "vs52wHighPct": 61.19155978485726,
                "vs52wLowPct": 1016.2264150943397,
                "dropFrom52wHighPct": 38.80844021514274,
                "ma20GapPct": -25.18400485621064,
                "rsi14": 38.39082137318823,
                "volumeRatio20d": 103.15985771060016,
                "rs20Pct": -18.060941828254848,
                "tradingValueRank": 6.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 110.472,
                "per": 139.7,
                "pbr": 11.38,
                "cnsPer": 86.88,
                "foreignRate": 39.54,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": 46.71109049245779
              },
              "evaluatedAt": "2026-07-08T17:32:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.2,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -71,712→46,688 / 기관 -27,589→-91,627 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 104.0% / 마지막 1시간 231.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 1,270,000 / 20MA 1,606,250 (79.1% · 필요 ≥ 98%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 28% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 19.75 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1270000, 전봉 종가 1276000 미달"
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
                "note": "당일 거래대금 순위 7위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 167.6조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-06 [정정]유상증자결정(자회사의 주요경영사항)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 2건 · 손절 없음 (최근: 2026-07-03) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +0.1% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -42.0% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,270,000 / 60MA 1,201,433",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -13.2% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 -20.9% (≤+22%) · RSI14 41 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -71,712→46,688 / 기관 -27,589→-91,627 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 104.0% / 마지막 1시간 231.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 19.75 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 1,270,000 / 20MA 1,606,250 (79.1% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 28% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1270000, 전봉 종가 1276000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1270000,
            "previousClose": 1356000,
            "dailyChange": -86000,
            "dailyChangePct": -6.34,
            "dailyDirection": "down",
            "entryPriceText": "1,270,000원 (당일 종가 기준)",
            "entryPrice": 1270000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 167.5872,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2553,
            "keyPoint": "20일 고점 대비 -42.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-06 [정정]유상증자결정(자회사의 주요경영사항)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1270000, 전봉 종가 1276000",
              "latestOpen": 1270000.0,
              "latestClose": 1270000.0,
              "previousClose": 1276000.0
            },
            "toss": {
              "avgStrength": 104.0,
              "note": "토스 공개 체결강도 104.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-07-08T08:32:49Z",
              "intradayAbove100Ratio": 80.0,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 231.1,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 225.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 5.5,
              "last30BuyVolume": 11.0,
              "last30SellVolume": 2.0
            },
            "orderbook": {
              "bidAskRatio": 19.7494,
              "bidTotal": 44535,
              "askTotal": 2255,
              "note": "Naver 호가잔량합계 매수 44,535 / 매도 2,255",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=402340"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.90, ATR10 13.13%, 일간 표준편차 6.95%, 당일 레인지 11.28%.",
              "metrics": {
                "atrPct10": 13.13,
                "returnStd20": 6.95,
                "todayRangePct": 11.28,
                "vkospi": 87.9
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
                "targetPrice": "1,308,100원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,333,500원",
                "historicalHitRate": 0.5677,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,244,600원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,244,600원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1227000,
              "fallbackStopPrice": 1244600,
              "effectiveHardStopPrice": 1244600,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,227,000원와 기존 % 손절 1,244,600원 중 더 높은 1,244,600원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,227,000원이며, 기존 % 손절 1,244,600원보다 느슨해지지 않게 1,244,600원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 1250315,
              "high": 1263015,
              "anchor": 1270000,
              "label": "1,250,315~1,263,015원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 2189000,
                "retrace33Price": 1573270,
                "retrace50Price": 1729500,
                "nearestResistancePrice": 1380000,
                "secondaryResistancePrice": 1422000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+8.7%",
                    "targetPrice": "1,380,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+12.0%",
                    "targetPrice": "1,422,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+72.4%",
                    "targetPrice": "2,189,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,244,600원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,244,600원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 2189000,
                "retrace33Price": 1573270,
                "retrace50Price": 1729500,
                "nearestResistancePrice": 1380000,
                "secondaryResistancePrice": 1422000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+8.7%",
                    "targetPrice": "1,380,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+12.0%",
                    "targetPrice": "1,422,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,244,600원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,244,600원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 65건)",
                "recentHighPrice": 2189000,
                "retrace33Price": 1573270,
                "retrace50Price": 1729500,
                "nearestResistancePrice": 1380000,
                "secondaryResistancePrice": 1422000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,308,100원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,333,500원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,244,600원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,244,600원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 65건)",
              "sampleCount": 65,
              "ev": 0.0823
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 192건)",
              "hitRate": 0.6667,
              "ev": 1.165,
              "sampleCount": 192
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
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +0.1% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 +0.1% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -42.0% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1270000.0,
                "vs52wHighPct": 54.31993156544055,
                "vs52wLowPct": 870.2062643239113,
                "dropFrom52wHighPct": 45.68006843455945,
                "ma20GapPct": -20.93385214007782,
                "rsi14": 41.3336816937184,
                "volumeRatio20d": 101.98080881285875,
                "rs20Pct": 7.3541842772612,
                "tradingValueRank": 7.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 167.5872,
                "per": 10.78,
                "pbr": 4.64,
                "cnsPer": 4.33,
                "foreignRate": 45.34,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": 2111.9891928402567
              },
              "evaluatedAt": "2026-07-08T17:32:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "LG전자",
            "code": "066570",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.2,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -7,517→47,915 / 기관 -104,552→161,668 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 90.0% / 마지막 1시간 294.4% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 195,800 / 20MA 209,165 (93.6% · 필요 ≥ 98%)"
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
                "note": "당일 거래량 / 5일 평균 211% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.30 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 195800, 전봉 종가 195900 미달"
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
                "note": "당일 거래대금 순위 16위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 31.9조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-07 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-07-07) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -21.0% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -25.3% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 195,800 / 60MA 198,125",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -2.8% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 -6.4% (≤+22%) · RSI14 45 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -7,517→47,915 / 기관 -104,552→161,668 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 90.0% / 마지막 1시간 294.4% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 211% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 195,800 / 20MA 209,165 (93.6% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 48% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.30 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 195800, 전봉 종가 195900 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 195800,
            "previousClose": 189100,
            "dailyChange": 6700,
            "dailyChangePct": 3.54,
            "dailyDirection": "up",
            "entryPriceText": "195,800원 (당일 종가 기준)",
            "entryPrice": 195800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 31.8928,
            "marketCapRank": 21,
            "marketCapUniverseCount": 2553,
            "keyPoint": "20일 고점 대비 -25.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-07 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 195800, 전봉 종가 195900",
              "latestOpen": 195800.0,
              "latestClose": 195800.0,
              "previousClose": 195900.0
            },
            "toss": {
              "avgStrength": 90.0,
              "note": "토스 공개 체결강도 90.0% / 최근 체결 28분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A066570/order",
              "asOf": "2026-07-08T08:32:51Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 28,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 28분 프록시",
              "lastHourAvgStrength": 294.4,
              "lastHourObservedMinutes": 28,
              "last30AvgStrength": 294.4,
              "last30ObservedMinutes": 28,
              "last30BuySellRatio": 2.6374,
              "last30BuyVolume": 2822.0,
              "last30SellVolume": 1070.0
            },
            "orderbook": {
              "bidAskRatio": 0.2986,
              "bidTotal": 9003,
              "askTotal": 30147,
              "note": "Naver 호가잔량합계 매수 9,003 / 매도 30,147",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=066570"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.90, ATR10 7.39%, 일간 표준편차 4.42%, 당일 레인지 10.36%.",
              "metrics": {
                "atrPct10": 7.39,
                "returnStd20": 4.42,
                "todayRangePct": 10.36,
                "vkospi": 87.9
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.4%",
                "targetPrice": "198,600원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+2.7%",
                "targetPrice": "201,000원",
                "historicalHitRate": 0.5677,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 191,884원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "191,884원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 186400,
              "fallbackStopPrice": 191884,
              "effectiveHardStopPrice": 191884,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 186,400원와 기존 % 손절 191,884원 중 더 높은 191,884원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 186,400원이며, 기존 % 손절 191,884원보다 느슨해지지 않게 191,884원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 192765,
              "high": 194723,
              "anchor": 195800,
              "label": "192,765~194,723원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 262000,
                "retrace33Price": 217646,
                "retrace50Price": 228900,
                "nearestResistancePrice": 198600,
                "secondaryResistancePrice": 201000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.4%",
                    "targetPrice": "198,600원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "201,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+33.8%",
                    "targetPrice": "262,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 191,884원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "191,884원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 262000,
                "retrace33Price": 217646,
                "retrace50Price": 228900,
                "nearestResistancePrice": 198600,
                "secondaryResistancePrice": 201000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.4%",
                    "targetPrice": "198,600원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.7%",
                    "targetPrice": "201,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 191,884원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "191,884원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 65건)",
                "recentHighPrice": 262000,
                "retrace33Price": 217646,
                "retrace50Price": 228900,
                "nearestResistancePrice": 198600,
                "secondaryResistancePrice": 201000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.4%",
                    "targetPrice": "198,600원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.7%",
                    "targetPrice": "201,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 191,884원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "191,884원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 65건)",
              "sampleCount": 65,
              "ev": 0.0823
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 192건)",
              "hitRate": 0.6667,
              "ev": 1.165,
              "sampleCount": 192
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
              "핵심 Gate 미충족: G4",
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -21.0% (필요 ≥ +15%) · 외 3건",
            "statusReason": "G1 미충족: 1개월 수익률 -21.0% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -25.3% (필요 -5%~-25%) / G3 미충족: 종가 195,800 / 60MA 198,125 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 195800.0,
                "vs52wHighPct": 41.88235294117647,
                "vs52wLowPct": 172.32267037552157,
                "dropFrom52wHighPct": 58.11764705882353,
                "ma20GapPct": -6.3896923481462,
                "rsi14": 44.69023953946511,
                "volumeRatio20d": 163.24712026726905,
                "rs20Pct": -12.589285714285714,
                "tradingValueRank": 16.0,
                "marketCapRank": 21.0,
                "marketCapTrillion": 31.8928,
                "per": 36.13,
                "pbr": 1.38,
                "cnsPer": 17.54,
                "foreignRate": 28.59,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 16.354548231768522
              },
              "evaluatedAt": "2026-07-08T17:32:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.1,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -557→131,815 / 기관 -6,497→-98,624 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 118.0% / 마지막 1시간 211.8% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 765,000 / 20MA 1,008,700 (75.8% · 필요 ≥ 98%)"
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
                "note": "당일 거래량 / 5일 평균 114% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.04 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 756000, 전봉 종가 753000 충족"
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
                "note": "시총 18.1조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-01 결산실적공시 예고(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-28~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -32.7% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -42.0% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 765,000 / 60MA 839,492",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -6.0% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-c",
                "status": "✅",
                "note": "도지형 안정화 캔들",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 -24.2% (≤+22%) · RSI14 35 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -557→131,815 / 기관 -6,497→-98,624 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 118.0% / 마지막 1시간 211.8% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.04 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 756000, 전봉 종가 753000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 765,000 / 20MA 1,008,700 (75.8% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 18% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 114% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 765000,
            "previousClose": 814000,
            "dailyChange": -49000,
            "dailyChangePct": -6.02,
            "dailyDirection": "down",
            "entryPriceText": "765,000원 (당일 종가 기준)",
            "entryPrice": 765000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 18.1053,
            "marketCapRank": 42,
            "marketCapUniverseCount": 2554,
            "keyPoint": "20일 고점 대비 -42.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-01 결산실적공시 예고(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 756000, 전봉 종가 753000",
              "latestOpen": 753000.0,
              "latestClose": 756000.0,
              "previousClose": 753000.0
            },
            "toss": {
              "avgStrength": 118.0,
              "note": "토스 공개 체결강도 118.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-07-08T06:03:20Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 211.8,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 211.8,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.0793,
              "last30BuyVolume": 944.0,
              "last30SellVolume": 454.0
            },
            "orderbook": {
              "bidAskRatio": 2.0446,
              "bidTotal": 1239,
              "askTotal": 606,
              "note": "Naver 호가잔량합계 매수 1,239 / 매도 606",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=011070"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.71, ATR10 9.58%, 일간 표준편차 6.05%, 당일 레인지 10.20%.",
              "metrics": {
                "atrPct10": 9.58,
                "returnStd20": 6.05,
                "todayRangePct": 10.2,
                "vkospi": 87.71
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
                "targetPrice": "787,950원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "803,250원",
                "historicalHitRate": 0.5677,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 750,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "750,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 750000,
              "fallbackStopPrice": 749700,
              "effectiveHardStopPrice": 750000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 750,000원와 기존 % 손절 749,700원 중 더 높은 750,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 750,000원이며, 기존 % 손절 749,700원보다 느슨해지지 않게 750,000원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 753142,
              "high": 760792,
              "anchor": 765000,
              "label": "753,142~760,792원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1320000,
                "retrace33Price": 948150,
                "retrace50Price": 1042500,
                "nearestResistancePrice": 833000,
                "secondaryResistancePrice": 864000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+8.9%",
                    "targetPrice": "833,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+12.9%",
                    "targetPrice": "864,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+72.5%",
                    "targetPrice": "1,320,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 750,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "750,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1320000,
                "retrace33Price": 948150,
                "retrace50Price": 1042500,
                "nearestResistancePrice": 833000,
                "secondaryResistancePrice": 864000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+8.9%",
                    "targetPrice": "833,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+12.9%",
                    "targetPrice": "864,000원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 750,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "750,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 62건)",
                "recentHighPrice": 1320000,
                "retrace33Price": 948150,
                "retrace50Price": 1042500,
                "nearestResistancePrice": 833000,
                "secondaryResistancePrice": 864000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "787,950원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "803,250원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 750,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "750,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 62건)",
              "sampleCount": 62,
              "ev": 0.025
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 192건)",
              "hitRate": 0.6667,
              "ev": 1.165,
              "sampleCount": 192
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 -32.7% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 -32.7% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -42.0% (필요 -5%~-25%) / G3 미충족: 종가 765,000 / 60MA 839,492",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 765000.0,
                "vs52wHighPct": 42.17199558985667,
                "vs52wLowPct": 421.4723926380368,
                "dropFrom52wHighPct": 57.82800441014333,
                "ma20GapPct": -24.159809655992863,
                "rsi14": 35.45349957886884,
                "volumeRatio20d": 76.51853596086026,
                "rs20Pct": -29.81651376146789,
                "tradingValueRank": 33.0,
                "marketCapRank": 42.0,
                "marketCapTrillion": 18.1053,
                "per": 37.35,
                "pbr": 2.98,
                "cnsPer": 21.26,
                "foreignRate": 24.54,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": -75.06955856750028
              },
              "evaluatedAt": "2026-07-08T15:03:27+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 5,
            "name": "마키나락스",
            "code": "477850",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.1,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -181,477→26,869 / 기관 -36,640→-39,800 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 89.4% / 마지막 1시간 172.9% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 27,050 / 20MA 19,638 (137.7% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 53% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 145% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.22 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 28300, 전봉 종가 27450 충족"
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
                "note": "당일 거래대금 순위 36위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 0.5조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-07-07까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "⛔",
                "note": "최근 손절 이력 1건 (최근: 2026-07-06) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +23.5% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.0% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⚠️",
                "note": "60일 이동평균 산출 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -19.4% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "⛔",
                "note": "20MA 이격 +37.7% (≤+22%) · RSI14 47 (≤72) · 20MA 과이격(반등 소진)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -181,477→26,869 / 기관 -36,640→-39,800 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 27,050 / 20MA 19,638 (137.7% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 53% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 28300, 전봉 종가 27450 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 89.4% / 마지막 1시간 172.9% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 145% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.22 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 27050,
            "previousClose": 24500,
            "dailyChange": 2550,
            "dailyChangePct": 10.41,
            "dailyDirection": "up",
            "entryPriceText": "27,050원 (당일 종가 기준)",
            "entryPrice": 27050,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.4803,
            "marketCapRank": 472,
            "marketCapUniverseCount": 2554,
            "keyPoint": "20일 고점 대비 -11.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-07까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 28300, 전봉 종가 27450",
              "latestOpen": 27450.0,
              "latestClose": 28300.0,
              "previousClose": 27450.0
            },
            "toss": {
              "avgStrength": 89.4,
              "note": "토스 공개 체결강도 89.4% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A477850/order",
              "asOf": "2026-07-08T06:03:21Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 172.9,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 172.9,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.7741,
              "last30BuyVolume": 3000.0,
              "last30SellVolume": 1691.0
            },
            "orderbook": {
              "bidAskRatio": 0.222,
              "bidTotal": 7938,
              "askTotal": 35754,
              "note": "Naver 호가잔량합계 매수 7,938 / 매도 35,754",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=477850"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.71, ATR10 20.86%, 일간 표준편차 13.33%, 당일 레인지 28.37%.",
              "metrics": {
                "atrPct10": 20.86,
                "returnStd20": 13.33,
                "todayRangePct": 28.37,
                "vkospi": 87.71
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
                "targetPrice": "27,862원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "28,402원",
                "historicalHitRate": 0.5677,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 26,509원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "26,509원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 23350,
              "fallbackStopPrice": 26509,
              "effectiveHardStopPrice": 26509,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 23,350원와 기존 % 손절 26,509원 중 더 높은 26,509원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 23,350원이며, 기존 % 손절 26,509원보다 느슨해지지 않게 26,509원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 26631,
              "high": 26901,
              "anchor": 27050,
              "label": "26,631~26,901원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 30400,
                "retrace33Price": 28156,
                "retrace50Price": 28725,
                "nearestResistancePrice": 30000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+4.1%",
                    "targetPrice": "28,156원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.2%",
                    "targetPrice": "28,725원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+12.4%",
                    "targetPrice": "30,400원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 26,509원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "26,509원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 30400,
                "retrace33Price": 28156,
                "retrace50Price": 28725,
                "nearestResistancePrice": 30000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+4.1%",
                    "targetPrice": "28,156원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+6.2%",
                    "targetPrice": "28,725원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 26,509원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "26,509원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 62건)",
                "recentHighPrice": 30400,
                "retrace33Price": 28156,
                "retrace50Price": 28725,
                "nearestResistancePrice": 30000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "27,862원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "28,402원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 26,509원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "26,509원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 62건)",
              "sampleCount": 62,
              "ev": 0.025
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 192건)",
              "hitRate": 0.6667,
              "ev": 1.165,
              "sampleCount": 192
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
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.5조 (필요 ≥ 5조) · 외 2건",
            "statusReason": "F2 미충족: 시총 0.5조 (필요 ≥ 5조) / F4 미충족: 최근 손절 이력 1건 (최근: 2026-07-06) · 재진입 차단 / Q1 미충족: 20MA 이격 +37.7% (≤+22%) · RSI14 47 (≤72) · 20MA 과이격(반등 소진)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 27050.0,
                "vs52wHighPct": 32.35645933014354,
                "vs52wLowPct": 101.56482861400895,
                "dropFrom52wHighPct": 67.64354066985646,
                "ma20GapPct": 37.7466581795035,
                "rsi14": 47.13043586698065,
                "volumeRatio20d": 360.54482527264554,
                "rs20Pct": 34.24317617866005,
                "tradingValueRank": 36.0,
                "marketCapRank": 472.0,
                "marketCapTrillion": 0.4803,
                "per": 0.0,
                "pbr": 33.19,
                "cnsPer": 0.0,
                "foreignRate": 0.0,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-07-08T15:03:27+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 6,
            "name": "KB금융",
            "code": "105560",
            "strictScore": 5.7,
            "signalScore": 5.7,
            "score": 5.7,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.7,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -273,821→-347,746 / 기관 307,596→389,500 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 97.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 171,000 / 20MA 161,240 (106.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 24% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 116% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.61 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 171700, 전봉 종가 170900 충족"
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
                "note": "시총 60.7조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-06-26 유상증자결정(자회사의 주요경영사항)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-07-02) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +10.5% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -6.4% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 171,000 / 60MA 158,582",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.3% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
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
                "note": "20MA 이격 +6.1% (≤+22%) · RSI14 61 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 97.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 171,000 / 20MA 161,240 (106.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.61 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 171700, 전봉 종가 170900 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -273,821→-347,746 / 기관 307,596→389,500 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 24% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 116% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 171000,
            "previousClose": 173200,
            "dailyChange": -2200,
            "dailyChangePct": -1.27,
            "dailyDirection": "down",
            "entryPriceText": "171,000원 (당일 종가 기준)",
            "entryPrice": 171000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 60.6871,
            "marketCapRank": 10,
            "marketCapUniverseCount": 2554,
            "keyPoint": "20일 고점 대비 -6.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-06-26 유상증자결정(자회사의 주요경영사항)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 171700, 전봉 종가 170900",
              "latestOpen": 170800.0,
              "latestClose": 171700.0,
              "previousClose": 170900.0
            },
            "toss": {
              "avgStrength": 97.0,
              "note": "토스 공개 체결강도 97.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A105560/order",
              "asOf": "2026-07-08T06:03:16Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 3.2548,
              "last30BuyVolume": 2223.0,
              "last30SellVolume": 683.0
            },
            "orderbook": {
              "bidAskRatio": 1.6089,
              "bidTotal": 1654,
              "askTotal": 1028,
              "note": "Naver 호가잔량합계 매수 1,654 / 매도 1,028",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=105560"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.71, ATR10 5.20%, 일간 표준편차 2.80%, 당일 레인지 4.27%.",
              "metrics": {
                "atrPct10": 5.2,
                "returnStd20": 2.8,
                "todayRangePct": 4.27,
                "vkospi": 87.71
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "60% 익절",
                "targetYield": "+2.3%",
                "targetPrice": "174,861원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.4%",
                "targetPrice": "176,850원",
                "historicalHitRate": 0.5677,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 169,200원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.1%",
                "targetPrice": "169,200원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 169200,
              "fallbackStopPrice": 167580,
              "effectiveHardStopPrice": 169200,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 169,200원와 기존 % 손절 167,580원 중 더 높은 169,200원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 169,200원이며, 기존 % 손절 167,580원보다 느슨해지지 않게 169,200원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 168350,
              "high": 170060,
              "anchor": 171000,
              "label": "168,350~170,060원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 182700,
                "retrace33Price": 174861,
                "retrace50Price": 176850,
                "nearestResistancePrice": 172600,
                "secondaryResistancePrice": 182700,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "174,861원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.4%",
                    "targetPrice": "176,850원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+6.8%",
                    "targetPrice": "182,700원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 169,200원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "169,200원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 182700,
                "retrace33Price": 174861,
                "retrace50Price": 176850,
                "nearestResistancePrice": 172600,
                "secondaryResistancePrice": 182700,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "174,861원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.4%",
                    "targetPrice": "176,850원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 169,200원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "169,200원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 62건)",
                "recentHighPrice": 182700,
                "retrace33Price": 174861,
                "retrace50Price": 176850,
                "nearestResistancePrice": 172600,
                "secondaryResistancePrice": 182700,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "174,861원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.4%",
                    "targetPrice": "176,850원",
                    "historicalHitRate": 0.5677,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 169,200원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "169,200원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 192건)",
                  "hitRate": 0.6667,
                  "ev": 1.165,
                  "sampleCount": 192
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 62건)",
              "sampleCount": 62,
              "ev": 0.025
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 192건)",
              "hitRate": 0.6667,
              "ev": 1.165,
              "sampleCount": 192
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
              "핵심 Gate 미충족: G4",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +10.5% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 +10.5% (필요 ≥ +15%) / G4 미충족: 최근 5거래일 최저 -1.3% (필요 -3% 이하 급락 1회 이상) / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 171000.0,
                "vs52wHighPct": 93.59605911330048,
                "vs52wLowPct": 64.42307692307693,
                "dropFrom52wHighPct": 6.403940886699508,
                "ma20GapPct": 6.053088563631853,
                "rsi14": 60.970786841897215,
                "volumeRatio20d": 118.20549593568572,
                "rs20Pct": 11.03896103896104,
                "tradingValueRank": 25.0,
                "marketCapRank": 10.0,
                "marketCapTrillion": 60.6871,
                "per": 10.82,
                "pbr": 1.02,
                "cnsPer": 9.53,
                "foreignRate": 79.63,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 2606.5654599714544
              },
              "evaluatedAt": "2026-07-08T15:03:27+09:00",
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
  "analysisDate": "2026-07-08",
  "pointInTime": true,
  "pointInTimeStatus": "confirmed",
  "analysisSession": "1730",
  "analysisSessionLabel": "5시반 분석",
  "sessionSources": [
    "1500",
    "1730"
  ]
};
