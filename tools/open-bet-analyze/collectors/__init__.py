"""Collectors package — import submodules directly to avoid circular eager loads."""

__all__ = [
    "collect_eod_signals",
    "collect_overtime_board",
    "collect_global_macro",
    "collect_news_theme",
    "enrich_premarket_open",
    "collect_foreign_inst_flow_batch",
]


def __getattr__(name: str):
    if name == "collect_eod_signals":
        from collectors.prior_day_bridge import collect_eod_signals

        return collect_eod_signals
    if name == "collect_overtime_board":
        from collectors.overtime_single import collect_overtime_board

        return collect_overtime_board
    if name == "collect_global_macro":
        from collectors.global_macro import collect_global_macro

        return collect_global_macro
    if name == "collect_news_theme":
        from collectors.news_theme import collect_news_theme

        return collect_news_theme
    if name == "enrich_premarket_open":
        from collectors.premarket_open import enrich_premarket_open

        return enrich_premarket_open
    if name == "collect_foreign_inst_flow_batch":
        from collectors.flow_supply import collect_foreign_inst_flow_batch

        return collect_foreign_inst_flow_batch
    raise AttributeError(name)
