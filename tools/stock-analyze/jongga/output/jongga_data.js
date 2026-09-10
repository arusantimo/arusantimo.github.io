window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-09-10T06:07:12+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "108490",
      "name": "로보티즈",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "032820",
      "name": "우리기술",
      "reasons": [
        "공매도 과열",
        "투자 주의"
      ],
      "sources": [
        "kind",
        "toss"
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
    }
  ],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 22,
      "failed": 0,
      "stale": 0,
      "manual": 1,
      "fallback": 1,
      "slots": 1
    },
    "failedKeys": [],
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
        "ok": 10
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
        "ok": 10
      },
      "naver_item_news": {
        "ok": 9
      },
      "cnbc_quote": {
        "ok": 1
      },
      "krx_pykrx_short_balance": {
        "data_missing": 11
      },
      "krx_short_balance_direct_post": {
        "ok": 11
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
        "count": 11
      }
    ],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 1238.4,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 701.8,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.0,
        "detail": "G-B 🔵"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 1667.9,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 420.2,
        "detail": "박스권 ⚠️ (거시 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 50797.7,
        "count": 22
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "partial",
        "durationMs": 116801.8,
        "detail": "후보 11종목 중 11건 수집 · fallback 11건 (krx_short_balance_direct_post)",
        "count": 11
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 8501.9,
        "detail": "성공 22 / 실패 0",
        "count": 22
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 6276.0,
        "detail": "direct-http · 체결강도 22 / 호가 22 / 틱프록시 22",
        "count": 22
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 57192.1,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 9528.1,
        "detail": "playwright-chromium · KIND 1",
        "count": 1
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
        "durationMs": 60991.8,
        "detail": "확정 3 · 미확인 0",
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
            "value": "7045.63 (-0.09%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 47.74"
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
            "value": "G-B 🔵 (+5.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 80% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "7139.47",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6818.97",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 47.74",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 13 / 하락 7",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 89 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
            "verdict": "박스권 ⚠️ (거시 완충)"
          },
          {
            "item": "거시 맥락",
            "value": "표준 레짐 / RI 51.0659680255377",
            "verdict": "✅"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다. 적용 레짐은 market-analyze·KOSPI 보조 신호로 조정되었습니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20260910",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
          "riseJustified": true,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.62,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 51.0659680255377,
          "stageOverrideReason": "지지력 보정: raw P 63 -> adjusted P 51 · F_support 40점",
          "kospiClose": 7045.63,
          "kospiMa5": 6946.878,
          "vkospiValue": 47.74,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": true
        },
        "technicalRegimeLabel": "약세장 ⛔",
        "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
        "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · 펀더·버블 정당 → 박스권 완화"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-0.30%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.46",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+4.1bp",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-17.83원",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+5.69%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+5.5점",
        "grade": "G-B 🔵",
        "code": "G-B",
        "entryAdjustment": "✅ 100% 진입 / ✅ 80% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 유지",
        "swingAdjustment": "허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-09-11T03:59:00+00:00",
          "vix": "2026-09-10T20:15:00+00:00",
          "tnx": "2026-09-10T19:00:00+00:00",
          "krw": "2026-09-10T22:59:00+00:00",
          "sox": "2026-09-11T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "로보티즈",
            "code": "108490",
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
                "note": "외인 73,667주 / 기관 110,221주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 321,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 319,500 ≤ 종가 321,000)"
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
                "note": "52주 고가 대비 -34.8% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 168% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매수추천",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 387% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 304,200 > 20MA 269,075 > 60MA 240,968 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 321,000 / 60MA 240,968",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 59.4 (필요 ≥ 50)",
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
                "note": "KOSPI 7,046 / 5MA 6,947 (+1.4%) · VKOSPI 47.7 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +3.55% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 59.4 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +19.3% (필요 ≤ +25%) · 60MA +33.2% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -34.8% (≥12%) · 거래량 168% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 거래량 / 앵커 거래량 43% · 시가 319,500 / 종가 321,000 / 전일 종가 310,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 321,000 / 앵커 중심값 285,750 / 복합 지지 288,584 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 1.00:1 / 마지막 30분 평균 155.6% / 마지막 1시간 155.6% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-09-09까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 73,667주 / 기관 110,221주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 321,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 319,500 ≤ 종가 321,000)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -34.8% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 168% (≥100% 만점·80~100% 부분) · 충족",
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
            "currentPrice": 321000,
            "previousClose": 310000,
            "dailyChange": 11000,
            "dailyChangePct": 3.55,
            "dailyDirection": "up",
            "entryPriceText": "321,000원 (당일 종가 기준)",
            "entryPrice": 321000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 4.7081,
            "marketCapRank": 113,
            "marketCapUniverseCount": 2551,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 73,667주 / 기관 110,221주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "대차잔고 추이 데이터 부족 (대형주만 수집)"
            ],
            "toss": {
              "avgStrength": 97.0,
              "note": "토스 공개 체결강도 97.0% / 최근 체결 5분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A108490/order",
              "asOf": "2026-09-10T06:05:00Z",
              "intradayAbove100Ratio": 40.0,
              "observedMinutes": 5,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 5분 프록시",
              "lastHourAvgStrength": 155.6,
              "lastHourObservedMinutes": 5,
              "last30AvgStrength": 155.6,
              "last30ObservedMinutes": 5,
              "last30BuySellRatio": 1.0,
              "last30BuyVolume": 950.0,
              "last30SellVolume": 950.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-09-09까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 288,584원 (10.10% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 288584,
                    "distancePct": 10.1,
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
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 249229,
                    "distancePct": 22.36,
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
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 240500,
                    "distancePct": 25.08,
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
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 223852,
                    "distancePct": 30.26,
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
                    "lastSeenDaysAgo": 22,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 281678,
                    "distancePct": 12.25,
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
                  "price": 288584,
                  "distancePct": 10.1,
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
                  "lastSeenDaysAgo": 2,
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
                    "price": 155500,
                    "distancePct": 51.56,
                    "count": 2,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 155000,
                    "bandHigh": 156000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 179760,
                    "distancePct": 44.0,
                    "count": 4,
                    "lastSeenDaysAgo": 27,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 177600,
                    "bandHigh": 180900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 183667,
                    "distancePct": 42.78,
                    "count": 3,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 183000,
                    "bandHigh": 184200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 192267,
                    "distancePct": 40.1,
                    "count": 4,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 191100,
                    "bandHigh": 194400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 196300,
                    "distancePct": 38.85,
                    "count": 3,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 195500,
                    "bandHigh": 197000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 202129,
                    "distancePct": 37.03,
                    "count": 7,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 199900,
                    "bandHigh": 204500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 206667,
                    "distancePct": 35.62,
                    "count": 3,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 206000,
                    "bandHigh": 207500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 211750,
                    "distancePct": 34.03,
                    "count": 2,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 211500,
                    "bandHigh": 212000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 217167,
                    "distancePct": 32.35,
                    "count": 5,
                    "lastSeenDaysAgo": 27,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 215500,
                    "bandHigh": 219500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 225455,
                    "distancePct": 29.76,
                    "count": 10,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 221000,
                    "bandHigh": 228000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 232833,
                    "distancePct": 27.47,
                    "count": 6,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 229500,
                    "bandHigh": 235500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 242000,
                    "distancePct": 24.61,
                    "count": 10,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 238500,
                    "bandHigh": 245000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 247625,
                    "distancePct": 22.86,
                    "count": 12,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 246000,
                    "bandHigh": 250500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 254417,
                    "distancePct": 20.74,
                    "count": 10,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 251500,
                    "bandHigh": 257500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 260500,
                    "distancePct": 18.85,
                    "count": 4,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 259000,
                    "bandHigh": 262500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 265833,
                    "distancePct": 17.19,
                    "count": 2,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 265000,
                    "bandHigh": 267000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 280857,
                    "distancePct": 12.51,
                    "count": 6,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 279000,
                    "bandHigh": 284000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 288000,
                    "distancePct": 10.28,
                    "count": 2,
                    "lastSeenDaysAgo": 56,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 287000,
                    "bandHigh": 289000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 301708,
                    "distancePct": 6.01,
                    "count": 4,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 300500,
                    "bandHigh": 304500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 309250,
                    "distancePct": 3.66,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 308500,
                    "bandHigh": 310000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 222250,
                    "distancePct": 30.76,
                    "count": 2,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 221000,
                    "bandHigh": 223500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 239000,
                    "distancePct": 25.55,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 238500,
                    "bandHigh": 239500
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 289167,
                    "distancePct": 9.92,
                    "count": 4,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 25,
                    "volume": 1732751,
                    "binIndex": 17,
                    "binLow": 285333,
                    "binHigh": 293000
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 250833,
                    "distancePct": 21.86,
                    "count": 9,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "volume": 1457267,
                    "binIndex": 12,
                    "binLow": 247000,
                    "binHigh": 254667
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 296833,
                    "distancePct": 7.53,
                    "count": 1,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 1433047,
                    "binIndex": 18,
                    "binLow": 293000,
                    "binHigh": 300667
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 265000,
                    "distancePct": 17.45,
                    "count": 1,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 640.3,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 282500,
                    "distancePct": 11.99,
                    "count": 1,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 295.7,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 387% (4일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 387.1,
                "latestBurstDaysAgo": 2
              },
              "anchor": {
                "date": "20260904",
                "open": 267000,
                "close": 304500,
                "high": 315000,
                "low": 265000,
                "bodyMid": 285750,
                "volume": 1433047.0,
                "volumeRatio": 6.4,
                "daysAgo": 4
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 43% · 시가 319,500 / 종가 321,000 / 전일 종가 310,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 321,000 / 앵커 중심값 285,750 / 복합 지지 288,584 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 1.00:1 / 마지막 30분 평균 155.6% / 마지막 1시간 155.6% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 47.74, ATR10 9.55%, 일간 표준편차 6.36%, 당일 레인지 6.45%.",
              "metrics": {
                "atrPct10": 9.55,
                "returnStd20": 6.36,
                "todayRangePct": 6.45,
                "vkospi": 47.74
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
              "anchorDate": "20260904",
              "anchorOpen": 267000,
              "anchorClose": 304500,
              "anchorHigh": 315000,
              "anchorLow": 265000,
              "anchorBodyMid": 285750,
              "anchorVolumeRatio": 6.4,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 285750,
              "ma10Price": 277000,
              "ma10PrevPrice": 270400,
              "ma20Price": 269075,
              "ma20PrevPrice": 265400,
              "ma10WarningPrice": null,
              "hardStopPrice": 285750,
              "fallbackStopPrice": 312975,
              "effectiveStopPrice": 312975,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 285,750원, 20일선 269,075원) = 285,750원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 312,975원) = 312,975원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 285,750원, 20일선 269,075원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 312,975원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "327,420원",
                "historicalHitRate": 0.4737,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "330,630원",
                "historicalHitRate": 0.3158,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "335,445원",
                "historicalHitRate": 0.1579,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "340,260원",
                "historicalHitRate": 0.1579,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 312,975원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "312,975원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 317790,
              "high": 321000,
              "anchor": 321000,
              "label": "317,790~321,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "327,420원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "330,630원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "335,445원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "340,260원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 312,975원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "312,975원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
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
                    "targetPrice": "327,420원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "330,630원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "335,445원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "340,260원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 312,975원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "312,975원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
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
                    "targetPrice": "327,420원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "330,630원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "335,445원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "340,260원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 312,975원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "312,975원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
              "sampleCount": 15,
              "ev": -2.7083
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 19건)",
              "hitRate": 0.4737,
              "ev": -0.995,
              "sampleCount": 19
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
                  "atrPct10": 9.55,
                  "todayRangePct": 6.45,
                  "returnStd20": 6.36,
                  "vkospi": 47.74
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
                "currentPrice": 321000.0,
                "vs52wHighPct": 65.2439024390244,
                "vs52wLowPct": 235.423197492163,
                "dropFrom52wHighPct": 34.756097560975604,
                "ma20GapPct": 19.29759360773019,
                "rsi14": 66.56294425025064,
                "volumeRatio20d": 167.8768309480774,
                "rs20Pct": 29.6969696969697,
                "supportDistancePct": 10.1,
                "tradingValueRank": 34.0,
                "marketCapRank": 113.0,
                "marketCapTrillion": 4.7081,
                "per": 0.0,
                "pbr": 13.06,
                "cnsPer": -3178.22,
                "foreignRate": 7.67,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 11.4,
            "signalScore": 11.4,
            "score": 11.4,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 8.8,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 123,737주 / 기관 25,505주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 227,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 206,500 ≤ 종가 227,000)"
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
                "note": "52주 고가 대비 -19.8% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 376% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -28.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
                "note": "최근 20일 최대 거래량 급증 228% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 198,720 > 20MA 180,665 > 60MA 173,440 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 227,000 / 60MA 173,440",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 65.7 (필요 ≥ 50)",
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
                "note": "KOSPI 7,046 / 5MA 6,947 (+1.4%) · VKOSPI 47.7 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +9.93% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 65.7 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +25.6% (필요 ≤ +25%) · 60MA +30.9% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -19.8% (≥12%) · 거래량 376% (≥80%) · 수급추세 +4 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "마지막 30분 비율 2.37:1 / 마지막 30분 평균 237.3% / 마지막 1시간 237.3% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-09-10까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 123,737주 / 기관 25,505주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 227,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 206,500 ≤ 종가 227,000)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -19.8% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +4 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 376% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -28.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 227000,
            "previousClose": 206500,
            "dailyChange": 20500,
            "dailyChangePct": 9.93,
            "dailyDirection": "up",
            "entryPriceText": "227,000원 (당일 종가 기준)",
            "entryPrice": 227000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 10.5512,
            "marketCapRank": 67,
            "marketCapUniverseCount": 2551,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 123,737주 / 기관 25,505주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 113.8,
              "note": "토스 공개 체결강도 113.8% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-09-10T06:04:58Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 237.3,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 237.3,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 2.3733,
              "last30BuyVolume": 1939.0,
              "last30SellVolume": 817.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-09-10까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 187,872원 (17.24% 아래) · 강도 85점 · family 4개 · 급증봉 저점·수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 187872,
                    "distancePct": 17.24,
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
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 172758,
                    "distancePct": 23.9,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 28,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 165715,
                    "distancePct": 27.0,
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
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 160689,
                    "distancePct": 29.21,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 13,
                    "lastSeenDaysAgo": 12,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 197738,
                    "distancePct": 12.89,
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
                  "price": 187872,
                  "distancePct": 17.24,
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
                  "lastSeenDaysAgo": 2,
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
                    "price": 125033,
                    "distancePct": 44.92,
                    "count": 3,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 124500,
                    "bandHigh": 125600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 128200,
                    "distancePct": 43.52,
                    "count": 4,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 127800,
                    "bandHigh": 128800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 136100,
                    "distancePct": 40.04,
                    "count": 2,
                    "lastSeenDaysAgo": 25,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 136000,
                    "bandHigh": 136200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 140433,
                    "distancePct": 38.14,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 139300,
                    "bandHigh": 141000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 143567,
                    "distancePct": 36.75,
                    "count": 3,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 142900,
                    "bandHigh": 144800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 160918,
                    "distancePct": 29.11,
                    "count": 9,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 157700,
                    "bandHigh": 163000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 166280,
                    "distancePct": 26.75,
                    "count": 10,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 163900,
                    "bandHigh": 168600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 172194,
                    "distancePct": 24.14,
                    "count": 14,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 169200,
                    "bandHigh": 174200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 177519,
                    "distancePct": 21.8,
                    "count": 15,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 175600,
                    "bandHigh": 179300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 181925,
                    "distancePct": 19.86,
                    "count": 5,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 180500,
                    "bandHigh": 184200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 188086,
                    "distancePct": 17.14,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 185500,
                    "bandHigh": 190200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 193333,
                    "distancePct": 14.83,
                    "count": 6,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 191900,
                    "bandHigh": 195200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 197275,
                    "distancePct": 13.09,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 196400,
                    "bandHigh": 198200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 208625,
                    "distancePct": 8.09,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 206500,
                    "bandHigh": 210500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 227250,
                    "distancePct": -0.11,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 227000,
                    "bandHigh": 227500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 158850,
                    "distancePct": 30.02,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 157700,
                    "bandHigh": 160000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 162300,
                    "distancePct": 28.5,
                    "count": 2,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 161600,
                    "bandHigh": 163000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 165150,
                    "distancePct": 27.25,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 165000,
                    "bandHigh": 165300
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 173323,
                    "distancePct": 23.65,
                    "count": 14,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 16487092,
                    "binIndex": 11,
                    "binLow": 169996,
                    "binHigh": 176650
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 186631,
                    "distancePct": 17.78,
                    "count": 7,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "volume": 12693678,
                    "binIndex": 13,
                    "binLow": 183304,
                    "binHigh": 189958
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 233210,
                    "distancePct": -2.74,
                    "count": 2,
                    "lastSeenDaysAgo": 48,
                    "valid": false,
                    "weight": 25,
                    "volume": 10147626,
                    "binIndex": 20,
                    "binLow": 229883,
                    "binHigh": 236538
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 188900,
                    "distancePct": 16.78,
                    "count": 1,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 211.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 198200,
                    "distancePct": 12.69,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 376.1,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 228% (20일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 227.8,
                "latestBurstDaysAgo": 2
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
                  "summary": "마지막 30분 비율 2.37:1 / 마지막 30분 평균 237.3% / 마지막 1시간 237.3% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 47.74, ATR10 8.31%, 일간 표준편차 4.11%, 당일 레인지 20.00%.",
              "metrics": {
                "atrPct10": 8.31,
                "returnStd20": 4.11,
                "todayRangePct": 20.0,
                "vkospi": 47.74
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
              "ma10Price": 186210,
              "ma10PrevPrice": 181420,
              "ma20Price": 180665,
              "ma20PrevPrice": 178015,
              "ma10WarningPrice": null,
              "hardStopPrice": 221325,
              "fallbackStopPrice": 221325,
              "effectiveStopPrice": 221325,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 221,325원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 221,325원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "231,540원",
                "historicalHitRate": 0.4737,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "233,810원",
                "historicalHitRate": 0.3158,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "237,215원",
                "historicalHitRate": 0.1579,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "240,620원",
                "historicalHitRate": 0.1579,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 221,325원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "221,325원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 224730,
              "high": 227000,
              "anchor": 227000,
              "label": "224,730~227,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "231,540원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "233,810원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "237,215원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "240,620원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 221,325원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "221,325원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
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
                    "targetPrice": "231,540원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "233,810원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "237,215원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "240,620원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 221,325원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "221,325원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
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
                    "targetPrice": "231,540원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "233,810원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "237,215원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "240,620원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 221,325원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "221,325원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
              "sampleCount": 15,
              "ev": -2.7083
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 19건)",
              "hitRate": 0.4737,
              "ev": -0.995,
              "sampleCount": 19
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
              "핵심 Gate 미충족: G8",
              "매매금지(핵심 Gate 미충족: G8)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G8 미충족: 이격 20MA +25.6% (필요 ≤ +25%) · 60MA +30.9% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
            "statusReason": "G8 미충족: 이격 20MA +25.6% (필요 ≤ +25%) · 60MA +30.9% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 227000.0,
                "vs52wHighPct": 80.21201413427562,
                "vs52wLowPct": 761.4800759013283,
                "dropFrom52wHighPct": 19.78798586572438,
                "ma20GapPct": 25.646915561951676,
                "rsi14": 71.3836699388205,
                "volumeRatio20d": 376.1238481175912,
                "rs20Pct": 30.45977011494253,
                "supportDistancePct": 17.24,
                "tradingValueRank": 8.0,
                "marketCapRank": 67.0,
                "marketCapTrillion": 10.5512,
                "per": 1474.03,
                "pbr": 17.52,
                "cnsPer": 0.0,
                "foreignRate": 10.05,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -28.456422122498797
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "원익IPS",
            "code": "240810",
            "strictScore": 11.4,
            "signalScore": 11.4,
            "score": 11.4,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 8.8,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 12,725주 / 기관 12,677주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 120,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 119,000 ≤ 종가 120,500)"
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
                "note": "52주 고가 대비 -35.8% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 320% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -11.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
                "note": "최근 20일 최대 거래량 급증 227% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 117,760 > 20MA 112,845 > 60MA 119,745 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 120,500 / 60MA 119,745",
                "evalStatus": "met"
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
                "note": "KOSPI 7,046 / 5MA 6,947 (+1.4%) · VKOSPI 47.7 · 변동성 경계",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +0.33% (필요 ≤ +12%)",
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
                "note": "이격 20MA +6.8% (필요 ≤ +25%) · 60MA +0.6% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -35.8% (≥12%) · 거래량 320% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "마지막 30분 비율 3.20:1 / 마지막 30분 평균 200.0% / 마지막 1시간 200.0% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-09-04까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 12,725주 / 기관 12,677주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 120,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 119,000 ≤ 종가 120,500)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -35.8% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 320% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -11.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 120500,
            "previousClose": 120100,
            "dailyChange": 400,
            "dailyChangePct": 0.33,
            "dailyDirection": "up",
            "entryPriceText": "120,500원 (당일 종가 기준)",
            "entryPrice": 120500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 5.9146,
            "marketCapRank": 97,
            "marketCapUniverseCount": 2551,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 12,725주 / 기관 12,677주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 91.0,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-09-10T06:05:00Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 200.0,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 200.0,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 3.2014,
              "last30BuyVolume": 5484.0,
              "last30SellVolume": 1713.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-09-04까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 119,828원 (0.56% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 119828,
                    "distancePct": 0.56,
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
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 104296,
                    "distancePct": 13.45,
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
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 100742,
                    "distancePct": 16.4,
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
                    "lastSeenDaysAgo": 12,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 114986,
                    "distancePct": 4.58,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 11,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 112129,
                    "distancePct": 6.95,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 12,
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 119828,
                  "distancePct": 0.56,
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
                    "price": 74500,
                    "distancePct": 38.17,
                    "count": 2,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 74100,
                    "bandHigh": 74900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 88550,
                    "distancePct": 26.51,
                    "count": 5,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 88100,
                    "bandHigh": 89500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 90000,
                    "distancePct": 25.31,
                    "count": 2,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 89900,
                    "bandHigh": 90100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 93533,
                    "distancePct": 22.38,
                    "count": 3,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 92600,
                    "bandHigh": 94300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 95800,
                    "distancePct": 20.5,
                    "count": 2,
                    "lastSeenDaysAgo": 25,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 95100,
                    "bandHigh": 96500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 97975,
                    "distancePct": 18.69,
                    "count": 4,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 97600,
                    "bandHigh": 98400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 100783,
                    "distancePct": 16.36,
                    "count": 5,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 100100,
                    "bandHigh": 101500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 104692,
                    "distancePct": 13.12,
                    "count": 11,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 102700,
                    "bandHigh": 106000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 108593,
                    "distancePct": 9.88,
                    "count": 13,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 106400,
                    "bandHigh": 110000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 112129,
                    "distancePct": 6.95,
                    "count": 12,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 110400,
                    "bandHigh": 113500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 115373,
                    "distancePct": 4.25,
                    "count": 10,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 113900,
                    "bandHigh": 116600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 120550,
                    "distancePct": -0.04,
                    "count": 6,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 119800,
                    "bandHigh": 121900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 124767,
                    "distancePct": -3.54,
                    "count": 3,
                    "lastSeenDaysAgo": 41,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 124500,
                    "bandHigh": 125000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 127800,
                    "distancePct": -6.06,
                    "count": 3,
                    "lastSeenDaysAgo": 38,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 127100,
                    "bandHigh": 128200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 131967,
                    "distancePct": -9.52,
                    "count": 2,
                    "lastSeenDaysAgo": 47,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 131200,
                    "bandHigh": 133100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 142133,
                    "distancePct": -17.95,
                    "count": 3,
                    "lastSeenDaysAgo": 38,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 140700,
                    "bandHigh": 143000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 149667,
                    "distancePct": -24.2,
                    "count": 5,
                    "lastSeenDaysAgo": 53,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 148000,
                    "bandHigh": 150600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 155417,
                    "distancePct": -28.98,
                    "count": 6,
                    "lastSeenDaysAgo": 49,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 153000,
                    "bandHigh": 156700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 160233,
                    "distancePct": -32.97,
                    "count": 3,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 159000,
                    "bandHigh": 161700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 164150,
                    "distancePct": -36.22,
                    "count": 4,
                    "lastSeenDaysAgo": 49,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 163200,
                    "bandHigh": 165600
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 100700,
                    "distancePct": 16.43,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 100500,
                    "bandHigh": 100900
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 103900,
                    "distancePct": 13.78,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 103300,
                    "bandHigh": 104700
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 119106,
                    "distancePct": 1.16,
                    "count": 9,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 25,
                    "volume": 13734879,
                    "binIndex": 9,
                    "binLow": 116738,
                    "binHigh": 121475
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 171219,
                    "distancePct": -42.09,
                    "count": 2,
                    "lastSeenDaysAgo": 49,
                    "valid": false,
                    "weight": 25,
                    "volume": 9055111,
                    "binIndex": 20,
                    "binLow": 168850,
                    "binHigh": 173588
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 166481,
                    "distancePct": -38.16,
                    "count": 4,
                    "lastSeenDaysAgo": 52,
                    "valid": false,
                    "weight": 25,
                    "volume": 9042308,
                    "binIndex": 19,
                    "binLow": 164112,
                    "binHigh": 168850
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 114600,
                    "distancePct": 4.9,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 320.0,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 227% (20일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 226.8,
                "latestBurstDaysAgo": 20
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
                  "summary": "마지막 30분 비율 3.20:1 / 마지막 30분 평균 200.0% / 마지막 1시간 200.0% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 47.74, ATR10 6.47%, 일간 표준편차 3.93%, 당일 레인지 11.07%.",
              "metrics": {
                "atrPct10": 6.47,
                "returnStd20": 3.93,
                "todayRangePct": 11.07,
                "vkospi": 47.74
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
              "ma10Price": 113610,
              "ma10PrevPrice": 112830,
              "ma20Price": 112845,
              "ma20PrevPrice": 112395,
              "ma10WarningPrice": null,
              "hardStopPrice": 117488,
              "fallbackStopPrice": 117488,
              "effectiveStopPrice": 117488,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 117,488원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 117,488원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "122,910원",
                "historicalHitRate": 0.4737,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "124,115원",
                "historicalHitRate": 0.3158,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "125,922원",
                "historicalHitRate": 0.1579,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "127,730원",
                "historicalHitRate": 0.1579,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 117,488원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "117,488원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 119295,
              "high": 120500,
              "anchor": 120500,
              "label": "119,295~120,500원 (종가 ±, 분할매수)"
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
                    "targetPrice": "122,910원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "124,115원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "125,922원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "127,730원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 117,488원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "117,488원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
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
                    "targetPrice": "122,910원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "124,115원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "125,922원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "127,730원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 117,488원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "117,488원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
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
                    "targetPrice": "122,910원",
                    "historicalHitRate": 0.4737,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "124,115원",
                    "historicalHitRate": 0.3158,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "125,922원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "127,730원",
                    "historicalHitRate": 0.1579,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 117,488원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "117,488원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 19건)",
                  "hitRate": 0.4737,
                  "ev": -0.995,
                  "sampleCount": 19
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 15건)",
              "sampleCount": 15,
              "ev": -2.7083
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 19건)",
              "hitRate": 0.4737,
              "ev": -0.995,
              "sampleCount": 19
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
            "statusReasonShort": "G1 미충족: 5MA 117,760 > 20MA 112,845 > 60MA 119,745 · 상승선 5MA, 20MA · 정배열 미충족",
            "statusReason": "G1 미충족: 5MA 117,760 > 20MA 112,845 > 60MA 119,745 · 상승선 5MA, 20MA · 정배열 미충족",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 120500.0,
                "vs52wHighPct": 64.1640042598509,
                "vs52wLowPct": 181.21353558926486,
                "dropFrom52wHighPct": 35.835995740149095,
                "ma20GapPct": 6.783641277859011,
                "rsi14": 57.28315851442346,
                "volumeRatio20d": 319.98251434318144,
                "rs20Pct": 8.071748878923767,
                "supportDistancePct": 0.56,
                "tradingValueRank": 27.0,
                "marketCapRank": 97.0,
                "marketCapTrillion": 5.9146,
                "per": 34.17,
                "pbr": 5.46,
                "cnsPer": 27.15,
                "foreignRate": 17.27,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -11.498482917075496
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
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
            "name": "우리기술",
            "code": "032820",
            "strictScore": 5.4,
            "signalScore": 5.4,
            "score": 5.4,
            "scoreMax": 12.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 4.7,
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
                "note": "외인 592,623주 / 기관 92,305주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 92.4% / 100% 유지 33.3% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 96.3% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 331% · 폭발적 급증 (≥300%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 96.3% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 39% / 윗꼬리·몸통 0.79 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.51 (필요 ≥ 1.2) · 매수 잔량 우위"
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
                "note": "5일 초과 +31.1% / 20일 초과 +19.1%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 48.0% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 29",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 331% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 39% / 윗꼬리·몸통 0.79 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.33% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 14,510 / 5MA 12,438 (전일 5MA 11,636) · 5MA 위·우상향",
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
                "note": "외인 592,623주 / 기관 92,305주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 96.3% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 331% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.3% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.51 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 92.4% / 100% 유지 33.3% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 39% / 윗꼬리·몸통 0.79 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 14510,
            "previousClose": 14320,
            "dailyChange": 190,
            "dailyChangePct": 1.33,
            "dailyDirection": "up",
            "entryPriceText": "14,510원 (당일 종가 기준)",
            "entryPrice": 14510,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.5071,
            "marketCapRank": 177,
            "marketCapUniverseCount": 2551,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 592,623주 / 기관 92,305주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 92.4,
              "note": "토스 공개 체결강도 92.4% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A032820/order",
              "asOf": "2026-09-10T06:05:00Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 151.1,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 151.1,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 0.9919,
              "last30BuyVolume": 8740.0,
              "last30SellVolume": 8811.0
            },
            "orderbook": {
              "bidAskRatio": 1.5107,
              "bidTotal": 54272,
              "askTotal": 35925,
              "note": "Naver 호가잔량합계 매수 54,272 / 매도 35,925",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=032820"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 47.74, ATR10 9.92%, 일간 표준편차 5.85%, 당일 레인지 12.64%.",
              "metrics": {
                "atrPct10": 9.92,
                "returnStd20": 5.85,
                "todayRangePct": 12.64,
                "vkospi": 47.74
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
              "referencePrice": 13890,
              "referenceBandLow": 13890,
              "referenceBandHigh": 13890,
              "entryDayOpenPrice": 13800,
              "fallbackStopPrice": 13930,
              "effectiveHardStopPrice": 13930,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 13,890원와 기존 % 손절 13,930원 중 더 높은 13,930원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 13,890원이며, 기존 % 손절 13,930원보다 느슨해지지 않게 13,930원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.3%",
                "targetPrice": "14,550원",
                "historicalHitRate": 0.641,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.9%",
                "targetPrice": "15,070원",
                "historicalHitRate": 0.391,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "15,671원",
                "historicalHitRate": 0.2692,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "16,106원",
                "historicalHitRate": 0.2244,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "16,541원",
                "historicalHitRate": 0.1538,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 13,930원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "13,930원"
              }
            ],
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 14365,
              "high": 14510,
              "anchor": 14510,
              "label": "14,365~14,510원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 14550,
                "secondaryResistancePrice": 15070,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "14,945원",
                    "historicalHitRate": 0.641,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "15,236원",
                    "historicalHitRate": 0.391,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "15,671원",
                    "historicalHitRate": 0.2692,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "16,106원",
                    "historicalHitRate": 0.2244,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "16,541원",
                    "historicalHitRate": 0.1538,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 13,930원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "13,930원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.1538,
                  "ev": 1.116,
                  "sampleCount": 143
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 14550,
                "secondaryResistancePrice": 15070,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "14,550원",
                    "historicalHitRate": 0.641,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "15,070원",
                    "historicalHitRate": 0.391,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "15,671원",
                    "historicalHitRate": 0.2692,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "16,106원",
                    "historicalHitRate": 0.2244,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "16,541원",
                    "historicalHitRate": 0.1538,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 13,930원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "13,930원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.1538,
                  "ev": 1.116,
                  "sampleCount": 143
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 61건)",
                "nearestResistancePrice": 14550,
                "secondaryResistancePrice": 15070,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "14,550원",
                    "historicalHitRate": 0.641,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "15,070원",
                    "historicalHitRate": 0.391,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "15,671원",
                    "historicalHitRate": 0.2692,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "16,106원",
                    "historicalHitRate": 0.2244,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "16,541원",
                    "historicalHitRate": 0.1538,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 13,930원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "13,930원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.1538,
                  "ev": 1.116,
                  "sampleCount": 143
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 61건)",
              "sampleCount": 61,
              "ev": -1.6233
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 143건)",
              "hitRate": 0.1538,
              "ev": 1.116,
              "sampleCount": 143
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 48.0% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 48.0% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 14510.0,
                "vs52wHighPct": 48.04635761589404,
                "vs52wLowPct": 309.88700564971754,
                "dropFrom52wHighPct": 51.95364238410596,
                "ma20GapPct": 22.086663862010937,
                "rsi14": 68.56261264382626,
                "volumeRatio20d": 330.6022443275364,
                "rs20Pct": 26.173913043478258,
                "tradingValueRank": 29.0,
                "marketCapRank": 177.0,
                "marketCapTrillion": 2.5071,
                "per": 0.0,
                "pbr": 13.17,
                "cnsPer": 0.0,
                "foreignRate": 6.09,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "SK하이닉스",
            "code": "000660",
            "strictScore": 10.9,
            "signalScore": 10.9,
            "score": 10.9,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
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
                "note": "외인 41,716주 / 기관 74,984주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +41,716 / 전일 +97,545 · 기관 당일 +74,984 / 전일 -14,560 · 당일 양매수 + 전일 수급 유입"
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
                "note": "당일 평균 94.0% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,321,135주 · 동반 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 110.3% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,788,000 / 20MA 1,687,850 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 85% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +0.27% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +2.25% / KOSPI -0.09% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 3.47:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -35.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +97,545/당일 +41,716 · 기관 전일 -14,560/당일 +74,984 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 1,861,000 / 60MA 1,924,700",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 62.0% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 74% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 50.7% (≥25%) · 20일 수익률 +23.7% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,046 / 5MA 6,947 (+1.4%) · VKOSPI 47.7 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 41,716주 / 기관 74,984주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +41,716 / 전일 +97,545 · 기관 당일 +74,984 / 전일 -14,560 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 300.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 94.0% / 마지막 1시간 300.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,321,135주 · 동반 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,788,000 / 20MA 1,687,850 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 85% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +0.27% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +2.25% / KOSPI -0.09% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 3.47:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -35.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 110.3% (필요 98~102%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1861000,
            "previousClose": 1856000,
            "dailyChange": 5000,
            "dailyChangePct": 0.27,
            "dailyDirection": "up",
            "entryPriceText": "1,861,000원 (당일 종가 기준)",
            "entryPrice": 1861000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1359.4463,
            "marketCapRank": 2,
            "marketCapUniverseCount": 2551,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 41,716주 / 기관 74,984주 / 마지막 1시간 300.0% · 장후반 매수세 강화 · 마지막 30분 틱 3.47:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 94.0,
              "note": "토스 공개 체결강도 94.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-09-10T06:04:58Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 3.4693,
              "last30BuyVolume": 1752.0,
              "last30SellVolume": 505.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 47.74, ATR10 5.30%, 일간 표준편차 4.67%, 당일 레인지 4.26%.",
              "metrics": {
                "atrPct10": 5.3,
                "returnStd20": 4.67,
                "todayRangePct": 4.26,
                "vkospi": 47.74
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 1321135.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260909",
                    "net": 41716.0
                  },
                  {
                    "date": "20260908",
                    "net": 97545.0
                  },
                  {
                    "date": "20260907",
                    "net": 772036.0
                  },
                  {
                    "date": "20260904",
                    "net": 308833.0
                  },
                  {
                    "date": "20260903",
                    "net": -234626.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260909",
                    "net": 74984.0
                  },
                  {
                    "date": "20260908",
                    "net": -14560.0
                  },
                  {
                    "date": "20260907",
                    "net": 365719.0
                  },
                  {
                    "date": "20260904",
                    "net": 96776.0
                  },
                  {
                    "date": "20260903",
                    "net": -187288.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260909",
                    "net": 116700.0
                  },
                  {
                    "date": "20260908",
                    "net": 82985.0
                  },
                  {
                    "date": "20260907",
                    "net": 1137755.0
                  },
                  {
                    "date": "20260904",
                    "net": 405609.0
                  },
                  {
                    "date": "20260903",
                    "net": -421914.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,321,135주 · 동반 양수 3/5일 · 증가 3회"
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
                "targetPrice": "1,883,000원",
                "historicalHitRate": 0.6087,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.1%",
                "targetPrice": "1,919,000원",
                "historicalHitRate": 0.2609,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "1,963,355원",
                "historicalHitRate": 0.1739,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "2,009,880원",
                "historicalHitRate": 0.1739,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "2,065,710원",
                "historicalHitRate": 0.087,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,805,170원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,805,170원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260909",
              "anchorOpen": 1795000,
              "anchorClose": 1856000,
              "anchorVolumeRatio20d": 0.92,
              "anchorStopPrice": 1795000,
              "fallbackStopPrice": 1805170,
              "effectiveHardStopPrice": 1805170,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,795,000원와 기존 % 손절 1,805,170원 중 더 높은 1,805,170원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 1,795,000원를 기준으로 잡고, 기존 % 손절 1,805,170원보다 느슨해지지 않게 1,805,170원로 고정합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1842390,
              "high": 1861000,
              "anchor": 1861000,
              "label": "1,842,390~1,861,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1883000,
                "secondaryResistancePrice": 1919000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,898,220원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,926,135원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,963,355원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "2,009,880원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "2,065,710원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,805,170원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,805,170원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1883000,
                "secondaryResistancePrice": 1919000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.2%",
                    "targetPrice": "1,883,000원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "1,919,000원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,963,355원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "2,009,880원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "2,065,710원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,805,170원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,805,170원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
                "nearestResistancePrice": 1883000,
                "secondaryResistancePrice": 1919000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.2%",
                    "targetPrice": "1,883,000원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "1,919,000원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,963,355원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "2,009,880원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "2,065,710원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,805,170원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,805,170원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
              "sampleCount": 19,
              "ev": -3.3215
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 23건)",
              "hitRate": 0.6087,
              "ev": -0.507,
              "sampleCount": 23
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
              "매매금지(핵심 Gate 미충족: G1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 1,861,000 / 60MA 1,924,700",
            "statusReason": "G1 미충족: 종가 1,861,000 / 60MA 1,924,700",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1861000.0,
                "vs52wHighPct": 61.99200532978014,
                "vs52wLowPct": 511.1658456486043,
                "dropFrom52wHighPct": 38.00799467021985,
                "ma20GapPct": 10.258613028408922,
                "rsi14": 58.40286972708246,
                "volumeRatio20d": 74.02378971066442,
                "rs20Pct": 23.736702127659576,
                "tradingValueRank": 1.0,
                "marketCapRank": 2.0,
                "marketCapTrillion": 1359.4463,
                "per": 8.3,
                "pbr": 5.02,
                "cnsPer": 5.32,
                "foreignRate": 50.67,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -35.04894661808965
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 10.6,
            "signalScore": 10.6,
            "score": 10.6,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 7.6,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 95,858주 / 기관 25,091주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 +95,858 / 전일 -216,806 · 기관 당일 +25,091 / 전일 -88,245 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 143.2% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 66.0% / 마지막 1시간 143.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +11,471주 · 양수 3/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 99.4% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,405,000 / 20MA 1,403,850 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 70% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -0.57% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +0.14% / KOSPI -0.09% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.43:1 · 평균 체결강도 143.2% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -28.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "⚠️",
                "note": "외인 전일 -216,806/당일 +95,858 · 기관 전일 -88,245/당일 +25,091 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 1,396,000 / 60MA 1,510,950",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 57.8% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 58% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 37.8% (≥25%) · 20일 수익률 +4.6% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,046 / 5MA 6,947 (+1.4%) · VKOSPI 47.7 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 95,858주 / 기관 25,091주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 143.2% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 66.0% / 마지막 1시간 143.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +11,471주 · 양수 3/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 99.4% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,405,000 / 20MA 1,403,850 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 70% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -0.57% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +0.14% / KOSPI -0.09% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.43:1 · 평균 체결강도 143.2% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -28.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "외인 당일 +95,858 / 전일 -216,806 · 기관 당일 +25,091 / 전일 -88,245 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1396000,
            "previousClose": 1404000,
            "dailyChange": -8000,
            "dailyChangePct": -0.57,
            "dailyDirection": "down",
            "entryPriceText": "1,396,000원 (당일 종가 기준)",
            "entryPrice": 1396000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 104.2724,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2551,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 95,858주 / 기관 25,091주 / 마지막 1시간 143.2% · 장후반 매수세 강화 · 마지막 30분 틱 1.43:1. 외국인 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 66.0,
              "note": "토스 공개 체결강도 66.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-09-10T06:04:58Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 143.2,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 143.2,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 1.4321,
              "last30BuyVolume": 411.0,
              "last30SellVolume": 287.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 47.74, ATR10 5.84%, 일간 표준편차 4.54%, 당일 레인지 3.92%.",
              "metrics": {
                "atrPct10": 5.84,
                "returnStd20": 4.54,
                "todayRangePct": 3.92,
                "vkospi": 47.74
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 11471.0,
              "positiveDays": 3,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260909",
                    "net": 95858.0
                  },
                  {
                    "date": "20260908",
                    "net": -216806.0
                  },
                  {
                    "date": "20260907",
                    "net": 101579.0
                  },
                  {
                    "date": "20260904",
                    "net": 141281.0
                  },
                  {
                    "date": "20260903",
                    "net": -110441.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260909",
                    "net": 25091.0
                  },
                  {
                    "date": "20260908",
                    "net": -88245.0
                  },
                  {
                    "date": "20260907",
                    "net": 43526.0
                  },
                  {
                    "date": "20260904",
                    "net": 61273.0
                  },
                  {
                    "date": "20260903",
                    "net": -72871.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260909",
                    "net": 95858.0
                  },
                  {
                    "date": "20260908",
                    "net": -216806.0
                  },
                  {
                    "date": "20260907",
                    "net": 101579.0
                  },
                  {
                    "date": "20260904",
                    "net": 141281.0
                  },
                  {
                    "date": "20260903",
                    "net": -110441.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 5일 매집 추세 강화",
              "note": "외국인 최근 5일 누적 +11,471주 · 양수 3/5일 · 증가 2회"
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
                "targetYield": "+0.1%",
                "targetPrice": "1,398,000원",
                "historicalHitRate": 0.6087,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.6%",
                "targetPrice": "1,418,000원",
                "historicalHitRate": 0.2609,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "1,472,780원",
                "historicalHitRate": 0.1739,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,507,680원",
                "historicalHitRate": 0.1739,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,549,560원",
                "historicalHitRate": 0.087,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,390,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.4%",
                "targetPrice": "1,390,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260910",
              "anchorOpen": 1390000,
              "anchorClose": 1396000,
              "anchorVolumeRatio20d": 0.58,
              "anchorStopPrice": 1390000,
              "fallbackStopPrice": 1354120,
              "effectiveHardStopPrice": 1390000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,390,000원와 기존 % 손절 1,354,120원 중 더 높은 1,390,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 1,390,000원를 기준으로 잡고, 기존 % 손절 1,354,120원보다 느슨해지지 않게 1,390,000원로 고정합니다."
            },
            "rr": "1 : 12.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1382040,
              "high": 1396000,
              "anchor": 1396000,
              "label": "1,382,040~1,396,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1398000,
                "secondaryResistancePrice": 1418000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,423,920원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,444,860원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,472,780원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,507,680원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,549,560원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,390,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.4%",
                    "targetPrice": "1,390,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1398000,
                "secondaryResistancePrice": 1418000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "1,398,000원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "1,418,000원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,472,780원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,507,680원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,549,560원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,390,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.4%",
                    "targetPrice": "1,390,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
                "nearestResistancePrice": 1398000,
                "secondaryResistancePrice": 1418000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "1,398,000원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "1,418,000원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,472,780원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,507,680원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,549,560원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,390,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.4%",
                    "targetPrice": "1,390,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
              "sampleCount": 19,
              "ev": -3.3215
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 23건)",
              "hitRate": 0.6087,
              "ev": -0.507,
              "sampleCount": 23
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
              "매매금지(핵심 Gate 미충족: G1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 1,396,000 / 60MA 1,510,950",
            "statusReason": "G1 미충족: 종가 1,396,000 / 60MA 1,510,950",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1396000.0,
                "vs52wHighPct": 57.75755068266446,
                "vs52wLowPct": 672.1238938053096,
                "dropFrom52wHighPct": 42.24244931733554,
                "ma20GapPct": -0.5591765502012324,
                "rsi14": 50.49825900997004,
                "volumeRatio20d": 57.88047892791286,
                "rs20Pct": 4.569288389513108,
                "tradingValueRank": 13.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 104.2724,
                "per": 107.52,
                "pbr": 10.31,
                "cnsPer": 70.27,
                "foreignRate": 37.78,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -27.95771134732722
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "원익IPS",
            "code": "240810",
            "strictScore": 10.2,
            "signalScore": 10.2,
            "score": 10.2,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 7.3,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 12,725주 / 기관 12,677주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +12,725 / 전일 +82,918 · 기관 당일 +12,677 / 전일 -23,440 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 200.0% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 91.0% / 마지막 1시간 200.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +336,469주 · 양수 5/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 106.8% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 117,760 / 20MA 112,845 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 319% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +0.33% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +2.25% / KOSPI -0.09% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 3.20:1 · 평균 체결강도 200.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -11.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
                "note": "외인 전일 +82,918/당일 +12,725 · 기관 전일 -23,440/당일 +12,677 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 120,500 / 60MA 119,745",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 64.2% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 320% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 17.3% (≥25%) · 20일 수익률 +8.1% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,046 / 5MA 6,947 (+1.4%) · VKOSPI 47.7 · 변동성 경계",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 12,725주 / 기관 12,677주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +12,725 / 전일 +82,918 · 기관 당일 +12,677 / 전일 -23,440 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 200.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 91.0% / 마지막 1시간 200.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +336,469주 · 양수 5/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 117,760 / 20MA 112,845 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +0.33% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +2.25% / KOSPI -0.09% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 3.20:1 · 평균 체결강도 200.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -11.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 106.8% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 319% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 120500,
            "previousClose": 120100,
            "dailyChange": 400,
            "dailyChangePct": 0.33,
            "dailyDirection": "up",
            "entryPriceText": "120,500원 (당일 종가 기준)",
            "entryPrice": 120500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 5.9146,
            "marketCapRank": 97,
            "marketCapUniverseCount": 2551,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 12,725주 / 기관 12,677주 / 마지막 1시간 200.0% · 장후반 매수세 강화 · 마지막 30분 틱 3.20:1. 외국인 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 91.0,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-09-10T06:05:00Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 200.0,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 200.0,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 3.2014,
              "last30BuyVolume": 5484.0,
              "last30SellVolume": 1713.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 47.74, ATR10 6.47%, 일간 표준편차 3.93%, 당일 레인지 11.07%.",
              "metrics": {
                "atrPct10": 6.47,
                "returnStd20": 3.93,
                "todayRangePct": 11.07,
                "vkospi": 47.74
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 336469.0,
              "positiveDays": 5,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260909",
                    "net": 12725.0
                  },
                  {
                    "date": "20260908",
                    "net": 82918.0
                  },
                  {
                    "date": "20260907",
                    "net": 8802.0
                  },
                  {
                    "date": "20260904",
                    "net": 136004.0
                  },
                  {
                    "date": "20260903",
                    "net": 96020.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260909",
                    "net": 12677.0
                  },
                  {
                    "date": "20260908",
                    "net": -23440.0
                  },
                  {
                    "date": "20260907",
                    "net": 12222.0
                  },
                  {
                    "date": "20260904",
                    "net": 116959.0
                  },
                  {
                    "date": "20260903",
                    "net": -144079.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260909",
                    "net": 12725.0
                  },
                  {
                    "date": "20260908",
                    "net": 82918.0
                  },
                  {
                    "date": "20260907",
                    "net": 8802.0
                  },
                  {
                    "date": "20260904",
                    "net": 136004.0
                  },
                  {
                    "date": "20260903",
                    "net": 96020.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 5일 매집 추세 강화",
              "note": "외국인 최근 5일 누적 +336,469주 · 양수 5/5일 · 증가 2회"
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
                "targetPrice": "121,400원",
                "historicalHitRate": 0.6087,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.3%",
                "targetPrice": "124,500원",
                "historicalHitRate": 0.2609,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "127,127원",
                "historicalHitRate": 0.1739,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "130,140원",
                "historicalHitRate": 0.1739,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "133,755원",
                "historicalHitRate": 0.087,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 116,885원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "116,885원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260909",
              "anchorOpen": 116300,
              "anchorClose": 120100,
              "anchorVolumeRatio20d": 0.81,
              "anchorStopPrice": 116300,
              "fallbackStopPrice": 116885,
              "effectiveHardStopPrice": 116885,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 116,300원와 기존 % 손절 116,885원 중 더 높은 116,885원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 116,300원를 기준으로 잡고, 기존 % 손절 116,885원보다 느슨해지지 않게 116,885원로 고정합니다."
            },
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 119295,
              "high": 120500,
              "anchor": 120500,
              "label": "119,295~120,500원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 121400,
                "secondaryResistancePrice": 124500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "122,910원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "124,717원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "127,127원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "130,140원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "133,755원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 116,885원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "116,885원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 121400,
                "secondaryResistancePrice": 124500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "121,400원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.3%",
                    "targetPrice": "124,500원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "127,127원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "130,140원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "133,755원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 116,885원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "116,885원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
                "nearestResistancePrice": 121400,
                "secondaryResistancePrice": 124500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "121,400원",
                    "historicalHitRate": 0.6087,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.3%",
                    "targetPrice": "124,500원",
                    "historicalHitRate": 0.2609,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "127,127원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "130,140원",
                    "historicalHitRate": 0.1739,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "133,755원",
                    "historicalHitRate": 0.087,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 116,885원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "116,885원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 23건)",
                  "hitRate": 0.6087,
                  "ev": -0.507,
                  "sampleCount": 23
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
              "sampleCount": 19,
              "ev": -3.3215
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 23건)",
              "hitRate": 0.6087,
              "ev": -0.507,
              "sampleCount": 23
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
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 320% (필요 < 150%) · 외 1건",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 320% (필요 < 150%) / Q1 미충족: 외인 보유율 17.3% (≥25%) · 20일 수익률 +8.1% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 120500.0,
                "vs52wHighPct": 64.1640042598509,
                "vs52wLowPct": 181.21353558926486,
                "dropFrom52wHighPct": 35.835995740149095,
                "ma20GapPct": 6.783641277859011,
                "rsi14": 57.28315851442346,
                "volumeRatio20d": 319.98251434318144,
                "rs20Pct": 8.071748878923767,
                "tradingValueRank": 27.0,
                "marketCapRank": 97.0,
                "marketCapTrillion": 5.9146,
                "per": 34.17,
                "pbr": 5.46,
                "cnsPer": 27.15,
                "foreignRate": 17.27,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -11.498482917075496
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "원익IPS",
            "code": "240810",
            "strictScore": 8.4,
            "signalScore": 8.4,
            "score": 8.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.4,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 82,918→12,725 / 기관 -23,440→12,677 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 91.0% / 마지막 1시간 200.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 120,500 / 20MA 112,845 (106.8% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 44% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 319% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.14 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 121300, 전봉 종가 120000 충족"
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
                "note": "시총 5.9조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-09-04까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-08-31~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +15.1% (필요 ≥ +15%)",
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
                "note": "종가 120,500 / 60MA 119,745",
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
                "status": "✅",
                "note": "20MA 이격 +6.8% (≤+22%) · RSI14 57 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 82,918→12,725 / 기관 -23,440→12,677 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 91.0% / 마지막 1시간 200.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 120,500 / 20MA 112,845 (106.8% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 319% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.14 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 121300, 전봉 종가 120000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 44% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 120500,
            "previousClose": 120100,
            "dailyChange": 400,
            "dailyChangePct": 0.33,
            "dailyDirection": "up",
            "entryPriceText": "120,500원 (당일 종가 기준)",
            "entryPrice": 120500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 5.9146,
            "marketCapRank": 97,
            "marketCapUniverseCount": 2551,
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
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-09-04까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 121300, 전봉 종가 120000",
              "latestOpen": 120000.0,
              "latestClose": 121300.0,
              "previousClose": 120000.0
            },
            "toss": {
              "avgStrength": 91.0,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-09-10T06:05:00Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 200.0,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 200.0,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 3.2014,
              "last30BuyVolume": 5484.0,
              "last30SellVolume": 1713.0
            },
            "orderbook": {
              "bidAskRatio": 1.1422,
              "bidTotal": 5758,
              "askTotal": 5041,
              "note": "Naver 호가잔량합계 매수 5,758 / 매도 5,041",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=240810"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 47.74, ATR10 6.47%, 일간 표준편차 3.93%, 당일 레인지 11.07%.",
              "metrics": {
                "atrPct10": 6.47,
                "returnStd20": 3.93,
                "todayRangePct": 11.07,
                "vkospi": 47.74
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
                "targetPrice": "122,942원",
                "historicalHitRate": 0.28,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+3.1%",
                "targetPrice": "124,200원",
                "historicalHitRate": 0.24,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 118,331원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "118,331원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 114600,
              "fallbackStopPrice": 118331,
              "effectiveHardStopPrice": 118331,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 114,600원와 기존 % 손절 118,331원 중 더 높은 118,331원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 114,600원이며, 기존 % 손절 118,331원보다 느슨해지지 않게 118,331원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 119295,
              "high": 120500,
              "anchor": 120500,
              "label": "119,295~120,500원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 127900,
                "retrace33Price": 122942,
                "retrace50Price": 124200,
                "nearestResistancePrice": 121400,
                "secondaryResistancePrice": 124500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "122,942원",
                    "historicalHitRate": 0.28,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.1%",
                    "targetPrice": "124,200원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+6.1%",
                    "targetPrice": "127,900원",
                    "historicalHitRate": 0.3968,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 118,331원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "118,331원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday1",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 63건)",
                  "hitRate": 0.3968,
                  "ev": 0.062,
                  "sampleCount": 63
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 127900,
                "retrace33Price": 122942,
                "retrace50Price": 124200,
                "nearestResistancePrice": 121400,
                "secondaryResistancePrice": 124500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "122,942원",
                    "historicalHitRate": 0.28,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.1%",
                    "targetPrice": "124,200원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 118,331원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "118,331원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 25건)",
                  "hitRate": 0.28,
                  "ev": -0.115,
                  "sampleCount": 25
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
                "recentHighPrice": 127900,
                "retrace33Price": 122942,
                "retrace50Price": 124200,
                "nearestResistancePrice": 121400,
                "secondaryResistancePrice": 124500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "122,942원",
                    "historicalHitRate": 0.28,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.1%",
                    "targetPrice": "124,200원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 118,331원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "118,331원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 25건)",
                  "hitRate": 0.28,
                  "ev": -0.115,
                  "sampleCount": 25
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
              "sampleCount": 20,
              "ev": -1.6187
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 25건)",
              "hitRate": 0.28,
              "ev": -0.115,
              "sampleCount": 25
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
            "statusReasonShort": "G4 미충족: 최근 5거래일 최저 -1.5% (필요 -3% 이하 급락 1회 이상)",
            "statusReason": "G4 미충족: 최근 5거래일 최저 -1.5% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 120500.0,
                "vs52wHighPct": 64.1640042598509,
                "vs52wLowPct": 181.21353558926486,
                "dropFrom52wHighPct": 35.835995740149095,
                "ma20GapPct": 6.783641277859011,
                "rsi14": 57.28315851442346,
                "volumeRatio20d": 319.98251434318144,
                "rs20Pct": 8.071748878923767,
                "tradingValueRank": 27.0,
                "marketCapRank": 97.0,
                "marketCapTrillion": 5.9146,
                "per": 34.17,
                "pbr": 5.46,
                "cnsPer": 27.15,
                "foreignRate": 17.27,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -11.498482917075496
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "SK하이닉스",
            "code": "000660",
            "strictScore": 8.0,
            "signalScore": 8.0,
            "score": 8.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.0,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 97,545→41,716 / 기관 -14,560→74,984 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 94.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,861,000 / 20MA 1,687,850 (110.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 63% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 85% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.66 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 1868000, 전봉 종가 1863000 충족"
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
                "note": "당일 거래대금 순위 1위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 1359.4조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-09-09까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "⛔",
                "note": "최근 손절 이력 1건 (최근: 2026-09-01) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +30.6% (필요 ≥ +15%)",
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
                "status": "⛔",
                "note": "종가 1,861,000 / 60MA 1,924,700",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +0.3% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 2.78)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +10.3% (≤+22%) · RSI14 58 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 97,545→41,716 / 기관 -14,560→74,984 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 94.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,861,000 / 20MA 1,687,850 (110.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 63% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1868000, 전봉 종가 1863000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 85% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.66 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1861000,
            "previousClose": 1856000,
            "dailyChange": 5000,
            "dailyChangePct": 0.27,
            "dailyDirection": "up",
            "entryPriceText": "1,861,000원 (당일 종가 기준)",
            "entryPrice": 1861000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1359.4463,
            "marketCapRank": 2,
            "marketCapUniverseCount": 2551,
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
              "note": "KIND 최근공시 2026-09-09까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1868000, 전봉 종가 1863000",
              "latestOpen": 1863000.0,
              "latestClose": 1868000.0,
              "previousClose": 1863000.0
            },
            "toss": {
              "avgStrength": 94.0,
              "note": "토스 공개 체결강도 94.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-09-10T06:04:58Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 3.4693,
              "last30BuyVolume": 1752.0,
              "last30SellVolume": 505.0
            },
            "orderbook": {
              "bidAskRatio": 0.6566,
              "bidTotal": 13529,
              "askTotal": 20606,
              "note": "Naver 호가잔량합계 매수 13,529 / 매도 20,606",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=000660"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 47.74, ATR10 5.30%, 일간 표준편차 4.67%, 당일 레인지 4.26%.",
              "metrics": {
                "atrPct10": 5.3,
                "returnStd20": 4.67,
                "todayRangePct": 4.26,
                "vkospi": 47.74
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
                "targetPrice": "1,916,830원",
                "historicalHitRate": 0.28,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "1,954,050원",
                "historicalHitRate": 0.24,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,827,502원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "1,827,502원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1811000,
              "fallbackStopPrice": 1827502,
              "effectiveHardStopPrice": 1827502,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,811,000원와 기존 % 손절 1,827,502원 중 더 높은 1,827,502원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,811,000원이며, 기존 % 손절 1,827,502원보다 느슨해지지 않게 1,827,502원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 1842390,
              "high": 1861000,
              "anchor": 1861000,
              "label": "1,842,390~1,861,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1890000,
                "retrace33Price": 1870570,
                "retrace50Price": 1875500,
                "nearestResistancePrice": 1883000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "1,894,498원",
                    "historicalHitRate": 0.28,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,916,830원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,935,440원",
                    "historicalHitRate": 0.3968,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,827,502원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,827,502원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday1",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 63건)",
                  "hitRate": 0.3968,
                  "ev": 0.062,
                  "sampleCount": 63
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1890000,
                "retrace33Price": 1870570,
                "retrace50Price": 1875500,
                "nearestResistancePrice": 1883000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "1,894,498원",
                    "historicalHitRate": 0.28,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,916,830원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,827,502원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,827,502원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 25건)",
                  "hitRate": 0.28,
                  "ev": -0.115,
                  "sampleCount": 25
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
                "recentHighPrice": 1890000,
                "retrace33Price": 1870570,
                "retrace50Price": 1875500,
                "nearestResistancePrice": 1883000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,916,830원",
                    "historicalHitRate": 0.28,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "1,954,050원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,827,502원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,827,502원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 25건)",
                  "hitRate": 0.28,
                  "ev": -0.115,
                  "sampleCount": 25
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
              "sampleCount": 20,
              "ev": -1.6187
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 25건)",
              "hitRate": 0.28,
              "ev": -0.115,
              "sampleCount": 25
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
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G3",
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-09-01) · 재진입 차단 · 외 3건",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-09-01) · 재진입 차단 / G2 미충족: 20일 고점 대비 -1.5% (필요 -5%~-25%) / G3 미충족: 종가 1,861,000 / 60MA 1,924,700 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1861000.0,
                "vs52wHighPct": 61.99200532978014,
                "vs52wLowPct": 511.1658456486043,
                "dropFrom52wHighPct": 38.00799467021985,
                "ma20GapPct": 10.258613028408922,
                "rsi14": 58.40286972708246,
                "volumeRatio20d": 74.02378971066442,
                "rs20Pct": 23.736702127659576,
                "tradingValueRank": 1.0,
                "marketCapRank": 2.0,
                "marketCapTrillion": 1359.4463,
                "per": 8.3,
                "pbr": 5.02,
                "cnsPer": 5.32,
                "foreignRate": 50.67,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -35.04894661808965
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "우리기술",
            "code": "032820",
            "strictScore": 8.0,
            "signalScore": 8.0,
            "score": 8.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 8.0,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 376,432→592,623 / 기관 -317,054→92,305 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 92.4% / 마지막 1시간 151.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 14,510 / 20MA 11,885 (122.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 69% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 141% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.51 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 14620, 전봉 종가 14720 미달"
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
                "note": "당일 거래대금 순위 29위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 2.5조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-09-09 공매도 과열종목 지정(공매도 거래 금지 적용)",
                "evalStatus": "not_met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-08-31~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +26.7% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -3.7% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 14,510 / 60MA 11,402",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +1.2% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +22.1% (≤+22%) · RSI14 69 (≤72) · 20MA 과이격(반등 소진)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 376,432→592,623 / 기관 -317,054→92,305 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 92.4% / 마지막 1시간 151.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 14,510 / 20MA 11,885 (122.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 69% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.51 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 141% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 14620, 전봉 종가 14720 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 14510,
            "previousClose": 14320,
            "dailyChange": 190,
            "dailyChangePct": 1.33,
            "dailyDirection": "up",
            "entryPriceText": "14,510원 (당일 종가 기준)",
            "entryPrice": 14510,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.5071,
            "marketCapRank": 177,
            "marketCapUniverseCount": 2551,
            "keyPoint": "20일 고점 대비 -3.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-09-09 공매도 과열종목 지정(공매도 거래 금지 적용)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 14620, 전봉 종가 14720",
              "latestOpen": 14730.0,
              "latestClose": 14620.0,
              "previousClose": 14720.0
            },
            "toss": {
              "avgStrength": 92.4,
              "note": "토스 공개 체결강도 92.4% / 최근 체결 3분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A032820/order",
              "asOf": "2026-09-10T06:05:00Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 3,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 3분 프록시",
              "lastHourAvgStrength": 151.1,
              "lastHourObservedMinutes": 3,
              "last30AvgStrength": 151.1,
              "last30ObservedMinutes": 3,
              "last30BuySellRatio": 0.9919,
              "last30BuyVolume": 8740.0,
              "last30SellVolume": 8811.0
            },
            "orderbook": {
              "bidAskRatio": 1.5107,
              "bidTotal": 54272,
              "askTotal": 35925,
              "note": "Naver 호가잔량합계 매수 54,272 / 매도 35,925",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=032820"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 47.74, ATR10 9.92%, 일간 표준편차 5.85%, 당일 레인지 12.64%.",
              "metrics": {
                "atrPct10": 9.92,
                "returnStd20": 5.85,
                "todayRangePct": 12.64,
                "vkospi": 47.74
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
                "targetPrice": "14,945원",
                "historicalHitRate": 0.28,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+3.9%",
                "targetPrice": "15,070원",
                "historicalHitRate": 0.24,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 14,249원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "14,249원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 13260,
              "fallbackStopPrice": 14249,
              "effectiveHardStopPrice": 14249,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 13,260원와 기존 % 손절 14,249원 중 더 높은 14,249원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 13,260원이며, 기존 % 손절 14,249원보다 느슨해지지 않게 14,249원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 14365,
              "high": 14510,
              "anchor": 14510,
              "label": "14,365~14,510원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 15070,
                "retrace33Price": 14695,
                "retrace50Price": 14790,
                "nearestResistancePrice": 14550,
                "secondaryResistancePrice": 15070,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "14,771원",
                    "historicalHitRate": 0.28,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.9%",
                    "targetPrice": "15,070원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "15,090원",
                    "historicalHitRate": 0.3968,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 14,249원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "14,249원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "intraday1",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 63건)",
                  "hitRate": 0.3968,
                  "ev": 0.062,
                  "sampleCount": 63
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 15070,
                "retrace33Price": 14695,
                "retrace50Price": 14790,
                "nearestResistancePrice": 14550,
                "secondaryResistancePrice": 15070,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "14,771원",
                    "historicalHitRate": 0.28,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "15,070원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 14,249원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "14,249원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 25건)",
                  "hitRate": 0.28,
                  "ev": -0.115,
                  "sampleCount": 25
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
                "recentHighPrice": 15070,
                "retrace33Price": 14695,
                "retrace50Price": 14790,
                "nearestResistancePrice": 14550,
                "secondaryResistancePrice": 15070,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "14,945원",
                    "historicalHitRate": 0.28,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.9%",
                    "targetPrice": "15,070원",
                    "historicalHitRate": 0.24,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 14,249원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "14,249원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 25건)",
                  "hitRate": 0.28,
                  "ev": -0.115,
                  "sampleCount": 25
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
              "sampleCount": 20,
              "ev": -1.6187
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 25건)",
              "hitRate": 0.28,
              "ev": -0.115,
              "sampleCount": 25
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
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 2.5조 (필요 ≥ 5조) · 외 4건",
            "statusReason": "F2 미충족: 시총 2.5조 (필요 ≥ 5조) / F3 미충족: KIND 최근공시 2026-09-09 공매도 과열종목 지정(공매도 거래 금지 적용) / G2 미충족: 20일 고점 대비 -3.7% (필요 -5%~-25%) / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 14510.0,
                "vs52wHighPct": 48.04635761589404,
                "vs52wLowPct": 309.88700564971754,
                "dropFrom52wHighPct": 51.95364238410596,
                "ma20GapPct": 22.086663862010937,
                "rsi14": 68.56261264382626,
                "volumeRatio20d": 330.6022443275364,
                "rs20Pct": 26.173913043478258,
                "tradingValueRank": 29.0,
                "marketCapRank": 177.0,
                "marketCapTrillion": 2.5071,
                "per": 0.0,
                "pbr": 13.17,
                "cnsPer": 0.0,
                "foreignRate": 6.09,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-09-10T15:06:01+09:00",
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
  "analysisDate": "2026-09-10",
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
      "000660",
      "009150",
      "036930",
      "240810"
    ],
    "changedEntries": [
      {
        "strategy": "pullback",
        "code": "036930",
        "name": "주성엔지니어링",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 10.1,
          "signalScore": 10.1,
          "score": 10.1,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 7.8,
          "grade": "A"
        },
        "after": {
          "strictScore": 11.4,
          "signalScore": 11.4,
          "score": 11.4,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 8.8,
          "grade": "S"
        }
      },
      {
        "strategy": "pullback",
        "code": "240810",
        "name": "원익IPS",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 10.1,
          "signalScore": 10.1,
          "score": 10.1,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 7.8,
          "grade": "A"
        },
        "after": {
          "strictScore": 11.4,
          "signalScore": 11.4,
          "score": 11.4,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 8.8,
          "grade": "S"
        }
      },
      {
        "strategy": "accumulation",
        "code": "000660",
        "name": "SK하이닉스",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 10.1,
          "signalScore": 10.1,
          "score": 10.1,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.2,
          "grade": "A"
        },
        "after": {
          "strictScore": 10.9,
          "signalScore": 10.9,
          "score": 10.9,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.8,
          "grade": "A"
        }
      },
      {
        "strategy": "accumulation",
        "code": "009150",
        "name": "삼성전기",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 9.8,
          "signalScore": 9.8,
          "score": 9.8,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.0,
          "grade": "A"
        },
        "after": {
          "strictScore": 10.6,
          "signalScore": 10.6,
          "score": 10.6,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.6,
          "grade": "A"
        }
      },
      {
        "strategy": "accumulation",
        "code": "240810",
        "name": "원익IPS",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 9.4,
          "signalScore": 9.4,
          "score": 9.4,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 6.7,
          "grade": "B"
        },
        "after": {
          "strictScore": 10.2,
          "signalScore": 10.2,
          "score": 10.2,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.3,
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
