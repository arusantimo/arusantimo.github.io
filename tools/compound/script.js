(function (app) {
    const state = app.state;
    const { renderChart, toggleChartView } = app.chart;
    const { calculateAndDisplay } = app.calculator;
    const { loadConfig, loadFromLocalStorage, saveConfig, saveToLocalStorage } = app.persistence;
    const { savePerformanceReport } = app.report;
    const {
        bindSettingInputs,
        clearMonthSettings,
        closeMonthSettings,
        deleteSettingTab,
        openMonthSettings,
        renderSettingsTabs,
        saveMonthSettings,
        selectSettingTab
    } = app.settings;
    const { createYearTabs, renderTableByYear, scrollYearTabs, toggleShortCumul, updateYearTabsScrollButtons } = app.table;
    const { initCustomTooltip } = app.tooltip;

    const rerender = () => {
        calculateAndDisplay(state, {
            createYearTabs,
            renderTableByYear,
            renderChart
        });
    };

    const settingsDependencies = {
        saveToLocalStorage: () => saveToLocalStorage(state),
        calculateAndDisplay: rerender
    };

    const settingsModalDependencies = {
        saveToLocalStorage: settingsDependencies.saveToLocalStorage,
        calculateAndDisplay: settingsDependencies.calculateAndDisplay,
        renderSettingsTabs: () => renderSettingsTabs(state)
    };

    window.toggleShortCumul = () => toggleShortCumul(state);
    window.toggleChartView = () => toggleChartView(state, () => renderChart(state));
    window.scrollYearTabs = (direction) => scrollYearTabs(direction);
    window.updateYearTabsScrollButtons = () => updateYearTabsScrollButtons();
    window.selectSettingTab = (month) => selectSettingTab(state, month);
    window.deleteSettingTab = (month, event) => deleteSettingTab(state, month, event, settingsDependencies);
    window.openMonthSettings = (month) => openMonthSettings(state, month);
    window.closeMonthSettings = () => closeMonthSettings(state);
    window.saveMonthSettings = () => saveMonthSettings(state, settingsModalDependencies);
    window.clearMonthSettings = () => clearMonthSettings(state, settingsModalDependencies);
    window.setActual = (month, field, value) => {
        if (!state.actualValues[month]) {
            state.actualValues[month] = {};
        }

        const parsedValue = parseFloat(value);
        state.actualValues[month][field] = value === '' || Number.isNaN(parsedValue) ? null : parsedValue;
        saveToLocalStorage(state);
        rerender();
    };

    document.getElementById('saveConfigBtn')?.addEventListener('click', () => saveConfig(state));
    document.getElementById('loadConfigBtn')?.addEventListener('click', () => {
        loadConfig(state, {
            onLoaded: () => {
                selectSettingTab(state, 0);
                rerender();
            }
        });
    });
    document.getElementById('saveReportBtn')?.addEventListener('click', () => savePerformanceReport(state));
    window.addEventListener('resize', updateYearTabsScrollButtons);

    loadFromLocalStorage(state);
    bindSettingInputs(state, settingsDependencies);
    selectSettingTab(state, 0);
    initCustomTooltip();
    rerender();
})(window.CompoundAsset = window.CompoundAsset || {});
