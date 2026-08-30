// ============================================
//  site.js — shared across every page
//  (clock, scroll-spy nav highlighting, mobile menu)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  setupClock();
  setupNav();
  setupMobileNav();
});

/* ---------- ساعة صغيرة فالـ status bar ---------- */
function setupClock() {
  const clockEl = document.getElementById("status-clock");
  if (!clockEl) return;
  const update = () => {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  update();
  setInterval(update, 30000);
}

/* ---------- تمييز رابط التنقل الحالي عند التمرير (homepage only) ---------- */
function setupNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---------- قائمة الموبايل ---------- */
function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}
