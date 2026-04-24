/* nrho-orbit.js — Canvas NRHO animation around the Moon */
(function () {
  function init() {
    const canvas = document.getElementById('nrho-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    /* NRHO: semi-major a ≈ 79,000 km, semi-minor b ≈ 16,600 km (9:2 resonant)
       We scale to canvas units. Moon radius ~1,737 km. */
    function frame() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* Moon */
      const moonR = Math.min(W, H) * 0.12;
      const moonX = W * 0.38;
      const moonY = H * 0.5;

      /* Orbit parameters (canvas units) */
      const a = Math.min(W, H) * 0.38;  /* semi-major */
      const b = Math.min(W, H) * 0.14;  /* semi-minor — elongated NRHO */
      const orbitCx = moonX + a * 0.55; /* focus offset */
      const orbitCy = moonY;

      /* Grid lines */
      ctx.strokeStyle = 'rgba(244,237,228,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      /* Orbit path */
      ctx.strokeStyle = 'rgba(244,237,228,0.18)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.ellipse(orbitCx, orbitCy, a, b, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      /* Moon gradient */
      const moonGrad = ctx.createRadialGradient(moonX - moonR * 0.3, moonY - moonR * 0.3, moonR * 0.1, moonX, moonY, moonR);
      moonGrad.addColorStop(0, '#c8cdd6');
      moonGrad.addColorStop(0.6, '#7a8190');
      moonGrad.addColorStop(1, '#3a3f50');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fill();

      /* Moon label */
      ctx.fillStyle = 'rgba(244,237,228,0.5)';
      ctx.font = `${Math.round(W * 0.025)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('MOON', moonX, moonY + moonR + 16);

      /* South Pole marker */
      ctx.fillStyle = '#FC3D21';
      ctx.beginPath();
      ctx.arc(moonX, moonY + moonR * 0.88, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(252,61,33,0.7)';
      ctx.font = `${Math.round(W * 0.02)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('SOUTH POLE', moonX + 8, moonY + moonR * 0.88 + 5);

      /* Gateway position on orbit */
      const gx = orbitCx + a * Math.cos(t);
      const gy = orbitCy + b * Math.sin(t);

      /* Gateway trail */
      ctx.strokeStyle = 'rgba(255,176,0,0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= 80; i++) {
        const tt = t - (i / 80) * 1.8;
        const tx = orbitCx + a * Math.cos(tt);
        const ty = orbitCy + b * Math.sin(tt);
        if (i === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }
      ctx.stroke();

      /* Gateway dot */
      ctx.fillStyle = '#FFB000';
      ctx.beginPath();
      ctx.arc(gx, gy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,176,0,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(gx, gy, 12, 0, Math.PI * 2);
      ctx.stroke();

      /* Gateway label */
      ctx.fillStyle = 'rgba(255,176,0,0.9)';
      ctx.font = `${Math.round(W * 0.022)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = gx > W / 2 ? 'right' : 'left';
      const labelOffX = gx > W / 2 ? -18 : 18;
      ctx.fillText('GATEWAY', gx + labelOffX, gy - 14);
      ctx.fillStyle = 'rgba(244,237,228,0.4)';
      ctx.font = `${Math.round(W * 0.018)}px 'JetBrains Mono', monospace`;
      ctx.fillText('NRHO', gx + labelOffX, gy);

      /* NRHO annotation */
      ctx.fillStyle = 'rgba(244,237,228,0.25)';
      ctx.font = `${Math.round(W * 0.018)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('Near-Rectilinear Halo Orbit', 12, H - 30);
      ctx.fillText('Period: ~6.5 days', 12, H - 14);

      t += 0.004;
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!raf) frame();
        } else {
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
    });

    resize();
    window.addEventListener('resize', () => { resize(); });
    io.observe(canvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
