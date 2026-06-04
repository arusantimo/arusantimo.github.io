import unittest
from types import SimpleNamespace

from jongga.rule_evaluation import eval_not_met
from jongga.scoring import (
    BREAKOUT_STRICT_MAX,
    BREAKOUT_WEIGHTS,
    apply_buy_scoring,
    grade_score_from_strict,
    rank_buy_entries,
)


class ScoringTests(unittest.TestCase):
    def test_breakout_partial_c3_raises_signal_not_strict(self):
        snapshot = SimpleNamespace(
            high_20d=100.0,
            current_price=50.0,
            toss={"avgStrength": 0, "intradayAbove100Ratio": 0},
            orderbook={"bidAskRatio": 1.1},
        )
        score_map = {code: eval_not_met("x") for code in BREAKOUT_WEIGHTS}
        result = apply_buy_scoring(
            strategy="breakout",
            score_map=score_map,
            weights=BREAKOUT_WEIGHTS,
            strict_max=BREAKOUT_STRICT_MAX,
            vkospi_multiplier=1.0,
            snapshot=snapshot,
        )
        self.assertEqual(result["strictScore"], 0.0)
        self.assertEqual(result["signalScore"], 0.5)
        c3 = next(row for row in result["scoreBreakdown"] if row["code"] == "C3")
        self.assertEqual(c3["strictPoints"], 0.0)
        self.assertEqual(c3["signalPoints"], 0.5)

    def test_grade_uses_strict_normalized_to_ten(self):
        grade_score = grade_score_from_strict(10.0, 12.5)
        self.assertEqual(grade_score, 8.0)

    def test_rank_buy_entries_prefers_strict_then_eligible(self):
        ranked = rank_buy_entries([
            {"entryEligible": False, "strictScore": 9.0, "signalScore": 9.0},
            {"entryEligible": True, "strictScore": 7.0, "signalScore": 10.0},
            {"entryEligible": True, "strictScore": 8.0, "signalScore": 6.0},
        ])
        self.assertTrue(ranked[0]["entryEligible"])
        self.assertEqual(ranked[0]["strictScore"], 8.0)


if __name__ == "__main__":
    unittest.main()
