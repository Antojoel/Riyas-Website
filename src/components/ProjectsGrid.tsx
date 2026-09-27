import { projects } from "@/lib/projects";
import { stats } from "@/data/site-content";
import { EyebrowLabel } from "./EyebrowLabel";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";

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
              Nine projects, one way of looking at a site.
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

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.05 * (i % 3)}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
