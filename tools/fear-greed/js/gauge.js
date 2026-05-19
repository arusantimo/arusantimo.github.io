/**
 * gauge.js — Canvas 기반 반원형 Fear & Greed 게이지
 *
 * 점수 0   = 왼쪽 (극단적 공포, 빨강)
 * 점수 50  = 상단 (중립, 회색)
 * 점수 100 = 오른쪽 (극단적 FOMO, 초록)
 */

const GaugeRenderer = (() => {
  // 점수에 따른 색상 반환
  function scoreToColor(score) {
    if (score <= 20)  return '#ef233c';
    if (score <= 40)  return '#f97316';
    if (score <= 60)  return '#64748b';
    if (score <= 80)  return '#22c55e';
    return '#10b981';
  }

  // 게이지 호 영역 정의
  const ZONES = [
    { from: 0,  to: 20,  color: '#ef233c', label: '극단적 공포' },
    { from: 20, to: 40,  color: '#f97316', label: '공포' },
    { from: 40, to: 60,  color: '#64748b', label: '중립' },
    { from: 60, to: 80,  color: '#22c55e', label: '탐욕' },
    { from: 80, to: 100, color: '#10b981', label: '극단적 탐욕' },
  ];

  // 점수 → 캔버스 각도 변환 (Canvas 좌표계)
  // 점수 0 = π (9시 방향), 점수 100 = 0 (3시 방향), 상단 통과
  function scoreToAngle(score) {
    return Math.PI - (score / 100) * Math.PI;
  }

  function draw(canvasEl, score, animated = true) {
    const dpr  = window.devicePixelRatio || 1;
    const W    = canvasEl.offsetWidth;
    const H    = canvasEl.offsetHeight;

    canvasEl.width  = W * dpr;
    canvasEl.height = H * dpr;

    const ctx = canvasEl.getContext('2d');
    ctx.scale(dpr, dpr);

    const cx      = W / 2;
    const cy      = H - 20;   // 반원 중심을 하단에 배치
    const outerR  = Math.min(W, H * 2) * 0.46;
    const innerR  = outerR * 0.68;
    const needleR = outerR * 0.88;

    ctx.clearRect(0, 0, W, H);

    // 1) 배경 호 (어두운 트랙)
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, Math.PI, 0, false);
    ctx.arc(cx, cy, innerR, 0, Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = '#1a2235';
    ctx.fill();

    // 2) 구간별 컬러 호 그리기
    ZONES.forEach(zone => {
      const a1 = scoreToAngle(zone.from);
      const a2 = scoreToAngle(zone.to);

      ctx.beginPath();
      // Canvas에서 anticlockwise=false이면 clockwise(시계 방향).
      // 상단 반원은 π→0 방향이 clockwise이므로 false 사용.
      ctx.arc(cx, cy, outerR, a1, a2, false);
      ctx.arc(cx, cy, innerR, a2, a1, true);
      ctx.closePath();
      ctx.fillStyle = zone.color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // 3) 구간 경계선
    ZONES.forEach((zone, i) => {
      if (i === 0) return;
      const angle = scoreToAngle(zone.from);
      const x1 = cx + innerR * Math.cos(angle);
      const y1 = cy - innerR * Math.sin(angle);
      const x2 = cx + outerR * Math.cos(angle);
      const y2 = cy - outerR * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#0d1117';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });

    // 4) 눈금 마커 (10 단위)
    for (let s = 0; s <= 100; s += 10) {
      const angle  = scoreToAngle(s);
      const tickR1 = outerR + 5;
      const tickR2 = outerR + (s % 50 === 0 ? 14 : 9);
      const tx1 = cx + tickR1 * Math.cos(angle);
      const ty1 = cy - tickR1 * Math.sin(angle);
      const tx2 = cx + tickR2 * Math.cos(angle);
      const ty2 = cy - tickR2 * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(tx1, ty1);
      ctx.lineTo(tx2, ty2);
      ctx.strokeStyle = s % 50 === 0 ? '#4a5a70' : '#253550';
      ctx.lineWidth = s % 50 === 0 ? 2 : 1;
      ctx.stroke();
    }

    // 5) 바늘 그리기
    const targetAngle = scoreToAngle(Math.max(0, Math.min(100, score)));
    drawNeedle(ctx, cx, cy, needleR, targetAngle);

    // 6) 중심 허브
    const hubR = innerR * 0.22;
    const hubGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, hubR);
    hubGrad.addColorStop(0, '#e2e8f0');
    hubGrad.addColorStop(1, '#94a3b8');

    ctx.beginPath();
    ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
    ctx.strokeStyle = '#1a2235';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawNeedle(ctx, cx, cy, len, angle) {
    const tipX  = cx + len * Math.cos(angle);
    const tipY  = cy - len * Math.sin(angle);

    // 바늘 양쪽 베이스 포인트
    const baseAngle1 = angle + Math.PI / 2;
    const baseAngle2 = angle - Math.PI / 2;
    const baseW = len * 0.06;
    const b1x = cx + baseW * Math.cos(baseAngle1);
    const b1y = cy - baseW * Math.sin(baseAngle1);
    const b2x = cx + baseW * Math.cos(baseAngle2);
    const b2y = cy - baseW * Math.sin(baseAngle2);

    // 바늘 그림자
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(b1x, b1y);
    ctx.lineTo(b2x, b2y);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore();

    // 바늘 테두리
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(b1x, b1y);
    ctx.lineTo(b2x, b2y);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // 애니메이션 포함 렌더링
  function render(canvasEl, targetScore) {
    let current = 50;
    const duration = 1200;
    const start = performance.now();

    function easeOutElastic(t) {
      if (t === 0 || t === 1) return t;
      const p = 0.4;
      return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    }

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutElastic(progress);
      current = 50 + (targetScore - 50) * eased;

      draw(canvasEl, current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        draw(canvasEl, targetScore);
      }
    }

    requestAnimationFrame(step);
  }

  return { render, draw, scoreToColor };
})();
