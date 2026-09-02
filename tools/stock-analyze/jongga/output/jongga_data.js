window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-09-02T08:35:20+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "001820",
      "name": "삼화콘덴서",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "387690",
      "name": "레메디",
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
    }
  ],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 22,
      "failed": 0,
      "stale": 0,
      "manual": 4,
      "fallback": 1,
      "slots": 1
    },
    "failedKeys": [],
    "staleKeys": [],
    "manualKeys": [
      "toss_metrics"
    ],
    "fallbackKeys": [
      "overtime_price"
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
      "naver_overtime_board": {
        "fallback": 1
      },
      "krx_pykrx_short_balance": {
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
      }
    ],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 808.7,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 199.3,
        "detail": "Yahoo chart 5종",
        "count": 5
      },
      {
        "step": "gap_score",
        "label": "갭 스코어 계산",
        "status": "ok",
        "durationMs": 0.1,
        "detail": "G-D 🟠"
      },
      {
        "step": "kospi_history",
        "label": "KOSPI 히스토리 수집",
        "status": "ok",
        "durationMs": 2095.1,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 495.7,
        "detail": "박스권 ⚠️ (거시 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 58743.0,
        "count": 22
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 933.6,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 15167.7,
        "detail": "후보 16종목 중 16건 수집",
        "count": 16
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 8649.9,
        "detail": "성공 22 / 실패 0",
        "count": 22
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 8623.9,
        "detail": "direct-http · 체결강도 22 / 호가 22 / 틱프록시 22",
        "count": 22
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 56170.5,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 13038.6,
        "detail": "playwright-chromium · KIND 2",
        "count": 2
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
        "durationMs": 51659.4,
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
            "value": "6562.72 (-3.99%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 43.37"
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
            "value": "G-D 🟠 (-5.0점)"
          },
          {
            "item": "갭 조정",
            "value": "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "7267.37",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "6672.16",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 43.37",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 13 / 하락 7",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 81 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
            "verdict": "박스권 ⚠️ (거시 완충)"
          },
          {
            "item": "거시 맥락",
            "value": "표준 레짐 / RI 33.348275079011515",
            "verdict": "✅"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다. 적용 레짐은 market-analyze·KOSPI 보조 신호로 조정되었습니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20260902",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
          "regimeAdjustmentReason": "펀더 앵커 81 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
          "riseJustified": true,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "표준 레짐",
          "marketRegimeKey": "standard",
          "fundamentalAnchorScore": 81.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.61,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "표준 버블 경계",
          "riskIndex": 33.348275079011515,
          "stageOverrideReason": "지지력 보정: raw P 36 -> adjusted P 33 · F_support 10점",
          "kospiClose": 6562.72,
          "kospiMa5": 6783.9580000000005,
          "vkospiValue": 43.37,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": true
        },
        "technicalRegimeLabel": "약세장 ⛔",
        "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
        "regimeAdjustmentReason": "펀더 앵커 81 · 버블 critical off · 펀더·버블 정당 → 박스권 완화"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "-1.53%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.41",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+13.2bp",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-20.54원",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-2.58%",
            "baseScore": "-2점",
            "weight": "×1.0",
            "formula": "-2 × 1.0 = -2.0점",
            "weightedScore": "-2.0점"
          }
        ],
        "totalScore": "-5.0점",
        "grade": "G-D 🟠",
        "code": "G-D",
        "entryAdjustment": "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류",
        "sellAdjustment": "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소",
        "swingAdjustment": "금지",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-09-03T03:59:00+00:00",
          "vix": "2026-09-02T20:15:00+00:00",
          "tnx": "2026-09-02T19:00:00+00:00",
          "krw": "2026-09-02T22:59:00+00:00",
          "sox": "2026-09-03T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "SK이노베이션",
            "code": "096770",
            "strictScore": 10.8,
            "signalScore": 10.8,
            "score": 10.8,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 8.3,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 268,339주 / 기관 266,725주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 131,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.05 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -20.8% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 110% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -36.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G12, G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 401% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 124,240 > 20MA 122,905 > 60MA 112,137 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 131,500 / 60MA 112,137",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 54.6 (필요 ≥ 50)",
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
                "note": "KOSPI 6,563 / 5MA 6,784 (-3.3%) · VKOSPI 43.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -2.81% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 54.6 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +7.0% (필요 ≤ +25%) · 60MA +17.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -20.8% (≥12%) · 거래량 110% (≥80%) · 수급추세 +4 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "status": "✅",
                "note": "당일 거래량 / 앵커 거래량 49% · 시가 133,600 / 종가 131,500 / 전일 종가 135,300 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 131,500 / 앵커 중심값 131,100 / 복합 지지 121,675 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 0.16:1 / 마지막 30분 평균 157.9% / 마지막 1시간 157.9% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "⛔",
                "note": "KIND 최근공시 2026-08-25 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 268,339주 / 기관 266,725주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 131,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -20.8% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +4 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 110% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -36.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.05 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 131500,
            "previousClose": 135300,
            "dailyChange": -3800,
            "dailyChangePct": -2.81,
            "dailyDirection": "down",
            "entryPriceText": "131,500원 (당일 종가 기준)",
            "entryPrice": 131500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 22.2304,
            "marketCapRank": 32,
            "marketCapUniverseCount": 2551,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 268,339주 / 기관 266,725주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 90.0,
              "note": "토스 공개 체결강도 90.0% / 최근 체결 22분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-09-02T08:33:12Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 22,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 22분 프록시",
              "lastHourAvgStrength": 157.9,
              "lastHourObservedMinutes": 22,
              "last30AvgStrength": 157.9,
              "last30ObservedMinutes": 22,
              "last30BuySellRatio": 0.1603,
              "last30BuyVolume": 430.0,
              "last30SellVolume": 2682.0
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-08-25 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 121,675원 (7.47% 아래) · 강도 90점 · family 4개 · 수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 121675,
                    "distancePct": 7.47,
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
                    "count": 15,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 90,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 103790,
                    "distancePct": 21.07,
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
                    "count": 16,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 112241,
                    "distancePct": 14.65,
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
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 110006,
                    "distancePct": 16.35,
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
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 125596,
                    "distancePct": 4.49,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 121675,
                  "distancePct": 7.47,
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
                  "count": 15,
                  "lastSeenDaysAgo": 2,
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
                    "price": 89450,
                    "distancePct": 31.98,
                    "count": 2,
                    "lastSeenDaysAgo": 45,
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
                    "distancePct": 29.99,
                    "count": 5,
                    "lastSeenDaysAgo": 41,
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
                    "distancePct": 28.11,
                    "count": 7,
                    "lastSeenDaysAgo": 39,
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
                    "distancePct": 25.09,
                    "count": 8,
                    "lastSeenDaysAgo": 36,
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
                    "distancePct": 23.73,
                    "count": 3,
                    "lastSeenDaysAgo": 50,
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
                    "price": 103820,
                    "distancePct": 21.05,
                    "count": 13,
                    "lastSeenDaysAgo": 5,
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
                    "price": 106856,
                    "distancePct": 18.74,
                    "count": 9,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 105700,
                    "bandHigh": 108100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 110087,
                    "distancePct": 16.28,
                    "count": 14,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 108600,
                    "bandHigh": 111400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 112440,
                    "distancePct": 14.49,
                    "count": 5,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 112000,
                    "bandHigh": 112700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 116769,
                    "distancePct": 11.2,
                    "count": 10,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 115400,
                    "bandHigh": 118400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 121500,
                    "distancePct": 7.6,
                    "count": 9,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 119600,
                    "bandHigh": 123000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 125392,
                    "distancePct": 4.65,
                    "count": 11,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 124100,
                    "bandHigh": 127000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 130550,
                    "distancePct": 0.72,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 128700,
                    "bandHigh": 132200
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 103850,
                    "distancePct": 21.03,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 103700,
                    "bandHigh": 104000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 120900,
                    "distancePct": 8.06,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 120500,
                    "bandHigh": 121300
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 109925,
                    "distancePct": 16.41,
                    "count": 6,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "volume": 8344550,
                    "binIndex": 10,
                    "binLow": 108867,
                    "binHigh": 110983
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 122625,
                    "distancePct": 6.75,
                    "count": 4,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 25,
                    "volume": 5154481,
                    "binIndex": 16,
                    "binLow": 121567,
                    "binHigh": 123683
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 112042,
                    "distancePct": 14.8,
                    "count": 4,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 3932630,
                    "binIndex": 11,
                    "binLow": 110983,
                    "binHigh": 113100
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 103700,
                    "distancePct": 21.14,
                    "count": 1,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 575.0,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 116700,
                    "distancePct": 11.25,
                    "count": 1,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 200.5,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 125800,
                    "distancePct": 4.33,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 245.3,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 401% (5일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 400.9,
                "latestBurstDaysAgo": 1
              },
              "anchor": {
                "date": "20260901",
                "open": 126900,
                "close": 135300,
                "high": 138500,
                "low": 125800,
                "bodyMid": 131100,
                "volume": 2364790.0,
                "volumeRatio": 2.45,
                "daysAgo": 1
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 49% · 시가 133,600 / 종가 131,500 / 전일 종가 135,300 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 131,500 / 앵커 중심값 131,100 / 복합 지지 121,675 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.16:1 / 마지막 30분 평균 157.9% / 마지막 1시간 157.9% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 43.37, ATR10 7.39%, 일간 표준편차 4.81%, 당일 레인지 3.55%.",
              "metrics": {
                "atrPct10": 7.39,
                "returnStd20": 4.81,
                "todayRangePct": 3.55,
                "vkospi": 43.37
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
              "anchorDate": "20260901",
              "anchorOpen": 126900,
              "anchorClose": 135300,
              "anchorHigh": 138500,
              "anchorLow": 125800,
              "anchorBodyMid": 131100,
              "anchorVolumeRatio": 2.45,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 131100,
              "ma10Price": 123820,
              "ma10PrevPrice": 123560,
              "ma20Price": 122905,
              "ma20PrevPrice": 121895,
              "ma10WarningPrice": null,
              "hardStopPrice": 131100,
              "fallbackStopPrice": 126898,
              "effectiveStopPrice": 131100,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 131,100원, 20일선 122,905원) = 131,100원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 126,898원) = 131,100원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 131,100원, 20일선 122,905원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 126,898원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "132,815원",
                "historicalHitRate": 0.5785,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "134,130원",
                "historicalHitRate": 0.4619,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "137,418원",
                "historicalHitRate": 0.3184,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "139,390원",
                "historicalHitRate": 0.2439,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 131,100원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-0.3%",
                "targetPrice": "131,100원"
              }
            ],
            "rr": "1 : 8.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 129528,
              "high": 130842,
              "anchor": 131500,
              "label": "129,528~130,842원 (종가 ±, 분할매수)"
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
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "132,815원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "134,130원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "137,418원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "139,390원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 131,100원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "131,100원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 105건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "132,815원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "134,130원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "137,418원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "139,390원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 131,100원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "131,100원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
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
                    "condition": "+1.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "132,815원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "134,130원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "137,418원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "139,390원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 131,100원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "131,100원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 105건)",
              "sampleCount": 105,
              "ev": -2.1598
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 223건)",
              "hitRate": 0.5785,
              "ev": 1.216,
              "sampleCount": 223
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
              "핵심 Gate 미충족: G12",
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G12, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G12 미충족: 마지막 30분 비율 0.16:1 / 마지막 30분 평균 157.9% / 마지막 1시간 157.9% · 장 막판 투매 경고 · 외 1건",
            "statusReason": "G12 미충족: 마지막 30분 비율 0.16:1 / 마지막 30분 평균 157.9% / 마지막 1시간 157.9% · 장 막판 투매 경고 / G13 미충족: KIND 최근공시 2026-08-25 기업설명회(IR) 개최(안내공시)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 131500.0,
                "vs52wHighPct": 79.21686746987952,
                "vs52wLowPct": 49.9429874572406,
                "dropFrom52wHighPct": 20.783132530120483,
                "ma20GapPct": 6.993206134819577,
                "rsi14": 57.97378966587347,
                "volumeRatio20d": 110.0996918862883,
                "rs20Pct": 18.149146451033243,
                "supportDistancePct": 7.47,
                "tradingValueRank": 31.0,
                "marketCapRank": 32.0,
                "marketCapTrillion": 22.2304,
                "per": 0.0,
                "pbr": 0.85,
                "cnsPer": 7.69,
                "foreignRate": 15.25,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -36.75872144817019
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "삼화콘덴서",
            "code": "001820",
            "strictScore": 7.6,
            "signalScore": 7.6,
            "score": 7.6,
            "scoreMax": 13.0,
            "effectiveScoreMax": 11.5,
            "gradeScore": 6.6,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -21,457주 / 기관 18,972주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 111,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 107,900 ≤ 종가 111,500)"
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
                "note": "52주 고가 대비 -43.3% (≥12% 만점·8~12% 부분) · 충족"
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
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "거래량 140% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 458% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 111,040 > 20MA 96,690 > 60MA 107,155 · 상승선 5MA, 20MA, 60MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 111,500 / 60MA 107,155",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 58.7 (필요 ≥ 50)",
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
                "note": "KOSPI 6,563 / 5MA 6,784 (-3.3%) · VKOSPI 43.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -0.89% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 58.7 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +15.3% (필요 ≤ +25%) · 60MA +4.1% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -43.3% (≥12%) · 거래량 140% (≥80%) · 수급추세 +0 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "status": "⚠️",
                "note": "장 막판 체결강도 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-08-14까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 -21,457주 / 기관 18,972주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 111,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 107,900 ≤ 종가 111,500)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -43.3% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 140% (≥100% 만점·80~100% 부분) · 충족",
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
                "note": "수급추세 +0 (≥+2 만점·+1 부분) · 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "D4",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 111500,
            "previousClose": 112500,
            "dailyChange": -1000,
            "dailyChangePct": -0.89,
            "dailyDirection": "down",
            "entryPriceText": "111,500원 (당일 종가 기준)",
            "entryPrice": 111500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.159,
            "marketCapRank": 282,
            "marketCapUniverseCount": 2551,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -21,457주 / 기관 18,972주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 평균 체결강도 데이터 부족",
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족",
              "대차잔고 추이 데이터 부족 (대형주만 수집)"
            ],
            "toss": {
              "avgStrength": 99.5,
              "note": "토스 공개 체결강도 99.5% / 최근 체결 132분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001820/order",
              "asOf": "2026-09-02T08:30:17Z",
              "intradayAbove100Ratio": 16.7,
              "observedMinutes": 132,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 132분 프록시"
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-08-14까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 111,756원 (-0.23% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 111756,
                    "distancePct": -0.23,
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
                    "price": 100497,
                    "distancePct": 9.87,
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
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 83500,
                    "distancePct": 25.11,
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
                    "lastSeenDaysAgo": 14,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 77157,
                    "distancePct": 30.8,
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
                    "lastSeenDaysAgo": 15,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 107000,
                    "distancePct": 4.04,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 10,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 111756,
                  "distancePct": -0.23,
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
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 57900,
                    "distancePct": 48.07,
                    "count": 2,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 57800,
                    "bandHigh": 58000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 66300,
                    "distancePct": 40.54,
                    "count": 2,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 66000,
                    "bandHigh": 66600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 74350,
                    "distancePct": 33.32,
                    "count": 4,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 74000,
                    "bandHigh": 74500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 77314,
                    "distancePct": 30.66,
                    "count": 7,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 75900,
                    "bandHigh": 78200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 80300,
                    "distancePct": 27.98,
                    "count": 4,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 79300,
                    "bandHigh": 81200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 83500,
                    "distancePct": 25.11,
                    "count": 5,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 82500,
                    "bandHigh": 84500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 86350,
                    "distancePct": 22.56,
                    "count": 4,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 85400,
                    "bandHigh": 87000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 88767,
                    "distancePct": 20.39,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 88000,
                    "bandHigh": 89300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 91189,
                    "distancePct": 18.22,
                    "count": 7,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 90200,
                    "bandHigh": 92400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 93650,
                    "distancePct": 16.01,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 93300,
                    "bandHigh": 94000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 97100,
                    "distancePct": 12.91,
                    "count": 4,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 96600,
                    "bandHigh": 97600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 100650,
                    "distancePct": 9.73,
                    "count": 5,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 99400,
                    "bandHigh": 101700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 103283,
                    "distancePct": 7.37,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 102800,
                    "bandHigh": 104000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 107000,
                    "distancePct": 4.04,
                    "count": 10,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 104900,
                    "bandHigh": 108300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 110600,
                    "distancePct": 0.81,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 109600,
                    "bandHigh": 111500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 112633,
                    "distancePct": -1.02,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 112500,
                    "bandHigh": 112700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 119300,
                    "distancePct": -7.0,
                    "count": 3,
                    "lastSeenDaysAgo": 41,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 118500,
                    "bandHigh": 120100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 121800,
                    "distancePct": -9.24,
                    "count": 2,
                    "lastSeenDaysAgo": 42,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 121300,
                    "bandHigh": 122200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 129225,
                    "distancePct": -15.9,
                    "count": 4,
                    "lastSeenDaysAgo": 45,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 128200,
                    "bandHigh": 130600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 132560,
                    "distancePct": -18.89,
                    "count": 5,
                    "lastSeenDaysAgo": 45,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 131900,
                    "bandHigh": 133300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 136233,
                    "distancePct": -22.18,
                    "count": 3,
                    "lastSeenDaysAgo": 44,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 135500,
                    "bandHigh": 137200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 141900,
                    "distancePct": -27.26,
                    "count": 3,
                    "lastSeenDaysAgo": 49,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 140600,
                    "bandHigh": 143000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 147033,
                    "distancePct": -31.87,
                    "count": 3,
                    "lastSeenDaysAgo": 43,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 145600,
                    "bandHigh": 147900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 151200,
                    "distancePct": -35.61,
                    "count": 2,
                    "lastSeenDaysAgo": 44,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 151000,
                    "bandHigh": 151400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 163750,
                    "distancePct": -46.86,
                    "count": 2,
                    "lastSeenDaysAgo": 50,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 163600,
                    "bandHigh": 163900
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 100344,
                    "distancePct": 10.01,
                    "count": 5,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "volume": 7087094,
                    "binIndex": 7,
                    "binLow": 97421,
                    "binHigh": 103267
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 176340,
                    "distancePct": -58.15,
                    "count": 2,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 25,
                    "volume": 5542444,
                    "binIndex": 20,
                    "binLow": 173417,
                    "binHigh": 179262
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 112035,
                    "distancePct": -0.48,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 25,
                    "volume": 5501905,
                    "binIndex": 9,
                    "binLow": 109112,
                    "binHigh": 114958
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 77000,
                    "distancePct": 30.94,
                    "count": 1,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 504.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 83500,
                    "distancePct": 25.11,
                    "count": 1,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 217.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 458% (13일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 458.1,
                "latestBurstDaysAgo": 13
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 43.37, ATR10 10.01%, 일간 표준편차 5.71%, 당일 레인지 13.96%.",
              "metrics": {
                "atrPct10": 10.01,
                "returnStd20": 5.71,
                "todayRangePct": 13.96,
                "vkospi": 43.37
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A001820/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 삼화콘덴서 (001820) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.5 처럼 숫자만 붙여넣습니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
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
              "ma10Price": 104850,
              "ma10PrevPrice": 103100,
              "ma20Price": 96690,
              "ma20PrevPrice": 95000,
              "ma10WarningPrice": null,
              "hardStopPrice": 107598,
              "fallbackStopPrice": 107598,
              "effectiveStopPrice": 107598,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 107,598원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 107,598원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "112,615원",
                "historicalHitRate": 0.5785,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "113,730원",
                "historicalHitRate": 0.4619,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "116,517원",
                "historicalHitRate": 0.3184,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "118,190원",
                "historicalHitRate": 0.2439,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 107,598원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "107,598원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 109828,
              "high": 110942,
              "anchor": 111500,
              "label": "109,828~110,942원 (종가 ±, 분할매수)"
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
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "112,615원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "113,730원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "116,517원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "118,190원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 107,598원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "107,598원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 105건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "112,615원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "113,730원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "116,517원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "118,190원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 107,598원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "107,598원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
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
                    "condition": "+1.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "112,615원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "113,730원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "116,517원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "118,190원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 107,598원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "107,598원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 105건)",
              "sampleCount": 105,
              "ev": -2.1598
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 223건)",
              "hitRate": 0.5785,
              "ev": 1.216,
              "sampleCount": 223
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
            "statusReasonShort": "G1 미충족: 5MA 111,040 > 20MA 96,690 > 60MA 107,155 · 상승선 5MA, 20MA, 60MA · 정배열 미충족",
            "statusReason": "G1 미충족: 5MA 111,040 > 20MA 96,690 > 60MA 107,155 · 상승선 5MA, 20MA, 60MA · 정배열 미충족",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 111500.0,
                "vs52wHighPct": 56.65650406504065,
                "vs52wLowPct": 301.8018018018018,
                "dropFrom52wHighPct": 43.34349593495935,
                "ma20GapPct": 15.316992450098251,
                "rsi14": 61.034995222629796,
                "volumeRatio20d": 140.005043336294,
                "rs20Pct": 43.5006435006435,
                "supportDistancePct": 0.23,
                "tradingValueRank": 35.0,
                "marketCapRank": 282.0,
                "marketCapTrillion": 1.159,
                "per": 60.6,
                "pbr": 4.05,
                "cnsPer": 0.0,
                "foreignRate": 5.12,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "레메디",
            "code": "387690",
            "strictScore": 7.6,
            "signalScore": 7.6,
            "score": 7.6,
            "scoreMax": 13.0,
            "effectiveScoreMax": 11.5,
            "gradeScore": 6.6,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 22,653주 / 기관 -62주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 16,780 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 14,900 ≤ 종가 16,780)"
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
                "note": "52주 고가 대비 -51.6% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 347% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G6, Q1)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 286% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⚠️",
                "note": "5/20/60일 이동평균 산출 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G2",
                "status": "⚠️",
                "note": "60일 이동평균 산출 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G3",
                "status": "⚠️",
                "note": "주봉 RSI(14) 산출 데이터 부족",
                "evalStatus": "data_missing"
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
                "note": "KOSPI 6,563 / 5MA 6,784 (-3.3%) · VKOSPI 43.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "⛔",
                "note": "당일 등락 +15.80% (필요 ≤ +12%) · 급등일은 눌림목 부적합",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "주봉 RSI(14) 산출 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G8",
                "status": "⚠️",
                "note": "20/60일 이동평균 산출 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -51.6% (≥12%) · 거래량 347% (≥80%) · 수급추세 -2 (≥0) · 수급 이탈",
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
                "note": "당일 거래량 / 앵커 거래량 121% · 시가 14,900 / 종가 16,780 / 전일 종가 14,490 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 16,780 / 앵커 중심값 12,445 / 복합 지지 14,500 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "⚠️",
                "note": "장 막판 체결강도 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-08-20까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 22,653주 / 기관 -62주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 16,780 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 14,900 ≤ 종가 16,780)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -51.6% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 347% (≥100% 만점·80~100% 부분) · 충족",
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
            "currentPrice": 16780,
            "previousClose": 14490,
            "dailyChange": 2290,
            "dailyChangePct": 15.8,
            "dailyDirection": "up",
            "entryPriceText": "16,780원 (당일 종가 기준)",
            "entryPrice": 16780,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.128,
            "marketCapRank": 1129,
            "marketCapUniverseCount": 2551,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 22,653주 / 기관 -62주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 평균 체결강도 데이터 부족",
              "대차잔고 추이 데이터 부족 (대형주만 수집)"
            ],
            "toss": {
              "avgStrength": 84.3,
              "note": "토스 공개 체결강도 84.3% / 최근 체결 132분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A387690/order",
              "asOf": "2026-09-02T08:30:22Z",
              "intradayAbove100Ratio": 56.2,
              "observedMinutes": 132,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 132분 프록시"
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
                "summary": "주지지 14,500원 (13.59% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 14500,
                    "distancePct": 13.59,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 11042,
                    "distancePct": 34.2,
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
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 14790,
                    "distancePct": 11.86,
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
                    "label": "복합 지지",
                    "price": 12700,
                    "distancePct": 24.31,
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
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 16655,
                    "distancePct": 0.74,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 14500,
                  "distancePct": 13.59,
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
                "barCount": 36
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 7030,
                    "distancePct": 58.1,
                    "count": 2,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 6980,
                    "bandHigh": 7080
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 7220,
                    "distancePct": 56.97,
                    "count": 2,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 7170,
                    "bandHigh": 7270
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 7870,
                    "distancePct": 53.1,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 7830,
                    "bandHigh": 7910
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 8020,
                    "distancePct": 52.21,
                    "count": 3,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 8020,
                    "bandHigh": 8020
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 8450,
                    "distancePct": 49.64,
                    "count": 2,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 8400,
                    "bandHigh": 8500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 9536,
                    "distancePct": 43.17,
                    "count": 4,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 9460,
                    "bandHigh": 9600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 9805,
                    "distancePct": 41.57,
                    "count": 3,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 9740,
                    "bandHigh": 9880
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 10265,
                    "distancePct": 38.83,
                    "count": 3,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 10200,
                    "bandHigh": 10340
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 10575,
                    "distancePct": 36.98,
                    "count": 2,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 10530,
                    "bandHigh": 10620
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 11068,
                    "distancePct": 34.04,
                    "count": 8,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 10980,
                    "bandHigh": 11180
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 11545,
                    "distancePct": 31.2,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 11400,
                    "bandHigh": 11670
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 11936,
                    "distancePct": 28.87,
                    "count": 3,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 11870,
                    "bandHigh": 12030
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 12317,
                    "distancePct": 26.6,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 12260,
                    "bandHigh": 12370
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 12720,
                    "distancePct": 24.2,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 12600,
                    "bandHigh": 12850
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 13132,
                    "distancePct": 21.74,
                    "count": 2,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 13060,
                    "bandHigh": 13200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 14525,
                    "distancePct": 13.44,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 14490,
                    "bandHigh": 14560
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 14800,
                    "distancePct": 11.8,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 14780,
                    "bandHigh": 14820
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 16255,
                    "distancePct": 3.13,
                    "count": 2,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 16210,
                    "bandHigh": 16300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 16655,
                    "distancePct": 0.74,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 16530,
                    "bandHigh": 16780
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 26003,
                    "distancePct": -54.96,
                    "count": 1,
                    "lastSeenDaysAgo": 35,
                    "valid": false,
                    "weight": 25,
                    "volume": 26709647,
                    "binIndex": 16,
                    "binLow": 25427,
                    "binHigh": 26580
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 14474,
                    "distancePct": 13.74,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 15473761,
                    "binIndex": 6,
                    "binLow": 13898,
                    "binHigh": 15050
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 11015,
                    "distancePct": 34.36,
                    "count": 7,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 13482240,
                    "binIndex": 3,
                    "binLow": 10439,
                    "binHigh": 11592
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 12680,
                    "distancePct": 24.43,
                    "count": 1,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 274.3,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 14780,
                    "distancePct": 11.92,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 347.1,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 286% (11일 전) · 200%+ 급증 4회",
                "burstCount": 4,
                "maxRatioPct": 286.4,
                "latestBurstDaysAgo": 2
              },
              "anchor": {
                "date": "20260818",
                "open": 11300,
                "close": 13590,
                "high": 14390,
                "low": 11180,
                "bodyMid": 12445,
                "volume": 6673096.0,
                "volumeRatio": 4.11,
                "daysAgo": 11
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 121% · 시가 14,900 / 종가 16,780 / 전일 종가 14,490 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 16,780 / 앵커 중심값 12,445 / 복합 지지 14,500 · 앵커·지지 방어"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 43.37, ATR10 14.55%, 일간 표준편차 9.18%, 당일 레인지 22.22%.",
              "metrics": {
                "atrPct10": 14.55,
                "returnStd20": 9.18,
                "todayRangePct": 22.22,
                "vkospi": 43.37
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A387690/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 레메디 (387690) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.5 처럼 숫자만 붙여넣습니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
            },
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260818",
              "anchorOpen": 11300,
              "anchorClose": 13590,
              "anchorHigh": 14390,
              "anchorLow": 11180,
              "anchorBodyMid": 12445,
              "anchorVolumeRatio": 4.11,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 12445,
              "ma10Price": 13312,
              "ma10PrevPrice": 12919,
              "ma20Price": 12098,
              "ma20PrevPrice": 11684,
              "ma10WarningPrice": null,
              "hardStopPrice": 12445,
              "fallbackStopPrice": 16193,
              "effectiveStopPrice": 16193,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 12,445원, 20일선 12,098원) = 12,445원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 16,193원) = 16,193원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 12,445원, 20일선 12,098원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 16,193원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+1.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "16,948원",
                "historicalHitRate": 0.5785,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+2.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "17,116원",
                "historicalHitRate": 0.4619,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "17,535원",
                "historicalHitRate": 0.3184,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "17,787원",
                "historicalHitRate": 0.2439,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 16,193원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "16,193원"
              }
            ],
            "rr": "1 : 0.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 16528,
              "high": 16696,
              "anchor": 16780,
              "label": "16,528~16,696원 (종가 ±, 분할매수)"
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
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "16,948원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "17,116원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "17,535원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "17,787원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 16,193원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "16,193원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 105건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "16,948원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "17,116원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "17,535원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "17,787원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 16,193원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "16,193원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
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
                    "condition": "+1.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "16,948원",
                    "historicalHitRate": 0.5785,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "17,116원",
                    "historicalHitRate": 0.4619,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "17,535원",
                    "historicalHitRate": 0.3184,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "17,787원",
                    "historicalHitRate": 0.2439,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 16,193원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "16,193원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 223건)",
                  "hitRate": 0.5785,
                  "ev": 1.216,
                  "sampleCount": 223
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 105건)",
              "sampleCount": 105,
              "ev": -2.1598
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 223건)",
              "hitRate": 0.5785,
              "ev": 1.216,
              "sampleCount": 223
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
              "핵심 Gate 미충족: G6",
              "핵심 Gate 미충족: Q1",
              "매매금지(핵심 Gate 미충족: G6, Q1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G6 미충족: 당일 등락 +15.80% (필요 ≤ +12%) · 급등일은 눌림목 부적합 · 외 1건",
            "statusReason": "G6 미충족: 당일 등락 +15.80% (필요 ≤ +12%) · 급등일은 눌림목 부적합 / Q1 미충족: 52주 고가 대비 -51.6% (≥12%) · 거래량 347% (≥80%) · 수급추세 -2 (≥0) · 수급 이탈",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 16780.0,
                "vs52wHighPct": 48.42712842712843,
                "vs52wLowPct": 140.40114613180518,
                "dropFrom52wHighPct": 51.57287157287157,
                "ma20GapPct": 38.69487953052031,
                "rsi14": 58.67299105369912,
                "volumeRatio20d": 347.09638722624874,
                "rs20Pct": 97.41176470588235,
                "supportDistancePct": 13.59,
                "tradingValueRank": 38.0,
                "marketCapRank": 1129.0,
                "marketCapTrillion": 0.128,
                "per": 21.6,
                "pbr": 6.82,
                "cnsPer": 0.0,
                "foreignRate": 1.31,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 4.5,
            "signalScore": 4.5,
            "score": 4.5,
            "scoreMax": 12.5,
            "effectiveScoreMax": 10.5,
            "gradeScore": 4.3,
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
                "note": "외인 43,316주 / 기관 16,193주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 체결강도 52.0% · 100% 유지 비율 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 77.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 86% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 95.9% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 90% / 윗꼬리·몸통 0.11 · 완벽한 강마감"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 9.68 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +40.6% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "5일 초과 -3.6% / 20일 초과 -10.6%",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 42.0% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 11",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 86% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 90% / 윗꼬리·몸통 0.11 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -7.97% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 982,000 / 5MA 1,036,400 (전일 5MA 1,051,600) · 5MA 조건 미충족",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 43,316주 / 기관 16,193주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 95.9% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 90% / 윗꼬리·몸통 0.11 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 9.68 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +40.6% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
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
                "note": "당일 평균 체결강도 52.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 77.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 86% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 982000,
            "previousClose": 1067000,
            "dailyChange": -85000,
            "dailyChangePct": -7.97,
            "dailyDirection": "down",
            "entryPriceText": "982,000원 (당일 종가 기준)",
            "entryPrice": 982000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 129.5494,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2551,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 43,316주 / 기관 16,193주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 52.0,
              "note": "토스 공개 체결강도 52.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-09-02T08:33:11Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 1.7,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 0.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0,
              "last30BuyVolume": 0.0,
              "last30SellVolume": 4.0
            },
            "orderbook": {
              "bidAskRatio": 9.6828,
              "bidTotal": 26560,
              "askTotal": 2743,
              "note": "Naver 호가잔량합계 매수 26,560 / 매도 2,743",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 43.37, ATR10 6.88%, 일간 표준편차 6.19%, 당일 레인지 3.94%.",
              "metrics": {
                "atrPct10": 6.88,
                "returnStd20": 6.19,
                "todayRangePct": 3.94,
                "vkospi": 43.37
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
              "referencePrice": 977000,
              "referenceBandLow": 977000,
              "referenceBandHigh": 977000,
              "entryDayOpenPrice": 1020000,
              "fallbackStopPrice": 932900,
              "effectiveHardStopPrice": 977000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 977,000원와 기존 % 손절 932,900원 중 더 높은 977,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 977,000원이며, 기존 % 손절 932,900원보다 느슨해지지 않게 977,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.6%",
                "targetPrice": "998,000원",
                "historicalHitRate": 0.6424,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.7%",
                "targetPrice": "1,018,000원",
                "historicalHitRate": 0.3974,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "1,050,740원",
                "historicalHitRate": 0.2715,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,080,200원",
                "historicalHitRate": 0.2252,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+13.0%",
                "targetPrice": "1,109,660원",
                "historicalHitRate": 0.1594,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 977,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.5%",
                "targetPrice": "977,000원"
              }
            ],
            "rr": "1 : 13.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 967270,
              "high": 977090,
              "anchor": 982000,
              "label": "967,270~977,090원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 998000,
                "secondaryResistancePrice": 1018000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,001,640원",
                    "historicalHitRate": 0.6424,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,021,280원",
                    "historicalHitRate": 0.3974,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,050,740원",
                    "historicalHitRate": 0.2715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,080,200원",
                    "historicalHitRate": 0.2252,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.0%",
                    "targetPrice": "1,109,660원",
                    "historicalHitRate": 0.1594,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 977,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "977,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 138건)",
                  "hitRate": 0.1594,
                  "ev": 1.13,
                  "sampleCount": 138
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 998000,
                "secondaryResistancePrice": 1018000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "998,000원",
                    "historicalHitRate": 0.6424,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.7%",
                    "targetPrice": "1,018,000원",
                    "historicalHitRate": 0.3974,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,050,740원",
                    "historicalHitRate": 0.2715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,080,200원",
                    "historicalHitRate": 0.2252,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.0%",
                    "targetPrice": "1,109,660원",
                    "historicalHitRate": 0.1594,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 977,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "977,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 138건)",
                  "hitRate": 0.1594,
                  "ev": 1.13,
                  "sampleCount": 138
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 57건)",
                "nearestResistancePrice": 998000,
                "secondaryResistancePrice": 1018000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "998,000원",
                    "historicalHitRate": 0.6424,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.7%",
                    "targetPrice": "1,018,000원",
                    "historicalHitRate": 0.3974,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,050,740원",
                    "historicalHitRate": 0.2715,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,080,200원",
                    "historicalHitRate": 0.2252,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+13.0%",
                    "targetPrice": "1,109,660원",
                    "historicalHitRate": 0.1594,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 977,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "977,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 138건)",
                  "hitRate": 0.1594,
                  "ev": 1.13,
                  "sampleCount": 138
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 57건)",
              "sampleCount": 57,
              "ev": -1.7813
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 138건)",
              "hitRate": 0.1594,
              "ev": 1.13,
              "sampleCount": 138
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
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G1, G2, G4)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5일 초과 -3.6% / 20일 초과 -10.6% · 외 2건",
            "statusReason": "G1 미충족: 5일 초과 -3.6% / 20일 초과 -10.6% / G2 미충족: 52주 고가 대비 42.0% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 86% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 982000.0,
                "vs52wHighPct": 42.00171086398631,
                "vs52wLowPct": 593.9929328621907,
                "dropFrom52wHighPct": 57.99828913601369,
                "ma20GapPct": -6.378110401372866,
                "rsi14": 42.7936865120862,
                "volumeRatio20d": 86.05393031199715,
                "rs20Pct": -7.3584905660377355,
                "tradingValueRank": 11.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 129.5494,
                "per": 3.96,
                "pbr": 2.36,
                "cnsPer": 3.0,
                "foreignRate": 46.33,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 40.64234415397874
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
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
            "name": "SK이노베이션",
            "code": "096770",
            "strictScore": 10.7,
            "signalScore": 10.7,
            "score": 10.7,
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
                "note": "외인 268,339주 / 기관 266,725주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +268,339 / 전일 +142,387 · 기관 당일 +266,725 / 전일 +294,074 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 157.9% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 90.0% / 마지막 1시간 157.9% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +28,550주 · 양수 4/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 107.0% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 124,240 / 20MA 122,905 · 5MA > 20MA"
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
                "note": "당일 등락 -2.81% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -1.78% / KOSPI -3.99% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.16:1 · 평균 체결강도 157.9% (필요 ≥ 1.1:1)"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -36.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
                "note": "외인 전일 +142,387/당일 +268,339 · 기관 전일 +294,074/당일 +266,725 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 131,500 / 60MA 112,137",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 79.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 31",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 110% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 15.2% (≥25%) · 20일 수익률 +18.1% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,563 / 5MA 6,784 (-3.3%) · VKOSPI 43.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 268,339주 / 기관 266,725주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +268,339 / 전일 +142,387 · 기관 당일 +266,725 / 전일 +294,074 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 157.9% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 90.0% / 마지막 1시간 157.9% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +28,550주 · 양수 4/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 124,240 / 20MA 122,905 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 53% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -2.81% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.78% / KOSPI -3.99% outperform",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -36.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 107.0% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.16:1 · 평균 체결강도 157.9% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 131500,
            "previousClose": 135300,
            "dailyChange": -3800,
            "dailyChangePct": -2.81,
            "dailyDirection": "down",
            "entryPriceText": "131,500원 (당일 종가 기준)",
            "entryPrice": 131500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 22.2304,
            "marketCapRank": 32,
            "marketCapUniverseCount": 2551,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 268,339주 / 기관 266,725주 / 마지막 1시간 157.9% · 장후반 매수세 강화 · 마지막 30분 틱 0.16:1. 외국인 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 90.0,
              "note": "토스 공개 체결강도 90.0% / 최근 체결 22분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-09-02T08:33:12Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 22,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 22분 프록시",
              "lastHourAvgStrength": 157.9,
              "lastHourObservedMinutes": 22,
              "last30AvgStrength": 157.9,
              "last30ObservedMinutes": 22,
              "last30BuySellRatio": 0.1603,
              "last30BuyVolume": 430.0,
              "last30SellVolume": 2682.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 43.37, ATR10 7.39%, 일간 표준편차 4.81%, 당일 레인지 3.55%.",
              "metrics": {
                "atrPct10": 7.39,
                "returnStd20": 4.81,
                "todayRangePct": 3.55,
                "vkospi": 43.37
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 28550.0,
              "positiveDays": 4,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260901",
                    "net": 268339.0
                  },
                  {
                    "date": "20260831",
                    "net": 142387.0
                  },
                  {
                    "date": "20260828",
                    "net": 350648.0
                  },
                  {
                    "date": "20260827",
                    "net": 273108.0
                  },
                  {
                    "date": "20260826",
                    "net": -1005932.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260901",
                    "net": 266725.0
                  },
                  {
                    "date": "20260831",
                    "net": 294074.0
                  },
                  {
                    "date": "20260828",
                    "net": 128398.0
                  },
                  {
                    "date": "20260827",
                    "net": -34370.0
                  },
                  {
                    "date": "20260826",
                    "net": -671349.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260901",
                    "net": 268339.0
                  },
                  {
                    "date": "20260831",
                    "net": 142387.0
                  },
                  {
                    "date": "20260828",
                    "net": 350648.0
                  },
                  {
                    "date": "20260827",
                    "net": 273108.0
                  },
                  {
                    "date": "20260826",
                    "net": -1005932.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 5일 매집 추세 강화",
              "note": "외국인 최근 5일 누적 +28,550주 · 양수 4/5일 · 증가 3회"
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
                "targetPrice": "132,000원",
                "historicalHitRate": 0.6655,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.8%",
                "targetPrice": "133,900원",
                "historicalHitRate": 0.3589,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "138,732원",
                "historicalHitRate": 0.2334,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "142,020원",
                "historicalHitRate": 0.1359,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "145,965원",
                "historicalHitRate": 0.0736,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 126,900원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "126,900원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260901",
              "anchorOpen": 126900,
              "anchorClose": 135300,
              "anchorVolumeRatio20d": 2.45,
              "anchorStopPrice": 126900,
              "fallbackStopPrice": 126240,
              "effectiveHardStopPrice": 126900,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 126,900원와 기존 % 손절 126,240원 중 더 높은 126,900원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 126,900원를 기준으로 잡고, 기존 % 손절 126,240원보다 느슨해지지 않게 126,900원로 고정합니다."
            },
            "rr": "1 : 1.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 129528,
              "high": 130842,
              "anchor": 131500,
              "label": "129,528~130,842원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 132000,
                "secondaryResistancePrice": 133900,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "132,815원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "134,788원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "138,732원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "142,020원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "145,965원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 126,900원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "126,900원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 132000,
                "secondaryResistancePrice": 133900,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "132,000원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "133,900원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "138,732원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "142,020원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "145,965원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 126,900원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "126,900원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
                "nearestResistancePrice": 132000,
                "secondaryResistancePrice": 133900,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "132,000원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "133,900원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "138,732원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "142,020원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "145,965원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 126,900원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "126,900원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
              "sampleCount": 136,
              "ev": -1.7119
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 287건)",
              "hitRate": 0.6655,
              "ev": 0.291,
              "sampleCount": 287
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
            "statusReasonShort": "Q1 미충족: 외인 보유율 15.2% (≥25%) · 20일 수익률 +18.1% (≥0%) · 외인 매집 주체 약함",
            "statusReason": "Q1 미충족: 외인 보유율 15.2% (≥25%) · 20일 수익률 +18.1% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 131500.0,
                "vs52wHighPct": 79.21686746987952,
                "vs52wLowPct": 49.9429874572406,
                "dropFrom52wHighPct": 20.783132530120483,
                "ma20GapPct": 6.993206134819577,
                "rsi14": 57.97378966587347,
                "volumeRatio20d": 110.0996918862883,
                "rs20Pct": 18.149146451033243,
                "tradingValueRank": 31.0,
                "marketCapRank": 32.0,
                "marketCapTrillion": 22.2304,
                "per": 0.0,
                "pbr": 0.85,
                "cnsPer": 7.69,
                "foreignRate": 15.25,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -36.75872144817019
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 6.6,
            "signalScore": 6.6,
            "score": 6.6,
            "scoreMax": 14.0,
            "effectiveScoreMax": 13.5,
            "gradeScore": 4.9,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 43,316주 / 기관 16,193주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +43,316 / 전일 -15,214 · 기관 당일 +16,193 / 전일 +12,759 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "마지막 1시간 평균 체결강도 1.7% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "당일 평균 52.0% / 마지막 1시간 1.7% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +160,735주 · 양수 4/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 93.6% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 1,036,400 / 20MA 1,048,900 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -7.97% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -1.42% / KOSPI -3.99% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "data_missing",
                "note": "마지막 30분 틱 프록시 데이터 부족"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +40.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 -15,214/당일 +43,316 · 기관 전일 +12,759/당일 +16,193 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 982,000 / 60MA 1,266,983",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 42.0% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 86% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 46.3% (≥25%) · 20일 수익률 -7.4% (≥0%) · 20일 약세(낙하 칼날)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,563 / 5MA 6,784 (-3.3%) · VKOSPI 43.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 43,316주 / 기관 16,193주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +43,316 / 전일 -15,214 · 기관 당일 +16,193 / 전일 +12,759 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +160,735주 · 양수 4/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.42% / KOSPI -3.99% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 1.7% (필요 ≥ 100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "S4",
                "note": "당일 평균 52.0% / 마지막 1시간 1.7% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 93.6% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "5MA 1,036,400 / 20MA 1,048,900 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -7.97% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱 프록시 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "L1",
                "note": "대차잔고 +40.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 982000,
            "previousClose": 1067000,
            "dailyChange": -85000,
            "dailyChangePct": -7.97,
            "dailyDirection": "down",
            "entryPriceText": "982,000원 (당일 종가 기준)",
            "entryPrice": 982000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 129.5494,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2551,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 43,316주 / 기관 16,193주 / 마지막 1시간 1.7%. 외국인 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 52.0,
              "note": "토스 공개 체결강도 52.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-09-02T08:33:11Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 1.7,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 0.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0,
              "last30BuyVolume": 0.0,
              "last30SellVolume": 4.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 43.37, ATR10 6.88%, 일간 표준편차 6.19%, 당일 레인지 3.94%.",
              "metrics": {
                "atrPct10": 6.88,
                "returnStd20": 6.19,
                "todayRangePct": 3.94,
                "vkospi": 43.37
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 160735.0,
              "positiveDays": 4,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260901",
                    "net": 43316.0
                  },
                  {
                    "date": "20260831",
                    "net": -15214.0
                  },
                  {
                    "date": "20260828",
                    "net": 67702.0
                  },
                  {
                    "date": "20260827",
                    "net": 46736.0
                  },
                  {
                    "date": "20260826",
                    "net": 18195.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260901",
                    "net": 16193.0
                  },
                  {
                    "date": "20260831",
                    "net": 12759.0
                  },
                  {
                    "date": "20260828",
                    "net": -117798.0
                  },
                  {
                    "date": "20260827",
                    "net": -33868.0
                  },
                  {
                    "date": "20260826",
                    "net": -18036.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260901",
                    "net": 43316.0
                  },
                  {
                    "date": "20260831",
                    "net": -15214.0
                  },
                  {
                    "date": "20260828",
                    "net": 67702.0
                  },
                  {
                    "date": "20260827",
                    "net": 46736.0
                  },
                  {
                    "date": "20260826",
                    "net": 18195.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 5일 매집 추세 강화",
              "note": "외국인 최근 5일 누적 +160,735주 · 양수 4/5일 · 증가 3회"
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
                "targetPrice": "1,006,000원",
                "historicalHitRate": 0.6655,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+3.7%",
                "targetPrice": "1,018,000원",
                "historicalHitRate": 0.3589,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "1,036,010원",
                "historicalHitRate": 0.2334,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "1,060,560원",
                "historicalHitRate": 0.1359,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,090,020원",
                "historicalHitRate": 0.0736,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,016,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "+3.5%",
                "targetPrice": "1,016,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260901",
              "anchorOpen": 1016000,
              "anchorClose": 1067000,
              "anchorVolumeRatio20d": 0.72,
              "anchorStopPrice": 1016000,
              "fallbackStopPrice": 942720,
              "effectiveHardStopPrice": 1016000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,016,000원와 기존 % 손절 942,720원 중 더 높은 1,016,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 1,016,000원를 기준으로 잡고, 기존 % 손절 942,720원보다 느슨해지지 않게 1,016,000원로 고정합니다."
            },
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 967270,
              "high": 977090,
              "anchor": 982000,
              "label": "967,270~977,090원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1006000,
                "secondaryResistancePrice": 1018000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "991,820원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,006,550원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,036,010원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,060,560원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,090,020원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,016,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,016,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 1006000,
                "secondaryResistancePrice": 1018000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "991,820원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,006,550원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,036,010원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,060,560원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,090,020원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,016,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,016,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
                "nearestResistancePrice": 1006000,
                "secondaryResistancePrice": 1018000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "1,006,000원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.7%",
                    "targetPrice": "1,018,000원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,036,010원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,060,560원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,090,020원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,016,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,016,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
              "sampleCount": 136,
              "ev": -1.7119
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 287건)",
              "hitRate": 0.6655,
              "ev": 0.291,
              "sampleCount": 287
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
            "statusReasonShort": "G1 미충족: 종가 982,000 / 60MA 1,266,983 · 외 1건",
            "statusReason": "G1 미충족: 종가 982,000 / 60MA 1,266,983 / Q1 미충족: 외인 보유율 46.3% (≥25%) · 20일 수익률 -7.4% (≥0%) · 20일 약세(낙하 칼날)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 982000.0,
                "vs52wHighPct": 42.00171086398631,
                "vs52wLowPct": 593.9929328621907,
                "dropFrom52wHighPct": 57.99828913601369,
                "ma20GapPct": -6.378110401372866,
                "rsi14": 42.7936865120862,
                "volumeRatio20d": 86.05393031199715,
                "rs20Pct": -7.3584905660377355,
                "tradingValueRank": 11.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 129.5494,
                "per": 3.96,
                "pbr": 2.36,
                "cnsPer": 3.0,
                "foreignRate": 46.33,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 40.64234415397874
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "SK하이닉스",
            "code": "000660",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 4.4,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 91,835주 / 기관 -142,669주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 +91,835 / 전일 -211,935 · 기관 당일 -142,669 / 전일 -314,294 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 119.2% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 85.0% / 마지막 1시간 119.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
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
                "note": "5MA 1,672,600 / 20MA 1,607,750 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -4.73% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -1.96% / KOSPI -3.99% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.69:1 · 평균 체결강도 128.6% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +111.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 -211,935/당일 +91,835 · 기관 전일 -314,294/당일 -142,669 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 1,613,000 / 60MA 1,968,833",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 53.7% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 60% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 50.6% (≥25%) · 20일 수익률 +2.3% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,563 / 5MA 6,784 (-3.3%) · VKOSPI 43.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 119.2% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 85.0% / 마지막 1시간 119.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 100.3% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,672,600 / 20MA 1,607,750 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -1.96% / KOSPI -3.99% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.69:1 · 평균 체결강도 128.6% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 91,835주 / 기관 -142,669주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +91,835 / 전일 -211,935 · 기관 당일 -142,669 / 전일 -314,294 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "S5",
                "note": "최근 5일 매집 추세 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -4.73% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +111.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1613000,
            "previousClose": 1693000,
            "dailyChange": -80000,
            "dailyChangePct": -4.73,
            "dailyDirection": "down",
            "entryPriceText": "1,613,000원 (당일 종가 기준)",
            "entryPrice": 1613000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1178.2842,
            "marketCapRank": 2,
            "marketCapUniverseCount": 2551,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 91,835주 / 기관 -142,669주 / 마지막 1시간 119.2% · 장후반 매수세 강화 · 마지막 30분 틱 1.69:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 85.0,
              "note": "토스 공개 체결강도 85.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-09-02T08:33:11Z",
              "intradayAbove100Ratio": 38.5,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 119.2,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 128.6,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.6897,
              "last30BuyVolume": 98.0,
              "last30SellVolume": 58.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 43.37, ATR10 6.33%, 일간 표준편차 5.32%, 당일 레인지 2.89%.",
              "metrics": {
                "atrPct10": 6.33,
                "returnStd20": 5.32,
                "todayRangePct": 2.89,
                "vkospi": 43.37
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
                    "date": "20260901",
                    "net": 91835.0
                  },
                  {
                    "date": "20260831",
                    "net": -211935.0
                  },
                  {
                    "date": "20260828",
                    "net": -190235.0
                  },
                  {
                    "date": "20260827",
                    "net": -159385.0
                  },
                  {
                    "date": "20260826",
                    "net": -227762.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260901",
                    "net": -142669.0
                  },
                  {
                    "date": "20260831",
                    "net": -314294.0
                  },
                  {
                    "date": "20260828",
                    "net": -796000.0
                  },
                  {
                    "date": "20260827",
                    "net": -140329.0
                  },
                  {
                    "date": "20260826",
                    "net": 2290.0
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
                "targetYield": "+0.4%",
                "targetPrice": "1,619,000원",
                "historicalHitRate": 0.6655,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+9.9%",
                "targetPrice": "1,773,000원",
                "historicalHitRate": 0.3589,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+9.9%",
                "targetPrice": "1,773,000원",
                "historicalHitRate": 0.2334,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+9.9%",
                "targetPrice": "1,773,000원",
                "historicalHitRate": 0.1359,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,790,430원",
                "historicalHitRate": 0.0736,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,548,480원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "1,548,480원"
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
              "fallbackStopPrice": 1548480,
              "effectiveHardStopPrice": 1548480,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 1,548,480원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 1,548,480원만 유지합니다."
            },
            "rr": "1 : 2.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1588805,
              "high": 1604935,
              "anchor": 1613000,
              "label": "1,588,805~1,604,935원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1619000,
                "secondaryResistancePrice": 1773000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,629,130원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,653,325원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,701,715원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,742,040원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,790,430원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,548,480원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "1,548,480원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1619000,
                "secondaryResistancePrice": 1773000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "1,619,000원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,653,325원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,701,715원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,742,040원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,790,430원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,548,480원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "1,548,480원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
                "nearestResistancePrice": 1619000,
                "secondaryResistancePrice": 1773000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "1,619,000원",
                    "historicalHitRate": 0.6655,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+9.9%",
                    "targetPrice": "1,773,000원",
                    "historicalHitRate": 0.3589,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+9.9%",
                    "targetPrice": "1,773,000원",
                    "historicalHitRate": 0.2334,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+9.9%",
                    "targetPrice": "1,773,000원",
                    "historicalHitRate": 0.1359,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,790,430원",
                    "historicalHitRate": 0.0736,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,548,480원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "1,548,480원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 287건)",
                  "hitRate": 0.6655,
                  "ev": 0.291,
                  "sampleCount": 287
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 136건)",
              "sampleCount": 136,
              "ev": -1.7119
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 287건)",
              "hitRate": 0.6655,
              "ev": 0.291,
              "sampleCount": 287
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
              "매매금지(핵심 Gate 미충족: G1)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 1,613,000 / 60MA 1,968,833",
            "statusReason": "G1 미충족: 종가 1,613,000 / 60MA 1,968,833",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1613000.0,
                "vs52wHighPct": 53.73084610259827,
                "vs52wLowPct": 528.8499025341131,
                "dropFrom52wHighPct": 46.26915389740173,
                "ma20GapPct": 0.32654330586222985,
                "rsi14": 46.222364510626655,
                "volumeRatio20d": 60.14482440526262,
                "rs20Pct": 2.28281547241598,
                "tradingValueRank": 1.0,
                "marketCapRank": 2.0,
                "marketCapTrillion": 1178.2842,
                "per": 7.19,
                "pbr": 4.35,
                "cnsPer": 4.62,
                "foreignRate": 50.57,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": 111.57902294602849
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
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
            "strictScore": 5.7,
            "signalScore": 5.7,
            "score": 5.7,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 4.1,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -41,886주 / 기관 -51,877주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -41,886 / 전일 +8,212 · 기관 당일 -51,877 / 전일 +51,006 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 262.8% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 106.0% / 마지막 1시간 262.8% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
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
                "note": "종가 / 20MA 102.9% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,421,200 / 20MA 1,372,500 · 5MA > 20MA"
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
                "note": "당일 등락 -1.26% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -2.04% / KOSPI -3.78% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.37:1 · 평균 체결강도 262.8% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +13.7% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 +8,212/당일 -41,886 · 기관 전일 +51,006/당일 -51,877 · 2일 연속 수급 유입 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 1,412,000 / 60MA 1,560,617",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 58.4% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 10",
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
                "note": "외인 보유율 37.8% (≥25%) · 20일 수익률 +19.2% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,577 / 5MA 6,787 (-3.1%) · VKOSPI 43.3 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 262.8% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 106.0% / 마지막 1시간 262.8% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,421,200 / 20MA 1,372,500 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 53% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.26% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -2.04% / KOSPI -3.78% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.37:1 · 평균 체결강도 262.8% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -41,886주 / 기관 -51,877주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -41,886 / 전일 +8,212 · 기관 당일 -51,877 / 전일 +51,006 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "S5",
                "note": "최근 5일 매집 추세 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 102.9% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +13.7% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1412000,
            "previousClose": 1430000,
            "dailyChange": -18000,
            "dailyChangePct": -1.26,
            "dailyDirection": "down",
            "entryPriceText": "1,412,000원 (당일 종가 기준)",
            "entryPrice": 1412000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 105.4675,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2552,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -41,886주 / 기관 -51,877주 / 마지막 1시간 262.8% · 장후반 매수세 강화 · 마지막 30분 틱 2.37:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 106.0,
              "note": "토스 공개 체결강도 106.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-09-02T06:03:01Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 262.8,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 262.8,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.3721,
              "last30BuyVolume": 306.0,
              "last30SellVolume": 129.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 43.28, ATR10 6.03%, 일간 표준편차 5.71%, 당일 레인지 4.83%.",
              "metrics": {
                "atrPct10": 6.03,
                "returnStd20": 5.71,
                "todayRangePct": 4.83,
                "vkospi": 43.28
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
                    "date": "20260901",
                    "net": -41886.0
                  },
                  {
                    "date": "20260831",
                    "net": 8212.0
                  },
                  {
                    "date": "20260828",
                    "net": 129656.0
                  },
                  {
                    "date": "20260827",
                    "net": 111235.0
                  },
                  {
                    "date": "20260826",
                    "net": 8320.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260901",
                    "net": -51877.0
                  },
                  {
                    "date": "20260831",
                    "net": 51006.0
                  },
                  {
                    "date": "20260828",
                    "net": 67280.0
                  },
                  {
                    "date": "20260827",
                    "net": 79249.0
                  },
                  {
                    "date": "20260826",
                    "net": -27989.0
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
                "targetYield": "+0.6%",
                "targetPrice": "1,421,000원",
                "historicalHitRate": 0.6429,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+9.6%",
                "targetPrice": "1,548,000원",
                "historicalHitRate": 0.2381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+9.6%",
                "targetPrice": "1,548,000원",
                "historicalHitRate": 0.2143,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+9.6%",
                "targetPrice": "1,548,000원",
                "historicalHitRate": 0.0952,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "1,567,320원",
                "historicalHitRate": 0.0952,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,362,580원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "1,362,580원"
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
              "fallbackStopPrice": 1362580,
              "effectiveHardStopPrice": 1362580,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "수급 주체가 고정되지 않아 장초반 수급 이탈 즉시 손절은 비활성입니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 1,362,580원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-C 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 1,362,580원만 유지합니다."
            },
            "rr": "1 : 2.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1394350,
              "high": 1408470,
              "anchor": 1412000,
              "label": "1,394,350~1,408,470원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1421000,
                "secondaryResistancePrice": 1548000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,433,180원",
                    "historicalHitRate": 0.6429,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,454,360원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,489,660원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,524,960원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,567,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,362,580원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,362,580원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 42건)",
                  "hitRate": 0.6429,
                  "ev": 0.114,
                  "sampleCount": 42
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1421000,
                "secondaryResistancePrice": 1548000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.6%",
                    "targetPrice": "1,421,000원",
                    "historicalHitRate": 0.6429,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,454,360원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "1,489,660원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "1,524,960원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,567,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,362,580원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,362,580원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 42건)",
                  "hitRate": 0.6429,
                  "ev": 0.114,
                  "sampleCount": 42
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 38건)",
                "nearestResistancePrice": 1421000,
                "secondaryResistancePrice": 1548000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.6%",
                    "targetPrice": "1,421,000원",
                    "historicalHitRate": 0.6429,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+9.6%",
                    "targetPrice": "1,548,000원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+9.6%",
                    "targetPrice": "1,548,000원",
                    "historicalHitRate": 0.2143,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+9.6%",
                    "targetPrice": "1,548,000원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "1,567,320원",
                    "historicalHitRate": 0.0952,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,362,580원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,362,580원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 42건)",
                  "hitRate": 0.6429,
                  "ev": 0.114,
                  "sampleCount": 42
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 38건)",
              "sampleCount": 38,
              "ev": -2.0997
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 42건)",
              "hitRate": 0.6429,
              "ev": 0.114,
              "sampleCount": 42
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
              "매매금지(핵심 Gate 미충족: G1)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 1,412,000 / 60MA 1,560,617",
            "statusReason": "G1 미충족: 종가 1,412,000 / 60MA 1,560,617",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1412000.0,
                "vs52wHighPct": 58.41952834091849,
                "vs52wLowPct": 731.0771041789287,
                "dropFrom52wHighPct": 41.58047165908151,
                "ma20GapPct": 2.877959927140255,
                "rsi14": 51.679984031115836,
                "volumeRatio20d": 46.612716931955504,
                "rs20Pct": 19.156118143459917,
                "tradingValueRank": 10.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 105.4675,
                "per": 108.75,
                "pbr": 10.43,
                "cnsPer": 71.13,
                "foreignRate": 37.8,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 13.703650474274218
              },
              "evaluatedAt": "2026-09-02T15:07:46+09:00",
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
            "name": "레메디",
            "code": "387690",
            "strictScore": 7.4,
            "signalScore": 7.4,
            "score": 7.4,
            "scoreMax": 10.0,
            "effectiveScoreMax": 8.0,
            "gradeScore": 9.2,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -64,223→22,653 / 기관 -2,697→-62 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 84.3% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 16,780 / 20MA 12,098 (138.7% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 362% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.35 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 16780, 전봉 종가 16810 미달"
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
                "note": "당일 거래대금 순위 38위 (필요 ≤ 100위)",
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
                "status": "✅",
                "note": "KIND 최근공시 2026-08-20까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-08-23~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +109.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -6.8% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⚠️",
                "note": "60일 이동평균 산출 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.5% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "⛔",
                "note": "20MA 이격 +38.7% (≤+22%) · RSI14 59 (≤72) · 20MA 과이격(반등 소진)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -64,223→22,653 / 기관 -2,697→-62 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 16,780 / 20MA 12,098 (138.7% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 62% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 362% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.35 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 84.3% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 16780, 전봉 종가 16810 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 16780,
            "previousClose": 14490,
            "dailyChange": 2290,
            "dailyChangePct": 15.8,
            "dailyDirection": "up",
            "entryPriceText": "16,780원 (당일 종가 기준)",
            "entryPrice": 16780,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.128,
            "marketCapRank": 1129,
            "marketCapUniverseCount": 2551,
            "keyPoint": "20일 고점 대비 -6.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영"
            ],
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A387690/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 레메디 (387690) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다."
                  ]
                }
              ],
              "missingFieldCodes": [
                "toss.lastHourAvgStrength"
              ],
              "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다.",
              "source": "browser_manual_override"
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
              "note": "직전 30분봉 종가 16780, 전봉 종가 16810",
              "latestOpen": 16780.0,
              "latestClose": 16780.0,
              "previousClose": 16810.0
            },
            "toss": {
              "avgStrength": 84.3,
              "note": "토스 공개 체결강도 84.3% / 최근 체결 132분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A387690/order",
              "asOf": "2026-09-02T08:30:22Z",
              "intradayAbove100Ratio": 56.2,
              "observedMinutes": 132,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 132분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 1.3539,
              "bidTotal": 8217,
              "askTotal": 6069,
              "note": "Naver 호가잔량합계 매수 8,217 / 매도 6,069",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=387690"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 43.37, ATR10 14.55%, 일간 표준편차 9.18%, 당일 레인지 22.22%.",
              "metrics": {
                "atrPct10": 14.55,
                "returnStd20": 9.18,
                "todayRangePct": 22.22,
                "vkospi": 43.37
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.4%",
                "targetPrice": "17,183원",
                "historicalHitRate": 0.6129,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+3.6%",
                "targetPrice": "17,390원",
                "historicalHitRate": 0.4897,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 16,310원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.8%",
                "targetPrice": "16,310원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 14780,
              "fallbackStopPrice": 16310,
              "effectiveHardStopPrice": 16310,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 14,780원와 기존 % 손절 16,310원 중 더 높은 16,310원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 14,780원이며, 기존 % 손절 16,310원보다 느슨해지지 않게 16,310원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 16528,
              "high": 16696,
              "anchor": 16780,
              "label": "16,528~16,696원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 18000,
                "retrace33Price": 17183,
                "retrace50Price": 17390,
                "nearestResistancePrice": 18000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "17,183원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.6%",
                    "targetPrice": "17,390원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+7.3%",
                    "targetPrice": "18,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 16,310원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.8%",
                    "targetPrice": "16,310원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 18000,
                "retrace33Price": 17183,
                "retrace50Price": 17390,
                "nearestResistancePrice": 18000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "17,183원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.6%",
                    "targetPrice": "17,390원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 16,310원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.8%",
                    "targetPrice": "16,310원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 203건)",
                "recentHighPrice": 18000,
                "retrace33Price": 17183,
                "retrace50Price": 17390,
                "nearestResistancePrice": 18000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "17,183원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.6%",
                    "targetPrice": "17,390원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 16,310원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.8%",
                    "targetPrice": "16,310원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 203건)",
              "sampleCount": 203,
              "ev": 0.0204
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 341건)",
              "hitRate": 0.6129,
              "ev": 1.061,
              "sampleCount": 341
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
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.1조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 0.1조 (필요 ≥ 5조) / Q1 미충족: 20MA 이격 +38.7% (≤+22%) · RSI14 59 (≤72) · 20MA 과이격(반등 소진)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 16780.0,
                "vs52wHighPct": 48.42712842712843,
                "vs52wLowPct": 140.40114613180518,
                "dropFrom52wHighPct": 51.57287157287157,
                "ma20GapPct": 38.69487953052031,
                "rsi14": 58.67299105369912,
                "volumeRatio20d": 347.09638722624874,
                "rs20Pct": 97.41176470588235,
                "tradingValueRank": 38.0,
                "marketCapRank": 1129.0,
                "marketCapTrillion": 0.128,
                "per": 21.6,
                "pbr": 6.82,
                "cnsPer": 0.0,
                "foreignRate": 1.31,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "SK하이닉스",
            "code": "000660",
            "strictScore": 5.1,
            "signalScore": 5.1,
            "score": 5.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
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
                "note": "외인 -211,935→91,835 / 기관 -314,294→-142,669 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 85.0% / 마지막 1시간 119.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,613,000 / 20MA 1,607,750 (100.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 2% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 4.35 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1613000, 전봉 종가 1618000 미달"
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
                "note": "시총 1178.3조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-08-21까지 위험 공시 없음",
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
                "status": "⛔",
                "note": "1개월 수익률 +2.9% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -10.0% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 1,613,000 / 60MA 1,968,833",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.7% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "양봉·긴아래꼬리·도지 패턴 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +0.3% (≤+22%) · RSI14 46 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -211,935→91,835 / 기관 -314,294→-142,669 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,613,000 / 20MA 1,607,750 (100.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 4.35 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 85.0% / 마지막 1시간 119.2% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 2% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1613000, 전봉 종가 1618000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1613000,
            "previousClose": 1693000,
            "dailyChange": -80000,
            "dailyChangePct": -4.73,
            "dailyDirection": "down",
            "entryPriceText": "1,613,000원 (당일 종가 기준)",
            "entryPrice": 1613000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1178.2842,
            "marketCapRank": 2,
            "marketCapUniverseCount": 2551,
            "keyPoint": "20일 고점 대비 -10.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-08-21까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1613000, 전봉 종가 1618000",
              "latestOpen": 1613000.0,
              "latestClose": 1613000.0,
              "previousClose": 1618000.0
            },
            "toss": {
              "avgStrength": 85.0,
              "note": "토스 공개 체결강도 85.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-09-02T08:33:11Z",
              "intradayAbove100Ratio": 38.5,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 119.2,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 128.6,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.6897,
              "last30BuyVolume": 98.0,
              "last30SellVolume": 58.0
            },
            "orderbook": {
              "bidAskRatio": 4.347,
              "bidTotal": 119802,
              "askTotal": 27560,
              "note": "Naver 호가잔량합계 매수 119,802 / 매도 27,560",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 43.37, ATR10 6.33%, 일간 표준편차 5.32%, 당일 레인지 2.89%.",
              "metrics": {
                "atrPct10": 6.33,
                "returnStd20": 5.32,
                "todayRangePct": 2.89,
                "vkospi": 43.37
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "55% 익절",
                "targetYield": "+1.3%",
                "targetPrice": "1,634,000원",
                "historicalHitRate": 0.6129,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+3.0%",
                "targetPrice": "1,661,000원",
                "historicalHitRate": 0.4897,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,612,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.1%",
                "targetPrice": "1,612,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1612000,
              "fallbackStopPrice": 1567836,
              "effectiveHardStopPrice": 1612000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,612,000원와 기존 % 손절 1,567,836원 중 더 높은 1,612,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,612,000원이며, 기존 % 손절 1,567,836원보다 느슨해지지 않게 1,612,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 20.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1588805,
              "high": 1604935,
              "anchor": 1613000,
              "label": "1,588,805~1,604,935원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1792000,
                "retrace33Price": 1672070,
                "retrace50Price": 1702500,
                "nearestResistancePrice": 1634000,
                "secondaryResistancePrice": 1661000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "1,634,000원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,661,000원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+11.1%",
                    "targetPrice": "1,792,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,612,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "1,612,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1792000,
                "retrace33Price": 1672070,
                "retrace50Price": 1702500,
                "nearestResistancePrice": 1634000,
                "secondaryResistancePrice": 1661000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "1,634,000원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,661,000원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,612,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "1,612,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 203건)",
                "recentHighPrice": 1792000,
                "retrace33Price": 1672070,
                "retrace50Price": 1702500,
                "nearestResistancePrice": 1634000,
                "secondaryResistancePrice": 1661000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "1,634,000원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,661,000원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,612,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "1,612,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 203건)",
              "sampleCount": 203,
              "ev": 0.0204
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 341건)",
              "hitRate": 0.6129,
              "ev": 1.061,
              "sampleCount": 341
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
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G3",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-09-01) · 재진입 차단 · 외 3건",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-09-01) · 재진입 차단 / G1 미충족: 1개월 수익률 +2.9% (필요 ≥ +15%) / G3 미충족: 종가 1,613,000 / 60MA 1,968,833 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1613000.0,
                "vs52wHighPct": 53.73084610259827,
                "vs52wLowPct": 528.8499025341131,
                "dropFrom52wHighPct": 46.26915389740173,
                "ma20GapPct": 0.32654330586222985,
                "rsi14": 46.222364510626655,
                "volumeRatio20d": 60.14482440526262,
                "rs20Pct": 2.28281547241598,
                "tradingValueRank": 1.0,
                "marketCapRank": 2.0,
                "marketCapTrillion": 1178.2842,
                "per": 7.19,
                "pbr": 4.35,
                "cnsPer": 4.62,
                "foreignRate": 50.57,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": 111.57902294602849
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 5.1,
            "signalScore": 5.1,
            "score": 5.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 5.1,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 8,212→-41,886 / 기관 51,006→-51,877 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 99.0% / 마지막 1시간 162.6% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,400,000 / 20MA 1,371,900 (102.0% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 45% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 61% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 3.17 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1400000, 전봉 종가 1415000 미달"
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
                "note": "당일 거래대금 순위 9위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 104.6조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-09-01까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-08-23~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +18.5% (필요 ≥ +15%)",
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
                "status": "⛔",
                "note": "종가 1,400,000 / 60MA 1,560,417",
                "evalStatus": "not_met"
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
                "note": "20MA 이격 +2.0% (≤+22%) · RSI14 51 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 99.0% / 마지막 1시간 162.6% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,400,000 / 20MA 1,371,900 (102.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 3.17 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 8,212→-41,886 / 기관 51,006→-51,877 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 45% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 61% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1400000, 전봉 종가 1415000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1400000,
            "previousClose": 1430000,
            "dailyChange": -30000,
            "dailyChangePct": -2.1,
            "dailyDirection": "down",
            "entryPriceText": "1,400,000원 (당일 종가 기준)",
            "entryPrice": 1400000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 104.5712,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2551,
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
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-09-01까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1400000, 전봉 종가 1415000",
              "latestOpen": 1400000.0,
              "latestClose": 1400000.0,
              "previousClose": 1415000.0
            },
            "toss": {
              "avgStrength": 99.0,
              "note": "토스 공개 체결강도 99.0% / 최근 체결 31분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-09-02T08:33:10Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 31,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 31분 프록시",
              "lastHourAvgStrength": 162.6,
              "lastHourObservedMinutes": 31,
              "last30AvgStrength": 200.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.25,
              "last30BuyVolume": 2.0,
              "last30SellVolume": 8.0
            },
            "orderbook": {
              "bidAskRatio": 3.1691,
              "bidTotal": 9371,
              "askTotal": 2957,
              "note": "Naver 호가잔량합계 매수 9,371 / 매도 2,957",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=009150"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 43.37, ATR10 6.03%, 일간 표준편차 5.73%, 당일 레인지 4.83%.",
              "metrics": {
                "atrPct10": 6.03,
                "returnStd20": 5.73,
                "todayRangePct": 4.83,
                "vkospi": 43.37
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "55% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "1,421,000원",
                "historicalHitRate": 0.6129,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+4.3%",
                "targetPrice": "1,460,000원",
                "historicalHitRate": 0.4897,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,369,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.2%",
                "targetPrice": "1,369,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1369000,
              "fallbackStopPrice": 1360800,
              "effectiveHardStopPrice": 1369000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,369,000원와 기존 % 손절 1,360,800원 중 더 높은 1,369,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,369,000원이며, 기존 % 손절 1,360,800원보다 느슨해지지 않게 1,369,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1379000,
              "high": 1393000,
              "anchor": 1400000,
              "label": "1,379,000~1,393,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1600000,
                "retrace33Price": 1466000,
                "retrace50Price": 1500000,
                "nearestResistancePrice": 1421000,
                "secondaryResistancePrice": 1460000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,421,000원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.3%",
                    "targetPrice": "1,460,000원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+14.3%",
                    "targetPrice": "1,600,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,369,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.2%",
                    "targetPrice": "1,369,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1600000,
                "retrace33Price": 1466000,
                "retrace50Price": 1500000,
                "nearestResistancePrice": 1421000,
                "secondaryResistancePrice": 1460000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,421,000원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.3%",
                    "targetPrice": "1,460,000원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,369,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.2%",
                    "targetPrice": "1,369,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 203건)",
                "recentHighPrice": 1600000,
                "retrace33Price": 1466000,
                "retrace50Price": 1500000,
                "nearestResistancePrice": 1421000,
                "secondaryResistancePrice": 1460000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,421,000원",
                    "historicalHitRate": 0.6129,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.3%",
                    "targetPrice": "1,460,000원",
                    "historicalHitRate": 0.4897,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,369,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.2%",
                    "targetPrice": "1,369,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 341건)",
                  "hitRate": 0.6129,
                  "ev": 1.061,
                  "sampleCount": 341
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 203건)",
              "sampleCount": 203,
              "ev": 0.0204
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 341건)",
              "hitRate": 0.6129,
              "ev": 1.061,
              "sampleCount": 341
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
              "핵심 Gate 미충족: G3",
              "핵심 Gate 미충족: G4",
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G3 미충족: 종가 1,400,000 / 60MA 1,560,417 · 외 1건",
            "statusReason": "G3 미충족: 종가 1,400,000 / 60MA 1,560,417 / G4 미충족: 최근 5거래일 최저 -2.1% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1400000.0,
                "vs52wHighPct": 57.92304509722796,
                "vs52wLowPct": 724.0141259564449,
                "dropFrom52wHighPct": 42.07695490277203,
                "ma20GapPct": 2.0482542459362927,
                "rsi14": 50.9653807960336,
                "volumeRatio20d": 53.686721985428186,
                "rs20Pct": 18.143459915611814,
                "tradingValueRank": 9.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 104.5712,
                "per": 107.83,
                "pbr": 10.34,
                "cnsPer": 70.52,
                "foreignRate": 37.8,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 13.703650474274218
              },
              "evaluatedAt": "2026-09-02T17:34:15+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "금호건설",
            "code": "002990",
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
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -442,775→-30,629 / 기관 -24,809→1,908 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 94.1% / 마지막 1시간 176.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 17,280 / 20MA 13,876 (124.5% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 49% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 134% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.37 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 17110, 전봉 종가 17050 충족"
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
                "note": "당일 거래대금 순위 18위 (필요 ≤ 100위)",
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
                "status": "⚠️",
                "note": "실적/배당/분할 일정 수동 확인 필요",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-08-23~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +92.4% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -8.3% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 17,280 / 60MA 10,582",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -3.4% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "⛔",
                "note": "20MA 이격 +24.5% (≤+22%) · RSI14 65 (≤72) · 20MA 과이격(반등 소진)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -442,775→-30,629 / 기관 -24,809→1,908 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 94.1% / 마지막 1시간 176.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 17,280 / 20MA 13,876 (124.5% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 17110, 전봉 종가 17050 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 49% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 134% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.37 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 17280,
            "previousClose": 16500,
            "dailyChange": 780,
            "dailyChangePct": 4.73,
            "dailyDirection": "up",
            "entryPriceText": "17,280원 (당일 종가 기준)",
            "entryPrice": 17280,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.6439,
            "marketCapRank": 401,
            "marketCapUniverseCount": 2552,
            "keyPoint": "20일 고점 대비 -8.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 금호건설 (002990) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 17110, 전봉 종가 17050",
              "latestOpen": 17040.0,
              "latestClose": 17110.0,
              "previousClose": 17050.0
            },
            "toss": {
              "avgStrength": 94.1,
              "note": "토스 공개 체결강도 94.1% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A002990/order",
              "asOf": "2026-09-02T06:03:02Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 176.1,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 176.1,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.5245,
              "last30BuyVolume": 4279.0,
              "last30SellVolume": 8159.0
            },
            "orderbook": {
              "bidAskRatio": 0.3718,
              "bidTotal": 9731,
              "askTotal": 26171,
              "note": "Naver 호가잔량합계 매수 9,731 / 매도 26,171",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=002990"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 43.28, ATR10 15.30%, 일간 표준편차 11.49%, 당일 레인지 18.42%.",
              "metrics": {
                "atrPct10": 15.3,
                "returnStd20": 11.49,
                "todayRangePct": 18.42,
                "vkospi": 43.28
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "55% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "17,795원",
                "historicalHitRate": 0.4444,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+4.4%",
                "targetPrice": "18,040원",
                "historicalHitRate": 0.3333,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 16,883원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "16,883원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 15800,
              "fallbackStopPrice": 16883,
              "effectiveHardStopPrice": 16883,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 15,800원와 기존 % 손절 16,883원 중 더 높은 16,883원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 15,800원이며, 기존 % 손절 16,883원보다 느슨해지지 않게 16,883원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 17064,
              "high": 17237,
              "anchor": 17280,
              "label": "17,064~17,237원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 18840,
                "retrace33Price": 17795,
                "retrace50Price": 18060,
                "nearestResistancePrice": 17500,
                "secondaryResistancePrice": 18040,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "17,795원",
                    "historicalHitRate": 0.4444,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.4%",
                    "targetPrice": "18,040원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+9.0%",
                    "targetPrice": "18,840원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 16,883원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "16,883원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 36건)",
                  "hitRate": 0.3333,
                  "ev": 0.193,
                  "sampleCount": 36
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 18840,
                "retrace33Price": 17795,
                "retrace50Price": 18060,
                "nearestResistancePrice": 17500,
                "secondaryResistancePrice": 18040,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "17,795원",
                    "historicalHitRate": 0.4444,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.4%",
                    "targetPrice": "18,040원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 16,883원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "16,883원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 36건)",
                  "hitRate": 0.3333,
                  "ev": 0.193,
                  "sampleCount": 36
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
                "recentHighPrice": 18840,
                "retrace33Price": 17795,
                "retrace50Price": 18060,
                "nearestResistancePrice": 17500,
                "secondaryResistancePrice": 18040,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "17,795원",
                    "historicalHitRate": 0.4444,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.4%",
                    "targetPrice": "18,040원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 16,883원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "16,883원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 36건)",
                  "hitRate": 0.3333,
                  "ev": 0.193,
                  "sampleCount": 36
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
              "sampleCount": 33,
              "ev": -0.6217
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 36건)",
              "hitRate": 0.3333,
              "ev": 0.193,
              "sampleCount": 36
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
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.6조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 0.6조 (필요 ≥ 5조) / Q1 미충족: 20MA 이격 +24.5% (≤+22%) · RSI14 65 (≤72) · 20MA 과이격(반등 소진)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 17280.0,
                "vs52wHighPct": 89.1640866873065,
                "vs52wLowPct": 440.00000000000006,
                "dropFrom52wHighPct": 10.8359133126935,
                "ma20GapPct": 24.531565292591527,
                "rsi14": 65.13085557765879,
                "volumeRatio20d": 153.1478662345314,
                "rs20Pct": 79.81269510926118,
                "tradingValueRank": 18.0,
                "marketCapRank": 401.0,
                "marketCapTrillion": 0.6439,
                "per": 8.33,
                "pbr": 2.24,
                "cnsPer": 0.0,
                "foreignRate": 0.0,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-09-02T15:07:46+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 5,
            "name": "JW신약",
            "code": "067290",
            "strictScore": 6.0,
            "signalScore": 6.0,
            "score": 6.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.0,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -43,993→1,539,395 / 기관 16,664→-16,739 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 80.8% / 마지막 1시간 250.6% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 3,090 / 20MA 2,237 (138.1% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 340% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.78 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 3005, 전봉 종가 3025 미달"
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
                "note": "당일 거래대금 순위 28위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 0.2조 (필요 ≥ 5조)",
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
                "note": "최근 5거래일(2026-08-23~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +59.6% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.0% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 3,090 / 60MA 1,993",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -0.2% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "양봉·긴아래꼬리·도지 패턴 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "20MA 이격 +38.1% (≤+22%) · RSI14 74 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -43,993→1,539,395 / 기관 16,664→-16,739 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 3,090 / 20MA 2,237 (138.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 340% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.78 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 80.8% / 마지막 1시간 250.6% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 21% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 3005, 전봉 종가 3025 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 3090,
            "previousClose": 2990,
            "dailyChange": 100,
            "dailyChangePct": 3.34,
            "dailyDirection": "up",
            "entryPriceText": "3,090원 (당일 종가 기준)",
            "entryPrice": 3090,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.1732,
            "marketCapRank": 950,
            "marketCapUniverseCount": 2552,
            "keyPoint": "20일 고점 대비 -11.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 JW신약 (067290) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 3005, 전봉 종가 3025",
              "latestOpen": 3025.0,
              "latestClose": 3005.0,
              "previousClose": 3025.0
            },
            "toss": {
              "avgStrength": 80.8,
              "note": "토스 공개 체결강도 80.8% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A067290/order",
              "asOf": "2026-09-02T06:03:05Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 250.6,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 250.6,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 4.8131,
              "last30BuyVolume": 70858.0,
              "last30SellVolume": 14722.0
            },
            "orderbook": {
              "bidAskRatio": 1.7775,
              "bidTotal": 244030,
              "askTotal": 137286,
              "note": "Naver 호가잔량합계 매수 244,030 / 매도 137,286",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=067290"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 43.28, ATR10 11.21%, 일간 표준편차 8.62%, 당일 레인지 16.05%.",
              "metrics": {
                "atrPct10": 11.21,
                "returnStd20": 8.62,
                "todayRangePct": 16.05,
                "vkospi": 43.28
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
                "targetPrice": "3,183원",
                "historicalHitRate": 0.4444,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "3,244원",
                "historicalHitRate": 0.3333,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 3,019원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.3%",
                "targetPrice": "3,019원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 2990,
              "fallbackStopPrice": 3019,
              "effectiveHardStopPrice": 3019,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 2,990원와 기존 % 손절 3,019원 중 더 높은 3,019원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 2,990원이며, 기존 % 손절 3,019원보다 느슨해지지 않게 3,019원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 3051,
              "high": 3082,
              "anchor": 3090,
              "label": "3,051~3,082원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 3470,
                "retrace33Price": 3215,
                "retrace50Price": 3280,
                "nearestResistancePrice": 3470,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "3,215원",
                    "historicalHitRate": 0.4444,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+6.1%",
                    "targetPrice": "3,280원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+12.3%",
                    "targetPrice": "3,470원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 3,019원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "3,019원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 36건)",
                  "hitRate": 0.3333,
                  "ev": 0.193,
                  "sampleCount": 36
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 3470,
                "retrace33Price": 3215,
                "retrace50Price": 3280,
                "nearestResistancePrice": 3470,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "3,215원",
                    "historicalHitRate": 0.4444,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+6.1%",
                    "targetPrice": "3,280원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 3,019원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "3,019원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 36건)",
                  "hitRate": 0.3333,
                  "ev": 0.193,
                  "sampleCount": 36
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
                "recentHighPrice": 3470,
                "retrace33Price": 3215,
                "retrace50Price": 3280,
                "nearestResistancePrice": 3470,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "3,183원",
                    "historicalHitRate": 0.4444,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "3,244원",
                    "historicalHitRate": 0.3333,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 3,019원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.3%",
                    "targetPrice": "3,019원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 36건)",
                  "hitRate": 0.3333,
                  "ev": 0.193,
                  "sampleCount": 36
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
              "sampleCount": 33,
              "ev": -0.6217
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 36건)",
              "hitRate": 0.3333,
              "ev": 0.193,
              "sampleCount": 36
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
              "핵심 Gate 미충족: G4",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.2조 (필요 ≥ 5조) · 외 3건",
            "statusReason": "F2 미충족: 시총 0.2조 (필요 ≥ 5조) / G4 미충족: 최근 5거래일 최저 -0.2% (필요 -3% 이하 급락 1회 이상) / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 3090.0,
                "vs52wHighPct": 89.17748917748918,
                "vs52wLowPct": 147.99357945425362,
                "dropFrom52wHighPct": 10.822510822510822,
                "ma20GapPct": 38.119077418201336,
                "rsi14": 74.14660961419335,
                "volumeRatio20d": 512.3269070690552,
                "rs20Pct": 59.3604951005673,
                "tradingValueRank": 28.0,
                "marketCapRank": 950.0,
                "marketCapTrillion": 0.1732,
                "per": 16.89,
                "pbr": 4.24,
                "cnsPer": 0.0,
                "foreignRate": 4.08,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-09-02T15:07:46+09:00",
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
  "analysisDate": "2026-09-02",
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
      "000660",
      "009150",
      "096770",
      "402340"
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
          "strictScore": 9.5,
          "signalScore": 9.5,
          "score": 9.5,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 7.3,
          "grade": "A"
        },
        "after": {
          "strictScore": 10.8,
          "signalScore": 10.8,
          "score": 10.8,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 8.3,
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
          "strictScore": 9.9,
          "signalScore": 9.9,
          "score": 9.9,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.1,
          "grade": "A"
        },
        "after": {
          "strictScore": 10.7,
          "signalScore": 10.7,
          "score": 10.7,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 7.6,
          "grade": "A"
        }
      },
      {
        "strategy": "accumulation",
        "code": "402340",
        "name": "SK스퀘어",
        "changedFields": [
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 6.6,
          "signalScore": 6.6,
          "score": 6.6,
          "scoreMax": 14.0,
          "effectiveScoreMax": 13.5,
          "gradeScore": 5.5,
          "grade": "B"
        },
        "after": {
          "strictScore": 6.6,
          "signalScore": 6.6,
          "score": 6.6,
          "scoreMax": 14.0,
          "effectiveScoreMax": 13.5,
          "gradeScore": 4.9,
          "grade": "C"
        }
      },
      {
        "strategy": "accumulation",
        "code": "009150",
        "name": "삼성전기",
        "changedFields": [
          "effectiveScoreMax",
          "gradeScore"
        ],
        "before": {
          "strictScore": 5.7,
          "signalScore": 5.7,
          "score": 5.7,
          "scoreMax": 14.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 4.4,
          "grade": "C"
        },
        "after": {
          "strictScore": 5.7,
          "signalScore": 5.7,
          "score": 5.7,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 4.1,
          "grade": "C"
        }
      },
      {
        "strategy": "breakout",
        "code": "402340",
        "name": "SK스퀘어",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 3.6,
          "signalScore": 3.6,
          "score": 3.6,
          "scoreMax": 12.5,
          "effectiveScoreMax": 10.5,
          "gradeScore": 3.4,
          "grade": "C"
        },
        "after": {
          "strictScore": 4.5,
          "signalScore": 4.5,
          "score": 4.5,
          "scoreMax": 12.5,
          "effectiveScoreMax": 10.5,
          "gradeScore": 4.3,
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
