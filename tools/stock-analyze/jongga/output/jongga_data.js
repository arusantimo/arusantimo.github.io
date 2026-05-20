window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-05-20T14:59:34+00:00",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 30,
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
        "ok": 30
      },
      "naver_chart": {
        "ok": 30
      },
      "naver_integration_schedule": {
        "ok": 2
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 30
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
        "durationMs": 1106.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1237.0,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.1,
        "detail": "G-D 🟠"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 100.0,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 0.3
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 92.8,
        "count": 30
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 1904.1,
        "detail": "성공 30 / 실패 0",
        "count": 30
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 1.6,
        "detail": "pullback 3, momentum 3, reversal 3",
        "count": 9
      }
    ],
    "note": "CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산하며, Naver 통합 일정이 있으면 이벤트 필터를 자동 반영합니다. 토스 체결강도/호가는 여전히 수동 또는 별도 수집이 필요합니다."
  },
  "slots": [
    {
      "slotId": "slotA",
      "sourceId": "live-public-run",
      "regime": {
        "table": [
          {
            "item": "레짐",
            "value": "약세장 ⛔"
          },
          {
            "item": "KOSPI",
            "value": "7208.95 (-0.86%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 71.37"
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
            "value": "G-D 🟠 (-6.5점)"
          },
          {
            "item": "갭 조정",
            "value": "⚠️ S등급 50% 진입만 허용 / ❌ 진입 보류"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6165.07",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7119.69",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 71.37",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 14 / 하락 5",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "공개 데이터 기반 레짐 산출 / 갭 G-D 🟠",
            "verdict": "약세장 ⛔"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다."
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-0.10%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+17.74",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+16.4bp",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+8.54원",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-2.53%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "-6.5점",
        "grade": "G-D 🟠",
        "code": "G-D",
        "entryAdjustment": "⚠️ S등급 50% 진입만 허용 / ❌ 진입 보류",
        "sellAdjustment": "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소",
        "swingAdjustment": "금지",
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
                "note": "주봉 RSI 79.4"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7494.25, VKOSPI 71.37"
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
            "entryPriceText": "276,000원 (당일 종가 기준)",
            "entryPrice": 276000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -5,733,354주 / 기관 2,756,787주.",
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
                "condition": "+0.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+0.5%",
                "targetPrice": "277,380원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+1.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "280,140원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "284,280원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "292,560원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "300,840원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "269,100원"
              }
            ],
            "rr": "1 : 0.2",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "한화생명",
            "code": "088350",
            "score": 5.6,
            "grade": "C",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
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
                "note": "주봉 RSI 63.9"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7494.25, VKOSPI 71.37"
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
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
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
            "entryPriceText": "5,300원 (당일 종가 기준)",
            "entryPrice": 5300,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 10,886주 / 기관 663,195주.",
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
                "condition": "+0.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+0.5%",
                "targetPrice": "5,326원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+1.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "5,379원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "5,459원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "5,618원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "5,777원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "5,168원"
              }
            ],
            "rr": "1 : 0.2",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "SK하이닉스",
            "code": "000660",
            "score": 5.6,
            "grade": "C",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
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
                "note": "주봉 RSI 73.6"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7494.25, VKOSPI 71.37"
              }
            ],
            "matchedRules": [
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
              },
              {
                "code": "C2",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "미충족 또는 공개 데이터 부족"
              },
              {
                "code": "C3",
                "note": "미충족 또는 공개 데이터 부족"
              }
            ],
            "entryPriceText": "1,745,000원 (당일 종가 기준)",
            "entryPrice": 1745000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -704,213주 / 기관 240,569주.",
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
                "condition": "+0.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+0.5%",
                "targetPrice": "1,753,725원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+1.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "1,771,175원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,797,350원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "1,849,700원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "1,902,050원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,701,375원"
              }
            ],
            "rr": "1 : 0.2",
            "source": "jongga-live"
          }
        ],
        "momentum": [
          {
            "rank": 1,
            "name": "이수화학",
            "code": "005950",
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
                "note": "52주 고가 대비 97.8%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 순위 8"
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
            "entryPriceText": "14,080원 (당일 종가 기준)",
            "entryPrice": 14080,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 394,052주 / 기관 232,181주.",
            "notes": [
              "토스 체결강도·호가잔량 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A005950/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 이수화학 (005950) 주문 화면을 엽니다.",
                    "체결강도 영역에서 당일 평균 값을 확인합니다.",
                    "예: 112.5 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.intradayAbove100Ratio",
                  "label": "100% 이상 유지 비율 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A005950/chart",
                  "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                  "instructions": [
                    "토스증권에서 이수화학 (005950) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A005950/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 이수화학 (005950) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.25"
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.intradayAbove100Ratio",
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "14,221원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "14,502원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "14,784원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "15,206원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "15,629원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "13,658원"
              }
            ],
            "rr": "1 : 0.3",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "삼화콘덴서",
            "code": "001820",
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
                "note": "52주 고가 대비 97.8%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 순위 30"
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
            "entryPriceText": "78,600원 (당일 종가 기준)",
            "entryPrice": 78600,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -52,011주 / 기관 102,516주.",
            "notes": [
              "토스 체결강도·호가잔량 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001820/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼화콘덴서 (001820) 주문 화면을 엽니다.",
                    "체결강도 영역에서 당일 평균 값을 확인합니다.",
                    "예: 112.5 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.intradayAbove100Ratio",
                  "label": "100% 이상 유지 비율 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001820/chart",
                  "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                  "instructions": [
                    "토스증권에서 삼화콘덴서 (001820) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001820/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼화콘덴서 (001820) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.25"
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.intradayAbove100Ratio",
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "79,386원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "80,958원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "82,530원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "84,888원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "87,246원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "76,242원"
              }
            ],
            "rr": "1 : 0.3",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "티웨이홀딩스",
            "code": "004870",
            "score": 3.2,
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
                "status": "⛔",
                "note": "52주 고가 대비 51.3%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 순위 4"
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
                "code": "C2",
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "C3",
                "note": "토스 또는 추가 데이터 필요"
              }
            ],
            "entryPriceText": "400원 (당일 종가 기준)",
            "entryPrice": 400,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -732,179주 / 기관 7,443주.",
            "notes": [
              "토스 체결강도·호가잔량 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A004870/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 티웨이홀딩스 (004870) 주문 화면을 엽니다.",
                    "체결강도 영역에서 당일 평균 값을 확인합니다.",
                    "예: 112.5 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.intradayAbove100Ratio",
                  "label": "100% 이상 유지 비율 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A004870/chart",
                  "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                  "instructions": [
                    "토스증권에서 티웨이홀딩스 (004870) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A004870/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 티웨이홀딩스 (004870) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.25"
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.intradayAbove100Ratio",
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+1.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "404원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "412원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "420원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "432원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "444원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "388원"
              }
            ],
            "rr": "1 : 0.3",
            "source": "jongga-live"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "티웨이홀딩스",
            "code": "004870",
            "score": 5.4,
            "grade": "C",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 순위 4"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 0.0조"
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
                "note": "1개월 수익률 30.7%"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 0.0%"
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
            "entryPriceText": "400원 (당일 종가 기준)",
            "entryPrice": 400,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 0.0% 조정 후 안정화 패턴 여부를 점검했습니다.",
            "notes": [
              "토스 체결강도·호가잔량 미반영",
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A004870/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 티웨이홀딩스 (004870) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A004870/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 티웨이홀딩스 (004870) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A004870/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 티웨이홀딩스 (004870) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08"
                  ]
                },
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 티웨이홀딩스 (004870) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.lastHourAvgStrength",
                "orderbook.bidAskRatio",
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
              "note": "직전 30분봉 종가 400, 전봉 종가 400",
              "latestOpen": 400.0,
              "latestClose": 400.0,
              "previousClose": 400.0
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "412원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "418원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "432원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "384원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "성문전자",
            "code": "014910",
            "score": 4.5,
            "grade": "C",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 순위 15"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 0.1조"
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
                "note": "1개월 수익률 77.6%"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -24.7%"
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
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C1",
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
            "entryPriceText": "3,125원 (당일 종가 기준)",
            "entryPrice": 3125,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -24.7% 조정 후 안정화 패턴 여부를 점검했습니다.",
            "notes": [
              "토스 체결강도·호가잔량 미반영",
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A014910/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 성문전자 (014910) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A014910/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 성문전자 (014910) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A014910/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 성문전자 (014910) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08"
                  ]
                },
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 성문전자 (014910) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.lastHourAvgStrength",
                "orderbook.bidAskRatio",
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
              "note": "직전 30분봉 종가 3125, 전봉 종가 3125",
              "latestOpen": 3125.0,
              "latestClose": 3125.0,
              "previousClose": 3125.0
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "3,219원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "3,266원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "3,375원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "3,000원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "SK하이닉스",
            "code": "000660",
            "score": 4.5,
            "grade": "C",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 순위 16"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 1243.7조"
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
                "note": "1개월 수익률 54.7%"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -12.5%"
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
                "code": "G5-c",
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
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C1",
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
            "entryPriceText": "1,745,000원 (당일 종가 기준)",
            "entryPrice": 1745000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -12.5% 조정 후 안정화 패턴 여부를 점검했습니다.",
            "notes": [
              "토스 체결강도·호가잔량 미반영",
              "기업 이벤트 필터는 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.avgStrength",
                  "label": "당일 평균 체결강도 (%)",
                  "sourceName": "토스증권 주문 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK하이닉스 (000660) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A000660/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK하이닉스 (000660) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK하이닉스 (000660) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08"
                  ]
                },
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 SK하이닉스 (000660) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.avgStrength",
                "toss.lastHourAvgStrength",
                "orderbook.bidAskRatio",
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
              "note": "직전 30분봉 종가 1745000, 전봉 종가 1747000",
              "latestOpen": 1745000.0,
              "latestClose": 1745000.0,
              "previousClose": 1747000.0
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,797,350원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,823,525원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "1,884,600원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "1,675,200원"
              }
            ],
            "rr": "1 : 0.8",
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
  ]
};
