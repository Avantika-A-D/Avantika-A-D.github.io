// ── Theme toggle ─────────────────────────────────────────────
const toggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") document.body.classList.add("light");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

// ── Mobile hamburger ──────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu on nav link click
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ── Scroll to top ─────────────────────────────────────────────
const scrollBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollBtn.classList.toggle("visible", window.scrollY > 400);
});
scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      // Stagger siblings slightly
      const siblings = [...(entry.target.parentElement?.querySelectorAll(".reveal:not(.visible)") || [])];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.min(idx * 0.07, 0.3)}s`;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("visible"));
}

// ── Hero entrance on load ─────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => {
      el.style.transitionDelay = "0s";
      el.classList.add("visible");
    }, 80 + i * 130);
  });
});

// ── Active nav link on scroll ─────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => navObserver.observe(s));
}
