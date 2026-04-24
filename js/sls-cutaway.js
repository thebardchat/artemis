/* sls-cutaway.js
   Scroll-driven SLS Block 1 stack diagram — exact proportions

   Real dimensions (NASA):
     Total stack (inc. LAS): 322 ft / 98.1 m
     Core Stage:             212 ft × 27.6 ft dia   (Boeing / Michoud)
     Solid Rocket Boosters:  177 ft × 12.2 ft dia   (Northrop Grumman)
     SRB center offset:      19.9 ft from centerline (13.8 + 6.1)
     ICPS:                    45 ft × 17.0 ft dia   (ULA / Decatur AL)
     Orion Stage Adapter:     12 ft tapered
     Orion CM+SM:             23 ft × 16.5 ft dia   (Lockheed Martin + ESA)
     LAS tower:               30 ft × ~3 ft         (structural)

   Coordinate system:
     ft_base = 0 at bottom of stack (engine skirts / SRB aft)
     ft_top  = 322 at LAS tip

   Drawing: pxPerFt = (canvas_height * DRAW_FRACTION) / 322
   x=0 is centerline (cx).
*/

(function () {

  /* ---- Exact dimension table (ft) ---- */
  const DIM = {
    total:       322,
    core:        { base: 0,   top: 212,  halfW: 13.8 },
    srb:         { base: 0,   top: 177,  halfW:  6.1, centerOffset: 19.9 },
    icps:        { base: 212, top: 257,  halfW:  8.5 },
    adapter:     { base: 257, top: 269,  halfWbot: 8.5, halfWtop: 8.25 },
    orion:       { base: 269, top: 292,  halfW:  8.25 },
    las:         { base: 292, top: 322,  halfW:  1.5 },
    engines:     { base: -14, top: 0  }, // engine bells extend 14 ft below base
  };

  /* Stage info for the info panel (scroll-driven) */
  const STAGES = [
    {
      id: 'engines',
      name: 'RS-25 Engines ×4',
      contractor: 'Aerojet Rocketdyne',
      location: 'Canoga Park, CA',
      thrust: '418,000 lbf each (sea level)\n512,000 lbf each (vacuum)',
      propellant: 'LH₂ / LOX',
      notes: 'Heritage Space Shuttle engines, upgraded avionics. Specific impulse 452 s.',
      msfc: true,
    },
    {
      id: 'core',
      name: 'Core Stage',
      contractor: 'Boeing',
      location: 'Michoud Assembly Facility\nNew Orleans, LA',
      thrust: '1,600,000 lbf (4× RS-25 combined)',
      propellant: 'Liquid hydrogen (LH₂) + Liquid oxygen (LOX)',
      notes: '212 ft · 27.6 ft dia · Largest rocket stage ever built by Boeing. Primary MSFC engineering authority.',
      msfc: true,
    },
    {
      id: 'srb',
      name: 'Solid Rocket Boosters ×2',
      contractor: 'Northrop Grumman',
      location: 'Promontory, UT',
      thrust: '3,600,000 lbf each · 7,200,000 lbf total',
      propellant: 'APCP solid propellant (5-segment)',
      notes: '177 ft · 12.2 ft dia · Burn ~126 seconds, provide 75% of liftoff thrust. Expended (not recovered).',
      msfc: false,
    },
    {
      id: 'icps',
      name: 'Interim Cryogenic Propulsion Stage',
      contractor: 'United Launch Alliance (ULA)',
      location: 'Decatur, AL',
      thrust: '22,890 lbf',
      propellant: 'LH₂ / LOX · Rl-10B-2 engine',
      notes: '45 ft · 17 ft dia · Modified Delta IV upper stage. Sends Orion to translunar injection.',
      msfc: false,
    },
    {
      id: 'adapter',
      name: 'Orion Stage Adapter',
      contractor: 'Teledyne Brown Engineering',
      location: 'Huntsville, AL',
      thrust: 'Structural',
      propellant: 'N/A',
      notes: '12 ft · Carried 13 CubeSat secondary payloads on Artemis I.',
      msfc: false,
    },
    {
      id: 'orion',
      name: 'Orion MPCV',
      contractor: 'Lockheed Martin (CM) + ESA (SM)',
      location: 'KSC, FL (final assembly)',
      thrust: '6,000 lbf (OMS-E, service module)',
      propellant: 'NTO / MMH (hypergolic)',
      notes: '23 ft · 16.5 ft dia · 4 crew · 21-day endurance · 5 m heat shield (largest ever flown).',
      msfc: false,
    },
  ];

  /* ---- Drawing ---- */
  function toCanvas(ft, base_y, scale) {
    return base_y - ft * scale; // y decreases as ft increases (up)
  }

  function drawStage(ctx, id, alpha, cx, base_y, scale) {
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha;
    const s = scale;

    if (id === 'engines') {
      /* 4 RS-25 nozzles below core base */
      const nozzleW = (DIM.core.halfW * 0.22) * s;
      const nozzleH = 14 * s;
      const offsets = [-1.5, -0.5, 0.5, 1.5].map(o => o * DIM.core.halfW * 0.45 * s);
      const ny = base_y;
      ctx.fillStyle = '#6a8090';
      offsets.forEach(ox => {
        /* Bell shape — trapezoid narrower at top */
        ctx.beginPath();
        ctx.moveTo(cx + ox - nozzleW * 0.5, ny);
        ctx.lineTo(cx + ox + nozzleW * 0.5, ny);
        ctx.lineTo(cx + ox + nozzleW * 0.75, ny + nozzleH);
        ctx.lineTo(cx + ox - nozzleW * 0.75, ny + nozzleH);
        ctx.closePath();
        ctx.fill();
      });
      return;
    }

    if (id === 'core') {
      const x0 = cx - DIM.core.halfW * s;
      const y0 = toCanvas(DIM.core.top, base_y, s);
      const w  = DIM.core.halfW * 2 * s;
      const h  = (DIM.core.top - DIM.core.base) * s;
      const grad = ctx.createLinearGradient(x0, 0, x0 + w, 0);
      grad.addColorStop(0, '#0d1f45');
      grad.addColorStop(0.35, '#1a3468');
      grad.addColorStop(0.65, '#1a3468');
      grad.addColorStop(1, '#0d1f45');
      ctx.fillStyle = grad;
      ctx.fillRect(x0, y0, w, h);
      /* Intertank ring (visual marker at ~130 ft) */
      ctx.fillStyle = 'rgba(26,52,104,0.7)';
      const ringY = toCanvas(130, base_y, s);
      ctx.fillRect(x0, ringY - 4, w, 8);
      return;
    }

    if (id === 'srb') {
      [-1, 1].forEach(side => {
        const srbCx = cx + side * DIM.srb.centerOffset * s;
        const x0 = srbCx - DIM.srb.halfW * s;
        const y0 = toCanvas(DIM.srb.top, base_y, s);
        const w  = DIM.srb.halfW * 2 * s;
        const h  = (DIM.srb.top - DIM.srb.base) * s;
        const sg = ctx.createLinearGradient(x0, 0, x0 + w, 0);
        sg.addColorStop(0, '#1a1a2e');
        sg.addColorStop(0.5, '#2d2d50');
        sg.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = sg;
        ctx.fillRect(x0, y0, w, h);
        /* SRB nose cap */
        ctx.fillStyle = '#242440';
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0 + w, y0);
        ctx.lineTo(srbCx, y0 - w * 0.8);
        ctx.closePath();
        ctx.fill();
        /* Forward attach strut (at ~176 ft) */
        const attachY = toCanvas(176, base_y, s);
        ctx.fillStyle = 'rgba(200,200,220,0.3)';
        const strutX = side === -1 ? srbCx + DIM.srb.halfW * s : srbCx - DIM.srb.halfW * s;
        const coreEdgeX = cx + side * DIM.core.halfW * s;
        ctx.fillRect(Math.min(strutX, coreEdgeX), attachY - 2, Math.abs(strutX - coreEdgeX), 4);
      });
      return;
    }

    if (id === 'icps') {
      const x0 = cx - DIM.icps.halfW * s;
      const y0 = toCanvas(DIM.icps.top, base_y, s);
      const w  = DIM.icps.halfW * 2 * s;
      const h  = (DIM.icps.top - DIM.icps.base) * s;
      ctx.fillStyle = '#243566';
      ctx.fillRect(x0, y0, w, h);
      return;
    }

    if (id === 'adapter') {
      const y_bot = toCanvas(DIM.adapter.base, base_y, s);
      const y_top = toCanvas(DIM.adapter.top,  base_y, s);
      const hw_bot = DIM.adapter.halfWbot * s;
      const hw_top = DIM.adapter.halfWtop * s;
      ctx.fillStyle = '#1e3058';
      ctx.beginPath();
      ctx.moveTo(cx - hw_bot, y_bot);
      ctx.lineTo(cx + hw_bot, y_bot);
      ctx.lineTo(cx + hw_top, y_top);
      ctx.lineTo(cx - hw_top, y_top);
      ctx.closePath();
      ctx.fill();
      return;
    }

    if (id === 'orion') {
      /* Service module — cylindrical */
      const sm_base = DIM.orion.base;
      const sm_top  = DIM.orion.base + 15;
      const y_sm_b  = toCanvas(sm_base, base_y, s);
      const y_sm_t  = toCanvas(sm_top,  base_y, s);
      const hw = DIM.orion.halfW * s;
      ctx.fillStyle = '#2a3f6e';
      ctx.fillRect(cx - hw, y_sm_t, hw * 2, y_sm_b - y_sm_t);

      /* Solar arrays */
      ctx.fillStyle = 'rgba(26,52,104,0.6)';
      const saW = hw * 2.2, saH = (sm_top - sm_base) * s * 0.3;
      const saY = toCanvas((sm_base + sm_top) / 2, base_y, s) - saH / 2;
      ctx.fillRect(cx - hw - saW, saY, saW, saH);
      ctx.fillRect(cx + hw,       saY, saW, saH);

      /* Crew module capsule */
      const cm_base = sm_top;
      const cm_top  = DIM.orion.top;
      const y_cm_b = toCanvas(cm_base, base_y, s);
      const y_cm_t = toCanvas(cm_top,  base_y, s);
      ctx.fillStyle = '#3a5280';
      ctx.fillRect(cx - hw, y_cm_t, hw * 2, y_cm_b - y_cm_t);

      /* CM nose dome */
      ctx.fillStyle = '#4060a0';
      ctx.beginPath();
      ctx.ellipse(cx, y_cm_t, hw, (y_cm_b - y_cm_t) * 0.3, 0, Math.PI, 0);
      ctx.fill();

      /* LAS abort tower */
      const las_base = DIM.orion.top;
      const las_top  = DIM.las.top;
      const y_las_b = toCanvas(las_base, base_y, s);
      const y_las_t = toCanvas(las_top,  base_y, s);
      ctx.fillStyle = '#8a9bb0';
      ctx.fillRect(cx - DIM.las.halfW * s, y_las_t, DIM.las.halfW * 2 * s, y_las_b - y_las_t);
      /* LAS tip */
      ctx.fillStyle = '#FC3D21';
      const lasHW = DIM.las.halfW * s;
      ctx.beginPath();
      ctx.moveTo(cx - lasHW * 2, y_las_t);
      ctx.lineTo(cx + lasHW * 2, y_las_t);
      ctx.lineTo(cx, y_las_t - lasHW * 3);
      ctx.closePath();
      ctx.fill();
      return;
    }
  }

  function drawHeightAnnotation(ctx, cx, base_y, scale, alpha) {
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha * 0.4;
    const topY = base_y - DIM.total * scale;
    const annotX = cx - DIM.srb.centerOffset * scale - DIM.srb.halfW * scale - 28;

    ctx.strokeStyle = 'rgba(244,237,228,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(annotX, topY);
    ctx.lineTo(annotX, base_y);
    ctx.stroke();
    ctx.setLineDash([]);

    /* Tick marks at 0, 50, 100, 150, 200, 250, 300 ft */
    [0, 50, 100, 150, 200, 250, 300].forEach(ft => {
      const ty = base_y - ft * scale;
      ctx.beginPath();
      ctx.moveTo(annotX - 4, ty);
      ctx.lineTo(annotX + 4, ty);
      ctx.stroke();
      ctx.fillStyle = 'rgba(244,237,228,0.3)';
      ctx.font = `${Math.max(8, scale * 3)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(ft + ' ft', annotX - 6, ty + 3);
    });

    /* Overall label */
    ctx.save();
    ctx.translate(annotX - 18, (topY + base_y) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = 'rgba(244,237,228,0.25)';
    ctx.font = `${Math.max(8, scale * 3.5)}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('322 ft / 98 m', 0, 0);
    ctx.restore();

    ctx.globalAlpha = 1;
  }

  function drawLabels(ctx, stageIdx, cx, base_y, scale, alpha) {
    if (alpha <= 0) return;
    const stage = STAGES[stageIdx];
    if (!stage) return;
    ctx.globalAlpha = Math.min(1, alpha * 1.5);

    const fs = Math.max(9, scale * 4.5);
    ctx.font = `${fs}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'left';
    const labelX = cx + DIM.srb.centerOffset * scale + DIM.srb.halfW * scale + 12;

    /* Connector line from stage midpoint */
    let midFt;
    if (stage.id === 'engines') midFt = -7;
    else if (stage.id === 'core') midFt = 100;
    else if (stage.id === 'srb') midFt = 88;
    else if (stage.id === 'icps') midFt = 234;
    else if (stage.id === 'adapter') midFt = 263;
    else if (stage.id === 'orion') midFt = 281;
    else midFt = 307;

    const lineY = base_y - midFt * scale;
    ctx.strokeStyle = 'rgba(252,61,33,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + (stage.id === 'srb' ? DIM.srb.centerOffset * scale + DIM.srb.halfW * scale : DIM.core.halfW * scale), lineY);
    ctx.lineTo(labelX - 4, lineY);
    ctx.stroke();

    /* Label block */
    ctx.fillStyle = '#FC3D21';
    ctx.fillText(stage.name, labelX, lineY - 2);
    ctx.fillStyle = 'rgba(255,176,0,0.8)';
    ctx.fillText(stage.contractor.split('\n')[0], labelX, lineY + fs + 1);
    ctx.fillStyle = 'rgba(244,237,228,0.5)';
    ctx.fillText(stage.thrust.split('\n')[0], labelX, lineY + fs * 2 + 2);
  }

  /* ---- Main ---- */
  function init() {
    const canvas = document.getElementById('sls-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const stickyWrap = document.querySelector('.sls-sticky-wrap');
    if (!stickyWrap) return;

    let currentProgress = 0;

    const panel = {
      counter:    document.querySelector('.sls-section-counter'),
      name:       document.querySelector('.sls-stage-name'),
      contractor: document.querySelector('.sls-contractor'),
      specs:      document.querySelector('.sls-specs'),
      msfc:       document.querySelector('.msfc-badge'),
    };

    function resize() {
      const h = Math.min(window.innerHeight * 0.82, 720);
      const w = h * 0.55;
      canvas.width  = Math.round(w);
      canvas.height = Math.round(h);
      canvas.style.width  = Math.round(w) + 'px';
      canvas.style.height = Math.round(h) + 'px';
      render(currentProgress);
    }

    function render(progress) {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      ctx.clearRect(0, 0, W, H);

      const DRAW_FRACTION = 0.83;
      const scale = (H * DRAW_FRACTION) / DIM.total; // px per ft
      const base_y = H * 0.97; // bottom of stack

      /* Draw order: core → SRBs → ICPS → adapter → Orion → engines → labels
         Reveal order matches stages array (scroll-driven) */
      const nStages = STAGES.length;
      const stageAlphas = STAGES.map((_, i) => {
        const lo = i / nStages;
        const hi = (i + 1) / nStages;
        return Math.min(1, Math.max(0, (progress - lo) / (hi - lo)));
      });

      /* Draw background stages first */
      ['core', 'srb', 'icps', 'adapter', 'orion', 'engines'].forEach(id => {
        const idx = STAGES.findIndex(s => s.id === id);
        drawStage(ctx, id, stageAlphas[idx] || 0, cx, base_y, scale);
      });
      ctx.globalAlpha = 1;

      /* MSFC badge on core stage — visible after core appears */
      const coreA = stageAlphas[STAGES.findIndex(s => s.id === 'core')];
      if (coreA > 0.4) {
        ctx.globalAlpha = Math.min(1, (coreA - 0.4) / 0.4);
        const bx = cx - 8;
        const by = base_y - 130 * scale;
        ctx.strokeStyle = '#FC3D21';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(bx - 36, by - 10, 72, 24);
        ctx.fillStyle = '#FC3D21';
        ctx.font = `bold ${Math.max(7, scale * 3.5)}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('MSFC', cx, by + 4);
        ctx.font = `${Math.max(6, scale * 2.8)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = 'rgba(244,237,228,0.6)';
        ctx.fillText('HUNTSVILLE, AL', cx, by + 14);
        ctx.globalAlpha = 1;
      }

      /* Height annotation — show last 20% of scroll */
      drawHeightAnnotation(ctx, cx, base_y, scale, Math.max(0, (progress - 0.8) / 0.2));

      /* Stage labels — show the currently-revealing stage */
      const activeIdx = Math.min(nStages - 1, Math.floor(progress * nStages));
      if (activeIdx >= 0) {
        drawLabels(ctx, activeIdx, cx, base_y, scale, stageAlphas[activeIdx]);
      }

      ctx.globalAlpha = 1;
    }

    function updatePanel(progress) {
      const nStages = STAGES.length;
      const activeIdx = Math.min(nStages - 1, Math.floor(progress * nStages));
      const stage = STAGES[activeIdx];
      if (!stage || !panel.name) return;

      panel.counter.textContent = `Stage ${activeIdx + 1} of ${nStages}`;
      panel.name.textContent = stage.name;
      panel.contractor.textContent = stage.contractor.replace('\n', ' · ') + ' · ' + stage.location.replace('\n', ', ');
      panel.specs.innerHTML = `
        <div class="spec-row"><span class="spec-key">Thrust</span><span class="spec-val">${stage.thrust.split('\n')[0]}</span></div>
        <div class="spec-row"><span class="spec-key">Propellant</span><span class="spec-val">${stage.propellant}</span></div>
        <div class="spec-row"><span class="spec-key">Notes</span><span class="spec-val" style="font-size:0.7rem">${stage.notes}</span></div>
      `;
      if (panel.msfc) panel.msfc.style.opacity = stage.msfc ? '1' : '0.2';
    }

    function onScroll() {
      const rect = stickyWrap.getBoundingClientRect();
      const total = stickyWrap.offsetHeight - window.innerHeight;
      currentProgress = Math.max(0, Math.min(1, -rect.top / total));
      render(currentProgress);
      updatePanel(currentProgress);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    resize();
    onScroll();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
