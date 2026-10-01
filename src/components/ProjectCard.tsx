"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { TransitionLink } from "./PageTransition";

export function ProjectCard({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      className={`group relative block h-full w-full overflow-hidden bg-ink-soft ${className}`}
    >
      <motion.div
        initial={{ clipPath: "inset(14% 0 14% 0)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full"
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.cover.src}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
        <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10" />

        <span className="absolute top-4 left-4 font-display text-sm text-paper-dim">
          {String(index).padStart(2, "0")}
        </span>
        <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 text-paper opacity-0 translate-x-2 transition-all group-hover:translate-x-0 group-hover:opacity-100">
          &rarr;
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <h3 className="font-display text-lg text-paper transition-colors group-hover:text-accent-soft md:text-xl">
            {project.name}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-paper-dim md:text-xs">
            {project.groups.join(" / ")}
          </p>
        </div>
      </motion.div>
    </TransitionLink>
  );
}
