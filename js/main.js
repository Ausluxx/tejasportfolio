// Tejas Garg portfolio — dependency-free interaction layer.
// Everything degrades to a fully readable static page without JS or with reduced motion.
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supportsIO = "IntersectionObserver" in window;

  /* ---------- Hero load-in ---------- */
  function markLoaded() { document.body.classList.add("loaded"); }
  if (document.fonts && document.fonts.ready) {
    // wait for webfonts so the display type doesn't animate then reflow
    var settled = false;
    document.fonts.ready.then(function () { if (!settled) { settled = true; markLoaded(); } });
    setTimeout(function () { if (!settled) { settled = true; markLoaded(); } }, 900);
  } else {
    requestAnimationFrame(markLoaded);
  }

  /* ---------- Nav ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (links && nav) {
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  if (nav) {
    var navTick = false;
    var onScrollNav = function () {
      if (navTick) return;
      navTick = true;
      requestAnimationFrame(function () {
        nav.classList.toggle("scrolled", window.scrollY > 12);
        navTick = false;
      });
    };
    window.addEventListener("scroll", onScrollNav, { passive: true });
    onScrollNav();
  }

  /* ---------- Scroll reveals ---------- */
  var revealSel = ".reveal, .reveal-img, .stagger";
  var revealEls = document.querySelectorAll(revealSel);

  if (reduce || !supportsIO) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
      // trigger just before the element enters, so clipped images are never
      // caught as empty boxes on a fast scroll
    }, { threshold: 0.06, rootMargin: "0px 0px 4% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Stat count-up ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function runCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var duration = 1300;
    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = prefix + (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toFixed(decimals);
    }
    requestAnimationFrame(frame);
  }
  if (counters.length) {
    if (reduce || !supportsIO) {
      counters.forEach(function (el) {
        var d = parseInt(el.getAttribute("data-decimals") || "0", 10);
        el.textContent = (el.getAttribute("data-prefix") || "") + parseFloat(el.getAttribute("data-count")).toFixed(d);
      });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          runCount(e.target);
          cio.unobserve(e.target);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---------- Parallax on full-bleed breaks ---------- */
  var parts = document.querySelectorAll("[data-parallax]");
  if (!reduce && parts.length) {
    var pTick = false;
    var applyParallax = function () {
      parts.forEach(function (img) {
        var host = img.parentElement;
        var r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
        var progress = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0..1
        var shift = (progress - 0.5) * 56;
        img.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0) scale(1.14)";
      });
      pTick = false;
    };
    window.addEventListener("scroll", function () {
      if (pTick) return;
      pTick = true;
      requestAnimationFrame(applyParallax);
    }, { passive: true });
    window.addEventListener("resize", applyParallax, { passive: true });
    applyParallax();
  }
})();
