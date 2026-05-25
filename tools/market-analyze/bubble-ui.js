const BUBBLE_FLAG_TABS = {
    marginDebt: { shortLabel: "신용매수", title: "신용매수 과열", threshold: "미국/국내 trough 대비 +100% 이상" },
    ipo: { shortLabel: "IPO", title: "공모주 광풍", threshold: "평균 초과수익률 +100% · 적자 IPO 60%+ · IPO ETF 상대강도 가속" },
    trash: { shortLabel: "적자 혁신주", title: "적자 혁신주 투기", threshold: "ARKK/QQQ 20일선 대비 120 이상 오버슈트" },
    fed: { shortLabel: "연준 브레이크", title: "연준 브레이크", threshold: "동결 후 재인상 5회 이상 + 추가 인상 확률" }
};

function getBubbleSignalStateLabel(state) {
    if (state === "critical") return "Critical";
    if (state === "warning") return "경고";
    if (state === "watch") return "감시";
    return "중립";
}

function getBubbleSignalBadgeClass(state) {
    if (state === "critical") return "bubble-signal-badge is-critical";
    if (state === "warning") return "bubble-signal-badge is-warning";
    if (state === "watch") return "bubble-signal-badge is-watch";
    return "bubble-signal-badge is-neutral";
}

function formatBubbleDate(raw) {
    const rawText = String(raw || "");
    const normalized = rawText.replace(/\D/g, "");
    if (normalized.length === 6 && rawText.includes("-")) return `${normalized.slice(0, 4)}.${normalized.slice(4, 6)}`;
    if (normalized.length === 6) return `20${normalized.slice(0, 2)}.${normalized.slice(2, 4)}.${normalized.slice(4, 6)}`;
    if (normalized.length === 8) return `${normalized.slice(0, 4)}.${normalized.slice(4, 6)}.${normalized.slice(6, 8)}`;
    if (!raw) return "-";
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return String(raw);
    return parsed.toLocaleString("ko-KR");
}

function formatBubbleNumber(value, digits = 1, suffix = "") {
    if (!Number.isFinite(Number(value))) return "-";
    return `${Number(value).toFixed(digits)}${suffix}`;
}

function formatBubblePercent(value, digits = 1) {
    if (!Number.isFinite(Number(value))) return "-";
    const numeric = Number(value);
    return `${numeric > 0 ? "+" : ""}${numeric.toFixed(digits)}%`;
}

function summarizeBubbleDisplayStatus() {
    return summarizeStatusEntries([
        marketStatus.bubble?.marginDebt,
        marketStatus.bubble?.ipo,
        marketStatus.bubble?.trash,
        marketStatus.bubble?.fed,
        marketStatus.bubble?.critical
    ]);
}

function getBubbleFlagFacts(flagKey, signal) {
    const metrics = signal.metrics || {};
    if (flagKey === "marginDebt") {
        return [
            { label: "미국 trough 대비", value: formatBubblePercent(metrics.usGrowthPct, 0) },
            { label: "국내 trough 대비", value: formatBubblePercent(metrics.krGrowthPct, 0) },
            { label: "최근 기준", value: `${formatBubbleDate(metrics.usLatestMonth)} / ${formatBubbleDate(metrics.krLatestDate)}` }
        ];
    }
    if (flagKey === "ipo") {
        const coverageText = Number.isFinite(Number(metrics.profitabilityCoverageCount))
            ? `${metrics.profitabilityCoverageCount}/${metrics.sampleCount || "-"}`
            : "-";
        const lossMakingText = Number.isFinite(Number(metrics.lossMakingRatioPct))
            ? `${formatBubbleNumber(metrics.lossMakingRatioPct, 1, "%")} (${coverageText})`
            : `미확보 (${coverageText})`;
        return [
            { label: "최근 표본 수", value: Number.isFinite(Number(metrics.sampleCount)) ? `${metrics.sampleCount}건 / ${metrics.sampleWindowDays || 90}일` : "-" },
            { label: "평균 초과수익률", value: `${formatBubblePercent(metrics.avgFirstDayExcessReturnPct, 1)}${metrics.returnProxy ? " (proxy)" : ""}` },
            { label: "적자 IPO 비중", value: lossMakingText },
            { label: "IPO ETF 상대강도", value: `${formatBubblePercent(metrics.ipoVsQqq20dOutperformancePct, 1)} / SMA20 ${formatBubbleNumber(metrics.ipoVsQqqRatioVsSma20Pct, 1, "%")}` }
        ];
    }
    if (flagKey === "trash") {
        return [
            { label: "ARKK / QQQ", value: formatBubbleNumber(metrics.arkkQqqRatio, 4) },
            { label: "20일선 대비", value: formatBubbleNumber(metrics.overshootPct, 1, "%") },
            { label: "지속일수", value: Number.isFinite(Number(metrics.durationDays)) ? `${metrics.durationDays}일` : "-" }
        ];
    }
    return [
        { label: "실제 재인상 횟수", value: Number.isFinite(Number(metrics.rehikeCount)) ? `${metrics.rehikeCount}회` : "-" },
        { label: "다음 회의 인상 확률", value: Number.isFinite(Number(metrics.nextHikeProbabilityPct)) ? formatBubblePercent(metrics.nextHikeProbabilityPct, 1) : "미연동" },
        { label: "기준금리 상단", value: formatBubbleNumber(metrics.fedRateTargetUpperBound, 2, "%") }
    ];
}

