import unittest

from jongga.entry_policy import compute_entry_eligibility


class EntryPolicyTests(unittest.TestCase):
    def test_blocked_gate_disables_entry(self):
        result = compute_entry_eligibility(
            "momentum",
            "A",
            "매수추천",
            gates=[{"code": "G2", "status": "⛔", "note": "fail"}],
        )
        self.assertFalse(result["entryEligible"])
        self.assertTrue(any("G2" in item for item in result["entryBlockers"]))

    def test_high_score_with_buy_status_enables_entry(self):
        result = compute_entry_eligibility(
            "momentum",
            "A",
            "매수추천",
            gates=[{"code": "G1", "status": "✅", "note": "ok"}],
        )
        self.assertTrue(result["entryEligible"])

    def test_pullback_b_watch_status_enables_conditional_entry(self):
        result = compute_entry_eligibility(
            "pullback",
            "B",
            "진입 가능(B·조건부)",
            gates=[{"code": "G1", "status": "✅", "note": "ok"}],
        )
        self.assertTrue(result["entryEligible"])
        self.assertEqual(result["setupQuality"], "eligible")


if __name__ == "__main__":
    unittest.main()
