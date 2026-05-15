(function (app) {
    const DEFAULT_SETTINGS = {
        principal: 500000000,
        annualTargetRate: 12,
        monthlyInvestment: 5000000,
        startDate: '2026-01-01',
        endDate: '2028-01-01',
        longTermRatio: 60,
        longTermAnnualTarget: 10,
        shortTermRatio: 40
    };

    app.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
    app.state = {
        allTableRows: [],
        yearGroups: {},
        actualValues: {},
        monthSettingsOverrides: {},
        profitChartInstance: null,
        showShortCumul: true,
        chartViewMode: 'all',
        longTermPrincipalGlobal: 0,
        shortTermPrincipalGlobal: 0,
        globalSettings: { ...DEFAULT_SETTINGS },
        currentSettingsTab: 0,
        currentEditingMonth: null
    };
})(window.CompoundAsset = window.CompoundAsset || {});
