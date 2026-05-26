import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from engine.track_c_supply import filter_track_c_candidates, score_track_c  # noqa: E402


class TrackCFiltersTest(unittest.TestCase):
    def test_filter_range(self):
        rows = [
            {"code": "005930", "ahChangePct": 3.0},
            {"code": "000660", "ahChangePct": 5.5},
            {"code": "035420", "ahChangePct": 8.5},
        ]
        filtered = filter_track_c_candidates(rows)
        codes = [r["code"] for r in filtered]
        self.assertEqual(codes, ["000660"])

    def test_score_strong_open(self):
        row = {"code": "000660", "ahChangePct": 5.0, "ahVolume": 10000, "strongOpen": True}
        result = score_track_c(row, macro={"sox": 1.2})
        self.assertGreaterEqual(result["score"], 6.0)
        self.assertTrue(result["eligible"] or result["heldReason"] == "weak_open")


if __name__ == "__main__":
    unittest.main()
