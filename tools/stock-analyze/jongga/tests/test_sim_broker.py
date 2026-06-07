import unittest

from jongga.sim_broker import BUY_FEE_PCT, SELL_FEE_PCT, SELL_TAX_PCT, net_return_pct, simulate_trade


class SimBrokerTests(unittest.TestCase):
    def _market_data(
        self,
        *,
        day1_open=10000.0,
        day1_high=10500.0,
        day1_low=9800.0,
        day1_close=10100.0,
        day2_open=10080.0,
        day2_high=10300.0,
        day2_low=9800.0,
        day2_close=10080.0,
    ):
        return {
            "entryBar": {
                "timestamp": "2026-06-03T15:30:00+09:00",
                "open": 10000.0,
                "high": 10000.0,
                "low": 10000.0,
                "close": 10000.0,
                "volume": 0.0,
                "source": "daily_ohlc_fallback",
            },
            "replayBars": [
                {
                    "timestamp": "2026-06-04T09:00:00+09:00",
                    "open": day1_open,
                    "high": day1_open,
                    "low": day1_open,
                    "close": day1_open,
                    "volume": 0.0,
                    "source": "daily_ohlc_fallback",
                    "phase": "day1_open",
                },
                {
                    "timestamp": "2026-06-04T10:00:00+09:00",
                    "open": day1_open,
                    "high": day1_high,
                    "low": day1_low,
                    "close": day1_open,
                    "volume": 0.0,
                    "source": "daily_ohlc_fallback",
                    "phase": "day1_morning_cutoff",
                },
                {
                    "timestamp": "2026-06-04T15:00:00+09:00",
                    "open": day1_open,
                    "high": day1_high,
                    "low": day1_low,
                    "close": day1_close,
                    "volume": 0.0,
                    "source": "daily_ohlc_fallback",
                    "phase": "day1_session_cutoff",
                },
                {
                    "timestamp": "2026-06-05T09:00:00+09:00",
                    "open": day2_open,
                    "high": day2_open,
                    "low": day2_open,
                    "close": day2_open,
                    "volume": 0.0,
                    "source": "daily_ohlc_fallback",
                    "phase": "day2_open",
                },
                {
                    "timestamp": "2026-06-05T15:00:00+09:00",
                    "open": day2_open,
                    "high": day2_high,
                    "low": day2_low,
                    "close": day2_close,
                    "volume": 0.0,
                    "source": "daily_ohlc_fallback",
                    "phase": "day2_final_cutoff",
                },
            ],
            "replaySchedule": {
                "primaryTargetUntil": "2026-06-04T10:00:00+09:00",
                "secondaryTargetFrom": "2026-06-04T10:00:00+09:00",
                "secondaryTargetUntil": "2026-06-04T15:00:00+09:00",
                "finalExitAt": "2026-06-05T15:00:00+09:00",
            },
        }

    def _plan(self):
        return [
            {"stage": "🌅 프리마켓", "quantity": "40% 익절", "targetYield": "+2.0%", "targetPrice": "10,200원"},
            {"stage": "🔔 장초반", "quantity": "30% 익절", "targetYield": "+4.0%", "targetPrice": "10,400원"},
            {"stage": "📈 장중 1차", "quantity": "30% 익절", "targetYield": "+6.0%", "targetPrice": "10,600원"},
            {"stage": "🛑 손절", "quantity": "전량", "targetYield": "-3.0%", "targetPrice": "9,700원"},
        ]

    def _simulate(self, market_data, *, auto_flatten=True):
        return simulate_trade(
            run_id="run-1",
            date="2026-06-03",
            variant="stable",
            strategy="pullback",
            code="000001",
            name="테스트",
            source_entry_key="20260603|stable|pullback|000001",
            trade_plan_rows=self._plan(),
            market_data=market_data,
            auto_flatten=auto_flatten,
        )

    def test_target_hit_wins_even_if_same_day_close_finishes_below_stop(self):
        result = self._simulate(self._market_data(day1_high=10300.0, day1_low=9600.0, day1_close=9600.0))
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "primary_target_touch")
        self.assertEqual(result["result"]["ambiguousCount"], 0)
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)
        self.assertTrue(any(fill["fillRule"] == "primary_target_touch" for fill in result["fills"]))

    def test_primary_target_hits_by_first_day_morning_cutoff(self):
        result = self._simulate(self._market_data(day1_high=10450.0, day1_low=9900.0, day1_close=10350.0))
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "primary_target_touch")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-04T10:00:00+09:00")
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)

    def test_secondary_target_hits_by_first_day_session_cutoff(self):
        result = self._simulate(self._market_data(day1_high=10180.0, day1_low=9900.0, day1_close=10140.0))
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "secondary_target_touch")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-04T15:00:00+09:00")
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)

    def test_intraday_stop_breach_without_close_break_does_not_stop(self):
        result = self._simulate(
            self._market_data(
                day1_high=10100.0,
                day1_low=9600.0,
                day1_close=10050.0,
                day2_open=10080.0,
                day2_high=10100.0,
                day2_low=9600.0,
                day2_close=10020.0,
            )
        )
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "third_day_cutoff_market")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-05T15:00:00+09:00")
        self.assertEqual(result["result"]["exitLastFillPrice"], 10020.0)

    def test_close_below_stop_uses_close_price_for_stop_exit(self):
        result = self._simulate(self._market_data(day1_high=10100.0, day1_low=9600.0, day1_close=9600.0, day2_high=10100.0, day2_low=9500.0))
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "stop_close")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-04T15:00:00+09:00")
        self.assertEqual(result["result"]["exitLastFillPrice"], 9600.0)
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)

    def test_final_cutoff_sells_remaining_position_on_third_day(self):
        result = self._simulate(
            self._market_data(
                day1_high=10100.0,
                day1_low=9800.0,
                day1_close=10050.0,
                day2_open=10080.0,
                day2_high=10100.0,
                day2_low=9800.0,
                day2_close=10030.0,
            )
        )
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "third_day_cutoff_market")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-05T15:00:00+09:00")
        self.assertEqual(result["result"]["exitLastFillPrice"], 10030.0)

    def test_second_followup_day_close_below_stop_also_triggers_stop_close(self):
        result = self._simulate(
            self._market_data(
                day1_high=10100.0,
                day1_low=9800.0,
                day1_close=10050.0,
                day2_open=10080.0,
                day2_high=10100.0,
                day2_low=9500.0,
                day2_close=9600.0,
            )
        )
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "stop_close")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-05T15:00:00+09:00")
        self.assertEqual(result["result"]["exitLastFillPrice"], 9600.0)
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)

    def test_single_followup_day_uses_day1_cutoff_for_flattening(self):
        market_data = self._market_data(day1_high=10100.0, day1_low=9800.0, day1_close=10050.0, day2_open=10080.0, day2_high=10100.0, day2_low=9800.0)
        market_data["replayBars"] = market_data["replayBars"][:3]
        market_data["replaySchedule"] = {
            "primaryTargetUntil": "2026-06-04T10:00:00+09:00",
            "secondaryTargetFrom": "2026-06-04T10:00:00+09:00",
            "secondaryTargetUntil": "2026-06-04T15:00:00+09:00",
            "finalExitAt": "2026-06-04T15:00:00+09:00",
        }
        result = self._simulate(market_data)
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "third_day_cutoff_market")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-04T15:00:00+09:00")

    def test_no_fill_without_auto_flatten_keeps_position_open(self):
        result = self._simulate(
            self._market_data(day1_high=10100.0, day1_low=9800.0, day1_close=10050.0, day2_open=10080.0, day2_high=10100.0, day2_low=9800.0),
            auto_flatten=False,
        )
        self.assertEqual(result["result"]["tradeStatus"], "open")
        self.assertEqual(result["result"]["filledExitQuantityPct"], 0.0)
        self.assertEqual(result["result"]["remainingQuantityPct"], 100.0)

    def test_net_return_pct_includes_fee_tax_and_slippage(self):
        entry_fill = {"fillPrice": 10010.0, "filledQuantityPct": 100.0}
        exit_fills = [{"fillPrice": 10200.0, "filledQuantityPct": 100.0}]
        actual = net_return_pct(entry_fill, exit_fills)
        expected_cost = 10010.0 * (1.0 + BUY_FEE_PCT / 100.0)
        expected_proceeds = 10200.0 * (1.0 - (SELL_FEE_PCT + SELL_TAX_PCT) / 100.0)
        expected = ((expected_proceeds / expected_cost) - 1.0) * 100.0
        self.assertAlmostEqual(actual, expected, places=6)


if __name__ == "__main__":
    unittest.main()
