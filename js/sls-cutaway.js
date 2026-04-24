/* sls-cutaway.js — scroll-driven SVG SLS stack reveal */

(function () {
  const STAGES = [
    { id: 'orion',        label: 'Orion MPCV',          color: '#2a3f6e', labelY: 28  },
    { id: 'osa',          label: 'Stage Adapter',         color: '#1e3058', labelY: 54  },
    { id: 'icps',         label: 'ICPS / ULA',            color: '#243566', labelY: 90  },
    { id: 'core',         label: 'Core Stage / Boeing',   color: '#0d1f45', labelY: 280 },
    { id: 'srb-left',     label: 'SRB / Northrop',        color: '#1a1a2e', labelY: 250 },
    { id: 'srb-right',    label: 'SRB / Northrop',        color: '#1a1a2e', labelY: 250 },
    { id: 'engines',      label: '4× RS-25 / AerojetRdyne', color: '#0d1520', labelY: 530 },
  ];

  function drawSLS(canvas, progress) {
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const dpr = 1;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    const p = Math.max(0, Math.min(1, progress));

    /* ---- helper ---- */
    function alpha(stageIndex, stagesTotal) {
      const threshold = stageIndex / stagesTotal;
      return Math.min(1, Math.max(0, (p - threshold) / (1 / stagesTotal)));
    }

    const stagesTotal = 7;
    const baseY = H - 30;

    /* Engine bells */
    const eA = alpha(0, stagesTotal);
    ctx.globalAlpha = eA;
    ctx.fillStyle = '#8a9bb0';
    for (let i = 0; i < 4; i++) {
      const ex = cx - 45 + i * 30;
      const ey = baseY - 20;
      ctx.beginPath();
      ctx.moveTo(ex - 10, ey);
      ctx.lineTo(ex + 10, ey);
      ctx.lineTo(ex + 15, ey + 20);
      ctx.lineTo(ex - 15, ey + 20);
      ctx.closePath();
      ctx.fill();
    }
    if (eA > 0.5) {
      ctx.fillStyle = '#F4EDE4';
      ctx.globalAlpha = eA * 0.8;
      ctx.font = `${W * 0.025}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('4× RS-25', cx + 40, baseY);
      ctx.fillText('Aerojet Rocketdyne', cx + 40, baseY + 14);
    }

    /* Core stage */
    const cA = alpha(1, stagesTotal);
    ctx.globalAlpha = cA;
    const cW = W * 0.18;
    const cH = H * 0.52;
    const cY = baseY - 20 - cH;
    const grad = ctx.createLinearGradient(cx - cW / 2, 0, cx + cW / 2, 0);
    grad.addColorStop(0, '#0d1f45');
    grad.addColorStop(0.5, '#1a3468');
    grad.addColorStop(1, '#0d1f45');
    ctx.fillStyle = grad;
    roundRect(ctx, cx - cW / 2, cY, cW, cH, 4);
    ctx.fill();

    /* Core stage MSFC badge */
    if (cA > 0.6) {
      ctx.globalAlpha = cA;
      ctx.strokeStyle = '#FC3D21';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - cW / 2 + 4, cY + cH * 0.3, cW - 8, 32);
      ctx.fillStyle = '#FC3D21';
      ctx.font = `bold ${W * 0.02}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('MSFC', cx, cY + cH * 0.3 + 14);
      ctx.font = `${W * 0.016}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#F4EDE4';
      ctx.fillText('HUNTSVILLE, AL', cx, cY + cH * 0.3 + 28);

      ctx.globalAlpha = cA * 0.7;
      ctx.fillStyle = '#F4EDE4';
      ctx.textAlign = 'left';
      ctx.font = `${W * 0.022}px 'JetBrains Mono', monospace`;
      ctx.fillText('Core Stage', cx + cW / 2 + 8, cY + cH * 0.2);
      ctx.font = `${W * 0.018}px 'JetBrains Mono', monospace`;
      ctx.fillText('Boeing / Michoud', cx + cW / 2 + 8, cY + cH * 0.2 + 16);
      ctx.fillText('LH₂ + LOX', cx + cW / 2 + 8, cY + cH * 0.2 + 32);
      ctx.fillText('1,600,000 lbf', cx + cW / 2 + 8, cY + cH * 0.2 + 48);

      /* Connector line */
      ctx.strokeStyle = 'rgba(252,61,33,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + cW / 2, cY + cH * 0.2 + 8);
      ctx.lineTo(cx + cW / 2 + 8, cY + cH * 0.2 + 8);
      ctx.stroke();
    }

    /* SRBs */
    const sA = alpha(2, stagesTotal);
    ctx.globalAlpha = sA;
    const sW = W * 0.075;
    const sH = H * 0.58;
    const sY = baseY - 20 - sH;
    const sOff = cW / 2 + 4;

    [cx - sOff - sW, cx + sOff].forEach((sx) => {
      const sg = ctx.createLinearGradient(sx, 0, sx + sW, 0);
      sg.addColorStop(0, '#1a1a2e');
      sg.addColorStop(0.5, '#2d2d50');
      sg.addColorStop(1, '#1a1a2e');
      ctx.fillStyle = sg;
      roundRect(ctx, sx, sY, sW, sH, 3);
      ctx.fill();
    });

    if (sA > 0.5) {
      ctx.fillStyle = 'rgba(244,237,228,0.6)';
      ctx.font = `${W * 0.018}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.globalAlpha = sA * 0.7;
      ctx.fillText('SRB ×2', cx - sOff - sW - 4, sY + sH * 0.25);
      ctx.fillText('Northrop Grumman', cx - sOff - sW - 4, sY + sH * 0.25 + 14);
      ctx.fillText('7.2M lbf total', cx - sOff - sW - 4, sY + sH * 0.25 + 28);
    }

    /* ICPS */
    const iA = alpha(3, stagesTotal);
    ctx.globalAlpha = iA;
    const icpsW = cW * 0.75;
    const icpsH = H * 0.1;
    const icpsY = cY - icpsH;
    ctx.fillStyle = '#243566';
    roundRect(ctx, cx - icpsW / 2, icpsY, icpsW, icpsH, 3);
    ctx.fill();
    if (iA > 0.5) {
      ctx.fillStyle = 'rgba(244,237,228,0.55)';
      ctx.font = `${W * 0.018}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.globalAlpha = iA * 0.7;
      ctx.fillText('ICPS / ULA', cx + icpsW / 2 + 6, icpsY + icpsH / 2 + 6);
    }

    /* OSA — stage adapter (tapers) */
    const osaA = alpha(4, stagesTotal);
    ctx.globalAlpha = osaA;
    const osaTopW = cW * 0.45;
    const osaH = H * 0.05;
    const osaY = icpsY - osaH;
    ctx.fillStyle = '#1e3058';
    ctx.beginPath();
    ctx.moveTo(cx - icpsW / 2, icpsY);
    ctx.lineTo(cx + icpsW / 2, icpsY);
    ctx.lineTo(cx + osaTopW / 2, osaY);
    ctx.lineTo(cx - osaTopW / 2, osaY);
    ctx.closePath();
    ctx.fill();

    /* Orion */
    const orionA = alpha(5, stagesTotal);
    ctx.globalAlpha = orionA;
    const oW = osaTopW;
    const oH = H * 0.14;
    const oY = osaY - oH;
    ctx.fillStyle = '#2a3f6e';
    roundRect(ctx, cx - oW / 2, oY, oW, oH, [6, 6, 0, 0]);
    ctx.fill();

    /* Orion cap */
    ctx.fillStyle = '#3a5280';
    ctx.beginPath();
    ctx.ellipse(cx, oY, oW / 2, oH * 0.2, 0, Math.PI, 0);
    ctx.fill();

    /* LAS escape tower */
    if (orionA > 0.4) {
      ctx.globalAlpha = orionA;
      ctx.fillStyle = '#8a9bb0';
      ctx.fillRect(cx - 3, oY - oH * 0.5, 6, oH * 0.5);
      if (orionA > 0.7) {
        ctx.fillStyle = 'rgba(244,237,228,0.65)';
        ctx.font = `${W * 0.02}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'left';
        ctx.globalAlpha = orionA * 0.8;
        ctx.fillText('Orion MPCV', cx + oW / 2 + 6, oY + oH * 0.4);
        ctx.fillText('Lockheed Martin', cx + oW / 2 + 6, oY + oH * 0.4 + 14);
        ctx.fillText('4 crew / 21 days', cx + oW / 2 + 6, oY + oH * 0.4 + 28);
      }
    }

    /* Height annotation */
    const totalA = Math.min(1, Math.max(0, (p - 0.8) / 0.2));
    if (totalA > 0) {
      ctx.globalAlpha = totalA * 0.5;
      ctx.strokeStyle = 'rgba(244,237,228,0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(20, oY - oH * 0.5);
      ctx.lineTo(20, baseY + 20);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(244,237,228,0.5)';
      ctx.font = `${W * 0.018}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.save();
      ctx.translate(14, (oY + baseY) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('322 ft total', 0, 0);
      ctx.restore();
    }

    ctx.globalAlpha = 1;
  }

  function roundRect(ctx, x, y, w, h, r) {
    if (typeof r === 'number') r = [r, r, r, r];
    ctx.beginPath();
    ctx.moveTo(x + r[0], y);
    ctx.arcTo(x + w, y, x + w, y + h, r[1]);
    ctx.arcTo(x + w, y + h, x, y + h, r[2]);
    ctx.arcTo(x, y + h, x, y, r[3]);
    ctx.arcTo(x, y, x + w, y, r[0]);
    ctx.closePath();
  }

  function init() {
    const canvas = document.getElementById('sls-canvas');
    if (!canvas) return;

    function resize() {
      const wrap = canvas.parentElement;
      const h = Math.min(window.innerHeight * 0.8, 680);
      const w = h * 0.45;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      drawSLS(canvas, currentProgress);
    }

    let currentProgress = 0;
    const stickyWrap = document.querySelector('.sls-sticky-wrap');
    if (!stickyWrap) return;

    const stageData = [
      { idx: 0, name: 'RS-25 Engines', contractor: 'Aerojet Rocketdyne', location: 'Canoga Park, CA', thrust: '418,000 lbf each', propellant: 'LH₂ / LOX', msfc: true },
      { idx: 1, name: 'Core Stage', contractor: 'Boeing', location: 'Michoud Assembly Facility, New Orleans', thrust: '1,600,000 lbf', propellant: 'LH₂ / LOX', msfc: true },
      { idx: 2, name: 'Solid Rocket Boosters ×2', contractor: 'Northrop Grumman', location: 'Promontory, UT', thrust: '3,600,000 lbf each', propellant: 'APCP Solid', msfc: false },
      { idx: 3, name: 'ICPS Upper Stage', contractor: 'United Launch Alliance', location: 'Decatur, AL', thrust: '22,890 lbf', propellant: 'LH₂ / LOX', msfc: false },
      { idx: 4, name: 'Orion Stage Adapter', contractor: 'Teledyne Brown Engineering', location: 'Huntsville, AL', thrust: 'Structural', propellant: 'N/A', msfc: false },
      { idx: 5, name: 'Orion MPCV', contractor: 'Lockheed Martin / ESA', location: 'Kennedy Space Center, FL', thrust: '6,000 lbf (OMS-E)', propellant: 'NTO / MMH', msfc: false },
    ];

    const panel = {
      counter: document.querySelector('.sls-section-counter'),
      name:    document.querySelector('.sls-stage-name'),
      contractor: document.querySelector('.sls-contractor'),
      specs:   document.querySelector('.sls-specs'),
      msfc:    document.querySelector('.msfc-badge'),
    };

    function updatePanel(p) {
      const stageIndex = Math.floor(p * stageData.length);
      const s = stageData[Math.min(stageIndex, stageData.length - 1)];
      if (!panel.name) return;
      panel.counter.textContent = `Stage ${s.idx + 1} of ${stageData.length}`;
      panel.name.textContent = s.name;
      panel.contractor.textContent = `${s.contractor} · ${s.location}`;
      panel.specs.innerHTML = `
        <div class="spec-row"><span class="spec-key">Thrust</span><span class="spec-val">${s.thrust}</span></div>
        <div class="spec-row"><span class="spec-key">Propellant</span><span class="spec-val">${s.propellant}</span></div>
      `;
      if (panel.msfc) {
        panel.msfc.style.opacity = s.msfc ? '1' : '0.2';
      }
    }

    function onScroll() {
      const rect = stickyWrap.getBoundingClientRect();
      const total = stickyWrap.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      currentProgress = Math.max(0, Math.min(1, scrolled / total));
      drawSLS(canvas, currentProgress);
      updatePanel(currentProgress);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    resize();
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
