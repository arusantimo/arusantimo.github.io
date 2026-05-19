/**
 * chart.js — Chart.js 래퍼: 30일 Fear & Greed 추이 차트
 */

const ChartRenderer = (() => {
  let historyChart = null;

  const ZONE_COLORS = {
    '극단적 공포': 'rgba(239, 35, 60, 0.9)',
    '공포':        'rgba(249, 115, 22, 0.9)',
    '중립':        'rgba(100, 116, 139, 0.9)',
    '탐욕':        'rgba(34, 197, 94, 0.9)',
    '극단적 탐욕': 'rgba(16, 185, 129, 0.9)',
  };

  function scoreToColor(score) {
    if (score <= 20) return ZONE_COLORS['극단적 공포'];
    if (score <= 40) return ZONE_COLORS['공포'];
    if (score <= 60) return ZONE_COLORS['중립'];
    if (score <= 80) return ZONE_COLORS['탐욕'];
    return ZONE_COLORS['극단적 탐욕'];
  }

  function renderHistory(canvasEl, history, days = 30) {
    const slice = history.slice(-days);
    const labels = slice.map(d => {
      const dt = new Date(d.date);
      return `${dt.getMonth() + 1}/${dt.getDate()}`;
    });
    const scores = slice.map(d => d.score);
    const pointColors = scores.map(scoreToColor);

    // 그라데이션 배경
    const ctx = canvasEl.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasEl.offsetHeight);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

    if (historyChart) {
      historyChart.destroy();
      historyChart = null;
    }

    historyChart = new Chart(canvasEl, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '공포탐욕지수',
          data: scores,
          borderColor: '#38bdf8',
          borderWidth: 2,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: scores.map((_, i) => i === scores.length - 1 ? 6 : 3),
          pointBackgroundColor: pointColors,
          pointBorderColor: '#0d1117',
          pointBorderWidth: 2,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#161e2e',
            borderColor: '#1e2d45',
            borderWidth: 1,
            titleColor: '#8899b4',
            bodyColor: '#f0f4fc',
            padding: 12,
            callbacks: {
              label(ctx) {
                const score = ctx.parsed.y;
                const label = slice[ctx.dataIndex]?.label || '';
                return [`지수: ${score}점`, `상태: ${label}`];
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(30, 45, 69, 0.5)', drawBorder: false },
            ticks: {
              color: '#4a5a70',
              font: { size: 10, family: 'JetBrains Mono' },
              maxTicksLimit: 10,
            },
            border: { display: false },
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(30, 45, 69, 0.5)', drawBorder: false },
            ticks: {
              color: '#4a5a70',
              font: { size: 10 },
              stepSize: 25,
              callback(val) {
                const map = { 0: '극단공포', 25: '공포', 50: '중립', 75: '탐욕', 100: '극단탐욕' };
                return map[val] ?? val;
              }
            },
            border: { display: false },
          }
        },
        // 구간 배경 플러그인
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#161e2e',
            borderColor: '#253550',
            borderWidth: 1,
            titleColor: '#8899b4',
            bodyColor: '#f0f4fc',
            padding: 12,
            callbacks: {
              label(ctx) {
                const score = ctx.parsed.y;
                const label = slice[ctx.dataIndex]?.label || '';
                return [`지수: ${score}점 (${label})`];
              }
            }
          },
          zoneBackground: {}   // 커스텀 플러그인 placeholder
        },
      },
      plugins: [{
        id: 'zoneBackground',
        beforeDraw(chart) {
          const { ctx: c, chartArea: { left, right, top, bottom }, scales: { y } } = chart;
          const zones = [
            { min: 0,  max: 20,  color: 'rgba(239,35,60,0.07)' },
            { min: 20, max: 40,  color: 'rgba(249,115,22,0.07)' },
            { min: 40, max: 60,  color: 'rgba(100,116,139,0.05)' },
            { min: 60, max: 80,  color: 'rgba(34,197,94,0.07)' },
            { min: 80, max: 100, color: 'rgba(16,185,129,0.07)' },
          ];
          c.save();
          zones.forEach(z => {
            const yTop    = y.getPixelForValue(z.max);
            const yBottom = y.getPixelForValue(z.min);
            c.fillStyle = z.color;
            c.fillRect(left, yTop, right - left, yBottom - yTop);
          });
          c.restore();
        }
      }]
    });
  }

  return { renderHistory };
})();
