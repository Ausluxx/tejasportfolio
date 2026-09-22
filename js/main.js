/* Tejas Garg — interaction layer.
   Dependency-free. Degrades to a fully readable static page without JS
   and collapses to static under prefers-reduced-motion. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ---------- page ready (hero load-in) ---------- */
  var done = false;
  function ready() { if (done) return; done = true; document.body.classList.add("ready"); }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(ready);
    setTimeout(ready, 1000); // never wait on a stalled font
  } else {
    requestAnimationFrame(ready);
  }

  /* ---------- nav ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (links && nav) {
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        if (burger) burger.setAttribute("aria-expanded", "false");
      });
    });
  }
  if (nav) {
    var nTick = false;
    var onScroll = function () {
      if (nTick) return;
      nTick = true;
      requestAnimationFrame(function () {
        nav.classList.toggle("solid", window.scrollY > 40);
        nTick = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- reveals ---------- */
  var revealEls = document.querySelectorAll(".rv, .rvi, .stag");
  if (reduce || !hasIO) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px 4% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- number count-up ---------- */
  var nums = document.querySelectorAll("[data-count]");
  function settle(el) {
    var d = parseInt(el.getAttribute("data-dec") || "0", 10);
    el.textContent = (el.getAttribute("data-prefix") || "") + parseFloat(el.getAttribute("data-count")).toFixed(d);
  }
  function count(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var pre = el.getAttribute("data-prefix") || "";
    var dur = 1400, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = pre + (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step); else settle(el);
    }
    requestAnimationFrame(step);
  }
  if (nums.length) {
    if (reduce || !hasIO) {
      nums.forEach(settle);
    } else {
      var nio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          count(e.target);
          nio.unobserve(e.target);
        });
      }, { threshold: 0.6 });
      nums.forEach(function (el) { nio.observe(el); });
    }
  }

  /* ---------- parallax on full-bleed photo breaks ---------- */
  var par = document.querySelectorAll("[data-parallax]");
  if (!reduce && par.length) {
    var pTick = false;
    var draw = function () {
      par.forEach(function (img) {
        var r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -120 || r.top > window.innerHeight + 120) return;
        var p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        img.style.transform = "translate3d(0," + ((p - 0.5) * 62).toFixed(1) + "px,0) scale(1.16)";
      });
      pTick = false;
    };
    window.addEventListener("scroll", function () {
      if (pTick) return; pTick = true; requestAnimationFrame(draw);
    }, { passive: true });
    window.addEventListener("resize", draw, { passive: true });
    draw();
  }

  /* ---------- cursor badge on project cards (pointer devices only) ---------- */
  var badge = document.getElementById("cursor");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (badge && fine && !reduce) {
    var cards = document.querySelectorAll("[data-cursor]");
    var x = 0, y = 0, cTick = false;
    var move = function (e) {
      x = e.clientX; y = e.clientY;
      if (cTick) return;
      cTick = true;
      requestAnimationFrame(function () {
        badge.style.transform = "translate(" + x + "px," + y + "px) translate(-50%,-50%)" + (badge.classList.contains("on") ? " scale(1)" : " scale(.7)");
        cTick = false;
      });
    };
    cards.forEach(function (c) {
      c.addEventListener("mouseenter", function () { badge.classList.add("on"); });
      c.addEventListener("mouseleave", function () { badge.classList.remove("on"); });
      c.addEventListener("mousemove", move);
    });
  }

  /* ---------- scrollytelling: the conclave photo opens as you scroll ---------- */
  var stories = document.querySelectorAll("[data-story]");
  if (stories.length) {
    if (reduce) {
      stories.forEach(function (st) {
        var f = st.querySelector(".story-frame");
        if (f) { f.style.setProperty("--w", "100%"); f.style.setProperty("--s", "1"); }
      });
    } else {
      var sTick = false;
      var drawStory = function () {
        stories.forEach(function (st) {
          var frame = st.querySelector(".story-frame");
          var pct = st.querySelector("[data-story-pct]");
          if (!frame) return;
          var r = st.getBoundingClientRect();
          var vh = window.innerHeight;
          if (r.bottom < -200 || r.top > vh + 200) return;
          // 0 when the band's top hits the bottom of the viewport, 1 once it is centred
          var raw = (vh - r.top) / (vh * 0.85 + r.height * 0.5);
          var p = Math.max(0, Math.min(1, raw));
          var eased = 1 - Math.pow(1 - p, 3);
          frame.style.setProperty("--w", (46 + eased * 54).toFixed(2) + "%");
          frame.style.setProperty("--s", (1.18 - eased * 0.18).toFixed(4));
          if (pct) pct.textContent = String(Math.round(eased * 100)).padStart(2, "0");
        });
        sTick = false;
      };
      window.addEventListener("scroll", function () {
        if (sTick) return; sTick = true; requestAnimationFrame(drawStory);
      }, { passive: true });
      window.addEventListener("resize", drawStory, { passive: true });
      drawStory();
    }
  }

})();
