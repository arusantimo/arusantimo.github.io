// 하워드 막스-제임스 리카즈 시계추 산출 퀀트 엔진 v3.7
function calculateCycle() {
    const { fx, vix, sentiment, disparity, bullRatio, marginSlope } = marketData;

    // 1. 매크로 스트레스 지수 (Macro Stress Index: M_stress) 연산
    let f_fx = 0;
    if (fx >= 1450) f_fx = 1.5;
    else if (fx >= 1420) f_fx = 1.0;
    else if (fx >= 1350) f_fx = 0.5;
    
    let g_vix = 0;
    if (vix >= 30) g_vix = 1.5;
    else if (vix >= 22) g_vix = 1.0;
    else if (vix >= 15) g_vix = 0.5;

    let m_stress = (40 * f_fx) + (30 * g_vix);
    m_stress = Math.min(70, m_stress);

    // 2. 증시 탐욕 지수 (Equity Greed Index: E_greed) 연산
    // I_disparity: 200일선 이격도(disparity)와 거래대금 양봉 비율(bullRatio) 혼합
    let i_disparity = Math.max(0, (disparity - 95)) * 2; // 이격도가 높을수록 탐욕
    i_disparity = Math.min(100, i_disparity + (bullRatio * 0.5));
    
    // L_credit: 신용잔고 5일 기울기 반영
    let l_credit = Math.max(0, marginSlope * 50); // 기울기 수치에 비례
    l_credit = Math.min(100, l_credit);

    // S_text: 종토방 투심 점수 (0~100)
    let s_text = sentiment;

    let e_greed = (i_disparity * 0.4) + (l_credit * 0.3) + (s_text * 0.3);
    e_greed = Math.min(100, Math.max(0, e_greed));

    // 3. 종합 마켓 시계추 지수 (Pendulum Base Index: P_index)
    let p_index = 50 + (e_greed - m_stress);
    p_index = Math.max(0, Math.min(100, p_index));

    // 4. 제임스 리카즈 오버라이드 제어 필터 (디커플링 모순)
    let isDebasement = false;
    if (fx >= 1450 && i_disparity >= 75) {
        isDebasement = true;
        p_index = Math.max(p_index, 85); // 강제로 Stage 6(환희/화폐몰락) 구간으로 밀어넣음
    }

    let riskIndex = p_index;

    // UI 바인딩 및 프로그레스 바 연동
    document.getElementById('pendulum-score').innerText = `(종합 리스크 심리 P-Index: ${Math.round(riskIndex)}/100)`;
    
    // 스텝퍼 라인 업데이트
    const stepperLine = document.getElementById('stepper-line');
    stepperLine.style.width = `${riskIndex}%`;

    const cycleCard = document.getElementById('cycle-card');
    const cycleStatus = document.getElementById('cycle-status');
    const cycleDesc = document.getElementById('cycle-desc');
    const coreRatio = document.getElementById('guide-core-ratio');
    const coreText = document.getElementById('guide-core-text');
    const satRatio = document.getElementById('guide-sat-ratio');
    const satText = document.getElementById('guide-sat-text');

    // 스텝퍼 DOM 요소
    const circles = [];
    const labels = [];
    for(let i=1; i<=6; i++) {
        circles.push(document.getElementById(`step-${i}-circle`));
        labels.push(document.getElementById(`step-${i}-label`));
    }

    // 스텝퍼 초기화
    circles.forEach(el => {
        el.className = "w-5 h-5 md:w-7 md:h-7 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center transition-all duration-500 shadow-md";
        el.firstElementChild.className = "text-[10px] font-bold text-slate-400";
    });
    labels.forEach(el => {
        el.className = "absolute top-8 whitespace-nowrap text-[10px] md:text-xs font-semibold text-slate-400 mt-1";
    });
    stepperLine.className = "absolute left-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full z-0 transition-all duration-500 bg-slate-500";

    const stageConfigs = [
        { limit: 20, bgClass: 'bg-cyan-500', borderClass: 'border-cyan-500', shadowClass: 'shadow-cyan-500/30', textClass: 'text-cyan-500', name: '1단계: 극단적 공포 (패닉 셀링)', desc: '모든 사람들이 상황이 악화될 수밖에 없다고 확신하며 자산을 던지는 시기입니다. 역사적으로 가장 매력적인 저가 매수 기회입니다.' },
        { limit: 35, bgClass: 'bg-sky-400', borderClass: 'border-sky-400', shadowClass: 'shadow-sky-400/30', textClass: 'text-sky-400', name: '2단계: 비관 속 태동', desc: '여전히 시장에 비관론이 팽배하지만, 소수의 선각자들만이 상황이 호전될 것이라고 믿고 조용히 매집을 시작하는 단계입니다.' },
        { limit: 50, bgClass: 'bg-emerald-400', borderClass: 'border-emerald-400', shadowClass: 'shadow-emerald-400/30', textClass: 'text-emerald-400', name: '3단계: 회의 속 성장', desc: '상황이 점진적으로 호전되고 있음을 일부가 눈치채기 시작합니다. 시장은 서서히 반등하며 펀더멘털에 수렴해 나갑니다.' },
        { limit: 65, bgClass: 'bg-amber-400', borderClass: 'border-amber-400', shadowClass: 'shadow-amber-400/30', textClass: 'text-amber-400', name: '4단계: 낙관주의 확산', desc: '경계심이 저하되고 다수의 투자자가 강세장임을 확신합니다. 소수의 신중한 투자자는 영원한 장밋빛은 없음을 인지하기 시작합니다.' },
        { limit: 80, bgClass: 'bg-orange-500', borderClass: 'border-orange-500', shadowClass: 'shadow-orange-500/30', textClass: 'text-orange-500', name: '5단계: 탐욕과 과열', desc: '대부분의 투자자들이 맹목적으로 시장의 상승을 추종하며 위험을 망각합니다. 빚투(레버리지)가 증가하는 시기입니다.' },
        { limit: 100, bgClass: 'bg-rose-500', borderClass: 'border-rose-500', shadowClass: 'shadow-rose-500/30', textClass: 'text-rose-500', name: '6단계: 극단적 환희 (버블)', desc: '모든 사람들이 상황이 영원히 호전될 것이라고 결론짓고 최고점에서 매수하는 거품 국면입니다. 곧 폭락이 시작될 위험이 큽니다.' }
    ];

    let currentStageIdx = stageConfigs.findIndex(c => riskIndex <= c.limit);
    if (currentStageIdx === -1) currentStageIdx = 5;
    
    // 강제 예외 룰 (VIX 등 퀀트 스코어 기반 오버라이드)
    if (vix >= 25) currentStageIdx = 0; // 극단적 공포
    if (vix <= 12.5) currentStageIdx = 5; // 극단적 환희

    const config = stageConfigs[currentStageIdx];

    const activeCircle = circles[currentStageIdx];
    const activeLabel = labels[currentStageIdx];
    
    activeCircle.className = `w-5 h-5 md:w-7 md:h-7 rounded-full ${config.bgClass} border-2 ${config.borderClass} flex items-center justify-center transition-all duration-500 shadow-lg ${config.shadowClass}`;
    activeCircle.firstElementChild.className = "text-[10px] font-bold text-slate-900";
    activeLabel.className = `absolute top-8 whitespace-nowrap text-[10px] md:text-xs font-bold ${config.textClass} mt-1`;
    stepperLine.classList.replace('bg-slate-500', config.bgClass);

    cycleStatus.innerText = config.name;
    cycleStatus.className = `text-2xl font-extrabold ${config.textClass}`;
    cycleDesc.innerHTML = `<b>하워드 막스 진단:</b> ${config.desc}`;

    const actionableCard = document.getElementById('actionable-guide-card');
    const actionableText = document.getElementById('actionable-guide-text');

    const evalIsa = document.getElementById('eval-isa');
    const evalIrp = document.getElementById('eval-irp');
    const evalCma = document.getElementById('eval-cma');
    const evalPension = document.getElementById('eval-pension');
    const evalQuant = document.getElementById('eval-quant');

    if (currentStageIdx >= 4) { // 5단계, 6단계 (과열/환희)
        cycleCard.className = `cycle-glow bg-slate-800 p-6 rounded-xl border border-${config.borderClass.replace('border-','')}/40 shadow-2xl ${config.shadowClass}`;
        
        // 상단 긴급 가이드 업데이트
        actionableCard.className = "bg-rose-900/40 p-6 rounded-xl border-2 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] mb-6";
        actionableCard.querySelector('h3').className = "text-lg font-bold mb-3 text-rose-400 flex items-center";
        actionableText.className = "text-rose-100 text-sm md:text-base font-bold leading-relaxed";
        
        if (isDebasement) {
            config.name = "🔮 6단계: 화폐 몰락형 특수 버블";
            config.desc = "원화 가치 하락과 자산 가격 폭등이 동반되는 착시 버블 국면입니다. 시한폭탄이 도는 상태이므로 극도로 방어적인 태세를 취하십시오.";
            cycleStatus.innerText = config.name;
            cycleDesc.innerHTML = `<b>제임스 리카즈 진단:</b> ${config.desc}`;
            
            actionableText.innerHTML = "🚨 <b>매크로 시스템 발작 경고:</b> 일반 계좌의 주식 신규 매입을 전면 보류하고, CMA 현금 방어막을 7,000만 원 이상으로 즉각 상향하세요!";
            evalIsa.innerHTML = "<span class='text-emerald-400 font-bold'>유지</span> <span class='text-slate-400'>(채권 비중이 하락 방어 닻 역할 수행)</span>";
            evalIrp.innerHTML = "<span class='text-emerald-400 font-bold'>유지</span> <span class='text-slate-400'>(장기 안정형 훼손 금지)</span>";
            evalCma.innerHTML = "<span class='text-rose-400 font-bold'>비중 7000만 원 이상 상향</span> <span class='text-slate-400'>(매크로 쇼크 완벽 대비)</span>";
            evalPension.innerHTML = "<span class='text-amber-400 font-bold'>적립 전면 보류</span> <span class='text-slate-400'>(불환지폐 시스템 충격 대비 현금 대기)</span>";
            evalQuant.innerHTML = "<span class='text-rose-400 font-bold'>방어적 기동 한정</span><br/><span class='text-[10px] text-slate-500'>돌파/고점 추격 매매 철저 배제, 공포 투매시 눌림목 종베만 수행</span>";
        } else {
            actionableText.innerHTML = "🚨 <b>위험 경고:</b> Quant 단기 매매 포지션을 50% 이하로 축소하고, 익절 수익금을 즉시 CMA로 인출하여 현금 버퍼를 극대화하세요!";
            evalIsa.innerHTML = "<span class='text-emerald-400 font-bold'>유지</span> <span class='text-slate-400'>(채권 비중이 하락 방어 닻 역할 수행)</span>";
            evalIrp.innerHTML = "<span class='text-emerald-400 font-bold'>유지</span> <span class='text-slate-400'>(장기 안정형 훼손 금지)</span>";
            evalCma.innerHTML = "<span class='text-rose-400 font-bold'>비중 20% 이상 상향</span> <span class='text-slate-400'>(투자 보류 및 익절 차익 파킹)</span>";
            evalPension.innerHTML = "<span class='text-amber-400 font-bold'>적립 보류/축소</span> <span class='text-slate-400'>(과열 구간, 신규 진입 자제)</span>";
            evalQuant.innerHTML = "<span class='text-rose-400 font-bold'>보수적 운용 (50% 축소)</span><br/><span class='text-[10px] text-slate-500'>돌파매매 금지 / 프리마켓 익절 / 수익 짧게 청산</span>";
        }
    } else if (currentStageIdx <= 1) { // 1단계, 2단계 (패닉/비관)
        cycleCard.className = `cycle-glow bg-slate-800 p-6 rounded-xl border border-${config.borderClass.replace('border-','')}/40 shadow-2xl ${config.shadowClass}`;
        
        // 상단 긴급 가이드 업데이트
        actionableCard.className = "bg-cyan-900/40 p-6 rounded-xl border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] mb-6 animate-pulse";
        actionableCard.querySelector('h3').className = "text-lg font-bold mb-3 text-cyan-400 flex items-center";
        actionableText.className = "text-cyan-100 text-sm md:text-base font-bold leading-relaxed";
        actionableText.innerHTML = "🎯 <b>역발상 기회:</b> CMA에서 현금 절반을 인출해 미국 지수(연금저축)와 낙폭과대 주도주에 분할 매수를 집행하세요!";

        evalIsa.innerHTML = "<span class='text-emerald-400 font-bold'>유지</span> <span class='text-slate-400'>(자산 배분 훼손 금지)</span>";
        evalIrp.innerHTML = "<span class='text-emerald-400 font-bold'>유지</span> <span class='text-slate-400'>(장기 안정형 훼손 금지)</span>";
        evalCma.innerHTML = "<span class='text-cyan-400 font-bold'>비중 10% 이하 축소</span> <span class='text-slate-400'>(버퍼 자금을 기회 자산으로 이체)</span>";
        evalPension.innerHTML = "<span class='text-cyan-400 font-bold'>적극 매수 (900만 한도 내 즉시 투입)</span> <span class='text-slate-400'>(최저가 복리 시동)</span>";
        evalQuant.innerHTML = "<span class='text-cyan-400 font-bold'>역추세 전략(③) 올인</span><br/><span class='text-[10px] text-slate-500'>주도주 급락 반등 매매, 60MA 지지 확인 필수</span>";
    } else { // 3단계, 4단계 (회의/낙관)
        cycleCard.className = "cycle-glow bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl";
        
        // 상단 긴급 가이드 업데이트
        actionableCard.className = "bg-emerald-900/40 p-6 rounded-xl border border-emerald-700 shadow-lg mb-6";
        actionableCard.querySelector('h3').className = "text-lg font-bold mb-3 text-emerald-400 flex items-center";
        actionableCard.querySelector('svg').classList.remove('animate-pulse');
        actionableText.className = "text-emerald-100 text-sm md:text-base leading-relaxed";
        actionableText.innerHTML = "✅ <b>정석 유지:</b> 시장이 합리적 궤도에 있습니다. 월 적립식 투자를 유지하고, Quant 매매는 평소 룰대로 운영하세요.";

        evalIsa.innerHTML = "<span class='text-emerald-400 font-bold'>기본 유지</span> <span class='text-slate-400'>(기계적 운용)</span>";
        evalIrp.innerHTML = "<span class='text-emerald-400 font-bold'>기본 유지</span> <span class='text-slate-400'>(기계적 운용)</span>";
        evalCma.innerHTML = "<span class='text-emerald-400 font-bold'>비중 15% 복구</span> <span class='text-slate-400'>(평시 버퍼 유지)</span>";
        evalPension.innerHTML = "<span class='text-emerald-400 font-bold'>월 기계적 분할 적립</span> <span class='text-slate-400'>(S&P500 / Nasdaq100)</span>";
        evalQuant.innerHTML = "<span class='text-emerald-400 font-bold'>정상 가동 (전략 ①, ②)</span><br/><span class='text-[10px] text-slate-500'>스윙 전환 극대화 허용, 시가베팅 100% 가동</span>";
    }
}
