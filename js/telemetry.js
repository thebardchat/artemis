/* telemetry.js — live ticker strip */
(function () {
  const A1_SPLASHDOWN = new Date('2022-12-11T17:40:00Z');
  const A2_SPLASHDOWN = new Date('2026-04-10T00:07:00Z');

  function daysSince(d) {
    return Math.floor((Date.now() - d) / 86400000);
  }

  const STATIC_ITEMS = [
    () => `<span class="ok">ARTEMIS I</span><span class="sep">//</span>MISSION COMPLETE — ${daysSince(A1_SPLASHDOWN)} DAYS AGO`,
    () => `<span class="ok">ARTEMIS II</span><span class="sep">//</span>MISSION COMPLETE — SPLASHDOWN APRIL 10 2026 — ${daysSince(A2_SPLASHDOWN)}D AGO`,
    () => `<span class="ok">ARTEMIS II</span><span class="sep">//</span>DISTANCE RECORD: <span class="hi">406,771 KM</span> — FARTHEST HUMANS HAVE EVER TRAVELED`,
    () => `<span class="ok">ARTEMIS II</span><span class="sep">//</span>FIRST CREWED CISLUNAR FLIGHT SINCE APOLLO 17 — DEC 1972`,
    () => `<span class="ok">ARTEMIS II</span><span class="sep">//</span>CREW: WISEMAN <span class="sep">·</span> GLOVER <span class="sep">·</span> KOCH <span class="sep">·</span> HANSEN — APRIL 1–10 2026`,
    () => `<span class="hi">ARTEMIS III</span><span class="sep">//</span>NEXT MISSION — CREWED HLS DOCKING TEST — TARGET MID-2027`,
    () => `<span>SLS CORE STAGE</span><span class="sep">//</span>4× RS-25 <span class="hi">@ 512,000 LBF</span> VACUUM EACH`,
    () => `<span>ORION MPCV</span><span class="sep">//</span>CREW CAPACITY: 4 <span class="sep">·</span> ENDURANCE: <span class="hi">21 DAYS</span>`,
    () => `<span>MSFC HUNTSVILLE AL</span><span class="sep">//</span>HOME OF SATURN V <span class="sep">·</span> HOME OF SLS`,
    () => `<span>LUNAR GATEWAY</span><span class="sep">//</span>NRHO — 9:2 RESONANT ORBIT <span class="sep">·</span> HALO + PPE`,
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
