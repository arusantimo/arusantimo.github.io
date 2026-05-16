(function (app) {
    function formatNumber(num) {
        if (num === null || num === undefined) return '-';
        return Math.floor(num).toLocaleString('ko-KR');
    }

    function getMonthsDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        let months = 0;
        const current = new Date(start);

        while (current < end && months < 1200) {
            months += 1;
            current.setMonth(current.getMonth() + 1);
        }

        return Math.max(1, months);
    }

    function formatDate(dateInput) {
        const date = new Date(dateInput);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
    }

    function getMonthDate(startDate, month) {
        const date = new Date(startDate);
        date.setMonth(date.getMonth() + month - 1);
        return date;
    }

    function normalizeRatios(longTermRatio, shortTermRatio) {
        const totalRatio = longTermRatio + shortTermRatio;
        return {
            normalizedLongTerm: totalRatio > 0 ? longTermRatio / totalRatio : 0.5,
            normalizedShortTerm: totalRatio > 0 ? shortTermRatio / totalRatio : 0.5
        };
    }

    function hasNumericValue(value) {
        return value !== null && value !== undefined && !Number.isNaN(Number(value));
    }

    function formatKoreanCurrency(num) {
        if (num === null || num === undefined || Number.isNaN(Number(num))) return '';
        const absNum = Math.abs(Math.floor(Number(num) / 1000) * 1000);
        if (absNum === 0) return '0원';

        const units = ['', '만', '억', '조', '경'];
        const subUnits = ['', '십', '백', '천'];
        let result = '';

        let temp = absNum;
        let unitIdx = 0;
        while (temp > 0) {
            let chunk = temp % 10000;
            if (chunk > 0) {
                let chunkStr = '';
                let subTemp = chunk;
                for (let i = 0; i < 4; i++) {
                    let digit = subTemp % 10;
                    if (digit > 0) {
                        chunkStr = digit + subUnits[i] + (i > 0 ? ' ' : '') + chunkStr;
                    }
                    subTemp = Math.floor(subTemp / 10);
                }
                result = chunkStr.trim() + units[unitIdx] + ' ' + result;
            }
            temp = Math.floor(temp / 10000);
            unitIdx++;
        }

        return (num < 0 ? '-' : '') + result.trim() + '원';
    }

    app.utils = {
        formatNumber,
        getMonthsDifference,
        formatDate,
        getMonthDate,
        normalizeRatios,
        hasNumericValue,
        formatKoreanCurrency
    };
})(window.CompoundAsset = window.CompoundAsset || {});
