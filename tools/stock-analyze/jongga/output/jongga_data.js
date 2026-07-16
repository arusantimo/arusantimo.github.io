window.JONGGA_DATA = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-07-16T08:35:19+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [],
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 21,
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
        "ok": 21
      },
      "naver_chart": {
        "ok": 21
      },
      "naver_integration_schedule": {
        "ok": 11
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
        "ok": 18
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
        "durationMs": 1253.5,
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
        "durationMs": 1918.6,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 215.2,
        "detail": "박스권 ⚠️ (거시 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 66109.5,
        "count": 21
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 1136.2,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 17209.9,
        "detail": "후보 18종목 중 18건 수집",
        "count": 18
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 8891.7,
        "detail": "성공 21 / 실패 0",
        "count": 21
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 9510.6,
        "detail": "direct-http · 체결강도 21 / 호가 21 / 틱프록시 21",
        "count": 21
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 55515.5,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 16793.0,
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
        "durationMs": 46403.0,
        "detail": "확정 0 · 미확인 0",
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
            "value": "6820.60 (-6.37%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 87.14"
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
            "value": "7743.16",
            "verdict": "❌"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7929.27",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 87.14",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 9 / 하락 11",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 73 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
            "verdict": "박스권 ⚠️ (거시 완충)"
          },
          {
            "item": "거시 맥락",
            "value": "Stage 3.5: 실적 정당화형 구조적 확장기 (Secular Expansion) / RI 0.0",
            "verdict": "✅"
          }
        ],
        "alert": "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다. 적용 레짐은 market-analyze·KOSPI 보조 신호로 조정되었습니다.",
        "macroOverlay": {
          "loaded": true,
          "dateAligned": true,
          "marketAnalyzeDate": "20260716",
          "technicalRegimeLabel": "약세장 ⛔",
          "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
          "regimeAdjustmentReason": "펀더 앵커 73 · 버블 critical off · 펀더·버블 정당 → 박스권 완화",
          "riseJustified": true,
          "kospiBullTier": "weak",
          "marketRegimeLabel": "Stage 3.5: 실적 정당화형 구조적 확장기 (Secular Expansion)",
          "marketRegimeKey": "secular-expansion",
          "fundamentalAnchorScore": 73.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.48,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "실적 정당화형 과열 (Gear Second)",
          "riskIndex": 0.0,
          "stageOverrideReason": "원/달러 1488원과 과열 이격이 겹쳐도 F_support 70점이 높아 구조적 확장기로 완화했습니다.",
          "kospiClose": 6820.6,
          "kospiMa5": 7048.942,
          "vkospiValue": 87.14,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": true
        },
        "technicalRegimeLabel": "약세장 ⛔",
        "effectiveRegimeLabel": "박스권 ⚠️ (거시 완충)",
        "regimeAdjustmentReason": "펀더 앵커 73 · 버블 critical off · 펀더·버블 정당 → 박스권 완화"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "+0.20%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.12",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+0.6bp",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-26.97원",
            "baseScore": "+2점",
            "weight": "×1.5",
            "formula": "+2 × 1.5 = +3.0점",
            "weightedScore": "+3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-1.40%",
            "baseScore": "-1점",
            "weight": "×1.0",
            "formula": "-1 × 1.0 = -1.0점",
            "weightedScore": "-1.0점"
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
          "nq": "2026-07-17T03:59:00+00:00",
          "vix": "2026-07-16T20:15:00+00:00",
          "tnx": "2026-07-16T19:00:00+00:00",
          "krw": "2026-07-16T22:59:00+00:00",
          "sox": "2026-07-17T00:00:00+00:00"
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
                "note": "외인 100,143주 / 기관 317,985주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 121,400 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 117,600 ≤ 종가 121,400)"
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
                "note": "52주 고가 대비 -26.9% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 346% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -6.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 부분 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G12, G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 283% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 111,280 > 20MA 100,725 > 60MA 115,695 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 121,400 / 60MA 115,695",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 56.9 (필요 ≥ 50)",
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
                "note": "KOSPI 6,821 / 5MA 7,049 (-3.2%) · VKOSPI 87.1 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +3.76% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 56.9 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +20.5% (필요 ≤ +25%) · 60MA +4.9% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -26.9% (≥12%) · 거래량 346% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 85점 · 현재가 아래 유효 family 3개",
                "evalStatus": "met"
              },
              {
                "code": "G10",
                "status": "✅",
                "note": "당일 거래량 / 앵커 거래량 217% · 시가 117,600 / 종가 121,400 / 전일 종가 117,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 121,400 / 앵커 중심값 100,200 / 복합 지지 116,706 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 2.98:1 / 마지막 30분 평균 66.7% / 마지막 1시간 68.8% · 장 막판 투매 경고",
                "evalStatus": "not_met"
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
                "note": "외인 100,143주 / 기관 317,985주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 121,400 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 117,600 ≤ 종가 121,400)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -26.9% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 346% (≥100% 만점·80~100% 부분) · 충족",
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
                "note": "대차잔고 -6.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 부분 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 121400,
            "previousClose": 117000,
            "dailyChange": 4400,
            "dailyChangePct": 3.76,
            "dailyDirection": "up",
            "entryPriceText": "121,400원 (당일 종가 기준)",
            "entryPrice": 121400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 20.523,
            "marketCapRank": 35,
            "marketCapUniverseCount": 2553,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 100,143주 / 기관 317,985주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 130.0,
              "note": "토스 공개 체결강도 130.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-07-16T08:33:05Z",
              "intradayAbove100Ratio": 20.0,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 68.8,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 66.7,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 2.9804,
              "last30BuyVolume": 152.0,
              "last30SellVolume": 51.0
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
                "summary": "주지지 116,706원 (3.87% 아래) · 강도 85점 · family 3개 · 급증봉 저점·수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 116706,
                    "distancePct": 3.87,
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
                    "count": 20,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 106234,
                    "distancePct": 12.49,
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
                    "price": 103968,
                    "distancePct": 14.36,
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
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 94866,
                    "distancePct": 21.86,
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
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 122640,
                    "distancePct": -1.02,
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
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 116706,
                  "distancePct": 3.87,
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
                  "count": 20,
                  "lastSeenDaysAgo": 0,
                  "strengthPoints": 85,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 85,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "급증봉 저점·수평 지지·매물대 지지 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 89450,
                    "distancePct": 26.32,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": 24.17,
                    "count": 5,
                    "lastSeenDaysAgo": 9,
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
                    "distancePct": 22.13,
                    "count": 7,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 18.86,
                    "count": 8,
                    "lastSeenDaysAgo": 4,
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
                    "distancePct": 17.38,
                    "count": 3,
                    "lastSeenDaysAgo": 18,
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
                    "distancePct": 14.47,
                    "count": 11,
                    "lastSeenDaysAgo": 2,
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
                    "distancePct": 12.63,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
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
                    "distancePct": 10.07,
                    "count": 4,
                    "lastSeenDaysAgo": 3,
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
                    "price": 112460,
                    "distancePct": 7.36,
                    "count": 5,
                    "lastSeenDaysAgo": 22,
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
                    "price": 115800,
                    "distancePct": 4.61,
                    "count": 11,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 114500,
                    "bandHigh": 117000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 118825,
                    "distancePct": 2.12,
                    "count": 3,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 117700,
                    "bandHigh": 119600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 122640,
                    "distancePct": -1.02,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
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
                    "price": 126367,
                    "distancePct": -4.09,
                    "count": 3,
                    "lastSeenDaysAgo": 43,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 125200,
                    "bandHigh": 127200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 129460,
                    "distancePct": -6.64,
                    "count": 9,
                    "lastSeenDaysAgo": 44,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 128400,
                    "bandHigh": 130900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 133520,
                    "distancePct": -9.98,
                    "count": 8,
                    "lastSeenDaysAgo": 46,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 131900,
                    "bandHigh": 135300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 145340,
                    "distancePct": -19.72,
                    "count": 3,
                    "lastSeenDaysAgo": 49,
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
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 145527,
                    "distancePct": -19.87,
                    "count": 3,
                    "lastSeenDaysAgo": 49,
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
                    "price": 117319,
                    "distancePct": 3.36,
                    "count": 8,
                    "lastSeenDaysAgo": 30,
                    "valid": true,
                    "weight": 25,
                    "volume": 4939224,
                    "binIndex": 10,
                    "binLow": 115908,
                    "binHigh": 118729
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 128602,
                    "distancePct": -5.93,
                    "count": 5,
                    "lastSeenDaysAgo": 42,
                    "valid": false,
                    "weight": 25,
                    "volume": 3721199,
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
                    "distancePct": 21.58,
                    "count": 1,
                    "lastSeenDaysAgo": 7,
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
                    "distancePct": 14.25,
                    "count": 1,
                    "lastSeenDaysAgo": 3,
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
                    "distancePct": 12.36,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 200.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 117000,
                    "distancePct": 3.62,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 346.3,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 283% (3일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 283.3,
                "latestBurstDaysAgo": 3
              },
              "anchor": {
                "date": "20260707",
                "open": 96600,
                "close": 103800,
                "high": 104200,
                "low": 95200,
                "bodyMid": 100200,
                "volume": 852970.0,
                "volumeRatio": 2.02,
                "daysAgo": 7
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 217% · 시가 117,600 / 종가 121,400 / 전일 종가 117,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 121,400 / 앵커 중심값 100,200 / 복합 지지 116,706 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 2.98:1 / 마지막 30분 평균 66.7% / 마지막 1시간 68.8% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 87.14, ATR10 8.00%, 일간 표준편차 5.24%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 8.0,
                "returnStd20": 5.24,
                "todayRangePct": 8.25,
                "vkospi": 87.14
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
              "anchorDate": "20260707",
              "anchorOpen": 96600,
              "anchorClose": 103800,
              "anchorHigh": 104200,
              "anchorLow": 95200,
              "anchorBodyMid": 100200,
              "anchorVolumeRatio": 2.02,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 100200,
              "ma10Price": 105050,
              "ma10PrevPrice": 102320,
              "ma20Price": 100725,
              "ma20PrevPrice": 99830,
              "ma10WarningPrice": null,
              "hardStopPrice": 100725,
              "fallbackStopPrice": 118365,
              "effectiveStopPrice": 118365,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 100,200원, 20일선 100,725원) = 100,725원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 118,365원) = 118,365원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 100,200원, 20일선 100,725원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 118,365원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "123,828원",
                "historicalHitRate": 0.6323,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "125,042원",
                "historicalHitRate": 0.5097,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "126,863원",
                "historicalHitRate": 0.3871,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "128,684원",
                "historicalHitRate": 0.3139,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 118,365원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "118,365원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 120186,
              "high": 121400,
              "anchor": 121400,
              "label": "120,186~121,400원 (종가 ±, 분할매수)"
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
                    "targetPrice": "123,828원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "125,042원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "126,863원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "128,684원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 118,365원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "118,365원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "123,828원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "125,042원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "126,863원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "128,684원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 118,365원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "118,365원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
                    "targetPrice": "123,828원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "125,042원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "126,863원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "128,684원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 118,365원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "118,365원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
              "reason": "EV=순수익 argmax (과거 155건)",
              "hitRate": 0.6323,
              "ev": 2.407,
              "sampleCount": 155
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
              "핵심 Gate 미충족: G12",
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G1, G12, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 111,280 > 20MA 100,725 > 60MA 115,695 · 상승선 5MA, 20MA · 정배열 미충족 · 외 2건",
            "statusReason": "G1 미충족: 5MA 111,280 > 20MA 100,725 > 60MA 115,695 · 상승선 5MA, 20MA · 정배열 미충족 / G12 미충족: 마지막 30분 비율 2.98:1 / 마지막 30분 평균 66.7% / 마지막 1시간 68.8% · 장 막판 투매 경고 / G13 미충족: KIND 최근공시 2026-07-16 기업설명회(IR) 개최(안내공시)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 121400.0,
                "vs52wHighPct": 73.13253012048193,
                "vs52wLowPct": 38.42645381984037,
                "dropFrom52wHighPct": 26.867469879518076,
                "ma20GapPct": 20.526185157607348,
                "rsi14": 63.24863124294701,
                "volumeRatio20d": 346.25821588475594,
                "rs20Pct": 17.294685990338166,
                "supportDistancePct": 3.87,
                "tradingValueRank": 26.0,
                "marketCapRank": 35.0,
                "marketCapTrillion": 20.523,
                "per": 0.0,
                "pbr": 0.86,
                "cnsPer": 9.96,
                "foreignRate": 14.49,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -6.645089396077298
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "한미반도체",
            "code": "042700",
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
                "note": "외인 684,840주 / 기관 91,828주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 242,500 · 5MA·10MA·20MA 중 5MA, 10MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.12 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -43.1% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 126% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -14.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 355% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 229,400 > 20MA 243,335 > 60MA 299,920 · 상승선 5MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 242,500 / 60MA 299,920",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 51.0 (필요 ≥ 50)",
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
                "note": "KOSPI 6,821 / 5MA 7,049 (-3.2%) · VKOSPI 87.1 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -10.02% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 51.0 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -0.3% (필요 ≤ +25%) · 60MA -19.1% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -43.1% (≥12%) · 거래량 126% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 거래량 / 앵커 거래량 62% · 시가 263,000 / 종가 242,500 / 전일 종가 269,500 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "종가 242,500 / 앵커 중심값 247,500 / 복합 지지 222,916 · 앵커 또는 지지 한 축 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 446.45:1 / 마지막 30분 평균 225.0% / 마지막 1시간 205.1% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-15 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 684,840주 / 기관 91,828주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 242,500 · 5MA·10MA·20MA 중 5MA, 10MA 위",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -43.1% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 126% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -14.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.12 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 242500,
            "previousClose": 269500,
            "dailyChange": -27000,
            "dailyChangePct": -10.02,
            "dailyDirection": "down",
            "entryPriceText": "242,500원 (당일 종가 기준)",
            "entryPrice": 242500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 23.1132,
            "marketCapRank": 30,
            "marketCapUniverseCount": 2553,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 684,840주 / 기관 91,828주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 76.0,
              "note": "토스 공개 체결강도 76.0% / 최근 체결 31분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042700/order",
              "asOf": "2026-07-16T08:33:08Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 31,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 31분 프록시",
              "lastHourAvgStrength": 205.1,
              "lastHourObservedMinutes": 31,
              "last30AvgStrength": 225.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 446.4545,
              "last30BuyVolume": 4911.0,
              "last30SellVolume": 11.0
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-07-15 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 222,916원 (8.08% 아래) · 강도 60점 · family 2개 · 급증봉 저점·수평 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 222916,
                    "distancePct": 8.08,
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
                    "role": "primary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 216167,
                    "distancePct": 10.86,
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
                  },
                  {
                    "label": "수평 지지",
                    "price": 210333,
                    "distancePct": 13.26,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 205750,
                    "distancePct": 15.15,
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
                  },
                  {
                    "label": "수평 지지",
                    "price": 200350,
                    "distancePct": 17.38,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 222916,
                  "distancePct": 8.08,
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
                  "role": "primary"
                },
                "strengthScore": 60,
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
                    "price": 200350,
                    "distancePct": 17.38,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 199200,
                    "bandHigh": 201500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 205750,
                    "distancePct": 15.15,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 205000,
                    "bandHigh": 207500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 210333,
                    "distancePct": 13.26,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 209500,
                    "bandHigh": 211000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 216167,
                    "distancePct": 10.86,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 215500,
                    "bandHigh": 217500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 221833,
                    "distancePct": 8.52,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 219500,
                    "bandHigh": 224000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 248667,
                    "distancePct": -2.54,
                    "count": 5,
                    "lastSeenDaysAgo": 11,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 246500,
                    "bandHigh": 250500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 257550,
                    "distancePct": -6.21,
                    "count": 9,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 253500,
                    "bandHigh": 261000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 268875,
                    "distancePct": -10.88,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 266000,
                    "bandHigh": 270000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 275786,
                    "distancePct": -13.73,
                    "count": 6,
                    "lastSeenDaysAgo": 15,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 273000,
                    "bandHigh": 278000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 284714,
                    "distancePct": -17.41,
                    "count": 12,
                    "lastSeenDaysAgo": 19,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 280000,
                    "bandHigh": 288000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 294000,
                    "distancePct": -21.24,
                    "count": 12,
                    "lastSeenDaysAgo": 18,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 291000,
                    "bandHigh": 298000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 303125,
                    "distancePct": -25.0,
                    "count": 4,
                    "lastSeenDaysAgo": 18,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 301500,
                    "bandHigh": 305000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 316611,
                    "distancePct": -30.56,
                    "count": 6,
                    "lastSeenDaysAgo": 20,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 312000,
                    "bandHigh": 320500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 329000,
                    "distancePct": -35.67,
                    "count": 3,
                    "lastSeenDaysAgo": 22,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 326000,
                    "bandHigh": 332500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 346000,
                    "distancePct": -42.68,
                    "count": 2,
                    "lastSeenDaysAgo": 23,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 343000,
                    "bandHigh": 348000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 358100,
                    "distancePct": -47.67,
                    "count": 5,
                    "lastSeenDaysAgo": 24,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 352500,
                    "bandHigh": 361500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 368938,
                    "distancePct": -52.14,
                    "count": 7,
                    "lastSeenDaysAgo": 42,
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
                    "distancePct": -55.98,
                    "count": 4,
                    "lastSeenDaysAgo": 45,
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
                    "distancePct": -60.95,
                    "count": 5,
                    "lastSeenDaysAgo": 43,
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
                    "distancePct": -65.05,
                    "count": 2,
                    "lastSeenDaysAgo": 44,
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
                    "price": 275000,
                    "distancePct": -13.4,
                    "count": 2,
                    "lastSeenDaysAgo": 31,
                    "valid": false,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 273000,
                    "bandHigh": 277000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 293588,
                    "distancePct": -21.07,
                    "count": 8,
                    "lastSeenDaysAgo": 32,
                    "valid": false,
                    "weight": 25,
                    "volume": 7974982,
                    "binIndex": 10,
                    "binLow": 288683,
                    "binHigh": 298492
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 352438,
                    "distancePct": -45.34,
                    "count": 3,
                    "lastSeenDaysAgo": 23,
                    "valid": false,
                    "weight": 25,
                    "volume": 7426705,
                    "binIndex": 16,
                    "binLow": 347533,
                    "binHigh": 357342
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 313204,
                    "distancePct": -29.16,
                    "count": 3,
                    "lastSeenDaysAgo": 19,
                    "valid": false,
                    "weight": 25,
                    "volume": 7253644,
                    "binIndex": 12,
                    "binLow": 308300,
                    "binHigh": 318108
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 224000,
                    "distancePct": 7.63,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 218.0,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 355% (19일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 355.4,
                "latestBurstDaysAgo": 1
              },
              "anchor": {
                "date": "20260715",
                "open": 225500,
                "close": 269500,
                "high": 269500,
                "low": 224000,
                "bodyMid": 247500,
                "volume": 2355581.0,
                "volumeRatio": 2.18,
                "daysAgo": 1
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 62% · 시가 263,000 / 종가 242,500 / 전일 종가 269,500 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "종가 242,500 / 앵커 중심값 247,500 / 복합 지지 222,916 · 앵커 또는 지지 한 축 이탈"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 446.45:1 / 마지막 30분 평균 225.0% / 마지막 1시간 205.1% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 87.14, ATR10 11.69%, 일간 표준편차 9.15%, 당일 레인지 12.99%.",
              "metrics": {
                "atrPct10": 11.69,
                "returnStd20": 9.15,
                "todayRangePct": 12.99,
                "vkospi": 87.14
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
              "anchorDate": "20260715",
              "anchorOpen": 225500,
              "anchorClose": 269500,
              "anchorHigh": 269500,
              "anchorLow": 224000,
              "anchorBodyMid": 247500,
              "anchorVolumeRatio": 2.18,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 247500,
              "ma10Price": 223120,
              "ma10PrevPrice": 220820,
              "ma20Price": 243335,
              "ma20PrevPrice": 246985,
              "ma10WarningPrice": null,
              "hardStopPrice": 236438,
              "fallbackStopPrice": 236438,
              "effectiveStopPrice": 236438,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(유효 구조 손절 후보 없음) = 236,438원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 236,438원) = 236,438원 / 제외: 앵커 몸통 중심 247,500원가 현재가 242,500원 이상이라 제외 / 20일선 243,335원이 현재가 242,500원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(유효 구조 손절 후보 없음) 중 더 보수적인 가격을 쓰고, 기존 % 손절 236,438원를 하한으로 유지합니다. 앵커 몸통 중심 247,500원가 현재가 242,500원 이상이라 제외 / 20일선 243,335원이 현재가 242,500원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "247,350원",
                "historicalHitRate": 0.6323,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "249,775원",
                "historicalHitRate": 0.5097,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "253,412원",
                "historicalHitRate": 0.3871,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "257,050원",
                "historicalHitRate": 0.3139,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 236,438원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "236,438원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 240075,
              "high": 242500,
              "anchor": 242500,
              "label": "240,075~242,500원 (종가 ±, 분할매수)"
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
                    "targetPrice": "247,350원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "249,775원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "253,412원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "257,050원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 236,438원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "236,438원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "247,350원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "249,775원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "253,412원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "257,050원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 236,438원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "236,438원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
                    "targetPrice": "247,350원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "249,775원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "253,412원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "257,050원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 236,438원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "236,438원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
              "reason": "EV=순수익 argmax (과거 155건)",
              "hitRate": 0.6323,
              "ev": 2.407,
              "sampleCount": 155
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
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G1, G2, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 229,400 > 20MA 243,335 > 60MA 299,920 · 상승선 5MA · 정배열 미충족 · 외 2건",
            "statusReason": "G1 미충족: 5MA 229,400 > 20MA 243,335 > 60MA 299,920 · 상승선 5MA · 정배열 미충족 / G2 미충족: 종가 242,500 / 60MA 299,920 / G13 미충족: KIND 최근공시 2026-07-15 기업설명회(IR) 개최(안내공시)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 242500.0,
                "vs52wHighPct": 56.92488262910798,
                "vs52wLowPct": 197.9115479115479,
                "dropFrom52wHighPct": 43.075117370892016,
                "ma20GapPct": -0.3431483346004479,
                "rsi14": 47.57941595746774,
                "volumeRatio20d": 126.30479843327713,
                "rs20Pct": -23.137876386687797,
                "supportDistancePct": 8.08,
                "tradingValueRank": 17.0,
                "marketCapRank": 30.0,
                "marketCapTrillion": 23.1132,
                "per": 129.89,
                "pbr": 36.17,
                "cnsPer": 0.0,
                "foreignRate": 8.47,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -14.435606719642365
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "원익IPS",
            "code": "240810",
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
                "note": "외인 22,843주 / 기관 239,418주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 140,700 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 136,600 ≤ 종가 140,700)"
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
                "note": "52주 고가 대비 -25.1% (≥12% 만점·8~12% 부분) · 충족"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "거래량 80% (≥100% 만점·80~100% 부분) · 부분 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -31.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G4)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 272% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 132,060 > 20MA 140,510 > 60MA 131,003 · 상승선 5MA, 60MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 140,700 / 60MA 131,003",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 59.7 (필요 ≥ 50)",
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
                "status": "⚠️",
                "note": "KOSPI 6,821 / 5MA 7,049 (-3.2%) · VKOSPI 87.1 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -1.40% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 59.7 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +0.1% (필요 ≤ +25%) · 60MA +7.4% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -25.1% (≥12%) · 거래량 80% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "KIND 최근공시 2026-07-16까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 22,843주 / 기관 239,418주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 140,700 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 136,600 ≤ 종가 140,700)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -25.1% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -31.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
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
                "code": "D3",
                "note": "거래량 80% (≥100% 만점·80~100% 부분) · 부분 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 140700,
            "previousClose": 142700,
            "dailyChange": -2000,
            "dailyChangePct": -1.4,
            "dailyDirection": "down",
            "entryPriceText": "140,700원 (당일 종가 기준)",
            "entryPrice": 140700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 6.9061,
            "marketCapRank": 83,
            "marketCapUniverseCount": 2553,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 22,843주 / 기관 239,418주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 평균 체결강도 데이터 부족",
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 81.3,
              "note": "토스 공개 체결강도 81.3% / 최근 체결 110분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-07-16T08:30:07Z",
              "intradayAbove100Ratio": 47.4,
              "observedMinutes": 110,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 110분 프록시"
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-07-16까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 128,142원 (8.93% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 128142,
                    "distancePct": 8.93,
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
                    "price": 120464,
                    "distancePct": 14.38,
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
                    "price": 112109,
                    "distancePct": 20.32,
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
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 141800,
                    "distancePct": -0.78,
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
                  },
                  {
                    "label": "수평 지지",
                    "price": 132229,
                    "distancePct": 6.02,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 6,
                    "lastSeenDaysAgo": 9,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 128142,
                  "distancePct": 8.93,
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
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 101733,
                    "distancePct": 27.69,
                    "count": 4,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 100500,
                    "bandHigh": 102700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 104800,
                    "distancePct": 25.52,
                    "count": 4,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 103600,
                    "bandHigh": 106000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 108400,
                    "distancePct": 22.96,
                    "count": 7,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 107200,
                    "bandHigh": 109500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 112218,
                    "distancePct": 20.24,
                    "count": 8,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 110500,
                    "bandHigh": 113200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 115658,
                    "distancePct": 17.8,
                    "count": 10,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 114100,
                    "bandHigh": 117100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 120067,
                    "distancePct": 14.66,
                    "count": 15,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 117500,
                    "bandHigh": 121700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 123808,
                    "distancePct": 12.01,
                    "count": 10,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 121900,
                    "bandHigh": 125300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 127771,
                    "distancePct": 9.19,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 127100,
                    "bandHigh": 129000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 132229,
                    "distancePct": 6.02,
                    "count": 6,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
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
                    "price": 141800,
                    "distancePct": -0.78,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
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
                    "price": 149729,
                    "distancePct": -6.42,
                    "count": 6,
                    "lastSeenDaysAgo": 15,
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
                    "price": 155412,
                    "distancePct": -10.46,
                    "count": 7,
                    "lastSeenDaysAgo": 11,
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
                    "distancePct": -13.88,
                    "count": 3,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": -16.67,
                    "count": 4,
                    "lastSeenDaysAgo": 11,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 163200,
                    "bandHigh": 165600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 168500,
                    "distancePct": -19.76,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 168100,
                    "bandHigh": 168900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 173500,
                    "distancePct": -23.31,
                    "count": 2,
                    "lastSeenDaysAgo": 18,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 172500,
                    "bandHigh": 174500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 112000,
                    "distancePct": 20.4,
                    "count": 2,
                    "lastSeenDaysAgo": 55,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 112000,
                    "bandHigh": 112000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 170588,
                    "distancePct": -21.24,
                    "count": 3,
                    "lastSeenDaysAgo": 11,
                    "valid": false,
                    "weight": 25,
                    "volume": 13090392,
                    "binIndex": 19,
                    "binLow": 168675,
                    "binHigh": 172500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 128512,
                    "distancePct": 8.66,
                    "count": 5,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "volume": 10337035,
                    "binIndex": 8,
                    "binLow": 126600,
                    "binHigh": 130425
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 120862,
                    "distancePct": 14.1,
                    "count": 10,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 25,
                    "volume": 9574725,
                    "binIndex": 6,
                    "binLow": 118950,
                    "binHigh": 122775
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 272% (11일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 272.1,
                "latestBurstDaysAgo": 11
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 87.14, ATR10 13.04%, 일간 표준편차 8.79%, 당일 레인지 14.02%.",
              "metrics": {
                "atrPct10": 13.04,
                "returnStd20": 8.79,
                "todayRangePct": 14.02,
                "vkospi": 87.14
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A240810/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 원익IPS (240810) 차트 화면을 엽니다.",
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
              "ma10Price": 123820,
              "ma10PrevPrice": 122910,
              "ma20Price": 140510,
              "ma20PrevPrice": 141635,
              "ma10WarningPrice": null,
              "hardStopPrice": 137182,
              "fallbackStopPrice": 137182,
              "effectiveStopPrice": 137182,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 137,182원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 137,182원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "143,514원",
                "historicalHitRate": 0.6323,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "144,921원",
                "historicalHitRate": 0.5097,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "147,032원",
                "historicalHitRate": 0.3871,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "149,142원",
                "historicalHitRate": 0.3139,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 137,182원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "137,182원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 139293,
              "high": 140700,
              "anchor": 140700,
              "label": "139,293~140,700원 (종가 ±, 분할매수)"
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
                    "targetPrice": "143,514원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "144,921원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "147,032원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "149,142원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 137,182원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "137,182원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "143,514원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "144,921원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "147,032원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "149,142원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 137,182원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "137,182원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
                    "targetPrice": "143,514원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "144,921원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "147,032원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "149,142원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 137,182원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "137,182원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
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
              "reason": "EV=순수익 argmax (과거 155건)",
              "hitRate": 0.6323,
              "ev": 2.407,
              "sampleCount": 155
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
              "매매금지(핵심 Gate 미충족: G1, G4)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 132,060 > 20MA 140,510 > 60MA 131,003 · 상승선 5MA, 60MA · 정배열 미충족 · 외 1건",
            "statusReason": "G1 미충족: 5MA 132,060 > 20MA 140,510 > 60MA 131,003 · 상승선 5MA, 60MA · 정배열 미충족 / G4 미충족: MACD 히스토그램 조건 미충족",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 140700.0,
                "vs52wHighPct": 74.92012779552716,
                "vs52wLowPct": 416.3302752293578,
                "dropFrom52wHighPct": 25.079872204472842,
                "ma20GapPct": 0.13522169240623444,
                "rsi14": 52.360862191623916,
                "volumeRatio20d": 80.14511328925465,
                "rs20Pct": -13.786764705882353,
                "supportDistancePct": 8.93,
                "tradingValueRank": 23.0,
                "marketCapRank": 83.0,
                "marketCapTrillion": 6.9061,
                "per": 62.34,
                "pbr": 6.97,
                "cnsPer": 39.7,
                "foreignRate": 15.83,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -31.59234800004547
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "한화오션",
            "code": "042660",
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
                "note": "외인 196,586주 / 기관 -37,886주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 86,800 · 5MA·10MA·20MA 중 5MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 86,100 ≤ 종가 86,800)"
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
                "note": "52주 고가 대비 -43.9% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 104% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "대차잔고 +24.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G3, G4, G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 230% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 81,140 > 20MA 97,585 > 60MA 114,697 · 상승선 5MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 86,800 / 60MA 114,697",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "주봉 RSI 36.3 (필요 ≥ 50)",
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
                "status": "⚠️",
                "note": "KOSPI 6,867 / 5MA 7,058 (-2.7%) · VKOSPI 87.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +5.85% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 36.3 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -11.1% (필요 ≤ +25%) · 60MA -24.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -43.9% (≥12%) · 거래량 104% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
                "evalStatus": "met"
              },
              {
                "code": "G9",
                "status": "⚠️",
                "note": "지지선 반복 횟수나 family 합의가 약해 하단 방어 신뢰도가 낮습니다.",
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
                "note": "마지막 30분 비율 1.08:1 / 마지막 30분 평균 108.0% / 마지막 1시간 108.0% · 장 막판 매수세 유지",
                "evalStatus": "met"
              },
              {
                "code": "G13",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-13 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 196,586주 / 기관 -37,886주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 86,800 · 5MA·10MA·20MA 중 5MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 86,100 ≤ 종가 86,800)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -43.9% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 104% (≥100% 만점·80~100% 부분) · 충족",
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
                "note": "대차잔고 +24.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 86800,
            "previousClose": 82000,
            "dailyChange": 4800,
            "dailyChangePct": 5.85,
            "dailyDirection": "up",
            "entryPriceText": "86,800원 (당일 종가 기준)",
            "entryPrice": 86800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 26.5967,
            "marketCapRank": 26,
            "marketCapUniverseCount": 2552,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 196,586주 / 기관 -37,886주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 91.0,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042660/order",
              "asOf": "2026-07-16T06:03:45Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 108.0,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 108.0,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 1.0805,
              "last30BuyVolume": 1531.0,
              "last30SellVolume": 1417.0
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-07-13 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 86,900원 (-0.12% 아래) · 강도 30점 · family 1개 · 수평 지지",
                "lines": [
                  {
                    "label": "수평 지지",
                    "price": 86900,
                    "distancePct": -0.12,
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
                    "role": "primary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 82000,
                    "distancePct": 5.53,
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
                  },
                  {
                    "label": "수평 지지",
                    "price": 80750,
                    "distancePct": 6.97,
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
                    "price": 78083,
                    "distancePct": 10.04,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "수평 지지",
                  "price": 86900,
                  "distancePct": -0.12,
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
                  "role": "primary"
                },
                "strengthScore": 30,
                "strengthLabel": "weak",
                "warningLevel": "danger",
                "warningReason": "지지선 반복 횟수나 family 합의가 약해 하단 방어 신뢰도가 낮습니다.",
                "activeFamilyCount": 1,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 78083,
                    "distancePct": 10.04,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 76800,
                    "bandHigh": 78800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 80750,
                    "distancePct": 6.97,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 79600,
                    "bandHigh": 81500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 82000,
                    "distancePct": 5.53,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 82000,
                    "bandHigh": 82000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 86900,
                    "distancePct": -0.12,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 86800,
                    "bandHigh": 87000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 95800,
                    "distancePct": -10.37,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 95500,
                    "bandHigh": 96100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 99050,
                    "distancePct": -14.11,
                    "count": 5,
                    "lastSeenDaysAgo": 9,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 97800,
                    "bandHigh": 100300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 102600,
                    "distancePct": -18.2,
                    "count": 7,
                    "lastSeenDaysAgo": 10,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 101300,
                    "bandHigh": 103700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 105088,
                    "distancePct": -21.07,
                    "count": 6,
                    "lastSeenDaysAgo": 10,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 104500,
                    "bandHigh": 106000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 107000,
                    "distancePct": -23.27,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 106900,
                    "bandHigh": 107100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 110850,
                    "distancePct": -27.71,
                    "count": 8,
                    "lastSeenDaysAgo": 8,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 109400,
                    "bandHigh": 112200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 115369,
                    "distancePct": -32.91,
                    "count": 10,
                    "lastSeenDaysAgo": 8,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 112700,
                    "bandHigh": 116500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 119450,
                    "distancePct": -37.62,
                    "count": 7,
                    "lastSeenDaysAgo": 19,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 118100,
                    "bandHigh": 120400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 122678,
                    "distancePct": -41.33,
                    "count": 9,
                    "lastSeenDaysAgo": 22,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 121400,
                    "bandHigh": 124200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 125533,
                    "distancePct": -44.62,
                    "count": 4,
                    "lastSeenDaysAgo": 20,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 124700,
                    "bandHigh": 127100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 130100,
                    "distancePct": -49.88,
                    "count": 16,
                    "lastSeenDaysAgo": 19,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 128200,
                    "bandHigh": 131800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 133882,
                    "distancePct": -54.24,
                    "count": 10,
                    "lastSeenDaysAgo": 21,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 132300,
                    "bandHigh": 135000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 118800,
                    "distancePct": -36.87,
                    "count": 2,
                    "lastSeenDaysAgo": 34,
                    "valid": false,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 118400,
                    "bandHigh": 119200
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 134827,
                    "distancePct": -55.33,
                    "count": 6,
                    "lastSeenDaysAgo": 21,
                    "valid": false,
                    "weight": 25,
                    "volume": 18363479,
                    "binIndex": 21,
                    "binLow": 133412,
                    "binHigh": 136242
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 131998,
                    "distancePct": -52.07,
                    "count": 7,
                    "lastSeenDaysAgo": 36,
                    "valid": false,
                    "weight": 25,
                    "volume": 15419916,
                    "binIndex": 20,
                    "binLow": 130583,
                    "binHigh": 133412
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 126340,
                    "distancePct": -45.55,
                    "count": 5,
                    "lastSeenDaysAgo": 19,
                    "valid": false,
                    "weight": 25,
                    "volume": 11183924,
                    "binIndex": 18,
                    "binLow": 124925,
                    "binHigh": 127754
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 230% (7일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 230.4,
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
                  "summary": "마지막 30분 비율 1.08:1 / 마지막 30분 평균 108.0% / 마지막 1시간 108.0% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 87.71, ATR10 11.28%, 일간 표준편차 7.39%, 당일 레인지 7.07%.",
              "metrics": {
                "atrPct10": 11.28,
                "returnStd20": 7.39,
                "todayRangePct": 7.07,
                "vkospi": 87.71
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
              "ma10Price": 87910,
              "ma10PrevPrice": 89680,
              "ma20Price": 97585,
              "ma20PrevPrice": 99500,
              "ma10WarningPrice": 87910,
              "hardStopPrice": 84630,
              "fallbackStopPrice": 84630,
              "effectiveStopPrice": 84630,
              "warningRuleSummary": "종가 86,800원 < 10일선 87,910원 and 10일선 87,910원 <= 전일 10일선 89,680원",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 84,630원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 84,630원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "10일선 저항 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.3%",
                "targetPrice": "87,910원",
                "historicalHitRate": 0.6323,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "89,404원",
                "historicalHitRate": 0.5097,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "90,706원",
                "historicalHitRate": 0.3871,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "92,008원",
                "historicalHitRate": 0.3139,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 84,630원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "84,630원"
              }
            ],
            "rr": "1 : 1.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 85932,
              "high": 86800,
              "anchor": 86800,
              "label": "85,932~86,800원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 87910,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "88,536원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "89,404원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "90,706원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "92,008원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 84,630원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "84,630원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 42건)",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 87910,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "10일선 저항 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "87,910원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "89,404원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "90,706원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "92,008원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 84,630원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "84,630원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "가장 가까운 10일선 저항을 앞단 목표가에 반영하고 다음 목표는 기존값을 유지합니다.",
                "nearestResistanceType": "ma10",
                "nearestResistancePrice": 87910,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "10일선 저항 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "87,910원",
                    "historicalHitRate": 0.6323,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "89,404원",
                    "historicalHitRate": 0.5097,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "90,706원",
                    "historicalHitRate": 0.3871,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "92,008원",
                    "historicalHitRate": 0.3139,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 84,630원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "84,630원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 155건)",
                  "hitRate": 0.6323,
                  "ev": 2.407,
                  "sampleCount": 155
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 42건)",
              "sampleCount": 42,
              "ev": -2.1706
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 155건)",
              "hitRate": 0.6323,
              "ev": 2.407,
              "sampleCount": 155
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
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G1, G2, G3, G4, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 81,140 > 20MA 97,585 > 60MA 114,697 · 상승선 5MA · 정배열 미충족 · 외 4건",
            "statusReason": "G1 미충족: 5MA 81,140 > 20MA 97,585 > 60MA 114,697 · 상승선 5MA · 정배열 미충족 / G2 미충족: 종가 86,800 / 60MA 114,697 / G3 미충족: 주봉 RSI 36.3 (필요 ≥ 50) / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 86800.0,
                "vs52wHighPct": 56.07235142118863,
                "vs52wLowPct": 17.2972972972973,
                "dropFrom52wHighPct": 43.927648578811365,
                "ma20GapPct": -11.051903468770815,
                "rsi14": 41.688403314517835,
                "volumeRatio20d": 104.2416126445228,
                "rs20Pct": -30.61550759392486,
                "supportDistancePct": 0.12,
                "tradingValueRank": 26.0,
                "marketCapRank": 26.0,
                "marketCapTrillion": 26.5967,
                "per": 17.38,
                "pbr": 3.9,
                "cnsPer": 16.07,
                "foreignRate": 9.55,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 24.02643743363046
              },
              "evaluatedAt": "2026-07-16T15:05:01+09:00",
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
            "name": "SK이노베이션",
            "code": "096770",
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
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 100,143주 / 기관 317,985주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 130.0% / 100% 유지 20.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 95.9% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 346% · 폭발적 급증 (≥300%)"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 39% / 윗꼬리·몸통 1.38 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.21 (필요 ≥ 1.2)"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 -6.6% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 미충족"
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
                "note": "5일 초과 +29.1% / 20일 초과 +42.0%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 73.1% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 26",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 346% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 39% / 윗꼬리·몸통 1.38 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +3.76% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 121,400 / 5MA 111,280 (전일 5MA 106,800) · 5MA 위·우상향",
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
                "note": "외인 100,143주 / 기관 317,985주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 95.9% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 346% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 95.9% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 130.0% / 100% 유지 20.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 39% / 윗꼬리·몸통 1.38 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.21 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -6.6% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 121400,
            "previousClose": 117000,
            "dailyChange": 4400,
            "dailyChangePct": 3.76,
            "dailyDirection": "up",
            "entryPriceText": "121,400원 (당일 종가 기준)",
            "entryPrice": 121400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 20.523,
            "marketCapRank": 35,
            "marketCapUniverseCount": 2553,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 100,143주 / 기관 317,985주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 130.0,
              "note": "토스 공개 체결강도 130.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-07-16T08:33:05Z",
              "intradayAbove100Ratio": 20.0,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 68.8,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 66.7,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 2.9804,
              "last30BuyVolume": 152.0,
              "last30SellVolume": 51.0
            },
            "orderbook": {
              "bidAskRatio": 0.207,
              "bidTotal": 2704,
              "askTotal": 13062,
              "note": "Naver 호가잔량합계 매수 2,704 / 매도 13,062",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=096770"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 87.14, ATR10 8.00%, 일간 표준편차 5.24%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 8.0,
                "returnStd20": 5.24,
                "todayRangePct": 8.25,
                "vkospi": 87.14
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
              "referencePrice": 121000,
              "referenceBandLow": 117400,
              "referenceBandHigh": 121000,
              "entryDayOpenPrice": 117600,
              "fallbackStopPrice": 116544,
              "effectiveHardStopPrice": 121000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 121,000원와 기존 % 손절 116,544원 중 더 높은 121,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 121,000원이며, 기존 % 손절 116,544원보다 느슨해지지 않게 121,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+0.3%",
                "targetPrice": "121,800원",
                "historicalHitRate": 0.637,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.9%",
                "targetPrice": "128,600원",
                "historicalHitRate": 0.4296,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "131,112원",
                "historicalHitRate": 0.2963,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "134,754원",
                "historicalHitRate": 0.2444,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "138,396원",
                "historicalHitRate": 0.1721,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 121,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.3%",
                "targetPrice": "121,000원"
              }
            ],
            "rr": "1 : 25.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 120186,
              "high": 121400,
              "anchor": 121400,
              "label": "120,186~121,400원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 121800,
                "secondaryResistancePrice": 128600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "125,042원",
                    "historicalHitRate": 0.637,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "127,470원",
                    "historicalHitRate": 0.4296,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "131,112원",
                    "historicalHitRate": 0.2963,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "134,754원",
                    "historicalHitRate": 0.2444,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "138,396원",
                    "historicalHitRate": 0.1721,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 121,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "121,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 122건)",
                  "hitRate": 0.1721,
                  "ev": 1.481,
                  "sampleCount": 122
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 121800,
                "secondaryResistancePrice": 128600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "121,800원",
                    "historicalHitRate": 0.637,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "127,470원",
                    "historicalHitRate": 0.4296,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "131,112원",
                    "historicalHitRate": 0.2963,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "134,754원",
                    "historicalHitRate": 0.2444,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "138,396원",
                    "historicalHitRate": 0.1721,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 121,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "121,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 122건)",
                  "hitRate": 0.1721,
                  "ev": 1.481,
                  "sampleCount": 122
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 42건)",
                "nearestResistancePrice": 121800,
                "secondaryResistancePrice": 128600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "121,800원",
                    "historicalHitRate": 0.637,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "128,600원",
                    "historicalHitRate": 0.4296,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "131,112원",
                    "historicalHitRate": 0.2963,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "134,754원",
                    "historicalHitRate": 0.2444,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "138,396원",
                    "historicalHitRate": 0.1721,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 121,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "121,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 122건)",
                  "hitRate": 0.1721,
                  "ev": 1.481,
                  "sampleCount": 122
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
              "reason": "EV=순수익 argmax (과거 122건)",
              "hitRate": 0.1721,
              "ev": 1.481,
              "sampleCount": 122
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 73.1% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 73.1% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 121400.0,
                "vs52wHighPct": 73.13253012048193,
                "vs52wLowPct": 38.42645381984037,
                "dropFrom52wHighPct": 26.867469879518076,
                "ma20GapPct": 20.526185157607348,
                "rsi14": 63.24863124294701,
                "volumeRatio20d": 346.25821588475594,
                "rs20Pct": 17.294685990338166,
                "tradingValueRank": 26.0,
                "marketCapRank": 35.0,
                "marketCapTrillion": 20.523,
                "per": 0.0,
                "pbr": 0.86,
                "cnsPer": 9.96,
                "foreignRate": 14.49,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -6.645089396077298
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
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
            "name": "한미반도체",
            "code": "042700",
            "strictScore": 8.7,
            "signalScore": 8.7,
            "score": 8.7,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 6.2,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 684,840주 / 기관 91,828주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +684,840 / 전일 +27,732 · 기관 당일 +91,828 / 전일 -43,056 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 205.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 76.0% / 마지막 1시간 205.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +911,501주 · 양수 4/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 99.7% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 229,400 / 20MA 243,335 · 정배열 미충족"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -10.02% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -9.03% / KOSPI -6.37% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 446.45:1 · 평균 체결강도 225.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -14.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, Q1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +27,732/당일 +684,840 · 기관 전일 -43,056/당일 +91,828 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 242,500 / 60MA 299,920",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 56.9% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 17",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 126% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 8.5% (≥25%) · 20일 수익률 -23.1% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,821 / 5MA 7,049 (-3.2%) · VKOSPI 87.1 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 684,840주 / 기관 91,828주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +684,840 / 전일 +27,732 · 기관 당일 +91,828 / 전일 -43,056 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 205.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 76.0% / 마지막 1시간 205.1% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +911,501주 · 양수 4/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 99.7% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 446.45:1 · 평균 체결강도 225.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -14.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "5MA 229,400 / 20MA 243,335 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 120% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -10.02% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -9.03% / KOSPI -6.37% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 242500,
            "previousClose": 269500,
            "dailyChange": -27000,
            "dailyChangePct": -10.02,
            "dailyDirection": "down",
            "entryPriceText": "242,500원 (당일 종가 기준)",
            "entryPrice": 242500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 23.1132,
            "marketCapRank": 30,
            "marketCapUniverseCount": 2553,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 684,840주 / 기관 91,828주 / 마지막 1시간 205.1% · 장후반 매수세 강화 · 마지막 30분 틱 446.45:1. 외국인 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 76.0,
              "note": "토스 공개 체결강도 76.0% / 최근 체결 31분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042700/order",
              "asOf": "2026-07-16T08:33:08Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 31,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 31분 프록시",
              "lastHourAvgStrength": 205.1,
              "lastHourObservedMinutes": 31,
              "last30AvgStrength": 225.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 446.4545,
              "last30BuyVolume": 4911.0,
              "last30SellVolume": 11.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 87.14, ATR10 11.69%, 일간 표준편차 9.15%, 당일 레인지 12.99%.",
              "metrics": {
                "atrPct10": 11.69,
                "returnStd20": 9.15,
                "todayRangePct": 12.99,
                "vkospi": 87.14
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 911501.0,
              "positiveDays": 4,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260715",
                    "net": 684840.0
                  },
                  {
                    "date": "20260714",
                    "net": 27732.0
                  },
                  {
                    "date": "20260713",
                    "net": 115691.0
                  },
                  {
                    "date": "20260710",
                    "net": -26725.0
                  },
                  {
                    "date": "20260709",
                    "net": 109963.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260715",
                    "net": 91828.0
                  },
                  {
                    "date": "20260714",
                    "net": -43056.0
                  },
                  {
                    "date": "20260713",
                    "net": -32763.0
                  },
                  {
                    "date": "20260710",
                    "net": 8861.0
                  },
                  {
                    "date": "20260709",
                    "net": 133196.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260715",
                    "net": 684840.0
                  },
                  {
                    "date": "20260714",
                    "net": 27732.0
                  },
                  {
                    "date": "20260713",
                    "net": 115691.0
                  },
                  {
                    "date": "20260710",
                    "net": -26725.0
                  },
                  {
                    "date": "20260709",
                    "net": 109963.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 5일 매집 추세 강화",
              "note": "외국인 최근 5일 누적 +911,501주 · 양수 4/5일 · 증가 2회"
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
                "targetPrice": "243,500원",
                "historicalHitRate": 0.6714,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+9.1%",
                "targetPrice": "264,500원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+9.1%",
                "targetPrice": "264,500원",
                "historicalHitRate": 0.2381,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+9.1%",
                "targetPrice": "264,500원",
                "historicalHitRate": 0.1381,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "269,175원",
                "historicalHitRate": 0.0718,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 235,225원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "235,225원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260715",
              "anchorOpen": 225500,
              "anchorClose": 269500,
              "anchorVolumeRatio20d": 2.18,
              "anchorStopPrice": 225500,
              "fallbackStopPrice": 235225,
              "effectiveHardStopPrice": 235225,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 225,500원와 기존 % 손절 235,225원 중 더 높은 235,225원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 225,500원를 기준으로 잡고, 기존 % 손절 235,225원보다 느슨해지지 않게 235,225원로 고정합니다."
            },
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 240075,
              "high": 242500,
              "anchor": 242500,
              "label": "240,075~242,500원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 243500,
                "secondaryResistancePrice": 264500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "247,350원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "250,987원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "255,837원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "261,900원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "269,175원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 235,225원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "235,225원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 243500,
                "secondaryResistancePrice": 264500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "243,500원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "250,987원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "255,837원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "261,900원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "269,175원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 235,225원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "235,225원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 66건)",
                "nearestResistancePrice": 243500,
                "secondaryResistancePrice": 264500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "243,500원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+9.1%",
                    "targetPrice": "264,500원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+9.1%",
                    "targetPrice": "264,500원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+9.1%",
                    "targetPrice": "264,500원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "269,175원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 235,225원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "235,225원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 66건)",
              "sampleCount": 66,
              "ev": -1.5968
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 210건)",
              "hitRate": 0.6714,
              "ev": 0.312,
              "sampleCount": 210
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
              "핵심 Gate 미충족: Q1",
              "매매금지(핵심 Gate 미충족: G1, Q1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 242,500 / 60MA 299,920 · 외 1건",
            "statusReason": "G1 미충족: 종가 242,500 / 60MA 299,920 / Q1 미충족: 외인 보유율 8.5% (≥25%) · 20일 수익률 -23.1% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 242500.0,
                "vs52wHighPct": 56.92488262910798,
                "vs52wLowPct": 197.9115479115479,
                "dropFrom52wHighPct": 43.075117370892016,
                "ma20GapPct": -0.3431483346004479,
                "rsi14": 47.57941595746774,
                "volumeRatio20d": 126.30479843327713,
                "rs20Pct": -23.137876386687797,
                "tradingValueRank": 17.0,
                "marketCapRank": 30.0,
                "marketCapTrillion": 23.1132,
                "per": 129.89,
                "pbr": 36.17,
                "cnsPer": 0.0,
                "foreignRate": 8.47,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -14.435606719642365
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "원익IPS",
            "code": "240810",
            "strictScore": 8.7,
            "signalScore": 8.7,
            "score": 8.7,
            "scoreMax": 14.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 7.2,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 22,843주 / 기관 239,418주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +22,843 / 전일 -563,176 · 기관 당일 +239,418 / 전일 +474,439 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "manual_required",
                "note": "마지막 1시간 평균 체결강도 미입력"
              },
              {
                "code": "S4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "manual_required",
                "note": "당일 평균 체결강도 81.3% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +2,229,098주 · 양수 5/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 100.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 132,060 / 20MA 140,510 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 72% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -1.40% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -10.47% / KOSPI -6.37% underperform"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -31.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
                "note": "외인 전일 -563,176/당일 +22,843 · 기관 전일 +474,439/당일 +239,418 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 140,700 / 60MA 131,003",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 74.9% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 23",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 80% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 15.8% (≥25%) · 20일 수익률 -13.8% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,821 / 5MA 7,049 (-3.2%) · VKOSPI 87.1 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 22,843주 / 기관 239,418주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +22,843 / 전일 -563,176 · 기관 당일 +239,418 / 전일 +474,439 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +2,229,098주 · 양수 5/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 100.1% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 72% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.40% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -31.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
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
                "note": "당일 평균 체결강도 81.3% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P2",
                "note": "5MA 132,060 / 20MA 140,510 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -10.47% / KOSPI -6.37% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱 프록시 데이터 부족",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 140700,
            "previousClose": 142700,
            "dailyChange": -2000,
            "dailyChangePct": -1.4,
            "dailyDirection": "down",
            "entryPriceText": "140,700원 (당일 종가 기준)",
            "entryPrice": 140700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 6.9061,
            "marketCapRank": 83,
            "marketCapUniverseCount": 2553,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 22,843주 / 기관 239,418주. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영",
              "마지막 30분 틱 프록시 미반영"
            ],
            "toss": {
              "avgStrength": 81.3,
              "note": "토스 공개 체결강도 81.3% / 최근 체결 110분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-07-16T08:30:07Z",
              "intradayAbove100Ratio": 47.4,
              "observedMinutes": 110,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 110분 프록시"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 87.14, ATR10 13.04%, 일간 표준편차 8.79%, 당일 레인지 14.02%.",
              "metrics": {
                "atrPct10": 13.04,
                "returnStd20": 8.79,
                "todayRangePct": 14.02,
                "vkospi": 87.14
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 2229098.0,
              "positiveDays": 5,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260715",
                    "net": 22843.0
                  },
                  {
                    "date": "20260714",
                    "net": -563176.0
                  },
                  {
                    "date": "20260713",
                    "net": -332993.0
                  },
                  {
                    "date": "20260710",
                    "net": -799594.0
                  },
                  {
                    "date": "20260709",
                    "net": -56844.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260715",
                    "net": 239418.0
                  },
                  {
                    "date": "20260714",
                    "net": 474439.0
                  },
                  {
                    "date": "20260713",
                    "net": 389344.0
                  },
                  {
                    "date": "20260710",
                    "net": 1025652.0
                  },
                  {
                    "date": "20260709",
                    "net": 100245.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260715",
                    "net": 239418.0
                  },
                  {
                    "date": "20260714",
                    "net": 474439.0
                  },
                  {
                    "date": "20260713",
                    "net": 389344.0
                  },
                  {
                    "date": "20260710",
                    "net": 1025652.0
                  },
                  {
                    "date": "20260709",
                    "net": 100245.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +2,229,098주 · 양수 5/5일 · 증가 2회"
            },
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A240810/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 원익IPS (240810) 차트 화면을 엽니다.",
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
                "quantity": "20% 익절",
                "targetYield": "+1.6%",
                "targetPrice": "142,900원",
                "historicalHitRate": 0.6714,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.9%",
                "targetPrice": "144,800원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "148,438원",
                "historicalHitRate": 0.2381,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "151,956원",
                "historicalHitRate": 0.1381,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "156,177원",
                "historicalHitRate": 0.0718,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 137,100원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.6%",
                "targetPrice": "137,100원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260715",
              "anchorOpen": 137100,
              "anchorClose": 142700,
              "anchorVolumeRatio20d": 1.07,
              "anchorStopPrice": 137100,
              "fallbackStopPrice": 136479,
              "effectiveHardStopPrice": 137100,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 137,100원와 기존 % 손절 136,479원 중 더 높은 137,100원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 137,100원를 기준으로 잡고, 기존 % 손절 136,479원보다 느슨해지지 않게 137,100원로 고정합니다."
            },
            "rr": "1 : 2.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 139293,
              "high": 140700,
              "anchor": 140700,
              "label": "139,293~140,700원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 142900,
                "secondaryResistancePrice": 144800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "143,514원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "145,624원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "148,438원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "151,956원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "156,177원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 137,100원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "137,100원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 142900,
                "secondaryResistancePrice": 144800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "142,900원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "144,800원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "148,438원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "151,956원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "156,177원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 137,100원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "137,100원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 66건)",
                "nearestResistancePrice": 142900,
                "secondaryResistancePrice": 144800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.6%",
                    "targetPrice": "142,900원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "144,800원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "148,438원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "151,956원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "156,177원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 137,100원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "137,100원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 66건)",
              "sampleCount": 66,
              "ev": -1.5968
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 210건)",
              "hitRate": 0.6714,
              "ev": 0.312,
              "sampleCount": 210
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
            "statusReasonShort": "Q1 미충족: 외인 보유율 15.8% (≥25%) · 20일 수익률 -13.8% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날)",
            "statusReason": "Q1 미충족: 외인 보유율 15.8% (≥25%) · 20일 수익률 -13.8% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 140700.0,
                "vs52wHighPct": 74.92012779552716,
                "vs52wLowPct": 416.3302752293578,
                "dropFrom52wHighPct": 25.079872204472842,
                "ma20GapPct": 0.13522169240623444,
                "rsi14": 52.360862191623916,
                "volumeRatio20d": 80.14511328925465,
                "rs20Pct": -13.786764705882353,
                "tradingValueRank": 23.0,
                "marketCapRank": 83.0,
                "marketCapTrillion": 6.9061,
                "per": 62.34,
                "pbr": 6.97,
                "cnsPer": 39.7,
                "foreignRate": 15.83,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -31.59234800004547
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "SK이노베이션",
            "code": "096770",
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
                "note": "외인 100,143주 / 기관 317,985주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +100,143 / 전일 -171,419 · 기관 당일 +317,985 / 전일 +205,230 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "마지막 1시간 평균 체결강도 68.8% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "당일 평균 130.0% / 마지막 1시간 68.8% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,124,980주 · 동반 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 120.5% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 111,280 / 20MA 100,725 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 223% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +3.76% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -2.02% / KOSPI -6.37% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.98:1 · 평균 체결강도 66.7% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -6.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 부분 충족"
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
                "note": "외인 전일 -171,419/당일 +100,143 · 기관 전일 +205,230/당일 +317,985 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 121,400 / 60MA 115,695",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 73.1% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 26",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 346% (필요 < 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 14.5% (≥25%) · 20일 수익률 +17.3% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,821 / 5MA 7,049 (-3.2%) · VKOSPI 87.1 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 100,143주 / 기관 317,985주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +100,143 / 전일 -171,419 · 기관 당일 +317,985 / 전일 +205,230 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,124,980주 · 동반 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 111,280 / 20MA 100,725 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +3.76% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -2.02% / KOSPI -6.37% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.98:1 · 평균 체결강도 66.7% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 68.8% (필요 ≥ 100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "S4",
                "note": "당일 평균 130.0% / 마지막 1시간 68.8% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 120.5% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 223% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -6.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 부분 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 121400,
            "previousClose": 117000,
            "dailyChange": 4400,
            "dailyChangePct": 3.76,
            "dailyDirection": "up",
            "entryPriceText": "121,400원 (당일 종가 기준)",
            "entryPrice": 121400,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 20.523,
            "marketCapRank": 35,
            "marketCapUniverseCount": 2553,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 100,143주 / 기관 317,985주 / 마지막 1시간 68.8% · 마지막 30분 틱 2.98:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 130.0,
              "note": "토스 공개 체결강도 130.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-07-16T08:33:05Z",
              "intradayAbove100Ratio": 20.0,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 68.8,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 66.7,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 2.9804,
              "last30BuyVolume": 152.0,
              "last30SellVolume": 51.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 87.14, ATR10 8.00%, 일간 표준편차 5.24%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 8.0,
                "returnStd20": 5.24,
                "todayRangePct": 8.25,
                "vkospi": 87.14
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 1124980.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260715",
                    "net": 100143.0
                  },
                  {
                    "date": "20260714",
                    "net": -171419.0
                  },
                  {
                    "date": "20260713",
                    "net": 120699.0
                  },
                  {
                    "date": "20260710",
                    "net": 4480.0
                  },
                  {
                    "date": "20260709",
                    "net": -44561.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260715",
                    "net": 317985.0
                  },
                  {
                    "date": "20260714",
                    "net": 205230.0
                  },
                  {
                    "date": "20260713",
                    "net": 413959.0
                  },
                  {
                    "date": "20260710",
                    "net": 97944.0
                  },
                  {
                    "date": "20260709",
                    "net": 80520.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260715",
                    "net": 418128.0
                  },
                  {
                    "date": "20260714",
                    "net": 33811.0
                  },
                  {
                    "date": "20260713",
                    "net": 534658.0
                  },
                  {
                    "date": "20260710",
                    "net": 102424.0
                  },
                  {
                    "date": "20260709",
                    "net": 35959.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,124,980주 · 동반 양수 3/5일 · 증가 3회"
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
                "targetYield": "+0.3%",
                "targetPrice": "121,800원",
                "historicalHitRate": 0.6714,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.8%",
                "targetPrice": "124,800원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "128,077원",
                "historicalHitRate": 0.2381,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "131,112원",
                "historicalHitRate": 0.1381,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "134,754원",
                "historicalHitRate": 0.0718,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 117,758원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "117,758원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260715",
              "anchorOpen": 107300,
              "anchorClose": 117000,
              "anchorVolumeRatio20d": 2.01,
              "anchorStopPrice": 107300,
              "fallbackStopPrice": 117758,
              "effectiveHardStopPrice": 117758,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 107,300원와 기존 % 손절 117,758원 중 더 높은 117,758원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 107,300원를 기준으로 잡고, 기존 % 손절 117,758원보다 느슨해지지 않게 117,758원로 고정합니다."
            },
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 120186,
              "high": 121400,
              "anchor": 121400,
              "label": "120,186~121,400원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 121800,
                "secondaryResistancePrice": 124800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "123,828원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "125,649원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "128,077원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "131,112원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "134,754원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 117,758원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "117,758원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 121800,
                "secondaryResistancePrice": 124800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "121,800원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "124,800원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "128,077원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "131,112원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "134,754원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 117,758원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "117,758원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 66건)",
                "nearestResistancePrice": 121800,
                "secondaryResistancePrice": 124800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "121,800원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "124,800원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "128,077원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "131,112원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "134,754원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 117,758원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "117,758원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 66건)",
              "sampleCount": 66,
              "ev": -1.5968
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 210건)",
              "hitRate": 0.6714,
              "ev": 0.312,
              "sampleCount": 210
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
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 346% (필요 < 150%) · 외 1건",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 346% (필요 < 150%) / Q1 미충족: 외인 보유율 14.5% (≥25%) · 20일 수익률 +17.3% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 121400.0,
                "vs52wHighPct": 73.13253012048193,
                "vs52wLowPct": 38.42645381984037,
                "dropFrom52wHighPct": 26.867469879518076,
                "ma20GapPct": 20.526185157607348,
                "rsi14": 63.24863124294701,
                "volumeRatio20d": 346.25821588475594,
                "rs20Pct": 17.294685990338166,
                "tradingValueRank": 26.0,
                "marketCapRank": 35.0,
                "marketCapTrillion": 20.523,
                "per": 0.0,
                "pbr": 0.86,
                "cnsPer": 9.96,
                "foreignRate": 14.49,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -6.645089396077298
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
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
                "note": "외인 587,788주 / 기관 174,502주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +587,788 / 전일 -128,684 · 기관 당일 +174,502 / 전일 +26,340 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 218.9% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 82.9% / 마지막 1시간 218.9% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +983,952주 · 동반 양수 3/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 113.8% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 49,160 / 20MA 46,392 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 90% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -0.94% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 -5.00% / KOSPI -5.73% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 3.95:1 · 평균 체결강도 218.9% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: Q1)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -128,684/당일 +587,788 · 기관 전일 +26,340/당일 +174,502 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 52,800 / 60MA 46,904",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 76.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 25",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 80% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 3.6% (≥25%) · 20일 수익률 +8.4% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 6,867 / 5MA 7,058 (-2.7%) · VKOSPI 87.7 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 587,788주 / 기관 174,502주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +587,788 / 전일 -128,684 · 기관 당일 +174,502 / 전일 +26,340 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 218.9% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 82.9% / 마지막 1시간 218.9% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +983,952주 · 동반 양수 3/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 49,160 / 20MA 46,392 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -0.94% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.00% / KOSPI -5.73% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 3.95:1 · 평균 체결강도 218.9% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 113.8% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 90% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 52800,
            "previousClose": 53300,
            "dailyChange": -500,
            "dailyChangePct": -0.94,
            "dailyDirection": "down",
            "entryPriceText": "52,800원 (당일 종가 기준)",
            "entryPrice": 52800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.7987,
            "marketCapRank": 219,
            "marketCapUniverseCount": 2552,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 587,788주 / 기관 174,502주 / 마지막 1시간 218.9% · 장후반 매수세 강화 · 마지막 30분 틱 3.95:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 82.9,
              "note": "토스 공개 체결강도 82.9% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A475150/order",
              "asOf": "2026-07-16T06:03:44Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 218.9,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 218.9,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 3.9458,
              "last30BuyVolume": 3350.0,
              "last30SellVolume": 849.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 87.71, ATR10 12.57%, 일간 표준편차 10.72%, 당일 레인지 9.57%.",
              "metrics": {
                "atrPct10": 12.57,
                "returnStd20": 10.72,
                "todayRangePct": 9.57,
                "vkospi": 87.71
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 983952.0,
              "positiveDays": 3,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260715",
                    "net": 587788.0
                  },
                  {
                    "date": "20260714",
                    "net": -128684.0
                  },
                  {
                    "date": "20260713",
                    "net": 105600.0
                  },
                  {
                    "date": "20260710",
                    "net": -148762.0
                  },
                  {
                    "date": "20260709",
                    "net": 73773.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260715",
                    "net": 174502.0
                  },
                  {
                    "date": "20260714",
                    "net": 26340.0
                  },
                  {
                    "date": "20260713",
                    "net": 224510.0
                  },
                  {
                    "date": "20260710",
                    "net": 19725.0
                  },
                  {
                    "date": "20260709",
                    "net": 49160.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260715",
                    "net": 762290.0
                  },
                  {
                    "date": "20260714",
                    "net": -102344.0
                  },
                  {
                    "date": "20260713",
                    "net": 330110.0
                  },
                  {
                    "date": "20260710",
                    "net": -129037.0
                  },
                  {
                    "date": "20260709",
                    "net": 122933.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +983,952주 · 동반 양수 3/5일 · 증가 2회"
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
                "targetPrice": "52,900원",
                "historicalHitRate": 0.6714,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.9%",
                "targetPrice": "53,800원",
                "historicalHitRate": 0.381,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "55,704원",
                "historicalHitRate": 0.2381,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "57,024원",
                "historicalHitRate": 0.1381,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "58,608원",
                "historicalHitRate": 0.0718,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 51,216원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "51,216원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260715",
              "anchorOpen": 50200,
              "anchorClose": 53300,
              "anchorVolumeRatio20d": 1.08,
              "anchorStopPrice": 50200,
              "fallbackStopPrice": 51216,
              "effectiveHardStopPrice": 51216,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 50,200원와 기존 % 손절 51,216원 중 더 높은 51,216원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 50,200원를 기준으로 잡고, 기존 % 손절 51,216원보다 느슨해지지 않게 51,216원로 고정합니다."
            },
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 52272,
              "high": 52800,
              "anchor": 52800,
              "label": "52,272~52,800원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 52900,
                "secondaryResistancePrice": 53800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "53,856원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "54,648원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "55,704원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "57,024원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "58,608원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 51,216원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "51,216원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 52900,
                "secondaryResistancePrice": 53800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "52,900원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "53,800원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "55,704원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "57,024원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "58,608원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 51,216원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "51,216원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 63건)",
                "nearestResistancePrice": 52900,
                "secondaryResistancePrice": 53800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "52,900원",
                    "historicalHitRate": 0.6714,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.9%",
                    "targetPrice": "53,800원",
                    "historicalHitRate": 0.381,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "55,704원",
                    "historicalHitRate": 0.2381,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "57,024원",
                    "historicalHitRate": 0.1381,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "58,608원",
                    "historicalHitRate": 0.0718,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 51,216원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "51,216원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 210건)",
                  "hitRate": 0.6714,
                  "ev": 0.312,
                  "sampleCount": 210
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 63건)",
              "sampleCount": 63,
              "ev": -1.2876
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 210건)",
              "hitRate": 0.6714,
              "ev": 0.312,
              "sampleCount": 210
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
            "statusReasonShort": "Q1 미충족: 외인 보유율 3.6% (≥25%) · 20일 수익률 +8.4% (≥0%) · 외인 매집 주체 약함",
            "statusReason": "Q1 미충족: 외인 보유율 3.6% (≥25%) · 20일 수익률 +8.4% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 52800.0,
                "vs52wHighPct": 76.19047619047619,
                "vs52wLowPct": 206.79837303893086,
                "dropFrom52wHighPct": 23.809523809523807,
                "ma20GapPct": 13.811499703615887,
                "rsi14": 57.19329050070215,
                "volumeRatio20d": 80.1704813413864,
                "rs20Pct": 8.41889117043121,
                "tradingValueRank": 25.0,
                "marketCapRank": 219.0,
                "marketCapTrillion": 1.7987,
                "per": 72.43,
                "pbr": 6.65,
                "cnsPer": 61.68,
                "foreignRate": 3.6,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-07-16T15:05:01+09:00",
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
            "name": "신한지주",
            "code": "055550",
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
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -138,493→219,411 / 기관 174,676→-191,536 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 99.0% / 마지막 1시간 160.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 107,900 / 20MA 102,205 (105.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 39% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 97% (필요 ≥ 200%)"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 107900, 전봉 종가 106500 미달"
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
                "note": "시총 51.2조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-08 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-07-06~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +4.7% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -4.8% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 107,900 / 60MA 99,538",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.9% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 4.14)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +5.6% (≤+22%) · RSI14 59 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -138,493→219,411 / 기관 174,676→-191,536 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 99.0% / 마지막 1시간 160.2% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 107,900 / 20MA 102,205 (105.6% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 39% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 97% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.46 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 107900, 전봉 종가 106500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 107900,
            "previousClose": 107300,
            "dailyChange": 600,
            "dailyChangePct": 0.56,
            "dailyDirection": "up",
            "entryPriceText": "107,900원 (당일 종가 기준)",
            "entryPrice": 107900,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 51.2152,
            "marketCapRank": 12,
            "marketCapUniverseCount": 2553,
            "keyPoint": "20일 고점 대비 -4.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-08 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 107900, 전봉 종가 106500",
              "latestOpen": 107900.0,
              "latestClose": 107900.0,
              "previousClose": 106500.0
            },
            "toss": {
              "avgStrength": 99.0,
              "note": "토스 공개 체결강도 99.0% / 최근 체결 28분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A055550/order",
              "asOf": "2026-07-16T08:32:50Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 28,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 28분 프록시",
              "lastHourAvgStrength": 160.2,
              "lastHourObservedMinutes": 28,
              "last30AvgStrength": 160.2,
              "last30ObservedMinutes": 28,
              "last30BuySellRatio": 0.4495,
              "last30BuyVolume": 1032.0,
              "last30SellVolume": 2296.0
            },
            "orderbook": {
              "bidAskRatio": 0.4618,
              "bidTotal": 33334,
              "askTotal": 72178,
              "note": "Naver 호가잔량합계 매수 33,334 / 매도 72,178",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=055550"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.14, ATR10 5.19%, 일간 표준편차 2.65%, 당일 레인지 6.90%.",
              "metrics": {
                "atrPct10": 5.19,
                "returnStd20": 2.65,
                "todayRangePct": 6.9,
                "vkospi": 87.14
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
                "targetPrice": "111,137원",
                "historicalHitRate": 0.6605,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "113,295원",
                "historicalHitRate": 0.5488,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 105,958원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "105,958원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 105000,
              "fallbackStopPrice": 105958,
              "effectiveHardStopPrice": 105958,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 105,000원와 기존 % 손절 105,958원 중 더 높은 105,958원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 105,000원이며, 기존 % 손절 105,958원보다 느슨해지지 않게 105,958원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 106821,
              "high": 107900,
              "anchor": 107900,
              "label": "106,821~107,900원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 113300,
                "retrace33Price": 109682,
                "retrace50Price": 110600,
                "nearestResistancePrice": 108000,
                "secondaryResistancePrice": 109500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "109,842원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "111,137원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "113,300원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 105,958원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "105,958원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 113300,
                "retrace33Price": 109682,
                "retrace50Price": 110600,
                "nearestResistancePrice": 108000,
                "secondaryResistancePrice": 109500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "109,842원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "111,137원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 105,958원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "105,958원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 88건)",
                "recentHighPrice": 113300,
                "retrace33Price": 109682,
                "retrace50Price": 110600,
                "nearestResistancePrice": 108000,
                "secondaryResistancePrice": 109500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "111,137원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "113,295원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 105,958원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "105,958원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 88건)",
              "sampleCount": 88,
              "ev": -0.0991
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 215건)",
              "hitRate": 0.6605,
              "ev": 1.134,
              "sampleCount": 215
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 +4.7% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 +4.7% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -4.8% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -1.9% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 107900.0,
                "vs52wHighPct": 93.17789291882556,
                "vs52wLowPct": 69.65408805031447,
                "dropFrom52wHighPct": 6.822107081174439,
                "ma20GapPct": 5.57213443569297,
                "rsi14": 59.00654203919516,
                "volumeRatio20d": 97.81715833598894,
                "rs20Pct": 7.0436507936507935,
                "tradingValueRank": 39.0,
                "marketCapRank": 12.0,
                "marketCapTrillion": 51.2152,
                "per": 10.29,
                "pbr": 0.86,
                "cnsPer": 8.99,
                "foreignRate": 61.5,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -11.094474125852592
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "하나금융지주",
            "code": "086790",
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
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -84,296→90,450 / 기관 215,470→-21,735 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 111.0% / 마지막 1시간 149.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 136,800 / 20MA 122,705 (111.5% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 39% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 92% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.70 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 136800, 전봉 종가 135500 미달"
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
                "status": "✅",
                "note": "시총 37.5조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-16 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-07-06~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +7.9% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -4.0% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 136,800 / 60MA 122,070",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 +0.0% (필요 -3% 이하 급락 1회 이상)",
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
                "status": "✅",
                "note": "20MA 이격 +11.5% (≤+22%) · RSI14 67 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -84,296→90,450 / 기관 215,470→-21,735 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 111.0% / 마지막 1시간 149.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 136,800 / 20MA 122,705 (111.5% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 39% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 92% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.70 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 136800, 전봉 종가 135500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 136800,
            "previousClose": 136800,
            "dailyChange": 0,
            "dailyChangePct": 0.0,
            "dailyDirection": "flat",
            "entryPriceText": "136,800원 (당일 종가 기준)",
            "entryPrice": 136800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 37.5335,
            "marketCapRank": 19,
            "marketCapUniverseCount": 2553,
            "keyPoint": "20일 고점 대비 -4.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-16 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 136800, 전봉 종가 135500",
              "latestOpen": 136800.0,
              "latestClose": 136800.0,
              "previousClose": 135500.0
            },
            "toss": {
              "avgStrength": 111.0,
              "note": "토스 공개 체결강도 111.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A086790/order",
              "asOf": "2026-07-16T08:33:09Z",
              "intradayAbove100Ratio": 66.7,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 149.1,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 0.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0,
              "last30BuyVolume": 0.0,
              "last30SellVolume": 7.0
            },
            "orderbook": {
              "bidAskRatio": 0.6993,
              "bidTotal": 13707,
              "askTotal": 19602,
              "note": "Naver 호가잔량합계 매수 13,707 / 매도 19,602",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=086790"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.14, ATR10 5.42%, 일간 표준편차 2.71%, 당일 레인지 6.80%.",
              "metrics": {
                "atrPct10": 5.42,
                "returnStd20": 2.71,
                "todayRangePct": 6.8,
                "vkospi": 87.14
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
                "targetPrice": "140,904원",
                "historicalHitRate": 0.6605,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "143,640원",
                "historicalHitRate": 0.5488,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 134,338원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "134,338원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 133200,
              "fallbackStopPrice": 134338,
              "effectiveHardStopPrice": 134338,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 133,200원와 기존 % 손절 134,338원 중 더 높은 134,338원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 133,200원이며, 기존 % 손절 134,338원보다 느슨해지지 않게 134,338원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 135432,
              "high": 136800,
              "anchor": 136800,
              "label": "135,432~136,800원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 142500,
                "retrace33Price": 138681,
                "retrace50Price": 139650,
                "nearestResistancePrice": 137600,
                "secondaryResistancePrice": 139800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "139,262원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "140,904원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.2%",
                    "targetPrice": "142,500원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 134,338원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "134,338원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 142500,
                "retrace33Price": 138681,
                "retrace50Price": 139650,
                "nearestResistancePrice": 137600,
                "secondaryResistancePrice": 139800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "139,262원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "140,904원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 134,338원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "134,338원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 88건)",
                "recentHighPrice": 142500,
                "retrace33Price": 138681,
                "retrace50Price": 139650,
                "nearestResistancePrice": 137600,
                "secondaryResistancePrice": 139800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "140,904원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "143,640원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 134,338원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "134,338원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 88건)",
              "sampleCount": 88,
              "ev": -0.0991
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 215건)",
              "hitRate": 0.6605,
              "ev": 1.134,
              "sampleCount": 215
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
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +7.9% (필요 ≥ +15%) · 외 3건",
            "statusReason": "G1 미충족: 1개월 수익률 +7.9% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -4.0% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 +0.0% (필요 -3% 이하 급락 1회 이상) / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 136800.0,
                "vs52wHighPct": 96.0,
                "vs52wLowPct": 69.93788819875778,
                "dropFrom52wHighPct": 4.0,
                "ma20GapPct": 11.486899474349048,
                "rsi14": 66.54972474353283,
                "volumeRatio20d": 119.68059614400953,
                "rs20Pct": 8.485329103885805,
                "tradingValueRank": 40.0,
                "marketCapRank": 19.0,
                "marketCapTrillion": 37.5335,
                "per": 9.43,
                "pbr": 0.81,
                "cnsPer": 8.4,
                "foreignRate": 68.42,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 17.63783971739141
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "원익IPS",
            "code": "240810",
            "strictScore": 5.2,
            "signalScore": 5.2,
            "score": 5.2,
            "scoreMax": 10.0,
            "effectiveScoreMax": 8.0,
            "gradeScore": 6.5,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -563,176→22,843 / 기관 474,439→239,418 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 81.3% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 140,700 / 20MA 140,510 (100.1% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "note": "당일 거래량 / 5일 평균 72% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.83 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 140700, 전봉 종가 142900 미달"
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
                "note": "당일 거래대금 순위 23위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 6.9조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-07-16까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-07-06~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 -13.0% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -25.1% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 140,700 / 60MA 131,003",
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
                "note": "20MA 이격 +0.1% (≤+22%) · RSI14 52 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -563,176→22,843 / 기관 474,439→239,418 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 140,700 / 20MA 140,510 (100.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 63% (필요 ≥ 50%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 81.3% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 72% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.83 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 140700, 전봉 종가 142900 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 140700,
            "previousClose": 142700,
            "dailyChange": -2000,
            "dailyChangePct": -1.4,
            "dailyDirection": "down",
            "entryPriceText": "140,700원 (당일 종가 기준)",
            "entryPrice": 140700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 6.9061,
            "marketCapRank": 83,
            "marketCapUniverseCount": 2553,
            "keyPoint": "20일 고점 대비 -25.1% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A240810/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 원익IPS (240810) 차트 화면을 엽니다.",
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
              "note": "KIND 최근공시 2026-07-16까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 140700, 전봉 종가 142900",
              "latestOpen": 140700.0,
              "latestClose": 140700.0,
              "previousClose": 142900.0
            },
            "toss": {
              "avgStrength": 81.3,
              "note": "토스 공개 체결강도 81.3% / 최근 체결 110분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-07-16T08:30:07Z",
              "intradayAbove100Ratio": 47.4,
              "observedMinutes": 110,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 110분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 0.835,
              "bidTotal": 12391,
              "askTotal": 14840,
              "note": "Naver 호가잔량합계 매수 12,391 / 매도 14,840",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.14, ATR10 13.04%, 일간 표준편차 8.79%, 당일 레인지 14.02%.",
              "metrics": {
                "atrPct10": 13.04,
                "returnStd20": 8.79,
                "todayRangePct": 14.02,
                "vkospi": 87.14
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.9%",
                "targetPrice": "144,800원",
                "historicalHitRate": 0.6605,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "147,735원",
                "historicalHitRate": 0.5488,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 138,167원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "138,167원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 128100,
              "fallbackStopPrice": 138167,
              "effectiveHardStopPrice": 138167,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 128,100원와 기존 % 손절 138,167원 중 더 높은 138,167원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 128,100원이며, 기존 % 손절 138,167원보다 느슨해지지 않게 138,167원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 2.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 139293,
              "high": 140700,
              "anchor": 140700,
              "label": "139,293~140,700원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 187800,
                "retrace33Price": 156243,
                "retrace50Price": 164250,
                "nearestResistancePrice": 144800,
                "secondaryResistancePrice": 148100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "144,800원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.3%",
                    "targetPrice": "148,100원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+33.5%",
                    "targetPrice": "187,800원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 138,167원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "138,167원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 187800,
                "retrace33Price": 156243,
                "retrace50Price": 164250,
                "nearestResistancePrice": 144800,
                "secondaryResistancePrice": 148100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "144,800원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.3%",
                    "targetPrice": "148,100원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 138,167원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "138,167원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 88건)",
                "recentHighPrice": 187800,
                "retrace33Price": 156243,
                "retrace50Price": 164250,
                "nearestResistancePrice": 144800,
                "secondaryResistancePrice": 148100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "144,800원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "147,735원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 138,167원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "138,167원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 88건)",
              "sampleCount": 88,
              "ev": -0.0991
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 215건)",
              "hitRate": 0.6605,
              "ev": 1.134,
              "sampleCount": 215
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
            "statusReasonShort": "G1 미충족: 1개월 수익률 -13.0% (필요 ≥ +15%) · 외 2건",
            "statusReason": "G1 미충족: 1개월 수익률 -13.0% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -25.1% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -1.4% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 140700.0,
                "vs52wHighPct": 74.92012779552716,
                "vs52wLowPct": 416.3302752293578,
                "dropFrom52wHighPct": 25.079872204472842,
                "ma20GapPct": 0.13522169240623444,
                "rsi14": 52.360862191623916,
                "volumeRatio20d": 80.14511328925465,
                "rs20Pct": -13.786764705882353,
                "tradingValueRank": 23.0,
                "marketCapRank": 83.0,
                "marketCapTrillion": 6.9061,
                "per": 62.34,
                "pbr": 6.97,
                "cnsPer": 39.7,
                "foreignRate": 15.83,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -31.59234800004547
              },
              "evaluatedAt": "2026-07-16T17:34:16+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
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
                "note": "외인 -171,419→100,143 / 기관 205,230→317,985 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 133.0% / 마지막 1시간 187.6% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 121,600 / 20MA 100,735 (120.7% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 211% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.24 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 122800, 전봉 종가 124200 미달"
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
                "note": "당일 거래대금 순위 24위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 20.6조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-07-15까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-07-06~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +11.6% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -4.0% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 121,600 / 60MA 115,698",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -4.8% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +20.7% (≤+22%) · RSI14 63 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -171,419→100,143 / 기관 205,230→317,985 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 133.0% / 마지막 1시간 187.6% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 121,600 / 20MA 100,735 (120.7% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 211% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.24 (필요 ≥ 1.0) · 하방 흡수 확인",
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
                "code": "C3",
                "note": "직전 30분봉 종가 122800, 전봉 종가 124200 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 121600,
            "previousClose": 117000,
            "dailyChange": 4600,
            "dailyChangePct": 3.93,
            "dailyDirection": "up",
            "entryPriceText": "121,600원 (당일 종가 기준)",
            "entryPrice": 121600,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 20.5568,
            "marketCapRank": 35,
            "marketCapUniverseCount": 2552,
            "keyPoint": "20일 고점 대비 -4.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-15까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 122800, 전봉 종가 124200",
              "latestOpen": 124200.0,
              "latestClose": 122800.0,
              "previousClose": 124200.0
            },
            "toss": {
              "avgStrength": 133.0,
              "note": "토스 공개 체결강도 133.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A096770/order",
              "asOf": "2026-07-16T06:03:45Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 187.6,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 187.6,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.9055,
              "last30BuyVolume": 1035.0,
              "last30SellVolume": 1143.0
            },
            "orderbook": {
              "bidAskRatio": 2.243,
              "bidTotal": 5870,
              "askTotal": 2617,
              "note": "Naver 호가잔량합계 매수 5,870 / 매도 2,617",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=096770"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.71, ATR10 8.00%, 일간 표준편차 5.25%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 8.0,
                "returnStd20": 5.25,
                "todayRangePct": 8.25,
                "vkospi": 87.71
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
                "targetPrice": "125,248원",
                "historicalHitRate": 0.6605,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 1 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+4.2%",
                "targetPrice": "126,650원",
                "historicalHitRate": 0.5488,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 119,411원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "119,411원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 117000,
              "fallbackStopPrice": 119411,
              "effectiveHardStopPrice": 119411,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 117,000원와 기존 % 손절 119,411원 중 더 높은 119,411원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 117,000원이며, 기존 % 손절 119,411원보다 느슨해지지 않게 119,411원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 120384,
              "high": 121600,
              "anchor": 121600,
              "label": "120,384~121,600원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 126650,
                "retrace33Price": 123266,
                "retrace50Price": 124125,
                "nearestResistancePrice": 126650,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.2%",
                    "targetPrice": "126,650원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.2%",
                    "targetPrice": "126,650원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.2%",
                    "targetPrice": "126,650원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 119,411원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "119,411원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 126650,
                "retrace33Price": 123266,
                "retrace50Price": 124125,
                "nearestResistancePrice": 126650,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.2%",
                    "targetPrice": "126,650원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.2%",
                    "targetPrice": "126,650원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 119,411원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "119,411원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 82건)",
                "recentHighPrice": 126650,
                "retrace33Price": 123266,
                "retrace50Price": 124125,
                "nearestResistancePrice": 126650,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "125,248원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.2%",
                    "targetPrice": "126,650원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 119,411원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "119,411원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 82건)",
              "sampleCount": 82,
              "ev": 0.3697
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 215건)",
              "hitRate": 0.6605,
              "ev": 1.134,
              "sampleCount": 215
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
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +11.6% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 +11.6% (필요 ≥ +15%) / G2 미충족: 20일 고점 대비 -4.0% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 121600.0,
                "vs52wHighPct": 73.25301204819277,
                "vs52wLowPct": 38.65450399087799,
                "dropFrom52wHighPct": 26.746987951807228,
                "ma20GapPct": 20.712761205142204,
                "rsi14": 63.36502133926768,
                "volumeRatio20d": 327.1156846869006,
                "rs20Pct": 17.48792270531401,
                "tradingValueRank": 24.0,
                "marketCapRank": 35.0,
                "marketCapTrillion": 20.5568,
                "per": 0.0,
                "pbr": 0.86,
                "cnsPer": 9.98,
                "foreignRate": 14.49,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -6.645089396077298
              },
              "evaluatedAt": "2026-07-16T15:05:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 5,
            "name": "KB금융",
            "code": "105560",
            "strictScore": 6.5,
            "signalScore": 6.5,
            "score": 6.5,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.5,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -182,659→284,339 / 기관 171,842→-273,036 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 100.0% / 마지막 1시간 129.4% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 180,150 / 20MA 166,358 (108.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 26% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.60 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 180400, 전봉 종가 183000 미달"
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
                "status": "✅",
                "note": "시총 63.9조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-07-09 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 2건 · 손절 없음 (최근: 2026-07-13) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +9.8% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -7.4% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 180,150 / 60MA 160,751",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -3.3% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +8.3% (≤+22%) · RSI14 63 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -182,659→284,339 / 기관 171,842→-273,036 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 100.0% / 마지막 1시간 129.4% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 180,150 / 20MA 166,358 (108.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.60 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 26% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 48% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 180400, 전봉 종가 183000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 180150,
            "previousClose": 181600,
            "dailyChange": -1450,
            "dailyChangePct": -0.8,
            "dailyDirection": "down",
            "entryPriceText": "180,150원 (당일 종가 기준)",
            "entryPrice": 180150,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 63.897,
            "marketCapRank": 9,
            "marketCapUniverseCount": 2552,
            "keyPoint": "20일 고점 대비 -7.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-09 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 180400, 전봉 종가 183000",
              "latestOpen": 183000.0,
              "latestClose": 180400.0,
              "previousClose": 183000.0
            },
            "toss": {
              "avgStrength": 100.0,
              "note": "토스 공개 체결강도 100.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A105560/order",
              "asOf": "2026-07-16T06:03:45Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 129.4,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 129.4,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.6197,
              "last30BuyVolume": 988.0,
              "last30SellVolume": 610.0
            },
            "orderbook": {
              "bidAskRatio": 2.6023,
              "bidTotal": 1551,
              "askTotal": 596,
              "note": "Naver 호가잔량합계 매수 1,551 / 매도 596",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=105560"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.71, ATR10 5.24%, 일간 표준편차 2.59%, 당일 레인지 5.51%.",
              "metrics": {
                "atrPct10": 5.24,
                "returnStd20": 2.59,
                "todayRangePct": 5.51,
                "vkospi": 87.71
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
                "targetPrice": "184,886원",
                "historicalHitRate": 0.6605,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "하락폭 50% 되돌림 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+4.0%",
                "targetPrice": "187,325원",
                "historicalHitRate": 0.5488,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 177,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.5%",
                "targetPrice": "177,500원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 177500,
              "fallbackStopPrice": 176907,
              "effectiveHardStopPrice": 177500,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 177,500원와 기존 % 손절 176,907원 중 더 높은 177,500원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 177,500원이며, 기존 % 손절 176,907원보다 느슨해지지 않게 177,500원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 178348,
              "high": 180150,
              "anchor": 180150,
              "label": "178,348~180,150원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 194500,
                "retrace33Price": 184886,
                "retrace50Price": 187325,
                "nearestResistancePrice": 185200,
                "secondaryResistancePrice": 187500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "184,886원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "187,325원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+8.0%",
                    "targetPrice": "194,500원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 177,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "177,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 194500,
                "retrace33Price": 184886,
                "retrace50Price": 187325,
                "nearestResistancePrice": 185200,
                "secondaryResistancePrice": 187500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "184,886원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "187,325원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 177,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "177,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 82건)",
                "recentHighPrice": 194500,
                "retrace33Price": 184886,
                "retrace50Price": 187325,
                "nearestResistancePrice": 185200,
                "secondaryResistancePrice": 187500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "184,886원",
                    "historicalHitRate": 0.6605,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "187,325원",
                    "historicalHitRate": 0.5488,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 177,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.5%",
                    "targetPrice": "177,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 215건)",
                  "hitRate": 0.6605,
                  "ev": 1.134,
                  "sampleCount": 215
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 82건)",
              "sampleCount": 82,
              "ev": 0.3697
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 215건)",
              "hitRate": 0.6605,
              "ev": 1.134,
              "sampleCount": 215
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
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +9.8% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 +9.8% (필요 ≥ +15%) / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 180150.0,
                "vs52wHighPct": 91.96018376722817,
                "vs52wLowPct": 73.22115384615384,
                "dropFrom52wHighPct": 8.039816232771821,
                "ma20GapPct": 8.290879581623912,
                "rsi14": 62.6990810996469,
                "volumeRatio20d": 63.07375579093606,
                "rs20Pct": 10.453709380748007,
                "tradingValueRank": 29.0,
                "marketCapRank": 9.0,
                "marketCapTrillion": 63.897,
                "per": 11.39,
                "pbr": 1.08,
                "cnsPer": 9.86,
                "foreignRate": 79.39,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -13.365824841234678
              },
              "evaluatedAt": "2026-07-16T15:05:01+09:00",
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
  "analysisDate": "2026-07-16",
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
      "042660",
      "042700",
      "096770",
      "240810"
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
        "code": "042700",
        "name": "한미반도체",
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
        "strategy": "pullback",
        "code": "240810",
        "name": "원익IPS",
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
        "code": "042700",
        "name": "한미반도체",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 7.9,
          "signalScore": 7.9,
          "score": 7.9,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.6,
          "grade": "B"
        },
        "after": {
          "strictScore": 8.7,
          "signalScore": 8.7,
          "score": 8.7,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 6.2,
          "grade": "B"
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
          "strictScore": 7.9,
          "signalScore": 7.9,
          "score": 7.9,
          "scoreMax": 14.0,
          "effectiveScoreMax": 12.0,
          "gradeScore": 6.6,
          "grade": "B"
        },
        "after": {
          "strictScore": 8.7,
          "signalScore": 8.7,
          "score": 8.7,
          "scoreMax": 14.0,
          "effectiveScoreMax": 12.0,
          "gradeScore": 7.2,
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
          "strictScore": 7.9,
          "signalScore": 7.9,
          "score": 7.9,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.6,
          "grade": "B"
        },
        "after": {
          "strictScore": 8.3,
          "signalScore": 8.3,
          "score": 8.3,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.9,
          "grade": "B"
        }
      },
      {
        "strategy": "breakout",
        "code": "096770",
        "name": "SK이노베이션",
        "changedFields": [
          "signalScore",
          "score"
        ],
        "before": {
          "strictScore": 4.6,
          "signalScore": 5.4,
          "score": 5.4,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.7,
          "grade": "C"
        },
        "after": {
          "strictScore": 4.6,
          "signalScore": 4.6,
          "score": 4.6,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.7,
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
