"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Utensils, Building2, Ruler } from "lucide-react";
import { services } from "@/data/site-content";
import { getProject } from "@/lib/projects";
import { EyebrowLabel } from "./EyebrowLabel";
import { Reveal } from "./Reveal";

const icons = [Home, Utensils, Building2, Ruler];

const previewSrc: (string | undefined)[] = [
  getProject("bessy-residence")?.cover.src,
  getProject("mint-restaurant-mahabalipuram")?.cover.src,
  getProject("refex-office")?.cover.src,
  getProject("vrx-vijayaraja")?.images.find((i) => i.category === "plan")
    ?.src ?? getProject("vrx-vijayaraja")?.cover.src,
];

export function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Scrolling away can leave a row "hovered" (the browser re-hit-tests
  // whatever slides under a stationary cursor), which would otherwise
  // strand the floating preview on screen — clear it on any scroll.
  useEffect(() => {
    if (hovered === null) return;
    const clear = () => setHovered(null);
    window.addEventListener("scroll", clear, { passive: true, capture: true });
    window.addEventListener("wheel", clear, { passive: true });
    window.addEventListener("touchmove", clear, { passive: true });
    return () => {
      window.removeEventListener("scroll", clear, true);
      window.removeEventListener("wheel", clear);
      window.removeEventListener("touchmove", clear);
    };
  }, [hovered]);

  return (
    <section
      id="services"
      onMouseLeave={() => setHovered(null)}
      className="relative overflow-hidden border-y border-line bg-ink-soft py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <EyebrowLabel index="03">What I Do</EyebrowLabel>
        </Reveal>

        <div className="mt-10 divide-y divide-line border-t border-line">
          {services.map((service, i) => {
            const Icon = icons[i] ?? Home;
            return (
              <Reveal key={service.title} delay={0.05 * i}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative cursor-default py-8 md:py-10"
                >
                  {/* mobile / tablet layout */}
                  <div className="md:hidden">
                    <h3 className="flex items-center gap-3 font-display text-2xl text-paper transition-colors duration-300 group-hover:text-accent">
                      <span className="text-paper-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon className="h-5 w-5 text-accent" />
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-paper-dim">
                      {service.description}
                    </p>
                    {previewSrc[i] && (
                      <div className="mt-4 h-40 w-full overflow-hidden rounded-xl lg:hidden">
                        <Image
                          src={previewSrc[i]!}
                          alt=""
                          width={600}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* desktop layout */}
                  <div className="hidden md:grid md:grid-cols-12 md:items-baseline md:gap-10">
                    <span className="font-display text-2xl text-paper-dim transition-colors duration-300 md:col-span-1 group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex items-center gap-3 font-display text-2xl text-paper transition-colors duration-300 md:col-span-4 md:text-3xl group-hover:text-accent">
                      <Icon className="h-5 w-5 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      {service.title}
                    </h3>
                    <p className="max-w-xl text-paper-dim transition-transform duration-300 md:col-span-7 group-hover:translate-x-1">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* floating preview image, desktop only — fixed to viewport so it stays
          visible no matter which row (top or bottom of the list) is hovered */}
      <div className="pointer-events-none fixed top-1/2 right-6 z-30 hidden w-44 -translate-y-1/2 xl:block">
        <AnimatePresence>
          {hovered !== null && previewSrc[hovered] && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.9, rotate: -3, y: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative h-44 w-44 overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/60"
            >
              <Image
                src={previewSrc[hovered]!}
                alt=""
                fill
                sizes="224px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
