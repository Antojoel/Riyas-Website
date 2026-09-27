"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectImage } from "@/lib/projects";

export function Gallery({ images, groups }: { images: ProjectImage[]; groups: string[] }) {
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

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setLightboxIndex(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden bg-ink-soft"
          >
            <Image
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors" />
          </button>
        ))}
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
                className="w-full h-auto max-h-[85vh] object-contain mx-auto"
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
