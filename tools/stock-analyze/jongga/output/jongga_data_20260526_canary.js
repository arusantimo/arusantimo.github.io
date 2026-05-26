window.JONGGA_CANARY_DAILY_DATA = window.JONGGA_CANARY_DAILY_DATA || {};
window.JONGGA_CANARY_DAILY_DATA["2026-05-26"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-05-26T14:20:40+00:00",
  "variant": "canary",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 20,
      "failed": 0,
      "stale": 0,
      "manual": 1,
      "fallback": 0,
      "slots": 1
    },
    "failedKeys": [],
    "staleKeys": [],
    "manualKeys": [
      "toss_metrics"
    ],
    "fallbackKeys": [],
    "providerHealth": {
      "naver_mobile": {
        "ok": 20
      },
      "naver_chart": {
        "ok": 20
      },
      "naver_integration_schedule": {
        "ok": 4
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 20
      },
      "toss_http_strength": {
        "ok": 20
      },
      "toss_ticks_strength_proxy": {
        "ok": 20
      },
      "toss_quotes_orderbook": {
        "ok": 19
      },
      "kind_playwright_disclosure": {
        "ok": 3
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
        "durationMs": 1459.2,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1327.6,
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
        "durationMs": 70.7,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 3.1,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 3446.3,
        "count": 20
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 1462.4,
        "detail": "성공 20 / 실패 0",
        "count": 20
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 495.1,
        "detail": "direct-http · 체결강도 20 / 호가 19 / 틱프록시 20",
        "count": 20
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 2.1,
        "detail": "pullback 3, momentum 3, reversal 3",
        "count": 9
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 10742.2,
        "detail": "chrome:chrome.exe · KIND 3",
        "count": 3
      }
    ],
    "note": "카나리 채널입니다. CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 카나리는 토스 공개 API로 체결강도·틱 프록시·호가를 병렬 수집하고, KIND 공시는 Chrome 실행 파일을 우선 시도해 표시 종목만 브라우저 보강합니다.",
    "channel": "canary",
    "channelLabel": "카나리",
    "browserSource": "chrome:chrome.exe",
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
            "value": "8047.51 (+2.55%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 68.09"
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
            "value": "G-A 🟢 (+10.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 100% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6261.92",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7341.12",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 68.09",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 14 / 하락 5",
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
          "marketAnalyzeDate": "20260526",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 46.6,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1512원과 과열 이격이 겹쳤지만 펀더멘털 앵커 89점과 non-critical bubble(BI 47 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다."
        },
        "technicalRegimeLabel": "박스권 ⚠️",
        "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
        "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "+2.06%",
            "baseScore": "+2점",
            "weight": "×2.5",
            "formula": "+2 × 2.5 = +5.0점",
            "weightedScore": "+5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.80",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-7.9bp",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-4.87원",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+13.21%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+10.5점",
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
            "name": "현대차",
            "code": "005380",
            "score": 7.2,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 10"
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
                "note": "주봉 RSI 79.9"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7638.28, VKOSPI 68.09"
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
              },
              {
                "code": "C2",
                "note": "공개 데이터 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C3",
                "note": "동종업종 평균 -2.35% / KOSPI +2.55% underperform"
              }
            ],
            "currentPrice": 689000,
            "previousClose": 655000,
            "dailyChange": 34000,
            "dailyChangePct": 5.19,
            "dailyDirection": "up",
            "entryPriceText": "689,000원 (당일 종가 기준)",
            "entryPrice": 689000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 167,193주 / 기관 80,739주.",
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
                "targetPrice": "709,670원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "720,005원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "751,010원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "771,680원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "792,350원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "668,330원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "SK하이닉스",
            "code": "000660",
            "score": 6.8,
            "grade": "B",
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
                "note": "주봉 RSI 84.3"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7638.28, VKOSPI 68.09"
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
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +5.14% / KOSPI +2.55% outperform"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "미충족 또는 공개 데이터 부족"
              }
            ],
            "currentPrice": 2052000,
            "previousClose": 1941000,
            "dailyChange": 111000,
            "dailyChangePct": 5.72,
            "dailyDirection": "up",
            "entryPriceText": "2,052,000원 (당일 종가 기준)",
            "entryPrice": 2052000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -108,495주 / 기관 386,967주.",
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
                "targetPrice": "2,113,560원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "2,144,340원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+9.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "2,236,680원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+12.0%",
                "targetPrice": "2,298,240원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+15.0%",
                "targetPrice": "2,359,800원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,990,440원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "삼성전자",
            "code": "005930",
            "score": 6.8,
            "grade": "B",
            "statusLabel": "매매금지(핵심 Gate 미충족)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "거래대금 TOP40 순위 2"
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
                "note": "주봉 RSI 84.3"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "MACD 히스토그램"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI>7638.28, VKOSPI 68.09"
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
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +5.72% / KOSPI +2.55% outperform"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "미충족 또는 공개 데이터 부족"
              }
            ],
            "currentPrice": 299000,
            "previousClose": 292500,
            "dailyChange": 6500,
            "dailyChangePct": 2.22,
            "dailyDirection": "up",
            "entryPriceText": "299,000원 (당일 종가 기준)",
            "entryPrice": 299000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 1,891,734주 / 기관 1,513,469주.",
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
          }
        ],
        "momentum": [
          {
            "rank": 1,
            "name": "HD현대중공업",
            "code": "329180",
            "score": 6.4,
            "grade": "B",
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
                "status": "✅",
                "note": "52주 고가 대비 97.6%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 26"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "공개 데이터 충족"
              },
              {
                "code": "S2",
                "note": "당일 평균 체결강도 179.0% / 100% 유지 비율 100.0% 충족"
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
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 비율 0.56 미달"
              }
            ],
            "currentPrice": 745000,
            "previousClose": 680000,
            "dailyChange": 65000,
            "dailyChangePct": 9.56,
            "dailyDirection": "up",
            "entryPriceText": "745,000원 (당일 종가 기준)",
            "entryPrice": 745000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 7,017주 / 기관 108,521주.",
            "notes": [],
            "toss": {
              "avgStrength": 179.0,
              "note": "토스 공개 체결강도 179.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A329180/order",
              "asOf": "2026-05-26T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 267.1,
              "lastHourObservedMinutes": 40
            },
            "orderbook": {
              "bidAskRatio": 0.5571,
              "bidTotal": 14898,
              "askTotal": 26743,
              "note": "토스 호가잔량합계 매수 14,898 / 매도 26,743",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A329180/quotes?viewType=krx_all&investMode=krx"
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
                "targetPrice": "774,800원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "797,150원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "856,750원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "879,100원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "901,450원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "715,200원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
            "name": "한화오션",
            "code": "042660",
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
                "status": "⛔",
                "note": "5일·20일 초과수익률"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "52주 고가 대비 87.0%"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "거래대금 TOP40 순위 20"
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
                "note": "당일 평균 체결강도 134.0% / 100% 유지 비율 25.0% 미달"
              },
              {
                "code": "C2",
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 비율 0.27 미달"
              }
            ],
            "currentPrice": 134700,
            "previousClose": 122200,
            "dailyChange": 12500,
            "dailyChangePct": 10.23,
            "dailyDirection": "up",
            "entryPriceText": "134,700원 (당일 종가 기준)",
            "entryPrice": 134700,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 1,032,696주 / 기관 229,664주.",
            "notes": [],
            "toss": {
              "avgStrength": 134.0,
              "note": "토스 공개 체결강도 134.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042660/order",
              "asOf": "2026-05-26T10:59:59Z",
              "intradayAbove100Ratio": 25.0,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 27.9,
              "lastHourObservedMinutes": 41
            },
            "orderbook": {
              "bidAskRatio": 0.2728,
              "bidTotal": 20026,
              "askTotal": 73406,
              "note": "토스 호가잔량합계 매수 20,026 / 매도 73,406",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A042660/quotes?viewType=krx_all&investMode=krx"
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
                "targetPrice": "140,088원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "144,129원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "154,905원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "158,946원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "162,987원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "129,312원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "SK하이닉스",
            "code": "000660",
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
                "note": "거래대금 TOP40 순위 1"
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
                "code": "C3",
                "note": "매수/매도 호가잔량 비율 39.27 충족"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "토스 또는 추가 데이터 필요"
              },
              {
                "code": "S2",
                "note": "당일 평균 체결강도 134.0% / 100% 유지 비율 9.1% 미달"
              },
              {
                "code": "C2",
                "note": "토스 또는 추가 데이터 필요"
              }
            ],
            "currentPrice": 2052000,
            "previousClose": 1941000,
            "dailyChange": 111000,
            "dailyChangePct": 5.72,
            "dailyDirection": "up",
            "entryPriceText": "2,052,000원 (당일 종가 기준)",
            "entryPrice": 2052000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 -108,495주 / 기관 386,967주.",
            "notes": [],
            "toss": {
              "avgStrength": 134.0,
              "note": "토스 공개 체결강도 134.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-05-26T10:59:59Z",
              "intradayAbove100Ratio": 9.1,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 12.1,
              "lastHourObservedMinutes": 41
            },
            "orderbook": {
              "bidAskRatio": 39.2655,
              "bidTotal": 132050,
              "askTotal": 3363,
              "note": "토스 호가잔량합계 매수 132,050 / 매도 3,363",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A000660/quotes?viewType=krx_all&investMode=krx"
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
                "targetPrice": "2,134,080원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+7.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "2,195,640원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+15.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "2,359,800원"
              },
              {
                "stage": "📈 장중 2차",
                "condition": "추세 유지 시",
                "quantity": "잔량 보유",
                "targetYield": "+18.0%",
                "targetPrice": "2,421,360원"
              },
              {
                "stage": "📊 스윙 전환",
                "condition": "V 조건 충족 시",
                "quantity": "잔량 보유",
                "targetYield": "+21.0%",
                "targetPrice": "2,482,920원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-4.0% 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "1,969,920원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "HD현대중공업",
            "code": "329180",
            "score": 7.2,
            "grade": "A",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 26"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 78.2조"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-05-20 영업(잠정)실적(공정공시)"
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
                "note": "1개월 수익률 16.2%"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -2.4%"
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
                "code": "S2",
                "note": "당일 평균 체결강도 179.0% / 마지막 1시간 평균 267.1% 충족"
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
                "note": "매수/매도 호가잔량 비율 0.56 미달"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 745000, 전봉 종가 746000 미달"
              }
            ],
            "currentPrice": 745000,
            "previousClose": 680000,
            "dailyChange": 65000,
            "dailyChangePct": 9.56,
            "dailyDirection": "up",
            "entryPriceText": "745,000원 (당일 종가 기준)",
            "entryPrice": 745000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -2.4% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
              "note": "KIND 최근공시 2026-05-20 영업(잠정)실적(공정공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 745000, 전봉 종가 746000",
              "latestOpen": 745000.0,
              "latestClose": 745000.0,
              "previousClose": 746000.0
            },
            "toss": {
              "avgStrength": 179.0,
              "note": "토스 공개 체결강도 179.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A329180/order",
              "asOf": "2026-05-26T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 267.1,
              "lastHourObservedMinutes": 40
            },
            "orderbook": {
              "bidAskRatio": 0.5571,
              "bidTotal": 14898,
              "askTotal": 26743,
              "note": "토스 호가잔량합계 매수 14,898 / 매도 26,743",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A329180/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "767,350원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "778,525원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "804,600원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "722,650원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 2,
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
                "note": "거래대금 TOP40 순위 10"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 141.1조"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-05-20 기업설명회(IR) 개최(안내공시)"
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
                "note": "1개월 수익률 27.4%"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.0%"
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
                "code": "S2",
                "note": "당일 평균 체결강도 128.0% / 마지막 1시간 평균 215.1% 충족"
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
                "note": "토스·이벤트 데이터 필요"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 비율 0.41 미달"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 689000, 전봉 종가 687000 미달"
              }
            ],
            "currentPrice": 689000,
            "previousClose": 655000,
            "dailyChange": 34000,
            "dailyChangePct": 5.19,
            "dailyDirection": "up",
            "entryPriceText": "689,000원 (당일 종가 기준)",
            "entryPrice": 689000,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 -11.0% 조정 후 안정화 패턴 여부를 점검했습니다.",
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
              "note": "직전 30분봉 종가 689000, 전봉 종가 687000",
              "latestOpen": 689000.0,
              "latestClose": 689000.0,
              "previousClose": 687000.0
            },
            "toss": {
              "avgStrength": 128.0,
              "note": "토스 공개 체결강도 128.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005380/order",
              "asOf": "2026-05-26T10:59:59Z",
              "intradayAbove100Ratio": 69.2,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 215.1,
              "lastHourObservedMinutes": 41
            },
            "orderbook": {
              "bidAskRatio": 0.4053,
              "bidTotal": 35870,
              "askTotal": 88501,
              "note": "토스 호가잔량합계 매수 35,870 / 매도 88,501",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A005380/quotes?viewType=krx_all&investMode=krx"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "709,670원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "720,005원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "744,120원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "668,330원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live"
          },
          {
            "rank": 3,
            "name": "SK네트웍스",
            "code": "001740",
            "score": 5.4,
            "grade": "C",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "거래대금 TOP40 순위 18"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 2.2조"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-05-13 연결재무제표기준영업(잠정)실적(공정공시)"
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
                "note": "1개월 수익률 101.8%"
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
                "note": "당일 평균 체결강도 90.7% / 마지막 1시간 평균 데이터 부족"
              },
              {
                "code": "C2",
                "note": "호가잔량 데이터 부족"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 10920, 전봉 종가 10840 미달"
              }
            ],
            "currentPrice": 10920,
            "previousClose": 8400,
            "dailyChange": 2520,
            "dailyChangePct": 30.0,
            "dailyDirection": "up",
            "entryPriceText": "10,920원 (당일 종가 기준)",
            "entryPrice": 10920,
            "entryMeta": "당일 종가 기준",
            "keyPoint": "20일 고점 대비 0.0% 조정 후 안정화 패턴 여부를 점검했습니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영",
              "호가잔량 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001740/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK네트웍스 (001740) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "orderbook.bidAskRatio",
                  "label": "매수/매도 호가잔량 비율",
                  "sourceName": "토스증권 호가창",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001740/order",
                  "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK네트웍스 (001740) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08"
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength",
                "orderbook.bidAskRatio"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-05-13 연결재무제표기준영업(잠정)실적(공정공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 10920, 전봉 종가 10840",
              "latestOpen": 10920.0,
              "latestClose": 10920.0,
              "previousClose": 10840.0
            },
            "toss": {
              "avgStrength": 90.7,
              "note": "토스 공개 체결강도 90.7% / 최근 체결 141분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001740/order",
              "asOf": "2026-05-26T09:00:22Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 141,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 141분 프록시"
            },
            "orderbook": {},
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "condition": "+3.0% 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "11,248원"
              },
              {
                "stage": "🔔 장초반",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "11,411원"
              },
              {
                "stage": "📈 장중 1차",
                "condition": "+8.0% 도달",
                "quantity": "잔량 전량",
                "targetYield": "+8.0%",
                "targetPrice": "11,794원"
              },
              {
                "stage": "🛑 손절",
                "condition": "-3.0% 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "10,592원"
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
  "analysisDate": "2026-05-26"
};
