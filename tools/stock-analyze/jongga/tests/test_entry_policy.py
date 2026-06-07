import unittest

from jongga.entry_policy import attach_entry_eligibility, compute_entry_eligibility


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

    def test_attach_entry_eligibility_adds_gapdown_status_reason(self):
        entry = attach_entry_eligibility(
            {
                "strategy": "pullback",
                "grade": "B",
                "statusLabel": "매매금지(갭다운 경고)",
                "gates": [],
                "filters": [],
            },
            {
                "gapScore": {
                    "code": "G-E",
                    "totalScore": "-11.5점",
                    "rows": [
                        {"indicator": "NQ 선물 변화율", "actualValue": "-5.04%", "weightedScore": "-5.0점"},
                        {"indicator": "원달러 환율 변화", "actualValue": "+52.00원", "weightedScore": "-3.0점"},
                        {"indicator": "SOX 전일 변화율", "actualValue": "-4.74%", "weightedScore": "-2.0점"},
                    ],
                }
            },
        )
        self.assertIn("갭 스코어 G-E", entry["statusReason"])
        self.assertIn("NQ -5.04%", entry["statusReason"])
        self.assertIn("원달러 +52.00원", entry["statusReasonShort"])

    def test_attach_entry_eligibility_adds_blocked_gate_reason(self):
        entry = attach_entry_eligibility(
            {
                "strategy": "pullback",
                "grade": "B",
                "statusLabel": "매매금지(핵심 Gate 미충족)",
                "gates": [{"code": "G0", "status": "⛔", "note": "최근 20일 최대 거래량 급증 166% (필요 ≥ 200%)"}],
                "filters": [],
            }
        )
        self.assertIn("G0 미충족", entry["statusReason"])
        self.assertIn("최근 20일 최대 거래량 급증 166%", entry["statusReasonShort"])


if __name__ == "__main__":
    unittest.main()
