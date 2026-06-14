window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-06"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-07T16:41:19+00:00",
  "variant": "canary",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 59,
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
        "ok": 59
      },
      "naver_chart": {
        "ok": 59
      },
      "naver_integration_schedule": {
        "ok": 0
      },
      "yahoo_chart": {
        "ok": 5
      },
      "yahoo_intraday_30m": {
        "ok": 59
      },
      "toss_http_strength": {
        "ok": 59
      },
      "toss_ticks_strength_proxy": {
        "ok": 59
      },
      "toss_quotes_orderbook": {
        "ok": 59
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
        "durationMs": 520.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1318.8,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0,
        "detail": "G-E 🔴"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 50.6,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 266.6,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 3808.2,
        "count": 59
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 3866.3,
        "detail": "성공 59 / 실패 0",
        "count": 59
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 2583.8,
        "detail": "direct-http · 체결강도 59 / 호가 59 / 틱프록시 59",
        "count": 59
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 158.4,
        "detail": "pullback 3, breakout 3, accumulation 3, reversal 3",
        "count": 12
      },
      {
        "step": "browser_enrichment",
        "label": "카나리 KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 13978.5,
        "detail": "chrome:chrome.exe · KIND 0",
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
            "value": "8160.59 (-5.54%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.44"
          },
          {
            "item": "진입 전략",
            "value": "메인=주도주돌파형 / 서브=눌림목 / 보조=수급매집형"
          },
          {
            "item": "추천 슬롯",
            "value": "매집 3 · 돌파 3 · 눌림 3"
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
            "value": "G-E 🔴 (-11.5점)"
          },
          {
            "item": "갭 조정",
            "value": "❌ 전 등급 신규 진입 금지 / ❌ 신규 진입 금지"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6585.63",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7937.98",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 73.44",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 13 / 하락 7",
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
          "marketAnalyzeDate": "20260605",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 45.38,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "Bull Trap 10/20으로 하락 1단계(안도·자만)로 오버라이드했습니다.",
          "kospiClose": 8160.59,
          "kospiMa5": 8573.204,
          "vkospiValue": 73.44,
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
            "actualValue": "-5.49%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+21.51",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+6.1bp",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+52.00원",
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
        "entryAdjustment": "❌ 전 등급 신규 진입 금지 / ❌ 신규 진입 금지",
        "sellAdjustment": "진입 없음 | 해당 없음",
        "swingAdjustment": "금지",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다."
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "NAVER",
            "code": "035420",
            "strictScore": 4.1,
            "signalScore": 4.1,
            "score": 4.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 4.5,
            "gradeScore": 9.1,
            "grade": "S",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -147,900주 / 기관 135,906주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 255,500 · 5MA·10MA·20MA 중 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 254,500 ≤ 종가 255,500)"
              },
              {
                "code": "D1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.5,
                "evalStatus": "data_missing",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족"
              },
              {
                "code": "D2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족"
              },
              {
                "code": "D3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족"
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
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 566% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 261,800 > 20MA 218,045 > 60MA 213,873 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 255,500 / 60MA 213,873",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 58.2 (필요 ≥ 50)",
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
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -4.49% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 58.2 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +17.2% (필요 ≤ +25%) · 60MA +19.5% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "눌림목 품질 피처 부족 (낙폭·거래량·수급)",
                "evalStatus": "data_missing"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 85점 · 현재가 아래 유효 family 4개",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 20위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -147,900주 / 기관 135,906주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 245,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 255,500 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 254,500 ≤ 종가 255,500)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 43% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.02% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "D1",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D2",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D3",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 255500,
            "previousClose": 267500,
            "dailyChange": -12000,
            "dailyChangePct": -4.49,
            "dailyDirection": "down",
            "entryPriceText": "255,500원 (당일 종가 기준)",
            "entryPrice": 255500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 40.0812,
            "marketCapRank": 20,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -147,900주 / 기관 135,906주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 212,192원 (16.95% 아래) · 강도 85점 · family 4개 · 급증봉 저점·수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 212192,
                    "distancePct": 16.95,
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
                    "count": 33,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 196097,
                    "distancePct": 23.25,
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
                    "count": 17,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 207528,
                    "distancePct": 18.78,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 15,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 202068,
                    "distancePct": 20.91,
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
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 244375,
                    "distancePct": 4.35,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 212192,
                  "distancePct": 16.95,
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
                  "count": 33,
                  "lastSeenDaysAgo": 4,
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
                    "price": 196890,
                    "distancePct": 22.94,
                    "count": 13,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 194200,
                    "bandHigh": 199500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 201545,
                    "distancePct": 21.12,
                    "count": 13,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 199900,
                    "bandHigh": 204000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 207806,
                    "distancePct": 18.67,
                    "count": 13,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 205000,
                    "bandHigh": 210500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 213552,
                    "distancePct": 16.42,
                    "count": 21,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 211000,
                    "bandHigh": 216500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 220111,
                    "distancePct": 13.85,
                    "count": 12,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 217500,
                    "bandHigh": 223000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 225167,
                    "distancePct": 11.87,
                    "count": 2,
                    "lastSeenDaysAgo": 53,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 224000,
                    "bandHigh": 226500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 244500,
                    "distancePct": 4.31,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 244000,
                    "bandHigh": 245000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 255250,
                    "distancePct": 0.1,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 255000,
                    "bandHigh": 255500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 269500,
                    "distancePct": -5.48,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 267500,
                    "bandHigh": 271500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 195600,
                    "distancePct": 23.44,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 194200,
                    "bandHigh": 196800
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 207250,
                    "distancePct": 18.88,
                    "count": 2,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 206000,
                    "bandHigh": 208500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 216000,
                    "distancePct": 15.46,
                    "count": 2,
                    "lastSeenDaysAgo": 55,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 216000,
                    "bandHigh": 216000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 273342,
                    "distancePct": -6.98,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 25,
                    "volume": 23781802,
                    "binIndex": 17,
                    "binLow": 270983,
                    "binHigh": 275700
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 202592,
                    "distancePct": 20.71,
                    "count": 10,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "volume": 9677398,
                    "binIndex": 2,
                    "binLow": 200233,
                    "binHigh": 204950
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 212025,
                    "distancePct": 17.02,
                    "count": 11,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 25,
                    "volume": 8718090,
                    "binIndex": 4,
                    "binLow": 209667,
                    "binHigh": 214383
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 195800,
                    "distancePct": 23.37,
                    "count": 1,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 210.8,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 211000,
                    "distancePct": 17.42,
                    "count": 1,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 746,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 244250,
                    "distancePct": 4.4,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 1070.4,
                    "anchorCount": 2
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 566% (3일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 565.8,
                "latestBurstDaysAgo": 2
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 10.19%, 일간 표준편차 5.53%, 당일 레인지 8.04%.",
              "metrics": {
                "atrPct10": 10.19,
                "returnStd20": 5.53,
                "todayRangePct": 8.04,
                "vkospi": 73.44
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
              "anchorDate": "20260529",
              "anchorOpen": 211500,
              "anchorClose": 234000,
              "anchorHigh": 247500,
              "anchorLow": 211000,
              "anchorBodyMid": 222750,
              "anchorVolumeRatio": 7.46,
              "anchorStopMode": "open",
              "anchorStopPrice": 211500,
              "ma10Price": 231530,
              "ma10PrevPrice": 225130,
              "ma20Price": 218045,
              "ma20PrevPrice": 215670,
              "ma10WarningPrice": null,
              "hardStopPrice": 218045,
              "fallbackStopPrice": 247835,
              "effectiveStopPrice": 247835,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 시가 211,500원, 20일선 218,045원) = 218,045원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 247,835원) = 247,835원",
              "reasonSummary": "앵커 봉 - 기준 시가 211,500원와 20일선 218,045원 중 더 보수적인 가격을 쓰고, 기존 % 손절 247,835원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "261,887원",
                "historicalHitRate": 0.6628,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "265,720원",
                "historicalHitRate": 0.5116,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "270,830원",
                "historicalHitRate": 0.3488,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "275,940원",
                "historicalHitRate": 0.314,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "281,050원",
                "historicalHitRate": 0.098,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 247,835원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "247,835원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 253712,
              "high": 256266,
              "anchor": 255500,
              "label": "253,712~256,266원 (종가 ±, 분할매수)"
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "261,887원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "265,720원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "270,830원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "275,940원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "281,050원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 247,835원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "247,835원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "261,887원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "265,720원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "270,830원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "275,940원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "281,050원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 247,835원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "247,835원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "261,887원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "265,720원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "270,830원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "275,940원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "281,050원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 247,835원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "247,835원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.2006
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 86건)",
              "hitRate": 0.6628,
              "ev": 4.737,
              "sampleCount": 86
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "현대모비스",
            "code": "012330",
            "strictScore": 4.1,
            "signalScore": 4.1,
            "score": 4.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 4.5,
            "gradeScore": 9.1,
            "grade": "S",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -145,935주 / 기관 1,577주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 697,000 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 2.91 (필요 ≥ 1.0)"
              },
              {
                "code": "D1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.5,
                "evalStatus": "data_missing",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족"
              },
              {
                "code": "D2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족"
              },
              {
                "code": "D3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족"
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
                "note": "최근 20일 최대 거래량 급증 166% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 746,600 > 20MA 634,875 > 60MA 486,933 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 697,000 / 60MA 486,933",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 72.5 (필요 ≥ 50)",
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
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -6.82% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 72.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +9.8% (필요 ≤ +25%) · 60MA +43.1% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "눌림목 품질 피처 부족 (낙폭·거래량·수급)",
                "evalStatus": "data_missing"
              },
              {
                "code": "G9",
                "status": "⚠️",
                "note": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 24위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -145,935주 / 기관 1,577주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 665,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 697,000 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 2.91 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 63% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.15% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "D1",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D2",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D3",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 697000,
            "previousClose": 748000,
            "dailyChange": -51000,
            "dailyChangePct": -6.82,
            "dailyDirection": "down",
            "entryPriceText": "697,000원 (당일 종가 기준)",
            "entryPrice": 697000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 63.2406,
            "marketCapRank": 11,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -145,935주 / 기관 1,577주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 645,509원 (7.39% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 645509,
                    "distancePct": 7.39,
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
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 435906,
                    "distancePct": 37.46,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 16,
                    "lastSeenDaysAgo": 19,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 421986,
                    "distancePct": 39.46,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 15,
                    "lastSeenDaysAgo": 20,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 400496,
                    "distancePct": 42.54,
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
                    "lastSeenDaysAgo": 34,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 383271,
                    "distancePct": 45.01,
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
                    "lastSeenDaysAgo": 35,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 645509,
                  "distancePct": 7.39,
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
                  "lastSeenDaysAgo": 5,
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
                    "price": 381542,
                    "distancePct": 45.26,
                    "count": 10,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 372000,
                    "bandHigh": 386500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 391636,
                    "distancePct": 43.81,
                    "count": 11,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 388500,
                    "bandHigh": 397000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 400867,
                    "distancePct": 42.49,
                    "count": 10,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 398000,
                    "bandHigh": 405000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 411455,
                    "distancePct": 40.97,
                    "count": 8,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 407000,
                    "bandHigh": 415500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 423139,
                    "distancePct": 39.29,
                    "count": 12,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 418500,
                    "bandHigh": 428000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 434188,
                    "distancePct": 37.71,
                    "count": 7,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 430000,
                    "bandHigh": 439000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 444143,
                    "distancePct": 36.28,
                    "count": 6,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 441000,
                    "bandHigh": 447000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 511000,
                    "distancePct": 26.69,
                    "count": 3,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 509000,
                    "bandHigh": 515000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 523333,
                    "distancePct": 24.92,
                    "count": 3,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 520000,
                    "bandHigh": 525000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 552000,
                    "distancePct": 20.8,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 548000,
                    "bandHigh": 555000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 566000,
                    "distancePct": 18.79,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 562000,
                    "bandHigh": 571000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 614500,
                    "distancePct": 11.84,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 610000,
                    "bandHigh": 619000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 647143,
                    "distancePct": 7.15,
                    "count": 6,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 640000,
                    "bandHigh": 653000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 666333,
                    "distancePct": 4.4,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 664000,
                    "bandHigh": 670000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 692250,
                    "distancePct": 0.68,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 686000,
                    "bandHigh": 698000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 709500,
                    "distancePct": -1.79,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 706000,
                    "bandHigh": 713000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 745000,
                    "distancePct": -6.89,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 742000,
                    "bandHigh": 748000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 762667,
                    "distancePct": -9.42,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 759000,
                    "bandHigh": 768000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 374250,
                    "distancePct": 46.31,
                    "count": 2,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 372000,
                    "bandHigh": 376500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 385000,
                    "distancePct": 44.76,
                    "count": 2,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 383500,
                    "bandHigh": 386500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 420833,
                    "distancePct": 39.62,
                    "count": 3,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 418500,
                    "bandHigh": 425000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 400125,
                    "distancePct": 42.59,
                    "count": 15,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 25,
                    "volume": 3650469,
                    "binIndex": 1,
                    "binLow": 390750,
                    "binHigh": 409500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 643875,
                    "distancePct": 7.62,
                    "count": 3,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 25,
                    "volume": 3336968,
                    "binIndex": 14,
                    "binLow": 634500,
                    "binHigh": 653250
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 437625,
                    "distancePct": 37.21,
                    "count": 9,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 25,
                    "volume": 2812946,
                    "binIndex": 3,
                    "binLow": 428250,
                    "binHigh": 447000
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 447000,
                    "distancePct": 35.87,
                    "count": 1,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 544.3,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 522500,
                    "distancePct": 25.04,
                    "count": 2,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 331,
                    "anchorCount": 2
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 166% (4일 전)",
                "burstCount": 0,
                "maxRatioPct": 166.2,
                "latestBurstDaysAgo": null
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 11.55%, 일간 표준편차 8.74%, 당일 레인지 7.75%.",
              "metrics": {
                "atrPct10": 11.55,
                "returnStd20": 8.74,
                "todayRangePct": 7.75,
                "vkospi": 73.44
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
              "anchorDate": "20260513",
              "anchorOpen": 564000,
              "anchorClose": 649000,
              "anchorHigh": 677000,
              "anchorLow": 555000,
              "anchorBodyMid": 606500,
              "anchorVolumeRatio": 3.93,
              "anchorStopMode": "open",
              "anchorStopPrice": 564000,
              "ma10Price": 708700,
              "ma10PrevPrice": 692500,
              "ma20Price": 634875,
              "ma20PrevPrice": 621650,
              "ma10WarningPrice": null,
              "hardStopPrice": 634875,
              "fallbackStopPrice": 676090,
              "effectiveStopPrice": 676090,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 시가 564,000원, 20일선 634,875원) = 634,875원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 676,090원) = 676,090원",
              "reasonSummary": "앵커 봉 - 기준 시가 564,000원와 20일선 634,875원 중 더 보수적인 가격을 쓰고, 기존 % 손절 676,090원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "714,425원",
                "historicalHitRate": 0.6628,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "724,880원",
                "historicalHitRate": 0.5116,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "738,820원",
                "historicalHitRate": 0.3488,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "752,760원",
                "historicalHitRate": 0.314,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "766,700원",
                "historicalHitRate": 0.098,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 676,090원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "676,090원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 692121,
              "high": 699091,
              "anchor": 697000,
              "label": "692,121~699,091원 (종가 ±, 분할매수)"
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "714,425원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "724,880원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "738,820원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "752,760원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "766,700원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 676,090원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "676,090원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "714,425원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "724,880원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "738,820원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "752,760원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "766,700원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 676,090원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "676,090원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "714,425원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "724,880원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "738,820원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "752,760원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "766,700원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 676,090원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "676,090원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.2006
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 86건)",
              "hitRate": 0.6628,
              "ev": 4.737,
              "sampleCount": 86
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G0",
              "매매금지(핵심 Gate 미충족: G0)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 166% (필요 ≥ 200%)",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 166% (필요 ≥ 200%)"
          },
          {
            "rank": 3,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 4.1,
            "signalScore": 4.1,
            "score": 4.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 4.5,
            "gradeScore": 9.1,
            "grade": "S",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -57,044주 / 기관 99,296주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,757,000 · 5MA·10MA·20MA 중 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 1,621,000 ≤ 종가 1,757,000)"
              },
              {
                "code": "D1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.5,
                "evalStatus": "data_missing",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족"
              },
              {
                "code": "D2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족"
              },
              {
                "code": "D3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "data_missing",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G7, G8)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 201% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,883,600 > 20MA 1,342,200 > 60MA 827,158 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,757,000 / 60MA 827,158",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 90.6 (필요 ≥ 50)",
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
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +2.39% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 90.6 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +30.9% (필요 ≤ +25%) · 60MA +112.4% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "눌림목 품질 피처 부족 (낙폭·거래량·수급)",
                "evalStatus": "data_missing"
              },
              {
                "code": "G9",
                "status": "⚠️",
                "note": "복합 지지선은 있으나 합의 강도가 중간 수준입니다.",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "당일 거래대금 순위 5위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -57,044주 / 기관 99,296주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,615,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,757,000 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,621,000 ≤ 종가 1,757,000)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≤ 80%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C3",
                "note": "동종업종 평균 -6.18% / KOSPI -5.54% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "D1",
                "note": "52주 고가 낙폭 (≥12% 만점·8~12% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D2",
                "note": "수급추세 (≥+2 만점·+1 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "D3",
                "note": "거래량 (≥100% 만점·80~100% 부분) · 데이터 부족",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 1757000,
            "previousClose": 1716000,
            "dailyChange": 41000,
            "dailyChangePct": 2.39,
            "dailyDirection": "up",
            "entryPriceText": "1,757,000원 (당일 종가 기준)",
            "entryPrice": 1757000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 131.2368,
            "marketCapRank": 5,
            "marketCapUniverseCount": 2584,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -57,044주 / 기관 99,296주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,026,166원 (41.60% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1026166,
                    "distancePct": 41.6,
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
                    "lastSeenDaysAgo": 10,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 421284,
                    "distancePct": 76.02,
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
                    "lastSeenDaysAgo": 41,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1561334,
                    "distancePct": 11.14,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 4,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 921428,
                    "distancePct": 47.56,
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
                    "lastSeenDaysAgo": 10,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 896550,
                    "distancePct": 48.97,
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
                    "lastSeenDaysAgo": 16,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1026166,
                  "distancePct": 41.6,
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
                  "lastSeenDaysAgo": 10,
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
                    "price": 399875,
                    "distancePct": 77.24,
                    "count": 7,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 396500,
                    "bandHigh": 402000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 409125,
                    "distancePct": 76.71,
                    "count": 4,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 406000,
                    "bandHigh": 413000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 420900,
                    "distancePct": 76.04,
                    "count": 5,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 417000,
                    "bandHigh": 425500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 431667,
                    "distancePct": 75.43,
                    "count": 6,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 427500,
                    "bandHigh": 437000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 450091,
                    "distancePct": 74.38,
                    "count": 10,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 444500,
                    "bandHigh": 456000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 460900,
                    "distancePct": 73.77,
                    "count": 5,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 457000,
                    "bandHigh": 464500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 515000,
                    "distancePct": 70.69,
                    "count": 2,
                    "lastSeenDaysAgo": 37,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 514000,
                    "bandHigh": 516000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 566500,
                    "distancePct": 67.76,
                    "count": 2,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 565000,
                    "bandHigh": 568000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 613333,
                    "distancePct": 65.09,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 607000,
                    "bandHigh": 619000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 640500,
                    "distancePct": 63.55,
                    "count": 2,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 639000,
                    "bandHigh": 642000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 678500,
                    "distancePct": 61.38,
                    "count": 3,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 669000,
                    "bandHigh": 686000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 772000,
                    "distancePct": 56.06,
                    "count": 5,
                    "lastSeenDaysAgo": 25,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 767000,
                    "bandHigh": 776000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 794667,
                    "distancePct": 54.77,
                    "count": 3,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 788000,
                    "bandHigh": 802000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 812667,
                    "distancePct": 53.75,
                    "count": 3,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 808000,
                    "bandHigh": 818000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 832667,
                    "distancePct": 52.61,
                    "count": 3,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 827000,
                    "bandHigh": 839000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 856500,
                    "distancePct": 51.25,
                    "count": 2,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 855000,
                    "bandHigh": 858000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 894100,
                    "distancePct": 49.11,
                    "count": 5,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 880000,
                    "bandHigh": 900000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 918857,
                    "distancePct": 47.7,
                    "count": 7,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 912000,
                    "bandHigh": 926000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 957500,
                    "distancePct": 45.5,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 957000,
                    "bandHigh": 958000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 983500,
                    "distancePct": 44.02,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 980000,
                    "bandHigh": 987000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1005000,
                    "distancePct": 42.8,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1000000,
                    "bandHigh": 1010000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1028000,
                    "distancePct": 41.49,
                    "count": 3,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1024000,
                    "bandHigh": 1031000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1204000,
                    "distancePct": 31.47,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1204000,
                    "bandHigh": 1204000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1568667,
                    "distancePct": 10.72,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1554000,
                    "bandHigh": 1580000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1622500,
                    "distancePct": 7.66,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1615000,
                    "bandHigh": 1630000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 421667,
                    "distancePct": 76,
                    "count": 16,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 25,
                    "volume": 10411415,
                    "binIndex": 0,
                    "binLow": 384000,
                    "binHigh": 459333
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1024333,
                    "distancePct": 41.7,
                    "count": 6,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 25,
                    "volume": 7069000,
                    "binIndex": 8,
                    "binLow": 986667,
                    "binHigh": 1062000
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1777667,
                    "distancePct": -1.18,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 5887893,
                    "binIndex": 18,
                    "binLow": 1740000,
                    "binHigh": 1815333
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 899000,
                    "distancePct": 48.83,
                    "count": 1,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 281.5,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 924000,
                    "distancePct": 47.41,
                    "count": 1,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 205.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 1554000,
                    "distancePct": 11.55,
                    "count": 1,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 222.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 201% (4일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 201.2,
                "latestBurstDaysAgo": 4
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 73.44, ATR10 13.29%, 일간 표준편차 7.45%, 당일 레인지 13.40%.",
              "metrics": {
                "atrPct10": 13.29,
                "returnStd20": 7.45,
                "todayRangePct": 13.4,
                "vkospi": 73.44
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
              "anchorDate": "20260529",
              "anchorOpen": 1945000,
              "anchorClose": 2127000,
              "anchorHigh": 2192000,
              "anchorLow": 1912000,
              "anchorBodyMid": 2036000,
              "anchorVolumeRatio": 2.42,
              "anchorStopMode": "open",
              "anchorStopPrice": 1945000,
              "ma10Price": 1701300,
              "ma10PrevPrice": 1631700,
              "ma20Price": 1342200,
              "ma20PrevPrice": 1299950,
              "ma10WarningPrice": null,
              "hardStopPrice": 1342200,
              "fallbackStopPrice": 1704290,
              "effectiveStopPrice": 1704290,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 1,342,200원) = 1,342,200원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,704,290원) = 1,704,290원 / 제외: 앵커 시가 1,945,000원가 현재가 1,757,000원 이상이라 제외",
              "reasonSummary": "현재가 아래 유효 손절 후보(20일선 1,342,200원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,704,290원를 하한으로 유지합니다. 앵커 시가 1,945,000원가 현재가 1,757,000원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "5일선 저항 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.2%",
                "targetPrice": "1,883,600원",
                "historicalHitRate": 0.6628,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+7.2%",
                "targetPrice": "1,883,600원",
                "historicalHitRate": 0.5116,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+7.2%",
                "targetPrice": "1,883,600원",
                "historicalHitRate": 0.3488,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,897,560원",
                "historicalHitRate": 0.314,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,932,700원",
                "historicalHitRate": 0.098,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,704,290원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,704,290원"
              }
            ],
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1744701,
              "high": 1762271,
              "anchor": 1757000,
              "label": "1,744,701~1,762,271원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1883600,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,800,925원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,827,280원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,862,420원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,897,560원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,932,700원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,704,290원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,704,290원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "5일선이 기존 1차 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1883600,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,800,925원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,827,280원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,862,420원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,897,560원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,932,700원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,704,290원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,704,290원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1883600,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+7.2%",
                    "targetPrice": "1,883,600원",
                    "historicalHitRate": 0.6628,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+7.2%",
                    "targetPrice": "1,883,600원",
                    "historicalHitRate": 0.5116,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.2%",
                    "targetPrice": "1,883,600원",
                    "historicalHitRate": 0.3488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,897,560원",
                    "historicalHitRate": 0.314,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,932,700원",
                    "historicalHitRate": 0.098,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,704,290원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,704,290원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 86건)",
                  "hitRate": 0.6628,
                  "ev": 4.737,
                  "sampleCount": 86
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.2006
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 86건)",
              "hitRate": 0.6628,
              "ev": 4.737,
              "sampleCount": 86
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G7",
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G7, G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G7 미충족: 주봉 RSI 90.6 (필요 ≤ 80) · 과매수 과열 · 외 1건",
            "statusReason": "G7 미충족: 주봉 RSI 90.6 (필요 ≤ 80) · 과매수 과열 / G8 미충족: 이격 20MA +30.9% (필요 ≤ +25%) · 60MA +112.4% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "피에스케이",
            "code": "319660",
            "strictScore": 3.6,
            "signalScore": 4.3,
            "score": 4.3,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 3.1,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "RS",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "3개월 상대강도 상위 25% 밖"
              },
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 33,467주 / 기관 78,535주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0,
                "signalPoints": 1,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "당일 평균 101.0% / 100% 유지 87.5% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 95.5% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 286% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 95.5% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "몸통 64% / 윗꼬리·몸통 0.40 · 강마감 약충족"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.07 (필요 ≥ 1.2)"
              },
              {
                "code": "V1",
                "strictPoints": -1,
                "signalPoints": -1,
                "maxPoints": 1,
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
                "note": "5일 초과 +21.9% / 20일 초과 +10.5%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 95.5% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 87",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 286% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 64% / 윗꼬리·몸통 0.40 · 강마감 약충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +10.58% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 126,500 / 5MA 104,760 (전일 5MA 100,260) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 33,467주 / 기관 78,535주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 95.5% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 95.5% (필요 ≥ 95%)",
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
                "note": "당일 평균 101.0% / 100% 유지 87.5% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 286% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 64% / 윗꼬리·몸통 0.40 · 강마감 약충족",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.07 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 126500,
            "previousClose": 114400,
            "dailyChange": 12100,
            "dailyChangePct": 10.58,
            "dailyDirection": "up",
            "entryPriceText": "126,500원 (당일 종가 기준)",
            "entryPrice": 126500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.6643,
            "marketCapRank": 146,
            "marketCapUniverseCount": 2584,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 33,467주 / 기관 78,535주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 101,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 42분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A319660/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 87.5,
              "observedMinutes": 42,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 42분 프록시",
              "lastHourAvgStrength": 274.1,
              "lastHourObservedMinutes": 42,
              "last30AvgStrength": 300,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 77,
              "last30BuyVolume": 77,
              "last30SellVolume": 0
            },
            "orderbook": {
              "bidAskRatio": 0.0651,
              "bidTotal": 725,
              "askTotal": 11140,
              "note": "Naver 호가잔량합계 매수 725 / 매도 11,140",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=319660"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 11.69%, 일간 표준편차 7.98%, 당일 레인지 20.72%.",
              "metrics": {
                "atrPct10": 11.69,
                "returnStd20": 7.98,
                "todayRangePct": 20.72,
                "vkospi": 73.44
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
              "referenceClusterPct": 1,
              "referencePrice": 121300,
              "referenceBandLow": 121300,
              "referenceBandHigh": 121300,
              "entryDayOpenPrice": 111400,
              "fallbackStopPrice": 120175,
              "effectiveHardStopPrice": 121300,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 121,300원와 기존 % 손절 120,175원 중 더 높은 121,300원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 121,300원이며, 기존 % 손절 120,175원보다 느슨해지지 않게 121,300원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+4.7%",
                "targetPrice": "132,500원",
                "historicalHitRate": 0.75,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "135,355원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "140,415원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "145,475원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "151,800원",
                "historicalHitRate": 0.25,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 121,300원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.1%",
                "targetPrice": "121,300원"
              }
            ],
            "rr": "1 : 3.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 125614,
              "high": 126879,
              "anchor": 126500,
              "label": "125,614~126,879원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 132500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "131,560원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "135,355원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "140,415원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "145,475원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "151,800원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 121,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.1%",
                    "targetPrice": "121,300원"
                  }
                ],
                "trailingActivationPct": 8,
                "trailingBufferPct": 3,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 132500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "131,560원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "135,355원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "140,415원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "145,475원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "151,800원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 121,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.1%",
                    "targetPrice": "121,300원"
                  }
                ],
                "trailingActivationPct": 6,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistancePrice": 132500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "132,500원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "135,355원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "140,415원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "145,475원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "151,800원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 121,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.1%",
                    "targetPrice": "121,300원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
              "sampleCount": 10,
              "ev": -2.8899
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.25,
              "ev": 5.404,
              "sampleCount": 8
            },
            "breakoutLiveExitPolicy": {
              "version": "breakout-live-exit-v1",
              "wickClimaxLookbackBars": 20,
              "wickClimaxVolumeRatioMin": 2.5,
              "wickUpperShadowRatioMin": 0.45,
              "orderbookLookbackMinutes": 5,
              "orderbookBidAskSpikeMin": 2,
              "orderbookAskDropRatioMax": 0.6,
              "trailingActivationPct": 4.5,
              "trailingBufferPct": 2,
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
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "신한지주",
            "code": "055550",
            "strictScore": 3.2,
            "signalScore": 3.2,
            "score": 3.2,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.8,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "RS",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "3개월 상대강도 상위 25% 밖"
              },
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 319,164주 / 기관 137,742주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "당일 평균 106.0% / 100% 유지 60.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 97.9% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 202% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 97.9% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "몸통 18% / 윗꼬리·몸통 1.77 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.20 (필요 ≥ 1.2)"
              },
              {
                "code": "V1",
                "strictPoints": -1,
                "signalPoints": -1,
                "maxPoints": 1,
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
                "note": "5일 초과 +16.1% / 20일 초과 -0.0%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 97.9% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 45",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 202% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 18% / 윗꼬리·몸통 1.77 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +7.39% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 107,500 / 5MA 98,040 (전일 5MA 95,100) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 319,164주 / 기관 137,742주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 97.9% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 97.9% (필요 ≥ 95%)",
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
                "note": "당일 평균 106.0% / 100% 유지 60.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 202% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 18% / 윗꼬리·몸통 1.77 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.20 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 107500,
            "previousClose": 100100,
            "dailyChange": 7400,
            "dailyChangePct": 7.39,
            "dailyDirection": "up",
            "entryPriceText": "107,500원 (당일 종가 기준)",
            "entryPrice": 107500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 51.0253,
            "marketCapRank": 16,
            "marketCapUniverseCount": 2584,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 319,164주 / 기관 137,742주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 106,
              "note": "토스 공개 체결강도 106.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A055550/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 60,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 194.9,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 228.5,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.5211,
              "last30BuyVolume": 74,
              "last30SellVolume": 142
            },
            "orderbook": {
              "bidAskRatio": 0.2025,
              "bidTotal": 27779,
              "askTotal": 137170,
              "note": "Naver 호가잔량합계 매수 27,779 / 매도 137,170",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=055550"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 4.59%, 일간 표준편차 2.50%, 당일 레인지 7.29%.",
              "metrics": {
                "atrPct10": 4.59,
                "returnStd20": 2.5,
                "todayRangePct": 7.29,
                "vkospi": 73.44
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
              "referenceClusterPct": 1,
              "referencePrice": 102000,
              "referenceBandLow": 98400,
              "referenceBandHigh": 102000,
              "entryDayOpenPrice": 106200,
              "fallbackStopPrice": 102125,
              "effectiveHardStopPrice": 102125,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 102,000원와 기존 % 손절 102,125원 중 더 높은 102,125원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 102,000원이며, 기존 % 손절 102,125원보다 느슨해지지 않게 102,125원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.1%",
                "targetPrice": "109,800원",
                "historicalHitRate": 0.75,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "115,025원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "119,325원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "123,625원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "129,000원",
                "historicalHitRate": 0.25,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 102,125원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-5.0%",
                "targetPrice": "102,125원"
              }
            ],
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 106748,
              "high": 107822,
              "anchor": 107500,
              "label": "106,748~107,822원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 109800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "111,800원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "115,025원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "119,325원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "123,625원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "129,000원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 102,125원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "102,125원"
                  }
                ],
                "trailingActivationPct": 8,
                "trailingBufferPct": 3,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 109800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "109,800원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "115,025원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "119,325원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "123,625원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "129,000원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 102,125원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "102,125원"
                  }
                ],
                "trailingActivationPct": 6,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistancePrice": 109800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "109,800원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "115,025원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "119,325원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "123,625원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "129,000원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 102,125원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "102,125원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
              "sampleCount": 10,
              "ev": -2.8899
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.25,
              "ev": 5.404,
              "sampleCount": 8
            },
            "breakoutLiveExitPolicy": {
              "version": "breakout-live-exit-v1",
              "wickClimaxLookbackBars": 20,
              "wickClimaxVolumeRatioMin": 2.5,
              "wickUpperShadowRatioMin": 0.45,
              "orderbookLookbackMinutes": 5,
              "orderbookBidAskSpikeMin": 2,
              "orderbookAskDropRatioMax": 0.6,
              "trailingActivationPct": 4.5,
              "trailingBufferPct": 2,
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
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 3,
            "name": "RISE 네트워크인프라",
            "code": "367760",
            "strictScore": 3.1,
            "signalScore": 3.1,
            "score": 3.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.7,
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
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "외인 -2,732주 / 기관 19,179주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 평균 136.3% / 100% 유지 75.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 86.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 116% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 96.5% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "몸통 0% / 윗꼬리·몸통 560.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 35.34 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "V1",
                "strictPoints": -1,
                "signalPoints": -1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)"
              }
            ],
            "scoreScope": "breakout",
            "statusLabel": "매매금지(핵심 Gate 미충족: G2, G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 -2.5% / 20일 초과 +33.2%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 86.6% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 61",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 116% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 0% / 윗꼬리·몸통 560.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -3.85% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 78,395 / 5MA 84,195 (전일 5MA 84,642) · 5MA 조건 미충족",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "RS",
                "note": "3개월 상대강도 상위 25%",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 136.3% / 100% 유지 75.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.5% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 35.34 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -2,732주 / 기관 19,179주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 86.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 116% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 0% / 윗꼬리·몸통 560.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 78395,
            "previousClose": 81535,
            "dailyChange": -3140,
            "dailyChangePct": -3.85,
            "dailyDirection": "down",
            "entryPriceText": "78,395원 (당일 종가 기준)",
            "entryPrice": 78395,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0,
            "marketCapRank": null,
            "marketCapUniverseCount": 2584,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -2,732주 / 기관 19,179주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 136.3,
              "note": "토스 공개 체결강도 136.3% / 최근 체결 164분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A367760/order",
              "asOf": "2026-06-05T09:00:30Z",
              "intradayAbove100Ratio": 75,
              "observedMinutes": 164,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 164분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 35.3381,
              "bidTotal": 14948,
              "askTotal": 423,
              "note": "Naver 호가잔량합계 매수 14,948 / 매도 423",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=367760"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 73.44, ATR10 8.01%, 일간 표준편차 4.61%, 당일 레인지 7.65%.",
              "metrics": {
                "atrPct10": 8.01,
                "returnStd20": 4.61,
                "todayRangePct": 7.65,
                "vkospi": 73.44
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
              "referenceClusterPct": 1,
              "referencePrice": 75705,
              "referenceBandLow": 75705,
              "referenceBandHigh": 75705,
              "entryDayOpenPrice": 78400,
              "fallbackStopPrice": 74475,
              "effectiveHardStopPrice": 75705,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 75,705원와 기존 % 손절 74,475원 중 더 높은 75,705원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 75,705원이며, 기존 % 손절 74,475원보다 느슨해지지 않게 75,705원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.9%",
                "targetPrice": "80,630원",
                "historicalHitRate": 0.75,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+6.4%",
                "targetPrice": "83,430원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "87,018원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "90,154원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "94,074원",
                "historicalHitRate": 0.25,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 75,705원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.4%",
                "targetPrice": "75,705원"
              }
            ],
            "rr": "1 : 3.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 77846,
              "high": 78630,
              "anchor": 78395,
              "label": "77,846~78,630원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 80630,
                "secondaryResistancePrice": 83430,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "81,531원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "83,883원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "87,018원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "90,154원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "94,074원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 75,705원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.4%",
                    "targetPrice": "75,705원"
                  }
                ],
                "trailingActivationPct": 8,
                "trailingBufferPct": 3,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 80630,
                "secondaryResistancePrice": 83430,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "80,630원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.4%",
                    "targetPrice": "83,430원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "87,018원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "90,154원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "94,074원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 75,705원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.4%",
                    "targetPrice": "75,705원"
                  }
                ],
                "trailingActivationPct": 6,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistancePrice": 80630,
                "secondaryResistancePrice": 83430,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "80,630원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.4%",
                    "targetPrice": "83,430원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "87,018원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "90,154원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "94,074원",
                    "historicalHitRate": 0.25,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 75,705원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.4%",
                    "targetPrice": "75,705원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.25,
                  "ev": 5.404,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
              "sampleCount": 10,
              "ev": -2.8899
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.25,
              "ev": 5.404,
              "sampleCount": 8
            },
            "breakoutLiveExitPolicy": {
              "version": "breakout-live-exit-v1",
              "wickClimaxLookbackBars": 20,
              "wickClimaxVolumeRatioMin": 2.5,
              "wickUpperShadowRatioMin": 0.45,
              "orderbookLookbackMinutes": 5,
              "orderbookBidAskSpikeMin": 2,
              "orderbookAskDropRatioMax": 0.6,
              "trailingActivationPct": 4.5,
              "trailingBufferPct": 2,
              "activeSessionCutoff": "10:30",
              "wickClimaxRuleSummary": "09:00~10:30에 대량 거래량 위꼬리와 고점 대비 -1% 밀림이 함께 나오면 전량 익절합니다.",
              "orderbookRuleSummary": "09:00~10:30에 호가 분산 신호가 나오면 기본 50% 익절하고, 약한 체결강도/트레일링 동시 충족 시 전량 익절로 승격합니다.",
              "trailingRuleSummary": "+4.5% 도달 후 세션 고점 대비 2.0% 이탈 시 잔량 전량 매도합니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G2, G4)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 52주 고가 대비 86.6% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 86.6% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 116% (필요 ≥ 150%)"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "HD현대중공업",
            "code": "329180",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 6.8,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 43,918주 / 기관 11,472주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 당일 +43,918 / 전일 -67,213 · 기관 당일 +11,472 / 전일 +2,882 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 115.4% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 87.0% / 마지막 1시간 115.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 98.0% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 673,600 / 20MA 677,450 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 62% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 +2.00% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 -1.47% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.46:1 · 평균 체결강도 115.4% (필요 ≥ 1.1:1)"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -67,213/당일 +43,918 · 기관 전일 +2,882/당일 +11,472 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 664,000 / 60MA 592,742",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 86.5% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 53",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 59% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "매집 품질 피처 부족 (외인지분·상대강도)",
                "evalStatus": "data_missing"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 43,918주 / 기관 11,472주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +43,918 / 전일 -67,213 · 기관 당일 +11,472 / 전일 +2,882 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 115.4% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 87.0% / 마지막 1시간 115.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 98.0% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 62% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +2.00% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.47% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "5MA 673,600 / 20MA 677,450 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.46:1 · 평균 체결강도 115.4% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 664000,
            "previousClose": 651000,
            "dailyChange": 13000,
            "dailyChangePct": 2,
            "dailyDirection": "up",
            "entryPriceText": "664,000원 (당일 종가 기준)",
            "entryPrice": 664000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 69.6943,
            "marketCapRank": 9,
            "marketCapUniverseCount": 2584,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 43,918주 / 기관 11,472주 / 마지막 1시간 115.4% · 장후반 매수세 강화 · 마지막 30분 틱 0.46:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 87,
              "note": "토스 공개 체결강도 87.0% / 최근 체결 24분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A329180/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 24,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 24분 프록시",
              "lastHourAvgStrength": 115.4,
              "lastHourObservedMinutes": 24,
              "last30AvgStrength": 115.4,
              "last30ObservedMinutes": 24,
              "last30BuySellRatio": 0.4599,
              "last30BuyVolume": 1135,
              "last30SellVolume": 2468
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 7.06%, 일간 표준편차 4.72%, 당일 레인지 5.22%.",
              "metrics": {
                "atrPct10": 7.06,
                "returnStd20": 4.72,
                "todayRangePct": 5.22,
                "vkospi": 73.44
              },
              "strategyLabel": "수급매집형"
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
                "quantity": "15% 익절",
                "targetYield": "+0.9%",
                "targetPrice": "670,000원",
                "historicalHitRate": 0.6,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.8%",
                "targetPrice": "689,000원",
                "historicalHitRate": 0.2,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "710,480원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "730,400원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "756,960원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 649,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "649,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260605",
              "anchorOpen": 649000,
              "anchorClose": 664000,
              "anchorVolumeRatio20d": 0.59,
              "anchorStopPrice": 649000,
              "fallbackStopPrice": 640760,
              "effectiveHardStopPrice": 649000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 649,000원와 기존 % 손절 640,760원 중 더 높은 649,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 649,000원를 기준으로 잡고, 기존 % 손절 640,760원보다 느슨해지지 않게 649,000원로 고정합니다."
            },
            "rr": "1 : 3.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 659352,
              "high": 665992,
              "anchor": 664000,
              "label": "659,352~665,992원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 670000,
                "secondaryResistancePrice": 689000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "680,600원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "690,560원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "710,480원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "730,400원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "756,960원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 649,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "649,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 670000,
                "secondaryResistancePrice": 689000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.9%",
                    "targetPrice": "670,000원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.8%",
                    "targetPrice": "689,000원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "710,480원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "730,400원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "756,960원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 649,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "649,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 670000,
                "secondaryResistancePrice": 689000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.9%",
                    "targetPrice": "670,000원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.8%",
                    "targetPrice": "689,000원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "710,480원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "730,400원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "756,960원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 649,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "649,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -1.1794
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 10건)",
              "hitRate": 0.2,
              "ev": -0.891,
              "sampleCount": 10
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          },
          {
            "rank": 2,
            "name": "LG에너지솔루션",
            "code": "373220",
            "strictScore": 7.9,
            "signalScore": 7.9,
            "score": 7.9,
            "scoreMax": 12,
            "effectiveScoreMax": 12,
            "gradeScore": 6.6,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 22,875주 / 기관 22,639주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 당일 +22,875 / 전일 -69,474 · 기관 당일 +22,639 / 전일 +18,854 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 282.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 116.0% / 마지막 1시간 282.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 96.6% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 438,300 / 20MA 428,400 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 37% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 -1.90% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -5.78% / KOSPI -5.54% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 29.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -69,474/당일 +22,875 · 기관 전일 +18,854/당일 +22,639 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 414,000 / 60MA 418,933",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 78.6% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 69",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 70% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "매집 품질 피처 부족 (외인지분·상대강도)",
                "evalStatus": "data_missing"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 22,875주 / 기관 22,639주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +22,875 / 전일 -69,474 · 기관 당일 +22,639 / 전일 +18,854 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 282.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 116.0% / 마지막 1시간 282.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 438,300 / 20MA 428,400 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 37% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.90% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 29.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 96.6% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.78% / KOSPI -5.54% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 414000,
            "previousClose": 422000,
            "dailyChange": -8000,
            "dailyChangePct": -1.9,
            "dailyDirection": "down",
            "entryPriceText": "414,000원 (당일 종가 기준)",
            "entryPrice": 414000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 96.876,
            "marketCapRank": 6,
            "marketCapUniverseCount": 2584,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 22,875주 / 기관 22,639주 / 마지막 1시간 282.1% · 장후반 매수세 강화 · 마지막 30분 틱 29.00:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 116,
              "note": "토스 공개 체결강도 116.0% / 최근 체결 42분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A373220/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 100,
              "observedMinutes": 42,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 42분 프록시",
              "lastHourAvgStrength": 282.1,
              "lastHourObservedMinutes": 42,
              "last30AvgStrength": 300,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 29,
              "last30BuyVolume": 29,
              "last30SellVolume": 0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 7.74%, 일간 표준편차 4.53%, 당일 레인지 5.45%.",
              "metrics": {
                "atrPct10": 7.74,
                "returnStd20": 4.53,
                "todayRangePct": 5.45,
                "vkospi": 73.44
              },
              "strategyLabel": "수급매집형"
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
                "quantity": "15% 익절",
                "targetYield": "+0.1%",
                "targetPrice": "414,500원",
                "historicalHitRate": 0.6,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "428,500원",
                "historicalHitRate": 0.2,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "442,980원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "455,400원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "471,960원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 399,510원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "399,510원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "fallback_percent_stop",
              "sponsorMode": "both",
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorVolumeRatio20d": null,
              "anchorStopPrice": null,
              "fallbackStopPrice": 399510,
              "effectiveHardStopPrice": 399510,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 399,510원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 399,510원만 유지합니다."
            },
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 411102,
              "high": 415242,
              "anchor": 414000,
              "label": "411,102~415,242원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 414500,
                "secondaryResistancePrice": 428500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "424,350원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "430,560원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "442,980원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "455,400원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "471,960원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 399,510원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "399,510원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 414500,
                "secondaryResistancePrice": 428500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "414,500원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "428,500원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "442,980원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "455,400원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "471,960원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 399,510원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "399,510원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 414500,
                "secondaryResistancePrice": 428500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "414,500원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "428,500원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "442,980원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "455,400원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "471,960원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 399,510원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "399,510원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -1.1794
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 10건)",
              "hitRate": 0.2,
              "ev": -0.891,
              "sampleCount": 10
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "매매금지(핵심 Gate 미충족: G1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 414,000 / 60MA 418,933",
            "statusReason": "G1 미충족: 종가 414,000 / 60MA 418,933"
          },
          {
            "rank": 3,
            "name": "삼화콘덴서",
            "code": "001820",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 12,
            "effectiveScoreMax": 10,
            "gradeScore": 7.1,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 29,959주 / 기관 52,172주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 당일 +29,959 / 전일 +14,340 · 기관 당일 +52,172 / 전일 +13,731 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "manual_required",
                "note": "마지막 1시간 평균 체결강도 미입력"
              },
              {
                "code": "S4",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 0.5,
                "evalStatus": "manual_required",
                "note": "당일 평균 체결강도 90.4% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 120.8% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 118,600 / 20MA 92,550 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 44% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 등락 +1.27% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "동종업종 평균 -5.25% / KOSPI -5.54% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 0.5,
                "evalStatus": "data_missing",
                "note": "마지막 30분 틱 프록시 데이터 부족"
              },
              {
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)"
              }
            ],
            "scoreScope": "accumulation",
            "statusLabel": "매매금지(갭다운 경고 · 신규 진입 금지)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +14,340/당일 +29,959 · 기관 전일 +13,731/당일 +52,172 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 111,800 / 60MA 70,389",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 64.7% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 75",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 97% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "매집 품질 피처 부족 (외인지분·상대강도)",
                "evalStatus": "data_missing"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 8,161 / 5MA 8,573 (-4.8%) · VKOSPI 73.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 29,959주 / 기관 52,172주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +29,959 / 전일 +14,340 · 기관 당일 +52,172 / 전일 +13,731 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 118,600 / 20MA 92,550 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 44% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +1.27% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.25% / KOSPI -5.54% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "S4",
                "note": "당일 평균 체결강도 90.4% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 120.8% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱 프록시 데이터 부족",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 111800,
            "previousClose": 110400,
            "dailyChange": 1400,
            "dailyChangePct": 1.27,
            "dailyDirection": "up",
            "entryPriceText": "111,800원 (당일 종가 기준)",
            "entryPrice": 111800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.1622,
            "marketCapRank": 308,
            "marketCapUniverseCount": 2584,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 29,959주 / 기관 52,172주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영",
              "마지막 30분 틱 프록시 미반영"
            ],
            "toss": {
              "avgStrength": 90.4,
              "note": "토스 공개 체결강도 90.4% / 최근 체결 162분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001820/order",
              "asOf": "2026-06-05T09:00:17Z",
              "intradayAbove100Ratio": 71.4,
              "observedMinutes": 162,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 162분 프록시"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 73.44, ATR10 21.72%, 일간 표준편차 13.01%, 당일 레인지 19.75%.",
              "metrics": {
                "atrPct10": 21.72,
                "returnStd20": 13.01,
                "todayRangePct": 19.75,
                "vkospi": 73.44
              },
              "strategyLabel": "수급매집형"
            },
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001820/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼화콘덴서 (001820) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 104.2 처럼 숫자만 붙여넣습니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "tradePlanRows": [
              {
                "stage": "1차 익절",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+1.8%",
                "targetPrice": "113,800원",
                "historicalHitRate": 0.6,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.2%",
                "targetPrice": "119,800원",
                "historicalHitRate": 0.2,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.2%",
                "targetPrice": "119,800원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "122,980원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "127,452원",
                "historicalHitRate": 0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 110,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.6%",
                "targetPrice": "110,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260604",
              "anchorOpen": 110000,
              "anchorClose": 110400,
              "anchorVolumeRatio20d": 0.62,
              "anchorStopPrice": 110000,
              "fallbackStopPrice": 107887,
              "effectiveHardStopPrice": 110000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 110,000원와 기존 % 손절 107,887원 중 더 높은 110,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-E 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 110,000원를 기준으로 잡고, 기존 % 손절 107,887원보다 느슨해지지 않게 110,000원로 고정합니다."
            },
            "rr": "1 : 5.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 111017,
              "high": 112135,
              "anchor": 111800,
              "label": "111,017~112,135원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 113800,
                "secondaryResistancePrice": 119800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "114,595원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "116,272원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "119,626원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "122,980원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "127,452원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.6%",
                    "targetPrice": "110,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항을 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 113800,
                "secondaryResistancePrice": 119800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "113,800원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "116,272원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "119,626원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "122,980원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "127,452원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.6%",
                    "targetPrice": "110,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 113800,
                "secondaryResistancePrice": 119800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "113,800원",
                    "historicalHitRate": 0.6,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.2%",
                    "targetPrice": "119,800원",
                    "historicalHitRate": 0.2,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.2%",
                    "targetPrice": "119,800원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "122,980원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "127,452원",
                    "historicalHitRate": 0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 110,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.6%",
                    "targetPrice": "110,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 10건)",
                  "hitRate": 0.2,
                  "ev": -0.891,
                  "sampleCount": 10
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -1.1794
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 10건)",
              "hitRate": 0.2,
              "ev": -0.891,
              "sampleCount": 10
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "매매금지(갭다운 경고 · 신규 진입 금지)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "갭 스코어 G-E -11.5점: NQ -5.49%, 원달러 +52.00원",
            "statusReason": "갭 스코어 G-E (-11.5점)로 신규 진입 금지입니다. NQ -5.49%, 원달러 +52.00원, SOX -4.74%, 미 10년물 +6.1bp 악화가 동시에 확인됐습니다."
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "피에스케이",
            "code": "319660",
            "strictScore": 7.8,
            "signalScore": 7.8,
            "score": 7.8,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 7.8,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 -24,531→33,467 / 기관 213,830→78,535 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 평균 101.0% / 마지막 1시간 274.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 126,500 / 20MA 107,210 (118.0% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 75% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 201% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.07 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 126500, 전봉 종가 125900 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
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
                "note": "당일 거래대금 순위 87위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 3.7조 (필요 ≥ 5조)",
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
                "status": "⛔",
                "note": "최근 손절 이력 2건 (최근: 2026-05-28) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +26.4% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -4.5% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 126,500 / 60MA 90,520",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.3% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "⚠️",
                "note": "반등 품질 피처 부족 (20MA 이격·RSI)",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -24,531→33,467 / 기관 213,830→78,535 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 101.0% / 마지막 1시간 274.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 126,500 / 20MA 107,210 (118.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 75% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 201% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.07 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 126500, 전봉 종가 125900 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 126500,
            "previousClose": 114400,
            "dailyChange": 12100,
            "dailyChangePct": 10.58,
            "dailyDirection": "up",
            "entryPriceText": "126,500원 (당일 종가 기준)",
            "entryPrice": 126500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.6643,
            "marketCapRank": 146,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -4.5% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 피에스케이 (319660) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 126500, 전봉 종가 125900",
              "latestOpen": 126500,
              "latestClose": 126500,
              "previousClose": 125900
            },
            "toss": {
              "avgStrength": 101,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 42분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A319660/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 87.5,
              "observedMinutes": 42,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 42분 프록시",
              "lastHourAvgStrength": 274.1,
              "lastHourObservedMinutes": 42,
              "last30AvgStrength": 300,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 77,
              "last30BuyVolume": 77,
              "last30SellVolume": 0
            },
            "orderbook": {
              "bidAskRatio": 0.0651,
              "bidTotal": 725,
              "askTotal": 11140,
              "note": "Naver 호가잔량합계 매수 725 / 매도 11,140",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=319660"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 11.69%, 일간 표준편차 7.98%, 당일 레인지 20.72%.",
              "metrics": {
                "atrPct10": 11.69,
                "returnStd20": 7.98,
                "todayRangePct": 20.72,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "50% 익절",
                "targetYield": "+1.6%",
                "targetPrice": "128,480원",
                "historicalHitRate": 0.7087,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+2.4%",
                "targetPrice": "129,500원",
                "historicalHitRate": 0.6311,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 123,970원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "123,970원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 108800,
              "fallbackStopPrice": 123970,
              "effectiveHardStopPrice": 123970,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 108,800원와 기존 % 손절 123,970원 중 더 높은 123,970원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 108,800원이며, 기존 % 손절 123,970원보다 느슨해지지 않게 123,970원으로 고정합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1,
              "breakevenActivationPct": 3,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 125614,
              "high": 126879,
              "anchor": 126500,
              "label": "125,614~126,879원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 132500,
                "retrace33Price": 128480,
                "retrace50Price": 129500,
                "nearestResistancePrice": 132500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "128,480원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "129,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "132,825원",
                    "historicalHitRate": 0.377,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,970원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "123,970원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 132500,
                "retrace33Price": 128480,
                "retrace50Price": 129500,
                "nearestResistancePrice": 132500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "128,480원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+2.4%",
                    "targetPrice": "129,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,970원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "123,970원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 132500,
                "retrace33Price": 128480,
                "retrace50Price": 129500,
                "nearestResistancePrice": 132500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "128,480원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+2.4%",
                    "targetPrice": "129,500원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,970원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "123,970원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.1666
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.7087,
              "ev": 1.739,
              "sampleCount": 103
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F2",
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) · 외 2건",
            "statusReason": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) / F4 미충족: 최근 손절 이력 2건 (최근: 2026-05-28) · 재진입 차단 / G2 미충족: 20일 고점 대비 -4.5% (필요 -5%~-25%)"
          },
          {
            "rank": 2,
            "name": "한화에어로스페이스",
            "code": "012450",
            "strictScore": 6.5,
            "signalScore": 6.5,
            "score": 6.5,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 6.5,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "외인 -12,184→3,833 / 기관 7,293→1,036 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 평균 120.0% / 마지막 1시간 112.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 1,049,000 / 20MA 1,224,750 (85.7% · 필요 ≥ 98%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 58% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.61 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1049000, 전봉 종가 1038000 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
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
                "note": "당일 거래대금 순위 79위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 54.1조 (필요 ≥ 5조)",
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
                "note": "최근 5거래일(2026-05-27~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -28.4% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -25.8% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 1,049,000 / 60MA 1,356,333",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -6.0% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 2.55)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⚠️",
                "note": "반등 품질 피처 부족 (20MA 이격·RSI)",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -12,184→3,833 / 기관 7,293→1,036 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 120.0% / 마지막 1시간 112.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 58% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.61 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 1,049,000 / 20MA 1,224,750 (85.7% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1049000, 전봉 종가 1038000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1049000,
            "previousClose": 1068000,
            "dailyChange": -19000,
            "dailyChangePct": -1.78,
            "dailyDirection": "down",
            "entryPriceText": "1,049,000원 (당일 종가 기준)",
            "entryPrice": 1049000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 54.09,
            "marketCapRank": 15,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -25.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 한화에어로스페이스 (012450) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 1049000, 전봉 종가 1038000",
              "latestOpen": 1049000,
              "latestClose": 1049000,
              "previousClose": 1038000
            },
            "toss": {
              "avgStrength": 120,
              "note": "토스 공개 체결강도 120.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A012450/order",
              "asOf": "2026-06-05T10:59:56Z",
              "intradayAbove100Ratio": 40,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 112.7,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 75,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.013,
              "last30BuyVolume": 3,
              "last30SellVolume": 231
            },
            "orderbook": {
              "bidAskRatio": 1.6119,
              "bidTotal": 7753,
              "askTotal": 4810,
              "note": "Naver 호가잔량합계 매수 7,753 / 매도 4,810",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=012450"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 5.94%, 일간 표준편차 2.97%, 당일 레인지 4.49%.",
              "metrics": {
                "atrPct10": 5.94,
                "returnStd20": 2.97,
                "todayRangePct": 4.49,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절",
                "targetYield": "+1.9%",
                "targetPrice": "1,069,000원",
                "historicalHitRate": 0.7087,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,101,450원",
                "historicalHitRate": 0.6311,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,028,020원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,028,020원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1021000,
              "fallbackStopPrice": 1028020,
              "effectiveHardStopPrice": 1028020,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 1,021,000원와 기존 % 손절 1,028,020원 중 더 높은 1,028,020원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,021,000원이며, 기존 % 손절 1,028,020원보다 느슨해지지 않게 1,028,020원으로 고정합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1,
              "breakevenActivationPct": 3,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1041657,
              "high": 1052147,
              "anchor": 1049000,
              "label": "1,041,657~1,052,147원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1413000,
                "retrace33Price": 1169120,
                "retrace50Price": 1231000,
                "nearestResistancePrice": 1069000,
                "secondaryResistancePrice": 1106000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "1,069,000원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.4%",
                    "targetPrice": "1,106,000원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+34.7%",
                    "targetPrice": "1,413,000원",
                    "historicalHitRate": 0.377,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,028,020원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,028,020원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1413000,
                "retrace33Price": 1169120,
                "retrace50Price": 1231000,
                "nearestResistancePrice": 1069000,
                "secondaryResistancePrice": 1106000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "1,069,000원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.4%",
                    "targetPrice": "1,106,000원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,028,020원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,028,020원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 1413000,
                "retrace33Price": 1169120,
                "retrace50Price": 1231000,
                "nearestResistancePrice": 1069000,
                "secondaryResistancePrice": 1106000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "1,069,000원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,101,450원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,028,020원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,028,020원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.1666
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.7087,
              "ev": 1.739,
              "sampleCount": 103
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G3",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 -28.4% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 -28.4% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -25.8% (필요 -5%~-25%) / G3 미충족: 종가 1,049,000 / 60MA 1,356,333"
          },
          {
            "rank": 3,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 10,
            "effectiveScoreMax": 10,
            "gradeScore": 6.1,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 2,
                "evalStatus": "not_met",
                "note": "외인 -224,051→-57,044 / 기관 34,539→99,296 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2,
                "signalPoints": 2,
                "maxPoints": 2,
                "evalStatus": "met",
                "note": "당일 평균 104.0% / 마지막 1시간 230.8% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,757,000 / 20MA 1,342,200 (130.9% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 62% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.63 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0,
                "signalPoints": 0,
                "maxPoints": 1,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1757000, 전봉 종가 1774000 미달"
              },
              {
                "code": "V1",
                "strictPoints": 1,
                "signalPoints": 1,
                "maxPoints": 1,
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
                "note": "당일 거래대금 순위 5위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 131.2조 (필요 ≥ 5조)",
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
                "status": "⛔",
                "note": "최근 손절 이력 4건 (최근: 2026-05-29) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +91.4% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -19.8% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,757,000 / 60MA 827,158",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -9.6% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "⚠️",
                "note": "반등 품질 피처 부족 (20MA 이격·RSI)",
                "evalStatus": "data_missing"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 104.0% / 마지막 1시간 230.8% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,757,000 / 20MA 1,342,200 (130.9% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 62% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.63 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -224,051→-57,044 / 기관 34,539→99,296 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1757000, 전봉 종가 1774000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1757000,
            "previousClose": 1716000,
            "dailyChange": 41000,
            "dailyChangePct": 2.39,
            "dailyDirection": "up",
            "entryPriceText": "1,757,000원 (당일 종가 기준)",
            "entryPrice": 1757000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 131.2368,
            "marketCapRank": 5,
            "marketCapUniverseCount": 2584,
            "keyPoint": "20일 고점 대비 -19.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "직전 30분봉 종가 1757000, 전봉 종가 1774000",
              "latestOpen": 1757000,
              "latestClose": 1757000,
              "previousClose": 1774000
            },
            "toss": {
              "avgStrength": 104,
              "note": "토스 공개 체결강도 104.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-06-05T10:59:59Z",
              "intradayAbove100Ratio": 76.9,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 230.8,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 225,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 4.1333,
              "last30BuyVolume": 62,
              "last30SellVolume": 15
            },
            "orderbook": {
              "bidAskRatio": 1.6289,
              "bidTotal": 7366,
              "askTotal": 4522,
              "note": "Naver 호가잔량합계 매수 7,366 / 매도 4,522",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=009150"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 73.44, ATR10 13.29%, 일간 표준편차 7.45%, 당일 레인지 13.40%.",
              "metrics": {
                "atrPct10": 13.29,
                "returnStd20": 7.45,
                "todayRangePct": 13.4,
                "vkospi": 73.44
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,809,710원",
                "historicalHitRate": 0.7087,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,844,850원",
                "historicalHitRate": 0.6311,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,721,860원 장중 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,721,860원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1615000,
              "fallbackStopPrice": 1721860,
              "effectiveHardStopPrice": 1721860,
              "stopExecutionMode": "intraday_touch",
              "hardStopRuleSummary": "진입 당일 저가 1,615,000원와 기존 % 손절 1,721,860원 중 더 높은 1,721,860원을 장중 터치 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,615,000원이며, 기존 % 손절 1,721,860원보다 느슨해지지 않게 1,721,860원으로 고정합니다."
            },
            "reversalLiveExitPolicy": {
              "version": "reversal-live-exit-v1",
              "timeStopCutoff": "09:15",
              "timeStopMinBouncePct": 1,
              "breakevenActivationPct": 3,
              "earlySpikeWindowEnd": "09:10",
              "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
              "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다."
            },
            "rr": "1 : 2.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1744701,
              "high": 1762271,
              "anchor": 1757000,
              "label": "1,744,701~1,762,271원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 2192000,
                "retrace33Price": 1900550,
                "retrace50Price": 1974500,
                "nearestResistancePrice": 1844000,
                "secondaryResistancePrice": 1880000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,844,000원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,880,000원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+24.8%",
                    "targetPrice": "2,192,000원",
                    "historicalHitRate": 0.377,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,721,860원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,721,860원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 2192000,
                "retrace33Price": 1900550,
                "retrace50Price": 1974500,
                "nearestResistancePrice": 1844000,
                "secondaryResistancePrice": 1880000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,844,000원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,880,000원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,721,860원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,721,860원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 2192000,
                "retrace33Price": 1900550,
                "retrace50Price": 1974500,
                "nearestResistancePrice": 1844000,
                "secondaryResistancePrice": 1880000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,809,710원",
                    "historicalHitRate": 0.7087,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,844,850원",
                    "historicalHitRate": 0.6311,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,721,860원 장중 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,721,860원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 103건)",
                  "hitRate": 0.7087,
                  "ev": 1.739,
                  "sampleCount": 103
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": -0.1666
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 103건)",
              "hitRate": 0.7087,
              "ev": 1.739,
              "sampleCount": 103
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 4건 (최근: 2026-05-29) · 재진입 차단",
            "statusReason": "F4 미충족: 최근 손절 이력 4건 (최근: 2026-05-29) · 재진입 차단"
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
  "analysisDate": "2026-06-06"
};
