(function (root) {
    const FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT = 12;
    const FUNDAMENTAL_BROADENING_UNIVERSE_COUNT = 20;
    const FUNDAMENTAL_CORP_CACHE_KEY = "marketAnalyzeDartCorpMap";
    const FUNDAMENTAL_CORP_CACHE_MONTH_KEY = "marketAnalyzeDartCorpMapMonth";
    const FUNDAMENTAL_CORP_CACHE_FINGERPRINT_KEY = "marketAnalyzeDartCorpMapFingerprint";
    const KOSIS_EXPORT_INDICATOR_URL = "https://kosis.kr/visual/nsportalStats/detailContents.do?listId=B&statJipyoId=3660&vStatJipyoId=5193";
    const KOSIS_EXPORT_SERIES_CONFIG = {
        orgId: "360",
        tblId: "DT_1R11001_FRM101",
        lookbackMonths: 26
    };

    function clampLocal(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function normalizeMonthKey(raw) {
        const normalized = String(raw || "").replace(/\D/g, "");
        if (normalized.length >= 6) return normalized.slice(0, 6);
        return "";
    }

    function formatMonthLabel(raw) {
        const monthKey = normalizeMonthKey(raw);
        if (monthKey.length !== 6) return "-";
        return `${monthKey.slice(0, 4)}.${monthKey.slice(4, 6)}`;
    }

    function shiftMonthKey(raw, delta) {
        const monthKey = normalizeMonthKey(raw);
        if (monthKey.length !== 6) return "";
        const year = Number(monthKey.slice(0, 4));
        const monthIndex = Number(monthKey.slice(4, 6)) - 1;
        if (!Number.isFinite(year) || !Number.isFinite(monthIndex)) return "";
        const date = new Date(year, monthIndex + delta, 1);
        return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
    }

    function buildMonthWindow(lookbackMonths = 24) {
        const count = Math.max(13, Number(lookbackMonths) || 24);
        const end = new Date();
        end.setDate(1);
        const start = new Date(end.getFullYear(), end.getMonth() - (count - 1), 1);
        return {
            startMonth: `${start.getFullYear()}${String(start.getMonth() + 1).padStart(2, "0")}`,
            endMonth: `${end.getFullYear()}${String(end.getMonth() + 1).padStart(2, "0")}`
        };
    }

    function parseSignedAmount(raw) {
        const normalized = String(raw || "")
            .replace(/,/g, "")
            .replace(/\s+/g, "")
            .replace(/[()]/g, match => (match === "(" ? "-" : ""));
        const match = normalized.match(/-?\d+(?:\.\d+)?/);
        return match ? Number(match[0]) : null;
    }

    function sumWeighted(items, predicate) {
        let weightSum = 0;
        let hitSum = 0;
        items.forEach(item => {
            const weight = Number(item.weight);
            if (!Number.isFinite(weight) || weight <= 0) return;
            weightSum += weight;
            if (predicate(item)) hitSum += weight;
        });
        return weightSum > 0 ? hitSum / weightSum : null;
    }

    function buildNeutralExportData(reason = "수출 모멘텀 대기 중") {
        return {
            latestMonth: "",
            exportValueUsd: null,
            exportYoY: null,
            exportYoYDelta: null,
            export3mAvgYoY: null,
            state: "neutral",
            score: 17,
            reason
        };
    }

    function buildNeutralEarningsData(reason = "실적 breadth 대기 중") {
        return {
            coverageCount: 0,
            snapshotQuarter: "",
            opIncomeBreadth: null,
            netIncomeBreadth: null,
            turnaroundBreadth: null,
            positiveRoeBreadth: null,
            state: "neutral",
            score: 18,
            reason
        };
    }

    function buildNeutralBroadeningData(reason = "상승 확산 대기 중") {
        return {
            broadeningScore: 15,
            broadeningState: "neutral",
            supportBreadth20d: null,
            supportBreadth60d: null,
            supportPositiveReturnBreadth: null,
            coverageCount: 0,
            reason
        };
    }

    function formatSignedPercentText(value, digits = 1, unit = "%") {
        if (!Number.isFinite(value)) return "-";
        const sign = value > 0 ? "+" : "";
        return `${sign}${value.toFixed(digits)}${unit}`;
    }

    function getObjectField(row, candidates = []) {
        if (!row || typeof row !== "object") return undefined;
        for (const candidate of candidates) {
            if (row[candidate] !== undefined && row[candidate] !== null) return row[candidate];
            const matchedKey = Object.keys(row).find(key => key.toLowerCase() === String(candidate).toLowerCase());
            if (matchedKey && row[matchedKey] !== undefined && row[matchedKey] !== null) {
                return row[matchedKey];
            }
        }
        return undefined;
    }

    function collectKosisClassFields(row, suffix) {
        const values = [];
        for (let index = 1; index <= 8; index += 1) {
            const fieldValue = getObjectField(row, [
                `C${index}${suffix}`,
                `c${index}${suffix}`,
                `OBJL${index}${suffix}`,
                `objL${index}${suffix}`
            ]);
            if (!fieldValue) continue;
            const normalized = String(fieldValue).trim();
            if (normalized) values.push(normalized);
        }
        return [...new Set(values)];
    }

    function parseKosisPayload(rawText) {
        const trimmed = String(rawText || "").trim().replace(/^\uFEFF/, "");
        const arrayIndex = trimmed.indexOf("[");
        const objectIndex = trimmed.indexOf("{");
        const startIndex = [arrayIndex, objectIndex].filter(index => index >= 0).sort((left, right) => left - right)[0] ?? 0;
        const jsonText = trimmed.slice(startIndex);
        const payload = JSON.parse(jsonText);
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload?.data)) return payload.data;
        if (Array.isArray(payload?.result)) return payload.result;
        if (Array.isArray(payload?.response)) return payload.response;
        if (payload?.errMsg || payload?.error || payload?.message) {
            throw new Error(payload.errMsg || payload.error || payload.message);
        }
        throw new Error("KOSIS JSON 구조를 해석하지 못했습니다.");
    }

    function buildKosisExportUrl(apiKey) {
        const { orgId, tblId, lookbackMonths } = KOSIS_EXPORT_SERIES_CONFIG;
        const { startMonth, endMonth } = buildMonthWindow(lookbackMonths);
        const query = new URLSearchParams({
            method: "getList",
            apiKey,
            format: "json",
            jsonVD: "Y",
            orgId,
            tblId,
            itmId: "ALL",
            objL1: "ALL",
            prdSe: "M",
            startPrdDe: startMonth,
            endPrdDe: endMonth
        });
        return `https://kosis.kr/openapi/Param/statisticsParameterData.do?${query.toString()}`;
    }

    function normalizeKosisSeriesRows(rows = []) {
        return rows
            .map(row => {
                const monthKey = normalizeMonthKey(getObjectField(row, ["PRD_DE", "prd_de", "prdDe", "prdde"]));
                const value = parseSignedAmount(getObjectField(row, ["DT", "dt", "DATA_VALUE", "data_value"]));
                const itemName = String(getObjectField(row, ["ITM_NM", "itm_nm", "itmNm", "itmNmKor"]) || "").trim();
                const itemId = String(getObjectField(row, ["ITM_ID", "itm_id", "itmId"]) || "").trim();
                const classNames = collectKosisClassFields(row, "_NM");
                const classCodes = collectKosisClassFields(row, "");
                return {
                    monthKey,
                    value,
                    itemName,
                    itemId,
                    classNames,
                    classCodes
                };
            })
            .filter(row => row.monthKey && Number.isFinite(row.value));
    }

    function isMonthlyExportItem(itemName) {
        const normalized = String(itemName || "");
        return /수출/.test(normalized) && !/수입|무역수지|증감률|구성비|지수|누계|누적/.test(normalized);
    }

    function scoreKosisExportSeries(series) {
        const hasTotalLabel = (series.classNames || []).some(name => ["총계", "합계", "전체", "계"].includes(String(name).trim()));
        let score = 0;
        if (isMonthlyExportItem(series.itemName)) score += 25;
        if (hasTotalLabel) score += 18;
        if (/누계|누적/.test(series.itemName)) score -= 14;
        score -= Math.max(0, (series.classNames || []).length - 1) * 2;
        score += Math.log10(Math.max(1, series.latestValue || series.avgValue || 1));
        score += Math.min(series.count || 0, KOSIS_EXPORT_SERIES_CONFIG.lookbackMonths) / 10;
        return score;
    }

    function selectBestKosisExportSeries(rows = []) {
        const normalizedRows = normalizeKosisSeriesRows(rows).filter(row => isMonthlyExportItem(row.itemName));
        if (!normalizedRows.length) {
            throw new Error("KOSIS 수출 월간 시계열 후보가 없습니다.");
        }

        const grouped = new Map();
        normalizedRows.forEach(row => {
            const classKey = (row.classCodes.length ? row.classCodes : row.classNames).join("|") || "ALL";
            const groupKey = `${row.itemId || row.itemName}|${classKey}`;
            if (!grouped.has(groupKey)) {
                grouped.set(groupKey, {
                    key: groupKey,
                    itemName: row.itemName,
                    itemId: row.itemId,
                    classNames: [...row.classNames],
                    rows: []
                });
            }
            grouped.get(groupKey).rows.push(row);
        });

        const candidates = [...grouped.values()]
            .map(series => {
                series.rows.sort((left, right) => left.monthKey.localeCompare(right.monthKey));
                series.latestValue = series.rows.at(-1)?.value ?? null;
                series.avgValue = series.rows.reduce((sum, row) => sum + row.value, 0) / Math.max(1, series.rows.length);
                series.count = series.rows.length;
                series.score = scoreKosisExportSeries(series);
                return series;
            })
            .sort((left, right) =>
                right.score - left.score
                || (right.latestValue || 0) - (left.latestValue || 0)
                || right.count - left.count
            );

        return candidates[0];
    }

    async function fetchKosisExportSeries(apiKey) {
        const rawText = await fetchWithProxyFallback(
            buildKosisExportUrl(apiKey),
            "",
            { proxyOrder: ["alloriginsRaw", "codetabs", "allorigins"], timeoutMs: 15000 }
        );
        const payload = parseKosisPayload(rawText);
        return selectBestKosisExportSeries(payload);
    }

    function calculateExportMomentumFromSeries(series) {
        const rows = Array.isArray(series?.rows) ? series.rows : [];
        if (!rows.length) return buildNeutralExportData("수출 시계열 부족");

        const latest = rows.at(-1);
        const lookup = new Map(rows.map(row => [row.monthKey, row]));
        const latestPrevYear = lookup.get(shiftMonthKey(latest.monthKey, -12));
        const exportYoY = Number.isFinite(latestPrevYear?.value) && latestPrevYear.value > 0
            ? ((latest.value / latestPrevYear.value) - 1) * 100
            : null;

        const prevMonthKey = shiftMonthKey(latest.monthKey, -1);
        const prevMonth = lookup.get(prevMonthKey);
        const prevMonthPrevYear = lookup.get(shiftMonthKey(prevMonthKey, -12));
        const prevMonthYoY = Number.isFinite(prevMonth?.value) && Number.isFinite(prevMonthPrevYear?.value) && prevMonthPrevYear.value > 0
            ? ((prevMonth.value / prevMonthPrevYear.value) - 1) * 100
            : null;
        const exportYoYDelta = Number.isFinite(exportYoY) && Number.isFinite(prevMonthYoY)
            ? exportYoY - prevMonthYoY
            : null;

        const export3mYoYs = rows
            .slice(-3)
            .map(row => {
                const previous = lookup.get(shiftMonthKey(row.monthKey, -12));
                if (!Number.isFinite(previous?.value) || previous.value <= 0) return null;
                return ((row.value / previous.value) - 1) * 100;
            })
            .filter(Number.isFinite);
        const export3mAvgYoY = export3mYoYs.length
            ? export3mYoYs.reduce((sum, value) => sum + value, 0) / export3mYoYs.length
            : null;

        let state = "supportive";
        let score = 24;
        if (Number.isFinite(exportYoY) && exportYoY > 5 && Number.isFinite(exportYoYDelta) && exportYoYDelta > 0) {
            state = "validated";
            score = 35;
        } else if (Number.isFinite(exportYoY) && exportYoY <= 0 && Number.isFinite(exportYoYDelta) && exportYoYDelta < 0) {
            state = "fragile";
            score = 10;
        } else if (!Number.isFinite(exportYoY) && !Number.isFinite(export3mAvgYoY)) {
            state = "neutral";
            score = 17;
        }

        return {
            latestMonth: latest.monthKey,
            exportValueUsd: latest.value,
            exportYoY,
            exportYoYDelta,
            export3mAvgYoY,
            state,
            score,
            reason: [
                `최신 발표월 ${formatMonthLabel(latest.monthKey)}`,
                `수출 YoY ${formatSignedPercentText(exportYoY)}`,
                `가속도 ${formatSignedPercentText(exportYoYDelta, 1, "%p")}`,
                `3개월 평균 ${formatSignedPercentText(export3mAvgYoY)}`
            ].join(" · ")
        };
    }

    async function fetchIndicatorPageExportData() {
        const html = await fetchWithProxyFallback(KOSIS_EXPORT_INDICATOR_URL, "수출액", { timeoutMs: 12000 });
        const valueMatch = html.match(/현재값[^<]*<\/dt>\s*<dd[^>]*>([\d,.-]+)<\/dd>/i);
        const monthMatch = html.match(/기준일[^<]*<\/dt>\s*<dd[^>]*>([\d.]+)<\/dd>/i);
        return {
            latestMonth: normalizeMonthKey(monthMatch?.[1] || ""),
            exportValueUsd: parseSignedAmount(valueMatch?.[1] || "")
        };
    }

    async function fetchExportMomentumData(settings = {}) {
        const apiKey = String(settings.kosisApiKey || "").trim();
        let pageData = null;
        try {
            pageData = await fetchIndicatorPageExportData();
        } catch (error) {
            pageData = null;
        }

        if (!apiKey) {
            if (pageData?.latestMonth && Number.isFinite(pageData.exportValueUsd)) {
                return {
                    ...buildNeutralExportData("KOSIS 키 미입력 · 최신 수출 레벨만 반영"),
                    latestMonth: pageData.latestMonth,
                    exportValueUsd: pageData.exportValueUsd
                };
            }
            return buildNeutralExportData("KOSIS 키 미입력");
        }

        try {
            const series = await fetchKosisExportSeries(apiKey);
            const momentum = calculateExportMomentumFromSeries(series);
            return {
                latestMonth: momentum.latestMonth || pageData?.latestMonth || "",
                exportValueUsd: Number.isFinite(momentum.exportValueUsd) ? momentum.exportValueUsd : pageData?.exportValueUsd ?? null,
                exportYoY: momentum.exportYoY,
                exportYoYDelta: momentum.exportYoYDelta,
                export3mAvgYoY: momentum.export3mAvgYoY,
                state: momentum.state,
                score: momentum.score,
                reason: momentum.reason
            };
        } catch (error) {
            if (pageData?.latestMonth && Number.isFinite(pageData.exportValueUsd)) {
                return {
                    latestMonth: pageData.latestMonth,
                    exportValueUsd: pageData.exportValueUsd,
                    exportYoY: null,
                    exportYoYDelta: null,
                    export3mAvgYoY: null,
                    state: "neutral",
                    score: 17,
                    reason: `KOSIS 시계열 조회 실패 (${error.message}) · 최신 발표월 레벨만 반영`
                };
            }
            return buildNeutralExportData(`수출 모멘텀 조회 실패 (${error.message})`);
        }
    }

    function getCurrentMonthFingerprint(settings = {}) {
        const now = new Date();
        const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const fingerprint = settings.dartApiKey ? settings.dartApiKey.slice(-4) : "";
        return { monthKey, fingerprint };
    }

    async function fetchCorpCodeMap(settings = {}) {
        const apiKey = String(settings.dartApiKey || "").trim();
        if (!apiKey) return {};
        const { monthKey, fingerprint } = getCurrentMonthFingerprint(settings);
        const cachedMonth = localStorage.getItem(FUNDAMENTAL_CORP_CACHE_MONTH_KEY);
        const cachedFingerprint = localStorage.getItem(FUNDAMENTAL_CORP_CACHE_FINGERPRINT_KEY);
        const cached = localStorage.getItem(FUNDAMENTAL_CORP_CACHE_KEY);

        if (cached && cachedMonth === monthKey && cachedFingerprint === fingerprint) {
            try {
                return JSON.parse(cached);
            } catch (error) {
                // fall through
            }
        }

        if (!root.JSZip) {
            throw new Error("JSZip 미연동으로 DART 법인코드 캐시를 생성할 수 없습니다.");
        }

        const response = await fetch(`https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${encodeURIComponent(apiKey)}`);
        if (!response.ok) {
            throw new Error(`DART corpCode 응답 실패 (${response.status})`);
        }

        const zipBuffer = await response.arrayBuffer();
        const zip = await root.JSZip.loadAsync(zipBuffer);
        const xmlName = Object.keys(zip.files).find(name => /\.xml$/i.test(name));
        if (!xmlName) {
            throw new Error("corpCode.xml 압축 해제 실패");
        }

        const xmlText = await zip.files[xmlName].async("text");
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const items = [...xmlDoc.getElementsByTagName("list")];
        const corpMap = {};

        items.forEach(item => {
            const stockCode = item.getElementsByTagName("stock_code")[0]?.textContent?.trim();
            const corpCode = item.getElementsByTagName("corp_code")[0]?.textContent?.trim();
            if (!stockCode || !corpCode) return;
            corpMap[stockCode] = corpCode;
        });

        localStorage.setItem(FUNDAMENTAL_CORP_CACHE_KEY, JSON.stringify(corpMap));
        localStorage.setItem(FUNDAMENTAL_CORP_CACHE_MONTH_KEY, monthKey);
        localStorage.setItem(FUNDAMENTAL_CORP_CACHE_FINGERPRINT_KEY, fingerprint);

        return corpMap;
    }

    function getQuarterTargets(now = new Date()) {
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        if (month >= 5 && month < 8) {
            return {
                current: { bsnsYear: year, reprtCode: "11013", label: `${year} 1Q`, roeMultiplier: 4 },
                previous: { bsnsYear: year - 1, reprtCode: "11013", label: `${year - 1} 1Q`, roeMultiplier: 4 }
            };
        }
        if (month >= 8 && month < 11) {
            return {
                current: { bsnsYear: year, reprtCode: "11012", label: `${year} 반기`, roeMultiplier: 2 },
                previous: { bsnsYear: year - 1, reprtCode: "11012", label: `${year - 1} 반기`, roeMultiplier: 2 }
            };
        }
        if (month >= 11) {
            return {
                current: { bsnsYear: year, reprtCode: "11014", label: `${year} 3Q`, roeMultiplier: 4 / 3 },
                previous: { bsnsYear: year - 1, reprtCode: "11014", label: `${year - 1} 3Q`, roeMultiplier: 4 / 3 }
            };
        }
        return {
            current: { bsnsYear: year - 1, reprtCode: "11011", label: `${year - 1} 연간`, roeMultiplier: 1 },
            previous: { bsnsYear: year - 2, reprtCode: "11011", label: `${year - 2} 연간`, roeMultiplier: 1 }
        };
    }

    async function fetchDartStatement(settings, corpCode, quarterTarget) {
        const apiKey = String(settings.dartApiKey || "").trim();
        if (!apiKey || !corpCode || !quarterTarget) return [];
        const url = [
            "https://opendart.fss.or.kr/api/fnlttSinglAcnt.json",
            `?crtfc_key=${encodeURIComponent(apiKey)}`,
            `&corp_code=${encodeURIComponent(corpCode)}`,
            `&bsns_year=${quarterTarget.bsnsYear}`,
            `&reprt_code=${quarterTarget.reprtCode}`
        ].join("");
        const rawText = await fetchWithProxyFallback(url, "\"status\"", { proxyOrder: ["alloriginsRaw", "codetabs"], timeoutMs: 15000 });
        const payload = JSON.parse(rawText);
        if (payload.status !== "000") {
            throw new Error(payload.message || `DART 재무 응답 오류 (${payload.status})`);
        }
        return Array.isArray(payload.list) ? payload.list : [];
    }

    function normalizeStatementName(name) {
        return String(name || "").replace(/\s+/g, "");
    }

    function pickStatementAmount(rows, matcher) {
        const match = rows.find(row => matcher(normalizeStatementName(row.account_nm)));
        return match ? parseSignedAmount(match.thstrm_amount) : null;
    }

    function extractStatementMetrics(rows, quarterTarget) {
        const operatingIncome = pickStatementAmount(rows, accountName => accountName.includes("영업이익"));
        const netIncome = pickStatementAmount(
            rows,
            accountName => /(당기순이익|분기순이익|반기순이익)/.test(accountName) && !/(지배기업|비지배)/.test(accountName)
        );
        const equity = pickStatementAmount(rows, accountName => accountName.includes("자본총계"));
        const annualizedRoe = Number.isFinite(netIncome) && Number.isFinite(equity) && equity > 0
            ? (netIncome * (quarterTarget?.roeMultiplier || 1) / equity) * 100
            : null;

        return {
            operatingIncome,
            netIncome,
            equity,
            annualizedRoe
        };
    }

    async function fetchEarningsBreadthData(settings = {}, universe = []) {
        const apiKey = String(settings.dartApiKey || "").trim();
        if (!apiKey) {
            return buildNeutralEarningsData("OpenDART 키 미입력");
        }
        if (!Array.isArray(universe) || !universe.length) {
            return buildNeutralEarningsData("실적 breadth 유니버스 없음");
        }

        const corpMap = await fetchCorpCodeMap(settings);
        const quarterTargets = getQuarterTargets();
        const eligibleUniverse = universe
            .map(candidate => ({
                ...candidate,
                corpCode: corpMap[candidate.code]
            }))
            .filter(candidate => candidate.corpCode)
            .slice(0, FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT);

        if (!eligibleUniverse.length) {
            return buildNeutralEarningsData("DART 종목 매핑 실패");
        }

        const totalTradingValue = eligibleUniverse.reduce((sum, candidate) => sum + (Number(candidate.todayTradingValue) || 0), 0) || 1;
        const concurrency = typeof LEADER_FETCH_CONCURRENCY === "number" ? LEADER_FETCH_CONCURRENCY : 4;
        const runner = typeof runWithConcurrency === "function"
            ? runWithConcurrency
            : async (items, limit, worker) => Promise.all(items.map(worker));

        const results = await runner(
            eligibleUniverse,
            concurrency,
            async candidate => {
                const [currentRows, previousRows] = await Promise.all([
                    fetchDartStatement(settings, candidate.corpCode, quarterTargets.current),
                    fetchDartStatement(settings, candidate.corpCode, quarterTargets.previous)
                ]);
                const currentMetrics = extractStatementMetrics(currentRows, quarterTargets.current);
                const previousMetrics = extractStatementMetrics(previousRows, quarterTargets.previous);

                return {
                    code: candidate.code,
                    name: candidate.name,
                    weight: (Number(candidate.todayTradingValue) || 0) / totalTradingValue,
                    currentMetrics,
                    previousMetrics
                };
            }
        );

        const successes = results.filter(result => result && !result.error);
        if (!successes.length) {
            return buildNeutralEarningsData("DART 재무 데이터 확보 실패");
        }

        const opIncomeBreadth = sumWeighted(successes, item => {
            const current = item.currentMetrics.operatingIncome;
            const previous = item.previousMetrics.operatingIncome;
            return Number.isFinite(current) && Number.isFinite(previous) && (current > previous || (current > 0 && previous <= 0));
        });
        const netIncomeBreadth = sumWeighted(successes, item => {
            const current = item.currentMetrics.netIncome;
            const previous = item.previousMetrics.netIncome;
            return Number.isFinite(current) && Number.isFinite(previous) && (current > previous || (current > 0 && previous <= 0));
        });
        const turnaroundBreadth = sumWeighted(successes, item => {
            const opTurn = Number.isFinite(item.currentMetrics.operatingIncome) && Number.isFinite(item.previousMetrics.operatingIncome)
                && item.currentMetrics.operatingIncome > 0 && item.previousMetrics.operatingIncome <= 0;
            const netTurn = Number.isFinite(item.currentMetrics.netIncome) && Number.isFinite(item.previousMetrics.netIncome)
                && item.currentMetrics.netIncome > 0 && item.previousMetrics.netIncome <= 0;
            return opTurn || netTurn;
        });
        const positiveRoeBreadth = sumWeighted(successes, item => Number.isFinite(item.currentMetrics.annualizedRoe) && item.currentMetrics.annualizedRoe > 0);

        let state = "fragile";
        let score = 12;
        if (opIncomeBreadth >= 0.6 && netIncomeBreadth >= 0.5) {
            state = "validated";
            score = 35;
        } else if (opIncomeBreadth >= 0.4 || netIncomeBreadth >= 0.4) {
            state = "supportive";
            score = 24;
        }

        return {
            coverageCount: successes.length,
            snapshotQuarter: quarterTargets.current.label,
            opIncomeBreadth,
            netIncomeBreadth,
            turnaroundBreadth,
            positiveRoeBreadth,
            state,
            score,
            reason: `영업이익 breadth ${Math.round((opIncomeBreadth || 0) * 100)}% · 순이익 breadth ${Math.round((netIncomeBreadth || 0) * 100)}%`
        };
    }

    function computeMovingAverage(history, days) {
        if (!Array.isArray(history) || history.length < days) return null;
        const window = history.slice(-days);
        const sum = window.reduce((acc, row) => acc + (Number(row.close) || 0), 0);
        return window.length ? sum / window.length : null;
    }

    function calculateBroadeningData(universeHistory = [], leaderStocks = []) {
        if (!Array.isArray(universeHistory) || !universeHistory.length) {
            return buildNeutralBroadeningData("확산용 시세 유니버스 없음");
        }

        const leaderCodes = new Set((leaderStocks || []).map(stock => stock.code));
        const supportUniverse = universeHistory
            .filter(item => item && !leaderCodes.has(item.code) && Array.isArray(item.history) && item.history.length >= 60)
            .slice(0, FUNDAMENTAL_BROADENING_UNIVERSE_COUNT);

        if (!supportUniverse.length) {
            return buildNeutralBroadeningData("비주도주 확산 유니버스 부족");
        }

        const totalTradingValue = supportUniverse.reduce((sum, item) => sum + (Number(item.todayTradingValue) || 0), 0) || 1;
        const enriched = supportUniverse.map(item => {
            const history = item.history;
            const latest = history.at(-1);
            const close20 = history.at(-21)?.close;
            const sma20 = computeMovingAverage(history, 20);
            const sma60 = computeMovingAverage(history, 60);
            return {
                code: item.code,
                name: item.name,
                weight: (Number(item.todayTradingValue) || 0) / totalTradingValue,
                positiveReturn20d: Number.isFinite(close20) && close20 > 0 ? ((latest.close / close20) - 1) * 100 > 0 : false,
                aboveSma20: Number.isFinite(sma20) && latest.close > sma20,
                aboveSma60: Number.isFinite(sma60) && latest.close > sma60
            };
        });

        const supportPositiveReturnBreadth = sumWeighted(enriched, item => item.positiveReturn20d);
        const supportBreadth20d = sumWeighted(enriched, item => item.aboveSma20);
        const supportBreadth60d = sumWeighted(enriched, item => item.aboveSma60);

        const components = [
            supportPositiveReturnBreadth,
            supportBreadth20d,
            supportBreadth60d
        ].map(value => {
            if (!Number.isFinite(value)) return 5;
            if (value >= 0.6) return 10;
            if (value >= 0.4) return 6;
            return 2;
        });

        const broadeningScore = components.reduce((sum, value) => sum + value, 0);
        let broadeningState = "fragile";
        if ([supportPositiveReturnBreadth, supportBreadth20d, supportBreadth60d].filter(value => Number.isFinite(value) && value >= 0.6).length >= 2) {
            broadeningState = "validated";
        } else if ([supportPositiveReturnBreadth, supportBreadth20d, supportBreadth60d].filter(value => Number.isFinite(value) && value >= 0.4).length >= 2) {
            broadeningState = "supportive";
        }

        return {
            broadeningScore,
            broadeningState,
            supportBreadth20d,
            supportBreadth60d,
            supportPositiveReturnBreadth,
            coverageCount: enriched.length,
            reason: `20일 양수 breadth ${Math.round((supportPositiveReturnBreadth || 0) * 100)}% · 20일선 ${Math.round((supportBreadth20d || 0) * 100)}% · 60일선 ${Math.round((supportBreadth60d || 0) * 100)}%`
        };
    }

    function calculateFundamentalAnchor({ exportMomentum, earningsBreadth, broadeningData }) {
        const exportScore = Number.isFinite(exportMomentum?.score) ? exportMomentum.score : 17;
        const earningsScore = Number.isFinite(earningsBreadth?.score) ? earningsBreadth.score : 18;
        const broadeningScore = Number.isFinite(broadeningData?.broadeningScore) ? broadeningData.broadeningScore : 15;
        const totalScore = clampLocal(exportScore + earningsScore + broadeningScore, 0, 100);

        let state = "fragile";
        if (totalScore >= 70) state = "validated";
        else if (totalScore >= 45) state = "supportive";

        return {
            score: totalScore,
            state,
            reason: `수출 ${Math.round(exportScore)}/35 · 실적 ${Math.round(earningsScore)}/35 · 확산 ${Math.round(broadeningScore)}/30`
        };
    }

    function getAdviceStanceLabel(bias) {
        const labels = ["분할 확대", "선별 유지", "균형 유지", "비중 조절", "현금 우선"];
        return labels[clampLocal(bias, 0, labels.length - 1)] || labels[2];
    }

    function buildAdviceActions(finalState, stance, context = {}) {
        const exportLabel = formatMonthLabel(context.exportLatestMonth);
        const actions = {
            "분할 확대": {
                now: "투매나 조정이 확대될 때 분할 매수 계획을 기계적으로 실행합니다.",
                watch: "대표주 급락이 멎고 비주도주 breadth가 다시 올라오는지 확인합니다.",
                break: "실적 breadth가 꺾이거나 신용 리스크가 다시 올라오면 공격 강도를 줄입니다."
            },
            "선별 유지": {
                now: "주도주와 실적 개선 종목 중심으로 선별 보유를 유지합니다.",
                watch: `${exportLabel !== "-" ? `${exportLabel} 수출 발표` : "다음 수출 발표"}와 분기 실적 breadth 유지 여부를 확인합니다.`,
                break: "비주도주 확산이 약해지거나 와이코프 분배 비중이 커지면 균형/방어로 이동합니다."
            },
            "균형 유지": {
                now: "추세는 존중하되 신규 공격 매수는 속도를 조절합니다.",
                watch: "확산 breadth와 수급 분배가 동시에 악화되는지 점검합니다.",
                break: "Bull Trap, 민스키, 분배 신호가 겹치면 비중 조절로 바로 전환합니다."
            },
            "비중 조절": {
                now: "기존 수익 포지션은 분할 익절하고 현금 비중을 천천히 올립니다.",
                watch: "수출/실적이 계속 따라오는지, 아니면 심리만 앞서는지 구분합니다.",
                break: "분배 폭이 더 넓어지거나 신용이 버티면 현금 우선으로 강화합니다."
            },
            "현금 우선": {
                now: "신규 진입보다 현금 버퍼 확보와 리스크 축소를 우선합니다.",
                watch: "강한 되돌림 후에도 실적/확산 근거가 살아있는지 확인합니다.",
                break: "펀더멘털 앵커가 다시 회복되고 분배/신용 경고가 꺾일 때만 한 단계 완화합니다."
            }
        };
        return actions[stance] || actions["균형 유지"];
    }

    function getSupportStateLabel(state) {
        if (state === "validated") return "강함";
        if (state === "supportive") return "보통";
        if (state === "fragile") return "약함";
        return "중립";
    }

    function getReflexivityModelLabel(state) {
        if (state === "runaway") return "폭주";
        if (state === "caution") return "주의";
        return "정상";
    }

    function getMinskyModelLabel(data = {}) {
        const ratio = Number(data.depositMarginRatio);
        const shock = Number(data.marginShockChangePct);
        const slope = Number(data.marginSlope);
        if ((Number.isFinite(shock) && shock >= 0) || (Number.isFinite(ratio) && ratio >= 0.2) || (Number.isFinite(slope) && slope >= 300)) {
            return "경고";
        }
        if ((Number.isFinite(slope) && slope > 0) || (Number.isFinite(ratio) && ratio >= 0.12)) {
            return "주의";
        }
        if ((Number.isFinite(shock) && shock < 0) || (Number.isFinite(slope) && slope < 0)) {
            return "완화";
        }
        return "중립";
    }

    function getKostolanyModelLabel(stage) {
        const labels = {
            A1: "A1 하락 준비",
            A2: "A2 하락 조정",
            A3: "A3 하락 과열",
            B1: "B1 상승 준비",
            B2: "B2 상승 조정",
            B3: "B3 상승 과열"
        };
        return labels[stage] || "단계 대기";
    }

    function getWyckoffModelLabel(data = {}) {
        const leaderStocks = Array.isArray(data.leaderStocks) ? data.leaderStocks : [];
        if (!leaderStocks.length) return "관망";

        const phaseWeight = {};
        leaderStocks.forEach(stock => {
            const phase = stock?.wyckoffPhase || "NEUTRAL";
            phaseWeight[phase] = (phaseWeight[phase] || 0) + (Number(stock.weight) || 0);
        });

        const phaseLabels = {
            A: "A 하락 정지",
            B: "B 매집",
            C: "C Spring",
            D: "D 상승",
            E: "E 분배",
            NEUTRAL: "관망"
        };
        const topEntry = Object.entries(phaseWeight).sort((left, right) => right[1] - left[1])[0];
        const topPhase = topEntry?.[0] || "NEUTRAL";
        const topWeight = topEntry?.[1] || 0;

        if ((Number(data.wyckoffDistributionBreadth) || 0) >= 0.5 || (phaseWeight.E || 0) >= 0.35) {
            return "E 분배 우세";
        }
        if (topPhase === "NEUTRAL" || topWeight < 0.3) {
            return "관망";
        }
        return `${phaseLabels[topPhase] || topPhase} 우세`;
    }

    function deriveMarketEvaluation(data = {}) {
        const stageKey = data.cycleStageKey || "skepticism";
        const anchorState = data.fundamentalAnchorState || "neutral";
        const broadeningState = data.broadeningState || "neutral";
        const trapScore = Number(data.trapScore) || 0;
        const wyckoffDistributionBreadth = Number(data.wyckoffDistributionBreadth) || 0;
        const reflexivityState = data.reflexivityState || "normal";
        const hotPsychology = stageKey === "greed" || stageKey === "euphoria";
        const lowCycle = ["panic", "capitulation", "pessimism"].includes(stageKey);
        const anchorStrong = anchorState === "validated";
        const anchorSupportive = anchorState === "validated" || anchorState === "supportive";
        const broadeningStrong = broadeningState === "validated";
        const broadeningSupportive = broadeningState === "validated" || broadeningState === "supportive";
        const minskyWarning = (Number.isFinite(data.depositMarginRatio) && data.depositMarginRatio >= 0.2)
            || (data.shockAnchorDate && Number.isFinite(data.marginShockChangePct) && data.marginShockChangePct >= 0)
            || (Number.isFinite(data.marginSlope) && data.marginSlope >= 300);
        const marksView = data.cycleStageLabel || stageKey;
        const sorosView = getReflexivityModelLabel(reflexivityState);
        const minskyView = getMinskyModelLabel(data);
        const kostolanyView = getKostolanyModelLabel(data.kostolanyStage);
        const wyckoffView = getWyckoffModelLabel(data);
        const anchorView = getSupportStateLabel(anchorState);
        const broadeningView = getSupportStateLabel(broadeningState);

        let state = "balanced";
        let label = "균형 국면";

        if (wyckoffDistributionBreadth >= 0.5 || trapScore >= 10 || minskyWarning) {
            state = "distribution-risk";
            label = "분배/하락 전환 경계";
        } else if (lowCycle && anchorSupportive) {
            state = "reaccumulation";
            label = "투매 후 재축적 대기";
        } else if (hotPsychology && anchorStrong && broadeningStrong && trapScore < 10 && !minskyWarning) {
            state = "structural-bull";
            label = "구조 강세 연장";
        } else if (hotPsychology && anchorSupportive && broadeningSupportive) {
            state = "validated-overheat";
            label = "과열이지만 정당화됨";
        } else if (hotPsychology && (!anchorSupportive || !broadeningSupportive)) {
            state = "overheat-only";
            label = "과열만 앞선 구간";
        } else if (anchorStrong && broadeningSupportive) {
            state = "structural-bull";
            label = "구조 강세 연장";
        }

        const baseBiasMap = {
            panic: 0,
            pessimism: 0,
            capitulation: 1,
            skepticism: 1,
            optimism: 2,
            greed: 3,
            euphoria: 4,
            complacency: 4,
            denial: 4
        };
        let marketAdviceBias = baseBiasMap[stageKey] ?? 2;
        if (hotPsychology && anchorStrong && broadeningStrong) {
            marketAdviceBias = Math.max(0, marketAdviceBias - 1);
        }
        const riskSignals = [
            trapScore >= 10,
            minskyWarning,
            reflexivityState === "runaway",
            wyckoffDistributionBreadth >= 0.5
        ].filter(Boolean).length;
        if (riskSignals >= 2) {
            marketAdviceBias = Math.min(4, marketAdviceBias + 1);
        }
        if (state === "distribution-risk") {
            marketAdviceBias = Math.max(marketAdviceBias, 3);
        }
        if (state === "reaccumulation") {
            marketAdviceBias = Math.min(marketAdviceBias, 1);
        }
        const marketAdviceStance = getAdviceStanceLabel(marketAdviceBias);
        const actions = buildAdviceActions(state, marketAdviceStance, data);

        let title = "여섯 모델이 혼합 신호를 보내고 있습니다.";
        let narrative = `하워드 막스는 ${marksView}, 소로스는 ${sorosView}, 민스키는 ${minskyView}, 코스톨라니는 ${kostolanyView}, 와이코프는 ${wyckoffView}, 펀더멘털 앵커는 ${anchorView}로 읽힙니다. 아직 한 모델만 따라가기보다 모델 간 합치와 충돌을 함께 보는 구간입니다.`;

        if (state === "structural-bull") {
            title = "상단 모델도 뜨겁지만, 종합 판정은 아직 강세 지속 쪽입니다.";
            narrative = `하워드 막스는 ${marksView}, 코스톨라니는 ${kostolanyView}로 상단 심리를 가리키지만, 펀더멘털 앵커 ${anchorView}와 확산 ${broadeningView}가 이를 지지하고 있습니다. 소로스 ${sorosView}, 민스키 ${minskyView}, 와이코프 ${wyckoffView}도 아직 즉시 붕괴를 주도할 정도는 아니라서 고원 구간 또는 추가 오버슈팅 가능성을 함께 열어두는 해석이 자연스럽습니다.`;
        } else if (state === "validated-overheat") {
            title = "과열 경고와 강세 근거가 함께 공존하는 구간입니다.";
            narrative = `하워드 막스 ${marksView}, 코스톨라니 ${kostolanyView}, 소로스 ${sorosView}가 과열을 말하고 있지만, 펀더멘털 앵커 ${anchorView}와 확산 ${broadeningView}가 아직 완전히 무너지지 않았습니다. 민스키 ${minskyView}와 와이코프 ${wyckoffView}가 결정적 경고로 번지는지 확인하면서, 공격보다 속도 조절에 초점을 맞추는 편이 합리적입니다.`;
        } else if (state === "overheat-only") {
            title = "상승 심리는 뜨겁지만 다수 모델의 확인은 약합니다.";
            narrative = `하워드 막스 ${marksView}, 코스톨라니 ${kostolanyView}, 소로스 ${sorosView}가 상단 심리를 가리키는 반면 펀더멘털 앵커는 ${anchorView}, 확산은 ${broadeningView}에 머물고 있습니다. 여기에 민스키 ${minskyView}나 와이코프 ${wyckoffView}가 더 악화되면 메인 뷰는 빠르게 방어 쪽으로 기울 수 있습니다.`;
        } else if (state === "distribution-risk") {
            title = "경고 모델들이 메인 뷰에서 우세해지고 있습니다.";
            narrative = `하워드 막스 ${marksView}의 상단 심리 위에 소로스 ${sorosView}, 민스키 ${minskyView}, 와이코프 ${wyckoffView}가 겹치면서 리스크 모델들이 주도권을 잡고 있습니다. 펀더멘털 앵커가 ${anchorView}라도 Bull Trap과 분배/신용 경고가 함께 켜진 구간에서는 방어가 우선입니다.`;
        } else if (state === "reaccumulation") {
            title = "약세 말기 모델과 회복 근거가 함께 나타나는 구간입니다.";
            narrative = `하워드 막스 ${marksView}와 코스톨라니 ${kostolanyView}는 하단 국면을 가리키고, 와이코프 ${wyckoffView}와 펀더멘털 앵커 ${anchorView}는 재축적 가능성을 탐색하게 만듭니다. 소로스 ${sorosView}, 민스키 ${minskyView}가 진정되는지 확인하면서 성급한 몰빵보다 분할 접근으로 준비하는 편이 좋습니다.`;
        }

        return {
            marketEvaluationState: state,
            marketEvaluationLabel: label,
            marketFlowTitle: title,
            marketFlowNarrative: narrative,
            marketAdviceBias,
            marketAdviceStance,
            marketAdviceReason: `막스 ${marksView} · 소로스 ${sorosView} · 민스키 ${minskyView} · 코스톨라니 ${kostolanyView} · 와이코프 ${wyckoffView} · 앵커 ${anchorView} · 확산 ${broadeningView} · 리스크 ${riskSignals}개`,
            marketAdviceActions: actions
        };
    }

    async function buildAnchorUniverses(options = {}) {
        const quantHtml = options.quantHtml || "";
        const candidates = await fetchLeaderSeedCandidates(quantHtml);
        const filtered = candidates
            .filter(candidate => !isLeaderExcluded(candidate))
            .sort((left, right) => right.todayTradingValue - left.todayTradingValue);
        const earningsUniverse = filtered.slice(0, FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT);
        const broadeningUniverse = filtered.slice(0, FUNDAMENTAL_BROADENING_UNIVERSE_COUNT);
        const concurrency = typeof LEADER_FETCH_CONCURRENCY === "number" ? LEADER_FETCH_CONCURRENCY : 4;
        const runner = typeof runWithConcurrency === "function"
            ? runWithConcurrency
            : async (items, limit, worker) => Promise.all(items.map(worker));

        const histories = await runner(
            broadeningUniverse,
            concurrency,
            async candidate => ({
                ...candidate,
                history: await fetchLeaderHistory(candidate)
            })
        );

        return {
            earningsUniverse,
            broadeningUniverse: histories.filter(item => item && !item.error && Array.isArray(item.history))
        };
    }

    function resetFundamentalAnchorData(reason = "펀더멘털 앵커 대기 중") {
        marketData.fundamentalAnchorScore = null;
        marketData.fundamentalAnchorState = "neutral";
        marketData.fundamentalAnchorReason = reason;
        marketData.exportLatestMonth = "";
        marketData.exportValueUsd = null;
        marketData.exportYoY = null;
        marketData.exportYoYDelta = null;
        marketData.export3mAvgYoY = null;
        marketData.earningsCoverageCount = 0;
        marketData.earningsSnapshotQuarter = "";
        marketData.opIncomeBreadth = null;
        marketData.netIncomeBreadth = null;
        marketData.turnaroundBreadth = null;
        marketData.positiveRoeBreadth = null;
        marketData.broadeningScore = null;
        marketData.broadeningState = "neutral";
        marketData.supportBreadth20d = null;
        marketData.supportBreadth60d = null;
        marketData.supportPositiveReturnBreadth = null;
    }

    async function fetchFundamentalAnchorBundle(options = {}) {
        const settings = options.settings || {};
        const leaderStocks = Array.isArray(options.leaderStocks) ? options.leaderStocks : [];

        const [exportMomentum, universes] = await Promise.all([
            fetchExportMomentumData(settings),
            buildAnchorUniverses(options).catch(error => {
                log?.(`<span class='text-amber-400'>[ANCHOR]</span> 확산 유니버스 구축 실패(${error.message})`);
                return { earningsUniverse: [], broadeningUniverse: [] };
            })
        ]);

        const broadeningData = calculateBroadeningData(universes.broadeningUniverse, leaderStocks);
        const earningsBreadth = await fetchEarningsBreadthData(settings, universes.earningsUniverse)
            .catch(error => buildNeutralEarningsData(`실적 breadth 조회 실패 (${error.message})`));
        const fundamentalAnchor = calculateFundamentalAnchor({
            exportMomentum,
            earningsBreadth,
            broadeningData
        });

        return {
            exportMomentum,
            earningsBreadth,
            broadeningData,
            fundamentalAnchor
        };
    }

    root.fetchExportMomentumData = fetchExportMomentumData;
    root.fetchCorpCodeMap = fetchCorpCodeMap;
    root.fetchEarningsBreadthData = fetchEarningsBreadthData;
    root.calculateBroadeningData = calculateBroadeningData;
    root.calculateFundamentalAnchor = calculateFundamentalAnchor;
    root.deriveMarketEvaluation = deriveMarketEvaluation;
    root.fetchFundamentalAnchorBundle = fetchFundamentalAnchorBundle;
    root.resetFundamentalAnchorData = resetFundamentalAnchorData;
})(typeof window !== "undefined" ? window : globalThis);
