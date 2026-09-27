"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile } from "@/data/site-content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 15, mass: 0.5 });
  const springY = useSpring(my, { stiffness: 40, damping: 15, mass: 0.5 });

  const orbX = useTransform(springX, (v) => v * 160);
  const orbY = useTransform(springY, (v) => v * 110);
  const textX = useTransform(springX, (v) => v * -70);
  const textY = useTransform(springY, (v) => v * -30);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // clamp so values stay sane even if the cursor is outside the section
      mx.set(Math.max(-0.5, Math.min(0.5, x)));
      my.set(Math.max(-0.5, Math.min(0.5, y)));
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mx, my]);

  const name = profile.name.toUpperCase();

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[720px] overflow-hidden bg-ink"
    >
      {/* drifting orb */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute -right-[10vmax] top-1/2 -translate-y-1/2 h-[70vmax] w-[70vmax] rounded-full orb-wrap"
      >
        <div className="relative h-full w-full rounded-full overflow-hidden orb-gradient">
          <div className="orb-blob orb-blob-a" />
          <div className="orb-blob orb-blob-b" />
          <div className="orb-blob orb-blob-c" />
        </div>
      </motion.div>

      {/* eyebrow */}
      <div className="absolute top-28 left-6 md:left-10 z-20 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-xs uppercase tracking-[0.3em] text-paper-dim">
          Shaping Sites Into Spaces
        </span>
      </div>

      {/* giant name + tagline, blended against the orb */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 select-none flex flex-col items-center"
      >
        <h1 className="font-display font-medium leading-none text-paper mix-blend-difference text-center whitespace-nowrap text-[18vw] md:text-[13vw]">
          {name}
        </h1>
        <p className="mt-4 md:mt-6 px-4 text-center text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-paper mix-blend-difference font-semibold">
          Designing Spaces That People Remember
        </p>
      </motion.div>

      {/* bottom content: subtext + CTAs */}
      <div className="absolute bottom-6 md:bottom-16 inset-x-6 md:inset-x-10 z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p className="max-w-xs text-paper-dim order-2 md:order-1">
          {profile.role} &middot; engineering calm, light-filled spaces for
          homes, restaurants and workplaces.
        </p>

        <div className="flex flex-col min-[400px]:flex-row md:flex-col items-stretch min-[400px]:items-start md:items-end gap-3 order-1 md:order-2">
          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent text-ink px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm uppercase tracking-widest transition-transform hover:scale-105"
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
