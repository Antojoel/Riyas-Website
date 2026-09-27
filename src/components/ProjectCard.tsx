"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { TransitionLink } from "./PageTransition";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <TransitionLink href={`/projects/${project.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative aspect-[4/5] overflow-hidden bg-ink-soft"
      >
        <Image
          src={project.cover.src}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
        <span className="absolute top-4 left-4 font-display text-sm text-paper-dim">
          {String(index).padStart(2, "0")}
        </span>
        <span className="absolute bottom-4 right-4 h-9 w-9 rounded-full border border-paper/40 flex items-center justify-center text-paper opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
          &rarr;
        </span>
      </motion.div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl text-paper group-hover:text-accent transition-colors">
          {project.name}
        </h3>
      </div>
      <p className="text-xs uppercase tracking-widest text-paper-dim mt-1">
        {project.groups.join(" / ")}
      </p>
    </TransitionLink>
  );
}
