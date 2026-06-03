window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-05-24"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-05-24T11:35:41+00:00",
  "variant": "stable",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 22,
      "failed": 0,
      "stale": 0,
      "manual": 9,
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
      "toss_playwright_strength": {
        "ok": 6
      },
      "naver_orderbook_browser": {
        "ok": 5
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
        "durationMs": 2370.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1233.0,
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
        "durationMs": 81.9,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 0.2
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 3875.7,
        "count": 22
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 1455.4,
        "detail": "성공 22 / 실패 0",
        "count": 22
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 1.9,
        "detail": "pullback 3, momentum 3, reversal 3",
        "count": 9
      },
      {
        "step": "browser_enrichment",
        "label": "브라우저 보강 수집",
        "status": "ok",
        "durationMs": 64197.1,
        "detail": "playwright-chromium · 토스 6 / 호가 5 / KIND 1",
        "count": 6
      }
    ],
    "note": "현재 버전 채널입니다. CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 현재 버전은 Playwright 기반 브라우저 보강을 상위 추천 후보에 한해 적용합니다.",
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
            "item": "레짐",
            "value": "약세장 ⛔"
          },
          {
            "item": "KOSPI",
            "value": "7847.71 (+0.41%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 66.97"
          },
          {
            "item": "진입 전략",
            "value": "메인=없음 / 서브=없음"
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
            "value": "G-A 🟢 (+7.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 100% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6229.19",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7262.54",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 66.97",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 14 / 하락 5",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "공개 데이터 기반 레짐 산출 / 갭 G-A 🟢",
            "verdict": "약세장 ⛔"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다."
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "+2.19%",
            "baseScore": "+2점",
            "weight": "×2.5",
            "formula": "+2 × 2.5 = +5.0점",
            "weightedScore": "+5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.70",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-6.5bp",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+23.38원",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+5.30%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+7.5점",
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
            "name": "LG전자",
            "code": "066570",
            "score": 6.4,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 8"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA>20MA>60MA"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 > 60MA"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 84.2"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7531.99, VKOSPI 66.97"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "S2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "미충족 또는 공개 데이터 부족"
              },
              {
                "code": "C3",
                "note": "미충족 또는 공개 데이터 부족"
              }
            ],
            "currentPrice": 237000,
            "previousClose": 235000,
            "dailyChange": 2000,
            "dailyChangePct": 0.85,
            "dailyDirection": "up",
            "entryPriceText": "237,000원 (당일 종가 기준)",
            "entryPrice": 237000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -562,875주 / 기관 198,085주.",
            "notes": [
              "토스 체결강도·섹터 outperform은 미반영"
            ],
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
                "condition": "+1.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "240,555원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "242,925원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "244,110원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "251,220원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "258,330원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.5% 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "233,445원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "주성엔지니어링",
            "code": "036930",
            "score": 6.0,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 6"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA>20MA>60MA"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 > 60MA"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 93.8"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7531.99, VKOSPI 66.97"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "S2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C2",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "미충족 또는 공개 데이터 부족"
              },
              {
                "code": "C3",
                "note": "미충족 또는 공개 데이터 부족"
              }
            ],
            "currentPrice": 224000,
            "previousClose": 185200,
            "dailyChange": 38800,
            "dailyChangePct": 20.95,
            "dailyDirection": "up",
            "entryPriceText": "224,000원 (당일 종가 기준)",
            "entryPrice": 224000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 109,256주 / 기관 74,631주.",
            "notes": [
              "토스 체결강도·섹터 outperform은 미반영"
            ],
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
                "condition": "+1.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "227,360원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "229,600원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "230,720원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "237,440원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "244,160원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.5% 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "220,640원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "SK하이닉스",
            "code": "000660",
            "score": 5.2,
            "grade": "C",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 1"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA>20MA>60MA"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 > 60MA"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 84.4"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7531.99, VKOSPI 66.97"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "S2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "미충족 또는 공개 데이터 부족"
              },
              {
                "code": "C2",
                "note": "미충족 또는 공개 데이터 부족"
              },
              {
                "code": "C3",
                "note": "미충족 또는 공개 데이터 부족"
              }
            ],
            "currentPrice": 1941000,
            "previousClose": 1940000,
            "dailyChange": 1000,
            "dailyChangePct": 0.05,
            "dailyDirection": "up",
            "entryPriceText": "1,941,000원 (당일 종가 기준)",
            "entryPrice": 1941000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -158,042주 / 기관 152,990주.",
            "notes": [
              "토스 체결강도·섹터 outperform은 미반영"
            ],
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
                "condition": "+1.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "1,970,115원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "1,989,525원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,999,230원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "2,057,460원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "2,115,690원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-1.5% 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "1,911,885원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "momentum": [
          {
            "rank": 1,
            "name": "주성엔지니어링",
            "code": "036930",
            "score": 5.6,
            "grade": "C",
            "statusLabel": "매매금지(약세장)",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "3개월 상대강도 상위 10%"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "5일·20일 초과수익률"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 96.8%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 6"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C2",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "C3",
                "note": "토스 또는 추가 데이터 필요"
              }
            ],
            "currentPrice": 224000,
            "previousClose": 185200,
            "dailyChange": 38800,
            "dailyChangePct": 20.95,
            "dailyDirection": "up",
            "entryPriceText": "224,000원 (당일 종가 기준)",
            "entryPrice": 224000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 109,256주 / 기관 74,631주.",
            "notes": [
              "체결강도 100% 유지 비율 미반영"
            ],
            "toss": {
              "avgStrength": 113.3,
              "note": "토스 공개 체결강도 113.3%",
              "source": "toss_playwright_response",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-05-22T09:00:14Z"
            },
            "orderbook": {
              "bidAskRatio": 0.4676,
              "bidTotal": 26139,
              "askTotal": 55901,
              "note": "Naver 호가잔량합계 매수 26,139 / 매도 55,901",
              "source": "naver_orderbook_browser",
              "sourceUrl": "https://finance.naver.com/item/main.naver?code=036930"
            },
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.intradayAbove100Ratio",
                  "label": "100% 이상 유지 비율 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A036930/chart",
                  "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                  "instructions": [
                    "토스증권에서 주성엔지니어링 (036930) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.intradayAbove100Ratio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "228,480원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "232,960원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "235,200원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "241,920원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "248,640원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.0% 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "219,520원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "빛과전자",
            "code": "069540",
            "score": 5.6,
            "grade": "C",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "3개월 상대강도 상위 10%"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "5일·20일 초과수익률"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "52주 고가 대비 81.6%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 40"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C2",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "C3",
                "note": "토스 또는 추가 데이터 필요"
              }
            ],
            "currentPrice": 6610,
            "previousClose": 5090,
            "dailyChange": 1520,
            "dailyChangePct": 29.86,
            "dailyDirection": "up",
            "entryPriceText": "6,610원 (당일 종가 기준)",
            "entryPrice": 6610,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 5,816,074주 / 기관 3,679주.",
            "notes": [
              "체결강도 100% 유지 비율 미반영",
              "호가잔량 미반영"
            ],
            "toss": {
              "avgStrength": 127.7,
              "note": "토스 공개 체결강도 127.7%",
              "source": "toss_playwright_response",
              "sourceUrl": "https://www.tossinvest.com/stocks/A069540/order",
              "asOf": "2026-05-22T09:00:30Z"
            },
            "orderbook": {},
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.intradayAbove100Ratio",
                  "label": "100% 이상 유지 비율 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A069540/chart",
                  "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                  "instructions": [
                    "토스증권에서 빛과전자 (069540) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A069540/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 빛과전자 (069540) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.25"
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.intradayAbove100Ratio",
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "6,742원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "6,874원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "6,940원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "7,139원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "7,337원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.0% 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "6,478원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "삼성전기",
            "code": "009150",
            "score": 4.0,
            "grade": "C",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "momentum",
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "3개월 상대강도 상위 10%"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "5일·20일 초과수익률"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "52주 고가 대비 98.2%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 4"
              }
            ],
            "matchedRules": [
              {
                "code": "P1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C2",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "S2",
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "C3",
                "note": "토스 또는 추가 데이터 필요"
              }
            ],
            "currentPrice": 1340000,
            "previousClose": 1204000,
            "dailyChange": 136000,
            "dailyChangePct": 11.3,
            "dailyDirection": "up",
            "entryPriceText": "1,340,000원 (당일 종가 기준)",
            "entryPrice": 1340000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 10,236주 / 기관 -67,764주.",
            "notes": [
              "체결강도 100% 유지 비율 미반영"
            ],
            "toss": {
              "avgStrength": 101.0,
              "note": "토스 공개 체결강도 101.0%",
              "source": "toss_playwright_response",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-05-22T10:59:59Z"
            },
            "orderbook": {
              "bidAskRatio": 0.9905,
              "bidTotal": 10663,
              "askTotal": 10765,
              "note": "Naver 호가잔량합계 매수 10,663 / 매도 10,765",
              "source": "naver_orderbook_browser",
              "sourceUrl": "https://finance.naver.com/item/main.naver?code=009150"
            },
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.intradayAbove100Ratio",
                  "label": "100% 이상 유지 비율 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A009150/chart",
                  "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                  "instructions": [
                    "토스증권에서 삼성전기 (009150) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.intradayAbove100Ratio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+2.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,366,800원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "1,393,600원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "1,407,000원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "1,447,200원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "1,487,400원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.0% 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,313,200원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "SFA반도체",
            "code": "036540",
            "score": 5.4,
            "grade": "C",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 9"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 1.7조"
              },
              {
                "code": "F3",
                "status": "⚠️",
                "note": "실적/배당/분할 일정 수동 확인 필요"
              },
              {
                "code": "F4",
                "status": "⚠️",
                "note": "최근 5거래일 재진입 이력 수동 확인 필요"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 35.4%"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -6.5%"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 > 60MA"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 -5% 급락 이력"
              },
              {
                "code": "G5-a",
                "status": "✅",
                "note": "안정화 캔들"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C2",
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C3",
                "note": "토스·이벤트 데이터 필요"
              }
            ],
            "currentPrice": 10250,
            "previousClose": 8950,
            "dailyChange": 1300,
            "dailyChangePct": 14.53,
            "dailyDirection": "up",
            "entryPriceText": "10,250원 (당일 종가 기준)",
            "entryPrice": 10250,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -6.5% 조정 후 안정화 패턴 여부를 점검했습니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영",
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A036540/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SFA반도체 (036540) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 SFA반도체 (036540) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength",
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
              "note": "직전 30분봉 종가 10250, 전봉 종가 10270",
              "latestOpen": 10250.0,
              "latestClose": 10250.0,
              "previousClose": 10270.0
            },
            "toss": {
              "avgStrength": 100.5,
              "note": "토스 공개 체결강도 100.5%",
              "source": "toss_playwright_response",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036540/order",
              "asOf": "2026-05-22T09:00:04Z"
            },
            "orderbook": {
              "bidAskRatio": 1.5675,
              "bidTotal": 235237,
              "askTotal": 150072,
              "note": "Naver 호가잔량합계 매수 235,237 / 매도 150,072",
              "source": "naver_orderbook_browser",
              "sourceUrl": "https://finance.naver.com/item/main.naver?code=036540"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "10,558원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "10,711원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "11,070원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "9,942원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "쏠리드",
            "code": "050890",
            "score": 5.4,
            "grade": "C",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 35"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 1.1조"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-05-18 기업설명회(IR) 개최"
              },
              {
                "code": "F4",
                "status": "⚠️",
                "note": "최근 5거래일 재진입 이력 수동 확인 필요"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 9.3%"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -13.3%"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 > 60MA"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 -5% 급락 이력"
              },
              {
                "code": "G5-a",
                "status": "✅",
                "note": "안정화 캔들"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C2",
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C3",
                "note": "토스·이벤트 데이터 필요"
              }
            ],
            "currentPrice": 18130,
            "previousClose": 15740,
            "dailyChange": 2390,
            "dailyChangePct": 15.18,
            "dailyDirection": "up",
            "entryPriceText": "18,130원 (당일 종가 기준)",
            "entryPrice": 18130,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -13.3% 조정 후 안정화 패턴 여부를 점검했습니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A050890/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 쏠리드 (050890) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-05-18 기업설명회(IR) 개최",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 18130, 전봉 종가 18040",
              "latestOpen": 18130.0,
              "latestClose": 18130.0,
              "previousClose": 18040.0
            },
            "toss": {
              "avgStrength": 121.4,
              "note": "토스 공개 체결강도 121.4%",
              "source": "toss_playwright_response",
              "sourceUrl": "https://www.tossinvest.com/stocks/A050890/order",
              "asOf": "2026-05-22T09:00:11Z"
            },
            "orderbook": {
              "bidAskRatio": 2.6285,
              "bidTotal": 50975,
              "askTotal": 19393,
              "note": "Naver 호가잔량합계 매수 50,975 / 매도 19,393",
              "source": "naver_orderbook_browser",
              "sourceUrl": "https://finance.naver.com/item/main.naver?code=050890"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "18,674원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "18,946원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "19,580원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "17,586원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "LG씨엔에스",
            "code": "064400",
            "score": 5.4,
            "grade": "C",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 38"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 8.1조"
              },
              {
                "code": "F3",
                "status": "⚠️",
                "note": "실적/배당/분할 일정 수동 확인 필요"
              },
              {
                "code": "F4",
                "status": "⚠️",
                "note": "최근 5거래일 재진입 이력 수동 확인 필요"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 24.2%"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -16.3%"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 > 60MA"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 -5% 급락 이력"
              },
              {
                "code": "G5-a",
                "status": "✅",
                "note": "안정화 캔들"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "P2",
                "note": "공개 데이터 충족"
              },
              {
                "code": "C1",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C2",
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C3",
                "note": "토스·이벤트 데이터 필요"
              }
            ],
            "currentPrice": 83200,
            "previousClose": 80200,
            "dailyChange": 3000,
            "dailyChangePct": 3.74,
            "dailyDirection": "up",
            "entryPriceText": "83,200원 (당일 종가 기준)",
            "entryPrice": 83200,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -16.3% 조정 후 안정화 패턴 여부를 점검했습니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영",
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
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
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 LG씨엔에스 (064400) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength",
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
              "note": "직전 30분봉 종가 83200, 전봉 종가 82800",
              "latestOpen": 83200.0,
              "latestClose": 83200.0,
              "previousClose": 82800.0
            },
            "toss": {
              "avgStrength": 108.0,
              "note": "토스 공개 체결강도 108.0%",
              "source": "toss_playwright_response",
              "sourceUrl": "https://www.tossinvest.com/stocks/A064400/order",
              "asOf": "2026-05-22T10:59:59Z"
            },
            "orderbook": {
              "bidAskRatio": 1.6432,
              "bidTotal": 34495,
              "askTotal": 20992,
              "note": "Naver 호가잔량합계 매수 34,495 / 매도 20,992",
              "source": "naver_orderbook_browser",
              "sourceUrl": "https://finance.naver.com/item/main.naver?code=064400"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "85,696원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "86,944원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "89,856원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "80,704원"
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
  "analysisDate": "2026-05-24"
};
