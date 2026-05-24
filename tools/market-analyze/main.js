const inputSent = document.getElementById("input-sent");
if (inputSent) {
    inputSent.addEventListener("input", (event) => {
        marketData.sentiment = parseInt(event.target.value, 10);
        const sentValueEl = document.getElementById("val-sent");
        if (sentValueEl) sentValueEl.innerText = `${marketData.sentiment}점 (수동/AI)`;
        saveMarketData();
        calculateCycle();
    });
}

function getFlowToneClass(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return "text-slate-300";
    if (value > 0) return "text-rose-400";
    if (value < 0) return "text-cyan-400";
    return "text-slate-300";
}

function formatKrwMillion(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return "-";
    const absValue = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (absValue >= 1_000_000) return `${sign}${(absValue / 1_000_000).toFixed(absValue >= 10_000_000 ? 1 : 2)}조`;
    if (absValue >= 100) return `${sign}${(absValue / 100).toFixed(absValue >= 10_000 ? 0 : 1)}억`;
    return `${sign}${absValue.toFixed(0)}백만`;
}

function formatSignedPercent(value, digits = 1) {
    if (value === null || value === undefined || Number.isNaN(value)) return "-";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(digits)}%`;
}

function formatNullable(value, suffix = "", digits = 2) {
    if (value === null || value === undefined || Number.isNaN(value)) return "-";
    const num = Number(value);
    if (!Number.isFinite(num)) return "-";
    return `${num.toFixed(digits)}${suffix}`;
}

function getPercentToneClass(value, reverse = false) {
    if (value === null || value === undefined || Number.isNaN(value)) return "text-slate-400";
    if (Math.abs(value) < 0.001) return "text-slate-300";
    if (reverse) return value <= 0 ? "text-rose-400" : "text-cyan-400";
    return value >= 0 ? "text-rose-400" : "text-cyan-400";
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatYearMonthLabel(value) {
    if (!value || typeof value !== "string" || value.length < 6) return value || "-";
    return `${value.slice(0, 4)}.${value.slice(4, 6)}`;
}

function compactStatusMessage(message, options = {}) {
    const fallback = options.fallback || "-";
    const maxLength = Number.isFinite(options.maxLength) ? options.maxLength : 84;
    const maxClauses = Number.isFinite(options.maxClauses) ? options.maxClauses : 2;
    if (!message) return fallback;

    let text = String(message)
        .replace(/\s+/g, " ")
        .replace(/최근 성공 캐시 사용 \([^)]*\)/g, "최근 성공 캐시 사용")
        .replace(/기존 스냅샷 유지 \([^)]*\)/g, "기존 스냅샷 유지")
        .replace(/DNS 해석 실패 \(\[Errno \d+\][^)]+\)/gi, "DNS 해석 실패")
        .replace(/curl 우회 실패 \(DNS 해석 실패 \([^)]+\)\)/gi, "curl 우회 실패")
        .replace(/curl 우회 실패 \([^)]+\)/gi, "curl 우회 실패")
        .replace(/\(<urlopen error[^>]*>\)/gi, "네트워크 연결 오류")
        .replace(/<urlopen error[^>]*>/gi, "네트워크 연결 오류")
        .replace(/\[Errno \d+\][^)·]+/gi, "네트워크 연결 오류")
        .trim();

    text = text
        .replace(/\(([^()]{1,64})\)/g, " · $1")
        .replace(/\s*·\s*·\s*/g, " · ")
        .replace(/\s{2,}/g, " ")
        .replace(/^·\s*/, "")
        .trim();

    let clauses = text.split(" · ").map(part => part.trim()).filter(Boolean);
    if (clauses.length > maxClauses) {
        clauses = clauses.slice(0, maxClauses);
    }
    text = clauses.join(" · ");

    if (text.length > maxLength) {
        text = `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
    }

    return text || fallback;
}

function formatStatusLabelList(labels, limit = 4) {
    const uniqueLabels = [...new Set((labels || []).filter(Boolean))];
    if (!uniqueLabels.length) return "";
    if (uniqueLabels.length <= limit) return uniqueLabels.join(", ");
    return `${uniqueLabels.slice(0, limit).join(", ")} 외 ${uniqueLabels.length - limit}개`;
}

function buildStatusOverviewMessage(statusItems = [], options = {}) {
    const okMessage = options.okMessage || "핵심 모델 근거가 모두 채워진 상태입니다.";
    const emptyMessage = options.emptyMessage || "상태 정보가 없습니다.";
    const labelLimit = Number.isFinite(options.labelLimit) ? options.labelLimit : 4;
    const items = statusItems
        .map((item, index) => {
            if (!item) return null;
            if (item.entry) {
                return {
                    label: item.label || `항목 ${index + 1}`,
                    entry: normalizeStatusEntry(item.entry)
                };
            }
            return {
                label: item.label || `항목 ${index + 1}`,
                entry: normalizeStatusEntry(item)
            };
        })
        .filter(Boolean);

    if (!items.length) return emptyMessage;

    const problems = items.filter(item => item.entry.state !== "ok");
    if (!problems.length) return okMessage;

    const missingOrError = problems.filter(item => item.entry.state === "missing" || item.entry.state === "error");
    const partial = problems.filter(item => item.entry.state === "partial");
    const hasOfflineFallback = problems.some(item => /DNS\/네트워크 프리플라이트 실패|최근 성공 (스냅샷|캐시|생성본) 사용|기존 스냅샷 기준|라이브 수집 건너뜀/.test(String(item.entry.message || "")));
    const parts = [];

    if (missingOrError.length) {
        parts.push(`직접 확인 필요: ${formatStatusLabelList(missingOrError.map(item => item.label), labelLimit)}`);
    }
    if (partial.length) {
        parts.push(`${hasOfflineFallback ? "최근 성공 데이터 기준" : "부분 근거"}: ${formatStatusLabelList(partial.map(item => item.label), labelLimit)}`);
    }

    return parts.join(" · ") || okMessage;
}

function getStatusBadgeClass(state) {
    if (state === "ok") return "panel-status-badge is-ok";
    if (state === "partial") return "panel-status-badge is-partial";
    if (state === "error") return "panel-status-badge is-error";
    return "panel-status-badge is-missing";
}

function getMetricValueToneClass(statusEntry, fallbackClass = "text-emerald-400") {
    const state = statusEntry?.state;
    if (state === "error") return "text-rose-300";
    if (state === "missing") return "text-slate-500";
    if (state === "partial") return "text-amber-300";
    return fallbackClass;
}

function setStatusBadge(targetId, statusEntry) {
    const target = document.getElementById(targetId);
    if (!target || !statusEntry) return;
    target.className = getStatusBadgeClass(statusEntry.state);
    target.innerText = getStatusStateLabel(statusEntry.state);
    target.title = compactStatusMessage(statusEntry.message, { maxLength: 140, maxClauses: 3, fallback: "" });
}

function setStatusMessage(targetId, statusEntry, fallbackMessage = "-") {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.innerText = compactStatusMessage(statusEntry?.message, { maxLength: 120, maxClauses: 3, fallback: fallbackMessage });
}

function setMetricDisplay(targetId, text, className) {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.innerText = text;
    target.className = className;
}

function isAnchorComputed() {
    return Number.isFinite(marketData.fundamentalAnchorScore)
        || !!marketData.fundamentalAnchorReason
        || ["validated", "supportive", "fragile"].includes(marketData.fundamentalAnchorState);
}

function isFundamentalSupportComputed() {
    return Number.isFinite(marketData.fundamentalSupportScore)
        || !!marketData.fundamentalSupportReason
        || ["validated", "supportive", "fragile"].includes(marketData.fundamentalSupportState);
}

function getDisplayProblemEntries(options = {}) {
    const includeOk = !!options.includeOk;
    const includeAnchorBreakdown = !!options.includeAnchorBreakdown;
    const flattenedEntries = flattenMarketStatus(marketStatus, { includeOk });
    const anchorEntries = flattenedEntries.filter(entry => entry.key.startsWith("anchor."));
    const nonAnchorEntries = flattenedEntries.filter(entry => !entry.key.startsWith("anchor."));

    if (!anchorEntries.length) {
        return flattenedEntries;
    }

    const displayEntries = [...nonAnchorEntries];
    if (isAnchorComputed()) {
        const anchorSummary = summarizeAnchorDisplayStatus();
        if (includeOk || anchorSummary.state !== "ok") {
            displayEntries.push({
                key: "anchor",
                label: "펀더멘털 앵커",
                state: anchorSummary.state,
                source: anchorSummary.source,
                message: anchorSummary.message
            });
        }
        if (includeAnchorBreakdown) {
            displayEntries.push(...anchorEntries
                .filter(entry => includeOk || entry.state !== "ok")
                .map(entry => ({
                    ...entry,
                    label: entry.label.replace("앵커-", "앵커 세부 · ")
                })));
        }
    } else {
        displayEntries.push(...anchorEntries);
    }

    return displayEntries.sort((left, right) => getStatusPriority(right.state) - getStatusPriority(left.state));
}

function summarizeProblemStatuses() {
    const entries = getDisplayProblemEntries({ includeAnchorBreakdown: true });
    const problems = entries.filter(entry => entry.state !== "ok");
    return {
        problems,
        critical: problems.filter(entry => entry.state === "missing" || entry.state === "error")
    };
}

