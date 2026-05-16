// 다중 프록시 폴백을 지원하는 범용 크롤링 엔진
async function fetchWithProxyFallback(targetUrl, validationKeyword = "") {
    const proxies = [
        { url: `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`, type: 'text' },
        { url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`, type: 'text' },
        { url: `https://corsproxy.org/?${encodeURIComponent(targetUrl)}`, type: 'text' },
        { url: `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`, type: 'json' }
    ];

    let lastError;
    for (const proxy of proxies) {
        try {
            const hostName = proxy.url.split('/')[2];
            log(`- ${hostName} 접속 시도 중...`);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃으로 연장
            
            const response = await fetch(proxy.url, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            let text = "";
            if (proxy.type === 'json') {
                const data = await response.json();
                if (!data.contents) throw new Error("빈 데이터 응답");
                text = data.contents;
            } else {
                text = await response.text();
            }
            
            if (text.length < 100) throw new Error("비정상적인 짧은 응답(차단 의심)");
            if (validationKeyword && !text.includes(validationKeyword)) {
                throw new Error("웹 방화벽 차단 페이지 응답 의심");
            }
            return text;
        } catch (err) {
            let errMsg = err.message;
            if(errMsg.includes('signal is aborted')) errMsg = '타임아웃(10초 초과)';
            log(`<span class="text-amber-500/80 text-[10px]">- 프록시 실패: ${errMsg}</span>`);
            lastError = err;
        }
    }
    throw new Error(`모든 프록시 서버 응답 실패 (${lastError?.message})`);
}

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

    // 2. VIX 공포지수 정보 수집 (Yahoo Finance API 전환)
    try {
        log("[VIX] Yahoo Finance API 파싱 중...");
        const jsonStr = await fetchWithProxyFallback("https://query1.finance.yahoo.com/v8/finance/chart/^VIX", "regularMarketPrice");
        
        let vixVal;
        try {
            const data = JSON.parse(jsonStr);
            vixVal = data.chart.result[0].meta.regularMarketPrice;
        } catch(e) {
            // 원시 텍스트에서 정규식 추출 시도
            const match = jsonStr.match(/"regularMarketPrice"\s*:\s*([\d.]+)/);
            if (match && match[1]) {
                vixVal = parseFloat(match[1]);
            } else {
                throw new Error("VIX JSON/정규식 파싱 완전 실패");
            }
        }
        
        if (!vixVal) throw new Error("VIX 데이터 구조 이상");

        marketData.vix = vixVal;
        document.getElementById('val-vix').innerText = marketData.vix.toFixed(2);
        document.getElementById('val-vix').className = "font-mono font-bold text-emerald-400 text-lg";
        log(`[VIX] <span class='text-emerald-400 font-bold'>성공:</span> 미국 공포지수 ➜ <b>${marketData.vix}</b>`);
    } catch (err) {
        log(`<span class='text-rose-400'>[VIX ERROR]</span> VIX 파싱 실패(${err.message}). 디폴트(15.0) 유지.`);
        document.getElementById('val-vix').innerText = "15.0 (에러)";
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

    // 4. 국제 금 시세 (Yahoo Finance API)
    try {
        log("[GOLD] Yahoo Finance API 파싱 중...");
        const jsonStr = await fetchWithProxyFallback("https://query1.finance.yahoo.com/v8/finance/chart/GC=F", "regularMarketPrice");
        
        let goldVal;
        try {
            const data = JSON.parse(jsonStr);
            goldVal = data.chart.result[0].meta.regularMarketPrice;
        } catch(e) {
            const match = jsonStr.match(/"regularMarketPrice"\s*:\s*([\d.]+)/);
            if (match && match[1]) goldVal = parseFloat(match[1]);
            else throw new Error("금 시세 파싱 실패");
        }
        
        if (!goldVal) throw new Error("금 데이터 이상");

        marketData.gold = goldVal;
        document.getElementById('val-gold').innerText = "$ " + marketData.gold.toLocaleString();
        document.getElementById('val-gold').className = "font-mono font-bold text-emerald-400 text-lg";
        log(`[GOLD] <span class='text-emerald-400 font-bold'>성공:</span> 국제 금 시세 ➜ <b>$${marketData.gold.toLocaleString()}</b>`);
    } catch (err) {
        log(`<span class='text-rose-400'>[GOLD ERROR]</span> 금 시세 파싱 실패(${err.message}).`);
        document.getElementById('val-gold').innerText = "에러";
        document.getElementById('val-gold').className = "font-mono font-bold text-amber-500 text-lg";
    }

    // 5. 코스피 200일선 이격도 계산 (Yahoo Finance ^KS11)
    try {
        log("[KOSPI] 코스피 1년 데이터 파싱 중 (Direct API)...");
        const response = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/^KS11?range=1y&interval=1d");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        const result = data.chart.result[0];
        const closes = result.indicators.quote[0].close;
        const validCloses = closes.filter(c => c !== null);
        
        if (validCloses.length < 200) throw new Error("200일치 데이터 부족");
        
        const currentPrice = validCloses[validCloses.length - 1];
        const sma200 = validCloses.slice(-200).reduce((a,b) => a+b, 0) / 200;
        const disparity = (currentPrice / sma200) * 100;

        marketData.disparity = disparity;
        document.getElementById('val-disparity').innerText = marketData.disparity.toFixed(2) + " %";
        document.getElementById('val-disparity').className = "font-mono font-bold text-emerald-400 text-lg";
        log(`[KOSPI] <span class='text-emerald-400 font-bold'>성공:</span> 200일선 이격도 ➜ <b>${marketData.disparity.toFixed(2)}%</b>`);
    } catch (err) {
        log(`<span class='text-rose-400'>[KOSPI ERROR]</span> 이격도 계산 실패(${err.message}).`);
        document.getElementById('val-disparity').innerText = "100.00 % (디폴트)";
        document.getElementById('val-disparity').className = "font-mono font-bold text-amber-500 text-lg";
    }

    // 6. 거래량 상위 주도주 양봉 마감 비율
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

    // 7. 신용융자 잔고 5일 기울기 (OLS)
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
    saveMarketData(); // 로컬 스토리지에 데이터 영구 저장
    
    document.getElementById('current-time').innerText = "마지막 동기화: " + marketData.lastSyncTime;
    document.getElementById('data-status').innerText = "실시간 동기화 완료";
    document.getElementById('data-status').className = "text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded";
    calculateCycle();
    
    btnSync.disabled = false;
    syncIcon.classList.remove('animate-spin');
    syncText.innerText = "실시간 데이터 동기화";
}
