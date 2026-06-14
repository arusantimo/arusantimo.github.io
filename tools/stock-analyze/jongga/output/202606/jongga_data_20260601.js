window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-01"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-08T13:05:13+00:00",
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
        "ok": 65
      },
      "naver_chart": {
        "ok": 65
      },
      "naver_integration_schedule": {
        "ok": 1
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
        "durationMs": 1843.6,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1410.6,
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
        "durationMs": 73.0,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 150.9,
        "detail": "박스권 ⚠️"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 3477.7,
        "count": 65
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 4347.7,
        "detail": "성공 65 / 실패 0",
        "count": 65
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 2501.0,
        "detail": "direct-http · 체결강도 65 / 호가 64 / 틱프록시 65",
        "count": 65
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 184.5,
        "detail": "pullback 3, breakout 1, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 14270.1,
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
            "value": "G-E 🔴 (-10.0점)"
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
            "actualValue": "-3.76%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+18.82",
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
            "actualValue": "+14.96원",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
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
        "totalScore": "-10.0점",
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
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 6.2,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 2,880,306주 / 기관 3,295,009주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 349,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 319,500 ≤ 종가 349,000)"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.5,
                "evalStatus": "not_met",
                "note": "52주 고가 대비 -7.4% (≥12% 만점·8~12% 부분) · 미충족"
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
                "note": "거래량 135% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G5, G7, Q1, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 160% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 314,300 > 20MA 283,500 > 60MA 226,928 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 349,000 / 60MA 226,928",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 81.9 (필요 ≥ 50)",
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
                "note": "당일 등락 +10.09% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 81.9 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +23.1% (필요 ≤ +25%) · 60MA +53.8% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -7.4% (≥12%) · 거래량 135% (≥80%) · 수급추세 +2 (≥0) · 얕은 조정(고가권 추격)",
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
                "note": "당일 거래량 / 앵커 거래량 85% · 시가 319,500 / 종가 349,000 / 전일 종가 317,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 349,000 / 앵커 중심값 260,000 / 복합 지지 280,740 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 0.05:1 / 마지막 30분 평균 221.1% / 마지막 1시간 225.0% · 장 막판 투매 경고",
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
                "note": "당일 거래대금 순위 2위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 2,880,306주 / 기관 3,295,009주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "당일 평균 111.0% / 마지막 1시간 225.0% / 마지막 30분 비율 0.05:1 / 마지막 30분 평균 221.1% · 장후반 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 349,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "P3",
                "note": "앵커 중심값 260,000 / 저가 319,500 / 종가 349,000 · 종가 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 319,500 ≤ 종가 349,000)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +11.25% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 135% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "저가 319,500 · 이평선 터치: 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 157% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 85% · 거래량 수축 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -7.4% (≥12% 만점·8~12% 부분) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 349000,
            "previousClose": 317000,
            "dailyChange": 32000,
            "dailyChangePct": 10.09,
            "dailyDirection": "up",
            "entryPriceText": "349,000원 (당일 종가 기준)",
            "entryPrice": 349000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1885.4249,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 2,880,306주 / 기관 3,295,009주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 280,740원 (19.56% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 280740,
                    "distancePct": 19.56,
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
                    "lastSeenDaysAgo": 9,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 261750,
                    "distancePct": 25.0,
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
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 192922,
                    "distancePct": 44.72,
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
                    "lastSeenDaysAgo": 36,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 186524,
                    "distancePct": 46.55,
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
                    "lastSeenDaysAgo": 38,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 167158,
                    "distancePct": 52.1,
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
                    "lastSeenDaysAgo": 41,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 280740,
                  "distancePct": 19.56,
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
                  "lastSeenDaysAgo": 9,
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
                    "price": 167167,
                    "distancePct": 52.1,
                    "count": 2,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 167000,
                    "bandHigh": 167300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 172033,
                    "distancePct": 50.71,
                    "count": 3,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 170600,
                    "bandHigh": 173500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 178589,
                    "distancePct": 48.83,
                    "count": 7,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 175000,
                    "bandHigh": 181000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 186518,
                    "distancePct": 46.56,
                    "count": 11,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 182700,
                    "bandHigh": 189000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 191500,
                    "distancePct": 45.13,
                    "count": 7,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 189600,
                    "bandHigh": 193900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 199544,
                    "distancePct": 42.82,
                    "count": 6,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 196500,
                    "bandHigh": 202000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 206214,
                    "distancePct": 40.91,
                    "count": 5,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 204000,
                    "bandHigh": 208500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 211000,
                    "distancePct": 39.54,
                    "count": 4,
                    "lastSeenDaysAgo": 27,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 210000,
                    "bandHigh": 213000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 216923,
                    "distancePct": 37.84,
                    "count": 9,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 214500,
                    "bandHigh": 219500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 222500,
                    "distancePct": 36.25,
                    "count": 5,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 220500,
                    "bandHigh": 224500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 261500,
                    "distancePct": 25.07,
                    "count": 5,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 260000,
                    "bandHigh": 263500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 267167,
                    "distancePct": 23.45,
                    "count": 5,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 266000,
                    "bandHigh": 270500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 274333,
                    "distancePct": 21.39,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 271500,
                    "bandHigh": 276000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 281200,
                    "distancePct": 19.43,
                    "count": 5,
                    "lastSeenDaysAgo": 9,
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
                    "price": 286667,
                    "distancePct": 17.86,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 285500,
                    "bandHigh": 287500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 294500,
                    "distancePct": 15.62,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 292000,
                    "bandHigh": 297500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 299333,
                    "distancePct": 14.23,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 299000,
                    "bandHigh": 299500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 306167,
                    "distancePct": 12.27,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 305500,
                    "bandHigh": 307000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 318250,
                    "distancePct": 8.81,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 317000,
                    "bandHigh": 319500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 167150,
                    "distancePct": 52.11,
                    "count": 2,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 167000,
                    "bandHigh": 167300
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 262000,
                    "distancePct": 24.93,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 262000,
                    "bandHigh": 262000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 186531,
                    "distancePct": 46.55,
                    "count": 9,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 25,
                    "volume": 231119590,
                    "binIndex": 2,
                    "binLow": 182625,
                    "binHigh": 190438
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 194344,
                    "distancePct": 44.31,
                    "count": 6,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 25,
                    "volume": 173050482,
                    "binIndex": 3,
                    "binLow": 190438,
                    "binHigh": 198250
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 280281,
                    "distancePct": 19.69,
                    "count": 4,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 25,
                    "volume": 148381984,
                    "binIndex": 14,
                    "binLow": 276375,
                    "binHigh": 284188
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 251000,
                    "distancePct": 28.08,
                    "count": 1,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 222.9,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 160% (17일 전)",
                "burstCount": 0,
                "maxRatioPct": 159.6,
                "latestBurstDaysAgo": null
              },
              "anchor": {
                "date": "20260506",
                "open": 254000,
                "close": 266000,
                "high": 270000,
                "low": 251000,
                "bodyMid": 260000,
                "volume": 53097996.0,
                "volumeRatio": 2.23,
                "daysAgo": 17
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 85% · 시가 319,500 / 종가 349,000 / 전일 종가 317,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 349,000 / 앵커 중심값 260,000 / 복합 지지 280,740 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.05:1 / 마지막 30분 평균 221.1% / 마지막 1시간 225.0% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 6.71%, 일간 표준편차 5.16%, 당일 레인지 11.04%.",
              "metrics": {
                "atrPct10": 6.71,
                "returnStd20": 5.16,
                "todayRangePct": 11.04,
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
                    "KIND 공시에서 삼성전자 (005930) 종목 공시를 조회합니다.",
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
              "anchorDate": "20260506",
              "anchorOpen": 254000,
              "anchorClose": 266000,
              "anchorHigh": 270000,
              "anchorLow": 251000,
              "anchorBodyMid": 260000,
              "anchorVolumeRatio": 2.23,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 260000,
              "ma10Price": 299600,
              "ma10PrevPrice": 291750,
              "ma20Price": 283500,
              "ma20PrevPrice": 277350,
              "ma10WarningPrice": null,
              "hardStopPrice": 283500,
              "fallbackStopPrice": 340275,
              "effectiveStopPrice": 340275,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 260,000원, 20일선 283,500원) = 283,500원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 340,275원) = 340,275원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 260,000원, 20일선 283,500원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 340,275원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "355,980원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "359,470원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "364,705원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "369,940원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 340,275원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "340,275원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 345510,
              "high": 349000,
              "anchor": 349000,
              "label": "345,510~349,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "355,980원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "359,470원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "364,705원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "369,940원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 340,275원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "340,275원"
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
                    "targetPrice": "355,980원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "359,470원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "364,705원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "369,940원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 340,275원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "340,275원"
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
                    "targetPrice": "355,980원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "359,470원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "364,705원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "369,940원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 340,275원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "340,275원"
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
              "핵심 Gate 미충족: G0",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "핵심 Gate 미충족: G7",
              "핵심 Gate 미충족: Q1",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G0, G5, G7, Q1, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 160% (필요 ≥ 200%) · 외 4건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 160% (필요 ≥ 200%) / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / G7 미충족: 주봉 RSI 81.9 (필요 ≤ 80) · 과매수 과열 / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 349000.0,
                "vs52wHighPct": 92.57294429708223,
                "vs52wLowPct": 513.3567662565905,
                "dropFrom52wHighPct": 7.427055702917771,
                "ma20GapPct": 23.10405643738977,
                "rsi14": 75.96135888438127,
                "volumeRatio20d": 135.42666261455193,
                "rs20Pct": 54.424778761061944,
                "supportDistancePct": 19.56,
                "tradingValueRank": 2.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 1885.4249,
                "per": 26.07,
                "pbr": 4.48,
                "cnsPer": 7.36,
                "foreignRate": 47.58,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T18:00:05+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 2,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 6.6,
            "signalScore": 6.6,
            "score": 6.6,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 5.7,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -513,309주 / 기관 716,022주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,256,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 1,249,000 ≤ 종가 1,256,000)"
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
                "strictPoints": 1.25,
                "signalPoints": 1.25,
                "maxPoints": 2.5,
                "evalStatus": "met",
                "note": "52주 고가 대비 -11.7% (≥12% 만점·8~12% 부분) · 부분 충족"
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
                "note": "거래량 109% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G5, G8, Q1)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 161% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 1,236,600 > 20MA 1,128,950 > 60MA 777,867 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,256,000 / 60MA 777,867",
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
                "status": "⛔",
                "note": "KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.87% (필요 ≤ +12%)",
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
                "note": "이격 20MA +11.3% (필요 ≤ +25%) · 60MA +61.5% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -11.7% (≥12%) · 거래량 109% (≥80%) · 수급추세 +0 (≥0) · 얕은 조정(고가권 추격)",
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
                "note": "당일 거래량 / 앵커 거래량 77% · 시가 1,249,000 / 종가 1,256,000 / 전일 종가 1,233,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 1,256,000 / 앵커 중심값 950,000 / 복합 지지 1,132,010 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 14.00:1 / 마지막 30분 평균 300.0% / 마지막 1시간 253.2% · 장 막판 매수세 유지",
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
                "note": "당일 거래대금 순위 6위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -513,309주 / 기관 716,022주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "당일 평균 112.0% / 마지막 1시간 253.2% / 마지막 30분 비율 14.00:1 / 마지막 30분 평균 300.0% · 장후반 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,210,000 · 이평선 터치: 5MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,256,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "P3",
                "note": "앵커 중심값 950,000 / 저가 1,210,000 / 종가 1,256,000 · 종가 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,249,000 ≤ 종가 1,256,000)",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 109% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 111% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +3.93% / KOSPI +4.63% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 77% · 거래량 수축 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -11.7% (≥12% 만점·8~12% 부분) · 부분 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +0 (≥+2 만점·+1 부분) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1256000,
            "previousClose": 1233000,
            "dailyChange": 23000,
            "dailyChangePct": 1.87,
            "dailyDirection": "up",
            "entryPriceText": "1,256,000원 (당일 종가 기준)",
            "entryPrice": 1256000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 179.1995,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -513,309주 / 기관 716,022주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 112.0,
              "note": "토스 공개 체결강도 112.0% / 최근 체결 34분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 34,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 34분 프록시",
              "lastHourAvgStrength": 253.2,
              "lastHourObservedMinutes": 34,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 14.0,
              "last30BuyVolume": 14.0,
              "last30SellVolume": 0.0
            },
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,132,010원 (9.87% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1132010,
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
                    "count": 6,
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 1097740,
                    "distancePct": 12.6,
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
                    "lastSeenDaysAgo": 9,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 552427,
                    "distancePct": 56.02,
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
                    "lastSeenDaysAgo": 32,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1265333,
                    "distancePct": -0.74,
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
                  },
                  {
                    "label": "수평 지지",
                    "price": 1235000,
                    "distancePct": 1.67,
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
                  "price": 1132010,
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
                  "count": 6,
                  "lastSeenDaysAgo": 6,
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
                    "price": 465550,
                    "distancePct": 62.93,
                    "count": 3,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 460000,
                    "bandHigh": 469500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 485000,
                    "distancePct": 61.39,
                    "count": 5,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 480000,
                    "bandHigh": 488500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 500000,
                    "distancePct": 60.19,
                    "count": 3,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 499000,
                    "bandHigh": 501000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 512000,
                    "distancePct": 59.24,
                    "count": 3,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 509000,
                    "bandHigh": 517000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 520750,
                    "distancePct": 58.54,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 520500,
                    "bandHigh": 521000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 534250,
                    "distancePct": 57.46,
                    "count": 4,
                    "lastSeenDaysAgo": 47,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 532000,
                    "bandHigh": 536000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 553500,
                    "distancePct": 55.93,
                    "count": 11,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 544000,
                    "bandHigh": 560000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 565000,
                    "distancePct": 55.02,
                    "count": 5,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 562000,
                    "bandHigh": 568000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 581250,
                    "distancePct": 53.72,
                    "count": 3,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 578000,
                    "bandHigh": 587000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 601250,
                    "distancePct": 52.13,
                    "count": 6,
                    "lastSeenDaysAgo": 31,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 595000,
                    "bandHigh": 608000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 663333,
                    "distancePct": 47.19,
                    "count": 2,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 661000,
                    "bandHigh": 665000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 695800,
                    "distancePct": 44.6,
                    "count": 4,
                    "lastSeenDaysAgo": 25,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 690000,
                    "bandHigh": 704000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 720167,
                    "distancePct": 42.66,
                    "count": 4,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 712000,
                    "bandHigh": 728000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 793000,
                    "distancePct": 36.86,
                    "count": 3,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 789000,
                    "bandHigh": 797000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 837000,
                    "distancePct": 33.36,
                    "count": 2,
                    "lastSeenDaysAgo": 19,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 830000,
                    "bandHigh": 841000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 988333,
                    "distancePct": 21.31,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 983000,
                    "bandHigh": 991000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1019000,
                    "distancePct": 18.87,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1008000,
                    "bandHigh": 1029000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1045000,
                    "distancePct": 16.8,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1040000,
                    "bandHigh": 1048000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1072000,
                    "distancePct": 14.65,
                    "count": 3,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1071000,
                    "bandHigh": 1073000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1096000,
                    "distancePct": 12.74,
                    "count": 6,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1089000,
                    "bandHigh": 1099000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1128000,
                    "distancePct": 10.19,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1126000,
                    "bandHigh": 1130000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1152000,
                    "distancePct": 8.28,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1147000,
                    "bandHigh": 1161000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1180857,
                    "distancePct": 5.98,
                    "count": 7,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1171000,
                    "bandHigh": 1190000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1213500,
                    "distancePct": 3.38,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1210000,
                    "bandHigh": 1217000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1235000,
                    "distancePct": 1.67,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1233000,
                    "bandHigh": 1237000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1265333,
                    "distancePct": -0.74,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1256000,
                    "bandHigh": 1276000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 551354,
                    "distancePct": 56.1,
                    "count": 9,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 25,
                    "volume": 4841946,
                    "binIndex": 2,
                    "binLow": 533083,
                    "binHigh": 569625
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1136021,
                    "distancePct": 9.55,
                    "count": 4,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "volume": 4283021,
                    "binIndex": 18,
                    "binLow": 1117750,
                    "binHigh": 1154292
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1099479,
                    "distancePct": 12.46,
                    "count": 3,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 25,
                    "volume": 3529137,
                    "binIndex": 17,
                    "binLow": 1081208,
                    "binHigh": 1117750
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 901000,
                    "distancePct": 28.26,
                    "count": 1,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 284.3,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 161% (17일 전)",
                "burstCount": 0,
                "maxRatioPct": 160.8,
                "latestBurstDaysAgo": null
              },
              "anchor": {
                "date": "20260504",
                "open": 909000,
                "close": 991000,
                "high": 998000,
                "low": 901000,
                "bodyMid": 950000,
                "volume": 1472464.0,
                "volumeRatio": 2.84,
                "daysAgo": 18
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 77% · 시가 1,249,000 / 종가 1,256,000 / 전일 종가 1,233,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 1,256,000 / 앵커 중심값 950,000 / 복합 지지 1,132,010 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 14.00:1 / 마지막 30분 평균 300.0% / 마지막 1시간 253.2% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 8.16%, 일간 표준편차 6.39%, 당일 레인지 6.41%.",
              "metrics": {
                "atrPct10": 8.16,
                "returnStd20": 6.39,
                "todayRangePct": 6.41,
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
            "pullbackStopPolicy": {
              "version": "pullback-stop-v1",
              "anchorSource": "volume_surge_bullish_candle",
              "anchorLookbackDays": 20,
              "anchorDate": "20260504",
              "anchorOpen": 909000,
              "anchorClose": 991000,
              "anchorHigh": 998000,
              "anchorLow": 901000,
              "anchorBodyMid": 950000,
              "anchorVolumeRatio": 2.84,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 950000,
              "ma10Price": 1168900,
              "ma10PrevPrice": 1153100,
              "ma20Price": 1128950,
              "ma20PrevPrice": 1107650,
              "ma10WarningPrice": null,
              "hardStopPrice": 1128950,
              "fallbackStopPrice": 1224600,
              "effectiveStopPrice": 1224600,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 950,000원, 20일선 1,128,950원) = 1,128,950원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,224,600원) = 1,224,600원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 950,000원, 20일선 1,128,950원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,224,600원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,281,120원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,293,680원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,312,520원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,331,360원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,224,600원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,224,600원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1243440,
              "high": 1256000,
              "anchor": 1256000,
              "label": "1,243,440~1,256,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "1,281,120원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,293,680원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,312,520원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,331,360원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,224,600원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,224,600원"
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
                    "targetPrice": "1,281,120원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,293,680원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,312,520원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,331,360원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,224,600원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,224,600원"
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
                    "targetPrice": "1,281,120원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,293,680원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,312,520원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,331,360원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,224,600원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,224,600원"
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
              "핵심 Gate 미충족: G0",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "핵심 Gate 미충족: G8",
              "핵심 Gate 미충족: Q1",
              "매매금지(핵심 Gate 미충족: G0, G5, G8, Q1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 161% (필요 ≥ 200%) · 외 3건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 161% (필요 ≥ 200%) / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / G8 미충족: 이격 20MA +11.3% (필요 ≤ +25%) · 60MA +61.5% (필요 ≤ +60%) · 과이격(지지선 눌림 아님) / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1256000.0,
                "vs52wHighPct": 88.32630098452883,
                "vs52wLowPct": 859.511077158136,
                "dropFrom52wHighPct": 11.673699015471167,
                "ma20GapPct": 11.253819921165684,
                "rsi14": 70.26347979526759,
                "volumeRatio20d": 108.74219872593622,
                "rs20Pct": 51.325301204819276,
                "supportDistancePct": 9.87,
                "tradingValueRank": 6.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 179.1995,
                "per": 11.53,
                "pbr": 4.96,
                "cnsPer": 4.92,
                "foreignRate": 48.76,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-13T18:00:05+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 3,
            "name": "현대차",
            "code": "005380",
            "strictScore": 5.6,
            "signalScore": 5.6,
            "score": 5.6,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 4.9,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 83,179주 / 기관 -67,415주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 750,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 736,000 ≤ 종가 750,000)"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.5,
                "evalStatus": "not_met",
                "note": "52주 고가 대비 -4.7% (≥12% 만점·8~12% 부분) · 미충족"
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
                "note": "거래량 113% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G5, Q1, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 208% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 704,000 > 20MA 645,950 > 60MA 555,125 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 750,000 / 60MA 555,125",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 68.3 (필요 ≥ 50)",
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
                "note": "당일 등락 +3.73% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 68.3 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +16.1% (필요 ≤ +25%) · 60MA +35.1% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -4.7% (≥12%) · 거래량 113% (≥80%) · 수급추세 +0 (≥0) · 얕은 조정(고가권 추격)",
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
                "note": "당일 거래량 / 앵커 거래량 67% · 시가 736,000 / 종가 750,000 / 전일 종가 723,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 750,000 / 앵커 중심값 676,000 / 복합 지지 551,069 · 앵커·지지 방어",
                "evalStatus": "met"
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
                "code": "P2",
                "note": "종가 750,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "P3",
                "note": "앵커 중심값 676,000 / 저가 727,000 / 종가 750,000 · 종가 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 736,000 ≤ 종가 750,000)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +5.96% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 113% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "저가 727,000 · 이평선 터치: 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 143% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 67% · 거래량 수축 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -4.7% (≥12% 만점·8~12% 부분) · 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "D2",
                "note": "수급추세 +0 (≥+2 만점·+1 부분) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 750000,
            "previousClose": 723000,
            "dailyChange": 27000,
            "dailyChangePct": 3.73,
            "dailyDirection": "up",
            "entryPriceText": "750,000원 (당일 종가 기준)",
            "entryPrice": 750000,
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
                "summary": "주지지 551,069원 (26.52% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 551069,
                    "distancePct": 26.52,
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
                    "lastSeenDaysAgo": 16,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 534664,
                    "distancePct": 28.71,
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
                    "lastSeenDaysAgo": 18,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 521704,
                    "distancePct": 30.44,
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
                    "lastSeenDaysAgo": 21,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 488188,
                    "distancePct": 34.91,
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
                    "lastSeenDaysAgo": 31,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 725000,
                    "distancePct": 3.33,
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
                  "price": 551069,
                  "distancePct": 26.52,
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
                  "lastSeenDaysAgo": 16,
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
                    "distancePct": 37.9,
                    "count": 7,
                    "lastSeenDaysAgo": 36,
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
                    "distancePct": 36.62,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
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
                    "distancePct": 34.82,
                    "count": 10,
                    "lastSeenDaysAgo": 31,
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
                    "price": 504050,
                    "distancePct": 32.79,
                    "count": 7,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 498500,
                    "bandHigh": 510000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 520950,
                    "distancePct": 30.54,
                    "count": 13,
                    "lastSeenDaysAgo": 21,
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
                    "price": 532786,
                    "distancePct": 28.96,
                    "count": 11,
                    "lastSeenDaysAgo": 18,
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
                    "distancePct": 27.17,
                    "count": 7,
                    "lastSeenDaysAgo": 17,
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
                    "price": 556333,
                    "distancePct": 25.82,
                    "count": 3,
                    "lastSeenDaysAgo": 16,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 555000,
                    "bandHigh": 558000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 571000,
                    "distancePct": 23.87,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
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
                    "price": 594000,
                    "distancePct": 20.8,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 592000,
                    "bandHigh": 596000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 608000,
                    "distancePct": 18.93,
                    "count": 5,
                    "lastSeenDaysAgo": 6,
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
                    "price": 644167,
                    "distancePct": 14.11,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 638000,
                    "bandHigh": 651000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 663400,
                    "distancePct": 11.55,
                    "count": 5,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 655000,
                    "bandHigh": 667000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 681250,
                    "distancePct": 9.17,
                    "count": 4,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 677000,
                    "bandHigh": 689000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 697667,
                    "distancePct": 6.98,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 692000,
                    "bandHigh": 701000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 711000,
                    "distancePct": 5.2,
                    "count": 2,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 710000,
                    "bandHigh": 712000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 725000,
                    "distancePct": 3.33,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 723000,
                    "bandHigh": 727000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 487500,
                    "distancePct": 35.0,
                    "count": 2,
                    "lastSeenDaysAgo": 46,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 484000,
                    "bandHigh": 491000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 536542,
                    "distancePct": 28.46,
                    "count": 10,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 25,
                    "volume": 10218411,
                    "binIndex": 6,
                    "binLow": 529500,
                    "binHigh": 543583
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 550625,
                    "distancePct": 26.58,
                    "count": 5,
                    "lastSeenDaysAgo": 17,
                    "valid": true,
                    "weight": 25,
                    "volume": 9493489,
                    "binIndex": 7,
                    "binLow": 543583,
                    "binHigh": 557667
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 522458,
                    "distancePct": 30.34,
                    "count": 8,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 25,
                    "volume": 8692583,
                    "binIndex": 5,
                    "binLow": 515417,
                    "binHigh": 529500
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 581000,
                    "distancePct": 22.53,
                    "count": 1,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 441.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 208% (15일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 207.9,
                "latestBurstDaysAgo": 13
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
                "daysAgo": 12
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 67% · 시가 736,000 / 종가 750,000 / 전일 종가 723,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 750,000 / 앵커 중심값 676,000 / 복합 지지 551,069 · 앵커·지지 방어"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 7.77%, 일간 표준편차 5.14%, 당일 레인지 7.75%.",
              "metrics": {
                "atrPct10": 7.77,
                "returnStd20": 5.14,
                "todayRangePct": 7.75,
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
              "ma10Price": 670000,
              "ma10PrevPrice": 665000,
              "ma20Price": 645950,
              "ma20PrevPrice": 636250,
              "ma10WarningPrice": null,
              "hardStopPrice": 676000,
              "fallbackStopPrice": 731250,
              "effectiveStopPrice": 731250,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 676,000원, 20일선 645,950원) = 676,000원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 731,250원) = 731,250원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 676,000원, 20일선 645,950원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 731,250원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "765,000원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "772,500원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "783,750원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "795,000원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 731,250원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "731,250원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 742500,
              "high": 750000,
              "anchor": 750000,
              "label": "742,500~750,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "765,000원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "772,500원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "783,750원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "795,000원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 731,250원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "731,250원"
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
                    "targetPrice": "765,000원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "772,500원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "783,750원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "795,000원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 731,250원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "731,250원"
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
                    "targetPrice": "765,000원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "772,500원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "783,750원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "795,000원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 731,250원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "731,250원"
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
              "핵심 Gate 미충족: Q1",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G5, Q1, G12)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 · 외 2건",
            "statusReason": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / Q1 미충족: 52주 고가 대비 -4.7% (≥12%) · 거래량 113% (≥80%) · 수급추세 +0 (≥0) · 얕은 조정(고가권 추격) / G12 미충족: 마지막 30분 비율 0.63:1 / 마지막 30분 평균 221.3% / 마지막 1시간 210.7% · 장 막판 투매 경고",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 750000.0,
                "vs52wHighPct": 95.29860228716646,
                "vs52wLowPct": 438.4063173007896,
                "dropFrom52wHighPct": 4.701397712833545,
                "ma20GapPct": 16.108057899218206,
                "rsi14": 68.71528112856426,
                "volumeRatio20d": 112.65377910473968,
                "rs20Pct": 34.89208633093525,
                "supportDistancePct": 26.52,
                "tradingValueRank": 14.0,
                "marketCapRank": 5.0,
                "marketCapTrillion": 124.288,
                "per": 18.71,
                "pbr": 1.33,
                "cnsPer": 15.42,
                "foreignRate": 25.18,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-13T18:00:05+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "RISE 네트워크인프라",
            "code": "367760",
            "strictScore": 4.2,
            "signalScore": 4.2,
            "score": 4.2,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 3.7,
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -1,440주 / 기관 2,683주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 112.8% / 100% 유지 86.7% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 98.7% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 92% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 98.7% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 37% / 윗꼬리·몸통 0.93 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.91 (필요 ≥ 1.2) · 매수 잔량 우위"
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
                "note": "5일 초과 +43.9% / 20일 초과 +84.6%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 98.7% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 55",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 92% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 37% / 윗꼬리·몸통 0.93 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
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
                "note": "종가 89,300 / 5MA 81,911 (전일 5MA 77,563) · 5MA 위·우상향",
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
                "note": "당일 평균 112.8% / 100% 유지 86.7% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 98.7% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.7% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.91 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -1,440주 / 기관 2,683주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 92% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 37% / 윗꼬리·몸통 0.93 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 89300,
            "previousClose": 88015,
            "dailyChange": 1285,
            "dailyChangePct": 1.46,
            "dailyDirection": "up",
            "entryPriceText": "89,300원 (당일 종가 기준)",
            "entryPrice": 89300,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.0,
            "marketCapRank": null,
            "marketCapUniverseCount": 2560,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -1,440주 / 기관 2,683주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 112.8,
              "note": "토스 공개 체결강도 112.8% / 최근 체결 163분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A367760/order",
              "asOf": "2026-06-08T09:00:20Z",
              "intradayAbove100Ratio": 86.7,
              "observedMinutes": 163,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 163분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 1.9127,
              "bidTotal": 3573,
              "askTotal": 1868,
              "note": "Naver 호가잔량합계 매수 3,573 / 매도 1,868",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=367760"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 76.63, ATR10 7.66%, 일간 표준편차 3.97%, 당일 레인지 3.90%.",
              "metrics": {
                "atrPct10": 7.66,
                "returnStd20": 3.97,
                "todayRangePct": 3.9,
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
              "referencePrice": 88015,
              "referenceBandLow": 88015,
              "referenceBandHigh": 88015,
              "entryDayOpenPrice": 88015,
              "fallbackStopPrice": 85728,
              "effectiveHardStopPrice": 88015,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 88,015원와 기존 % 손절 85,728원 중 더 높은 88,015원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 88,015원이며, 기존 % 손절 85,728원보다 느슨해지지 않게 88,015원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "20% 익절",
                "targetYield": "+1.3%",
                "targetPrice": "90,500원",
                "historicalHitRate": 0.5977,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "93,765원",
                "historicalHitRate": 0.4023,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+8.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "96,444원",
                "historicalHitRate": 0.3218,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "99,123원",
                "historicalHitRate": 0.2644,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "101,802원",
                "historicalHitRate": 0.1954,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 88,015원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.4%",
                "targetPrice": "88,015원"
              }
            ],
            "rr": "1 : 5.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 88407,
              "high": 89300,
              "anchor": 89300,
              "label": "88,407~89,300원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 90500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "91,979원",
                    "historicalHitRate": 0.5977,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "93,765원",
                    "historicalHitRate": 0.4023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "96,444원",
                    "historicalHitRate": 0.3218,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "99,123원",
                    "historicalHitRate": 0.2644,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "101,802원",
                    "historicalHitRate": 0.1954,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 88,015원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "88,015원"
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
                "nearestResistancePrice": 90500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "90,500원",
                    "historicalHitRate": 0.5977,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "93,765원",
                    "historicalHitRate": 0.4023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "96,444원",
                    "historicalHitRate": 0.3218,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "99,123원",
                    "historicalHitRate": 0.2644,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "101,802원",
                    "historicalHitRate": 0.1954,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 88,015원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "88,015원"
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
                "nearestResistancePrice": 90500,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "90,500원",
                    "historicalHitRate": 0.5977,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "93,765원",
                    "historicalHitRate": 0.4023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+8.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "96,444원",
                    "historicalHitRate": 0.3218,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "99,123원",
                    "historicalHitRate": 0.2644,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "101,802원",
                    "historicalHitRate": 0.1954,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 88,015원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.4%",
                    "targetPrice": "88,015원"
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
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 92% (필요 ≥ 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 92% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 89300.0,
                "vs52wHighPct": 98.67403314917127,
                "vs52wLowPct": 725.3234750462108,
                "dropFrom52wHighPct": 1.3259668508287292,
                "ma20GapPct": 39.136667108123056,
                "rsi14": 90.71457101390664,
                "volumeRatio20d": 92.4934158545095,
                "rs20Pct": 84.50413223140497,
                "tradingValueRank": 55.0,
                "marketCapTrillion": 0.0,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-08T22:04:58+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "삼성SDI",
            "code": "006400",
            "strictScore": 9.0,
            "signalScore": 9.0,
            "score": 9.0,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 6.9,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 41,952주 / 기관 19,683주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +41,952 / 전일 +20,423 · 기관 당일 +19,683 / 전일 +2,297 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 289.9% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 109.0% / 마지막 1시간 289.9% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +280,687주 · 양수 5/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 100.4% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 657,600 / 20MA 649,400 · 5MA > 20MA"
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
                "note": "당일 등락 -5.23% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +4.40% / KOSPI +4.63% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 124.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: Q1, G5)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +20,423/당일 +41,952 · 기관 전일 +2,297/당일 +19,683 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 652,000 / 60MA 529,308",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 79.5% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 42",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 99% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 26.4% (≥25%) · 20일 수익률 -8.4% (≥0%) · 20일 약세(낙하 칼날)",
                "evalStatus": "not_met"
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
                "note": "외인 41,952주 / 기관 19,683주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +41,952 / 전일 +20,423 · 기관 당일 +19,683 / 전일 +2,297 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 289.9% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 109.0% / 마지막 1시간 289.9% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +280,687주 · 양수 5/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 100.4% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 657,600 / 20MA 649,400 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 124.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 등락 -5.23% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +4.40% / KOSPI +4.63% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 652000,
            "previousClose": 688000,
            "dailyChange": -36000,
            "dailyChangePct": -5.23,
            "dailyDirection": "down",
            "entryPriceText": "652,000원 (당일 종가 기준)",
            "entryPrice": 652000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 43.4356,
            "marketCapRank": 17,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 41,952주 / 기관 19,683주 / 마지막 1시간 289.9% · 장후반 매수세 강화 · 마지막 30분 틱 124.00:1. 외국인 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 109.0,
              "note": "토스 공개 체결강도 109.0% / 최근 체결 33분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A006400/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 33,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 33분 프록시",
              "lastHourAvgStrength": 289.9,
              "lastHourObservedMinutes": 33,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 124.0,
              "last30BuyVolume": 124.0,
              "last30SellVolume": 0.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 7.25%, 일간 표준편차 3.84%, 당일 레인지 4.22%.",
              "metrics": {
                "atrPct10": 7.25,
                "returnStd20": 3.84,
                "todayRangePct": 4.22,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 280687.0,
              "positiveDays": 5,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260612",
                    "net": 41952.0
                  },
                  {
                    "date": "20260611",
                    "net": 20423.0
                  },
                  {
                    "date": "20260610",
                    "net": 18996.0
                  },
                  {
                    "date": "20260609",
                    "net": 65565.0
                  },
                  {
                    "date": "20260608",
                    "net": 133751.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260612",
                    "net": 19683.0
                  },
                  {
                    "date": "20260611",
                    "net": 2297.0
                  },
                  {
                    "date": "20260610",
                    "net": -45294.0
                  },
                  {
                    "date": "20260609",
                    "net": -21906.0
                  },
                  {
                    "date": "20260608",
                    "net": -124648.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260612",
                    "net": 41952.0
                  },
                  {
                    "date": "20260611",
                    "net": 20423.0
                  },
                  {
                    "date": "20260610",
                    "net": 18996.0
                  },
                  {
                    "date": "20260609",
                    "net": 65565.0
                  },
                  {
                    "date": "20260608",
                    "net": 133751.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 5일 매집 추세 강화",
              "note": "외국인 최근 5일 누적 +280,687주 · 양수 5/5일 · 증가 2회"
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
                "targetYield": "+0.8%",
                "targetPrice": "657,000원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+8.4%",
                "targetPrice": "707,000원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+8.4%",
                "targetPrice": "707,000원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.4%",
                "targetPrice": "707,000원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "723,720원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 680,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "+4.3%",
                "targetPrice": "680,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260529",
              "anchorOpen": 680000,
              "anchorClose": 688000,
              "anchorVolumeRatio20d": 2.44,
              "anchorStopPrice": 680000,
              "fallbackStopPrice": 632440,
              "effectiveHardStopPrice": 680000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 680,000원와 기존 % 손절 632,440원 중 더 높은 680,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 680,000원를 기준으로 잡고, 기존 % 손절 632,440원보다 느슨해지지 않게 680,000원로 고정합니다."
            },
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 645480,
              "high": 652000,
              "anchor": 652000,
              "label": "645,480~652,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 657000,
                "secondaryResistancePrice": 707000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "665,040원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "674,820원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "687,860원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "704,160원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "723,720원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 680,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+4.3%",
                    "targetPrice": "680,000원"
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
                "nearestResistancePrice": 657000,
                "secondaryResistancePrice": 707000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "657,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "674,820원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "687,860원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "704,160원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "723,720원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 680,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+4.3%",
                    "targetPrice": "680,000원"
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
                "nearestResistancePrice": 657000,
                "secondaryResistancePrice": 707000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.8%",
                    "targetPrice": "657,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+8.4%",
                    "targetPrice": "707,000원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.4%",
                    "targetPrice": "707,000원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.4%",
                    "targetPrice": "707,000원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "723,720원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 680,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+4.3%",
                    "targetPrice": "680,000원"
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
              "핵심 Gate 미충족: Q1",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지(핵심 Gate 미충족: Q1, G5)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "Q1 미충족: 외인 보유율 26.4% (≥25%) · 20일 수익률 -8.4% (≥0%) · 20일 약세(낙하 칼날) · 외 1건",
            "statusReason": "Q1 미충족: 외인 보유율 26.4% (≥25%) · 20일 수익률 -8.4% (≥0%) · 20일 약세(낙하 칼날) / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 652000.0,
                "vs52wHighPct": 79.51219512195122,
                "vs52wLowPct": 293.00783604581073,
                "dropFrom52wHighPct": 20.48780487804878,
                "ma20GapPct": 0.4003695719125347,
                "rsi14": 55.84348004660898,
                "volumeRatio20d": 98.83454016895448,
                "rs20Pct": -8.426966292134832,
                "tradingValueRank": 42.0,
                "marketCapRank": 17.0,
                "marketCapTrillion": 43.4356,
                "per": 0.0,
                "pbr": 1.88,
                "cnsPer": 123.97,
                "foreignRate": 26.45,
                "supplyTrendScore": 4.0
              },
              "evaluatedAt": "2026-06-12T23:59:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 2,
            "name": "미래에셋생명",
            "code": "085620",
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
                "note": "외인 101,038주 / 기관 253,759주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +101,038 / 전일 -179,348 · 기관 당일 +253,759 / 전일 +77,336 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 109.3% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 82.0% / 마지막 1시간 109.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +1,072,505주 · 양수 5/5일 · 증가 2회"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 14,946 / 20MA 15,144 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 143% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +2.38% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +4.72% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.11:1 · 평균 체결강도 150.0% (필요 ≥ 1.1:1)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, Q1, G5)",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -179,348/당일 +101,038 · 기관 전일 +77,336/당일 +253,759 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 15,050 / 60MA 16,096",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 45.6% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 84",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 94% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 0.6% (≥25%) · 20일 수익률 -9.9% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날)",
                "evalStatus": "not_met"
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
                "note": "외인 101,038주 / 기관 253,759주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +101,038 / 전일 -179,348 · 기관 당일 +253,759 / 전일 +77,336 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 109.3% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 82.0% / 마지막 1시간 109.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +1,072,505주 · 양수 5/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 99.4% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +2.38% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +4.72% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "5MA 14,946 / 20MA 15,144 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 143% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.11:1 · 평균 체결강도 150.0% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 15050,
            "previousClose": 14700,
            "dailyChange": 350,
            "dailyChangePct": 2.38,
            "dailyDirection": "up",
            "entryPriceText": "15,050원 (당일 종가 기준)",
            "entryPrice": 15050,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.8256,
            "marketCapRank": 145,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 101,038주 / 기관 253,759주 / 마지막 1시간 109.3% · 장후반 매수세 강화 · 마지막 30분 틱 0.11:1. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 82.0,
              "note": "토스 공개 체결강도 82.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A085620/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 109.3,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 150.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.1135,
              "last30BuyVolume": 42.0,
              "last30SellVolume": 370.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 7.54%, 일간 표준편차 3.09%, 당일 레인지 7.82%.",
              "metrics": {
                "atrPct10": 7.54,
                "returnStd20": 3.09,
                "todayRangePct": 7.82,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 1072505.0,
              "positiveDays": 5,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260612",
                    "net": 101038.0
                  },
                  {
                    "date": "20260611",
                    "net": -179348.0
                  },
                  {
                    "date": "20260610",
                    "net": -117705.0
                  },
                  {
                    "date": "20260609",
                    "net": 248337.0
                  },
                  {
                    "date": "20260608",
                    "net": -170373.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260612",
                    "net": 253759.0
                  },
                  {
                    "date": "20260611",
                    "net": 77336.0
                  },
                  {
                    "date": "20260610",
                    "net": 216247.0
                  },
                  {
                    "date": "20260609",
                    "net": 327200.0
                  },
                  {
                    "date": "20260608",
                    "net": 197963.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260612",
                    "net": 253759.0
                  },
                  {
                    "date": "20260611",
                    "net": 77336.0
                  },
                  {
                    "date": "20260610",
                    "net": 216247.0
                  },
                  {
                    "date": "20260609",
                    "net": 327200.0
                  },
                  {
                    "date": "20260608",
                    "net": 197963.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +1,072,505주 · 양수 5/5일 · 증가 2회"
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
                "targetPrice": "15,100원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+2.1%",
                "targetPrice": "15,370원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "15,878원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "16,254원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "16,706원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 14,650원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.7%",
                "targetPrice": "14,650원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260529",
              "anchorOpen": 14650,
              "anchorClose": 14700,
              "anchorVolumeRatio20d": 0.65,
              "anchorStopPrice": 14650,
              "fallbackStopPrice": 14598,
              "effectiveHardStopPrice": 14650,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 14,650원와 기존 % 손절 14,598원 중 더 높은 14,650원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 14,650원를 기준으로 잡고, 기존 % 손절 14,598원보다 느슨해지지 않게 14,650원로 고정합니다."
            },
            "rr": "1 : 1.9",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 14900,
              "high": 15050,
              "anchor": 15050,
              "label": "14,900~15,050원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 15100,
                "secondaryResistancePrice": 15370,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "15,351원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "15,577원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "15,878원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "16,254원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "16,706원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 14,650원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.7%",
                    "targetPrice": "14,650원"
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
                "nearestResistancePrice": 15100,
                "secondaryResistancePrice": 15370,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "15,100원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "15,370원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "15,878원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "16,254원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "16,706원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 14,650원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.7%",
                    "targetPrice": "14,650원"
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
                "nearestResistancePrice": 15100,
                "secondaryResistancePrice": 15370,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "15,100원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "15,370원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "15,878원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "16,254원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "16,706원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 14,650원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.7%",
                    "targetPrice": "14,650원"
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
              "핵심 Gate 미충족: Q1",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지(핵심 Gate 미충족: G1, Q1, G5)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 15,050 / 60MA 16,096 · 외 2건",
            "statusReason": "G1 미충족: 종가 15,050 / 60MA 16,096 / Q1 미충족: 외인 보유율 0.6% (≥25%) · 20일 수익률 -9.9% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날) / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 15050.0,
                "vs52wHighPct": 45.60606060606061,
                "vs52wLowPct": 167.31793960923625,
                "dropFrom52wHighPct": 54.39393939393939,
                "ma20GapPct": -0.6207078711040677,
                "rsi14": 46.588305539100816,
                "volumeRatio20d": 94.47061106638309,
                "rs20Pct": -9.880239520958083,
                "tradingValueRank": 84.0,
                "marketCapRank": 145.0,
                "marketCapTrillion": 3.8256,
                "per": 34.9,
                "pbr": 1.28,
                "cnsPer": 0.0,
                "foreignRate": 0.59,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-12T23:59:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 3,
            "name": "리노공업",
            "code": "058470",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 5.8,
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
                "note": "종가 / 20MA 90.7% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "5MA 101,420 / 20MA 107,300 · 정배열 미충족"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 94% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -0.10% (필요 -3% ~ +5%)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, Q1, G5)",
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
                "note": "종가 97,300 / 60MA 110,695",
                "evalStatus": "not_met"
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
                "note": "거래대금 TOP100 순위 30",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 96% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 23.2% (≥25%) · 20일 수익률 -13.2% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날)",
                "evalStatus": "not_met"
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
                "code": "C2",
                "note": "당일 등락 -0.10% (필요 -3% ~ +5%)",
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
                "note": "종가 / 20MA 90.7% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "5MA 101,420 / 20MA 107,300 · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 94% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 97300,
            "previousClose": 97400,
            "dailyChange": -100,
            "dailyChangePct": -0.1,
            "dailyDirection": "down",
            "entryPriceText": "97,300원 (당일 종가 기준)",
            "entryPrice": 97300,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 6.82%, 일간 표준편차 4.62%, 당일 레인지 5.44%.",
              "metrics": {
                "atrPct10": 6.82,
                "returnStd20": 4.62,
                "todayRangePct": 5.44,
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
                "targetYield": "+1.7%",
                "targetPrice": "99,000원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+6.9%",
                "targetPrice": "104,000원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.9%",
                "targetPrice": "104,000원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "105,084원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "108,003원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 94,381원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "94,381원"
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
              "fallbackStopPrice": 94381,
              "effectiveHardStopPrice": 94381,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 94,381원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 94,381원만 유지합니다."
            },
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 96327,
              "high": 97300,
              "anchor": 97300,
              "label": "96,327~97,300원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 99000,
                "secondaryResistancePrice": 104000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "99,246원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "100,705원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "102,652원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "105,084원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "108,003원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 94,381원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "94,381원"
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
                "nearestResistancePrice": 99000,
                "secondaryResistancePrice": 104000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "99,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "100,705원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "102,652원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "105,084원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "108,003원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 94,381원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "94,381원"
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
                "nearestResistancePrice": 99000,
                "secondaryResistancePrice": 104000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "99,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+6.9%",
                    "targetPrice": "104,000원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.9%",
                    "targetPrice": "104,000원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "105,084원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "108,003원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 94,381원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "94,381원"
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
              "핵심 Gate 미충족: Q1",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "매매금지(핵심 Gate 미충족: G1, Q1, G5)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 97,300 / 60MA 110,695 · 외 2건",
            "statusReason": "G1 미충족: 종가 97,300 / 60MA 110,695 / Q1 미충족: 외인 보유율 23.2% (≥25%) · 20일 수익률 -13.2% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날) / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 97300.0,
                "vs52wHighPct": 73.10293012772352,
                "vs52wLowPct": 121.13636363636364,
                "dropFrom52wHighPct": 26.897069872276486,
                "ma20GapPct": -9.319664492078285,
                "rsi14": 40.56360420932591,
                "volumeRatio20d": 96.23507170015256,
                "rs20Pct": -13.202497769848351,
                "tradingValueRank": 30.0,
                "marketCapRank": 88.0,
                "marketCapTrillion": 7.9641,
                "per": 48.85,
                "pbr": 11.16,
                "cnsPer": 42.65,
                "foreignRate": 23.17,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-12T23:59:57+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "LG전자",
            "code": "066570",
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
                "note": "외인 -1,042,446→65,869 / 기관 -18,198→-42,539 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 101.0% / 마지막 1시간 281.5% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 380,500 / 20MA 208,375 (182.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 100% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 119% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 3.39 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 268000, 전봉 종가 269500 미달"
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
                "note": "당일 거래대금 순위 7위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 43.7조 (필요 ≥ 5조)",
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
                "note": "최근 손절 이력 2건 (최근: 2026-05-26) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +171.8% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 +0.0% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 380,500 / 60MA 148,143",
                "evalStatus": "met"
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
                "status": "⛔",
                "note": "20MA 이격 +82.6% (≤+22%) · RSI14 83 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -1,042,446→65,869 / 기관 -18,198→-42,539 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 101.0% / 마지막 1시간 281.5% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 380,500 / 20MA 208,375 (182.6% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 100% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 3.39 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 119% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 268000, 전봉 종가 269500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 380500,
            "previousClose": 293000,
            "dailyChange": 87500,
            "dailyChangePct": 29.86,
            "dailyDirection": "up",
            "entryPriceText": "380,500원 (당일 종가 기준)",
            "entryPrice": 380500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 43.6531,
            "marketCapRank": 18,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 0.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 LG전자 (066570) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 268000, 전봉 종가 269500",
              "latestOpen": 268000.0,
              "latestClose": 268000.0,
              "previousClose": 269500.0
            },
            "toss": {
              "avgStrength": 101.0,
              "note": "토스 공개 체결강도 101.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A066570/order",
              "asOf": "2026-06-08T10:59:59Z",
              "intradayAbove100Ratio": 93.8,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 281.5,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 280.3,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.1623,
              "last30BuyVolume": 222.0,
              "last30SellVolume": 191.0
            },
            "orderbook": {
              "bidAskRatio": 3.3877,
              "bidTotal": 132816,
              "askTotal": 39205,
              "note": "Naver 호가잔량합계 매수 132,816 / 매도 39,205",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=066570"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 76.63, ATR10 14.68%, 일간 표준편차 12.25%, 당일 레인지 7.51%.",
              "metrics": {
                "atrPct10": 14.68,
                "returnStd20": 12.25,
                "todayRangePct": 7.51,
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
                "targetPrice": "391,915원",
                "historicalHitRate": 0.6964,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "399,525원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 373,651원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "373,651원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 358500,
              "fallbackStopPrice": 373651,
              "effectiveHardStopPrice": 373651,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 358,500원와 기존 % 손절 373,651원 중 더 높은 373,651원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 358,500원이며, 기존 % 손절 373,651원보다 느슨해지지 않게 373,651원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 376695,
              "high": 380500,
              "anchor": 380500,
              "label": "376,695~380,500원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 380500,
                "retrace33Price": 380500,
                "retrace50Price": 380500,
                "nearestResistancePrice": null,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "387,349원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "391,915원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "395,720원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 373,651원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "373,651원"
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
                "recentHighPrice": 380500,
                "retrace33Price": 380500,
                "retrace50Price": 380500,
                "nearestResistancePrice": null,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.8% 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+1.8%",
                    "targetPrice": "387,349원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "391,915원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 373,651원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "373,651원"
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
                "recentHighPrice": 380500,
                "retrace33Price": 380500,
                "retrace50Price": 380500,
                "nearestResistancePrice": null,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "391,915원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "399,525원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 373,651원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "373,651원"
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
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-05-26) · 재진입 차단 · 외 2건",
            "statusReason": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-05-26) · 재진입 차단 / G2 미충족: 20일 고점 대비 +0.0% (필요 -5%~-25%) / Q1 미충족: 20MA 이격 +82.6% (≤+22%) · RSI14 83 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 380500.0,
                "vs52wHighPct": 81.3903743315508,
                "vs52wLowPct": 440.48295454545456,
                "dropFrom52wHighPct": 18.609625668449198,
                "ma20GapPct": 82.60347930413917,
                "rsi14": 82.60978558584861,
                "volumeRatio20d": 126.75666867886927,
                "rs20Pct": 180.19145802650957,
                "tradingValueRank": 7.0,
                "marketCapRank": 18.0,
                "marketCapTrillion": 43.6531,
                "per": 49.45,
                "pbr": 1.88,
                "cnsPer": 24.68,
                "foreignRate": 29.05,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-06-08T22:04:58+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "LG씨엔에스",
            "code": "064400",
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
                "note": "외인 153,245→449,645 / 기관 -32,632→-72,010 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 95.0% / 마지막 1시간 201.6% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 143,700 / 20MA 81,980 (175.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 68% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 265% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.04 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 106500, 전봉 종가 106800 미달"
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
                "note": "당일 거래대금 순위 37위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 10.3조 (필요 ≥ 5조)",
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
                "status": "✅",
                "note": "최근 5거래일(2026-05-22~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +112.9% (필요 ≥ +15%)",
                "evalStatus": "met"
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
                "note": "종가 143,700 / 60MA 69,755",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -7.4% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +75.3% (≤+22%) · RSI14 83 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 95.0% / 마지막 1시간 201.6% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 143,700 / 20MA 81,980 (175.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 68% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 265% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.04 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 153,245→449,645 / 기관 -32,632→-72,010 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 106500, 전봉 종가 106800 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 143700,
            "previousClose": 113800,
            "dailyChange": 29900,
            "dailyChangePct": 26.27,
            "dailyDirection": "up",
            "entryPriceText": "143,700원 (당일 종가 기준)",
            "entryPrice": 143700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 10.3184,
            "marketCapRank": 69,
            "marketCapUniverseCount": 2560,
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
              "note": "KIND 최근공시 2026-06-02 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 106500, 전봉 종가 106800",
              "latestOpen": 106500.0,
              "latestClose": 106500.0,
              "previousClose": 106800.0
            },
            "toss": {
              "avgStrength": 95.0,
              "note": "토스 공개 체결강도 95.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A064400/order",
              "asOf": "2026-06-08T10:59:59Z",
              "intradayAbove100Ratio": 72.7,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 201.6,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 210.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 2.2768,
              "last30BuyVolume": 255.0,
              "last30SellVolume": 112.0
            },
            "orderbook": {
              "bidAskRatio": 2.0359,
              "bidTotal": 23690,
              "askTotal": 11636,
              "note": "Naver 호가잔량합계 매수 23,690 / 매도 11,636",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=064400"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 76.63, ATR10 13.83%, 일간 표준편차 10.24%, 당일 레인지 11.60%.",
              "metrics": {
                "atrPct10": 13.83,
                "returnStd20": 10.24,
                "todayRangePct": 11.6,
                "vkospi": 76.63
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "55% 익절",
                "targetYield": "+2.9%",
                "targetPrice": "147,900원",
                "historicalHitRate": 0.6964,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "150,885원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 141,113원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "141,113원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 134700,
              "fallbackStopPrice": 141113,
              "effectiveHardStopPrice": 141113,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 134,700원와 기존 % 손절 141,113원 중 더 높은 141,113원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 134,700원이며, 기존 % 손절 141,113원보다 느슨해지지 않게 141,113원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 142263,
              "high": 143700,
              "anchor": 143700,
              "label": "142,263~143,700원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 147900,
                "retrace33Price": 145086,
                "retrace50Price": 145800,
                "nearestResistancePrice": 147900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "147,900원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "148,011원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.0%",
                    "targetPrice": "149,448원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 141,113원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "141,113원"
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
                "recentHighPrice": 147900,
                "retrace33Price": 145086,
                "retrace50Price": 145800,
                "nearestResistancePrice": 147900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "147,900원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+3.0%",
                    "targetPrice": "148,011원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 141,113원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "141,113원"
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
                "recentHighPrice": 147900,
                "retrace33Price": 145086,
                "retrace50Price": 145800,
                "nearestResistancePrice": 147900,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+2.9%",
                    "targetPrice": "147,900원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "150,885원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 141,113원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "141,113원"
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
              "핵심 Gate 미충족: F3",
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F3 미충족: KIND 최근공시 2026-06-02 기업설명회(IR) 개최(안내공시) · 외 2건",
            "statusReason": "F3 미충족: KIND 최근공시 2026-06-02 기업설명회(IR) 개최(안내공시) / G2 미충족: 20일 고점 대비 -2.8% (필요 -5%~-25%) / Q1 미충족: 20MA 이격 +75.3% (≤+22%) · RSI14 83 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 143700.0,
                "vs52wHighPct": 84.62897526501767,
                "vs52wLowPct": 189.1348088531187,
                "dropFrom52wHighPct": 15.371024734982333,
                "ma20GapPct": 75.28665528177604,
                "rsi14": 82.67172994193281,
                "volumeRatio20d": 380.9452422364543,
                "rs20Pct": 115.44227886056973,
                "tradingValueRank": 37.0,
                "marketCapRank": 69.0,
                "marketCapTrillion": 10.3184,
                "per": 22.36,
                "pbr": 3.53,
                "cnsPer": 21.16,
                "foreignRate": 4.92,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-08T22:04:58+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "삼성화재",
            "code": "000810",
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
                "note": "외인 17,114→5,236 / 기관 -8,299→1,544 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 111.0% / 마지막 1시간 161.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 604,000 / 20MA 533,900 (113.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 55% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 146% (필요 ≥ 200%)"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 670000, 전봉 종가 658000 미달"
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
                "note": "당일 거래대금 순위 85위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 29.9조 (필요 ≥ 5조)",
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
                "note": "최근 5거래일(2026-05-22~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +25.1% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -4.4% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 604,000 / 60MA 491,208",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -2.9% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +13.1% (≤+22%) · RSI14 73 (≤72) · RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 17,114→5,236 / 기관 -8,299→1,544 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 111.0% / 마지막 1시간 161.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 604,000 / 20MA 533,900 (113.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 55% (필요 ≥ 50%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 146% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 670000, 전봉 종가 658000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 604000,
            "previousClose": 569000,
            "dailyChange": 35000,
            "dailyChangePct": 6.15,
            "dailyDirection": "up",
            "entryPriceText": "604,000원 (당일 종가 기준)",
            "entryPrice": 604000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 29.9138,
            "marketCapRank": 26,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -4.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 삼성화재 (000810) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 670000, 전봉 종가 658000",
              "latestOpen": 670000.0,
              "latestClose": 670000.0,
              "previousClose": 658000.0
            },
            "toss": {
              "avgStrength": 111.0,
              "note": "토스 공개 체결강도 111.0% / 최근 체결 13분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000810/order",
              "asOf": "2026-06-08T10:59:49Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 13,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 13분 프록시",
              "lastHourAvgStrength": 161.0,
              "lastHourObservedMinutes": 13,
              "last30AvgStrength": 161.0,
              "last30ObservedMinutes": 13,
              "last30BuySellRatio": 1.17,
              "last30BuyVolume": 1122.0,
              "last30SellVolume": 959.0
            },
            "orderbook": {
              "bidAskRatio": 0.6208,
              "bidTotal": 4169,
              "askTotal": 6715,
              "note": "Naver 호가잔량합계 매수 4,169 / 매도 6,715",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=000810"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 76.63, ATR10 5.96%, 일간 표준편차 2.57%, 당일 레인지 10.90%.",
              "metrics": {
                "atrPct10": 5.96,
                "returnStd20": 2.57,
                "todayRangePct": 10.9,
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
                "targetPrice": "622,120원",
                "historicalHitRate": 0.6964,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 1 도달",
                "quantity": "45% 익절 (잔량 전량)",
                "targetYield": "+4.6%",
                "targetPrice": "632,000원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 593,128원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "593,128원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 570000,
              "fallbackStopPrice": 593128,
              "effectiveHardStopPrice": 593128,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 570,000원와 기존 % 손절 593,128원 중 더 높은 593,128원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 570,000원이며, 기존 % 손절 593,128원보다 느슨해지지 않게 593,128원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 597960,
              "high": 604000,
              "anchor": 604000,
              "label": "597,960~604,000원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 632000,
                "retrace33Price": 613240,
                "retrace50Price": 618000,
                "nearestResistancePrice": 632000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.6%",
                    "targetPrice": "632,000원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.6%",
                    "targetPrice": "632,000원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+4.6%",
                    "targetPrice": "632,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 593,128원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "593,128원"
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
                "recentHighPrice": 632000,
                "retrace33Price": 613240,
                "retrace50Price": 618000,
                "nearestResistancePrice": 632000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+4.6%",
                    "targetPrice": "632,000원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.6%",
                    "targetPrice": "632,000원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 593,128원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "593,128원"
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
                "recentHighPrice": 632000,
                "retrace33Price": 613240,
                "retrace50Price": 618000,
                "nearestResistancePrice": 632000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "55% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "622,120원",
                    "historicalHitRate": 0.6964,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "45% 익절 (잔량 전량)",
                    "targetYield": "+4.6%",
                    "targetPrice": "632,000원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 593,128원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "593,128원"
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
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -4.4% (필요 -5%~-25%) · 외 2건",
            "statusReason": "G2 미충족: 20일 고점 대비 -4.4% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -2.9% (필요 -3% 이하 급락 1회 이상) / Q1 미충족: 20MA 이격 +13.1% (≤+22%) · RSI14 73 (≤72) · RSI 과매수",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 604000.0,
                "vs52wHighPct": 79.7886393659181,
                "vs52wLowPct": 68.71508379888269,
                "dropFrom52wHighPct": 20.211360634081903,
                "ma20GapPct": 13.129799587937816,
                "rsi14": 73.3499699221702,
                "volumeRatio20d": 133.17508403457435,
                "rs20Pct": 30.17241379310345,
                "tradingValueRank": 85.0,
                "marketCapRank": 26.0,
                "marketCapTrillion": 29.9138,
                "per": 16.46,
                "pbr": 1.34,
                "cnsPer": 15.16,
                "foreignRate": 58.27,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-08T22:04:59+09:00",
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
  "analysisDate": "2026-06-01"
};
