// ============================================
//  gallery.js — reusable screenshot lightbox
//  Call initGallery(images) after the .gallery-thumb elements
//  exist in the DOM. `images` is the array of full-size URLs
//  in display order (same order as the thumbnails).
// ============================================

function initGallery(images) {
  const overlay = document.getElementById("lightbox-overlay");
  const imgEl = document.getElementById("lightbox-img");
  const counterEl = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const thumbs = document.querySelectorAll(".gallery-thumb");

  if (!overlay || !imgEl || !thumbs.length) return;

  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + images.length) % images.length;
    imgEl.src = images[currentIndex];
    counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function open(index) {
    show(index);
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => open(i));
  });

  closeBtn?.addEventListener("click", close);
  prevBtn?.addEventListener("click", () => show(currentIndex - 1));
  nextBtn?.addEventListener("click", () => show(currentIndex + 1));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
}
