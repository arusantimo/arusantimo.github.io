window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-10"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-10T06:23:37+00:00",
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
      "manual": 3,
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
        "ok": 0
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
        "durationMs": 1130.8,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 1703.0,
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
        "durationMs": 74.7,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 162.9,
        "detail": "순환매장 🔄 (거시·지수 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 3425.1,
        "count": 21
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 1917.5,
        "detail": "성공 21 / 실패 0",
        "count": 21
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 853.9,
        "detail": "direct-http · 체결강도 21 / 호가 21 / 틱프록시 21",
        "count": 21
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 57.1,
        "detail": "pullback 2, breakout 2, accumulation 3, reversal 3",
        "count": 10
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 15379.2,
        "detail": "playwright-chromium · KIND 0",
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
            "value": "7731.52 (-4.51%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 88.46"
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
            "value": "6695.41",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7963.10",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 88.46",
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
          "kospiClose": 7731.52,
          "kospiMa5": 8022.572,
          "vkospiValue": 88.46,
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
            "actualValue": "-0.16%",
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
            "actualValue": "-5.91원",
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
            "name": "원익IPS",
            "code": "240810",
            "strictScore": 9.0,
            "signalScore": 9.0,
            "score": 9.0,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 7.8,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -467,464주 / 기관 751,895주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 116,700 · 5MA·10MA·20MA 중 10MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 115,200 ≤ 종가 116,700)"
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
                "note": "52주 고가 대비 -36.3% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 164% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G5, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 336% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 120,120 > 20MA 116,805 > 60MA 119,673 · 상승선 5MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 116,700 / 60MA 119,673",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 68.0 (필요 ≥ 50)",
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
                "note": "당일 등락 -2.02% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 68.0 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -0.1% (필요 ≤ +25%) · 60MA -2.5% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -36.3% (≥12%) · 거래량 164% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "status": "✅",
                "note": "당일 거래량 / 앵커 거래량 49% · 시가 115,200 / 종가 116,700 / 전일 종가 119,100 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "종가 116,700 / 앵커 중심값 124,100 / 복합 지지 116,021 · 앵커 또는 지지 한 축 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 0.02:1 / 마지막 30분 평균 136.4% / 마지막 1시간 107.1% · 장 막판 투매 경고",
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
                "note": "당일 거래대금 순위 22위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 -467,464주 / 기관 751,895주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "당일 평균 88.0% / 마지막 1시간 107.1% / 마지막 30분 비율 0.02:1 / 마지막 30분 평균 136.4% · 장후반 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 114,100 · 이평선 터치: 5MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 116,700 · 5MA·10MA·20MA 중 10MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 115,200 ≤ 종가 116,700)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +7.56% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -36.3% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 164% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P3",
                "note": "앵커 중심값 124,100 / 저가 114,100 / 종가 116,700 · 종가 미회복",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 95% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 49% · 거래량 축소",
                "evalStatus": "met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 116700,
            "previousClose": 119100,
            "dailyChange": -2400,
            "dailyChangePct": -2.02,
            "dailyDirection": "down",
            "entryPriceText": "116,700원 (당일 종가 기준)",
            "entryPrice": 116700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.9971,
            "marketCapRank": 78,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -467,464주 / 기관 751,895주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 88.0,
              "note": "토스 공개 체결강도 88.0% / 최근 체결 43분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 35.7,
              "observedMinutes": 43,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 43분 프록시",
              "lastHourAvgStrength": 107.1,
              "lastHourObservedMinutes": 43,
              "last30AvgStrength": 136.4,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0244,
              "last30BuyVolume": 90.0,
              "last30SellVolume": 3690.0
            },
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 116,021원 (0.58% 아래) · 강도 90점 · family 3개 · 수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 116021,
                    "distancePct": 0.58,
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
                    "count": 24,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 90,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 112114,
                    "distancePct": 3.93,
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
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 107868,
                    "distancePct": 7.57,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 11,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 104367,
                    "distancePct": 10.57,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 102000,
                    "distancePct": 12.6,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 116021,
                  "distancePct": 0.58,
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
                  "count": 24,
                  "lastSeenDaysAgo": 0,
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
                    "price": 102000,
                    "distancePct": 12.6,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 101000,
                    "bandHigh": 102700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 104367,
                    "distancePct": 10.57,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 103600,
                    "bandHigh": 104900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 108236,
                    "distancePct": 7.25,
                    "count": 9,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 106000,
                    "bandHigh": 109500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 112229,
                    "distancePct": 3.83,
                    "count": 12,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 110500,
                    "bandHigh": 113500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 115639,
                    "distancePct": 0.91,
                    "count": 15,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 114100,
                    "bandHigh": 117200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 118763,
                    "distancePct": -1.77,
                    "count": 18,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 117500,
                    "bandHigh": 120400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 121330,
                    "distancePct": -3.97,
                    "count": 23,
                    "lastSeenDaysAgo": 10,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 120600,
                    "bandHigh": 122600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 124586,
                    "distancePct": -6.76,
                    "count": 6,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 123700,
                    "bandHigh": 125300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 127880,
                    "distancePct": -9.58,
                    "count": 5,
                    "lastSeenDaysAgo": 4,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 127200,
                    "bandHigh": 129000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 132020,
                    "distancePct": -13.13,
                    "count": 5,
                    "lastSeenDaysAgo": 3,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 130400,
                    "bandHigh": 132900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 135450,
                    "distancePct": -16.07,
                    "count": 2,
                    "lastSeenDaysAgo": 20,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 134700,
                    "bandHigh": 136200
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 107500,
                    "distancePct": 7.88,
                    "count": 2,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 107200,
                    "bandHigh": 107800
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 112000,
                    "distancePct": 4.03,
                    "count": 2,
                    "lastSeenDaysAgo": 29,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 112000,
                    "bandHigh": 112000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 116767,
                    "distancePct": -0.06,
                    "count": 3,
                    "lastSeenDaysAgo": 25,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 115400,
                    "bandHigh": 117900
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 120281,
                    "distancePct": -3.07,
                    "count": 14,
                    "lastSeenDaysAgo": 4,
                    "valid": false,
                    "weight": 25,
                    "volume": 7502288,
                    "binIndex": 10,
                    "binLow": 119125,
                    "binHigh": 121438
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 122594,
                    "distancePct": -5.05,
                    "count": 9,
                    "lastSeenDaysAgo": 0,
                    "valid": false,
                    "weight": 25,
                    "volume": 6089815,
                    "binIndex": 11,
                    "binLow": 121438,
                    "binHigh": 123750
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 115656,
                    "distancePct": 0.89,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 25,
                    "volume": 4792110,
                    "binIndex": 8,
                    "binLow": 114500,
                    "binHigh": 116812
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 336% (3일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 335.6,
                "latestBurstDaysAgo": 3
              },
              "anchor": {
                "date": "20260605",
                "open": 115500,
                "close": 132700,
                "high": 138300,
                "low": 113000,
                "bodyMid": 124100,
                "volume": 3153461.0,
                "volumeRatio": 4.07,
                "daysAgo": 3
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 49% · 시가 115,200 / 종가 116,700 / 전일 종가 119,100 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "종가 116,700 / 앵커 중심값 124,100 / 복합 지지 116,021 · 앵커 또는 지지 한 축 이탈"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.02:1 / 마지막 30분 평균 136.4% / 마지막 1시간 107.1% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 14.58%, 일간 표준편차 10.20%, 당일 레인지 16.37%.",
              "metrics": {
                "atrPct10": 14.58,
                "returnStd20": 10.2,
                "todayRangePct": 16.37,
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
                    "KIND 공시에서 원익IPS (240810) 종목 공시를 조회합니다.",
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
              "anchorDate": "20260605",
              "anchorOpen": 115500,
              "anchorClose": 132700,
              "anchorHigh": 138300,
              "anchorLow": 113000,
              "anchorBodyMid": 124100,
              "anchorVolumeRatio": 4.07,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 124100,
              "ma10Price": 112780,
              "ma10PrevPrice": 113310,
              "ma20Price": 116805,
              "ma20PrevPrice": 118050,
              "ma10WarningPrice": null,
              "hardStopPrice": 113782,
              "fallbackStopPrice": 113782,
              "effectiveStopPrice": 113782,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(유효 구조 손절 후보 없음) = 113,782원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 113,782원) = 113,782원 / 제외: 앵커 몸통 중심 124,100원가 현재가 116,700원 이상이라 제외 / 20일선 116,805원이 현재가 116,700원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(유효 구조 손절 후보 없음) 중 더 보수적인 가격을 쓰고, 기존 % 손절 113,782원를 하한으로 유지합니다. 앵커 몸통 중심 124,100원가 현재가 116,700원 이상이라 제외 / 20일선 116,805원이 현재가 116,700원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "119,034원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "120,201원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "121,951원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "123,702원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 113,782원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "113,782원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 115533,
              "high": 116700,
              "anchor": 116700,
              "label": "115,533~116,700원 (종가 ±, 분할매수)"
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
                    "targetPrice": "119,034원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "120,201원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "121,951원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "123,702원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 113,782원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "113,782원"
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
                    "targetPrice": "119,034원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "120,201원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "121,951원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "123,702원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 113,782원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "113,782원"
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
                    "targetPrice": "119,034원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "120,201원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "121,951원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "123,702원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 113,782원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "113,782원"
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
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G1, G2, G5, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 120,120 > 20MA 116,805 > 60MA 119,673 · 상승선 5MA · 정배열 미충족 · 외 3건",
            "statusReason": "G1 미충족: 5MA 120,120 > 20MA 116,805 > 60MA 119,673 · 상승선 5MA · 정배열 미충족 / G2 미충족: 종가 116,700 / 60MA 119,673 / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 116700.0,
                "vs52wHighPct": 63.666121112929616,
                "vs52wLowPct": 378.27868852459017,
                "dropFrom52wHighPct": 36.33387888707038,
                "ma20GapPct": -0.08989341209708489,
                "rsi14": 49.61750137004291,
                "volumeRatio20d": 163.7351500763199,
                "rs20Pct": -17.584745762711865,
                "supportDistancePct": 0.58,
                "tradingValueRank": 22.0,
                "marketCapRank": 78.0,
                "marketCapTrillion": 8.9971,
                "per": 81.21,
                "pbr": 9.08,
                "cnsPer": 52.36,
                "foreignRate": 19.12,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T18:02:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ"
          },
          {
            "rank": 2,
            "name": "NAVER",
            "code": "035420",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 7.1,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 654,497주 / 기관 750,508주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 227,000 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.28 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -26.4% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 105% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "시장 Gate 차단 · 신규 진입 보류",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 426% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 257,200 > 20MA 224,495 > 60MA 215,515 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 227,000 / 60MA 215,515",
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
                "status": "⛔",
                "note": "KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -11.67% (필요 ≤ +12%)",
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
                "note": "이격 20MA +1.1% (필요 ≤ +25%) · 60MA +5.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -26.4% (≥12%) · 거래량 105% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 거래량 / 앵커 거래량 47% · 시가 245,000 / 종가 227,000 / 전일 종가 257,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 227,000 / 앵커 중심값 222,750 / 복합 지지 196,097 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "✅",
                "note": "마지막 30분 비율 1.60:1 / 마지막 30분 평균 204.4% / 마지막 1시간 210.7% · 장 막판 매수세 유지",
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
                "note": "당일 거래대금 순위 10위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 654,497주 / 기관 750,508주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "당일 평균 125.0% / 마지막 1시간 210.7% / 마지막 30분 비율 1.60:1 / 마지막 30분 평균 204.4% · 장후반 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 222,000 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 227,000 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 54% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -26.4% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 105% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P3",
                "note": "앵커 중심값 222,750 / 저가 222,000 / 종가 227,000 · 장중 이탈 후 종가 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.28 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +4.24% / KOSPI +4.63% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 47% · 거래량 축소",
                "evalStatus": "met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 227000,
            "previousClose": 257000,
            "dailyChange": -30000,
            "dailyChangePct": -11.67,
            "dailyDirection": "down",
            "entryPriceText": "227,000원 (당일 종가 기준)",
            "entryPrice": 227000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 38.7478,
            "marketCapRank": 20,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 654,497주 / 기관 750,508주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 125.0,
              "note": "토스 공개 체결강도 125.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 73.3,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 210.7,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 204.4,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.5991,
              "last30BuyVolume": 4887.0,
              "last30SellVolume": 3056.0
            },
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 196,097원 (13.61% 아래) · 강도 85점 · family 3개 · 급증봉 저점·수평 지지·스윙로우 군집",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 196097,
                    "distancePct": 13.61,
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
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 85,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 207528,
                    "distancePct": 8.58,
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
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 212276,
                    "distancePct": 6.49,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 22,
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 225625,
                    "distancePct": 0.61,
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
                    "price": 220000,
                    "distancePct": 3.08,
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
                  "price": 196097,
                  "distancePct": 13.61,
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
                  "lastSeenDaysAgo": 8,
                  "strengthPoints": 85,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 85,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "급증봉 저점·수평 지지·스윙로우 군집 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 3,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 196890,
                    "distancePct": 13.26,
                    "count": 13,
                    "lastSeenDaysAgo": 8,
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
                    "distancePct": 11.21,
                    "count": 13,
                    "lastSeenDaysAgo": 10,
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
                    "distancePct": 8.46,
                    "count": 13,
                    "lastSeenDaysAgo": 8,
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
                    "distancePct": 5.92,
                    "count": 21,
                    "lastSeenDaysAgo": 7,
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
                    "price": 220000,
                    "distancePct": 3.08,
                    "count": 10,
                    "lastSeenDaysAgo": 0,
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
                    "price": 225625,
                    "distancePct": 0.61,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 224000,
                    "bandHigh": 227000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 244125,
                    "distancePct": -7.54,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 243000,
                    "bandHigh": 245000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 255833,
                    "distancePct": -12.7,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 255000,
                    "bandHigh": 257000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 269500,
                    "distancePct": -18.72,
                    "count": 2,
                    "lastSeenDaysAgo": 4,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 267500,
                    "bandHigh": 271500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 279750,
                    "distancePct": -23.24,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 279000,
                    "bandHigh": 280500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 195600,
                    "distancePct": 13.83,
                    "count": 3,
                    "lastSeenDaysAgo": 8,
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
                    "distancePct": 8.7,
                    "count": 2,
                    "lastSeenDaysAgo": 22,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 206000,
                    "bandHigh": 208500
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 273342,
                    "distancePct": -20.41,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
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
                    "price": 263908,
                    "distancePct": -16.26,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 25,
                    "volume": 10242452,
                    "binIndex": 15,
                    "binLow": 261550,
                    "binHigh": 266267
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 268625,
                    "distancePct": -18.34,
                    "count": 1,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 25,
                    "volume": 10148390,
                    "binIndex": 16,
                    "binLow": 266267,
                    "binHigh": 270983
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 195800,
                    "distancePct": 13.74,
                    "count": 1,
                    "lastSeenDaysAgo": 8,
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
                    "distancePct": 7.05,
                    "count": 1,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 746.0,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 426% (6일 전) · 200%+ 급증 5회",
                "burstCount": 5,
                "maxRatioPct": 426.1,
                "latestBurstDaysAgo": 1
              },
              "anchor": {
                "date": "20260529",
                "open": 211500,
                "close": 234000,
                "high": 247500,
                "low": 211000,
                "bodyMid": 222750,
                "volume": 7569228.0,
                "volumeRatio": 7.46,
                "daysAgo": 7
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 47% · 시가 245,000 / 종가 227,000 / 전일 종가 257,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 227,000 / 앵커 중심값 222,750 / 복합 지지 196,097 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "✅",
                  "summary": "마지막 30분 비율 1.60:1 / 마지막 30분 평균 204.4% / 마지막 1시간 210.7% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 14.23%, 일간 표준편차 6.71%, 당일 레인지 12.26%.",
              "metrics": {
                "atrPct10": 14.23,
                "returnStd20": 6.71,
                "todayRangePct": 12.26,
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
                    "KIND 공시에서 NAVER (035420) 종목 공시를 조회합니다.",
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
              "anchorDate": "20260529",
              "anchorOpen": 211500,
              "anchorClose": 234000,
              "anchorHigh": 247500,
              "anchorLow": 211000,
              "anchorBodyMid": 222750,
              "anchorVolumeRatio": 7.46,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 222750,
              "ma10Price": 247580,
              "ma10PrevPrice": 244880,
              "ma20Price": 224495,
              "ma20PrevPrice": 223720,
              "ma10WarningPrice": null,
              "hardStopPrice": 224495,
              "fallbackStopPrice": 221325,
              "effectiveStopPrice": 224495,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 222,750원, 20일선 224,495원) = 224,495원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 221,325원) = 224,495원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 222,750원, 20일선 224,495원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 221,325원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "231,540원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "233,810원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "237,215원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "240,620원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 224,495원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-1.1%",
                "targetPrice": "224,495원"
              }
            ],
            "rr": "1 : 3.0",
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
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 257200,
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
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "233,810원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "237,215원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "240,620원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 224,495원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "224,495원"
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
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 257200,
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
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "233,810원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "237,215원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "240,620원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 224,495원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "224,495원"
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
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "가장 가까운 5일선 저항을 앞단 목표가에 반영하고 다음 목표는 기존값을 유지합니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 257200,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+13.3%",
                    "targetPrice": "257,200원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+13.3%",
                    "targetPrice": "257,200원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+13.3%",
                    "targetPrice": "257,200원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+13.3%",
                    "targetPrice": "257,200원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 224,495원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.1%",
                    "targetPrice": "224,495원"
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
              "시장 Gate 차단: G5 — 신규 진입 보류"
            ],
            "setupQuality": "market_hold",
            "statusReasonShort": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "statusReason": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 227000.0,
                "vs52wHighPct": 73.58184764991897,
                "vs52wLowPct": 18.9727463312369,
                "dropFrom52wHighPct": 26.418152350081037,
                "ma20GapPct": 1.11583776921535,
                "rsi14": 49.273685502759754,
                "volumeRatio20d": 104.65403604782932,
                "rs20Pct": 7.328605200945626,
                "supportDistancePct": 13.61,
                "tradingValueRank": 10.0,
                "marketCapRank": 20.0,
                "marketCapTrillion": 38.7478,
                "per": 21.44,
                "pbr": 1.25,
                "cnsPer": 19.95,
                "foreignRate": 34.4,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T18:02:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 3,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 6.5,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 17,667주 / 기관 -25,379주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,090,000 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 1,090,000 ≤ 종가 1,090,000)"
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
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족"
              },
              {
                "code": "D3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "거래량 77% (≥100% 만점·80~100% 부분) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G5, G7, G8, Q1, G12)",
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
                "note": "5MA 1,131,000 > 20MA 1,004,850 > 60MA 604,525 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 1,090,000 / 60MA 604,525",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 92.4 (필요 ≥ 50)",
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
                "note": "당일 등락 -4.13% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 92.4 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +8.5% (필요 ≤ +25%) · 60MA +80.3% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -39.9% (≥12%) · 거래량 77% (≥80%) · 수급추세 +2 (≥0) · 반등 거래량 부족",
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
                "note": "당일 거래량 / 앵커 거래량 35% · 시가 1,090,000 / 종가 1,090,000 / 전일 종가 1,137,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "종가 1,090,000 / 앵커 중심값 1,325,500 / 복합 지지 595,088 · 앵커 또는 지지 한 축 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 0.14:1 / 마지막 30분 평균 196.1% / 마지막 1시간 176.6% · 장 막판 투매 경고",
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
                "note": "당일 거래대금 순위 28위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 17,667주 / 기관 -25,379주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "당일 평균 74.0% / 마지막 1시간 176.6% / 마지막 30분 비율 0.14:1 / 마지막 30분 평균 196.1% · 장후반 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,039,000 · 이평선 터치: 5MA, 10MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,090,000 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 1,090,000 ≤ 종가 1,090,000)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 65% (필요 ≤ 80%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 35% · 거래량 급감",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -39.9% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P3",
                "note": "앵커 중심값 1,325,500 / 저가 1,039,000 / 종가 1,090,000 · 종가 미회복",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +1.94% / KOSPI +4.63% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D3",
                "note": "거래량 77% (≥100% 만점·80~100% 부분) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1090000,
            "previousClose": 1137000,
            "dailyChange": -47000,
            "dailyChangePct": -4.13,
            "dailyDirection": "down",
            "entryPriceText": "1,090,000원 (당일 종가 기준)",
            "entryPrice": 1090000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 24.5191,
            "marketCapRank": 34,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 17,667주 / 기관 -25,379주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 74.0,
              "note": "토스 공개 체결강도 74.0% / 최근 체결 38분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 55.6,
              "observedMinutes": 38,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 38분 프록시",
              "lastHourAvgStrength": 176.6,
              "lastHourObservedMinutes": 38,
              "last30AvgStrength": 196.1,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.1449,
              "last30BuyVolume": 10.0,
              "last30SellVolume": 69.0
            },
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 595,088원 (45.40% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 595088,
                    "distancePct": 45.4,
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
                    "distancePct": 68.89,
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
                    "distancePct": 4.91,
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
                    "price": 1092500,
                    "distancePct": -0.23,
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
                    "price": 1071000,
                    "distancePct": 1.74,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 595088,
                  "distancePct": 45.4,
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
                    "distancePct": 77.09,
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
                    "distancePct": 76.64,
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
                    "distancePct": 76.17,
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
                    "distancePct": 74.52,
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
                    "distancePct": 73.41,
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
                    "distancePct": 72.62,
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
                    "distancePct": 71.26,
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
                    "distancePct": 70.49,
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
                    "distancePct": 68.88,
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
                    "distancePct": 68.07,
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
                    "distancePct": 66.99,
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
                    "distancePct": 65.78,
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
                    "distancePct": 65.08,
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
                    "distancePct": 63.83,
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
                    "distancePct": 62.45,
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
                    "distancePct": 54.13,
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
                    "distancePct": 52.34,
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
                    "distancePct": 50.55,
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
                    "distancePct": 47.5,
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
                    "distancePct": 45.55,
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
                    "distancePct": 44.22,
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
                    "distancePct": 41.93,
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
                    "distancePct": 38.07,
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
                    "distancePct": 36.51,
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
                    "distancePct": 34.77,
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
                    "distancePct": 31.33,
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
                    "distancePct": 29.91,
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
                    "distancePct": 10.0,
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
                    "distancePct": 4.68,
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
                    "price": 1071000,
                    "distancePct": 1.74,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1068000,
                    "bandHigh": 1074000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1092500,
                    "distancePct": -0.23,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1090000,
                    "bandHigh": 1095000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1141400,
                    "distancePct": -4.72,
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
                    "distancePct": -7.02,
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
                    "distancePct": 68.89,
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
                    "distancePct": -2.0,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": false,
                    "weight": 25,
                    "volume": 3635740,
                    "binIndex": 13,
                    "binLow": 1079646,
                    "binHigh": 1144042
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 596677,
                    "distancePct": 45.26,
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
                    "distancePct": 7.25,
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
                    "distancePct": 5.14,
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
              },
              "anchor": {
                "date": "20260529",
                "open": 1193000,
                "close": 1458000,
                "high": 1474000,
                "low": 1145000,
                "bodyMid": 1325500,
                "volume": 1402802.0,
                "volumeRatio": 3.49,
                "daysAgo": 7
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 35% · 시가 1,090,000 / 종가 1,090,000 / 전일 종가 1,137,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "종가 1,090,000 / 앵커 중심값 1,325,500 / 복합 지지 595,088 · 앵커 또는 지지 한 축 이탈"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.14:1 / 마지막 30분 평균 196.1% / 마지막 1시간 176.6% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 18.51%, 일간 표준편차 10.01%, 당일 레인지 10.99%.",
              "metrics": {
                "atrPct10": 18.51,
                "returnStd20": 10.01,
                "todayRangePct": 10.99,
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
                    "KIND 공시에서 LG이노텍 (011070) 종목 공시를 조회합니다.",
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
              "anchorDate": "20260529",
              "anchorOpen": 1193000,
              "anchorClose": 1458000,
              "anchorHigh": 1474000,
              "anchorLow": 1145000,
              "anchorBodyMid": 1325500,
              "anchorVolumeRatio": 3.49,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 1325500,
              "ma10Price": 1207300,
              "ma10PrevPrice": 1205100,
              "ma20Price": 1004850,
              "ma20PrevPrice": 984750,
              "ma10WarningPrice": null,
              "hardStopPrice": 1004850,
              "fallbackStopPrice": 1062750,
              "effectiveStopPrice": 1062750,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 1,004,850원) = 1,004,850원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 1,062,750원) = 1,062,750원 / 제외: 앵커 몸통 중심 1,325,500원가 현재가 1,090,000원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(20일선 1,004,850원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 1,062,750원를 하한으로 유지합니다. 앵커 몸통 중심 1,325,500원가 현재가 1,090,000원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "1,111,800원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,122,700원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "1,139,050원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "1,155,400원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,062,750원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "1,062,750원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1079100,
              "high": 1090000,
              "anchor": 1090000,
              "label": "1,079,100~1,090,000원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1131000,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,111,800원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,122,700원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,139,050원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,155,400원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,062,750원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,062,750원"
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
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1131000,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,111,800원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,122,700원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,139,050원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,155,400원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,062,750원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,062,750원"
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
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "가장 가까운 5일선 저항을 앞단 목표가에 반영하고 다음 목표는 기존값을 유지합니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 1131000,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+3.8%",
                    "targetPrice": "1,131,000원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.8%",
                    "targetPrice": "1,131,000원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,139,050원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,155,400원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,062,750원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "1,062,750원"
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
              "핵심 Gate 미충족: G7",
              "핵심 Gate 미충족: G8",
              "핵심 Gate 미충족: Q1",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G5, G7, G8, Q1, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 · 외 4건",
            "statusReason": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / G7 미충족: 주봉 RSI 92.4 (필요 ≤ 80) · 과매수 과열 / G8 미충족: 이격 20MA +8.5% (필요 ≤ +25%) · 60MA +80.3% (필요 ≤ +60%) · 과이격(지지선 눌림 아님) / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1090000.0,
                "vs52wHighPct": 60.088202866593164,
                "vs52wLowPct": 678.0157030692362,
                "dropFrom52wHighPct": 39.911797133406836,
                "ma20GapPct": 8.473901577349853,
                "rsi14": 58.123112614986574,
                "volumeRatio20d": 76.60271265343881,
                "rs20Pct": 58.43023255813954,
                "supportDistancePct": 45.4,
                "tradingValueRank": 28.0,
                "marketCapRank": 34.0,
                "marketCapTrillion": 24.5191,
                "per": 50.58,
                "pbr": 4.03,
                "cnsPer": 30.28,
                "foreignRate": 23.03,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T18:02:01+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "후성",
            "code": "093370",
            "strictScore": 5.0,
            "signalScore": 5.0,
            "score": 5.0,
            "scoreMax": 11.5,
            "effectiveScoreMax": 9.5,
            "gradeScore": 5.3,
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
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 체결강도 102.0% · 100% 유지 비율 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 97.1% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 1440% · 폭발적 급증 (≥300%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 97.1% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 66% / 윗꼬리·몸통 0.26 · 강마감 약충족"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.96 (필요 ≥ 1.2)"
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
                "note": "5일 초과 +65.1% / 20일 초과 +21.8%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 97.1% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 21",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 1440% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 66% / 윗꼬리·몸통 0.26 · 강마감 약충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "⛔",
                "note": "당일 등락 +19.67% (필요 ≤ +12%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 16,180 / 5MA 12,808 (전일 5MA 11,688) · 5MA 위·우상향",
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
                "note": "20일 고점 대비 97.1% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 1440% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 97.1% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 체결강도 102.0% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C2",
                "note": "몸통 66% / 윗꼬리·몸통 0.26 · 강마감 약충족",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.96 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 16180,
            "previousClose": 13520,
            "dailyChange": 2660,
            "dailyChangePct": 19.67,
            "dailyDirection": "up",
            "entryPriceText": "16,180원 (당일 종가 기준)",
            "entryPrice": 16180,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.7354,
            "marketCapRank": 243,
            "marketCapUniverseCount": 2559,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 1,882,011주 / 기관 330,988주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 102.0,
              "note": "토스 공개 체결강도 102.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A093370/order",
              "asOf": "2026-06-10T06:19:59Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 78.6,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 78.6,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 0.7862,
              "last30BuyVolume": 4745.0,
              "last30SellVolume": 6035.0
            },
            "orderbook": {
              "bidAskRatio": 0.964,
              "bidTotal": 23909,
              "askTotal": 24801,
              "note": "Naver 호가잔량합계 매수 23,909 / 매도 24,801",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 88.46, ATR10 12.00%, 일간 표준편차 8.72%, 당일 레인지 21.15%.",
              "metrics": {
                "atrPct10": 12.0,
                "returnStd20": 8.72,
                "todayRangePct": 21.15,
                "vkospi": 88.46
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
              "fallbackStopPrice": 15533,
              "effectiveHardStopPrice": 15533,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 15,420원와 기존 % 손절 15,533원 중 더 높은 15,533원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 15,420원이며, 기존 % 손절 15,533원보다 느슨해지지 않게 15,533원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "16,670원",
                "historicalHitRate": 0.5918,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "16,746원",
                "historicalHitRate": 0.4082,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "17,070원",
                "historicalHitRate": 0.3367,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+7.5%",
                "targetPrice": "17,394원",
                "historicalHitRate": 0.2857,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 15,533원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-4.0%",
                "targetPrice": "15,533원"
              }
            ],
            "rr": "1 : 1.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 15929,
              "high": 16091,
              "anchor": 16180,
              "label": "15,929~16,091원 (종가 ±, 분할매수)"
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
                    "targetPrice": "16,423원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "16,746원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "17,070원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "17,394원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,533원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "15,533원"
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
                    "targetPrice": "16,423원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "16,746원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "17,070원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "17,394원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,533원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "15,533원"
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
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 14건)",
                "nearestResistancePrice": 16670,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "16,670원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "16,746원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "17,070원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "17,394원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 15,533원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-4.0%",
                    "targetPrice": "15,533원"
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
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 14건)",
              "sampleCount": 14,
              "ev": -1.6685
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
            "statusReasonShort": "G6 미충족: 당일 등락 +19.67% (필요 ≤ +12%)",
            "statusReason": "G6 미충족: 당일 등락 +19.67% (필요 ≤ +12%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 16180.0,
                "vs52wHighPct": 97.0605878824235,
                "vs52wLowPct": 255.6043956043956,
                "dropFrom52wHighPct": 2.9394121175764845,
                "ma20GapPct": 32.514332514332516,
                "rsi14": 68.59412493379249,
                "volumeRatio20d": 1439.9231597344854,
                "rs20Pct": 20.656226696495153,
                "tradingValueRank": 21.0,
                "marketCapRank": 243.0,
                "marketCapTrillion": 1.7354,
                "per": 0.0,
                "pbr": 5.05,
                "cnsPer": 0.0,
                "foreignRate": 9.35,
                "supplyTrendScore": 4.0
              },
              "evaluatedAt": "2026-06-10T15:23:22+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "테크윙",
            "code": "089030",
            "strictScore": 2.4,
            "signalScore": 2.4,
            "score": 2.4,
            "scoreMax": 11.5,
            "effectiveScoreMax": 9.5,
            "gradeScore": 2.5,
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
                "note": "외인 891,119주 / 기관 133,026주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 체결강도 101.7% · 100% 유지 비율 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 88.9% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 372% · 폭발적 급증 (≥300%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 88.9% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 1% / 윗꼬리·몸통 71.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.23 (필요 ≥ 1.2) · 매수 잔량 우위"
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
                "note": "5일 초과 +29.9% / 20일 초과 +0.1%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 77.8% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 27",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 372% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 1% / 윗꼬리·몸통 71.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -3.52% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 57,600 / 5MA 55,010 (전일 5MA 53,270) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 891,119주 / 기관 133,026주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 372% · 폭발적 급증 (≥300%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 2.23 (필요 ≥ 1.2) · 매수 잔량 우위",
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
                "note": "당일 평균 체결강도 101.7% · 100% 유지 비율 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 88.9% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 88.9% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 1% / 윗꼬리·몸통 71.00 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 57600,
            "previousClose": 59700,
            "dailyChange": -2100,
            "dailyChangePct": -3.52,
            "dailyDirection": "down",
            "entryPriceText": "57,600원 (당일 종가 기준)",
            "entryPrice": 57600,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.1343,
            "marketCapRank": 213,
            "marketCapUniverseCount": 2559,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 891,119주 / 기관 133,026주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 101.7,
              "note": "토스 공개 체결강도 101.7% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A089030/order",
              "asOf": "2026-06-10T06:19:59Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 75.4,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 75.4,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 0.7542,
              "last30BuyVolume": 2292.0,
              "last30SellVolume": 3039.0
            },
            "orderbook": {
              "bidAskRatio": 2.2316,
              "bidTotal": 21852,
              "askTotal": 9792,
              "note": "Naver 호가잔량합계 매수 21,852 / 매도 9,792",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=089030"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 88.46, ATR10 12.48%, 일간 표준편차 7.34%, 당일 레인지 13.90%.",
              "metrics": {
                "atrPct10": 12.48,
                "returnStd20": 7.34,
                "todayRangePct": 13.9,
                "vkospi": 88.46
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
              "referencePrice": 57600,
              "referenceBandLow": 55900,
              "referenceBandHigh": 57600,
              "entryDayOpenPrice": 57700,
              "fallbackStopPrice": 55296,
              "effectiveHardStopPrice": 57600,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 57,600원와 기존 % 손절 55,296원 중 더 높은 57,600원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 57,600원이며, 기존 % 손절 55,296원보다 느슨해지지 않게 57,600원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "25% 익절",
                "targetYield": "+0.7%",
                "targetPrice": "58,000원",
                "historicalHitRate": 0.5918,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "59,600원",
                "historicalHitRate": 0.4082,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "60,768원",
                "historicalHitRate": 0.3367,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+7.5%",
                "targetPrice": "61,920원",
                "historicalHitRate": 0.2857,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 57,600원 종가 이탈",
                "quantity": "전량",
                "targetYield": "+0.0%",
                "targetPrice": "57,600원"
              }
            ],
            "rr": "1 : -",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 56707,
              "high": 57283,
              "anchor": 57600,
              "label": "56,707~57,283원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 58000,
                "secondaryResistancePrice": 59600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "58,464원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "59,616원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "60,768원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "61,920원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 57,600원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+0.0%",
                    "targetPrice": "57,600원"
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
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 58000,
                "secondaryResistancePrice": 59600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "58,000원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "59,600원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "60,768원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "61,920원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 57,600원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+0.0%",
                    "targetPrice": "57,600원"
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
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 14건)",
                "nearestResistancePrice": 58000,
                "secondaryResistancePrice": 59600,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.7%",
                    "targetPrice": "58,000원",
                    "historicalHitRate": 0.5918,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "59,600원",
                    "historicalHitRate": 0.4082,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "60,768원",
                    "historicalHitRate": 0.3367,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.5%",
                    "targetPrice": "61,920원",
                    "historicalHitRate": 0.2857,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 57,600원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+0.0%",
                    "targetPrice": "57,600원"
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
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 14건)",
              "sampleCount": 14,
              "ev": -1.6685
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
              "매매금지(핵심 Gate 미충족: G2)",
              "등급 C — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 52주 고가 대비 77.8% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 77.8% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 57600.0,
                "vs52wHighPct": 77.83783783783784,
                "vs52wLowPct": 121.11324376199617,
                "dropFrom52wHighPct": 22.162162162162165,
                "ma20GapPct": 9.282360195418109,
                "rsi14": 54.8351026174758,
                "volumeRatio20d": 372.2770085417187,
                "rs20Pct": -1.0309278350515463,
                "tradingValueRank": 27.0,
                "marketCapRank": 213.0,
                "marketCapTrillion": 2.1343,
                "per": 468.29,
                "pbr": 10.08,
                "cnsPer": 0.0,
                "foreignRate": 13.85,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:23:22+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "LG씨엔에스",
            "code": "064400",
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
                "note": "외인 56,435주 / 기관 11,018주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +56,435 / 전일 -29,998 · 기관 당일 +11,018 / 전일 +144,447 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 219.6% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 76.0% / 마지막 1시간 219.6% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 3일 누적 +855,278주 · 양수 3/3일 · 증가 1회"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 98.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 108,640 / 20MA 95,570 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 52% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -5.25% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +0.39% / KOSPI +4.63% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 13.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -29,998/당일 +56,435 · 기관 전일 +144,447/당일 +11,018 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 93,800 / 60MA 74,625",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 55.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 85",
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
                "status": "⛔",
                "note": "외인 보유율 5.6% (≥25%) · 20일 수익률 +33.0% (≥0%) · 외인 매집 주체 약함",
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
                "note": "외인 56,435주 / 기관 11,018주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +56,435 / 전일 -29,998 · 기관 당일 +11,018 / 전일 +144,447 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 219.6% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 76.0% / 마지막 1시간 219.6% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 3일 누적 +855,278주 · 양수 3/3일 · 증가 1회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 98.1% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 108,640 / 20MA 95,570 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 52% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 13.00:1 · 평균 체결강도 300.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 등락 -5.25% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +0.39% / KOSPI +4.63% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 93800,
            "previousClose": 99000,
            "dailyChange": -5200,
            "dailyChangePct": -5.25,
            "dailyDirection": "down",
            "entryPriceText": "93,800원 (당일 종가 기준)",
            "entryPrice": 93800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.991,
            "marketCapRank": 79,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 56,435주 / 기관 11,018주 / 마지막 1시간 219.6% · 장후반 매수세 강화 · 마지막 30분 틱 13.00:1. 외국인 최근 3일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 76.0,
              "note": "토스 공개 체결강도 76.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A064400/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 83.3,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 219.6,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 13.0,
              "last30BuyVolume": 13.0,
              "last30SellVolume": 0.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 17.58%, 일간 표준편차 11.52%, 당일 레인지 12.63%.",
              "metrics": {
                "atrPct10": 17.58,
                "returnStd20": 11.52,
                "todayRangePct": 12.63,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 3,
              "sponsor": "foreign",
              "cumulativeNet": 855278.0,
              "positiveDays": 3,
              "improvementCount": 1,
              "series": {
                "foreign": [
                  {
                    "date": "20260610",
                    "net": 366211.0
                  },
                  {
                    "date": "20260609",
                    "net": 39422.0
                  },
                  {
                    "date": "20260608",
                    "net": 449645.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260610",
                    "net": -48186.0
                  },
                  {
                    "date": "20260609",
                    "net": 36083.0
                  },
                  {
                    "date": "20260608",
                    "net": -72010.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260610",
                    "net": 366211.0
                  },
                  {
                    "date": "20260609",
                    "net": 39422.0
                  },
                  {
                    "date": "20260608",
                    "net": 449645.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 3일 매집 추세 강화",
              "note": "외국인 최근 3일 누적 +855,278주 · 양수 3/3일 · 증가 1회"
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
                "targetYield": "+2.0%",
                "targetPrice": "95,700원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "99,400원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "99,400원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "101,304원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "104,118원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 90,986원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "90,986원"
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
              "fallbackStopPrice": 90986,
              "effectiveHardStopPrice": 90986,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 90,986원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 90,986원만 유지합니다."
            },
            "rr": "1 : 2.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 92862,
              "high": 93800,
              "anchor": 93800,
              "label": "92,862~93,800원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 95700,
                "secondaryResistancePrice": 99400,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "95,676원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "97,083원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "98,959원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "101,304원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "104,118원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 90,986원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "90,986원"
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
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 95700,
                "secondaryResistancePrice": 99400,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "95,676원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "97,083원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "98,959원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "101,304원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "104,118원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 90,986원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "90,986원"
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
                "nearestResistancePrice": 95700,
                "secondaryResistancePrice": 99400,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "95,700원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "99,400원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "99,400원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "101,304원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "104,118원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 90,986원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "90,986원"
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
            "statusReasonShort": "Q1 미충족: 외인 보유율 5.6% (≥25%) · 20일 수익률 +33.0% (≥0%) · 외인 매집 주체 약함 · 외 1건",
            "statusReason": "Q1 미충족: 외인 보유율 5.6% (≥25%) · 20일 수익률 +33.0% (≥0%) · 외인 매집 주체 약함 / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 93800.0,
                "vs52wHighPct": 55.2414605418139,
                "vs52wLowPct": 88.73239436619718,
                "dropFrom52wHighPct": 44.7585394581861,
                "ma20GapPct": -1.8520456210107776,
                "rsi14": 50.33997432552016,
                "volumeRatio20d": 46.70899551261894,
                "rs20Pct": 33.04964539007092,
                "tradingValueRank": 85.0,
                "marketCapRank": 79.0,
                "marketCapTrillion": 8.991,
                "per": 19.48,
                "pbr": 3.08,
                "cnsPer": 18.32,
                "foreignRate": 5.56,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T00:01:49+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 2,
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 6.6,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 2,880,306주 / 기관 3,295,009주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +2,880,306 / 전일 +549,645 · 기관 당일 +3,295,009 / 전일 -5,437,840 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 225.0% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 111.0% / 마지막 1시간 225.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "최근 3일 매집 추세 약함"
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
                "note": "5MA 320,100 / 20MA 304,325 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 74% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -6.06% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +11.25% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.05:1 · 평균 체결강도 221.1% (필요 ≥ 1.1:1)"
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
            "statusLabel": "시장 Gate 차단 · 신규 진입 보류",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +549,645/당일 +2,880,306 · 기관 전일 -5,437,840/당일 +3,295,009 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 302,500 / 60MA 240,960",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 80.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 2",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 78% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 47.6% (≥25%) · 20일 수익률 +6.0% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
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
                "note": "외인 2,880,306주 / 기관 3,295,009주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +2,880,306 / 전일 +549,645 · 기관 당일 +3,295,009 / 전일 -5,437,840 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 225.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 111.0% / 마지막 1시간 225.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 99.4% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 320,100 / 20MA 304,325 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 74% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +11.25% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S5",
                "note": "최근 3일 매집 추세 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -6.06% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.05:1 · 평균 체결강도 221.1% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 302500,
            "previousClose": 322000,
            "dailyChange": -19500,
            "dailyChangePct": -6.06,
            "dailyDirection": "down",
            "entryPriceText": "302,500원 (당일 종가 기준)",
            "entryPrice": 302500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1885.4249,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 2,880,306주 / 기관 3,295,009주 / 마지막 1시간 225.0% · 장후반 매수세 강화 · 마지막 30분 틱 0.05:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 8.22%, 일간 표준편차 5.60%, 당일 레인지 5.98%.",
              "metrics": {
                "atrPct10": 8.22,
                "returnStd20": 5.6,
                "todayRangePct": 5.98,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 3,
              "sponsor": "none",
              "cumulativeNet": 0.0,
              "positiveDays": 0,
              "improvementCount": 0,
              "series": {
                "foreign": [
                  {
                    "date": "20260610",
                    "net": -3840270.0
                  },
                  {
                    "date": "20260609",
                    "net": -1596173.0
                  },
                  {
                    "date": "20260608",
                    "net": -1174306.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260610",
                    "net": -2851841.0
                  },
                  {
                    "date": "20260609",
                    "net": 1767022.0
                  },
                  {
                    "date": "20260608",
                    "net": -3937194.0
                  }
                ],
                "sponsor": []
              },
              "status": "not_met",
              "score": 0.0,
              "summary": "최근 매집 추세 약함",
              "note": "최근 3일 매집 추세 약함"
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
                "targetPrice": "306,500원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "314,500원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.5%",
                "targetPrice": "319,138원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "326,700원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "335,775원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 310,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "+2.5%",
                "targetPrice": "310,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260609",
              "anchorOpen": 310000,
              "anchorClose": 322000,
              "anchorVolumeRatio20d": 0.87,
              "anchorStopPrice": 310000,
              "fallbackStopPrice": 293425,
              "effectiveHardStopPrice": 310000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 310,000원와 기존 % 손절 293,425원 중 더 높은 310,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 310,000원를 기준으로 잡고, 기존 % 손절 293,425원보다 느슨해지지 않게 310,000원로 고정합니다."
            },
            "rr": "1 : 2.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 299475,
              "high": 302500,
              "anchor": 302500,
              "label": "299,475~302,500원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 306500,
                "secondaryResistancePrice": 314500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "308,550원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "313,088원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "319,138원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "326,700원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "335,775원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 310,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+2.5%",
                    "targetPrice": "310,000원"
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
                "nearestResistancePrice": 306500,
                "secondaryResistancePrice": 314500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "306,500원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "313,088원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "319,138원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "326,700원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "335,775원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 310,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+2.5%",
                    "targetPrice": "310,000원"
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
                "nearestResistancePrice": 306500,
                "secondaryResistancePrice": 314500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+1.3%",
                    "targetPrice": "306,500원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "314,500원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "319,138원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "326,700원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "335,775원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 310,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+2.5%",
                    "targetPrice": "310,000원"
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
              "시장 Gate 차단: G5 — 신규 진입 보류"
            ],
            "setupQuality": "market_hold",
            "statusReasonShort": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "statusReason": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 302500.0,
                "vs52wHighPct": 80.23872679045093,
                "vs52wLowPct": 431.63444639718807,
                "dropFrom52wHighPct": 19.76127320954907,
                "ma20GapPct": -0.5996878337303869,
                "rsi14": 52.79484845800021,
                "volumeRatio20d": 77.63732334320915,
                "rs20Pct": 5.954465849387041,
                "tradingValueRank": 2.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 1885.4249,
                "per": 26.07,
                "pbr": 4.48,
                "cnsPer": 7.36,
                "foreignRate": 47.58,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T00:01:49+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 3,
            "name": "NAVER",
            "code": "035420",
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
                "note": "외인 654,497주 / 기관 750,508주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +654,497 / 전일 -183,804 · 기관 당일 +750,508 / 전일 +114,302 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 210.7% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 125.0% / 마지막 1시간 210.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "최근 3일 매집 추세 약함"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 101.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 257,200 / 20MA 224,495 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 54% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -11.67% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +4.24% / KOSPI +4.63% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.60:1 · 평균 체결강도 204.4% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
            "statusLabel": "시장 Gate 차단 · 신규 진입 보류",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 -183,804/당일 +654,497 · 기관 전일 +114,302/당일 +750,508 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 227,000 / 60MA 215,515",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 73.6% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 105% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 34.4% (≥25%) · 20일 수익률 +7.3% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
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
                "note": "외인 654,497주 / 기관 750,508주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +654,497 / 전일 -183,804 · 기관 당일 +750,508 / 전일 +114,302 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 210.7% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 125.0% / 마지막 1시간 210.7% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 101.1% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 257,200 / 20MA 224,495 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 54% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.60:1 · 평균 체결강도 204.4% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S5",
                "note": "최근 3일 매집 추세 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -11.67% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +4.24% / KOSPI +4.63% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 227000,
            "previousClose": 257000,
            "dailyChange": -30000,
            "dailyChangePct": -11.67,
            "dailyDirection": "down",
            "entryPriceText": "227,000원 (당일 종가 기준)",
            "entryPrice": 227000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 38.7478,
            "marketCapRank": 20,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 654,497주 / 기관 750,508주 / 마지막 1시간 210.7% · 장후반 매수세 강화 · 마지막 30분 틱 1.60:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 125.0,
              "note": "토스 공개 체결강도 125.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 73.3,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 210.7,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 204.4,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.5991,
              "last30BuyVolume": 4887.0,
              "last30SellVolume": 3056.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 14.23%, 일간 표준편차 6.71%, 당일 레인지 12.26%.",
              "metrics": {
                "atrPct10": 14.23,
                "returnStd20": 6.71,
                "todayRangePct": 12.26,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 3,
              "sponsor": "none",
              "cumulativeNet": 0.0,
              "positiveDays": 0,
              "improvementCount": 0,
              "series": {
                "foreign": [
                  {
                    "date": "20260610",
                    "net": -41839.0
                  },
                  {
                    "date": "20260609",
                    "net": -260772.0
                  },
                  {
                    "date": "20260608",
                    "net": 325140.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260610",
                    "net": -272647.0
                  },
                  {
                    "date": "20260609",
                    "net": -113937.0
                  },
                  {
                    "date": "20260608",
                    "net": 1427219.0
                  }
                ],
                "sponsor": []
              },
              "status": "not_met",
              "score": 0.0,
              "summary": "최근 매집 추세 약함",
              "note": "최근 3일 매집 추세 약함"
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
                "targetPrice": "227,500원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "247,500원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "247,500원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+9.0%",
                "targetPrice": "247,500원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "251,970원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 220,190원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "220,190원"
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
              "fallbackStopPrice": 220190,
              "effectiveHardStopPrice": 220190,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 220,190원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 220,190원만 유지합니다."
            },
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 224730,
              "high": 227000,
              "anchor": 227000,
              "label": "224,730~227,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 227500,
                "secondaryResistancePrice": 247500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "231,540원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "234,945원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "239,485원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "245,160원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "251,970원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 220,190원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "220,190원"
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
                "nearestResistancePrice": 227500,
                "secondaryResistancePrice": 247500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "227,500원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "234,945원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "239,485원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "245,160원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "251,970원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 220,190원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "220,190원"
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
                "nearestResistancePrice": 227500,
                "secondaryResistancePrice": 247500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "227,500원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+9.0%",
                    "targetPrice": "247,500원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+9.0%",
                    "targetPrice": "247,500원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+9.0%",
                    "targetPrice": "247,500원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "251,970원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 220,190원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "220,190원"
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
              "시장 Gate 차단: G5 — 신규 진입 보류"
            ],
            "setupQuality": "market_hold",
            "statusReasonShort": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "statusReason": "G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 227000.0,
                "vs52wHighPct": 73.58184764991897,
                "vs52wLowPct": 18.9727463312369,
                "dropFrom52wHighPct": 26.418152350081037,
                "ma20GapPct": 1.11583776921535,
                "rsi14": 49.273685502759754,
                "volumeRatio20d": 104.65403604782932,
                "rs20Pct": 7.328605200945626,
                "tradingValueRank": 10.0,
                "marketCapRank": 20.0,
                "marketCapTrillion": 38.7478,
                "per": 21.44,
                "pbr": 1.25,
                "cnsPer": 19.95,
                "foreignRate": 34.4,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T00:01:49+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 6.1,
            "signalScore": 6.1,
            "score": 6.1,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.1,
            "grade": "B",
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 111.0% / 마지막 1시간 77.6% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,189,000 / 20MA 1,190,750 (99.9% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 54% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≥ 200%)"
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
                "note": "직전 30분봉 종가 1160000, 전봉 종가 1156000 미달"
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
                "note": "시총 156.9조 (필요 ≥ 5조)",
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
                "note": "1개월 수익률 +8.3% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -14.6% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,189,000 / 60MA 848,533",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -11.1% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 2.38)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 -0.1% (≤+22%) · RSI14 54 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 7,021→38,142 / 기관 -24,451→17,814 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,189,000 / 20MA 1,190,750 (99.9% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 54% (필요 ≥ 50%)",
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
                "note": "당일 평균 111.0% / 마지막 1시간 77.6% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1160000, 전봉 종가 1156000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1189000,
            "previousClose": 1269000,
            "dailyChange": -80000,
            "dailyChangePct": -6.3,
            "dailyDirection": "down",
            "entryPriceText": "1,189,000원 (당일 종가 기준)",
            "entryPrice": 1189000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 156.8985,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2559,
            "keyPoint": "20일 고점 대비 -14.6% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "직전 30분봉 종가 1160000, 전봉 종가 1156000",
              "latestOpen": 1160000.0,
              "latestClose": 1160000.0,
              "previousClose": 1156000.0
            },
            "toss": {
              "avgStrength": 111.0,
              "note": "토스 공개 체결강도 111.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-10T06:19:59Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 77.6,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 77.6,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 0.7758,
              "last30BuyVolume": 346.0,
              "last30SellVolume": 446.0
            },
            "orderbook": {
              "bidAskRatio": 1.7808,
              "bidTotal": 390,
              "askTotal": 219,
              "note": "Naver 호가잔량합계 매수 390 / 매도 219",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 88.46, ATR10 9.89%, 일간 표준편차 6.67%, 당일 레인지 7.25%.",
              "metrics": {
                "atrPct10": 9.89,
                "returnStd20": 6.67,
                "todayRangePct": 7.25,
                "vkospi": 88.46
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "60% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,224,670원",
                "historicalHitRate": 0.6917,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.5%",
                "targetPrice": "1,231,000원",
                "historicalHitRate": 0.6241,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,165,220원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "1,165,220원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1139000,
              "fallbackStopPrice": 1165220,
              "effectiveHardStopPrice": 1165220,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,139,000원와 기존 % 손절 1,165,220원 중 더 높은 1,165,220원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,139,000원이며, 기존 % 손절 1,165,220원보다 느슨해지지 않게 1,165,220원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 1170570,
              "high": 1182460,
              "anchor": 1189000,
              "label": "1,170,570~1,182,460원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1255990,
                "retrace50Price": 1290500,
                "nearestResistancePrice": 1190000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+5.6%",
                    "targetPrice": "1,255,990원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+17.1%",
                    "targetPrice": "1,392,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,165,220원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,165,220원"
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
                "retrace33Price": 1255990,
                "retrace50Price": 1290500,
                "nearestResistancePrice": 1190000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+5.6%",
                    "targetPrice": "1,255,990원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.6%",
                    "targetPrice": "1,255,990원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,165,220원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,165,220원"
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
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
                "recentHighPrice": 1392000,
                "retrace33Price": 1255990,
                "retrace50Price": 1290500,
                "nearestResistancePrice": 1190000,
                "secondaryResistancePrice": 1231000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,224,670원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,231,000원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,165,220원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "1,165,220원"
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
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
              "sampleCount": 33,
              "ev": -0.1287
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
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 3건 (최근: 2026-06-04) · 재진입 차단 · 외 1건",
            "statusReason": "F4 미충족: 최근 손절 이력 3건 (최근: 2026-06-04) · 재진입 차단 / G1 미충족: 1개월 수익률 +8.3% (필요 ≥ +15%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1189000.0,
                "vs52wHighPct": 85.41666666666666,
                "vs52wLowPct": 825.2918287937744,
                "dropFrom52wHighPct": 14.583333333333334,
                "ma20GapPct": -0.14696619777451186,
                "rsi14": 54.44707079861773,
                "volumeRatio20d": 70.98758439921482,
                "rs20Pct": 0.16849199663016007,
                "tradingValueRank": 12.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 156.8985,
                "per": 10.1,
                "pbr": 4.35,
                "cnsPer": 4.31,
                "foreignRate": 49.25,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:23:22+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 4.8,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -1,174,306→-1,596,173 / 기관 -3,937,194→1,767,022 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 74.0% / 마지막 1시간 35.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 303,000 / 20MA 304,350 (99.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 40% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 67% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.16 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 300250, 전봉 종가 298500 미달"
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
                "note": "당일 거래대금 순위 2위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 1771.4조 (필요 ≥ 5조)",
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
                "note": "최근 손절 이력 1건 (최근: 2026-06-02) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +12.8% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -18.1% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 303,000 / 60MA 240,968",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -10.2% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 -0.4% (≤+22%) · RSI14 53 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -1,174,306→-1,596,173 / 기관 -3,937,194→1,767,022 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 303,000 / 20MA 304,350 (99.6% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.16 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 74.0% / 마지막 1시간 35.7% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 40% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 67% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 300250, 전봉 종가 298500 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 303000,
            "previousClose": 322000,
            "dailyChange": -19000,
            "dailyChangePct": -5.9,
            "dailyDirection": "down",
            "entryPriceText": "303,000원 (당일 종가 기준)",
            "entryPrice": 303000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1771.4224,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2559,
            "keyPoint": "20일 고점 대비 -18.1% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
            "eventFilter": null,
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 300250, 전봉 종가 298500",
              "latestOpen": 300250.0,
              "latestClose": 300250.0,
              "previousClose": 298500.0
            },
            "toss": {
              "avgStrength": 74.0,
              "note": "토스 공개 체결강도 74.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-06-10T06:19:59Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 35.7,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 35.7,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 0.3573,
              "last30BuyVolume": 1139.0,
              "last30SellVolume": 3188.0
            },
            "orderbook": {
              "bidAskRatio": 1.161,
              "bidTotal": 232172,
              "askTotal": 199971,
              "note": "Naver 호가잔량합계 매수 232,172 / 매도 199,971",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=005930"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 88.46, ATR10 8.22%, 일간 표준편차 5.59%, 당일 레인지 5.98%.",
              "metrics": {
                "atrPct10": 8.22,
                "returnStd20": 5.59,
                "todayRangePct": 5.98,
                "vkospi": 88.46
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+1.2%",
                "targetPrice": "306,500원",
                "historicalHitRate": 0.6917,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+3.8%",
                "targetPrice": "314,500원",
                "historicalHitRate": 0.6241,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 296,940원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "296,940원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 295250,
              "fallbackStopPrice": 296940,
              "effectiveHardStopPrice": 296940,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 295,250원와 기존 % 손절 296,940원 중 더 높은 296,940원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 295,250원이며, 기존 % 손절 296,940원보다 느슨해지지 않게 296,940원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 298304,
              "high": 301334,
              "anchor": 303000,
              "label": "298,304~301,334원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 370000,
                "retrace33Price": 325110,
                "retrace50Price": 336500,
                "nearestResistancePrice": 306500,
                "secondaryResistancePrice": 314500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.2%",
                    "targetPrice": "306,500원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.8%",
                    "targetPrice": "314,500원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+22.1%",
                    "targetPrice": "370,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 296,940원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "296,940원"
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
                "recentHighPrice": 370000,
                "retrace33Price": 325110,
                "retrace50Price": 336500,
                "nearestResistancePrice": 306500,
                "secondaryResistancePrice": 314500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.2%",
                    "targetPrice": "306,500원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.8%",
                    "targetPrice": "314,500원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 296,940원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "296,940원"
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
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
                "recentHighPrice": 370000,
                "retrace33Price": 325110,
                "retrace50Price": 336500,
                "nearestResistancePrice": 306500,
                "secondaryResistancePrice": 314500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+1.2%",
                    "targetPrice": "306,500원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+3.8%",
                    "targetPrice": "314,500원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 296,940원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "296,940원"
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
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
              "sampleCount": 33,
              "ev": -0.1287
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
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-06-02) · 재진입 차단 · 외 2건",
            "statusReason": "F4 미충족: 최근 손절 이력 1건 (최근: 2026-06-02) · 재진입 차단 / G1 미충족: 1개월 수익률 +12.8% (필요 ≥ +15%) / G5 미충족: 양봉·긴아래꼬리·도지 패턴 없음",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 303000.0,
                "vs52wHighPct": 80.37135278514589,
                "vs52wLowPct": 432.5131810193322,
                "dropFrom52wHighPct": 19.628647214854112,
                "ma20GapPct": -0.44356826022671264,
                "rsi14": 52.92322196499945,
                "volumeRatio20d": 69.57816614770158,
                "rs20Pct": 6.129597197898424,
                "tradingValueRank": 2.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 1771.4224,
                "per": 24.49,
                "pbr": 4.21,
                "cnsPer": 6.95,
                "foreignRate": 47.68,
                "supplyTrendScore": -2.0
              },
              "evaluatedAt": "2026-06-10T15:23:22+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "테크윙",
            "code": "089030",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 4.8,
            "grade": "C",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -160,375→891,119 / 기관 75,711→133,026 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 101.7% / 마지막 1시간 75.4% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 57,600 / 20MA 52,708 (109.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 13% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 197% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.23 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 57000, 전봉 종가 57000 미달"
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
                "note": "당일 거래대금 순위 27위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 2.1조 (필요 ≥ 5조)",
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
                "status": "⛔",
                "note": "1개월 수익률 -2.9% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.1% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 57,600 / 60MA 54,623",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -9.8% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 11.00)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +9.3% (≤+22%) · RSI14 55 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -160,375→891,119 / 기관 75,711→133,026 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 57,600 / 20MA 52,708 (109.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 2.23 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 101.7% / 마지막 1시간 75.4% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 13% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 197% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 57000, 전봉 종가 57000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 57600,
            "previousClose": 59700,
            "dailyChange": -2100,
            "dailyChangePct": -3.52,
            "dailyDirection": "down",
            "entryPriceText": "57,600원 (당일 종가 기준)",
            "entryPrice": 57600,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2.1343,
            "marketCapRank": 213,
            "marketCapUniverseCount": 2559,
            "keyPoint": "20일 고점 대비 -11.1% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 테크윙 (089030) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 57000, 전봉 종가 57000",
              "latestOpen": 57000.0,
              "latestClose": 57000.0,
              "previousClose": 57000.0
            },
            "toss": {
              "avgStrength": 101.7,
              "note": "토스 공개 체결강도 101.7% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A089030/order",
              "asOf": "2026-06-10T06:19:59Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 75.4,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 75.4,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 0.7542,
              "last30BuyVolume": 2292.0,
              "last30SellVolume": 3039.0
            },
            "orderbook": {
              "bidAskRatio": 2.2316,
              "bidTotal": 21852,
              "askTotal": 9792,
              "note": "Naver 호가잔량합계 매수 21,852 / 매도 9,792",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=089030"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 88.46, ATR10 12.48%, 일간 표준편차 7.34%, 당일 레인지 13.90%.",
              "metrics": {
                "atrPct10": 12.48,
                "returnStd20": 7.34,
                "todayRangePct": 13.9,
                "vkospi": 88.46
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "60% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "59,328원",
                "historicalHitRate": 0.6917,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "60,480원",
                "historicalHitRate": 0.6241,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 56,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.9%",
                "targetPrice": "56,500원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 56500,
              "fallbackStopPrice": 56448,
              "effectiveHardStopPrice": 56500,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 56,500원와 기존 % 손절 56,448원 중 더 높은 56,500원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 56,500원이며, 기존 % 손절 56,448원보다 느슨해지지 않게 56,500원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 56707,
              "high": 57283,
              "anchor": 57600,
              "label": "56,707~57,283원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 64800,
                "retrace33Price": 59976,
                "retrace50Price": 61200,
                "nearestResistancePrice": 59600,
                "secondaryResistancePrice": 64100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "59,600원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.2%",
                    "targetPrice": "61,200원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+12.5%",
                    "targetPrice": "64,800원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 56,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "56,500원"
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
                "recentHighPrice": 64800,
                "retrace33Price": 59976,
                "retrace50Price": 61200,
                "nearestResistancePrice": 59600,
                "secondaryResistancePrice": 64100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "59,600원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "하락폭 50% 되돌림 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+6.2%",
                    "targetPrice": "61,200원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 56,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "56,500원"
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
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
                "recentHighPrice": 64800,
                "retrace33Price": 59976,
                "retrace50Price": 61200,
                "nearestResistancePrice": 59600,
                "secondaryResistancePrice": 64100,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "59,328원",
                    "historicalHitRate": 0.6917,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "60,480원",
                    "historicalHitRate": 0.6241,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 56,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "56,500원"
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
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 33건)",
              "sampleCount": 33,
              "ev": -0.1287
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
              "핵심 Gate 미충족: G1",
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 2.1조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 2.1조 (필요 ≥ 5조) / G1 미충족: 1개월 수익률 -2.9% (필요 ≥ +15%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 57600.0,
                "vs52wHighPct": 77.83783783783784,
                "vs52wLowPct": 121.11324376199617,
                "dropFrom52wHighPct": 22.162162162162165,
                "ma20GapPct": 9.282360195418109,
                "rsi14": 54.8351026174758,
                "volumeRatio20d": 372.2770085417187,
                "rs20Pct": -1.0309278350515463,
                "tradingValueRank": 27.0,
                "marketCapRank": 213.0,
                "marketCapTrillion": 2.1343,
                "per": 468.29,
                "pbr": 10.08,
                "cnsPer": 0.0,
                "foreignRate": 13.85,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-10T15:23:22+09:00",
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
