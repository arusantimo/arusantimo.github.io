from __future__ import annotations

import sys
import unittest
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from scripts.regime_policy import (  # noqa: E402
    ANCHOR_BUFFERED_OVERHEAT_KEY,
    decorate_bubble_overlay,
    resolve_hot_zone_market_regime,
)


def build_signal(score: float, *, critical: bool = False) -> dict:
    return {
        "score": score,
        "state": "critical" if critical else "warning",
        "critical": critical,
        "label": "test",
        "reason": "test",
        "metrics": {},
        "updatedAt": "2026-05-24T00:00:00+09:00",
    }


def build_live_like_fixture(**overrides) -> dict:
    data = {
        "fx": 1516,
        "equityOverboughtScore": 85,
        "fundamentalAnchorState": "validated",
        "fundamentalAnchorScore": 81,
        "fundamentalSupportScore": 25,
        "riskIndex": 85,
        "bubbleSignals": {
            "marginDebt": build_signal(55),
            "ipo": build_signal(27),
            "trash": build_signal(27),
            "fed": build_signal(27),
        },
    }
    data.update(overrides)
    return data


class RegimePolicyTests(unittest.TestCase):
    def test_anchor_buffered_overheat_for_live_like_fixture(self) -> None:
        fixture = build_live_like_fixture()
        regime = resolve_hot_zone_market_regime(
            fixture,
            fx=fixture["fx"],
            equity_overbought=fixture["equityOverboughtScore"],
            fundamental_support_score=fixture["fundamentalSupportScore"],
            risk_index=fixture["riskIndex"],
        )

        self.assertEqual(regime["marketRegimeKey"], ANCHOR_BUFFERED_OVERHEAT_KEY)
        self.assertEqual(regime["marketRegimeLabel"], "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)")
        self.assertEqual(regime["riskIndex"], 80)
        self.assertFalse(regime["debasementAlert"])

    def test_high_bubble_index_falls_back_to_debasement(self) -> None:
        fixture = build_live_like_fixture(
            bubbleSignals={
                "marginDebt": build_signal(75),
                "ipo": build_signal(60),
                "trash": build_signal(55),
                "fed": build_signal(50),
            }
        )
        regime = resolve_hot_zone_market_regime(
            fixture,
            fx=fixture["fx"],
            equity_overbought=fixture["equityOverboughtScore"],
            fundamental_support_score=fixture["fundamentalSupportScore"],
            risk_index=fixture["riskIndex"],
        )

        self.assertEqual(regime["marketRegimeKey"], "debasement-bubble")
        self.assertTrue(regime["debasementAlert"])

    def test_anchor_buffered_bubble_uses_gear_second_overlay(self) -> None:
        bubble = decorate_bubble_overlay(
            {
                "marketRegimeKey": ANCHOR_BUFFERED_OVERHEAT_KEY,
                "marketRegimeReason": "앵커와 비critical bubble이 완충 중입니다.",
                "bubbleSignals": {
                    "marginDebt": build_signal(55),
                    "ipo": build_signal(27),
                    "trash": build_signal(27),
                    "fed": build_signal(27),
                },
            }
        )

        self.assertEqual(bubble["bubbleState"], "gear-second")
        self.assertEqual(bubble["bubbleIndex"], 34)
        self.assertFalse(bubble["bubbleCriticalTrigger"])
        self.assertIn("완충형 과열", bubble["bubbleRegimeLabel"])


if __name__ == "__main__":
    unittest.main()
