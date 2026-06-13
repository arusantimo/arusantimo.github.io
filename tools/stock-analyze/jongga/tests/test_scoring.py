import unittest
from types import SimpleNamespace

from jongga.rule_evaluation import eval_not_met
from jongga.scoring import (
    ACCUMULATION_STRICT_MAX,
    ACCUMULATION_SCORE_WEIGHTS,
    BREAKOUT_STRICT_MAX,
    BREAKOUT_WEIGHTS,
    PULLBACK_SCORE_WEIGHTS,
    PULLBACK_STRICT_MAX,
    REVERSAL_SCORE_WEIGHTS,
    REVERSAL_STRICT_MAX,
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

    def test_accumulation_weights_include_late_buy_confirmation_codes(self):
        score_map = {code: eval_not_met("x") for code in ACCUMULATION_SCORE_WEIGHTS}
        snapshot = SimpleNamespace(toss={"avgStrength": 96.0, "lastHourAvgStrength": 118.0, "last30BuySellRatio": 1.4})
        score_map["S3"] = SimpleNamespace(score=1.0, eval_status="met", note="ok")
        score_map["S4"] = SimpleNamespace(score=1.0, eval_status="met", note="ok")
        score_map["C4"] = SimpleNamespace(score=1.0, eval_status="met", note="ok")
        result = apply_buy_scoring(
            strategy="accumulation",
            score_map=score_map,
            weights=ACCUMULATION_SCORE_WEIGHTS,
            strict_max=ACCUMULATION_STRICT_MAX,
            vkospi_multiplier=1.0,
            snapshot=snapshot,
        )
        self.assertEqual(result["strictScore"], 2.0)
        breakdown = {row["code"]: row for row in result["scoreBreakdown"]}
        self.assertEqual(breakdown["S3"]["maxPoints"], 1.0)
        self.assertEqual(breakdown["S4"]["maxPoints"], 0.5)
        self.assertEqual(breakdown["C4"]["maxPoints"], 0.5)
        self.assertEqual(ACCUMULATION_SCORE_WEIGHTS["S5"], 1.0)
        self.assertEqual(ACCUMULATION_STRICT_MAX, 13.0)

    def test_pullback_and_reversal_weights_are_split(self):
        self.assertEqual(PULLBACK_SCORE_WEIGHTS["S3"], 1.0)
        self.assertEqual(PULLBACK_SCORE_WEIGHTS["P3"], 1.0)
        self.assertEqual(PULLBACK_SCORE_WEIGHTS["C5"], 0.5)
        self.assertEqual(PULLBACK_STRICT_MAX, 13.5)
        self.assertNotIn("S3", REVERSAL_SCORE_WEIGHTS)
        self.assertEqual(REVERSAL_STRICT_MAX, 10.0)

    def test_volatility_bonus_adjusts_scores_and_breakdown(self):
        score_map = {code: eval_not_met("x") for code in BREAKOUT_WEIGHTS}
        result = apply_buy_scoring(
            strategy="breakout",
            score_map=score_map,
            weights=BREAKOUT_WEIGHTS,
            strict_max=BREAKOUT_STRICT_MAX,
            vkospi_multiplier=1.0,
            snapshot=SimpleNamespace(high_20d=100.0, current_price=95.0, toss={}, orderbook={}),
            volatility_context={
                "scoreDelta": -1.0,
                "summary": "불리 (고변동성 장세라 실패 돌파 위험 확대)",
            },
        )
        self.assertEqual(result["strictScore"], 0.0)
        self.assertEqual(result["signalScore"], 0.5)
        self.assertEqual(result["gradeScore"], 0.0)
        v1 = next(row for row in result["scoreBreakdown"] if row["code"] == "V1")
        self.assertEqual(v1["strictPoints"], -1.0)
        self.assertEqual(v1["signalPoints"], -1.0)
        self.assertEqual(v1["maxPoints"], 1.0)


if __name__ == "__main__":
    unittest.main()
