import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from engine.ats_execution_plan import build_ats_execution_plan, get_execution_schedule_summary  # noqa: E402


class AtsExecutionPlanTest(unittest.TestCase):
    def test_build_plan_has_ats_window_and_krx_liquidation(self):
        plan = build_ats_execution_plan(
            ah_row={
                "expectedOpen": 935000,
                "ahPrice": 925000,
                "ahChangePct": 5.2,
            },
            entry_weight=0.8,
        )
        self.assertEqual(plan["venue"], "ATS")
        self.assertEqual(plan["entryWindow"]["start"], "08:00")
        self.assertEqual(plan["entryWindow"]["end"], "08:30")
        self.assertEqual(plan["mustFlatBy"], "08:30")
        self.assertEqual(plan["krxLiquidation"]["at"], "09:00")
        self.assertEqual(plan["analysisDeadline"], "07:40")
        self.assertEqual(plan["reviewUntil"], "08:00")
        self.assertGreater(plan["buyOrder"]["limitPrice"], 0)
        self.assertGreater(plan["krxLiquidation"]["limitPrice"], 0)

    def test_schedule_summary(self):
        summary = get_execution_schedule_summary()
        self.assertEqual(summary["profile"], "ats")
        self.assertEqual(summary["analysis"]["deadline"], "07:40")
        self.assertEqual(summary["reviewWindow"], "07:40~08:00")
        self.assertIn("08:00", summary["ats"]["entryWindow"])


if __name__ == "__main__":
    unittest.main()
