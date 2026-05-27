window.__OPEN_BET_RESULT__ = {
  "schemaVersion": "open_bet_result.v2",
  "tradeDate": "20260527",
  "phase": "final",
  "generatedAt": "2026-05-27T11:54:21+09:00",
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
  "krxLiquidationOrders": [],
  "regime": {
    "label": "강세장 ✅",
    "openBetActive": true
  },
  "macro": {
    "gapGrade": null,
    "gapTotalScore": null,
    "nq": null,
    "vix": null,
    "sox": null,
    "nightFuture": null
  },
  "macroHalt": false,
  "macroReasons": [],
  "themes": [],
  "trackCScanner": [],
  "candidates": [],
  "candidatesGapBreak": [],
  "candidatesOvertimeFollow": [],
  "heldBack": [],
  "dataQuality": {
    "status": "incomplete",
    "coverage": 0.5,
    "requiredTotal": 8,
    "requiredFilled": 4,
    "missingRequired": [
      "global_gap_bundle",
      "night_kospi_future",
      "overtime_single_board",
      "foreign_inst_flow"
    ],
    "criticalFailed": [
      "overtime_single_board"
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
        "status": "blocked",
        "source": "yahoo_chart",
        "confidence": 0.0,
        "stale": false,
        "errors": [
          "macro quotes unavailable"
        ],
        "fallbackUsage": [],
        "filled": false
      },
      "night_kospi_future": {
        "metric": "night_kospi_future",
        "status": "blocked",
        "source": "yahoo_proxy",
        "confidence": 0.4,
        "stale": false,
        "errors": [
          "night future proxy unavailable"
        ],
        "fallbackUsage": [],
        "filled": false
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
        "status": "blocked",
        "source": "naver_html",
        "confidence": 0.0,
        "stale": false,
        "errors": [
          "naver overtime unavailable (error page)"
        ],
        "fallbackUsage": [],
        "filled": false
      },
      "foreign_inst_flow": {
        "metric": "foreign_inst_flow",
        "status": "blocked",
        "source": "",
        "confidence": 1.0,
        "stale": false,
        "errors": [
          "no overtime codes"
        ],
        "fallbackUsage": [],
        "filled": false
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
        "source": "fixture",
        "confidence": 1.0,
        "stale": false,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
      }
    }
  }
};
