"use client";

import { useEffect, useRef } from "react";

/**
 * Constellation — the signature hero artifact of the merged system.
 * A drifting scatter of particles forming an ascending trend (a scatter
 * plot read as a night sky), with hairline constellation links and a few
 * ember/amber sparks. Plain canvas 2D in one rAF loop; no React state.
 * Collapses to a static frame under prefers-reduced-motion.
 */
export default function Constellation({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let raf = 0;

    type P = {
      bx: number; // base position (0..1)
      by: number;
      r: number;
      ember: boolean;
      amp: number; // drift amplitude px
      spd: number;
      ph: number; // phase
      x: number;
      y: number;
    };

    // Deterministic PRNG so the composition is stable between reloads.
    let seed = 20260719;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    // Ascending scatter: x uniform, y regresses upward with noise.
    const N = 64;
    const pts: P[] = [];
    for (let i = 0; i < N; i++) {
      const bx = rnd();
      const noise = (rnd() - 0.5) * 0.55;
      const by = 0.82 - bx * 0.6 + noise * (1 - bx * 0.35);
      pts.push({
        bx,
        by: Math.min(0.96, Math.max(0.04, by)),
        r: 1 + rnd() * 1.8,
        ember: rnd() < 0.12,
        amp: 4 + rnd() * 9,
        spd: 0.00012 + rnd() * 0.00022,
        ph: rnd() * Math.PI * 2,
        x: 0,
        y: 0,
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const LINK_DIST = 110;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        const drift = reduce ? 0 : 1;
        p.x = p.bx * w + Math.sin(t * p.spd + p.ph) * p.amp * drift;
        p.y = p.by * h + Math.cos(t * p.spd * 1.3 + p.ph) * p.amp * 0.7 * drift;
      }

      // Constellation links — hairlines between near neighbours
      ctx.lineWidth = 0.5;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = 0.14 * (1 - Math.sqrt(d2) / LINK_DIST);
            ctx.strokeStyle = `rgba(247,245,240,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of pts) {
        if (p.ember) {
          ctx.fillStyle = "rgba(232,161,60,0.9)";
          ctx.shadowColor = "rgba(232,161,60,0.55)";
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = "rgba(247,245,240,0.75)";
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    if (reduce) {
      draw(0);
    } else {
      const loop = (t: number) => {
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
}
