/* nrho-orbit.js
   Near-Rectilinear Halo Orbit — physically exact 2D projection

   Real NRHO parameters (9:2 lunar resonant, L2 southern family):
     r_perilune  = 4,737 km from Moon center (~3,000 km altitude, over north pole)
     r_apolune   = 71,737 km from Moon center (~70,000 km altitude, over south pole)
     a (semi-major) = 38,237 km
     e (eccentricity) = 0.876
     b (semi-minor)   = 18,468 km
     Period          = 6.5 days (3-body halo — NOT computable from Kepler's 3rd law alone)

   Speed: Kepler's equation governs the angular position vs time.
   Period is manually mapped to wall-clock animation time (30 s/orbit).

   Note: actual NRHO is a 3D halo orbit shaped by Earth–Moon 3-body dynamics.
   This is a true 2D projection of its in-plane shape and speed variation.
*/

(function () {
  /* ---- Orbital constants ---- */
  const E_ORBIT = 0.876;                    // eccentricity
  const A_KM    = 38_237;                   // semi-major axis, km
  const B_KM    = A_KM * Math.sqrt(1 - E_ORBIT * E_ORBIT); // 18,468 km
  const C_KM    = A_KM * E_ORBIT;           // focus offset, km = 33,495 km
  const MOON_RADIUS_KM = 1_737;

  /* Perilune over NORTH pole → orbit's upper pole */
  const R_PERILUNE_KM = A_KM * (1 - E_ORBIT); // 4,737 km from Moon center
  const R_APOLUNE_KM  = A_KM * (1 + E_ORBIT); // 71,737 km from Moon center

  /* Animation: one orbit = WALL_PERIOD ms wall time */
  const WALL_PERIOD_MS = 30_000; // 30 seconds per orbit

  /* Kepler solver — Newton–Raphson on M = E - e·sin(E) */
  function eccentricAnomaly(M, e) {
    let E = M;
    for (let i = 0; i < 12; i++) {
      const dE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E));
      E += dE;
      if (Math.abs(dE) < 1e-9) break;
    }
    return E;
  }

  function init() {
    const canvas = document.getElementById('nrho-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let raf = null;
    let startTime = null;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw(now) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* ---- Scale: map A_KM to canvas ----
         We want the full orbit height (2a) to fit in ~0.85 * H.
         Periselene is at top (north), aposelene at bottom (south).
         Moon is at the upper focus. */
      const pxPerKm = (H * 0.82) / (2 * A_KM);
      const a = A_KM * pxPerKm;
      const b = B_KM * pxPerKm;
      const c = C_KM * pxPerKm;

      /* Ellipse center: leave margin so aposelene fits */
      const ecx = W * 0.5;
      const ecy = H * 0.10 + a; // center positioned so periselene is 10% from top

      /* Moon (upper focus) */
      const moonX = ecx;
      const moonY = ecy - c; // above ellipse center

      const moonR_px = Math.max(10, MOON_RADIUS_KM * pxPerKm * 4); // display-scaled

      /* ---- Subtle grid ---- */
      ctx.strokeStyle = 'rgba(244,237,228,0.035)';
      ctx.lineWidth = 1;
      const gs = 32;
      for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      /* ---- Draw orbit path ---- */
      ctx.strokeStyle = 'rgba(244,237,228,0.2)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      for (let i = 0; i <= 180; i++) {
        const E_draw = (i / 180) * 2 * Math.PI;
        const px = ecx + b * Math.sin(E_draw);
        const py = ecy - a * Math.cos(E_draw); // minus: periselene at top
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      /* ---- Moon ---- */
      const moonGrad = ctx.createRadialGradient(moonX - moonR_px*0.3, moonY - moonR_px*0.3, moonR_px*0.05, moonX, moonY, moonR_px);
      moonGrad.addColorStop(0, '#c8cdd6');
      moonGrad.addColorStop(0.6, '#7a8190');
      moonGrad.addColorStop(1, '#3a3f50');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR_px, 0, Math.PI * 2);
      ctx.fill();

      /* North pole marker (perilune pole) — top of Moon */
      const npX = moonX;
      const npY = moonY - moonR_px;
      ctx.fillStyle = 'rgba(255,176,0,0.7)';
      ctx.beginPath();
      ctx.arc(npX, npY, 3, 0, Math.PI * 2);
      ctx.fill();

      /* South pole marker (landing target) — bottom of Moon */
      const spX = moonX;
      const spY = moonY + moonR_px;
      ctx.fillStyle = '#FC3D21';
      ctx.beginPath();
      ctx.arc(spX, spY, 4, 0, Math.PI * 2);
      ctx.fill();

      const fs = Math.round(W * 0.022);
      ctx.font = `${fs}px 'JetBrains Mono', monospace`;

      ctx.fillStyle = 'rgba(252,61,33,0.8)';
      ctx.textAlign = 'left';
      ctx.fillText('S. POLE', spX + 8, spY + 4);

      ctx.fillStyle = 'rgba(255,176,0,0.6)';
      ctx.textAlign = 'left';
      ctx.fillText('N. POLE', npX + 8, npY + 4);

      /* MOON label */
      ctx.fillStyle = 'rgba(244,237,228,0.45)';
      ctx.textAlign = 'center';
      ctx.fillText('MOON', moonX, moonY + moonR_px + 14);

      /* ---- Gateway position via Kepler ---- */
      const M = ((elapsed % WALL_PERIOD_MS) / WALL_PERIOD_MS) * 2 * Math.PI;
      const E = eccentricAnomaly(M, E_ORBIT);

      const gx = ecx + b * Math.sin(E);
      const gy = ecy - a * Math.cos(E);

      /* Speed trail — draw last 60° of mean anomaly */
      const trailLength = Math.PI / 3;
      const trailSteps = 60;
      ctx.strokeStyle = 'rgba(255,176,0,0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= trailSteps; i++) {
        const M_t = M - trailLength * (1 - i / trailSteps);
        const E_t = eccentricAnomaly(((M_t % (2*Math.PI)) + 2*Math.PI) % (2*Math.PI), E_ORBIT);
        const tx = ecx + b * Math.sin(E_t);
        const ty = ecy - a * Math.cos(E_t);
        i === 0 ? ctx.moveTo(tx, ty) : ctx.lineTo(tx, ty);
      }
      ctx.stroke();

      /* Gateway dot */
      ctx.fillStyle = '#FFB000';
      ctx.beginPath();
      ctx.arc(gx, gy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,176,0,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(gx, gy, 13, 0, Math.PI * 2);
      ctx.stroke();

      /* Gateway label */
      ctx.fillStyle = 'rgba(255,176,0,0.9)';
      ctx.font = `${Math.round(W * 0.022)}px 'JetBrains Mono', monospace`;
      const gLabelRight = gx < W * 0.6;
      ctx.textAlign = gLabelRight ? 'left' : 'right';
      const gLabelX = gLabelRight ? gx + 16 : gx - 16;
      ctx.fillText('GATEWAY', gLabelX, gy - 10);
      ctx.fillStyle = 'rgba(244,237,228,0.4)';
      ctx.font = `${Math.round(W * 0.018)}px 'JetBrains Mono', monospace`;
      ctx.fillText('HALO + PPE', gLabelX, gy + 4);

      /* ---- Perilune annotation (top) ---- */
      const perilune_y = ecy - a;
      ctx.strokeStyle = 'rgba(255,176,0,0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(moonX, moonY - moonR_px);
      ctx.lineTo(moonX, perilune_y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255,176,0,0.6)';
      ctx.font = `${Math.round(W * 0.018)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('PERILUNE', moonX - 10, perilune_y + 4);
      ctx.fillText('~3,000 km alt', moonX - 10, perilune_y + 16);

      /* ---- Apolune annotation (bottom) ---- */
      const apolune_y = ecy + a;
      ctx.fillStyle = 'rgba(244,237,228,0.35)';
      ctx.font = `${Math.round(W * 0.018)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('APOLUNE', moonX - 10, apolune_y - 4);
      ctx.fillText('~70,000 km alt', moonX - 10, apolune_y + 8);

      /* ---- Footer disclaimer ---- */
      ctx.fillStyle = 'rgba(244,237,228,0.2)';
      ctx.font = `${Math.round(W * 0.016)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('2D projection · e=0.876 · T≈6.5 days · Kepler speed · actual NRHO is 3-body halo', 8, H - 6);

      raf = requestAnimationFrame(draw);
    }

    /* Only run when visible */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
          raf = null;
          startTime = null;
        }
      });
    });

    resize();
    window.addEventListener('resize', () => { resize(); });
    io.observe(canvas);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
