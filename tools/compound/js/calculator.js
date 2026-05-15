(function (app) {
    const {
        formatDate,
        getMonthDate,
        getMonthsDifference,
        hasNumericValue,
        normalizeRatios
    } = app.utils;

    function updateAllocationDisplay(normalizedLongTerm, normalizedShortTerm, monthlyInvestment) {
        const longTermBar = document.getElementById('longTermBar');
        const longTermText = document.getElementById('longTermText');
        const shortTermBar = document.getElementById('shortTermBar');
        const shortTermText = document.getElementById('shortTermText');

        if (longTermBar) longTermBar.style.width = `${normalizedLongTerm * 100}%`;
        if (longTermText) longTermText.textContent = `${(normalizedLongTerm * 100).toFixed(0)}%`;
        if (shortTermBar) shortTermBar.style.width = `${normalizedShortTerm * 100}%`;
        if (shortTermText) shortTermText.textContent = `${(normalizedShortTerm * 100).toFixed(0)}%`;

        const longTermInvestAmount = monthlyInvestment * normalizedLongTerm;
        const shortTermInvestAmount = monthlyInvestment * normalizedShortTerm;

        const totalInvestEl = document.getElementById('monthlyInvestmentTotal');
        const longInvestEl = document.getElementById('longTermInvestAmount');
        const shortInvestEl = document.getElementById('shortTermInvestAmount');

        if (totalInvestEl) totalInvestEl.textContent = Math.floor(monthlyInvestment).toLocaleString('ko-KR');
        if (longInvestEl) longInvestEl.textContent = Math.floor(longTermInvestAmount).toLocaleString('ko-KR');
        if (shortInvestEl) shortInvestEl.textContent = Math.floor(shortTermInvestAmount).toLocaleString('ko-KR');
    }

    function calculateAndDisplay(state, { createYearTabs, renderTableByYear, renderChart }) {
        const principal = parseFloat(state.globalSettings.principal) || 0;
        const monthlyInvestment = parseFloat(state.globalSettings.monthlyInvestment) || 0;
        const startDate = state.globalSettings.startDate;
        const endDate = state.globalSettings.endDate;
        const longTermRatio = parseFloat(state.globalSettings.longTermRatio) || 0;
        const shortTermRatio = parseFloat(state.globalSettings.shortTermRatio) || 0;
        const annualTargetRate = parseFloat(state.globalSettings.annualTargetRate) || 12;
        const longTermAnnualTarget = parseFloat(state.globalSettings.longTermAnnualTarget) || 10;

        const { normalizedLongTerm, normalizedShortTerm } = normalizeRatios(longTermRatio, shortTermRatio);
        state.longTermPrincipalGlobal = principal * normalizedLongTerm;
        state.shortTermPrincipalGlobal = principal * normalizedShortTerm;

        updateAllocationDisplay(normalizedLongTerm, normalizedShortTerm, monthlyInvestment);

        const months = getMonthsDifference(startDate, endDate);
        let currentSettings = {
            annualTargetRate,
            monthlyInvestment,
            longTermRatio,
            shortTermRatio,
            longTermAnnualTarget
        };

        state.allTableRows = [];
        state.yearGroups = {};

        let currentAsset = principal;
        let longTermAccumulated = state.longTermPrincipalGlobal;
        let runningLongPrincipal = state.longTermPrincipalGlobal;
        let runningShortPrincipal = state.shortTermPrincipalGlobal;
        let shortTermCumulativeProfitTotal = 0;
        let carryAssetForNextMonth = null;
        let cleanCurrentAsset = principal;

        for (let month = 1; month <= months; month += 1) {
            const currentDate = getMonthDate(startDate, month);
            const year = currentDate.getFullYear();
            const dateStr = formatDate(currentDate);

            let currentAdditionalSeed = 0;
            if (state.monthSettingsOverrides[month]) {
                const { additionalSeed, ...persistentSettings } = state.monthSettingsOverrides[month];
                currentSettings = { ...currentSettings, ...persistentSettings };
                currentAdditionalSeed = additionalSeed || 0;
            }

            const normalizedCurrentRatios = normalizeRatios(currentSettings.longTermRatio, currentSettings.shortTermRatio);
            const targetMonthlyRate = Math.pow(1 + currentSettings.annualTargetRate / 100, 1 / 12) - 1;
            const longTermMonthlyRate = Math.pow(1 + currentSettings.longTermAnnualTarget / 100, 1 / 12) - 1;
            const longTermContribution = normalizedCurrentRatios.normalizedLongTerm * longTermMonthlyRate;
            const shortTermMonthlyRequired = (targetMonthlyRate - longTermContribution) / normalizedCurrentRatios.normalizedShortTerm;
            const currentMonthlyInvestment = currentSettings.monthlyInvestment;

            const assetAtMonthStart = carryAssetForNextMonth !== null ? carryAssetForNextMonth : currentAsset;
            carryAssetForNextMonth = null;

            const prevActualLongCumulInput = month > 1 ? state.actualValues[month - 1]?.longTermCumul ?? null : null;
            if (hasNumericValue(prevActualLongCumulInput)) {
                longTermAccumulated = Number(prevActualLongCumulInput);
            }
            const prevLongTermAccumulated = longTermAccumulated;

            const longTermAssetAtMonth = assetAtMonthStart * normalizedCurrentRatios.normalizedLongTerm;
            const shortTermAssetAtMonth = assetAtMonthStart * normalizedCurrentRatios.normalizedShortTerm;
            const longTermMonthlyProfit = longTermAssetAtMonth * longTermMonthlyRate;
            const shortTermMonthlyProfit = shortTermAssetAtMonth * shortTermMonthlyRequired;

            const actualShortInput = state.actualValues[month]?.shortTerm ?? null;
            const shortToAdd = hasNumericValue(actualShortInput) ? Number(actualShortInput) : shortTermMonthlyProfit;
            shortTermCumulativeProfitTotal += shortToAdd;

            const monthlyProfitDynamic = longTermMonthlyProfit + shortTermMonthlyProfit;
            const longTermInvest = (currentMonthlyInvestment * normalizedCurrentRatios.normalizedLongTerm)
                + (currentAdditionalSeed * normalizedCurrentRatios.normalizedLongTerm);
            const shortTermInvest = (currentMonthlyInvestment * normalizedCurrentRatios.normalizedShortTerm)
                + (currentAdditionalSeed * normalizedCurrentRatios.normalizedShortTerm);

            longTermAccumulated += longTermInvest + longTermMonthlyProfit;
            currentAsset = assetAtMonthStart + currentMonthlyInvestment + currentAdditionalSeed + monthlyProfitDynamic;

            const cleanLongProfit = cleanCurrentAsset * normalizedCurrentRatios.normalizedLongTerm * longTermMonthlyRate;
            const cleanShortProfit = cleanCurrentAsset * normalizedCurrentRatios.normalizedShortTerm * shortTermMonthlyRequired;
            const initialAssetAfter = cleanCurrentAsset + currentMonthlyInvestment + currentAdditionalSeed + cleanLongProfit + cleanShortProfit;
            cleanCurrentAsset = initialAssetAfter;

            const actualShort = state.actualValues[month]?.shortTerm ?? null;
            const actualLongCumul = state.actualValues[month]?.longTermCumul ?? null;
            const effectiveShort = hasNumericValue(actualShort) ? Number(actualShort) : shortTermMonthlyProfit;
            const effectiveLongCumul = hasNumericValue(actualLongCumul) ? Number(actualLongCumul) : longTermAccumulated;
            const actualLongProfit = effectiveLongCumul - prevLongTermAccumulated - longTermInvest;
            const actualTotalProfit = effectiveShort + actualLongProfit;
            const actualEndAsset = assetAtMonthStart + currentMonthlyInvestment + currentAdditionalSeed + actualTotalProfit;

            if (hasNumericValue(actualShort) || hasNumericValue(actualLongCumul)) {
                carryAssetForNextMonth = actualEndAsset;
            }

            const rowData = {
                month,
                dateStr,
                assetBefore: assetAtMonthStart,
                monthlyInvest: currentMonthlyInvestment + currentAdditionalSeed,
                longTermInvest,
                profit: monthlyProfitDynamic,
                shortTermProfit: shortTermMonthlyProfit,
                shortTermAssetAtMonth,
                shortTermPrincipal: runningShortPrincipal,
                shortTermCumulativeProfit: shortTermCumulativeProfitTotal,
                longTermAccumulated,
                longTermPrincipal: runningLongPrincipal,
                assetAfter: currentAsset,
                initialAssetAfter,
                actualEndAsset: hasNumericValue(actualShort) || hasNumericValue(actualLongCumul) ? actualEndAsset : null,
                highlight: month === months,
                year
            };

            runningLongPrincipal += longTermInvest;
            runningShortPrincipal += shortTermInvest;

            state.allTableRows.push(rowData);
            if (!state.yearGroups[year]) {
                state.yearGroups[year] = [];
            }
            state.yearGroups[year].push(rowData);
        }

        const defaultYear = createYearTabs(state, renderTableByYear);
        if (defaultYear !== null) {
            renderTableByYear(state, defaultYear);
        }
        renderChart(state);
    }

    app.calculator = { calculateAndDisplay };
})(window.CompoundAsset = window.CompoundAsset || {});
