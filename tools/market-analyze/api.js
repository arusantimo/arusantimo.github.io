// 실시간 크롤링 및 파싱 핵심 엔진
async function fetchLiveFinanceData() {
    currentTimeEl.innerText = new Date().toLocaleString('ko-KR') + " 기준";
    btnSync.disabled = true;
    syncIcon.classList.add('animate-spin');
    syncText.innerText = "지표 수집 및 파싱 중...";
    
    log("<span class='text-amber-400 font-bold'>[START]</span> 실시간 크롤링 연동을 시작합니다.");
    
    // 1. 환율 정보 수집 (API 직접 호출로 전환)
    try {
        log("[FX] 환율 Open API 데이터 요청 중...");
        // 공공/무료 환율 API 사용 (CORS 프리패스)
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) throw new Error("환율 API 응답 실패");
        const data = await response.json();
        
        if (data && data.rates && data.rates.KRW) {
            marketData.fx = data.rates.KRW;
            document.getElementById('val-fx').innerText = marketData.fx.toLocaleString() + " 원";
            document.getElementById('val-fx').className = "font-mono font-bold text-emerald-400 text-lg";
            log(`[FX] <span class='text-emerald-400 font-bold'>성공:</span> 원/달러 ➜ <b>${marketData.fx}원</b>`);
        } else {
            throw new Error("환율 데이터 구조 이상");
        }
    } catch (err) {
        log(`<span class='text-rose-400'>[FX ERROR]</span> 환율 파싱 실패(${err.message}). 디폴트(1,350) 유지.`);
        document.getElementById('val-fx').innerText = "1,350원 (에러)";
        document.getElementById('val-fx').className = "font-mono font-bold text-amber-500 text-lg";
    }

    // 2. VIX 공포지수 정보 수집 (Yahoo 차트 + CBOE CSV 폴백)
    try {
        log("[VIX] Yahoo/CBOE 데이터 파싱 중...");
        const vixVal = await fetchVixValue();
        marketData.vix = vixVal;
        document.getElementById('val-vix').innerText = marketData.vix.toFixed(2);
        document.getElementById('val-vix').className = "font-mono font-bold text-emerald-400 text-lg";
        log(`[VIX] <span class='text-emerald-400 font-bold'>성공:</span> 미국 공포지수 ➜ <b>${marketData.vix}</b>`);
    } catch (err) {
        const hasPreviousVix = !!marketData.lastSyncTime || marketData.vix !== 15.0;
        const fallbackVix = Number.isFinite(marketData.vix) && marketData.vix > 0 ? marketData.vix : 15.0;
        marketData.vix = fallbackVix;
        log(`<span class='text-rose-400'>[VIX ERROR]</span> VIX 파싱 실패(${err.message}). ${hasPreviousVix ? `기존 값 ${fallbackVix.toFixed(2)} 유지.` : "기본값(15.0) 유지."}`);
        document.getElementById('val-vix').innerText = hasPreviousVix ? `${fallbackVix.toFixed(2)} (유지)` : "15.00 (에러)";
        document.getElementById('val-vix').className = "font-mono font-bold text-amber-500 text-lg";
    }

    // 3. 종토방 대중 심리 보정 (삼성전자)
    try {
        log("[SENT] 네이버 삼성전자 종토방 NLP 분석 중...");
        // 'td class="title"' 키워드로 네이버 웹 방화벽 차단(Captcha) 페이지 우회 검증
        const html = await fetchWithProxyFallback("https://finance.naver.com/item/board.naver?code=005930", "title");
        
        const titles = [];
        const titleRegex = /<td class="title">[\s\S]*?<a[^>]*title="([^"]+)"[^>]*>/gi;
        let match;
        while ((match = titleRegex.exec(html)) !== null) {
            titles.push(match[1]);
        }
        
        if (titles.length > 0) {
            let fearScore = 0;
            const fearKeywords = ['하락', '폭락', '손절', '한강', '망', '끝', '도망', '개미', '지옥', '곡소리', '파멸', '던져'];
            
            titles.forEach(title => {
                fearKeywords.forEach(kw => {
                    if (title.includes(kw)) fearScore += 1;
                });
            });
            
            log(`[SENT] 1페이지 파싱 완료. 공포 단어 빈도: ${fearScore}회`);
            
            let newSentiment = Math.max(0, 50 - (fearScore * 3));
            marketData.sentiment = newSentiment;
            document.getElementById('val-sent').innerText = marketData.sentiment + "점 (AI추정)";
            document.getElementById('val-sent').className = "font-mono text-cyan-400 font-bold text-lg";
            document.getElementById('input-sent').value = marketData.sentiment;
            log(`[SENT] <span class='text-emerald-400 font-bold'>성공:</span> 대중 투심 ➜ <b>${marketData.sentiment}점</b>`);
        } else {
            throw new Error("제목 노드 찾기 실패(구조 변경 또는 차단)");
        }
    } catch (err) {
        log(`<span class='text-rose-400'>[SENT ERROR]</span> 투심 파싱 실패(${err.message}). 수동 슬라이더 유지.`);
    }

    // 4. 국제 금 시세 (Yahoo 차트 기반, 재시도 + 마지막 정상값 유지)
    try {
        log("[GOLD] Yahoo 차트 데이터 파싱 중...");
        const goldVal = await fetchGoldValue();
        marketData.gold = goldVal;
        document.getElementById('val-gold').innerText = "$ " + marketData.gold.toLocaleString();
        document.getElementById('val-gold').className = "font-mono font-bold text-emerald-400 text-lg";
        log(`[GOLD] <span class='text-emerald-400 font-bold'>성공:</span> 국제 금 시세 ➜ <b>$${marketData.gold.toLocaleString()}</b>`);
    } catch (err) {
        const hasPreviousGold = !!marketData.lastSyncTime || marketData.gold !== 2300;
        const fallbackGold = Number.isFinite(marketData.gold) && marketData.gold > 0 ? marketData.gold : 2300;
        marketData.gold = fallbackGold;
        log(`<span class='text-rose-400'>[GOLD ERROR]</span> 금 시세 파싱 실패(${err.message}). ${hasPreviousGold ? `기존 값 $${fallbackGold.toLocaleString()} 유지.` : "기본값($2,300) 유지."}`);
        document.getElementById('val-gold').innerText = hasPreviousGold ? `$ ${fallbackGold.toLocaleString()} (유지)` : "$ 2,300 (기본)";
        document.getElementById('val-gold').className = "font-mono font-bold text-amber-500 text-lg";
    }

    // 5. 코스피 200일선 이격도 계산 (Yahoo 차트 + 네이버 일별 지수 폴백)
    try {
        log("[KOSPI] 코스피 1년 데이터 파싱 중...");
        const { disparity, currentPrice, sma200 } = await fetchKospiDisparityData();
        marketData.disparity = disparity;
        document.getElementById('val-disparity').innerText = marketData.disparity.toFixed(2) + " %";
        document.getElementById('val-disparity').className = "font-mono font-bold text-emerald-400 text-lg";
        log(`[KOSPI] <span class='text-emerald-400 font-bold'>성공:</span> 200일선 이격도 ➜ <b>${marketData.disparity.toFixed(2)}%</b> (지수 ${currentPrice.toFixed(2)} / SMA200 ${sma200.toFixed(2)})`);
    } catch (err) {
        const hasPreviousDisparity = !!marketData.lastSyncTime || marketData.disparity !== 100;
        const fallbackDisparity = Number.isFinite(marketData.disparity) && marketData.disparity > 0 ? marketData.disparity : 100;
        marketData.disparity = fallbackDisparity;
        log(`<span class='text-rose-400'>[KOSPI ERROR]</span> 이격도 계산 실패(${err.message}). ${hasPreviousDisparity ? `기존 값 ${fallbackDisparity.toFixed(2)}% 유지.` : "기본값(100.00%) 유지."}`);
        document.getElementById('val-disparity').innerText = hasPreviousDisparity ? `${fallbackDisparity.toFixed(2)} % (유지)` : "100.00 % (에러)";
        document.getElementById('val-disparity').className = "font-mono font-bold text-amber-500 text-lg";
    }

    // 6. 시장 전체 수급 (KOSPI + KOSDAQ, 최근 10영업일)
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

    // 7. 거래량 상위 주도주 양봉 마감 비율
    try {
        log("[DEAL HIGH] 네이버 거래량 상위 종목 파싱 중...");
        // sise_deal_high는 폐쇄되었으므로 거래상위(sise_quant) 페이지 활용
        const html = await fetchWithProxyFallback("https://finance.naver.com/sise/sise_quant.naver");
        
        const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
        let match;
        let validStocksCount = 0;
        let bullCount = 0;
        
        while ((match = trRegex.exec(html)) !== null && validStocksCount < 30) {
            const trContent = match[1];
            if (trContent.includes('href="/item/main.naver')) {
                // 상승(ico_up) 아이콘을 통해 양봉/상승 여부 판별 (네이버 UI 구조 변경 대응)
                if (trContent.includes('ico_up.gif') || trContent.includes('ico_up02.gif') || trContent.includes('alt="상승"') || trContent.includes('red02')) {
                    bullCount++;
                }
                validStocksCount++;
            }
        }
        
        if (validStocksCount === 0) throw new Error("종목 목록 추출 실패");
        const bullRatio = (bullCount / validStocksCount) * 100;
        marketData.bullRatio = bullRatio;
        
        document.getElementById('val-bull-ratio').innerText = marketData.bullRatio.toFixed(1) + " %";
        document.getElementById('val-bull-ratio').className = "font-mono font-bold text-emerald-400 text-lg";
        log(`[DEAL HIGH] <span class='text-emerald-400 font-bold'>성공:</span> 상위 30위 중 양봉 ➜ <b>${bullCount}개 (${bullRatio.toFixed(1)}%)</b>`);
    } catch(err) {
        log(`<span class='text-rose-400'>[DEAL HIGH ERROR]</span> 양봉 비율 파싱 실패(${err.message}).`);
        document.getElementById('val-bull-ratio').innerText = "에러";
        document.getElementById('val-bull-ratio').className = "font-mono font-bold text-amber-500 text-lg";
    }

    // 8. 신용융자 잔고 5일 기울기 (OLS)
    try {
        log("[DEPOSIT] 증시자금동향 신용잔고 파싱 중...");
        const html = await fetchWithProxyFallback("https://finance.naver.com/sise/sise_deposit.naver");
        
        const trRegex = /<tr>\s*<td class="date">([\s\S]*?)<\/tr>/gi;
        const loans = [];
        let match;
        
        while ((match = trRegex.exec(html)) !== null && loans.length < 5) {
            const trContent = match[1];
            // 태그와 무관하게 모든 td 추출
            const tdMatches = trContent.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
            if (tdMatches && tdMatches.length >= 5) {
                // 5번째 값 (index 4)이 신용융자잔고
                const loanStr = tdMatches[4].replace(/<[^>]+>/g, '').replace(/,/g, '').trim();
                const loanVal = parseFloat(loanStr);
                if(!isNaN(loanVal)) {
                    loans.push(loanVal);
                }
            }
        }
        
        if (loans.length < 5) throw new Error("최근 5일 데이터 확보 실패");
        
        loans.reverse(); // 가장 오래된 데이터가 1번
        const X = [1, 2, 3, 4, 5];
        const Y = loans;
        
        const sumX = X.reduce((a,b)=>a+b, 0);
        const sumY = Y.reduce((a,b)=>a+b, 0);
        const sumXY = X.map((x,i)=> x*Y[i]).reduce((a,b)=>a+b, 0);
        const sumX2 = X.map(x=>x*x).reduce((a,b)=>a+b, 0);
        
        const slope = (5 * sumXY - sumX * sumY) / (5 * sumX2 - sumX * sumX);
        marketData.marginSlope = slope;
        
        document.getElementById('val-margin-slope').innerText = (slope > 0 ? "+" : "") + slope.toFixed(2);
        document.getElementById('val-margin-slope').className = `font-mono font-bold text-lg ${slope > 0 ? 'text-rose-400' : 'text-cyan-400'}`;
        log(`[DEPOSIT] <span class='text-emerald-400 font-bold'>성공:</span> 신용잔고 기울기 ➜ <b>${slope.toFixed(2)}</b>`);
    } catch(err) {
        log(`<span class='text-rose-400'>[DEPOSIT ERROR]</span> 신용잔고 기울기 파싱 실패(${err.message}).`);
        document.getElementById('val-margin-slope').innerText = "에러";
        document.getElementById('val-margin-slope').className = "font-mono font-bold text-amber-500 text-lg";
    }

    // 대시보드 계산 로직 구동 및 상태 초기화
    marketData.lastSyncTime = new Date().toLocaleString('ko-KR');
    document.getElementById('current-time').innerText = "마지막 동기화: " + marketData.lastSyncTime;
    document.getElementById('data-status').innerText = "실시간 동기화 완료";
    document.getElementById('data-status').className = "text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded";
    calculateCycle();
    saveMarketData(); // 계산 결과(flowBonus/flowReason 포함)까지 로컬 저장
    
    btnSync.disabled = false;
    syncIcon.classList.remove('animate-spin');
    syncText.innerText = "실시간 데이터 동기화";
}
