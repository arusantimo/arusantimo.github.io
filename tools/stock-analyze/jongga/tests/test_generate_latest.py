import io
import unittest
from dataclasses import replace
from contextlib import redirect_stdout
from datetime import date
from types import SimpleNamespace
from typing import Any
from unittest import mock

from jongga.generate_latest import StockSnapshot, analyze_reversal_intraday_signal, annotate_macro_metric_freshness, annotate_payload_with_analysis_session, build_accumulation_entry, build_auto_event_filter, build_breakout_entry, build_gap_score, build_kind_event_filter_from_rows, build_market_context, build_momentum_entry, build_pullback_entry, build_reversal_entry, build_stock_snapshot, build_top_trading_value_gate, decide_regime, emit_cli_failures, fetch_browser_candidate_enrichments, finalize_scored_buy_entry, merge_same_day_session_payloads, parse_cnbc_quote_html, parse_kind_disclosure_rows, parse_market_cap_trillion, parse_naver_orderbook_ratio_html, parse_toss_quotes_payload, parse_toss_stock_price_detail_payload, parse_toss_ticks_strength_payload, prepare_console_output, rank_pullback_entries_with_enrichment, safe_console_text, select_top_trading_value_codes
from jongga.rule_evaluation import evaluate_accumulation_g2, evaluate_breakout_g2
from jongga.grade_policy import grade_from_score
from jongga.macro_overlay import REGIME_ROTATION_BUFFERED, REGIME_STRONG_BULL, apply_regime_fields_to_context, load_market_analyze_snapshot, trend_status_label, reversal_status_label
from jongga.output_contract import VARIANT_CANARY, VARIANT_STABLE, build_daily_output_paths, build_history_entry, payload_with_analysis_date, render_daily_bridge_js, update_history_index, write_daily_outputs
from jongga.rule_evaluation import evaluate_reversal_f2, evaluate_reversal_g1, evaluate_reversal_g2, evaluate_reversal_g4
from pathlib import Path
from tempfile import TemporaryDirectory