function renderHeaderMeta() {
    const resultDateEl = document.getElementById("result-meta-date");
    const generatedAtEl = document.getElementById("result-meta-generated");
    const schemaEl = document.getElementById("result-meta-schema");
    const loadStateEl = document.getElementById("result-meta-load-state");
    if (!resultDateEl || !generatedAtEl || !schemaEl || !loadStateEl) return;

    resultDateEl.innerText = formatResultDateLabel(marketResultMeta.resultDate);
    generatedAtEl.innerText = formatGeneratedAtLabel(marketResultMeta.generatedAt);
    schemaEl.innerText = marketResultMeta.schemaVersion || "-";
    loadStateEl.innerText = marketResultMeta.loadMessage || "대기 중";
    loadStateEl.className = `result-meta-value ${marketResultMeta.loadState === "artifact" ? "text-emerald-300" : marketResultMeta.loadState === "fallback" ? "text-amber-300" : "text-slate-300"}`;
    renderResultDatePicker();

    const dataStatus = document.getElementById("data-status");
    if (dataStatus) {
        dataStatus.className = getStatusBadgeClass(
            marketResultMeta.loadState === "artifact"
                ? "ok"
                : marketResultMeta.loadState === "fallback"
                    ? "partial"
                    : marketResultMeta.loadState === "local"
                        ? "partial"
                        : "missing"
        );
        dataStatus.innerText = marketResultMeta.sourceLabel || "아티팩트 대기";
    }
}

function renderResultDatePicker() {
    const picker = document.getElementById("result-date-picker");
    const hint = document.getElementById("result-date-picker-hint");
    if (!picker || !hint) return;

    const requested = artifactViewSettings.selectedResultDate || "latest";
    const availableDates = Array.isArray(marketResultMeta.availableDates)
        ? marketResultMeta.availableDates.filter(Boolean)
        : [];
    const sortedDates = [...new Set(availableDates)].sort((left, right) => right.localeCompare(left));
    const options = [{ value: "latest", label: "최신 생성본" }];

    if (requested !== "latest" && !sortedDates.includes(requested)) {
        options.push({
            value: requested,
            label: `고정값 없음 (${formatResultDateLabel(requested)})`
        });
    }

    sortedDates.forEach(dateKey => {
        options.push({
            value: dateKey,
            label: formatResultDateLabel(dateKey)
        });
    });

    picker.innerHTML = options.map(option => `
        <option value="${option.value}">${escapeHtml(option.label)}</option>
    `).join("");

    picker.value = options.some(option => option.value === requested) ? requested : "latest";

    if (requested === "latest") {
        hint.innerText = marketResultMeta.latestDate
            ? `최신 생성본 ${formatResultDateLabel(marketResultMeta.latestDate)} 기준`
            : "최신 생성본 기준";
        return;
    }

    if (requested === marketResultMeta.resolvedResultDate) {
        hint.innerText = `${formatResultDateLabel(requested)} 생성본 고정 로드 중`;
        return;
    }

    if (marketResultMeta.resolvedResultDate) {
        hint.innerText = `${formatResultDateLabel(requested)} 생성본이 없어 ${formatResultDateLabel(marketResultMeta.resolvedResultDate)}로 대체 로드`;
        return;
    }

    hint.innerText = `${formatResultDateLabel(requested)} 생성본 고정값 대기 중`;
}

function renderDataLoadStatus() {
    const loadedFileEl = document.getElementById("artifact-load-file");
    const problemCountEl = document.getElementById("artifact-load-problems-count");
    const problemListEl = document.getElementById("artifact-load-problems-list");
    const loadMessageEl = document.getElementById("artifact-load-message");
    const sourceEl = document.getElementById("artifact-load-source");
    if (!loadedFileEl || !problemCountEl || !problemListEl || !loadMessageEl || !sourceEl) return;

    const { problems, critical } = summarizeProblemStatuses();
    const anchorSummary = summarizeAnchorDisplayStatus();
    const hasAnchorCritical = critical.some(entry => entry.key?.startsWith("anchor."));
    const visibleCriticalEntries = hasAnchorCritical && isAnchorComputed()
        ? [
            {
                key: "anchor",
                label: "펀더멘털 앵커",
                state: anchorSummary.state,
                source: anchorSummary.source,
                message: `전체 앵커는 ${getStatusStateLabel(anchorSummary.state)}로 유지됩니다. ${anchorSummary.message}`
            },
            ...critical
        ]
        : critical;
    loadedFileEl.innerText = marketResultMeta.loadedFile || "-";
    problemCountEl.innerText = `${problems.length}건`;
    loadMessageEl.innerText = marketResultMeta.loadMessage || "생성 결과 대기 중";
    sourceEl.innerText = marketResultMeta.sourceLabel || "-";

    if (!visibleCriticalEntries.length) {
        problemListEl.innerHTML = `<div class="text-[11px] text-slate-400">핵심 누락/오류 지표 없음</div>`;
        return;
    }

    problemListEl.innerHTML = visibleCriticalEntries.slice(0, 6).map(entry => `
        <div class="artifact-problem-row">
            <span class="${getStatusBadgeClass(entry.state)}">${getStatusStateLabel(entry.state)}</span>
            <div>
                <div class="artifact-problem-label">${entry.label}</div>
                <div class="artifact-problem-message">${escapeHtml(compactStatusMessage(entry.message, { maxLength: 120, maxClauses: 3, fallback: "-" }))}</div>
            </div>
        </div>
    `).join("");
}

function renderPanelStatus(panelId, statusEntries, messageId) {
    const summary = summarizeStatusEntries(statusEntries);
    setStatusBadge(panelId, summary);
    if (messageId) setStatusMessage(messageId, summary);
    return summary;
}

function summarizeAnchorDisplayStatus() {
    const entries = [
        { label: "수출", entry: marketStatus.anchor?.export },
        { label: "실적", entry: marketStatus.anchor?.earnings },
        { label: "확산", entry: marketStatus.anchor?.broadening },
        { label: "업종 확산", entry: marketStatus.anchor?.sectorBreadth },
        { label: "밸류에이션", entry: marketStatus.anchor?.valuation },
        { label: "지지력", entry: summarizeSupportDisplayStatus() }
    ];
    const baseSummary = summarizeStatusEntries(entries.map(item => item.entry));
    const hasComputedAnchor = isAnchorComputed();
    const availableCount = entries.filter(item => ["ok", "partial"].includes(item.entry?.state)).length;
    const problemEntries = entries.filter(item => ["missing", "error"].includes(item.entry?.state));

    if (!hasComputedAnchor || availableCount <= 0 || !problemEntries.length) {
        return baseSummary;
    }

    const sources = [...new Set(problemEntries.map(item => item.entry?.source).filter(Boolean))];
    const labels = problemEntries.map(item => `${item.label} ${getStatusStateLabel(item.entry?.state)}`);
    const messages = [...new Set(problemEntries.map(item => item.entry?.message).filter(Boolean))];

    return createStatusEntry(
        "partial",
        sources.join(" · ") || baseSummary.source,
        `일부 축은 누락/오류 근거로 계산됨 (${labels.join(", ")})${messages.length ? ` · ${messages[0]}` : ""}`
    );
}

function summarizeSupportDisplayStatus() {
    const supportEntry = marketStatus.anchor?.support;
    const detailEntries = [
        { label: "업종 확산", entry: marketStatus.anchor?.sectorBreadth },
        { label: "밸류에이션", entry: marketStatus.anchor?.valuation }
    ];
    const baseSummary = summarizeStatusEntries([supportEntry, ...detailEntries.map(item => item.entry)]);
    if (!isFundamentalSupportComputed()) {
        return baseSummary;
    }

    const problemEntries = detailEntries.filter(item => ["missing", "error"].includes(item.entry?.state));
    if (!problemEntries.length) {
        return supportEntry?.state
            ? summarizeStatusEntries([supportEntry, ...detailEntries.map(item => item.entry)])
            : baseSummary;
    }

    const sources = [
        ...new Set(
            [supportEntry, ...problemEntries.map(item => item.entry)]
                .map(entry => entry?.source)
                .filter(Boolean)
        )
    ];
    const labels = problemEntries.map(item => `${item.label} ${getStatusStateLabel(item.entry?.state)}`);
    const prefix = supportEntry?.message || marketData.fundamentalSupportReason || "펀더멘털 지지력 계산은 유지됩니다.";

    return createStatusEntry(
        "partial",
        sources.join(" · ") || baseSummary.source,
        `${prefix} · 세부 입력 상태: ${labels.join(", ")}`
    );
}

function updateMarketFlowUI() {
    const flowDateEl = document.getElementById("val-flow-bizdate");
    if (!flowDateEl) return;

    const flowDateLabel = marketData.flowBizDate ? formatFlowBizDateLabel(marketData.flowBizDate) : "기준일";
    flowDateEl.innerText = marketData.flowBizDate ? `기준일 ${flowDateLabel}` : "기준일 -";

    const bindings = [
        { todayId: "flow-retail-today", cumId: "flow-retail-10d", todayValue: marketData.retailNetToday, cumValue: marketData.retailNet10dCum },
        { todayId: "flow-foreign-today", cumId: "flow-foreign-10d", todayValue: marketData.foreignNetToday, cumValue: marketData.foreignNet10dCum },
        { todayId: "flow-institution-today", cumId: "flow-institution-10d", todayValue: marketData.institutionNetToday, cumValue: marketData.institutionNet10dCum }
    ];

    bindings.forEach(({ todayId, cumId, todayValue, cumValue }) => {
        const todayEl = document.getElementById(todayId);
        const cumEl = document.getElementById(cumId);
        if (!todayEl || !cumEl) return;

        todayEl.innerText = `${flowDateLabel} ${formatSignedFlowValue(todayValue)}`;
        todayEl.className = `font-mono font-bold text-sm ${getFlowToneClass(todayValue)}`;
        cumEl.innerText = `10일 누적 ${formatSignedFlowValue(cumValue)}`;
        cumEl.className = `text-[10px] mt-1 ${cumValue === null || cumValue === undefined || Number.isNaN(cumValue) ? "text-slate-500" : getFlowToneClass(cumValue)}`;
    });

    const flowStatus = marketStatus.flow;
    const reasonEl = document.getElementById("val-flow-reason");
    if (reasonEl) {
        reasonEl.innerText = flowStatus?.state === "ok"
            ? (marketData.flowReason || "시장 수급을 반영했습니다.")
            : flowStatus?.message || marketData.flowReason || "수급 데이터 대기 중 (중립 처리)";
        reasonEl.className = `mt-3 text-[10px] leading-relaxed ${flowStatus?.state === "error" ? "text-rose-300" : flowStatus?.state === "missing" ? "text-slate-500" : marketData.flowBonus > 0 ? "text-rose-300" : "text-slate-500"}`;
    }
}

