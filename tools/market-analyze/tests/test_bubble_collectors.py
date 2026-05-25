from __future__ import annotations

import sys
import unittest
from datetime import date, timedelta
from pathlib import Path
from unittest.mock import patch


ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from scripts.bubble_collectors import collect_ipo_glut_flag  # noqa: E402
from scripts.ipo_profitability import (  # noqa: E402
    extract_sec_profitability_metric,
    parse_marketwatch_eps,
    parse_stockanalysis_net_income,
    parse_stockanalysis_snapshot_eps,
)


def build_recent_ipo_rows(count: int, return_pct: float) -> list[dict]:
    return [
        {
            "ticker": f"T{index:02d}",
            "company": f"IPO {index}",
            "offerDate": date.today() - timedelta(days=index),
            "returnPct": return_pct,
        }
        for index in range(count)
    ]


class BubbleCollectorsTests(unittest.TestCase):
    def test_extract_sec_profitability_metric_prefers_net_income(self) -> None:
        metric = extract_sec_profitability_metric(
            {
                "facts": {
                    "us-gaap": {
                        "NetIncomeLoss": {
                            "units": {
                                "USD": [
                                    {
                                        "val": -3900000,
                                        "form": "S-1/A",
                                        "filed": "2026-04-24",
                                        "end": "2025-12-31",
                                    }
                                ]
                            }
                        },
                        "EarningsPerShareBasic": {
                            "units": {
                                "USD/shares": [
                                    {
                                        "val": -4.5,
                                        "form": "S-1/A",
                                        "filed": "2026-04-24",
                                        "end": "2025-12-31",
                                    }
                                ]
                            }
                        },
                    }
                }
            }
        )

        self.assertIsNotNone(metric)
        self.assertEqual(metric["metricType"], "netIncome")
        self.assertEqual(metric["metricKey"], "NetIncomeLoss")
        self.assertLess(metric["value"], 0)

    def test_html_profitability_parsers_support_eps_and_net_income(self) -> None:
        self.assertEqual(
            parse_stockanalysis_snapshot_eps(
                '<td class="label">EPS</td><td class="value">-4.56</td>'
            ),
            -4.56,
        )
        self.assertEqual(
            parse_stockanalysis_net_income(
                'Net Income</div></td><td class="svelte-1dxpo91">-73.07</td>'
            ),
            -73.07,
        )
        self.assertEqual(
            parse_marketwatch_eps(
                '<small class="label">EPS</small><span class="primary ">$1.11</span>'
            ),
            1.11,
        )

    def test_collect_ipo_glut_flag_is_partial_without_profitability_coverage(self) -> None:
        with patch(
            "scripts.bubble_collectors.fetch_text",
            return_value="<html></html>",
        ), patch(
            "scripts.bubble_collectors.parse_renaissance_pricings",
            return_value=build_recent_ipo_rows(16, 85.0),
        ), patch(
            "scripts.bubble_collectors.collect_ipo_profitability_samples",
            return_value={
                "coveredCount": 0,
                "missingCount": 16,
                "lossMakingCount": 0,
                "lossMakingRatioPct": None,
                "coverageRatioPct": 0.0,
                "sourceSummary": "",
                "sourceDomains": [],
                "sourceBreakdown": {},
                "missingTickers": ["T00"],
            },
        ), patch(
            "scripts.bubble_collectors.fetch_yahoo_chart",
            side_effect=[
                {"regularMarketPrice": 33.0, "closes": [31.0, 32.0, 33.0]},
                {"regularMarketPrice": 510.0, "closes": [505.0, 507.0, 510.0]},
            ],
        ), patch(
            "scripts.bubble_collectors.build_ratio_metrics",
            return_value={
                "outperformancePct": 8.0,
                "overshootPct": 108.0,
                "currentRatio": 0.12,
                "sma20": 0.11,
                "durationDays": 2,
            },
        ):
            result = collect_ipo_glut_flag({})

        signal = result.data_patch["bubbleSignals"]["ipo"]
        self.assertEqual(result.status["state"], "partial")
        self.assertFalse(signal["critical"])
        self.assertIsNone(signal["metrics"]["lossMakingRatioPct"])
        self.assertLess(signal["score"], 70)

    def test_collect_ipo_glut_flag_can_become_critical(self) -> None:
        with patch(
            "scripts.bubble_collectors.fetch_text",
            return_value="<html></html>",
        ), patch(
            "scripts.bubble_collectors.parse_renaissance_pricings",
            return_value=build_recent_ipo_rows(20, 120.0),
        ), patch(
            "scripts.bubble_collectors.collect_ipo_profitability_samples",
            return_value={
                "coveredCount": 18,
                "missingCount": 2,
                "lossMakingCount": 13,
                "lossMakingRatioPct": 72.22,
                "coverageRatioPct": 90.0,
                "sourceSummary": "SEC companyfacts 6건 · StockAnalysis EPS 12건",
                "sourceDomains": ["sec.gov", "stockanalysis.com"],
                "sourceBreakdown": {"sec-companyfacts": 6, "stockanalysis-eps": 12},
                "missingTickers": ["T18", "T19"],
            },
        ), patch(
            "scripts.bubble_collectors.fetch_yahoo_chart",
            side_effect=[
                {"regularMarketPrice": 40.0, "closes": [33.0, 36.0, 40.0]},
                {"regularMarketPrice": 500.0, "closes": [490.0, 495.0, 500.0]},
            ],
        ), patch(
            "scripts.bubble_collectors.build_ratio_metrics",
            return_value={
                "outperformancePct": 12.0,
                "overshootPct": 111.0,
                "currentRatio": 0.14,
                "sma20": 0.12,
                "durationDays": 4,
            },
        ):
            result = collect_ipo_glut_flag({})

        signal = result.data_patch["bubbleSignals"]["ipo"]
        self.assertEqual(result.status["state"], "ok")
        self.assertTrue(signal["critical"])
        self.assertGreaterEqual(signal["score"], 85)
        self.assertAlmostEqual(signal["metrics"]["lossMakingRatioPct"], 72.22)


if __name__ == "__main__":
    unittest.main()
