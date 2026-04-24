/* telemetry.js — live ticker strip */
(function () {
  const A1_SPLASHDOWN = new Date('2022-12-11T17:40:00Z');
  const A2_TARGET     = new Date('2026-09-01T00:00:00Z'); // estimated — verify at nasa.gov

  function daysSince(d) {
    return Math.floor((Date.now() - d) / 86400000);
  }

  function daysUntil(d) {
    return Math.floor((d - Date.now()) / 86400000);
  }

  const STATIC_ITEMS = [
    () => `<span class="ok">ARTEMIS I</span><span class="sep">//</span>MISSION COMPLETE — ${daysSince(A1_SPLASHDOWN)} DAYS AGO`,
    () => { const d = daysUntil(A2_TARGET); return `<span class="hi">ARTEMIS II</span><span class="sep">//</span>CREWED LUNAR FLYBY — ${d > 0 ? `T-${d}D` : 'DATE TBD'} — VERIFY NASA.GOV`; },
    () => `<span>SLS CORE STAGE</span><span class="sep">//</span>4× RS-25 <span class="hi">@ 512,000 LBF</span> VACUUM EACH`,
    () => `<span>ORION MPCV</span><span class="sep">//</span>CREW CAPACITY: 4 <span class="sep">·</span> ENDURANCE: <span class="hi">21 DAYS</span>`,
    () => `<span>MSFC HUNTSVILLE AL</span><span class="sep">//</span>HOME OF SATURN V <span class="sep">·</span> HOME OF SLS`,
    () => `<span>LUNAR GATEWAY</span><span class="sep">//</span>NRHO — 9:2 RESONANT ORBIT <span class="sep">·</span> HALO + PPE`,
    () => `<span class="hi">ARTEMIS III</span><span class="sep">//</span>FIRST WOMAN + FIRST POC ON THE MOON <span class="sep">·</span> STARSHIP HLS`,
    () => `<span>ORION HEAT SHIELD</span><span class="sep">//</span>5M DIAMETER — LARGEST EVER FLOWN`,
    () => `<span>SRBs</span><span class="sep">//</span>7,200,000 LBF TOTAL — 5-SEGMENT APCP SOLID`,
    () => `<span>ARTEMIS</span><span class="sep">//</span>WE ARE GOING <span class="sep">·</span> BUILT IN HUNTSVILLE <span class="sep">·</span> BOUND FOR THE MOON`,
  ];

  function buildTicker() {
    const strip = document.getElementById('telemetry-strip');
    if (!strip) return;

    const inner = strip.querySelector('.ticker-inner') || document.createElement('div');
    inner.className = 'ticker-inner';

    const items = STATIC_ITEMS.map((fn) => fn());
    const html = [...items, ...items]
      .map((txt) => `<span class="ticker-item">${txt}<span class="sep"> ◆ </span></span>`)
      .join('');

    inner.innerHTML = html;
    strip.innerHTML = '';
    strip.appendChild(inner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTicker);
  } else {
    buildTicker();
  }
})();
