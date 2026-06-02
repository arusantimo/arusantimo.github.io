window.JONGGA_CANARY_DAILY_DATA = window.JONGGA_CANARY_DAILY_DATA || {};
window.JONGGA_CANARY_DAILY_DATA["2026-06-02"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-02T05:54:12+00:00",
  "variant": "canary",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 19,
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
        "ok": 19
      },
      "naver_chart": {
        "ok": 19
      },
      "naver_integration_schedule": {
        "ok": 1
      },
      "yahoo_chart": {
        "ok": 5
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
        "durationMs": 1090.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 174.1,
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
        "durationMs": 1380.7,
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
        "durationMs": 57657.7,
        "count": 19
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 7916.5,
        "detail": "성공 19 / 실패 0",
        "count": 19
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 7352.2,
        "detail": "direct-http · 체결강도 19 / 호가 19 / 틱프록시 19",
        "count": 19
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 4.5,
        "detail": "pullback 3, momentum 3, reversal 3",
        "count": 9
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 36825.2,
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
            "value": "8829.75 (+0.47%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.13"
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
            "value": "G-B 🔵 (+5.0점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 80% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6486.71",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7815.47",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.13",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 15 / 하락 5",
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
          "marketAnalyzeDate": "20260602",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 45.7,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1511원과 과열 이격이 겹쳤지만 펀더멘털 앵커 89점과 non-critical bubble(BI 46 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 8829.75,
          "kospiMa5": 8501.653999999999,
          "vkospiValue": 73.13,
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
            "actualValue": "+0.57%",
            "baseScore": "+1점",
            "weight": "×2.5",
            "formula": "+1 × 2.5 = +2.5점",
            "weightedScore": "+2.5점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.05",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-1.8bp",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+9.94원",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+6.25%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+5.0점",
        "grade": "G-B 🔵",
        "code": "G-B",
        "entryAdjustment": "✅ 100% 진입 / ✅ 80% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 유지",
        "swingAdjustment": "허용",
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
            "statusLabel": "관심후보",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 10",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 237,910 > 20MA 212,732 > 60MA 212,502",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 280,250 / 60MA 212,502",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 63.4 (필요 ≥ 50)",
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
                "note": "KOSPI>8501.65, VKOSPI 73.13 · 거시·레짐 완화",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "거래대금 순위 10위 (TOP10 이내 시 S1 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -1,135,272주 / 기관 633,251주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 -7.8% (필요 -7%~-15%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 280,250 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 10.81 (필요 ≥ 1.0)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 428% (필요 100~180%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -2.77% / KOSPI +0.47% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 280250,
            "previousClose": 271500,
            "dailyChange": 8750,
            "dailyChangePct": 3.22,
            "dailyDirection": "up",
            "entryPriceText": "280,250원 (당일 종가 기준)",
            "entryPrice": 280250,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -1,135,272주 / 기관 633,251주.",
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
                "targetPrice": "288,658원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "292,861원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "305,472원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "313,880원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "322,288원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "271,842원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "SK하이닉스",
            "code": "000660",
            "score": 6.0,
            "grade": "B",
            "statusLabel": "관심후보",
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
                "note": "5MA 2,316,600 > 20MA 1,935,700 > 60MA 1,332,133",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 2,349,000 / 60MA 1,332,133",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 87.8 (필요 ≥ 50)",
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
                "note": "KOSPI>8501.65, VKOSPI 73.13 · 거시·레짐 완화",
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
                "note": "외인 -729,059주 / 기관 859,988주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 2,349,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 1.76 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 117% (필요 100~180%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "20일 고점 대비 -2.4% (필요 -7%~-15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.59% / KOSPI +0.47% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2349000,
            "previousClose": 2363000,
            "dailyChange": -14000,
            "dailyChangePct": -0.59,
            "dailyDirection": "down",
            "entryPriceText": "2,349,000원 (당일 종가 기준)",
            "entryPrice": 2349000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -729,059주 / 기관 859,988주.",
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
                "targetPrice": "2,419,470원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "2,454,705원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "2,560,410원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "2,630,880원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "2,701,350원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "2,278,530원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "현대모비스",
            "code": "012330",
            "score": 5.6,
            "grade": "B",
            "statusLabel": "관심후보",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 26",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 732,800 > 20MA 605,925 > 60MA 477,100",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 763,000 / 60MA 477,100",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 86.8 (필요 ≥ 50)",
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
                "note": "KOSPI>8501.65, VKOSPI 73.13 · 거시·레짐 완화",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 -501,493주 / 기관 96,566주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 -7.2% (필요 -7%~-15%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 763,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 3.88 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 133% (필요 100~180%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "거래대금 순위 26위 (TOP10 이내 시 S1 충족)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -2.10% / KOSPI +0.47% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 763000,
            "previousClose": 761000,
            "dailyChange": 2000,
            "dailyChangePct": 0.26,
            "dailyDirection": "up",
            "entryPriceText": "763,000원 (당일 종가 기준)",
            "entryPrice": 763000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -501,493주 / 기관 96,566주.",
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
                "targetPrice": "785,890원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "797,335원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "831,670원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "854,560원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "877,450원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "740,110원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "momentum": [
          {
            "rank": 1,
            "name": "두산로보틱스",
            "code": "454910",
            "score": 4.8,
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
                "note": "5일 초과 +42.5% / 20일 초과 +13.8%",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 92.3% (필요 ≥ 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 15",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 741,633주 / 기관 31,559주 · 동시 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 95.7% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 983% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 9.83 (필요 ≥ 1.2)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 93.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 92.3% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 41% / 윗꼬리·몸통 0.77",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 162700,
            "previousClose": 138400,
            "dailyChange": 24300,
            "dailyChangePct": 17.56,
            "dailyDirection": "up",
            "entryPriceText": "162,700원 (당일 종가 기준)",
            "entryPrice": 162700,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 741,633주 / 기관 31,559주.",
            "notes": [],
            "toss": {
              "avgStrength": 93.0,
              "note": "토스 공개 체결강도 93.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A454910/order",
              "asOf": "2026-06-02T05:53:29Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 134.8,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 9.8295,
              "bidTotal": 4669,
              "askTotal": 475,
              "note": "토스 호가잔량합계 매수 4,669 / 매도 475",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A454910/quotes?viewType=krx_all&investMode=krx"
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
                "targetPrice": "169,208원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "174,089원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "187,105원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "191,986원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "196,867원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "156,192원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "성호전자",
            "code": "043260",
            "score": 4.4,
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
                "status": "⛔",
                "note": "5일 초과 +6.2% / 20일 초과 -17.8%",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "52주 고가 대비 79.6% (필요 ≥ 92%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 30",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 117.4% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 557% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 95.7% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 75% / 윗꼬리·몸통 0.29",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -270,114주 / 기관 231,041주 · 동시 순매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 94.0% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.80 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 47450,
            "previousClose": 39450,
            "dailyChange": 8000,
            "dailyChangePct": 20.28,
            "dailyDirection": "up",
            "entryPriceText": "47,450원 (당일 종가 기준)",
            "entryPrice": 47450,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -270,114주 / 기관 231,041주.",
            "notes": [],
            "toss": {
              "avgStrength": 117.4,
              "note": "토스 공개 체결강도 117.4% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A043260/order",
              "asOf": "2026-06-02T05:53:31Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.8005,
              "bidTotal": 12901,
              "askTotal": 16116,
              "note": "토스 호가잔량합계 매수 12,901 / 매도 16,116",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A043260/quotes?viewType=krx_all&investMode=krx"
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
                "targetPrice": "49,348원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "50,772원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "54,567원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "55,991원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "57,414원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "45,552원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "삼성전자",
            "code": "005930",
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
                "note": "5일 초과 +11.9% / 20일 초과 +31.0%",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 96.4% (필요 ≥ 92%)",
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
                "code": "P1",
                "note": "20일 고점 대비 98.2% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 208% (필요 ≥ 150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.4% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -180,865주 / 기관 3,832,695주 · 동시 순매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 체결강도 96.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C2",
                "note": "몸통 21% / 윗꼬리·몸통 1.80",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.93 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 363500,
            "previousClose": 349000,
            "dailyChange": 14500,
            "dailyChangePct": 4.15,
            "dailyDirection": "up",
            "entryPriceText": "363,500원 (당일 종가 기준)",
            "entryPrice": 363500,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -180,865주 / 기관 3,832,695주.",
            "notes": [],
            "toss": {
              "avgStrength": 96.0,
              "note": "토스 공개 체결강도 96.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-06-02T05:53:29Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 1.2,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.9335,
              "bidTotal": 154173,
              "askTotal": 165148,
              "note": "토스 호가잔량합계 매수 154,173 / 매도 165,148",
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
                "targetPrice": "378,040원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "388,945원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "418,025원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "428,930원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "439,835원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "348,960원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "성호전자",
            "code": "043260",
            "score": 7.2,
            "grade": "A",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 30",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 3.4조 (필요 ≥ 30조)",
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
                "status": "⛔",
                "note": "1개월 수익률 +8.3% (필요 ≥ +30%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -6.0% (필요 -7%~-20%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 47,450 / 60MA 44,127",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -14.2% (필요 -5% 이하 급락 1회 이상)",
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
                "note": "외인 240,984→-270,114 / 기관 -128,699→231,041 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 117.4% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 47,450 / 20MA 41,412",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 78% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 417% (필요 ≥ 200%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.80 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 48250, 전봉 종가 47950 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 47450,
            "previousClose": 39450,
            "dailyChange": 8000,
            "dailyChangePct": 20.28,
            "dailyDirection": "up",
            "entryPriceText": "47,450원 (당일 종가 기준)",
            "entryPrice": 47450,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -6.0% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                    "KIND 공시에서 성호전자 (043260) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 48250, 전봉 종가 47950",
              "latestOpen": 48250.0,
              "latestClose": 48250.0,
              "previousClose": 47950.0
            },
            "toss": {
              "avgStrength": 117.4,
              "note": "토스 공개 체결강도 117.4% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A043260/order",
              "asOf": "2026-06-02T05:53:31Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 0.8005,
              "bidTotal": 12901,
              "askTotal": 16116,
              "note": "토스 호가잔량합계 매수 12,901 / 매도 16,116",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A043260/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "48,874원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "49,585원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "51,246원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "46,026원"
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
                "note": "거래대금 TOP40 순위 10",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 43.9조 (필요 ≥ 30조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-06-01 기업설명회(IR) 개최(안내공시)",
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
                "note": "1개월 수익률 +27.4% (필요 ≥ +30%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -7.8% (필요 -7%~-20%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 280,250 / 60MA 212,502",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -0.6% (필요 -5% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 10.81)",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 100.0% / 마지막 1시간 110.5% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 280,250 / 20MA 212,732",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 68% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 428% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.42 (필요 ≥ 1.0)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 161,395→-1,135,272 / 기관 877,348→633,251 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 282000, 전봉 종가 282000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 280250,
            "previousClose": 271500,
            "dailyChange": 8750,
            "dailyChangePct": 3.22,
            "dailyDirection": "up",
            "entryPriceText": "280,250원 (당일 종가 기준)",
            "entryPrice": 280250,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -7.8% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
              "note": "KIND 최근공시 2026-06-01 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 282000, 전봉 종가 282000",
              "latestOpen": 282000.0,
              "latestClose": 282000.0,
              "previousClose": 282000.0
            },
            "toss": {
              "avgStrength": 100.0,
              "note": "토스 공개 체결강도 100.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-02T05:53:29Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 110.5,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 1.4188,
              "bidTotal": 46296,
              "askTotal": 32630,
              "note": "토스 호가잔량합계 매수 46,296 / 매도 32,630",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A035420/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "288,658원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "292,861원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "302,670원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "271,842원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "두산로보틱스",
            "code": "454910",
            "score": 6.3,
            "grade": "B",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 15",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 10.5조 (필요 ≥ 30조)",
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
                "note": "1개월 수익률 +59.2% (필요 ≥ +30%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -4.3% (필요 -7%~-20%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 162,700 / 60MA 96,590",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -3.6% (필요 -5% 이하 급락 1회 이상)",
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
                "note": "당일 평균 93.0% / 마지막 1시간 134.8% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 162,700 / 20MA 109,950",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 68% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 1487% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 9.83 (필요 ≥ 1.0)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 46,495→741,633 / 기관 59,760→31,559 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 162700, 전봉 종가 162300 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 162700,
            "previousClose": 138400,
            "dailyChange": 24300,
            "dailyChangePct": 17.56,
            "dailyDirection": "up",
            "entryPriceText": "162,700원 (당일 종가 기준)",
            "entryPrice": 162700,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -4.3% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                    "KIND 공시에서 두산로보틱스 (454910) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 162700, 전봉 종가 162300",
              "latestOpen": 162700.0,
              "latestClose": 162700.0,
              "previousClose": 162300.0
            },
            "toss": {
              "avgStrength": 93.0,
              "note": "토스 공개 체결강도 93.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A454910/order",
              "asOf": "2026-06-02T05:53:29Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 134.8,
              "lastHourObservedMinutes": 1
            },
            "orderbook": {
              "bidAskRatio": 9.8295,
              "bidTotal": 4669,
              "askTotal": 475,
              "note": "토스 호가잔량합계 매수 4,669 / 매도 475",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A454910/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "167,581원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "170,022원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "175,716원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "157,819원"
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
  "analysisDate": "2026-06-02"
};
