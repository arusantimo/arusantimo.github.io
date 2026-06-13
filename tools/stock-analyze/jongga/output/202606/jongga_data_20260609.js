window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-09"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-09T06:02:45+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "dataQuality": {
    "status": "partial",
    "counts": {
      "total": 23,
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
        "ok": 23
      },
      "naver_chart": {
        "ok": 23
      },
      "naver_integration_schedule": {
        "ok": 0
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
        "ok": 23
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
        "durationMs": 1782.6,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 616.1,
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
        "durationMs": 2297.6,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 142.2,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 50060.9,
        "count": 23
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 7829.6,
        "detail": "성공 23 / 실패 0",
        "count": 23
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 8697.9,
        "detail": "direct-http · 체결강도 23 / 호가 23 / 틱프록시 23",
        "count": 23
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 101.2,
        "detail": "pullback 3, breakout 3, accumulation 3, reversal 3",
        "count": 12
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 21374.3,
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
            "value": "강세장 ✅ (펀더·지수 정당)"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "8068.61 (+7.81%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 89.67"
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
            "value": "G-D 🟠 (-7.5점)"
          },
          {
            "item": "갭 조정",
            "value": "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6659.14",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "7966.22",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 89.67",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 12 / 하락 8",
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
          "marketAnalyzeDate": "20260609",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.47,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1529원과 과열 이격이 겹쳤지만 펀더멘털 앵커 89점과 non-critical bubble(BI 44 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 8068.61,
          "kospiMa5": 8230.902,
          "vkospiValue": 89.67,
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
            "actualValue": "-2.78%",
            "baseScore": "-2점",
            "weight": "×2.5",
            "formula": "-2 × 2.5 = -5.0점",
            "weightedScore": "-5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+18.92",
            "baseScore": "+0점",
            "weight": "×2.0",
            "formula": "+0 × 2.0 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+9.7bp",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "-6.97원",
            "baseScore": "+1점",
            "weight": "×1.5",
            "formula": "+1 × 1.5 = +1.5점",
            "weightedScore": "+1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-0.45%",
            "baseScore": "-1점",
            "weight": "×1.0",
            "formula": "-1 × 1.0 = -1.0점",
            "weightedScore": "-1.0점"
          }
        ],
        "totalScore": "-7.5점",
        "grade": "G-D 🟠",
        "code": "G-D",
        "entryAdjustment": "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류",
        "sellAdjustment": "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소",
        "swingAdjustment": "금지",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-06-10T03:59:00+00:00",
          "vix": "2026-06-09T20:15:00+00:00",
          "tnx": "2026-06-09T19:00:00+00:00",
          "krw": "2026-06-09T22:59:00+00:00",
          "sox": "2026-06-10T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 9.0,
            "signalScore": 9.0,
            "score": 9.0,
            "scoreMax": 13.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 7.8,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 2위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 2,880,306주 / 기관 3,295,009주 · 당일 순매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 평균 111.0% / 마지막 1시간 225.0% / 마지막 30분 비율 0.05:1 / 마지막 30분 평균 221.1% · 장후반 흡수 확인"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 300,000 · 이평선 터치: 5MA, 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 322,000 · 5MA·10MA·20MA 중 20MA 위"
              },
              {
                "code": "P3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "앵커 중심값 데이터 부족"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 310,000 ≤ 종가 322,000)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 80%)"
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
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "앵커 거래량 데이터 부족"
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
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G5, G7, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 130% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 331,700 > 20MA 303,475 > 60MA 239,050 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 322,000 / 60MA 239,050",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 84.3 (필요 ≥ 50)",
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
                "note": "당일 등락 +8.97% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 84.3 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +6.1% (필요 ≤ +25%) · 60MA +34.7% (필요 ≤ +60%)",
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
                "code": "P1",
                "note": "저가 300,000 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 322,000 · 5MA·10MA·20MA 중 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 310,000 ≤ 종가 322,000)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 80%)",
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
                "code": "P3",
                "note": "앵커 중심값 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "C4",
                "note": "앵커 거래량 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 322000,
            "previousClose": 295500,
            "dailyChange": 26500,
            "dailyChangePct": 8.97,
            "dailyDirection": "up",
            "entryPriceText": "322,000원 (당일 종가 기준)",
            "entryPrice": 322000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1885.4249,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 2,880,306주 / 기관 3,295,009주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
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
                "summary": "주지지 281,194원 (12.67% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 281194,
                    "distancePct": 12.67,
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
                    "lastSeenDaysAgo": 14,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 261750,
                    "distancePct": 18.71,
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
                    "price": 222240,
                    "distancePct": 30.98,
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
                    "lastSeenDaysAgo": 23,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 188644,
                    "distancePct": 41.41,
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
                    "lastSeenDaysAgo": 42,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 319500,
                    "distancePct": 0.78,
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
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 281194,
                  "distancePct": 12.67,
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
                  "lastSeenDaysAgo": 14,
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
                    "price": 171300,
                    "distancePct": 46.8,
                    "count": 2,
                    "lastSeenDaysAgo": 47,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 170600,
                    "bandHigh": 172000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 178288,
                    "distancePct": 44.63,
                    "count": 6,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 175000,
                    "bandHigh": 180100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 185000,
                    "distancePct": 42.55,
                    "count": 6,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 182700,
                    "bandHigh": 186300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 189143,
                    "distancePct": 41.26,
                    "count": 6,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 187900,
                    "bandHigh": 190100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 193125,
                    "distancePct": 40.02,
                    "count": 3,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 192400,
                    "bandHigh": 193900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 199544,
                    "distancePct": 38.03,
                    "count": 6,
                    "lastSeenDaysAgo": 37,
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
                    "distancePct": 35.96,
                    "count": 5,
                    "lastSeenDaysAgo": 36,
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
                    "distancePct": 34.47,
                    "count": 4,
                    "lastSeenDaysAgo": 32,
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
                    "distancePct": 32.63,
                    "count": 9,
                    "lastSeenDaysAgo": 25,
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
                    "distancePct": 30.9,
                    "count": 5,
                    "lastSeenDaysAgo": 23,
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
                    "distancePct": 18.79,
                    "count": 5,
                    "lastSeenDaysAgo": 12,
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
                    "distancePct": 17.03,
                    "count": 5,
                    "lastSeenDaysAgo": 13,
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
                    "distancePct": 14.8,
                    "count": 3,
                    "lastSeenDaysAgo": 12,
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
                    "distancePct": 12.67,
                    "count": 5,
                    "lastSeenDaysAgo": 14,
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
                    "distancePct": 10.97,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
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
                    "price": 294333,
                    "distancePct": 8.59,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
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
                    "price": 299500,
                    "distancePct": 6.99,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 299000,
                    "bandHigh": 300000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 306167,
                    "distancePct": 4.92,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
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
                    "price": 319500,
                    "distancePct": 0.78,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 317000,
                    "bandHigh": 322000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 349500,
                    "distancePct": -8.54,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 348000,
                    "bandHigh": 351500
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 262000,
                    "distancePct": 18.63,
                    "count": 2,
                    "lastSeenDaysAgo": 14,
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
                    "price": 281188,
                    "distancePct": 12.67,
                    "count": 5,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 25,
                    "volume": 184413078,
                    "binIndex": 13,
                    "binLow": 276958,
                    "binHigh": 285417
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 221979,
                    "distancePct": 31.06,
                    "count": 8,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 25,
                    "volume": 171568358,
                    "binIndex": 6,
                    "binLow": 217750,
                    "binHigh": 226208
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 188146,
                    "distancePct": 41.57,
                    "count": 7,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 25,
                    "volume": 171496343,
                    "binIndex": 2,
                    "binLow": 183917,
                    "binHigh": 192375
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 130% (5일 전)",
                "burstCount": 0,
                "maxRatioPct": 130.1,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 7.65%, 일간 표준편차 5.53%, 당일 레인지 8.12%.",
              "metrics": {
                "atrPct10": 7.65,
                "returnStd20": 5.53,
                "todayRangePct": 8.12,
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
              "ma10Price": 323000,
              "ma10PrevPrice": 320050,
              "ma20Price": 303475,
              "ma20PrevPrice": 300800,
              "ma10WarningPrice": null,
              "hardStopPrice": 313950,
              "fallbackStopPrice": 313950,
              "effectiveStopPrice": 313950,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 313,950원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 313,950원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "328,440원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "331,660원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "336,490원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "341,320원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 313,950원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "313,950원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 318780,
              "high": 322000,
              "anchor": 322000,
              "label": "318,780~322,000원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 331700,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "328,440원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "331,660원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "336,490원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "341,320원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 313,950원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "313,950원"
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
                "nearestResistancePrice": 331700,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "328,440원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "331,660원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "336,490원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "341,320원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 313,950원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "313,950원"
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
                "nearestResistancePrice": 331700,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "331,700원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "331,700원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "336,490원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "341,320원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 313,950원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "313,950원"
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
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G0, G5, G7, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 130% (필요 ≥ 200%) · 외 3건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 130% (필요 ≥ 200%) / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / G7 미충족: 주봉 RSI 84.3 (필요 ≤ 80) · 과매수 과열 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 322000.0,
                "vs52wHighPct": 85.41114058355438,
                "vs52wLowPct": 465.9050966608084,
                "dropFrom52wHighPct": 14.588859416445624,
                "ma20GapPct": 6.104291951561084,
                "rsi14": 58.31823382036066,
                "volumeRatio20d": 86.99004137724911,
                "rs20Pct": 19.925512104283055,
                "supportDistancePct": 12.67,
                "tradingValueRank": 2.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 1885.4249,
                "per": 26.07,
                "pbr": 4.48,
                "cnsPer": 7.36,
                "foreignRate": 47.58,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T18:01:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 2,
            "name": "원익IPS",
            "code": "240810",
            "strictScore": 8.6,
            "signalScore": 8.6,
            "score": 8.6,
            "scoreMax": 13.5,
            "effectiveScoreMax": 13.5,
            "gradeScore": 6.4,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 22위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -467,464주 / 기관 751,895주 · 당일 순매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 평균 88.0% / 마지막 1시간 107.1% / 마지막 30분 비율 0.02:1 / 마지막 30분 평균 136.4% · 장후반 흡수 확인"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 109,500 · 이평선 터치: 5MA, 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 119,100 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "P3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "앵커 중심값 124,100 / 저가 109,500 / 종가 119,100 · 종가 미회복"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 112,600 ≤ 종가 119,100)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 103% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +7.56% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 앵커 거래량 48% · 거래량 축소"
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
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G5, G6, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 353% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 116,360 > 20MA 118,050 > 60MA 119,787 · 상승선 5MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 119,100 / 60MA 119,787",
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
                "status": "⛔",
                "note": "당일 등락 +13.54% (필요 ≤ +12%) · 급등일은 눌림목 부적합",
                "evalStatus": "not_met"
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
                "note": "이격 20MA +0.9% (필요 ≤ +25%) · 60MA -0.6% (필요 ≤ +60%)",
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
                "note": "당일 거래량 / 앵커 거래량 48% · 시가 112,600 / 종가 119,100 / 전일 종가 104,900 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "⚠️",
                "note": "종가 119,100 / 앵커 중심값 124,100 / 복합 지지 116,089 · 앵커 또는 지지 한 축 이탈",
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
                "note": "저가 109,500 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 119,100 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 112,600 ≤ 종가 119,100)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +7.56% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P3",
                "note": "앵커 중심값 124,100 / 저가 109,500 / 종가 119,100 · 종가 미회복",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 103% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "당일 거래량 / 앵커 거래량 48% · 거래량 축소",
                "evalStatus": "met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 119100,
            "previousClose": 104900,
            "dailyChange": 14200,
            "dailyChangePct": 13.54,
            "dailyDirection": "up",
            "entryPriceText": "119,100원 (당일 종가 기준)",
            "entryPrice": 119100,
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
                "summary": "주지지 116,089원 (2.53% 아래) · 강도 90점 · family 3개 · 수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 116089,
                    "distancePct": 2.53,
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
                    "count": 25,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 90,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 120157,
                    "distancePct": -0.89,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 45,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 112114,
                    "distancePct": 5.87,
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
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 107868,
                    "distancePct": 9.43,
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
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 104367,
                    "distancePct": 12.37,
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
                  "price": 116089,
                  "distancePct": 2.53,
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
                  "count": 25,
                  "lastSeenDaysAgo": 1,
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
                    "distancePct": 14.36,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
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
                    "distancePct": 12.37,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
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
                    "distancePct": 9.12,
                    "count": 9,
                    "lastSeenDaysAgo": 0,
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
                    "distancePct": 5.77,
                    "count": 12,
                    "lastSeenDaysAgo": 2,
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
                    "price": 115844,
                    "distancePct": 2.73,
                    "count": 16,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 114100,
                    "bandHigh": 117500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 120033,
                    "distancePct": -0.78,
                    "count": 30,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 117700,
                    "bandHigh": 121700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 123082,
                    "distancePct": -3.34,
                    "count": 11,
                    "lastSeenDaysAgo": 9,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 122000,
                    "bandHigh": 124700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 125100,
                    "distancePct": -5.04,
                    "count": 3,
                    "lastSeenDaysAgo": 11,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 125000,
                    "bandHigh": 125300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 127880,
                    "distancePct": -7.37,
                    "count": 5,
                    "lastSeenDaysAgo": 3,
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
                    "distancePct": -10.85,
                    "count": 5,
                    "lastSeenDaysAgo": 2,
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
                    "distancePct": -13.73,
                    "count": 2,
                    "lastSeenDaysAgo": 19,
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
                    "distancePct": 9.74,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
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
                    "distancePct": 5.96,
                    "count": 2,
                    "lastSeenDaysAgo": 28,
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
                    "distancePct": 1.96,
                    "count": 3,
                    "lastSeenDaysAgo": 24,
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
                    "distancePct": -0.99,
                    "count": 15,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 25,
                    "volume": 8167857,
                    "binIndex": 10,
                    "binLow": 119125,
                    "binHigh": 121438
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 115656,
                    "distancePct": 2.89,
                    "count": 6,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 4792110,
                    "binIndex": 8,
                    "binLow": 114500,
                    "binHigh": 116812
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 122594,
                    "distancePct": -2.93,
                    "count": 8,
                    "lastSeenDaysAgo": 10,
                    "valid": false,
                    "weight": 25,
                    "volume": 4551310,
                    "binIndex": 11,
                    "binLow": 121438,
                    "binHigh": 123750
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 353% (2일 전) · 200%+ 급증 1회",
                "burstCount": 1,
                "maxRatioPct": 353.4,
                "latestBurstDaysAgo": 2
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
                "daysAgo": 2
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 48% · 시가 112,600 / 종가 119,100 / 전일 종가 104,900 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "⚠️",
                  "summary": "종가 119,100 / 앵커 중심값 124,100 / 복합 지지 116,089 · 앵커 또는 지지 한 축 이탈"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 13.90%, 일간 표준편차 10.30%, 당일 레인지 12.11%.",
              "metrics": {
                "atrPct10": 13.9,
                "returnStd20": 10.3,
                "todayRangePct": 12.11,
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
              "ma10Price": 113310,
              "ma10PrevPrice": 113570,
              "ma20Price": 118050,
              "ma20PrevPrice": 118740,
              "ma10WarningPrice": null,
              "hardStopPrice": 118050,
              "fallbackStopPrice": 116122,
              "effectiveStopPrice": 118050,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(20일선 118,050원) = 118,050원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 116,122원) = 118,050원 / 제외: 앵커 몸통 중심 124,100원가 현재가 119,100원 이상이라 제외",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(20일선 118,050원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 116,122원를 하한으로 유지합니다. 앵커 몸통 중심 124,100원가 현재가 119,100원 이상이라 제외."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "121,482원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "122,673원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "124,459원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "126,246원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 118,050원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-0.9%",
                "targetPrice": "118,050원"
              }
            ],
            "rr": "1 : 3.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 117909,
              "high": 119100,
              "anchor": 119100,
              "label": "117,909~119,100원 (종가 ±, 분할매수)"
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
                    "targetPrice": "121,482원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "122,673원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "124,459원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "126,246원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 118,050원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.9%",
                    "targetPrice": "118,050원"
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
                    "targetPrice": "121,482원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "122,673원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "124,459원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "126,246원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 118,050원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.9%",
                    "targetPrice": "118,050원"
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
                    "targetPrice": "121,482원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "122,673원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "124,459원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "126,246원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 118,050원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.9%",
                    "targetPrice": "118,050원"
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
              "핵심 Gate 미충족: G6",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G1, G2, G5, G6, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 116,360 > 20MA 118,050 > 60MA 119,787 · 상승선 5MA · 정배열 미충족 · 외 4건",
            "statusReason": "G1 미충족: 5MA 116,360 > 20MA 118,050 > 60MA 119,787 · 상승선 5MA · 정배열 미충족 / G2 미충족: 종가 119,100 / 60MA 119,787 / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 119100.0,
                "vs52wHighPct": 64.97545008183306,
                "vs52wLowPct": 388.11475409836066,
                "dropFrom52wHighPct": 35.02454991816694,
                "ma20GapPct": 0.8894536213468869,
                "rsi14": 50.69987896230422,
                "volumeRatio20d": 168.54478265049787,
                "rs20Pct": -10.383747178329571,
                "supportDistancePct": 2.53,
                "tradingValueRank": 22.0,
                "marketCapRank": 78.0,
                "marketCapTrillion": 8.9971,
                "per": 81.21,
                "pbr": 9.08,
                "cnsPer": 52.36,
                "foreignRate": 19.12,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T18:01:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ"
          },
          {
            "rank": 3,
            "name": "SK하이닉스",
            "code": "000660",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 13.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 7.1,
            "grade": "A",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 거래대금 순위 1위 (TOP 30 이내 시 충족)"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 573,440주 / 기관 -270,178주 · 당일 순매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 평균 100.0% / 마지막 1시간 286.2% / 마지막 30분 비율 4111.00:1 / 마지막 30분 평균 300.0% · 장후반 흡수 확인"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "저가 1,998,000 · 이평선 터치: 5MA, 10MA, 20MA"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 2,215,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "P3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "앵커 중심값 데이터 부족"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 2,050,000 ≤ 종가 2,215,000)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≤ 80%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +12.17% / KOSPI +4.63% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "앵커 거래량 데이터 부족"
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
                "code": "V1",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "유리 (고변동성 장세라 눌림목 반등 포착에 유리합니다)"
              }
            ],
            "scoreScope": "pullback",
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G5, G6)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "⛔",
                "note": "최근 20일 최대 거래량 급증 151% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 2,170,800 > 20MA 2,041,250 > 60MA 1,412,900 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 2,215,000 / 60MA 1,412,900",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 73.3 (필요 ≥ 50)",
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
                "status": "⛔",
                "note": "당일 등락 +15.91% (필요 ≤ +12%) · 급등일은 눌림목 부적합",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 73.3 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +8.5% (필요 ≤ +25%) · 60MA +56.8% (필요 ≤ +60%)",
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
                "note": "마지막 30분 비율 4111.00:1 / 마지막 30분 평균 300.0% / 마지막 1시간 286.2% · 장 막판 매수세 유지",
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
                "note": "당일 거래대금 순위 1위 (TOP 30 이내 시 충족)",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 573,440주 / 기관 -270,178주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "당일 평균 100.0% / 마지막 1시간 286.2% / 마지막 30분 비율 4111.00:1 / 마지막 30분 평균 300.0% · 장후반 흡수 확인",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "저가 1,998,000 · 이평선 터치: 5MA, 10MA, 20MA",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 2,215,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 2,050,000 ≤ 종가 2,215,000)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +12.17% / KOSPI +4.63% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P3",
                "note": "앵커 중심값 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "C2",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≤ 80%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "앵커 거래량 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2215000,
            "previousClose": 1911000,
            "dailyChange": 304000,
            "dailyChangePct": 15.91,
            "dailyDirection": "up",
            "entryPriceText": "2,215,000원 (당일 종가 기준)",
            "entryPrice": 2215000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1532.3101,
            "marketCapRank": 2,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 573,440주 / 기관 -270,178주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 100.0,
              "note": "토스 공개 체결강도 100.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 95.2,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 286.2,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 4111.0,
              "last30BuyVolume": 4111.0,
              "last30SellVolume": 0.0
            },
            "eventFilter": {},
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,031,864원 (53.41% 아래) · 강도 65점 · family 2개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1031864,
                    "distancePct": 53.41,
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
                    "lastSeenDaysAgo": 37,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 971886,
                    "distancePct": 56.12,
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
                    "lastSeenDaysAgo": 39,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 2207500,
                    "distancePct": 0.34,
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
                    "price": 2064000,
                    "distancePct": 6.82,
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
                    "price": 1987500,
                    "distancePct": 10.27,
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
                  "price": 1031864,
                  "distancePct": 53.41,
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
                  "lastSeenDaysAgo": 37,
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
                    "price": 810333,
                    "distancePct": 63.42,
                    "count": 2,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 806000,
                    "bandHigh": 818000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 866333,
                    "distancePct": 60.89,
                    "count": 4,
                    "lastSeenDaysAgo": 42,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 858000,
                    "bandHigh": 876000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 886200,
                    "distancePct": 59.99,
                    "count": 5,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 880000,
                    "bandHigh": 893000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 926545,
                    "distancePct": 58.17,
                    "count": 8,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 910000,
                    "bandHigh": 938000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 971000,
                    "distancePct": 56.16,
                    "count": 2,
                    "lastSeenDaysAgo": 56,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 969000,
                    "bandHigh": 974000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 996000,
                    "distancePct": 55.03,
                    "count": 8,
                    "lastSeenDaysAgo": 37,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 986000,
                    "bandHigh": 1007000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1024250,
                    "distancePct": 53.76,
                    "count": 3,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1013000,
                    "bandHigh": 1033000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1131000,
                    "distancePct": 48.94,
                    "count": 4,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1121000,
                    "bandHigh": 1141000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1160500,
                    "distancePct": 47.61,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1155000,
                    "bandHigh": 1166000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1191000,
                    "distancePct": 46.23,
                    "count": 4,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1183000,
                    "bandHigh": 1195000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1223500,
                    "distancePct": 44.76,
                    "count": 4,
                    "lastSeenDaysAgo": 28,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1222000,
                    "bandHigh": 1225000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1290571,
                    "distancePct": 41.73,
                    "count": 4,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1281000,
                    "bandHigh": 1300000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1562000,
                    "distancePct": 29.48,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 1557000,
                    "bandHigh": 1567000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1596000,
                    "distancePct": 27.95,
                    "count": 2,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1591000,
                    "bandHigh": 1601000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1688000,
                    "distancePct": 23.79,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1686000,
                    "bandHigh": 1690000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1740250,
                    "distancePct": 21.43,
                    "count": 3,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1731000,
                    "bandHigh": 1745000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1797800,
                    "distancePct": 18.84,
                    "count": 4,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1781000,
                    "bandHigh": 1819000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1839000,
                    "distancePct": 16.98,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1826000,
                    "bandHigh": 1855000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1928200,
                    "distancePct": 12.95,
                    "count": 4,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1911000,
                    "bandHigh": 1941000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1987500,
                    "distancePct": 10.27,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1970000,
                    "bandHigh": 2006000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 2064000,
                    "distancePct": 6.82,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 2052000,
                    "bandHigh": 2070000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 2207500,
                    "distancePct": 0.34,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 2200000,
                    "bandHigh": 2215000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 2276786,
                    "distancePct": -2.79,
                    "count": 6,
                    "lastSeenDaysAgo": 3,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 2243000,
                    "bandHigh": 2298000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 2352000,
                    "distancePct": -6.19,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 2333000,
                    "bandHigh": 2363000
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 972771,
                    "distancePct": 56.08,
                    "count": 7,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 25,
                    "volume": 28818880,
                    "binIndex": 2,
                    "binLow": 939417,
                    "binHigh": 1006125
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 906062,
                    "distancePct": 59.09,
                    "count": 7,
                    "lastSeenDaysAgo": 41,
                    "valid": true,
                    "weight": 25,
                    "volume": 28567686,
                    "binIndex": 1,
                    "binLow": 872708,
                    "binHigh": 939417
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1039479,
                    "distancePct": 53.07,
                    "count": 7,
                    "lastSeenDaysAgo": 37,
                    "valid": true,
                    "weight": 25,
                    "volume": 28199912,
                    "binIndex": 3,
                    "binLow": 1006125,
                    "binHigh": 1072833
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 151% (18일 전)",
                "burstCount": 0,
                "maxRatioPct": 151.0,
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
                  "status": "✅",
                  "summary": "마지막 30분 비율 4111.00:1 / 마지막 30분 평균 300.0% / 마지막 1시간 286.2% · 장 막판 매수세 유지"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 89.91, ATR10 8.28%, 일간 표준편차 6.72%, 당일 레인지 11.93%.",
              "metrics": {
                "atrPct10": 8.28,
                "returnStd20": 6.72,
                "todayRangePct": 11.93,
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
                    "KIND 공시에서 SK하이닉스 (000660) 종목 공시를 조회합니다.",
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
              "ma10Price": 2213400,
              "ma10PrevPrice": 2186000,
              "ma20Price": 2041250,
              "ma20PrevPrice": 2014800,
              "ma10WarningPrice": null,
              "hardStopPrice": 2159625,
              "fallbackStopPrice": 2159625,
              "effectiveStopPrice": 2159625,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 2,159,625원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 2,159,625원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.0% 도달",
                "quantity": "35% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "2,259,300원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+3.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "2,281,450원",
                "historicalHitRate": null,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "2,314,675원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "2,347,900원",
                "historicalHitRate": null,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 2,159,625원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "2,159,625원"
              }
            ],
            "rr": "1 : 1.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 2192850,
              "high": 2215000,
              "anchor": 2215000,
              "label": "2,192,850~2,215,000원 (종가 ±, 분할매수)"
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
                    "targetPrice": "2,259,300원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "2,281,450원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,314,675원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,347,900원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 2,159,625원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "2,159,625원"
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
                    "targetPrice": "2,259,300원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "2,281,450원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,314,675원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,347,900원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 2,159,625원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "2,159,625원"
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
                    "targetPrice": "2,259,300원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "2,281,450원",
                    "historicalHitRate": null,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,314,675원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,347,900원",
                    "historicalHitRate": null,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 2,159,625원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "2,159,625원"
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
              "핵심 Gate 미충족: G6",
              "매매금지(핵심 Gate 미충족: G0, G5, G6)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 151% (필요 ≥ 200%) · 외 2건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 151% (필요 ≥ 200%) / G5 미충족: KOSPI 8,124 / 5MA 7,840 (+3.6%) · VKOSPI 89.9 · VKOSPI 과열 / G6 미충족: 당일 등락 +15.91% (필요 ≤ +12%) · 급등일은 눌림목 부적합",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 2215000.0,
                "vs52wHighPct": 89.67611336032388,
                "vs52wLowPct": 858.8744588744589,
                "dropFrom52wHighPct": 10.323886639676113,
                "ma20GapPct": 8.511941212492346,
                "rsi14": 62.28295283093422,
                "volumeRatio20d": 96.90455073065884,
                "rs20Pct": 31.37603795966785,
                "supportDistancePct": 53.41,
                "tradingValueRank": 1.0,
                "marketCapRank": 2.0,
                "marketCapTrillion": 1532.3101,
                "per": 20.77,
                "pbr": 9.04,
                "cnsPer": 7.13,
                "foreignRate": 51.1,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-13T18:01:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "NAVER",
            "code": "035420",
            "strictScore": 2.7,
            "signalScore": 3.4,
            "score": 3.4,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.3,
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
                "note": "외인 325,140주 / 기관 1,427,219주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 74.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 83.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 210% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 88.0% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 70% / 윗꼬리·몸통 0.08 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.93 (필요 ≥ 1.2) · 매수 잔량 우위"
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
                "note": "5일 초과 +1.7% / 20일 초과 +10.5%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 82.3% (필요 ≥ 90%)",
                "evalStatus": "not_met"
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
                "note": "당일 거래량 / 20일 평균 210% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 70% / 윗꼬리·몸통 0.08 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -8.96% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 254,000 / 5MA 267,300 (전일 5MA 270,800) · 5MA 조건 미충족",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 325,140주 / 기관 1,427,219주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.93 (필요 ≥ 1.2) · 매수 잔량 우위",
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
                "note": "당일 평균 74.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 83.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 210% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 88.0% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 70% / 윗꼬리·몸통 0.08 · 강마감 기준 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 254000,
            "previousClose": 279000,
            "dailyChange": -25000,
            "dailyChangePct": -8.96,
            "dailyDirection": "down",
            "entryPriceText": "254,000원 (당일 종가 기준)",
            "entryPrice": 254000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 39.8459,
            "marketCapRank": 19,
            "marketCapUniverseCount": 2560,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 325,140주 / 기관 1,427,219주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 74.0,
              "note": "토스 공개 체결강도 74.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 155.4,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 155.4,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5603,
              "last30BuyVolume": 660.0,
              "last30SellVolume": 423.0
            },
            "orderbook": {
              "bidAskRatio": 1.9294,
              "bidTotal": 85112,
              "askTotal": 44113,
              "note": "Naver 호가잔량합계 매수 85,112 / 매도 44,113",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=035420"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 89.67, ATR10 13.06%, 일간 표준편차 6.21%, 당일 레인지 16.31%.",
              "metrics": {
                "atrPct10": 13.06,
                "returnStd20": 6.21,
                "todayRangePct": 16.31,
                "vkospi": 89.67
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
              "referencePrice": 247500,
              "referenceBandLow": 247500,
              "referenceBandHigh": 247500,
              "entryDayOpenPrice": 286000,
              "fallbackStopPrice": 238760,
              "effectiveHardStopPrice": 247500,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 247,500원와 기존 % 손절 238,760원 중 더 높은 247,500원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 247,500원이며, 기존 % 손절 238,760원보다 느슨해지지 않게 247,500원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+0.2%",
                "targetPrice": "254,500원",
                "historicalHitRate": 0.6105,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+8.1%",
                "targetPrice": "274,500원",
                "historicalHitRate": 0.4211,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+10.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "279,400원",
                "historicalHitRate": 0.3474,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "289,560원",
                "historicalHitRate": 0.2947,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+19.0%",
                "targetPrice": "302,260원",
                "historicalHitRate": 0.2151,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 247,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.6%",
                "targetPrice": "247,500원"
              }
            ],
            "rr": "1 : 4.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 250952,
              "high": 253492,
              "anchor": 254000,
              "label": "250,952~253,492원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 254500,
                "secondaryResistancePrice": 274500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "261,620원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+6.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "269,240원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "302,260원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 247,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "247,500원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 254500,
                "secondaryResistancePrice": 274500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "254,500원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+6.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "269,240원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "302,260원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 247,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "247,500원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
                "nearestResistancePrice": 254500,
                "secondaryResistancePrice": 274500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.2%",
                    "targetPrice": "254,500원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+8.1%",
                    "targetPrice": "274,500원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "279,400원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "289,560원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "302,260원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 247,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.6%",
                    "targetPrice": "247,500원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
              "sampleCount": 9,
              "ev": 0.8205
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 93건)",
              "hitRate": 0.2151,
              "ev": 2.303,
              "sampleCount": 93
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 82.3% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 82.3% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 254000.0,
                "vs52wHighPct": 82.33387358184766,
                "vs52wLowPct": 33.123689727463315,
                "dropFrom52wHighPct": 17.666126418152352,
                "ma20GapPct": 13.61094959073221,
                "rsi14": 58.52641480044623,
                "volumeRatio20d": 209.56440368537264,
                "rs20Pct": 18.13953488372093,
                "tradingValueRank": 6.0,
                "marketCapRank": 19.0,
                "marketCapTrillion": 39.8459,
                "per": 22.05,
                "pbr": 1.29,
                "cnsPer": 20.31,
                "foreignRate": 34.91,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "LG이노텍",
            "code": "011070",
            "strictScore": 2.4,
            "signalScore": 3.1,
            "score": 3.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.1,
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
                "note": "외인 46,230주 / 기관 20,825주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 90.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 63.5% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 116% (필요 ≥ 150%)"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 7% / 윗꼬리·몸통 1.83 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G2, G4)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 -17.6% / 20일 초과 +74.3%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 62.6% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 16",
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
                "note": "몸통 7% / 윗꼬리·몸통 1.83 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +3.65% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 1,135,000 / 5MA 1,163,000 (전일 5MA 1,242,000) · 5MA 조건 미충족",
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
                "code": "S1",
                "note": "외인 46,230주 / 기관 20,825주 · 외인·기관 양매수",
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
                "note": "당일 평균 90.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 63.5% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 116% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 7% / 윗꼬리·몸통 1.83 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1135000,
            "previousClose": 1095000,
            "dailyChange": 40000,
            "dailyChangePct": 3.65,
            "dailyDirection": "up",
            "entryPriceText": "1,135,000원 (당일 종가 기준)",
            "entryPrice": 1135000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 26.9095,
            "marketCapRank": 30,
            "marketCapUniverseCount": 2560,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 46,230주 / 기관 20,825주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 90.0,
              "note": "토스 공개 체결강도 90.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 152.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 152.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5492,
              "last30BuyVolume": 457.0,
              "last30SellVolume": 295.0
            },
            "orderbook": {
              "bidAskRatio": 0.624,
              "bidTotal": 1092,
              "askTotal": 1750,
              "note": "Naver 호가잔량합계 매수 1,092 / 매도 1,750",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=011070"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 89.67, ATR10 19.72%, 일간 표준편차 10.00%, 당일 레인지 16.71%.",
              "metrics": {
                "atrPct10": 19.72,
                "returnStd20": 10.0,
                "todayRangePct": 16.71,
                "vkospi": 89.67
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
              "referencePrice": 1115000,
              "referenceBandLow": 1115000,
              "referenceBandHigh": 1115000,
              "entryDayOpenPrice": 1147000,
              "fallbackStopPrice": 1066900,
              "effectiveHardStopPrice": 1115000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 1,115,000원와 기존 % 손절 1,066,900원 중 더 높은 1,115,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 1,115,000원이며, 기존 % 손절 1,066,900원보다 느슨해지지 않게 1,115,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,169,000원",
                "historicalHitRate": 0.6105,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+4.7%",
                "targetPrice": "1,188,000원",
                "historicalHitRate": 0.4211,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+10.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,248,500원",
                "historicalHitRate": 0.3474,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "1,293,900원",
                "historicalHitRate": 0.2947,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+19.0%",
                "targetPrice": "1,350,650원",
                "historicalHitRate": 0.2151,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,115,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "1,115,000원"
              }
            ],
            "rr": "1 : 6.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1121380,
              "high": 1132730,
              "anchor": 1135000,
              "label": "1,121,380~1,132,730원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,050원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+6.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,203,100원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "1,350,650원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,115,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,115,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "1,350,650원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,115,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,115,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,248,500원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,293,900원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "1,350,650원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,115,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,115,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
              "sampleCount": 9,
              "ev": 0.8205
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 93건)",
              "hitRate": 0.2151,
              "ev": 2.303,
              "sampleCount": 93
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 62.6% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 62.6% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 116% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1135000.0,
                "vs52wHighPct": 62.56890848952591,
                "vs52wLowPct": 710.1356174161313,
                "dropFrom52wHighPct": 37.43109151047409,
                "ma20GapPct": 15.26938506068146,
                "rsi14": 60.98139771310473,
                "volumeRatio20d": 115.51670064037137,
                "rs20Pct": 81.89102564102564,
                "tradingValueRank": 16.0,
                "marketCapRank": 30.0,
                "marketCapTrillion": 26.9095,
                "per": 55.51,
                "pbr": 4.42,
                "cnsPer": 34.41,
                "foreignRate": 23.28,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
            "name": "삼성에스디에스",
            "code": "018260",
            "strictScore": 2.4,
            "signalScore": 3.1,
            "score": 3.1,
            "scoreMax": 11.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 2.1,
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
                "note": "외인 34,684주 / 기관 978주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 1.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 75.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 63.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 88% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 94.3% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "몸통 35% / 윗꼬리·몸통 0.20 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 3.33 (필요 ≥ 1.2) · 매수 잔량 우위"
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
                "note": "5일 초과 -23.6% / 20일 초과 +33.2%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 63.5% (필요 ≥ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 38",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 88% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "몸통 35% / 윗꼬리·몸통 0.20 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +4.66% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 247,000 / 5MA 260,800 (전일 5MA 283,800) · 5MA 조건 미충족",
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
                "code": "S1",
                "note": "외인 34,684주 / 기관 978주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 3.33 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 75.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 63.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 88% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 94.3% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 35% / 윗꼬리·몸통 0.20 (필요: 몸통 ≥70%, 윗꼬리·몸통 ≤0.3)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 247000,
            "previousClose": 236000,
            "dailyChange": 11000,
            "dailyChangePct": 4.66,
            "dailyDirection": "up",
            "entryPriceText": "247,000원 (당일 종가 기준)",
            "entryPrice": 247000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 19.2671,
            "marketCapRank": 42,
            "marketCapUniverseCount": 2560,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 34,684주 / 기관 978주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 75.0,
              "note": "토스 공개 체결강도 75.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A018260/order",
              "asOf": "2026-06-09T06:02:21Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 154.6,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 154.6,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 1.5458,
              "last30BuyVolume": 1821.0,
              "last30SellVolume": 1178.0
            },
            "orderbook": {
              "bidAskRatio": 3.3319,
              "bidTotal": 8783,
              "askTotal": 2636,
              "note": "Naver 호가잔량합계 매수 8,783 / 매도 2,636",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=018260"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 89.67, ATR10 16.77%, 일간 표준편차 11.06%, 당일 레인지 15.25%.",
              "metrics": {
                "atrPct10": 16.77,
                "returnStd20": 11.06,
                "todayRangePct": 15.25,
                "vkospi": 89.67
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
              "referencePrice": 244000,
              "referenceBandLow": 244000,
              "referenceBandHigh": 244000,
              "entryDayOpenPrice": 259500,
              "fallbackStopPrice": 232180,
              "effectiveHardStopPrice": 244000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 244,000원와 기존 % 손절 232,180원 중 더 높은 244,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 244,000원이며, 기존 % 손절 232,180원보다 느슨해지지 않게 244,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.8%",
                "targetPrice": "254,000원",
                "historicalHitRate": 0.6105,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+5.9%",
                "targetPrice": "261,500원",
                "historicalHitRate": 0.4211,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+10.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "271,700원",
                "historicalHitRate": 0.3474,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "281,580원",
                "historicalHitRate": 0.2947,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+19.0%",
                "targetPrice": "293,930원",
                "historicalHitRate": 0.2151,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 244,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.2%",
                "targetPrice": "244,000원"
              }
            ],
            "rr": "1 : 9.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 244036,
              "high": 246506,
              "anchor": 247000,
              "label": "244,036~246,506원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "254,410원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+6.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "261,820원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "293,930원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 244,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.2%",
                    "targetPrice": "244,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "254,000원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "261,500원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "293,930원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 244,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.2%",
                    "targetPrice": "244,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
                "nearestResistancePrice": 254000,
                "secondaryResistancePrice": 261500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "254,000원",
                    "historicalHitRate": 0.6105,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "261,500원",
                    "historicalHitRate": 0.4211,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+10.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "271,700원",
                    "historicalHitRate": 0.3474,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "281,580원",
                    "historicalHitRate": 0.2947,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+19.0%",
                    "targetPrice": "293,930원",
                    "historicalHitRate": 0.2151,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 244,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.2%",
                    "targetPrice": "244,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 93건)",
                  "hitRate": 0.2151,
                  "ev": 2.303,
                  "sampleCount": 93
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 9건)",
              "sampleCount": 9,
              "ev": 0.8205
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 93건)",
              "hitRate": 0.2151,
              "ev": 2.303,
              "sampleCount": 93
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 63.5% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 63.5% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 88% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 247000.0,
                "vs52wHighPct": 63.49614395886889,
                "vs52wLowPct": 91.77018633540372,
                "dropFrom52wHighPct": 36.50385604113111,
                "ma20GapPct": 10.339282124589579,
                "rsi14": 54.69463193350666,
                "volumeRatio20d": 87.71978275509655,
                "rs20Pct": 40.820980615735465,
                "tradingValueRank": 38.0,
                "marketCapRank": 42.0,
                "marketCapTrillion": 19.2671,
                "per": 30.08,
                "pbr": 1.94,
                "cnsPer": 27.17,
                "foreignRate": 18.27,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          }
        ],
        "accumulation": [
          {
            "rank": 1,
            "name": "로보티즈",
            "code": "108490",
            "strictScore": 7.9,
            "signalScore": 7.9,
            "score": 7.9,
            "scoreMax": 13.0,
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
                "note": "외인 245,989주 / 기관 7,000주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +245,989 / 전일 -23,892 · 기관 당일 +7,000 / 전일 +12,362 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 274.2% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 144.0% / 마지막 1시간 274.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "최근 수급 추세 데이터 부족 (2일)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 89.5% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 329,700 / 20MA 323,925 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 36% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +0.17% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +0.89% / KOSPI +4.63% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.70:1 · 평균 체결강도 274.2% (필요 ≥ 1.1:1) · 장마감 매수 우위"
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
                "note": "외인 전일 -23,892/당일 +245,989 · 기관 전일 +12,362/당일 +7,000 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 290,000 / 60MA 288,233",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 62.5% (필요 < 92%)",
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
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 53% (필요 < 150%)",
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
                "note": "외인 245,989주 / 기관 7,000주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +245,989 / 전일 -23,892 · 기관 당일 +7,000 / 전일 +12,362 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 274.2% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 144.0% / 마지막 1시간 274.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 329,700 / 20MA 323,925 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 36% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +0.17% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.70:1 · 평균 체결강도 274.2% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S5",
                "note": "최근 수급 추세 데이터 부족 (2일)",
                "evalStatus": "data_missing"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 89.5% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +0.89% / KOSPI +4.63% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 290000,
            "previousClose": 289500,
            "dailyChange": 500,
            "dailyChangePct": 0.17,
            "dailyDirection": "up",
            "entryPriceText": "290,000원 (당일 종가 기준)",
            "entryPrice": 290000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 4.8368,
            "marketCapRank": 128,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 245,989주 / 기관 7,000주 / 마지막 1시간 274.2% · 장후반 매수세 강화 · 마지막 30분 틱 2.70:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 144.0,
              "note": "토스 공개 체결강도 144.0% / 최근 체결 24분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A108490/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 24,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 24분 프록시",
              "lastHourAvgStrength": 274.2,
              "lastHourObservedMinutes": 24,
              "last30AvgStrength": 274.2,
              "last30ObservedMinutes": 24,
              "last30BuySellRatio": 2.701,
              "last30BuyVolume": 1129.0,
              "last30SellVolume": 418.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 13.98%, 일간 표준편차 9.63%, 당일 레인지 9.67%.",
              "metrics": {
                "atrPct10": 13.98,
                "returnStd20": 9.63,
                "todayRangePct": 9.67,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 2,
              "sponsor": "none",
              "cumulativeNet": 0.0,
              "positiveDays": 0,
              "improvementCount": 0,
              "series": {
                "foreign": [],
                "institution": [],
                "sponsor": []
              },
              "status": "data_missing",
              "score": 0.0,
              "summary": "최근 수급 추세 데이터 부족",
              "note": "최근 수급 추세 데이터 부족 (2일)"
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
                "targetYield": "+2.1%",
                "targetPrice": "296,000원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.9%",
                "targetPrice": "307,000원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+5.9%",
                "targetPrice": "307,000원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "313,200원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "321,900원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 281,300원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "281,300원"
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
              "fallbackStopPrice": 281300,
              "effectiveHardStopPrice": 281300,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 281,300원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 281,300원만 유지합니다."
            },
            "rr": "1 : 2.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 287100,
              "high": 290000,
              "anchor": 290000,
              "label": "287,100~290,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 296000,
                "secondaryResistancePrice": 307000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "295,800원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "300,150원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "305,950원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "313,200원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "321,900원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 281,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "281,300원"
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
                "nearestResistancePrice": 296000,
                "secondaryResistancePrice": 307000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "295,800원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "300,150원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "305,950원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "313,200원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "321,900원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 281,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "281,300원"
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
                "nearestResistancePrice": 296000,
                "secondaryResistancePrice": 307000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "296,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "307,000원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.9%",
                    "targetPrice": "307,000원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "313,200원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "321,900원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 281,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "281,300원"
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
                "currentPrice": 290000.0,
                "vs52wHighPct": 62.5,
                "vs52wLowPct": 459.76991526241625,
                "dropFrom52wHighPct": 37.5,
                "ma20GapPct": -10.473103341822952,
                "rsi14": 45.61461538616827,
                "volumeRatio20d": 53.03686339970275,
                "rs20Pct": -13.303437967115098,
                "tradingValueRank": 55.0,
                "marketCapRank": 128.0,
                "marketCapTrillion": 4.8368,
                "per": 0.0,
                "pbr": 13.55,
                "cnsPer": 402.93,
                "foreignRate": 7.14,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T00:01:34+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ"
          },
          {
            "rank": 2,
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 13.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 6.2,
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
                "evalStatus": "data_missing",
                "note": "최근 수급 추세 데이터 부족 (2일)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 106.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 331,700 / 20MA 303,475 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 +8.97% (필요 -3% ~ +5%)"
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
                "note": "종가 322,000 / 60MA 239,050",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 85.4% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 87% (필요 < 150%)",
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
                "code": "P2",
                "note": "5MA 331,700 / 20MA 303,475 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 76% (필요 ≤ 90%)",
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
                "note": "최근 수급 추세 데이터 부족 (2일)",
                "evalStatus": "data_missing"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 106.1% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +8.97% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.05:1 · 평균 체결강도 221.1% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 322000,
            "previousClose": 295500,
            "dailyChange": 26500,
            "dailyChangePct": 8.97,
            "dailyDirection": "up",
            "entryPriceText": "322,000원 (당일 종가 기준)",
            "entryPrice": 322000,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 7.65%, 일간 표준편차 5.53%, 당일 레인지 8.12%.",
              "metrics": {
                "atrPct10": 7.65,
                "returnStd20": 5.53,
                "todayRangePct": 8.12,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 2,
              "sponsor": "none",
              "cumulativeNet": 0.0,
              "positiveDays": 0,
              "improvementCount": 0,
              "series": {
                "foreign": [],
                "institution": [],
                "sponsor": []
              },
              "status": "data_missing",
              "score": 0.0,
              "summary": "최근 수급 추세 데이터 부족",
              "note": "최근 수급 추세 데이터 부족 (2일)"
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
                "targetPrice": "323,000원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+6.5%",
                "targetPrice": "343,000원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.5%",
                "targetPrice": "343,000원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "347,760원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "357,420원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 312,340원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "312,340원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260608",
              "anchorOpen": 293000,
              "anchorClose": 295500,
              "anchorVolumeRatio20d": 1.12,
              "anchorStopPrice": 293000,
              "fallbackStopPrice": 312340,
              "effectiveHardStopPrice": 312340,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 293,000원와 기존 % 손절 312,340원 중 더 높은 312,340원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 293,000원를 기준으로 잡고, 기존 % 손절 312,340원보다 느슨해지지 않게 312,340원로 고정합니다."
            },
            "rr": "1 : 2.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 318780,
              "high": 322000,
              "anchor": 322000,
              "label": "318,780~322,000원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 323000,
                "secondaryResistancePrice": 343000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "328,440원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "333,270원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "339,710원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "347,760원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "357,420원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 312,340원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "312,340원"
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
                "nearestResistancePrice": 323000,
                "secondaryResistancePrice": 343000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "323,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "333,270원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "339,710원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "347,760원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "357,420원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 312,340원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "312,340원"
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
                "nearestResistancePrice": 323000,
                "secondaryResistancePrice": 343000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.3%",
                    "targetPrice": "323,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+6.5%",
                    "targetPrice": "343,000원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.5%",
                    "targetPrice": "343,000원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "347,760원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "357,420원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 312,340원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "312,340원"
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
                "currentPrice": 322000.0,
                "vs52wHighPct": 85.41114058355438,
                "vs52wLowPct": 465.9050966608084,
                "dropFrom52wHighPct": 14.588859416445624,
                "ma20GapPct": 6.104291951561084,
                "rsi14": 58.31823382036066,
                "volumeRatio20d": 86.99004137724911,
                "rs20Pct": 19.925512104283055,
                "tradingValueRank": 2.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 1885.4249,
                "per": 26.07,
                "pbr": 4.48,
                "cnsPer": 7.36,
                "foreignRate": 47.58,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T00:01:34+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          },
          {
            "rank": 3,
            "name": "KB금융",
            "code": "105560",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 13.0,
            "effectiveScoreMax": 12.0,
            "gradeScore": 6.2,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 138,099주 / 기관 229,909주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +138,099 / 전일 -47,506 · 기관 당일 +229,909 / 전일 +23,399 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "마지막 1시간 평균 체결강도 58.5% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "당일 평균 117.0% / 마지막 1시간 58.5% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인"
              },
              {
                "code": "S5",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "data_missing",
                "note": "최근 수급 추세 데이터 부족 (2일)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 99.5% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 159,740 / 20MA 155,575 · 5MA > 20MA"
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
                "note": "당일 등락 +2.18% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +3.69% / KOSPI +4.63% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.08:1 · 평균 체결강도 25.4% (필요 ≥ 1.1:1)"
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
                "note": "외인 전일 -47,506/당일 +138,099 · 기관 전일 +23,399/당일 +229,909 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 154,800 / 60MA 154,645",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 88.1% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 59",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 116% (필요 < 150%)",
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
                "note": "외인 138,099주 / 기관 229,909주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +138,099 / 전일 -47,506 · 기관 당일 +229,909 / 전일 +23,399 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 99.5% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 159,740 / 20MA 155,575 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 85% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +2.18% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 58.5% (필요 ≥ 100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "S4",
                "note": "당일 평균 117.0% / 마지막 1시간 58.5% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "S5",
                "note": "최근 수급 추세 데이터 부족 (2일)",
                "evalStatus": "data_missing"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +3.69% / KOSPI +4.63% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.08:1 · 평균 체결강도 25.4% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 154800,
            "previousClose": 151500,
            "dailyChange": 3300,
            "dailyChangePct": 2.18,
            "dailyDirection": "up",
            "entryPriceText": "154,800원 (당일 종가 기준)",
            "entryPrice": 154800,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 57.1757,
            "marketCapRank": 13,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 138,099주 / 기관 229,909주 / 마지막 1시간 58.5% · 마지막 30분 틱 0.08:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 117.0,
              "note": "토스 공개 체결강도 117.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A105560/order",
              "asOf": "2026-06-12T10:59:59Z",
              "intradayAbove100Ratio": 40.0,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 58.5,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 25.4,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0818,
              "last30BuyVolume": 69.0,
              "last30SellVolume": 844.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 89.91, ATR10 5.59%, 일간 표준편차 3.54%, 당일 레인지 4.09%.",
              "metrics": {
                "atrPct10": 5.59,
                "returnStd20": 3.54,
                "todayRangePct": 4.09,
                "vkospi": 89.91
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 2,
              "sponsor": "none",
              "cumulativeNet": 0.0,
              "positiveDays": 0,
              "improvementCount": 0,
              "series": {
                "foreign": [],
                "institution": [],
                "sponsor": []
              },
              "status": "data_missing",
              "score": 0.0,
              "summary": "최근 수급 추세 데이터 부족",
              "note": "최근 수급 추세 데이터 부족 (2일)"
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
                "targetPrice": "155,000원",
                "historicalHitRate": 0.6781,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.2%",
                "targetPrice": "165,900원",
                "historicalHitRate": 0.3836,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+5.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+7.2%",
                "targetPrice": "165,900원",
                "historicalHitRate": 0.2329,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "167,184원",
                "historicalHitRate": 0.1438,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "15% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "171,828원",
                "historicalHitRate": 0.0803,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 150,156원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "150,156원"
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
              "fallbackStopPrice": 150156,
              "effectiveHardStopPrice": 150156,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 150,156원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 150,156원만 유지합니다."
            },
            "rr": "1 : 2.2",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 153252,
              "high": 154800,
              "anchor": 154800,
              "label": "153,252~154,800원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 155000,
                "secondaryResistancePrice": 165900,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "157,896원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "160,218원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "163,314원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "167,184원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "171,828원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 150,156원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "150,156원"
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
                "nearestResistancePrice": 155000,
                "secondaryResistancePrice": 165900,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "155,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "160,218원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.5%",
                    "targetPrice": "163,314원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "167,184원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "171,828원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 150,156원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "150,156원"
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
                "nearestResistancePrice": 155000,
                "secondaryResistancePrice": 165900,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "155,000원",
                    "historicalHitRate": 0.6781,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.2%",
                    "targetPrice": "165,900원",
                    "historicalHitRate": 0.3836,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+5.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+7.2%",
                    "targetPrice": "165,900원",
                    "historicalHitRate": 0.2329,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "167,184원",
                    "historicalHitRate": 0.1438,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "15% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "171,828원",
                    "historicalHitRate": 0.0803,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 150,156원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "150,156원"
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
                "currentPrice": 154800.0,
                "vs52wHighPct": 88.10472396129767,
                "vs52wLowPct": 49.13294797687861,
                "dropFrom52wHighPct": 11.895276038702333,
                "ma20GapPct": -0.4981520167121967,
                "rsi14": 48.64375726981564,
                "volumeRatio20d": 116.49681164013406,
                "rs20Pct": -4.267161410018553,
                "tradingValueRank": 59.0,
                "marketCapRank": 13.0,
                "marketCapTrillion": 57.1757,
                "per": 10.19,
                "pbr": 0.96,
                "cnsPer": 9.15,
                "foreignRate": 79.84,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-13T00:01:34+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI"
          }
        ],
        "reversal": [
          {
            "rank": 1,
            "name": "LG이노텍",
            "code": "011070",
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
                "note": "외인 -60,220→46,230 / 기관 35,180→20,825 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 90.0% / 마지막 1시간 152.7% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,135,000 / 20MA 984,650 (115.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 81% (필요 ≥ 50%)"
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
                "note": "직전 30분봉 종가 1150000, 전봉 종가 1123000 충족"
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
                "note": "당일 거래대금 순위 16위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 26.9조 (필요 ≥ 5조)",
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
                "note": "최근 진입 이력 2건 · 손절 없음 (최근: 2026-06-04) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +78.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -36.5% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,135,000 / 60MA 590,558",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -18.2% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 12.42)",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -60,220→46,230 / 기관 35,180→20,825 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 90.0% / 마지막 1시간 152.7% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,135,000 / 20MA 984,650 (115.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 81% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1150000, 전봉 종가 1123000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 78% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.62 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1135000,
            "previousClose": 1095000,
            "dailyChange": 40000,
            "dailyChangePct": 3.65,
            "dailyDirection": "up",
            "entryPriceText": "1,135,000원 (당일 종가 기준)",
            "entryPrice": 1135000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 26.9095,
            "marketCapRank": 30,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -36.5% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
            "eventFilter": null,
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1150000, 전봉 종가 1123000",
              "latestOpen": 1123000.0,
              "latestClose": 1150000.0,
              "previousClose": 1123000.0
            },
            "toss": {
              "avgStrength": 90.0,
              "note": "토스 공개 체결강도 90.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A011070/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 152.7,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 152.7,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.5492,
              "last30BuyVolume": 457.0,
              "last30SellVolume": 295.0
            },
            "orderbook": {
              "bidAskRatio": 0.624,
              "bidTotal": 1092,
              "askTotal": 1750,
              "note": "Naver 호가잔량합계 매수 1,092 / 매도 1,750",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=011070"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 89.67, ATR10 19.72%, 일간 표준편차 10.00%, 당일 레인지 16.71%.",
              "metrics": {
                "atrPct10": 19.72,
                "returnStd20": 10.0,
                "todayRangePct": 16.71,
                "vkospi": 89.67
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "1,169,000원",
                "historicalHitRate": 0.7,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+4.7%",
                "targetPrice": "1,188,000원",
                "historicalHitRate": 0.6308,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,100,950원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,100,950원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 986000,
              "fallbackStopPrice": 1100950,
              "effectiveHardStopPrice": 1100950,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 986,000원와 기존 % 손절 1,100,950원 중 더 높은 1,100,950원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 986,000원이며, 기존 % 손절 1,100,950원보다 느슨해지지 않게 1,100,950원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 1121380,
              "high": 1132730,
              "anchor": 1135000,
              "label": "1,121,380~1,132,730원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1788000,
                "retrace33Price": 1350490,
                "retrace50Price": 1461500,
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+57.5%",
                    "targetPrice": "1,788,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,100,950원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,100,950원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1788000,
                "retrace33Price": 1350490,
                "retrace50Price": 1461500,
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,100,950원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,100,950원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "recentHighPrice": 1788000,
                "retrace33Price": 1350490,
                "retrace50Price": 1461500,
                "nearestResistancePrice": 1169000,
                "secondaryResistancePrice": 1188000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,169,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+4.7%",
                    "targetPrice": "1,188,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,100,950원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,100,950원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.0096
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 130건)",
              "hitRate": 0.7,
              "ev": 1.66,
              "sampleCount": 130
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: G2",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -36.5% (필요 -5%~-25%)",
            "statusReason": "G2 미충족: 20일 고점 대비 -36.5% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1135000.0,
                "vs52wHighPct": 62.56890848952591,
                "vs52wLowPct": 710.1356174161313,
                "dropFrom52wHighPct": 37.43109151047409,
                "ma20GapPct": 15.26938506068146,
                "rsi14": 60.98139771310473,
                "volumeRatio20d": 115.51670064037137,
                "rs20Pct": 81.89102564102564,
                "tradingValueRank": 16.0,
                "marketCapRank": 30.0,
                "marketCapTrillion": 26.9095,
                "per": 55.51,
                "pbr": 4.42,
                "cnsPer": 34.41,
                "foreignRate": 23.28,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 2,
            "name": "주성엔지니어링",
            "code": "036930",
            "strictScore": 6.5,
            "signalScore": 6.5,
            "score": 6.5,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 6.5,
            "grade": "B",
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -40,670→5,844 / 기관 49,115→-61,709 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 92.8% / 마지막 1시간 113.2% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 192,100 / 20MA 191,605 (100.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 37% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 56% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.01 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 194700, 전봉 종가 195200 미달"
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
                "note": "당일 거래대금 순위 26위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 8.9조 (필요 ≥ 5조)",
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
                "note": "최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +42.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -24.7% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 192,100 / 60MA 120,457",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -16.2% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 1.84)",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -40,670→5,844 / 기관 49,115→-61,709 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 92.8% / 마지막 1시간 113.2% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 192,100 / 20MA 191,605 (100.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.01 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 37% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 56% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 194700, 전봉 종가 195200 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 192100,
            "previousClose": 182800,
            "dailyChange": 9300,
            "dailyChangePct": 5.09,
            "dailyDirection": "up",
            "entryPriceText": "192,100원 (당일 종가 기준)",
            "entryPrice": 192100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.929,
            "marketCapRank": 78,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -24.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                    "KIND 공시에서 주성엔지니어링 (036930) 종목 공시를 조회합니다.",
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
              "note": "직전 30분봉 종가 194700, 전봉 종가 195200",
              "latestOpen": 195300.0,
              "latestClose": 194700.0,
              "previousClose": 195200.0
            },
            "toss": {
              "avgStrength": 92.8,
              "note": "토스 공개 체결강도 92.8% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-06-09T06:02:19Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 113.2,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 113.2,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.7861,
              "last30BuyVolume": 926.0,
              "last30SellVolume": 1178.0
            },
            "orderbook": {
              "bidAskRatio": 1.0104,
              "bidTotal": 2244,
              "askTotal": 2221,
              "note": "Naver 호가잔량합계 매수 2,244 / 매도 2,221",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=036930"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 89.67, ATR10 15.66%, 일간 표준편차 12.91%, 당일 레인지 11.65%.",
              "metrics": {
                "atrPct10": 15.66,
                "returnStd20": 12.91,
                "todayRangePct": 11.65,
                "vkospi": 89.67
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
                "targetPrice": "197,863원",
                "historicalHitRate": 0.7,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "201,705원",
                "historicalHitRate": 0.6308,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 186,337원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "186,337원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 184200,
              "fallbackStopPrice": 186337,
              "effectiveHardStopPrice": 186337,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 184,200원와 기존 % 손절 186,337원 중 더 높은 186,337원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 184,200원이며, 기존 % 손절 186,337원보다 느슨해지지 않게 186,337원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 189795,
              "high": 191716,
              "anchor": 192100,
              "label": "189,795~191,716원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 255000,
                "retrace33Price": 212857,
                "retrace50Price": 223550,
                "nearestResistancePrice": 199300,
                "secondaryResistancePrice": 203000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.7%",
                    "targetPrice": "199,300원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.7%",
                    "targetPrice": "203,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+32.7%",
                    "targetPrice": "255,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,337원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "186,337원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 255000,
                "retrace33Price": 212857,
                "retrace50Price": 223550,
                "nearestResistancePrice": 199300,
                "secondaryResistancePrice": 203000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.7%",
                    "targetPrice": "199,300원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.7%",
                    "targetPrice": "203,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,337원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "186,337원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "recentHighPrice": 255000,
                "retrace33Price": 212857,
                "retrace50Price": 223550,
                "nearestResistancePrice": 199300,
                "secondaryResistancePrice": 203000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "197,863원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "201,705원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,337원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "186,337원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.0096
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 130건)",
              "hitRate": 0.7,
              "ev": 1.66,
              "sampleCount": 130
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단",
            "statusReason": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 192100.0,
                "vs52wHighPct": 75.33333333333333,
                "vs52wLowPct": 637.4280230326295,
                "dropFrom52wHighPct": 24.666666666666668,
                "ma20GapPct": 0.2583439889355706,
                "rsi14": 53.76317316301095,
                "volumeRatio20d": 61.70504061909381,
                "rs20Pct": 38.30093592512599,
                "tradingValueRank": 26.0,
                "marketCapRank": 78.0,
                "marketCapTrillion": 8.929,
                "per": 1334.03,
                "pbr": 14.96,
                "cnsPer": 0.0,
                "foreignRate": 9.09,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
              "source": "jongga_analysis"
            }
          },
          {
            "rank": 3,
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 40,876→7,021 / 기관 -25,435→-24,451 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 105.0% / 마지막 1시간 169.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,256,000 / 20MA 1,190,000 (105.5% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 73% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.81 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 1260000, 전봉 종가 1247000 충족"
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
                "note": "당일 거래대금 순위 11위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 165.7조 (필요 ≥ 5조)",
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
                "note": "최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단",
                "evalStatus": "not_met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +14.3% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -9.8% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 1,256,000 / 60MA 837,733",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -11.1% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "당일 평균 105.0% / 마지막 1시간 169.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,256,000 / 20MA 1,190,000 (105.5% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 88% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1260000, 전봉 종가 1247000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 40,876→7,021 / 기관 -25,435→-24,451 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 73% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.81 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1256000,
            "previousClose": 1118000,
            "dailyChange": 138000,
            "dailyChangePct": 12.34,
            "dailyDirection": "up",
            "entryPriceText": "1,256,000원 (당일 종가 기준)",
            "entryPrice": 1256000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 165.7397,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2560,
            "keyPoint": "20일 고점 대비 -9.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1260000, 전봉 종가 1247000",
              "latestOpen": 1248000.0,
              "latestClose": 1260000.0,
              "previousClose": 1247000.0
            },
            "toss": {
              "avgStrength": 105.0,
              "note": "토스 공개 체결강도 105.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-09T06:02:15Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 169.1,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 169.1,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.1509,
              "last30BuyVolume": 1254.0,
              "last30SellVolume": 583.0
            },
            "orderbook": {
              "bidAskRatio": 0.8133,
              "bidTotal": 1185,
              "askTotal": 1457,
              "note": "Naver 호가잔량합계 매수 1,185 / 매도 1,457",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 급락 반등 기회가 늘어 유리합니다. VKOSPI 89.67, ATR10 9.47%, 일간 표준편차 6.60%, 당일 레인지 11.18%.",
              "metrics": {
                "atrPct10": 9.47,
                "returnStd20": 6.6,
                "todayRangePct": 11.18,
                "vkospi": 89.67
              },
              "strategyLabel": "급락반등"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "1,269,000원",
                "historicalHitRate": 0.7,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+2.6%",
                "targetPrice": "1,289,000원",
                "historicalHitRate": 0.6308,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,218,320원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,218,320원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1146000,
              "fallbackStopPrice": 1218320,
              "effectiveHardStopPrice": 1218320,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,146,000원와 기존 % 손절 1,218,320원 중 더 높은 1,218,320원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,146,000원이며, 기존 % 손절 1,218,320원보다 느슨해지지 않게 1,218,320원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 0.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1240928,
              "high": 1253488,
              "anchor": 1256000,
              "label": "1,240,928~1,253,488원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1300880,
                "retrace50Price": 1324000,
                "nearestResistancePrice": 1269000,
                "secondaryResistancePrice": 1289000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,269,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,289,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+10.8%",
                    "targetPrice": "1,392,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,218,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,218,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1392000,
                "retrace33Price": 1300880,
                "retrace50Price": 1324000,
                "nearestResistancePrice": 1269000,
                "secondaryResistancePrice": 1289000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,269,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,289,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,218,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,218,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "recentHighPrice": 1392000,
                "retrace33Price": 1300880,
                "retrace50Price": 1324000,
                "nearestResistancePrice": 1269000,
                "secondaryResistancePrice": 1289000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,269,000원",
                    "historicalHitRate": 0.7,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,289,000원",
                    "historicalHitRate": 0.6308,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,218,320원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,218,320원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 130건)",
                  "hitRate": 0.7,
                  "ev": 1.66,
                  "sampleCount": 130
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.0096
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 130건)",
              "hitRate": 0.7,
              "ev": 1.66,
              "sampleCount": 130
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "핵심 Gate 미충족: F4",
              "핵심 Gate 미충족: G1",
              "매매금지",
              "등급 B — 진입 최소 A, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단 · 외 1건",
            "statusReason": "F4 미충족: 최근 손절 이력 2건 (최근: 2026-06-04) · 재진입 차단 / G1 미충족: 1개월 수익률 +14.3% (필요 ≥ +15%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1256000.0,
                "vs52wHighPct": 90.22988505747126,
                "vs52wLowPct": 899.2044550517104,
                "dropFrom52wHighPct": 9.770114942528735,
                "ma20GapPct": 5.546218487394958,
                "rsi14": 59.425081221025835,
                "volumeRatio20d": 70.91048307665298,
                "rs20Pct": 14.389799635701275,
                "tradingValueRank": 11.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 165.7397,
                "per": 10.67,
                "pbr": 4.59,
                "cnsPer": 4.56,
                "foreignRate": 49.22,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-09T15:02:24+09:00",
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
  "analysisDate": "2026-06-09"
};
