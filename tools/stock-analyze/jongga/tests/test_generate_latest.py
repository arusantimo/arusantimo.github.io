import io
import unittest
from contextlib import redirect_stdout
from datetime import date
from unittest import mock

from jongga.generate_latest import analyze_reversal_intraday_signal, build_auto_event_filter, build_gap_score, build_kind_event_filter_from_rows, build_market_context, build_stock_snapshot, build_top_trading_value_gate, emit_cli_failures, fetch_browser_candidate_enrichments, grade_from_score, parse_cnbc_quote_html, parse_kind_disclosure_rows, parse_market_cap_trillion, parse_naver_orderbook_ratio_html, parse_toss_stock_price_detail_payload, prepare_console_output, safe_console_text, select_top_trading_value_codes
from jongga.output_contract import VARIANT_CANARY, VARIANT_STABLE, build_daily_output_paths, build_history_entry, payload_with_analysis_date, render_daily_bridge_js, update_history_index, write_daily_outputs
from tempfile import TemporaryDirectory


class GenerateLatestTest(unittest.TestCase):
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

    def test_build_market_context_detects_bear_when_proxy_is_high(self):
        history = []
        base = 100.0
        for index in range(90):
            history.append({"closePrice": f"{base - index * 0.2:.2f}", "fluctuationsRatio": "-0.5"})
        context = build_market_context(history, {"grade": "G-D 🟠", "totalScore": "-3.5점", "entryAdjustment": "", "code": "G-D"}, {"current": 31.0, "label": "VKOSPI", "source": "cnbc_quote", "isFallback": False, "confidence": 0.85})
        self.assertEqual(context["regimeLabel"], "약세장 ⛔")

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
        self.assertEqual(parsed["source"], "toss_playwright_response")

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

    def test_select_top_trading_value_codes_keeps_raw_top40_only(self):
        rows = [
            {"itemCode": "069500", "stockName": "KODEX 200", "accumulatedTradingValueRaw": "100000"},
            {"itemCode": "000001", "stockName": "1위종목", "accumulatedTradingValueRaw": "99000"},
        ]
        rows.extend(
            {"itemCode": f"{index:06d}", "stockName": f"{index}위종목", "accumulatedTradingValueRaw": str(99000 - index)}
            for index in range(3, 43)
        )
        selected = select_top_trading_value_codes(rows, limit=40)
        self.assertEqual(selected[0], (2, "000001", "1위종목"))
        self.assertIn((40, "000040", "40위종목"), selected)
        self.assertNotIn((41, "000041", "41위종목"), selected)
        self.assertTrue(all(rank <= 40 for rank, _, _ in selected))

    def test_top_trading_value_gate_blocks_rank_over_40(self):
        passed = build_top_trading_value_gate(40, "G0")
        blocked = build_top_trading_value_gate(41, "G0")
        self.assertEqual(passed["status"], "✅")
        self.assertEqual(blocked["status"], "⛔")
        self.assertIn("TOP40", blocked["note"])

    def test_daily_output_paths_use_compact_date(self):
        json_path, js_path = build_daily_output_paths("jongga/output", date(2026, 5, 22), variant=VARIANT_STABLE)
        self.assertEqual(json_path.as_posix(), "jongga/output/latest_20260522.json")
        self.assertEqual(js_path.as_posix(), "jongga/output/jongga_data_20260522.js")

    def test_canary_output_paths_use_suffix(self):
        json_path, js_path = build_daily_output_paths("jongga/output", date(2026, 5, 22), variant=VARIANT_CANARY)
        self.assertEqual(json_path.as_posix(), "jongga/output/latest_20260522_canary.json")
        self.assertEqual(js_path.as_posix(), "jongga/output/jongga_data_20260522_canary.js")

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
        self.assertEqual(entry["topRecommendations"][0]["code"], "000020")

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
            with open(f"{tmp}/jongga_data_20260522.js", encoding="utf-8") as handle:
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
            with open(f"{tmp}/jongga_data_20260522_canary.js", encoding="utf-8") as handle:
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

    def _sample_payload(self):
        return {
            "schemaVersion": "jongga_result.v1",
            "generatedAt": "2026-05-22T01:00:00+00:00",
            "dataQuality": {"status": "partial"},
            "slots": [{
                "slotId": "slotA",
                "entries": {
                    "pullback": [{"name": "낮은점수", "code": "000010", "score": 6.1, "grade": "B", "statusLabel": "관심후보"}],
                    "momentum": [{"name": "높은점수", "code": "000020", "score": 8.7, "grade": "A", "statusLabel": "매수추천"}],
                    "reversal": [],
                    "swing": [],
                },
            }],
        }


if __name__ == "__main__":
    unittest.main()