function updateLeaderTrapUI() {
    const dateEl = document.getElementById("val-leader-date");
    const bodyEl = document.getElementById("leader-trap-body");
    const summaryEl = document.getElementById("val-leader-summary");
    if (!dateEl || !bodyEl || !summaryEl) return;

    dateEl.innerText = marketData.leaderSnapshotDate ? `기준일 ${formatFlowBizDateLabel(marketData.leaderSnapshotDate)}` : "기준일 -";

    const leadersStatus = marketStatus.leaders;
    if (!Array.isArray(marketData.leaderStocks) || !marketData.leaderStocks.length) {
        bodyEl.innerHTML = `
            <div class="text-[11px] text-slate-500 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50">
                <div class="flex items-center gap-2">
                    <span class="${getStatusBadgeClass(leadersStatus?.state || "missing")}">${getStatusStateLabel(leadersStatus?.state || "missing")}</span>
                    <span>${escapeHtml(leadersStatus?.message || "대표주 데이터 대기 중")}</span>
                </div>
            </div>
        `;
        summaryEl.innerText = leadersStatus?.message || marketData.trapReason || "트랩 데이터 대기 중 (중립 처리)";
        summaryEl.className = "mt-3 text-[10px] leading-relaxed text-slate-500";
        return;
    }

    bodyEl.innerHTML = marketData.leaderStocks.map(stock => `
        <div class="leader-card">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <div class="text-xs font-bold text-slate-100">${stock.name}</div>
                    <div class="text-[10px] text-slate-500">15일 누적 ${formatKrwMillion(stock.cum15dTradingValue)} · 비중 ${(stock.weight * 100).toFixed(0)}%</div>
                </div>
                <div class="text-right">
                    <div class="text-xs font-bold ${getPercentToneClass(stock.dayReturnPct)}">${formatSignedPercent(stock.dayReturnPct)}</div>
                    <div class="text-[10px] text-slate-500">당일</div>
                </div>
            </div>
            <div class="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                <div class="text-slate-400">15일 낙폭</div>
                <div class="text-right ${getPercentToneClass(stock.drawdown15dPct, true)}">${formatSignedPercent(stock.drawdown15dPct)}</div>
                <div class="text-slate-400">첫 음봉 폭발</div>
                <div class="text-right ${stock.shockValueRatio >= 1 ? "text-rose-300" : "text-slate-400"}">${stock.shockValueRatio ? `${stock.shockValueRatio.toFixed(2)}x` : "-"}</div>
                <div class="text-slate-400">3일 누적 낙폭</div>
                <div class="text-right ${getPercentToneClass(stock.threeDayDropPct, true)}">${formatSignedPercent(stock.threeDayDropPct)}</div>
                <div class="text-slate-400">종가 회복률</div>
                <div class="text-right ${stock.closeRecoveryRate <= 0.45 ? "text-rose-300" : "text-slate-400"}">${stock.closeRecoveryRate !== null && stock.closeRecoveryRate !== undefined ? `${(stock.closeRecoveryRate * 100).toFixed(0)}%` : "-"}</div>
            </div>
        </div>
    `).join("");

    summaryEl.innerText = marketData.trapReason || leadersStatus?.message || "트랩 데이터 대기 중 (중립 처리)";
    summaryEl.className = `mt-3 text-[10px] leading-relaxed ${marketData.trapScore >= 10 ? "text-rose-300" : leadersStatus?.state === "partial" ? "text-amber-300" : "text-slate-500"}`;
}

function updateDashboardUI() {
    setMetricDisplay(
        "val-fx",
        Number.isFinite(marketData.fx) ? `${marketData.fx.toLocaleString()} 원` : "-",
        `font-mono font-bold text-lg ${getMetricValueToneClass(marketStatus.fx)}`
    );
    setMetricDisplay(
        "val-vix",
        Number.isFinite(marketData.vix) ? marketData.vix.toFixed(2) : "-",
        `font-mono font-bold text-lg ${getMetricValueToneClass(marketStatus.vix)}`
    );
    setMetricDisplay(
        "val-gold",
        Number.isFinite(marketData.gold) ? `$ ${marketData.gold.toLocaleString()}` : "-",
        `font-mono font-bold text-lg ${getMetricValueToneClass(marketStatus.gold)}`
    );
    setMetricDisplay(
        "val-disparity",
        Number.isFinite(marketData.disparity) ? `${marketData.disparity.toFixed(2)} %` : "-",
        `font-mono font-bold text-lg ${getMetricValueToneClass(marketStatus.disparity)}`
    );
    setMetricDisplay(
        "val-bull-ratio",
        Number.isFinite(marketData.bullRatio) ? `${marketData.bullRatio.toFixed(1)} %` : "-",
        `font-mono font-bold text-lg ${getMetricValueToneClass(marketStatus.kostolany, "text-emerald-400")}`
    );

    const slope = marketData.marginSlope;
    setMetricDisplay(
        "val-margin-slope",
        Number.isFinite(slope) ? `${slope > 0 ? "+" : ""}${slope.toFixed(2)}` : "-",
        `font-mono font-bold text-lg ${marketStatus.margin?.state === "ok" ? (slope > 0 ? "text-rose-400" : slope < 0 ? "text-cyan-400" : "text-slate-300") : getMetricValueToneClass(marketStatus.margin, "text-slate-300")}`
    );

    setMetricDisplay(
        "val-sent",
        `${marketData.sentiment}점 (수동/AI)`,
        "font-mono text-cyan-400 font-bold text-lg"
    );
    if (inputSent) inputSent.value = marketData.sentiment;

    renderHeaderMeta();
    renderDataLoadStatus();
    updateMarketFlowUI();
    updateLeaderTrapUI();
    updatePortfolioUI();
}

function updatePortfolioUI() {
    const inputs = document.querySelectorAll(".portfolio-input");
    inputs.forEach(input => {
        const key = input.getAttribute("data-key");
        const field = input.getAttribute("data-field") || "cashRatio";
        if (!portfolioData[key]) return;
        const value = portfolioData[key][field] || 0;
        input.value = value;
        const valueSpan = input.nextElementSibling;
        if (valueSpan && valueSpan.classList.contains("portfolio-val")) {
            valueSpan.innerText = `${value}%`;
        }
    });
}

const portfolioBody = document.getElementById("portfolio-guide-body");
if (portfolioBody) {
    portfolioBody.addEventListener("input", event => {
        if (!event.target.classList.contains("portfolio-input")) return;
        const key = event.target.getAttribute("data-key");
        const field = event.target.getAttribute("data-field") || "cashRatio";
        if (!portfolioData[key]) return;
        portfolioData[key][field] = event.target.value;

        const valueSpan = event.target.nextElementSibling;
        if (valueSpan && valueSpan.classList.contains("portfolio-val")) {
            valueSpan.innerText = `${event.target.value}%`;
        }

        saveMarketData();
        calculateCycle();
    });
}

document.getElementById("btn-export")?.addEventListener("click", () => {
    const payload = {
        type: "market-analyze-local-state",
        savedAt: new Date().toISOString(),
        marketData,
        marketStatus,
        marketResultMeta,
        artifactViewSettings,
        portfolioData
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `market_analyze_local_state_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

document.getElementById("btn-portfolio-export")?.addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `portfolio_settings_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

document.getElementById("btn-import")?.addEventListener("click", () => {
    document.getElementById("file-import")?.click();
});

document.getElementById("file-import")?.addEventListener("change", event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = loadEvent => {
        try {
            const parsed = JSON.parse(loadEvent.target.result);
            const dataToLoad = parsed.marketData || parsed.data || parsed;
            const statusToLoad = parsed.marketStatus || parsed.status || inferMarketStatusFromData(dataToLoad, "imported_json");
            const metaToLoad = parsed.marketResultMeta || parsed.meta || createResultMetaPatch({
                loadState: "local",
                loadMessage: "로컬 상태 백업을 불러왔습니다.",
                sourceLabel: "로컬 상태 백업",
                loadedFile: file.name,
                fallbackUsed: true
            });

            marketData = { ...marketData, ...dataToLoad };
            marketStatus = normalizeMarketStatus(statusToLoad);
            marketResultMeta = { ...marketResultMeta, ...metaToLoad };
            if (parsed.artifactViewSettings) {
                artifactViewSettings = { ...artifactViewSettings, ...parsed.artifactViewSettings };
            }
            if (parsed.portfolioData) {
                portfolioData = { ...portfolioData, ...parsed.portfolioData };
            }

            saveMarketData();
            updateDashboardUI();
            calculateCycle();
            alert("로컬 상태 백업을 성공적으로 복구했습니다.");
        } catch (error) {
            alert("잘못된 형태의 JSON 파일입니다.");
        }
    };
    reader.readAsText(file);
});

document.getElementById("btn-portfolio-import")?.addEventListener("click", () => {
    document.getElementById("file-portfolio-import")?.click();
});

document.getElementById("file-portfolio-import")?.addEventListener("change", event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = loadEvent => {
        try {
            const parsed = JSON.parse(loadEvent.target.result);
            const dataToLoad = parsed.portfolioData || parsed;
            portfolioData = { ...portfolioData, ...dataToLoad };
            saveMarketData();
            updateDashboardUI();
            calculateCycle();
            alert("포트폴리오 설정을 성공적으로 복구했습니다.");
        } catch (error) {
            alert("잘못된 형태의 포트폴리오 설정 파일입니다.");
        }
    };
    reader.readAsText(file);
});

// 거장 이론 서브탭 전환
const theorySubtabBar = document.getElementById('theory-subtab-bar');
if (theorySubtabBar) {
    theorySubtabBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.theory-subtab-btn');
        if (!btn) return;
        const target = btn.dataset.subtab;
        document.querySelectorAll('.theory-subtab-btn').forEach(b => b.classList.toggle('is-active', b === btn));
        document.querySelectorAll('.theory-subtab-panel').forEach(p => p.classList.toggle('is-active', p.dataset.subtabPanel === target));
        renderTheorySubtabs();
    });
}

