import unittest
from types import SimpleNamespace

from jongga.rule_evaluation import eval_not_met
from jongga.scoring import (
    MOMENTUM_STRICT_MAX,
    MOMENTUM_WEIGHTS,
    apply_buy_scoring,
    grade_score_from_strict,
)


class ScoringTests(unittest.TestCase):
    def test_momentum_partial_c3_raises_signal_not_strict(self):
        snapshot = SimpleNamespace(
            high_20d=100.0,
            current_price=50.0,
            toss={"avgStrength": 0, "intradayAbove100Ratio": 0},
            orderbook={"bidAskRatio": 1.1},
        )
        score_map = {code: eval_not_met("x") for code in MOMENTUM_WEIGHTS}
        result = apply_buy_scoring(
            strategy="momentum",
            score_map=score_map,
            weights=MOMENTUM_WEIGHTS,
            strict_max=MOMENTUM_STRICT_MAX,
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


if __name__ == "__main__":
    unittest.main()
