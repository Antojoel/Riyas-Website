"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

// Roboto Flex axis ranges. XTRA (counter width) is what makes the extremes
// read as hairline strokes / fat letters — wdth alone barely moves.
const WDTH = [25, 151];
const WGHT = [100, 1000];
const XTRA = [323, 603];
// Each letter animates one 0–1 intensity that drives all three axes;
// 0.5 is the medium state letters rest at and ease back to.
const REST = 0.5;
const LERP = 0.12;

/** Viewport-space pointer, written by the hero on pointermove. */
export type Pointer = { x: number; y: number; inside: boolean };

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

const mix = ([min, max]: number[], k: number) => min + (max - min) * k;

function variation(k: number) {
  return `"wdth" ${mix(WDTH, k).toFixed(1)}, "wght" ${mix(WGHT, k).toFixed(0)}, "XTRA" ${mix(XTRA, k).toFixed(0)}`;
}

export function ProximityName({
  name,
  pointer,
}: {
  name: string;
  pointer: RefObject<Pointer>;
}) {
  const letters = Array.from(name);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const h1 = h1Ref.current;
    // Full-width parent: its box doesn't move as the word changes width,
    // so letter centers measured against it stay valid.
    const frame = h1?.parentElement;
    if (!h1 || !frame) return;
    const spans = letterRefs.current.slice(0, letters.length) as HTMLSpanElement[];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const autoWave = window.matchMedia("(hover: none)").matches;

    const level = spans.map(() => REST);
    let centers: { x: number; y: number }[] = [];
    let radius = 200;

    // Measure at the rest state so the reference points don't depend on
    // whatever the animation is doing at that moment.
    function measure() {
      spans.forEach((el) => (el.style.fontVariationSettings = variation(REST)));
      const f = frame!.getBoundingClientRect();
      centers = spans.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - f.left, y: r.top + r.height / 2 - f.top };
      });
      radius = Math.max(140, h1!.getBoundingClientRect().width * 0.45);
      spans.forEach((el, i) => (el.style.fontVariationSettings = variation(level[i])));
    }

    measure();
    // Roboto Flex swaps in after first paint — remeasure with real metrics.
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(h1);

    const start = performance.now();
    let raf = requestAnimationFrame(tick);

    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      if (!visible || centers.length === 0) return;

      const f = frame!.getBoundingClientRect();
      let px: number;
      let py: number;
      let on: boolean;
      if (autoWave) {
        // Touch: a virtual cursor sweeps slowly back and forth across the word.
        const first = centers[0];
        const last = centers[centers.length - 1];
        const s = (Math.sin(((now - start) / 1000) * 0.6) + 1) / 2;
        px = first.x + (last.x - first.x) * s;
        py = first.y;
        on = true;
      } else {
        px = pointer.current.x - f.left;
        py = pointer.current.y - f.top;
        on = pointer.current.inside;
      }

      spans.forEach((el, i) => {
        const c = centers[i];
        // vertical distance counts less, so the wave tracks the cursor's x
        // anywhere in the hero instead of the whole word collapsing to
        // hairline (and shrinking) when the cursor is above/below it
        const dist = Math.hypot(px - c.x, (py - c.y) * 0.35);
        const target = on ? 1 - smoothstep(0, radius, dist) : REST;
        const next = level[i] + (target - level[i]) * LERP;
        if (Math.abs(next - level[i]) < 0.0005) return;
        level[i] = next;
        el.style.fontVariationSettings = variation(next);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [letters.length, pointer]);

  // Fluid size that shrinks for longer names so they never overflow.
  const len = Math.max(1, letters.length);
  const vw = Math.min(19, Math.max(7, 95 / len));
  const minRem = (2.75 * Math.min(1.6, 5 / len)).toFixed(2);

  return (
    <h1
      ref={h1Ref}
      aria-label={name}
      className="proximity-name flex select-none items-baseline gap-[0.08em] whitespace-nowrap leading-none text-paper"
      style={{ fontSize: `clamp(${minRem}rem, ${vw}vw, 14rem)` }}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          aria-hidden="true"
          className={char === " " ? "w-[0.25em]" : "inline-block"}
          style={{ fontVariationSettings: variation(REST) }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </h1>
  );
}
