from __future__ import annotations

import os
import re
import sys
import time
from typing import Any

ANSI_RESET = "\033[0m"
ANSI_STYLES = {
    "blue": "\033[34m",
    "cyan": "\033[36m",
    "green": "\033[32m",
    "yellow": "\033[33m",
    "red": "\033[31m",
    "magenta": "\033[35m",
    "dim": "\033[2m",
    "bold": "\033[1m",
}


def stream_supports_color(stream) -> bool:
    if os.environ.get("NO_COLOR"):
        return False
    if os.environ.get("OPEN_BET_FORCE_COLOR") or os.environ.get("FORCE_COLOR"):
        return True
    return bool(getattr(stream, "isatty", lambda: False)())


class OpenBetProgressLogger:
    COMPONENT_WIDTH = 28
    INDENT = " " * 4

    def __init__(self, stream=None) -> None:
        self.stream = stream or sys.stdout
        self.use_color = stream_supports_color(self.stream)
        self.step = 0
        self._starts: dict[str, float] = {}

    def _paint(self, text: str, *styles: str) -> str:
        if not self.use_color:
            return text
        prefix = "".join(ANSI_STYLES.get(s, "") for s in styles)
        return f"{prefix}{text}{ANSI_RESET}" if prefix else text

    def _tag(self, level: str) -> str:
        mapping = {
            "info": ("INFO", "cyan"),
            "ok": (" OK ", "green"),
            "warn": ("WARN", "yellow"),
            "fail": ("FAIL", "red"),
            "skip": ("SKIP", "dim"),
        }
        label, color = mapping.get(level, ("INFO", "cyan"))
        return self._paint(label, color, "bold")

    def _write(self, line: str = "") -> None:
        self.stream.write(line + "\n")
        self.stream.flush()

    def banner(self, title: str, subtitle: str = "") -> None:
        line = "=" * 60
        self._write(self._paint(line, "cyan"))
        self._write(self._paint(f"  {title}", "bold", "cyan"))
        if subtitle:
            self._write(self._paint(f"  {subtitle}", "dim"))
        self._write(self._paint(line, "cyan"))

    def section(self, title: str) -> None:
        self._write("")
        self._write(self._paint(f"▶ {title}", "blue", "bold"))

    def info(self, message: str) -> None:
        self._write(f"{self._tag('info')} {message}")

    def step_start(self, component: str, action: str) -> None:
        self.step += 1
        self._starts[component] = time.perf_counter()
        label = self._paint(component.ljust(self.COMPONENT_WIDTH), "blue", "bold")
        self._write(
            f"{self._paint(f'[{self.step:02d}]', 'dim')} {label} {action} {self._paint('...', 'dim')}"
        )

    def _duration_ms(self, component: str) -> float:
        start = self._starts.pop(component, None)
        if start is None:
            return 0.0
        return round((time.perf_counter() - start) * 1000, 1)

    def metric_done(self, component: str, envelope: Any, *, extra: str = "") -> None:
        ms = self._duration_ms(component)
        status = getattr(envelope, "status", "ok")
        filled = envelope.is_filled() if hasattr(envelope, "is_filled") else bool(getattr(envelope, "value", None))
        source = getattr(envelope, "source", "") or "—"
        confidence = getattr(envelope, "confidence", 0)
        errors = getattr(envelope, "errors", []) or []

        if status == "blocked" or not filled:
            level = "fail"
        elif status == "ok" and getattr(envelope, "stale", False):
            level = "warn"
        else:
            level = "ok"

        label = self._paint(component.ljust(self.COMPONENT_WIDTH), "blue", "bold")
        detail_parts = [f"source={source}", f"conf={confidence:.2f}", f"{ms:.0f}ms"]
        if extra:
            detail_parts.append(extra)
        if errors:
            detail_parts.append(f"err={errors[0][:80]}")
        detail = self._paint(" | ".join(detail_parts), "dim")
        self._write(f"{self.INDENT}{label} {self._tag(level)} {detail}")

    def metric_fail(self, component: str, error: Exception) -> None:
        ms = self._duration_ms(component)
        label = self._paint(component.ljust(self.COMPONENT_WIDTH), "blue", "bold")
        msg = str(error)[:120]
        self._write(
            f"{self.INDENT}{label} {self._tag('fail')} {self._paint('FAIL', 'red', 'bold')} "
            f"{self._paint(f'{ms:.0f}ms | {msg}', 'red')}"
        )

    def result_block(self, title: str, lines: list[tuple[str, str, str]]) -> None:
        """lines: (label, status_text, level) level in ok|warn|fail|info"""
        self._write("")
        self._write(self._paint(f"━━ {title} ━━", "magenta", "bold"))
        for label, status_text, level in lines:
            color = {"ok": "green", "warn": "yellow", "fail": "red", "info": "cyan"}.get(level, "cyan")
            self._write(
                f"  {self._paint(label.ljust(22), 'bold')} "
                f"{self._tag(level)} {self._paint(status_text, color, 'bold')}"
            )

    def final_outcome(self, success: bool, message: str) -> None:
        self._write("")
        if success:
            self._write(self._paint("╔══════════════════════════════════════╗", "green"))
            self._write(self._paint(f"║  SUCCESS  {message[:28].ljust(28)} ║", "green", "bold"))
            self._write(self._paint("╚══════════════════════════════════════╝", "green"))
        else:
            self._write(self._paint("╔══════════════════════════════════════╗", "red"))
            self._write(self._paint(f"║  FAILED   {message[:28].ljust(28)} ║", "red", "bold"))
            self._write(self._paint("╚══════════════════════════════════════╝", "red"))
