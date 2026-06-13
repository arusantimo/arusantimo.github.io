window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-05-22"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-08T13:00:31+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 65,
      "failed": 0,
      "stale": 0,
      "manual": 4,
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
        "ok": 65
      },
      "naver_chart": {
        "ok": 65
      },
      "naver_integration_schedule": {
        "ok": 0
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 65
      },
      "toss_http_strength": {
        "ok": 65
      },
      "toss_ticks_strength_proxy": {
        "ok": 65
      },
      "toss_quotes_orderbook": {
        "ok": 64
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
        "durationMs": 3859.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1239.8,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "G-E 🔴"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 80.7,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 144.7,
        "detail": "박스권 ⚠️"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 4867.4,
        "count": 65
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 4356.4,
        "detail": "성공 65 / 실패 0",
        "count": 65
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 2591.2,
        "detail": "direct-http · 체결강도 65 / 호가 64 / 틱프록시 65",
        "count": 65
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 204.2,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 15874.0,
        "detail": "playwright-chromium · KIND 0",
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
            "value": "박스권 ⚠️"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "7484.41 (-8.29%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 76.63"
          },
          {
            "item": "진입 전략",
            "value": "메인=수급매집형 / 서브=눌림목 / 보조=주도주돌파형"
          },
          {
            "item": "추천 슬롯",
            "value": "매집 3 · 돌파 1 · 눌림 3"
          },
          {
            "item": "스윙 전환 활성도",
            "value": "조건부"
          },
          {
            "item": "시가베팅",
            "value": "비활성"
          },
          {
            "item": "역추세 트랙",
            "value": "활성"
          },
          {
            "item": "갭 스코어",
            "value": "G-E 🔴 (-11.5점)"
          },
          {
            "item": "갭 조정",
            "value": "⚠️ 눌림목·매집 A/S만 50% 허용 · 돌파 금지 / ⚠️ A/S만 50% 허용"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6618.16",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7937.69",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 76.63",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 12 / 하락 8",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "KOSPI 60MA 상향",
            "verdict": "박스권 ⚠️"
          },
          {
            "item": "거시 맥락",
            "value": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat) / RI 66",
            "verdict": "⚠️"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": false,
          "marketAnalyzeDate": "20260608",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "박스권 ⚠️",
          "regimeAdjustmentReason": "KOSPI 60MA 상향",
          "riseJustified": false,
          "kospiBullTier": "maintain",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.18,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "Bull Trap 10/20으로 하락 1단계(안도·자만)로 오버라이드했습니다.",
          "kospiClose": 7484.41,
          "kospiMa5": 8374.856,
          "vkospiValue": 76.63,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": false
        },
        "technicalRegimeLabel": "박스권 ⚠️",
        "effectiveRegimeLabel": "박스권 ⚠️",
        "regimeAdjustmentReason": "KOSPI 60MA 상향"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-3.73%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+18.78",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+7.3bp",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+15.25원",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-4.74%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "-11.5점",
        "grade": "G-E 🔴",
        "code": "G-E",
        "entryAdjustment": "⚠️ 눌림목·매집 A/S만 50% 허용 · 돌파 금지 / ⚠️ A/S만 50% 허용",
        "sellAdjustment": "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소",
        "swingAdjustment": "금지",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-06-09T03:59:00+00:00",
          "vix": "2026-06-08T20:15:00+00:00",
          "tnx": "2026-06-08T19:00:00+00:00",
          "krw": "2026-06-08T22:59:00+00:00",
          "sox": "2026-06-09T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "현대차",
            "code": "005380",
            "strictScore": 9.8,
            "signalScore": 9.8,
            "score": 9.8,
            "scoreMax": 13.5,
            "effectiveScoreMax": 13.5,
            "gradeScore": 7.3,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 14위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 83,179주 / 기관 -67,415주 · 당일 순매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 평균 79.0% / 마지막 1시간 210.7% / 마지막 30분 비율 0.63:1 / 마지막 30분 평균 221.3% · 장후반 흡수 확인"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 642,000 · 이평선 터치: 5MA, 10MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 655,000 · 5MA·10MA·20MA 중 5MA, 20MA 위"
              },
              {
                "code": "P3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "앵커 중심값 676,000 / 저가 642,000 / 종가 655,000 · 종가 미회복"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 1.18 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 38% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +5.96% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 앵커 거래량 25% · 거래량 급감"
              },
              {
                "code": "C5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G5, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 221% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 636,000 > 20MA 603,950 > 60MA 545,642 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 655,000 / 60MA 545,642",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 64.1 (필요 ≥ 50)",
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
                "note": "KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -1.65% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 64.1 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +8.5% (필요 ≤ +25%) · 60MA +20.0% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "⚠️",
                "note": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "evalStatus": "not_met"
              },
              {
                "code": "G10",
                "status": "✅",
                "note": "당일 거래량 / 앵커 거래량 25% · 시가 666,000 / 종가 655,000 / 전일 종가 666,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "종가 655,000 / 앵커 중심값 676,000 / 복합 지지 612,391 · 앵커 또는 지지 한 축 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 0.63:1 / 마지막 30분 평균 221.3% / 마지막 1시간 210.7% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "⚠️",
                "note": "최근 5거래일 종목 뉴스 없음 · KIND 이벤트 필터 미반영",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 14위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 83,179주 / 기관 -67,415주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "당일 평균 79.0% / 마지막 1시간 210.7% / 마지막 30분 비율 0.63:1 / 마지막 30분 평균 221.3% · 장후반 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 642,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 655,000 · 5MA·10MA·20MA 중 5MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 1.18 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 38% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +5.96% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 25% · 거래량 급감",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P3",
                "note": "앵커 중심값 676,000 / 저가 642,000 / 종가 655,000 · 종가 미회복",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 655000,
            "previousClose": 666000,
            "dailyChange": -11000,
            "dailyChangePct": -1.65,
            "dailyDirection": "down",
            "entryPriceText": "655,000원 (당일 종가 기준)",
            "entryPrice": 655000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 124.288,
            "marketCapRank": 5,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 83,179주 / 기관 -67,415주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 79.0,
              "note": "토스 공개 체결강도 79.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005380/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 70.0,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 210.7,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 221.3,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.6269,
              "last30BuyVolume": 1596.0,
              "last30SellVolume": 2546.0
            },
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 612,391원 (6.51% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 612391,
                    "distancePct": 6.51,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 9,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 559849,
                    "distancePct": 14.53,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 7,
                    "lastSeenDaysAgo": 11,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 533486,
                    "distancePct": 18.55,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 24,
                    "lastSeenDaysAgo": 13,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 500750,
                    "distancePct": 23.55,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 10,
                    "lastSeenDaysAgo": 18,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 488188,
                    "distancePct": 25.47,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 12,
                    "lastSeenDaysAgo": 26,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 612391,
                  "distancePct": 6.51,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 9,
                  "lastSeenDaysAgo": 1,
                  "strengthPoints": 65,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 65,
                "strengthLabel": "watch",
                "warningLevel": "warning",
                "warningReason": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 465773,
                    "distancePct": 28.89,
                    "count": 7,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 457000,
                    "bandHigh": 471000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 475333,
                    "distancePct": 27.43,
                    "count": 2,
                    "lastSeenDaysAgo": 27,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 473000,
                    "bandHigh": 478500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 488875,
                    "distancePct": 25.36,
                    "count": 10,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 484000,
                    "bandHigh": 495000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 503250,
                    "distancePct": 23.17,
                    "count": 8,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 497500,
                    "bandHigh": 510000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 520950,
                    "distancePct": 20.47,
                    "count": 13,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 513000,
                    "bandHigh": 527000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 532733,
                    "distancePct": 18.67,
                    "count": 12,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 530000,
                    "bandHigh": 540000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 546250,
                    "distancePct": 16.6,
                    "count": 7,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 541000,
                    "bandHigh": 553000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 558000,
                    "distancePct": 14.81,
                    "count": 4,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 555000,
                    "bandHigh": 563000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 571333,
                    "distancePct": 12.77,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 570000,
                    "bandHigh": 572000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 593400,
                    "distancePct": 9.4,
                    "count": 4,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 590000,
                    "bandHigh": 596000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 608167,
                    "distancePct": 7.15,
                    "count": 6,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 604000,
                    "bandHigh": 613000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 642800,
                    "distancePct": 1.86,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 638000,
                    "bandHigh": 646000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 661333,
                    "distancePct": -0.97,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 655000,
                    "bandHigh": 666000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 676000,
                    "distancePct": -3.21,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 674000,
                    "bandHigh": 678000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 696000,
                    "distancePct": -6.26,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 692000,
                    "bandHigh": 700000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 711000,
                    "distancePct": -8.55,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 710000,
                    "bandHigh": 712000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 487500,
                    "distancePct": 25.57,
                    "count": 2,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 484000,
                    "bandHigh": 491000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 498250,
                    "distancePct": 23.93,
                    "count": 2,
                    "lastSeenDaysAgo": 47,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 497500,
                    "bandHigh": 499000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 534240,
                    "distancePct": 18.44,
                    "count": 12,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 25,
                    "volume": 16745018,
                    "binIndex": 6,
                    "binLow": 527375,
                    "binHigh": 541104
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 616615,
                    "distancePct": 5.86,
                    "count": 3,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "volume": 11462957,
                    "binIndex": 12,
                    "binLow": 609750,
                    "binHigh": 623479
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 561698,
                    "distancePct": 14.24,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 25,
                    "volume": 7784944,
                    "binIndex": 8,
                    "binLow": 554833,
                    "binHigh": 568562
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 525000,
                    "distancePct": 19.85,
                    "count": 1,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 273.6,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 581000,
                    "distancePct": 11.3,
                    "count": 1,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 441.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 221% (10일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 221.4,
                "latestBurstDaysAgo": 8
              },
              "anchor": {
                "date": "20260513",
                "open": 642000,
                "close": 710000,
                "high": 710000,
                "low": 642000,
                "bodyMid": 676000,
                "volume": 4051665.0,
                "volumeRatio": 2.53,
                "daysAgo": 7
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 25% · 시가 666,000 / 종가 655,000 / 전일 종가 666,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "종가 655,000 / 앵커 중심값 676,000 / 복합 지지 612,391 · 앵커 또는 지지 한 축 이탈"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.63:1 / 마지막 30분 평균 221.3% / 마지막 1시간 210.7% · 장 막판 투매 경고"
                }
              },
              "newsFlow": {
                "lookbackDays": 5,
                "headlineCount": 0,
                "positiveCount": 0,
                "negativeCount": 0,
                "latestPositiveDate": "",
                "latestNegativeDate": "",
                "status": "neutral",
                "summary": "최근 5거래일 종목 뉴스 없음",
                "headlines": [],
                "freshPositiveCount": 0,
                "freshNegativeCount": 0
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 9.26%, 일간 표준편차 5.13%, 당일 레인지 3.75%.",
              "metrics": {
                "atrPct10": 9.26,
                "returnStd20": 5.13,
                "todayRangePct": 3.75,
                "vkospi": 89.91
              },
              "strategyLabel": "눌림목"
            },
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
                    "KIND 공시에서 현대차 (005380) 종목 공시를 조회합니다.",
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260513",
              "anchorOpen": 642000,
              "anchorClose": 710000,
              "anchorHigh": 710000,
              "anchorLow": 642000,
              "anchorBodyMid": 676000,
              "anchorVolumeRatio": 2.53,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 676000,
              "ma10Price": 659400,
              "ma10PrevPrice": 655200,
              "ma20Price": 603950,
              "ma20PrevPrice": 598250,
              "ma10WarningPrice": null,
              "hardStopPrice": 603950,
              "fallbackStopPrice": 638625,
              "effectiveStopPrice": 638625,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 603,950원) = 603,950원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 638,625원) = 638,625원 / 제외: 앵커 몸통 중심 676,000원가 현재가 655,000원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(20일선 603,950원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 638,625원를 하한으로 유지합니다. 앵커 몸통 중심 676,000원가 현재가 655,000원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "668,100원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "674,650원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "684,475원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "694,300원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 638,625원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "638,625원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 648450,
              "high": 655000,
              "anchor": 655000,
              "label": "648,450~655,000원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "668,100원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "674,650원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "684,475원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "694,300원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 638,625원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "638,625원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "극단 신호가 아니어서 1차 저항 반영형을 추천합니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "668,100원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "674,650원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "684,475원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "694,300원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 638,625원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "638,625원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 5일선/10일선 저항이 없어 기본 목표형과 동일합니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "668,100원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "674,650원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "684,475원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "694,300원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 638,625원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "638,625원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "극단 신호가 아니어서 1차 저항 반영형을 추천합니다.",
              "sampleCount": 0,
              "ev": null
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "heuristic",
              "reason": "기본 추천(데이터 축적 중)",
              "hitRate": null,
              "ev": null,
              "sampleCount": 0
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-pullback",
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
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G5, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 · 외 1건",
            "statusReason": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / G12 미충족: 마지막 30분 비율 0.63:1 / 마지막 30분 평균 221.3% / 마지막 1시간 210.7% · 장 막판 투매 경고",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 655000.0,
                "vs52wHighPct": 83.2274459974587,
                "vs52wLowPct": 370.20818377602296,
                "dropFrom52wHighPct": 16.772554002541295,
                "ma20GapPct": 8.452686480668929,
                "rsi14": 59.074854355489386,
                "volumeRatio20d": 44.011269234235876,
                "rs20Pct": 21.072088724584106,
                "supportDistancePct": 6.51,
                "tradingValueRank": 14.0,
                "marketCapRank": 5.0,
                "marketCapTrillion": 124.288,
                "per": 18.71,
                "pbr": 1.33,
                "cnsPer": 15.42,
                "foreignRate": 25.18,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-13T17:58:28+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 2,
            "name": "한미반도체",
            "code": "042700",
            "strictScore": 9.0,
            "signalScore": 9.0,
            "score": 9.0,
            "scoreMax": 13.5,
            "effectiveScoreMax": 13.5,
            "gradeScore": 6.7,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 7위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -4,033주 / 기관 1,567,960주 · 당일 순매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 평균 136.0% / 마지막 1시간 278.6% / 마지막 30분 비율 35.00:1 / 마지막 30분 평균 300.0% · 장후반 흡수 확인"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 315,000 · 이평선 터치: 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 320,500 · 5MA·10MA·20MA 중 5MA 위"
              },
              {
                "code": "P3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "앵커 중심값 339,250 / 저가 315,000 / 종가 320,500 · 종가 미회복"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.92 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 49% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +8.55% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 앵커 거래량 14% · 거래량 급감"
              },
              {
                "code": "C5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G4, G5)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 352% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 309,100 > 20MA 355,625 > 60MA 310,392 · 상승선 20MA, 60MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 320,500 / 60MA 310,392",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 59.5 (필요 ≥ 50)",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "MACD 히스토그램 조건 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -3.61% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 59.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -9.9% (필요 ≤ +25%) · 60MA +3.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 90점 · 현재가 아래 유효 family 3개",
                "evalStatus": "met"
              },
              {
                "code": "G10",
                "status": "✅",
                "note": "당일 거래량 / 앵커 거래량 14% · 시가 326,500 / 종가 320,500 / 전일 종가 332,500 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "종가 320,500 / 앵커 중심값 339,250 / 복합 지지 293,631 · 앵커 또는 지지 한 축 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 35.00:1 / 마지막 30분 평균 300.0% / 마지막 1시간 278.6% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "⚠️",
                "note": "최근 5거래일 종목 뉴스 없음 · KIND 이벤트 필터 미반영",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 7위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -4,033주 / 기관 1,567,960주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "당일 평균 136.0% / 마지막 1시간 278.6% / 마지막 30분 비율 35.00:1 / 마지막 30분 평균 300.0% · 장후반 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 315,000 · 이평선 터치: 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 320,500 · 5MA·10MA·20MA 중 5MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 49% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +8.55% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 14% · 거래량 급감",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P3",
                "note": "앵커 중심값 339,250 / 저가 315,000 / 종가 320,500 · 종가 미회복",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.92 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 320500,
            "previousClose": 332500,
            "dailyChange": -12000,
            "dailyChangePct": -3.61,
            "dailyDirection": "down",
            "entryPriceText": "320,500원 (당일 종가 기준)",
            "entryPrice": 320500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 34.4077,
            "marketCapRank": 24,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -4,033주 / 기관 1,567,960주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 136.0,
              "note": "토스 공개 체결강도 136.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042700/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 90.9,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 278.6,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 35.0,
              "last30BuyVolume": 35.0,
              "last30SellVolume": 0.0
            },
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 293,631원 (8.38% 아래) · 강도 90점 · family 3개 · 수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 293631,
                    "distancePct": 8.38,
                    "families": [
                      "horizontal",
                      "swingCluster",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집",
                      "매물대 지지"
                    ],
                    "familyCount": 3,
                    "count": 26,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 90,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 303088,
                    "distancePct": 5.43,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 20,
                    "lastSeenDaysAgo": 17,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 284389,
                    "distancePct": 11.27,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 17,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 258550,
                    "distancePct": 19.33,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 12,
                    "lastSeenDaysAgo": 31,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 323750,
                    "distancePct": -1.01,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 51,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 293631,
                  "distancePct": 8.38,
                  "families": [
                    "horizontal",
                    "swingCluster",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "스윙로우 군집",
                    "매물대 지지"
                  ],
                  "familyCount": 3,
                  "count": 26,
                  "lastSeenDaysAgo": 1,
                  "strengthPoints": 90,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 90,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "수평 지지·스윙로우 군집·매물대 지지 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 251278,
                    "distancePct": 21.6,
                    "count": 7,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 247500,
                    "bandHigh": 253500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 259143,
                    "distancePct": 19.14,
                    "count": 7,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 256000,
                    "bandHigh": 261500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 270833,
                    "distancePct": 15.5,
                    "count": 3,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 267500,
                    "bandHigh": 273500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 277636,
                    "distancePct": 13.37,
                    "count": 9,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 275000,
                    "bandHigh": 280500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 286028,
                    "distancePct": 10.76,
                    "count": 15,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 282000,
                    "bandHigh": 290000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 295100,
                    "distancePct": 7.93,
                    "count": 13,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 291000,
                    "bandHigh": 299000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 302800,
                    "distancePct": 5.52,
                    "count": 13,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 300000,
                    "bandHigh": 307000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 310125,
                    "distancePct": 3.24,
                    "count": 3,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 307500,
                    "bandHigh": 312500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 316900,
                    "distancePct": 1.12,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 315000,
                    "bandHigh": 320500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 323750,
                    "distancePct": -1.01,
                    "count": 2,
                    "lastSeenDaysAgo": 51,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 323500,
                    "bandHigh": 324000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 333000,
                    "distancePct": -3.9,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 332500,
                    "bandHigh": 333500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 350250,
                    "distancePct": -9.28,
                    "count": 2,
                    "lastSeenDaysAgo": 15,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 348000,
                    "bandHigh": 352500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 359000,
                    "distancePct": -12.01,
                    "count": 3,
                    "lastSeenDaysAgo": 8,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 357500,
                    "bandHigh": 361500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 368938,
                    "distancePct": -15.11,
                    "count": 7,
                    "lastSeenDaysAgo": 5,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 365000,
                    "bandHigh": 373500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 378250,
                    "distancePct": -18.02,
                    "count": 4,
                    "lastSeenDaysAgo": 8,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 377500,
                    "bandHigh": 379000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 390300,
                    "distancePct": -21.78,
                    "count": 5,
                    "lastSeenDaysAgo": 6,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 385000,
                    "bandHigh": 394500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 400250,
                    "distancePct": -24.88,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 400000,
                    "bandHigh": 400500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 282750,
                    "distancePct": 11.78,
                    "count": 2,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 282500,
                    "bandHigh": 283000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 291500,
                    "distancePct": 9.05,
                    "count": 2,
                    "lastSeenDaysAgo": 47,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 290000,
                    "bandHigh": 293000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 303375,
                    "distancePct": 5.34,
                    "count": 7,
                    "lastSeenDaysAgo": 40,
                    "valid": true,
                    "weight": 25,
                    "volume": 11961205,
                    "binIndex": 10,
                    "binLow": 298833,
                    "binHigh": 307917
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 294292,
                    "distancePct": 8.18,
                    "count": 11,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 25,
                    "volume": 10744360,
                    "binIndex": 9,
                    "binLow": 289750,
                    "binHigh": 298833
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 257958,
                    "distancePct": 19.51,
                    "count": 5,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 25,
                    "volume": 8284221,
                    "binIndex": 5,
                    "binLow": 253417,
                    "binHigh": 262500
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 352% (17일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 351.7,
                "latestBurstDaysAgo": 17
              },
              "anchor": {
                "date": "20260427",
                "open": 305000,
                "close": 373500,
                "high": 379500,
                "low": 302000,
                "bodyMid": 339250,
                "volume": 5287941.0,
                "volumeRatio": 7.91,
                "daysAgo": 17
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 14% · 시가 326,500 / 종가 320,500 / 전일 종가 332,500 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "종가 320,500 / 앵커 중심값 339,250 / 복합 지지 293,631 · 앵커 또는 지지 한 축 이탈"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 35.00:1 / 마지막 30분 평균 300.0% / 마지막 1시간 278.6% · 장 막판 매수세 유지"
                }
              },
              "newsFlow": {
                "lookbackDays": 5,
                "headlineCount": 0,
                "positiveCount": 0,
                "negativeCount": 0,
                "latestPositiveDate": "",
                "latestNegativeDate": "",
                "status": "neutral",
                "summary": "최근 5거래일 종목 뉴스 없음",
                "headlines": [],
                "freshPositiveCount": 0,
                "freshNegativeCount": 0
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 11.02%, 일간 표준편차 8.51%, 당일 레인지 4.36%.",
              "metrics": {
                "atrPct10": 11.02,
                "returnStd20": 8.51,
                "todayRangePct": 4.36,
                "vkospi": 89.91
              },
              "strategyLabel": "눌림목"
            },
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
                    "KIND 공시에서 한미반도체 (042700) 종목 공시를 조회합니다.",
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260427",
              "anchorOpen": 305000,
              "anchorClose": 373500,
              "anchorHigh": 379500,
              "anchorLow": 302000,
              "anchorBodyMid": 339250,
              "anchorVolumeRatio": 7.91,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 339250,
              "ma10Price": 350200,
              "ma10PrevPrice": 357150,
              "ma20Price": 355625,
              "ma20PrevPrice": 354275,
              "ma10WarningPrice": 350200,
              "hardStopPrice": 312488,
              "fallbackStopPrice": 312488,
              "effectiveStopPrice": 312488,
              "warningRuleSummary": "종가 320,500원 < 10일선 350,200원 and 10일선 350,200원 <= 전일 10일선 357,150원",
              "hardStopRuleSummary": "1차 hard stop = MAX(유효 구조 손절 후보 없음) = 312,488원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 312,488원) = 312,488원 / 제외: 앵커 몸통 중심 339,250원가 현재가 320,500원 이상이라 제외 / 20일선 355,625원이 현재가 320,500원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(유효 구조 손절 후보 없음) 중 더 보수적인 가격을 쓰고, 기존 % 손절 312,488원를 하한으로 유지합니다. 앵커 몸통 중심 339,250원가 현재가 320,500원 이상이라 제외 / 20일선 355,625원이 현재가 320,500원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "326,910원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "330,115원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "334,922원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "339,730원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 312,488원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "312,488원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 317295,
              "high": 320500,
              "anchor": 320500,
              "label": "317,295~320,500원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 350200,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "326,910원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "330,115원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "334,922원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "339,730원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 312,488원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "312,488원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "극단 신호가 아니어서 1차 저항 반영형을 추천합니다.",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 350200,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "326,910원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "330,115원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "334,922원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "339,730원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 312,488원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "312,488원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "가장 가까운 10일선 저항을 앞단 목표가에 반영하고 다음 목표는 기존값을 유지합니다.",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 350200,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "10일선 저항 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+9.3%",
                    "targetPrice": "350,200원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+9.3%",
                    "targetPrice": "350,200원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+9.3%",
                    "targetPrice": "350,200원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+9.3%",
                    "targetPrice": "350,200원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 312,488원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "312,488원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "극단 신호가 아니어서 1차 저항 반영형을 추천합니다.",
              "sampleCount": 0,
              "ev": null
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "heuristic",
              "reason": "기본 추천(데이터 축적 중)",
              "hitRate": null,
              "ev": null,
              "sampleCount": 0
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-pullback",
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
              "매매금지(핵심 Gate 미충족: G1, G4, G5)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 309,100 > 20MA 355,625 > 60MA 310,392 · 상승선 20MA, 60MA · 정배열 미충족 · 외 2건",
            "statusReason": "G1 미충족: 5MA 309,100 > 20MA 355,625 > 60MA 310,392 · 상승선 20MA, 60MA · 정배열 미충족 / G4 미충족: MACD 히스토그램 조건 미충족 / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 320500.0,
                "vs52wHighPct": 75.23474178403757,
                "vs52wLowPct": 379.79041916167665,
                "dropFrom52wHighPct": 24.76525821596244,
                "ma20GapPct": -9.876977152899824,
                "rsi14": 46.98764934232286,
                "volumeRatio20d": 47.96568466634957,
                "rs20Pct": 9.19931856899489,
                "supportDistancePct": 8.38,
                "tradingValueRank": 7.0,
                "marketCapRank": 24.0,
                "marketCapTrillion": 34.4077,
                "per": 193.36,
                "pbr": 53.85,
                "cnsPer": 0.0,
                "foreignRate": 6.51,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-13T17:58:28+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 3,
            "name": "테크윙",
            "code": "089030",
            "strictScore": 9.0,
            "signalScore": 9.0,
            "score": 9.0,
            "scoreMax": 13.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 7.2,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 25위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 623,028주 / 기관 -40,634주 · 당일 순매수"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "마지막 1시간 평균 체결강도 데이터 부족"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 52,200 · 이평선 터치: 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 53,700 · 5MA·10MA·20MA 중 5MA, 10MA 위"
              },
              {
                "code": "P3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "앵커 중심값 58,400 / 저가 52,200 / 종가 53,700 · 종가 미회복"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 53,100 ≤ 종가 53,700)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 62% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +10.51% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 앵커 거래량 13% · 거래량 급감"
              },
              {
                "code": "C5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G3, G4, G5)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 341% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 50,390 > 20MA 56,218 > 60MA 55,530 · 상승선 5MA, 60MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 53,700 / 60MA 55,530",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "주봉 RSI 48.6 (필요 ≥ 50)",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "MACD 히스토그램 조건 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.90% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 48.6 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -4.5% (필요 ≤ +25%) · 60MA -3.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "⚠️",
                "note": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "evalStatus": "not_met"
              },
              {
                "code": "G10",
                "status": "✅",
                "note": "당일 거래량 / 앵커 거래량 13% · 시가 53,100 / 종가 53,700 / 전일 종가 52,700 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "종가 53,700 / 앵커 중심값 58,400 / 복합 지지 51,874 · 앵커 또는 지지 한 축 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G12",
                "status": "⚠️",
                "note": "장 막판 체결강도 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G13",
                "status": "⚠️",
                "note": "최근 5거래일 종목 뉴스 없음 · KIND 이벤트 필터 미반영",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 25위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 623,028주 / 기관 -40,634주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 52,200 · 이평선 터치: 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 53,700 · 5MA·10MA·20MA 중 5MA, 10MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 53,100 ≤ 종가 53,700)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 62% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +10.51% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 13% · 거래량 급감",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "P3",
                "note": "앵커 중심값 58,400 / 저가 52,200 / 종가 53,700 · 종가 미회복",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 53700,
            "previousClose": 52700,
            "dailyChange": 1000,
            "dailyChangePct": 1.9,
            "dailyDirection": "up",
            "entryPriceText": "53,700원 (당일 종가 기준)",
            "entryPrice": 53700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.4196,
            "marketCapRank": 203,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 623,028주 / 기관 -40,634주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 평균 체결강도 데이터 부족"
            ],
            "toss": {
              "avgStrength": 116.9,
              "note": "토스 공개 체결강도 116.9% / 최근 체결 135분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A089030/order",
              "asOf": "2026-06-12T09:00:28Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 135,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 135분 프록시"
            },
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 51,874원 (3.40% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 51874,
                    "distancePct": 3.4,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 17,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 44847,
                    "distancePct": 16.49,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 8,
                    "lastSeenDaysAgo": 34,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 53227,
                    "distancePct": 0.88,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 13,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 49400,
                    "distancePct": 8.01,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 8,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 48067,
                    "distancePct": 10.49,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 51874,
                  "distancePct": 3.4,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 17,
                  "lastSeenDaysAgo": 0,
                  "strengthPoints": 65,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 65,
                "strengthLabel": "watch",
                "warningLevel": "warning",
                "warningReason": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 44869,
                    "distancePct": 16.45,
                    "count": 6,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 44100,
                    "bandHigh": 45300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 46511,
                    "distancePct": 13.39,
                    "count": 11,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 45650,
                    "bandHigh": 47100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 48067,
                    "distancePct": 10.49,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 48000,
                    "bandHigh": 48150
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 49400,
                    "distancePct": 8.01,
                    "count": 8,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 48900,
                    "bandHigh": 49700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 51550,
                    "distancePct": 4.0,
                    "count": 11,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 50400,
                    "bandHigh": 52200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 53227,
                    "distancePct": 0.88,
                    "count": 13,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 52400,
                    "bandHigh": 53900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 54896,
                    "distancePct": -2.23,
                    "count": 11,
                    "lastSeenDaysAgo": 6,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 54200,
                    "bandHigh": 55500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 57464,
                    "distancePct": -7.01,
                    "count": 11,
                    "lastSeenDaysAgo": 7,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 56300,
                    "bandHigh": 58200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 59000,
                    "distancePct": -9.87,
                    "count": 6,
                    "lastSeenDaysAgo": 10,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 58500,
                    "bandHigh": 59500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 61000,
                    "distancePct": -13.59,
                    "count": 9,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 60300,
                    "bandHigh": 61800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 62180,
                    "distancePct": -15.79,
                    "count": 5,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 62000,
                    "bandHigh": 62600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 63740,
                    "distancePct": -18.7,
                    "count": 5,
                    "lastSeenDaysAgo": 47,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 63300,
                    "bandHigh": 64200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 64950,
                    "distancePct": -20.95,
                    "count": 2,
                    "lastSeenDaysAgo": 50,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 64900,
                    "bandHigh": 65000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 66550,
                    "distancePct": -23.93,
                    "count": 2,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 66300,
                    "bandHigh": 66800
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 44825,
                    "distancePct": 16.53,
                    "count": 2,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 44800,
                    "bandHigh": 44850
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 52198,
                    "distancePct": 2.8,
                    "count": 6,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 18072823,
                    "binIndex": 6,
                    "binLow": 51575,
                    "binHigh": 52821
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 62165,
                    "distancePct": -15.76,
                    "count": 5,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
                    "weight": 25,
                    "volume": 17517903,
                    "binIndex": 14,
                    "binLow": 61542,
                    "binHigh": 62788
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 69640,
                    "distancePct": -29.68,
                    "count": 1,
                    "lastSeenDaysAgo": 53,
                    "valid": false,
                    "weight": 25,
                    "volume": 13251531,
                    "binIndex": 20,
                    "binLow": 69017,
                    "binHigh": 70262
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 341% (18일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 341.1,
                "latestBurstDaysAgo": 18
              },
              "anchor": {
                "date": "20260424",
                "open": 55000,
                "close": 61800,
                "high": 62300,
                "low": 54800,
                "bodyMid": 58400,
                "volume": 4983557.0,
                "volumeRatio": 4.18,
                "daysAgo": 18
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 13% · 시가 53,100 / 종가 53,700 / 전일 종가 52,700 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "종가 53,700 / 앵커 중심값 58,400 / 복합 지지 51,874 · 앵커 또는 지지 한 축 이탈"
                },
                "intradayClose": {
                  "status": "⚠️",
                  "summary": "장 막판 체결강도 데이터 부족"
                }
              },
              "newsFlow": {
                "lookbackDays": 5,
                "headlineCount": 0,
                "positiveCount": 0,
                "negativeCount": 0,
                "latestPositiveDate": "",
                "latestNegativeDate": "",
                "status": "neutral",
                "summary": "최근 5거래일 종목 뉴스 없음",
                "headlines": [],
                "freshPositiveCount": 0,
                "freshNegativeCount": 0
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 9.34%, 일간 표준편차 5.35%, 당일 레인지 5.88%.",
              "metrics": {
                "atrPct10": 9.34,
                "returnStd20": 5.35,
                "todayRangePct": 5.88,
                "vkospi": 89.91
              },
              "strategyLabel": "눌림목"
            },
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A089030/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 테크윙 (089030) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.5 처럼 숫자만 붙여넣습니다."
                  ]
                },
                {
                  "fieldKey": "eventFilter",
                  "label": "실적/기업행사 필터",
                  "sourceName": "KIND 공시",
                  "sourceUrl": "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain",
                  "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                  "instructions": [
                    "KIND 공시에서 테크윙 (089030) 종목 공시를 조회합니다.",
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260424",
              "anchorOpen": 55000,
              "anchorClose": 61800,
              "anchorHigh": 62300,
              "anchorLow": 54800,
              "anchorBodyMid": 58400,
              "anchorVolumeRatio": 4.18,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 58400,
              "ma10Price": 52625,
              "ma10PrevPrice": 53185,
              "ma20Price": 56218,
              "ma20PrevPrice": 56392,
              "ma10WarningPrice": null,
              "hardStopPrice": 52358,
              "fallbackStopPrice": 52358,
              "effectiveStopPrice": 52358,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(유효 구조 손절 후보 없음) = 52,358원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 52,358원) = 52,358원 / 제외: 앵커 몸통 중심 58,400원가 현재가 53,700원 이상이라 제외 / 20일선 56,218원이 현재가 53,700원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(유효 구조 손절 후보 없음) 중 더 보수적인 가격을 쓰고, 기존 % 손절 52,358원를 하한으로 유지합니다. 앵커 몸통 중심 58,400원가 현재가 53,700원 이상이라 제외 / 20일선 56,218원이 현재가 53,700원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "54,774원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "55,311원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "56,116원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "56,922원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 52,358원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "52,358원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 53163,
              "high": 53700,
              "anchor": 53700,
              "label": "53,163~53,700원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "54,774원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "55,311원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "56,116원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "56,922원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 52,358원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "52,358원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "극단 신호가 아니어서 1차 저항 반영형을 추천합니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "54,774원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "55,311원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "56,116원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "56,922원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 52,358원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "52,358원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 5일선/10일선 저항이 없어 기본 목표형과 동일합니다.",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "54,774원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "55,311원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "56,116원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "56,922원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 52,358원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "52,358원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "heuristic",
                  "reason": "기본 추천(데이터 축적 중)",
                  "hitRate": null,
                  "ev": null,
                  "sampleCount": 0
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "극단 신호가 아니어서 1차 저항 반영형을 추천합니다.",
              "sampleCount": 0,
              "ev": null
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "heuristic",
              "reason": "기본 추천(데이터 축적 중)",
              "hitRate": null,
              "ev": null,
              "sampleCount": 0
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-pullback",
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
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지(핵심 Gate 미충족: G1, G2, G3, G4, G5)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 50,390 > 20MA 56,218 > 60MA 55,530 · 상승선 5MA, 60MA · 정배열 미충족 · 외 4건",
            "statusReason": "G1 미충족: 5MA 50,390 > 20MA 56,218 > 60MA 55,530 · 상승선 5MA, 60MA · 정배열 미충족 / G2 미충족: 종가 53,700 / 60MA 55,530 / G3 미충족: 주봉 RSI 48.6 (필요 ≥ 50) / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 53700.0,
                "vs52wHighPct": 72.56756756756756,
                "vs52wLowPct": 106.14203454894434,
                "dropFrom52wHighPct": 27.432432432432428,
                "ma20GapPct": -4.4781429270245035,
                "rsi14": 48.516674304590744,
                "volumeRatio20d": 42.979599838778924,
                "rs20Pct": -6.118881118881119,
                "supportDistancePct": 3.4,
                "tradingValueRank": 25.0,
                "marketCapRank": 203.0,
                "marketCapTrillion": 2.4196,
                "per": 530.89,
                "pbr": 11.43,
                "cnsPer": 0.0,
                "foreignRate": 13.98,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-13T17:58:28+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "파두",
            "code": "440110",
            "strictScore": 5.4,
            "signalScore": 5.4,
            "score": 5.4,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 4.7,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "RS",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "3개월 상대강도 상위 25%"
              },
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 169,017주 / 기관 45,413주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 101.6% / 100% 유지 5.6% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 99.1% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 152% · 기준 충족 (≥150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 99.1% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 80% / 윗꼬리·몸통 0.11 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.31 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "V1",
                "strictPoints": -1.0,
                "signalPoints": -1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)"
              }
            ],
            "scoreScope": "breakout",
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +39.9% / 20일 초과 +96.3%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 99.1% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 77",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 152% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 80% / 윗꼬리·몸통 0.11 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +9.94% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 128,300 / 5MA 112,800 (전일 5MA 107,160) · 5MA 위·우상향",
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
                "note": "외인 169,017주 / 기관 45,413주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 99.1% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 99.1% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 2.31 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 101.6% / 100% 유지 5.6% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 152% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 80% / 윗꼬리·몸통 0.11 · 강마감 기준 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 128300,
            "previousClose": 116700,
            "dailyChange": 11600,
            "dailyChangePct": 9.94,
            "dailyDirection": "up",
            "entryPriceText": "128,300원 (당일 종가 기준)",
            "entryPrice": 128300,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 5.3403,
            "marketCapRank": 109,
            "marketCapUniverseCount": 2560,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 169,017주 / 기관 45,413주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 101.6,
              "note": "토스 공개 체결강도 101.6% / 최근 체결 162분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A440110/order",
              "asOf": "2026-06-08T09:00:30Z",
              "intradayAbove100Ratio": 5.6,
              "observedMinutes": 162,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 162분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 2.3071,
              "bidTotal": 11240,
              "askTotal": 4872,
              "note": "Naver 호가잔량합계 매수 11,240 / 매도 4,872",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=440110"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 76.63, ATR10 9.73%, 일간 표준편차 5.91%, 당일 레인지 11.14%.",
              "metrics": {
                "atrPct10": 9.73,
                "returnStd20": 5.91,
                "todayRangePct": 11.14,
                "vkospi": 76.63
              },
              "strategyLabel": "주도주돌파형"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "breakoutStopPolicy": {
              "version": "breakout-stop-v1-live",
              "referenceSource": "prior_resistance_band",
              "referenceLookbackDays": 60,
              "referenceClusterPct": 1.0,
              "referencePrice": 119900,
              "referenceBandLow": 119900,
              "referenceBandHigh": 119900,
              "entryDayOpenPrice": 117900,
              "fallbackStopPrice": 123168,
              "effectiveHardStopPrice": 123168,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 119,900원와 기존 % 손절 123,168원 중 더 높은 123,168원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 119,900원이며, 기존 % 손절 123,168원보다 느슨해지지 않게 123,168원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.9%",
                "targetPrice": "129,400원",
                "historicalHitRate": 0.5977,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "134,715원",
                "historicalHitRate": 0.4023,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "138,564원",
                "historicalHitRate": 0.3218,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "142,413원",
                "historicalHitRate": 0.2644,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "146,262원",
                "historicalHitRate": 0.1954,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 123,168원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "123,168원"
              }
            ],
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 127017,
              "high": 128300,
              "anchor": 128300,
              "label": "127,017~128,300원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 129400,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "132,149원",
                    "historicalHitRate": 0.5977,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "134,715원",
                    "historicalHitRate": 0.4023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "138,564원",
                    "historicalHitRate": 0.3218,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "142,413원",
                    "historicalHitRate": 0.2644,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "146,262원",
                    "historicalHitRate": 0.1954,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,168원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "123,168원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 87건)",
                  "hitRate": 0.1954,
                  "ev": 2.115,
                  "sampleCount": 87
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 129400,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.9%",
                    "targetPrice": "129,400원",
                    "historicalHitRate": 0.5977,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "134,715원",
                    "historicalHitRate": 0.4023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "138,564원",
                    "historicalHitRate": 0.3218,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "142,413원",
                    "historicalHitRate": 0.2644,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "146,262원",
                    "historicalHitRate": 0.1954,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,168원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "123,168원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 87건)",
                  "hitRate": 0.1954,
                  "ev": 2.115,
                  "sampleCount": 87
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 8건)",
                "nearestResistancePrice": 129400,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.9%",
                    "targetPrice": "129,400원",
                    "historicalHitRate": 0.5977,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "134,715원",
                    "historicalHitRate": 0.4023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "138,564원",
                    "historicalHitRate": 0.3218,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "142,413원",
                    "historicalHitRate": 0.2644,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "146,262원",
                    "historicalHitRate": 0.1954,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,168원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "123,168원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 87건)",
                  "hitRate": 0.1954,
                  "ev": 2.115,
                  "sampleCount": 87
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 8건)",
              "sampleCount": 8,
              "ev": -0.0229
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 87건)",
              "hitRate": 0.1954,
              "ev": 2.115,
              "sampleCount": 87
            },
            "breakoutLiveExitPolicy": {
              "version": "breakout-live-exit-v1",
              "wickClimaxLookbackBars": 20,
              "wickClimaxVolumeRatioMin": 2.5,
              "wickUpperShadowRatioMin": 0.45,
              "orderbookLookbackMinutes": 5,
              "orderbookBidAskSpikeMin": 2.0,
              "orderbookAskDropRatioMax": 0.6,
              "trailingActivationPct": 4.5,
              "trailingBufferPct": 2.0,
              "activeSessionCutoff": "10:30",
              "wickClimaxRuleSummary": "09:00~10:30에 대량 거래량 위꼬리와 고점 대비 -1% 밀림이 함께 나오면 전량 익절합니다.",
              "orderbookRuleSummary": "09:00~10:30에 호가 분산 신호가 나오면 기본 50% 익절하고, 약한 체결강도/트레일링 동시 충족 시 전량 익절로 승격합니다.",
              "trailingRuleSummary": "+4.5% 도달 후 세션 고점 대비 2.0% 이탈 시 잔량 전량 매도합니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -3.73%, 원달러 +15.25원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -3.73%, 원달러 +15.25원, SOX -4.74%, 미 10년물 +7.3bp 악화가 동시에 확인됐습니다.",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 128300.0,
                "vs52wHighPct": 99.1499227202473,
                "vs52wLowPct": 1172.8174603174602,
                "dropFrom52wHighPct": 0.8500772797527048,
                "ma20GapPct": 38.09805715515849,
                "rsi14": 81.9419284258604,
                "volumeRatio20d": 152.40745596465933,
                "rs20Pct": 96.17737003058105,
                "tradingValueRank": 77.0,
                "marketCapRank": 109.0,
                "marketCapTrillion": 5.3403,
                "per": 0.0,
                "pbr": 159.58,
                "cnsPer": 0.0,
                "foreignRate": 23.83,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-08T22:00:15+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "스피어",
            "code": "347700",
            "strictScore": 10.1,
            "signalScore": 10.1,
            "score": 10.1,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 7.8,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 238,616주 / 기관 167,401주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +238,616 / 전일 -250,167 · 기관 당일 +167,401 / 전일 +259,119 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 157.2% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 94.0% / 마지막 1시간 157.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +562,237주 · 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 100.3% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 44,110 / 20MA 42,678 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +0.35% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +9.27% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.38:1 · 평균 체결강도 180.5% (필요 ≥ 1.1:1)"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G5)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -250,167/당일 +238,616 · 기관 전일 +259,119/당일 +167,401 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 42,800 / 60MA 44,733",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 74.7% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 82",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 76% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 238,616주 / 기관 167,401주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +238,616 / 전일 -250,167 · 기관 당일 +167,401 / 전일 +259,119 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 157.2% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 94.0% / 마지막 1시간 157.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +562,237주 · 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 100.3% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 44,110 / 20MA 42,678 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +0.35% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +9.27% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.38:1 · 평균 체결강도 180.5% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 42800,
            "previousClose": 42650,
            "dailyChange": 150,
            "dailyChangePct": 0.35,
            "dailyDirection": "up",
            "entryPriceText": "42,800원 (당일 종가 기준)",
            "entryPrice": 42800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.8915,
            "marketCapRank": 241,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 238,616주 / 기관 167,401주 / 마지막 1시간 157.2% · 장후반 매수세 강화 · 마지막 30분 틱 0.38:1. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 94.0,
              "note": "토스 공개 체결강도 94.0% / 최근 체결 34분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A347700/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 34,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 34분 프록시",
              "lastHourAvgStrength": 157.2,
              "lastHourObservedMinutes": 34,
              "last30AvgStrength": 180.5,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.381,
              "last30BuyVolume": 80.0,
              "last30SellVolume": 210.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 11.78%, 일간 표준편차 6.43%, 당일 레인지 7.50%.",
              "metrics": {
                "atrPct10": 11.78,
                "returnStd20": 6.43,
                "todayRangePct": 7.5,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 562237.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260612",
                    "net": 238616.0
                  },
                  {
                    "date": "20260611",
                    "net": -250167.0
                  },
                  {
                    "date": "20260610",
                    "net": -228387.0
                  },
                  {
                    "date": "20260609",
                    "net": 82766.0
                  },
                  {
                    "date": "20260608",
                    "net": -101757.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260612",
                    "net": 167401.0
                  },
                  {
                    "date": "20260611",
                    "net": 259119.0
                  },
                  {
                    "date": "20260610",
                    "net": 157598.0
                  },
                  {
                    "date": "20260609",
                    "net": -5800.0
                  },
                  {
                    "date": "20260608",
                    "net": -16081.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260612",
                    "net": 167401.0
                  },
                  {
                    "date": "20260611",
                    "net": 259119.0
                  },
                  {
                    "date": "20260610",
                    "net": 157598.0
                  },
                  {
                    "date": "20260609",
                    "net": -5800.0
                  },
                  {
                    "date": "20260608",
                    "net": -16081.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +562,237주 · 양수 3/5일 · 증가 3회"
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
                "stage": "1차 익절",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.4%",
                "targetPrice": "42,950원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+10.9%",
                "targetPrice": "47,450원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+10.9%",
                "targetPrice": "47,450원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.9%",
                "targetPrice": "47,450원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "47,508원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 42,050원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "42,050원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260522",
              "anchorOpen": 42050,
              "anchorClose": 42800,
              "anchorVolumeRatio20d": 0.76,
              "anchorStopPrice": 42050,
              "fallbackStopPrice": 41516,
              "effectiveHardStopPrice": 42050,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 42,050원와 기존 % 손절 41,516원 중 더 높은 42,050원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 42,050원를 기준으로 잡고, 기존 % 손절 41,516원보다 느슨해지지 않게 42,050원로 고정합니다."
            },
            "rr": "1 : 4.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 42372,
              "high": 42800,
              "anchor": 42800,
              "label": "42,372~42,800원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 42950,
                "secondaryResistancePrice": 47450,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "43,656원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "44,298원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "45,154원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "46,224원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "47,508원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 42,050원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "42,050원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 42950,
                "secondaryResistancePrice": 47450,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "42,950원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "44,298원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "45,154원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "46,224원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "47,508원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 42,050원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "42,050원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 39건)",
                "nearestResistancePrice": 42950,
                "secondaryResistancePrice": 47450,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "42,950원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.9%",
                    "targetPrice": "47,450원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+10.9%",
                    "targetPrice": "47,450원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.9%",
                    "targetPrice": "47,450원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "47,508원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 42,050원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "42,050원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 39건)",
              "sampleCount": 39,
              "ev": 0.2579
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 146건)",
              "hitRate": 0.6781,
              "ev": 0.35,
              "sampleCount": 146
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-accumulation",
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
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지(핵심 Gate 미충족: G1, G5)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 42,800 / 60MA 44,733 · 외 1건",
            "statusReason": "G1 미충족: 종가 42,800 / 60MA 44,733 / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 42800.0,
                "vs52wHighPct": 74.69458987783595,
                "vs52wLowPct": 507.0921985815603,
                "dropFrom52wHighPct": 25.30541012216405,
                "ma20GapPct": 0.28703649464003284,
                "rsi14": 49.12989392285062,
                "volumeRatio20d": 75.6056110812683,
                "rs20Pct": -3.8202247191011236,
                "tradingValueRank": 82.0,
                "marketCapRank": 241.0,
                "marketCapTrillion": 1.8915,
                "per": 41.75,
                "pbr": 17.03,
                "cnsPer": 0.0,
                "foreignRate": 6.94,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-12T23:58:17+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ"
          },
          {
            "rank": 2,
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 6.3,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 2,880,306주 / 기관 3,295,009주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +2,880,306 / 전일 +549,645 · 기관 당일 +3,295,009 / 전일 -5,437,840 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 225.0% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 111.0% / 마지막 1시간 225.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "최근 5일 매집 추세 약함"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 112.2% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 284,900 / 20MA 260,750 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 53% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -2.34% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +11.25% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.05:1 · 평균 체결강도 221.1% (필요 ≥ 1.1:1)"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "시장 Gate 차단 · 신규 진입 보류",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +549,645/당일 +2,880,306 · 기관 전일 -5,437,840/당일 +3,295,009 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 292,500 / 60MA 217,492",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 77.6% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 2",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 58% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 2,880,306주 / 기관 3,295,009주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +2,880,306 / 전일 +549,645 · 기관 당일 +3,295,009 / 전일 -5,437,840 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 225.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 111.0% / 마지막 1시간 225.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 284,900 / 20MA 260,750 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 53% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -2.34% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +11.25% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S5",
                "note": "최근 5일 매집 추세 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 112.2% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.05:1 · 평균 체결강도 221.1% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 292500,
            "previousClose": 299500,
            "dailyChange": -7000,
            "dailyChangePct": -2.34,
            "dailyDirection": "down",
            "entryPriceText": "292,500원 (당일 종가 기준)",
            "entryPrice": 292500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1885.4249,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 2,880,306주 / 기관 3,295,009주 / 마지막 1시간 225.0% · 장후반 매수세 강화 · 마지막 30분 틱 0.05:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 111.0,
              "note": "토스 공개 체결강도 111.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 75.0,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 225.0,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 221.1,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0522,
              "last30BuyVolume": 560.0,
              "last30SellVolume": 10734.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 7.43%, 일간 표준편차 4.79%, 당일 레인지 2.84%.",
              "metrics": {
                "atrPct10": 7.43,
                "returnStd20": 4.79,
                "todayRangePct": 2.84,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "none",
              "cumulativeNet": 0.0,
              "positiveDays": 0,
              "improvementCount": 0,
              "series": {
                "foreign": [
                  {
                    "date": "20260612",
                    "net": 2880306.0
                  },
                  {
                    "date": "20260611",
                    "net": 549645.0
                  },
                  {
                    "date": "20260610",
                    "net": -3840270.0
                  },
                  {
                    "date": "20260609",
                    "net": -1596173.0
                  },
                  {
                    "date": "20260608",
                    "net": -1174306.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260612",
                    "net": 3295009.0
                  },
                  {
                    "date": "20260611",
                    "net": -5437840.0
                  },
                  {
                    "date": "20260610",
                    "net": -2851841.0
                  },
                  {
                    "date": "20260609",
                    "net": 1767022.0
                  },
                  {
                    "date": "20260608",
                    "net": -3937194.0
                  }
                ],
                "sponsor": []
              },
              "status": "not_met",
              "score": 0.0,
              "summary": "최근 매집 추세 약함",
              "note": "최근 5일 매집 추세 약함"
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
                "stage": "1차 익절",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.4%",
                "targetPrice": "296,500원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.4%",
                "targetPrice": "299,500원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "308,588원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "315,900원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "324,675원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 291,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.5%",
                "targetPrice": "291,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260521",
              "anchorOpen": 291000,
              "anchorClose": 299500,
              "anchorVolumeRatio20d": 1.18,
              "anchorStopPrice": 291000,
              "fallbackStopPrice": 283725,
              "effectiveHardStopPrice": 291000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 291,000원와 기존 % 손절 283,725원 중 더 높은 291,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 291,000원를 기준으로 잡고, 기존 % 손절 283,725원보다 느슨해지지 않게 291,000원로 고정합니다."
            },
            "rr": "1 : 10.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 289575,
              "high": 292500,
              "anchor": 292500,
              "label": "289,575~292,500원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 296500,
                "secondaryResistancePrice": 299500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "298,350원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "302,738원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "308,588원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "315,900원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "324,675원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 291,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "291,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 296500,
                "secondaryResistancePrice": 299500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.4%",
                    "targetPrice": "296,500원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "299,500원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "308,588원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "315,900원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "324,675원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 291,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "291,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 39건)",
                "nearestResistancePrice": 296500,
                "secondaryResistancePrice": 299500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.4%",
                    "targetPrice": "296,500원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "299,500원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "308,588원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "315,900원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "324,675원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 291,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "291,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 39건)",
              "sampleCount": 39,
              "ev": 0.2579
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 146건)",
              "hitRate": 0.6781,
              "ev": 0.35,
              "sampleCount": 146
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-accumulation",
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
              "시장 Gate 차단: G5 — 신규 진입 보류"
            ],
            "setupQuality": "market_hold",
            "statusReasonShort": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "statusReason": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 292500.0,
                "vs52wHighPct": 77.58620689655173,
                "vs52wLowPct": 414.0597539543058,
                "dropFrom52wHighPct": 22.413793103448278,
                "ma20GapPct": 12.17641418983701,
                "rsi14": 65.58037061778077,
                "volumeRatio20d": 57.98884900027941,
                "rs20Pct": 34.48275862068966,
                "tradingValueRank": 2.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 1885.4249,
                "per": 26.07,
                "pbr": 4.48,
                "cnsPer": 7.36,
                "foreignRate": 47.58,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-12T23:58:17+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 3,
            "name": "리노공업",
            "code": "058470",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 6.3,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 6,326,201주 / 기관 805,273주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +6,326,201 / 전일 +62,843 · 기관 당일 +805,273 / 전일 -69,563 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 215.5% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 92.0% / 마지막 1시간 215.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +7,353,030주 · 동반 양수 2/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 96.0% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 100,860 / 20MA 110,995 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +2.40% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +11.77% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 12.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G5)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +62,843/당일 +6,326,201 · 기관 전일 -69,563/당일 +805,273 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 106,500 / 60MA 110,953",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 80.0% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 30",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 52% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 6,326,201주 / 기관 805,273주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +6,326,201 / 전일 +62,843 · 기관 당일 +805,273 / 전일 -69,563 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 215.5% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 92.0% / 마지막 1시간 215.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +7,353,030주 · 동반 양수 2/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +2.40% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +11.77% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 12.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 96.0% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "5MA 100,860 / 20MA 110,995 · 정배열 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 106500,
            "previousClose": 104000,
            "dailyChange": 2500,
            "dailyChangePct": 2.4,
            "dailyDirection": "up",
            "entryPriceText": "106,500원 (당일 종가 기준)",
            "entryPrice": 106500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 7.9641,
            "marketCapRank": 88,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 6,326,201주 / 기관 805,273주 / 마지막 1시간 215.5% · 장후반 매수세 강화 · 마지막 30분 틱 12.00:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 92.0,
              "note": "토스 공개 체결강도 92.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A058470/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 215.5,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 12.0,
              "last30BuyVolume": 12.0,
              "last30SellVolume": 0.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 7.05%, 일간 표준편차 4.95%, 당일 레인지 5.38%.",
              "metrics": {
                "atrPct10": 7.05,
                "returnStd20": 4.95,
                "todayRangePct": 5.38,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 7353030.0,
              "positiveDays": 2,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260612",
                    "net": 6326201.0
                  },
                  {
                    "date": "20260611",
                    "net": 62843.0
                  },
                  {
                    "date": "20260610",
                    "net": 136586.0
                  },
                  {
                    "date": "20260609",
                    "net": -125160.0
                  },
                  {
                    "date": "20260608",
                    "net": 25124.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260612",
                    "net": 805273.0
                  },
                  {
                    "date": "20260611",
                    "net": -69563.0
                  },
                  {
                    "date": "20260610",
                    "net": -221136.0
                  },
                  {
                    "date": "20260609",
                    "net": 389106.0
                  },
                  {
                    "date": "20260608",
                    "net": 23756.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260612",
                    "net": 7131474.0
                  },
                  {
                    "date": "20260611",
                    "net": -6720.0
                  },
                  {
                    "date": "20260610",
                    "net": -84550.0
                  },
                  {
                    "date": "20260609",
                    "net": 263946.0
                  },
                  {
                    "date": "20260608",
                    "net": 48880.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +7,353,030주 · 동반 양수 2/5일 · 증가 3회"
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
                "stage": "1차 익절",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.2%",
                "targetPrice": "107,800원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+14.8%",
                "targetPrice": "122,300원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+14.8%",
                "targetPrice": "122,300원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+14.8%",
                "targetPrice": "122,300원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.8%",
                "targetPrice": "122,300원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 103,305원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "103,305원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260521",
              "anchorOpen": 100900,
              "anchorClose": 104000,
              "anchorVolumeRatio20d": 0.53,
              "anchorStopPrice": 100900,
              "fallbackStopPrice": 103305,
              "effectiveHardStopPrice": 103305,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 100,900원와 기존 % 손절 103,305원 중 더 높은 103,305원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 100,900원를 기준으로 잡고, 기존 % 손절 103,305원보다 느슨해지지 않게 103,305원로 고정합니다."
            },
            "rr": "1 : 4.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 105435,
              "high": 106500,
              "anchor": 106500,
              "label": "105,435~106,500원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 107800,
                "secondaryResistancePrice": 122300,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "108,630원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "110,227원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "112,358원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "115,020원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "118,215원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 103,305원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "103,305원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 107800,
                "secondaryResistancePrice": 122300,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.2%",
                    "targetPrice": "107,800원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "110,227원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "112,358원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "115,020원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "118,215원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 103,305원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "103,305원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 39건)",
                "nearestResistancePrice": 107800,
                "secondaryResistancePrice": 122300,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.2%",
                    "targetPrice": "107,800원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+14.8%",
                    "targetPrice": "122,300원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+14.8%",
                    "targetPrice": "122,300원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+14.8%",
                    "targetPrice": "122,300원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.8%",
                    "targetPrice": "122,300원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 103,305원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "103,305원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 146건)",
                  "hitRate": 0.6781,
                  "ev": 0.35,
                  "sampleCount": 146
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 39건)",
              "sampleCount": 39,
              "ev": 0.2579
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 146건)",
              "hitRate": 0.6781,
              "ev": 0.35,
              "sampleCount": 146
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-accumulation",
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
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지(핵심 Gate 미충족: G1, G5)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 106,500 / 60MA 110,953 · 외 1건",
            "statusReason": "G1 미충족: 종가 106,500 / 60MA 110,953 / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 106500.0,
                "vs52wHighPct": 80.01502629601804,
                "vs52wLowPct": 142.04545454545453,
                "dropFrom52wHighPct": 19.984973703981968,
                "ma20GapPct": -4.049731969908555,
                "rsi14": 47.57582454695946,
                "volumeRatio20d": 51.58458086183607,
                "rs20Pct": -11.397670549084857,
                "tradingValueRank": 30.0,
                "marketCapRank": 88.0,
                "marketCapTrillion": 7.9641,
                "per": 48.85,
                "pbr": 11.16,
                "cnsPer": 42.65,
                "foreignRate": 23.17,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-12T23:58:17+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 7.8,
            "signalScore": 7.8,
            "score": 7.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.8,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -60,220→46,230 / 기관 35,180→20,825 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 94.0% / 마지막 1시간 207.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 864,000 / 20MA 672,600 (128.5% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 82% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 71% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.85 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1095000, 전봉 종가 1104000 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)"
              }
            ],
            "scoreScope": "reversal",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 21위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 25.9조 (필요 ≥ 5조)",
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
                "status": "✅",
                "note": "최근 5거래일(2026-05-12~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +103.3% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -1.1% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 864,000 / 60MA 436,167",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.2% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "외인 -60,220→46,230 / 기관 35,180→20,825 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 94.0% / 마지막 1시간 207.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 864,000 / 20MA 672,600 (128.5% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 82% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.85 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 71% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1095000, 전봉 종가 1104000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 864000,
            "previousClose": 838000,
            "dailyChange": 26000,
            "dailyChangePct": 3.1,
            "dailyDirection": "up",
            "entryPriceText": "864,000원 (당일 종가 기준)",
            "entryPrice": 864000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 25.9155,
            "marketCapRank": 30,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -1.1% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "직전 30분봉 종가 1095000, 전봉 종가 1104000",
              "latestOpen": 1095000.0,
              "latestClose": 1095000.0,
              "previousClose": 1104000.0
            },
            "toss": {
              "avgStrength": 94.0,
              "note": "토스 공개 체결강도 94.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-08T10:59:59Z",
              "intradayAbove100Ratio": 77.8,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 207.7,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 220.8,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.2093,
              "last30BuyVolume": 52.0,
              "last30SellVolume": 43.0
            },
            "orderbook": {
              "bidAskRatio": 2.8537,
              "bidTotal": 4038,
              "askTotal": 1415,
              "note": "Naver 호가잔량합계 매수 4,038 / 매도 1,415",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=011070"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 76.63, ATR10 10.68%, 일간 표준편차 4.44%, 당일 레인지 6.80%.",
              "metrics": {
                "atrPct10": 10.68,
                "returnStd20": 4.44,
                "todayRangePct": 6.8,
                "vkospi": 76.63
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "55% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "889,920원",
                "historicalHitRate": 0.6964,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "907,200원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 848,448원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "848,448원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 817000,
              "fallbackStopPrice": 848448,
              "effectiveHardStopPrice": 848448,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 817,000원와 기존 % 손절 848,448원 중 더 높은 848,448원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 817,000원이며, 기존 % 손절 848,448원보다 느슨해지지 않게 848,448원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 855360,
              "high": 864000,
              "anchor": 864000,
              "label": "855,360~864,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 874000,
                "retrace33Price": 867300,
                "retrace50Price": 869000,
                "nearestResistancePrice": 874000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "879,552원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "889,920원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "898,560원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 848,448원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "848,448원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 874000,
                "retrace33Price": 867300,
                "retrace50Price": 869000,
                "nearestResistancePrice": 874000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "879,552원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "889,920원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 848,448원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "848,448원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 874000,
                "retrace33Price": 867300,
                "retrace50Price": 869000,
                "nearestResistancePrice": 874000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "889,920원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "907,200원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 848,448원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "848,448원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.7782
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 112건)",
              "hitRate": 0.6964,
              "ev": 1.583,
              "sampleCount": 112
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -1.1% (필요 -5%~-25%)",
            "statusReason": "G2 미충족: 20일 고점 대비 -1.1% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 864000.0,
                "vs52wHighPct": 47.62954796030871,
                "vs52wLowPct": 516.7023554603854,
                "dropFrom52wHighPct": 52.370452039691294,
                "ma20GapPct": 28.456735057983945,
                "rsi14": 81.32221731112827,
                "volumeRatio20d": 73.58820737064312,
                "rs20Pct": 72.8,
                "tradingValueRank": 21.0,
                "marketCapRank": 30.0,
                "marketCapTrillion": 25.9155,
                "per": 53.46,
                "pbr": 4.26,
                "cnsPer": 33.13,
                "foreignRate": 23.08,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-08T22:00:15+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "한켐",
            "code": "457370",
            "strictScore": 7.0,
            "signalScore": 7.0,
            "score": 7.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 8.0,
            "gradeScore": 8.8,
            "grade": "S",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -112,738→80,004 / 기관 -54,265→-1,302 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 84.7% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 9,470 / 20MA 8,849 (107.0% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 80% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 925% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 6.29 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 13050, 전봉 종가 13710 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)"
              }
            ],
            "scoreScope": "reversal",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 47위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 0.1조 (필요 ≥ 5조)",
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
                "status": "✅",
                "note": "최근 5거래일(2026-05-12~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +2.9% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -4.2% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 9,470 / 60MA 8,689",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.4% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "외인 -112,738→80,004 / 기관 -54,265→-1,302 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 9,470 / 20MA 8,849 (107.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 80% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 925% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 6.29 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 84.7% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 13050, 전봉 종가 13710 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 9470,
            "previousClose": 7930,
            "dailyChange": 1540,
            "dailyChangePct": 19.42,
            "dailyDirection": "up",
            "entryPriceText": "9,470원 (당일 종가 기준)",
            "entryPrice": 9470,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.1052,
            "marketCapRank": 1292,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -4.2% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A457370/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 한켐 (457370) 차트 화면을 엽니다.",
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
                    "KIND 공시에서 한켐 (457370) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 13050, 전봉 종가 13710",
              "latestOpen": 13050.0,
              "latestClose": 13050.0,
              "previousClose": 13710.0
            },
            "toss": {
              "avgStrength": 84.7,
              "note": "토스 공개 체결강도 84.7% / 최근 체결 162분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A457370/order",
              "asOf": "2026-06-08T09:00:21Z",
              "intradayAbove100Ratio": 88.2,
              "observedMinutes": 162,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 162분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 6.2857,
              "bidTotal": 18920,
              "askTotal": 3010,
              "note": "Naver 호가잔량합계 매수 18,920 / 매도 3,010",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=457370"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 76.63, ATR10 7.48%, 일간 표준편차 5.04%, 당일 레인지 26.99%.",
              "metrics": {
                "atrPct10": 7.48,
                "returnStd20": 5.04,
                "todayRangePct": 26.99,
                "vkospi": 76.63
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "55% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "9,754원",
                "historicalHitRate": 0.6964,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "9,944원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 9,300원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "9,300원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 7750,
              "fallbackStopPrice": 9300,
              "effectiveHardStopPrice": 9300,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 7,750원와 기존 % 손절 9,300원 중 더 높은 9,300원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 7,750원이며, 기존 % 손절 9,300원보다 느슨해지지 않게 9,300원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 9375,
              "high": 9470,
              "anchor": 9470,
              "label": "9,375~9,470원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 9890,
                "retrace33Price": 9609,
                "retrace50Price": 9680,
                "nearestResistancePrice": 9480,
                "secondaryResistancePrice": 9650,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "9,640원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "9,754원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.4%",
                    "targetPrice": "9,890원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 9,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "9,300원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 9890,
                "retrace33Price": 9609,
                "retrace50Price": 9680,
                "nearestResistancePrice": 9480,
                "secondaryResistancePrice": 9650,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "9,640원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "9,754원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 9,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "9,300원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 9890,
                "retrace33Price": 9609,
                "retrace50Price": 9680,
                "nearestResistancePrice": 9480,
                "secondaryResistancePrice": 9650,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "9,754원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "9,944원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 9,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "9,300원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.7782
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 112건)",
              "hitRate": 0.6964,
              "ev": 1.583,
              "sampleCount": 112
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F2",
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.1조 (필요 ≥ 5조) · 외 2건",
            "statusReason": "F2 미충족: 시총 0.1조 (필요 ≥ 5조) / G1 미충족: 1개월 수익률 +2.9% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -4.2% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 9470.0,
                "vs52wHighPct": 55.57511737089202,
                "vs52wLowPct": 33.946251768033946,
                "dropFrom52wHighPct": 44.424882629107984,
                "ma20GapPct": 7.017742117753419,
                "rsi14": 61.064851549431985,
                "volumeRatio20d": 1016.2693557674606,
                "rs20Pct": 3.8377192982456143,
                "tradingValueRank": 47.0,
                "marketCapRank": 1292.0,
                "marketCapTrillion": 0.1052,
                "per": 20.42,
                "pbr": 1.75,
                "cnsPer": 0.0,
                "foreignRate": 1.4,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-06-08T22:00:15+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "에코프로",
            "code": "086520",
            "strictScore": 7.0,
            "signalScore": 7.0,
            "score": 7.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.0,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -205,431→-3,091 / 기관 -130,436→1,319 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 87.0% / 마지막 1시간 277.3% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 146,500 / 20MA 145,690 (100.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 73% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 275% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.92 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 105200, 전봉 종가 106600 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)"
              }
            ],
            "scoreScope": "reversal",
            "statusLabel": "매매금지",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 78위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 14.3조 (필요 ≥ 5조)",
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
                "status": "✅",
                "note": "최근 5거래일(2026-05-12~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -10.5% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.9% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 146,500 / 60MA 150,787",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.1% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "외인 -205,431→-3,091 / 기관 -130,436→1,319 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 146,500 / 20MA 145,690 (100.6% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 73% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 275% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.92 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 87.0% / 마지막 1시간 277.3% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 105200, 전봉 종가 106600 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 146500,
            "previousClose": 129800,
            "dailyChange": 16700,
            "dailyChangePct": 12.87,
            "dailyDirection": "up",
            "entryPriceText": "146,500원 (당일 종가 기준)",
            "entryPrice": 146500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 14.2837,
            "marketCapRank": 57,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -11.9% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 에코프로 (086520) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 105200, 전봉 종가 106600",
              "latestOpen": 105200.0,
              "latestClose": 105200.0,
              "previousClose": 106600.0
            },
            "toss": {
              "avgStrength": 87.0,
              "note": "토스 공개 체결강도 87.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A086520/order",
              "asOf": "2026-06-08T10:59:59Z",
              "intradayAbove100Ratio": 90.0,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 277.3,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 38.0,
              "last30BuyVolume": 38.0,
              "last30SellVolume": 0.0
            },
            "orderbook": {
              "bidAskRatio": 2.9165,
              "bidTotal": 21719,
              "askTotal": 7447,
              "note": "Naver 호가잔량합계 매수 21,719 / 매도 7,447",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=086520"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 76.63, ATR10 8.76%, 일간 표준편차 5.19%, 당일 레인지 15.10%.",
              "metrics": {
                "atrPct10": 8.76,
                "returnStd20": 5.19,
                "todayRangePct": 15.1,
                "vkospi": 76.63
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "55% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "150,895원",
                "historicalHitRate": 0.6964,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "153,825원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 143,863원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "143,863원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 132100,
              "fallbackStopPrice": 143863,
              "effectiveHardStopPrice": 143863,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 132,100원와 기존 % 손절 143,863원 중 더 높은 143,863원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 132,100원이며, 기존 % 손절 143,863원보다 느슨해지지 않게 143,863원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 145035,
              "high": 146500,
              "anchor": 146500,
              "label": "145,035~146,500원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 166200,
                "retrace33Price": 153001,
                "retrace50Price": 156350,
                "nearestResistancePrice": 151300,
                "secondaryResistancePrice": 154300,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.3%",
                    "targetPrice": "151,300원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.3%",
                    "targetPrice": "154,300원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+13.4%",
                    "targetPrice": "166,200원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 143,863원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "143,863원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 166200,
                "retrace33Price": 153001,
                "retrace50Price": 156350,
                "nearestResistancePrice": 151300,
                "secondaryResistancePrice": 154300,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.3%",
                    "targetPrice": "151,300원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.3%",
                    "targetPrice": "154,300원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 143,863원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "143,863원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 166200,
                "retrace33Price": 153001,
                "retrace50Price": 156350,
                "nearestResistancePrice": 151300,
                "secondaryResistancePrice": 154300,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "150,895원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "153,825원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 143,863원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "143,863원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 112건)",
                  "hitRate": 0.6964,
                  "ev": 1.583,
                  "sampleCount": 112
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.7782
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 112건)",
              "hitRate": 0.6964,
              "ev": 1.583,
              "sampleCount": 112
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G3",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -10.5% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 -10.5% (필요 ≥ +15%) / G3 미충족: 종가 146,500 / 60MA 150,787",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 146500.0,
                "vs52wHighPct": 77.10526315789473,
                "vs52wLowPct": 257.3170731707317,
                "dropFrom52wHighPct": 22.894736842105264,
                "ma20GapPct": 0.5559750154437504,
                "rsi14": 51.99185184450977,
                "volumeRatio20d": 260.3409337350344,
                "rs20Pct": -10.8338405356056,
                "tradingValueRank": 78.0,
                "marketCapRank": 57.0,
                "marketCapTrillion": 14.2837,
                "per": 232.74,
                "pbr": 6.48,
                "cnsPer": 0.0,
                "foreignRate": 19.22,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-06-08T22:00:15+09:00",
              "source": "jongga_analysis"
            }
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
  "analysisDate": "2026-05-22"
};