class GenerateLatestTest(unittest.TestCase):
    def _stock_indicator_snapshot(self) -> StockSnapshot:
        return StockSnapshot(
            rank=17,
            code="005930",
            name="삼성전자",
            current_price=279000.0,
            prev_close=255500.0,
            open_price=239500.0,
            high_price=279500.0,
            low_price=238500.0,
            volume=1000000.0,
            trading_value_text="1조",
            market_cap_trillion=43.7,
            foreign_net=-147900.0,
            institution_net=135906.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[279000.0, 255500.0, 250000.0, 245000.0, 240000.0] + [230000.0] * 20,
            open_history=[270000.0] * 25,
            high_history=[280000.0] * 25,
            low_history=[230000.0] * 25,
            volume_history=[1000000.0, 800000.0] + [700000.0] * 20,
            date_history=[f"202606{day:02d}" for day in range(8, 0, -1)] + [f"202605{day:02d}" for day in range(31, 14, -1)],
            ma5=260000.0,
            ma10=250000.0,
            ma20=221620.0,
            ma60=210000.0,
            ma5_prev=255000.0,
            ma20_prev=218045.0,
            ma60_prev=205000.0,
            weekly_rsi=63.0,
            macd_hist=[],
            high_20d=280000.0,
            low_5d=235000.0,
            high_52w=307000.0,
            return_5d=5.0,
            return_20d=12.5,
            return_21d=11.0,
            volume_avg_5d=750000.0,
            volume_avg_20d=680000.0,
            industry_code="001",
            industry_compare_change_pct=-6.6,
            industry_compare_count=10,
            intraday_30m={},
            event_filter=None,
            market_cap_rank=17,
            market_cap_universe_count=2560,
            per=24.2,
            pbr=1.4,
            cns_per=22.0,
            low_52w=190800.0,
            foreign_rate=34.6,
        )

    def _pullback_context(self) -> dict[str, Any]:
        return {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
            "kospiChangePct": -0.3,
        }

    def _pullback_support_context(self, primary_price: float) -> dict[str, Any]:
        return {
            "support": {
                "summary": f"복합 지지 {primary_price:,.0f}원",
                "primaryLine": {
                    "label": "복합 지지",
                    "price": primary_price,
                    "familyCount": 2,
                    "strengthPoints": 80,
                },
                "lines": [{"label": "복합 지지", "price": primary_price, "familyCount": 2, "strengthPoints": 80}],
                "strengthScore": 80,
                "warningLevel": "clear",
                "warningReason": "복합 지지 strong",
                "activeFamilyCount": 2,
            },
            "families": {
                "horizontal": [],
                "swingCluster": [],
                "volumeShelf": [],
                "eventAnchors": [],
            },
        }

    def _pullback_news_flow(self, *, status: str = "positive", positive_count: int = 1, negative_count: int = 0, fresh_positive_count: int | None = None, fresh_negative_count: int | None = None, summary: str | None = None) -> dict[str, Any]:
        return {
            "lookbackDays": 5,
            "headlineCount": max(positive_count + negative_count, 1),
            "positiveCount": positive_count,
            "negativeCount": negative_count,
            "latestPositiveDate": "20260612" if positive_count else "",
            "latestNegativeDate": "20260612" if negative_count else "",
            "status": status,
            "summary": summary or f"최근 5거래일 뉴스 {max(positive_count + negative_count, 1)}건 · 긍정 {positive_count}건 · 악재 {negative_count}건",
            "headlines": [{
                "date": "2026.06.12 15:30",
                "title": "테스트 뉴스",
                "source": "연합뉴스",
                "url": "https://finance.naver.com/item/news_read.naver?article_id=1&office_id=001&code=005930",
                "sentiment": "negative" if negative_count else "positive" if positive_count else "neutral",
            }],
            "freshPositiveCount": positive_count if fresh_positive_count is None else fresh_positive_count,
            "freshNegativeCount": negative_count if fresh_negative_count is None else fresh_negative_count,
        }

    def _pullback_test_snapshot(self, **overrides: Any) -> StockSnapshot:
        base = self._stock_indicator_snapshot()
        snapshot = replace(
            base,
            rank=1,
            code="005930",
            name="삼성전자",
            current_price=102000.0,
            prev_close=103000.0,
            open_price=103500.0,
            high_price=104000.0,
            low_price=100500.0,
            volume=300000.0,
            foreign_net=50000.0,
            institution_net=10000.0,
            foreign_previous=-1000.0,
            institution_previous=0.0,
            close_history=[102000.0, 110000.0, 98000.0, 97000.0, 96000.0, 95000.0] + [94000.0] * 19,
            open_history=[103500.0, 100000.0, 97000.0, 96000.0, 95000.0, 94000.0] + [93000.0] * 19,
            high_history=[104000.0, 112000.0, 99000.0, 98000.0, 97000.0, 96000.0] + [95000.0] * 19,
            low_history=[100500.0, 99500.0, 96000.0, 95000.0, 94000.0, 93000.0] + [92000.0] * 19,
            volume_history=[300000.0, 1000000.0, 300000.0, 300000.0, 300000.0, 300000.0] + [300000.0] * 19,
            date_history=[f"202606{day:02d}" for day in range(12, 0, -1)] + [f"202605{day:02d}" for day in range(30, 18, -1)],
            ma5=101000.0,
            ma10=99500.0,
            ma20=98500.0,
            ma60=90000.0,
            ma5_prev=100500.0,
            ma20_prev=98000.0,
            ma60_prev=89800.0,
            weekly_rsi=62.0,
            macd_hist=[0.2, 0.1, -0.05],
            high_20d=112000.0,
            low_5d=95000.0,
            high_52w=120000.0,
            return_5d=4.0,
            return_20d=9.0,
            return_21d=9.2,
            volume_avg_5d=500000.0,
            volume_avg_20d=350000.0,
            industry_code="001",
            industry_compare_change_pct=1.0,
            industry_compare_count=8,
            intraday_30m={"available": True},
            event_filter={"blocked": False, "note": "이벤트 필터 통과", "earningsDays": 7, "corporateActionDays": 12},
            news_flow=self._pullback_news_flow(),
            toss={"avgStrength": 96.0, "lastHourAvgStrength": 102.0, "last30BuySellRatio": 1.05, "last30AvgStrength": 101.0},
        )
        return replace(snapshot, **overrides)

    def test_finalize_scored_buy_entry_attaches_stock_indicators_for_all_strategies(self):
        snapshot = self._stock_indicator_snapshot()
        entries = [
            {
                "strategy": "pullback",
                "name": "삼성전자",
                "code": "005930",
                "currentPrice": 279000.0,
                "entryPrice": 279000.0,
                "pullbackContext": {"support": {"primaryLine": {"price": 269062.0, "distancePct": 3.56}}},
            },
            {
                "strategy": "accumulation",
                "name": "삼성전자",
                "code": "005930",
                "currentPrice": 279000.0,
                "entryPrice": 279000.0,
            },
            {
                "strategy": "breakout",
                "name": "삼성전자",
                "code": "005930",
                "currentPrice": 279000.0,
                "entryPrice": 279000.0,
            },
            {
                "strategy": "reversal",
                "name": "삼성전자",
                "code": "005930",
                "currentPrice": 279000.0,
                "entryPrice": 279000.0,
            },
        ]
        for entry in entries:
            finalized = finalize_scored_buy_entry(dict(entry), context={}, snapshot=snapshot)
            self.assertIn("stockIndicators", finalized, entry["strategy"])
            self.assertEqual(finalized["stockIndicators"]["source"], "jongga_analysis", entry["strategy"])
            self.assertIn("snapshot", finalized["stockIndicators"], entry["strategy"])
            self.assertTrue(finalized["stockIndicators"]["snapshot"], entry["strategy"])
            self.assertIn("currentPrice", finalized["stockIndicators"]["snapshot"], entry["strategy"])

    def test_status_labels_separate_gapdown_ban_and_market_gate_hold(self):
        self.assertEqual(
            trend_status_label("pullback", "A", "강세장 ✅", "G-A", [{"code": "G5", "status": "⛔"}]),
            "시장 Gate 차단 · 신규 진입 보류",
        )
        self.assertEqual(
            trend_status_label("pullback", "A", "강세장 ✅", "G-E", []),
            "매매금지(갭다운 경고 · 신규 진입 금지)",
        )
        self.assertEqual(
            reversal_status_label("A", "강세장 ✅", "G-D", [], []),
            "매매금지(갭다운 주의 · 신규 진입 보류)",
        )

    def test_parse_cnbc_quote_html(self):
        quote = parse_cnbc_quote_html('{"symbol":".KSVKOSPI","last":"71.37","open":"71.44","high":"72.95","low":"71.37","change":"-1.14","change_pct":"-1.57%","previous_day_closing":"72.51"}')
        self.assertEqual(quote["current"], 71.37)
        self.assertEqual(quote["previousClose"], 72.51)
        self.assertEqual(quote["changePct"], -1.57)

    def test_parse_market_cap_trillion(self):
        self.assertAlmostEqual(parse_market_cap_trillion("1,613조 5,729억"), 1613.5729)
        self.assertAlmostEqual(parse_market_cap_trillion("29조 9,000억"), 29.9)

    def test_build_gap_score_matches_grade_thresholds(self):
        payload = build_gap_score({
            "nq": {"changePct": 0.8},
            "vix": {"current": 16.0},
            "tnx": {"bpChange": -4.0},
            "krw": {"changeWon": -7.0},
            "sox": {"changePct": 0.7},
        })
        self.assertEqual(payload["code"], "G-A")
        self.assertTrue(payload["totalScore"].startswith("+"))

    def test_annotate_macro_metric_freshness_marks_old_yahoo_quotes_stale(self):
        live_metrics = {
            "nq": {"asOf": "2026-05-30T20:00:00+00:00"},
            "vix": {"asOf": "2026-06-07T20:00:00+00:00"},
            "tnx": {"asOf": "2026-06-07T20:00:00+00:00"},
            "krw": {"asOf": "2026-06-07T20:00:00+00:00"},
            "sox": {"asOf": "2026-06-07T20:00:00+00:00"},
        }
        summary = annotate_macro_metric_freshness(live_metrics, "2026-06-08")
        self.assertFalse(summary["isFresh"])
        self.assertIn("macro_nq", summary["staleKeys"])
        self.assertEqual(live_metrics["nq"]["freshnessStatus"], "stale")
        self.assertTrue(live_metrics["nq"]["stale"])
        self.assertEqual(live_metrics["vix"]["freshnessStatus"], "fresh")

    def test_build_pullback_entry_relaxes_fresh_gap_e_in_supportive_regime(self):
        snapshot = replace(
            self._stock_indicator_snapshot(),
            current_price=250000.0,
            prev_close=247000.0,
            open_price=246000.0,
            high_price=251000.0,
            low_price=244000.0,
            close_history=[250000.0, 247000.0, 245000.0, 240000.0, 238000.0] + [230000.0] * 20,
            volume_history=[1000000.0, 1500000.0] + [700000.0] * 20,
            high_20d=251000.0,
            return_5d=4.0,
            return_20d=9.0,
            return_21d=8.5,
            volume_avg_20d=680000.0,
        )
        context = {
            "regimeLabel": REGIME_STRONG_BULL,
            "effectiveRegimeLabel": REGIME_STRONG_BULL,
            "gapScore": {"code": "G-E", "isFresh": True},
            "riseJustifiedByMacro": True,
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
            "kospiChangePct": 0.4,
        }

        entry = build_pullback_entry(snapshot, context)

        self.assertIn(entry["statusLabel"], {"강력매수(거시경고·축소)", "진입 가능(거시경고·축소)"})
        self.assertTrue(entry["entryEligible"])

    def test_build_accumulation_entry_relaxes_fresh_gap_e_in_rotation_regime(self):
        snapshot = StockSnapshot(
            rank=12,
            code="005930",
            name="테스트",
            current_price=95000.0,
            prev_close=94000.0,
            open_price=94200.0,
            high_price=95500.0,
            low_price=93800.0,
            volume=85.0,
            trading_value_text="1,000억",
            market_cap_trillion=12.0,
            foreign_net=1500.0,
            institution_net=500.0,
            foreign_previous=200.0,
            institution_previous=100.0,
            close_history=[95000.0] * 21,
            high_history=[95500.0] * 21,
            low_history=[93800.0] * 21,
            volume_history=[85.0] + [100.0] * 20,
            ma5=94500.0,
            ma10=94000.0,
            ma20=94600.0,
            ma60=90000.0,
            ma5_prev=94400.0,
            ma20_prev=94500.0,
            ma60_prev=89900.0,
            weekly_rsi=58.0,
            macd_hist=[0.2, 0.1, 0.05],
            high_20d=96000.0,
            low_5d=93000.0,
            high_52w=110000.0,
            return_5d=4.0,
            return_20d=8.0,
            return_21d=8.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=0.8,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            toss={
                "avgStrength": 96.0,
                "lastHourAvgStrength": 118.0,
                "last30AvgStrength": 122.0,
                "last30BuySellRatio": 1.42,
            },
            orderbook={},
        )
        context = {
            "regimeLabel": REGIME_ROTATION_BUFFERED,
            "effectiveRegimeLabel": REGIME_ROTATION_BUFFERED,
            "gapScore": {"code": "G-E", "isFresh": True},
            "riseJustifiedByMacro": True,
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
        }

        entry = build_accumulation_entry(snapshot, context)

        self.assertIn(entry["statusLabel"], {"강력매수(거시경고·축소)", "진입 가능(거시경고·축소)"})
        self.assertTrue(entry["entryEligible"])

    def test_build_market_context_detects_bear_when_proxy_is_high(self):
        history = []
        base = 100.0
        for index in range(90):
            history.append({"closePrice": f"{base - (89 - index) * 0.2:.2f}", "fluctuationsRatio": "-0.5"})
        context = build_market_context(history, {"grade": "G-D 🟠", "totalScore": "-3.5점", "entryAdjustment": "", "code": "G-D"}, {"current": 31.0, "label": "VKOSPI", "source": "cnbc_quote", "isFallback": False, "confidence": 0.85})
        self.assertEqual(context["technicalRegimeLabel"], "약세장 ⛔")

    def test_decide_regime_uses_box_when_vkospi_high_but_price_above_ma60(self):
        history = []
        price = 3000.0
        for index in range(90):
            history.append({"closePrice": f"{price + (89 - index) * 2:.2f}", "fluctuationsRatio": "0.5"})
        label, *_ = decide_regime(history, 31.0)
        self.assertEqual(label, "박스권 ⚠️")

    def test_build_market_context_can_upgrade_with_macro_snapshot(self):
        history = []
        price = 3000.0
        for index in range(90):
            history.append({"closePrice": f"{price + (89 - index) * 2:.2f}", "fluctuationsRatio": "0.5"})
        context = build_market_context(
            history,
            {"grade": "G-A", "totalScore": "+1", "entryAdjustment": "", "code": "G-A"},
            {"current": 31.0, "label": "VKOSPI", "source": "cnbc_quote", "isFallback": False, "confidence": 0.85},
            analysis_date="20260526",
        )
        snapshot = load_market_analyze_snapshot(Path(__file__).resolve().parents[3])
        if snapshot is None:
            self.skipTest("latest.js not available")
        enriched = apply_regime_fields_to_context(context, snapshot, "20260526")
        if enriched.get("riseJustifiedByMacro"):
            self.assertIn("강세", enriched["effectiveRegimeLabel"])
            if enriched["kospiBullTier"] == "strong":
                self.assertEqual(enriched["effectiveRegimeLabel"], REGIME_STRONG_BULL)

    def test_grade_from_score_thresholds(self):
        self.assertEqual(grade_from_score(8.6, "reversal"), "S")
        self.assertEqual(grade_from_score(7.6, "pullback"), "A")

    def test_analyze_reversal_intraday_signal_detects_bullish_reclaim(self):
        signal = analyze_reversal_intraday_signal([
            {"timestamp": 1.0, "open": 100.0, "high": 101.0, "low": 96.0, "close": 98.0},
            {"timestamp": 2.0, "open": 97.0, "high": 103.0, "low": 95.0, "close": 102.0},
        ])
        self.assertTrue(signal["available"])
        self.assertTrue(signal["signal"])

    def test_build_auto_event_filter_reads_meeting_schedule(self):
        event_filter = build_auto_event_filter({
            "shareholdersMeetingInfo": {
                "meetingDate": "2026-05-28",
                "meetingDDay": 8,
            },
            "irScheduleInfo": None,
        })
        self.assertIsNotNone(event_filter)
        self.assertEqual(event_filter["corporateActionDays"], 8)
        self.assertFalse(event_filter["blocked"])
        self.assertIn("주총 D-8", event_filter["note"])

    def test_parse_toss_stock_price_detail_payload_reads_strength(self):
        parsed = parse_toss_stock_price_detail_payload({
            "result": [{
                "code": "A005930",
                "tradingStrength": 107.0,
                "tradeDateTime": "2026-05-19T15:20:00+09:00",
            }]
        })
        self.assertIsNotNone(parsed)
        self.assertEqual(parsed["avgStrength"], 107.0)
        self.assertEqual(parsed["source"], "toss_http_detail")

    def test_parse_toss_quotes_payload_reads_bid_ask_ratio(self):
        parsed = parse_toss_quotes_payload({
            "result": {
                "offerVolume": 73406,
                "bidVolume": 20026,
            }
        }, "042660")
        self.assertIsNotNone(parsed)
        self.assertAlmostEqual(parsed["bidAskRatio"], 20026 / 73406, places=4)
        self.assertEqual(parsed["source"], "toss_quotes_api")

    def test_parse_toss_ticks_strength_payload_builds_proxy_metrics(self):
        parsed = parse_toss_ticks_strength_payload({
            "result": [
                {"time": "15:30:01", "volume": 100, "tradeType": "BUY"},
                {"time": "15:30:20", "volume": 50, "tradeType": "SELL"},
                {"time": "15:31:10", "volume": 80, "tradeType": "BUY"},
                {"time": "15:31:50", "volume": 20, "tradeType": "SELL"},
                {"time": "15:32:10", "volume": 70, "tradeType": "SELL"},
                {"time": "15:32:40", "volume": 30, "tradeType": "BUY"},
            ]
        })
        self.assertIsNotNone(parsed)
        self.assertEqual(parsed["source"], "toss_ticks_api_proxy")
        self.assertEqual(parsed["observedMinutes"], 3)
        self.assertAlmostEqual(parsed["intradayAbove100Ratio"], 66.7, places=1)
        self.assertAlmostEqual(parsed["lastHourAvgStrength"], 181.0, places=1)
        self.assertAlmostEqual(parsed["last30AvgStrength"], 181.0, places=1)
        self.assertAlmostEqual(parsed["last30BuySellRatio"], 1.5, places=4)

    def test_parse_naver_orderbook_ratio_html_reads_total_row(self):
        parsed = parse_naver_orderbook_ratio_html(
            '<tr class="total"><td class="f_down">629,695</td><td>잔량합계</td><td class="f_up">698,319</td></tr>',
            "005930",
        )
        self.assertIsNotNone(parsed)
        self.assertAlmostEqual(parsed["bidAskRatio"], 698319 / 629695, places=4)
        self.assertEqual(parsed["bidTotal"], 698319)
        self.assertEqual(parsed["askTotal"], 629695)

    def test_parse_kind_disclosure_rows_strips_company_name(self):
        rows = parse_kind_disclosure_rows([
            '2026-05-15 16:14 삼성전자 분기보고서(일반법인)(2026.03)',
            '2026-04-30 08:53 삼성전자 현금ㆍ현물 배당 결정',
        ], '삼성전자')
        self.assertEqual(rows[0]["title"], '분기보고서(일반법인)(2026.03)')
        self.assertEqual(rows[1]["title"], '현금ㆍ현물 배당 결정')

    def test_build_kind_event_filter_blocks_recent_corporate_action(self):
        event_filter = build_kind_event_filter_from_rows([
            {"date": "2026-05-15", "time": "16:14", "title": "현금ㆍ현물 배당 결정"},
        ], today=date(2026, 5, 19))
        self.assertIsNotNone(event_filter)
        self.assertTrue(event_filter["blocked"])
        self.assertIn("배당 결정", event_filter["note"])

    def test_select_top_trading_value_codes_keeps_raw_top100_only(self):
        rows = [
            {"itemCode": "069500", "stockName": "KODEX 200", "accumulatedTradingValueRaw": "100000"},
            {"itemCode": "000001", "stockName": "1위종목", "accumulatedTradingValueRaw": "99000"},
        ]
        rows.extend(
            {"itemCode": f"{index:06d}", "stockName": f"{index}위종목", "accumulatedTradingValueRaw": str(99000 - index)}
            for index in range(3, 103)
        )
        selected = select_top_trading_value_codes(rows, limit=100)
        self.assertEqual(selected[0], (2, "000001", "1위종목"))
        self.assertIn((100, "000100", "100위종목"), selected)
        self.assertNotIn((101, "000101", "101위종목"), selected)
        self.assertTrue(all(rank <= 100 for rank, _, _ in selected))

    def test_top_trading_value_gate_blocks_rank_over_100(self):
        passed = build_top_trading_value_gate(100, "G0")
        blocked = build_top_trading_value_gate(101, "G0")
        self.assertEqual(passed["status"], "✅")
        self.assertEqual(blocked["status"], "⛔")
        self.assertIn("TOP100", blocked["note"])

    def test_build_pullback_entry_accepts_one_rising_moving_average(self):
        snapshot = StockSnapshot(
            rank=3,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9900.0,
            open_price=9950.0,
            high_price=10050.0,
            low_price=9800.0,
            volume=100.0,
            trading_value_text="1,000억",
            market_cap_trillion=40.0,
            foreign_net=200.0,
            institution_net=100.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[10000.0] * 70,
            high_history=[10100.0] * 70,
            low_history=[9800.0] * 70,
            volume_history=[100.0] * 70,
            ma5=10100.0,
            ma10=10050.0,
            ma20=9900.0,
            ma60=9700.0,
            ma5_prev=10100.0,
            ma20_prev=9850.0,
            ma60_prev=9700.0,
            weekly_rsi=55.0,
            macd_hist=[0.2, 0.1, -0.1],
            high_20d=10100.0,
            low_5d=9800.0,
            high_52w=12000.0,
            return_5d=3.0,
            return_20d=7.0,
            return_21d=8.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=0.6,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
            "kospiChangePct": 0.4,
        }

        entry = build_pullback_entry(snapshot, context)

        g1_gate = next(rule for rule in entry["gates"] if rule["code"] == "G1")
        g9_gate = next(rule for rule in entry["gates"] if rule["code"] == "G9")
        self.assertEqual(g1_gate["status"], "✅")
        self.assertIn("20MA", g1_gate["note"])
        self.assertIn(g9_gate["status"], {"✅", "⚠️"})
        self.assertIn("pullbackContext", entry)
        self.assertIn("강도", entry["pullbackContext"]["support"]["summary"])
        self.assertIn("primaryLine", entry["pullbackContext"]["support"])
        self.assertIn("strengthScore", entry["pullbackContext"]["support"])
        self.assertIn("horizontal", entry["pullbackContext"]["families"])
        self.assertIn("최근 20일 최대 거래량 100%", entry["pullbackContext"]["volumeBurst"]["summary"])
        self.assertEqual(entry["pullbackContext"]["volumeBurst"]["burstCount"], 0)
        self.assertEqual(entry["volatilityContext"]["marketState"], "calm")
        self.assertIn("변동성", entry["keyPoint"])
        self.assertTrue(any(row["code"] == "V1" for row in entry["scoreBreakdown"]))

    def _overextended_pullback_snapshot(self) -> StockSnapshot:
        """주성엔지니어링 2026-06-05 재현: +27% 폭등·주봉 RSI 95.7·이평 과이격."""
        return StockSnapshot(
            rank=7,
            code="036930",
            name="주성엔지니어링",
            current_price=250500.0,
            prev_close=196900.0,
            open_price=197100.0,
            high_price=250500.0,
            low_price=190300.0,
            volume=100.0,
            trading_value_text="1조",
            market_cap_trillion=10.0,
            foreign_net=252062.0,
            institution_net=11672.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[250500.0] * 70,
            high_history=[250500.0] * 70,
            low_history=[190300.0] * 70,
            volume_history=[100.0] * 70,
            ma5=208180.0,
            ma10=200000.0,
            ma20=182440.0,
            ma60=113990.0,
            ma5_prev=200000.0,
            ma20_prev=175000.0,
            ma60_prev=110000.0,
            weekly_rsi=95.7,
            macd_hist=[0.5, 0.4, 0.3],
            high_20d=250500.0,
            low_5d=190300.0,
            high_52w=250500.0,
            return_5d=20.0,
            return_20d=40.0,
            return_21d=42.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=7.70,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
        )

    def test_pullback_overextension_gates_block_parabolic_stock(self):
        snapshot = self._overextended_pullback_snapshot()
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
            "kospiChangePct": 0.4,
        }

        entry = build_pullback_entry(snapshot, context)
        gates = {rule["code"]: rule for rule in entry["gates"]}

        # 세 과열 가드레일이 모두 ⛔ 차단
        self.assertEqual(gates["G6"]["status"], "⛔")  # 당일 +27% 급등
        self.assertEqual(gates["G7"]["status"], "⛔")  # 주봉 RSI 95.7
        self.assertEqual(gates["G8"]["status"], "⛔")  # 20/60MA 과이격
        # 결과적으로 매매금지·진입 불가
        self.assertIn("매매금지", entry["statusLabel"])
        self.assertFalse(entry["entryEligible"])

    def test_pullback_overextension_gates_pass_healthy_dip(self):
        snapshot = self._overextended_pullback_snapshot()
        # 건강한 눌림목으로 보정: 소폭 등락·정상 RSI·지지선 근접
        snapshot = replace(
            snapshot,
            current_price=185000.0,
            prev_close=183000.0,
            high_price=186000.0,
            weekly_rsi=58.0,
            ma60=160000.0,
            ma60_prev=158000.0,
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
            "kospiChangePct": 0.4,
        }

        entry = build_pullback_entry(snapshot, context)
        gates = {rule["code"]: rule for rule in entry["gates"]}

        # 새 과열 가드레일은 건강한 눌림목을 차단하지 않는다(정상 신호 보존).
        self.assertEqual(gates["G6"]["status"], "✅")  # 당일 +1.1%
        self.assertEqual(gates["G7"]["status"], "✅")  # RSI 58
        self.assertEqual(gates["G8"]["status"], "✅")  # 20MA +1.4%, 60MA 이격 정상 범위

    def test_pullback_stop_policy_ignores_anchor_above_current_price(self):
        from jongga.generate_latest import compute_pullback_stop_policy

        snapshot = StockSnapshot(
            rank=1,
            code="000001",
            name="테스트",
            current_price=100.0,
            prev_close=99.0,
            open_price=98.0,
            high_price=101.0,
            low_price=97.0,
            volume=1000.0,
            trading_value_text="100억",
            market_cap_trillion=1.0,
            foreign_net=0.0,
            institution_net=0.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            open_history=[110.0] + [90.0] * 20,
            close_history=[150.0] + [90.0] * 20,
            high_history=[160.0] + [91.0] * 20,
            low_history=[100.0] + [89.0] * 20,
            volume_history=[1000.0] + [100.0] * 20,
            date_history=["20260608"] + [f"202605{day:02d}" for day in range(31, 11, -1)],
            ma5=95.0,
            ma10=90.0,
            ma20=80.0,
            ma60=70.0,
            ma5_prev=94.0,
            ma20_prev=79.0,
            ma60_prev=69.0,
            weekly_rsi=55.0,
            macd_hist=[0.1, 0.2, 0.3],
            high_20d=160.0,
            low_5d=89.0,
            high_52w=160.0,
            return_5d=2.0,
            return_20d=5.0,
            return_21d=5.5,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="001",
            industry_compare_change_pct=1.0,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
        )

        policy = compute_pullback_stop_policy(snapshot, {"regimeLabel": "박스권 ⚠️"}, 95.0)
        self.assertEqual(policy["anchorStopPrice"], 130)
        self.assertEqual(policy["hardStopPrice"], 80)
        self.assertEqual(policy["effectiveStopPrice"], 95)
        self.assertIn("현재가 100원 이상이라 제외", policy["hardStopRuleSummary"])

    def test_reversal_stop_policy_uses_close_only_wording_and_trade_plan(self):
        from jongga.generate_latest import apply_reversal_stop_policy_to_trade_plan, compute_reversal_stop_policy

        policy = compute_reversal_stop_policy(SimpleNamespace(low_price=97.0), {}, 95.0)
        self.assertEqual(policy["stopExecutionMode"], "close_only")
        self.assertIn("종가 손절가", policy["hardStopRuleSummary"])
        self.assertIn("종가 기준", policy["reasonSummary"])

        updated_rows = apply_reversal_stop_policy_to_trade_plan([
            {
                "stage": "🛑 손절",
                "stageKey": "stop",
                "condition": "기존 손절",
                "quantity": "전량",
                "targetYield": "-5.0%",
                "targetPrice": "95원",
            }
        ], 100.0, policy)
        self.assertEqual(updated_rows[-1]["condition"], "유효 하드 스톱 97원 종가 이탈")
        self.assertEqual(updated_rows[-1]["targetYield"], "-3.0%")

    def test_daily_output_paths_use_compact_date(self):
        json_path, js_path = build_daily_output_paths("jongga/output", date(2026, 5, 22), variant=VARIANT_STABLE)
        self.assertEqual(json_path.as_posix(), "jongga/output/202605/latest_20260522.json")
        self.assertEqual(js_path.as_posix(), "jongga/output/202605/jongga_data_20260522.js")

    def test_canary_output_paths_use_suffix(self):
        json_path, js_path = build_daily_output_paths("jongga/output", date(2026, 5, 22), variant=VARIANT_CANARY)
        self.assertEqual(json_path.as_posix(), "jongga/output/202605/latest_20260522_canary.json")
        self.assertEqual(js_path.as_posix(), "jongga/output/202605/jongga_data_20260522_canary.js")

    def test_daily_bridge_uses_date_key(self):
        payload = payload_with_analysis_date(self._sample_payload(), date(2026, 5, 22), variant=VARIANT_STABLE)
        bridge = render_daily_bridge_js(payload)
        self.assertIn("window.JONGGA_DAILY_DATA", bridge)
        self.assertIn('"2026-05-22"', bridge)
        self.assertNotIn("window.JONGGA_DATA =", bridge)

    def test_canary_bridge_uses_separate_namespace(self):
        payload = payload_with_analysis_date(self._sample_payload(), date(2026, 5, 22), variant=VARIANT_CANARY)
        bridge = render_daily_bridge_js(payload)
        self.assertIn("window.JONGGA_CANARY_DAILY_DATA", bridge)
        self.assertIn('"variant": "canary"', bridge)

    def test_history_entry_extracts_top_recommendations(self):
        payload = payload_with_analysis_date(self._sample_payload(), date(2026, 5, 22), variant=VARIANT_STABLE)
        entry = build_history_entry(payload, "jongga/output/jongga_data_20260522.js", "jongga/output/latest_20260522.json", variant=VARIANT_STABLE, top_limit=1)
        self.assertEqual(entry["date"], "2026-05-22")
        self.assertEqual(entry["variant"], "stable")
        self.assertEqual(entry["variantLabel"], "현재 버전")
        self.assertEqual(entry["status"], "partial")
        self.assertEqual(entry["buyCount"], 2)
        self.assertEqual(len(entry["topRecommendations"]), 2)
        self.assertEqual(entry["topRecommendations"][0]["strategy"], "pullback")
        self.assertEqual(entry["topRecommendations"][0]["scoreScope"], "pullback")
        codes = {row["code"] for row in entry["topRecommendations"]}
        self.assertEqual(codes, {"000010", "000020"})

    def test_history_update_replaces_same_date(self):
        entries = update_history_index(
            [{"date": "2026-05-21", "buyCount": 1}, {"date": "2026-05-22", "buyCount": 2}],
            {"date": "2026-05-22", "buyCount": 3},
        )
        self.assertEqual([entry["date"] for entry in entries], ["2026-05-22", "2026-05-21"])
        self.assertEqual(entries[0]["buyCount"], 3)

    def test_history_update_keeps_stable_and_canary_same_date(self):
        entries = update_history_index(
            [{"date": "2026-05-22", "variant": "stable", "buyCount": 2}],
            {"date": "2026-05-22", "variant": "canary", "buyCount": 4},
        )
        self.assertEqual([(entry["date"], entry["variant"]) for entry in entries], [("2026-05-22", "stable"), ("2026-05-22", "canary")])

    def test_write_daily_outputs_writes_manifest_without_duplicates(self):
        payload = payload_with_analysis_date(self._sample_payload(), date(2026, 5, 22), variant=VARIANT_STABLE)
        with TemporaryDirectory() as tmp:
            history_path = f"{tmp}/jongga_history.js"
            write_daily_outputs(payload, tmp, history_path, variant=VARIANT_STABLE)
            write_daily_outputs(payload, tmp, history_path, variant=VARIANT_STABLE)
            with open(history_path, encoding="utf-8") as handle:
                history_js = handle.read()
            self.assertEqual(history_js.count('"date": "2026-05-22"'), 1)
            self.assertEqual(history_js.count('"variant": "stable"'), 1)
            with open(f"{tmp}/202605/jongga_data_20260522.js", encoding="utf-8") as handle:
                self.assertIn('window.JONGGA_DAILY_DATA["2026-05-22"]', handle.read())

    def test_write_daily_outputs_keeps_stable_and_canary_variants(self):
        stable_payload = payload_with_analysis_date(self._sample_payload(), date(2026, 5, 22), variant=VARIANT_STABLE)
        canary_payload = payload_with_analysis_date(self._sample_payload(), date(2026, 5, 22), variant=VARIANT_CANARY)
        with TemporaryDirectory() as tmp:
            history_path = f"{tmp}/jongga_history.js"
            write_daily_outputs(stable_payload, tmp, history_path, variant=VARIANT_STABLE)
            write_daily_outputs(canary_payload, tmp, history_path, variant=VARIANT_CANARY)
            with open(history_path, encoding="utf-8") as handle:
                history_js = handle.read()
            self.assertIn('"variant": "stable"', history_js)
            self.assertIn('"variant": "canary"', history_js)
            with open(f"{tmp}/202605/jongga_data_20260522_canary.js", encoding="utf-8") as handle:
                self.assertIn('window.JONGGA_CANARY_DAILY_DATA["2026-05-22"]', handle.read())

    def test_emit_cli_failures_prints_explicit_items(self):
        buffer = io.StringIO()
        with redirect_stdout(buffer):
            emit_cli_failures(
                "종목 상세 스냅샷 수집 실패",
                [
                    "000660 SK하이닉스: timeout",
                    "005930 삼성전자: parser missing",
                ],
                max_lines=1,
            )
        output = buffer.getvalue()
        self.assertIn("[FAIL] 종목 상세 스냅샷 수집 실패 · 000660 SK하이닉스: timeout", output)
        self.assertIn("[FAIL] 종목 상세 스냅샷 수집 실패 · 외 1건", output)

    def test_emit_cli_failures_can_print_warning_level(self):
        buffer = io.StringIO()
        with redirect_stdout(buffer):
            emit_cli_failures(
                "브라우저 보강 건너뜀",
                ["playwright unavailable: No module named 'playwright'"],
                level="warning",
            )
        output = buffer.getvalue()
        self.assertIn("[WARNING] 브라우저 보강 건너뜀 · playwright unavailable: No module named 'playwright'", output)

    @mock.patch("jongga.generate_latest.build_auto_event_filter", return_value=None)
    @mock.patch("jongga.generate_latest.fetch_reversal_intraday_signal", return_value={"available": False, "signal": False, "candles": []})
    @mock.patch("jongga.generate_latest.fetch_naver_price_history")
    @mock.patch("jongga.generate_latest.request_json")
    def test_build_stock_snapshot_accepts_short_history(self, request_json_mock, price_history_mock, _intraday_mock, _event_filter_mock):
        request_json_mock.side_effect = [
            {"closePrice": "1020", "stockPrice": "1020", "sosok": "KOSDAQ"},
            {
                "totalInfos": [
                    {"code": "lastClosePrice", "value": "1000"},
                    {"code": "openPrice", "value": "1010"},
                    {"code": "highPrice", "value": "1030"},
                    {"code": "lowPrice", "value": "990"},
                    {"code": "accumulatedTradingVolume", "value": "123456"},
                    {"code": "accumulatedTradingValue", "value": "12,345,678,900"},
                    {"code": "marketValue", "value": "1조 2,000억"},
                ],
                "dealTrendInfos": [],
            },
        ]
        price_history_mock.return_value = [
            {
                "closePrice": "1020",
                "highPrice": "1030",
                "lowPrice": "990",
                "openPrice": "1010",
                "accumulatedTradingVolume": "123456",
            },
            {
                "closePrice": "1000",
                "highPrice": "1010",
                "lowPrice": "980",
                "openPrice": "990",
                "accumulatedTradingVolume": "100000",
            },
            {
                "closePrice": "995",
                "highPrice": "1005",
                "lowPrice": "970",
                "openPrice": "980",
                "accumulatedTradingVolume": "90000",
            },
        ]

        snapshot = build_stock_snapshot((1, "477850", "마키나락스"))

        self.assertEqual(snapshot.code, "477850")
        self.assertEqual(snapshot.current_price, 1020.0)
        self.assertEqual(snapshot.prev_close, 1000.0)
        self.assertEqual(snapshot.high_20d, 1030.0)
        self.assertEqual(snapshot.low_5d, 970.0)
        self.assertEqual(snapshot.volume_avg_20d, (100000.0 + 90000.0) / 2)
        self.assertEqual(snapshot.industry_code, "")
        self.assertIsNone(snapshot.industry_compare_change_pct)

    @mock.patch("jongga.generate_latest.build_auto_event_filter", return_value=None)
    @mock.patch("jongga.generate_latest.fetch_reversal_intraday_signal", return_value={"available": False, "signal": False, "candles": []})
    @mock.patch("jongga.generate_latest.fetch_naver_price_history")
    @mock.patch("jongga.generate_latest.request_json")
    def test_build_stock_snapshot_uses_latest_filtered_close_when_target_day_is_missing(self, request_json_mock, price_history_mock, _intraday_mock, _event_filter_mock):
        request_json_mock.side_effect = [
            {"closePrice": "3000", "stockPrice": "3000", "sosok": "KOSDAQ"},
            {
                "totalInfos": [
                    {"code": "lastClosePrice", "value": "2900"},
                    {"code": "openPrice", "value": "2950"},
                    {"code": "highPrice", "value": "3050"},
                    {"code": "lowPrice", "value": "2850"},
                    {"code": "accumulatedTradingVolume", "value": "555555"},
                    {"code": "accumulatedTradingValue", "value": "12,345,678,900"},
                    {"code": "marketValue", "value": "1조 2,000억"},
                ],
                "dealTrendInfos": [],
            },
        ]
        price_history_mock.return_value = [
            {
                "localTradedAt": "2026-06-07",
                "closePrice": "2500",
                "highPrice": "2600",
                "lowPrice": "2450",
                "openPrice": "2480",
                "accumulatedTradingVolume": "90000",
            },
            {
                "localTradedAt": "2026-06-05",
                "closePrice": "2000",
                "highPrice": "2100",
                "lowPrice": "1950",
                "openPrice": "1980",
                "accumulatedTradingVolume": "80000",
            },
        ]

        snapshot = build_stock_snapshot((1, "477850", "마키나락스"), date(2026, 6, 8))

        self.assertEqual(snapshot.current_price, 2500.0)

    @mock.patch("jongga.generate_latest.build_auto_event_filter", return_value=None)
    @mock.patch("jongga.generate_latest.fetch_reversal_intraday_signal", return_value={"available": False, "signal": False, "candles": []})
    @mock.patch("jongga.generate_latest.fetch_naver_price_history")
    @mock.patch("jongga.generate_latest.request_json")
    def test_build_stock_snapshot_uses_analysis_date_history_row(self, request_json_mock, price_history_mock, _intraday_mock, _event_filter_mock):
        request_json_mock.side_effect = [
            {"closePrice": "3000", "stockPrice": "3000", "sosok": "KOSDAQ"},
            {
                "totalInfos": [
                    {"code": "lastClosePrice", "value": "2900"},
                    {"code": "openPrice", "value": "2950"},
                    {"code": "highPrice", "value": "3050"},
                    {"code": "lowPrice", "value": "2850"},
                    {"code": "accumulatedTradingVolume", "value": "555555"},
                    {"code": "accumulatedTradingValue", "value": "12,345,678,900"},
                    {"code": "marketValue", "value": "1조 2,000억"},
                ],
                "dealTrendInfos": [],
            },
        ]
        price_history_mock.return_value = [
            {
                "localTradedAt": "2026-06-07",
                "closePrice": "3000",
                "highPrice": "3100",
                "lowPrice": "2950",
                "openPrice": "2970",
                "accumulatedTradingVolume": "120000",
            },
            {
                "localTradedAt": "2026-06-06",
                "closePrice": "2500",
                "highPrice": "2600",
                "lowPrice": "2450",
                "openPrice": "2480",
                "accumulatedTradingVolume": "90000",
            },
            {
                "localTradedAt": "2026-06-05",
                "closePrice": "2000",
                "highPrice": "2100",
                "lowPrice": "1950",
                "openPrice": "1980",
                "accumulatedTradingVolume": "80000",
            },
        ]

        snapshot = build_stock_snapshot((1, "477850", "마키나락스"), date(2026, 6, 6))

        self.assertEqual(snapshot.current_price, 2500.0)
        self.assertEqual(snapshot.prev_close, 2000.0)
        self.assertEqual(snapshot.open_price, 2480.0)
        self.assertEqual(snapshot.high_price, 2600.0)
        self.assertEqual(snapshot.low_price, 2450.0)
        self.assertEqual(snapshot.volume, 90000.0)

    def test_fetch_browser_candidate_enrichments_treats_missing_playwright_as_note(self):
        import builtins

        original_import = builtins.__import__

        def raising_import(name, *args, **kwargs):
            if name == "playwright.sync_api":
                raise ModuleNotFoundError("No module named 'playwright'")
            return original_import(name, *args, **kwargs)

        with mock.patch("builtins.__import__", side_effect=raising_import):
            enrichments, errors, meta = fetch_browser_candidate_enrichments([{"code": "005930", "name": "삼성전자", "needsEventFilter": False}])

        self.assertEqual(enrichments, {})
        self.assertEqual(errors, [])
        self.assertEqual(meta["browserSource"], "unavailable")
        self.assertIn("playwright unavailable", meta["launchNotes"][0])

    def test_safe_console_text_replaces_unencodable_characters(self):
        stdout = mock.Mock()
        stdout.encoding = "cp949"
        with mock.patch("sys.stdout", stdout):
            self.assertEqual(safe_console_text("G-A 🟢"), "G-A ?")

    def test_prepare_console_output_prefers_utf8_when_supported(self):
        stdout = mock.Mock()
        stderr = mock.Mock()
        with mock.patch("sys.stdout", stdout), mock.patch("sys.stderr", stderr):
            prepare_console_output()
        stdout.reconfigure.assert_called_once_with(encoding="utf-8", errors="replace")
        stderr.reconfigure.assert_called_once_with(encoding="utf-8", errors="replace")

    def test_build_pullback_entry_marks_c3_when_industry_outperforms_kospi(self):
        snapshot = StockSnapshot(
            rank=3,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9900.0,
            high_price=10100.0,
            low_price=9700.0,
            volume=150.0,
            trading_value_text="1,000억",
            market_cap_trillion=10.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[10000.0, 9800.0, 9700.0, 9600.0, 9500.0, 9400.0, 9300.0],
            high_history=[10100.0, 10050.0, 9950.0, 9850.0, 9750.0, 9650.0, 9550.0],
            low_history=[9700.0, 9600.0, 9500.0, 9400.0, 9300.0, 9200.0, 9100.0],
            volume_history=[150.0, 120.0, 110.0, 100.0, 95.0, 90.0, 85.0],
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3, -0.1, -0.2],
            high_20d=11500.0,
            low_5d=9300.0,
            high_52w=12000.0,
            return_5d=6.0,
            return_20d=12.0,
            return_21d=12.5,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.2,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
        )
        context = {
            "regimeLabel": "박스권 ⚠️",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "vkospiLabel": "VKOSPI",
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
            "kospiChangePct": 0.4,
        }

        entry = build_pullback_entry(snapshot, context)

        self.assertIn("C3", [rule["code"] for rule in entry["matchedRules"]])
        self.assertNotIn("C3", [rule["code"] for rule in entry["unmatchedRules"]])
        c3_rule = next(rule for rule in entry["matchedRules"] if rule["code"] == "C3")
        self.assertIn("outperform", c3_rule["note"])

    def test_build_pullback_entry_explains_c3_when_industry_data_missing(self):
        snapshot = StockSnapshot(
            rank=3,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9900.0,
            high_price=10100.0,
            low_price=9700.0,
            volume=150.0,
            trading_value_text="1,000억",
            market_cap_trillion=10.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[10000.0, 9800.0, 9700.0, 9600.0, 9500.0, 9400.0, 9300.0],
            high_history=[10100.0, 10050.0, 9950.0, 9850.0, 9750.0, 9650.0, 9550.0],
            low_history=[9700.0, 9600.0, 9500.0, 9400.0, 9300.0, 9200.0, 9100.0],
            volume_history=[150.0, 120.0, 110.0, 100.0, 95.0, 90.0, 85.0],
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3, -0.1, -0.2],
            high_20d=11500.0,
            low_5d=9300.0,
            high_52w=12000.0,
            return_5d=6.0,
            return_20d=12.0,
            return_21d=12.5,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=None,
            industry_compare_count=0,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
        )
        context = {
            "regimeLabel": "박스권 ⚠️",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "vkospiLabel": "VKOSPI",
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
            "kospiChangePct": 0.4,
        }

        entry = build_pullback_entry(snapshot, context)

        c3_rule = next(rule for rule in entry["unmatchedRules"] if rule["code"] == "C3")
        self.assertEqual(c3_rule["note"], "동종업종 비교 데이터 부족")
        self.assertEqual(c3_rule["evalStatus"], "data_missing")
        self.assertIn("동종업종 비교 데이터 부족", entry["notes"])

    def test_build_pullback_entry_p1_not_met_vs_data_missing(self):
        snapshot = StockSnapshot(
            rank=2,
            code="000660",
            name="SK하이닉스",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9900.0,
            high_price=10100.0,
            low_price=9900.0,
            volume=150.0,
            trading_value_text="1,000억",
            market_cap_trillion=10.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[10000.0] + [9800.0 - i * 10 for i in range(24)],
            high_history=[10100.0] + [10050.0 - i * 5 for i in range(24)],
            low_history=[9700.0] * 25,
            volume_history=[150.0] * 25,
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3, -0.1, -0.2],
            high_20d=10100.0,
            low_5d=9700.0,
            high_52w=12000.0,
            return_5d=6.0,
            return_20d=12.0,
            return_21d=12.5,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.2,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
        )
        context = {
            "regimeLabel": "박스권 ⚠️",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
            "kospiChangePct": 0.4,
        }

        entry = build_pullback_entry(snapshot, context)
        p1_rule = next(rule for rule in entry["unmatchedRules"] if rule["code"] == "P1")
        self.assertEqual(p1_rule["evalStatus"], "not_met")
        self.assertIn("이평선 터치", p1_rule["note"])
        self.assertIn("없음", p1_rule["note"])

    def test_build_momentum_entry_marks_s2_and_c3_from_browser_metrics(self):
        snapshot = StockSnapshot(
            rank=5,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9700.0,
            high_price=10100.0,
            low_price=9650.0,
            volume=300.0,
            trading_value_text="1,000억",
            market_cap_trillion=10.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[10000.0, 9800.0, 9700.0, 9600.0, 9500.0, 9400.0, 9300.0, 9200.0, 9100.0, 9000.0, 8900.0, 8800.0, 8700.0, 8600.0, 8500.0, 8400.0, 8300.0, 8200.0, 8100.0, 8000.0, 7900.0],
            high_history=[10100.0] * 21,
            low_history=[9600.0] * 21,
            volume_history=[300.0, 120.0, 110.0, 100.0, 95.0, 90.0, 85.0, 80.0, 75.0, 70.0, 65.0, 60.0, 55.0, 50.0, 45.0, 40.0, 35.0, 30.0, 25.0, 20.0, 15.0],
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3, -0.1, -0.2],
            high_20d=10100.0,
            low_5d=9600.0,
            high_52w=10500.0,
            return_5d=7.0,
            return_20d=25.0,
            return_21d=26.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.0,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            toss={"avgStrength": 114.0, "intradayAbove100Ratio": 82.0},
            orderbook={"bidAskRatio": 1.5},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
        }

        entry = build_momentum_entry(snapshot, context, True, 1.0, 5.0)

        matched_codes = [rule["code"] for rule in entry["matchedRules"]]
        self.assertIn("S2", matched_codes)
        self.assertIn("C3", matched_codes)
        s2_rule = next(rule for rule in entry["matchedRules"] if rule["code"] == "S2")
        c3_rule = next(rule for rule in entry["matchedRules"] if rule["code"] == "C3")
        self.assertEqual(s2_rule["evalStatus"], "met")
        self.assertEqual(c3_rule["evalStatus"], "met")
        self.assertIn("114.0%", s2_rule["note"])
        self.assertIn("1.5", c3_rule["note"])
        self.assertEqual(entry["scoreMax"], 11.5)
        self.assertIn("strictScore", entry)
        self.assertIn("signalScore", entry)
        self.assertIn("scoreBreakdown", entry)
        self.assertIn("entryEligible", entry)
        self.assertEqual(entry["score"], entry["signalScore"])
        self.assertIsInstance(entry["scoreBreakdown"], list)
        self.assertTrue(any(row["code"] == "RS" for row in entry["scoreBreakdown"]))
        # marking attached through the real builder path (cold-start: empty rollup in test context)
        self.assertIn("recommendedEntryBand", entry)
        self.assertIn("recommendedStage", entry)
        self.assertTrue(entry["recommendedStage"]["stageKey"])
        take_profit = [row for row in entry["tradePlanRows"] if "손절" not in row["stage"]]
        self.assertEqual(sum(1 for row in take_profit if row.get("recommended")), 1)
        self.assertTrue(all("historicalHitRate" in row for row in take_profit))

    def test_build_momentum_entry_explains_missing_browser_metrics(self):
        snapshot = StockSnapshot(
            rank=5,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9700.0,
            high_price=10100.0,
            low_price=9650.0,
            volume=300.0,
            trading_value_text="1,000억",
            market_cap_trillion=10.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[10000.0, 9800.0, 9700.0, 9600.0, 9500.0, 9400.0, 9300.0, 9200.0, 9100.0, 9000.0, 8900.0, 8800.0, 8700.0, 8600.0, 8500.0, 8400.0, 8300.0, 8200.0, 8100.0, 8000.0, 7900.0],
            high_history=[10100.0] * 21,
            low_history=[9600.0] * 21,
            volume_history=[300.0, 120.0, 110.0, 100.0, 95.0, 90.0, 85.0, 80.0, 75.0, 70.0, 65.0, 60.0, 55.0, 50.0, 45.0, 40.0, 35.0, 30.0, 25.0, 20.0, 15.0],
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3, -0.1, -0.2],
            high_20d=10100.0,
            low_5d=9600.0,
            high_52w=10500.0,
            return_5d=7.0,
            return_20d=25.0,
            return_21d=26.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.0,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            toss={"avgStrength": 114.0},
            orderbook={},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
        }

        entry = build_momentum_entry(snapshot, context, True, 1.0, 5.0)

        s2_rule = next(rule for rule in entry["unmatchedRules"] if rule["code"] == "S2")
        c3_rule = next(rule for rule in entry["unmatchedRules"] if rule["code"] == "C3")
        self.assertEqual(s2_rule["evalStatus"], "manual_required")
        self.assertEqual(c3_rule["evalStatus"], "manual_required")
        self.assertIn("미입력", s2_rule["note"])
        self.assertIn("미입력", c3_rule["note"])

    def test_build_reversal_entry_marks_c2_and_c3_from_browser_and_intraday_data(self):
        snapshot = StockSnapshot(
            rank=7,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9700.0,
            high_price=10100.0,
            low_price=9600.0,
            volume=300.0,
            trading_value_text="1,000억",
            market_cap_trillion=35.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=-100.0,
            institution_previous=-50.0,
            close_history=[10000.0, 9800.0, 9700.0, 9600.0, 9300.0, 9400.0, 9300.0, 9200.0, 9100.0, 9000.0, 8900.0, 8800.0, 8700.0, 8600.0, 8500.0, 8400.0, 8300.0, 8200.0, 8100.0, 8000.0, 7900.0],
            high_history=[10100.0] * 21,
            low_history=[9500.0] * 21,
            volume_history=[300.0, 120.0, 110.0, 100.0, 95.0, 90.0, 85.0, 80.0, 75.0, 70.0, 65.0, 60.0, 55.0, 50.0, 45.0, 40.0, 35.0, 30.0, 25.0, 20.0, 15.0],
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3, -0.1, -0.2],
            high_20d=12000.0,
            low_5d=9300.0,
            high_52w=12500.0,
            return_5d=7.0,
            return_20d=25.0,
            return_21d=35.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.0,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True, "note": "직전 30분봉 종가 10,000, 전봉 종가 9,800"},
            event_filter={"blocked": False, "note": "이벤트 필터 통과"},
            toss={"avgStrength": 94.0},
            orderbook={"bidAskRatio": 1.1},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
        }

        entry = build_reversal_entry(snapshot, context)

        matched_codes = [rule["code"] for rule in entry["matchedRules"]]
        self.assertIn("C2", matched_codes)
        self.assertIn("C3", matched_codes)
        c2_rule = next(rule for rule in entry["matchedRules"] if rule["code"] == "C2")
        c3_rule = next(rule for rule in entry["matchedRules"] if rule["code"] == "C3")
        self.assertIn("1.1", c2_rule["note"])
        self.assertIn("30분봉", c3_rule["note"])
        self.assertEqual(entry["volatilityContext"]["blendedState"], "volatile")
        self.assertEqual(entry["volatilityContext"]["strategyFit"], "favorable")
        self.assertTrue(any(row["code"] == "V1" and row["strictPoints"] == 1.0 for row in entry["scoreBreakdown"]))

    def test_build_reversal_entry_explains_missing_last_hour_strength(self):
        snapshot = StockSnapshot(
            rank=7,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9700.0,
            high_price=10100.0,
            low_price=9600.0,
            volume=300.0,
            trading_value_text="1,000억",
            market_cap_trillion=35.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=-100.0,
            institution_previous=-50.0,
            close_history=[10000.0, 9800.0, 9700.0, 9600.0, 9300.0, 9400.0, 9300.0, 9200.0, 9100.0, 9000.0, 8900.0, 8800.0, 8700.0, 8600.0, 8500.0, 8400.0, 8300.0, 8200.0, 8100.0, 8000.0, 7900.0],
            high_history=[10100.0] * 21,
            low_history=[9500.0] * 21,
            volume_history=[300.0, 120.0, 110.0, 100.0, 95.0, 90.0, 85.0, 80.0, 75.0, 70.0, 65.0, 60.0, 55.0, 50.0, 45.0, 40.0, 35.0, 30.0, 25.0, 20.0, 15.0],
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3, -0.1, -0.2],
            high_20d=12000.0,
            low_5d=9300.0,
            high_52w=12500.0,
            return_5d=7.0,
            return_20d=25.0,
            return_21d=35.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.0,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": False, "note": "직전 30분봉 종가 9,700, 전봉 종가 9,800"},
            event_filter={"blocked": False, "note": "이벤트 필터 통과"},
            toss={"avgStrength": 94.0},
            orderbook={"bidAskRatio": 0.92},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
        }

        entry = build_reversal_entry(snapshot, context)

        s2_rule = next(rule for rule in entry["unmatchedRules"] if rule["code"] == "S2")
        c2_rule = next(rule for rule in entry["unmatchedRules"] if rule["code"] == "C2")
        c3_rule = next(rule for rule in entry["unmatchedRules"] if rule["code"] == "C3")
        self.assertEqual(s2_rule["evalStatus"], "manual_required")
        self.assertIn("마지막 1시간", s2_rule["note"])
        self.assertIn("미입력", s2_rule["note"])
        self.assertEqual(c2_rule["evalStatus"], "not_met")
        self.assertIn("0.92", c2_rule["note"])
        self.assertEqual(c3_rule["evalStatus"], "not_met")
        self.assertIn("미달", c3_rule["note"])

    def test_build_reversal_entry_keeps_gap_e_blocked_when_macro_is_stale(self):
        snapshot = StockSnapshot(
            rank=7,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9700.0,
            high_price=10100.0,
            low_price=9600.0,
            volume=300.0,
            trading_value_text="1,000억",
            market_cap_trillion=35.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=-100.0,
            institution_previous=-50.0,
            close_history=[10000.0, 9800.0, 9700.0, 9600.0, 9300.0, 9400.0, 9300.0, 9200.0, 9100.0, 9000.0, 8900.0, 8800.0, 8700.0, 8600.0, 8500.0, 8400.0, 8300.0, 8200.0, 8100.0, 8000.0, 7900.0],
            high_history=[10100.0] * 21,
            low_history=[9500.0] * 21,
            volume_history=[300.0, 120.0, 110.0, 100.0, 95.0, 90.0, 85.0, 80.0, 75.0, 70.0, 65.0, 60.0, 55.0, 50.0, 45.0, 40.0, 35.0, 30.0, 25.0, 20.0, 15.0],
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3, -0.1, -0.2],
            high_20d=12000.0,
            low_5d=9300.0,
            high_52w=12500.0,
            return_5d=7.0,
            return_20d=25.0,
            return_21d=35.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.0,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True, "note": "직전 30분봉 종가 10,000, 전봉 종가 9,800"},
            event_filter={"blocked": False, "note": "이벤트 필터 통과"},
            toss={"avgStrength": 94.0},
            orderbook={"bidAskRatio": 1.1},
        )
        context = {
            "regimeLabel": REGIME_STRONG_BULL,
            "effectiveRegimeLabel": REGIME_STRONG_BULL,
            "gapScore": {"code": "G-E", "isFresh": False},
            "riseJustifiedByMacro": True,
            "vkospiValue": 18.0,
        }

        entry = build_reversal_entry(snapshot, context)

        self.assertIn(entry["statusLabel"], {"매매금지", "매매금지(갭다운 경고 · 신규 진입 금지)"})
        self.assertFalse(entry["entryEligible"])

    def test_reversal_thresholds_are_relaxed_for_practical_candidates(self):
        snapshot = SimpleNamespace(
            market_cap_trillion=5.2,
            return_21d=15.0,
            close_history=[100.0, 97.0, 100.0, 101.0, 102.0, 103.0],
            high_20d=108.0,
            current_price=102.0,
        )

        f2 = evaluate_reversal_f2(snapshot)
        g1 = evaluate_reversal_g1(snapshot)
        g2 = evaluate_reversal_g2(snapshot)
        g4 = evaluate_reversal_g4(snapshot)

        self.assertEqual(f2.eval_status, "met")
        self.assertEqual(g1.eval_status, "met")
        self.assertEqual(g2.eval_status, "met")
        self.assertEqual(g4.eval_status, "met")
        self.assertIn("필요 ≥ 5조", f2.note)
        self.assertIn("필요 ≥ +15%", g1.note)
        self.assertIn("필요 -5%~-25%", g2.note)
        self.assertIn("필요 -3% 이하", g4.note)

    def _sample_payload(self):
        return {
            "schemaVersion": "jongga_result.v1",
            "generatedAt": "2026-05-22T01:00:00+00:00",
            "dataQuality": {"status": "partial"},
            "slots": [{
                "slotId": "slotA",
                "entries": {
                    "pullback": [{"name": "낮은점수", "code": "000010", "score": 6.1, "grade": "B", "statusLabel": "관심후보"}],
                    "breakout": [{"name": "높은점수", "code": "000020", "score": 8.7, "grade": "A", "statusLabel": "매수추천"}],
                    "reversal": [],
                    "swing": [],
                },
            }],
        }

    def _session_payload(
        self,
        session: str,
        *,
        pullback: list[str] | None = None,
        accumulation: list[str] | None = None,
        breakout: list[str] | None = None,
        reversal: list[str] | None = None,
    ) -> dict[str, Any]:
        def build_entries(strategy: str, codes: list[str] | None) -> list[dict[str, Any]]:
            return [
                {
                    "name": f"{strategy}-{code}",
                    "code": code,
                    "score": 8.0,
                    "signalScore": 8.0,
                    "strictScore": 8.0,
                    "grade": "A",
                    "statusLabel": "매수추천",
                    "strategy": strategy,
                }
                for code in (codes or [])
            ]

        payload = payload_with_analysis_date(
            {
                "schemaVersion": "jongga_result.v1",
                "generatedAt": "2026-05-22T15:00:00+09:00",
                "dataQuality": {"status": "partial"},
                "slots": [{
                    "slotId": "slotA",
                    "entries": {
                        "pullback": build_entries("pullback", pullback),
                        "accumulation": build_entries("accumulation", accumulation),
                        "breakout": build_entries("breakout", breakout),
                        "reversal": build_entries("reversal", reversal),
                        "swing": [],
                    },
                }],
            },
            date(2026, 5, 22),
            variant=VARIANT_STABLE,
        )
        return annotate_payload_with_analysis_session(payload, session=session)

    def test_annotate_payload_with_analysis_session_adds_root_and_entry_metadata(self):
        payload = annotate_payload_with_analysis_session(
            payload_with_analysis_date(self._sample_payload(), date(2026, 5, 22), variant=VARIANT_STABLE),
            session="1500",
        )

        self.assertEqual(payload["analysisSession"], "1500")
        self.assertEqual(payload["analysisSessionLabel"], "3시 분석")
        self.assertEqual(payload["sessionSources"], ["1500"])
        self.assertEqual(payload["slots"][0]["entries"]["pullback"][0]["analysisSession"], "1500")
        self.assertEqual(payload["slots"][0]["entries"]["pullback"][0]["analysisSessionLabel"], "3시 분석")
        self.assertEqual(payload["slots"][0]["entries"]["breakout"][0]["analysisSession"], "1500")

    def test_merge_same_day_session_payloads_keeps_1730_cards_and_appends_1500_unique_same_strategy(self):
        payload_1500 = self._session_payload(
            "1500",
            pullback=["000111", "000888"],
            accumulation=["000222"],
            breakout=["000444"],
            reversal=["000333"],
        )
        payload_1730 = self._session_payload(
            "1730",
            pullback=["000111", "000555", "000556"],
            accumulation=["000666", "000333"],
            breakout=["000777"],
            reversal=[],
        )

        merged = merge_same_day_session_payloads(payload_1500, payload_1730)
        entries = merged["slots"][0]["entries"]

        self.assertEqual(merged["analysisSession"], "1730")
        self.assertEqual(merged["analysisSessionLabel"], "5시반 분석")
        self.assertEqual(merged["sessionSources"], ["1500", "1730"])
        self.assertEqual([item["code"] for item in entries["pullback"]], ["000111", "000555", "000556", "000888"])
        self.assertEqual([item["rank"] for item in entries["pullback"]], [1, 2, 3, 4])
        self.assertEqual(entries["pullback"][0]["analysisSessionLabel"], "5시반 분석")
        self.assertEqual(entries["pullback"][-1]["analysisSessionLabel"], "3시 분석")
        self.assertEqual([item["code"] for item in entries["accumulation"]], ["000666", "000333", "000222"])
        self.assertEqual([item["code"] for item in entries["reversal"]], ["000333"])
        self.assertEqual(entries["reversal"][0]["analysisSessionLabel"], "3시 분석")
        self.assertEqual([item["code"] for item in entries["breakout"]], ["000777"])


    def test_breakout_and_accumulation_g2_are_mutually_exclusive(self):
        def make_snapshot(*, price: float, high_52w: float) -> StockSnapshot:
            return StockSnapshot(
                rank=10,
                code="005930",
                name="테스트",
                current_price=price,
                prev_close=price * 0.99,
                open_price=price * 0.98,
                high_price=price * 1.01,
                low_price=price * 0.97,
                volume=1000.0,
                trading_value_text="1,000억",
                market_cap_trillion=10.0,
                foreign_net=1000.0,
                institution_net=500.0,
                foreign_previous=0.0,
                institution_previous=0.0,
                close_history=[price] * 21,
                high_history=[price * 1.02] * 21,
                low_history=[price * 0.97] * 21,
                volume_history=[800.0] * 21,
                ma5=price * 0.99,
                ma10=price * 0.98,
                ma20=price * 0.97,
                ma60=price * 0.95,
                ma5_prev=price * 0.98,
                ma20_prev=price * 0.96,
                ma60_prev=price * 0.94,
                weekly_rsi=55.0,
                macd_hist=[0.1],
                high_20d=price * 1.05,
                low_5d=price * 0.95,
                high_52w=high_52w,
                return_5d=5.0,
                return_20d=10.0,
                return_21d=11.0,
                volume_avg_5d=700.0,
                volume_avg_20d=800.0,
                industry_code="307",
                industry_compare_change_pct=1.0,
                industry_compare_count=5,
                intraday_30m={"available": False},
                event_filter=None,
                toss={},
                orderbook={},
            )

        near_high = make_snapshot(price=92000.0, high_52w=100000.0)
        self.assertTrue(evaluate_breakout_g2(near_high).passed)
        self.assertFalse(evaluate_accumulation_g2(near_high).passed)

        quiet = make_snapshot(price=80000.0, high_52w=100000.0)
        self.assertFalse(evaluate_breakout_g2(quiet).passed)
        self.assertTrue(evaluate_accumulation_g2(quiet).passed)

    def test_accumulation_confirmation_gates_are_warning_not_hard_block(self):
        snapshot = StockSnapshot(
            rank=12,
            code="005930",
            name="테스트",
            current_price=95000.0,
            prev_close=94000.0,
            open_price=94200.0,
            high_price=95500.0,
            low_price=93800.0,
            volume=130.0,
            trading_value_text="1,000억",
            market_cap_trillion=12.0,
            foreign_net=1500.0,
            institution_net=500.0,
            foreign_previous=-200.0,
            institution_previous=-100.0,
            close_history=[95000.0] * 21,
            high_history=[95500.0] * 21,
            low_history=[93800.0] * 21,
            volume_history=[130.0] + [100.0] * 20,
            ma5=94500.0,
            ma10=94000.0,
            ma20=93800.0,
            ma60=90000.0,
            ma5_prev=94400.0,
            ma20_prev=93700.0,
            ma60_prev=89900.0,
            weekly_rsi=58.0,
            macd_hist=[0.2, 0.1, 0.05],
            high_20d=96000.0,
            low_5d=93000.0,
            high_52w=100000.0,
            return_5d=4.0,
            return_20d=8.0,
            return_21d=8.0,
            volume_avg_5d=110.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=0.8,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            toss={},
            orderbook={},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
        }

        entry = build_accumulation_entry(snapshot, context)
        g0_gate = next(rule for rule in entry["gates"] if rule["code"] == "G0")
        g2_gate = next(rule for rule in entry["gates"] if rule["code"] == "G2")
        g4_gate = next(rule for rule in entry["gates"] if rule["code"] == "G4")

        self.assertEqual(g0_gate["status"], "⚠️")
        self.assertEqual(g2_gate["status"], "⚠️")
        self.assertEqual(g4_gate["status"], "✅")

    def test_accumulation_uses_late_buy_strength_confirmation(self):
        snapshot = StockSnapshot(
            rank=12,
            code="005930",
            name="테스트",
            current_price=95000.0,
            prev_close=94000.0,
            open_price=94200.0,
            high_price=95500.0,
            low_price=93800.0,
            volume=85.0,
            trading_value_text="1,000억",
            market_cap_trillion=12.0,
            foreign_net=1500.0,
            institution_net=500.0,
            foreign_previous=200.0,
            institution_previous=100.0,
            close_history=[95000.0] * 21,
            high_history=[95500.0] * 21,
            low_history=[93800.0] * 21,
            volume_history=[85.0] + [100.0] * 20,
            ma5=94500.0,
            ma10=94000.0,
            ma20=94600.0,
            ma60=90000.0,
            ma5_prev=94400.0,
            ma20_prev=94500.0,
            ma60_prev=89900.0,
            weekly_rsi=58.0,
            macd_hist=[0.2, 0.1, 0.05],
            high_20d=96000.0,
            low_5d=93000.0,
            high_52w=110000.0,
            return_5d=4.0,
            return_20d=8.0,
            return_21d=8.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=0.8,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            toss={
                "avgStrength": 96.0,
                "lastHourAvgStrength": 118.0,
                "last30AvgStrength": 122.0,
                "last30BuySellRatio": 1.42,
            },
            orderbook={},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
        }

        entry = build_accumulation_entry(snapshot, context)
        matched_codes = {rule["code"] for rule in entry["matchedRules"]}
        self.assertTrue({"S3", "S4", "C4"}.issubset(matched_codes))
        self.assertIn("장후반 매수세 강화", entry["keyPoint"])
        self.assertIn("마지막 30분 틱 1.42:1", entry["keyPoint"])
        self.assertEqual(entry["manualInput"]["required"], False)
        self.assertEqual(entry["toss"]["avgStrength"], 96.0)
        self.assertEqual(entry["toss"]["lastHourAvgStrength"], 118.0)
        self.assertEqual(entry["toss"]["last30BuySellRatio"], 1.42)
        self.assertFalse(any("미반영" in note for note in entry["notes"]))
        self.assertEqual(entry["volatilityContext"]["strategyFit"], "unfavorable")
        self.assertTrue(any(row["code"] == "V1" for row in entry["scoreBreakdown"]))

    def test_build_pullback_entry_blocks_high_volume_bearish_trap(self):
        snapshot = self._pullback_test_snapshot(volume=850000.0, current_price=101500.0, open_price=103500.0, prev_close=103000.0)
        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(100000.0)):
            entry = build_pullback_entry(snapshot, self._pullback_context())

        g10 = next(row for row in entry["gates"] if row["code"] == "G10")
        self.assertEqual(g10["evalStatus"], "not_met")
        self.assertEqual(g10["status"], "⛔")

    def test_build_pullback_entry_scores_anchor_volume_contraction_met_partial_and_not_met(self):
        context = self._pullback_context()
        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(100000.0)):
            met_entry = build_pullback_entry(self._pullback_test_snapshot(volume=300000.0), context)
            partial_entry = build_pullback_entry(self._pullback_test_snapshot(volume=500000.0), context)
            weak_entry = build_pullback_entry(self._pullback_test_snapshot(volume=700000.0), context)

        met_c4 = next(row for row in met_entry["scoreBreakdown"] if row["code"] == "C4")
        partial_c4 = next(row for row in partial_entry["scoreBreakdown"] if row["code"] == "C4")
        weak_c4 = next(row for row in weak_entry["scoreBreakdown"] if row["code"] == "C4")
        self.assertEqual(met_c4["strictPoints"], 1.0)
        self.assertEqual(partial_c4["strictPoints"], 0.5)
        self.assertEqual(weak_c4["strictPoints"], 0.0)

    def test_build_pullback_entry_warns_when_anchor_or_support_only_one_axis_breaks(self):
        snapshot = self._pullback_test_snapshot(current_price=104000.0, low_price=103000.0, open_price=106000.0, prev_close=106000.0)
        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(103000.0)):
            entry = build_pullback_entry(snapshot, self._pullback_context())

        g11 = next(row for row in entry["gates"] if row["code"] == "G11")
        p3 = next(row for row in entry["scoreBreakdown"] if row["code"] == "P3")
        self.assertEqual(g11["status"], "⚠️")
        self.assertEqual(p3["evalStatus"], "not_met")

    def test_build_pullback_entry_blocks_when_anchor_and_support_both_break(self):
        snapshot = self._pullback_test_snapshot(current_price=102000.0, low_price=101500.0, open_price=106000.0, prev_close=106000.0)
        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(103500.0)):
            entry = build_pullback_entry(snapshot, self._pullback_context())

        g11 = next(row for row in entry["gates"] if row["code"] == "G11")
        self.assertEqual(g11["evalStatus"], "not_met")
        self.assertEqual(g11["status"], "⛔")

    def test_build_pullback_entry_blocks_on_last30_intraday_dump(self):
        snapshot = self._pullback_test_snapshot(toss={"avgStrength": 97.0, "lastHourAvgStrength": 92.0, "last30BuySellRatio": 0.82, "last30AvgStrength": 84.0})
        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(100000.0)):
            entry = build_pullback_entry(snapshot, self._pullback_context())

        g12 = next(row for row in entry["gates"] if row["code"] == "G12")
        self.assertEqual(g12["evalStatus"], "not_met")
        self.assertEqual(g12["status"], "⛔")

    def test_build_pullback_entry_s3_uses_partial_when_only_last_hour_is_decent(self):
        snapshot = self._pullback_test_snapshot(toss={"avgStrength": 94.0, "lastHourAvgStrength": 96.0})
        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(100000.0)):
            entry = build_pullback_entry(snapshot, self._pullback_context())

        s3 = next(row for row in entry["scoreBreakdown"] if row["code"] == "S3")
        self.assertEqual(s3["strictPoints"], 0.5)

    def test_build_pullback_entry_g13_blocks_event_filter_or_negative_news(self):
        blocked_snapshot = self._pullback_test_snapshot(event_filter={"blocked": True, "note": "실적 D-1"})
        negative_news_snapshot = self._pullback_test_snapshot(
            news_flow=self._pullback_news_flow(status="negative", positive_count=0, negative_count=1, fresh_positive_count=0, fresh_negative_count=1)
        )
        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(100000.0)):
            blocked_entry = build_pullback_entry(blocked_snapshot, self._pullback_context())
            negative_entry = build_pullback_entry(negative_news_snapshot, self._pullback_context())

        blocked_g13 = next(row for row in blocked_entry["gates"] if row["code"] == "G13")
        negative_g13 = next(row for row in negative_entry["gates"] if row["code"] == "G13")
        self.assertEqual(blocked_g13["evalStatus"], "not_met")
        self.assertEqual(negative_g13["evalStatus"], "not_met")

    def test_build_pullback_entry_c5_distinguishes_fresh_and_stale_news(self):
        fresh_snapshot = self._pullback_test_snapshot(news_flow=self._pullback_news_flow(status="positive", positive_count=1, fresh_positive_count=1))
        stale_snapshot = self._pullback_test_snapshot(
            news_flow=self._pullback_news_flow(status="stale_positive", positive_count=1, fresh_positive_count=0)
        )
        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(100000.0)):
            fresh_entry = build_pullback_entry(fresh_snapshot, self._pullback_context())
            stale_entry = build_pullback_entry(stale_snapshot, self._pullback_context())

        fresh_c5 = next(row for row in fresh_entry["scoreBreakdown"] if row["code"] == "C5")
        stale_c5 = next(row for row in stale_entry["scoreBreakdown"] if row["code"] == "C5")
        self.assertEqual(fresh_c5["strictPoints"], 0.5)
        self.assertEqual(stale_c5["strictPoints"], 0.25)

    @mock.patch("jongga.generate_latest.fetch_kind_candidate_enrichments", return_value=({}, [], {"browserSource": "", "launchNotes": [], "launchAttempts": []}))
    def test_rank_pullback_entries_shortlists_only_and_reranks_after_news_enrichment(self, _kind_mock):
        snapshots = [
            self._pullback_test_snapshot(rank=index, code=f"{index:06d}", name=f"종목{index}", news_flow=None)
            for index in range(1, 11)
        ]

        def build_news_enrichment(candidates):
            enrichments = {}
            for snapshot in candidates:
                status = "positive" if snapshot.code == "000002" else "neutral"
                enrichments[snapshot.code] = {
                    "newsFlow": self._pullback_news_flow(
                        status=status,
                        positive_count=1 if status == "positive" else 0,
                        negative_count=0,
                        fresh_positive_count=1 if status == "positive" else 0,
                        summary="최근 5거래일 뉴스 1건 · 긍정 1건 · 악재 0건" if status == "positive" else "최근 5거래일 종목 뉴스 없음",
                    ),
                    "errors": [],
                }
            return enrichments, []

        with mock.patch("jongga.generate_latest.build_pullback_support_context", return_value=self._pullback_support_context(100000.0)):
            with mock.patch("jongga.generate_latest.fetch_pullback_news_candidate_enrichments", side_effect=build_news_enrichment) as news_mock:
                entries, meta = rank_pullback_entries_with_enrichment(snapshots, self._pullback_context(), 1)

        shortlisted_codes = {snapshot.code for snapshot in news_mock.call_args.args[0]}
        self.assertEqual(len(shortlisted_codes), 9)
        self.assertNotIn("000010", shortlisted_codes)
        self.assertEqual(entries[0]["code"], "000002")
        self.assertEqual(len(meta["shortlistCodes"]), 9)

    def test_accumulation_adds_recent_foreign_sponsor_trend_bonus(self):
        snapshot = StockSnapshot(
            rank=12,
            code="005930",
            name="테스트",
            current_price=95000.0,
            prev_close=94000.0,
            open_price=94200.0,
            high_price=95500.0,
            low_price=93800.0,
            volume=85.0,
            trading_value_text="1,000억",
            market_cap_trillion=12.0,
            foreign_net=1500.0,
            institution_net=-200.0,
            foreign_previous=1200.0,
            institution_previous=-100.0,
            close_history=[95000.0] * 21,
            high_history=[95500.0] * 21,
            low_history=[93800.0] * 21,
            volume_history=[85.0] + [100.0] * 20,
            ma5=94500.0,
            ma10=94000.0,
            ma20=94600.0,
            ma60=90000.0,
            ma5_prev=94400.0,
            ma20_prev=94500.0,
            ma60_prev=89900.0,
            weekly_rsi=58.0,
            macd_hist=[0.2, 0.1, 0.05],
            high_20d=96000.0,
            low_5d=93000.0,
            high_52w=110000.0,
            return_5d=4.0,
            return_20d=8.0,
            return_21d=8.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=0.8,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            deal_trend_history=[
                {"date": "20260611", "foreignNet": 1500.0, "institutionNet": -200.0},
                {"date": "20260610", "foreignNet": 1200.0, "institutionNet": -100.0},
                {"date": "20260609", "foreignNet": 900.0, "institutionNet": 0.0},
                {"date": "20260608", "foreignNet": 600.0, "institutionNet": -50.0},
                {"date": "20260605", "foreignNet": 300.0, "institutionNet": -150.0},
            ],
            toss={},
            orderbook={},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
        }

        entry = build_accumulation_entry(snapshot, context)
        matched_codes = {rule["code"] for rule in entry["matchedRules"]}
        self.assertIn("S5", matched_codes)
        self.assertEqual(entry["accumulationTrend"]["sponsor"], "foreign")
        self.assertEqual(entry["accumulationTrend"]["status"], "met")
        self.assertEqual(entry["accumulationTrend"]["lookbackDays"], 5)
        self.assertIn("외국인 최근 5일 매집 추세 강화", entry["keyPoint"])

    def test_accumulation_s5_partial_tracks_institution_without_full_bonus(self):
        snapshot = StockSnapshot(
            rank=12,
            code="005930",
            name="테스트",
            current_price=95000.0,
            prev_close=94000.0,
            open_price=94200.0,
            high_price=95500.0,
            low_price=93800.0,
            volume=85.0,
            trading_value_text="1,000억",
            market_cap_trillion=12.0,
            foreign_net=-100.0,
            institution_net=60.0,
            foreign_previous=-50.0,
            institution_previous=70.0,
            close_history=[95000.0] * 21,
            high_history=[95500.0] * 21,
            low_history=[93800.0] * 21,
            volume_history=[85.0] + [100.0] * 20,
            ma5=94500.0,
            ma10=94000.0,
            ma20=94600.0,
            ma60=90000.0,
            ma5_prev=94400.0,
            ma20_prev=94500.0,
            ma60_prev=89900.0,
            weekly_rsi=58.0,
            macd_hist=[0.2, 0.1, 0.05],
            high_20d=96000.0,
            low_5d=93000.0,
            high_52w=110000.0,
            return_5d=4.0,
            return_20d=8.0,
            return_21d=8.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=0.8,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            deal_trend_history=[
                {"date": "20260611", "foreignNet": -100.0, "institutionNet": 60.0},
                {"date": "20260610", "foreignNet": -50.0, "institutionNet": 70.0},
                {"date": "20260609", "foreignNet": -40.0, "institutionNet": 80.0},
                {"date": "20260608", "foreignNet": -30.0, "institutionNet": 90.0},
                {"date": "20260605", "foreignNet": -20.0, "institutionNet": 100.0},
            ],
            toss={},
            orderbook={},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
        }

        entry = build_accumulation_entry(snapshot, context)
        s5_row = next(row for row in entry["scoreBreakdown"] if row["code"] == "S5")
        matched_codes = {rule["code"] for rule in entry["matchedRules"]}
        self.assertNotIn("S5", matched_codes)
        self.assertEqual(entry["accumulationTrend"]["sponsor"], "institution")
        self.assertEqual(entry["accumulationTrend"]["status"], "partial")
        self.assertEqual(s5_row["strictPoints"], 0.5)
        self.assertIn("기관 최근 5일 매집 유지", entry["keyPoint"])

    def test_accumulation_s5_prefers_both_when_both_sponsors_strengthen(self):
        snapshot = StockSnapshot(
            rank=12,
            code="005930",
            name="테스트",
            current_price=95000.0,
            prev_close=94000.0,
            open_price=94200.0,
            high_price=95500.0,
            low_price=93800.0,
            volume=85.0,
            trading_value_text="1,000억",
            market_cap_trillion=12.0,
            foreign_net=900.0,
            institution_net=600.0,
            foreign_previous=700.0,
            institution_previous=450.0,
            close_history=[95000.0] * 21,
            high_history=[95500.0] * 21,
            low_history=[93800.0] * 21,
            volume_history=[85.0] + [100.0] * 20,
            ma5=94500.0,
            ma10=94000.0,
            ma20=94600.0,
            ma60=90000.0,
            ma5_prev=94400.0,
            ma20_prev=94500.0,
            ma60_prev=89900.0,
            weekly_rsi=58.0,
            macd_hist=[0.2, 0.1, 0.05],
            high_20d=96000.0,
            low_5d=93000.0,
            high_52w=110000.0,
            return_5d=4.0,
            return_20d=8.0,
            return_21d=8.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=0.8,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            deal_trend_history=[
                {"date": "20260611", "foreignNet": 900.0, "institutionNet": 600.0},
                {"date": "20260610", "foreignNet": 700.0, "institutionNet": 450.0},
                {"date": "20260609", "foreignNet": 500.0, "institutionNet": 300.0},
                {"date": "20260608", "foreignNet": 300.0, "institutionNet": 150.0},
                {"date": "20260605", "foreignNet": 100.0, "institutionNet": 50.0},
            ],
            toss={},
            orderbook={},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
        }

        entry = build_accumulation_entry(snapshot, context)
        self.assertEqual(entry["accumulationTrend"]["sponsor"], "both")
        self.assertEqual(entry["accumulationTrend"]["status"], "met")
        self.assertIn("기관+외국인 최근 5일 동반 매집 추세", entry["keyPoint"])

    def test_accumulation_s5_marks_data_missing_with_short_history(self):
        snapshot = StockSnapshot(
            rank=12,
            code="005930",
            name="테스트",
            current_price=95000.0,
            prev_close=94000.0,
            open_price=94200.0,
            high_price=95500.0,
            low_price=93800.0,
            volume=85.0,
            trading_value_text="1,000억",
            market_cap_trillion=12.0,
            foreign_net=1500.0,
            institution_net=500.0,
            foreign_previous=200.0,
            institution_previous=100.0,
            close_history=[95000.0] * 21,
            high_history=[95500.0] * 21,
            low_history=[93800.0] * 21,
            volume_history=[85.0] + [100.0] * 20,
            ma5=94500.0,
            ma10=94000.0,
            ma20=94600.0,
            ma60=90000.0,
            ma5_prev=94400.0,
            ma20_prev=94500.0,
            ma60_prev=89900.0,
            weekly_rsi=58.0,
            macd_hist=[0.2, 0.1, 0.05],
            high_20d=96000.0,
            low_5d=93000.0,
            high_52w=110000.0,
            return_5d=4.0,
            return_20d=8.0,
            return_21d=8.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=0.8,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            deal_trend_history=[
                {"date": "20260611", "foreignNet": 1500.0, "institutionNet": 500.0},
                {"date": "20260610", "foreignNet": 1200.0, "institutionNet": 400.0},
            ],
            toss={},
            orderbook={},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
            "kospiClose": 2600.0,
            "kospiMa5": 2550.0,
        }

        entry = build_accumulation_entry(snapshot, context)
        s5_row = next(row for row in entry["scoreBreakdown"] if row["code"] == "S5")
        self.assertEqual(entry["accumulationTrend"]["status"], "data_missing")
        self.assertEqual(entry["accumulationTrend"]["lookbackDays"], 2)
        self.assertEqual(s5_row["evalStatus"], "data_missing")

    def test_breakout_candle_and_ma5_gates_are_warning_not_hard_block(self):
        snapshot = StockSnapshot(
            rank=8,
            code="000660",
            name="하이닉스",
            current_price=90000.0,
            prev_close=88500.0,
            open_price=88000.0,
            high_price=93000.0,
            low_price=87500.0,
            volume=220.0,
            trading_value_text="1,500억",
            market_cap_trillion=60.0,
            foreign_net=1200.0,
            institution_net=700.0,
            foreign_previous=500.0,
            institution_previous=300.0,
            close_history=[90000.0] * 21,
            high_history=[93000.0] * 21,
            low_history=[87000.0] * 21,
            volume_history=[220.0] + [100.0] * 20,
            ma5=90500.0,
            ma10=89000.0,
            ma20=88000.0,
            ma60=84000.0,
            ma5_prev=91000.0,
            ma20_prev=87500.0,
            ma60_prev=83500.0,
            weekly_rsi=62.0,
            macd_hist=[0.4, 0.3, 0.2],
            high_20d=90500.0,
            low_5d=86000.0,
            high_52w=100000.0,
            return_5d=6.0,
            return_20d=18.0,
            return_21d=18.0,
            volume_avg_5d=130.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.4,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            toss={"avgStrength": 112.0, "intradayAbove100Ratio": 75.0},
            orderbook={"bidAskRatio": 1.2},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
        }

        entry = build_breakout_entry(snapshot, context, True, 1.0, 5.0)
        g5_gate = next(rule for rule in entry["gates"] if rule["code"] == "G5")
        g7_gate = next(rule for rule in entry["gates"] if rule["code"] == "G7")

        self.assertEqual(g5_gate["status"], "⚠️")
        self.assertEqual(g7_gate["status"], "⚠️")
        self.assertIn(entry["volatilityContext"]["strategyFit"], {"favorable", "slight_favorable", "neutral", "unfavorable"})
        self.assertIn("변동성", entry["keyPoint"])
        self.assertTrue(any(row["code"] == "V1" for row in entry["scoreBreakdown"]))

    def test_build_momentum_entry_is_breakout_alias(self):
        snapshot = StockSnapshot(
            rank=5,
            code="005930",
            name="삼성전자",
            current_price=10000.0,
            prev_close=9800.0,
            open_price=9700.0,
            high_price=10100.0,
            low_price=9650.0,
            volume=300.0,
            trading_value_text="1,000억",
            market_cap_trillion=10.0,
            foreign_net=1000.0,
            institution_net=500.0,
            foreign_previous=0.0,
            institution_previous=0.0,
            close_history=[10000.0] * 21,
            high_history=[10100.0] * 21,
            low_history=[9600.0] * 21,
            volume_history=[300.0, 120.0] + [100.0] * 19,
            ma5=9800.0,
            ma10=9700.0,
            ma20=9600.0,
            ma60=9400.0,
            ma5_prev=9700.0,
            ma20_prev=9500.0,
            ma60_prev=9300.0,
            weekly_rsi=55.0,
            macd_hist=[0.3],
            high_20d=10100.0,
            low_5d=9600.0,
            high_52w=10500.0,
            return_5d=7.0,
            return_20d=25.0,
            return_21d=26.0,
            volume_avg_5d=100.0,
            volume_avg_20d=100.0,
            industry_code="307",
            industry_compare_change_pct=1.0,
            industry_compare_count=5,
            intraday_30m={"available": True, "signal": True},
            event_filter=None,
            toss={"avgStrength": 114.0, "intradayAbove100Ratio": 82.0},
            orderbook={"bidAskRatio": 1.5},
        )
        context = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "vkospiValue": 18.0,
        }
        alias_entry = build_momentum_entry(snapshot, context, True, 1.0, 5.0)
        breakout_entry = build_breakout_entry(snapshot, context, True, 1.0, 5.0)
        self.assertEqual(alias_entry.get("strategy"), "breakout")
        self.assertEqual(breakout_entry.get("strategy"), "breakout")
        self.assertEqual(alias_entry.get("code"), breakout_entry.get("code"))


