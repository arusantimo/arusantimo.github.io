import unittest
from datetime import date
from pathlib import Path

from jongga.macro_overlay import (
    REGIME_BOX_INDEX,
    REGIME_BOX_MACRO,
    REGIME_ROTATION_BUFFERED,
    REGIME_STRONG_BULL,
    apply_regime_fields_to_context,
    build_pullback_g5_gate,
    classify_kospi_bull_tier,
    compute_effective_regime_label,
    is_rise_justified_by_macro,
    load_market_analyze_snapshot,
    trend_status_label,
)


def sample_macro_snapshot(*, critical: bool = False, anchor_score: float = 89.0) -> dict:
    return {
        "meta": {"resultDate": "20260526"},
        "data": {
            "bubbleCriticalTrigger": critical,
            "fundamentalAnchorState": "validated",
            "fundamentalAnchorScore": anchor_score,
            "marketRegimeKey": "anchor-buffered-overheat",
            "bubbleIndex": 47,
            "riskIndex": 66,
        },
    }


class MacroOverlayTest(unittest.TestCase):
    def test_load_market_analyze_snapshot_from_repo(self):
        snapshot = load_market_analyze_snapshot(Path(__file__).resolve().parents[3])
        if snapshot is None:
            self.skipTest("latest.js not available in workspace")
        self.assertIn("data", snapshot)

    def test_is_rise_justified_by_macro(self):
        snapshot = sample_macro_snapshot()
        self.assertTrue(is_rise_justified_by_macro(snapshot, "2026-05-26"))
        self.assertFalse(is_rise_justified_by_macro(snapshot, "2020-01-01"))
        self.assertFalse(is_rise_justified_by_macro(sample_macro_snapshot(critical=True), "20260526"))

    def test_compute_effective_regime_upgrade_to_strong_bull(self):
        effective, note = compute_effective_regime_label("박스권 ⚠️", True, "strong")
        self.assertEqual(effective, REGIME_STRONG_BULL)
        self.assertIn("강세장", note)

    def test_compute_effective_regime_rotation_when_maintain(self):
        effective, _ = compute_effective_regime_label("약세장 ⛔", True, "maintain")
        self.assertEqual(effective, REGIME_ROTATION_BUFFERED)

    def test_compute_effective_regime_box_macro_when_weak(self):
        effective, _ = compute_effective_regime_label("약세장 ⛔", True, "weak")
        self.assertEqual(effective, REGIME_BOX_MACRO)

    def test_compute_effective_regime_index_priority_without_macro(self):
        effective, _ = compute_effective_regime_label("약세장 ⛔", False, "strong")
        self.assertEqual(effective, REGIME_BOX_INDEX)

    def test_apply_regime_fields_updates_context(self):
        context = {
            "technicalRegimeLabel": "박스권 ⚠️",
            "regimeLabel": "박스권 ⚠️",
            "kospiClose": 2700.0,
            "kospiMa20": 2650.0,
            "kospiMa60": 2600.0,
            "kospiMa20Up": True,
            "kospiMa60Up": True,
        }
        enriched = apply_regime_fields_to_context(context, sample_macro_snapshot(), date(2026, 5, 26))
        self.assertEqual(enriched["effectiveRegimeLabel"], REGIME_STRONG_BULL)
        self.assertTrue(enriched["riseJustifiedByMacro"])
        self.assertEqual(enriched["openingBet"], "활성")

    def test_classify_kospi_bull_tier(self):
        self.assertEqual(
            classify_kospi_bull_tier({"kospiClose": 100, "kospiMa20": 90, "kospiMa60": 80, "kospiMa20Up": True, "kospiMa60Up": True}),
            "strong",
        )
        self.assertEqual(
            classify_kospi_bull_tier({"kospiClose": 100, "kospiMa20": 110, "kospiMa60": 80, "kospiMa20Up": False, "kospiMa60Up": True}),
            "maintain",
        )

    def test_trend_status_label_uses_effective_regime(self):
        label = trend_status_label("pullback", "A", REGIME_STRONG_BULL, "G-A", [], rise_justified=True, technical_regime="약세장 ⛔")
        self.assertEqual(label, "매수추천")

    def test_trend_status_label_softens_pure_bear(self):
        label = trend_status_label("pullback", "A", "약세장 ⛔", "G-A", [], rise_justified=False, technical_regime="약세장 ⛔")
        self.assertEqual(label, "관심후보(약세·소액)")

    def test_pullback_g5_warns_when_macro_friendly_and_vkospi_elevated(self):
        gate = build_pullback_g5_gate(
            {
                "kospiClose": 8100.0,
                "kospiMa5": 7600.0,
                "vkospiValue": 68.0,
                "vkospiLabel": "VKOSPI",
                "riseJustifiedByMacro": True,
                "regimeLabel": REGIME_STRONG_BULL,
            }
        )
        self.assertEqual(gate["status"], "⚠️")
        label = trend_status_label("pullback", "A", REGIME_STRONG_BULL, "G-A", [gate], rise_justified=True)
        self.assertEqual(label, "매수추천")

    def test_pullback_g5_warns_when_kospi_below_ma5(self):
        gate = build_pullback_g5_gate(
            {
                "kospiClose": 8100.0,
                "kospiMa5": 8500.0,
                "vkospiValue": 73.0,
                "vkospiLabel": "VKOSPI",
                "riseJustifiedByMacro": False,
                "regimeLabel": "박스권 ⚠️",
            }
        )
        self.assertEqual(gate["status"], "⚠️")
        self.assertIn("KOSPI 단기 추세 이탈", gate["note"])

    def test_trend_status_label_allows_pullback_b_conditionally(self):
        label = trend_status_label("pullback", "B", REGIME_STRONG_BULL, "G-A", [], rise_justified=True)
        self.assertEqual(label, "진입 가능(B·조건부)")

    def test_pullback_g5_warns_above_30_even_without_macro_until_warn_cap(self):
        gate = build_pullback_g5_gate(
            {
                "kospiClose": 8100.0,
                "kospiMa5": 7600.0,
                "vkospiValue": 68.0,
                "vkospiLabel": "VKOSPI",
                "riseJustifiedByMacro": False,
                "regimeLabel": "박스권 ⚠️",
            }
        )
        self.assertEqual(gate["status"], "⚠️")

    def test_pullback_g5_blocks_above_warn_cap_without_macro(self):
        gate = build_pullback_g5_gate(
            {
                "kospiClose": 8100.0,
                "kospiMa5": 7600.0,
                "vkospiValue": 78.0,
                "vkospiLabel": "VKOSPI",
                "riseJustifiedByMacro": False,
                "regimeLabel": "박스권 ⚠️",
            }
        )
        self.assertEqual(gate["status"], "⛔")

    def test_pullback_g5_blocks_above_macro_cap_even_when_friendly(self):
        gate = build_pullback_g5_gate(
            {
                "kospiClose": 8100.0,
                "kospiMa5": 7600.0,
                "vkospiValue": 88.0,
                "vkospiLabel": "VKOSPI",
                "riseJustifiedByMacro": True,
                "regimeLabel": REGIME_STRONG_BULL,
            }
        )
        self.assertEqual(gate["status"], "⛔")


if __name__ == "__main__":
    unittest.main()