function renderBubbleSummary() {
    const summaryEl = document.getElementById("bubble-summary-card");
    if (!summaryEl) return;
    const summaryStatus = summarizeBubbleDisplayStatus();
    const triggerClass = marketData.bubbleCriticalTrigger ? "is-critical" : "is-neutral";
    summaryEl.innerHTML = `
        <div class="bubble-summary-top">
            <div>
                <div class="bubble-summary-kicker">Bubble Overlay</div>
                <div class="bubble-summary-title">${escapeHtml(marketData.bubbleRegimeLabel || "표준 버블 경계")}</div>
            </div>
            <span class="${getStatusBadgeClass(summaryStatus.state)}">${getStatusStateLabel(summaryStatus.state)}</span>
        </div>
        <div class="bubble-summary-grid">
            <div class="bubble-summary-metric">
                <div class="bubble-summary-label">Bubble Index</div>
                <div class="bubble-summary-value">${Number.isFinite(marketData.bubbleIndex) ? Math.round(marketData.bubbleIndex) : "-"}</div>
                <div class="bubble-summary-sub">${Number(marketData.bubbleActiveFlagCount || 0)} / 4 active</div>
            </div>
            <div class="bubble-summary-metric ${triggerClass}">
                <div class="bubble-summary-label">Critical Trigger</div>
                <div class="bubble-summary-value">${marketData.bubbleCriticalTrigger ? "ON" : "OFF"}</div>
                <div class="bubble-summary-sub">${escapeHtml(compactStatusMessage(marketData.bubbleCriticalReason, { maxLength: 96, maxClauses: 2, fallback: "-" }))}</div>
            </div>
            <div class="bubble-summary-metric">
                <div class="bubble-summary-label">현재 버블 레짐</div>
                <div class="bubble-summary-value is-text">${escapeHtml(marketData.bubbleRegimeLabel || "표준 버블 경계")}</div>
                <div class="bubble-summary-sub">${escapeHtml(compactStatusMessage(marketData.bubbleRegimeReason, { maxLength: 110, maxClauses: 2, fallback: "-" }))}</div>
            </div>
        </div>
    `;
}

function renderBubbleFlagTabs() {
    const tabBar = document.getElementById("bubble-flag-tab-bar");
    if (!tabBar) return;
    const selectedKey = normalizeBubbleFlagKey(marketData.bubblePanelSelectedKey);
    tabBar.innerHTML = BUBBLE_FLAG_KEYS.map(flagKey => {
        const statusEntry = marketStatus.bubble?.[flagKey] || createStatusEntry();
        const signal = normalizeBubbleSignal(flagKey, marketData.bubbleSignals?.[flagKey]);
        return `
            <button
                type="button"
                class="bubble-flag-tab-btn ${selectedKey === flagKey ? "is-active" : ""}"
                data-bubble-flag="${flagKey}"
                role="tab"
                aria-selected="${selectedKey === flagKey ? "true" : "false"}"
            >
                <span>${BUBBLE_FLAG_TABS[flagKey].shortLabel}</span>
                <span class="${getBubbleSignalBadgeClass(signal.state)}">${getBubbleSignalStateLabel(signal.state)}</span>
                ${statusEntry.state !== "ok" ? `<span class="${getStatusBadgeClass(statusEntry.state)} chip-inline-badge">${getStatusStateLabel(statusEntry.state)}</span>` : ""}
            </button>
        `;
    }).join("");
}

