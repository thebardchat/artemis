/* timeline.js — horizontal scroll mission timeline */
(function () {
  async function init() {
    const track = document.getElementById('timeline-track');
    if (!track) return;

    let missions;
    try {
      const res = await fetch('./data/missions.json');
      missions = await res.json();
    } catch (e) {
      track.innerHTML = '<p style="color:rgba(244,237,228,0.4);font-family:monospace;padding:20px">Timeline data unavailable.</p>';
      return;
    }

    track.innerHTML = missions.map((m) => {
      const year = m.date ? m.date.slice(0, 4) : '—';
      const crewHtml = m.crew
        ? `<div class="timeline-crew">${m.crew.join(' · ')}</div>`
        : '';
      return `
        <div class="timeline-card ${m.status}" tabindex="0" aria-label="${m.name}">
          <div class="timeline-node"></div>
          <div class="timeline-mission">${m.name}</div>
          <div class="timeline-title">${m.name}</div>
          <div class="timeline-date">${year} · ${m.destination || ''}</div>
          <p class="timeline-desc">${m.description}</p>
          ${crewHtml}
          <div style="margin-top:12px">
            <span class="mission-status ${m.status}">
              <span class="status-dot"></span>${m.status.toUpperCase()}
            </span>
          </div>
        </div>`;
    }).join('');

    /* Keyboard navigation */
    track.addEventListener('keydown', (e) => {
      const cards = [...track.querySelectorAll('.timeline-card')];
      const focused = document.activeElement;
      const idx = cards.indexOf(focused);
      if (idx === -1) return;
      if (e.key === 'ArrowRight' && idx < cards.length - 1) {
        cards[idx + 1].focus();
        cards[idx + 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        cards[idx - 1].focus();
        cards[idx - 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
