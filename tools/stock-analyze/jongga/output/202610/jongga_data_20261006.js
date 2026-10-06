window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-10-06"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-10-06T08:37:48+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "010170",
      "name": "대한광통신",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "009150",
      "name": "삼성전기",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "217590",
      "name": "티엠씨",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "080220",
      "name": "제주반도체",
      "reasons": [
        "투자 주의",
        "공매도 과열"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "069540",
      "name": "빛과전자",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind",
        "toss"
      ],
      "status": "confirmed"
    }
  ],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 21,
      "failed": 0,
      "stale": 0,
      "manual": 3,
      "fallback": 2,
      "slots": 1
    },
    "failedKeys": [
      "news 402340: HTTP Error 410: 410",
      "news 066570: HTTP Error 410: 410",
      "news 006400: HTTP Error 410: 410",
      "news 009150: HTTP Error 410: 410",
      "news 007660: HTTP Error 410: 410",
      "news 010170: HTTP Error 410: 410",
      "news 080220: HTTP Error 410: 410",
      "news 217590: HTTP Error 410: 410",
      "news 403870: HTTP Error 410: 410"
    ],
    "staleKeys": [],
    "manualKeys": [],
    "fallbackKeys": [
      "overtime_price",
      "short_balance_trend"
    ],
    "providerHealth": {
      "naver_mobile": {
        "ok": 21
      },
      "naver_chart": {
        "ok": 21
      },
      "naver_integration_schedule": {
        "ok": 10
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 21
      },
      "toss_http_strength": {
        "ok": 21
      },
      "toss_ticks_strength_proxy": {
        "ok": 21
      },
      "toss_quotes_orderbook": {
        "ok": 21
      },
      "kind_playwright_disclosure": {
        "ok": 10
      },
      "naver_item_news": {
        "ok": 9
      },
      "cnbc_quote": {
        "ok": 1
      },
      "naver_overtime_board": {
        "fallback": 1
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
        "key": "overtime_price",
        "provider": "naver_overtime_board",
        "layer": "session_close",
        "fallbackLevel": 1,
        "confidence": 0.4,
        "stale": false
      },
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
        "durationMs": 1226.8,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 494.6,
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
        "durationMs": 1231.2,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 354.7,
        "detail": "박스권 ⚠️"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 43418.5,
        "count": 21
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 881.2,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "partial",
        "durationMs": 149761.1,
        "detail": "후보 16종목 중 16건 수집 · fallback 16건 (krx_short_balance_direct_post)",
        "count": 16
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 7772.2,
        "detail": "성공 21 / 실패 0",
        "count": 21
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 7997.7,
        "detail": "direct-http · 체결강도 21 / 호가 21 / 틱프록시 21",
        "count": 21
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 64240.0,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 8213.1,
        "detail": "playwright-chromium · KIND 1",
        "count": 1
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
        "durationMs": 85578.8,
        "detail": "확정 5 · 미확인 0",
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
            "value": "6941.39 (-0.89%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 40.26"
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
            "value": "G-A 🟢 (+9.0점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 100% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6746.62",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6894.67",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 40.26",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 10 / 하락 10",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "KOSPI 60/20MA 상향",
            "verdict": "박스권 ⚠️"
          },
          {
            "item": "거시 맥락",
            "value": "표준 레짐 / RI 55.50419702285107",
            "verdict": "⚠️"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20261006",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "박스권 ⚠️",
          "regimeAdjustmentReason": "KOSPI 60/20MA 상향",
          "riseJustified": false,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 76.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 41.89,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 55.50419702285107,
          "stageOverrideReason": "지지력 보정: raw P 58 -> adjusted P 56 · F_support 10점",
          "kospiClose": 6941.39,
          "kospiMa5": 6925.066000000001,
          "vkospiValue": 40.26,
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
            "actualValue": "+2.03%",
            "baseScore": "+2점",
            "weight": "×2.5",
            "formula": "+2 × 2.5 = +5.0점",
            "weightedScore": "+5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+15.45",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+5.6bp",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-11.40원",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+5.68%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+9.0점",
        "grade": "G-A 🟢",
        "code": "G-A",
        "entryAdjustment": "✅ 100% 진입 / ✅ 100% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 손절폭 유지",
        "swingAdjustment": "적극 허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-10-07T03:59:00+00:00",
          "vix": "2026-10-06T20:15:00+00:00",
          "tnx": "2026-10-06T19:00:00+00:00",
          "krw": "2026-10-06T22:59:00+00:00",
          "sox": "2026-10-07T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "LG전자",
            "code": "066570",
            "strictScore": 11.9,
            "signalScore": 11.9,
            "score": 11.9,
            "scoreMax": 13.0,
            "effectiveScoreMax": 12.5,
            "gradeScore": 9.5,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 25,393주 / 기관 80,483주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 231,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 227,000 ≤ 종가 231,500)"
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
                "note": "52주 고가 대비 -50.5% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 186% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -38.2% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "강력매수",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 255% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 217,700 > 20MA 207,855 > 60MA 193,667 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 231,500 / 60MA 193,667",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 61.8 (필요 ≥ 50)",
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
                "note": "KOSPI 6,941 / 5MA 6,925 (+0.2%) · VKOSPI 40.3 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +7.42% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 61.8 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +11.4% (필요 ≤ +25%) · 60MA +19.5% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -50.5% (≥12%) · 거래량 186% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 90점 · 현재가 아래 유효 family 4개",
                "evalStatus": "met"
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
                "note": "마지막 30분 비율 4.59:1 / 마지막 30분 평균 169.5% / 마지막 1시간 169.5% · 장 막판 매수세 유지",
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
                "note": "외인 25,393주 / 기관 80,483주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 231,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 227,000 ≤ 종가 231,500)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -50.5% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 186% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -38.2% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
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
            "currentPrice": 231500,
            "previousClose": 215500,
            "dailyChange": 16000,
            "dailyChangePct": 7.42,
            "dailyDirection": "up",
            "entryPriceText": "231,500원 (당일 종가 기준)",
            "entryPrice": 231500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 37.7078,
            "marketCapRank": 19,
            "marketCapUniverseCount": 2547,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 25,393주 / 기관 80,483주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족",
              "뉴스 수집 실패: HTTP Error 410: 410"
            ],
            "toss": {
              "avgStrength": 159.0,
              "note": "토스 공개 체결강도 159.0% / 최근 체결 15분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A066570/order",
              "asOf": "2026-10-06T08:35:02Z",
              "intradayAbove100Ratio": 57.1,
              "observedMinutes": 15,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 15분 프록시",
              "lastHourAvgStrength": 169.5,
              "lastHourObservedMinutes": 15,
              "last30AvgStrength": 169.5,
              "last30ObservedMinutes": 15,
              "last30BuySellRatio": 4.5857,
              "last30BuyVolume": 963.0,
              "last30SellVolume": 210.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-10-06까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 194,748원 (15.88% 아래) · 강도 90점 · family 4개 · 수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 194748,
                    "distancePct": 15.88,
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
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 90,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 201601,
                    "distancePct": 12.92,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 27,
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 182986,
                    "distancePct": 20.96,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 15,
                    "lastSeenDaysAgo": 35,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 207660,
                    "distancePct": 10.3,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 13,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 213500,
                    "distancePct": 7.78,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 10,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 194748,
                  "distancePct": 15.88,
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
                  "lastSeenDaysAgo": 8,
                  "strengthPoints": 90,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 90,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "수평 지지·스윙로우 군집·매물대 지지 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 151500,
                    "distancePct": 34.56,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 150500,
                    "bandHigh": 152500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 155950,
                    "distancePct": 32.63,
                    "count": 3,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 154100,
                    "bandHigh": 157500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 162450,
                    "distancePct": 29.83,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 162100,
                    "bandHigh": 162800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 167886,
                    "distancePct": 27.48,
                    "count": 5,
                    "lastSeenDaysAgo": 40,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 165500,
                    "bandHigh": 169500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 172367,
                    "distancePct": 25.54,
                    "count": 3,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 171600,
                    "bandHigh": 173200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 177664,
                    "distancePct": 23.26,
                    "count": 9,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 175200,
                    "bandHigh": 179500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 183340,
                    "distancePct": 20.8,
                    "count": 8,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 180900,
                    "bandHigh": 185600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 188950,
                    "distancePct": 18.38,
                    "count": 6,
                    "lastSeenDaysAgo": 27,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 186400,
                    "bandHigh": 191300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 196276,
                    "distancePct": 15.22,
                    "count": 18,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 192600,
                    "bandHigh": 198700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 201175,
                    "distancePct": 13.1,
                    "count": 18,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 199400,
                    "bandHigh": 204000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 206321,
                    "distancePct": 10.88,
                    "count": 12,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 204500,
                    "bandHigh": 209000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 213500,
                    "distancePct": 7.78,
                    "count": 10,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 210000,
                    "bandHigh": 216500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 193700,
                    "distancePct": 16.33,
                    "count": 3,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 192600,
                    "bandHigh": 195100
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 182631,
                    "distancePct": 21.11,
                    "count": 7,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 25,
                    "volume": 10043056,
                    "binIndex": 10,
                    "binLow": 180692,
                    "binHigh": 184571
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 194269,
                    "distancePct": 16.08,
                    "count": 5,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 25,
                    "volume": 8765462,
                    "binIndex": 13,
                    "binLow": 192329,
                    "binHigh": 196208
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 202027,
                    "distancePct": 12.73,
                    "count": 9,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 25,
                    "volume": 7662289,
                    "binIndex": 15,
                    "binLow": 200088,
                    "binHigh": 203967
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 209000,
                    "distancePct": 9.72,
                    "count": 1,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 251.3,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 255% (18일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 254.5,
                "latestBurstDaysAgo": 7
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
                  "summary": "마지막 30분 비율 4.59:1 / 마지막 30분 평균 169.5% / 마지막 1시간 169.5% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 40.26, ATR10 4.56%, 일간 표준편차 3.04%, 당일 레인지 4.18%.",
              "metrics": {
                "atrPct10": 4.56,
                "returnStd20": 3.04,
                "todayRangePct": 4.18,
                "vkospi": 40.26
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
              "ma10Price": 213020,
              "ma10PrevPrice": 209810,
              "ma20Price": 207855,
              "ma20PrevPrice": 206265,
              "ma10WarningPrice": null,
              "hardStopPrice": 225712,
              "fallbackStopPrice": 225712,
              "effectiveStopPrice": 225712,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 225,712원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 225,712원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "236,130원",
                "historicalHitRate": 0.5914,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "238,445원",
                "historicalHitRate": 0.4708,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "241,917원",
                "historicalHitRate": 0.3191,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "245,390원",
                "historicalHitRate": 0.2385,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 225,712원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "225,712원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 229185,
              "high": 231500,
              "anchor": 231500,
              "label": "229,185~231,500원 (종가 ±, 분할매수)"
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
                    "targetPrice": "236,130원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "238,445원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "241,917원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "245,390원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 225,712원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "225,712원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
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
                    "targetPrice": "236,130원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "238,445원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "241,917원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "245,390원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 225,712원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "225,712원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
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
                    "targetPrice": "236,130원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "238,445원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "241,917원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "245,390원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 225,712원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "225,712원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
              "sampleCount": 136,
              "ev": -1.5502
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 257건)",
              "hitRate": 0.5914,
              "ev": 1.13,
              "sampleCount": 257
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "pullback-a7plus-balanced",
              "active": true,
              "stopExecution": "close",
              "stopCondition": "종가 -2% 이탈 시 전량 정리, 장중 -5% 이상 훼손 후 회복 실패 시 50% 축소",
              "stopTiming": "장중 조건은 10:00/14:00 확인 후 부분 축소, 최종 손절은 종가 확인 후",
              "positionWeightMultiplier": 0.5,
              "intradayRiskRule": {
                "active": true,
                "triggerPct": -5.0,
                "action": "50% 축소",
                "timing": "10:00 또는 14:00 확인",
                "recoveryRule": "진입가 대비 -3% 안쪽으로 회복하지 못하면 부분 축소",
                "finalStopRule": "종가 기준 -2% 이탈 시 남은 물량 전량 정리"
              },
              "volatilityOverlay": {
                "active": true,
                "mode": "high-volatility",
                "label": "고변동성 방어",
                "reason": "시장 또는 종목 변동성이 커서 비중을 줄이고 1차 익절을 앞당깁니다.",
                "triggerMetrics": {
                  "blendedState": "volatile",
                  "marketState": "volatile",
                  "stockState": "volatile",
                  "atrPct10": 4.56,
                  "todayRangePct": 4.18,
                  "returnStd20": 3.04,
                  "vkospi": 40.26
                },
                "originalTakeProfitStages": [
                  {
                    "targetPct": 5.0,
                    "quantityPct": 80.0
                  },
                  {
                    "targetPct": 12.0,
                    "quantityPct": 20.0
                  }
                ],
                "adjustedTakeProfitStages": [
                  {
                    "targetPct": 3.0,
                    "quantityPct": 50.0
                  },
                  {
                    "targetPct": 8.0,
                    "quantityPct": 50.0
                  }
                ],
                "positionWeightMultiplier": 0.5
              },
              "label": "눌림목 × 7&A",
              "priority": 2,
              "strategyCase": "pullback",
              "recommendationCase": "a7plus",
              "stopPct": -2.0,
              "takeProfitStages": [
                {
                  "targetPct": 3.0,
                  "quantityPct": 50.0
                },
                {
                  "targetPct": 8.0,
                  "quantityPct": 50.0
                }
              ],
              "positionWeightHint": "half",
              "reason": "눌림목 주력 후보는 5% 익절을 기본으로 하고 일부만 12% 목표를 둡니다. 고변동성 방어로 비중을 50%로 낮추고 1차 익절을 앞당깁니다."
            },
            "entryEligible": true,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "eligible",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 231500.0,
                "vs52wHighPct": 49.518716577540104,
                "vs52wLowPct": 203.01047120418846,
                "dropFrom52wHighPct": 50.48128342245989,
                "ma20GapPct": 11.375718650020447,
                "rsi14": 67.28911867502853,
                "volumeRatio20d": 185.68126561219273,
                "rs20Pct": 15.923885828743115,
                "supportDistancePct": 15.88,
                "tradingValueRank": 22.0,
                "marketCapRank": 19.0,
                "marketCapTrillion": 37.7078,
                "per": 40.07,
                "pbr": 1.55,
                "cnsPer": 18.22,
                "foreignRate": 29.95,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -38.20294254607746
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "대한광통신",
            "code": "010170",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 13.0,
            "effectiveScoreMax": 11.0,
            "gradeScore": 6.5,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 502,949주 / 기관 -55,580주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 18,580 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 18,040 ≤ 종가 18,580)"
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
                "note": "52주 고가 대비 -41.0% (≥12% 만점·8~12% 부분) · 충족"
              },
              {
                "code": "D2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "수급추세 +0 (≥+2 만점·+1 부분) · 미충족"
              },
              {
                "code": "D3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "거래량 90% (≥100% 만점·80~100% 부분) · 부분 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "data_missing",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)"
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
            "statusLabel": "진입 가능(B·조건부)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 379% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 17,448 > 20MA 16,087 > 60MA 13,096 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 18,580 / 60MA 13,096",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 60.9 (필요 ≥ 50)",
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
                "note": "KOSPI 6,941 / 5MA 6,925 (+0.2%) · VKOSPI 40.3 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +4.03% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 60.9 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +15.5% (필요 ≤ +25%) · 60MA +41.9% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -41.0% (≥12%) · 거래량 90% (≥80%) · 수급추세 +0 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 거래량 / 앵커 거래량 29% · 시가 18,040 / 종가 18,580 / 전일 종가 17,860 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 18,580 / 앵커 중심값 15,325 / 복합 지지 17,734 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 6.21:1 / 마지막 30분 평균 300.0% / 마지막 1시간 300.0% · 장 막판 매수세 유지",
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
                "note": "외인 502,949주 / 기관 -55,580주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 18,580 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 18,040 ≤ 종가 18,580)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -41.0% (≥12% 만점·8~12% 부분) · 충족",
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
                "code": "D2",
                "note": "수급추세 +0 (≥+2 만점·+1 부분) · 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "D3",
                "note": "거래량 90% (≥100% 만점·80~100% 부분) · 부분 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 18580,
            "previousClose": 17860,
            "dailyChange": 720,
            "dailyChangePct": 4.03,
            "dailyDirection": "up",
            "entryPriceText": "18,580원 (당일 종가 기준)",
            "entryPrice": 18580,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.8889,
            "marketCapRank": 163,
            "marketCapUniverseCount": 2547,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 502,949주 / 기관 -55,580주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "뉴스 수집 실패: HTTP Error 410: 410",
              "대차잔고 추이 데이터 부족 (대형주만 수집)"
            ],
            "toss": {
              "avgStrength": 115.2,
              "note": "토스 공개 체결강도 115.2% / 최근 체결 5분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A010170/order",
              "asOf": "2026-10-06T08:35:04Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 5,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 5분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 5,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 5,
              "last30BuySellRatio": 6.2088,
              "last30BuyVolume": 8624.0,
              "last30SellVolume": 1389.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-09-18까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 17,734원 (4.55% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 17734,
                    "distancePct": 4.55,
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
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 13294,
                    "distancePct": 28.45,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 21,
                    "lastSeenDaysAgo": 17,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 12145,
                    "distancePct": 34.63,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 6,
                    "lastSeenDaysAgo": 28,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 16207,
                    "distancePct": 12.77,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 14283,
                    "distancePct": 23.13,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 8,
                    "lastSeenDaysAgo": 11,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 17734,
                  "distancePct": 4.55,
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
                    "price": 6950,
                    "distancePct": 62.59,
                    "count": 2,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 6910,
                    "bandHigh": 6990
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 8490,
                    "distancePct": 54.31,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 8450,
                    "bandHigh": 8530
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 9290,
                    "distancePct": 50.0,
                    "count": 2,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 9250,
                    "bandHigh": 9330
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 9530,
                    "distancePct": 48.71,
                    "count": 3,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 9460,
                    "bandHigh": 9580
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 9858,
                    "distancePct": 46.95,
                    "count": 3,
                    "lastSeenDaysAgo": 47,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 9740,
                    "bandHigh": 9920
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 10122,
                    "distancePct": 45.52,
                    "count": 5,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 10050,
                    "bandHigh": 10180
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 10320,
                    "distancePct": 44.46,
                    "count": 3,
                    "lastSeenDaysAgo": 53,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 10300,
                    "bandHigh": 10340
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 10822,
                    "distancePct": 41.75,
                    "count": 4,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 10650,
                    "bandHigh": 10910
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 11062,
                    "distancePct": 40.46,
                    "count": 5,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 11030,
                    "bandHigh": 11090
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 11743,
                    "distancePct": 36.8,
                    "count": 3,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 11680,
                    "bandHigh": 11800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 12095,
                    "distancePct": 34.9,
                    "count": 3,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 12060,
                    "bandHigh": 12130
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 12585,
                    "distancePct": 32.27,
                    "count": 10,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 12400,
                    "bandHigh": 12700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 12936,
                    "distancePct": 30.38,
                    "count": 5,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 12850,
                    "bandHigh": 13020
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 13385,
                    "distancePct": 27.96,
                    "count": 12,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 13150,
                    "bandHigh": 13570
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 13936,
                    "distancePct": 24.99,
                    "count": 8,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 13700,
                    "bandHigh": 14040
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 14266,
                    "distancePct": 23.22,
                    "count": 7,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 14150,
                    "bandHigh": 14380
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 14853,
                    "distancePct": 20.06,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 14740,
                    "bandHigh": 14960
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 16244,
                    "distancePct": 12.57,
                    "count": 5,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 16170,
                    "bandHigh": 16310
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 17203,
                    "distancePct": 7.41,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 16960,
                    "bandHigh": 17410
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 17735,
                    "distancePct": 4.55,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 17470,
                    "bandHigh": 17950
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 18490,
                    "distancePct": 0.48,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 18400,
                    "bandHigh": 18580
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 13202,
                    "distancePct": 28.95,
                    "count": 9,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 25,
                    "volume": 101607829,
                    "binIndex": 12,
                    "binLow": 12950,
                    "binHigh": 13453
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 17732,
                    "distancePct": 4.57,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 89405165,
                    "binIndex": 21,
                    "binLow": 17480,
                    "binHigh": 17983
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 12195,
                    "distancePct": 34.36,
                    "count": 3,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 25,
                    "volume": 73332065,
                    "binIndex": 10,
                    "binLow": 11943,
                    "binHigh": 12447
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 14300,
                    "distancePct": 23.04,
                    "count": 1,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 513.2,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 15560,
                    "distancePct": 16.25,
                    "count": 1,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 209.3,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 16170,
                    "distancePct": 12.97,
                    "count": 1,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 464.4,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 379% (9일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 378.7,
                "latestBurstDaysAgo": 9
              },
              "anchor": {
                "date": "20260916",
                "open": 14420,
                "close": 16230,
                "high": 16500,
                "low": 14300,
                "bodyMid": 15325,
                "volume": 45656543.0,
                "volumeRatio": 5.13,
                "daysAgo": 11
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 29% · 시가 18,040 / 종가 18,580 / 전일 종가 17,860 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 18,580 / 앵커 중심값 15,325 / 복합 지지 17,734 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 6.21:1 / 마지막 30분 평균 300.0% / 마지막 1시간 300.0% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 40.26, ATR10 6.87%, 일간 표준편차 4.77%, 당일 레인지 5.21%.",
              "metrics": {
                "atrPct10": 6.87,
                "returnStd20": 4.77,
                "todayRangePct": 5.21,
                "vkospi": 40.26
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
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260916",
              "anchorOpen": 14420,
              "anchorClose": 16230,
              "anchorHigh": 16500,
              "anchorLow": 14300,
              "anchorBodyMid": 15325,
              "anchorVolumeRatio": 5.13,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 15325,
              "ma10Price": 17653,
              "ma10PrevPrice": 17420,
              "ma20Price": 16087,
              "ma20PrevPrice": 15800,
              "ma10WarningPrice": null,
              "hardStopPrice": 16087,
              "fallbackStopPrice": 18116,
              "effectiveStopPrice": 18116,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 15,325원, 20일선 16,087원) = 16,087원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 18,116원) = 18,116원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 15,325원, 20일선 16,087원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 18,116원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "18,952원",
                "historicalHitRate": 0.5914,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "19,137원",
                "historicalHitRate": 0.4708,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "19,416원",
                "historicalHitRate": 0.3191,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "19,695원",
                "historicalHitRate": 0.2385,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 18,116원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "18,116원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 18394,
              "high": 18580,
              "anchor": 18580,
              "label": "18,394~18,580원 (종가 ±, 분할매수)"
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
                    "targetPrice": "18,952원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "19,137원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "19,416원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "19,695원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 18,116원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "18,116원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
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
                    "targetPrice": "18,952원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "19,137원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "19,416원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "19,695원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 18,116원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "18,116원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
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
                    "targetPrice": "18,952원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "19,137원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "19,416원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "19,695원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 18,116원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "18,116원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
              "sampleCount": 136,
              "ev": -1.5502
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 257건)",
              "hitRate": 0.5914,
              "ev": 1.13,
              "sampleCount": 257
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "pullback-recommendation-balanced",
              "active": true,
              "stopExecution": "close",
              "stopCondition": "종가 -2% 이탈 시 전량 정리, 장중 -5% 이상 훼손 후 회복 실패 시 50% 축소",
              "stopTiming": "장중 조건은 10:00/14:00 확인 후 부분 축소, 최종 손절은 종가 확인 후",
              "positionWeightMultiplier": 0.5,
              "intradayRiskRule": {
                "active": true,
                "triggerPct": -5.0,
                "action": "50% 축소",
                "timing": "10:00 또는 14:00 확인",
                "recoveryRule": "진입가 대비 -3% 안쪽으로 회복하지 못하면 부분 축소",
                "finalStopRule": "종가 기준 -2% 이탈 시 남은 물량 전량 정리"
              },
              "volatilityOverlay": {
                "active": true,
                "mode": "high-volatility",
                "label": "고변동성 방어",
                "reason": "시장 또는 종목 변동성이 커서 비중을 줄이고 1차 익절을 앞당깁니다.",
                "triggerMetrics": {
                  "blendedState": "volatile",
                  "marketState": "volatile",
                  "stockState": "volatile",
                  "atrPct10": 6.87,
                  "todayRangePct": 5.21,
                  "returnStd20": 4.77,
                  "vkospi": 40.26
                },
                "originalTakeProfitStages": [
                  {
                    "targetPct": 5.0,
                    "quantityPct": 100.0
                  }
                ],
                "adjustedTakeProfitStages": [
                  {
                    "targetPct": 3.0,
                    "quantityPct": 50.0
                  },
                  {
                    "targetPct": 8.0,
                    "quantityPct": 50.0
                  }
                ],
                "positionWeightMultiplier": 0.5
              },
              "label": "눌림목 × 매수추천",
              "priority": 4,
              "strategyCase": "pullback",
              "recommendationCase": "recommendation",
              "stopPct": -2.0,
              "takeProfitStages": [
                {
                  "targetPct": 3.0,
                  "quantityPct": 50.0
                },
                {
                  "targetPct": 8.0,
                  "quantityPct": 50.0
                }
              ],
              "positionWeightHint": "very_small",
              "reason": "매수추천 라벨은 보조 가산점으로만 보고 5% 익절을 우선합니다. 고변동성 방어로 비중을 50%로 낮추고 1차 익절을 앞당깁니다."
            },
            "entryEligible": true,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "eligible",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 18580.0,
                "vs52wHighPct": 58.98412698412698,
                "vs52wLowPct": 1360.691823899371,
                "dropFrom52wHighPct": 41.01587301587302,
                "ma20GapPct": 15.496985143283396,
                "rsi14": 69.03741939039497,
                "volumeRatio20d": 90.04057825812187,
                "rs20Pct": 44.59143968871596,
                "supportDistancePct": 4.55,
                "tradingValueRank": 25.0,
                "marketCapRank": 163.0,
                "marketCapTrillion": 2.8889,
                "per": 0.0,
                "pbr": 25.99,
                "cnsPer": 0.0,
                "foreignRate": 3.81,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 9.4,
            "signalScore": 9.4,
            "score": 9.4,
            "scoreMax": 13.0,
            "effectiveScoreMax": 12.5,
            "gradeScore": 7.5,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 125,803주 / 기관 12,819주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,674,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 1,628,000 ≤ 종가 1,674,000)"
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
                "note": "52주 고가 대비 -30.7% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 127% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "대차잔고 +5.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 158% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,573,800 > 20MA 1,448,700 > 60MA 1,368,567 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,674,000 / 60MA 1,368,567",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 67.0 (필요 ≥ 50)",
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
                "note": "KOSPI 6,941 / 5MA 6,925 (+0.2%) · VKOSPI 40.3 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +6.15% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 67.0 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +15.6% (필요 ≤ +25%) · 60MA +22.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -30.7% (≥12%) · 거래량 127% (≥80%) · 수급추세 +4 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "status": "⛔",
                "note": "마지막 30분 비율 0.55:1 / 마지막 30분 평균 169.7% / 마지막 1시간 176.8% · 장 막판 투매 경고",
                "evalStatus": "not_met"
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
                "note": "외인 125,803주 / 기관 12,819주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,674,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,628,000 ≤ 종가 1,674,000)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -30.7% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +4 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 127% (≥100% 만점·80~100% 부분) · 충족",
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
                "note": "대차잔고 +5.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1674000,
            "previousClose": 1577000,
            "dailyChange": 97000,
            "dailyChangePct": 6.15,
            "dailyDirection": "up",
            "entryPriceText": "1,674,000원 (당일 종가 기준)",
            "entryPrice": 1674000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 125.0372,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2547,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 125,803주 / 기관 12,819주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족",
              "뉴스 수집 실패: HTTP Error 410: 410"
            ],
            "toss": {
              "avgStrength": 139.0,
              "note": "토스 공개 체결강도 139.0% / 최근 체결 36분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-10-06T08:35:01Z",
              "intradayAbove100Ratio": 58.1,
              "observedMinutes": 36,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 36분 프록시",
              "lastHourAvgStrength": 176.8,
              "lastHourObservedMinutes": 36,
              "last30AvgStrength": 169.7,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.5538,
              "last30BuyVolume": 144.0,
              "last30SellVolume": 260.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-10-06까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,314,854원 (21.45% 아래) · 강도 90점 · family 3개 · 수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1314854,
                    "distancePct": 21.45,
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
                    "count": 23,
                    "lastSeenDaysAgo": 11,
                    "strengthPoints": 90,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1498708,
                    "distancePct": 10.47,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 13,
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1392316,
                    "distancePct": 16.83,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 27,
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1194700,
                    "distancePct": 28.63,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 7,
                    "lastSeenDaysAgo": 36,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1580500,
                    "distancePct": 5.59,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1314854,
                  "distancePct": 21.45,
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
                  "count": 23,
                  "lastSeenDaysAgo": 11,
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
                    "price": 1026500,
                    "distancePct": 38.68,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1024000,
                    "bandHigh": 1029000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1113000,
                    "distancePct": 33.51,
                    "count": 2,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1112000,
                    "bandHigh": 1114000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1153333,
                    "distancePct": 31.1,
                    "count": 3,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1142000,
                    "bandHigh": 1163000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1192400,
                    "distancePct": 28.77,
                    "count": 5,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1181000,
                    "bandHigh": 1203000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1230000,
                    "distancePct": 26.52,
                    "count": 4,
                    "lastSeenDaysAgo": 27,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1222000,
                    "bandHigh": 1236000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1267364,
                    "distancePct": 24.29,
                    "count": 9,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1250000,
                    "bandHigh": 1278000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1309812,
                    "distancePct": 21.76,
                    "count": 12,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1289000,
                    "bandHigh": 1326000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1343111,
                    "distancePct": 19.77,
                    "count": 16,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1330000,
                    "bandHigh": 1362000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1390050,
                    "distancePct": 16.96,
                    "count": 16,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1369000,
                    "bandHigh": 1410000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1423500,
                    "distancePct": 14.96,
                    "count": 7,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1412000,
                    "bandHigh": 1440000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1462444,
                    "distancePct": 12.64,
                    "count": 8,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1448000,
                    "bandHigh": 1479000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1500333,
                    "distancePct": 10.37,
                    "count": 8,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1489000,
                    "bandHigh": 1514000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1545000,
                    "distancePct": 7.71,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1531000,
                    "bandHigh": 1558000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1580500,
                    "distancePct": 5.59,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1577000,
                    "bandHigh": 1584000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 1197000,
                    "distancePct": 28.49,
                    "count": 2,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 1191000,
                    "bandHigh": 1203000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 1308500,
                    "distancePct": 21.83,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 1305000,
                    "bandHigh": 1312000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1394583,
                    "distancePct": 16.69,
                    "count": 11,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 25,
                    "volume": 7510420,
                    "binIndex": 15,
                    "binLow": 1377500,
                    "binHigh": 1411667
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1326250,
                    "distancePct": 20.77,
                    "count": 9,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 25,
                    "volume": 5394502,
                    "binIndex": 13,
                    "binLow": 1309167,
                    "binHigh": 1343333
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1497083,
                    "distancePct": 10.57,
                    "count": 5,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "volume": 4624754,
                    "binIndex": 18,
                    "binLow": 1480000,
                    "binHigh": 1514167
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 158% (7일 전)",
                "burstCount": 0,
                "maxRatioPct": 158.3,
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
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.55:1 / 마지막 30분 평균 169.7% / 마지막 1시간 176.8% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 40.26, ATR10 5.42%, 일간 표준편차 3.08%, 당일 레인지 4.38%.",
              "metrics": {
                "atrPct10": 5.42,
                "returnStd20": 3.08,
                "todayRangePct": 4.38,
                "vkospi": 40.26
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
              "ma10Price": 1517000,
              "ma10PrevPrice": 1484700,
              "ma20Price": 1448700,
              "ma20PrevPrice": 1432400,
              "ma10WarningPrice": null,
              "hardStopPrice": 1632150,
              "fallbackStopPrice": 1632150,
              "effectiveStopPrice": 1632150,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 1,632,150원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 1,632,150원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,707,480원",
                "historicalHitRate": 0.5914,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,724,220원",
                "historicalHitRate": 0.4708,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,749,330원",
                "historicalHitRate": 0.3191,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,774,440원",
                "historicalHitRate": 0.2385,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,632,150원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,632,150원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1657260,
              "high": 1674000,
              "anchor": 1674000,
              "label": "1,657,260~1,674,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "1,707,480원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,724,220원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,749,330원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,774,440원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,632,150원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,632,150원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
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
                    "targetPrice": "1,707,480원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,724,220원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,749,330원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,774,440원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,632,150원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,632,150원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
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
                    "targetPrice": "1,707,480원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,724,220원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,749,330원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,774,440원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,632,150원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,632,150원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
              "sampleCount": 136,
              "ev": -1.5502
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 257건)",
              "hitRate": 0.5914,
              "ev": 1.13,
              "sampleCount": 257
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
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G0, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 158% (필요 ≥ 200%) · 외 1건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 158% (필요 ≥ 200%) / G12 미충족: 마지막 30분 비율 0.55:1 / 마지막 30분 평균 169.7% / 마지막 1시간 176.8% · 장 막판 투매 경고",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1674000.0,
                "vs52wHighPct": 69.2594124948283,
                "vs52wLowPct": 757.1428571428571,
                "dropFrom52wHighPct": 30.740587505171703,
                "ma20GapPct": 15.551874094015325,
                "rsi14": 68.2224240100237,
                "volumeRatio20d": 127.23426021050577,
                "rs20Pct": 24.183976261127597,
                "supportDistancePct": 21.45,
                "tradingValueRank": 6.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 125.0372,
                "per": 128.93,
                "pbr": 12.36,
                "cnsPer": 82.91,
                "foreignRate": 37.76,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": 5.13018222941887
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "이수페타시스",
            "code": "007660",
            "strictScore": 9.4,
            "signalScore": 9.4,
            "score": 9.4,
            "scoreMax": 13.0,
            "effectiveScoreMax": 12.5,
            "gradeScore": 7.5,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -83,670주 / 기관 13,393주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 131,800 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 127,500 ≤ 종가 131,800)"
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
                "note": "52주 고가 대비 -20.1% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 199% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "대차잔고 +8.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족"
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
            "statusLabel": "매수추천",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 339% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 122,200 > 20MA 113,135 > 60MA 100,062 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 131,800 / 60MA 100,062",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 58.4 (필요 ≥ 50)",
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
                "note": "KOSPI 6,936 / 5MA 6,924 (+0.2%) · VKOSPI 40.4 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +8.03% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 58.4 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +16.5% (필요 ≤ +25%) · 60MA +31.7% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -20.1% (≥12%) · 거래량 199% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 85점 · 현재가 아래 유효 family 4개",
                "evalStatus": "met"
              },
              {
                "code": "G10",
                "status": "✅",
                "note": "당일 거래량 / 앵커 거래량 108% · 시가 127,500 / 종가 131,800 / 전일 종가 122,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 131,800 / 앵커 중심값 107,700 / 복합 지지 104,112 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 2.58:1 / 마지막 30분 평균 190.8% / 마지막 1시간 190.8% · 장 막판 매수세 유지",
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
                "note": "외인 -83,670주 / 기관 13,393주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 131,800 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 127,500 ≤ 종가 131,800)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -20.1% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 199% (≥100% 만점·80~100% 부분) · 충족",
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
                "note": "대차잔고 +8.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 131800,
            "previousClose": 122000,
            "dailyChange": 9800,
            "dailyChangePct": 8.03,
            "dailyDirection": "up",
            "entryPriceText": "131,800원 (당일 종가 기준)",
            "entryPrice": 131800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.6753,
            "marketCapRank": 72,
            "marketCapUniverseCount": 2547,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -83,670주 / 기관 13,393주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "뉴스 수집 실패: HTTP Error 410: 410"
            ],
            "toss": {
              "avgStrength": 129.0,
              "note": "토스 공개 체결강도 129.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A007660/order",
              "asOf": "2026-10-06T06:05:32Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 190.8,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 190.8,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.5817,
              "last30BuyVolume": 3160.0,
              "last30SellVolume": 1224.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-10-06까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 104,112원 (21.01% 아래) · 강도 85점 · family 4개 · 급증봉 저점·수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 104112,
                    "distancePct": 21.01,
                    "families": [
                      "eventAnchors",
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 3,
                    "count": 14,
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 98187,
                    "distancePct": 25.5,
                    "families": [
                      "eventAnchors",
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 3,
                    "count": 10,
                    "lastSeenDaysAgo": 9,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 110737,
                    "distancePct": 15.98,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 25,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 100718,
                    "distancePct": 23.58,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 10,
                    "lastSeenDaysAgo": 28,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 122400,
                    "distancePct": 7.13,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 104112,
                  "distancePct": 21.01,
                  "families": [
                    "eventAnchors",
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "급증봉 저점",
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 3,
                  "count": 14,
                  "lastSeenDaysAgo": 8,
                  "strengthPoints": 85,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 85,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "급증봉 저점·수평 지지·매물대 지지 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 59600,
                    "distancePct": 54.78,
                    "count": 2,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 59200,
                    "bandHigh": 60000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 71067,
                    "distancePct": 46.08,
                    "count": 2,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 70800,
                    "bandHigh": 71400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 74500,
                    "distancePct": 43.47,
                    "count": 2,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 74500,
                    "bandHigh": 74500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 80100,
                    "distancePct": 39.23,
                    "count": 3,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 79600,
                    "bandHigh": 80700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 82767,
                    "distancePct": 37.2,
                    "count": 6,
                    "lastSeenDaysAgo": 37,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 81500,
                    "bandHigh": 83500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 84900,
                    "distancePct": 35.58,
                    "count": 4,
                    "lastSeenDaysAgo": 40,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 84100,
                    "bandHigh": 85800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 87243,
                    "distancePct": 33.81,
                    "count": 4,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 86300,
                    "bandHigh": 87800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 89525,
                    "distancePct": 32.08,
                    "count": 4,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 88600,
                    "bandHigh": 90100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 92250,
                    "distancePct": 30.01,
                    "count": 6,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 91100,
                    "bandHigh": 93400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 95050,
                    "distancePct": 27.88,
                    "count": 4,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 94100,
                    "bandHigh": 95600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 98012,
                    "distancePct": 25.64,
                    "count": 7,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 96800,
                    "bandHigh": 99300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 100280,
                    "distancePct": 23.92,
                    "count": 4,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 99600,
                    "bandHigh": 101300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 103075,
                    "distancePct": 21.79,
                    "count": 8,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 102000,
                    "bandHigh": 104400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 106257,
                    "distancePct": 19.38,
                    "count": 12,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 104900,
                    "bandHigh": 107700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 110705,
                    "distancePct": 16.01,
                    "count": 15,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 108200,
                    "bandHigh": 112300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 113450,
                    "distancePct": 13.92,
                    "count": 8,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 112800,
                    "bandHigh": 114100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 119067,
                    "distancePct": 9.66,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 119000,
                    "bandHigh": 119200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 122400,
                    "distancePct": 7.13,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 122000,
                    "bandHigh": 122800
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 97950,
                    "distancePct": 25.68,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 97300,
                    "bandHigh": 98600
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 101156,
                    "distancePct": 23.25,
                    "count": 6,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 25,
                    "volume": 5835189,
                    "binIndex": 13,
                    "binLow": 99554,
                    "binHigh": 102758
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 104360,
                    "distancePct": 20.82,
                    "count": 5,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 25,
                    "volume": 5559336,
                    "binIndex": 14,
                    "binLow": 102758,
                    "binHigh": 105962
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 110769,
                    "distancePct": 15.96,
                    "count": 10,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 25,
                    "volume": 5414879,
                    "binIndex": 16,
                    "binLow": 109167,
                    "binHigh": 112371
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 98600,
                    "distancePct": 25.19,
                    "count": 1,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 463.4,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 104900,
                    "distancePct": 20.41,
                    "count": 1,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 213.9,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 339% (9일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 339.3,
                "latestBurstDaysAgo": 9
              },
              "anchor": {
                "date": "20260921",
                "open": 105000,
                "close": 110400,
                "high": 111500,
                "low": 104900,
                "bodyMid": 107700,
                "volume": 1241862.0,
                "volumeRatio": 2.14,
                "daysAgo": 8
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 108% · 시가 127,500 / 종가 131,800 / 전일 종가 122,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 131,800 / 앵커 중심값 107,700 / 복합 지지 104,112 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 2.58:1 / 마지막 30분 평균 190.8% / 마지막 1시간 190.8% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 40.39, ATR10 7.10%, 일간 표준편차 4.07%, 당일 레인지 6.48%.",
              "metrics": {
                "atrPct10": 7.1,
                "returnStd20": 4.07,
                "todayRangePct": 6.48,
                "vkospi": 40.39
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
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260921",
              "anchorOpen": 105000,
              "anchorClose": 110400,
              "anchorHigh": 111500,
              "anchorLow": 104900,
              "anchorBodyMid": 107700,
              "anchorVolumeRatio": 2.14,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 107700,
              "ma10Price": 116850,
              "ma10PrevPrice": 114370,
              "ma20Price": 113135,
              "ma20PrevPrice": 111845,
              "ma10WarningPrice": null,
              "hardStopPrice": 113135,
              "fallbackStopPrice": 128505,
              "effectiveStopPrice": 128505,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 107,700원, 20일선 113,135원) = 113,135원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 128,505원) = 128,505원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 107,700원, 20일선 113,135원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 128,505원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "134,436원",
                "historicalHitRate": 0.5914,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "135,754원",
                "historicalHitRate": 0.4708,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "137,731원",
                "historicalHitRate": 0.3191,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "139,708원",
                "historicalHitRate": 0.2385,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 128,505원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "128,505원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 130482,
              "high": 131800,
              "anchor": 131800,
              "label": "130,482~131,800원 (종가 ±, 분할매수)"
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
                    "targetPrice": "134,436원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "135,754원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "137,731원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "139,708원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 128,505원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "128,505원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
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
                    "targetPrice": "134,436원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "135,754원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "137,731원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "139,708원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 128,505원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "128,505원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
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
                    "targetPrice": "134,436원",
                    "historicalHitRate": 0.5914,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "135,754원",
                    "historicalHitRate": 0.4708,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "137,731원",
                    "historicalHitRate": 0.3191,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "139,708원",
                    "historicalHitRate": 0.2385,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 128,505원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "128,505원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 257건)",
                  "hitRate": 0.5914,
                  "ev": 1.13,
                  "sampleCount": 257
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
              "sampleCount": 136,
              "ev": -1.5502
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 257건)",
              "hitRate": 0.5914,
              "ev": 1.13,
              "sampleCount": 257
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "pullback-a7plus-balanced",
              "active": true,
              "stopExecution": "close",
              "stopCondition": "종가 -2% 이탈 시 전량 정리, 장중 -5% 이상 훼손 후 회복 실패 시 50% 축소",
              "stopTiming": "장중 조건은 10:00/14:00 확인 후 부분 축소, 최종 손절은 종가 확인 후",
              "positionWeightMultiplier": 0.5,
              "intradayRiskRule": {
                "active": true,
                "triggerPct": -5.0,
                "action": "50% 축소",
                "timing": "10:00 또는 14:00 확인",
                "recoveryRule": "진입가 대비 -3% 안쪽으로 회복하지 못하면 부분 축소",
                "finalStopRule": "종가 기준 -2% 이탈 시 남은 물량 전량 정리"
              },
              "volatilityOverlay": {
                "active": true,
                "mode": "high-volatility",
                "label": "고변동성 방어",
                "reason": "시장 또는 종목 변동성이 커서 비중을 줄이고 1차 익절을 앞당깁니다.",
                "triggerMetrics": {
                  "blendedState": "volatile",
                  "marketState": "volatile",
                  "stockState": "volatile",
                  "atrPct10": 7.1,
                  "todayRangePct": 6.48,
                  "returnStd20": 4.07,
                  "vkospi": 40.39
                },
                "originalTakeProfitStages": [
                  {
                    "targetPct": 5.0,
                    "quantityPct": 80.0
                  },
                  {
                    "targetPct": 12.0,
                    "quantityPct": 20.0
                  }
                ],
                "adjustedTakeProfitStages": [
                  {
                    "targetPct": 3.0,
                    "quantityPct": 50.0
                  },
                  {
                    "targetPct": 8.0,
                    "quantityPct": 50.0
                  }
                ],
                "positionWeightMultiplier": 0.5
              },
              "label": "눌림목 × 7&A",
              "priority": 2,
              "strategyCase": "pullback",
              "recommendationCase": "a7plus",
              "stopPct": -2.0,
              "takeProfitStages": [
                {
                  "targetPct": 3.0,
                  "quantityPct": 50.0
                },
                {
                  "targetPct": 8.0,
                  "quantityPct": 50.0
                }
              ],
              "positionWeightHint": "half",
              "reason": "눌림목 주력 후보는 5% 익절을 기본으로 하고 일부만 12% 목표를 둡니다. 고변동성 방어로 비중을 50%로 낮추고 1차 익절을 앞당깁니다."
            },
            "entryEligible": true,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "eligible",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 131800.0,
                "vs52wHighPct": 79.87878787878788,
                "vs52wLowPct": 128.42287694974004,
                "dropFrom52wHighPct": 20.12121212121212,
                "ma20GapPct": 16.49798912803288,
                "rsi14": 67.3293268987425,
                "volumeRatio20d": 199.3368592865331,
                "rs20Pct": 24.339622641509433,
                "supportDistancePct": 21.01,
                "tradingValueRank": 30.0,
                "marketCapRank": 72.0,
                "marketCapTrillion": 9.6753,
                "per": 48.14,
                "pbr": 11.26,
                "cnsPer": 35.14,
                "foreignRate": 15.72,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 8.83389998423885
              },
              "evaluatedAt": "2026-10-06T15:06:58+09:00",
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
            "name": "티엠씨",
            "code": "217590",
            "strictScore": 5.7,
            "signalScore": 5.7,
            "score": 5.7,
            "scoreMax": 12.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 5.0,
            "grade": "C",
            "overnightGapPenalty": 0.0,
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
                "note": "외인 451,069주 / 기관 72,766주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 88.7% / 100% 유지 12.5% (필요 ≥110%·≥70%)"
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
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 481% · 폭발적 급증 (≥300%)"
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
                "note": "몸통 49% / 윗꼬리·몸통 0.45 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 3.42 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G2)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +38.0% / 20일 초과 +85.1%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 49.6% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 32",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 481% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 49% / 윗꼬리·몸통 0.45 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +4.07% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 19,190 / 5MA 15,864 (전일 5MA 14,792) · 5MA 위·우상향",
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
                "note": "외인 451,069주 / 기관 72,766주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 98.1% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 481% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.1% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 3.42 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 88.7% / 100% 유지 12.5% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 49% / 윗꼬리·몸통 0.45 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 19190,
            "previousClose": 18440,
            "dailyChange": 750,
            "dailyChangePct": 4.07,
            "dailyDirection": "up",
            "entryPriceText": "19,190원 (당일 종가 기준)",
            "entryPrice": 19190,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.4624,
            "marketCapRank": 520,
            "marketCapUniverseCount": 2547,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 451,069주 / 기관 72,766주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 88.7,
              "note": "토스 공개 체결강도 88.7% / 최근 체결 8분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A217590/order",
              "asOf": "2026-10-06T08:35:04Z",
              "intradayAbove100Ratio": 12.5,
              "observedMinutes": 8,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 8분 프록시",
              "lastHourAvgStrength": 60.2,
              "lastHourObservedMinutes": 8,
              "last30AvgStrength": 60.2,
              "last30ObservedMinutes": 8,
              "last30BuySellRatio": 0.3151,
              "last30BuyVolume": 2586.0,
              "last30SellVolume": 8207.0
            },
            "orderbook": {
              "bidAskRatio": 3.4245,
              "bidTotal": 25119,
              "askTotal": 7335,
              "note": "토스 호가잔량합계 매수 25,119 / 매도 7,335",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A217590/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 40.26, ATR10 8.41%, 일간 표준편차 8.00%, 당일 레인지 9.22%.",
              "metrics": {
                "atrPct10": 8.41,
                "returnStd20": 8.0,
                "todayRangePct": 9.22,
                "vkospi": 40.26
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
              "referencePrice": 18440,
              "referenceBandLow": 18440,
              "referenceBandHigh": 18440,
              "entryDayOpenPrice": 18350,
              "fallbackStopPrice": 18422,
              "effectiveHardStopPrice": 18440,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 18,440원와 기존 % 손절 18,422원 중 더 높은 18,440원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 18,440원이며, 기존 % 손절 18,422원보다 느슨해지지 않게 18,440원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.2%",
                "targetPrice": "19,220원",
                "historicalHitRate": 0.6398,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "19,570원",
                "historicalHitRate": 0.3913,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "20,725원",
                "historicalHitRate": 0.2671,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "21,301원",
                "historicalHitRate": 0.2174,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "21,877원",
                "historicalHitRate": 0.1486,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 18,440원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.9%",
                "targetPrice": "18,440원"
              }
            ],
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 18998,
              "high": 19190,
              "anchor": 19190,
              "label": "18,998~19,190원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 19220,
                "secondaryResistancePrice": 19570,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "19,766원",
                    "historicalHitRate": 0.6398,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "20,150원",
                    "historicalHitRate": 0.3913,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "20,725원",
                    "historicalHitRate": 0.2671,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "21,301원",
                    "historicalHitRate": 0.2174,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "21,877원",
                    "historicalHitRate": 0.1486,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 18,440원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.9%",
                    "targetPrice": "18,440원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 148건)",
                  "hitRate": 0.1486,
                  "ev": 1.056,
                  "sampleCount": 148
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 19220,
                "secondaryResistancePrice": 19570,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "19,220원",
                    "historicalHitRate": 0.6398,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "19,570원",
                    "historicalHitRate": 0.3913,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "20,725원",
                    "historicalHitRate": 0.2671,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "21,301원",
                    "historicalHitRate": 0.2174,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "21,877원",
                    "historicalHitRate": 0.1486,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 18,440원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.9%",
                    "targetPrice": "18,440원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 148건)",
                  "hitRate": 0.1486,
                  "ev": 1.056,
                  "sampleCount": 148
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 65건)",
                "nearestResistancePrice": 19220,
                "secondaryResistancePrice": 19570,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "19,220원",
                    "historicalHitRate": 0.6398,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "19,570원",
                    "historicalHitRate": 0.3913,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "20,725원",
                    "historicalHitRate": 0.2671,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "21,301원",
                    "historicalHitRate": 0.2174,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "21,877원",
                    "historicalHitRate": 0.1486,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 18,440원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.9%",
                    "targetPrice": "18,440원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 148건)",
                  "hitRate": 0.1486,
                  "ev": 1.056,
                  "sampleCount": 148
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 65건)",
              "sampleCount": 65,
              "ev": -1.7914
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 148건)",
              "hitRate": 0.1486,
              "ev": 1.056,
              "sampleCount": 148
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
              "핵심 Gate 미충족: G2",
              "매매금지(핵심 Gate 미충족: G2)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 52주 고가 대비 49.6% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 49.6% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 19190.0,
                "vs52wHighPct": 49.58656330749354,
                "vs52wLowPct": 117.57369614512471,
                "dropFrom52wHighPct": 50.413436692506465,
                "ma20GapPct": 42.359050445103854,
                "rsi14": 77.84688242868118,
                "volumeRatio20d": 481.4013965960749,
                "rs20Pct": 90.56603773584906,
                "tradingValueRank": 32.0,
                "marketCapRank": 520.0,
                "marketCapTrillion": 0.4624,
                "per": 231.2,
                "pbr": 4.03,
                "cnsPer": 0.0,
                "foreignRate": 6.33,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "LG전자",
            "code": "066570",
            "strictScore": 9.9,
            "signalScore": 9.9,
            "score": 9.9,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 7.1,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 25,393주 / 기관 80,483주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +25,393 / 전일 -130,610 · 기관 당일 +80,483 / 전일 +132,125 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 169.5% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 159.0% / 마지막 1시간 169.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +299,931주 · 양수 5/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 111.4% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 217,700 / 20MA 207,855 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 214% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 +7.42% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -0.25% / KOSPI -0.89% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 4.59:1 · 평균 체결강도 169.5% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -38.2% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G4)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -130,610/당일 +25,393 · 기관 전일 +132,125/당일 +80,483 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 231,500 / 60MA 193,667",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 49.5% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 22",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 186% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 29.9% (≥25%) · 20일 수익률 +15.9% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,941 / 5MA 6,925 (+0.2%) · VKOSPI 40.3 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 25,393주 / 기관 80,483주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +25,393 / 전일 -130,610 · 기관 당일 +80,483 / 전일 +132,125 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 169.5% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 159.0% / 마지막 1시간 169.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +299,931주 · 양수 5/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 217,700 / 20MA 207,855 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -0.25% / KOSPI -0.89% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 4.59:1 · 평균 체결강도 169.5% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -38.2% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 111.4% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 214% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +7.42% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 231500,
            "previousClose": 215500,
            "dailyChange": 16000,
            "dailyChangePct": 7.42,
            "dailyDirection": "up",
            "entryPriceText": "231,500원 (당일 종가 기준)",
            "entryPrice": 231500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 37.7078,
            "marketCapRank": 19,
            "marketCapUniverseCount": 2547,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 25,393주 / 기관 80,483주 / 마지막 1시간 169.5% · 장후반 매수세 강화 · 마지막 30분 틱 4.59:1. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 159.0,
              "note": "토스 공개 체결강도 159.0% / 최근 체결 15분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A066570/order",
              "asOf": "2026-10-06T08:35:02Z",
              "intradayAbove100Ratio": 57.1,
              "observedMinutes": 15,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 15분 프록시",
              "lastHourAvgStrength": 169.5,
              "lastHourObservedMinutes": 15,
              "last30AvgStrength": 169.5,
              "last30ObservedMinutes": 15,
              "last30BuySellRatio": 4.5857,
              "last30BuyVolume": 963.0,
              "last30SellVolume": 210.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 40.26, ATR10 4.56%, 일간 표준편차 3.04%, 당일 레인지 4.18%.",
              "metrics": {
                "atrPct10": 4.56,
                "returnStd20": 3.04,
                "todayRangePct": 4.18,
                "vkospi": 40.26
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 299931.0,
              "positiveDays": 5,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20261002",
                    "net": 25393.0
                  },
                  {
                    "date": "20261001",
                    "net": -130610.0
                  },
                  {
                    "date": "20260930",
                    "net": 14530.0
                  },
                  {
                    "date": "20260929",
                    "net": 71247.0
                  },
                  {
                    "date": "20260928",
                    "net": 179347.0
                  }
                ],
                "institution": [
                  {
                    "date": "20261002",
                    "net": 80483.0
                  },
                  {
                    "date": "20261001",
                    "net": 132125.0
                  },
                  {
                    "date": "20260930",
                    "net": 56817.0
                  },
                  {
                    "date": "20260929",
                    "net": 12640.0
                  },
                  {
                    "date": "20260928",
                    "net": 17866.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20261002",
                    "net": 80483.0
                  },
                  {
                    "date": "20261001",
                    "net": 132125.0
                  },
                  {
                    "date": "20260930",
                    "net": 56817.0
                  },
                  {
                    "date": "20260929",
                    "net": 12640.0
                  },
                  {
                    "date": "20260928",
                    "net": 17866.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +299,931주 · 양수 5/5일 · 증가 2회"
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
                "targetPrice": "235,000원",
                "historicalHitRate": 0.6911,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "+3.5% 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "239,602원",
                "historicalHitRate": 0.37,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "244,232원",
                "historicalHitRate": 0.2324,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "250,020원",
                "historicalHitRate": 0.1346,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "256,965원",
                "historicalHitRate": 0.0705,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 224,555원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "224,555원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20261002",
              "anchorOpen": 211500,
              "anchorClose": 215500,
              "anchorVolumeRatio20d": 0.6,
              "anchorStopPrice": 211500,
              "fallbackStopPrice": 224555,
              "effectiveHardStopPrice": 224555,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 211,500원와 기존 % 손절 224,555원 중 더 높은 224,555원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-A 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 211,500원를 기준으로 잡고, 기존 % 손절 224,555원보다 느슨해지지 않게 224,555원로 고정합니다."
            },
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 229185,
              "high": 231500,
              "anchor": 231500,
              "label": "229,185~231,500원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 235000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "236,130원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "239,602원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "244,232원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "250,020원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "256,965원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 224,555원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "224,555원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 235000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "235,000원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "239,602원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "244,232원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "250,020원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "256,965원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 224,555원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "224,555원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
                "nearestResistancePrice": 235000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "235,000원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "239,602원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "244,232원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "250,020원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "256,965원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 224,555원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "224,555원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
              "sampleCount": 172,
              "ev": -1.1827
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 327건)",
              "hitRate": 0.6911,
              "ev": 0.371,
              "sampleCount": 327
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
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 186% (필요 < 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 186% (필요 < 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 231500.0,
                "vs52wHighPct": 49.518716577540104,
                "vs52wLowPct": 203.01047120418846,
                "dropFrom52wHighPct": 50.48128342245989,
                "ma20GapPct": 11.375718650020447,
                "rsi14": 67.28911867502853,
                "volumeRatio20d": 185.68126561219273,
                "rs20Pct": 15.923885828743115,
                "tradingValueRank": 22.0,
                "marketCapRank": 19.0,
                "marketCapTrillion": 37.7078,
                "per": 40.07,
                "pbr": 1.55,
                "cnsPer": 18.22,
                "foreignRate": 29.95,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -38.20294254607746
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "제주반도체",
            "code": "080220",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 14.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 6.6,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 148,500주 / 기관 138,201주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +148,500 / 전일 +377,366 · 기관 당일 +138,201 / 전일 +255,475 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 187.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 83.5% / 마지막 1시간 187.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +954,312주 · 동반 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 121.2% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 86,360 / 20MA 77,080 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 95% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +0.65% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +4.06% / KOSPI -0.89% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.49:1 · 평균 체결강도 187.1% (필요 ≥ 1.1:1)"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G4, Q1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +377,366/당일 +148,500 · 기관 전일 +255,475/당일 +138,201 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 93,400 / 60MA 76,113",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 67.7% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 29",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 156% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 2.1% (≥25%) · 20일 수익률 +35.8% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,941 / 5MA 6,925 (+0.2%) · VKOSPI 40.3 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 148,500주 / 기관 138,201주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +148,500 / 전일 +377,366 · 기관 당일 +138,201 / 전일 +255,475 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 187.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 83.5% / 마지막 1시간 187.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +954,312주 · 동반 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 86,360 / 20MA 77,080 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +0.65% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +4.06% / KOSPI -0.89% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 121.2% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 95% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.49:1 · 평균 체결강도 187.1% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 93400,
            "previousClose": 92800,
            "dailyChange": 600,
            "dailyChangePct": 0.65,
            "dailyDirection": "up",
            "entryPriceText": "93,400원 (당일 종가 기준)",
            "entryPrice": 93400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.217,
            "marketCapRank": 146,
            "marketCapUniverseCount": 2547,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 148,500주 / 기관 138,201주 / 마지막 1시간 187.1% · 장후반 매수세 강화 · 마지막 30분 틱 0.49:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 83.5,
              "note": "토스 공개 체결강도 83.5% / 최근 체결 10분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A080220/order",
              "asOf": "2026-10-06T08:35:04Z",
              "intradayAbove100Ratio": 70.0,
              "observedMinutes": 10,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 10분 프록시",
              "lastHourAvgStrength": 187.1,
              "lastHourObservedMinutes": 10,
              "last30AvgStrength": 187.1,
              "last30ObservedMinutes": 10,
              "last30BuySellRatio": 0.4914,
              "last30BuyVolume": 1375.0,
              "last30SellVolume": 2798.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 40.26, ATR10 6.62%, 일간 표준편차 4.24%, 당일 레인지 5.28%.",
              "metrics": {
                "atrPct10": 6.62,
                "returnStd20": 4.24,
                "todayRangePct": 5.28,
                "vkospi": 40.26
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 954312.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20261002",
                    "net": 148500.0
                  },
                  {
                    "date": "20261001",
                    "net": 377366.0
                  },
                  {
                    "date": "20260930",
                    "net": 28988.0
                  },
                  {
                    "date": "20260929",
                    "net": -50.0
                  },
                  {
                    "date": "20260928",
                    "net": 5923.0
                  }
                ],
                "institution": [
                  {
                    "date": "20261002",
                    "net": 138201.0
                  },
                  {
                    "date": "20261001",
                    "net": 255475.0
                  },
                  {
                    "date": "20260930",
                    "net": 17198.0
                  },
                  {
                    "date": "20260929",
                    "net": 3949.0
                  },
                  {
                    "date": "20260928",
                    "net": -21238.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20261002",
                    "net": 286701.0
                  },
                  {
                    "date": "20261001",
                    "net": 632841.0
                  },
                  {
                    "date": "20260930",
                    "net": 46186.0
                  },
                  {
                    "date": "20260929",
                    "net": 3899.0
                  },
                  {
                    "date": "20260928",
                    "net": -15315.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +954,312주 · 동반 양수 3/5일 · 증가 3회"
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
                "targetYield": "+1.0%",
                "targetPrice": "94,300원",
                "historicalHitRate": 0.6911,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "+3.5% 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "96,669원",
                "historicalHitRate": 0.37,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "98,537원",
                "historicalHitRate": 0.2324,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "100,872원",
                "historicalHitRate": 0.1346,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "103,674원",
                "historicalHitRate": 0.0705,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 90,598원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "90,598원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20261002",
              "anchorOpen": 88800,
              "anchorClose": 92800,
              "anchorVolumeRatio20d": 3.83,
              "anchorStopPrice": 88800,
              "fallbackStopPrice": 90598,
              "effectiveHardStopPrice": 90598,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 88,800원와 기존 % 손절 90,598원 중 더 높은 90,598원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-A 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 88,800원를 기준으로 잡고, 기존 % 손절 90,598원보다 느슨해지지 않게 90,598원로 고정합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 92466,
              "high": 93400,
              "anchor": 93400,
              "label": "92,466~93,400원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 94300,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "95,268원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "96,669원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "98,537원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "100,872원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "103,674원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 90,598원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "90,598원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 94300,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "94,300원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "96,669원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "98,537원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "100,872원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "103,674원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 90,598원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "90,598원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
                "nearestResistancePrice": 94300,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "94,300원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "96,669원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "98,537원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "100,872원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "103,674원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 90,598원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "90,598원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
              "sampleCount": 172,
              "ev": -1.1827
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 327건)",
              "hitRate": 0.6911,
              "ev": 0.371,
              "sampleCount": 327
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
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지(핵심 Gate 미충족: G4, Q1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 156% (필요 < 150%) · 외 1건",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 156% (필요 < 150%) / Q1 미충족: 외인 보유율 2.1% (≥25%) · 20일 수익률 +35.8% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 93400.0,
                "vs52wHighPct": 67.68115942028986,
                "vs52wLowPct": 434.32494279176194,
                "dropFrom52wHighPct": 32.31884057971015,
                "ma20GapPct": 21.17280747275558,
                "rsi14": 68.84795926452807,
                "volumeRatio20d": 155.82750933324917,
                "rs20Pct": 35.75581395348838,
                "tradingValueRank": 29.0,
                "marketCapRank": 146.0,
                "marketCapTrillion": 3.217,
                "per": 13.94,
                "pbr": 7.04,
                "cnsPer": 0.0,
                "foreignRate": 2.14,
                "supplyTrendScore": 4.0
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 8.3,
            "signalScore": 8.3,
            "score": 8.3,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 5.9,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 3,053주 / 기관 37,622주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +3,053 / 전일 -57,399 · 기관 당일 +37,622 / 전일 +12,777 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 208.7% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 105.0% / 마지막 1시간 208.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
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
                "note": "종가 / 20MA 105.3% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,145,000 / 20MA 1,102,300 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 120% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +0.43% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +4.52% / KOSPI -0.89% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.68:1 · 평균 체결강도 208.7% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +1.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 -57,399/당일 +3,053 · 기관 전일 +12,777/당일 +37,622 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,161,000 / 60MA 1,095,650",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 49.7% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 11",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 116% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 46.8% (≥25%) · 20일 수익률 +18.3% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,941 / 5MA 6,925 (+0.2%) · VKOSPI 40.3 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 3,053주 / 기관 37,622주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +3,053 / 전일 -57,399 · 기관 당일 +37,622 / 전일 +12,777 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 208.7% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 105.0% / 마지막 1시간 208.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,145,000 / 20MA 1,102,300 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +0.43% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +4.52% / KOSPI -0.89% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.68:1 · 평균 체결강도 208.7% (필요 ≥ 1.1:1) · 장마감 매수 우위",
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
                "note": "종가 / 20MA 105.3% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 120% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +1.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1161000,
            "previousClose": 1156000,
            "dailyChange": 5000,
            "dailyChangePct": 0.43,
            "dailyDirection": "up",
            "entryPriceText": "1,161,000원 (당일 종가 기준)",
            "entryPrice": 1161000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 153.1638,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2547,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 3,053주 / 기관 37,622주 / 마지막 1시간 208.7% · 장후반 매수세 강화 · 마지막 30분 틱 2.68:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 29분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-10-06T08:35:00Z",
              "intradayAbove100Ratio": 68.2,
              "observedMinutes": 29,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 29분 프록시",
              "lastHourAvgStrength": 208.7,
              "lastHourObservedMinutes": 29,
              "last30AvgStrength": 208.7,
              "last30ObservedMinutes": 29,
              "last30BuySellRatio": 2.6824,
              "last30BuyVolume": 625.0,
              "last30SellVolume": 233.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 40.26, ATR10 5.41%, 일간 표준편차 3.99%, 당일 레인지 5.10%.",
              "metrics": {
                "atrPct10": 5.41,
                "returnStd20": 3.99,
                "todayRangePct": 5.1,
                "vkospi": 40.26
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
                    "date": "20261002",
                    "net": 3053.0
                  },
                  {
                    "date": "20261001",
                    "net": -57399.0
                  },
                  {
                    "date": "20260930",
                    "net": 29397.0
                  },
                  {
                    "date": "20260929",
                    "net": 11629.0
                  },
                  {
                    "date": "20260928",
                    "net": -79963.0
                  }
                ],
                "institution": [
                  {
                    "date": "20261002",
                    "net": 37622.0
                  },
                  {
                    "date": "20261001",
                    "net": 12777.0
                  },
                  {
                    "date": "20260930",
                    "net": -2345.0
                  },
                  {
                    "date": "20260929",
                    "net": 1698.0
                  },
                  {
                    "date": "20260928",
                    "net": -63817.0
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
                "targetYield": "+0.2%",
                "targetPrice": "1,163,000원",
                "historicalHitRate": 0.6911,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.9%",
                "targetPrice": "1,183,000원",
                "historicalHitRate": 0.37,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "1,224,855원",
                "historicalHitRate": 0.2324,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,253,880원",
                "historicalHitRate": 0.1346,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,288,710원",
                "historicalHitRate": 0.0705,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,151,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.9%",
                "targetPrice": "1,151,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20261002",
              "anchorOpen": 1151000,
              "anchorClose": 1156000,
              "anchorVolumeRatio20d": 0.68,
              "anchorStopPrice": 1151000,
              "fallbackStopPrice": 1126170,
              "effectiveHardStopPrice": 1151000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,151,000원와 기존 % 손절 1,126,170원 중 더 높은 1,151,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-A 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 1,151,000원를 기준으로 잡고, 기존 % 손절 1,126,170원보다 느슨해지지 않게 1,151,000원로 고정합니다."
            },
            "rr": "1 : 5.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1149390,
              "high": 1161000,
              "anchor": 1161000,
              "label": "1,149,390~1,161,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1163000,
                "secondaryResistancePrice": 1183000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,184,220원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,201,635원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,224,855원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,253,880원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,288,710원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,151,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.9%",
                    "targetPrice": "1,151,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1163000,
                "secondaryResistancePrice": 1183000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "1,163,000원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "1,183,000원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,224,855원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,253,880원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,288,710원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,151,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.9%",
                    "targetPrice": "1,151,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
                "nearestResistancePrice": 1163000,
                "secondaryResistancePrice": 1183000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "1,163,000원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "1,183,000원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,224,855원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,253,880원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,288,710원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,151,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.9%",
                    "targetPrice": "1,151,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
              "sampleCount": 172,
              "ev": -1.1827
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 327건)",
              "hitRate": 0.6911,
              "ev": 0.371,
              "sampleCount": 327
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
                "currentPrice": 1161000.0,
                "vs52wHighPct": 49.65782720273738,
                "vs52wLowPct": 406.9868995633188,
                "dropFrom52wHighPct": 50.34217279726262,
                "ma20GapPct": 5.325229066497323,
                "rsi14": 56.4470013024883,
                "volumeRatio20d": 116.07912189707285,
                "rs20Pct": 18.34862385321101,
                "tradingValueRank": 11.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 153.1638,
                "per": 4.68,
                "pbr": 2.79,
                "cnsPer": 3.25,
                "foreignRate": 46.75,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 1.3811002939398362
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 5.9,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 125,803주 / 기관 12,819주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +125,803 / 전일 +79,198 · 기관 당일 +12,819 / 전일 +70,961 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 141.7% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 141.0% / 마지막 1시간 141.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +134,243주 · 양수 4/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 115.6% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,573,800 / 20MA 1,448,700 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 118% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 +6.15% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +6.49% / KOSPI -0.96% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.42:1 · 평균 체결강도 141.7% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +5.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 +79,198/당일 +125,803 · 기관 전일 +70,961/당일 +12,819 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,674,000 / 60MA 1,368,567",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 69.3% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 6",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 118% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 37.8% (≥25%) · 20일 수익률 +24.2% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,936 / 5MA 6,924 (+0.2%) · VKOSPI 40.4 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 125,803주 / 기관 12,819주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +125,803 / 전일 +79,198 · 기관 당일 +12,819 / 전일 +70,961 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 141.7% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 141.0% / 마지막 1시간 141.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +134,243주 · 양수 4/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,573,800 / 20MA 1,448,700 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +6.49% / KOSPI -0.96% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.42:1 · 평균 체결강도 141.7% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 115.6% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 118% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +6.15% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +5.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1674000,
            "previousClose": 1577000,
            "dailyChange": 97000,
            "dailyChangePct": 6.15,
            "dailyDirection": "up",
            "entryPriceText": "1,674,000원 (당일 종가 기준)",
            "entryPrice": 1674000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 125.0372,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2547,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 125,803주 / 기관 12,819주 / 마지막 1시간 141.7% · 장후반 매수세 강화 · 마지막 30분 틱 1.42:1. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 141.0,
              "note": "토스 공개 체결강도 141.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-10-06T06:05:28Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 141.7,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 141.7,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 1.4167,
              "last30BuyVolume": 187.0,
              "last30SellVolume": 132.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 40.39, ATR10 5.42%, 일간 표준편차 3.08%, 당일 레인지 4.38%.",
              "metrics": {
                "atrPct10": 5.42,
                "returnStd20": 3.08,
                "todayRangePct": 4.38,
                "vkospi": 40.39
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 134243.0,
              "positiveDays": 4,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20261002",
                    "net": 125803.0
                  },
                  {
                    "date": "20261001",
                    "net": 79198.0
                  },
                  {
                    "date": "20260930",
                    "net": -109324.0
                  },
                  {
                    "date": "20260929",
                    "net": -9472.0
                  },
                  {
                    "date": "20260928",
                    "net": -78251.0
                  }
                ],
                "institution": [
                  {
                    "date": "20261002",
                    "net": 12819.0
                  },
                  {
                    "date": "20261001",
                    "net": 70961.0
                  },
                  {
                    "date": "20260930",
                    "net": -16781.0
                  },
                  {
                    "date": "20260929",
                    "net": 44254.0
                  },
                  {
                    "date": "20260928",
                    "net": 22990.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20261002",
                    "net": 12819.0
                  },
                  {
                    "date": "20261001",
                    "net": 70961.0
                  },
                  {
                    "date": "20260930",
                    "net": -16781.0
                  },
                  {
                    "date": "20260929",
                    "net": 44254.0
                  },
                  {
                    "date": "20260928",
                    "net": 22990.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +134,243주 · 양수 4/5일 · 증가 2회"
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
                "targetYield": "+0.7%",
                "targetPrice": "1,685,000원",
                "historicalHitRate": 0.6911,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "+3.5% 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "1,732,590원",
                "historicalHitRate": 0.37,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "1,766,070원",
                "historicalHitRate": 0.2324,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,807,920원",
                "historicalHitRate": 0.1346,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,858,140원",
                "historicalHitRate": 0.0705,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,623,780원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,623,780원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20261002",
              "anchorOpen": 1545000,
              "anchorClose": 1577000,
              "anchorVolumeRatio20d": 0.87,
              "anchorStopPrice": 1545000,
              "fallbackStopPrice": 1623780,
              "effectiveHardStopPrice": 1623780,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,545,000원와 기존 % 손절 1,623,780원 중 더 높은 1,623,780원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-A 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 1,545,000원를 기준으로 잡고, 기존 % 손절 1,623,780원보다 느슨해지지 않게 1,623,780원로 고정합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1657260,
              "high": 1674000,
              "anchor": 1674000,
              "label": "1,657,260~1,674,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1685000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,707,480원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,732,590원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,766,070원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,807,920원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,858,140원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,623,780원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,623,780원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1685000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "1,685,000원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,732,590원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,766,070원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,807,920원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,858,140원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,623,780원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,623,780원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
                "nearestResistancePrice": 1685000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "1,685,000원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,732,590원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,766,070원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,807,920원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,858,140원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,623,780원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,623,780원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
              "sampleCount": 172,
              "ev": -1.1827
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 327건)",
              "hitRate": 0.6911,
              "ev": 0.371,
              "sampleCount": 327
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
                "currentPrice": 1674000.0,
                "vs52wHighPct": 69.2594124948283,
                "vs52wLowPct": 757.1428571428571,
                "dropFrom52wHighPct": 30.740587505171703,
                "ma20GapPct": 15.551874094015325,
                "rsi14": 68.2224240100237,
                "volumeRatio20d": 118.43463455142265,
                "rs20Pct": 24.183976261127597,
                "tradingValueRank": 6.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 125.0372,
                "per": 128.93,
                "pbr": 12.36,
                "cnsPer": 82.91,
                "foreignRate": 37.76,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": 5.13018222941887
              },
              "evaluatedAt": "2026-10-06T15:06:58+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 5,
            "name": "티엠씨",
            "code": "217590",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 14.0,
            "effectiveScoreMax": 13.0,
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
                "note": "외인 451,069주 / 기관 72,766주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +451,069 / 전일 +83,416 · 기관 당일 +72,766 / 전일 -43 · 당일 양매수 + 전일 수급 유입"
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
                "note": "당일 평균 89.2% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +618,241주 · 동반 양수 2/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 141.7% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 15,844 / 20MA 13,475 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 571% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +3.52% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -2.54% / KOSPI -0.96% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 10.37:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G4, Q1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +83,416/당일 +451,069 · 기관 전일 -43/당일 +72,766 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 19,090 / 60MA 12,487",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 49.3% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 32",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 451% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 6.3% (≥25%) · 20일 수익률 +89.6% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,936 / 5MA 6,924 (+0.2%) · VKOSPI 40.4 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 451,069주 / 기관 72,766주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +451,069 / 전일 +83,416 · 기관 당일 +72,766 / 전일 -43 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 300.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 89.2% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +618,241주 · 동반 양수 2/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 15,844 / 20MA 13,475 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +3.52% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 10.37:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 141.7% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 571% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -2.54% / KOSPI -0.96% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 19090,
            "previousClose": 18440,
            "dailyChange": 650,
            "dailyChangePct": 3.52,
            "dailyDirection": "up",
            "entryPriceText": "19,090원 (당일 종가 기준)",
            "entryPrice": 19090,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.46,
            "marketCapRank": 524,
            "marketCapUniverseCount": 2547,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 451,069주 / 기관 72,766주 / 마지막 1시간 300.0% · 장후반 매수세 강화 · 마지막 30분 틱 10.37:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 89.2,
              "note": "토스 공개 체결강도 89.2% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A217590/order",
              "asOf": "2026-10-06T06:05:31Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 10.3665,
              "last30BuyVolume": 8428.0,
              "last30SellVolume": 813.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 40.39, ATR10 8.34%, 일간 표준편차 8.00%, 당일 레인지 8.41%.",
              "metrics": {
                "atrPct10": 8.34,
                "returnStd20": 8.0,
                "todayRangePct": 8.41,
                "vkospi": 40.39
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 618241.0,
              "positiveDays": 2,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20261002",
                    "net": 451069.0
                  },
                  {
                    "date": "20261001",
                    "net": 83416.0
                  },
                  {
                    "date": "20260930",
                    "net": -56034.0
                  },
                  {
                    "date": "20260929",
                    "net": 27621.0
                  },
                  {
                    "date": "20260928",
                    "net": 36546.0
                  }
                ],
                "institution": [
                  {
                    "date": "20261002",
                    "net": 72766.0
                  },
                  {
                    "date": "20261001",
                    "net": -43.0
                  },
                  {
                    "date": "20260930",
                    "net": 470.0
                  },
                  {
                    "date": "20260929",
                    "net": -448.0
                  },
                  {
                    "date": "20260928",
                    "net": 2878.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20261002",
                    "net": 523835.0
                  },
                  {
                    "date": "20261001",
                    "net": 83373.0
                  },
                  {
                    "date": "20260930",
                    "net": -55564.0
                  },
                  {
                    "date": "20260929",
                    "net": 27173.0
                  },
                  {
                    "date": "20260928",
                    "net": 39424.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +618,241주 · 동반 양수 2/5일 · 증가 2회"
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
                "targetYield": "+1.7%",
                "targetPrice": "19,420원",
                "historicalHitRate": 0.6911,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "+3.5% 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "19,758원",
                "historicalHitRate": 0.37,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "20,140원",
                "historicalHitRate": 0.2324,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "20,617원",
                "historicalHitRate": 0.1346,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "21,190원",
                "historicalHitRate": 0.0705,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 18,517원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "18,517원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20261002",
              "anchorOpen": 14570,
              "anchorClose": 18440,
              "anchorVolumeRatio20d": 3.46,
              "anchorStopPrice": 14570,
              "fallbackStopPrice": 18517,
              "effectiveHardStopPrice": 18517,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 14,570원와 기존 % 손절 18,517원 중 더 높은 18,517원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-A 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 14,570원를 기준으로 잡고, 기존 % 손절 18,517원보다 느슨해지지 않게 18,517원로 고정합니다."
            },
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 18899,
              "high": 19090,
              "anchor": 19090,
              "label": "18,899~19,090원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 19420,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "19,472원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "19,758원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "20,140원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "20,617원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "21,190원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 18,517원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "18,517원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 19420,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "19,420원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "19,758원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "20,140원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "20,617원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "21,190원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 18,517원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "18,517원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
                "nearestResistancePrice": 19420,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "19,420원",
                    "historicalHitRate": 0.6911,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "19,758원",
                    "historicalHitRate": 0.37,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "20,140원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "20,617원",
                    "historicalHitRate": 0.1346,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "21,190원",
                    "historicalHitRate": 0.0705,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 18,517원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "18,517원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 327건)",
                  "hitRate": 0.6911,
                  "ev": 0.371,
                  "sampleCount": 327
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 172건)",
              "sampleCount": 172,
              "ev": -1.1827
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 327건)",
              "hitRate": 0.6911,
              "ev": 0.371,
              "sampleCount": 327
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
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지(핵심 Gate 미충족: G4, Q1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 451% (필요 < 150%) · 외 1건",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 451% (필요 < 150%) / Q1 미충족: 외인 보유율 6.3% (≥25%) · 20일 수익률 +89.6% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 19090.0,
                "vs52wHighPct": 49.328165374677,
                "vs52wLowPct": 116.43990929705214,
                "dropFrom52wHighPct": 50.671834625323,
                "ma20GapPct": 41.66975881261595,
                "rsi14": 77.63160980471608,
                "volumeRatio20d": 450.7112835742801,
                "rs20Pct": 89.57298907646475,
                "tradingValueRank": 32.0,
                "marketCapRank": 524.0,
                "marketCapTrillion": 0.46,
                "per": 230.0,
                "pbr": 4.01,
                "cnsPer": 0.0,
                "foreignRate": 6.33,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-10-06T15:06:58+09:00",
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
            "name": "삼성SDI",
            "code": "006400",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.6,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -16,949→20,425 / 기관 9,143→41,173 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 209.0% / 마지막 1시간 118.4% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 573,000 / 20MA 538,950 (106.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 95% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 230% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.53 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 575000, 전봉 종가 573000 미달"
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
                "note": "당일 거래대금 순위 19위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 46.2조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-09-21까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-26~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +6.5% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -0.3% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 573,000 / 60MA 487,758",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -2.1% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +6.3% (≤+22%) · RSI14 62 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -16,949→20,425 / 기관 9,143→41,173 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 209.0% / 마지막 1시간 118.4% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 573,000 / 20MA 538,950 (106.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 95% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 230% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.53 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 575000, 전봉 종가 573000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 573000,
            "previousClose": 529000,
            "dailyChange": 44000,
            "dailyChangePct": 8.32,
            "dailyDirection": "up",
            "entryPriceText": "573,000원 (당일 종가 기준)",
            "entryPrice": 573000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 46.1755,
            "marketCapRank": 14,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -0.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-09-21까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 575000, 전봉 종가 573000",
              "latestOpen": 575000.0,
              "latestClose": 575000.0,
              "previousClose": 573000.0
            },
            "toss": {
              "avgStrength": 209.0,
              "note": "토스 공개 체결강도 209.0% / 최근 체결 30분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A006400/order",
              "asOf": "2026-10-06T08:35:00Z",
              "intradayAbove100Ratio": 40.7,
              "observedMinutes": 30,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 30분 프록시",
              "lastHourAvgStrength": 118.4,
              "lastHourObservedMinutes": 30,
              "last30AvgStrength": 118.4,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 2.099,
              "last30BuyVolume": 1018.0,
              "last30SellVolume": 485.0
            },
            "orderbook": {
              "bidAskRatio": 0.5307,
              "bidTotal": 5708,
              "askTotal": 10755,
              "note": "토스 호가잔량합계 매수 5,708 / 매도 10,755",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A006400/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 40.26, ATR10 3.90%, 일간 표준편차 3.14%, 당일 레인지 7.56%.",
              "metrics": {
                "atrPct10": 3.9,
                "returnStd20": 3.14,
                "todayRangePct": 7.56,
                "vkospi": 40.26
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
                "targetPrice": "590,190원",
                "historicalHitRate": 0.5919,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "601,650원",
                "historicalHitRate": 0.4761,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 562,686원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "562,686원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 535000,
              "fallbackStopPrice": 562686,
              "effectiveHardStopPrice": 562686,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 535,000원와 기존 % 손절 562,686원 중 더 높은 562,686원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 535,000원이며, 기존 % 손절 562,686원보다 느슨해지지 않게 562,686원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 567270,
              "high": 573000,
              "anchor": 573000,
              "label": "567,270~573,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 575000,
                "retrace33Price": 573660,
                "retrace50Price": 574000,
                "nearestResistancePrice": 574000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "583,314원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "590,190원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "595,920원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 562,686원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "562,686원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 575000,
                "retrace33Price": 573660,
                "retrace50Price": 574000,
                "nearestResistancePrice": 574000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "583,314원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "590,190원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 562,686원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "562,686원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
                "recentHighPrice": 575000,
                "retrace33Price": 573660,
                "retrace50Price": 574000,
                "nearestResistancePrice": 574000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "590,190원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "601,650원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 562,686원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "562,686원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
              "sampleCount": 253,
              "ev": -0.0293
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 397건)",
              "hitRate": 0.5919,
              "ev": 0.958,
              "sampleCount": 397
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 +6.5% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 +6.5% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -0.3% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -2.1% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 573000.0,
                "vs52wHighPct": 69.8780487804878,
                "vs52wLowPct": 185.785536159601,
                "dropFrom52wHighPct": 30.121951219512194,
                "ma20GapPct": 6.317840244920679,
                "rsi14": 62.40682065893845,
                "volumeRatio20d": 189.90782162303637,
                "rs20Pct": 6.307977736549166,
                "tradingValueRank": 19.0,
                "marketCapRank": 14.0,
                "marketCapTrillion": 46.1755,
                "per": 1251.09,
                "pbr": 1.86,
                "cnsPer": 57.78,
                "foreignRate": 25.58,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 14.715735724515847
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "LG전자",
            "code": "066570",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.6,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -130,610→25,393 / 기관 132,125→80,483 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 159.0% / 마지막 1시간 169.5% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 231,500 / 20MA 207,855 (111.4% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 61% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 214% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.58 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 232500, 전봉 종가 230000 미달"
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
                "note": "당일 거래대금 순위 22위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 37.7조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-10-06까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-26~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +15.5% (필요 ≥ +15%)",
                "evalStatus": "met"
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
                "note": "종가 231,500 / 60MA 193,667",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.2% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +11.4% (≤+22%) · RSI14 67 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -130,610→25,393 / 기관 132,125→80,483 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 159.0% / 마지막 1시간 169.5% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 231,500 / 20MA 207,855 (111.4% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 61% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 214% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.58 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 232500, 전봉 종가 230000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 231500,
            "previousClose": 215500,
            "dailyChange": 16000,
            "dailyChangePct": 7.42,
            "dailyDirection": "up",
            "entryPriceText": "231,500원 (당일 종가 기준)",
            "entryPrice": 231500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 37.7078,
            "marketCapRank": 19,
            "marketCapUniverseCount": 2547,
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
              "note": "KIND 최근공시 2026-10-06까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 232500, 전봉 종가 230000",
              "latestOpen": 232500.0,
              "latestClose": 232500.0,
              "previousClose": 230000.0
            },
            "toss": {
              "avgStrength": 159.0,
              "note": "토스 공개 체결강도 159.0% / 최근 체결 15분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A066570/order",
              "asOf": "2026-10-06T08:35:02Z",
              "intradayAbove100Ratio": 57.1,
              "observedMinutes": 15,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 15분 프록시",
              "lastHourAvgStrength": 169.5,
              "lastHourObservedMinutes": 15,
              "last30AvgStrength": 169.5,
              "last30ObservedMinutes": 15,
              "last30BuySellRatio": 4.5857,
              "last30BuyVolume": 963.0,
              "last30SellVolume": 210.0
            },
            "orderbook": {
              "bidAskRatio": 0.5802,
              "bidTotal": 18881,
              "askTotal": 32544,
              "note": "토스 호가잔량합계 매수 18,881 / 매도 32,544",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A066570/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 40.26, ATR10 4.56%, 일간 표준편차 3.04%, 당일 레인지 4.18%.",
              "metrics": {
                "atrPct10": 4.56,
                "returnStd20": 3.04,
                "todayRangePct": 4.18,
                "vkospi": 40.26
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
                "targetPrice": "238,445원",
                "historicalHitRate": 0.5919,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "243,075원",
                "historicalHitRate": 0.4761,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 227,333원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "227,333원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 226000,
              "fallbackStopPrice": 227333,
              "effectiveHardStopPrice": 227333,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 226,000원와 기존 % 손절 227,333원 중 더 높은 227,333원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 226,000원이며, 기존 % 손절 227,333원보다 느슨해지지 않게 227,333원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 229185,
              "high": 231500,
              "anchor": 231500,
              "label": "229,185~231,500원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 235000,
                "retrace33Price": 232655,
                "retrace50Price": 233250,
                "nearestResistancePrice": 235000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "235,667원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "238,445원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "240,760원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 227,333원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "227,333원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 235000,
                "retrace33Price": 232655,
                "retrace50Price": 233250,
                "nearestResistancePrice": 235000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "235,667원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "238,445원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 227,333원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "227,333원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
                "recentHighPrice": 235000,
                "retrace33Price": 232655,
                "retrace50Price": 233250,
                "nearestResistancePrice": 235000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "238,445원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "243,075원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 227,333원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "227,333원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
              "sampleCount": 253,
              "ev": -0.0293
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 397건)",
              "hitRate": 0.5919,
              "ev": 0.958,
              "sampleCount": 397
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
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -1.5% (필요 -5%~-25%) · 외 1건",
            "statusReason": "G2 미충족: 20일 고점 대비 -1.5% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -1.2% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 231500.0,
                "vs52wHighPct": 49.518716577540104,
                "vs52wLowPct": 203.01047120418846,
                "dropFrom52wHighPct": 50.48128342245989,
                "ma20GapPct": 11.375718650020447,
                "rsi14": 67.28911867502853,
                "volumeRatio20d": 185.68126561219273,
                "rs20Pct": 15.923885828743115,
                "tradingValueRank": 22.0,
                "marketCapRank": 19.0,
                "marketCapTrillion": 37.7078,
                "per": 40.07,
                "pbr": 1.55,
                "cnsPer": 18.22,
                "foreignRate": 29.95,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -38.20294254607746
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "빛과전자",
            "code": "069540",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.6,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -143,175→411,501 / 기관 0→0 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 118.8% / 마지막 1시간 224.3% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 5,030 / 20MA 3,982 (126.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 88% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 713% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.84 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 5010, 전봉 종가 5020 미달"
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
                "note": "당일 거래대금 순위 40위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 0.6조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-10-02까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-26~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +81.9% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -1.9% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 5,030 / 60MA 3,019",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +0.6% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "⛔",
                "note": "20MA 이격 +26.3% (≤+22%) · RSI14 76 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -143,175→411,501 / 기관 0→0 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 118.8% / 마지막 1시간 224.3% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 5,030 / 20MA 3,982 (126.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 88% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 713% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.84 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 5010, 전봉 종가 5020 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 5030,
            "previousClose": 4400,
            "dailyChange": 630,
            "dailyChangePct": 14.32,
            "dailyDirection": "up",
            "entryPriceText": "5,030원 (당일 종가 기준)",
            "entryPrice": 5030,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.5668,
            "marketCapRank": 453,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -1.9% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-10-02까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 5010, 전봉 종가 5020",
              "latestOpen": 5010.0,
              "latestClose": 5010.0,
              "previousClose": 5020.0
            },
            "toss": {
              "avgStrength": 118.8,
              "note": "토스 공개 체결강도 118.8% / 최근 체결 6분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A069540/order",
              "asOf": "2026-10-06T08:35:05Z",
              "intradayAbove100Ratio": 83.3,
              "observedMinutes": 6,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 6분 프록시",
              "lastHourAvgStrength": 224.3,
              "lastHourObservedMinutes": 6,
              "last30AvgStrength": 224.3,
              "last30ObservedMinutes": 6,
              "last30BuySellRatio": 2.538,
              "last30BuyVolume": 9784.0,
              "last30SellVolume": 3855.0
            },
            "orderbook": {
              "bidAskRatio": 0.8417,
              "bidTotal": 189752,
              "askTotal": 225436,
              "note": "토스 호가잔량합계 매수 189,752 / 매도 225,436",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A069540/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 40.26, ATR10 7.02%, 일간 표준편차 7.94%, 당일 레인지 18.75%.",
              "metrics": {
                "atrPct10": 7.02,
                "returnStd20": 7.94,
                "todayRangePct": 18.75,
                "vkospi": 40.26
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "5,130원",
                "historicalHitRate": 0.5919,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "5,282원",
                "historicalHitRate": 0.4761,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 4,939원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "4,939원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 4305,
              "fallbackStopPrice": 4939,
              "effectiveHardStopPrice": 4939,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 4,305원와 기존 % 손절 4,939원 중 더 높은 4,939원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 4,305원이며, 기존 % 손절 4,939원보다 느슨해지지 않게 4,939원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 4980,
              "high": 5030,
              "anchor": 5030,
              "label": "4,980~5,030원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 5130,
                "retrace33Price": 5063,
                "retrace50Price": 5080,
                "nearestResistancePrice": 5130,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "5,130원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "5,181원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "5,231원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 4,939원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "4,939원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 5130,
                "retrace33Price": 5063,
                "retrace50Price": 5080,
                "nearestResistancePrice": 5130,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "5,130원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "5,181원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 4,939원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "4,939원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
                "recentHighPrice": 5130,
                "retrace33Price": 5063,
                "retrace50Price": 5080,
                "nearestResistancePrice": 5130,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "5,130원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "5,282원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 4,939원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "4,939원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
              "sampleCount": 253,
              "ev": -0.0293
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 397건)",
              "hitRate": 0.5919,
              "ev": 0.958,
              "sampleCount": 397
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
              "핵심 Gate 미충족: F2",
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.6조 (필요 ≥ 5조) · 외 3건",
            "statusReason": "F2 미충족: 시총 0.6조 (필요 ≥ 5조) / G2 미충족: 20일 고점 대비 -1.9% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 +0.6% (필요 -3% 이하 급락 1회 이상) / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 5030.0,
                "vs52wHighPct": 62.098765432098766,
                "vs52wLowPct": 749.6621621621622,
                "dropFrom52wHighPct": 37.901234567901234,
                "ma20GapPct": 26.32636403591386,
                "rsi14": 76.03486142399774,
                "volumeRatio20d": 147.31433068426705,
                "rs20Pct": 89.09774436090225,
                "tradingValueRank": 40.0,
                "marketCapRank": 453.0,
                "marketCapTrillion": 0.5668,
                "per": 0.0,
                "pbr": 5.67,
                "cnsPer": 0.0,
                "foreignRate": 1.4,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-10-06T17:36:14+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "두산",
            "code": "000150",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.1,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -4,476→987 / 기관 -8,037→-39,830 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 173.0% / 마지막 1시간 118.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,458,000 / 20MA 1,361,100 (107.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 48% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 143% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.41 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 1452000, 전봉 종가 1451000 충족"
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
            "statusLabel": "진입 가능",
            "strategy": "reversal",
            "filters": [
              {
                "code": "F1",
                "status": "✅",
                "note": "당일 거래대금 순위 29위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 23.6조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-10-06까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-26~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +30.1% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -5.0% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,458,000 / 60MA 1,247,367",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -3.3% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
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
                "note": "20MA 이격 +7.1% (≤+22%) · RSI14 59 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -4,476→987 / 기관 -8,037→-39,830 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 173.0% / 마지막 1시간 118.2% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,458,000 / 20MA 1,361,100 (107.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1452000, 전봉 종가 1451000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 48% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 143% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.41 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1458000,
            "previousClose": 1338000,
            "dailyChange": 120000,
            "dailyChangePct": 8.97,
            "dailyDirection": "up",
            "entryPriceText": "1,458,000원 (당일 종가 기준)",
            "entryPrice": 1458000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 23.6106,
            "marketCapRank": 31,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -5.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-10-06까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1452000, 전봉 종가 1451000",
              "latestOpen": 1451000.0,
              "latestClose": 1452000.0,
              "previousClose": 1451000.0
            },
            "toss": {
              "avgStrength": 173.0,
              "note": "토스 공개 체결강도 173.0% / 최근 체결 4분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000150/order",
              "asOf": "2026-10-06T06:05:30Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 4,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 4분 프록시",
              "lastHourAvgStrength": 118.2,
              "lastHourObservedMinutes": 4,
              "last30AvgStrength": 118.2,
              "last30ObservedMinutes": 4,
              "last30BuySellRatio": 0.8142,
              "last30BuyVolume": 241.0,
              "last30SellVolume": 296.0
            },
            "orderbook": {
              "bidAskRatio": 0.4097,
              "bidTotal": 118,
              "askTotal": 288,
              "note": "토스 호가잔량합계 매수 118 / 매도 288",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A000150/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 40.39, ATR10 5.61%, 일간 표준편차 4.58%, 당일 레인지 4.78%.",
              "metrics": {
                "atrPct10": 5.61,
                "returnStd20": 4.58,
                "todayRangePct": 4.78,
                "vkospi": 40.39
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
                "targetPrice": "1,501,740원",
                "historicalHitRate": 0.5919,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,530,900원",
                "historicalHitRate": 0.4761,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,431,756원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "1,431,756원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1427000,
              "fallbackStopPrice": 1431756,
              "effectiveHardStopPrice": 1431756,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,427,000원와 기존 % 손절 1,431,756원 중 더 높은 1,431,756원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,427,000원이며, 기존 % 손절 1,431,756원보다 느슨해지지 않게 1,431,756원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 1443420,
              "high": 1458000,
              "anchor": 1458000,
              "label": "1,443,420~1,458,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1535000,
                "retrace33Price": 1483410,
                "retrace50Price": 1496500,
                "nearestResistancePrice": 1478000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "1,484,244원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.3%",
                    "targetPrice": "1,535,000원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+5.3%",
                    "targetPrice": "1,535,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,431,756원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,431,756원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1535000,
                "retrace33Price": 1483410,
                "retrace50Price": 1496500,
                "nearestResistancePrice": 1478000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "1,484,244원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,501,740원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,431,756원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,431,756원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
                "recentHighPrice": 1535000,
                "retrace33Price": 1483410,
                "retrace50Price": 1496500,
                "nearestResistancePrice": 1478000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,501,740원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,530,900원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,431,756원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,431,756원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
              "sampleCount": 253,
              "ev": -0.0293
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 397건)",
              "hitRate": 0.5919,
              "ev": 0.958,
              "sampleCount": 397
            },
            "mixedExitPolicy": {
              "version": "mixed-exit-v1-balanced",
              "policyKey": "reversal-a7plus-balanced",
              "active": true,
              "stopExecution": "close",
              "stopCondition": "종가 -2% 이탈 시 전량 정리, 장중 -5% 이상 훼손 후 회복 실패 시 50% 축소",
              "stopTiming": "장중 조건은 10:00/14:00 확인 후 부분 축소, 최종 손절은 종가 확인 후",
              "positionWeightMultiplier": 0.5,
              "intradayRiskRule": {
                "active": true,
                "triggerPct": -5.0,
                "action": "50% 축소",
                "timing": "10:00 또는 14:00 확인",
                "recoveryRule": "진입가 대비 -3% 안쪽으로 회복하지 못하면 부분 축소",
                "finalStopRule": "종가 기준 -2% 이탈 시 남은 물량 전량 정리"
              },
              "volatilityOverlay": {
                "active": true,
                "mode": "high-volatility",
                "label": "고변동성 방어",
                "reason": "시장 또는 종목 변동성이 커서 비중을 줄이고 1차 익절을 앞당깁니다.",
                "triggerMetrics": {
                  "blendedState": "volatile",
                  "marketState": "volatile",
                  "stockState": "volatile",
                  "atrPct10": 5.61,
                  "todayRangePct": 4.78,
                  "returnStd20": 4.58,
                  "vkospi": 40.39
                },
                "originalTakeProfitStages": [
                  {
                    "targetPct": 2.0,
                    "quantityPct": 50.0
                  },
                  {
                    "targetPct": 10.0,
                    "quantityPct": 50.0
                  }
                ],
                "adjustedTakeProfitStages": [
                  {
                    "targetPct": 2.0,
                    "quantityPct": 60.0
                  },
                  {
                    "targetPct": 8.0,
                    "quantityPct": 40.0
                  }
                ],
                "positionWeightMultiplier": 0.5
              },
              "label": "반등 × 7&A",
              "priority": 1,
              "strategyCase": "reversal",
              "recommendationCase": "a7plus",
              "stopPct": -2.0,
              "takeProfitStages": [
                {
                  "targetPct": 2.0,
                  "quantityPct": 60.0
                },
                {
                  "targetPct": 8.0,
                  "quantityPct": 40.0
                }
              ],
              "positionWeightHint": "half",
              "reason": "반등 주력 후보는 빠른 수익 확보와 2차 반등 목표를 같이 사용합니다. 고변동성 방어로 비중을 50%로 낮추고 1차 익절을 앞당깁니다."
            },
            "entryEligible": true,
            "entryWatch": false,
            "entryBlockers": [],
            "setupQuality": "eligible",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1458000.0,
                "vs52wHighPct": 58.57774206508638,
                "vs52wLowPct": 157.14285714285714,
                "dropFrom52wHighPct": 41.42225793491362,
                "ma20GapPct": 7.119241789728896,
                "rsi14": 58.937709951177695,
                "volumeRatio20d": 138.1113676956106,
                "rs20Pct": 29.599999999999998,
                "tradingValueRank": 29.0,
                "marketCapRank": 31.0,
                "marketCapTrillion": 23.6106,
                "per": 84.07,
                "pbr": 9.99,
                "cnsPer": 57.59,
                "foreignRate": 18.32,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": 70.94990454874596
              },
              "evaluatedAt": "2026-10-06T15:06:58+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 5,
            "name": "LG에너지솔루션",
            "code": "373220",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.6,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -3,803→17,755 / 기관 46,121→77,482 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 226.0% / 마지막 1시간 193.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 389,000 / 20MA 361,200 (107.7% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 91% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 169% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.10 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 389500, 전봉 종가 386500 충족"
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
                "note": "당일 거래대금 순위 39위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 91.0조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-10-01까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-09-26~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +11.9% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -0.5% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 389,000 / 60MA 348,308",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.9% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +7.7% (≤+22%) · RSI14 63 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -3,803→17,755 / 기관 46,121→77,482 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 226.0% / 마지막 1시간 193.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 389,000 / 20MA 361,200 (107.7% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 91% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 389500, 전봉 종가 386500 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 169% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.10 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 389000,
            "previousClose": 369000,
            "dailyChange": 20000,
            "dailyChangePct": 5.42,
            "dailyDirection": "up",
            "entryPriceText": "389,000원 (당일 종가 기준)",
            "entryPrice": 389000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 91.026,
            "marketCapRank": 5,
            "marketCapUniverseCount": 2547,
            "keyPoint": "20일 고점 대비 -0.5% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-10-01까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 389500, 전봉 종가 386500",
              "latestOpen": 386500.0,
              "latestClose": 389500.0,
              "previousClose": 386500.0
            },
            "toss": {
              "avgStrength": 226.0,
              "note": "토스 공개 체결강도 226.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A373220/order",
              "asOf": "2026-10-06T06:05:35Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 193.1,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 193.1,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.8243,
              "last30BuyVolume": 1443.0,
              "last30SellVolume": 791.0
            },
            "orderbook": {
              "bidAskRatio": 0.1044,
              "bidTotal": 1835,
              "askTotal": 17578,
              "note": "토스 호가잔량합계 매수 1,835 / 매도 17,578",
              "source": "toss_quotes_api",
              "sourceUrl": "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A373220/quotes?viewType=krx_all&investMode=krx"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 40.39, ATR10 3.52%, 일간 표준편차 2.62%, 당일 레인지 6.37%.",
              "metrics": {
                "atrPct10": 3.52,
                "returnStd20": 2.62,
                "todayRangePct": 6.37,
                "vkospi": 40.39
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
                "targetPrice": "400,670원",
                "historicalHitRate": 0.5919,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "408,450원",
                "historicalHitRate": 0.4761,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 381,998원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "381,998원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 367500,
              "fallbackStopPrice": 381998,
              "effectiveHardStopPrice": 381998,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 367,500원와 기존 % 손절 381,998원 중 더 높은 381,998원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 367,500원이며, 기존 % 손절 381,998원보다 느슨해지지 않게 381,998원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 385110,
              "high": 389000,
              "anchor": 389000,
              "label": "385,110~389,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 391000,
                "retrace33Price": 389660,
                "retrace50Price": 390000,
                "nearestResistancePrice": 391000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "396,002원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "400,670원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "404,560원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 381,998원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "381,998원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 391000,
                "retrace33Price": 389660,
                "retrace50Price": 390000,
                "nearestResistancePrice": 391000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "396,002원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "400,670원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 381,998원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "381,998원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
                "recentHighPrice": 391000,
                "retrace33Price": 389660,
                "retrace50Price": 390000,
                "nearestResistancePrice": 391000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "400,670원",
                    "historicalHitRate": 0.5919,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "408,450원",
                    "historicalHitRate": 0.4761,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 381,998원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "381,998원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 397건)",
                  "hitRate": 0.5919,
                  "ev": 0.958,
                  "sampleCount": 397
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 253건)",
              "sampleCount": 253,
              "ev": -0.0293
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 397건)",
              "hitRate": 0.5919,
              "ev": 0.958,
              "sampleCount": 397
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 +11.9% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 +11.9% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -0.5% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -1.9% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 389000.0,
                "vs52wHighPct": 73.81404174573055,
                "vs52wLowPct": 33.90705679862307,
                "dropFrom52wHighPct": 26.185958254269448,
                "ma20GapPct": 7.69656699889258,
                "rsi14": 63.01275478599547,
                "volumeRatio20d": 138.11136583386246,
                "rs20Pct": 6.429548563611491,
                "tradingValueRank": 39.0,
                "marketCapRank": 5.0,
                "marketCapTrillion": 91.026,
                "per": 0.0,
                "pbr": 4.07,
                "cnsPer": -297.86,
                "foreignRate": 5.62,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 1.6874663712804967
              },
              "evaluatedAt": "2026-10-06T15:06:58+09:00",
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
  "analysisDate": "2026-10-06",
  "pointInTime": true,
  "pointInTimeStatus": "confirmed",
  "analysisSession": "1730",
  "analysisSessionLabel": "5시반 분석",
  "sessionSources": [
    "1500",
    "1730"
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
      "007660",
      "009150",
      "066570",
      "402340"
    ],
    "changedEntries": [
      {
        "strategy": "pullback",
        "code": "066570",
        "name": "LG전자",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 10.6,
          "signalScore": 10.6,
          "score": 10.6,
          "scoreMax": 13.0,
          "effectiveScoreMax": 12.5,
          "gradeScore": 8.5,
          "grade": "S"
        },
        "after": {
          "strictScore": 11.9,
          "signalScore": 11.9,
          "score": 11.9,
          "scoreMax": 13.0,
          "effectiveScoreMax": 12.5,
          "gradeScore": 9.5,
          "grade": "S"
        }
      },
      {
        "strategy": "accumulation",
        "code": "066570",
        "name": "LG전자",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 9.0,
          "signalScore": 9.0,
          "score": 9.0,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 6.4,
          "grade": "B"
        },
        "after": {
          "strictScore": 9.9,
          "signalScore": 9.9,
          "score": 9.9,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.1,
          "grade": "A"
        }
      }
    ],
    "providerHealth": {
      "krx_pykrx_short_balance": {
        "data_missing": 4
      },
      "krx_short_balance_direct_post": {
        "ok": 4
      }
    },
    "sourcePointInTimeStatus": "confirmed"
  }
};
