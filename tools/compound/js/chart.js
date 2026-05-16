(function (app) {
    const { getMonthDate } = app.utils;

    function formatAxisValue(value) {
        if (value === null) return null;
        if (Math.abs(value) >= 100000000) return `${(value / 100000000).toFixed(1)}억`;
        if (Math.abs(value) >= 10000) return `${(value / 10000).toFixed(0)}만`;
        return value.toLocaleString('ko-KR');
    }

    function getFilteredRows(state) {
        if (state.chartViewMode !== 'toDate') {
            return state.allTableRows;
        }

        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;

        return state.allTableRows.filter((row) => {
            const rowDate = getMonthDate(state.globalSettings.startDate, row.month);
            const rowYear = rowDate.getFullYear();
            const rowMonth = rowDate.getMonth() + 1;
            return rowYear < currentYear || (rowYear === currentYear && rowMonth <= currentMonth);
        });
    }

    function toggleChartView(state, renderChart) {
        state.chartViewMode = state.chartViewMode === 'all' ? 'toDate' : 'all';
        const button = document.getElementById('chartViewToggleBtn');
        if (button) {
            button.textContent = state.chartViewMode === 'all' ? '오늘까지 보기' : '전체 보기';
        }
        renderChart();
    }

    function renderChart(state) {
        const canvas = document.getElementById('profitChart');
        if (!canvas || state.allTableRows.length === 0) return;

        const filteredRows = getFilteredRows(state);
        const labels = filteredRows.map((row) => {
            const date = getMonthDate(state.globalSettings.startDate, row.month);
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
        });

        const targetAssets = filteredRows.map((row) => row.initialAssetAfter);
        const actualAssets = filteredRows.map((row) => row.actualEndAsset ?? null);
        const principal = state.allTableRows[0].assetBefore;
        const monthlyInvest = state.allTableRows[0].monthlyInvest;
        const savingsOnly = filteredRows.map((row) => principal + monthlyInvest * row.month);

        const annualSavingsRate = 0.025;
        const monthlySavingsRate = Math.pow(1 + annualSavingsRate, 1 / 12) - 1;
        let runningSavingsAsset = principal;
        const fullSavingsWithInterest = state.allTableRows.map((row) => {
            runningSavingsAsset = runningSavingsAsset * (1 + monthlySavingsRate) + monthlyInvest;
            return { month: row.month, value: runningSavingsAsset };
        });
        const savingsWithInterest = filteredRows.map((row) => {
            const matched = fullSavingsWithInterest.find((entry) => entry.month === row.month);
            return matched?.value ?? null;
        });

        const chartData = {
            labels,
            datasets: [
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
                    spanGaps: false
                },
                {
                    label: '초기 목표 자산',
                    data: targetAssets,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    tension: 0.3,
                    pointRadius: 2,
                    pointHoverRadius: 5,
                    borderWidth: 2,
                    fill: false
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
                    fill: false
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
                    fill: false
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
                        label: (context) => {
                            if (context.parsed.y === null) return null;

                            const value = context.parsed.y;
                            const savingsOnlyDataset = context.chart.data.datasets.find((dataset) => dataset.label === '저축만 (수익 없음)');
                            const savingsOnlyValue = savingsOnlyDataset?.data?.[context.dataIndex] ?? null;

                            let diffText = '';
                            if (context.dataset.label !== '저축만 (수익 없음)' && savingsOnlyValue !== null && savingsOnlyValue > 0) {
                                const diffPercent = ((value - savingsOnlyValue) / savingsOnlyValue) * 100;
                                diffText = ` (${diffPercent >= 0 ? '+' : ''}${diffPercent.toFixed(1)}%)`;
                            }

                            const koValue = app.utils.formatKoreanCurrency(value);
                            return ` ${context.dataset.label}: ${Math.floor(value).toLocaleString('ko-KR')}원 (${koValue})${diffText}`;
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
                        callback: (value) => formatAxisValue(value)
                    },
                    grid: { color: 'rgba(255,255,255,0.04)' }
                }
            }
        };

        if (state.profitChartInstance) {
            state.profitChartInstance.data = chartData;
            state.profitChartInstance.update('none');
            return;
        }

        state.profitChartInstance = new Chart(canvas, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    }

    app.chart = {
        toggleChartView,
        renderChart
    };
})(window.CompoundAsset = window.CompoundAsset || {});
