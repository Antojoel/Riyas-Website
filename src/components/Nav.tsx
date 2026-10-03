"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, profile } from "@/data/site-content";
import { TransitionLink } from "./PageTransition";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 md:top-6">
      <motion.div
        animate={{
          paddingLeft: scrolled ? 18 : 24,
          paddingRight: scrolled ? 18 : 24,
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-4xl items-center justify-between gap-6 rounded-full border backdrop-blur-xl transition-colors duration-400 ${
          scrolled
            ? "border-white/15 bg-ink/60 shadow-xl shadow-black/40"
            : "border-white/10 bg-white/5 shadow-lg shadow-black/20"
        }`}
      >
        <TransitionLink
          href="/"
          className="whitespace-nowrap font-display text-lg tracking-wide text-paper md:text-xl"
          onClick={() => setOpen(false)}
        >
          {profile.name}
          <span className="text-accent">.</span>
        </TransitionLink>

        <nav className="hidden items-center gap-7 text-sm uppercase tracking-widest text-paper-dim md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              className="transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex w-7 flex-col gap-1.5 md:hidden"
        >
          <span
            className={`h-px bg-paper transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span className={`h-px bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px bg-paper transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </motion.div>

      {/* mobile menu — expands below the island, same glass treatment */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full mt-3 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 rounded-3xl border border-white/15 bg-ink/70 shadow-xl shadow-black/40 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5 text-sm uppercase tracking-widest text-paper-dim">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={`/${item.href}`}
                  onClick={() => setOpen(false)}
                  className="transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
