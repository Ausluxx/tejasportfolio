/* Tejas Garg — interaction layer.
   Dependency-free. The page is complete without it; this adds the engraved
   linework, verification highlights and one-time reveals, and stands down
   entirely under prefers-reduced-motion. */
(function () {
  "use strict";

  var doc = document;
  window.__tg = true;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;
  var SVGNS = "http://www.w3.org/2000/svg";

  /* ---------- ready ---------- */
  var readied = false;
  function ready() { if (readied) return; readied = true; doc.body.classList.add("ready"); }
  if (doc.fonts && doc.fonts.ready) { doc.fonts.ready.then(ready); setTimeout(ready, 900); }
  else { requestAnimationFrame(ready); }

  /* ---------- nav ---------- */
  var nav = doc.getElementById("nav");
  var burger = doc.getElementById("burger");
  var links = doc.getElementById("navLinks");

  function setMenu(open) {
    if (!nav || !burger) return;
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  if (links) links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  if (nav) {
    var tick = false;
    var onScroll = function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () { nav.classList.toggle("scrolled", window.scrollY > 8); tick = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* current section in the nav */
  if (hasIO && links) {
    var navAnchors = [].slice.call(links.querySelectorAll('a[href^="#"]'));
    var sections = navAnchors.map(function (a) { return doc.querySelector(a.getAttribute("href")); }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function (a) {
          if (a.getAttribute("href") === "#" + en.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- microtext: fill the line with repeats ---------- */
  [].forEach.call(doc.querySelectorAll("[data-micro]"), function (span) {
    var unit = span.textContent;
    span.textContent = new Array(40).join(unit);
  });

  /* ---------- guilloché ---------- */
  function strokeGradient(svg, id, a, b, vertical) {
    var defs = doc.createElementNS(SVGNS, "defs");
    var g = doc.createElementNS(SVGNS, "linearGradient");
    g.setAttribute("id", id);
    g.setAttribute("x1", "0"); g.setAttribute("y1", "0");
    g.setAttribute("x2", vertical ? "0" : "1"); g.setAttribute("y2", vertical ? "1" : "0");
    [[0, a], [1, b]].forEach(function (s) {
      var st = doc.createElementNS(SVGNS, "stop");
      st.setAttribute("offset", s[0]); st.setAttribute("stop-color", s[1]);
      g.appendChild(st);
    });
    defs.appendChild(g); svg.appendChild(defs);
    return "url(#" + id + ")";
  }
  function addPath(svg, d, stroke, opacity) {
    var p = doc.createElementNS(SVGNS, "path");
    p.setAttribute("d", d); p.setAttribute("stroke", stroke);
    if (opacity) p.setAttribute("stroke-opacity", opacity);
    svg.appendChild(p);
    return p;
  }

  /* an elliptical band of interlaced strands around the portrait */
  function drawRing(svg) {
    var W = 500, H = 600, cx = W / 2, cy = H / 2;
    var rx = 208, ry = 262;           // mid-line of the band
    var strands = 14, steps = 900, lobes = 36;
    var paint = strokeGradient(svg, "gr-ring", "#8fb09c", "#a99bd0", true);
    var out = [];
    for (var s = 0; s < strands; s++) {
      var ph = (s / strands) * Math.PI * 2;
      var d = "";
      for (var i = 0; i <= steps; i++) {
        var t = (i / steps) * Math.PI * 2;
        var w = 13 * Math.sin(lobes * t + ph) + 5 * Math.sin((lobes / 3) * t - ph * 2);
        var x = cx + (rx + w) * Math.cos(t);
        var y = cy + (ry + w * 1.15) * Math.sin(t);
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      out.push(addPath(svg, d + "Z", paint, s % 2 ? "0.55" : "0.95"));
    }
    return out;
  }

  /* a horizontal band: the same strand maths laid flat */
  function drawBand(svg) {
    var W = 1200, H = 70, mid = H / 2, strands = 10, steps = 600;
    var paint = strokeGradient(svg, "gr-band", "#a8d5bd", "#c4b8ec", false);
    var out = [];
    for (var s = 0; s < strands; s++) {
      var ph = (s / strands) * Math.PI * 2;
      var d = "";
      for (var i = 0; i <= steps; i++) {
        var x = (i / steps) * W;
        var t = (i / steps) * Math.PI * 2;
        var y = mid + 22 * Math.sin(9 * t + ph) * Math.cos(2 * t - ph / 2) + 6 * Math.sin(27 * t - ph);
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      out.push(addPath(svg, d, paint, s % 2 ? "0.45" : "0.85"));
    }
    return out;
  }

  function engrave(paths, delay) {
    if (reduce) return;
    paths.forEach(function (p, i) {
      var len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.getBoundingClientRect();
      p.style.transition = "stroke-dashoffset 2.4s cubic-bezier(0.16, 1, 0.3, 1) " + (delay + i * 0.05) + "s";
      requestAnimationFrame(function () { p.style.strokeDashoffset = "0"; });
    });
  }

  [].forEach.call(doc.querySelectorAll('[data-g="ring"]'), function (svg) { engrave(drawRing(svg), 0.1); });
  function engraveOnView(svg, paths) {
    if (reduce || !hasIO) return;
    paths.forEach(function (p) { var l = p.getTotalLength(); p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
    var o = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      o.disconnect();
      paths.forEach(function (p, i) {
        p.style.transition = "stroke-dashoffset 2.4s cubic-bezier(0.16, 1, 0.3, 1) " + (i * 0.04) + "s";
        p.style.strokeDashoffset = "0";
      });
    }, { threshold: 0.2 });
    o.observe(svg);
  }
  /* run fn once, when el comes within reach of the viewport */
  function whenNear(el, fn) {
    if (!hasIO) { fn(); return; }
    var o = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      o.disconnect(); fn();
    }, { rootMargin: "600px 0px" });
    o.observe(el);
  }

  /* the underprint: the band maths repeated down the ledger at hairline weight,
     faint enough that every figure and label keeps its contrast */
  [].forEach.call(doc.querySelectorAll('[data-g="underprint"]'), function (svg) { whenNear(svg, function () {
    var W = 1200, H = 600, rows = 22, steps = 500;
    var paint = strokeGradient(svg, "gr-under", "#8fb09c", "#a99bd0", false);
    for (var r = 0; r < rows; r++) {
      var base = (r + 0.5) * (H / rows), ph = r * 0.9, d = "";
      for (var i = 0; i <= steps; i++) {
        var x = (i / steps) * W, t = (i / steps) * Math.PI * 2;
        var y = base + 9 * Math.sin(7 * t + ph) + 4 * Math.sin(19 * t - ph * 1.7);
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      addPath(svg, d, paint, "0.26");
    }
  }); });

  [].forEach.call(doc.querySelectorAll('[data-g="band"]'), function (svg) { whenNear(svg, function () {
    var paths = drawBand(svg);
    if (reduce || !hasIO) return;
    paths.forEach(function (p) { var l = p.getTotalLength(); p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
    var o = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      o.disconnect();
      paths.forEach(function (p, i) {
        p.style.transition = "stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1) " + (i * 0.06) + "s";
        p.style.strokeDashoffset = "0";
      });
    }, { threshold: 0.2 });
    o.observe(svg);
  }); });


  /* ---------- the portrait is printed ----------
     Ordered (Bayer 8x8) dithering is how a press turns a photograph into
     ink: dots where the image is dark, paper where it is light. On load the
     portrait builds up as dithered ink, cell by cell, then the photograph
     itself comes through. Once, about a second, never under reduced motion,
     and the photo is simply there without JavaScript. */
  function printPortrait() {
    var fig = doc.querySelector(".vignette");
    if (!fig || reduce || !window.HTMLCanvasElement) return;
    var src = fig.querySelector(".cut-in img");
    var cuts = fig.querySelectorAll(".cut");
    if (!src || !cuts.length) return;

    var canvases = [].map.call(cuts, function (cut) {
      var cv = doc.createElement("canvas");
      cv.className = "cut-dither"; cv.setAttribute("aria-hidden", "true");
      cut.appendChild(cv);
      return cv;
    });
    fig.classList.add("printing");

    var finished = false;
    function done() {
      if (finished) return; finished = true;
      fig.classList.add("printed");
      setTimeout(function () {
        canvases.forEach(function (c) { c.remove(); });
        fig.classList.remove("printing", "printed");
      }, 700);
    }
    setTimeout(done, 4000); /* never leave the portrait hidden */

    var BAYER = [0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,
                 3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21];

    function start() {
      var box = canvases[0].getBoundingClientRect();
      if (!box.width || !src.naturalWidth) { done(); return; }
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = Math.round(box.width * dpr), H = Math.round(box.height * dpr);
      var cols = box.width < 360 ? 88 : 124;
      var rows = Math.round(cols * src.naturalHeight / src.naturalWidth);
      var off = doc.createElement("canvas"); off.width = cols; off.height = rows;
      var octx = off.getContext("2d", { willReadFrequently: true });
      octx.drawImage(src, 0, 0, cols, rows);
      var px;
      try { px = octx.getImageData(0, 0, cols, rows).data; } catch (e) { done(); return; }

      var n = cols * rows, cells = [];
      for (var i = 0; i < n; i++) {
        if (px[i * 4 + 3] < 128) continue;
        var r = (i / cols) | 0, c = i % cols;
        var lum = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255;
        if (lum * 1.1 >= (BAYER[(r % 8) * 8 + (c % 8)] + 0.5) / 64) continue; /* paper, not ink */
        var h = Math.sin(i * 12.9898) * 43758.5453; h -= Math.floor(h);
        cells.push(c, r, 0.62 * (r / rows) + 0.12 * (c / cols) + 0.18 * h);
      }
      canvases.forEach(function (cv) { cv.width = W; cv.height = H; });
      var ctx = canvases[0].getContext("2d");
      var cw = W / cols, ch = H / rows, dot = Math.max(1, Math.min(cw, ch) * 0.86);
      var DUR = 1000, CELL = 0.12, SPAN = 0.92 + CELL, t0 = null;
      ctx.fillStyle = "#10231c";

      function frame(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / DUR, 1) * SPAN;
        ctx.clearRect(0, 0, W, H);
        for (var k = 0; k < cells.length; k += 3) {
          var d = cells[k + 2];
          if (p <= d) continue;
          var g = Math.min(1, (p - d) / CELL), sz = dot * (0.35 + 0.65 * g);
          ctx.fillRect(cells[k] * cw + (cw - sz) / 2, cells[k + 1] * ch + (ch - sz) / 2, sz, sz);
        }
        for (var m = 1; m < canvases.length; m++) {
          var c2 = canvases[m].getContext("2d");
          c2.clearRect(0, 0, W, H); c2.drawImage(canvases[0], 0, 0);
        }
        if (ts - t0 < DUR) requestAnimationFrame(frame); else setTimeout(done, 120);
      }
      requestAnimationFrame(frame);
    }
    (src.decode ? src.decode() : Promise.resolve()).then(start, done);
  }
  printPortrait();

  /* ---------- verification: footnote marks <-> notes ---------- */
  function linkNotes(sel) {
    [].forEach.call(doc.querySelectorAll(sel), function (el) {
      var id = el.getAttribute("data-note");
      var pair = [].slice.call(doc.querySelectorAll('[data-note="' + id + '"]'));
      var on = function () { pair.forEach(function (x) { x.classList.add("lit"); }); };
      var off = function () { pair.forEach(function (x) { x.classList.remove("lit"); }); };
      el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off);
      el.addEventListener("focus", on); el.addEventListener("blur", off);
    });
  }
  linkNotes(".fn[data-note], .notes [data-note]");

  /* ---------- council timeline: positions from real dates ---------- */
  function months(ym) {
    if (ym === "now") { var d = new Date(); return d.getFullYear() * 12 + d.getMonth() + (d.getDate() - 1) / 30; }
    var p = ym.split("-"); return +p[0] * 12 + (+p[1] - 1);
  }
  [].forEach.call(doc.querySelectorAll(".gantt[data-from]"), function (g) {
    var from = months(g.getAttribute("data-from"));
    var to = Math.max(months(g.getAttribute("data-to")), months("now") + 3);
    var span = to - from;
    var pos = function (m) { return Math.max(0, Math.min(1, (m - from) / span)); };
    [].forEach.call(g.querySelectorAll(".gantt-bar"), function (b) {
      b.style.setProperty("--s", pos(months(b.getAttribute("data-start"))).toFixed(4));
      b.style.setProperty("--e", pos(months(b.getAttribute("data-end"))).toFixed(4));
    });
    var now = g.querySelector(".gantt-now");
    if (now) now.style.setProperty("--now", pos(months("now")).toFixed(4));
    var ticks = g.querySelectorAll(".gantt-ticks > span");
    var labels = ["2025-03", "2025-09", "2026-03", "2026-09"];
    [].forEach.call(ticks, function (t, i) { if (labels[i]) t.style.setProperty("--at", pos(months(labels[i])).toFixed(4)); });
  });

  /* ---------- reveals ---------- */
  var rv = doc.querySelectorAll(".rv, .bars, .gantt, .ruled");
  if (reduce || !hasIO) { [].forEach.call(rv, function (el) { el.classList.add("in"); }); }
  else {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (!e.isIntersecting) return; e.target.classList.add("in"); io.unobserve(e.target); });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    [].forEach.call(rv, function (el) { io.observe(el); });
  }
})();
