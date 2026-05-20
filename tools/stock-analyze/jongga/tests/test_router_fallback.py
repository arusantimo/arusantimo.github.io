import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from jongga.collectors.base import BaseCollector, CollectResult, CollectionRequest, CollectorError
from jongga.router.audit import AuditRecorder
from jongga.router.cache import FileCache
from jongga.router.manual import ManualOverrideStore
from jongga.router.policy_loader import load_policies
from jongga.router.router import CircuitBreaker, DataRouter


class FailingCollector(BaseCollector):
    provider = "failing"

    def collect(self, request: CollectionRequest) -> CollectResult:
        raise CollectorError("primary down")


class SuccessfulCollector(BaseCollector):
    def __init__(self, provider="secondary", confidence=0.9, value=123):
        self.provider = provider
        self.confidence = confidence
        self.value = value

    def collect(self, request: CollectionRequest) -> CollectResult:
        return CollectResult(
            metric=request.metric,
            key=request.key,
            value=self.value,
            provider=self.provider,
            layer="http_scraper",
            confidence=self.confidence,
        )


class RouterFallbackTest(unittest.TestCase):
    def test_api_failure_falls_back_to_html_scraper(self):
        audit = AuditRecorder()
        router = DataRouter(
            collectors={
                "api": FailingCollector(),
                "html": SuccessfulCollector("html", value=456),
            },
            policies={
                "metrics": {
                    "current_price": {
                        "minConfidence": 0.6,
                        "routes": [{"provider": "api"}, {"provider": "html"}],
                    }
                }
            },
            audit=audit,
            breaker=CircuitBreaker(max_failures=5),
        )

        result = router.collect("current_price", "005930")

        self.assertEqual(result.value, 456)
        self.assertEqual(result.provider, "html")
        self.assertEqual(result.fallback_level, 2)
        self.assertEqual(audit.provider_health()["api"]["failed"], 1)

    def test_low_confidence_uses_cache_as_degraded_result(self):
        with tempfile.TemporaryDirectory() as tmp:
            cache = FileCache(Path(tmp) / "cache")
            cache.put(CollectResult(
                metric="global_gap_metric",
                key="NQ=F",
                value={ "changePct": 0.7 },
                provider="yahoo",
                layer="public_api",
                confidence=0.9,
            ))
            router = DataRouter(
                collectors={"html": SuccessfulCollector("html", confidence=0.2, value=None)},
                policies={
                    "metrics": {
                        "global_gap_metric": {
                            "minConfidence": 0.6,
                            "routes": [{"provider": "html"}],
                            "cache": {"ttlSeconds": 3600, "allowStale": True},
                        }
                    }
                },
                cache=cache,
            )

            result = router.collect("global_gap_metric", "NQ=F")

            self.assertEqual(result.provider, "cache")
            self.assertEqual(result.value, {"changePct": 0.7})
            self.assertLessEqual(result.confidence, 0.75)

    def test_manual_override_is_last_resort(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "manual"
            root.mkdir()
            (root / "toss_execution_strength__005930.json").write_text(
                json.dumps({"value": 111.2, "confidence": 0.95, "reason": "manual toss check"}),
                encoding="utf-8",
            )
            router = DataRouter(
                collectors={"api": FailingCollector()},
                policies={
                    "metrics": {
                        "toss_execution_strength": {
                            "minConfidence": 0.8,
                            "routes": [{"provider": "api"}],
                        }
                    }
                },
                overrides=ManualOverrideStore(root),
            )

            result = router.collect("toss_execution_strength", "005930")

            self.assertEqual(result.provider, "manual_override")
            self.assertEqual(result.value, 111.2)
            self.assertEqual(result.audit["reason"], "manual toss check")

    def test_policy_file_is_loadable(self):
        policy_path = ROOT / "jongga" / "router" / "policies.yaml"
        payload = load_policies(policy_path)

        self.assertIn("current_price", payload["metrics"])
        self.assertEqual(payload["metrics"]["current_price"]["routes"][0]["provider"], "kis")


if __name__ == "__main__":
    unittest.main()

