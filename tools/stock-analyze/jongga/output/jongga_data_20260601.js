window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-01"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-01T05:52:08+00:00",
  "variant": "stable",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 23,
      "failed": 0,
      "stale": 0,
      "manual": 2,
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
        "ok": 1
      },
      "yahoo_chart": {
        "ok": 5
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
        "ok": 21
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
        "durationMs": 896.5,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 235.2,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "G-A 🟢"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1511.3,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 17.8,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 41323.4,
        "count": 23
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 5929.5,
        "detail": "성공 23 / 실패 0",
        "count": 23
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 5115.9,
        "detail": "direct-http · 체결강도 23 / 호가 21 / 틱프록시 23",
        "count": 23
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 6.6,
        "detail": "pullback 3, momentum 3, reversal 3",
        "count": 9
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 21920.6,
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
            "value": "강세장 ✅ (펀더·지수 정당)"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "8825.29 (+4.12%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.97"
          },
          {
            "item": "진입 전략",
            "value": "메인=수급매집형 / 서브=눌림목"
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
            "value": "G-A 🟢 (+12.0점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 100% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6433.23",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7705.77",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.97",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 14 / 하락 6",
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
          "marketAnalyzeDate": "20260601",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 45.84,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1507원과 과열 이격이 겹쳤지만 펀더멘털 앵커 89점과 non-critical bubble(BI 46 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 8825.29,
          "kospiMa5": 8352.588,
          "vkospiValue": 73.97,
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
            "actualValue": "+1.74%",
            "baseScore": "+2점",
            "weight": "×2.5",
            "formula": "+2 × 2.5 = +5.0점",
            "weightedScore": "+5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+15.32",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-4.0bp",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-8.31원",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+7.23%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+12.0점",
        "grade": "G-A 🟢",
        "code": "G-A",
        "entryAdjustment": "✅ 100% 진입 / ✅ 100% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 손절폭 유지",
        "swingAdjustment": "적극 허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다."
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "NAVER",
            "code": "035420",
            "score": 6.4,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 3",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 223,860 > 20MA 209,770 > 60MA 211,665 · 정배열 또는 5MA 5일 상승 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 281,500 / 60MA 211,665",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 61.7 (필요 ≥ 50)",
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
                "note": "KOSPI>8352.59, VKOSPI 73.97 · 거시·레짐 완화",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "거래대금 순위 3위 (TOP10 이내 시 S1 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 161,395주 / 기관 877,348주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 -7.4% (필요 -7%~-15%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 281,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 247,500 ≤ 종가 281,500)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 1241% (필요 100~180%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -2.93% / KOSPI +4.12% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 281500,
            "previousClose": 234000,
            "dailyChange": 47500,
            "dailyChangePct": 20.3,
            "dailyDirection": "up",
            "entryPriceText": "281,500원 (당일 종가 기준)",
            "entryPrice": 281500,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 161,395주 / 기관 877,348주.",
            "notes": [],
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
                "quantity": "40% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "289,945원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "294,168원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "306,835원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "315,280원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "323,725원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "273,055원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "삼성전기",
            "code": "009150",
            "score": 6.4,
            "grade": "B",
            "statusLabel": "관심후보",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 5",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,835,800 > 20MA 1,210,800 > 60MA 758,792",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 2,001,000 / 60MA 758,792",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 96.5 (필요 ≥ 50)",
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
                "note": "KOSPI>8352.59, VKOSPI 73.97 · 거시·레짐 완화",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "거래대금 순위 5위 (TOP10 이내 시 S1 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 24,854주 / 기관 -24,399주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 -8.7% (필요 -7%~-15%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 2,001,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 132% (필요 100~180%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.10 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +1.01% / KOSPI +4.12% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2001000,
            "previousClose": 2127000,
            "dailyChange": -126000,
            "dailyChangePct": -5.92,
            "dailyDirection": "down",
            "entryPriceText": "2,001,000원 (당일 종가 기준)",
            "entryPrice": 2001000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 24,854주 / 기관 -24,399주.",
            "notes": [],
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
                "quantity": "40% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "2,061,030원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "2,091,045원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "2,181,090원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "2,241,120원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "2,301,150원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,940,970원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "LG이노텍",
            "code": "011070",
            "score": 6.4,
            "grade": "B",
            "statusLabel": "관심후보",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 8",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,247,200 > 20MA 847,050 > 60MA 515,392",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,532,000 / 60MA 515,392",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 96.5 (필요 ≥ 50)",
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
                "note": "KOSPI>8352.59, VKOSPI 73.97 · 거시·레짐 완화",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "거래대금 순위 8위 (TOP10 이내 시 S1 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -58,060주 / 기관 90,736주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 -14.3% (필요 -7%~-15%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,532,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,480,000 ≤ 종가 1,532,000)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 383% (필요 100~180%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -0.83% / KOSPI +4.12% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1532000,
            "previousClose": 1458000,
            "dailyChange": 74000,
            "dailyChangePct": 5.08,
            "dailyDirection": "up",
            "entryPriceText": "1,532,000원 (당일 종가 기준)",
            "entryPrice": 1532000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -58,060주 / 기관 90,736주.",
            "notes": [],
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
                "quantity": "40% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,577,960원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,600,940원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "1,669,880원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "1,715,840원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "1,761,800원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,486,040원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "momentum": [
          {
            "rank": 1,
            "name": "삼성전자",
            "code": "005930",
            "score": 5.6,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "3개월 상대강도 상위 10% 밖",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "5일 초과 +7.0% / 20일 초과 +22.7%",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 99.9% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 1",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 134.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 99.9% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 180% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 99.9% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 81% / 윗꼬리·몸통 0.02",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -1,061,741주 / 기관 5,314,304주 · 동시 순매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.16 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 349500,
            "previousClose": 317000,
            "dailyChange": 32500,
            "dailyChangePct": 10.25,
            "dailyDirection": "up",
            "entryPriceText": "349,500원 (당일 종가 기준)",
            "entryPrice": 349500,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -1,061,741주 / 기관 5,314,304주.",
            "notes": [],
            "toss": {
              "avgStrength": 134.0,
              "note": "토스 공개 체결강도 134.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-06-01T05:51:42Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.1599,
              "bidTotal": 177465,
              "askTotal": 1109698,
              "note": "토스 호가잔량합계 매수 177,465 / 매도 1,109,698",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A005930/quotes?viewType=krx_all&investMode=krx"
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
                "condition": "+4.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "363,480원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "373,965원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "401,925원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "412,410원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "422,895원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "335,520원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "현대차",
            "code": "005380",
            "score": 5.6,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "3개월 상대강도 상위 10% 밖",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "5일 초과 +3.4% / 20일 초과 +4.6%",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 96.9% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 11",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 61,545주 / 기관 307,539주 · 동시 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 96.9% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 239% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.9% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.78 (필요 ≥ 1.2)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 체결강도 105.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C2",
                "note": "몸통 36% / 윗꼬리·몸통 0.92",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 759000,
            "previousClose": 723000,
            "dailyChange": 36000,
            "dailyChangePct": 4.98,
            "dailyDirection": "up",
            "entryPriceText": "759,000원 (당일 종가 기준)",
            "entryPrice": 759000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 61,545주 / 기관 307,539주.",
            "notes": [],
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005380/order",
              "asOf": "2026-06-01T05:51:41Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 80.8,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 1.7757,
              "bidTotal": 12215,
              "askTotal": 6879,
              "note": "토스 호가잔량합계 매수 12,215 / 매도 6,879",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A005380/quotes?viewType=krx_all&investMode=krx"
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
                "condition": "+4.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "789,360원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "812,130원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "872,850원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "895,620원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "918,390원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "728,640원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "LG씨엔에스",
            "code": "064400",
            "score": 5.6,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "3개월 상대강도 상위 10% 밖",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "5일 초과 +59.5% / 20일 초과 +82.6%",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 96.8% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 14",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 684,954주 / 기관 77,353주 · 동시 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 96.8% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 1141% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.8% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 84% / 윗꼬리·몸통 0.20",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 체결강도 101.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.14 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 143100,
            "previousClose": 113800,
            "dailyChange": 29300,
            "dailyChangePct": 25.75,
            "dailyDirection": "up",
            "entryPriceText": "143,100원 (당일 종가 기준)",
            "entryPrice": 143100,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 684,954주 / 기관 77,353주.",
            "notes": [],
            "toss": {
              "avgStrength": 101.0,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A064400/order",
              "asOf": "2026-06-01T05:51:41Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 70.7,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 1.1388,
              "bidTotal": 11445,
              "askTotal": 10050,
              "note": "토스 호가잔량합계 매수 11,445 / 매도 10,050",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A064400/quotes?viewType=krx_all&investMode=krx"
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
                "condition": "+4.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "148,824원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "153,117원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "164,565원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "168,858원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "173,151원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "137,376원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "삼성전자",
            "code": "005930",
            "score": 7.2,
            "grade": "A",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 1",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 2043.3조 (필요 ≥ 30조)",
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
                "status": "⚠️",
                "note": "최근 5거래일 재진입 이력 수동 확인 필요",
                "evalStatus": "manual_required"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +57.4% (필요 ≥ +30%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -0.1% (필요 -7%~-20%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 349,500 / 60MA 226,937",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -2.4% (필요 -5% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
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
                "note": "외인 -5,173,125→-1,061,741 / 기관 -1,613,562→5,314,304 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 134.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 349,500 / 20MA 283,525",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 99% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 209% (필요 ≥ 200%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.16 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 346500, 전봉 종가 346500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 349500,
            "previousClose": 317000,
            "dailyChange": 32500,
            "dailyChangePct": 10.25,
            "dailyDirection": "up",
            "entryPriceText": "349,500원 (당일 종가 기준)",
            "entryPrice": 349500,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -0.1% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                    "KIND 공시에서 삼성전자 (005930) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 346500, 전봉 종가 346500",
              "latestOpen": 346500.0,
              "latestClose": 346500.0,
              "previousClose": 346500.0
            },
            "toss": {
              "avgStrength": 134.0,
              "note": "토스 공개 체결강도 134.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-06-01T05:51:42Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.1599,
              "bidTotal": 177465,
              "askTotal": 1109698,
              "note": "토스 호가잔량합계 매수 177,465 / 매도 1,109,698",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A005930/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "359,985원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "365,228원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "377,460원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "339,015원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "NAVER",
            "code": "035420",
            "score": 6.3,
            "grade": "B",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 3",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 44.2조 (필요 ≥ 30조)",
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
                "status": "⚠️",
                "note": "최근 5거래일 재진입 이력 수동 확인 필요",
                "evalStatus": "manual_required"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +28.2% (필요 ≥ +30%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -7.4% (필요 -7%~-20%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 281,500 / 60MA 211,665",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.5% (필요 -5% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
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
                "note": "외인 -168,305→161,395 / 기관 88,078→877,348 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 281,500 / 20MA 209,770",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 65% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 1241% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.46 (필요 ≥ 1.0)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 124.0% / 마지막 1시간 11.7% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 276500, 전봉 종가 280500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 281500,
            "previousClose": 234000,
            "dailyChange": 47500,
            "dailyChangePct": 20.3,
            "dailyDirection": "up",
            "entryPriceText": "281,500원 (당일 종가 기준)",
            "entryPrice": 281500,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -7.4% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                    "KIND 공시에서 NAVER (035420) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 276500, 전봉 종가 280500",
              "latestOpen": 276500.0,
              "latestClose": 276500.0,
              "previousClose": 280500.0
            },
            "toss": {
              "avgStrength": 124.0,
              "note": "토스 공개 체결강도 124.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-01T05:51:41Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 11.7,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 1.457,
              "bidTotal": 47416,
              "askTotal": 32544,
              "note": "토스 호가잔량합계 매수 47,416 / 매도 32,544",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A035420/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "289,945원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "294,168원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "304,020원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "273,055원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "현대차",
            "code": "005380",
            "score": 6.3,
            "grade": "B",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 11",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 155.4조 (필요 ≥ 30조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-05-20 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "⚠️",
                "note": "최근 5거래일 재진입 이력 수동 확인 필요",
                "evalStatus": "manual_required"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +36.8% (필요 ≥ +30%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -3.1% (필요 -7%~-20%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 759,000 / 60MA 555,275",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.2% (필요 -5% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
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
                "note": "외인 -526,178→61,545 / 기관 14,849→307,539 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 759,000 / 20MA 646,400",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 67% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 303% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.78 (필요 ≥ 1.0)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 105.0% / 마지막 1시간 80.8% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 754000, 전봉 종가 753000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 759000,
            "previousClose": 723000,
            "dailyChange": 36000,
            "dailyChangePct": 4.98,
            "dailyDirection": "up",
            "entryPriceText": "759,000원 (당일 종가 기준)",
            "entryPrice": 759000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -3.1% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
              "note": "KIND 최근공시 2026-05-20 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 754000, 전봉 종가 753000",
              "latestOpen": 754000.0,
              "latestClose": 754000.0,
              "previousClose": 753000.0
            },
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005380/order",
              "asOf": "2026-06-01T05:51:41Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 80.8,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 1.7757,
              "bidTotal": 12215,
              "askTotal": 6879,
              "note": "토스 호가잔량합계 매수 12,215 / 매도 6,879",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A005380/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "781,770원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "793,155원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "819,720원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "736,230원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
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
  "analysisDate": "2026-06-01"
};
