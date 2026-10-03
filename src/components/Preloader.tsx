"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
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
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 350);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    document.body.style.overflow = "";
    const t = setTimeout(() => setMounted(false), 850);
    return () => clearTimeout(t);
  }, [exiting]);

  if (!mounted) return null;

  return (
    <motion.div
      animate={{ y: exiting ? "-100%" : "0%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-ink"
    >
      <div className="pointer-events-none absolute h-[50vmax] w-[50vmax] rounded-full ambient-glow blur-2xl" />

      <div className="absolute top-8 left-6 md:left-10 text-xs uppercase tracking-[0.3em] text-paper-dim">
        Riyas<span className="text-accent">.</span>
      </div>

      <div className="absolute bottom-8 right-6 md:right-10 text-xs uppercase tracking-[0.3em] text-paper-dim tabular-nums">
        {progress}%
      </div>

      <p
        className="font-signature relative select-none px-4 text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
        style={{
          backgroundImage: `linear-gradient(to right, var(--paper) ${progress}%, var(--line) ${progress}%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Mohammed Riyas
      </p>

      <p className="relative mt-6 text-xs uppercase tracking-[0.3em] text-paper-dim text-center px-6">
        Designing Spaces That People Remember
      </p>
    </motion.div>
  );
}
