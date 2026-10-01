import { projects } from "@/lib/projects";
import { stats } from "@/data/site-content";
import { EyebrowLabel } from "./EyebrowLabel";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";

// Cycle of tile sizes for the bento-style grid. [colSpan, rowSpan] out of a
// 4-column grid with dense auto-flow — the browser fills gaps itself, so
// the pattern doesn't need to divide evenly into the project count.
const TILE_PATTERN = [
  "col-span-2 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-2 row-span-2",
];

export function ProjectsGrid() {
  return (
    <section id="work" className="bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <EyebrowLabel index="02">Selected Work</EyebrowLabel>
        </Reveal>

        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl max-w-2xl text-paper">
              Selected work across homes, hospitality and offices.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl text-accent">
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-paper-dim mt-1 max-w-24">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 [grid-auto-flow:dense] auto-rows-[180px] gap-4 md:auto-rows-[220px] md:gap-6">
          {projects.map((project, i) => (
            <div key={project.slug} className={TILE_PATTERN[i % TILE_PATTERN.length]}>
              <ProjectCard project={project} index={i + 1} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
