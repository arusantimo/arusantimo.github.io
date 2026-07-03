window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-07-02"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-07-02T08:34:50+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "009150",
      "name": "삼성전기",
      "reasons": [
        "공매도 과열"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
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
    },
    {
      "code": "006340",
      "name": "대원전선",
      "reasons": [
        "투자 주의",
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
      "naver_overtime_board": {
        "fallback": 1
      },
      "krx_pykrx_short_balance": {
        "ok": 15
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
        "durationMs": 1052.6,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 252.4,
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
        "durationMs": 1452.3,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 239.0,
        "detail": "순환매장 🔄 (거시·지수 완충)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 38540.7,
        "count": 19
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 657.3,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 16325.2,
        "detail": "후보 15종목 중 15건 수집",
        "count": 15
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 5554.8,
        "detail": "성공 19 / 실패 0",
        "count": 19
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 6553.3,
        "detail": "direct-http · 체결강도 19 / 호가 19 / 틱프록시 19",
        "count": 19
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 53399.9,
        "detail": "pullback 2, breakout 2, accumulation 3, reversal 3",
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
        "durationMs": 65774.9,
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
            "value": "순환매장 🔄 (거시·지수 완충)"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "7648.09 (-7.89%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 86.41"
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
            "value": "G-D 🟠 (-4.5점)"
          },
          {
            "item": "갭 조정",
            "value": "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "7495.84",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "8378.35",
            "verdict": "❌"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 86.41",
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
          "marketAnalyzeDate": "20260702",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "순환매장 🔄 (거시·지수 완충)",
          "regimeAdjustmentReason": "펀더 앵커 81 · 버블 critical off · KOSPI 60MA 상향 · 펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향",
          "riseJustified": true,
          "kospiBullTier": "maintain",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 81.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.74,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1553원과 과열 이격이 겹쳤지만 펀더멘털 앵커 81점과 non-critical bubble(BI 45 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 7648.09,
          "kospiMa5": 8246.768,
          "vkospiValue": 86.41,
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
            "actualValue": "-0.53%",
            "baseScore": "-1점",
            "weight": "×2.5",
            "formula": "-1 × 2.5 = -2.5점",
            "weightedScore": "-2.5점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.91",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+8.3bp",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+1.82원",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "-0.78%",
            "baseScore": "-1점",
            "weight": "×1.0",
            "formula": "-1 × 1.0 = -1.0점",
            "weightedScore": "-1.0점"
          }
        ],
        "totalScore": "-4.5점",
        "grade": "G-D 🟠",
        "code": "G-D",
        "entryAdjustment": "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류",
        "sellAdjustment": "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소",
        "swingAdjustment": "금지",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-07-03T03:59:00+00:00",
          "vix": "2026-07-02T20:15:00+00:00",
          "tnx": "2026-07-02T19:00:00+00:00",
          "krw": "2026-07-02T22:59:00+00:00",
          "sox": "2026-07-03T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
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
                "note": "외인 30,960주 / 기관 1,412,843주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 227,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 226,000 ≤ 종가 227,500)"
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
                "note": "52주 고가 대비 -19.6% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 107% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -13.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
                "note": "최근 20일 최대 거래량 급증 226% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 202,540 > 20MA 204,060 > 60MA 159,880 · 상승선 5MA, 60MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 227,500 / 60MA 159,880",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 71.0 (필요 ≥ 50)",
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
                "note": "KOSPI 7,648 / 5MA 8,247 (-7.3%) · VKOSPI 86.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -5.99% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 71.0 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +11.5% (필요 ≤ +25%) · 60MA +42.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -19.6% (≥12%) · 거래량 107% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 거래량 / 앵커 거래량 47% · 시가 226,000 / 종가 227,500 / 전일 종가 242,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 227,500 / 앵커 중심값 221,400 / 복합 지지 185,429 · 앵커·지지 방어",
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
                "note": "KIND 최근공시 2026-07-02까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 30,960주 / 기관 1,412,843주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 227,500 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 226,000 ≤ 종가 227,500)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -19.6% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 107% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -13.6% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
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
            "currentPrice": 227500,
            "previousClose": 242000,
            "dailyChange": -14500,
            "dailyChangePct": -5.99,
            "dailyDirection": "down",
            "entryPriceText": "227,500원 (당일 종가 기준)",
            "entryPrice": 227500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 10.5745,
            "marketCapRank": 66,
            "marketCapUniverseCount": 2554,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 30,960주 / 기관 1,412,843주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 평균 체결강도 데이터 부족"
            ],
            "toss": {
              "avgStrength": 100.7,
              "note": "토스 공개 체결강도 100.7% / 최근 체결 108분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A036930/order",
              "asOf": "2026-07-02T08:30:26Z",
              "intradayAbove100Ratio": 70.6,
              "observedMinutes": 108,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 108분 프록시"
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-07-02까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 185,429원 (18.49% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 185429,
                    "distancePct": 18.49,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 11,
                    "lastSeenDaysAgo": 6,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 197825,
                    "distancePct": 13.04,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 225300,
                    "distancePct": 0.97,
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
                    "price": 229833,
                    "distancePct": -1.03,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 14,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 218300,
                    "distancePct": 4.04,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 4,
                    "lastSeenDaysAgo": 11,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 185429,
                  "distancePct": 18.49,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 11,
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
                    "price": 60775,
                    "distancePct": 73.29,
                    "count": 3,
                    "lastSeenDaysAgo": 54,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 60500,
                    "bandHigh": 61000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 63425,
                    "distancePct": 72.12,
                    "count": 5,
                    "lastSeenDaysAgo": 53,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 63100,
                    "bandHigh": 63800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 68033,
                    "distancePct": 70.1,
                    "count": 3,
                    "lastSeenDaysAgo": 50,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 67900,
                    "bandHigh": 68200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 70500,
                    "distancePct": 69.01,
                    "count": 4,
                    "lastSeenDaysAgo": 49,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 70300,
                    "bandHigh": 70700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 111200,
                    "distancePct": 51.12,
                    "count": 2,
                    "lastSeenDaysAgo": 45,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 110400,
                    "bandHigh": 112000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 116050,
                    "distancePct": 48.99,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 115900,
                    "bandHigh": 116200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 120133,
                    "distancePct": 47.19,
                    "count": 3,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 118900,
                    "bandHigh": 121100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 123220,
                    "distancePct": 45.84,
                    "count": 5,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 122000,
                    "bandHigh": 124200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 126517,
                    "distancePct": 44.39,
                    "count": 6,
                    "lastSeenDaysAgo": 37,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 125900,
                    "bandHigh": 127600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 135000,
                    "distancePct": 40.66,
                    "count": 3,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 133800,
                    "bandHigh": 136100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 139550,
                    "distancePct": 38.66,
                    "count": 2,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 138900,
                    "bandHigh": 140200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 143700,
                    "distancePct": 36.84,
                    "count": 2,
                    "lastSeenDaysAgo": 34,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 143200,
                    "bandHigh": 144200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 162333,
                    "distancePct": 28.64,
                    "count": 3,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 161600,
                    "bandHigh": 163800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 167388,
                    "distancePct": 26.42,
                    "count": 7,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 165300,
                    "bandHigh": 169000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 171900,
                    "distancePct": 24.44,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 171800,
                    "bandHigh": 172000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 176750,
                    "distancePct": 22.31,
                    "count": 4,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 175000,
                    "bandHigh": 178500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 182150,
                    "distancePct": 19.93,
                    "count": 7,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 180100,
                    "bandHigh": 184200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 185880,
                    "distancePct": 18.29,
                    "count": 5,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 185200,
                    "bandHigh": 188000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 191325,
                    "distancePct": 15.9,
                    "count": 3,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 190200,
                    "bandHigh": 193100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 199050,
                    "distancePct": 12.51,
                    "count": 7,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 196600,
                    "bandHigh": 201000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 209200,
                    "distancePct": 8.04,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 208000,
                    "bandHigh": 210500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 218300,
                    "distancePct": 4.04,
                    "count": 4,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 217000,
                    "bandHigh": 220000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 225300,
                    "distancePct": 0.97,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 223500,
                    "bandHigh": 227500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 229833,
                    "distancePct": -1.03,
                    "count": 2,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 229000,
                    "bandHigh": 231000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 243750,
                    "distancePct": -7.14,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 242000,
                    "bandHigh": 245500
                  }
                ],
                "swingCluster": [],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 231655,
                    "distancePct": -1.83,
                    "count": 9,
                    "lastSeenDaysAgo": 0,
                    "valid": false,
                    "weight": 25,
                    "volume": 37672890,
                    "binIndex": 18,
                    "binLow": 226988,
                    "binHigh": 236323
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 184978,
                    "distancePct": 18.69,
                    "count": 6,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 25,
                    "volume": 19483800,
                    "binIndex": 13,
                    "binLow": 180310,
                    "binHigh": 189646
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 212984,
                    "distancePct": 6.38,
                    "count": 5,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 25,
                    "volume": 15876164,
                    "binIndex": 16,
                    "binLow": 208317,
                    "binHigh": 217652
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 196600,
                    "distancePct": 13.58,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 212.8,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 226% (15일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 226.1,
                "latestBurstDaysAgo": 1
              },
              "anchor": {
                "date": "20260611",
                "open": 197300,
                "close": 245500,
                "high": 254000,
                "low": 183000,
                "bodyMid": 221400,
                "volume": 7355861.0,
                "volumeRatio": 2.16,
                "daysAgo": 15
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 47% · 시가 226,000 / 종가 227,500 / 전일 종가 242,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 227,500 / 앵커 중심값 221,400 / 복합 지지 185,429 · 앵커·지지 방어"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 86.41, ATR10 14.07%, 일간 표준편차 9.93%, 당일 레인지 17.15%.",
              "metrics": {
                "atrPct10": 14.07,
                "returnStd20": 9.93,
                "todayRangePct": 17.15,
                "vkospi": 86.41
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A036930/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 주성엔지니어링 (036930) 차트 화면을 엽니다.",
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
              "anchorDate": "20260611",
              "anchorOpen": 197300,
              "anchorClose": 245500,
              "anchorHigh": 254000,
              "anchorLow": 183000,
              "anchorBodyMid": 221400,
              "anchorVolumeRatio": 2.16,
              "anchorStopMode": "body_mid",
              "anchorStopPrice": 221400,
              "ma10Price": 193720,
              "ma10PrevPrice": 192220,
              "ma20Price": 204060,
              "ma20PrevPrice": 205210,
              "ma10WarningPrice": null,
              "hardStopPrice": 221400,
              "fallbackStopPrice": 220675,
              "effectiveStopPrice": 221400,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 몸통 중심 221,400원, 20일선 204,060원) = 221,400원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 220,675원) = 221,400원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 몸통 중심 221,400원, 20일선 204,060원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 220,675원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+0.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+0.5%",
                "targetPrice": "228,637원",
                "historicalHitRate": 0.6364,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+1.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "230,912원",
                "historicalHitRate": 0.5245,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+3.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "235,462원",
                "historicalHitRate": 0.3916,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 221,400원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-2.7%",
                "targetPrice": "221,400원"
              }
            ],
            "rr": "1 : 0.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 223405,
              "high": 225680,
              "anchor": 227500,
              "label": "223,405~225,680원 (종가 ±, 분할매수)"
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
                    "condition": "+0.5% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "228,637원",
                    "historicalHitRate": 0.6364,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "230,912원",
                    "historicalHitRate": 0.5245,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "235,462원",
                    "historicalHitRate": 0.3916,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 221,400원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.7%",
                    "targetPrice": "221,400원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.6364,
                  "ev": 2.961,
                  "sampleCount": 143
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 32건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+0.5% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "228,637원",
                    "historicalHitRate": 0.6364,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "230,912원",
                    "historicalHitRate": 0.5245,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "235,462원",
                    "historicalHitRate": 0.3916,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 221,400원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.7%",
                    "targetPrice": "221,400원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.6364,
                  "ev": 2.961,
                  "sampleCount": 143
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
                    "condition": "+0.5% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "228,637원",
                    "historicalHitRate": 0.6364,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "230,912원",
                    "historicalHitRate": 0.5245,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "235,462원",
                    "historicalHitRate": 0.3916,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 221,400원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.7%",
                    "targetPrice": "221,400원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.6364,
                  "ev": 2.961,
                  "sampleCount": 143
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 32건)",
              "sampleCount": 32,
              "ev": -1.9675
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 143건)",
              "hitRate": 0.6364,
              "ev": 2.961,
              "sampleCount": 143
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
            "statusReasonShort": "G1 미충족: 5MA 202,540 > 20MA 204,060 > 60MA 159,880 · 상승선 5MA, 60MA · 정배열 미충족",
            "statusReason": "G1 미충족: 5MA 202,540 > 20MA 204,060 > 60MA 159,880 · 상승선 5MA, 60MA · 정배열 미충족",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 227500.0,
                "vs52wHighPct": 80.3886925795053,
                "vs52wLowPct": 773.320537428023,
                "dropFrom52wHighPct": 19.6113074204947,
                "ma20GapPct": 11.486817602665884,
                "rsi14": 58.017120666104056,
                "volumeRatio20d": 107.3634969753942,
                "rs20Pct": -9.181636726546905,
                "supportDistancePct": 18.49,
                "tradingValueRank": 12.0,
                "marketCapRank": 66.0,
                "marketCapTrillion": 10.5745,
                "per": 1579.86,
                "pbr": 17.72,
                "cnsPer": 0.0,
                "foreignRate": 8.0,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -13.55353415017168
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "한화에어로스페이스",
            "code": "012450",
            "strictScore": 9.9,
            "signalScore": 9.9,
            "score": 9.9,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 7.6,
            "grade": "A",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 -12,777주 / 기관 44,085주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,116,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "아래꼬리:몸통 10.00 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -34.9% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 146% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -16.7% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G0, G1, G2)",
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
                "status": "⛔",
                "note": "5MA 1,046,600 > 20MA 1,079,500 > 60MA 1,261,217 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 1,116,000 / 60MA 1,261,217",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 51.5 (필요 ≥ 50)",
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
                "note": "KOSPI 7,648 / 5MA 8,247 (-7.3%) · VKOSPI 86.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +2.29% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 51.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +3.4% (필요 ≤ +25%) · 60MA -11.5% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -34.9% (≥12%) · 거래량 146% (≥80%) · 수급추세 +0 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 평균 111.0% / 마지막 1시간 5.6% · 마지막 30분 프록시 없음 · 장후반 약화 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-07-01까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 -12,777주 / 기관 44,085주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 1,116,000 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "아래꼬리:몸통 10.00 (필요 ≥ 1.0)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -34.9% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 146% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -16.7% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
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
              }
            ],
            "currentPrice": 1116000,
            "previousClose": 1091000,
            "dailyChange": 25000,
            "dailyChangePct": 2.29,
            "dailyDirection": "up",
            "entryPriceText": "1,116,000원 (당일 종가 기준)",
            "entryPrice": 1116000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 57.5448,
            "marketCapRank": 12,
            "marketCapUniverseCount": 2554,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -12,777주 / 기관 44,085주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 111.0,
              "note": "토스 공개 체결강도 111.0% / 최근 체결 32분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A012450/order",
              "asOf": "2026-07-02T08:32:44Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 32,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 32분 프록시",
              "lastHourAvgStrength": 5.6,
              "lastHourObservedMinutes": 32,
              "last30AvgStrength": 0.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0,
              "last30BuyVolume": 0.0,
              "last30SellVolume": 409.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-07-01까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 1,066,045원 (4.48% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 1066045,
                    "distancePct": 4.48,
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
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 962667,
                    "distancePct": 13.74,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1123429,
                    "distancePct": -0.67,
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
                    "price": 1089667,
                    "distancePct": 2.36,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 6,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 1021700,
                    "distancePct": 8.45,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 10,
                    "lastSeenDaysAgo": 1,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 1066045,
                  "distancePct": 4.48,
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
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 962667,
                    "distancePct": 13.74,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 955000,
                    "bandHigh": 968000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 994333,
                    "distancePct": 10.9,
                    "count": 6,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 984000,
                    "bandHigh": 1006000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1021700,
                    "distancePct": 8.45,
                    "count": 10,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1011000,
                    "bandHigh": 1032000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1061778,
                    "distancePct": 4.86,
                    "count": 6,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1044000,
                    "bandHigh": 1073000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1089667,
                    "distancePct": 2.36,
                    "count": 6,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1078000,
                    "bandHigh": 1096000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1123429,
                    "distancePct": -0.67,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1116000,
                    "bandHigh": 1138000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1178333,
                    "distancePct": -5.59,
                    "count": 4,
                    "lastSeenDaysAgo": 10,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1161000,
                    "bandHigh": 1189000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1212556,
                    "distancePct": -8.65,
                    "count": 6,
                    "lastSeenDaysAgo": 11,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1198000,
                    "bandHigh": 1227000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1249364,
                    "distancePct": -11.95,
                    "count": 8,
                    "lastSeenDaysAgo": 25,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1241000,
                    "bandHigh": 1261000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1280800,
                    "distancePct": -14.77,
                    "count": 5,
                    "lastSeenDaysAgo": 30,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1273000,
                    "bandHigh": 1286000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1312500,
                    "distancePct": -17.61,
                    "count": 4,
                    "lastSeenDaysAgo": 33,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1306000,
                    "bandHigh": 1317000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1409050,
                    "distancePct": -26.26,
                    "count": 12,
                    "lastSeenDaysAgo": 39,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1379000,
                    "bandHigh": 1426000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1449091,
                    "distancePct": -29.85,
                    "count": 8,
                    "lastSeenDaysAgo": 39,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1433000,
                    "bandHigh": 1465000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1503667,
                    "distancePct": -34.74,
                    "count": 6,
                    "lastSeenDaysAgo": 51,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 1484000,
                    "bandHigh": 1523000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 1533500,
                    "distancePct": -37.41,
                    "count": 2,
                    "lastSeenDaysAgo": 54,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 1530000,
                    "bandHigh": 1537000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 962667,
                    "distancePct": 13.74,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 955000,
                    "bandHigh": 968000
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 1384500,
                    "distancePct": -24.06,
                    "count": 2,
                    "lastSeenDaysAgo": 41,
                    "valid": false,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 1379000,
                    "bandHigh": 1390000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1070312,
                    "distancePct": 4.09,
                    "count": 6,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 25,
                    "volume": 1586921,
                    "binIndex": 4,
                    "binLow": 1057500,
                    "binHigh": 1083125
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1454688,
                    "distancePct": -30.35,
                    "count": 5,
                    "lastSeenDaysAgo": 40,
                    "valid": false,
                    "weight": 25,
                    "volume": 1191082,
                    "binIndex": 19,
                    "binLow": 1441875,
                    "binHigh": 1467500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 1300938,
                    "distancePct": -16.57,
                    "count": 4,
                    "lastSeenDaysAgo": 30,
                    "valid": false,
                    "weight": 25,
                    "volume": 1025090,
                    "binIndex": 13,
                    "binLow": 1288125,
                    "binHigh": 1313750
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 188% (9일 전)",
                "burstCount": 0,
                "maxRatioPct": 188.0,
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
                  "status": "⚠️",
                  "summary": "당일 평균 111.0% / 마지막 1시간 5.6% · 마지막 30분 프록시 없음 · 장후반 약화 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 86.41, ATR10 7.33%, 일간 표준편차 4.27%, 당일 레인지 9.26%.",
              "metrics": {
                "atrPct10": 7.33,
                "returnStd20": 4.27,
                "todayRangePct": 9.26,
                "vkospi": 86.41
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
              "ma10Price": 1071600,
              "ma10PrevPrice": 1078900,
              "ma20Price": 1079500,
              "ma20PrevPrice": 1077100,
              "ma10WarningPrice": null,
              "hardStopPrice": 1082520,
              "fallbackStopPrice": 1082520,
              "effectiveStopPrice": 1082520,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 1,082,520원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 1,082,520원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+0.5% 도달",
                "quantity": "40% 익절",
                "targetYield": "+0.5%",
                "targetPrice": "1,121,580원",
                "historicalHitRate": 0.6364,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+1.5% 도달",
                "quantity": "35% 익절",
                "targetYield": "+1.5%",
                "targetPrice": "1,132,740원",
                "historicalHitRate": 0.5245,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+3.5% 도달",
                "quantity": "25% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "1,155,060원",
                "historicalHitRate": 0.3916,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 1,082,520원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "1,082,520원"
              }
            ],
            "rr": "1 : 0.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1095912,
              "high": 1107072,
              "anchor": 1116000,
              "label": "1,095,912~1,107,072원 (종가 ±, 분할매수)"
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
                    "condition": "+0.5% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "1,121,580원",
                    "historicalHitRate": 0.6364,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,132,740원",
                    "historicalHitRate": 0.5245,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,155,060원",
                    "historicalHitRate": 0.3916,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,082,520원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,082,520원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.6364,
                  "ev": 2.961,
                  "sampleCount": 143
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 32건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+0.5% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "1,121,580원",
                    "historicalHitRate": 0.6364,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,132,740원",
                    "historicalHitRate": 0.5245,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,155,060원",
                    "historicalHitRate": 0.3916,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,082,520원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,082,520원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.6364,
                  "ev": 2.961,
                  "sampleCount": 143
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
                    "condition": "+0.5% 도달",
                    "quantity": "40% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "1,121,580원",
                    "historicalHitRate": 0.6364,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+1.5% 도달",
                    "quantity": "35% 익절",
                    "targetYield": "+1.5%",
                    "targetPrice": "1,132,740원",
                    "historicalHitRate": 0.5245,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+3.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "1,155,060원",
                    "historicalHitRate": 0.3916,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 1,082,520원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "1,082,520원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 143건)",
                  "hitRate": 0.6364,
                  "ev": 2.961,
                  "sampleCount": 143
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 32건)",
              "sampleCount": 32,
              "ev": -1.9675
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 143건)",
              "hitRate": 0.6364,
              "ev": 2.961,
              "sampleCount": 143
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
              "핵심 Gate 미충족: G1",
              "핵심 Gate 미충족: G2",
              "매매금지(핵심 Gate 미충족: G0, G1, G2)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 188% (필요 ≥ 200%) · 외 2건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 188% (필요 ≥ 200%) / G1 미충족: 5MA 1,046,600 > 20MA 1,079,500 > 60MA 1,261,217 · 상승선 5MA, 20MA · 정배열 미충족 / G2 미충족: 종가 1,116,000 / 60MA 1,261,217",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1116000.0,
                "vs52wHighPct": 65.14886164623468,
                "vs52wLowPct": 46.8421052631579,
                "dropFrom52wHighPct": 34.85113835376533,
                "ma20GapPct": 3.381194997684113,
                "rsi14": 49.510969200847384,
                "volumeRatio20d": 146.4526680649951,
                "rs20Pct": 4.49438202247191,
                "supportDistancePct": 4.48,
                "tradingValueRank": 23.0,
                "marketCapRank": 12.0,
                "marketCapTrillion": 57.5448,
                "per": 35.05,
                "pbr": 5.77,
                "cnsPer": 26.87,
                "foreignRate": 45.36,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -16.738660907127432
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          }
        ],
        "breakout": [
          {
            "rank": 1,
            "name": "한화오션",
            "code": "042660",
            "strictScore": 4.2,
            "signalScore": 4.2,
            "score": 4.2,
            "scoreMax": 12.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 3.4,
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
                "note": "외인 30,319주 / 기관 13,925주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 87.0% / 100% 유지 42.9% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 73.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 168% · 기준 충족 (≥150%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 90.2% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 87% / 윗꼬리·몸통 0.08 · 완벽한 강마감"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 2.00 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +40.2% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
                "note": "5일 초과 +13.3% / 20일 초과 +2.3%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 67.5% (필요 ≥ 90%)",
                "evalStatus": "not_met"
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
                "note": "당일 거래량 / 20일 평균 168% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 87% / 윗꼬리·몸통 0.08 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +1.16% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 104,500 / 5MA 102,320 (전일 5MA 102,540) · 5MA 조건 미충족",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 30,319주 / 기관 13,925주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 87% / 윗꼬리·몸통 0.08 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 2.00 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +40.2% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
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
                "note": "당일 평균 87.0% / 100% 유지 42.9% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 73.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 168% · 기준 충족 (≥150%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 90.2% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 104500,
            "previousClose": 103300,
            "dailyChange": 1200,
            "dailyChangePct": 1.16,
            "dailyDirection": "up",
            "entryPriceText": "104,500원 (당일 종가 기준)",
            "entryPrice": 104500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 32.0202,
            "marketCapRank": 23,
            "marketCapUniverseCount": 2554,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 30,319주 / 기관 13,925주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 87.0,
              "note": "토스 공개 체결강도 87.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042660/order",
              "asOf": "2026-07-02T08:32:39Z",
              "intradayAbove100Ratio": 42.9,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 112.0,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 110.2,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.2108,
              "last30BuyVolume": 70.0,
              "last30SellVolume": 332.0
            },
            "orderbook": {
              "bidAskRatio": 2.002,
              "bidTotal": 21696,
              "askTotal": 10837,
              "note": "Naver 호가잔량합계 매수 21,696 / 매도 10,837",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=042660"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 86.41, ATR10 9.53%, 일간 표준편차 6.02%, 당일 레인지 11.81%.",
              "metrics": {
                "atrPct10": 9.53,
                "returnStd20": 6.02,
                "todayRangePct": 11.81,
                "vkospi": 86.41
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
              "entryDayOpenPrice": 115100,
              "fallbackStopPrice": 99798,
              "effectiveHardStopPrice": 104300,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 104,300원와 기존 % 손절 99,798원 중 더 높은 104,300원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 104,300원이며, 기존 % 손절 99,798원보다 느슨해지지 않게 104,300원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "25% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "105,500원",
                "historicalHitRate": 0.6279,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.2%",
                "targetPrice": "106,800원",
                "historicalHitRate": 0.4186,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "109,725원",
                "historicalHitRate": 0.3023,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "111,815원",
                "historicalHitRate": 0.2558,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 104,300원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.2%",
                "targetPrice": "104,300원"
              }
            ],
            "rr": "1 : 18.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 102619,
              "high": 103664,
              "anchor": 104500,
              "label": "102,619~103,664원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 105500,
                "secondaryResistancePrice": 106800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "105,545원",
                    "historicalHitRate": 0.6279,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "107,635원",
                    "historicalHitRate": 0.4186,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "109,725원",
                    "historicalHitRate": 0.3023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "111,815원",
                    "historicalHitRate": 0.2558,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 104,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "104,300원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.2558,
                  "ev": 1.452,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 105500,
                "secondaryResistancePrice": 106800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "105,500원",
                    "historicalHitRate": 0.6279,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "106,800원",
                    "historicalHitRate": 0.4186,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "109,725원",
                    "historicalHitRate": 0.3023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "111,815원",
                    "historicalHitRate": 0.2558,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 104,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "104,300원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.2558,
                  "ev": 1.452,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 36건)",
                "nearestResistancePrice": 105500,
                "secondaryResistancePrice": 106800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "105,500원",
                    "historicalHitRate": 0.6279,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "106,800원",
                    "historicalHitRate": 0.4186,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "109,725원",
                    "historicalHitRate": 0.3023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "111,815원",
                    "historicalHitRate": 0.2558,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 104,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.2%",
                    "targetPrice": "104,300원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.2558,
                  "ev": 1.452,
                  "sampleCount": 129
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 36건)",
              "sampleCount": 36,
              "ev": -1.1838
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 129건)",
              "hitRate": 0.2558,
              "ev": 1.452,
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 67.5% (필요 ≥ 90%)",
            "statusReason": "G2 미충족: 52주 고가 대비 67.5% (필요 ≥ 90%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 104500.0,
                "vs52wHighPct": 67.50645994832041,
                "vs52wLowPct": 46.15384615384615,
                "dropFrom52wHighPct": 32.49354005167959,
                "ma20GapPct": -6.206525153704618,
                "rsi14": 43.663935125004464,
                "volumeRatio20d": 168.32183496634775,
                "rs20Pct": -9.209383145091225,
                "tradingValueRank": 30.0,
                "marketCapRank": 23.0,
                "marketCapTrillion": 32.0202,
                "per": 20.93,
                "pbr": 4.69,
                "cnsPer": 20.7,
                "foreignRate": 10.48,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 40.2251232888958
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 4.0,
            "signalScore": 4.0,
            "score": 4.0,
            "scoreMax": 12.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 3.2,
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
                "note": "외인 50,806주 / 기관 18,978주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 71.0% / 100% 유지 43.8% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 79.7% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 73% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "종가 / 당일 고가 92.3% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 85% / 윗꼬리·몸통 0.03 · 완벽한 강마감"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.43 (필요 ≥ 1.2)"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +13.0% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
                "note": "5일 초과 +10.8% / 20일 초과 +23.7%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 79.7% (필요 ≥ 90%)",
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
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 73% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 85% / 윗꼬리·몸통 0.03 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -12.65% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 1,926,000 / 5MA 2,069,200 (전일 5MA 2,083,400) · 5MA 조건 미충족",
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
                "note": "외인 50,806주 / 기관 18,978주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 85% / 윗꼬리·몸통 0.03 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +13.0% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 71.0% / 100% 유지 43.8% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 79.7% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 73% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 92.3% (필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.43 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1926000,
            "previousClose": 2205000,
            "dailyChange": -279000,
            "dailyChangePct": -12.65,
            "dailyDirection": "down",
            "entryPriceText": "1,926,000원 (당일 종가 기준)",
            "entryPrice": 1926000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 143.8601,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2554,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 50,806주 / 기관 18,978주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 71.0,
              "note": "토스 공개 체결강도 71.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-07-02T08:32:44Z",
              "intradayAbove100Ratio": 43.8,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 134.3,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 141.7,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.0179,
              "last30BuyVolume": 227.0,
              "last30SellVolume": 223.0
            },
            "orderbook": {
              "bidAskRatio": 0.4282,
              "bidTotal": 2864,
              "askTotal": 6689,
              "note": "Naver 호가잔량합계 매수 2,864 / 매도 6,689",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=009150"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 86.41, ATR10 9.70%, 일간 표준편차 7.60%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 9.7,
                "returnStd20": 7.6,
                "todayRangePct": 8.25,
                "vkospi": 86.41
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
              "referencePrice": 1886000,
              "referenceBandLow": 1880000,
              "referenceBandHigh": 1886000,
              "entryDayOpenPrice": 2081000,
              "fallbackStopPrice": 1839330,
              "effectiveHardStopPrice": 1886000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 1,886,000원와 기존 % 손절 1,839,330원 중 더 높은 1,886,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 1,886,000원이며, 기존 % 손절 1,839,330원보다 느슨해지지 않게 1,886,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "25% 익절",
                "targetYield": "+1.0%",
                "targetPrice": "1,945,000원",
                "historicalHitRate": 0.6279,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.4%",
                "targetPrice": "1,972,000원",
                "historicalHitRate": 0.4186,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+5.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+5.0%",
                "targetPrice": "2,022,300원",
                "historicalHitRate": 0.3023,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "2,060,820원",
                "historicalHitRate": 0.2558,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,886,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.1%",
                "targetPrice": "1,886,000원"
              }
            ],
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1891332,
              "high": 1910592,
              "anchor": 1926000,
              "label": "1,891,332~1,910,592원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1945000,
                "secondaryResistancePrice": 1972000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+1.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,945,260원",
                    "historicalHitRate": 0.6279,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "1,983,780원",
                    "historicalHitRate": 0.4186,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "2,022,300원",
                    "historicalHitRate": 0.3023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,060,820원",
                    "historicalHitRate": 0.2558,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,886,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.1%",
                    "targetPrice": "1,886,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.2558,
                  "ev": 1.452,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1945000,
                "secondaryResistancePrice": 1972000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,945,000원",
                    "historicalHitRate": 0.6279,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "1,972,000원",
                    "historicalHitRate": 0.4186,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "2,022,300원",
                    "historicalHitRate": 0.3023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,060,820원",
                    "historicalHitRate": 0.2558,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,886,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.1%",
                    "targetPrice": "1,886,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.2558,
                  "ev": 1.452,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 36건)",
                "nearestResistancePrice": 1945000,
                "secondaryResistancePrice": 1972000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,945,000원",
                    "historicalHitRate": 0.6279,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "1,972,000원",
                    "historicalHitRate": 0.4186,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+5.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.0%",
                    "targetPrice": "2,022,300원",
                    "historicalHitRate": 0.3023,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,060,820원",
                    "historicalHitRate": 0.2558,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,886,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.1%",
                    "targetPrice": "1,886,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "intraday2",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.2558,
                  "ev": 1.452,
                  "sampleCount": 129
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 36건)",
              "sampleCount": 36,
              "ev": -1.1838
            },
            "recommendedStage": {
              "stageKey": "intraday2",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 129건)",
              "hitRate": 0.2558,
              "ev": 1.452,
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
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G2, G4)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 52주 고가 대비 79.7% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 79.7% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 73% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1926000.0,
                "vs52wHighPct": 79.68556061232933,
                "vs52wLowPct": 1353.5849056603772,
                "dropFrom52wHighPct": 20.314439387670667,
                "ma20GapPct": -3.1893236824247904,
                "rsi14": 52.652801102465304,
                "volumeRatio20d": 72.56798214574913,
                "rs20Pct": 12.237762237762238,
                "tradingValueRank": 6.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 143.8601,
                "per": 181.92,
                "pbr": 14.83,
                "cnsPer": 115.7,
                "foreignRate": 39.77,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": 12.984284000117066
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
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
            "name": "삼성전기",
            "code": "009150",
            "strictScore": 7.5,
            "signalScore": 7.5,
            "score": 7.5,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 5.4,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 50,806주 / 기관 18,978주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +50,806 / 전일 +194,436 · 기관 당일 +18,978 / 전일 +96,511 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 134.3% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 71.0% / 마지막 1시간 134.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +478,861주 · 동반 양수 4/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 96.8% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 2,069,200 / 20MA 1,989,450 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 87% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -12.65% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -12.12% / KOSPI -7.89% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 1.02:1 · 평균 체결강도 141.7% (필요 ≥ 1.1:1)"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +13.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
            "statusLabel": "제외",
            "strategy": "accumulation",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "외인 전일 +194,436/당일 +50,806 · 기관 전일 +96,511/당일 +18,978 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,926,000 / 60MA 1,323,700",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 79.7% (필요 < 92%)",
                "evalStatus": "met"
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
                "note": "당일 거래량 / 20일 평균 73% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 39.8% (≥25%) · 20일 수익률 +12.2% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,648 / 5MA 8,247 (-7.3%) · VKOSPI 86.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 50,806주 / 기관 18,978주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +50,806 / 전일 +194,436 · 기관 당일 +18,978 / 전일 +96,511 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 134.3% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 71.0% / 마지막 1시간 134.3% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +478,861주 · 동반 양수 4/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 2,069,200 / 20MA 1,989,450 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 87% (필요 ≤ 90%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P1",
                "note": "종가 / 20MA 96.8% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -12.65% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -12.12% / KOSPI -7.89% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.02:1 · 평균 체결강도 141.7% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +13.0% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1926000,
            "previousClose": 2205000,
            "dailyChange": -279000,
            "dailyChangePct": -12.65,
            "dailyDirection": "down",
            "entryPriceText": "1,926,000원 (당일 종가 기준)",
            "entryPrice": 1926000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 143.8601,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2554,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 50,806주 / 기관 18,978주 / 마지막 1시간 134.3% · 장후반 매수세 강화 · 마지막 30분 틱 1.02:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 71.0,
              "note": "토스 공개 체결강도 71.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-07-02T08:32:44Z",
              "intradayAbove100Ratio": 43.8,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 134.3,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 141.7,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.0179,
              "last30BuyVolume": 227.0,
              "last30SellVolume": 223.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 86.41, ATR10 9.70%, 일간 표준편차 7.60%, 당일 레인지 8.25%.",
              "metrics": {
                "atrPct10": 9.7,
                "returnStd20": 7.6,
                "todayRangePct": 8.25,
                "vkospi": 86.41
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 478861.0,
              "positiveDays": 4,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260701",
                    "net": 50806.0
                  },
                  {
                    "date": "20260630",
                    "net": 194436.0
                  },
                  {
                    "date": "20260629",
                    "net": 50732.0
                  },
                  {
                    "date": "20260626",
                    "net": 54162.0
                  },
                  {
                    "date": "20260625",
                    "net": -62486.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260701",
                    "net": 18978.0
                  },
                  {
                    "date": "20260630",
                    "net": 96511.0
                  },
                  {
                    "date": "20260629",
                    "net": 20604.0
                  },
                  {
                    "date": "20260626",
                    "net": 56409.0
                  },
                  {
                    "date": "20260625",
                    "net": -1291.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260701",
                    "net": 69784.0
                  },
                  {
                    "date": "20260630",
                    "net": 290947.0
                  },
                  {
                    "date": "20260629",
                    "net": 71336.0
                  },
                  {
                    "date": "20260626",
                    "net": 110571.0
                  },
                  {
                    "date": "20260625",
                    "net": -63777.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +478,861주 · 동반 양수 4/5일 · 증가 2회"
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
                "targetYield": "+1.0%",
                "targetPrice": "1,945,000원",
                "historicalHitRate": 0.875,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.4%",
                "targetPrice": "1,972,000원",
                "historicalHitRate": 0.75,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "2,012,670원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "2,041,560원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,858,590원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "1,858,590원"
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
              "fallbackStopPrice": 1858590,
              "effectiveHardStopPrice": 1858590,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 1,858,590원 사용",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "앵커가 없어 기존 % 손절 1,858,590원만 유지합니다."
            },
            "rr": "1 : 1.0",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1891332,
              "high": 1910592,
              "anchor": 1926000,
              "label": "1,891,332~1,910,592원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1945000,
                "secondaryResistancePrice": 1972000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+0.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "1,935,630원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,964,520원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,012,670원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,041,560원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,858,590원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,858,590원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 1945000,
                "secondaryResistancePrice": 1972000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+0.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "1,935,630원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,964,520원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,012,670원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,041,560원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,858,590원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,858,590원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 47건)",
                "nearestResistancePrice": 1945000,
                "secondaryResistancePrice": 1972000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+1.0%",
                    "targetPrice": "1,945,000원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.4%",
                    "targetPrice": "1,972,000원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "2,012,670원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "2,041,560원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,858,590원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,858,590원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 47건)",
              "sampleCount": 47,
              "ev": -0.4892
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.875,
              "ev": 4.662,
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
              "reason": "현재 혼합 전략 기준에서는 자동 진입 대상이 아닙니다."
            },
            "entryEligible": false,
            "entryWatch": false,
            "entryBlockers": [
              "제외",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "점수 또는 핵심 조건 우선순위가 낮아 제외됐습니다.",
            "statusReason": "점수 또는 핵심 조건 우선순위가 낮아 제외됐습니다.",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1926000.0,
                "vs52wHighPct": 79.68556061232933,
                "vs52wLowPct": 1353.5849056603772,
                "dropFrom52wHighPct": 20.314439387670667,
                "ma20GapPct": -3.1893236824247904,
                "rsi14": 52.652801102465304,
                "volumeRatio20d": 72.56798214574913,
                "rs20Pct": 12.237762237762238,
                "tradingValueRank": 6.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 143.8601,
                "per": 181.92,
                "pbr": 14.83,
                "cnsPer": 115.7,
                "foreignRate": 39.77,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": 12.984284000117066
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "SK이터닉스",
            "code": "475150",
            "strictScore": 7.1,
            "signalScore": 7.1,
            "score": 7.1,
            "scoreMax": 14.0,
            "effectiveScoreMax": 11.0,
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
                "note": "외인 206,696주 / 기관 414,152주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +206,696 / 전일 -265,802 · 기관 당일 +414,152 / 전일 +99,629 · 당일 양매수 + 전일 수급 유입"
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
                "note": "당일 평균 체결강도 76.3% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +723,797주 · 양수 5/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 117.1% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 51,400 / 20MA 45,005 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 59% (필요 ≤ 90%)"
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
                "note": "동종업종 평균 -6.02% / KOSPI -7.89% outperform"
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
                "note": "외인 전일 -265,802/당일 +206,696 · 기관 전일 +99,629/당일 +414,152 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 52,700 / 60MA 48,793",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 76.0% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 37",
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
                "status": "⛔",
                "note": "외인 보유율 2.7% (≥25%) · 20일 수익률 +42.4% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,648 / 5MA 8,247 (-7.3%) · VKOSPI 86.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 206,696주 / 기관 414,152주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +206,696 / 전일 -265,802 · 기관 당일 +414,152 / 전일 +99,629 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +723,797주 · 양수 5/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 51,400 / 20MA 45,005 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 59% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -6.02% / KOSPI -7.89% outperform",
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
                "note": "당일 평균 체결강도 76.3% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 117.1% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -11.28% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱 프록시 데이터 부족",
                "evalStatus": "data_missing"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 52700,
            "previousClose": 59400,
            "dailyChange": -6700,
            "dailyChangePct": -11.28,
            "dailyDirection": "down",
            "entryPriceText": "52,700원 (당일 종가 기준)",
            "entryPrice": 52700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.7953000000000001,
            "marketCapRank": 234,
            "marketCapUniverseCount": 2554,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 206,696주 / 기관 414,152주. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 체결강도 미반영",
              "마지막 30분 틱 프록시 미반영"
            ],
            "toss": {
              "avgStrength": 76.3,
              "note": "토스 공개 체결강도 76.3% / 최근 체결 109분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A475150/order",
              "asOf": "2026-07-02T08:30:04Z",
              "intradayAbove100Ratio": 16.7,
              "observedMinutes": 109,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 109분 프록시"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 86.41, ATR10 17.01%, 일간 표준편차 12.94%, 당일 레인지 16.67%.",
              "metrics": {
                "atrPct10": 17.01,
                "returnStd20": 12.94,
                "todayRangePct": 16.67,
                "vkospi": 86.41
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 723797.0,
              "positiveDays": 5,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260701",
                    "net": 206696.0
                  },
                  {
                    "date": "20260630",
                    "net": -265802.0
                  },
                  {
                    "date": "20260629",
                    "net": 98291.0
                  },
                  {
                    "date": "20260626",
                    "net": -30281.0
                  },
                  {
                    "date": "20260625",
                    "net": -251858.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260701",
                    "net": 414152.0
                  },
                  {
                    "date": "20260630",
                    "net": 99629.0
                  },
                  {
                    "date": "20260629",
                    "net": 32618.0
                  },
                  {
                    "date": "20260626",
                    "net": 65005.0
                  },
                  {
                    "date": "20260625",
                    "net": 112393.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260701",
                    "net": 414152.0
                  },
                  {
                    "date": "20260630",
                    "net": 99629.0
                  },
                  {
                    "date": "20260629",
                    "net": 32618.0
                  },
                  {
                    "date": "20260626",
                    "net": 65005.0
                  },
                  {
                    "date": "20260625",
                    "net": 112393.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +723,797주 · 양수 5/5일 · 증가 2회"
            },
            "manualInput": {
              "required": true,
              "fields": [
                {
                  "fieldKey": "toss.lastHourAvgStrength",
                  "label": "마지막 1시간 평균 체결강도 (%)",
                  "sourceName": "토스증권 체결강도 분봉 화면",
                  "sourceUrl": "https://www.tossinvest.com/stocks/A475150/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK이터닉스 (475150) 차트 화면을 엽니다.",
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
                "quantity": "25% 익절",
                "targetYield": "+0.4%",
                "targetPrice": "52,900원",
                "historicalHitRate": 0.875,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+2.1%",
                "targetPrice": "53,800원",
                "historicalHitRate": 0.75,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.5%",
                "targetPrice": "55,071원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "55,862원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 51,700원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.9%",
                "targetPrice": "51,700원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260701",
              "anchorOpen": 51700,
              "anchorClose": 59400,
              "anchorVolumeRatio20d": 3.17,
              "anchorStopPrice": 51700,
              "fallbackStopPrice": 50856,
              "effectiveHardStopPrice": 51700,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 51,700원와 기존 % 손절 50,856원 중 더 높은 51,700원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 51,700원를 기준으로 잡고, 기존 % 손절 50,856원보다 느슨해지지 않게 51,700원로 고정합니다."
            },
            "rr": "1 : 1.7",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 51751,
              "high": 52278,
              "anchor": 52700,
              "label": "51,751~52,278원 (종가 ±, 분할매수)"
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
                    "condition": "+0.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "52,963원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "53,754원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "55,071원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "55,862원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 51,700원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "51,700원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 52900,
                "secondaryResistancePrice": 53800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "52,900원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "53,754원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "55,071원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "55,862원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 51,700원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "51,700원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 47건)",
                "nearestResistancePrice": 52900,
                "secondaryResistancePrice": 53800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.4%",
                    "targetPrice": "52,900원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "53,800원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "55,071원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "55,862원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 51,700원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.9%",
                    "targetPrice": "51,700원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 47건)",
              "sampleCount": 47,
              "ev": -0.4892
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.875,
              "ev": 4.662,
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
              "핵심 Gate 미충족: Q1",
              "매매금지(핵심 Gate 미충족: Q1)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "Q1 미충족: 외인 보유율 2.7% (≥25%) · 20일 수익률 +42.4% (≥0%) · 외인 매집 주체 약함",
            "statusReason": "Q1 미충족: 외인 보유율 2.7% (≥25%) · 20일 수익률 +42.4% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 52700.0,
                "vs52wHighPct": 76.04617604617604,
                "vs52wLowPct": 206.2173155142359,
                "dropFrom52wHighPct": 23.953823953823957,
                "ma20GapPct": 17.098100211087658,
                "rsi14": 55.618106657934256,
                "volumeRatio20d": 96.99109646582075,
                "rs20Pct": 42.432432432432435,
                "tradingValueRank": 37.0,
                "marketCapRank": 234.0,
                "marketCapTrillion": 1.7953000000000001,
                "per": 72.29,
                "pbr": 6.64,
                "cnsPer": 0.0,
                "foreignRate": 2.68,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "SK스퀘어",
            "code": "402340",
            "strictScore": 6.6,
            "signalScore": 6.6,
            "score": 6.6,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 4.7,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -343,411주 / 기관 634,067주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -343,411 / 전일 -326,334 · 기관 당일 +634,067 / 전일 +395,090 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "마지막 1시간 평균 체결강도 92.2% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 92.0% / 마지막 1시간 92.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +1,155,332주 · 양수 4/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 97.6% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,667,800 / 20MA 1,562,150 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 97% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -13.20% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -11.83% / KOSPI -7.89% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.03:1 · 평균 체결강도 93.3% (필요 ≥ 1.1:1)"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +309.2% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 -326,334/당일 -343,411 · 기관 전일 +395,090/당일 +634,067 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,525,000 / 60MA 1,141,667",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 65.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 5",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 107% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 45.7% (≥25%) · 20일 수익률 +12.0% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 7,648 / 5MA 8,247 (-7.3%) · VKOSPI 86.4 · KOSPI 단기 추세 이탈",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S4",
                "note": "당일 평균 92.0% / 마지막 1시간 92.2% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +1,155,332주 · 양수 4/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,667,800 / 20MA 1,562,150 · 5MA > 20MA",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -343,411주 / 기관 634,067주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -343,411 / 전일 -326,334 · 기관 당일 +634,067 / 전일 +395,090 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 92.2% (필요 ≥ 100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 97.6% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 97% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -13.20% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -11.83% / KOSPI -7.89% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.03:1 · 평균 체결강도 93.3% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +309.2% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1525000,
            "previousClose": 1757000,
            "dailyChange": -232000,
            "dailyChangePct": -13.2,
            "dailyDirection": "down",
            "entryPriceText": "1,525,000원 (당일 종가 기준)",
            "entryPrice": 1525000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 201.2365,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2554,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -343,411주 / 기관 634,067주 / 마지막 1시간 92.2% · 장후반 매수세 강화 · 마지막 30분 틱 0.03:1. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 92.0,
              "note": "토스 공개 체결강도 92.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-07-02T08:32:45Z",
              "intradayAbove100Ratio": 27.3,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 92.2,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 93.3,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0274,
              "last30BuyVolume": 6.0,
              "last30SellVolume": 219.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 86.41, ATR10 13.32%, 일간 표준편차 7.70%, 당일 레인지 8.94%.",
              "metrics": {
                "atrPct10": 13.32,
                "returnStd20": 7.7,
                "todayRangePct": 8.94,
                "vkospi": 86.41
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 1155332.0,
              "positiveDays": 4,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260701",
                    "net": -343411.0
                  },
                  {
                    "date": "20260630",
                    "net": -326334.0
                  },
                  {
                    "date": "20260629",
                    "net": -132668.0
                  },
                  {
                    "date": "20260626",
                    "net": -134520.0
                  },
                  {
                    "date": "20260625",
                    "net": -138918.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260701",
                    "net": 634067.0
                  },
                  {
                    "date": "20260630",
                    "net": 395090.0
                  },
                  {
                    "date": "20260629",
                    "net": 142031.0
                  },
                  {
                    "date": "20260626",
                    "net": -32743.0
                  },
                  {
                    "date": "20260625",
                    "net": 16887.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260701",
                    "net": 634067.0
                  },
                  {
                    "date": "20260630",
                    "net": 395090.0
                  },
                  {
                    "date": "20260629",
                    "net": 142031.0
                  },
                  {
                    "date": "20260626",
                    "net": -32743.0
                  },
                  {
                    "date": "20260625",
                    "net": 16887.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +1,155,332주 · 양수 4/5일 · 증가 3회"
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
                "targetYield": "+5.7%",
                "targetPrice": "1,612,000원",
                "historicalHitRate": 0.875,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "25% 익절",
                "targetYield": "+10.3%",
                "targetPrice": "1,682,000원",
                "historicalHitRate": 0.75,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+4.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+10.3%",
                "targetPrice": "1,682,000원",
                "historicalHitRate": 0.625,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.3%",
                "targetPrice": "1,682,000원",
                "historicalHitRate": 0.5,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,709,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "+12.1%",
                "targetPrice": "1,709,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "institution",
              "anchorDate": "20260701",
              "anchorOpen": 1709000,
              "anchorClose": 1757000,
              "anchorVolumeRatio20d": 1.43,
              "anchorStopPrice": 1709000,
              "fallbackStopPrice": 1471625,
              "effectiveHardStopPrice": 1709000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,709,000원와 기존 % 손절 1,471,625원 중 더 높은 1,709,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-D 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "기관 매집 시작 봉(-) 시가 1,709,000원를 기준으로 잡고, 기존 % 손절 1,471,625원보다 느슨해지지 않게 1,709,000원로 고정합니다."
            },
            "rr": "1 : 0.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1497550,
              "high": 1512800,
              "anchor": 1525000,
              "label": "1,497,550~1,512,800원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1612000,
                "secondaryResistancePrice": 1682000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+0.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "1,532,625원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,555,500원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,593,625원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,616,500원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,709,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+12.1%",
                    "targetPrice": "1,709,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 1612000,
                "secondaryResistancePrice": 1682000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+0.5% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "1,532,625원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+2.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "1,555,500원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.5%",
                    "targetPrice": "1,593,625원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "1,616,500원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,709,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+12.1%",
                    "targetPrice": "1,709,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 47건)",
                "nearestResistancePrice": 1612000,
                "secondaryResistancePrice": 1682000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+5.7%",
                    "targetPrice": "1,612,000원",
                    "historicalHitRate": 0.875,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+10.3%",
                    "targetPrice": "1,682,000원",
                    "historicalHitRate": 0.75,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+4.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+10.3%",
                    "targetPrice": "1,682,000원",
                    "historicalHitRate": 0.625,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.3%",
                    "targetPrice": "1,682,000원",
                    "historicalHitRate": 0.5,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,709,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+12.1%",
                    "targetPrice": "1,709,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.875,
                  "ev": 4.662,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 47건)",
              "sampleCount": 47,
              "ev": -0.4892
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.875,
              "ev": 4.662,
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
              "reason": "현재 혼합 전략 기준에서는 자동 진입 대상이 아닙니다."
            },
            "entryEligible": false,
            "entryWatch": true,
            "entryBlockers": [],
            "setupQuality": "setup_weak",
            "statusReasonShort": "",
            "statusReason": "",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1525000.0,
                "vs52wHighPct": 65.22668947818649,
                "vs52wLowPct": 1065.0114591291062,
                "dropFrom52wHighPct": 34.773310521813514,
                "ma20GapPct": -2.3781327017251863,
                "rsi14": 50.702776305128175,
                "volumeRatio20d": 107.37847039625747,
                "rs20Pct": 12.049963262307127,
                "tradingValueRank": 5.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 201.2365,
                "per": 12.95,
                "pbr": 5.57,
                "cnsPer": 5.12,
                "foreignRate": 45.66,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 309.1681647327995
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          }
        ],
        "reversal": [
          {
            "rank": 1,
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
                "note": "외인 193,888→-316,756 / 기관 -11,831→251,341 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 160.0% / 마지막 1시간 211.9% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 165,000 / 20MA 158,575 (104.1% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 42% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 186% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.18 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 165000, 전봉 종가 167000 미달"
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
                "note": "당일 거래대금 순위 26위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "✅",
                "note": "시총 58.5조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-06-26 유상증자결정(자회사의 주요경영사항)",
                "evalStatus": "not_met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-22~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +5.4% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -9.7% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 165,000 / 60MA 157,242",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -1.7% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +4.1% (≤+22%) · RSI14 58 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 193,888→-316,756 / 기관 -11,831→251,341 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 160.0% / 마지막 1시간 211.9% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 165,000 / 20MA 158,575 (104.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.18 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "P2",
                "note": "당일 레인지 상단 42% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 186% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 165000, 전봉 종가 167000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 165000,
            "previousClose": 158500,
            "dailyChange": 6500,
            "dailyChangePct": 4.1,
            "dailyDirection": "up",
            "entryPriceText": "165,000원 (당일 종가 기준)",
            "entryPrice": 165000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 58.5235,
            "marketCapRank": 11,
            "marketCapUniverseCount": 2554,
            "keyPoint": "20일 고점 대비 -9.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-06-26 유상증자결정(자회사의 주요경영사항)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 165000, 전봉 종가 167000",
              "latestOpen": 165000.0,
              "latestClose": 165000.0,
              "previousClose": 167000.0
            },
            "toss": {
              "avgStrength": 160.0,
              "note": "토스 공개 체결강도 160.0% / 최근 체결 36분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A105560/order",
              "asOf": "2026-07-02T08:32:35Z",
              "intradayAbove100Ratio": 75.0,
              "observedMinutes": 36,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 36분 프록시",
              "lastHourAvgStrength": 211.9,
              "lastHourObservedMinutes": 36,
              "last30AvgStrength": 214.3,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 5.7005,
              "last30BuyVolume": 1066.0,
              "last30SellVolume": 187.0
            },
            "orderbook": {
              "bidAskRatio": 1.1821,
              "bidTotal": 33721,
              "askTotal": 28526,
              "note": "Naver 호가잔량합계 매수 33,721 / 매도 28,526",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 86.41, ATR10 5.54%, 일간 표준편차 3.95%, 당일 레인지 9.53%.",
              "metrics": {
                "atrPct10": 5.54,
                "returnStd20": 3.95,
                "todayRangePct": 9.53,
                "vkospi": 86.41
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+0.5%",
                "targetPrice": "165,900원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+2.7%",
                "targetPrice": "169,500원",
                "historicalHitRate": 0.5667,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 160,875원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "160,875원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 158700,
              "fallbackStopPrice": 160875,
              "effectiveHardStopPrice": 160875,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 158,700원와 기존 % 손절 160,875원 중 더 높은 160,875원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 158,700원이며, 기존 % 손절 160,875원보다 느슨해지지 않게 160,875원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 162030,
              "high": 163680,
              "anchor": 165000,
              "label": "162,030~163,680원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 182700,
                "retrace33Price": 170841,
                "retrace50Price": 173850,
                "nearestResistancePrice": 165900,
                "secondaryResistancePrice": 169500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "165,900원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.7%",
                    "targetPrice": "169,500원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+10.7%",
                    "targetPrice": "182,700원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 160,875원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "160,875원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 182700,
                "retrace33Price": 170841,
                "retrace50Price": 173850,
                "nearestResistancePrice": 165900,
                "secondaryResistancePrice": 169500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "165,900원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.7%",
                    "targetPrice": "169,500원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 160,875원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "160,875원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 53건)",
                "recentHighPrice": 182700,
                "retrace33Price": 170841,
                "retrace50Price": 173850,
                "nearestResistancePrice": 165900,
                "secondaryResistancePrice": 169500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "165,900원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.7%",
                    "targetPrice": "169,500원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 160,875원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "160,875원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 53건)",
              "sampleCount": 53,
              "ev": 0.4252
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 180건)",
              "hitRate": 0.6667,
              "ev": 1.268,
              "sampleCount": 180
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
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F3 미충족: KIND 최근공시 2026-06-26 유상증자결정(자회사의 주요경영사항) · 외 2건",
            "statusReason": "F3 미충족: KIND 최근공시 2026-06-26 유상증자결정(자회사의 주요경영사항) / G1 미충족: 1개월 수익률 +5.4% (필요 ≥ +15%) / G4 미충족: 최근 5거래일 최저 -1.7% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 165000.0,
                "vs52wHighPct": 90.311986863711,
                "vs52wLowPct": 58.65384615384615,
                "dropFrom52wHighPct": 9.688013136289,
                "ma20GapPct": 4.051710547059751,
                "rsi14": 57.545152684248215,
                "volumeRatio20d": 141.29502643728858,
                "rs20Pct": 0.48721071863580995,
                "tradingValueRank": 26.0,
                "marketCapRank": 11.0,
                "marketCapTrillion": 58.5235,
                "per": 10.43,
                "pbr": 0.99,
                "cnsPer": 9.27,
                "foreignRate": 79.96,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 235.7243203041071
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "대원전선",
            "code": "006340",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 8.0,
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
                "note": "외인 -651,342→916,888 / 기관 22,595→26,294 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 83.2% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 11,990 / 20MA 10,725 (111.8% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 8% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 372% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.20 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 11990, 전봉 종가 11900 미달"
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
                "status": "⛔",
                "note": "시총 0.9조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-06-30까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-22~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
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
                "status": "✅",
                "note": "20일 고점 대비 -19.8% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 11,990 / 60MA 11,044",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -10.5% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-c",
                "status": "✅",
                "note": "도지형 안정화 캔들",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +11.8% (≤+22%) · RSI14 53 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -651,342→916,888 / 기관 22,595→26,294 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 11,990 / 20MA 10,725 (111.8% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 372% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 83.2% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 8% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.20 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 11990, 전봉 종가 11900 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 11990,
            "previousClose": 13400,
            "dailyChange": -1410,
            "dailyChangePct": -10.52,
            "dailyDirection": "down",
            "entryPriceText": "11,990원 (당일 종가 기준)",
            "entryPrice": 11990,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.9402,
            "marketCapRank": 310,
            "marketCapUniverseCount": 2554,
            "keyPoint": "20일 고점 대비 -19.8% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A006340/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 대원전선 (006340) 차트 화면을 엽니다.",
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
              "note": "KIND 최근공시 2026-06-30까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 11990, 전봉 종가 11900",
              "latestOpen": 11990.0,
              "latestClose": 11990.0,
              "previousClose": 11900.0
            },
            "toss": {
              "avgStrength": 83.2,
              "note": "토스 공개 체결강도 83.2% / 최근 체결 132분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A006340/order",
              "asOf": "2026-07-02T08:30:09Z",
              "intradayAbove100Ratio": 90.0,
              "observedMinutes": 132,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 132분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 0.1996,
              "bidTotal": 7571,
              "askTotal": 37932,
              "note": "Naver 호가잔량합계 매수 7,571 / 매도 37,932",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=006340"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 86.41, ATR10 17.60%, 일간 표준편차 9.20%, 당일 레인지 23.88%.",
              "metrics": {
                "atrPct10": 17.6,
                "returnStd20": 9.2,
                "todayRangePct": 23.88,
                "vkospi": 86.41
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "60% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "12,350원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "12,590원",
                "historicalHitRate": 0.5667,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 11,750원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "11,750원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 11750,
              "fallbackStopPrice": 11690,
              "effectiveHardStopPrice": 11750,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 11,750원와 기존 % 손절 11,690원 중 더 높은 11,750원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 11,750원이며, 기존 % 손절 11,690원보다 느슨해지지 않게 11,750원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 11774,
              "high": 11894,
              "anchor": 11990,
              "label": "11,774~11,894원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 14950,
                "retrace33Price": 12967,
                "retrace50Price": 13470,
                "nearestResistancePrice": 12800,
                "secondaryResistancePrice": 12950,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+6.8%",
                    "targetPrice": "12,800원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "12,950원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+24.7%",
                    "targetPrice": "14,950원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 11,750원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "11,750원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 14950,
                "retrace33Price": 12967,
                "retrace50Price": 13470,
                "nearestResistancePrice": 12800,
                "secondaryResistancePrice": 12950,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+6.8%",
                    "targetPrice": "12,800원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+8.0%",
                    "targetPrice": "12,950원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 11,750원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "11,750원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 53건)",
                "recentHighPrice": 14950,
                "retrace33Price": 12967,
                "retrace50Price": 13470,
                "nearestResistancePrice": 12800,
                "secondaryResistancePrice": 12950,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "12,350원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "12,590원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 11,750원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "11,750원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 53건)",
              "sampleCount": 53,
              "ev": 0.4252
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 180건)",
              "hitRate": 0.6667,
              "ev": 1.268,
              "sampleCount": 180
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
              "핵심 Gate 미충족: G1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.9조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 0.9조 (필요 ≥ 5조) / G1 미충족: 1개월 수익률 +7.9% (필요 ≥ +15%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 11990.0,
                "vs52wHighPct": 59.064039408866996,
                "vs52wLowPct": 333.6347197106691,
                "dropFrom52wHighPct": 40.935960591133004,
                "ma20GapPct": 11.794871794871794,
                "rsi14": 53.431431289207765,
                "volumeRatio20d": 387.0147238799379,
                "rs20Pct": 7.726864330637915,
                "tradingValueRank": 19.0,
                "marketCapRank": 310.0,
                "marketCapTrillion": 0.9402,
                "per": 75.41,
                "pbr": 7.22,
                "cnsPer": 0.0,
                "foreignRate": 4.22,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "한화에어로스페이스",
            "code": "012450",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 10.0,
            "effectiveScoreMax": 10.0,
            "gradeScore": 4.8,
            "grade": "C",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 3,789→-12,777 / 기관 -17,394→44,085 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 111.0% / 마지막 1시간 5.6% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 1,116,000 / 20MA 1,079,500 (103.4% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 레인지 상단 20% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 150% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.50 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 1116000, 전봉 종가 1136000 미달"
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
                "note": "시총 57.5조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-07-01까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-22~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "⛔",
                "note": "1개월 수익률 +4.3% (필요 ≥ +15%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -11.7% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "⛔",
                "note": "종가 1,116,000 / 60MA 1,261,217",
                "evalStatus": "not_met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.4% (필요 -3% 이하 급락 1회 이상)",
                "evalStatus": "met"
              },
              {
                "code": "G5-b",
                "status": "✅",
                "note": "긴 아래꼬리 (비율 10.00)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "20MA 이격 +3.4% (≤+22%) · RSI14 50 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 3,789→-12,777 / 기관 -17,394→44,085 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 1,116,000 / 20MA 1,079,500 (103.4% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 1.50 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 111.0% / 마지막 1시간 5.6% (필요 ≥90%·≥100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 20% (필요 ≥ 50%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 150% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 1116000, 전봉 종가 1136000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1116000,
            "previousClose": 1091000,
            "dailyChange": 25000,
            "dailyChangePct": 2.29,
            "dailyDirection": "up",
            "entryPriceText": "1,116,000원 (당일 종가 기준)",
            "entryPrice": 1116000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 57.5448,
            "marketCapRank": 12,
            "marketCapUniverseCount": 2554,
            "keyPoint": "20일 고점 대비 -11.7% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-07-01까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 1116000, 전봉 종가 1136000",
              "latestOpen": 1116000.0,
              "latestClose": 1116000.0,
              "previousClose": 1136000.0
            },
            "toss": {
              "avgStrength": 111.0,
              "note": "토스 공개 체결강도 111.0% / 최근 체결 32분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A012450/order",
              "asOf": "2026-07-02T08:32:44Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 32,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 32분 프록시",
              "lastHourAvgStrength": 5.6,
              "lastHourObservedMinutes": 32,
              "last30AvgStrength": 0.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.0,
              "last30BuyVolume": 0.0,
              "last30SellVolume": 409.0
            },
            "orderbook": {
              "bidAskRatio": 1.5042,
              "bidTotal": 4669,
              "askTotal": 3104,
              "note": "Naver 호가잔량합계 매수 4,669 / 매도 3,104",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=012450"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 86.41, ATR10 7.33%, 일간 표준편차 4.27%, 당일 레인지 9.26%.",
              "metrics": {
                "atrPct10": 7.33,
                "returnStd20": 4.27,
                "todayRangePct": 9.26,
                "vkospi": 86.41
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "60% 익절",
                "targetYield": "+0.6%",
                "targetPrice": "1,123,000원",
                "historicalHitRate": 0.6667,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "40% 익절 (잔량 전량)",
                "targetYield": "+2.6%",
                "targetPrice": "1,145,000원",
                "historicalHitRate": 0.5667,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,096,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "1,096,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 1096000,
              "fallbackStopPrice": 1088100,
              "effectiveHardStopPrice": 1096000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 1,096,000원와 기존 % 손절 1,088,100원 중 더 높은 1,096,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 1,096,000원이며, 기존 % 손절 1,088,100원보다 느슨해지지 않게 1,096,000원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 0.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1095912,
              "high": 1107072,
              "anchor": 1116000,
              "label": "1,095,912~1,107,072원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 1264000,
                "retrace33Price": 1164840,
                "retrace50Price": 1190000,
                "nearestResistancePrice": 1123000,
                "secondaryResistancePrice": 1145000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+0.6%",
                    "targetPrice": "1,123,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,145,000원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "15% 익절 (잔량 전량)",
                    "targetYield": "+13.3%",
                    "targetPrice": "1,264,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,096,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,096,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 1264000,
                "retrace33Price": 1164840,
                "retrace50Price": 1190000,
                "nearestResistancePrice": 1123000,
                "secondaryResistancePrice": 1145000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+0.6%",
                    "targetPrice": "1,123,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,145,000원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,096,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,096,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 53건)",
                "recentHighPrice": 1264000,
                "retrace33Price": 1164840,
                "retrace50Price": 1190000,
                "nearestResistancePrice": 1123000,
                "secondaryResistancePrice": 1145000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "60% 익절",
                    "targetYield": "+0.6%",
                    "targetPrice": "1,123,000원",
                    "historicalHitRate": 0.6667,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "40% 익절 (잔량 전량)",
                    "targetYield": "+2.6%",
                    "targetPrice": "1,145,000원",
                    "historicalHitRate": 0.5667,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,096,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "1,096,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 180건)",
                  "hitRate": 0.6667,
                  "ev": 1.268,
                  "sampleCount": 180
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 53건)",
              "sampleCount": 53,
              "ev": 0.4252
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 180건)",
              "hitRate": 0.6667,
              "ev": 1.268,
              "sampleCount": 180
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
              "핵심 Gate 미충족: G3",
              "매매금지",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 1개월 수익률 +4.3% (필요 ≥ +15%) · 외 1건",
            "statusReason": "G1 미충족: 1개월 수익률 +4.3% (필요 ≥ +15%) / G3 미충족: 종가 1,116,000 / 60MA 1,261,217",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 1116000.0,
                "vs52wHighPct": 65.14886164623468,
                "vs52wLowPct": 46.8421052631579,
                "dropFrom52wHighPct": 34.85113835376533,
                "ma20GapPct": 3.381194997684113,
                "rsi14": 49.510969200847384,
                "volumeRatio20d": 146.4526680649951,
                "rs20Pct": 4.49438202247191,
                "tradingValueRank": 23.0,
                "marketCapRank": 12.0,
                "marketCapTrillion": 57.5448,
                "per": 35.05,
                "pbr": 5.77,
                "cnsPer": 26.87,
                "foreignRate": 45.36,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -16.738660907127432
              },
              "evaluatedAt": "2026-07-02T17:33:44+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
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
  "analysisDate": "2026-07-02",
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
      "009150",
      "012450",
      "036930",
      "042660",
      "402340"
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
        "code": "012450",
        "name": "한화에어로스페이스",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 8.6,
          "signalScore": 8.6,
          "score": 8.6,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
          "gradeScore": 6.6,
          "grade": "B"
        },
        "after": {
          "strictScore": 9.9,
          "signalScore": 9.9,
          "score": 9.9,
          "scoreMax": 13.0,
          "effectiveScoreMax": 13.0,
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
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.5,
          "grade": "B"
        },
        "after": {
          "strictScore": 6.6,
          "signalScore": 6.6,
          "score": 6.6,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 4.7,
          "grade": "C"
        }
      },
      {
        "strategy": "breakout",
        "code": "042660",
        "name": "한화오션",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 3.3,
          "signalScore": 3.3,
          "score": 3.3,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 2.6,
          "grade": "C"
        },
        "after": {
          "strictScore": 4.2,
          "signalScore": 4.2,
          "score": 4.2,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.4,
          "grade": "C"
        }
      },
      {
        "strategy": "breakout",
        "code": "009150",
        "name": "삼성전기",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 3.1,
          "signalScore": 3.1,
          "score": 3.1,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 2.5,
          "grade": "C"
        },
        "after": {
          "strictScore": 4.0,
          "signalScore": 4.0,
          "score": 4.0,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.2,
          "grade": "C"
        }
      }
    ],
    "providerHealth": {
      "krx_pykrx_short_balance": {
        "ok": 5
      }
    },
    "sourcePointInTimeStatus": "confirmed"
  }
};
