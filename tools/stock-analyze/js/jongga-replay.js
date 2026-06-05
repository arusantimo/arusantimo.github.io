const JONGGA_REPLAY_STRATEGIES = [
  { key: 'pullback', label: '눌림목' },
  { key: 'accumulation', label: '수급 매집' },
  { key: 'breakout', label: '주도주 돌파' },
  { key: 'reversal', label: '급락 반등' }
];

let currentReplayStrategy = null;

function getJonggaReplayBridge() {
  const payload = window.JONGGA_REPLAY_RUNS;
  return payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : null;
}

function getJonggaReplayAttempt(bridge = getJonggaReplayBridge()) {
  const attempt = bridge?.latestAttempt;
  return attempt && typeof attempt === 'object' && !Array.isArray(attempt)
    ? attempt
    : { status: bridge?.latestRun ? 'complete' : 'missing', message: '', generatedAt: '' };
}

function getJonggaReplayStatusMeta(bridge = getJonggaReplayBridge()) {
  const status = String(getJonggaReplayAttempt(bridge).status || 'missing').toLowerCase();
  if (status === 'complete') return { label: 'complete', tone: 'complete' };
  if (status === 'failed') return { label: 'failed', tone: 'failed' };
  if (status === 'missing') return { label: '없음', tone: 'unknown' };
  if (status === 'skipped') return { label: '생략', tone: 'unknown' };
  return { label: status || '미확인', tone: 'unknown' };
}

function getJonggaReplayVariantLabel(value) {
  if (typeof getJonggaVariantLabel === 'function') {
    return getJonggaVariantLabel(value);
  }
  return String(value || '');
}

function formatReplayDate(value) {
  const raw = String(value || '').trim();
  const dateOnly = raw.includes('T') ? raw.slice(0, 10) : raw;
  if (typeof formatCompactDate === 'function') {
    return formatCompactDate(dateOnly.replace(/-/g, ''));
  }
  return dateOnly;
}

function formatReplayPercent(value, digits = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  return `${num > 0 ? '+' : ''}${num.toFixed(digits)}%`;
}

function formatReplayRate(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  return `${(num * 100).toFixed(1)}%`;
}

function formatReplayNumber(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0';
  return `${Math.round(num)}`;
}

function formatReplayPrice(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return '—';
  return `${Math.round(num).toLocaleString('ko-KR')}원`;
}

function getReplayStrategyLabel(strategy) {
  const item = JONGGA_REPLAY_STRATEGIES.find(entry => entry.key === String(strategy || '').trim());
  return item?.label || String(strategy || '-');
}

function getReplayValidationPolicy(bridge = getJonggaReplayBridge()) {
  const policy = bridge?.latestRun?.replayPolicy;
  return policy && typeof policy === 'object' && !Array.isArray(policy) ? policy : null;
}

function getReplayClosedReasonLabel(value) {
  const labels = {
    primary_target_touch: '익일 10시 2.0% 익절',
    secondary_target_touch: '익일 15시 1.2% 익절',
    third_day_cutoff_market: '3일차 10시 컷오프 청산',
    stop_touch: '손절',
    ambiguous_stop_first: '동일봉 손절 우선'
  };
  return labels[String(value || '').trim()] || String(value || '-');
}

function getReplaySummary(summaryLike) {
  if (!summaryLike || typeof summaryLike !== 'object' || Array.isArray(summaryLike)) return {};
  return summaryLike.overall && typeof summaryLike.overall === 'object' ? summaryLike.overall : summaryLike;
}

function getReplayMetricMeta(key) {
  const metaMap = {
    includedCount: {
      label: '포함',
      help: '리플레이 포함 대상 수',
    },
    tradeCount: {
      label: '체결',
      help: '실제로 시뮬레이션 체결된 거래 수',
    },
    winRate: {
      label: '승률',
      help: '수익이 0%를 넘은 거래 비율',
    },
    avgNetReturnPct: {
      label: '평균',
      help: '거래 1건당 평균 순수익률',
    },
    cumNetReturnPct: {
      label: '누적',
      help: '거래 순서를 반영해 복리로 합산한 누적 순수익률',
    },
    maxDrawdownPct: {
      label: 'MDD',
      help: '최대 낙폭. 누적 손익이 고점 대비 얼마나 크게 꺾였는지 보여줍니다.',
    },
    degradedCount: {
      label: 'degraded',
      help: '분봉/틱 데이터가 부족해 일봉 프록시나 보강 데이터로 검증한 건수입니다.',
    },
    ambiguousCount: {
      label: 'ambiguous',
      help: '같은 봉에서 목표가와 손절가가 동시에 닿아 보수적으로 손절 처리한 건수입니다.',
    },
  };
  return metaMap[key] || { label: String(key || '-'), help: '' };
}

