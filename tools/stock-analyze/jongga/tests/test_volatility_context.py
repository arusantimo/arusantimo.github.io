import unittest
from types import SimpleNamespace

from jongga.volatility_context import (
    CALM,
    FAVORABLE,
    FIT_NEUTRAL,
    NEUTRAL,
    UNFAVORABLE,
    VOLATILE,
    blend_volatility_state,
    build_volatility_context,
    classify_market_state,
    classify_stock_state,
)


def make_snapshot(*, close_history, high_history, low_history, prev_close, high_price, low_price):
    return SimpleNamespace(
        close_history=close_history,
        high_history=high_history,
        low_history=low_history,
        prev_close=prev_close,
        high_price=high_price,
        low_price=low_price,
    )


class VolatilityContextTests(unittest.TestCase):
    def test_market_state_thresholds(self):
        self.assertEqual(classify_market_state({"effectiveRegimeLabel": "강세장 ✅", "vkospiValue": 17.8}), CALM)
        self.assertEqual(classify_market_state({"effectiveRegimeLabel": "강세장 ✅", "vkospiValue": 26.0}), VOLATILE)
        self.assertEqual(classify_market_state({"effectiveRegimeLabel": "박스권 ⚠️", "vkospiValue": 20.0}), VOLATILE)
        self.assertEqual(classify_market_state({"effectiveRegimeLabel": "순환매장 🔄", "vkospiValue": 21.5}), NEUTRAL)

    def test_stock_state_thresholds(self):
        calm_snapshot = make_snapshot(
            close_history=[100.0, 99.8, 99.5, 99.7, 99.4, 99.3, 99.0, 98.9, 99.1, 99.0, 98.8],
            high_history=[101.0] * 11,
            low_history=[99.2] * 11,
            prev_close=99.8,
            high_price=101.0,
            low_price=99.2,
        )
        calm_state, calm_metrics = classify_stock_state(calm_snapshot)
        self.assertEqual(calm_state, CALM)
        self.assertLessEqual(calm_metrics["atrPct10"], 2.2)

        volatile_snapshot = make_snapshot(
            close_history=[100.0, 94.0, 101.0, 95.0, 102.0, 96.0, 103.0, 97.0, 104.0, 96.0, 105.0],
            high_history=[108.0] * 11,
            low_history=[92.0] * 11,
            prev_close=94.0,
            high_price=108.0,
            low_price=92.0,
        )
        volatile_state, volatile_metrics = classify_stock_state(volatile_snapshot)
        self.assertEqual(volatile_state, VOLATILE)
        self.assertGreaterEqual(volatile_metrics["todayRangePct"], 6.0)

    def test_blended_state_logic(self):
        self.assertEqual(blend_volatility_state(VOLATILE, CALM), VOLATILE)
        self.assertEqual(blend_volatility_state(CALM, CALM), CALM)
        self.assertEqual(blend_volatility_state(NEUTRAL, CALM), NEUTRAL)

    def test_strategy_mapping_uses_requested_direction(self):
        snapshot = make_snapshot(
            close_history=[100.0, 94.0, 101.0, 95.0, 102.0, 96.0, 103.0, 97.0, 104.0, 96.0, 105.0],
            high_history=[108.0] * 11,
            low_history=[92.0] * 11,
            prev_close=94.0,
            high_price=108.0,
            low_price=92.0,
        )
        volatile_context = {"effectiveRegimeLabel": "박스권 ⚠️", "vkospiValue": 26.0}

        breakout = build_volatility_context(snapshot, volatile_context, "breakout")
        pullback = build_volatility_context(snapshot, volatile_context, "pullback")
        accumulation = build_volatility_context(snapshot, volatile_context, "accumulation")
        reversal = build_volatility_context(snapshot, volatile_context, "reversal")

        self.assertEqual(breakout["strategyFit"], UNFAVORABLE)
        self.assertEqual(breakout["scoreDelta"], -1.0)
        self.assertEqual(pullback["strategyFit"], FAVORABLE)
        self.assertEqual(pullback["scoreDelta"], 0.75)
        self.assertEqual(accumulation["strategyFit"], FAVORABLE)
        self.assertEqual(accumulation["scoreDelta"], 0.75)
        self.assertEqual(reversal["strategyFit"], FAVORABLE)
        self.assertEqual(reversal["scoreDelta"], 1.0)

    def test_calm_breakout_context_is_favorable(self):
        snapshot = make_snapshot(
            close_history=[100.0, 99.8, 99.5, 99.7, 99.4, 99.3, 99.0, 98.9, 99.1, 99.0, 98.8],
            high_history=[101.0] * 11,
            low_history=[99.2] * 11,
            prev_close=99.8,
            high_price=101.0,
            low_price=99.2,
        )
        calm_context = {"effectiveRegimeLabel": "강세장 ✅", "vkospiValue": 17.5}
        breakout = build_volatility_context(snapshot, calm_context, "breakout")
        accumulation = build_volatility_context(snapshot, calm_context, "accumulation")

        self.assertEqual(breakout["blendedState"], CALM)
        self.assertEqual(breakout["strategyFit"], FAVORABLE)
        self.assertEqual(breakout["scoreDelta"], 1.0)
        self.assertEqual(accumulation["strategyFit"], UNFAVORABLE)
        self.assertEqual(accumulation["scoreDelta"], -0.5)
        self.assertIn("저변동성", breakout["reason"])


if __name__ == "__main__":
    unittest.main()
