(function (app) {
    const { formatNumber, getMonthDate, hasNumericValue } = app.utils;

    function getActualShortCumulative(state, month) {
        let actualShortCumulative = 0;
        let prevActualShortCumulative = 0;
        let prevTargetShortCumulative = 0;

        for (let index = 1; index <= month; index += 1) {
            const targetRow = state.allTableRows[index - 1];
            actualShortCumulative += state.actualValues[index]?.shortTerm ?? targetRow.shortTermProfit;
            if (index < month) {
                prevActualShortCumulative += state.actualValues[index]?.shortTerm ?? targetRow.shortTermProfit;
                prevTargetShortCumulative += targetRow.shortTermProfit;
            }
        }

        return {
            actualShortCumulative,
            prevActualShortCumulative,
            prevTargetShortCumulative
        };
    }

    function buildRowHtml(state, row, now) {
        const idx = row.month - 1;
        const prevRow = idx > 0 ? state.allTableRows[idx - 1] : null;
        const prevActualLongAccum = !prevRow
            ? state.longTermPrincipalGlobal
            : (state.actualValues[prevRow.month]?.longTermCumul != null
                ? Number(state.actualValues[prevRow.month].longTermCumul)
                : prevRow.longTermAccumulated);

        const longTermROI = row.longTermPrincipal > 0
            ? (((row.longTermAccumulated - row.longTermPrincipal) / row.longTermPrincipal) * 100).toFixed(2)
            : '0.00';

        const actualShort = state.actualValues[row.month]?.shortTerm ?? null;
        const actualLongCumul = state.actualValues[row.month]?.longTermCumul ?? null;
        const displayShortInput = actualShort !== null ? actualShort : '';
        const displayLongCumulInput = actualLongCumul !== null ? actualLongCumul : '';
        const hasActualInput = hasNumericValue(actualShort) || hasNumericValue(actualLongCumul);
        const effectiveShort = hasNumericValue(actualShort) ? Number(actualShort) : row.shortTermProfit;
        const effectiveLongCumul = hasNumericValue(actualLongCumul) ? Number(actualLongCumul) : row.longTermAccumulated;
        const actualLongProfit = effectiveLongCumul - prevActualLongAccum - row.longTermInvest;
        const actualTotalProfit = effectiveShort + actualLongProfit;
        const rate = hasActualInput && row.profit > 0 ? ((actualTotalProfit / row.profit) * 100).toFixed(1) : null;
        const actualEndAssetDisplay = hasActualInput ? row.assetBefore + row.monthlyInvest + actualTotalProfit : null;

        let initialPrincipalROI = null;
        if (actualEndAssetDisplay !== null) {
            const cumulativeProfit = actualEndAssetDisplay - (row.longTermPrincipal + row.shortTermPrincipal + row.monthlyInvest);
            const initialPrincipal = state.longTermPrincipalGlobal + state.shortTermPrincipalGlobal;
            if (initialPrincipal > 0) {
                initialPrincipalROI = ((cumulativeProfit / initialPrincipal) * 100).toFixed(1);
            }
        }

        const rateColor = rate !== null && parseFloat(rate) >= 100 ? 'var(--accent-primary)' : '#ef4444';
        const achievementHtml = rate !== null ? ` <span style="color:${rateColor}; font-size:11px;">(${rate}%)</span>` : '';
        const shortCumulative = getActualShortCumulative(state, row.month);
        const shortCumulStyle = state.showShortCumul ? '' : 'display:none;';
        const currentShortTermPrincipal = row.shortTermPrincipal + (row.monthlyInvest - row.longTermInvest);
        const shortInitPlusCumul = currentShortTermPrincipal + shortCumulative.actualShortCumulative;
        const shortInitPlusCumulMinusMonthlyInvest = shortInitPlusCumul - (row.monthlyInvest - row.longTermInvest);
        const prevActualShortInitPlusCumul = row.shortTermPrincipal + shortCumulative.prevActualShortCumulative;
        const prevTargetShortInitPlusCumul = row.shortTermPrincipal + shortCumulative.prevTargetShortCumulative;

        const shortAchievePercent = hasNumericValue(actualShort) && row.shortTermProfit > 0
            ? (Number(actualShort) / row.shortTermProfit) * 100
            : null;
        const shortAchieveText = shortAchievePercent !== null ? shortAchievePercent.toFixed(1) : null;
        const shortAchieveColor = shortAchieveText !== null && parseFloat(shortAchieveText) >= 100 ? 'var(--accent-primary)' : '#ef4444';

        const longTermTargetProfit = row.profit - row.shortTermProfit;
        let longTermProfitRate = null;
        if (hasNumericValue(actualLongCumul)) {
            const longTermActualProfit = Number(actualLongCumul) - prevActualLongAccum - row.longTermInvest;
            if (longTermTargetProfit > 0) {
                longTermProfitRate = (longTermActualProfit / longTermTargetProfit) * 100;
            } else if (longTermTargetProfit === 0) {
                longTermProfitRate = longTermActualProfit >= 0 ? 100 : 0;
            } else {
                longTermProfitRate = longTermActualProfit >= longTermTargetProfit ? 100 : 0;
            }
        }

        const longTermRateText = longTermProfitRate !== null ? longTermProfitRate.toFixed(1) : null;
        const longTermRateColor = longTermRateText !== null && parseFloat(longTermRateText) >= 100 ? 'var(--accent-primary)' : '#ef4444';
        const rowDate = getMonthDate(state.globalSettings.startDate, row.month);
        const isCurrentMonth = rowDate.getFullYear() === now.getFullYear() && rowDate.getMonth() === now.getMonth();
        const rowClass = row.highlight ? 'highlight-row' : isCurrentMonth ? 'current-month-row' : '';
        const override = state.monthSettingsOverrides[row.month];

        return `
            <tr ${rowClass ? `class="${rowClass}"` : ''}>
                <td data-tooltip="${row.month}월차 투자 기간 및 설정 상태입니다.">
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
                    <div style="color:var(--text-secondary); font-size:10px; margin-left:22px; margin-top:2px;">${row.dateStr}</div>
                </td>
                <td>
                    <div style="font-size:9px; color:var(--text-secondary); margin-bottom:2px;">목표</div>
                    <div class="number" data-tooltip="이번 달 시작 시점의 시뮬레이션상 목표 자산입니다.">${formatNumber(prevRow ? prevRow.assetAfter : row.assetBefore)}</div>
                    ${prevRow && prevRow.actualEndAsset != null ? `
                    <div style="font-size:9px; color:var(--text-secondary); margin-top:6px; margin-bottom:2px;">실제 이월</div>
                    <div class="number" style="color:var(--accent-primary);" data-tooltip="지난달 실제 종료 자산이 이번 달로 이월된 금액입니다.">${formatNumber(prevRow.actualEndAsset)}</div>
                    ` : ''}
                </td>
                <td class="number" style="color:var(--accent-success);">
                    <div data-tooltip="연 목표 수익률 달성을 위해 이번 달에 벌어야 하는 총 목표 수익금입니다.">${formatNumber(row.profit)}</div>
                    <div style="color:var(--text-secondary); font-size:11px; margin-top:6px;" data-tooltip="장기 및 단기 자산별로 배분된 목표 수익금의 합계입니다.">
                        (장)${formatNumber(row.profit - row.shortTermProfit)} + (단)${formatNumber(row.shortTermProfit)}
                    </div>
                </td>
                <td>
                    <div class="number" style="color:var(--accent-warning);" data-tooltip="이번 달 단기 투자 목표 수익금입니다.">${formatNumber(row.shortTermProfit)}</div>
                    <div style="font-size:9px; margin-top:4px; color:var(--text-secondary);" data-tooltip="현재까지의 단기 자산 총액 / 목표 단기 자산 총액 비율입니다.">
                        <span style="color:#00d9ff;">${formatNumber(prevActualShortInitPlusCumul)}</span> / ${formatNumber(prevTargetShortInitPlusCumul)}
                    </div>
                    <input type="number" class="actual-input" placeholder="실제 단기 수익"
                        value="${displayShortInput}"
                        onchange="setActual(${row.month}, 'shortTerm', this.value)"
                        style="margin-top:5px;"
                        data-tooltip="이번 달 실제 발생한 단기 투자 수익을 입력하세요.">
                </td>
                <td class="col-short-cumul" style="${shortCumulStyle}">
                    <div class="number" style="color:var(--accent-warning);" data-tooltip="투자 시작일부터 현재까지의 단기 투자 순수익 합계입니다.">${formatNumber(shortCumulative.actualShortCumulative)}</div>
                    <div style="color:var(--text-secondary); margin-top:3px;">
                        <span style="font-size:9px;">누적 원금 + 누적 수익</span><br>
                        <span class="number" style="font-size:11px; color:var(--text-primary);" data-tooltip="단기 투자에 투입된 총 원금과 누적 수익을 합친 현재 자산 가치입니다.">${formatNumber(shortInitPlusCumul)}</span>
                        ${shortAchieveText !== null ? `<span style="font-size:11px; color:${shortAchieveColor}; margin-left:6px;" data-tooltip="단기 자산 목표 대비 현재 자산의 달성률입니다.">(${shortAchieveText}%)</span>` : ''}
                        <div style="font-size:9px; color:var(--text-secondary); margin-top:2px;" data-tooltip="단기 수익금에서 월 재투자금으로 차감된 금액을 제외한 실제 잔액입니다.">(월 재투자 차감: ${formatNumber(shortInitPlusCumulMinusMonthlyInvest)})</div>
                    </div>
                </td>
                <td>
                    <div class="number">
                        <span data-tooltip="장기 투자 목표 달성을 위해 이번 달 말에 계좌에 있어야 할 목표 잔액(수익 포함)입니다.">${formatNumber(row.longTermAccumulated)}</span>
                        <span style="color:var(--text-secondary); font-size:9px; font-weight:normal; margin-left:4px;" data-tooltip="지금까지 장기 투자에 투입된 총 원금(재투자 포함)입니다.">(${formatNumber(row.longTermPrincipal)})</span>
                        <span style="color:var(--accent-success); font-size:11px;" data-tooltip="장기 투자 시뮬레이션상 기대 수익률입니다.">(+${longTermROI}%)</span>
                    </div>
                    <div style="display:flex; justify-content:flex-end; align-items:center; gap:6px;">
                        <input type="number" class="actual-input" placeholder="실제 장기 잔액 총액"
                            value="${displayLongCumulInput}"
                            onchange="setActual(${row.month}, 'longTermCumul', this.value)"
                            style="margin-top:5px;"
                            data-tooltip="이번 달 말 기준 실제 장기 투자 계좌의 총 잔액을 입력하세요.">
                        ${longTermRateText !== null ? `<span style="color:${longTermRateColor}; margin-top:6px; margin-left:6px; font-size:10px;" data-tooltip="이번 달 장기 투자 목표 수익 대비 실제 수익의 달성률입니다.">(${longTermRateText}%)</span>` : ''}
                    </div>
                    ${hasNumericValue(actualLongCumul) ? `
                    <div style="margin-top:4px; text-align:right; font-size:10px; color:${longTermRateColor};" data-tooltip="이번 달 실제 장기 투자 수익금 (월 재투자 금액 제외)">
                        금월 수익: ${formatNumber(actualLongProfit)}원
                    </div>
                    ` : ''}
                </td>
                <td class="number">
                    <div data-tooltip="이번 달 목표 수익 달성 시의 예상 총 자산입니다.">${formatNumber(row.assetAfter)}${achievementHtml}</div>
                    ${actualEndAssetDisplay !== null ? `
                    <div style="margin-top:6px;">
                        <span style="color:${actualEndAssetDisplay >= row.assetAfter ? 'var(--accent-primary)' : '#ef4444'}; font-family:'Monaco', 'Courier New', monospace; font-weight:700; font-size:12px;" data-tooltip="이번 달 실제 단기/장기 성과가 반영된 최종 종료 자산입니다.">${formatNumber(actualEndAssetDisplay)}</span>
                        ${initialPrincipalROI !== null ? `<span style="font-size:10px; color:${parseFloat(initialPrincipalROI) >= 0 ? 'var(--accent-success)' : '#ef4444'}; margin-left:4px;" data-tooltip="초기 투자 원금 대비 전체 자산의 총 수익률(ROI)입니다.">(${parseFloat(initialPrincipalROI) > 0 ? '+' : ''}${initialPrincipalROI}%)</span>` : ''}
                    </div>` : ''}
                    <div style="margin-top:2px; font-family:'Monaco', 'Courier New', monospace; font-size:9px; color:var(--text-secondary);" data-tooltip="실제 입력을 배제한, 맨 처음 시뮬레이션에서 계획했던 목표 자산입니다.">${formatNumber(row.initialAssetAfter)}(초기 목표)</div>
                </td>
            </tr>
        `;
    }

    function toggleShortCumul(state) {
        state.showShortCumul = !state.showShortCumul;
        document.querySelectorAll('.col-short-cumul').forEach((element) => {
            element.style.display = state.showShortCumul ? '' : 'none';
        });

        const button = document.getElementById('shortCumulToggleBtn');
        if (button) {
            button.textContent = state.showShortCumul ? '단기누적 숨기기' : '단기누적 보기';
        }
    }

    function renderTableByYear(state, year) {
        const tableBody = document.getElementById('tableBody');
        if (!tableBody) return;

        const rows = state.yearGroups[year] || [];
        const now = new Date();
        tableBody.innerHTML = rows.map((row) => buildRowHtml(state, row, now)).join('');
    }

    function createYearTabs(state, renderTableByYearFn) {
        const yearTabs = document.getElementById('yearTabs');
        if (!yearTabs) return null;

        const years = Object.keys(state.yearGroups).sort((a, b) => Number(a) - Number(b));
        if (years.length === 0) {
            yearTabs.innerHTML = '';
            return null;
        }

        const currentYear = new Date().getFullYear();
        const defaultYear = years.includes(String(currentYear)) ? currentYear : Number(years[0]);
        yearTabs.innerHTML = years.map((year) => `
            <button class="tab ${Number(year) === defaultYear ? 'active' : ''}" data-year="${year}">
                ${year}년
            </button>
        `).join('');

        yearTabs.querySelectorAll('.tab').forEach((tab) => {
            tab.addEventListener('click', () => {
                yearTabs.querySelectorAll('.tab').forEach((button) => button.classList.remove('active'));
                tab.classList.add('active');
                renderTableByYearFn(state, Number(tab.dataset.year));
            });
        });

        setTimeout(updateYearTabsScrollButtons, 50);
        return defaultYear;
    }

    function scrollYearTabs(direction) {
        const tabs = document.getElementById('yearTabs');
        if (tabs) {
            tabs.scrollBy({ left: direction * 200, behavior: 'smooth' });
        }
    }

    function updateYearTabsScrollButtons() {
        const tabs = document.getElementById('yearTabs');
        const leftBtn = document.getElementById('yearTabsLeftBtn');
        const rightBtn = document.getElementById('yearTabsRightBtn');

        if (!tabs || !leftBtn || !rightBtn) return;

        if (tabs.scrollWidth > tabs.clientWidth) {
            leftBtn.style.display = tabs.scrollLeft > 0 ? 'flex' : 'none';
            rightBtn.style.display = tabs.scrollLeft + tabs.clientWidth >= tabs.scrollWidth - 1 ? 'none' : 'flex';
            return;
        }

        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
    }

    app.table = {
        toggleShortCumul,
        renderTableByYear,
        createYearTabs,
        scrollYearTabs,
        updateYearTabsScrollButtons
    };
})(window.CompoundAsset = window.CompoundAsset || {});
