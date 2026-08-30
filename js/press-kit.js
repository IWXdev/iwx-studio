document.addEventListener("DOMContentLoaded", () => {
  renderPressGamesTable();
  setupCopyBoilerplate();
});

function renderPressGamesTable() {
  const tbody = document.getElementById("press-games-table-body");
  if (!tbody || typeof PROJECTS === "undefined") return;

  tbody.innerHTML = PROJECTS.map((p) => `
    <tr>
      <td>${p.title}</td>
      <td>${STATUS_LABELS[p.status] || p.status}</td>
      <td>${p.platforms.map((pl) => PLATFORM_LABELS[pl] || pl).join(", ")}</td>
      <td>${p.links.play ? `<a href="${p.links.play}" target="_blank" rel="noopener noreferrer" style="color:var(--blue)">itch.io</a>` : "—"}</td>
    </tr>
  `).join("");
}

function setupCopyBoilerplate() {
  const btn = document.getElementById("copy-boilerplate");
  const box = document.getElementById("boilerplate-text");
  if (!btn || !box) return;

  btn.addEventListener("click", async () => {
    const text = box.textContent.replace(/^\s*copy\s*/i, "").trim();
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "copied!";
      btn.classList.add("is-copied");
    } catch {
      btn.textContent = "select & copy";
    }
    setTimeout(() => {
      btn.textContent = "copy";
      btn.classList.remove("is-copied");
    }, 2000);
  });
}
