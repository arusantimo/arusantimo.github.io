window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};
window.JONGGA_DAILY_DATA["2026-06-18"] = {
  "schemaVersion": "jongga_result.v1",
  "generatedAt": "2026-06-18T08:34:59+00:00",
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
    },
    {
      "code": "080220",
      "name": "제주반도체",
      "reasons": [
        "투자 주의",
        "공매도 과열"
      ],
      "sources": [
        "kind"
      ],
      "status": "confirmed"
    },
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
      "total": 20,
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
        "ok": 20
      },
      "naver_chart": {
        "ok": 20
      },
      "naver_integration_schedule": {
        "ok": 11
      },
      "yahoo_chart": {
        "ok": 5,
        "stale": 0
      },
      "yahoo_intraday_30m": {
        "ok": 20
      },
      "toss_http_strength": {
        "ok": 20
      },
      "toss_ticks_strength_proxy": {
        "ok": 20
      },
      "toss_quotes_orderbook": {
        "ok": 20
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
        "ok": 12
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
        "durationMs": 1474.7,
        "detail": "VKOSPI",
        "count": 1
      },
      {
        "step": "macro_quotes",
        "label": "글로벌 매크로 지표 수집",
        "status": "ok",
        "durationMs": 231.4,
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
        "durationMs": 1577.3,
        "count": 90
      },
      {
        "step": "market_context",
        "label": "시장 레짐 계산",
        "status": "ok",
        "durationMs": 279.9,
        "detail": "강세장 ✅ (펀더·지수 정당)"
      },
      {
        "step": "top_trading",
        "label": "거래대금 상위 종목 수집",
        "status": "ok",
        "durationMs": 39450.6,
        "count": 20
      },
      {
        "step": "overtime_price",
        "label": "시간외 단일가 종가 보강",
        "status": "fallback",
        "durationMs": 827.2,
        "detail": "정규장 종가로 대체",
        "count": 0
      },
      {
        "step": "short_balance_trend",
        "label": "대차잔고(공매도) 추이 보강 (대형주)",
        "status": "ok",
        "durationMs": 13759.2,
        "detail": "후보 12종목 중 12건 수집",
        "count": 12
      },
      {
        "step": "stock_snapshots",
        "label": "종목 상세 스냅샷 수집",
        "status": "ok",
        "durationMs": 6040.2,
        "detail": "성공 20 / 실패 0",
        "count": 20
      },
      {
        "step": "http_enrichment",
        "label": "토스 API 보강 수집",
        "status": "ok",
        "durationMs": 6866.1,
        "detail": "direct-http · 체결강도 20 / 호가 20 / 틱프록시 20",
        "count": 20
      },
      {
        "step": "entry_scoring",
        "label": "전략별 후보 계산",
        "status": "ok",
        "durationMs": 51656.7,
        "detail": "pullback 3, breakout 3, accumulation 3, reversal 3",
        "count": 12
      },
      {
        "step": "browser_enrichment",
        "label": "KIND 브라우저 보강",
        "status": "ok",
        "durationMs": 6316.0,
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
        "durationMs": 80027.1,
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
            "value": "9063.84 (+2.25%)"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 80.25"
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
            "value": "G-B 🔵 (+2.5점)"
          },
          {
            "item": "갭 조정",
            "value": "✅ 100% 진입 / ✅ 80% 진입"
          }
        ],
        "evidence": [
          {
            "item": "KOSPI 60MA",
            "value": "6977.75",
            "verdict": "✅"
          },
          {
            "item": "KOSPI 20MA",
            "value": "8230.01",
            "verdict": "✅"
          },
          {
            "item": "VKOSPI",
            "value": "VKOSPI 80.25",
            "verdict": "❌"
          },
          {
            "item": "등락주",
            "value": "상승 14 / 하락 6",
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
          "marketAnalyzeDate": "20260618",
          "technicalRegimeLabel": "박스권 ⚠️",
          "effectiveRegimeLabel": "강세장 ✅ (펀더·지수 정당)",
          "regimeAdjustmentReason": "펀더 앵커 89 · 버블 critical off · KOSPI 60/20MA 상향 · 펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향",
          "riseJustified": true,
          "kospiBullTier": "strong",
          "marketRegimeLabel": "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)",
          "marketRegimeKey": "anchor-buffered-overheat",
          "fundamentalAnchorScore": 89.0,
          "fundamentalAnchorState": "validated",
          "bubbleIndex": 44.58,
          "bubbleCriticalTrigger": false,
          "bubbleRegimeLabel": "펀더멘털 완충형 과열 경계",
          "riskIndex": 66,
          "stageOverrideReason": "원/달러 1519원과 과열 이격이 겹쳤지만 펀더멘털 앵커 89점과 non-critical bubble(BI 45 / active 1개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다.",
          "kospiClose": 9063.84,
          "kospiMa5": 8664.856,
          "vkospiValue": 80.25,
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
            "actualValue": "-0.33%",
            "baseScore": "+0점",
            "weight": "×2.5",
            "formula": "+0 × 2.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "VIX 수준",
            "actualValue": "+16.95",
            "baseScore": "+1점",
            "weight": "×2.0",
            "formula": "+1 × 2.0 = +2.0점",
            "weightedScore": "+2.0점"
          },
          {
            "indicator": "미국 10년 금리 전일비",
            "actualValue": "+0.0bp",
            "baseScore": "+0점",
            "weight": "×1.5",
            "formula": "+0 × 1.5 = +0.0점",
            "weightedScore": "+0.0점"
          },
          {
            "indicator": "원달러 환율 변화",
            "actualValue": "+13.81원",
            "baseScore": "-1점",
            "weight": "×1.5",
            "formula": "-1 × 1.5 = -1.5점",
            "weightedScore": "-1.5점"
          },
          {
            "indicator": "SOX 전일 변화율",
            "actualValue": "+10.41%",
            "baseScore": "+2점",
            "weight": "×1.0",
            "formula": "+2 × 1.0 = +2.0점",
            "weightedScore": "+2.0점"
          }
        ],
        "totalScore": "+2.5점",
        "grade": "G-B 🔵",
        "code": "G-B",
        "entryAdjustment": "✅ 100% 진입 / ✅ 80% 진입",
        "sellAdjustment": "기본 조건 유지 | 기본 유지",
        "swingAdjustment": "허용",
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
        "isFresh": true,
        "freshnessStatus": "fresh",
        "macroAsOf": {
          "nq": "2026-06-19T03:59:00+00:00",
          "vix": "2026-06-18T20:15:00+00:00",
          "tnx": "2026-06-18T19:00:00+00:00",
          "krw": "2026-06-18T22:59:00+00:00",
          "sox": "2026-06-19T00:00:00+00:00"
        },
        "staleKeys": []
      },
      "entries": {
        "pullback": [
          {
            "rank": 1,
            "name": "SK이터닉스",
            "code": "475150",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 13.0,
            "effectiveScoreMax": 11.5,
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
                "note": "외인 -218,008주 / 기관 294,843주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 48,700 · 5MA·10MA·20MA 중 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.03 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -29.7% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 173% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G2)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 763% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 49,750 > 20MA 42,100 > 60MA 50,357 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "종가 48,700 / 60MA 50,357",
                "evalStatus": "not_met"
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
                "note": "KOSPI 9,064 / 5MA 8,665 (+4.6%) · VKOSPI 80.2 · 거시·레짐 완화",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -7.06% (필요 ≤ +12%)",
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
                "note": "이격 20MA +15.7% (필요 ≤ +25%) · 60MA -3.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -29.7% (≥12%) · 거래량 173% (≥80%) · 수급추세 +2 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "KIND 최근공시 2026-06-16까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 -218,008주 / 기관 294,843주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 48,700 · 5MA·10MA·20MA 중 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -29.7% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D2",
                "note": "수급추세 +2 (≥+2 만점·+1 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 173% (≥100% 만점·80~100% 부분) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.03 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
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
            "currentPrice": 48700,
            "previousClose": 52400,
            "dailyChange": -3700,
            "dailyChangePct": -7.06,
            "dailyDirection": "down",
            "entryPriceText": "48,700원 (당일 종가 기준)",
            "entryPrice": 48700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.6591,
            "marketCapRank": 251,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 -218,008주 / 기관 294,843주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 평균 체결강도 데이터 부족",
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족",
              "대차잔고 추이 데이터 부족 (대형주만 수집)"
            ],
            "toss": {
              "avgStrength": 76.1,
              "note": "토스 공개 체결강도 76.1% / 최근 체결 99분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A475150/order",
              "asOf": "2026-06-18T08:30:02Z",
              "intradayAbove100Ratio": 75.0,
              "observedMinutes": 99,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 99분 프록시"
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-06-16까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 40,307원 (17.23% 아래) · 강도 60점 · family 2개 · 급증봉 저점·수평 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 40307,
                    "distancePct": 17.23,
                    "families": [
                      "eventAnchors",
                      "horizontal"
                    ],
                    "familyLabels": [
                      "급증봉 저점",
                      "수평 지지"
                    ],
                    "familyCount": 2,
                    "count": 10,
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 60,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 49025,
                    "distancePct": -0.67,
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
                    "price": 45700,
                    "distancePct": 6.16,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 44400,
                    "distancePct": 8.83,
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
                  },
                  {
                    "label": "수평 지지",
                    "price": 43457,
                    "distancePct": 10.77,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 5,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 40307,
                  "distancePct": 17.23,
                  "families": [
                    "eventAnchors",
                    "horizontal"
                  ],
                  "familyLabels": [
                    "급증봉 저점",
                    "수평 지지"
                  ],
                  "familyCount": 2,
                  "count": 10,
                  "lastSeenDaysAgo": 3,
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
                    "price": 32300,
                    "distancePct": 33.68,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 32150,
                    "bandHigh": 32450
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 34375,
                    "distancePct": 29.41,
                    "count": 2,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 34150,
                    "bandHigh": 34600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 36350,
                    "distancePct": 25.36,
                    "count": 2,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 36150,
                    "bandHigh": 36550
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 37383,
                    "distancePct": 23.24,
                    "count": 3,
                    "lastSeenDaysAgo": 10,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 37000,
                    "bandHigh": 37600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 38325,
                    "distancePct": 21.3,
                    "count": 2,
                    "lastSeenDaysAgo": 12,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 38200,
                    "bandHigh": 38450
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 40339,
                    "distancePct": 17.17,
                    "count": 8,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 39800,
                    "bandHigh": 40750
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 41175,
                    "distancePct": 15.45,
                    "count": 2,
                    "lastSeenDaysAgo": 15,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 41050,
                    "bandHigh": 41300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 42288,
                    "distancePct": 13.17,
                    "count": 3,
                    "lastSeenDaysAgo": 18,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 42000,
                    "bandHigh": 42600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 43457,
                    "distancePct": 10.77,
                    "count": 5,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 43000,
                    "bandHigh": 43850
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 44400,
                    "distancePct": 8.83,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 44350,
                    "bandHigh": 44450
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 45700,
                    "distancePct": 6.16,
                    "count": 2,
                    "lastSeenDaysAgo": 21,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 45600,
                    "bandHigh": 45800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 49025,
                    "distancePct": -0.67,
                    "count": 7,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 48600,
                    "bandHigh": 49650
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 49950,
                    "distancePct": -2.57,
                    "count": 2,
                    "lastSeenDaysAgo": 27,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 49800,
                    "bandHigh": 50100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 52020,
                    "distancePct": -6.82,
                    "count": 13,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 51100,
                    "bandHigh": 52600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 53946,
                    "distancePct": -10.77,
                    "count": 17,
                    "lastSeenDaysAgo": 29,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 53100,
                    "bandHigh": 54700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 55356,
                    "distancePct": -13.67,
                    "count": 9,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 55000,
                    "bandHigh": 56100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 57378,
                    "distancePct": -17.82,
                    "count": 8,
                    "lastSeenDaysAgo": 31,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 56500,
                    "bandHigh": 58000
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 58800,
                    "distancePct": -20.74,
                    "count": 5,
                    "lastSeenDaysAgo": 32,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 58500,
                    "bandHigh": 59000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 52000,
                    "distancePct": -6.78,
                    "count": 2,
                    "lastSeenDaysAgo": 38,
                    "valid": false,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 52000,
                    "bandHigh": 52000
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 55417,
                    "distancePct": -13.79,
                    "count": 11,
                    "lastSeenDaysAgo": 2,
                    "valid": false,
                    "weight": 25,
                    "volume": 34974234,
                    "binIndex": 15,
                    "binLow": 54600,
                    "binHigh": 56233
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 53783,
                    "distancePct": -10.44,
                    "count": 9,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 25,
                    "volume": 16777673,
                    "binIndex": 14,
                    "binLow": 52967,
                    "binHigh": 54600
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 63583,
                    "distancePct": -30.56,
                    "count": 2,
                    "lastSeenDaysAgo": 49,
                    "valid": false,
                    "weight": 25,
                    "volume": 15087043,
                    "binIndex": 20,
                    "binLow": 62767,
                    "binHigh": 64400
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 39100,
                    "distancePct": 19.71,
                    "count": 1,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 314.9,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 40275,
                    "distancePct": 17.3,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 1063.2,
                    "anchorCount": 2
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 47500,
                    "distancePct": 2.46,
                    "count": 1,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 1476.3,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 763% (2일 전) · 200%+ 급증 4회",
                "burstCount": 4,
                "maxRatioPct": 762.7,
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 80.25, ATR10 18.93%, 일간 표준편차 9.26%, 당일 레인지 16.03%.",
              "metrics": {
                "atrPct10": 18.93,
                "returnStd20": 9.26,
                "todayRangePct": 16.03,
                "vkospi": 80.25
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A475150/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 SK이터닉스 (475150) 차트 화면을 엽니다.",
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
              "ma10Price": 43530,
              "ma10PrevPrice": 42360,
              "ma20Price": 42100,
              "ma20PrevPrice": 41838,
              "ma10WarningPrice": null,
              "hardStopPrice": 47239,
              "fallbackStopPrice": 47239,
              "effectiveStopPrice": 47239,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 47,239원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 47,239원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "49,917원",
                "historicalHitRate": 0.6434,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "50,648원",
                "historicalHitRate": 0.5349,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "51,622원",
                "historicalHitRate": 0.3953,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "52,596원",
                "historicalHitRate": 0.3333,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "53,570원",
                "historicalHitRate": 0.1471,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 47,239원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "47,239원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 48359,
              "high": 48846,
              "anchor": 48700,
              "label": "48,359~48,846원 (종가 ±, 분할매수)"
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
                    "targetPrice": "49,917원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "50,648원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "51,622원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "52,596원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "53,570원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 47,239원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "47,239원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 18건)",
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
                    "targetPrice": "49,917원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "50,648원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "51,622원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "52,596원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "53,570원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 47,239원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "47,239원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
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
                    "targetPrice": "49,917원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "50,648원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "51,622원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "52,596원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "53,570원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 47,239원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "47,239원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 18건)",
              "sampleCount": 18,
              "ev": -1.4736
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 129건)",
              "hitRate": 0.6434,
              "ev": 3.458,
              "sampleCount": 129
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
              "매매금지(핵심 Gate 미충족: G1, G2)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 49,750 > 20MA 42,100 > 60MA 50,357 · 상승선 5MA, 20MA · 정배열 미충족 · 외 1건",
            "statusReason": "G1 미충족: 5MA 49,750 > 20MA 42,100 > 60MA 50,357 · 상승선 5MA, 20MA · 정배열 미충족 / G2 미충족: 종가 48,700 / 60MA 50,357",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 48700.0,
                "vs52wHighPct": 70.27417027417027,
                "vs52wLowPct": 182.97501452643812,
                "dropFrom52wHighPct": 29.725829725829726,
                "ma20GapPct": 15.676959619952493,
                "rsi14": 54.3951960983789,
                "volumeRatio20d": 173.34349097482342,
                "rs20Pct": 12.082853855005753,
                "supportDistancePct": 17.23,
                "tradingValueRank": 38.0,
                "marketCapRank": 251.0,
                "marketCapTrillion": 1.6591,
                "per": 66.8,
                "pbr": 6.13,
                "cnsPer": 0.0,
                "foreignRate": 2.57,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-18T17:33:32+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "한화오션",
            "code": "042660",
            "strictScore": 8.2,
            "signalScore": 8.2,
            "score": 8.2,
            "scoreMax": 13.0,
            "effectiveScoreMax": 13.0,
            "gradeScore": 6.3,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 1,530,933주 / 기관 275,336주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 125,100 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "음봉 · 아래꼬리:몸통 0.06 (필요 ≥ 1.0)"
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
                "note": "52주 고가 대비 -19.2% (≥12% 만점·8~12% 부분) · 충족"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "대차잔고 +20.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G1, G12)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 292% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "⛔",
                "note": "5MA 124,700 > 20MA 118,755 > 60MA 123,450 · 상승선 5MA, 20MA · 정배열 미충족",
                "evalStatus": "not_met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 125,100 / 60MA 123,450",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 52.5 (필요 ≥ 50)",
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
                "note": "KOSPI 9,064 / 5MA 8,665 (+4.6%) · VKOSPI 80.2 · 거시·레짐 완화",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 -6.01% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "주봉 RSI 52.5 (필요 ≤ 80)",
                "evalStatus": "met"
              },
              {
                "code": "G8",
                "status": "✅",
                "note": "이격 20MA +5.3% (필요 ≤ +25%) · 60MA +1.3% (필요 ≤ +60%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -19.2% (≥12%) · 거래량 103% (≥80%) · 수급추세 +4 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "마지막 30분 비율 1.24:1 / 마지막 30분 평균 42.0% / 마지막 1시간 42.0% · 장 막판 투매 경고",
                "evalStatus": "not_met"
              },
              {
                "code": "G13",
                "status": "✅",
                "note": "KIND 최근공시 2026-06-15까지 위험 공시 없음 / 최근 5거래일 종목 뉴스 없음",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 1,530,933주 / 기관 275,336주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 125,100 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -19.2% (≥12% 만점·8~12% 부분) · 충족",
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
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "음봉 · 아래꼬리:몸통 0.06 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C5",
                "note": "최근 5거래일 종목 뉴스 없음 · 최근 재료 신선도 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "D4",
                "note": "대차잔고 +20.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 숏커버링 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 125100,
            "previousClose": 133100,
            "dailyChange": -8000,
            "dailyChangePct": -6.01,
            "dailyDirection": "down",
            "entryPriceText": "125,100원 (당일 종가 기준)",
            "entryPrice": 125100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 38.3323,
            "marketCapRank": 21,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 1,530,933주 / 기관 275,336주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "앵커 중심값 데이터 부족",
              "앵커 거래량 데이터 부족"
            ],
            "toss": {
              "avgStrength": 61.0,
              "note": "토스 공개 체결강도 61.0% / 최근 체결 26분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042660/order",
              "asOf": "2026-06-18T08:32:38Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 26,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 26분 프록시",
              "lastHourAvgStrength": 42.0,
              "lastHourObservedMinutes": 26,
              "last30AvgStrength": 42.0,
              "last30ObservedMinutes": 26,
              "last30BuySellRatio": 1.2417,
              "last30BuyVolume": 2101.0,
              "last30SellVolume": 1692.0
            },
            "eventFilter": {
              "blocked": false,
              "earningsDays": null,
              "corporateActionDays": null,
              "note": "KIND 최근공시 2026-06-15까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "pullbackContext": {
              "support": {
                "summary": "주지지 123,172원 (1.54% 아래) · 강도 65점 · family 3개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 123172,
                    "distancePct": 1.54,
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
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 119334,
                    "distancePct": 4.61,
                    "families": [
                      "horizontal",
                      "swingCluster"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "스윙로우 군집"
                    ],
                    "familyCount": 2,
                    "count": 21,
                    "lastSeenDaysAgo": 13,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 125693,
                    "distancePct": -0.47,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 11,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 115091,
                    "distancePct": 8.0,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 9,
                    "lastSeenDaysAgo": 3,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "수평 지지",
                    "price": 111000,
                    "distancePct": 11.27,
                    "families": [
                      "horizontal"
                    ],
                    "familyLabels": [
                      "수평 지지"
                    ],
                    "familyCount": 1,
                    "count": 7,
                    "lastSeenDaysAgo": 4,
                    "strengthPoints": 30,
                    "consensusBonus": 0,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 123172,
                  "distancePct": 1.54,
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
                    "price": 101520,
                    "distancePct": 18.85,
                    "count": 4,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 100000,
                    "bandHigh": 102300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 103800,
                    "distancePct": 17.03,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 103100,
                    "bandHigh": 104500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 111000,
                    "distancePct": 11.27,
                    "count": 7,
                    "lastSeenDaysAgo": 4,
                    "valid": true,
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
                    "price": 115091,
                    "distancePct": 8.0,
                    "count": 9,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
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
                    "price": 119368,
                    "distancePct": 4.58,
                    "count": 16,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 117300,
                    "bandHigh": 121100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 122775,
                    "distancePct": 1.86,
                    "count": 16,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
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
                    "price": 125693,
                    "distancePct": -0.47,
                    "count": 11,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
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
                    "price": 129705,
                    "distancePct": -3.68,
                    "count": 16,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 127700,
                    "bandHigh": 131500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 133327,
                    "distancePct": -6.58,
                    "count": 12,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 131700,
                    "bandHigh": 135000
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 119300,
                    "distancePct": 4.64,
                    "count": 5,
                    "lastSeenDaysAgo": 14,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 5,
                    "bandLow": 118400,
                    "bandHigh": 120200
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 123569,
                    "distancePct": 1.22,
                    "count": 8,
                    "lastSeenDaysAgo": 13,
                    "valid": true,
                    "weight": 25,
                    "volume": 23734871,
                    "binIndex": 13,
                    "binLow": 122696,
                    "binHigh": 124442
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 134044,
                    "distancePct": -7.15,
                    "count": 7,
                    "lastSeenDaysAgo": 1,
                    "valid": false,
                    "weight": 25,
                    "volume": 19858414,
                    "binIndex": 19,
                    "binLow": 133171,
                    "binHigh": 134917
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 132298,
                    "distancePct": -5.75,
                    "count": 5,
                    "lastSeenDaysAgo": 16,
                    "valid": false,
                    "weight": 25,
                    "volume": 12071504,
                    "binIndex": 18,
                    "binLow": 131425,
                    "binHigh": 133171
                  }
                ],
                "eventAnchors": []
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 292% (전일) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 291.5,
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
                  "status": "⛔",
                  "summary": "마지막 30분 비율 1.24:1 / 마지막 30분 평균 42.0% / 마지막 1시간 42.0% · 장 막판 투매 경고"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 80.25, ATR10 8.41%, 일간 표준편차 5.73%, 당일 레인지 7.66%.",
              "metrics": {
                "atrPct10": 8.41,
                "returnStd20": 5.73,
                "todayRangePct": 7.66,
                "vkospi": 80.25
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
              "ma10Price": 115570,
              "ma10PrevPrice": 114570,
              "ma20Price": 118755,
              "ma20PrevPrice": 118095,
              "ma10WarningPrice": null,
              "hardStopPrice": 121347,
              "fallbackStopPrice": 121347,
              "effectiveStopPrice": 121347,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "앵커 부재 → 기존 % 손절 121,347원 사용",
              "reasonSummary": "앵커 부재로 기존 % 손절 121,347원를 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "128,227원",
                "historicalHitRate": 0.6434,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "130,104원",
                "historicalHitRate": 0.5349,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "132,606원",
                "historicalHitRate": 0.3953,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "135,108원",
                "historicalHitRate": 0.3333,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "137,610원",
                "historicalHitRate": 0.1471,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 121,347원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "121,347원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 124224,
              "high": 125475,
              "anchor": 125100,
              "label": "124,224~125,475원 (종가 ±, 분할매수)"
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
                    "targetPrice": "128,227원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "130,104원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "132,606원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "135,108원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "137,610원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 121,347원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "121,347원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 18건)",
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
                    "targetPrice": "128,227원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "130,104원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "132,606원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "135,108원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "137,610원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 121,347원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "121,347원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
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
                    "targetPrice": "128,227원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "130,104원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "132,606원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "135,108원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "137,610원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 121,347원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "121,347원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 18건)",
              "sampleCount": 18,
              "ev": -1.4736
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 129건)",
              "hitRate": 0.6434,
              "ev": 3.458,
              "sampleCount": 129
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
              "매매금지(핵심 Gate 미충족: G1, G12)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G1 미충족: 5MA 124,700 > 20MA 118,755 > 60MA 123,450 · 상승선 5MA, 20MA · 정배열 미충족 · 외 1건",
            "statusReason": "G1 미충족: 5MA 124,700 > 20MA 118,755 > 60MA 123,450 · 상승선 5MA, 20MA · 정배열 미충족 / G12 미충족: 마지막 30분 비율 1.24:1 / 마지막 30분 평균 42.0% / 마지막 1시간 42.0% · 장 막판 투매 경고",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 125100.0,
                "vs52wHighPct": 80.81395348837209,
                "vs52wLowPct": 74.96503496503496,
                "dropFrom52wHighPct": 19.186046511627907,
                "ma20GapPct": 5.342932929139826,
                "rsi14": 53.477819737107694,
                "volumeRatio20d": 103.4134429278494,
                "rs20Pct": 11.796246648793565,
                "supportDistancePct": 1.54,
                "tradingValueRank": 40.0,
                "marketCapRank": 21.0,
                "marketCapTrillion": 38.3323,
                "per": 25.05,
                "pbr": 5.62,
                "cnsPer": 24.78,
                "foreignRate": 11.11,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": 20.462771483895928
              },
              "evaluatedAt": "2026-06-18T17:33:32+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "제주반도체",
            "code": "080220",
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
                "note": "외인 52,548주 / 기관 136,071주 · 당일 순매수"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 117,700 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "양봉 (시가 111,500 ≤ 종가 117,700)"
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
                "note": "52주 고가 대비 -14.2% (≥12% 만점·8~12% 부분) · 충족"
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
                "note": "거래량 205% (≥100% 만점·80~100% 부분) · 충족"
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
            "statusLabel": "매매금지(핵심 Gate 미충족: G4, G7, G8, G13)",
            "strategy": "pullback",
            "gates": [
              {
                "code": "G0",
                "status": "✅",
                "note": "최근 20일 최대 거래량 급증 241% (필요 ≥ 200%)",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "5MA 107,540 > 20MA 104,360 > 60MA 68,265 · 상승선 5MA, 20MA, 60MA",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "종가 117,700 / 60MA 68,265",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "주봉 RSI 82.7 (필요 ≥ 50)",
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
                "note": "KOSPI 9,064 / 5MA 8,665 (+4.6%) · VKOSPI 80.2 · 거시·레짐 완화",
                "evalStatus": "not_met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +5.56% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "⛔",
                "note": "주봉 RSI 82.7 (필요 ≤ 80) · 과매수 과열",
                "evalStatus": "not_met"
              },
              {
                "code": "G8",
                "status": "⛔",
                "note": "이격 20MA +12.8% (필요 ≤ +25%) · 60MA +72.4% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)",
                "evalStatus": "not_met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "52주 고가 대비 -14.2% (≥12%) · 거래량 205% (≥80%) · 수급추세 +0 (≥0) · 진짜 눌림+반등 거래량+수급 유지",
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
                "note": "당일 거래량 / 앵커 거래량 85% · 시가 111,500 / 종가 117,700 / 전일 종가 111,500 · 거래량 함정 아님",
                "evalStatus": "met"
              },
              {
                "code": "G11",
                "status": "✅",
                "note": "종가 117,700 / 앵커 중심값 105,300 / 복합 지지 112,870 · 앵커·지지 방어",
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
                "status": "⛔",
                "note": "KIND 최근공시 2026-05-27 공매도 과열종목 지정(공매도 거래 금지 적용)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "외인 52,548주 / 기관 136,071주 · 당일 순매수",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "종가 117,700 · 5MA·10MA·20MA 중 5MA, 10MA, 20MA 위",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "양봉 (시가 111,500 ≤ 종가 117,700)",
                "evalStatus": "met"
              },
              {
                "code": "D1",
                "note": "52주 고가 대비 -14.2% (≥12% 만점·8~12% 부분) · 충족",
                "evalStatus": "met"
              },
              {
                "code": "D3",
                "note": "거래량 205% (≥100% 만점·80~100% 부분) · 충족",
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
            "currentPrice": 117700,
            "previousClose": 111500,
            "dailyChange": 6200,
            "dailyChangePct": 5.56,
            "dailyDirection": "up",
            "entryPriceText": "117,700원 (당일 종가 기준)",
            "entryPrice": 117700,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 4.0539,
            "marketCapRank": 142,
            "marketCapUniverseCount": 2558,
            "keyPoint": "5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 52,548주 / 기관 136,071주. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [
              "마지막 1시간 평균 체결강도 데이터 부족",
              "대차잔고 추이 데이터 부족 (대형주만 수집)"
            ],
            "toss": {
              "avgStrength": 100.8,
              "note": "토스 공개 체결강도 100.8% / 최근 체결 109분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A080220/order",
              "asOf": "2026-06-18T08:30:04Z",
              "intradayAbove100Ratio": 0.0,
              "observedMinutes": 109,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 109분 프록시"
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
                "summary": "주지지 112,870원 (4.10% 아래) · 강도 65점 · family 4개 · 수평 지지·매물대 지지",
                "lines": [
                  {
                    "label": "복합 지지",
                    "price": 112870,
                    "distancePct": 4.1,
                    "families": [
                      "horizontal",
                      "volumeShelf"
                    ],
                    "familyLabels": [
                      "수평 지지",
                      "매물대 지지"
                    ],
                    "familyCount": 2,
                    "count": 5,
                    "lastSeenDaysAgo": 0,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "primary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 88634,
                    "distancePct": 24.69,
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
                    "lastSeenDaysAgo": 5,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 58480,
                    "distancePct": 50.31,
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
                    "lastSeenDaysAgo": 24,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 54076,
                    "distancePct": 54.06,
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
                    "lastSeenDaysAgo": 25,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  },
                  {
                    "label": "복합 지지",
                    "price": 52879,
                    "distancePct": 55.07,
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
                    "lastSeenDaysAgo": 24,
                    "strengthPoints": 65,
                    "consensusBonus": 10,
                    "valid": true,
                    "role": "secondary"
                  }
                ],
                "primaryLine": {
                  "label": "복합 지지",
                  "price": 112870,
                  "distancePct": 4.1,
                  "families": [
                    "horizontal",
                    "volumeShelf"
                  ],
                  "familyLabels": [
                    "수평 지지",
                    "매물대 지지"
                  ],
                  "familyCount": 2,
                  "count": 5,
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
                    "price": 36962,
                    "distancePct": 68.6,
                    "count": 3,
                    "lastSeenDaysAgo": 48,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 36750,
                    "bandHigh": 37200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 38117,
                    "distancePct": 67.62,
                    "count": 5,
                    "lastSeenDaysAgo": 48,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 37550,
                    "bandHigh": 38500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 38933,
                    "distancePct": 66.92,
                    "count": 3,
                    "lastSeenDaysAgo": 49,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 38700,
                    "bandHigh": 39100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 40033,
                    "distancePct": 65.99,
                    "count": 3,
                    "lastSeenDaysAgo": 44,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 39600,
                    "bandHigh": 40350
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 41158,
                    "distancePct": 65.03,
                    "count": 7,
                    "lastSeenDaysAgo": 43,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 40700,
                    "bandHigh": 41700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 42117,
                    "distancePct": 64.22,
                    "count": 5,
                    "lastSeenDaysAgo": 39,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 41800,
                    "bandHigh": 42350
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 43225,
                    "distancePct": 63.28,
                    "count": 6,
                    "lastSeenDaysAgo": 38,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 43000,
                    "bandHigh": 43500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 44283,
                    "distancePct": 62.38,
                    "count": 3,
                    "lastSeenDaysAgo": 36,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 43950,
                    "bandHigh": 44700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 45750,
                    "distancePct": 61.13,
                    "count": 2,
                    "lastSeenDaysAgo": 35,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 45700,
                    "bandHigh": 45800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 46900,
                    "distancePct": 60.15,
                    "count": 2,
                    "lastSeenDaysAgo": 37,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 46850,
                    "bandHigh": 46950
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 52925,
                    "distancePct": 55.03,
                    "count": 6,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 52300,
                    "bandHigh": 53600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 54050,
                    "distancePct": 54.08,
                    "count": 6,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 53800,
                    "bandHigh": 54700
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 55050,
                    "distancePct": 53.23,
                    "count": 4,
                    "lastSeenDaysAgo": 23,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 54900,
                    "bandHigh": 55200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 56533,
                    "distancePct": 51.97,
                    "count": 3,
                    "lastSeenDaysAgo": 26,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 56100,
                    "bandHigh": 56800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 58600,
                    "distancePct": 50.21,
                    "count": 3,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close"
                    ],
                    "bandLow": 58400,
                    "bandHigh": 58900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 82100,
                    "distancePct": 30.25,
                    "count": 3,
                    "lastSeenDaysAgo": 8,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 81800,
                    "bandHigh": 82300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 88467,
                    "distancePct": 24.84,
                    "count": 3,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 87800,
                    "bandHigh": 88900
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 90050,
                    "distancePct": 23.49,
                    "count": 2,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "low"
                    ],
                    "bandLow": 90000,
                    "bandHigh": 90100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 92760,
                    "distancePct": 21.19,
                    "count": 4,
                    "lastSeenDaysAgo": 6,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 92100,
                    "bandHigh": 93500
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 95250,
                    "distancePct": 19.07,
                    "count": 6,
                    "lastSeenDaysAgo": 7,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 94300,
                    "bandHigh": 96200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 98671,
                    "distancePct": 16.17,
                    "count": 7,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 97000,
                    "bandHigh": 99800
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 100920,
                    "distancePct": 14.26,
                    "count": 5,
                    "lastSeenDaysAgo": 2,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 100400,
                    "bandHigh": 101200
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 104900,
                    "distancePct": 10.88,
                    "count": 2,
                    "lastSeenDaysAgo": 3,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 104800,
                    "bandHigh": 105100
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 106900,
                    "distancePct": 9.18,
                    "count": 2,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 106500,
                    "bandHigh": 107300
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 112050,
                    "distancePct": 4.8,
                    "count": 2,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 111500,
                    "bandHigh": 112600
                  },
                  {
                    "family": "horizontal",
                    "familyLabel": "수평 지지",
                    "label": "수평 지지",
                    "price": 118200,
                    "distancePct": -0.42,
                    "count": 4,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 30,
                    "sources": [
                      "close",
                      "low"
                    ],
                    "bandLow": 117700,
                    "bandHigh": 118900
                  }
                ],
                "swingCluster": [
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 52833,
                    "distancePct": 55.11,
                    "count": 3,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 3,
                    "bandLow": 52300,
                    "bandHigh": 53200
                  },
                  {
                    "family": "swingCluster",
                    "familyLabel": "스윙로우 군집",
                    "label": "스윙로우 군집",
                    "price": 88800,
                    "distancePct": 24.55,
                    "count": 2,
                    "lastSeenDaysAgo": 5,
                    "valid": true,
                    "weight": 25,
                    "pivotCount": 2,
                    "bandLow": 88700,
                    "bandHigh": 88900
                  }
                ],
                "volumeShelf": [
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 54103,
                    "distancePct": 54.03,
                    "count": 9,
                    "lastSeenDaysAgo": 25,
                    "valid": true,
                    "weight": 25,
                    "volume": 43716417,
                    "binIndex": 4,
                    "binLow": 51975,
                    "binHigh": 56231
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 58359,
                    "distancePct": 50.42,
                    "count": 3,
                    "lastSeenDaysAgo": 24,
                    "valid": true,
                    "weight": 25,
                    "volume": 22790307,
                    "binIndex": 5,
                    "binLow": 56231,
                    "binHigh": 60488
                  },
                  {
                    "family": "volumeShelf",
                    "familyLabel": "매물대 지지",
                    "label": "매물대 지지",
                    "price": 113691,
                    "distancePct": 3.41,
                    "count": 3,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 25,
                    "volume": 19983676,
                    "binIndex": 18,
                    "binLow": 111562,
                    "binHigh": 115819
                  }
                ],
                "eventAnchors": [
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 98800,
                    "distancePct": 16.06,
                    "count": 1,
                    "lastSeenDaysAgo": 1,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 240.5,
                    "anchorCount": 1
                  },
                  {
                    "family": "eventAnchors",
                    "familyLabel": "급증봉 저점",
                    "label": "급증봉 저점",
                    "price": 106500,
                    "distancePct": 9.52,
                    "count": 1,
                    "lastSeenDaysAgo": 0,
                    "valid": true,
                    "weight": 20,
                    "burstRatioPct": 205.5,
                    "anchorCount": 1
                  }
                ]
              },
              "volumeBurst": {
                "summary": "최근 20일 최대 거래량 241% (전일) · 200%+ 급증 2회",
                "burstCount": 2,
                "maxRatioPct": 241.2,
                "latestBurstDaysAgo": 1
              },
              "anchor": {
                "date": "20260617",
                "open": 99100,
                "close": 111500,
                "high": 115900,
                "low": 98800,
                "bodyMid": 105300,
                "volume": 9070506.0,
                "volumeRatio": 2.41,
                "daysAgo": 1
              },
              "trapDiagnostics": {
                "volumeTrap": {
                  "status": "✅",
                  "summary": "당일 거래량 / 앵커 거래량 85% · 시가 111,500 / 종가 117,700 / 전일 종가 111,500 · 거래량 함정 아님"
                },
                "supportDefense": {
                  "status": "✅",
                  "summary": "종가 117,700 / 앵커 중심값 105,300 / 복합 지지 112,870 · 앵커·지지 방어"
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 눌림목 반등 포착에 유리합니다. VKOSPI 80.25, ATR10 13.34%, 일간 표준편차 8.10%, 당일 레인지 14.98%.",
              "metrics": {
                "atrPct10": 13.34,
                "returnStd20": 8.1,
                "todayRangePct": 14.98,
                "vkospi": 80.25
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A080220/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 제주반도체 (080220) 차트 화면을 엽니다.",
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
              "anchorDate": "20260617",
              "anchorOpen": 99100,
              "anchorClose": 111500,
              "anchorHigh": 115900,
              "anchorLow": 98800,
              "anchorBodyMid": 105300,
              "anchorVolumeRatio": 2.41,
              "anchorStopMode": "open",
              "anchorStopPrice": 99100,
              "ma10Price": 101760,
              "ma10PrevPrice": 100720,
              "ma20Price": 104360,
              "ma20PrevPrice": 103270,
              "ma10WarningPrice": null,
              "hardStopPrice": 104360,
              "fallbackStopPrice": 114169,
              "effectiveStopPrice": 114169,
              "warningRuleSummary": "10일선 경고 없음",
              "hardStopRuleSummary": "1차 hard stop = MAX(앵커 시가 99,100원, 20일선 104,360원) = 104,360원 / 최종 stop = MAX(1차 hard stop, 기존 % 손절 114,169원) = 114,169원",
              "reasonSummary": "앵커 봉 - 기준 현재가 아래 유효 손절 후보(앵커 시가 99,100원, 20일선 104,360원) 중 더 보수적인 가격을 쓰고, 기존 % 손절 114,169원를 하한으로 유지합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "+2.5% 도달",
                "quantity": "30% 익절",
                "targetYield": "+2.5%",
                "targetPrice": "120,642원",
                "historicalHitRate": 0.6434,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "30% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "122,408원",
                "historicalHitRate": 0.5349,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+6.0% 도달",
                "quantity": "25% 익절",
                "targetYield": "+6.0%",
                "targetPrice": "124,762원",
                "historicalHitRate": 0.3953,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "10% 익절",
                "targetYield": "+8.0%",
                "targetPrice": "127,116원",
                "historicalHitRate": 0.3333,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "5% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "129,470원",
                "historicalHitRate": 0.1471,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 손절가 114,169원 하향 이탈",
                "quantity": "전량",
                "targetYield": "-3.0%",
                "targetPrice": "114,169원"
              }
            ],
            "rr": "1 : 1.6",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 116876,
              "high": 118053,
              "anchor": 117700,
              "label": "116,876~118,053원 (종가 ±, 분할매수)"
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
                    "targetPrice": "120,642원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "122,408원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "124,762원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "127,116원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "129,470원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 114,169원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "114,169원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": true,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 18건)",
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
                    "targetPrice": "120,642원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "122,408원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "124,762원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "127,116원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "129,470원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 114,169원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "114,169원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
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
                    "targetPrice": "120,642원",
                    "historicalHitRate": 0.6434,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "122,408원",
                    "historicalHitRate": 0.5349,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+6.0% 도달",
                    "quantity": "25% 익절",
                    "targetYield": "+6.0%",
                    "targetPrice": "124,762원",
                    "historicalHitRate": 0.3953,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "10% 익절",
                    "targetYield": "+8.0%",
                    "targetPrice": "127,116원",
                    "historicalHitRate": 0.3333,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "5% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "129,470원",
                    "historicalHitRate": 0.1471,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 손절가 114,169원 하향 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.0%",
                    "targetPrice": "114,169원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 129건)",
                  "hitRate": 0.6434,
                  "ev": 3.458,
                  "sampleCount": 129
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "balanced",
              "label": "1차 저항 반영형",
              "selectionBasis": "fallback_same_as_aggressive",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 18건)",
              "sampleCount": 18,
              "ev": -1.4736
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 129건)",
              "hitRate": 0.6434,
              "ev": 3.458,
              "sampleCount": 129
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
              "핵심 Gate 미충족: G4",
              "핵심 Gate 미충족: G7",
              "핵심 Gate 미충족: G8",
              "핵심 Gate 미충족: G13",
              "매매금지(핵심 Gate 미충족: G4, G7, G8, G13)"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G4 미충족: MACD 히스토그램 조건 미충족 · 외 3건",
            "statusReason": "G4 미충족: MACD 히스토그램 조건 미충족 / G7 미충족: 주봉 RSI 82.7 (필요 ≤ 80) · 과매수 과열 / G8 미충족: 이격 20MA +12.8% (필요 ≤ +25%) · 60MA +72.4% (필요 ≤ +60%) · 과이격(지지선 눌림 아님) / 외 1건",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 117700.0,
                "vs52wHighPct": 85.84974471188913,
                "vs52wLowPct": 795.7382039573821,
                "dropFrom52wHighPct": 14.15025528811087,
                "ma20GapPct": 12.78267535454197,
                "rsi14": 66.53608028865905,
                "volumeRatio20d": 205.48827342684817,
                "rs20Pct": 22.732012513034412,
                "supportDistancePct": 4.1,
                "tradingValueRank": 11.0,
                "marketCapRank": 142.0,
                "marketCapTrillion": 4.0539,
                "per": 35.8,
                "pbr": 12.99,
                "cnsPer": 0.0,
                "foreignRate": 5.12,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-18T17:33:32+09:00",
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
            "name": "SK하이닉스",
            "code": "000660",
            "strictScore": 6.3,
            "signalScore": 6.3,
            "score": 6.3,
            "scoreMax": 12.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 5.0,
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
                "note": "외인 74,908주 / 기관 341,331주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 114.0% / 100% 유지 6.7% (필요 ≥110%·≥70%)"
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 105% (필요 ≥ 150%)"
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
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 71% / 윗꼬리·몸통 0.41 · 강마감 약충족"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 1.57 (필요 ≥ 1.2) · 매수 잔량 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +2180.0% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
                "note": "5일 초과 +11.1% / 20일 초과 +29.2%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 98.1% (필요 ≥ 90%)",
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
                "note": "당일 거래량 / 20일 평균 105% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 71% / 윗꼬리·몸통 0.41 · 강마감 약충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +6.51% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 2,685,000 / 5MA 2,405,200 (전일 5MA 2,288,400) · 5MA 위·우상향",
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
                "note": "외인 74,908주 / 기관 341,331주 · 외인·기관 양매수",
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
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 1.57 (필요 ≥ 1.2) · 매수 잔량 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +2180.0% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 114.0% / 100% 유지 6.7% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 105% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "몸통 71% / 윗꼬리·몸통 0.41 · 강마감 약충족",
                "evalStatus": "met"
              }
            ],
            "currentPrice": 2685000,
            "previousClose": 2521000,
            "dailyChange": 164000,
            "dailyChangePct": 6.51,
            "dailyDirection": "up",
            "entryPriceText": "2,685,000원 (당일 종가 기준)",
            "entryPrice": 2685000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1913.6059,
            "marketCapRank": 2,
            "marketCapUniverseCount": 2558,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 74,908주 / 기관 341,331주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 114.0,
              "note": "토스 공개 체결강도 114.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A000660/order",
              "asOf": "2026-06-18T08:32:34Z",
              "intradayAbove100Ratio": 6.7,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 21.8,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 21.4,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1.6632,
              "last30BuyVolume": 484.0,
              "last30SellVolume": 291.0
            },
            "orderbook": {
              "bidAskRatio": 1.5704,
              "bidTotal": 48229,
              "askTotal": 30712,
              "note": "Naver 호가잔량합계 매수 48,229 / 매도 30,712",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 80.25, ATR10 9.45%, 일간 표준편차 6.18%, 당일 레인지 7.22%.",
              "metrics": {
                "atrPct10": 9.45,
                "returnStd20": 6.18,
                "todayRangePct": 7.22,
                "vkospi": 80.25
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
              "referencePrice": 2523000,
              "referenceBandLow": 2523000,
              "referenceBandHigh": 2523000,
              "entryDayOpenPrice": 2556000,
              "fallbackStopPrice": 2550750,
              "effectiveHardStopPrice": 2550750,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 2,523,000원와 기존 % 손절 2,550,750원 중 더 높은 2,550,750원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 2,523,000원이며, 기존 % 손절 2,550,750원보다 느슨해지지 않게 2,550,750원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.0%",
                "targetPrice": "2,738,000원",
                "historicalHitRate": 0.6195,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "2,872,950원",
                "historicalHitRate": 0.4336,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "2,980,350원",
                "historicalHitRate": 0.3274,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "3,087,750원",
                "historicalHitRate": 0.2832,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "3,222,000원",
                "historicalHitRate": 0.1963,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 2,550,750원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-5.0%",
                "targetPrice": "2,550,750원"
              }
            ],
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 2666205,
              "high": 2693055,
              "anchor": 2685000,
              "label": "2,666,205~2,693,055원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 2738000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "2,792,400원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,872,950원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "2,980,350원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "3,087,750원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "3,222,000원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,550,750원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "2,550,750원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 2738000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "2,738,000원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,872,950원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "2,980,350원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "3,087,750원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "3,222,000원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,550,750원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "2,550,750원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
                "nearestResistancePrice": 2738000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "2,738,000원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "2,872,950원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "2,980,350원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "3,087,750원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "3,222,000원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,550,750원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "2,550,750원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
              "sampleCount": 20,
              "ev": -0.8152
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 107건)",
              "hitRate": 0.1963,
              "ev": 1.764,
              "sampleCount": 107
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
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 105% (필요 ≥ 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 105% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 2685000.0,
                "vs52wHighPct": 98.06428049671293,
                "vs52wLowPct": 1009.5041322314049,
                "dropFrom52wHighPct": 1.935719503287071,
                "ma20GapPct": 22.226015705018778,
                "rsi14": 71.97926264836559,
                "volumeRatio20d": 104.95316889445454,
                "rs20Pct": 53.86819484240688,
                "tradingValueRank": 1.0,
                "marketCapRank": 2.0,
                "marketCapTrillion": 1913.6059,
                "per": 25.94,
                "pbr": 11.29,
                "cnsPer": 8.8,
                "foreignRate": 51.3,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": 2180.0
              },
              "evaluatedAt": "2026-06-18T17:33:32+09:00",
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
            "strictScore": 4.9,
            "signalScore": 4.9,
            "score": 4.9,
            "scoreMax": 12.5,
            "effectiveScoreMax": 11.5,
            "gradeScore": 4.3,
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
                "note": "외인 65,417주 / 기관 15,154주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "당일 평균 94.0% / 100% 유지 75.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 96.6% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.12,
                "signalPoints": 1.12,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 거래량 / 20일 평균 214% · 강한 급증 (≥200%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 96.6% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.75,
                "signalPoints": 0.75,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 83% / 윗꼬리·몸통 0.17 · 강마감 기준 충족"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.54 (필요 ≥ 1.2)"
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
                "note": "5일 초과 +25.9% / 20일 초과 +172.8%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 96.6% (필요 ≥ 90%)",
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
                "note": "당일 거래량 / 20일 평균 214% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 83% / 윗꼬리·몸통 0.17 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "⛔",
                "note": "당일 등락 +25.56% (필요 ≤ +12%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 190,100 / 5MA 151,640 (전일 5MA 140,280) · 5MA 위·우상향",
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
                "note": "외인 65,417주 / 기관 15,154주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 96.6% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 96.6% (필요 ≥ 95%)",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 94.0% / 100% 유지 75.0% (필요 ≥110%·≥70%)",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 214% · 강한 급증 (≥200%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 83% / 윗꼬리·몸통 0.17 · 강마감 기준 충족",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.54 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 추이 데이터 부족 (대형주만 수집)",
                "evalStatus": "data_missing"
              }
            ],
            "currentPrice": 190100,
            "previousClose": 151400,
            "dailyChange": 38700,
            "dailyChangePct": 25.56,
            "dailyDirection": "up",
            "entryPriceText": "190,100원 (당일 종가 기준)",
            "entryPrice": 190100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.9761,
            "marketCapRank": 234,
            "marketCapUniverseCount": 2558,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 65,417주 / 기관 15,154주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 94.0,
              "note": "토스 공개 체결강도 94.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001820/order",
              "asOf": "2026-06-18T08:32:34Z",
              "intradayAbove100Ratio": 75.0,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 226.9,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 246.3,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.6516,
              "last30BuyVolume": 101.0,
              "last30SellVolume": 155.0
            },
            "orderbook": {
              "bidAskRatio": 0.5368,
              "bidTotal": 8242,
              "askTotal": 15353,
              "note": "Naver 호가잔량합계 매수 8,242 / 매도 15,353",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=001820"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 80.25, ATR10 18.20%, 일간 표준편차 14.28%, 당일 레인지 32.50%.",
              "metrics": {
                "atrPct10": 18.2,
                "returnStd20": 14.28,
                "todayRangePct": 32.5,
                "vkospi": 80.25
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
              "referencePrice": 172800,
              "referenceBandLow": 172800,
              "referenceBandHigh": 172800,
              "entryDayOpenPrice": 149500,
              "fallbackStopPrice": 180595,
              "effectiveHardStopPrice": 180595,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 172,800원와 기존 % 손절 180,595원 중 더 높은 180,595원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 172,800원이며, 기존 % 손절 180,595원보다 느슨해지지 않게 180,595원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+3.5%",
                "targetPrice": "196,800원",
                "historicalHitRate": 0.6195,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+7.0% 도달",
                "quantity": "15% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "203,407원",
                "historicalHitRate": 0.4336,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "211,011원",
                "historicalHitRate": 0.3274,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "218,615원",
                "historicalHitRate": 0.2832,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "228,120원",
                "historicalHitRate": 0.1963,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 180,595원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-5.0%",
                "targetPrice": "180,595원"
              }
            ],
            "rr": "1 : 2.5",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 188769,
              "high": 190670,
              "anchor": 190100,
              "label": "188,769~190,670원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 196800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "197,704원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "203,407원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "211,011원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "218,615원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "228,120원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 180,595원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "180,595원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 196800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "196,800원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "203,407원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "211,011원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "218,615원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "228,120원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 180,595원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "180,595원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
                "nearestResistancePrice": 196800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "196,800원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "203,407원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "211,011원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "218,615원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "228,120원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 180,595원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-5.0%",
                    "targetPrice": "180,595원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
              "sampleCount": 20,
              "ev": -0.8152
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 107건)",
              "hitRate": 0.1963,
              "ev": 1.764,
              "sampleCount": 107
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
            "statusReasonShort": "G6 미충족: 당일 등락 +25.56% (필요 ≤ +12%)",
            "statusReason": "G6 미충족: 당일 등락 +25.56% (필요 ≤ +12%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 190100.0,
                "vs52wHighPct": 96.59552845528455,
                "vs52wLowPct": 661.9238476953908,
                "dropFrom52wHighPct": 3.404471544715447,
                "ma20GapPct": 52.34813271357589,
                "rsi14": 76.13358496305601,
                "volumeRatio20d": 213.6125072079278,
                "rs20Pct": 197.4960876369327,
                "tradingValueRank": 13.0,
                "marketCapRank": 234.0,
                "marketCapTrillion": 1.9761,
                "per": 144.45,
                "pbr": 7.08,
                "cnsPer": 0.0,
                "foreignRate": 9.66,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-18T17:33:32+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 3,
            "name": "삼성전자",
            "code": "005930",
            "strictScore": 4.8,
            "signalScore": 4.8,
            "score": 4.8,
            "scoreMax": 12.5,
            "effectiveScoreMax": 12.5,
            "gradeScore": 3.8,
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
                "note": "외인 -2,000,080주 / 기관 1,133,803주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 135.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "20일 고점 대비 98.0% (미돌파 시 필요 ≥ 95%)"
              },
              {
                "code": "P2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 20일 평균 104% (필요 ≥ 150%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "종가 / 당일 고가 99.9% (필요 ≥ 95%)"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "몸통 95% / 윗꼬리·몸통 0.03 · 완벽한 강마감"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.82 (필요 ≥ 1.2)"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 +20.0% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족"
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
                "note": "5일 초과 +4.5% / 20일 초과 +6.9%",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 96.2% (필요 ≥ 90%)",
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
                "status": "⛔",
                "note": "당일 거래량 / 20일 평균 104% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "✅",
                "note": "몸통 95% / 윗꼬리·몸통 0.03 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "G6",
                "status": "✅",
                "note": "당일 등락 +4.62% (필요 ≤ +12%)",
                "evalStatus": "met"
              },
              {
                "code": "G7",
                "status": "✅",
                "note": "종가 362,500 / 5MA 342,300 (전일 5MA 329,600) · 5MA 위·우상향",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 135.0% / 100% 유지 100.0% (필요 ≥110%·≥70%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "20일 고점 대비 98.0% (미돌파 시 필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "종가 / 당일 고가 99.9% (필요 ≥ 95%)",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "몸통 95% / 윗꼬리·몸통 0.03 · 완벽한 강마감",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +20.0% (최근 10거래일) (증가 ≥10% 만점·5~10% 부분, 숏스퀴즈 동력) · 충족",
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
                "note": "외인 -2,000,080주 / 기관 1,133,803주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "P2",
                "note": "당일 거래량 / 20일 평균 104% (필요 ≥ 150%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "매수/매도 호가잔량 0.82 (필요 ≥ 1.2)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 362500,
            "previousClose": 346500,
            "dailyChange": 16000,
            "dailyChangePct": 4.62,
            "dailyDirection": "up",
            "entryPriceText": "362,500원 (당일 종가 기준)",
            "entryPrice": 362500,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 2119.276,
            "marketCapRank": 1,
            "marketCapUniverseCount": 2558,
            "keyPoint": "주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 -2,000,080주 / 기관 1,133,803주. 고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 135.0,
              "note": "토스 공개 체결강도 135.0% / 최근 체결 41분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A005930/order",
              "asOf": "2026-06-18T08:32:34Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 41,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 41분 프록시",
              "lastHourAvgStrength": 298.2,
              "lastHourObservedMinutes": 41,
              "last30AvgStrength": 300.0,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 1305.0,
              "last30BuyVolume": 1305.0,
              "last30SellVolume": 0.0
            },
            "orderbook": {
              "bidAskRatio": 0.8162,
              "bidTotal": 474212,
              "askTotal": 581003,
              "note": "Naver 호가잔량합계 매수 474,212 / 매도 581,003",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=005930"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "unfavorable",
              "scoreDelta": -1.0,
              "summary": "불리 (고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다. VKOSPI 80.25, ATR10 7.70%, 일간 표준편차 5.35%, 당일 레인지 5.34%.",
              "metrics": {
                "atrPct10": 7.7,
                "returnStd20": 5.35,
                "todayRangePct": 5.34,
                "vkospi": 80.25
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
              "referencePrice": 354500,
              "referenceBandLow": 354500,
              "referenceBandHigh": 354500,
              "entryDayOpenPrice": 345000,
              "fallbackStopPrice": 344375,
              "effectiveHardStopPrice": 354500,
              "openExitCheckCutoff": "10:00",
              "microTrendBarUnit": "3m",
              "microTrendShortMa": 8,
              "microTrendLongMa": 10,
              "hardStopRuleSummary": "직전 돌파 저항 밴드 354,500원와 기존 % 손절 344,375원 중 더 높은 354,500원을 하드 스톱으로 사용합니다.",
              "openExitRuleSummary": "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다.",
              "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
              "reasonSummary": "돌파 기준선은 직전 돌파 저항 밴드 354,500원이며, 기존 % 손절 344,375원보다 느슨해지지 않게 354,500원으로 고정합니다."
            },
            "tradePlanRows": [
              {
                "stage": "🌅 프리마켓",
                "stageKey": "premarket",
                "condition": "상단 매물대 1 도달",
                "quantity": "15% 익절",
                "targetYield": "+0.1%",
                "targetPrice": "363,000원",
                "historicalHitRate": 0.6195,
                "recommended": false
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "15% 익절",
                "targetYield": "+2.1%",
                "targetPrice": "370,000원",
                "historicalHitRate": 0.4336,
                "recommended": false
              },
              {
                "stage": "📈 장중 1차",
                "stageKey": "intraday1",
                "condition": "+11.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.0%",
                "targetPrice": "402,375원",
                "historicalHitRate": 0.3274,
                "recommended": false
              },
              {
                "stage": "📈 장중 2차",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "25% 익절",
                "targetYield": "+15.0%",
                "targetPrice": "416,875원",
                "historicalHitRate": 0.2832,
                "recommended": false
              },
              {
                "stage": "📊 스윙 전환",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+20.0%",
                "targetPrice": "435,000원",
                "historicalHitRate": 0.1963,
                "recommended": true
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 354,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.2%",
                "targetPrice": "354,500원"
              }
            ],
            "rr": "1 : 5.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 359962,
              "high": 363587,
              "anchor": 362500,
              "label": "359,962~363,587원 (종가 ±, 분할매수)"
            },
            "breakoutTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 363000,
                "secondaryResistancePrice": 370000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+4.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "377,000원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+7.0% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "387,875원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "402,375원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "416,875원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "435,000원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 354,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.2%",
                    "targetPrice": "354,500원"
                  }
                ],
                "trailingActivationPct": 8.0,
                "trailingBufferPct": 3.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 / 상단 매물대 2 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 363000,
                "secondaryResistancePrice": 370000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "363,000원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "370,000원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "402,375원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "416,875원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "435,000원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 354,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.2%",
                    "targetPrice": "354,500원"
                  }
                ],
                "trailingActivationPct": 6.0,
                "trailingBufferPct": 2.5,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
                "nearestResistancePrice": 363000,
                "secondaryResistancePrice": 370000,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "363,000원",
                    "historicalHitRate": 0.6195,
                    "recommended": false
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.1%",
                    "targetPrice": "370,000원",
                    "historicalHitRate": 0.4336,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "+11.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.0%",
                    "targetPrice": "402,375원",
                    "historicalHitRate": 0.3274,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 2차",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "25% 익절",
                    "targetYield": "+15.0%",
                    "targetPrice": "416,875원",
                    "historicalHitRate": 0.2832,
                    "recommended": false
                  },
                  {
                    "stage": "📊 스윙 전환",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+20.0%",
                    "targetPrice": "435,000원",
                    "historicalHitRate": 0.1963,
                    "recommended": true
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 354,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.2%",
                    "targetPrice": "354,500원"
                  }
                ],
                "trailingActivationPct": 4.5,
                "trailingBufferPct": 2.0,
                "recommendedStage": {
                  "stageKey": "swing",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 107건)",
                  "hitRate": 0.1963,
                  "ev": 1.764,
                  "sampleCount": 107
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
              "sampleCount": 20,
              "ev": -0.8152
            },
            "recommendedStage": {
              "stageKey": "swing",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 107건)",
              "hitRate": 0.1963,
              "ev": 1.764,
              "sampleCount": 107
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
            "statusReasonShort": "G4 미충족: 당일 거래량 / 20일 평균 104% (필요 ≥ 150%)",
            "statusReason": "G4 미충족: 당일 거래량 / 20일 평균 104% (필요 ≥ 150%)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 362500.0,
                "vs52wHighPct": 96.15384615384616,
                "vs52wLowPct": 529.3402777777777,
                "dropFrom52wHighPct": 3.8461538461538463,
                "ma20GapPct": 13.086881921697083,
                "rsi14": 65.55701260801658,
                "volumeRatio20d": 104.00137706366597,
                "rs20Pct": 31.57894736842105,
                "tradingValueRank": 2.0,
                "marketCapRank": 1.0,
                "marketCapTrillion": 2119.276,
                "per": 29.3,
                "pbr": 5.04,
                "cnsPer": 8.17,
                "foreignRate": 47.57,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": 20.0
              },
              "evaluatedAt": "2026-06-18T17:33:32+09:00",
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
            "name": "NAVER",
            "code": "035420",
            "strictScore": 9.0,
            "signalScore": 9.0,
            "score": 9.0,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 6.4,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 142,287주 / 기관 29,639주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +142,287 / 전일 +22,311 · 기관 당일 +29,639 / 전일 -158,472 · 당일 양매수 + 전일 수급 유입"
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
                "note": "당일 평균 58.0% / 마지막 1시간 225.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,282,820주 · 동반 양수 2/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 / 20MA 99.8% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 243,100 / 20MA 235,465 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 51% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 -3.49% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -3.49% / KOSPI +2.25% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 10.75:1 · 평균 체결강도 218.2% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +126.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 +22,311/당일 +142,287 · 기관 전일 -158,472/당일 +29,639 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 235,000 / 60MA 217,282",
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
                "note": "거래대금 TOP100 순위 30",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 34% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 35.0% (≥25%) · 20일 수익률 +18.6% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 9,064 / 5MA 8,665 (+4.6%) · VKOSPI 80.2 · 거시·레짐 완화",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 142,287주 / 기관 29,639주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +142,287 / 전일 +22,311 · 기관 당일 +29,639 / 전일 -158,472 · 당일 양매수 + 전일 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 225.0% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S4",
                "note": "당일 평균 58.0% / 마지막 1시간 225.0% (필요 마지막 1시간 > 당일 평균) · 장후반 매수세 강화",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,282,820주 · 동반 양수 2/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 99.8% (필요 98~102%)",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 243,100 / 20MA 235,465 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 51% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 10.75:1 · 평균 체결강도 218.2% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "당일 등락 -3.49% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -3.49% / KOSPI +2.25% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +126.8% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 235000,
            "previousClose": 243500,
            "dailyChange": -8500,
            "dailyChangePct": -3.49,
            "dailyDirection": "down",
            "entryPriceText": "235,000원 (당일 종가 기준)",
            "entryPrice": 235000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 36.8686,
            "marketCapRank": 23,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 142,287주 / 기관 29,639주 / 마지막 1시간 225.0% · 장후반 매수세 강화 · 마지막 30분 틱 10.75:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 58.0,
              "note": "토스 공개 체결강도 58.0% / 최근 체결 40분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A035420/order",
              "asOf": "2026-06-18T08:32:32Z",
              "intradayAbove100Ratio": 75.0,
              "observedMinutes": 40,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 40분 프록시",
              "lastHourAvgStrength": 225.0,
              "lastHourObservedMinutes": 40,
              "last30AvgStrength": 218.2,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 10.75,
              "last30BuyVolume": 86.0,
              "last30SellVolume": 8.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 80.25, ATR10 10.70%, 일간 표준편차 6.85%, 당일 레인지 2.87%.",
              "metrics": {
                "atrPct10": 10.7,
                "returnStd20": 6.85,
                "todayRangePct": 2.87,
                "vkospi": 80.25
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 1282820.0,
              "positiveDays": 2,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260617",
                    "net": 142287.0
                  },
                  {
                    "date": "20260616",
                    "net": 22311.0
                  },
                  {
                    "date": "20260615",
                    "net": -69257.0
                  },
                  {
                    "date": "20260612",
                    "net": 654497.0
                  },
                  {
                    "date": "20260611",
                    "net": -183804.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260617",
                    "net": 29639.0
                  },
                  {
                    "date": "20260616",
                    "net": -158472.0
                  },
                  {
                    "date": "20260615",
                    "net": -19191.0
                  },
                  {
                    "date": "20260612",
                    "net": 750508.0
                  },
                  {
                    "date": "20260611",
                    "net": 114302.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260617",
                    "net": 171926.0
                  },
                  {
                    "date": "20260616",
                    "net": -136161.0
                  },
                  {
                    "date": "20260615",
                    "net": -88448.0
                  },
                  {
                    "date": "20260612",
                    "net": 1405005.0
                  },
                  {
                    "date": "20260611",
                    "net": -69502.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,282,820주 · 동반 양수 2/5일 · 증가 2회"
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
                "targetYield": "+2.6%",
                "targetPrice": "241,000원",
                "historicalHitRate": 0.6905,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+5.3%",
                "targetPrice": "247,500원",
                "historicalHitRate": 0.4048,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "251,450원",
                "historicalHitRate": 0.244,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "258,500원",
                "historicalHitRate": 0.1429,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "267,900원",
                "historicalHitRate": 0.0818,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 239,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "+1.9%",
                "targetPrice": "239,500원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260617",
              "anchorOpen": 239500,
              "anchorClose": 243500,
              "anchorVolumeRatio20d": 0.3,
              "anchorStopPrice": 239500,
              "fallbackStopPrice": 226775,
              "effectiveHardStopPrice": 239500,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 239,500원와 기존 % 손절 226,775원 중 더 높은 239,500원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 239,500원를 기준으로 잡고, 기존 % 손절 226,775원보다 느슨해지지 않게 239,500원로 고정합니다."
            },
            "rr": "1 : 4.4",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 233355,
              "high": 235705,
              "anchor": 235000,
              "label": "233,355~235,705원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 241000,
                "secondaryResistancePrice": 247500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "240,875원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "244,400원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "251,450원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "258,500원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "267,900원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 239,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+1.9%",
                    "targetPrice": "239,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "fallback_same_as_aggressive",
                "reasonSummary": "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다.",
                "nearestResistancePrice": 241000,
                "secondaryResistancePrice": 247500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "240,875원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "244,400원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "251,450원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "258,500원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "267,900원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 239,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+1.9%",
                    "targetPrice": "239,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 241000,
                "secondaryResistancePrice": 247500,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.6%",
                    "targetPrice": "241,000원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+5.3%",
                    "targetPrice": "247,500원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "251,450원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "258,500원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "267,900원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 239,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+1.9%",
                    "targetPrice": "239,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.6335
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 168건)",
              "hitRate": 0.6905,
              "ev": 0.496,
              "sampleCount": 168
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
                "currentPrice": 235000.0,
                "vs52wHighPct": 76.17504051863857,
                "vs52wLowPct": 23.165618448637318,
                "dropFrom52wHighPct": 23.824959481361425,
                "ma20GapPct": -0.19748157900324892,
                "rsi14": 50.668853707166306,
                "volumeRatio20d": 33.679736943147205,
                "rs20Pct": 18.62695608278647,
                "tradingValueRank": 30.0,
                "marketCapRank": 23.0,
                "marketCapTrillion": 36.8686,
                "per": 20.4,
                "pbr": 1.19,
                "cnsPer": 18.98,
                "foreignRate": 35.01,
                "supplyTrendScore": 2.0,
                "shortBalanceChangePct": 126.78552580808702
              },
              "evaluatedAt": "2026-06-18T17:33:33+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "한화오션",
            "code": "042660",
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
                "note": "외인 1,530,933주 / 기관 275,336주 · 외인·기관 양매수"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 당일 +1,530,933 / 전일 +343,803 · 기관 당일 +275,336 / 전일 +66,179 · 2일 연속 외인·기관 양매수"
              },
              {
                "code": "S3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "마지막 1시간 평균 체결강도 42.0% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "당일 평균 61.0% / 마지막 1시간 42.0% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,732,535주 · 동반 양수 3/5일 · 증가 4회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 105.3% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 124,700 / 20MA 118,755 · 5MA > 20MA"
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
                "note": "당일 등락 -6.01% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 -5.37% / KOSPI +2.25% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 1.24:1 · 평균 체결강도 42.0% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "대차잔고 +20.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족"
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
                "note": "외인 전일 +343,803/당일 +1,530,933 · 기관 전일 +66,179/당일 +275,336 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 125,100 / 60MA 123,450",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "52주 고가 대비 80.8% (필요 < 92%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "거래대금 TOP100 순위 40",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "당일 거래량 / 20일 평균 103% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "⛔",
                "note": "외인 보유율 11.1% (≥25%) · 20일 수익률 +11.8% (≥0%) · 외인 매집 주체 약함",
                "evalStatus": "not_met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 9,064 / 5MA 8,665 (+4.6%) · VKOSPI 80.2 · 거시·레짐 완화",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 1,530,933주 / 기관 275,336주 · 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "외인 당일 +1,530,933 / 전일 +343,803 · 기관 당일 +275,336 / 전일 +66,179 · 2일 연속 외인·기관 양매수",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,732,535주 · 동반 양수 3/5일 · 증가 4회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 124,700 / 20MA 118,755 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 77% (필요 ≤ 90%)",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 1.24:1 · 평균 체결강도 42.0% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 42.0% (필요 ≥ 100%)",
                "evalStatus": "not_met"
              },
              {
                "code": "S4",
                "note": "당일 평균 61.0% / 마지막 1시간 42.0% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 105.3% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 -6.01% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 -5.37% / KOSPI +2.25% underperform",
                "evalStatus": "not_met"
              },
              {
                "code": "L1",
                "note": "대차잔고 +20.5% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 미충족",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 125100,
            "previousClose": 133100,
            "dailyChange": -8000,
            "dailyChangePct": -6.01,
            "dailyDirection": "down",
            "entryPriceText": "125,100원 (당일 종가 기준)",
            "entryPrice": 125100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 38.3323,
            "marketCapRank": 21,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 1,530,933주 / 기관 275,336주 / 마지막 1시간 42.0% · 마지막 30분 틱 1.24:1. 기관+외국인 최근 5일 동반 매집 추세 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 61.0,
              "note": "토스 공개 체결강도 61.0% / 최근 체결 26분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A042660/order",
              "asOf": "2026-06-18T08:32:38Z",
              "intradayAbove100Ratio": 33.3,
              "observedMinutes": 26,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 26분 프록시",
              "lastHourAvgStrength": 42.0,
              "lastHourObservedMinutes": 26,
              "last30AvgStrength": 42.0,
              "last30ObservedMinutes": 26,
              "last30BuySellRatio": 1.2417,
              "last30BuyVolume": 2101.0,
              "last30SellVolume": 1692.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 80.25, ATR10 8.41%, 일간 표준편차 5.73%, 당일 레인지 7.66%.",
              "metrics": {
                "atrPct10": 8.41,
                "returnStd20": 5.73,
                "todayRangePct": 7.66,
                "vkospi": 80.25
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "both",
              "cumulativeNet": 1732535.0,
              "positiveDays": 3,
              "improvementCount": 4,
              "series": {
                "foreign": [
                  {
                    "date": "20260617",
                    "net": 1530933.0
                  },
                  {
                    "date": "20260616",
                    "net": 343803.0
                  },
                  {
                    "date": "20260615",
                    "net": 149925.0
                  },
                  {
                    "date": "20260612",
                    "net": -373217.0
                  },
                  {
                    "date": "20260611",
                    "net": -289104.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260617",
                    "net": 275336.0
                  },
                  {
                    "date": "20260616",
                    "net": 66179.0
                  },
                  {
                    "date": "20260615",
                    "net": 120690.0
                  },
                  {
                    "date": "20260612",
                    "net": 48015.0
                  },
                  {
                    "date": "20260611",
                    "net": -140025.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260617",
                    "net": 1806269.0
                  },
                  {
                    "date": "20260616",
                    "net": 409982.0
                  },
                  {
                    "date": "20260615",
                    "net": 270615.0
                  },
                  {
                    "date": "20260612",
                    "net": -325202.0
                  },
                  {
                    "date": "20260611",
                    "net": -429129.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관+외국인 최근 5일 동반 매집 추세",
              "note": "기관+외국인 최근 5일 동반 매집 추세 · 합산 누적 +1,732,535주 · 동반 양수 3/5일 · 증가 4회"
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
                "targetYield": "+0.1%",
                "targetPrice": "125,200원",
                "historicalHitRate": 0.6905,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "상단 매물대 2 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.7%",
                "targetPrice": "139,700원",
                "historicalHitRate": 0.4048,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+11.7%",
                "targetPrice": "139,700원",
                "historicalHitRate": 0.244,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+11.7%",
                "targetPrice": "139,700원",
                "historicalHitRate": 0.1429,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "142,614원",
                "historicalHitRate": 0.0818,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 129,300원 종가 이탈",
                "quantity": "전량",
                "targetYield": "+3.4%",
                "targetPrice": "129,300원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "both",
              "anchorDate": "20260617",
              "anchorOpen": 129300,
              "anchorClose": 133100,
              "anchorVolumeRatio20d": 3.3,
              "anchorStopPrice": 129300,
              "fallbackStopPrice": 120722,
              "effectiveHardStopPrice": 129300,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 129,300원와 기존 % 손절 120,722원 중 더 높은 129,300원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "외인·기관 매집 시작 봉(-) 시가 129,300원를 기준으로 잡고, 기존 % 손절 120,722원보다 느슨해지지 않게 129,300원로 고정합니다."
            },
            "rr": "1 : 3.1",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 124224,
              "high": 125475,
              "anchor": 125100,
              "label": "124,224~125,475원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 125200,
                "secondaryResistancePrice": 139700,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "128,227원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "130,104원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "133,857원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "137,610원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "142,614원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 129,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+3.4%",
                    "targetPrice": "129,300원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 125200,
                "secondaryResistancePrice": 139700,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "125,200원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "130,104원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "133,857원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "137,610원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "142,614원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 129,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+3.4%",
                    "targetPrice": "129,300원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 125200,
                "secondaryResistancePrice": 139700,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+0.1%",
                    "targetPrice": "125,200원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.7%",
                    "targetPrice": "139,700원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+11.7%",
                    "targetPrice": "139,700원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+11.7%",
                    "targetPrice": "139,700원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "142,614원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 129,300원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "+3.4%",
                    "targetPrice": "129,300원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.6335
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 168건)",
              "hitRate": 0.6905,
              "ev": 0.496,
              "sampleCount": 168
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
              "매매금지(핵심 Gate 미충족: Q1)",
              "등급 C — 진입 최소 A, B, S"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "Q1 미충족: 외인 보유율 11.1% (≥25%) · 20일 수익률 +11.8% (≥0%) · 외인 매집 주체 약함",
            "statusReason": "Q1 미충족: 외인 보유율 11.1% (≥25%) · 20일 수익률 +11.8% (≥0%) · 외인 매집 주체 약함",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 125100.0,
                "vs52wHighPct": 80.81395348837209,
                "vs52wLowPct": 74.96503496503496,
                "dropFrom52wHighPct": 19.186046511627907,
                "ma20GapPct": 5.342932929139826,
                "rsi14": 53.477819737107694,
                "volumeRatio20d": 103.4134429278494,
                "rs20Pct": 11.796246648793565,
                "tradingValueRank": 40.0,
                "marketCapRank": 21.0,
                "marketCapTrillion": 38.3323,
                "per": 25.05,
                "pbr": 5.62,
                "cnsPer": 24.78,
                "foreignRate": 11.11,
                "supplyTrendScore": 4.0,
                "shortBalanceChangePct": 20.462771483895928
              },
              "evaluatedAt": "2026-06-18T17:33:33+09:00",
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
            "strictScore": 8.1,
            "signalScore": 8.1,
            "score": 8.1,
            "scoreMax": 14.0,
            "effectiveScoreMax": 14.0,
            "gradeScore": 5.8,
            "grade": "B",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 -205,001주 / 기관 163,170주 · 양매수 아님"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 당일 -205,001 / 전일 -98,844 · 기관 당일 +163,170 / 전일 +168,107 · 2일 연속 수급 유입 미확인"
              },
              {
                "code": "S3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "마지막 1시간 평균 체결강도 105.1% (필요 ≥ 100%)"
              },
              {
                "code": "S4",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 0.5,
                "evalStatus": "not_met",
                "note": "당일 평균 128.0% / 마지막 1시간 105.1% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인"
              },
              {
                "code": "S5",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "기관 최근 5일 누적 +1,321,536주 · 양수 4/5일 · 증가 2회"
              },
              {
                "code": "P1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.5,
                "evalStatus": "not_met",
                "note": "종가 / 20MA 131.2% (필요 98~102%)"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "5MA 1,513,600 / 20MA 1,295,350 · 5MA > 20MA"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 100% (필요 ≤ 90%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 등락 +6.52% (필요 -3% ~ +5%)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "동종업종 평균 +0.88% / KOSPI +2.25% underperform"
              },
              {
                "code": "C4",
                "strictPoints": 0.5,
                "signalPoints": 0.5,
                "maxPoints": 0.5,
                "evalStatus": "met",
                "note": "마지막 30분 틱프록시 매수/매도 5.48:1 · 평균 체결강도 101.2% (필요 ≥ 1.1:1) · 장마감 매수 우위"
              },
              {
                "code": "L1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "대차잔고 -65.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족"
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
                "note": "외인 전일 -98,844/당일 -205,001 · 기관 전일 +168,107/당일 +163,170 · 2일 연속 수급 유입",
                "evalStatus": "met"
              },
              {
                "code": "G1",
                "status": "✅",
                "note": "종가 1,700,000 / 60MA 936,167",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⚠️",
                "note": "52주 고가 대비 97.8% (필요 < 92%)",
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
                "note": "당일 거래량 / 20일 평균 117% (필요 < 150%)",
                "evalStatus": "met"
              },
              {
                "code": "Q1",
                "status": "✅",
                "note": "외인 보유율 48.2% (≥25%) · 20일 수익률 +66.7% (≥0%) · 매집 주체 존재+가격 지탱",
                "evalStatus": "met"
              },
              {
                "code": "G5",
                "status": "⚠️",
                "note": "KOSPI 9,064 / 5MA 8,665 (+4.6%) · VKOSPI 80.2 · 거시·레짐 완화",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S3",
                "note": "마지막 1시간 평균 체결강도 105.1% (필요 ≥ 100%)",
                "evalStatus": "met"
              },
              {
                "code": "S5",
                "note": "기관 최근 5일 누적 +1,321,536주 · 양수 4/5일 · 증가 2회",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "5MA 1,513,600 / 20MA 1,295,350 · 5MA > 20MA",
                "evalStatus": "met"
              },
              {
                "code": "C4",
                "note": "마지막 30분 틱프록시 매수/매도 5.48:1 · 평균 체결강도 101.2% (필요 ≥ 1.1:1) · 장마감 매수 우위",
                "evalStatus": "met"
              },
              {
                "code": "L1",
                "note": "대차잔고 -65.4% (최근 10거래일) (감소 ≥10% 만점·5~10% 부분, 클린 매집 징후) · 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S1",
                "note": "외인 -205,001주 / 기관 163,170주 · 양매수 아님",
                "evalStatus": "not_met"
              },
              {
                "code": "S2",
                "note": "외인 당일 -205,001 / 전일 -98,844 · 기관 당일 +163,170 / 전일 +168,107 · 2일 연속 수급 유입 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "S4",
                "note": "당일 평균 128.0% / 마지막 1시간 105.1% (필요 마지막 1시간 > 당일 평균) · 장후반 강화 미확인",
                "evalStatus": "not_met"
              },
              {
                "code": "P1",
                "note": "종가 / 20MA 131.2% (필요 98~102%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 100% (필요 ≤ 90%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "당일 등락 +6.52% (필요 -3% ~ +5%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "동종업종 평균 +0.88% / KOSPI +2.25% underperform",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 1700000,
            "previousClose": 1596000,
            "dailyChange": 104000,
            "dailyChangePct": 6.52,
            "dailyDirection": "up",
            "entryPriceText": "1,700,000원 (당일 종가 기준)",
            "entryPrice": 1700000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 224.3293,
            "marketCapRank": 3,
            "marketCapUniverseCount": 2558,
            "keyPoint": "수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 -205,001주 / 기관 163,170주 / 마지막 1시간 105.1% · 마지막 30분 틱 5.48:1. 기관 최근 5일 매집 추세 강화 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
            "notes": [],
            "toss": {
              "avgStrength": 128.0,
              "note": "토스 공개 체결강도 128.0% / 최근 체결 37분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A402340/order",
              "asOf": "2026-06-18T08:32:33Z",
              "intradayAbove100Ratio": 40.0,
              "observedMinutes": 37,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 37분 프록시",
              "lastHourAvgStrength": 105.1,
              "lastHourObservedMinutes": 37,
              "last30AvgStrength": 101.2,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 5.4839,
              "last30BuyVolume": 8160.0,
              "last30SellVolume": 1488.0
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 0.75,
              "summary": "유리 (고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다. VKOSPI 80.25, ATR10 10.55%, 일간 표준편차 6.56%, 당일 레인지 7.21%.",
              "metrics": {
                "atrPct10": 10.55,
                "returnStd20": 6.56,
                "todayRangePct": 7.21,
                "vkospi": 80.25
              },
              "strategyLabel": "수급매집형"
            },
            "accumulationTrend": {
              "lookbackDays": 5,
              "sponsor": "institution",
              "cumulativeNet": 1321536.0,
              "positiveDays": 4,
              "improvementCount": 2,
              "series": {
                "foreign": [
                  {
                    "date": "20260617",
                    "net": -205001.0
                  },
                  {
                    "date": "20260616",
                    "net": -98844.0
                  },
                  {
                    "date": "20260615",
                    "net": 132963.0
                  },
                  {
                    "date": "20260612",
                    "net": -513309.0
                  },
                  {
                    "date": "20260611",
                    "net": -491623.0
                  }
                ],
                "institution": [
                  {
                    "date": "20260617",
                    "net": 163170.0
                  },
                  {
                    "date": "20260616",
                    "net": 168107.0
                  },
                  {
                    "date": "20260615",
                    "net": -226773.0
                  },
                  {
                    "date": "20260612",
                    "net": 716022.0
                  },
                  {
                    "date": "20260611",
                    "net": 501010.0
                  }
                ],
                "sponsor": [
                  {
                    "date": "20260617",
                    "net": 163170.0
                  },
                  {
                    "date": "20260616",
                    "net": 168107.0
                  },
                  {
                    "date": "20260615",
                    "net": -226773.0
                  },
                  {
                    "date": "20260612",
                    "net": 716022.0
                  },
                  {
                    "date": "20260611",
                    "net": 501010.0
                  }
                ]
              },
              "status": "met",
              "score": 1.0,
              "summary": "기관 최근 5일 매집 추세 강화",
              "note": "기관 최근 5일 누적 +1,321,536주 · 양수 4/5일 · 증가 2회"
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
                "targetPrice": "1,738,000원",
                "historicalHitRate": 0.6905,
                "recommended": true
              },
              {
                "stage": "2차 익절",
                "stageKey": "openPhase",
                "condition": "+4.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+4.0%",
                "targetPrice": "1,768,000원",
                "historicalHitRate": 0.4048,
                "recommended": false
              },
              {
                "stage": "3차 익절",
                "stageKey": "intraday1",
                "condition": "+7.0% 도달",
                "quantity": "20% 익절",
                "targetYield": "+7.0%",
                "targetPrice": "1,819,000원",
                "historicalHitRate": 0.244,
                "recommended": false
              },
              {
                "stage": "4차 익절",
                "stageKey": "intraday2",
                "condition": "추세 유지 시",
                "quantity": "20% 익절",
                "targetYield": "+10.0%",
                "targetPrice": "1,870,000원",
                "historicalHitRate": 0.1429,
                "recommended": false
              },
              {
                "stage": "추세 홀딩",
                "stageKey": "swing",
                "condition": "V 조건 충족 시",
                "quantity": "25% 익절",
                "targetYield": "+14.0%",
                "targetPrice": "1,938,000원",
                "historicalHitRate": 0.0818,
                "recommended": false
              },
              {
                "stage": "손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 1,640,500원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-3.5%",
                "targetPrice": "1,640,500원"
              }
            ],
            "accumulationStopPolicy": {
              "version": "accumulation-stop-v1-live",
              "anchorSource": "prior_sponsor_candle",
              "sponsorMode": "institution",
              "anchorDate": "20260617",
              "anchorOpen": 1534000,
              "anchorClose": 1596000,
              "anchorVolumeRatio20d": 1.0,
              "anchorStopPrice": 1534000,
              "fallbackStopPrice": 1640500,
              "effectiveHardStopPrice": 1640500,
              "openExitCheckCutoff": "10:00",
              "openExitMode": "flow_and_price_confirm",
              "openExitRuleSummary": "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다.",
              "hardStopRuleSummary": "당일 매집 시작 봉 시가 1,534,000원와 기존 % 손절 1,640,500원 중 더 높은 1,640,500원를 하드 스톱으로 사용합니다.",
              "marketShockHoldRuleSummary": "갭 등급 G-B 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다.",
              "reasonSummary": "기관 매집 시작 봉(-) 시가 1,534,000원를 기준으로 잡고, 기존 % 손절 1,640,500원보다 느슨해지지 않게 1,640,500원로 고정합니다."
            },
            "rr": "1 : 2.3",
            "source": "jongga-live",
            "recommendedEntryBand": {
              "low": 1688100,
              "high": 1705100,
              "anchor": 1700000,
              "label": "1,688,100~1,705,100원 (종가 ±, 분할매수)"
            },
            "accumulationTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "기본 목표형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
                "nearestResistancePrice": 1738000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "+2.5% 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.5%",
                    "targetPrice": "1,742,500원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,768,000원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,819,000원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,870,000원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,938,000원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,640,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,640,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              },
              {
                "profileKey": "balanced",
                "label": "1차 저항 반영형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "상단 매물대 1 저항만 앞단 목표가에 반영합니다.",
                "nearestResistancePrice": 1738000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "1,738,000원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,768,000원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,819,000원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,870,000원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,938,000원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,640,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,640,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              },
              {
                "profileKey": "conservative",
                "label": "저항 우선형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
                "nearestResistancePrice": 1738000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "1차 익절",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "15% 익절",
                    "targetYield": "+2.2%",
                    "targetPrice": "1,738,000원",
                    "historicalHitRate": 0.6905,
                    "recommended": true
                  },
                  {
                    "stage": "2차 익절",
                    "stageKey": "openPhase",
                    "condition": "+4.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+4.0%",
                    "targetPrice": "1,768,000원",
                    "historicalHitRate": 0.4048,
                    "recommended": false
                  },
                  {
                    "stage": "3차 익절",
                    "stageKey": "intraday1",
                    "condition": "+7.0% 도달",
                    "quantity": "20% 익절",
                    "targetYield": "+7.0%",
                    "targetPrice": "1,819,000원",
                    "historicalHitRate": 0.244,
                    "recommended": false
                  },
                  {
                    "stage": "4차 익절",
                    "stageKey": "intraday2",
                    "condition": "추세 유지 시",
                    "quantity": "20% 익절",
                    "targetYield": "+10.0%",
                    "targetPrice": "1,870,000원",
                    "historicalHitRate": 0.1429,
                    "recommended": false
                  },
                  {
                    "stage": "추세 홀딩",
                    "stageKey": "swing",
                    "condition": "V 조건 충족 시",
                    "quantity": "25% 익절",
                    "targetYield": "+14.0%",
                    "targetPrice": "1,938,000원",
                    "historicalHitRate": 0.0818,
                    "recommended": false
                  },
                  {
                    "stage": "손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 1,640,500원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-3.5%",
                    "targetPrice": "1,640,500원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 168건)",
                  "hitRate": 0.6905,
                  "ev": 0.496,
                  "sampleCount": 168
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "저항 우선형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 24건)",
              "sampleCount": 24,
              "ev": 0.6335
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 168건)",
              "hitRate": 0.6905,
              "ev": 0.496,
              "sampleCount": 168
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
                "currentPrice": 1700000.0,
                "vs52wHighPct": 97.81357882623706,
                "vs52wLowPct": 1198.7012987012986,
                "dropFrom52wHighPct": 2.186421173762946,
                "ma20GapPct": 31.238661365654067,
                "rsi14": 74.41693996541309,
                "volumeRatio20d": 116.8914203259549,
                "rs20Pct": 66.66666666666666,
                "tradingValueRank": 6.0,
                "marketCapRank": 3.0,
                "marketCapTrillion": 224.3293,
                "per": 14.44,
                "pbr": 6.21,
                "cnsPer": 6.14,
                "foreignRate": 48.19,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -65.41179130631394
              },
              "evaluatedAt": "2026-06-18T17:33:33+09:00",
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
            "name": "삼화콘덴서",
            "code": "001820",
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
                "note": "외인 -13,725→65,417 / 기관 24,658→15,154 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 94.0% / 마지막 1시간 226.9% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 190,100 / 20MA 124,780 (152.3% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 86% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 371% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.54 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 190100, 전봉 종가 196800 미달"
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
                "note": "당일 거래대금 순위 13위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 2.0조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-06-12까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-08~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +204.2% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -3.4% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 190,100 / 60MA 82,785",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "✅",
                "note": "최근 5거래일 최저 -3.8% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +52.3% (≤+22%) · RSI14 76 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -13,725→65,417 / 기관 24,658→15,154 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 94.0% / 마지막 1시간 226.9% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 190,100 / 20MA 124,780 (152.3% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 86% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 371% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.54 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 190100, 전봉 종가 196800 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 190100,
            "previousClose": 151400,
            "dailyChange": 38700,
            "dailyChangePct": 25.56,
            "dailyDirection": "up",
            "entryPriceText": "190,100원 (당일 종가 기준)",
            "entryPrice": 190100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 1.9761,
            "marketCapRank": 234,
            "marketCapUniverseCount": 2558,
            "keyPoint": "20일 고점 대비 -3.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-06-12까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 190100, 전봉 종가 196800",
              "latestOpen": 190100.0,
              "latestClose": 190100.0,
              "previousClose": 196800.0
            },
            "toss": {
              "avgStrength": 94.0,
              "note": "토스 공개 체결강도 94.0% / 최근 체결 39분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A001820/order",
              "asOf": "2026-06-18T08:32:34Z",
              "intradayAbove100Ratio": 75.0,
              "observedMinutes": 39,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 39분 프록시",
              "lastHourAvgStrength": 226.9,
              "lastHourObservedMinutes": 39,
              "last30AvgStrength": 246.3,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 0.6516,
              "last30BuyVolume": 101.0,
              "last30SellVolume": 155.0
            },
            "orderbook": {
              "bidAskRatio": 0.5368,
              "bidTotal": 8242,
              "askTotal": 15353,
              "note": "Naver 호가잔량합계 매수 8,242 / 매도 15,353",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=001820"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 80.25, ATR10 18.20%, 일간 표준편차 14.28%, 당일 레인지 32.50%.",
              "metrics": {
                "atrPct10": 18.2,
                "returnStd20": 14.28,
                "todayRangePct": 32.5,
                "vkospi": 80.25
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
                "targetPrice": "195,803원",
                "historicalHitRate": 0.6933,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+3.5%",
                "targetPrice": "196,800원",
                "historicalHitRate": 0.6067,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 186,298원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "186,298원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 147600,
              "fallbackStopPrice": 186298,
              "effectiveHardStopPrice": 186298,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 147,600원와 기존 % 손절 186,298원 중 더 높은 186,298원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 147,600원이며, 기존 % 손절 186,298원보다 느슨해지지 않게 186,298원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 188769,
              "high": 190670,
              "anchor": 190100,
              "label": "188,769~190,670원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 196800,
                "retrace33Price": 192311,
                "retrace50Price": 193450,
                "nearestResistancePrice": 196800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "196,800원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "196,800원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "199,605원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,298원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "186,298원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 196800,
                "retrace33Price": 192311,
                "retrace50Price": 193450,
                "nearestResistancePrice": 196800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "196,800원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "196,800원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,298원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "186,298원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 196800,
                "retrace33Price": 192311,
                "retrace50Price": 193450,
                "nearestResistancePrice": 196800,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "195,803원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "196,800원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 186,298원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "186,298원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
              "sampleCount": 23,
              "ev": 0.771
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 150건)",
              "hitRate": 0.6933,
              "ev": 1.512,
              "sampleCount": 150
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
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 2.0조 (필요 ≥ 5조) · 외 2건",
            "statusReason": "F2 미충족: 시총 2.0조 (필요 ≥ 5조) / G2 미충족: 20일 고점 대비 -3.4% (필요 -5%~-25%) / Q1 미충족: 20MA 이격 +52.3% (≤+22%) · RSI14 76 (≤72) · 20MA 과이격(반등 소진), RSI 과매수",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 190100.0,
                "vs52wHighPct": 96.59552845528455,
                "vs52wLowPct": 661.9238476953908,
                "dropFrom52wHighPct": 3.404471544715447,
                "ma20GapPct": 52.34813271357589,
                "rsi14": 76.13358496305601,
                "volumeRatio20d": 213.6125072079278,
                "rs20Pct": 197.4960876369327,
                "tradingValueRank": 13.0,
                "marketCapRank": 234.0,
                "marketCapTrillion": 1.9761,
                "per": 144.45,
                "pbr": 7.08,
                "cnsPer": 0.0,
                "foreignRate": 9.66,
                "supplyTrendScore": 2.0
              },
              "evaluatedAt": "2026-06-18T17:33:33+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 2,
            "name": "RISE 네트워크인프라",
            "code": "367760",
            "strictScore": 7.0,
            "signalScore": 7.0,
            "score": 7.0,
            "scoreMax": 10.0,
            "effectiveScoreMax": 8.0,
            "gradeScore": 8.8,
            "grade": "S",
            "overnightGapPenalty": 0.0,
            "scoreBreakdown": [
              {
                "code": "S1",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "외인 45,995→-3,557 / 기관 -74,627→37,739 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "manual_required",
                "note": "당일 평균 134.3% · 마지막 1시간 평균 미입력"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 88,720 / 20MA 78,485 (113.0% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "당일 거래량 / 5일 평균 232% (필요 ≥ 200%) · 투매 클라이맥스"
              },
              {
                "code": "C2",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "매수/매도 호가잔량 22.65 (필요 ≥ 1.0) · 하방 흡수 확인"
              },
              {
                "code": "C3",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "직전 30분봉 종가 88720, 전봉 종가 89440 미달"
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
                "note": "당일 거래대금 순위 34위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 0.0조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-06-18까지 위험 공시 없음",
                "evalStatus": "manual_required"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 5거래일(2026-06-08~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +47.8% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -2.0% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 88,720 / 60MA 55,742",
                "evalStatus": "met"
              },
              {
                "code": "G4",
                "status": "⛔",
                "note": "최근 5거래일 최저 -0.4% (필요 -3% 이하 급락 1회 이상)",
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
                "note": "20MA 이격 +13.0% (≤+22%) · RSI14 69 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 45,995→-3,557 / 기관 -74,627→37,739 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 88,720 / 20MA 78,485 (113.0% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 82% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 232% (필요 ≥ 200%) · 투매 클라이맥스",
                "evalStatus": "met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 22.65 (필요 ≥ 1.0) · 하방 흡수 확인",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 134.3% · 마지막 1시간 평균 미입력",
                "evalStatus": "manual_required"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 88720, 전봉 종가 89440 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 88720,
            "previousClose": 85885,
            "dailyChange": 2835,
            "dailyChangePct": 3.3,
            "dailyDirection": "up",
            "entryPriceText": "88,720원 (당일 종가 기준)",
            "entryPrice": 88720,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 0.0,
            "marketCapRank": null,
            "marketCapUniverseCount": 2558,
            "keyPoint": "20일 고점 대비 -2.0% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
                  "sourceUrl": "https://www.tossinvest.com/stocks/A367760/chart",
                  "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                  "instructions": [
                    "토스증권에서 RISE 네트워크인프라 (367760) 차트 화면을 엽니다.",
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
              "note": "KIND 최근공시 2026-06-18까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 88720, 전봉 종가 89440",
              "latestOpen": 88720.0,
              "latestClose": 88720.0,
              "previousClose": 89440.0
            },
            "toss": {
              "avgStrength": 134.3,
              "note": "토스 공개 체결강도 134.3% / 최근 체결 135분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A367760/order",
              "asOf": "2026-06-18T08:30:30Z",
              "intradayAbove100Ratio": 40.0,
              "observedMinutes": 135,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 135분 프록시"
            },
            "orderbook": {
              "bidAskRatio": 22.6484,
              "bidTotal": 43802,
              "askTotal": 1934,
              "note": "Naver 호가잔량합계 매수 43,802 / 매도 1,934",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=367760"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 80.25, ATR10 7.63%, 일간 표준편차 5.55%, 당일 레인지 5.02%.",
              "metrics": {
                "atrPct10": 7.63,
                "returnStd20": 5.55,
                "todayRangePct": 5.02,
                "vkospi": 80.25
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
                "targetPrice": "91,382원",
                "historicalHitRate": 0.6933,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "93,156원",
                "historicalHitRate": 0.6067,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 86,946원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "86,946원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 85200,
              "fallbackStopPrice": 86946,
              "effectiveHardStopPrice": 86946,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 85,200원와 기존 % 손절 86,946원 중 더 높은 86,946원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 85,200원이며, 기존 % 손절 86,946원보다 느슨해지지 않게 86,946원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 88099,
              "high": 88986,
              "anchor": 88720,
              "label": "88,099~88,986원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 90500,
                "retrace33Price": 89307,
                "retrace50Price": 89610,
                "nearestResistancePrice": 89510,
                "secondaryResistancePrice": 90500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "90,494원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "91,825원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "93,156원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 86,946원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "86,946원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 90500,
                "retrace33Price": 89307,
                "retrace50Price": 89610,
                "nearestResistancePrice": 89510,
                "secondaryResistancePrice": 90500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+2.0% 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+2.0%",
                    "targetPrice": "90,494원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "91,825원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 86,946원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "86,946원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 90500,
                "retrace33Price": 89307,
                "retrace50Price": 89610,
                "nearestResistancePrice": 89510,
                "secondaryResistancePrice": 90500,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "91,382원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "93,156원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 86,946원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "86,946원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
              "sampleCount": 23,
              "ev": 0.771
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 150건)",
              "hitRate": 0.6933,
              "ev": 1.512,
              "sampleCount": 150
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
              "핵심 Gate 미충족: G4",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 0.0조 (필요 ≥ 5조) · 외 2건",
            "statusReason": "F2 미충족: 시총 0.0조 (필요 ≥ 5조) / G2 미충족: 20일 고점 대비 -2.0% (필요 -5%~-25%) / G4 미충족: 최근 5거래일 최저 -0.4% (필요 -3% 이하 급락 1회 이상)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 88720.0,
                "vs52wHighPct": 98.03314917127072,
                "vs52wLowPct": 690.7308377896613,
                "dropFrom52wHighPct": 1.9668508287292819,
                "ma20GapPct": 13.04070841562082,
                "rsi14": 69.37988082891343,
                "volumeRatio20d": 168.22415239482967,
                "rs20Pct": 52.78112622696746,
                "tradingValueRank": 34.0,
                "marketCapTrillion": 0.0,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-18T17:33:33+09:00",
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
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 2.0,
                "evalStatus": "not_met",
                "note": "외인 284,775→81,556 / 기관 -101,710→-106,053 · 순매수 전환 없음"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 116.0% / 마지막 1시간 101.3% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 2,200,000 / 20MA 1,765,550 (124.6% · 필요 ≥ 98%) · 20MA 근접 회복"
              },
              {
                "code": "P2",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "당일 레인지 상단 71% (필요 ≥ 50%)"
              },
              {
                "code": "C1",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "당일 거래량 / 5일 평균 130% (필요 ≥ 200%)"
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
                "note": "직전 30분봉 종가 2200000, 전봉 종가 2206000 미달"
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
                "status": "✅",
                "note": "시총 164.3조 (필요 ≥ 5조)",
                "evalStatus": "met"
              },
              {
                "code": "F3",
                "status": "✅",
                "note": "KIND 최근공시 2026-06-18까지 위험 공시 없음",
                "evalStatus": "met"
              },
              {
                "code": "F4",
                "status": "✅",
                "note": "최근 진입 이력 1건 · 손절 없음 (최근: 2026-06-15) · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +113.4% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "⛔",
                "note": "20일 고점 대비 -3.4% (필요 -5%~-25%)",
                "evalStatus": "not_met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 2,200,000 / 60MA 1,049,850",
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
                "status": "⛔",
                "note": "20MA 이격 +24.6% (≤+22%) · RSI14 71 (≤72) · 20MA 과이격(반등 소진)",
                "evalStatus": "not_met"
              }
            ],
            "matchedRules": [
              {
                "code": "S2",
                "note": "당일 평균 116.0% / 마지막 1시간 101.3% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 2,200,000 / 20MA 1,765,550 (124.6% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 71% (필요 ≥ 50%)",
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
                "code": "S1",
                "note": "외인 284,775→81,556 / 기관 -101,710→-106,053 · 순매수 전환 없음",
                "evalStatus": "not_met"
              },
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 130% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 2200000, 전봉 종가 2206000 미달",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 2200000,
            "previousClose": 2032000,
            "dailyChange": 168000,
            "dailyChangePct": 8.27,
            "dailyDirection": "up",
            "entryPriceText": "2,200,000원 (당일 종가 기준)",
            "entryPrice": 2200000,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 164.3261,
            "marketCapRank": 4,
            "marketCapUniverseCount": 2558,
            "keyPoint": "20일 고점 대비 -3.4% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "KIND 최근공시 2026-06-18까지 위험 공시 없음",
              "source": "kind_playwright_recent_disclosure"
            },
            "intraday30m": {
              "available": true,
              "signal": false,
              "interval": "30m",
              "source": "yahoo_chart",
              "note": "직전 30분봉 종가 2200000, 전봉 종가 2206000",
              "latestOpen": 2200000.0,
              "latestClose": 2200000.0,
              "previousClose": 2206000.0
            },
            "toss": {
              "avgStrength": 116.0,
              "note": "토스 공개 체결강도 116.0% / 최근 체결 38분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A009150/order",
              "asOf": "2026-06-18T08:32:34Z",
              "intradayAbove100Ratio": 36.4,
              "observedMinutes": 38,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 38분 프록시",
              "lastHourAvgStrength": 101.3,
              "lastHourObservedMinutes": 38,
              "last30AvgStrength": 97.9,
              "last30ObservedMinutes": 30,
              "last30BuySellRatio": 2.375,
              "last30BuyVolume": 114.0,
              "last30SellVolume": 48.0
            },
            "orderbook": {
              "bidAskRatio": 2.2363,
              "bidTotal": 16247,
              "askTotal": 7265,
              "note": "Naver 호가잔량합계 매수 16,247 / 매도 7,265",
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
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 80.25, ATR10 11.53%, 일간 표준편차 9.10%, 당일 레인지 13.29%.",
              "metrics": {
                "atrPct10": 11.53,
                "returnStd20": 9.1,
                "todayRangePct": 13.29,
                "vkospi": 80.25
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
                "targetPrice": "2,266,000원",
                "historicalHitRate": 0.6933,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "상단 매물대 1 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+3.5%",
                "targetPrice": "2,277,000원",
                "historicalHitRate": 0.6067,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 2,156,000원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.0%",
                "targetPrice": "2,156,000원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 2007000,
              "fallbackStopPrice": 2156000,
              "effectiveHardStopPrice": 2156000,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 2,007,000원와 기존 % 손절 2,156,000원 중 더 높은 2,156,000원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 2,007,000원이며, 기존 % 손절 2,156,000원보다 느슨해지지 않게 2,156,000원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 2184600,
              "high": 2206600,
              "anchor": 2200000,
              "label": "2,184,600~2,206,600원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 2277000,
                "retrace33Price": 2225410,
                "retrace50Price": 2238500,
                "nearestResistancePrice": 2277000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "2,277,000원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "최근 고점 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "2,277,000원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "2,310,000원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,156,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "2,156,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 2277000,
                "retrace33Price": 2225410,
                "retrace50Price": 2238500,
                "nearestResistancePrice": 2277000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.5%",
                    "targetPrice": "2,277,000원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+3.5% 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "2,277,000원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,156,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "2,156,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
                "recentHighPrice": 2277000,
                "retrace33Price": 2225410,
                "retrace50Price": 2238500,
                "nearestResistancePrice": 2277000,
                "secondaryResistancePrice": null,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "2,266,000원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+3.5%",
                    "targetPrice": "2,277,000원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 2,156,000원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.0%",
                    "targetPrice": "2,156,000원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 23건)",
              "sampleCount": 23,
              "ev": 0.771
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 150건)",
              "hitRate": 0.6933,
              "ev": 1.512,
              "sampleCount": 150
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
              "핵심 Gate 미충족: G2",
              "핵심 Gate 미충족: Q1",
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "G2 미충족: 20일 고점 대비 -3.4% (필요 -5%~-25%) · 외 1건",
            "statusReason": "G2 미충족: 20일 고점 대비 -3.4% (필요 -5%~-25%) / Q1 미충족: 20MA 이격 +24.6% (≤+22%) · RSI14 71 (≤72) · 20MA 과이격(반등 소진)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 2200000.0,
                "vs52wHighPct": 95.65217391304348,
                "vs52wLowPct": 1602.7863777089785,
                "dropFrom52wHighPct": 4.3478260869565215,
                "ma20GapPct": 24.60706295488658,
                "rsi14": 70.68579956160569,
                "volumeRatio20d": 102.33125206628047,
                "rs20Pct": 122.89766970618035,
                "tradingValueRank": 3.0,
                "marketCapRank": 4.0,
                "marketCapTrillion": 164.3261,
                "per": 207.8,
                "pbr": 16.93,
                "cnsPer": 132.92,
                "foreignRate": 39.08,
                "supplyTrendScore": 0.0,
                "shortBalanceChangePct": -37.6482653411289
              },
              "evaluatedAt": "2026-06-18T17:33:33+09:00",
              "source": "jongga_analysis"
            },
            "stockExchangeName": "KOSPI",
            "analysisSession": "1730",
            "analysisSessionLabel": "5시반 분석"
          },
          {
            "rank": 4,
            "name": "제주반도체",
            "code": "080220",
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
                "note": "외인 -142,168→52,548 / 기관 -1,009→136,071 · 순매수 전환"
              },
              {
                "code": "S2",
                "strictPoints": 2.0,
                "signalPoints": 2.0,
                "maxPoints": 2.0,
                "evalStatus": "met",
                "note": "당일 평균 100.2% / 마지막 1시간 238.1% (필요 ≥90%·≥100%)"
              },
              {
                "code": "P1",
                "strictPoints": 1.5,
                "signalPoints": 1.5,
                "maxPoints": 1.5,
                "evalStatus": "met",
                "note": "종가 118,100 / 20MA 104,380 (113.1% · 필요 ≥ 98%) · 20MA 근접 회복"
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
                "note": "당일 거래량 / 5일 평균 175% (필요 ≥ 200%)"
              },
              {
                "code": "C2",
                "strictPoints": 0.0,
                "signalPoints": 0.0,
                "maxPoints": 1.0,
                "evalStatus": "not_met",
                "note": "매수/매도 호가잔량 0.35 (필요 ≥ 1.0)"
              },
              {
                "code": "C3",
                "strictPoints": 1.0,
                "signalPoints": 1.0,
                "maxPoints": 1.0,
                "evalStatus": "met",
                "note": "직전 30분봉 종가 118300, 전봉 종가 116000 충족"
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
                "note": "당일 거래대금 순위 11위 (필요 ≤ 100위)",
                "evalStatus": "met"
              },
              {
                "code": "F2",
                "status": "⛔",
                "note": "시총 4.1조 (필요 ≥ 5조)",
                "evalStatus": "not_met"
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
                "note": "최근 5거래일(2026-06-08~) 동일 종목 반등 진입 이력 없음 · 자동 확인",
                "evalStatus": "met"
              }
            ],
            "gates": [
              {
                "code": "G1",
                "status": "✅",
                "note": "1개월 수익률 +27.5% (필요 ≥ +15%)",
                "evalStatus": "met"
              },
              {
                "code": "G2",
                "status": "✅",
                "note": "20일 고점 대비 -13.9% (필요 -5%~-25%)",
                "evalStatus": "met"
              },
              {
                "code": "G3",
                "status": "✅",
                "note": "종가 118,100 / 60MA 68,272",
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
                "status": "✅",
                "note": "20MA 이격 +13.1% (≤+22%) · RSI14 67 (≤72) · 과이격·과매수 반등 아님",
                "evalStatus": "met"
              }
            ],
            "matchedRules": [
              {
                "code": "S1",
                "note": "외인 -142,168→52,548 / 기관 -1,009→136,071 · 순매수 전환",
                "evalStatus": "met"
              },
              {
                "code": "S2",
                "note": "당일 평균 100.2% / 마지막 1시간 238.1% (필요 ≥90%·≥100%)",
                "evalStatus": "met"
              },
              {
                "code": "P1",
                "note": "종가 118,100 / 20MA 104,380 (113.1% · 필요 ≥ 98%) · 20MA 근접 회복",
                "evalStatus": "met"
              },
              {
                "code": "P2",
                "note": "당일 레인지 상단 69% (필요 ≥ 50%)",
                "evalStatus": "met"
              },
              {
                "code": "C3",
                "note": "직전 30분봉 종가 118300, 전봉 종가 116000 충족",
                "evalStatus": "met"
              }
            ],
            "unmatchedRules": [
              {
                "code": "C1",
                "note": "당일 거래량 / 5일 평균 175% (필요 ≥ 200%)",
                "evalStatus": "not_met"
              },
              {
                "code": "C2",
                "note": "매수/매도 호가잔량 0.35 (필요 ≥ 1.0)",
                "evalStatus": "not_met"
              }
            ],
            "currentPrice": 118100,
            "previousClose": 111500,
            "dailyChange": 6600,
            "dailyChangePct": 5.92,
            "dailyDirection": "up",
            "entryPriceText": "118,100원 (당일 종가 기준)",
            "entryPrice": 118100,
            "entryMeta": "당일 종가 기준",
            "marketCapTrillion": 4.0677,
            "marketCapRank": 142,
            "marketCapUniverseCount": 2558,
            "keyPoint": "20일 고점 대비 -13.9% 조정 후 안정화 패턴 여부를 점검했습니다. 고변동성 장세라 현재 전략이 상대적으로 유리합니다.",
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
              "note": "직전 30분봉 종가 118300, 전봉 종가 116000",
              "latestOpen": 115900.0,
              "latestClose": 118300.0,
              "previousClose": 116000.0
            },
            "toss": {
              "avgStrength": 100.2,
              "note": "토스 공개 체결강도 100.2% / 최근 체결 2분 프록시",
              "source": "toss_http_combo",
              "sourceUrl": "https://www.tossinvest.com/stocks/A080220/order",
              "asOf": "2026-06-18T06:03:02Z",
              "intradayAbove100Ratio": 100.0,
              "observedMinutes": 2,
              "observedTickCount": 120,
              "coverageNote": "최근 체결 2분 프록시",
              "lastHourAvgStrength": 238.1,
              "lastHourObservedMinutes": 2,
              "last30AvgStrength": 238.1,
              "last30ObservedMinutes": 2,
              "last30BuySellRatio": 1.961,
              "last30BuyVolume": 2365.0,
              "last30SellVolume": 1206.0
            },
            "orderbook": {
              "bidAskRatio": 0.3535,
              "bidTotal": 6061,
              "askTotal": 17144,
              "note": "Naver 호가잔량합계 매수 6,061 / 매도 17,144",
              "source": "naver_orderbook_http",
              "sourceUrl": "https://finance.naver.com/item/main.nhn?code=080220"
            },
            "volatilityContext": {
              "marketState": "volatile",
              "stockState": "volatile",
              "blendedState": "volatile",
              "strategyFit": "favorable",
              "scoreDelta": 1.0,
              "summary": "유리 (고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다)",
              "reason": "시장 고변동성 / 종목 고변동성 → 혼합 고변동성. 고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다. VKOSPI 82.55, ATR10 13.33%, 일간 표준편차 8.11%, 당일 레인지 14.98%.",
              "metrics": {
                "atrPct10": 13.33,
                "returnStd20": 8.11,
                "todayRangePct": 14.98,
                "vkospi": 82.55
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
                "targetPrice": "121,643원",
                "historicalHitRate": 0.6933,
                "recommended": true
              },
              {
                "stage": "🔔 장초반",
                "stageKey": "openPhase",
                "condition": "+5% 조기 회수 도달",
                "quantity": "50% 익절 (잔량 전량)",
                "targetYield": "+5.0%",
                "targetPrice": "124,005원",
                "historicalHitRate": 0.6067,
                "recommended": false
              },
              {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "유효 하드 스톱 115,148원 종가 이탈",
                "quantity": "전량",
                "targetYield": "-2.5%",
                "targetPrice": "115,148원"
              }
            ],
            "reversalStopPolicy": {
              "version": "reversal-stop-v1",
              "anchorSource": "entry_day_low",
              "anchorLowPrice": 106500,
              "fallbackStopPrice": 115148,
              "effectiveHardStopPrice": 115148,
              "stopExecutionMode": "close_only",
              "hardStopRuleSummary": "진입 당일 저가 106,500원와 기존 % 손절 115,148원 중 더 높은 115,148원을 종가 손절가로 사용합니다.",
              "reasonSummary": "반등 가정의 핵심 지지선은 진입 당일 저가 106,500원이며, 기존 % 손절 115,148원보다 느슨해지지 않게 115,148원으로 고정하고 종가 기준으로 확인합니다."
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
              "low": 116978,
              "high": 118159,
              "anchor": 118100,
              "label": "116,978~118,159원 (종가 ±, 분할매수)"
            },
            "reversalTakeProfitProfiles": [
              {
                "profileKey": "aggressive",
                "label": "공격형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
                "recentHighPrice": 137100,
                "retrace33Price": 124370,
                "retrace50Price": 127600,
                "nearestResistancePrice": 123200,
                "secondaryResistancePrice": 124800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+4.3%",
                    "targetPrice": "123,200원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "30% 익절",
                    "targetYield": "+5.7%",
                    "targetPrice": "124,800원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "📈 장중 1차",
                    "stageKey": "intraday1",
                    "condition": "최근 고점 재도전",
                    "quantity": "20% 익절 (잔량 전량)",
                    "targetYield": "+16.1%",
                    "targetPrice": "137,100원",
                    "historicalHitRate": 0.3968,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 115,148원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "115,148원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              },
              {
                "profileKey": "balanced",
                "label": "중립형",
                "recommended": false,
                "selectionBasis": "market_stock_heuristic",
                "reasonSummary": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
                "recentHighPrice": 137100,
                "retrace33Price": 124370,
                "retrace50Price": 127600,
                "nearestResistancePrice": 123200,
                "secondaryResistancePrice": 124800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "상단 매물대 1 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+4.3%",
                    "targetPrice": "123,200원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "상단 매물대 2 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.7%",
                    "targetPrice": "124,800원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 115,148원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "115,148원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              },
              {
                "profileKey": "conservative",
                "label": "보수형",
                "recommended": true,
                "selectionBasis": "historical_profile_ev",
                "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
                "recentHighPrice": 137100,
                "retrace33Price": 124370,
                "retrace50Price": 127600,
                "nearestResistancePrice": 123200,
                "secondaryResistancePrice": 124800,
                "tradePlanRows": [
                  {
                    "stage": "🌅 프리마켓",
                    "stageKey": "premarket",
                    "condition": "+3% 조기 반등 도달",
                    "quantity": "50% 익절",
                    "targetYield": "+3.0%",
                    "targetPrice": "121,643원",
                    "historicalHitRate": 0.6933,
                    "recommended": true
                  },
                  {
                    "stage": "🔔 장초반",
                    "stageKey": "openPhase",
                    "condition": "+5% 조기 회수 도달",
                    "quantity": "50% 익절 (잔량 전량)",
                    "targetYield": "+5.0%",
                    "targetPrice": "124,005원",
                    "historicalHitRate": 0.6067,
                    "recommended": false
                  },
                  {
                    "stage": "🛑 손절",
                    "stageKey": "stop",
                    "condition": "유효 하드 스톱 115,148원 종가 이탈",
                    "quantity": "전량",
                    "targetYield": "-2.5%",
                    "targetPrice": "115,148원"
                  }
                ],
                "recommendedStage": {
                  "stageKey": "premarket",
                  "evBasis": "historical:netStageReturn",
                  "reason": "EV=순수익 argmax (과거 150건)",
                  "hitRate": 0.6933,
                  "ev": 1.512,
                  "sampleCount": 150
                }
              }
            ],
            "recommendedTakeProfitProfile": {
              "profileKey": "conservative",
              "label": "보수형",
              "selectionBasis": "historical_profile_ev",
              "reasonSummary": "리플레이 평균 수익률 기준 최적 프로필입니다. (과거 20건)",
              "sampleCount": 20,
              "ev": 0.7191
            },
            "recommendedStage": {
              "stageKey": "premarket",
              "evBasis": "historical:netStageReturn",
              "reason": "EV=순수익 argmax (과거 150건)",
              "hitRate": 0.6933,
              "ev": 1.512,
              "sampleCount": 150
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
              "매매금지"
            ],
            "setupQuality": "setup_weak",
            "statusReasonShort": "F2 미충족: 시총 4.1조 (필요 ≥ 5조) · 외 1건",
            "statusReason": "F2 미충족: 시총 4.1조 (필요 ≥ 5조) / F3 미충족: KIND 최근공시 2026-05-27 공매도 과열종목 지정(공매도 거래 금지 적용)",
            "stockIndicators": {
              "snapshot": {
                "currentPrice": 118100.0,
                "vs52wHighPct": 86.14150255288111,
                "vs52wLowPct": 798.7823439878234,
                "dropFrom52wHighPct": 13.858497447118893,
                "ma20GapPct": 13.144280513508336,
                "rsi14": 66.70946144753874,
                "volumeRatio20d": 198.41217128183416,
                "rs20Pct": 23.149113660062564,
                "tradingValueRank": 11.0,
                "marketCapRank": 142.0,
                "marketCapTrillion": 4.0677,
                "per": 35.92,
                "pbr": 13.04,
                "cnsPer": 0.0,
                "foreignRate": 5.12,
                "supplyTrendScore": 0.0
              },
              "evaluatedAt": "2026-06-18T15:04:13+09:00",
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
  "analysisDate": "2026-06-18",
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
      "005930",
      "035420",
      "042660",
      "402340"
    ],
    "changedEntries": [
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
          "strictScore": 8.1,
          "signalScore": 8.1,
          "score": 8.1,
          "scoreMax": 14.0,
          "effectiveScoreMax": 14.0,
          "gradeScore": 5.8,
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
          "strictScore": 5.4,
          "signalScore": 6.1,
          "score": 6.1,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 4.3,
          "grade": "C"
        },
        "after": {
          "strictScore": 6.3,
          "signalScore": 6.3,
          "score": 6.3,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 5.0,
          "grade": "C"
        }
      },
      {
        "strategy": "breakout",
        "code": "001820",
        "name": "삼화콘덴서",
        "changedFields": [
          "signalScore",
          "score"
        ],
        "before": {
          "strictScore": 4.9,
          "signalScore": 5.7,
          "score": 5.7,
          "scoreMax": 12.5,
          "effectiveScoreMax": 11.5,
          "gradeScore": 4.3,
          "grade": "C"
        },
        "after": {
          "strictScore": 4.9,
          "signalScore": 4.9,
          "score": 4.9,
          "scoreMax": 12.5,
          "effectiveScoreMax": 11.5,
          "gradeScore": 4.3,
          "grade": "C"
        }
      },
      {
        "strategy": "breakout",
        "code": "005930",
        "name": "삼성전자",
        "changedFields": [
          "strictScore",
          "signalScore",
          "score",
          "gradeScore"
        ],
        "before": {
          "strictScore": 3.9,
          "signalScore": 3.9,
          "score": 3.9,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.1,
          "grade": "C"
        },
        "after": {
          "strictScore": 4.8,
          "signalScore": 4.8,
          "score": 4.8,
          "scoreMax": 12.5,
          "effectiveScoreMax": 12.5,
          "gradeScore": 3.8,
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
