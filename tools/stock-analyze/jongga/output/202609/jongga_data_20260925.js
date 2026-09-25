window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-09-25"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-09-25T06:07:07+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "353200",
      "name": "대덕전자",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "036930",
      "name": "주성엔지니어링",
      "reasons": [
        "공매도 과열"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    }
  ],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 22,
      "failed": 0,
      "stale": 0,
      "manual": 3,
      "fallback": 1,
      "slots": 1
    },
    "failedKeys": [
      "news 009150: HTTP Error 410: 410",
      "news 356680: HTTP Error 410: 410",
      "news 402340: HTTP Error 410: 410",
      "news 030530: HTTP Error 410: 410",
      "news 005930: HTTP Error 410: 410",
      "news 353200: HTTP Error 410: 410",
      "news 072950: HTTP Error 410: 410",
      "news 478340: HTTP Error 410: 410",
      "news 387690: HTTP Error 410: 410"
    ],
    "staleKeys": [],
    "manualKeys": [],
    "fallbackKeys": [
      "short_balance_trend"
    ],
    "providerHealth": {
      "naver_mobile": {
        "ok": 22
      },
      "naver_chart": {
        "ok": 22
      },
      "naver_integration_schedule": {
        "ok": 12
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
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
        "ok": 11
      },
      "naver_item_news": {
        "ok": 9
      },
      "cnbc_quote": {
        "ok": 1
      },
      "krx_pykrx_short_balance": {
        "data_missing": 16
      },
      "krx_short_balance_direct_post": {
        "ok": 16
      }
    },
    "fallbackUsage": [
      {
        "key": "short_balance_trend",
        "provider": "krx_short_balance_direct_post",
        "layer": "api",
        "fallbackLevel": 2,
        "confidence": 0.75,
        "stale": false,
        "count": 16
      }
    ],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 664.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 198.9,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.1,
        "detail": "G-B 🔵"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1700.7,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 528.0,
        "detail": "박스권 ⚠️"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 60432.3,
        "count": 22
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "partial",
        "durationMs": 111637.5,
        "detail": "후보 16종목 중 16건 수집 · fallback 16건 (krx_short_balance_direct_post)",
        "count": 16
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 9300.4,
        "detail": "성공 22 / 실패 0",
        "count": 22
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 12442.1,
        "detail": "direct-http · 체결강도 22 / 호가 22 / 틱프록시 22",
        "count": 22
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 55636.7,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 13273.5,
        "detail": "playwright-chromium · KIND 2",
        "count": 2
      },
      {
        "step": "pullback_news_enrichment",
        "label": "눌림목 뉴스 보강",
        "status": "partial",
        "durationMs": 0.0,
        "detail": "shortlist 9 · 뉴스 9",
        "count": 9
      },
      {
        "step": "blacklist_check",
        "label": "공매도 과열·투자 주의 검증",
        "status": "ok",
        "durationMs": 56783.1,
        "detail": "확정 2 · 미확인 0",
        "count": 10
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
            "value": "박스권 ⚠️"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "7080.92 (+0.90%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 42.98"
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
            "value": "G-B 🔵 (+4.0점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 80% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6858.43",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6843.88",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 42.98",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 12 / 하락 8",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "KOSPI 60/20MA 상향",
            "verdict": "박스권 ⚠️"
          },
          {
            "item": "거시 맥락",
            "value": "표준 레짐 / RI 50.44419702285107",
            "verdict": "⚠️"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20260925",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "박스권 ⚠️",
          "regimeAdjustmentReason": "KOSPI 60/20MA 상향",
          "riseJustified": false,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 65.0,
          "fundamentalAnchorState": "supportive",
          "bubbleIndex": 43.69,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 50.44419702285107,
          "stageOverrideReason": "지지력 보정: raw P 53 -> adjusted P 50 · F_support 10점",
          "kospiClose": 7080.92,
          "kospiMa5": 6943.238,
          "vkospiValue": 42.98,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": false
        },
        "technicalRegimeLabel": "박스권 ⚠️",
        "effectiveRegimeLabel": "박스권 ⚠️",
        "regimeAdjustmentReason": "KOSPI 60/20MA 상향"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "+0.24%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+15.67",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
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
            "actualValue": "-25.45원",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+7.70%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+4.0점",
        "grade": "G-B 🔵",
        "code": "G-B",
        "entryAdjustment": "✅ 100% 진입 / ✅ 80% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 유지",
        "swingAdjustment": "허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-09-26T03:59:00+00:00",
          "vix": "2026-09-25T20:15:00+00:00",
          "tnx": "2026-09-25T19:00:00+00:00",
          "krw": "2026-09-25T22:59:00+00:00",
          "sox": "2026-09-26T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 11.6,
            "signalScore": 11.6,
            "score": 11.6,
            "scoreMax": 13.0,
            "effectiveScoreMax": 12.5,
            "gradeScore": 9.3,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 4,513,767주 / 기관 1,346,883주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 286,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 284,500 ≤ 종가 286,500)"
              },
              {
                "code": "C5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "data_missing",
                "note": "뉴스 수집 실패: HTTP Error 410: 410"
              },
              {
                "code": "D1",
                "strictPoints": 2.5,
                "signalPoints": 2.5,
                "maxPoints": 2.5,
                "evalStatus": "met",
                "note": "52주 고가 대비 -24.6% (≥12% 만점·8~12% 부분) · 충족"
              },
              {
                "code": "D2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "수급추세 +4 (≥+2 만점·+1 부분) · 충족"
              },
              {
                "code": "D3",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "거래량 117% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -10.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 137% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 271,000 > 20MA 262,250 > 60MA 262,150 · 상승선 5MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 286,500 / 60MA 262,150",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 60.7 (필요 ≥ 50)",
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
                "note": "KOSPI 7,081 / 5MA 6,943 (+2.0%) · VKOSPI 43.0 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +3.24% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 60.7 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +9.2% (필요 ≤ +25%) · 60MA +9.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -24.6% (≥12%) · 거래량 117% (≥80%) · 수급추세 +4 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "status": "⚠️",
                "note": "앵커 거래량 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "앵커 중심값 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 2.88:1 / 마지막 30분 평균 288.2% / 마지막 1시간 288.2% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "⚠️",
                "note": "뉴스 수집 실패: HTTP Error 410: 410",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 4,513,767주 / 기관 1,346,883주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 286,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 284,500 ≤ 종가 286,500)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -24.6% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +4 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 117% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -10.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C5",
                "note": "뉴스 수집 실패: HTTP Error 410: 410",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 286500,
            "previousClose": 277500,
            "dailyChange": 9000,
            "dailyChangePct": 3.24,
            "dailyDirection": "up",
            "entryPriceText": "286,500원 (당일 종가 기준)",
            "entryPrice": 286500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1674.9588,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2546,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 4,513,767주 / 기관 1,346,883주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족",
              "뉴스 수집 실패: HTTP Error 410: 410"
            ],
            "toss": {
              "avgStrength": 159.0,
              "note": "토스 공개 체결강도 159.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-09-23T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 288.2,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 288.2,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 2.8824,
              "last30BuyVolume": 294.0,
              "last30SellVolume": 102.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-09-22까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 268,952원 (6.12% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 268952,
                    "distancePct": 6.12,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 23,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 255744,
                    "distancePct": 10.74,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 26,
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 249054,
                    "distancePct": 13.07,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 22,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 243226,
                    "distancePct": 15.1,
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
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 228448,
                    "distancePct": 20.26,
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
                    "lastSeenDaysAgo": 30,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 268952,
                  "distancePct": 6.12,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 23,
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
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 207750,
                    "distancePct": 27.49,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 207000,
                    "bandHigh": 208500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 229062,
                    "distancePct": 20.05,
                    "count": 5,
                    "lastSeenDaysAgo": 30,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 227500,
                    "bandHigh": 231000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 241667,
                    "distancePct": 15.65,
                    "count": 10,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 238000,
                    "bandHigh": 245000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 248029,
                    "distancePct": 13.43,
                    "count": 12,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 246000,
                    "bandHigh": 251500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 255000,
                    "distancePct": 10.99,
                    "count": 15,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 252500,
                    "bandHigh": 257500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 261824,
                    "distancePct": 8.61,
                    "count": 16,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 259000,
                    "bandHigh": 265000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 268600,
                    "distancePct": 6.25,
                    "count": 13,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 266000,
                    "bandHigh": 271500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 276062,
                    "distancePct": 3.64,
                    "count": 6,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 273000,
                    "bandHigh": 279500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 283667,
                    "distancePct": 0.99,
                    "count": 6,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 281000,
                    "bandHigh": 286500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 311833,
                    "distancePct": -8.84,
                    "count": 2,
                    "lastSeenDaysAgo": 56,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 309500,
                    "bandHigh": 314500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 319500,
                    "distancePct": -11.52,
                    "count": 2,
                    "lastSeenDaysAgo": 55,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 318000,
                    "bandHigh": 321000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 227833,
                    "distancePct": 20.48,
                    "count": 3,
                    "lastSeenDaysAgo": 30,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 227500,
                    "bandHigh": 228000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 244786,
                    "distancePct": 14.56,
                    "count": 7,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 7,
                    "bandLow": 240000,
                    "bandHigh": 247000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 256488,
                    "distancePct": 10.48,
                    "count": 11,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 242156051,
                    "binIndex": 10,
                    "binLow": 253283,
                    "binHigh": 259692
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 269304,
                    "distancePct": 6.0,
                    "count": 10,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 25,
                    "volume": 224104295,
                    "binIndex": 12,
                    "binLow": 266100,
                    "binHigh": 272508
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 250079,
                    "distancePct": 12.71,
                    "count": 10,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "volume": 192469814,
                    "binIndex": 9,
                    "binLow": 246875,
                    "binHigh": 253283
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 137% (11일 전)",
                "burstCount": 0,
                "maxRatioPct": 136.6,
                "latestBurstDaysAgo": null
              },
              "anchor": null,
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "⚠️",
                  "summary": "앵커 거래량 데이터 부족"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "앵커 중심값 데이터 부족"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 2.88:1 / 마지막 30분 평균 288.2% / 마지막 1시간 288.2% · 장 막판 매수세 유지"
                }
              },
              "newsFlow": {
                "lookbackDays": 5,
                "headlineCount": 0,
                "positiveCount": 0,
                "negativeCount": 0,
                "latestPositiveDate": "",
                "latestNegativeDate": "",
                "status": "data_missing",
                "summary": "뉴스 수집 실패: HTTP Error 410: 410",
                "headlines": [],
                "freshPositiveCount": 0,
                "freshNegativeCount": 0
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "neutral",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 42.98, ATR10 3.56%, 일간 표준편차 2.69%, 당일 레인지 1.98%.",
              "metrics": {
                "atrPct10": 3.56,
                "returnStd20": 2.69,
                "todayRangePct": 1.98,
                "vkospi": 42.98
              },
              "strategyLabel": "눌림목"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "fallback_percent_stop",
              "anchorLookbackDays": 20,
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorHigh": null,
              "anchorLow": null,
              "anchorBodyMid": null,
              "anchorVolumeRatio": null,
              "anchorStopMode": "",
              "anchorStopPrice": null,
              "ma10Price": 263600,
              "ma10PrevPrice": 261900,
              "ma20Price": 262250,
              "ma20PrevPrice": 261000,
              "ma10WarningPrice": null,
              "hardStopPrice": 279338,
              "fallbackStopPrice": 279338,
              "effectiveStopPrice": 279338,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 279,338원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 279,338원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "292,230원",
                "historicalHitRate": 0.5894,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "295,095원",
                "historicalHitRate": 0.4715,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "299,392원",
                "historicalHitRate": 0.3252,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "303,690원",
                "historicalHitRate": 0.2456,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 279,338원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "279,338원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 283635,
              "high": 286500,
              "anchor": 286500,
              "label": "283,635~286,500원 (종가 ±, 분할매수)"
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
                    "targetPrice": "292,230원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "295,095원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "299,392원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "303,690원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 279,338원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "279,338원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 128건)",
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
                    "targetPrice": "292,230원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "295,095원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "299,392원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "303,690원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 279,338원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "279,338원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
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
                    "targetPrice": "292,230원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "295,095원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "299,392원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "303,690원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 279,338원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "279,338원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 128건)",
              "sampleCount": 128,
              "ev": -1.6703
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 246건)",
              "hitRate": 0.5894,
              "ev": 1.182,
              "sampleCount": 246
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
              "핵심 Gate 미충족: G0",
              "매매금지(핵심 Gate 미충족: G0)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 137% (필요 ≥ 200%)",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 137% (필요 ≥ 200%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 286500.0,
                "vs52wHighPct": 75.39473684210526,
                "vs52wLowPct": 247.69417475728156,
                "dropFrom52wHighPct": 24.605263157894736,
                "ma20GapPct": 9.246901811248808,
                "rsi14": 62.34831392035731,
                "volumeRatio20d": 116.5715237767584,
                "rs20Pct": 9.560229445506693,
                "supportDistancePct": 6.12,
                "tradingValueRank": 1.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 1674.9588,
                "per": 12.85,
                "pbr": 3.33,
                "cnsPer": 5.98,
                "foreignRate": 46.55,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -10.09391646760876
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 9.2,
            "signalScore": 9.2,
            "score": 9.2,
            "scoreMax": 13.0,
            "effectiveScoreMax": 12.5,
            "gradeScore": 7.4,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 31,268주 / 기관 61,115주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,181,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 1,179,000 ≤ 종가 1,181,000)"
              },
              {
                "code": "C5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "data_missing",
                "note": "뉴스 수집 실패: HTTP Error 410: 410"
              },
              {
                "code": "D1",
                "strictPoints": 2.5,
                "signalPoints": 2.5,
                "maxPoints": 2.5,
                "evalStatus": "met",
                "note": "52주 고가 대비 -49.5% (≥12% 만점·8~12% 부분) · 충족"
              },
              {
                "code": "D2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족"
              },
              {
                "code": "D3",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "거래량 132% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "대차잔고 +4.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G1)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 133% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 1,107,800 > 20MA 1,069,600 > 60MA 1,139,017 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,181,000 / 60MA 1,139,017",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 57.5 (필요 ≥ 50)",
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
                "note": "KOSPI 7,081 / 5MA 6,943 (+2.0%) · VKOSPI 43.0 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +4.14% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 57.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +10.4% (필요 ≤ +25%) · 60MA +3.7% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -49.5% (≥12%) · 거래량 132% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "status": "⚠️",
                "note": "앵커 거래량 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "앵커 중심값 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 9.94:1 / 마지막 30분 평균 300.0% / 마지막 1시간 300.0% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "⚠️",
                "note": "뉴스 수집 실패: HTTP Error 410: 410",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 31,268주 / 기관 61,115주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,181,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,179,000 ≤ 종가 1,181,000)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -49.5% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 132% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C5",
                "note": "뉴스 수집 실패: HTTP Error 410: 410",
                "evalStatus": "data_missing"
              },
              {
                "code": "D4",
                "note": "대차잔고 +4.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1181000,
            "previousClose": 1134000,
            "dailyChange": 47000,
            "dailyChangePct": 4.14,
            "dailyDirection": "up",
            "entryPriceText": "1,181,000원 (당일 종가 기준)",
            "entryPrice": 1181000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 155.8022,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2546,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 31,268주 / 기관 61,115주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족",
              "뉴스 수집 실패: HTTP Error 410: 410"
            ],
            "toss": {
              "avgStrength": 143.0,
              "note": "토스 공개 체결강도 143.0% / 최근 체결 4분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-09-23T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 4,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 4분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 4,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 4,
              "last30BuySellRatio": 9.9423,
              "last30BuyVolume": 517.0,
              "last30SellVolume": 52.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-08-20까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,130,684원 (4.26% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1130684,
                    "distancePct": 4.26,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1038394,
                    "distancePct": 12.08,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 18,
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1004334,
                    "distancePct": 14.96,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 18,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 984958,
                    "distancePct": 16.6,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 14,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1188400,
                    "distancePct": -0.63,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1130684,
                  "distancePct": 4.26,
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
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 769000,
                    "distancePct": 34.89,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 768000,
                    "bandHigh": 770000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 924250,
                    "distancePct": 21.74,
                    "count": 3,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 916000,
                    "bandHigh": 931000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 944800,
                    "distancePct": 20.0,
                    "count": 5,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 939000,
                    "bandHigh": 949000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 981417,
                    "distancePct": 16.9,
                    "count": 10,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 968000,
                    "bandHigh": 994000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1006000,
                    "distancePct": 14.82,
                    "count": 8,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 997000,
                    "bandHigh": 1019000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1031455,
                    "distancePct": 12.66,
                    "count": 10,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1024000,
                    "bandHigh": 1041000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1067538,
                    "distancePct": 9.61,
                    "count": 11,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1050000,
                    "bandHigh": 1082000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1105400,
                    "distancePct": 6.4,
                    "count": 13,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1086000,
                    "bandHigh": 1119000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1130700,
                    "distancePct": 4.26,
                    "count": 10,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1123000,
                    "bandHigh": 1138000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1157200,
                    "distancePct": 2.02,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1154000,
                    "bandHigh": 1161000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1188400,
                    "distancePct": -0.63,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1177000,
                    "bandHigh": 1200000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1222600,
                    "distancePct": -3.52,
                    "count": 4,
                    "lastSeenDaysAgo": 43,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1212000,
                    "bandHigh": 1230000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1260333,
                    "distancePct": -6.72,
                    "count": 3,
                    "lastSeenDaysAgo": 45,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1253000,
                    "bandHigh": 1270000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1318500,
                    "distancePct": -11.64,
                    "count": 2,
                    "lastSeenDaysAgo": 48,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1310000,
                    "bandHigh": 1327000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1353500,
                    "distancePct": -14.61,
                    "count": 2,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1351000,
                    "bandHigh": 1356000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1408000,
                    "distancePct": -19.22,
                    "count": 2,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1407000,
                    "bandHigh": 1409000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1524333,
                    "distancePct": -29.07,
                    "count": 2,
                    "lastSeenDaysAgo": 57,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1523000,
                    "bandHigh": 1525000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1592000,
                    "distancePct": -34.8,
                    "count": 2,
                    "lastSeenDaysAgo": 56,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1589000,
                    "bandHigh": 1595000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 988500,
                    "distancePct": 16.3,
                    "count": 4,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 4,
                    "bandLow": 974000,
                    "bandHigh": 999000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1130667,
                    "distancePct": 4.26,
                    "count": 10,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 6063212,
                    "binIndex": 8,
                    "binLow": 1109333,
                    "binHigh": 1152000
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1002667,
                    "distancePct": 15.1,
                    "count": 10,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 5975029,
                    "binIndex": 5,
                    "binLow": 981333,
                    "binHigh": 1024000
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1045333,
                    "distancePct": 11.49,
                    "count": 8,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "volume": 4721115,
                    "binIndex": 6,
                    "binLow": 1024000,
                    "binHigh": 1066667
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 133% (17일 전)",
                "burstCount": 0,
                "maxRatioPct": 133.3,
                "latestBurstDaysAgo": null
              },
              "anchor": null,
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "⚠️",
                  "summary": "앵커 거래량 데이터 부족"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "앵커 중심값 데이터 부족"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 9.94:1 / 마지막 30분 평균 300.0% / 마지막 1시간 300.0% · 장 막판 매수세 유지"
                }
              },
              "newsFlow": {
                "lookbackDays": 5,
                "headlineCount": 0,
                "positiveCount": 0,
                "negativeCount": 0,
                "latestPositiveDate": "",
                "latestNegativeDate": "",
                "status": "data_missing",
                "summary": "뉴스 수집 실패: HTTP Error 410: 410",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 42.98, ATR10 5.50%, 일간 표준편차 4.15%, 당일 레인지 3.09%.",
              "metrics": {
                "atrPct10": 5.5,
                "returnStd20": 4.15,
                "todayRangePct": 3.09,
                "vkospi": 42.98
              },
              "strategyLabel": "눌림목"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "fallback_percent_stop",
              "anchorLookbackDays": 20,
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorHigh": null,
              "anchorLow": null,
              "anchorBodyMid": null,
              "anchorVolumeRatio": null,
              "anchorStopMode": "",
              "anchorStopPrice": null,
              "ma10Price": 1079400,
              "ma10PrevPrice": 1075100,
              "ma20Price": 1069600,
              "ma20PrevPrice": 1063450,
              "ma10WarningPrice": null,
              "hardStopPrice": 1151475,
              "fallbackStopPrice": 1151475,
              "effectiveStopPrice": 1151475,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 1,151,475원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 1,151,475원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,204,620원",
                "historicalHitRate": 0.5894,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,216,430원",
                "historicalHitRate": 0.4715,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,234,145원",
                "historicalHitRate": 0.3252,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,251,860원",
                "historicalHitRate": 0.2456,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,151,475원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,151,475원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1169190,
              "high": 1181000,
              "anchor": 1181000,
              "label": "1,169,190~1,181,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "1,204,620원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,216,430원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,234,145원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,251,860원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,151,475원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,151,475원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 128건)",
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
                    "targetPrice": "1,204,620원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,216,430원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,234,145원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,251,860원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,151,475원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,151,475원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
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
                    "targetPrice": "1,204,620원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,216,430원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,234,145원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,251,860원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,151,475원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,151,475원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 128건)",
              "sampleCount": 128,
              "ev": -1.6703
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 246건)",
              "hitRate": 0.5894,
              "ev": 1.182,
              "sampleCount": 246
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
              "핵심 Gate 미충족: G0",
              "핵심 Gate 미충족: G1",
              "매매금지(핵심 Gate 미충족: G0, G1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 133% (필요 ≥ 200%) · 외 1건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 133% (필요 ≥ 200%) / G1 미충족: 5MA 1,107,800 > 20MA 1,069,600 > 60MA 1,139,017 · 상승선 5MA, 20MA · 정배열 미충족",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1181000.0,
                "vs52wHighPct": 50.51325919589392,
                "vs52wLowPct": 510.0206611570248,
                "dropFrom52wHighPct": 49.48674080410607,
                "ma20GapPct": 10.415108451757666,
                "rsi14": 59.34982945490496,
                "volumeRatio20d": 131.9803002048266,
                "rs20Pct": 11.625708884688091,
                "supportDistancePct": 4.26,
                "tradingValueRank": 8.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 155.8022,
                "per": 4.76,
                "pbr": 2.84,
                "cnsPer": 3.38,
                "foreignRate": 46.76,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 4.8321402807835305
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "대덕전자",
            "code": "353200",
            "strictScore": 9.2,
            "signalScore": 9.2,
            "score": 9.2,
            "scoreMax": 13.0,
            "effectiveScoreMax": 12.5,
            "gradeScore": 7.4,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -100,292주 / 기관 267,039주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 119,200 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 113,600 ≤ 종가 119,200)"
              },
              {
                "code": "C5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "data_missing",
                "note": "뉴스 수집 실패: HTTP Error 410: 410"
              },
              {
                "code": "D1",
                "strictPoints": 2.5,
                "signalPoints": 2.5,
                "maxPoints": 2.5,
                "evalStatus": "met",
                "note": "52주 고가 대비 -39.8% (≥12% 만점·8~12% 부분) · 충족"
              },
              {
                "code": "D2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족"
              },
              {
                "code": "D3",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "거래량 183% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "대차잔고 -2.3% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 334% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 107,760 > 20MA 104,950 > 60MA 110,545 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 119,200 / 60MA 110,545",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 57.1 (필요 ≥ 50)",
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
                "note": "KOSPI 7,081 / 5MA 6,943 (+2.0%) · VKOSPI 43.0 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +6.71% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 57.1 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +13.6% (필요 ≤ +25%) · 60MA +7.8% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -39.8% (≥12%) · 거래량 183% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "status": "⚠️",
                "note": "앵커 거래량 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "앵커 중심값 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 4.48:1 / 마지막 30분 평균 242.1% / 마지막 1시간 242.1% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "⚠️",
                "note": "뉴스 수집 실패: HTTP Error 410: 410",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 -100,292주 / 기관 267,039주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 119,200 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 113,600 ≤ 종가 119,200)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -39.8% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 183% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C5",
                "note": "뉴스 수집 실패: HTTP Error 410: 410",
                "evalStatus": "data_missing"
              },
              {
                "code": "D4",
                "note": "대차잔고 -2.3% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 119200,
            "previousClose": 111700,
            "dailyChange": 7500,
            "dailyChangePct": 6.71,
            "dailyDirection": "up",
            "entryPriceText": "119,200원 (당일 종가 기준)",
            "entryPrice": 119200,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 5.8905,
            "marketCapRank": 98,
            "marketCapUniverseCount": 2546,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -100,292주 / 기관 267,039주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족",
              "뉴스 수집 실패: HTTP Error 410: 410"
            ],
            "toss": {
              "avgStrength": 119.9,
              "note": "토스 공개 체결강도 119.9% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A353200/order",
              "asOf": "2026-09-23T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 242.1,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 242.1,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 4.4786,
              "last30BuyVolume": 3144.0,
              "last30SellVolume": 702.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-09-14까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 117,379원 (1.53% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 117379,
                    "distancePct": 1.53,
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
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 113514,
                    "distancePct": 4.77,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 102438,
                    "distancePct": 14.06,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 19,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 98614,
                    "distancePct": 17.27,
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
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 109804,
                    "distancePct": 7.88,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 12,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 117379,
                  "distancePct": 1.53,
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
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 71950,
                    "distancePct": 39.64,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 71800,
                    "bandHigh": 72100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 95133,
                    "distancePct": 20.19,
                    "count": 5,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 94000,
                    "bandHigh": 95800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 99003,
                    "distancePct": 16.94,
                    "count": 15,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 96700,
                    "bandHigh": 100400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 101909,
                    "distancePct": 14.51,
                    "count": 9,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 100800,
                    "bandHigh": 103100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 104308,
                    "distancePct": 12.49,
                    "count": 9,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 103600,
                    "bandHigh": 105700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 107167,
                    "distancePct": 10.1,
                    "count": 14,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 106100,
                    "bandHigh": 108300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 110508,
                    "distancePct": 7.29,
                    "count": 11,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 108900,
                    "bandHigh": 112000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 113062,
                    "distancePct": 5.15,
                    "count": 6,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 112200,
                    "bandHigh": 114200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 117125,
                    "distancePct": 1.74,
                    "count": 7,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 116200,
                    "bandHigh": 118300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 120044,
                    "distancePct": -0.71,
                    "count": 8,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 119000,
                    "bandHigh": 121300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 123600,
                    "distancePct": -3.69,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 123200,
                    "bandHigh": 124000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 130775,
                    "distancePct": -9.71,
                    "count": 3,
                    "lastSeenDaysAgo": 56,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 129600,
                    "bandHigh": 131500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 154000,
                    "distancePct": -29.19,
                    "count": 2,
                    "lastSeenDaysAgo": 58,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 153600,
                    "bandHigh": 154400
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 98225,
                    "distancePct": 17.6,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 97550,
                    "bandHigh": 98900
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 117633,
                    "distancePct": 1.31,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 25,
                    "volume": 8100222,
                    "binIndex": 12,
                    "binLow": 115800,
                    "binHigh": 119467
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 102967,
                    "distancePct": 13.62,
                    "count": 10,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 25,
                    "volume": 7898400,
                    "binIndex": 8,
                    "binLow": 101133,
                    "binHigh": 104800
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 113967,
                    "distancePct": 4.39,
                    "count": 6,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 7383519,
                    "binIndex": 11,
                    "binLow": 112133,
                    "binHigh": 115800
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 109100,
                    "distancePct": 8.47,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 387.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 334% (전일) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 334.4,
                "latestBurstDaysAgo": 1
              },
              "anchor": null,
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "⚠️",
                  "summary": "앵커 거래량 데이터 부족"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "앵커 중심값 데이터 부족"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 4.48:1 / 마지막 30분 평균 242.1% / 마지막 1시간 242.1% · 장 막판 매수세 유지"
                }
              },
              "newsFlow": {
                "lookbackDays": 5,
                "headlineCount": 0,
                "positiveCount": 0,
                "negativeCount": 0,
                "latestPositiveDate": "",
                "latestNegativeDate": "",
                "status": "data_missing",
                "summary": "뉴스 수집 실패: HTTP Error 410: 410",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 42.98, ATR10 6.83%, 일간 표준편차 4.11%, 당일 레인지 8.33%.",
              "metrics": {
                "atrPct10": 6.83,
                "returnStd20": 4.11,
                "todayRangePct": 8.33,
                "vkospi": 42.98
              },
              "strategyLabel": "눌림목"
            },
            "manualInput": {
              "required": false,
              "fields": [],
              "missingFieldCodes": [],
              "summary": "현재 수동 입력 필드가 없습니다.",
              "source": "public_data_only"
            },
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "fallback_percent_stop",
              "anchorLookbackDays": 20,
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorHigh": null,
              "anchorLow": null,
              "anchorBodyMid": null,
              "anchorVolumeRatio": null,
              "anchorStopMode": "",
              "anchorStopPrice": null,
              "ma10Price": 103630,
              "ma10PrevPrice": 102320,
              "ma20Price": 104950,
              "ma20PrevPrice": 104340,
              "ma10WarningPrice": null,
              "hardStopPrice": 116220,
              "fallbackStopPrice": 116220,
              "effectiveStopPrice": 116220,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 116,220원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 116,220원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "121,584원",
                "historicalHitRate": 0.5894,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "122,776원",
                "historicalHitRate": 0.4715,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "124,564원",
                "historicalHitRate": 0.3252,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "126,352원",
                "historicalHitRate": 0.2456,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 116,220원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "116,220원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 118008,
              "high": 119200,
              "anchor": 119200,
              "label": "118,008~119,200원 (종가 ±, 분할매수)"
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
                    "targetPrice": "121,584원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "122,776원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "124,564원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "126,352원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 116,220원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "116,220원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 128건)",
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
                    "targetPrice": "121,584원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "122,776원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "124,564원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "126,352원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 116,220원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "116,220원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
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
                    "targetPrice": "121,584원",
                    "historicalHitRate": 0.5894,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "122,776원",
                    "historicalHitRate": 0.4715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "124,564원",
                    "historicalHitRate": 0.3252,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "126,352원",
                    "historicalHitRate": 0.2456,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 116,220원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "116,220원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 246건)",
                  "hitRate": 0.5894,
                  "ev": 1.182,
                  "sampleCount": 246
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 128건)",
              "sampleCount": 128,
              "ev": -1.6703
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 246건)",
              "hitRate": 0.5894,
              "ev": 1.182,
              "sampleCount": 246
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
              "매매금지(핵심 Gate 미충족: G1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 107,760 > 20MA 104,950 > 60MA 110,545 · 상승선 5MA, 20MA · 정배열 미충족",
            "statusReason": "G1 미충족: 5MA 107,760 > 20MA 104,950 > 60MA 110,545 · 상승선 5MA, 20MA · 정배열 미충족",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 119200.0,
                "vs52wHighPct": 60.2020202020202,
                "vs52wLowPct": 352.3719165085389,
                "dropFrom52wHighPct": 39.7979797979798,
                "ma20GapPct": 13.577894235350167,
                "rsi14": 61.76750308530067,
                "volumeRatio20d": 182.73314564661038,
                "rs20Pct": 11.401869158878505,
                "supportDistancePct": 1.53,
                "tradingValueRank": 29.0,
                "marketCapRank": 98.0,
                "marketCapTrillion": 5.8905,
                "per": 40.38,
                "pbr": 6.29,
                "cnsPer": 26.66,
                "foreignRate": 18.72,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -2.305375919435257
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "대한항공",
            "code": "003490",
            "strictScore": 5.7,
            "signalScore": 5.7,
            "score": 5.7,
            "scoreMax": 12.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 4.6,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "RS",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "3개월 상대강도 상위 25% 밖"
              },
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 89,172주 / 기관 563,187주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 117.2% / 100% 유지 80.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 98.1% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 138% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 98.1% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 0% / 윗꼬리·몸통 0.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.72 (필요 ≥ 1.2)"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +17.6% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +2.3% / 20일 초과 +7.9%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 98.1% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 40",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 138% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 0% / 윗꼬리·몸통 0.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -0.47% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 31,500 / 5MA 30,180 (전일 5MA 29,730) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 89,172주 / 기관 563,187주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 117.2% / 100% 유지 80.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 98.1% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.1% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +17.6% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
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
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 138% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 0% / 윗꼬리·몸통 0.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.72 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 31500,
            "previousClose": 31650,
            "dailyChange": -150,
            "dailyChangePct": -0.47,
            "dailyDirection": "down",
            "entryPriceText": "31,500원 (당일 종가 기준)",
            "entryPrice": 31500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 11.5989,
            "marketCapRank": 61,
            "marketCapUniverseCount": 2546,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 89,172주 / 기관 563,187주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 117.2,
              "note": "토스 공개 체결강도 117.2% / 최근 체결 5분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A003490/order",
              "asOf": "2026-09-23T10:59:58Z",
              "intradayAbove100Ratio": 80.0,
              "observedMinutes": 5,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 5분 프록시",
              "lastHourAvgStrength": 177.3,
              "lastHourObservedMinutes": 5,
              "last30AvgStrength": 177.3,
              "last30ObservedMinutes": 5,
              "last30BuySellRatio": 2.3937,
              "last30BuyVolume": 6803.0,
              "last30SellVolume": 2842.0
            },
            "orderbook": {
              "bidAskRatio": 0.724,
              "bidTotal": 146100,
              "askTotal": 201803,
              "note": "토스 호가잔량합계 매수 146,100 / 매도 201,803",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A003490/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "neutral",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 42.98, ATR10 3.87%, 일간 표준편차 2.42%, 당일 레인지 3.16%.",
              "metrics": {
                "atrPct10": 3.87,
                "returnStd20": 2.42,
                "todayRangePct": 3.16,
                "vkospi": 42.98
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
              "referencePrice": 30900,
              "referenceBandLow": 25700,
              "referenceBandHigh": 30900,
              "entryDayOpenPrice": 31500,
              "fallbackStopPrice": 30240,
              "effectiveHardStopPrice": 30900,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 30,900원와 기존 % 손절 30,240원 중 더 높은 30,900원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 30,900원이며, 기존 % 손절 30,240원보다 느슨해지지 않게 30,900원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.5%",
                "targetPrice": "31,650원",
                "historicalHitRate": 0.6433,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.9%",
                "targetPrice": "32,100원",
                "historicalHitRate": 0.3949,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "34,020원",
                "historicalHitRate": 0.2675,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "34,965원",
                "historicalHitRate": 0.2229,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "35,910원",
                "historicalHitRate": 0.1528,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 30,900원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.9%",
                "targetPrice": "30,900원"
              }
            ],
            "rr": "1 : 3.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 31185,
              "high": 31500,
              "anchor": 31500,
              "label": "31,185~31,500원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 31650,
                "secondaryResistancePrice": 32100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "32,445원",
                    "historicalHitRate": 0.6433,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "33,075원",
                    "historicalHitRate": 0.3949,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "34,020원",
                    "historicalHitRate": 0.2675,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "34,965원",
                    "historicalHitRate": 0.2229,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "35,910원",
                    "historicalHitRate": 0.1528,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 30,900원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "30,900원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 144건)",
                  "hitRate": 0.1528,
                  "ev": 1.11,
                  "sampleCount": 144
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 31650,
                "secondaryResistancePrice": 32100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "31,650원",
                    "historicalHitRate": 0.6433,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "32,100원",
                    "historicalHitRate": 0.3949,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "34,020원",
                    "historicalHitRate": 0.2675,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "34,965원",
                    "historicalHitRate": 0.2229,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "35,910원",
                    "historicalHitRate": 0.1528,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 30,900원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "30,900원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 144건)",
                  "hitRate": 0.1528,
                  "ev": 1.11,
                  "sampleCount": 144
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 63건)",
                "nearestResistancePrice": 31650,
                "secondaryResistancePrice": 32100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "31,650원",
                    "historicalHitRate": 0.6433,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "32,100원",
                    "historicalHitRate": 0.3949,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "34,020원",
                    "historicalHitRate": 0.2675,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "34,965원",
                    "historicalHitRate": 0.2229,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "35,910원",
                    "historicalHitRate": 0.1528,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 30,900원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "30,900원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 144건)",
                  "hitRate": 0.1528,
                  "ev": 1.11,
                  "sampleCount": 144
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 63건)",
              "sampleCount": 63,
              "ev": -1.644
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 144건)",
              "hitRate": 0.1528,
              "ev": 1.11,
              "sampleCount": 144
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
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "observe-breakout",
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
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 138% (필요 ≥ 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 138% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 31500.0,
                "vs52wHighPct": 98.13084112149532,
                "vs52wLowPct": 50.0,
                "dropFrom52wHighPct": 1.8691588785046727,
                "ma20GapPct": 6.797762332598746,
                "rsi14": 68.3779763404358,
                "volumeRatio20d": 137.64101126069124,
                "rs20Pct": 11.900532859680284,
                "tradingValueRank": 40.0,
                "marketCapRank": 61.0,
                "marketCapTrillion": 11.5989,
                "per": 0.0,
                "pbr": 1.11,
                "cnsPer": 32.78,
                "foreignRate": 52.74,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": 17.56884408439635
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 10.4,
            "signalScore": 10.4,
            "score": 10.4,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 7.4,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 4,513,767주 / 기관 1,346,883주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +4,513,767 / 전일 +659,851 · 기관 당일 +1,346,883 / 전일 +259,459 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 288.2% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 159.0% / 마지막 1시간 288.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +14,146,784주 · 동반 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 109.2% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 271,000 / 20MA 262,250 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 119% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +3.24% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +2.81% / KOSPI +0.90% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.88:1 · 평균 체결강도 288.2% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -10.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
            "statusLabel": "관심후보",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +659,851/당일 +4,513,767 · 기관 전일 +259,459/당일 +1,346,883 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 286,500 / 60MA 262,150",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 75.4% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 1",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 117% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 46.5% (≥25%) · 20일 수익률 +9.6% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,081 / 5MA 6,943 (+2.0%) · VKOSPI 43.0 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 4,513,767주 / 기관 1,346,883주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +4,513,767 / 전일 +659,851 · 기관 당일 +1,346,883 / 전일 +259,459 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 288.2% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 159.0% / 마지막 1시간 288.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +14,146,784주 · 동반 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 271,000 / 20MA 262,250 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +3.24% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +2.81% / KOSPI +0.90% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.88:1 · 평균 체결강도 288.2% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -10.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 109.2% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 119% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 286500,
            "previousClose": 277500,
            "dailyChange": 9000,
            "dailyChangePct": 3.24,
            "dailyDirection": "up",
            "entryPriceText": "286,500원 (당일 종가 기준)",
            "entryPrice": 286500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1674.9588,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2546,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 4,513,767주 / 기관 1,346,883주 / 마지막 1시간 288.2% · 장후반 매수세 강화 · 마지막 30분 틱 2.88:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 159.0,
              "note": "토스 공개 체결강도 159.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-09-23T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 288.2,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 288.2,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 2.8824,
              "last30BuyVolume": 294.0,
              "last30SellVolume": 102.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "neutral",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 중립 변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 42.98, ATR10 3.56%, 일간 표준편차 2.69%, 당일 레인지 1.98%.",
              "metrics": {
                "atrPct10": 3.56,
                "returnStd20": 2.69,
                "todayRangePct": 1.98,
                "vkospi": 42.98
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 14146784.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260923",
                    "net": 4513767.0
                  },
                  {
                    "date": "20260922",
                    "net": 659851.0
                  },
                  {
                    "date": "20260921",
                    "net": 4080410.0
                  },
                  {
                    "date": "20260918",
                    "net": -1673323.0
                  },
                  {
                    "date": "20260917",
                    "net": -2170687.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260923",
                    "net": 1346883.0
                  },
                  {
                    "date": "20260922",
                    "net": 259459.0
                  },
                  {
                    "date": "20260921",
                    "net": 4186614.0
                  },
                  {
                    "date": "20260918",
                    "net": 2746972.0
                  },
                  {
                    "date": "20260917",
                    "net": 196838.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260923",
                    "net": 5860650.0
                  },
                  {
                    "date": "20260922",
                    "net": 919310.0
                  },
                  {
                    "date": "20260921",
                    "net": 8267024.0
                  },
                  {
                    "date": "20260918",
                    "net": 1073649.0
                  },
                  {
                    "date": "20260917",
                    "net": -1973849.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +14,146,784주 · 동반 양수 3/5일 · 증가 3회"
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
                "targetYield": "+0.5%",
                "targetPrice": "288,000원",
                "historicalHitRate": 0.6847,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.7%",
                "targetPrice": "291,500원",
                "historicalHitRate": 0.3662,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "302,258원",
                "historicalHitRate": 0.2325,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "309,420원",
                "historicalHitRate": 0.1306,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "318,015원",
                "historicalHitRate": 0.0737,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 284,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.7%",
                "targetPrice": "284,500원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260923",
              "anchorOpen": 284500,
              "anchorClose": 286500,
              "anchorVolumeRatio20d": 1.17,
              "anchorStopPrice": 284500,
              "fallbackStopPrice": 277905,
              "effectiveHardStopPrice": 284500,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 284,500원와 기존 % 손절 277,905원 중 더 높은 284,500원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 284,500원를 기준으로 잡고, 기존 % 손절 277,905원보다 느슨해지지 않게 284,500원로 고정합니다."
            },
            "rr": "1 : 7.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 283635,
              "high": 286500,
              "anchor": 286500,
              "label": "283,635~286,500원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 288000,
                "secondaryResistancePrice": 291500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "292,230원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "296,528원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "302,258원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "309,420원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "318,015원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 284,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.7%",
                    "targetPrice": "284,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 288000,
                "secondaryResistancePrice": 291500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "288,000원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "291,500원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "302,258원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "309,420원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "318,015원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 284,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.7%",
                    "targetPrice": "284,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 163건)",
                "nearestResistancePrice": 288000,
                "secondaryResistancePrice": 291500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "288,000원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "291,500원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "302,258원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "309,420원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "318,015원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 284,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.7%",
                    "targetPrice": "284,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 163건)",
              "sampleCount": 163,
              "ev": -1.2919
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 314건)",
              "hitRate": 0.6847,
              "ev": 0.383,
              "sampleCount": 314
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
              "reason": "현재 혼합 전략 기준에서는 자동 진입 대상이 아닙니다."
            },
            "entryEligible": false,
            "entryWatch": true,
            "entryBlockers": [],
            "setupQuality": "setup_weak",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 286500.0,
                "vs52wHighPct": 75.39473684210526,
                "vs52wLowPct": 247.69417475728156,
                "dropFrom52wHighPct": 24.605263157894736,
                "ma20GapPct": 9.246901811248808,
                "rsi14": 62.34831392035731,
                "volumeRatio20d": 116.5715237767584,
                "rs20Pct": 9.560229445506693,
                "tradingValueRank": 1.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 1674.9588,
                "per": 12.85,
                "pbr": 3.33,
                "cnsPer": 5.98,
                "foreignRate": 46.55,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -10.09391646760876
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 8.8,
            "signalScore": 8.8,
            "score": 8.8,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 6.3,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 31,268주 / 기관 61,115주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +31,268 / 전일 +72,246 · 기관 당일 +61,115 / 전일 -3,659 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 300.0% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 143.0% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +427,714주 · 동반 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 110.4% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,107,800 / 20MA 1,069,600 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 135% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +4.14% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +2.71% / KOSPI +0.90% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 9.94:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +4.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
            "statusLabel": "관심후보",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +72,246/당일 +31,268 · 기관 전일 -3,659/당일 +61,115 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,181,000 / 60MA 1,139,017",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 50.5% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 8",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 132% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 46.8% (≥25%) · 20일 수익률 +11.6% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,081 / 5MA 6,943 (+2.0%) · VKOSPI 43.0 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 31,268주 / 기관 61,115주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +31,268 / 전일 +72,246 · 기관 당일 +61,115 / 전일 -3,659 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 300.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 143.0% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +427,714주 · 동반 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,107,800 / 20MA 1,069,600 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +4.14% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +2.71% / KOSPI +0.90% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 9.94:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 110.4% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 135% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +4.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1181000,
            "previousClose": 1134000,
            "dailyChange": 47000,
            "dailyChangePct": 4.14,
            "dailyDirection": "up",
            "entryPriceText": "1,181,000원 (당일 종가 기준)",
            "entryPrice": 1181000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 155.8022,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2546,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 31,268주 / 기관 61,115주 / 마지막 1시간 300.0% · 장후반 매수세 강화 · 마지막 30분 틱 9.94:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 143.0,
              "note": "토스 공개 체결강도 143.0% / 최근 체결 4분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-09-23T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 4,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 4분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 4,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 4,
              "last30BuySellRatio": 9.9423,
              "last30BuyVolume": 517.0,
              "last30SellVolume": 52.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 42.98, ATR10 5.50%, 일간 표준편차 4.15%, 당일 레인지 3.09%.",
              "metrics": {
                "atrPct10": 5.5,
                "returnStd20": 4.15,
                "todayRangePct": 3.09,
                "vkospi": 42.98
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 427714.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260923",
                    "net": 31268.0
                  },
                  {
                    "date": "20260922",
                    "net": 72246.0
                  },
                  {
                    "date": "20260921",
                    "net": 108074.0
                  },
                  {
                    "date": "20260918",
                    "net": 96156.0
                  },
                  {
                    "date": "20260917",
                    "net": 33942.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260923",
                    "net": 61115.0
                  },
                  {
                    "date": "20260922",
                    "net": -3659.0
                  },
                  {
                    "date": "20260921",
                    "net": 33266.0
                  },
                  {
                    "date": "20260918",
                    "net": 39648.0
                  },
                  {
                    "date": "20260917",
                    "net": -44342.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260923",
                    "net": 92383.0
                  },
                  {
                    "date": "20260922",
                    "net": 68587.0
                  },
                  {
                    "date": "20260921",
                    "net": 141340.0
                  },
                  {
                    "date": "20260918",
                    "net": 135804.0
                  },
                  {
                    "date": "20260917",
                    "net": -10400.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +427,714주 · 동반 양수 3/5일 · 증가 3회"
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
                "targetYield": "+0.2%",
                "targetPrice": "1,183,000원",
                "historicalHitRate": 0.6847,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.9%",
                "targetPrice": "1,239,000원",
                "historicalHitRate": 0.3662,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "1,245,955원",
                "historicalHitRate": 0.2325,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,275,480원",
                "historicalHitRate": 0.1306,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,310,910원",
                "historicalHitRate": 0.0737,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,179,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.2%",
                "targetPrice": "1,179,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260923",
              "anchorOpen": 1179000,
              "anchorClose": 1181000,
              "anchorVolumeRatio20d": 1.32,
              "anchorStopPrice": 1179000,
              "fallbackStopPrice": 1145570,
              "effectiveHardStopPrice": 1179000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,179,000원와 기존 % 손절 1,145,570원 중 더 높은 1,179,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 1,179,000원를 기준으로 잡고, 기존 % 손절 1,145,570원보다 느슨해지지 않게 1,179,000원로 고정합니다."
            },
            "rr": "1 : 28.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1169190,
              "high": 1181000,
              "anchor": 1181000,
              "label": "1,169,190~1,181,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1183000,
                "secondaryResistancePrice": 1239000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,204,620원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,222,335원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,245,955원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,275,480원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,310,910원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,179,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "1,179,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1183000,
                "secondaryResistancePrice": 1239000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "1,183,000원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,222,335원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,245,955원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,275,480원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,310,910원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,179,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "1,179,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 163건)",
                "nearestResistancePrice": 1183000,
                "secondaryResistancePrice": 1239000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "1,183,000원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.9%",
                    "targetPrice": "1,239,000원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,245,955원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,275,480원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,310,910원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,179,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "1,179,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 163건)",
              "sampleCount": 163,
              "ev": -1.2919
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 314건)",
              "hitRate": 0.6847,
              "ev": 0.383,
              "sampleCount": 314
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
              "reason": "현재 혼합 전략 기준에서는 자동 진입 대상이 아닙니다."
            },
            "entryEligible": false,
            "entryWatch": true,
            "entryBlockers": [],
            "setupQuality": "setup_weak",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1181000.0,
                "vs52wHighPct": 50.51325919589392,
                "vs52wLowPct": 510.0206611570248,
                "dropFrom52wHighPct": 49.48674080410607,
                "ma20GapPct": 10.415108451757666,
                "rsi14": 59.34982945490496,
                "volumeRatio20d": 131.9803002048266,
                "rs20Pct": 11.625708884688091,
                "tradingValueRank": 8.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 155.8022,
                "per": 4.76,
                "pbr": 2.84,
                "cnsPer": 3.38,
                "foreignRate": 46.76,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 4.8321402807835305
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "SK이노베이션",
            "code": "096770",
            "strictScore": 8.0,
            "signalScore": 8.0,
            "score": 8.0,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 5.7,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 228,308주 / 기관 151,614주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +228,308 / 전일 +177,352 · 기관 당일 +151,614 / 전일 -62,938 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 192.4% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 167.0% / 마지막 1시간 192.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +417,395주 · 동반 양수 1/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 108.7% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 141,240 / 20MA 136,830 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 168% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 +5.24% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +1.69% / KOSPI +0.90% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.85:1 · 평균 체결강도 192.4% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +340.9% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: Q1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +177,352/당일 +228,308 · 기관 전일 -62,938/당일 +151,614 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 148,700 / 60MA 121,837",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 89.6% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 35",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 75% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 15.9% (≥25%) · 20일 수익률 +33.7% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,081 / 5MA 6,943 (+2.0%) · VKOSPI 43.0 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 228,308주 / 기관 151,614주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +228,308 / 전일 +177,352 · 기관 당일 +151,614 / 전일 -62,938 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 192.4% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 167.0% / 마지막 1시간 192.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +417,395주 · 동반 양수 1/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 141,240 / 20MA 136,830 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +1.69% / KOSPI +0.90% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.85:1 · 평균 체결강도 192.4% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 108.7% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 168% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +5.24% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +340.9% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 148700,
            "previousClose": 141300,
            "dailyChange": 7400,
            "dailyChangePct": 5.24,
            "dailyDirection": "up",
            "entryPriceText": "148,700원 (당일 종가 기준)",
            "entryPrice": 148700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 25.1381,
            "marketCapRank": 28,
            "marketCapUniverseCount": 2546,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 228,308주 / 기관 151,614주 / 마지막 1시간 192.4% · 장후반 매수세 강화 · 마지막 30분 틱 1.85:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 167.0,
              "note": "토스 공개 체결강도 167.0% / 최근 체결 9분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-09-23T10:59:57Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 9,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 9분 프록시",
              "lastHourAvgStrength": 192.4,
              "lastHourObservedMinutes": 9,
              "last30AvgStrength": 192.4,
              "last30ObservedMinutes": 9,
              "last30BuySellRatio": 1.8534,
              "last30BuyVolume": 1327.0,
              "last30SellVolume": 716.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 42.98, ATR10 6.46%, 일간 표준편차 4.62%, 당일 레인지 6.37%.",
              "metrics": {
                "atrPct10": 6.46,
                "returnStd20": 4.62,
                "todayRangePct": 6.37,
                "vkospi": 42.98
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 417395.0,
              "positiveDays": 1,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260923",
                    "net": 228308.0
                  },
                  {
                    "date": "20260922",
                    "net": 177352.0
                  },
                  {
                    "date": "20260921",
                    "net": -41633.0
                  },
                  {
                    "date": "20260918",
                    "net": 36934.0
                  },
                  {
                    "date": "20260917",
                    "net": -38776.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260923",
                    "net": 151614.0
                  },
                  {
                    "date": "20260922",
                    "net": -62938.0
                  },
                  {
                    "date": "20260921",
                    "net": 2920.0
                  },
                  {
                    "date": "20260918",
                    "net": -114077.0
                  },
                  {
                    "date": "20260917",
                    "net": 77691.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260923",
                    "net": 379922.0
                  },
                  {
                    "date": "20260922",
                    "net": 114414.0
                  },
                  {
                    "date": "20260921",
                    "net": -38713.0
                  },
                  {
                    "date": "20260918",
                    "net": -77143.0
                  },
                  {
                    "date": "20260917",
                    "net": 38915.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +417,395주 · 동반 양수 1/5일 · 증가 3회"
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
                "targetYield": "+1.5%",
                "targetPrice": "150,900원",
                "historicalHitRate": 0.6847,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.9%",
                "targetPrice": "154,500원",
                "historicalHitRate": 0.3662,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "156,878원",
                "historicalHitRate": 0.2325,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "160,596원",
                "historicalHitRate": 0.1306,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "165,057원",
                "historicalHitRate": 0.0737,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 144,239원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "144,239원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260922",
              "anchorOpen": 137800,
              "anchorClose": 141300,
              "anchorVolumeRatio20d": 0.53,
              "anchorStopPrice": 137800,
              "fallbackStopPrice": 144239,
              "effectiveHardStopPrice": 144239,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 137,800원와 기존 % 손절 144,239원 중 더 높은 144,239원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 137,800원를 기준으로 잡고, 기존 % 손절 144,239원보다 느슨해지지 않게 144,239원로 고정합니다."
            },
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 147213,
              "high": 148700,
              "anchor": 148700,
              "label": "147,213~148,700원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 150900,
                "secondaryResistancePrice": 154500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "151,674원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "153,904원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "156,878원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "160,596원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "165,057원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 144,239원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "144,239원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 150900,
                "secondaryResistancePrice": 154500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "150,900원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "153,904원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "156,878원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "160,596원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "165,057원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 144,239원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "144,239원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 163건)",
                "nearestResistancePrice": 150900,
                "secondaryResistancePrice": 154500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "150,900원",
                    "historicalHitRate": 0.6847,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "154,500원",
                    "historicalHitRate": 0.3662,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "156,878원",
                    "historicalHitRate": 0.2325,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "160,596원",
                    "historicalHitRate": 0.1306,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "165,057원",
                    "historicalHitRate": 0.0737,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 144,239원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "144,239원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 314건)",
                  "hitRate": 0.6847,
                  "ev": 0.383,
                  "sampleCount": 314
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 163건)",
              "sampleCount": 163,
              "ev": -1.2919
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 314건)",
              "hitRate": 0.6847,
              "ev": 0.383,
              "sampleCount": 314
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
              "핵심 Gate 미충족: Q1",
              "매매금지(핵심 Gate 미충족: Q1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "Q1 미충족: 외인 보유율 15.9% (≥25%) · 20일 수익률 +33.7% (≥0%) · 외인 매집 주체 약함",
            "statusReason": "Q1 미충족: 외인 보유율 15.9% (≥25%) · 20일 수익률 +33.7% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 148700.0,
                "vs52wHighPct": 89.57831325301204,
                "vs52wLowPct": 69.55530216647662,
                "dropFrom52wHighPct": 10.421686746987952,
                "ma20GapPct": 8.674998172915297,
                "rsi14": 61.07932807609608,
                "volumeRatio20d": 74.91283595798134,
                "rs20Pct": 33.723021582733814,
                "tradingValueRank": 35.0,
                "marketCapRank": 28.0,
                "marketCapTrillion": 25.1381,
                "per": 0.0,
                "pbr": 0.96,
                "cnsPer": 7.89,
                "foreignRate": 15.89,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 340.8616133227065
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 7.4,
            "signalScore": 7.4,
            "score": 7.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.4,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 72,246→31,268 / 기관 -3,659→61,115 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 143.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,181,000 / 20MA 1,069,600 (110.4% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 57% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 135% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 1.00 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1190000, 전봉 종가 1176000 미달"
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
                "note": "당일 거래대금 순위 8위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 155.8조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-08-20까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 2건 · 손절 없음 (최근: 2026-09-21) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +11.4% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -1.5% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,181,000 / 60MA 1,139,017",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +0.1% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +10.4% (≤+22%) · RSI14 59 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 72,246→31,268 / 기관 -3,659→61,115 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 143.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,181,000 / 20MA 1,069,600 (110.4% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 57% (필요 ≥ 50%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 135% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.00 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1190000, 전봉 종가 1176000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1181000,
            "previousClose": 1134000,
            "dailyChange": 47000,
            "dailyChangePct": 4.14,
            "dailyDirection": "up",
            "entryPriceText": "1,181,000원 (당일 종가 기준)",
            "entryPrice": 1181000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 155.8022,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -1.5% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-08-20까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1190000, 전봉 종가 1176000",
              "latestOpen": 1190000.0,
              "latestClose": 1190000.0,
              "previousClose": 1176000.0
            },
            "toss": {
              "avgStrength": 143.0,
              "note": "토스 공개 체결강도 143.0% / 최근 체결 4분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-09-23T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 4,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 4분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 4,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 4,
              "last30BuySellRatio": 9.9423,
              "last30BuyVolume": 517.0,
              "last30SellVolume": 52.0
            },
            "orderbook": {
              "bidAskRatio": 0.9958,
              "bidTotal": 14867,
              "askTotal": 14930,
              "note": "토스 호가잔량합계 매수 14,867 / 매도 14,930",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A402340/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 42.98, ATR10 5.50%, 일간 표준편차 4.15%, 당일 레인지 3.09%.",
              "metrics": {
                "atrPct10": 5.5,
                "returnStd20": 4.15,
                "todayRangePct": 3.09,
                "vkospi": 42.98
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "55% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,216,430원",
                "historicalHitRate": 0.599,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,240,050원",
                "historicalHitRate": 0.4792,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,161,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.7%",
                "targetPrice": "1,161,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1161000,
              "fallbackStopPrice": 1159742,
              "effectiveHardStopPrice": 1161000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,161,000원와 기존 % 손절 1,159,742원 중 더 높은 1,161,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,161,000원이며, 기존 % 손절 1,159,742원보다 느슨해지지 않게 1,161,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1169190,
              "high": 1181000,
              "anchor": 1181000,
              "label": "1,169,190~1,181,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1199000,
                "retrace33Price": 1186940,
                "retrace50Price": 1190000,
                "nearestResistancePrice": 1189000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "1,202,258원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,216,430원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,228,240원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,161,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.7%",
                    "targetPrice": "1,161,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1199000,
                "retrace33Price": 1186940,
                "retrace50Price": 1190000,
                "nearestResistancePrice": 1189000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "1,202,258원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,216,430원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,161,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.7%",
                    "targetPrice": "1,161,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 246건)",
                "recentHighPrice": 1199000,
                "retrace33Price": 1186940,
                "retrace50Price": 1190000,
                "nearestResistancePrice": 1189000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,216,430원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,240,050원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,161,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.7%",
                    "targetPrice": "1,161,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 246건)",
              "sampleCount": 246,
              "ev": -0.0187
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 384건)",
              "hitRate": 0.599,
              "ev": 0.964,
              "sampleCount": 384
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 +11.4% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 +11.4% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -1.5% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 +0.1% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1181000.0,
                "vs52wHighPct": 50.51325919589392,
                "vs52wLowPct": 510.0206611570248,
                "dropFrom52wHighPct": 49.48674080410607,
                "ma20GapPct": 10.415108451757666,
                "rsi14": 59.34982945490496,
                "volumeRatio20d": 131.9803002048266,
                "rs20Pct": 11.625708884688091,
                "tradingValueRank": 8.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 155.8022,
                "per": 4.76,
                "pbr": 2.84,
                "cnsPer": 3.38,
                "foreignRate": 46.76,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 4.8321402807835305
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 7.4,
            "signalScore": 7.4,
            "score": 7.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.4,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -102,861→125,169 / 기관 -5,814→46,375 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 152.6% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 209,500 / 20MA 193,790 (108.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 94% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 99% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.44 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 209500, 전봉 종가 208750 미달"
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
                "note": "당일 거래대금 순위 30위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 9.7조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-09-10 공매도 과열종목 지정(공매도 거래 금지 적용)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-15~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +17.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -12.5% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 209,500 / 60MA 175,697",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -2.4% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +8.1% (≤+22%) · RSI14 61 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -102,861→125,169 / 기관 -5,814→46,375 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 152.6% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 209,500 / 20MA 193,790 (108.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 94% (필요 ≥ 50%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 99% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.44 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 209500, 전봉 종가 208750 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 209500,
            "previousClose": 203500,
            "dailyChange": 6000,
            "dailyChangePct": 2.95,
            "dailyDirection": "up",
            "entryPriceText": "209,500원 (당일 종가 기준)",
            "entryPrice": 209500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.7378,
            "marketCapRank": 70,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -12.5% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-09-10 공매도 과열종목 지정(공매도 거래 금지 적용)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 209500, 전봉 종가 208750",
              "latestOpen": 209500.0,
              "latestClose": 209500.0,
              "previousClose": 208750.0
            },
            "toss": {
              "avgStrength": 152.6,
              "note": "토스 공개 체결강도 152.6% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-09-23T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 4.0312,
              "last30BuyVolume": 1548.0,
              "last30SellVolume": 384.0
            },
            "orderbook": {
              "bidAskRatio": 0.4439,
              "bidTotal": 30718,
              "askTotal": 69208,
              "note": "토스 호가잔량합계 매수 30,718 / 매도 69,208",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 42.98, ATR10 8.12%, 일간 표준편차 3.51%, 당일 레인지 3.93%.",
              "metrics": {
                "atrPct10": 8.12,
                "returnStd20": 3.51,
                "todayRangePct": 3.93,
                "vkospi": 42.98
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "55% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "215,785원",
                "historicalHitRate": 0.599,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "219,975원",
                "historicalHitRate": 0.4792,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 205,729원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "205,729원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 202000,
              "fallbackStopPrice": 205729,
              "effectiveHardStopPrice": 205729,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 202,000원와 기존 % 손절 205,729원 중 더 높은 205,729원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 202,000원이며, 기존 % 손절 205,729원보다 느슨해지지 않게 205,729원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 207405,
              "high": 209500,
              "anchor": 209500,
              "label": "207,405~209,500원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 239500,
                "retrace33Price": 219400,
                "retrace50Price": 224500,
                "nearestResistancePrice": 210000,
                "secondaryResistancePrice": 229500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "219,400원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+7.2%",
                    "targetPrice": "224,500원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+14.3%",
                    "targetPrice": "239,500원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 205,729원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "205,729원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 239500,
                "retrace33Price": 219400,
                "retrace50Price": 224500,
                "nearestResistancePrice": 210000,
                "secondaryResistancePrice": 229500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "219,400원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+7.2%",
                    "targetPrice": "224,500원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 205,729원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "205,729원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 246건)",
                "recentHighPrice": 239500,
                "retrace33Price": 219400,
                "retrace50Price": 224500,
                "nearestResistancePrice": 210000,
                "secondaryResistancePrice": 229500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "215,785원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "219,975원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 205,729원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "205,729원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 246건)",
              "sampleCount": 246,
              "ev": -0.0187
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 384건)",
              "hitRate": 0.599,
              "ev": 0.964,
              "sampleCount": 384
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
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 최근 5거래일 최저 -2.4% (필요 -3% 이하 급락 1회 이상)",
            "statusReason": "G4 미충족: 최근 5거래일 최저 -2.4% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 209500.0,
                "vs52wHighPct": 74.02826855123675,
                "vs52wLowPct": 695.066413662239,
                "dropFrom52wHighPct": 25.97173144876325,
                "ma20GapPct": 8.106713452706538,
                "rsi14": 60.55649651749558,
                "volumeRatio20d": 70.82319108313536,
                "rs20Pct": 20.81891580161476,
                "tradingValueRank": 30.0,
                "marketCapRank": 70.0,
                "marketCapTrillion": 9.7378,
                "per": 1360.39,
                "pbr": 16.17,
                "cnsPer": 0.0,
                "foreignRate": 8.78,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 50.19229642525339
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "SK이노베이션",
            "code": "096770",
            "strictScore": 7.4,
            "signalScore": 7.4,
            "score": 7.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.4,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 177,352→228,308 / 기관 -62,938→151,614 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 167.0% / 마지막 1시간 192.4% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 148,700 / 20MA 136,830 (108.7% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 168% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.30 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 149200, 전봉 종가 149100 미달"
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
                "note": "당일 거래대금 순위 35위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 25.1조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-09-10까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-15~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +19.0% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -9.7% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 148,700 / 60MA 121,837",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.4% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +8.7% (≤+22%) · RSI14 61 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 177,352→228,308 / 기관 -62,938→151,614 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 167.0% / 마지막 1시간 192.4% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 148,700 / 20MA 136,830 (108.7% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 73% (필요 ≥ 50%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 168% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.30 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 149200, 전봉 종가 149100 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 148700,
            "previousClose": 141300,
            "dailyChange": 7400,
            "dailyChangePct": 5.24,
            "dailyDirection": "up",
            "entryPriceText": "148,700원 (당일 종가 기준)",
            "entryPrice": 148700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 25.1381,
            "marketCapRank": 28,
            "marketCapUniverseCount": 2546,
            "keyPoint": "20일 고점 대비 -9.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-09-10까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 149200, 전봉 종가 149100",
              "latestOpen": 149200.0,
              "latestClose": 149200.0,
              "previousClose": 149100.0
            },
            "toss": {
              "avgStrength": 167.0,
              "note": "토스 공개 체결강도 167.0% / 최근 체결 9분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-09-23T10:59:57Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 9,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 9분 프록시",
              "lastHourAvgStrength": 192.4,
              "lastHourObservedMinutes": 9,
              "last30AvgStrength": 192.4,
              "last30ObservedMinutes": 9,
              "last30BuySellRatio": 1.8534,
              "last30BuyVolume": 1327.0,
              "last30SellVolume": 716.0
            },
            "orderbook": {
              "bidAskRatio": 0.3006,
              "bidTotal": 9705,
              "askTotal": 32283,
              "note": "토스 호가잔량합계 매수 9,705 / 매도 32,283",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A096770/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 42.98, ATR10 6.46%, 일간 표준편차 4.62%, 당일 레인지 6.37%.",
              "metrics": {
                "atrPct10": 6.46,
                "returnStd20": 4.62,
                "todayRangePct": 6.37,
                "vkospi": 42.98
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "55% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "153,161원",
                "historicalHitRate": 0.599,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+3.9%",
                "targetPrice": "154,500원",
                "historicalHitRate": 0.4792,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 146,023원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "146,023원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 142100,
              "fallbackStopPrice": 146023,
              "effectiveHardStopPrice": 146023,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 142,100원와 기존 % 손절 146,023원 중 더 높은 146,023원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 142,100원이며, 기존 % 손절 146,023원보다 느슨해지지 않게 146,023원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 147213,
              "high": 148700,
              "anchor": 148700,
              "label": "147,213~148,700원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 164700,
                "retrace33Price": 153980,
                "retrace50Price": 156700,
                "nearestResistancePrice": 150900,
                "secondaryResistancePrice": 154500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.6%",
                    "targetPrice": "153,980원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "154,500원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+10.8%",
                    "targetPrice": "164,700원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 146,023원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "146,023원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 164700,
                "retrace33Price": 153980,
                "retrace50Price": 156700,
                "nearestResistancePrice": 150900,
                "secondaryResistancePrice": 154500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.6%",
                    "targetPrice": "153,980원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "154,500원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 146,023원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "146,023원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 246건)",
                "recentHighPrice": 164700,
                "retrace33Price": 153980,
                "retrace50Price": 156700,
                "nearestResistancePrice": 150900,
                "secondaryResistancePrice": 154500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "153,161원",
                    "historicalHitRate": 0.599,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "154,500원",
                    "historicalHitRate": 0.4792,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 146,023원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "146,023원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 384건)",
                  "hitRate": 0.599,
                  "ev": 0.964,
                  "sampleCount": 384
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 246건)",
              "sampleCount": 246,
              "ev": -0.0187
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 384건)",
              "hitRate": 0.599,
              "ev": 0.964,
              "sampleCount": 384
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
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 최근 5거래일 최저 -1.4% (필요 -3% 이하 급락 1회 이상)",
            "statusReason": "G4 미충족: 최근 5거래일 최저 -1.4% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 148700.0,
                "vs52wHighPct": 89.57831325301204,
                "vs52wLowPct": 69.55530216647662,
                "dropFrom52wHighPct": 10.421686746987952,
                "ma20GapPct": 8.674998172915297,
                "rsi14": 61.07932807609608,
                "volumeRatio20d": 74.91283595798134,
                "rs20Pct": 33.723021582733814,
                "tradingValueRank": 35.0,
                "marketCapRank": 28.0,
                "marketCapTrillion": 25.1381,
                "per": 0.0,
                "pbr": 0.96,
                "cnsPer": 7.89,
                "foreignRate": 15.89,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 340.8616133227065
              },
              "evaluatedAt": "2026-09-25T15:05:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
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
  "analysisDate": "2026-09-25",
  "pointInTime": true,
  "pointInTimeStatus": "confirmed",
  "analysisSession": "1500",
  "analysisSessionLabel": "3시 분석",
  "sessionSources": [
    "1500"
  ],
  "rescoreMeta": {
    "rescoredRules": {
      "pullback": [
        "D4"
      ],
      "accumulation": [
        "L1"
      ],
      "breakout": [
        "L1"
      ]
    },
    "shortBalanceCodes": [
      "003490",
      "005930",
      "096770",
      "353200",
      "402340"
    ],
    "changedEntries": [
      {
        "strategy": "pullback",
        "code": "005930",
        "name": "삼성전자",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 10.3,
          "signalScore": 10.3,
          "score": 10.3,
          "scoreMax": 13.0,
          "effectiveScoreMax": 12.5,
          "gradeScore": 8.2,
          "grade": "A"
        },
        "after": {
          "strictScore": 11.6,
          "signalScore": 11.6,
          "score": 11.6,
          "scoreMax": 13.0,
          "effectiveScoreMax": 12.5,
          "gradeScore": 9.3,
          "grade": "S"
        }
      },
      {
        "strategy": "accumulation",
        "code": "005930",
        "name": "삼성전자",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 9.6,
          "signalScore": 9.6,
          "score": 9.6,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 6.9,
          "grade": "B"
        },
        "after": {
          "strictScore": 10.4,
          "signalScore": 10.4,
          "score": 10.4,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.4,
          "grade": "A"
        }
      },
      {
        "strategy": "breakout",
        "code": "003490",
        "name": "대한항공",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 4.8,
          "signalScore": 4.8,
          "score": 4.8,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.8,
          "grade": "C"
        },
        "after": {
          "strictScore": 5.7,
          "signalScore": 5.7,
          "score": 5.7,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 4.6,
          "grade": "C"
        }
      }
    ],
    "providerHealth": {
      "krx_pykrx_short_balance": {
        "data_missing": 5
      },
      "krx_short_balance_direct_post": {
        "ok": 5
      }
    },
    "sourcePointInTimeStatus": "confirmed"
  }
};
