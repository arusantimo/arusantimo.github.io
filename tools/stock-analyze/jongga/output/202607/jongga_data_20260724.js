window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-07-24"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-07-24T06:05:56+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "475150",
      "name": "SK이터닉스",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    }
  ],
  "dataQuality": {
    "status": "success",
    "counts": {
      "total": 23,
      "failed": 0,
      "stale": 0,
      "manual": 0,
      "fallback": 0,
      "slots": 1
    },
    "failedKeys": [],
    "staleKeys": [],
    "manualKeys": [],
    "fallbackKeys": [],
    "providerHealth": {
      "naver_mobile": {
        "ok": 23
      },
      "naver_chart": {
        "ok": 23
      },
      "naver_integration_schedule": {
        "ok": 10
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 23
      },
      "toss_http_strength": {
        "ok": 23
      },
      "toss_ticks_strength_proxy": {
        "ok": 23
      },
      "toss_quotes_orderbook": {
        "ok": 22
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
        "ok": 17
      }
    },
    "fallbackUsage": [],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 671.2,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 304.0,
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
        "durationMs": 1726.1,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 230.2,
        "detail": "박스권 ⚠️ (거시 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 51036.7,
        "count": 23
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 25404.8,
        "detail": "후보 17종목 중 17건 수집",
        "count": 17
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 8921.3,
        "detail": "성공 23 / 실패 0",
        "count": 23
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 9233.9,
        "detail": "direct-http · 체결강도 23 / 호가 22 / 틱프록시 23",
        "count": 23
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 89941.1,
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
        "durationMs": 75005.8,
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
            "value": "6713.04 (-5.41%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 78.75"
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
            "value": "G-C 🟡 (-0.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 70% 진입 / ⚠️ 50% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "7774.74",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7434.25",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 78.75",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 9 / 하락 11",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 85 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
            "verdict": "박스권 ⚠️ (거시 완충)"
          },
          {
            "item": "거시 맥락",
            "value": "표준 레짐 / RI 3.305986579280159",
            "verdict": "✅"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다. 적용 레짐은 market-analyze·KOSPI 보조 신호로 조정되었습니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20260724",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
          "regimeAdjustmentReason": "펀더 앵커 85 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
          "riseJustified": true,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 85.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.62,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 3.305986579280159,
          "stageOverrideReason": "VIX 급등 또는 저점 P-Index 조건으로 투매 단계를 우선 적용했습니다.",
          "kospiClose": 6713.04,
          "kospiMa5": 6774.37,
          "vkospiValue": 78.75,
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
            "actualValue": "-0.69%",
            "baseScore": "-1점",
            "weight": "×2.5",
            "formula": "-1 × 2.5 = -2.5점",
            "weightedScore": "-2.5점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+18.70",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+16.2bp",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-21.31원",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+4.01%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "-0.5점",
        "grade": "G-C 🟡",
        "code": "G-C",
        "entryAdjustment": "✅ 70% 진입 / ⚠️ 50% 진입",
        "sellAdjustment": "프리마켓 갭업 기준 -0.5%p 하향 | 손절폭 -0.5%p 축소",
        "swingAdjustment": "조건부 허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-07-25T03:59:00+00:00",
          "vix": "2026-07-24T20:15:00+00:00",
          "tnx": "2026-07-24T19:00:00+00:00",
          "krw": "2026-07-24T22:59:00+00:00",
          "sox": "2026-07-25T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "SK이노베이션",
            "code": "096770",
            "strictScore": 10.2,
            "signalScore": 10.2,
            "score": 10.2,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
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
                "note": "외인 380,223주 / 기관 623,334주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 128,300 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 1.29 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -22.7% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 188% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -8.9% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 부분 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 264% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 122,420 > 20MA 106,875 > 60MA 114,857 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 128,300 / 60MA 114,857",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 59.3 (필요 ≥ 50)",
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
                "note": "KOSPI 6,713 / 5MA 6,774 (-0.9%) · VKOSPI 78.8 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -2.95% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 59.3 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +20.0% (필요 ≤ +25%) · 60MA +11.7% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -22.7% (≥12%) · 거래량 188% (≥80%) · 수급추세 +4 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 거래량 / 앵커 거래량 78% · 시가 129,700 / 종가 128,300 / 전일 종가 132,200 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "종가 128,300 / 앵커 중심값 125,900 / 복합 지지 128,960 · 앵커 또는 지지 한 축 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 2.19:1 / 마지막 30분 평균 208.3% / 마지막 1시간 208.3% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-16 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 380,223주 / 기관 623,334주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 128,300 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 1.29 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -22.7% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +4 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 188% (≥100% 만점·80~100% 부분) · 충족",
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
                "note": "대차잔고 -8.9% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 부분 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 128300,
            "previousClose": 132200,
            "dailyChange": -3900,
            "dailyChangePct": -2.95,
            "dailyDirection": "down",
            "entryPriceText": "128,300원 (당일 종가 기준)",
            "entryPrice": 128300,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 21.6895,
            "marketCapRank": 34,
            "marketCapUniverseCount": 2550,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 380,223주 / 기관 623,334주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 129.0,
              "note": "토스 공개 체결강도 129.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-07-24T06:03:09Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 208.3,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 208.3,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.1896,
              "last30BuyVolume": 2910.0,
              "last30SellVolume": 1329.0
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-07-16 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 128,960원 (-0.51% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 128960,
                    "distancePct": -0.51,
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
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 116702,
                    "distancePct": 9.04,
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
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 112316,
                    "distancePct": 12.46,
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
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 119360,
                    "distancePct": 6.97,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 106234,
                    "distancePct": 17.2,
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
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 128960,
                  "distancePct": -0.51,
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
                    "price": 89450,
                    "distancePct": 30.28,
                    "count": 2,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 89400,
                    "bandHigh": 89500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 92060,
                    "distancePct": 28.25,
                    "count": 5,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 91000,
                    "bandHigh": 93000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 94533,
                    "distancePct": 26.32,
                    "count": 7,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 93700,
                    "bandHigh": 95200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 98510,
                    "distancePct": 23.22,
                    "count": 8,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 96500,
                    "bandHigh": 99800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 100300,
                    "distancePct": 21.82,
                    "count": 3,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 100200,
                    "bandHigh": 100600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 103836,
                    "distancePct": 19.07,
                    "count": 11,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 102400,
                    "bandHigh": 104900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 106067,
                    "distancePct": 17.33,
                    "count": 3,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 105700,
                    "bandHigh": 106400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 109180,
                    "distancePct": 14.9,
                    "count": 4,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 107800,
                    "bandHigh": 110200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 112433,
                    "distancePct": 12.37,
                    "count": 6,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 112000,
                    "bandHigh": 113000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 116086,
                    "distancePct": 9.52,
                    "count": 15,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 114500,
                    "bandHigh": 117700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 119120,
                    "distancePct": 7.16,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 118400,
                    "bandHigh": 119600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 122640,
                    "distancePct": 4.41,
                    "count": 7,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 121300,
                    "bandHigh": 124100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 126133,
                    "distancePct": 1.69,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 125200,
                    "bandHigh": 126700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 129317,
                    "distancePct": -0.79,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 128300,
                    "bandHigh": 130400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 133083,
                    "distancePct": -3.73,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 131900,
                    "bandHigh": 134700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 136500,
                    "distancePct": -6.39,
                    "count": 2,
                    "lastSeenDaysAgo": 53,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 135300,
                    "bandHigh": 137800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 145340,
                    "distancePct": -13.28,
                    "count": 3,
                    "lastSeenDaysAgo": 54,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 143500,
                    "bandHigh": 146700
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 112200,
                    "distancePct": 12.55,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 112100,
                    "bandHigh": 112300
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 117319,
                    "distancePct": 8.56,
                    "count": 9,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 5747549,
                    "binIndex": 10,
                    "binLow": 115908,
                    "binHigh": 118729
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 145527,
                    "distancePct": -13.43,
                    "count": 3,
                    "lastSeenDaysAgo": 54,
                    "valid": false,
                    "weight": 25,
                    "volume": 5575620,
                    "binIndex": 20,
                    "binLow": 144117,
                    "binHigh": 146938
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 128602,
                    "distancePct": -0.24,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 5064811,
                    "binIndex": 14,
                    "binLow": 127192,
                    "binHigh": 130012
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 95200,
                    "distancePct": 25.8,
                    "count": 1,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 202.3,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 104100,
                    "distancePct": 18.86,
                    "count": 1,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 349.8,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 106400,
                    "distancePct": 17.07,
                    "count": 1,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 200.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 119600,
                    "distancePct": 6.78,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 263.7,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 264% (5일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 263.9,
                "latestBurstDaysAgo": 1
              },
              "anchor": {
                "date": "20260723",
                "open": 119600,
                "close": 132200,
                "high": 132500,
                "low": 119600,
                "bodyMid": 125900,
                "volume": 1686912.0,
                "volumeRatio": 2.64,
                "daysAgo": 1
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 78% · 시가 129,700 / 종가 128,300 / 전일 종가 132,200 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "종가 128,300 / 앵커 중심값 125,900 / 복합 지지 128,960 · 앵커 또는 지지 한 축 이탈"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 2.19:1 / 마지막 30분 평균 208.3% / 마지막 1시간 208.3% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 78.75, ATR10 8.26%, 일간 표준편차 5.40%, 당일 레인지 7.03%.",
              "metrics": {
                "atrPct10": 8.26,
                "returnStd20": 5.4,
                "todayRangePct": 7.03,
                "vkospi": 78.75
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
              "anchorDate": "20260723",
              "anchorOpen": 119600,
              "anchorClose": 132200,
              "anchorHigh": 132500,
              "anchorLow": 119600,
              "anchorBodyMid": 125900,
              "anchorVolumeRatio": 2.64,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 125900,
              "ma10Price": 116850,
              "ma10PrevPrice": 113920,
              "ma20Price": 106875,
              "ma20PrevPrice": 105180,
              "ma10WarningPrice": null,
              "hardStopPrice": 125900,
              "fallbackStopPrice": 124451,
              "effectiveStopPrice": 125900,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 125,900원, 20일선 106,875원) = 125,900원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 124,451원) = 125,900원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 125,900원, 20일선 106,875원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 124,451원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "130,224원",
                "historicalHitRate": 0.6173,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "131,508원",
                "historicalHitRate": 0.4938,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "134,074원",
                "historicalHitRate": 0.3704,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "135,998원",
                "historicalHitRate": 0.2986,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 125,900원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-1.9%",
                "targetPrice": "125,900원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 126696,
              "high": 127979,
              "anchor": 128300,
              "label": "126,696~127,979원 (종가 ±, 분할매수)"
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
                    "targetPrice": "130,224원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "131,508원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "134,074원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "135,998원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 125,900원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "125,900원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 44건)",
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
                    "targetPrice": "130,224원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "131,508원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "134,074원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "135,998원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 125,900원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "125,900원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
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
                    "targetPrice": "130,224원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "131,508원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "134,074원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "135,998원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 125,900원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "125,900원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 44건)",
              "sampleCount": 44,
              "ev": -2.4253
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 162건)",
              "hitRate": 0.6173,
              "ev": 2.13,
              "sampleCount": 162
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
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G1, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 122,420 > 20MA 106,875 > 60MA 114,857 · 상승선 5MA, 20MA · 정배열 미충족 · 외 1건",
            "statusReason": "G1 미충족: 5MA 122,420 > 20MA 106,875 > 60MA 114,857 · 상승선 5MA, 20MA · 정배열 미충족 / G13 미충족: KIND 최근공시 2026-07-16 기업설명회(IR) 개최(안내공시)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 128300.0,
                "vs52wHighPct": 77.28915662650603,
                "vs52wLowPct": 46.29418472063854,
                "dropFrom52wHighPct": 22.710843373493976,
                "ma20GapPct": 20.046783625730992,
                "rsi14": 63.99094230179656,
                "volumeRatio20d": 187.9912811085769,
                "rs20Pct": 35.91101694915254,
                "supportDistancePct": 0.51,
                "tradingValueRank": 35.0,
                "marketCapRank": 34.0,
                "marketCapTrillion": 21.6895,
                "per": 0.0,
                "pbr": 0.92,
                "cnsPer": 9.73,
                "foreignRate": 14.74,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -8.883767285411736
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "LS ELECTRIC",
            "code": "010120",
            "strictScore": 10.7,
            "signalScore": 10.7,
            "score": 10.7,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 8.2,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 74,574주 / 기관 126,569주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 201,500 · 5MA·10MA·20MA 중 5MA, 10MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.09 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -39.9% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 103% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -13.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G12, G13)",
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
                "note": "5MA 196,800 > 20MA 207,105 > 60MA 241,218 · 상승선 5MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 201,500 / 60MA 241,218",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 54.5 (필요 ≥ 50)",
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
                "note": "KOSPI 6,713 / 5MA 6,774 (-0.9%) · VKOSPI 78.8 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -9.84% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 54.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -2.7% (필요 ≤ +25%) · 60MA -16.5% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -39.9% (≥12%) · 거래량 103% (≥80%) · 수급추세 +4 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "status": "⛔",
                "note": "마지막 30분 비율 0.18:1 / 마지막 30분 평균 12.7% / 마지막 1시간 12.7% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-23 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 74,574주 / 기관 126,569주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 201,500 · 5MA·10MA·20MA 중 5MA, 10MA 위",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -39.9% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +4 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 103% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -13.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.09 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 201500,
            "previousClose": 223500,
            "dailyChange": -22000,
            "dailyChangePct": -9.84,
            "dailyDirection": "down",
            "entryPriceText": "201,500원 (당일 종가 기준)",
            "entryPrice": 201500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 30.225,
            "marketCapRank": 22,
            "marketCapUniverseCount": 2550,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 74,574주 / 기관 126,569주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 70.0,
              "note": "토스 공개 체결강도 70.0% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A010120/order",
              "asOf": "2026-07-24T06:03:06Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 12.7,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 12.7,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 0.1756,
              "last30BuyVolume": 406.0,
              "last30SellVolume": 2312.0
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-07-23 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 196,855원 (2.31% 아래) · 강도 65점 · family 2개 · 수평 지지·스윙로우 군집",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 196855,
                    "distancePct": 2.31,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 177968,
                    "distancePct": 11.68,
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
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 201700,
                    "distancePct": -0.1,
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
                  },
                  {
                    "label": "수평 지지",
                    "price": 189643,
                    "distancePct": 5.88,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 183900,
                    "distancePct": 8.73,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 196855,
                  "distancePct": 2.31,
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
                "activeFamilyCount": 2,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 178886,
                    "distancePct": 11.22,
                    "count": 6,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 176500,
                    "bandHigh": 180800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 183900,
                    "distancePct": 8.73,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 183500,
                    "bandHigh": 184500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 189643,
                    "distancePct": 5.88,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 187700,
                    "bandHigh": 190700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 196660,
                    "distancePct": 2.4,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 195400,
                    "bandHigh": 198200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 201700,
                    "distancePct": -0.1,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 200000,
                    "bandHigh": 203000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 207900,
                    "distancePct": -3.18,
                    "count": 5,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 206000,
                    "bandHigh": 210000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 218444,
                    "distancePct": -8.41,
                    "count": 8,
                    "lastSeenDaysAgo": 13,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 217000,
                    "bandHigh": 219500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 223250,
                    "distancePct": -10.79,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 222500,
                    "bandHigh": 224500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 230611,
                    "distancePct": -14.45,
                    "count": 8,
                    "lastSeenDaysAgo": 14,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 227000,
                    "bandHigh": 232500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 238875,
                    "distancePct": -18.55,
                    "count": 13,
                    "lastSeenDaysAgo": 15,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 234500,
                    "bandHigh": 242000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 245143,
                    "distancePct": -21.66,
                    "count": 6,
                    "lastSeenDaysAgo": 16,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 243500,
                    "bandHigh": 247500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 253143,
                    "distancePct": -25.63,
                    "count": 6,
                    "lastSeenDaysAgo": 26,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 249500,
                    "bandHigh": 255500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 260333,
                    "distancePct": -29.2,
                    "count": 8,
                    "lastSeenDaysAgo": 16,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 257500,
                    "bandHigh": 263500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 273062,
                    "distancePct": -35.51,
                    "count": 8,
                    "lastSeenDaysAgo": 41,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 271500,
                    "bandHigh": 274500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 280000,
                    "distancePct": -38.96,
                    "count": 4,
                    "lastSeenDaysAgo": 42,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 278000,
                    "bandHigh": 281000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 286333,
                    "distancePct": -42.1,
                    "count": 3,
                    "lastSeenDaysAgo": 41,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 285000,
                    "bandHigh": 289000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 296125,
                    "distancePct": -46.96,
                    "count": 4,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 294000,
                    "bandHigh": 298500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 303250,
                    "distancePct": -50.5,
                    "count": 2,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 302500,
                    "bandHigh": 304000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 315667,
                    "distancePct": -56.66,
                    "count": 3,
                    "lastSeenDaysAgo": 52,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 313000,
                    "bandHigh": 318500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 177050,
                    "distancePct": 12.13,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 176500,
                    "bandHigh": 177600
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 197050,
                    "distancePct": 2.21,
                    "count": 2,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 196500,
                    "bandHigh": 197600
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 231000,
                    "distancePct": -14.64,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
                    "valid": false,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 230500,
                    "bandHigh": 231500
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 259052,
                    "distancePct": -28.56,
                    "count": 5,
                    "lastSeenDaysAgo": 16,
                    "valid": false,
                    "weight": 25,
                    "volume": 8761339,
                    "binIndex": 12,
                    "binLow": 255750,
                    "binHigh": 262354
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 252448,
                    "distancePct": -25.28,
                    "count": 6,
                    "lastSeenDaysAgo": 23,
                    "valid": false,
                    "weight": 25,
                    "volume": 7516135,
                    "binIndex": 11,
                    "binLow": 249146,
                    "binHigh": 255750
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 232635,
                    "distancePct": -15.45,
                    "count": 5,
                    "lastSeenDaysAgo": 14,
                    "valid": false,
                    "weight": 25,
                    "volume": 7012557,
                    "binIndex": 8,
                    "binLow": 229333,
                    "binHigh": 235938
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 202% (16일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 202.4,
                "latestBurstDaysAgo": 16
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
                  "summary": "마지막 30분 비율 0.18:1 / 마지막 30분 평균 12.7% / 마지막 1시간 12.7% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 78.75, ATR10 9.78%, 일간 표준편차 8.02%, 당일 레인지 11.63%.",
              "metrics": {
                "atrPct10": 9.78,
                "returnStd20": 8.02,
                "todayRangePct": 11.63,
                "vkospi": 78.75
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
              "ma10Price": 195020,
              "ma10PrevPrice": 193810,
              "ma20Price": 207105,
              "ma20PrevPrice": 207980,
              "ma10WarningPrice": null,
              "hardStopPrice": 195455,
              "fallbackStopPrice": 195455,
              "effectiveStopPrice": 195455,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 195,455원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 195,455원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "204,522원",
                "historicalHitRate": 0.6173,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "206,537원",
                "historicalHitRate": 0.4938,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "210,568원",
                "historicalHitRate": 0.3704,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "213,590원",
                "historicalHitRate": 0.2986,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 195,455원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "195,455원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 198981,
              "high": 200996,
              "anchor": 201500,
              "label": "198,981~200,996원 (종가 ±, 분할매수)"
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
                    "targetPrice": "204,522원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "206,537원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "210,568원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "213,590원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 195,455원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "195,455원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 44건)",
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
                    "targetPrice": "204,522원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "206,537원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "210,568원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "213,590원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 195,455원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "195,455원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
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
                    "targetPrice": "204,522원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "206,537원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "210,568원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "213,590원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 195,455원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "195,455원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 44건)",
              "sampleCount": 44,
              "ev": -2.4253
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 162건)",
              "hitRate": 0.6173,
              "ev": 2.13,
              "sampleCount": 162
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
              "핵심 Gate 미충족: G12",
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G1, G2, G12, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 196,800 > 20MA 207,105 > 60MA 241,218 · 상승선 5MA · 정배열 미충족 · 외 3건",
            "statusReason": "G1 미충족: 5MA 196,800 > 20MA 207,105 > 60MA 241,218 · 상승선 5MA · 정배열 미충족 / G2 미충족: 종가 201,500 / 60MA 241,218 / G12 미충족: 마지막 30분 비율 0.18:1 / 마지막 30분 평균 12.7% / 마지막 1시간 12.7% · 장 막판 투매 경고 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 201500.0,
                "vs52wHighPct": 60.149253731343286,
                "vs52wLowPct": 298.22134387351775,
                "dropFrom52wHighPct": 39.850746268656714,
                "ma20GapPct": -2.7063566789792617,
                "rsi14": 47.32130626020091,
                "volumeRatio20d": 102.99199780816268,
                "rs20Pct": -7.9908675799086755,
                "supportDistancePct": 2.31,
                "tradingValueRank": 28.0,
                "marketCapRank": 22.0,
                "marketCapTrillion": 30.225,
                "per": 89.64,
                "pbr": 14.49,
                "cnsPer": 57.2,
                "foreignRate": 18.19,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -13.118484175765538
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "삼성E&A",
            "code": "028050",
            "strictScore": 9.0,
            "signalScore": 9.0,
            "score": 9.0,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 6.9,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 205,044주 / 기관 288,644주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 47,450 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 46,750 ≤ 종가 47,450)"
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
                "note": "52주 고가 대비 -29.5% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 197% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "대차잔고 +1.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G12, G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 298% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 43,180 > 20MA 44,578 > 60MA 49,116 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 47,450 / 60MA 49,116",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 59.0 (필요 ≥ 50)",
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
                "note": "KOSPI 6,713 / 5MA 6,774 (-0.9%) · VKOSPI 78.8 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.71% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 59.0 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +6.4% (필요 ≤ +25%) · 60MA -3.4% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -29.5% (≥12%) · 거래량 197% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 거래량 / 앵커 거래량 66% · 시가 46,750 / 종가 47,450 / 전일 종가 46,650 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 47,450 / 앵커 중심값 44,175 / 복합 지지 46,134 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 0.61:1 / 마지막 30분 평균 117.8% / 마지막 1시간 117.8% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-23 연결재무제표기준영업(잠정)실적(공정공시)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 205,044주 / 기관 288,644주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 47,450 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 46,750 ≤ 종가 47,450)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -29.5% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 197% (≥100% 만점·80~100% 부분) · 충족",
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
                "note": "대차잔고 +1.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 47450,
            "previousClose": 46650,
            "dailyChange": 800,
            "dailyChangePct": 1.71,
            "dailyDirection": "up",
            "entryPriceText": "47,450원 (당일 종가 기준)",
            "entryPrice": 47450,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.3002,
            "marketCapRank": 72,
            "marketCapUniverseCount": 2550,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 205,044주 / 기관 288,644주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 110.1,
              "note": "토스 공개 체결강도 110.1% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A028050/order",
              "asOf": "2026-07-24T06:03:06Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 117.8,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 117.8,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.6126,
              "last30BuyVolume": 2144.0,
              "last30SellVolume": 3500.0
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-07-23 연결재무제표기준영업(잠정)실적(공정공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 46,134원 (2.77% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 46134,
                    "distancePct": 2.77,
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
                    "price": 42797,
                    "distancePct": 9.81,
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
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 38504,
                    "distancePct": 18.85,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 5,
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 41092,
                    "distancePct": 13.4,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 9,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 47536,
                    "distancePct": -0.18,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 17,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 46134,
                  "distancePct": 2.77,
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
                    "price": 38583,
                    "distancePct": 18.69,
                    "count": 3,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 38300,
                    "bandHigh": 38900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 39700,
                    "distancePct": 16.33,
                    "count": 4,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 39200,
                    "bandHigh": 40150
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 41185,
                    "distancePct": 13.2,
                    "count": 8,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 40800,
                    "bandHigh": 41500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 42544,
                    "distancePct": 10.34,
                    "count": 8,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 42050,
                    "bandHigh": 43000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 43590,
                    "distancePct": 8.13,
                    "count": 5,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 43200,
                    "bandHigh": 44100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 44746,
                    "distancePct": 5.7,
                    "count": 5,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 44450,
                    "bandHigh": 45000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 46114,
                    "distancePct": 2.81,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 45500,
                    "bandHigh": 46650
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 47536,
                    "distancePct": -0.18,
                    "count": 17,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 46900,
                    "bandHigh": 48100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 49107,
                    "distancePct": -3.49,
                    "count": 12,
                    "lastSeenDaysAgo": 13,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 48300,
                    "bandHigh": 49700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 50314,
                    "distancePct": -6.04,
                    "count": 6,
                    "lastSeenDaysAgo": 23,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 49900,
                    "bandHigh": 50800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 51710,
                    "distancePct": -8.98,
                    "count": 9,
                    "lastSeenDaysAgo": 16,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 51200,
                    "bandHigh": 52400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 53011,
                    "distancePct": -11.72,
                    "count": 12,
                    "lastSeenDaysAgo": 26,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 52500,
                    "bandHigh": 53500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 54633,
                    "distancePct": -15.14,
                    "count": 6,
                    "lastSeenDaysAgo": 41,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 54300,
                    "bandHigh": 55000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 56500,
                    "distancePct": -19.07,
                    "count": 2,
                    "lastSeenDaysAgo": 27,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 56300,
                    "bandHigh": 56700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 58633,
                    "distancePct": -23.57,
                    "count": 2,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 58300,
                    "bandHigh": 59000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 38425,
                    "distancePct": 19.02,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 38300,
                    "bandHigh": 38550
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 43050,
                    "distancePct": 9.27,
                    "count": 2,
                    "lastSeenDaysAgo": 30,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 42900,
                    "bandHigh": 43200
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 55821,
                    "distancePct": -17.64,
                    "count": 4,
                    "lastSeenDaysAgo": 27,
                    "valid": false,
                    "weight": 25,
                    "volume": 18934279,
                    "binIndex": 14,
                    "binLow": 55217,
                    "binHigh": 56425
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 54612,
                    "distancePct": -15.09,
                    "count": 5,
                    "lastSeenDaysAgo": 26,
                    "valid": false,
                    "weight": 25,
                    "volume": 15327566,
                    "binIndex": 13,
                    "binLow": 54008,
                    "binHigh": 55217
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 46154,
                    "distancePct": 2.73,
                    "count": 5,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 15126741,
                    "binIndex": 6,
                    "binLow": 45550,
                    "binHigh": 46758
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 41000,
                    "distancePct": 13.59,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 335.9,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 298% (전일) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 298.1,
                "latestBurstDaysAgo": 1
              },
              "anchor": {
                "date": "20260723",
                "open": 41700,
                "close": 46650,
                "high": 49700,
                "low": 41000,
                "bodyMid": 44175,
                "volume": 7112328.0,
                "volumeRatio": 3.36,
                "daysAgo": 1
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 66% · 시가 46,750 / 종가 47,450 / 전일 종가 46,650 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 47,450 / 앵커 중심값 44,175 / 복합 지지 46,134 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.61:1 / 마지막 30분 평균 117.8% / 마지막 1시간 117.8% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 78.75, ATR10 8.35%, 일간 표준편차 6.19%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 8.35,
                "returnStd20": 6.19,
                "todayRangePct": 8.25,
                "vkospi": 78.75
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
              "anchorDate": "20260723",
              "anchorOpen": 41700,
              "anchorClose": 46650,
              "anchorHigh": 49700,
              "anchorLow": 41000,
              "anchorBodyMid": 44175,
              "anchorVolumeRatio": 3.36,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 44175,
              "ma10Price": 42465,
              "ma10PrevPrice": 41925,
              "ma20Price": 44578,
              "ma20PrevPrice": 44365,
              "ma10WarningPrice": null,
              "hardStopPrice": 44578,
              "fallbackStopPrice": 46026,
              "effectiveStopPrice": 46026,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 44,175원, 20일선 44,578원) = 44,578원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 46,026원) = 46,026원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 44,175원, 20일선 44,578원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 46,026원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "48,162원",
                "historicalHitRate": 0.6173,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "48,636원",
                "historicalHitRate": 0.4938,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "49,585원",
                "historicalHitRate": 0.3704,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "50,297원",
                "historicalHitRate": 0.2986,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 46,026원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "46,026원"
              }
            ],
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 46857,
              "high": 47331,
              "anchor": 47450,
              "label": "46,857~47,331원 (종가 ±, 분할매수)"
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
                    "targetPrice": "48,162원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "48,636원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "49,585원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "50,297원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 46,026원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "46,026원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 44건)",
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
                    "targetPrice": "48,162원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "48,636원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "49,585원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "50,297원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 46,026원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "46,026원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
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
                    "targetPrice": "48,162원",
                    "historicalHitRate": 0.6173,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "48,636원",
                    "historicalHitRate": 0.4938,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "49,585원",
                    "historicalHitRate": 0.3704,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "50,297원",
                    "historicalHitRate": 0.2986,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 46,026원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "46,026원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 162건)",
                  "hitRate": 0.6173,
                  "ev": 2.13,
                  "sampleCount": 162
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 44건)",
              "sampleCount": 44,
              "ev": -2.4253
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 162건)",
              "hitRate": 0.6173,
              "ev": 2.13,
              "sampleCount": 162
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
              "핵심 Gate 미충족: G12",
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G1, G2, G12, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 43,180 > 20MA 44,578 > 60MA 49,116 · 상승선 5MA, 20MA · 정배열 미충족 · 외 3건",
            "statusReason": "G1 미충족: 5MA 43,180 > 20MA 44,578 > 60MA 49,116 · 상승선 5MA, 20MA · 정배열 미충족 / G2 미충족: 종가 47,450 / 60MA 49,116 / G12 미충족: 마지막 30분 비율 0.61:1 / 마지막 30분 평균 117.8% / 마지막 1시간 117.8% · 장 막판 투매 경고 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 47450.0,
                "vs52wHighPct": 70.50520059435364,
                "vs52wLowPct": 104.96760259179266,
                "dropFrom52wHighPct": 29.49479940564636,
                "ma20GapPct": 6.44383377264315,
                "rsi14": 54.32614970645788,
                "volumeRatio20d": 197.21268818537942,
                "rs20Pct": 9.837962962962964,
                "supportDistancePct": 2.77,
                "tradingValueRank": 27.0,
                "marketCapRank": 72.0,
                "marketCapTrillion": 9.3002,
                "per": 14.94,
                "pbr": 1.94,
                "cnsPer": 13.22,
                "foreignRate": 38.68,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 0.953821075886586
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
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
            "name": "SK텔레콤",
            "code": "017670",
            "strictScore": 4.6,
            "signalScore": 4.6,
            "score": 4.6,
            "scoreMax": 12.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 3.7,
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -1,073,338주 / 기관 655,632주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 131.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 97.2% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 347% · 폭발적 급증 (≥300%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 97.2% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 26% / 윗꼬리·몸통 1.07 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.46 (필요 ≥ 1.2)"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 -9.4% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 미충족"
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
                "note": "5일 초과 +15.2% / 20일 초과 +36.3%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 72.6% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 19",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 347% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 26% / 윗꼬리·몸통 1.07 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +2.41% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 101,900 / 5MA 93,060 (전일 5MA 90,620) · 5MA 위·우상향",
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
                "code": "S2",
                "note": "당일 평균 131.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 97.2% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 347% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 97.2% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -1,073,338주 / 기관 655,632주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 26% / 윗꼬리·몸통 1.07 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.46 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -9.4% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 101900,
            "previousClose": 99500,
            "dailyChange": 2400,
            "dailyChangePct": 2.41,
            "dailyDirection": "up",
            "entryPriceText": "101,900원 (당일 종가 기준)",
            "entryPrice": 101900,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 21.8871,
            "marketCapRank": 33,
            "marketCapUniverseCount": 2550,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -1,073,338주 / 기관 655,632주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 131.0,
              "note": "토스 공개 체결강도 131.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A017670/order",
              "asOf": "2026-07-24T06:03:05Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 163.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 163.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.264,
              "last30BuyVolume": 5137.0,
              "last30SellVolume": 4064.0
            },
            "orderbook": {
              "bidAskRatio": 0.457,
              "bidTotal": 5849,
              "askTotal": 12800,
              "note": "Naver 호가잔량합계 매수 5,849 / 매도 12,800",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=017670"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 78.75, ATR10 7.38%, 일간 표준편차 3.53%, 당일 레인지 10.55%.",
              "metrics": {
                "atrPct10": 7.38,
                "returnStd20": 3.53,
                "todayRangePct": 10.55,
                "vkospi": 78.75
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
              "referencePrice": 100800,
              "referenceBandLow": 95000,
              "referenceBandHigh": 100800,
              "entryDayOpenPrice": 99200,
              "fallbackStopPrice": 97314,
              "effectiveHardStopPrice": 100800,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 100,800원와 기존 % 손절 97,314원 중 더 높은 100,800원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 100,800원이며, 기존 % 손절 97,314원보다 느슨해지지 않게 100,800원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.1%",
                "targetPrice": "102,000원",
                "historicalHitRate": 0.635,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.9%",
                "targetPrice": "107,900원",
                "historicalHitRate": 0.4234,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+7.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+7.5%",
                "targetPrice": "109,542원",
                "historicalHitRate": 0.292,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.5%",
                "targetPrice": "112,600원",
                "historicalHitRate": 0.2409,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+13.5%",
                "targetPrice": "115,656원",
                "historicalHitRate": 0.1694,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 100,800원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.1%",
                "targetPrice": "100,800원"
              }
            ],
            "rr": "1 : 6.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 100626,
              "high": 101645,
              "anchor": 101900,
              "label": "100,626~101,645원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 102000,
                "secondaryResistancePrice": 107900,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "104,447원",
                    "historicalHitRate": 0.635,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "106,486원",
                    "historicalHitRate": 0.4234,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "109,542원",
                    "historicalHitRate": 0.292,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.5%",
                    "targetPrice": "112,600원",
                    "historicalHitRate": 0.2409,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.5%",
                    "targetPrice": "115,656원",
                    "historicalHitRate": 0.1694,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,800원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "100,800원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 124건)",
                  "hitRate": 0.1694,
                  "ev": 1.406,
                  "sampleCount": 124
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 102000,
                "secondaryResistancePrice": 107900,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "102,000원",
                    "historicalHitRate": 0.635,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "106,486원",
                    "historicalHitRate": 0.4234,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "109,542원",
                    "historicalHitRate": 0.292,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.5%",
                    "targetPrice": "112,600원",
                    "historicalHitRate": 0.2409,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.5%",
                    "targetPrice": "115,656원",
                    "historicalHitRate": 0.1694,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,800원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "100,800원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 124건)",
                  "hitRate": 0.1694,
                  "ev": 1.406,
                  "sampleCount": 124
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 42건)",
                "nearestResistancePrice": 102000,
                "secondaryResistancePrice": 107900,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "102,000원",
                    "historicalHitRate": 0.635,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "107,900원",
                    "historicalHitRate": 0.4234,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "109,542원",
                    "historicalHitRate": 0.292,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.5%",
                    "targetPrice": "112,600원",
                    "historicalHitRate": 0.2409,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.5%",
                    "targetPrice": "115,656원",
                    "historicalHitRate": 0.1694,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 100,800원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "100,800원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 124건)",
                  "hitRate": 0.1694,
                  "ev": 1.406,
                  "sampleCount": 124
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 42건)",
              "sampleCount": 42,
              "ev": -1.3708
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 124건)",
              "hitRate": 0.1694,
              "ev": 1.406,
              "sampleCount": 124
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 72.6% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 72.6% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 101900.0,
                "vs52wHighPct": 72.63007840342124,
                "vs52wLowPct": 98.24902723735408,
                "dropFrom52wHighPct": 27.369921596578763,
                "ma20GapPct": 15.011286681715575,
                "rsi14": 63.64012803827805,
                "volumeRatio20d": 347.1310890078069,
                "rs20Pct": 11.487964989059082,
                "tradingValueRank": 19.0,
                "marketCapRank": 33.0,
                "marketCapTrillion": 21.8871,
                "per": 59.73,
                "pbr": 1.63,
                "cnsPer": 17.5,
                "foreignRate": 76.49,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -9.382759382759383
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
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
            "name": "SK이노베이션",
            "code": "096770",
            "strictScore": 9.4,
            "signalScore": 9.4,
            "score": 9.4,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 6.7,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 380,223주 / 기관 623,334주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +380,223 / 전일 +197,352 · 기관 당일 +623,334 / 전일 +125,738 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 208.3% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 129.0% / 마지막 1시간 208.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,940,871주 · 동반 양수 3/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 120.0% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 122,420 / 20MA 106,875 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 117% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -2.95% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -0.88% / KOSPI -5.41% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.19:1 · 평균 체결강도 208.3% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -8.9% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 부분 충족"
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
                "note": "외인 전일 +197,352/당일 +380,223 · 기관 전일 +125,738/당일 +623,334 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 128,300 / 60MA 114,857",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 77.3% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 188% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 14.7% (≥25%) · 20일 수익률 +35.9% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,713 / 5MA 6,774 (-0.9%) · VKOSPI 78.8 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 380,223주 / 기관 623,334주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +380,223 / 전일 +197,352 · 기관 당일 +623,334 / 전일 +125,738 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 208.3% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 129.0% / 마지막 1시간 208.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,940,871주 · 동반 양수 3/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 122,420 / 20MA 106,875 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -2.95% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -0.88% / KOSPI -5.41% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.19:1 · 평균 체결강도 208.3% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 120.0% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 117% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -8.9% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 부분 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 128300,
            "previousClose": 132200,
            "dailyChange": -3900,
            "dailyChangePct": -2.95,
            "dailyDirection": "down",
            "entryPriceText": "128,300원 (당일 종가 기준)",
            "entryPrice": 128300,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 21.6895,
            "marketCapRank": 34,
            "marketCapUniverseCount": 2550,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 380,223주 / 기관 623,334주 / 마지막 1시간 208.3% · 장후반 매수세 강화 · 마지막 30분 틱 2.19:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 129.0,
              "note": "토스 공개 체결강도 129.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-07-24T06:03:09Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 208.3,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 208.3,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.1896,
              "last30BuyVolume": 2910.0,
              "last30SellVolume": 1329.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 78.75, ATR10 8.26%, 일간 표준편차 5.40%, 당일 레인지 7.03%.",
              "metrics": {
                "atrPct10": 8.26,
                "returnStd20": 5.4,
                "todayRangePct": 7.03,
                "vkospi": 78.75
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 1940871.0,
              "positiveDays": 3,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260723",
                    "net": 380223.0
                  },
                  {
                    "date": "20260722",
                    "net": 197352.0
                  },
                  {
                    "date": "20260721",
                    "net": 18154.0
                  },
                  {
                    "date": "20260720",
                    "net": -108247.0
                  },
                  {
                    "date": "20260716",
                    "net": -210377.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260723",
                    "net": 623334.0
                  },
                  {
                    "date": "20260722",
                    "net": 125738.0
                  },
                  {
                    "date": "20260721",
                    "net": 62654.0
                  },
                  {
                    "date": "20260720",
                    "net": 215918.0
                  },
                  {
                    "date": "20260716",
                    "net": 636122.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260723",
                    "net": 1003557.0
                  },
                  {
                    "date": "20260722",
                    "net": 323090.0
                  },
                  {
                    "date": "20260721",
                    "net": 80808.0
                  },
                  {
                    "date": "20260720",
                    "net": 107671.0
                  },
                  {
                    "date": "20260716",
                    "net": 425745.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,940,871주 · 동반 양수 3/5일 · 증가 2회"
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
                "targetYield": "+2.4%",
                "targetPrice": "131,400원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.8%",
                "targetPrice": "135,800원",
                "historicalHitRate": 0.125,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.8%",
                "targetPrice": "135,800원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "138,564원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "142,413원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 123,810원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "123,810원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260723",
              "anchorOpen": 119600,
              "anchorClose": 132200,
              "anchorVolumeRatio20d": 2.64,
              "anchorStopPrice": 119600,
              "fallbackStopPrice": 123810,
              "effectiveHardStopPrice": 123810,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 119,600원와 기존 % 손절 123,810원 중 더 높은 123,810원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 119,600원를 기준으로 잡고, 기존 % 손절 123,810원보다 느슨해지지 않게 123,810원로 고정합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 126696,
              "high": 127979,
              "anchor": 128300,
              "label": "126,696~127,979원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 131400,
                "secondaryResistancePrice": 135800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "130,224원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "132,149원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "135,356원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "138,564원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "142,413원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,810원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "123,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 131400,
                "secondaryResistancePrice": 135800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "130,224원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "132,149원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "135,356원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "138,564원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "142,413원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,810원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "123,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 8건)",
                "nearestResistancePrice": 131400,
                "secondaryResistancePrice": 135800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "131,400원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.8%",
                    "targetPrice": "135,800원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.8%",
                    "targetPrice": "135,800원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "138,564원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "142,413원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 123,810원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "123,810원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 8건)",
              "sampleCount": 8,
              "ev": -5.3541
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.125,
              "ev": -2.569,
              "sampleCount": 8
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
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 188% (필요 < 150%) · 외 1건",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 188% (필요 < 150%) / Q1 미충족: 외인 보유율 14.7% (≥25%) · 20일 수익률 +35.9% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 128300.0,
                "vs52wHighPct": 77.28915662650603,
                "vs52wLowPct": 46.29418472063854,
                "dropFrom52wHighPct": 22.710843373493976,
                "ma20GapPct": 20.046783625730992,
                "rsi14": 63.99094230179656,
                "volumeRatio20d": 187.9912811085769,
                "rs20Pct": 35.91101694915254,
                "tradingValueRank": 35.0,
                "marketCapRank": 34.0,
                "marketCapTrillion": 21.6895,
                "per": 0.0,
                "pbr": 0.92,
                "cnsPer": 9.73,
                "foreignRate": 14.74,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -8.883767285411736
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "SK이터닉스",
            "code": "475150",
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
                "note": "외인 837,976주 / 기관 160,320주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +837,976 / 전일 +927,966 · 기관 당일 +160,320 / 전일 +96,528 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 182.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 94.4% / 마지막 1시간 182.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +2,790,307주 · 동반 양수 4/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 153.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 67,020 / 20MA 52,718 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 199% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +0.12% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -1.48% / KOSPI -5.41% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.10:1 · 평균 체결강도 182.1% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 +927,966/당일 +837,976 · 기관 전일 +96,528/당일 +160,320 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 80,700 / 60MA 47,971",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⚠️",
                "note": "52주 고가 대비 92.0% (필요 < 92%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 3",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 297% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 9.0% (≥25%) · 20일 수익률 +64.5% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,713 / 5MA 6,774 (-0.9%) · VKOSPI 78.8 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 837,976주 / 기관 160,320주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +837,976 / 전일 +927,966 · 기관 당일 +160,320 / 전일 +96,528 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 182.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 94.4% / 마지막 1시간 182.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +2,790,307주 · 동반 양수 4/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 67,020 / 20MA 52,718 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +0.12% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.48% / KOSPI -5.41% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.10:1 · 평균 체결강도 182.1% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 153.1% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 199% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 80700,
            "previousClose": 80600,
            "dailyChange": 100,
            "dailyChangePct": 0.12,
            "dailyDirection": "up",
            "entryPriceText": "80,700원 (당일 종가 기준)",
            "entryPrice": 80700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.7492,
            "marketCapRank": 157,
            "marketCapUniverseCount": 2550,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 837,976주 / 기관 160,320주 / 마지막 1시간 182.1% · 장후반 매수세 강화 · 마지막 30분 틱 2.10:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 94.4,
              "note": "토스 공개 체결강도 94.4% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A475150/order",
              "asOf": "2026-07-24T06:03:02Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 182.1,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 182.1,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.098,
              "last30BuyVolume": 2719.0,
              "last30SellVolume": 1296.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 78.75, ATR10 14.82%, 일간 표준편차 10.25%, 당일 레인지 15.14%.",
              "metrics": {
                "atrPct10": 14.82,
                "returnStd20": 10.25,
                "todayRangePct": 15.14,
                "vkospi": 78.75
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 2790307.0,
              "positiveDays": 4,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260723",
                    "net": 837976.0
                  },
                  {
                    "date": "20260722",
                    "net": 927966.0
                  },
                  {
                    "date": "20260721",
                    "net": 388334.0
                  },
                  {
                    "date": "20260720",
                    "net": 13958.0
                  },
                  {
                    "date": "20260716",
                    "net": -308500.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260723",
                    "net": 160320.0
                  },
                  {
                    "date": "20260722",
                    "net": 96528.0
                  },
                  {
                    "date": "20260721",
                    "net": 55559.0
                  },
                  {
                    "date": "20260720",
                    "net": 438625.0
                  },
                  {
                    "date": "20260716",
                    "net": 179541.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260723",
                    "net": 998296.0
                  },
                  {
                    "date": "20260722",
                    "net": 1024494.0
                  },
                  {
                    "date": "20260721",
                    "net": 443893.0
                  },
                  {
                    "date": "20260720",
                    "net": 452583.0
                  },
                  {
                    "date": "20260716",
                    "net": -128959.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +2,790,307주 · 동반 양수 4/5일 · 증가 2회"
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
                "targetYield": "+8.7%",
                "targetPrice": "87,700원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+8.7%",
                "targetPrice": "87,700원",
                "historicalHitRate": 0.125,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.7%",
                "targetPrice": "87,700원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.7%",
                "targetPrice": "87,700원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "89,577원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 77,876원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "77,876원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260723",
              "anchorOpen": 64500,
              "anchorClose": 80600,
              "anchorVolumeRatio20d": 3.09,
              "anchorStopPrice": 64500,
              "fallbackStopPrice": 77876,
              "effectiveHardStopPrice": 77876,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 64,500원와 기존 % 손절 77,876원 중 더 높은 77,876원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 64,500원를 기준으로 잡고, 기존 % 손절 77,876원보다 느슨해지지 않게 77,876원로 고정합니다."
            },
            "rr": "1 : 2.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 79691,
              "high": 80498,
              "anchor": 80700,
              "label": "79,691~80,498원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 87700,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "81,910원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "83,121원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "85,138원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "87,156원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "89,577원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 77,876원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "77,876원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 87700,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "81,910원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "83,121원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "85,138원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "87,156원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "89,577원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 77,876원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "77,876원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 8건)",
                "nearestResistancePrice": 87700,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+8.7%",
                    "targetPrice": "87,700원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+8.7%",
                    "targetPrice": "87,700원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.7%",
                    "targetPrice": "87,700원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.7%",
                    "targetPrice": "87,700원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "89,577원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 77,876원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "77,876원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 8건)",
              "sampleCount": 8,
              "ev": -5.3541
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.125,
              "ev": -2.569,
              "sampleCount": 8
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
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 297% (필요 < 150%) · 외 1건",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 297% (필요 < 150%) / Q1 미충족: 외인 보유율 9.0% (≥25%) · 20일 수익률 +64.5% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 80700.0,
                "vs52wHighPct": 92.01824401368302,
                "vs52wLowPct": 368.91342242882047,
                "dropFrom52wHighPct": 7.98175598631699,
                "ma20GapPct": 53.08009674206857,
                "rsi14": 75.67866063512295,
                "volumeRatio20d": 297.2203925561306,
                "rs20Pct": 64.52599388379205,
                "tradingValueRank": 3.0,
                "marketCapRank": 157.0,
                "marketCapTrillion": 2.7492,
                "per": 110.7,
                "pbr": 10.16,
                "cnsPer": 91.7,
                "foreignRate": 8.96,
                "supplyTrendScore": 4.0
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "삼성E&A",
            "code": "028050",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 5.1,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 205,044주 / 기관 288,644주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +205,044 / 전일 -151,956 · 기관 당일 +288,644 / 전일 +31,755 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 117.8% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 110.1% / 마지막 1시간 117.8% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +634,378주 · 동반 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 106.4% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 43,180 / 20MA 44,578 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 196% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +1.71% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -4.20% / KOSPI -5.41% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.61:1 · 평균 체결강도 117.8% (필요 ≥ 1.1:1)"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +1.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G4)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -151,956/당일 +205,044 · 기관 전일 +31,755/당일 +288,644 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 47,450 / 60MA 49,116",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 70.5% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 27",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 197% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 38.7% (≥25%) · 20일 수익률 +9.8% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,713 / 5MA 6,774 (-0.9%) · VKOSPI 78.8 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 205,044주 / 기관 288,644주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +205,044 / 전일 -151,956 · 기관 당일 +288,644 / 전일 +31,755 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 117.8% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 110.1% / 마지막 1시간 117.8% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +634,378주 · 동반 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +1.71% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -4.20% / KOSPI -5.41% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 106.4% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "5MA 43,180 / 20MA 44,578 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 196% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.61:1 · 평균 체결강도 117.8% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +1.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 47450,
            "previousClose": 46650,
            "dailyChange": 800,
            "dailyChangePct": 1.71,
            "dailyDirection": "up",
            "entryPriceText": "47,450원 (당일 종가 기준)",
            "entryPrice": 47450,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.3002,
            "marketCapRank": 72,
            "marketCapUniverseCount": 2550,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 205,044주 / 기관 288,644주 / 마지막 1시간 117.8% · 장후반 매수세 강화 · 마지막 30분 틱 0.61:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 110.1,
              "note": "토스 공개 체결강도 110.1% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A028050/order",
              "asOf": "2026-07-24T06:03:06Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 117.8,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 117.8,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.6126,
              "last30BuyVolume": 2144.0,
              "last30SellVolume": 3500.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 78.75, ATR10 8.35%, 일간 표준편차 6.19%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 8.35,
                "returnStd20": 6.19,
                "todayRangePct": 8.25,
                "vkospi": 78.75
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 634378.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260723",
                    "net": 205044.0
                  },
                  {
                    "date": "20260722",
                    "net": -151956.0
                  },
                  {
                    "date": "20260721",
                    "net": 110161.0
                  },
                  {
                    "date": "20260720",
                    "net": 33307.0
                  },
                  {
                    "date": "20260716",
                    "net": 105485.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260723",
                    "net": 288644.0
                  },
                  {
                    "date": "20260722",
                    "net": 31755.0
                  },
                  {
                    "date": "20260721",
                    "net": 46155.0
                  },
                  {
                    "date": "20260720",
                    "net": 82620.0
                  },
                  {
                    "date": "20260716",
                    "net": -116837.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260723",
                    "net": 493688.0
                  },
                  {
                    "date": "20260722",
                    "net": -120201.0
                  },
                  {
                    "date": "20260721",
                    "net": 156316.0
                  },
                  {
                    "date": "20260720",
                    "net": 115927.0
                  },
                  {
                    "date": "20260716",
                    "net": -11352.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +634,378주 · 동반 양수 3/5일 · 증가 3회"
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
                "targetYield": "+1.3%",
                "targetPrice": "48,050원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.9%",
                "targetPrice": "49,300원",
                "historicalHitRate": 0.125,
                "recommended": true
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "50,060원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "51,246원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "52,670원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 45,789원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "45,789원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260723",
              "anchorOpen": 41700,
              "anchorClose": 46650,
              "anchorVolumeRatio20d": 3.36,
              "anchorStopPrice": 41700,
              "fallbackStopPrice": 45789,
              "effectiveHardStopPrice": 45789,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 41,700원와 기존 % 손절 45,789원 중 더 높은 45,789원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 41,700원를 기준으로 잡고, 기존 % 손절 45,789원보다 느슨해지지 않게 45,789원로 고정합니다."
            },
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 46857,
              "high": 47331,
              "anchor": 47450,
              "label": "46,857~47,331원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 48050,
                "secondaryResistancePrice": 49300,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "48,162원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "48,874원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "50,060원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "51,246원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "52,670원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 45,789원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "45,789원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 48050,
                "secondaryResistancePrice": 49300,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "48,050원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "48,874원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "50,060원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "51,246원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "52,670원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 45,789원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "45,789원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 8건)",
                "nearestResistancePrice": 48050,
                "secondaryResistancePrice": 49300,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "48,050원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "49,300원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "50,060원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "51,246원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "52,670원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 45,789원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "45,789원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.569,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 8건)",
              "sampleCount": 8,
              "ev": -5.3541
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.125,
              "ev": -2.569,
              "sampleCount": 8
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
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G1, G4)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 47,450 / 60MA 49,116 · 외 1건",
            "statusReason": "G1 미충족: 종가 47,450 / 60MA 49,116 / G4 미충족: 당일 거래량 / 20일 평균 197% (필요 < 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 47450.0,
                "vs52wHighPct": 70.50520059435364,
                "vs52wLowPct": 104.96760259179266,
                "dropFrom52wHighPct": 29.49479940564636,
                "ma20GapPct": 6.44383377264315,
                "rsi14": 54.32614970645788,
                "volumeRatio20d": 197.21268818537942,
                "rs20Pct": 9.837962962962964,
                "tradingValueRank": 27.0,
                "marketCapRank": 72.0,
                "marketCapTrillion": 9.3002,
                "per": 14.94,
                "pbr": 1.94,
                "cnsPer": 13.22,
                "foreignRate": 38.68,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 0.953821075886586
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
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
            "name": "삼성E&A",
            "code": "028050",
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
                "note": "외인 -151,956→205,044 / 기관 31,755→288,644 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 110.1% / 마지막 1시간 117.8% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 47,450 / 20MA 44,578 (106.4% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 51% (필요 ≥ 50%)"
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
                "note": "매수/매도 호가잔량 0.49 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 47700, 전봉 종가 47650 충족"
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
                "note": "당일 거래대금 순위 27위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 9.3조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-23 연결재무제표기준영업(잠정)실적(공정공시)",
                "evalStatus": "not_met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-07-23) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +8.0% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.3% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 47,450 / 60MA 49,116",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.0% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +6.4% (≤+22%) · RSI14 54 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -151,956→205,044 / 기관 31,755→288,644 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 110.1% / 마지막 1시간 117.8% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 47,450 / 20MA 44,578 (106.4% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 51% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 47700, 전봉 종가 47650 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 196% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.49 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 47450,
            "previousClose": 46650,
            "dailyChange": 800,
            "dailyChangePct": 1.71,
            "dailyDirection": "up",
            "entryPriceText": "47,450원 (당일 종가 기준)",
            "entryPrice": 47450,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 9.3002,
            "marketCapRank": 72,
            "marketCapUniverseCount": 2550,
            "keyPoint": "20일 고점 대비 -11.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-23 연결재무제표기준영업(잠정)실적(공정공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 47700, 전봉 종가 47650",
              "latestOpen": 47650.0,
              "latestClose": 47700.0,
              "previousClose": 47650.0
            },
            "toss": {
              "avgStrength": 110.1,
              "note": "토스 공개 체결강도 110.1% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A028050/order",
              "asOf": "2026-07-24T06:03:06Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 117.8,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 117.8,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.6126,
              "last30BuyVolume": 2144.0,
              "last30SellVolume": 3500.0
            },
            "orderbook": {
              "bidAskRatio": 0.493,
              "bidTotal": 18461,
              "askTotal": 37443,
              "note": "Naver 호가잔량합계 매수 18,461 / 매도 37,443",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=028050"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 78.75, ATR10 8.35%, 일간 표준편차 6.19%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 8.35,
                "returnStd20": 6.19,
                "todayRangePct": 8.25,
                "vkospi": 78.75
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
                "targetPrice": "48,874원",
                "historicalHitRate": 0.654,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+4.0%",
                "targetPrice": "49,350원",
                "historicalHitRate": 0.5443,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 46,359원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "46,359원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 45500,
              "fallbackStopPrice": 46359,
              "effectiveHardStopPrice": 46359,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 45,500원와 기존 % 손절 46,359원 중 더 높은 46,359원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 45,500원이며, 기존 % 손절 46,359원보다 느슨해지지 않게 46,359원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 46857,
              "high": 47331,
              "anchor": 47450,
              "label": "46,857~47,331원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 53500,
                "retrace33Price": 49446,
                "retrace50Price": 50475,
                "nearestResistancePrice": 48050,
                "secondaryResistancePrice": 49350,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.2%",
                    "targetPrice": "49,446원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "49,350원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+12.8%",
                    "targetPrice": "53,500원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 46,359원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "46,359원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 53500,
                "retrace33Price": 49446,
                "retrace50Price": 50475,
                "nearestResistancePrice": 48050,
                "secondaryResistancePrice": 49350,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.2%",
                    "targetPrice": "49,446원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.2%",
                    "targetPrice": "49,446원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 46,359원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "46,359원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 102건)",
                "recentHighPrice": 53500,
                "retrace33Price": 49446,
                "retrace50Price": 50475,
                "nearestResistancePrice": 48050,
                "secondaryResistancePrice": 49350,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "48,874원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "49,350원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 46,359원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "46,359원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 102건)",
              "sampleCount": 102,
              "ev": 0.1853
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 237건)",
              "hitRate": 0.654,
              "ev": 1.192,
              "sampleCount": 237
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
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G3",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F3 미충족: KIND 최근공시 2026-07-23 연결재무제표기준영업(잠정)실적(공정공시) · 외 2건",
            "statusReason": "F3 미충족: KIND 최근공시 2026-07-23 연결재무제표기준영업(잠정)실적(공정공시) / G1 미충족: 1개월 수익률 +8.0% (필요 ≥ +15%) / G3 미충족: 종가 47,450 / 60MA 49,116",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 47450.0,
                "vs52wHighPct": 70.50520059435364,
                "vs52wLowPct": 104.96760259179266,
                "dropFrom52wHighPct": 29.49479940564636,
                "ma20GapPct": 6.44383377264315,
                "rsi14": 54.32614970645788,
                "volumeRatio20d": 197.21268818537942,
                "rs20Pct": 9.837962962962964,
                "tradingValueRank": 27.0,
                "marketCapRank": 72.0,
                "marketCapTrillion": 9.3002,
                "per": 14.94,
                "pbr": 1.94,
                "cnsPer": 13.22,
                "foreignRate": 38.68,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 0.953821075886586
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "SK텔레콤",
            "code": "017670",
            "strictScore": 7.0,
            "signalScore": 7.0,
            "score": 7.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 7.0,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -251,908→-1,073,338 / 기관 660,486→655,632 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 131.0% / 마지막 1시간 163.5% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 101,900 / 20MA 88,600 (115.0% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "note": "당일 거래량 / 5일 평균 236% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.46 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 103600, 전봉 종가 103100 충족"
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
                "note": "시총 21.9조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-23 현금ㆍ현물 배당 결정",
                "evalStatus": "not_met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-07-22) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +12.0% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -2.8% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 101,900 / 60MA 96,473",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.6% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +15.0% (≤+22%) · RSI14 64 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 131.0% / 마지막 1시간 163.5% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 101,900 / 20MA 88,600 (115.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 72% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 236% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 103600, 전봉 종가 103100 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -251,908→-1,073,338 / 기관 660,486→655,632 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.46 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 101900,
            "previousClose": 99500,
            "dailyChange": 2400,
            "dailyChangePct": 2.41,
            "dailyDirection": "up",
            "entryPriceText": "101,900원 (당일 종가 기준)",
            "entryPrice": 101900,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 21.8871,
            "marketCapRank": 33,
            "marketCapUniverseCount": 2550,
            "keyPoint": "20일 고점 대비 -2.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-23 현금ㆍ현물 배당 결정",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 103600, 전봉 종가 103100",
              "latestOpen": 103200.0,
              "latestClose": 103600.0,
              "previousClose": 103100.0
            },
            "toss": {
              "avgStrength": 131.0,
              "note": "토스 공개 체결강도 131.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A017670/order",
              "asOf": "2026-07-24T06:03:05Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 163.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 163.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.264,
              "last30BuyVolume": 5137.0,
              "last30SellVolume": 4064.0
            },
            "orderbook": {
              "bidAskRatio": 0.457,
              "bidTotal": 5849,
              "askTotal": 12800,
              "note": "Naver 호가잔량합계 매수 5,849 / 매도 12,800",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=017670"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 78.75, ATR10 7.38%, 일간 표준편차 3.53%, 당일 레인지 10.55%.",
              "metrics": {
                "atrPct10": 7.38,
                "returnStd20": 3.53,
                "todayRangePct": 10.55,
                "vkospi": 78.75
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.8%",
                "targetPrice": "104,800원",
                "historicalHitRate": 0.654,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 1 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+2.8%",
                "targetPrice": "104,800원",
                "historicalHitRate": 0.5443,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 99,556원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "99,556원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 94300,
              "fallbackStopPrice": 99556,
              "effectiveHardStopPrice": 99556,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 94,300원와 기존 % 손절 99,556원 중 더 높은 99,556원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 94,300원이며, 기존 % 손절 99,556원보다 느슨해지지 않게 99,556원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 100626,
              "high": 101645,
              "anchor": 101900,
              "label": "100,626~101,645원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 104800,
                "retrace33Price": 102857,
                "retrace50Price": 103350,
                "nearestResistancePrice": 104800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "104,800원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "104,800원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "105,466원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 99,556원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "99,556원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 104800,
                "retrace33Price": 102857,
                "retrace50Price": 103350,
                "nearestResistancePrice": 104800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "104,800원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+2.8%",
                    "targetPrice": "104,800원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 99,556원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "99,556원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 102건)",
                "recentHighPrice": 104800,
                "retrace33Price": 102857,
                "retrace50Price": 103350,
                "nearestResistancePrice": 104800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "104,800원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+2.8%",
                    "targetPrice": "104,800원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 99,556원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "99,556원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 102건)",
              "sampleCount": 102,
              "ev": 0.1853
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 237건)",
              "hitRate": 0.654,
              "ev": 1.192,
              "sampleCount": 237
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
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F3 미충족: KIND 최근공시 2026-07-23 현금ㆍ현물 배당 결정 · 외 2건",
            "statusReason": "F3 미충족: KIND 최근공시 2026-07-23 현금ㆍ현물 배당 결정 / G1 미충족: 1개월 수익률 +12.0% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -2.8% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 101900.0,
                "vs52wHighPct": 72.63007840342124,
                "vs52wLowPct": 98.24902723735408,
                "dropFrom52wHighPct": 27.369921596578763,
                "ma20GapPct": 15.011286681715575,
                "rsi14": 63.64012803827805,
                "volumeRatio20d": 347.1310890078069,
                "rs20Pct": 11.487964989059082,
                "tradingValueRank": 19.0,
                "marketCapRank": 33.0,
                "marketCapTrillion": 21.8871,
                "per": 59.73,
                "pbr": 1.63,
                "cnsPer": 17.5,
                "foreignRate": 76.49,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -9.382759382759383
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "SK이터닉스",
            "code": "475150",
            "strictScore": 5.7,
            "signalScore": 5.7,
            "score": 5.7,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.7,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 927,966→837,976 / 기관 96,528→160,320 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 94.4% / 마지막 1시간 182.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 80,700 / 20MA 52,718 (153.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 43% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 199% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.12 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 82800, 전봉 종가 82000 충족"
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
                "note": "당일 거래대금 순위 3위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 2.7조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "주총 D-4 (2026-07-28)",
                "evalStatus": "not_met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-07-22) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +113.8% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -8.0% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 80,700 / 60MA 47,971",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +0.0% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 52.00)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "20MA 이격 +53.1% (≤+22%) · RSI14 76 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 94.4% / 마지막 1시간 182.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 80,700 / 20MA 52,718 (153.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.12 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 82800, 전봉 종가 82000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 927,966→837,976 / 기관 96,528→160,320 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 43% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 199% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 80700,
            "previousClose": 80600,
            "dailyChange": 100,
            "dailyChangePct": 0.12,
            "dailyDirection": "up",
            "entryPriceText": "80,700원 (당일 종가 기준)",
            "entryPrice": 80700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.7492,
            "marketCapRank": 157,
            "marketCapUniverseCount": 2550,
            "keyPoint": "20일 고점 대비 -8.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "corporateActionDays": 4,
              "note": "주총 D-4 (2026-07-28)",
              "source": "naver_integration"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 82800, 전봉 종가 82000",
              "latestOpen": 82000.0,
              "latestClose": 82800.0,
              "previousClose": 82000.0
            },
            "toss": {
              "avgStrength": 94.4,
              "note": "토스 공개 체결강도 94.4% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A475150/order",
              "asOf": "2026-07-24T06:03:02Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 182.1,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 182.1,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.098,
              "last30BuyVolume": 2719.0,
              "last30SellVolume": 1296.0
            },
            "orderbook": {
              "bidAskRatio": 1.1194,
              "bidTotal": 27399,
              "askTotal": 24476,
              "note": "Naver 호가잔량합계 매수 27,399 / 매도 24,476",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=475150"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 78.75, ATR10 14.82%, 일간 표준편차 10.25%, 당일 레인지 15.14%.",
              "metrics": {
                "atrPct10": 14.82,
                "returnStd20": 10.25,
                "todayRangePct": 15.14,
                "vkospi": 78.75
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.9%",
                "targetPrice": "83,010원",
                "historicalHitRate": 0.654,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+4.3%",
                "targetPrice": "84,200원",
                "historicalHitRate": 0.5443,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 78,844원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "78,844원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 75500,
              "fallbackStopPrice": 78844,
              "effectiveHardStopPrice": 78844,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 75,500원와 기존 % 손절 78,844원 중 더 높은 78,844원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 75,500원이며, 기존 % 손절 78,844원보다 느슨해지지 않게 78,844원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 79691,
              "high": 80498,
              "anchor": 80700,
              "label": "79,691~80,498원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 87700,
                "retrace33Price": 83010,
                "retrace50Price": 84200,
                "nearestResistancePrice": 87700,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "83,010원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.3%",
                    "targetPrice": "84,200원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+8.7%",
                    "targetPrice": "87,700원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 78,844원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "78,844원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 87700,
                "retrace33Price": 83010,
                "retrace50Price": 84200,
                "nearestResistancePrice": 87700,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "83,010원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.3%",
                    "targetPrice": "84,200원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 78,844원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "78,844원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 102건)",
                "recentHighPrice": 87700,
                "retrace33Price": 83010,
                "retrace50Price": 84200,
                "nearestResistancePrice": 87700,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "83,010원",
                    "historicalHitRate": 0.654,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.3%",
                    "targetPrice": "84,200원",
                    "historicalHitRate": 0.5443,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 78,844원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "78,844원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 237건)",
                  "hitRate": 0.654,
                  "ev": 1.192,
                  "sampleCount": 237
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 102건)",
              "sampleCount": 102,
              "ev": 0.1853
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 237건)",
              "hitRate": 0.654,
              "ev": 1.192,
              "sampleCount": 237
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
            "statusReasonShort": "F2 미충족: 시총 2.7조 (필요 ≥ 5조) · 외 3건",
            "statusReason": "F2 미충족: 시총 2.7조 (필요 ≥ 5조) / F3 미충족: 주총 D-4 (2026-07-28) / G4 미충족: 최근 5거래일 최저 +0.0% (필요 -3% 이하 급락 1회 이상) / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 80700.0,
                "vs52wHighPct": 92.01824401368302,
                "vs52wLowPct": 368.91342242882047,
                "dropFrom52wHighPct": 7.98175598631699,
                "ma20GapPct": 53.08009674206857,
                "rsi14": 75.67866063512295,
                "volumeRatio20d": 297.2203925561306,
                "rs20Pct": 64.52599388379205,
                "tradingValueRank": 3.0,
                "marketCapRank": 157.0,
                "marketCapTrillion": 2.7492,
                "per": 110.7,
                "pbr": 10.16,
                "cnsPer": 91.7,
                "foreignRate": 8.96,
                "supplyTrendScore": 4.0
              },
              "evaluatedAt": "2026-07-24T15:04:41+09:00",
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
        "status": "success",
        "source": "live-public-run",
        "counts": {
          "stale": 0
        },
        "staleKeys": []
      }
    }
  ],
  "analysisDate": "2026-07-24",
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
      "010120",
      "017670",
      "028050",
      "096770"
    ],
    "changedEntries": [
      {
        "strategy": "pullback",
        "code": "096770",
        "name": "SK이노베이션",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 9.6,
          "signalScore": 9.6,
          "score": 9.6,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 7.4,
          "grade": "A"
        },
        "after": {
          "strictScore": 10.2,
          "signalScore": 10.2,
          "score": 10.2,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 7.8,
          "grade": "A"
        }
      },
      {
        "strategy": "pullback",
        "code": "010120",
        "name": "LS ELECTRIC",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 9.4,
          "signalScore": 9.4,
          "score": 9.4,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 7.2,
          "grade": "A"
        },
        "after": {
          "strictScore": 10.7,
          "signalScore": 10.7,
          "score": 10.7,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 8.2,
          "grade": "A"
        }
      },
      {
        "strategy": "accumulation",
        "code": "096770",
        "name": "SK이노베이션",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
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
          "strictScore": 9.4,
          "signalScore": 9.4,
          "score": 9.4,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 6.7,
          "grade": "B"
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
