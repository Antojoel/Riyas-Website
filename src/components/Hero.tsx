"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { profile } from "@/data/site-content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const springX = useSpring(gx, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(gy, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const inside =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;
      setActive(inside);
      gx.set(e.clientX - rect.left);
      gy.set(e.clientY - rect.top);
    }
    function handleLeave() {
      setActive(false);
    }
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [gx, gy]);

  const name = profile.name.toUpperCase();

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[720px] overflow-hidden bg-ink"
    >
      {/* soft red bloom that follows the cursor — no static shape */}
      <motion.div
        style={{ left: springX, top: springY, opacity: active ? 1 : 0 }}
        className="pointer-events-none absolute z-0 h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full cursor-glow transition-opacity duration-500"
      />

      {/* eyebrow */}
      <div className="absolute top-28 left-6 md:left-10 z-20 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-xs uppercase tracking-[0.3em] text-paper-dim">
          Shaping Sites Into Spaces
        </span>
      </div>

      {/* giant name + tagline */}
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 select-none flex-col items-center">
        <h1 className="whitespace-nowrap text-center font-display text-[18vw] font-medium leading-none text-paper md:text-[13vw]">
          {name}
        </h1>
        <p className="mt-4 px-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-dim sm:tracking-[0.35em] md:mt-6 md:text-xs">
          Designing Spaces That People Remember
        </p>
      </div>

      {/* bottom content: subtext + CTAs */}
      <div className="absolute bottom-6 md:bottom-16 inset-x-6 md:inset-x-10 z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p className="max-w-xs text-paper-dim order-2 md:order-1">
          {profile.role} &middot; engineering calm, light-filled spaces for
          homes, restaurants and workplaces.
        </p>

        <div className="flex flex-col min-[400px]:flex-row md:flex-col items-stretch min-[400px]:items-start md:items-end gap-3 order-1 md:order-2">
          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent text-paper px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm uppercase tracking-widest transition-transform hover:scale-105"
          >
            Explore Work
            <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              &#8599;
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm uppercase tracking-widest text-paper transition-colors hover:border-paper"
          >
            Let&apos;s Talk
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
