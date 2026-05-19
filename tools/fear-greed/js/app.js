/**
 * app.js — 메인 진입점
 * 모든 렌더러를 조합하여 대시보드를 구성합니다.
 */

(function () {
  'use strict';

  // ── 상태 ──────────────────────────────────────────
  let currentData   = null;
  let chartDays     = 30;

  const STORAGE_KEY = 'fearGreedData';

  // ── localStorage 활용 ─────────────────────────────
  function saveFearGreedData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { console.warn('로컬스토리지 저장 실패', e); }
  }

  function loadFearGreedData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  }


  function scoreLabel(score) {
    if (score <= 20) return '극단적 공포';
    if (score <= 40) return '공포';
    if (score <= 60) return '중립';
    if (score <= 80) return '탐욕';
    return '극단적 탐욕';
  }

  function scoreColorClass(score) {
    if (score <= 20) return 'color-extreme-fear';
    if (score <= 40) return 'color-fear';
    if (score <= 60) return 'color-neutral';
    if (score <= 80) return 'color-greed';
    return 'color-extreme-greed';
  }

  function fmt(n) {
    return Number(n).toLocaleString('ko-KR');
  }

  // ── 게이지 + 점수 표시 ─────────────────────────────
  function renderHero(data) {
    const score  = data.current?.score ?? 50;
    const label  = data.current?.label || scoreLabel(score);
    const change = data.current?.change ?? 0;
    const desc   = data.current?.description || '';

    // 캔버스 게이지
    const canvas = document.getElementById('gauge-canvas');
    if (canvas) GaugeRenderer.render(canvas, score);

    // 점수 숫자
    const numEl = document.getElementById('score-number');
    if (numEl) {
      numEl.textContent = score;
      numEl.className   = `score-number ${scoreColorClass(score)}`;
    }

    // 레이블
    const lblEl = document.getElementById('score-label');
    if (lblEl) {
      lblEl.textContent = label;
      lblEl.className   = `score-label ${scoreColorClass(score)}`;
    }

    // 전일 대비
    const chgEl = document.getElementById('score-change');
    if (chgEl) {
      const sign = change >= 0 ? '+' : '';
      chgEl.textContent = `전일 대비 ${sign}${change}`;
      chgEl.className   = `score-change ${change < 0 ? 'negative' : 'positive'}`;
    }

    // 설명
    const descEl = document.getElementById('score-desc');
    if (descEl) descEl.textContent = desc;

    // 스펙트럼 마커
    const marker = document.getElementById('spectrum-marker');
    if (marker) marker.style.left = `${score}%`;
  }

  // ── 통계 패널 ─────────────────────────────────────
  function renderStats(data) {
    const naver = data.community?.naver;
    const dc    = data.community?.dcinside;
    if (!naver || !dc) return;

    const totalPosts = (naver.posts_analyzed || 0) + (dc.posts_analyzed || 0);
    const totalVel   = (naver.velocity_per_hour || 0) + (dc.velocity_per_hour || 0);

    setInner('stat-total-posts',    fmt(totalPosts));
    setInner('stat-velocity',       totalVel);
    setInner('stat-naver-score',    naver.score);
    setInner('stat-dc-score',       dc.score);
  }

  // ── 커뮤니티 분석 ──────────────────────────────────
  function renderCommunity(data) {
    const communities = [
      { key: 'naver',    icon: '🟢', cfg: data.community?.naver },
      { key: 'dcinside', icon: '🟡', cfg: data.community?.dcinside },
    ];

    communities.forEach(({ icon, cfg }) => {
      if (!cfg) return;
      const score     = cfg.score ?? 50;
      const colorCls  = scoreColorClass(score);
      const fearPct   = cfg.fear_hit ?? 50;
      const greedPct  = cfg.greed_hit ?? 50;

      // 점수 색상
      const scoreEl = document.querySelector(`[data-comm="${cfg.name}"] .community-score`);
      if (scoreEl) {
        scoreEl.textContent = score;
        scoreEl.className   = `community-score ${colorCls}`;
      }

      // 바 채우기
      const fearBar  = document.querySelector(`[data-comm="${cfg.name}"] .community-bar-fill.fear`);
      const greedBar = document.querySelector(`[data-comm="${cfg.name}"] .community-bar-fill.greed`);
      if (fearBar)  setTimeout(() => { fearBar.style.width  = fearPct  + '%'; }, 200);
      if (greedBar) setTimeout(() => { greedBar.style.width = greedPct + '%'; }, 200);
    });
  }

  // ── 추이 차트 ─────────────────────────────────────
  function renderChart(data, days) {
    const canvas = document.getElementById('history-chart');
    if (!canvas || !data.history?.length) return;
    ChartRenderer.renderHistory(canvas, data.history, days);
  }

  // ── 키워드 ────────────────────────────────────────
  function renderKeywords(data) {
    const fearEl  = document.getElementById('keyword-fear-list');
    const greedEl = document.getElementById('keyword-greed-list');
    KeywordRenderer.render(fearEl, greedEl, data.keywords);
  }

  // ── 샘플 게시글 ───────────────────────────────────
  function renderPosts(data) {
    const grid = document.getElementById('posts-grid');
    if (!grid || !data.sample_posts?.length) return;

    grid.innerHTML = data.sample_posts.map(p => {
      const isFear  = p.sentiment === 'fear';
      const sentCls = isFear ? 'fear' : 'greed';
      const sentLbl = isFear ? '😨 공포' : '🚀 탐욕';
      return `
        <div class="post-card is-${sentCls}">
          <div class="post-community">${p.community_name || p.community}</div>
          <div class="post-title">${p.title}</div>
          <div class="post-meta">
            <span>👁 ${fmt(p.views)}</span>
            <span>👍 ${p.likes}</span>
            <span>💬 ${p.comments}</span>
          </div>
          <span class="post-sentiment-badge ${sentCls}">${sentLbl} · ${p.score}점</span>
        </div>
      `;
    }).join('');
  }

  // ── 업데이트 시각 ──────────────────────────────────
  function renderUpdatedAt(data) {
    const el = document.getElementById('last-updated');
    if (!el) return;
    if (data.generated_at) {
      const dt = new Date(data.generated_at);
      el.textContent = `업데이트: ${dt.toLocaleString('ko-KR')}`;
    } else {
      el.textContent = '업데이트: 알 수 없음';
    }
  }

  // ── 전체 렌더 ─────────────────────────────────────
  function renderAll(data) {
    currentData = data;
    renderHero(data);
    renderStats(data);
    renderCommunity(data);
    renderChart(data, chartDays);
    renderKeywords(data);
    renderPosts(data);
    renderUpdatedAt(data);

    // localStorage에 저장 (다음 방문 시 자동 로드)
    saveFearGreedData(data);

    // 로더 섹션 숨기기
    const loaderSection = document.getElementById('loader-section');
    if (loaderSection) loaderSection.style.display = 'none';

    // 대시보드 표시
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
      dashboard.style.display = '';
      dashboard.style.animation = 'fadeIn 0.5s ease forwards';
    }
  }

  // ── DOM 헬퍼 ──────────────────────────────────────
  function setInner(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ── 이벤트 바인딩 ─────────────────────────────────
  function bindEvents() {
    // 파일 로더 초기화
    const dropZone  = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    DataLoader.init({
      dropZone,
      fileInput,
      onLoad: renderAll,
    });

    // 파일 선택 버튼
    document.getElementById('btn-select-file')?.addEventListener('click', () => {
      fileInput?.click();
    });

    // 데모 데이터 버튼
    document.getElementById('btn-load-demo')?.addEventListener('click', () => {
      DataLoader.loadDemo(renderAll);
    });

    // 헤더의 JSON 로드 버튼
    document.getElementById('btn-header-load')?.addEventListener('click', () => {
      if (currentData) {
        // 대시보드가 이미 있으면 파일 선택 열기
        fileInput?.click();
      } else {
        DataLoader.loadDemo(renderAll);
      }
    });

    // 차트 탭 (7일 / 30일)
    document.querySelectorAll('.chart-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        chartDays = parseInt(btn.dataset.days, 10) || 30;
        if (currentData) renderChart(currentData, chartDays);
      });
    });

    // 리사이즈 시 게이지 재렌더
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (currentData) {
          const canvas = document.getElementById('gauge-canvas');
          if (canvas) GaugeRenderer.draw(canvas, currentData.current?.score ?? 50);
        }
      }, 200);
    });
  }

  // ── 초기화 ──────────────────────────────────────────────────
  function showNoData(reason) {
    const noDataEl = document.getElementById('no-data-notice');
    if (noDataEl) {
      const titleEl      = noDataEl.querySelector('#no-data-title');
      const bodyEl       = noDataEl.querySelector('#no-data-body');
      const serverHintEl = noDataEl.querySelector('#no-data-server-hint');

      if (reason === 'file_protocol_data_missing') {
        if (titleEl) titleEl.textContent = '생성된 데이터 파일이 없습니다';
        if (bodyEl)  bodyEl.innerHTML =
          '<code>file://</code> 직접 열기에서는 <code>fear_greed_data.js</code>가 있으면 자동으로 불러옵니다.<br>' +
          '<code>scripts/analyze.py</code>를 실행해 JS 데이터를 생성하거나, 아래에서 JSON 파일을 직접 선택하세요.';
        if (serverHintEl) {
          serverHintEl.style.display = '';
          serverHintEl.innerHTML =
            '<span style="color:#10b981; font-weight:700">✅ file:// 직접 열기 지원</span><br>' +
            '<span style="color:#4a5a70"># scripts 폴더에서 analyze.py 실행 시 생성</span><br>' +
            '<span style="color:var(--accent)">python</span> analyze.py<br>' +
            '<span style="color:#4a5a70"># 생성 파일</span><br>' +
            '<span style="color:#10b981">data/fear_greed_data.js</span>';
        }
      } else {
        if (serverHintEl) serverHintEl.style.display = 'none';
      }
      noDataEl.style.display = '';
    }
  }

  function init() {
    bindEvents();

    const dashboard = document.getElementById('dashboard');
    if (dashboard) dashboard.style.display = 'none';

    // 1순위: analyze.py가 생성한 전역 JS 데이터 자동 로드 (file:// 직접 열기 대응)
    if (window.FEAR_GREED_DATA && typeof window.FEAR_GREED_DATA === 'object') {
      renderAll(window.FEAR_GREED_DATA);
      return;
    }

    // 2순위: localStorage 저장 데이터 자동 로드
    const saved = loadFearGreedData();
    if (saved) {
      renderAll(saved);
      return;
    }

    // 3순위: HTTP 서버 환경에서 fetch로 JSON 로드
    DataLoader.loadRealData(
      data => { renderAll(data); },
      reason => { showNoData(reason); }
    );
  }

  document.addEventListener('DOMContentLoaded', init);

  // fadeIn 애니메이션
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }`;
  document.head.appendChild(style);
})();
