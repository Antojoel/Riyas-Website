"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectImage } from "@/lib/projects";
import type { ProjectDescription } from "@/data/project-descriptions";

// Cycle of tile sizes for the bento-style grid. [colSpan, rowSpan] out of a
// 3-column grid with dense auto-flow — the browser fills gaps itself, so
// the pattern doesn't need to divide evenly into the image count.
const TILE_PATTERN = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

// The description tile's row-span needs to scale with its text length, or
// long copy either overflows a short mobile-width tile or leaves a huge
// empty short one. Sized conservatively for the narrowest (mobile) column
// width, which also keeps it safe at wider breakpoints.
function descriptionRowSpan(length: number) {
  if (length > 950) return "row-span-5";
  if (length > 650) return "row-span-4";
  if (length > 450) return "row-span-3";
  return "row-span-2";
}

export function Gallery({
  images,
  groups,
  description,
}: {
  images: ProjectImage[];
  groups: string[];
  description?: ProjectDescription;
}) {
  const [activeGroup, setActiveGroup] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (activeGroup === "All" ? images : images.filter((i) => i.group === activeGroup)),
    [images, activeGroup]
  );

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filtered.length]);

  const tabs = ["All", ...groups];
  const active = filtered[lightboxIndex ?? -1];
  const showDescription = Boolean(description) && activeGroup === "All";

  // Mix the description in as a tile of its own, inserted at the midpoint
  // of the image list so it sits inside the grid rather than before it.
  type GridEntry =
    | { kind: "description" }
    | { kind: "image"; img: ProjectImage; imageIndex: number };
  const gridEntries = useMemo(() => {
    const entries: GridEntry[] = filtered.map((img, imageIndex) => ({
      kind: "image",
      img,
      imageIndex,
    }));
    if (showDescription) {
      entries.splice(Math.floor(entries.length / 2), 0, { kind: "description" });
    }
    return entries;
  }, [filtered, showDescription]);

  return (
    <div>
      {tabs.length > 2 && (
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveGroup(tab)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors ${
                activeGroup === tab
                  ? "bg-paper text-ink border-paper"
                  : "border-line text-paper-dim hover:border-paper hover:text-paper"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 [grid-auto-flow:dense] auto-rows-[160px] gap-4 sm:auto-rows-[220px]">
        {gridEntries.map((entry, i) => {
          if (entry.kind === "description") {
            return (
              <div
                key="description"
                className={`col-span-2 flex flex-col justify-center rounded-2xl border border-line bg-ink-soft p-6 md:p-8 ${descriptionRowSpan(description!.text.length)}`}
              >
                {description!.tagline && (
                  <p className="mb-3 text-xs uppercase tracking-widest text-accent">
                    {description!.tagline}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-paper-dim md:text-base">
                  {description!.text}
                </p>
              </div>
            );
          }

          const { img, imageIndex } = entry;
          return (
            <button
              key={img.src}
              onClick={() => setLightboxIndex(imageIndex)}
              className={`group relative block overflow-hidden rounded-xl bg-ink-soft ${TILE_PATTERN[i % TILE_PATTERN.length]}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors" />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur flex items-center justify-center px-4 py-10"
            onClick={closeLightbox}
          >
            <button
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-paper text-3xl leading-none hover:text-accent"
            >
              &times;
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 md:left-8 text-paper text-4xl hover:text-accent"
            >
              &#8249;
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 md:right-8 text-paper text-4xl hover:text-accent"
            >
              &#8250;
            </button>

            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[85vh] max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt=""
                width={active.width}
                height={active.height}
                sizes="90vw"
                className="w-full h-auto max-h-[85vh] rounded-xl object-contain mx-auto"
                priority
              />
              <div className="mt-3 text-center text-xs uppercase tracking-widest text-paper-dim">
                {active.group} &middot; {(lightboxIndex ?? 0) + 1} / {filtered.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
