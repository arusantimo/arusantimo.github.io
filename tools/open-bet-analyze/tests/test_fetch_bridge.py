import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


class FetchBridgeTest(unittest.TestCase):
    def test_import_fetch_bridge(self):
        from scripts import fetch_bridge  # noqa: F401

        self.assertTrue(fetch_bridge.ROOT_DIR.name == "open-bet-analyze")
        self.assertTrue(fetch_bridge.make_request is not None)


if __name__ == "__main__":
    unittest.main()
