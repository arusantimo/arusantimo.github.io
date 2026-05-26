import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from engine.fusion_ranker import build_result  # noqa: E402
from router.quality import MetricEnvelope  # noqa: E402


class FusionTest(unittest.TestCase):
    def test_build_result_blocks_when_incomplete(self):
        envelopes = {
            "eod_open_bet_signals": MetricEnvelope(
                "eod_open_bet_signals",
                value={"regime": "순환매장", "openBetActive": True, "candidates": []},
            ),
            "global_gap_bundle": MetricEnvelope(
                "global_gap_bundle",
                value={"grade": "G-B", "totalScore": 2, "nq": 0.1, "vix": 20, "sox": 0.5},
            ),
            "night_kospi_future": MetricEnvelope("night_kospi_future", value={"changePct": 0.2}),
            "overtime_single_board": MetricEnvelope("overtime_single_board", status="blocked"),
            "news_headlines": MetricEnvelope("news_headlines", value={"themes": []}),
        }
        result = build_result(
            envelopes,
            phase="final",
            trade_date="20260527",
            required_metrics=["overtime_single_board", "eod_open_bet_signals", "global_gap_bundle"],
        )
        self.assertEqual(result["dataQuality"]["status"], "incomplete")
        self.assertEqual(result["candidates"], [])


if __name__ == "__main__":
    unittest.main()
