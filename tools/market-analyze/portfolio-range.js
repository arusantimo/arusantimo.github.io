function clampPortfolioPercent(value) {
    const safeValue = Number.isFinite(value) ? value : 0;
    return Math.min(100, Math.max(0, safeValue));
}

function buildPortfolioBand(center, tolerance, palette) {
    const safeCenter = clampPortfolioPercent(center);
    const start = clampPortfolioPercent(safeCenter - tolerance);
    const end = clampPortfolioPercent(safeCenter + tolerance);
    const markerStart = Math.max(start, clampPortfolioPercent(safeCenter - 0.8));
    const markerEnd = Math.min(end, clampPortfolioPercent(safeCenter + 0.8));

    return {
        ...palette,
        center: safeCenter,
        start,
        end,
        markerStart,
        markerEnd
    };
}

function getPortfolioTargetBand(key, field, targets) {
    if (!targets) return null;

    if ((key === "isa" || key === "pension") && field === "aggressiveRatio") {
        return buildPortfolioBand(targets.aggressiveTarget, 10, {
            accent: "#fb7185",
            band: "rgba(251, 113, 133, 0.40)",
            marker: "#ffe4e6"
        });
    }

    if (key === "genLong" && field === "cashRatio") {
        return buildPortfolioBand(targets.cashTarget, 10, {
            accent: "#34d399",
            band: "rgba(52, 211, 153, 0.38)",
            marker: "#d1fae5"
        });
    }

    if (key === "genLong" && field === "aggressiveRatio") {
        return buildPortfolioBand(targets.aggressiveTarget, 10, {
            accent: "#fb7185",
            band: "rgba(251, 113, 133, 0.40)",
            marker: "#ffe4e6"
        });
    }

    if (key === "quant" && field === "cashRatio") {
        return buildPortfolioBand(targets.cashTarget, 5, {
            accent: "#f59e0b",
            band: "rgba(245, 158, 11, 0.40)",
            marker: "#fef3c7"
        });
    }

    return null;
}

function clearPortfolioTargetBand(input) {
    input.style.background = "";
    input.style.removeProperty("--portfolio-thumb-ring");
    input.style.removeProperty("--portfolio-thumb-glow");
    input.classList.remove("is-target-hit");
    input.removeAttribute("title");
}

function paintPortfolioTargetBand(input, band) {
    const currentValue = clampPortfolioPercent(parseFloat(input.value));

    input.style.setProperty("--portfolio-thumb-ring", band.accent);
    input.style.setProperty("--portfolio-thumb-glow", band.band);
    input.style.background = `linear-gradient(to right,
        rgba(51, 65, 85, 0.92) 0%,
        rgba(51, 65, 85, 0.92) ${band.start}%,
        ${band.band} ${band.start}%,
        ${band.band} ${band.markerStart}%,
        ${band.marker} ${band.markerStart}%,
        ${band.marker} ${band.markerEnd}%,
        ${band.band} ${band.markerEnd}%,
        ${band.band} ${band.end}%,
        rgba(51, 65, 85, 0.92) ${band.end}%,
        rgba(51, 65, 85, 0.92) 100%)`;
    input.classList.toggle("is-target-hit", currentValue >= band.start && currentValue <= band.end);
    input.title = `권장 범위 ${Math.round(band.start)}~${Math.round(band.end)}% · 중심 ${Math.round(band.center)}%`;
}

function updatePortfolioTargetBands(targets) {
    document.querySelectorAll(".portfolio-input").forEach(input => {
        const key = input.getAttribute("data-key");
        const field = input.getAttribute("data-field") || "cashRatio";
        const band = getPortfolioTargetBand(key, field, targets);

        if (!band) {
            clearPortfolioTargetBand(input);
            return;
        }

        paintPortfolioTargetBand(input, band);
    });
}
