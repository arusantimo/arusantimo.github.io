import sys
import types
import unittest
import os
from datetime import datetime
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

from jongga.balance_sources import (
    _fetch_short_balance_series_pykrx,
    collect_short_balance_trend,
)
from jongga.env_settings import load_local_env


class _FakeFrame:
    def __init__(self, rows):
        self._rows = list(rows)
        self.empty = not self._rows

    def iterrows(self):
        yield from self._rows


class BalanceSourcesTest(unittest.TestCase):
    def test_load_local_env_reads_repo_style_dotenv_without_overriding_existing_env(self):
        with TemporaryDirectory() as tmp_dir:
            env_path = Path(tmp_dir) / ".env"
            env_path.write_text(
                'KRX_ID=demo-user\n'
                'KRX_PW="demo-pass"\n'
                "EXTRA_KEY=plain # trailing comment\n",
                encoding="utf-8",
            )
            with mock.patch.dict(os.environ, {"KRX_ID": "preset-user"}, clear=True):
                loaded = load_local_env(env_path=env_path)
                self.assertEqual(os.environ["KRX_ID"], "preset-user")
                self.assertEqual(os.environ["KRX_PW"], "demo-pass")
                self.assertEqual(os.environ["EXTRA_KEY"], "plain")

            self.assertEqual(loaded, env_path.resolve())

    def test_fetch_short_balance_series_pykrx_uses_code_and_date_window(self):
        calls = []

        def fake_get_shorting_balance_by_date(start, end, code):
            calls.append((start, end, code))
            return _FakeFrame([
                (datetime(2026, 6, 10), {"공매도잔고": "1,500,000"}),
                (datetime(2026, 6, 11), {"공매도잔고": "1,200,000"}),
            ])

        fake_pykrx = types.SimpleNamespace(
            stock=types.SimpleNamespace(get_shorting_balance_by_date=fake_get_shorting_balance_by_date)
        )
        with mock.patch.dict(sys.modules, {"pykrx": fake_pykrx}):
            series = _fetch_short_balance_series_pykrx("005930", "20260601", "20260611")

        self.assertEqual(calls, [("20260601", "20260611", "005930")])
        self.assertEqual(series, [("20260610", 1500000.0), ("20260611", 1200000.0)])

    def test_fetch_short_balance_series_pykrx_returns_empty_for_empty_frame(self):
        fake_pykrx = types.SimpleNamespace(
            stock=types.SimpleNamespace(
                get_shorting_balance_by_date=lambda start, end, code: _FakeFrame([])
            )
        )
        with mock.patch.dict(sys.modules, {"pykrx": fake_pykrx}):
            self.assertEqual(_fetch_short_balance_series_pykrx("005930", "20260601", "20260611"), [])

    def test_collect_short_balance_trend_records_pykrx_success(self):
        fake_pykrx = types.SimpleNamespace(
            stock=types.SimpleNamespace(
                get_shorting_balance_by_date=lambda start, end, code: _FakeFrame([
                    (datetime(2026, 6, 2), {"공매도잔고": "1,500,000"}),
                    (datetime(2026, 6, 13), {"공매도잔고": "1,200,000"}),
                ])
            )
        )
        with mock.patch.dict(sys.modules, {"pykrx": fake_pykrx}), mock.patch.dict(os.environ, {"KRX_ID": "demo", "KRX_PW": "demo"}, clear=False):
            result = collect_short_balance_trend(["005930"])

        self.assertEqual(result.status, "ok")
        self.assertIn("005930", result.values)
        self.assertEqual(result.provider_health["krx_pykrx_short_balance"]["ok"], 1)
        self.assertEqual(result.fallback_usage, [])

    def test_collect_short_balance_trend_falls_back_to_public_loader_balance_rows(self):
        with mock.patch(
            "jongga.balance_sources._fetch_short_balance_series_pykrx",
            return_value=[],
        ), mock.patch(
            "jongga.balance_sources._fetch_code_isin_map",
            return_value={"005930": "KR7005930003"},
        ), mock.patch(
            "jongga.balance_sources._fetch_short_balance_series_krx",
            return_value=[("20260602", 1500000.0), ("20260613", 1200000.0)],
        ):
            result = collect_short_balance_trend(["005930"])

        self.assertEqual(result.status, "partial")
        self.assertAlmostEqual(result.values["005930"], -20.0)
        self.assertEqual(result.provider_health["krx_pykrx_short_balance"]["data_missing"], 1)
        self.assertEqual(result.provider_health["krx_short_balance_direct_post"]["ok"], 1)
        self.assertEqual(result.fallback_usage[0]["provider"], "krx_short_balance_direct_post")


if __name__ == "__main__":
    unittest.main()
