// ============================================
//  main.js — Home & Games listing pages
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  renderGamesGrid();
  renderDevlogs();
  initVideoPreviews();
});

/* ---------- شارات المنصات (Platform badges) ---------- */
/* PLATFORM_ICONS is now shared — see js/platform-icons.js */

function renderPlatformBadges(platforms) {
  return `<div class="platform-badges">${platforms
    .map(
      (pl) =>
        `<span class="platform-badge">${PLATFORM_ICONS[pl] || ""}${PLATFORM_LABELS[pl] || pl}</span>`
    )
    .join("")}</div>`;
}

/* ---------- بناء بطاقات المشاريع (Home + Games) ---------- */
function renderGamesGrid() {
  const grid = document.getElementById("games-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="proj-card" style="--delay:${i * 60}ms">
      <a href="${p.page}" class="proj-card__thumb" data-youtube-id="${p.youtubeId || ""}">
        <img src="${p.thumbnail}" alt="${p.title}" loading="lazy" />
        <span class="proj-card__status proj-card__status--${p.status}">
          ${STATUS_LABELS[p.status] || p.status}
        </span>
      </a>
      <div class="proj-card__body">
        <div class="proj-card__meta">
          <span class="mono">${p.year}</span>
        </div>
        <h3 class="proj-card__title"><a href="${p.page}">${p.title}</a></h3>
        <p class="proj-card__tagline">${p.tagline}</p>
        ${renderPlatformBadges(p.platforms)}
        <div class="proj-card__tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <a href="${p.page}" class="proj-card__open">
        View game <span class="arrow">→</span>
      </a>
    </article>
  `).join("");
}

/* ---------- feed التحديثات (Devlog) — homepage only ---------- */
function renderDevlogs() {
  const feed = document.getElementById("devlog-feed");
  if (!feed || typeof DEVLOGS === "undefined") return;

  const formatDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  feed.innerHTML = DEVLOGS.map((log, i) => `
    <div class="log-line" style="--delay:${i * 50}ms">
      <span class="log-line__prompt">&gt;</span>
      <div class="log-line__body">
        <div class="log-line__meta">
          <span class="mono log-line__date">${formatDate(log.date)}</span>
          <span class="dot">•</span>
          <span class="tag tag--log">${log.project}</span>
        </div>
        <p class="log-line__entry">
          ${log.entry}
          ${log.link ? `<a href="${log.link}" target="_blank" rel="noopener noreferrer" class="log-line__link">view →</a>` : ""}
        </p>
      </div>
    </div>
  `).join("") + `<div class="log-cursor"><span class="mono">&gt;</span><span class="log-cursor__blink"></span></div>`;
}

/* ---------- Hover video preview على بطاقات الألعاب ---------- */
/* يشتغل غير بالماوس (desktop). على الموبايل ماكاينش hover حقيقي،
   فالبطاقة كتبقى صورة ثابتة والضغط عليها كيوديك لصفحة اللعبة مباشرة. */
function initVideoPreviews() {
  const thumbs = document.querySelectorAll(".proj-card__thumb[data-youtube-id]");

  thumbs.forEach((thumb) => {
    const videoId = thumb.dataset.youtubeId;
    if (!videoId) return; // no video yet for this game — stays a static thumbnail

    let iframe = null;
    let hoverTimer = null;

    thumb.addEventListener("mouseenter", () => {
      // small delay so quick mouse-overs while scrolling don't trigger a load
      hoverTimer = setTimeout(() => {
        if (iframe) return;
        iframe = document.createElement("iframe");
        iframe.className = "card-video-preview";
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; encrypted-media");
        iframe.setAttribute("tabindex", "-1");
        iframe.setAttribute("aria-hidden", "true");
        thumb.appendChild(iframe);
      }, 200);
    });

    thumb.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      if (iframe) {
        iframe.remove(); // destroying the iframe stops playback
        iframe = null;
      }
    });
  });
}
