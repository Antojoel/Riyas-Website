"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlanDrawing } from "./PlanDrawing";

export function Preloader() {
  const [progress, setProgress] = useState(1);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf = 0;
    let start: number | null = null;
    const duration = 1600;

    function tick(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, Math.max(1, Math.round((elapsed / duration) * 100)));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 900);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    document.body.style.overflow = "";
    const t = setTimeout(() => setMounted(false), 1700);
    return () => clearTimeout(t);
  }, [exiting]);

  if (!mounted) return null;

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden">
      {/* the two curtain halves — they slide apart once the content is gone */}
      <motion.div
        animate={{ x: exiting ? "-100%" : "0%" }}
        transition={{ duration: 0.9, delay: exiting ? 0.6 : 0, ease }}
        className="absolute inset-y-0 left-0 w-[calc(50%+1px)] bg-ink"
      />
      <motion.div
        animate={{ x: exiting ? "100%" : "0%" }}
        transition={{ duration: 0.9, delay: exiting ? 0.6 : 0, ease }}
        className="absolute inset-y-0 right-0 w-[calc(50%+1px)] bg-ink"
      />

      {/* red seam that opens down the middle just before the split */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: exiting ? 1 : 0, opacity: exiting ? [1, 1, 0] : 0 }}
        transition={{ duration: 0.6, ease: "easeOut", opacity: { duration: 1.1, times: [0, 0.6, 1] } }}
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-accent"
      />

      <motion.div
        animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="pointer-events-none absolute h-[50vmax] w-[50vmax] rounded-full ambient-glow blur-2xl" />

        {/* faint blueprint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        <div className="absolute top-7 left-6 font-display text-2xl tracking-wide text-paper md:top-8 md:left-10 md:text-3xl">
          <span className="text-accent">M</span>R<span className="text-accent">.</span>
        </div>

        {/* the plan draws itself behind the name */}
        <PlanDrawing
          progress={progress}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[min(92vw,980px)] -translate-x-1/2 -translate-y-[52%]"
        />

        {/* background-clip:text only paints inside the element's box, and the
            script's swashes/descenders reach well outside the line box — the
            em padding gives them room, negative margin cancels it in layout */}
        <p
          className="font-signature relative -mx-[0.4em] -my-[0.5em] select-none px-[0.4em] py-[0.5em] text-center text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
          style={{
            backgroundImage: `linear-gradient(to right, var(--accent) ${progress}%, var(--paper) ${progress}%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Mohammed Riyas
        </p>

        {/* counter takes the tagline's old spot under the name; the number box
            has a fixed width so the group never shifts as digits change */}
        <div className="font-gothic relative mt-8 flex items-baseline justify-center leading-none tabular-nums text-paper md:mt-10">
          <span className="min-w-[3ch] text-center text-7xl md:text-9xl">{progress}</span>
          <span className="ml-1 text-3xl text-paper-dim md:text-5xl">%</span>
        </div>
      </motion.div>
    </div>
  );
}
