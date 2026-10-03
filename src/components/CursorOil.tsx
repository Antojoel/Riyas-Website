"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { Pointer } from "./ProximityName";

// Metaball "oil spill": ellipses drawn through a blur + alpha-threshold
// filter melt into one hard-edged liquid shape. Every part is a damped
// spring chasing the cursor, so the blob has inertia: it lags, overshoots
// and jiggles, stretches along its direction of travel, and the loosely
// tethered droplets get flung out behind it then slingshot back.
// [radius, stiffness, damping, orbit distance, orbit speed, phase] (1x px)
const PARTS: [number, number, number, number, number, number][] = [
  [86, 70, 11, 0, 0, 0], // main body — heavy, slightly underdamped
  [58, 48, 7, 46, 0.7, 0],
  [50, 38, 6, 58, -0.55, 2.1],
  [40, 30, 5, 80, 0.4, 4.2],
  [17, 22, 3.2, 150, 0.5, 0.6], // droplets — light, bouncy
  [12, 17, 2.6, 190, -0.42, 1.9],
  [9, 26, 3, 130, 0.9, 3.4],
  [14, 12, 2.2, 220, 0.33, 5.1],
  [7, 20, 2.6, 175, -0.7, 2.7],
  [5, 14, 2, 240, 0.5, 4.6],
];

export function CursorOil({ pointer }: { pointer: RefObject<Pointer> }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const blobs = useRef<(SVGEllipseElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = PARTS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));
    let wasInside = false;
    let last = performance.now();
    let raf = 0;

    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const p = pointer.current;
      svg!.style.opacity = p.inside ? "1" : "0";
      if (!p.inside) {
        wasInside = false;
        return;
      }
      const box = svg!.getBoundingClientRect();
      const px = p.x - box.left;
      const py = p.y - box.top;
      const k = Math.min(1.25, Math.max(0.7, Math.min(box.width, box.height) / 850));
      const t = still ? 0 : now / 1000;
      const steps = 3;
      const h = dt / steps;

      PARTS.forEach(([r, stiff, damp, orbit, speed, phase], i) => {
        const s = st[i];
        const a = t * speed + phase;
        const tx = px + Math.cos(a) * orbit * k + Math.sin(a * 2.3) * orbit * 0.12 * k;
        const ty = py + Math.sin(a) * orbit * 0.8 * k + Math.cos(a * 1.7) * orbit * 0.1 * k;
        if (!wasInside) {
          s.x = tx;
          s.y = ty;
          s.vx = s.vy = 0;
        } else {
          for (let n = 0; n < steps; n++) {
            s.vx += ((tx - s.x) * stiff - s.vx * damp) * h;
            s.vy += ((ty - s.y) * stiff - s.vy * damp) * h;
            s.x += s.vx * h;
            s.y += s.vy * h;
          }
        }

        const el = blobs.current[i];
        if (!el) return;
        // stretch along the direction of travel, squash across it
        const sp = Math.hypot(s.vx, s.vy);
        const e = Math.min(0.75, sp / 1800);
        const base = r * k * (1 + Math.sin(t * 1.3 + phase) * 0.05);
        const ang = (Math.atan2(s.vy, s.vx) * 180) / Math.PI;
        el.setAttribute("cx", s.x.toFixed(1));
        el.setAttribute("cy", s.y.toFixed(1));
        el.setAttribute("rx", (base * (1 + e)).toFixed(1));
        el.setAttribute("ry", (base / (1 + e * 0.8)).toFixed(1));
        el.setAttribute("transform", `rotate(${ang.toFixed(0)} ${s.x.toFixed(1)} ${s.y.toFixed(1)})`);
      });
      wasInside = true;
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pointer]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-500"
    >
      <defs>
        <filter id="oil-goo" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12"
          />
        </filter>
        <radialGradient id="oil-fill" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ff6a3d" />
          <stop offset="45%" stopColor="#e2000f" />
          <stop offset="100%" stopColor="#8a000a" />
        </radialGradient>
      </defs>
      <g filter="url(#oil-goo)" fill="url(#oil-fill)">
        {PARTS.map((_, i) => (
          <ellipse
            key={i}
            ref={(el) => {
              blobs.current[i] = el;
            }}
            rx="0"
            ry="0"
          />
        ))}
      </g>
    </svg>
  );
}
