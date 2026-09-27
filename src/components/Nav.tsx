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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between py-5">
        <TransitionLink
          href="/"
          className="font-display text-xl tracking-wide text-paper"
          onClick={() => setOpen(false)}
        >
          {profile.name}
          <span className="text-accent">.</span>
        </TransitionLink>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-paper-dim">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              className="hover:text-paper transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 w-8"
        >
          <span
            className={`h-px bg-paper transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span className={`h-px bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px bg-paper transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-ink border-b border-line"
          >
            <div className="flex flex-col px-6 py-4 gap-4 text-sm uppercase tracking-widest text-paper-dim">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={`/${item.href}`}
                  onClick={() => setOpen(false)}
                  className="hover:text-paper transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
