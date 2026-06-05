"""과거 추천의 실제 다음 거래일 OHLC로 단계별 적중 결과를 추적·집계합니다.

매수는 당일(D) 종가 기준이고, 매매 단계(프리마켓/장초반/장중/손절)는 다음 거래일(D+1)에
매도하는 구조다. 이 모듈은 D+1 일봉 OHLC를 가져와 각 단계 목표가 도달 여부와 손절 여부를
계산하고, (전략·레짐·VKOSPI·갭·단계)별 적중률 롤업을 만든다.

한계(정직한 명시): 일봉 H/L만 사용하므로 같은 날 손절·목표가 선후는 알 수 없다. 둘 다
발생한 레코드는 outcomeStatus="stop_first_ambiguous"로 표기하고 평균 실현수익 집계에서 제외한다.
단계 hitRate는 "다음날 고가가 그 가격대에 도달했는가"(타이밍 아님)를 의미한다.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from datetime import date, timedelta
from pathlib import Path
from typing import Any

from jongga.generate_latest import fetch_naver_price_history, regime_bucket
from jongga.output_contract import (
    VARIANT_CANARY,
    VARIANT_STABLE,
    build_daily_output_paths,
    compact_date,
    iter_buy_entries,
    normalize_variant,
    read_history_index,
    read_js_assignment,
    resolve_analysis_date,
)

OUTCOMES_INDEX_MARKER = "JONGGA_OUTCOMES_INDEX"
OUTCOMES_ROLLUP_MARKER = "JONGGA_OUTCOMES_ROLLUP"

# 스테이지 라벨 키워드 → stageKey (build_trade_plan / parseTradePlanTargets와 동일 매핑)
STAGE_KEY_BY_KEYWORD: tuple[tuple[str, str], ...] = (
    ("프리마켓", "premarket"),
    ("장초반", "openPhase"),
    ("장중 1차", "intraday1"),
    ("장중 2차", "intraday2"),
    ("스윙", "swing"),
)

# 낮은→높은 사다리 순서 (bestStageHit 판정용)
STAGE_LADDER: tuple[str, ...] = ("premarket", "openPhase", "intraday1", "intraday2", "swing")


# --- 저장소 입출력 ---


def render_outcomes_js(index: list[dict[str, Any]], rollup: dict[str, Any]) -> str:
    return (
        f"window.{OUTCOMES_INDEX_MARKER} = {json.dumps(index, ensure_ascii=False, indent=2)};\n"
        f"window.{OUTCOMES_ROLLUP_MARKER} = {json.dumps(rollup, ensure_ascii=False, indent=2)};\n"
    )


def read_outcomes_index(path: str | Path) -> list[dict[str, Any]]:
    value = read_js_assignment(path, OUTCOMES_INDEX_MARKER)
    return value if isinstance(value, list) else []


def read_outcomes_rollup(path: str | Path) -> dict[str, Any]:
    value = read_js_assignment(path, OUTCOMES_ROLLUP_MARKER)
    return value if isinstance(value, dict) else {}


def outcome_key(record: dict[str, Any]) -> tuple[str, str, str, str]:
    return (
        str(record.get("date") or ""),
        normalize_variant(str(record.get("variant") or "")),
        str(record.get("strategy") or ""),
        str(record.get("code") or ""),
    )


def update_outcomes_index(existing: list[dict[str, Any]], record: dict[str, Any]) -> list[dict[str, Any]]:
    key = outcome_key(record)
    merged = [item for item in existing if outcome_key(item) != key]
    merged.append(record)
    merged.sort(key=lambda item: (str(item.get("date") or ""), str(item.get("strategy") or ""), str(item.get("code") or "")), reverse=True)
    return merged


# --- 파싱 헬퍼 ---


def stage_key_from_row(row: dict[str, Any]) -> str:
    stage = str(row.get("stage") or "")
    for keyword, key in STAGE_KEY_BY_KEYWORD:
        if keyword in stage:
            return key
    return ""


def _parse_price(text: Any) -> float:
    digits = re.sub(r"[^\d.]", "", str(text or ""))
    try:
        return float(digits) if digits else 0.0
    except ValueError:
        return 0.0


def _parse_rate(text: Any) -> float:
    match = re.search(r"[-+]?\d+(?:\.\d+)?", str(text or ""))
    return float(match.group()) if match else 0.0


def _parse_qty(text: Any) -> int:
    match = re.match(r"\s*(\d+)", str(text or ""))
    return int(match.group(1)) if match else 0


# --- 다음 거래일 OHLC 조회 ---


def next_trading_day_ohlc(entry_date: str, rows: list[dict[str, str]]) -> tuple[str, str | None, dict[str, float] | None]:
    """(status, nextTradingDate, ohlc)를 반환.

    rows는 fetch_naver_price_history 결과(최신순). entry_date(ISO 또는 YYYYMMDD)가 rows에 있고
    그보다 더 최신 행(index-1)이 있으면 resolved. entry_date가 가장 최신 행이면 다음날 미경과 → pending.
    entry_date를 못 찾으면 no_data.
    """
    target = compact_date(entry_date) if "-" in str(entry_date) else str(entry_date)[:8]
    for i, row in enumerate(rows):
        if str(row.get("localTradedAt") or "")[:8] == target:
            if i == 0:
                return "pending", None, None
            nxt = rows[i - 1]
            ohlc = {
                "open": _parse_price(nxt.get("openPrice")),
                "high": _parse_price(nxt.get("highPrice")),
                "low": _parse_price(nxt.get("lowPrice")),
                "close": _parse_price(nxt.get("closePrice")),
            }
            return "resolved", str(nxt.get("localTradedAt") or "")[:8], ohlc
    return "no_data", None, None


# --- outcome 계산 ---


def compute_outcome(
    identity: dict[str, Any],
    trade_plan_rows: list[dict[str, Any]],
    entry_price: float,
    next_trading_date: str,
    ohlc: dict[str, float],
) -> dict[str, Any]:
    high = float(ohlc.get("high") or 0)
    low = float(ohlc.get("low") or 0)
    close = float(ohlc.get("close") or 0)

    stages: list[dict[str, Any]] = []
    stop_price = 0.0
    stop_rate = 0.0
    for row in trade_plan_rows:
        if "손절" in str(row.get("stage") or ""):
            stop_price = _parse_price(row.get("targetPrice"))
            stop_rate = _parse_rate(row.get("targetYield"))
            continue
        stage_key = stage_key_from_row(row)
        if not stage_key:
            continue
        target_price = _parse_price(row.get("targetPrice"))
        stages.append({
            "stageKey": stage_key,
            "targetPrice": target_price,
            "targetRate": _parse_rate(row.get("targetYield")),
            "qty": _parse_qty(row.get("quantity")),
            "hit": bool(high > 0 and target_price > 0 and high >= target_price),
        })

    stop_hit = bool(low > 0 and stop_price > 0 and low <= stop_price)
    hit_stages = [s for s in stages if s["hit"]]
    best_stage_hit = None
    for stage_key in reversed(STAGE_LADDER):
        if any(s["stageKey"] == stage_key and s["hit"] for s in stages):
            best_stage_hit = stage_key
            break

    close_rate = ((close / entry_price - 1) * 100) if entry_price else 0.0
    if stop_hit and best_stage_hit is None:
        realized = stop_rate / 100.0
        status = "resolved"
    else:
        filled = sum(s["qty"] for s in hit_stages)
        remainder = max(0, 100 - filled)
        realized = (sum(s["targetRate"] * s["qty"] for s in hit_stages) + close_rate * remainder) / 100.0 / 100.0
        status = "stop_first_ambiguous" if (stop_hit and hit_stages) else "resolved"

    # 단계별 실현수익 계산 (#1/#2 개선 - net EV 추천에 사용)
    # "이 단계까지만 익절한다면 실현수익이 얼마였나?" — 단계별 독립 수익 추정.
    # 도달 단계: targetRate * qty + 나머지(=미도달량) × 종가청산.
    # 미도달(손절): stopRate(손절 발생 시) 또는 종가.
    # stop_first_ambiguous 여부와 무관하게 단계별로 계산한다(하방 포함이 목적).
    for s in stages:
        if not s["hit"]:
            # 이 단계에 도달하지 못함 → 이전 도달 단계의 익절 + 잔량 종가(또는 손절)
            prev_hit = [h for h in hit_stages if STAGE_LADDER.index(h["stageKey"]) < STAGE_LADDER.index(s["stageKey"])]
            prev_filled = sum(h["qty"] for h in prev_hit)
            remainder_qty = max(0, 100 - prev_filled)
            exit_rate = stop_rate if (stop_hit and best_stage_hit is None) else close_rate
            stage_ret = (
                sum(h["targetRate"] * h["qty"] for h in prev_hit)
                + exit_rate * remainder_qty
            ) / 100.0 / 100.0
            s["stageRealizedReturn"] = round(stage_ret, 5)
        else:
            # 이 단계까지 익절 → 이 단계 이하 모든 도달 단계 익절 + 나머지 종가
            up_to = [h for h in hit_stages if STAGE_LADDER.index(h["stageKey"]) <= STAGE_LADDER.index(s["stageKey"])]
            filled_here = sum(h["qty"] for h in up_to)
            remainder_qty = max(0, 100 - filled_here)
            stage_ret = (
                sum(h["targetRate"] * h["qty"] for h in up_to)
                + close_rate * remainder_qty
            ) / 100.0 / 100.0
            s["stageRealizedReturn"] = round(stage_ret, 5)

    return {
        **identity,
        "entryPrice": entry_price,
        "nextTradingDate": next_trading_date,
        "nextDayOHLC": {k: float(ohlc.get(k) or 0) for k in ("open", "high", "low", "close")},
        "stages": stages,
        "stopPrice": stop_price,
        "stopRate": stop_rate,
        "stopHit": stop_hit,
        "bestStageHit": best_stage_hit,
        "realizedReturnProxy": round(realized, 5),
        "outcomeStatus": status,
    }


# --- 컨텍스트 차원 추출 ---


def extract_context_dims(payload: dict[str, Any]) -> dict[str, Any]:
    slots = payload.get("slots") or []
    slot = slots[0] if slots else {}
    regime = slot.get("regime") if isinstance(slot.get("regime"), dict) else {}
    overlay = regime.get("macroOverlay") if isinstance(regime.get("macroOverlay"), dict) else {}
    gap = slot.get("gapScore") if isinstance(slot.get("gapScore"), dict) else {}
    regime_label = str(overlay.get("effectiveRegimeLabel") or regime.get("effectiveRegimeLabel") or "")
    return {
        "regimeBucket": regime_bucket(regime_label),
        "vkospiTier": str(overlay.get("kospiBullTier") or "unknown"),
        "gapGrade": str(gap.get("code") or ""),
    }


def load_daily_payload(out_dir: str | Path, date_str: str, variant: str) -> dict[str, Any] | None:
    try:
        analysis_date = date.fromisoformat(date_str)
    except ValueError:
        return None
    json_path, _ = build_daily_output_paths(out_dir, analysis_date, variant=normalize_variant(variant))
    if not json_path.exists():
        return None
    try:
        return json.loads(json_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return None


# --- 롤업 집계 ---


def build_rollup(index: list[dict[str, Any]]) -> dict[str, Any]:
    """단계별 hitRate + avgStageReturn(단계 독립 실현수익) 집계.

    avgStageReturn: "이 단계까지 익절한다면 과거 평균 실현수익이 얼마였나?"
    compute_outcome에서 stages[n]["stageRealizedReturn"]으로 단계별 독립 수익을
    기록하므로, 이를 집계해 EV 추천의 하방 포함 신호로 활용한다.
    (기존 avgRealizedReturn은 레코드 전체 실현수익으로 단계 구분 없음 → 유지하되
    단계별 신호는 avgStageReturn을 사용한다.)
    """
    by_cell: dict[str, dict[str, float]] = {}
    by_strategy_stage: dict[str, dict[str, float]] = {}

    def accumulate(
        bucket: dict[str, dict[str, float]],
        key: str,
        hit: bool,
        realized: float | None,
        stage_ret: float | None,
    ) -> None:
        cell = bucket.setdefault(key, {"hit": 0, "samples": 0, "retSum": 0.0, "retCount": 0,
                                       "stageRetSum": 0.0, "stageRetCount": 0})
        cell["samples"] += 1
        if hit:
            cell["hit"] += 1
        if realized is not None:
            cell["retSum"] += realized
            cell["retCount"] += 1
        if stage_ret is not None:
            cell["stageRetSum"] += stage_ret
            cell["stageRetCount"] += 1

    for record in index:
        status = str(record.get("outcomeStatus") or "")
        if status not in ("resolved", "stop_first_ambiguous"):
            continue  # no_data / pending 제외
        strategy = str(record.get("strategy") or "")
        regime = str(record.get("regimeBucket") or "")
        vk = str(record.get("vkospiTier") or "")
        gap = str(record.get("gapGrade") or "")
        realized = record.get("realizedReturnProxy")
        realized = None if status == "stop_first_ambiguous" else (float(realized) if realized is not None else None)
        for stage in record.get("stages") or []:
            stage_key = str(stage.get("stageKey") or "")
            if not stage_key:
                continue
            hit = bool(stage.get("hit"))
            # 단계별 실현수익 — 신규 필드 없으면 None(하위 호환)
            sr = stage.get("stageRealizedReturn")
            stage_ret = float(sr) if sr is not None else None
            accumulate(by_cell, f"{strategy}|{regime}|{vk}|{gap}|{stage_key}", hit, realized, stage_ret)
            accumulate(by_strategy_stage, f"{strategy}|{stage_key}", hit, realized, stage_ret)

    def finalize(bucket: dict[str, dict[str, float]]) -> dict[str, Any]:
        out: dict[str, Any] = {}
        for key, cell in bucket.items():
            samples = int(cell["samples"])
            out[key] = {
                "hitRate": round(cell["hit"] / samples, 4) if samples else 0.0,
                "sampleCount": samples,
                "avgRealizedReturn": round(cell["retSum"] / cell["retCount"], 5) if cell["retCount"] else None,
                "avgStageReturn": round(cell["stageRetSum"] / cell["stageRetCount"], 5) if cell["stageRetCount"] else None,
            }
        return out

    return {
        "byCell": finalize(by_cell),
        "byStrategyStage": finalize(by_strategy_stage),
    }


# --- 백필 드라이버 ---


def backfill(
    *,
    history_js: str | Path,
    outcomes_js: str | Path,
    out_dir: str | Path,
    lookback_days: int = 30,
    variant_filter: str = "all",
    today: date | None = None,
    max_fetches: int = 200,
    sleep_seconds: float = 0.2,
    log=print,
) -> dict[str, Any]:
    today = today or resolve_analysis_date(None)
    cutoff = today - timedelta(days=max(1, lookback_days))
    history = read_history_index(history_js)
    index = read_outcomes_index(outcomes_js)
    existing_keys = {outcome_key(item) for item in index}

    # 오래된 순으로 처리 → 부분 실행이 누적되도록
    history_sorted = sorted(history, key=lambda item: str(item.get("date") or ""))

    price_cache: dict[str, list[dict[str, str]]] = {}
    fetch_count = 0
    summary = {"resolved": 0, "ambiguous": 0, "no_data": 0, "pending": 0, "skipped_existing": 0, "skipped_no_payload": 0}

    for hist in history_sorted:
        date_str = str(hist.get("date") or "")
        variant = normalize_variant(str(hist.get("variant") or ""))
        if variant_filter != "all" and variant != normalize_variant(variant_filter):
            continue
        try:
            entry_date = date.fromisoformat(date_str)
        except ValueError:
            continue
        if entry_date < cutoff:
            continue
        payload = load_daily_payload(out_dir, date_str, variant)
        if payload is None:
            summary["skipped_no_payload"] += 1
            continue
        dims = extract_context_dims(payload)

        for strategy, entry in iter_buy_entries(payload):
            code = str(entry.get("code") or "")
            if not code:
                continue
            key = (date_str, variant, strategy, code)
            if key in existing_keys:
                summary["skipped_existing"] += 1
                continue
            trade_plan_rows = entry.get("tradePlanRows") or []
            if not trade_plan_rows:
                continue
            entry_price = float(entry.get("entryPrice") or entry.get("currentPrice") or 0)
            if entry_price <= 0:
                continue

            identity = {
                "date": date_str,
                "variant": variant,
                "strategy": strategy,
                "code": code,
                "name": str(entry.get("name") or ""),
                **dims,
            }

            rows = price_cache.get(code)
            if rows is None:
                if fetch_count >= max_fetches:
                    log(f"[outcome] max-fetches({max_fetches}) 도달 — 이후 신규 코드 조회 중단")
                    continue
                try:
                    rows = fetch_naver_price_history(code, count=max(20, lookback_days + 10))
                except Exception as exc:  # noqa: BLE001 — 네트워크 실패는 비치명적
                    log(f"[outcome] {code} 시세 조회 실패: {exc}")
                    rows = []
                price_cache[code] = rows
                fetch_count += 1
                if sleep_seconds:
                    time.sleep(sleep_seconds)

            status, next_date, ohlc = next_trading_day_ohlc(date_str, rows)
            if status == "pending":
                summary["pending"] += 1
                continue
            if status == "no_data" or ohlc is None:
                record = {**identity, "entryPrice": entry_price, "outcomeStatus": "no_data"}
                summary["no_data"] += 1
            else:
                record = compute_outcome(identity, trade_plan_rows, entry_price, next_date, ohlc)
                if record["outcomeStatus"] == "stop_first_ambiguous":
                    summary["ambiguous"] += 1
                else:
                    summary["resolved"] += 1
            index = update_outcomes_index(index, record)
            existing_keys.add(key)

    rollup = build_rollup(index)
    outcomes_path = Path(outcomes_js)
    outcomes_path.parent.mkdir(parents=True, exist_ok=True)
    outcomes_path.write_text(render_outcomes_js(index, rollup), encoding="utf-8")
    summary["total_records"] = len(index)
    summary["fetches"] = fetch_count
    log(
        f"[outcome] 완료 — resolved {summary['resolved']}, ambiguous {summary['ambiguous']}, "
        f"no_data {summary['no_data']}, pending {summary['pending']}, 총 {summary['total_records']}건, 페치 {fetch_count}"
    )
    return summary


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="종가 베팅 추천의 실제 적중 결과 백필·집계")
    parser.add_argument("--history-js", default="jongga/output/jongga_history.js")
    parser.add_argument("--outcomes-js", default="jongga/output/jongga_outcomes.js")
    parser.add_argument("--out-dir", default="jongga/output")
    parser.add_argument("--lookback-days", type=int, default=30)
    parser.add_argument("--variant", default="all", choices=["all", VARIANT_STABLE, VARIANT_CANARY])
    parser.add_argument("--max-fetches", type=int, default=200)
    parser.add_argument("--date", default=None, help="기준일(오늘) override, ISO YYYY-MM-DD")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    today = resolve_analysis_date(args.date)
    backfill(
        history_js=args.history_js,
        outcomes_js=args.outcomes_js,
        out_dir=args.out_dir,
        lookback_days=args.lookback_days,
        variant_filter=args.variant,
        today=today,
        max_fetches=args.max_fetches,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
