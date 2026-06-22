window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-22"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-22T06:05:06+00:00",
  "variant": "stable",
  "payloadSourceMode": "live",
  "rebuildable": true,
  "inputArchiveVersion": "jongga_inputs.v1",
  "blacklist": [
    {
      "code": "032830",
      "name": "삼성생명",
      "reasons": [
        "투자 주의"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "240810",
      "name": "원익IPS",
      "reasons": [
        "공매도 과열"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
    {
      "code": "067310",
      "name": "하나마이크론",
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
    "status": "success",
    "counts": {
      "total": 18,
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
        "ok": 18
      },
      "naver_chart": {
        "ok": 18
      },
      "naver_integration_schedule": {
        "ok": 10
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 18
      },
      "toss_http_strength": {
        "ok": 18
      },
      "toss_ticks_strength_proxy": {
        "ok": 18
      },
      "toss_quotes_orderbook": {
        "ok": 18
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
        "ok": 15
      }
    },
    "fallbackUsage": [],
    "collectionLog": [
      {
        "step": "vkospi_quote",
        "label": "VKOSPI 수집",
        "status": "ok",
        "durationMs": 1590.7,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 500.2,
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
        "durationMs": 1408.9,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 143.0,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 50106.5,
        "count": 18
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 18727.0,
        "detail": "후보 15종목 중 15건 수집",
        "count": 15
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 6202.9,
        "detail": "성공 18 / 실패 0",
        "count": 18
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 9457.7,
        "detail": "direct-http · 체결강도 18 / 호가 18 / 틱프록시 18",
        "count": 18
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 54370.1,
        "detail": "pullback 3, breakout 3, accumulation 3, reversal 3",
        "count": 12
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 5617.4,
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
        "durationMs": 75641.5,
        "detail": "확정 4 · 미확인 0",
        "count": 12
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
            "value": "강세장 ✅ (펀더·지수 정당)"
          },
          {
            "item": "기술 레짐",
            "value": "박스권 ⚠️"
          },
          {
            "item": "KOSPI",
            "value": "9068.76 (+0.18%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 87.29"
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
            "value": "G-B 🔵 (+6.0점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 80% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "7097.11",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "8384.84",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 87.29",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 14 / 하락 6",
            "verdict": "시장 내부 체력 참고"
          },
          {
            "item": "시장 맥락",
            "value": "펀더 앵커 85 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
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
          "marketAnalyzeDate": "20260622",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 85 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 85.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 45.15,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1531원과 과열 이격이 겹쳤지만 펀더멘털 앵커 85점과 non-critical bubble(BI 45 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 9068.76,
          "kospiMa5": 8955.172,
          "vkospiValue": 87.29,
          "vkospiLabel": "VKOSPI",
          "riseJustifiedByMacro": true
        },
        "technicalRegimeLabel": "박스권 ⚠️",
        "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
        "regimeAdjustmentReason": "펀더 앵커 85 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향"
      },
      "gapScore": {
        "rows": [
          {
            "indicator": "NQ 선물 변화율",
            "actualValue": "+2.17%",
            "baseScore": "+2점",
            "weight": "×2.5",
            "formula": "+2 × 2.5 = +5.0점",
            "weightedScore": "+5.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.78",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "-1.8bp",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+23.27원",
            "baseScore": "-2점",
            "weight": "×1.5",
            "formula": "-2 × 1.5 = -3.0점",
            "weightedScore": "-3.0점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+8.89%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+6.0점",
        "grade": "G-B 🔵",
        "code": "G-B",
        "entryAdjustment": "✅ 100% 진입 / ✅ 80% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 유지",
        "swingAdjustment": "허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-06-23T03:59:00+00:00",
          "vix": "2026-06-22T20:15:00+00:00",
          "tnx": "2026-06-22T19:00:00+00:00",
          "krw": "2026-06-22T22:59:00+00:00",
          "sox": "2026-06-23T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "삼성생명",
            "code": "032830",
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
                "note": "외인 29,709주 / 기관 18,071주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 453,000 · 5MA·10MA·20MA 중 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.01 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -12.5% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 85% (≥100% 만점·80~100% 부분) · 부분 충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -78.2% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
                "note": "최근 20일 최대 거래량 급증 184% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 459,400 > 20MA 408,025 > 60MA 309,758 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 453,000 / 60MA 309,758",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 89.3 (필요 ≥ 50)",
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
                "note": "KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -8.85% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 89.3 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +11.0% (필요 ≤ +25%) · 60MA +46.2% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -12.5% (≥12%) · 거래량 85% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "마지막 30분 비율 0.68:1 / 마지막 30분 평균 39.5% / 마지막 1시간 39.5% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-06-19까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 29,709주 / 기관 18,071주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 453,000 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -12.5% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -78.2% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.01 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D3",
                "note": "거래량 85% (≥100% 만점·80~100% 부분) · 부분 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 453000,
            "previousClose": 497000,
            "dailyChange": -44000,
            "dailyChangePct": -8.85,
            "dailyDirection": "down",
            "entryPriceText": "453,000원 (당일 종가 기준)",
            "entryPrice": 453000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 90.6,
            "marketCapRank": 6,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 29,709주 / 기관 18,071주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 88.0,
              "note": "토스 공개 체결강도 88.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A032830/order",
              "asOf": "2026-06-22T06:02:48Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 39.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 39.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.6846,
              "last30BuyVolume": 660.0,
              "last30SellVolume": 964.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-06-19까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 341,584원 (24.60% 아래) · 강도 65점 · family 3개 · 수평 지지·스윙로우 군집",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 341584,
                    "distancePct": 24.6,
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
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 290250,
                    "distancePct": 35.93,
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
                    "lastSeenDaysAgo": 21,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 252928,
                    "distancePct": 44.17,
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
                    "lastSeenDaysAgo": 32,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 227784,
                    "distancePct": 49.72,
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
                    "lastSeenDaysAgo": 46,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 442667,
                    "distancePct": 2.28,
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
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 341584,
                  "distancePct": 24.6,
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
                  "lastSeenDaysAgo": 7,
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
                    "price": 209167,
                    "distancePct": 53.83,
                    "count": 2,
                    "lastSeenDaysAgo": 55,
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
                    "price": 215333,
                    "distancePct": 52.47,
                    "count": 2,
                    "lastSeenDaysAgo": 53,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 214000,
                    "bandHigh": 217000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 221318,
                    "distancePct": 51.14,
                    "count": 8,
                    "lastSeenDaysAgo": 48,
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
                    "price": 228286,
                    "distancePct": 49.61,
                    "count": 6,
                    "lastSeenDaysAgo": 46,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 226000,
                    "bandHigh": 231000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 233833,
                    "distancePct": 48.38,
                    "count": 2,
                    "lastSeenDaysAgo": 46,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 232000,
                    "bandHigh": 235000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 239500,
                    "distancePct": 47.13,
                    "count": 3,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 238500,
                    "bandHigh": 241500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 246900,
                    "distancePct": 45.5,
                    "count": 7,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 244000,
                    "bandHigh": 250000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 252865,
                    "distancePct": 44.18,
                    "count": 9,
                    "lastSeenDaysAgo": 32,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 251000,
                    "bandHigh": 256000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 258000,
                    "distancePct": 43.05,
                    "count": 2,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 258000,
                    "bandHigh": 258000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 289000,
                    "distancePct": 36.2,
                    "count": 3,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 286000,
                    "bandHigh": 291500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 298000,
                    "distancePct": 34.22,
                    "count": 8,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 293500,
                    "bandHigh": 302000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 309857,
                    "distancePct": 31.6,
                    "count": 6,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 306000,
                    "bandHigh": 313500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 330750,
                    "distancePct": 26.99,
                    "count": 2,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 330000,
                    "bandHigh": 331500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 342167,
                    "distancePct": 24.47,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 340000,
                    "bandHigh": 344500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 353167,
                    "distancePct": 22.04,
                    "count": 8,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 348000,
                    "bandHigh": 357500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 365833,
                    "distancePct": 19.24,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 364500,
                    "bandHigh": 368000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 375250,
                    "distancePct": 17.16,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 375000,
                    "bandHigh": 375500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 384625,
                    "distancePct": 15.09,
                    "count": 3,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 381500,
                    "bandHigh": 388500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 394250,
                    "distancePct": 12.97,
                    "count": 2,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 393000,
                    "bandHigh": 395500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 412875,
                    "distancePct": 8.86,
                    "count": 4,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 410000,
                    "bandHigh": 417000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 422833,
                    "distancePct": 6.66,
                    "count": 3,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 421500,
                    "bandHigh": 424000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 442667,
                    "distancePct": 2.28,
                    "count": 3,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 438000,
                    "bandHigh": 447000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 479250,
                    "distancePct": -5.79,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 478500,
                    "bandHigh": 480000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 291500,
                    "distancePct": 35.65,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 289500,
                    "bandHigh": 293500
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 341000,
                    "distancePct": 24.72,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 340000,
                    "bandHigh": 342000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 252990,
                    "distancePct": 44.15,
                    "count": 12,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 25,
                    "volume": 4677637,
                    "binIndex": 3,
                    "binLow": 246562,
                    "binHigh": 259417
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 304406,
                    "distancePct": 32.8,
                    "count": 5,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 25,
                    "volume": 2367319,
                    "binIndex": 7,
                    "binLow": 297979,
                    "binHigh": 310833
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 227281,
                    "distancePct": 49.83,
                    "count": 7,
                    "lastSeenDaysAgo": 48,
                    "valid": true,
                    "weight": 25,
                    "volume": 2228209,
                    "binIndex": 1,
                    "binLow": 220854,
                    "binHigh": 233708
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 184% (12일 전)",
                "burstCount": 0,
                "maxRatioPct": 183.9,
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
                  "summary": "마지막 30분 비율 0.68:1 / 마지막 30분 평균 39.5% / 마지막 1시간 39.5% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 87.29, ATR10 7.61%, 일간 표준편차 6.79%, 당일 레인지 7.85%.",
              "metrics": {
                "atrPct10": 7.61,
                "returnStd20": 6.79,
                "todayRangePct": 7.85,
                "vkospi": 87.29
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
              "ma10Price": 423150,
              "ma10PrevPrice": 415400,
              "ma20Price": 408025,
              "ma20PrevPrice": 403125,
              "ma10WarningPrice": null,
              "hardStopPrice": 439410,
              "fallbackStopPrice": 439410,
              "effectiveStopPrice": 439410,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 439,410원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 439,410원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "464,325원",
                "historicalHitRate": 0.125,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "471,120원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "480,180원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "489,240원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "498,300원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 439,410원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "439,410원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 449829,
              "high": 454359,
              "anchor": 453000,
              "label": "449,829~454,359원 (종가 ±, 분할매수)"
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "464,325원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "471,120원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "480,180원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "489,240원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "498,300원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 439,410원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "439,410원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "464,325원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "471,120원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "480,180원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "489,240원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "498,300원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 439,410원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "439,410원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "464,325원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "471,120원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "480,180원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "489,240원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "498,300원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 439,410원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "439,410원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
              "sampleCount": 19,
              "ev": -1.0945
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.125,
              "ev": -2.449,
              "sampleCount": 8
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
            "statusReasonShort": "G0 미충족: 최근 20일 최대 거래량 급증 184% (필요 ≥ 200%) · 외 3건",
            "statusReason": "G0 미충족: 최근 20일 최대 거래량 급증 184% (필요 ≥ 200%) / G5 미충족: KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열 / G7 미충족: 주봉 RSI 89.3 (필요 ≤ 80) · 과매수 과열 / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 453000.0,
                "vs52wHighPct": 87.45173745173746,
                "vs52wLowPct": 289.5098882201204,
                "dropFrom52wHighPct": 12.548262548262548,
                "ma20GapPct": 11.022608908767845,
                "rsi14": 61.28767293591677,
                "volumeRatio20d": 85.47059717136663,
                "rs20Pct": 27.605633802816904,
                "supportDistancePct": 24.6,
                "tradingValueRank": 37.0,
                "marketCapRank": 6.0,
                "marketCapTrillion": 90.6,
                "per": 31.55,
                "pbr": 1.0,
                "cnsPer": 31.81,
                "foreignRate": 23.23,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -78.15976245365006
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "원익IPS",
            "code": "240810",
            "strictScore": 8.1,
            "signalScore": 8.1,
            "score": 8.1,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 6.2,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 7,458주 / 기관 1,278주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 171,350 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 150,400 ≤ 종가 171,350)"
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
                "note": "52주 고가 대비 -11.6% (≥12% 만점·8~12% 부분) · 부분 충족"
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
                "note": "거래량 122% (≥100% 만점·80~100% 부분) · 충족"
              },
              {
                "code": "D4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "대차잔고 +42.3% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G5, G8, Q1, G12, G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 258% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 161,670 > 20MA 133,932 > 60MA 125,126 · 상승선 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 171,350 / 60MA 125,126",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 71.8 (필요 ≥ 50)",
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
                "note": "KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +9.84% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 71.8 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +27.9% (필요 ≤ +25%) · 60MA +36.9% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -11.6% (≥12%) · 거래량 122% (≥80%) · 수급추세 +2 (≥0) · 얕은 조정(고가권 추격)",
                "evalStatus": "not_met"
              },
              {
                "code": "G9",
                "status": "✅",
                "note": "복합 지지 강도 100점 · 현재가 아래 유효 family 4개",
                "evalStatus": "met"
              },
              {
                "code": "G10",
                "status": "✅",
                "note": "당일 거래량 / 앵커 거래량 60% · 시가 150,400 / 종가 171,350 / 전일 종가 156,000 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 171,350 / 앵커 중심값 124,100 / 복합 지지 116,200 · 앵커·지지 방어",
                "evalStatus": "met"
              },
              {
                "code": "G12",
                "status": "⛔",
                "note": "마지막 30분 비율 0.77:1 / 마지막 30분 평균 181.5% / 마지막 1시간 181.5% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "⛔",
                "note": "KIND 최근공시 2026-05-27 공매도 과열종목 지정(공매도 거래 금지 적용)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 7,458주 / 기관 1,278주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 171,350 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 150,400 ≤ 종가 171,350)",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 122% (≥100% 만점·80~100% 부분) · 충족",
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
                "code": "D1",
                "note": "52주 고가 대비 -11.6% (≥12% 만점·8~12% 부분) · 부분 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 +42.3% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 171350,
            "previousClose": 156000,
            "dailyChange": 15350,
            "dailyChangePct": 9.84,
            "dailyDirection": "up",
            "entryPriceText": "171,350원 (당일 종가 기준)",
            "entryPrice": 171350,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.4105,
            "marketCapRank": 82,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 7,458주 / 기관 1,278주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 123.0,
              "note": "토스 공개 체결강도 123.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-06-22T06:02:45Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 181.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 181.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.7691,
              "last30BuyVolume": 1332.0,
              "last30SellVolume": 1732.0
            },
            "eventFilter": {
              "blocked": true,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-05-27 공매도 과열종목 지정(공매도 거래 금지 적용)",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 116,200원 (32.19% 아래) · 강도 100점 · family 4개 · 급증봉 저점·수평 지지·스윙로우 군집·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 116200,
                    "distancePct": 32.19,
                    "families": [
                      "eventAnchors",
                      "horizontal",
                      "swingCluster",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지",
                      "스윙로우 군집",
                      "매물대 지지"
                    ],
                    "familyCount": 4,
                    "count": 23,
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 100,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 123900,
                    "distancePct": 27.69,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 14,
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 118950,
                    "distancePct": 30.58,
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
                    "lastSeenDaysAgo": 9,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 112114,
                    "distancePct": 34.57,
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
                    "lastSeenDaysAgo": 11,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 107868,
                    "distancePct": 37.05,
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
                    "lastSeenDaysAgo": 9,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 116200,
                  "distancePct": 32.19,
                  "families": [
                    "eventAnchors",
                    "horizontal",
                    "swingCluster",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "급증봉 저점",
                    "수평 지지",
                    "스윙로우 군집",
                    "매물대 지지"
                  ],
                  "familyCount": 4,
                  "count": 23,
                  "lastSeenDaysAgo": 7,
                  "strengthPoints": 100,
                  "consensusBonus": 10,
                  "valid": true,
                  "role": "primary"
                },
                "strengthScore": 100,
                "strengthLabel": "strong",
                "warningLevel": "clear",
                "warningReason": "급증봉 저점·수평 지지·스윙로우 군집·매물대 지지 합의가 겹친 주지지선이 확인됩니다.",
                "activeFamilyCount": 4,
                "barCount": 60
              },
              "families": {
                "horizontal": [
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 102000,
                    "distancePct": 40.47,
                    "count": 2,
                    "lastSeenDaysAgo": 14,
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
                    "distancePct": 39.09,
                    "count": 2,
                    "lastSeenDaysAgo": 10,
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
                    "distancePct": 36.83,
                    "count": 9,
                    "lastSeenDaysAgo": 9,
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
                    "distancePct": 34.5,
                    "count": 12,
                    "lastSeenDaysAgo": 11,
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
                    "price": 115242,
                    "distancePct": 32.74,
                    "count": 11,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 114100,
                    "bandHigh": 116700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 118256,
                    "distancePct": 30.99,
                    "count": 15,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 117000,
                    "bandHigh": 119600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 121325,
                    "distancePct": 29.19,
                    "count": 19,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 120400,
                    "bandHigh": 122600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 124520,
                    "distancePct": 27.33,
                    "count": 4,
                    "lastSeenDaysAgo": 20,
                    "valid": true,
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
                    "distancePct": 25.37,
                    "count": 5,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
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
                    "distancePct": 22.95,
                    "count": 5,
                    "lastSeenDaysAgo": 11,
                    "valid": true,
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
                    "price": 141300,
                    "distancePct": 17.54,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 141000,
                    "bandHigh": 141600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 149767,
                    "distancePct": 12.6,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 148800,
                    "bandHigh": 150400
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 155700,
                    "distancePct": 9.13,
                    "count": 3,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 154700,
                    "bandHigh": 156100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 161633,
                    "distancePct": 5.67,
                    "count": 2,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 160000,
                    "bandHigh": 163200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 170125,
                    "distancePct": 0.71,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 168900,
                    "bandHigh": 171350
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 107500,
                    "distancePct": 37.26,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
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
                    "distancePct": 34.64,
                    "count": 2,
                    "lastSeenDaysAgo": 37,
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
                    "price": 117450,
                    "distancePct": 31.46,
                    "count": 2,
                    "lastSeenDaysAgo": 33,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 117000,
                    "bandHigh": 117900
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 119644,
                    "distancePct": 30.18,
                    "count": 13,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 25,
                    "volume": 7746673,
                    "binIndex": 6,
                    "binLow": 117825,
                    "binHigh": 121462
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 116006,
                    "distancePct": 32.3,
                    "count": 9,
                    "lastSeenDaysAgo": 9,
                    "valid": true,
                    "weight": 25,
                    "volume": 7152925,
                    "binIndex": 5,
                    "binLow": 114188,
                    "binHigh": 117825
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 123281,
                    "distancePct": 28.05,
                    "count": 10,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 25,
                    "volume": 6894001,
                    "binIndex": 7,
                    "binLow": 121462,
                    "binHigh": 125100
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 116100,
                    "distancePct": 32.24,
                    "count": 1,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 371.7,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 150100,
                    "distancePct": 12.4,
                    "count": 1,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 379.9,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 258% (6일 전) · 200%+ 급증 3회",
                "burstCount": 3,
                "maxRatioPct": 258.5,
                "latestBurstDaysAgo": 6
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
                "daysAgo": 11
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 60% · 시가 150,400 / 종가 171,350 / 전일 종가 156,000 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 171,350 / 앵커 중심값 124,100 / 복합 지지 116,200 · 앵커·지지 방어"
                },
                "intradayClose": {
                  "status": "⛔",
                  "summary": "마지막 30분 비율 0.77:1 / 마지막 30분 평균 181.5% / 마지막 1시간 181.5% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 87.29, ATR10 14.42%, 일간 표준편차 12.55%, 당일 레인지 16.47%.",
              "metrics": {
                "atrPct10": 14.42,
                "returnStd20": 12.55,
                "todayRangePct": 16.47,
                "vkospi": 87.29
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
              "anchorDate": "20260605",
              "anchorOpen": 115500,
              "anchorClose": 132700,
              "anchorHigh": 138300,
              "anchorLow": 113000,
              "anchorBodyMid": 124100,
              "anchorVolumeRatio": 4.07,
              "anchorStopMode": "open",
              "anchorStopPrice": 115500,
              "ma10Price": 154295,
              "ma10PrevPrice": 147650,
              "ma20Price": 133932,
              "ma20PrevPrice": 131630,
              "ma10WarningPrice": null,
              "hardStopPrice": 133932,
              "fallbackStopPrice": 166210,
              "effectiveStopPrice": 166210,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 시가 115,500원, 20일선 133,932원) = 133,932원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 166,210원) = 166,210원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 시가 115,500원, 20일선 133,932원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 166,210원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "175,634원",
                "historicalHitRate": 0.125,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "178,204원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "181,631원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "185,058원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "188,485원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 166,210원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "166,210원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 170151,
              "high": 171864,
              "anchor": 171350,
              "label": "170,151~171,864원 (종가 ±, 분할매수)"
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "175,634원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "178,204원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "181,631원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "185,058원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "188,485원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 166,210원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "166,210원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
                "nearestResistanceType": "none",
                "nearestResistancePrice": null,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "175,634원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "178,204원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "181,631원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "185,058원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "188,485원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 166,210원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "166,210원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
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
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "175,634원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "178,204원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "181,631원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "185,058원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "188,485원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 166,210원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "166,210원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
              "sampleCount": 19,
              "ev": -1.0945
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.125,
              "ev": -2.449,
              "sampleCount": 8
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
              "핵심 Gate 미충족: G8",
              "핵심 Gate 미충족: Q1",
              "핵심 Gate 미충족: G12",
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G5, G8, Q1, G12, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G5 미충족: KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열 · 외 4건",
            "statusReason": "G5 미충족: KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열 / G8 미충족: 이격 20MA +27.9% (필요 ≤ +25%) · 60MA +36.9% (필요 ≤ +60%) · 과이격(지지선 눌림 아님) / Q1 미충족: 52주 고가 대비 -11.6% (≥12%) · 거래량 122% (≥80%) · 수급추세 +2 (≥0) · 얕은 조정(고가권 추격) / 외 2건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 171350.0,
                "vs52wHighPct": 88.41589267285862,
                "vs52wLowPct": 590.9274193548387,
                "dropFrom52wHighPct": 11.584107327141382,
                "ma20GapPct": 27.937580497638738,
                "rsi14": 61.82910017060841,
                "volumeRatio20d": 122.04592821518337,
                "rs20Pct": 36.75179569034317,
                "supportDistancePct": 32.19,
                "tradingValueRank": 29.0,
                "marketCapRank": 82.0,
                "marketCapTrillion": 8.4105,
                "per": 75.92,
                "pbr": 8.49,
                "cnsPer": 48.94,
                "foreignRate": 17.32,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 42.32183576375204
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "삼성SDI",
            "code": "006400",
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
                "note": "외인 81,427주 / 기관 12,364주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 533,000 · 5MA·10MA·20MA 중 10MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.10 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -35.0% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 54% (≥100% 만점·80~100% 부분) · 미충족"
              },
              {
                "code": "D4",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "대차잔고 -47.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2, G4, G5, Q1, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 284% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 541,800 > 20MA 576,300 > 60MA 563,533 · 상승선 60MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 533,000 / 60MA 563,533",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 55.8 (필요 ≥ 50)",
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
                "status": "⛔",
                "note": "KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -3.96% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 55.8 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA -7.5% (필요 ≤ +25%) · 60MA -5.4% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "52주 고가 대비 -35.0% (≥12%) · 거래량 54% (≥80%) · 수급추세 +2 (≥0) · 반등 거래량 부족",
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
                "note": "마지막 30분 비율 0.87:1 / 마지막 30분 평균 58.0% / 마지막 1시간 58.0% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-06-19까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 81,427주 / 기관 12,364주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 533,000 · 5MA·10MA·20MA 중 10MA 위",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -35.0% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D4",
                "note": "대차잔고 -47.1% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.10 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D3",
                "note": "거래량 54% (≥100% 만점·80~100% 부분) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 533000,
            "previousClose": 555000,
            "dailyChange": -22000,
            "dailyChangePct": -3.96,
            "dailyDirection": "down",
            "entryPriceText": "533,000원 (당일 종가 기준)",
            "entryPrice": 533000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 42.9521,
            "marketCapRank": 18,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 81,427주 / 기관 12,364주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 65.0,
              "note": "토스 공개 체결강도 65.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A006400/order",
              "asOf": "2026-06-22T06:02:46Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 58.0,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 58.0,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.8744,
              "last30BuyVolume": 564.0,
              "last30SellVolume": 645.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-06-19까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 467,307원 (12.33% 아래) · 강도 65점 · family 2개 · 수평 지지·스윙로우 군집",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 467307,
                    "distancePct": 12.33,
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
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 533833,
                    "distancePct": -0.16,
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
                    "price": 516500,
                    "distancePct": 3.1,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 5,
                    "lastSeenDaysAgo": 2,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 499375,
                    "distancePct": 6.31,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 479800,
                    "distancePct": 9.98,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 5,
                    "lastSeenDaysAgo": 8,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 467307,
                  "distancePct": 12.33,
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
                  "lastSeenDaysAgo": 7,
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
                    "price": 389750,
                    "distancePct": 26.88,
                    "count": 2,
                    "lastSeenDaysAgo": 56,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 388500,
                    "bandHigh": 391000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 402917,
                    "distancePct": 24.41,
                    "count": 4,
                    "lastSeenDaysAgo": 55,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 396500,
                    "bandHigh": 408000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 412750,
                    "distancePct": 22.56,
                    "count": 2,
                    "lastSeenDaysAgo": 54,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 412500,
                    "bandHigh": 413000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 434200,
                    "distancePct": 18.54,
                    "count": 4,
                    "lastSeenDaysAgo": 51,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 430000,
                    "bandHigh": 438500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 444000,
                    "distancePct": 16.7,
                    "count": 2,
                    "lastSeenDaysAgo": 50,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 443000,
                    "bandHigh": 445000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 454833,
                    "distancePct": 14.67,
                    "count": 3,
                    "lastSeenDaysAgo": 49,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 453500,
                    "bandHigh": 456500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 469864,
                    "distancePct": 11.85,
                    "count": 9,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 463000,
                    "bandHigh": 473000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 479800,
                    "distancePct": 9.98,
                    "count": 5,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 477500,
                    "bandHigh": 482000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 499375,
                    "distancePct": 6.31,
                    "count": 3,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 496500,
                    "bandHigh": 503000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 516500,
                    "distancePct": 3.1,
                    "count": 5,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 509000,
                    "bandHigh": 522000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 533833,
                    "distancePct": -0.16,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 527000,
                    "bandHigh": 539000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 550556,
                    "distancePct": -3.29,
                    "count": 7,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 542000,
                    "bandHigh": 557000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 568250,
                    "distancePct": -6.61,
                    "count": 4,
                    "lastSeenDaysAgo": 11,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 565000,
                    "bandHigh": 570000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 583667,
                    "distancePct": -9.51,
                    "count": 3,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
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
                    "price": 601400,
                    "distancePct": -12.83,
                    "count": 4,
                    "lastSeenDaysAgo": 12,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 595000,
                    "bandHigh": 607000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 615857,
                    "distancePct": -15.55,
                    "count": 7,
                    "lastSeenDaysAgo": 20,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 613000,
                    "bandHigh": 623000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 631200,
                    "distancePct": -18.42,
                    "count": 9,
                    "lastSeenDaysAgo": 17,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 627000,
                    "bandHigh": 636000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 646800,
                    "distancePct": -21.35,
                    "count": 9,
                    "lastSeenDaysAgo": 14,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 641000,
                    "bandHigh": 652000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 658000,
                    "distancePct": -23.45,
                    "count": 2,
                    "lastSeenDaysAgo": 15,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 657000,
                    "bandHigh": 659000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 679556,
                    "distancePct": -27.5,
                    "count": 8,
                    "lastSeenDaysAgo": 15,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 671000,
                    "bandHigh": 688000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 696333,
                    "distancePct": -30.64,
                    "count": 4,
                    "lastSeenDaysAgo": 30,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 692000,
                    "bandHigh": 705000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 464750,
                    "distancePct": 12.8,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 463000,
                    "bandHigh": 466500
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 643250,
                    "distancePct": -20.68,
                    "count": 7,
                    "lastSeenDaysAgo": 17,
                    "valid": false,
                    "weight": 25,
                    "volume": 5986990,
                    "binIndex": 18,
                    "binLow": 636000,
                    "binHigh": 650500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 672250,
                    "distancePct": -26.13,
                    "count": 3,
                    "lastSeenDaysAgo": 16,
                    "valid": false,
                    "weight": 25,
                    "volume": 3890767,
                    "binIndex": 20,
                    "binLow": 665000,
                    "binHigh": 679500
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 628750,
                    "distancePct": -17.96,
                    "count": 4,
                    "lastSeenDaysAgo": 13,
                    "valid": false,
                    "weight": 25,
                    "volume": 3608945,
                    "binIndex": 17,
                    "binLow": 621500,
                    "binHigh": 636000
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 284% (15일 전) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 284.0,
                "latestBurstDaysAgo": 15
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
                  "summary": "마지막 30분 비율 0.87:1 / 마지막 30분 평균 58.0% / 마지막 1시간 58.0% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 87.29, ATR10 7.30%, 일간 표준편차 5.06%, 당일 레인지 7.21%.",
              "metrics": {
                "atrPct10": 7.3,
                "returnStd20": 5.06,
                "todayRangePct": 7.21,
                "vkospi": 87.29
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
              "ma10Price": 531100,
              "ma10PrevPrice": 528100,
              "ma20Price": 576300,
              "ma20PrevPrice": 580450,
              "ma10WarningPrice": null,
              "hardStopPrice": 517010,
              "fallbackStopPrice": 517010,
              "effectiveStopPrice": 517010,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 517,010원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 517,010원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "5일선 저항 도달",
                "quantity": "30% 익절",
                "targetYield": "+1.7%",
                "targetPrice": "541,800원",
                "historicalHitRate": 0.125,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "554,320원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "564,980원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "575,640원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "586,300원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 517,010원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "517,010원"
              }
            ],
            "rr": "1 : 1.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 529269,
              "high": 534599,
              "anchor": 533000,
              "label": "529,269~534,599원 (종가 ±, 분할매수)"
            },
            "pullbackTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 541800,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "546,325원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "554,320원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "564,980원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "575,640원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "586,300원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 517,010원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "517,010원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 541800,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "541,800원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "554,320원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "564,980원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "575,640원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "586,300원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 517,010원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "517,010원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "가장 가까운 5일선 저항을 앞단 목표가에 반영하고 다음 목표는 기존값을 유지합니다.",
                "nearestResistanceType": "ma5",
                "nearestResistancePrice": 541800,
                "secondaryResistanceType": "none",
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "5일선 저항 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "541,800원",
                    "historicalHitRate": 0.125,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "554,320원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "564,980원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "575,640원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "586,300원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 517,010원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "517,010원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 8건)",
                  "hitRate": 0.125,
                  "ev": -2.449,
                  "sampleCount": 8
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 19건)",
              "sampleCount": 19,
              "ev": -1.0945
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 8건)",
              "hitRate": 0.125,
              "ev": -2.449,
              "sampleCount": 8
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
              "핵심 Gate 미충족: G4",
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "핵심 Gate 미충족: Q1",
              "핵심 Gate 미충족: G12",
              "매매금지(핵심 Gate 미충족: G1, G2, G4, G5, Q1, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 541,800 > 20MA 576,300 > 60MA 563,533 · 상승선 60MA · 정배열 미충족 · 외 5건",
            "statusReason": "G1 미충족: 5MA 541,800 > 20MA 576,300 > 60MA 563,533 · 상승선 60MA · 정배열 미충족 / G2 미충족: 종가 533,000 / 60MA 563,533 / G4 미충족: MACD 히스토그램 조건 미충족 / 외 3건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 533000.0,
                "vs52wHighPct": 65.0,
                "vs52wLowPct": 216.69637551990496,
                "dropFrom52wHighPct": 35.0,
                "ma20GapPct": -7.513447857018914,
                "rsi14": 43.81100333485561,
                "volumeRatio20d": 53.864896207420735,
                "rs20Pct": -13.474025974025974,
                "supportDistancePct": 12.33,
                "tradingValueRank": 39.0,
                "marketCapRank": 18.0,
                "marketCapTrillion": 42.9521,
                "per": 0.0,
                "pbr": 1.86,
                "cnsPer": 122.14,
                "foreignRate": 26.7,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": -47.10270464722199
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
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
            "name": "SK하이닉스",
            "code": "000660",
            "strictScore": 5.0,
            "signalScore": 5.0,
            "score": 5.0,
            "scoreMax": 12.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 4.0,
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
                "note": "외인 -317,848주 / 기관 259,188주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 107.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 98.3% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 76% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 98.3% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 77% / 윗꼬리·몸통 0.30 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 8.05 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +352.8% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
                "note": "5일 초과 +20.4% / 20일 초과 +33.2%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 98.3% (필요 ≥ 90%)",
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
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 76% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 77% / 윗꼬리·몸통 0.30 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +4.74% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 2,895,000 / 5MA 2,649,400 (전일 5MA 2,528,000) · 5MA 위·우상향",
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
                "code": "P1",
                "note": "20일 고점 대비 98.3% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.3% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 8.05 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +352.8% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -317,848주 / 기관 259,188주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "당일 평균 107.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 76% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 77% / 윗꼬리·몸통 0.30 · 강마감 기준 충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 2895000,
            "previousClose": 2764000,
            "dailyChange": 131000,
            "dailyChangePct": 4.74,
            "dailyDirection": "up",
            "entryPriceText": "2,895,000원 (당일 종가 기준)",
            "entryPrice": 2895000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2063.2733,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2558,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -317,848주 / 기관 259,188주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 107.0,
              "note": "토스 공개 체결강도 107.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-06-22T06:02:42Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 3.598,
              "last30BuyVolume": 1065.0,
              "last30SellVolume": 296.0
            },
            "orderbook": {
              "bidAskRatio": 8.0517,
              "bidTotal": 11836,
              "askTotal": 1470,
              "note": "Naver 호가잔량합계 매수 11,836 / 매도 1,470",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=000660"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 87.29, ATR10 8.70%, 일간 표준편차 5.85%, 당일 레인지 7.85%.",
              "metrics": {
                "atrPct10": 8.7,
                "returnStd20": 5.85,
                "todayRangePct": 7.85,
                "vkospi": 87.29
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
              "referencePrice": 2891000,
              "referenceBandLow": 2891000,
              "referenceBandHigh": 2891000,
              "entryDayOpenPrice": 2728000,
              "fallbackStopPrice": 2750250,
              "effectiveHardStopPrice": 2891000,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 2,891,000원와 기존 % 손절 2,750,250원 중 더 높은 2,891,000원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 2,891,000원이며, 기존 % 손절 2,750,250원보다 느슨해지지 않게 2,891,000원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+1.7%",
                "targetPrice": "2,945,000원",
                "historicalHitRate": 0.6364,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "3,097,650원",
                "historicalHitRate": 0.3636,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "3,213,450원",
                "historicalHitRate": 0.0909,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "3,329,250원",
                "historicalHitRate": 0.0909,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "3,474,000원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 2,891,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.1%",
                "targetPrice": "2,891,000원"
              }
            ],
            "rr": "1 : 122.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 2874735,
              "high": 2903685,
              "anchor": 2895000,
              "label": "2,874,735~2,903,685원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 2945000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "3,010,800원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "3,097,650원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "3,213,450원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "3,329,250원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "3,474,000원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,891,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "2,891,000원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 2945000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "2,945,000원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "3,097,650원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "3,213,450원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "3,329,250원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "3,474,000원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,891,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "2,891,000원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 22건)",
                "nearestResistancePrice": 2945000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+1.7%",
                    "targetPrice": "2,945,000원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "3,097,650원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "3,213,450원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "3,329,250원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "3,474,000원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,891,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.1%",
                    "targetPrice": "2,891,000원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 22건)",
              "sampleCount": 22,
              "ev": -0.5594
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 11건)",
              "hitRate": 0.3636,
              "ev": 2.767,
              "sampleCount": 11
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
              "핵심 Gate 미충족: G4",
              "매매금지(핵심 Gate 미충족: G4)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 76% (필요 ≥ 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 76% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 2895000.0,
                "vs52wHighPct": 98.30220713073004,
                "vs52wLowPct": 1086.4754098360656,
                "dropFrom52wHighPct": 1.697792869269949,
                "ma20GapPct": 26.119061621904198,
                "rsi14": 75.84369369451235,
                "volumeRatio20d": 75.8936542447173,
                "rs20Pct": 49.22680412371135,
                "tradingValueRank": 1.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 2063.2733,
                "per": 27.97,
                "pbr": 12.17,
                "cnsPer": 9.49,
                "foreignRate": 51.25,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 352.77777777777777
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "하나마이크론",
            "code": "067310",
            "strictScore": 3.8,
            "signalScore": 3.8,
            "score": 3.8,
            "scoreMax": 12.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 3.3,
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 120,642주 / 기관 -252,444주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 121.9% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 98.1% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 286% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 98.1% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 85% / 윗꼬리·몸통 0.14 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.27 (필요 ≥ 1.2)"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G6)",
            "strategy": "breakout",
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "5일 초과 +3.7% / 20일 초과 -13.5%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 95.6% (필요 ≥ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 28",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 286% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 85% / 윗꼬리·몸통 0.14 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "⛔",
                "note": "당일 등락 +14.08% (필요 ≤ +12%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 55,900 / 5MA 51,460 (전일 5MA 50,460) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 121.9% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 98.1% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 98.1% (필요 ≥ 95%)",
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
                "code": "S1",
                "note": "외인 120,642주 / 기관 -252,444주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 286% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 85% / 윗꼬리·몸통 0.14 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.27 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 55900,
            "previousClose": 49000,
            "dailyChange": 6900,
            "dailyChangePct": 14.08,
            "dailyDirection": "up",
            "entryPriceText": "55,900원 (당일 종가 기준)",
            "entryPrice": 55900,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.7161,
            "marketCapRank": 146,
            "marketCapUniverseCount": 2558,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 120,642주 / 기관 -252,444주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 121.9,
              "note": "토스 공개 체결강도 121.9% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A067310/order",
              "asOf": "2026-06-22T06:02:45Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 3.4053,
              "last30BuyVolume": 2840.0,
              "last30SellVolume": 834.0
            },
            "orderbook": {
              "bidAskRatio": 0.2671,
              "bidTotal": 18917,
              "askTotal": 70825,
              "note": "Naver 호가잔량합계 매수 18,917 / 매도 70,825",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=067310"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 87.29, ATR10 11.47%, 일간 표준편차 7.45%, 당일 레인지 19.49%.",
              "metrics": {
                "atrPct10": 11.47,
                "returnStd20": 7.45,
                "todayRangePct": 19.49,
                "vkospi": 87.29
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
              "referencePrice": 55500,
              "referenceBandLow": 55500,
              "referenceBandHigh": 55500,
              "entryDayOpenPrice": 47800,
              "fallbackStopPrice": 53105,
              "effectiveHardStopPrice": 55500,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 55,500원와 기존 % 손절 53,105원 중 더 높은 55,500원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 55,500원이며, 기존 % 손절 53,105원보다 느슨해지지 않게 55,500원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "57,000원",
                "historicalHitRate": 0.6364,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+4.7%",
                "targetPrice": "58,500원",
                "historicalHitRate": 0.3636,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "62,049원",
                "historicalHitRate": 0.0909,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "64,285원",
                "historicalHitRate": 0.0909,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "67,080원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 55,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.7%",
                "targetPrice": "55,500원"
              }
            ],
            "rr": "1 : 17.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 55509,
              "high": 56068,
              "anchor": 55900,
              "label": "55,509~56,068원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 57000,
                "secondaryResistancePrice": 58500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "58,136원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "59,813원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "62,049원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "64,285원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "67,080원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 55,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.7%",
                    "targetPrice": "55,500원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 57000,
                "secondaryResistancePrice": 58500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "57,000원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "58,500원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "62,049원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "64,285원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "67,080원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 55,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.7%",
                    "targetPrice": "55,500원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 22건)",
                "nearestResistancePrice": 57000,
                "secondaryResistancePrice": 58500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "57,000원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "58,500원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "62,049원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "64,285원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "67,080원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 55,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.7%",
                    "targetPrice": "55,500원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 22건)",
              "sampleCount": 22,
              "ev": -0.5594
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 11건)",
              "hitRate": 0.3636,
              "ev": 2.767,
              "sampleCount": 11
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
              "핵심 Gate 미충족: G6",
              "매매금지(핵심 Gate 미충족: G6)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G6 미충족: 당일 등락 +14.08% (필요 ≤ +12%)",
            "statusReason": "G6 미충족: 당일 등락 +14.08% (필요 ≤ +12%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 55900.0,
                "vs52wHighPct": 95.55555555555556,
                "vs52wLowPct": 437.5,
                "dropFrom52wHighPct": 4.444444444444445,
                "ma20GapPct": 20.047245785461186,
                "rsi14": 63.857079277454915,
                "volumeRatio20d": 286.40318879494464,
                "rs20Pct": 2.5688073394495414,
                "tradingValueRank": 28.0,
                "marketCapRank": 146.0,
                "marketCapTrillion": 3.7161,
                "per": 36.13,
                "pbr": 7.88,
                "cnsPer": 22.96,
                "foreignRate": 21.61,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
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
                "note": "외인 7,458주 / 기관 1,278주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 123.0% / 100% 유지 50.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "20일 고점 대비 93.5% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 122% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 97.3% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 82% / 윗꼬리·몸통 0.23 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.71 (필요 ≥ 1.2)"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +42.3% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
                "note": "5일 초과 -7.9% / 20일 초과 +20.7%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "52주 고가 대비 88.4% (필요 ≥ 90%)",
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
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 122% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 82% / 윗꼬리·몸통 0.23 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +9.84% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⚠️",
                "note": "종가 171,350 / 5MA 161,670 (전일 5MA 162,300) · 5MA 조건 미충족",
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
                "note": "외인 7,458주 / 기관 1,278주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 97.3% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +42.3% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 123.0% / 100% 유지 50.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 93.5% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 122% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 82% / 윗꼬리·몸통 0.23 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.71 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 171350,
            "previousClose": 156000,
            "dailyChange": 15350,
            "dailyChangePct": 9.84,
            "dailyDirection": "up",
            "entryPriceText": "171,350원 (당일 종가 기준)",
            "entryPrice": 171350,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.4105,
            "marketCapRank": 82,
            "marketCapUniverseCount": 2558,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 7,458주 / 기관 1,278주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 123.0,
              "note": "토스 공개 체결강도 123.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-06-22T06:02:45Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 181.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 181.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.7691,
              "last30BuyVolume": 1332.0,
              "last30SellVolume": 1732.0
            },
            "orderbook": {
              "bidAskRatio": 0.7062,
              "bidTotal": 2543,
              "askTotal": 3601,
              "note": "Naver 호가잔량합계 매수 2,543 / 매도 3,601",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=240810"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 87.29, ATR10 14.42%, 일간 표준편차 12.55%, 당일 레인지 16.47%.",
              "metrics": {
                "atrPct10": 14.42,
                "returnStd20": 12.55,
                "todayRangePct": 16.47,
                "vkospi": 87.29
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
              "referencePrice": 170800,
              "referenceBandLow": 170800,
              "referenceBandHigh": 170800,
              "entryDayOpenPrice": 150400,
              "fallbackStopPrice": 162782,
              "effectiveHardStopPrice": 170800,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 170,800원와 기존 % 손절 162,782원 중 더 높은 170,800원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 170,800원이며, 기존 % 손절 162,782원보다 느슨해지지 않게 170,800원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.8%",
                "targetPrice": "176,100원",
                "historicalHitRate": 0.6364,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+4.9%",
                "targetPrice": "179,800원",
                "historicalHitRate": 0.3636,
                "recommended": true
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "190,199원",
                "historicalHitRate": 0.0909,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "197,052원",
                "historicalHitRate": 0.0909,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "205,620원",
                "historicalHitRate": 0.0,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 170,800원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.3%",
                "targetPrice": "170,800원"
              }
            ],
            "rr": "1 : 40.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 170151,
              "high": 171864,
              "anchor": 171350,
              "label": "170,151~171,864원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "178,204원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "183,344원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "190,199원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "197,052원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "205,620원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 170,800원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "170,800원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "176,100원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.9%",
                    "targetPrice": "179,800원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "190,199원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "197,052원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "205,620원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 170,800원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "170,800원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 22건)",
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "176,100원",
                    "historicalHitRate": 0.6364,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.9%",
                    "targetPrice": "179,800원",
                    "historicalHitRate": 0.3636,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "190,199원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "197,052원",
                    "historicalHitRate": 0.0909,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "205,620원",
                    "historicalHitRate": 0.0,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 170,800원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.3%",
                    "targetPrice": "170,800원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.3636,
                  "ev": 2.767,
                  "sampleCount": 11
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 22건)",
              "sampleCount": 22,
              "ev": -0.5594
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 11건)",
              "hitRate": 0.3636,
              "ev": 2.767,
              "sampleCount": 11
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
            "statusReasonShort": "G2 미충족: 52주 고가 대비 88.4% (필요 ≥ 90%) · 외 1건",
            "statusReason": "G2 미충족: 52주 고가 대비 88.4% (필요 ≥ 90%) / G4 미충족: 당일 거래량 / 20일 평균 122% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 171350.0,
                "vs52wHighPct": 88.41589267285862,
                "vs52wLowPct": 590.9274193548387,
                "dropFrom52wHighPct": 11.584107327141382,
                "ma20GapPct": 27.937580497638738,
                "rsi14": 61.82910017060841,
                "volumeRatio20d": 122.04592821518337,
                "rs20Pct": 36.75179569034317,
                "tradingValueRank": 29.0,
                "marketCapRank": 82.0,
                "marketCapTrillion": 8.4105,
                "per": 75.92,
                "pbr": 8.49,
                "cnsPer": 48.94,
                "foreignRate": 17.32,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 42.32183576375204
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
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
            "name": "삼성전기",
            "code": "009150",
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
                "note": "외인 117,254주 / 기관 18,623주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +117,254 / 전일 +194,796 · 기관 당일 +18,623 / 전일 +44,458 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "마지막 1시간 평균 체결강도 68.3% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "당일 평균 77.0% / 마지막 1시간 68.3% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인"
              },
              {
                "code": "S5",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +1,170,703주 · 양수 5/5일 · 증가 1회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 118.6% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 2,155,400 / 20MA 1,877,150 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 62% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 -1.89% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -0.07% / KOSPI +0.18% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.68:1 · 평균 체결강도 68.3% (필요 ≥ 1.1:1)"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -43.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
                "note": "외인 전일 +194,796/당일 +117,254 · 기관 전일 +44,458/당일 +18,623 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 2,227,000 / 60MA 1,110,392",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⚠️",
                "note": "52주 고가 대비 92.1% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 50% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 39.5% (≥25%) · 20일 수익률 +85.0% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 117,254주 / 기관 18,623주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +117,254 / 전일 +194,796 · 기관 당일 +18,623 / 전일 +44,458 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 2,155,400 / 20MA 1,877,150 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 62% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -1.89% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -43.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 68.3% (필요 ≥ 100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "S4",
                "note": "당일 평균 77.0% / 마지막 1시간 68.3% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +1,170,703주 · 양수 5/5일 · 증가 1회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 118.6% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -0.07% / KOSPI +0.18% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.68:1 · 평균 체결강도 68.3% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2227000,
            "previousClose": 2270000,
            "dailyChange": -43000,
            "dailyChangePct": -1.89,
            "dailyDirection": "down",
            "entryPriceText": "2,227,000원 (당일 종가 기준)",
            "entryPrice": 2227000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 166.3429,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 117,254주 / 기관 18,623주 / 마지막 1시간 68.3% · 마지막 30분 틱 0.68:1. 외국인 최근 5일 매집 유지 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 77.0,
              "note": "토스 공개 체결강도 77.0% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-06-22T06:02:42Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 68.3,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 68.3,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 0.6828,
              "last30BuyVolume": 325.0,
              "last30SellVolume": 476.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 87.29, ATR10 10.69%, 일간 표준편차 8.91%, 당일 레인지 5.95%.",
              "metrics": {
                "atrPct10": 10.69,
                "returnStd20": 8.91,
                "todayRangePct": 5.95,
                "vkospi": 87.29
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 1170703.0,
              "positiveDays": 5,
              "improvementCount": 1,
              "series": {
                "foreign": [
                  {
                    "date": "20260619",
                    "net": 117254.0
                  },
                  {
                    "date": "20260618",
                    "net": 194796.0
                  },
                  {
                    "date": "20260617",
                    "net": 81556.0
                  },
                  {
                    "date": "20260616",
                    "net": 284775.0
                  },
                  {
                    "date": "20260615",
                    "net": 492322.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260619",
                    "net": 18623.0
                  },
                  {
                    "date": "20260618",
                    "net": 44458.0
                  },
                  {
                    "date": "20260617",
                    "net": -106053.0
                  },
                  {
                    "date": "20260616",
                    "net": -101710.0
                  },
                  {
                    "date": "20260615",
                    "net": -36809.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260619",
                    "net": 117254.0
                  },
                  {
                    "date": "20260618",
                    "net": 194796.0
                  },
                  {
                    "date": "20260617",
                    "net": 81556.0
                  },
                  {
                    "date": "20260616",
                    "net": 284775.0
                  },
                  {
                    "date": "20260615",
                    "net": 492322.0
                  }
                ]
              },
              "status": "partial",
              "score": 0.5,
              "summary": "외국인 최근 5일 매집 유지",
              "note": "외국인 최근 5일 누적 +1,170,703주 · 양수 5/5일 · 증가 1회"
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
                "quantity": "15% 익절",
                "targetYield": "+2.2%",
                "targetPrice": "2,277,000원",
                "historicalHitRate": 0.7011,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.2%",
                "targetPrice": "2,320,000원",
                "historicalHitRate": 0.4138,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "2,382,890원",
                "historicalHitRate": 0.2471,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "2,449,700원",
                "historicalHitRate": 0.1494,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "2,538,780원",
                "historicalHitRate": 0.0788,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 2,215,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-0.5%",
                "targetPrice": "2,215,000원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260622",
              "anchorOpen": 2215000,
              "anchorClose": 2227000,
              "anchorVolumeRatio20d": 0.5,
              "anchorStopPrice": 2215000,
              "fallbackStopPrice": 2149055,
              "effectiveHardStopPrice": 2215000,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 2,215,000원와 기존 % 손절 2,149,055원 중 더 높은 2,215,000원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 2,215,000원를 기준으로 잡고, 기존 % 손절 2,149,055원보다 느슨해지지 않게 2,215,000원로 고정합니다."
            },
            "rr": "1 : 16.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 2211411,
              "high": 2233681,
              "anchor": 2227000,
              "label": "2,211,411~2,233,681원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 2277000,
                "secondaryResistancePrice": 2320000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "2,282,675원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "2,316,080원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,382,890원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "2,449,700원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "2,538,780원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,215,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "2,215,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 2277000,
                "secondaryResistancePrice": 2320000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "2,277,000원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "2,316,080원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,382,890원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "2,449,700원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "2,538,780원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,215,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "2,215,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistancePrice": 2277000,
                "secondaryResistancePrice": 2320000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "2,277,000원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.2%",
                    "targetPrice": "2,320,000원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,382,890원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "2,449,700원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "2,538,780원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,215,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-0.5%",
                    "targetPrice": "2,215,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.605
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 174건)",
              "hitRate": 0.7011,
              "ev": 0.571,
              "sampleCount": 174
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
              "시장 Gate 차단: G5 — 신규 진입 보류",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G5 미충족: KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
            "statusReason": "G5 미충족: KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 2227000.0,
                "vs52wHighPct": 92.13901530823335,
                "vs52wLowPct": 1623.6842105263158,
                "dropFrom52wHighPct": 7.860984691766652,
                "ma20GapPct": 18.63729590070053,
                "rsi14": 69.88484896170509,
                "volumeRatio20d": 49.941400205190014,
                "rs20Pct": 84.96677740863787,
                "tradingValueRank": 6.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 166.3429,
                "per": 210.35,
                "pbr": 17.14,
                "cnsPer": 134.55,
                "foreignRate": 39.49,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": -43.41999882796476
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "한미반도체",
            "code": "042700",
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 935,861주 / 기관 -2,487,273주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 +935,861 / 전일 +87,931 · 기관 당일 -2,487,273 / 전일 -260,026 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 241.8% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 91.0% / 마지막 1시간 241.8% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "외국인 최근 5일 누적 +858,779주 · 양수 3/5일 · 증가 3회"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 98.8% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 311,500 / 20MA 302,750 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 49% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 등락 +1.36% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +4.29% / KOSPI +0.18% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 2.27:1 · 평균 체결강도 241.8% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +1.9% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 +87,931/당일 +935,861 · 기관 전일 -260,026/당일 -2,487,273 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "종가 299,000 / 60MA 311,150",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 70.2% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 34",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 50% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 7.2% (≥25%) · 20일 수익률 -10.1% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 241.8% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 91.0% / 마지막 1시간 241.8% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "외국인 최근 5일 누적 +858,779주 · 양수 3/5일 · 증가 3회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 98.8% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 311,500 / 20MA 302,750 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 49% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +1.36% (필요 -3% ~ +5%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +4.29% / KOSPI +0.18% outperform",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 2.27:1 · 평균 체결강도 241.8% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 935,861주 / 기관 -2,487,273주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +935,861 / 전일 +87,931 · 기관 당일 -2,487,273 / 전일 -260,026 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +1.9% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 299000,
            "previousClose": 295000,
            "dailyChange": 4000,
            "dailyChangePct": 1.36,
            "dailyDirection": "up",
            "entryPriceText": "299,000원 (당일 종가 기준)",
            "entryPrice": 299000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 28.4983,
            "marketCapRank": 28,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 935,861주 / 기관 -2,487,273주 / 마지막 1시간 241.8% · 장후반 매수세 강화 · 마지막 30분 틱 2.27:1. 외국인 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 91.0,
              "note": "토스 공개 체결강도 91.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042700/order",
              "asOf": "2026-06-22T06:02:44Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 241.8,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 241.8,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 2.2691,
              "last30BuyVolume": 1897.0,
              "last30SellVolume": 836.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 87.29, ATR10 11.45%, 일간 표준편차 7.90%, 당일 레인지 4.92%.",
              "metrics": {
                "atrPct10": 11.45,
                "returnStd20": 7.9,
                "todayRangePct": 4.92,
                "vkospi": 87.29
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "foreign",
              "cumulativeNet": 858779.0,
              "positiveDays": 3,
              "improvementCount": 3,
              "series": {
                "foreign": [
                  {
                    "date": "20260619",
                    "net": 935861.0
                  },
                  {
                    "date": "20260618",
                    "net": 87931.0
                  },
                  {
                    "date": "20260617",
                    "net": -66756.0
                  },
                  {
                    "date": "20260616",
                    "net": -114422.0
                  },
                  {
                    "date": "20260615",
                    "net": 16165.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260619",
                    "net": -2487273.0
                  },
                  {
                    "date": "20260618",
                    "net": -260026.0
                  },
                  {
                    "date": "20260617",
                    "net": -197749.0
                  },
                  {
                    "date": "20260616",
                    "net": -161315.0
                  },
                  {
                    "date": "20260615",
                    "net": -155871.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260619",
                    "net": 935861.0
                  },
                  {
                    "date": "20260618",
                    "net": 87931.0
                  },
                  {
                    "date": "20260617",
                    "net": -66756.0
                  },
                  {
                    "date": "20260616",
                    "net": -114422.0
                  },
                  {
                    "date": "20260615",
                    "net": 16165.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "외국인 최근 5일 매집 추세 강화",
              "note": "외국인 최근 5일 누적 +858,779주 · 양수 3/5일 · 증가 3회"
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
                "quantity": "15% 익절",
                "targetYield": "+0.5%",
                "targetPrice": "300,500원",
                "historicalHitRate": 0.7011,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.7%",
                "targetPrice": "313,000원",
                "historicalHitRate": 0.4138,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "319,930원",
                "historicalHitRate": 0.2471,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "328,900원",
                "historicalHitRate": 0.1494,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "340,860원",
                "historicalHitRate": 0.0788,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 293,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-1.8%",
                "targetPrice": "293,500원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "foreign",
              "anchorDate": "20260622",
              "anchorOpen": 293500,
              "anchorClose": 299000,
              "anchorVolumeRatio20d": 0.5,
              "anchorStopPrice": 293500,
              "fallbackStopPrice": 288535,
              "effectiveHardStopPrice": 293500,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 293,500원와 기존 % 손절 288,535원 중 더 높은 293,500원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인 매집 시작 봉(-) 시가 293,500원를 기준으로 잡고, 기존 % 손절 288,535원보다 느슨해지지 않게 293,500원로 고정합니다."
            },
            "rr": "1 : 4.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 296907,
              "high": 299897,
              "anchor": 299000,
              "label": "296,907~299,897원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 300500,
                "secondaryResistancePrice": 313000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "306,475원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "310,960원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "319,930원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "328,900원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "340,860원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 293,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "293,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 300500,
                "secondaryResistancePrice": 313000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "300,500원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "310,960원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "319,930원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "328,900원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "340,860원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 293,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "293,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistancePrice": 300500,
                "secondaryResistancePrice": 313000,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.5%",
                    "targetPrice": "300,500원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.7%",
                    "targetPrice": "313,000원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "319,930원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "328,900원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "340,860원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 293,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-1.8%",
                    "targetPrice": "293,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.605
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 174건)",
              "hitRate": 0.7011,
              "ev": 0.571,
              "sampleCount": 174
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
              "매매금지(핵심 Gate 미충족: G1, Q1, G5)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 종가 299,000 / 60MA 311,150 · 외 2건",
            "statusReason": "G1 미충족: 종가 299,000 / 60MA 311,150 / Q1 미충족: 외인 보유율 7.2% (≥25%) · 20일 수익률 -10.1% (≥0%) · 외인 매집 주체 약함, 20일 약세(낙하 칼날) / G5 미충족: KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 299000.0,
                "vs52wHighPct": 70.18779342723005,
                "vs52wLowPct": 347.60479041916165,
                "dropFrom52wHighPct": 29.812206572769952,
                "ma20GapPct": -1.2386457473162675,
                "rsi14": 47.279701896598695,
                "volumeRatio20d": 49.539355074397996,
                "rs20Pct": -10.075187969924812,
                "tradingValueRank": 34.0,
                "marketCapRank": 28.0,
                "marketCapTrillion": 28.4983,
                "per": 160.15,
                "pbr": 44.6,
                "cnsPer": 0.0,
                "foreignRate": 7.19,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 1.868241488127614
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
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
            "strictScore": 6.8,
            "signalScore": 6.8,
            "score": 6.8,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
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
                "note": "외인 7,458주 / 기관 1,278주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +7,458 / 전일 +49,409 · 기관 당일 +1,278 / 전일 -74,440 · 당일 양매수 + 전일 수급 유입"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 181.5% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "당일 평균 123.0% / 마지막 1시간 181.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
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
                "note": "종가 / 20MA 127.9% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 161,670 / 20MA 133,932 · 5MA > 20MA"
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
                "note": "당일 등락 +9.84% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "동종업종 평균 +2.87% / KOSPI +0.18% outperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "마지막 30분 틱프록시 매수/매도 0.77:1 · 평균 체결강도 181.5% (필요 ≥ 1.1:1)"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +42.3% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 +49,409/당일 +7,458 · 기관 전일 -74,440/당일 +1,278 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 171,350 / 60MA 125,126",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 88.4% (필요 < 92%)",
                "evalStatus": "met"
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
                "note": "당일 거래량 / 20일 평균 122% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 17.3% (≥25%) · 20일 수익률 +36.8% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⛔",
                "note": "KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 7,458주 / 기관 1,278주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +7,458 / 전일 +49,409 · 기관 당일 +1,278 / 전일 -74,440 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 181.5% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 123.0% / 마지막 1시간 181.5% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 161,670 / 20MA 133,932 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +2.87% / KOSPI +0.18% outperform",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S5",
                "note": "최근 5일 매집 추세 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 127.9% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +9.84% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 0.77:1 · 평균 체결강도 181.5% (필요 ≥ 1.1:1)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +42.3% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 171350,
            "previousClose": 156000,
            "dailyChange": 15350,
            "dailyChangePct": 9.84,
            "dailyDirection": "up",
            "entryPriceText": "171,350원 (당일 종가 기준)",
            "entryPrice": 171350,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.4105,
            "marketCapRank": 82,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 7,458주 / 기관 1,278주 / 마지막 1시간 181.5% · 장후반 매수세 강화 · 마지막 30분 틱 0.77:1. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 123.0,
              "note": "토스 공개 체결강도 123.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-06-22T06:02:45Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 181.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 181.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.7691,
              "last30BuyVolume": 1332.0,
              "last30SellVolume": 1732.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 87.29, ATR10 14.42%, 일간 표준편차 12.55%, 당일 레인지 16.47%.",
              "metrics": {
                "atrPct10": 14.42,
                "returnStd20": 12.55,
                "todayRangePct": 16.47,
                "vkospi": 87.29
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
                    "date": "20260619",
                    "net": 7458.0
                  },
                  {
                    "date": "20260618",
                    "net": 49409.0
                  },
                  {
                    "date": "20260617",
                    "net": -114557.0
                  },
                  {
                    "date": "20260616",
                    "net": 67364.0
                  },
                  {
                    "date": "20260615",
                    "net": -224320.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260619",
                    "net": 1278.0
                  },
                  {
                    "date": "20260618",
                    "net": -74440.0
                  },
                  {
                    "date": "20260617",
                    "net": -94594.0
                  },
                  {
                    "date": "20260616",
                    "net": -222986.0
                  },
                  {
                    "date": "20260615",
                    "net": 274393.0
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
                "quantity": "15% 익절",
                "targetYield": "+2.8%",
                "targetPrice": "176,100원",
                "historicalHitRate": 0.7011,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.9%",
                "targetPrice": "179,800원",
                "historicalHitRate": 0.4138,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "183,344원",
                "historicalHitRate": 0.2471,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "188,485원",
                "historicalHitRate": 0.1494,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "195,339원",
                "historicalHitRate": 0.0788,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 165,353원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "165,353원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "entry_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260622",
              "anchorOpen": 150400,
              "anchorClose": 171350,
              "anchorVolumeRatio20d": 1.22,
              "anchorStopPrice": 150400,
              "fallbackStopPrice": 165353,
              "effectiveHardStopPrice": 165353,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 150,400원와 기존 % 손절 165,353원 중 더 높은 165,353원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 150,400원를 기준으로 잡고, 기존 % 손절 165,353원보다 느슨해지지 않게 165,353원로 고정합니다."
            },
            "rr": "1 : 2.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 170151,
              "high": 171864,
              "anchor": 171350,
              "label": "170,151~171,864원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "175,634원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "178,204원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "183,344원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "188,485원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "195,339원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 165,353원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "165,353원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "175,634원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "178,204원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "183,344원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "188,485원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "195,339원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 165,353원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "165,353원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.8%",
                    "targetPrice": "176,100원",
                    "historicalHitRate": 0.7011,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.9%",
                    "targetPrice": "179,800원",
                    "historicalHitRate": 0.4138,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "183,344원",
                    "historicalHitRate": 0.2471,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "188,485원",
                    "historicalHitRate": 0.1494,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "195,339원",
                    "historicalHitRate": 0.0788,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 165,353원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "165,353원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 174건)",
                  "hitRate": 0.7011,
                  "ev": 0.571,
                  "sampleCount": 174
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 27건)",
              "sampleCount": 27,
              "ev": 0.605
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 174건)",
              "hitRate": 0.7011,
              "ev": 0.571,
              "sampleCount": 174
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
              "매매금지(핵심 Gate 미충족: Q1, G5)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "Q1 미충족: 외인 보유율 17.3% (≥25%) · 20일 수익률 +36.8% (≥0%) · 외인 매집 주체 약함 · 외 1건",
            "statusReason": "Q1 미충족: 외인 보유율 17.3% (≥25%) · 20일 수익률 +36.8% (≥0%) · 외인 매집 주체 약함 / G5 미충족: KOSPI 9,069 / 5MA 8,955 (+1.3%) · VKOSPI 87.3 · VKOSPI 과열",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 171350.0,
                "vs52wHighPct": 88.41589267285862,
                "vs52wLowPct": 590.9274193548387,
                "dropFrom52wHighPct": 11.584107327141382,
                "ma20GapPct": 27.937580497638738,
                "rsi14": 61.82910017060841,
                "volumeRatio20d": 122.04592821518337,
                "rs20Pct": 36.75179569034317,
                "tradingValueRank": 29.0,
                "marketCapRank": 82.0,
                "marketCapTrillion": 8.4105,
                "per": 75.92,
                "pbr": 8.49,
                "cnsPer": 48.94,
                "foreignRate": 17.32,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 42.32183576375204
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
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
            "name": "삼성물산",
            "code": "028260",
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
                "note": "외인 -13,311→-27,650 / 기관 -14,382→33,601 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 120.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 529,500 / 20MA 454,275 (116.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 76% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 105% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.41 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 527000, 전봉 종가 526000 충족"
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
                "status": "✅",
                "note": "시총 85.9조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-06-15 기업설명회(IR) 개최(안내공시)",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-12~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +42.9% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -6.3% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 529,500 / 60MA 370,017",
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
                "note": "20MA 이격 +16.6% (≤+22%) · RSI14 65 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -13,311→-27,650 / 기관 -14,382→33,601 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 120.0% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 529,500 / 20MA 454,275 (116.6% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 76% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 527000, 전봉 종가 526000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 105% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.41 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 529500,
            "previousClose": 491500,
            "dailyChange": 38000,
            "dailyChangePct": 7.73,
            "dailyDirection": "up",
            "entryPriceText": "529,500원 (당일 종가 기준)",
            "entryPrice": 529500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 85.8677,
            "marketCapRank": 8,
            "marketCapUniverseCount": 2558,
            "keyPoint": "20일 고점 대비 -6.3% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-06-15 기업설명회(IR) 개최(안내공시)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 527000, 전봉 종가 526000",
              "latestOpen": 525000.0,
              "latestClose": 527000.0,
              "previousClose": 526000.0
            },
            "toss": {
              "avgStrength": 120.0,
              "note": "토스 공개 체결강도 120.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A028260/order",
              "asOf": "2026-06-22T06:02:44Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 13.4977,
              "last30BuyVolume": 2929.0,
              "last30SellVolume": 217.0
            },
            "orderbook": {
              "bidAskRatio": 0.4103,
              "bidTotal": 2870,
              "askTotal": 6995,
              "note": "Naver 호가잔량합계 매수 2,870 / 매도 6,995",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=028260"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.29, ATR10 9.56%, 일간 표준편차 6.69%, 당일 레인지 9.66%.",
              "metrics": {
                "atrPct10": 9.56,
                "returnStd20": 6.69,
                "todayRangePct": 9.66,
                "vkospi": 87.29
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절",
                "targetYield": "+2.2%",
                "targetPrice": "541,000원",
                "historicalHitRate": 0.7273,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "555,975원",
                "historicalHitRate": 0.4545,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 518,910원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "518,910원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 493500,
              "fallbackStopPrice": 518910,
              "effectiveHardStopPrice": 518910,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 493,500원와 기존 % 손절 518,910원 중 더 높은 518,910원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 493,500원이며, 기존 % 손절 518,910원보다 느슨해지지 않게 518,910원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 525794,
              "high": 531088,
              "anchor": 529500,
              "label": "525,794~531,088원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 565000,
                "retrace33Price": 541215,
                "retrace50Price": 547250,
                "nearestResistancePrice": 541000,
                "secondaryResistancePrice": 559000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "541,000원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.6%",
                    "targetPrice": "559,000원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+6.7%",
                    "targetPrice": "565,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 518,910원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "518,910원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 565000,
                "retrace33Price": 541215,
                "retrace50Price": 547250,
                "nearestResistancePrice": 541000,
                "secondaryResistancePrice": 559000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "541,000원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.6%",
                    "targetPrice": "559,000원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 518,910원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "518,910원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 565000,
                "retrace33Price": 541215,
                "retrace50Price": 547250,
                "nearestResistancePrice": 541000,
                "secondaryResistancePrice": 559000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "541,000원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "555,975원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 518,910원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "518,910원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.7127
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 11건)",
              "hitRate": 0.4545,
              "ev": 1.18,
              "sampleCount": 11
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
            "statusReasonShort": "G4 미충족: 최근 5거래일 최저 -1.4% (필요 -3% 이하 급락 1회 이상)",
            "statusReason": "G4 미충족: 최근 5거래일 최저 -1.4% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 529500.0,
                "vs52wHighPct": 93.71681415929204,
                "vs52wLowPct": 250.66225165562912,
                "dropFrom52wHighPct": 6.283185840707965,
                "ma20GapPct": 16.55935281492488,
                "rsi14": 65.3377212098541,
                "volumeRatio20d": 99.88434693716339,
                "rs20Pct": 26.523297491039425,
                "tradingValueRank": 25.0,
                "marketCapRank": 8.0,
                "marketCapTrillion": 85.8677,
                "per": 35.51,
                "pbr": 1.39,
                "cnsPer": 33.06,
                "foreignRate": 31.13,
                "supplyTrendScore": -2.0,
                "shortBalanceChangePct": 99.94215095285118
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 2,
            "name": "원익IPS",
            "code": "240810",
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
                "note": "외인 49,409→7,458 / 기관 -74,440→1,278 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 123.0% / 마지막 1시간 181.5% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 171,350 / 20MA 133,932 (127.9% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 82% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.71 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 170000, 전봉 종가 169900 충족"
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
                "note": "시총 8.4조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "⛔",
                "note": "KIND 최근공시 2026-05-27 공매도 과열종목 지정(공매도 거래 금지 적용)",
                "evalStatus": "not_met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-12~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +53.1% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -6.5% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 171,350 / 60MA 125,126",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -10.5% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +27.9% (≤+22%) · RSI14 62 (≤72) · 20MA 과이격(반등 소진)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 49,409→7,458 / 기관 -74,440→1,278 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 123.0% / 마지막 1시간 181.5% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 171,350 / 20MA 133,932 (127.9% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 82% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 170000, 전봉 종가 169900 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 106% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.71 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 171350,
            "previousClose": 156000,
            "dailyChange": 15350,
            "dailyChangePct": 9.84,
            "dailyDirection": "up",
            "entryPriceText": "171,350원 (당일 종가 기준)",
            "entryPrice": 171350,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 8.4105,
            "marketCapRank": 82,
            "marketCapUniverseCount": 2558,
            "keyPoint": "20일 고점 대비 -6.5% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-05-27 공매도 과열종목 지정(공매도 거래 금지 적용)",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 170000, 전봉 종가 169900",
              "latestOpen": 169900.0,
              "latestClose": 170000.0,
              "previousClose": 169900.0
            },
            "toss": {
              "avgStrength": 123.0,
              "note": "토스 공개 체결강도 123.0% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A240810/order",
              "asOf": "2026-06-22T06:02:45Z",
              "intradayAbove100Ratio": 50.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 181.5,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 181.5,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 0.7691,
              "last30BuyVolume": 1332.0,
              "last30SellVolume": 1732.0
            },
            "orderbook": {
              "bidAskRatio": 0.7062,
              "bidTotal": 2543,
              "askTotal": 3601,
              "note": "Naver 호가잔량합계 매수 2,543 / 매도 3,601",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.29, ATR10 14.42%, 일간 표준편차 12.55%, 당일 레인지 16.47%.",
              "metrics": {
                "atrPct10": 14.42,
                "returnStd20": 12.55,
                "todayRangePct": 16.47,
                "vkospi": 87.29
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "하락폭 33% 되돌림 도달",
                "quantity": "50% 익절",
                "targetYield": "+2.3%",
                "targetPrice": "175,294원",
                "historicalHitRate": 0.7273,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+4.9%",
                "targetPrice": "179,800원",
                "historicalHitRate": 0.4545,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 167,923원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "167,923원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 150400,
              "fallbackStopPrice": 167923,
              "effectiveHardStopPrice": 167923,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 150,400원와 기존 % 손절 167,923원 중 더 높은 167,923원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 150,400원이며, 기존 % 손절 167,923원보다 느슨해지지 않게 167,923원으로 고정하고 종가 기준으로 확인합니다."
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
            "rr": "1 : 1.8",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 170151,
              "high": 171864,
              "anchor": 171350,
              "label": "170,151~171,864원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 183300,
                "retrace33Price": 175294,
                "retrace50Price": 177325,
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "175,294원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.9%",
                    "targetPrice": "179,800원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+7.0%",
                    "targetPrice": "183,300원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 167,923원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "167,923원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 183300,
                "retrace33Price": 175294,
                "retrace50Price": 177325,
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "175,294원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+4.9%",
                    "targetPrice": "179,800원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 167,923원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "167,923원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 183300,
                "retrace33Price": 175294,
                "retrace50Price": 177325,
                "nearestResistancePrice": 176100,
                "secondaryResistancePrice": 179800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "하락폭 33% 되돌림 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.3%",
                    "targetPrice": "175,294원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+4.9%",
                    "targetPrice": "179,800원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 167,923원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "167,923원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.7127
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 11건)",
              "hitRate": 0.4545,
              "ev": 1.18,
              "sampleCount": 11
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
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F3 미충족: KIND 최근공시 2026-05-27 공매도 과열종목 지정(공매도 거래 금지 적용) · 외 1건",
            "statusReason": "F3 미충족: KIND 최근공시 2026-05-27 공매도 과열종목 지정(공매도 거래 금지 적용) / Q1 미충족: 20MA 이격 +27.9% (≤+22%) · RSI14 62 (≤72) · 20MA 과이격(반등 소진)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 171350.0,
                "vs52wHighPct": 88.41589267285862,
                "vs52wLowPct": 590.9274193548387,
                "dropFrom52wHighPct": 11.584107327141382,
                "ma20GapPct": 27.937580497638738,
                "rsi14": 61.82910017060841,
                "volumeRatio20d": 122.04592821518337,
                "rs20Pct": 36.75179569034317,
                "tradingValueRank": 29.0,
                "marketCapRank": 82.0,
                "marketCapTrillion": 8.4105,
                "per": 75.92,
                "pbr": 8.49,
                "cnsPer": 48.94,
                "foreignRate": 17.32,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 42.32183576375204
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSDAQ",
            "analysisSession": "1500",
            "analysisSessionLabel": "3시 분석"
          },
          {
            "rank": 3,
            "name": "하나마이크론",
            "code": "067310",
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
                "note": "외인 139,180→120,642 / 기관 -198,954→-252,444 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 121.9% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 55,900 / 20MA 46,565 (120.0% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 286% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.27 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 55200, 전봉 종가 55000 충족"
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
                "note": "시총 3.7조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-06-17까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-12~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +18.4% (필요 ≥ +15%)",
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
                "status": "✅",
                "note": "종가 55,900 / 60MA 40,745",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -5.0% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +20.0% (≤+22%) · RSI14 64 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 121.9% / 마지막 1시간 300.0% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 55,900 / 20MA 46,565 (120.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 88% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 286% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 55200, 전봉 종가 55000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 139,180→120,642 / 기관 -198,954→-252,444 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.27 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 55900,
            "previousClose": 49000,
            "dailyChange": 6900,
            "dailyChangePct": 14.08,
            "dailyDirection": "up",
            "entryPriceText": "55,900원 (당일 종가 기준)",
            "entryPrice": 55900,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 3.7161,
            "marketCapRank": 146,
            "marketCapUniverseCount": 2558,
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
              "note": "KIND 최근공시 2026-06-17까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": true,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 55200, 전봉 종가 55000",
              "latestOpen": 54800.0,
              "latestClose": 55200.0,
              "previousClose": 55000.0
            },
            "toss": {
              "avgStrength": 121.9,
              "note": "토스 공개 체결강도 121.9% / 최근 체결 1분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A067310/order",
              "asOf": "2026-06-22T06:02:45Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 1,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 1분 프록시",
              "lastHourAvgStrength": 300.0,
              "lastHourObservedMinutes": 1,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 1,
              "last30BuySellRatio": 3.4053,
              "last30BuyVolume": 2840.0,
              "last30SellVolume": 834.0
            },
            "orderbook": {
              "bidAskRatio": 0.2671,
              "bidTotal": 18917,
              "askTotal": 70825,
              "note": "Naver 호가잔량합계 매수 18,917 / 매도 70,825",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=067310"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 87.29, ATR10 11.47%, 일간 표준편차 7.45%, 당일 레인지 19.49%.",
              "metrics": {
                "atrPct10": 11.47,
                "returnStd20": 7.45,
                "todayRangePct": 19.49,
                "vkospi": 87.29
              },
              "strategyLabel": "낙주 매매"
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+3% 조기 반등 도달",
                "quantity": "50% 익절",
                "targetYield": "+3.0%",
                "targetPrice": "57,577원",
                "historicalHitRate": 0.7273,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "58,695원",
                "historicalHitRate": 0.4545,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 54,782원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "54,782원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 47450,
              "fallbackStopPrice": 54782,
              "effectiveHardStopPrice": 54782,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 47,450원와 기존 % 손절 54,782원 중 더 높은 54,782원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 47,450원이며, 기존 % 손절 54,782원보다 느슨해지지 않게 54,782원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 55509,
              "high": 56068,
              "anchor": 55900,
              "label": "55,509~56,068원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 57000,
                "retrace33Price": 56263,
                "retrace50Price": 56450,
                "nearestResistancePrice": 57000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "57,018원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "57,856원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "58,695원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 54,782원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "54,782원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 57000,
                "retrace33Price": 56263,
                "retrace50Price": 56450,
                "nearestResistancePrice": 57000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "57,018원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "57,856원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 54,782원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "54,782원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "recentHighPrice": 57000,
                "retrace33Price": 56263,
                "retrace50Price": 56450,
                "nearestResistancePrice": 57000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "57,577원",
                    "historicalHitRate": 0.7273,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "58,695원",
                    "historicalHitRate": 0.4545,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 54,782원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "54,782원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "openPhase",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 11건)",
                  "hitRate": 0.4545,
                  "ev": 1.18,
                  "sampleCount": 11
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.7127
            },
            "recommendedStage": {
              "stageKey": "openPhase",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 11건)",
              "hitRate": 0.4545,
              "ev": 1.18,
              "sampleCount": 11
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
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 3.7조 (필요 ≥ 5조) / G2 미충족: 20일 고점 대비 -1.9% (필요 -5%~-25%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 55900.0,
                "vs52wHighPct": 95.55555555555556,
                "vs52wLowPct": 437.5,
                "dropFrom52wHighPct": 4.444444444444445,
                "ma20GapPct": 20.047245785461186,
                "rsi14": 63.857079277454915,
                "volumeRatio20d": 286.40318879494464,
                "rs20Pct": 2.5688073394495414,
                "tradingValueRank": 28.0,
                "marketCapRank": 146.0,
                "marketCapTrillion": 3.7161,
                "per": 36.13,
                "pbr": 7.88,
                "cnsPer": 22.96,
                "foreignRate": 21.61,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-22T15:03:45+09:00",
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
        "status": "success",
        "source": "live-public-run",
        "counts": {
          "stale": 0
        },
        "staleKeys": []
      }
    }
  ],
  "analysisDate": "2026-06-22",
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
      "006400",
      "009150",
      "032830",
      "042700",
      "240810"
    ],
    "changedEntries": [
      {
        "strategy": "pullback",
        "code": "032830",
        "name": "삼성생명",
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
        "strategy": "pullback",
        "code": "006400",
        "name": "삼성SDI",
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
        "code": "009150",
        "name": "삼성전기",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore",
          "grade"
        ],
        "before": {
          "strictScore": 7.5,
          "signalScore": 7.5,
          "score": 7.5,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.4,
          "grade": "C"
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
        "code": "000660",
        "name": "SK하이닉스",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 4.1,
          "signalScore": 4.8,
          "score": 4.8,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.3,
          "grade": "C"
        },
        "after": {
          "strictScore": 5.0,
          "signalScore": 5.0,
          "score": 5.0,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 4.0,
          "grade": "C"
        }
      },
      {
        "strategy": "breakout",
        "code": "240810",
        "name": "원익IPS",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 3.7,
          "signalScore": 5.0,
          "score": 5.0,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.0,
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
        "ok": 6
      }
    },
    "sourcePointInTimeStatus": "confirmed"
  }
};
