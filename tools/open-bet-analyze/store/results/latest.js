window.__OPEN_BET_RESULT__ = {
  "schemaVersion": "open_bet_result.v2",
  "tradeDate": "20260528",
  "phase": "post_ah",
  "generatedAt": "2026-05-28T13:49:05+09:00",
  "executionSchedule": {
    "profile": "ats",
    "analysis": {
      "start": "07:30",
      "deadline": "07:40",
      "reviewUntil": "08:00",
      "note": "07:40까지 배치 완료 → 07:40~08:00 직접 종목 검토·주문 준비(20분)"
    },
    "reviewWindow": "07:40~08:00",
    "ats": {
      "venueLabel": "대체거래소",
      "entryWindow": "08:00~08:30",
      "mustFlatBy": "08:30"
    },
    "krxLiquidationAt": "09:00"
  },
  "krxLiquidationOrders": [
    {
      "code": "012450",
      "name": "한화에어로스페이스",
      "at": "09:00",
      "orderType": "limit",
      "limitPrice": 935000,
      "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약",
      "buyLimitPrice": 935000
    }
  ],
  "regime": {
    "label": "강세장 ✅ (펀더·지수 정당)",
    "openBetActive": true
  },
  "macro": {
    "gapGrade": "G-B",
    "gapTotalScore": 4.0,
    "nq": 4.007,
    "vix": 16.29,
    "sox": 12.354,
    "nightFuture": 4.007
  },
  "macroHalt": false,
  "macroReasons": [],
  "themes": [],
  "trackCScanner": [
    {
      "code": "012450",
      "name": "한화에어로스페이스",
      "ahChangePct": 5.2,
      "ahPrice": 925000,
      "ahVolume": 12500,
      "expectedOpen": 935000,
      "strongOpen": true,
      "expectedOpenGapPct": 1.081
    },
    {
      "code": "000660",
      "name": "SK하이닉스",
      "ahChangePct": 4.5,
      "ahPrice": 198500,
      "ahVolume": 45000,
      "expectedOpen": 200100,
      "strongOpen": true,
      "expectedOpenGapPct": 0.806
    },
    {
      "code": "035420",
      "name": "NAVER",
      "ahChangePct": 6.1,
      "ahPrice": 215000,
      "ahVolume": 8000,
      "strongOpen": false,
      "expectedOpenGapPct": 0.0,
      "expectedOpen": 215000.0
    }
  ],
  "candidates": [
    {
      "code": "012450",
      "name": "한화에어로스페이스",
      "strategy": "OvertimeFollow",
      "strategyScore": 7.0,
      "finalScore": 7.0,
      "grade": "B",
      "gap": {
        "expectedPct": 1.081,
        "band": "ideal",
        "policy": "C",
        "strongOpen": true
      },
      "breakdown": {
        "S1": 2.0,
        "S2": 2.0,
        "S3": 2.0,
        "S6": 1.0
      },
      "volRatio": 5.23,
      "entryPlan": {
        "profile": "ats",
        "venue": "ATS",
        "venueLabel": "대체거래소",
        "analysisDeadline": "07:40",
        "reviewUntil": "08:00",
        "entryWindow": {
          "start": "08:00",
          "end": "08:30"
        },
        "mustFlatBy": "08:30",
        "entryAt": "08:00-08:30",
        "buyOrder": {
          "type": "limit",
          "limitPrice": 935000,
          "note": "ATS 프리마켓 매수 지정가(시간외·예상 시가 참고)"
        },
        "stopLoss": {
          "pct": -2.0,
          "limitPrice": 916000,
          "trigger": "immediate_if_breach"
        },
        "intradayExits": [
          {
            "time": "08:15",
            "label": null,
            "sellRatio": 0.0,
            "limitPrice": 935000,
            "targetPct": 0.0
          }
        ],
        "krxLiquidation": {
          "at": "09:00",
          "venue": "KRX",
          "orderType": "limit",
          "label": "잔량 시스템 매도",
          "limitPrice": 935000,
          "appliesTo": "unsold_qty_after_0830",
          "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약"
        },
        "tp1Pct": 2.0,
        "tp1Price": 954000,
        "entryWeight": 0.0,
        "expectedKrxOpen": 935000
      }
    }
  ],
  "candidatesGapBreak": [],
  "candidatesOvertimeFollow": [
    {
      "code": "012450",
      "name": "한화에어로스페이스",
      "strategy": "OvertimeFollow",
      "strategyScore": 7.0,
      "finalScore": 7.0,
      "grade": "B",
      "gap": {
        "expectedPct": 1.081,
        "band": "ideal",
        "policy": "C",
        "strongOpen": true
      },
      "breakdown": {
        "S1": 2.0,
        "S2": 2.0,
        "S3": 2.0,
        "S6": 1.0
      },
      "volRatio": 5.23,
      "entryPlan": {
        "profile": "ats",
        "venue": "ATS",
        "venueLabel": "대체거래소",
        "analysisDeadline": "07:40",
        "reviewUntil": "08:00",
        "entryWindow": {
          "start": "08:00",
          "end": "08:30"
        },
        "mustFlatBy": "08:30",
        "entryAt": "08:00-08:30",
        "buyOrder": {
          "type": "limit",
          "limitPrice": 935000,
          "note": "ATS 프리마켓 매수 지정가(시간외·예상 시가 참고)"
        },
        "stopLoss": {
          "pct": -2.0,
          "limitPrice": 916000,
          "trigger": "immediate_if_breach"
        },
        "intradayExits": [
          {
            "time": "08:15",
            "label": null,
            "sellRatio": 0.0,
            "limitPrice": 935000,
            "targetPct": 0.0
          }
        ],
        "krxLiquidation": {
          "at": "09:00",
          "venue": "KRX",
          "orderType": "limit",
          "label": "잔량 시스템 매도",
          "limitPrice": 935000,
          "appliesTo": "unsold_qty_after_0830",
          "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약"
        },
        "tp1Pct": 2.0,
        "tp1Price": 954000,
        "entryWeight": 0.0,
        "expectedKrxOpen": 935000
      }
    }
  ],
  "heldBack": [],
  "dataQuality": {
    "status": "degraded",
    "coverage": 1.0,
    "requiredTotal": 8,
    "requiredFilled": 8,
    "missingRequired": [],
    "criticalFailed": [],
    "staleRequired": [
      "overtime_single_board",
      "overnight_volume"
    ],
    "optionalIssues": [],
    "fallbackUsage": [],
    "metrics": {
      "eod_open_bet_signals": {
        "metric": "eod_open_bet_signals",
        "status": "ok",
        "source": "jongga_json_bridge",
        "confidence": 1.0,
        "stale": false,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
      },
      "global_gap_bundle": {
        "metric": "global_gap_bundle",
        "status": "ok",
        "source": "yahoo_chart",
        "confidence": 0.8,
        "stale": false,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
      },
      "night_kospi_future": {
        "metric": "night_kospi_future",
        "status": "ok",
        "source": "yahoo_proxy",
        "confidence": 0.5,
        "stale": false,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
      },
      "news_headlines": {
        "metric": "news_headlines",
        "status": "ok",
        "source": "naver_news",
        "confidence": 0.7,
        "stale": false,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
      },
      "overtime_single_board": {
        "metric": "overtime_single_board",
        "status": "ok",
        "source": "raw_snapshot",
        "confidence": 0.55,
        "stale": true,
        "errors": [
          "naver overtime unavailable (error page) — snapshot 20260528 fallback"
        ],
        "fallbackUsage": [],
        "filled": true
      },
      "foreign_inst_flow": {
        "metric": "foreign_inst_flow",
        "status": "ok",
        "source": "naver_frgn",
        "confidence": 0.75,
        "stale": false,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
      },
      "expected_open": {
        "metric": "expected_open",
        "status": "ok",
        "source": "premarket_enricher",
        "confidence": 0.45,
        "stale": false,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
      },
      "overnight_volume": {
        "metric": "overnight_volume",
        "status": "ok",
        "source": "raw_snapshot",
        "confidence": 0.55,
        "stale": true,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
      }
    }
  }
};
