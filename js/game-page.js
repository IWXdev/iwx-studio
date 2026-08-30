// ============================================
//  game-page.js — renders a full game detail page
//  from PROJECTS, matched by the page's data-project-id (slug).
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("game-detail");
  if (!container || typeof PROJECTS === "undefined") return;

  const slug = container.dataset.projectId;
  const p = PROJECTS.find((proj) => proj.slug === slug);
  if (!p) {
    container.innerHTML = `<p class="lead">Game not found.</p>`;
    return;
  }

  document.title = `${p.title} — IWX Studio`;

  // PLATFORM_ICONS is now shared — see js/platform-icons.js

  const platformBadges = p.platforms
    .map(
      (pl) =>
        `<span class="platform-badge">${PLATFORM_ICONS[pl] || ""}${PLATFORM_LABELS[pl] || pl}</span>`
    )
    .join("");

  // Prefer the gameplay video for the hero banner, but fall back to the
  // static thumbnail when there's no video yet, the user prefers reduced
  // motion, or their browser is in data-saver mode.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const useVideo = Boolean(p.youtubeId) && !prefersReducedMotion && !saveData;

  const heroMediaHTML = useVideo
    ? `
    <div class="video-hero">
      <iframe
        class="video-hero__frame"
        src="https://www.youtube-nocookie.com/embed/${p.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${p.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        aria-hidden="true"
        tabindex="-1"
      ></iframe>
      <div class="video-hero__overlay"></div>
    </div>`
    : `
    <div class="game-hero-media">
      <img src="../${p.thumbnail}" alt="${p.title}" />
    </div>`;

  container.innerHTML = `
    ${heroMediaHTML}

    <div class="game-detail-grid">
      <div>
        <div class="game-meta-row">
          <span class="proj-card__status proj-card__status--${p.status}">${STATUS_LABELS[p.status] || p.status}</span>
          <span class="dot">•</span>
          <span class="mono">${p.year}</span>
        </div>
        <h1>${p.title}</h1>
        <p class="page-hero__tagline lead" style="margin-block:12px 20px">${p.tagline}</p>
        <div class="proj-card__tags" style="margin-bottom:22px">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <p class="description">${p.description}</p>
      </div>

      <aside class="game-sidebar">
        <div class="platform-badges">${platformBadges}</div>
        ${p.links.play ? `<a href="${p.links.play}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">Play / Download</a>` : `<span class="tag" style="justify-content:center;padding:10px">Not yet available</span>`}
        ${p.links.source ? `<a href="${p.links.source}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">Source Code</a>` : ""}
        <a href="../games.html" class="btn btn--ghost">← Back to all games</a>
      </aside>
    </div>
  `;

  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid) {
    galleryGrid.innerHTML = p.screenshots
      .map(
        (src, i) => `
      <div class="gallery-thumb" data-index="${i}">
        <img src="../${src}" alt="${p.title} screenshot ${i + 1}" loading="lazy" />
      </div>`
      )
      .join("");

    initGallery(p.screenshots.map((src) => `../${src}`));
  }
});
