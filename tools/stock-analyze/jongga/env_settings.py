from __future__ import annotations

import os
from pathlib import Path


_DEFAULT_ENV_PATH = Path(__file__).resolve().parents[3] / ".env"
_ENV_LOADED = False


def _strip_inline_comment(value: str) -> str:
    quote: str | None = None
    for index, char in enumerate(value):
        if char in {"'", '"'}:
            if quote == char:
                quote = None
            elif quote is None:
                quote = char
        elif char == "#" and quote is None:
            return value[:index].rstrip()
    return value.strip()


def _parse_env_value(value: str) -> str:
    trimmed = _strip_inline_comment(value.strip())
    if len(trimmed) >= 2 and trimmed[0] == trimmed[-1] and trimmed[0] in {"'", '"'}:
        return trimmed[1:-1]
    return trimmed


def load_local_env(*, env_path: Path | None = None) -> Path | None:
    global _ENV_LOADED

    target = (env_path or _DEFAULT_ENV_PATH).resolve()
    if _ENV_LOADED and target == _DEFAULT_ENV_PATH.resolve():
        return target if target.exists() else None
    if not target.exists():
        return None

    for raw_line in target.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("export "):
            line = line[7:].strip()
        if "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        if not key:
            continue
        os.environ.setdefault(key, _parse_env_value(value))

    if target == _DEFAULT_ENV_PATH.resolve():
        _ENV_LOADED = True
    return target
