window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-08-19T06:05:18+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "025980",
      "name": "아난티",
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
      "total": 19,
      "failed": 0,
      "stale": 0,
      "manual": 2,
      "fallback": 0,
      "slots": 1
    },
    "failedKeys": [],
    "staleKeys": [],
    "manualKeys": [],
    "fallbackKeys": [],
    "providerHealth": {
      "naver_mobile": {
        "ok": 19
      },
      "naver_chart": {
        "ok": 19
      },
      "naver_integration_schedule": {
        "ok": 9
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
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
        "ok": 9
      },
      "naver_item_news": {
        "ok": 9
      },
      "cnbc_quote": {
        "ok": 1
      },
      "krx_pykrx_short_balance": {
        "ok": 12
      }
    },
    "fallbackUsage": [],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 807.4,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 321.7,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "G-C 🟡"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1775.6,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 322.6,
        "detail": "박스권 ⚠️ (거시 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 50305.6,
        "count": 19
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 14649.1,
        "detail": "후보 12종목 중 12건 수집",
        "count": 12
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 7208.4,
        "detail": "성공 19 / 실패 0",
        "count": 19
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 9019.5,
        "detail": "direct-http · 체결강도 19 / 호가 19 / 틱프록시 19",
        "count": 19
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 54997.3,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "pullback_news_enrichment",
        "label": "눌림목 뉴스 보강",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "shortlist 9 · 뉴스 9",
        "count": 9
      },
      {
        "step": "blacklist_check",
        "label": "공매도 과열·투자 주의 검증",
        "status": "ok",
        "durationMs": 68759.5,
        "detail": "확정 1 · 미확인 0",
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
            "value": "박스권 ⚠️ (거시 완충)"
          },
          {
            "item": "기술 레짐",
            "value": "약세장 ⛔"
          },
          {
            "item": "KOSPI",
            "value": "6467.50 (-5.86%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 60.45"
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
            "value": "G-C 🟡 (-1.0점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 70% 진입 / ⚠️ 50% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "7512.75",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6466.98",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 60.45",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 11 / 하락 9",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 85 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
            "verdict": "박스권 ⚠️ (거시 완충)"
          },
          {
            "item": "거시 맥락",
            "value": "표준 레짐 / RI 40.62256786269348",
            "verdict": "✅"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다. 적용 레짐은 market-analyze·KOSPI 보조 신호로 조정되었습니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20260818",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
          "regimeAdjustmentReason": "펀더 앵커 85 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
          "riseJustified": true,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 85.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 45.3,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 40.62256786269348,
          "stageOverrideReason": "지지력 보정: raw P 44 -> adjusted P 41 · F_support 10점",
          "kospiClose": 6467.5,
          "kospiMa5": 6741.530000000001,
          "vkospiValue": 60.45,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": true
        },
        "technicalRegimeLabel": "약세장 ⛔",
        "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
        "regimeAdjustmentReason": "펀더 앵커 85 · 버블 critical off · 펀더·버블 정당 → 박스권 완화"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-2.24%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+15.84",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+2.4bp",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-18.38원",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-0.88%",
            "baseScore": "-1점",
            "weight": "×1.0",
            "formula": "-1 × 1.0 = -1.0점",
            "weightedScore": "-1.0점"
          }
        ],
        "totalScore": "-1.0점",
        "grade": "G-C 🟡",
        "code": "G-C",
        "entryAdjustment": "✅ 70% 진입 / ⚠️ 50% 진입",
        "sellAdjustment": "프리마켓 갭업 기준 -0.5%p 하향 | 손절폭 -0.5%p 축소",
        "swingAdjustment": "조건부 허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-08-20T03:59:00+00:00",
          "vix": "2026-08-19T20:15:00+00:00",
          "tnx": "2026-08-19T19:00:00+00:00",
          "krw": "2026-08-19T22:59:00+00:00",
          "sox": "2026-08-20T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "실리콘투",
            "code": "257720",
            "strictScore": 9.0,
            "signalScore": 9.0,
            "score": 9.0,
            "scoreMax": 13.0,
            "effectiveScoreMax": 11.5,
            "gradeScore": 7.8,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -255,019주 / 기관 153,803주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 45,550 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 45,200 ≤ 종가 45,550)"
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
                "code": "D1",
                "strictPoints": 2.5,
                "signalPoints": 2.5,
                "maxPoints": 2.5,
                "evalStatus": "met",
                "note": "52주 고가 대비 -18.8% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 310% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 468% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 43,790 > 20MA 38,408 > 60MA 36,316 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 45,550 / 60MA 36,316",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 58.8 (필요 ≥ 50)",
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
                "note": "KOSPI 6,468 / 5MA 6,742 (-4.1%) · VKOSPI 60.5 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +2.36% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 58.8 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +18.6% (필요 ≤ +25%) · 60MA +25.4% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -18.8% (≥12%) · 거래량 310% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "마지막 30분 비율 1.39:1 / 마지막 30분 평균 178.9% / 마지막 1시간 178.9% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "⛔",
                "note": "KIND 최근공시 2026-08-18 유상증자결정(제3자배정-상환전환주식)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 -255,019주 / 기관 153,803주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 45,550 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 45,200 ≤ 종가 45,550)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -18.8% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 310% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D4",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 45550,
            "previousClose": 44500,
            "dailyChange": 1050,
            "dailyChangePct": 2.36,
            "dailyDirection": "up",
            "entryPriceText": "45,550원 (당일 종가 기준)",
            "entryPrice": 45550,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.987,
            "marketCapRank": 155,
            "marketCapUniverseCount": 2550,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -255,019주 / 기관 153,803주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족",
              "대차잔고 추이 데이터 부족 (대형주만 수집)"
            ],
            "toss": {
              "avgStrength": 104.0,
              "note": "토스 공개 체결강도 104.0% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A257720/order",
              "asOf": "2026-08-19T06:03:09Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 178.9,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 178.9,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 1.3947,
              "last30BuyVolume": 2060.0,
              "last30SellVolume": 1477.0
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-08-18 유상증자결정(제3자배정-상환전환주식)",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 37,134원 (18.48% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 37134,
                    "distancePct": 18.48,
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
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 34923,
                    "distancePct": 23.33,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 29,
                    "lastSeenDaysAgo": 10,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 32611,
                    "distancePct": 28.41,
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
                    "lastSeenDaysAgo": 12,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 29850,
                    "distancePct": 34.47,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 4,
                    "lastSeenDaysAgo": 35,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 40565,
                    "distancePct": 10.94,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 7,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 37134,
                  "distancePct": 18.48,
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
                    "price": 29850,
                    "distancePct": 34.47,
                    "count": 2,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 29850,
                    "bandHigh": 29850
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 31630,
                    "distancePct": 30.56,
                    "count": 4,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 31550,
                    "bandHigh": 31700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 32847,
                    "distancePct": 27.89,
                    "count": 13,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 32150,
                    "bandHigh": 33300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 33814,
                    "distancePct": 25.77,
                    "count": 8,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 33500,
                    "bandHigh": 34100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 34850,
                    "distancePct": 23.49,
                    "count": 19,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 34450,
                    "bandHigh": 35350
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 35740,
                    "distancePct": 21.54,
                    "count": 17,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 35400,
                    "bandHigh": 36200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 36897,
                    "distancePct": 19.0,
                    "count": 15,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 36300,
                    "bandHigh": 37400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 38131,
                    "distancePct": 16.29,
                    "count": 7,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 37600,
                    "bandHigh": 38500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 39150,
                    "distancePct": 14.05,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 38800,
                    "bandHigh": 39350
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 40530,
                    "distancePct": 11.02,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 40050,
                    "bandHigh": 40950
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 45400,
                    "distancePct": 0.33,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 45250,
                    "bandHigh": 45550
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 29850,
                    "distancePct": 34.47,
                    "count": 2,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 29850,
                    "bandHigh": 29850
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 32375,
                    "distancePct": 28.92,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 32200,
                    "bandHigh": 32550
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 44496,
                    "distancePct": 2.31,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 8147370,
                    "binIndex": 18,
                    "binLow": 44100,
                    "binHigh": 44892
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 34996,
                    "distancePct": 23.17,
                    "count": 10,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 25,
                    "volume": 5590519,
                    "binIndex": 6,
                    "binLow": 34600,
                    "binHigh": 35392
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 37371,
                    "distancePct": 17.96,
                    "count": 6,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 25,
                    "volume": 4392149,
                    "binIndex": 9,
                    "binLow": 36975,
                    "binHigh": 37767
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 40600,
                    "distancePct": 10.87,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 948.0,
                    "anchorCount": 3
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 41550,
                    "distancePct": 8.78,
                    "count": 1,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 279.3,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 43700,
                    "distancePct": 4.06,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 309.8,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 468% (4일 전) · 200%+ 급증 4회",
                "burstCount": 4,
                "maxRatioPct": 468.3,
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
                  "summary": "마지막 30분 비율 1.39:1 / 마지막 30분 평균 178.9% / 마지막 1시간 178.9% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 60.45, ATR10 9.62%, 일간 표준편차 5.44%, 당일 레인지 11.57%.",
              "metrics": {
                "atrPct10": 9.62,
                "returnStd20": 5.44,
                "todayRangePct": 11.57,
                "vkospi": 60.45
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
              "ma10Price": 41315,
              "ma10PrevPrice": 40495,
              "ma20Price": 38408,
              "ma20PrevPrice": 37912,
              "ma10WarningPrice": null,
              "hardStopPrice": 44184,
              "fallbackStopPrice": 44184,
              "effectiveStopPrice": 44184,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 44,184원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 44,184원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "46,233원",
                "historicalHitRate": 0.4286,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "46,689원",
                "historicalHitRate": 0.2857,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "47,600원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "48,283원",
                "historicalHitRate": 0.0714,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 44,184원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "44,184원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 44981,
              "high": 45436,
              "anchor": 45550,
              "label": "44,981~45,436원 (종가 ±, 분할매수)"
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
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "46,233원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "46,689원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "47,600원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "48,283원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 44,184원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "44,184원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "46,233원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "46,689원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "47,600원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "48,283원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 44,184원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "44,184원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
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
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "46,233원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "46,689원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "47,600원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "48,283원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 44,184원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "44,184원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
              "sampleCount": 10,
              "ev": -1.8039
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 14건)",
              "hitRate": 0.0714,
              "ev": -0.935,
              "sampleCount": 14
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
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G13 미충족: KIND 최근공시 2026-08-18 유상증자결정(제3자배정-상환전환주식)",
            "statusReason": "G13 미충족: KIND 최근공시 2026-08-18 유상증자결정(제3자배정-상환전환주식)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 45550.0,
                "vs52wHighPct": 81.19429590017825,
                "vs52wLowPct": 52.596314907872696,
                "dropFrom52wHighPct": 18.805704099821746,
                "ma20GapPct": 18.596628262709107,
                "rsi14": 64.74231691569562,
                "volumeRatio20d": 309.7507209568743,
                "rs20Pct": 27.769985974754558,
                "supportDistancePct": 18.48,
                "tradingValueRank": 32.0,
                "marketCapRank": 155.0,
                "marketCapTrillion": 2.987,
                "per": 16.22,
                "pbr": 6.06,
                "cnsPer": 12.42,
                "foreignRate": 7.22,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "현대차",
            "code": "005380",
            "strictScore": 9.2,
            "signalScore": 9.2,
            "score": 9.2,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 7.1,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -182,749주 / 기관 3,843주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 411,000 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.90 (필요 ≥ 1.0)"
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
                "code": "D1",
                "strictPoints": 2.5,
                "signalPoints": 2.5,
                "maxPoints": 2.5,
                "evalStatus": "met",
                "note": "52주 고가 대비 -47.8% (≥12% 만점·8~12% 부분) · 충족"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "거래량 57% (≥100% 만점·80~100% 부분) · 미충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -11.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G3, Q1, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 202% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 425,400 > 20MA 401,700 > 60MA 507,525 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 411,000 / 60MA 507,525",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "주봉 RSI 42.3 (필요 ≥ 50)",
                "evalStatus": "not_met"
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
                "note": "KOSPI 6,468 / 5MA 6,742 (-4.1%) · VKOSPI 60.5 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -5.52% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 42.3 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +2.3% (필요 ≤ +25%) · 60MA -19.0% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -47.8% (≥12%) · 거래량 57% (≥80%) · 수급추세 +2 (≥0) · 반등 거래량 부족",
                "evalStatus": "not_met"
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
                "status": "⛔",
                "note": "마지막 30분 비율 0.20:1 / 마지막 30분 평균 19.5% / 마지막 1시간 19.5% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-08-18까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 -182,749주 / 기관 3,843주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 411,000 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -47.8% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -11.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.90 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D3",
                "note": "거래량 57% (≥100% 만점·80~100% 부분) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 411000,
            "previousClose": 435000,
            "dailyChange": -24000,
            "dailyChangePct": -5.52,
            "dailyDirection": "down",
            "entryPriceText": "411,000원 (당일 종가 기준)",
            "entryPrice": 411000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 84.1554,
            "marketCapRank": 5,
            "marketCapUniverseCount": 2550,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -182,749주 / 기관 3,843주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 71.0,
              "note": "토스 공개 체결강도 71.0% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005380/order",
              "asOf": "2026-08-19T06:03:09Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 19.5,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 19.5,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 0.2024,
              "last30BuyVolume": 439.0,
              "last30SellVolume": 2169.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-08-18까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 402,526원 (2.06% 아래) · 강도 65점 · family 2개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 402526,
                    "distancePct": 2.06,
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
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 413333,
                    "distancePct": -0.57,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 391650,
                    "distancePct": 4.71,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 9,
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 377667,
                    "distancePct": 8.11,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 10,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 363000,
                    "distancePct": 11.68,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 402526,
                  "distancePct": 2.06,
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
                "activeFamilyCount": 2,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 341000,
                    "distancePct": 17.03,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 338500,
                    "bandHigh": 343500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 352250,
                    "distancePct": 14.29,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 351000,
                    "bandHigh": 353500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 363000,
                    "distancePct": 11.68,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 359000,
                    "bandHigh": 366000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 377667,
                    "distancePct": 8.11,
                    "count": 3,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 376000,
                    "bandHigh": 381000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 391650,
                    "distancePct": 4.71,
                    "count": 9,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 387000,
                    "bandHigh": 395500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 401729,
                    "distancePct": 2.26,
                    "count": 10,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 399000,
                    "bandHigh": 406500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 413333,
                    "distancePct": -0.57,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 408000,
                    "bandHigh": 418500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 424400,
                    "distancePct": -3.26,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 421500,
                    "bandHigh": 427000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 433625,
                    "distancePct": -5.5,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 432000,
                    "bandHigh": 435000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 444375,
                    "distancePct": -8.12,
                    "count": 3,
                    "lastSeenDaysAgo": 25,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 440500,
                    "bandHigh": 447500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 458389,
                    "distancePct": -11.53,
                    "count": 8,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 453000,
                    "bandHigh": 463000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 482036,
                    "distancePct": -17.28,
                    "count": 6,
                    "lastSeenDaysAgo": 29,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 474500,
                    "bandHigh": 487500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 497643,
                    "distancePct": -21.08,
                    "count": 6,
                    "lastSeenDaysAgo": 30,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 492000,
                    "bandHigh": 503000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 509333,
                    "distancePct": -23.93,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 508000,
                    "bandHigh": 511000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 583750,
                    "distancePct": -42.03,
                    "count": 3,
                    "lastSeenDaysAgo": 40,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 581000,
                    "bandHigh": 590000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 601833,
                    "distancePct": -46.43,
                    "count": 4,
                    "lastSeenDaysAgo": 42,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 597000,
                    "bandHigh": 607000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 616800,
                    "distancePct": -50.07,
                    "count": 4,
                    "lastSeenDaysAgo": 41,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 613000,
                    "bandHigh": 620000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 636667,
                    "distancePct": -54.91,
                    "count": 5,
                    "lastSeenDaysAgo": 44,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 627000,
                    "bandHigh": 642000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 650750,
                    "distancePct": -58.33,
                    "count": 4,
                    "lastSeenDaysAgo": 45,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 647000,
                    "bandHigh": 655000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 666500,
                    "distancePct": -62.17,
                    "count": 2,
                    "lastSeenDaysAgo": 57,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 666000,
                    "bandHigh": 667000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 684750,
                    "distancePct": -66.61,
                    "count": 4,
                    "lastSeenDaysAgo": 52,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 677000,
                    "bandHigh": 692000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 699500,
                    "distancePct": -70.19,
                    "count": 4,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 697000,
                    "bandHigh": 701000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 726333,
                    "distancePct": -76.72,
                    "count": 3,
                    "lastSeenDaysAgo": 53,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 723000,
                    "bandHigh": 729000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 458750,
                    "distancePct": -11.62,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
                    "valid": false,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 457000,
                    "bandHigh": 460500
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 681135,
                    "distancePct": -65.73,
                    "count": 4,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 25,
                    "volume": 6962953,
                    "binIndex": 18,
                    "binLow": 671875,
                    "binHigh": 690396
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 403323,
                    "distancePct": 1.87,
                    "count": 10,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 6168555,
                    "binIndex": 3,
                    "binLow": 394062,
                    "binHigh": 412583
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 644094,
                    "distancePct": -56.71,
                    "count": 4,
                    "lastSeenDaysAgo": 44,
                    "valid": false,
                    "weight": 25,
                    "volume": 5328775,
                    "binIndex": 16,
                    "binLow": 634833,
                    "binHigh": 653354
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 202% (14일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 201.6,
                "latestBurstDaysAgo": 14
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
                  "summary": "마지막 30분 비율 0.20:1 / 마지막 30분 평균 19.5% / 마지막 1시간 19.5% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 60.45, ATR10 5.36%, 일간 표준편차 4.71%, 당일 레인지 3.68%.",
              "metrics": {
                "atrPct10": 5.36,
                "returnStd20": 4.71,
                "todayRangePct": 3.68,
                "vkospi": 60.45
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
              "ma10Price": 413800,
              "ma10PrevPrice": 411950,
              "ma20Price": 401700,
              "ma20PrevPrice": 401100,
              "ma10WarningPrice": null,
              "hardStopPrice": 398670,
              "fallbackStopPrice": 398670,
              "effectiveStopPrice": 398670,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 398,670원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 398,670원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "417,165원",
                "historicalHitRate": 0.4286,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "421,275원",
                "historicalHitRate": 0.2857,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "429,495원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "435,660원",
                "historicalHitRate": 0.0714,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 398,670원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "398,670원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 405862,
              "high": 409972,
              "anchor": 411000,
              "label": "405,862~409,972원 (종가 ±, 분할매수)"
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
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "417,165원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "421,275원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "429,495원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "435,660원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 398,670원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "398,670원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "417,165원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "421,275원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "429,495원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "435,660원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 398,670원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "398,670원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
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
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "417,165원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "421,275원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "429,495원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "435,660원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 398,670원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "398,670원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
              "sampleCount": 10,
              "ev": -1.8039
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 14건)",
              "hitRate": 0.0714,
              "ev": -0.935,
              "sampleCount": 14
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
              "핵심 Gate 미충족: Q1",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G1, G2, G3, Q1, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 425,400 > 20MA 401,700 > 60MA 507,525 · 상승선 5MA, 20MA · 정배열 미충족 · 외 4건",
            "statusReason": "G1 미충족: 5MA 425,400 > 20MA 401,700 > 60MA 507,525 · 상승선 5MA, 20MA · 정배열 미충족 / G2 미충족: 종가 411,000 / 60MA 507,525 / G3 미충족: 주봉 RSI 42.3 (필요 ≥ 50) / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 411000.0,
                "vs52wHighPct": 52.22363405336722,
                "vs52wLowPct": 94.7867298578199,
                "dropFrom52wHighPct": 47.77636594663278,
                "ma20GapPct": 2.315160567587752,
                "rsi14": 46.058335398028696,
                "volumeRatio20d": 57.01087735473772,
                "rs20Pct": 3.007518796992481,
                "supportDistancePct": 2.06,
                "tradingValueRank": 29.0,
                "marketCapRank": 5.0,
                "marketCapTrillion": 84.1554,
                "per": 12.67,
                "pbr": 0.9,
                "cnsPer": 10.81,
                "foreignRate": 24.96,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -11.429760512337397
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "HPSP",
            "code": "403870",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 13.0,
            "effectiveScoreMax": 11.5,
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
                "note": "외인 887,699주 / 기관 -229,157주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 46,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 40,500 ≤ 종가 46,000)"
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
                "code": "D1",
                "strictPoints": 2.5,
                "signalPoints": 2.5,
                "maxPoints": 2.5,
                "evalStatus": "met",
                "note": "52주 고가 대비 -50.0% (≥12% 만점·8~12% 부분) · 충족"
              },
              {
                "code": "D2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "수급추세 -2 (≥+2 만점·+1 부분) · 미충족"
              },
              {
                "code": "D3",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "거래량 245% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, Q1, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 269% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 41,780 > 20MA 36,875 > 60MA 46,417 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 46,000 / 60MA 46,417",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 50.9 (필요 ≥ 50)",
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
                "note": "KOSPI 6,468 / 5MA 6,742 (-4.1%) · VKOSPI 60.5 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +7.85% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 50.9 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +24.7% (필요 ≤ +25%) · 60MA -0.9% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -50.0% (≥12%) · 거래량 245% (≥80%) · 수급추세 -2 (≥0) · 수급 이탈",
                "evalStatus": "not_met"
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
                "note": "당일 거래량 / 앵커 거래량 100% · 시가 40,500 / 종가 46,000 / 전일 종가 42,650 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 46,000 / 앵커 중심값 43,250 / 복합 지지 44,641 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 0.46:1 / 마지막 30분 평균 42.9% / 마지막 1시간 42.9% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-08-18까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 887,699주 / 기관 -229,157주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 46,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 40,500 ≤ 종가 46,000)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -50.0% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 245% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D2",
                "note": "수급추세 -2 (≥+2 만점·+1 부분) · 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "D4",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 46000,
            "previousClose": 42650,
            "dailyChange": 3350,
            "dailyChangePct": 7.85,
            "dailyDirection": "up",
            "entryPriceText": "46,000원 (당일 종가 기준)",
            "entryPrice": 46000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.7858,
            "marketCapRank": 127,
            "marketCapUniverseCount": 2550,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 887,699주 / 기관 -229,157주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "대차잔고 추이 데이터 부족 (대형주만 수집)"
            ],
            "toss": {
              "avgStrength": 131.3,
              "note": "토스 공개 체결강도 131.3% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A403870/order",
              "asOf": "2026-08-19T06:03:06Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 42.9,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 42.9,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.4614,
              "last30BuyVolume": 1182.0,
              "last30SellVolume": 2562.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-08-18까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 44,641원 (2.95% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 44641,
                    "distancePct": 2.95,
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
                    "price": 37856,
                    "distancePct": 17.7,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 9,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 40808,
                    "distancePct": 11.29,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 39881,
                    "distancePct": 13.3,
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
                  },
                  {
                    "label": "수평 지지",
                    "price": 45738,
                    "distancePct": 0.57,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 44641,
                  "distancePct": 2.95,
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
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 32517,
                    "distancePct": 29.31,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 32250,
                    "bandHigh": 32700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 33700,
                    "distancePct": 26.74,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 33550,
                    "bandHigh": 33950
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 34690,
                    "distancePct": 24.59,
                    "count": 5,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 34400,
                    "bandHigh": 35050
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 35650,
                    "distancePct": 22.5,
                    "count": 5,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 35400,
                    "bandHigh": 35800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 36775,
                    "distancePct": 20.05,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 36600,
                    "bandHigh": 36950
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 37962,
                    "distancePct": 17.47,
                    "count": 7,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 37500,
                    "bandHigh": 38400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 38980,
                    "distancePct": 15.26,
                    "count": 8,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 38550,
                    "bandHigh": 39500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 39962,
                    "distancePct": 13.12,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 39650,
                    "bandHigh": 40400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 40867,
                    "distancePct": 11.16,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 40650,
                    "bandHigh": 41200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 42008,
                    "distancePct": 8.68,
                    "count": 4,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 41500,
                    "bandHigh": 42500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 43394,
                    "distancePct": 5.67,
                    "count": 7,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 42650,
                    "bandHigh": 43850
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 44350,
                    "distancePct": 3.59,
                    "count": 3,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 44150,
                    "bandHigh": 44500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 45738,
                    "distancePct": 0.57,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 45350,
                    "bandHigh": 46000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 47090,
                    "distancePct": -2.37,
                    "count": 5,
                    "lastSeenDaysAgo": 23,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 46600,
                    "bandHigh": 47500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 48971,
                    "distancePct": -6.46,
                    "count": 7,
                    "lastSeenDaysAgo": 31,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 48500,
                    "bandHigh": 49600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 50429,
                    "distancePct": -9.63,
                    "count": 6,
                    "lastSeenDaysAgo": 33,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 49900,
                    "bandHigh": 51000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 51400,
                    "distancePct": -11.74,
                    "count": 2,
                    "lastSeenDaysAgo": 35,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 51200,
                    "bandHigh": 51600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 52733,
                    "distancePct": -14.64,
                    "count": 5,
                    "lastSeenDaysAgo": 34,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 52200,
                    "bandHigh": 53100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 54562,
                    "distancePct": -18.61,
                    "count": 7,
                    "lastSeenDaysAgo": 34,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 53700,
                    "bandHigh": 55200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 56600,
                    "distancePct": -23.04,
                    "count": 5,
                    "lastSeenDaysAgo": 41,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 55900,
                    "bandHigh": 57000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 59833,
                    "distancePct": -30.07,
                    "count": 3,
                    "lastSeenDaysAgo": 40,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 59400,
                    "bandHigh": 60100
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 37750,
                    "distancePct": 17.93,
                    "count": 2,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 37550,
                    "bandHigh": 37950
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 53001,
                    "distancePct": -15.22,
                    "count": 6,
                    "lastSeenDaysAgo": 33,
                    "valid": false,
                    "weight": 25,
                    "volume": 36082694,
                    "binIndex": 9,
                    "binLow": 51656,
                    "binHigh": 54346
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 79897,
                    "distancePct": -73.69,
                    "count": 1,
                    "lastSeenDaysAgo": 45,
                    "valid": false,
                    "weight": 25,
                    "volume": 33421660,
                    "binIndex": 19,
                    "binLow": 78552,
                    "binHigh": 81242
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 44932,
                    "distancePct": 2.32,
                    "count": 6,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 25,
                    "volume": 26080915,
                    "binIndex": 6,
                    "binLow": 43588,
                    "binHigh": 46277
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 39800,
                    "distancePct": 13.48,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 244.8,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 40750,
                    "distancePct": 11.41,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 295.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 269% (전일) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 268.9,
                "latestBurstDaysAgo": 1
              },
              "anchor": {
                "date": "20260819",
                "open": 40500,
                "close": 46000,
                "high": 46900,
                "low": 39800,
                "bodyMid": 43250,
                "volume": 6047384.0,
                "volumeRatio": 2.45,
                "daysAgo": 0
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 100% · 시가 40,500 / 종가 46,000 / 전일 종가 42,650 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 46,000 / 앵커 중심값 43,250 / 복합 지지 44,641 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.46:1 / 마지막 30분 평균 42.9% / 마지막 1시간 42.9% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 60.45, ATR10 8.42%, 일간 표준편차 7.38%, 당일 레인지 16.65%.",
              "metrics": {
                "atrPct10": 8.42,
                "returnStd20": 7.38,
                "todayRangePct": 16.65,
                "vkospi": 60.45
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
              "anchorDate": "20260819",
              "anchorOpen": 40500,
              "anchorClose": 46000,
              "anchorHigh": 46900,
              "anchorLow": 39800,
              "anchorBodyMid": 43250,
              "anchorVolumeRatio": 2.45,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 43250,
              "ma10Price": 39105,
              "ma10PrevPrice": 38045,
              "ma20Price": 36875,
              "ma20PrevPrice": 36530,
              "ma10WarningPrice": null,
              "hardStopPrice": 43250,
              "fallbackStopPrice": 44620,
              "effectiveStopPrice": 44620,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 43,250원, 20일선 36,875원) = 43,250원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 44,620원) = 44,620원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 43,250원, 20일선 36,875원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 44,620원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "46,690원",
                "historicalHitRate": 0.4286,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "47,150원",
                "historicalHitRate": 0.2857,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "48,070원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "48,760원",
                "historicalHitRate": 0.0714,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 44,620원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "44,620원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 45425,
              "high": 45885,
              "anchor": 46000,
              "label": "45,425~45,885원 (종가 ±, 분할매수)"
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
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "46,690원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "47,150원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "48,070원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "48,760원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 44,620원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "44,620원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "46,690원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "47,150원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "48,070원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "48,760원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 44,620원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "44,620원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
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
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "46,690원",
                    "historicalHitRate": 0.4286,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "47,150원",
                    "historicalHitRate": 0.2857,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "48,070원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "48,760원",
                    "historicalHitRate": 0.0714,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 44,620원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "44,620원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 14건)",
                  "hitRate": 0.0714,
                  "ev": -0.935,
                  "sampleCount": 14
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 10건)",
              "sampleCount": 10,
              "ev": -1.8039
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 14건)",
              "hitRate": 0.0714,
              "ev": -0.935,
              "sampleCount": 14
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
              "핵심 Gate 미충족: Q1",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G1, G2, Q1, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 41,780 > 20MA 36,875 > 60MA 46,417 · 상승선 5MA, 20MA · 정배열 미충족 · 외 3건",
            "statusReason": "G1 미충족: 5MA 41,780 > 20MA 36,875 > 60MA 46,417 · 상승선 5MA, 20MA · 정배열 미충족 / G2 미충족: 종가 46,000 / 60MA 46,417 / Q1 미충족: 52주 고가 대비 -50.0% (≥12%) · 거래량 245% (≥80%) · 수급추세 -2 (≥0) · 수급 이탈 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 46000.0,
                "vs52wHighPct": 50.0,
                "vs52wLowPct": 86.23481781376519,
                "dropFrom52wHighPct": 50.0,
                "ma20GapPct": 24.74576271186441,
                "rsi14": 59.98406393074836,
                "volumeRatio20d": 244.78415078134802,
                "rs20Pct": 17.647058823529413,
                "supportDistancePct": 2.95,
                "tradingValueRank": 22.0,
                "marketCapRank": 127.0,
                "marketCapTrillion": 3.7858,
                "per": 46.65,
                "pbr": 12.76,
                "cnsPer": 31.57,
                "foreignRate": 32.96,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "이수페타시스",
            "code": "007660",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 12.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 4.9,
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
                "note": "외인 43,882주 / 기관 316,817주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 142.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 94.2% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 199% · 기준 충족 (≥150%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 94.2% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 34% / 윗꼬리·몸통 1.42 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.90 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +26.5% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
                "note": "5일 초과 +17.0% / 20일 초과 +22.0%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 63.3% (필요 ≥ 90%)",
                "evalStatus": "not_met"
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
                "note": "당일 거래량 / 20일 평균 199% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 34% / 윗꼬리·몸통 1.42 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.46% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 104,400 / 5MA 97,960 (전일 5MA 94,640) · 5MA 위·우상향",
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
                "note": "외인 43,882주 / 기관 316,817주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 142.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 2.90 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +26.5% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "20일 고점 대비 94.2% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 199% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 94.2% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 34% / 윗꼬리·몸통 1.42 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 104400,
            "previousClose": 102900,
            "dailyChange": 1500,
            "dailyChangePct": 1.46,
            "dailyDirection": "up",
            "entryPriceText": "104,400원 (당일 종가 기준)",
            "entryPrice": 104400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 7.6639,
            "marketCapRank": 81,
            "marketCapUniverseCount": 2550,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 43,882주 / 기관 316,817주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 142.0,
              "note": "토스 공개 체결강도 142.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A007660/order",
              "asOf": "2026-08-19T06:03:09Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 256.3,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 256.3,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.5258,
              "last30BuyVolume": 2008.0,
              "last30SellVolume": 795.0
            },
            "orderbook": {
              "bidAskRatio": 2.9017,
              "bidTotal": 4898,
              "askTotal": 1688,
              "note": "Naver 호가잔량합계 매수 4,898 / 매도 1,688",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=007660"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 60.45, ATR10 8.57%, 일간 표준편차 8.85%, 당일 레인지 12.83%.",
              "metrics": {
                "atrPct10": 8.57,
                "returnStd20": 8.85,
                "todayRangePct": 12.83,
                "vkospi": 60.45
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
              "referencePrice": 104300,
              "referenceBandLow": 104300,
              "referenceBandHigh": 104300,
              "entryDayOpenPrice": 99900,
              "fallbackStopPrice": 99702,
              "effectiveHardStopPrice": 104300,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 104,300원와 기존 % 손절 99,702원 중 더 높은 104,300원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 104,300원이며, 기존 % 손절 99,702원보다 느슨해지지 않게 104,300원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.9%",
                "targetPrice": "105,300원",
                "historicalHitRate": 0.6479,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "107,000원",
                "historicalHitRate": 0.4085,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+7.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+7.5%",
                "targetPrice": "112,230원",
                "historicalHitRate": 0.2817,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.5%",
                "targetPrice": "115,362원",
                "historicalHitRate": 0.2324,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+13.5%",
                "targetPrice": "118,494원",
                "historicalHitRate": 0.1628,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 104,300원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.1%",
                "targetPrice": "104,300원"
              }
            ],
            "rr": "1 : 66.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 103095,
              "high": 104139,
              "anchor": 104400,
              "label": "103,095~104,139원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 105300,
                "secondaryResistancePrice": 107000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "107,010원",
                    "historicalHitRate": 0.6479,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "109,098원",
                    "historicalHitRate": 0.4085,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "112,230원",
                    "historicalHitRate": 0.2817,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.5%",
                    "targetPrice": "115,362원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.5%",
                    "targetPrice": "118,494원",
                    "historicalHitRate": 0.1628,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 104,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "104,300원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.1628,
                  "ev": 1.332,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 105300,
                "secondaryResistancePrice": 107000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.9%",
                    "targetPrice": "105,300원",
                    "historicalHitRate": 0.6479,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "107,000원",
                    "historicalHitRate": 0.4085,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "112,230원",
                    "historicalHitRate": 0.2817,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.5%",
                    "targetPrice": "115,362원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.5%",
                    "targetPrice": "118,494원",
                    "historicalHitRate": 0.1628,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 104,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "104,300원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.1628,
                  "ev": 1.332,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 47건)",
                "nearestResistancePrice": 105300,
                "secondaryResistancePrice": 107000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.9%",
                    "targetPrice": "105,300원",
                    "historicalHitRate": 0.6479,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "107,000원",
                    "historicalHitRate": 0.4085,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "112,230원",
                    "historicalHitRate": 0.2817,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.5%",
                    "targetPrice": "115,362원",
                    "historicalHitRate": 0.2324,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.5%",
                    "targetPrice": "118,494원",
                    "historicalHitRate": 0.1628,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 104,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "104,300원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.1628,
                  "ev": 1.332,
                  "sampleCount": 129
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 47건)",
              "sampleCount": 47,
              "ev": -1.5222
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 129건)",
              "hitRate": 0.1628,
              "ev": 1.332,
              "sampleCount": 129
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 63.3% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 63.3% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 104400.0,
                "vs52wHighPct": 63.272727272727266,
                "vs52wLowPct": 94.77611940298507,
                "dropFrom52wHighPct": 36.72727272727273,
                "ma20GapPct": 22.700828583181522,
                "rsi14": 59.16407245390843,
                "volumeRatio20d": 199.3691213320353,
                "rs20Pct": 17.83295711060948,
                "tradingValueRank": 35.0,
                "marketCapRank": 81.0,
                "marketCapTrillion": 7.6639,
                "per": 44.01,
                "pbr": 9.62,
                "cnsPer": 28.86,
                "foreignRate": 16.64,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 26.47298067344959
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
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
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 7.9,
            "signalScore": 7.9,
            "score": 7.9,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 5.6,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 38,607주 / 기관 -30,122주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 +38,607 / 전일 -25,480 · 기관 당일 -30,122 / 전일 +40,464 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "마지막 1시간 평균 체결강도 3.2% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "당일 평균 80.0% / 마지막 1시간 3.2% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +206,199주 · 양수 4/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 97.2% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,087,400 / 20MA 1,035,600 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -11.28% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -4.29% / KOSPI -5.86% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.03:1 · 평균 체결강도 3.2% (필요 ≥ 1.1:1)"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -30.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
                "note": "외인 전일 -25,480/당일 +38,607 · 기관 전일 +40,464/당일 -30,122 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 1,007,000 / 60MA 1,297,517",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 43.1% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 13",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 63% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 46.4% (≥25%) · 20일 수익률 -19.6% (≥0%) · 20일 약세(낙하 칼날)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,468 / 5MA 6,742 (-4.1%) · VKOSPI 60.5 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +206,199주 · 양수 4/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,087,400 / 20MA 1,035,600 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -4.29% / KOSPI -5.86% outperform",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -30.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 38,607주 / 기관 -30,122주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +38,607 / 전일 -25,480 · 기관 당일 -30,122 / 전일 +40,464 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 3.2% (필요 ≥ 100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "S4",
                "note": "당일 평균 80.0% / 마지막 1시간 3.2% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 97.2% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -11.28% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.03:1 · 평균 체결강도 3.2% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1007000,
            "previousClose": 1135000,
            "dailyChange": -128000,
            "dailyChangePct": -11.28,
            "dailyDirection": "down",
            "entryPriceText": "1,007,000원 (당일 종가 기준)",
            "entryPrice": 1007000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 132.8475,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2550,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 38,607주 / 기관 -30,122주 / 마지막 1시간 3.2% · 마지막 30분 틱 0.03:1. 외국인 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 80.0,
              "note": "토스 공개 체결강도 80.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-08-19T06:03:06Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 3.2,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 3.2,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.0306,
              "last30BuyVolume": 39.0,
              "last30SellVolume": 1274.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 60.45, ATR10 9.86%, 일간 표준편차 9.61%, 당일 레인지 4.32%.",
              "metrics": {
                "atrPct10": 9.86,
                "returnStd20": 9.61,
                "todayRangePct": 4.32,
                "vkospi": 60.45
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 206199.0,
              "positiveDays": 4,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260818",
                    "net": 38607.0
                  },
                  {
                    "date": "20260814",
                    "net": -25480.0
                  },
                  {
                    "date": "20260813",
                    "net": 26232.0
                  },
                  {
                    "date": "20260812",
                    "net": 98321.0
                  },
                  {
                    "date": "20260811",
                    "net": 68519.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260818",
                    "net": -30122.0
                  },
                  {
                    "date": "20260814",
                    "net": 40464.0
                  },
                  {
                    "date": "20260813",
                    "net": 47118.0
                  },
                  {
                    "date": "20260812",
                    "net": 57735.0
                  },
                  {
                    "date": "20260811",
                    "net": -80678.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260818",
                    "net": 38607.0
                  },
                  {
                    "date": "20260814",
                    "net": -25480.0
                  },
                  {
                    "date": "20260813",
                    "net": 26232.0
                  },
                  {
                    "date": "20260812",
                    "net": 98321.0
                  },
                  {
                    "date": "20260811",
                    "net": 68519.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 5일 매집 추세 강화",
              "note": "외국인 최근 5일 누적 +206,199주 · 양수 4/5일 · 증가 2회"
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
                "targetYield": "+1.1%",
                "targetPrice": "1,018,000원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.1%",
                "targetPrice": "1,038,000원",
                "historicalHitRate": 0.2,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "1,062,385원",
                "historicalHitRate": 0.15,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,087,560원",
                "historicalHitRate": 0.05,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,117,770원",
                "historicalHitRate": 0.05,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 971,755원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "971,755원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "fallback_percent_stop",
              "sponsorMode": "foreign",
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorVolumeRatio20d": null,
              "anchorStopPrice": null,
              "fallbackStopPrice": 971755,
              "effectiveHardStopPrice": 971755,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 971,755원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 971,755원만 유지합니다."
            },
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 994412,
              "high": 1004482,
              "anchor": 1007000,
              "label": "994,412~1,004,482원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1018000,
                "secondaryResistancePrice": 1038000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,022,105원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,037,210원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,062,385원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,087,560원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,117,770원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 971,755원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "971,755원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1018000,
                "secondaryResistancePrice": 1038000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.1%",
                    "targetPrice": "1,018,000원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,037,210원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,062,385원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,087,560원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,117,770원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 971,755원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "971,755원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
                "nearestResistancePrice": 1018000,
                "secondaryResistancePrice": 1038000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.1%",
                    "targetPrice": "1,018,000원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "1,038,000원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,062,385원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,087,560원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,117,770원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 971,755원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "971,755원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
              "sampleCount": 15,
              "ev": -3.5358
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 20건)",
              "hitRate": 0.05,
              "ev": -0.912,
              "sampleCount": 20
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
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: Q1"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 1,007,000 / 60MA 1,297,517 · 외 1건",
            "statusReason": "G1 미충족: 종가 1,007,000 / 60MA 1,297,517 / Q1 미충족: 외인 보유율 46.4% (≥25%) · 20일 수익률 -19.6% (≥0%) · 20일 약세(낙하 칼날)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1007000.0,
                "vs52wHighPct": 43.071000855432,
                "vs52wLowPct": 669.2895339954164,
                "dropFrom52wHighPct": 56.928999144568,
                "ma20GapPct": -2.7616840478949403,
                "rsi14": 44.42203630325733,
                "volumeRatio20d": 62.78665758888842,
                "rs20Pct": -19.632881085395052,
                "tradingValueRank": 13.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 132.8475,
                "per": 8.55,
                "pbr": 3.68,
                "cnsPer": 3.14,
                "foreignRate": 46.35,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -30.437319648609545
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "NAVER",
            "code": "035420",
            "strictScore": 7.7,
            "signalScore": 7.7,
            "score": 7.7,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 5.5,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -39,093주 / 기관 -65,560주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -39,093 / 전일 +32,305 · 기관 당일 -65,560 / 전일 +43,561 · 2일 연속 수급 유입 미확인"
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
                "note": "당일 평균 63.0% / 마지막 1시간 208.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
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
                "note": "종가 / 20MA 96.7% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 218,800 / 20MA 214,105 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 66% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -4.61% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -0.90% / KOSPI -5.86% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.28:1 · 평균 체결강도 208.7% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -15.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
                "status": "⚠️",
                "note": "외인 전일 +32,305/당일 -39,093 · 기관 전일 +43,561/당일 -65,560 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 207,000 / 60MA 215,632",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 67.1% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 39",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 47% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 35.2% (≥25%) · 20일 수익률 +7.3% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,468 / 5MA 6,742 (-4.1%) · VKOSPI 60.5 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 208.7% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 63.0% / 마지막 1시간 208.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 218,800 / 20MA 214,105 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 66% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -0.90% / KOSPI -5.86% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.28:1 · 평균 체결강도 208.7% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -15.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -39,093주 / 기관 -65,560주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -39,093 / 전일 +32,305 · 기관 당일 -65,560 / 전일 +43,561 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "S5",
                "note": "최근 5일 매집 추세 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 96.7% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -4.61% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 207000,
            "previousClose": 217000,
            "dailyChange": -10000,
            "dailyChangePct": -4.61,
            "dailyDirection": "down",
            "entryPriceText": "207,000원 (당일 종가 기준)",
            "entryPrice": 207000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 32.4944,
            "marketCapRank": 22,
            "marketCapUniverseCount": 2550,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -39,093주 / 기관 -65,560주 / 마지막 1시간 208.7% · 장후반 매수세 강화 · 마지막 30분 틱 1.28:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 63.0,
              "note": "토스 공개 체결강도 63.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-08-19T06:03:12Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 208.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 208.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.2771,
              "last30BuyVolume": 1106.0,
              "last30SellVolume": 866.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 60.45, ATR10 4.80%, 일간 표준편차 5.34%, 당일 레인지 3.00%.",
              "metrics": {
                "atrPct10": 4.8,
                "returnStd20": 5.34,
                "todayRangePct": 3.0,
                "vkospi": 60.45
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
                    "date": "20260818",
                    "net": -39093.0
                  },
                  {
                    "date": "20260814",
                    "net": 32305.0
                  },
                  {
                    "date": "20260813",
                    "net": 198932.0
                  },
                  {
                    "date": "20260812",
                    "net": 42070.0
                  },
                  {
                    "date": "20260811",
                    "net": 4785.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260818",
                    "net": -65560.0
                  },
                  {
                    "date": "20260814",
                    "net": 43561.0
                  },
                  {
                    "date": "20260813",
                    "net": 277776.0
                  },
                  {
                    "date": "20260812",
                    "net": -28814.0
                  },
                  {
                    "date": "20260811",
                    "net": 55185.0
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
                "targetYield": "+0.5%",
                "targetPrice": "208,000원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "220,000원",
                "historicalHitRate": 0.2,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.3%",
                "targetPrice": "220,000원",
                "historicalHitRate": 0.15,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "223,560원",
                "historicalHitRate": 0.05,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "229,770원",
                "historicalHitRate": 0.05,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 199,755원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "199,755원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "fallback_percent_stop",
              "sponsorMode": "none",
              "anchorDate": "",
              "anchorOpen": null,
              "anchorClose": null,
              "anchorVolumeRatio20d": null,
              "anchorStopPrice": null,
              "fallbackStopPrice": 199755,
              "effectiveHardStopPrice": 199755,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "수급 주체가 고정되지 않아 장초반 수급 이탈 즉시 손절은 비활성입니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 199,755원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 199,755원만 유지합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 204412,
              "high": 206482,
              "anchor": 207000,
              "label": "204,412~206,482원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 208000,
                "secondaryResistancePrice": 220000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "210,105원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "213,210원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "218,385원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "223,560원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "229,770원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 199,755원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "199,755원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 208000,
                "secondaryResistancePrice": 220000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "208,000원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "213,210원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "218,385원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "223,560원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "229,770원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 199,755원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "199,755원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
                "nearestResistancePrice": 208000,
                "secondaryResistancePrice": 220000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "208,000원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "220,000원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.3%",
                    "targetPrice": "220,000원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "223,560원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "229,770원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 199,755원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "199,755원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
              "sampleCount": 15,
              "ev": -3.5358
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 20건)",
              "hitRate": 0.05,
              "ev": -0.912,
              "sampleCount": 20
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
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G1"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 207,000 / 60MA 215,632",
            "statusReason": "G1 미충족: 종가 207,000 / 60MA 215,632",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 207000.0,
                "vs52wHighPct": 67.09886547811993,
                "vs52wLowPct": 14.301490889011594,
                "dropFrom52wHighPct": 32.90113452188007,
                "ma20GapPct": -3.3184652390182388,
                "rsi14": 47.326956411531846,
                "volumeRatio20d": 47.197641190073966,
                "rs20Pct": 7.253886010362693,
                "tradingValueRank": 39.0,
                "marketCapRank": 22.0,
                "marketCapTrillion": 32.4944,
                "per": 17.97,
                "pbr": 1.05,
                "cnsPer": 16.5,
                "foreignRate": 35.17,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -15.789390705584887
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "이수페타시스",
            "code": "007660",
            "strictScore": 6.4,
            "signalScore": 6.4,
            "score": 6.4,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 4.6,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 43,882주 / 기관 316,817주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 +43,882 / 전일 -84,224 · 기관 당일 +316,817 / 전일 -68,617 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 256.3% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 142.0% / 마지막 1시간 256.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +427,662주 · 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 122.7% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 97,960 / 20MA 85,085 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 190% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +1.46% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -6.45% / KOSPI -5.86% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.53:1 · 평균 체결강도 256.3% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +26.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "status": "⚠️",
                "note": "외인 전일 -84,224/당일 +43,882 · 기관 전일 -68,617/당일 +316,817 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 104,400 / 60MA 104,253",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 63.3% (필요 < 92%)",
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
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 199% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 16.6% (≥25%) · 20일 수익률 +17.8% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,468 / 5MA 6,742 (-4.1%) · VKOSPI 60.5 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 43,882주 / 기관 316,817주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 256.3% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 142.0% / 마지막 1시간 256.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +427,662주 · 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 97,960 / 20MA 85,085 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +1.46% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.53:1 · 평균 체결강도 256.3% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "외인 당일 +43,882 / 전일 -84,224 · 기관 당일 +316,817 / 전일 -68,617 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 122.7% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 190% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -6.45% / KOSPI -5.86% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +26.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 104400,
            "previousClose": 102900,
            "dailyChange": 1500,
            "dailyChangePct": 1.46,
            "dailyDirection": "up",
            "entryPriceText": "104,400원 (당일 종가 기준)",
            "entryPrice": 104400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 7.6639,
            "marketCapRank": 81,
            "marketCapUniverseCount": 2550,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 43,882주 / 기관 316,817주 / 마지막 1시간 256.3% · 장후반 매수세 강화 · 마지막 30분 틱 2.53:1. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 142.0,
              "note": "토스 공개 체결강도 142.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A007660/order",
              "asOf": "2026-08-19T06:03:09Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 256.3,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 256.3,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.5258,
              "last30BuyVolume": 2008.0,
              "last30SellVolume": 795.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 60.45, ATR10 8.57%, 일간 표준편차 8.85%, 당일 레인지 12.83%.",
              "metrics": {
                "atrPct10": 8.57,
                "returnStd20": 8.85,
                "todayRangePct": 12.83,
                "vkospi": 60.45
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 427662.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260818",
                    "net": 43882.0
                  },
                  {
                    "date": "20260814",
                    "net": -84224.0
                  },
                  {
                    "date": "20260813",
                    "net": -117454.0
                  },
                  {
                    "date": "20260812",
                    "net": 23874.0
                  },
                  {
                    "date": "20260811",
                    "net": -184639.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260818",
                    "net": 316817.0
                  },
                  {
                    "date": "20260814",
                    "net": -68617.0
                  },
                  {
                    "date": "20260813",
                    "net": 204125.0
                  },
                  {
                    "date": "20260812",
                    "net": 48533.0
                  },
                  {
                    "date": "20260811",
                    "net": -73196.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260818",
                    "net": 316817.0
                  },
                  {
                    "date": "20260814",
                    "net": -68617.0
                  },
                  {
                    "date": "20260813",
                    "net": 204125.0
                  },
                  {
                    "date": "20260812",
                    "net": 48533.0
                  },
                  {
                    "date": "20260811",
                    "net": -73196.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +427,662주 · 양수 3/5일 · 증가 3회"
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
                "targetYield": "+1.1%",
                "targetPrice": "105,500원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "107,000원",
                "historicalHitRate": 0.2,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "110,142원",
                "historicalHitRate": 0.15,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "112,752원",
                "historicalHitRate": 0.05,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "115,884원",
                "historicalHitRate": 0.05,
                "recommended": true
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 100,746원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "100,746원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260819",
              "anchorOpen": 99900,
              "anchorClose": 104400,
              "anchorVolumeRatio20d": 1.99,
              "anchorStopPrice": 99900,
              "fallbackStopPrice": 100746,
              "effectiveHardStopPrice": 100746,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 99,900원와 기존 % 손절 100,746원 중 더 높은 100,746원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 99,900원를 기준으로 잡고, 기존 % 손절 100,746원보다 느슨해지지 않게 100,746원로 고정합니다."
            },
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 103095,
              "high": 104139,
              "anchor": 104400,
              "label": "103,095~104,139원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 105500,
                "secondaryResistancePrice": 107000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "105,966원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "107,532원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "110,142원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "112,752원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "115,884원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,746원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "100,746원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 105500,
                "secondaryResistancePrice": 107000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.1%",
                    "targetPrice": "105,500원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "107,000원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "110,142원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "112,752원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "115,884원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,746원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "100,746원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
                "nearestResistancePrice": 105500,
                "secondaryResistancePrice": 107000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.1%",
                    "targetPrice": "105,500원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "107,000원",
                    "historicalHitRate": 0.2,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "110,142원",
                    "historicalHitRate": 0.15,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "112,752원",
                    "historicalHitRate": 0.05,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "115,884원",
                    "historicalHitRate": 0.05,
                    "recommended": true
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,746원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "100,746원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 20건)",
                  "hitRate": 0.05,
                  "ev": -0.912,
                  "sampleCount": 20
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
              "sampleCount": 15,
              "ev": -3.5358
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 20건)",
              "hitRate": 0.05,
              "ev": -0.912,
              "sampleCount": 20
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
              "매매금지(핵심 Gate 미충족: G4, Q1)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 199% (필요 < 150%) · 외 1건",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 199% (필요 < 150%) / Q1 미충족: 외인 보유율 16.6% (≥25%) · 20일 수익률 +17.8% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 104400.0,
                "vs52wHighPct": 63.272727272727266,
                "vs52wLowPct": 94.77611940298507,
                "dropFrom52wHighPct": 36.72727272727273,
                "ma20GapPct": 22.700828583181522,
                "rsi14": 59.16407245390843,
                "volumeRatio20d": 199.3691213320353,
                "rs20Pct": 17.83295711060948,
                "tradingValueRank": 35.0,
                "marketCapRank": 81.0,
                "marketCapTrillion": 7.6639,
                "per": 44.01,
                "pbr": 9.62,
                "cnsPer": 28.86,
                "foreignRate": 16.64,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 26.47298067344959
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
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
            "name": "아난티",
            "code": "025980",
            "strictScore": 7.8,
            "signalScore": 7.8,
            "score": 7.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.8,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 24,617→-2,806,451 / 기관 -46,184→-13,937 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 90.7% / 마지막 1시간 193.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 5,320 / 20MA 3,860 (137.8% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 980% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.11 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 5270, 전봉 종가 5230 충족"
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
                "note": "당일 거래대금 순위 25위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 0.5조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-08-18 공매도 과열종목 지정(공매도 거래 금지 적용)",
                "evalStatus": "not_met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-08-09~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +43.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -7.3% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 5,320 / 60MA 4,242",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.5% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +37.8% (≤+22%) · RSI14 79 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 90.7% / 마지막 1시간 193.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 5,320 / 20MA 3,860 (137.8% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 58% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 980% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.11 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 5270, 전봉 종가 5230 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 24,617→-2,806,451 / 기관 -46,184→-13,937 · 순매수 전환 없음",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 5320,
            "previousClose": 4500,
            "dailyChange": 820,
            "dailyChangePct": 18.22,
            "dailyDirection": "up",
            "entryPriceText": "5,320원 (당일 종가 기준)",
            "entryPrice": 5320,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.5176,
            "marketCapRank": 454,
            "marketCapUniverseCount": 2550,
            "keyPoint": "20일 고점 대비 -7.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-08-18 공매도 과열종목 지정(공매도 거래 금지 적용)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 5270, 전봉 종가 5230",
              "latestOpen": 5220.0,
              "latestClose": 5270.0,
              "previousClose": 5230.0
            },
            "toss": {
              "avgStrength": 90.7,
              "note": "토스 공개 체결강도 90.7% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A025980/order",
              "asOf": "2026-08-19T06:03:05Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 193.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 193.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.8001,
              "last30BuyVolume": 25985.0,
              "last30SellVolume": 9280.0
            },
            "orderbook": {
              "bidAskRatio": 1.1136,
              "bidTotal": 134207,
              "askTotal": 120517,
              "note": "Naver 호가잔량합계 매수 134,207 / 매도 120,517",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=025980"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 60.45, ATR10 7.94%, 일간 표준편차 5.57%, 당일 레인지 22.00%.",
              "metrics": {
                "atrPct10": 7.94,
                "returnStd20": 5.57,
                "todayRangePct": 22.0,
                "vkospi": 60.45
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.6%",
                "targetPrice": "5,459원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+3.9%",
                "targetPrice": "5,530원",
                "historicalHitRate": 0.3333,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 5,198원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "5,198원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 4750,
              "fallbackStopPrice": 5198,
              "effectiveHardStopPrice": 5198,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 4,750원와 기존 % 손절 5,198원 중 더 높은 5,198원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 4,750원이며, 기존 % 손절 5,198원보다 느슨해지지 않게 5,198원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 5254,
              "high": 5307,
              "anchor": 5320,
              "label": "5,254~5,307원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 5740,
                "retrace33Price": 5459,
                "retrace50Price": 5530,
                "nearestResistancePrice": 5740,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "5,459원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "5,530원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+7.9%",
                    "targetPrice": "5,740원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 5,198원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "5,198원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 5740,
                "retrace33Price": 5459,
                "retrace50Price": 5530,
                "nearestResistancePrice": 5740,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "5,459원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "5,530원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 5,198원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "5,198원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 12건)",
                "recentHighPrice": 5740,
                "retrace33Price": 5459,
                "retrace50Price": 5530,
                "nearestResistancePrice": 5740,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "5,459원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "5,530원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 5,198원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "5,198원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 12건)",
              "sampleCount": 12,
              "ev": 0.6067
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 15건)",
              "hitRate": 0.3333,
              "ev": 0.369,
              "sampleCount": 15
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
              "핵심 Gate 미충족: F3",
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.5조 (필요 ≥ 5조) · 외 3건",
            "statusReason": "F2 미충족: 시총 0.5조 (필요 ≥ 5조) / F3 미충족: KIND 최근공시 2026-08-18 공매도 과열종목 지정(공매도 거래 금지 적용) / G4 미충족: 최근 5거래일 최저 -1.5% (필요 -3% 이하 급락 1회 이상) / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 5320.0,
                "vs52wHighPct": 48.89705882352941,
                "vs52wLowPct": 68.88888888888889,
                "dropFrom52wHighPct": 51.10294117647059,
                "ma20GapPct": 37.81490836085746,
                "rsi14": 79.21983108855532,
                "volumeRatio20d": 2841.624860152552,
                "rs20Pct": 44.36906377204885,
                "tradingValueRank": 25.0,
                "marketCapRank": 454.0,
                "marketCapTrillion": 0.5176,
                "per": 0.0,
                "pbr": 0.72,
                "cnsPer": 0.0,
                "foreignRate": 5.49,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "이수페타시스",
            "code": "007660",
            "strictScore": 7.8,
            "signalScore": 7.8,
            "score": 7.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.8,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -84,224→43,882 / 기관 -68,617→316,817 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 142.0% / 마지막 1시간 256.3% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 104,400 / 20MA 85,085 (122.7% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 52% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 190% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.90 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 106000, 전봉 종가 106600 미달"
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
                "note": "시총 7.7조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-08-10 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "not_met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-08-09~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +23.7% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -5.8% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 104,400 / 60MA 104,253",
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
                "status": "⛔",
                "note": "20MA 이격 +22.7% (≤+22%) · RSI14 59 (≤72) · 20MA 과이격(반등 소진)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -84,224→43,882 / 기관 -68,617→316,817 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 142.0% / 마지막 1시간 256.3% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 104,400 / 20MA 85,085 (122.7% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 52% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.90 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 190% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 106000, 전봉 종가 106600 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 104400,
            "previousClose": 102900,
            "dailyChange": 1500,
            "dailyChangePct": 1.46,
            "dailyDirection": "up",
            "entryPriceText": "104,400원 (당일 종가 기준)",
            "entryPrice": 104400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 7.6639,
            "marketCapRank": 81,
            "marketCapUniverseCount": 2550,
            "keyPoint": "20일 고점 대비 -5.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-08-10 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 106000, 전봉 종가 106600",
              "latestOpen": 106700.0,
              "latestClose": 106000.0,
              "previousClose": 106600.0
            },
            "toss": {
              "avgStrength": 142.0,
              "note": "토스 공개 체결강도 142.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A007660/order",
              "asOf": "2026-08-19T06:03:09Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 256.3,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 256.3,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.5258,
              "last30BuyVolume": 2008.0,
              "last30SellVolume": 795.0
            },
            "orderbook": {
              "bidAskRatio": 2.9017,
              "bidTotal": 4898,
              "askTotal": 1688,
              "note": "Naver 호가잔량합계 매수 4,898 / 매도 1,688",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=007660"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 60.45, ATR10 8.57%, 일간 표준편차 8.85%, 당일 레인지 12.83%.",
              "metrics": {
                "atrPct10": 8.57,
                "returnStd20": 8.85,
                "todayRangePct": 12.83,
                "vkospi": 60.45
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "106,512원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+3.1%",
                "targetPrice": "107,600원",
                "historicalHitRate": 0.3333,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 101,999원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "101,999원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 97600,
              "fallbackStopPrice": 101999,
              "effectiveHardStopPrice": 101999,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 97,600원와 기존 % 손절 101,999원 중 더 높은 101,999원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 97,600원이며, 기존 % 손절 101,999원보다 느슨해지지 않게 101,999원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 103095,
              "high": 104139,
              "anchor": 104400,
              "label": "103,095~104,139원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 110800,
                "retrace33Price": 106512,
                "retrace50Price": 107600,
                "nearestResistancePrice": 107600,
                "secondaryResistancePrice": 110800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "106,512원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "107,600원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+6.1%",
                    "targetPrice": "110,800원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 101,999원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "101,999원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 110800,
                "retrace33Price": 106512,
                "retrace50Price": 107600,
                "nearestResistancePrice": 107600,
                "secondaryResistancePrice": 110800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "106,512원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.1%",
                    "targetPrice": "107,600원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 101,999원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "101,999원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 12건)",
                "recentHighPrice": 110800,
                "retrace33Price": 106512,
                "retrace50Price": 107600,
                "nearestResistancePrice": 107600,
                "secondaryResistancePrice": 110800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "106,512원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.1%",
                    "targetPrice": "107,600원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 101,999원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "101,999원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 12건)",
              "sampleCount": 12,
              "ev": 0.6067
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 15건)",
              "hitRate": 0.3333,
              "ev": 0.369,
              "sampleCount": 15
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
              "핵심 Gate 미충족: F3",
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F3 미충족: KIND 최근공시 2026-08-10 기업설명회(IR) 개최(안내공시) · 외 2건",
            "statusReason": "F3 미충족: KIND 최근공시 2026-08-10 기업설명회(IR) 개최(안내공시) / G4 미충족: 최근 5거래일 최저 -1.2% (필요 -3% 이하 급락 1회 이상) / Q1 미충족: 20MA 이격 +22.7% (≤+22%) · RSI14 59 (≤72) · 20MA 과이격(반등 소진)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 104400.0,
                "vs52wHighPct": 63.272727272727266,
                "vs52wLowPct": 94.77611940298507,
                "dropFrom52wHighPct": 36.72727272727273,
                "ma20GapPct": 22.700828583181522,
                "rsi14": 59.16407245390843,
                "volumeRatio20d": 199.3691213320353,
                "rs20Pct": 17.83295711060948,
                "tradingValueRank": 35.0,
                "marketCapRank": 81.0,
                "marketCapTrillion": 7.6639,
                "per": 44.01,
                "pbr": 9.62,
                "cnsPer": 28.86,
                "foreignRate": 16.64,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 26.47298067344959
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "HPSP",
            "code": "403870",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.1,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -172,480→887,699 / 기관 -179,378→-229,157 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 131.3% / 마지막 1시간 42.9% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 46,000 / 20MA 36,875 (124.7% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 87% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 196% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.42 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 46150, 전봉 종가 46050 충족"
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
                "status": "⛔",
                "note": "시총 3.8조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-08-18까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-08-09~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +16.5% (필요 ≥ +15%)",
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
                "status": "⛔",
                "note": "종가 46,000 / 60MA 46,417",
                "evalStatus": "not_met"
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
                "status": "⛔",
                "note": "20MA 이격 +24.7% (≤+22%) · RSI14 60 (≤72) · 20MA 과이격(반등 소진)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -172,480→887,699 / 기관 -179,378→-229,157 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 46,000 / 20MA 36,875 (124.7% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 87% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 46150, 전봉 종가 46050 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 131.3% / 마지막 1시간 42.9% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 196% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.42 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 46000,
            "previousClose": 42650,
            "dailyChange": 3350,
            "dailyChangePct": 7.85,
            "dailyDirection": "up",
            "entryPriceText": "46,000원 (당일 종가 기준)",
            "entryPrice": 46000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.7858,
            "marketCapRank": 127,
            "marketCapUniverseCount": 2550,
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
              "note": "KIND 최근공시 2026-08-18까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 46150, 전봉 종가 46050",
              "latestOpen": 46025.0,
              "latestClose": 46150.0,
              "previousClose": 46050.0
            },
            "toss": {
              "avgStrength": 131.3,
              "note": "토스 공개 체결강도 131.3% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A403870/order",
              "asOf": "2026-08-19T06:03:06Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 42.9,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 42.9,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.4614,
              "last30BuyVolume": 1182.0,
              "last30SellVolume": 2562.0
            },
            "orderbook": {
              "bidAskRatio": 0.4154,
              "bidTotal": 18410,
              "askTotal": 44320,
              "note": "Naver 호가잔량합계 매수 18,410 / 매도 44,320",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=403870"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 60.45, ATR10 8.42%, 일간 표준편차 7.38%, 당일 레인지 16.65%.",
              "metrics": {
                "atrPct10": 8.42,
                "returnStd20": 7.38,
                "todayRangePct": 16.65,
                "vkospi": 60.45
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
                "targetPrice": "46,900원",
                "historicalHitRate": 0.5333,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "48,300원",
                "historicalHitRate": 0.3333,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 44,942원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "44,942원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 39800,
              "fallbackStopPrice": 44942,
              "effectiveHardStopPrice": 44942,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 39,800원와 기존 % 손절 44,942원 중 더 높은 44,942원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 39,800원이며, 기존 % 손절 44,942원보다 느슨해지지 않게 44,942원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 45425,
              "high": 45885,
              "anchor": 46000,
              "label": "45,425~45,885원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 46900,
                "retrace33Price": 46297,
                "retrace50Price": 46450,
                "nearestResistancePrice": 46900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "46,900원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "47,150원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "47,610원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 44,942원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "44,942원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 46900,
                "retrace33Price": 46297,
                "retrace50Price": 46450,
                "nearestResistancePrice": 46900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "46,900원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+2.5%",
                    "targetPrice": "47,150원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 44,942원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "44,942원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 12건)",
                "recentHighPrice": 46900,
                "retrace33Price": 46297,
                "retrace50Price": 46450,
                "nearestResistancePrice": 46900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "46,900원",
                    "historicalHitRate": 0.5333,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "48,300원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 44,942원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "44,942원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 15건)",
                  "hitRate": 0.3333,
                  "ev": 0.369,
                  "sampleCount": 15
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 12건)",
              "sampleCount": 12,
              "ev": 0.6067
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 15건)",
              "hitRate": 0.3333,
              "ev": 0.369,
              "sampleCount": 15
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
              "핵심 Gate 미충족: G3",
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 3.8조 (필요 ≥ 5조) · 외 4건",
            "statusReason": "F2 미충족: 시총 3.8조 (필요 ≥ 5조) / G2 미충족: 20일 고점 대비 -1.9% (필요 -5%~-25%) / G3 미충족: 종가 46,000 / 60MA 46,417 / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 46000.0,
                "vs52wHighPct": 50.0,
                "vs52wLowPct": 86.23481781376519,
                "dropFrom52wHighPct": 50.0,
                "ma20GapPct": 24.74576271186441,
                "rsi14": 59.98406393074836,
                "volumeRatio20d": 244.78415078134802,
                "rs20Pct": 17.647058823529413,
                "tradingValueRank": 22.0,
                "marketCapRank": 127.0,
                "marketCapTrillion": 3.7858,
                "per": 46.65,
                "pbr": 12.76,
                "cnsPer": 31.57,
                "foreignRate": 32.96,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-08-19T15:04:09+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
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
  "analysisDate": "2026-08-19",
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
      "005380",
      "007660",
      "035420",
      "402340"
    ],
    "changedEntries": [
      {
        "strategy": "pullback",
        "code": "005380",
        "name": "현대차",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 7.9,
          "signalScore": 7.9,
          "score": 7.9,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 6.1,
          "grade": "B"
        },
        "after": {
          "strictScore": 9.2,
          "signalScore": 9.2,
          "score": 9.2,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 7.1,
          "grade": "A"
        }
      },
      {
        "strategy": "accumulation",
        "code": "402340",
        "name": "SK스퀘어",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 6.6,
          "signalScore": 6.6,
          "score": 6.6,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.5,
          "grade": "B"
        },
        "after": {
          "strictScore": 7.9,
          "signalScore": 7.9,
          "score": 7.9,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.6,
          "grade": "B"
        }
      },
      {
        "strategy": "accumulation",
        "code": "035420",
        "name": "NAVER",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score"
        ],
        "before": {
          "strictScore": 6.6,
          "signalScore": 6.6,
          "score": 6.6,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.5,
          "grade": "B"
        },
        "after": {
          "strictScore": 7.7,
          "signalScore": 7.7,
          "score": 7.7,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.5,
          "grade": "B"
        }
      },
      {
        "strategy": "breakout",
        "code": "007660",
        "name": "이수페타시스",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 5.2,
          "signalScore": 5.8,
          "score": 5.8,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 4.2,
          "grade": "C"
        },
        "after": {
          "strictScore": 6.1,
          "signalScore": 6.1,
          "score": 6.1,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 4.9,
          "grade": "C"
        }
      }
    ],
    "providerHealth": {
      "krx_pykrx_short_balance": {
        "ok": 4
      }
    },
    "sourcePointInTimeStatus": "confirmed"
  }
};