function renderReplayPolicyBanner(policy, variantLabel = '') {
  if (!policy) return '';
  const label = String(policy.label || '완화 모드');
  const summary = String(policy.summary || '');
  const detail = String(policy.detail || '');
  return `
    <div class="replay-policy-banner" role="status" aria-live="polite">
      <div class="replay-policy-badge">${escapeHtml(label)}</div>
      <div class="replay-policy-copy">
        <strong>${escapeHtml(summary)}</strong>
        <span>${escapeHtml(detail)}${variantLabel ? ` · ${escapeHtml(variantLabel)}` : ''}</span>
      </div>
    </div>
  `;
}

function getReplayOverallSummary(bridge = getJonggaReplayBridge()) {
  return getReplaySummary(bridge?.latestRun?.summary || bridge?.latestSummary || {});
}

function getReplayStrategyView(strategy, bridge = getJonggaReplayBridge(), mode = getJonggaReplayViewMode()) {
  const latestRun = bridge?.latestRun;
  if (!latestRun) return null;
  const explicit = latestRun.strategyViews?.[strategy];
  if (explicit && typeof explicit === 'object' && !Array.isArray(explicit)) {
    const normalizedMode = normalizeJonggaReplayViewMode(mode);
    if (normalizedMode === 'all') {
      return { ...explicit, selectedCase: normalizedMode };
    }
    const caseView = explicit.caseViews?.[normalizedMode];
    if (caseView && typeof caseView === 'object' && !Array.isArray(caseView)) {
      return { ...caseView, selectedCase: normalizedMode };
    }
    return { ...explicit, selectedCase: normalizedMode };
  }

  const byStrategy = latestRun.summary?.byStrategy || latestRun.summary?.strategyStats || {};
  const summary = byStrategy?.[strategy];
  if (!summary) return null;

  const stocks = Array.isArray(latestRun.summary?.byStock)
    ? latestRun.summary.byStock.filter(item => item?.strategy === strategy)
    : [];
  const days = Array.isArray(latestRun.days)
    ? latestRun.days
      .map(day => {
        const stats = day?.byStrategy?.[strategy];
        return stats ? { ...day, ...stats } : null;
      })
      .filter(Boolean)
    : [];
  return { summary, stocks, days, selectedCase: normalizeJonggaReplayViewMode(mode) };
}

