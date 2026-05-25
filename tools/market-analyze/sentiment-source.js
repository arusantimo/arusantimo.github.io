(function (root) {
    const SENTIMENT_SOURCE_LIVE_AI = "live-ai";
    const SENTIMENT_SOURCE_MANUAL_CONFIRMED = "manual-confirmed";
    const SENTIMENT_SOURCE_SNAPSHOT_FALLBACK = "snapshot-fallback";
    const STATUS_PRIORITY = {
        ok: 0,
        partial: 1,
        missing: 2,
        error: 3
    };
    const VALID_SENTIMENT_SOURCES = new Set([
        SENTIMENT_SOURCE_LIVE_AI,
        SENTIMENT_SOURCE_MANUAL_CONFIRMED,
        SENTIMENT_SOURCE_SNAPSHOT_FALLBACK
    ]);
    const SENTIMENT_SOURCE_LABELS = {
        [SENTIMENT_SOURCE_LIVE_AI]: "AI추정",
        [SENTIMENT_SOURCE_MANUAL_CONFIRMED]: "수동 확정",
        [SENTIMENT_SOURCE_SNAPSHOT_FALLBACK]: "저장본"
    };
    const SENTIMENT_SOURCE_MESSAGES = {
        [SENTIMENT_SOURCE_LIVE_AI]: "심리 입력은 종토방 AI 추정 최신값 사용",
        [SENTIMENT_SOURCE_MANUAL_CONFIRMED]: "심리 입력은 수동 확정값 사용",
        [SENTIMENT_SOURCE_SNAPSHOT_FALLBACK]: "심리 입력은 최근 저장본 사용"
    };
    const SENTIMENT_SOURCE_STATUS_SOURCES = {
        [SENTIMENT_SOURCE_LIVE_AI]: "finance.naver.com/item/board.naver (AI)",
        [SENTIMENT_SOURCE_MANUAL_CONFIRMED]: "manual",
        [SENTIMENT_SOURCE_SNAPSHOT_FALLBACK]: "snapshot"
    };

    function normalizeSentimentSource(source, hasSentiment = false) {
        const raw = String(source || "").trim();
        if (VALID_SENTIMENT_SOURCES.has(raw)) return raw;
        return hasSentiment ? SENTIMENT_SOURCE_SNAPSHOT_FALLBACK : "";
    }

    function getSentimentSourceLabel(source, hasSentiment = false) {
        return SENTIMENT_SOURCE_LABELS[normalizeSentimentSource(source, hasSentiment)] || "미확인";
    }

    function getSentimentSourceMessage(source, hasSentiment = false) {
        return SENTIMENT_SOURCE_MESSAGES[normalizeSentimentSource(source, hasSentiment)] || "심리 입력 출처 미확인";
    }

    function getSentimentStatusState(source, hasSentiment = false) {
        const normalized = normalizeSentimentSource(source, hasSentiment);
        if (normalized === SENTIMENT_SOURCE_LIVE_AI || normalized === SENTIMENT_SOURCE_MANUAL_CONFIRMED) return "ok";
        if (normalized === SENTIMENT_SOURCE_SNAPSHOT_FALLBACK) return "partial";
        return "missing";
    }

    function getSentimentStatusSource(source, hasSentiment = false) {
        return SENTIMENT_SOURCE_STATUS_SOURCES[normalizeSentimentSource(source, hasSentiment)] || "manual";
    }

    function createRuntimeStatusEntry(state = "missing", source = "artifact", message = "데이터 대기 중") {
        return { state, source, message };
    }

    function summarizeRuntimeStatusEntries(entries = []) {
        const validEntries = entries.filter(Boolean);
        if (!validEntries.length) {
            return createRuntimeStatusEntry("missing", "artifact", "상태 정보가 없습니다.");
        }

        const worst = validEntries.reduce((currentWorst, entry) => {
            if (!currentWorst) return entry;
            const nextPriority = STATUS_PRIORITY[entry.state] ?? STATUS_PRIORITY.missing;
            const currentPriority = STATUS_PRIORITY[currentWorst.state] ?? STATUS_PRIORITY.missing;
            return nextPriority > currentPriority ? entry : currentWorst;
        }, null);

        const sources = [...new Set(validEntries.map(entry => entry.source).filter(Boolean))];
        const messages = [...new Set(validEntries.map(entry => entry.message).filter(Boolean))];

        return createRuntimeStatusEntry(
            worst?.state || "missing",
            sources.join(" · ") || worst?.source || "artifact",
            messages.join(" · ") || worst?.message || "상태 정보가 없습니다."
        );
    }

    function resolveSorosStatusEntry(disparityStatus, sentimentSource, hasSentiment = false) {
        const normalizedDisparity = disparityStatus && typeof disparityStatus === "object"
            ? createRuntimeStatusEntry(
                disparityStatus.state || "missing",
                disparityStatus.source || "artifact",
                disparityStatus.message || "이격도 결과 대기 중"
            )
            : createRuntimeStatusEntry("missing", "artifact", "이격도 결과 대기 중");

        if (!hasSentiment) {
            return createRuntimeStatusEntry("missing", "manual", "심리 입력 없음");
        }

        const source = `${normalizedDisparity.source} · ${getSentimentStatusSource(sentimentSource, true)}`;
        if (normalizedDisparity.state === "ok") {
            return createRuntimeStatusEntry(
                getSentimentStatusState(sentimentSource, true),
                source,
                `이격도 최신 수집 · ${getSentimentSourceMessage(sentimentSource, true)}`
            );
        }

        if (normalizedDisparity.state === "partial") {
            return createRuntimeStatusEntry(
                "partial",
                source,
                `이격도는 일부만 최신화 · ${getSentimentSourceMessage(sentimentSource, true)}`
            );
        }

        return summarizeRuntimeStatusEntries([
            normalizedDisparity,
            createRuntimeStatusEntry(
                getSentimentStatusState(sentimentSource, true),
                getSentimentStatusSource(sentimentSource, true),
                getSentimentSourceMessage(sentimentSource, true)
            )
        ]);
    }

    const api = {
        SENTIMENT_SOURCE_LIVE_AI,
        SENTIMENT_SOURCE_MANUAL_CONFIRMED,
        SENTIMENT_SOURCE_SNAPSHOT_FALLBACK,
        normalizeSentimentSource,
        getSentimentSourceLabel,
        getSentimentSourceMessage,
        getSentimentStatusState,
        getSentimentStatusSource,
        resolveSorosStatusEntry
    };

    Object.assign(root, api);
    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }
})(typeof globalThis !== "undefined" ? globalThis : this);
