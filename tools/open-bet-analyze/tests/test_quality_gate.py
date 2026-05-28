import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from router.quality import MetricEnvelope, evaluate_quality  # noqa: E402


class QualityGateTest(unittest.TestCase):
    def test_incomplete_when_critical_missing(self):
        envelopes = {
            "overtime_single_board": MetricEnvelope("overtime_single_board", status="blocked"),
            "eod_open_bet_signals": MetricEnvelope("eod_open_bet_signals", value={"candidates": []}),
            "global_gap_bundle": MetricEnvelope("global_gap_bundle", value={"grade": "G-B"}),
        }
        quality = evaluate_quality(
            envelopes,
            ["overtime_single_board", "eod_open_bet_signals", "global_gap_bundle"],
        )
        self.assertEqual(quality["status"], "incomplete")
        self.assertIn("overtime_single_board", quality["missingRequired"])

    def test_complete_when_all_required_filled(self):
        envelopes = {
            "overtime_single_board": MetricEnvelope("overtime_single_board", value={"rows": []}),
            "eod_open_bet_signals": MetricEnvelope("eod_open_bet_signals", value={}),
            "global_gap_bundle": MetricEnvelope("global_gap_bundle", value={}),
        }
        quality = evaluate_quality(
            envelopes,
            ["overtime_single_board", "eod_open_bet_signals", "global_gap_bundle"],
        )
        self.assertEqual(quality["status"], "complete")

    def test_degraded_when_required_metric_is_stale(self):
        envelopes = {
            "overtime_single_board": MetricEnvelope("overtime_single_board", value={"rows": []}, stale=True),
            "eod_open_bet_signals": MetricEnvelope("eod_open_bet_signals", value={}),
            "global_gap_bundle": MetricEnvelope("global_gap_bundle", value={}),
        }
        quality = evaluate_quality(
            envelopes,
            ["overtime_single_board", "eod_open_bet_signals", "global_gap_bundle"],
        )
        self.assertEqual(quality["status"], "degraded")
        self.assertEqual(quality["staleRequired"], ["overtime_single_board"])


if __name__ == "__main__":
    unittest.main()
