window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-10-16T08:35:59+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 17,
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
        "ok": 17
      },
      "naver_chart": {
        "ok": 17
      },
      "naver_integration_schedule": {
        "ok": 3
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 17
      },
      "toss_http_strength": {
        "ok": 17
      },
      "toss_ticks_strength_proxy": {
        "ok": 17
      },
      "toss_quotes_orderbook": {
        "ok": 17
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
        "data_missing": 14
      },
      "krx_short_balance_direct_post": {
        "ok": 14
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
        "count": 14
      }
    ],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 1032.3,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 314.4,
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
        "durationMs": 1916.8,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 558.7,
        "detail": "약세장 ⛔"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 57166.7,
        "count": 17
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 1111.5,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "partial",
        "durationMs": 122653.7,
        "detail": "후보 14종목 중 14건 수집 · fallback 14건 (krx_short_balance_direct_post)",
        "count": 14
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 7748.5,
        "detail": "성공 17 / 실패 0",
        "count": 17
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 10238.3,
        "detail": "direct-http · 체결강도 17 / 호가 17 / 틱프록시 17",
        "count": 17
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 89.2,
        "detail": "pullback 0, breakout 0, accumulation 0, reversal 3",
        "count": 3
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 27783.8,
        "detail": "playwright-chromium · KIND 3",
        "count": 3
      },
      {
        "step": "blacklist_check",
        "label": "공매도 과열·투자 주의 검증",
        "status": "ok",
        "durationMs": 35444.1,
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
            "value": "5668.05 (+2.05%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 48.89"
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
            "value": "G-C 🟡 (-0.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 70% 진입 / ⚠️ 50% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6634.90",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6632.85",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 48.89",
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
            "value": "표준 레짐 / RI 56.94419702285107",
            "verdict": "⚠️"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20261016",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "약세장 ⛔",
          "regimeAdjustmentReason": "기술 레짐 유지",
          "riseJustified": false,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 76.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 43.31,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 56.94419702285107,
          "stageOverrideReason": "지지력 보정: raw P 58 -> adjusted P 57 · F_support 5점",
          "kospiClose": 5668.05,
          "kospiMa5": 5930.134,
          "vkospiValue": 48.89,
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
            "actualValue": "-2.36%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.04",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-15.5bp",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-9.31원",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-8.26%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "-0.5점",
        "grade": "G-C 🟡",
        "code": "G-C",
        "entryAdjustment": "✅ 70% 진입 / ⚠️ 50% 진입",
        "sellAdjustment": "프리마켓 갭업 기준 -0.5%p 하향 | 손절폭 -0.5%p 축소",
        "swingAdjustment": "조건부 허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-10-17T03:59:00+00:00",
          "vix": "2026-10-16T20:15:00+00:00",
          "tnx": "2026-10-16T19:00:00+00:00",
          "krw": "2026-10-16T22:59:00+00:00",
          "sox": "2026-10-17T00:00:00+00:00"
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
            "name": "셀트리온",
            "code": "068270",
            "strictScore": 8.7,
            "signalScore": 8.7,
            "score": 8.7,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.7,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -49,246→9,584 / 기관 75,435→280,321 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 225.0% / 마지막 1시간 112.3% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 193,700 / 20MA 180,685 (107.2% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 209% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.50 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 194000, 전봉 종가 194900 미달"
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
                "note": "당일 거래대금 순위 28위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 45.0조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-10-12 연결재무제표기준영업(잠정)실적(공정공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-10-06~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +8.7% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -0.9% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 193,700 / 60MA 185,360",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.3% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +7.2% (≤+22%) · RSI14 67 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -49,246→9,584 / 기관 75,435→280,321 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 225.0% / 마지막 1시간 112.3% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 193,700 / 20MA 180,685 (107.2% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 85% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 209% (필요 ≥ 200%) · 투매 클라이맥스",
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
                "code": "C3",
                "note": "직전 30분봉 종가 194000, 전봉 종가 194900 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 193700,
            "previousClose": 181600,
            "dailyChange": 12100,
            "dailyChangePct": 6.66,
            "dailyDirection": "up",
            "entryPriceText": "193,700원 (당일 종가 기준)",
            "entryPrice": 193700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 45.0347,
            "marketCapRank": 12,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -0.9% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-10-12 연결재무제표기준영업(잠정)실적(공정공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 194000, 전봉 종가 194900",
              "latestOpen": 194000.0,
              "latestClose": 194000.0,
              "previousClose": 194900.0
            },
            "toss": {
              "avgStrength": 225.0,
              "note": "토스 공개 체결강도 225.0% / 최근 체결 36분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A068270/order",
              "asOf": "2026-10-16T08:34:28Z",
              "intradayAbove100Ratio": 34.4,
              "observedMinutes": 36,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 36분 프록시",
              "lastHourAvgStrength": 112.3,
              "lastHourObservedMinutes": 36,
              "last30AvgStrength": 131.3,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.0564,
              "last30BuyVolume": 581.0,
              "last30SellVolume": 550.0
            },
            "orderbook": {
              "bidAskRatio": 1.5044,
              "bidTotal": 5181,
              "askTotal": 3444,
              "note": "토스 호가잔량합계 매수 5,181 / 매도 3,444",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A068270/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 48.89, ATR10 3.43%, 일간 표준편차 1.86%, 당일 레인지 6.44%.",
              "metrics": {
                "atrPct10": 3.43,
                "returnStd20": 1.86,
                "todayRangePct": 6.44,
                "vkospi": 48.89
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
                "targetPrice": "199,511원",
                "historicalHitRate": 0.6977,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "203,385원",
                "historicalHitRate": 0.6047,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 189,826원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "189,826원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 183800,
              "fallbackStopPrice": 189826,
              "effectiveHardStopPrice": 189826,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 183,800원와 기존 % 손절 189,826원 중 더 높은 189,826원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 183,800원이며, 기존 % 손절 189,826원보다 느슨해지지 않게 189,826원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 190698,
              "high": 192635,
              "anchor": 193700,
              "label": "190,698~192,635원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 195500,
                "retrace33Price": 194294,
                "retrace50Price": 194600,
                "nearestResistancePrice": 195500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "195,637원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "197,574원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+2.5%",
                    "targetPrice": "198,542원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 189,826원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "189,826원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 195500,
                "retrace33Price": 194294,
                "retrace50Price": 194600,
                "nearestResistancePrice": 195500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "195,637원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.0%",
                    "targetPrice": "197,574원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 189,826원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "189,826원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 43건)",
                "recentHighPrice": 195500,
                "retrace33Price": 194294,
                "retrace50Price": 194600,
                "nearestResistancePrice": 195500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "199,511원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "203,385원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 189,826원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "189,826원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 43건)",
              "sampleCount": 43,
              "ev": 0.6951
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 43건)",
              "hitRate": 0.6977,
              "ev": 2.283,
              "sampleCount": 43
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 +8.7% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 +8.7% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -0.9% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -1.3% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 193700.0,
                "vs52wHighPct": 74.93230174081238,
                "vs52wLowPct": 22.828154724159795,
                "dropFrom52wHighPct": 25.067698259187623,
                "ma20GapPct": 7.203143592439881,
                "rsi14": 66.50652456278706,
                "volumeRatio20d": 285.89304996054653,
                "rs20Pct": 9.435028248587571,
                "tradingValueRank": 28.0,
                "marketCapRank": 12.0,
                "marketCapTrillion": 45.0347,
                "per": 29.48,
                "pbr": 2.47,
                "cnsPer": 28.38,
                "foreignRate": 25.29,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 29.982236567949546
              },
              "evaluatedAt": "2026-10-16T17:34:55+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "삼성바이오로직스",
            "code": "207940",
            "strictScore": 6.6,
            "signalScore": 6.6,
            "score": 6.6,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.6,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -7,242→-31,252 / 기관 -4,088→58,608 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 134.0% / 마지막 1시간 155.4% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 1,284,000 / 20MA 1,327,430 (96.7% · 필요 ≥ 98%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 56% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 196% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.51 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1298000, 전봉 종가 1318000 미달"
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
                "note": "당일 거래대금 순위 29위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 59.4조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-10-07 결산실적공시 예고(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-10-06~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -8.6% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -10.2% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 1,284,000 / 60MA 1,434,630",
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
                "note": "20MA 이격 -3.3% (≤+22%) · RSI14 43 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -7,242→-31,252 / 기관 -4,088→58,608 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 134.0% / 마지막 1시간 155.4% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 56% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.51 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 1,284,000 / 20MA 1,327,430 (96.7% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 196% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1298000, 전봉 종가 1318000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1284000,
            "previousClose": 1241000,
            "dailyChange": 43000,
            "dailyChangePct": 3.46,
            "dailyDirection": "up",
            "entryPriceText": "1,284,000원 (당일 종가 기준)",
            "entryPrice": 1284000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 59.4376,
            "marketCapRank": 7,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -10.2% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-10-07 결산실적공시 예고(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1298000, 전봉 종가 1318000",
              "latestOpen": 1298000.0,
              "latestClose": 1298000.0,
              "previousClose": 1318000.0
            },
            "toss": {
              "avgStrength": 134.0,
              "note": "토스 공개 체결강도 134.0% / 최근 체결 79분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A207940/order",
              "asOf": "2026-10-16T08:34:48Z",
              "intradayAbove100Ratio": 45.3,
              "observedMinutes": 79,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 79분 프록시",
              "lastHourAvgStrength": 155.4,
              "lastHourObservedMinutes": 60,
              "last30AvgStrength": 161.5,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.3478,
              "last30BuyVolume": 31.0,
              "last30SellVolume": 23.0
            },
            "orderbook": {
              "bidAskRatio": 1.514,
              "bidTotal": 162,
              "askTotal": 107,
              "note": "토스 호가잔량합계 매수 162 / 매도 107",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A207940/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 48.89, ATR10 5.07%, 일간 표준편차 2.36%, 당일 레인지 9.75%.",
              "metrics": {
                "atrPct10": 5.07,
                "returnStd20": 2.36,
                "todayRangePct": 9.75,
                "vkospi": 48.89
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+2.3%",
                "targetPrice": "1,313,000원",
                "historicalHitRate": 0.6977,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+4.1%",
                "targetPrice": "1,337,000원",
                "historicalHitRate": 0.6047,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,258,320원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,258,320원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1216000,
              "fallbackStopPrice": 1258320,
              "effectiveHardStopPrice": 1258320,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,216,000원와 기존 % 손절 1,258,320원 중 더 높은 1,258,320원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,216,000원이며, 기존 % 손절 1,258,320원보다 느슨해지지 않게 1,258,320원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 1264098,
              "high": 1276938,
              "anchor": 1284000,
              "label": "1,264,098~1,276,938원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1429907,
                "retrace33Price": 1332149,
                "retrace50Price": 1356954,
                "nearestResistancePrice": 1313000,
                "secondaryResistancePrice": 1337000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "1,313,000원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.1%",
                    "targetPrice": "1,337,000원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+11.4%",
                    "targetPrice": "1,429,907원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,258,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,258,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1429907,
                "retrace33Price": 1332149,
                "retrace50Price": 1356954,
                "nearestResistancePrice": 1313000,
                "secondaryResistancePrice": 1337000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "1,313,000원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+4.1%",
                    "targetPrice": "1,337,000원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,258,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,258,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 43건)",
                "recentHighPrice": 1429907,
                "retrace33Price": 1332149,
                "retrace50Price": 1356954,
                "nearestResistancePrice": 1313000,
                "secondaryResistancePrice": 1337000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "1,313,000원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+4.1%",
                    "targetPrice": "1,337,000원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,258,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,258,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 43건)",
              "sampleCount": 43,
              "ev": 0.6951
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 43건)",
              "hitRate": 0.6977,
              "ev": 2.283,
              "sampleCount": 43
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 -8.6% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 -8.6% (필요 ≥ +15%) / G3 미충족: 종가 1,284,000 / 60MA 1,434,630 / G4 미충족: 최근 5거래일 최저 -2.1% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1284000.0,
                "vs52wHighPct": 64.62003019627579,
                "vs52wLowPct": 19.88795518207283,
                "dropFrom52wHighPct": 35.37996980372421,
                "ma20GapPct": -3.271699174984434,
                "rsi14": 42.56113652276914,
                "volumeRatio20d": 300.3651751189411,
                "rs20Pct": -7.706042307147679,
                "tradingValueRank": 29.0,
                "marketCapRank": 7.0,
                "marketCapTrillion": 59.4376,
                "per": 35.77,
                "pbr": 7.16,
                "cnsPer": 31.65,
                "foreignRate": 12.83,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": -3.2674105484116858
              },
              "evaluatedAt": "2026-10-16T17:34:55+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "한화에어로스페이스",
            "code": "012450",
            "strictScore": 6.6,
            "signalScore": 6.6,
            "score": 6.6,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.6,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -17,304→3,729 / 기관 10,764→18,922 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 125.0% / 마지막 1시간 112.3% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 888,000 / 20MA 990,150 (89.7% · 필요 ≥ 98%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 71% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 100% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.01 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 888000, 전봉 종가 889000 미달"
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
                "note": "당일 거래대금 순위 32위 (필요 ≤ 100위)",
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
                "status": "⛔",
                "note": "KIND 최근공시 2026-10-08 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "⛔",
                "note": "최근 손절 이력 1건 (최근: 2026-10-12) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -17.9% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -21.4% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 888,000 / 60MA 1,024,333",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.1% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 -10.3% (≤+22%) · RSI14 39 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -17,304→3,729 / 기관 10,764→18,922 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 125.0% / 마지막 1시간 112.3% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 71% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.01 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 888,000 / 20MA 990,150 (89.7% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 100% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 888000, 전봉 종가 889000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 888000,
            "previousClose": 815000,
            "dailyChange": 73000,
            "dailyChangePct": 8.96,
            "dailyDirection": "up",
            "entryPriceText": "888,000원 (당일 종가 기준)",
            "entryPrice": 888000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 45.7883,
            "marketCapRank": 11,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -21.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "직전 30분봉 종가 888000, 전봉 종가 889000",
              "latestOpen": 888000.0,
              "latestClose": 888000.0,
              "previousClose": 889000.0
            },
            "toss": {
              "avgStrength": 125.0,
              "note": "토스 공개 체결강도 125.0% / 최근 체결 135분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A012450/order",
              "asOf": "2026-10-16T08:34:45Z",
              "intradayAbove100Ratio": 38.5,
              "observedMinutes": 135,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 135분 프록시",
              "lastHourAvgStrength": 112.3,
              "lastHourObservedMinutes": 60,
              "last30AvgStrength": 112.2,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.0114,
              "last30BuyVolume": 89.0,
              "last30SellVolume": 88.0
            },
            "orderbook": {
              "bidAskRatio": 2.009,
              "bidTotal": 444,
              "askTotal": 221,
              "note": "토스 호가잔량합계 매수 444 / 매도 221",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A012450/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 48.89, ATR10 6.75%, 일간 표준편차 3.74%, 당일 레인지 9.33%.",
              "metrics": {
                "atrPct10": 6.75,
                "returnStd20": 3.74,
                "todayRangePct": 9.33,
                "vkospi": 48.89
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
                "targetPrice": "914,640원",
                "historicalHitRate": 0.6977,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.0%",
                "targetPrice": "914,640원",
                "historicalHitRate": 0.6047,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 870,240원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "870,240원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 834000,
              "fallbackStopPrice": 870240,
              "effectiveHardStopPrice": 870240,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 834,000원와 기존 % 손절 870,240원 중 더 높은 870,240원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 834,000원이며, 기존 % 손절 870,240원보다 느슨해지지 않게 870,240원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 874236,
              "high": 883116,
              "anchor": 888000,
              "label": "874,236~883,116원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1130000,
                "retrace33Price": 967860,
                "retrace50Price": 1009000,
                "nearestResistancePrice": 892000,
                "secondaryResistancePrice": 910000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+9.0%",
                    "targetPrice": "967,860원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "910,000원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+27.3%",
                    "targetPrice": "1,130,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 870,240원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "870,240원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1130000,
                "retrace33Price": 967860,
                "retrace50Price": 1009000,
                "nearestResistancePrice": 892000,
                "secondaryResistancePrice": 910000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+9.0%",
                    "targetPrice": "967,860원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+9.0%",
                    "targetPrice": "967,860원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 870,240원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "870,240원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 43건)",
                "recentHighPrice": 1130000,
                "retrace33Price": 967860,
                "retrace50Price": 1009000,
                "nearestResistancePrice": 892000,
                "secondaryResistancePrice": 910000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "914,640원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "914,640원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 870,240원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "870,240원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 43건)",
              "sampleCount": 43,
              "ev": 0.6951
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 43건)",
              "hitRate": 0.6977,
              "ev": 2.283,
              "sampleCount": 43
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
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G3",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-10-12) · 재진입 차단 · 외 2건",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-10-12) · 재진입 차단 / G1 미충족: 1개월 수익률 -17.9% (필요 ≥ +15%) / G3 미충족: 종가 888,000 / 60MA 1,024,333",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 888000.0,
                "vs52wHighPct": 51.83887915936952,
                "vs52wLowPct": 13.409961685823754,
                "dropFrom52wHighPct": 48.161120840630474,
                "ma20GapPct": -10.31661869413725,
                "rsi14": 38.894886417290635,
                "volumeRatio20d": 141.04787927679786,
                "rs20Pct": -21.624007060900265,
                "tradingValueRank": 32.0,
                "marketCapRank": 11.0,
                "marketCapTrillion": 45.7883,
                "per": 22.15,
                "pbr": 3.81,
                "cnsPer": 19.91,
                "foreignRate": 44.95,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -31.63415833469923
              },
              "evaluatedAt": "2026-10-16T17:34:55+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 6.7,
            "signalScore": 6.7,
            "score": 6.7,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.7,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -341,525→110,857 / 기관 -63,208→-152,770 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 96.5% / 마지막 1시간 108.5% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 212,000 / 20MA 226,810 (93.5% · 필요 ≥ 98%)"
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
                "note": "당일 거래량 / 5일 평균 64% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.46 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 212500, 전봉 종가 211500 충족"
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
                "note": "시총 9.9조 (필요 ≥ 5조)",
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
                "status": "⛔",
                "note": "최근 손절 이력 1건 (최근: 2026-10-13) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +1.4% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -25.4% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 212,000 / 60MA 185,428",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -18.6% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 10.00)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 -6.5% (≤+22%) · RSI14 48 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -341,525→110,857 / 기관 -63,208→-152,770 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 96.5% / 마지막 1시간 108.5% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 69% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 212500, 전봉 종가 211500 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 212,000 / 20MA 226,810 (93.5% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 64% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.46 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 212000,
            "previousClose": 197100,
            "dailyChange": 14900,
            "dailyChangePct": 7.56,
            "dailyDirection": "up",
            "entryPriceText": "212,000원 (당일 종가 기준)",
            "entryPrice": 212000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.854,
            "marketCapRank": 63,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -25.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-10-15까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 212500, 전봉 종가 211500",
              "latestOpen": 211500.0,
              "latestClose": 212500.0,
              "previousClose": 211500.0
            },
            "toss": {
              "avgStrength": 96.5,
              "note": "토스 공개 체결강도 96.5% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-10-16T06:05:03Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 108.5,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 108.5,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 1.4201,
              "last30BuyVolume": 1609.0,
              "last30SellVolume": 1133.0
            },
            "orderbook": {
              "bidAskRatio": 0.4633,
              "bidTotal": 18979,
              "askTotal": 40963,
              "note": "토스 호가잔량합계 매수 18,979 / 매도 40,963",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 48.05, ATR10 12.60%, 일간 표준편차 7.48%, 당일 레인지 7.36%.",
              "metrics": {
                "atrPct10": 12.6,
                "returnStd20": 7.48,
                "todayRangePct": 7.36,
                "vkospi": 48.05
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
                "targetPrice": "218,360원",
                "historicalHitRate": 0.6977,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "222,600원",
                "historicalHitRate": 0.6047,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 207,760원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "207,760원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 202000,
              "fallbackStopPrice": 207760,
              "effectiveHardStopPrice": 207760,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 202,000원와 기존 % 손절 207,760원 중 더 높은 207,760원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 202,000원이며, 기존 % 손절 207,760원보다 느슨해지지 않게 207,760원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 208714,
              "high": 210834,
              "anchor": 212000,
              "label": "208,714~210,834원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 284000,
                "retrace33Price": 235760,
                "retrace50Price": 248000,
                "nearestResistancePrice": 213500,
                "secondaryResistancePrice": 223500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+11.2%",
                    "targetPrice": "235,760원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.4%",
                    "targetPrice": "223,500원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+34.0%",
                    "targetPrice": "284,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 207,760원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "207,760원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 284000,
                "retrace33Price": 235760,
                "retrace50Price": 248000,
                "nearestResistancePrice": 213500,
                "secondaryResistancePrice": 223500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+11.2%",
                    "targetPrice": "235,760원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+11.2%",
                    "targetPrice": "235,760원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 207,760원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "207,760원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 43건)",
                "recentHighPrice": 284000,
                "retrace33Price": 235760,
                "retrace50Price": 248000,
                "nearestResistancePrice": 213500,
                "secondaryResistancePrice": 223500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "218,360원",
                    "historicalHitRate": 0.6977,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "222,600원",
                    "historicalHitRate": 0.6047,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 207,760원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "207,760원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 43건)",
                  "hitRate": 0.6977,
                  "ev": 2.283,
                  "sampleCount": 43
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 43건)",
              "sampleCount": 43,
              "ev": 0.6951
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 43건)",
              "hitRate": 0.6977,
              "ev": 2.283,
              "sampleCount": 43
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
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-10-13) · 재진입 차단 · 외 2건",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-10-13) · 재진입 차단 / G1 미충족: 1개월 수익률 +1.4% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -25.4% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 212000.0,
                "vs52wHighPct": 74.64788732394366,
                "vs52wLowPct": 704.5540796963948,
                "dropFrom52wHighPct": 25.352112676056336,
                "ma20GapPct": -6.529694457916317,
                "rsi14": 47.82853339439054,
                "volumeRatio20d": 97.85725303846958,
                "rs20Pct": 4.691358024691358,
                "tradingValueRank": 22.0,
                "marketCapRank": 63.0,
                "marketCapTrillion": 9.854,
                "per": 1376.62,
                "pbr": 16.36,
                "cnsPer": 0.0,
                "foreignRate": 9.93,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": -38.512515645730005
              },
              "evaluatedAt": "2026-10-16T15:05:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
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
  "analysisDate": "2026-10-16",
  "pointInTime": true,
  "pointInTimeStatus": "confirmed",
  "analysisSession": "1730",
  "analysisSessionLabel": "5시반 분석",
  "sessionSources": [
    "1500",
    "1730"
  ]
};
