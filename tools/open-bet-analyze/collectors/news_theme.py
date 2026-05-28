from __future__ import annotations

import json
import math
import re
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from urllib.error import URLError

from collectors._stale_fallback import load_recent_metric_snapshot
from router.quality import MetricEnvelope
from scripts.fetch_bridge import ROOT_DIR, fetch_text, normalize_request_error

KST = timezone(timedelta(hours=9))
NEWS_URL = "https://finance.naver.com/news/news_list.naver?mode=LSS2D&section_id=101&section_id2=258"


def _load_keyword_dict() -> list[str]:
    path = ROOT_DIR / "config" / "keyword_dict.yaml"
    if not path.exists():
        return ["AI", "반도체", "HBM", "방산", "로봇", "2차전지", "바이오", "원전", "전력", "자율주행"]
    words: list[str] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("- "):
            words.append(line[2:].strip().strip('"').strip("'"))
    return words or ["AI", "반도체"]


def _load_theme_map() -> dict[str, list[str]]:
    path = ROOT_DIR / "config" / "theme_map.yaml"
    mapping: dict[str, list[str]] = defaultdict(list)
    if not path.exists():
        mapping["AI반도체"] = ["000660", "005930"]
        return dict(mapping)
    current: str | None = None
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped.endswith(":") and not stripped.startswith("-"):
            current = stripped[:-1].strip()
            continue
        if stripped.startswith("- ") and current:
            code = re.sub(r"\D", "", stripped[2:])
            if len(code) == 6:
                mapping[current].append(code)
    return dict(mapping)


def _extract_headlines(html: str) -> list[str]:
    titles = re.findall(r'class="tit"[^>]*>([^<]+)<', html)
    if not titles:
        titles = re.findall(r"<title>([^<]+)</title>", html)
    return [re.sub(r"\s+", " ", t).strip() for t in titles if t.strip()]


def _mention_counts(headlines: list[str], keywords: list[str]) -> Counter[str]:
    counts: Counter[str] = Counter()
    blob = " ".join(headlines)
    for keyword in keywords:
        pattern = re.compile(re.escape(keyword), re.IGNORECASE)
        hits = len(pattern.findall(blob))
        if hits:
            counts[keyword] += hits
    return counts


def collect_news_theme(*, trade_date: str = "", save_raw: bool = True) -> MetricEnvelope:
    keywords = _load_keyword_dict()
    theme_map = _load_theme_map()
    try:
        html = fetch_text(NEWS_URL, timeout=15)
        headlines = _extract_headlines(html)
        counts = _mention_counts(headlines, keywords)

        themes: list[dict[str, Any]] = []
        for keyword, count in counts.most_common(20):
            baseline = max(1.0, count * 0.35)
            novelty = math.log1p(count) / baseline
            if count < 3 or novelty < 1.8:
                continue
            stocks = theme_map.get(keyword, [])
            themes.append(
                {
                    "id": re.sub(r"\W+", "_", keyword).lower(),
                    "label": keyword,
                    "mentionCount": count,
                    "novelty": round(novelty, 2),
                    "stocks": stocks,
                    "isNewTheme": novelty >= 2.5 and count >= 5,
                }
            )

        value = {
            "headlineCount": len(headlines),
            "themes": themes,
            "headlines": headlines[:30],
        }
        if save_raw and trade_date:
            raw_dir = ROOT_DIR / "store" / "raw" / trade_date
            raw_dir.mkdir(parents=True, exist_ok=True)
            (raw_dir / "news_headlines.json").write_text(
                json.dumps(value, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
        return MetricEnvelope(
            metric="news_headlines",
            value=value,
            source="naver_news",
            confidence=0.7 if headlines else 0.3,
        )
    except (URLError, OSError, TimeoutError) as error:
        snapshot = load_recent_metric_snapshot(ROOT_DIR, ["news_headlines"])
        if snapshot:
            payload = snapshot["payload"]
            value = payload.get("value")
            if isinstance(value, dict):
                return MetricEnvelope(
                    metric="news_headlines",
                    value=value,
                    source="raw_snapshot",
                    confidence=0.55,
                    stale=True,
                    errors=[f"{normalize_request_error(error)} — snapshot {snapshot['tradeDate']} fallback"],
                )
        return MetricEnvelope(
            metric="news_headlines",
            status="blocked",
            confidence=0.0,
            errors=[normalize_request_error(error)],
        )
