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

    def _reversal_plan(self):
        return [
            {"stage": "1차 익절", "stageKey": "premarket", "quantity": "50% 익절", "targetYield": "+3.0%", "targetPrice": "10,300원"},
            {"stage": "2차 익절", "stageKey": "openPhase", "quantity": "50% 익절 (잔량 전량)", "targetYield": "+5.0%", "targetPrice": "10,500원"},
            {"stage": "손절", "stageKey": "stop", "quantity": "전량", "targetYield": "-1.0%", "targetPrice": "9,900원"},
        ]

    def _reversal_market_data(self, replay_bars):
        return {
            "entryBar": {
                "timestamp": "2026-06-03T15:30:00+09:00",
                "open": 10000.0,
                "high": 10000.0,
                "low": 10000.0,
                "close": 10000.0,
                "volume": 0.0,
                "source": "minute_test",
            },
            "replayBars": replay_bars,
            "replaySchedule": {
                "primaryTargetUntil": replay_bars[min(1, len(replay_bars) - 1)]["timestamp"],
                "secondaryTargetFrom": replay_bars[min(1, len(replay_bars) - 1)]["timestamp"],
                "secondaryTargetUntil": replay_bars[-1]["timestamp"],
                "finalExitAt": replay_bars[-1]["timestamp"],
            },
        }

    def _simulate_reversal(self, replay_bars):
        return simulate_trade(
            run_id="run-r1",
            date="2026-06-03",
            variant="stable",
            strategy="reversal",
            code="000002",
            name="리버설",
            source_entry_key="20260603|stable|reversal|000002",
            trade_plan_rows=self._reversal_plan(),
            market_data=self._reversal_market_data(replay_bars),
            reversal_live_exit_policy={
                "timeStopCutoff": "09:15",
                "timeStopMinBouncePct": 1.0,
                "breakevenActivationPct": 3.0,
            },
            auto_flatten=True,
        )

    def test_partial_target_fill_then_same_day_close_can_stop_remaining(self):
        result = self._simulate(self._market_data(day1_high=10300.0, day1_low=9600.0, day1_close=9600.0))
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "stop_close")
        self.assertEqual(result["result"]["ambiguousCount"], 0)
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)
        sell_fills = [fill for fill in result["fills"] if fill["orderId"].endswith(("premarket", "stop"))]
        self.assertEqual(len(sell_fills), 2)
        self.assertTrue(any(fill["fillRule"] == "premarket_touch" for fill in result["fills"]))
        self.assertTrue(any(fill["fillRule"] == "stop_close" for fill in result["fills"]))

    def test_multiple_targets_fill_in_price_order_on_same_bar(self):
        result = self._simulate(self._market_data(day1_high=10700.0, day1_low=9900.0, day1_close=10650.0))
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "intraday1_touch")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-04T10:00:00+09:00")
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)
        sell_fills = [fill for fill in result["fills"] if fill["orderId"] != "20260603|stable|pullback|000001-entry"]
        self.assertEqual([fill["fillRule"] for fill in sell_fills], ["premarket_touch", "openPhase_touch", "intraday1_touch"])

    def test_first_day_morning_cutoff_can_fill_two_targets_and_leave_remainder(self):
        result = self._simulate(self._market_data(day1_high=10450.0, day1_low=9900.0, day1_close=10350.0))
        self.assertEqual(result["result"]["tradeStatus"], "closed")
        self.assertEqual(result["result"]["closedReason"], "third_day_cutoff_market")
        self.assertEqual(result["result"]["exitFilledAt"], "2026-06-05T15:00:00+09:00")
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)
        self.assertTrue(any(fill["fillRule"] == "premarket_touch" for fill in result["fills"]))
        self.assertTrue(any(fill["fillRule"] == "openPhase_touch" for fill in result["fills"]))

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
                day1_high=10450.0,
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
        self.assertTrue(any(fill["fillRule"] == "openPhase_touch" for fill in result["fills"]))

    def test_second_followup_day_close_below_stop_also_triggers_stop_close(self):
        result = self._simulate(
            self._market_data(
                day1_high=10450.0,
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
        market_data = self._market_data(day1_high=10450.0, day1_low=9800.0, day1_close=10050.0, day2_open=10080.0, day2_high=10100.0, day2_low=9800.0)
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
        self.assertTrue(any(fill["fillRule"] == "openPhase_touch" for fill in result["fills"]))

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

    def test_reversal_intraday_low_break_does_not_exit_until_close_stop(self):
        result = self._simulate_reversal([
            {
                "timestamp": "2026-06-04T09:05:00+09:00",
                "open": 10020.0,
                "high": 10120.0,
                "low": 9890.0,
                "close": 9940.0,
                "volume": 0.0,
                "source": "minute_test",
                "phase": "day1_open",
            },
            {
                "timestamp": "2026-06-04T15:00:00+09:00",
                "open": 9940.0,
                "high": 10000.0,
                "low": 9880.0,
                "close": 9890.0,
                "volume": 0.0,
                "source": "minute_test",
                "phase": "day1_session_cutoff",
            },
        ])
        self.assertEqual(result["result"]["closedReason"], "stop_close")
        self.assertEqual(result["result"]["exitLastFillPrice"], 9890.0)
        self.assertEqual(result["result"]["filledExitQuantityPct"], 100.0)
        self.assertFalse(any(fill["fillRule"] == "reversal_intraday_stop" for fill in result["fills"]))

    def test_reversal_time_stop_0915_exits_when_bounce_is_missing(self):
        result = self._simulate_reversal([
            {
                "timestamp": "2026-06-04T09:05:00+09:00",
                "open": 10020.0,
                "high": 10040.0,
                "low": 9990.0,
                "close": 10010.0,
                "volume": 0.0,
                "source": "minute_test",
                "phase": "day1_open",
            },
            {
                "timestamp": "2026-06-04T09:15:00+09:00",
                "open": 10010.0,
                "high": 10060.0,
                "low": 9980.0,
                "close": 10000.0,
                "volume": 0.0,
                "source": "minute_test",
                "phase": "day1_open",
            },
        ])
        self.assertEqual(result["result"]["closedReason"], "time_stop_0915")
        self.assertEqual(result["result"]["exitLastFillPrice"], 10000.0)

    def test_reversal_breakeven_fail_exits_after_3pct_bounce(self):
        result = self._simulate_reversal([
            {
                "timestamp": "2026-06-04T09:05:00+09:00",
                "open": 10020.0,
                "high": 10350.0,
                "low": 10000.0,
                "close": 10280.0,
                "volume": 0.0,
                "source": "minute_test",
                "phase": "day1_open",
            },
            {
                "timestamp": "2026-06-04T09:20:00+09:00",
                "open": 10280.0,
                "high": 10300.0,
                "low": 9990.0,
                "close": 10000.0,
                "volume": 0.0,
                "source": "minute_test",
                "phase": "day1_open",
            },
        ])
        self.assertEqual(result["result"]["closedReason"], "breakeven_fail")
        self.assertEqual(result["result"]["exitLastFillPrice"], 10000.0)


if __name__ == "__main__":
    unittest.main()
