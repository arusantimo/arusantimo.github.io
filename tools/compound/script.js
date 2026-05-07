let allTableRows = [];
let yearGroups = {};
let actualValues = {}; // { month: { shortTerm: number|null, longTermCumul: number|null } }
let monthSettingsOverrides = {}; // { month: { annualTargetRate, monthlyInvestment, longTermRatio, shortTermRatio, longTermAnnualTarget } }
let profitChartInstance = null;
let showShortCumul = true;
let longTermPrincipalGlobal = 0;
let shortTermPrincipalGlobal = 0;

let globalSettings = {
    principal: 500000000,
    annualTargetRate: 12,
    monthlyInvestment: 5000000,
    startDate: '2026-01-01',
    endDate: '2028-01-01',
    longTermRatio: 60,
    longTermAnnualTarget: 10,
    shortTermRatio: 40
};
let currentSettingsTab = 0; // 0 = global

function toggleShortCumul() {
    showShortCumul = !showShortCumul;
    document.querySelectorAll('.col-short-cumul').forEach(el => {
        el.style.display = showShortCumul ? '' : 'none';
    });
    document.getElementById('shortCumulToggleBtn').textContent = showShortCumul ? '단기누적 숨기기' : '단기누적 보기';
}

function setActual(month, field, value) {
    if (!actualValues[month]) actualValues[month] = {};
    const num = parseFloat(value);
    actualValues[month][field] = (value === '' || isNaN(num)) ? null : num;
    saveToLocalStorage();
    // 실제값 입력 시 전체 계산을 다시 실행하여 이월 자산에 반영
    calculateAndDisplay();
}

function renderChart() {
    const canvas = document.getElementById('profitChart');
    if (!canvas || allTableRows.length === 0) return;

    const labels = allTableRows.map(r => {
        const d = new Date(globalSettings.startDate);
        d.setMonth(d.getMonth() + r.month - 1);
        return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0');
    });

    // 목표 자산: 초기 목표 자산
    const targetAssets = allTableRows.map(r => r.initialAssetAfter);

    // 실제 자산: 실제 입력값 기반, 없으면 null
    const actualAssets = allTableRows.map(r => {
        const v = r.actualEndAsset;
        return (v !== null && v !== undefined) ? v : null;
    });

    // 저축만 했을 때: 초기 원금 + 월 재투자 * 월차 (수익 없음)
    const principal = allTableRows[0].assetBefore;
    const monthlyInvest = allTableRows[0].monthlyInvest;
    const savingsOnly = allTableRows.map(r => principal + monthlyInvest * r.month);

    // 연 2.5% 적금 복리: 매월 이전 자산 * (1 + 월이율) + 월 재투자
    const annualSavingsRate = 0.025;
    const monthlySavingsRate = Math.pow(1 + annualSavingsRate, 1 / 12) - 1;
    const savingsWithInterest = [];
    let savingsAsset = principal;
    for (const r of allTableRows) {
        savingsAsset = savingsAsset * (1 + monthlySavingsRate) + monthlyInvest;
        savingsWithInterest.push(savingsAsset);
    }

    const fmt = v => {
        if (v === null) return null;
        if (Math.abs(v) >= 100000000) return (v / 100000000).toFixed(1) + '억';
        if (Math.abs(v) >= 10000) return (v / 10000).toFixed(0) + '만';
        return v.toLocaleString('ko-KR');
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: '초기 목표 자산',
                data: targetAssets,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 5,
                borderWidth: 2,
                fill: false,
            },
            {
                label: '실제 자산',
                data: actualAssets,
                borderColor: '#00d9ff',
                backgroundColor: 'rgba(0, 217, 255, 0.1)',
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
                fill: false,
                spanGaps: false,
            },
            {
                label: '저축만 (수익 없음)',
                data: savingsOnly,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.06)',
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 4,
                borderWidth: 1.5,
                borderDash: [5, 4],
                fill: false,
            },
            {
                label: '적금 연 2.5%',
                data: savingsWithInterest,
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.06)',
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 4,
                borderWidth: 1.5,
                borderDash: [3, 3],
                fill: false,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                labels: { color: '#a0aec0', font: { size: 11 }, boxWidth: 14 }
            },
            tooltip: {
                backgroundColor: 'rgba(26,31,40,0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#a0aec0',
                borderColor: '#2d3748',
                borderWidth: 1,
                callbacks: {
                    label: ctx => {
                        if (ctx.parsed.y === null) return null;
                        return ` ${ctx.dataset.label}: ${Math.floor(ctx.parsed.y).toLocaleString('ko-KR')}원`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#a0aec0', font: { size: 10 }, maxRotation: 45 },
                grid: { color: 'rgba(255,255,255,0.04)' }
            },
            y: {
                ticks: {
                    color: '#a0aec0',
                    font: { size: 10 },
                    callback: v => fmt(v)
                },
                grid: { color: 'rgba(255,255,255,0.04)' }
            }
        }
    };

    if (profitChartInstance) {
        profitChartInstance.data = chartData;
        profitChartInstance.update('none');
        return;
    }

    profitChartInstance = new Chart(canvas, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}

function formatNumber(num) {
    if (num === null || num === undefined) return '-';
    return Math.floor(num).toLocaleString('ko-KR');
}

function getMonthsDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let months = 0;
    let current = new Date(start);

    // 무한 루프 및 과도한 메모리 사용 방지 (최대 100년 = 1200개월 제한)
    while (current < end && months < 1200) {
        months++;
        current.setMonth(current.getMonth() + 1);
    }

    return Math.max(1, months);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월';
}

