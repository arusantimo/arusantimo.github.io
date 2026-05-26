from __future__ import annotations

import re
from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_POLICIES_PATH = ROOT_DIR / "config" / "policies.yaml"


def load_policies(path: Path | None = None) -> dict[str, Any]:
    target = path or DEFAULT_POLICIES_PATH
    raw = target.read_text(encoding="utf-8")
    try:
        import yaml  # type: ignore

        payload = yaml.safe_load(raw)
        if isinstance(payload, dict):
            metrics = payload.get("metrics") or {}
            return {"metrics": metrics if isinstance(metrics, dict) else {}}
    except Exception:
        pass
    return _parse_metrics_yaml(raw)


def _parse_metrics_yaml(raw: str) -> dict[str, Any]:
    metrics: dict[str, Any] = {}
    current: str | None = None
    for line in raw.splitlines():
        if not line.strip() or line.strip().startswith("#"):
            continue
        metric_match = re.match(r"^\s{2}([a-z0-9_]+):\s*$", line)
        if metric_match:
            current = metric_match.group(1)
            metrics[current] = {"required": False, "routes": []}
            continue
        if current and re.search(r"required:\s*true", line):
            metrics[current]["required"] = True
        if current and re.search(r"required:\s*false", line):
            metrics[current]["required"] = False
    return {"metrics": metrics}


def required_metrics(policies: dict[str, Any]) -> list[str]:
    metrics = policies.get("metrics") or {}
    return [name for name, spec in metrics.items() if isinstance(spec, dict) and spec.get("required")]
