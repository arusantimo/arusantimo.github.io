import unittest

from jongga.mixed_exit_policy import select_mixed_exit_policy


class MixedExitPolicyTests(unittest.TestCase):
    def test_reversal_a7plus_accepts_s_grade_candidates(self):
        policy = select_mixed_exit_policy(
            {
                "strategy": "reversal",
                "gradeScore": 8.0,
                "grade": "S",
                "statusLabel": "관심후보",
                "entryEligible": False,
            }
        )

        self.assertTrue(policy["active"])
        self.assertEqual(policy["policyKey"], "reversal-a7plus-balanced")
        self.assertEqual(policy["stopPct"], -2.0)
        self.assertEqual(
            policy["takeProfitStages"],
            [
                {"targetPct": 2.0, "quantityPct": 50.0},
                {"targetPct": 10.0, "quantityPct": 50.0},
            ],
        )

    def test_pullback_a7plus_uses_stable_default_policy(self):
        policy = select_mixed_exit_policy(
            {
                "strategy": "pullback",
                "gradeScore": 7.0,
                "grade": "A",
                "statusLabel": "관심후보",
                "entryEligible": False,
            }
        )

        self.assertTrue(policy["active"])
        self.assertEqual(policy["policyKey"], "pullback-a7plus-balanced")
        self.assertEqual(policy["stopPct"], -2.0)
        self.assertEqual(
            policy["takeProfitStages"],
            [
                {"targetPct": 5.0, "quantityPct": 80.0},
                {"targetPct": 12.0, "quantityPct": 20.0},
            ],
        )
        self.assertEqual(policy["stopCondition"], "종가 기준 -2% 이탈")
        self.assertEqual(policy["stopTiming"], "종가 확인 후 전량 정리")

    def test_pullback_a7plus_uses_volatility_overlay_when_range_is_large(self):
        policy = select_mixed_exit_policy(
            {
                "strategy": "pullback",
                "gradeScore": 7.0,
                "grade": "A",
                "statusLabel": "관심후보",
                "entryEligible": False,
                "volatilityContext": {
                    "blendedState": "volatile",
                    "marketState": "volatile",
                    "stockState": "volatile",
                    "metrics": {"todayRangePct": 12.5, "atrPct10": 11.2, "returnStd20": 7.1, "vkospi": 87.3},
                },
            }
        )

        self.assertTrue(policy["active"])
        self.assertEqual(policy["policyKey"], "pullback-a7plus-balanced")
        self.assertEqual(policy["positionWeightHint"], "half")
        self.assertEqual(policy["positionWeightMultiplier"], 0.5)
        self.assertTrue(policy["volatilityOverlay"]["active"])
        self.assertTrue(policy["intradayRiskRule"]["active"])
        self.assertEqual(policy["intradayRiskRule"]["triggerPct"], -5.0)
        self.assertEqual(
            policy["takeProfitStages"],
            [
                {"targetPct": 3.0, "quantityPct": 50.0},
                {"targetPct": 8.0, "quantityPct": 50.0},
            ],
        )
        self.assertIn("장중 -5% 이상", policy["stopCondition"])
        self.assertIn("최종 손절은 종가", policy["stopTiming"])

    def test_accumulation_and_breakout_are_observe_only(self):
        base_entry = {
            "gradeScore": 7.2,
            "grade": "A",
            "statusLabel": "매수추천",
            "entryEligible": True,
        }

        accumulation = select_mixed_exit_policy({**base_entry, "strategy": "accumulation"})
        breakout = select_mixed_exit_policy({**base_entry, "strategy": "breakout"})

        self.assertFalse(accumulation["active"])
        self.assertEqual(accumulation["policyKey"], "observe-accumulation")
        self.assertEqual(accumulation["positionWeightHint"], "observe")
        self.assertFalse(breakout["active"])
        self.assertEqual(breakout["policyKey"], "observe-breakout")
        self.assertEqual(breakout["positionWeightHint"], "observe")

    def test_blocked_status_forces_observe_only_even_when_grade_is_high(self):
        policy = select_mixed_exit_policy(
            {
                "strategy": "pullback",
                "gradeScore": 8.2,
                "grade": "A",
                "statusLabel": "자동매수 금지",
                "entryEligible": True,
            }
        )

        self.assertFalse(policy["active"])
        self.assertEqual(policy["policyKey"], "observe-pullback")


if __name__ == "__main__":
    unittest.main()
