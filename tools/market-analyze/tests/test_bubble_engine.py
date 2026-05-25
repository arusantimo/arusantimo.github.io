from __future__ import annotations

import sys
import unittest
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from scripts.bubble_engine import calculate_bubble_values  # noqa: E402


def build_signal(score: float, critical: bool = False) -> dict:
    return {
        "score": score,
        "state": "critical" if critical else "warning",
        "critical": critical,
        "label": "test",
        "reason": "test",
        "metrics": {},
        "updatedAt": "2026-05-24T00:00:00+09:00",
    }


class BubbleEngineTests(unittest.TestCase):
    def test_critical_requires_index_and_all_flags(self) -> None:
        result = calculate_bubble_values(
            {
                "marketRegimeKey": "debasement-bubble",
                "bubbleSignals": {
                    "marginDebt": build_signal(90, True),
                    "ipo": build_signal(90, True),
                    "trash": build_signal(90, True),
                    "fed": build_signal(70, False),
                },
            }
        )
        self.assertEqual(result["bubbleIndex"], 85)
        self.assertFalse(result["bubbleCriticalTrigger"])

    def test_all_critical_still_needs_threshold(self) -> None:
        result = calculate_bubble_values(
            {
                "marketRegimeKey": "secular-expansion",
                "bubbleSignals": {
                    "marginDebt": build_signal(80, True),
                    "ipo": build_signal(80, True),
                    "trash": build_signal(80, True),
                    "fed": build_signal(80, True),
                },
            }
        )
        self.assertEqual(result["bubbleIndex"], 80)
        self.assertFalse(result["bubbleCriticalTrigger"])
        self.assertEqual(result["bubbleState"], "gear-second")

    def test_critical_state_has_highest_priority(self) -> None:
        result = calculate_bubble_values(
            {
                "marketRegimeKey": "debasement-bubble",
                "bubbleSignals": {
                    "marginDebt": build_signal(90, True),
                    "ipo": build_signal(88, True),
                    "trash": build_signal(86, True),
                    "fed": build_signal(96, True),
                },
            }
        )
        self.assertTrue(result["bubbleCriticalTrigger"])
        self.assertEqual(result["bubbleState"], "critical")
        self.assertIn("Critical Trigger 발동", result["bubbleCriticalReason"])


if __name__ == "__main__":
    unittest.main()