function renderReplayMetricPills(summary = {}, labels = {}) {
  const items = [
    ['includedCount', labels.includedCount || '포함'],
    ['tradeCount', labels.tradeCount || '체결'],
    ['winRate', labels.winRate || '승률', value => formatReplayRate(value)],
    ['avgNetReturnPct', labels.avgNetReturnPct || '평균', value => formatReplayPercent(value)],
    ['cumNetReturnPct', labels.cumNetReturnPct || '누적', value => formatReplayPercent(value)],
    ['maxDrawdownPct', labels.maxDrawdownPct || 'MDD', value => formatReplayPercent(value)],
    ['degradedCount', labels.degradedCount || 'degraded'],
    ['ambiguousCount', labels.ambiguousCount || 'ambiguous']
  ];
  return `
    <div class="quality-grid replay-summary-grid">
      ${items.map(([key, label, formatter]) => `
        <div class="quality-card" title="${escapeHtml(getReplayMetricMeta(key).help)}">
          <strong>${escapeHtml(formatter ? formatter(summary?.[key]) : formatReplayNumber(summary?.[key]))}</strong>
          <span>${escapeHtml(label)}</span>
          ${getReplayMetricMeta(key).help ? `<small class="replay-metric-help">${escapeHtml(getReplayMetricMeta(key).help)}</small>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function renderReplayAttemptLine(attempt = {}) {
  const status = String(attempt.status || 'missing').toLowerCase();
  if (status === 'failed') {
    return `<div class="quality-line error replay-status-line"><strong>자동 검증 실패:</strong> ${escapeHtml(attempt.message || 'unknown error')}</div>`;
  }
  if (status === 'missing' || status === 'skipped') {
    return `<div class="quality-line warn replay-status-line">${escapeHtml(attempt.message || '자동 검증 데이터가 없습니다.')}</div>`;
  }
  return '';
}

function renderReplayStrategyInline(summary = {}) {
  return `
    <span class="strategy-replay-pill"><strong>${escapeHtml(formatReplayPercent(summary.cumNetReturnPct))}</strong><span>누적</span></span>
    <span class="strategy-replay-pill"><strong>${escapeHtml(formatReplayPercent(summary.avgNetReturnPct))}</strong><span>평균</span></span>
    <span class="strategy-replay-pill"><strong>${escapeHtml(formatReplayNumber(summary.tradeCount))}</strong><span>체결</span></span>
  `;
}

function renderReplayStrategySections() {
  const bridge = getJonggaReplayBridge();
  const attempt = getJonggaReplayAttempt(bridge);
  const meta = getJonggaReplayStatusMeta(bridge);
  const latestRun = bridge?.latestRun;
  const attemptStatus = String(attempt.status || 'missing').toLowerCase();
  const actionable = latestRun && attemptStatus === 'complete';
  const activeCaseLabel = getJonggaReplayViewMeta(getJonggaReplayViewMode()).label;

  JONGGA_REPLAY_STRATEGIES.forEach(({ key }) => {
    const badge = document.getElementById(`jongga-replay-badge-${key}`);
    const summaryNode = document.getElementById(`jongga-replay-summary-${key}`);
    const button = document.getElementById(`btn-open-jongga-replay-${key}`);
    const strategyView = getReplayStrategyView(key, bridge, getJonggaReplayViewMode());
    const strategySummary = strategyView?.summary || null;

    if (badge) {
      badge.textContent = meta.label;
      badge.className = `quality-status ${meta.tone}`;
    }

    if (summaryNode) {
      if (!latestRun) {
        summaryNode.innerHTML = `<span class="strategy-replay-empty">${escapeHtml(attempt.message || '검증 데이터 없음')}</span>`;
      } else if (!actionable) {
        summaryNode.innerHTML = `<span class="strategy-replay-empty">${escapeHtml(attempt.message || '자동 검증 실패')}</span>`;
      } else if (!strategySummary) {
        summaryNode.innerHTML = '<span class="strategy-replay-empty">해당 타입 결과 없음</span>';
      } else {
        summaryNode.innerHTML = renderReplayStrategyInline(strategySummary);
      }
    }

    if (button) {
      button.disabled = !actionable || !strategyView;
      if (!latestRun) {
        button.title = '표시할 replay 결과가 없습니다.';
      } else if (!actionable) {
        button.title = attempt.message || '자동 검증 실패 상태입니다.';
      } else if (!strategyView) {
        button.title = '최근 자동 replay에 이 전략 결과가 없습니다.';
      } else {
        button.title = `${getReplayStrategyLabel(key)} · ${activeCaseLabel} replay 상세 보기`;
      }
    }
  });
}

function renderReplayStockTable(rows = []) {
  if (!Array.isArray(rows) || !rows.length) {
    return '<div class="replay-empty">종목별 수익 데이터가 없습니다.</div>';
  }
  return `
    <div class="replay-table-wrap">
      <table class="replay-table">
        <thead>
          <tr>
            <th>종목</th>
            <th>매수가</th>
            <th>매도가</th>
            <th>거래</th>
            <th>승률</th>
            <th>평균</th>
            <th>누적</th>
            <th>최근일</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(item => `
            <tr>
              <td><strong>${escapeHtml(item.name || '-')}</strong><div class="replay-cell-sub">${escapeHtml(item.code || '-')}</div></td>
              <td>
                ${escapeHtml(formatReplayPrice(item.lastEntryFillPrice))}
                <div class="replay-cell-sub">${escapeHtml(formatReplayDate(item.lastEntryFilledAt || item.lastReplayDate))}</div>
              </td>
              <td>
                ${escapeHtml(formatReplayPrice(item.lastExitAvgFillPrice || item.lastExitFillPrice))}
                <div class="replay-cell-sub">${escapeHtml(formatReplayDate(item.lastExitFilledAt || item.lastReplayDate))}</div>
              </td>
              <td>${escapeHtml(formatReplayNumber(item.tradeCount))}</td>
              <td>${escapeHtml(formatReplayRate(item.winRate))}</td>
              <td>${escapeHtml(formatReplayPercent(item.avgNetReturnPct))}</td>
              <td>${escapeHtml(formatReplayPercent(item.cumNetReturnPct))}</td>
              <td>${escapeHtml(formatReplayDate(item.lastReplayDate))}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderReplayTradeTable(rows = []) {
  if (!Array.isArray(rows) || !rows.length) {
    return '<div class="replay-empty">해당 일자 거래 목록이 없습니다.</div>';
  }
  return `
    <div class="replay-table-wrap">
      <table class="replay-table replay-trade-table">
        <thead>
          <tr>
            <th>종목</th>
            <th>매수가</th>
            <th>매도가</th>
            <th>수익률</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(item => `
            <tr>
              <td><strong>${escapeHtml(item.name || '-')}</strong><div class="replay-cell-sub">${escapeHtml(item.code || '-')}</div></td>
              <td>
                ${escapeHtml(formatReplayPrice(item.entryFillPrice))}
                <div class="replay-cell-sub">${escapeHtml(formatReplayDate(item.entryFilledAt))}</div>
              </td>
              <td>
                ${escapeHtml(formatReplayPrice(item.exitAvgFillPrice || item.exitLastFillPrice))}
                <div class="replay-cell-sub">${escapeHtml(formatReplayDate(item.exitFilledAt))}</div>
              </td>
              <td>${escapeHtml(formatReplayPercent(item.netReturnPct))}</td>
              <td>
                ${escapeHtml(item.tradeStatus || '-')}
                <div class="replay-cell-sub">${escapeHtml(getReplayClosedReasonLabel(item.closedReason))}</div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderReplayDayList(days = [], variant = 'stable') {
  if (!Array.isArray(days) || !days.length) {
    return '<div class="replay-empty">일자별 replay 요약이 없습니다.</div>';
  }
  return `
    <div class="replay-day-list">
      ${days.map(day => `
        <div class="replay-day-item">
          <div class="replay-day-head">
            <strong>${escapeHtml(formatReplayDate(day.date))}</strong>
            <span class="history-variant-badge ${escapeHtml(variant)}">${escapeHtml(formatReplayNumber(day.tradeCount))}건</span>
          </div>
          <div class="replay-day-meta">포함 ${escapeHtml(formatReplayNumber(day.includedCount))} · 체결 ${escapeHtml(formatReplayNumber(day.tradeCount))} · 승률 ${escapeHtml(formatReplayRate(day.winRate))}</div>
          <div class="replay-day-meta">평균 ${escapeHtml(formatReplayPercent(day.avgNetReturnPct))} · 누적 ${escapeHtml(formatReplayPercent(day.cumNetReturnPct))} · MDD ${escapeHtml(formatReplayPercent(day.maxDrawdownPct))}</div>
          <div class="replay-day-meta">degraded ${escapeHtml(formatReplayNumber(day.degradedCount))} · ambiguous ${escapeHtml(formatReplayNumber(day.ambiguousCount))}</div>
          <div class="replay-day-trades">
            <div class="replay-day-trades-title">매수/매도 종목</div>
            ${renderReplayTradeTable(day.trades || [])}
          </div>
          <div class="replay-file-list">
            <div><code>${escapeHtml(day.summaryFile || '-')}</code></div>
            <div><code>${escapeHtml(day.ordersFile || '-')}</code></div>
            <div><code>${escapeHtml(day.fillsFile || '-')}</code></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function updateReplayModalHeader(strategy) {
  const title = document.getElementById('jongga-replay-modal-title');
  const subtitle = document.getElementById('jongga-replay-modal-subtitle');
  const activeCaseLabel = getJonggaReplayViewMeta(getJonggaReplayViewMode()).label;
  if (title) {
    title.textContent = strategy ? `리플레이 검증 상세 · ${getReplayStrategyLabel(strategy)} · ${activeCaseLabel}` : `리플레이 검증 상세 · ${activeCaseLabel}`;
  }
  if (subtitle) {
    subtitle.innerHTML = `<span>${strategy ? `${escapeHtml(getReplayStrategyLabel(strategy))} 타입의 ${escapeHtml(activeCaseLabel)} 자동 replay 성과와 종목별 수익을 확인합니다.` : `${escapeHtml(activeCaseLabel)} 자동 replay 성과와 일자별 산출물을 확인합니다.`}</span>`;
  }
}

function renderJonggaReplayModal(strategy = currentReplayStrategy) {
  const body = document.getElementById('jongga-replay-body');
  if (!body) return;

  const bridge = getJonggaReplayBridge();
  const attempt = getJonggaReplayAttempt(bridge);
  const latestRun = bridge?.latestRun;
  const activeCaseMode = getJonggaReplayViewMode();
  const strategyView = strategy ? getReplayStrategyView(strategy, bridge, activeCaseMode) : null;
  const strategySummary = strategyView?.summary || null;
  const periodLabel = latestRun ? `${formatReplayDate(latestRun.from)} ~ ${formatReplayDate(latestRun.to)}` : '';
  const policy = getReplayValidationPolicy(bridge);

  updateReplayModalHeader(strategy);

  if (!bridge || !latestRun) {
    body.innerHTML = '<div class="replay-empty">표시할 replay 결과가 없습니다.</div>';
    return;
  }

  body.innerHTML = `
    <div class="replay-meta">자동 실행 상태: ${escapeHtml(String(attempt.status || 'missing'))} ${attempt.message ? `· ${escapeHtml(attempt.message)}` : ''}</div>
    <div class="replay-meta">기간: ${escapeHtml(periodLabel)} · 채널 ${escapeHtml(getJonggaReplayVariantLabel(latestRun.variant))} · 프로필 ${escapeHtml(latestRun.thresholdProfile || '-')} · 케이스 ${escapeHtml(getJonggaReplayViewMeta(activeCaseMode).label)}</div>
    ${renderReplayPolicyBanner(policy, getJonggaReplayVariantLabel(latestRun.variant))}
    <div class="section-title" style="margin-top:16px;">${escapeHtml(strategy ? `${getReplayStrategyLabel(strategy)} 타입 수익` : '전략별 성과')}</div>
    ${strategySummary
      ? renderReplayMetricPills(strategySummary, { includedCount: '타입 포함', tradeCount: '타입 체결', cumNetReturnPct: '타입 누적' })
      : '<div class="replay-empty">해당 전략 요약이 없습니다.</div>'}
    <div class="replay-metric-note">MDD는 최대 낙폭, degraded는 분봉/틱 데이터가 부족해 보강 데이터로 검증한 건수, ambiguous는 같은 봉에서 익절과 손절이 동시에 닿아 보수적으로 손절 처리한 건수입니다.</div>
    <div class="section-title" style="margin-top:16px;">종목별 수익</div>
    ${renderReplayStockTable(strategyView?.stocks || [])}
    <div class="section-title" style="margin-top:16px;">일자별 요약</div>
    ${renderReplayDayList(strategyView?.days || [], latestRun.variant)}
  `;
}

function openJonggaReplayModal(strategy) {
  currentReplayStrategy = strategy || null;
  renderJonggaReplayModal(currentReplayStrategy);
  document.getElementById('jongga-replay-overlay')?.classList.add('open');
  if (typeof syncBodyScrollLock === 'function') syncBodyScrollLock();
}

function closeJonggaReplayModal() {
  document.getElementById('jongga-replay-overlay')?.classList.remove('open');
  if (typeof syncBodyScrollLock === 'function') syncBodyScrollLock();
}

function bindJonggaReplayControls() {
  JONGGA_REPLAY_STRATEGIES.forEach(({ key }) => {
    document.getElementById(`btn-open-jongga-replay-${key}`)?.addEventListener('click', () => openJonggaReplayModal(key));
  });
  document.getElementById('jongga-replay-close-btn')?.addEventListener('click', closeJonggaReplayModal);
  document.getElementById('jongga-replay-overlay')?.addEventListener('click', event => {
    if (event.target === document.getElementById('jongga-replay-overlay')) closeJonggaReplayModal();
  });
  renderReplayStrategySections();
}
