const assert = require("node:assert/strict");

const {
    resolveSorosStatusEntry,
    SENTIMENT_SOURCE_MANUAL_CONFIRMED,
    SENTIMENT_SOURCE_SNAPSHOT_FALLBACK,
    SENTIMENT_SOURCE_LIVE_AI
} = require("../sentiment-source.js");

const disparityOk = {
    state: "ok",
    source: "query1.finance.yahoo.com",
    message: "코스피 200일 이격도 최신 수집"
};

const disparityPartial = {
    state: "partial",
    source: "query1.finance.yahoo.com",
    message: "코스피 200일 이격도 일부만 최신화"
};

const disparityError = {
    state: "error",
    source: "query1.finance.yahoo.com",
    message: "코스피 200일 이격도 수집 실패"
};

const snapshotStatus = resolveSorosStatusEntry(disparityOk, SENTIMENT_SOURCE_SNAPSHOT_FALLBACK, true);
assert.equal(snapshotStatus.state, "partial");
assert.equal(snapshotStatus.source, "query1.finance.yahoo.com · snapshot");
assert.equal(snapshotStatus.message, "이격도 최신 수집 · 심리 입력은 최근 저장본 사용");

const manualStatus = resolveSorosStatusEntry(disparityOk, SENTIMENT_SOURCE_MANUAL_CONFIRMED, true);
assert.equal(manualStatus.state, "ok");
assert.equal(manualStatus.source, "query1.finance.yahoo.com · manual");
assert.equal(manualStatus.message, "이격도 최신 수집 · 심리 입력은 수동 확정값 사용");

const partialStatus = resolveSorosStatusEntry(disparityPartial, SENTIMENT_SOURCE_MANUAL_CONFIRMED, true);
assert.equal(partialStatus.state, "partial");
assert.equal(partialStatus.source, "query1.finance.yahoo.com · manual");
assert.equal(partialStatus.message, "이격도는 일부만 최신화 · 심리 입력은 수동 확정값 사용");

const liveStatus = resolveSorosStatusEntry(disparityOk, SENTIMENT_SOURCE_LIVE_AI, true);
assert.equal(liveStatus.state, "ok");
assert.equal(liveStatus.source, "query1.finance.yahoo.com · finance.naver.com/item/board.naver (AI)");

const missingSentimentStatus = resolveSorosStatusEntry(disparityOk, SENTIMENT_SOURCE_MANUAL_CONFIRMED, false);
assert.equal(missingSentimentStatus.state, "missing");
assert.equal(missingSentimentStatus.source, "manual");
assert.equal(missingSentimentStatus.message, "심리 입력 없음");

const errorStatus = resolveSorosStatusEntry(disparityError, SENTIMENT_SOURCE_MANUAL_CONFIRMED, true);
assert.equal(errorStatus.state, "error");
assert.match(errorStatus.message, /코스피 200일 이격도 수집 실패/);
assert.match(errorStatus.message, /심리 입력은 수동 확정값 사용/);

console.log("runtime sentiment source ok");
