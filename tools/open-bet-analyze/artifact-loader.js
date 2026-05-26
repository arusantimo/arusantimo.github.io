const RESULT_VAR = "window.__OPEN_BET_RESULT__";

function getEmbeddedResult() {
    if (typeof window !== "undefined" && window.__OPEN_BET_RESULT__) {
        return window.__OPEN_BET_RESULT__;
    }
    return null;
}

async function loadLatestResult() {
    const embedded = getEmbeddedResult();
    if (embedded) {
        return embedded;
    }
    const response = await fetch("store/results/latest.json", { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`결과 파일을 읽지 못했습니다 (${response.status})`);
    }
    return response.json();
}

window.OpenBetArtifactLoader = {
    getEmbeddedResult,
    loadLatestResult,
};