function getWyckoffActionGuide(phase, confidence) {
    const confidencePct = Math.round((Number(confidence) || 0) * 100);
    const guides = {
        A: {
            title: '하락 정지 대응',
            body: `급락 진정 여부를 먼저 확인하세요. ${confidencePct >= 55 ? '소액 분할 진입을 검토할 수 있지만' : '아직은'} 추세 반전 확정 전까지는 현금과 관찰 비중을 유지하는 편이 좋습니다.`
        },
        B: {
            title: '매집 구간 대응',
            body: `박스권 분할 매수에 유리한 구간입니다. 다만 상단 돌파 전까지는 한 번에 크게 들어가기보다 여러 번 나눠 담는 쪽이 안정적입니다.`
        },
        C: {
            title: 'Spring 구간 대응',
            body: `하단 테스트 후 회복 신호입니다. 회복이 하루 이틀 더 이어지는지 확인하면서 확인 매수 성격으로 접근하는 것이 좋습니다.`
        },
        D: {
            title: '상승 추세 대응',
            body: `보유 유지나 눌림목 추가 대응이 가능한 구간입니다. 다만 과열 추격보다는 거래량이 실린 돌파 이후 눌림을 기다리는 편이 좋습니다.`
        },
        E: {
            title: '분배 구간 대응',
            body: `신규 진입은 보수적으로 보고, 기존 보유분은 분할 익절이나 비중 축소를 우선 검토하세요. 반등이 나와도 회복 매수보다 리스크 관리가 먼저입니다.`
        },
        NEUTRAL: {
            title: '관망 대응',
            body: `증거가 아직 한쪽으로 충분히 모이지 않았습니다. 후보 단계와 신뢰도를 참고하되, 포지션은 가볍게 유지하고 다음 생성본에서 구조 변화를 확인하는 편이 좋습니다.`
        }
    };
    return guides[phase] || guides.NEUTRAL;
}

function initializeWyckoffHelpModal() {
    const modal = document.getElementById('wyckoff-help-modal');
    const openBtn = document.getElementById('wyckoff-help-open');
    if (!modal || !openBtn) return;

    const closeModal = () => modal.classList.add('hidden');
    const openModal = () => modal.classList.remove('hidden');

    openBtn.addEventListener('click', openModal);
    modal.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof HTMLElement && target.dataset.wyckoffClose === 'true') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