function renderBubbleFlagPanel(flagKey) {
    const panelEl = document.getElementById("bubble-flag-panel");
    if (!panelEl) return;
    const signal = normalizeBubbleSignal(flagKey, marketData.bubbleSignals?.[flagKey]);
    const statusEntry = marketStatus.bubble?.[flagKey] || createStatusEntry();
    const facts = getBubbleFlagFacts(flagKey, signal);
    panelEl.innerHTML = `
        <div class="bubble-flag-card">
            <div class="bubble-flag-head">
                <div>
                    <div class="bubble-summary-kicker">${escapeHtml(BUBBLE_FLAG_TABS[flagKey].title)}</div>
                    <div class="bubble-flag-title">${escapeHtml(signal.label || BUBBLE_FLAG_TABS[flagKey].title)}</div>
                </div>
                <div class="bubble-flag-head-badges">
                    <span class="${getBubbleSignalBadgeClass(signal.state)}">${getBubbleSignalStateLabel(signal.state)}</span>
                    <span class="${getStatusBadgeClass(statusEntry.state)}">${getStatusStateLabel(statusEntry.state)}</span>
                </div>
            </div>
            <div class="bubble-flag-score-grid">
                <div class="bubble-flag-score-box">
                    <div class="bubble-summary-label">점수</div>
                    <div class="bubble-flag-score">${Number.isFinite(signal.score) ? Math.round(signal.score) : "-"}</div>
                </div>
                <div class="bubble-flag-score-box">
                    <div class="bubble-summary-label">Critical 여부</div>
                    <div class="bubble-flag-score is-text">${signal.critical ? "YES" : "NO"}</div>
                </div>
                <div class="bubble-flag-score-box">
                    <div class="bubble-summary-label">최근 갱신</div>
                    <div class="bubble-flag-score is-text">${escapeHtml(formatBubbleDate(signal.updatedAt))}</div>
                </div>
            </div>
            <div class="bubble-flag-fact-grid">
                <div class="bubble-flag-fact">
                    <div class="bubble-summary-label">최근 값</div>
                    <div class="bubble-flag-fact-value">${escapeHtml(facts.map(item => `${item.label} ${item.value}`).join(" · "))}</div>
                </div>
                <div class="bubble-flag-fact">
                    <div class="bubble-summary-label">임계치</div>
                    <div class="bubble-flag-fact-value">${escapeHtml(BUBBLE_FLAG_TABS[flagKey].threshold)}</div>
                </div>
                <div class="bubble-flag-fact">
                    <div class="bubble-summary-label">입력 근거</div>
                    <div class="bubble-flag-fact-value">${escapeHtml(compactStatusMessage(statusEntry.message, { maxLength: 130, maxClauses: 3, fallback: "-" }))}</div>
                </div>
                <div class="bubble-flag-fact is-wide">
                    <div class="bubble-summary-label">해석 문장</div>
                    <div class="bubble-flag-fact-value">${escapeHtml(signal.reason || "-")}</div>
                </div>
            </div>
            <div class="bubble-flag-kv-list">
                ${facts.map(item => `
                    <div class="bubble-flag-kv-row">
                        <span class="bubble-flag-kv-label">${escapeHtml(item.label)}</span>
                        <span class="bubble-flag-kv-value">${escapeHtml(item.value)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

function renderBubblePanel() {
    renderPanelStatus(
        "bubble-panel-status",
        [
            marketStatus.bubble?.marginDebt,
            marketStatus.bubble?.ipo,
            marketStatus.bubble?.trash,
            marketStatus.bubble?.fed,
            marketStatus.bubble?.critical
        ],
        "bubble-panel-status-message"
    );
    marketData.bubblePanelSelectedKey = normalizeBubbleFlagKey(marketData.bubblePanelSelectedKey);
    renderBubbleSummary();
    renderBubbleFlagTabs();
    renderBubbleFlagPanel(marketData.bubblePanelSelectedKey);
}

function initializeBubbleFlagTabs() {
    const tabBar = document.getElementById("bubble-flag-tab-bar");
    if (!tabBar || tabBar.dataset.bound === "true") return;
    tabBar.dataset.bound = "true";
    tabBar.addEventListener("click", event => {
        const target = event.target.closest(".bubble-flag-tab-btn");
        if (!target) return;
        marketData.bubblePanelSelectedKey = normalizeBubbleFlagKey(target.dataset.bubbleFlag);
        renderBubblePanel();
        if (typeof saveMarketData === "function") saveMarketData();
    });
}

initializeBubbleFlagTabs();
