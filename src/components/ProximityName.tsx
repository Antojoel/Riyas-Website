"use client";

import { useEffect, useRef } from "react";

// Roboto Flex's real variable-font axis ranges.
const WDTH_MIN = 25;
const WDTH_MAX = 151;
const WGHT_MIN = 100;
const WGHT_MAX = 1000;
// Resting state the letters ease back to when the cursor isn't nearby.
const WDTH_REST = 118;
const WGHT_REST = 460;
const LERP = 0.12;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function ProximityName({
  name,
  active,
  mousePos,
  className = "",
}: {
  name: string;
  active: boolean;
  /** Viewport-space cursor position, read every animation frame (a ref so
   *  mouse movement never triggers a React re-render). */
  mousePos: React.RefObject<{ x: number; y: number }>;
  className?: string;
}) {
  const letters = name.split("");
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const centers = useRef<{ x: number; y: number }[]>([]);
  const current = useRef<{ wdth: number; wght: number }[]>(
    letters.map(() => ({ wdth: WDTH_REST, wght: WGHT_REST }))
  );
  const radius = useRef(260);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const noHover = window.matchMedia("(hover: none)").matches;

    function measure() {
      // Lock each letter's box to its own resting-state width first, so
      // later font-variation changes grow/shrink the glyph in place
      // instead of shifting every letter after it.
      letterRefs.current.forEach((el) => {
        if (el) el.style.width = "auto";
      });
      const widths = letterRefs.current.map((el) => el?.getBoundingClientRect().width ?? 0);
      letterRefs.current.forEach((el, i) => {
        if (el) el.style.width = `${widths[i]}px`;
      });
      centers.current = letterRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      radius.current = Math.max(160, window.innerWidth * 0.2);
    }

    measure();
    window.addEventListener("resize", measure);

    if (reduceMotion) {
      letterRefs.current.forEach((el) => {
        if (el) el.style.fontVariationSettings = `"wdth" ${WDTH_REST}, "wght" ${WGHT_REST}`;
      });
      return () => window.removeEventListener("resize", measure);
    }

    let raf = 0;
    let t = 0;

    function frame() {
      raf = requestAnimationFrame(frame);
      t += 0.016;

      letterRefs.current.forEach((el, i) => {
        if (!el) return;

        let targetWdth: number;
        let targetWght: number;

        if (noHover) {
          // Touch / no-hover devices: a slow wave travels across the word.
          const phase = (i / letters.length) * Math.PI * 2;
          const wave = (Math.sin(t * 0.8 - phase) + 1) / 2;
          targetWdth = WDTH_MIN + (WDTH_MAX - WDTH_MIN) * wave;
          targetWght = WGHT_MIN + (WGHT_MAX - WGHT_MIN) * wave;
        } else if (active) {
          const center = centers.current[i] ?? { x: 0, y: 0 };
          const dx = mousePos.current.x - center.x;
          const dy = mousePos.current.y - center.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ease = 1 - smoothstep(0, radius.current, dist);
          targetWdth = WDTH_MIN + (WDTH_MAX - WDTH_MIN) * ease;
          targetWght = WGHT_MIN + (WGHT_MAX - WGHT_MIN) * ease;
        } else {
          targetWdth = WDTH_REST;
          targetWght = WGHT_REST;
        }

        const cur = current.current[i];
        cur.wdth += (targetWdth - cur.wdth) * LERP;
        cur.wght += (targetWght - cur.wght) * LERP;

        el.style.fontVariationSettings = `"wdth" ${cur.wdth.toFixed(1)}, "wght" ${cur.wght.toFixed(0)}`;
      });
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, name]);

  // Fluid font-size that shrinks as the name gets longer, so long names
  // never overflow the viewport (tuned to match the site's original
  // fixed-size hero treatment for a ~5-letter name). The clamp()'s min/max
  // rem bounds scale down with length too — a floor sized for "Riyas" is
  // too wide once the name is "Mohammed Riyas" on a narrow phone screen.
  const len = Math.max(1, name.length);
  const scale = Math.min(1.6, 5 / len);
  const vw = Math.min(19, Math.max(7, 95 / len));
  const minRem = (2.75 * scale).toFixed(2);

  return (
    <h1
      aria-label={name}
      className={`proximity-name select-none whitespace-nowrap leading-none text-paper ${className}`}
      style={{ fontSize: `clamp(${minRem}rem, ${vw}vw, 14rem)` }}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          aria-hidden="true"
          className={`inline-block text-center ${char === " " ? "" : "mr-[0.14em]"}`}
          style={{ fontVariationSettings: `"wdth" ${WDTH_REST}, "wght" ${WGHT_REST}` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </h1>
  );
}
