function resetLeaderTrapData(reason = "대표주 데이터 미연동 (중립 처리)") {
    marketData.leaderSnapshotDate = "";
    marketData.leaderStocks = [];
    marketData.shockAnchorDate = "";
    marketData.marginBalanceBeforeShock = null;
    marketData.marginShockChangePct = null;
    marketData.trapScore = 0;
    marketData.trapState = "neutral";
    marketData.trapReason = reason;
    marketData.trapFlowScore = 0;
    marketData.trapMarginScore = 0;
    marketData.trapFirstShockScore = 0;
    marketData.trapThreeDayScore = 0;
    marketData.trapRecoveryScore = 0;
}

function setMetricDisplay(id, text, className) {
    const target = document.getElementById(id);
    if (!target) return;
    target.innerText = text;
    target.className = className;
}

async function fetchLiveFinanceData() {
    currentTimeEl.innerText = new Date().toLocaleString("ko-KR") + " 기준";
    btnSync.disabled = true;
    syncIcon.classList.add("animate-spin");
    syncText.innerText = "지표 수집 및 파싱 중...";
    log("<span class='text-amber-400 font-bold'>[START]</span> 실시간 크롤링 연동을 시작합니다.");

    try {
        marketData.previousRiskIndex = Number.isFinite(marketData.riskIndex) ? marketData.riskIndex : marketData.previousRiskIndex;
        let quantRankingHtml = "";

        try {
            log("[FX] 환율 Open API 데이터 요청 중...");
            const response = await fetch("https://open.er-api.com/v6/latest/USD");
            if (!response.ok) throw new Error("환율 API 응답 실패");
            const data = await response.json();
            if (!(data && data.rates && data.rates.KRW)) throw new Error("환율 데이터 구조 이상");
            marketData.fx = data.rates.KRW;
            setMetricDisplay("val-fx", `${marketData.fx.toLocaleString()} 원`, "font-mono font-bold text-emerald-400 text-lg");
            log(`[FX] <span class='text-emerald-400 font-bold'>성공:</span> 원/달러 ➜ <b>${marketData.fx.toLocaleString()}원</b>`);
        } catch (err) {
            log(`<span class='text-rose-400'>[FX ERROR]</span> 환율 파싱 실패(${err.message}). 디폴트 값 유지.`);
            setMetricDisplay("val-fx", `${marketData.fx.toLocaleString()} 원 (유지)`, "font-mono font-bold text-amber-500 text-lg");
        }

        try {
            log("[VIX] Yahoo/CBOE 데이터 파싱 중...");
            marketData.vix = await fetchVixValue();
            setMetricDisplay("val-vix", marketData.vix.toFixed(2), "font-mono font-bold text-emerald-400 text-lg");
            log(`[VIX] <span class='text-emerald-400 font-bold'>성공:</span> 미국 공포지수 ➜ <b>${marketData.vix.toFixed(2)}</b>`);
        } catch (err) {
            const fallbackVix = Number.isFinite(marketData.vix) && marketData.vix > 0 ? marketData.vix : 15.0;
            marketData.vix = fallbackVix;
            log(`<span class='text-rose-400'>[VIX ERROR]</span> VIX 파싱 실패(${err.message}). 기존 값 ${fallbackVix.toFixed(2)} 유지.`);
            setMetricDisplay("val-vix", `${fallbackVix.toFixed(2)} (유지)`, "font-mono font-bold text-amber-500 text-lg");
        }

        try {
            log("[SENT] 네이버 삼성전자 종토방 NLP 분석 중...");
            const html = await fetchWithProxyFallback("https://finance.naver.com/item/board.naver?code=005930", 'class="title"');
            const titles = [...html.matchAll(/<td class="title">[\s\S]*?<a[^>]*title="([^"]+)"[^>]*>/gi)].map(match => match[1]);
            if (!titles.length) throw new Error("제목 노드 찾기 실패");

            const fearKeywords = ["하락", "폭락", "손절", "한강", "망", "끝", "도망", "개미", "지옥", "곡소리", "파멸", "던져"];
            const fearScore = titles.reduce((sum, title) => sum + fearKeywords.filter(keyword => title.includes(keyword)).length, 0);
            marketData.sentiment = Math.max(0, 50 - (fearScore * 3));
            setMetricDisplay("val-sent", `${marketData.sentiment}점 (AI추정)`, "font-mono text-cyan-400 font-bold text-lg");
            document.getElementById("input-sent").value = marketData.sentiment;
            log(`[SENT] <span class='text-emerald-400 font-bold'>성공:</span> 대중 투심 ➜ <b>${marketData.sentiment}점</b>`);
        } catch (err) {
            log(`<span class='text-rose-400'>[SENT ERROR]</span> 투심 파싱 실패(${err.message}). 수동 슬라이더 유지.`);
        }

        try {
            log("[GOLD] Yahoo 차트 데이터 파싱 중...");
            marketData.gold = await fetchGoldValue();
            setMetricDisplay("val-gold", `$ ${marketData.gold.toLocaleString()}`, "font-mono font-bold text-emerald-400 text-lg");
            log(`[GOLD] <span class='text-emerald-400 font-bold'>성공:</span> 국제 금 시세 ➜ <b>$${marketData.gold.toLocaleString()}</b>`);
        } catch (err) {
            const fallbackGold = Number.isFinite(marketData.gold) && marketData.gold > 0 ? marketData.gold : 2300;
            marketData.gold = fallbackGold;
            log(`<span class='text-rose-400'>[GOLD ERROR]</span> 금 시세 파싱 실패(${err.message}). 기존 값 $${fallbackGold.toLocaleString()} 유지.`);
            setMetricDisplay("val-gold", `$ ${fallbackGold.toLocaleString()} (유지)`, "font-mono font-bold text-amber-500 text-lg");
        }

        try {
            log("[KOSPI] 코스피 1년 데이터 파싱 중...");
            const { disparity, currentPrice, sma200 } = await fetchKospiDisparityData();
            marketData.disparity = disparity;
            setMetricDisplay("val-disparity", `${marketData.disparity.toFixed(2)} %`, "font-mono font-bold text-emerald-400 text-lg");
            log(`[KOSPI] <span class='text-emerald-400 font-bold'>성공:</span> 200일선 이격도 ➜ <b>${marketData.disparity.toFixed(2)}%</b> (지수 ${currentPrice.toFixed(2)} / SMA200 ${sma200.toFixed(2)})`);
        } catch (err) {
            const fallbackDisparity = Number.isFinite(marketData.disparity) && marketData.disparity > 0 ? marketData.disparity : 100;
            marketData.disparity = fallbackDisparity;
            log(`<span class='text-rose-400'>[KOSPI ERROR]</span> 이격도 계산 실패(${err.message}). 기존 값 ${fallbackDisparity.toFixed(2)}% 유지.`);
            setMetricDisplay("val-disparity", `${fallbackDisparity.toFixed(2)} % (유지)`, "font-mono font-bold text-amber-500 text-lg");
        }

        try {
            const flowSummary = await fetchMarketInvestorFlowData();
            marketData.retailNetToday = flowSummary.retailNetToday;
            marketData.foreignNetToday = flowSummary.foreignNetToday;
            marketData.institutionNetToday = flowSummary.institutionNetToday;
            marketData.retailNet10dCum = flowSummary.retailNet10dCum;
            marketData.foreignNet10dCum = flowSummary.foreignNet10dCum;
            marketData.institutionNet10dCum = flowSummary.institutionNet10dCum;
            marketData.retailNet10dAbsAvg = flowSummary.retailNet10dAbsAvg;
            marketData.retailNet10dAbsSum = flowSummary.retailNet10dAbsSum;
            marketData.flowBizDate = flowSummary.flowBizDate;
        } catch (err) {
            setMarketFlowNeutralState();
            log(`<span class='text-rose-400'>[FLOW ERROR]</span> 시장 수급 파싱 실패(${err.message}). 수급 보정은 중립 처리합니다.`);
        }

        try {
            log("[DEAL HIGH] 네이버 거래량 상위 종목 파싱 중...");
            const html = await fetchWithProxyFallback("https://finance.naver.com/sise/sise_quant.naver");
            quantRankingHtml = html;
            const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
            let match;
            let validStocksCount = 0;
            let bullCount = 0;

            while ((match = trRegex.exec(html)) !== null && validStocksCount < 30) {
                const trContent = match[1];
                if (!trContent.includes('href="/item/main.naver')) continue;
                if (trContent.includes("ico_up.gif") || trContent.includes("ico_up02.gif") || trContent.includes('alt="상승"') || trContent.includes("red02")) {
                    bullCount += 1;
                }
                validStocksCount += 1;
            }

            if (!validStocksCount) throw new Error("종목 목록 추출 실패");
            marketData.bullRatio = (bullCount / validStocksCount) * 100;
            setMetricDisplay("val-bull-ratio", `${marketData.bullRatio.toFixed(1)} %`, "font-mono font-bold text-emerald-400 text-lg");
            log(`[DEAL HIGH] <span class='text-emerald-400 font-bold'>성공:</span> 상위 30위 중 양봉 ➜ <b>${bullCount}개 (${marketData.bullRatio.toFixed(1)}%)</b>`);
        } catch (err) {
            log(`<span class='text-rose-400'>[DEAL HIGH ERROR]</span> 양봉 비율 파싱 실패(${err.message}).`);
            setMetricDisplay("val-bull-ratio", "에러", "font-mono font-bold text-amber-500 text-lg");
        }

        const [leaderResult, marginResult] = await Promise.allSettled([
            fetchLeaderStocksData({ quantHtml: quantRankingHtml }),
            fetchMarginIndicatorData()
        ]);

        if (marginResult.status === "fulfilled") {
            marketData.marginSlope = marginResult.value.marginSlope;
            setMetricDisplay(
                "val-margin-slope",
                `${marketData.marginSlope > 0 ? "+" : ""}${marketData.marginSlope.toFixed(2)}`,
                `font-mono font-bold text-lg ${marketData.marginSlope > 0 ? "text-rose-400" : "text-cyan-400"}`
            );
            log(`[DEPOSIT] <span class='text-emerald-400 font-bold'>성공:</span> 신용잔고 기울기 ➜ <b>${marketData.marginSlope.toFixed(2)}</b>`);
            marketData.marginBalanceToday = marginResult.value.marginHistory[0]?.balance ?? null;
            marketData.customerDeposit = marginResult.value.customerDepositToday ?? null;
            marketData.customerDepositSlope = marginResult.value.customerDepositSlope ?? null;
            if (Number.isFinite(marketData.customerDeposit) && marketData.customerDeposit > 0 && Number.isFinite(marketData.marginBalanceToday)) {
                marketData.depositMarginRatio = marketData.marginBalanceToday / marketData.customerDeposit;
                log(`[DEPOSIT] 고객예탁금 ${marketData.customerDeposit.toLocaleString()}억 / 신용잔고 비율 ${(marketData.depositMarginRatio * 100).toFixed(1)}%`);
            } else {
                marketData.depositMarginRatio = null;
            }
        } else {
            log(`<span class='text-rose-400'>[DEPOSIT ERROR]</span> 신용잔고 파싱 실패(${marginResult.reason?.message || "알 수 없는 오류"}).`);
            setMetricDisplay("val-margin-slope", "에러", "font-mono font-bold text-amber-500 text-lg");
            marketData.marginBalanceToday = null;
            marketData.customerDeposit = null;
            marketData.customerDepositSlope = null;
            marketData.depositMarginRatio = null;
        }

        if (leaderResult.status === "fulfilled") {
            marketData.leaderSnapshotDate = leaderResult.value.leaderSnapshotDate;
            marketData.leaderStocks = leaderResult.value.leaderStocks;
        } else {
            resetLeaderTrapData("대표주 데이터 미연동 (중립 처리)");
            log(`<span class='text-rose-400'>[LEADER ERROR]</span> 대표주 파싱 실패(${leaderResult.reason?.message || "알 수 없는 오류"}).`);
        }

        if (leaderResult.status === "fulfilled" && marginResult.status === "fulfilled") {
            const marginContext = deriveMarginShockContext(marginResult.value.marginHistory, marketData.leaderStocks);
            marketData.shockAnchorDate = marginContext.shockAnchorDate || "";
            marketData.marginBalanceToday = marginContext.marginBalanceToday;
            marketData.marginBalanceBeforeShock = marginContext.marginBalanceBeforeShock;
            marketData.marginShockChangePct = marginContext.marginShockChangePct;
            if (marginContext.shockAnchorDate) {
                log(`[MARGIN] shock anchor ${formatFlowBizDateLabel(marginContext.shockAnchorDate)} / 기준 ${marginContext.marginBalanceBeforeShock?.toLocaleString() || "-"} / 최신 ${marginContext.marginBalanceToday?.toLocaleString() || "-"} / 변화 ${Number.isFinite(marginContext.marginShockChangePct) ? `${marginContext.marginShockChangePct.toFixed(2)}%` : "-"}`);
            } else {
                log("[MARGIN] 대표주 shock anchor 미검출. 신용 비교는 중립 처리합니다.");
            }
        } else if (leaderResult.status === "fulfilled") {
            marketData.shockAnchorDate = "";
            marketData.marginBalanceBeforeShock = null;
            marketData.marginShockChangePct = null;
        }

        marketData.lastSyncTime = new Date().toLocaleString("ko-KR");
        document.getElementById("current-time").innerText = `마지막 동기화: ${marketData.lastSyncTime}`;
        document.getElementById("data-status").innerText = "실시간 동기화 완료";
        document.getElementById("data-status").className = "text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded";

        calculateCycle();
        saveMarketData();
    } catch (err) {
        log(`<span class='text-rose-400'>[SYNC ERROR]</span> 동기화가 중단되었습니다 (${err.message || "알 수 없는 오류"}). 기존 값으로 유지합니다.`);
        document.getElementById("data-status").innerText = "동기화 오류 (기존 값 유지)";
        document.getElementById("data-status").className = "text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded";
    } finally {
        btnSync.disabled = false;
        syncIcon.classList.remove("animate-spin");
        syncText.innerText = "실시간 데이터 동기화";
    }
}
