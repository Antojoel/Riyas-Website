"use client";

import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { experience } from "@/data/site-content";
import { EyebrowLabel } from "./EyebrowLabel";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <EyebrowLabel index="04">Experience</EyebrowLabel>
        </Reveal>

        <div className="relative mt-16">
          {/* base line */}
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-line md:left-[6px]" />
          {/* animated accent line drawing in on scroll */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[5px] top-2 bottom-2 w-px bg-accent md:left-[6px]"
          />

          <div className="space-y-14">
            {experience.map((item, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <div className="group relative pl-8 md:pl-12">
                  <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-ink transition-transform duration-300 group-hover:scale-125" />
                  {i === 0 && (
                    <span className="absolute left-0 top-1.5 h-3 w-3 animate-ping rounded-full bg-accent/70" />
                  )}

                  <div className="grid gap-2 md:grid-cols-12 md:gap-10">
                    <span className="text-sm uppercase tracking-widest text-paper-dim md:col-span-3">
                      {item.year}
                      {i === 0 && (
                        <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] tracking-widest text-accent">
                          Current
                        </span>
                      )}
                    </span>
                    <div className="md:col-span-9">
                      <h3 className="flex flex-wrap items-center gap-2 font-display text-2xl text-paper transition-colors duration-300 group-hover:text-accent">
                        <Briefcase className="h-4 w-4 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        {item.role} &middot;{" "}
                        <span className="text-paper-dim">{item.org}</span>
                      </h3>
                      <p className="mt-2 max-w-xl text-paper-dim">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
