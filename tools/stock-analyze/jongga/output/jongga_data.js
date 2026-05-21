window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-05-21T05:56:59+00:00",
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
    "failedKeys": [
      "playwright unavailable: No module named 'playwright'"
    ],
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
        "ok": 1
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 30
      },
      "toss_playwright_strength": {
        "ok": 0
      },
      "naver_orderbook_browser": {
        "ok": 0
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
        "durationMs": 433.5,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1473.3,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "G-D 🟠"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 91.0,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 0.4
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 186.9,
        "count": 30
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 2004.1,
        "detail": "성공 30 / 실패 0",
        "count": 30
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 2.5,
        "detail": "pullback 3, momentum 3, reversal 3",
        "count": 9
      },
      {
        "step": "browser_enrichment",
        "label": "브라우저 보강 수집",
        "status": "partial",
        "durationMs": 0.2,
        "detail": "토스 0 / 호가 0 / KIND 0",
        "count": 6
      }
    ],
    "note": "CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 토스 공개 체결강도는 Playwright로, 호가 잔량 비율은 Naver 호가 10단계를 브라우저로 읽어 보강하며, Naver 일정이 없을 때는 KIND 최근공시를 Playwright로 조회해 이벤트 필터를 확장합니다."
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
            "value": "7814.56 (+8.40%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 71.23"
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
            "value": "G-D 🟠 (-4.0점)"
          },
          {
            "item": "갭 조정",
            "value": "⚠️ S등급 50% 진입만 허용 / ❌ 진입 보류"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6197.87",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7191.00",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 71.23",
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
            "actualValue": "+0.95%",
            "baseScore": "+1점",
            "weight": "×2.5",
            "formula": "+1 × 2.5 = +2.5점",
            "weightedScore": "+2.5점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+17.44",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
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
            "actualValue": "+12.44원",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-1.70%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "-4.0점",
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
            "score": 6.0,
            "grade": "B",
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
                "note": "주봉 RSI 87.5"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7460.88, VKOSPI 71.23"
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
            "entryPriceText": "299,000원 (당일 종가 기준)",
            "entryPrice": 299000,
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
                "targetPrice": "300,495원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+1.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "303,485원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "307,970원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "316,940원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "325,910원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "291,525원"
              }
            ],
            "rr": "1 : 0.2",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "성문전자",
            "code": "014910",
            "score": 6.0,
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
                "note": "주봉 RSI 77.6"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7460.88, VKOSPI 71.23"
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
            "entryPriceText": "3,350원 (당일 종가 기준)",
            "entryPrice": 3350,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 4,812주 / 기관 625주.",
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
                "targetPrice": "3,367원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+1.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "3,400원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "3,450원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "3,551원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "3,652원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "3,266원"
              }
            ],
            "rr": "1 : 0.2",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "대우건설",
            "code": "047040",
            "score": 6.0,
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
                "note": "주봉 RSI 72.4"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7460.88, VKOSPI 71.23"
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
            "entryPriceText": "28,650원 (당일 종가 기준)",
            "entryPrice": 28650,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 1,598,220주 / 기관 -231,019주.",
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
                "targetPrice": "28,793원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+1.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "29,080원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "29,510원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+6.0%",
                "targetPrice": "30,369원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+9.0%",
                "targetPrice": "31,229원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-2.5% 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "27,934원"
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
            "score": 4.8,
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
                "note": "52주 고가 대비 98.7%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 순위 14"
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
            "entryPriceText": "16,220원 (당일 종가 기준)",
            "entryPrice": 16220,
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
                "targetPrice": "16,382원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "16,707원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "17,031원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "17,518원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "18,004원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "15,733원"
              }
            ],
            "rr": "1 : 0.3",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "LG씨엔에스",
            "code": "064400",
            "score": 3.6,
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
                "note": "52주 고가 대비 79.4%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 순위 23"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
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
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "P1",
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
            "entryPriceText": "80,000원 (당일 종가 기준)",
            "entryPrice": 80000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 124,428주 / 기관 2,174주.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A064400/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 LG씨엔에스 (064400) 주문 화면을 엽니다.",
                    "체결강도 영역에서 당일 평균 값을 확인합니다.",
                    "예: 112.5 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.intradayAbove100Ratio",
                  "label": "100% 이상 유지 비율 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A064400/chart",
                  "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                  "instructions": [
                    "토스증권에서 LG씨엔에스 (064400) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A064400/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 LG씨엔에스 (064400) 호가창을 엽니다.",
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
                "targetPrice": "80,800원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "82,400원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "84,000원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "86,400원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "88,800원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "77,600원"
              }
            ],
            "rr": "1 : 0.3",
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
                "note": "52주 고가 대비 99.7%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 순위 3"
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
            "entryPriceText": "299,000원 (당일 종가 기준)",
            "entryPrice": 299000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -5,733,354주 / 기관 2,756,787주.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성전자 (005930) 주문 화면을 엽니다.",
                    "체결강도 영역에서 당일 평균 값을 확인합니다.",
                    "예: 112.5 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.intradayAbove100Ratio",
                  "label": "100% 이상 유지 비율 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A005930/chart",
                  "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                  "instructions": [
                    "토스증권에서 삼성전자 (005930) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼성전자 (005930) 호가창을 엽니다.",
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
                "targetPrice": "301,990원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "307,970원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "313,950원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+8.0%",
                "targetPrice": "322,920원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+11.0%",
                "targetPrice": "331,890원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "290,030원"
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
                "note": "거래대금 순위 1"
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
                "note": "1개월 수익률 63.7%"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -5.6%"
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
            "entryPriceText": "491원 (당일 종가 기준)",
            "entryPrice": 491,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -5.6% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
              "note": "직전 30분봉 종가 487, 전봉 종가 492",
              "latestOpen": 487.0,
              "latestClose": 487.0,
              "previousClose": 492.0
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "506원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "513원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "530원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "471원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "대원전선",
            "code": "006340",
            "score": 5.4,
            "grade": "C",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 순위 5"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 1.2조"
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
                "note": "1개월 수익률 135.6%"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -24.8%"
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
            "entryPriceText": "15,270원 (당일 종가 기준)",
            "entryPrice": 15270,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -24.8% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A006340/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 대원전선 (006340) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A006340/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 대원전선 (006340) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A006340/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 대원전선 (006340) 호가창을 엽니다.",
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
                    "KIND 공시에서 대원전선 (006340) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 15330, 전봉 종가 15330",
              "latestOpen": 15330.0,
              "latestClose": 15330.0,
              "previousClose": 15330.0
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "15,728원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "15,957원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "16,492원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "14,659원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "LG전자",
            "code": "066570",
            "score": 5.4,
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
                "note": "시총 38.3조"
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
                "note": "1개월 수익률 88.8%"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.8%"
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
            "entryPriceText": "235,000원 (당일 종가 기준)",
            "entryPrice": 235000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -11.8% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A066570/order",
                  "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 LG전자 (066570) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A066570/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 LG전자 (066570) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A066570/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 LG전자 (066570) 호가창을 엽니다.",
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
                    "KIND 공시에서 LG전자 (066570) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 235000, 전봉 종가 235000",
              "latestOpen": 235000.0,
              "latestClose": 235000.0,
              "previousClose": 235000.0
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "242,050원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "245,575원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "253,800원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "225,600원"
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
