window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-10T06:02:41+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 21,
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
        "ok": 21
      },
      "naver_chart": {
        "ok": 21
      },
      "naver_integration_schedule": {
        "ok": 1
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
        "durationMs": 1937.1,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 251.8,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.1,
        "detail": "G-C 🟡"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1904.2,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 150.0,
        "detail": "순환매장 🔄 (거시·지수 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 55934.7,
        "count": 21
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 8240.6,
        "detail": "성공 21 / 실패 0",
        "count": 21
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 10041.5,
        "detail": "direct-http · 체결강도 21 / 호가 21 / 틱프록시 21",
        "count": 21
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 89.4,
        "detail": "pullback 2, breakout 2, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 24979.6,
        "detail": "playwright-chromium · KIND 1",
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
            "value": "순환매장 🔄 (거시·지수 완충)"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "7592.92 (-6.22%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 88.70"
          },
          {
            "item": "진입 전략",
            "value": "메인=주도주돌파형 / 서브=눌림목 / 보조=수급매집형"
          },
          {
            "item": "추천 슬롯",
            "value": "매집 3 · 돌파 2 · 눌림 2"
          },
          {
            "item": "스윙 전환 활성도",
            "value": "제한"
          },
          {
            "item": "시가베팅",
            "value": "활성"
          },
          {
            "item": "역추세 트랙",
            "value": "제한 활성"
          },
          {
            "item": "갭 스코어",
            "value": "G-C 🟡 (-2.0점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 70% 진입 / ⚠️ 50% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6693.10",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7956.17",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 88.70",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 11 / 하락 9",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 81 · 버블 critical off · KOSPI 60MA 상향 · 펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향",
            "verdict": "순환매장 🔄 (거시·지수 완충)"
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
          "marketAnalyzeDate": "20260610",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "순환매장 🔄 (거시·지수 완충)",
          "regimeAdjustmentReason": "펀더 앵커 81 · 버블 critical off · KOSPI 60MA 상향 · 펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향",
          "riseJustified": true,
          "kospiBullTier": "maintain",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 81.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.54,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1524원과 과열 이격이 겹쳤지만 펀더멘털 앵커 81점과 non-critical bubble(BI 45 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 7592.92,
          "kospiMa5": 7994.852000000001,
          "vkospiValue": 88.7,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": true
        },
        "technicalRegimeLabel": "박스권 ⚠️",
        "effectiveRegimeLabel": "순환매장 🔄 (거시·지수 완충)",
        "regimeAdjustmentReason": "펀더 앵커 81 · 버블 critical off · KOSPI 60MA 상향 · 펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-0.32%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+19.87",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+3.7bp",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-6.43원",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-7.78%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "-2.0점",
        "grade": "G-C 🟡",
        "code": "G-C",
        "entryAdjustment": "✅ 70% 진입 / ⚠️ 50% 진입",
        "sellAdjustment": "프리마켓 갭업 기준 -0.5%p 하향 | 손절폭 -0.5%p 축소",
        "swingAdjustment": "조건부 허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-06-11T03:59:00+00:00",
          "vix": "2026-06-10T20:15:00+00:00",
          "tnx": "2026-06-10T19:00:00+00:00",
          "krw": "2026-06-10T22:59:00+00:00",
          "sox": "2026-06-11T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.5,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 4위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 142,488주 / 기관 23,531주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 1,746,000 · 이평선 터치: 5MA, 10MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,780,000 · 5MA·10MA·20MA 중 5MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.25 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 75% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -5.90% / KOSPI -6.22% outperform"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G7, G8)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 188% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,777,400 > 20MA 1,476,350 > 60MA 897,267 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,780,000 / 60MA 897,267",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 91.8 (필요 ≥ 50)",
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
                "note": "KOSPI 7,593 / 5MA 7,995 (-5.0%) · VKOSPI 88.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -9.64% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 91.8 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +20.6% (필요 ≤ +25%) · 60MA +98.4% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
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
                "note": "당일 거래대금 순위 4위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 142,488주 / 기관 23,531주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,746,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,780,000 · 5MA·10MA·20MA 중 5MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 75% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.90% / KOSPI -6.22% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.25 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1780000,
            "previousClose": 1970000,
            "dailyChange": -190000,
            "dailyChangePct": -9.64,
            "dailyDirection": "down",
            "entryPriceText": "1,780,000원 (당일 종가 기준)",
            "entryPrice": 1780000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 132.9548,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2559,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 142,488주 / 기관 23,531주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,764,584원 (0.87% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1764584,
                    "distancePct": 0.87,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1026166,
                    "distancePct": 42.35,
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
                    "lastSeenDaysAgo": 13,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 421284,
                    "distancePct": 76.33,
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
                    "lastSeenDaysAgo": 44,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1559250,
                    "distancePct": 12.4,
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
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 921428,
                    "distancePct": 48.23,
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
                    "lastSeenDaysAgo": 13,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1764584,
                  "distancePct": 0.87,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 5,
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
                    "price": 400000,
                    "distancePct": 77.53,
                    "count": 4,
                    "lastSeenDaysAgo": 47,
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
                    "price": 410167,
                    "distancePct": 76.96,
                    "count": 3,
                    "lastSeenDaysAgo": 45,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 407500,
                    "bandHigh": 413000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 420900,
                    "distancePct": 76.35,
                    "count": 5,
                    "lastSeenDaysAgo": 45,
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
                    "distancePct": 75.75,
                    "count": 6,
                    "lastSeenDaysAgo": 44,
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
                    "distancePct": 74.71,
                    "count": 10,
                    "lastSeenDaysAgo": 42,
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
                    "distancePct": 74.11,
                    "count": 5,
                    "lastSeenDaysAgo": 42,
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
                    "distancePct": 71.07,
                    "count": 2,
                    "lastSeenDaysAgo": 40,
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
                    "distancePct": 68.17,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
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
                    "distancePct": 65.54,
                    "count": 2,
                    "lastSeenDaysAgo": 35,
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
                    "distancePct": 64.02,
                    "count": 2,
                    "lastSeenDaysAgo": 34,
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
                    "distancePct": 61.88,
                    "count": 3,
                    "lastSeenDaysAgo": 32,
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
                    "distancePct": 56.63,
                    "count": 5,
                    "lastSeenDaysAgo": 28,
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
                    "distancePct": 55.36,
                    "count": 3,
                    "lastSeenDaysAgo": 27,
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
                    "distancePct": 54.34,
                    "count": 3,
                    "lastSeenDaysAgo": 25,
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
                    "distancePct": 53.22,
                    "count": 3,
                    "lastSeenDaysAgo": 25,
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
                    "distancePct": 51.88,
                    "count": 2,
                    "lastSeenDaysAgo": 20,
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
                    "distancePct": 49.77,
                    "count": 5,
                    "lastSeenDaysAgo": 19,
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
                    "distancePct": 48.38,
                    "count": 7,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": 46.21,
                    "count": 2,
                    "lastSeenDaysAgo": 14,
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
                    "distancePct": 44.75,
                    "count": 2,
                    "lastSeenDaysAgo": 14,
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
                    "distancePct": 43.54,
                    "count": 2,
                    "lastSeenDaysAgo": 16,
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
                    "distancePct": 42.25,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
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
                    "distancePct": 32.36,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
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
                    "price": 1564500,
                    "distancePct": 12.11,
                    "count": 4,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1552000,
                    "bandHigh": 1580000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1622500,
                    "distancePct": 8.85,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1615000,
                    "bandHigh": 1630000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1661500,
                    "distancePct": 6.66,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1659000,
                    "bandHigh": 1664000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1714000,
                    "distancePct": 3.71,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1707000,
                    "bandHigh": 1719000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1751500,
                    "distancePct": 1.6,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1746000,
                    "bandHigh": 1757000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1988000,
                    "distancePct": -11.69,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1970000,
                    "bandHigh": 2005000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 421667,
                    "distancePct": 76.31,
                    "count": 13,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 25,
                    "volume": 8348141,
                    "binIndex": 0,
                    "binLow": 384000,
                    "binHigh": 459333
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1024333,
                    "distancePct": 42.45,
                    "count": 6,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": 0.13,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
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
                    "distancePct": 49.49,
                    "count": 1,
                    "lastSeenDaysAgo": 19,
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
                    "distancePct": 48.09,
                    "count": 1,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": 12.7,
                    "count": 1,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 222.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 188% (7일 전)",
                "burstCount": 0,
                "maxRatioPct": 187.8,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 88.70, ATR10 13.13%, 일간 표준편차 8.75%, 당일 레인지 10.10%.",
              "metrics": {
                "atrPct10": 13.13,
                "returnStd20": 8.75,
                "todayRangePct": 10.1,
                "vkospi": 88.7
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
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 2036000,
              "ma10Price": 1831100,
              "ma10PrevPrice": 1810300,
              "ma20Price": 1476350,
              "ma20PrevPrice": 1432350,
              "ma10WarningPrice": null,
              "hardStopPrice": 1476350,
              "fallbackStopPrice": 1735500,
              "effectiveStopPrice": 1735500,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 1,476,350원) = 1,476,350원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,735,500원) = 1,735,500원 / 제외: 앵커 몸통 중심 2,036,000원가 현재가 1,780,000원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(20일선 1,476,350원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,735,500원를 하한으로 유지합니다. 앵커 몸통 중심 2,036,000원가 현재가 1,780,000원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.0% 도달",
                "quantity": "40% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "1,797,800원",
                "historicalHitRate": 0.6698,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,815,600원",
                "historicalHitRate": 0.5377,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+3.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "1,842,300원",
                "historicalHitRate": 0.4057,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,735,500원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,735,500원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1752410,
              "high": 1770210,
              "anchor": 1780000,
              "label": "1,752,410~1,770,210원 (종가 ±, 분할매수)"
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
                    "condition": "+1.0% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,797,800원",
                    "historicalHitRate": 0.6698,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,815,600원",
                    "historicalHitRate": 0.5377,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,842,300원",
                    "historicalHitRate": 0.4057,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,735,500원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,735,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 106건)",
                  "hitRate": 0.6698,
                  "ev": 4.11,
                  "sampleCount": 106
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
                    "condition": "+1.0% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,797,800원",
                    "historicalHitRate": 0.6698,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,815,600원",
                    "historicalHitRate": 0.5377,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,842,300원",
                    "historicalHitRate": 0.4057,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,735,500원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,735,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 106건)",
                  "hitRate": 0.6698,
                  "ev": 4.11,
                  "sampleCount": 106
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 29건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,797,800원",
                    "historicalHitRate": 0.6698,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,815,600원",
                    "historicalHitRate": 0.5377,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,842,300원",
                    "historicalHitRate": 0.4057,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,735,500원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,735,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 106건)",
                  "hitRate": 0.6698,
                  "ev": 4.11,
                  "sampleCount": 106
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 29건)",
              "sampleCount": 29,
              "ev": 0.0183
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 106건)",
              "hitRate": 0.6698,
              "ev": 4.11,
              "sampleCount": 106
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G0",
              "핵심 Gate 미충족: G7",
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G0, G7, G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 188% (필요 ≥ 200%) · 외 2건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 188% (필요 ≥ 200%) / G7 미충족: 주봉 RSI 91.8 (필요 ≤ 80) · 과매수 과열 / G8 미충족: 이격 20MA +20.6% (필요 ≤ +25%) · 60MA +98.4% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1780000.0,
                "vs52wHighPct": 81.2043795620438,
                "vs52wLowPct": 1335.483870967742,
                "dropFrom52wHighPct": 18.795620437956202,
                "ma20GapPct": 20.567616080197784,
                "rsi14": 62.62920082832398,
                "volumeRatio20d": 74.90041200371375,
                "rs20Pct": 97.77777777777777,
                "supportDistancePct": 0.87,
                "tradingValueRank": 4.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 132.9548,
                "per": 168.13,
                "pbr": 13.7,
                "cnsPer": 107.57,
                "foreignRate": 37.8,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 6.8,
            "signalScore": 6.8,
            "score": 6.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.8,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 21위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -33,366주 / 기관 28,740주 · 당일 순매수"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 1,039,000 · 이평선 터치: 5MA, 10MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,062,000 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.82 (필요 ≥ 1.0)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 59% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -6.41% / KOSPI -6.22% underperform"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G8)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 240% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,125,400 > 20MA 1,003,450 > 60MA 604,058 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,062,000 / 60MA 604,058",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 77.5 (필요 ≥ 50)",
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
                "note": "KOSPI 7,593 / 5MA 7,995 (-5.0%) · VKOSPI 88.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -6.60% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 77.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +5.8% (필요 ≤ +25%) · 60MA +75.8% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
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
                "note": "당일 거래대금 순위 21위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -33,366주 / 기관 28,740주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,039,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,062,000 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 59% (필요 ≤ 80%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.82 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -6.41% / KOSPI -6.22% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1062000,
            "previousClose": 1137000,
            "dailyChange": -75000,
            "dailyChangePct": -6.6,
            "dailyDirection": "down",
            "entryPriceText": "1,062,000원 (당일 종가 기준)",
            "entryPrice": 1062000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 25.1345,
            "marketCapRank": 33,
            "marketCapUniverseCount": 2559,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -33,366주 / 기관 28,740주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "pullbackContext": {
              "support": {
                "summary": "주지지 595,088원 (43.97% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 595088,
                    "distancePct": 43.97,
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
                    "lastSeenDaysAgo": 21,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 339147,
                    "distancePct": 68.07,
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
                    "lastSeenDaysAgo": 37,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1036500,
                    "distancePct": 2.4,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1068000,
                    "distancePct": -0.56,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 981000,
                    "distancePct": 7.63,
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
                  "price": 595088,
                  "distancePct": 43.97,
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
                  "lastSeenDaysAgo": 21,
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
                    "price": 249750,
                    "distancePct": 76.48,
                    "count": 2,
                    "lastSeenDaysAgo": 58,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 249500,
                    "bandHigh": 250000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 254667,
                    "distancePct": 76.02,
                    "count": 2,
                    "lastSeenDaysAgo": 57,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 254000,
                    "bandHigh": 255500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 259750,
                    "distancePct": 75.54,
                    "count": 2,
                    "lastSeenDaysAgo": 55,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 259500,
                    "bandHigh": 260000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 277750,
                    "distancePct": 73.85,
                    "count": 2,
                    "lastSeenDaysAgo": 52,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 277500,
                    "bandHigh": 278000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 289833,
                    "distancePct": 72.71,
                    "count": 5,
                    "lastSeenDaysAgo": 47,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 286000,
                    "bandHigh": 293500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 298400,
                    "distancePct": 71.9,
                    "count": 5,
                    "lastSeenDaysAgo": 48,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 296000,
                    "bandHigh": 301500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 313250,
                    "distancePct": 70.5,
                    "count": 2,
                    "lastSeenDaysAgo": 46,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 313000,
                    "bandHigh": 313500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 321643,
                    "distancePct": 69.71,
                    "count": 5,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 318500,
                    "bandHigh": 325500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 339200,
                    "distancePct": 68.06,
                    "count": 4,
                    "lastSeenDaysAgo": 40,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 335500,
                    "bandHigh": 343000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 348000,
                    "distancePct": 67.23,
                    "count": 2,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 347000,
                    "bandHigh": 349000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 359833,
                    "distancePct": 66.12,
                    "count": 2,
                    "lastSeenDaysAgo": 37,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 358000,
                    "bandHigh": 361500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 373000,
                    "distancePct": 64.88,
                    "count": 4,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 370500,
                    "bandHigh": 376500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 380667,
                    "distancePct": 64.16,
                    "count": 3,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 379000,
                    "bandHigh": 383000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 394250,
                    "distancePct": 62.88,
                    "count": 2,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 394000,
                    "bandHigh": 394500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 409250,
                    "distancePct": 61.46,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 409000,
                    "bandHigh": 409500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 500000,
                    "distancePct": 52.92,
                    "count": 2,
                    "lastSeenDaysAgo": 30,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 500000,
                    "bandHigh": 500000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 519500,
                    "distancePct": 51.08,
                    "count": 2,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 517000,
                    "bandHigh": 522000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 539000,
                    "distancePct": 49.25,
                    "count": 2,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 536000,
                    "bandHigh": 542000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 572200,
                    "distancePct": 46.12,
                    "count": 4,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 568000,
                    "bandHigh": 577000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 593500,
                    "distancePct": 44.11,
                    "count": 4,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 592000,
                    "bandHigh": 595000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 608000,
                    "distancePct": 42.75,
                    "count": 2,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 606000,
                    "bandHigh": 610000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 633000,
                    "distancePct": 40.4,
                    "count": 4,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 624000,
                    "bandHigh": 639000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 675000,
                    "distancePct": 36.44,
                    "count": 2,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 673000,
                    "bandHigh": 677000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 692000,
                    "distancePct": 34.84,
                    "count": 2,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 688000,
                    "bandHigh": 696000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 711000,
                    "distancePct": 33.05,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 710000,
                    "bandHigh": 712000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 748500,
                    "distancePct": 29.52,
                    "count": 2,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 744000,
                    "bandHigh": 753000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 764000,
                    "distancePct": 28.06,
                    "count": 5,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 760000,
                    "bandHigh": 771000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 981000,
                    "distancePct": 7.63,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 976000,
                    "bandHigh": 986000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1039000,
                    "distancePct": 2.17,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1034000,
                    "bandHigh": 1044000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1068000,
                    "distancePct": -0.56,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1062000,
                    "bandHigh": 1074000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1141400,
                    "distancePct": -7.48,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1134000,
                    "bandHigh": 1150000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1166500,
                    "distancePct": -9.84,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1160000,
                    "bandHigh": 1173000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 339094,
                    "distancePct": 68.07,
                    "count": 14,
                    "lastSeenDaysAgo": 37,
                    "valid": true,
                    "weight": 25,
                    "volume": 4226552,
                    "binIndex": 1,
                    "binLow": 306896,
                    "binHigh": 371292
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1111844,
                    "distancePct": -4.69,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": false,
                    "weight": 25,
                    "volume": 3592142,
                    "binIndex": 13,
                    "binLow": 1079646,
                    "binHigh": 1144042
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 596677,
                    "distancePct": 43.82,
                    "count": 6,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 25,
                    "volume": 1750809,
                    "binIndex": 5,
                    "binLow": 564479,
                    "binHigh": 628875
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 1011000,
                    "distancePct": 4.8,
                    "count": 1,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 235.1,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 1034000,
                    "distancePct": 2.64,
                    "count": 1,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 282.7,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 240% (6일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 239.6,
                "latestBurstDaysAgo": 6
              }
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 88.70, ATR10 18.54%, 일간 표준편차 10.11%, 당일 레인지 10.99%.",
              "metrics": {
                "atrPct10": 18.54,
                "returnStd20": 10.11,
                "todayRangePct": 10.99,
                "vkospi": 88.7
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
              "anchorOpen": 1193000,
              "anchorClose": 1458000,
              "anchorHigh": 1474000,
              "anchorLow": 1145000,
              "anchorBodyMid": 1325500,
              "anchorVolumeRatio": 3.49,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 1325500,
              "ma10Price": 1204500,
              "ma10PrevPrice": 1205100,
              "ma20Price": 1003450,
              "ma20PrevPrice": 984750,
              "ma10WarningPrice": 1204500,
              "hardStopPrice": 1003450,
              "fallbackStopPrice": 1035450,
              "effectiveStopPrice": 1035450,
              "warningRuleSummary": "종가 1,062,000원 < 10일선 1,204,500원 and 10일선 1,204,500원 <= 전일 10일선 1,205,100원",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 1,003,450원) = 1,003,450원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,035,450원) = 1,035,450원 / 제외: 앵커 몸통 중심 1,325,500원가 현재가 1,062,000원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(20일선 1,003,450원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,035,450원를 하한으로 유지합니다. 앵커 몸통 중심 1,325,500원가 현재가 1,062,000원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "5일선 저항 도달",
                "quantity": "40% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,125,400원",
                "historicalHitRate": 0.6698,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "10일선 저항 도달",
                "quantity": "35% 익절",
                "targetYield": "+13.4%",
                "targetPrice": "1,204,500원",
                "historicalHitRate": 0.5377,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+3.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+13.4%",
                "targetPrice": "1,204,500원",
                "historicalHitRate": 0.4057,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,035,450원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,035,450원"
              }
            ],
            "rr": "1 : 4.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1045539,
              "high": 1056159,
              "anchor": 1062000,
              "label": "1,045,539~1,056,159원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1125400,
                "secondaryResistanceType": "ma10",
                "secondaryResistancePrice": 1204500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,072,620원",
                    "historicalHitRate": 0.6698,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,083,240원",
                    "historicalHitRate": 0.5377,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,099,170원",
                    "historicalHitRate": 0.4057,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,035,450원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,035,450원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 106건)",
                  "hitRate": 0.6698,
                  "ev": 4.11,
                  "sampleCount": 106
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "5일선이 기존 1차 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1125400,
                "secondaryResistanceType": "ma10",
                "secondaryResistancePrice": 1204500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,072,620원",
                    "historicalHitRate": 0.6698,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,083,240원",
                    "historicalHitRate": 0.5377,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,099,170원",
                    "historicalHitRate": 0.4057,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,035,450원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,035,450원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 106건)",
                  "hitRate": 0.6698,
                  "ev": 4.11,
                  "sampleCount": 106
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 29건)",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1125400,
                "secondaryResistanceType": "ma10",
                "secondaryResistancePrice": 1204500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,125,400원",
                    "historicalHitRate": 0.6698,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "10일선 저항 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+13.4%",
                    "targetPrice": "1,204,500원",
                    "historicalHitRate": 0.5377,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+13.4%",
                    "targetPrice": "1,204,500원",
                    "historicalHitRate": 0.4057,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,035,450원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,035,450원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 106건)",
                  "hitRate": 0.6698,
                  "ev": 4.11,
                  "sampleCount": 106
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 29건)",
              "sampleCount": 29,
              "ev": 0.0183
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 106건)",
              "hitRate": 0.6698,
              "ev": 4.11,
              "sampleCount": 106
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G8 미충족: 이격 20MA +5.8% (필요 ≤ +25%) · 60MA +75.8% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
            "statusReason": "G8 미충족: 이격 20MA +5.8% (필요 ≤ +25%) · 60MA +75.8% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1062000.0,
                "vs52wHighPct": 58.54465270121278,
                "vs52wLowPct": 658.0299785867238,
                "dropFrom52wHighPct": 41.45534729878721,
                "ma20GapPct": 5.834869699536599,
                "rsi14": 56.50422479404869,
                "volumeRatio20d": 69.77956707502823,
                "rs20Pct": 54.360465116279066,
                "supportDistancePct": 43.97,
                "tradingValueRank": 21.0,
                "marketCapRank": 33.0,
                "marketCapTrillion": 25.1345,
                "per": 51.85,
                "pbr": 4.13,
                "cnsPer": 31.11,
                "foreignRate": 23.02,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "후성",
            "code": "093370",
            "strictScore": 4.6,
            "signalScore": 5.4,
            "score": 5.4,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 4.0,
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
                "note": "외인 1,882,011주 / 기관 330,988주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 101.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 95.1% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 1392% · 폭발적 급증 (≥300%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 95.1% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 55% / 윗꼬리·몸통 0.52 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.2)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G6)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +63.6% / 20일 초과 +21.2%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 95.1% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 20",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 1392% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 55% / 윗꼬리·몸통 0.52 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "⛔",
                "note": "당일 등락 +17.31% (필요 ≤ +12%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 15,860 / 5MA 12,744 (전일 5MA 11,688) · 5MA 위·우상향",
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
                "note": "외인 1,882,011주 / 기관 330,988주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 95.1% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 1392% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 95.1% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 101.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 55% / 윗꼬리·몸통 0.52 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 15860,
            "previousClose": 13520,
            "dailyChange": 2340,
            "dailyChangePct": 17.31,
            "dailyDirection": "up",
            "entryPriceText": "15,860원 (당일 종가 기준)",
            "entryPrice": 15860,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.7010999999999998,
            "marketCapRank": 243,
            "marketCapUniverseCount": 2559,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 1,882,011주 / 기관 330,988주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 101.0,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A093370/order",
              "asOf": "2026-06-10T06:02:10Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 218.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 218.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.8891,
              "last30BuyVolume": 12889.0,
              "last30SellVolume": 6823.0
            },
            "orderbook": {
              "bidAskRatio": 0.6238,
              "bidTotal": 17854,
              "askTotal": 28621,
              "note": "Naver 호가잔량합계 매수 17,854 / 매도 28,621",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=093370"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 88.70, ATR10 12.04%, 일간 표준편차 8.48%, 당일 레인지 21.15%.",
              "metrics": {
                "atrPct10": 12.04,
                "returnStd20": 8.48,
                "todayRangePct": 21.15,
                "vkospi": 88.7
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
              "referencePrice": 15420,
              "referenceBandLow": 15420,
              "referenceBandHigh": 15420,
              "entryDayOpenPrice": 14290,
              "fallbackStopPrice": 15226,
              "effectiveHardStopPrice": 15420,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 15,420원와 기존 % 손절 15,226원 중 더 높은 15,420원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 15,420원이며, 기존 % 손절 15,226원보다 느슨해지지 않게 15,420원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.1%",
                "targetPrice": "16,670원",
                "historicalHitRate": 0.5918,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.1%",
                "targetPrice": "16,670원",
                "historicalHitRate": 0.4082,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "16,732원",
                "historicalHitRate": 0.3367,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+7.5%",
                "targetPrice": "17,050원",
                "historicalHitRate": 0.2857,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 15,420원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.8%",
                "targetPrice": "15,420원"
              }
            ],
            "rr": "1 : 2.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 15614,
              "high": 15773,
              "anchor": 15860,
              "label": "15,614~15,773원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "16,098원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "16,415원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "16,732원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "17,050원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,420원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.8%",
                    "targetPrice": "15,420원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 98건)",
                  "hitRate": 0.2857,
                  "ev": 1.688,
                  "sampleCount": 98
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "16,098원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "16,415원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "16,732원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "17,050원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,420원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.8%",
                    "targetPrice": "15,420원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 98건)",
                  "hitRate": 0.2857,
                  "ev": 1.688,
                  "sampleCount": 98
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 11건)",
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.1%",
                    "targetPrice": "16,670원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.1%",
                    "targetPrice": "16,670원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "16,732원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "17,050원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,420원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.8%",
                    "targetPrice": "15,420원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 98건)",
                  "hitRate": 0.2857,
                  "ev": 1.688,
                  "sampleCount": 98
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 11건)",
              "sampleCount": 11,
              "ev": 0.5089
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 98건)",
              "hitRate": 0.2857,
              "ev": 1.688,
              "sampleCount": 98
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
              "핵심 Gate 미충족: G6",
              "매매금지(핵심 Gate 미충족: G6)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G6 미충족: 당일 등락 +17.31% (필요 ≤ +12%)",
            "statusReason": "G6 미충족: 당일 등락 +17.31% (필요 ≤ +12%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 15860.0,
                "vs52wHighPct": 95.14097180563887,
                "vs52wLowPct": 248.57142857142858,
                "dropFrom52wHighPct": 4.8590281943611275,
                "ma20GapPct": 30.06396588486141,
                "rsi14": 67.68193264316942,
                "volumeRatio20d": 1392.045049269473,
                "rs20Pct": 18.26994780014914,
                "tradingValueRank": 20.0,
                "marketCapRank": 243.0,
                "marketCapTrillion": 1.7010999999999998,
                "per": 0.0,
                "pbr": 4.95,
                "cnsPer": 0.0,
                "foreignRate": 9.35,
                "supplyTrendScore": 4.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
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
                "note": "외인 38,142주 / 기관 17,814주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 112.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 83.2% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 66% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 94.1% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 57% / 윗꼬리·몸통 0.40 · 강마감 약충족"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 13.07 (필요 ≥ 1.2) · 매수 잔량 우위"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G2, G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 -0.2% / 20일 초과 +0.5%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 83.2% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 12",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 66% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 57% / 윗꼬리·몸통 0.40 · 강마감 약충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -8.75% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 1,158,000 / 5MA 1,232,800 (전일 5MA 1,270,400) · 5MA 조건 미충족",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 38,142주 / 기관 17,814주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 112.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 13.07 (필요 ≥ 1.2) · 매수 잔량 우위",
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
                "code": "P1",
                "note": "20일 고점 대비 83.2% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 66% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 94.1% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 57% / 윗꼬리·몸통 0.40 · 강마감 약충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 1158000,
            "previousClose": 1269000,
            "dailyChange": -111000,
            "dailyChangePct": -8.75,
            "dailyDirection": "down",
            "entryPriceText": "1,158,000원 (당일 종가 기준)",
            "entryPrice": 1158000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 152.8078,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2559,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 38,142주 / 기관 17,814주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 112.0,
              "note": "토스 공개 체결강도 112.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-10T06:02:07Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 201.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 201.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.3183,
              "last30BuyVolume": 845.0,
              "last30SellVolume": 641.0
            },
            "orderbook": {
              "bidAskRatio": 13.0694,
              "bidTotal": 2823,
              "askTotal": 216,
              "note": "Naver 호가잔량합계 매수 2,823 / 매도 216",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=402340"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 88.70, ATR10 9.92%, 일간 표준편차 6.81%, 당일 레인지 7.25%.",
              "metrics": {
                "atrPct10": 9.92,
                "returnStd20": 6.81,
                "todayRangePct": 7.25,
                "vkospi": 88.7
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
              "referencePrice": 1149000,
              "referenceBandLow": 1149000,
              "referenceBandHigh": 1149000,
              "entryDayOpenPrice": 1210000,
              "fallbackStopPrice": 1111680,
              "effectiveHardStopPrice": 1149000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 1,149,000원와 기존 % 손절 1,111,680원 중 더 높은 1,149,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 1,149,000원이며, 기존 % 손절 1,111,680원보다 느슨해지지 않게 1,149,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,181,000원",
                "historicalHitRate": 0.5918,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "1,231,000원",
                "historicalHitRate": 0.4082,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "1,231,000원",
                "historicalHitRate": 0.3367,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+7.5%",
                "targetPrice": "1,244,850원",
                "historicalHitRate": 0.2857,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,149,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.8%",
                "targetPrice": "1,149,000원"
              }
            ],
            "rr": "1 : 6.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1140051,
              "high": 1151631,
              "anchor": 1158000,
              "label": "1,140,051~1,151,631원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,175,370원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,198,530원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,221,690원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "1,244,850원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,149,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.8%",
                    "targetPrice": "1,149,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 98건)",
                  "hitRate": 0.2857,
                  "ev": 1.688,
                  "sampleCount": 98
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,175,370원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,198,530원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,221,690원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "1,244,850원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,149,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.8%",
                    "targetPrice": "1,149,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 98건)",
                  "hitRate": 0.2857,
                  "ev": 1.688,
                  "sampleCount": 98
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 11건)",
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,181,000원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "1,244,850원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,149,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.8%",
                    "targetPrice": "1,149,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 98건)",
                  "hitRate": 0.2857,
                  "ev": 1.688,
                  "sampleCount": 98
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 11건)",
              "sampleCount": 11,
              "ev": 0.5089
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 98건)",
              "hitRate": 0.2857,
              "ev": 1.688,
              "sampleCount": 98
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
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G2, G4)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 52주 고가 대비 83.2% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 83.2% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 66% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1158000.0,
                "vs52wHighPct": 83.1896551724138,
                "vs52wLowPct": 801.1673151750973,
                "dropFrom52wHighPct": 16.810344827586206,
                "ma20GapPct": -2.6236125126135215,
                "rsi14": 52.545497969784634,
                "volumeRatio20d": 66.38513882677196,
                "rs20Pct": -2.443133951137321,
                "tradingValueRank": 12.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 152.8078,
                "per": 9.83,
                "pbr": 4.23,
                "cnsPer": 4.2,
                "foreignRate": 49.25,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 7.9,
            "signalScore": 7.9,
            "score": 7.9,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 6.6,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 142,488주 / 기관 23,531주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +142,488 / 전일 -63,958 · 기관 당일 +23,531 / 전일 +44,739 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 159.4% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 75.0% / 마지막 1시간 159.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 120.6% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,777,400 / 20MA 1,476,350 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 75% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -9.64% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -5.90% / KOSPI -6.22% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.68:1 · 평균 체결강도 159.4% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -63,958/당일 +142,488 · 기관 전일 +44,739/당일 +23,531 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,780,000 / 60MA 897,267",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 81.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 4",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 75% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,593 / 5MA 7,995 (-5.0%) · VKOSPI 88.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 142,488주 / 기관 23,531주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +142,488 / 전일 -63,958 · 기관 당일 +23,531 / 전일 +44,739 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 159.4% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 75.0% / 마지막 1시간 159.4% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,777,400 / 20MA 1,476,350 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 75% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.90% / KOSPI -6.22% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.68:1 · 평균 체결강도 159.4% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 120.6% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -9.64% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1780000,
            "previousClose": 1970000,
            "dailyChange": -190000,
            "dailyChangePct": -9.64,
            "dailyDirection": "down",
            "entryPriceText": "1,780,000원 (당일 종가 기준)",
            "entryPrice": 1780000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 132.9548,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2559,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 142,488주 / 기관 23,531주 / 마지막 1시간 159.4% · 장후반 매수세 강화 · 마지막 30분 틱 1.68:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 75.0,
              "note": "토스 공개 체결강도 75.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-06-10T06:02:07Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 159.4,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 159.4,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.6822,
              "last30BuyVolume": 360.0,
              "last30SellVolume": 214.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 88.70, ATR10 13.13%, 일간 표준편차 8.75%, 당일 레인지 10.10%.",
              "metrics": {
                "atrPct10": 13.13,
                "returnStd20": 8.75,
                "todayRangePct": 10.1,
                "vkospi": 88.7
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
                "quantity": "25% 익절",
                "targetYield": "+3.6%",
                "targetPrice": "1,844,000원",
                "historicalHitRate": 0.6643,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.6%",
                "targetPrice": "1,880,000원",
                "historicalHitRate": 0.3714,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.6%",
                "targetPrice": "1,880,000원",
                "historicalHitRate": 0.2214,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,886,800원",
                "historicalHitRate": 0.1286,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,762,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.0%",
                "targetPrice": "1,762,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260609",
              "anchorOpen": 1762000,
              "anchorClose": 1970000,
              "anchorVolumeRatio20d": 1.09,
              "anchorStopPrice": 1762000,
              "fallbackStopPrice": 1726600,
              "effectiveHardStopPrice": 1762000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,762,000원와 기존 % 손절 1,726,600원 중 더 높은 1,762,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 1,762,000원를 기준으로 잡고, 기존 % 손절 1,726,600원보다 느슨해지지 않게 1,762,000원로 고정합니다."
            },
            "rr": "1 : 5.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1752410,
              "high": 1770210,
              "anchor": 1780000,
              "label": "1,752,410~1,770,210원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1844000,
                "secondaryResistancePrice": 1880000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,797,800원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,824,500원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,860,100원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,886,800원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,762,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.0%",
                    "targetPrice": "1,762,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 1844000,
                "secondaryResistancePrice": 1880000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,797,800원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,824,500원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,860,100원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,886,800원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,762,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.0%",
                    "targetPrice": "1,762,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
                "nearestResistancePrice": 1844000,
                "secondaryResistancePrice": 1880000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.6%",
                    "targetPrice": "1,844,000원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.6%",
                    "targetPrice": "1,880,000원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.6%",
                    "targetPrice": "1,880,000원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,886,800원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,762,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.0%",
                    "targetPrice": "1,762,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
              "sampleCount": 30,
              "ev": 1.1107
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 140건)",
              "hitRate": 0.6643,
              "ev": 0.17,
              "sampleCount": 140
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1780000.0,
                "vs52wHighPct": 81.2043795620438,
                "vs52wLowPct": 1335.483870967742,
                "dropFrom52wHighPct": 18.795620437956202,
                "ma20GapPct": 20.567616080197784,
                "rsi14": 62.62920082832398,
                "volumeRatio20d": 74.90041200371375,
                "rs20Pct": 97.77777777777777,
                "tradingValueRank": 4.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 132.9548,
                "per": 168.13,
                "pbr": 13.7,
                "cnsPer": 107.57,
                "foreignRate": 37.8,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 7.9,
            "signalScore": 7.9,
            "score": 7.9,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 6.6,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 38,142주 / 기관 17,814주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +38,142 / 전일 +7,021 · 기관 당일 +17,814 / 전일 -24,451 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 201.7% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 112.0% / 마지막 1시간 201.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 97.4% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,232,800 / 20MA 1,189,200 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 73% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -8.75% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -3.01% / KOSPI -6.22% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.32:1 · 평균 체결강도 201.7% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 +7,021/당일 +38,142 · 기관 전일 -24,451/당일 +17,814 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,158,000 / 60MA 848,017",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 83.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 12",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 66% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,593 / 5MA 7,995 (-5.0%) · VKOSPI 88.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 38,142주 / 기관 17,814주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +38,142 / 전일 +7,021 · 기관 당일 +17,814 / 전일 -24,451 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 201.7% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 112.0% / 마지막 1시간 201.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,232,800 / 20MA 1,189,200 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 73% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.01% / KOSPI -6.22% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.32:1 · 평균 체결강도 201.7% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 97.4% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -8.75% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1158000,
            "previousClose": 1269000,
            "dailyChange": -111000,
            "dailyChangePct": -8.75,
            "dailyDirection": "down",
            "entryPriceText": "1,158,000원 (당일 종가 기준)",
            "entryPrice": 1158000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 152.8078,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2559,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 38,142주 / 기관 17,814주 / 마지막 1시간 201.7% · 장후반 매수세 강화 · 마지막 30분 틱 1.32:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 112.0,
              "note": "토스 공개 체결강도 112.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-10T06:02:07Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 201.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 201.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.3183,
              "last30BuyVolume": 845.0,
              "last30SellVolume": 641.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 88.70, ATR10 9.92%, 일간 표준편차 6.81%, 당일 레인지 7.25%.",
              "metrics": {
                "atrPct10": 9.92,
                "returnStd20": 6.81,
                "todayRangePct": 7.25,
                "vkospi": 88.7
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
                "quantity": "25% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,181,000원",
                "historicalHitRate": 0.6643,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "1,231,000원",
                "historicalHitRate": 0.3714,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "1,231,000원",
                "historicalHitRate": 0.2214,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "1,231,000원",
                "historicalHitRate": 0.1286,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,173,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "+1.3%",
                "targetPrice": "1,173,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260609",
              "anchorOpen": 1173000,
              "anchorClose": 1269000,
              "anchorVolumeRatio20d": 0.85,
              "anchorStopPrice": 1173000,
              "fallbackStopPrice": 1123260,
              "effectiveHardStopPrice": 1173000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,173,000원와 기존 % 손절 1,123,260원 중 더 높은 1,173,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 1,173,000원를 기준으로 잡고, 기존 % 손절 1,123,260원보다 느슨해지지 않게 1,173,000원로 고정합니다."
            },
            "rr": "1 : 4.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1140051,
              "high": 1151631,
              "anchor": 1158000,
              "label": "1,140,051~1,151,631원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,169,580원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,186,950원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,210,110원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,227,480원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,173,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+1.3%",
                    "targetPrice": "1,173,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,169,580원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,186,950원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,210,110원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,227,480원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,173,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+1.3%",
                    "targetPrice": "1,173,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,181,000원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,173,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+1.3%",
                    "targetPrice": "1,173,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
              "sampleCount": 30,
              "ev": 1.1107
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 140건)",
              "hitRate": 0.6643,
              "ev": 0.17,
              "sampleCount": 140
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1158000.0,
                "vs52wHighPct": 83.1896551724138,
                "vs52wLowPct": 801.1673151750973,
                "dropFrom52wHighPct": 16.810344827586206,
                "ma20GapPct": -2.6236125126135215,
                "rsi14": 52.545497969784634,
                "volumeRatio20d": 66.38513882677196,
                "rs20Pct": -2.443133951137321,
                "tradingValueRank": 12.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 152.8078,
                "per": 9.83,
                "pbr": 4.23,
                "cnsPer": 4.2,
                "foreignRate": 49.25,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "후성",
            "code": "093370",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 12.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 5.9,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 1,882,011주 / 기관 330,988주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +1,882,011 / 전일 +51,473 · 기관 당일 +330,988 / 전일 +156,610 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 218.5% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 101.0% / 마지막 1시간 218.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 130.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 12,744 / 20MA 12,194 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 866% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 +17.31% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -3.53% / KOSPI -6.22% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.89:1 · 평균 체결강도 218.5% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 +51,473/당일 +1,882,011 · 기관 전일 +156,610/당일 +330,988 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 15,860 / 60MA 10,975",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⚠️",
                "note": "52주 고가 대비 95.1% (필요 < 92%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 20",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 1392% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,593 / 5MA 7,995 (-5.0%) · VKOSPI 88.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 1,882,011주 / 기관 330,988주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +1,882,011 / 전일 +51,473 · 기관 당일 +330,988 / 전일 +156,610 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 218.5% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 101.0% / 마지막 1시간 218.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 12,744 / 20MA 12,194 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.53% / KOSPI -6.22% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.89:1 · 평균 체결강도 218.5% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 130.1% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 866% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +17.31% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 15860,
            "previousClose": 13520,
            "dailyChange": 2340,
            "dailyChangePct": 17.31,
            "dailyDirection": "up",
            "entryPriceText": "15,860원 (당일 종가 기준)",
            "entryPrice": 15860,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.7010999999999998,
            "marketCapRank": 243,
            "marketCapUniverseCount": 2559,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 1,882,011주 / 기관 330,988주 / 마지막 1시간 218.5% · 장후반 매수세 강화 · 마지막 30분 틱 1.89:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 101.0,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A093370/order",
              "asOf": "2026-06-10T06:02:10Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 218.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 218.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.8891,
              "last30BuyVolume": 12889.0,
              "last30SellVolume": 6823.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 88.70, ATR10 12.04%, 일간 표준편차 8.48%, 당일 레인지 21.15%.",
              "metrics": {
                "atrPct10": 12.04,
                "returnStd20": 8.48,
                "todayRangePct": 21.15,
                "vkospi": 88.7
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
                "quantity": "25% 익절",
                "targetYield": "+5.1%",
                "targetPrice": "16,670원",
                "historicalHitRate": 0.6643,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "+2.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.1%",
                "targetPrice": "16,670원",
                "historicalHitRate": 0.3714,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.1%",
                "targetPrice": "16,670원",
                "historicalHitRate": 0.2214,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "16,812원",
                "historicalHitRate": 0.1286,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 15,384원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "15,384원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260609",
              "anchorOpen": 11630,
              "anchorClose": 13520,
              "anchorVolumeRatio20d": 5.62,
              "anchorStopPrice": 11630,
              "fallbackStopPrice": 15384,
              "effectiveHardStopPrice": 15384,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 11,630원와 기존 % 손절 15,384원 중 더 높은 15,384원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 11,630원를 기준으로 잡고, 기존 % 손절 15,384원보다 느슨해지지 않게 15,384원로 고정합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 15614,
              "high": 15773,
              "anchor": 15860,
              "label": "15,614~15,773원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "16,019원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "16,256원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "16,574원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "16,812원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,384원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "15,384원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "16,019원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "16,256원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "16,574원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "16,812원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,384원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "15,384원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.1%",
                    "targetPrice": "16,670원",
                    "historicalHitRate": 0.6643,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.1%",
                    "targetPrice": "16,670원",
                    "historicalHitRate": 0.3714,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.1%",
                    "targetPrice": "16,670원",
                    "historicalHitRate": 0.2214,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "16,812원",
                    "historicalHitRate": 0.1286,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,384원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "15,384원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 140건)",
                  "hitRate": 0.6643,
                  "ev": 0.17,
                  "sampleCount": 140
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
              "sampleCount": 30,
              "ev": 1.1107
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 140건)",
              "hitRate": 0.6643,
              "ev": 0.17,
              "sampleCount": 140
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 1392% (필요 < 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 1392% (필요 < 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 15860.0,
                "vs52wHighPct": 95.14097180563887,
                "vs52wLowPct": 248.57142857142858,
                "dropFrom52wHighPct": 4.8590281943611275,
                "ma20GapPct": 30.06396588486141,
                "rsi14": 67.68193264316942,
                "volumeRatio20d": 1392.045049269473,
                "rs20Pct": 18.26994780014914,
                "tradingValueRank": 20.0,
                "marketCapRank": 243.0,
                "marketCapTrillion": 1.7010999999999998,
                "per": 0.0,
                "pbr": 4.95,
                "cnsPer": 0.0,
                "foreignRate": 9.35,
                "supplyTrendScore": 4.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "후성",
            "code": "093370",
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 51,473→1,882,011 / 기관 156,610→330,988 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 101.0% / 마지막 1시간 218.5% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 15,860 / 20MA 12,194 (130.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 72% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 866% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 15790, 전봉 종가 15760 충족"
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
                "note": "당일 거래대금 순위 20위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 1.7조 (필요 ≥ 5조)",
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
                "note": "최근 5거래일(2026-05-31~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +20.1% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -4.9% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 15,860 / 60MA 10,975",
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
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 101.0% / 마지막 1시간 218.5% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 15,860 / 20MA 12,194 (130.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 72% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 866% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 15790, 전봉 종가 15760 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 51,473→1,882,011 / 기관 156,610→330,988 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 15860,
            "previousClose": 13520,
            "dailyChange": 2340,
            "dailyChangePct": 17.31,
            "dailyDirection": "up",
            "entryPriceText": "15,860원 (당일 종가 기준)",
            "entryPrice": 15860,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.7010999999999998,
            "marketCapRank": 243,
            "marketCapUniverseCount": 2559,
            "keyPoint": "20일 고점 대비 -4.9% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 후성 (093370) 종목 공시를 조회합니다.",
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
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 15790, 전봉 종가 15760",
              "latestOpen": 15740.0,
              "latestClose": 15790.0,
              "previousClose": 15760.0
            },
            "toss": {
              "avgStrength": 101.0,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A093370/order",
              "asOf": "2026-06-10T06:02:10Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 218.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 218.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.8891,
              "last30BuyVolume": 12889.0,
              "last30SellVolume": 6823.0
            },
            "orderbook": {
              "bidAskRatio": 0.6238,
              "bidTotal": 17854,
              "askTotal": 28621,
              "note": "Naver 호가잔량합계 매수 17,854 / 매도 28,621",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=093370"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 88.70, ATR10 12.04%, 일간 표준편차 8.48%, 당일 레인지 21.15%.",
              "metrics": {
                "atrPct10": 12.04,
                "returnStd20": 8.48,
                "todayRangePct": 21.15,
                "vkospi": 88.7
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.7%",
                "targetPrice": "16,127원",
                "historicalHitRate": 0.6917,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+2.6%",
                "targetPrice": "16,265원",
                "historicalHitRate": 0.6241,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 15,543원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "15,543원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 13810,
              "fallbackStopPrice": 15543,
              "effectiveHardStopPrice": 15543,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 13,810원와 기존 % 손절 15,543원 중 더 높은 15,543원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 13,810원이며, 기존 % 손절 15,543원보다 느슨해지지 않게 15,543원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 15614,
              "high": 15773,
              "anchor": 15860,
              "label": "15,614~15,773원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 16670,
                "retrace33Price": 16127,
                "retrace50Price": 16265,
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "16,127원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "16,265원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+5.1%",
                    "targetPrice": "16,670원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,543원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "15,543원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 16670,
                "retrace33Price": 16127,
                "retrace50Price": 16265,
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "16,127원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.6%",
                    "targetPrice": "16,265원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,543원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "15,543원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
                "recentHighPrice": 16670,
                "retrace33Price": 16127,
                "retrace50Price": 16265,
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "16,127원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.6%",
                    "targetPrice": "16,265원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,543원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "15,543원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
              "sampleCount": 30,
              "ev": 0.1036
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 133건)",
              "hitRate": 0.6917,
              "ev": 1.562,
              "sampleCount": 133
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F2",
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 1.7조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 1.7조 (필요 ≥ 5조) / G2 미충족: 20일 고점 대비 -4.9% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 15860.0,
                "vs52wHighPct": 95.14097180563887,
                "vs52wLowPct": 248.57142857142858,
                "dropFrom52wHighPct": 4.8590281943611275,
                "ma20GapPct": 30.06396588486141,
                "rsi14": 67.68193264316942,
                "volumeRatio20d": 1392.045049269473,
                "rs20Pct": 18.26994780014914,
                "tradingValueRank": 20.0,
                "marketCapRank": 243.0,
                "marketCapTrillion": 1.7010999999999998,
                "per": 0.0,
                "pbr": 4.95,
                "cnsPer": 0.0,
                "foreignRate": 9.35,
                "supplyTrendScore": 4.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.2,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 7,021→38,142 / 기관 -24,451→17,814 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 112.0% / 마지막 1시간 201.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 1,158,000 / 20MA 1,189,200 (97.4% · 필요 ≥ 98%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 21% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 73% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 13.07 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1152000, 전봉 종가 1164000 미달"
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
                "note": "당일 거래대금 순위 12위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 152.8조 (필요 ≥ 5조)",
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
                "note": "최근 손절 이력 3건 (최근: 2026-06-04) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +5.5% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -16.8% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,158,000 / 60MA 848,017",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -11.1% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "양봉·긴아래꼬리·도지 패턴 없음",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 7,021→38,142 / 기관 -24,451→17,814 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 112.0% / 마지막 1시간 201.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 13.07 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 1,158,000 / 20MA 1,189,200 (97.4% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 21% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 73% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1152000, 전봉 종가 1164000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1158000,
            "previousClose": 1269000,
            "dailyChange": -111000,
            "dailyChangePct": -8.75,
            "dailyDirection": "down",
            "entryPriceText": "1,158,000원 (당일 종가 기준)",
            "entryPrice": 1158000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 152.8078,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2559,
            "keyPoint": "20일 고점 대비 -16.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 SK스퀘어 (402340) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 1152000, 전봉 종가 1164000",
              "latestOpen": 1163000.0,
              "latestClose": 1152000.0,
              "previousClose": 1164000.0
            },
            "toss": {
              "avgStrength": 112.0,
              "note": "토스 공개 체결강도 112.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-10T06:02:07Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 201.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 201.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.3183,
              "last30BuyVolume": 845.0,
              "last30SellVolume": 641.0
            },
            "orderbook": {
              "bidAskRatio": 13.0694,
              "bidTotal": 2823,
              "askTotal": 216,
              "note": "Naver 호가잔량합계 매수 2,823 / 매도 216",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=402340"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 88.70, ATR10 9.92%, 일간 표준편차 6.81%, 당일 레인지 7.25%.",
              "metrics": {
                "atrPct10": 9.92,
                "returnStd20": 6.81,
                "todayRangePct": 7.25,
                "vkospi": 88.7
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,181,000원",
                "historicalHitRate": 0.6917,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,215,900원",
                "historicalHitRate": 0.6241,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,139,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.6%",
                "targetPrice": "1,139,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1139000,
              "fallbackStopPrice": 1134840,
              "effectiveHardStopPrice": 1139000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,139,000원와 기존 % 손절 1,134,840원 중 더 높은 1,139,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,139,000원이며, 기존 % 손절 1,134,840원보다 느슨해지지 않게 1,139,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1140051,
              "high": 1151631,
              "anchor": 1158000,
              "label": "1,140,051~1,151,631원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1235220,
                "retrace50Price": 1275000,
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,181,000원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+20.2%",
                    "targetPrice": "1,392,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,139,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.6%",
                    "targetPrice": "1,139,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1235220,
                "retrace50Price": 1275000,
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,181,000원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+6.3%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,139,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.6%",
                    "targetPrice": "1,139,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
                "recentHighPrice": 1392000,
                "retrace33Price": 1235220,
                "retrace50Price": 1275000,
                "nearestResistancePrice": 1181000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,181,000원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,215,900원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,139,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.6%",
                    "targetPrice": "1,139,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
              "sampleCount": 30,
              "ev": 0.1036
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 133건)",
              "hitRate": 0.6917,
              "ev": 1.562,
              "sampleCount": 133
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G1",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 3건 (최근: 2026-06-04) · 재진입 차단 · 외 2건",
            "statusReason": "F4 미충족: 최근 손절 이력 3건 (최근: 2026-06-04) · 재진입 차단 / G1 미충족: 1개월 수익률 +5.5% (필요 ≥ +15%) / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1158000.0,
                "vs52wHighPct": 83.1896551724138,
                "vs52wLowPct": 801.1673151750973,
                "dropFrom52wHighPct": 16.810344827586206,
                "ma20GapPct": -2.6236125126135215,
                "rsi14": 52.545497969784634,
                "volumeRatio20d": 66.38513882677196,
                "rs20Pct": -2.443133951137321,
                "tradingValueRank": 12.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 152.8078,
                "per": 9.83,
                "pbr": 4.23,
                "cnsPer": 4.2,
                "foreignRate": 49.25,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "삼성물산",
            "code": "028260",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.2,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 34,362→-26,985 / 기관 -31,752→472 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 108.0% / 마지막 1시간 296.9% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 397,500 / 20MA 425,800 (93.4% · 필요 ≥ 98%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 31% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 66% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 4.25 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 393000, 전봉 종가 396500 미달"
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
                "note": "당일 거래대금 순위 40위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 64.5조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-06-02 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "⛔",
                "note": "최근 손절 이력 1건 (최근: 2026-06-04) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -5.9% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -29.6% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 397,500 / 60MA 344,042",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -13.9% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-c",
                "status": "✅",
                "note": "도지형 안정화 캔들",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 34,362→-26,985 / 기관 -31,752→472 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 108.0% / 마지막 1시간 296.9% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 4.25 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 397,500 / 20MA 425,800 (93.4% · 필요 ≥ 98%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 31% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 66% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 393000, 전봉 종가 396500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 397500,
            "previousClose": 429000,
            "dailyChange": -31500,
            "dailyChangePct": -7.34,
            "dailyDirection": "down",
            "entryPriceText": "397,500원 (당일 종가 기준)",
            "entryPrice": 397500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 64.4616,
            "marketCapRank": 9,
            "marketCapUniverseCount": 2559,
            "keyPoint": "20일 고점 대비 -29.6% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-06-02 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 393000, 전봉 종가 396500",
              "latestOpen": 396500.0,
              "latestClose": 393000.0,
              "previousClose": 396500.0
            },
            "toss": {
              "avgStrength": 108.0,
              "note": "토스 공개 체결강도 108.0% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A028260/order",
              "asOf": "2026-06-10T06:02:14Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 296.9,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 296.9,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 4.5827,
              "last30BuyVolume": 1691.0,
              "last30SellVolume": 369.0
            },
            "orderbook": {
              "bidAskRatio": 4.2549,
              "bidTotal": 5808,
              "askTotal": 1365,
              "note": "Naver 호가잔량합계 매수 5,808 / 매도 1,365",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=028260"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 88.70, ATR10 12.16%, 일간 표준편차 7.02%, 당일 레인지 5.71%.",
              "metrics": {
                "atrPct10": 12.16,
                "returnStd20": 7.02,
                "todayRangePct": 5.71,
                "vkospi": 88.7
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "405,500원",
                "historicalHitRate": 0.6917,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.9%",
                "targetPrice": "413,000원",
                "historicalHitRate": 0.6241,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 390,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.9%",
                "targetPrice": "390,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 390000,
              "fallbackStopPrice": 389550,
              "effectiveHardStopPrice": 390000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 390,000원와 기존 % 손절 389,550원 중 더 높은 390,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 390,000원이며, 기존 % 손절 389,550원보다 느슨해지지 않게 390,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 391339,
              "high": 395314,
              "anchor": 397500,
              "label": "391,339~395,314원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 565000,
                "retrace33Price": 452775,
                "retrace50Price": 481250,
                "nearestResistancePrice": 405500,
                "secondaryResistancePrice": 413000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "405,500원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "413,000원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+42.1%",
                    "targetPrice": "565,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 390,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "390,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 565000,
                "retrace33Price": 452775,
                "retrace50Price": 481250,
                "nearestResistancePrice": 405500,
                "secondaryResistancePrice": 413000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "405,500원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "413,000원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 390,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "390,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
                "recentHighPrice": 565000,
                "retrace33Price": 452775,
                "retrace50Price": 481250,
                "nearestResistancePrice": 405500,
                "secondaryResistancePrice": 413000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "405,500원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "413,000원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 390,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "390,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 133건)",
                  "hitRate": 0.6917,
                  "ev": 1.562,
                  "sampleCount": 133
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 30건)",
              "sampleCount": 30,
              "ev": 0.1036
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 133건)",
              "hitRate": 0.6917,
              "ev": 1.562,
              "sampleCount": 133
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "매매금지",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-06-04) · 재진입 차단 · 외 2건",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-06-04) · 재진입 차단 / G1 미충족: 1개월 수익률 -5.9% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -29.6% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 397500.0,
                "vs52wHighPct": 70.35398230088495,
                "vs52wLowPct": 163.24503311258277,
                "dropFrom52wHighPct": 29.646017699115045,
                "ma20GapPct": -6.6463128229215584,
                "rsi14": 48.48914888457855,
                "volumeRatio20d": 73.27968360190938,
                "rs20Pct": -12.057522123893804,
                "tradingValueRank": 40.0,
                "marketCapRank": 9.0,
                "marketCapTrillion": 64.4616,
                "per": 26.66,
                "pbr": 1.04,
                "cnsPer": 24.95,
                "foreignRate": 31.2,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-10T15:02:16+09:00",
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
  "analysisDate": "2026-06-10"
};
