from __future__ import annotations

# Keep in sync with js/config.js BUY_GRADE_MIN_SCORES
TREND_GRADE_MIN = {"S": 8.5, "A": 7.0, "B": 5.5}
REVERSAL_GRADE_MIN = {"S": 8.5, "A": 7.0, "B": 5.5}


def grade_from_score(score: float, strategy: str) -> str:
    thresholds = REVERSAL_GRADE_MIN if strategy == "reversal" else TREND_GRADE_MIN
    if score >= thresholds["S"]:
        return "S"
    if score >= thresholds["A"]:
        return "A"
    if score >= thresholds["B"]:
        return "B"
    return "C"
