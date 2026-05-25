from __future__ import annotations

import sys
import unittest
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from scripts.cycle_policy import (  # noqa: E402
    ANCHOR_BUFFERED_CYCLE_KEY,
    calculate_cycle_runtime_values,
)


def build_cycle_fixture(**overrides) -> dict:
    data = {
        "riskIndex": 66,
        "previousRiskIndex": 85,
        "cycleLeg": "rising",
        "vix": 16.7,
        "bullRatio": 50,
        "disparity": 167.7,
        "marketRegimeKey": ANCHOR_BUFFERED_CYCLE_KEY,
        "marketRegimeReason": "앵커와 비critical bubble이 과열을 완충합니다.",
        "bubbleCriticalTrigger": False,
        "bubbleCriticalReason": "Critical Trigger 미발동",
        "fundamentalSupportScore": 25,
        "supportOffsetPoints": 7.5,
        "rawRiskIndex": 63,
        "leaderStocks": [
            {
                "weight": 1.0,
                "drawdown15dPct": -2.7,
                "dayReturnPct": 0.1,
                "shockValueRatio": 0.83,
                "closeRecoveryRate": 0.66,
            }
        ],
    }
    data.update(overrides)
    return data


class CyclePolicyTests(unittest.TestCase):
    def test_anchor_buffered_cycle_keeps_rising_leg(self) -> None:
        cycle = calculate_cycle_runtime_values(build_cycle_fixture())

        self.assertEqual(cycle["cycleLeg"], "rising")
        self.assertEqual(cycle["cycleStageKey"], "greed")
        self.assertEqual(cycle["cycleStageLabel"], "상승 5: 탐욕")
        self.assertEqual(cycle["trapScore"], 0)

    def test_trap_hard_stop_bypasses_anchor_buffer(self) -> None:
        cycle = calculate_cycle_runtime_values(
            build_cycle_fixture(
                leaderStocks=[
                    {
                        "weight": 1.0,
                        "drawdown15dPct": -10.0,
                        "dayReturnPct": -7.0,
                        "shockValueRatio": 1.6,
                        "threeDayDropPct": -9.0,
                        "threeDayValueRatio": 1.2,
                        "closeRecoveryRate": 0.2,
                    }
                ],
                retailNetToday=2000,
                retailNet10dCum=10000,
                retailNet10dAbsAvg=1000,
                foreignNetToday=-3000,
                foreignNet10dCum=-5000,
                institutionNetToday=-2000,
                institutionNet10dCum=-4000,
                marginShockChangePct=2.0,
                depositMarginRatio=0.25,
            )
        )

        self.assertGreaterEqual(cycle["trapScore"], 14)
        self.assertEqual(cycle["cycleLeg"], "falling")
        self.assertEqual(cycle["cycleStageKey"], "denial")


if __name__ == "__main__":
    unittest.main()