function getMarketEvaluationTone(state) {
    const tones = {
        "structural-bull": { accent: "#34d399", chip: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
        "validated-overheat": { accent: "#fbbf24", chip: "bg-amber-500/15 text-amber-200 border-amber-400/30" },
        "overheat-only": { accent: "#fb923c", chip: "bg-orange-500/15 text-orange-200 border-orange-400/30" },
        "distribution-risk": { accent: "#f87171", chip: "bg-rose-500/15 text-rose-200 border-rose-400/30" },
        "reaccumulation": { accent: "#38bdf8", chip: "bg-cyan-500/15 text-cyan-200 border-cyan-400/30" },
        balanced: { accent: "#94a3b8", chip: "bg-slate-500/15 text-slate-200 border-slate-400/30" }
    };
    return tones[state] || tones.balanced;
}

function getAnchorStateLabel(state) {
    if (state === "validated") return "강함";
    if (state === "supportive") return "보통";
    if (state === "fragile") return "약함";
    return "중립";
}

function getAnchorStateTone(state) {
    if (state === "validated") return "#34d399";
    if (state === "supportive") return "#fbbf24";
    if (state === "fragile") return "#f87171";
    return "#cbd5e1";
}

function getAnchorStatePillClass(state) {
    if (state === "validated") return "anchor-state-pill is-validated";
    if (state === "supportive") return "anchor-state-pill is-supportive";
    if (state === "fragile") return "anchor-state-pill is-fragile";
    return "anchor-state-pill is-neutral";
}

function getMarketRegimeTone(regimeKey) {
    if (regimeKey === "secular-expansion") return "#34d399";
    if (regimeKey === "debasement-bubble") return "#f87171";
    return "#94a3b8";
}

function getValuationStabilityLabel(value) {
    if (value === true) return "안정";
    if (value === false) return "불안정";
    return "-";
}

function getMarketRegimeCompactLabel(regimeKey, regimeLabel) {
    if (regimeKey === "secular-expansion") return "Secular Expansion";
    if (regimeKey === "debasement-bubble") return "Debasement Bubble";
    return regimeLabel || "표준 레짐";
}

function buildMarketChipHtml(label, value, chipClass, statusEntry = null) {
    const badgeHtml = statusEntry && statusEntry.state !== "ok"
        ? `<span class="${getStatusBadgeClass(statusEntry.state)} chip-inline-badge">${getStatusStateLabel(statusEntry.state)}</span>`
        : "";
    return `
        <div class="market-eval-chip ${chipClass}">
            <div class="market-eval-chip-label">
                <span>${label}</span>
                ${badgeHtml}
            </div>
            <div class="market-eval-chip-value">${value}</div>
        </div>
    `;
}

function buildRiskSummary() {
    const parts = [
        `Bull Trap ${marketData.trapScore || 0}/20`,
        Number.isFinite(marketData.wyckoffDistributionBreadth) ? `분배 ${(marketData.wyckoffDistributionBreadth * 100).toFixed(0)}%` : "분배 -",
        marketData.reflexivityState === "runaway" ? "재귀성 폭주" : marketData.reflexivityState === "caution" ? "재귀성 주의" : "재귀성 중립"
    ];
    if (Number.isFinite(marketData.marginShockChangePct) && marketData.marginShockChangePct >= 0) {
        parts.push("신용 경계");
    } else if (Number.isFinite(marketData.depositMarginRatio) && marketData.depositMarginRatio >= 0.2) {
        parts.push("민스키 경고");
    }
    return parts.join(" · ");
}

function getReflexivitySummaryLabel() {
    if (marketData.reflexivityState === "runaway") return "폭주";
    if (marketData.reflexivityState === "caution") return "주의";
    return "정상";
}

function getMinskySummaryLabel() {
    if ((Number.isFinite(marketData.marginShockChangePct) && marketData.marginShockChangePct >= 0)
        || (Number.isFinite(marketData.depositMarginRatio) && marketData.depositMarginRatio >= 0.2)
        || (Number.isFinite(marketData.marginSlope) && marketData.marginSlope >= 300)) {
        return "경고";
    }
    if ((Number.isFinite(marketData.marginSlope) && marketData.marginSlope > 0)
        || (Number.isFinite(marketData.depositMarginRatio) && marketData.depositMarginRatio >= 0.12)) {
        return "주의";
    }
    if ((Number.isFinite(marketData.marginShockChangePct) && marketData.marginShockChangePct < 0)
        || (Number.isFinite(marketData.marginSlope) && marketData.marginSlope < 0)) {
        return "완화";
    }
    return "중립";
}

function getWyckoffConsensusLabel() {
    const stocks = Array.isArray(marketData.leaderStocks) ? marketData.leaderStocks : [];
    if (!stocks.length) return "관망";

    const phaseWeight = {};
    stocks.forEach(stock => {
        const phase = stock?.wyckoffPhase || "NEUTRAL";
        phaseWeight[phase] = (phaseWeight[phase] || 0) + (Number(stock.weight) || 0);
    });

    if (Number.isFinite(marketData.wyckoffDistributionBreadth) && marketData.wyckoffDistributionBreadth >= 0.5) {
        return "E 분배 우세";
    }

    const topEntry = Object.entries(phaseWeight).sort((left, right) => right[1] - left[1])[0];
    const topPhase = topEntry?.[0] || "NEUTRAL";
    const topWeight = topEntry?.[1] || 0;
    if (topPhase === "NEUTRAL" || topWeight < 0.3) return "관망";

    const labelFn = typeof getWyckoffPhaseLabel === 'function' ? getWyckoffPhaseLabel : (phase => phase);
    const compactLabel = labelFn(topPhase).replace(/\s*\(Phase [A-E]\)/, "");
    return `${compactLabel} 우세`;
}

function getProblemSummaryText(limit = 4) {
    const problems = getDisplayProblemEntries().filter(entry => entry.state !== "ok");
    if (!problems.length) return "";
    return problems
        .slice(0, limit)
        .map(entry => `${entry.label} ${getStatusStateLabel(entry.state)}`)
        .join(", ");
}

function renderMarketEvaluationView() {
    const labelEl = document.getElementById("market-evaluation-label");
    if (!labelEl) return;

    const tone = getMarketEvaluationTone(marketData.marketEvaluationState);
    const titleEl = document.getElementById("market-flow-title");
    const narrativeEl = document.getElementById("market-flow-narrative");
    const chipsEl = document.getElementById("market-eval-chip-grid");
    const stanceEl = document.getElementById("market-advice-stance");
    const reasonEl = document.getElementById("market-advice-reason");
    const nowEl = document.getElementById("market-advice-now");
    const watchEl = document.getElementById("market-advice-watch");
    const breakEl = document.getElementById("market-advice-break");
    const evidenceEl = document.getElementById("market-evidence-note");
    const statusBadgeEl = document.getElementById("market-evaluation-status");
    const statusMessageEl = document.getElementById("market-evaluation-status-message");
    const anchorStatusSummary = summarizeAnchorDisplayStatus();
    const supportStatusSummary = summarizeSupportDisplayStatus();
    const coreStatusItems = [
        { label: "소로스", entry: marketStatus.soros },
        { label: "민스키", entry: marketStatus.minsky },
        { label: "코스톨라니", entry: marketStatus.kostolany },
        { label: "와이코프", entry: marketStatus.wyckoff },
        { label: "펀더멘털 앵커", entry: anchorStatusSummary }
    ];
    const coreStatusSummary = summarizeStatusEntries([
        ...coreStatusItems.map(item => item.entry)
    ]);
    const coreStatusMessage = buildStatusOverviewMessage(coreStatusItems, {
        okMessage: "핵심 모델 근거가 모두 채워진 상태입니다.",
        emptyMessage: "일부 모델은 부분/누락 근거로 계산됩니다.",
        labelLimit: 4
    });
    const problemSummary = getProblemSummaryText();

    labelEl.innerText = marketData.marketEvaluationLabel || "판단 보류";
    labelEl.style.color = tone.accent;
    titleEl.innerText = marketData.marketFlowTitle || "데이터 대기 중";
    narrativeEl.innerText = marketData.marketFlowNarrative || "생성된 결과 아티팩트를 바탕으로 현재 시장 흐름을 정리합니다.";
    if (statusBadgeEl) setStatusBadge("market-evaluation-status", coreStatusSummary);
    if (statusMessageEl) {
        statusMessageEl.innerText = coreStatusMessage;
    }
    chipsEl.innerHTML = [
        buildMarketChipHtml(
            "레짐",
            `${getMarketRegimeCompactLabel(marketData.marketRegimeKey, marketData.marketRegimeLabel)} · F_support ${Number.isFinite(marketData.fundamentalSupportScore) ? Math.round(marketData.fundamentalSupportScore) : "-"}`,
            tone.chip,
            summarizeStatusEntries([marketStatus.fx, marketStatus.disparity, supportStatusSummary])
        ),
        buildMarketChipHtml(
            "하워드 막스",
            `${marketData.cycleStageLabel || "-"} · P ${Math.round(marketData.riskIndex || 0)}`,
            tone.chip,
            summarizeStatusEntries([marketStatus.disparity, marketStatus.flow, marketStatus.vix])
        ),
        buildMarketChipHtml(
            "펀더멘털 앵커",
            `${getAnchorStateLabel(marketData.fundamentalAnchorState)} · ${Number.isFinite(marketData.fundamentalAnchorScore) ? Math.round(marketData.fundamentalAnchorScore) : "-"}점`,
            tone.chip,
            anchorStatusSummary
        ),
        buildMarketChipHtml(
            "소로스",
            `${getReflexivitySummaryLabel()} · ${Number(marketData.reflexivitySynergyPoints || 0).toFixed(1)}점`,
            tone.chip,
            marketStatus.soros
        ),
        buildMarketChipHtml(
            "민스키",
            `${getMinskySummaryLabel()} · ${Number.isFinite(marketData.depositMarginRatio) ? (marketData.depositMarginRatio * 100).toFixed(1) : "-"}%`,
            tone.chip,
            marketStatus.minsky
        ),
        buildMarketChipHtml(
            "코스톨라니",
            `${marketData.kostolanyStage || "-"} · ${KOSTOLANY_STAGE_NAMES[marketData.kostolanyStage] || "-"}`,
            tone.chip,
            marketStatus.kostolany
        ),
        buildMarketChipHtml(
            "와이코프",
            `${getWyckoffConsensusLabel()} · ${Number.isFinite(marketData.wyckoffDistributionBreadth) ? `분배 ${(marketData.wyckoffDistributionBreadth * 100).toFixed(0)}%` : "분배 -"}`,
            tone.chip,
            marketStatus.wyckoff
        ),
        buildMarketChipHtml(
            "펀더멘털 지지력",
            `${getAnchorStateLabel(marketData.fundamentalSupportState)} · ${Number.isFinite(marketData.nonSemiconductorMomentum) ? `${Math.round(marketData.nonSemiconductorMomentum)}%` : "-"} / ${getValuationStabilityLabel(marketData.marketValuationStability)}`,
            tone.chip,
            supportStatusSummary
        )
    ].join("");

    stanceEl.innerText = marketData.marketAdviceStance || "균형 유지";
    stanceEl.style.color = tone.accent;
    reasonEl.innerText = marketData.marketAdviceReason || "시장 해석 대기 중";
    nowEl.innerText = marketData.marketAdviceActions?.now || "최신 생성본을 불러오면 행동 가이드가 표시됩니다.";
    watchEl.innerText = marketData.marketAdviceActions?.watch || "-";
    breakEl.innerText = marketData.marketAdviceActions?.break || "-";

    const evidenceParts = [
        `레짐 ${marketData.marketRegimeLabel || "표준 레짐"}`,
        `막스 ${marketData.cycleStageLabel || "-"}`,
        `소로스 ${getReflexivitySummaryLabel()}`,
        `민스키 ${getMinskySummaryLabel()}`,
        `코스톨라니 ${marketData.kostolanyStage || "-"}`,
        `와이코프 ${getWyckoffConsensusLabel()}`,
        `앵커 ${getAnchorStateLabel(marketData.fundamentalAnchorState)}`,
        `지지력 ${getAnchorStateLabel(marketData.fundamentalSupportState)}`
    ];
    if (Number.isFinite(marketData.rawRiskIndex) || Number.isFinite(marketData.riskIndex)) {
        evidenceParts.push(`raw P ${Number.isFinite(marketData.rawRiskIndex) ? Math.round(marketData.rawRiskIndex) : "-"} -> adjusted P ${Number.isFinite(marketData.riskIndex) ? Math.round(marketData.riskIndex) : "-"}`);
    }
    if (Number.isFinite(marketData.fundamentalSupportScore)) {
        evidenceParts.push(`F_support ${Math.round(marketData.fundamentalSupportScore)}`);
    }
    if (Number.isFinite(marketData.supportOffsetPoints)) {
        evidenceParts.push(`offset -${marketData.supportOffsetPoints.toFixed(1)}`);
    }
    if (marketData.exportLatestMonth) {
        evidenceParts.push(`수출 ${marketData.exportLatestMonth.slice(0, 4)}.${marketData.exportLatestMonth.slice(4, 6)}`);
    }
    if (Number.isFinite(marketData.exportYoY)) {
        evidenceParts.push(`수출 YoY ${formatSignedPercent(marketData.exportYoY, 1)}`);
    }
    if (Number.isFinite(marketData.exportYoYDelta)) {
        evidenceParts.push(`가속도 ${marketData.exportYoYDelta > 0 ? '+' : ''}${marketData.exportYoYDelta.toFixed(1)}%p`);
    }
    if (marketData.earningsSnapshotQuarter) {
        evidenceParts.push(`실적 ${marketData.earningsSnapshotQuarter}`);
    }
    if (Number.isFinite(marketData.opIncomeBreadth)) {
        evidenceParts.push(`영업이익 breadth ${(marketData.opIncomeBreadth * 100).toFixed(0)}%`);
    }
    if (Number.isFinite(marketData.netIncomeBreadth)) {
        evidenceParts.push(`순이익 breadth ${(marketData.netIncomeBreadth * 100).toFixed(0)}%`);
    }
    if (Number.isFinite(marketData.supportPositiveReturnBreadth)) {
        evidenceParts.push(`비주도주 20일 breadth ${(marketData.supportPositiveReturnBreadth * 100).toFixed(0)}%`);
    }
    if (Number.isFinite(marketData.supportBreadth60d)) {
        evidenceParts.push(`비주도주 60일선 ${(marketData.supportBreadth60d * 100).toFixed(0)}%`);
    }
    if (Number.isFinite(marketData.nonSemiconductorMomentum)) {
        evidenceParts.push(`업종 확산 ${Math.round(marketData.nonSemiconductorMomentum)}%`);
    }
    if (marketData.marketValuationStability === true || marketData.marketValuationStability === false) {
        evidenceParts.push(`밸류에이션 ${getValuationStabilityLabel(marketData.marketValuationStability)}`);
    }
    if (Number.isFinite(marketData.marketValuationForwardPerAvg)) {
        evidenceParts.push(`가중 Fwd PER ${marketData.marketValuationForwardPerAvg.toFixed(1)}배`);
    }

    const evidenceBase = evidenceParts.join(" · ");
    const anchorTail = [
        marketData.fundamentalAnchorReason,
        marketData.fundamentalSupportReason
    ].filter(Boolean).join(" · ");
    const partialTail = problemSummary ? ` · 부분 근거(${problemSummary})` : "";
    evidenceEl.innerText = `${evidenceBase}${anchorTail ? ` · ${anchorTail}` : ""}${partialTail}`;
}

function renderFundamentalAnchorPanel() {
    const scoreEl = document.getElementById("anchor-score");
    if (!scoreEl) return;

    const anchorState = marketData.fundamentalAnchorState || "neutral";
    const supportState = marketData.fundamentalSupportState || "neutral";
    const exportState = Number.isFinite(marketData.exportYoY) && marketData.exportYoY > 5 && Number.isFinite(marketData.exportYoYDelta) && marketData.exportYoYDelta > 0
        ? "validated"
        : Number.isFinite(marketData.exportYoY) && marketData.exportYoY <= 0 && Number.isFinite(marketData.exportYoYDelta) && marketData.exportYoYDelta < 0
            ? "fragile"
            : Number.isFinite(marketData.exportYoY) || marketData.exportLatestMonth
                ? "supportive"
                : "neutral";
    const earningsState = marketData.earningsCoverageCount > 0
        ? (Number.isFinite(marketData.opIncomeBreadth) && marketData.opIncomeBreadth >= 0.6 && Number.isFinite(marketData.netIncomeBreadth) && marketData.netIncomeBreadth >= 0.5
            ? "validated"
            : (Number.isFinite(marketData.opIncomeBreadth) && marketData.opIncomeBreadth >= 0.4) || (Number.isFinite(marketData.netIncomeBreadth) && marketData.netIncomeBreadth >= 0.4)
                ? "supportive"
                : "fragile")
        : "neutral";
    const broadeningState = marketData.broadeningState || "neutral";
    const supportDisplaySummary = summarizeSupportDisplayStatus();
    const anchorPanelSummary = renderPanelStatus(
        "anchor-panel-status",
        [summarizeAnchorDisplayStatus()],
        "anchor-panel-status-message"
    );
    const exportStatus = marketStatus.anchor.export;
    const earningsStatus = marketStatus.anchor.earnings;
    const broadeningStatus = marketStatus.anchor.broadening;
    const sectorStatus = marketStatus.anchor.sectorBreadth;
    const valuationStatus = marketStatus.anchor.valuation;

    const exportMonthLabel = marketData.exportLatestMonth ? formatYearMonthLabel(marketData.exportLatestMonth) : "-";
    const exportSummarySuccess = [
        marketData.exportLatestMonth ? `${exportMonthLabel} 기준` : null,
        Number.isFinite(marketData.exportYoY) ? `YoY ${formatSignedPercent(marketData.exportYoY, 1)}` : null
    ].filter(Boolean).join(" · ") || "수출 시계열 대기";
    const exportDetailSuccess = [
        marketData.exportLatestMonth ? `${exportMonthLabel} 발표월 기준` : null,
        Number.isFinite(marketData.exportYoY) ? `YoY ${formatSignedPercent(marketData.exportYoY, 1)}` : null,
        Number.isFinite(marketData.exportYoYDelta) ? `가속도 ${marketData.exportYoYDelta > 0 ? "+" : ""}${marketData.exportYoYDelta.toFixed(1)}%p` : null,
        Number.isFinite(marketData.export3mAvgYoY) ? `3개월 평균 ${formatSignedPercent(marketData.export3mAvgYoY, 1)}` : null
    ].filter(Boolean).join(" · ") || "수출 모멘텀 계산 대기";

    const earningsSummarySuccess = [
        marketData.earningsSnapshotQuarter || null,
        Number.isFinite(marketData.opIncomeBreadth) && Number.isFinite(marketData.netIncomeBreadth)
            ? `영업 ${formatNullable(marketData.opIncomeBreadth * 100, "%", 0)} / 순이익 ${formatNullable(marketData.netIncomeBreadth * 100, "%", 0)}`
            : marketData.earningsCoverageCount
                ? `${marketData.earningsCoverageCount}종목 커버`
                : null
    ].filter(Boolean).join(" · ") || "분기 실적 breadth 대기";
    const earningsDetailSuccess = [
        marketData.earningsSnapshotQuarter || null,
        marketData.earningsCoverageCount ? `${marketData.earningsCoverageCount}종목 커버` : null,
        Number.isFinite(marketData.opIncomeBreadth) ? `영업이익 breadth ${formatNullable(marketData.opIncomeBreadth * 100, "%", 0)}` : null,
        Number.isFinite(marketData.netIncomeBreadth) ? `순이익 breadth ${formatNullable(marketData.netIncomeBreadth * 100, "%", 0)}` : null,
        Number.isFinite(marketData.turnaroundBreadth) ? `턴어라운드 ${formatNullable(marketData.turnaroundBreadth * 100, "%", 0)}` : null,
        Number.isFinite(marketData.positiveRoeBreadth) ? `양의 ROE ${formatNullable(marketData.positiveRoeBreadth * 100, "%", 0)}` : null
    ].filter(Boolean).join(" · ") || "분기 실적 breadth 계산 대기";

    const broadeningSummarySuccess = [
        Number.isFinite(marketData.broadeningScore) ? `점수 ${Math.round(marketData.broadeningScore)}/30` : null,
        Number.isFinite(marketData.supportPositiveReturnBreadth) ? `20일 breadth ${formatNullable(marketData.supportPositiveReturnBreadth * 100, "%", 0)}` : null
    ].filter(Boolean).join(" · ") || "비주도주 확산 대기";
    const broadeningDetailSuccess = [
        Number.isFinite(marketData.broadeningScore) ? `확산 점수 ${Math.round(marketData.broadeningScore)}/30` : null,
        Number.isFinite(marketData.supportPositiveReturnBreadth) ? `20일 수익 breadth ${formatNullable(marketData.supportPositiveReturnBreadth * 100, "%", 0)}` : null,
        Number.isFinite(marketData.supportBreadth20d) ? `20일선 상회 ${formatNullable(marketData.supportBreadth20d * 100, "%", 0)}` : null,
        Number.isFinite(marketData.supportBreadth60d) ? `60일선 상회 ${formatNullable(marketData.supportBreadth60d * 100, "%", 0)}` : null
    ].filter(Boolean).join(" · ") || "비주도주 확산 계산 대기";

    const supportSummarySuccess = [
        Number.isFinite(marketData.fundamentalSupportScore) ? `F_support ${Math.round(marketData.fundamentalSupportScore)}/100` : null,
        getMarketRegimeCompactLabel(marketData.marketRegimeKey, marketData.marketRegimeLabel)
    ].filter(Boolean).join(" · ") || "지지력 계산 대기";

    scoreEl.innerText = Number.isFinite(marketData.fundamentalAnchorScore) ? Math.round(marketData.fundamentalAnchorScore) : "-";
    scoreEl.style.color = getAnchorStateTone(anchorState);

    const stateEl = document.getElementById("anchor-state");
    const evaluationLabel = marketData.marketEvaluationLabel || "메인 평가 대기";
    stateEl.innerHTML = [
        `<span class="${getAnchorStatePillClass(anchorState)}">${escapeHtml(getAnchorStateLabel(anchorState))}</span>`,
        `<span class="${getAnchorStatePillClass(supportState)}">지지력 ${escapeHtml(getAnchorStateLabel(supportState))}</span>`,
        `<span class="anchor-state-pill is-evaluation">${escapeHtml(evaluationLabel)}</span>`
    ].join("");
    document.getElementById("anchor-reason").innerText = compactStatusMessage(
        marketData.fundamentalAnchorReason || "수출·실적·확산 근거를 기다리는 중입니다.",
        { maxLength: 140, maxClauses: 3, fallback: "수출·실적·확산 근거를 기다리는 중입니다." }
    );
    const subnoteParts = [];
    const supportSubnote = compactStatusMessage(
        marketData.fundamentalSupportReason || supportDisplaySummary.message,
        { maxLength: 118, maxClauses: 2, fallback: "" }
    );
    if (supportSubnote) {
        subnoteParts.push(`지지력 보정: ${supportSubnote}`);
    }
    if (anchorPanelSummary.state !== "ok") {
        const inputStateSummary = compactStatusMessage(
            anchorPanelSummary.message,
            { maxLength: 118, maxClauses: 2, fallback: anchorPanelSummary.message || "" }
        );
        if (inputStateSummary) {
            subnoteParts.push(`입력 상태: ${inputStateSummary}`);
        }
    }
    document.getElementById("anchor-subnote").innerText = subnoteParts.length
        ? subnoteParts.join(" · ")
        : "세부 지지력과 누락 상태는 아래 카드에서 확인할 수 있습니다.";

    const exportStateEl = document.getElementById("anchor-export-state");
    const earningsStateEl = document.getElementById("anchor-earnings-state");
    const broadeningStateEl = document.getElementById("anchor-broadening-state");
    const supportStateEl = document.getElementById("anchor-support-state");
    exportStateEl.innerText = getAnchorStateLabel(exportState);
    earningsStateEl.innerText = getAnchorStateLabel(earningsState);
    broadeningStateEl.innerText = getAnchorStateLabel(broadeningState);
    supportStateEl.innerText = getAnchorStateLabel(supportState);
    exportStateEl.style.color = getAnchorStateTone(exportState);
    earningsStateEl.style.color = getAnchorStateTone(earningsState);
    broadeningStateEl.style.color = getAnchorStateTone(broadeningState);
    supportStateEl.style.color = getAnchorStateTone(supportState);
    setStatusBadge("anchor-export-status-badge", exportStatus);
    setStatusBadge("anchor-earnings-status-badge", earningsStatus);
    setStatusBadge("anchor-broadening-status-badge", broadeningStatus);
    setStatusBadge("anchor-support-chip-status-badge", supportDisplaySummary);

    document.getElementById("anchor-export-reason").innerText = exportStatus.state !== "ok"
        ? compactStatusMessage(exportStatus.message, { maxLength: 52, maxClauses: 2, fallback: "수출 시계열 대기" })
        : exportSummarySuccess;
    document.getElementById("anchor-earnings-reason").innerText = earningsStatus.state !== "ok"
        ? compactStatusMessage(earningsStatus.message, { maxLength: 52, maxClauses: 2, fallback: "분기 실적 breadth 대기" })
        : earningsSummarySuccess;
    document.getElementById("anchor-broadening-reason").innerText = broadeningStatus.state !== "ok"
        ? compactStatusMessage(broadeningStatus.message, { maxLength: 52, maxClauses: 2, fallback: "비주도주 확산 대기" })
        : broadeningSummarySuccess;
    document.getElementById("anchor-support-reason").innerText = supportDisplaySummary.state !== "ok"
        ? compactStatusMessage(supportDisplaySummary.message, { maxLength: 52, maxClauses: 2, fallback: "지지력 계산 대기" })
        : supportSummarySuccess;

    document.getElementById("anchor-export-month").innerText = marketData.exportLatestMonth
        ? exportMonthLabel
        : "-";
    document.getElementById("anchor-export-value").innerText = Number.isFinite(marketData.exportValueUsd)
        ? marketData.exportValueUsd.toLocaleString()
        : "-";
    document.getElementById("anchor-export-yoy").innerText = formatSignedPercent(marketData.exportYoY, 1);
    document.getElementById("anchor-export-delta").innerText = Number.isFinite(marketData.exportYoYDelta)
        ? `${marketData.exportYoYDelta > 0 ? "+" : ""}${marketData.exportYoYDelta.toFixed(1)}%p`
        : "-";
    document.getElementById("anchor-export-avg").innerText = formatSignedPercent(marketData.export3mAvgYoY, 1);
    document.getElementById("anchor-export-detail-reason").innerText = exportStatus.state !== "ok"
        ? exportStatus.message || "수출 모멘텀 계산 대기"
        : exportDetailSuccess;

    document.getElementById("anchor-earnings-quarter").innerText = marketData.earningsSnapshotQuarter || "-";
    document.getElementById("anchor-earnings-count").innerText = marketData.earningsCoverageCount ? `${marketData.earningsCoverageCount}종목` : "-";
    document.getElementById("anchor-op-breadth").innerText = formatNullable(Number.isFinite(marketData.opIncomeBreadth) ? marketData.opIncomeBreadth * 100 : null, '%', 0);
    document.getElementById("anchor-net-breadth").innerText = formatNullable(Number.isFinite(marketData.netIncomeBreadth) ? marketData.netIncomeBreadth * 100 : null, '%', 0);
    document.getElementById("anchor-turnaround").innerText = formatNullable(Number.isFinite(marketData.turnaroundBreadth) ? marketData.turnaroundBreadth * 100 : null, '%', 0);
    document.getElementById("anchor-roe").innerText = formatNullable(Number.isFinite(marketData.positiveRoeBreadth) ? marketData.positiveRoeBreadth * 100 : null, '%', 0);
    document.getElementById("anchor-earnings-detail-reason").innerText = earningsStatus.state !== "ok"
        ? earningsStatus.message || "분기 실적 breadth 계산 대기"
        : earningsDetailSuccess;

    document.getElementById("anchor-broadening-score").innerText = Number.isFinite(marketData.broadeningScore)
        ? `${Math.round(marketData.broadeningScore)}/30`
        : "-";
    document.getElementById("anchor-return20").innerText = formatNullable(Number.isFinite(marketData.supportPositiveReturnBreadth) ? marketData.supportPositiveReturnBreadth * 100 : null, '%', 0);
    document.getElementById("anchor-ma20").innerText = formatNullable(Number.isFinite(marketData.supportBreadth20d) ? marketData.supportBreadth20d * 100 : null, '%', 0);
    document.getElementById("anchor-ma60").innerText = formatNullable(Number.isFinite(marketData.supportBreadth60d) ? marketData.supportBreadth60d * 100 : null, '%', 0);
    document.getElementById("anchor-eval-link").innerText = marketData.marketAdviceStance || "-";
    document.getElementById("anchor-broadening-detail-reason").innerText = broadeningStatus.state !== "ok"
        ? broadeningStatus.message || "비주도주 확산 계산 대기"
        : broadeningDetailSuccess;

    setStatusBadge("anchor-sector-status-badge", sectorStatus);
    setStatusBadge("anchor-valuation-status-badge", valuationStatus);
    setStatusBadge("anchor-support-status-badge", supportDisplaySummary);

    document.getElementById("anchor-sector-reason").innerText = sectorStatus.state !== "ok"
        ? compactStatusMessage(sectorStatus.message, { maxLength: 92, maxClauses: 2, fallback: "업종 확산 대기" })
        : `${marketData.nonSemiconductorMomentumPassCount || 0}/${marketData.nonSemiconductorMomentumCoverageCount || 0} 업종 통과`;
    document.getElementById("anchor-valuation-reason").innerText = valuationStatus.state !== "ok"
        ? compactStatusMessage(valuationStatus.message, { maxLength: 92, maxClauses: 2, fallback: "밸류에이션 대기" })
        : Number.isFinite(marketData.marketValuationForwardPerAvg)
            ? `가중 평균 ${marketData.marketValuationForwardPerAvg.toFixed(1)}배`
            : "밸류에이션 대기";
    document.getElementById("anchor-support-detail-reason").innerText = supportDisplaySummary.state !== "ok"
        ? supportDisplaySummary.message
        : marketData.marketRegimeReason || marketData.fundamentalSupportReason || "지지력 계산 대기";

    document.getElementById("anchor-nonsemi-momentum").innerText = formatNullable(marketData.nonSemiconductorMomentum, '%', 0);
    document.getElementById("anchor-nonsemi-coverage").innerText = marketData.nonSemiconductorMomentumCoverageCount
        ? `${marketData.nonSemiconductorMomentumPassCount || 0}/${marketData.nonSemiconductorMomentumCoverageCount}`
        : "-";
    document.getElementById("anchor-valuation-stability").innerText = getValuationStabilityLabel(marketData.marketValuationStability);
    document.getElementById("anchor-valuation-forward-per").innerText = Number.isFinite(marketData.marketValuationForwardPerAvg)
        ? `${marketData.marketValuationForwardPerAvg.toFixed(1)}배`
        : "-";
    document.getElementById("anchor-fsupport-score").innerText = Number.isFinite(marketData.fundamentalSupportScore)
        ? `${Math.round(marketData.fundamentalSupportScore)}/100`
        : "-";
    const regimeLabelEl = document.getElementById("anchor-regime-label");
    regimeLabelEl.innerText = getMarketRegimeCompactLabel(marketData.marketRegimeKey, marketData.marketRegimeLabel) || "-";
    regimeLabelEl.style.color = getMarketRegimeTone(marketData.marketRegimeKey);
}

function renderSorosPanel() {
    const synergy = Number(marketData.reflexivitySynergyPoints) || 0;
    const synergyValue = document.getElementById('soros-synergy-value');
    const synergyBar = document.getElementById('soros-synergy-bar');
    const stateLabel = document.getElementById('soros-state-label');
    const stateNote = document.getElementById('soros-state-note');
    const dispValue = document.getElementById('soros-disparity-value');
    const sentValue = document.getElementById('soros-sentiment-value');
    const banner = document.getElementById('soros-debasement-banner');
    if (!synergyValue) return;
    renderPanelStatus("soros-panel-status", [marketStatus.soros], "soros-panel-status-message");

    synergyValue.innerText = synergy.toFixed(1);
    synergyBar.style.width = `${Math.min(100, (synergy / 25) * 100)}%`;

    const state = marketData.reflexivityState || 'normal';
    const labels = {
        normal: { label: '상태: 정상 (피드백 루프 없음)', color: '#cbd5e1', note: '이격도와 심리 모두 안정 구간. 정상적인 추세를 따르세요.' },
        caution: { label: '상태: 주의 (재귀 루프 형성 중)', color: '#fbbf24', note: '가격과 심리가 동조하기 시작합니다. 신규 공격 매수 속도를 늦추세요.' },
        runaway: { label: '상태: 폭주 (정점 임박)', color: '#f43f5e', note: '가격이 가격을 강화하는 폭주 구간. 분할 익절과 현금 비중 확대가 우선입니다.' }
    };
    const meta = labels[state];
    stateLabel.innerText = meta.label;
    stateLabel.style.color = meta.color;
    stateNote.innerText = marketStatus.soros.state === "ok" ? meta.note : marketStatus.soros.message;

    dispValue.innerText = formatNullable(marketData.disparity, '%', 2);
    sentValue.innerText = formatNullable(marketData.sentiment, '점', 0);
    banner.classList.toggle('hidden', !marketData.debasementAlert);
}

const KOSTOLANY_STAGE_NAMES = {
    A1: '하락 1 · 안도', A2: '하락 2 · 부인', A3: '하락 3 · 항복',
    B1: '상승 1 · 회복', B2: '상승 2 · 정석', B3: '상승 3 · 환희'
};

function renderKostolanyPanel() {
    const stage = marketData.kostolanyStage || 'B2';
    const stageLabel = document.getElementById('kostolany-stage-label');
    if (!stageLabel) return;
    renderPanelStatus("kostolany-panel-status", [marketStatus.kostolany], "kostolany-panel-status-message");

    stageLabel.innerText = `${stage} · ${KOSTOLANY_STAGE_NAMES[stage] || ''}`;
    document.getElementById('kostolany-divergence-note').innerText = marketData.kostolanyDivergenceNote || '-';
    document.getElementById('kostolany-p-index').innerText = Math.round(marketData.riskIndex || 0);
    document.getElementById('kostolany-bull-ratio').innerText = formatNullable(marketData.bullRatio, '%', 1);
    document.getElementById('kostolany-deposit').innerText = Number.isFinite(marketData.customerDeposit)
        ? `${Math.round(marketData.customerDeposit).toLocaleString()}억`
        : '-';
    const slope = marketData.customerDepositSlope;
    document.getElementById('kostolany-deposit-slope').innerText = Number.isFinite(slope)
        ? `${slope > 0 ? '+' : ''}${slope.toFixed(1)}`
        : '-';

    document.querySelectorAll('.kostolany-egg-cell').forEach(cell => {
        cell.classList.toggle('is-active', cell.dataset.egg === stage);
    });
}

function renderWyckoffPanel() {
    const body = document.getElementById('wyckoff-body');
    if (!body) return;
    const wyckoffSummary = renderPanelStatus("wyckoff-panel-status", [marketStatus.wyckoff, marketStatus.leaders], "wyckoff-panel-status-message");

    const stocks = Array.isArray(marketData.leaderStocks) ? marketData.leaderStocks : [];
    if (!stocks.length) {
        body.innerHTML = `<div class="text-[11px] text-slate-500 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50">${escapeHtml(wyckoffSummary.message || "대표주 데이터 대기 중")}</div>`;
        return;
    }

    const phaseLabel = typeof getWyckoffPhaseLabel === 'function' ? getWyckoffPhaseLabel : (p => p);
    const phaseAccent = typeof getWyckoffPhaseAccent === 'function' ? getWyckoffPhaseAccent : (() => '#64748b');

    body.innerHTML = stocks.map(stock => {
        const phase = stock.wyckoffPhase || 'NEUTRAL';
        const accent = phaseAccent(phase);
        const isNeutral = phase === 'NEUTRAL';
        const candidatePhase = stock.wyckoffCandidatePhase || 'NEUTRAL';
        const candidateLabel = phaseLabel(candidatePhase);
        const actionGuide = getWyckoffActionGuide(phase, stock.wyckoffConfidence);
        const wyckoffHistoryCount = Number(stock.historyWyckoffCount ?? stock.history60dCount) || 0;
        const investorSeriesCount = Number(stock.investorSeriesCount) || 0;
        const foreignCum = stock.foreignNetCumWyckoff ?? stock.foreignNetCum60d;
        const instCum = stock.instNetCumWyckoff ?? stock.instNetCum60d;
        const flowPeriodLabel = investorSeriesCount > 0 ? `${investorSeriesCount}일` : '-';
        const foreignTone = !Number.isFinite(foreignCum)
            ? 'text-slate-500'
            : foreignCum > 0 ? 'text-emerald-300' : 'text-rose-300';
        const instTone = !Number.isFinite(instCum)
            ? 'text-slate-500'
            : instCum > 0 ? 'text-emerald-300' : 'text-rose-300';
        const investorReason = stock.investorSeriesAvailable === false
            ? ` · ${stock.investorSeriesReason || '투자자 수급 미연동'}`
            : investorSeriesCount > 0 && investorSeriesCount < wyckoffHistoryCount
                ? ` · 수급 ${investorSeriesCount}영업일`
                : '';
        const historyReason = wyckoffHistoryCount < 120
            ? ` · 구조 ${wyckoffHistoryCount}영업일`
            : ' · 구조 120영업일';
        return `
            <div class="wyckoff-card">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-sm font-bold text-slate-100">${stock.name}</span>
                        <span class="text-[10px] text-slate-500">${stock.code} · 비중 ${(stock.weight * 100).toFixed(0)}%</span>
                    </div>
                    <div class="grid grid-cols-3 gap-x-3 gap-y-1 text-[10px]">
                        <div class="text-slate-400">15일 낙폭</div>
                        <div class="text-slate-400">외인 누적 (${flowPeriodLabel})</div>
                        <div class="text-slate-400">기관 누적 (${flowPeriodLabel})</div>
                        <div class="${stock.drawdown15dPct <= -5 ? 'text-rose-300' : 'text-slate-200'} font-mono">${formatNullable(stock.drawdown15dPct, '%', 1)}</div>
                        <div class="${foreignTone} font-mono">${Number.isFinite(foreignCum) ? foreignCum.toLocaleString() : '-'}</div>
                        <div class="${instTone} font-mono">${Number.isFinite(instCum) ? instCum.toLocaleString() : '-'}</div>
                    </div>
                    <div class="text-[10px] text-slate-500 mt-1">${stock.wyckoffReason || ''}${historyReason}${investorReason}</div>
                    <div class="text-[10px] mt-1 ${isNeutral ? 'text-amber-300' : 'text-slate-500'}">후보 단계 ${candidateLabel}${stock.wyckoffCandidateReason ? ` · ${stock.wyckoffCandidateReason}` : ''}</div>
                </div>
                <div class="text-right">
                    <span class="phase-badge-wrap" tabindex="0">
                        <span class="phase-badge ${isNeutral ? 'is-neutral' : ''}" style="${isNeutral ? '' : `background:${accent};`}">${phaseLabel(phase)}</span>
                        <span class="phase-hover-tip"><strong>${escapeHtml(actionGuide.title)}</strong>${escapeHtml(actionGuide.body)}</span>
                    </span>
                    <div class="text-[10px] text-slate-500 mt-1">${isNeutral ? '보류 신뢰도' : '신뢰도'} ${Math.round((stock.wyckoffConfidence || 0) * 100)}%</div>
                </div>
            </div>
        `;
    }).join('');
}

function renderMinskyPanel() {
    const slopeEl = document.getElementById('minsky-margin-slope');
    if (!slopeEl) return;
    const minskySummary = renderPanelStatus("minsky-panel-status", [marketStatus.minsky, marketStatus.margin], "minsky-panel-status-message");
    const slope = marketData.marginSlope;
    slopeEl.innerText = Number.isFinite(slope) ? `${slope > 0 ? '+' : ''}${slope.toFixed(2)}` : '-';
    slopeEl.style.color = slope > 0 ? '#f87171' : slope < 0 ? '#22d3ee' : '#cbd5e1';

    const ratio = marketData.depositMarginRatio;
    const ratioEl = document.getElementById('minsky-deposit-ratio');
    ratioEl.innerText = Number.isFinite(ratio) ? `${(ratio * 100).toFixed(1)}%` : '-';
    ratioEl.style.color = Number.isFinite(ratio) && ratio >= 0.20 ? '#f87171' : '#e2e8f0';
    document.getElementById('minsky-deposit-state').innerText = marketStatus.margin.state === "ok"
        ? (!Number.isFinite(ratio)
        ? '금액 기준 비율 · 데이터 부족'
        : Number.isFinite(ratio) && ratio >= 0.20
            ? '금액 기준 비율 · 폰지 임계 초과'
            : '금액 기준 비율 · 계좌 수 지표 아님')
        : minskySummary.message;

    const shock = marketData.marginShockChangePct;
    const shockEl = document.getElementById('minsky-shock-change');
    const shockStateEl = document.getElementById('minsky-shock-state');
    shockEl.innerText = Number.isFinite(shock) ? `${shock > 0 ? '+' : ''}${shock.toFixed(2)}%` : '-';
    shockEl.style.color = Number.isFinite(shock) && shock >= 0 ? '#f87171' : '#22d3ee';
    const shockAnchorLabel = marketData.shockAnchorDate
        ? (typeof formatFlowBizDateLabel === 'function' ? formatFlowBizDateLabel(marketData.shockAnchorDate) : marketData.shockAnchorDate)
        : '';
    if (Number.isFinite(shock)) {
        shockStateEl.innerText = shock >= 0
            ? '0% 이상 유지 시 마진콜 임박'
            : '충격 이후 신용이 감소 중';
    } else if (!marketData.shockAnchorDate) {
        shockStateEl.innerText = '대표주 충격일 미검출로 비교 보류';
    } else if (!Number.isFinite(marketData.marginBalanceBeforeShock)) {
        shockStateEl.innerText = `${shockAnchorLabel} 이전 기준 신용잔고 없음`;
    } else {
        shockStateEl.innerText = '비교용 신용 데이터 부족';
    }

    const trapState = marketData.trapState;
    const banner = document.getElementById('minsky-banner');
    const showBanner = (trapState === 'complacency' || trapState === 'denial') && Number.isFinite(shock) && shock >= 0;
    banner.classList.toggle('hidden', !showBanner);
}

function renderTheorySubtabs() {
    renderPanelStatus(
        "cycle-panel-status",
        [marketStatus.fx, marketStatus.vix, marketStatus.gold, marketStatus.disparity, marketStatus.flow],
        "cycle-panel-status-message"
    );
    renderFundamentalAnchorPanel();
    renderSorosPanel();
    renderKostolanyPanel();
    renderWyckoffPanel();
    renderMinskyPanel();
}

initializeWyckoffHelpModal();

async function reloadArtifactData() {
    const artifactBundle = await loadMarketArtifact(artifactViewSettings.selectedResultDate || "latest");
    marketData = { ...marketData, ...(artifactBundle.data || {}) };
    marketStatus = normalizeMarketStatus(artifactBundle.status || {});
    marketResultMeta = { ...marketResultMeta, ...(artifactBundle.meta || {}) };
    updateDashboardUI();
    calculateCycle();
    saveMarketData();
}

document.getElementById("result-date-picker")?.addEventListener("change", async event => {
    const picker = event.target;
    const nextValue = String(picker.value || "latest");
    artifactViewSettings.selectedResultDate = nextValue;
    picker.disabled = true;
    saveMarketData();
    try {
        await reloadArtifactData();
    } catch (error) {
        console.error("결과 생성본 재로드 중 오류:", error);
        alert("선택한 결과 생성본을 불러오지 못했습니다.");
    } finally {
        picker.disabled = false;
        renderResultDatePicker();
    }
});

async function initData() {
    try {
        try {
            const portfolioRes = await fetch("store/portfolio_settings.json", { cache: "no-store" });
            if (portfolioRes.ok) {
                const portfolioJson = await portfolioRes.json();
                portfolioData = { ...portfolioData, ...portfolioJson };
            }
        } catch (portfolioError) {
            console.warn("포트폴리오 기본 설정 로드 실패:", portfolioError);
        }

        loadMarketData();
        await reloadArtifactData();
    } catch (err) {
        console.error("초기 데이터 로드 중 오류:", err);
        marketStatus = inferMarketStatusFromData(marketData, "local_state");
        marketResultMeta = createResultMetaPatch({
            loadedFile: "localStorage",
            loadState: "local",
            loadMessage: `초기 로드 실패 (${err.message || "알 수 없는 오류"})`,
            sourceLabel: "브라우저 로컬 상태",
            fallbackUsed: true,
            requestedResultDate: artifactViewSettings.selectedResultDate || "latest",
            loadTargetLabel: artifactViewSettings.selectedResultDate === "latest"
                ? "최신 생성본"
                : `${artifactViewSettings.selectedResultDate} 고정`
        });
        updateDashboardUI();
        calculateCycle();
    }
}

initData();