function renderTableByYear(year) {
    const tableBody = document.getElementById('tableBody');
    const rows = yearGroups[year] || [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    tableBody.innerHTML = rows.map(row => {
        const idx = row.month - 1;
        // 시뮬레이션 기준 이전 장기 누적 (필요 수익금 계산용)
        const prevLongTermAccumulated = idx === 0 ? longTermPrincipalGlobal : allTableRows[idx - 1].longTermAccumulated;
        // 실제 입력 기준 이전 장기 누적 (실제 달성율 계산용 — 이전 달 실제값이 있으면 그것을 기준으로)
        const prevActualLongAccum = idx === 0
            ? longTermPrincipalGlobal
            : (actualValues[allTableRows[idx - 1].month]?.longTermCumul != null
                ? Number(actualValues[allTableRows[idx - 1].month].longTermCumul)
                : allTableRows[idx - 1].longTermAccumulated);

        // 장기투자 수익률 계산
        const longTermROI = row.longTermPrincipal > 0
            ? (((row.longTermAccumulated - row.longTermPrincipal) / row.longTermPrincipal) * 100).toFixed(2)
            : 0;

        // 실제 달성 수익 입력값 (없으면 목표값을 기본으로 사용)
        const actualShort = actualValues[row.month]?.shortTerm ?? null;
        const actualLongCumul = actualValues[row.month]?.longTermCumul ?? null;
        const displayShortInput = actualShort !== null ? actualShort : '';
        const displayLongCumulInput = actualLongCumul !== null ? actualLongCumul : '';

        // 실제 입력값이 하나라도 있을 때만 달성율/실제자산 계산
        const hasActualInput = actualShort !== null || actualLongCumul !== null;
        const effectiveShort = actualShort !== null ? actualShort : row.shortTermProfit;
        const effectiveLongCumul = actualLongCumul !== null ? actualLongCumul : row.longTermAccumulated;
        // 실제 장기 수익 = 실제 누적 - 실제 이전 누적 - 재투자금
        const actualLongProfit = effectiveLongCumul - prevActualLongAccum - row.longTermInvest;
        const actualTotalProfit = effectiveShort + actualLongProfit;
        const rate = hasActualInput && row.profit > 0 ? ((actualTotalProfit / row.profit) * 100).toFixed(1) : null;
        const actualEndAssetDisplay = hasActualInput
            ? (row.assetBefore + row.monthlyInvest + actualTotalProfit)
            : null;

        // 초기 투자 금액 대비 수익률 계산 (누적 수익금 / 초기 투자 원금)
        let initialPrincipalROI = null;
        if (actualEndAssetDisplay !== null) {
            const totalInvestedPrincipal = row.longTermPrincipal + row.shortTermPrincipal + row.monthlyInvest;
            const cumulativeProfit = actualEndAssetDisplay - totalInvestedPrincipal;
            const initialPrincipal = longTermPrincipalGlobal + shortTermPrincipalGlobal;
            if (initialPrincipal > 0) {
                initialPrincipalROI = ((cumulativeProfit / initialPrincipal) * 100).toFixed(1);
            }
        }

        const rateColor = rate !== null && parseFloat(rate) >= 100 ? 'var(--accent-primary)' : '#ef4444';
        const achievementHtml = rate !== null ? ` <span style="color:${rateColor}; font-size:11px;">(${rate}%)</span>` : '';

        // 실제 입력값 기준 단기 누적 수익금 계산 (1월차 ~ 현재월 합산)
        let actualShortCumulative = 0;
        let prevActualShortCumulative = 0;
        let prevTargetShortCumulative = 0;
        for (let m = 1; m <= row.month; m++) {
            const r = allTableRows[m - 1];
            actualShortCumulative += actualValues[m]?.shortTerm ?? r.shortTermProfit;
            if (m < row.month) {
                prevActualShortCumulative += actualValues[m]?.shortTerm ?? r.shortTermProfit;
                prevTargetShortCumulative += r.shortTermProfit;
            }
        }

        const shortCumulStyle = showShortCumul ? '' : 'display:none;';

        // 현재 달 기준 단기 누적 원금 (월초 단기 누적 원금 + 이번달 단기 재투자금)
        const currentShortTermPrincipal = row.shortTermPrincipal + (row.monthlyInvest - row.longTermInvest);

        // 누적 단기 원금 + 단기 누적 수익금
        const shortInitPlusCumul = currentShortTermPrincipal + actualShortCumulative;

        // 월 단기 재투자 금액
        const currentShortTermInvest = row.monthlyInvest - row.longTermInvest;

        // 누적원금 + 누적수익에서 이번 달 단기 재투자 금액을 뺀 금액
        const shortInitPlusCumulMinusMonthlyInvest = shortInitPlusCumul - currentShortTermInvest;

        // 이전달 실질 단기 자산 총액 & 목표 단기 자산 총액 계산 (이전달까지의 누적 단기 원금 + 누적 수익금)
        const prevActualShortInitPlusCumul = row.shortTermPrincipal + prevActualShortCumulative;
        const prevTargetShortInitPlusCumul = row.shortTermPrincipal + prevTargetShortCumulative;
        // 단기 달성률: 실제 단기 입력이 있을 때만 계산
        const shortAchievePercent = (actualShort !== null && row.shortTermProfit > 0) ? (actualShort / row.shortTermProfit) * 100 : null;
        const shortAchievePercentFixed = shortAchievePercent !== null ? shortAchievePercent.toFixed(1) : null;
        const shortAchieveColor = shortAchievePercentFixed !== null && parseFloat(shortAchievePercentFixed) >= 100 ? 'var(--accent-primary)' : '#ef4444';

        // 장기 실제 달성률 — 목표 수익(수익금) 대비 실제 수익 비율로 변경
        let longTermProfitRate = null;
        const longTermTargetProfit = row.longTermAccumulated - prevLongTermAccumulated - row.longTermInvest;
        if (actualLongCumul !== null && !isNaN(Number(actualLongCumul))) {
            const actualLongCumulNum = Number(actualLongCumul);
            // 실제 수익 = 현재 잔액 - 이전 잔액 - 재투자금
            const longTermActualProfit = actualLongCumulNum - prevActualLongAccum - row.longTermInvest;

            if (longTermTargetProfit > 0) {
                longTermProfitRate = (longTermActualProfit / longTermTargetProfit) * 100;
            } else {
                longTermProfitRate = longTermActualProfit >= 0 ? 100 : 0;
            }
        }
        const longTermRateDisplay = longTermProfitRate !== null ? longTermProfitRate.toFixed(1) : null;
        const longTermRateColor = longTermRateDisplay !== null && parseFloat(longTermRateDisplay) >= 100 ? 'var(--accent-primary)' : '#ef4444';

        const isCurrentMonth = row.year === currentYear && (() => {
            const d = new Date(globalSettings.startDate);
            d.setMonth(d.getMonth() + row.month - 1);
            return d.getFullYear() === currentYear && (d.getMonth() + 1) === currentMonth;
        })();
        const rowClass = row.highlight ? 'highlight-row' : isCurrentMonth ? 'current-month-row' : '';

        const override = monthSettingsOverrides[row.month];

        return `
            <tr ${rowClass ? `class="${rowClass}"` : ''}>
                <td>
                    <div style="display:flex; align-items:center;">
                        <button class="setting-btn" onclick="openMonthSettings(${row.month})" title="${row.month}월차부터 설정 변경">⚙️</button>
                        <span style="font-weight:700;">${row.month}월차${isCurrentMonth ? ' <span style="color:var(--accent-primary); font-size:10px;">◀ 현재</span>' : ''}</span>
                        ${override ? `
                        <div class="table-tooltip-container">
                            <span style="color:var(--accent-warning); font-size:10px; margin-left:4px; font-weight:normal; cursor:help;">(수정됨)</span>
                            <div class="table-tooltip-content">
                                <span style="color:var(--accent-warning); font-weight:600;">[적용된 새 설정]</span><br>
                                연 수익: ${override.annualTargetRate}%<br>
                                월 재투자: ${formatNumber(override.monthlyInvestment)}원<br>
                                ${override.additionalSeed ? `<span style="color:var(--accent-primary);">시드 증감: ${formatNumber(override.additionalSeed)}원</span><br>` : ''}
                                장기: ${override.longTermRatio}% (목표 연 ${override.longTermAnnualTarget}%)<br>
                                단기: ${override.shortTermRatio}%
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    <div style="color:var(--text-secondary); font-size:10px; margin-left: 22px; margin-top: 2px;">${row.dateStr}</div>
                </td>
                <td>
                    <div style="font-size:9px; color:var(--text-secondary); margin-bottom:2px;">목표</div>
                    <div class="number">${formatNumber(idx === 0 ? row.assetBefore : allTableRows[idx - 1].assetAfter)}</div>
                    ${(() => {
                if (idx === 0) return '';
                const prevMonth = allTableRows[idx - 1].month;
                const prevHasInput = actualValues[prevMonth]?.shortTerm != null || actualValues[prevMonth]?.longTermCumul != null;
                if (!prevHasInput) return '';
                const prevActualEndAsset = allTableRows[idx - 1].actualEndAsset;
                if (prevActualEndAsset == null) return '';
                return `<div style="font-size:9px; color:var(--text-secondary); margin-top:6px; margin-bottom:2px;">실제 이월</div><div class="number" style="color:var(--accent-primary);">${formatNumber(prevActualEndAsset)}</div>`;
            })()}
                </td>
                <td class="number" style="color: var(--accent-success);">
                    ${formatNumber(row.profit)}
                    <div style="color: var(--text-secondary); font-size:11px; margin-top:6px;">
                        (장)${formatNumber(row.profit - row.shortTermProfit)} + (단)${formatNumber(row.shortTermProfit)}
                    </div>
                </td>
                <td>
                    <div class="number" style="color: var(--accent-warning);">${formatNumber(row.shortTermProfit)}</div>
                    <div style="font-size: 9px; margin-top: 4px; color: var(--text-secondary);">
                        <span style="color: #00d9ff;">${formatNumber(prevActualShortInitPlusCumul)}</span> / ${formatNumber(prevTargetShortInitPlusCumul)}
                    </div>
                    <input type="number" class="actual-input" placeholder="실제 단기 수익"
                        value="${displayShortInput}"
                        onchange="setActual(${row.month}, 'shortTerm', this.value)"
                        style="margin-top:5px;">
                </td>
                <td class="col-short-cumul" style="${shortCumulStyle}">
                    <div class="number" style="color: var(--accent-warning);">${formatNumber(actualShortCumulative)}</div>
                    <div style="color: var(--text-secondary); margin-top: 3px;">
                        <span style="font-size:9px;">누적 원금 + 누적 수익</span><br>
                        <span class="number" style="font-size:11px; color: var(--text-primary);">${formatNumber(shortInitPlusCumul)}</span>
                        ${shortAchievePercentFixed !== null ? `<span style="font-size:11px; color:${shortAchieveColor}; margin-left:6px;">(${shortAchievePercentFixed}%)</span>` : ''}
                        <div style="font-size:9px; color:var(--text-secondary); margin-top:2px;">(월 재투자 차감: ${formatNumber(shortInitPlusCumulMinusMonthlyInvest)})</div>
                    </div>
                </td>
                <td>
                    <div class="number">${formatNumber(row.longTermAccumulated)} 
                        <span style="color: var(--text-secondary); font-size: 9px; font-weight: normal; margin-left: 4px;">(${formatNumber(row.longTermPrincipal)})</span>
                        <span style="color: var(--accent-success); font-size: 11px;">(+${longTermROI}%)</span>                                
                    </div>
                    <div style="display:flex; justify-content:flex-end; align-items:center; gap:6px;">
                        <input type="number" class="actual-input" placeholder="실제 장기 잔액 총액"
                            value="${displayLongCumulInput}"
                            onchange="setActual(${row.month}, 'longTermCumul', this.value)"
                            style="margin-top:5px;"
                        >
                        
                        ${longTermRateDisplay !== null ? `<span style="color:${longTermRateColor}; margin-top:6px; margin-left:6px; font-size:10px;" title="장기 수익 달성률">(${longTermRateDisplay}%)</span>` : ''}
                    </div>
                </td>
                <td class="number">
                    <div>${formatNumber(row.assetAfter)}${achievementHtml}</div>
                    ${actualEndAssetDisplay !== null ? `
                    <div style="margin-top:6px;">
                        <span style="color:${actualEndAssetDisplay >= row.assetAfter ? 'var(--accent-primary)' : '#ef4444'}; font-family: 'Monaco', 'Courier New', monospace; font-weight:700; font-size:12px;">${formatNumber(actualEndAssetDisplay)}</span>
                        ${initialPrincipalROI !== null ? `<span style="font-size:10px; color:${parseFloat(initialPrincipalROI) >= 0 ? 'var(--accent-success)' : '#ef4444'}; margin-left:4px;" title="초기 투자 원금 대비 총 수익률">(${parseFloat(initialPrincipalROI) > 0 ? '+' : ''}${initialPrincipalROI}%)</span>` : ''}
                    </div>
                    <div style="margin-top:2px; font-family: 'Monaco', 'Courier New', monospace; font-size:9px; color:var(--text-secondary);">${formatNumber(row.initialAssetAfter)}(초기 목표)</div>` : ''}
                </td>
            </tr>
        `;
    }).join('');
}

function createYearTabs() {
    const yearTabs = document.getElementById('yearTabs');
    const years = Object.keys(yearGroups).sort((a, b) => a - b);
    const currentYear = new Date().getFullYear();
    const defaultYear = years.includes(String(currentYear)) ? currentYear : parseInt(years[0]);

    yearTabs.innerHTML = years.map(year => `
        <button class="tab ${parseInt(year) === defaultYear ? 'active' : ''}" data-year="${year}">
            ${year}년
        </button>
    `).join('');

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderTableByYear(parseInt(this.dataset.year));
        });
    });

    return defaultYear;
}

function calculateAndDisplay() {
    const principal = parseFloat(globalSettings.principal) || 0;
    const monthlyInvestment = parseFloat(globalSettings.monthlyInvestment) || 0;
    const startDate = globalSettings.startDate;
    const endDate = globalSettings.endDate;
    const longTermRatio = parseFloat(globalSettings.longTermRatio) || 0;
    const shortTermRatio = parseFloat(globalSettings.shortTermRatio) || 0;
    const annualTargetRate = parseFloat(globalSettings.annualTargetRate) || 12; // 기본값 12% (연)
    const longTermAnnualTarget = parseFloat(globalSettings.longTermAnnualTarget) || 10; // 기본값 10% (연)

    // 투자 비율 정규화
    const totalRatio = longTermRatio + shortTermRatio;
    const normalizedLongTerm = totalRatio > 0 ? (longTermRatio / totalRatio) : 0.5;
    const normalizedShortTerm = totalRatio > 0 ? (shortTermRatio / totalRatio) : 0.5;

    // 초기 자산 분할
    const longTermPrincipal = principal * normalizedLongTerm;
    const shortTermPrincipal = principal * normalizedShortTerm;
    longTermPrincipalGlobal = longTermPrincipal;
    shortTermPrincipalGlobal = shortTermPrincipal;

    const months = getMonthsDifference(startDate, endDate);

    // 글로벌 설정 초기화
    let currentSettings = {
        annualTargetRate: annualTargetRate,
        monthlyInvestment: monthlyInvestment,
        longTermRatio: longTermRatio,
        shortTermRatio: shortTermRatio,
        longTermAnnualTarget: longTermAnnualTarget
    };

    // 현재의 글로벌 설정에 따른 비율 표시 시각화
    document.getElementById('longTermBar').style.width = normalizedLongTerm * 100 + '%';

    // 장기 투자 월 수익률 계산 (연 → 월)
    // 현재 설정에 따른 비율 시각화 (초기)
    document.getElementById('longTermBar').style.width = normalizedLongTerm * 100 + '%';
    document.getElementById('longTermText').textContent = (normalizedLongTerm * 100).toFixed(0) + '%';
    document.getElementById('shortTermBar').style.width = normalizedShortTerm * 100 + '%';
    document.getElementById('shortTermText').textContent = (normalizedShortTerm * 100).toFixed(0) + '%';

    // 월 재투자 금액 분배 업데이트
    const longTermInvestAmount = monthlyInvestment * normalizedLongTerm;
    const shortTermInvestAmount = monthlyInvestment * normalizedShortTerm;
    const totalInvestEl = document.getElementById('monthlyInvestmentTotal');
    const longInvestEl = document.getElementById('longTermInvestAmount');
    const shortInvestEl = document.getElementById('shortTermInvestAmount');
    if (totalInvestEl) totalInvestEl.textContent = formatNumber(monthlyInvestment);
    if (longInvestEl) longInvestEl.textContent = formatNumber(longTermInvestAmount);
    if (shortInvestEl) shortInvestEl.textContent = formatNumber(shortTermInvestAmount);

    // 월별 테이블 생성
    allTableRows = [];
    yearGroups = {};

    const startObj = new Date(startDate);
    let currentAsset = principal;
    let longTermAccumulated = longTermPrincipal; // 장기투자 초기 원금 (수익 포함 누계)
    let runningLongPrincipal = longTermPrincipal; // 장기 누적 원금
    let runningShortPrincipal = shortTermPrincipal; // 단기 누적 원금
    let shortTermCumulativeProfitTotal = 0; // 단기 누적 수익금
    let carryAssetForNextMonth = null; // 이전달 실제 자산을 다음달 월초로 사용
    let cleanCurrentAsset = principal; // 초기 목표 순수 시뮬레이션용 (실제값 미반영)

    for (let month = 1; month <= months; month++) {
        const currentDate = new Date(startObj);
        currentDate.setMonth(currentDate.getMonth() + month - 1);
        const year = currentDate.getFullYear();
        const dateStr = formatDate(currentDate.toISOString().split('T')[0]);

        // 현재 월에 덮어쓰기 설정이 있으면 적용 (additionalSeed는 이월되지 않음)
        let currentAdditionalSeed = 0;
        if (monthSettingsOverrides[month]) {
            const { additionalSeed, ...persistentSettings } = monthSettingsOverrides[month];
            Object.assign(currentSettings, persistentSettings);
            currentAdditionalSeed = additionalSeed || 0;
        }

        const totalRatio = currentSettings.longTermRatio + currentSettings.shortTermRatio;
        const currentNormalizedLongTerm = totalRatio > 0 ? (currentSettings.longTermRatio / totalRatio) : 0.5;
        const currentNormalizedShortTerm = totalRatio > 0 ? (currentSettings.shortTermRatio / totalRatio) : 0.5;
        const targetMonthlyRate = Math.pow(1 + currentSettings.annualTargetRate / 100, 1 / 12) - 1;
        const longTermMonthlyRate = (Math.pow(1 + currentSettings.longTermAnnualTarget / 100, 1 / 12) - 1);
        const longTermContribution = currentNormalizedLongTerm * longTermMonthlyRate;
        const shortTermMonthlyRequired = (targetMonthlyRate - longTermContribution) / currentNormalizedShortTerm;
        const currentMonthlyInvestment = currentSettings.monthlyInvestment;

        // 월초 자산: 이전달에 실제값이 입력되었다면 그 실제값을 이월(우선 사용), 아니면 시뮬레이션 값 사용
        const assetAtMonthStart = carryAssetForNextMonth !== null ? carryAssetForNextMonth : currentAsset;
        // carry는 한달만 적용
        carryAssetForNextMonth = null;

        // 이전 장기 누적(계산용): 이전달에 실제 입력값이 있으면 이월
        const prevActualLongCumulInput = month > 1 ? actualValues[month - 1]?.longTermCumul ?? null : null;
        if (prevActualLongCumulInput !== null && !isNaN(Number(prevActualLongCumulInput))) {
            longTermAccumulated = Number(prevActualLongCumulInput);
        }
        const prevLongTermAccumulated = longTermAccumulated;

        // 월초 기준으로 각 자산의 크기
        const longTermAssetAtMonth = assetAtMonthStart * currentNormalizedLongTerm;
        const shortTermAssetAtMonth = assetAtMonthStart * currentNormalizedShortTerm;

        // 장기 투자 필요 수익금 (월 수익률 기반)
        const longTermMonthlyProfit = longTermAssetAtMonth * longTermMonthlyRate;

        // 단기 투자 필요 수익금 (계산된 월 수익률 기반)
        const shortTermMonthlyProfit = shortTermAssetAtMonth * shortTermMonthlyRequired;

        // 단기 누적 수익금 누적 (실제값이 있으면 실제 단기 수익을 사용)
        const actualShortInput = actualValues[month]?.shortTerm ?? null;
        const shortToAdd = (actualShortInput !== null && !isNaN(Number(actualShortInput))) ? Number(actualShortInput) : shortTermMonthlyProfit;
        shortTermCumulativeProfitTotal += shortToAdd;

        // 전체 필요 수익금
        const monthlyProfitDynamic = longTermMonthlyProfit + shortTermMonthlyProfit;

        // 장기투자 누적 = 기존 + 월 장기 재투자 + 추가 시드(장기) + 월 장기 수익
        const longTermInvest = (currentMonthlyInvestment * currentNormalizedLongTerm) + (currentAdditionalSeed * currentNormalizedLongTerm);
        const shortTermInvest = (currentMonthlyInvestment * currentNormalizedShortTerm) + (currentAdditionalSeed * currentNormalizedShortTerm);
        longTermAccumulated = longTermAccumulated + longTermInvest + longTermMonthlyProfit;

        // 월말 자산(시뮬레이션)
        currentAsset = assetAtMonthStart + currentMonthlyInvestment + currentAdditionalSeed + monthlyProfitDynamic;

        // 초기 목표 순수 시뮬레이션 (실제 입력값 미반영 — 비교용 기준값)
        const cleanLongProfit = cleanCurrentAsset * currentNormalizedLongTerm * longTermMonthlyRate;
        const cleanShortProfit = cleanCurrentAsset * currentNormalizedShortTerm * shortTermMonthlyRequired;
        const initialAssetAfter = cleanCurrentAsset + currentMonthlyInvestment + currentAdditionalSeed + cleanLongProfit + cleanShortProfit;
        cleanCurrentAsset = initialAssetAfter;

        // 실제 입력값이 있으면 이번달 실제 종료 자산을 계산하여 다음달 이월 자산으로 사용
        const actualShort = actualValues[month]?.shortTerm ?? null;
        const actualLongCumul = actualValues[month]?.longTermCumul ?? null;
        const effectiveShort = actualShort !== null && !isNaN(Number(actualShort)) ? Number(actualShort) : shortTermMonthlyProfit;
        const effectiveLongCumul = actualLongCumul !== null && !isNaN(Number(actualLongCumul)) ? Number(actualLongCumul) : longTermAccumulated;
        const actualLongProfit = effectiveLongCumul - prevLongTermAccumulated - longTermInvest;
        const actualTotalProfit = effectiveShort + actualLongProfit;
        const actualEndAsset = assetAtMonthStart + currentMonthlyInvestment + currentAdditionalSeed + actualTotalProfit;

        // 이전달 실제 입력(단기 또는 장기 누적)이 있으면 이 값을 다음달 시작 자산으로 사용
        if ((actualShort !== null && !isNaN(Number(actualShort))) || (actualLongCumul !== null && !isNaN(Number(actualLongCumul)))) {
            carryAssetForNextMonth = actualEndAsset;
        }

        const rowData = {
            month: month,
            dateStr: dateStr,
            assetBefore: assetAtMonthStart,
            monthlyInvest: currentMonthlyInvestment + currentAdditionalSeed,
            longTermInvest: longTermInvest,
            profit: monthlyProfitDynamic,
            shortTermProfit: shortTermMonthlyProfit,
            shortTermAssetAtMonth: shortTermAssetAtMonth,
            shortTermPrincipal: runningShortPrincipal,
            shortTermCumulativeProfit: shortTermCumulativeProfitTotal,
            longTermAccumulated: longTermAccumulated,
            longTermPrincipal: runningLongPrincipal,
            assetAfter: currentAsset,
            initialAssetAfter: initialAssetAfter,
            actualEndAsset: ((actualShort !== null && !isNaN(Number(actualShort))) || (actualLongCumul !== null && !isNaN(Number(actualLongCumul)))) ? actualEndAsset : null,
            highlight: month === months,
            year: year
        };

        // 누적 원금 업데이트 (다음 달 계산에 반영)
        runningLongPrincipal += longTermInvest;
        runningShortPrincipal += shortTermInvest;

        allTableRows.push(rowData);

        if (!yearGroups[year]) {
            yearGroups[year] = [];
        }
        yearGroups[year].push(rowData);
    }

    // 비율 표시 업데이트
    const ratioDisplayEl = document.getElementById('ratioDisplay');
    if (ratioDisplayEl) {
        ratioDisplayEl.textContent = (normalizedLongTerm * 100).toFixed(0) + '% / ' + (normalizedShortTerm * 100).toFixed(0) + '%';
    }

    const defaultYear = createYearTabs();
    renderTableByYear(defaultYear);
    renderChart();
}

// 로컬스토리지 키
const STORAGE_KEY = 'assetSimulatorConfig';

// 로컬스토리지에 저장
function saveToLocalStorage() {
    const config = {
        principal: globalSettings.principal,
        annualTargetRate: globalSettings.annualTargetRate,
        monthlyInvestment: globalSettings.monthlyInvestment,
        startDate: globalSettings.startDate,
        endDate: globalSettings.endDate,
        longTermRatio: globalSettings.longTermRatio,
        longTermAnnualTarget: globalSettings.longTermAnnualTarget,
        shortTermRatio: globalSettings.shortTermRatio,
        actualValues: actualValues,
        monthSettingsOverrides: monthSettingsOverrides
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// 로컬스토리지에서 복원
function loadFromLocalStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const config = JSON.parse(saved);
            globalSettings.principal = config.principal || 500000000;
            globalSettings.annualTargetRate = config.annualTargetRate || 12;
            globalSettings.monthlyInvestment = config.monthlyInvestment || 5000000;
            globalSettings.startDate = config.startDate || '2026-01-01';
            globalSettings.endDate = config.endDate || '2028-01-01';
            globalSettings.longTermRatio = config.longTermRatio || 60;
            globalSettings.longTermAnnualTarget = config.longTermAnnualTarget || 10;
            globalSettings.shortTermRatio = config.shortTermRatio || 40;
            if (config.actualValues) actualValues = config.actualValues;
            if (config.monthSettingsOverrides) monthSettingsOverrides = config.monthSettingsOverrides;
        } catch (error) {
            console.error('로컬스토리지 복원 실패:', error);
        }
    }
}

// 설정 저장 함수
function saveConfig() {
    const config = {
        principal: globalSettings.principal,
        annualTargetRate: globalSettings.annualTargetRate,
        monthlyInvestment: globalSettings.monthlyInvestment,
        startDate: globalSettings.startDate,
        endDate: globalSettings.endDate,
        longTermRatio: globalSettings.longTermRatio,
        longTermAnnualTarget: globalSettings.longTermAnnualTarget,
        shortTermRatio: globalSettings.shortTermRatio,
        actualValues: actualValues,
        monthSettingsOverrides: monthSettingsOverrides,
        timestamp: new Date().toISOString()
    };

    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `자산운용설정_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('설정이 저장되었습니다!');
}

// 설정 로드 함수
function loadConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const config = JSON.parse(event.target.result);

                // 입력값 복원
                globalSettings.principal = config.principal;
                globalSettings.annualTargetRate = config.annualTargetRate;
                globalSettings.monthlyInvestment = config.monthlyInvestment;
                globalSettings.startDate = config.startDate;
                globalSettings.endDate = config.endDate;
                globalSettings.longTermRatio = config.longTermRatio;
                globalSettings.longTermAnnualTarget = config.longTermAnnualTarget;
                globalSettings.shortTermRatio = config.shortTermRatio;
                if (config.actualValues) actualValues = config.actualValues;
                if (config.monthSettingsOverrides) monthSettingsOverrides = config.monthSettingsOverrides;

                selectSettingTab(0);
                // 계산 재실행
                calculateAndDisplay();

                alert('설정이 로드되었습니다!');
            } catch (error) {
                alert('파일을 읽을 수 없습니다. JSON 형식을 확인해주세요.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// 버튼 이벤트 리스너
document.getElementById('saveConfigBtn').addEventListener('click', saveConfig);
document.getElementById('loadConfigBtn').addEventListener('click', loadConfig);

// 입력값 변경 이벤트 리스너 핸들러
function handleSettingInput(field, value, isNumber = true) {
    let val = isNumber ? parseFloat(value) : value;
    if (isNumber && isNaN(val)) val = 0;

    if (currentSettingsTab === 0) {
        globalSettings[field] = val;
    } else {
        if (!monthSettingsOverrides[currentSettingsTab]) {
            monthSettingsOverrides[currentSettingsTab] = {};
        }
        if (['annualTargetRate', 'monthlyInvestment', 'longTermRatio', 'shortTermRatio', 'longTermAnnualTarget', 'additionalSeed'].includes(field)) {
            monthSettingsOverrides[currentSettingsTab][field] = val;
        }
    }
    saveToLocalStorage();
    calculateAndDisplay();
}

document.getElementById('principal').addEventListener('change', (e) => handleSettingInput('principal', e.target.value));
document.getElementById('annualTargetRate').addEventListener('input', (e) => handleSettingInput('annualTargetRate', e.target.value));
document.getElementById('monthlyInvestment').addEventListener('change', (e) => handleSettingInput('monthlyInvestment', e.target.value));
document.getElementById('startDate').addEventListener('change', (e) => handleSettingInput('startDate', e.target.value, false));
document.getElementById('endDate').addEventListener('change', (e) => handleSettingInput('endDate', e.target.value, false));
document.getElementById('longTermRatio').addEventListener('input', (e) => handleSettingInput('longTermRatio', e.target.value));
document.getElementById('shortTermRatio').addEventListener('input', (e) => handleSettingInput('shortTermRatio', e.target.value));
document.getElementById('longTermAnnualTarget').addEventListener('input', (e) => handleSettingInput('longTermAnnualTarget', e.target.value));
document.getElementById('additionalSeed').addEventListener('change', (e) => handleSettingInput('additionalSeed', e.target.value));

// 설정 탭 관련 함수
function renderSettingsTabs() {
    const tabsContainer = document.getElementById('globalSettingsTabs');
    if (!tabsContainer) return;

    const overridesKeys = Object.keys(monthSettingsOverrides).map(Number).sort((a, b) => a - b);
    let html = `<button class="tab ${currentSettingsTab === 0 ? 'active' : ''}" onclick="selectSettingTab(0)">초기</button>`;

    overridesKeys.forEach(month => {
        const startObj = new Date(globalSettings.startDate);
        startObj.setMonth(startObj.getMonth() + month - 1);
        const dateStr = startObj.getFullYear() + '.' + String(startObj.getMonth() + 1).padStart(2, '0');

        html += `
        <div class="tab ${currentSettingsTab === month ? 'active' : ''}" style="display:inline-flex; align-items:center; gap:8px; padding-right:12px;">
            <span onclick="selectSettingTab(${month})" style="cursor:pointer; height:100%; display:flex; align-items:center;">${dateStr}</span>
            <button onclick="deleteSettingTab(${month}, event)" style="background:none; border:none; color:rgba(239, 68, 68, 0.7); font-size:10px; cursor:pointer; padding:4px;" title="탭 삭제">❌</button>
        </div>`;
    });

    tabsContainer.innerHTML = html;
}

function deleteSettingTab(month, event) {
    if (event) event.stopPropagation();
    if (!confirm(`${month}월차 설정을 정말 삭제하시겠습니까?`)) return;

    delete monthSettingsOverrides[month];
    saveToLocalStorage();

    if (currentSettingsTab === month) {
        selectSettingTab(0);
    } else {
        renderSettingsTabs();
    }

    calculateAndDisplay();
}

function selectSettingTab(month) {
    currentSettingsTab = month;
    renderSettingsTabs();

    const pGroup = document.getElementById('principalGroup');
    const pInput = document.getElementById('principal');
    const seedGroup = document.getElementById('additionalSeedGroup');
    const seedInput = document.getElementById('additionalSeed');
    const sInput = document.getElementById('startDate');
    const eInput = document.getElementById('endDate');

    if (month === 0) {
        document.getElementById('annualTargetRate').value = globalSettings.annualTargetRate;
        document.getElementById('monthlyInvestment').value = globalSettings.monthlyInvestment;
        document.getElementById('longTermRatio').value = globalSettings.longTermRatio;
        document.getElementById('shortTermRatio').value = globalSettings.shortTermRatio;
        document.getElementById('longTermAnnualTarget').value = globalSettings.longTermAnnualTarget;

        pGroup.style.display = 'block';
        seedGroup.style.display = 'none';

        pInput.value = globalSettings.principal || 500000000;
        sInput.value = globalSettings.startDate;
        eInput.value = globalSettings.endDate;
        sInput.disabled = false;
        eInput.disabled = false;
    } else {
        const override = monthSettingsOverrides[month];
        if (override) {
            document.getElementById('annualTargetRate').value = override.annualTargetRate;
            document.getElementById('monthlyInvestment').value = override.monthlyInvestment;
            document.getElementById('longTermRatio').value = override.longTermRatio;
            document.getElementById('shortTermRatio').value = override.shortTermRatio;
            document.getElementById('longTermAnnualTarget').value = override.longTermAnnualTarget;
        }

        pGroup.style.display = 'none';
        seedGroup.style.display = 'block';
        seedInput.value = override?.additionalSeed || '';

        sInput.value = '';
        eInput.value = '';
        sInput.disabled = true;
        eInput.disabled = true;
    }
}

// 페이지 로드 시 로컬스토리지에서 복원
loadFromLocalStorage();
selectSettingTab(0);
calculateAndDisplay();

// 모달 관련 함수
let currentEditingMonth = null;

function openMonthSettings(month) {
    currentEditingMonth = month;
    const modal = document.getElementById('monthSettingsModal');
    document.getElementById('modalMonthText').innerText = `${month}월차`;

    if (monthSettingsOverrides[month]) {
        document.getElementById('modalMonthTitle').innerHTML = `${month}월차 설정 변경 <span style="font-size:12px; color:var(--accent-warning); font-weight:normal;">(수정됨)</span>`;
    } else {
        document.getElementById('modalMonthTitle').innerHTML = `${month}월차 설정 변경`;
    }

    // Retrieve settings effective at this month if override exists, otherwise get global/previous overrides
    let effective = {
        annualTargetRate: parseFloat(document.getElementById('annualTargetRate').value) || 12,
        monthlyInvestment: parseFloat(document.getElementById('monthlyInvestment').value) || 0,
        longTermRatio: parseFloat(document.getElementById('longTermRatio').value) || 0,
        shortTermRatio: parseFloat(document.getElementById('shortTermRatio').value) || 0,
        longTermAnnualTarget: parseFloat(document.getElementById('longTermAnnualTarget').value) || 10
    };

    for (let i = 1; i <= month; i++) {
        if (monthSettingsOverrides[i]) {
            Object.assign(effective, monthSettingsOverrides[i]);
        }
    }

    document.getElementById('modalAnnualTargetRate').value = effective.annualTargetRate;
    document.getElementById('modalMonthlyInvestment').value = effective.monthlyInvestment;
    document.getElementById('modalLongTermRatio').value = effective.longTermRatio;
    document.getElementById('modalShortTermRatio').value = effective.shortTermRatio;
    document.getElementById('modalLongTermAnnualTarget').value = effective.longTermAnnualTarget;
    document.getElementById('modalAdditionalSeed').value = monthSettingsOverrides[month]?.additionalSeed || '';

    modal.style.display = 'flex';
}

function closeMonthSettings() {
    document.getElementById('monthSettingsModal').style.display = 'none';
    currentEditingMonth = null;
}

function saveMonthSettings() {
    if (!currentEditingMonth) return;

    const settings = {
        annualTargetRate: parseFloat(document.getElementById('modalAnnualTargetRate').value),
        monthlyInvestment: parseFloat(document.getElementById('modalMonthlyInvestment').value),
        longTermRatio: parseFloat(document.getElementById('modalLongTermRatio').value),
        shortTermRatio: parseFloat(document.getElementById('modalShortTermRatio').value),
        longTermAnnualTarget: parseFloat(document.getElementById('modalLongTermAnnualTarget').value)
    };

    const additionalSeedVal = parseFloat(document.getElementById('modalAdditionalSeed').value);
    if (!isNaN(additionalSeedVal) && additionalSeedVal !== 0) {
        settings.additionalSeed = additionalSeedVal;
    }

    monthSettingsOverrides[currentEditingMonth] = settings;
    saveToLocalStorage();
    renderSettingsTabs();
    calculateAndDisplay();
    closeMonthSettings();
}

function clearMonthSettings() {
    if (!currentEditingMonth) return;
    delete monthSettingsOverrides[currentEditingMonth];
    saveToLocalStorage();

    // 만약 지운 월차가 현재 선택된 탭이라면 전역 탭으로 이동
    if (currentSettingsTab === currentEditingMonth) {
        selectSettingTab(0);
    } else {
        renderSettingsTabs();
    }

    calculateAndDisplay();
    closeMonthSettings();
}
