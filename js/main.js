/* main.js — scroll reveals, countdown, init */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCountdown();
  initNav();
});

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

function initCountdown() {
  const target = new Date('2025-09-01T00:00:00Z');
  const el = document.getElementById('countdown-value');
  const labelEl = document.getElementById('countdown-label');
  if (!el) return;

  function tick() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      el.textContent = 'LAUNCHED';
      if (labelEl) labelEl.textContent = 'ARTEMIS II — MISSION ACTIVE';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    el.textContent = `T-${pad(d)}D ${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  tick();
  setInterval(tick, 1000);
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(10,14,26,0.97)'
      : 'linear-gradient(to bottom, rgba(10,14,26,0.95), transparent)';
  }, { passive: true });
}
