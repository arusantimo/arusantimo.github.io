window.__OPEN_BET_RESULT__ = {
  "schemaVersion": "open_bet_result.v2",
  "tradeDate": "20260528",
  "phase": "final",
  "generatedAt": "2026-05-28T08:04:06+09:00",
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
    },
    {
      "code": "000660",
      "name": "SK하이닉스",
      "at": "09:00",
      "orderType": "limit",
      "limitPrice": 200000,
      "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약",
      "buyLimitPrice": 200000
    },
    {
      "code": "035420",
      "name": "NAVER",
      "at": "09:00",
      "orderType": "limit",
      "limitPrice": 215000,
      "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약",
      "buyLimitPrice": 215000
    }
  ],
  "regime": {
    "label": "강세장 ✅ (펀더·지수 정당)",
    "openBetActive": true
  },
  "macro": {
    "gapGrade": "G-C",
    "gapTotalScore": 0.0,
    "nq": null,
    "vix": 17.01,
    "sox": null,
    "nightFuture": null
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
      "strategyScore": 6.0,
      "finalScore": 6.0,
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
        "S3": 2.0
      },
      "volRatio": 0.0,
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
    },
    {
      "code": "000660",
      "name": "SK하이닉스",
      "strategy": "OvertimeFollow",
      "strategyScore": 6.0,
      "finalScore": 6.0,
      "grade": "B",
      "gap": {
        "expectedPct": 0.806,
        "band": "ideal",
        "policy": "C",
        "strongOpen": true
      },
      "breakdown": {
        "S1": 2.0,
        "S2": 2.0,
        "S3": 2.0
      },
      "volRatio": 0.0,
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
          "limitPrice": 200000,
          "note": "ATS 프리마켓 매수 지정가(시간외·예상 시가 참고)"
        },
        "stopLoss": {
          "pct": -2.0,
          "limitPrice": 196000,
          "trigger": "immediate_if_breach"
        },
        "intradayExits": [
          {
            "time": "08:15",
            "label": null,
            "sellRatio": 0.0,
            "limitPrice": 200000,
            "targetPct": 0.0
          }
        ],
        "krxLiquidation": {
          "at": "09:00",
          "venue": "KRX",
          "orderType": "limit",
          "label": "잔량 시스템 매도",
          "limitPrice": 200000,
          "appliesTo": "unsold_qty_after_0830",
          "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약"
        },
        "tp1Pct": 2.0,
        "tp1Price": 204000,
        "entryWeight": 0.0,
        "expectedKrxOpen": 200000
      }
    },
    {
      "code": "035420",
      "name": "NAVER",
      "strategy": "OvertimeFollow",
      "strategyScore": 4.0,
      "finalScore": 4.0,
      "grade": "B",
      "gap": {
        "expectedPct": 0.0,
        "band": "ideal",
        "policy": "C",
        "strongOpen": false
      },
      "breakdown": {
        "S1": 2.0,
        "S2": 2.0,
        "S3": 0.0
      },
      "volRatio": 0.0,
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
          "limitPrice": 215000,
          "note": "ATS 프리마켓 매수 지정가(시간외·예상 시가 참고)"
        },
        "stopLoss": {
          "pct": -2.0,
          "limitPrice": 210500,
          "trigger": "immediate_if_breach"
        },
        "intradayExits": [
          {
            "time": "08:15",
            "label": null,
            "sellRatio": 0.0,
            "limitPrice": 215000,
            "targetPct": 0.0
          }
        ],
        "krxLiquidation": {
          "at": "09:00",
          "venue": "KRX",
          "orderType": "limit",
          "label": "잔량 시스템 매도",
          "limitPrice": 215000,
          "appliesTo": "unsold_qty_after_0830",
          "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약"
        },
        "tp1Pct": 2.0,
        "tp1Price": 219500,
        "entryWeight": 0.0,
        "expectedKrxOpen": 215000
      }
    }
  ],
  "candidatesGapBreak": [],
  "candidatesOvertimeFollow": [
    {
      "code": "012450",
      "name": "한화에어로스페이스",
      "strategy": "OvertimeFollow",
      "strategyScore": 6.0,
      "finalScore": 6.0,
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
        "S3": 2.0
      },
      "volRatio": 0.0,
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
    },
    {
      "code": "000660",
      "name": "SK하이닉스",
      "strategy": "OvertimeFollow",
      "strategyScore": 6.0,
      "finalScore": 6.0,
      "grade": "B",
      "gap": {
        "expectedPct": 0.806,
        "band": "ideal",
        "policy": "C",
        "strongOpen": true
      },
      "breakdown": {
        "S1": 2.0,
        "S2": 2.0,
        "S3": 2.0
      },
      "volRatio": 0.0,
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
          "limitPrice": 200000,
          "note": "ATS 프리마켓 매수 지정가(시간외·예상 시가 참고)"
        },
        "stopLoss": {
          "pct": -2.0,
          "limitPrice": 196000,
          "trigger": "immediate_if_breach"
        },
        "intradayExits": [
          {
            "time": "08:15",
            "label": null,
            "sellRatio": 0.0,
            "limitPrice": 200000,
            "targetPct": 0.0
          }
        ],
        "krxLiquidation": {
          "at": "09:00",
          "venue": "KRX",
          "orderType": "limit",
          "label": "잔량 시스템 매도",
          "limitPrice": 200000,
          "appliesTo": "unsold_qty_after_0830",
          "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약"
        },
        "tp1Pct": 2.0,
        "tp1Price": 204000,
        "entryWeight": 0.0,
        "expectedKrxOpen": 200000
      }
    },
    {
      "code": "035420",
      "name": "NAVER",
      "strategy": "OvertimeFollow",
      "strategyScore": 4.0,
      "finalScore": 4.0,
      "grade": "B",
      "gap": {
        "expectedPct": 0.0,
        "band": "ideal",
        "policy": "C",
        "strongOpen": false
      },
      "breakdown": {
        "S1": 2.0,
        "S2": 2.0,
        "S3": 0.0
      },
      "volRatio": 0.0,
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
          "limitPrice": 215000,
          "note": "ATS 프리마켓 매수 지정가(시간외·예상 시가 참고)"
        },
        "stopLoss": {
          "pct": -2.0,
          "limitPrice": 210500,
          "trigger": "immediate_if_breach"
        },
        "intradayExits": [
          {
            "time": "08:15",
            "label": null,
            "sellRatio": 0.0,
            "limitPrice": 215000,
            "targetPct": 0.0
          }
        ],
        "krxLiquidation": {
          "at": "09:00",
          "venue": "KRX",
          "orderType": "limit",
          "label": "잔량 시스템 매도",
          "limitPrice": 215000,
          "appliesTo": "unsold_qty_after_0830",
          "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약"
        },
        "tp1Pct": 2.0,
        "tp1Price": 219500,
        "entryWeight": 0.0,
        "expectedKrxOpen": 215000
      }
    }
  ],
  "heldBack": [],
  "dataQuality": {
    "status": "degraded",
    "coverage": 0.875,
    "requiredTotal": 8,
    "requiredFilled": 7,
    "missingRequired": [
      "night_kospi_future"
    ],
    "criticalFailed": [],
    "staleRequired": [
      "overtime_single_board",
      "overnight_volume",
      "foreign_inst_flow",
      "news_headlines"
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
        "source": "market_snapshot_mix",
        "confidence": 0.55,
        "stale": false,
        "errors": [],
        "fallbackUsage": [],
        "filled": true
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
        "source": "raw_snapshot",
        "confidence": 0.55,
        "stale": true,
        "errors": [
          "DNS 해석 실패 ([Errno 8] nodename nor servname provided, or not known); Node DNS 우회 실패 (direct=175.158.5.164: connect EPERM 175.158.5.164:443 - Local (0.0.0.0:0) / 117.52.137.138: connect EPERM 117.52.137.138:443 - Local (0.0.0.0:0) ; doh=DoH 해석 실패 (cloudflare: connect EPERM 1.1.1.1:443 - Local (0.0.0.0:0) / google: connect EPERM 8.8.8.8:443 - Local (0.0.0.0:0))); Playwright 우회 실패 (browserType.launch: Target page, context or browser has been closed\nBrowser logs:\n\n<launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --disable-blink-features=AutomationControlled --lang=ko-KR --user-data-dir=/var/folders/pf/9pgdpm111jqf87smdkh5l1l00000gn/T/playwright_chromiumdev_profile-qirf3N --remote-debugging-pipe --no-startup-window\n<launched> pid=18835\nCall log:\n\u001b[2m  - <launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --disable-blink-features=AutomationControlled --lang=ko-KR --user-data-dir=/var/folders/pf/9pgdpm111jqf87smdkh5l1l00000gn/T/playwright_chromiumdev_profile-qirf3N --remote-debugging-pipe --no-startup-window\u001b[22m\n\u001b[2m  - <launched> pid=18835\u001b[22m\n\u001b[2m  - [pid=18835] <gracefully close start>\u001b[22m\n\u001b[2m  - [pid=18835] <kill>\u001b[22m\n\u001b[2m  - [pid=18835] <will force kill>\u001b[22m\n\u001b[2m  - [pid=18835] exception while trying to kill process: Error: kill EPERM\u001b[22m\n\u001b[2m  - [pid=18835] <process did exit: exitCode=null, signal=SIGABRT>\u001b[22m\n\u001b[2m  - [pid=18835] starting temporary directories cleanup\u001b[22m\n\u001b[2m  - [pid=18835] finished temporary directories cleanup\u001b[22m\n\u001b[2m  - [pid=18835] <gracefully close end>\u001b[22m); curl 우회 실패 (DNS 해석 실패 (curl: (6) Could not resolve host: finance.naver.com\ncurl: (6) Could not resolve host: finance.naver.com)) — snapshot 20260527 fallback"
        ],
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
          "DNS 해석 실패 (urllib: DNS 해석 실패 ([Errno 8] nodename nor servname provided, or not known); Node DNS 우회 실패 (direct=175.158.5.164: connect EPERM 175.158.5.164:443 - Local (0.0.0.0:0) / 117.52.137.138: connect EPERM 117.52.137.138:443 - Local (0.0.0.0:0) ; doh=DoH 해석 실패 (cloudflare: connect EPERM 1.1.1.1:443 - Local (0.0.0.0:0) / google: connect EPERM 8.8.8.8:443 - Local (0.0.0.0:0))); Playwright 우회 실패 (browserType.launch: Target page, context or browser has been closed\nBrowser logs:\n\n<launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --disable-blink-features=AutomationControlled --lang=ko-KR --user-data-dir=/var/folders/pf/9pgdpm111jqf87smdkh5l1l00000gn/T/playwright_chromiumdev_profile-qirf3N --remote-debugging-pipe --no-startup-window\n<launched> pid=18835\nCall log:\n\u001b[2m  - <launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --disable-blink-features=AutomationControlled --lang=ko-KR --user-data-dir=/var/folders/pf/9pgdpm111jqf87smdkh5l1l00000gn/T/playwright_chromiumdev_profile-qirf3N --remote-debugging-pipe --no-startup-window\u001b[22m\n\u001b[2m  - <launched> pid=18835\u001b[22m\n\u001b[2m  - [pid=18835] <gracefully close start>\u001b[22m\n\u001b[2m  - [pid=18835] <kill>\u001b[22m\n\u001b[2m  - [pid=18835] <will force kill>\u001b[22m\n\u001b[2m  - [pid=18835] exception while trying to kill process: Error: kill EPERM\u001b[22m\n\u001b[2m  - [pid=18835] <process did exit: exitCode=null, signal=SIGABRT>\u001b[22m\n\u001b[2m  - [pid=18835] starting temporary directories cleanup\u001b[22m\n\u001b[2m  - [pid=18835] finished temporary directories cleanup\u001b[22m\n\u001b[2m  - [pid=18835] <gracefully close end>\u001b[22m); curl 우회 실패 (DNS 해석 실패 (curl: (6) Could not resolve host: finance.naver.com\ncurl: (6) Could not resolve host: finance.naver.com)); playwright: browserType.launch: Target page, context or browser has been closed\nBrowser logs:\n\n<launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --disable-blink-features=AutomationControlled --lang=ko-KR --user-data-dir=/var/folders/pf/9pgdpm111jqf87smdkh5l1l00000gn/T/playwright_chromiumdev_profile-qirf3N --remote-debugging-pipe --no-startup-window\n<launched> pid=18835\nCall log:\n\u001b[2m  - <launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --disable-blink-features=AutomationControlled --lang=ko-KR --user-data-dir=/var/folders/pf/9pgdpm111jqf87smdkh5l1l00000gn/T/playwright_chromiumdev_profile-qirf3N --remote-debugging-pipe --no-startup-window\u001b[22m\n\u001b[2m  - <launched> pid=18835\u001b[22m\n\u001b[2m  - [pid=18835] <gracefully close start>\u001b[22m\n\u001b[2m  - [pid=18835] <kill>\u001b[22m\n\u001b[2m  - [pid=18835] <will force kill>\u001b[22m\n\u001b[2m  - [pid=18835] exception while trying to kill process: Error: kill EPERM\u001b[22m\n\u001b[2m  - [pid=18835] <process did exit: exitCode=null, signal=SIGABRT>\u001b[22m\n\u001b[2m  - [pid=18835] starting temporary directories cleanup\u001b[22m\n\u001b[2m  - [pid=18835] finished temporary directories cleanup\u001b[22m\n\u001b[2m  - [pid=18835] <gracefully close end>\u001b[22m) — snapshot 20260528 fallback"
        ],
        "fallbackUsage": [],
        "filled": true
      },
      "foreign_inst_flow": {
        "metric": "foreign_inst_flow",
        "status": "ok",
        "source": "neutral_fallback",
        "confidence": 0.5,
        "stale": true,
        "errors": [
          "no flow rows — neutral fallback"
        ],
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
