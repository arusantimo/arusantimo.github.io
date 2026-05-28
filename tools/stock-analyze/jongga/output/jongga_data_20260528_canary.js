window.JONGGA_CANARY_DAILY_DATA = window.JONGGA_CANARY_DAILY_DATA || {};
window.JONGGA_CANARY_DAILY_DATA["2026-05-28"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-05-28T05:53:28+00:00",
  "variant": "canary",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 15,
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
        "ok": 15
      },
      "naver_chart": {
        "ok": 15
      },
      "naver_integration_schedule": {
        "ok": 0
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 15
      },
      "toss_http_strength": {
        "ok": 15
      },
      "toss_ticks_strength_proxy": {
        "ok": 15
      },
      "toss_quotes_orderbook": {
        "ok": 15
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
        "durationMs": 1357.0,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 825.3,
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
        "durationMs": 1352.8,
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
        "durationMs": 45241.7,
        "count": 15
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 5133.3,
        "detail": "성공 15 / 실패 0",
        "count": 15
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 3952.4,
        "detail": "direct-http · 체결강도 15 / 호가 15 / 틱프록시 15",
        "count": 15
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 3.7,
        "detail": "pullback 3, momentum 3, reversal 3",
        "count": 9
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 28899.1,
        "detail": "chrome:google-chrome · KIND 0",
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
            "value": "8112.74 (-1.41%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 71.16"
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
            "value": "G-A 🟢 (+9.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 100% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6325.09",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7503.66",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 71.16",
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
          "marketAnalyzeDate": "20260528",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 45.58,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1501원과 과열 이격이 겹쳤지만 펀더멘털 앵커 89점과 non-critical bubble(BI 46 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 8112.74,
          "kospiMa5": 8010.45,
          "vkospiValue": 71.16,
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
            "actualValue": "+1.09%",
            "baseScore": "+1점",
            "weight": "×2.5",
            "formula": "+1 × 2.5 = +2.5점",
            "weightedScore": "+2.5점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.29",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-10.5bp",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-1.02원",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+12.35%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+9.5점",
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
            "name": "삼성전자",
            "code": "005930",
            "score": 6.4,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 2",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 299,400 > 20MA 272,575 > 60MA 221,942",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 299,000 / 60MA 221,942",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 82.6 (필요 ≥ 50)",
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
                "status": "⛔",
                "note": "KOSPI>8010.45, VKOSPI 71.16 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "거래대금 순위 2위 (TOP10 이내 시 S1 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -274,173주 / 기관 1,550,904주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 -7.4% (필요 -7%~-15%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 299,000 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 155% (필요 100~180%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.96 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.63% / KOSPI -1.41% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 299000,
            "previousClose": 307000,
            "dailyChange": -8000,
            "dailyChangePct": -2.61,
            "dailyDirection": "down",
            "entryPriceText": "299,000원 (당일 종가 기준)",
            "entryPrice": 299000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -274,173주 / 기관 1,550,904주.",
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
                "targetPrice": "307,970원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "312,455원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "325,910원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "334,880원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "343,850원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "290,030원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "현대차",
            "code": "005380",
            "score": 6.4,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 9",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 673,400 > 20MA 627,800 > 60MA 548,825",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 676,000 / 60MA 548,825",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 68.7 (필요 ≥ 50)",
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
                "status": "⛔",
                "note": "KOSPI>8010.45, VKOSPI 71.16 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "거래대금 순위 9위 (TOP10 이내 시 S1 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -332,576주 / 기관 8,519주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 -12.7% (필요 -7%~-15%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 676,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 2.08 (필요 ≥ 1.0)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 294% (필요 100~180%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.75% / KOSPI -1.41% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 676000,
            "previousClose": 681000,
            "dailyChange": -5000,
            "dailyChangePct": -0.73,
            "dailyDirection": "down",
            "entryPriceText": "676,000원 (당일 종가 기준)",
            "entryPrice": 676000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -332,576주 / 기관 8,519주.",
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
                "targetPrice": "696,280원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "706,420원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "736,840원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "757,120원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "777,400원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "655,720원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "SK하이닉스",
            "code": "000660",
            "score": 6.0,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 1",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 2,084,600 > 20MA 1,775,000 > 60MA 1,259,400",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 2,247,000 / 60MA 1,259,400",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 80.7 (필요 ≥ 50)",
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
                "status": "⛔",
                "note": "KOSPI>8010.45, VKOSPI 71.16 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "거래대금 순위 1위 (TOP10 이내 시 S1 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -18,203주 / 기관 529,897주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 2,247,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 12.00 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 159% (필요 100~180%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "20일 고점 대비 -4.7% (필요 -7%~-15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -6.09% / KOSPI -1.41% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2247000,
            "previousClose": 2243000,
            "dailyChange": 4000,
            "dailyChangePct": 0.18,
            "dailyDirection": "up",
            "entryPriceText": "2,247,000원 (당일 종가 기준)",
            "entryPrice": 2247000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -18,203주 / 기관 529,897주.",
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
                "targetPrice": "2,314,410원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "2,348,115원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "2,449,230원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "2,516,640원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "2,584,050원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "2,179,590원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "momentum": [
          {
            "rank": 1,
            "name": "삼화콘덴서",
            "code": "001820",
            "score": 4.0,
            "grade": "C",
            "statusLabel": "제외",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "3개월 상대강도 상위 10%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "5일 초과 +88.0% / 20일 초과 +127.9%",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 93.5% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 24",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "P1",
                "note": "20일 고점 대비 96.5% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 1362% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 99.0% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 70% / 윗꼬리·몸통 0.06",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 15,026주 / 기관 -291,203주 · 동시 순매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 체결강도 101.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.95 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 157600,
            "previousClose": 125900,
            "dailyChange": 31700,
            "dailyChangePct": 25.18,
            "dailyDirection": "up",
            "entryPriceText": "157,600원 (당일 종가 기준)",
            "entryPrice": 157600,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 15,026주 / 기관 -291,203주.",
            "notes": [],
            "toss": {
              "avgStrength": 101.0,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001820/order",
              "asOf": "2026-05-28T05:52:58Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 40.1,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.951,
              "bidTotal": 5201,
              "askTotal": 5469,
              "note": "토스 호가잔량합계 매수 5,201 / 매도 5,469",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A001820/quotes?viewType=krx_all&investMode=krx"
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
                "targetPrice": "163,904원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "168,632원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "181,240원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "185,968원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "190,696원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "151,296원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "삼성전기",
            "code": "009150",
            "score": 3.2,
            "grade": "C",
            "statusLabel": "제외",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "3개월 상대강도 상위 10%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "5일 초과 +63.2% / 20일 초과 +112.2%",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 99.2% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 3",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "P1",
                "note": "20일 고점 대비 99.2% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 329% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 99.2% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 38,712주 / 기관 -54,977주 · 동시 순매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 105.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 60% / 윗꼬리·몸통 0.08",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.38 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1865000,
            "previousClose": 1630000,
            "dailyChange": 235000,
            "dailyChangePct": 14.42,
            "dailyDirection": "up",
            "entryPriceText": "1,865,000원 (당일 종가 기준)",
            "entryPrice": 1865000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 38,712주 / 기관 -54,977주.",
            "notes": [],
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-05-28T05:52:56Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 229.8,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.3821,
              "bidTotal": 1477,
              "askTotal": 3865,
              "note": "토스 호가잔량합계 매수 1,477 / 매도 3,865",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A009150/quotes?viewType=krx_all&investMode=krx"
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
                "targetPrice": "1,939,600원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "1,995,550원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "2,144,750원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "2,200,700원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "2,256,650원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "1,790,400원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "디앤디파마텍",
            "code": "347850",
            "score": 3.2,
            "grade": "C",
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
                "note": "5일 초과 +76.6% / 20일 초과 +13.3%",
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
                "note": "거래대금 TOP40 순위 29",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "P1",
                "note": "20일 고점 대비 96.9% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 2294% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.46 (필요 ≥ 1.2)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -60,597주 / 기관 539,191주 · 동시 순매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 체결강도 114.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 86.6% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 5% / 윗꼬리·몸통 13.23",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 111200,
            "previousClose": 98800,
            "dailyChange": 12400,
            "dailyChangePct": 12.55,
            "dailyDirection": "up",
            "entryPriceText": "111,200원 (당일 종가 기준)",
            "entryPrice": 111200,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -60,597주 / 기관 539,191주.",
            "notes": [],
            "toss": {
              "avgStrength": 114.0,
              "note": "토스 공개 체결강도 114.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A347850/order",
              "asOf": "2026-05-28T05:52:57Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 62.7,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 1.4648,
              "bidTotal": 11989,
              "askTotal": 8185,
              "note": "토스 호가잔량합계 매수 11,989 / 매도 8,185",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A347850/quotes?viewType=krx_all&investMode=krx"
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
                "targetPrice": "115,648원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "118,984원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "127,880원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "131,216원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "134,552원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "106,752원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "삼성전기",
            "code": "009150",
            "score": 7.2,
            "grade": "A",
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
                "note": "시총 139.3조 (필요 ≥ 30조)",
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
                "note": "1개월 수익률 +136.7% (필요 ≥ +30%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -0.8% (필요 -7%~-20%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,865,000 / 60MA 703,117",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +3.7% (필요 -5% 이하 급락 1회 이상)",
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
                "note": "외인 -131,003→38,712 / 기관 -71,840→-54,977 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 105.0% / 마지막 1시간 229.8% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,865,000 / 20MA 1,088,500",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 95% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 224% (필요 ≥ 200%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.38 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1768000, 전봉 종가 1771000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1865000,
            "previousClose": 1630000,
            "dailyChange": 235000,
            "dailyChangePct": 14.42,
            "dailyDirection": "up",
            "entryPriceText": "1,865,000원 (당일 종가 기준)",
            "entryPrice": 1865000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -0.8% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                    "KIND 공시에서 삼성전기 (009150) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 1768000, 전봉 종가 1771000",
              "latestOpen": 1768000.0,
              "latestClose": 1768000.0,
              "previousClose": 1771000.0
            },
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-05-28T05:52:56Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 229.8,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.3821,
              "bidTotal": 1477,
              "askTotal": 3865,
              "note": "토스 호가잔량합계 매수 1,477 / 매도 3,865",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A009150/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,920,950원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,948,925원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "2,014,200원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,809,050원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "삼성SDI",
            "code": "006400",
            "score": 5.4,
            "grade": "B",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 13",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 54.0조 (필요 ≥ 30조)",
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
                "note": "1개월 수익률 +4.5% (필요 ≥ +30%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -7.3% (필요 -7%~-20%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 670,000 / 60MA 519,525",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.9% (필요 -5% 이하 급락 1회 이상)",
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
                "note": "외인 -35,507→68,701 / 기관 -35,862→-51,698 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 670,000 / 20MA 651,700",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 64% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 481% (필요 ≥ 200%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 135.0% / 마지막 1시간 21.4% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.23 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 661000, 전봉 종가 660000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 670000,
            "previousClose": 630000,
            "dailyChange": 40000,
            "dailyChangePct": 6.35,
            "dailyDirection": "up",
            "entryPriceText": "670,000원 (당일 종가 기준)",
            "entryPrice": 670000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -7.3% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                    "KIND 공시에서 삼성SDI (006400) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 661000, 전봉 종가 660000",
              "latestOpen": 661000.0,
              "latestClose": 661000.0,
              "previousClose": 660000.0
            },
            "toss": {
              "avgStrength": 135.0,
              "note": "토스 공개 체결강도 135.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A006400/order",
              "asOf": "2026-05-28T05:52:56Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 21.4,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.2321,
              "bidTotal": 2967,
              "askTotal": 12785,
              "note": "토스 호가잔량합계 매수 2,967 / 매도 12,785",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A006400/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "690,100원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "700,150원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "723,600원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "649,900원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "LG이노텍",
            "code": "011070",
            "score": 5.4,
            "grade": "B",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 19",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 26.5조 (필요 ≥ 30조)",
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
                "note": "1개월 수익률 +106.3% (필요 ≥ +30%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -13.7% (필요 -7%~-20%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,118,000 / 60MA 474,142",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -2.2% (필요 -5% 이하 급락 1회 이상)",
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
                "code": "S2",
                "note": "당일 평균 102.0% / 마지막 1시간 111.3% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,118,000 / 20MA 755,200",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 68% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 261% (필요 ≥ 200%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -99,563→-250,627 / 기관 24,303→-155,326 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.73 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1095000, 전봉 종가 1097000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1118000,
            "previousClose": 1044000,
            "dailyChange": 74000,
            "dailyChangePct": 7.09,
            "dailyDirection": "up",
            "entryPriceText": "1,118,000원 (당일 종가 기준)",
            "entryPrice": 1118000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -13.7% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1095000, 전봉 종가 1097000",
              "latestOpen": 1095000.0,
              "latestClose": 1095000.0,
              "previousClose": 1097000.0
            },
            "toss": {
              "avgStrength": 102.0,
              "note": "토스 공개 체결강도 102.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-05-28T05:52:56Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 111.3,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.7272,
              "bidTotal": 1671,
              "askTotal": 2298,
              "note": "토스 호가잔량합계 매수 1,671 / 매도 2,298",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A011070/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,151,540원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,168,310원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "1,207,440원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,084,460원"
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
  "analysisDate": "2026-05-28"
};
