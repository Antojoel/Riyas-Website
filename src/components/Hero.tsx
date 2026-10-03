"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import { profile } from "@/data/site-content";
import { CursorOil } from "./CursorOil";
import { ProximityName, type Pointer } from "./ProximityName";

export function Hero() {
  const pointer = useRef<Pointer>({ x: 0, y: 0, inside: false });

  function handlePointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    pointer.current = { x: e.clientX, y: e.clientY, inside: true };
  }

  function handlePointerLeave() {
    pointer.current.inside = false;
  }

  const name = profile.name.toUpperCase();

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-screen min-h-[720px] overflow-hidden bg-ink"
    >
      {/* red oil blob + droplets that follow the cursor, behind the name */}
      <CursorOil pointer={pointer} />

      {/* tagline + giant name */}
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 select-none flex-col items-center">
        <p className="mb-4 px-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-dim sm:tracking-[0.35em] md:mb-6 md:text-xs">
          Architectural Portfolio
        </p>
        <ProximityName name={name} pointer={pointer} />
      </div>

      {/* bottom content: subtext + CTAs */}
      <div className="absolute bottom-6 md:bottom-16 inset-x-6 md:inset-x-10 z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex items-center gap-3 order-2 md:order-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-paper-dim">
            Shaping Sites Into Spaces
          </span>
        </div>

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
