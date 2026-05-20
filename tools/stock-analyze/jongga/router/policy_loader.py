from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def load_policies(path: str | Path) -> dict[str, Any]:
    text = Path(path).read_text(encoding="utf-8")
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        try:
            import yaml
        except Exception as error:
            raise RuntimeError("policies.yaml must be JSON-compatible or PyYAML must be installed") from error
        return yaml.safe_load(text)