class TradePlanTest(unittest.TestCase):
    def _take_profit_rows(self, rows):
        return [row for row in rows if "손절" not in row["stage"]]

    def _qty(self, row):
        return int(str(row["quantity"]).split("%")[0])

    def test_pullback_accumulation_differ(self):
        from jongga.generate_latest import build_trade_plan

        for regime in ("강세장 ✅", "박스권 ⚠️", "약세장 ⛔"):
            pull = build_trade_plan("pullback", 10000, regime, "G-A")
            accu = build_trade_plan("accumulation", 10000, regime, "G-A")
            pull_qty = [self._qty(r) for r in self._take_profit_rows(pull)]
            accu_qty = [self._qty(r) for r in self._take_profit_rows(accu)]
            self.assertNotEqual(pull_qty, accu_qty, f"pullback/accumulation qty identical for {regime}")

    def test_reversal_regime_aware_and_no_swing(self):
        from jongga.generate_latest import build_trade_plan, parse_float

        stops = {}
        for regime in ("강세장 ✅", "박스권 ⚠️", "약세장 ⛔"):
            rows = build_trade_plan("reversal", 10000, regime, "G-A")
            self.assertFalse(any("스윙" in r["stage"] for r in rows), "reversal must have no swing row")
            self.assertFalse(any("장중 2차" in r["stage"] for r in rows), "reversal must have no intraday2 row")
            self.assertEqual(len(self._take_profit_rows(rows)), 3)
            stops[regime] = parse_float(rows[-1]["targetYield"])
        self.assertEqual(len(set(stops.values())), 3, f"reversal stops must differ by regime: {stops}")

    def test_qty_sums_to_100_and_omits_zero_legs(self):
        from jongga.generate_latest import build_trade_plan

        for strategy in ("pullback", "accumulation", "breakout", "reversal"):
            for regime in ("강세장 ✅", "박스권 ⚠️", "약세장 ⛔"):
                rows = build_trade_plan(strategy, 10000, regime, "G-A")
                tp = self._take_profit_rows(rows)
                self.assertEqual(sum(self._qty(r) for r in tp), 100, f"{strategy}/{regime} qty != 100")
                self.assertTrue(all(self._qty(r) > 0 for r in tp), "zero-qty leg should be omitted")

    def test_gap_offset_intraday_gating(self):
        from jongga.generate_latest import build_trade_plan, parse_float

        def intraday1(rows):
            return parse_float(next(r["targetYield"] for r in rows if "장중 1차" in r["stage"]))

        # breakout/reversal shift intraday on gap-down; pullback/accumulation do not
        for strategy, expected_shift in (("breakout", -1.0), ("reversal", -1.0), ("pullback", 0.0), ("accumulation", 0.0)):
            base = build_trade_plan(strategy, 10000, "강세장 ✅", "G-A")
            gapped = build_trade_plan(strategy, 10000, "강세장 ✅", "G-D")
            self.assertAlmostEqual(intraday1(gapped) - intraday1(base), expected_shift, msg=f"{strategy} intraday gating")
            # premarket always shifts
            self.assertAlmostEqual(parse_float(gapped[0]["targetYield"]) - parse_float(base[0]["targetYield"]), -1.0)

    def test_rr_uses_blended_reward_not_premarket(self):
        from jongga.generate_latest import build_trade_plan, blended_reward_from_plan, parse_float

        rows = build_trade_plan("breakout", 10000, "강세장 ✅", "G-A")
        premarket_rate = parse_float(rows[0]["targetYield"])
        blended = blended_reward_from_plan(rows)
        # blended reward must exceed the smallest (premarket) leg → higher, more realistic R/R
        self.assertGreater(blended, premarket_rate)

    def test_reversal_terminal_leg_marked_full_remainder(self):
        from jongga.generate_latest import build_trade_plan

        rows = build_trade_plan("reversal", 10000, "강세장 ✅", "G-A")
        tp = self._take_profit_rows(rows)
        self.assertIn("잔량 전량", tp[-1]["quantity"])


