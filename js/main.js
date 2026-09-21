// Tejas Garg portfolio — minimal, dependency-free interactions.
(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (links) {
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Scroll reveal ---
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // --- Subtle parallax on full-bleed break images ---
  var parts = document.querySelectorAll("[data-parallax]");
  if (!reduce && parts.length) {
    var ticking = false;
    var apply = function () {
      parts.forEach(function (img) {
        var r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        var shift = (progress - 0.5) * 60; // px
        img.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0) scale(1.12)";
      });
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });
    apply();
  }
})();
