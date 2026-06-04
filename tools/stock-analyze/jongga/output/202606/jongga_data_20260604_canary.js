window.JONGGA_CANARY_DAILY_DATA = window.JONGGA_CANARY_DAILY_DATA || {};
window.JONGGA_CANARY_DAILY_DATA["2026-06-04"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-04T06:08:40+00:00",
  "variant": "canary",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 22,
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
        "ok": 22
      },
      "naver_chart": {
        "ok": 22
      },
      "naver_integration_schedule": {
        "ok": 1
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 22
      },
      "toss_http_strength": {
        "ok": 22
      },
      "toss_ticks_strength_proxy": {
        "ok": 22
      },
      "toss_quotes_orderbook": {
        "ok": 22
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
        "durationMs": 2760.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 863.2,
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
        "durationMs": 1213.9,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 1.3,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 46135.4,
        "count": 22
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 7159.8,
        "detail": "성공 22 / 실패 0",
        "count": 22
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 6063.7,
        "detail": "direct-http · 체결강도 22 / 호가 22 / 틱프록시 22",
        "count": 22
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 5.7,
        "detail": "pullback 3, momentum 3, reversal 3",
        "count": 9
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 28239.6,
        "detail": "chrome:google-chrome · KIND 1",
        "count": 3
      }
    ],
    "note": "카나리 채널입니다. CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 카나리는 토스 공개 API로 체결강도·틱 프록시·호가를 병렬 수집하고, KIND 공시는 Chrome 실행 파일을 우선 시도해 표시 종목만 브라우저 보강합니다.",
    "channel": "canary",
    "channelLabel": "카나리",
    "browserSource": "chrome:google-chrome",
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
            "value": "8657.05 (-1.64%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.62"
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
            "value": "6537.44",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7900.06",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.62",
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
          "marketAnalyzeDate": "20260604",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 45.39,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1529원과 과열 이격이 겹쳤지만 펀더멘털 앵커 89점과 non-critical bubble(BI 45 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 8657.05,
          "kospiMa5": 8581.672,
          "vkospiValue": 73.62,
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
            "actualValue": "-0.33%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.06",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+3.6bp",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+33.99원",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+9.56%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "-0.5점",
        "grade": "G-C 🟡",
        "code": "G-C",
        "entryAdjustment": "✅ 70% 진입 / ⚠️ 50% 진입",
        "sellAdjustment": "프리마켓 갭업 기준 -0.5%p 하향 | 손절폭 -0.5%p 축소",
        "swingAdjustment": "조건부 허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다."
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "현대모비스",
            "code": "012330",
            "score": 8.0,
            "grade": "A",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
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
                "note": "5MA 745,000 > 20MA 621,800 > 60MA 482,183 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 751,000 / 60MA 482,183",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 81.4 (필요 ≥ 50)",
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
                "note": "KOSPI>8581.67, VKOSPI 73.62 · 변동성 경계",
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
                "note": "외인 -123,611주 / 기관 40,981주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 713,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 751,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 743,000 ≤ 종가 751,000)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 79% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +0.25% / KOSPI -1.64% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [],
            "currentPrice": 751000,
            "previousClose": 759000,
            "dailyChange": -8000,
            "dailyChangePct": -1.05,
            "dailyDirection": "down",
            "entryPriceText": "751,000원 (당일 종가 기준)",
            "entryPrice": 751000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -123,611주 / 기관 40,981주.",
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
                "condition": "+2.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "769,775원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "781,040원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "818,590원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "841,120원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "863,650원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "724,715원"
              }
            ],
            "rr": "1 : 0.7",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "SK하이닉스",
            "code": "000660",
            "score": 7.2,
            "grade": "A",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 149% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 2,326,800 > 20MA 1,978,050 > 60MA 1,354,967 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 2,289,000 / 60MA 1,354,967",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 85.6 (필요 ≥ 50)",
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
                "note": "KOSPI>8581.67, VKOSPI 73.62 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 2위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -416,517주 / 기관 90,158주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 2,262,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 2,289,000 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 66% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +12.37% / KOSPI -1.64% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.77 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2289000,
            "previousClose": 2360000,
            "dailyChange": -71000,
            "dailyChangePct": -3.01,
            "dailyDirection": "down",
            "entryPriceText": "2,289,000원 (당일 종가 기준)",
            "entryPrice": 2289000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -416,517주 / 기관 90,158주.",
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
                "condition": "+2.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "2,346,225원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "2,380,560원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "2,495,010원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "2,563,680원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "2,632,350원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "2,208,885원"
              }
            ],
            "rr": "1 : 0.7",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "삼성전기",
            "code": "009150",
            "score": 7.2,
            "grade": "A",
            "statusLabel": "매수추천",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 205% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,903,400 > 20MA 1,300,300 > 60MA 804,358 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,723,000 / 60MA 804,358",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 95.3 (필요 ≥ 50)",
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
                "note": "KOSPI>8581.67, VKOSPI 73.62 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 3위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 115,298주 / 기관 -168,884주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,650,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,723,000 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,650,000 ≤ 종가 1,723,000)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +0.45% / KOSPI -1.64% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 103% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1723000,
            "previousClose": 1813000,
            "dailyChange": -90000,
            "dailyChangePct": -4.96,
            "dailyDirection": "down",
            "entryPriceText": "1,723,000원 (당일 종가 기준)",
            "entryPrice": 1723000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 115,298주 / 기관 -168,884주.",
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
                "condition": "+2.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,766,075원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "1,791,920원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "1,878,070원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "1,929,760원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "1,981,450원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "1,662,695원"
              }
            ],
            "rr": "1 : 0.7",
            "source": "jongga-live"
          }
        ],
        "momentum": [
          {
            "rank": 1,
            "name": "주성엔지니어링",
            "code": "036930",
            "score": 8.4,
            "grade": "A",
            "statusLabel": "매수추천",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +3.1% / 20일 초과 +71.1%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 97.3% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 7",
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
                "code": "S1",
                "note": "외인 -190,922주 / 기관 48,043주 · 외인/기관 중 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 117.4% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 97.3% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 223% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 97.3% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 79% / 윗꼬리·몸통 0.14",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.31 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 248000,
            "previousClose": 196900,
            "dailyChange": 51100,
            "dailyChangePct": 25.95,
            "dailyDirection": "up",
            "entryPriceText": "248,000원 (당일 종가 기준)",
            "entryPrice": 248000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -190,922주 / 기관 48,043주.",
            "notes": [],
            "toss": {
              "avgStrength": 117.4,
              "note": "토스 공개 체결강도 117.4% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-06-04T06:08:06Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 2
            },
            "orderbook": {
              "bidAskRatio": 0.3067,
              "bidTotal": 25493,
              "askTotal": 83126,
              "note": "토스 호가잔량합계 매수 25,493 / 매도 83,126",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A036930/quotes?viewType=krx_all&investMode=krx"
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
                "condition": "+3.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "256,680원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+6.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+6.5%",
                "targetPrice": "264,120원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "285,200원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "292,640원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "300,080원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.5% 이탈",
                "quantity": "전량",
                "targetYield": "-4.5%",
                "targetPrice": "236,840원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "KB금융",
            "code": "105560",
            "score": 4.8,
            "grade": "C",
            "statusLabel": "제외",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +1.3% / 20일 초과 -21.0%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 94.2% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 39",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 56,539주 / 기관 41,486주 · 외인/기관 중 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 98.7% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 157% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.7% (필요 ≥ 95%)",
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
                "note": "당일 평균 126.0% / 100% 유지 66.7% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 65% / 윗꼬리·몸통 0.27",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 163800,
            "previousClose": 156600,
            "dailyChange": 7200,
            "dailyChangePct": 4.6,
            "dailyDirection": "up",
            "entryPriceText": "163,800원 (당일 종가 기준)",
            "entryPrice": 163800,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 56,539주 / 기관 41,486주.",
            "notes": [],
            "toss": {
              "avgStrength": 126.0,
              "note": "토스 공개 체결강도 126.0% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A105560/order",
              "asOf": "2026-06-04T06:08:09Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 170.0,
              "lastHourObservedMinutes": 3
            },
            "orderbook": {
              "bidAskRatio": 0.6202,
              "bidTotal": 7231,
              "askTotal": 11660,
              "note": "토스 호가잔량합계 매수 7,231 / 매도 11,660",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A105560/quotes?viewType=krx_all&investMode=krx"
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
                "condition": "+3.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "169,533원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+6.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+6.5%",
                "targetPrice": "174,447원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "188,370원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "193,284원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "198,198원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.5% 이탈",
                "quantity": "전량",
                "targetYield": "-4.5%",
                "targetPrice": "156,429원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "삼성전자",
            "code": "005930",
            "score": 4.4,
            "grade": "C",
            "statusLabel": "제외",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +10.1% / 20일 초과 +27.5%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 93.9% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 1",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -11,016,912주 / 기관 3,088,203주 · 외인/기관 중 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 95.7% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.6% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 4.67 (필요 ≥ 1.2) · 매수 잔량 우위",
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
                "note": "당일 평균 체결강도 100.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 128% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 27% / 윗꼬리·몸통 1.50",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 354000,
            "previousClose": 360500,
            "dailyChange": -6500,
            "dailyChangePct": -1.8,
            "dailyDirection": "down",
            "entryPriceText": "354,000원 (당일 종가 기준)",
            "entryPrice": 354000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -11,016,912주 / 기관 3,088,203주.",
            "notes": [],
            "toss": {
              "avgStrength": 100.0,
              "note": "토스 공개 체결강도 100.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-06-04T06:08:07Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 46.1,
              "lastHourObservedMinutes": 2
            },
            "orderbook": {
              "bidAskRatio": 4.6664,
              "bidTotal": 929820,
              "askTotal": 199259,
              "note": "토스 호가잔량합계 매수 929,820 / 매도 199,259",
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
                "condition": "+3.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "366,390원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+6.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+6.5%",
                "targetPrice": "377,010원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "407,100원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "417,720원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "428,340원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.5% 이탈",
                "quantity": "전량",
                "targetYield": "-4.5%",
                "targetPrice": "338,070원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "주성엔지니어링",
            "code": "036930",
            "score": 8.1,
            "grade": "S",
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
                "note": "시총 11.5조 (필요 ≥ 8조)",
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
                "note": "1개월 수익률 +96.8% (필요 ≥ +20%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -2.7% (필요 -7%~-20%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 248,000 / 60MA 113,948",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -9.2% (필요 -4% 이하 급락 1회 이상)",
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
                "note": "외인 127,042→-190,922 / 기관 -77,341→48,043 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 117.4% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 248,000 / 20MA 182,315 (136.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 89% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 240% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 245000, 전봉 종가 244000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.31 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 248000,
            "previousClose": 196900,
            "dailyChange": 51100,
            "dailyChangePct": 25.95,
            "dailyDirection": "up",
            "entryPriceText": "248,000원 (당일 종가 기준)",
            "entryPrice": 248000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -2.7% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 245000, 전봉 종가 244000",
              "latestOpen": 243500.0,
              "latestClose": 245000.0,
              "previousClose": 244000.0
            },
            "toss": {
              "avgStrength": 117.4,
              "note": "토스 공개 체결강도 117.4% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-06-04T06:08:06Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 2
            },
            "orderbook": {
              "bidAskRatio": 0.3067,
              "bidTotal": 25493,
              "askTotal": 83126,
              "note": "토스 호가잔량합계 매수 25,493 / 매도 83,126",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A036930/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "255,440원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "259,160원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "267,840원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "239,320원"
              }
            ],
            "rr": "1 : 0.9",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "삼성물산",
            "code": "028260",
            "score": 7.2,
            "grade": "A",
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
                "note": "시총 86.9조 (필요 ≥ 8조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-06-02 기업설명회(IR) 개최(안내공시)",
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
                "note": "1개월 수익률 +79.6% (필요 ≥ +20%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -5.1% (필요 -7%~-20%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 536,000 / 60MA 334,258",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -2.7% (필요 -4% 이하 급락 1회 이상)",
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
                "note": "외인 -2,374→27,596 / 기관 135,367→48,647 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 105.0% / 마지막 1시간 113.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 536,000 / 20MA 423,825 (126.5% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 70% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 247% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.76 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 537000, 전봉 종가 537000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 536000,
            "previousClose": 485500,
            "dailyChange": 50500,
            "dailyChangePct": 10.4,
            "dailyDirection": "up",
            "entryPriceText": "536,000원 (당일 종가 기준)",
            "entryPrice": 536000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -5.1% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
              "note": "KIND 최근공시 2026-06-02 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 537000, 전봉 종가 537000",
              "latestOpen": 537000.0,
              "latestClose": 537000.0,
              "previousClose": 537000.0
            },
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A028260/order",
              "asOf": "2026-06-04T06:08:07Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 113.1,
              "lastHourObservedMinutes": 2
            },
            "orderbook": {
              "bidAskRatio": 0.7563,
              "bidTotal": 4521,
              "askTotal": 5978,
              "note": "토스 호가잔량합계 매수 4,521 / 매도 5,978",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A028260/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "552,080원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "560,120원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "578,880원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "517,240원"
              }
            ],
            "rr": "1 : 0.9",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "SK네트웍스",
            "code": "001740",
            "score": 7.2,
            "grade": "A",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 34위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 2.6조 (필요 ≥ 8조)",
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
                "status": "⚠️",
                "note": "최근 5거래일 재진입 이력 수동 확인 필요",
                "evalStatus": "manual_required"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +122.0% (필요 ≥ +20%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -6.7% (필요 -7%~-20%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 13,030 / 60MA 6,606",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.8% (필요 -4% 이하 급락 1회 이상)",
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
                "note": "외인 -334,180→-42,041 / 기관 -62,284→23,610 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 95.3% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 13,030 / 20MA 8,984 (145.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 75% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 13180, 전봉 종가 12450 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 91% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.06 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 13030,
            "previousClose": 12840,
            "dailyChange": 190,
            "dailyChangePct": 1.48,
            "dailyDirection": "up",
            "entryPriceText": "13,030원 (당일 종가 기준)",
            "entryPrice": 13030,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -6.7% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                    "KIND 공시에서 SK네트웍스 (001740) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 13180, 전봉 종가 12450",
              "latestOpen": 12450.0,
              "latestClose": 13180.0,
              "previousClose": 12450.0
            },
            "toss": {
              "avgStrength": 95.3,
              "note": "토스 공개 체결강도 95.3% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001740/order",
              "asOf": "2026-06-04T06:08:10Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.0566,
              "bidTotal": 3042,
              "askTotal": 53745,
              "note": "토스 호가잔량합계 매수 3,042 / 매도 53,745",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A001740/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "13,421원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "13,616원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "14,072원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.5% 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "12,574원"
              }
            ],
            "rr": "1 : 0.9",
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
  "analysisDate": "2026-06-04"
};
