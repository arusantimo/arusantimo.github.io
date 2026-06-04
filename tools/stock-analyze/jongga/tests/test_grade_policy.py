import unittest

from jongga.grade_policy import TREND_GRADE_MIN, grade_from_score


class GradePolicyTest(unittest.TestCase):
    def test_trend_grade_thresholds_relaxed(self):
        self.assertEqual(grade_from_score(8.5, "pullback"), "S")
        self.assertEqual(grade_from_score(8.4, "momentum"), "A")
        self.assertEqual(grade_from_score(7.0, "pullback"), "A")
        self.assertEqual(grade_from_score(5.5, "pullback"), "B")
        self.assertEqual(grade_from_score(5.4, "pullback"), "C")

    def test_reversal_grade_thresholds(self):
        self.assertEqual(grade_from_score(8.5, "reversal"), "S")
        self.assertEqual(grade_from_score(8.4, "reversal"), "A")
        self.assertEqual(grade_from_score(7.0, "reversal"), "A")
        self.assertEqual(grade_from_score(5.5, "reversal"), "B")
        self.assertEqual(grade_from_score(5.4, "reversal"), "C")

    def test_trend_constants_match_guide(self):
        self.assertEqual(TREND_GRADE_MIN["S"], 8.5)
        self.assertEqual(TREND_GRADE_MIN["A"], 7.0)


if __name__ == "__main__":
    unittest.main()
