
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const COLORS = {
    dot: "rgba(95, 180, 255, 0.55)",
    line: "rgba(95, 180, 255, 0.14)",
    mouseLine: "rgba(255, 180, 84, 0.4)",
    mouseDot: "rgba(255, 180, 84, 0.6)"
  };

  const LINK_DIST = 140;
  const MOUSE_DIST = 180;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let rafId = null;
  const mouse = { x: 0, y: 0, active: false };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const area = width * height;
    const count = Math.min(80, Math.max(24, Math.floor(area / 20000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 1
    }));
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);

    if (!prefersReducedMotion) {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      });
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.globalAlpha = 1 - dist / LINK_DIST;
          ctx.strokeStyle = COLORS.line;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    if (mouse.active) {
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          ctx.globalAlpha = 1 - dist / MOUSE_DIST;
          ctx.strokeStyle = COLORS.mouseLine;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
      ctx.fillStyle = COLORS.mouseDot;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Nodes on top
    ctx.globalAlpha = 1;
    ctx.fillStyle = COLORS.dot;
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function loop() {
    drawFrame();
    rafId = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  window.addEventListener(
    "touchmove",
    (e) => {
      if (!e.touches.length) return;
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    },
    { passive: true }
  );
  window.addEventListener("touchend", () => {
    mouse.active = false;
  });

  resize();

  if (prefersReducedMotion) {
    drawFrame();
  } else {
    loop();
  }
})();