class MarkingTest(unittest.TestCase):
    def _entry(self, strategy="pullback"):
        from jongga.generate_latest import build_trade_plan

        return {
            "strategy": strategy,
            "entryPrice": 10000,
            "currentPrice": 10000,
            "tradePlanRows": build_trade_plan(strategy, 10000, "강세장 ✅", "G-A"),
        }

    def test_cold_start_uses_heuristic(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("pullback")
        ctx = {"regimeLabel": "강세장 ✅", "gapScore": {"code": "G-A"}, "kospiBullTier": "strong", "outcomesRollup": {}}
        attach_marking(entry, ctx)
        self.assertEqual(entry["recommendedTakeProfitProfile"]["label"], "기본 목표형")
        self.assertEqual(entry["recommendedStage"]["evBasis"], "heuristic")
        self.assertEqual(entry["recommendedStage"]["stageKey"], "intraday1")  # bull → intraday1
        tp = [r for r in entry["tradePlanRows"] if "손절" not in r["stage"]]
        self.assertTrue(all(r["historicalHitRate"] is None for r in tp))
        self.assertEqual(sum(1 for r in tp if r.get("recommended")), 1)

    def test_cold_start_high_vol_picks_premarket(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("breakout")
        ctx = {"regimeLabel": "약세장 ⛔", "gapScore": {"code": "G-A"}, "kospiBullTier": "weak", "outcomesRollup": {}}
        attach_marking(entry, ctx)
        self.assertEqual(entry["recommendedStage"]["stageKey"], "premarket")

    def test_ev_argmax_from_rollup(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("pullback")
        # openPhase has lower hitRate but at +4.0% → EV may beat premarket(+2.5%); intraday1 highest EV
        rollup = {
            "byStrategyStage": {
                "pullback|premarket": {"hitRate": 0.5, "sampleCount": 50},
                "pullback|openPhase": {"hitRate": 0.5, "sampleCount": 50},
                "pullback|intraday1": {"hitRate": 0.5, "sampleCount": 50},
                "pullback|intraday2": {"hitRate": 0.1, "sampleCount": 50},
                "pullback|swing": {"hitRate": 0.05, "sampleCount": 50},
            },
            "byCell": {},
        }
        ctx = {"regimeLabel": "강세장 ✅", "gapScore": {"code": "G-A"}, "kospiBullTier": "strong", "outcomesRollup": rollup}
        attach_marking(entry, ctx)
        # equal hitRate 0.5 across pre/open/i1 → highest target (intraday1 +6.0%) wins EV
        self.assertEqual(entry["recommendedStage"]["stageKey"], "intraday1")
        self.assertTrue(entry["recommendedStage"]["evBasis"].startswith("historical"))

    def test_confidence_floor_falls_back_to_coarse(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("pullback")
        # cell below MIN_SAMPLES(8) → ignored; coarse has enough samples
        rollup = {
            "byCell": {"pullback|bull|strong|G-A|premarket": {"hitRate": 0.99, "sampleCount": 3}},
            "byStrategyStage": {"pullback|premarket": {"hitRate": 0.6, "sampleCount": 40}},
        }
        ctx = {"regimeLabel": "강세장 ✅", "gapScore": {"code": "G-A"}, "kospiBullTier": "strong", "outcomesRollup": rollup}
        attach_marking(entry, ctx)
        pre = next(r for r in entry["tradePlanRows"] if "프리마켓" in r["stage"])
        self.assertEqual(pre["historicalHitRate"], 0.6)  # coarse, not the sparse 0.99 cell

    def test_pullback_profiles_use_friendly_labels_and_reason_copy(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("pullback")
        ctx = {"regimeLabel": "박스권 ⚠️", "gapScore": {"code": "G-C"}, "kospiBullTier": "neutral", "outcomesRollup": {}, "replayProfileRollup": {}}
        marking_meta = {"ma5Price": 10150, "ma5PrevPrice": 10200, "ma10Price": 10300, "ma10PrevPrice": 10320}

        attach_marking(entry, ctx, marking_meta)

        profiles = {profile["profileKey"]: profile for profile in entry["pullbackTakeProfitProfiles"]}
        self.assertEqual(profiles["aggressive"]["label"], "기본 목표형")
        self.assertEqual(profiles["balanced"]["label"], "1차 저항 반영형")
        self.assertEqual(profiles["conservative"]["label"], "저항 우선형")
        self.assertIn("기존 퍼센트 목표가", profiles["aggressive"]["reasonSummary"])
        self.assertIn("1차 목표가", profiles["balanced"]["reasonSummary"])
        self.assertIn("저항 우선형", entry["recommendedTakeProfitProfile"]["label"])
        self.assertIn("저항 우선형", profiles["conservative"]["reasonSummary"])

    def test_pullback_profile_fallback_reason_uses_friendly_label_copy(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("pullback")
        ctx = {"regimeLabel": "박스권 ⚠️", "gapScore": {"code": "G-C"}, "kospiBullTier": "neutral", "outcomesRollup": {}, "replayProfileRollup": {}}

        attach_marking(entry, ctx, {"ma5Price": 9950, "ma5PrevPrice": 10020, "ma10Price": 10000, "ma10PrevPrice": 10080})

        profiles = {profile["profileKey"]: profile for profile in entry["pullbackTakeProfitProfiles"]}
        self.assertIn("기본 목표형과 동일", profiles["conservative"]["reasonSummary"])
        self.assertIn("1차 저항 반영형", entry["recommendedTakeProfitProfile"]["reasonSummary"])

    def test_pullback_profiles_sync_stop_row_with_effective_stop_price(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("pullback")
        entry["pullbackStopPolicy"] = {
            "effectiveStopPrice": 9750,
            "fallbackStopPrice": 9750,
            "hardStopPrice": 9600,
            "anchorStopPrice": 12000,
        }
        entry["tradePlanRows"][-1] = {
            "stage": "🛑 손절",
            "stageKey": "stop",
            "condition": "유효 손절가 12,000원 하향 이탈",
            "quantity": "전량",
            "targetYield": "+20.0%",
            "targetPrice": "12,000원",
        }
        ctx = {"regimeLabel": "박스권 ⚠️", "gapScore": {"code": "G-C"}, "kospiBullTier": "neutral", "outcomesRollup": {}, "replayProfileRollup": {}}

        attach_marking(entry, ctx)

        stop_row = next(row for row in entry["tradePlanRows"] if row["stageKey"] == "stop")
        self.assertEqual(stop_row["targetPrice"], "9,750원")
        self.assertEqual(stop_row["targetYield"], "-2.5%")
        for profile in entry["pullbackTakeProfitProfiles"]:
            profile_stop_row = next(row for row in profile["tradePlanRows"] if row["stageKey"] == "stop")
            self.assertEqual(profile_stop_row["targetPrice"], "9,750원")
            self.assertEqual(profile_stop_row["targetYield"], "-2.5%")
            self.assertIn("유효 손절가 9,750원 하향 이탈", profile_stop_row["condition"])

    def test_reversal_profiles_do_not_drop_below_base_targets_when_rebound_is_shallow(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("reversal")
        ctx = {
            "regimeLabel": "강세장 ✅",
            "gapScore": {"code": "G-A"},
            "kospiBullTier": "strong",
            "outcomesRollup": {},
            "replayProfileRollup": {},
        }

        attach_marking(entry, ctx, {"highHistory": [10120, 10100, 10080]})

        profiles = {profile["profileKey"]: profile for profile in entry["reversalTakeProfitProfiles"]}
        aggressive_targets = [row["targetPrice"] for row in profiles["aggressive"]["tradePlanRows"] if row["stageKey"] != "stop"]
        balanced_targets = [row["targetPrice"] for row in profiles["balanced"]["tradePlanRows"] if row["stageKey"] != "stop"]
        conservative_targets = [row["targetPrice"] for row in profiles["conservative"]["tradePlanRows"] if row["stageKey"] != "stop"]

        self.assertEqual(aggressive_targets[:2], ["10,200원", "10,350원"])
        self.assertEqual(balanced_targets[:2], ["10,200원", "10,350원"])
        self.assertEqual(conservative_targets[:2], ["10,300원", "10,500원"])

    def test_accumulation_profiles_use_friendly_labels_and_reason_copy(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("accumulation")
        entry["accumulationStopPolicy"] = {"sponsorMode": "both"}
        ctx = {"regimeLabel": "강세장 ✅", "gapScore": {"code": "G-A"}, "kospiBullTier": "strong", "outcomesRollup": {}, "replayProfileRollup": {}}

        attach_marking(entry, ctx, {"highHistory": [10150, 10300, 11100, 9950]})

        profiles = {profile["profileKey"]: profile for profile in entry["accumulationTakeProfitProfiles"]}
        self.assertEqual(profiles["aggressive"]["label"], "기본 목표형")
        self.assertEqual(profiles["balanced"]["label"], "1차 저항 반영형")
        self.assertEqual(profiles["conservative"]["label"], "저항 우선형")
        self.assertIn("기존 퍼센트 목표가", profiles["aggressive"]["reasonSummary"])
        self.assertIn("앞단 목표가", profiles["balanced"]["reasonSummary"])
        self.assertIn("저항 우선형", profiles["conservative"]["label"])
        self.assertIn("저항 우선형", entry["recommendedTakeProfitProfile"]["reasonSummary"])

    def test_breakout_profiles_use_friendly_labels_and_reason_copy(self):
        from jongga.generate_latest import attach_marking

        entry = self._entry("breakout")
        ctx = {"regimeLabel": "강세장 ✅", "gapScore": {"code": "G-A"}, "kospiBullTier": "strong", "outcomesRollup": {}, "replayProfileRollup": {}}

        attach_marking(entry, ctx, {"highHistory": [10150, 10300, 11100, 9950]})

        profiles = {profile["profileKey"]: profile for profile in entry["breakoutTakeProfitProfiles"]}
        self.assertEqual(profiles["aggressive"]["label"], "기본 목표형")
        self.assertEqual(profiles["balanced"]["label"], "1차 저항 반영형")
        self.assertEqual(profiles["conservative"]["label"], "저항 우선형")
        self.assertIn("기존 퍼센트 목표가", profiles["aggressive"]["reasonSummary"])
        self.assertIn("앞단 목표가", profiles["balanced"]["reasonSummary"])
        self.assertIn("저항 우선형", profiles["conservative"]["label"])
        self.assertIn("저항 우선형", entry["recommendedTakeProfitProfile"]["reasonSummary"])

    def test_entry_band_brackets_anchor(self):
        from jongga.generate_latest import compute_recommended_entry_band

        band = compute_recommended_entry_band(10000, "강세장 ✅", "G-A")
        self.assertLess(band["low"], band["anchor"])
        self.assertLessEqual(band["anchor"], band["high"] + 1)
        self.assertLess(band["low"], band["high"])


if __name__ == "__main__":
    unittest.main()
